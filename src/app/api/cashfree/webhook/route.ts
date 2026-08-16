import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import { db } from '@/lib/firebase-admin';

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
    const tags = order.order_tags || {};

    console.log(`Webhook received for ${orderId}: ${paymentStatus}`);

    if (paymentStatus === 'SUCCESS') {

      // 2a. HOME DELIVERY ORDERS → Update Supabase
      if (orderId.startsWith('pfdlv_')) {
        try {
          const { error: dbError } = await supabase
            .from('poetry_festival_s2_delivery_orders')
            .update({
              status: 'PAID',
              cf_order_id: order.cf_order_id || '',
              updated_at: new Date().toISOString(),
            })
            .eq('order_id', orderId);

          if (dbError) {
            console.error('Webhook Supabase Delivery DB Error:', dbError.message);
          } else {
            console.log(`Supabase updated for delivery order: ${orderId}`);
          }
        } catch (dbErr) {
          console.error('Supabase webhook update error:', dbErr);
        }

      // 2b. THE MARGINS ORDERS → Insert to Supabase
      } else if (orderId.startsWith('margins_')) {
        const { error } = await supabase
          .from('the_margins_orders')
          .upsert({
            order_id: orderId,
            cf_order_id: order.cf_order_id,
            email: tags.email || '',
            name: tags.name || '',
            whatsapp: tags.whatsapp || '',
            address: tags.address || '',
            city: tags.city || '',
            state: tags.state || '',
            pincode: tags.pincode || '',
            quantity: parseInt(tags.qty || '1', 10),
            amount: order.order_amount,
            status: 'PAID',
            updated_at: new Date().toISOString(),
          }, { onConflict: 'order_id' });

        if (error) {
          console.error('Webhook Supabase Margins DB Error:', error.message);
          return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
        }

      // 2c. DANIYA KHAN PRE-ORDERS → Insert to Firebase Firestore
      } else if (orderId.startsWith('dkbook_')) {
        console.log(`Daniya Khan Pre-order Payment Confirmed: ${orderId}`);
        if (db) {
          try {
            await db.collection('daniya_khan_preorders').doc(orderId).set({
              order_id: orderId,
              cf_order_id: order.cf_order_id || '',
              customer_name: tags.name || '',
              customer_email: tags.email || '',
              customer_phone: tags.phone || tags.whatsapp || '',
              address: tags.address || '',
              pincode: tags.pincode || '',
              city: tags.city || '',
              state: tags.state || '',
              bundle: tags.bundle || 'standard',
              amount: order.order_amount,
              currency: 'INR',
              order_status: 'PAID',
              updated_at: new Date().toISOString(),
            }, { merge: true });
            console.log(`Saved Daniya Khan pre-order ${orderId} to Firebase Firestore`);
          } catch (fbErr: any) {
            console.error('Webhook Firebase Firestore Error for Daniya Khan:', fbErr.message);
          }
        }

      // 2d. BHARAT WRITES ORDERS → Insert to Firebase
      } else if (orderId.startsWith('bw_')) {
        if (db) {
          try {
            await db.collection('bharat_writes_registrations').doc(orderId).set({
              order_id: orderId,
              cf_order_id: order.cf_order_id,
              email: tags.email || '',
              authorName: tags.name || '',
              whatsappNumber: tags.whatsapp || '',
              plan: tags.plan || 'single',
              amount: order.order_amount,
              status: 'PAID',
              updated_at: new Date().toISOString(),
            }, { merge: true });
          } catch (firebaseErr: any) {
            console.error('Webhook Firebase DB Error:', firebaseErr.message);
            return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
          }
        } else {
          console.error('Firebase Admin DB is not initialized.');
        }

      // 2e. BHARAT WRITES KIT ORDERS → Insert to Firebase
      } else if (orderId.startsWith('bwkit_')) {
        if (db) {
          try {
            await db.collection('bharat_writes_kit_orders').doc(orderId).set({
              order_id: orderId,
              cf_order_id: order.cf_order_id,
              email: tags.email || '',
              name: tags.name || '',
              whatsapp: tags.whatsapp || '',
              address: tags.address || '',
              city: tags.city || '',
              state: tags.state || '',
              pincode: tags.pincode || '',
              amount: order.order_amount,
              status: 'PAID',
              updated_at: new Date().toISOString(),
            }, { merge: true });
          } catch (firebaseErr: any) {
            console.error('Webhook Firebase DB Error (bwkit):', firebaseErr.message);
            return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
          }
        } else {
          console.error('Firebase Admin DB is not initialized.');
        }

      // 2d. ORIGINAL POETRY FESTIVAL ORDERS → Update Supabase
      } else {
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
          console.error('Webhook Supabase DB Error:', error.message);
          return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
