import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Force Node.js runtime for full fetch/crypto support on Vercel
export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const certificateId = searchParams.get('id');

    if (!certificateId) {
      return NextResponse.json({ error: 'Missing certificate ID' }, { status: 400 });
    }

    if (!supabase) {
      console.warn('Supabase not initialized, defaulting to not ordered.');
      return NextResponse.json({ ordered: false });
    }

    // Query for any PAID order matching the certificateId in Supabase
    const { data, error } = await supabase
      .from('poetry_festival_s2_delivery_orders')
      .select('*')
      .eq('certificate_id', certificateId)
      .eq('status', 'PAID')
      .limit(1)
      .maybeSingle();

    if (error) {
      console.warn('Check order: Supabase query error:', error.message);
      return NextResponse.json({ ordered: false });
    }

    if (data) {
      // Map to support both camelCase and snake_case properties
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

    return NextResponse.json({ ordered: false });
  } catch (error) {
    console.error('Check order error:', error);
    return NextResponse.json({ ordered: false });
  }
}
