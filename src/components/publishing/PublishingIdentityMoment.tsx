'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';

export function PublishingIdentityMoment() {
  return (
    <section className="py-20 md:py-32 bg-ink-900 text-white relative overflow-hidden">
      {/* Decorative large text in background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <div className="text-[120px] md:text-[250px] font-serif font-black italic transform -rotate-12 translate-x-10 md:translate-x-20">PRIDE</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-px bg-gold mb-12" />
            
            <h4 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black uppercase tracking-tighter italic leading-[1.1] mb-12">
              &quot;The Moment You Hold Your Book — <br className="hidden md:block" />
              <span className="text-gold mt-2 block">Everything Changes.&quot;</span>
            </h4>

            <div className="w-full max-w-3xl mx-auto space-y-8 relative z-10 text-left">
               <div className="border-l-4 border-gold/50 pl-6 md:pl-8 py-2">
                 <p className="text-base md:text-lg text-white/80 font-sans font-light leading-relaxed">
                   There is a specific moment every author describes the same way. It&apos;s the moment the book arrives. The weight of it. The texture of the cover under your fingertips. Your name — in print — on the spine.
                 </p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="bg-white/5 p-6 border border-white/10">
                    <p className="text-sm font-sans font-medium text-white/60 italic leading-relaxed">
                      &quot;Writers who have experienced that moment say the same things: &apos;I sat with it for a while before I could open it.&apos; &apos;I didn&apos;t expect to cry.&apos;&quot;
                    </p>
                 </div>
                 <div className="bg-white/5 p-6 border border-white/10 flex items-center justify-center">
                    <p className="text-white font-black italic tracking-tight text-xl md:text-2xl uppercase relative inline-block text-center">
                      <span className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 w-2 h-px bg-gold" />
                      &quot;That moment is real.&quot;
                      <span className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 w-2 h-px bg-gold" />
                    </p>
                 </div>
               </div>

               <div className="pt-6 border-t border-white/10">
                 <p className="text-base md:text-lg text-white/80 font-sans font-light leading-relaxed mb-6">
                   But here&apos;s what nobody tells you: That moment changes based on what you&apos;re holding. If the cover looks cheap, the moment feels hollow. We remove that question mark completely.
                 </p>
                 <p className="text-gold font-black uppercase tracking-widest text-sm text-center md:text-left bg-gold/10 inline-block px-6 py-3 border border-gold/20">
                   When you hold a book we&apos;ve made for you, the only thing you feel is pure, absolute pride.
                 </p>
               </div>
            </div>

            <div className="mt-20">
              <Link href="/contact" className="group relative inline-block">
                 <div className="absolute inset-0 border border-gold translate-x-1.5 translate-y-1.5 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                 <button className="relative bg-white text-ink-900 font-sans uppercase tracking-[0.2em] py-8 px-12 text-xs font-black hover:bg-gold hover:text-ink-900 transition-all border border-ink-900 shadow-2xl flex items-center gap-4">
                   I Want to Feel That. Let&apos;s Talk. <MoveRight size={14} />
                 </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
