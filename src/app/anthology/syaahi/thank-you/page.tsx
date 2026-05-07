'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Package, Mail, Truck, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ThankYouPage() {
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setOrderId(params.get('order_id'));
    
    // Celebratory confetti (Gold & Navy)
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#0a1b3f', '#b8860b', '#f2e6d3']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#0a1b3f', '#b8860b', '#f2e6d3']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700&display=swap');
        .font-cinzel { font-family: 'Montserrat', sans-serif; }
        .font-playfair { font-family: 'Outfit', sans-serif; }
        .bg-parchment {
          background-color: #f2e6d3;
          background-image: radial-gradient(circle at 50% 50%, transparent 20%, rgba(200, 180, 150, 0.1) 80%), linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4));
        }
        .bg-navy { background-color: #0a1b3f; }
        .text-navy { color: #0a1b3f; }
      `}} />

      <div className="min-h-screen bg-parchment flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#b8860b] rounded-full mix-blend-multiply filter blur-[100px] opacity-10"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-navy rounded-full mix-blend-multiply filter blur-[100px] opacity-10"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full bg-white/95 backdrop-blur-md rounded-sm p-8 lg:p-14 shadow-2xl border border-[#b8860b]/30 text-center relative z-10"
        >
          {/* Corner Ornaments */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#b8860b]/40 hidden sm:block"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#b8860b]/40 hidden sm:block"></div>

          <div className="relative z-10">
            <div className="w-20 h-20 bg-green-500/10 border-2 border-green-500 rounded-full flex items-center justify-center text-green-600 mx-auto mb-8 shadow-xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-black text-navy mb-4 uppercase tracking-wider">Order Confirmed</h1>
            <p className="text-base sm:text-lg lg:text-xl text-navy/70 mb-10 font-playfair leading-relaxed">
              Your Collector's Edition of <span className="text-navy font-bold">Syaahi Vol. 1</span> has been successfully secured. Welcome to the legacy.
            </p>

            <div className="bg-navy p-6 sm:p-8 rounded-sm mb-10 text-left border border-[#b8860b]/50 shadow-inner">
              <h3 className="text-xs font-cinzel font-bold uppercase tracking-widest text-[#f2e6d3]/60 mb-6 flex items-center gap-2 border-b border-[#b8860b]/30 pb-3">
                <Package className="w-4 h-4 text-[#b8860b]" /> Order Details
              </h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[#f2e6d3] font-playfair text-base sm:text-lg">Syaahi Vol. 1 (Collector's Edition)</span>
                <span className="text-[#b8860b] font-cinzel font-bold text-xl">₹385</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-6 border-t border-[#f2e6d3]/10 pt-4">
                <span className="text-[#f2e6d3]/60 font-cinzel tracking-widest">ORDER ID</span>
                <code className="text-[#b8860b] font-cinzel font-bold tracking-wider">{orderId || 'SYAAHI_EXPRESS'}</code>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <div className="p-5 sm:p-6 rounded-sm bg-[#f2e6d3]/30 border border-[#b8860b]/20 text-left">
                <Mail className="w-6 h-6 text-[#b8860b] mb-3" />
                <div className="font-cinzel font-bold text-navy text-xs sm:text-sm uppercase tracking-widest mb-1">Check Your Email</div>
                <p className="text-[10px] sm:text-xs font-playfair text-navy/70">We've sent a confirmation and receipt.</p>
              </div>
              <div className="p-5 sm:p-6 rounded-sm bg-[#f2e6d3]/30 border border-[#b8860b]/20 text-left">
                <Truck className="w-6 h-6 text-[#b8860b] mb-3" />
                <div className="font-cinzel font-bold text-navy text-xs sm:text-sm uppercase tracking-widest mb-1">Fast Shipping</div>
                <p className="text-[10px] sm:text-xs font-playfair text-navy/70">Expected delivery in 7-10 business days.</p>
              </div>
            </div>

            <div className="flex flex-col gap-6 items-center justify-center">
              <Link 
                href="/"
                className="px-8 sm:px-10 py-4 w-full sm:w-auto bg-navy text-[#f2e6d3] font-cinzel font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#b8860b] hover:text-navy transition-all shadow-xl rounded-sm border-2 border-transparent hover:border-[#b8860b]"
              >
                Return to Platform
                <ArrowRight className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-2 text-navy/60 font-playfair text-xs sm:text-sm italic">
                Crafted with <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-[#b8860b] fill-[#b8860b]/20" /> by Inkfetish Publication
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
