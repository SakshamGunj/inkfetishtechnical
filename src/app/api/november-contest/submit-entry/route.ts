import { NextResponse } from 'next/server';
import { doc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import admin, { getAdminDb } from '@/lib/firebase-admin';
import { NOVEMBER_COLLECTION } from '@/lib/novemberContestPayment';

export const runtime = 'nodejs';

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Operation timed out')), ms)
    ),
  ]);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      docId,
      registrationId,
      fullName,
      email,
      whatsapp,
      age,
      tier,
      amount,
      category,
      language,
      title,
      content,
      lineCount,
      wordCount,
      entry2Category,
      entry2Language,
      entry2Title,
      entry2Content,
      entry2LineCount,
      entry2WordCount,
    } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Please provide your entry title and writing content.' },
        { status: 400 }
      );
    }

    const finalRegId =
      String(registrationId || docId || '').trim() ||
      `NOV26-${Math.floor(100000 + Math.random() * 900000)}`;
    const finalDocId = String(docId || finalRegId).trim();

    const basePayload: Record<string, unknown> = {
      registrationId: finalRegId,
      docId: finalDocId,
      fullName: String(fullName || '').trim(),
      email: String(email || '').trim().toLowerCase(),
      whatsapp: String(whatsapp || '').replace(/\D/g, '').slice(-10),
      age: String(age || '').trim(),
      tier: tier === '2_entries' ? '2_entries' : '1_entry',
      amount: tier === '2_entries' ? 499 : Number(amount || 399),
      category: category || 'Poetry',
      language: language || 'English',
      theme: 'Open Theme',
      title: String(title).trim(),
      content: String(content).trim(),
      lineCount: Number(lineCount || 0),
      wordCount: Number(wordCount || 0),
      status: 'SUBMITTED',
      payment_status: 'PAID',
      contestName: 'November Poetry & Writing Contest 2026',
      submittedAtIso: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (tier === '2_entries') {
      basePayload.entry2Category = entry2Category || category || 'Poetry';
      basePayload.entry2Language = entry2Language || language || 'English';
      basePayload.entry2Title = String(entry2Title || '').trim();
      basePayload.entry2Content = String(entry2Content || '').trim();
      basePayload.entry2LineCount = Number(entry2LineCount || 0);
      basePayload.entry2WordCount = Number(entry2WordCount || 0);
    }

    // 1. Save to november_writing_contest_2026 and mirror to september_contest_submissions (tagged with contest: november_writing_contest_2026)
    await Promise.allSettled([
      withTimeout(
        setDoc(
          doc(db, NOVEMBER_COLLECTION, finalDocId),
          {
            ...basePayload,
            submittedAt: serverTimestamp(),
          },
          { merge: true }
        ),
        2500
      ),
      withTimeout(
        setDoc(
          doc(db, 'september_contest_submissions', finalDocId),
          {
            ...basePayload,
            contest: 'november_writing_contest_2026',
            submittedAt: serverTimestamp(),
          },
          { merge: true }
        ),
        2500
      ),
    ]);

    // 2. Non-blocking Admin SDK mirror
    void (async () => {
      try {
        const firestore = getAdminDb();
        if (firestore) {
          await firestore
            .collection(NOVEMBER_COLLECTION)
            .doc(finalDocId)
            .set(
              {
                ...basePayload,
                submittedAt: admin.firestore.FieldValue.serverTimestamp(),
              },
              { merge: true }
            );
        }
      } catch {
        // ignore
      }
    })();

    return NextResponse.json({
      success: true,
      docId: finalDocId,
      registrationId: finalRegId,
    });
  } catch (err: any) {
    console.error('Error submitting November Contest entry:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to submit entry' },
      { status: 500 }
    );
  }
}
