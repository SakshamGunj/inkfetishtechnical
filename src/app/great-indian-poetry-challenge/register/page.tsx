import { Metadata } from 'next';
import GreatIndianPoetryChallengeClient from '@/components/contests/GreatIndianPoetryChallengeClient';

const PREVIEW_IMAGE = 'https://www.inkfetish.in/images/great-indian-poetry-challenge.jpg';

export const metadata: Metadata = {
  title: 'Free Registration | The Great Indian Free Poetry Challenge | ink.fetish',
  description:
    'Register and submit your poem (up to 40 lines) for free in The Great Indian Free Poetry Challenge by ink.fetish. Trophy or Cash Prizes for Top 10 & Appreciation Letter for All.',
  openGraph: {
    title: 'Register Free | The Great Indian Free Poetry Challenge | ink.fetish',
    description:
      'Submit your poem (up to 40 lines) for free! Open Theme · Trophy or Cash Prizes for Top 10 · Official Appreciation Letter for All Participants.',
    url: 'https://www.inkfetish.in/great-indian-poetry-challenge/register',
    siteName: 'Inkfetish Publication',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: PREVIEW_IMAGE,
        width: 1024,
        height: 1024,
        alt: 'The Great Indian Free Poetry Challenge — Initiative by ink.fetish',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Register Free | The Great Indian Free Poetry Challenge | ink.fetish',
    description:
      'Submit your poem (up to 40 lines) for free! Open Theme · Trophy or Cash Prizes for Top 10 · Appreciation Letter for All.',
    images: [PREVIEW_IMAGE],
  },
};

export default function GreatIndianPoetryChallengeRegisterPage() {
  return <GreatIndianPoetryChallengeClient standaloneRegister={true} />;
}
