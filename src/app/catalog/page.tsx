import { Metadata } from 'next';
import CatalogClient from './CatalogClient';

export const metadata: Metadata = {
  title: "Authorverse Catalog | Physical & Digital Imprints",
  description: "Browse the Inkfetish library. Every title in our catalog is rigorously edited and meticulously designed for professional writers and readers.",
  openGraph: {
    title: "The Inkfetish Official Catalog | Elite Publishing Imprints",
    description: "Explore our collection of physical and digital books from our community of authors.",
    url: "https://www.inkfetish.in/catalog",
  },
};

export default function CatalogPage() {
  return <CatalogClient />;
}
