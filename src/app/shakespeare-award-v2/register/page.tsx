import { Metadata } from 'next';
import RegisterClient from './RegisterClient';

export const metadata: Metadata = {
  title: 'Secure Checkout | Shakespeare Poetry Award Vol. 2',
  description: 'Complete your registration to claim your seat in the Shakespeare Poetry Award Volume 2.',
  openGraph: {
    title: 'Secure Checkout | Shakespeare Poetry Award Vol. 2',
    description: 'Claim your seat and become a formally published poet in the Shakespeare Anthology.',
    images: [
      {
        url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1782388720/Shakespeare_Poetry_Award_Content_2_1080_x_1080_px_2_bko409.png",
        width: 1080,
        height: 1080,
        alt: "Secure Checkout | Shakespeare Poetry Award Vol. 2",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: 'Secure Checkout | Shakespeare Poetry Award Vol. 2',
    description: 'Claim your seat and become a formally published poet in the Shakespeare Anthology.',
    images: ["https://res.cloudinary.com/dde8ekuuu/image/upload/v1782388720/Shakespeare_Poetry_Award_Content_2_1080_x_1080_px_2_bko409.png"],
  }
};

export default function RegisterPage() {
  return <RegisterClient />;
}
