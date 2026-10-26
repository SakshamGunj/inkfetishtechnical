import { Metadata } from 'next';
import GreatIndianPoetryChallengeClient from '@/components/contests/GreatIndianPoetryChallengeClient';

const PREVIEW_IMAGE = 'https://www.inkfetish.in/images/great-indian-poetry-challenge.jpg';

export const metadata: Metadata = {
  title: 'The Great Indian Free Poetry Challenge | Initiative by ink.fetish',
  description:
    'Join The Great Indian Free Poetry Challenge by ink.fetish — India’s 210,000+ writers community. Open Theme, 40 Lines Maximum, Trophy or Cash Prizes for Top 10 Poets, and Official Appreciation Letter for All Participants. 100% Free Entry (₹0).',
  openGraph: {
    title: 'The Great Indian Free Poetry Challenge | Initiative by ink.fetish',
    description:
      '100% Free Entry (₹0) · Open Theme · 40 Lines Max · Trophy or Cash Prizes for Top 10 Poets · Appreciation Letter for All Participants. Register & Submit Your Poem Now!',
    url: 'https://www.inkfetish.in/great-indian-poetry-challenge',
    siteName: 'Inkfetish Publication',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: PREVIEW_IMAGE,
        width: 1024,
        height: 1024,
        alt: 'The Great Indian Free Poetry Challenge — Initiative by ink.fetish',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Great Indian Free Poetry Challenge | Initiative by ink.fetish',
    description:
      '100% Free Entry (₹0) · Open Theme · 40 Lines Max · Trophy or Cash Prizes for Top 10 · Appreciation Letter for All. Submit your poem now!',
    images: [PREVIEW_IMAGE],
  },
};

export default function GreatIndianPoetryChallengePage() {
  return <GreatIndianPoetryChallengeClient />;
}
