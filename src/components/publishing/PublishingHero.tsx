'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MoveRight, ShieldCheck, Palette, Layout, Globe, Star } from 'lucide-react';
import Link from 'next/link';

export function PublishingHero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden pt-28 pb-16 bg-[#FDFBF7]">
      {/* Ambient Blurred Gradients for visual depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gold/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-ink-900/5 blur-[100px] pointer-events-none" />

      {/* Apple-style minimalist background element */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-publishing-hero" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-publishing-hero)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center text-center max-w-5xl mx-auto"
        >
          <h2 className="text-[10px] font-sans font-black uppercase tracking-[0.5em] text-gold mb-12 flex items-center gap-6">
            <span className="w-12 h-px bg-gold/30" /> THE INKFETISH STANDARD <span className="w-12 h-px bg-gold/30" />
          </h2>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black font-serif text-ink-900 leading-[1] tracking-tighter uppercase mb-8 relative">
            <span className="absolute -left-6 -top-6 text-gold opacity-30 text-sm hidden md:block">+</span>
            Your Book Is the First Thing <br/>
            <span className="italic font-light text-ink-600 block mt-2 lowercase">the World Judges You By.</span>
            <span className="absolute -right-6 bottom-0 text-gold opacity-30 text-sm hidden md:block">+</span>
          </h1>

          <p className="text-lg md:text-xl text-ink-900 max-w-2xl font-serif font-black uppercase tracking-widest leading-tight mb-8 italic">
            Make It Impossible to Ignore.
          </p>
          
          <p className="text-sm md:text-base text-ink-600 font-sans font-medium leading-relaxed mb-12 max-w-2xl mx-auto">
            Inkfetish Publications builds books that look, feel, and stand like the work of a serious author. <br className="hidden md:block" />
            Not a hobby. Not a file. <span className="text-ink-900 font-bold uppercase tracking-widest text-xs relative inline-block">An identity.<span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gold" /></span>
          </p>

          <div className="flex flex-col items-center gap-4 mb-20 relative">
            <div className="absolute top-1/2 left-[-40px] w-12 h-[1px] bg-ink-900/10 hidden md:block" />
            <div className="absolute top-1/2 right-[-40px] w-12 h-[1px] bg-ink-900/10 hidden md:block" />
            
            <Link href="/contact" className="group relative">
               <div className="absolute inset-0 border border-gold translate-x-1.5 translate-y-1.5 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
               <button className="relative bg-ink-900 text-white font-sans uppercase tracking-[0.2em] py-5 px-8 md:py-6 md:px-10 text-[10px] md:text-xs font-black hover:bg-gold hover:text-ink-900 transition-all border border-ink-900 shadow-2xl flex items-center gap-4">
                 Book Your Free Publishing Call <MoveRight size={14} />
               </button>
            </Link>
            <p className="text-[8px] md:text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-ink-400 mt-2">
               No pressure. No packages thrown at you. Just a real conversation.
            </p>
          </div>

          {/* Micro-Proof Strip */}
          <div className="w-full relative py-8 flex flex-wrap justify-center items-center gap-x-8 gap-y-6">
             {/* Decorative top border */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-ink-900/20 to-transparent" />
             {[
               { icon: <ShieldCheck size={16} />, label: "Premium Publishing" },
               { icon: <Palette size={16} />, label: "Custom Cover Design" },
               { icon: <Star size={16} />, label: "Up to 100% Royalties" },
               { icon: <Layout size={16} />, label: "Real ISBN" },
               { icon: <Globe size={16} />, label: "Author Website" }
             ].map((stat, i) => (
               <div key={i} className="flex items-center gap-3 group">
                  <div className="text-gold opacity-60 group-hover:opacity-100 transition-opacity">{stat.icon}</div>
                  <span className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-ink-900">{stat.label}</span>
               </div>
             ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
