'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    num: "1",
    label: "BOOK YOUR CALL",
    title: "Takes 2 minutes. Changes everything.",
    desc: "Click the button. Pick a time that works for you. That's it. No forms to fill. Just a conversation booked.",
    cta: "Book a Free Call Now",
    link: "/contact"
  },
  {
    num: "2",
    label: "TELL US ABOUT YOUR BOOK",
    title: "We listen. You talk. This is where it gets real.",
    desc: "On the call, tell us about your book — what it is, where it stands, and what you want it to become. We'll ask real questions. Not a checklist.",
  },
  {
    num: "3",
    label: "WE BUILD YOUR PLAN",
    title: "A custom package. Clear pricing. A timeline you can trust.",
    desc: "After the call, we put together a publishing plan built specifically for your book. No generic package. No hidden costs. A clear proposal.",
  },
  {
    num: "4",
    label: "WE BUILD YOUR BOOK",
    title: "You write. We build. Together, we create.",
    desc: "Once you're in, our team gets to work — editing, designing, developing your website, registering your ISBN. You're kept in the loop at every step.",
  }
];

export function PublishingProcess() {
  return (
    <section className="py-16 md:py-24 bg-[#FDFBF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <div className="w-12 h-px bg-gold mx-auto mb-6" />
          <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">SIMPLE. CLEAR. NO SURPRISES.</h3>
          <h4 className="text-2xl md:text-4xl lg:text-5xl font-serif font-black uppercase tracking-tighter leading-none mb-6">
            &quot;Four Steps From Where You <br className="hidden md:block" />
            <span className="italic font-light text-ink-600 block mt-2 lowercase">Are Now to Author.&quot;</span>
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
           {/* Connecting Line for Desktop */}
           <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent hidden lg:block" />
           {steps.map((step, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               viewport={{ once: true }}
               className="bg-white border border-ink-900/5 p-8 flex flex-col group relative overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
             >
                <div className="absolute top-0 right-0 w-16 h-16 bg-gold/5 rounded-bl-full pointer-events-none group-hover:bg-gold/10 transition-colors" />
                <div className="w-10 h-10 border border-ink-900/10 rounded-full flex items-center justify-center mb-6 bg-[#FDFBF7] group-hover:border-gold transition-colors relative z-10">
                  <div className="text-xl font-serif font-black text-ink-900/30 group-hover:text-gold transition-colors italic tracking-tighter">{step.num}</div>
                </div>
                <h5 className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-ink-400 mb-3 relative z-10">{step.label}</h5>
                <h6 className="text-lg font-serif font-black uppercase tracking-tight mb-4 italic leading-tight relative z-10">{step.title}</h6>
                <p className="text-[10px] md:text-xs text-ink-500 font-sans font-medium leading-relaxed mb-8 relative z-10">{step.desc}</p>
                
                {step.cta && (
                  <div className="mt-auto">
                    <Link href={step.link || "#"} className="group/btn flex items-center gap-4 text-[10px] font-sans font-black uppercase tracking-[0.1em] text-ink-900 border-b border-gold pb-2 w-fit">
                      {step.cta} <MoveRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                )}
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}
