import { Metadata } from 'next';
import PeopleChoiceClient from './PeopleChoiceClient';

const PREVIEW_IMAGE = "https://res.cloudinary.com/dde8ekuuu/image/upload/v1788291912/ChatGPT_Image_Sep_2_2026_01_13_09_AM_1_vb4vp2.png";

export const metadata: Metadata = {
  title: "People's Choice Award 2026 | Top 20 Writers & Poets | Inkfetish Publication",
  description: "India's premier democratic literary honor decided by 200,000+ readers. Physical Golden Statuette, free solo book publishing contract, ₹25,000 author goodies & national recognition for Top 20 writers & poets.",
  openGraph: {
    title: "People's Choice Award 2026 | Inkfetish Publication",
    description: "India's premier democratic literary honor decided by 200,000+ readers. Physical Golden Statuette, solo book publishing contract & ₹25,000 author kit for Top 20 writers & poets.",
    url: "https://www.inkfetish.in/people-choice-award",
    siteName: "Inkfetish Publication",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: PREVIEW_IMAGE,
        width: 1080,
        height: 1080,
        alt: "People's Choice Award 2026 Golden Statuette & Official Kit - Inkfetish Publication",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "People's Choice Award 2026 | Inkfetish Publication",
    description: "India's premier democratic literary honor decided by 200,000+ readers. Physical Golden Statuette, solo book publishing contract & ₹25,000 goodies for Top 20.",
    images: [PREVIEW_IMAGE],
  }
};

export default function PeopleChoicePage() {
  return <PeopleChoiceClient />;
}
