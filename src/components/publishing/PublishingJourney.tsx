'use client';

import React from 'react';
import { motion } from 'framer-motion';

const stages = [
  {
    num: "01",
    label: "STAGE 1 — THE CONVERSATION",
    title: "Tell us about your book. Not the pages — the idea.",
    desc: "We start with a call. Not a form. Not a package selection. A real conversation about what you wrote, who it's for, and what you want it to mean in the world."
  },
  {
    num: "02",
    label: "STAGE 2 — THE CRAFT",
    title: "We treat your manuscript like it matters.",
    desc: "Professional editing. Not a spell-check. A real editor reads your work, strengthens your structure, sharpens your sentences, and preserves your voice."
  },
  {
    num: "03",
    label: "STAGE 3 — THE DESIGN",
    title: "Your cover is not decoration. It is your first impression.",
    desc: "We design covers from scratch. Original concept. Intentional typography. Visual identity that belongs to your book and nothing else. No AI generation. No stock photo mashups."
  },
  {
    num: "04",
    label: "STAGE 4 — THE BUILD",
    title: "ISBN. Listing. Author Website. Distribution.",
    desc: "Your book gets its international identity registered properly in your name. It goes live on Amazon and Flipkart. Your author website goes up — clean and professional."
  },
  {
    num: "05",
    label: "STAGE 5 — THE AUTHOR",
    title: "You get an author identity.",
    desc: "When we're done, you're not someone who 'self-published.' You're a published author — with a book that looks the part and a presence that commands respect."
  }
];

export function PublishingJourney() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden border-b border-ink-900/10">
      {/* Visual Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold/5 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 md:mb-24 text-center">
          <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">WHAT THE JOURNEY LOOKS LIKE</h3>
          <h4 className="text-2xl md:text-4xl lg:text-5xl font-serif font-black uppercase tracking-tighter leading-none mb-6">
            &quot;From the Idea Still in Your Head to <br className="hidden md:block" />
            <span className="italic font-light text-ink-600 block mt-2 lowercase">the Book in a Reader&apos;s Hands.&quot;</span>
          </h4>
        </div>

        <div className="space-y-12 md:space-y-16">
          {stages.map((stage, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-6 md:gap-12 group"
            >
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 md:w-16 md:h-16 flex items-center justify-center border border-ink-900/10 rounded-full bg-[#FDFBF7] group-hover:bg-gold group-hover:border-gold group-hover:text-ink-900 transition-all duration-300 z-10">
                   <div className="text-sm md:text-xl font-serif font-black text-ink-900/30 group-hover:text-ink-900 transition-colors italic tracking-tighter uppercase leading-none">
                     {stage.num}
                   </div>
                </div>
                <div className="w-px h-full bg-ink-900/10 group-hover:bg-gold/50 transition-colors -my-2 group-last:hidden" />
              </div>

              <div className="pb-12 md:pb-16 flex-grow">
                <h5 className="text-[10px] font-sans font-black uppercase tracking-[0.3em] text-ink-400 mb-3">{stage.label}</h5>
                <h6 className="text-lg md:text-2xl font-serif font-black uppercase tracking-tighter mb-4 italic leading-tight">{stage.title}</h6>
                <p className="text-xs md:text-sm text-ink-600 font-sans font-medium leading-relaxed italic max-w-xl">
                  {stage.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
