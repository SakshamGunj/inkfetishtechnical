import { Metadata } from 'next';
import HighlightsClient from './HighlightsClient';

export const metadata: Metadata = {
  title: "Platform Highlights | The Wall of Fame",
  description: "Explore the most significant milestones of Inkfetish. From massive contest wins to multi-country book launches.",
  openGraph: {
    title: "Platform Highlights | Wall of Winners | Inkfetish",
    description: "Discover the elite writers and poets who are redefining the industry.",
    url: "https://www.inkfetish.in/highlights",
  },
};

export default function HighlightsPage() {
  return <HighlightsClient />;
}
