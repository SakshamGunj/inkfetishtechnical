'use client';

import React, { useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { HeroSection } from './HeroSection';
import { ProblemAgitationSection } from './ProblemAgitationSection';
import { SolutionSection } from './SolutionSection';
import { SocialProofSection } from './SocialProofSection';
import { ContentPreviewSection } from './ContentPreviewSection';
import { AuthorShowcaseSection } from './AuthorShowcaseSection';
import { ValueStackSection } from './ValueStackSection';
import { ScarcitySection } from './ScarcitySection';
import { GuaranteeSection } from './GuaranteeSection';
import { FAQSection } from './FAQSection';
import { FinalCTASection } from './FinalCTASection';
import { heartsUnderConstructionData } from '@/lib/landing-data/hearts-under-construction';

/**
 * HeartsUnderConstructionLanding Component
 * 
 * Main landing page component that assembles all sections.
 * Features:
 * - Conversion-focused layout following Hormozi/Brunson principles
 * - Scroll depth tracking for analytics
 * - Reduced motion support
 * - All sections in optimal conversion order
 */
export default function HeartsUnderConstructionLanding() {
  const prefersReducedMotion = useReducedMotion();

  // Scroll depth tracking
  useEffect(() => {
    const milestones = [25, 50, 75, 100];
    const tracked = new Set<number>();

    const handleScroll = () => {
      const scrollPercentage = 
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      milestones.forEach(milestone => {
        if (scrollPercentage >= milestone && !tracked.has(milestone)) {
          tracked.add(milestone);
          
          // Track with Google Analytics if available
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'scroll_depth', {
              percentage: milestone,
              page_path: window.location.pathname
            });
          }

          // Track with Vercel Analytics if available
          if (typeof window !== 'undefined' && (window as any).va) {
            (window as any).va('track', 'Scroll Depth', {
              percentage: milestone
            });
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-ink-900 font-serif">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section - Above the fold */}
      <HeroSection data={heartsUnderConstructionData.hero} />

      {/* Problem/Agitation - Emotional hook */}
      <ProblemAgitationSection data={heartsUnderConstructionData.problemAgitation} />

      {/* Solution - How the anthology helps */}
      <SolutionSection data={heartsUnderConstructionData.solution} />

      {/* Social Proof - Build trust */}
      <SocialProofSection data={heartsUnderConstructionData.socialProof} />

      {/* Content Preview - Show quality */}
      <ContentPreviewSection data={heartsUnderConstructionData.contentPreview} />

      {/* Author Showcase - Meet the voices */}
      <AuthorShowcaseSection data={heartsUnderConstructionData.authors} />

      {/* Value Stack - Show the deal */}
      <ValueStackSection data={heartsUnderConstructionData.valueStack} />

      {/* Scarcity - Create urgency (conditional) */}
      <ScarcitySection data={heartsUnderConstructionData.scarcity} />

      {/* Guarantee - Remove risk */}
      <GuaranteeSection data={heartsUnderConstructionData.guarantee} />

      {/* FAQ - Address objections */}
      <FAQSection data={heartsUnderConstructionData.faq} />

      {/* Final CTA - Last conversion opportunity */}
      <FinalCTASection data={heartsUnderConstructionData.finalCTA} />
    </div>
  );
}
