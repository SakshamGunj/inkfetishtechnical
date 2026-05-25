import React from 'react';
import HoneyAndHurtClient from './HoneyAndHurtClient';

export const metadata = {
  title: 'Honey & Hurt | Become a Published Co-Author in 15 Days',
  description: 'Apply for Honey & Hurt by Inkfetish: a premium anthology for love, heartbreak, healing, poetry, and prose. Limited first-edition author slots.',
  openGraph: {
    title: 'Honey & Hurt | Become a Published Co-Author in 15 Days',
    description: 'Apply for Honey & Hurt by Inkfetish: a premium anthology for love, heartbreak, healing, poetry, and prose. Limited first-edition author slots.',
    url: 'https://www.inkfetish.in/anthology/honey-and-hurt',
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
    title: 'Honey & Hurt | Become a Published Co-Author in 15 Days',
    description: 'Apply for Honey & Hurt by Inkfetish: a premium anthology for love, heartbreak, healing, poetry, and prose. Limited first-edition author slots.',
    images: ['https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1779675277/ChatGPTImageMay25202607_43_49A_chgtxw.jpg'],
  },
};

export default function HoneyAndHurtPage() {
  return <HoneyAndHurtClient />;
}
