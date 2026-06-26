import { NextResponse } from 'next/server';

// Force Node.js runtime (not Edge) — needed for full fetch + crypto support on Vercel
export const runtime = 'nodejs';

// Detect sandbox vs production from App ID prefix
function getCashfreeBaseUrl(appId: string): string {
  if (process.env.CASHFREE_ENV === 'production') return 'https://api.cashfree.com';
  if (appId.startsWith('TEST')) return 'https://sandbox.cashfree.com';
  return 'https://api.cashfree.com';
}

// Safe base64 without Buffer (works on all runtimes)
function toBase64(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

// Resolve the base URL correctly for local, Vercel preview, and Vercel production
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
    const { name, email, phone, address, city, pincode } = await request.json();

    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;

    if (!appId || !secretKey) {
      console.error('Missing Cashfree credentials');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const baseUrl = getCashfreeBaseUrl(appId);
    const siteUrl = getBaseUrl();

    // Generate a unique order ID
    const randomPart = Math.random().toString(36).slice(2, 7);
    const orderId = `spa_vol2_${Date.now()}_${randomPart}`;

    // Safe customer_id — no Buffer, works everywhere
    const customerIdRaw = `spa_${toBase64(email).replace(/[^a-zA-Z0-9]/g, '').slice(0, 20)}`;

    // Normalize phone: strip non-digits, take last 10 digits, prepend 91
    const normalizedPhone = `91${phone.replace(/\D/g, '').slice(-10)}`;

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
        order_amount: 1, // Strictly fixed for testing
        order_currency: 'INR',
        customer_details: {
          customer_id: customerIdRaw,
          customer_name: name,
          customer_email: email,
          customer_phone: normalizedPhone,
        },
        // Store details in order_tags to retrieve them during verification without needing a pre-payment DB write
        order_tags: {
          email: email,
          name: name,
          whatsapp: phone,
          address: address || '',
          city: city || '',
          pincode: pincode || '',
          source: 'shakespeare_award_vol2',
        },
        order_meta: {
          return_url: `${siteUrl}/shakespeare-award-v2/submit?order_id={order_id}`,
          notify_url: `${siteUrl}/api/cashfree/webhook`, // Can reuse existing webhook or define a new one if needed
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Cashfree API error:', data);
      return NextResponse.json(
        { error: data.message || 'Failed to create order' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      payment_session_id: data.payment_session_id,
      order_id: data.order_id,
    });
  } catch (error) {
    console.error('Payment API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
