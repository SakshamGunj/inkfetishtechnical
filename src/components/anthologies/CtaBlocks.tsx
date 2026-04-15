'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MoveRight, Zap } from 'lucide-react';
import Link from 'next/link';

export function InterstitialCta({ 
  headline, 
  subtext, 
  ctaText = "JOIN THE ANTHOLOGY NOW",
  urgencyText = "Limited spots. Don't miss this."
}: { 
  headline: string; 
  subtext: string; 
  ctaText?: string;
  urgencyText?: string;
}) {
  return (
    <section className="py-24 bg-[#FDFBF7] border-y border-ink-900/10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] text-ink-900" />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h4 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tighter mb-6 leading-none">
            {headline}
          </h4>
          <p className="text-[10px] md:text-xs text-ink-500 font-sans uppercase tracking-[0.3em] mb-12">
            {subtext}
          </p>

          <Link href="#active" className="group relative inline-block">
            {/* Offset Border for "Outstanding" effect */}
            <div className="absolute inset-0 border border-gold translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300" />
            
            <button className="relative bg-ink-900 text-white font-sans uppercase tracking-[0.2em] py-8 px-16 text-xs font-black hover:bg-gold hover:text-ink-900 transition-all border border-ink-900 shadow-2xl flex items-center gap-4">
              {ctaText}
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <Zap size={16} fill="currentColor" />
              </motion.div>
            </button>
          </Link>
        </motion.div>
        
        <p className="mt-12 text-[10px] font-sans font-black uppercase tracking-[0.3em] text-red-600 animate-pulse">
           ⏳ {urgencyText}
        </p>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="py-24 md:py-48 bg-[#FDFBF7] relative overflow-hidden border-t border-ink-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-black font-serif text-ink-900 leading-[0.8] tracking-tighter uppercase mb-12">
            This Is The Moment. <br/>
            <span className="italic font-light text-gold mt-4 block">Not Someday. Now.</span>
          </h2>

          <div className="max-w-xl mx-auto space-y-8 mb-16">
            <p className="text-base md:text-lg text-ink-600 font-sans font-medium leading-relaxed">
              You&apos;ve read this far. That means something. It means a part of you — the writer in you — is already saying yes.
            </p>
            <p className="text-xs text-ink-400 font-sans uppercase tracking-widest leading-relaxed">
              Don&apos;t let another month pass where your writing lives only on your phone. Don&apos;t let another year go by where you keep saying &quot;I&apos;ll do it soon.&quot; Do it now. We&apos;re waiting for you.
            </p>
          </div>

          <Link href="#active" className="group relative inline-block">
            <div className="absolute inset-0 border border-gold translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300" />
            
            <button className="relative bg-ink-900 text-white font-sans uppercase tracking-[0.2em] py-10 px-20 text-xs font-black hover:bg-gold hover:text-ink-900 transition-all border border-ink-900 shadow-2xl flex items-center gap-6">
              SECURE MY SPOT AS A PUBLISHED WRITER
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
                <MoveRight />
              </motion.div>
            </button>
          </Link>
          
          <p className="mt-12 text-[10px] font-sans font-black uppercase tracking-[0.4em] text-ink-400">
             Spots are filling. Deadline is May 30th. Click before it&apos;s too late.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export function FloatingBanner() {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl bg-white border border-ink-900 shadow-[0_20px_60px_rgba(0,0,0,0.1)] p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl bg-white/90">
       <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
             <Zap size={18} className="text-gold animate-pulse" />
          </div>
          <div>
             <p className="text-[10px] font-sans font-black uppercase tracking-widest text-ink-900">
                Right now, 12 writers are signing up.
             </p>
             <p className="text-[9px] font-sans text-ink-400 uppercase tracking-widest">
                Will you be one of them?
             </p>
          </div>
       </div>
       <Link href="#active">
          <button className="bg-ink-900 text-white font-sans uppercase tracking-[0.2em] py-3 px-8 text-[9px] font-black hover:bg-gold hover:text-ink-900 transition-all border border-ink-900">
             SUBMIT MY WRITING →
          </button>
       </Link>
    </div>
  );
}
