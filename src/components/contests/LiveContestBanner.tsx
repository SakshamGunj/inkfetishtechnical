'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, ArrowRight, Zap, MapPin, Calendar, CheckCircle2, Trophy } from 'lucide-react';
import Link from 'next/link';

export function LiveContestBanner() {
  const contestName = "Poetry Festival — Season 2";
  const deadline = "May 31, 2026";
  const prizePool = "₹13,500+ Cash & Trophies";
  const regFee = "₹299 (Standard Entry)";

  return (
    <section id="active" className="relative">
      {/* URGENCY BANNER */}
      <div className="bg-red-600 py-3 relative overflow-hidden flex items-center justify-center gap-4 z-50">
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }} 
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]" 
        />
        <span className="text-[10px] md:text-xs font-sans font-black uppercase tracking-[0.3em] text-white">
          🔴 LIVE NOW — {contestName} is Open for Registration | Deadline: {deadline} | Limited Spots
        </span>
      </div>

      <div className="py-24 md:py-32 bg-[#FDFBF7] relative overflow-hidden border-b border-ink-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
              
              {/* Left Content */}
              <div className="lg:col-span-7">
                <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">CURRENTLY OPEN</h3>
                <h4 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tighter leading-none mb-12">
                   &quot;The Stage is Set. The Spots are Filling. <br/>
                   <span className="italic font-light text-ink-600">Will Your Name Be on the List?&quot;</span>
                </h4>
                
                <p className="text-base text-ink-600 font-sans font-light leading-relaxed mb-12 max-w-2xl">
                   Every few months, we open a new competition. Every time we do, writers who have seen what we&apos;ve built — the prizes we&apos;ve paid, the kits we&apos;ve shipped, the names we&apos;ve published — don&apos;t wait. <br/><br/>
                   Right now, <strong>{contestName}</strong> is live. This is not just a competition; it&apos;s a movement to find the next generation of Indian literary stars.
                </p>

                <div className="space-y-6 bg-white p-10 border border-ink-900/5 shadow-sm relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rotate-45 transform translate-x-16 -translate-y-16 group-hover:bg-gold/10 transition-colors" />
                   
                   <h5 className="relative z-10 text-[10px] font-sans font-black uppercase tracking-[0.4em] text-ink-900 mb-8 border-b border-ink-900/10 pb-4">WHO SHOULD JOIN?</h5>
                   
                   <ul className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                      {[
                        "Writers waiting for the 'right time'",
                        "Students building a writing portfolio",
                        "Beginners who want to start here",
                        "Writers who want a bigger stage",
                        "Future members of Inkfetish community"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-4 group/item">
                           <div className="mt-1 w-5 h-5 rounded-full border border-gold flex items-center justify-center group-hover/item:bg-gold transition-colors duration-300">
                              <CheckCircle2 size={10} className="text-gold group-hover/item:text-white" />
                           </div>
                           <span className="text-[10px] text-ink-600 font-black group-hover/item:text-ink-900 transition-colors uppercase tracking-tight">{item}</span>
                        </li>
                      ))}
                   </ul>

                   <div className="mt-12 pt-8 border-t border-ink-900/10 relative z-10">
                      <p className="text-[9px] font-sans font-bold text-ink-400 uppercase tracking-widest leading-relaxed">
                         ❌ You do NOT need to be an &quot;expert&quot; or &quot;professional&quot;. You just need a story. And the courage to submit it.
                      </p>
                   </div>
                </div>
              </div>

              {/* Right: Registration Card */}
              <div className="lg:col-span-12 xl:col-span-5 lg:sticky lg:top-32 w-full lg:max-w-md mx-auto">
                 <div className="bg-ink-900 p-8 md:p-12 text-white relative shadow-2xl overflow-hidden group border border-white/5">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-[0.03] transform skew-x-12 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                    
                    <div className="flex justify-between items-start mb-12 relative z-10">
                       <div>
                          <div className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-gold mb-2">LIMITED ENTRANT CAP</div>
                          <div className="text-2xl font-serif font-black flex items-center gap-3">
                             {contestName}
                          </div>
                          <div className="text-[10px] font-sans uppercase tracking-widest text-ink-400 mt-2 flex items-center gap-2">
                             <MapPin size={10} /> Global Online
                          </div>
                       </div>
                       <div className="bg-gold px-4 py-2 text-ink-900 text-[10px] font-sans font-black uppercase tracking-widest leading-none">
                          OPEN
                       </div>
                    </div>

                    <div className="space-y-6 mb-12 relative z-10 pt-10 border-t border-white/10">
                       <div className="flex justify-between items-end group/row">
                          <div className="flex flex-col">
                             <div className="text-[9px] font-sans font-bold uppercase tracking-[0.3em] text-white/40 mb-1">Total Prize Pool</div>
                             <div className="text-2xl font-serif font-black text-gold italic">{prizePool}</div>
                          </div>
                          <Trophy size={20} className="text-gold opacity-30 group-hover/row:opacity-100 transition-opacity" />
                       </div>

                       <div className="flex justify-between items-end group/row">
                          <div className="flex flex-col">
                             <div className="text-[9px] font-sans font-bold uppercase tracking-[0.3em] text-white/40 mb-1">Registration Fee</div>
                             <div className="text-lg font-serif font-black text-white italic">{regFee}</div>
                          </div>
                          <Zap size={20} className="text-gold opacity-30 group-hover/row:opacity-100 transition-opacity" />
                       </div>

                       <div className="flex justify-between items-end group/row">
                          <div className="flex flex-col">
                             <div className="text-[9px] font-sans font-bold uppercase tracking-[0.3em] text-white/40 mb-1">Submission Deadline</div>
                             <div className="text-lg font-serif font-black text-white italic">{deadline}</div>
                          </div>
                          <Calendar size={20} className="text-gold opacity-30 group-hover/row:opacity-100 transition-opacity" />
                       </div>
                    </div>

                    <div className="bg-white/5 p-6 mb-12 border border-white/5 backdrop-blur-sm relative overflow-hidden group/urgency text-center">
                       <motion.div 
                         initial={{ scale: 1 }} 
                         animate={{ scale: [1, 1.05, 1] }} 
                         transition={{ duration: 2, repeat: Infinity }}
                         className="relative z-10"
                       >
                          <div className="text-[10px] font-sans font-black uppercase tracking-[0.3em] text-[#39FF14] mb-2">⏳ FILLING FAST</div>
                          <div className="text-xl font-serif font-black text-white">Only 87 Spots Left This Season</div>
                       </motion.div>
                    </div>

                    <Link href="/poetry-festival-s2/register" className="group/btn relative block">
                       <div className="absolute inset-0 border border-gold translate-x-1 translate-y-1 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0 transition-transform duration-300 pointer-events-none" />
                       
                       <button className="relative w-full bg-white text-ink-900 font-sans uppercase tracking-[0.2em] py-8 text-xs font-black hover:bg-gold transition-colors shadow-2xl flex items-center justify-center gap-4">
                          REGISTER NOW — CLAIM YOUR SPOT
                          <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                             <ArrowRight size={16} />
                          </motion.div>
                       </button>
                    </Link>

                    <div className="mt-8 text-center">
                      <p className="text-[9px] font-sans font-bold uppercase tracking-[0.3em] text-white/40 leading-relaxed">
                        Once full, registration closes. No exceptions.
                      </p>
                    </div>
                 </div>
              </div>

           </div>
        </div>
      </div>
    </section>
  );
}
