import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

function getCashfreeBaseUrl(appId: string): string {
  if (process.env.CASHFREE_ENV === 'production') return 'https://api.cashfree.com';
  if (appId.startsWith('TEST')) return 'https://sandbox.cashfree.com';
  return 'https://api.cashfree.com';
}

export async function GET(request: Request) {
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

  const baseUrl = getCashfreeBaseUrl(appId);

  try {
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
      return NextResponse.json(
        { error: 'Failed to fetch order', details: data },
        { status: response.status }
      );
    }

    const orderStatus = data.order_status;
    const tags = data.order_tags || {};
    const parentOrderId = tags.parent_order_id;
    const upgradeType = tags.upgrade_type;

    if (orderStatus === 'PAID' && parentOrderId && upgradeType) {
      const updateData: Record<string, any> = {
        updated_at: new Date().toISOString(),
      };
      if (upgradeType === 'cert') updateData.bought_certificate = true;
      if (upgradeType === 'port') updateData.bought_portfolio = true;

      const db = getAdminDb();
      if (db) {
        try {
          await db
            .collection('suno_bharat_orders')
            .doc(parentOrderId)
            .set(updateData, { merge: true });
        } catch (dbErr) {
          console.error('Firebase Suno Bharat upsell update error:', dbErr);
        }
      }
    }

    return NextResponse.json({
      order_id: orderId,
      order_status: orderStatus,
      parent_order_id: parentOrderId,
      upgrade_type: upgradeType,
    });
  } catch (error) {
    console.error('Suno Bharat Verify upsell error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
