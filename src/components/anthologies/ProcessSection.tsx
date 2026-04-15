'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, PenTool, Box } from 'lucide-react';

const steps = [
  {
    number: "01",
    icon: CreditCard,
    title: "Register & Pay",
    desc: "Click the button. Fill in your details. Complete your payment. That's it — you're in. No complicated forms. No gatekeeping. No waiting for approval.",
    time: "Time taken: 5 minutes"
  },
  {
    number: "02",
    icon: PenTool,
    title: "Write & Submit Your Piece",
    desc: "Once registered, you'll receive submission guidelines — theme, word count, format, and deadline. Write your piece. Take your time. Put your heart into it. Then submit.",
    time: "Done via phone or laptop"
  },
  {
    number: "03",
    icon: Box,
    title: "Receive Your Book & Kit",
    desc: "After curation and printing, your name goes into the book. Your kit gets shipped to your address. Your certificate is sent to your email.",
    time: "Your name. In a real book. Forever."
  }
];

export function ProcessSection() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden border-y border-ink-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">SIMPLE. CLEAR. NO CONFUSION.</h3>
          <h4 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tighter">
            3 Steps To <br/>
            <span className="italic font-light text-ink-600 lowercase">becoming a published author.</span>
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 lg:gap-16">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative flex flex-col items-center text-center group"
            >
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-px border-t border-dashed border-ink-900/10 z-0"></div>
              )}
              
              <div className="relative z-10 w-24 h-24 bg-[#FDFBF7] border border-ink-900/10 rounded-full flex items-center justify-center mb-10 shadow-sm group-hover:border-gold transition-all duration-500">
                <step.icon className="w-8 h-8 text-gold" strokeWidth={1} />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-ink-900 text-white text-[10px] font-sans font-black flex items-center justify-center rounded-full border-2 border-white">
                  {step.number}
                </div>
              </div>

              <h5 className="text-base font-serif font-black uppercase tracking-tight text-ink-900 mb-6">{step.title}</h5>
              <div className="space-y-4">
                <p className="text-sm text-ink-500 font-sans leading-relaxed">{step.desc}</p>
                <p className="text-[9px] font-sans font-black uppercase tracking-[0.2em] text-gold pt-4 border-t border-ink-900/5 whitespace-nowrap">{step.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
