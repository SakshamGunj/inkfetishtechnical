import { Metadata } from 'next';
import LaunchpadClient from './LaunchpadClient';

export const metadata: Metadata = {
  title: "Author Launchpad 28 | 28-Day Publishing Program",
  description: "A 28-day intensive program to take your book from idea to publication. Join the Author Launchpad and script your legacy with Inkfetish.",
  openGraph: {
    title: "Author Launchpad 28 | Book Publication in 28 Days",
    description: "Submit your manuscript and launch like a bestseller in just 4 weeks.",
    url: "https://www.inkfetish.in/launchpad",
  },
};

export default function LaunchpadPage() {
  return <LaunchpadClient />;
}
