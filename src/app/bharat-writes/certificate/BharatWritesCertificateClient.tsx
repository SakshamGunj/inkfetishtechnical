'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, CheckCircle2, AlertCircle, FileText, Download, Gift, Award, Mail, Sparkles, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamic import for confetti to avoid SSR issues
const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

export default function BharatWritesCertificateClient() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'idle' | 'searching' | 'celebrating' | 'found' | 'not-found'>('idle');
  const [userData, setUserData] = useState<any>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === 'celebrating') {
      // 3.5 seconds celebration before showing the final options
      timer = setTimeout(() => {
        setStatus('found');
      }, 3500);
    }
    return () => clearTimeout(timer);
  }, [status]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = query.trim();
    if (!cleanQuery) return;

    setStatus('searching');

    try {
      const res = await fetch('/api/bharat-writes/certificate/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: cleanQuery }),
      });

      const data = await res.json();

      if (res.ok) {
        setUserData(data);
        setStatus('celebrating');
      } else {
        setStatus('not-found');
      }
    } catch (error) {
      console.error('Search error', error);
      setStatus('not-found');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans relative overflow-x-hidden">
      
      {/* GLOBAL NAVBAR */}
      <nav className="w-full bg-white border-b border-[#E2E8F0] sticky top-0 z-50">
        <div className="h-1 w-full flex">
          <div className="h-full flex-1 bg-[#FF9933]"></div>
          <div className="h-full flex-1 bg-white"></div>
          <div className="h-full flex-1 bg-[#138808]"></div>
        </div>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#000080] rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:bg-[#1A202C] transition-colors">
              IN
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#1A202C] text-lg leading-tight tracking-tight">Inkfetish</span>
              <span className="text-[10px] font-semibold text-[#FF9933] uppercase tracking-widest leading-none">Publication</span>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#F7FAFC] border border-[#E2E8F0] rounded-full text-xs font-bold text-[#4A5568]">
              <span className="w-2 h-2 rounded-full bg-[#138808] animate-pulse"></span>
              CERTIFICATE PORTAL
            </div>
          </div>
        </div>
      </nav>

      {/* MARQUEE */}
      <div className="w-full bg-[#1A202C] text-white py-2 overflow-hidden border-y border-[#2D3748]">
        <div className="flex whitespace-nowrap animate-marquee items-center text-[11px] md:text-xs font-bold tracking-widest uppercase">
          <span className="mx-4 text-[#FF9933]">BHARAT WRITES</span> • 
          <span className="mx-4 text-[#FFFFFF]">NATIONAL INDEPENDENCE POETRY CONTEST</span> • 
          <span className="mx-4 text-[#138808]">CERTIFICATE REDEMPTION</span> • 
          <span className="mx-4 text-[#FF9933]">BHARAT WRITES</span> • 
          <span className="mx-4 text-[#FFFFFF]">NATIONAL INDEPENDENCE POETRY CONTEST</span> • 
          <span className="mx-4 text-[#138808]">CERTIFICATE REDEMPTION</span> • 
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative z-10 w-full">
        
        {/* Background decorations */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#FF9933]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-[#138808]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className={`w-full ${status === 'found' ? 'max-w-4xl' : 'max-w-xl'} mx-auto transition-all duration-500`}>
          
          {(status === 'idle' || status === 'searching' || status === 'not-found') && (
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-5xl font-display font-bold text-[#1A202C] mb-4 tracking-tight">
                Claim Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808]">Pride</span>
              </h1>
              <p className="text-[#4A5568] text-sm md:text-base">
                Enter your registered 10-digit WhatsApp number to locate your Bharat Pride Certificate.
              </p>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-xl shadow-black/5 border border-[#E2E8F0] overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808]"></div>
            
            <div className="p-8">
              <AnimatePresence mode="wait">
                
                {/* SEARCH STATE */}
                {(status === 'idle' || status === 'searching') && (
                  <motion.div
                    key="search"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col gap-6"
                  >
                    <form onSubmit={handleSearch} className="flex flex-col gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#4A5568] uppercase tracking-wider mb-2">
                          Registered Phone Number (10 Digits)
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-[#A0AEC0]" />
                          </div>
                          <input
                            type="text"
                            value={query}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '');
                              if (val.length <= 10) setQuery(val);
                            }}
                            placeholder="e.g. 9876543210"
                            pattern="\d{10}"
                            title="Please enter exactly 10 digits"
                            maxLength={10}
                            disabled={status === 'searching'}
                            className="w-full pl-11 pr-4 py-4 bg-[#F7FAFC] border border-[#E2E8F0] rounded-xl text-[#1A202C] font-semibold focus:outline-none focus:border-[#000080] focus:ring-1 focus:ring-[#000080] transition-all disabled:opacity-50"
                            required
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={status === 'searching' || query.length !== 10}
                        className="w-full bg-[#000080] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#1A202C] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#000080]/20"
                      >
                        {status === 'searching' ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                          <>Locate Certificate <ArrowRight className="w-4 h-4" /></>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* NOT FOUND STATE */}
                {status === 'not-found' && (
                  <motion.div
                    key="not-found"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center text-center py-6"
                  >
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                      <AlertCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1A202C] mb-2">Record Not Found</h3>
                    <p className="text-[#4A5568] text-sm mb-6 max-w-md">
                      We couldn't find a registration matching "{query}". Please ensure you entered the exact 10-digit WhatsApp number used during registration.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                      <button
                        onClick={() => {
                          setStatus('idle');
                          setQuery('');
                        }}
                        className="flex-1 px-6 py-3 bg-[#F7FAFC] border border-[#E2E8F0] text-[#4A5568] rounded-lg font-bold hover:bg-[#E2E8F0] transition-colors"
                      >
                        Try Again
                      </button>
                      <a
                        href="https://forms.gle/erpAfxQYF2mhVHdr7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-6 py-3 bg-[#FF9933] text-white rounded-lg font-bold hover:bg-[#E68A2E] transition-colors shadow-lg shadow-[#FF9933]/20 flex items-center justify-center gap-2"
                      >
                        Can't find it? <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </motion.div>
                )}

                {/* CELEBRATION STATE (3 SECONDS) */}
                {status === 'celebrating' && userData && (
                  <motion.div
                    key="celebrating"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, filter: 'blur(10px)' }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center text-center py-8 relative"
                  >
                    <Confetti 
                      width={windowSize.width} 
                      height={windowSize.height} 
                      recycle={false} 
                      numberOfPieces={300} 
                      colors={['#FF9933', '#FFFFFF', '#138808', '#000080']} 
                      style={{ position: 'fixed', top: 0, left: 0, zIndex: 100, pointerEvents: 'none' }}
                    />
                    
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h2 className="text-3xl md:text-4xl font-bold text-[#1A202C] mb-2">
                        Congratulations, <span className="text-[#FF9933]">{userData.name}!</span>
                      </h2>
                      <p className="text-lg text-[#4A5568] font-medium mb-8">
                        Your Bharat Pride Certificate is finally here! 🇮🇳
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0.8, opacity: 0, rotateY: -30 }}
                      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                      transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
                      className="relative w-full max-w-sm mx-auto"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#FF9933] via-yellow-400 to-[#138808] blur-2xl opacity-40 animate-pulse rounded-full"></div>
                      <Image 
                        src="/images/bharat-pride-mockup.jpg" 
                        alt="Bharat Pride Certificate Mockup" 
                        width={400} 
                        height={400} 
                        className="relative z-10 rounded-2xl shadow-2xl border-4 border-white"
                      />
                      
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-[#000080] text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg border border-white/20 whitespace-nowrap flex items-center gap-2 z-20">
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                        A Moment of Pride
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {/* FOUND / SUCCESS & UPSELL STATE */}
                {status === 'found' && userData && (
                  <motion.div
                    key="found"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col"
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-[#1A202C] mb-2">Welcome back, {userData.name}</h3>
                      <p className="text-[#4A5568]">Your registration has been verified. Choose your reward format below.</p>
                    </div>

                    <div className="flex flex-col-reverse md:flex-row gap-6 items-stretch">
                      
                      {/* OPTION 1: DIGITAL ONLY */}
                      <div className="flex-1 flex flex-col bg-[#F7FAFC] border border-[#E2E8F0] rounded-2xl p-6 relative overflow-hidden transition-transform hover:-translate-y-1">
                        <div className="mb-4">
                          <h4 className="font-bold text-[#4A5568] uppercase tracking-wider text-xs mb-1">Standard</h4>
                          <h3 className="text-2xl font-black text-[#1A202C]">Digital E-Certificate</h3>
                        </div>
                        
                        <div className="flex-1">
                          <ul className="space-y-4 mb-8">
                            <li className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-[#A0AEC0] shrink-0" />
                              <span className="text-[#4A5568] text-sm font-medium">Digital Bharat Pride Certificate (PDF format)</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-[#A0AEC0] shrink-0" />
                              <span className="text-[#4A5568] text-sm font-medium">Instant Download</span>
                            </li>
                            <li className="flex items-start gap-3 opacity-50">
                              <AlertCircle className="w-5 h-5 text-[#A0AEC0] shrink-0" />
                              <span className="text-[#A0AEC0] text-sm font-medium line-through">Physical Premium Medal</span>
                            </li>
                            <li className="flex items-start gap-3 opacity-50">
                              <AlertCircle className="w-5 h-5 text-[#A0AEC0] shrink-0" />
                              <span className="text-[#A0AEC0] text-sm font-medium line-through">Free Entry to Next Contest (Worth ₹299)</span>
                            </li>
                          </ul>
                        </div>

                        <div className="mt-auto">
                          {userData.link ? (
                            <a
                              href={userData.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full bg-white border-2 border-[#E2E8F0] text-[#4A5568] py-4 px-2 rounded-xl font-bold uppercase tracking-wider text-xs md:text-sm flex items-center justify-center gap-2 hover:bg-[#EDF2F7] hover:border-[#CBD5E0] transition-colors text-center"
                            >
                              <Download className="w-4 h-4 shrink-0" /> <span className="truncate">Download PDF Only</span>
                            </a>
                          ) : (
                            <button
                              disabled
                              className="w-full bg-[#E2E8F0] text-[#A0AEC0] py-4 px-2 rounded-xl font-bold uppercase tracking-wider text-xs md:text-sm flex items-center justify-center gap-2 cursor-not-allowed text-center"
                            >
                              <Download className="w-4 h-4 shrink-0" /> Available Soon
                            </button>
                          )}
                        </div>
                      </div>

                      {/* OPTION 2: PHYSICAL UPSELL OR PURCHASED STATE */}
                      {userData.hasPurchasedKit ? (
                        <div className="flex-[1.2] flex flex-col justify-center bg-gradient-to-br from-[#F0FFF4] to-white border-2 border-[#138808] rounded-2xl p-6 relative overflow-hidden shadow-xl shadow-[#138808]/10 text-center">
                          <div className="w-16 h-16 bg-[#138808]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-8 h-8 text-[#138808]" />
                          </div>
                          <h3 className="text-xl md:text-2xl font-black text-[#1A202C] leading-tight mb-2">You have purchased the package!</h3>
                          <p className="text-[#4A5568] text-sm mb-6">
                            We will share the tracking ID once your Physical Bharat Pride Certificate and Premium Medal are dispatched.
                          </p>
                          <div className="inline-block bg-[#138808]/10 text-[#138808] font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-full border border-[#138808]/20">
                            Thank You 🇮🇳
                          </div>
                        </div>
                      ) : (
                        <div className="flex-[1.2] flex flex-col bg-gradient-to-br from-[#FFF5EB] to-white border-2 border-[#FF9933] rounded-2xl p-6 relative overflow-hidden shadow-xl shadow-[#FF9933]/10 transform md:scale-105 z-10">
                          
                          <div className="absolute top-0 right-0 bg-[#FF9933] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-lg shadow-sm">
                            Highly Recommended
                          </div>

                          <div className="mb-4 pt-2">
                            <h4 className="font-bold text-[#FF9933] uppercase tracking-wider text-xs mb-1 flex items-center gap-1">
                              <Sparkles className="w-3 h-3" /> Premium Honor Kit
                            </h4>
                            <h3 className="text-xl md:text-2xl font-black text-[#1A202C] leading-tight">Physical Bharat Pride Certificate + Premium Medal</h3>
                            <div className="flex items-baseline gap-2 mt-2">
                              <span className="text-3xl font-bold text-[#1A202C]">₹249</span>
                              <span className="text-[#4A5568] text-sm line-through">₹799</span>
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <ul className="space-y-4 mb-8">
                              <li className="flex items-start gap-3">
                                <FileText className="w-5 h-5 text-[#138808] shrink-0" />
                                <span className="text-[#2D3748] text-sm font-bold">Hard copy Physical Bharat Pride Certificate</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <Award className="w-5 h-5 text-[#FF9933] shrink-0" />
                                <span className="text-[#2D3748] text-sm font-bold">Bharat Pride Medal</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-[#000080] shrink-0" />
                                <span className="text-[#2D3748] text-sm font-bold">High quality, packed in an envelope</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-[#138808] shrink-0" />
                                <span className="text-[#2D3748] text-sm font-bold">Free Shipping</span>
                              </li>
                              <li className="flex items-start gap-3 bg-[#138808]/10 p-2 rounded-lg border border-[#138808]/20">
                                <Gift className="w-5 h-5 text-[#138808] shrink-0" />
                                <span className="text-[#138808] text-sm font-bold">BONUS: Free Entry to Our Next Poetry Contest (Worth ₹299)</span>
                              </li>
                            </ul>
                          </div>

                          <div className="mt-auto">
                            <Link
                              href="/bharat-writes/certificate/checkout"
                              className="w-full relative overflow-hidden group bg-[#FF9933] text-white py-4 px-2 rounded-xl font-bold uppercase tracking-wider text-xs md:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#FF9933]/30 text-center hover:scale-[1.02]"
                            >
                              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer"></div>
                              <span className="truncate">GET BHARAT PRIDE KIT</span> <ChevronRight className="w-4 h-4 shrink-0" />
                            </Link>
                            <p className="text-center text-[10px] text-[#718096] mt-3 font-medium uppercase tracking-wider px-2">
                              100% Free Shipping Anywhere in India
                            </p>
                          </div>
                        </div>
                      )}

                    </div>
                    
                    <div className="text-center mt-8">
                      <button
                        onClick={() => setStatus('idle')}
                        className="text-xs font-bold text-[#718096] hover:text-[#1A202C] uppercase tracking-wider transition-colors border-b border-transparent hover:border-[#1A202C] pb-1"
                      >
                        Search for a different number
                      </button>
                    </div>

                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
