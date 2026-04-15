'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MoveRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export function PublishingPricing() {
  return (
    <section className="py-16 md:py-24 bg-[#FDFBF7] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-gold/5 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-12 mb-8 md:mb-12">
            <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">TRANSPARENT VALUE</h3>
            <h4 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black uppercase tracking-tighter leading-none mb-4">
              &quot;We Don&apos;t Believe in <br className="hidden md:block" />
              <span className="italic font-light text-ink-600 block mt-2 lowercase">One-Size Packages.&quot;</span>
            </h4>
            <p className="text-lg md:text-xl text-ink-900 font-serif font-black uppercase tracking-widest leading-none mt-6 italic">
              Your Book Is Not a Template — Your Package Shouldn&apos;t Be Either.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-8 max-w-2xl relative">
               <div className="bg-white/50 border border-gold/20 p-6 md:p-8 rounded-tr-3xl">
                 <p className="text-base md:text-lg text-ink-700 font-sans font-medium leading-relaxed">
                   <strong className="text-ink-900 absolute -top-3 left-6 bg-[#FDFBF7] px-2 text-xs uppercase tracking-widest italic font-serif">The Standard</strong>
                   <br/>Every book is different. Every author has different needs. We don&apos;t force you into a package that doesn&apos;t fit. We build your publishing plan around your book, your goals, and your budget.
                 </p>
               </div>
               
               <div className="bg-white p-8 md:p-10 border border-ink-900/5 shadow-xl space-y-8">
                  <h5 className="text-lg md:text-xl font-serif font-black uppercase tracking-tighter italic border-b border-ink-900/10 pb-4">What this means for you:</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                    {[
                      { title: "No Surprises.", desc: "Every cost is explained before you agree." },
                      { title: "No Pressure.", desc: "You pick what you need — nothing forced." },
                      { title: "Flexible Timeline.", desc: "Built for your budget and deadline." },
                      { title: "No Templates.", desc: "Everything custom to your specific book." }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col gap-2">
                         <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-gold shrink-0" />
                            <span className="text-xs font-sans font-black uppercase tracking-widest text-ink-900">{item.title}</span>
                         </div>
                         <p className="text-[10px] text-ink-500 font-sans font-bold uppercase tracking-widest leading-relaxed italic pl-6">{item.desc}</p>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-5">
             <div className="bg-ink-900 p-10 md:p-14 text-white relative group overflow-hidden shadow-2xl">
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 p-8 opacity-10">
                   <div className="text-[120px] font-serif font-black text-gold leading-none">₹</div>
                </div>
                <div className="absolute top-0 left-0 w-2 h-full bg-gold" />
                
                <h6 className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-gold mb-6 relative z-10">START HERE</h6>
                <p className="text-3xl md:text-4xl font-serif font-black uppercase tracking-tighter italic leading-none mb-8 relative z-10">
                   Book Your Call <br/>
                   Starts at <span className="text-gold">₹500.</span>
                </p>
                <div className="space-y-4 text-[10px] md:text-xs text-white/70 font-sans font-black uppercase tracking-[0.1em] leading-relaxed mb-10 relative z-10">
                   <p>That&apos;s your seat booking — it reserves your project slot, confirms commitment, and starts the craft.</p>
                   <p>In 30 minutes, you&apos;ll know exactly what your book needs and what it will cost. No guessing. No runaround.</p>
                </div>
                
                <Link href="/contact" className="group/btn block relative z-10">
                  <button className="w-full bg-gold text-ink-900 font-sans font-black uppercase tracking-[0.2em] py-6 px-8 text-[10px] md:text-xs hover:bg-white transition-all shadow-2xl flex items-center justify-center gap-4">
                    Book My Call Now <MoveRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                </Link>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
