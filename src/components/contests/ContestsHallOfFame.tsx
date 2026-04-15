'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Trophy, ArrowRight, UserCheck } from 'lucide-react';

const pastContests = [
  {
    id: 1,
    title: "Poetry Contest / Festival",
    year: "2024",
    impact: "India's First Inkfetish Competition",
    hook: "We didn't know if anyone would show up. They did.",
    story: "Our first poetry contest brought 120 writers together around one shared belief — that poetry is not just art, it's conversation. We paid out a ₹50,000 prize pool and delivered on every promise. In a world of ghosting platforms, that was extraordinary enough.",
    metrics: ["120+ participants", "E-certificates for all", "₹50,000 prize pool — fully paid out", "100% delivery on every commitment"],
    accent: "bg-gold/5"
  },
  {
    id: 2,
    title: "Author Voice Writing Competition",
    year: "2025",
    impact: "Our Most Structured Contest Yet",
    hook: "Two stages. Real competition. Real rewards. A turning point.",
    story: "This contest introduced a 2-stage format — a qualification round followed by a final. 255 writers rose to the challenge. A ₹1,00,000 prize pool proved that Indian writers want a contest that respects their craft enough to take it seriously.",
    metrics: ["255 participants across 2 stages", "2 e-certificates per participant", "₹1,00,000 prize pool — fully paid out", "Detailed judging reports shared"],
    accent: "bg-ink-900/[0.03]"
  },
  {
    id: 3,
    title: "September Writing Competition",
    year: "2025",
    impact: "The Contest That Cemented Our Name",
    hook: "Not every contest needs to be the biggest. It just needs to be done right.",
    story: "Coming on the heels of Author Voice, this had a more welcoming energy. 230 writers entered. It directly fed into our first anthology, Petals and Scars — giving top participants a pathway into permanent publication.",
    metrics: ["230 participants", "₹75,000 prize pool — fully paid out", "E-certificates for all", "Anthology pathway for top writers"],
    accent: "bg-gold/5"
  },
  {
    id: 4,
    title: "Indian Writers League — Season 1",
    year: "2026",
    impact: "Our Biggest. Our Boldest. A National Statement.",
    hook: "This wasn't just a contest. This was a league.",
    story: "Season 1 brought 550+ writers together — from beginners to 20-year veterans. A ₹1,50,000 prize pool. Every participant received an appreciation letter. Premium physical kits with medals for selected participants provided real, tangible recognition.",
    metrics: ["550+ participants", "₹1,50,000 prize pool — fully paid out", "E-certificates for ALL participants", "Appreciation letters for participants", "Premium physical kits + medals"],
    accent: "bg-gold/10"
  }
];

export function ContestsHallOfFame() {
  return (
    <section id="hall-of-fame" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">CONTEST HALL OF FAME</h3>
          <h4 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tighter leading-none mb-4">
            &quot;Every Contest We&apos;ve Ever Hosted — <br/>
            <span className="italic font-light text-ink-600">And What We Delivered&quot;</span>
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {pastContests.map((contest, i) => (
            <motion.div 
              key={contest.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`p-10 md:p-14 border border-ink-900/5 ${contest.accent} relative group overflow-hidden flex flex-col`}
            >
              {/* Decorative Large Number */}
              <div className="absolute -top-10 -right-10 text-[180px] font-serif font-black text-ink-900/[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-1000 italic">0{contest.id}</div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="text-[10px] font-sans font-black uppercase tracking-[0.3em] text-gold mb-2">{contest.year} | {contest.impact}</div>
                    <h5 className="text-2xl md:text-3xl font-serif font-black uppercase tracking-tighter group-hover:text-gold transition-colors">{contest.title}</h5>
                  </div>
                  <Trophy size={32} className="text-gold opacity-10 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="space-y-6 mb-12 flex-grow">
                  <p className="text-lg text-ink-900 font-serif italic font-bold border-l-2 border-gold/30 pl-6 leading-tight">
                    &quot;{contest.hook}&quot;
                  </p>
                  <p className="text-base text-ink-600 font-sans font-light leading-relaxed">
                    {contest.story}
                  </p>
                </div>

                <div className="space-y-4 pt-8 border-t border-ink-900/10">
                  <p className="text-[10px] font-sans font-black uppercase tracking-widest text-ink-400 mb-4">WHAT WE DELIVERED:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                    {contest.metrics.map((metric, j) => (
                      <div key={j} className="flex items-center gap-3 group/item">
                        <CheckCircle2 size={14} className="text-[#39FF14] shrink-0" />
                        <span className="text-xs text-ink-900 font-sans font-black uppercase tracking-tight group-hover/item:text-gold transition-colors">{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total Growth Summary Visual */}
        <div className="mt-24 bg-ink-900 p-12 md:p-20 text-white relative overflow-hidden group">
           <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
           
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative z-10 items-center">
              <div className="lg:col-span-1 border-r border-white/10 pr-8">
                 <h5 className="text-xs font-sans font-black uppercase tracking-[0.5em] text-gold mb-4">THE BOTTOM LINE</h5>
                 <p className="text-2xl md:text-4xl font-serif font-black uppercase tracking-tighter leading-none">
                    1,155+ Writers. <br/>
                    ₹5,75,000+ Distributed.
                 </p>
              </div>

              <div className="lg:col-span-2 flex flex-wrap justify-between gap-12">
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center bg-white/5">
                       <UserCheck size={24} className="text-gold" />
                    </div>
                    <div>
                      <div className="text-3xl font-serif font-black text-white italic">4 successful</div>
                      <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#39FF14]">COMPETITIONS COMPLETED</div>
                    </div>
                 </div>

                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center bg-white/5">
                       <Trophy size={24} className="text-gold" />
                    </div>
                    <div>
                      <div className="text-3xl font-serif font-black text-white italic">100% Prize</div>
                      <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#39FF14]">PAYOUT GUARANTEE MET</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
