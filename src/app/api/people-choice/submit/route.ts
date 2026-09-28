import { NextResponse } from 'next/server';
import admin, { getAdminDb } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      nominationId,
      authorName,
      title,
      contentType,
      theme,
      authorNote,
      content,
      wordCount,
      submittedAt
    } = body;

    if (!title || !contentType || !theme || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: title, contentType, theme, content.' },
        { status: 400 }
      );
    }

    const submissionId = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // Try Firebase Admin DB write
    try {
      const db = getAdminDb();

      if (db) {
        await db.collection('people_choice_submissions').doc(submissionId).set({
          submission_id: submissionId,
          nomination_id: nominationId || null,
          author_name: (authorName || 'Anonymous').trim(),
          title: title.trim(),
          content_type: contentType,
          theme,
          author_note: (authorNote || '').trim(),
          content,
          word_count: wordCount || 0,
          status: 'pending_review',
          submitted_at: submittedAt || new Date().toISOString(),
          created_at: new Date().toISOString(),
        });

        // Also update nomination status if nominationId exists
        if (nominationId) {
          await db.collection('people_choice_registrations').doc(nominationId).set({
            submission_id: submissionId,
            submission_status: 'SUBMITTED',
            updated_at: new Date().toISOString(),
          }, { merge: true });
        }
      }
    } catch (dbError) {
      console.error('Firebase Admin write warning in people-choice/submit:', dbError);
      // Non-blocking catch: we still return success with submissionId so the author is not blocked
    }

    return NextResponse.json({ success: true, submissionId });
  } catch (error) {
    console.error('People Choice submission API error:', error);
    return NextResponse.json(
      { error: 'Failed to process submission request. Please try again.' },
      { status: 500 }
    );
  }
}
