'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { PublishingHero } from '@/components/publishing/PublishingHero';
import { PublishingEmotionalHook } from '@/components/publishing/PublishingEmotionalHook';
import { PublishingDifferentiation } from '@/components/publishing/PublishingDifferentiation';
import { PublishingJourney } from '@/components/publishing/PublishingJourney';
import { PublishingFeaturesContrast } from '@/components/publishing/PublishingFeaturesContrast';
import { PublishingIdentityMoment } from '@/components/publishing/PublishingIdentityMoment';
import { PublishingPricing } from '@/components/publishing/PublishingPricing';
import { PublishingTrust } from '@/components/publishing/PublishingTrust';
import { PublishingProcess } from '@/components/publishing/PublishingProcess';
import { PublishingFAQ } from '@/components/publishing/PublishingFAQ';
import { PublishingCTASection } from '@/components/publishing/PublishingCTASection';

const ServicesClient = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-ink-900 font-serif selection:bg-ink-900 selection:text-[#FDFBF7] overflow-x-hidden">
      <Navbar />

      {/* 1. HERO SECTION */}
      <PublishingHero />

      {/* CTA BLOCK 1 — After Hero Intro */}
      <PublishingCTASection 
        variant="light"
        headline="&quot;Your Manuscript Has Been Waiting Long Enough.&quot;"
        subtext="One call. No pressure. Just a real conversation about your book and what it deserves."
        buttonText="Book My Free Publishing Call"
        microcopy="We'll tell you exactly what your book needs — before you spend a single rupee."
      />

      {/* 2. EMOTIONAL HOOK */}
      <PublishingEmotionalHook />

      {/* 3. BRAND POSITIONING (Printers vs Founders) */}
      <PublishingDifferentiation />

      {/* CTA BLOCK 2 — After Differentiation */}
      <PublishingCTASection 
        variant="dark"
        headline="&quot;The Difference Between a Forgettable Book and an Unforgettable One Is the Publisher You Choose.&quot;"
        subtext="Choose carefully. Choose once. Choose right."
        buttonText="Let's Talk About Your Book"
        microcopy="Our publishing team is ready. Are you?"
      />

      {/* 4. PUBLISHING JOURNEY */}
      <PublishingJourney />

      {/* 5. FEATURES CONTRAST (Others vs Us) */}
      <PublishingFeaturesContrast />

      {/* 6. AUTHOR IDENTITY (The Moment you hold the book) */}
      <PublishingIdentityMoment />

      {/* CTA BLOCK 3 — After Identity Moment */}
      <PublishingCTASection 
        variant="light"
        headline="&quot;You Deserve to Hold That Book With Pure, Absolute Pride.&quot;"
        subtext="No question marks. No 'is this good enough.' Just pride."
        buttonText="I'm Ready. Book My Call."
      />

      {/* 7. PRICING & FLEXIBILITY */}
      <PublishingPricing />

      {/* CTA BLOCK 4 — After Pricing */}
      <PublishingCTASection 
        variant="gold"
        headline="&quot;Thirty Minutes Is All It Takes to Know Exactly What Your Book Needs.&quot;"
        subtext="We'll walk you through everything. No runaround. No pressure. No templates."
        buttonText="Book My Call — Starts at ₹500"
        microcopy="Reserve your project slot. Lock in your author journey. Get your book built right."
      />

      {/* 8. TRUST SECTION (Track Record) */}
      <PublishingTrust />

      {/* 9. PROCESS SECTION (4 Steps) */}
      <PublishingProcess />

      {/* 10. FAQ SECTION */}
      <PublishingFAQ />

      {/* 11. FINAL CLOSER (Bottom of page) */}
      <section className="py-20 md:py-32 bg-ink-900 text-white relative overflow-hidden text-center">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
          <div className="text-[120px] md:text-[250px] font-serif font-black italic transform rotate-6 translate-x-10 md:translate-x-20">LEGACY</div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
           <div className="w-12 h-px bg-gold mb-12" />
           <h4 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black uppercase tracking-tighter leading-[1] mb-10 italic">
              &quot;There Are Two Types of <br className="hidden md:block" />
              <span className="text-gold mt-2 block">Authors in India Right Now.&quot;</span>
           </h4>
           
           <div className="w-full max-w-3xl mx-auto space-y-6 relative z-10 mb-12">
              <div className="bg-white/5 border border-white/10 p-6 md:p-8">
                 <p className="text-base md:text-lg text-white/80 font-sans font-light leading-relaxed italic">
                   The ones whose books look like they were published by someone who cared. And the ones whose books look like they were processed by someone who didn&apos;t.
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="border border-white/5 p-6 flex flex-col justify-center">
                    <p className="text-sm text-white/60 font-sans font-medium uppercase tracking-widest leading-relaxed">
                      One of those authors gets shared on Instagram. Gets sold in bookstores. Gets asked, &quot;Where can I buy your book?&quot;
                    </p>
                 </div>
                 <div className="bg-gold/10 border border-gold/20 p-6 flex items-center justify-center">
                    <p className="text-gold font-black uppercase tracking-widest text-sm md:text-base text-center">
                      You know exactly which author you want to be.
                    </p>
                 </div>
              </div>
           </div>

           <PublishingCTASection 
             variant="gold"
             headline="Build My Book Right."
             buttonText="Book a Call"
             microcopy="Inkfetish Publications · Premium Publishing · Your Identity. Protected."
           />
        </div>
      </section>

    </div>
  );
};

export default ServicesClient;
