'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, Star, ShieldCheck, Clock, BookOpen, 
  PenTool, CheckCircle2, Award, Users, Globe, 
  Scale, Gift, Landmark, GraduationCap, Lock, 
  ArrowRight, Sparkles, Check
} from 'lucide-react';
import Link from 'next/link';

const testimonialsRow1 = [
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897590/WhatsApp_Image_2026-03-23_at_7.03.30_PM-compressed_fsgkug.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897591/WhatsApp_Image_2026-03-23_at_7.03.31_PM_3_-compressed_ofwyil.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897591/WhatsApp_Image_2026-03-23_at_7.03.31_PM_4_-compressed_dnisid.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897592/WhatsApp_Image_2026-03-23_at_7.03.31_PM_5_-compressed_hgy6j1.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897592/WhatsApp_Image_2026-03-28_at_11.47.30_PM_1_-compressed_abkbxy.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897593/WhatsApp_Image_2026-03-31_at_11.00.31_PM-compressed_a58ono.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897593/WhatsApp_Image_2026-04-01_at_6.40.37_AM-compressed_eibjs4.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897594/WhatsApp_Image_2026-04-01_at_6.40.55_AM_1_-compressed_j51ngs.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897594/WhatsApp_Image_2026-04-02_at_5.17.33_PM_2_-compressed_sz4wld.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897595/WhatsApp_Image_2026-04-02_at_5.17.33_PM_3_-compressed_kosajj.webp',
];

const testimonialsRow2 = [
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897595/WhatsApp_Image_2026-04-02_at_5.42.20_PM_1_-compressed_khfil0.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897596/WhatsApp_Image_2026-04-02_at_5.42.20_PM-compressed_sq3utn.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897596/WhatsApp_Image_2026-04-03_at_10.52.04_AM_1_-compressed_pp9tww.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897597/WhatsApp_Image_2026-04-03_at_10.52.05_AM_1_-compressed_uphqxg.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897597/WhatsApp_Image_2026-04-03_at_10.52.05_AM_2_-compressed_m2qlui.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897597/WhatsApp_Image_2026-04-04_at_12.20.06_PM_1_-compressed_lrqjv2.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897598/WhatsApp_Image_2026-04-07_at_8.39.44_PM_1_-compressed_gjnlck.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897598/WhatsApp_Image_2026-04-07_at_8.39.44_PM_2_-compressed_hfr0wv.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897599/WhatsApp_Image_2026-04-07_at_8.39.44_PM-compressed_ztxsge.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897599/WhatsApp_Image_2026-04-09_at_2.53.04_PM-compressed_wsnhmu.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897600/WhatsApp_Image_2026-04-09_at_2.59.25_PM-compressed_in2led.webp',
];

const testimonialsRow3 = [
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897711/WhatsApp_Image_2026-04-01_at_1.54.05_PM_1_-compressed_eoiarj.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897712/WhatsApp_Image_2026-04-01_at_1.54.06_PM_2_-compressed_l5bsna.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897712/WhatsApp_Image_2026-04-01_at_1.54.06_PM_3_-compressed_czwtzu.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897713/WhatsApp_Image_2026-04-01_at_1.54.07_PM_1_-compressed_slt2mj.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897714/WhatsApp_Image_2026-04-01_at_1.54.07_PM_2_-compressed_j6w9sn.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897715/WhatsApp_Image_2026-04-01_at_1.54.07_PM_3_-compressed_moo9ra.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897715/WhatsApp_Image_2026-04-07_at_12.09.27_AM_1_-compressed_ugjy5e.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897716/WhatsApp_Image_2026-04-07_at_12.09.27_AM-compressed_bzgl8t.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1776802129/WhatsApp_Image_2026-04-22_at_1.37.09_AM_1_v2i3bu.jpg',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1776802129/WhatsApp_Image_2026-04-22_at_1.37.09_AM_2_d7vvc7.jpg',
];

export default function PeopleChoiceClient() {
  return (
    <div className="min-h-screen bg-[#070605] text-[#f5f0e1] font-sans selection:bg-[#d4af37] selection:text-black relative overflow-x-hidden pb-20 sm:pb-24">
      
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[15%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,#aa771c_0%,transparent_70%)] opacity-20 blur-[100px] animate-pulse" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,#d4af37_0%,transparent_70%)] opacity-15 blur-[120px] animate-pulse" />
      </div>

      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 bg-[#070605]/85 backdrop-blur-md border-b border-[#d4af37]/20 py-2.5 px-4 shadow-lg shadow-black/40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/images/inkfetish_logo.png" 
              alt="Inkfetish Publication" 
              className="w-8 h-8 rounded-full object-cover border border-[#d4af37]/30 shadow-[0_0_10px_rgba(212,175,55,0.3)]"
            />
            <span className="font-serif text-sm font-semibold tracking-wider text-[#f3e5ab]">
              Inkfetish Publication
            </span>
          </div>
        </div>
      </nav>

      {/* --- TOP SCARCITY BAR --- */}
      <Link 
        href="/people-choice-award/register"
        className="block bg-gradient-to-r from-[#1c1408] via-[#2f220d] to-[#1c1408] border-b border-[#d4af37]/25 text-[#f3e5ab] py-2 px-3 text-center text-xs tracking-widest font-semibold hover:bg-[#2b1f0c] transition-colors"
      >
        <div className="flex items-center justify-center gap-2">
          <span className="animate-ping inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75" />
          <span>Strictly Limited to <strong>250 Participants</strong> — Registrations Open! Click Here to Apply →</span>
        </div>
      </Link>

      {/* --- HERO SECTION --- */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typography & Hook */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Emblem Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-flex items-center gap-2 bg-[#17140e] border border-[#d4af37]/40 px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.15)]"
            >
              <Trophy className="w-4 h-4 text-[#d4af37]" />
              <span className="text-[11px] font-serif uppercase tracking-[0.25em] text-[#f3e5ab] font-bold">
                The Grand People's Choice 2026
              </span>
            </motion.div>

            {/* PEOPLE CHOICE AWARD Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4"
            >
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wider leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] drop-shadow-[0_4px_15px_rgba(212,175,55,0.2)]">
                PEOPLE CHOICE
              </h1>
              <div className="flex items-center justify-center lg:justify-start gap-3 mt-1.5 text-xs sm:text-sm font-serif tracking-[0.45em] text-[#e8d595] uppercase">
                <span>✦</span>
                <span>A W A R D</span>
                <span>✦</span>
              </div>
            </motion.div>

            {/* Glowing separator */}
            <div className="w-3/4 max-w-sm h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent my-4" />

            {/* The BIG Question Hook */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <span className="text-xs sm:text-sm tracking-[0.3em] font-serif uppercase text-gray-400">
                WHAT IF
              </span>
              <div className="font-serif text-5xl sm:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-[#fcf6ba] to-[#d4af37]">
                2 LAKH
              </div>
              <p className="font-serif text-base sm:text-lg lg:text-xl text-[#f3e5ab] uppercase tracking-wider leading-snug">
                People had the power to choose the top 20 writers &amp; poets?
              </p>
            </motion.div>

            <p className="mt-4 text-sm sm:text-base text-gray-400 max-w-lg leading-relaxed font-light">
              Enter India's most democratic literary honor. Powered by 200,000+ voting readers and backed by traditional publishing powerhouse Inkfetish.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href="/people-choice-award/register"
                className="w-full sm:w-auto py-4 px-8 rounded-xl font-bold text-sm uppercase tracking-wider text-black bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_25px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Award Kit Image Showcase with Apply Now CTA */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className="lg:col-span-5 w-full"
          >
            <div className="bg-[#120f0a]/95 backdrop-blur-xl border border-[#d4af37]/40 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[0_12px_45px_rgba(0,0,0,0.9)] relative overflow-hidden text-center space-y-6">
              
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#d4af37]/15 rounded-full blur-3xl pointer-events-none" />

              {/* High-res Award Kit Image Frame */}
              <div className="relative p-2.5 rounded-2xl bg-gradient-to-b from-[#d4af37]/25 via-[#1c160c] to-[#d4af37]/15 border border-[#d4af37]/45 shadow-[0_0_40px_rgba(212,175,55,0.25)] mx-auto overflow-hidden">
                <img 
                  src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1788291912/ChatGPT_Image_Sep_2_2026_01_13_09_AM_1_vb4vp2.png" 
                  alt="People's Choice Official Award Kit" 
                  className="rounded-xl object-contain w-full h-auto drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
                />
              </div>

              {/* Prominent Apply Now Button */}
              <Link
                href="/people-choice-award/register"
                className="w-full py-4 px-6 rounded-xl font-bold text-sm sm:text-base uppercase tracking-wider text-black bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_25px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

            </div>
          </motion.div>

        </div>
      </main>

      {/* --- SHINY TRANSITION BANNER --- */}
      <Link 
        href="/people-choice-award/register"
        className="block relative z-10 w-full bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] py-4 px-4 text-center shadow-lg shadow-[#d4af37]/20 overflow-hidden hover:brightness-105 transition-all cursor-pointer"
      >
        <p className="text-black font-bold text-sm sm:text-base md:text-lg tracking-wide max-w-4xl mx-auto leading-snug">
          ✦ Join the most prestigious writing and poetry award decided entirely by the readers. Click here to Apply Now → ✦
        </p>
      </Link>

      {/* --- ABOUT THE AWARD (Split Layout) --- */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-[#120f0a]/70 border border-[#d4af37]/25 rounded-3xl p-8 sm:p-12 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs uppercase font-serif tracking-[0.2em] text-[#d4af37]">
                <span>✦</span>
                <span>The Democratic Revolution</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#f3e5ab]">
                What is the People's Choice Award?
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base font-light">
                The People's Choice Award is a revolutionary literary platform where readers wield the ultimate power. Instead of a closed, behind-the-scenes jury deciding winners, <strong>200,000 passionate readers</strong> will vote to crown the top 20 Writers &amp; Poets.
              </p>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base font-light">
                It is the truest, most unbiased test of reader connection, literary resonance, and audience love.
              </p>
              
              <div className="pt-2">
                <Link
                  href="/people-choice-award/register"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#d4af37] hover:text-[#fcf6ba] transition-colors"
                >
                  <span>Click to Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative p-2 rounded-2xl bg-gradient-to-br from-[#d4af37]/30 via-transparent to-[#aa771c]/20 border border-[#d4af37]/40 shadow-[0_0_40px_rgba(212,175,55,0.25)] max-w-[340px] w-full">
                <img 
                  src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1788291545/ChatGPT_Image_Aug_25_2026_10_31_47_PM_1_ittzzw.png" 
                  alt="People's Choice Award Official Statuette" 
                  className="rounded-xl object-contain w-full h-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- TRUST INDICATOR CARDS --- */}
      <section className="relative z-10 border-y border-[#d4af37]/20 bg-[#0d0a06]/90 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="bg-[#15110a] border border-[#d4af37]/25 rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform shadow-lg shadow-black/50">
              <Users className="w-8 h-8 text-[#d4af37] mx-auto mb-3" />
              <div className="font-serif font-bold text-base sm:text-lg text-[#f3e5ab]">200,000+</div>
              <div className="text-[11px] uppercase tracking-widest text-gray-400 mt-1">Active Voters</div>
            </div>

            <div className="bg-[#15110a] border border-[#d4af37]/25 rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform shadow-lg shadow-black/50">
              <ShieldCheck className="w-8 h-8 text-[#d4af37] mx-auto mb-3" />
              <div className="font-serif font-bold text-base sm:text-lg text-[#f3e5ab]">100% Transparent</div>
              <div className="text-[11px] uppercase tracking-widest text-gray-400 mt-1">Reader Voting</div>
            </div>

            <div className="bg-[#15110a] border border-[#d4af37]/25 rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform shadow-lg shadow-black/50">
              <Globe className="w-8 h-8 text-[#d4af37] mx-auto mb-3" />
              <div className="font-serif font-bold text-base sm:text-lg text-[#f3e5ab]">Top 20 Laureates</div>
              <div className="text-[11px] uppercase tracking-widest text-gray-400 mt-1">National Recognition</div>
            </div>

            <div className="bg-[#15110a] border border-[#d4af37]/25 rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform shadow-lg shadow-black/50">
              <Scale className="w-8 h-8 text-[#d4af37] mx-auto mb-3" />
              <div className="font-serif font-bold text-base sm:text-lg text-[#f3e5ab]">Unbiased Selection</div>
              <div className="text-[11px] uppercase tracking-widest text-gray-400 mt-1">Audience Powered</div>
            </div>

          </div>
        </div>
      </section>

      {/* --- BENEFITS & REWARDS SECTION --- */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[#d4af37] font-serif mb-2">
            <span className="w-10 h-px bg-[#d4af37]/40" />
            <span>Rewards &amp; Recognition</span>
            <span className="w-10 h-px bg-[#d4af37]/40" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
            Top 20 Writers &amp; Poets <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c]">
              Win More Than Just an Award
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mt-3 max-w-2xl mx-auto">
            Recognition, legacy and extraordinary publishing rewards await the chosen voices.
          </p>
        </div>

        {/* Hero Card for Top 20 Award */}
        <div className="bg-gradient-to-br from-[#1c160c] via-[#120f0a] to-[#1c160c] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-10 mb-8 shadow-[0_0_50px_rgba(212,175,55,0.15)] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Text Details */}
            <div className="lg:col-span-4 space-y-4 text-center lg:text-left">
              <span className="inline-block bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#f3e5ab] text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1 rounded-full">
                TOP 20 WINNERS
              </span>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <Trophy className="w-8 h-8 text-[#d4af37] drop-shadow-[0_0_15px_rgba(212,175,55,0.6)] flex-shrink-0" />
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#f3e5ab] leading-tight">
                  Prestigious Award + Home Delivery
                </h3>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                Every one of the Top 20 receives a stunning, custom-crafted physical award statuette and recognition kit delivered straight to their doorstep across India.
              </p>
            </div>

            {/* Center: Award Picture */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative p-2 rounded-2xl bg-gradient-to-b from-[#d4af37]/20 via-transparent to-[#d4af37]/10 border border-[#d4af37]/35 shadow-[0_0_35px_rgba(212,175,55,0.2)] max-w-[280px] w-full">
                <img 
                  src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1788291912/ChatGPT_Image_Sep_2_2026_01_13_09_AM_1_vb4vp2.png" 
                  alt="Top 20 Official Award Kit" 
                  className="rounded-xl object-contain w-full h-auto drop-shadow-[0_8px_20px_rgba(0,0,0,0.7)] hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Right: Inclusions Checklist */}
            <div className="lg:col-span-4 lg:border-l lg:border-[#d4af37]/20 lg:pl-8 space-y-3">
              <div className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2 text-center lg:text-left">
                Winner Inclusions:
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                <span>Physical Golden Statuette</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                <span>Official Recognition Certificate</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                <span>Free Safe Home Delivery</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                <span>Permanent Heritage Wall Enshrinement</span>
              </div>
            </div>

          </div>
        </div>

        {/* 3 Sub-Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <div className="bg-[#120f0a]/90 border border-[#d4af37]/25 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1.5 transition-transform">
            <div>
              <span className="text-[10px] font-serif uppercase tracking-widest text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                TOP 3 WINNERS
              </span>
              <BookOpen className="w-8 h-8 text-[#d4af37] mt-4 mb-3" />
              <h4 className="font-serif text-lg font-bold text-[#f3e5ab] mb-2">
                Free Solo Book Publication
              </h4>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                The Top 3 authors receive free solo book publishing by Inkfetish — cover design, editing, ISBN, and global distribution.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 text-xs font-bold text-[#d4af37]">
              🔥 Highest Value Prize
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1a140b] to-[#120f0a] border border-[#d4af37]/40 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1.5 transition-transform shadow-[0_0_25px_rgba(212,175,55,0.1)]">
            <div>
              <span className="text-[10px] font-serif uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30 px-2.5 py-1 rounded-full">
                ALL TOP 20
              </span>
              <Gift className="w-8 h-8 text-[#d4af37] mt-4 mb-3" />
              <h4 className="font-serif text-lg font-bold text-[#f3e5ab] mb-2">
                Exclusive Goodies Kit
              </h4>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                All Top 20 winners receive curated exclusive author merchandise and author kit goodies.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-[#d4af37]/20 text-xs font-bold text-[#d4af37]">
              ✦ Worth ₹25,000
            </div>
          </div>

          <div className="bg-[#120f0a]/90 border border-[#d4af37]/25 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1.5 transition-transform">
            <div>
              <span className="text-[10px] font-serif uppercase tracking-widest text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                ALL TOP 20
              </span>
              <Landmark className="w-8 h-8 text-[#d4af37] mt-4 mb-3" />
              <h4 className="font-serif text-lg font-bold text-[#f3e5ab] mb-2">
                Heritage Wall Recognition
              </h4>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Your name immortalized forever on the official People's Choice Heritage Wall on Inkfetish.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 text-xs font-bold text-gray-400">
              ♾️ Permanent Digital Legacy
            </div>
          </div>

        </div>

        {/* Every Participant Banner */}
        <div className="bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] rounded-2xl p-6 text-black flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4">
            <GraduationCap className="w-12 h-12 flex-shrink-0 text-black/80" />
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-black/70">
                GUARANTEED FOR EVERY PARTICIPANT
              </div>
              <div className="font-serif text-base sm:text-lg font-bold text-black leading-tight">
                Every participant receives an official People's Choice Participation Certificate + Personalized Appreciation Letter.
              </div>
            </div>
          </div>
          <Link
            href="/people-choice-award/register"
            className="shrink-0 bg-black text-[#fcf6ba] font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-xl hover:bg-black/80 transition-colors"
          >
            Register Now →
          </Link>
        </div>

      </section>

      {/* --- 5 STAGES ROADMAP & PROGRESS TIMELINE --- */}
      <section className="relative z-10 border-y border-[#d4af37]/20 bg-gradient-to-b from-[#090704] via-[#0f0c07] to-[#090704] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[#d4af37] font-serif mb-2">
              <span className="w-10 h-px bg-[#d4af37]/40" />
              <span>Roadmap to Glory</span>
              <span className="w-10 h-px bg-[#d4af37]/40" />
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
              Your 5-Stage Path to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c]">Top 20</span>
            </h2>
            <p className="text-xs sm:text-base text-gray-400 mt-2 max-w-2xl mx-auto">
              A transparent, step-by-step tournament timeline from your initial nomination to live national coronation.
            </p>
          </div>

          {/* Desktop Progress Bar Line (Horizontal) */}
          <div className="hidden lg:block relative mb-12">
            <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] shadow-[0_0_15px_rgba(212,175,55,0.4)] z-0 rounded-full" />
            
            <div className="grid grid-cols-5 relative z-10">
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#1c1409] border-2 border-[#d4af37] text-[#f3e5ab] font-serif font-black text-sm flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.5)] ring-4 ring-[#090704]">
                  01
                </div>
                <span className="text-[11px] font-bold text-[#d4af37] mt-3 uppercase tracking-wider">Nomination</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#1c1409] border-2 border-[#d4af37] text-[#f3e5ab] font-serif font-black text-sm flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.5)] ring-4 ring-[#090704]">
                  02
                </div>
                <span className="text-[11px] font-bold text-[#d4af37] mt-3 uppercase tracking-wider">Submission</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#1c1409] border-2 border-[#d4af37] text-[#f3e5ab] font-serif font-black text-sm flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.5)] ring-4 ring-[#090704]">
                  03
                </div>
                <span className="text-[11px] font-bold text-[#d4af37] mt-3 uppercase tracking-wider">Reader Voting</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#1c1409] border-2 border-[#d4af37] text-[#f3e5ab] font-serif font-black text-sm flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.5)] ring-4 ring-[#090704]">
                  04
                </div>
                <span className="text-[11px] font-bold text-[#d4af37] mt-3 uppercase tracking-wider">Parallel Review</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#bf953f] to-[#aa771c] border-2 border-white text-black font-serif font-black text-sm flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.8)] ring-4 ring-[#090704] animate-pulse">
                  🏆
                </div>
                <span className="text-[11px] font-bold text-[#fcf6ba] mt-3 uppercase tracking-wider">Grand Gala</span>
              </div>

            </div>
          </div>

          {/* Cards Grid (Connected Flow) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            
            {/* Stage 1 */}
            <div className="bg-[#141009]/90 border border-[#d4af37]/30 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-2 transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.6)] group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-serif font-bold text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/25 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    STAGE 01
                  </span>
                  <span className="text-2xl group-hover:scale-110 transition-transform">📝</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#f3e5ab] mb-2">Register</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Fill out the nomination form with your name, category, and writing portfolio or social profile link.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-semibold text-[#d4af37]/80 flex items-center gap-1">
                <span>⚡ Quick 1-Min Portal</span>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="bg-[#141009]/90 border border-[#d4af37]/30 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-2 transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.6)] group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-serif font-bold text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/25 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    STAGE 02
                  </span>
                  <span className="text-2xl group-hover:scale-110 transition-transform">📤</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#f3e5ab] mb-2">Submit Entry</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Submit your masterpiece (poem, story, or article) within 1.5 weeks from now.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-semibold text-red-400/90 flex items-center gap-1">
                <span>⏳ Closes in 1.5 weeks</span>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="bg-[#141009]/90 border border-[#d4af37]/30 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-2 transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.6)] group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-serif font-bold text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/25 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    STAGE 03
                  </span>
                  <span className="text-2xl group-hover:scale-110 transition-transform">🗳️</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#f3e5ab] mb-2">Live Voting</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Voting will be done through Ink.fetish (Instagram page with 210K+ followers), our writing community, and 40+ WhatsApp groups, with a target reach of over 2 lakh people.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-semibold text-[#d4af37]/90 flex items-center gap-1">
                <span>🗓️ 28th–30th October</span>
              </div>
            </div>

            {/* Stage 4 */}
            <div className="bg-[#141009]/90 border border-[#d4af37]/30 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-2 transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.6)] group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-serif font-bold text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/25 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    STAGE 04
                  </span>
                  <span className="text-2xl group-hover:scale-110 transition-transform">⚖️</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#f3e5ab] mb-2">Parallel Review</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Senior editorial panel scores entries in parallel to guarantee uncompromising literary merit and quality.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-semibold text-[#d4af37]/80 flex items-center gap-1">
                <span>🔍 100% Fair Evaluation</span>
              </div>
            </div>

            {/* Stage 5 (Grand Finale Card) */}
            <div className="bg-gradient-to-b from-[#251a0b] to-[#141009] border-2 border-[#d4af37]/60 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-2 transition-all duration-300 shadow-[0_0_35px_rgba(212,175,55,0.2)] group md:col-span-2 lg:col-span-1">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-serif font-extrabold text-black bg-gradient-to-r from-[#bf953f] to-[#fcf6ba] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                    GRAND FINALE
                  </span>
                  <span className="text-2xl group-hover:scale-110 transition-transform">🎬</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#fcf6ba] mb-2">Live Zoom Gala</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  The Top 20 writers will be announced during a live Zoom session.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#d4af37]/30 text-[11px] font-bold text-[#fcf6ba] flex items-center gap-1">
                <span>🏆 Result: 1st November</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- KEY DATES & TIMELINE --- */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#f3e5ab]">
            Key Timeline &amp; Dates
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Mark your calendar — every milestone matters.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="bg-[#120f0a] border border-green-500/30 rounded-2xl p-6 text-center">
            <span className="text-[10px] uppercase font-bold tracking-widest text-green-400 bg-green-950/60 border border-green-500/40 px-2.5 py-0.5 rounded-full">
              LIVE NOW
            </span>
            <div className="text-xs text-gray-400 uppercase tracking-wider mt-4">Registration</div>
            <div className="font-serif text-lg font-bold text-white mt-1">Open Now</div>
          </div>

          <div className="bg-gradient-to-b from-[#24130f] to-[#120f0a] border border-red-500/50 rounded-2xl p-6 text-center shadow-[0_0_25px_rgba(239,68,68,0.15)]">
            <span className="text-[10px] uppercase font-bold tracking-widest text-red-400 bg-red-950/60 border border-red-500/40 px-2.5 py-0.5 rounded-full">
              CLOSING SOON
            </span>
            <div className="text-xs text-gray-400 uppercase tracking-wider mt-4">Submission Deadline</div>
            <div className="font-serif text-lg font-bold text-[#f3e5ab] mt-1">1.5 Week from Now</div>
          </div>

          <div className="bg-[#120f0a] border border-indigo-500/30 rounded-2xl p-6 text-center">
            <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 bg-indigo-950/60 border border-indigo-500/40 px-2.5 py-0.5 rounded-full">
              UPCOMING
            </span>
            <div className="text-xs text-gray-400 uppercase tracking-wider mt-4">Live Voting</div>
            <div className="font-serif text-lg font-bold text-white mt-1">28th–30th October 2026</div>
          </div>

          <div className="bg-[#120f0a] border border-[#d4af37]/30 rounded-2xl p-6 text-center">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30 px-2.5 py-0.5 rounded-full">
              CONFIRMED
            </span>
            <div className="text-xs text-gray-400 uppercase tracking-wider mt-4">Result Declaration</div>
            <div className="font-serif text-lg font-bold text-[#fcf6ba] mt-1">1st November 2026</div>
          </div>

        </div>
      </section>

      {/* --- STRICT PARTICIPANT LIMIT SECTION --- */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-[#1f170c] via-[#141009] to-[#1f170c] border border-[#d4af37]/40 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-5 text-center md:text-left flex-col md:flex-row">
            <Lock className="w-12 h-12 text-[#d4af37] flex-shrink-0" />
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#f3e5ab]">
                Strictly Limited to <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#d4af37]">250</span> Participants
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
                To guarantee equal visibility and fair voting reach for every participant, nominations will close forever as soon as 250 spots are filled.
              </p>
            </div>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/people-choice-award/register"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#bf953f] to-[#aa771c] text-black font-bold text-xs sm:text-sm uppercase tracking-wider py-3.5 px-6 rounded-xl hover:brightness-110 shadow-lg cursor-pointer"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS AUTO-SLIDER SECTION (Real WhatsApp Cloudinary Images) --- */}
      <section className="relative z-10 w-full py-20 bg-[#060504] border-y border-[#d4af37]/20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-serif mb-2">
            <span>✦</span>
            <span>Real Feedback from Real Authors</span>
            <span>✦</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Writers Who Trusted <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c]">Inkfetish</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            Join over 1,000+ satisfied writers and poets from across India.
          </p>
        </div>

        {/* Track 1: Left Scroll */}
        <div className="relative w-full overflow-hidden py-3 group [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex gap-4 w-max animate-scroll-left group-hover:[animation-play-state:paused]">
            {[...testimonialsRow1, ...testimonialsRow1].map((src, i) => (
              <img 
                key={`t1-${i}`}
                src={src} 
                alt="Author Testimonial" 
                loading="lazy"
                className="h-48 sm:h-56 w-auto max-w-[320px] object-contain rounded-xl bg-[#14100a] border border-[#d4af37]/30 shadow-lg hover:scale-105 hover:border-[#d4af37] transition-all cursor-pointer flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Track 2: Right Scroll */}
        <div className="relative w-full overflow-hidden py-3 group [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex gap-4 w-max animate-scroll-right group-hover:[animation-play-state:paused]">
            {[...testimonialsRow2, ...testimonialsRow2].map((src, i) => (
              <img 
                key={`t2-${i}`}
                src={src} 
                alt="Author Testimonial" 
                loading="lazy"
                className="h-48 sm:h-56 w-auto max-w-[320px] object-contain rounded-xl bg-[#14100a] border border-[#d4af37]/30 shadow-lg hover:scale-105 hover:border-[#d4af37] transition-all cursor-pointer flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Track 3: Left Scroll */}
        <div className="relative w-full overflow-hidden py-3 group [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex gap-4 w-max animate-scroll-left group-hover:[animation-play-state:paused]">
            {[...testimonialsRow3, ...testimonialsRow3].map((src, i) => (
              <img 
                key={`t3-${i}`}
                src={src} 
                alt="Author Testimonial" 
                loading="lazy"
                className="h-48 sm:h-56 w-auto max-w-[320px] object-contain rounded-xl bg-[#14100a] border border-[#d4af37]/30 shadow-lg hover:scale-105 hover:border-[#d4af37] transition-all cursor-pointer flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Trust Stats Bar */}
        <div className="max-w-4xl mx-auto px-4 mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm uppercase tracking-wider text-[#d4af37] font-semibold">
          <span>⭐⭐⭐⭐⭐ 4.9/5 Rating</span>
          <span className="hidden sm:inline text-white/20">|</span>
          <span>1,000+ Happy Participants</span>
          <span className="hidden sm:inline text-white/20">|</span>
          <span>100% Prize Delivery</span>
        </div>
      </section>

      {/* --- ABOUT INKFETISH PUBLICATION --- */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="bg-[#120f0a]/80 border border-[#d4af37]/25 rounded-3xl p-8 sm:p-12 backdrop-blur-md">
          <img 
            src="/images/inkfetish_logo.png" 
            alt="Inkfetish Logo" 
            className="w-14 h-14 rounded-full mx-auto mb-4 border border-[#d4af37]/40 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
          />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#f3e5ab] mb-3">
            Backed by Inkfetish Publication
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-light">
            Inkfetish Publication is a premier traditional publishing house dedicated to unearthing raw talent and bringing extraordinary voices to the forefront of global literature. Join a community of authors who are shaping the future of storytelling.
          </p>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative z-10 border-t border-white/10 bg-[#050403] py-8 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Inkfetish Publication. All rights reserved. People's Choice Award.</p>
      </footer>

      {/* --- STICKY ALWAYS-ON CONVERSION BOTTOM BAR --- */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0805]/95 backdrop-blur-xl border-t border-[#d4af37]/40 shadow-[0_-10px_40px_rgba(0,0,0,0.95)] py-2.5 px-3 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          
          <div className="flex items-center gap-2.5 sm:gap-4">
            <div className="hidden sm:flex w-10 h-10 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/35 items-center justify-center shrink-0">
              <Trophy className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30 px-2 py-0.5 rounded-full">
                  STRICTLY 250 SEATS TOTAL
                </span>
                <span className="hidden md:inline text-xs text-gray-400">
                  ✦ Decided by 200,000+ Readers
                </span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-white mt-0.5 font-serif">
                People's Choice Award 2026
              </div>
            </div>
          </div>

          <Link
            href="/people-choice-award/register"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider py-2.5 sm:py-3 px-4 sm:px-7 rounded-xl hover:brightness-110 shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all active:scale-95 shrink-0 touch-manipulation animate-pulse"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

        </div>
      </div>

    </div>
  );
}
