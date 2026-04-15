'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Gift, TrendingDown } from 'lucide-react';
import { GlassmorphismCard } from './shared/GlassmorphismCard';
import { ValueStackItem } from './shared/ValueStackItem';
import { CTAButton } from './shared/CTAButton';
import { AnthologyLandingPageData } from '@/lib/types/landing-page';

interface ValueStackSectionProps {
  data: AnthologyLandingPageData['valueStack'];
}

/**
 * ValueStackSection Component
 * 
 * Displays the value stack with:
 * - Individual value items with pricing
 * - Total value calculation
 * - Actual price with savings emphasis
 * - Tertiary CTA button
 * - Conversion-focused layout
 */
export function ValueStackSection({ data }: ValueStackSectionProps) {
  const { items, totalValue, actualPrice, savings, cta } = data;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section 
      ref={ref}
      className="py-16 md:py-24 bg-[#FDFBF7]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-[#c5a059]/10 flex items-center justify-center">
              <Gift className="w-8 h-8 text-[#c5a059]" strokeWidth={1.5} />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-ink-900 mb-6 leading-tight">
            Everything You Get
          </h2>
          <p className="text-lg md:text-xl font-sans text-ink-600">
            When you pre-order Hearts Under Construction today
          </p>
        </motion.div>

        {/* Value Stack Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <GlassmorphismCard className="p-8 md:p-10">
            {/* Value Items */}
            <div className="mb-8">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <ValueStackItem {...item} />
                </motion.div>
              ))}
            </div>

            {/* Total Value */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="border-t-2 border-ink-900/20 pt-6 mb-6"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-sans font-semibold text-ink-700">
                  Total Value:
                </span>
                <span className="text-2xl font-serif font-bold text-ink-900 line-through decoration-2">
                  ₹{totalValue}
                </span>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-sans font-bold text-ink-900">
                  Your Price Today:
                </span>
                <span className="text-4xl font-serif font-bold text-[#c5a059]">
                  ₹{actualPrice}
                </span>
              </div>

              {/* Savings Badge */}
              <div className="bg-[#c5a059]/10 border border-[#c5a059]/30 rounded-lg p-4 flex items-center justify-center gap-3">
                <TrendingDown className="w-6 h-6 text-[#c5a059]" strokeWidth={2} />
                <span className="text-lg font-sans font-bold text-ink-900">
                  You Save ₹{savings} ({Math.round((savings / totalValue) * 100)}% OFF)
                </span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex justify-center"
            >
              <CTAButton
                text={cta.text}
                action={cta.action}
                link={cta.link}
                variant="primary"
                size="large"
                className="w-full md:w-auto"
              />
            </motion.div>
          </GlassmorphismCard>
        </motion.div>

        {/* Trust Signal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-8 text-center text-sm font-sans text-ink-500"
        >
          <p>✓ Instant access to digital bonuses • ✓ Ships in 2-3 weeks • ✓ 30-day guarantee</p>
        </motion.div>
      </div>
    </section>
  );
}
