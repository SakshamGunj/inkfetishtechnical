'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: "Is my writing good enough to apply?",
    a: "Yes. We genuinely mean that. Inkfetish anthologies are not for prize-winning authors only. They are for anyone who has a real story to tell. We have published first-time writers, students, homemakers, and professionals. What matters is your voice — not your experience."
  },
  {
    q: "I've never been published before. Can I still join?",
    a: "Absolutely — and we'd love to have you. In fact, many of our most powerful contributions have come from first-time writers. Your fresh perspective is exactly what an anthology needs."
  },
  {
    q: "Why is there a fee to participate?",
    a: "Because we do this for real. Unlike platforms that just 'feature' your writing online, we print physical books, ship physical kits, and produce real publications. The participation fee covers printing, packaging, shipping, and production — so every writer gets a real, tangible outcome. No shortcuts."
  },
  {
    q: "Will I actually receive a physical copy of the book?",
    a: "Yes — always. We have a 100% delivery record. Every writer who has participated in a Inkfetish anthology has received their copy. Our Love at Minus One anthology had 165+ contributors — every single one received their kit. That's our promise and our track record."
  },
  {
    q: "What if my piece doesn't get selected?",
    a: "We will communicate clearly if there are any changes to your submission. However, our anthologies are not 'competitive' in the traditional sense. We are not selecting one winner from hundreds of losers. Our goal is to include every registered, eligible writer — as long as submissions meet the basic guidelines shared at registration."
  },
  {
    q: "How long does it take to receive the book?",
    a: "Timeline varies by anthology, but we always communicate clearly at every stage — from submission close to printing to shipping. You will never be left guessing."
  },
  {
    q: "Can I share my published piece elsewhere after the anthology?",
    a: "Yes. You retain the rights to your own writing. Being published in our anthology does not stop you from sharing, republishing, or using your piece elsewhere."
  },
  {
    q: "Is Inkfetish a legitimate/real publisher?",
    a: "We are a real, active publishing brand with three completed anthologies, 165+ writers served, physical books printed and shipped, and a growing community you can see on our social media. We show our work publicly. We show our results publicly."
  },
  {
    q: "What genres or themes are accepted?",
    a: "Every anthology has its own theme, which is shared at the time of opening. We accept a wide range of genres — poetry, short stories, flash fiction, personal essays, and more."
  },
  {
    q: "I missed the last anthology. Will there be another one?",
    a: "Always. We keep launching new anthologies — each with a different theme and a different opportunity. The best way to never miss one: Follow us on social media and join our mailing list."
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32 bg-[#FDFBF7] border-t border-ink-900/10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-20 relative">
          {/* Decorative Trust Badge */}
          <motion.div 
            initial={{ rotate: -10, opacity: 0 }}
            whileInView={{ rotate: 12, opacity: 1 }}
            viewport={{ once: true }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 border border-gold/20 rounded-full flex items-center justify-center pointer-events-none hidden md:flex"
          >
            <div className="text-[8px] font-sans font-black uppercase tracking-widest text-gold text-center leading-tight">
              ESTABLISHED<br/>TRUSTED<br/>2020
            </div>
          </motion.div>

          <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">GOT QUESTIONS? WE&apos;VE GOT ANSWERS.</h3>
          <h4 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tighter">
            Everything You <br/>
            <span className="italic font-light text-ink-600 lowercase">want to know — answered honestly.</span>
          </h4>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-ink-900/10 bg-white shadow-sm overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left group hover:bg-ink-900/5 transition-colors"
              >
                <div className="flex items-center gap-6">
                   <HelpCircle className={`w-5 h-5 transition-colors ${openIndex === i ? 'text-gold' : 'text-ink-300'}`} strokeWidth={1.5} />
                   <span className="text-base font-serif font-black uppercase tracking-tight text-ink-900">{faq.q}</span>
                </div>
                {openIndex === i ? <Minus size={18} className="text-gold" /> : <Plus size={18} className="text-ink-400" />}
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 md:px-8 pb-8 pt-0 ml-11">
                      <p className="text-sm md:text-base text-ink-600 font-sans font-light leading-relaxed max-w-2xl">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
