import { NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  markNovemberContestPaid,
  NOVEMBER_COLLECTION,
} from '@/lib/novemberContestPayment';

export const runtime = 'nodejs';

function getCashfreeBaseUrl(appId: string): string {
  if (process.env.CASHFREE_ENV === 'production') return 'https://api.cashfree.com';
  if (appId.startsWith('TEST')) return 'https://sandbox.cashfree.com';
  return 'https://api.cashfree.com';
}

function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}

async function checkSingleOrderWithCashfree(
  baseUrl: string,
  appId: string,
  secretKey: string,
  orderId: string
): Promise<{
  isPaid: boolean;
  orderStatus: string;
  orderData?: any;
}> {
  try {
    const response = await fetch(`${baseUrl}/pg/orders/${encodeURIComponent(orderId)}`, {
      method: 'GET',
      headers: {
        'x-client-id': appId,
        'x-client-secret': secretKey,
        'x-api-version': '2025-01-01',
      },
      cache: 'no-store',
    });
    if (!response.ok) {
      return { isPaid: false, orderStatus: 'ERROR' };
    }
    const data = await response.json();
    const orderStatus = String(data?.order_status || 'ACTIVE');
    return {
      isPaid: orderStatus === 'PAID',
      orderStatus,
      orderData: data,
    };
  } catch {
    return { isPaid: false, orderStatus: 'ERROR' };
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      order_id,
      order_ids,
      docId,
      registrationId,
      email,
      phone,
    }: {
      order_id?: string;
      order_ids?: string[];
      docId?: string;
      registrationId?: string;
      email?: string;
      phone?: string;
    } = body;

    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;

    if (!appId || !secretKey) {
      return NextResponse.json(
        { error: 'Payment gateway configuration error' },
        { status: 500 }
      );
    }

    const baseUrl = getCashfreeBaseUrl(appId);

    // 0. Check if registration is already SUBMITTED or PAID in Firestore (fast Web SDK check with 1.2s timeout)
    const lookupDocId = String(docId || registrationId || '').trim();
    if (lookupDocId) {
      const [subSnap, novSnap, regSnap] = await withTimeout(
        Promise.all([
          getDoc(doc(db, 'september_contest_submissions', lookupDocId)).catch(() => null),
          getDoc(doc(db, NOVEMBER_COLLECTION, lookupDocId)).catch(() => null),
          getDoc(doc(db, 'september_contest_registrations', lookupDocId)).catch(() => null),
        ]),
        1200,
        [null, null, null]
      );

      const submittedDoc =
        (subSnap?.exists() ? subSnap.data() : null) ||
        (novSnap?.exists() && novSnap.data()?.status === 'SUBMITTED' ? novSnap.data() : null);

      if (submittedDoc && submittedDoc.status === 'SUBMITTED') {
        return NextResponse.json({
          status: 'ALREADY_SUBMITTED',
          order_status: 'ALREADY_SUBMITTED',
          docId: lookupDocId,
        });
      }

      const paidDoc =
        (novSnap?.exists() && novSnap.data()?.payment_status === 'PAID' ? novSnap.data() : null) ||
        (regSnap?.exists() && regSnap.data()?.payment_status === 'PAID' ? regSnap.data() : null);

      if (paidDoc) {
        return NextResponse.json({
          status: 'PAID',
          order_status: 'PAID',
          order_id: paidDoc.cashfree_order_id || '',
          docId: lookupDocId,
          registration: {
            docId: lookupDocId,
            registrationId: paidDoc.registrationId || lookupDocId,
            fullName: paidDoc.fullName || '',
            email: paidDoc.email || '',
            whatsapp: paidDoc.whatsapp || '',
            age: paidDoc.age || '',
            tier: paidDoc.tier || '1_entry',
            amount: paidDoc.amount || 399,
            status: paidDoc.status || 'REGISTERED_PAID',
          },
        });
      }
    }

    // 1. Gather candidate order IDs from request immediately
    const candidateOrderIds = new Set<string>();
    if (order_id) candidateOrderIds.add(String(order_id).trim());
    if (Array.isArray(order_ids)) {
      order_ids.forEach((id) => {
        if (id && typeof id === 'string') candidateOrderIds.add(id.trim());
      });
    }

    const orderList = Array.from(candidateOrderIds).filter(Boolean);

    // 2. FAST PATH: Check Cashfree REST API directly (<250ms)
    if (orderList.length > 0) {
      const checks = await Promise.all(
        orderList.map(async (id) => ({
          id,
          ...(await checkSingleOrderWithCashfree(baseUrl, appId, secretKey, id)),
        }))
      );

      const paidCheck = checks.find((c) => c.isPaid);
      if (paidCheck) {
        const orderData = paidCheck.orderData || {};
        const tags = (orderData.order_tags as Record<string, string>) || {};
        const targetDocId = tags.docId || docId || registrationId || paidCheck.id;
        const finalRegId = tags.registrationId || registrationId || targetDocId;
        const finalTier =
          tags.tier === '2_entries' || Number(orderData.order_amount) === 499
            ? '2_entries'
            : '1_entry';

        // Fire-and-forget Firestore update so response returns immediately
        void withTimeout(
          markNovemberContestPaid({
            orderId: paidCheck.id,
            cfOrderId: String(orderData.cf_order_id || ''),
            amount: Number(orderData.order_amount || 0),
            tags: {
              ...tags,
              docId: targetDocId,
              registrationId: finalRegId,
            },
            email: tags.email || orderData.customer_details?.customer_email || email || '',
            phone: tags.phone || orderData.customer_details?.customer_phone || phone || '',
          }),
          1200,
          { marked: false }
        ).catch(() => {});

        return NextResponse.json({
          status: 'PAID',
          order_status: 'PAID',
          order_id: paidCheck.id,
          docId: targetDocId,
          registration: {
            docId: targetDocId,
            registrationId: finalRegId,
            fullName: tags.name || orderData.customer_details?.customer_name || '',
            email: tags.email || orderData.customer_details?.customer_email || email || '',
            whatsapp: tags.phone || orderData.customer_details?.customer_phone || phone || '',
            age: tags.age || '',
            tier: finalTier,
            amount: Number(orderData.order_amount || (finalTier === '2_entries' ? 499 : 399)),
            status: 'REGISTERED_PAID',
          },
        });
      }

      // If order exists on Cashfree and is NOT paid (ACTIVE / EXPIRED), return its status and tags immediately
      const firstValidCheck = checks.find((c) => c.orderData) || checks[0];
      const firstData = firstValidCheck?.orderData || {};
      const firstTags = (firstData.order_tags as Record<string, string>) || {};
      const latestStatus = firstValidCheck?.orderStatus || 'ACTIVE';

      return NextResponse.json({
        status: latestStatus,
        order_status: latestStatus,
        order_id: firstValidCheck?.id || '',
        docId: firstTags.docId || docId || registrationId || '',
        registration: firstTags.name
          ? {
              docId: firstTags.docId || docId || registrationId || '',
              registrationId: firstTags.registrationId || registrationId || '',
              fullName: firstTags.name || firstData.customer_details?.customer_name || '',
              email: firstTags.email || firstData.customer_details?.customer_email || email || '',
              whatsapp: firstTags.phone || firstData.customer_details?.customer_phone || phone || '',
              age: firstTags.age || '',
              tier:
                firstTags.tier === '2_entries' || Number(firstData.order_amount) === 499
                  ? '2_entries'
                  : '1_entry',
              amount: Number(firstData.order_amount || 399),
              status: 'REGISTERED_PENDING_PAYMENT',
            }
          : undefined,
      });
    }

    return NextResponse.json({
      status: 'PENDING',
      order_status: 'PENDING',
    });
  } catch (error: any) {
    console.error('Error verifying November Contest order:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment order' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get('order_id') || '';
  const docId = searchParams.get('docId') || '';
  const registrationId = searchParams.get('registrationId') || '';
  const fakeReq = new Request(req.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ order_id: orderId, docId, registrationId }),
  });
  return POST(fakeReq);
}
