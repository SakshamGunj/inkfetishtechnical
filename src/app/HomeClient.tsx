'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { HomeHero } from '@/components/home/HomeHero';
import { HomePositioning } from '@/components/home/HomePositioning';
import { HomeServices } from '@/components/home/HomeServices';
import { HomeStats } from '@/components/home/HomeStats';
import { HomeAnthologyHighlight } from '@/components/home/HomeAnthologyHighlight';
import { HomeContestHighlight } from '@/components/home/HomeContestHighlight';
import { HomeWhyChoose } from '@/components/home/HomeWhyChoose';
import { HomeEmotional } from '@/components/home/HomeEmotional';
import { HomeEcosystem } from '@/components/home/HomeEcosystem';
import { HomeAbout } from '@/components/home/HomeAbout';
import { HomeCtaSection, HomeFooterCta } from '@/components/home/HomeCtaSection';

export default function HomeClient() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-ink-900 font-serif selection:bg-ink-900 selection:text-[#FDFBF7]">
      <Navbar />
      
      {/* 1. Hero Section */}
      <HomeHero />

      {/* 2. Brand Positioning */}
      <HomePositioning />

      {/* 3. Services */}
      <HomeServices />

      {/* CTA BLOCK 1 — After Services */}
      <HomeCtaSection 
        title="Your Manuscript Has Been Sitting Long Enough."
        desc="Professional publishing. Premium quality. Up to 100% royalties. Let's build your book."
        ctaText="Publish With Inkfetish"
        link="/services"
      />

      {/* 4. Social Proof / Stats */}
      <HomeStats />

      {/* 5. Anthology Highlight */}
      <HomeAnthologyHighlight />

      {/* 6. Contest Highlight */}
      <HomeContestHighlight />

      {/* CTA BLOCK 2 — After Contests */}
      <HomeCtaSection 
        title="₹1,50,000 in the Last Contest. The Next One Is Open."
        desc="Don't sit this one out."
        ctaText="Register for Live Contest"
        link="/contests"
      />

      {/* 7. Why Choose Inkfetish */}
      <HomeWhyChoose />

      {/* 8. Emotional Section */}
      <HomeEmotional />

      {/* CTA BLOCK 3 — After Emotional Section */}
      <HomeCtaSection 
        title="One Decision. From Writer to Author."
        desc="Join the anthology. Publish your book. Enter the contest. Your path starts here."
        ctaText="See Where to Start"
        link="/services"
      />

      {/* 9. Product Ecosystem */}
      <HomeEcosystem />

      {/* 10. About Section */}
      <HomeAbout />

      {/* CTA BLOCK 4 — After Ecosystem */}
      <HomeCtaSection 
        title="The Next Chapter Belongs to You."
        desc="Publishing. Contests. Anthologies. Everything a serious writer needs — in one place."
        ctaText="Explore Inkfetish"
        link="/archive"
      />

      {/* 12. Footer CTA */}
      <HomeFooterCta />
    </div>
  );
}
