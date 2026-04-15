'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: "Are Inkfetish contests legitimate?",
    a: "Yes — completely. We have hosted 4 successful contests since 2024, with 1,155+ writers and over ₹5,75,000 in prize money paid out. Our results are public. Our participants have received prizes, kits, and certificates. We're a real, active brand and you can verify every claim we make."
  },
  {
    q: "Is my payment safe?",
    a: "Absolutely. We use secure, trusted payment gateways. Your payment details are never stored on our servers. If a contest is cancelled for any reason (which has never happened), refunds are processed promptly."
  },
  {
    q: "How does judging work? Is it fair?",
    a: "Judging at Inkfetish is transparent and criterion-based. We publish criteria upfront. After results, we share detailed judging reports so participants understand where they stood. No favorites. No shortcuts. Just fair evaluation."
  },
  {
    q: "When do I receive my certificate?",
    a: "E-certificates are dispatched within 7–14 days of results. Physical kits and letters take additional time based on location, but we communicate every step of the delivery process clearly."
  },
  {
    q: "How is prize money paid?",
    a: "Prize money is transferred directly to winners via UPI, bank transfer, or other standard methods. We have a 100% payout record — every winner has received their full prize amount."
  },
  {
    q: "My writing isn't good enough. Should I still enter?",
    a: "Yes. Many of our most impressive entries came from first-time writers who thought exactly that. Competing is how you grow. The judging report alone will teach you more than months of self-editing."
  },
  {
    q: "Can I enter if I'm a student?",
    a: "Absolutely. We actively welcome students. Many of our past winners and top performers have been students."
  },
  {
    q: "What happens after the contest?",
    a: "It's a door, not a destination. Top performers may be invited to feature in our anthologies. All participants unlock special discounts for future Inkfetish projects."
  }
];

export function ContestsFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 bg-[#FDFBF7] border-t border-ink-900/10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-20 relative">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 border border-gold/20 rounded-full flex items-center justify-center pointer-events-none hidden md:flex">
            <HelpCircle size={32} className="text-gold/20" />
          </div>

          <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">GOT QUESTIONS? GOOD.</h3>
          <h4 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tighter">
            Everything You Want to Know — <br/>
            <span className="italic font-light text-ink-600 lowercase">Answered clearly and honestly.</span>
          </h4>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-ink-900/10 overflow-hidden group">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-gold/5 transition-colors"
                aria-expanded={openIndex === i}
              >
                <div className="flex gap-4 md:gap-6 items-start">
                   <span className="text-[10px] font-sans font-black text-gold/30 mt-1 md:mt-2">0{i+1}</span>
                   <span className="text-base md:text-lg font-serif font-black uppercase tracking-tight leading-tight">{faq.q}</span>
                </div>
                {openIndex === i ? <Minus size={18} className="text-gold" /> : <Plus size={18} className="text-gold opacity-30 group-hover:opacity-100" />}
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-14 md:px-20 pb-8 text-sm md:text-base text-ink-600 font-sans font-light leading-relaxed border-t border-ink-900/5 pt-6">
                       {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
           <p className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-ink-400">
              STILL UNCERTAIN? CONTACT OUR TEAM ANYTIME.
           </p>
        </div>
      </div>
    </section>
  );
}
