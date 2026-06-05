import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Force Node.js runtime
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
    const { certificateId, name, email, phone, address, city, state, pincode } = await request.json();

    if (!certificateId || !name || !email || !phone || !address || !city || !state || !pincode) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;

    if (!appId || !secretKey) {
      console.error('Missing Cashfree credentials');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    if (!supabase) {
      console.error('Supabase client not initialized');
      return NextResponse.json({ error: 'Database configuration error' }, { status: 500 });
    }

    const baseUrl = getCashfreeBaseUrl(appId);
    const siteUrl = getBaseUrl();

    // Generate a unique order ID for delivery
    const randomPart = Math.random().toString(36).slice(2, 7);
    const orderId = `pfdlv_${Date.now()}_${randomPart}`;

    // Generate safe customer_id
    const customerIdRaw = `pfs2_${toBase64(email).replace(/[^a-zA-Z0-9]/g, '').slice(0, 20)}`;

    // Normalize phone: strip non-digits, take last 10 digits, prepend 91
    const normalizedPhone = `91${phone.replace(/\D/g, '').slice(-10)}`;

    // Call Cashfree PG Orders API
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
        order_amount: 285.00,
        order_currency: 'INR',
        customer_details: {
          customer_id: customerIdRaw,
          customer_name: name,
          customer_email: email,
          customer_phone: normalizedPhone,
        },
        order_tags: {
          certificateId: certificateId,
          email: email,
          name: name,
          whatsapp: phone,
          source: 'poetry_festival_s2_homedelivery',
        },
        order_meta: {
          return_url: `${siteUrl}/poetryfestival/s2/${certificateId}/homedelivery?order_id={order_id}`,
          notify_url: `${siteUrl}/api/cashfree/webhook`,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Cashfree PG error:', data);
      return NextResponse.json(
        { error: data.message || 'Failed to create order' },
        { status: response.status }
      );
    }

    // Save pending record to Supabase database
    const { error: dbError } = await supabase
      .from('poetry_festival_s2_delivery_orders')
      .insert({
        order_id: orderId,
        cf_order_id: data.cf_order_id || '',
        certificate_id: certificateId,
        name: name,
        email: email,
        phone: phone,
        address: address,
        city: city,
        state: state,
        pincode: pincode,
        amount: 285.00,
        status: 'PENDING',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

    if (dbError) {
      console.error('Failed to create pending order record in Supabase:', dbError.message);
      return NextResponse.json({ error: 'Database transaction failed' }, { status: 500 });
    }

    return NextResponse.json({
      payment_session_id: data.payment_session_id,
      order_id: data.order_id,
    });
  } catch (error) {
    console.error('Create delivery order error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
