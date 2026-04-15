import { Metadata } from 'next';
import AnweshaClient from './AnweshaClient';

export const metadata: Metadata = {
  title: "ANWESHA | Writer & Artist",
  description: "Portfolio of Anwesha - A 14-year-old creative powerhouse. Writer of 'Silfira', Artist, and Dreamer.",
  openGraph: {
    title: "ANWESHA | Writer & Artist",
    description: "Meet Anwesha - A 14-year-old creative powerhouse. Writer of 'Silfira', Artist, and Dreamer.",
    url: "https://www.inkfetish.in/publishedauthor/anwesha",
    images: ["/images/anwesha-profile.jpg"],
  },
};

export default function AnweshaPage() {
  return <AnweshaClient />;
}
