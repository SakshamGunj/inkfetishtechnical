'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';

const contrasts = [
  {
    title: "ISBN & OFFICIAL REGISTRATION",
    others: "Handle your ISBN as an afterthought. Sometimes list it under their own publisher account — meaning they technically own your book's registration, not you.",
    us: "Register your ISBN correctly, in your name, through proper official channels. Your book belongs to you. This is non-negotiable."
  },
  {
    title: "COVER DESIGN",
    others: "Open a Canva template. Change the title. Pick a stock image used on 300 other books. Done in 40 minutes. Called 'professional design.'",
    us: "Start from scratch. The concept is built around your specific story. Typography is chosen for your genre. Design that commands attention."
  },
  {
    title: "CUSTOM ILLUSTRATIONS & LINE ART",
    others: "Offer illustrations from stock libraries or skip the option entirely. 'We'll find something that works.'",
    us: "Create original illustrations — chapter headings, interior art, line drawings — built to match the world your writing creates."
  },
  {
    title: "MANUSCRIPT EDITING",
    others: "Run it through Grammarly. Fix obvious errors. Your voice gets preserved because nobody really touched it. Weak sections stay weak.",
    us: "Assign a real editor who reads your entire manuscript for story. Structural issues get flagged. Pacing problems get fixed. Purity of voice stays."
  },
  {
    title: "AUTHOR WEBSITE",
    others: "Basic template with your name and a 'Buy Now' button. Looks like it was built in an afternoon. Because it was.",
    us: "Design a real author website — one that reflects who you are as a writer and what a reader needs to feel. Clean. Premium. Built to last."
  },
  {
    title: "ROYALTIES",
    others: "Take 30%–60% of your royalties. The reasoning is buried in a contract you were given 10 minutes to read.",
    us: "Offer 70% to 100% royalties — transparent from the first conversation. You wrote every word. You deserve every rupee."
  },
  {
    title: "DISTRIBUTION",
    others: "List on one or two platforms. No guidance on pricing, no help with visibility, no strategy.",
    us: "Get your book on Amazon, Flipkart, and additional channels — with proper listing copy, categorization, and pricing strategy."
  },
  {
    title: "BRANDING GUIDANCE",
    others: "Publish your book and disappear. What happens after launch is entirely up to you.",
    us: "Advise you on social positioning, bio writing, and building an audience that shows up for your next one."
  }
];

export function PublishingFeaturesContrast() {
  return (
    <section className="py-16 md:py-24 bg-[#FDFBF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <div className="w-12 h-px bg-gold mx-auto mb-6" />
          <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">THE REAL DIFFERENCE</h3>
          <h4 className="text-2xl md:text-4xl lg:text-5xl font-serif font-black uppercase tracking-tighter leading-[1.1] mb-6">
            &quot;What Others Call &apos;Publishing.&apos; <br className="hidden md:block" />
            <span className="italic font-light text-ink-600 block mt-2 lowercase">What We Actually Do.&quot;</span>
          </h4>
        </div>

        <div className="space-y-12">
          {contrasts.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-ink-900/5 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-2 group"
            >
              <div className="p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-ink-900/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                    <X size={16} />
                  </div>
                  <h5 className="text-[10px] md:text-xs font-sans font-black uppercase tracking-[0.2em] text-ink-400 italic">WHAT OTHERS DO</h5>
                </div>
                <h6 className="text-base md:text-lg font-serif font-black uppercase tracking-tighter mb-4 italic group-hover:text-red-500 transition-colors relative z-10">{item.title}</h6>
                <p className="text-xs text-ink-500 font-sans font-medium leading-relaxed italic pr-4 relative z-10">
                  {item.others}
                </p>
              </div>

              <div className="p-8 md:p-10 bg-[#FDFBF7]/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none z-0">
                  <div className="text-[60px] md:text-[80px] font-serif font-black italic select-none">INK</div>
                </div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none z-0" />
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center">
                    <CheckCircle2 size={16} />
                  </div>
                  <h5 className="text-[10px] md:text-xs font-sans font-black uppercase tracking-[0.2em] text-gold italic">WHAT WE DO</h5>
                </div>
                <h6 className="text-lg md:text-xl font-serif font-black uppercase tracking-tighter mb-4 italic">{item.title}</h6>
                <p className="text-xs md:text-sm text-ink-900 font-sans font-black uppercase tracking-[0.1em] leading-relaxed">
                  {item.us}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
