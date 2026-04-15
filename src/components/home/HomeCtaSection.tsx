'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';

interface CtaBlockProps {
  title: string;
  desc: string;
  ctaText: string;
  link: string;
}

export function HomeCtaSection({ title, desc, ctaText, link }: CtaBlockProps) {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-ink-900 p-12 md:p-24 text-center text-white relative overflow-hidden group"
        >
          {/* Decorative Pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center scale-150">
             <img src="/images/inkfetish_logo.png" alt="" className="w-full invert" />
          </div>

          <div className="relative z-10 w-full max-w-3xl mx-auto">
            <h4 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black uppercase tracking-tighter leading-none mb-8 italic">
              &quot;{title}&quot;
            </h4>
            <p className="text-base md:text-lg text-white/70 font-sans font-medium uppercase tracking-[0.2em] mb-12 italic">
              {desc}
            </p>
            <Link href={link} className="inline-block">
               <button className="bg-gold text-ink-900 font-sans font-black uppercase tracking-[0.3em] py-8 px-12 text-xs hover:bg-white transition-all shadow-2xl flex items-center gap-4">
                  {ctaText} <MoveRight size={16} />
               </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function HomeFooterCta() {
  return (
    <section className="py-24 md:py-32 bg-[#FDFBF7] text-center border-t border-ink-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h4 className="text-4xl md:text-6xl lg:text-7xl font-serif font-black uppercase tracking-tighter leading-none mb-8">
           &quot;Your Writing Has <br/>
           <span className="italic font-light text-ink-600 block mt-2 lowercase">a Home Here.&quot;</span>
        </h4>
        <p className="text-lg md:text-xl text-ink-600 font-sans font-medium uppercase tracking-[0.2em] mb-16 italic max-w-2xl mx-auto">
           Premium publishing. National contests. Celebrated anthologies. Built for writers who are done waiting.
        </p>

        <Link href="/services" className="group relative inline-block">
           <div className="absolute inset-0 border border-gold translate-x-1.5 translate-y-1.5 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
           <button className="relative bg-ink-900 text-white font-sans uppercase tracking-[0.2em] py-8 px-12 text-xs font-black hover:bg-gold hover:text-ink-900 transition-all border border-ink-900 shadow-2xl">
              Get Started Today
           </button>
        </Link>

        <div className="mt-24 pt-12 border-t border-ink-900/5">
           <p className="text-[10px] font-sans font-black uppercase tracking-[0.5em] text-ink-300">
             Inkfetish Publications · Where Writers Become Authors
           </p>
        </div>
      </div>
    </section>
  );
}
