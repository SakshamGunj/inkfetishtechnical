import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

function getCashfreeBaseUrl(appId: string): string {
  if (process.env.CASHFREE_ENV === 'production') return 'https://api.cashfree.com';
  if (appId.startsWith('TEST')) return 'https://sandbox.cashfree.com';
  return 'https://api.cashfree.com';
}

function toBase64(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

function getBaseUrl(request?: Request): string {
  if (process.env.NEXT_PUBLIC_BASE_URL && !process.env.NEXT_PUBLIC_BASE_URL.includes('localhost')) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
  if (request) {
    const origin = request.headers.get('origin');
    if (origin && !origin.includes('localhost') && !origin.includes('vercel.app')) {
      return origin;
    }
  }
  if (process.env.VERCEL_URL && !process.env.VERCEL_URL.includes('vercel.app')) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
}

export async function POST(request: Request) {
  try {
    const {
      amount,
      customerName,
      customerEmail,
      customerPhone,
      address,
      city,
      state,
      pincode,
      boughtCertificate,
      boughtPortfolio,
    } = await request.json();

    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;

    if (!appId || !secretKey) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const baseUrl = getCashfreeBaseUrl(appId);
    const siteUrl = getBaseUrl(request);

    const randomPart = Math.random().toString(36).slice(2, 7);
    const orderId = `sunobharat_${Date.now()}_${randomPart}`;

    const customerIdRaw = `sunobharat_${toBase64(customerEmail || 'reader')
      .replace(/[^a-zA-Z0-9]/g, '')
      .slice(0, 20)}`;
    const phone = `91${(customerPhone || '9999999999').replace(/\D/g, '').slice(-10)}`;

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
          customer_id: customerIdRaw,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: phone,
        },
        order_tags: {
          source: 'suno_bharat_vol1',
          email: String(customerEmail || '').substring(0, 50),
          name: String(customerName || '').substring(0, 50),
          whatsapp: String(customerPhone || ''),
          address: String(address || '').substring(0, 100),
          city: String(city || '').substring(0, 50),
          state: String(state || '').substring(0, 50),
          pincode: String(pincode || '').substring(0, 20),
          cert: boughtCertificate ? 'yes' : 'no',
          port: boughtPortfolio ? 'yes' : 'no',
        },
        order_meta: {
          return_url: `${siteUrl}/anthology/suno-bharat/thank-you?order_id={order_id}`,
          notify_url: `${siteUrl}/api/cashfree/webhook`,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Failed to create order' },
        { status: response.status }
      );
    }

    // Save PENDING order to Firebase Firestore
    const db = getAdminDb();
    if (db) {
      try {
        await db.collection('suno_bharat_orders').doc(orderId).set({
          order_id: orderId,
          email: customerEmail || '',
          name: customerName || '',
          whatsapp: customerPhone || '',
          address: address || '',
          city: city || '',
          state: state || '',
          pincode: pincode || '',
          amount,
          bought_certificate: Boolean(boughtCertificate),
          bought_portfolio: Boolean(boughtPortfolio),
          status: 'PENDING',
          created_at: new Date().toISOString(),
        });
      } catch (dbErr) {
        console.error('Failed to save PENDING Suno Bharat order to Firebase:', dbErr);
      }
    }

    return NextResponse.json({
      payment_session_id: data.payment_session_id,
      order_id: data.order_id,
    });
  } catch (error) {
    console.error('Suno Bharat Payment API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
