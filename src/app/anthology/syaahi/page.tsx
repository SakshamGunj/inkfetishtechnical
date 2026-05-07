'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Feather, BookOpen, Star, ShieldCheck, Truck, ArrowRight, CheckCircle2, Award, Zap, Users } from 'lucide-react';
import Head from 'next/head';

export default function SyahiLandingPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    // Check if already paid
    const paidOrderId = localStorage.getItem('syaahi_paid_order_id');
    if (paidOrderId) {
      fetch(`/api/syahi/verify-order?order_id=${paidOrderId}`)
        .then(res => res.json())
        .then(data => {
          if (data.order_status === 'PAID') {
            window.location.href = `/anthology/syaahi/thank-you?order_id=${paidOrderId}`;
          } else {
            localStorage.removeItem('syaahi_paid_order_id');
          }
        })
        .catch(() => {});
    }

    // 3 days, 14 hours, 22 mins initially
    const DURATION = 3 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000 + 22 * 60 * 1000; 
    
    let targetDate = localStorage.getItem('syaahi_discount_end_v2');
    
    if (!targetDate || parseInt(targetDate) < Date.now()) {
      targetDate = (Date.now() + DURATION).toString();
      localStorage.setItem('syaahi_discount_end_v2', targetDate);
    }
    
    const targetTime = parseInt(targetDate);

    const updateTimer = () => {
      const now = Date.now();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700&display=swap');
        
        .font-cinzel { font-family: 'Montserrat', sans-serif; }
        .font-playfair { font-family: 'Outfit', sans-serif; }
        
        .bg-parchment {
          background-color: #f2e6d3;
          background-image: 
            radial-gradient(circle at 50% 50%, transparent 20%, rgba(200, 180, 150, 0.1) 80%),
            linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4));
        }
        
        .text-navy { color: #0a1b3f; }
        .bg-navy { background-color: #0a1b3f; }
        .text-gold { color: #b8860b; }
        .border-gold { border-color: #b8860b; }
        .bg-gold { background-color: #b8860b; }
        
        .ornate-border {
          position: relative;
        }
        .ornate-border::before, .ornate-border::after {
          content: '❖';
          color: #b8860b;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.8rem;
        }
        .ornate-border::before { left: 0; }
        .ornate-border::after { right: 0; }
        
        .divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          color: #b8860b;
          font-size: 1.2rem;
          margin: 2rem 0;
        }
        .divider::before, .divider::after {
          content: '';
          height: 1px;
          background: #b8860b;
          flex-grow: 1;
          max-width: 100px;
          opacity: 0.5;
        }
      `}} />
      
      <div className="min-h-screen bg-parchment text-navy font-sans selection:bg-navy selection:text-white pb-24 sm:pb-0">
        {/* Minimal Navigation */}
        <nav className="w-full py-3 lg:py-3 flex justify-center items-center border-b border-[#b8860b]/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-navy rounded-full flex items-center justify-center border border-[#b8860b]">
              <Feather className="text-[#b8860b] w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel font-bold text-base tracking-widest text-navy leading-none">INKFETISH</span>
              <span className="font-playfair text-[0.55rem] tracking-[0.3em] text-[#b8860b] uppercase font-bold">Publication</span>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-6 lg:pt-8 pb-16 lg:pb-8 px-6 overflow-hidden min-h-[calc(100vh-80px)] flex items-center">
          {/* Subtle background mandala/ornament placeholder */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
            <div className="w-[800px] h-[800px] border-[1px] border-navy rounded-full"></div>
            <div className="absolute w-[600px] h-[600px] border-[1px] border-navy rounded-full rotate-45"></div>
          </div>

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-2 lg:gap-8 items-center relative z-10">
            
            {/* Left Column: Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center lg:items-start lg:text-left order-2 lg:order-1"
            >
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                <div className="h-px bg-[#b8860b] w-8 lg:w-12 opacity-50"></div>
                <span className="font-cinzel text-[#b8860b] text-xs lg:text-sm font-bold uppercase tracking-[0.3em]">Introducing</span>
                <div className="h-px bg-[#b8860b] w-8 lg:w-12 opacity-50 hidden lg:block"></div>
              </div>

              <h1 className="text-6xl sm:text-7xl lg:text-6xl xl:text-[5.5rem] font-cinzel font-black text-navy leading-none mb-3 lg:mb-4 drop-shadow-sm relative inline-block z-10">
                SYAAHI
                <span className="absolute -top-3 lg:-top-4 -right-6 lg:-right-8 text-[#b8860b] font-playfair text-xl lg:text-2xl italic rotate-12">Vol. 1</span>
              </h1>

              <div className="divider lg:hidden w-full max-w-[200px] mx-auto mb-6">
                <span className="text-xl">❦</span>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-playfair font-bold text-navy/90 leading-snug mb-3 uppercase tracking-wider">
                An Anthology Featuring <br className="hidden lg:block"/>
                <span className="text-[#b8860b] text-lg lg:text-xl">Top 200 Writers From IWL</span>
              </h2>

              <div className="mb-6 lg:mb-6 w-full max-w-lg mx-auto lg:mx-0 text-left">
                <p className="text-lg sm:text-xl font-playfair text-navy font-bold mb-4 text-center lg:text-left">
                  This is the <strong className="text-[#b8860b] text-2xl font-cinzel uppercase tracking-widest">Syaahi Book</strong> 🖊️
                </p>
                
                <div className="bg-white/40 backdrop-blur-sm border-l-4 border-[#b8860b] p-5 sm:p-6 shadow-[0_10px_30px_rgba(10,27,63,0.05)] relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 text-[#b8860b] opacity-10 rotate-[-15deg] pointer-events-none">
                    <BookOpen className="w-32 h-32" />
                  </div>
                  
                  <p className="text-base sm:text-lg font-playfair text-navy/90 leading-relaxed italic relative z-10 font-medium">
                    "We’ve treated this book like our own baby. From the best paper quality to the exquisite finish, everything has been carefully chosen."
                  </p>
                  
                  <div className="mt-5 flex flex-col gap-3 relative z-10 border-t border-[#b8860b]/20 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#b8860b] shadow-[0_0_5px_#b8860b]"></div>
                      <span className="text-xs sm:text-sm font-cinzel font-bold tracking-widest uppercase text-navy">Premium-Grade Pages</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#b8860b] shadow-[0_0_5px_#b8860b]"></div>
                      <span className="text-xs sm:text-sm font-cinzel font-bold tracking-widest uppercase text-navy">Rich Matte Finish</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#b8860b] shadow-[0_0_5px_#b8860b]"></div>
                      <span className="text-xs sm:text-sm font-cinzel font-bold tracking-widest uppercase text-navy">Built to keep, not just read</span>
                    </div>
                    <div className="flex items-center gap-3 mt-2 border-t border-navy/10 pt-3">
                      <span className="text-[10px] sm:text-xs font-cinzel font-bold tracking-widest text-navy/60">ISBN: 978-81-68596-59-7</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-center lg:items-center w-full lg:w-auto">
                <Link 
                  href="/anthology/syaahi/buy"
                  className="group w-full sm:w-auto relative bg-navy text-[#f2e6d3] px-8 lg:px-10 py-4 lg:py-5 rounded-sm font-cinzel font-bold text-base flex items-center justify-center gap-3 overflow-hidden shadow-2xl shadow-navy/30 border border-[#b8860b]/30 hover:border-[#b8860b] transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <BookOpen className="w-5 h-5 text-[#b8860b]" />
                  RESERVE YOUR COPY
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-[#b8860b]" />
                </Link>
                
                <div className="flex flex-col items-center sm:items-start text-xs sm:text-sm font-cinzel font-bold text-navy/60 justify-center">
                  <div className="flex gap-1 text-[#b8860b] mb-1">
                    <Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span>Limited Collector's Edition</span>
                  <div className="flex items-center gap-1.5 mt-2 opacity-90 text-[10px] tracking-widest text-green-700">
                    <ShieldCheck className="w-3.5 h-3.5" /> 100% SECURE CHECKOUT
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Transparent Book Image */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-0 order-1 lg:order-2 flex justify-center items-center lg:justify-end -mb-4 lg:-mb-0"
            >
               <img src="https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1778137798/rbb6irz8p3oipppmuzld_2_fpgyrg.webp" alt="Syaahi Book Preview" className="w-full max-w-[280px] sm:max-w-[400px] lg:max-w-[85%] xl:max-w-[90%] h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-700 object-contain origin-right relative z-10 pointer-events-auto" />
               
               {/* Floating Cards */}
               <motion.div 
                 animate={{ y: [0, -10, 0] }} 
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute top-10 sm:top-16 left-0 sm:-left-2 lg:-left-4 bg-white/95 backdrop-blur-md border border-[#b8860b]/30 shadow-[0_10px_30px_rgba(0,0,0,0.1)] px-3 py-2 sm:px-4 sm:py-3 rounded-sm z-20 flex items-center gap-2 sm:gap-3 pointer-events-none"
               >
                 <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#b8860b]/10 flex items-center justify-center text-[#b8860b]">
                   <Feather className="w-3 h-3 sm:w-4 sm:h-4" />
                 </div>
                 <div className="flex flex-col">
                   <span className="font-cinzel font-bold text-navy text-[10px] sm:text-xs tracking-widest uppercase leading-tight">80 GSM</span>
                   <span className="font-playfair text-[#b8860b] text-[8px] sm:text-[10px] italic">Highest Paper Quality</span>
                 </div>
               </motion.div>

               <motion.div 
                 animate={{ y: [0, 10, 0] }} 
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                 className="absolute bottom-10 sm:bottom-16 right-0 sm:right-0 lg:right-2 bg-white/95 backdrop-blur-md border border-[#b8860b]/30 shadow-[0_10px_30px_rgba(0,0,0,0.1)] px-3 py-2 sm:px-4 sm:py-3 rounded-sm z-20 flex items-center gap-2 sm:gap-3 pointer-events-none"
               >
                 <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#b8860b]/10 flex items-center justify-center text-[#b8860b]">
                   <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                 </div>
                 <div className="flex flex-col">
                   <span className="font-cinzel font-bold text-navy text-[10px] sm:text-xs tracking-widest uppercase leading-tight">Matte Finish</span>
                   <span className="font-playfair text-[#b8860b] text-[8px] sm:text-[10px] italic">Rich & Refined Texture</span>
                 </div>
               </motion.div>

            </motion.div>
          </div>
        </section>

        {/* Visual Anchor (The Book) */}
        <section className="px-6 pb-24 relative z-10">
           <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-5xl mx-auto text-center"
          >
            <Feather className="w-12 h-12 text-[#b8860b] mx-auto mb-4 opacity-80" />
            <h2 className="text-3xl lg:text-4xl font-cinzel text-navy font-bold tracking-widest text-center px-4 mb-12 drop-shadow-sm">
              THE GOLD STANDARD <br/> OF LITERATURE
            </h2>

            <div className="relative bg-[#0a1b3f] p-3 rounded-sm shadow-2xl mx-auto max-w-4xl border border-[#b8860b]/40">
              <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-[#b8860b]"></div>
              <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-[#b8860b]"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-[#b8860b]"></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-[#b8860b]"></div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <img src="https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1778137588/trsnpcwrm5q61xo28qvl_jqxykj.webp" alt="Syaahi Collector's Edition Details 1" className="w-full aspect-square object-cover rounded-sm hover:opacity-90 transition-opacity" />
                <img src="https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1778137587/pezfosvx2fszfwxaffhs_mtcvbi.webp" alt="Syaahi Collector's Edition Details 2" className="w-full aspect-square object-cover rounded-sm hover:opacity-90 transition-opacity" />
              </div>

              <div className="absolute -bottom-8 right-8 bg-[#f2e6d3] p-6 rounded-sm shadow-xl border border-[#b8860b] text-center z-20">
                <div className="text-xs font-cinzel font-bold text-navy uppercase tracking-widest mb-1">Pre-Order Price</div>
                <div className="text-4xl font-playfair font-black text-[#b8860b]">₹385</div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Trust Bar */}
        <section className="bg-navy py-10 px-4 border-y border-[#b8860b]/30">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:flex md:flex-row md:flex-wrap justify-center gap-8 gap-y-10 lg:gap-20">
            <div className="flex flex-col items-center text-center gap-2 lg:gap-3 text-[#f2e6d3]">
              <BookOpen className="w-7 h-7 lg:w-8 lg:h-8 text-[#b8860b]" />
              <span className="font-cinzel font-bold tracking-widest text-[10px] lg:text-sm uppercase">220+ Pages</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2 lg:gap-3 text-[#f2e6d3]">
              <Star className="w-7 h-7 lg:w-8 lg:h-8 text-[#b8860b]" />
              <span className="font-cinzel font-bold tracking-widest text-[10px] lg:text-sm uppercase">Rich Matte Finish</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2 lg:gap-3 text-[#f2e6d3]">
              <Feather className="w-7 h-7 lg:w-8 lg:h-8 text-[#b8860b]" />
              <span className="font-cinzel font-bold tracking-widest text-[10px] lg:text-sm uppercase">High Quality Paper</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2 lg:gap-3 text-[#f2e6d3]">
              <ShieldCheck className="w-7 h-7 lg:w-8 lg:h-8 text-[#b8860b]" />
              <span className="font-cinzel font-bold tracking-widest text-[10px] lg:text-sm uppercase">100% Secure Checkout</span>
            </div>
          </div>
        </section>

        {/* The Story Behind Syaahi */}
        <section className="py-20 lg:py-24 px-6 relative bg-white/40 border-b border-[#b8860b]/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-cinzel font-bold text-navy mb-6">The Story Behind Syaahi</h2>
            <div className="divider mx-auto mb-10"><Feather className="w-5 h-5"/></div>
            
            <div className="bg-white/80 p-8 lg:p-12 shadow-xl border border-[#b8860b]/30 rounded-sm relative">
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#b8860b]"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#b8860b]"></div>
              
              <p className="text-lg lg:text-xl font-playfair text-navy/80 leading-relaxed mb-8">
                The Indian Writers League, organized by Inkfetish Publication, witnessed the participation of over <strong className="text-navy font-bold">660+ writers</strong> from across the nation. From this incredible talent pool, we proudly selected the <strong className="text-navy font-bold">Top 200 writers</strong> for our Hall of Fame. 
                <br/><br/>
                <span className="font-bold text-[#b8860b] font-cinzel text-xl lg:text-2xl uppercase tracking-widest">Syaahi Volume 1 is the physical collection of those legends.</span>
              </p>
              <p className="text-base lg:text-lg font-playfair text-navy/70 leading-relaxed">
                We did not just want to print another book. We set out to craft an artifact. Syaahi has been designed as a true piece of art—something you will be proud to display on your bookshelf for years to come. Whether you are one of the featured Top 200 writers, or a passionate reader exploring diverse new voices, this collector's edition is built to be treasured forever.
              </p>
            </div>
          </div>
        </section>

        {/* Why Syaahi? (Hormozi style, Premium Delivery) */}
        <section className="py-20 px-6 relative">
          <div className="max-w-5xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-cinzel font-bold text-navy mb-6">
              More Than Just Pages
            </h2>
            <div className="divider mx-auto"><Feather className="w-5 h-5"/></div>
            
            <div className="flex flex-col md:flex-row justify-center gap-6 text-left max-w-4xl mx-auto mt-12 font-playfair">
              <div className="flex-1 bg-white/60 backdrop-blur-sm p-8 border border-[#b8860b]/30 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#b8860b]"></div>
                <div className="text-4xl mb-4">🏆</div>
                <h4 className="font-cinzel font-bold text-navy text-xl mb-3 uppercase tracking-wider">For All Top 200 Writers</h4>
                <p className="text-navy/80 text-lg leading-relaxed">This will be your achievement—something you’ll actually feel incredibly proud to keep on your bookshelf forever.</p>
              </div>
              <div className="flex-1 bg-white/60 backdrop-blur-sm p-8 border border-[#b8860b]/30 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#b8860b]"></div>
                <div className="text-4xl mb-4">✍️</div>
                <h4 className="font-cinzel font-bold text-navy text-xl mb-3 uppercase tracking-wider">For Everyone Else</h4>
                <p className="text-navy/80 text-lg leading-relaxed">A masterpiece of literature and design. This is something you’ll absolutely still want to have with you, simply to hold and experience.</p>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Curated Brilliance",
                desc: "Selected from thousands, only the top 200 most evocative voices made it. Owning this means holding history.",
                icon: <Zap className="w-10 h-10 text-[#b8860b]" />
              },
              {
                title: "Regal Craftsmanship",
                desc: "Antique-finish pages, deep navy binding, and gold-foil accents. A masterpiece worthy of your finest shelf.",
                icon: <BookOpen className="w-10 h-10 text-[#b8860b]" />
              },
              {
                title: "Elite Brotherhood",
                desc: "Gain entry to the exclusive IWL Inner Circle. Network, collaborate, and grow with the nation's best minds.",
                icon: <Users className="w-10 h-10 text-[#b8860b]" />
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-10 bg-white/50 backdrop-blur-sm border border-[#b8860b]/20 shadow-lg relative group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#b8860b] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="mb-6 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-cinzel font-bold text-navy mb-4 text-center">{feature.title}</h3>
                <p className="font-playfair text-navy/80 leading-relaxed text-center text-lg">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* The Offer (Value Stacking) */}
        <section className="py-24 px-6 bg-navy relative border-y-4 border-[#b8860b]">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
          
          <div className="max-w-4xl mx-auto bg-[#f2e6d3] p-12 lg:p-16 shadow-2xl relative">
            {/* Corner Ornaments */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-navy/20"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-navy/20"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-navy/20"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-navy/20"></div>

            <div className="text-center mb-12">
              <span className="text-navy font-cinzel font-bold tracking-[0.2em] uppercase text-sm border-b border-[#b8860b] pb-1">Order Summary</span>
              <h2 className="text-4xl lg:text-5xl font-cinzel font-bold text-navy mt-6 mb-4">Secure Your Copy</h2>
            </div>

            <div className="space-y-4 mb-8 font-playfair text-lg">
              <div className="flex justify-between items-center py-4 border-b border-navy/10">
                <span className="text-navy font-bold">Syaahi Vol. 1 (Launch Price)</span>
                <span className="text-navy font-bold whitespace-nowrap ml-4">₹499</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-navy/10 text-green-700">
                <span className="font-bold flex items-center gap-2"><CheckCircle2 className="w-5 h-5"/> Early Bird / Community Discount</span>
                <span className="font-bold whitespace-nowrap ml-4">-₹114</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-navy/10">
                <span className="text-navy/80">Shipping</span>
                <span className="text-[#b8860b] font-bold uppercase tracking-widest text-sm whitespace-nowrap ml-4">Free</span>
              </div>
              
              <div className="bg-[#b8860b]/10 border border-[#b8860b]/30 p-5 rounded-sm mt-8 mb-8">
                <div className="flex items-start gap-4">
                  <Star className="w-6 h-6 text-[#b8860b] shrink-0 mt-0.5" />
                  <div className="text-left">
                    <span className="font-cinzel font-bold text-navy block text-sm lg:text-base tracking-widest uppercase mb-1">FREE BONUS SECURED</span>
                    <span className="text-sm lg:text-base text-navy/80 italic font-playfair">₹150 Digital Cash to redeem on the next Inkfetish contest.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-navy p-8 lg:p-10 text-center text-[#f2e6d3] border border-[#b8860b]/50 shadow-inner">
              <div className="flex justify-between items-center mb-8 border-b border-[#f2e6d3]/20 pb-6">
                 <span className="font-cinzel font-bold text-xl lg:text-2xl uppercase tracking-widest">Final Total</span>
                 <span className="text-5xl lg:text-6xl font-cinzel font-black text-[#b8860b]">₹385</span>
              </div>
              
              <Link 
                href="/anthology/syaahi/buy"
                className="inline-block w-full max-w-md bg-[#b8860b] text-navy py-5 px-8 font-cinzel font-bold text-xl hover:bg-white transition-all shadow-xl uppercase tracking-widest border-2 border-transparent hover:border-[#b8860b]"
              >
                CLAIM OFFER NOW
              </Link>
              
              <div className="mt-6 flex items-center justify-center gap-6 text-xs opacity-70 font-cinzel font-bold uppercase tracking-widest">
                <div className="flex items-center gap-2"><Truck className="w-4 h-4" /> Free Shipping</div>
                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Secure Checkout</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-navy text-[#f2e6d3] py-16 px-6 relative overflow-hidden">
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
            <Feather className="text-[#b8860b] w-12 h-12 mb-6" />
            <h2 className="text-3xl font-cinzel font-bold mb-4 tracking-wider">INKFETISH PUBLICATION</h2>
            <p className="max-w-xl font-playfair italic opacity-70 mb-10 text-lg">
              Preserving the voices of today, for the legends of tomorrow.
            </p>
            
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#b8860b]/30 to-transparent mb-10"></div>
            
            <div className="flex flex-col md:flex-row justify-between w-full text-sm font-cinzel tracking-widest opacity-50">
              <div>© 2026 INDIAN WRITERS LEAGUE.</div>
              <div className="flex gap-8 mt-4 md:mt-0 justify-center">
                <Link href="/privacy-policy" className="hover:text-[#b8860b] transition-colors">PRIVACY</Link>
                <Link href="/terms-of-service" className="hover:text-[#b8860b] transition-colors">TERMS</Link>
              </div>
            </div>
          </div>
        </footer>

        {/* Sticky Bottom Bar for Landing Page (Mobile Only) */}
        <div className="lg:hidden fixed bottom-0 left-0 w-full bg-navy border-t-2 border-[#b8860b]/60 py-3 px-4 z-50 flex items-center justify-between shadow-[0_-15px_40px_rgba(10,27,63,0.9)]">
          <div className="flex flex-col">
            <span className="text-[#f2e6d3] font-cinzel font-bold text-xs sm:text-base leading-tight uppercase tracking-wider">Secure Syaahi Vol. 1</span>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-1.5 mt-1">
              <span className="text-[#b8860b] font-playfair text-[10px] sm:text-xs italic tracking-wide">Discount ends in:</span>
              <div className="flex items-center gap-0.5 text-[11px] sm:text-xs font-bold text-white bg-white/10 px-1.5 py-0.5 rounded-sm tracking-wider w-fit sm:w-[140px] justify-center">
                {isMounted ? (
                  <><span>{timeLeft.days}d</span> : <span>{timeLeft.hours.toString().padStart(2, '0')}h</span> : <span>{timeLeft.minutes.toString().padStart(2, '0')}m</span> : <span>{timeLeft.seconds.toString().padStart(2, '0')}s</span></>
                ) : (
                  <><span>3d</span> : <span>14h</span> : <span>22m</span> : <span>59s</span></>
                )}
              </div>
            </div>
          </div>
          <Link 
            href="/anthology/syaahi/buy"
            className="bg-[#b8860b] text-navy px-6 py-2.5 sm:px-8 sm:py-3 rounded-sm font-cinzel font-bold text-xs sm:text-sm hover:bg-white transition-all shadow-[0_0_15px_rgba(184,134,11,0.5)] uppercase tracking-widest whitespace-nowrap border border-transparent hover:border-[#b8860b]"
          >
            ORDER NOW
          </Link>
        </div>
      </div>
    </>
  );
}

