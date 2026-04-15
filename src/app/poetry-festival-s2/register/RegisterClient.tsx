'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShieldCheck, Lock, CheckCircle2, ArrowRight,
  AlertCircle, Feather, Trophy, BookOpen,
  MapPin, Mail, Phone, User, Heart, Globe,
  Flame, Sparkles, Mic, ChevronDown, Star
} from 'lucide-react';

// ── Session timer ─────────────────────────────────────────────────────────────
function useSessionTimer(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    if (seconds <= 0) return;
    const id = setInterval(() => setSeconds(s => s - 1), 1000);
    return () => clearInterval(id);
  }, [seconds]);
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return { display: `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`, expired: seconds <= 0 };
}

const CATEGORIES = [
  { id: 'love', icon: <Heart className="w-4 h-4" />, label: 'Love & Longing' },
  { id: 'nature', icon: <Globe className="w-4 h-4" />, label: 'Nature & Universe' },
  { id: 'rebellion', icon: <Flame className="w-4 h-4" />, label: 'Rebellion & Truth' },
  { id: 'memory', icon: <Sparkles className="w-4 h-4" />, label: 'Memory & Identity' },
  { id: 'open', icon: <Feather className="w-4 h-4" />, label: 'Open Theme' },
  { id: 'hindi', icon: <Mic className="w-4 h-4" />, label: 'Hindi / Urdu Poetry' },
];

export default function PoetryFestivalRegisterClient() {
  const { display: timerDisplay, expired } = useSessionTimer(12 * 60); // 12 min session

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    address: '',
    category: '',
    instagram: '',
    firstTime: '',
    hearAbout: '',
  });
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isStep1Valid = formData.name && formData.email && formData.phone && formData.city && formData.state;
  const isStep2Valid = formData.category !== '';
  const isStep3Valid = agreed;

  const handleNextStep = () => {
    if (step === 1 && isStep1Valid) setStep(2);
    if (step === 2 && isStep2Valid) setStep(3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setSubmitting(true);
    // ── Payment integration: plug in Razorpay here ──
    console.log('Proceeding to Razorpay payment...', formData);
    setTimeout(() => setSubmitting(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-[#fdfbf7] font-sans selection:bg-purple-700 selection:text-white">

      {/* ── SECURE HEADER ── */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#030303]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <Link href="/poetry-festival-s2" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-gradient-to-br from-gold to-[#c5a059] flex items-center justify-center rounded-sm">
              <Feather className="w-4 h-4 text-[#050505]" />
            </div>
            <span className="font-serif font-bold text-sm hidden sm:block tracking-wide text-[#fdfbf7] group-hover:text-gold transition-colors">
              Poetry Festival — Season 2
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {/* Session timer */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-black uppercase tracking-widest ${expired ? 'border-red-700/50 text-red-400 bg-red-900/10' : 'border-orange-700/40 text-orange-400 bg-orange-900/10'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${expired ? 'bg-red-500' : 'bg-orange-500 animate-pulse'}`} />
              Session: {timerDisplay}
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold text-[#555]">
              <Lock className="w-3.5 h-3.5 text-green-500" />
              256-bit SSL
            </div>
          </div>
        </div>
      </header>

      {/* ── PROGRESS BAR ── */}
      <div className="w-full h-0.5 bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-600 via-gold to-purple-400"
          initial={{ width: '33%' }}
          animate={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-14">
        {/* ── URGENCY STRIP ── */}
        <div className="flex items-start gap-3 bg-red-950/20 border border-red-900/30 p-3.5 rounded-sm mb-8 max-w-3xl mx-auto lg:mx-0">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-red-200 font-light leading-relaxed">
            <strong className="font-bold text-red-400">High Demand:</strong> Your seat is being held for{' '}
            <span className={`font-black ${expired ? 'text-red-500' : 'text-white'}`}>{timerDisplay}</span>.
            Complete your registration before time expires — seats are going fast.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* ═══════════════════════════════════════════
              LEFT COLUMN: FORM
          ═══════════════════════════════════════════ */}
          <div className="lg:col-span-7 space-y-6">

            {/* Step indicators */}
            <div className="flex items-center gap-0">
              {[
                { n: 1, label: 'Your Details' },
                { n: 2, label: 'Select Category' },
                { n: 3, label: 'Confirm & Pay' },
              ].map(({ n, label }, i) => (
                <React.Fragment key={n}>
                  <button
                    onClick={() => { if (n < step) setStep(n); }}
                    className={`flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-widest font-black transition-all ${step === n ? 'text-gold' : step > n ? 'text-green-500 cursor-pointer' : 'text-[#444] cursor-default'}`}
                  >
                    <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-black transition-all ${step === n ? 'border-gold text-gold' : step > n ? 'border-green-500 bg-green-900/20 text-green-400' : 'border-white/10 text-[#555]'}`}>
                      {step > n ? <CheckCircle2 className="w-3.5 h-3.5" /> : n}
                    </div>
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                  {i < 2 && <div className={`flex-1 h-px mx-2 sm:mx-3 transition-colors ${step > n ? 'bg-green-700/50' : 'bg-white/5'}`} />}
                </React.Fragment>
              ))}
            </div>

            {/* ── STEP 1: YOUR DETAILS ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
                className="bg-[#050505] border border-white/8 p-6 sm:p-8 rounded-sm relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-purple-900/10 blur-[60px] rounded-full pointer-events-none" />

                <h1 className="text-2xl sm:text-3xl font-serif font-black mb-1">Your Details</h1>
                <p className="text-sm text-[#555] font-light mb-8">Your name will appear exactly as entered on your Certificate of Excellence and in the published anthology.</p>

                <div className="space-y-5">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#666] font-bold flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" /> Full Name (For Certificate & Anthology)
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3.5 text-sm rounded-sm focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all placeholder:text-white/15 font-medium"
                      placeholder="e.g. Priya Sharma"
                    />
                    <p className="text-[10px] text-[#444] font-light">This exact name will be printed on your Certificate of Excellence.</p>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#666] font-bold flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" /> Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3.5 text-sm rounded-sm focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all placeholder:text-white/15"
                      placeholder="you@example.com"
                    />
                    <p className="text-[10px] text-[#444] font-light">Your submission guidelines & confirmation will be sent here.</p>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#666] font-bold flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" /> WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3.5 text-sm rounded-sm focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all placeholder:text-white/15"
                      placeholder="+91 98765 43210"
                    />
                    <p className="text-[10px] text-[#444] font-light">We'll send delivery updates and the Zoom invite via WhatsApp.</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* City */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-[#666] font-bold flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" /> City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3.5 text-sm rounded-sm focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all placeholder:text-white/15"
                        placeholder="Mumbai"
                      />
                    </div>
                    {/* State */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-[#666] font-bold">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3.5 text-sm rounded-sm focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all placeholder:text-white/15"
                        placeholder="Maharashtra"
                      />
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#666] font-bold">
                      Full Delivery Address
                      <span className="text-[#444] normal-case tracking-normal font-light ml-2">(for certificate & anthology courier)</span>
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3.5 text-sm rounded-sm focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all placeholder:text-white/15 resize-none"
                      placeholder="Flat/House No., Street, Landmark, PIN Code"
                    />
                    <p className="text-[10px] text-[#444] font-light">Your physical certificate and anthology will be couriered here. You may also update this later.</p>
                  </div>

                  {/* Optional: Instagram */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#666] font-bold">
                      Instagram Handle
                      <span className="text-[#444] normal-case tracking-normal font-light ml-2">(optional — for tagging if you win)</span>
                    </label>
                    <input
                      type="text"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3.5 text-sm rounded-sm focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all placeholder:text-white/15"
                      placeholder="@yourhandle"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={!isStep1Valid}
                    className={`w-full py-4 font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 rounded-sm transition-all ${isStep1Valid ? 'bg-gradient-to-r from-gold to-[#c5a059] hover:from-[#ebd298] hover:to-gold text-[#050505] shadow-lg' : 'bg-white/5 text-[#444] cursor-not-allowed'}`}
                  >
                    Continue to Category Selection <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: SELECT CATEGORY ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
                className="bg-[#050505] border border-white/8 p-6 sm:p-8 rounded-sm relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-48 h-48 bg-purple-900/10 blur-[60px] rounded-full pointer-events-none" />

                <h2 className="text-2xl sm:text-3xl font-serif font-black mb-1">Select Your Category</h2>
                <p className="text-sm text-[#555] font-light mb-8">
                  Choose the theme that best fits your poem. You'll receive detailed guidelines for your chosen category after registration.
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {CATEGORIES.map(({ id, icon, label }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: id })}
                      className={`flex items-center gap-3 p-4 rounded-sm border text-left transition-all duration-200 group ${formData.category === id
                        ? 'border-gold bg-gold/8 shadow-[0_0_20px_rgba(197,160,89,0.1)]'
                        : 'border-white/8 hover:border-purple-700/40 bg-[#0a0a0a]'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all ${formData.category === id ? 'bg-gold/20 text-gold' : 'bg-white/5 text-[#555] group-hover:text-purple-400 group-hover:bg-purple-900/20'}`}>
                        {icon}
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm font-bold ${formData.category === id ? 'text-gold' : 'text-[#fdfbf7]'}`}>{label}</div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${formData.category === id ? 'border-gold' : 'border-white/15'}`}>
                        {formData.category === id && <div className="w-2 h-2 rounded-full bg-gold" />}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Additional optional fields */}
                <div className="space-y-4 border-t border-white/5 pt-6 mb-8">
                  <p className="text-[11px] uppercase tracking-widest font-bold text-[#444]">Optional — helps us know you better</p>
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#555] font-bold">Is this your first poetry competition?</label>
                    <div className="flex gap-3">
                      {['Yes, first time!', 'No, I\'ve competed before'].map((opt) => (
                        <label key={opt} className={`flex-1 flex items-center gap-2.5 p-3.5 rounded-sm border cursor-pointer transition-all ${formData.firstTime === opt ? 'border-purple-600/60 bg-purple-900/10 text-purple-300' : 'border-white/8 text-[#666] hover:border-white/15'}`}>
                          <input type="radio" name="firstTime" value={opt} checked={formData.firstTime === opt} onChange={handleChange} className="accent-purple-500 w-4 h-4" />
                          <span className="text-xs font-medium">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#555] font-bold">How did you hear about Poetry Festival?</label>
                    <select
                      name="hearAbout"
                      value={formData.hearAbout}
                      onChange={handleChange}
                      className="w-full bg-[#0a0a0a] border border-white/8 px-4 py-3.5 text-sm rounded-sm focus:border-gold outline-none transition-all text-[#aaa] appearance-none"
                    >
                      <option value="">Select one...</option>
                      <option value="instagram">Instagram</option>
                      <option value="friend">Friend / Referral</option>
                      <option value="season1">Was part of Season 1</option>
                      <option value="google">Google / Search</option>
                      <option value="whatsapp">WhatsApp Group</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-4 border border-white/10 hover:bg-white/5 text-[#666] text-sm font-bold uppercase tracking-widest rounded-sm transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={!isStep2Valid}
                    className={`flex-1 py-4 font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 rounded-sm transition-all ${isStep2Valid ? 'bg-gradient-to-r from-gold to-[#c5a059] hover:from-[#ebd298] hover:to-gold text-[#050505] shadow-lg' : 'bg-white/5 text-[#444] cursor-not-allowed'}`}
                  >
                    Continue to Payment <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3: CONFIRM & PAY ── */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-5"
              >
                {/* Registration Summary */}
                <div className="bg-[#050505] border border-white/8 p-6 sm:p-8 rounded-sm">
                  <h2 className="text-2xl sm:text-3xl font-serif font-black mb-6">Confirm Your Details</h2>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    {[
                      { label: 'Full Name', value: formData.name },
                      { label: 'Email', value: formData.email },
                      { label: 'WhatsApp', value: formData.phone },
                      { label: 'City, State', value: `${formData.city}${formData.state ? `, ${formData.state}` : ''}` },
                      { label: 'Category', value: CATEGORIES.find(c => c.id === formData.category)?.label || '—' },
                      { label: 'Delivery Address', value: formData.address || 'To be provided separately' },
                    ].map(({ label, value }) => (
                      <div key={label} className="border-b border-white/5 pb-3">
                        <div className="text-[10px] uppercase tracking-widest text-[#444] font-bold mb-1">{label}</div>
                        <div className="text-[#fdfbf7] font-medium">{value || '—'}</div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="mt-5 text-[11px] uppercase tracking-widest text-purple-400 hover:text-purple-300 font-bold transition-colors"
                  >
                    ← Edit details
                  </button>
                </div>

                {/* Payment method */}
                <div className="bg-[#050505] border border-white/8 p-6 sm:p-8 rounded-sm">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-[#666] mb-5 flex items-center gap-2">
                    <span className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center text-white text-[10px]">2</span>
                    Secure Payment
                  </h3>
                  <label className="flex items-center gap-3 p-4 border border-gold/40 bg-gold/5 rounded-sm cursor-pointer mb-5">
                    <input type="radio" defaultChecked className="accent-gold w-4 h-4" />
                    <span className="text-sm font-bold flex-grow">Credit Card / Debit Card / UPI / Net Banking</span>
                    <span className="text-xs font-black text-gold shrink-0">Razorpay</span>
                  </label>

                  {/* Agreement */}
                  <label className="flex items-start gap-3 cursor-pointer group mb-6" onClick={() => setAgreed(!agreed)}>
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${agreed ? 'border-gold bg-gold/20' : 'border-white/20 group-hover:border-white/40'}`}>
                      {agreed && <CheckCircle2 className="w-3 h-3 text-gold" />}
                    </div>
                    <span className="text-xs text-[#777] leading-relaxed">
                      I confirm my details above are accurate. I understand the registration fee is non-refundable once submitted. I agree to the{' '}
                      <Link href="/terms-of-service" className="text-gold hover:underline">Terms of Service</Link>{' '}
                      and have read the submission guidelines.
                    </span>
                  </label>

                  <form onSubmit={handleSubmit}>
                    <button
                      type="submit"
                      disabled={!isStep3Valid || submitting}
                      className={`w-full relative group overflow-hidden py-5 font-black text-sm sm:text-base uppercase tracking-[0.2em] flex items-center justify-center gap-3 rounded-sm transition-all ${isStep3Valid && !submitting ? 'bg-gradient-to-r from-gold to-[#c5a059] hover:from-[#ebd298] hover:to-gold text-[#050505] shadow-[0_0_30px_rgba(197,160,89,0.25)]' : 'bg-white/5 text-[#444] cursor-not-allowed'}`}
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#050505]/30 border-t-[#050505] rounded-full animate-spin" />
                          Redirecting to Payment...
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          Complete Registration — ₹299
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                      {/* Sweep shine */}
                      {isStep3Valid && !submitting && (
                        <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 group-hover:translate-x-[500%] transition-transform duration-700" />
                      )}
                    </button>
                  </form>

                  <div className="flex flex-wrap items-center justify-center gap-5 mt-5 text-[#3a3a3a] text-[10px] uppercase tracking-widest font-bold">
                    <span className="flex items-center gap-1.5 text-[#555]"><ShieldCheck className="w-3.5 h-3.5 text-green-500" /> 100% Secure</span>
                    <span className="flex items-center gap-1.5 text-[#555]"><BookOpen className="w-3.5 h-3.5 text-gold" /> Instant Confirmation</span>
                    <span className="flex items-center gap-1.5 text-[#555]"><Trophy className="w-3.5 h-3.5 text-gold" /> Seat Locked Immediately</span>
                  </div>

                  {/* Payment logos */}
                  <div className="flex items-center justify-center gap-5 mt-6 opacity-25">
                    {['VISA', 'MASTERCARD', 'UPI', 'RAZORPAY', 'RUPAY'].map(m => (
                      <span key={m} className="text-[9px] font-black tracking-widest text-white">{m}</span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-[11px] uppercase tracking-widest text-[#444] hover:text-[#666] font-bold transition-colors"
                >
                  ← Back to category selection
                </button>
              </motion.div>
            )}
          </div>

          {/* ═══════════════════════════════════════════
              RIGHT COLUMN: ORDER SUMMARY (STICKY)
          ═══════════════════════════════════════════ */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-5">

              {/* Order Summary */}
              <div className="bg-[#0a0a0a] border border-white/8 rounded-sm overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                <div className="absolute top-0 right-0 bg-gold px-4 py-1.5 text-[#050505] text-[8px] font-black uppercase tracking-[0.25em]">
                  Your Order
                </div>

                {/* Visual hero */}
                <div className="relative h-36 bg-gradient-to-br from-[#0d0118] via-[#1a0a2e] to-[#050505] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: 'repeating-linear-gradient(45deg, rgba(197,160,89,0.1) 0, rgba(197,160,89,0.1) 1px, transparent 0, transparent 50%)', backgroundSize: '12px 12px' }} />
                  <div className="text-center relative z-10">
                    <Feather className="w-10 h-10 text-gold/60 mx-auto mb-2" strokeWidth={1} />
                    <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold/70">Poetry Festival</div>
                    <div className="font-serif font-black text-lg text-[#fdfbf7]">Season 2</div>
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  <div>
                    <h3 className="font-serif font-black text-lg leading-tight mb-1">Poetry Festival — Season 2</h3>
                    <p className="text-[11px] text-[#555] uppercase tracking-widest font-light">Standard Entry Package</p>
                    {formData.category && (
                      <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-purple-900/20 border border-purple-700/30 rounded-full text-[10px] font-bold text-purple-300 uppercase tracking-wider">
                        {CATEGORIES.find(c => c.id === formData.category)?.icon}
                        {CATEGORIES.find(c => c.id === formData.category)?.label}
                      </div>
                    )}
                  </div>

                  {/* What you get */}
                  <div className="border-t border-white/5 pt-5">
                    <div className="text-[10px] uppercase tracking-widest font-black text-gold mb-4">What You Get Today:</div>
                    <ul className="space-y-3.5">
                      {[
                        { value: '₹800', label: 'Published in Season 2 Anthology', sub: 'Real printed book. Couriered to your home.' },
                        { value: '₹400', label: 'Certificate of Excellence', sub: 'Physically printed, signed & delivered.' },
                        { value: '₹200', label: 'Personal Appreciation Letter', sub: 'Physical home delivery. Not an email.' },
                        { value: '₹300', label: 'Hall of Fame Feature', sub: 'Permanent Inkfetish digital record.' },
                        { value: 'Free', label: 'Zoom Ceremony Invite', sub: 'Attend the live results event.' },
                        { value: '🏆 Chance', label: 'Compete for ₹13,500+ Prizes', sub: 'Top 3 win cash, medals & trophies.' },
                      ].map(({ value, label, sub }) => (
                        <li key={label} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-medium text-[#fdfbf7] leading-snug">{label}</div>
                            <div className="text-[11px] text-[#555] font-light mt-0.5">{sub}</div>
                          </div>
                          <span className="text-[10px] font-bold text-[#444] line-through shrink-0">{value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing */}
                  <div className="border-t border-white/5 pt-5 space-y-2">
                    <div className="flex justify-between text-xs text-[#555] uppercase tracking-widest font-bold">
                      <span>Total Real Value</span>
                      <span className="line-through">₹1,700+</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-xs text-[#fdfbf7] uppercase tracking-widest font-black">You Pay Today</span>
                      <div className="text-right">
                        <span className="text-4xl font-serif font-black text-gold">₹299</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-[#444] font-light">One-time entry fee. No hidden charges. No recurring payments.</p>
                  </div>
                </div>
              </div>

              {/* Iron-Clad Guarantee */}
              <div className="bg-[#050505] border border-green-900/25 rounded-sm p-5 flex gap-4 items-start">
                <div className="w-11 h-11 rounded-full bg-green-900/20 border border-green-800/40 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <div className="text-sm font-black text-[#fdfbf7] mb-1.5">The Iron-Clad Guarantee</div>
                  <p className="text-xs text-[#666] font-light leading-relaxed">
                    Season 1: 150 poets. 150 certificates delivered. 1 published anthology. 0 broken promises.
                    <strong className="text-white font-medium block mt-1">Every promise we made — we kept. Season 2 is no different.</strong>
                  </p>
                </div>
              </div>

              {/* Social proof */}
              <div className="bg-[#050505] border border-white/5 rounded-sm p-5">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />)}
                  <span className="text-[10px] text-[#555] font-bold uppercase tracking-widest ml-2">Season 1 Review</span>
                </div>
                <p className="text-xs text-[#888] italic leading-relaxed">
                  "When the anthology arrived at my door I actually teared up. Everything they promised — they delivered. This is the most legitimate writing contest I've found in India."
                </p>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
                  <div className="w-6 h-6 rounded-full bg-purple-900/40 border border-purple-800/40 flex items-center justify-center text-[9px] font-black text-purple-300">A</div>
                  <div>
                    <div className="text-[10px] font-bold text-[#fdfbf7]">Aditi Sharma</div>
                    <div className="text-[9px] text-[#444]">Delhi · Season 1 Participant</div>
                  </div>
                </div>
              </div>

              {/* Seats remaining */}
              <div className="border border-red-900/25 bg-red-900/5 rounded-sm p-4 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                <p className="text-xs text-red-300 font-bold uppercase tracking-widest">
                  Only 87 of 250 seats remaining — no extensions once full
                </p>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
