import type { Metadata } from 'next';
import CertificatesClient from './CertificatesClient';

const title = 'Download Your Letter of Honour | Indian Writers League';
const description =
  'Participated in the Indian Writers League? Find and download your official Letter of Honour instantly — just start typing your name.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/indianwritersleague/certificates' },
  openGraph: {
    title,
    description,
    url: 'https://inkfetish.in/indianwritersleague/certificates',
    siteName: 'Inkfetish — Indian Writers League',
    type: 'website',
    images: [{ url: '/images/iwl_poster.jpg', width: 682, height: 1024, alt: 'Indian Writers League Letter of Honour' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/images/iwl_poster.jpg'] },
};

export default function Page() {
  return <CertificatesClient />;
}
