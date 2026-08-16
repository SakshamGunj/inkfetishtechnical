import { NextResponse } from 'next/server';
import certificatesData from '@/data/bharat-writes-certificates.json';
import { db } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }
    
    const normalizedQuery = query.trim().toLowerCase();
    
    // Find matching certificate in the JSON data by Phone only
    const matchedRecord = certificatesData.find((record: any) => {
      return record.Phone && record.Phone === normalizedQuery;
    });
    
    if (!matchedRecord) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    
    let hasPurchasedKit = false;
    
    // Check if they purchased the kit
    if (db) {
      try {
        const kitOrdersSnapshot = await db.collection('bharat_writes_kit_orders')
          .where('whatsapp', '==', normalizedQuery)
          .where('status', '==', 'PAID')
          .limit(1)
          .get();
          
        if (!kitOrdersSnapshot.empty) {
          hasPurchasedKit = true;
        }
      } catch (err) {
        console.error('Error checking kit purchase status:', err);
      }
    }
    
    return NextResponse.json({
      name: matchedRecord.Name || 'Participant',
      plan: matchedRecord.Package || '',
      status: matchedRecord.Status || '',
      link: matchedRecord.Link || '',
      hasPurchasedKit
    });

  } catch (error: any) {
    console.error('Certificate Search API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
