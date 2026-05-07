import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Syaahi Volume 1 | The Collector\'s Edition',
  description: 'Secure your copy of Syaahi Volume 1, the physical manifestation of the Indian Writers League Top 200 Hall of Fame. A premium anthology by Inkfetish Publication.',
  openGraph: {
    title: 'Syaahi Volume 1 | The Collector\'s Edition',
    description: 'Secure your copy of Syaahi Volume 1, the physical manifestation of the Indian Writers League Top 200 Hall of Fame. A premium anthology by Inkfetish Publication.',
    url: 'https://www.inkfetish.in/anthology/syaahi',
    siteName: 'Inkfetish',
    images: [
      {
        url: 'https://www.inkfetish.in/syaahi.png',
        width: 1200,
        height: 630,
        alt: 'Syaahi Volume 1 Collector\'s Edition',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Syaahi Volume 1 | The Collector\'s Edition',
    description: 'Secure your copy of Syaahi Volume 1, the physical manifestation of the Indian Writers League Top 200 Hall of Fame. A premium anthology by Inkfetish Publication.',
    images: ['https://www.inkfetish.in/syaahi.png'],
  },
};

export default function SyaahiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
