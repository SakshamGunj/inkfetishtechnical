import { Metadata } from 'next';
import WinnersClient from './WinnersClient';

const OG_IMAGE_LANDSCAPE = "https://res.cloudinary.com/dde8ekuuu/image/upload/c_fill,w_1200,h_630,q_auto,f_jpg/v1788291912/ChatGPT_Image_Sep_2_2026_01_13_09_AM_1_vb4vp2.png";
const OG_IMAGE_SQUARE = "https://res.cloudinary.com/dde8ekuuu/image/upload/c_fill,w_800,h_800,q_auto,f_jpg/v1788291912/ChatGPT_Image_Sep_2_2026_01_13_09_AM_1_vb4vp2.png";

export const metadata: Metadata = {
  title: "🏆 Official Winners Announced: People's Choice Award 2026 | Inkfetish Publication",
  description: "The people have decided! Announcing India's Top 20 Writers & Poets in the People's Choice Award 2026 by Inkfetish Publication. View the official announcement & winners list.",
  alternates: {
    canonical: "https://www.inkfetish.in/people-choice-award/winners",
  },
  openGraph: {
    title: "🏆 People's Choice Award 2026 — Official Winners Announced!",
    description: "The people have decided! Celebrating India's Top 20 Poets & Authors chosen directly by public voting across 200,000+ readers.",
    url: "https://www.inkfetish.in/people-choice-award/winners",
    siteName: "Inkfetish Publication",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: OG_IMAGE_LANDSCAPE,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "People's Choice Award 2026 Official Winners Announcement - Inkfetish Publication",
      },
      {
        url: OG_IMAGE_SQUARE,
        width: 800,
        height: 800,
        type: "image/jpeg",
        alt: "People's Choice Award 2026 Golden Statuette Trophy",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "🏆 People's Choice Award 2026 — Official Winners Announced!",
    description: "The people have decided! India's Top 20 Writers & Poets of the People's Choice Award 2026. View the official announcement & rankings.",
    images: [OG_IMAGE_LANDSCAPE],
  }
};

export default function WinnersPage() {
  return <WinnersClient />;
}
