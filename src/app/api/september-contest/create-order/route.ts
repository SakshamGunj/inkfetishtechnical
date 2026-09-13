import { NextResponse } from 'next/server';
import { Cashfree, CFEnvironment } from 'cashfree-pg';

export const runtime = 'nodejs';

function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_BASE_URL && !process.env.NEXT_PUBLIC_BASE_URL.includes('localhost')) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'https://www.inkfetish.in';
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, amount, registrationId, uid } = body;

    if (!name || !email || !phone || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;
    const mode = process.env.NEXT_PUBLIC_CASHFREE_MODE || 'sandbox';

    if (!appId || !secretKey) {
      console.error('Cashfree credentials are not set in environment variables');
      return NextResponse.json(
        { error: 'Payment gateway configuration error' },
        { status: 500 }
      );
    }

    const environment = mode === 'production' ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX;
    const cashfree = new Cashfree(environment, appId, secretKey);
    cashfree.XApiVersion = "2025-01-01";

    const orderId = `sept_contest_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const orderAmount = Number(amount);

    let cleanPhone = String(phone).replace(/[^0-9]/g, '');
    if (cleanPhone.length > 10) cleanPhone = cleanPhone.slice(-10);
    if (cleanPhone.length < 10) {
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
    }

    let cleanName = name.replace(/[^a-zA-Z0-9 ]/g, '').trim();
    if (cleanName.length < 3) cleanName = (cleanName + ' User').substring(0, 50);

    const siteUrl = getSiteUrl();
    const cleanEmail = String(email).trim().toLowerCase();

    const request = {
      order_amount: orderAmount,
      order_currency: 'INR',
      order_id: orderId,
      customer_details: {
        customer_id: `sept_${cleanPhone}`,
        customer_phone: cleanPhone,
        customer_email: cleanEmail || "test@test.com",
        customer_name: cleanName.substring(0, 50),
      },
      order_tags: {
        source: 'september_contest',
        registrationId: String(registrationId || ''),
        uid: String(uid || ''),
        email: cleanEmail,
      },
      order_meta: {
        return_url: `${siteUrl}/september-writing-contest?order_id={order_id}`,
        notify_url: `${siteUrl}/api/cashfree/webhook`,
      },
      order_note: `September Contest Registration for ${cleanName}`
    };

    const response = await cashfree.PGCreateOrder(request);

    return NextResponse.json({
      payment_session_id: response.data.payment_session_id,
      order_id: response.data.order_id,
    });

  } catch (error: any) {
    const errorDetails = error.response?.data || error.message || "Unknown error";
    console.error('Error creating Cashfree order:', errorDetails);

    let errorMsg = 'Failed to create payment order';
    if (typeof errorDetails === 'object' && errorDetails !== null) {
        if (errorDetails.message) errorMsg = errorDetails.message;
        else errorMsg = JSON.stringify(errorDetails);
    } else if (typeof errorDetails === 'string') {
        errorMsg = errorDetails;
    }

    return NextResponse.json(
      { error: `Cashfree Error: ${errorMsg}` },
      { status: 500 }
    );
  }
}
