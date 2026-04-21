import { Metadata } from 'next';
import LegacyBridgeClient from './LegacyBridgeClient';

export const metadata: Metadata = {
  title: "Archive | Inkfetish Publication",
  description: "Access our collection of historical writing contests, anthologies, and author records.",
  robots: "noindex, follow", // Allow indexing but mark as archive
};

export default async function LegacyCatchAllPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const path = `/${slug.join('/')}`;
  return <LegacyBridgeClient path={path} />;
}
