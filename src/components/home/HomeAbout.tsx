'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Feather } from 'lucide-react';

export function HomeAbout() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden border-y border-ink-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
           <div className="lg:col-span-5">
              <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">ABOUT INKFETISH</h3>
              <h4 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tighter leading-none mb-12">
                &quot;Tired of Watching <br/>
                <span className="italic font-light text-ink-600 block mt-2 lowercase">Good Writers Get Bad Deals.&quot;</span>
              </h4>
              
              <div className="w-24 h-24 bg-[#FDFBF7] border border-ink-900/10 flex items-center justify-center rounded-full mb-12 opacity-50">
                 <Feather size={32} className="text-ink-900" strokeWidth={1} />
              </div>
           </div>

           <div className="lg:col-span-7">
              <div className="space-y-8 text-lg text-ink-600 font-sans font-medium leading-relaxed mb-16">
                 <p>Inkfetish Publications was built by people who love writing — and who got frustrated watching talented Indian writers settle for low-quality publishers, forgotten contest submissions, and platforms that treated their work like a form to be processed.</p>
                 <p>We started small. One poetry contest. 120 writers. A ₹50,000 prize pool. A promise. We kept it.</p>
                 <p>Three anthologies later. Four contests. 1,155+ writers. ₹5,75,000+ paid out. Books printed, shipped, held.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-ink-900/10">
                 <div>
                    <h5 className="text-[10px] font-sans font-black uppercase tracking-[0.3em] text-ink-900 mb-4">OUR MISSION</h5>
                    <p className="text-xs text-ink-500 font-sans font-black uppercase tracking-[0.1em] leading-relaxed italic">Make it possible for every serious Indian writer to publish well, compete fairly, and be recognized genuinely.</p>
                 </div>
                 <div>
                    <h5 className="text-[10px] font-sans font-black uppercase tracking-[0.3em] text-ink-900 mb-4">OUR STANDARD</h5>
                    <p className="text-xs text-ink-500 font-sans font-black uppercase tracking-[0.1em] leading-relaxed italic">If we wouldn&apos;t be proud of it, we don&apos;t publish it.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
