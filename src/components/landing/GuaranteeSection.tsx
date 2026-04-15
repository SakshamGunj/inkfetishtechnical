'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, CheckCircle, Lock, Heart } from 'lucide-react';
import { GlassmorphismCard } from './shared/GlassmorphismCard';
import { AnthologyLandingPageData } from '@/lib/types/landing-page';

interface GuaranteeSectionProps {
  data: AnthologyLandingPageData['guarantee'];
}

/**
 * GuaranteeSection Component
 * 
 * Displays guarantee and risk reversal with:
 * - Guarantee heading and description
 * - Terms list
 * - Trust badges
 * - Glassmorphism card styling
 */
export function GuaranteeSection({ data }: GuaranteeSectionProps) {
  const { heading, description, terms, badges } = data;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section 
      ref={ref}
      className="py-16 md:py-24 bg-[#FDFBF7]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <GlassmorphismCard className="p-8 md:p-12">
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 rounded-full bg-[#c5a059]/10 flex items-center justify-center">
                <Shield className="w-10 h-10 text-[#c5a059]" strokeWidth={1.5} />
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-ink-900 text-center mb-6 leading-tight">
              {heading}
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl font-sans text-ink-700 text-center leading-relaxed mb-10 max-w-2xl mx-auto">
              {description}
            </p>

            {/* Terms List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {terms.map((term, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-[#c5a059] flex-shrink-0 mt-1" strokeWidth={2} />
                  <span className="text-base font-sans text-ink-700">{term}</span>
                </motion.div>
              ))}
            </div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-ink-900/10"
            >
              {badges.map((badge, index) => {
                const icons = [
                  <Heart className="w-5 h-5" strokeWidth={2} />,
                  <Lock className="w-5 h-5" strokeWidth={2} />,
                  <Shield className="w-5 h-5" strokeWidth={2} />
                ];
                
                return (
                  <div key={index} className="flex items-center gap-2 text-sm font-sans text-ink-600">
                    <div className="w-8 h-8 rounded-full bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059]">
                      {icons[index % icons.length]}
                    </div>
                    <span>{badge}</span>
                  </div>
                );
              })}
            </motion.div>
          </GlassmorphismCard>
        </motion.div>
      </div>
    </section>
  );
}
