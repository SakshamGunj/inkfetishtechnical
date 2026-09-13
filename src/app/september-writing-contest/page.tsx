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
        url: 'https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1775897600/WhatsApp_Image_2026-04-09_at_2.59.25_PM-compressed_in2led.webp',
        width: 1200,
        height: 630,
        alt: 'September Writing Competition by Inkfetish Publication',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'September Writing Competition | Inkfetish',
    description: 'Submit your poem or short story to get evaluated by our expert jury and become a published author.',
    images: ['https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1775897600/WhatsApp_Image_2026-04-09_at_2.59.25_PM-compressed_in2led.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SeptemberWritingContestPage() {
  return <SeptemberWritingContest />;
}
