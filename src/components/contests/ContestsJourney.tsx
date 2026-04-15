'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Zap } from 'lucide-react';

export function ContestsJourney() {
  return (
    <section className="py-24 md:py-32 bg-[#FDFBF7] relative overflow-hidden border-t border-ink-900/10">
      {/* Background Accent */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-[0.02] pointer-events-none transform translate-x-1/4">
        <Trophy className="w-full h-full text-ink-900" strokeWidth={0.5} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left: Headline Area */}
          <div className="lg:col-span-12 mb-12">
            <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">OUR JOURNEY</h3>
            <h4 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black uppercase tracking-tighter leading-none">
              &quot;From 120 Writers in 2024 to 550+ <br/>
              <span className="italic font-light text-ink-600">This is the Inkfetish Story&quot;</span>
            </h4>
          </div>

          {/* Center: The Narrative (Founder's Letter feel) */}
          <div className="lg:col-span-7">
            <div className="space-y-8 text-base md:text-lg text-ink-600 font-sans font-light leading-relaxed max-w-2xl relative">
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-black first-letter:text-ink-900 first-letter:mr-3 first-letter:float-left first-letter:leading-none">
                It started simply. In 2024, we hosted our first poetry contest — a small event, honest ambitions, and one big question: &quot;Will writers actually show up?&quot;
              </p>
              
              <p>120 of them did. For a first attempt, that felt huge. We gave out e-certificates, paid out our first prize pool of ₹50,000, and made a quiet promise to ourselves: <span className="text-ink-900 font-black italic uppercase tracking-tighter">&quot;Next time, we go bigger.&quot;</span></p>
              
              <p>We kept that promise. In 2025, we launched the Author Voice Writing Competition — our most structured contest yet. Two stages. Rigorous judging. 255 participants. A ₹1,00,000 prize pool. Writers came back — not just because of the prize, but because they trusted us.</p>
              
              <p>Later that same year, the September Writing Competition brought 230 more writers into our growing community. ₹75,000 in prizes. Another successful delivery. Another batch of writers who could point to something real and say, &quot;I competed. I was recognized.&quot;</p>
              
              <p>And then came 2026. Indian Writers League — Season 1. 550+ participants. A ₹1,50,000 prize pool. E-certificates. Appreciation letters. Premium physical kits with medals for selected participants.</p>
              
              <div className="bg-white border-l-4 border-gold p-8 shadow-sm">
                 <p className="text-ink-900 font-serif font-black italic">The numbers tell the story. But here&apos;s what the numbers don&apos;t say: Every single one of those 1,155+ writers mattered. Every submission was read. Every winner was paid. Every certificate was delivered.</p>
              </div>

              <p>That&apos;s the Inkfetish standard. And it&apos;s not changing anytime soon.</p>
            </div>
          </div>

          {/* Right: Growth Visualization Block (Mini) */}
          <div className="lg:col-span-5 space-y-12 bg-white p-10 border border-ink-900/5 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4">
                <Zap size={30} className="text-gold/20" />
             </div>
             
             <h5 className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-ink-900 mb-8 border-b border-ink-900/10 pb-4">RAPID COMMUNITY GROWTH</h5>
             
             <div className="space-y-10">
                <div className="relative group">
                   <div className="flex justify-between items-end mb-3">
                      <span className="text-xs font-sans font-black uppercase tracking-widest text-ink-400 italic">2024 Start</span>
                      <span className="text-xl font-serif font-black text-ink-900 italic">120 Writers</span>
                   </div>
                   <div className="h-2 w-full bg-ink-900/5 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        whileInView={{ width: '25%' }} 
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-ink-900" 
                      />
                   </div>
                </div>

                <div className="relative group">
                   <div className="flex justify-between items-end mb-3">
                      <span className="text-xs font-sans font-black uppercase tracking-widest text-ink-400 italic">2025 Mid</span>
                      <span className="text-xl font-serif font-black text-ink-900 italic">255 Writers</span>
                   </div>
                   <div className="h-2 w-full bg-ink-900/5 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        whileInView={{ width: '55%' }} 
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="h-full bg-gold" 
                      />
                   </div>
                   <div className="absolute -top-4 right-0 text-[10px] font-sans font-black text-gold">+112% GROWTH</div>
                </div>

                <div className="relative group">
                   <div className="flex justify-between items-end mb-3">
                      <span className="text-xs font-sans font-black uppercase tracking-widest text-ink-400 italic">2026 Peak (Season 1)</span>
                      <span className="text-xl font-serif font-black text-ink-900 italic">550+ Writers</span>
                   </div>
                   <div className="h-2 w-full bg-ink-900/5 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        whileInView={{ width: '100%' }} 
                        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                        className="h-full bg-ink-900" 
                      />
                   </div>
                   <div className="absolute -top-4 right-0 text-[10px] font-sans font-black text-gold">+139% IN ONE YEAR</div>
                </div>
             </div>

             <div className="pt-12 mt-12 border-t border-ink-900/5 grid grid-cols-2 gap-8">
                <div>
                   <div className="text-2xl font-serif font-black text-ink-900 tracking-tighter">1,155+</div>
                   <div className="text-[9px] font-sans font-bold uppercase tracking-widest text-ink-400">Total Competitors</div>
                </div>
                <div>
                   <div className="text-2xl font-serif font-black text-ink-900 tracking-tighter">₹5.75L+</div>
                   <div className="text-[9px] font-sans font-bold uppercase tracking-widest text-ink-400">Prizes Paid Out</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
