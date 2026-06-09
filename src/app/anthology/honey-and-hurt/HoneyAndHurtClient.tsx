'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Award,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Globe,
  PenTool,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Zap,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const proofStats = [
  { value: 'Inkfetish', label: 'Publications' },
  { value: '3200+', label: 'Writers Trust Us' },
  { value: '4.8*', label: 'Star Ratings' },
  { value: '5+', label: 'Successful Anthologies' },
];

const heroBenefits = [
  'Claim your ISBN and become a verifiable published author.',
  'Get your work featured in a premium, hardbound-quality anthology.',
  'Receive a professional author portfolio website (Worth ₹15k).',
  'No prior publishing experience required. We guide you.',
];

const audienceFit = [
  'You have words sitting in your notes app that deserve to be in a real, physical book.',
  'You want the credibility and authority of being a "Published Author" without the years of rejection letters.',
  'You want a premium artifact to show your friends, family, and future readers.',
  'You are an action-taker ready to claim one of the final 156 spots.'
];

const themePillars = [
  { title: 'The Hook', desc: 'Love, Longing, & Heartbreak. Universal themes that guarantee reader engagement.' },
  { title: 'The Story', desc: 'Your unique voice polished by our elite editorial team so it shines.' },
  { title: 'The Offer', desc: 'A complete author-branding package wrapped around your featured piece.' },
];

const benefits = [
  { title: 'OFFICIAL ISBN LISTING', icon: BadgeCheck, desc: 'A real, globally recognized, verifiable ISBN book credit. Stop writing in phone notes; get your work officially cataloged in national databases.' },
  { title: 'VERIFIED "PUBLISHED AUTHOR" BADGE', icon: ShieldCheck, desc: 'Secure your official status and receive the exclusive Inkfetish Community Author Badge to showcase your official literary credentials.' },
  { title: 'PUBLISHED IN THE PREMIUM ANTHOLOGY', icon: BookOpen, desc: 'Your chosen poetry, prose, or story printed inside a premium, collector-grade, beautifully formatted physical anthology book.' },
  { title: 'FREE AUTHOR PORTFOLIO WEBSITE', icon: Star, desc: 'Establish your professional digital presence with a dedicated, high-end author portfolio website free of charge (Worth ₹15,000).' },
  { title: 'GILDED CERTIFICATE & MEDAL', icon: Award, desc: 'Receive a beautifully printed co-authorship certificate, a custom engraved medal, and an official appreciation letter from our editorial board.' },
  { title: 'SOCIAL MEDIA & INTERNET SPOTLIGHT', icon: Globe, desc: 'Get your talent promoted across our massive social media networks and digital literary platforms to build your initial fanbase.' },
  { title: 'PR & ARTIST PROMOTION CAMPAIGNS', icon: Sparkles, desc: 'Enjoy premium media releases, professional PR promotion, and custom artist spotlight features to make your voice stand out.' },
  { title: 'LIFETIME ELITE COMMUNITY ACCESS', icon: Users, desc: 'Gain lifetime entry into India\'s fastest-growing elite community of passionate authors, editors, and industry mentors.' },
];

const processSteps = [
  { step: '01', title: 'Claim Spot', desc: 'Apply now to lock in the ₹485 price before it jumps back to ₹2,499. Takes 60 seconds.' },
  { step: '02', title: 'Get Approved', desc: 'Our team reviews your fit. If approved, we onboard you. No risk if you aren\'t a fit.' },
  { step: '03', title: 'Get Published', desc: 'We edit, design, format, and launch. 15 days later, you are a published author.' },
];

const proofBooks = [
  { title: 'Love at Minus One', img: 'https://i.ibb.co/PZk5Qnmt/Whats-App-Image-2025-12-25-at-2-27-03-AM-2.jpg', status: 'Sold Out' },
  { title: 'Syaahi', img: 'https://i.ibb.co/Y4zN8Rp0/Whats-App-Image-2025-12-08-at-6-39-26-PM-2.jpg', status: 'Bestseller' },
  { title: "The Poet's Heart", img: 'https://i.ibb.co/mCH1WTBD/Whats-App-Image-2025-12-25-at-2-27-03-AM-1.jpg', status: 'Sold Out' },
];

const valueStack = [
  { title: 'Premium Anthology Feature & ISBN', value: '₹4,999', desc: 'Your work published in a globally distributed book.' },
  { title: 'Done-For-You Author Portfolio', value: '₹14,999', desc: 'Your dedicated professional credibility website.' },
  { title: 'Elite Editorial & Formatting', value: '₹2,999', desc: 'We make your writing look and read perfectly.' },
  { title: 'Gilded Certificate & Launch Assets', value: '₹1,999', desc: 'Marketing materials to announce your authority.' },
];

const testimonials = [
  { name: 'Ananya R.', role: 'Now A Published Author', text: "I thought publishing was too hard. They made it a 15-day breeze. The best investment in my personal brand ever.", rotate: '-rotate-2', z: 'z-10' },
  { name: 'Vikram S.', role: 'Poet', text: "I finally have a credential that makes people take my writing seriously. The portfolio alone was worth 10x the price.", rotate: 'rotate-3', z: 'z-20' },
  { name: 'Sara M.', role: 'Storyteller', text: "It felt like an absolute steal. The quality of the book is insane. Don't overthink this.", rotate: '-rotate-1', z: 'z-30' },
  { name: 'K.', role: 'Verified Author', text: "The editing team didn't change my voice, they just made it sharper. The final physical book smells and feels premium.", rotate: 'rotate-2', z: 'z-20' },
  { name: 'Priya', role: 'First-time Writer', text: "I was scared to share my words. This anthology gave me the safe space and professional push I needed. 10/10.", rotate: '-rotate-3', z: 'z-10' },
  { name: 'Verified Author', role: 'Romance Writer', text: "Got the book yesterday. Seeing my name in print, with a real ISBN, made me cry. Worth every single rupee.", rotate: 'rotate-1', z: 'z-30' },
  { name: 'Rohan D.', role: 'Published Poet', text: "The digital portfolio they built for me helped me land a freelance writing gig within a week. The ROI is ridiculous.", rotate: '-rotate-2', z: 'z-20' },
  { name: 'S. N.', role: 'Verified Author', text: "No hidden fees, no royalty traps. They did exactly what they promised in exactly 15 days.", rotate: 'rotate-3', z: 'z-10' },
  { name: 'Aisha', role: 'Writer', text: "The gilded certificate is hanging in my living room. Inkfetish actually cares about authors.", rotate: '-rotate-1', z: 'z-30' },
];

const faqs = [
  { q: 'Why is it only ₹485?', a: 'Because we are building a massive roster of case studies. We know if we deliver massive value now, you\'ll come back to us when you write your solo book. It\'s an ethical bribe.' },
  { q: 'Do I need to be a professional writer?', a: 'No. This is designed to TAKE you from amateur to published professional. Our editors guide you.' },
  { q: 'Is there any hidden catch?', a: 'None. You pay ₹485 (after we approve your application). No hidden publishing fees. No mandatory book purchases.' },
  { q: 'What if my work isn\'t ready?', a: 'Apply anyway to lock the price. You don\'t need the final draft today. We give you a deadline and formatting guidelines after approval.' },
];

const contestGalleryImages = [
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

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700;800;900&display=swap');

  :root {
    --gold-main: #D88A06;
    --gold-light: #FFCC66;
    --gold-dark: #8F4D00;
    --obsidian: #0B0B0C;
    --ivory: #F5F2EE;
  }

  .font-cinzel { font-family: 'Cinzel', serif; }
  .font-cormorant { font-family: 'Cormorant Garamond', serif; }
  .font-inter { font-family: 'Inter', sans-serif; }
  .text-obsidian { color: var(--obsidian); }
  .text-ivory { color: var(--ivory); }
  .text-gold-main { color: var(--gold-main); }
  .text-gold-light { color: var(--gold-light); }
  .bg-ivory { background-color: var(--ivory); }
  .bg-obsidian { background-color: var(--obsidian); }
  .bg-gold-main { background-color: var(--gold-main); }
  .border-gold-main { border-color: var(--gold-main); }
  .border-gold-dark { border-color: var(--gold-dark); }
  .fill-gold-main { fill: var(--gold-main); }
  .luxury-border { border-color: #E3D8C7; }
  .glass-effect {
    background: rgba(245, 242, 238, 0.82);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
  }

  .gold-shimmer {
    background: linear-gradient(135deg, #8f4d00 0%, #d88a06 25%, #ffcf6b 50%, #d88a06 75%, #8f4d00 100%);
    background-size: 400% 400%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 8s ease infinite;
  }
  
  .red-alert-text {
    color: #e53e3e;
    font-weight: 900;
  }

  @keyframes shimmer {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .gold-button {
    background: linear-gradient(135deg, #ffcf6b, #d88a06);
    color: black;
    transition: all 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
    box-shadow: 0 8px 24px rgba(216, 138, 6, 0.22);
  }

  .gold-button:hover {
    box-shadow: 0 12px 32px rgba(216, 138, 6, 0.35);
    transform: translateY(-1px);
    filter: brightness(1.08);
  }

  .obsidian-button {
    background: #0B0B0C;
    color: #F5F2EE;
    transition: all 0.35s ease;
  }

  .obsidian-button:hover {
    background: #1A1712;
    color: #FFCC66;
  }

  @keyframes scroll-left {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes scroll-right {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }
  .animate-scroll-left {
    animation: scroll-left 40s linear infinite;
  }
  .animate-scroll-right {
    animation: scroll-right 40s linear infinite;
  }
`;

const HoneyAndHurtClient = () => {
  const router = useRouter();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const opacityHero = useTransform(scrollY, [0, 340], [1, 0]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [hasPaid, setHasPaid] = useState(false);

  useEffect(() => {
    const paidOrderId = localStorage.getItem('honey_and_hurt_paid_order_id');
    if (paidOrderId) {
      setHasPaid(true);
    }
  }, []);

  const handleActionClick = () => {
    if (hasPaid) {
      router.push('/anthology/honey-and-hurt/submit');
    } else {
      router.push('/anthology/honey-and-hurt/register');
    }
  };

  return (
    <div className="min-h-screen bg-ivory text-obsidian font-cormorant selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden">
      <style>{styles}</style>

      {/* Top Header / Navigation Bar (Positioned at the absolute top with centered branding) */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-ivory/95 backdrop-blur-md shadow-md border-b border-slate-200/50 py-1.5' : 'bg-transparent py-2.5'}`}>
        <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between relative min-h-[36px]">
          {/* Left Side Links (Desktop Only) */}
          <div className="flex items-center gap-6 md:gap-8 relative z-10">
            <a href="#fit" className="hidden md:inline-block font-inter text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-obsidian transition-colors">Is This For You?</a>
            <a href="#offer" className="hidden md:inline-block font-inter text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-obsidian transition-colors">The Package</a>
            <a href="#faq" className="hidden md:inline-block font-inter text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-obsidian transition-colors">FAQ</a>
          </div>

          {/* Centered Brand Title & Logo (Perfect Center on Desktop & Mobile) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div 
              className="flex items-center gap-1.5 pointer-events-auto cursor-pointer group"
              onClick={() => router.push('/')}
            >
              <img 
                src="https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1777556045/iflogo_y3ss8e.png" 
                alt="Inkfetish Logo" 
                className="w-5 h-5 sm:w-6 sm:h-6 object-contain rounded-full border border-gold-main/30 shadow-sm group-hover:scale-105 transition-transform duration-300"
              />
              <span className="font-cinzel text-[10px] sm:text-xs md:text-base font-black uppercase tracking-widest gold-shimmer">
                Inkfetish Publications
              </span>
            </div>
          </div>

          {/* Right Side Spacer (Desktop Only to balance flex layout) */}
          <div className="hidden md:block w-32 relative z-10" />
        </div>
      </header>

      {/* Top Banner - High Urgency & Enlarged (Positioned below the navbar) */}
      <div className="bg-[#e53e3e] text-white py-2 sm:py-3 text-center font-inter text-[10px] sm:text-xs md:text-sm font-black tracking-widest uppercase shadow-sm px-4 relative z-40">
        <div className="container mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 leading-tight">
          <span className="animate-pulse flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded text-white text-[9px] sm:text-[10px]">
            <Zap className="w-3 h-3 fill-white animate-pulse" /> ATTENTION
          </span>
          <span className="font-bold text-center">PRICE DROP TO ₹485. ONLY 156 SLOTS REMAINING.</span>
        </div>
      </div>

      {/* Direct Response Hero */}
      <section className="relative flex items-center pt-6 sm:pt-8 md:pt-16 pb-10 md:pb-16 px-4 sm:px-6 overflow-hidden min-h-[85vh]">
        <motion.div style={{ opacity: opacityHero }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,_var(--gold-light)_0%,_transparent_50%)] opacity-10" />
        </motion.div>

        <div className="container mx-auto relative z-10 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="space-y-5 md:space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-700 border border-red-200 rounded-full font-inter text-[10px] font-black uppercase">
                <Clock className="w-3.5 h-3.5" /> Limited Time: 80% OFF Launch Promo
              </div>

              <div className="space-y-3 sm:space-y-4">
                <h1 className="font-inter text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-black leading-[1.1] md:leading-[1.05] tracking-tight text-obsidian uppercase">
                  JOIN THE <br className="hidden md:block"/> <span className="gold-shimmer">HONEY AND HURT</span> ANTHOLOGY
                </h1>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 max-w-xl mx-auto lg:mx-0">
                {heroBenefits.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 justify-center lg:justify-start text-left">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="font-inter text-[13px] md:text-sm text-slate-800 font-bold leading-snug">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleActionClick}
                  className="gold-button px-8 md:px-10 py-4 rounded-xl font-inter font-black text-sm md:text-base uppercase flex items-center justify-center gap-2.5"
                >
                  {hasPaid ? 'SUBMIT YOUR WRITING NOW' : 'YES! I Want In For Just ₹485'} <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: 3 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative"
            >
              <div className="relative w-full max-w-[420px] mx-auto drop-shadow-[0_20px_20px_rgba(216,138,6,0.18)]">
                <img 
                  src="https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1779675277/ChatGPTImageMay25202607_43_49A_chgtxw.jpg" 
                  alt="Honey and Hurt Anthology Book Cover" 
                  className="w-full h-auto rounded-2xl" 
                />
                
                {/* Secure Price Card Tag Anchored Exactly to Top Right Corner of the Book Cover */}
                <div className="absolute -top-4 -right-4 md:-right-6 z-20 bg-white border-[3px] border-red-500 shadow-xl px-5 py-4 rounded-xl transform rotate-3 select-none">
                  <p className="font-inter text-[9px] uppercase text-slate-500 font-black line-through mb-0.5">Normally ₹2,499</p>
                  <p className="font-inter text-xl md:text-2xl font-black text-red-600 leading-none">Only ₹485</p>
                  <p className="font-inter text-[9px] uppercase font-bold text-slate-800 mt-1.5">If you apply today</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Redesigned Premium Trust & Social Proof Strip */}
      <section className="bg-obsidian text-white py-8 sm:py-10 border-y border-gold-dark/30 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-gold-main/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {[
              { 
                value: 'Inkfetish', 
                sub: 'Registered National Brand',
                icon: ShieldCheck
              },
              { 
                value: '3,200+', 
                sub: 'Verified Co-Authors Joined',
                icon: Users
              },
              { 
                value: '4.8★ Rating', 
                sub: 'Google & Social Reviews',
                icon: Star, 
                stars: true
              },
              { 
                value: '5+ Anthologies', 
                sub: 'Successful Publications',
                icon: BookOpen
              },
            ].map((stat, idx) => (
              <div 
                key={idx} 
                className="bg-white/[0.02] border border-white/5 p-3 sm:p-4 rounded-xl flex flex-col items-center text-center gap-2.5 sm:gap-3 relative overflow-hidden transition-all duration-300 hover:border-gold-main/20 hover:bg-white/[0.04]"
              >
                {/* Clean Gold Icon floating naturally */}
                <div className="text-gold-main shrink-0">
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
                </div>
                
                <div className="space-y-1 w-full">
                  <div className="flex flex-col items-center">
                    <span className="font-inter text-xs xs:text-sm sm:text-lg md:text-xl font-black uppercase tracking-wide gold-shimmer">
                      {stat.value}
                    </span>
                    {stat.stars && (
                      <div className="flex justify-center gap-0.5 mt-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-2 h-2 sm:w-2.5 sm:h-2.5 fill-gold-main text-gold-main shrink-0" />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {stat.sub && (
                    <p className="font-inter text-[7.5px] xs:text-[8px] sm:text-[9px] font-semibold text-slate-500 uppercase tracking-widest leading-tight">
                      {stat.sub}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem / Qualification */}
      <section id="fit" className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto space-y-8 md:space-y-10">
            <div className="text-center">
              <h2 className="font-inter text-2xl sm:text-3xl md:text-4xl font-black text-obsidian uppercase tracking-tight">Read This Before You Keep Scrolling...</h2>
              <div className="w-16 h-1 bg-red-500 mx-auto mt-3 md:mt-4" />
            </div>
            
            <p className="font-inter text-base md:text-lg text-slate-700 font-medium leading-relaxed">
              If you're reading this, you probably have notes on your phone, hidden journals, or Google Docs filled with words you haven't shown anyone. 
              <br/><br/>
              You know you're a good writer. But no one else does. Because you lack <strong>proof</strong>.
            </p>
            
            <div className="bg-ivory border-l-[3px] border-gold-main p-6 md:p-8 space-y-5 rounded-r-xl">
              <h3 className="font-inter text-xl font-black text-obsidian">This is for you if:</h3>
              <div className="space-y-3.5">
                {audienceFit.map((item, index) => (
                  <div key={index} className="flex gap-3.5 items-start">
                    <div className="bg-gold-main text-white w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</div>
                    <p className="font-inter text-[15px] text-slate-800 font-medium leading-snug">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Theme Explanation */}
      <section className="py-12 md:py-20 bg-obsidian text-ivory border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-inter text-2xl sm:text-3xl md:text-5xl font-black text-white uppercase tracking-tight">Introducing: <span className="gold-shimmer">Honey & Hurt</span></h2>
            <p className="mt-3 md:mt-4 text-base sm:text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto">An open-theme anthology exploring the beautiful duality of the human experience.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-8 md:gap-12 items-center max-w-5xl mx-auto">
            <div className="relative aspect-[3/4] border-2 luxury-border p-1.5 max-w-[280px] md:max-w-full mx-auto">
               <img src="https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1779546327/ChatGPT_Image_May_23_2026_07_53_16_PM_11zon_frceeu.png" alt="Premium Output" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-6">
              <div className="bg-white/5 p-6 md:p-8 rounded-xl border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gold-main" />
                <h3 className="font-inter text-xl md:text-2xl font-black text-gold-main mb-3">What is "Honey & Hurt"?</h3>
                <p className="font-inter text-sm md:text-base text-slate-300 leading-relaxed block mb-3">
                  <strong>HONEY</strong> represents the sweet, the beautiful, and the light. It's the love that heals, the moments of pure joy, and the gentle side of life.
                </p>
                <p className="font-inter text-sm md:text-base text-slate-300 leading-relaxed block mb-3">
                  <strong>HURT</strong> represents the dark, the trauma, and the pain. It's the heartbreak that shatters, the grief that lingers, and the struggles we face.
                </p>
                <p className="font-inter text-sm md:text-base font-bold text-white leading-relaxed block">
                  There is always a good and a bad side. This is an open-theme anthology giving you the freedom to write about the entire spectrum of human emotion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wall of Proof: Testimonials & Past Work */}
      <section className="py-16 md:py-24 bg-white overflow-hidden border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 mb-10 md:mb-16 text-center">
          <h2 className="font-inter text-2xl sm:text-3xl md:text-5xl font-black text-obsidian uppercase tracking-tight">Don't Take Our Word For It</h2>
          <p className="mt-3 md:mt-4 text-sm sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto">We've turned hundreds of writers just like you into verifiable published authors.</p>
        </div>

        {/* Sliding Gallery */}
        <div className="flex flex-col gap-6 mb-16">
           <div className="flex whitespace-nowrap gap-2 md:gap-6 animate-scroll-left w-max">
              {[
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897600/WhatsApp_Image_2026-04-09_at_2.59.25_PM-compressed_in2led.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897599/WhatsApp_Image_2026-04-09_at_2.53.04_PM-compressed_wsnhmu.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897599/WhatsApp_Image_2026-04-07_at_8.39.44_PM-compressed_ztxsge.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897598/WhatsApp_Image_2026-04-07_at_8.39.44_PM_2_-compressed_hfr0wv.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897598/WhatsApp_Image_2026-04-07_at_8.39.44_PM_1_-compressed_gjnlck.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897597/WhatsApp_Image_2026-04-04_at_12.20.06_PM_1_-compressed_lrqjv2.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897597/WhatsApp_Image_2026-04-03_at_10.52.05_AM_2_-compressed_m2qlui.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897597/WhatsApp_Image_2026-04-03_at_10.52.05_AM_1_-compressed_uphqxg.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897596/WhatsApp_Image_2026-04-03_at_10.52.04_AM_1_-compressed_pp9tww.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897596/WhatsApp_Image_2026-04-02_at_5.42.20_PM-compressed_sq3utn.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897595/WhatsApp_Image_2026-04-02_at_5.42.20_PM_1_-compressed_khfil0.webp'
              ].map((img, i) => (
                <div key={i} className="h-60 md:h-64 shrink-0 border-2 border-slate-100 shadow-md overflow-hidden rounded-xl bg-slate-50">
                    <img src={img} alt="Past Work" className="h-full w-auto object-contain mix-blend-multiply" />
                </div>
              ))}
              {/* Duplicate for infinite loop */}
              {[
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897600/WhatsApp_Image_2026-04-09_at_2.59.25_PM-compressed_in2led.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897599/WhatsApp_Image_2026-04-09_at_2.53.04_PM-compressed_wsnhmu.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897599/WhatsApp_Image_2026-04-07_at_8.39.44_PM-compressed_ztxsge.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897598/WhatsApp_Image_2026-04-07_at_8.39.44_PM_2_-compressed_hfr0wv.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897598/WhatsApp_Image_2026-04-07_at_8.39.44_PM_1_-compressed_gjnlck.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897597/WhatsApp_Image_2026-04-04_at_12.20.06_PM_1_-compressed_lrqjv2.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897597/WhatsApp_Image_2026-04-03_at_10.52.05_AM_2_-compressed_m2qlui.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897597/WhatsApp_Image_2026-04-03_at_10.52.05_AM_1_-compressed_uphqxg.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897596/WhatsApp_Image_2026-04-03_at_10.52.04_AM_1_-compressed_pp9tww.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897596/WhatsApp_Image_2026-04-02_at_5.42.20_PM-compressed_sq3utn.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897595/WhatsApp_Image_2026-04-02_at_5.42.20_PM_1_-compressed_khfil0.webp'
              ].map((img, i) => (
                <div key={`dup-${i}`} className="h-60 md:h-64 shrink-0 border-2 border-slate-100 shadow-md overflow-hidden rounded-xl bg-slate-50">
                    <img src={img} alt="Past Work" className="h-full w-auto object-contain mix-blend-multiply" />
                </div>
              ))}
           </div>

           {/* Row 2: Right to Left */}
           <div className="flex whitespace-nowrap gap-2 md:gap-6 animate-scroll-right w-max">
              {[
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897595/WhatsApp_Image_2026-04-02_at_5.17.33_PM_3_-compressed_kosajj.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897594/WhatsApp_Image_2026-04-02_at_5.17.33_PM_2_-compressed_sz4wld.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897594/WhatsApp_Image_2026-04-01_at_6.40.55_AM_1_-compressed_j51ngs.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897593/WhatsApp_Image_2026-04-01_at_6.40.37_AM-compressed_eibjs4.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897593/WhatsApp_Image_2026-03-31_at_11.00.31_PM-compressed_a58ono.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897592/WhatsApp_Image_2026-03-28_at_11.47.30_PM_1_-compressed_abkbxy.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897592/WhatsApp_Image_2026-03-23_at_7.03.31_PM_5_-compressed_hgy6j1.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897591/WhatsApp_Image_2026-03-23_at_7.03.31_PM_4_-compressed_dnisid.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897591/WhatsApp_Image_2026-03-23_at_7.03.31_PM_3_-compressed_ofwyil.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897590/WhatsApp_Image_2026-03-23_at_7.03.30_PM-compressed_fsgkug.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775926450/WhatsApp_Image_2026-04-11_at_7.20.21_PM_1_-compressed_hgkckw.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775926445/WhatsApp_Image_2026-04-11_at_7.20.21_PM-compressed_fxtkcv.webp'
              ].map((img, i) => (
                <div key={i} className="h-60 md:h-64 shrink-0 border-2 border-slate-100 shadow-md overflow-hidden rounded-xl bg-slate-50">
                    <img src={img} alt="Community" className="h-full w-auto object-contain mix-blend-multiply" />
                </div>
              ))}
              {/* Duplicate for infinite loop */}
              {[
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897595/WhatsApp_Image_2026-04-02_at_5.17.33_PM_3_-compressed_kosajj.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897594/WhatsApp_Image_2026-04-02_at_5.17.33_PM_2_-compressed_sz4wld.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897594/WhatsApp_Image_2026-04-01_at_6.40.55_AM_1_-compressed_j51ngs.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897593/WhatsApp_Image_2026-04-01_at_6.40.37_AM-compressed_eibjs4.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897593/WhatsApp_Image_2026-03-31_at_11.00.31_PM-compressed_a58ono.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897592/WhatsApp_Image_2026-03-28_at_11.47.30_PM_1_-compressed_abkbxy.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897592/WhatsApp_Image_2026-03-23_at_7.03.31_PM_5_-compressed_hgy6j1.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897591/WhatsApp_Image_2026-03-23_at_7.03.31_PM_4_-compressed_dnisid.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897591/WhatsApp_Image_2026-03-23_at_7.03.31_PM_3_-compressed_ofwyil.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897590/WhatsApp_Image_2026-03-23_at_7.03.30_PM-compressed_fsgkug.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775926450/WhatsApp_Image_2026-04-11_at_7.20.21_PM_1_-compressed_hgkckw.webp',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775926445/WhatsApp_Image_2026-04-11_at_7.20.21_PM-compressed_fxtkcv.webp'
              ].map((img, i) => (
                <div key={`dup-${i}`} className="h-60 md:h-64 shrink-0 border-2 border-slate-100 shadow-md overflow-hidden rounded-xl bg-slate-50">
                    <img src={img} alt="Community" className="h-full w-auto object-contain mix-blend-multiply" />
                </div>
              ))}
           </div>
        </div>

        {/* Testimonials */}
        <div className="container mx-auto px-4 max-w-5xl py-8 overflow-visible">
          <div className="flex flex-wrap justify-center gap-y-8 md:gap-y-6 md:-space-x-4">
            {testimonials.map((item, index) => (
              <div 
                key={index} 
                className={`bg-white border border-slate-200 p-6 md:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 w-full sm:w-[calc(50%-1rem)] md:w-[320px] sm:${item.rotate} ${item.z} hover:!z-50 hover:scale-105 relative cursor-default`}
              >
                {/* Verified Badge */}
                <div className="absolute -top-3 -right-3 bg-green-500 text-white text-[9px] font-black uppercase tracking-wider py-1 px-2.5 rounded-full shadow-md transform rotate-6 border border-white z-10 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </div>
                
                <Quote className="absolute top-5 right-5 w-8 h-8 text-slate-100" />
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-gold-main text-gold-main" />)}
                </div>
                <p className="font-inter text-sm text-slate-700 italic leading-relaxed relative z-10 pb-2">"{item.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Benefits Section */}
      <section className="py-12 md:py-24 bg-obsidian text-white border-y border-white/10">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="font-inter text-2xl sm:text-3xl md:text-6xl font-black uppercase tracking-tight text-white mb-3 md:mb-4">The <span className="gold-shimmer">Author Package</span></h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto">This isn't just an anthology. It's a complete career launchpad.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((item, index) => (
              <div 
                key={item.title} 
                className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-gold-main/40 transition-all duration-300 flex items-start gap-5 group hover:bg-white/10"
              >
                <div className="w-12 h-12 bg-gold-main/10 border border-gold-main/20 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-gold-main group-hover:text-black transition-colors duration-300 text-gold-main">
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-inter text-base md:text-lg font-black text-white group-hover:text-gold-main transition-colors duration-300 uppercase tracking-wider">{item.title}</h4>
                  <p className="font-inter text-xs text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wall of Proof: Bento Mosaic Format */}
      <section className="py-12 md:py-24 bg-[#FDFBF7] overflow-hidden border-b border-slate-200 relative">
        <div className="container mx-auto px-4 sm:px-6 mb-10 md:mb-16 text-center">
          <h2 className="font-inter text-2xl sm:text-3xl md:text-6xl font-black text-obsidian uppercase tracking-tighter leading-tight md:leading-none italic">
            The Wall of <span className="text-gold-dark underline decoration-gold-main/30">Proof.</span>
          </h2>
          <p className="mt-4 md:mt-6 text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            These aren't studio models. These are real writers holding their legacy. 
            <span className="text-obsidian font-black block mt-1.5">1,100+ authors already took action.</span>
          </p>
        </div>

        <div className="container mx-auto px-4 max-w-6xl">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {contestGalleryImages.map((src, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="break-inside-avoid relative group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer p-1.5"
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src={src} 
                    alt="Inkfetish Proof" 
                    className="w-full h-auto grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity" />
                  
                  {/* Branding & Status */}
                  <div className="absolute bottom-2 left-2 flex items-center gap-1.5 z-10">
                     <div className="bg-[#39FF14] w-1.5 h-1.5 rounded-full shadow-[0_0_8px_#39FF14]" />
                     <span className="text-[8px] md:text-[9px] font-inter font-black uppercase tracking-widest text-white">Verified Author</span>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between px-1 pb-1">
                   <span className="text-[9px] font-inter font-black text-obsidian uppercase tracking-wider italic">Inkfetish</span>
                   <span className="text-[8px] font-inter font-bold text-slate-400">#Archive</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dynamic Proof Stats Strip */}
        <div className="container mx-auto px-6 mt-16 flex flex-wrap justify-center gap-8 md:gap-16 opacity-40">
           <div className="flex flex-col items-center">
              <span className="text-2xl md:text-4xl font-inter font-black text-obsidian">3200+</span>
              <span className="text-[10px] font-inter font-bold uppercase tracking-widest text-slate-500">Writers Trusted</span>
           </div>
           <div className="flex flex-col items-center border-x border-slate-200 px-8 md:px-16">
              <span className="text-2xl md:text-4xl font-inter font-black text-obsidian">15 Days</span>
              <span className="text-[10px] font-inter font-bold uppercase tracking-widest text-slate-500">Fast-Track Publishing</span>
           </div>
           <div className="flex flex-col items-center">
              <span className="text-2xl md:text-4xl font-inter font-black text-obsidian">4.8★</span>
              <span className="text-[10px] font-inter font-bold uppercase tracking-widest text-slate-500">Top Rated Agency</span>
           </div>
        </div>
        {/* Floating background text */}
        <div className="absolute top-1/2 left-0 w-full text-center -translate-y-1/2 pointer-events-none opacity-[0.02] select-none">
          <div className="font-inter text-[20vw] font-black uppercase leading-none tracking-tighter">PROOF</div>
        </div>
      </section>

      {/* Previous Anthologies */}
      <section className="py-12 md:py-24 bg-ivory text-obsidian border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl text-center">
          <h2 className="font-inter text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight text-obsidian mb-3 md:mb-4">The <span className="text-gold-dark">Legacy</span></h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto mb-10 md:mb-16">We don't just promise results. We have a massive track record of turning everyday writers into published authors.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            
            {/* Syaahi */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center group hover:-translate-y-2 transition-transform duration-300 relative">
              <div className="absolute -top-3 bg-red-600 text-white text-[9px] font-black uppercase tracking-wider py-1 px-3 rounded-full shadow-md z-10 animate-pulse">Bestseller</div>
              <div className="w-full aspect-[3/4] rounded-xl overflow-hidden mb-5 shadow-md border border-slate-100 relative group-hover:scale-[1.03] transition-transform duration-500 bg-slate-50">
                <img 
                  src="https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1778137587/pezfosvx2fszfwxaffhs_mtcvbi.webp" 
                  alt="Syaahi Book Cover" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-inter text-xl font-black text-obsidian mb-1 text-center">Syaahi</h3>
              <p className="font-inter text-[11px] font-bold text-gold-main uppercase tracking-wider mb-3.5 text-center">Collection of top 200 writers</p>
              <div className="font-inter text-xs md:text-sm font-black uppercase tracking-wider px-4 py-1.5 rounded-full mb-4 shadow-md flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                <Award className="w-3.5 h-3.5 fill-emerald-700 shrink-0" /> 185 Sales in 24 Hours
              </div>
              <p className="font-inter text-xs text-slate-500 leading-relaxed text-center font-medium">Our all-time best-selling book. Compiles masterpiece works of the top 200 elite writers from the prestigious Indian Writers League (IWL).</p>
            </div>

            {/* Shakespeare & What Remained */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center group hover:-translate-y-2 transition-transform duration-300 relative">
              <div className="w-full aspect-[3/4] rounded-xl overflow-hidden mb-5 shadow-md border border-slate-100 relative group-hover:scale-[1.03] transition-transform duration-500 bg-slate-50">
                <img 
                  src="https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1779673450/ChatGPT_Image_May_25_2026_07_12_11_AM_yaaaie.webp" 
                  alt="Shakespeare & What Remained Book Cover" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-inter text-xl font-black text-obsidian mb-1 text-center">Shakespeare & What Remained</h3>
              <p className="font-inter text-[11px] font-bold text-gold-main uppercase tracking-wider mb-3.5 text-center">Poetry Anthology</p>
              <div className="font-inter text-xs md:text-sm font-black uppercase tracking-wider px-4 py-1.5 rounded-full mb-4 shadow-md flex items-center justify-center gap-2 bg-amber-50 text-amber-700 border border-amber-200/50">
                <Sparkles className="w-3.5 h-3.5 fill-amber-700 shrink-0" /> 65 Sales in 48 Hours
              </div>
              <p className="font-inter text-xs text-slate-500 leading-relaxed text-center font-medium">A compilation celebrating classic verses, featuring all fine poetries from the Shakespeare Poetry Award hosted in 2025.</p>
            </div>

            {/* Love at Minus One */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-full aspect-[3/4] rounded-xl overflow-hidden mb-5 shadow-md border border-slate-100 relative group-hover:scale-[1.03] transition-transform duration-500 bg-slate-50">
                <img 
                  src="https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1779674268/ChatGPTImageMay25202607_27_27A_h2iwrz.jpg" 
                  alt="Love at Minus One Book Cover" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-inter text-xl font-black text-obsidian mb-1 text-center">Love at Minus One</h3>
              <p className="font-inter text-[11px] font-bold text-gold-main uppercase tracking-wider mb-3.5 text-center">Romance Anthology</p>
              <div className="font-inter text-xs md:text-sm font-black uppercase tracking-wider px-4 py-1.5 rounded-full mb-4 shadow-md flex items-center justify-center gap-2 bg-red-50 text-red-600 border border-red-200/50">
                <Zap className="w-3.5 h-3.5 fill-red-600 shrink-0" /> 155 Sales in 2 Days
              </div>
              <p className="font-inter text-xs text-slate-500 leading-relaxed text-center font-medium">Launched in the chilling winter of December 2025. A compiling poetry anthology exploring romance and heartbreak where the heart freezes.</p>
            </div>

            {/* Petals and Scars */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-full aspect-[3/4] rounded-xl overflow-hidden mb-5 shadow-md border border-slate-100 relative group-hover:scale-[1.03] transition-transform duration-500 bg-slate-50">
                <img 
                  src="https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1779673963/ChatGPTImageMay25202607_20_11A_vcxbxc.jpg" 
                  alt="Petals and Scars Book Cover" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-inter text-xl font-black text-obsidian mb-1 text-center">Petals and Scars</h3>
              <p className="font-inter text-[11px] font-bold text-gold-main uppercase tracking-wider mb-3.5 text-center">Poetry Collection</p>
              <div className="font-inter text-xs md:text-sm font-black uppercase tracking-wider px-4 py-1.5 rounded-full mb-4 shadow-md flex items-center justify-center gap-2 bg-blue-50 text-blue-600 border border-blue-200/50">
                <Star className="w-3.5 h-3.5 fill-blue-600 shrink-0" /> 48 Sales in 24 Hours
              </div>
              <p className="font-inter text-xs text-slate-500 leading-relaxed text-center font-medium">A masterpiece collection featuring all top writings from our Authorverse Summit and the September Writing Competition.</p>
            </div>

          </div>
        </div>
      </section>

      {/* The Grand Slam Offer Stack */}
      <section id="offer" className="py-12 md:py-24 bg-gold-main/5 border-y luxury-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-xl border-2 luxury-border">
            <div className="bg-obsidian text-white p-5 sm:p-6 md:p-10 text-center">
              <h3 className="font-inter text-xl sm:text-2xl md:text-4xl font-black uppercase">Here Is Exactly What You Get</h3>
              <p className="mt-2.5 sm:mt-3 font-inter text-sm sm:text-base md:text-lg text-gold-main font-bold tracking-wide">The Complete "Go Pro" Author Package</p>
            </div>
            
            <div className="p-6 md:p-10 space-y-5">
              {valueStack.map((item) => (
                <div key={item.title} className="flex flex-col md:flex-row justify-between md:items-center gap-2 border-b border-slate-100 pb-5 last:border-0">
                  <div className="flex gap-3.5 items-start">
                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-inter text-[17px] font-black text-obsidian">{item.title}</p>
                      <p className="font-inter text-sm text-slate-600 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  <div className="text-left md:text-right mt-1 md:mt-0 md:pl-4">
                    <span className="font-inter text-[15px] text-slate-400 font-bold line-through">Value: {item.value}</span>
                  </div>
                </div>
              ))}
              
              <div className="bg-red-50 border border-red-200 p-5 md:p-6 rounded-xl mt-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <p className="font-inter text-sm uppercase font-black text-slate-500 mb-1">Total Value</p>
                    <p className="font-inter text-2xl line-through text-slate-400 font-black">₹24,996</p>
                  </div>
                  <div className="text-right">
                    <p className="font-inter text-sm uppercase font-black text-red-600 mb-1">Your Price Today</p>
                    <p className="font-inter text-4xl md:text-5xl font-black text-obsidian">₹485</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleActionClick}
                  className="w-full bg-[#e53e3e] hover:bg-red-700 text-white py-4 md:py-5 rounded-xl font-inter font-black text-lg md:text-xl uppercase shadow-lg transition-all flex items-center justify-center gap-2.5"
                >
                  {hasPaid ? 'SUBMIT YOUR WRITING NOW' : 'Apply For ₹485 Now'} <ChevronRight className="w-5 h-5" />
                </motion.button>
                <p className="text-center mt-3.5 font-inter text-xs font-bold text-slate-500">
                  🔒 Risk-Free: You don't pay anything on the application form. We only accept payment if you are selected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Our Proven Track Record Section */}
      <section className="py-12 md:py-24 bg-white text-obsidian border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-10 md:mb-16">
            <div className="flex justify-center mb-4 md:mb-5">
              <img 
                src="https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1777556045/iflogo_y3ss8e.png" 
                alt="Inkfetish Logo" 
                className="w-12 h-12 md:w-16 md:h-16 object-contain rounded-full border-2 border-gold-main/40 shadow-lg"
              />
            </div>
            <span className="font-inter text-[10px] sm:text-xs font-black uppercase tracking-widest text-gold-main bg-amber-50 border border-gold-main/20 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full inline-block mb-3 sm:mb-4">
              ✨ PROVEN TRUST & AUTHORITY
            </span>
            <h2 className="font-inter text-xl sm:text-2xl md:text-5xl font-black text-obsidian uppercase tracking-tight leading-tight">
              Inkfetish Publications <br className="hidden sm:block"/>
              <span className="gold-shimmer">~ Our Proven Track Record</span>
            </h2>
            <p className="mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto">
              Before you trust any platform, it’s important to know what they’ve already achieved. We don't guess; we deliver.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Left: Journey So Far (Bento Stats) */}
            <div className="bg-ivory border border-slate-200/60 p-8 rounded-2xl flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-gold-main/40 transition-colors duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-main/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-inter text-lg font-black text-obsidian uppercase tracking-wider border-b border-slate-200 pb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-gold-main" /> Our Journey So Far
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {[
                    { label: "Successful Competitions Hosted", val: "6 Competitions", icon: "✔️" },
                    { label: "Active Writers in Our Ecosystem", val: "3,200+ Writers Joined", icon: "✔️" },
                    { label: "Prize Money Distributed", val: "₹4,45,000+ Awarded", icon: "✔️" },
                    { label: "Winners Rewarded with Cash Prizes", val: "20+ Winners", icon: "✔️" },
                    { label: "Appreciation Credentials Provided", val: "Certificates for All", icon: "✔️" },
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-white border border-slate-100/80 p-3.5 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-start gap-3">
                      <span className="text-emerald-600 font-black shrink-0 mt-0.5">{stat.icon}</span>
                      <div>
                        <div className="font-inter text-sm font-black text-obsidian">{stat.val}</div>
                        <div className="font-inter text-[10px] font-bold text-slate-400 uppercase mt-0.5">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200/50 flex items-center gap-2 text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-inter text-[10px] font-bold uppercase tracking-widest">100% Verified Legacy & Operations</span>
              </div>
            </div>

            {/* Center: Notable Competitions */}
            <div className="bg-obsidian text-white p-8 rounded-2xl flex flex-col justify-between border border-white/5 relative overflow-hidden group hover:border-gold-main/30 transition-colors duration-300">
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gold-main/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-inter text-lg font-black text-white uppercase tracking-wider border-b border-white/10 pb-3 flex items-center gap-2">
                    <PenTool className="w-5 h-5 text-gold-main" /> Notable Competitions
                  </h3>
                </div>

                <div className="space-y-4">
                  {[
                    { name: "Authorverse Submit", desc: "Our annual flagship event promoting peer networking and submission reviews." },
                    { name: "Poetry Festival — Season 1", desc: "A celebrated national stage for authentic poetic expressions." },
                    { name: "September Writing Competition", desc: "A prestigious monthly competition pushing creative boundaries." },
                    { name: "Indian Writers League", desc: "The ultimate national tournament for budding and elite Indian writers." },
                  ].map((comp, idx) => (
                    <div key={idx} className="flex gap-3 items-start group/item">
                      <div className="bg-white/10 text-gold-main w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 group-hover/item:bg-gold-main group-hover/item:text-black transition-colors duration-300">✍️</div>
                      <div>
                        <h4 className="font-inter text-sm font-black text-white group-hover/item:text-gold-main transition-colors duration-300">{comp.name}</h4>
                        <p className="font-inter text-[11px] text-slate-400 font-medium leading-snug">{comp.desc}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-3 items-center pt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-main animate-pulse" />
                    <span className="font-inter text-xs text-gold-light font-bold uppercase tracking-wider">And many more upcoming...</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 text-slate-400">
                <Award className="w-4 h-4 text-gold-main shrink-0" />
                <span className="font-inter text-[10px] font-bold uppercase tracking-widest">Rewarding Creative Excellence</span>
              </div>
            </div>

            {/* Right: Bestselling Anthologies */}
            <div className="bg-white border border-slate-200/60 p-8 rounded-2xl flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-gold-main/40 transition-colors duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-inter text-lg font-black text-obsidian uppercase tracking-wider border-b border-slate-200 pb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-gold-main" /> Bestselling Anthologies
                  </h3>
                </div>

                <div className="space-y-4">
                  {[
                    { name: "Syaahi", record: "185 Sales in 24 Hours", detail: "Compiles masterpiece works of the top 200 elite writers from the Indian Writers League." },
                    { name: "Love at Minus One", record: "155 Sales in 2 Days", detail: "A winter romance poetry collection exploring romantic heartbreak where the heart freezes." },
                    { name: "Shakespeare & What Remained", record: "65 Sales in 48 Hours", detail: "Celebrates classical verses, compiling fine poetries from the 2025 Poetry Award." },
                    { name: "Petals and Scars", record: "48 Sales in 24 Hours", detail: "Masterpiece anthology from the September Competition and Authorverse Summit." }
                  ].map((book, idx) => (
                    <div key={idx} className="border-b border-slate-100 pb-3.5 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center flex-wrap gap-1">
                        <span className="font-inter text-sm font-black text-obsidian">{book.name}</span>
                        <span className="bg-red-50 text-red-600 text-[9px] font-black uppercase px-2 py-0.5 rounded border border-red-100">{book.record}</span>
                      </div>
                      <p className="font-inter text-[11px] text-slate-500 font-medium leading-snug mt-1">{book.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200/50 flex items-center gap-2 text-slate-400">
                <Users className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="font-inter text-[10px] font-bold uppercase tracking-widest text-slate-400">Trusted By Hundreds of Co-Authors</span>
              </div>
            </div>
          </div>

          {/* Bottom Statement Card */}
          <div className="bg-ivory border border-slate-200/60 p-6 md:p-8 rounded-2xl mt-8 text-center relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-4">
              <p className="font-inter text-sm md:text-base text-slate-700 font-medium leading-relaxed">
                This isn’t something new we’re experimenting with. This is a robust literary ecosystem we’ve already built, tested, and proven.
              </p>
              <p className="font-inter text-base md:text-lg font-black text-obsidian uppercase tracking-wide">
                So when you step in, you’re stepping into something real, trusted, and growing fast. ✍️
              </p>
            </div>
          </div>

          {/* Official Contact & Support Channels */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5 text-center">
            <a 
              href="https://www.instagram.com/ink.fetish/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white border border-slate-200/60 p-5 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-pink-500/40 hover:shadow-md transition-all duration-300 group"
            >
              <span className="text-pink-600 font-inter text-lg font-black uppercase tracking-wider">📸 Instagram</span>
              <span className="font-inter text-sm font-black text-slate-700 group-hover:text-pink-600 transition-colors">@ink.fetish</span>
              <span className="font-inter text-[10px] text-slate-400 font-bold uppercase">Follow Our Journey</span>
            </a>
            <a 
              href="mailto:inkfetishh@gmail.com" 
              className="bg-white border border-slate-200/60 p-5 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-gold-main/40 hover:shadow-md transition-all duration-300 group"
            >
              <span className="text-gold-main font-inter text-lg font-black uppercase tracking-wider">✉️ Email Support</span>
              <span className="font-inter text-sm font-black text-slate-700 group-hover:text-gold-main transition-colors">inkfetishh@gmail.com</span>
              <span className="font-inter text-[10px] text-slate-400 font-bold uppercase">Get in Touch Directly</span>
            </a>
            <a 
              href="https://wa.me/919216681908" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white border border-slate-200/60 p-5 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-green-600/40 hover:shadow-md transition-all duration-300 group"
            >
              <span className="text-green-600 font-inter text-lg font-black uppercase tracking-wider">💬 WhatsApp</span>
              <span className="font-inter text-sm font-black text-slate-700 group-hover:text-green-600 transition-colors">+91 92166 81908</span>
              <span className="font-inter text-[10px] text-slate-400 font-bold uppercase">Chat With Support</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-12 md:py-24 bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-inter text-2xl sm:text-3xl md:text-5xl font-black uppercase text-obsidian tracking-tight">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((item, index) => (
              <div 
                key={index} 
                className={`bg-white border transition-all duration-300 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:border-gold-main/50 ${openFaqIndex === index ? 'border-gold-main ring-1 ring-gold-main/20' : 'border-slate-200'}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="p-4 sm:p-5 md:p-6 flex justify-between items-center gap-3 sm:gap-4">
                  <h3 className={`font-inter text-sm sm:text-base md:text-lg font-black transition-colors ${openFaqIndex === index ? 'text-gold-dark' : 'text-obsidian'}`}>{item.q}</h3>
                  <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-400 transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180 text-gold-main' : ''}`} />
                </div>
                {openFaqIndex === index && (
                  <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 pt-0 border-t border-slate-100">
                    <p className="font-inter text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed mt-3 sm:mt-4">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Massive Footer */}
      <footer className="bg-obsidian text-white pt-12 md:pt-24 pb-8 md:pb-12 border-t border-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-main to-transparent opacity-50" />
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">
            <div className="md:col-span-2 space-y-4 md:space-y-6">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <img 
                  src="https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1777556045/iflogo_y3ss8e.png" 
                  alt="Inkfetish Logo" 
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-full border border-gold-main/40 shadow-md"
                />
                <h3 className="font-inter text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-widest gold-shimmer">Inkfetish</h3>
              </div>
              <p className="font-inter text-slate-400 text-sm leading-relaxed max-w-sm">
                India's fastest-growing hybrid publisher. We don't just publish books; we launch author careers. Our mission is to take 10,000 everyday writers and give them the platform, credibility, and verifiable portfolio they deserve.
              </p>
            </div>
            
            <div className="space-y-6">
              <h4 className="font-inter text-lg font-black uppercase text-white tracking-widest">Company</h4>
              <ul className="space-y-3 font-inter text-sm text-slate-400">
                <li><a href="#" className="hover:text-gold-main transition-colors inline-block hover:translate-x-1 transform duration-200">About Us</a></li>
                <li><a href="#" className="hover:text-gold-main transition-colors inline-block hover:translate-x-1 transform duration-200">Our Authors</a></li>
                <li><a href="#" className="hover:text-gold-main transition-colors inline-block hover:translate-x-1 transform duration-200">Anthologies</a></li>
                <li><a href="mailto:inkfetishh@gmail.com" className="hover:text-gold-main transition-colors inline-block hover:translate-x-1 transform duration-200">Contact Support</a></li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h4 className="font-inter text-lg font-black uppercase text-white tracking-widest">Legal</h4>
              <ul className="space-y-3 font-inter text-sm text-slate-400">
                <li><a href="#" className="hover:text-gold-main transition-colors inline-block hover:translate-x-1 transform duration-200">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-gold-main transition-colors inline-block hover:translate-x-1 transform duration-200">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gold-main transition-colors inline-block hover:translate-x-1 transform duration-200">Refund Policy</a></li>
                <li><a href="#" className="hover:text-gold-main transition-colors inline-block hover:translate-x-1 transform duration-200">Publishing Agreement</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-inter text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center md:text-left">
              © 2026 Inkfetish Publications. All Rights Reserved. Stop waiting. Start publishing.
            </p>
            <div className="flex gap-4">
              <span className="font-inter text-xs text-slate-400 font-bold flex items-center gap-1.5 border border-white/10 px-3 py-1.5 rounded-full"><ShieldCheck className="w-3.5 h-3.5 text-green-400" /> Secure Checkout via Cashfree Payments</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-[70] md:hidden bg-white border-t-[3px] border-red-500 p-3.5 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
        <div className="flex justify-between items-center mb-2">
          <span className="font-inter font-black text-slate-800 uppercase text-[10px]">Total Value: <span className="line-through text-slate-400">₹24,996</span></span>
          <span className="font-inter font-black text-red-600 text-base">Only ₹485</span>
        </div>
        <button onClick={handleActionClick} className="w-full bg-[#e53e3e] text-white py-3.5 rounded-lg font-inter font-black text-base uppercase flex items-center justify-center gap-2">
          {hasPaid ? 'SUBMIT YOUR WRITING' : 'Claim Offer'} <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default HoneyAndHurtClient;
