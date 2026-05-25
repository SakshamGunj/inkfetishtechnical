import React from 'react';
import HoneyAndHurtRegister from './RegisterClient';

export const metadata = {
  title: 'Apply for Honey & Hurt | Inkfetish Author Slot',
  description: 'Send your 60-second Honey & Hurt author application. No payment is collected on this form; fit confirmation happens first.',
  openGraph: {
    title: 'Apply for Honey & Hurt | Inkfetish Author Slot',
    description: 'Send your 60-second Honey & Hurt author application. Secure your verifiable publishing slot.',
    url: 'https://www.inkfetish.in/anthology/honey-and-hurt/register',
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
    title: 'Apply for Honey & Hurt | Inkfetish Author Slot',
    description: 'Send your 60-second Honey & Hurt author application. Secure your verifiable publishing slot.',
    images: ['https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1779675277/ChatGPTImageMay25202607_43_49A_chgtxw.jpg'],
  },
};

export default function RegisterPage() {
  return <HoneyAndHurtRegister />;
}
