'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Feather, Award } from 'lucide-react';
import Navbar from '@/components/Navbar';

const AwardsClient = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-ink-900 font-serif selection:bg-ink-900 selection:text-[#FDFBF7]">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 md:pt-40 pb-16 md:pb-24 relative bg-white border-b border-ink-900/10 overflow-hidden min-h-[70vh] flex flex-col items-center justify-center">
        {/* Subtle SVG Grid Background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-awards" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-awards)" />
          </svg>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ink-900/20 to-transparent"></div>
        <div className="absolute right-0 top-1/4 w-1/4 h-1/2 opacity-[0.03] pointer-events-none transform translate-x-1/2">
           <Award className="w-full h-full text-ink-900" strokeWidth={0.5} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="w-16 h-16 bg-[#FDFBF7] rounded-full border border-ink-900/10 flex items-center justify-center mx-auto mb-8 shadow-sm group">
                <Award className="w-6 h-6 text-gold group-hover:scale-110 transition-all duration-500" strokeWidth={1.5} />
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1] text-ink-900">
              Writer <br/><span className="italic font-light">Awards.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-ink-600 font-sans font-light leading-relaxed mb-12 max-w-2xl mx-auto">
              We celebrate the best writers in our community. Here are the winners who have changed the world with their words.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Shakespeare Poetry Award Section */}
      <section className="py-24 md:py-32 relative bg-[#FDFBF7] border-b border-ink-900/10 overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-center">
               
               <div className="flex-1 relative z-10">
                 <div className="inline-flex items-center gap-2 px-4 py-2 border border-gold/30 bg-gold/5 mb-8 text-gold">
                    <Award className="w-4 h-4" strokeWidth={2} />
                    <span className="text-[10px] md:text-xs font-sans uppercase tracking-[0.2em] font-bold">Prestigious Honour</span>
                 </div>
                 
                 <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-ink-900 mb-8 leading-tight">
                   The Shakespeare <br/><span className="italic font-light text-ink-600">Poetry Award.</span>
                 </h3>
                 
                 <div className="font-sans font-medium text-ink-900 text-xl leading-relaxed mb-6 border-l-4 border-gold pl-6">
                   "Our previous award was the Shakespeare Poetry Award."
                 </div>

                 <p className="font-sans font-light text-ink-600 text-lg md:text-xl leading-relaxed mb-8">
                    This is our top award for poets. It's for those who write with real heart and skill.
                 </p>
                 <p className="font-sans font-light text-ink-600 leading-relaxed mb-12">
                    Winning this award means you're one of the best poets we've ever seen. It's a badge of honor for life.
                 </p>
                 
                 <div className="grid grid-cols-2 gap-8 pt-8 border-t border-ink-900/10">
                    <div>
                      <div className="text-3xl font-serif font-bold text-ink-900 mb-2">Exclusive</div>
                      <div className="text-xs font-sans uppercase tracking-widest text-ink-500">By Qualification</div>
                    </div>
                    <div>
                      <div className="text-3xl font-serif font-bold text-ink-900 mb-2">History</div>
                      <div className="text-xs font-sans uppercase tracking-widest text-ink-500">Monumental Scale</div>
                    </div>
                 </div>
               </div>

               <div className="flex-1 relative z-10 w-full">
                  <div className="aspect-[4/5] border border-ink-900/10 bg-white p-8 md:p-12 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl group">
                     {/* Decorative corner borders */}
                     <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-ink-900/20"></div>
                     <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-ink-900/20"></div>
                     <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-ink-900/20"></div>
                     <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-ink-900/20"></div>
                     
                     <div className="w-24 h-24 rounded-full border border-gold flex items-center justify-center mb-8 bg-gold/5 group-hover:scale-110 transition-all duration-700">
                        <Feather className="w-10 h-10 text-gold" strokeWidth={1.5} />
                     </div>
                     <h3 className="text-3xl md:text-4xl font-serif font-bold text-ink-900 mb-4">William Shakespeare</h3>
                     <h4 className="text-sm font-sans uppercase tracking-[0.4em] text-ink-500 mb-10">Poetry Award</h4>
                     
                     <div className="bg-[#FDFBF7] p-6 border border-ink-900/5">
                        <p className="font-sans font-light text-ink-600 text-sm leading-relaxed italic">
                          "To thine own self be true, and it must follow, as the night the day, thou canst not then be false to any man."
                        </p>
                     </div>
                  </div>
               </div>
               
            </div>
         </div>
      </section>

    </div>
  );
};

export default AwardsClient;
