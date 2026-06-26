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
        url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1782388720/Shakespeare_Poetry_Award_Content_2_1080_x_1080_px_2_bko409.png",
        width: 1080,
        height: 1080,
        alt: "Shakespeare Poetry Award Vol 2",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "The Shakespeare Poetry Award Vol 2",
    description: "The absolute highest honor in modern poetry. Volume 2 is officially live.",
    images: ["https://res.cloudinary.com/dde8ekuuu/image/upload/v1782388720/Shakespeare_Poetry_Award_Content_2_1080_x_1080_px_2_bko409.png"],
  }
};

export default function ShakespeareAwardPage() {
  return <ShakespeareAwardClient />;
}
