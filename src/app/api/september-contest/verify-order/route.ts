import { NextResponse } from 'next/server';
import { Cashfree, CFEnvironment } from 'cashfree-pg';
import { markSeptemberContestPaid } from '@/lib/septemberContestPayment';

export const runtime = 'nodejs';

async function verifySeptemberOrder(orderId: string) {
  const appId = process.env.CASHFREE_APP_ID;
  const secretKey = process.env.CASHFREE_SECRET_KEY;
  const mode = process.env.NEXT_PUBLIC_CASHFREE_MODE || 'sandbox';

  if (!appId || !secretKey) {
    return NextResponse.json(
      { error: 'Payment gateway configuration error' },
      { status: 500 }
    );
  }

  const environment = mode === 'production' ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX;
  const cashfree = new Cashfree(environment, appId, secretKey);
  cashfree.XApiVersion = "2025-01-01";

  const response = await cashfree.PGFetchOrder(orderId);
  const orderStatus = response.data.order_status;
  const tags = (response.data as { order_tags?: Record<string, string> }).order_tags || {};

  if (orderStatus === 'PAID') {
    try {
      await markSeptemberContestPaid({
        orderId,
        cfOrderId: String((response.data as { cf_order_id?: string }).cf_order_id || ''),
        tags,
        email: (response.data as { customer_details?: { customer_email?: string } }).customer_details?.customer_email,
      });
    } catch (err) {
      console.error('Failed to mark September contest registration paid:', err);
    }
  }

  return NextResponse.json({
    status: orderStatus,
    order_status: orderStatus,
    order_id: orderId,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { order_id } = body;

    if (!order_id) {
      return NextResponse.json(
        { error: 'Missing order_id' },
        { status: 400 }
      );
    }

    return await verifySeptemberOrder(order_id);
  } catch (error: any) {
    const errorDetails = error.response?.data || error.message || "Unknown error";
    console.error('Error verifying Cashfree order:', errorDetails);

    let errorMsg = 'Failed to verify payment order';
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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('order_id');
    if (!orderId) {
      return NextResponse.json({ error: 'Missing order_id' }, { status: 400 });
    }
    return await verifySeptemberOrder(orderId);
  } catch (error: any) {
    console.error('Error verifying Cashfree order:', error);
    return NextResponse.json({ error: 'Failed to verify payment order' }, { status: 500 });
  }
}
