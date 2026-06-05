import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Force Node.js runtime
export const runtime = 'nodejs';

function getCashfreeBaseUrl(appId: string): string {
  if (process.env.CASHFREE_ENV === 'production') return 'https://api.cashfree.com';
  if (appId.startsWith('TEST')) return 'https://sandbox.cashfree.com';
  return 'https://api.cashfree.com';
}

export async function GET(request: Request) {
  try {
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

    if (!supabase) {
      console.error('Supabase client not initialized');
      return NextResponse.json({ error: 'Database configuration error' }, { status: 500 });
    }

    const baseUrl = getCashfreeBaseUrl(appId);

    // Fetch order directly from Cashfree
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
      console.error('Cashfree order status fetch error:', data);
      return NextResponse.json(
        { error: 'Failed to verify payment', details: data },
        { status: response.status }
      );
    }

    const orderStatus = data.order_status; // PAID | ACTIVE | EXPIRED | TERMINATED

    // If payment was completed, update status to PAID in Supabase
    if (orderStatus === 'PAID') {
      const { error: dbError } = await supabase
        .from('poetry_festival_s2_delivery_orders')
        .update({
          status: 'PAID',
          cf_order_id: data.cf_order_id || '',
          updated_at: new Date().toISOString(),
        })
        .eq('order_id', orderId);

      if (dbError) {
        console.warn('Failed to update status to PAID in Supabase:', dbError.message);
      }
    }

    return NextResponse.json({
      order_id: orderId,
      order_status: orderStatus,
      order_amount: data.order_amount,
    });
  } catch (error) {
    console.error('Verify order error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
