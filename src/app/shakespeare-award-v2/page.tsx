import { Metadata } from 'next';
import ShakespeareAwardClient from './ShakespeareAwardClient';

export const metadata: Metadata = {
  title: "The Shakespeare Poetry Award Vol 2 | Claim Your Legacy",
  description: "The absolute highest honor in modern poetry. Volume 2 is officially live. Submit your masterpiece and cement your legacy.",
  openGraph: {
    title: "The Shakespeare Poetry Award Vol 2 | Claim Your Legacy",
    description: "The absolute highest honor in modern poetry. Volume 2 is officially live.",
    url: "https://www.inkfetish.in/shakespeare-award-v2",
    images: [
      {
        url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776189507/Banner_SPA_hudujw_xkk65b-compressed_oho1wm.webp",
        width: 1200,
        height: 630,
        alt: "Shakespeare Poetry Award Vol 2",
      }
    ]
  },
};

export default function ShakespeareAwardPage() {
  return <ShakespeareAwardClient />;
}
