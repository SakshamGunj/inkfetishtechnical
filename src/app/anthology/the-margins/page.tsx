'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Star, ShieldCheck, Truck, ArrowRight, BookType, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function TheMarginsLandingPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    // Timer for urgency
    const DURATION = 3 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000 + 22 * 60 * 1000; 
    let targetDate = localStorage.getItem('margins_discount_end');
    
    if (!targetDate || parseInt(targetDate) < Date.now()) {
      targetDate = (Date.now() + DURATION).toString();
      localStorage.setItem('margins_discount_end', targetDate);
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
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap');
        
        .font-oswald { font-family: 'Oswald', sans-serif; }
        .font-mono { font-family: 'Space Mono', monospace; }
        .font-inter { font-family: 'Inter', sans-serif; }
        
        .bg-vibrant-orange { background-color: #F05C33; }
        .text-vibrant-orange { color: #F05C33; }
        
        .bg-typewriter-paper { 
            background-color: #F5EEDB;
            background-image: 
                radial-gradient(#d3c6a6 1px, transparent 1px);
            background-size: 20px 20px;
            background-position: 0 0, 10px 10px;
            box-shadow: inset 0 0 50px rgba(0,0,0,0.05);
        }
        
        .typewriter-dash {
            border-bottom: 2px dashed rgba(0,0,0,0.2);
            width: 100%;
            margin: 1.5rem 0;
        }

        .typewriter-dots {
            display: flex;
            gap: 8px;
            margin-bottom: 1rem;
        }
        .typewriter-dots span {
            width: 12px;
            height: 12px;
            border-radius: 50%;
        }
        .dot-red { background-color: #E24A32; }
        .dot-green { background-color: #388470; }
        .dot-yellow { background-color: #EBB036; }
      `}} />
      
      <div className="min-h-screen bg-vibrant-orange text-[#111] font-inter selection:bg-[#111] selection:text-white pb-24 sm:pb-0 overflow-x-hidden">
        
        {/* Minimal Navbar */}
        <nav className="w-full bg-[#111] text-[#F5EEDB] py-1.5 px-4 sm:px-6 flex items-center justify-between border-b-4 border-[#F5EEDB] relative z-50">
           <div className="flex items-center gap-3 max-w-7xl mx-auto w-full">
               <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center p-0.5 shrink-0 border border-[#111]">
                 <img src="/images/inkfetish_logo.png" alt="Inkfetish Logo" className="w-full h-full object-contain rounded-full" />
               </div>
               <div className="flex flex-col justify-center">
                   <span className="font-oswald font-bold text-xs sm:text-sm uppercase tracking-widest leading-none mt-0.5">Inkfetish Publications</span>
                   <span className="font-mono text-[8px] sm:text-[10px] uppercase tracking-wider text-[#F05C33] mt-0.5 leading-none">Organizer of Poetry Festival Season 2</span>
               </div>
           </div>
        </nav>
        {/* Hero Section */}
        <section className="relative pt-10 pb-16 lg:py-12 px-4 sm:px-6 lg:px-12 flex flex-col-reverse lg:flex-row items-center justify-center lg:min-h-[95vh] gap-8 max-w-[90rem] mx-auto">
          
          {/* Left Column: Typewriter Paper Concept */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-8/12 z-10 max-w-2xl mx-auto lg:mx-0 flex flex-col justify-center"
          >
            <div className="bg-typewriter-paper p-4 sm:p-5 lg:p-6 shadow-2xl relative border-l-4 border-black/10 transform rotate-[-1deg] flex-shrink-0">
                <div className="typewriter-dots mb-2 sm:mb-3">
                    <span className="dot-red"></span>
                    <span className="dot-green"></span>
                    <span className="dot-yellow"></span>
                </div>
                
                <p className="font-mono text-xs sm:text-sm font-bold mb-2 tracking-tight">inkfetish.in</p>
                
                <div className="typewriter-dash my-2 sm:my-3"></div>
                
                <div className="bg-[#F05C33] text-white px-2 py-0.5 sm:px-3 sm:py-1 font-mono text-[10px] sm:text-xs font-bold inline-block mb-2 sm:mb-3 uppercase tracking-wider">
                    Presenting
                </div>
                
                <h3 className="font-mono font-bold text-base sm:text-xl lg:text-2xl xl:text-3xl leading-relaxed tracking-tight">
                    An Anthology Featuring <br/>
                    <span className="text-[#F05C33]">Top 200 Poets from</span>
                </h3>
                
                <div className="typewriter-dash my-2 sm:my-3"></div>
                
                <p className="font-mono font-bold text-sm sm:text-base tracking-tight mb-1">Poetry Festival - Season 2</p>
                <div className="typewriter-dash my-2 sm:my-3"></div>
                
                <p className="font-mono text-xs sm:text-sm font-bold leading-relaxed mb-2 sm:mb-3 mt-2 sm:mt-3">
                    Two hundred voices.<br/>
                    One stage.<br/>
                    Countless stories.
                </p>
                
                <p className="font-mono text-[11px] sm:text-sm leading-relaxed mb-2 sm:mb-3 opacity-80 border-l-2 border-[#F05C33] pl-3">
                    The finest poems from the year's most anticipated poetry event, now immortalized in one exclusive anthology. Experience the raw emotion and undeniable talent of India's rising literary stars.
                </p>

                <div className="typewriter-dash my-2 sm:my-3"></div>
                
                <p className="font-mono font-bold text-[11px] sm:text-sm tracking-tight">A celebration of words.</p>
                <div className="typewriter-dash my-2 sm:my-3"></div>
                
                {/* Embedded paper slip */}
                <div className="bg-[#F6F2EB] shadow-lg p-2 sm:p-3 transform rotate-2 font-mono font-bold text-xs sm:text-sm text-center leading-snug border border-black/5 mt-1">
                    Presenting<br/>
                    the top 200 poets<br/>
                    from poetry<br/>
                    festival season 2
                </div>
            </div>

          </motion.div>

          {/* Right Column: Title text */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-4/12 flex flex-col justify-center items-center lg:items-start pb-8 lg:pb-0"
          >
            <div className="flex flex-col items-center lg:items-start mb-6 text-[#111] space-y-2">
                <div className="flex text-[#EBB036] gap-1">
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                </div>
                <span className="font-oswald font-bold text-2xl sm:text-3xl tracking-wide">Limited Collector's Edition</span>
                <div className="flex items-center gap-2 text-[#388470] font-oswald font-bold tracking-widest uppercase mt-1">
                    <ShieldCheck className="w-5 h-5" />
                    <span>100% SECURE CHECKOUT</span>
                </div>
            </div>

            <h1 className="font-oswald font-bold text-[25vw] sm:text-[8rem] lg:text-[5rem] xl:text-[6rem] 2xl:text-[7rem] leading-[0.85] text-[#111] tracking-tighter drop-shadow-md text-center lg:text-left mb-2 uppercase flex flex-col">
              <span className="text-[#F5EEDB]">THE</span>
              <span>MARGINS</span>
            </h1>
            
            <div className="flex items-center gap-3 sm:gap-4 text-[#111] mt-2 lg:mt-0">
                <div className="h-0.5 w-12 sm:w-16 bg-[#111] hidden sm:block"></div>
                <div className="typewriter-dots !mb-0">
                    <span className="dot-red" style={{backgroundColor: '#111'}}></span>
                    <span className="dot-green" style={{backgroundColor: '#111'}}></span>
                    <span className="dot-yellow" style={{backgroundColor: '#111'}}></span>
                </div>
            </div>
            
            <h2 className="font-mono text-base sm:text-lg lg:text-lg xl:text-xl font-bold uppercase tracking-tight text-center lg:text-left mt-4 border-l-4 border-[#111] pl-3 sm:pl-4">
                Where Stories Live<br/>
                Between The Lines
            </h2>

            <div className="mt-4 lg:mt-6 flex flex-col items-center lg:items-start">
                <Link 
                  href="/anthology/the-margins/buy"
                  className="group inline-flex items-center justify-center w-full sm:w-auto gap-3 bg-[#00C853] text-[#111] px-8 py-3.5 font-oswald tracking-widest font-bold text-base sm:text-lg shadow-[0_0_20px_rgba(0,200,83,0.4)] hover:bg-[#111] hover:text-[#00C853] transition-all border-2 border-[#111]"
                >
                  RESERVE YOUR COPY
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-[26rem] mt-6">
                    <div className="bg-[#111] p-3 flex flex-col items-center text-center justify-center border-b-2 border-[#F5EEDB] shadow-lg">
                        <ShieldCheck className="w-5 h-5 mb-1.5 text-[#F5EEDB]" />
                        <span className="font-oswald font-bold text-[10px] sm:text-[11px] text-white uppercase tracking-widest leading-tight">99% Delivery<br/>Success</span>
                    </div>
                    <div className="bg-[#111] p-3 flex flex-col items-center text-center justify-center border-b-2 border-[#F5EEDB] shadow-lg">
                        <Star className="w-5 h-5 mb-1.5 text-[#F5EEDB]" />
                        <span className="font-oswald font-bold text-[10px] sm:text-[11px] text-white uppercase tracking-widest leading-tight">Trusted By<br/>20K+ Readers</span>
                    </div>
                    <div className="bg-[#111] p-3 flex flex-col items-center text-center justify-center border-b-2 border-[#F5EEDB] shadow-lg">
                        <BookOpen className="w-5 h-5 mb-1.5 text-[#F5EEDB]" />
                        <span className="font-oswald font-bold text-[10px] sm:text-[11px] text-white uppercase tracking-widest leading-tight">Premium<br/>Quality</span>
                    </div>
                </div>
            </div>


          </motion.div>
        </section>

        {/* Gold Standard Image Section */}
        <section className="bg-[#111] pt-20 pb-10 px-4 sm:px-6 relative border-t-8 border-[#F5EEDB]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-oswald font-bold uppercase tracking-widest mb-8 lg:mb-10 text-center text-white">
              Gold Standard of Poems
            </h2>
            
            <div className="relative w-full max-w-4xl mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 sm:border-4 border-[#111] group">
                <img 
                    src="/margins-landscape.png" 
                    alt="The Margins Book Display" 
                    className="w-full h-auto object-cover"
                />
                
                {/* Floating Price Card */}
                <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 bg-[#F05C33] text-white p-3 sm:p-5 shadow-2xl border-2 sm:border-4 border-[#111] rotate-[-2deg] group-hover:rotate-0 transition-transform duration-300">
                    <p className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-90 mb-0.5 sm:mb-1">Pre-order Offer</p>
                    <p className="font-oswald text-2xl sm:text-4xl font-black leading-none">₹385 <span className="text-sm sm:text-lg opacity-70 uppercase tracking-widest">Only</span></p>
                </div>
            </div>

            <div className="mt-20 flex justify-center">
                <Link 
                  href="/anthology/the-margins/buy"
                  className="group inline-flex items-center justify-center w-full sm:w-auto gap-3 bg-[#111] text-[#F5EEDB] px-12 py-5 font-oswald tracking-widest font-bold text-xl sm:text-2xl shadow-[8px_8px_0_#F5EEDB] hover:shadow-[12px_12px_0_#F5EEDB] hover:-translate-y-1 transition-all border-4 border-[#111]"
                >
                  SECURE YOUR LEGACY NOW
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
          </div>
        </section>

        {/* Trust & Delivery Section (adapted from Syaahi) */}
        <section className="bg-typewriter-paper py-12 lg:py-16 px-4 border-b-8 border-[#F05C33]">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:flex md:flex-row md:flex-wrap justify-center gap-8 gap-y-10 lg:gap-20 text-[#111]">
            <div className="flex flex-col items-center text-center gap-3">
              <BookOpen className="w-8 h-8 lg:w-10 lg:h-10 text-[#F05C33]" />
              <span className="font-oswald font-bold tracking-widest text-sm lg:text-base uppercase">220+ Pages</span>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <Star className="w-8 h-8 lg:w-10 lg:h-10 text-[#F05C33]" />
              <span className="font-oswald font-bold tracking-widest text-sm lg:text-base uppercase">Rich Matte Finish</span>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <BookType className="w-8 h-8 lg:w-10 lg:h-10 text-[#F05C33]" />
              <span className="font-oswald font-bold tracking-widest text-sm lg:text-base uppercase">High Quality Paper</span>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <ShieldCheck className="w-8 h-8 lg:w-10 lg:h-10 text-[#F05C33]" />
              <span className="font-oswald font-bold tracking-widest text-sm lg:text-base uppercase">100% Secure Checkout</span>
            </div>
          </div>
        </section>

        {/* Back Cover / About Section */}
        <section className="bg-[#111] text-[#F5EEDB] py-16 lg:py-24 px-6 relative">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-oswald font-bold uppercase tracking-wider mb-12 text-center text-[#F05C33]">
              About The Book
            </h2>
            
            <div className="relative w-full flex justify-center mb-16 px-4">
                <div className="relative w-full max-w-xl mx-auto drop-shadow-[0_20px_50px_rgba(240,92,51,0.2)] hover:-translate-y-2 transition-transform duration-500">
                    <img 
                        src="/margins-mockup.png" 
                        alt="The Margins Book Mockup" 
                        className="w-full h-auto object-contain relative z-10"
                    />
                    
                    {/* Floating Cards */}
                    <div className="absolute -top-6 -left-4 sm:-top-8 sm:-left-12 bg-white text-[#111] p-3 sm:p-4 border-2 sm:border-4 border-[#111] shadow-[4px_4px_0_#111] z-20 rotate-[-4deg] max-w-[140px] sm:max-w-[180px]">
                        <span className="block font-oswald font-bold text-sm sm:text-lg leading-tight uppercase tracking-widest text-[#F05C33]">80 GSM</span>
                        <span className="block font-inter text-[10px] sm:text-xs font-semibold leading-tight mt-1 opacity-80">Highest paper quality</span>
                    </div>

                    <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-12 bg-[#111] text-white p-3 sm:p-4 border-2 sm:border-4 border-[#F5EEDB] shadow-[4px_4px_0_#F5EEDB] z-20 rotate-[3deg] max-w-[150px] sm:max-w-[190px]">
                        <span className="block font-oswald font-bold text-sm sm:text-lg leading-tight uppercase tracking-widest text-[#F05C33]">Matte Finish</span>
                        <span className="block font-inter text-[10px] sm:text-xs font-semibold leading-tight mt-1 opacity-80">Rich & Refined texture</span>
                    </div>
                </div>
            </div>
            
            <div className="space-y-8 font-inter text-lg sm:text-xl font-medium leading-relaxed opacity-90 text-center sm:text-left">
                <p>
                    <strong className="text-white">Poetry Festival - Season 2</strong> marked the second edition of Inkfetish Publications' flagship poetry competition, bringing together hundreds of talented voices from across India.
                </p>
                <p>
                    With more than <strong className="text-[#F05C33]">550 poem submissions</strong>, the selection was both exciting and challenging. After a careful review, we proudly recognized the <strong className="text-white">Top 200 poets as our Hall of Fame Writers for Poetry Festival - Season 2</strong>.
                </p>
                <p>
                    <strong className="text-white text-2xl font-oswald tracking-wide">The Margins</strong> is the official collection of these Top 200 Hall of Fame poets. A book filled with powerful voices, unforgettable emotions, and stories that deserve to be remembered. Every page celebrates writers whose words earned a place among the finest.
                </p>
            </div>
            
                        <div className="mt-12 p-8 border-2 border-dashed border-white/20 bg-white/5 rounded-sm mb-12">
                    <h3 className="font-oswald font-bold text-2xl uppercase tracking-widest text-[#F05C33] mb-2">The Margins</h3>
                    <p className="font-mono text-sm tracking-widest uppercase mb-6 opacity-80">The Official Collection of the Top 200 Hall of Fame Poets</p>
                    <blockquote className="font-oswald text-xl sm:text-2xl italic tracking-wide text-white border-l-4 border-[#F05C33] pl-4">
                        "Where Stories Live Between the Lines"
                    </blockquote>
                </div>

                {/* Quality Box */}
                <div className="bg-[#F05C33] text-[#111] p-8 sm:p-12 shadow-2xl relative border-4 border-[#111]">
                    <div className="absolute -top-4 -right-2 bg-white text-[#111] font-mono text-xs sm:text-sm font-bold uppercase tracking-widest px-3 py-1 border-2 border-[#111] shadow-[4px_4px_0_#111] rotate-3">
                        Quality Check
                    </div>
                    
                    <p className="font-inter text-xl sm:text-2xl font-semibold italic leading-relaxed mb-10 text-[#111]">
                        "We’ve treated this book like our own baby. From the best paper quality to the exquisite finish, everything has been carefully chosen."
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 font-oswald text-lg sm:text-xl font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-4">
                            <div className="bg-[#111] p-2 text-white shrink-0"><CheckCircle2 className="w-5 h-5" /></div>
                            <span>Premium-Grade Pages</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-[#111] p-2 text-white shrink-0"><CheckCircle2 className="w-5 h-5" /></div>
                            <span>Rich Matte Finish</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-[#111] p-2 text-white shrink-0"><CheckCircle2 className="w-5 h-5" /></div>
                            <span>Built to keep, not just read</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-[#111] p-2 text-white shrink-0"><BookOpen className="w-5 h-5" /></div>
                            <span className="tracking-wider">ISBN: 978-81-685965-4-2</span>
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex justify-center">
                    <Link 
                      href="/anthology/the-margins/buy"
                      className="group inline-flex items-center justify-center w-full sm:w-auto gap-3 bg-[#F05C33] text-[#111] px-10 py-4 font-oswald tracking-widest font-bold text-lg sm:text-xl shadow-[8px_8px_0_#F05C33] hover:bg-white hover:shadow-[10px_10px_0_white] hover:-translate-y-1 transition-all border-4 border-[#111]"
                    >
                      GET YOUR COLLECTOR'S EDITION
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>

        {/* More Than Just Pages Section */}
        <section className="bg-[#F05C33] py-24 px-6 relative border-y-8 border-[#F5EEDB]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-oswald font-bold uppercase tracking-widest mb-16 text-center text-[#111]">
              More Than Just Pages
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-20">
                <div className="bg-[#111] text-[#F5EEDB] p-8 sm:p-12 border-4 border-[#111] shadow-[12px_12px_0_#F5EEDB] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[16px_16px_0_#F5EEDB] transition-all">
                    <div className="text-5xl mb-6">🏆</div>
                    <h3 className="font-oswald text-2xl lg:text-3xl font-bold uppercase tracking-widest mb-4">For All Top 200 Writers</h3>
                    <p className="font-inter text-lg opacity-90 leading-relaxed">
                        This will be your achievement—something you’ll actually feel incredibly proud to keep on your bookshelf forever.
                    </p>
                </div>
                <div className="bg-[#F5EEDB] text-[#111] p-8 sm:p-12 border-4 border-[#111] shadow-[12px_12px_0_#111] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[16px_16px_0_#111] transition-all">
                    <div className="text-5xl mb-6">✍️</div>
                    <h3 className="font-oswald text-2xl lg:text-3xl font-bold uppercase tracking-widest mb-4">For Everyone Else</h3>
                    <p className="font-inter text-lg opacity-90 leading-relaxed">
                        A masterpiece of literature and design. This is something you’ll absolutely still want to have with you, simply to hold and experience.
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="flex flex-col gap-5 p-8 bg-[#111] text-white border-2 border-white shadow-[6px_6px_0_#F5EEDB]">
                    <div className="w-14 h-14 bg-[#F5EEDB] rounded-full flex items-center justify-center text-[#111] shrink-0"><Star className="w-7 h-7" /></div>
                    <h4 className="font-oswald text-2xl font-bold uppercase tracking-widest text-[#F05C33]">Curated Brilliance</h4>
                    <p className="font-inter opacity-90 leading-relaxed text-[15px]">Selected from thousands, only the top 200 most evocative voices made it. Owning this means holding history.</p>
                </div>
                <div className="flex flex-col gap-5 p-8 bg-[#111] text-white border-2 border-white shadow-[6px_6px_0_#F5EEDB]">
                    <div className="w-14 h-14 bg-[#F5EEDB] rounded-full flex items-center justify-center text-[#111] shrink-0"><BookType className="w-7 h-7" /></div>
                    <h4 className="font-oswald text-2xl font-bold uppercase tracking-widest text-[#F05C33]">Regal Craftsmanship</h4>
                    <p className="font-inter opacity-90 leading-relaxed text-[15px]">Antique-finish pages, deep navy binding, and gold-foil accents. A masterpiece worthy of your finest shelf.</p>
                </div>
                <div className="flex flex-col gap-5 p-8 bg-[#111] text-white border-2 border-white shadow-[6px_6px_0_#F5EEDB]">
                    <div className="w-14 h-14 bg-[#F5EEDB] rounded-full flex items-center justify-center text-[#111] shrink-0"><MessageSquare className="w-7 h-7" /></div>
                    <h4 className="font-oswald text-2xl font-bold uppercase tracking-widest text-[#F05C33]">Elite Brotherhood</h4>
                    <p className="font-inter opacity-90 leading-relaxed text-[15px]">Gain entry to the exclusive Poetry festival Inner Circle. Network, collaborate, and grow with the nation's best minds.</p>
                </div>
            </div>
            
            <div className="mt-20 flex justify-center">
                <Link 
                  href="/anthology/the-margins/buy"
                  className="group inline-flex items-center justify-center w-full sm:w-auto gap-3 bg-[#111] text-[#F5EEDB] px-12 py-5 font-oswald tracking-widest font-bold text-xl sm:text-2xl shadow-[8px_8px_0_#F5EEDB] hover:shadow-[12px_12px_0_#F5EEDB] hover:-translate-y-1 transition-all border-4 border-[#111]"
                >
                  JOIN THE HALL OF FAME
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
          </div>
        </section>

        {/* Pricing & CTA */}
        <section className="py-24 px-6 bg-vibrant-orange relative border-y-4 border-[#111]">
          <div className="max-w-4xl mx-auto bg-[#111] text-[#F5EEDB] p-8 lg:p-16 shadow-2xl relative border-2 border-black">
            
            <div className="text-center mb-12">
              <span className="font-mono font-bold tracking-widest uppercase text-sm border-b border-[#F5EEDB]/30 pb-1 text-[#F05C33]">Order Summary</span>
              <h2 className="text-4xl lg:text-5xl font-oswald font-bold mt-6 mb-4 uppercase">Secure Your Copy</h2>
            </div>

            <div className="space-y-4 mb-8 font-inter text-lg">
              <div className="flex justify-between items-center py-4 border-b border-white/10">
                <span className="font-bold">The Margins (Launch Price)</span>
                <span className="font-bold whitespace-nowrap ml-4">₹499</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-white/10 text-[#F05C33]">
                <span className="font-bold flex items-center gap-2">Early Bird / Community Discount</span>
                <span className="font-bold whitespace-nowrap ml-4">-₹114</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-white/10">
                <span className="opacity-80">Shipping</span>
                <span className="font-mono font-bold uppercase tracking-widest text-sm whitespace-nowrap ml-4">Free</span>
              </div>

              <div className="bg-[#F05C33]/20 border border-[#F05C33] p-5 rounded-sm mt-8 mb-8">
                <div className="flex items-start gap-4">
                  <Star className="w-6 h-6 text-[#F05C33] shrink-0 mt-0.5" />
                  <div className="text-left">
                    <span className="font-oswald font-bold text-white block text-sm lg:text-base tracking-widest uppercase mb-1">FREE BONUS SECURED</span>
                    <span className="text-sm lg:text-base text-white/80 font-mono">₹150 Digital Cash to redeem on the next Inkfetish contest.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F5EEDB] p-8 lg:p-10 text-center text-[#111] mt-8 shadow-inner border border-black/20">
              <div className="flex justify-between items-center mb-8 border-b border-black/20 pb-6">
                 <span className="font-oswald font-bold text-xl lg:text-2xl uppercase tracking-widest">Final Total</span>
                 <span className="text-5xl lg:text-6xl font-oswald font-black text-[#F05C33]">₹385</span>
              </div>
              
              <Link 
                href="/anthology/the-margins/buy"
                className="inline-block w-full max-w-md bg-[#F05C33] text-white py-5 px-8 font-oswald font-bold text-2xl hover:bg-[#111] hover:text-[#F5EEDB] transition-all shadow-xl uppercase tracking-widest border-2 border-[#F05C33] hover:border-black"
              >
                CLAIM OFFER NOW
              </Link>
              
              <div className="mt-6 flex items-center justify-center gap-6 text-xs opacity-70 font-oswald font-bold uppercase tracking-widest">
                <div className="flex items-center gap-2"><Truck className="w-4 h-4" /> Free Shipping</div>
                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Secure Checkout</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#111] text-[#F5EEDB] py-12 px-6 relative overflow-hidden">
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
            <h2 className="text-3xl font-oswald font-bold mb-4 tracking-wider uppercase">INKFETISH PUBLICATIONS</h2>
            <p className="max-w-xl font-mono italic opacity-70 mb-10 text-sm">
              Preserving the voices of today, for the legends of tomorrow.
            </p>
            
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#F5EEDB]/30 to-transparent mb-8"></div>
            
            <div className="flex flex-col md:flex-row justify-between w-full text-xs font-mono tracking-widest opacity-50">
              <div>© 2026 INKFETISH PUBLICATIONS.</div>
              <div className="flex gap-8 mt-4 md:mt-0 justify-center">
                <Link href="/privacy-policy" className="hover:text-[#F05C33] transition-colors">PRIVACY</Link>
                <Link href="/terms-of-service" className="hover:text-[#F05C33] transition-colors">TERMS</Link>
              </div>
            </div>
          </div>
        </footer>

        {/* Sticky Bottom Bar for Landing Page (Mobile Only) */}
        <div className="lg:hidden fixed bottom-0 left-0 w-full bg-[#111] border-t-2 border-[#F05C33] py-3 px-4 z-50 flex items-center justify-between shadow-[0_-15px_40px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col">
            <span className="text-[#F5EEDB] font-oswald font-bold text-sm leading-tight uppercase tracking-wider">Secure The Margins</span>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-1.5 mt-1">
              <span className="text-white/60 font-mono text-[10px] tracking-wide">Discount ends in:</span>
              <div className="flex items-center gap-0.5 text-[11px] font-mono font-bold text-[#F05C33] bg-white/10 px-1.5 py-0.5 rounded-sm tracking-wider w-fit justify-center">
                {isMounted ? (
                  <><span>{timeLeft.days}d</span>:<span>{timeLeft.hours.toString().padStart(2, '0')}h</span>:<span>{timeLeft.minutes.toString().padStart(2, '0')}m</span>:<span>{timeLeft.seconds.toString().padStart(2, '0')}s</span></>
                ) : (
                  <><span>3d</span>:<span>14h</span>:<span>22m</span>:<span>59s</span></>
                )}
              </div>
            </div>
          </div>
          <Link 
            href="/anthology/the-margins/buy"
            className="bg-[#F05C33] text-white px-6 py-2.5 rounded-sm font-oswald font-bold text-sm hover:bg-white hover:text-[#111] transition-all shadow-[0_0_15px_rgba(240,92,51,0.5)] uppercase tracking-widest whitespace-nowrap"
          >
            ORDER NOW
          </Link>
        </div>
      </div>
    </>
  );
}
