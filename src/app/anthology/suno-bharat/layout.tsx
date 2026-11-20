import { Metadata } from 'next';

const BANNER_PREVIEW_IMAGE =
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1795175653/ChatGPT_Image_Nov_19_2026_09_34_38_PM_1_yiqed5.png';

export const metadata: Metadata = {
  title: 'Suno Bharat — Official Bharat Writes Poetry Anthology | Inkfetish',
  description:
    'Your poem from the Bharat Writes — National Independence Poetry Contest is published inside Suno Bharat! Order your official copy with Publication Certificate, Free Entry to Next Contest & Free All-India Delivery (₹499).',
  openGraph: {
    title: 'Suno Bharat — Official Bharat Writes Poetry Anthology | Inkfetish',
    description:
      'Your poem from the Bharat Writes — National Independence Poetry Contest is published inside Suno Bharat! Includes Official Publication Certificate, Free Entry to Next Contest & Free All-India Shipping.',
    url: 'https://www.inkfetish.in/anthology/suno-bharat',
    siteName: 'Inkfetish Publication',
    images: [
      {
        url: BANNER_PREVIEW_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Suno Bharat — Official Bharat Writes Poetry Collection Book by Inkfetish',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Suno Bharat — Official Bharat Writes Poetry Anthology | Inkfetish',
    description:
      'Your poem from the Bharat Writes — National Independence Poetry Contest is published inside Suno Bharat! Includes Publication Certificate, Free Next Contest Entry & Free All-India Shipping.',
    images: [BANNER_PREVIEW_IMAGE],
  },
};

export default function SunoBharatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
