import { Metadata } from 'next';
import AnthologyHubClient from './AnthologyHubClient';

export const metadata: Metadata = {
  title: "The Anthology Collective | Inkfetish Publication",
  description: "Join India's most prestigious writing collectives. Browse active submissions and explore our published anthology collections.",
  openGraph: {
    title: "Inkfetish Anthology Hub | The Collective",
    description: "Submit your manuscript to our ongoing projects or explore our historical imprints.",
    url: "https://www.inkfetish.in/anthologies",
  },
};

export default function AnthologyHubPage() {
  return <AnthologyHubClient />;
}
