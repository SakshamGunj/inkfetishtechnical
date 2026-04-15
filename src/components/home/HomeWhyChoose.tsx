'use client';

import React from 'react';
import { motion } from 'framer-motion';

const reasons = [
  {
    num: "01",
    title: "We don't cut corners on quality.",
    desc: "Every cover, layout, and print run is reviewed for quality. Your book will not look like it was made in 10 minutes."
  },
  {
    num: "02",
    title: "We are transparent about everything.",
    desc: "Pricing. Judging. Royalties. Timelines. No fine print. No surprise fees. No 'we'll get back to you'."
  },
  {
    num: "03",
    title: "We actually deliver.",
    desc: "98%+ delivery rate. Every prize paid. Every kit shipped. Every certificate sent. This is documented. This is real."
  },
  {
    num: "04",
    title: "We treat writers like professionals.",
    desc: "Not clients. Not customers. Writers. People with something to say and the discipline to say it."
  },
  {
    num: "05",
    title: "We offer a full ecosystem.",
    desc: "Publish. Compete. Be anthologized. Build your author brand. One platform. One community. Multiple ways to grow."
  },
  {
    num: "06",
    title: "We grow with you.",
    desc: "Your first book won't be your last. Your first contest won't be your last entry. We're building a relationship."
  }
];

export function HomeWhyChoose() {
  return (
    <section className="py-24 md:py-32 bg-[#FDFBF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">WHY SERIOUS WRITERS CHOOSE US</h3>
          <h4 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black uppercase tracking-tighter leading-none mb-4">
            &quot;A Different Kind of <br/>
            <span className="italic font-light text-ink-600 block mt-2 lowercase">Publishing Standard.&quot;</span>
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {reasons.map((reason, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="group p-12 md:p-16 border border-ink-900/5 hover:border-gold/30 hover:bg-white transition-all duration-700 flex flex-col"
            >
              <div className="text-4xl md:text-5xl font-serif font-black text-ink-900/10 group-hover:text-gold transition-colors duration-500 mb-8 italic tracking-tighter uppercase whitespace-nowrap">
                {reason.num}
              </div>
              <h5 className="text-xl font-serif font-black uppercase tracking-tighter mb-4 leading-tight group-hover:text-ink-900 transition-colors">
                {reason.title}
              </h5>
              <p className="text-[10px] text-ink-500 font-sans font-black uppercase tracking-[0.15em] leading-relaxed italic">
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
