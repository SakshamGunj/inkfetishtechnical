import React from 'react';
import HoneyAndHurtSubmitClient from './SubmitClient';

export const metadata = {
  title: 'Submit Your Manuscript | Honey & Hurt Anthology',
  description: 'Official submission portal for Honey & Hurt Anthology. Submit your verified co-author writing piece.',
  openGraph: {
    title: 'Submit Your Manuscript | Honey & Hurt Anthology',
    description: 'Official submission portal for Honey & Hurt Anthology. Submit your verified co-author writing piece.',
    url: 'https://www.inkfetish.in/anthology/honey-and-hurt/submit',
    siteName: 'Inkfetish Publications',
    images: [
      {
        url: 'https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1779675277/ChatGPTImageMay25202607_43_49A_chgtxw.jpg',
        width: 1200,
        height: 630,
        alt: 'Honey and Hurt Anthology Cover Art',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Submit Your Manuscript | Honey & Hurt Anthology',
    description: 'Official submission portal for Honey & Hurt Anthology. Submit your verified co-author writing piece.',
    images: ['https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1779675277/ChatGPTImageMay25202607_43_49A_chgtxw.jpg'],
  },
};

export default function SubmitPage() {
  return <HoneyAndHurtSubmitClient />;
}
