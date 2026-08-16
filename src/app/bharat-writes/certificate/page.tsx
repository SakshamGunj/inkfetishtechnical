import React from 'react';
import BharatWritesCertificateClient from './BharatWritesCertificateClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.inkfetish.in'),
  title: 'Claim Your Bharat Pride Kit | Inkfetish Publication',
  description: 'Celebrate your participation in the National Independence Poetry Contest. Claim your physical Bharat Pride Certificate and premium metallic medal today!',
  openGraph: {
    title: 'Claim Your Bharat Pride Kit | Inkfetish Publication',
    description: 'Celebrate your participation in the National Independence Poetry Contest. Claim your physical Bharat Pride Certificate and premium metallic medal today!',
    url: 'https://www.inkfetish.in/bharat-writes/certificate',
    siteName: 'Inkfetish Publication',
    images: [
      {
        url: '/images/bharat-pride-mockup.jpg',
        width: 1200,
        height: 630,
        alt: 'Bharat Pride Honor Kit - Premium Certificate and Medal',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claim Your Bharat Pride Kit | Inkfetish Publication',
    description: 'Celebrate your participation in the National Independence Poetry Contest. Claim your physical Bharat Pride Certificate and premium metallic medal today!',
    images: ['/images/bharat-pride-mockup.jpg'],
  },
};

export default function BharatWritesCertificatePage() {
  return <BharatWritesCertificateClient />;
}
