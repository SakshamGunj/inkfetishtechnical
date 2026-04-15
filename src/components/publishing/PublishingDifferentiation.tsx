'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Library, Eye, Users, ShieldCheck } from 'lucide-react';

export function PublishingDifferentiation() {
  return (
    <section className="py-16 md:py-24 bg-[#FDFBF7] relative overflow-hidden">
      {/* Decorative Grid SVG */}
      <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotGridDiff" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotGridDiff)"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-16 items-start">
          <div className="lg:col-span-12">
            <div className="w-12 h-px bg-gold mb-6" />
            <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">THE UNCOMFORTABLE TRUTH</h3>
            <h4 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black uppercase tracking-tighter leading-[1] mb-6">
              &quot;Most Publishers Are in the <br className="hidden lg:block"/>
              Business of Printing. <span className="italic font-light text-ink-600 block mt-2 lowercase truncate md:overflow-visible">We Are in the Business of Building Authors.&quot;</span>
            </h4>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h5 className="text-ink-900 font-black uppercase tracking-widest text-xs italic mb-4">Let&apos;s say this plainly:</h5>
            <div className="space-y-4 text-sm md:text-base text-ink-600 font-sans font-medium leading-relaxed">
               
               <div className="flex items-start gap-4">
                  <div className="w-4 h-4 rounded-full border border-red-500/30 flex items-center justify-center shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  </div>
                  <p>Most publishing companies in India operate on volume. Your book is not a priority — it&apos;s a file in a queue.</p>
               </div>

               <div className="flex items-start gap-4">
                  <div className="w-4 h-4 rounded-full border border-red-500/30 flex items-center justify-center shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  </div>
                  <p>It gets a template cover from a shared library. It gets listed on Amazon with a description nobody proofread.</p>
               </div>

            </div>
            
            <div className="mt-8 border-l-2 border-ink-900 pl-6 py-2">
               <p className="text-ink-900 font-bold italic text-lg md:text-xl tracking-tight leading-snug">
                  &quot;They move on to the next author. You&apos;re left with a book that carries your name — and looks exactly like every other forgettable book on the market.&quot;
               </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-8 relative">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold/10 rounded-full blur-xl hidden md:block" />
            <div className="bg-white p-8 md:p-12 border border-ink-900/5 shadow-xl relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 transition-transform duration-700 group-hover:scale-110">
                 <ShieldCheck size={64} className="text-gold" />
              </div>
              <h5 className="text-xl md:text-2xl font-serif font-black uppercase tracking-tighter mb-6 italic">At Inkfetish, We refuse to work that way.</h5>
              <div className="space-y-4 text-xs text-ink-500 font-sans font-black uppercase tracking-[0.1em] leading-relaxed relative z-10">
                 <p>We take a limited number of publishing projects at a time because quality demands attention.</p>
                 <p className="text-ink-900">Your cover is designed specifically for your story — not chosen from a template folder. Your manuscript is edited by someone who actually reads it.</p>
                 <div className="pt-6 border-t border-ink-900/10 mt-6 !mb-0">
                    <p className="text-gold tracking-[0.3em] font-sans font-black flex items-center gap-2"><span className="w-4 h-px bg-gold" /> THIS IS THE STANDARD.</p>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Branding Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
           <div className="bg-white p-8 border border-ink-900/5 flex items-start gap-6 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-red-500/20 group-hover:bg-red-500 transition-colors" />
              <div className="w-10 h-10 bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                 <Library size={18} strokeWidth={1.5} />
              </div>
              <div>
                 <h6 className="text-[10px] font-sans font-black uppercase tracking-[0.3em] text-red-500 mb-3 italic">PRINTERS (Volume-Based)</h6>
                 <p className="text-sm md:text-base text-ink-900 font-serif font-medium italic tracking-tight leading-relaxed">Template covers. Automated formatting. No real eyes on the manuscript. High volume, low attention.</p>
              </div>
           </div>
           <div className="bg-white p-8 border border-gold/40 flex items-start gap-6 shadow-lg relative overflow-hidden group hover:border-gold transition-colors">
              <div className="absolute top-0 left-0 w-1 h-full bg-gold" />
              <div className="w-10 h-10 bg-gold/10 text-gold flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-ink-900 transition-colors">
                 <Users size={18} strokeWidth={1.5} />
              </div>
              <div>
                <h6 className="text-[10px] font-sans font-black uppercase tracking-[0.3em] text-gold mb-3 italic">FOUNDERS (Attention-Based)</h6>
                <p className="text-sm md:text-base text-ink-900 font-serif font-bold italic tracking-tight leading-relaxed">Custom design. Manual editorial intervention. Brand strategy. Low volume, deep focus.</p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
