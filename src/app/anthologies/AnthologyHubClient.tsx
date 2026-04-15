'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Layers, MoveRight, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { LiveAnthology, ArchivedAnthology, Benefit, Stats } from '@/types/anthology';
import { useScrollTracking } from '@/lib/analytics/scroll-tracker';
import { sortAnthologiesByDeadline } from '@/lib/anthology-utils';

// New Components
import { AnthologyPreHeader } from '@/components/anthologies/AnthologyPreHeader';
import { AnthologyHero } from '@/components/anthologies/AnthologyHero';
import { TrustBuilder } from '@/components/anthologies/TrustBuilder';
import { ShowcaseSection } from '@/components/anthologies/ShowcaseSection';
import { BenefitsSection } from '@/components/anthologies/BenefitsSection';
import { ActiveSubmissionSection } from '@/components/anthologies/ActiveSubmissionSection';
import { ProcessSection } from '@/components/anthologies/ProcessSection';
import { EmotionalNarrative } from '@/components/anthologies/EmotionalNarrative';
import { TestimonialsSection } from '@/components/anthologies/TestimonialsSection';
import { InterstitialCta, FinalCta, FloatingBanner } from '@/components/anthologies/CtaBlocks';
import { FaqSection } from '@/components/anthologies/FaqSection';

// Live Anthologies Data
const liveAnthologies: LiveAnthology[] = [
  {
    id: 'hearts-under-construction',
    title: 'Hearts under Construction',
    genre: 'Fiction Anthology',
    status: 'open',
    deadline: '2026-05-30',
    reward: 'Become a Published Co-Author',
    description: 'A powerful collection of stories about rebuilding and healing. We are currently accepting entries for this monumental project.',
    submissionCount: 156,
    spotsRemaining: 12,
    accentColor: '#39FF14',
    ctaLink: '/anthology/hearts-under-construction'
  }
];

// Archived Anthologies Data
const archivedAnthologies: ArchivedAnthology[] = [
  {
    id: 'love-at-minus-one',
    title: 'Love at Minus One',
    genre: 'Romance Anthology',
    year: '2023',
    impact: 'Bestseller',
    authorCount: 120
  },
  {
    id: 'shakespeare-what-remained',
    title: 'Shakespeare & What Remained',
    genre: 'Poetry Anthology',
    year: '2024',
    impact: 'Top Rated',
    authorCount: 85
  },
  {
    id: 'petals-and-scars',
    title: 'Petals and Scars',
    genre: 'Poetry Collection',
    year: '2024',
    impact: 'Community Fav',
    authorCount: 92
  }
];

// Benefits Data
const benefits: Benefit[] = [
  {
    title: 'We Write Together',
    description: 'Don\'t stare at a blank screen. Our expert team co-authors with you, making sure every word hits like a heavy-duty hammer.',
    icon: 'book'
  },
  {
    title: 'High-End Quality',
    description: 'You aren\'t just getting an Ebook. You\'re getting a real, physical book with premium printing and a cover that turns heads.',
    icon: 'edit'
  },
  {
    title: 'Obsessive Research',
    description: 'We don\'t just pick "nice" topics. We research what readers are actually buying so your book finds its audience fast.',
    icon: 'award'
  },
  {
    title: 'The Author Kit',
    description: 'Everything you need to "look the part" is included. From medals and certificates to social media flyers and beyond.',
    icon: 'sparkles'
  }
];

// Stats Data
const stats: Stats = {
  publishedAuthors: 840,
  anthologiesLaunched: 4,
  communitySize: '15K+'
};

const AnthologyHubClient = () => {
  // Enable scroll tracking
  useScrollTracking('/anthologies');

  // We use the first live anthology as the "Current Open" one
  const currentAnthology = liveAnthologies[0];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-ink-900 font-serif selection:bg-ink-900 selection:text-[#FDFBF7] overflow-x-hidden relative">
      <AnthologyPreHeader />
      <Navbar />

      {/* SECTION 1: HERO SECTION */}
      <AnthologyHero />

      {/* Cinematic Trust Gallery (Already optimized previously, keeping between Hero and Trust Builder) */}
      <section className="py-12 bg-white overflow-hidden border-y border-ink-900/10 mb-24">
        <div className="flex flex-col gap-8">
           {/* Row 1: Left to Right */}
           <div className="flex whitespace-nowrap gap-6 animate-scroll-left">
              {[
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897600/WhatsApp_Image_2026-04-09_at_2.59.25_PM-compressed_in2led.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897599/WhatsApp_Image_2026-04-09_at_2.53.04_PM-compressed_wsnhmu.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897599/WhatsApp_Image_2026-04-07_at_8.39.44_PM-compressed_ztxsge.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897598/WhatsApp_Image_2026-04-07_at_8.39.44_PM_2_-compressed_hfr0wv.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897598/WhatsApp_Image_2026-04-07_at_8.39.44_PM_1_-compressed_gjnlck.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897597/WhatsApp_Image_2026-04-04_at_12.20.06_PM_1_-compressed_lrqjv2.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897597/WhatsApp_Image_2026-04-03_at_10.52.05_AM_2_-compressed_m2qlui.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897597/WhatsApp_Image_2026-04-03_at_10.52.05_AM_1_-compressed_uphqxg.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897596/WhatsApp_Image_2026-04-03_at_10.52.04_AM_1_-compressed_pp9tww.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897596/WhatsApp_Image_2026-04-02_at_5.42.20_PM-compressed_sq3utn.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897595/WhatsApp_Image_2026-04-02_at_5.42.20_PM_1_-compressed_khfil0.webp'
              ].map((img, i) => (
                <div key={i} className="h-64 md:h-80 shrink-0 border border-ink-900/10 shadow-sm overflow-hidden">
                    <img src={img} alt="Past Work" className="h-full w-auto object-contain" />
                </div>
              ))}
              {/* Duplicate for infinite loop */}
              {[
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897600/WhatsApp_Image_2026-04-09_at_2.59.25_PM-compressed_in2led.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897599/WhatsApp_Image_2026-04-09_at_2.53.04_PM-compressed_wsnhmu.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897599/WhatsApp_Image_2026-04-07_at_8.39.44_PM-compressed_ztxsge.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897598/WhatsApp_Image_2026-04-07_at_8.39.44_PM_2_-compressed_hfr0wv.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897598/WhatsApp_Image_2026-04-07_at_8.39.44_PM_1_-compressed_gjnlck.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897597/WhatsApp_Image_2026-04-04_at_12.20.06_PM_1_-compressed_lrqjv2.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897597/WhatsApp_Image_2026-04-03_at_10.52.05_AM_2_-compressed_m2qlui.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897597/WhatsApp_Image_2026-04-03_at_10.52.05_AM_1_-compressed_uphqxg.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897596/WhatsApp_Image_2026-04-03_at_10.52.04_AM_1_-compressed_pp9tww.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897596/WhatsApp_Image_2026-04-02_at_5.42.20_PM-compressed_sq3utn.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897595/WhatsApp_Image_2026-04-02_at_5.42.20_PM_1_-compressed_khfil0.webp'
              ].map((img, i) => (
                <div key={`dup-${i}`} className="h-64 md:h-80 shrink-0 border border-ink-900/10 shadow-sm overflow-hidden">
                    <img src={img} alt="Past Work" className="h-full w-auto object-contain" />
                </div>
              ))}
           </div>

           {/* Row 2: Right to Left */}
           <div className="flex whitespace-nowrap gap-6 animate-scroll-right">
              {[
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897595/WhatsApp_Image_2026-04-02_at_5.17.33_PM_3_-compressed_kosajj.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897594/WhatsApp_Image_2026-04-02_at_5.17.33_PM_2_-compressed_sz4wld.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897594/WhatsApp_Image_2026-04-01_at_6.40.55_AM_1_-compressed_j51ngs.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897593/WhatsApp_Image_2026-04-01_at_6.40.37_AM-compressed_eibjs4.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897593/WhatsApp_Image_2026-03-31_at_11.00.31_PM-compressed_a58ono.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897592/WhatsApp_Image_2026-03-28_at_11.47.30_PM_1_-compressed_abkbxy.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897592/WhatsApp_Image_2026-03-23_at_7.03.31_PM_5_-compressed_hgy6j1.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897591/WhatsApp_Image_2026-03-23_at_7.03.31_PM_4_-compressed_dnisid.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897591/WhatsApp_Image_2026-03-23_at_7.03.31_PM_3_-compressed_ofwyil.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897590/WhatsApp_Image_2026-03-23_at_7.03.30_PM-compressed_fsgkug.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775926450/WhatsApp_Image_2026-04-11_at_7.20.21_PM_1_-compressed_hgkckw.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775926445/WhatsApp_Image_2026-04-11_at_7.20.21_PM-compressed_fxtkcv.webp'
              ].map((img, i) => (
                <div key={i} className="h-64 md:h-80 shrink-0 border border-ink-900/10 shadow-sm overflow-hidden">
                    <img src={img} alt="Community" className="h-full w-auto object-contain" />
                </div>
              ))}
              {/* Duplicate for infinite loop */}
              {[
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897595/WhatsApp_Image_2026-04-02_at_5.17.33_PM_3_-compressed_kosajj.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897594/WhatsApp_Image_2026-04-02_at_5.17.33_PM_2_-compressed_sz4wld.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897594/WhatsApp_Image_2026-04-01_at_6.40.55_AM_1_-compressed_j51ngs.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897593/WhatsApp_Image_2026-04-01_at_6.40.37_AM-compressed_eibjs4.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897593/WhatsApp_Image_2026-03-31_at_11.00.31_PM-compressed_a58ono.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897592/WhatsApp_Image_2026-03-28_at_11.47.30_PM_1_-compressed_abkbxy.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897592/WhatsApp_Image_2026-03-23_at_7.03.31_PM_5_-compressed_hgy6j1.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897591/WhatsApp_Image_2026-03-23_at_7.03.31_PM_4_-compressed_dnisid.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897591/WhatsApp_Image_2026-03-23_at_7.03.31_PM_3_-compressed_ofwyil.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897590/WhatsApp_Image_2026-03-23_at_7.03.30_PM-compressed_fsgkug.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775926450/WhatsApp_Image_2026-04-11_at_7.20.21_PM_1_-compressed_hgkckw.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775926445/WhatsApp_Image_2026-04-11_at_7.20.21_PM-compressed_fxtkcv.webp'
              ].map((img, i) => (
                <div key={`dup-${i}`} className="h-64 md:h-80 shrink-0 border border-ink-900/10 shadow-sm overflow-hidden">
                    <img src={img} alt="Community" className="h-full w-auto object-contain" />
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* SECTION 2: TRUST BUILDER SECTION */}
      <TrustBuilder />

      {/* SECTION 3: PAST ANTHOLOGY SHOWCASE */}
      <ShowcaseSection />

      {/* SECTION 4: BENEFITS SECTION */}
      <BenefitsSection />

      {/* SECTION 5: CURRENT LIVE ANTHOLOGY */}
      <ActiveSubmissionSection anthology={currentAnthology} />

      {/* SECTION 6: HOW IT WORKS */}
      <ProcessSection />

      {/* SECTION 7: EMOTIONAL PULL SECTION */}
      <EmotionalNarrative />

      {/* SECTION 8: TESTIMONIALS / SOCIAL PROOF */}
      <TestimonialsSection />

      {/* SECTION 9: STRONG CTA SECTION (Interstitial) */}
      <InterstitialCta 
        headline="Your Story Has Been Waiting. Now It Has A Home." 
        subtext="Join 390+ writers who didn't let fear win. Join the next Inkfetish anthology and see your name in print."
      />

      {/* SECTION 10: FAQ SECTION */}
      <FaqSection />

      {/* FINAL CTA SECTION */}
      <FinalCta />

      {/* FLOATING BANNER */}
      <FloatingBanner />

    </div>
  );
};

export default AnthologyHubClient;
