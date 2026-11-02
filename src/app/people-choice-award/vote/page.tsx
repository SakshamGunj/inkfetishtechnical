import { Metadata } from 'next';
import VoteClient from './VoteClient';

const PREVIEW_IMAGE = "https://res.cloudinary.com/dde8ekuuu/image/upload/v1788291912/ChatGPT_Image_Sep_2_2026_01_13_09_AM_1_vb4vp2.png";

export const metadata: Metadata = {
  title: "Vote Now | People's Choice Award 2026 | Inkfetish Publication",
  description: "Official Reader Voting Portal for the People's Choice Award 2026. Cast your 5 votes for India's Top 20 writers and poets. Powered by Inkfetish Publication.",
  openGraph: {
    title: "Vote Now | People's Choice Award 2026",
    description: "Cast your official 5 votes for India's premier democratic literary honor. Decided by readers for the Top 20 writers & poets.",
    url: "https://www.inkfetish.in/people-choice-award/vote",
    siteName: "Inkfetish Publication",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: PREVIEW_IMAGE,
        width: 1080,
        height: 1080,
        alt: "People's Choice Award 2026 Voting Portal - Inkfetish Publication",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Vote Now | People's Choice Award 2026 | Inkfetish Publication",
    description: "Cast your official 5 votes for India's premier democratic literary honor. Decided by readers for the Top 20 writers & poets.",
    images: [PREVIEW_IMAGE],
  }
};

export default function VotePage() {
  return <VoteClient />;
}
