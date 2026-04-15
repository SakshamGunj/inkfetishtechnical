import { Metadata } from 'next';
import AwardsClient from './AwardsClient';

export const metadata: Metadata = {
  title: "Literary Awards & Recognition | Inkfetish Publication",
  description: "Ink Fetish Publication honors the absolute masters of the craft. Explore the Shakespeare Poetry Award and our prestigious gallery of laureates.",
  openGraph: {
    title: "Literary Awards & Recognition | Inkfetish Publication",
    description: "Honoring the masters of modern literature. Explore our global awards.",
    url: "https://www.inkfetish.in/awards",
  },
};

export default function AwardsPage() {
  return <AwardsClient />;
}
