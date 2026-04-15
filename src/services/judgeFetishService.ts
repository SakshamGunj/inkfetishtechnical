import { db } from '../lib/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

export interface Submission {
  id: string;
  content: string;
  name: string;
  submittedAt: string;
  theme: string;
  title: string;
  eligible?: boolean;
}

export const getSubmissions = async (): Promise<Submission[]> => {
  const querySnapshot = await getDocs(collection(db, 'authorverseSummit'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Submission));
};

export const updateSubmissionStatus = async (id: string, eligible: boolean) => {
  const submissionRef = doc(db, 'authorverseSummit', id);
  await updateDoc(submissionRef, { eligible });
};
