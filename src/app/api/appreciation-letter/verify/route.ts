import { NextResponse } from 'next/server';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, last3 } = body;

    if (!id || !last3 || last3.length !== 3) {
      return NextResponse.json({ success: false, error: 'Invalid verification payload' }, { status: 400 });
    }

    const csvPath = path.join(process.cwd(), 'src', 'data', 'pf_transactions.csv');
    
    if (!fs.existsSync(csvPath)) {
      return NextResponse.json({ success: false, error: 'Data source missing' }, { status: 500 });
    }

    const fileContent = fs.readFileSync(csvPath, 'utf-8');
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      relax_quotes: true,
    });

    for (const record of records) {
      if (record['CertificateID'] === id) {
        const phone = (record['Customer Phone'] || '').trim();
        
        let normalizedPhone = phone;
        if (normalizedPhone.startsWith('91') && normalizedPhone.length > 10) {
          normalizedPhone = normalizedPhone.substring(2);
        }

        if (normalizedPhone.endsWith(last3)) {
          return NextResponse.json({
            success: true,
            name: record['Name']
          });
        } else {
          return NextResponse.json({
            success: false,
            error: 'Verification failed. The last 3 digits do not match our records.'
          }, { status: 401 });
        }
      }
    }

    return NextResponse.json({ success: false, error: 'Record not found' }, { status: 404 });

  } catch (error) {
    console.error('Error verifying appreciation letter data:', error);
    return NextResponse.json({ success: false, error: 'Failed to process verification' }, { status: 500 });
  }
}
