'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScarcityTrigger } from './shared/ScarcityTrigger';
import { AnthologyLandingPageData } from '@/lib/types/landing-page';

interface ScaricitySectionProps {
  data?: AnthologyLandingPageData['scarcity'];
}

/**
 * ScarcitySection Component
 * 
 * Conditionally displays scarcity triggers:
 * - Only renders when scarcity data exists
 * - Positions near CTA buttons
 * - Uses ScarcityTrigger component
 */
export function ScarcitySection({ data }: ScaricitySectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Don't render if no scarcity data
  if (!data) return null;

  return (
    <section 
      ref={ref}
      className="py-8 bg-white"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <ScarcityTrigger {...data} />
        </motion.div>
      </div>
    </section>
  );
}
