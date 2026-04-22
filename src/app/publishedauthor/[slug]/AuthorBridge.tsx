'use client';

import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

// Dynamically import the legacy components with SSR disabled to avoid hydration issues with legacy code
const ShreyoBiswasAuthor = dynamic(() => import('@/legacy-pages/ShreyoBiswasAuthor'), { ssr: false });
const DaniyaKhanAuthor = dynamic(() => import('@/legacy-pages/DaniyaKhanAuthor'), { ssr: false });
const VijayPratapAuthor = dynamic(() => import('@/legacy-pages/VijayPratapAuthor'), { ssr: false });
const LillianBlytheAuthor = dynamic(() => import('@/legacy-pages/LillianBlytheAuthor'), { ssr: false });
const AnweshaAuthor = dynamic(() => import('@/legacy-pages/AnweshaAuthor'), { ssr: false });
const RichaKAuthor = dynamic(() => import('@/legacy-pages/RichaKAuthor'), { ssr: false });
const BhavinTriwadiAuthor = dynamic(() => import('@/legacy-pages/BhavinTriwadiAuthor'), { ssr: false });
const PriyaBharathyAuthor = dynamic(() => import('@/legacy-pages/PriyaBharathyAuthor'), { ssr: false });
const ShikastEAzizAuthor = dynamic(() => import('@/legacy-pages/ShikastEAzizAuthor'), { ssr: false });
const MeghanaShethAuthor = dynamic(() => import('@/legacy-pages/MeghanaShethAuthor'), { ssr: false });

const authorComponents: Record<string, any> = {
  shreyo: ShreyoBiswasAuthor,
  bhavin: BhavinTriwadiAuthor,
  priya: PriyaBharathyAuthor,
  daniya: DaniyaKhanAuthor,
  tadashi: VijayPratapAuthor,
  shambhavi: LillianBlytheAuthor,
  anwesha_legacy: AnweshaAuthor,
  richa: RichaKAuthor,
  'shikast-e-aziz': ShikastEAzizAuthor,
  'veiled-verses': MeghanaShethAuthor,
};

export default function AuthorBridge({ slug }: { slug: string }) {
  const AuthorComponent = authorComponents[slug];

  if (!AuthorComponent) {
    notFound();
  }

  return <AuthorComponent />;
}
