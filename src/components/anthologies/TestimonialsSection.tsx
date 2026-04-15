'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Instagram, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sanjana Sharma",
    city: "Mumbai",
    book: "Contributor, Love at Minus One",
    text: "I have been writing since I was 14. I always thought publication was only for 'real' writers — not someone like me. When I held the book in my hands and saw my name... I cried. I actually cried. Inkfetish made me feel like a real writer for the first time.",
    type: "Emotional Impact"
  },
  {
    name: "Rahul Verma",
    city: "Delhi",
    book: "Contributor, Love at Minus One",
    text: "I was nervous because I had never paid for anything like this before. I kept thinking — what if they don't deliver? But everything came exactly as promised. My kit, my certificate, my copy of the book. I will definitely be part of the next one.",
    type: "Delivery & Trust"
  },
  {
    name: "Ananya D.",
    city: "Bangalore",
    book: "Contributor, Petals and Scars",
    text: "I am a student and I have never been published anywhere. This anthology was my first. I didn't think my writing was 'good enough' but Inkfetish made me realize — good enough is not the point. Sharing your voice is the point.",
    type: "Beginner Experience"
  },
  {
    name: "Vikram K.",
    city: "Pune",
    book: "Contributor, Shakespeare & What Remained",
    text: "What surprised me most was the community. The other writers, the support, the feeling of being part of something. I came for the book. I stayed for the people.",
    type: "Community"
  }
];

export function TestimonialsSection() {
  return (
    <section id="reviews" className="py-24 md:py-32 bg-white relative border-y border-ink-900/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">WHAT OUR WRITERS SAY</h3>
          <h4 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tighter">
            Don&apos;t Take <br/>
            <span className="italic font-light text-ink-600 lowercase">our word for it.</span>
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 border border-ink-900/10 bg-[#FDFBF7] relative group hover:border-gold transition-all duration-500"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-ink-900/5 group-hover:text-gold/10 transition-colors" />
              
              <div className="flex gap-1 mb-8">
                {[1,2,3,4,5].map(j => <Star key={j} size={14} className="fill-gold text-gold" />)}
              </div>

              <div className="space-y-6">
                <p className="text-base md:text-lg text-ink-900 font-sans font-light leading-relaxed italic line-clamp-4 group-hover:line-clamp-none transition-all duration-500">
                  &quot;{t.text}&quot;
                </p>
                
                <div className="pt-8 border-t border-ink-900/5 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-gold mb-1">{t.type}</div>
                    <div className="text-sm font-serif font-black text-ink-900">{t.name}, {t.city}</div>
                    <div className="text-[9px] font-sans font-bold text-ink-400 uppercase tracking-widest">{t.book}</div>
                  </div>
                  <Instagram className="w-5 h-5 text-ink-900/10 group-hover:text-pink-500 transition-colors cursor-pointer" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Proof Grid Placeholder */}
        <div className="mt-24 pt-24 border-t border-ink-900/10">
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 opacity-40 hover:opacity-100 transition-opacity">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="aspect-square bg-white border border-ink-900/10 flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-crosshair">
                   <div className="text-[8px] font-sans font-black text-ink-300 uppercase tracking-tighter">PROOF_ASSET_0{i}</div>
                </div>
              ))}
           </div>
           <p className="text-center mt-8 text-[9px] font-sans font-black uppercase tracking-[0.4em] text-ink-400">
              Verified Author Deliveries & Social Proof
           </p>
        </div>
      </div>
    </section>
  );
}
