import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Claim Your Hall of Fame Certificate | Poetry Festival Season 2',
  description: 'Get your official Hall of Fame Certificate for being selected among the top 200 writers in Poetry Festival Season 2.',
  openGraph: {
    title: 'Claim Your Hall of Fame Certificate | Poetry Festival Season 2',
    description: 'Get your official Hall of Fame Certificate for being selected among the top 200 writers in Poetry Festival Season 2.',
    images: [
      {
        url: 'https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1777555292/La_Polentina_-_Joey_Guidone_spmmpb.jpg',
        width: 1200,
        height: 630,
        alt: 'Poetry Festival Season 2 Hall of Fame Certificate',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claim Your Hall of Fame Certificate | Poetry Festival Season 2',
    description: 'Get your official Hall of Fame Certificate for being selected among the top 200 writers in Poetry Festival Season 2.',
    images: ['https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1777555292/La_Polentina_-_Joey_Guidone_spmmpb.jpg'],
  },
};

export default function HallOfFameCertificateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
