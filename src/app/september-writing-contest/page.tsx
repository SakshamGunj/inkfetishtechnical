import { Metadata } from 'next';
import SeptemberWritingContest from '@/legacy-pages/SeptemberWritingContest';

export const metadata: Metadata = {
  title: 'September Writing Competition | Inkfetish',
  description: 'Join 3,900+ writers across India. Submit your poem or short story, get evaluated by a 5-panel expert jury, and become a published author with a National Certificate.',
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
    title: 'September Writing Competition | Become a Published Author',
    description: 'Submit your work today. Get reviewed by our 5-panel expert jury, win cash prizes, and receive your printed ISBN book and National Certificate.',
    type: 'website',
    siteName: 'Inkfetish Publication',
    images: [
      {
        url: 'https://www.inkfetish.in/september-contest-preview.jpg',
        width: 1024,
        height: 1024,
        alt: 'September Writing Competition by Inkfetish Publication',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'September Writing Competition | Inkfetish',
    description: 'Submit your poem or short story to get evaluated by our expert jury and become a published author.',
    images: ['https://www.inkfetish.in/september-contest-preview.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SeptemberWritingContestPage() {
  return <SeptemberWritingContest />;
}
