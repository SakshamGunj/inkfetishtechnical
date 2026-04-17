import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

export async function GET() {
  try {
    const submissionsSnapshot = await db
      .collection("iwl_submissions")
      .where("selected", "==", true)
      .get();
    
    const submissions: any[] = [];
    const seenEmails = new Set();

    submissionsSnapshot.forEach((doc) => {
      const data = doc.data();
      
      // Deduplicate by email
      if (data.email) {
        if (seenEmails.has(data.email)) return;
        seenEmails.add(data.email);
      }

      // We only want to show ONE submission per person.
      // We will pass down a single `activeSubmission` object.
      let activeSubmission = null;

      const hasSub1 = data.submission1 && data.submission1.content && data.submission1.content.trim().length > 0;
      const hasSub2 = data.submission2 && data.submission2.content && data.submission2.content.trim().length > 0;

      if (hasSub1) {
        activeSubmission = data.submission1;
      } else if (hasSub2) {
        activeSubmission = data.submission2;
      }

      submissions.push({ 
        id: doc.id, 
        name: data.name,
        email: data.email,
        category: data.category,
        activeSubmission: activeSubmission
      });
    });

    return NextResponse.json({ submissions });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}
