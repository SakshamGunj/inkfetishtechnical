'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Trophy, ShieldCheck, CheckCircle2, ArrowRight, 
  Sparkles, Lock, User, Mail, Phone, MapPin, 
  Feather, BookOpen, Star, AlertCircle, Check, ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { load } from '@cashfreepayments/cashfree-js';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi (NCT)', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry', 'Outside India'
];

export default function RegisterClient() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    state: '',
    category: '',
    writingLanguage: 'English',
    bio: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [cashfree, setCashfree] = useState<any>(null);

  useEffect(() => {
    const initCashfree = async () => {
      try {
        const mode = process.env.NEXT_PUBLIC_CASHFREE_MODE || 'production';
        const cf = await load({ mode: mode as 'sandbox' | 'production' });
        setCashfree(cf);
      } catch (err) {
        console.error('Failed to load Cashfree SDK', err);
      }
    };
    initCashfree();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const orderId = params.get('order_id');
      if (orderId && orderId.startsWith('pca_')) {
        fetch(`/api/cashfree/verify-order?order_id=${orderId}`)
          .then((res) => res.json())
          .then((data) => {
            if (data && data.order_status === 'PAID') {
              router.push(`/people-choice-award/thank-you?order_id=${orderId}`);
            }
          })
          .catch((err) => console.error('Verification error on register page:', err));
      }
    }
  }, [router]);

  const cleanPhone = formData.phone.trim().replace(/\D/g, '');
  const isEmailValid = formData.email.trim().length > 3 && formData.email.includes('@');
  
  const isFormValid = Boolean(
    formData.fullName.trim() &&
    isEmailValid &&
    cleanPhone.length === 10 &&
    formData.state &&
    formData.category
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cleanPhone.length !== 10) {
      alert("Please enter a valid 10-digit WhatsApp phone number.");
      return;
    }

    if (!cashfree) {
      alert("Payment gateway is initializing. Please wait a moment and try again.");
      return;
    }

    setStatus('submitting');

    try {
      const res = await fetch('/api/cashfree/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 449,
          customerName: formData.fullName.trim(),
          customerEmail: formData.email.trim(),
          customerPhone: cleanPhone,
          state: formData.state,
          category: formData.category,
          plan: '449',
          source: 'people_choice',
        }),
      });

      const orderData = await res.json();
      if (!res.ok) {
        throw new Error(orderData.error || 'Failed to initialize payment gateway.');
      }

      const { payment_session_id } = orderData;

      setStatus('success');

      // Launch Cashfree Checkout
      await cashfree.checkout({
        paymentSessionId: payment_session_id,
        redirectTarget: '_self',
      });

    } catch (err: any) {
      console.error('Payment initialization error:', err);
      alert(err.message || 'Payment initialization failed. Please try again.');
      setStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-[#070605] text-[#f5f0e1] font-sans selection:bg-[#d4af37] selection:text-black relative overflow-x-hidden pb-24 sm:pb-12">
      
      {/* Ambient background lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[15%] -left-[10%] w-[70vw] sm:w-[50vw] h-[70vw] sm:h-[50vw] rounded-full bg-[radial-gradient(circle,#aa771c_0%,transparent_70%)] opacity-20 blur-[90px] animate-pulse" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[80vw] sm:w-[60vw] h-[80vw] sm:h-[60vw] rounded-full bg-[radial-gradient(circle,#d4af37_0%,transparent_70%)] opacity-15 blur-[100px] animate-pulse" />
      </div>

      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 bg-[#070605]/90 backdrop-blur-lg border-b border-[#d4af37]/20 py-2.5 px-3 sm:px-6 shadow-lg shadow-black/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/people-choice-award" className="flex items-center gap-2 sm:gap-3 group">
            <img 
              src="/images/inkfetish_logo.png" 
              alt="Inkfetish Publication" 
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-[#d4af37]/30 shadow-[0_0_10px_rgba(212,175,55,0.3)] group-hover:scale-105 transition-transform"
            />
            <span className="font-serif text-xs sm:text-sm font-semibold tracking-wider text-[#f3e5ab]">
              Inkfetish <span className="hidden xs:inline">Publication</span>
            </span>
          </Link>

          <Link 
            href="/people-choice-award"
            className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-serif uppercase tracking-widest text-[#d4af37] hover:text-[#fcf6ba] transition-colors py-1 px-2 rounded-lg bg-black/40 border border-[#d4af37]/20"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Back <span className="hidden sm:inline">to Award Details</span></span>
          </Link>
        </div>
      </nav>

      {/* --- TOP SCARCITY & PORTAL BANNER --- */}
      <div className="bg-gradient-to-r from-[#1c1408] via-[#2f220d] to-[#1c1408] border-b border-[#d4af37]/25 text-[#f3e5ab] py-2 px-3 text-center text-[11px] sm:text-xs tracking-wider font-semibold flex items-center justify-center gap-2">
        <span className="animate-ping inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75 shrink-0" />
        <span>Official Application Portal — Strictly 250 Total Seats</span>
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-12">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          
          {/* Key Dates Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-3 max-w-lg mx-auto mb-6"
          >
            <div className="bg-[#120f0a]/90 border border-indigo-500/30 rounded-xl p-3 text-center shadow-md">
              <span className="text-[9px] uppercase font-bold tracking-widest text-indigo-400 bg-indigo-950/60 border border-indigo-500/40 px-2 py-0.5 rounded-full inline-block mb-1">
                UPCOMING
              </span>
              <div className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">Live Voting</div>
              <div className="font-serif text-xs sm:text-sm font-bold text-white mt-0.5">28th–30th October 2026</div>
            </div>

            <div className="bg-[#120f0a]/90 border border-[#d4af37]/30 rounded-xl p-3 text-center shadow-md">
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30 px-2 py-0.5 rounded-full inline-block mb-1">
                CONFIRMED
              </span>
              <div className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">Result Declaration</div>
              <div className="font-serif text-xs sm:text-sm font-bold text-[#fcf6ba] mt-0.5">1st November 2026</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#17140e] border border-[#d4af37]/40 px-3.5 py-1 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.15)] mb-3"
          >
            <Trophy className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="text-[10px] font-serif uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#f3e5ab] font-bold">
              People's Choice Award 2026
            </span>
          </motion.div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] mb-2 sm:mb-3">
            Apply Now
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed max-w-md mx-auto px-2">
            Enter your details below to submit your official application. Decided by 200,000+ passionate readers.
          </p>
        </div>

        {/* Step Progress Bar */}
        <div className="max-w-xl mx-auto mb-8 sm:mb-10 px-1">
          <div className="flex items-center justify-between text-[11px] sm:text-xs font-serif font-bold uppercase tracking-wider text-[#d4af37] mb-2">
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#d4af37] text-black flex items-center justify-center text-[10px] sm:text-[11px] font-black">1</span>
              <span>Application <span className="hidden sm:inline">Details</span></span>
            </span>
            <span className="text-gray-500 flex items-center gap-1.5">
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/10 text-gray-400 flex items-center justify-center text-[10px] sm:text-[11px]">2</span>
              <span>Submission <span className="hidden sm:inline">Portal</span></span>
            </span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-gradient-to-r from-[#bf953f] to-[#fcf6ba] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Main Registration Form */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#120f0a]/95 backdrop-blur-xl border border-[#d4af37]/35 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.8)] relative"
            >
              <form id="registration-form" onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                
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
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-3 sm:px-4 text-base sm:text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/50 transition-all touch-manipulation"
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
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-3 sm:px-4 text-base sm:text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/50 transition-all touch-manipulation"
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
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-3 sm:px-4 text-base sm:text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/50 transition-all touch-manipulation"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>State *</span>
                    </label>
                    <select
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full bg-[#16120b] border border-white/15 rounded-xl px-3.5 py-3 sm:px-4 text-base sm:text-sm text-white focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/50 transition-all touch-manipulation cursor-pointer"
                    >
                      <option value="" disabled className="bg-[#16120b] text-gray-400">Select state</option>
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st} className="bg-[#16120b] text-white">
                          {st}
                        </option>
                      ))}
                    </select>
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
                      className="w-full bg-[#16120b] border border-white/15 rounded-xl px-3.5 py-3 sm:px-4 text-base sm:text-sm text-white focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/50 transition-all touch-manipulation cursor-pointer"
                    >
                      <option value="" disabled className="bg-[#16120b] text-gray-400">Select category</option>
                      <option value="poet" className="bg-[#16120b] text-white">Poet / Shayar</option>
                      <option value="writer" className="bg-[#16120b] text-white">Writer / Author</option>
                      <option value="both" className="bg-[#16120b] text-white">Both (Writer &amp; Poet)</option>
                    </select>
                  </div>
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
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-3 sm:px-4 text-base sm:text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/50 transition-all resize-none touch-manipulation"
                  />
                </div>

                {/* Main Inline Form Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={`w-full min-h-[48px] sm:min-h-[52px] py-3.5 sm:py-4 px-6 rounded-xl font-bold text-sm sm:text-base uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-4 touch-manipulation ${
                    isFormValid
                      ? 'bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] text-black shadow-[0_4px_25px_rgba(212,175,55,0.45)] hover:brightness-110 active:scale-[0.98]'
                      : 'bg-white/10 text-gray-400 border border-white/15 hover:bg-white/15'
                  }`}
                >
                  {status === 'submitting' && <span>Submitting Application...</span>}
                  {status === 'success' && (
                    <span className="flex items-center gap-1.5 text-green-950 font-black">
                      <Check className="w-5 h-5" /> Application Submitted! Proceeding...
                    </span>
                  )}
                  {status === 'idle' && (
                    <>
                      <span>{isFormValid ? 'Apply Now & Proceed' : 'Fill Details & Proceed'}</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
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
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            
            {/* Award Kit Highlight Box */}
            <div className="bg-gradient-to-br from-[#1c160c] via-[#120f0a] to-[#1c160c] border border-[#d4af37]/40 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
              <div className="text-center mb-3 sm:mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30 px-3 py-1 rounded-full">
                  OFFICIAL APPLICATION INCLUSIONS
                </span>
              </div>

              <div className="flex justify-center mb-4">
                <img 
                  src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1788291912/ChatGPT_Image_Sep_2_2026_01_13_09_AM_1_vb4vp2.png" 
                  alt="People's Choice Award Kit" 
                  className="rounded-xl object-contain w-full max-w-[180px] sm:max-w-[220px] h-auto border border-[#d4af37]/30 shadow-lg"
                />
              </div>

              <ul className="space-y-2.5 sm:space-y-3 text-xs text-gray-200">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span><strong>Top 20 Winners:</strong> Physical Golden Statuette + Home Delivery</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span><strong>Top 3 Winners:</strong> Free Solo Book Publication Contract</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span><strong>Top 20 Winners:</strong> ₹25,000 Exclusive Author Goodies</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span><strong>EVERY Participant:</strong> Certificate + Appreciation Letter</span>
                </li>
              </ul>
            </div>

            {/* Trust badge */}
            <div className="bg-[#120f0a]/90 border border-[#d4af37]/25 rounded-2xl p-4 sm:p-5 text-center space-y-2">
              <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-[#d4af37] mx-auto" />
              <h4 className="font-serif font-bold text-xs sm:text-sm text-[#f3e5ab]">200,000+ Verified Readers</h4>
              <p className="text-[11px] sm:text-xs text-gray-400 font-light leading-relaxed">
                No biased panels. Voting is conducted through transparent, reader-driven voting links.
              </p>
            </div>

          </div>

        </div>

      </main>

      {/* --- STICKY BOTTOM BAR ON MOBILE DEVICES --- */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0c0a07]/95 backdrop-blur-xl border-t border-[#d4af37]/35 p-3 shadow-[0_-8px_30px_rgba(0,0,0,0.95)] sm:hidden flex items-center justify-between gap-3">
        <div className="flex flex-col pl-1">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#d4af37]">
            {isFormValid ? '⚡ Form Completed' : '📝 Step 1 of 2'}
          </span>
          <span className="text-xs font-bold text-white">
            {isFormValid ? 'Ready to Proceed' : 'Fill Form Details'}
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            const form = document.getElementById('registration-form') as HTMLFormElement;
            if (form) form.requestSubmit();
          }}
          disabled={status === 'submitting'}
          className={`py-3 px-5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md shrink-0 touch-manipulation ${
            isFormValid
              ? 'bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] text-black shadow-[0_0_22px_rgba(212,175,55,0.65)] animate-pulse'
              : 'bg-white/10 text-gray-400 border border-white/15 hover:bg-white/15'
          }`}
        >
          {status === 'submitting' ? (
            <span>Submitting...</span>
          ) : status === 'success' ? (
            <span className="flex items-center gap-1 text-green-950 font-black">
              <Check className="w-4 h-4" /> Submitted!
            </span>
          ) : (
            <>
              <span>{isFormValid ? 'Apply & Proceed' : 'Fill Details'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

    </div>
  );
}
