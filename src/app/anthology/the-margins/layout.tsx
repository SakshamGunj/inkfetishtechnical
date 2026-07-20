import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Margins | The Official Collection of Top 200 Hall of Fame Poets',
  description: 'The Margins is the official collection of the Top 200 Hall of Fame poets from Poetry Festival - Season 2. A premium anthology by Inkfetish Publications.',
  openGraph: {
    title: 'The Margins | The Official Collection of Top 200 Hall of Fame Poets',
    description: 'The Margins is the official collection of the Top 200 Hall of Fame poets from Poetry Festival - Season 2. A premium anthology by Inkfetish Publications.',
    url: 'https://www.inkfetish.in/anthology/the-margins',
    siteName: 'Inkfetish',
    images: [
      {
        url: 'https://res.cloudinary.com/dde8ekuuu/image/upload/v1778137798/margins-cover.webp',
        width: 1200,
        height: 630,
        alt: 'The Margins Anthology Cover',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Margins | The Official Collection of Top 200 Hall of Fame Poets',
    description: 'The Margins is the official collection of the Top 200 Hall of Fame poets from Poetry Festival - Season 2. A premium anthology by Inkfetish Publications.',
  },
};

export default function TheMarginsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
