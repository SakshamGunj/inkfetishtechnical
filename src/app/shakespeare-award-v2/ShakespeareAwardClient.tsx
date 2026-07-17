'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Trophy, Star, ShieldCheck, Clock, BookOpen, 
  PenTool, CheckCircle2, ChevronRight, Award, Zap, 
  XCircle, Mail, MapPin, Video, BookMarked, 
  ArrowRight, Users, CheckSquare, Bookmark, Globe
} from 'lucide-react';
import Link from 'next/link';

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
    <div className="min-h-screen overflow-x-hidden bg-[#14100C] text-parchment-light font-sans selection:bg-gold selection:text-[#14100C] overflow-x-hidden relative"
      style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #2A2118 0%, #14100C 60%)' }}>
      
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23c5a059\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

      {/* --- SCARCITY TOP BANNER --- */}
      <div className="bg-[#4A1C16] border-b border-[#7A2B20] text-[#f5f0e1] py-2.5 px-3 text-center text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold sticky top-0 z-50 flex items-center justify-center gap-2 shadow-xl shadow-black/50">
        <span className="animate-pulse shadow-red-500/50 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">🔴</span> 
        Volume 2 is Live — Only 200 Total Seats. 
        <span className="hidden sm:inline"> When filled, registration closes immediately.</span>
      </div>

      {/* --- SECTION 1: HERO --- */}
      <section className="relative min-h-[80vh] lg:min-h-[85vh] flex items-center overflow-hidden text-center lg:text-left">
        
        {/* === BACKGROUND LAYERS === */}
        {/* Deep radial glow behind image */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.12)_0%,transparent_70%)] pointer-events-none"></div>
        {/* Left ambient light */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.05)_0%,transparent_70%)] pointer-events-none"></div>
        {/* Horizontal decorative line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/10 to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-4 pb-8 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-[auto_auto] gap-0 lg:gap-8 items-center">
            
            {/* ======= BLOCK 1: TITLE (order-1 mobile, row-1 col-1 desktop) ======= */}
            <div className="flex flex-col items-center lg:items-start order-1 lg:order-1 lg:row-start-1 lg:col-span-5 lg:pb-6">
              
              {/* Eyebrow Label */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-3 flex items-center gap-3"
              >
                <div className="w-8 sm:w-14 h-[1px] bg-gradient-to-r from-transparent to-gold/60"></div>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] font-bold text-gold/70">
                  By Inkfetish Publications
                </span>
                <div className="w-8 sm:w-14 h-[1px] bg-gradient-to-l from-transparent to-gold/60"></div>
              </motion.div>

              {/* Honor Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 }}
                className="mb-4 inline-flex items-center gap-2.5 bg-[#1A1613] border border-gold/30 text-[#ebd298] text-[10px] sm:text-[11px] font-black tracking-[0.25em] uppercase px-5 py-2.5 shadow-[0_0_25px_rgba(197,160,89,0.1)] rounded-sm"
              >
                <Award className="w-4 h-4 text-gold" />
                The Highest Literary Honor
              </motion.div>

              {/* MAIN TITLE */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-serif font-black leading-[1.05] tracking-tight mb-0 w-full"
              >
                <span className="block text-sm sm:text-base font-sans font-light tracking-[0.3em] uppercase text-white/50 mb-3">
                  Take Part in the
                </span>
                <span className="block text-[2.8rem] sm:text-[2.8rem] md:text-5xl lg:text-[3.8rem] text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] via-[#ebd298] to-[#b8922a] pb-1">
                  Shakespeare
                </span>
                <span className="block text-[2.8rem] sm:text-[2.8rem] md:text-5xl lg:text-[3.8rem] text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] via-[#ebd298] to-[#b8922a]">
                  Poetry Award
                </span>
                <span className="block text-2xl sm:text-2xl md:text-3xl font-light italic text-white/70 mt-3 tracking-wide">
                  2026 — Volume 2
                </span>
              </motion.h1>
            </div>

            {/* ======= BLOCK 2: IMAGE (order-2 mobile, row-1/2 col-2 desktop) ======= */}
            <div className="relative flex justify-center lg:justify-end items-center order-2 lg:order-2 lg:row-start-1 lg:col-span-7 lg:row-span-2 mt-5 mb-6 lg:my-0 w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
                className="relative w-[310px] sm:w-[360px] md:w-[400px] lg:w-[500px] xl:w-[600px] 2xl:w-[700px] flex-shrink-0"
              >
                {/* Outer glow ring */}
                <div className="absolute -inset-4 bg-gradient-to-br from-gold/20 via-transparent to-gold/10 rounded-sm blur-xl pointer-events-none"></div>
                
                {/* Image frame */}
                <div className="relative rounded-sm overflow-hidden border border-gold/30 bg-[#1A1613] shadow-[0_30px_80px_rgba(0,0,0,0.6),_0_0_60px_rgba(197,160,89,0.15)] w-full">
                  
                  {/* Overlay gradient at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14100C]/70 via-transparent to-transparent pointer-events-none z-10"></div>
                  {/* Overlay gradient at top */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#14100C]/20 via-transparent to-transparent pointer-events-none z-10"></div>
                  
                  <Image
                    src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1782388720/Shakespeare_Poetry_Award_Content_2_1080_x_1080_px_2_bko409.png"
                    alt="Take part in Shakespeare Poetry Award 2026 Volume 2 By Inkfetish"
                    width={1080}
                    height={1080}
                    className="w-full h-auto object-cover transition-transform duration-[2s] hover:scale-[1.03]"
                    priority
                  />

                  {/* TOP-RIGHT Tag */}
                  <div className="absolute top-3 right-3 z-20 bg-gold text-[#14100C] px-3 py-1.5 font-black text-[9px] sm:text-[10px] uppercase tracking-widest shadow-lg rounded-sm">
                    100% Genuine
                  </div>

                  {/* BOTTOM Live Chip */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 bg-[#0E0B08]/90 backdrop-blur-md px-4 sm:px-6 py-2 border border-gold/25 flex items-center gap-2 shadow-xl w-max rounded-sm">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]"></div>
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#ebd298] font-bold">Accepting 200 Entries</span>
                  </div>
                </div>

                {/* Floating stat pill - desktop only */}
                <div className="absolute -left-6 top-1/3 hidden lg:flex items-center gap-2 bg-[#1A1613]/95 backdrop-blur-md border border-gold/20 px-4 py-2.5 rounded-sm shadow-2xl">
                  <BookOpen className="w-4 h-4 text-gold" />
                  <div>
                    <div className="text-[9px] uppercase tracking-widest text-ink-400 font-bold">Anthology</div>
                    <div className="text-white text-xs font-black">Print + Digital</div>
                  </div>
                </div>

                {/* Floating stat pill bottom - desktop only */}
                <div className="absolute -right-6 bottom-1/4 hidden lg:flex items-center gap-2 bg-[#1A1613]/95 backdrop-blur-md border border-gold/20 px-4 py-2.5 rounded-sm shadow-2xl">
                  <Trophy className="w-4 h-4 text-gold" />
                  <div>
                    <div className="text-[9px] uppercase tracking-widest text-ink-400 font-bold">Top 10 Winners</div>
                    <div className="text-white text-xs font-black">Trophy + Medal</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ======= BLOCK 3: LIVE DATE + CTA (order-3 mobile, row-2 col-1 desktop) ======= */}
            <div className="flex flex-col items-center lg:items-start order-3 lg:order-3 lg:row-start-2 lg:col-span-5 w-full">
              {/* Live Date Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 mb-5 w-max mx-auto lg:mx-0 border border-gold/40 bg-[#1A1613] backdrop-blur-md px-5 py-3 rounded-sm shadow-[0_0_25px_rgba(197,160,89,0.12)] relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent"></div>
                <div className="w-2 h-2 rounded-full bg-gold animate-pulse shadow-[0_0_8px_rgba(197,160,89,0.8)] shrink-0"></div>
                <span className="text-[#ebd298] text-[11px] sm:text-xs font-black uppercase tracking-[0.25em]">
                  Live Results Event · 26th July 2026
                </span>
              </motion.div>

              {/* Divider desktop only */}
              <div className="w-full h-[1px] bg-gradient-to-r from-gold/20 via-gold/5 to-transparent mb-6 hidden lg:block"></div>

              {/* CTA BUTTON */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full max-w-sm mx-auto lg:mx-0"
              >
                <Link href="/shakespeare-award-v2/register" className="relative group block w-full">
                  <div className="absolute -inset-[2px] bg-gradient-to-r from-[#c5a059] via-[#ebd298] to-[#c5a059] rounded-sm blur-sm opacity-60 group-hover:opacity-100 transition-all duration-500"></div>
                  <button className="relative w-full px-8 py-[18px] bg-gradient-to-b from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 text-white font-black text-[11px] sm:text-xs uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-3 rounded-sm overflow-hidden">
                    <span className="relative z-10 flex items-center gap-3">
                      Register For Volume 2 Now
                      <ArrowRight className="w-4 h-4" />
                    </span>
                    <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 group-hover:animate-[sweep_1.5s_ease-in-out] pointer-events-none"></div>
                  </button>
                </Link>

                {/* Social Proof */}
                <div className="flex items-center justify-center lg:justify-start gap-2 mt-4">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-ink-400">
                    100% Guaranteed Publication · All 200 Poets
                  </span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>


      {/* --- SECTION 1.5: TOP 10 SHOWCASE --- */}
      <section className="py-24 px-4 bg-[#14100C] border-t border-gold/20 relative overflow-hidden">
        {/* Decorative backdrop */}
        <div className="absolute top-0 right-0 w-full max-w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-[#14100C]/0 to-[#14100C]/0 pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="bg-gradient-to-br from-[#1A1613] to-[#14100C] border border-gold/20 p-6 sm:p-10 md:p-16 rounded-sm shadow-[0_30px_60px_rgba(197,160,89,0.15)] max-w-5xl mx-auto relative overflow-hidden mb-16 group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[80px] pointer-events-none group-hover:bg-gold/20 transition-all duration-700"></div>
            
            <h2 className="text-[10px] md:text-xs uppercase font-bold tracking-[0.4em] text-gold mb-6 inline-flex items-center gap-2 border-b border-gold/20 pb-2">
              <Trophy className="w-4 h-4" /> The Ultimate Reward
            </h2>
            
            <h3 className="text-2xl md:text-3xl lg:text-5xl font-serif font-black text-white mb-6 leading-tight relative z-10">
              The Top 10 Winners Receive the <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] to-[#c5a059] italic drop-shadow-[0_0_20px_rgba(197,160,89,0.4)]">Heavy-Weight Shakespeare Trophy & Premium Medal</span>
            </h3>
            
            <p className="text-sm md:text-lg text-ink-300 max-w-3xl mx-auto font-light leading-relaxed relative z-10">
              Earning a place in the Top 10 means your work has been recognized as the absolute best of Volume 2. You will be crowned the <strong className="text-white font-serif">Winner of the Shakespeare Poetry Award</strong>, receiving a massive physical trophy and a beautifully crafted premium medal delivered straight to your home.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#1A1613] to-[#14100C] border-2 border-gold/30 p-6 sm:p-10 rounded-sm shadow-[0_20px_50px_rgba(197,160,89,0.1)] group hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-[40px] pointer-events-none"></div>
              <Trophy className="w-16 h-16 text-gold mb-6 mx-auto drop-shadow-[0_0_15px_rgba(197,160,89,0.5)]" />
              <h4 className="text-lg sm:text-xl font-serif font-bold text-white mb-3">The Master Trophy</h4>
              <p className="text-sm text-ink-400 leading-relaxed font-light">An incredibly detailed, heavy-weight trophy bearing the Shakespeare seal. It stands as a physical testament to your literary mastery.</p>
            </div>
            
            <div className="bg-gradient-to-br from-[#1A1613] to-[#14100C] border-2 border-gold/30 p-6 sm:p-10 rounded-sm shadow-[0_20px_50px_rgba(197,160,89,0.1)] group hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold/10 blur-[40px] pointer-events-none"></div>
              <Award className="w-16 h-16 text-gold mb-6 mx-auto drop-shadow-[0_0_15px_rgba(197,160,89,0.5)]" />
              <h4 className="text-lg sm:text-xl font-serif font-bold text-white mb-3">The Premium Medal</h4>
              <p className="text-sm text-ink-400 leading-relaxed font-light">A meticulously crafted medal. Wear it, display it, frame it—a permanent symbol of your victory in Volume 2.</p>
            </div>
          </div>

          <div className="mt-16 inline-flex flex-col items-center">
            <div className="px-6 py-3 bg-[#1A1613] border border-gold/20 text-gold text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(197,160,89,0.1)]">
              + PLUS ALL GUARANTEED PARTICIPANT BENEFITS
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: THE BACKSTORY & VISUAL PROOF --- */}
      <section className="py-24 px-4 bg-[#1A1613] border-t border-gold/10 relative overflow-hidden">
        {/* Giant background text watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="text-[15vw] sm:text-[22vw] font-black text-white/[0.015] uppercase tracking-widest select-none font-sans whitespace-nowrap">SEASON ONE</span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Header */}
          <div className="text-center mb-20">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-ink-600">Where It All Began</span>
            <h3 className="text-2xl sm:text-2xl md:text-3xl font-serif font-black text-[#fdfbf7] mt-4 leading-none">
              Season 1 Was a Promise.<br/>
              <span className="text-gold italic drop-shadow-[0_0_15px_rgba(197,160,89,0.2)]">Here is the Proof.</span>
            </h3>
          </div>
          <div className="grid lg:grid-cols-3 gap-4 lg:gap-8">
            
            {/* Card 1: 10 Winners */}
            <div className="bg-gradient-to-br from-[#14100C] to-[#1A1613] border-t-2 border-l border-r border-b border-gold/30 p-5 sm:p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] group hover:-translate-y-1 lg:hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden rounded-sm">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 blur-[50px] pointer-events-none group-hover:bg-gold/15 transition-colors duration-700"></div>
              {/* Mobile: row layout. Desktop: column layout */}
              <div className="flex items-start gap-4 lg:flex-col lg:gap-0">
                <div className="shrink-0">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black font-serif leading-none text-transparent bg-clip-text bg-gradient-to-b from-gold to-gold/20 drop-shadow-[0_0_20px_rgba(197,160,89,0.3)]">10</div>
                  <div className="text-[9px] uppercase tracking-[0.25em] font-bold text-ink-500 mt-1 lg:mb-6 lg:border-b lg:border-white/5 lg:pb-3 whitespace-nowrap">Top Winners</div>
                </div>
                <div className="flex-1 lg:mt-0">
                  <h4 className="text-sm sm:text-base lg:text-xl font-serif font-black text-white mb-2 leading-tight">The Official Award &amp; Heavy-Weight Medal</h4>
                  <p className="text-xs sm:text-sm text-ink-400 font-light leading-relaxed">
                    Top 10 evaluated poets received the official trophy and a real, heavy-weight physical medal — delivered directly to their home.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: 100% Certificates */}
            <div className="bg-gradient-to-br from-[#14100C] to-[#1A1613] border-t-2 border-l border-r border-b border-white/10 p-5 sm:p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] group hover:-translate-y-1 lg:hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden rounded-sm">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 blur-[50px] pointer-events-none group-hover:bg-white/10 transition-colors duration-700"></div>
              <div className="flex items-start gap-4 lg:flex-col lg:gap-0">
                <div className="shrink-0">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black font-serif leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">100<span className="text-2xl lg:text-4xl">%</span></div>
                  <div className="text-[9px] uppercase tracking-[0.25em] font-bold text-ink-500 mt-1 lg:mb-6 lg:border-b lg:border-white/5 lg:pb-3 whitespace-nowrap">Certificate Delivery</div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm sm:text-base lg:text-xl font-serif font-black text-white mb-2 leading-tight">Physical Certificates. Every Single Participant.</h4>
                  <p className="text-xs sm:text-sm text-ink-400 font-light leading-relaxed">
                    Every one of the 150 Season 1 participants received a real printed Certificate of Excellence — physically shipped. No PDFs. Every promise kept.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: 150 Published */}
            <div className="bg-gradient-to-br from-[#14100C] to-[#1A1613] border-t-2 border-l border-r border-b border-white/10 p-5 sm:p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] group hover:-translate-y-1 lg:hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden rounded-sm">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 blur-[50px] pointer-events-none group-hover:bg-white/10 transition-colors duration-700"></div>
              <div className="flex items-start gap-4 lg:flex-col lg:gap-0">
                <div className="shrink-0">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black font-serif leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] to-white/20">150</div>
                  <div className="text-[9px] uppercase tracking-[0.25em] font-bold text-ink-500 mt-1 lg:mb-6 lg:border-b lg:border-white/5 lg:pb-3 whitespace-nowrap">Poets Published</div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm sm:text-base lg:text-xl font-serif font-black text-white mb-2 leading-tight">All 150 Published in <span className="italic text-gold">"Shakespeare and What Remained"</span></h4>
                  <p className="text-xs sm:text-sm text-ink-400 font-light leading-relaxed">
                    Every poet's work was included in the official printed anthology. Not shortlisted. Not conditionally. All 150 became published authors.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Image Gallery appended to Section 2 */}
          <div className="mt-24 relative w-full overflow-hidden flex pb-12 z-10 group mx-auto w-screen relative left-1/2 -translate-x-1/2">
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
          
          {/* MOBILE VIEW: Staggered overlapping cards layout for phone screens */}
          <div className="max-w-md mx-auto px-4 mt-8 pb-12 flex flex-col items-center md:hidden">
            {/* Card 1: Winner holding anthology */}
            <div className="w-[85vw] max-w-[320px] aspect-[4/3] border-[6px] border-[#e8e4db] bg-white shadow-xl -rotate-2 transition-transform hover:scale-105 hover:rotate-0 duration-500 cursor-pointer relative shrink-0 z-10">
              <div className="relative w-full h-full">
                <Image src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897712/WhatsApp_Image_2026-04-01_at_1.54.06_PM_2_-compressed_l5bsna.webp" alt="Winner holding anthology" fill className="object-cover" />
              </div>
            </div>
            
            {/* Card 2: Winner holding certificate */}
            <div className="w-[85vw] max-w-[320px] aspect-[4/3] border-[6px] border-[#f5f0e1] bg-white shadow-[0_15px_35px_rgba(0,0,0,0.4)] rotate-3 transition-transform hover:scale-105 hover:rotate-0 duration-500 cursor-pointer relative shrink-0 z-30 -mt-[15%]">
              <div className="relative w-full h-full">
                <Image src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897711/WhatsApp_Image_2026-04-01_at_1.54.05_PM_1_-compressed_eoiarj.webp" alt="Winner holding certificate" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-gold text-[#050505] text-[9px] font-black tracking-widest px-3 py-1.5 uppercase shadow-xl">Real Physical Deliveries</div>
            </div>

            {/* Card 3: Anthology in hands */}
            <div className="w-[85vw] max-w-[320px] aspect-[4/3] border-[6px] border-[#e8e4db] bg-white shadow-xl -rotate-3 transition-transform hover:scale-105 hover:rotate-0 duration-500 cursor-pointer relative shrink-0 z-20 -mt-[15%]">
              <div className="relative w-full h-full">
                <Image src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897716/WhatsApp_Image_2026-04-07_at_12.09.27_AM-compressed_bzgl8t.webp" alt="Anthology in hands" fill className="object-cover" />
              </div>
            </div>

            {/* Card 4: Anthology display */}
            <div className="w-[85vw] max-w-[320px] aspect-[4/3] border-[6px] border-[#e8e4db] bg-white shadow-xl rotate-2 transition-transform hover:scale-105 hover:rotate-0 duration-500 cursor-pointer relative shrink-0 z-10 -mt-[15%]">
              <div className="relative w-full h-full">
                <Image src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897715/WhatsApp_Image_2026-04-07_at_12.09.27_AM_1_-compressed_ugjy5e.webp" alt="Anthology display" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* DESKTOP VIEW: Staggered overlapping absolute layout */}
          <div className="max-w-7xl mx-auto px-4 mt-8 pb-12 hidden md:block">
            <div className="flex justify-center items-center h-[400px] w-full relative">
              <div className="absolute -rotate-6 left-[10%] w-[350px] h-[300px] border-[12px] border-[#e8e4db] bg-white shadow-2xl z-10 transition-transform hover:scale-105 hover:z-50 duration-500 cursor-pointer">
                <div className="relative w-full h-full"><Image src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897712/WhatsApp_Image_2026-04-01_at_1.54.06_PM_2_-compressed_l5bsna.webp" alt="Winner holding anthology" fill className="object-cover" /></div>
              </div>
              
              <div className="absolute rotate-3 z-30 w-[400px] h-[350px] border-[12px] border-[#f5f0e1] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform hover:scale-105 hover:z-50 duration-500 cursor-pointer left-1/2 -translate-x-1/2">
                <div className="relative w-full h-full"><Image src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897711/WhatsApp_Image_2026-04-01_at_1.54.05_PM_1_-compressed_eoiarj.webp" alt="Winner holding certificate" fill className="object-cover" /></div>
                <div className="absolute -bottom-4 -right-4 bg-gold text-[#050505] text-[10px] font-black tracking-widest px-4 py-2 uppercase shadow-xl">Real Physical Deliveries</div>
              </div>

              <div className="absolute -rotate-3 right-[10%] w-[350px] h-[300px] border-[12px] border-[#e8e4db] bg-white shadow-2xl z-20 transition-transform hover:scale-105 hover:z-50 duration-500 cursor-pointer">
                <div className="relative w-full h-full"><Image src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897716/WhatsApp_Image_2026-04-07_at_12.09.27_AM-compressed_bzgl8t.webp" alt="Anthology in hands" fill className="object-cover" /></div>
              </div>
              
               <div className="absolute rotate-12 right-[5%] top-[10%] w-[250px] h-[200px] border-[8px] border-[#e8e4db] bg-white shadow-xl z-0 transition-transform hover:scale-105 hover:z-50 duration-500 cursor-pointer opacity-70 hover:opacity-100">
                <div className="relative w-full h-full"><Image src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897715/WhatsApp_Image_2026-04-07_at_12.09.27_AM_1_-compressed_ugjy5e.webp" alt="Anthology display" fill className="object-cover" /></div>
              </div>
            </div>
          </div>

          {/* CTA under Season 1 Proof */}
          <div className="mt-16 text-center pb-12">
            <Link href="/shakespeare-award-v2/register" className="inline-block relative group">
              <button className="relative px-10 py-4 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 text-white font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] transition-colors rounded-sm shadow-[0_0_25px_rgba(34,197,94,0.4)]">
                Secure Your Guaranteed Publication
              </button>
            </Link>
          </div>

        </div>
      </section>

      {/* --- SECTION 4: SPLIT-SCREEN RECOGNITION PACKAGE (WHAT YOU GET) --- */}
      <section className="py-24 px-4 bg-[#14100C] border-t border-gold/10">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-[10px] uppercase font-bold tracking-[0.3em] text-gold mb-4">Your Complete Recognition Package</h2>
            <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-black text-[#fdfbf7] max-w-4xl mx-auto leading-tight">
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
              
              <div className="bg-gradient-to-br from-[#1A1613] to-[#14100C] border border-gold/10 p-6 sm:p-8 group hover:border-gold/30 hover:shadow-[0_0_30px_rgba(197,160,89,0.1)] transition-all duration-500 rounded-sm">
                <Bookmark className="w-6 h-6 text-gold mb-5" />
                <h4 className="text-xl font-serif font-bold text-white mb-3">📜 Next Shakespeare "Certificate"</h4>
                <p className="text-[13px] sm:text-sm text-ink-400 font-light leading-relaxed">
                  Each participant will receive an official NEXT Shakespeare certificate, delivered as a hard copy to their home.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-[#1A1613] to-[#14100C] border border-gold/10 p-6 sm:p-8 group hover:border-gold/30 hover:shadow-[0_0_30px_rgba(197,160,89,0.1)] transition-all duration-500 rounded-sm">
                <Mail className="w-6 h-6 text-gold mb-5" />
                <h4 className="text-xl font-serif font-bold text-white mb-3">💌 Next Shakespeare "Appreciation Letter"</h4>
                <p className="text-[13px] sm:text-sm text-ink-400 font-light leading-relaxed mb-4">
                  Each participant will receive an official NEXT Shakespeare Appreciation Letter, delivered as a hard copy to their home.
                </p>
              </div>

              {/* Spanning Block: Published */}
              <div className="md:col-span-2 bg-[#1A1613] border border-gold/30 p-6 sm:p-8 md:p-12 relative shadow-[0_0_40px_rgba(197,160,89,0.1)] overflow-hidden rounded-sm group hover:border-gold transition-colors duration-500">
                <div className="absolute -top-6 sm:p-10 -right-10 w-40 h-40 bg-gold/10 blur-[50px] pointer-events-none group-hover:bg-gold/20 transition-all duration-700"></div>
                <div className="absolute top-0 right-0 bg-gold px-3 py-1 text-[#14100C] text-[8px] font-black uppercase tracking-[0.2em] shadow-lg">The Big One</div>
                <BookMarked className="w-8 h-8 text-gold mb-5 relative z-10" />
                <h4 className="text-3xl font-serif font-bold text-white mb-4 relative z-10">📚 Get Published in Anthology Book</h4>
                
                <p className="text-sm sm:text-base text-ink-400 font-light max-w-4xl leading-relaxed relative z-10 mb-4">
                  Each participant will be featured as a co-author in our official anthology for the Shakespeare Poetry Award.
                </p>
              </div>

               {/* Spanning Block: Hall of Fame */}
              <div className="md:col-span-2 bg-[#050505] border border-white/10 p-6 sm:p-8 md:p-6 sm:p-10 relative overflow-hidden group hover:border-gold/30 hover:shadow-[0_0_30px_rgba(197,160,89,0.1)] transition-all duration-500 rounded-sm">
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
                <h4 className="text-base font-serif font-bold text-gold mb-2">🥇 The Shakespeare Poetry Award</h4>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#a32727] mb-3">The award itself. Named. Official. Historical.</div>
                <p className="text-[13px] text-ink-300 font-light leading-relaxed">
                  The Shakespeare Poetry Award — presented to the top 10 evaluated poets of Volume 2. <strong className="text-white">This is the award that carries the name.</strong> The one that goes on your author bio. The one that makes people lean forward and say, *"Tell me more."*
                </p>
              </div>

              <div className="bg-gradient-to-b from-ink-charcoal to-[#0a0a0a] border border-gold/40 p-8 relative shadow-[0_10px_40px_-20px_rgba(197,160,89,0.25)] hover:-translate-y-2 transition-transform duration-500 rounded-sm">
                <Award className="w-8 h-8 text-gold mb-5 drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]" />
                <h4 className="text-base font-serif font-bold text-gold mb-2">🏅 A Real Medal</h4>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#a32727] mb-3">Physical. Delivered. Something to hold.</div>
                <p className="text-[13px] text-ink-300 font-light leading-relaxed">
                  A physical medal — delivered to your home. <strong className="text-white font-medium">Not a badge on a website. Not a digital trophy.</strong> Something you can hold in your hands, that has weight and texture and permanence. The kind of thing your family asks about. The kind of thing you keep.
                </p>
              </div>

              <div className="bg-gradient-to-b from-ink-charcoal to-[#0a0a0a] border border-gold/40 p-8 relative shadow-[0_10px_40px_-20px_rgba(197,160,89,0.25)] hover:-translate-y-2 transition-transform duration-500 rounded-sm">
                <Video className="w-8 h-8 text-gold mb-5 drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]" />
                <h4 className="text-base font-serif font-bold text-gold mb-2">🎉 Live Zoom Recognition</h4>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#a32727] mb-3">Your name called. In front of everyone.</div>
                <p className="text-[13px] text-ink-300 font-light leading-relaxed">
                  The top 10 results will be announced LIVE — on a Zoom event that every participant attends. <strong className="text-white">Your name, called publicly, in front of the entire community of poets.</strong> That moment. That announcement. That feeling of hearing your name — is something we will make sure you never forget.
                </p>
              </div>

            </div>
          </div>

          {/* CTA under Recognition Package */}
          <div className="mt-20 text-center">
            <Link href="/shakespeare-award-v2/register" className="inline-block relative group">
              <button className="relative px-10 py-4 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 text-white font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] transition-colors rounded-sm shadow-[0_0_25px_rgba(34,197,94,0.4)]">
                Claim This Recognition Package
              </button>
            </Link>
          </div>

        </div>
      </section>

      {/* --- SECTION 3: VISUAL SCARCITY & EXCLUSIVITY --- */}
      <section className="py-24 px-4 bg-[#2A2118] border-y border-gold/10 overflow-hidden relative">
        {/* Subtle texture for scarcity section */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23c5a059\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          
          <h2 className="text-[10px] uppercase font-bold tracking-[0.3em] text-red-500 mb-6">The Number That Matters</h2>
          <h3 className="text-2xl sm:text-2xl md:text-3xl font-serif font-black text-white mb-8">200 Is The Participant Limit.</h3>
          
          <p className="text-[13px] sm:text-sm md:text-base text-ink-400 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            Recognition loses meaning when it is handed to everyone without limit. The Shakespeare Poetry Award is prestigious because it is not for everyone. It is for the 200 who choose to show up.
          </p>

          {/* Graphical Progress Bar */}
          <div className="bg-[#14100C] border border-[#7A2B20]/50 p-6 md:p-6 sm:p-10 text-left relative overflow-hidden shadow-[0_0_50px_rgba(122,27,27,0.1)]">
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-red-900/10 blur-[100px] pointer-events-none"></div>
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Users className="w-32 h-32 text-white" />
            </div>
            
            <div className="flex justify-between items-end mb-4 relative z-10">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-ink-500 font-bold mb-1">Volume 2 Capacity</div>
                <div className="text-lg sm:text-xl font-serif font-black text-white">153 <span className="text-sm font-sans font-light text-ink-500">/ 200 Seats Claimed</span></div>
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
              <button className="relative px-10 py-4 bg-gradient-to-r from-[#064e3b] to-[#022c22] border border-green-800 hover:border-green-500 text-green-400 font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] transition-colors rounded-sm shadow-md">
                Claim One Of The Remaining Seats
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- SECTION 3B: THE CORE BENEFITS (WHY PARTICIPATE) --- */}
      <section className="py-24 bg-[#1A1613] border-t border-gold/10 relative overflow-hidden">

        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[600px] bg-gold/5 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="text-[28vw] font-black text-white/[0.012] uppercase tracking-widest select-none font-sans whitespace-nowrap">WHY</span>
        </div>

        <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">

          <div className="mb-20">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-ink-600">Beyond The Trophy</span>
            <h3 className="text-2xl sm:text-2xl md:text-3xl font-serif font-black text-white mt-4 leading-none">Why This Award <br/><span className="text-gold italic">Actually Matters.</span></h3>
          </div>

          {/* Benefit 1: Credibility */}
          <div className="group relative py-8 sm:py-14 flex flex-col md:flex-row md:items-center gap-8 md:gap-16 border-t border-white/5 hover:border-gold/20 transition-all duration-700 cursor-default">
            <div className="absolute inset-0 bg-gradient-to-r from-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            {/* Large keyword */}
            <div className="shrink-0 relative z-10 min-w-[200px]">
              <ShieldCheck className="w-6 h-6 text-gold mb-4 opacity-60" />
              <div className="text-3xl md:text-4xl font-black font-serif leading-none text-transparent bg-clip-text bg-gradient-to-b from-gold to-gold/20">Cred-<br/>ibility.</div>
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
          <div className="group relative py-8 sm:py-14 flex flex-col md:flex-row-reverse md:items-center gap-8 md:gap-16 border-t border-white/5 hover:border-gold/20 transition-all duration-700 cursor-default">
            <div className="absolute inset-0 bg-gradient-to-l from-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            <div className="shrink-0 relative z-10 min-w-[200px] md:text-right">
              <BookMarked className="w-6 h-6 text-gold mb-4 opacity-60 md:ml-auto" />
              <div className="text-3xl md:text-4xl font-black font-serif leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] to-white/20">Leg-<br/>acy.</div>
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
          <div className="group relative py-8 sm:py-14 flex flex-col md:flex-row md:items-center gap-8 md:gap-16 border-t border-white/5 hover:border-gold/20 transition-all duration-700 cursor-default">
            <div className="absolute inset-0 bg-gradient-to-r from-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            <div className="shrink-0 relative z-10 min-w-[200px]">
              <Users className="w-6 h-6 text-gold mb-4 opacity-60" />
              <div className="text-3xl md:text-4xl font-black font-serif leading-none text-transparent bg-clip-text bg-gradient-to-b from-gold to-gold/20">Only<br/>200.</div>
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
          <div className="group relative py-8 sm:py-14 flex flex-col md:flex-row-reverse md:items-center gap-8 md:gap-16 border-t border-b border-white/5 hover:border-gold/20 transition-all duration-700 cursor-default">
            <div className="absolute inset-0 bg-gradient-to-l from-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            <div className="shrink-0 relative z-10 min-w-[200px] md:text-right">
              <CheckCircle2 className="w-6 h-6 text-gold mb-4 opacity-60 md:ml-auto" />
              <div className="text-3xl md:text-4xl font-black font-serif leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] to-white/20">Real<br/>Judges.</div>
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

      {/* --- SECTION 4.5: IMPORTANT DETAILS --- */}
      <section className="py-24 px-4 bg-[#1A1613] border-t border-gold/10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#14100C] to-[#1A1613] border border-gold/20 p-6 sm:p-8 md:p-12 shadow-[0_0_40px_rgba(197,160,89,0.15)] rounded-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[80px] pointer-events-none"></div>
            
            <h3 className="text-2xl md:text-4xl font-serif font-black text-white mb-8 flex items-center gap-4">
              <span className="text-gold">✦</span> Important Details
            </h3>

            <div className="space-y-6 relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4 text-gold" /></div>
                <p className="text-white/90 text-[13px] sm:text-[13px] leading-relaxed"><strong className="text-white font-bold">Only 200 Participants</strong> will be accepted this year.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4 text-gold" /></div>
                <p className="text-white/90 text-[13px] sm:text-[13px] leading-relaxed"><strong className="text-white font-bold">Live judging and voting</strong> will happen in Zoom Meet.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4 text-gold" /></div>
                <p className="text-white/90 text-[13px] sm:text-[13px] leading-relaxed"><strong className="text-white font-bold">Official participant report</strong> will be published online.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4 text-gold" /></div>
                <p className="text-white/90 text-[13px] sm:text-[13px] leading-relaxed"><strong className="text-white font-bold">5 Judges</strong> will join and select the Top 10 winners live.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4 text-gold" /></div>
                <p className="text-white/90 text-[13px] sm:text-[13px] leading-relaxed"><strong className="text-gold font-bold">Registration fee: ₹699 only.</strong> No hidden charges.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4.75: INKFETISH TRACK RECORD --- */}
      <section className="py-24 px-4 bg-[#14100C] border-t border-gold/10 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[800px] bg-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          
          <div className="text-center mb-16">
            <h2 className="text-[10px] uppercase font-bold tracking-[0.3em] text-gold mb-4">The Publisher Behind The Award</h2>
            <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-black text-white">
              We Make <span className="italic font-light text-gold">Books.</span>
            </h3>
            <p className="mt-6 text-[13px] sm:text-sm text-ink-300 max-w-2xl mx-auto font-light leading-relaxed">
              We built Inkfetish to give every writer a real chance to see their name on a physical book. Today, we're one of the fastest-growing publishers in the country with a community of over 200,000+ writers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-6 sm:p-8 bg-[#1A1613] border border-gold/10 rounded-sm text-center hover:border-gold/30 transition-colors shadow-lg group">
              <BookOpen className="w-8 h-8 text-gold mx-auto mb-5 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-serif font-black text-white mb-3">Real Books</h4>
              <p className="text-xs text-ink-400 leading-relaxed font-light">We believe your words belong on paper. Every major project ends with a stunning physical book.</p>
            </div>
            <div className="p-6 sm:p-8 bg-[#1A1613] border border-gold/10 rounded-sm text-center hover:border-gold/30 transition-colors shadow-lg group">
              <Users className="w-8 h-8 text-gold mx-auto mb-5 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-serif font-black text-white mb-3">200,000+ Strong</h4>
              <p className="text-xs text-ink-400 leading-relaxed font-light">Join a massive, supportive community of writers who celebrate each other and grow together.</p>
            </div>
            <div className="p-6 sm:p-8 bg-[#1A1613] border border-gold/10 rounded-sm text-center hover:border-gold/30 transition-colors shadow-lg group">
              <Globe className="w-8 h-8 text-gold mx-auto mb-5 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-serif font-black text-white mb-3">Global Reach</h4>
              <p className="text-xs text-ink-400 leading-relaxed font-light">We distribute our titles across Amazon, Flipkart, and 15+ global markets to ensure maximum visibility.</p>
            </div>
          </div>
          
          {/* CTA under Publisher */}
          <div className="mt-16 text-center">
            <Link href="/shakespeare-award-v2/register" className="inline-block relative group">
              <button className="relative px-10 py-4 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 text-white font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] transition-colors rounded-sm shadow-[0_0_25px_rgba(34,197,94,0.4)]">
                Publish Your Poem With Inkfetish
              </button>
            </Link>
          </div>
          
        </div>
      </section>

      {/* --- SECTION 5: HOW IT WORKS (FLOW DIAGRAM) --- */}
      <section className="py-24 px-4 bg-[#2A2118] border-y border-gold/10 relative">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-[10px] uppercase font-bold tracking-[0.3em] text-ink-500 mb-4">Simple. Transparent.</h2>
            <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-black text-[#fdfbf7]">Four Steps to Publication.</h3>
          </div>

          {/* Stepper Flow */}
          <div className="relative pl-0 sm:pl-0">
            {/* Desktop Vertical Line */}
            <div className="hidden sm:block absolute left-1/2 top-4 bottom-4 w-px bg-white/10 -translate-x-1/2"></div>
            {/* Mobile Vertical Line */}
            <div className="sm:hidden absolute left-6 top-4 bottom-4 w-px bg-white/10 -translate-x-1/2"></div>

            <div className="space-y-12 sm:space-y-20 relative z-10">
              
              {/* Step 1 */}
              <div className="flex flex-row sm:flex-row items-start sm:items-center justify-start sm:justify-center gap-4 sm:gap-16">
                <div className="w-12 h-12 bg-[#14100C] border-2 border-gold rounded-full flex items-center justify-center text-gold font-bold text-lg order-1 sm:order-2 sm:relative shrink-0 shadow-[0_0_20px_rgba(197,160,89,0.3)] z-10">1</div>
                <div className="flex-1 sm:w-1/2 sm:text-right order-2 sm:order-1 sm:mr-8">
                  <h4 className="text-xl font-serif font-bold text-white mb-2">1. Secure Your Seat</h4>
                  <p className="text-sm text-ink-400 font-light">Click register and pay the entry fee. Your seat is secured, and your name is immediately assigned to Volume 2.</p>
                </div>
                <div className="hidden sm:block sm:w-1/2 order-3"></div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-row sm:flex-row items-start sm:items-center justify-start sm:justify-center gap-4 sm:gap-16">
                <div className="hidden sm:block sm:w-1/2 order-1"></div>
                <div className="w-12 h-12 bg-[#14100C] border border-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg order-1 sm:order-2 sm:relative shrink-0 z-10">2</div>
                <div className="flex-1 sm:w-1/2 order-2 sm:order-3 sm:ml-8">
                  <h4 className="text-xl font-serif font-bold text-white mb-2">2. Submit Your Poem</h4>
                  <p className="text-sm text-ink-400 font-light">Receive detailed submission guidelines. Write with intention. Submit before the deadline through our portal.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-row sm:flex-row items-start sm:items-center justify-start sm:justify-center gap-4 sm:gap-16">
                <div className="w-12 h-12 bg-[#14100C] border border-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg order-1 sm:order-2 sm:relative shrink-0 z-10">3</div>
                <div className="flex-1 sm:w-1/2 sm:text-right order-2 sm:order-1 sm:mr-8">
                  <h4 className="text-xl font-serif font-bold text-white mb-2">3. Fair Evaluation</h4>
                  <p className="text-sm text-ink-400 font-light">Every poem is evaluated against published criteria by humans, not algorithms. Serious reading for serious work.</p>
                </div>
                <div className="hidden sm:block sm:w-1/2 order-3"></div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-row sm:flex-row items-start sm:items-center justify-start sm:justify-center gap-4 sm:gap-16">
                <div className="hidden sm:block sm:w-1/2 order-1"></div>
                <div className="w-12 h-12 bg-[#14100C] border border-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg order-1 sm:order-2 sm:relative shrink-0 z-10">4</div>
                <div className="flex-1 sm:w-1/2 order-2 sm:order-3 sm:ml-8">
                  <h4 className="text-xl font-serif font-bold text-white mb-2">4. The Recognition</h4>
                  <p className="text-sm text-ink-400 font-light">Results announced LIVE. Certificates and medals shipped. Anthology published. Your name, immortalized.</p>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-20 text-center">
            <Link href="/shakespeare-award-v2/register" className="inline-block relative">
              <button className="px-8 py-3 border border-green-500 hover:bg-green-500/10 text-green-400 text-[10px] uppercase tracking-widest font-bold transition-colors">
                Start Step 1 — Register
              </button>
            </Link>
          </div>

        </div>
      </section>

      {/* --- SECTION 6: FAQ --- */}
      <section className="py-24 px-4 bg-[#14100C]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h2 className="text-[10px] uppercase font-bold tracking-[0.3em] text-ink-500 mb-4">Everything You Want to Know</h2>
            <h3 className="text-2xl md:text-3xl font-serif font-black text-white">Ask Every Question. <br/><span className="italic text-gold/50 font-light font-serif">We'd rather you know than wonder.</span></h3>
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
      <section id="register" className="py-20 sm:py-32 px-4 bg-[#1A1613] border-t border-gold/10 relative overflow-hidden">
        {/* Subdued background glow */}
        <div className="absolute bottom-[-20%] right-[-10%] w-full max-w-[500px] h-[500px] bg-gold/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-serif font-black text-white mb-8 leading-tight">
            The Ones Who Submitted.<br/> <span className="italic text-gray-400 font-light">And the Ones Who Didn't.</span>
          </h2>
          <p className="text-[13px] sm:text-sm text-ink-400 mb-12 max-w-xl mx-auto font-light leading-relaxed text-left sm:text-center">
            The ones who submitted—their names will be in the anthology. Their certificates will be on their walls. There is no "next time" for Volume 2. The window is open. Right now.
          </p>
          
          <div className="bg-[#14100C] border border-gold/10 p-6 md:p-6 sm:p-10 max-w-lg mx-auto shadow-2xl">
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-white mb-6">Secure Registration Portal</h3>
            
            <Link href="/shakespeare-award-v2/register" className="block w-full">
              <button className="w-full py-5 bg-gradient-to-b from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 text-white font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 border border-green-400 shadow-[0_0_25px_rgba(34,197,94,0.4)] rounded-sm">
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

      {/* Custom Minimal Footer to avoid exit points */}
      <footer className="pt-16 pb-32 px-4 bg-[#050505] border-t border-gold/10 text-center relative z-20">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full border border-ink-900/10 flex items-center justify-center overflow-hidden transition-transform duration-500 hover:scale-105 shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-8 relative z-10">
            <img src="/images/inkfetish_logo.png" alt="Inkfetish Publication" className="w-[85%] h-[85%] object-contain" />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 mb-10 text-[11px] font-bold uppercase tracking-[0.3em] text-ink-500">
            <span className="hover:text-gold transition-colors cursor-pointer">About Inkfetish</span>
            <span className="hidden sm:inline text-gold/30">•</span>
            <span className="hover:text-gold transition-colors cursor-pointer">About Shakespeare Poetry Award</span>
          </div>
          
          <p className="text-[9px] text-ink-700 font-sans tracking-[0.2em] uppercase border-t border-white/5 pt-6 w-full">
            &copy; {new Date().getFullYear()} Inkfetish Publications. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-5 sm:p-4 bg-[#0a0a0a]/80 backdrop-blur-xl border-t border-gold/20 shadow-[0_-20px_40px_rgba(0,0,0,0.8)] md:hidden">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <h4 className="text-white font-serif font-bold text-sm">Shakespeare Poetry Award Vol. 2</h4>
            <p className="text-ink-400 text-xs font-light">Guaranteed Publication & Physical Delivery</p>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto flex-grow sm:flex-grow-0">
            <div className="text-right hidden md:block">
              <span className="text-[10px] text-ink-500 uppercase tracking-widest block font-bold">Entry Fee</span>
              <span className="text-gold font-bold font-serif text-base leading-none">₹699</span>
            </div>
            <Link href="/shakespeare-award-v2/register" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto py-5 sm:py-3 px-4 sm:px-8 bg-gradient-to-b from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 text-white font-black text-[11px] sm:text-xs uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)] whitespace-nowrap">
                Secure Your Seat
              </button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
