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
    const csvPath = path.join(process.cwd(), 'src', 'data', 'hall_of_fame_poetry_fest.csv');
    
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
        results.push({
          id: record['CertificateID'],
          name: name,
          file: record['file']
        });
        
        // limit to 10 results for performance and UI cleanliness
        if (results.length >= 10) break;
      }
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error searching hall of fame certificate data:', error);
    return NextResponse.json({ error: 'Failed to search data' }, { status: 500 });
  }
}
