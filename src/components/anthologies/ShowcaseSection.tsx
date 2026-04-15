'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Book, Users, Zap, Gift } from 'lucide-react';

const showcasedBooks = [
  {
    id: 'petals-scars',
    tag: 'ANTHOLOGY #1',
    title: 'Petals and Scars',
    subtitle: 'The story of our very first book',
    story: "It was our first attempt. We had no blueprint. No rulebook. No guarantee it would work. We launched it after the September Writing Competition 2025 and the Authorverse Summit 2025 — two events that brought real, passionate writers together.",
    impact: "And then something happened that surprised even us. 48 copies sold in just 32 hours. Not 32 days. Not 32 weeks. 32 hours.",
    takeaway: "Petals and Scars wasn't just a book. It was proof. Proof that Indian writers are ready. Proof that there's an audience for their voices.",
    image: '/images/petals_scars_1.jpg'
  },
  {
    id: 'shakespeare',
    tag: 'ANTHOLOGY #2',
    title: 'Shakespeare & What Remained',
    subtitle: 'The anthology that built our credibility',
    story: "Named after the Shakespeare Poetry Award 2025, this anthology brought together some of the most beautiful poetry we had ever read. The writers who participated in this competition came with fire in their words.",
    impact: "And this anthology captured that fire — permanently. Shakespeare & What Remained became the book that told the world: Inkfetish is serious. Inkfetish is credible. Inkfetish is here to stay.",
    takeaway: "It was the moment we stopped being 'a new brand' and became 'a trusted name.'",
    image: '/images/shakespeare_front_cover.jpg'
  },
  {
    id: 'love-minus-one',
    tag: 'ANTHOLOGY #3',
    title: 'Love at Minus One',
    subtitle: 'Our biggest. Our boldest. Our most loved.',
    story: "This was the one that changed everything. Love at Minus One was not based on a single competition or event. It was open to all — writers from every corner of India who had something to say about love, pain, and silence.",
    impact: "165+ writers said yes. 165 different stories. 165 different voices. One beautiful book. We received pieces that made our team cry. We received pieces that we read twice — and then a third time.",
    takeaway: "When we delivered the writer kits to every single participant — on time, with love — the response was something we will never forget.",
    image: '/images/love-at-minus-one-cover.jpg'
  }
];

export function ShowcaseSection() {
  return (
    <section id="showcase" className="py-24 md:py-32 bg-[#FDFBF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">OUR STORY SO FAR</h3>
          <h4 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tighter mb-4">
            Three Anthologies. <br/>
            <span className="italic font-light text-ink-600 lowercase">Hundreds of dreams printed on paper.</span>
          </h4>
          <p className="text-base text-ink-400 font-sans max-w-xl mx-auto">Here's how it all started — and where it's going.</p>
        </div>

        <div className="space-y-32 md:space-y-48">
          {showcasedBooks.map((book, i) => (
            <div key={book.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`${i % 2 !== 0 ? 'lg:order-2' : ''}`}
              >
                <div className="relative aspect-[4/5] bg-white border border-ink-900/10 shadow-2xl group overflow-hidden">
                   <img src={book.image} alt={book.title} className="w-full h-full object-cover grayscale-0 group-hover:scale-105 transition-transform duration-1000" />
                   <div className="absolute top-8 left-8 bg-gold text-ink-900 text-[10px] font-sans font-black uppercase tracking-widest px-4 py-2">
                      {book.tag}
                   </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="relative">
                  <h5 className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-gold mb-4 flex items-center gap-4">
                    <span className="w-8 h-px bg-gold/30" /> {book.subtitle}
                  </h5>
                  <h6 className="text-2xl md:text-4xl font-serif font-black uppercase tracking-tighter mb-8 leading-none relative z-10">
                    {book.title}
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gold/10 -z-0" />
                  </h6>
                </div>
                
                <div className="space-y-6 relative">
                  {/* Decorative ink splatter accent (subtle) */}
                  <div className="absolute -right-12 -top-12 opacity-[0.03] pointer-events-none hidden lg:block">
                     <svg width="200" height="200" viewBox="0 0 200 200">
                        <path fill="currentColor" d="M44.7,-76.4C58,-69.2,69,-57.4,77.6,-44C86.2,-30.7,92.5,-15.3,91.8,-0.4C91.1,14.5,83.4,29,74.8,42.4C66.2,55.8,56.7,68.2,44.4,75.4C32.1,82.7,16,84.8,0.4,84.1C-15.3,83.4,-30.6,79.8,-43.8,72.9C-57,66.1,-68.2,55.9,-76.8,43.6C-85.4,31.3,-91.4,17,-91.6,2.5C-91.8,-12,-86.3,-26.7,-77.4,-39.8C-68.5,-52.9,-56.3,-64.5,-42.6,-71.5C-28.9,-78.6,-14.5,-81.1,0.4,-81.8C15.3,-82.5,31.4,-83.5,44.7,-76.4Z" transform="translate(100 100)" />
                     </svg>
                  </div>

                  <p className="text-base text-ink-600 font-sans font-light leading-relaxed">{book.story}</p>
                  <p className="text-base text-ink-900 font-serif font-black italic border-l-4 border-gold/20 pl-6 py-2">{book.impact}</p>
                  <p className="text-sm text-ink-400 font-sans font-medium italic border-t border-ink-900/5 pt-6">{book.takeaway}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Mini Stats Block */}
        <div className="mt-48 bg-ink-900 p-12 md:p-16 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-full bg-white opacity-[0.02] transform skew-x-12 translate-x-1/2"></div>
           
           <div className="flex flex-col items-center gap-4 group">
              <Book className="text-gold w-8 h-8 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-serif font-black text-white">3</div>
              <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-ink-400">Anthologies Published</div>
           </div>
           
           <div className="flex flex-col items-center gap-4 group">
              <Users className="text-gold w-8 h-8 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-serif font-black text-white">165+</div>
              <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-ink-400">Writers Featured</div>
           </div>
           
           <div className="flex flex-col items-center gap-4 group">
              <Zap className="text-gold w-8 h-8 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-serif font-black text-white">48</div>
              <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-ink-400">Sales in 32 Hours</div>
           </div>
           
           <div className="flex flex-col items-center gap-4 group">
              <Gift className="text-gold w-8 h-8 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-serif font-black text-white">100%</div>
              <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-ink-400">Delivery Rate</div>
           </div>
        </div>
      </div>
    </section>
  );
}
