'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function AnthologyPreHeader() {
  return (
    <div className="w-full bg-ink-900 overflow-hidden relative border-b border-gold/20">
      {/* Subtle scrolling text or pattern */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2 md:py-3">
        <div className="flex items-center gap-4 md:gap-8">
           <span className="text-[10px] md:text-xs font-sans font-black uppercase tracking-[0.3em] text-white">
             INKFETISH PUBLICATIONS
           </span>
           <span className="hidden md:block w-px h-3 bg-white/20" />
           <span className="text-[10px] md:text-xs font-serif italic text-gold font-bold">
             Est. 2020 — India&apos;s Most Trusted Anthology Community
           </span>
        </div>
        
        <div className="flex items-center gap-4">
           <motion.div 
             animate={{ opacity: [0.4, 1, 0.4] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="w-1.5 h-1.5 rounded-full bg-gold"
           />
           <span className="text-[10px] font-sans font-black uppercase tracking-widest text-white/70">
             ANTHOLOGY HUB
           </span>
        </div>
      </div>
      
      {/* Decorative Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </div>
  );
}
