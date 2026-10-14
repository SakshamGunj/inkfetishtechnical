import { Metadata } from 'next';
import { Suspense } from 'react';
import SeptemberCertificateClient from '@/app/september-writing-contest/certificate/SeptemberCertificateClient';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.inkfetish.in'),
  title: 'Certificate of Participation | September Writing Competition 2026',
  description:
    'Search and download your official Certificate of Participation for the Inkfetish September National Writing Competition 2026. Search instantly by your full name.',
  openGraph: {
    title: 'Certificate of Participation | September Writing Competition 2026',
    description:
      'Search by your name to immediately view and download your official Certificate of Participation from Inkfetish Publication.',
    url: 'https://www.inkfetish.in/september-certificates',
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
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F4EFE6] flex items-center justify-center p-6 text-center">
          <div className="w-12 h-12 border-4 border-[#7A1A1A] border-t-[#D4AF37] rounded-full animate-spin mx-auto" />
        </div>
      }
    >
      <SeptemberCertificateClient />
    </Suspense>
  );
}
