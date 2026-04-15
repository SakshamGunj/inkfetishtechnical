import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: "Inkfetish Publications | Premium Publishing · Contests · Anthologies",
  description: "Publish your book professionally, compete in national writing contests with ₹5,75,000+ in prizes, or join a celebrated anthology. India's most trusted writing ecosystem.",
  openGraph: {
    title: "Where Indian Writers Become Authors | Inkfetish Publications",
    description: "Premium book publishing. National writing contests. Celebrated anthologies. One brand. Built for writers who are done waiting.",
    url: "https://www.inkfetish.in",
    siteName: "Inkfetish",
  }
};

export default function Home() {
  return <HomeClient />;
}
