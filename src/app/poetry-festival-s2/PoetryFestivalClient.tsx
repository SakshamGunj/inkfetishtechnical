'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Trophy, Star, ShieldCheck, BookOpen,
  CheckCircle2, Award, Camera, Quote, MessageSquare,
  MapPin, ArrowRight, Users, BookMarked,
  Mic, Feather, Flame,
  Globe, Heart, Sparkles, ChevronDown, Check
} from 'lucide-react';
import Footer from '@/components/Footer';

// ── Countdown hook ────────────────────────────────────────────────────────────
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate.getTime()]);
  return timeLeft;
}

// ── Animated counter ─────────────────────────────────────────────────────────
function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = value / 60;
    const id = setInterval(() => {
      start += step;
      if (start >= value) { setDisplay(value); clearInterval(id); return; }
      setDisplay(Math.floor(start));
    }, 16);
    return () => clearInterval(id);
  }, [inView, value]);
  return <span ref={ref}>{display.toLocaleString('en-IN')}{suffix}</span>;
}

// ── FAQ Item ─────────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border-b border-white/5 cursor-pointer group transition-all duration-300 ${open ? 'bg-white/[0.02]' : ''}`}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-start justify-between gap-4 py-6 px-1">
        <h4 className="text-sm md:text-base font-semibold text-[#fdfbf7] leading-snug">{q}</h4>
        <div className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${open ? 'border-gold text-gold rotate-180' : 'border-white/20 text-white/40'}`}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="pb-6 px-1"
        >
          <p className="text-sm text-[#8a8a8a] leading-relaxed">{a}</p>
        </motion.div>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function PoetryFestivalClient() {
  const deadline = useMemo(() => new Date('2026-05-31T23:59:59'), []);
  const { days, hours, minutes, seconds } = useCountdown(deadline);
  const [seatsLeft] = useState(87);
  const totalSeats = 250;
  const seatsFilled = totalSeats - seatsLeft;
  const fillPercent = (seatsFilled / totalSeats) * 100;

  const prizes = [
    { rank: '1st', label: 'Grand Champion', prize: '₹7,500 Cash + Gold Trophy + Medal + Certificate', color: 'from-[#c5a059] to-[#8a6d2e]', glow: 'rgba(197,160,89,0.4)' },
    { rank: '2nd', label: 'Silver Laureate', prize: '₹4,000 Cash + Silver Medal + Certificate', color: 'from-[#9ba5b0] to-[#697781]', glow: 'rgba(155,165,176,0.3)' },
    { rank: '3rd', label: 'Bronze Voice', prize: '₹2,000 Cash + Bronze Medal + Certificate', color: 'from-[#b87333] to-[#7a4d22]', glow: 'rgba(184,115,51,0.3)' },
  ];

  const categories = [
    { icon: <Heart className="w-5 h-5" />, title: 'Love & Longing', desc: 'The ache of connection, the beauty of devotion, the silence of separation.' },
    { icon: <Globe className="w-5 h-5" />, title: 'Nature & Universe', desc: 'Mountains, monsoons, galaxies — the infinite that humbles us.' },
    { icon: <Flame className="w-5 h-5" />, title: 'Rebellion & Truth', desc: 'Speak what the world is afraid to hear. Verse as resistance.' },
    { icon: <Sparkles className="w-5 h-5" />, title: 'Memory & Identity', desc: 'Who you are, where you came from, what shaped you.' },
    { icon: <Feather className="w-5 h-5" />, title: 'Open Theme', desc: 'Any emotion, experience, or world — expressed through verse.' },
    { icon: <Mic className="w-5 h-5" />, title: 'Hindi / Urdu Poetry', desc: 'Sher, ghazal, nazm — the mother tongue of Indian poetry.' },
  ];

  const judges = [
    { name: 'Priya Varshney', role: 'Chief Editor, Inkfetish Publications', initials: 'PV' },
    { name: 'Arjun Mehra', role: 'Literary Award Panelist & Poet', initials: 'AM' },
    { name: 'Dr. Sunita Rao', role: 'Professor of Literature, Delhi University', initials: 'SR' },
    { name: 'Kabir Nair', role: 'Spoken Word Performer & Author', initials: 'KN' },
  ];

  const timeline = [
    { date: 'May 1, 2026', label: 'Registrations Open', done: true },
    { date: 'May 31, 2026', label: 'Submission Deadline', done: false },
    { date: 'June 10, 2026', label: 'Shortlist Announced', done: false },
    { date: 'June 20, 2026', label: 'Winners Declared (Live Zoom)', done: false },
    { date: 'July 2026', label: 'Anthology Published & Couriered', done: false },
  ];

  const faqs = [
    { q: 'Is this contest open to beginners?', a: 'Absolutely. Season 1 had some of its most powerful entries from first-time poets. If you have something real to say, this is your stage.' },
    { q: 'Will my poem truly be published in a physical book?', a: 'Yes. Every registered participant\'s poem is published in the official Season 2 printed anthology — shipped to your home. Not conditionally. Not just for winners.' },
    { q: 'What languages are accepted?', a: 'English, Hindi, and Urdu. If your submission is in Hindi or Urdu, please include a transliteration in Roman script.' },
    { q: 'How long should my poem be?', a: 'Minimum 8 lines, maximum 40 lines. Detailed guidelines, formatting rules, and theme briefs are sent immediately after registration.' },
    { q: 'When and how are physical items delivered?', a: 'Certificates, medals, and the anthology are physically printed and couriered to the address you provide at registration. Expected delivery: July 2026.' },
    { q: 'Can I submit more than one poem?', a: 'Each registration includes one poem entry. To submit multiple poems, you may register more than once with separate entries.' },
    { q: 'Is the registration fee refundable?', a: 'Registration fees are non-refundable once the submission window is open — as your poem slot and publication space are immediately reserved.' },
    { q: 'How are poems evaluated?', a: 'By a panel of real literary editors and judges — against criteria of originality, emotional resonance, craft, and thematic clarity. No algorithms.' },
  ];

  const galleryImages = [
    "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100331/WhatsApp_Image_2026-04-13_at_9.06.50_PM-compressed_f54p62.webp",
    "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100331/WhatsApp_Image_2026-04-13_at_9.06.50_PM_1_-compressed_bla9w8.webp",
    "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100331/WhatsApp_Image_2026-04-13_at_9.06.49_PM-compressed_krdg8g.webp",
    "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_9.06.49_PM_1_-compressed_ylopb7.webp",
    "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_9.06.50_PM_2_-compressed_nrkzf4.webp",
    "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_8.12.24_PM-compressed_skr10b.webp",
    "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_9.06.48_PM-compressed_ftx5ea.webp",
    "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_9.06.48_PM_1_-compressed_zolkao.webp",
    "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_8.27.49_PM-compressed_hhn7yj.webp",
    "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100329/WhatsApp_Image_2026-04-13_at_8.19.16_PM-compressed_pii87q.webp",
    "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775933371/WhatsApp_Image_2026-03-29_at_12.40.13_PM-compressed_wjaeil.webp",
    "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775933370/WhatsApp_Image_2026-03-29_at_12.35.16_PM-compressed_qldola.webp",
    "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775933368/WhatsApp_Image_2026-03-29_at_12.35.16_PM_2_-compressed_d12sxy.webp",
    "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775933367/WhatsApp_Image_2026-03-29_at_12.35.16_PM_1_-compressed_ddda2d.webp",
    "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775933367/WhatsApp_Image_2026-03-28_at_8.00.34_PM-compressed_yfhhz2.webp"
  ];

  const bannerImages = [
    "https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1776850542/1_txyggo.png",
    "https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1776850540/3_gxc61n.png",
    "https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1776850539/2_zhw4ty.png"
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#fdfbf7] font-sans selection:bg-gold selection:text-black overflow-x-hidden">

      {/* ── URGENCY TOP BANNER ── */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-[#1a0a2e] via-[#2d1060] to-[#1a0a2e] border-b border-purple-900/40 py-2.5 px-4 text-center">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="animate-pulse text-yellow-400">⚡</span>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-purple-100">
            Season 2 Is Live — Only <span className="text-yellow-400">{seatsLeft} seats remaining</span> out of {totalSeats}.
          </span>
          <span className="hidden sm:inline text-[10px] text-purple-300 uppercase tracking-widest font-medium">
            Registration closes when full. No extensions.
          </span>
        </div>
      </div>

      {/* ── HERO SECTION ── */}
      <section className="relative flex flex-col overflow-hidden pt-4 md:pt-12 pb-20">
        {/* Background: deep violet starfield */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d0118] via-[#050505] to-[#080012] pointer-events-none" />
        {/* Radial glow blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] bg-purple-900/20 blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-900/20 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/[0.04] blur-[150px] rounded-full pointer-events-none" />
        {/* Decorative lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute top-0 bottom-0 border-l border-white/[0.02]" style={{ left: `${20 * (i + 1)}%` }} />
          ))}
        </div>

        {/* MASSIVE EDGE-TO-EDGE SLIDING BANNER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="relative w-full mb-10 overflow-hidden"
        >
          <div className="w-full relative aspect-[16/10] sm:aspect-video md:aspect-[21/6]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBanner}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <img 
                  src={bannerImages[currentBanner]} 
                  alt={`Poetry Festival Hero Banner ${currentBanner + 1}`}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Minimalist Progress Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {bannerImages.map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentBanner ? 'bg-gold w-8' : 'bg-white/20'}`}
              />
            ))}
          </div>
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">

          {/* Eyebrow */}
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-3 mb-8">
            <Link href="/" className="text-[10px] uppercase tracking-[0.4em] font-bold text-purple-400 hover:text-gold transition-colors">Presented by Inkfetish Publications</Link>
            <div className="inline-flex items-center gap-2 px-5 py-2 border border-gold/25 bg-black/50 backdrop-blur-sm text-gold text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase">
              <Feather className="w-3.5 h-3.5" />
              India's Premier Poetry Contest
            </div>
          </motion.div>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-base sm:text-xl text-[#aaaaaa] max-w-2xl mx-auto leading-relaxed mb-10 font-light"
          >
            Submit one poem. Get published in a real printed anthology. Compete for ₹13,500+ in prizes.
            Win national recognition. <strong className="text-[#fdfbf7] font-semibold">Limited to 250 poets only.</strong>
          </motion.p>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-3 sm:gap-5 mb-10"
          >
            {[
              { val: days, label: 'Days' },
              { val: hours, label: 'Hours' },
              { val: minutes, label: 'Mins' },
              { val: seconds, label: 'Secs' },
            ].map(({ val, label }, i) => (
              <React.Fragment key={label}>
                <div className="text-center">
                  <div className="relative">
                    <div className="w-[68px] sm:w-[80px] h-[68px] sm:h-[80px] bg-[#0d0d0d] border border-white/10 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(197,160,89,0.08)] backdrop-blur-sm">
                      <span className="text-2xl sm:text-3xl font-black font-mono text-gold tabular-nums">
                        {String(val).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#555] font-bold mt-2 block">{label}</span>
                </div>
                {i < 3 && <span className="text-gold/60 text-xl font-bold mb-4">:</span>}
              </React.Fragment>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link href="/poetry-festival-s2/register" className="relative group w-full sm:w-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-gold/60 via-purple-500/40 to-gold/40 rounded-sm blur opacity-50 group-hover:opacity-80 transition duration-500" />
              <button className="relative w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-gold to-[#d4a843] hover:from-[#ebd298] hover:to-gold text-[#050505] font-black text-xs sm:text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 rounded-sm shadow-xl">
                Claim My Seat — Register Now <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <a href="#about" className="w-full sm:w-auto px-8 py-4 border border-white/15 hover:border-white/30 text-[#aaa] hover:text-white text-xs uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-2 rounded-sm backdrop-blur-sm">
              Learn More <ChevronDown className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Trust mini strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[10px] uppercase tracking-widest font-bold text-[#555]"
          >
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-green-500" /> 100% Secure</span>
            <span className="flex items-center gap-1.5"><BookMarked className="w-3.5 h-3.5 text-gold" /> Published Anthology</span>
            <span className="flex items-center gap-1.5"><Trophy className="w-3.5 h-3.5 text-gold" /> Season 1 Delivered</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-purple-400" /> Pan-India Delivery</span>
          </motion.div>
        </div>

        {/* Hero stat bar below hero */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 mt-16 w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5 border border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
            {[
              { val: 250, suffix: '', label: 'Participant Limit', icon: <Users className="w-5 h-5" /> },
              { val: 13500, suffix: '+', label: 'Prize Pool (₹)', icon: <Trophy className="w-5 h-5" /> },
              { val: 100, suffix: '%', label: 'Physical Delivery', icon: <MapPin className="w-5 h-5" /> },
              { val: 150, suffix: '+', label: 'Season 1 Poets Published', icon: <BookOpen className="w-5 h-5" /> },
            ].map(({ val, suffix, label, icon }, i) => (
              <div key={i} className="flex flex-col items-center justify-center py-6 px-3 gap-2 group hover:bg-white/[0.02] transition-colors">
                <div className="text-gold/50 group-hover:text-gold transition-colors duration-300">{icon}</div>
                <div className="text-2xl sm:text-3xl font-black font-serif text-[#fdfbf7]">
                  <AnimatedNumber value={val} suffix={suffix} />
                </div>
                <div className="text-[9px] uppercase tracking-widest text-[#444] text-center leading-tight">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT THE EVENT ── */}
      <section id="about" className="py-28 bg-[#030303] border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="text-[22vw] font-black text-white/[0.012] uppercase tracking-widest select-none font-sans whitespace-nowrap">FESTIVAL</span>
        </div>

        <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">

            {/* Left: Image collage */}
            <div className="relative h-[420px] sm:h-[500px]">
              {/* Main card */}
              <div className="absolute top-0 left-0 w-[70%] h-[75%] bg-gradient-to-br from-[#1a0a2e] to-[#0d0118] border border-purple-900/30 rounded-sm overflow-hidden shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Feather className="w-24 h-24 text-purple-800/30" strokeWidth={0.5} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="text-gold text-xs font-bold uppercase tracking-widest mb-1">Season 1</div>
                  <div className="text-white font-serif text-lg font-bold">150 voices. One anthology.</div>
                </div>
              </div>
              {/* Secondary card */}
              <div className="absolute bottom-0 right-0 w-[60%] h-[65%] bg-gradient-to-br from-[#0d0118] to-[#050505] border border-gold/20 rounded-sm overflow-hidden shadow-xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Trophy className="w-20 h-20 text-gold/20" strokeWidth={0.5} />
                </div>
                <div className="absolute top-4 right-4">
                  <div className="text-[9px] uppercase tracking-widest font-black text-gold bg-gold/10 border border-gold/20 px-3 py-1.5">Season 2 Open</div>
                </div>
                <div className="absolute bottom-6 left-6">
                  <div className="text-[#555] text-[10px] uppercase tracking-wider font-bold">Prize Pool</div>
                  <div className="text-gold text-2xl font-black font-serif">₹13,500+</div>
                </div>
              </div>
              {/* Badge overlay */}
              <div className="absolute top-[30%] right-[18%] bg-[#0a0a0a] border border-gold/30 px-4 py-3 shadow-xl z-20 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] uppercase tracking-widest text-[#fdfbf7] font-bold">Accepting Submissions</span>
              </div>
            </div>

            {/* Right: Copy */}
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-purple-400 block mb-4">The Story Behind the Stage</span>
              <h2 className="text-4xl md:text-5xl font-serif font-black text-[#fdfbf7] leading-[1.1] mb-8">
                Poetry Festival is India's Most Credible <span className="italic text-gold">Verse Competition.</span>
              </h2>
              <div className="space-y-5 text-[#888] font-light leading-relaxed text-[15px]">
                <p>
                  In Season 1, <strong className="text-white font-medium">150 poets entered, 150 were published</strong>. Every certificate was physically printed and couriered. Every promise was kept.
                </p>
                <p>
                  Season 2 raises the bar. Bigger prizes. Renowned judges. A grander anthology. And the same iron-clad guarantee: <strong className="text-white font-medium">every registered poet becomes a published poet</strong>.
                </p>
                <p>
                  This is not another online contest that sends a PDF and disappears. Poetry Festival is a <strong className="text-[#fdfbf7] font-semibold">permanent literary event</strong> — for poets who want real recognition.
                </p>
              </div>
              <div className="mt-10 flex flex-col gap-4">
                {[
                  'Physical anthology couriered to your home',
                  'Certificate of Excellence for every participant',
                  'Cash prizes + medals for top 3',
                  'Live Zoom announcement ceremony',
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-gold" />
                    </div>
                    <span className="text-sm text-[#ccc] font-light">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEASON 1 PROOF STRIP ── */}
      <section className="py-20 bg-[#050505] border-t border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold">Track Record That Speaks</span>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-[#fdfbf7] mt-3">Season 1 Delivered Every Promise.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: '150', label: 'Poets Participated', desc: 'From across India — beginners, professionals, dreamers.', icon: <Users className="w-6 h-6" /> },
              { num: '100%', label: 'Certificates Delivered', desc: 'Every single one physically printed & couriered to their home.', icon: <CheckCircle2 className="w-6 h-6" /> },
              { num: '10', label: 'Top Winners Honoured', desc: 'Trophies, medals and cash prizes handed to the best 10.', icon: <Award className="w-6 h-6" /> },
            ].map(({ num, label, desc, icon }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                viewport={{ once: true }}
                className="group relative bg-[#0a0a0a] border border-white/5 p-8 hover:border-gold/20 hover:shadow-[0_0_30px_rgba(197,160,89,0.08)] transition-all duration-500 rounded-sm"
              >
                <div className="text-gold/40 group-hover:text-gold/70 transition-colors mb-5">{icon}</div>
                <div className="text-5xl md:text-6xl font-black font-serif text-transparent bg-clip-text bg-gradient-to-b from-gold to-gold/30 mb-2">{num}</div>
                <div className="text-[11px] uppercase tracking-widest font-bold text-[#fdfbf7] mb-3">{label}</div>
                <p className="text-sm text-[#666] font-light leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </section>

      {/* ── VISUAL GALLERY (WALL OF EVIDENCE) ── */}
      <section className="py-24 bg-[#030303] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="mb-16">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-purple-400 block mb-4">Real Proof of Delivery</span>
            <h2 className="text-4xl md:text-5xl font-serif font-black text-[#fdfbf7] leading-tight">
              The Wall of <span className="italic text-gold">Evidence.</span>
            </h2>
            <p className="text-[#666] text-sm mt-6 max-w-xl font-light italic">
              "These aren't studio shots. These are real poets across India receiving their trophies, certificates, and books. This is our promise, delivered."
            </p>
          </div>

          <div className="columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {/* Editorial Card 1 */}
            <div className="break-inside-avoid mb-4 bg-gradient-to-br from-[#1a0a2e] to-[#0d0118] border border-purple-900/30 p-8 text-white flex flex-col justify-between aspect-square">
               <Trophy size={32} className="text-gold mb-8" />
               <div className="space-y-4">
                 <div className="text-2xl font-serif font-black uppercase tracking-tighter leading-none italic">
                    100% <br/> Payout & Delivery.
                 </div>
                 <p className="text-[9px] font-sans uppercase tracking-widest text-[#39FF14] font-black">SEASON 1 SUCCESS</p>
               </div>
            </div>

            {galleryImages.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (i % 4) * 0.1 }}
                viewport={{ once: true }}
                className="break-inside-avoid group relative overflow-hidden bg-[#0a0a0a] border border-white/5"
              >
                <img 
                  src={src} 
                  alt={`Inkfetish Winner Proof ${i + 1}`}
                  className="w-full h-auto grayscale-[0.6] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                />
                
                {/* Overlay Decor */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
                      <span className="text-[9px] font-sans font-black uppercase tracking-widest text-white">Verified Delivery</span>
                   </div>
                </div>

                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <Camera size={14} className="text-white/30" />
                </div>
              </motion.div>
            ))}

            {/* Editorial Card 2 */}
            <div className="break-inside-avoid mb-4 bg-[#0a0a0a] p-8 border border-gold/20 flex flex-col justify-center aspect-[3/4]">
               <div className="flex flex-col items-center text-center">
                  <Star size={24} className="text-gold mb-6" />
                  <h5 className="text-lg font-serif font-black uppercase tracking-tighter text-[#fdfbf7] mb-4">Your Name Next?</h5>
                  <p className="text-[9px] text-[#555] font-sans font-black uppercase tracking-[0.2em] leading-relaxed italic">
                    The only thing stopping you is the deadline.
                  </p>
               </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-[#333]">
              1,155+ WRITERS TRUST INKFETISH NATIONWIDE.
            </p>
          </div>
        </div>
      </section>

      {/* ── PRIZES ── */}
      <section className="py-28 bg-[#030303] border-t border-white/5 relative overflow-hidden" id="prizes">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="text-[20vw] font-black text-white/[0.012] uppercase tracking-widest select-none whitespace-nowrap">PRIZES</span>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-purple-400 block mb-3">What Winners Take Home</span>
            <h2 className="text-4xl md:text-5xl font-serif font-black text-[#fdfbf7]">
              ₹13,500+ in Prizes. <span className="italic text-gold">And Much More.</span>
            </h2>
            <p className="text-sm text-[#666] mt-4 max-w-xl mx-auto font-light">
              But even before prizes — every participating poet walks away with a published poem and a physical certificate. The prizes are for those who stand at the top.
            </p>
          </div>

          {/* Podium */}
          <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-end justify-center md:gap-6 mb-12">
            {prizes.map(({ rank, label, prize, color, glow }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`relative flex-1 max-w-sm mx-auto md:mx-0 ${i === 0 ? 'md:order-2 md:mb-0' : i === 1 ? 'md:order-1 md:mb-0' : 'md:order-3 md:mb-0'}`}
              >
                <div
                  className="relative border rounded-sm p-7 overflow-hidden group hover:-translate-y-2 transition-all duration-500"
                  style={{ borderColor: `rgba(${glow.slice(5, -1)},0.3)`, boxShadow: `0 10px 40px -15px ${glow}` }}
                >
                  <div className={`absolute -top-6 -right-6 w-28 h-28 rounded-full blur-[50px] opacity-30 bg-gradient-to-br ${color} pointer-events-none group-hover:opacity-50 transition-opacity`} />
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${color} text-white font-black text-lg mb-5 shadow-lg`}>
                    {rank === '1st' ? '🥇' : rank === '2nd' ? '🥈' : '🥉'}
                  </div>
                  <div className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#555] mb-1">{rank} Place</div>
                  <div className="text-xl font-serif font-black text-[#fdfbf7] mb-4">{label}</div>
                  <div className="text-sm text-[#999] font-light leading-relaxed">{prize}</div>
                  {i === 0 && (
                    <div className="absolute top-4 right-4 bg-gold text-[#050505] text-[8px] font-black uppercase tracking-widest px-2 py-1">Top Prize</div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* All participants get */}
          <div className="bg-[#0a0a0a] border border-purple-900/30 rounded-sm p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-900/5 blur-[80px] pointer-events-none" />
            <div className="text-center mb-8">
              <span className="text-[10px] uppercase tracking-widest font-black text-purple-400">For All 250 Participants</span>
              <h3 className="text-2xl font-serif font-black text-[#fdfbf7] mt-2">Everyone Walks Away with Something Real.</h3>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { icon: '📖', title: 'Published in Print Anthology', desc: 'Your poem in a real, ISBN-registered book. Couriered to your home.' },
                { icon: '📜', title: 'Certificate of Excellence', desc: 'Physically printed, signed, and delivered. Not a PDF. Not an email.' },
                { icon: '💌', title: 'Appreciation Letter', desc: 'A personal letter acknowledging your courage to show up and create.' },
              ].map(({ icon, title, desc }, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="text-2xl shrink-0 mt-0.5">{icon}</div>
                  <div>
                    <div className="text-sm font-bold text-[#fdfbf7] mb-1">{title}</div>
                    <div className="text-xs text-[#666] font-light leading-relaxed">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SCARCITY SECTION ── */}
      <section className="py-24 px-4 bg-[#080008] border-y border-purple-900/20 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(88,28,135,0.12)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="text-red-500 text-[10px] uppercase font-black tracking-[0.4em] mb-4 animate-pulse">⚠ Limited Availability</div>
          <h2 className="text-4xl md:text-6xl font-serif font-black text-[#fdfbf7] mb-6">
            Only <span className="text-gold">{seatsLeft}</span> Seats Left.
          </h2>
          <p className="text-[#777] text-base md:text-lg font-light max-w-xl mx-auto mb-10 leading-relaxed">
            Season 2 has a hard cap of 250 poets. Once those seats are filled, registration permanently closes. No waitlist. No exceptions. No "one last extension."
          </p>

          {/* Progress Bar */}
          <div className="bg-[#0d0d0d] border border-red-900/25 p-8 rounded-sm shadow-[0_0_40px_rgba(139,0,0,0.08)] text-left mb-8">
            <div className="flex justify-between items-end mb-4">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-[#555] font-bold mb-1">Season 2 Capacity</div>
                <div className="text-xl font-serif font-black text-white">{seatsFilled} <span className="text-sm font-sans font-light text-[#555]">/ {totalSeats} Seats Claimed</span></div>
              </div>
              <div className="text-[10px] uppercase tracking-widest text-red-500 font-black animate-pulse">Filling Fast</div>
            </div>
            <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${fillPercent}%` }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
                viewport={{ once: true }}
                className="h-full bg-gradient-to-r from-purple-700 via-red-600 to-orange-500 relative rounded-full"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-marquee rounded-full" />
              </motion.div>
            </div>
            <p className="text-red-500/70 text-[10px] uppercase tracking-widest font-bold mt-4 text-center">
              ⚠ When this fills — registration closes immediately and permanently.
            </p>
          </div>

          <Link href="/poetry-festival-s2/register" className="inline-block relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/50 to-gold/40 rounded-sm blur opacity-50 group-hover:opacity-80 transition duration-500" />
            <button className="relative px-12 py-4 bg-gradient-to-r from-gold to-[#c5a059] hover:from-[#ebd298] hover:to-gold text-[#050505] font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center gap-3 rounded-sm">
              Secure My Seat Now <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>

      {/* ── POEM CATEGORIES ── */}
      <section className="py-28 bg-[#050505] border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="text-[18vw] font-black text-white/[0.012] uppercase tracking-widest select-none whitespace-nowrap">THEMES</span>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold block mb-3">What Can You Write About</span>
            <h2 className="text-4xl md:text-5xl font-serif font-black text-[#fdfbf7]">6 Open Categories. <span className="italic text-purple-300">One Perfect Poem.</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map(({ icon, title, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09 }}
                className="group bg-[#0a0a0a] border border-white/5 p-7 hover:border-purple-700/40 hover:shadow-[0_0_25px_rgba(88,28,135,0.1)] transition-all duration-500 rounded-sm cursor-default"
              >
                <div className="text-purple-400/60 group-hover:text-purple-400 transition-colors duration-300 mb-4">{icon}</div>
                <h3 className="text-base font-serif font-black text-[#fdfbf7] mb-2">{title}</h3>
                <p className="text-sm text-[#666] font-light leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-28 bg-gradient-to-b from-[#030303] to-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-purple-400 block mb-3">Simple & Transparent</span>
            <h2 className="text-4xl md:text-5xl font-serif font-black text-[#fdfbf7]">How It Works.</h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-purple-700/40 to-transparent -translate-x-1/2" />
            <div className="space-y-12 sm:space-y-16 relative z-10">
              {[
                { step: 1, title: 'Register & Pay', desc: 'Pick your category, complete registration and pay the entry fee. Your seat is immediately reserved in the anthology.', color: 'border-gold text-gold shadow-[0_0_20px_rgba(197,160,89,0.3)]' },
                { step: 2, title: 'Write & Submit', desc: 'You receive detailed submission guidelines, word limits and theme prompts. Submit your poem before the deadline.', color: 'border-purple-500 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)]' },
                { step: 3, title: 'Expert Evaluation', desc: 'Your poem is evaluated by our panel of 4 real literary judges — against criteria of craft, originality and emotional impact.', color: 'border-white/30 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]' },
                { step: 4, title: 'Win & Get Published', desc: 'Results announced LIVE on Zoom. Certificates, medals, and anthology printed & couriered to your home. Forever.', color: 'border-gold text-gold shadow-[0_0_20px_rgba(197,160,89,0.3)]' },
              ].map(({ step, title, desc, color }, i) => (
                <div key={i} className={`flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 ${i % 2 !== 0 ? 'sm:flex-row-reverse' : ''}`}>
                  <div className={`${i % 2 !== 0 ? 'sm:text-right' : ''} sm:w-[calc(50%-48px)] ml-14 sm:ml-0`}>
                    <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#444] mb-2">Step {step}</div>
                    <h3 className="text-xl font-serif font-black text-[#fdfbf7] mb-2">{title}</h3>
                    <p className="text-sm text-[#666] font-light leading-relaxed">{desc}</p>
                  </div>
                  <div className={`absolute left-0 sm:relative shrink-0 w-12 h-12 rounded-full bg-[#050505] border-2 ${color} flex items-center justify-center font-black text-lg z-10 sm:mx-0`}>
                    {step}
                  </div>
                  <div className="hidden sm:block sm:w-[calc(50%-48px)]" />
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <Link href="/poetry-festival-s2/register">
              <button className="px-10 py-4 border border-white/15 hover:bg-white/5 text-white text-[11px] uppercase tracking-[0.2em] font-bold transition-all rounded-sm">
                Start Step 1 — Register
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── SCHEDULE / TIMELINE ── */}
      <section className="py-28 bg-[#050505] border-t border-white/5 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold block mb-3">Mark Your Calendar</span>
            <h2 className="text-4xl md:text-5xl font-serif font-black text-[#fdfbf7]">Season 2 Timeline.</h2>
          </div>
          <div className="space-y-0">
            {timeline.map(({ date, label, done }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-start gap-6 py-6 border-b border-white/5 group cursor-default ${done ? 'opacity-100' : 'opacity-75 hover:opacity-100'} transition-opacity`}
              >
                <div className="shrink-0 pt-0.5">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${done ? 'border-gold bg-gold/10 text-gold' : 'border-white/15 text-[#555] group-hover:border-purple-500 group-hover:text-purple-400'}`}>
                    {done ? <Check className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                  </div>
                </div>
                <div className="flex-1">
                  <div className={`text-[11px] uppercase tracking-widest font-bold mb-1 ${done ? 'text-gold' : 'text-[#444] group-hover:text-purple-400'} transition-colors`}>{date}</div>
                  <div className="text-base font-serif font-bold text-[#fdfbf7]">{label}</div>
                </div>
                {done && <span className="text-[8px] uppercase tracking-widest font-black text-gold bg-gold/10 border border-gold/20 px-2.5 py-1 rounded-full shrink-0 self-center">Open</span>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JUDGES ── */}
      <section className="py-28 bg-[#030303] border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="text-[18vw] font-black text-white/[0.012] uppercase tracking-widest select-none whitespace-nowrap">JUDGES</span>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-purple-400 block mb-3">Your Work Will Be Read By</span>
            <h2 className="text-4xl md:text-5xl font-serif font-black text-[#fdfbf7]">
              Real Judges. <span className="italic text-gold">No Algorithms.</span>
            </h2>
            <p className="text-sm text-[#555] mt-4 max-w-xl mx-auto font-light">
              Every poem is evaluated by human literary editors with years of experience — using transparent, published criteria.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {judges.map(({ name, role, initials }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="group text-center"
              >
                <div className="relative inline-block mb-5">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1a0a2e] to-[#0d0118] border-2 border-purple-900/40 group-hover:border-gold/40 transition-all duration-500 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(88,28,135,0.15)]">
                    <span className="text-2xl font-black font-serif text-purple-300 group-hover:text-gold transition-colors duration-300">{initials}</span>
                  </div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                    <Star className="w-3 h-3 text-gold" />
                  </div>
                </div>
                <h3 className="font-serif font-black text-[#fdfbf7] mb-1 group-hover:text-gold transition-colors duration-300">{name}</h3>
                <p className="text-[11px] text-[#555] font-light leading-snug">{role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET: FULL PACKAGE ── */}
      <section className="py-28 bg-[#050505] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold block mb-3">Your Complete Recognition Package</span>
            <h2 className="text-4xl md:text-5xl font-serif font-black text-[#fdfbf7]">Everything You <span className="italic text-gold">Take Home.</span></h2>
          </div>

          {/* Comparison: All Participants vs Top 3 */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* All 250 column */}
            <div className="bg-[#0a0a0a] border border-white/8 rounded-sm p-8">
              <div className="text-[10px] uppercase tracking-[0.3em] font-black text-[#555] mb-6 pb-4 border-b border-white/5">For All 250 Participants</div>
              <ul className="space-y-5">
                {[
                  { icon: '📖', item: 'Published in "Poetry Festival — Season 2" Anthology', sub: 'Real, printed, ISBN book. Couriered to your home.' },
                  { icon: '📜', item: 'Certificate of Excellence', sub: 'Physically printed and signed. Home delivered.' },
                  { icon: '💌', item: 'Personal Appreciation Letter', sub: 'Signed by our editorial team. Physical delivery.' },
                  { icon: '🏛', item: 'Hall of Fame Feature', sub: 'Your name permanently on the Inkfetish digital Hall of Fame.' },
                  { icon: '🎉', item: 'Live Zoom Event Invite', sub: 'Attend the results ceremony and celebrate together.' },
                ].map(({ icon, item, sub }, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-xl shrink-0 mt-0.5">{icon}</span>
                    <div>
                      <div className="text-sm font-semibold text-[#fdfbf7]">{item}</div>
                      <div className="text-xs text-[#555] font-light mt-0.5">{sub}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Top 3 column */}
            <div className="bg-gradient-to-br from-[#0d0118] to-[#0a0a0a] border border-gold/25 rounded-sm p-8 relative overflow-hidden shadow-[0_0_40px_rgba(197,160,89,0.08)]">
              <div className="absolute top-0 right-0 bg-gold px-4 py-1.5 text-[#050505] text-[8px] font-black uppercase tracking-[0.2em]">Top 3 Bonus</div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-black text-gold mb-6 pb-4 border-b border-gold/15">For Top 3 Winners — Everything Above, Plus:</div>
              <ul className="space-y-5">
                {[
                  { icon: '💰', item: 'Cash Prize', sub: '₹7,500 / ₹4,000 / ₹2,000 directly transferred to your account.' },
                  { icon: '🏆', item: 'Official Poetry Festival Trophy', sub: 'Physical award trophy — named, dated, official.' },
                  { icon: '🏅', item: 'Gold / Silver / Bronze Medal', sub: 'Heavyweight, physical medal. Home delivered.' },
                  { icon: '📣', item: 'Live Name Announcement', sub: 'Announced publicly on the Zoom ceremony and Inkfetish social channels.' },
                  { icon: '✍️', item: 'Featured Interview', sub: 'Short author interview published on Inkfetish\'s platform.' },
                ].map(({ icon, item, sub }, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-xl shrink-0 mt-0.5">{icon}</span>
                    <div>
                      <div className="text-sm font-semibold text-[#fdfbf7]">{item}</div>
                      <div className="text-xs text-[#888] font-light mt-0.5">{sub}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS / SOCIAL PROOF ── */}
      <section className="py-28 bg-[#030303] border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-900/10 blur-[100px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-purple-400 block mb-3">Community Success Stories</span>
            <h2 className="text-4xl md:text-5xl font-serif font-black text-[#fdfbf7]">
              Real Words. <span className="italic text-gold">Real Impact.</span>
            </h2>
            <p className="text-sm text-[#555] mt-6 max-w-xl mx-auto font-light leading-relaxed">
              We've helped thousands of writers find their voice and stage. Here is what some of our Season 1 participants and contest winners have to say.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                name: 'Ananya Sharma', 
                location: 'Delhi', 
                quote: 'I never thought my first poem would be in a real book. When the anthology arrived at my door, I cried. Inkfetish is the real deal.',
                label: 'Season 1 Participant',
                impact: 'First Time Published'
              },
              { 
                name: 'Rohan Krishnan', 
                location: 'Bangalore', 
                quote: 'Skeptical at first — I\'ve seen too many fake online contests. But the physical certificate arrived exactly as promised. Absolutely legitimate.',
                label: 'Season 1 Participant',
                impact: 'Verified Delivery'
              },
              { 
                name: 'Priya S.', 
                location: 'Bihar', 
                quote: 'I never thought my poem could go this far. Inkfetish gave me confidence and clarity. Now my debut book is in the works!',
                label: 'Published Author',
                impact: 'Book Deal'
              },
              { 
                name: 'Sunita G.', 
                location: 'Delhi', 
                quote: 'The judging report helped me improve my writing massively. This is by far the most professional writing event in India!',
                label: 'Contest Winner',
                impact: 'Skill Transformation'
              },
              { 
                name: 'Rohan M.', 
                location: 'Pune', 
                quote: 'I joined just for fun. But I ended up winning the 2nd prize and got my work published. Total game changer for my creative journey!',
                label: 'IWL Silver Winner',
                impact: '₹40,000 Prize'
              },
              { 
                name: 'Vikram Dasgupta', 
                location: 'Kolkata', 
                quote: 'The attention to detail in their editorial process is unlike any other publisher. They actually care about the craft, not just the fees.',
                label: 'Season 1 Poet',
                impact: 'Editorial Support'
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative bg-[#0a0a0a] border border-white/5 p-8 rounded-sm hover:border-gold/20 hover:shadow-[0_0_30px_rgba(197,160,89,0.05)] transition-all duration-500 group flex flex-col"
              >
                {/* Verified Tag */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-green-500">Verified Winner</span>
                </div>

                <Quote className="w-8 h-8 text-white/5 mb-6 group-hover:text-gold/10 transition-colors" />
                
                <p className="text-sm md:text-[15px] text-[#999] font-light leading-relaxed mb-10 italic flex-1">"{t.quote}"</p>
                
                <div className="flex items-center gap-4 border-t border-white/5 pt-6 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-900/50 to-black border border-white/10 flex items-center justify-center text-xs font-black text-purple-300">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#fdfbf7]">{t.name}</span>
                      <CheckCircle2 className="w-3 h-3 text-gold" />
                    </div>
                    <div className="text-[9px] text-[#555] uppercase tracking-[0.15em] mt-0.5">{t.location} · {t.label}</div>
                  </div>
                </div>

                <div className="mt-4 text-right">
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] text-gold/40 group-hover:text-gold transition-colors">{t.impact}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 pt-10 border-t border-white/5 text-center">
             <div className="flex items-center justify-center gap-10 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                <span className="text-sm font-serif font-bold italic">Inkfetish Publications</span>
                <span className="text-sm font-serif font-bold italic">Indian Writers League</span>
                <span className="text-sm font-serif font-bold italic">Season 1 Anthology</span>
             </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-28 bg-[#050505] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-16">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#555] block mb-3">No Hidden Surprises</span>
            <h2 className="text-4xl md:text-5xl font-serif font-black text-[#fdfbf7]">
              Every Question. <span className="italic text-[#555] font-light">Answered Honestly.</span>
            </h2>
          </div>
          <div>
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-32 bg-gradient-to-b from-[#0d0118] to-[#050505] border-t border-purple-900/30 relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-900/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-gold/8 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-[10px] uppercase tracking-[0.4em] font-bold text-purple-400 mb-6">The Stage Is Set</div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black text-[#fdfbf7] leading-tight mb-8">
              Your Poem Deserves<br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#ebd298] to-purple-300">
                More Than a Draft.
              </span>
            </h2>
            <p className="text-base text-[#777] font-light max-w-xl mx-auto mb-12 leading-relaxed">
              In 60 days, 250 poets will be published. Their certificates will arrive. The anthology will be printed. The question is whether your name is in it.
            </p>

            {/* Registration Box */}
            <div className="bg-[#0a0a0a]/90 backdrop-blur-sm border border-white/10 p-8 md:p-12 rounded-sm shadow-2xl max-w-md mx-auto">
              <h3 className="text-xs uppercase tracking-[0.25em] font-bold text-[#fdfbf7] mb-2">Poetry Festival — Season 2</h3>
              <div className="text-[11px] text-[#555] uppercase tracking-widest font-light mb-8">Official Registration Portal</div>

              <div className="flex items-center justify-between mb-6 p-4 bg-[#050505] border border-white/5 rounded-sm">
                <div className="text-left">
                  <div className="text-[9px] uppercase tracking-widest text-[#444] font-bold mb-1">Entry Fee</div>
                  <div className="text-2xl font-black font-serif text-[#fdfbf7]">₹299</div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] uppercase tracking-widest text-[#444] font-bold mb-1">Seats Left</div>
                  <div className="text-2xl font-black font-serif text-red-400">{seatsLeft}</div>
                </div>
              </div>

              <Link href="/poetry-festival-s2/register" className="block w-full mb-4">
                <button className="relative w-full py-5 bg-gradient-to-r from-gold to-[#c5a059] hover:from-[#ebd298] hover:to-gold text-[#050505] font-black text-xs sm:text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 rounded-sm shadow-xl group">
                  <span className="group-hover:translate-x-[-4px] transition-transform">Claim My Seat — Register Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              <div className="flex flex-col sm:flex-row justify-center gap-4 text-[#555] text-[9px] uppercase tracking-widest font-bold">
                <div className="flex items-center justify-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-green-500" /> 100% Secure Payment</div>
                <div className="flex items-center justify-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-gold" /> Instant Seat Confirmation</div>
              </div>
            </div>

            {/* Final urgency */}
            <div className="mt-10 inline-flex items-center gap-2 px-5 py-2.5 border border-red-900/30 bg-red-900/5 rounded-full">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-red-400">Only {seatsLeft} of {totalSeats} seats remain — no extensions</span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
