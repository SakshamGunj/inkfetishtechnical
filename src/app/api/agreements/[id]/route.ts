import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET: Fetch completed agreement details by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

        // Fetch agreement with its parties
        const { data: agreement, error } = await supabase
            .from('agreements')
            .select(`
                *,
                parties:agreement_parties (*)
            `)
            .eq('id', id)
            .single();

        if (error || !agreement) {
            console.error('Error fetching agreement:', error);
            return NextResponse.json({ error: 'Agreement not found' }, { status: 404 });
        }

        return NextResponse.json({ agreement });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
