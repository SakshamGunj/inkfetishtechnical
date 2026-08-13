import { Metadata } from 'next';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, limit, doc, getDoc } from 'firebase/firestore';
import FeaturedWritingsClient from './FeaturedWritingsClient';

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  let authorData = null;

  try {
    const portfoliosRef = collection(db, 'author_portfolios');
    const q = query(portfoliosRef, where("username", "==", username.toLowerCase()), limit(1));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      authorData = querySnapshot.docs[0].data();
    } else {
      const docRef = doc(db, 'author_portfolios', username);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        authorData = docSnap.data();
      }
    }
  } catch (error) {
    console.error("Metadata fetch error:", error);
  }

  if (!authorData) {
    return {
      title: "Author Writings Not Found | Inkfetish",
      description: "The requested author portfolio could not be found in our database.",
    };
  }

  return {
    title: `Featured Writings by ${authorData.name} (@${username}) | Inkfetish`,
    description: `Read all published poems, prose excerpts, and featured literature by ${authorData.name} on Inkfetish.`,
  };
}

export default async function FeaturedWritingsPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  return <FeaturedWritingsClient username={username} />;
}
