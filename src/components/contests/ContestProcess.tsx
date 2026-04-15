'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Edit3, Send, Trophy, Clock } from 'lucide-react';

const steps = [
  {
    step: "01",
    icon: <Edit3 className="w-8 h-8 text-gold" />,
    title: "Register",
    desc: "Click the button. Fill in your basic details. Complete your registration. That's it — you're officially in the competition.",
    time: "Takes: 5 minutes"
  },
  {
    step: "02",
    icon: <Clock className="w-8 h-8 text-gold" />,
    title: "Receive Your Guidelines",
    desc: "Once registered, you'll receive a detailed brief — the contest theme, word limits, format rules, and judging criteria.",
    time: "Delivered: Immediately"
  },
  {
    step: "03",
    icon: <Send className="w-8 h-8 text-gold" />,
    title: "Write & Submit",
    desc: "Write your piece. Make it yours. Then submit before the deadline — from your phone, laptop, or anywhere.",
    time: "No complicated portals"
  },
  {
    step: "04",
    icon: <Trophy className="w-8 h-8 text-gold" />,
    title: "Results + Recognition",
    desc: "Our panel reviews all submissions. Every participant receives their certificate. Winners receive prizes, letters, and kits.",
    time: "No ghosting. No delays."
  }
];

export function ContestProcess() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden border-t border-ink-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">SIMPLE PROCESS. REAL RESULTS.</h3>
          <h4 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tighter leading-none mb-4">
            &quot;From Registration to Recognition — <br/>
            <span className="italic font-light text-ink-600 lowercase">4 Steps&quot;</span>
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-900/10 border border-ink-900/10 mb-12">
          {steps.map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ backgroundColor: '#FDFBF7' }}
              className="bg-white p-10 md:p-14 transition-colors duration-500 group"
            >
              <div className="text-5xl font-sans font-black italic text-ink-900/5 mb-10 group-hover:text-gold/10 transition-colors">{item.step}</div>
              <div className="mb-8 group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
              <h5 className="text-2xl font-serif font-black uppercase tracking-tighter mb-4">{item.title}</h5>
              <p className="text-[10px] text-ink-500 font-sans font-black uppercase tracking-widest leading-relaxed mb-6">{item.desc}</p>
              <div className="text-[9px] font-sans font-black text-gold uppercase tracking-widest italic">{item.time}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
