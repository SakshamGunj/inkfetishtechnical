import { Metadata } from 'next';
import SinglePoemClient from './SinglePoemClient';

export const metadata: Metadata = {
  title: "Poem | IWL Hall of Fame | Inkfetish",
  description: "Read this celebrated poem from the Indian Writers League Hall of Fame.",
};

export default async function SinglePoemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <SinglePoemClient id={id} />;
}
