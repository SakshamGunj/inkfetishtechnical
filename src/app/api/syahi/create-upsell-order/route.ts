import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

function getCashfreeBaseUrl(appId: string): string {
  if (process.env.CASHFREE_ENV === 'production') return 'https://api.cashfree.com';
  if (appId.startsWith('TEST')) return 'https://sandbox.cashfree.com';
  return 'https://api.cashfree.com';
}

function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_BASE_URL && !process.env.NEXT_PUBLIC_BASE_URL.includes('localhost')) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
}

export async function POST(request: Request) {
  try {
    const { parentOrderId, upgradeType, amount } = await request.json();

    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;

    if (!appId || !secretKey) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const baseUrl = getCashfreeBaseUrl(appId);
    const siteUrl = getBaseUrl();

    const randomPart = Math.random().toString(36).slice(2, 7);
    const orderId = `upg_${Date.now()}_${randomPart}`;

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
        order_amount: amount,
        order_currency: 'INR',
        customer_details: {
          customer_id: 'syahi_upsell_customer',
          customer_name: 'Syaahi Upsell',
          customer_email: 'upsell@inkfetish.in',
          customer_phone: '919999999999',
        },
        order_tags: {
          parent_order_id: parentOrderId,
          upgrade_type: upgradeType, // 'cert' or 'port'
        },
        order_meta: {
          return_url: `${siteUrl}/anthology/syaahi/thank-you?order_id=${parentOrderId}`,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Failed to create upsell order' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      payment_session_id: data.payment_session_id,
      order_id: data.order_id,
    });
  } catch (error) {
    console.error('Syahi Upsell API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
