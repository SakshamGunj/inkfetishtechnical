'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MoveRight, Zap } from 'lucide-react';
import Link from 'next/link';

const anthologies = [
  {
    title: "Petals and Scars",
    desc: "Our first masterpiece. 48 copies sold in the first 32 hours. Writers held it and cried.",
    image: "/images/petals_scars_1.jpg",
    meta: "Published 2024"
  },
  {
    title: "Shakespeare & What Remained",
    desc: "A poetry anthology born from fierce competition. The kind of book that makes you sit quietly.",
    image: "/images/shakespeare_front_cover_with_bg.jpg",
    meta: "Published 2025"
  },
  {
    title: "Love at Minus One",
    desc: "165 writers. 165 ways to write about love. One book that captured all of it.",
    image: "/images/love-at-minus-one-cover.jpg",
    meta: "Published 2025"
  }
];

export function HomeAnthologyHighlight() {
  return (
    <section className="py-24 md:py-32 bg-[#FDFBF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24 items-end">
           <div className="lg:col-span-8">
              <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">STORIES THAT FOUND A HOME</h3>
              <h4 className="text-3xl md:text-5xl lg:text-7xl font-serif font-black uppercase tracking-tighter leading-none mb-4">
                &quot;165+ Writers Decided Their <br/>
                <span className="italic font-light text-ink-600 block mt-2 lowercase">Words Deserved a Page.&quot;</span>
              </h4>
           </div>
           <div className="lg:col-span-4">
              <p className="text-base text-ink-600 font-sans italic border-l-4 border-gold/20 pl-6 mb-8">
                &quot;What if Indian writers had a real anthology — not a PDF, but an actual, beautiful, printed book with their name inside it?&quot;
              </p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          {anthologies.map((book, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col group"
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-8 border border-ink-900/10 shadow-xl group-hover:shadow-2xl transition-all duration-700">
                <img 
                  src={book.image} 
                  alt={book.title} 
                  className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                />
                <div className="absolute inset-x-0 bottom-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-ink-900/90 backdrop-blur-md">
                   <p className="text-[9px] font-sans text-gold font-black uppercase tracking-widest leading-none mb-2">{book.meta}</p>
                   <h5 className="text-xl font-serif font-black text-white italic tracking-tighter uppercase">{book.title}</h5>
                </div>
              </div>
              <p className="text-xs text-ink-500 font-sans font-black uppercase tracking-[0.1em] leading-relaxed italic mb-4">
                {book.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-8 justify-center">
           <Link href="/anthologies" className="group">
              <button className="bg-ink-900 text-white font-sans uppercase tracking-[0.2em] py-8 px-10 text-[10px] font-black hover:bg-gold hover:text-ink-900 transition-all border border-ink-900 shadow-2xl flex items-center gap-4">
                 See Our Anthologies <MoveRight size={14} />
              </button>
           </Link>
           <Link href="/contests" className="group">
              <button className="bg-[#FDFBF7] text-ink-900 font-sans uppercase tracking-[0.2em] py-8 px-10 text-[10px] font-black hover:bg-ink-900 hover:text-white transition-all border border-ink-900 flex items-center gap-4">
                 Join the Next Anthology <Zap size={14} className="text-gold" />
              </button>
           </Link>
        </div>
      </div>
    </section>
  );
}
