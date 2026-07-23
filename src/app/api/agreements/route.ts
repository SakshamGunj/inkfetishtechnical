import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, amount, parties } = body;

        if (!title || !parties || parties.length === 0) {
            return NextResponse.json({ error: 'Title and parties are required' }, { status: 400 });
        }

        // Insert the agreement
        const { data: agreement, error: agreementError } = await supabase
            .from('agreements')
            .insert({ title, amount })
            .select('*')
            .single();

        if (agreementError) {
            console.error('Error creating agreement:', agreementError);
            return NextResponse.json({ error: 'Failed to create agreement', details: agreementError }, { status: 500 });
        }

        // Prepare parties
        const partiesData = parties.map((party: any) => ({
            agreement_id: agreement.id,
            name: party.name,
            email: party.email,
            phone: party.phone,
            token: crypto.randomUUID()
        }));

        // Insert parties
        const { data: insertedParties, error: partiesError } = await supabase
            .from('agreement_parties')
            .insert(partiesData)
            .select('*');

        if (partiesError) {
            console.error('Error creating parties:', partiesError);
            return NextResponse.json({ error: 'Failed to create parties' }, { status: 500 });
        }

        return NextResponse.json({
            message: 'Agreement created successfully',
            agreement,
            parties: insertedParties
        });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
