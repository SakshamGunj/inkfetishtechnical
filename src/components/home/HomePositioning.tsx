'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, Layers } from 'lucide-react';

const pillars = [
  {
    icon: <Sparkles className="w-8 h-8 text-gold" />,
    title: "Premium Publishing",
    desc: "From ISBN to royalties — we build books that look extraordinary."
  },
  {
    icon: <Trophy className="w-8 h-8 text-gold" />,
    title: "National Competitions",
    desc: "₹5,75,000+ given to writers across India. Real money. Real recognition."
  },
  {
    icon: <Layers className="w-8 h-8 text-gold" />,
    title: "Celebrated Anthologies",
    desc: "165+ writers in print. 48 books sold in 32 hours. Your name could be next."
  }
];

export function HomePositioning() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden border-y border-ink-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24 items-start">
          <div className="lg:col-span-12">
            <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">THE INKFETISH POSITION</h3>
            <h4 className="text-4xl md:text-6xl lg:text-7xl font-serif font-black uppercase tracking-tighter leading-none mb-4">
              &quot;We Are Not a <br/>
              <span className="italic font-light text-ink-600 block mt-2 lowercase">Publishing Company.&quot;</span>
            </h4>
            <p className="text-xl md:text-2xl text-ink-900 font-serif font-black uppercase tracking-widest leading-none mt-8">
              We are a publishing ecosystem — built for writers, by writers.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-10">
            <div className="space-y-6 text-lg text-ink-600 font-sans font-medium leading-relaxed max-w-2xl relative border-l-4 border-gold/20 pl-10">
               <p>Most publishing platforms take your manuscript. Format it quickly. Print a generic cover. And call it published.</p>
               <p className="text-ink-900 font-bold italic text-2xl tracking-tight">&quot;That&apos;s not publishing. That&apos;s printing.&quot;</p>
               <p>At Inkfetish, we believe your book should look like it belongs in a bookstore — because it does. We believe writing contests should feel like real competition. We believe anthologies should be something writers are proud to hold.</p>
               <p className="text-ink-900 font-black uppercase tracking-widest text-sm">This is not a platform. This is a standard.</p>
            </div>
          </div>
        </div>

        {/* 3 Pillars - Apple Style Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 pt-16 border-t border-ink-900/10">
          {pillars.map((pillar, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-start group"
            >
              <div className="w-16 h-16 rounded-full bg-[#FDFBF7] border border-ink-900/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                {pillar.icon}
              </div>
              <h5 className="text-xl font-serif font-black uppercase tracking-tighter mb-4">{pillar.title}</h5>
              <p className="text-xs text-ink-500 font-sans font-black uppercase tracking-[0.15em] leading-relaxed italic">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
