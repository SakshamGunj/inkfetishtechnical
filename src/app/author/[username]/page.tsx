import { Metadata } from 'next';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, limit, doc, getDoc } from 'firebase/firestore';
import AuthorSiteClient from './AuthorSiteClient';

// Server-side Metadata Generation for Elite-Level SEO
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
      title: "Author Not Found | Inkfetish",
      description: "The requested author portfolio could not be found in our database.",
    };
  }

  return {
    title: `${authorData.name} (@${username}) | Author Portfolio`,
    description: authorData.bio || `Explore the official literary portfolio of ${authorData.name} on Inkfetish.`,
    openGraph: {
      title: `${authorData.name} | Inkfetish Author Portfolio`,
      description: authorData.bio || `Explore the official literary portfolio of ${authorData.name} on Inkfetish.`,
      images: authorData.profile_image ? [{ url: authorData.profile_image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${authorData.name} | Author Portfolio`,
      description: authorData.bio || `Explore the official literary portfolio of ${authorData.name} on Inkfetish.`,
      images: authorData.profile_image ? [authorData.profile_image] : [],
    },
  };
}

export default async function AuthorPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  // We pass the username to the client component which handles state and real-time/interactive features
  return <AuthorSiteClient username={username} />;
}
