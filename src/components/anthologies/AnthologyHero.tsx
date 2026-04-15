'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MoveRight, Star, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export function AnthologyHero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-12 bg-[#FDFBF7]">
      {/* Decorative Editorial Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-hero" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-hero)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center text-center w-full max-w-5xl"
        >
          {/* Tagline */}
          <h2 className="text-[10px] font-sans uppercase tracking-[0.5em] text-gold font-black mb-10 flex items-center justify-center gap-6">
            <span className="w-12 h-px bg-gold/30" /> THE INKFETISH STANDARD <span className="w-12 h-px bg-gold/30" />
          </h2>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-serif text-ink-900 leading-[0.9] tracking-tighter uppercase mb-8">
            390+ Writers <br/>
            <span className="block italic font-light text-ink-600 mt-2">Already Did It.</span>
            <span className="block text-gold mt-1">Are You Next?</span>
          </h1>

          <p className="text-base md:text-lg text-ink-900 border-l border-ink-900/10 pl-6 max-w-3xl font-serif font-black uppercase tracking-widest leading-tight mb-8 mx-auto italic">
            Join India's Most Trusted Anthology Community and Become a Published Author — No Experience Needed.
          </p>

          <div className="max-w-xl mx-auto mb-16 px-6 py-8 border-l-2 border-gold/20 bg-ink-900/5 backdrop-blur-sm italic">
            <p className="text-sm md:text-base text-ink-600 font-sans font-medium leading-relaxed">
              "You've been writing for months. Maybe years. In diaries, in notes apps, in the corner of your phone screen at midnight. 
              You have something to say. Something real. But somewhere deep inside, a quiet voice asks — <span className="text-ink-900 font-bold">'Will anyone ever read this?'</span> 
              Today, that changes."
            </p>
          </div>

          {/* Action Area */}
          <div className="flex flex-col sm:flex-row gap-8 items-center mb-16 relative">
            {/* Decorative Floating Element */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-12 -left-12 w-24 h-24 border border-gold/10 rounded-full hidden lg:flex items-center justify-center"
            >
              <div className="w-1 h-1 bg-gold rounded-full" />
            </motion.div>

            <Link href="#active" className="group relative">
              {/* Offset Border for "Outstanding" effect */}
              <div className="absolute inset-0 border border-gold translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300" />
              
              <button className="relative bg-ink-900 text-white font-sans uppercase tracking-[0.2em] py-8 px-16 text-xs font-black hover:bg-gold hover:text-ink-900 transition-all border border-ink-900 shadow-2xl flex items-center gap-4">
                YES, I WANT TO BE PUBLISHED
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <MoveRight />
                </motion.div>
              </button>
            </Link>

            <Link href="#showcase" className="text-[10px] font-sans font-black uppercase tracking-[0.3em] text-ink-400 hover:text-gold transition-colors flex items-center gap-2 group">
              See Our Past Anthologies First <ChevronDown size={14} className="group-hover:translate-y-1 transition-transform" />
            </Link>
          </div>

          {/* Social Proof Strip */}
          <div className="w-full border-t border-ink-900/10 pt-12 mt-4 grid grid-cols-2 md:grid-cols-4 gap-8">
             <div className="flex flex-col items-center">
                <span className="text-2xl font-serif font-black text-ink-900">390+</span>
                <span className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-ink-400">Writers Published</span>
             </div>
             <div className="flex flex-col items-center">
                <span className="text-2xl font-serif font-black text-ink-900">4</span>
                <span className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-ink-400">Anthologies Launched</span>
             </div>
             <div className="flex flex-col items-center">
                <span className="text-2xl font-serif font-black text-ink-900">48</span>
                <span className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-ink-400">Books Sold In 32 Hours</span>
             </div>
             <div className="flex flex-col items-center">
                <div className="flex gap-1 mb-1">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-gold text-gold" />)}
                </div>
                <span className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-ink-400">4.7 STAR REVIEWS</span>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
