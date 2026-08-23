import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

// Force Node.js runtime (not Edge) — needed for full fetch + crypto support on Vercel
export const runtime = 'nodejs';

// Detect sandbox vs production from App ID prefix
// TEST... → sandbox | digit-prefixed → production
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
  // Explicitly set → always use this (production domain)
  if (process.env.NEXT_PUBLIC_BASE_URL && !process.env.NEXT_PUBLIC_BASE_URL.includes('localhost')) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
  // Vercel auto-injects VERCEL_URL for preview/production deployments
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // Local development fallback
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
}

export async function POST(request: Request) {
  try {
    const { amount, customerName, customerEmail, customerPhone, plan, address, city, state, pincode, source = 'poetry_festival_s2', providedOrderId } = await request.json();
    let finalAmount = amount;

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
    
    // Determine order prefix and return URL based on source
    let orderIdPrefix = 'pfs2_';
    let returnUrlPath = 'poetry-festival-s2/submit';
    
    if (source === 'bharat_writes') {
      orderIdPrefix = 'bw_';
      returnUrlPath = 'bharat-writes/submit';
    } else if (source === 'bharat_writes_kit') {
      orderIdPrefix = 'bwkit_';
      returnUrlPath = 'bharat-writes/certificate/checkout/success';
    } else if (source === 'iwl_season_2') {
      orderIdPrefix = 'iwl2_';
      returnUrlPath = 'indian-writers-league-season-2';
    }
    
    const orderId = providedOrderId || `${orderIdPrefix}${Date.now()}_${randomPart}`;

    // Safe customer_id — no Buffer, works everywhere
    const customerIdRaw = `${orderIdPrefix}${toBase64(customerEmail).replace(/[^a-zA-Z0-9]/g, '').slice(0, 20)}`;

    // Normalize phone: strip non-digits, take last 10 digits, prepend 91
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
        order_amount: finalAmount,
        order_currency: 'INR',
        customer_details: {
          customer_id: customerIdRaw,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: phone,
        },
        // Store plan + author metadata in order_tags for post-payment recovery
        order_tags: {
          plan: plan,
          email: customerEmail,
          name: customerName,
          whatsapp: customerPhone,
          source: source,
          address: address || '',
          city: city || '',
          state: state || '',
          pincode: pincode || '',
        },
        order_meta: {
          return_url: `${siteUrl}/${returnUrlPath}?order_id={order_id}&plan=${plan}`,
          notify_url: `${siteUrl}/api/cashfree/webhook`,
        },
      }),
    });

    // Save PENDING order to Firebase before returning to client
    if (db && (source === 'bharat_writes_kit' || source === 'iwl_season_2')) {
      try {
        if (source === 'bharat_writes_kit') {
          await db.collection('bharat_writes_kit_orders').doc(orderId).set({
            order_id: orderId,
            email: customerEmail || '',
            name: customerName || '',
            whatsapp: customerPhone || '',
            address: address || '',
            city: city || '',
            state: state || '',
            pincode: pincode || '',
            amount: finalAmount,
            status: 'PENDING',
            created_at: new Date().toISOString(),
          });
        } else if (source === 'iwl_season_2') {
          await db.collection('iwl_registrations').doc(orderId).set({
            order_id: orderId,
            email: customerEmail || '',
            name: customerName || '',
            whatsapp: customerPhone || '',
            plan_amount: plan || finalAmount,
            submission_count: plan === 399 ? 1 : 2,
            payment_status: 'PENDING',
            created_at: new Date().toISOString(),
          });
        }
      } catch (err) {
        console.error('Failed to save PENDING order to Firebase', err);
      }
    }

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
      plan,
    });
  } catch (error) {
    console.error('Payment API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
