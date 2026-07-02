import { NextResponse } from 'next/server';

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

    // Future: persist to Supabase here if needed
    // if (orderStatus === 'PAID') { ... }

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
