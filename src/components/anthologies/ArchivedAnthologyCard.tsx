'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle2, ExternalLink, Users } from 'lucide-react';
import { ArchivedAnthology } from '@/types/anthology';
import Image from 'next/image';

interface ArchivedAnthologyCardProps {
  anthology: ArchivedAnthology;
  index: number;
}

/**
 * ArchivedAnthologyCard Component
 * 
 * Credibility-building card for past anthologies with:
 * - Display of title, genre, year, and author count
 * - Conditional impact badge display
 * - Lazy-loaded cover image with fallback gradient
 * - Conditional Amazon link button
 * - Subtle hover effects
 * 
 * **Validates: Requirements 5.1-5.5**
 */
export function ArchivedAnthologyCard({ anthology, index }: ArchivedAnthologyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="group"
    >
      <div className="relative border border-ink-900/10 p-6 md:p-8 hover:border-ink-900/40 transition-all duration-500 bg-white h-full flex flex-col group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.02)]">
        {/* Header: Year and Check Icon */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-ink-900/5">
          <span className="text-[8px] font-sans font-black uppercase tracking-[0.3em] text-ink-400">
            {anthology.year} IMPRINT // VOL.0{index + 1}
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-gold/50 group-hover:bg-gold transition-colors"></div>
        </div>

        {/* Cover Image or Fallback */}
        <div className="relative w-full aspect-[4/5] mb-10 overflow-hidden shadow-sm group-hover:shadow-xl transition-shadow duration-700">
          {anthology.coverImage ? (
            <Image
              src={anthology.coverImage}
              alt={`${anthology.title} cover`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 bg-[#FDFBF7] flex items-center justify-center p-8 border border-ink-900/5">
              <div className="text-center group-hover:scale-105 transition-transform duration-700">
                <div className="w-12 h-px bg-gold/30 mx-auto mb-6"></div>
                <h4 className="text-xl font-serif font-black text-ink-900 uppercase tracking-tighter leading-none">
                  {anthology.title}
                </h4>
                <div className="w-12 h-px bg-gold/30 mx-auto mt-6"></div>
              </div>
              {/* Subtle texture overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/images/paper-texture.png')] mix-blend-multiply"></div>
            </div>
          )}
          
          {/* Status Overlay on hover */}
          <div className="absolute inset-x-0 bottom-0 bg-ink-900 text-white py-4 text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 font-sans text-[10px] font-black uppercase tracking-widest">
             ARCHIVE VERIFIED
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-black text-ink-900 uppercase tracking-tighter mb-2 leading-tight group-hover:text-gold transition-colors duration-300">
          {anthology.title}
        </h3>

        {/* Genre & Author Count */}
        <div className="flex items-center gap-4 mb-8">
          <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-ink-500 font-black italic">
            {anthology.genre}
          </p>
          <div className="w-1 h-1 rounded-full bg-ink-900/10"></div>
          <div className="flex items-center gap-2 text-[10px] font-sans font-bold text-ink-400 uppercase tracking-widest">
            <Users size={12} />
            <span>{anthology.authorCount} WRITERS</span>
          </div>
        </div>

        {/* Description (if available) - refined for space */}
        {anthology.description && (
          <p className="text-sm text-ink-600 font-sans font-light leading-relaxed mb-8 flex-grow line-clamp-3">
            {anthology.description}
          </p>
        )}

        {/* Layout micro-details */}
        <div className="mt-auto space-y-6">
          {/* Impact Badge - Redesigned */}
          {anthology.impact && (
            <div className="flex items-center gap-3">
              <div className="h-px flex-grow bg-ink-900/5"></div>
              <div className="text-[9px] font-sans font-black uppercase tracking-[0.3em] text-gold border border-gold/20 px-4 py-2 bg-gold/5 italic">
                {anthology.impact}
              </div>
              <div className="h-px flex-grow bg-ink-900/5"></div>
            </div>
          )}

          {/* Amazon Link (if available) */}
          {anthology.amazonLink ? (
            <Link
              href={anthology.amazonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between py-4 border-t border-ink-900/10 text-[10px] font-sans font-black uppercase tracking-widest text-ink-900 hover:text-gold transition-colors duration-300 group/link"
            >
              <span className="flex items-center gap-3">
                <ExternalLink size={14} className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                GET THE IMPRINT
              </span>
              <CheckCircle2 size={14} className="text-gold opacity-30 group-hover:opacity-100 transition-opacity" />
            </Link>
          ) : (
            <div className="w-full h-px bg-ink-900/10"></div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

