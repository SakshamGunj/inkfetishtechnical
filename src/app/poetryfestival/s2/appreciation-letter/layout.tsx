import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Claim Your Verified Appreciation Letter | Poetry Festival Season 2',
  description: 'Get your officially verified Appreciation Letter for participating in Poetry Festival Season 2, hosted by Inkfetish Publications.',
  openGraph: {
    title: 'Claim Your Verified Appreciation Letter | Poetry Festival Season 2',
    description: 'Get your officially verified Appreciation Letter for participating in Poetry Festival Season 2, hosted by Inkfetish Publications.',
    images: [
      {
        url: 'https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1777555292/La_Polentina_-_Joey_Guidone_spmmpb.jpg',
        width: 1200,
        height: 630,
        alt: 'Poetry Festival Season 2 Appreciation Letter',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claim Your Verified Appreciation Letter | Poetry Festival Season 2',
    description: 'Get your officially verified Appreciation Letter for participating in Poetry Festival Season 2, hosted by Inkfetish Publications.',
    images: ['https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1777555292/La_Polentina_-_Joey_Guidone_spmmpb.jpg'],
  },
};

export default function AppreciationLetterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
