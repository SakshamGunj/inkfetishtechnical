'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Shield, CheckCircle2, Download, AlertTriangle, Loader2, ArrowLeft, Lock, FileText, Star, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SearchResult {
  id: string;
  name: string;
  phoneHint: string;
}

export default function AppreciationLetterPage() {
  // Step Management
  const [step, setStep] = useState<'search' | 'verify' | 'success' | 'loading-promo' | 'promo'>('search');

  // Search State
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Selected User State
  const [selectedUser, setSelectedUser] = useState<SearchResult | null>(null);
  
  // Verification State
  const [last3, setLast3] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  // Handle Loading Promo Transition
  useEffect(() => {
    if (step === 'loading-promo') {
      const timer = setTimeout(() => {
        setStep('promo');
      }, 2500); // 2.5 seconds suspense
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleDownloadClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setStep('loading-promo');
    
    if (selectedUser) {
      try {
        const url = `https://fmnnomndxnybjsbykpbr.supabase.co/storage/v1/object/public/PF%20AL%202/${selectedUser.id}.pdf`;
        
        // Fetch as blob to force a true background download without navigating the window
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = downloadUrl;
        a.download = `Appreciation_Letter_${selectedUser.name.replace(/\s+/g, '_')}.pdf`;
        document.body.appendChild(a);
        a.click();
        
        // Cleanup
        document.body.removeChild(a);
        window.URL.revokeObjectURL(downloadUrl);
        
      } catch (err) {
        console.error('Blob download failed, falling back to new tab', err);
        window.open(`https://fmnnomndxnybjsbykpbr.supabase.co/storage/v1/object/public/PF%20AL%202/${selectedUser.id}.pdf`, '_blank');
      }
    }
  };

  // Refs
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced Search
  useEffect(() => {
    if (query.length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/appreciation-letter/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        if (data.results) {
          setSearchResults(data.results);
          setShowDropdown(true);
        }
      } catch (err) {
        console.error('Search failed', err);
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelectUser = (user: SearchResult) => {
    setSelectedUser(user);
    setQuery('');
    setShowDropdown(false);
    setStep('verify');
    setLast3('');
    setError('');
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || last3.length !== 3) return;

    setIsVerifying(true);
    setError('');

    try {
      const res = await fetch('/api/appreciation-letter/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedUser.id, last3 })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setStep('success');
        triggerConfetti();
      } else {
        setError(data.error || 'Verification failed. Please check the digits and try again.');
        setLast3('');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ebd298', '#d4af37', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ebd298', '#d4af37', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div className="min-h-[100dvh] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e1035] via-[#080310] to-[#000000] text-[#fdfbf7] font-sans selection:bg-gold selection:text-black flex flex-col">
      
      <div className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 pt-12 md:pt-20 pb-12 md:pb-20 flex flex-col justify-center">
        
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gold/10 text-gold mb-4 border border-gold/20 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
            <FileText className="w-5 h-5 md:w-7 md:h-7" />
          </div>
          <h1 className="text-2xl md:text-4xl font-serif font-black uppercase tracking-tight text-[#fdfbf7] mb-2 md:mb-3">
            Poetry Festival <span className="italic font-light text-gold">Season 2</span>
          </h1>
          <p className="text-gold text-xs md:text-sm tracking-[0.2em] font-bold uppercase mb-4">
            Appreciation Letter Retrieval
          </p>
          <p className="text-[#a090b0] text-sm max-w-md mx-auto leading-relaxed px-2">
            Verify your identity to instantly claim and download your official Season 2 Appreciation Letter.
          </p>
        </div>

        {/* Removed overflow-hidden to allow dropdown to break out of bounds */}
        <div className="relative bg-[#0d0714]/80 backdrop-blur-md border border-gold/10 p-5 md:p-8 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
          {/* Subtle gradient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>

          <AnimatePresence mode="wait">
            
            {/* STEP 1: SEARCH */}
            {step === 'search' && (
              <motion.div
                key="step-search"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <h2 className="text-lg md:text-xl font-serif text-white mb-2 font-bold tracking-wide">Find Your Name</h2>
                  <p className="text-xs md:text-sm text-[#666]">Start typing your name exactly as registered in the festival to locate your record.</p>
                </div>

                <div className="relative" ref={searchContainerRef}>
                  <div className="relative flex items-center">
                    <Search className="absolute left-4 w-5 h-5 text-[#555]" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onFocus={() => { if (searchResults.length > 0) setShowDropdown(true); }}
                      placeholder="e.g., John Doe"
                      // text-base is CRITICAL here to prevent iOS Safari from zooming in on focus
                      className="w-full bg-[#121212] border border-white/10 rounded-lg py-4 pl-12 pr-12 text-base text-white focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all font-medium placeholder:text-[#444]"
                    />
                    {isSearching && (
                      <Loader2 className="absolute right-4 w-5 h-5 text-gold animate-spin" />
                    )}
                  </div>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {showDropdown && searchResults.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute w-full mt-2 bg-[#0c0c0c] border border-white/10 rounded-lg shadow-2xl z-50 max-h-[50vh] overflow-y-auto overscroll-contain"
                      >
                        {searchResults.map((user) => (
                          <button
                            key={user.id}
                            onClick={() => handleSelectUser(user)}
                            className="w-full text-left px-4 py-4 md:py-3 border-b border-white/5 hover:bg-gold/10 focus:bg-gold/10 transition-colors flex items-center justify-between group outline-none active:bg-gold/20"
                          >
                            <span className="font-medium text-base md:text-sm text-[#e0e0e0] group-hover:text-gold transition-colors">
                              {user.name}
                            </span>
                            <span className="text-xs md:text-sm text-[#555] font-mono tracking-wider group-hover:text-gold/60">
                              {user.phoneHint}***
                            </span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* No Results state */}
                  {query.length >= 2 && !isSearching && searchResults.length === 0 && (
                    <div className="mt-4 p-4 bg-[#121212] rounded-lg border border-white/5 text-center text-sm text-[#777]">
                      No exact match found. Please check your spelling.
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* STEP 2: VERIFY */}
            {step === 'verify' && selectedUser && (
              <motion.div
                key="step-verify"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <button 
                  onClick={() => setStep('search')}
                  className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-[#666] hover:text-gold mb-6 transition-colors"
                >
                  <ArrowLeft className="w-3 h-3" /> Back to Search
                </button>

                <div className="bg-[#121212] border border-white/5 rounded-md p-5 mb-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <span className="font-serif text-gold font-bold text-lg">
                      {selectedUser.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">{selectedUser.name}</h3>
                    <p className="text-xs text-[#777] flex items-center gap-1.5">
                      <Lock className="w-3 h-3" /> Secure Record Located
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-serif text-white mb-2 font-bold tracking-wide">Verify Identity</h2>
                  <p className="text-xs text-[#666] leading-relaxed">
                    For security, please enter the <strong className="text-gold">last 3 digits</strong> of the phone number associated with this registration:
                  </p>
                  
                  <div className="mt-4 p-3 bg-black/50 border border-white/5 rounded-md inline-block">
                    <p className="font-mono text-xl tracking-[0.25em] text-[#888]">
                      {selectedUser.phoneHint}<span className="text-gold">___</span>
                    </p>
                  </div>
                </div>

                <form onSubmit={handleVerify} className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#555] font-bold block mb-2">
                      Last 3 Digits
                    </label>
                    <input
                      type="text"
                      maxLength={3}
                      value={last3}
                      onChange={(e) => setLast3(e.target.value.replace(/\D/g, ''))}
                      placeholder="***"
                      className="w-full max-w-[200px] bg-[#121212] border border-white/10 rounded-md py-3 px-4 text-center text-xl tracking-[0.5em] text-white focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all font-mono"
                      autoFocus
                    />
                  </div>

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2 p-3 bg-red-950/30 border border-red-500/20 rounded-md text-red-200 text-xs"
                    >
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={isVerifying || last3.length !== 3}
                    className="w-full bg-gold hover:bg-[#cda640] text-black font-bold uppercase tracking-wider text-xs py-4 rounded-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Verifying...
                      </>
                    ) : (
                      'Verify & Unlock'
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {/* STEP 3: SUCCESS */}
            {step === 'success' && selectedUser && (
              <motion.div
                key="step-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="text-center py-6"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center mx-auto mb-6 border border-green-500/20"
                >
                  <CheckCircle2 className="w-8 h-8" />
                </motion.div>
                
                <h2 className="text-2xl font-serif text-white mb-2 font-bold">Identity Verified</h2>
                <p className="text-sm text-[#888] mb-6">
                  Thank you, <strong className="text-white">{selectedUser.name}</strong>. Your Appreciation Letter is ready.
                </p>

                <button
                  onClick={handleDownloadClick}
                  className="w-full bg-white hover:bg-gray-100 text-black font-bold uppercase tracking-wider text-xs py-4 rounded-md transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] mb-8"
                >
                  <Download className="w-4 h-4" /> Download PDF Letter
                </button>

                <div className="p-4 bg-[#121212] border border-gold/20 rounded-md mb-6">
                  <h3 className="text-xs uppercase tracking-widest text-gold font-bold mb-1">Poetry Festival Season 2</h3>
                  <p className="text-lg font-serif text-white mb-4">Official Appreciation Letter</p>
                  
                  {/* PDF Preview */}
                  <div className="relative w-full aspect-[1/1.414] max-w-lg mx-auto bg-black/50 rounded-md overflow-hidden border border-white/10 mb-4 shadow-inner group">
                    <div className="absolute inset-0 flex items-center justify-center text-[#555] -z-10">
                      <Loader2 className="w-6 h-6 animate-spin" />
                    </div>
                    <iframe 
                      src={`https://fmnnomndxnybjsbykpbr.supabase.co/storage/v1/object/public/PF%20AL%202/${selectedUser.id}.pdf#toolbar=0&navpanes=0&scrollbar=0`}
                      className="relative w-full h-full z-10 bg-transparent border-0"
                      title="Appreciation Letter Preview"
                    />
                  </div>

                  <p className="text-[10px] text-[#555] font-mono">ID: {selectedUser.id}</p>
                </div>

                <button
                  onClick={handleDownloadClick}
                  className="w-full bg-gold hover:bg-[#cda640] text-black font-bold uppercase tracking-wider text-xs py-4 rounded-md transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                >
                  <Download className="w-4 h-4" /> Download PDF Letter
                </button>
              </motion.div>
            )}

            {/* INTERMEDIATE LOADING STEP */}
            {step === 'loading-promo' && (
              <motion.div
                key="step-loading-promo"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-16 flex flex-col items-center justify-center text-center"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full"></div>
                  <Loader2 className="relative w-16 h-16 text-gold animate-spin" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif text-white font-bold mb-3">Fetching Your Official Letter...</h2>
                <p className="text-[#888] max-w-sm mx-auto">Please wait a moment while we securely generate and save your Appreciation Letter to your device.</p>
              </motion.div>
            )}

            {/* STEP 4: PROMO / UPSSELL - HORMOZI STYLE */}
            {step === 'promo' && (
              <motion.div
                key="step-promo"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="py-4"
              >
                {/* Header / Hook */}
                <div className="text-center mb-10">
                  <p className="text-green-400 text-xs font-bold tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Your Appreciation Letter is downloading in the background
                  </p>
                  
                  <h3 className="text-2xl sm:text-3xl md:text-5xl font-serif font-black text-white mb-4 sm:mb-6 leading-tight px-4 sm:px-0">
                    You've already proven yourself at the festival.<br/>
                    <span className="italic font-light text-gold text-xl sm:text-2xl md:text-4xl block mt-1 sm:mt-0">Now, let's publish your premium solo book.</span>
                  </h3>

                  <div className="w-full my-10">
                    <div className="relative w-full min-h-[500px] md:min-h-[600px] aspect-[16/7] md:rounded-2xl overflow-hidden border-y md:border border-white/10 shadow-2xl group flex flex-col justify-end pb-8 md:pb-16">
                      {/* Image */}
                      <img 
                        src="https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1777555292/La_Polentina_-_Joey_Guidone_spmmpb.jpg" 
                        alt="Poetry Publishing Banner" 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      
                      {/* Gradient Overlay for Readability (Darker at bottom) */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                      {/* Text on bottom half of Image */}
                      <div className="relative z-10 p-4 sm:p-6 text-center max-w-5xl mx-auto w-full">
                        <p className="text-white font-serif text-xl sm:text-3xl md:text-5xl lg:text-6xl font-black leading-[1.2] md:leading-[1.1] drop-shadow-2xl px-2 sm:px-0">
                          "Get your poetry published as a premium solo book and keep <br className="md:hidden" /><span className="text-gold italic block sm:inline mt-1 sm:mt-0">100% of your royalties.</span>"
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-[#bbb] text-sm md:text-lg max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4">
                    Whether your poems are perfectly polished or just sitting in your notes app, we will guide you step-by-step. We handle the heavy lifting so you can finally get the fame, respect, and recognition you deserve. 
                    <strong className="text-white block mt-3 sm:mt-2 text-base sm:text-lg"> Launch your book today and start earning direct royalties on every copy sold!</strong>
                  </p>

                  <div className="bg-gold/10 border border-gold/30 rounded-lg py-3 px-6 inline-block mb-8 shadow-inner">
                    <strong className="text-gold text-lg md:text-xl font-serif">Publish your own solo book of poetry with us</strong>
                  </div>

                  <div className="text-center w-full px-4 sm:px-0">
                    <a 
                      href="https://calendly.com/sherininkfetish/free-30-min-poetry-book-publishing-call"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-gradient-to-r from-green-600 via-green-400 to-green-600 hover:from-green-700 hover:to-green-700 text-white font-black uppercase tracking-[0.15em] text-xs sm:text-sm md:text-lg py-4 sm:py-5 px-6 sm:px-10 rounded-full transition-all shadow-[0_0_40px_rgba(34,197,94,0.5)] hover:shadow-[0_0_60px_rgba(34,197,94,0.8)] hover:scale-[1.02] active:scale-95 animate-pulse ring-4 ring-green-500/30"
                    >
                      Book a Free Solo Publishing Call
                    </a>
                  </div>
                </div>
                
                {/* Packages Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 max-w-6xl mx-auto items-stretch px-4 sm:px-0">
                  
                  {/* Package 1: 7K */}
                  <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-8 hover:border-gold/30 transition-all duration-300 group flex flex-col relative z-0">
                    <div className="mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-white/5">
                      <div className="bg-white/5 text-gray-300 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full w-max mb-3 sm:mb-4">
                        Essential
                      </div>
                      <h4 className="text-xl sm:text-2xl font-serif text-white font-bold mb-2 group-hover:text-gold transition-colors">Standard Publishing</h4>
                      <div className="flex flex-col gap-1 mt-3">
                        <span className="line-through text-base sm:text-lg text-[#555] font-bold">₹10,000</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl sm:text-4xl font-black text-white group-hover:text-gold transition-colors">₹7,000</span>
                          <span className="text-xs sm:text-sm text-[#666]">one-time</span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-gold/80 font-bold mt-2 border border-gold/20 bg-gold/5 px-2 py-1 rounded inline-block w-fit max-w-full">
                          Special subsidized offer strictly for Poetry Festival Season 2 Authors.
                        </span>
                      </div>
                    </div>
                    <ul className="text-xs sm:text-sm text-[#aaa] space-y-4 sm:space-y-5 mb-6 flex-1">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5"/> 
                        <div>
                          <strong className="text-white block text-base mb-1">Custom Book Cover Design</strong>
                          <span className="text-xs text-[#888] leading-tight block">An eye-catching, professionally formatted cover that captures your story.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5"/> 
                        <div>
                          <strong className="text-white block text-base mb-1">Professional Copywriting</strong>
                          <span className="text-xs text-[#888] leading-tight block">Polished, engaging, and publication-ready text for your blurb and bio.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5"/> 
                        <div>
                          <strong className="text-white block text-base mb-1">Publishing & Distribution</strong>
                          <span className="text-xs text-[#888] leading-tight block">ISBN setup and listing on Amazon, online site, and 3+ platforms.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5"/> 
                        <div>
                          <strong className="text-white block text-base mb-1">1 Physical Author Copy</strong>
                          <span className="text-xs text-[#888] leading-tight block">Delivered directly to your doorstep.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5"/> 
                        <div>
                          <strong className="text-white block text-base mb-1">70% Royalty</strong>
                          <span className="text-xs text-[#888] leading-tight block">Settled at your bank account every 15 days.</span>
                        </div>
                      </li>
                    </ul>
                    <div className="mt-auto bg-[#1a1205] border border-gold/20 rounded-lg p-4 text-center w-full shadow-inner mb-4">
                      <p className="text-[#d4af37] text-xs md:text-sm font-medium">
                        You don't need to pay everything at once. <br className="hidden md:block"/><strong className="text-white block mt-1">Pay in 3-4 flexible installments.</strong>
                      </p>
                    </div>
                    <a 
                      href="https://calendly.com/sherininkfetish/free-30-min-poetry-book-publishing-call"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-black uppercase tracking-widest text-[10px] sm:text-xs py-3 sm:py-4 px-4 rounded-lg transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:scale-[1.02] active:scale-95 text-center"
                    >
                      Book a Call Regarding This Package
                    </a>
                  </div>

                  {/* Package 2: 10K */}
                  <div className="bg-gradient-to-br from-[#2d1b06] via-[#110a02] to-black border-2 border-gold rounded-2xl p-5 sm:p-8 relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(212,175,55,0.25)] hover:shadow-[0_0_60px_rgba(212,175,55,0.4)] transition-all duration-300 flex flex-col z-10 before:absolute before:inset-0 before:bg-gradient-to-t before:from-gold/5 before:to-transparent before:rounded-2xl before:pointer-events-none mt-6 md:mt-0">
                    {/* Glowing effect behind card */}
                    <div className="absolute -inset-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-30 blur-md rounded-2xl -z-10"></div>
                    
                    <div className="absolute top-0 right-4 sm:right-6 -translate-y-1/2 bg-gradient-to-r from-gold to-[#fff2c8] text-black text-[9px] sm:text-[11px] font-black uppercase tracking-widest px-3 sm:px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.5)] z-20 flex items-center gap-1 sm:gap-1.5">
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-black" /> The Godfather Offer
                    </div>
                    
                    <div className="mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-gold/20 relative z-10 mt-2 sm:mt-0">
                      <div className="bg-gold/10 text-gold text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full w-max mb-3 sm:mb-4 border border-gold/30 flex items-center gap-1.5">
                        <Zap className="w-3 h-3 fill-gold" /> Most Popular
                      </div>
                      <h4 className="text-xl sm:text-2xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#fff2c8] font-bold mb-2">Premium Publishing</h4>
                      <div className="flex flex-col gap-1 mt-3">
                        <span className="line-through text-base sm:text-lg text-gold/40 font-bold">₹15,000</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#fff2c8] filter drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">₹10,000</span>
                          <span className="text-xs sm:text-sm text-gold/60">one-time</span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-gold font-black mt-2 border border-gold/30 bg-gold/10 px-2 py-1 rounded inline-block w-fit max-w-full shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                          Special subsidized offer strictly for Poetry Festival Season 2 Authors.
                        </span>
                      </div>
                    </div>
                    
                    <ul className="text-xs sm:text-sm text-[#ccc] space-y-4 sm:space-y-5 mb-6 flex-1 relative z-10">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5 filter drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]"/> 
                        <div>
                          <strong className="text-white block text-base mb-1">Everything in Standard, PLUS:</strong>
                          <span className="text-xs text-gold/80 leading-tight block">All covers, copywriting, and listings included.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5 filter drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]"/> 
                        <div>
                          <strong className="text-white block text-base mb-1">Grammar & Syntax Review</strong>
                          <span className="text-xs text-[#888] leading-tight block">A preliminary check to ensure your prose is clear and readable.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5 filter drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]"/> 
                        <div>
                          <strong className="text-white block text-base mb-1">Social Media Launch Teaser</strong>
                          <span className="text-xs text-[#888] leading-tight block">Custom graphics designed to announce your upcoming book release.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5 filter drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]"/> 
                        <div>
                          <strong className="text-white block text-base mb-1">Custom Author Portfolio Site</strong>
                          <span className="text-xs text-[#888] leading-tight block">Your very own customized author website to build your brand.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5 filter drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]"/> 
                        <div>
                          <strong className="text-white block text-base mb-1">3 Physical Author Copies</strong>
                          <span className="text-xs text-[#888] leading-tight block">Premium copies delivered directly to you.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="bg-gold/20 p-1 rounded-full shrink-0 mt-0.5 border border-gold/40">
                          <CheckCircle2 className="w-4 h-4 text-gold filter drop-shadow-[0_0_5px_rgba(212,175,55,0.8)]"/> 
                        </div>
                        <div>
                          <strong className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#fff2c8] block text-lg font-bold mb-1">100% Royalty</strong>
                          <span className="text-xs text-gold/80 font-medium leading-tight block">Keep absolutely everything you earn from sales.</span>
                        </div>
                      </li>
                    </ul>
                    <div className="mt-auto relative z-10 bg-gradient-to-r from-gold/10 via-[#1a1205] to-gold/10 border border-gold/30 rounded-lg p-4 text-center w-full shadow-[0_0_20px_rgba(212,175,55,0.2)] mb-4">
                      <p className="text-[#d4af37] text-xs md:text-sm font-medium">
                        You don't need to pay everything at once. <br className="hidden md:block"/><strong className="text-white block mt-1 text-base">Pay in 3-4 flexible installments.</strong>
                      </p>
                    </div>
                  </div>
                  
                </div>

                {/* CTAs */}
                <div className="text-center px-4 sm:px-0 mt-8">
                  <a 
                    href="https://calendly.com/sherininkfetish/free-30-min-poetry-book-publishing-call"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-gradient-to-r from-green-600 via-green-400 to-green-600 hover:from-green-700 hover:to-green-700 text-white font-black uppercase tracking-[0.15em] text-xs sm:text-sm md:text-xl py-5 sm:py-6 px-4 sm:px-12 rounded-full transition-all shadow-[0_0_40px_rgba(34,197,94,0.5)] hover:shadow-[0_0_60px_rgba(34,197,94,0.8)] hover:scale-[1.02] active:scale-95 animate-pulse ring-4 ring-green-500/30 mb-4 whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    Book a Free Solo Publishing Call
                  </a>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
