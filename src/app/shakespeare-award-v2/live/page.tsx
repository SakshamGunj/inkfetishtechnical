import { Metadata } from 'next';
import LiveEventClient from './LiveEventClient';

export const metadata: Metadata = {
  title: "Live Results Event | The Shakespeare Poetry Award Vol 2",
  description: "Join the live broadcast of the Shakespeare Poetry Award Vol 2 results. Experience the unboxing of the master trophy and the announcement of the top 10 winners.",
  openGraph: {
    title: "Live Results Event | The Shakespeare Poetry Award Vol 2",
    description: "Join the live broadcast of the Shakespeare Poetry Award Vol 2 results. Experience the unboxing of the master trophy and the announcement of the top 10 winners.",
    url: "https://www.inkfetish.in/shakespeare-award-v2/live",
    images: [
      {
        url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1782388720/Shakespeare_Poetry_Award_Content_2_1080_x_1080_px_2_bko409.png",
        width: 1080,
        height: 1080,
        alt: "Shakespeare Poetry Award Vol 2 Live Event",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Results Event | The Shakespeare Poetry Award Vol 2",
    description: "Join the live broadcast of the Shakespeare Poetry Award Vol 2 results.",
    images: ["https://res.cloudinary.com/dde8ekuuu/image/upload/v1782388720/Shakespeare_Poetry_Award_Content_2_1080_x_1080_px_2_bko409.png"],
  }
};

export default function LiveEventPage() {
  return <LiveEventClient />;
}
