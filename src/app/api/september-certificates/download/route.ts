import { NextRequest, NextResponse } from 'next/server';
import https from 'https';
import http from 'http';
import certificates from '@/data/september_certificates.json';

export const runtime = 'nodejs';

const PDF_BASE = 'https://formidable-lavender-b7kc5cti.edgeone.dev';

interface CertRecord {
  sno: number;
  name: string;
  phone: string;
  email: string;
  title: string;
  pdfUrl: string;
}

/**
 * Downloads the PDF buffer from EdgeOne reliably without undici fetch errors
 */
function fetchPdfBuffer(url: string): Promise<{ buffer: Buffer; contentType: string }> {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Inkfetish-Certificate-Portal/1.0)' } }, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return resolve(fetchPdfBuffer(res.headers.location));
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP status ${res.statusCode}`));
        }
        const chunks: Buffer[] = [];
        res.on('data', (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
        res.on('end', () => {
          resolve({
            buffer: Buffer.concat(chunks),
            contentType: res.headers['content-type'] || 'application/pdf',
          });
        });
        res.on('error', reject);
      })
      .on('error', reject);
  });
}

/**
 * GET /api/september-certificates/download?sno=1
 * Streams the PDF directly from EdgeOne with Content-Disposition: attachment
 * so iOS Safari, Android Chrome, and Desktop save the file directly to device.
 */
export async function GET(req: NextRequest) {
  const snoParam = req.nextUrl.searchParams.get('sno');
  const sno = Number(snoParam);

  if (!Number.isInteger(sno) || sno < 1 || sno > 200) {
    return NextResponse.json({ error: 'Invalid certificate serial number' }, { status: 400 });
  }

  const record = (certificates as CertRecord[]).find((c) => c.sno === sno);
  if (!record) {
    return NextResponse.json({ error: 'Certificate record not found' }, { status: 404 });
  }

  const targetPdfUrl = `${PDF_BASE}/${sno}.pdf`;

  try {
    const { buffer, contentType } = await fetchPdfBuffer(targetPdfUrl);

    const safeName = record.name.replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_+|_+$/g, '') || 'Participant';
    const filename = `Inkfetish_September_Writing_Contest_Certificate_${safeName}.pdf`;

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType || 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (err: any) {
    console.error('Error fetching certificate from upstream:', err);
    // If upstream fetch encounters any network error, redirect directly to EdgeOne CDN URL
    return NextResponse.redirect(targetPdfUrl, { status: 302 });
  }
}
