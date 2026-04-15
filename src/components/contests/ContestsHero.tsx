'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, MoveRight, Star, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export function ContestsHero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-24 pb-12 bg-[#FDFBF7]">
      {/* Decorative Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-contests-hero" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-contests-hero)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center text-center w-full max-w-5xl mx-auto"
        >
          {/* Label */}
          <h2 className="text-[10px] font-sans font-black uppercase tracking-[0.5em] text-gold mb-10 flex items-center justify-center gap-6">
            <span className="w-12 h-px bg-gold/30" /> WRITING CONTESTS 2026 <span className="w-12 h-px bg-gold/30" />
          </h2>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-serif text-ink-900 leading-[0.9] tracking-tighter uppercase mb-8">
            India&apos;s Fastest-Growing <br/>
            <span className="block text-gold mt-2">Writing Contest Platform.</span>
          </h1>

          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-xl md:text-2xl text-ink-900 font-serif font-black uppercase tracking-tight leading-none italic mb-8">
              ₹5,75,000+ Given Away. Thousands of Writers Recognized.
            </p>
            
            <p className="text-base md:text-lg text-ink-600 font-sans font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
              Fair contests. Real prizes. Genuine recognition. From ₹50,000 in 2024 to ₹1,50,000 in 2026 — Inkfetish contests are built to celebrate every writer who dares to compete.
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-16 px-8 py-10 border-l-4 border-gold/30 bg-ink-900/[0.02] backdrop-blur-sm relative group">
             <div className="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:opacity-10 transition-opacity">
                <Trophy size={60} />
             </div>
             <p className="text-sm md:text-base text-ink-600 font-sans font-medium leading-relaxed italic text-left">
              &quot;Most writing contests ask you to submit and forget. You never hear back. The judging is a mystery. The prizes never reach you. It feels like your words just disappeared into a void.<br/><br/>
              <span className="text-ink-900 font-black not-italic uppercase tracking-tight">Inkfetish contests are different.</span> Here, you submit — and something actually happens.&quot;
            </p>
          </div>

          {/* Action Area */}
          <div className="flex flex-col sm:flex-row gap-8 items-center mb-20 relative">
            <Link href="#live" className="group relative">
              {/* Offset Border */}
              <div className="absolute inset-0 border border-gold translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300" />
              
              <button className="relative bg-ink-900 text-white font-sans uppercase tracking-[0.2em] py-8 px-16 text-xs font-black hover:bg-gold hover:text-ink-900 transition-all border border-ink-900 shadow-2xl flex items-center gap-4">
                JOIN THE LIVE CONTEST NOW
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  <MoveRight />
                </motion.div>
              </button>
            </Link>

            <Link href="#hall-of-fame" className="text-[10px] font-sans font-black uppercase tracking-[0.3em] text-ink-400 hover:text-gold transition-colors flex items-center gap-2 group border-b border-transparent hover:border-gold pb-1">
              See All Past Contests & Results <ChevronDown size={14} className="group-hover:translate-y-1 transition-transform" />
            </Link>
          </div>

          {/* Credibility Strip */}
          <div className="w-full bg-ink-900 py-6 px-4 md:px-8 flex flex-wrap justify-center items-center gap-x-8 md:gap-x-12 gap-y-4">
             {[
               { icon: <Trophy size={14} className="text-gold" />, text: "₹5,75,000+ Total Prize Money Given" },
               { icon: <Star size={14} className="text-gold" />, text: "1,155+ Writers Competed" },
               { icon: <Trophy size={14} className="text-gold" />, text: "4 Successful Contests" },
               { icon: <Star size={14} className="text-gold" />, text: "95%+ Satisfaction Rate" },
             ].map((item, i) => (
               <div key={i} className="flex items-center gap-3 whitespace-nowrap">
                  {item.icon}
                  <span className="text-[8px] md:text-[10px] font-sans font-black uppercase tracking-widest text-white/80">{item.text}</span>
               </div>
             ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
