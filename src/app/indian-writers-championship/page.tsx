import { Metadata } from 'next';
import IndianWritersChampionshipPortal from '@/components/contests/IndianWritersChampionshipPortal';

export const metadata: Metadata = {
  title: 'Indian Writers Championship — ₹10,000 Cash Prize Pool | ink.fetish',
  description:
    'The Biggest Writing Championship on the Internet — Inviting Beginners & Experienced Writers. ₹10,000 Cash Prize Pool + Winner Memento & Medal · NGO-Verified Certificate · Judged by 5 Judges · Results Live on Zoom. Entry starts at ₹199.',
  keywords: [
    'Indian Writers Championship',
    'The Biggest Writing Championship on the Internet',
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
    title: 'Indian Writers Championship — ₹10,000 Cash Prize Pool | ink.fetish',
    description:
      'The Biggest Writing Championship on the Internet — Inviting Beginners & Experienced Writers. ₹10,000 Cash Prize Pool (1st: ₹5,000 · 2nd: ₹3,000 · 3rd: ₹1,000 · 4th: ₹1,000) + Winner Memento & Medal · NGO-Verified Certificate. Entry starts at ₹199.',
    url: 'https://www.inkfetish.in/indian-writers-championship',
    siteName: 'ink.fetish · Inkfetish Publication',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Indian Writers Championship — ₹10,000 Cash Prize Pool | ink.fetish',
    description:
      'The Biggest Writing Championship on the Internet — Inviting Beginners & Experienced Writers. ₹10,000 Cash Prize Pool + Winner Memento & Medal · NGO-Verified Certificate. Entry starts at ₹199.',
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
