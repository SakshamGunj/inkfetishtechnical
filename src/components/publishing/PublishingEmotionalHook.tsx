'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MoveRight, Zap } from 'lucide-react';
import Link from 'next/link';

export function PublishingEmotionalHook() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden border-y border-ink-900/10">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#FDFBF7] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-12 mb-8 md:mb-12 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gold/50 -mt-16 hidden md:block" />
            <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-8 text-center flex items-center justify-center gap-4">
              <span className="w-8 h-px bg-gold/50" /> THE AWAKENING <span className="w-8 h-px bg-gold/50" />
            </h3>
            <h4 className="text-2xl md:text-4xl lg:text-5xl font-serif font-black uppercase tracking-tighter leading-[1.1] text-center max-w-4xl mx-auto">
              &quot;You Already Know What a Cheap Book Looks Like. You&apos;ve Seen It. <br className="hidden lg:block"/>
              <span className="italic font-light text-ink-600 block mt-2 lowercase">You&apos;ve Felt That Quiet Embarrassment.&quot;</span>
            </h4>
          </div>

          <div className="lg:col-span-7 lg:col-start-2 space-y-6 relative z-10">
             
             <div className="bg-[#FDFBF7] p-6 border-l-2 border-gold/30">
               <p className="text-sm md:text-base text-ink-600 font-sans font-medium leading-relaxed">
                 You wrote your book at midnight when everyone else was asleep. You rewrote paragraphs five times because the words didn&apos;t feel right yet. You carried this story in your head for months before a single sentence made it to paper.
               </p>
             </div>

             <div className="bg-white border border-ink-900/5 p-6 shadow-sm">
               <p className="text-sm md:text-base text-ink-600 font-sans font-medium leading-relaxed">
                 And then, somewhere between finishing your manuscript and wanting to publish it, you started looking at other publishers. You saw the template covers. The rushed formatting.
               </p>
             </div>

             <div className="my-8">
               <p className="text-ink-900 font-black italic text-xl md:text-3xl tracking-tight leading-tight uppercase py-2 border-l-4 border-ink-900 pl-6">
                  &quot;Is this what my book is going to look like?&quot;
               </p>
             </div>
             
             <div className="bg-[#FDFBF7] p-6">
               <p className="text-sm md:text-base text-ink-600 font-sans font-medium">
                 A cover made in 20 minutes. A generic font. An author page that looks like a form. That quiet dread you felt? <span className="text-ink-900 font-bold underline decoration-gold decoration-2 underline-offset-4 block mt-2">That&apos;s the most important thing you need to listen to.</span>
               </p>
             </div>

          </div>

          <div className="lg:col-span-3 space-y-8 relative z-10">
             <div className="bg-[#FDFBF7] p-8 border border-ink-900/10 shadow-xl relative group hover:border-gold/50 transition-colors">
                <div className="absolute -top-3 -left-3 bg-ink-900 text-gold w-8 h-8 flex items-center justify-center font-serif italic text-lg font-black shadow-md border border-gold/20">!</div>
                <p className="text-sm text-ink-900 font-sans font-black uppercase tracking-widest leading-relaxed mb-8 italic">
                   &quot;Because that dread is protecting your reputation. It&apos;s telling you that your book deserves more than that.&quot;
                </p>
                <p className="text-xs text-ink-500 font-sans font-medium leading-relaxed">
                   You&apos;ve worked too hard, for too long, to be just another title that someone scrolls past and forgets.
                </p>
                <div className="mt-10 pt-10 border-t border-ink-900/10">
                   <Link href="/contact" className="group flex items-center gap-4 text-[10px] font-sans font-black uppercase tracking-[0.3em] text-ink-900">
                      Talk To Us — No Pressure <MoveRight size={14} className="text-gold group-hover:translate-x-2 transition-transform" />
                   </Link>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
