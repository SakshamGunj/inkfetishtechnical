'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users } from 'lucide-react';
import { Benefit, Stats } from '@/types/anthology';

interface WhyInkfetishSectionProps {
  benefits: Benefit[];
  stats: Stats;
}

/**
 * WhyInkfetishSection Component
 * 
 * Value proposition section displaying:
 * - Benefit items with icons, titles, and descriptions
 * - Statistics (published authors, anthologies launched, community size)
 * - Glassmorphism styling consistent with brand
 * 
 * **Validates: Requirements 1.2, 1.3**
 */
export function WhyInkfetishSection({ benefits, stats }: WhyInkfetishSectionProps) {
  return (
    <section className="py-20 md:py-24 bg-ink-900 text-[#FDFBF7] relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white opacity-[0.02] transform skew-x-12 translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Left Column: Benefits (7 cols) */}
          <div className="lg:col-span-7 space-y-16">
            <div>
              <h3 className="text-[10px] font-sans uppercase tracking-[0.5em] text-ink-400 font-black mb-6">
                THE INKFETISH STANDARD
              </h3>
              <h4 className="text-4xl md:text-7xl font-black font-serif italic leading-[0.85] tracking-tighter uppercase text-white">
                Not All <br />
                <span className="text-gold italic font-light not-italic">Anthologies</span> <br/>Are Equal.
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-12">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                  className="flex items-start gap-8 group"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-14 h-14 border border-white/20 flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-ink-900 group-hover:border-gold transition-all duration-500 font-serif font-black text-xl italic">
                      0{i + 1}
                    </div>
                    <div className="w-px h-full bg-gradient-to-b from-white/20 to-transparent"></div>
                  </div>
                  <div className="pt-2">
                    <h5 className="text-lg font-serif font-black uppercase tracking-widest text-gold mb-2">
                      {benefit.title}
                    </h5>
                    <p className="text-base text-ink-300 font-sans font-light leading-relaxed max-w-md">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Stats (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative bg-white/5 border border-white/10 p-10 md:p-14 flex flex-col items-center text-center group overflow-hidden">
              {/* Corner decorative elements */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold/40"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-gold/40"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-gold/40"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold/40"></div>

              <Sparkles className="absolute -top-12 -right-12 w-32 h-32 text-gold opacity-[0.05] rotate-12 group-hover:scale-110 transition-transform duration-1000" />
              
              <div className="text-[10px] font-sans uppercase tracking-[0.4em] text-ink-400 font-black mb-10">
                VERIFIED PERFORMANCE
              </div>

              <div className="relative mb-12">
                <div className="text-7xl md:text-8xl font-black italic tracking-tighter uppercase text-white leading-none">
                  {stats.publishedAuthors}
                </div>
                <div className="absolute -top-4 -right-10 text-4xl font-serif font-black text-gold">+</div>
              </div>
              
              <div className="text-sm font-sans uppercase tracking-[0.3em] text-gold font-black mb-16 pb-16 border-b border-white/10 w-full italic">
                Published Co-Authors
              </div>

              <div className="grid grid-cols-2 gap-12 w-full">
                <div className="text-left">
                  <div className="text-4xl font-black italic tracking-tighter uppercase text-white mb-1">
                    {stats.anthologiesLaunched}
                  </div>
                  <div className="text-[9px] font-sans uppercase tracking-[0.2em] text-ink-400 font-bold leading-tight">
                    Anthologies <br/>Launched
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-4xl font-black italic tracking-tighter uppercase text-white mb-1">
                    {stats.communitySize}
                  </div>
                  <div className="text-[9px] font-sans uppercase tracking-[0.2em] text-ink-400 font-bold leading-tight">
                    Active <br/>Community
                  </div>
                </div>
              </div>

              <div className="mt-20 w-full relative">
                <div className="absolute inset-0 bg-gold blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="relative text-[10px] font-sans font-black text-gold uppercase tracking-[0.3em] border border-gold/30 px-8 py-4 backdrop-blur-sm">
                  The Gold Standard in Collective Publishing
                </div>
              </div>
            </div>

            {/* Floating shadow for depth */}
            <div className="absolute inset-x-8 bottom-0 h-1 bg-gold/50 blur-2xl opacity-50"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

