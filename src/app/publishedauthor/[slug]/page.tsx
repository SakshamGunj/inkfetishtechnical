import { Metadata } from 'next';
import AuthorBridge from './AuthorBridge';

// Map slugs to display names for metadata
const nameMap: Record<string, string> = {
  shreyo: "Shreyo Biswas",
  daniya: "Daniya Khan",
  tadashi: "Vijay Pratap 'Tadashi'",
  shambhavi: "Lillian Blythe",
  richa: "Richa K.",
  'shikast-e-aziz': "Shikast-e-Aziz",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const name = nameMap[slug] || (slug.charAt(0).toUpperCase() + slug.slice(1));
  
  return {
    title: `${name} | Published Author | Inkfetish`,
    description: `Discover the literary journey and works of ${name}, published under Inkfetish Publications.`,
  };
}

export default async function PublishedAuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  return <AuthorBridge slug={slug} />;
}
