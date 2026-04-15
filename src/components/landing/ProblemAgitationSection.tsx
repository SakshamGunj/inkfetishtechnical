'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, Hammer } from 'lucide-react';
import { GlassmorphismCard } from './shared/GlassmorphismCard';
import { AnthologyLandingPageData } from '@/lib/types/landing-page';

interface ProblemAgitationSectionProps {
  data: AnthologyLandingPageData['problemAgitation'];
}

/**
 * ProblemAgitationSection Component
 * 
 * Identifies and agitates the emotional problem with:
 * - Relatable problem statement
 * - Emotional copy that resonates
 * - Heart iconography
 * - Glassmorphism card styling
 * - Scroll-triggered animation
 */
export function ProblemAgitationSection({ data }: ProblemAgitationSectionProps) {
  const { heading, paragraphs } = data;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section 
      ref={ref}
      className="py-16 md:py-24 bg-white border-y border-ink-900/10"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <GlassmorphismCard className="p-8 md:p-12">
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Heart className="w-16 h-16 text-ink-900/20" strokeWidth={1} />
                <Hammer className="w-8 h-8 text-[#c5a059] absolute -bottom-1 -right-1" strokeWidth={1.5} />
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-ink-900 text-center mb-8 leading-tight">
              {heading}
            </h2>

            {/* Problem Paragraphs */}
            <div className="space-y-6 max-w-3xl mx-auto">
              {paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                  className="text-lg md:text-xl font-sans text-ink-700 leading-relaxed text-center"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Decorative divider */}
            <div className="mt-12 flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-ink-900/20"></div>
              <Heart className="w-4 h-4 text-[#c5a059] fill-[#c5a059]" />
              <div className="h-px w-16 bg-ink-900/20"></div>
            </div>
          </GlassmorphismCard>
        </motion.div>
      </div>
    </section>
  );
}
