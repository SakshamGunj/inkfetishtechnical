import { Metadata } from 'next';
import PoemBridge from './PoemBridge';

export const metadata: Metadata = {
  title: "Love at Minus One Anthology | Inkfetish",
  description: "Read unique poetry from the Love at Minus One anthology by Inkfetish Publications.",
};

export default async function PoemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PoemBridge id={id} />;
}
