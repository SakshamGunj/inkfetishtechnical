import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

// Force Node.js runtime
export const runtime = 'nodejs';

function getCashfreeBaseUrl(appId: string): string {
  if (process.env.CASHFREE_ENV === 'production') return 'https://api.cashfree.com';
  if (appId.startsWith('TEST')) return 'https://sandbox.cashfree.com';
  return 'https://api.cashfree.com';
}

export async function GET(request: Request) {
  try {
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

    if (!db) {
      console.error('Firebase Admin not initialized');
      return NextResponse.json({ error: 'Database configuration error' }, { status: 500 });
    }

    const baseUrl = getCashfreeBaseUrl(appId);

    // Fetch order directly from Cashfree
    const response = await fetch(`${baseUrl}/pg/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'x-client-id': appId,
        'x-client-secret': secretKey,
        'x-api-version': '2025-01-01',
      },
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Cashfree order status fetch error:', data);
      return NextResponse.json(
        { error: 'Failed to verify payment', details: data },
        { status: response.status }
      );
    }

    const orderStatus = data.order_status; // PAID | ACTIVE | EXPIRED | TERMINATED

    // If payment was completed, update document status to PAID
    if (orderStatus === 'PAID') {
      const orderRef = db.collection('poetry_festival_s2_delivery_orders').doc(orderId);
      const docSnapshot = await orderRef.get();

      if (docSnapshot.exists) {
        await orderRef.update({
          status: 'PAID',
          cfOrderId: data.cf_order_id || '',
          updated_at: new Date().toISOString(),
        });
      }
    }

    return NextResponse.json({
      order_id: orderId,
      order_status: orderStatus,
      order_amount: data.order_amount,
    });
  } catch (error) {
    console.error('Verify order error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
