import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export interface PoetrySubmissionPayload {
  authorName: string;
  poemTitle: string;
  poemText: string;
}

export const addPoetrySubmission = async (payload: PoetrySubmissionPayload) => {
  const docRef = await addDoc(collection(db, "poetry_submissions"), {
    ...payload,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

