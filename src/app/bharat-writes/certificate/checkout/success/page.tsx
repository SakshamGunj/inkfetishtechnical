'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Package, Truck, Sparkles } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

export default function CheckoutSuccessPage() {
  const [windowSize, setWindowSize] = React.useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans relative overflow-x-hidden">
      <Confetti 
        width={windowSize.width} 
        height={windowSize.height} 
        recycle={false} 
        numberOfPieces={400} 
        colors={['#FF9933', '#FFFFFF', '#138808', '#000080']} 
      />
      
      {/* GLOBAL NAVBAR */}
      <nav className="w-full bg-white border-b border-[#E2E8F0] sticky top-0 z-50">
        <div className="h-1 w-full flex">
          <div className="h-full flex-1 bg-[#FF9933]"></div>
          <div className="h-full flex-1 bg-white"></div>
          <div className="h-full flex-1 bg-[#138808]"></div>
        </div>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 h-16 flex items-center justify-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#000080] rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">
              IN
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#1A202C] text-lg leading-tight tracking-tight">Inkfetish</span>
              <span className="text-[10px] font-semibold text-[#FF9933] uppercase tracking-widest leading-none">Publication</span>
            </div>
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative z-10 w-full">
        
        {/* Background decorations */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#138808]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-[#FF9933]/10 rounded-full blur-3xl pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-lg bg-white rounded-3xl shadow-2xl shadow-[#138808]/10 border border-[#E2E8F0] p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#138808]/5 to-transparent pointer-events-none"></div>
          
          <div className="w-24 h-24 bg-[#138808]/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-[#138808]/20 rounded-full animate-ping opacity-50"></div>
            <CheckCircle2 className="w-12 h-12 text-[#138808] relative z-10" />
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-[#1A202C] mb-4">
            Payment Successful!
          </h1>
          <p className="text-[#4A5568] text-lg mb-8">
            Thank you for ordering the Bharat Pride Kit. We've received your details and are preparing your package.
          </p>

          <div className="bg-[#F7FAFC] border border-[#E2E8F0] rounded-2xl p-6 mb-8 text-left space-y-4">
            <h3 className="font-bold text-[#1A202C] text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
              <Package className="w-4 h-4 text-[#000080]" /> What happens next?
            </h3>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#FF9933]/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[#FF9933] font-bold text-xs">1</span>
              </div>
              <p className="text-sm text-[#4A5568]"><strong className="text-[#1A202C]">Printing & Packing:</strong> Your personalized certificate is being printed and packed securely with your medal.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#000080]/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[#000080] font-bold text-xs">2</span>
              </div>
              <p className="text-sm text-[#4A5568]"><strong className="text-[#1A202C]">Dispatch:</strong> We will dispatch your kit within 48-72 hours via premium courier.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#138808]/20 flex items-center justify-center shrink-0 mt-0.5">
                <Truck className="w-3 h-3 text-[#138808]" />
              </div>
              <p className="text-sm text-[#4A5568]"><strong className="text-[#1A202C]">Delivery:</strong> Expect delivery to your doorstep within 7-10 working days.</p>
            </div>
          </div>

          <div className="bg-[#FF9933]/10 border border-[#FF9933]/20 rounded-xl p-4 mb-8">
            <p className="text-sm font-bold text-[#D67118] flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" /> BONUS UNLOCKED
            </p>
            <p className="text-xs text-[#4A5568] mt-1">You will receive an email shortly with your free entry pass to our next poetry contest!</p>
          </div>

          <Link
            href="/"
            className="w-full inline-block bg-[#000080] text-white py-4 px-6 rounded-xl font-bold uppercase tracking-widest hover:bg-[#1A202C] transition-colors shadow-lg shadow-[#000080]/20"
          >
            Return to Homepage
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
