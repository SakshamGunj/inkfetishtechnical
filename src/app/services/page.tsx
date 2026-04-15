import { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: "Premium Book Publishing in India | Inkfetish Publications | Your Identity. Protected.",
  description: "Inkfetish Publications offers premium book publishing — custom cover design, professional editing, author websites, ISBN, and up to 100% royalties. Built for serious Indian writers who refuse to settle for cheap.",
  openGraph: {
    title: "Your Book Deserves Better Than a ₹200 AI Cover — Inkfetish Publications",
    description: "Premium publishing for Indian writers. Real editors. Original covers. Your ISBN. Your royalties. Book a free call and build the book you actually deserve.",
    url: "https://www.inkfetish.in/services",
    images: [
      {
        url: "/og-publishing.jpg", // Placeholder for actual asset if available
        width: 1200,
        height: 630,
        alt: "Inkfetish Premium Publishing",
      },
    ],
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
