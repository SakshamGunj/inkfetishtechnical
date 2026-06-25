import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_VITE_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const { order_id, title, poem } = await request.json();

    if (!order_id || !title || !poem) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Update the existing payment row with the poem details
    const { error } = await supabase
      .from('shakespeare_award_v2_payments')
      .update({
        poem_title: title,
        poem_body: poem,
        updated_at: new Date().toISOString()
      })
      .eq('order_id', order_id);

    if (error) {
      console.error('Supabase update error:', error.message);
      return NextResponse.json({ error: 'Failed to save to database' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Submit poem error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
