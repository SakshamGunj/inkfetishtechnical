import { Metadata } from 'next';
import SeptemberWritingContest from '@/legacy-pages/SeptemberWritingContest';

export const metadata: Metadata = {
  title: 'September Writing Contest 2026 | Inkfetish',
  description: 'Join India\'s premier September writing contest. Submit your poems, short stories, and essays to win cash prizes, trophies, and publication in our print anthology.',
  keywords: [
    'writing contest',
    'september writing contest',
    'poetry competition',
    'short story contest',
    'cash prize writing',
    'Inkfetish',
    'publishing opportunity',
    'literary contest 2026'
  ],
  authors: [{ name: 'Inkfetish Publication' }],
  openGraph: {
    title: 'September Writing Contest 2026 | Inkfetish',
    description: 'Win ₹50,000 cash prizes, trophies & publication in our national print anthology.',
    type: 'website',
    siteName: 'Inkfetish Publication',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SeptemberWritingContestPage() {
  return <SeptemberWritingContest />;
}
