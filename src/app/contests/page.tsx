import { Metadata } from 'next';
import ContestsClient from './ContestsClient';

export const metadata: Metadata = {
  title: "Writing Contests & Summits | Inkfetish Publication",
  description: "Explore the industry's most ambitious writing events, summits, and festivals. From Indian Creative Star to the AuthorVerse Summit.",
  openGraph: {
    title: "Writing Contests & Summits | Inkfetish Publication",
    description: "Active opportunities for ambitious writers. Join our next global literary event.",
    url: "https://www.inkfetish.in/contests",
  },
};

export default function ContestsPage() {
  return <ContestsClient />;
}
