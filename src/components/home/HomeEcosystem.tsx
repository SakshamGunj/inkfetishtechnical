'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MoveRight, BookOpen, Trophy, Layers } from 'lucide-react';
import Link from 'next/link';

const paths = [
  {
    path: "PATH 1",
    title: "Publish Your Book",
    desc: "For the writer with a manuscript and a dream. Professional cover design. ISBN. Editing. Distribution. Royalties up to 100%.",
    link: "/services",
    icon: <BookOpen className="w-8 h-8 text-gold" />,
    cta: "Start Publishing"
  },
  {
    path: "PATH 2",
    title: "Join A Writing Contest",
    desc: "For the writer who wants to compete, win, and be seen. National-level competitions. Prize pools up to ₹1,50,000. Fair judging.",
    link: "/contests",
    icon: <Trophy className="w-8 h-8 text-gold" />,
    cta: "See Live Contests"
  },
  {
    path: "PATH 3",
    title: "Join An Anthology",
    desc: "For the writer who wants to be published — now. Submit your piece. See your name in a real, printed book. Receive your moment.",
    link: "/anthologies",
    icon: <Layers className="w-8 h-8 text-gold" />,
    cta: "Explore Anthologies"
  }
];

export function HomeEcosystem() {
  return (
    <section className="py-24 md:py-32 bg-[#FDFBF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">THREE PATHS. ONE BRAND.</h3>
          <h4 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black uppercase tracking-tighter leading-none mb-4">
            &quot;However You Want to Grow <br/>
            <span className="italic font-light text-ink-600 block mt-2 lowercase">We Have the Path.&quot;</span>
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {paths.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-12 md:p-14 border border-ink-900/5 shadow-sm group hover:border-gold/30 hover:shadow-2xl transition-all duration-700 h-full flex flex-col"
            >
              <div className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-ink-300 mb-8 border-b border-ink-900/5 pb-4">
                {item.path}
              </div>
              <div className="w-16 h-16 rounded-full bg-[#FDFBF7] border border-ink-900/5 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>
              <h5 className="text-2xl font-serif font-black uppercase tracking-tighter mb-6">{item.title}</h5>
              <p className="text-xs text-ink-500 font-sans font-black uppercase tracking-[0.1em] leading-relaxed italic mb-12 flex-grow">
                {item.desc}
              </p>
              <Link href={item.link} className="group/btn">
                 <button className="flex items-center gap-4 text-[10px] font-sans font-black uppercase tracking-[0.3em] text-ink-900 group-hover/btn:translate-x-2 transition-transform">
                    {item.cta} <MoveRight size={14} className="text-gold" />
                 </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
