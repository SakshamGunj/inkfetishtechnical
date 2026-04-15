'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Award, Trophy, Star, Users, Briefcase, TrendingUp, ShieldCheck, Heart } from 'lucide-react';

const reasons = [
  { icon: <Briefcase size={20} />, title: "Real, High Prize Pools", desc: "We don't offer ₹500 prizes and call it a competition. From ₹50,000 to ₹1,50,000 — our prize pools are industry-leading." },
  { icon: <ShieldCheck size={20} />, title: "Transparent, Fair Judging", desc: "No mystery. No favoritism. We share detailed judging reports so every participant understands where they stood." },
  { icon: <Award size={20} />, title: "Recognition for EVERYONE", desc: "Every participant receives an e-certificate. Every shortlisted writer gets an appreciation letter." },
  { icon: <Trophy size={20} />, title: "Premium Physical Kits", desc: "Medals. Printed letters. Curated physical rewards for top performers. Real things you can hold and be proud of." },
  { icon: <Star size={20} />, title: "A Path to Publication", desc: "Winning can open doors. Top writers get featured in our anthologies, unlocking a permanent publishing credit." },
  { icon: <Zap size={20} />, title: "Special Publishing Discounts", desc: "Participants unlock exclusive discounts on future Inkfetish publishing and anthology opportunities." },
  { icon: <TrendingUp size={20} />, title: "Growing Fast", desc: "550+ in one contest. 1,155+ total writers. ₹5,75,000+ given away. Every season gets bigger." },
  { icon: <Users size={20} />, title: "A Community", desc: "Our participants become part of a writer community — a network of people who write, compete, and grow together." },
  { icon: <ShieldCheck size={20} />, title: "We Deliver. Always.", desc: "98%+ delivery rate. Every prize paid. Every certificate sent. We have never left a winner without what we promised." },
  { icon: <Heart size={20} />, title: "Worth It Even If You Don't Win", desc: "The growth, the challenge, the recognition — participating changes how you see yourself as a writer." }
];

const tiers = [
  {
    level: "🥉 EVERY PARTICIPANT",
    list: [
      "E-Certificate of Participation — Official. Shareable. Credible.",
      "Community Access — Join a growing network of serious Indian writers",
      "The Experience — Submitting, competing, being part of something real",
      "Publishing Discount — Exclusive discount on future Inkfetish projects"
    ],
    accent: "bg-ink-900/5 border-ink-900/10"
  },
  {
    level: "🥈 SHORTLISTED / TOP PERFORMERS",
    list: [
      "Everything above, PLUS:",
      "Appreciation Letter — Official letter recognizing your achievement (resume-worthy)",
      "Anthology Feature Opportunity — Top 100–200 writers may be invited to feature"
    ],
    accent: "bg-[#FDFBF7] border-gold/40 shadow-xl scale-105 z-10"
  },
  {
    level: "🥇 WINNERS & TOP RANKED",
    list: [
      "Everything above, PLUS:",
      "Cash Prize — Your share of the prize pool, paid directly to you",
      "Premium Physical Kit — Curated kit delivered to your doorstep",
      "Medal (IWL and select contests)",
      "Social Media Feature — Winner spotlight on all platforms",
      "Permanent Publishing Credit — Your name, your achievement — forever"
    ],
    accent: "bg-ink-900 text-white border-white/10"
  }
];

export function ContestsValueProps() {
  return (
    <section className="py-24 md:py-32 bg-[#FDFBF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION 5: 10 REASONS */}
        <div className="mb-32">
          <div className="text-center mb-20">
            <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">WHAT MAKES US DIFFERENT</h3>
            <h4 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tighter leading-none mb-4">
              &quot;10 Reasons Serious Writers Choose <br/>
              <span className="italic font-light text-ink-600 lowercase">Inkfetish Over Every Other Contest&quot;</span>
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-ink-900/10 border border-ink-900/10">
            {reasons.map((reason, i) => (
              <div key={i} className="bg-white p-8 group hover:bg-[#FDFBF7] transition-colors duration-500">
                <div className="text-gold mb-6 group-hover:scale-110 transition-transform duration-500">{reason.icon}</div>
                <h5 className="text-[10px] font-sans font-black uppercase tracking-widest text-ink-900 mb-2 leading-tight">{i + 1}. {reason.title}</h5>
                <p className="text-[9px] text-ink-500 font-sans font-medium uppercase tracking-widest leading-relaxed">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 6: WHAT YOU GET */}
        <div>
          <div className="text-center mb-20">
            <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">YOUR COMPLETE CONTEST EXPERIENCE</h3>
            <h4 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tighter leading-none mb-6">
              &quot;Here&apos;s Everything You Walk Away With&quot;
            </h4>
            <p className="text-base text-ink-600 font-sans max-w-2xl mx-auto italic">
              Win or not — you gain more from an Inkfetish contest than from most writing experiences of your life.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20">
            {tiers.map((tier, i) => (
              <div key={i} className={`p-10 md:p-14 border ${tier.accent} transition-all duration-700 flex flex-col`}>
                <h5 className="text-xs font-sans font-black uppercase tracking-widest mb-10 pb-6 border-b border-current/10 italic text-center">
                   {tier.level}
                </h5>
                <ul className="space-y-6 flex-grow mb-10">
                  {tier.list.map((item, j) => (
                    <li key={j} className="flex items-start gap-4 group">
                      <div className="mt-1 w-5 h-5 rounded-full border border-gold flex items-center justify-center shrink-0">
                         <Check size={10} className="text-gold" />
                      </div>
                      <span className="text-[10px] font-sans font-bold uppercase tracking-widest leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                         {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto bg-white border border-ink-900/10 p-12 md:p-20 relative overflow-hidden shadow-sm">
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <Star size={100} className="text-ink-900" />
             </div>
             
             <h5 className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-gold mb-10 flex items-center gap-4">
               <span className="w-8 h-px bg-gold/30" /> THE INVISIBLE BENEFIT
             </h5>
             
             <div className="space-y-6 text-base md:text-xl text-ink-600 font-sans font-light leading-relaxed italic border-l-4 border-gold/20 pl-10">
                <p>There&apos;s one more thing you get from competing — something that doesn&apos;t fit in a bullet point.</p>
                <p className="text-ink-900 font-serif font-black uppercase tracking-tighter not-italic">You get proof that you took the risk.</p>
                <p>Most writers stay in their comfort zone. They write for themselves. They never enter. They never know. When you enter an Inkfetish contest, you choose differently. And that choice — regardless of where you rank — changes how you see yourself as a writer.</p>
                <p className="text-ink-900 font-serif font-black not-italic">That&apos;s priceless. And it&apos;s ours to give you.</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
