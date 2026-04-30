import type { Metadata } from 'next';
import PoetrySubmissionClient from './SubmissionClient';

export const metadata: Metadata = {
  title: 'Submit Your Poetry — Poetry Festival Season 2 | Inkfetish',
  description: 'Submit your poetry for Poetry Festival Season 2 in our A4 editorial portal.',
};

export default function PoetrySubmissionPage() {
  return <PoetrySubmissionClient />;
}
