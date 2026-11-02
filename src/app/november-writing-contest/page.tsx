import { Metadata } from 'next';
import NovemberWritingContestPortal from '@/components/contests/NovemberWritingContestPortal';

export const metadata: Metadata = {
  title: 'November Poetry & Writing Contest 2026 | Inkfetish Publication (Official Portal)',
  description:
    'An initiative by Inkfetish Publication (Officially GST & MSME Registered Company Based in India). Open Theme · All Languages · Top 10 Winners Trophy or Cash Prize + Guaranteed National Certificate for All Participants. Register & submit your entry online.',
  keywords: [
    'November Poetry & Writing Contest 2026',
    'Inkfetish writing contest',
    'poetry competition India 2026',
    'short story writing contest',
    'Inkfetish Publication',
    'national writing contest with certificate',
    'cash prize poetry contest',
  ],
  authors: [{ name: 'Inkfetish Publication' }],
  alternates: {
    canonical: 'https://www.inkfetish.in/november-writing-contest',
  },
  openGraph: {
    title: 'November Poetry & Writing Contest 2026 | Inkfetish Publication',
    description:
      'Open Theme · All Languages · Online Submission. Top 10 Winners receive Winner Trophy or Cash Prize + Guaranteed National Certificate & Appreciation Letter for every participant. Officially GST & MSME Registered in India.',
    url: 'https://www.inkfetish.in/november-writing-contest',
    siteName: 'ink.fetish · Inkfetish Publication',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://www.inkfetish.in/images/inkfetish_logo.webp',
        width: 800,
        height: 800,
        alt: 'Inkfetish Publication — November Poetry & Writing Contest 2026',
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
    title: 'November Poetry & Writing Contest 2026 | Inkfetish Publication',
    description:
      'Open Theme · All Languages · Top 10 Winners Trophy/Cash + Guaranteed National Certificate for All. Officially GST & MSME Registered Company Based in India.',
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

export default function NovemberWritingContestPage() {
  return <NovemberWritingContestPortal />;
}
