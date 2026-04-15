'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ArrowRight, Instagram, Trophy, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

const testimonials = [
  {
    name: "Priya S.",
    location: "Bihar",
    quote: "I never thought my poem could go this far. Inkfetish gave me confidence and clarity. Now my book is coming out next month!",
    label: "Published Author",
    year: "2024",
    impact: "Debut Book Deal"
  },
  {
    name: "Rohan M.", 
    location: "Pune",
    quote: "I joined just for fun. But I ended up winning the 2nd prize and got my work published. Total game changer!",
    label: "₹40,000 Winner",
    year: "2023",
    impact: "IWL Season 2 Silver"
  },
  {
    name: "Sunita G.",
    location: "Delhi", 
    quote: "The judging report helped me improve my writing massively. This is the best writing event in India!",
    label: "Published Writer",
    year: "2024",
    impact: "Skill Transformation"
  },
  {
    name: "Aryan K.",
    location: "Mumbai",
    quote: "The attention to detail in their editorial process is unlike any other traditional publisher. They actually care.",
    label: "Bestselling Author",
    year: "2024",
    impact: "Top 100 Amazon"
  }
];

const TestimonialsClient = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-ink-900 font-serif selection:bg-ink-900 selection:text-[#FDFBF7]">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-20 relative border-b border-ink-900/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h2 className="text-[10px] font-sans uppercase tracking-[0.4em] text-ink-500 font-black mb-4 flex items-center justify-center gap-4">
                <span className="w-12 h-px bg-ink-900/20" /> WHAT WRITERS SAY <span className="w-12 h-px bg-ink-900/20" />
              </h2>
              <h1 className="text-5xl md:text-9xl font-black font-serif text-ink-900 leading-[0.85] tracking-tighter uppercase italic">
                Real Stories. <br/><span className="italic font-light not-italic">Real Impact.</span>
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-2xl text-ink-600 max-w-3xl font-sans font-light leading-relaxed mb-12"
            >
              We help writers become famous. Read the stories of authors who changed their lives by publishing with us.
            </motion.p>
          </div>
        </div>

        {/* Abstract Background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none w-full h-full flex items-center justify-center">
            <Quote className="w-[800px] h-[800px] text-ink-900" />
        </div>
      </section>

      {/* Grid of Stories */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {testimonials.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Brutalist Frame */}
                <div className="border-[4px] border-ink-900 bg-[#FDFBF7] p-8 md:p-12 shadow-[12px_12px_0_0_#9D00FF] transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[20px_20px_0_0_#9D00FF] h-full flex flex-col">
                  
                  {/* Rating/Meta */}
                  <div className="flex justify-between items-start mb-10">
                    <div className="flex gap-1 text-ink-900">
                      {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                    </div>
                    <span className="text-[10px] font-sans font-black uppercase tracking-[0.2em] bg-ink-900 text-white px-3 py-1">
                      {t.year} SUCCESS
                    </span>
                  </div>

                  {/* Main Quote */}
                  <blockquote className="text-2xl md:text-3xl font-serif font-bold text-ink-900 mb-10 leading-tight italic">
                    "{t.quote}"
                  </blockquote>

                  {/* Identity */}
                  <div className="mt-auto pt-8 border-t border-ink-900/10 flex justify-between items-end">
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-tighter">{t.name}</h3>
                      <p className="text-[10px] font-sans text-ink-500 uppercase tracking-widest font-bold">{t.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-sans font-black text-[#9D00FF] uppercase tracking-widest">{t.label}</p>
                      <p className="text-[9px] font-sans text-ink-400 uppercase tracking-widest mt-1 font-bold">{t.impact}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Massive Proof Section */}
      <section className="py-24 bg-ink-900 text-[#FDFBF7] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-16">
            <div className="flex-1">
              <h2 className="text-xs font-sans uppercase tracking-[0.4em] text-ink-400 font-black mb-6">OUR SUCCESS</h2>
              <h3 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-8">
                Our Success <br/><span className="italic font-light">In Numbers.</span>
              </h3>
              <p className="text-lg text-ink-300 font-sans font-light leading-relaxed mb-10 max-w-xl">
                We don't just read stories. We help you build a career. Join our community and get published worldwide.
              </p>
              
              <div className="grid grid-cols-2 gap-8 divide-x divide-ink-800">
                <div className="text-left font-sans">
                  <div className="text-4xl font-black text-[#39FF14] mb-2 tracking-tighter">186,000+</div>
                  <div className="text-[10px] uppercase font-bold tracking-widest">Active Community</div>
                </div>
                <div className="text-left font-sans pl-8">
                  <div className="text-4xl font-black text-[#9D00FF] mb-2 tracking-tighter">₹5.25L+</div>
                  <div className="text-[10px] uppercase font-bold tracking-widest">Direct Prize Pool</div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 relative group w-full lg:w-auto">
              {/* Brutalist Stat Card */}
              <div className="border-[4px] border-white bg-white/5 p-12 backdrop-blur-md relative overflow-hidden transition-all duration-700 hover:bg-white/10 group-hover:scale-105">
                <Users className="absolute -top-12 -right-12 w-48 h-48 opacity-[0.05] group-hover:rotate-12 transition-transform duration-1000" />
                <div className="text-center">
                  <Instagram className="w-12 h-12 mx-auto mb-6 text-[#39FF14]" strokeWidth={1} />
                  <div className="text-7xl md:text-8xl font-black text-white mb-4 tracking-tighter italic">200K+</div>
                  <div className="text-xs font-sans uppercase tracking-[0.4em] text-ink-400 font-black">Digital Footprint</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white border-t border-ink-900/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Trophy className="w-16 h-16 mx-auto mb-10 text-ink-900" strokeWidth={0.5} />
          <h2 className="text-4xl md:text-6xl font-serif font-black text-ink-900 leading-tight mb-8 uppercase italic">
            You Could Be <br/><span className="italic font-light not-italic">Our Next Winner.</span>
          </h2>
          <Link href="/launchpad">
            <button className="bg-ink-900 text-white font-sans uppercase tracking-[0.4em] py-8 px-16 font-black hover:bg-[#39FF14] hover:text-ink-900 transition-all border-2 border-ink-900 shadow-[8px_8px_0_0_#9D00FF]">
              GET STARTED <ArrowRight className="inline-block ml-4" />
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default TestimonialsClient;
