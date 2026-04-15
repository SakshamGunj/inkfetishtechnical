import { Metadata } from 'next';
import SilfiraClientProfile from './SilfiraClientProfile';

export const metadata: Metadata = {
  title: "SILFIRA | A Silent Fire",
  description: "Silfira - A new book by Anwesha. Coming Soon. It explores the unsaid emotions, the quiet struggles, and the burning passion that resides within us all.",
  openGraph: {
    title: "SILFIRA | A Silent Fire",
    description: "Silfira - A new book by Anwesha. Coming Soon. It explores the unsaid emotions, the quiet struggles, and the burning passion that resides within us all.",
    url: "https://www.inkfetish.in/books/silfira",
    images: ["https://www.inkfetish.in/images/silfira-cover.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "SILFIRA | A Silent Fire",
    description: "Silfira - A new book by Anwesha. Coming Soon.",
    images: ["https://www.inkfetish.in/images/silfira-cover.jpg"],
  },
};

export default function SilfiraPage() {
  return <SilfiraClientProfile />;
}
