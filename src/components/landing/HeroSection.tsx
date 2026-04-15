'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CTAButton } from './shared/CTAButton';
import { AnthologyLandingPageData } from '@/lib/types/landing-page';

interface HeroSectionProps {
  data: AnthologyLandingPageData['hero'];
}

/**
 * HeroSection Component
 * 
 * Above-the-fold section with:
 * - Powerful headline and subheadline
 * - Book cover image (optimized with Next.js Image)
 * - Primary CTA button
 * - Fade-in animation on load
 * - Responsive layout (book cover right on desktop, below on mobile)
 */
export function HeroSection({ data }: HeroSectionProps) {
  const { headline, subheadline, bookCover, cta } = data;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-[#FDFBF7] pt-24 pb-16 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-ink-900 leading-[1.1] mb-6">
              {headline}
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl lg:text-2xl font-sans font-light text-ink-600 leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
              {subheadline}
            </p>

            {/* Primary CTA */}
            <div className="flex justify-center lg:justify-start">
              <CTAButton
                text={cta.text}
                action={cta.action}
                link={cta.link}
                variant="primary"
                size="large"
              />
            </div>

            {/* Trust Signals */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm font-sans text-ink-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#c5a059]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>4.9/5 from 500+ readers</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#c5a059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>30-Day Money-Back Guarantee</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Book Cover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md aspect-[2/3] shadow-2xl">
              <Image
                src={bookCover.url}
                alt={bookCover.alt}
                fill
                priority
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                onError={(e) => {
                  // Fallback to placeholder if image fails
                  e.currentTarget.src = '/images/placeholder-book.png';
                }}
              />
              
              {/* Decorative shadow effect */}
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-[#c5a059]/20 rounded-lg -z-10" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative bottom lines */}
      <div className="absolute bottom-0 left-0 w-full flex justify-between px-8 sm:px-16 opacity-20">
        <div className="w-px h-24 bg-ink-900"></div>
        <div className="w-px h-16 bg-ink-900"></div>
        <div className="w-px h-32 bg-ink-900"></div>
      </div>
    </section>
  );
}
