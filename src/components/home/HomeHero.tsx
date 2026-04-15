'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MoveRight, Star, Trophy, Layers, Zap } from 'lucide-react';
import Link from 'next/link';

export function HomeHero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-12 bg-[#FDFBF7]">
      {/* Editorial Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-home-hero" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-home-hero)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center text-center w-full max-w-5xl"
        >
          {/* Label */}
          <h2 className="text-[10px] font-sans uppercase tracking-[0.5em] text-gold font-black mb-12 flex items-center justify-center gap-6">
            <span className="w-12 h-px bg-gold/30" /> THE INKFETISH STANDARD <span className="w-12 h-px bg-gold/30" />
          </h2>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-serif text-ink-900 leading-[0.9] tracking-tighter uppercase mb-8">
            Where Writers <br/>
            <span className="italic font-light text-ink-600 block mt-2 lowercase">Become Authors.</span>
          </h1>

          <p className="text-xl md:text-2xl text-ink-900 max-w-3xl font-serif font-black uppercase tracking-widest leading-none mb-4 italic">
            Premium publishing. National writing contests. Celebrated anthologies.
          </p>
          
          <p className="text-base md:text-lg text-ink-600 font-sans font-medium leading-relaxed mb-12 max-w-2xl mx-auto">
            One brand that takes your craft as seriously as you do.
          </p>

          {/* Micro-Copy (Apple Style) */}
          <div className="mb-16 italic border-l-2 border-gold/20 pl-6 text-left max-w-sm mx-auto">
             <p className="text-sm text-ink-500 font-sans leading-relaxed">
               &quot;Publishing isn&apos;t a dream for the lucky few. It&apos;s a decision. We&apos;re here to help you make it.&quot;
             </p>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row gap-8 items-center mb-24 w-full justify-center">
            <Link href="/services" className="group relative w-full sm:w-auto">
               <div className="absolute inset-0 border border-gold translate-x-1.5 translate-y-1.5 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
               <button className="relative w-full bg-ink-900 text-white font-sans uppercase tracking-[0.2em] py-8 px-10 text-[10px] font-black hover:bg-gold hover:text-ink-900 transition-all border border-ink-900 shadow-2xl flex items-center justify-center gap-4">
                 Publish Your Book <MoveRight size={14} />
               </button>
            </Link>

            <Link href="/contests" className="group relative w-full sm:w-auto">
               <div className="absolute inset-0 border border-gold translate-x-1.5 translate-y-1.5 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
               <button className="relative w-full bg-[#FDFBF7] text-ink-900 font-sans uppercase tracking-[0.2em] py-8 px-10 text-[10px] font-black hover:bg-ink-900 hover:text-white transition-all border border-ink-900 flex items-center justify-center gap-4">
                 Join Live Contest <Zap size={14} className="text-gold" />
               </button>
            </Link>

            <Link href="/anthologies" className="group relative w-full sm:w-auto">
               <div className="absolute inset-0 border border-gold translate-x-1.5 translate-y-1.5 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
               <button className="relative w-full bg-[#FDFBF7] text-ink-900 font-sans uppercase tracking-[0.2em] py-8 px-10 text-[10px] font-black hover:bg-ink-900 hover:text-white transition-all border border-ink-900 flex items-center justify-center gap-4">
                 Explore Anthologies <Layers size={14} className="text-gold" />
               </button>
            </Link>
          </div>

          {/* Social Proof Bar */}
          <div className="w-full border-y border-ink-900/10 py-8 flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
             {[
               { label: "1,155+", sub: "Writers Competed" },
               { label: "₹5,75,000+", sub: "In Prizes" },
               { label: "3", sub: "Published Anthologies" },
               { label: "95%+", sub: "Satisfaction" }
             ].map((stat, i) => (
               <div key={i} className="flex flex-col items-center">
                  <span className="text-2xl font-serif font-black text-ink-900 italic tracking-tighter">{stat.label}</span>
                  <span className="text-[9px] font-sans font-black uppercase tracking-[0.2em] text-ink-400">{stat.sub}</span>
               </div>
             ))}
          </div>

        </motion.div>
      </div>

      {/* Decorative Editorial Element */}
      <div className="absolute bottom-12 left-12 hidden lg:flex flex-col gap-4 opacity-20">
         <div className="w-px h-24 bg-ink-900" />
         <div className="w-1 h-1 bg-ink-900 rounded-full" />
      </div>
    </section>
  );
}
