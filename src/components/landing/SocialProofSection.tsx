'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Award, Shield } from 'lucide-react';
import { TestimonialCard } from './shared/TestimonialCard';
import { AnthologyLandingPageData } from '@/lib/types/landing-page';

interface SocialProofSectionProps {
  data: AnthologyLandingPageData['socialProof'];
}

/**
 * SocialProofSection Component
 * 
 * Displays social proof with:
 * - Reader testimonials in grid
 * - Author count and community size
 * - Trust signals
 * - Staggered animations for testimonials
 */
export function SocialProofSection({ data }: SocialProofSectionProps) {
  const { testimonials, authorCount, communitySize, trustSignals } = data;
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-ink-900 mb-6 leading-tight">
            Loved by Readers Everywhere
          </h2>
          <p className="text-lg md:text-xl font-sans text-ink-600 max-w-2xl mx-auto">
            Join {communitySize} writers and readers who trust Inkfetish
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto"
        >
          <div className="text-center p-6 border border-ink-900/10 rounded-lg">
            <Users className="w-8 h-8 text-[#c5a059] mx-auto mb-3" strokeWidth={1.5} />
            <div className="text-3xl font-serif font-bold text-ink-900 mb-1">{authorCount}+</div>
            <div className="text-sm font-sans uppercase tracking-wider text-ink-500">Contributing Authors</div>
          </div>
          
          <div className="text-center p-6 border border-ink-900/10 rounded-lg">
            <Award className="w-8 h-8 text-[#c5a059] mx-auto mb-3" strokeWidth={1.5} />
            <div className="text-3xl font-serif font-bold text-ink-900 mb-1">4.9/5</div>
            <div className="text-sm font-sans uppercase tracking-wider text-ink-500">Average Rating</div>
          </div>
          
          <div className="text-center p-6 border border-ink-900/10 rounded-lg">
            <Shield className="w-8 h-8 text-[#c5a059] mx-auto mb-3" strokeWidth={1.5} />
            <div className="text-3xl font-serif font-bold text-ink-900 mb-1">500+</div>
            <div className="text-sm font-sans uppercase tracking-wider text-ink-500">Advance Readers</div>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.4
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-6 text-sm font-sans text-ink-500"
        >
          {trustSignals.map((signal, index) => (
            <div key={index} className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#c5a059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{signal}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
