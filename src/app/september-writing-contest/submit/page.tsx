import { Metadata } from 'next';
import SeptemberSubmitClient from './SeptemberSubmitClient';

export const metadata: Metadata = {
  title: 'Submit Your Entry | September Writing Competition | Inkfetish',
  description: 'Submit your poem, short story, novella or essay for the September Writing Competition by Inkfetish.',
  robots: { index: false, follow: false },
};

export default function SeptemberSubmitPage() {
  return <SeptemberSubmitClient />;
}
