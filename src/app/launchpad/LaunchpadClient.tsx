'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, BookOpen, 
  ArrowRight, CheckCircle2, Award, Lock, Phone, Mail
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';

const LaunchpadClient = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-ink-900 font-serif selection:bg-ink-900 selection:text-[#FDFBF7]">
      <Navbar />

      {/* 1. The Hook (Hero) */}
      <section className="pt-24 md:pt-40 pb-16 md:pb-24 relative bg-white border-b border-ink-900/10 overflow-hidden flex flex-col items-center justify-center min-h-[85vh]">
        {/* Subtle SVG Grid Background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-launchpad" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-launchpad)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-ink-900/20 bg-[#FDFBF7] mb-8">
               <Rocket className="w-4 h-4 text-ink-900" strokeWidth={1.5} />
               <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] font-bold text-ink-900">Immediate Action Required</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-serif text-ink-900 mb-6 leading-[1.1] tracking-tighter uppercase italic">
              PUBLISHED IN <br/><span className="italic font-light">28 DAYS</span>
            </h1>

            
            <p className="text-lg md:text-xl text-ink-600 font-sans font-light leading-relaxed mb-10 max-w-2xl mx-auto">
              "Stop waiting for 'someday.'"
            </p>

            
            <p className="text-lg text-ink-600 font-sans font-light leading-relaxed mb-12 max-w-2xl mx-auto">
              We turn your story into a real book in just 28 days. No more waiting. Join the program that actually gets results. From IDEA to PUBLICATION in just 4 weeks.
            </p>
            
            <Button 
               className="bg-ink-900 text-[#FDFBF7] hover:bg-gold hover:text-ink-900 rounded-none px-10 py-7 text-sm font-sans uppercase tracking-[0.2em] transition-all group shadow-none border-2 border-ink-900"
            >
              Secure Your Spot <ArrowRight className="w-4 h-4 ml-3 opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-transform" strokeWidth={1.5} />
            </Button>

            
            <p className="mt-6 text-xs font-sans text-ink-500 uppercase tracking-widest flex items-center justify-center gap-2 font-bold">
               <Lock className="w-3 h-3" strokeWidth={2} /> Spots are strictly limited per batch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. The 28-Day Architecture */}
      <section className="py-24 md:py-32 bg-[#FDFBF7] border-b border-ink-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-20">
             <h2 className="text-xs font-sans uppercase tracking-[0.3em] text-ink-500 mb-4 font-bold">The Process</h2>
             <h3 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tighter leading-tight">4 Weeks to <br/><span className="italic font-light text-ink-600">Publication.</span></h3>

           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-ink-900/10 divide-y md:divide-y-0 md:divide-x divide-ink-900/10 shadow-[0_20px_40px_rgba(0,0,0,0.02)]">
              {[
                { week: '01', title: 'The Idea', items: ['15 writing prompts', '1 piece per day', 'Daily submission', 'WhatsApp support'] },
                { week: '02', title: 'The Writing', items: ['Next 15 prompts', 'Polish daily', 'Workshop Release', 'Voice refinement'] },
                { week: '03', title: 'The Edit', items: ['3rd set prompts', 'MS shaping', 'Layout prep', 'Mentor guidance'] },
                { week: '04', title: 'The Launch', items: ['Final 15 prompts', 'Final MS Review', 'Formatting', 'Cover Design'] }
              ].map((w, i) => (
                <div key={i} className="bg-white p-10 flex flex-col hover:bg-ink-900 hover:text-[#FDFBF7] transition-all duration-500 group">
                  <div className="text-gold font-sans font-bold text-5xl mb-6 opacity-30 group-hover:opacity-100 transition-opacity">{w.week}</div>
                  <h4 className="text-2xl font-serif font-bold mb-6">{w.title}</h4>
                  <ul className="space-y-4 font-sans font-light text-sm flex-grow">
                    {w.items.map((item, j) => (
                      <li key={j} className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-3 mt-0.5 shrink-0 opacity-50" strokeWidth={1.5} />{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 3. Pricing */}
      <section className="py-24 md:py-32 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xs font-sans uppercase tracking-[0.3em] text-ink-500 mb-4 font-bold">Enroll Now</h2>
          <h3 className="text-4xl md:text-6xl font-serif font-bold text-ink-900 mb-12">Join The Program.</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-ink-900/10 p-12 bg-[#FDFBF7] flex flex-col">
              <span className="text-xs font-sans font-bold tracking-widest text-ink-400 mb-4 uppercase">Essential</span>
              <div className="text-3xl font-serif font-black mb-8">₹10,000</div>
              <Button variant="outline" className="mt-auto border border-ink-900/30 text-ink-900 hover:bg-ink-900 hover:text-white rounded-none py-6 text-xs uppercase tracking-widest font-black transition-all shadow-none">Enroll Essential</Button>

            </div>
            <div className="border-2 border-ink-900 p-12 bg-ink-900 text-white flex flex-col shadow-2xl">
              <span className="text-xs font-sans font-bold tracking-widest text-gold mb-4 uppercase">Premium</span>
              <div className="text-3xl font-serif font-black mb-8 text-gold">₹20,000</div>
              <Button className="mt-auto bg-white text-ink-900 hover:bg-gold border-2 border-white rounded-none py-6 text-xs uppercase tracking-widest font-black transition-all shadow-none">Enroll Premium</Button>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LaunchpadClient;
