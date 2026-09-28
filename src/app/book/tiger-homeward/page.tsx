import { Metadata } from 'next';
import TigerHomewardClient from './TigerHomewardClient';

export const metadata: Metadata = {
  title: "Tiger Homeward On His Own Terms | Sharmila Maitra",
  description: "A novel told from the perspective of a furry friend. It traces his journey of learning, survival, and self-discovery on the streets.",
  openGraph: {
    title: "Tiger Homeward On His Own Terms | Sharmila Maitra",
    description: "A novel told from the perspective of a furry friend. It traces his journey of learning, survival, and self-discovery on the streets.",
    url: "https://www.inkfetish.in/book/tiger-homeward",
    images: ["/authors/sharmila.jpg"], // Fallback image since there's no cover yet
  },
  twitter: {
    card: "summary_large_image",
    title: "Tiger Homeward On His Own Terms | Sharmila Maitra",
    description: "A novel told from the perspective of a furry friend. It traces his journey of learning, survival, and self-discovery on the streets.",
    images: ["/authors/sharmila.jpg"],
  },
};

export default function TigerHomewardPage() {
  return <TigerHomewardClient />;
}
