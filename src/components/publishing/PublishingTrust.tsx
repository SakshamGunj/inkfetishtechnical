'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';

const trustSignals = [
  { value: "₹5,75,000+", label: "Prize Money Paid Out", sub: "Since 2024" },
  { value: "1,155+", label: "Writers Worked With Us", sub: "Across all platforms" },
  { value: "98%+", label: "Delivery Rate", sub: "On every single promise" },
  { value: "100%", label: "Prize Payout Record", sub: "Zero delays, zero issues" }
];

export function PublishingTrust() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden border-y border-ink-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <div className="w-12 h-px bg-gold mx-auto mb-6" />
          <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">WHY YOU CAN TRUST US</h3>
          <h4 className="text-2xl md:text-4xl lg:text-5xl font-serif font-black uppercase tracking-tighter leading-none mb-6">
            &quot;We&apos;ve Been Delivering on Our <br className="hidden md:block" />
            <span className="italic font-light text-ink-600 block mt-2 lowercase">Promises Since 2024.&quot;</span>
          </h4>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-16 mb-20 md:mb-24">
          {trustSignals.map((signal, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.1 }}
               viewport={{ once: true }}
               className="text-center group p-6 border border-ink-900/5 hover:border-gold/50 transition-colors bg-[#FDFBF7]"
             >
                <div className="text-2xl md:text-4xl lg:text-5xl font-serif font-black text-ink-900 transition-colors duration-500 italic tracking-tighter mb-3 group-hover:text-gold">
                   {signal.value}
                </div>
                <div className="space-y-1">
                   <div className="text-[9px] md:text-[10px] font-sans font-black uppercase tracking-[0.2em] text-ink-900 leading-none">{signal.label}</div>
                   <div className="text-[8px] md:text-[9px] font-sans text-ink-400 uppercase tracking-widest leading-relaxed mt-2">{signal.sub}</div>
                </div>
             </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
           <div className="space-y-8 text-lg text-ink-600 font-sans font-medium leading-relaxed max-w-2xl relative border-l-4 border-gold/20 pl-10">
              <p>We understand that &quot;trust us&quot; means nothing from a brand you just found. So don&apos;t trust us yet. Look at what we&apos;ve built.</p>
              <p>Our contest record and anthology launches are not marketing talking points. They are verifiable achievements with real names and real results attached to them.</p>
           </div>
           
           <div className="bg-[#FDFBF7] p-12 md:p-16 border border-ink-900/5 shadow-2xl space-y-10">
              <h5 className="text-xl font-serif font-black uppercase tracking-tighter italic border-b border-ink-900/10 pb-6">Our Record:</h5>
              <div className="space-y-8">
                 <div className="flex gap-6">
                    <div className="text-xl font-serif font-black text-gold">01</div>
                    <p className="text-sm text-ink-900 font-sans font-black uppercase tracking-[0.1em] leading-relaxed">₹5,75,000+ in prize money — paid out to real writers, on time, every single contest.</p>
                 </div>
                 <div className="flex gap-6">
                    <div className="text-xl font-serif font-black text-gold">02</div>
                    <p className="text-sm text-ink-900 font-sans font-black uppercase tracking-[0.1em] leading-relaxed">Three successful anthologies published. 165+ writers featured. 48 books sold in the first 32 hours.</p>
                 </div>
              </div>
              <div className="pt-10">
                 <Link href="/archive" className="group flex items-center gap-4 text-[10px] font-sans font-black uppercase tracking-[0.3em] text-ink-900">
                    See Our Full Track Record <MoveRight size={14} className="text-gold group-hover:translate-x-2 transition-transform" />
                 </Link>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
