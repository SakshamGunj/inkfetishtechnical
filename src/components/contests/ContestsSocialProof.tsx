'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';

const testimonials = [
  {
    text: "I have been cheated by two writing contests before Inkfetish. I entered IWL Season 1 with very low expectations. When the prize hit my account and the kit arrived at my door, I was genuinely shocked. This is the real deal.",
    author: "IWL Season 1 Participant",
    focus: "Prize delivery & trust"
  },
  {
    text: "What I loved most was the judging report. For the first time in any contest I've entered, I actually understood why I ranked where I did. That kind of feedback is worth more than the prize money to me.",
    author: "Author Voice Participant",
    focus: "Transparent judging"
  },
  {
    text: "I didn't win. But I got my certificate, a detailed report, and I was featured in the anthology. I left that contest feeling more like a writer than when I entered it. That's rare.",
    author: "September Contest Participant",
    focus: "Recognition beyond winners"
  },
  {
    text: "It was my first writing contest ever. I was scared. But the process was so simple and the team was so supportive that by the time I submitted, I just felt proud that I did it. I'll be back for Season 2.",
    author: "IWL Season 1 Participant",
    focus: "Beginner experience"
  },
  {
    text: "The contest brought me into a community of writers I didn't know existed. The prize was great, but the network I built through Inkfetish has been even more valuable.",
    author: "Poetry Contest Participant",
    focus: "Community + belonging"
  }
];

export function ContestsSocialProof() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">WHAT OUR WRITERS SAY</h3>
          <h4 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tighter leading-none mb-4">
            &quot;1,155+ Writers Can&apos;t Be Wrong&quot;
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-[#FDFBF7] p-10 border border-ink-900/5 relative group"
            >
              <div className="absolute top-0 right-0 p-6 opacity-[0.05]">
                 <MessageCircle size={40} />
              </div>
              <div className="text-[10px] font-sans font-black uppercase tracking-widest text-gold mb-6 border-b border-gold/10 pb-4 inline-block">
                 {t.focus}
              </div>
              <p className="text-base text-ink-600 font-sans font-light leading-relaxed mb-10 italic">
                &quot;{t.text}&quot;
              </p>
              <div className="flex items-center gap-4">
                 <div className="w-8 h-8 rounded-full bg-ink-900 flex items-center justify-center text-[10px] text-white font-bold">IF</div>
                 <div className="text-[10px] font-sans font-black uppercase tracking-widest text-ink-900">{t.author}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 pt-16 border-t border-ink-900/10">
           <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex gap-1">
                 {[1,2,3,4,5].map(i => <Star key={i} size={16} className="fill-gold text-gold" />)}
              </div>
              <div className="text-2xl font-serif font-black text-ink-900">95%+ Rating</div>
              <div className="text-[9px] font-sans font-bold uppercase tracking-widest text-ink-400">PARTICIPANT SATISFACTION</div>
           </div>

           <div className="flex flex-col items-center gap-4 text-center">
              <ShieldCheck size={32} className="text-gold" />
              <div className="text-2xl font-serif font-black text-ink-900">98%+ Delivery</div>
              <div className="text-[9px] font-sans font-bold uppercase tracking-widest text-ink-400">PRIZES, CERTIFICATES, KITS</div>
           </div>

           <div className="flex flex-col items-center gap-4 text-center">
              <CheckCircle2 size={32} className="text-gold" />
              <div className="text-2xl font-serif font-black text-ink-900">100% Payout</div>
              <div className="text-[9px] font-sans font-bold uppercase tracking-widest text-ink-400">RECORD ACROSS EVERY CONTEST</div>
           </div>

           <div className="flex flex-col items-center gap-4 text-center">
              <div className="text-3xl font-serif font-black text-gold">₹5.75L+</div>
              <div className="text-2xl font-serif font-black text-ink-900">Earned</div>
              <div className="text-[9px] font-sans font-bold uppercase tracking-widest text-ink-400">BY OUR WRITING COMMUNITY</div>
           </div>
        </div>
      </div>
    </section>
  );
}
