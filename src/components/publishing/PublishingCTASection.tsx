'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';

interface PublishingCTAProps {
  headline: string;
  subtext?: string;
  buttonText: string;
  microcopy?: string;
  variant?: 'light' | 'dark' | 'gold';
}

export function PublishingCTASection({ 
  headline, 
  subtext, 
  buttonText, 
  microcopy, 
  variant = 'light' 
}: PublishingCTAProps) {
  
  const bgColors = {
    light: 'bg-white',
    dark: 'bg-ink-900',
    gold: 'bg-gold'
  };

  const textColors = {
    light: 'text-ink-900',
    dark: 'text-white',
    gold: 'text-ink-900'
  };

  const subtextColors = {
    light: 'text-ink-500',
    dark: 'text-white/60',
    gold: 'text-ink-700'
  };

  const btnColors = {
    light: 'bg-ink-900 border-ink-900 text-white hover:bg-gold hover:border-gold hover:text-ink-900',
    dark: 'bg-white border-white text-ink-900 hover:bg-gold hover:border-gold hover:text-ink-900',
    gold: 'bg-ink-900 border-ink-900 text-white hover:bg-white hover:border-white hover:text-ink-900'
  };

  return (
    <section className={`py-16 md:py-24 ${bgColors[variant]} relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <div className={`w-8 h-px mx-auto mb-8 ${variant === 'dark' ? 'bg-white/30' : 'bg-ink-900/30'}`} />
          <h4 className={`text-2xl md:text-4xl lg:text-5xl font-serif font-black uppercase tracking-tighter leading-tight mb-8 ${textColors[variant]} italic`}>
            {headline}
          </h4>
          
          {subtext && (
            <p className={`text-base md:text-lg font-sans font-medium italic mb-12 max-w-xl mx-auto ${subtextColors[variant]}`}>
              {subtext}
            </p>
          )}

          <div className="flex flex-col items-center gap-6 mt-6">
            <Link href="/contact" className="group relative">
               <div className={`absolute inset-0 border ${variant === 'dark' ? 'border-gold' : 'border-gold'} translate-x-1.5 translate-y-1.5 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300 pointer-events-none`} />
               <button className={`relative font-sans uppercase tracking-[0.2em] py-5 px-8 md:py-6 md:px-10 text-[10px] md:text-xs font-black transition-all border shadow-xl flex items-center gap-4 ${btnColors[variant]}`}>
                 {buttonText} <MoveRight size={14} className="group-hover:translate-x-1 transition-transform" />
               </button>
            </Link>
            
            {microcopy && (
              <p className={`text-[8px] md:text-[9px] font-sans font-bold uppercase tracking-[0.2em] mt-2 ${subtextColors[variant]}`}>
                &quot;{microcopy}&quot;
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
