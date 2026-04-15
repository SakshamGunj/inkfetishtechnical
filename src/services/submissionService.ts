import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export interface SubmissionData {
  participantName: string;
  participantAge: string;
  selectedCount: number;
  price: number;
  poems: { title: string; contentHtml: string; }[];
  screenshotUrl: string;
  upiId: string;
}

export const addSubmission = async (submissionData: SubmissionData) => {
  try {
    const docRef = await addDoc(collection(db, 'submissions'), {
      ...submissionData,
      createdAt: serverTimestamp(),
    });
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
    throw new Error('Could not save submission to the database.');
  }
};
