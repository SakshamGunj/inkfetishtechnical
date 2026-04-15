'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Quote } from 'lucide-react';
import { GlassmorphismCard } from './shared/GlassmorphismCard';
import { AnthologyLandingPageData } from '@/lib/types/landing-page';

interface ContentPreviewSectionProps {
  data: AnthologyLandingPageData['contentPreview'];
}

/**
 * ContentPreviewSection Component
 * 
 * Displays sample content with:
 * - 2-3 poem/story excerpts
 * - Author attribution
 * - Elegant typography with proper line spacing
 * - Visual indicator for more content
 */
export function ContentPreviewSection({ data }: ContentPreviewSectionProps) {
  const { excerpts } = data;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section 
      ref={ref}
      className="py-16 md:py-24 bg-[#FDFBF7]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-[#c5a059]/10 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-[#c5a059]" strokeWidth={1.5} />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-ink-900 mb-6 leading-tight">
            A Glimpse Inside
          </h2>
          <p className="text-lg md:text-xl font-sans text-ink-600 max-w-2xl mx-auto">
            Experience the raw emotion and healing power of these pages
          </p>
        </motion.div>

        {/* Excerpts Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {excerpts.map((excerpt) => (
            <motion.div
              key={excerpt.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <GlassmorphismCard className="p-8 h-full flex flex-col">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-[#c5a059]/30 mb-4" strokeWidth={1} />

                {/* Poem Title */}
                <h3 className="text-xl md:text-2xl font-serif font-bold text-ink-900 mb-6 italic">
                  {excerpt.title}
                </h3>

                {/* Poem Content */}
                <div className="flex-grow mb-6">
                  <pre className="font-serif text-base md:text-lg text-ink-700 leading-loose whitespace-pre-wrap">
                    {excerpt.content}
                  </pre>
                </div>

                {/* Author Attribution */}
                <div className="pt-4 border-t border-ink-900/10">
                  <p className="font-sans text-sm text-ink-500 uppercase tracking-wider">
                    — {excerpt.authorName}
                  </p>
                </div>
              </GlassmorphismCard>
            </motion.div>
          ))}
        </motion.div>

        {/* More Content Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-lg font-sans text-ink-600 mb-2">
            ...and 39 more powerful pieces inside
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#c5a059]"></div>
            <div className="w-2 h-2 rounded-full bg-[#c5a059]/60"></div>
            <div className="w-2 h-2 rounded-full bg-[#c5a059]/30"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
