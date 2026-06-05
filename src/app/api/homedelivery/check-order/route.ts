import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing certificate ID' }, { status: 400 });
    }

    if (supabase) {
      const { data, error } = await supabase
        .from('poetry_festival_s2_delivery_orders')
        .select('*')
        .eq('certificate_id', id)
        .eq('status', 'PAID')
        .limit(1)
        .maybeSingle();

      if (error) {
        console.warn('check-order: Supabase query error:', error.message);
      } else if (data) {
        return NextResponse.json({
          ordered: true,
          order: {
            ...data,
            orderId: data.order_id,
            cfOrderId: data.cf_order_id,
            certificateId: data.certificate_id,
          }
        });
      }
    }

    return NextResponse.json({ ordered: false });
  } catch (error) {
    console.error('check-order error:', error);
    // Return not ordered instead of 500 so the form always shows
    return NextResponse.json({ ordered: false });
  }
}
