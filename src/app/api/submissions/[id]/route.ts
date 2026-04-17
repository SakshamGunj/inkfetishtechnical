import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!db) {
      throw new Error("Firebase Database is not initialized. Please ensure credentials are set.");
    }
    const { id } = await params;
    const docSnapshot = await db.collection("iwl_submissions").doc(id).get();
    
    if (!docSnapshot.exists) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    const data = docSnapshot.data();
    if (!data) {
      return NextResponse.json({ error: "Data empty" }, { status: 404 });
    }

    let activeSubmission = null;
    const hasSub1 = data.submission1 && data.submission1.content && data.submission1.content.trim().length > 0;
    const hasSub2 = data.submission2 && data.submission2.content && data.submission2.content.trim().length > 0;

    if (hasSub1) {
      activeSubmission = data.submission1;
    } else if (hasSub2) {
      activeSubmission = data.submission2;
    }

    return NextResponse.json({
      submission: {
        id: docSnapshot.id,
        name: data.name,
        email: data.email,
        category: data.category,
        activeSubmission: activeSubmission
      }
    });
  } catch (error) {
    console.error("Error fetching submission details:", error);
    return NextResponse.json({ error: "Failed to fetch submission details" }, { status: 500 });
  }
}
