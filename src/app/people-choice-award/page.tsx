import { Metadata } from 'next';
import PeopleChoiceClient from './PeopleChoiceClient';

export const metadata: Metadata = {
  title: "People's Choice Award 2026 | Top 20 Writers & Poets | Inkfetish Publication",
  description: "What if 200,000 readers had the power to choose the top 20 writers and poets? Register now for the People's Choice Award by Inkfetish Publication.",
  openGraph: {
    title: "People's Choice Award 2026 | Inkfetish Publication",
    description: "200,000+ readers will decide the Top 20 Writers & Poets. Exclusive publishing contracts, prizes worth ₹25,000, and permanent heritage wall recognition.",
    url: "https://www.inkfetish.in/people-choice-award",
    images: [
      {
        url: "https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1776802129/WhatsApp_Image_2026-04-22_at_1.37.09_AM_1_v2i3bu.jpg",
        width: 1080,
        height: 1080,
        alt: "People's Choice Award by Inkfetish",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "People's Choice Award 2026 | Inkfetish Publication",
    description: "200,000+ readers will decide the Top 20 Writers & Poets. Register your nomination now.",
    images: ["https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1776802129/WhatsApp_Image_2026-04-22_at_1.37.09_AM_1_v2i3bu.jpg"],
  }
};

export default function PeopleChoicePage() {
  return <PeopleChoiceClient />;
}
