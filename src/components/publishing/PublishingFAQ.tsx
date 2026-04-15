'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: "How much does publishing with Inkfetish cost?",
    a: "We don't believe in fixed packages — because no two books are the same. After our call, we'll put together a custom plan for your specific book. What we can tell you now: your seat booking starts at just ₹500–₹1,000, and payment plans are available throughout the project."
  },
  {
    q: "How is this different from Notion Press or other self-publishing companies?",
    a: "The biggest difference is attention. Platforms like Notion Press process hundreds of books a month. Your book is one file in a system. At Inkfetish, we take a limited number of projects. Your cover is designed from scratch, your manuscript is edited by a human, and your author website is built for you."
  },
  {
    q: "How long does the publishing process take?",
    a: "A complete project — editing, cover, formatting, website, distribution — typically takes 4–10 weeks. We give you a clear timeline upfront and stick to it. No surprises, no indefinite 'we're working on it.'"
  },
  {
    q: "Will the ISBN be in my name?",
    a: "Yes. Always. Your ISBN is registered in your name. Your book belongs to you. This is something we're firm about because we've seen what happens when publishers register ISBNs in their own name."
  },
  {
    q: "What if I only have a rough draft?",
    a: "That's exactly where we start. We've built books from rough drafts and from near-final manuscripts. Tell us where you are on the call — we'll tell you exactly what the journey looks like from there."
  },
  {
    q: "I've been burned by a cheap publisher before. How do I know you're different?",
    a: "We understand that completely. Look at our track record: ₹5,75,000+ paid out. 1,155+ writers served. 98%+ delivery rate. Take 30 minutes on a call. Ask us every hard question you have. If the answers don't convince you, don't work with us."
  },
  {
    q: "What genres do you publish?",
    a: "Fiction, non-fiction, poetry, memoirs, self-help, literary fiction, short story collections, and more. If you've written it seriously, we'll consider it seriously."
  },
  {
    q: "Do I keep my royalties?",
    a: "Yes — up to 100% of your royalties, depending on your package. We believe the author should earn from their work. Our royalty structure is explained clearly before you sign anything."
  }
];

export function PublishingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden border-t border-ink-900/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <div className="w-12 h-px bg-gold mx-auto mb-6" />
          <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">REAL QUESTIONS. REAL ANSWERS.</h3>
          <h4 className="text-2xl md:text-4xl lg:text-5xl font-serif font-black uppercase tracking-tighter leading-none mb-6 text-center">
            &quot;We&apos;d Rather You <span className="italic font-light text-ink-600 lowercase block md:inline">Ask Than Wonder.&quot;</span>
          </h4>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-ink-900/5 overflow-hidden">
               <button 
                 onClick={() => setOpenIndex(openIndex === i ? null : i)}
                 className={`w-full flex items-center justify-between p-6 md:p-8 text-left group transition-colors ${openIndex === i ? 'bg-white' : 'bg-[#FDFBF7] hover:bg-white'}`}
               >
                  <span className={`text-sm md:text-base font-serif font-black uppercase tracking-tight italic transition-colors ${openIndex === i ? 'text-gold' : 'group-hover:text-gold'}`}>{faq.q}</span>
                  <div className="shrink-0 ml-4">
                    {openIndex === i ? <Minus size={18} className="text-gold" /> : <Plus size={18} className="text-ink-300" />}
                  </div>
               </button>
               <AnimatePresence>
                 {openIndex === i && (
                   <motion.div
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: "auto", opacity: 1 }}
                     exit={{ height: 0, opacity: 0 }}
                     transition={{ duration: 0.3, ease: "easeInOut" }}
                   >
                     <div className="px-8 pb-8 pt-2 bg-white text-xs md:text-sm text-ink-600 font-sans font-medium italic leading-relaxed max-w-2xl">
                        {faq.a}
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
