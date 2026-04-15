'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Trophy, Star, ShieldCheck, Clock, BookOpen, 
  PenTool, CheckCircle2, ChevronRight, Award, Zap, 
  XCircle, Mail, MapPin, Video, BookMarked, 
  ArrowRight, Users, CheckSquare, Bookmark
} from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function ShakespeareAwardClient() {
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 14, minutes: 29, seconds: 58 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-parchment-light font-sans selection:bg-gold selection:text-black overflow-x-hidden">
      
      {/* --- SCARCITY TOP BANNER --- */}
      <div className="bg-[#5c1313] border-b border-[#7a1b1b] text-[#f5f0e1] py-2.5 px-3 text-center text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold sticky top-0 z-50 flex items-center justify-center gap-2">
        <span className="animate-pulse shadow-red-500/50 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">🔴</span> 
        Volume 2 is Live — Only 200 Total Seats. 
        <span className="hidden sm:inline"> When filled, registration closes immediately.</span>
      </div>

      {/* --- SECTION 1: HERO OUTCOME & PROOF --- */}
      <section className="relative pt-12 pb-20 overflow-hidden text-center">
        {/* Background dimension */}
        <div className="absolute top-0 right-0 w-3/4 h-full bg-ink-charcoal opacity-40 transform -skew-x-12 translate-x-32 pointer-events-none border-l border-white/5"></div>
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-3 mb-8"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-ink-500">Presented by Inkfetish Publications</span>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-gold/20 bg-[#0a0a0a] text-gold text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase shadow-sm">
              <Award className="w-3.5 h-3.5" />
              The Absolute Highest Literary Honor
            </div>
          </motion.div>

          {/* Featured Image Moved Above Headline for Mobile/Desktop Balance */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative rounded-sm overflow-hidden border border-white/5 bg-[#030303] shadow-2xl p-2 w-full max-w-2xl mb-12"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none z-10"></div>
            <Image
              src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1776189507/Banner_SPA_hudujw_xkk65b-compressed_oho1wm.webp"
              alt="The Shakespeare Poetry Award Volume 2"
              width={800}
              height={800}
              className="w-full h-auto object-cover opacity-95 transition-transform duration-1000 hover:scale-105"
              priority
            />
            <div className="absolute bottom-4 right-4 z-20 bg-[#0a0a0a]/90 backdrop-blur-md px-4 py-2 border border-white/10 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[9px] uppercase tracking-widest text-[#fdfbf7] font-bold">Accepting Entries</span>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[2.25rem] sm:text-4xl md:text-5xl lg:text-7xl font-serif font-black leading-[1.05] mb-8 text-[#fdfbf7] tracking-tight max-w-4xl"
          >
            Shakespeare Poetry Award <br className="hidden sm:block" /> 
            <span className="italic text-gold opacity-90 block mt-2 text-3xl sm:text-4xl md:text-6xl">Volume 2 Is Here.</span>
          </motion.h1>

          {/* Emotional Subheadline */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12 border-t border-b border-gold/20 bg-gradient-to-r from-transparent via-gold/5 to-transparent py-6 w-full max-w-3xl"
          >
            <p className="text-base sm:text-xl text-[#fdfbf7] font-medium leading-relaxed mb-3 font-serif">
              150 Poets Competed in Season 1. All Were Published. All Were Celebrated.
            </p>
            <p className="text-sm sm:text-base text-ink-400 font-light tracking-wide uppercase">
              Volume 2 has exactly 200 seats. And they are filling fast.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-6 max-w-lg w-full"
          >
            <div className="text-center w-full">
              <span className="inline-block text-[10px] text-red-500 font-bold uppercase tracking-widest bg-red-900/10 px-4 py-1 border border-red-900/30 mb-4 rounded-full">
                ⚠️ Only 200 seats. Once filled — closed. No exceptions.
              </span>
            </div>

            <Link href="/shakespeare-award-v2/register" className="w-full relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-gold/50 to-gold/10 rounded-sm blur opacity-40 group-hover:opacity-70 transition duration-500"></div>
              <button className="relative w-full px-8 py-5 bg-gold hover:bg-[#FDFBF7] text-[#050505] font-black text-xs sm:text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3">
                Claim My Seat — Register Now <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

            {/* Offer Summary Box under CTA - SCALED UP as requested */}
            <div className="mt-4 p-8 bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/10 rounded-sm shadow-2xl text-left w-full lg:w-[110%] lg:-mx-[5%]">
              <h4 className="text-xs sm:text-sm uppercase tracking-widest text-gold font-bold mb-5 border-b border-white/5 pb-3 text-center">The Ultimate Guarantee</h4>
              <ul className="space-y-5">
                <li className="flex items-start gap-4 text-xs sm:text-sm text-white leading-relaxed">
                  <Trophy className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span><strong className="text-gold text-[13px] sm:text-[15px] block font-bold mb-1">Top 10 Winners:</strong> Receive the official Shakespeare Poetry Award and a Heavy-Weight Physical Medal.</span>
                </li>
                <li className="flex items-start gap-4 text-xs sm:text-sm text-ink-300 leading-relaxed">
                  <Mail className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <span><strong className="text-white text-[13px] sm:text-[15px] block font-bold mb-1">For All Participants:</strong> Physical Certificate of Excellence and an Appreciation Letter delivered directly to your home.</span>
                </li>
                <li className="flex items-start gap-4 text-xs sm:text-sm text-ink-300 leading-relaxed">
                  <BookOpen className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <span><strong className="text-white text-[13px] sm:text-[15px] block font-bold mb-1">Publication:</strong> Every single participating poet gets published in the real, permanent Shakespeare printed anthology.</span>
                </li>
              </ul>
            </div>
          </motion.div>

        </div>

        {/* --- CREDIBILITY STRIP --- */}
        <div className="max-w-7xl mx-auto px-4 mt-16 md:mt-24 relative z-10">
          <div className="border-y border-white/5 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-white/5">
            <div className="flex flex-col items-center justify-center px-2">
              <span className="text-3xl font-black text-[#fdfbf7] font-serif">200</span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-ink-500 mt-2">Participant Limit</span>
            </div>
            <div className="flex flex-col items-center justify-center px-2">
              <span className="text-3xl font-black text-[#fdfbf7] font-serif">100<span className="text-gold">%</span></span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-ink-500 mt-2">Certificate Delivery</span>
            </div>
            <div className="flex flex-col items-center justify-center px-2">
              <span className="text-3xl font-black text-[#fdfbf7] font-serif">10</span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-ink-500 mt-2 leading-tight">Winners published in anthology</span>
            </div>
            <div className="flex flex-col items-center justify-center px-2">
              <MapPin className="w-8 h-8 text-[#fdfbf7] mb-1 opacity-90" />
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-ink-500 mt-1 leading-tight">Physical Home Delivery to all</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: THE BACKSTORY & VISUAL PROOF (EDITORIAL LEDGER) --- */}
      <section className="py-24 bg-[#030303] border-t border-white/5 relative overflow-hidden">
        {/* Giant background text watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="text-[22vw] font-black text-white/[0.015] uppercase tracking-widest select-none font-sans whitespace-nowrap">SEASON ONE</span>
        </div>

        <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">

          {/* Header */}
          <div className="mb-20">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-ink-600">Where It All Began</span>
            <h3 className="text-4xl md:text-6xl font-serif font-black text-[#fdfbf7] mt-4 leading-none">Season 1 Was a Promise.<br/><span className="text-gold italic">Here is the Proof.</span></h3>
          </div>

          {/* Row 1: Top 10 */}
          <div className="group relative py-12 flex flex-col md:flex-row md:items-center gap-8 md:gap-16 border-t border-white/5 hover:border-gold/20 transition-colors duration-700 cursor-default">
            {/* Glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            {/* Big Number */}
            <div className="shrink-0 relative z-10">
              <div className="text-[6rem] md:text-[9rem] font-black font-serif leading-none text-transparent bg-clip-text bg-gradient-to-b from-gold to-gold/20 drop-shadow-[0_0_30px_rgba(197,160,89,0.3)]">10</div>
              <div className="text-[9px] uppercase tracking-[0.3em] font-bold text-ink-500 mt-1">Top Winners</div>
            </div>

            {/* Gold vertical rule */}
            <div className="hidden md:block w-px h-28 bg-gradient-to-b from-transparent via-gold/40 to-transparent shrink-0"></div>

            {/* Text */}
            <div className="relative z-10 flex-1">
              <Trophy className="w-5 h-5 text-gold mb-3 opacity-70" />
              <h4 className="text-xl md:text-2xl font-serif font-black text-white mb-3">The Official Award & Heavy-Weight Medal</h4>
              <p className="text-sm text-ink-400 font-light leading-relaxed max-w-xl">
                In Shakespeare Poetry Award Season 1, the <strong className="text-white font-medium">Top 10 evaluated poets</strong> received the official Shakespeare Poetry Award trophy and a real, heavy-weight physical medal — delivered directly to their home. Not a digital badge. Not a certificate only. The full honour.
              </p>
            </div>
          </div>

          {/* Row 2: 100% Certificates */}
          <div className="group relative py-12 flex flex-col md:flex-row md:items-center gap-8 md:gap-16 border-t border-white/5 hover:border-gold/20 transition-colors duration-700 cursor-default">
            <div className="absolute inset-0 bg-gradient-to-r from-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            <div className="shrink-0 relative z-10">
              <div className="text-[6rem] md:text-[9rem] font-black font-serif leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] to-white/20">100<span className="text-5xl md:text-7xl">%</span></div>
              <div className="text-[9px] uppercase tracking-[0.3em] font-bold text-ink-500 mt-1">Certificate Delivery</div>
            </div>

            <div className="hidden md:block w-px h-28 bg-gradient-to-b from-transparent via-white/20 to-transparent shrink-0"></div>

            <div className="relative z-10 flex-1">
              <Mail className="w-5 h-5 text-gold mb-3 opacity-70" />
              <h4 className="text-xl md:text-2xl font-serif font-black text-white mb-3">Physical Certificates. Every Single Participant.</h4>
              <p className="text-sm text-ink-400 font-light leading-relaxed max-w-xl">
                Every one of the 150 Season 1 participants received a <strong className="text-white font-medium">real printed Shakespeare Poetry Certificate of Excellence</strong> — physically shipped to their address. No PDF attachment. No email substitute. Every promise kept.
              </p>
            </div>
          </div>

          {/* Row 3: Anthology */}
          <div className="group relative py-12 flex flex-col md:flex-row md:items-center gap-8 md:gap-16 border-t border-b border-white/5 hover:border-gold/20 transition-colors duration-700 cursor-default">
            <div className="absolute inset-0 bg-gradient-to-r from-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            <div className="shrink-0 relative z-10">
              <div className="text-[6rem] md:text-[9rem] font-black font-serif leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] to-white/20">150</div>
              <div className="text-[9px] uppercase tracking-[0.3em] font-bold text-ink-500 mt-1">Poets Published</div>
            </div>

            <div className="hidden md:block w-px h-28 bg-gradient-to-b from-transparent via-white/20 to-transparent shrink-0"></div>

            <div className="relative z-10 flex-1">
              <BookMarked className="w-5 h-5 text-gold mb-3 opacity-70" />
              <h4 className="text-xl md:text-2xl font-serif font-black text-white mb-3">All 150 Published in <span className="italic text-gold">"Shakespeare and What Remained"</span></h4>
              <p className="text-sm text-ink-400 font-light leading-relaxed max-w-xl">
                Every participating poet's work was included in the official printed anthology. Not shortlisted. Not conditionally. <strong className="text-white font-medium">All 150 poets became published authors</strong> in a real, permanent, ISBN-registered book.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 2B: IMAGE GALLERY OFF SEASON 1 WINNERS --- */}
      <section className="py-24 bg-gradient-to-b from-[#030303] to-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[400px] bg-gold/5 blur-[150px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 mb-16 text-center relative z-10">
          <h2 className="text-[10px] uppercase font-bold tracking-[0.3em] text-gold mb-4">The Real People Behind The Poems</h2>
          <h3 className="text-3xl md:text-5xl font-serif font-black text-[#fdfbf7]">Volume 1 Delivered.</h3>
        </div>

        {/* Row 1 Slider (Marquee style) */}
        <div className="relative w-full overflow-hidden flex pb-12 z-10 group">
          {/* First set */}
          <div className="flex gap-4 sm:gap-8 w-max animate-[marquee_30s_linear_infinite] group-hover:[animation-play-state:paused] pr-4 sm:pr-8">
            {[
              "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897715/WhatsApp_Image_2026-04-01_at_1.54.07_PM_3_-compressed_moo9ra.webp",
              "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897714/WhatsApp_Image_2026-04-01_at_1.54.07_PM_2_-compressed_j6w9sn.webp",
              "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897713/WhatsApp_Image_2026-04-01_at_1.54.07_PM_1_-compressed_slt2mj.webp",
              "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897712/WhatsApp_Image_2026-04-01_at_1.54.06_PM_3_-compressed_czwtzu.webp"
            ].map((src, i) => (
               <div key={`a-${i}`} className="w-[200px] sm:w-[260px] h-[280px] sm:h-[350px] relative rounded-sm border border-white/10 overflow-hidden shadow-xl shrink-0">
                <Image src={src} alt={`Volume 1 winner ${i}`} fill className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" />
              </div>
            ))}
          </div>
          {/* Duplicate set for infinite loop */}
          <div className="flex gap-4 sm:gap-8 w-max animate-[marquee_30s_linear_infinite] group-hover:[animation-play-state:paused] pr-4 sm:pr-8" aria-hidden="true">
            {[
              "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897715/WhatsApp_Image_2026-04-01_at_1.54.07_PM_3_-compressed_moo9ra.webp",
              "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897714/WhatsApp_Image_2026-04-01_at_1.54.07_PM_2_-compressed_j6w9sn.webp",
              "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897713/WhatsApp_Image_2026-04-01_at_1.54.07_PM_1_-compressed_slt2mj.webp",
              "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897712/WhatsApp_Image_2026-04-01_at_1.54.06_PM_3_-compressed_czwtzu.webp"
            ].map((src, i) => (
              <div key={`b-${i}`} className="w-[200px] sm:w-[260px] h-[280px] sm:h-[350px] relative rounded-sm border border-white/10 overflow-hidden shadow-xl shrink-0">
                <Image src={src} alt={`Volume 1 winner loop ${i}`} fill className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 Staggered Static Collage - Stacked below */}
        <div className="max-w-7xl mx-auto px-4 mt-8 pb-12 hidden md:block">
          <div className="flex justify-center items-center h-[400px] w-full relative">
            <div className="absolute -rotate-6 left-[10%] w-[350px] h-[300px] border-[8px] sm:border-[12px] border-[#e8e4db] bg-white shadow-2xl z-10 transition-transform hover:scale-105 hover:z-50 duration-500 cursor-pointer">
              <div className="relative w-full h-full"><Image src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897712/WhatsApp_Image_2026-04-01_at_1.54.06_PM_2_-compressed_l5bsna.webp" alt="Winner holding anthology" fill className="object-cover" /></div>
            </div>
            
            <div className="absolute rotate-3 z-30 w-[400px] h-[350px] border-[8px] sm:border-[12px] border-[#f5f0e1] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform hover:scale-105 hover:z-50 duration-500 cursor-pointer">
              <div className="relative w-full h-full"><Image src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897711/WhatsApp_Image_2026-04-01_at_1.54.05_PM_1_-compressed_eoiarj.webp" alt="Winner holding certificate" fill className="object-cover" /></div>
              <div className="absolute -bottom-4 -right-4 bg-gold text-[#050505] text-[10px] font-black tracking-widest px-4 py-2 uppercase shadow-xl">Real Physical Deliveries</div>
            </div>

            <div className="absolute -rotate-3 right-[10%] w-[350px] h-[300px] border-[8px] sm:border-[12px] border-[#e8e4db] bg-white shadow-2xl z-20 transition-transform hover:scale-105 hover:z-50 duration-500 cursor-pointer">
              <div className="relative w-full h-full"><Image src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897716/WhatsApp_Image_2026-04-07_at_12.09.27_AM-compressed_bzgl8t.webp" alt="Anthology in hands" fill className="object-cover" /></div>
            </div>
            
             <div className="absolute rotate-12 right-[5%] top-[10%] w-[250px] h-[200px] border-[8px] border-[#e8e4db] bg-white shadow-xl z-0 transition-transform hover:scale-105 hover:z-50 duration-500 cursor-pointer opacity-70 hover:opacity-100">
              <div className="relative w-full h-full"><Image src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897715/WhatsApp_Image_2026-04-07_at_12.09.27_AM_1_-compressed_ugjy5e.webp" alt="Anthology display" fill className="object-cover" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: VISUAL SCARCITY & EXCLUSIVITY --- */}
      <section className="py-24 px-4 bg-ink-charcoal border-y border-white/5 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          
          <h2 className="text-[10px] uppercase font-bold tracking-[0.3em] text-red-500 mb-6">The Number That Matters</h2>
          <h3 className="text-4xl md:text-6xl font-serif font-black text-white mb-8">200 Is The Participant Limit.</h3>
          
          <p className="text-base md:text-lg text-ink-400 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            Recognition loses meaning when it is handed to everyone without limit. The Shakespeare Poetry Award is prestigious because it is not for everyone. It is for the 200 who choose to show up.
          </p>

          {/* Graphical Progress Bar */}
          <div className="bg-[#050505] border border-red-900/30 p-6 md:p-10 text-left relative overflow-hidden shadow-[0_0_50px_rgba(122,27,27,0.1)]">
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-red-900/10 blur-[100px] pointer-events-none"></div>
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Users className="w-32 h-32 text-white" />
            </div>
            
            <div className="flex justify-between items-end mb-4 relative z-10">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-ink-500 font-bold mb-1">Volume 2 Capacity</div>
                <div className="text-2xl font-serif font-black text-white">153 <span className="text-sm font-sans font-light text-ink-500">/ 200 Seats Claimed</span></div>
              </div>
              <div className="text-[10px] uppercase tracking-widest text-[#a32727] font-bold animate-pulse">Filling Fast</div>
            </div>
            
            {/* The Bar */}
            <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden relative z-10 border border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '76.5%' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true }}
                className="h-full bg-gradient-to-r from-[#7a1b1b] to-red-500 relative"
              >
                {/* Shine effect passing through */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[marquee_2s_infinite]"></div>
              </motion.div>
            </div>
            
            <p className="text-[#a32727] text-[10px] uppercase tracking-widest font-bold mt-6 text-center">
              ⚠️ When this fills, registration is permanently closed. There is no waitlist.
            </p>
          </div>

          <div className="mt-10">
            <Link href="/shakespeare-award-v2/register" className="inline-block relative group">
              <button className="relative px-10 py-4 bg-transparent border border-red-900/50 hover:bg-red-900/10 text-white font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] transition-colors rounded-none">
                Claim One Of The Remaining Seats
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- SECTION 3B: THE CORE BENEFITS (WHY PARTICIPATE) --- */}
      <section className="py-24 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">

        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="text-[28vw] font-black text-white/[0.012] uppercase tracking-widest select-none font-sans whitespace-nowrap">WHY</span>
        </div>

        <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">

          <div className="mb-20">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-ink-600">Beyond The Trophy</span>
            <h3 className="text-4xl md:text-6xl font-serif font-black text-white mt-4 leading-none">Why This Award <br/><span className="text-gold italic">Actually Matters.</span></h3>
          </div>

          {/* Benefit 1: Credibility */}
          <div className="group relative py-14 flex flex-col md:flex-row md:items-center gap-8 md:gap-16 border-t border-white/5 hover:border-gold/20 transition-all duration-700 cursor-default">
            <div className="absolute inset-0 bg-gradient-to-r from-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            {/* Large keyword */}
            <div className="shrink-0 relative z-10 min-w-[200px]">
              <ShieldCheck className="w-6 h-6 text-gold mb-4 opacity-60" />
              <div className="text-[3.5rem] md:text-[5rem] font-black font-serif leading-none text-transparent bg-clip-text bg-gradient-to-b from-gold to-gold/20">Cred-<br/>ibility.</div>
            </div>

            <div className="hidden md:block w-px h-32 bg-gradient-to-b from-transparent via-gold/30 to-transparent shrink-0"></div>

            <div className="relative z-10 flex-1">
              <h4 className="text-lg md:text-xl font-serif font-black text-white mb-3">Your Author Portfolio. Instantly Elevated.</h4>
              <p className="text-sm text-ink-400 font-light leading-relaxed max-w-xl">
                The Shakespeare Poetry Award is not a participation sticker. It is an earned credential from a prestigious Indian literary publication. <strong className="text-white font-medium">Adding this to your bio, your portfolio, your Instagram — changes how people see you.</strong> Not just as a poet. As a serious author.
              </p>
            </div>
          </div>

          {/* Benefit 2: Legacy – flipped alignment */}
          <div className="group relative py-14 flex flex-col md:flex-row-reverse md:items-center gap-8 md:gap-16 border-t border-white/5 hover:border-gold/20 transition-all duration-700 cursor-default">
            <div className="absolute inset-0 bg-gradient-to-l from-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            <div className="shrink-0 relative z-10 min-w-[200px] md:text-right">
              <BookMarked className="w-6 h-6 text-gold mb-4 opacity-60 md:ml-auto" />
              <div className="text-[3.5rem] md:text-[5rem] font-black font-serif leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] to-white/20">Leg-<br/>acy.</div>
            </div>

            <div className="hidden md:block w-px h-32 bg-gradient-to-b from-transparent via-white/15 to-transparent shrink-0"></div>

            <div className="relative z-10 flex-1">
              <h4 className="text-lg md:text-xl font-serif font-black text-white mb-3">Social Media Posts Vanish. Books Don't.</h4>
              <p className="text-sm text-ink-400 font-light leading-relaxed max-w-xl">
                An Instagram reel is forgotten in 48 hours. A poem published in a real, printed, ISBN-registered anthology — <strong className="text-white font-medium">that exists on shelves for decades.</strong> Your great-grandchildren will be able to hold this book. That is what permanence looks like.
              </p>
            </div>
          </div>

          {/* Benefit 3: Exclusivity */}
          <div className="group relative py-14 flex flex-col md:flex-row md:items-center gap-8 md:gap-16 border-t border-white/5 hover:border-gold/20 transition-all duration-700 cursor-default">
            <div className="absolute inset-0 bg-gradient-to-r from-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            <div className="shrink-0 relative z-10 min-w-[200px]">
              <Users className="w-6 h-6 text-gold mb-4 opacity-60" />
              <div className="text-[3.5rem] md:text-[5rem] font-black font-serif leading-none text-transparent bg-clip-text bg-gradient-to-b from-gold to-gold/20">Only<br/>200.</div>
            </div>

            <div className="hidden md:block w-px h-32 bg-gradient-to-b from-transparent via-gold/30 to-transparent shrink-0"></div>

            <div className="relative z-10 flex-1">
              <h4 className="text-lg md:text-xl font-serif font-black text-white mb-3">You're Not Competing With Thousands. Just 200.</h4>
              <p className="text-sm text-ink-400 font-light leading-relaxed max-w-xl">
                Open contests have 5,000 entries. Most go unread. Here, we have <strong className="text-white font-medium">exactly 200 seats, no more.</strong> Every submission gets real attention. Every poet is part of something curated. This is intentionally elite. And that is exactly why it carries weight.
              </p>
            </div>
          </div>

          {/* Benefit 4: Honest Evaluation – flipped alignment */}
          <div className="group relative py-14 flex flex-col md:flex-row-reverse md:items-center gap-8 md:gap-16 border-t border-b border-white/5 hover:border-gold/20 transition-all duration-700 cursor-default">
            <div className="absolute inset-0 bg-gradient-to-l from-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            <div className="shrink-0 relative z-10 min-w-[200px] md:text-right">
              <CheckCircle2 className="w-6 h-6 text-gold mb-4 opacity-60 md:ml-auto" />
              <div className="text-[3.5rem] md:text-[5rem] font-black font-serif leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] to-white/20">Real<br/>Judges.</div>
            </div>

            <div className="hidden md:block w-px h-32 bg-gradient-to-b from-transparent via-white/15 to-transparent shrink-0"></div>

            <div className="relative z-10 flex-1">
              <h4 className="text-lg md:text-xl font-serif font-black text-white mb-3">No Algorithms. No Bots. Real Human Editors.</h4>
              <p className="text-sm text-ink-400 font-light leading-relaxed max-w-xl">
                Every submission is read by an actual human editor at Inkfetish Publications — evaluated against transparent, published literary criteria. <strong className="text-white font-medium">Your poem gets a fair, thoughtful reading.</strong> Not filtered by an AI, not skimmed past a bot. Real eyes. Real judgment. Real feedback.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 4: SPLIT-SCREEN RECOGNITION PACKAGE (WHAT YOU GET) --- */}
      <section className="py-24 px-4 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-[10px] uppercase font-bold tracking-[0.3em] text-gold mb-4">Your Complete Recognition Package</h2>
            <h3 className="text-3xl md:text-5xl font-serif font-black text-[#fdfbf7] max-w-4xl mx-auto leading-tight">
              Every Poet Walks Away With Something Real. <br/><span className="text-gold italic">The Top 10 Walk Away With Something Unforgettable.</span>
            </h3>
          </div>

          {/* Part 1: For ALL 200 */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
               <div className="h-px bg-gradient-to-r from-transparent to-white/10 flex-grow"></div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-black text-ink-500 bg-[#0a0a0a] px-6 py-2 border border-white/5 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.02)]">
                For All 200 Participants:
              </span>
              <div className="h-px bg-gradient-to-l from-transparent to-white/10 flex-grow"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 relative z-10">
              
              <div className="bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-white/5 p-8 group hover:border-gold/30 hover:shadow-[0_0_30px_rgba(197,160,89,0.1)] transition-all duration-500 rounded-sm">
                <Bookmark className="w-6 h-6 text-gold mb-5" />
                <h4 className="text-xl font-serif font-bold text-white mb-3">📜 Shakespeare Poetry Certificate</h4>
                <p className="text-[13px] sm:text-sm text-ink-400 font-light leading-relaxed">
                  Physically printed. Delivered to your home. <strong className="text-white font-bold">Not a PDF. Not an email attachment.</strong> A real, printed Shakespeare Poetry Certificate — with your name on it — delivered to your doorstep. The kind of document you frame. <strong className="text-gold">The kind you point to and say, "I was part of this."</strong>
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-white/5 p-8 group hover:border-gold/30 hover:shadow-[0_0_30px_rgba(197,160,89,0.1)] transition-all duration-500 rounded-sm">
                <Mail className="w-6 h-6 text-gold mb-5" />
                <h4 className="text-xl font-serif font-bold text-white mb-3">💌 Appreciation Letter</h4>
                <p className="text-[13px] sm:text-sm text-ink-400 font-light leading-relaxed mb-4">
                  Physical delivery — not an email. A personal appreciation letter — acknowledging your participation, your submission, your <strong className="text-white font-bold">courage to show up</strong>. Physical. Official. Signed. Delivered. 
                </p>
                <div className="text-[11px] font-bold uppercase tracking-widest text-ink-500 border-l mb-2 border-gold pl-3">Because showing up deserves more than an automated thank-you email.</div>
              </div>

              {/* Spanning Block: Published */}
              <div className="md:col-span-2 bg-[#0a0a0a] border border-gold/30 p-8 md:p-12 relative shadow-[0_0_40px_rgba(197,160,89,0.1)] overflow-hidden rounded-sm group hover:border-gold transition-colors duration-500">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/10 blur-[50px] pointer-events-none group-hover:bg-gold/20 transition-all duration-700"></div>
                <div className="absolute top-0 right-0 bg-gold px-3 py-1 text-[#050505] text-[8px] font-black uppercase tracking-[0.2em] shadow-lg">The Big One</div>
                <BookMarked className="w-8 h-8 text-gold mb-5 relative z-10" />
                <h4 className="text-3xl font-serif font-bold text-white mb-4 relative z-10">📚 Published In "Shakespeare And What Remained — Volume 2"</h4>
                
                <p className="text-sm sm:text-base text-ink-400 font-light max-w-4xl leading-relaxed relative z-10 mb-4">
                  <strong className="text-white font-bold block mb-2 text-lg">This is the big one. This is the permanent one.</strong>
                  Every one of the 200 registered poets will have their poem published in the official Volume 2 anthology. Not shortlisted. Not conditionally. <strong className="text-gold font-medium">Every single participating poet becomes a published poet.</strong> Your name. Your poem. A real book. Forever.
                </p>
                <p className="text-[10px] uppercase font-bold tracking-widest text-[#a32727] relative z-10 italic">
                  (See Anthology Section below — this deserves its own moment.)
                </p>
              </div>

               {/* Spanning Block: Hall of Fame */}
              <div className="md:col-span-2 bg-[#050505] border border-white/10 p-8 md:p-10 relative overflow-hidden group hover:border-gold/30 hover:shadow-[0_0_30px_rgba(197,160,89,0.1)] transition-all duration-500 rounded-sm">
                 <div className="absolute top-1/2 right-10 -translate-y-1/2 w-32 h-32 bg-white/5 blur-[40px] pointer-events-none group-hover:bg-gold/5 transition-all"></div>
                <Star className="w-6 h-6 text-gold mb-4 relative z-10" />
                <h4 className="text-xl font-serif font-bold text-white mb-2 relative z-10">🏆 Hall Of Fame Feature</h4>
                <p className="text-[13px] sm:text-sm text-ink-400 font-light max-w-3xl leading-relaxed relative z-10">
                  <strong className="text-white font-medium block mb-1">Your name lives beyond the contest.</strong>
                  Every participant will be featured in the Inkfetish Shakespeare Hall of Fame — a permanent record of every poet who was part of this award.
                </p>
              </div>

            </div>
          </div>

          {/* Part 2: For Top 10 */}
          <div className="mt-24">
             <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-gradient-to-r from-transparent to-gold/30 flex-grow"></div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-black text-[#050505] bg-gold px-6 py-2 border border-gold rounded-full shadow-[0_0_30px_rgba(197,160,89,0.3)]">
                For The Top 10 Winners:
              </span>
              <div className="h-px bg-gradient-to-l from-transparent to-gold/30 flex-grow"></div>
            </div>

            <p className="text-center text-sm font-bold uppercase tracking-widest text-ink-400 mb-10">Everything above — PLUS:</p>

            <div className="grid md:grid-cols-3 gap-6">
              
              <div className="bg-gradient-to-b from-ink-charcoal to-[#0a0a0a] border border-gold/40 p-8 relative shadow-[0_10px_40px_-20px_rgba(197,160,89,0.25)] hover:-translate-y-2 transition-transform duration-500 rounded-sm">
                <Trophy className="w-8 h-8 text-gold mb-5 drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]" />
                <h4 className="text-lg font-serif font-bold text-gold mb-2">🥇 The Shakespeare Poetry Award</h4>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#a32727] mb-3">The award itself. Named. Official. Historical.</div>
                <p className="text-[13px] text-ink-300 font-light leading-relaxed">
                  The Shakespeare Poetry Award — presented to the top 10 evaluated poets of Volume 2. <strong className="text-white">This is the award that carries the name.</strong> The one that goes on your author bio. The one that makes people lean forward and say, *"Tell me more."*
                </p>
              </div>

              <div className="bg-gradient-to-b from-ink-charcoal to-[#0a0a0a] border border-gold/40 p-8 relative shadow-[0_10px_40px_-20px_rgba(197,160,89,0.25)] hover:-translate-y-2 transition-transform duration-500 rounded-sm">
                <Award className="w-8 h-8 text-gold mb-5 drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]" />
                <h4 className="text-lg font-serif font-bold text-gold mb-2">🏅 A Real Medal</h4>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#a32727] mb-3">Physical. Delivered. Something to hold.</div>
                <p className="text-[13px] text-ink-300 font-light leading-relaxed">
                  A physical medal — delivered to your home. <strong className="text-white font-medium">Not a badge on a website. Not a digital trophy.</strong> Something you can hold in your hands, that has weight and texture and permanence. The kind of thing your family asks about. The kind of thing you keep.
                </p>
              </div>

              <div className="bg-gradient-to-b from-ink-charcoal to-[#0a0a0a] border border-gold/40 p-8 relative shadow-[0_10px_40px_-20px_rgba(197,160,89,0.25)] hover:-translate-y-2 transition-transform duration-500 rounded-sm">
                <Video className="w-8 h-8 text-gold mb-5 drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]" />
                <h4 className="text-lg font-serif font-bold text-gold mb-2">🎉 Live Zoom Recognition</h4>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#a32727] mb-3">Your name called. In front of everyone.</div>
                <p className="text-[13px] text-ink-300 font-light leading-relaxed">
                  The top 10 results will be announced LIVE — on a Zoom event that every participant attends. <strong className="text-white">Your name, called publicly, in front of the entire community of poets.</strong> That moment. That announcement. That feeling of hearing your name — is something we will make sure you never forget.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 5: HOW IT WORKS (FLOW DIAGRAM) --- */}
      <section className="py-24 px-4 bg-ink-charcoal border-y border-white/5 relative">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-[10px] uppercase font-bold tracking-[0.3em] text-ink-500 mb-4">Simple. Transparent.</h2>
            <h3 className="text-3xl md:text-5xl font-serif font-black text-[#fdfbf7]">Four Steps to Publication.</h3>
          </div>

          {/* Stepper Flow */}
          <div className="relative pl-6 sm:pl-0">
            {/* Desktop Vertical Line */}
            <div className="hidden sm:block absolute left-1/2 top-4 bottom-4 w-px bg-white/10 -translate-x-1/2"></div>
            {/* Mobile Vertical Line */}
            <div className="sm:hidden absolute left-8 top-4 bottom-4 w-px bg-white/10"></div>

            <div className="space-y-12 sm:space-y-20 relative z-10">
              
              {/* Step 1 */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-6 sm:gap-16">
                <div className="sm:w-1/2 sm:text-right order-2 sm:order-1 ml-10 sm:ml-0">
                  <h4 className="text-xl font-serif font-bold text-white mb-2">1. Secure Your Seat</h4>
                  <p className="text-sm text-ink-400 font-light">Click register and pay the entry fee. Your seat is secured, and your name is immediately assigned to Volume 2.</p>
                </div>
                <div className="w-12 h-12 bg-[#050505] border-2 border-gold rounded-full flex items-center justify-center text-gold font-bold text-lg order-1 sm:order-2 absolute sm:relative left-2 sm:left-auto shrink-0 shadow-[0_0_20px_rgba(197,160,89,0.3)]">1</div>
                <div className="sm:w-1/2 order-3 hidden sm:block"></div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-6 sm:gap-16">
                <div className="sm:w-1/2 order-1 hidden sm:block"></div>
                <div className="w-12 h-12 bg-[#050505] border border-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg order-1 sm:order-2 absolute sm:relative left-2 sm:left-auto shrink-0">2</div>
                <div className="sm:w-1/2 order-2 sm:order-3 ml-10 sm:ml-0">
                  <h4 className="text-xl font-serif font-bold text-white mb-2">2. Submit Your Poem</h4>
                  <p className="text-sm text-ink-400 font-light">Receive detailed submission guidelines. Write with intention. Submit before the deadline through our portal.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-6 sm:gap-16">
                <div className="sm:w-1/2 sm:text-right order-2 sm:order-1 ml-10 sm:ml-0">
                  <h4 className="text-xl font-serif font-bold text-white mb-2">3. Fair Evaluation</h4>
                  <p className="text-sm text-ink-400 font-light">Every poem is evaluated against published criteria by humans, not algorithms. Serious reading for serious work.</p>
                </div>
                <div className="w-12 h-12 bg-[#050505] border border-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg order-1 sm:order-2 absolute sm:relative left-2 sm:left-auto shrink-0">3</div>
                <div className="sm:w-1/2 order-3 hidden sm:block"></div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-6 sm:gap-16">
                <div className="sm:w-1/2 order-1 hidden sm:block"></div>
                <div className="w-12 h-12 bg-[#050505] border border-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg order-1 sm:order-2 absolute sm:relative left-2 sm:left-auto shrink-0">4</div>
                <div className="sm:w-1/2 order-2 sm:order-3 ml-10 sm:ml-0">
                  <h4 className="text-xl font-serif font-bold text-white mb-2">4. The Recognition</h4>
                  <p className="text-sm text-ink-400 font-light">Results announced LIVE. Certificates and medals shipped. Anthology published. Your name, immortalized.</p>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-20 text-center">
            <Link href="/shakespeare-award-v2/register" className="inline-block relative">
              <button className="px-8 py-3 border border-white/20 hover:bg-white/5 text-white text-[10px] uppercase tracking-widest font-bold transition-colors">
                Start Step 1 — Register
              </button>
            </Link>
          </div>

        </div>
      </section>

      {/* --- SECTION 6: FAQ --- */}
      <section className="py-24 px-4 bg-[#050505]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h2 className="text-[10px] uppercase font-bold tracking-[0.3em] text-ink-500 mb-4">Everything You Want to Know</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-black text-white">Ask Every Question. <br/><span className="italic text-gray-500 font-light font-serif">We'd rather you know than wonder.</span></h3>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {[
              {
                q: "Is the Shakespeare Poetry Award legitimate?",
                a: "Completely. Season 1 successfully ran in 2025. 150 poets participated, 100% of certificates were delivered, top 10 were awarded, and Volume 1 was published."
              },
              {
                q: "Is this truly limited to 200 participants?",
                a: "Strictly. Once 200 seats are filled, registration permanently closes. There will be no waitlist and no 'one more seat'."
              },
              {
                q: "Will my poem really be published?",
                a: "Yes. Every single one of the 200 registered participants will have their poem published in Volume 2. Not just the top 10. Everyone."
              },
              {
                q: "Physical delivery to my home?",
                a: "Yes. Certificates, appreciation letters, and medals are printed, signed, and physically shipped to your provided address. Not emailed."
              },
              {
                q: "What type of poem should I submit?",
                a: "Free verse, structured, narrative, lyric—all are welcomed. Detailed guidelines and themes are provided immediately after registration."
              },
              {
                q: "I am a beginner. Can I still enter?",
                a: "Absolutely. The award is for anyone who has something real to say and the courage to show up. Some of Volume 1's best works were from first-timers."
              }
            ].map((faq, i) => (
              <div key={i} className="group">
                <h4 className="text-sm font-bold text-white mb-2 flex items-start gap-2">
                  <span className="text-gold mt-0.5">•</span> {faq.q}
                </h4>
                <p className="text-[13px] text-ink-400 font-light leading-relaxed pl-3">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 7: THE FINAL CLOSER (BOTTOM CTA) --- */}
      <section id="register" className="py-32 px-4 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
        {/* Subdued background glow */}
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-gold/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black text-white mb-8 leading-tight">
            The Ones Who Submitted.<br/> <span className="italic text-gray-400 font-light">And the Ones Who Didn't.</span>
          </h2>
          <p className="text-sm md:text-base text-ink-400 mb-12 max-w-xl mx-auto font-light leading-relaxed text-left sm:text-center">
            The ones who submitted—their names will be in the anthology. Their certificates will be on their walls. There is no "next time" for Volume 2. The window is open. Right now.
          </p>
          
          <div className="bg-[#050505] border border-white/10 p-6 md:p-10 max-w-lg mx-auto shadow-2xl">
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-white mb-6">Secure Registration Portal</h3>
            
            <Link href="/shakespeare-award-v2/register" className="block w-full">
              <button className="w-full py-5 bg-gold hover:bg-[#FDFBF7] text-[#050505] font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3">
                <CheckCircle2 className="w-4 h-4 hidden sm:block" /> Claim My Seat Before It Closes
              </button>
            </Link>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 text-ink-600 text-[9px] uppercase tracking-widest font-bold mt-6">
              <div className="flex items-center justify-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> 100% Secure SSL</div>
              <div className="flex items-center justify-center gap-1.5"><Star className="w-3.5 h-3.5" /> Official Event</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
