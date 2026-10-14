import { Metadata } from 'next';
import { Suspense } from 'react';
import SeptemberCertificateClient from './SeptemberCertificateClient';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.inkfetish.in'),
  title: 'Certificate of Participation | September Writing Competition 2026',
  description:
    'Search and download your official Certificate of Participation for the Inkfetish September National Writing Competition 2026. Search instantly by your full name.',
  keywords: [
    'September Writing Contest Certificate',
    'Certificate of Participation',
    'Inkfetish September Contest',
    'Writing Competition 2026',
    'Inkfetish Publication Certificate',
    'Literature Award India',
  ],
  authors: [{ name: 'Inkfetish Publication' }],
  creator: 'Inkfetish Publication',
  publisher: 'Inkfetish Publication',
  openGraph: {
    title: 'Certificate of Participation | September Writing Competition 2026',
    description:
      'Search by your name to immediately view and download your official Certificate of Participation from Inkfetish Publication.',
    url: 'https://www.inkfetish.in/september-writing-contest/certificate',
    siteName: 'Inkfetish Publication',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://www.inkfetish.in/september-contest-preview.jpg',
        secureUrl: 'https://www.inkfetish.in/september-contest-preview.jpg',
        width: 1024,
        height: 1024,
        type: 'image/jpeg',
        alt: 'September Writing Competition Certificate of Participation — Inkfetish Publication',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Certificate of Participation | September Writing Competition 2026',
    description:
      'Search and download your official Certificate of Participation from Inkfetish Publication. Search instantly by your full name.',
    images: ['https://www.inkfetish.in/september-contest-preview.jpg'],
    creator: '@inkfetish',
    site: '@inkfetish',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SeptemberCertificatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F4EFE6] flex items-center justify-center p-6 text-center">
          <div className="space-y-4">
            <div className="w-12 h-12 border-4 border-[#7A1A1A] border-t-[#D4AF37] rounded-full animate-spin mx-auto" />
            <p className="font-serif text-[#2C1C13] text-lg font-bold">
              Loading Certificate Portal...
            </p>
          </div>
        </div>
      }
    >
      <SeptemberCertificateClient />
    </Suspense>
  );
}
