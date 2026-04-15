'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { CTAButton } from './shared/CTAButton';
import { AnthologyLandingPageData } from '@/lib/types/landing-page';

interface SolutionSectionProps {
  data: AnthologyLandingPageData['solution'];
}

/**
 * SolutionSection Component
 * 
 * Presents the solution with:
 * - Solution heading
 * - Benefit-driven list (not features)
 * - Visual hierarchy for key benefits
 * - Secondary CTA button
 * - Scroll-triggered animation
 */
export function SolutionSection({ data }: SolutionSectionProps) {
  const { heading, benefits, cta } = data;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section 
      ref={ref}
      className="py-16 md:py-24 bg-[#FDFBF7]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-[#c5a059]/10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-[#c5a059]" strokeWidth={1.5} />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-ink-900 mb-6 leading-tight">
            {heading}
          </h2>
        </motion.div>

        {/* Benefits List */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
              }
            }
          }}
          className="max-w-3xl mx-auto space-y-6 mb-12"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
              className="flex items-start gap-4 group"
            >
              {/* Check Icon */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#c5a059] flex items-center justify-center mt-1 group-hover:scale-110 transition-transform">
                <Check className="w-5 h-5 text-white" strokeWidth={3} />
              </div>

              {/* Benefit Text */}
              <p className="text-lg md:text-xl font-sans text-ink-700 leading-relaxed flex-1">
                {benefit}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center"
        >
          <CTAButton
            text={cta.text}
            action={cta.action}
            link={cta.link}
            variant="primary"
            size="large"
          />
        </motion.div>
      </div>
    </section>
  );
}
