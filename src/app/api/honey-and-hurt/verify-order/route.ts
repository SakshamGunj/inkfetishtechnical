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

  try {
    const baseUrl = getCashfreeBaseUrl(appId);
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
      return NextResponse.json(
        { error: 'Failed to fetch order', details: data },
        { status: response.status }
      );
    }

    return NextResponse.json({
      order_id: orderId,
      order_status: data.order_status,
      order_amount: data.order_amount,
      order_tags: data.order_tags || {},
    });
  } catch (error) {
    console.error('Honey & Hurt verify order error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
