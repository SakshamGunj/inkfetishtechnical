'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Feather } from 'lucide-react';
import { AuthorCard } from './shared/AuthorCard';
import { AnthologyLandingPageData } from '@/lib/types/landing-page';

interface AuthorShowcaseSectionProps {
  data: AnthologyLandingPageData['authors'];
}

/**
 * AuthorShowcaseSection Component
 * 
 * Displays contributing authors with:
 * - Author cards in responsive grid
 * - Photos, names, and bios
 * - Optional profile links
 * - Staggered animations
 */
export function AuthorShowcaseSection({ data }: AuthorShowcaseSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section 
      ref={ref}
      className="py-16 md:py-24 bg-white border-y border-ink-900/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-[#c5a059]/10 flex items-center justify-center">
              <Feather className="w-8 h-8 text-[#c5a059]" strokeWidth={1.5} />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-ink-900 mb-6 leading-tight">
            Meet the Voices
          </h2>
          <p className="text-lg md:text-xl font-sans text-ink-600 max-w-2xl mx-auto">
            42 poets and storytellers who turned their pain into art
          </p>
        </motion.div>

        {/* Authors Grid */}
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {data.map((author) => (
            <motion.div
              key={author.id}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 }
              }}
            >
              <AuthorCard {...author} />
            </motion.div>
          ))}
        </motion.div>

        {/* More Authors Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-lg font-sans text-ink-600">
            + 36 more incredible voices inside the anthology
          </p>
        </motion.div>
      </div>
    </section>
  );
}
