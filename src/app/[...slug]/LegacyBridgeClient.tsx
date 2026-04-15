'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ArrowLeft, Construction } from 'lucide-react';
import Link from 'next/link';

const LegacyBridgeClient = ({ path }: { path: string }) => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 text-center font-serif">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full border-4 border-ink-900 bg-white p-12 shadow-[12px_12px_0_0_rgba(0,0,0,1)]"
      >
        <div className="w-20 h-20 bg-ink-900 text-white flex items-center justify-center mx-auto mb-8 rounded-full">
          <Construction className="w-10 h-10" />
        </div>
        
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">PAGE COMING SOON</h1>
        <p className="text-xs font-sans uppercase tracking-[0.3em] text-ink-500 mb-8 border-b-2 border-ink-900 pb-4">Path: {path}</p>
        
        <div className="bg-ink-900/5 p-6 mb-12 text-left space-y-4 border-l-4 border-ink-900">
          <p className="text-sm font-sans font-bold uppercase leading-tight">We are currently updating this page to make it better for you.</p>
          <p className="text-sm font-sans font-light leading-relaxed">This page is part of our old system and is being moved to our new website. Don't worry, all your information is safe.</p>
        </div>

        <div className="flex flex-col gap-4">
          <Link href="/">
            <button className="w-full bg-ink-900 text-white font-sans uppercase tracking-widest py-6 font-black hover:bg-white hover:text-ink-900 border-2 border-ink-900 transition-all flex items-center justify-center gap-3">
              <ArrowLeft className="w-5 h-5" /> Go Back Home
            </button>
          </Link>
          
          <Link href="/catalog">
            <button className="w-full bg-transparent text-ink-900 font-sans uppercase tracking-widest py-6 font-bold hover:bg-ink-900 hover:text-white border-2 border-ink-900 transition-all">
              See All Books
            </button>
          </Link>
        </div>
        
        <p className="mt-12 text-[10px] font-sans uppercase tracking-widest text-ink-400 font-bold">Inkfetish Infrastructure • V3.0.0-Next</p>
      </motion.div>
    </div>
  );
};

export default LegacyBridgeClient;
