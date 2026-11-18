import { Metadata } from 'next';
import IndianWritersChampionshipPortal from '@/components/contests/IndianWritersChampionshipPortal';

export const metadata: Metadata = {
  title: 'Indian Writers Championship | The National Writing Competition by ink.fetish',
  description:
    'Indian Writers Championship — The National Writing Competition organised by ink.fetish (216,000+ Instagram Followers). ₹10,000 Cash Prize Pool + Winner Memento & Medal · NGO-Verified Recognition · Open to Writers & Poets Across India (Poetry, Short Stories, Novels & Creative Writing). Entry starts at ₹199.',
  keywords: [
    'Indian Writers Championship',
    'The National Writing Competition',
    'Inkfetish writing competition',
    'ink.fetish contest',
    'national poetry and writing contest India',
    'short stories novels creative writing competition',
    'NGO verified writing competition India',
  ],
  authors: [{ name: 'Inkfetish Publication' }],
  alternates: {
    canonical: 'https://www.inkfetish.in/indian-writers-championship',
  },
  openGraph: {
    title: 'Indian Writers Championship | The National Writing Competition by ink.fetish',
    description:
      'Organised by ink.fetish (216,000+ Instagram Followers). ₹10,000 Cash Prize Pool (1st: ₹5,000 · 2nd: ₹3,000 · 3rd: ₹1,000 · 4th: ₹1,000) + Winner Memento & Medal + NGO-Verified Recognition. Only 350 Participants · Results Live on Zoom.',
    url: 'https://www.inkfetish.in/indian-writers-championship',
    siteName: 'ink.fetish · Inkfetish Publication',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://www.inkfetish.in/images/inkfetish_logo.webp',
        width: 800,
        height: 800,
        alt: 'Indian Writers Championship — Organised by ink.fetish',
      },
      {
        url: 'https://www.inkfetish.in/images/inkfetish_logo.png',
        width: 800,
        height: 800,
        alt: 'Inkfetish Publication Official Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Indian Writers Championship | The National Writing Competition by ink.fetish',
    description:
      '₹10,000 Cash Prize Pool + Winner Memento & Medal + NGO-Verified Recognition. Open to Writers & Poets Across India in Poetry, Short Stories, Novels & Creative Writing.',
    images: [
      'https://www.inkfetish.in/images/inkfetish_logo.webp',
      'https://www.inkfetish.in/images/inkfetish_logo.png',
    ],
    creator: '@inkfetish',
  },
  icons: {
    icon: '/images/inkfetish_logo.webp',
    apple: '/images/inkfetish_logo.png',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function IndianWritersChampionshipPage() {
  return <IndianWritersChampionshipPortal />;
}
