import { NextResponse } from 'next/server';
import admin from '@/lib/firebase-admin';

// Force Node.js runtime for full Firebase Admin & crypto support
export const runtime = 'nodejs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nominationId = searchParams.get('nomination_id');

  if (!nominationId) {
    return NextResponse.json({ error: 'Missing nomination_id' }, { status: 400 });
  }

  try {
    if (!admin.apps.length) {
      return NextResponse.json({ error: 'Firebase Admin not initialized' }, { status: 500 });
    }
    const db = admin.firestore();
    const doc = await db.collection('people_choice_registrations').doc(nominationId).get();

    if (!doc.exists) {
      return NextResponse.json({ found: false }, { status: 404 });
    }

    const data = doc.data()!;
    return NextResponse.json({
      found: true,
      nominationId,
      payment_status: data.payment_status || 'UNKNOWN',
      name: data.name || '',
      email: data.email || '',
      age: data.age || '',
      plan_amount: data.plan_amount || 449,
    });
  } catch (error) {
    console.error('Nomination lookup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, nominationId, fullName, email, whatsapp, age, plan } = body;

    if (!admin.apps.length) {
      return NextResponse.json({ error: 'Firebase Admin not initialized' }, { status: 500 });
    }
    const db = admin.firestore();


    if (action === 'CREATE_NOMINATION') {
      const timestamp = Date.now();
      const randomSuffix = Math.random().toString(36).substring(2, 7);
      const newNominationId = nominationId || `pca_${timestamp}_${randomSuffix}`;

      await db.collection('people_choice_registrations').doc(newNominationId).set({
        nomination_id: newNominationId,
        order_id: newNominationId,
        name: (fullName || '').trim(),
        email: (email || '').trim().toLowerCase(),
        whatsapp: (whatsapp || '').trim(),
        age: age || '',
        payment_status: 'STEP1_COMPLETED',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }, { merge: true });

      return NextResponse.json({
        success: true,
        nominationId: newNominationId
      });
    } 
    
    if (action === 'UPDATE_PLAN') {
      if (!nominationId) {
        return NextResponse.json({ error: 'Missing nominationId' }, { status: 400 });
      }

      const { payment_status: statusOverride } = body;

      await db.collection('people_choice_registrations').doc(nominationId).set({
        plan_amount: plan,
        payment_status: statusOverride || 'PENDING',
        updated_at: new Date().toISOString(),
      }, { merge: true });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action specified' }, { status: 400 });
  } catch (error) {
    console.error('People Choice Nominate API error stack:', error);
    if (error instanceof Error) {
      console.error(error.stack);
    }
    return NextResponse.json({ error: 'Internal server error saving nomination', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
