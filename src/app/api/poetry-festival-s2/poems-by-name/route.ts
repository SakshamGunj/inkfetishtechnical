import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_VITE_SUPABASE_ANON_KEY!
);

/**
 * Strips HTML tags and converts common HTML patterns to plain text
 * so we can present poems in clean Markdown format
 */
function htmlToPlainText(html: string): string {
  if (!html) return '';

  let text = html;

  // Convert <br> and </p> and </div> to newlines
  text = text.replace(/<br\s*\/?>/gi, '\n');
  text = text.replace(/<\/p>/gi, '\n');
  text = text.replace(/<\/div>/gi, '\n');
  text = text.replace(/<\/h[1-6]>/gi, '\n');
  text = text.replace(/<p[^>]*>/gi, '');
  text = text.replace(/<div[^>]*>/gi, '');
  text = text.replace(/<h[1-6][^>]*>/gi, '');

  // Strip all remaining HTML tags
  text = text.replace(/<[^>]+>/g, '');

  // Decode common HTML entities
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  text = text.replace(/&rsquo;/g, "'");
  text = text.replace(/&lsquo;/g, "'");
  text = text.replace(/&rdquo;/g, '"');
  text = text.replace(/&ldquo;/g, '"');
  text = text.replace(/&mdash;/g, '—');
  text = text.replace(/&ndash;/g, '–');
  text = text.replace(/&hellip;/g, '...');

  // Collapse excessive blank lines (max 2 consecutive newlines)
  text = text.replace(/\n{3,}/g, '\n\n');

  return text.trim();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name')?.trim();

  if (!name || name.length < 2) {
    return NextResponse.json({ error: 'Name parameter required (min 2 chars)' }, { status: 400 });
  }

  try {
    // Case-insensitive search using ilike
    const { data, error } = await supabase
      .from('poetry_festival_s2_submissions')
      .select('id, title, poetryHtml, wordCount, poem_number, created_at, authorName')
      .ilike('authorName', `%${name}%`)
      .order('poem_number', { ascending: true })
      .limit(4); // Max 2 poems per writer, grab a few extra for safety

    if (error) {
      console.error('Supabase query error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ poems: [] });
    }

    // De-duplicate by title (same person may have submitted multiple times)
    const seen = new Set<string>();
    const uniquePoems: typeof data = [];
    for (const row of data) {
      const key = (row.title || '').toLowerCase().trim();
      if (!seen.has(key)) {
        seen.add(key);
        uniquePoems.push(row);
      }
    }

    const poems = uniquePoems.slice(0, 2).map((row, idx) => ({
      id: row.id,
      title: row.title || 'Untitled',
      authorName: row.authorName,
      poemNumber: row.poem_number || idx + 1,
      wordCount: row.wordCount || 0,
      plainText: htmlToPlainText(row.poetryHtml || ''),
      submittedAt: row.created_at,
    }));

    return NextResponse.json({ poems });
  } catch (err) {
    console.error('poems-by-name route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
