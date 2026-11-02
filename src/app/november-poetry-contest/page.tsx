import { Metadata } from 'next';
import NovemberWritingContestPortal from '@/components/contests/NovemberWritingContestPortal';

export const metadata: Metadata = {
  title: 'November Poetry & Writing Contest 2026 | Official Registration & Submission Portal | Inkfetish',
  description:
    'Official Registration & Manuscript Submission Portal for the November Poetry & Writing Contest 2026 by Inkfetish Publication.',
};

export default function NovemberPoetryContestPage() {
  return <NovemberWritingContestPortal />;
}
