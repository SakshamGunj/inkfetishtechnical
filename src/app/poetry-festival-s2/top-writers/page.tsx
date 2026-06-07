import { Metadata } from 'next';
import TopWritersClient from './TopWritersClient';

export const metadata: Metadata = {
  title: "Top Writers Showcase | Poetry Festival Season 2 | Inkfetish",
  description: "Explore the official directory of the Top 200+ Writers selected for the Poetry Festival Season 2. Celebrate outstanding contemporary poetry. Non-ranked list.",
  openGraph: {
    title: "Top Writers Showcase | Poetry Festival Season 2 | Inkfetish",
    description: "Explore the official directory of the Top 200+ Writers selected for the Poetry Festival Season 2. Celebrate outstanding contemporary poetry. Non-ranked list.",
    url: "https://www.inkfetish.in/poetry-festival-s2/top-writers",
    type: "website",
    images: [
      {
        url: "https://www.inkfetish.in/images/top-writers-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Poetry Festival Season 2 - Top Writers Showcase",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Writers Showcase | Poetry Festival Season 2 | Inkfetish",
    description: "Explore the official directory of the Top 200+ Writers selected for the Poetry Festival Season 2. Celebrate outstanding contemporary poetry. Non-ranked list.",
    images: ["https://www.inkfetish.in/images/top-writers-preview.jpg"],
  }
};

export default function TopWritersPage() {
  return <TopWritersClient />;
}
