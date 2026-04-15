'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Sparkles, ArrowRight } from 'lucide-react';
import { LiveAnthology } from '@/types/anthology';
import { calculateScarcityTrigger } from '@/lib/anthology-utils';

interface LiveAnthologyCardProps {
  anthology: LiveAnthology;
  index: number;
}

/**
 * LiveAnthologyCard Component
 * 
 * Premium card showcasing active anthology with:
 * - Status badge rendering with conditional styling
 * - Glassmorphism card styling with accent color borders
 * - Scarcity trigger display logic
 * - CTA button with conditional enable/disable
 * - Hover animations (translate -4px, shadow with accent color)
 * - Entrance animations with staggered delay
 * - Alternating slide direction (even: left, odd: right)
 * 
 * **Validates: Requirements 2.1-2.6, 3.1-3.5, 4.1-4.5, 8.1-8.5**
 */
export function LiveAnthologyCard({ anthology, index }: LiveAnthologyCardProps) {
  // Calculate scarcity trigger
  const scarcity = calculateScarcityTrigger(anthology);

  // Determine status badge styling
  const getStatusBadge = () => {
    switch (anthology.status) {
      case 'open':
        return {
          text: 'SUBMISSIONS OPEN',
          className: 'bg-ink-900 text-[#FDFBF7]'
        };
      case 'editorial':
        return {
          text: 'EDITORIAL REVIEW',
          className: 'bg-gold text-ink-900'
        };
      case 'closed':
        return {
          text: 'CLOSED',
          className: 'bg-ink-900/20 text-ink-600'
        };
    }
  };

  const statusBadge = getStatusBadge();
  const ctaEnabled = anthology.status === 'open';
  const ctaText = anthology.ctaText || 'SUBMIT NOW';

  // Entrance animation direction
  const slideDirection = index % 2 === 0 ? -30 : 30;

  return (
    <motion.div
      initial={{ opacity: 0, x: slideDirection }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="group relative"
    >
      {/* Editorial Vertical Label */}
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 rotate-180 [writing-mode:vertical-lr] text-[8px] font-sans font-black tracking-[0.5em] text-ink-300 uppercase hidden lg:block">
        ACTIVE IMPRINT // 2025-26
      </div>

      <motion.div
        className="relative overflow-hidden transition-all duration-500 border border-ink-900/10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.03)] group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)]"
        whileHover={{
          y: -8,
          borderColor: 'rgba(15, 15, 15, 0.2)',
        }}
      >
        {/* Accent Top Border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Card Background decorative element */}
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none">
           <span className="text-8xl font-black font-serif italic">{index + 1}</span>
        </div>

        <div className="bg-white p-6 md:p-10 relative z-10">
          {/* Header: Status Badge and Genre */}
          <div className="flex justify-between items-center mb-12">
            <div
              className={`${statusBadge.className} px-6 py-2 text-[10px] font-black uppercase tracking-widest italic shadow-sm`}
              role="status"
            >
              {statusBadge.text}
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-ink-900/10"></div>
              <p className="text-[10px] font-sans font-black italic uppercase tracking-[0.2em] text-gold">
                {anthology.genre}
              </p>
            </div>
          </div>

          {/* Title with decorative line */}
          <div className="mb-6 relative">
            <h3 className="text-3xl md:text-5xl font-black text-ink-900 uppercase tracking-tighter leading-[0.9] group-hover:text-ink-800 transition-colors duration-500">
              {anthology.title}
            </h3>
            <div className="w-12 h-1 bg-gold mt-4 transform origin-left group-hover:scale-x-150 transition-transform duration-500"></div>
          </div>

          {/* Description */}
          <p className="text-base md:text-lg text-ink-600 font-sans font-light leading-relaxed mb-10 max-w-lg">
            {anthology.description}
          </p>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-10 border-y border-ink-900/5 mb-12 relative overflow-hidden">
             {/* Micro-detail line */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-8 bg-ink-900/10 hidden sm:block"></div>
            
            <div className="space-y-2">
              <p className="text-[9px] font-sans font-black text-ink-400 uppercase tracking-widest">Global Deadline</p>
              <div className="flex items-center gap-3 text-sm font-sans font-bold uppercase tracking-widest text-ink-900">
                <Calendar size={14} className="text-gold" />
                {new Date(anthology.deadline).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[9px] font-sans font-black text-ink-400 uppercase tracking-widest">Author Grant</p>
              <div className="flex items-center gap-3 text-sm font-sans font-bold uppercase tracking-widest text-gold italic">
                <Sparkles size={14} className="fill-current" />
                {anthology.reward}
              </div>
            </div>
          </div>

          {/* Scarcity Trigger */}
          {scarcity?.show && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 bg-gold/5 border-l-4 border-gold text-ink-900 px-6 py-4 flex items-center gap-4 group/scarcity"
            >
              <div className="w-8 h-8 bg-gold flex items-center justify-center rounded-full shrink-0 animate-pulse">
                <Sparkles className="w-4 h-4 text-ink-900" />
              </div>
              <p className="font-sans font-black text-[10px] md:text-xs uppercase tracking-widest leading-tight">
                {scarcity.message}
              </p>
            </motion.div>
          )}

          {/* CTA Button */}
          {ctaEnabled ? (
            <Link href={anthology.ctaLink}>
              <motion.button
                className="w-full bg-ink-900 text-white group-hover:bg-gold group-hover:text-ink-900 py-6 text-[10px] md:text-xs font-sans uppercase tracking-[0.5em] transition-all font-black border border-ink-900 flex items-center justify-center gap-6 relative overflow-hidden"
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">{ctaText}</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
              </motion.button>
            </Link>
          ) : (
            <button
              className="w-full bg-ink-900/5 text-ink-400 py-6 text-[10px] md:text-xs font-sans uppercase tracking-[0.5em] font-black border border-ink-900/5 cursor-not-allowed italic"
              disabled
            >
              {anthology.status === 'editorial' ? 'EDITORIAL IN PROGRESS' : 'SUBMISSIONS CLOSED'}
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

