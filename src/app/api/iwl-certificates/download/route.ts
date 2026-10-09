import { NextRequest, NextResponse } from 'next/server';
import letters from '@/data/iwl_s2_letters.json';

export const runtime = 'nodejs';

const PDF_BASE = 'https://purring-beige-qsq1caog.edgeone.dev';

/**
 * GET ?id=12 -> streams https://purring-beige-qsq1caog.edgeone.dev/12.pdf as a forced download.
 * (Proxied so the browser saves the file directly instead of opening it, even though the PDF
 * lives on another domain.)
 */
export async function GET(req: NextRequest) {
  const id = Number(req.nextUrl.searchParams.get('id'));
  const letter = Number.isInteger(id) ? (letters as { id: number; name: string }[]).find((l) => l.id === id) : null;
  if (!letter) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const upstream = await fetch(`${PDF_BASE}/${id}.pdf`, { cache: 'no-store' });
  if (!upstream.ok || !upstream.body) {
    return NextResponse.json({ error: 'Letter not available yet' }, { status: 404 });
  }

  const safe = letter.name.replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '') || 'Writer';
  const headers: Record<string, string> = {
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename="IWL_S2_Letter_of_Honour_${safe}.pdf"`,
    'Cache-Control': 'public, max-age=3600',
  };
  const len = upstream.headers.get('content-length');
  if (len) headers['Content-Length'] = len;
  return new NextResponse(upstream.body, { headers });
}
