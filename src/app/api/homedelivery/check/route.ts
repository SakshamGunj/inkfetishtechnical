import { NextResponse } from 'next/server';

// Force Node.js runtime for full fetch/crypto support on Vercel
export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const certificateId = searchParams.get('id');

    if (!certificateId) {
      return NextResponse.json({ error: 'Missing certificate ID' }, { status: 400 });
    }

    try {
      const { db } = await import('@/lib/firebase-admin');

      if (!db) {
        console.warn('Firebase Admin not initialized, defaulting to not ordered.');
        return NextResponse.json({ ordered: false });
      }

      // Query for any PAID order matching the certificateId
      const snapshot = await db.collection('poetry_festival_s2_delivery_orders')
        .where('certificateId', '==', certificateId)
        .where('status', '==', 'PAID')
        .get();

      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        return NextResponse.json({ ordered: true, order: doc.data() });
      }
    } catch (dbError) {
      console.warn('Check order: Firestore unavailable, defaulting to not ordered:', (dbError as Error).message);
    }

    return NextResponse.json({ ordered: false });
  } catch (error) {
    console.error('Check order error:', error);
    return NextResponse.json({ ordered: false });
  }
}
