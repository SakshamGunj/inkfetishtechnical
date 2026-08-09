import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

function getCashfreeBaseUrl(appId: string): string {
  if (process.env.CASHFREE_ENV === 'production') return 'https://api.cashfree.com';
  if (appId.startsWith('TEST')) return 'https://sandbox.cashfree.com';
  return 'https://api.cashfree.com';
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('order_id');

  if (!orderId) {
    return NextResponse.json({ error: 'Missing order_id' }, { status: 400 });
  }

  const appId = process.env.CASHFREE_APP_ID;
  const secretKey = process.env.CASHFREE_SECRET_KEY;

  if (!appId || !secretKey) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const baseUrl = getCashfreeBaseUrl(appId);

  try {
    const res = await fetch(`${baseUrl}/pg/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'x-client-id': appId,
        'x-client-secret': secretKey,
        'x-api-version': '2025-01-01',
      },
      cache: 'no-store',
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch order', details: data }, { status: res.status });
    }

    const orderStatus: string = data.order_status; // PAID | ACTIVE | EXPIRED | TERMINATED
    const tags = data.order_tags || {};

    // Save to Firebase Firestore on PAID
    if (orderStatus === 'PAID' && db) {
      try {
        await db.collection('daniya_khan_preorders').doc(orderId).set({
          order_id: orderId,
          cf_order_id: data.cf_order_id || '',
          customer_name: tags.name || '',
          customer_email: tags.email || '',
          customer_phone: tags.phone || tags.whatsapp || '',
          address: tags.address || '',
          pincode: tags.pincode || '',
          city: tags.city || '',
          state: tags.state || '',
          bundle: tags.bundle || 'standard',
          amount: data.order_amount,
          currency: data.order_currency || 'INR',
          order_status: 'PAID',
          updated_at: new Date().toISOString(),
        }, { merge: true });
      } catch (fbErr: any) {
        console.error('Firebase Firestore Save Error:', fbErr.message);
      }
    }

    return NextResponse.json({
      order_id: orderId,
      order_status: orderStatus,
      order_amount: data.order_amount,
      customer_name: tags.name || '',
      customer_email: tags.email || '',
      bundle: tags.bundle || 'standard',
      address: tags.address || '',
    });
  } catch (err) {
    console.error('Verify order error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
