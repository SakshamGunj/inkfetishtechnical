import { Metadata } from 'next';
import AnthologyLandingClient from './AnthologyLandingClient';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  return {
    title: `${title} | Join The Anthology Collective`,
    description: `Submit your manuscript to ${title}. Become a published co-author with Inkfetish Publication. Global distribution and editorial support included.`,
    openGraph: {
      title: `${title} - Official Launch | Inkfetish`,
      description: `Participate in our latest collective project: ${title}. Only the elite 1% make the cut.`,
      url: `https://www.inkfetish.in/anthology/${slug}`,
    },
  };
}

export default async function AnthologyLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <AnthologyLandingClient slug={slug} />;
}
