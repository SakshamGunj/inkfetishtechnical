import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Helper to get party and agreement by token
async function getPartyByToken(token: string) {
    const { data: party, error } = await supabase
        .from('agreement_parties')
        .select(`
            *,
            agreements (*)
        `)
        .eq('token', token)
        .single();

    return { party, error };
}

// GET: Fetch agreement details for a signing link
export async function GET(req: Request, { params }: { params: { token: string } }) {
    try {
        const { token } = params;
        if (!token) return NextResponse.json({ error: 'Token is required' }, { status: 400 });

        const { party, error } = await getPartyByToken(token);

        if (error || !party) {
            console.error('Error fetching party:', error);
            return NextResponse.json({ error: 'Invalid or expired link' }, { status: 404 });
        }

        return NextResponse.json({ party });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST: Sign the agreement
export async function POST(req: Request, { params }: { params: { token: string } }) {
    try {
        const { token } = params;
        const body = await req.json();
        const { signatureData } = body; // can be base64 image or typed name

        if (!token) return NextResponse.json({ error: 'Token is required' }, { status: 400 });
        if (!signatureData) return NextResponse.json({ error: 'Signature is required' }, { status: 400 });

        const { party, error } = await getPartyByToken(token);

        if (error || !party) {
            return NextResponse.json({ error: 'Invalid or expired link' }, { status: 404 });
        }

        if (party.has_signed) {
            return NextResponse.json({ error: 'Already signed' }, { status: 400 });
        }

        const agreementId = party.agreement_id;

        // Update the party as signed
        const { error: updateError } = await supabase
            .from('agreement_parties')
            .update({
                has_signed: true,
                signed_at: new Date().toISOString(),
                signature_data: signatureData
            })
            .eq('id', party.id);

        if (updateError) {
            console.error('Error updating signature:', updateError);
            return NextResponse.json({ error: 'Failed to save signature' }, { status: 500 });
        }

        // Check if all parties have signed
        const { data: allParties, error: allPartiesError } = await supabase
            .from('agreement_parties')
            .select('has_signed')
            .eq('agreement_id', agreementId);

        if (!allPartiesError && allParties) {
            const allSigned = allParties.every((p: any) => p.has_signed);
            
            if (allSigned) {
                // Update main agreement to 'completed'
                await supabase
                    .from('agreements')
                    .update({ status: 'completed' })
                    .eq('id', agreementId);
            }
        }

        return NextResponse.json({ message: 'Successfully signed' });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
