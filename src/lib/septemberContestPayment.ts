import admin from '@/lib/firebase-admin';
import { getAdminDb } from '@/lib/firebase-admin';

const COLLECTION = 'september_contest_registrations';

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export async function markSeptemberContestPaid(params: {
  orderId: string;
  cfOrderId?: string;
  tags?: Record<string, string>;
  email?: string;
  uid?: string;
}): Promise<boolean> {
  const firestore = getAdminDb();
  const col = firestore.collection(COLLECTION);
  const tags = params.tags || {};
  const registrationId = asString(tags.registrationId);
  const email = (asString(tags.email) || asString(params.email)).toLowerCase();
  const uid = asString(tags.uid) || asString(params.uid);

  const paidFields: Record<string, unknown> = {
    payment_status: 'PAID',
    cashfree_order_id: params.orderId,
    cashfree_order_ids: admin.firestore.FieldValue.arrayUnion(params.orderId),
    cf_order_id: params.cfOrderId || '',
    paidAt: admin.firestore.FieldValue.serverTimestamp(),
    updated_at: new Date().toISOString(),
  };

  if (registrationId) {
    await col.doc(registrationId).set(paidFields, { merge: true });
    return true;
  }

  const byOrder = await col.where('cashfree_order_id', '==', params.orderId).limit(5).get();
  if (!byOrder.empty) {
    await Promise.all(byOrder.docs.map((docSnap) => docSnap.ref.set(paidFields, { merge: true })));
    return true;
  }

  const byIds = await col.where('cashfree_order_ids', 'array-contains', params.orderId).limit(5).get();
  if (!byIds.empty) {
    await Promise.all(byIds.docs.map((docSnap) => docSnap.ref.set(paidFields, { merge: true })));
    return true;
  }

  if (uid) {
    const byUid = await col.where('uid', '==', uid).limit(5).get();
    if (!byUid.empty) {
      await Promise.all(byUid.docs.map((docSnap) => docSnap.ref.set(paidFields, { merge: true })));
      return true;
    }
  }

  if (email) {
    const byEmail = await col.where('email', '==', email).limit(5).get();
    const pending = byEmail.docs.filter((d) => d.data().payment_status !== 'PAID');
    const targets = pending.length ? pending : byEmail.docs;
    if (targets.length) {
      await Promise.all(targets.map((docSnap) => docSnap.ref.set(paidFields, { merge: true })));
      return true;
    }
  }

  return false;
}
