'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Star, ShieldCheck, Truck, ArrowRight, BookType, MessageSquare } from 'lucide-react';

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
        
        {/* Navigation */}
        <nav className="w-full py-4 px-6 lg:px-12 flex justify-between items-center relative z-50">
          <div className="flex items-center gap-3">
            <div className="bg-white px-4 py-2 rounded shadow-sm border-2 border-white/20 text-[#F05C33] font-oswald tracking-wide font-bold flex flex-col leading-tight">
               <span>Inkfetish</span>
               <span className="text-xs">Publications</span>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-4 pb-12 lg:pb-0 px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-center min-h-[90vh] lg:h-[calc(100vh-90px)] lg:min-h-0 gap-8 lg:gap-10 max-w-7xl mx-auto overflow-hidden">
          
          {/* Left Column: Typewriter Paper Concept */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-5/12 z-10 max-w-md mx-auto lg:mx-0 flex flex-col justify-center h-full"
          >
            <div className="bg-typewriter-paper p-6 sm:p-8 lg:p-8 xl:p-10 shadow-2xl relative border-l-4 border-black/10 transform rotate-[-1deg] flex-shrink-0">
                <div className="typewriter-dots mb-3 sm:mb-4">
                    <span className="dot-red"></span>
                    <span className="dot-green"></span>
                    <span className="dot-yellow"></span>
                </div>
                
                <p className="font-mono text-[11px] sm:text-xs font-bold mb-3 tracking-tight">inkfetish.in</p>
                
                <div className="typewriter-dash my-3 sm:my-4"></div>
                
                <div className="bg-[#F05C33] text-white px-2 py-0.5 sm:px-3 sm:py-1 font-mono text-[10px] sm:text-xs font-bold inline-block mb-3 sm:mb-4 uppercase tracking-wider">
                    Presenting
                </div>
                
                <h3 className="font-mono font-bold text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed tracking-tight">
                    MEET THE <br/>
                    <span className="text-[#F05C33]">TOP 200 POETS OF</span>
                </h3>
                
                <div className="typewriter-dash my-3 sm:my-4"></div>
                
                <p className="font-mono font-bold text-xs sm:text-sm tracking-tight mb-2">Poetry Festival - Season 2</p>
                <div className="typewriter-dash my-3 sm:my-4"></div>
                
                <p className="font-mono text-[11px] sm:text-xs font-bold leading-relaxed mb-3 sm:mb-4 mt-3 sm:mt-4">
                    Two hundred voices.<br/>
                    One stage.<br/>
                    Countless stories.
                </p>
                
                <div className="typewriter-dash my-3 sm:my-4"></div>
                
                <p className="font-mono font-bold text-[11px] sm:text-xs tracking-tight">A celebration of words.</p>
                <div className="typewriter-dash my-3 sm:my-4"></div>
                
                {/* Embedded paper slip */}
                <div className="bg-[#F6F2EB] shadow-lg p-3 sm:p-4 transform rotate-2 font-mono font-bold text-xs sm:text-sm text-center leading-snug border border-black/5 mt-2">
                    Presenting<br/>
                    the top 200 poets<br/>
                    from poetry<br/>
                    festival season 2
                </div>
            </div>
            
            {/* The CTA Button for Hero */}
            <div className="mt-6 transform translate-x-0 sm:translate-x-2">
                <Link 
                  href="/anthology/the-margins/buy"
                  className="group w-full relative bg-[#111] text-white px-6 py-3.5 sm:py-4 font-oswald tracking-widest font-bold text-sm sm:text-base flex items-center justify-center gap-3 overflow-hidden shadow-2xl hover:bg-white hover:text-[#111] transition-all border-2 border-[#111]"
                >
                  RESERVE YOUR COPY
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
          </motion.div>

          {/* Right Column: Title text */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-7/12 flex flex-col justify-center items-center lg:items-start h-full pb-8 lg:pb-0"
          >
            <h1 className="font-oswald font-bold text-[25vw] sm:text-[9rem] lg:text-[8rem] xl:text-[10rem] 2xl:text-[11rem] leading-[0.85] text-[#111] tracking-tighter drop-shadow-md text-center lg:text-left mb-4 sm:mb-6 uppercase flex flex-col">
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
            
            <h2 className="font-mono text-base sm:text-lg lg:text-xl xl:text-2xl font-bold uppercase tracking-tight text-center lg:text-left mt-4 border-l-4 border-[#111] pl-3 sm:pl-4">
                Where Stories Live<br/>
                Between The Lines
            </h2>
          </motion.div>
        </section>

        {/* Back Cover / About Section */}
        <section className="bg-[#111] text-[#F5EEDB] py-24 px-6 relative border-t-8 border-[#F5EEDB]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-oswald font-bold uppercase tracking-wider mb-10 text-center text-[#F05C33]">
              About The Book
            </h2>
            
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
            
            <div className="mt-16 text-center border-t-2 border-[#F05C33]/50 pt-10">
                <h3 className="font-oswald text-4xl mb-2 tracking-wide text-white">The Margins</h3>
                <p className="font-inter font-bold opacity-80 mb-1">The Official Collection of the Top 200 Hall of Fame Poets</p>
                <p className="font-mono text-[#F05C33] font-bold">"Where Stories Live Between the Lines"</p>
            </div>
          </div>
        </section>

        {/* Trust & Delivery Section (adapted from Syaahi) */}
        <section className="bg-typewriter-paper py-16 px-4 border-y-8 border-[#111]">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:flex md:flex-row md:flex-wrap justify-center gap-8 gap-y-10 lg:gap-20 text-[#111]">
            <div className="flex flex-col items-center text-center gap-3">
              <BookOpen className="w-8 h-8 lg:w-10 lg:h-10 text-[#F05C33]" />
              <span className="font-oswald font-bold tracking-widest text-sm lg:text-base uppercase">Premium Print</span>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <Star className="w-8 h-8 lg:w-10 lg:h-10 text-[#F05C33]" />
              <span className="font-oswald font-bold tracking-widest text-sm lg:text-base uppercase">Collector's Edition</span>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <ShieldCheck className="w-8 h-8 lg:w-10 lg:h-10 text-[#F05C33]" />
              <span className="font-oswald font-bold tracking-widest text-sm lg:text-base uppercase">Secure Checkout</span>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <Truck className="w-8 h-8 lg:w-10 lg:h-10 text-[#F05C33]" />
              <span className="font-oswald font-bold tracking-widest text-sm lg:text-base uppercase">Nationwide Delivery</span>
            </div>
          </div>
        </section>

        {/* Publish With Us Section */}
        <section className="bg-[#F5EEDB] text-[#111] py-20 px-6 font-inter">
            <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 shadow-xl border-l-8 border-[#F05C33]">
                <div className="flex items-center gap-4 mb-6">
                    <BookType className="w-10 h-10 text-[#111]" />
                    <h2 className="font-oswald font-bold text-3xl sm:text-4xl uppercase tracking-tight leading-none">
                        Publish Your Own Book<br/>
                        <span className="text-xl sm:text-2xl text-gray-500 tracking-wide">With Inkfetish Publications</span>
                    </h2>
                </div>
                
                <p className="font-semibold text-lg sm:text-xl mb-6 opacity-90 leading-relaxed">
                    If you've enjoyed the quality of this anthology from the cover design to the printing and overall presentation—imagine your own book in readers' hands.
                </p>
                <p className="text-base sm:text-lg mb-8 opacity-80 leading-relaxed">
                    Whether it's a poetry collection, a novel, or a personal memoir, we'll help you publish it professionally.
                </p>
                
                <div className="bg-[#25D366]/10 border-2 border-[#25D366] p-6 rounded-lg text-center flex flex-col items-center justify-center">
                    <div className="flex items-center gap-3 text-[#25D366] mb-4">
                        <MessageSquare className="w-8 h-8 fill-current" />
                        <span className="font-oswald font-bold text-2xl tracking-wide uppercase">WhatsApp Us</span>
                    </div>
                    <a href="https://wa.me/917850963709" target="_blank" rel="noopener noreferrer" className="text-3xl sm:text-4xl font-oswald font-bold text-[#111] hover:text-[#F05C33] transition-colors mb-4">
                        +91 78509 63709
                    </a>
                    <p className="font-mono font-bold text-sm sm:text-base text-gray-700">
                        Your story deserves to be published.<br/>
                        Let us help you bring it to life.
                    </p>
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
                <span className="font-bold flex items-center gap-2">Special Discount</span>
                <span className="font-bold whitespace-nowrap ml-4">-₹100</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-white/10">
                <span className="opacity-80">Shipping</span>
                <span className="font-mono font-bold uppercase tracking-widest text-sm whitespace-nowrap ml-4">Free</span>
              </div>
            </div>

            <div className="bg-[#F5EEDB] p-8 lg:p-10 text-center text-[#111] mt-8 shadow-inner border border-black/20">
              <div className="flex justify-between items-center mb-8 border-b border-black/20 pb-6">
                 <span className="font-oswald font-bold text-xl lg:text-2xl uppercase tracking-widest">Final Total</span>
                 <span className="text-5xl lg:text-6xl font-oswald font-black text-[#F05C33]">₹399</span>
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
