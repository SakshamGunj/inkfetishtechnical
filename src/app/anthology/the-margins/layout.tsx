import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Margins | Limited Collector\'s Edition',
  description: 'The finest poems from the year\'s most anticipated poetry event, now immortalized in one exclusive anthology. Secure your physical copy of The Margins.',
  openGraph: {
    title: 'The Margins | Limited Collector\'s Edition',
    description: 'The finest poems from the year\'s most anticipated poetry event, now immortalized in one exclusive anthology. Secure your physical copy of The Margins.',
    url: 'https://www.inkfetish.in/anthology/the-margins',
    siteName: 'Inkfetish Publications',
    images: [
      {
        url: 'https://www.inkfetish.in/margins-landscape.png',
        width: 1200,
        height: 630,
        alt: 'The Margins Anthology Book Display',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Margins | Limited Collector\'s Edition',
    description: 'The finest poems from the year\'s most anticipated poetry event, now immortalized in one exclusive anthology. Secure your physical copy of The Margins.',
    images: ['https://www.inkfetish.in/margins-landscape.png'],
  },
};

export default function TheMarginsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
