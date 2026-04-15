'use client';

import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: "₹5,75,000+", label: "Total Prize Money", sub: "Given Away To Indian Writers" },
  { value: "1,155+", label: "Writers Competed", sub: "Across All Our Contests" },
  { value: "165+", label: "Anthology Writers", sub: "Published in Our Anthologies" },
  { value: "48", label: "Books Sold", sub: "In Just 32 Hours" }
];

const timeline = [
  { year: "2024", event: "We started with a poetry contest. 120 writers. ₹50,000 prize pool." },
  { year: "2025", event: "We ran three events. 715+ writers. ₹2,25,000 in prizes." },
  { year: "2026", event: "Indian Writers League Season 1. 550+ writers. ₹1,50,000. Medals, kits, letters." },
  { year: "2027", event: "What comes next is bigger. And you're invited." }
];

export function HomeStats() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">THE PROOF</h3>
          <h4 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black uppercase tracking-tighter leading-none mb-6">
            &quot;The Numbers Don&apos;t Lie.&quot;
          </h4>
          <p className="text-lg text-ink-600 font-sans max-w-2xl mx-auto italic">
            Built slowly. Delivered consistently. Trusted completely.
          </p>
        </div>

        {/* Big Stat Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16 mb-32">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="text-4xl md:text-6xl font-serif font-black text-ink-900 mb-4 group-hover:text-gold transition-colors duration-500 italic tracking-tighter">
                {stat.value}
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-ink-900 leading-none">{stat.label}</div>
                <div className="text-[9px] font-sans text-ink-400 uppercase tracking-widest leading-relaxed mt-2">{stat.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mb-32 text-center py-12 border-y border-ink-900/10">
           <p className="text-xl md:text-2xl font-serif font-black text-ink-900 uppercase italic tracking-tighter leading-tight">
             &quot;These aren&apos;t marketing numbers. Every rupee was paid. Every book was shipped. Every name was printed.&quot;
           </p>
        </div>

        {/* Growth Story Timeline */}
        <div className="relative">
          <div className="absolute top-0 left-0 w-px h-full bg-ink-900/5 hidden md:block md:left-1/2" />
          
          <div className="space-y-16 md:space-y-24">
            {timeline.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:text-right' : 'md:flex-row-reverse md:text-left'}`}
              >
                {/* Year Marker */}
                <div className="md:w-1/2 flex flex-col justify-center">
                  <div className="text-4xl md:text-7xl font-serif font-black text-ink-900/10 group-hover:text-gold/20 transition-colors uppercase italic tracking-tighter leading-none mb-4">{item.year}</div>
                </div>

                {/* Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-gold rounded-full z-10 hidden md:block" />

                <div className="md:w-1/2 flex flex-col justify-center p-8 bg-[#FDFBF7] border border-ink-900/5 shadow-sm">
                   <p className="text-xs md:text-sm font-sans font-black uppercase tracking-widest text-ink-900 leading-relaxed italic">
                      {item.event}
                   </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
