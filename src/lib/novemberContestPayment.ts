import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import admin, { getAdminDb } from '@/lib/firebase-admin';

export const NOVEMBER_COLLECTION = 'november_writing_contest_2026';

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export async function markNovemberContestPaid(params: {
  orderId: string;
  cfOrderId?: string;
  amount?: number;
  tags?: Record<string, string>;
  email?: string;
  phone?: string;
}): Promise<{
  marked: boolean;
  docId?: string;
  data?: Record<string, unknown>;
}> {
  const tags = params.tags || {};
  const docId = asString(tags.docId) || asString(tags.registrationId) || params.orderId;
  const registrationId = asString(tags.registrationId) || docId;
  const tier = asString(tags.tier);
  const email = (asString(tags.email) || asString(params.email)).toLowerCase();
  const phone = asString(tags.phone) || asString(params.phone);
  const name = asString(tags.name);
  const age = asString(tags.age);

  const paidData: Record<string, unknown> = {
    registrationId,
    payment_status: 'PAID',
    cashfree_order_id: params.orderId,
    cf_order_id: params.cfOrderId || '',
    updated_at: new Date().toISOString(),
  };

  if (tier) paidData.tier = tier;
  if (typeof params.amount === 'number' && params.amount > 0) paidData.amount = params.amount;
  if (email) paidData.email = email;
  if (phone) paidData.whatsapp = phone;
  if (name) paidData.fullName = name;
  if (age) paidData.age = age;

  // 1. Fast write via Firebase Web SDK (<300ms)
  try {
    await Promise.race([
      setDoc(
        doc(db, NOVEMBER_COLLECTION, docId),
        {
          ...paidData,
          paidAt: serverTimestamp(),
        },
        { merge: true }
      ),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 2500)),
    ]);
  } catch {
    // ignore Web SDK error and let Admin SDK attempt below
  }

  // 2. Non-blocking Admin SDK write
  void (async () => {
    try {
      const firestore = getAdminDb();
      if (firestore) {
        await firestore
          .collection(NOVEMBER_COLLECTION)
          .doc(docId)
          .set(
            {
              ...paidData,
              cashfree_order_ids: admin.firestore.FieldValue.arrayUnion(params.orderId),
              paidAt: admin.firestore.FieldValue.serverTimestamp(),
            },
            { merge: true }
          );
      }
    } catch {
      // ignore
    }
  })();

  return {
    marked: true,
    docId,
    data: paidData,
  };
}
