'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, Lock, Package, Zap } from 'lucide-react';
import { CTAButton } from './shared/CTAButton';
import { AnthologyLandingPageData } from '@/lib/types/landing-page';

interface FinalCTASectionProps {
  data: AnthologyLandingPageData['finalCTA'];
}

/**
 * FinalCTASection Component
 * 
 * Final conversion opportunity with:
 * - Restated core benefit and offer
 * - Prominent final CTA button
 * - Trust signals (secure checkout, guarantee icons)
 * - Contrasting background for visual separation
 */
export function FinalCTASection({ data }: FinalCTASectionProps) {
  const { heading, subheading, cta, trustSignals } = data;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Icon mapping for trust signals
  const getIcon = (signal: string) => {
    if (signal.includes('Secure') || signal.includes('🔒')) {
      return <Lock className="w-5 h-5" strokeWidth={2} />;
    }
    if (signal.includes('Guarantee') || signal.includes('💯')) {
      return <Heart className="w-5 h-5" strokeWidth={2} />;
    }
    if (signal.includes('Ships') || signal.includes('📦')) {
      return <Package className="w-5 h-5" strokeWidth={2} />;
    }
    if (signal.includes('Instant') || signal.includes('⚡')) {
      return <Zap className="w-5 h-5" strokeWidth={2} />;
    }
    return <Heart className="w-5 h-5" strokeWidth={2} />;
  };

  return (
    <section 
      ref={ref}
      className="py-20 md:py-28 bg-ink-900 text-[#FDFBF7] relative overflow-hidden"
    >
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="final-cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#final-cta-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heart Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex justify-center mb-8"
        >
          <div className="w-20 h-20 rounded-full bg-[#c5a059]/20 flex items-center justify-center">
            <Heart className="w-10 h-10 text-[#c5a059] fill-[#c5a059]" strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight"
        >
          {heading}
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl lg:text-2xl font-sans font-light text-[#FDFBF7]/80 leading-relaxed mb-12 max-w-3xl mx-auto"
        >
          {subheading}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <CTAButton
            text={cta.text}
            action={cta.action}
            link={cta.link}
            variant="primary"
            size="large"
            className="bg-[#c5a059] text-ink-900 border-[#c5a059] hover:bg-[#d4b06f] hover:border-[#d4b06f]"
          />
        </motion.div>

        {/* Trust Signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 text-sm font-sans text-[#FDFBF7]/70"
        >
          {trustSignals.map((signal, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059]">
                {getIcon(signal)}
              </div>
              <span>{signal.replace(/[🔒💯📦⚡]/g, '').trim()}</span>
            </div>
          ))}
        </motion.div>

        {/* Final reassurance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 pt-8 border-t border-[#FDFBF7]/10"
        >
          <p className="text-base font-sans text-[#FDFBF7]/60">
            Join 500+ readers who found healing in these pages
          </p>
        </motion.div>
      </div>
    </section>
  );
}
