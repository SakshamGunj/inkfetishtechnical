'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Scale, Gift, BookOpen } from 'lucide-react';

const trustPillars = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-gold" />,
    title: "Real Prizes",
    stats: "₹5,75,000+ given",
    desc: "Across 4 contests. Not promises — delivered."
  },
  {
    icon: <Award className="w-8 h-8 text-gold" />,
    title: "Certified Recognition",
    stats: "Official & Shareable",
    desc: "Every participant gets an e-certificate. Top performers get appreciation letters."
  },
  {
    icon: <Scale className="w-8 h-8 text-gold" />,
    title: "Fair Judging",
    stats: "Transparent Reports",
    desc: "Detailed judging reports. You know exactly where you stood and why."
  },
  {
    icon: <Gift className="w-8 h-8 text-gold" />,
    title: "Physical Rewards",
    stats: "Kits & Medals",
    desc: "Medals, premium kits, physical items for selected winners."
  },
  {
    icon: <BookOpen className="w-8 h-8 text-gold" />,
    title: "Publishing Pathway",
    stats: "Become an Author",
    desc: "Top writers get featured in our anthologies and unlock special publishing discounts."
  }
];

export function ContestsAuthority() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden border-t border-ink-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24 items-start">
          <div className="lg:col-span-12">
            <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-gold/30" /> WHY WRITERS TRUST INKFETISH
            </h3>
            <h4 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black uppercase tracking-tighter leading-none mb-12">
              &quot;We Built Something Writers Have <br/>
              <span className="italic font-light text-ink-600">Waited a Long Time For&quot;</span>
            </h4>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-6 text-lg text-ink-600 font-sans font-light leading-relaxed max-w-2xl relative border-l-2 border-gold/20 pl-8">
               <p>In India, writing contests are everywhere.</p>
               <p>But ask any writer who has participated in one, and they&apos;ll tell you the same thing:</p>
               <p className="text-ink-900 font-serif italic text-xl font-bold">&quot;I submitted. And then... nothing. No update. No feedback. No prize. Just silence.&quot;</p>
               <p>We started Inkfetish contests because we were angry about that silence. Writers put their heart into their words. They deserve more than a form submission and a forgotten email.</p>
               <p>So we built something different. A stage where your courage to submit is met with real recognition, real prizes, and real pathways to publication.</p>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#FDFBF7] p-8 border border-ink-900/5 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rotate-45 transform translate-x-16 -translate-y-16 group-hover:bg-gold/10 transition-colors" />
             <p className="relative z-10 text-xs text-ink-500 font-sans uppercase tracking-widest font-black leading-relaxed">
                Judging is transparent — you know exactly how and why winners are chosen. Prizes are real — the money reaches winners, always.
             </p>
          </div>
        </div>

        {/* 5 columns - bold and scannable */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-ink-900/10 border border-ink-900/10 mb-12">
          {trustPillars.map((pillar, i) => (
            <motion.div 
              key={i}
              whileHover={{ backgroundColor: '#FDFBF7' }}
              className="bg-white p-8 md:p-10 flex flex-col items-start gap-8 group transition-colors duration-500"
            >
              <div className="w-16 h-16 rounded-full bg-gold/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                {pillar.icon}
              </div>
              <div>
                <h5 className="text-lg font-serif font-black uppercase tracking-tighter mb-2">{pillar.title}</h5>
                <div className="text-[10px] font-sans font-black uppercase tracking-widest text-gold mb-4">{pillar.stats}</div>
                <p className="text-xs text-ink-500 font-sans font-medium leading-relaxed uppercase tracking-tight">{pillar.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center">
           <p className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-ink-400">
              This is not just a contest. This is a stage.
           </p>
        </div>
      </div>
    </section>
  );
}
