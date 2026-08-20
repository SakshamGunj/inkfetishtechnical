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
const RochiSulbhewarAuthor = dynamic(() => import('@/legacy-pages/RochiSulbhewarAuthor'), { ssr: false });
const MahikaMukundAuthor = dynamic(() => import('@/legacy-pages/MahikaMukundAuthor'), { ssr: false });
const EthereaAuthor = dynamic(() => import('@/legacy-pages/EthereaAuthor'), { ssr: false });
const ShettyDishaAuthor = dynamic(() => import('@/legacy-pages/ShettyDishaAuthor'), { ssr: false });
const AzraAzadAuthor = dynamic(() => import('@/legacy-pages/AzraAzadAuthor'), { ssr: false });
const AritraBanerjeeAuthor = dynamic(() => import('@/legacy-pages/AritraBanerjeeAuthor'), { ssr: false });
const SunithaSukumaranAuthor = dynamic(() => import('@/legacy-pages/SunithaSukumaranAuthor'), { ssr: false });
const ThalirAuthor = dynamic(() => import('@/legacy-pages/ThalirAuthor'), { ssr: false });
const NimanAuthor = dynamic(() => import('@/legacy-pages/NimanAuthor'), { ssr: false });
const RajeshTiwariAuthor = dynamic(() => import('@/legacy-pages/RajeshTiwariAuthor'), { ssr: false });
const ChetnaChoudharyAuthor = dynamic(() => import('@/legacy-pages/ChetnaChoudharyAuthor'), { ssr: false });
const HaarleenSethiAuthor = dynamic(() => import('@/legacy-pages/HaarleenSethiAuthor'), { ssr: false });

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
  rochi: RochiSulbhewarAuthor,
  mahika: MahikaMukundAuthor,
  etherea: EthereaAuthor,
  disha: ShettyDishaAuthor,
  azra: AzraAzadAuthor,
  aritra: AritraBanerjeeAuthor,
  sunitha: SunithaSukumaranAuthor,
  thalir: ThalirAuthor,
  niman: NimanAuthor,
  rajesh: RajeshTiwariAuthor,
  chetna: ChetnaChoudharyAuthor,
  haarleen: HaarleenSethiAuthor,
};

export default function AuthorBridge({ slug }: { slug: string }) {
  const AuthorComponent = authorComponents[slug];

  if (!AuthorComponent) {
    notFound();
  }

  return <AuthorComponent />;
}
