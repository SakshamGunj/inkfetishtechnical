import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

function getCashfreeBaseUrl(appId: string): string {
  if (process.env.CASHFREE_ENV === 'production') return 'https://api.cashfree.com';
  if (appId.startsWith('TEST')) return 'https://sandbox.cashfree.com';
  return 'https://api.cashfree.com';
}

function toBase64(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_BASE_URL && process.env.NEXT_PUBLIC_BASE_URL.startsWith('https://')) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'https://inkfetish.in';
}

export async function POST(request: Request) {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      bundleType, // 'pdf_only' (₹99) | 'pdf_bundle' (₹199)
      quantity,
    } = await request.json();

    if (!customerName || !customerEmail || !customerPhone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;
    if (!appId || !secretKey) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const baseUrl = getCashfreeBaseUrl(appId);
    const siteUrl = getBaseUrl();

    // ₹99 for PDF E-Book Only, ₹199 for PDF Collector Bundle
    const qty = Math.max(1, parseInt(quantity || 1, 10));
    let unitPrice = 99;
    if (bundleType === 'pdf_bundle' || bundleType === 'collector' || bundleType === 'bundle') {
      unitPrice = 199;
    }
    const amount = unitPrice * qty;

    const orderId = `dkpdf_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const customerId = `dkpdf_${toBase64(customerEmail).replace(/[^a-zA-Z0-9]/g, '').slice(0, 20)}`;
    const phone = `91${customerPhone.replace(/\D/g, '').slice(-10)}`;

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
          customer_id: customerId,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: phone,
        },
        order_tags: {
          source: 'daniya_khan_pdf_ebook',
          bundle: bundleType || 'pdf_only',
          quantity: String(qty),
          email: customerEmail,
          name: customerName,
          phone: customerPhone,
        },
        order_meta: {
          return_url: `${siteUrl}/daniya-khan/pdf/success?order_id={order_id}`,
          notify_url: `${siteUrl}/api/cashfree/webhook`,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Cashfree PDF API error:', data);
      return NextResponse.json({ error: data.message || 'Failed to create order' }, { status: response.status });
    }

    return NextResponse.json({
      payment_session_id: data.payment_session_id,
      order_id: data.order_id,
      amount,
    });
  } catch (err) {
    console.error('Create PDF order error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
