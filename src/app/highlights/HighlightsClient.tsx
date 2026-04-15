'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Users, Globe, BookOpen, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

const stats = [
  { icon: <Users className="w-6 h-6" />, label: "Community", value: "200,000+", sub: "Digital Footprint" },
  { icon: <Trophy className="w-6 h-6" />, label: "Direct Prizes", value: "₹5.25L+", sub: "Awarded To Date" },
  { icon: <BookOpen className="w-6 h-6" />, label: "Author Imprints", value: "40+", sub: "Global Distributions" },
  { icon: <Globe className="w-6 h-6" />, label: "Global Presence", value: "15+", sub: "Countries Reached" },
];

const highlights = [
  {
    title: "IWL Season 2 Grand Finale",
    category: "Contest WINNER",
    desc: "The Indian Writers League Season 2 concluded with 15,000+ entries, awarding ₹1.25 Lakhs to the top 200 writers in a single night.",
    image: "/images/contest_hall_of_fame.jpg",
    tags: ["₹1.25L Prize", "15K Entries"]
  },
  {
    title: "The P.O.E.T. Framework™",
    category: "Methodology",
    desc: "Launched our proprietary publishing framework that has successfully transitioned 500+ hobbyists into published authors within 14 days.",
    image: "/images/poet_framework_launch.jpg",
    tags: ["500+ Authors", "Proprietary"]
  },
  {
    title: "Authorverse Summit 2026",
    category: "Summit EVENT",
    desc: "A massive online gathering of 2,000+ writers for the official launch of the Authorverse Portfolio ecosystem.",
    image: "/images/summit_launch_2026.jpg",
    tags: ["2K+ Participants", "Live Launch"]
  },
  {
    title: "Silfira: The Fantasy Debut",
    category: "Bestseller LAUNCH",
    desc: "Anwesha's debut fantasy novel 'Silfira' hit the Top 50 in Contemporary Fiction within 48 hours of its pre-order launch.",
    image: "/images/anwesha_silfira_launch.jpg",
    tags: ["Top 50 Amazon", "14-year-old Author"]
  }
];

const HighlightsClient = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-ink-900 font-serif selection:bg-ink-900 selection:text-[#FDFBF7]">
      <Navbar />

      {/* Hero Section - The Wall of Fame */}
      <section className="pt-40 pb-20 relative bg-white border-b border-ink-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-[10px] font-sans uppercase tracking-[0.4em] text-ink-400 font-black mb-6 flex items-center gap-2">
                <span className="w-8 h-px bg-ink-900/20" /> OUR STORY & MILESTONES
              </h2>
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-black font-serif text-ink-900 leading-[1.1] tracking-tighter uppercase italic">
                Our <br/><span className="italic font-light not-italic text-ink-500">Story.</span>
              </h1>

            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="max-w-sm border-l-4 border-ink-900 pl-6 py-2"
            >
              <p className="text-lg text-ink-600 font-sans font-light leading-relaxed">
                In two years, we've helped writers move millions of words and win lakhs in prizes. We're just getting started.
              </p>
            </motion.div>
          </div>

          {/* Core Impact Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-ink-900/10 border-t border-ink-900/10 pt-16">
            {stats.map((s, i) => (
              <div key={i} className="text-center md:text-left px-4">
                <div className="text-ink-900 mb-4 opacity-50">{s.icon}</div>
                <div className="text-3xl md:text-5xl font-black text-ink-900 mb-2 tracking-tighter">{s.value}</div>
                <div className="text-[10px] uppercase font-black tracking-widest text-[#9D00FF] mb-1">{s.label}</div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-ink-400">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cinematic Highlight Cards */}
      <section className="py-24 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {highlights.map((h, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
              >
                {/* Visual side */}
                <div className="flex-1 w-full">
                  <div className="aspect-video bg-white border-[4px] border-ink-900 shadow-[20px_20px_0_0_#9D00FF] relative overflow-hidden group">
                    {/* Visual accent: abstract lines or shapes */}
                    <div className="absolute inset-0 bg-ink-900/5 group-hover:bg-ink-900/0 transition-colors" />
                    <div className="h-full w-full flex items-center justify-center text-ink-100 font-black text-xs uppercase tracking-widest italic group-hover:scale-110 transition-transform duration-1000">
                        {h.category} VISUAL MODULE
                    </div>
                  </div>
                </div>

                {/* Content side */}
                <div className="flex-1 space-y-8">
                  <div className="inline-block bg-[#39FF14] text-ink-900 px-4 py-1 text-[10px] font-black uppercase tracking-widest border-2 border-ink-900">
                    {h.category}
                  </div>
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-ink-900 leading-[1.1] uppercase tracking-tighter italic">
                    {h.title}
                  </h3>

                  <p className="text-lg md:text-xl text-ink-600 font-sans font-light leading-relaxed">
                    {h.desc}
                  </p>
                  
                  <div className="flex gap-4 flex-wrap">
                    {h.tags.map(tag => (
                      <span key={tag} className="text-xs font-sans font-bold flex items-center gap-2 text-ink-500 uppercase tracking-widest border border-ink-900/10 px-4 py-2">
                        <CheckCircle2 size={12} className="text-ink-900" /> {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-8">
                    <Link href="/catalog" className="text-sm font-sans font-black uppercase tracking-[0.3em] flex items-center gap-3 group">
                        EXPLORE STORY <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievement Wall - Detailed Stats */}
      <section className="py-24 bg-ink-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <h2 className="text-xs font-sans uppercase tracking-[0.4em] text-ink-400 font-black italic">BY THE DISPATCH</h2>
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tighter italic uppercase text-white">
                Our <br/><span className="text-gold">Results.</span>
              </h3>
              <p className="text-lg text-ink-300 font-sans font-light leading-relaxed max-w-xl">
                 We work fast and we work hard to get your book in front of millions of people worldwide. Join the movement.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {[
                { label: "Instagram Reach", value: "1.2M", sub: "Monthly Impressions" },
                { label: "Judge Panels", value: "25+", sub: "Industry Critics" },
                { label: "Pre-order Sales", value: "₹2.5L", sub: "Single Author Launch" },
                { label: "Community Growth", value: "400%", sub: "Year Over Year" }
              ].map((stat, i) => (
                <div key={i} className="border-2 border-white/20 p-8 hover:border-[#39FF14] transition-colors group">
                  <div className="text-xs font-sans uppercase tracking-[0.2em] text-ink-400 font-black mb-2 group-hover:text-white transition-colors">{stat.label}</div>
                  <div className="text-4xl font-black italic tracking-tighter italic text-white mb-1">{stat.value}</div>
                  <div className="text-[10px] font-sans uppercase tracking-widest text-ink-500 font-bold">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-[#FDFBF7] text-center">
        <div className="max-w-4xl mx-auto px-4">
          <Star className="w-16 h-16 mx-auto mb-12 text-ink-900" strokeWidth={0.5} />
          <h2 className="text-3xl md:text-6xl lg:text-7xl font-black font-serif text-ink-900 leading-[1.1] tracking-tighter uppercase italic mb-12">
            Ready to <br/><span className="italic font-light not-italic text-gold">Highlight Yours?</span>
          </h2>

          <Link href="/signup">
            <button className="bg-ink-900 text-white font-sans uppercase tracking-[0.4em] py-8 px-16 font-black hover:bg-[#39FF14] hover:text-ink-900 transition-all border-2 border-ink-900 shadow-[8px_8px_0_0_#9D00FF]">
              CLAIM YOUR SPACE
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default HighlightsClient;
