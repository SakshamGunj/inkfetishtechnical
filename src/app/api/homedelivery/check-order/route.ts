import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing certificate ID' }, { status: 400 });
    }

    // Try Firestore check — if it fails (local dev / no credentials), gracefully return not ordered
    try {
      const { db } = await import('@/lib/firebase-admin');

      if (db) {
        const snapshot = await db
          .collection('poetry_festival_s2_delivery_orders')
          .where('certificateId', '==', id)
          .where('status', '==', 'PAID')
          .get();

        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          return NextResponse.json({ ordered: true, order: doc.data() });
        }
      }
    } catch (dbError) {
      // In local dev without credentials, silently treat as not ordered
      console.warn('check-order: Firestore unavailable, defaulting to not ordered:', (dbError as Error).message);
    }

    return NextResponse.json({ ordered: false });
  } catch (error) {
    console.error('check-order error:', error);
    // Return not ordered instead of 500 so the form always shows
    return NextResponse.json({ ordered: false });
  }
}
