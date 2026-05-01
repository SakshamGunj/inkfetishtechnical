import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Force Node.js runtime for crypto support
export const runtime = 'nodejs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_VITE_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-webhook-signature');
    const timestamp = request.headers.get('x-webhook-timestamp');
    const secretKey = process.env.CASHFREE_SECRET_KEY;

    if (!signature || !timestamp || !secretKey) {
      return NextResponse.json({ error: 'Missing security headers' }, { status: 400 });
    }

    // 1. VERIFY SIGNATURE (Security First)
    // Cashfree Webhook Verification: HMAC-SHA256(timestamp + rawBody, secretKey)
    const dataToSign = timestamp + rawBody;
    const expectedSignature = crypto
      .createHmac('sha256', secretKey)
      .update(dataToSign)
      .digest('base64');

    if (signature !== expectedSignature) {
      console.error('Invalid Webhook Signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const order = payload.data?.order;
    const payment = payload.data?.payment;

    if (!order || !payment) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const orderId = order.order_id;
    const paymentStatus = payment.payment_status; // SUCCESS | FAILED | PENDING

    console.log(`Webhook received for ${orderId}: ${paymentStatus}`);

    // 2. UPDATE DATABASE
    if (paymentStatus === 'SUCCESS') {
      const tags = order.order_tags || {};
      
      const { error } = await supabase
        .from('poetry_festival_s2_payments')
        .upsert({
          order_id: orderId,
          cf_order_id: order.cf_order_id,
          email: tags.email || '',
          name: tags.name || '',
          whatsapp: tags.whatsapp || '',
          plan: tags.plan || 'single',
          amount: order.order_amount,
          status: 'PAID',
          updated_at: new Date().toISOString(),
        }, { onConflict: 'order_id' });

      if (error) {
        console.error('Webhook DB Error:', error.message);
        return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
