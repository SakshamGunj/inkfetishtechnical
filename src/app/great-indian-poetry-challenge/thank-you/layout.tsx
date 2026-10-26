import { Metadata } from 'next';

const PREVIEW_IMAGE = 'https://www.inkfetish.in/images/great-indian-poetry-challenge.jpg';

export const metadata: Metadata = {
  title: 'Poem Submitted | The Great Indian Free Poetry Challenge | ink.fetish',
  description:
    'Thank you for participating in The Great Indian Free Poetry Challenge by ink.fetish! Join the official WhatsApp group for Appreciation Letters and Result Announcements.',
  openGraph: {
    title: 'Proud Participant | The Great Indian Free Poetry Challenge | ink.fetish',
    description:
      'I just submitted my poem to The Great Indian Free Poetry Challenge by ink.fetish! Open Theme · Trophy or Cash Prizes for Top 10 · Appreciation Letter for All.',
    url: 'https://www.inkfetish.in/great-indian-poetry-challenge/thank-you',
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
    title: 'Proud Participant | The Great Indian Free Poetry Challenge | ink.fetish',
    description:
      'I just submitted my poem to The Great Indian Free Poetry Challenge by ink.fetish! Register & submit your poem for free.',
    images: [PREVIEW_IMAGE],
  },
};

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
