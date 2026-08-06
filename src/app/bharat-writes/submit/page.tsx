import type { Metadata } from 'next';
import BharatWritesSubmissionClient from './BharatWritesSubmissionClient';

export const metadata: Metadata = {
  title: 'Bharat Writes — National Independence Poetry Contest',
  description: 'Participate in the Bharat Writes National Independence Poetry Contest. A platform to voice your patriotic verses and win national recognition.',
  openGraph: {
    title: 'Bharat Writes — National Independence Poetry Contest',
    description: 'Participate in the Bharat Writes National Independence Poetry Contest. A platform to voice your patriotic verses and win national recognition.',
    url: 'https://www.inkfetish.in/bharat-writes/submit',
    siteName: 'Inkfetish',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/bharat_writes_og.jpg',
        width: 1200,
        height: 675,
        alt: 'Bharat Writes National Independence Poetry Contest Preview',
      },
    ],
  },
};

export default function BharatWritesSubmissionPage() {
  return <BharatWritesSubmissionClient />;
}
