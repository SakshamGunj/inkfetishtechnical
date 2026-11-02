import { NextResponse } from 'next/server';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getAdminDb } from '@/lib/firebase-admin';
import { NOVEMBER_COLLECTION } from '@/lib/novemberContestPayment';

export const runtime = 'nodejs';

function getCashfreeBaseUrl(appId: string): string {
  if (process.env.CASHFREE_ENV === 'production') return 'https://api.cashfree.com';
  if (appId.startsWith('TEST')) return 'https://sandbox.cashfree.com';
  return 'https://api.cashfree.com';
}

function getSiteUrl(request?: Request): string {
  if (
    process.env.NEXT_PUBLIC_BASE_URL &&
    process.env.NEXT_PUBLIC_BASE_URL.startsWith('https://') &&
    !process.env.NEXT_PUBLIC_BASE_URL.includes('localhost')
  ) {
    return process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, '');
  }
  if (request) {
    const origin = request.headers.get('origin');
    if (
      origin &&
      origin.startsWith('https://') &&
      !origin.includes('localhost') &&
      !origin.includes('vercel.app')
    ) {
      return origin.replace(/\/$/, '');
    }
  }
  if (process.env.VERCEL_URL && !process.env.VERCEL_URL.includes('vercel.app')) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'https://www.inkfetish.in';
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, age, amount, registrationId, docId, tier } = body;

    if (!name || !email || !phone || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;

    if (!appId || !secretKey) {
      console.error('Cashfree credentials are not set in environment variables');
      return NextResponse.json(
        { error: 'Payment gateway configuration error' },
        { status: 500 }
      );
    }

    const baseUrl = getCashfreeBaseUrl(appId);
    const siteUrl = getSiteUrl(req);
    const cfMode = baseUrl.includes('sandbox') ? 'sandbox' : 'production';

    const orderId = `nov_contest_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const selectedTier = tier === '2_entries' ? '2_entries' : '1_entry';
    const orderAmount = selectedTier === '2_entries' ? 499 : 399;

    let cleanPhone = String(phone).replace(/[^0-9]/g, '');
    if (cleanPhone.length > 10) cleanPhone = cleanPhone.slice(-10);
    if (cleanPhone.length < 10) {
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
    }

    let cleanName = String(name).replace(/[^a-zA-Z0-9 ]/g, '').trim();
    if (cleanName.length < 3) cleanName = (cleanName + ' Writer').substring(0, 50);

    const cleanEmail = String(email).trim().toLowerCase();
    const finalRegId =
      String(registrationId || docId || '').trim() ||
      `NOV26-${Math.floor(100000 + Math.random() * 900000)}`;
    const finalDocId = String(docId || finalRegId).trim();

    // Direct REST call to Cashfree PG v2025-01-01 (matches src/app/api/cashfree/create-order/route.ts)
    const response = await fetch(`${baseUrl}/pg/orders`, {
      method: 'POST',
      headers: {
        'x-client-id': appId,
        'x-client-secret': secretKey,
        'x-api-version': '2025-01-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: orderAmount,
        order_currency: 'INR',
        customer_details: {
          customer_id: `nov_${cleanPhone}`,
          customer_name: cleanName.substring(0, 50),
          customer_email: cleanEmail || 'writer@inkfetish.in',
          customer_phone: cleanPhone,
        },
        order_tags: {
          source: 'november_contest',
          registrationId: finalRegId,
          docId: finalDocId,
          tier: selectedTier,
          name: cleanName.substring(0, 50),
          email: cleanEmail.substring(0, 50),
          phone: cleanPhone,
          age: String(age || '').trim(),
        },
        order_meta: {
          return_url: `${siteUrl}/november-writing-contest?order_id={order_id}&reg_id=${encodeURIComponent(
            finalRegId
          )}`,
          notify_url: `${siteUrl}/api/cashfree/webhook`,
        },
        order_note: `November Poetry & Writing Contest 2026 (${
          selectedTier === '2_entries' ? '2 Entries' : '1 Entry'
        }) - ${cleanName}`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Cashfree create-order API error:', data);
      return NextResponse.json(
        { error: data.message || 'Failed to create payment order' },
        { status: response.status }
      );
    }

    // Non-blocking pre-save of PENDING registration to Firebase
    const regRecord = {
      registrationId: finalRegId,
      docId: finalDocId,
      fullName: String(name).trim(),
      email: cleanEmail,
      whatsapp: cleanPhone,
      age: String(age || '').trim(),
      tier: selectedTier,
      amount: orderAmount,
      contestName: 'November Poetry & Writing Contest 2026',
      cashfree_order_id: orderId,
      payment_status: 'PENDING',
      status: 'REGISTERED_PENDING_PAYMENT',
      updated_at: new Date().toISOString(),
    };

    void setDoc(
      doc(db, NOVEMBER_COLLECTION, finalDocId),
      { ...regRecord, createdAt: serverTimestamp() },
      { merge: true }
    ).catch(() => {});

    void setDoc(
      doc(db, 'september_contest_registrations', finalDocId),
      { ...regRecord, contest: 'november_writing_contest_2026', createdAt: serverTimestamp() },
      { merge: true }
    ).catch(() => {});

    void (async () => {
      try {
        const adminDb = getAdminDb();
        if (adminDb) {
          await adminDb.collection(NOVEMBER_COLLECTION).doc(finalDocId).set(regRecord, { merge: true });
        }
      } catch {
        // ignore
      }
    })();

    return NextResponse.json({
      payment_session_id: data.payment_session_id,
      order_id: data.order_id,
      docId: finalDocId,
      registrationId: finalRegId,
      amount: orderAmount,
      tier: selectedTier,
      mode: cfMode,
    });
  } catch (error: any) {
    console.error('Error creating November Contest Cashfree order:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create payment order' },
      { status: 500 }
    );
  }
}
