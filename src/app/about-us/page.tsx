'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { BookOpen, Users, Globe, Feather } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-ink-900 font-serif selection:bg-ink-900 selection:text-[#FDFBF7]">
      <Navbar />
      
      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase leading-[0.85]">
              We Make <br/>
              <span className="italic font-light">Books.</span>
            </h1>
            <p className="text-xl md:text-2xl text-ink-600 max-w-2xl mx-auto font-sans font-light leading-relaxed">
              We are a team of writers who help other writers get published. We have a community of 200,000+ people and we're just getting started.
            </p>
          </motion.div>
        </section>

        {/* Our Story */}
        <section className="bg-white border-y border-ink-900/10 py-24 mb-24">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-xs font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">OUR STORY</h2>
              <h3 className="text-4xl font-serif font-black mb-8 leading-tight">Why We <span className="italic">Started.</span></h3>
              <p className="font-sans font-light text-ink-700 text-lg leading-relaxed mb-6">
                We saw that big publishers were making it too hard for new writers. Thousands of great stories were being lost because of "gatekeepers" who didn't understand.
              </p>
              <p className="font-sans font-light text-ink-700 text-lg leading-relaxed">
                We built Inkfetish to give every writer a real chance to see their name on a physical book. Today, we're one of the fastest-growing publishers in the country.
              </p>
            </div>
            <div className="aspect-square bg-[#FDFBF7] border border-ink-900/10 p-12 flex items-center justify-center relative overflow-hidden group">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/images/inkfetish_logo.png')] bg-center bg-no-repeat bg-contain transform scale-150 group-hover:scale-125 transition-transform duration-1000"></div>
               <div className="relative z-10 text-center">
                 <div className="text-7xl font-black italic text-ink-900 mb-2">2019</div>
                 <div className="text-xs font-sans uppercase tracking-[0.3em] text-gold">The Year It Began</div>
               </div>
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
           {[
             { icon: BookOpen, title: "Real Books", desc: "We believe your words belong on paper. Every project ends with a physical book." },
             { icon: Users, title: "The Group", desc: "Join 200,000+ writers who support each other and grow together." },
             { icon: Globe, title: "Sell Everywhere", desc: "We get your books on Amazon, Flipkart, and 15+ global markets." },
             { icon: Feather, title: "Pure Talent", desc: "No gatekeepers. If your work is good, we publish it. Simple as that." }
           ].map((pillar, i) => (
             <div key={i} className="p-8 border border-ink-900/10 hover:border-gold/30 transition-colors">
               <pillar.icon className="w-8 h-8 text-gold mb-6" strokeWidth={1} />
               <h4 className="text-xl font-serif font-black uppercase tracking-tight mb-4">{pillar.title}</h4>
               <p className="text-sm font-sans font-light text-ink-600 leading-relaxed">{pillar.desc}</p>
             </div>
           ))}
        </section>
      </main>
    </div>
  );
}
