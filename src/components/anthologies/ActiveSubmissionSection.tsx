'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, MoveRight, Clock, Users, Gift } from 'lucide-react';
import Link from 'next/link';
import { LiveAnthology } from '@/types/anthology';

interface Props {
  anthology: LiveAnthology;
}

export function ActiveSubmissionSection({ anthology }: Props) {
  return (
    <>
      {/* Urgency Banner */}
      <div className="bg-red-600 py-3 relative overflow-hidden flex items-center justify-center gap-4 z-50">
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }} 
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]" 
        />
        <span className="text-[10px] md:text-xs font-sans font-black uppercase tracking-[0.3em] text-white">
          URGENT: Limited contributor slots remaining for May cycle.
        </span>
        <motion.div 
          animate={{ x: [0, 10, 0] }} 
          transition={{ duration: 2, repeat: Infinity }}
          className="hidden md:block"
        >
          <MoveRight className="text-white w-4 h-4" />
        </motion.div>
      </div>

      <section id="active" className="py-24 md:py-32 bg-[#FDFBF7] relative overflow-hidden border-t border-ink-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Left: Anthology Details */}
            <div className="lg:col-span-7">
              <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">CURRENT OPEN ANTHOLOGY</h3>
              <h4 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tighter leading-none mb-8">
                {anthology.title} — <br/>
                <span className="italic font-light text-ink-600">The doors are open. But not for long.</span>
              </h4>
              
              <p className="text-base text-ink-600 font-sans font-light leading-relaxed mb-12 max-w-2xl">
                Every few months, we open a new anthology. Every time we do, spots fill up fast. 
                Because writers who have seen what we&apos;ve done — and what we&apos;ve delivered — don't wait around. 
                This time, we&apos;re inviting you. <br/><br/>
                {anthology.description}
              </p>

              {/* Enhanced Who Can Join Checklist */}
              <div className="bg-white border border-ink-900/10 p-8 md:p-12 mb-12 relative overflow-hidden group shadow-sm">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FDFBF7] transform rotate-45 translate-x-16 -translate-y-16 border-l border-b border-ink-900/5 group-hover:bg-gold/5 transition-colors duration-500" />
                
                <h5 className="relative z-10 text-sm font-sans font-black uppercase tracking-widest text-ink-900 mb-10 flex items-center gap-4">
                  <span className="w-8 h-px bg-gold/30" /> WHO CAN JOIN?
                </h5>
                
                <ul className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                   {[
                     "Any writer with a voice (No degree needed)",
                     "Writers looking for their 1st publication",
                     "Poets, Short Story writers & Essayists",
                     "Anyone tired of 'writing for nothing'",
                     "Dedicated contributors (We value passion)",
                     "Writers who want a physical legacy"
                   ].map((item, i) => (
                     <li key={i} className="flex items-start gap-4 group/item">
                        <div className="mt-1 w-5 h-5 rounded-full border border-gold flex items-center justify-center group-hover/item:bg-gold transition-colors duration-300">
                           <Check className="w-2.5 h-2.5 text-gold group-hover/item:text-white transition-colors" />
                        </div>
                        <span className="text-sm text-ink-600 font-medium group-hover/item:text-ink-900 transition-colors uppercase tracking-tight">{item}</span>
                     </li>
                   ))}
                </ul>

                <div className="mt-12 pt-8 border-t border-ink-900/5 relative z-10">
                  <h5 className="text-[10px] font-sans font-black uppercase tracking-[0.3em] text-gold mb-4 flex items-center gap-2">
                    <Gift className="w-4 h-4" /> WHAT YOU&apos;LL RECEIVE:
                  </h5>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {[
                       "Premium Author Kit (Delivered)",
                       "Name in Official Published Book",
                       "Author Profile on Website",
                       "Professional Verification Link"
                     ].map((item, i) => (
                       <li key={i} className="text-xs text-ink-400 font-sans italic flex items-center gap-3">
                         <span className="w-1 h-1 rounded-full bg-gold/40" /> {item}
                       </li>
                     ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right: Registration Card */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
               <div className="bg-ink-900 p-8 md:p-12 text-white relative shadow-2xl overflow-hidden group border border-white/5">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-[0.03] transform skew-x-12 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                  
                  <div className="flex justify-between items-start mb-10 relative z-10">
                     <div>
                        <div className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-gold mb-2">DEADLINE APPROACHING</div>
                        <div className="text-2xl font-serif font-black flex items-center gap-3">
                           <Clock className="w-6 h-6 text-gold" />
                           {new Date(anthology.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                     </div>
                     <div className="bg-gold px-4 py-2 text-ink-900 text-[10px] font-sans font-black uppercase tracking-widest leading-none">
                        OPEN
                     </div>
                  </div>
                  
                  <h5 className="text-lg font-serif font-black mb-8 border-b border-white/10 pb-6 relative z-10 italic">Secure Your Spot. Today.</h5>
                  
                  <div className="space-y-8 mb-12 relative z-10">
                     <div className="flex items-center gap-6 group/row">
                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover/row:border-gold transition-colors duration-500">
                           <Users className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                           <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-white/50">Capacity</div>
                           <div className="text-sm font-sans font-black uppercase">20 SPOTS LEFT ACROSS INDIA</div>
                        </div>
                     </div>

                     <div className="py-6 border-y border-white/10">
                       <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-white/50 mb-1 text-center">Total Participation Fee</div>
                       <div className="text-3xl md:text-2xl font-serif font-black text-gold text-center">₹999 <span className="text-xs font-sans font-normal text-white/40 ml-2 font-light uppercase tracking-widest">(Includes Kit & Shipping)</span></div>
                     </div>
                  </div>

                  <Link href={`https://wa.me/918368565256?text=I%20want%20to%20be%20published%20in%20${encodeURIComponent(anthology.title)}`} className="group/btn relative block">
                     <div className="absolute inset-0 border border-gold translate-x-1 translate-y-1 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0 transition-transform duration-300 pointer-events-none" />
                     
                     <button className="relative w-full bg-white text-ink-900 font-sans uppercase tracking-[0.2em] py-8 text-xs font-black hover:bg-gold transition-colors shadow-2xl flex items-center justify-center gap-4">
                        REGISTER NOW
                        <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                          <MoveRight className="w-4 h-4" />
                        </motion.div>
                     </button>
                  </Link>

                  <div className="mt-8 text-center">
                    <p className="text-[9px] font-sans font-bold uppercase tracking-[0.3em] text-white/40">Secured via Stripe & Razorpay</p>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
