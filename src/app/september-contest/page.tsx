import { Metadata } from 'next';
import SeptemberWritingContest from '@/legacy-pages/SeptemberWritingContest';

export const metadata: Metadata = {
  title: 'September Writing Contest 2026 | Inkfetish',
  description: 'Join India\'s premier September writing contest. Submit your poems, short stories, and essays to win cash prizes, trophies, and publication in our print anthology.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function SeptemberContestPage() {
  return <SeptemberWritingContest />;
}
