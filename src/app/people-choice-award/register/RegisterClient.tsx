'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Trophy, ShieldCheck, CheckCircle2, ArrowRight, 
  Sparkles, Lock, User, Mail, Phone, MapPin, 
  Globe, Feather, BookOpen, Star, AlertCircle, Check
} from 'lucide-react';
import Link from 'next/link';

export default function RegisterClient() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    cityState: '',
    category: '',
    writingLanguage: 'English',
    portfolio: '',
    bio: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.phone.length !== 10) {
      alert("Please enter a valid 10-digit WhatsApp phone number.");
      return;
    }

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      
      // Construct URL query for seamless transition to submission portal or thank-you
      const query = new URLSearchParams({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        category: formData.category || 'writer',
        city: formData.cityState
      }).toString();

      setTimeout(() => {
        router.push(`/people-choice-award/submit?${query}`);
      }, 1200);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#070605] text-[#f5f0e1] font-sans selection:bg-[#d4af37] selection:text-black relative overflow-x-hidden">
      
      {/* Ambient background lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[15%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,#aa771c_0%,transparent_70%)] opacity-20 blur-[100px] animate-pulse" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,#d4af37_0%,transparent_70%)] opacity-15 blur-[120px] animate-pulse" />
      </div>

      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 bg-[#070605]/85 backdrop-blur-md border-b border-[#d4af37]/20 py-2.5 px-4 shadow-lg shadow-black/40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/people-choice-award" className="flex items-center gap-3 group">
            <img 
              src="/images/inkfetish_logo.png" 
              alt="Inkfetish Publication" 
              className="w-8 h-8 rounded-full object-cover border border-[#d4af37]/30 shadow-[0_0_10px_rgba(212,175,55,0.3)] group-hover:scale-105 transition-transform"
            />
            <span className="font-serif text-sm font-semibold tracking-wider text-[#f3e5ab]">
              Inkfetish Publication
            </span>
          </Link>

          <Link 
            href="/people-choice-award"
            className="text-xs font-serif uppercase tracking-widest text-[#d4af37] hover:text-[#fcf6ba] transition-colors"
          >
            ← Back to Award Details
          </Link>
        </div>
      </nav>

      {/* --- TOP SCARCITY & PORTAL BANNER --- */}
      <div className="bg-gradient-to-r from-[#1c1408] via-[#2f220d] to-[#1c1408] border-b border-[#d4af37]/25 text-[#f3e5ab] py-2 px-3 text-center text-xs tracking-widest font-semibold flex items-center justify-center gap-2">
        <span className="animate-ping inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75" />
        <span>Official Application Portal — Strictly 250 Total Participant Seats</span>
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#17140e] border border-[#d4af37]/40 px-4 py-1 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.15)] mb-3"
          >
            <Trophy className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="text-[10px] font-serif uppercase tracking-[0.25em] text-[#f3e5ab] font-bold">
              People's Choice Award 2026
            </span>
          </motion.div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] mb-3">
            Apply Now
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
            Enter your details below to submit your official application. Decided by 200,000+ passionate readers.
          </p>
        </div>

        {/* Step Progress Bar */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="flex items-center justify-between text-xs font-serif font-bold uppercase tracking-wider text-[#d4af37] mb-2">
            <span className="flex items-center gap-1.5">
              <span className="w-6 h-6 rounded-full bg-[#d4af37] text-black flex items-center justify-center text-[11px] font-black">1</span>
              <span>Application Details</span>
            </span>
            <span className="text-gray-500 flex items-center gap-1.5">
              <span className="w-6 h-6 rounded-full bg-white/10 text-gray-400 flex items-center justify-center text-[11px]">2</span>
              <span>Manuscript Submission</span>
            </span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-gradient-to-r from-[#bf953f] to-[#fcf6ba] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Registration Form */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#120f0a]/90 backdrop-blur-xl border border-[#d4af37]/35 rounded-3xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.8)] relative"
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Jane Doe"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/50 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Email Address *</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>WhatsApp Number *</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      maxLength={10}
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit number"
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/50 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>City &amp; State *</span>
                    </label>
                    <input
                      type="text"
                      name="cityState"
                      required
                      value={formData.cityState}
                      onChange={handleChange}
                      placeholder="e.g. Mumbai, Maharashtra"
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5 flex items-center gap-1.5">
                      <Feather className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Category *</span>
                    </label>
                    <select
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full bg-[#16120b] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/50 transition-all"
                    >
                      <option value="" disabled>Select category</option>
                      <option value="poet">Poet / Shayar</option>
                      <option value="writer">Writer / Author</option>
                      <option value="both">Both (Writer &amp; Poet)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Portfolio / Social Link *</span>
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    required
                    value={formData.portfolio}
                    onChange={handleChange}
                    placeholder="https://instagram.com/yourhandle or blog/website"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Short Writer Bio / Statement (Optional)</span>
                  </label>
                  <textarea
                    name="bio"
                    rows={3}
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Briefly describe your writing journey or themes..."
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/50 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 px-6 rounded-xl font-bold text-sm uppercase tracking-wider text-black bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_25px_rgba(212,175,55,0.35)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-4"
                >
                  {status === 'submitting' && <span>Submitting Application...</span>}
                  {status === 'success' && (
                    <span className="flex items-center gap-1.5 text-green-950 font-black">
                      <Check className="w-5 h-5" /> Application Submitted! Proceeding to Submission...
                    </span>
                  )}
                  {status === 'idle' && (
                    <>
                      <span>Apply Now &amp; Proceed</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-gray-500 text-center pt-1">
                  🔒 Verified Reader-Choice Award • 100% Data Confidentiality
                </p>

              </form>
            </motion.div>
          </div>

          {/* Right Sidebar: Perks & Inclusions */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Award Kit Highlight Box */}
            <div className="bg-gradient-to-br from-[#1c160c] via-[#120f0a] to-[#1c160c] border border-[#d4af37]/40 rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="text-center mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30 px-3 py-1 rounded-full">
                  OFFICIAL APPLICATION INCLUSIONS
                </span>
              </div>

              <div className="flex justify-center mb-4">
                <img 
                  src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1788291912/ChatGPT_Image_Sep_2_2026_01_13_09_AM_1_vb4vp2.png" 
                  alt="People's Choice Award Kit" 
                  className="rounded-xl object-contain w-full max-w-[220px] h-auto border border-[#d4af37]/30 shadow-lg"
                />
              </div>

              <ul className="space-y-3 text-xs text-gray-200">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                  <span><strong>Top 20 Winners:</strong> Physical Golden Statuette + Home Delivery</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                  <span><strong>Top 3 Winners:</strong> Free Solo Book Publication Contract</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                  <span><strong>Top 20 Winners:</strong> ₹25,000 Exclusive Author Goodies</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                  <span><strong>EVERY Participant:</strong> Participation Certificate + Appreciation Letter</span>
                </li>
              </ul>
            </div>

            {/* Trust badge */}
            <div className="bg-[#120f0a]/90 border border-[#d4af37]/25 rounded-2xl p-5 text-center space-y-2">
              <ShieldCheck className="w-8 h-8 text-[#d4af37] mx-auto" />
              <h4 className="font-serif font-bold text-sm text-[#f3e5ab]">200,000+ Verified Readers</h4>
              <p className="text-xs text-gray-400">
                No biased panels. Voting is conducted through transparent, reader-driven voting links.
              </p>
            </div>

          </div>

        </div>

      </main>

      <footer className="border-t border-white/10 bg-[#050403] py-6 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Inkfetish Publication. All rights reserved. People's Choice Award.</p>
      </footer>

    </div>
  );
}
