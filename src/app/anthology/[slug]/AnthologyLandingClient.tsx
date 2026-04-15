'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, CheckCircle2, ArrowRight, 
  BookOpen, Feather, Globe, 
  ShieldCheck, Zap
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface AnthologyLandingProps {
  slug: string;
}

const anthologyData: Record<string, any> = {
  'petals-and-scars': {
    title: 'Petals and Scars',
    tagline: 'Join Our Poetry Group.',
    theme: 'We want poems that are honest, raw, and beautiful. If you have a story to tell through poetry, we want to see it.',
    deadline: 'April 30, 2026',
    reward: '₹10,000 Prize + A Real Book Deal',
    curator: 'Inkfetish Team',
    accent: '#9D00FF'
  },
  'hearts-under-construction': {
    title: 'Hearts under Construction',
    tagline: 'Stories of Being Strong.',
    theme: 'We want stories about healing and getting better. If you have a story about resilience, submit it today.',
    deadline: 'Closed (Waitlist Open)',
    reward: 'Your Book in Stores Nationwide',
    curator: 'Inkfetish Editors',
    accent: '#39FF14'
  }
};

const AnthologyLandingClient = ({ slug }: AnthologyLandingProps) => {
  const data = anthologyData[slug] || {
    title: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '),
    tagline: 'An Inkfetish Book.',
    theme: 'Send us your best story or poem for our next big book.',
    deadline: 'TBD',
    reward: 'You become a published author',
    curator: 'Inkfetish Editors',
    accent: '#39FF14'
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-ink-900 font-serif selection:bg-ink-900 selection:text-[#FDFBF7]">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-24 relative overflow-hidden bg-white border-b border-ink-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="inline-flex items-center gap-2 bg-ink-900 text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest italic border border-ink-900 mb-8">
                <Sparkles size={12} className="fill-current text-[#39FF14]" /> SEND YOUR WORK
              </div>
              <h1 className="text-6xl md:text-9xl font-black font-serif text-ink-900 leading-[0.85] tracking-tighter uppercase italic mb-8">
                {data.title}. <br/><span className="italic font-light not-italic text-ink-400">{data.tagline}</span>
              </h1>
              <p className="text-xl md:text-2xl text-ink-600 font-sans font-light leading-relaxed mb-10 max-w-xl">
                {data.theme}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                 <Link href="/signup">
                    <Button className="bg-ink-900 text-white hover:bg-[#39FF14] hover:text-ink-900 rounded-none px-12 py-10 text-sm font-sans uppercase tracking-[0.4em] transition-all font-black shadow-[12px_12px_0_0_#9D00FF] border-2 border-ink-900">
                      SUBMIT NOW <ArrowRight className="ml-4" />
                    </Button>
                 </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block"
            >
               <div className="aspect-square bg-white border-[8px] border-ink-900 p-12 shadow-[32px_32px_0_0_rgba(0,0,0,0.05)] relative group overflow-hidden flex flex-col justify-center items-center text-center">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#39FF14] rotate-45 translate-x-12 -translate-y-12 border-2 border-ink-900" />
                  <Feather className="w-24 h-24 text-ink-900 mb-8 opacity-50" strokeWidth={0.5} />
                  <div className="text-5xl font-black italic tracking-tighter uppercase mb-4">{data.title}</div>
                  <div className="text-[10px] uppercase font-black tracking-widest text-[#9D00FF]">2026 COLLECTION</div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Specs Dashboard */}
      <section className="py-24 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-xs font-sans uppercase tracking-[0.4em] text-ink-500 font-black mb-4">THE DETAILS</h2>
              <h3 className="text-4xl md:text-6xl font-serif font-black text-ink-900 tracking-tighter italic uppercase">Everything counts.</h3>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: "Due Date", value: data.deadline, icon: <Zap className="text-gold" /> },
                { label: "What You Get", value: data.reward, icon: <ShieldCheck className="text-[#39FF14]" /> },
                { label: "Who is in charge", value: data.curator, icon: <Globe className="text-[#9D00FF]" /> }
              ].map((spec, i) => (
                <div key={i} className="bg-white border-2 border-ink-900 p-10 shadow-[8px_8px_0_0_rgba(0,0,0,0.05)] hover:shadow-[12px_12px_0_0_#39FF14] transition-all group">
                   <div className="w-12 h-12 bg-[#FDFBF7] border border-ink-900/10 flex items-center justify-center mb-8 group-hover:bg-ink-900 group-hover:text-white transition-colors">
                      {spec.icon}
                   </div>
                   <div className="text-xs font-sans uppercase tracking-widest text-ink-400 font-bold mb-2">{spec.label}</div>
                   <div className="text-2xl font-serif font-bold text-ink-900">{spec.value}</div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Trust & Verification */}
      <section className="py-24 bg-ink-900 text-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1">
                <h3 className="text-4xl md:text-6xl font-serif font-black tracking-tighter uppercase italic leading-none mb-6">
                  100% Real <br/><span className="text-[#39FF14]">Results.</span>
                </h3>
                <p className="text-lg text-ink-300 font-sans font-light leading-relaxed max-w-xl">
                  We don't do fake promises. Every book we announce gets printed and shipped to authors worldwide. Join the thousands who trust our system.
                </p>
            </div>
            <div className="flex-shrink-0 grid grid-cols-2 gap-4">
                <div className="w-32 h-32 border-2 border-white/20 flex flex-col items-center justify-center text-center p-4">
                    <div className="text-2xl font-black italic">200K+</div>
                    <div className="text-[8px] uppercase tracking-widest text-ink-500">AUTHORS</div>
                </div>
                <div className="w-32 h-32 border-2 border-white/20 flex flex-col items-center justify-center text-center p-4">
                    <div className="text-2xl font-black italic">40+</div>
                    <div className="text-[8px] uppercase tracking-widest text-ink-500">BOOKS</div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default AnthologyLandingClient;
