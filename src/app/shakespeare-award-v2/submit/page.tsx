import SubmissionClient from './SubmissionClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Submit Your Poem | Shakespeare Poetry Award Vol 2',
  description: 'Submit your entry for the Shakespeare Poetry Award Vol 2.',
};

export default function SubmitPage() {
  return <SubmissionClient />;
}
