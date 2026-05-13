import type { Metadata } from 'next';
import PoetryFestivalClient from './PoetryFestivalClient';

export const metadata: Metadata = {
  title: 'Poetry Festival — Season 2 | Inkfetish Publications',
  description: 'India\'s most prestigious poetry contest returns. Submit your poem, get published in a real printed anthology, and win national recognition. Limited to 250 poets only.',
  openGraph: {
    title: 'Poetry Festival — Season 2 | Inkfetish Publications',
    description: 'India\'s most prestigious poetry contest returns. Submit your poem, get published in a real printed anthology, and win national recognition.',
    url: 'https://www.inkfetish.in/poetry-festival-s2-v2',
    siteName: 'Inkfetish',
    images: [
      {
        url: 'https://www.inkfetish.in/images/link_preview_card_v2.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function PoetryFestivalPage() {
  return <PoetryFestivalClient />;
}
