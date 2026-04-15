'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { useScrollTracking } from '@/lib/analytics/scroll-tracker';

// Modular Components
import { ContestsHero } from '@/components/contests/ContestsHero';
import { ContestSlider } from '@/components/contests/ContestSlider';
import { ContestsAuthority } from '@/components/contests/ContestsAuthority';
import { ContestsJourney } from '@/components/contests/ContestsJourney';
import { ContestsHallOfFame } from '@/components/contests/ContestsHallOfFame';
import { ContestsValueProps } from '@/components/contests/ContestsValueProps';
import { LiveContestBanner } from '@/components/contests/LiveContestBanner';
import { ContestProcess } from '@/components/contests/ContestProcess';
import { ContestsNarrative } from '@/components/contests/ContestsNarrative';
import { ContestsSocialProof } from '@/components/contests/ContestsSocialProof';
import { ContestsGallery } from '@/components/contests/ContestsGallery';
import { ContestsFaq } from '@/components/contests/ContestsFaq';
import { InterstitialCta } from '@/components/anthologies/CtaBlocks'; // Reuse the premium CTA block

const ContestsClient = () => {
  // Enable scroll tracking for analytics
  useScrollTracking('/contests');

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-ink-900 font-serif selection:bg-ink-900 selection:text-[#FDFBF7] overflow-x-hidden relative">
      <Navbar />

      {/* SECTION 1: HERO */}
      <ContestsHero />

      {/* NEW: CINEMATIC SLIDER (Proof Ticker) */}
      <ContestSlider />

      {/* SECTION 2: AUTHORITY (Why writers trust us) */}
      <ContestsAuthority />

      {/* SECTION 3: BACKSTORY (The Journey) */}
      <ContestsJourney />

      {/* SECTION 4: PAST CONTEST SHOWCASE (Hall of Fame) */}
      <ContestsHallOfFame />

      {/* SECTION 11: Mid-Page CTA (from provided copy) */}
      <InterstitialCta 
        headline="₹5,75,000+ Given Away to Writers Like You."
        subtext="The next payout could have your name on it. Don't let your stories stay in drafts. Take the stage."
        ctaText="JOIN THE LIVE CONTEST NOW"
      />

      {/* SECTION 5 & 6: VALUE PROPS (10 Reasons + What You Get) */}
      <ContestsValueProps />

      {/* SECTION 11: After Value Props CTA */}
      <InterstitialCta 
        headline="The Next Great Indian Writer Is Reading This."
        subtext="Could be you. Join the contest that's already changed 1,155+ writers' stories. Every deadline is a door that closes."
        ctaText="CLAIM MY CONTEST SPOT"
      />

      {/* SECTION 7: CURRENT / LIVE CONTEST */}
      <LiveContestBanner />

      {/* SECTION 8: HOW IT WORKS (Process) */}
      <ContestProcess />

      {/* SECTION 9: EMOTIONAL NARRATIVE */}
      <ContestsNarrative />

      {/* SECTION 11: After Emotional Section CTA */}
      <InterstitialCta 
        headline="Your Writing Deserves a Stage. We've Built One."
        subtext="Register today. Write tomorrow. Win when it matters. Most writers stay in their comfort zone — we invite you to step out."
        ctaText="I'M READY TO COMPETE"
      />

      {/* SECTION 10: SOCIAL PROOF (Testimonials) */}
      <ContestsSocialProof />

      {/* NEW: VISUAL GALLERY (Wall of Champions) */}
      <ContestsGallery />

      {/* SECTION 12: FAQ */}
      <ContestsFaq />

      {/* SECTION 11: FINAL CLOSER */}
      <section className="py-24 md:py-48 bg-white text-center border-t border-ink-900/10">
        <div className="max-w-5xl mx-auto px-4">
           <h4 className="text-xs font-sans font-black uppercase tracking-[0.4em] text-gold mb-8">THE FINAL WORD</h4>
           <h2 className="text-3xl md:text-6xl lg:text-7xl font-black font-serif text-ink-900 leading-[0.9] tracking-tighter uppercase mb-12">
              ₹1,50,000 in the Last Contest. <br/>
              <span className="italic font-light text-ink-500">What&apos;s in the next one? Find out by being in it.</span>
           </h2>
           <p className="text-base md:text-xl text-ink-600 font-sans font-light max-w-2xl mx-auto mb-16 px-4">
              Thousands of writers have already taken the stage. They competed, they grew, they won. The ones who didn&apos;t? They&apos;re still thinking about it. Which one will you be?
           </p>

           <a href="#live" className="group relative inline-block">
             <div className="absolute inset-0 border border-gold translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300" />
             <button className="relative bg-ink-900 text-white font-sans uppercase tracking-[0.2em] py-10 px-20 text-sm font-black hover:bg-gold hover:text-ink-900 transition-all border border-ink-900 shadow-2xl flex items-center gap-6">
                YES — I WANT TO COMPETE
             </button>
           </a>

           <p className="mt-12 text-[10px] font-sans font-black uppercase tracking-[0.3em] text-ink-400">
              Registration deadline: May 30th. Once spots fill, we close.
           </p>
        </div>
      </section>

    </div>
  );
};

export default ContestsClient;
