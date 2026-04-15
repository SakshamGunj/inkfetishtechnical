'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Feather } from 'lucide-react';

export function HomeEmotional() {
  return (
    <section className="py-32 md:py-48 bg-ink-900 text-white relative overflow-hidden">
      {/* Decorative large logo in background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none scale-150">
        <img src="/images/inkfetish_logo.png" alt="" className="w-full max-w-4xl invert" />
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
            
            <h4 className="text-4xl md:text-6xl lg:text-7xl font-serif font-black uppercase tracking-tighter italic leading-[1.1] mb-12">
              &quot;You Know Your Writing Is <br/>
              Good Enough. <span className="text-gold">You Just Haven&apos;t Proven It Yet.&quot;</span>
            </h4>

            <div className="space-y-8 text-lg md:text-xl text-white/70 font-sans font-light leading-relaxed max-w-2xl mx-auto">
               <p>There&apos;s a version of you that&apos;s already an author. That version has a book on a shelf. A name on a cover. A contest win in their bio.</p>
               <p>They didn&apos;t wait for permission. They didn&apos;t wait until their writing was &quot;perfect.&quot; They didn&apos;t wait until they felt ready.</p>
               <p className="text-white font-black italic tracking-tight text-2xl uppercase">&quot;They just decided.&quot;</p>
               <p>And then they found the right platform — one that would take their work seriously, design their book with care, and deliver it like it was always meant to exist.</p>
            </div>

            <div className="mt-16 text-xs font-sans font-black uppercase tracking-[0.5em] text-gold flex items-center gap-4">
               <span className="w-8 h-px bg-gold/30" /> THAT PLATFORM IS INKFETISH <span className="w-8 h-px bg-gold/30" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
