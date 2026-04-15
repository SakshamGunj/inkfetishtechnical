'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MoveRight, Medal, Trophy, Star } from 'lucide-react';
import Link from 'next/link';

export function HomeContestHighlight() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden border-b border-ink-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div>
              <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">WHERE INDIAN WRITERS COMPETE</h3>
              <h4 className="text-4xl md:text-6xl font-serif font-black uppercase tracking-tighter leading-none mb-12">
                &quot;₹5,75,000 Given. <br/>
                <span className="italic font-light text-ink-600 block mt-2 lowercase">Thousands Recognized.&quot;</span>
              </h4>
              
              <div className="space-y-8 text-lg text-ink-600 font-sans font-medium leading-relaxed mb-12 max-w-xl">
                 <p>We built our first contest in 2024 because Indian writers deserved a competition that took them seriously.</p>
                 <div className="flex flex-wrap gap-4 py-4">
                    {[120, 255, 230, 550].map((num, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Star size={10} className="text-gold" />
                        <span className="text-sm font-sans font-black text-ink-900 italic tracking-tighter">{num} Writers</span>
                      </div>
                    ))}
                 </div>
                 <p>By Indian Writers League Season 1, we weren&apos;t just running a contest — we were running a movement. ₹1,50,000 in prizes. Physical kits. Medals. Letters. For writers who just a year ago were writing only for themselves.</p>
                 <p className="text-ink-900 font-black uppercase tracking-widest text-sm border-l-2 border-gold pl-4">Season 2 is coming. Don&apos;t sit this one out.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-8">
                 <Link href="/contests" className="group">
                    <button className="bg-ink-900 text-white font-sans uppercase tracking-[0.2em] py-8 px-10 text-[10px] font-black hover:bg-gold hover:text-ink-900 transition-all border border-ink-900 shadow-2xl flex items-center gap-4">
                       View All Contests <MoveRight size={14} />
                    </button>
                 </Link>
                 <Link href="/contests#live" className="group">
                    <button className="bg-white text-ink-900 font-sans uppercase tracking-[0.2em] py-8 px-10 text-[10px] font-black hover:bg-ink-900 hover:text-white transition-all border border-ink-900 flex items-center gap-4">
                       Join Live Contest <Trophy size={14} className="text-gold" />
                    </button>
                 </Link>
              </div>
           </div>

           <div className="relative">
              <div className="aspect-square bg-[#FDFBF7] p-12 md:p-20 border border-ink-900/5 shadow-2xl relative group overflow-hidden">
                 <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12">
                    <Medal size={300} />
                 </div>
                 <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                    <div className="text-[120px] md:text-[180px] font-serif font-black text-ink-900 italic tracking-tighter leading-none mb-4 group-hover:scale-105 transition-transform duration-1000 uppercase">IWL</div>
                    <div className="text-sm md:text-base font-sans font-black uppercase tracking-[0.5em] text-gold">Indian Writers League</div>
                    <div className="mt-8 pt-8 border-t border-ink-900/10 w-full flex justify-center gap-12">
                       <div>
                          <p className="text-2xl font-serif font-black text-ink-900 italic tracking-tighter leading-none mb-1">₹1.5L</p>
                          <p className="text-[9px] font-sans font-black uppercase tracking-widest text-ink-400">Prize Pool</p>
                       </div>
                       <div>
                          <p className="text-2xl font-serif font-black text-ink-900 italic tracking-tighter leading-none mb-1">550+</p>
                          <p className="text-[9px] font-sans font-black uppercase tracking-widest text-ink-400">Participants</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
