import { NextResponse } from 'next/server';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase() || '';

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const csvPath = path.join(process.cwd(), 'src', 'data', 'pf_transactions.csv');
    
    if (!fs.existsSync(csvPath)) {
      console.error('Data file not found at:', csvPath);
      return NextResponse.json({ error: 'Data source missing' }, { status: 500 });
    }

    const fileContent = fs.readFileSync(csvPath, 'utf-8');
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      relax_quotes: true,
    });

    const results = [];
    
    for (const record of records) {
      const name = record['Name'] || '';
      if (name.toLowerCase().includes(q)) {
        const phone = (record['Customer Phone'] || '').trim();
        let hint = '';
        
        if (phone.length >= 10) {
          // Normalize to 10 digits by removing country code if it exists (e.g. 91)
          let normalizedPhone = phone;
          if (normalizedPhone.startsWith('91') && normalizedPhone.length > 10) {
            normalizedPhone = normalizedPhone.substring(2);
          }
          
          if (normalizedPhone.length >= 7) {
            const first4 = normalizedPhone.substring(0, 4);
            const remainingXs = Math.max(0, normalizedPhone.length - 7); // Usually 3 x's for a 10 digit number leaving 3 digits
            hint = first4 + 'x'.repeat(remainingXs);
          }
        }

        results.push({
          id: record['CertificateID'],
          name: name,
          phoneHint: hint
        });
        
        // limit to 10 results for performance and UI cleanlines
        if (results.length >= 10) break;
      }
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error searching appreciation letter data:', error);
    return NextResponse.json({ error: 'Failed to search data' }, { status: 500 });
  }
}
