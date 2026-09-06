'use client';

import React, { useState, useEffect } from 'react';
import { load } from '@cashfreepayments/cashfree-js';
import { motion } from 'framer-motion';
import { 
  Trophy, Star, ShieldCheck, Clock, BookOpen, 
  PenTool, CheckCircle2, ChevronRight, Award, Zap, 
  Users, Globe, Scale, Gift, Landmark, GraduationCap,
  Calendar, Lock, ArrowRight, Sparkles, Check
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const testimonialsRow1 = [
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897590/WhatsApp_Image_2026-03-23_at_7.03.30_PM-compressed_fsgkug.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897591/WhatsApp_Image_2026-03-23_at_7.03.31_PM_3_-compressed_ofwyil.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897591/WhatsApp_Image_2026-03-23_at_7.03.31_PM_4_-compressed_dnisid.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897592/WhatsApp_Image_2026-03-23_at_7.03.31_PM_5_-compressed_hgy6j1.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897592/WhatsApp_Image_2026-03-28_at_11.47.30_PM_1_-compressed_abkbxy.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897593/WhatsApp_Image_2026-03-31_at_11.00.31_PM-compressed_a58ono.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897593/WhatsApp_Image_2026-04-01_at_6.40.37_AM-compressed_eibjs4.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897594/WhatsApp_Image_2026-04-01_at_6.40.55_AM_1_-compressed_j51ngs.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897594/WhatsApp_Image_2026-04-02_at_5.17.33_PM_2_-compressed_sz4wld.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897595/WhatsApp_Image_2026-04-02_at_5.17.33_PM_3_-compressed_kosajj.webp',
];

const testimonialsRow2 = [
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897595/WhatsApp_Image_2026-04-02_at_5.42.20_PM_1_-compressed_khfil0.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897596/WhatsApp_Image_2026-04-02_at_5.42.20_PM-compressed_sq3utn.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897596/WhatsApp_Image_2026-04-03_at_10.52.04_AM_1_-compressed_pp9tww.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897597/WhatsApp_Image_2026-04-03_at_10.52.05_AM_1_-compressed_uphqxg.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897597/WhatsApp_Image_2026-04-03_at_10.52.05_AM_2_-compressed_m2qlui.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897597/WhatsApp_Image_2026-04-04_at_12.20.06_PM_1_-compressed_lrqjv2.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897598/WhatsApp_Image_2026-04-07_at_8.39.44_PM_1_-compressed_gjnlck.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897598/WhatsApp_Image_2026-04-07_at_8.39.44_PM_2_-compressed_hfr0wv.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897599/WhatsApp_Image_2026-04-07_at_8.39.44_PM-compressed_ztxsge.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897599/WhatsApp_Image_2026-04-09_at_2.53.04_PM-compressed_wsnhmu.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897600/WhatsApp_Image_2026-04-09_at_2.59.25_PM-compressed_in2led.webp',
];

const testimonialsRow3 = [
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897711/WhatsApp_Image_2026-04-01_at_1.54.05_PM_1_-compressed_eoiarj.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897712/WhatsApp_Image_2026-04-01_at_1.54.06_PM_2_-compressed_l5bsna.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897712/WhatsApp_Image_2026-04-01_at_1.54.06_PM_3_-compressed_czwtzu.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897713/WhatsApp_Image_2026-04-01_at_1.54.07_PM_1_-compressed_slt2mj.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897714/WhatsApp_Image_2026-04-01_at_1.54.07_PM_2_-compressed_j6w9sn.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897715/WhatsApp_Image_2026-04-01_at_1.54.07_PM_3_-compressed_moo9ra.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897715/WhatsApp_Image_2026-04-07_at_12.09.27_AM_1_-compressed_ugjy5e.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897716/WhatsApp_Image_2026-04-07_at_12.09.27_AM-compressed_bzgl8t.webp',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1776802129/WhatsApp_Image_2026-04-22_at_1.37.09_AM_1_v2i3bu.jpg',
  'https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1776802129/WhatsApp_Image_2026-04-22_at_1.37.09_AM_2_d7vvc7.jpg',
];

import { savePeopleChoiceNomination, updateNominationPlan } from '@/services/peopleChoiceService';

interface VerifiedOrderData {
  order_id: string;
  order_status: string;
  order_amount: number;
  order_tags?: { email?: string; name?: string; plan?: string; };
}

const LS_KEY = 'pca_nomination_id';

type PageState = 'loading' | 'form' | 'paid';

interface StoredNomination {
  nominationId: string;
  name: string;
  email: string;
  age: string;
}

export default function PeopleChoiceClient() {
  const router = useRouter();
  const [pageState, setPageState] = useState<PageState>('loading');
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    age: '',
    whatsapp: ''
  });
  const [activeNominationId, setActiveNominationId] = useState<string | null>(null);
  const [paidNomination, setPaidNomination] = useState<StoredNomination | null>(null);
  const [selectedPlan] = useState<number>(1); // ₹1 for testing, change to 449 for production
  const [isStep1Submitting, setIsStep1Submitting] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // On mount: check localStorage for existing nomination and its payment status
  useEffect(() => {
    const storedId = localStorage.getItem(LS_KEY);
    if (!storedId) {
      setPageState('form');
      return;
    }

    fetch(`/api/people-choice/nominate?nomination_id=${storedId}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.found) {
          localStorage.removeItem(LS_KEY);
          setPageState('form');
          return;
        }
        if (data.payment_status === 'PAID') {
          setPaidNomination({
            nominationId: storedId,
            name: data.name,
            email: data.email,
            age: data.age,
          });
          setPageState('paid');
        } else {
          setActiveNominationId(storedId);
          setFormData((prev) => ({ ...prev, fullName: data.name, email: data.email, age: data.age }));
          setStep(2);
          setPageState('form');
        }
      })
      .catch(() => setPageState('form'));
  }, []);

  // Check if Cashfree redirected back with order_id in URL (fallback for _self redirect)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('order_id');
    if (!orderId || !orderId.startsWith('pca_')) return;

    fetch(`/api/cashfree/verify-order?order_id=${orderId}`)
      .then((r) => r.json())
      .then((data: VerifiedOrderData) => {
        if (data.order_status === 'PAID') {
          localStorage.setItem(LS_KEY, orderId);
          router.push(
            `/people-choice-award/thank-you?name=${encodeURIComponent(data.order_tags?.name || '')}&email=${encodeURIComponent(data.order_tags?.email || '')}&category=${encodeURIComponent(data.order_tags?.plan || '')}&plan=${data.order_amount}&order_id=${orderId}`
          );
        }
      })
      .catch(() => {});
  }, []);

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.age) return;

    setIsStep1Submitting(true);
    try {
      const res = await savePeopleChoiceNomination(formData);
      if (res.nominationId) {
        setActiveNominationId(res.nominationId);
        localStorage.setItem(LS_KEY, res.nominationId);
      }
    } catch (err) {
      console.error('Non-blocking Firestore save warning:', err);
    } finally {
      setIsStep1Submitting(false);
      setStep(2);
      setTimeout(() => {
        const formEl = document.getElementById('nominate-form');
        if (formEl) formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  const handlePayment = async () => {
    if (!activeNominationId) return;
    setIsPaymentLoading(true);
    setPaymentError(null);

    try {
      // 1. Update plan status to PENDING in Firestore
      await updateNominationPlan(activeNominationId, selectedPlan);

      // 2. Create Cashfree order on backend
      const res = await fetch('/api/cashfree/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: selectedPlan,
          customerName: formData.fullName,
          customerEmail: formData.email,
          customerPhone: formData.whatsapp,
          plan: selectedPlan,
          source: 'people_choice',
          providedOrderId: activeNominationId,
        }),
      });

      const orderData = await res.json();
      if (!res.ok) throw new Error(orderData.error || 'Failed to create payment order.');

      // 3. Load Cashfree SDK and open modal
      const cashfree = await load({
        mode: (process.env.NEXT_PUBLIC_CASHFREE_MODE as 'production' | 'sandbox') || 'production',
      });

      await cashfree.checkout({
        paymentSessionId: orderData.payment_session_id,
        redirectTarget: '_modal',
      });

      // 4. Modal closed — verify payment
      const verifyRes = await fetch(`/api/cashfree/verify-order?order_id=${activeNominationId}`);
      const verifyData: VerifiedOrderData = await verifyRes.json();

      if (verifyData.order_status === 'PAID') {
        // Mark localStorage so returning users skip form
        localStorage.setItem(LS_KEY, activeNominationId);
        router.push(
          `/people-choice-award/thank-you?name=${encodeURIComponent(formData.fullName)}&email=${encodeURIComponent(formData.email)}&category=${encodeURIComponent(formData.age)}&plan=${selectedPlan}&order_id=${activeNominationId}`
        );
      } else {
        setPaymentError('Payment was not completed. Please try again.');
        setIsPaymentLoading(false);
      }
    } catch (err: unknown) {
      console.error('Payment error:', err);
      setPaymentError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
      setIsPaymentLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070605] text-[#f5f0e1] font-sans selection:bg-[#d4af37] selection:text-black relative overflow-x-hidden pb-16 sm:pb-0">
      
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[15%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,#aa771c_0%,transparent_70%)] opacity-20 blur-[100px] animate-pulse" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,#d4af37_0%,transparent_70%)] opacity-15 blur-[120px] animate-pulse" />
      </div>

      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 bg-[#070605]/85 backdrop-blur-md border-b border-[#d4af37]/20 py-2 px-4 shadow-lg shadow-black/40">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-3">
          <img 
            src="/images/inkfetish_logo.png" 
            alt="Inkfetish Publication" 
            className="w-8 h-8 rounded-full object-cover border border-[#d4af37]/30 shadow-[0_0_10px_rgba(212,175,55,0.3)]"
          />
          <span className="font-serif text-sm font-semibold tracking-wider text-[#f3e5ab]">
            Inkfetish Publication
          </span>
        </div>
      </nav>

      {/* --- TOP SCARCITY BAR --- */}
      <div className="bg-gradient-to-r from-[#1c1408] via-[#2f220d] to-[#1c1408] border-b border-[#d4af37]/25 text-[#f3e5ab] py-2 px-3 text-center text-xs tracking-widest font-semibold flex items-center justify-center gap-2">
        <span className="animate-ping inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75" />
        <span>Strictly Limited to <strong>250 Participants</strong> — Registrations Closing Soon</span>
      </div>

      {/* --- PAYMENT SUCCESS BANNER MODAL --- */}
      {/* Removed: handled by redirect to thank-you page after verify */}

      {/* --- HERO & NOMINATION SECTION --- */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typography & Hook */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Emblem Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-flex items-center gap-2 bg-[#17140e] border border-[#d4af37]/40 px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.15)]"
            >
              <Trophy className="w-4 h-4 text-[#d4af37]" />
              <span className="text-[11px] font-serif uppercase tracking-[0.25em] text-[#f3e5ab] font-bold">
                The Grand People's Choice 2026
              </span>
            </motion.div>

            {/* PEOPLE CHOICE AWARD Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4"
            >
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wider leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] drop-shadow-[0_4px_15px_rgba(212,175,55,0.2)]">
                PEOPLE CHOICE
              </h1>
              <div className="flex items-center justify-center lg:justify-start gap-3 mt-1.5 text-xs sm:text-sm font-serif tracking-[0.45em] text-[#e8d595] uppercase">
                <span>✦</span>
                <span>A W A R D</span>
                <span>✦</span>
              </div>
            </motion.div>

            {/* Glowing separator */}
            <div className="w-3/4 max-w-sm h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent my-4" />

            {/* The BIG Question Hook */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <span className="text-xs sm:text-sm tracking-[0.3em] font-serif uppercase text-gray-400">
                WHAT IF
              </span>
              <div className="font-serif text-5xl sm:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-[#fcf6ba] to-[#d4af37]">
                2 LAKH
              </div>
              <p className="font-serif text-base sm:text-lg lg:text-xl text-[#f3e5ab] uppercase tracking-wider leading-snug">
                People had the power to choose the top 20 writers &amp; poets?
              </p>
            </motion.div>

            <p className="mt-4 text-sm sm:text-base text-gray-400 max-w-lg leading-relaxed font-light">
              Enter India's most democratic literary honor. Powered by 200,000+ voting readers and backed by traditional publishing powerhouse Inkfetish.
            </p>
          </div>

          {/* Right Column: Form / Paid State */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className="lg:col-span-5 w-full scroll-mt-20"
            id="nominate-form"
          >
            <div className="bg-[#120f0a]/95 backdrop-blur-xl border border-[#d4af37]/40 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-[0_12px_45px_rgba(0,0,0,0.9)] relative overflow-hidden">
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#d4af37]/15 rounded-full blur-3xl pointer-events-none" />

              {/* --- LOADING STATE --- */}
              {pageState === 'loading' && (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <div className="w-8 h-8 border-2 border-[#d4af37]/30 border-t-[#d4af37] rounded-full animate-spin" />
                  <p className="text-xs text-gray-500 uppercase tracking-widest">Checking your registration...</p>
                </div>
              )}

              {/* --- PAID STATE: Already registered & paid --- */}
              {pageState === 'paid' && paidNomination && (
                <div className="space-y-5 text-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#bf953f] to-[#aa771c] p-0.5 mx-auto shadow-[0_0_25px_rgba(212,175,55,0.4)]">
                    <div className="w-full h-full rounded-full bg-[#120f0a] flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7 text-[#d4af37]" />
                    </div>
                  </div>
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#d4af37]">You're Registered!</h2>
                    <p className="text-xs text-gray-400 mt-1">Welcome back, <strong className="text-white">{paidNomination.name}</strong></p>
                  </div>
                  <div className="bg-black/40 border border-[#d4af37]/25 rounded-xl px-4 py-3 text-left space-y-1">
                    <div className="text-[9px] uppercase tracking-widest text-gray-500">Nomination ID</div>
                    <div className="font-mono text-xs text-[#d4af37] truncate">{paidNomination.nominationId}</div>
                  </div>
                  <Link
                    href={`/people-choice-award/submit?nomination_id=${paidNomination.nominationId}&name=${encodeURIComponent(paidNomination.name)}`}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-bold text-sm uppercase tracking-wider text-black bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(212,175,55,0.3)] cursor-pointer"
                  >
                    <PenTool className="w-4 h-4" />
                    <span>Submit My Entry →</span>
                  </Link>
                  <Link
                    href={`/people-choice-award/thank-you?name=${encodeURIComponent(paidNomination.name)}&email=${encodeURIComponent(paidNomination.email)}&order_id=${paidNomination.nominationId}`}
                    className="block text-xs text-gray-500 hover:text-[#d4af37] transition-colors"
                  >
                    View Registration Slip
                  </Link>
                  <button
                    type="button"
                    onClick={() => { localStorage.removeItem(LS_KEY); setPageState('form'); setStep(1); setPaidNomination(null); }}
                    className="block w-full text-[10px] text-gray-600 hover:text-gray-400 transition-colors cursor-pointer"
                  >
                    Not you? Register with a different account
                  </button>
                </div>
              )}

              {/* --- FORM STATE --- */}
              {pageState === 'form' && (
                <>

              <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all ${step === 1 ? 'bg-gradient-to-r from-[#bf953f] to-[#aa771c] text-black shadow' : 'bg-green-500 text-black'}`}>
                    {step === 1 ? '1' : '✓'}
                  </span>
                  <span className={`text-[11px] sm:text-xs font-serif font-bold uppercase tracking-wider ${step === 1 ? 'text-[#f3e5ab]' : 'text-gray-400'}`}>
                    Your Details
                  </span>
                </div>

                <div className="h-px w-6 sm:w-8 bg-white/20" />

                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all ${step === 2 ? 'bg-gradient-to-r from-[#bf953f] to-[#aa771c] text-black shadow' : 'bg-white/10 text-gray-500'}`}>
                    2
                  </span>
                  <span className={`text-[11px] sm:text-xs font-serif font-bold uppercase tracking-wider ${step === 2 ? 'text-[#f3e5ab]' : 'text-gray-500'}`}>
                    Select Plan
                  </span>
                </div>
              </div>

              {/* --- STEP 1: WRITER DETAILS --- */}
              {step === 1 && (
                <form onSubmit={handleStep1Submit} className="space-y-3.5">
                  <div className="text-center mb-3">
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#d4af37] tracking-wide">
                      Register Yourself
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">
                      Fill in your details below to begin your registration.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Jane Doe"
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 sm:py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 sm:py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <div className="flex items-center bg-black/60 border border-white/15 rounded-xl overflow-hidden focus-within:border-[#d4af37] focus-within:ring-1 focus-within:ring-[#d4af37]/50 transition-all">
                      <div className="flex items-center gap-1.5 px-3 py-2.5 sm:py-3 border-r border-white/10 shrink-0">
                        <span className="text-base leading-none">🇮🇳</span>
                        <span className="text-sm text-gray-300 font-semibold">+91</span>
                      </div>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={formData.whatsapp}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setFormData({ ...formData, whatsapp: val });
                        }}
                        placeholder="9876543210"
                        className="flex-1 bg-transparent px-3 py-2.5 sm:py-3 text-sm text-white placeholder-gray-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                      Age *
                    </label>
                    <select
                      required
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full bg-[#16120b] border border-white/15 rounded-xl px-3.5 py-2.5 sm:py-3 text-sm text-white focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/50 transition-all"
                    >
                      <option value="" disabled>Select your age range</option>
                      <option value="under_18">Under 18</option>
                      <option value="18_25">18 – 25</option>
                      <option value="26_35">26 – 35</option>
                      <option value="36_45">36 – 45</option>
                      <option value="46_60">46 – 60</option>
                      <option value="above_60">Above 60</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isStep1Submitting}
                    className="w-full mt-2 py-3 sm:py-3.5 px-5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-black bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 min-h-[44px]"
                  >
                    {isStep1Submitting ? (
                      <span>Saving Nomination...</span>
                    ) : (
                      <>
                        <span>Proceed to Select Plan</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] sm:text-[11px] text-gray-500 text-center pt-1">
                    🔒 100% Secure &amp; Unbiased Reader-Driven Award System
                  </p>
                </form>
              )}

              {/* --- STEP 2: SELECT ENTRY PLAN --- */}
              {step === 2 && (
                <div className="space-y-3 sm:space-y-4">
                  {/* Prominent Candidate Summary & Edit Details Bar */}
                  <div className="flex items-center justify-between bg-black/50 border border-[#d4af37]/35 rounded-xl px-3.5 py-2.5 shadow-sm">
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse flex-shrink-0" />
                      <span className="text-xs font-medium text-white truncate max-w-[130px] sm:max-w-[180px]">
                        {formData.fullName}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-1.5 bg-[#d4af37]/20 hover:bg-[#d4af37]/35 border border-[#d4af37]/70 text-[#f3e5ab] hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all active:scale-95 shadow-[0_0_15px_rgba(212,175,55,0.25)] cursor-pointer flex-shrink-0"
                    >
                      <PenTool className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Edit Details</span>
                    </button>
                  </div>

                  <div className="text-center">
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#d4af37] tracking-wide">
                      Select Entry Plan
                    </h2>
                    <p className="text-xs text-gray-300 mt-1">
                      Choose your entry fee package to activate your nomination.
                    </p>
                  </div>

                  {/* Single Touch-optimized Plan Option */}
                  <div className="space-y-3">
                    
                    {/* Plan Option: ₹449 Entry */}
                    <div className="relative rounded-xl p-3.5 sm:p-4 border bg-[#1e170e] border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.25)] ring-1 ring-[#d4af37]/30 select-none">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 border-[#d4af37] bg-[#d4af37]">
                            <div className="w-2 h-2 rounded-full bg-black" />
                          </div>
                          <div>
                            <h3 className="font-serif font-bold text-white text-sm sm:text-base leading-tight">Official Entry Plan</h3>
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider block mt-0.5">Complete Nomination Package</span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="font-serif font-bold text-lg sm:text-xl text-[#f3e5ab]">₹449</div>
                          <span className="text-[9px] sm:text-[10px] text-gray-400 block">One-time Fee</span>
                        </div>
                      </div>

                      <ul className="mt-2.5 space-y-1 text-xs text-gray-300 border-t border-[#d4af37]/20 pt-2.5">
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" />
                          <span>Official Reader Voting Entry</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" />
                          <span>Certificate of Participation</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" />
                          <span>Hall of Fame Certificate</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" />
                          <span>Your Write-up Published in a Book</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" />
                          <span>Eligible for Top 20 National Awards</span>
                        </li>
                      </ul>
                    </div>

                  </div>

                  {paymentError && (
                    <div className="bg-red-950/80 border border-red-500/50 rounded-xl p-3 text-center text-xs text-red-200">
                      {paymentError}
                    </div>
                  )}

                  {/* Standard In-Card Button (Visible desktop & mobile) */}
                  <button
                    type="button"
                    onClick={handlePayment}
                    disabled={isPaymentLoading}
                    className="w-full mt-2 py-3.5 px-5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-black bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 min-h-[46px]"
                  >
                    {isPaymentLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        <span>Opening Payment...</span>
                      </>
                    ) : (
                      <>
                        <span>Pay ₹{selectedPlan} &amp; Complete Registration</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] sm:text-[11px] text-gray-400 text-center pt-0.5 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Instant Payment via UPI, Cards, NetBanking &amp; Wallets</span>
                  </p>
                </div>
              )}

              </>
              )}

            </div>
          </motion.div>

        </div>
      </main>

      {/* --- MOBILE STICKY BOTTOM PAYMENT BAR (Step 2 Only) --- */}
      {pageState === 'form' && step === 2 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0c0906]/95 border-t border-[#d4af37]/40 p-3 backdrop-blur-xl block sm:hidden shadow-[0_-10px_30px_rgba(0,0,0,0.9)]">
          <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
            <div>
              <div className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">
                Official Entry Plan
              </div>
              <div className="font-serif font-bold text-lg text-[#fcf6ba]">
                ₹{selectedPlan}
              </div>
            </div>
            <button
              type="button"
              onClick={handlePayment}
              disabled={isPaymentLoading}
              className="flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] active:scale-95 shadow-md flex items-center justify-center gap-1.5 disabled:opacity-60"
            >
              {isPaymentLoading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  <span>Opening...</span>
                </>
              ) : (
                <>
                  <span>Pay ₹{selectedPlan} Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* --- SHINY TRANSITION BANNER --- */}
      <section className="relative z-10 w-full bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] py-4 px-4 text-center shadow-lg shadow-[#d4af37]/20 overflow-hidden">
        <p className="text-black font-bold text-sm sm:text-base md:text-lg tracking-wide max-w-4xl mx-auto leading-snug">
          ✦ Join the most prestigious writing and poetry award decided entirely by the readers. Register now to be part of the legacy. ✦
        </p>
      </section>

      {/* --- ABOUT THE AWARD (Split Layout) --- */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-[#120f0a]/70 border border-[#d4af37]/25 rounded-3xl p-8 sm:p-12 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs uppercase font-serif tracking-[0.2em] text-[#d4af37]">
                <span>✦</span>
                <span>The Democratic Revolution</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#f3e5ab]">
                What is the People's Choice Award?
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base font-light">
                The People's Choice Award is a revolutionary literary platform where readers wield the ultimate power. Instead of a closed, behind-the-scenes jury deciding winners, <strong>200,000 passionate readers</strong> will vote to crown the top 20 Writers &amp; Poets.
              </p>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base font-light">
                It is the truest, most unbiased test of reader connection, literary resonance, and audience love.
              </p>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative p-2 rounded-2xl bg-gradient-to-br from-[#d4af37]/30 via-transparent to-[#aa771c]/20 border border-[#d4af37]/40 shadow-[0_0_40px_rgba(212,175,55,0.25)] max-w-[340px] w-full">
                <img 
                  src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1788291545/ChatGPT_Image_Aug_25_2026_10_31_47_PM_1_ittzzw.png" 
                  alt="People's Choice Award Official Statuette" 
                  className="rounded-xl object-contain w-full h-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- TRUST INDICATOR CARDS --- */}
      <section className="relative z-10 border-y border-[#d4af37]/20 bg-[#0d0a06]/90 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="bg-[#15110a] border border-[#d4af37]/25 rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform shadow-lg shadow-black/50">
              <Users className="w-8 h-8 text-[#d4af37] mx-auto mb-3" />
              <div className="font-serif font-bold text-base sm:text-lg text-[#f3e5ab]">200,000+</div>
              <div className="text-[11px] uppercase tracking-widest text-gray-400 mt-1">Active Voters</div>
            </div>

            <div className="bg-[#15110a] border border-[#d4af37]/25 rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform shadow-lg shadow-black/50">
              <ShieldCheck className="w-8 h-8 text-[#d4af37] mx-auto mb-3" />
              <div className="font-serif font-bold text-base sm:text-lg text-[#f3e5ab]">100% Transparent</div>
              <div className="text-[11px] uppercase tracking-widest text-gray-400 mt-1">Reader Voting</div>
            </div>

            <div className="bg-[#15110a] border border-[#d4af37]/25 rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform shadow-lg shadow-black/50">
              <Globe className="w-8 h-8 text-[#d4af37] mx-auto mb-3" />
              <div className="font-serif font-bold text-base sm:text-lg text-[#f3e5ab]">Top 20 Laureates</div>
              <div className="text-[11px] uppercase tracking-widest text-gray-400 mt-1">National Recognition</div>
            </div>

            <div className="bg-[#15110a] border border-[#d4af37]/25 rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform shadow-lg shadow-black/50">
              <Scale className="w-8 h-8 text-[#d4af37] mx-auto mb-3" />
              <div className="font-serif font-bold text-base sm:text-lg text-[#f3e5ab]">Unbiased Selection</div>
              <div className="text-[11px] uppercase tracking-widest text-gray-400 mt-1">Audience Powered</div>
            </div>

          </div>
        </div>
      </section>

      {/* --- BENEFITS & REWARDS SECTION (Redesigned Premium) --- */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[#d4af37] font-serif mb-2">
            <span className="w-10 h-px bg-[#d4af37]/40" />
            <span>Rewards &amp; Recognition</span>
            <span className="w-10 h-px bg-[#d4af37]/40" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
            Top 20 Writers &amp; Poets <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c]">
              Win More Than Just an Award
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mt-3 max-w-2xl mx-auto">
            Recognition, legacy and extraordinary publishing rewards await the chosen voices.
          </p>
        </div>

        {/* Hero Card for Top 20 Award */}
        <div className="bg-gradient-to-br from-[#1c160c] via-[#120f0a] to-[#1c160c] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-10 mb-8 shadow-[0_0_50px_rgba(212,175,55,0.15)] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Text Details */}
            <div className="lg:col-span-4 space-y-4 text-center lg:text-left">
              <span className="inline-block bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#f3e5ab] text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1 rounded-full">
                TOP 20 WINNERS
              </span>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <Trophy className="w-8 h-8 text-[#d4af37] drop-shadow-[0_0_15px_rgba(212,175,55,0.6)] flex-shrink-0" />
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#f3e5ab] leading-tight">
                  Prestigious Award + Home Delivery
                </h3>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                Every one of the Top 20 receives a stunning, custom-crafted physical award statuette and recognition kit delivered straight to their doorstep across India.
              </p>
            </div>

            {/* Center: Award Picture */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative p-2 rounded-2xl bg-gradient-to-b from-[#d4af37]/20 via-transparent to-[#d4af37]/10 border border-[#d4af37]/35 shadow-[0_0_35px_rgba(212,175,55,0.2)] max-w-[280px] w-full">
                <img 
                  src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1788291912/ChatGPT_Image_Sep_2_2026_01_13_09_AM_1_vb4vp2.png" 
                  alt="Top 20 Official Award Kit" 
                  className="rounded-xl object-contain w-full h-auto drop-shadow-[0_8px_20px_rgba(0,0,0,0.7)] hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Right: Inclusions Checklist */}
            <div className="lg:col-span-4 lg:border-l lg:border-[#d4af37]/20 lg:pl-8 space-y-3">
              <div className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2 text-center lg:text-left">
                Winner Inclusions:
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                <span>Physical Golden Statuette</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                <span>Official Recognition Certificate</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                <span>Free Safe Home Delivery</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                <span>Permanent Heritage Wall Enshrinement</span>
              </div>
            </div>

          </div>
        </div>

        {/* 3 Sub-Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <div className="bg-[#120f0a]/90 border border-[#d4af37]/25 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1.5 transition-transform">
            <div>
              <span className="text-[10px] font-serif uppercase tracking-widest text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                TOP 3 WINNERS
              </span>
              <BookOpen className="w-8 h-8 text-[#d4af37] mt-4 mb-3" />
              <h4 className="font-serif text-lg font-bold text-[#f3e5ab] mb-2">
                Free Solo Book Publication
              </h4>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                The Top 3 authors receive free solo book publishing by Inkfetish — cover design, editing, ISBN, and global distribution.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 text-xs font-bold text-[#d4af37]">
              🔥 Highest Value Prize
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1a140b] to-[#120f0a] border border-[#d4af37]/40 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1.5 transition-transform shadow-[0_0_25px_rgba(212,175,55,0.1)]">
            <div>
              <span className="text-[10px] font-serif uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30 px-2.5 py-1 rounded-full">
                ALL TOP 20
              </span>
              <Gift className="w-8 h-8 text-[#d4af37] mt-4 mb-3" />
              <h4 className="font-serif text-lg font-bold text-[#f3e5ab] mb-2">
                Exclusive Goodies Kit
              </h4>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                All Top 20 winners receive curated exclusive author merchandise and author kit goodies.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-[#d4af37]/20 text-xs font-bold text-[#d4af37]">
              ✦ Worth ₹25,000
            </div>
          </div>

          <div className="bg-[#120f0a]/90 border border-[#d4af37]/25 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1.5 transition-transform">
            <div>
              <span className="text-[10px] font-serif uppercase tracking-widest text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                ALL TOP 20
              </span>
              <Landmark className="w-8 h-8 text-[#d4af37] mt-4 mb-3" />
              <h4 className="font-serif text-lg font-bold text-[#f3e5ab] mb-2">
                Heritage Wall Recognition
              </h4>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Your name immortalized forever on the official People's Choice Heritage Wall on Inkfetish.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 text-xs font-bold text-gray-400">
              ♾️ Permanent Digital Legacy
            </div>
          </div>

        </div>

        {/* 2 Extra Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-8">

          <div className="bg-gradient-to-br from-[#1a140b] to-[#120f0a] border border-[#d4af37]/40 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1.5 transition-transform shadow-[0_0_25px_rgba(212,175,55,0.1)]">
            <div>
              <span className="text-[10px] font-serif uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30 px-2.5 py-1 rounded-full">
                ALL TOP 20
              </span>
              <div className="text-3xl mt-4 mb-3">🎤</div>
              <h4 className="font-serif text-lg font-bold text-[#f3e5ab] mb-2">
                Exclusive Online Interview
              </h4>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Every Top 20 writer will be featured in an exclusive online interview published on the Inkfetish page — reaching 2,10,000+ followers.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-[#d4af37]/20 text-xs font-bold text-[#d4af37]">
              📣 2,10,000+ Audience Reach
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1a140b] to-[#120f0a] border border-[#d4af37]/40 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1.5 transition-transform shadow-[0_0_25px_rgba(212,175,55,0.1)]">
            <div>
              <span className="text-[10px] font-serif uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30 px-2.5 py-1 rounded-full">
                ALL TOP 20
              </span>
              <div className="text-3xl mt-4 mb-3">✍️</div>
              <h4 className="font-serif text-lg font-bold text-[#f3e5ab] mb-2">
                Writer Ambassador Opportunity
              </h4>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Top 20 winners get the opportunity to become Inkfetish Writer Ambassadors — with chances to work as judges and earn through writer-related activities.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-[#d4af37]/20 text-xs font-bold text-[#d4af37]">
              💼 Earn &amp; Grow with Inkfetish
            </div>
          </div>

        </div>

        {/* Every Participant Banner (Updated with 3 specific benefits) */}
        <div className="bg-gradient-to-br from-[#1c160c] via-[#120f0a] to-[#1c160c] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(212,175,55,0.15)] mt-12 relative overflow-hidden">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#d4af37] font-serif font-bold mb-3">
              <Star className="w-4 h-4 fill-[#d4af37]" />
              Benefits For Every Participant
              <Star className="w-4 h-4 fill-[#d4af37]" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Guaranteed Inclusion
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {/* Benefit 1 */}
            <div className="bg-[#0a0805]/80 border border-white/5 rounded-2xl p-5 hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-3">
                <span className="font-serif font-bold text-[#d4af37]">1</span>
              </div>
              <h4 className="font-serif text-base font-bold text-[#fcf6ba] mb-1.5">Certificate of Participation</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Every participant will receive an official People’s Choice Award Certificate of Participation.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-[#0a0805]/80 border border-white/5 rounded-2xl p-5 hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-3">
                <span className="font-serif font-bold text-[#d4af37]">2</span>
              </div>
              <h4 className="font-serif text-base font-bold text-[#fcf6ba] mb-1.5">Hall of Fame Certificate</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Every participant will also receive a special Hall of Fame Certificate as a recognition of their participation and contribution.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-[#0a0805]/80 border border-white/5 rounded-2xl p-5 hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-3">
                <span className="font-serif font-bold text-[#d4af37]">3</span>
              </div>
              <h4 className="font-serif text-base font-bold text-[#fcf6ba] mb-1.5">Published in a Book</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Most importantly, every participant’s write-up will be published in a special book dedicated to the People’s Choice Award.
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* --- 5 STAGES ROADMAP & PROGRESS TIMELINE --- */}
      <section className="relative z-10 border-y border-[#d4af37]/20 bg-gradient-to-b from-[#090704] via-[#0f0c07] to-[#090704] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[#d4af37] font-serif mb-2">
              <span className="w-10 h-px bg-[#d4af37]/40" />
              <span>Roadmap to Glory</span>
              <span className="w-10 h-px bg-[#d4af37]/40" />
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
              Your 5-Stage Path to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c]">Top 20</span>
            </h2>
            <p className="text-xs sm:text-base text-gray-400 mt-2 max-w-2xl mx-auto">
              A transparent, step-by-step tournament timeline from your initial nomination to live national coronation.
            </p>
          </div>

          {/* Desktop Progress Bar Line (Horizontal) */}
          <div className="hidden lg:block relative mb-12">
            {/* Glowing Track Line */}
            <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] shadow-[0_0_15px_rgba(212,175,55,0.4)] z-0 rounded-full" />
            
            {/* 5 Milestone Checkpoint Nodes */}
            <div className="grid grid-cols-5 relative z-10">
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#1c1409] border-2 border-[#d4af37] text-[#f3e5ab] font-serif font-black text-sm flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.5)] ring-4 ring-[#090704]">
                  01
                </div>
                <span className="text-[11px] font-bold text-[#d4af37] mt-3 uppercase tracking-wider">Nomination</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#1c1409] border-2 border-[#d4af37] text-[#f3e5ab] font-serif font-black text-sm flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.5)] ring-4 ring-[#090704]">
                  02
                </div>
                <span className="text-[11px] font-bold text-[#d4af37] mt-3 uppercase tracking-wider">Submission</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#1c1409] border-2 border-[#d4af37] text-[#f3e5ab] font-serif font-black text-sm flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.5)] ring-4 ring-[#090704]">
                  03
                </div>
                <span className="text-[11px] font-bold text-[#d4af37] mt-3 uppercase tracking-wider">Reader Voting</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#1c1409] border-2 border-[#d4af37] text-[#f3e5ab] font-serif font-black text-sm flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.5)] ring-4 ring-[#090704]">
                  04
                </div>
                <span className="text-[11px] font-bold text-[#d4af37] mt-3 uppercase tracking-wider">Parallel Review</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#bf953f] to-[#aa771c] border-2 border-white text-black font-serif font-black text-sm flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.8)] ring-4 ring-[#090704] animate-pulse">
                  🏆
                </div>
                <span className="text-[11px] font-bold text-[#fcf6ba] mt-3 uppercase tracking-wider">Grand Gala</span>
              </div>

            </div>
          </div>

          {/* Cards Grid (Connected Flow) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            
            {/* Stage 1 */}
            <div className="bg-[#141009]/90 border border-[#d4af37]/30 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-2 transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.6)] group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-serif font-bold text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/25 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    STAGE 01
                  </span>
                  <span className="text-2xl group-hover:scale-110 transition-transform">📝</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#f3e5ab] mb-2">Register</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Fill out the nomination form with your name, category, and writing portfolio or social profile link.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-semibold text-[#d4af37]/80 flex items-center gap-1">
                <span>⚡ Quick 1-Min Form</span>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="bg-[#141009]/90 border border-[#d4af37]/30 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-2 transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.6)] group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-serif font-bold text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/25 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    STAGE 02
                  </span>
                  <span className="text-2xl group-hover:scale-110 transition-transform">📤</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#f3e5ab] mb-2">Submit Entry</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Submit your masterpiece (poem, story, or article) before the 1st October deadline.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-semibold text-red-400/90 flex items-center gap-1">
                <span>⏳ Closes 1st Oct</span>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="bg-[#141009]/90 border border-[#d4af37]/30 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-2 transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.6)] group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-serif font-bold text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/25 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    STAGE 03
                  </span>
                  <span className="text-2xl group-hover:scale-110 transition-transform">🗳️</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#f3e5ab] mb-2">Voting Starts</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Over 2,10,000+ passionate readers cast verified votes from 5th–8th October to champion their favorite authors.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-semibold text-[#d4af37]/80 flex items-center gap-1">
                <span>👥 200k+ Reader Power</span>
              </div>
            </div>

            {/* Stage 4 */}
            <div className="bg-[#141009]/90 border border-[#d4af37]/30 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-2 transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.6)] group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-serif font-bold text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/25 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    STAGE 04
                  </span>
                  <span className="text-2xl group-hover:scale-110 transition-transform">⚖️</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#f3e5ab] mb-2">Parallel Review</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Senior editorial panel scores entries in parallel to guarantee uncompromising literary merit and quality.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-semibold text-[#d4af37]/80 flex items-center gap-1">
                <span>🔍 100% Fair Evaluation</span>
              </div>
            </div>

            {/* Stage 5 (Grand Finale Card) */}
            <div className="bg-gradient-to-b from-[#251a0b] to-[#141009] border-2 border-[#d4af37]/60 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-2 transition-all duration-300 shadow-[0_0_35px_rgba(212,175,55,0.2)] group md:col-span-2 lg:col-span-1">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-serif font-extrabold text-black bg-gradient-to-r from-[#bf953f] to-[#fcf6ba] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                    GRAND FINALE
                  </span>
                  <span className="text-2xl group-hover:scale-110 transition-transform">🎬</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#fcf6ba] mb-2">Live Zoom Gala</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  The Top 20 are crowned in a live virtual ceremony where national winners and book deals are declared.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#d4af37]/30 text-[11px] font-bold text-[#fcf6ba] flex items-center gap-1">
                <span>🏆 Live Coronation</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- KEY DATES & TIMELINE --- */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#f3e5ab]">
            Key Timeline &amp; Dates
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Mark your calendar — every milestone matters.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="bg-[#120f0a] border border-green-500/30 rounded-2xl p-6 text-center">
            <span className="text-[10px] uppercase font-bold tracking-widest text-green-400 bg-green-950/60 border border-green-500/40 px-2.5 py-0.5 rounded-full">
              LIVE NOW
            </span>
            <div className="text-xs text-gray-400 uppercase tracking-wider mt-4">Registration</div>
            <div className="font-serif text-lg font-bold text-white mt-1">Open Now</div>
          </div>

          <div className="bg-gradient-to-b from-[#24130f] to-[#120f0a] border border-red-500/50 rounded-2xl p-6 text-center shadow-[0_0_25px_rgba(239,68,68,0.15)]">
            <span className="text-[10px] uppercase font-bold tracking-widest text-red-400 bg-red-950/60 border border-red-500/40 px-2.5 py-0.5 rounded-full">
              CLOSING SOON
            </span>
            <div className="text-xs text-gray-400 uppercase tracking-wider mt-4">Submission Deadline</div>
            <div className="font-serif text-lg font-bold text-[#f3e5ab] mt-1">1st October 2026</div>
          </div>

          <div className="bg-[#120f0a] border border-indigo-500/30 rounded-2xl p-6 text-center">
            <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 bg-indigo-950/60 border border-indigo-500/40 px-2.5 py-0.5 rounded-full">
              UPCOMING
            </span>
            <div className="text-xs text-gray-400 uppercase tracking-wider mt-4">Voting Period</div>
            <div className="font-serif text-lg font-bold text-white mt-1">5th–8th October 2026</div>
          </div>

          <div className="bg-[#120f0a] border border-[#d4af37]/30 rounded-2xl p-6 text-center">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30 px-2.5 py-0.5 rounded-full">
              CONFIRMED
            </span>
            <div className="text-xs text-gray-400 uppercase tracking-wider mt-4">Result Declaration</div>
            <div className="font-serif text-lg font-bold text-white mt-1">10th October 2026</div>
          </div>

        </div>
      </section>

      {/* --- STRICT PARTICIPANT LIMIT SECTION --- */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-[#1f170c] via-[#141009] to-[#1f170c] border border-[#d4af37]/40 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-5 text-center md:text-left flex-col md:flex-row">
            <Lock className="w-12 h-12 text-[#d4af37] flex-shrink-0" />
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#f3e5ab]">
                Strictly Limited to <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#d4af37]">250</span> Participants
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
                To guarantee equal visibility and fair voting reach for every participant, nominations will close forever as soon as 250 spots are filled.
              </p>
            </div>
          </div>

          <div className="flex-shrink-0">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#bf953f] to-[#aa771c] text-black font-bold text-xs sm:text-sm uppercase tracking-wider py-3.5 px-6 rounded-xl hover:brightness-110 shadow-lg cursor-pointer"
            >
              <span>Reserve Your Slot</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS AUTO-SLIDER SECTION (Real WhatsApp Cloudinary Images) --- */}
      <section className="relative z-10 w-full py-20 bg-[#060504] border-y border-[#d4af37]/20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-serif mb-2">
            <span>✦</span>
            <span>Real Feedback from Real Authors</span>
            <span>✦</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Writers Who Trusted <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c]">Inkfetish</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            Join over 1,000+ satisfied writers and poets from across India.
          </p>
        </div>

        {/* Track 1: Left Scroll */}
        <div className="relative w-full overflow-hidden py-3 group [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex gap-4 w-max animate-scroll-left group-hover:[animation-play-state:paused]">
            {[...testimonialsRow1, ...testimonialsRow1].map((src, i) => (
              <img 
                key={`t1-${i}`}
                src={src} 
                alt="Author Testimonial" 
                loading="lazy"
                className="h-48 sm:h-56 w-auto max-w-[320px] object-contain rounded-xl bg-[#14100a] border border-[#d4af37]/30 shadow-lg hover:scale-105 hover:border-[#d4af37] transition-all cursor-pointer flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Track 2: Right Scroll */}
        <div className="relative w-full overflow-hidden py-3 group [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex gap-4 w-max animate-scroll-right group-hover:[animation-play-state:paused]">
            {[...testimonialsRow2, ...testimonialsRow2].map((src, i) => (
              <img 
                key={`t2-${i}`}
                src={src} 
                alt="Author Testimonial" 
                loading="lazy"
                className="h-48 sm:h-56 w-auto max-w-[320px] object-contain rounded-xl bg-[#14100a] border border-[#d4af37]/30 shadow-lg hover:scale-105 hover:border-[#d4af37] transition-all cursor-pointer flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Track 3: Left Scroll */}
        <div className="relative w-full overflow-hidden py-3 group [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex gap-4 w-max animate-scroll-left group-hover:[animation-play-state:paused]">
            {[...testimonialsRow3, ...testimonialsRow3].map((src, i) => (
              <img 
                key={`t3-${i}`}
                src={src} 
                alt="Author Testimonial" 
                loading="lazy"
                className="h-48 sm:h-56 w-auto max-w-[320px] object-contain rounded-xl bg-[#14100a] border border-[#d4af37]/30 shadow-lg hover:scale-105 hover:border-[#d4af37] transition-all cursor-pointer flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Trust Stats Bar */}
        <div className="max-w-4xl mx-auto px-4 mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm uppercase tracking-wider text-[#d4af37] font-semibold">
          <span>⭐⭐⭐⭐⭐ 4.9/5 Rating</span>
          <span className="hidden sm:inline text-white/20">|</span>
          <span>1,000+ Happy Participants</span>
          <span className="hidden sm:inline text-white/20">|</span>
          <span>100% Prize Delivery</span>
        </div>
      </section>

      {/* --- ABOUT INKFETISH PUBLICATION --- */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="bg-[#120f0a]/80 border border-[#d4af37]/25 rounded-3xl p-8 sm:p-12 backdrop-blur-md">
          <img 
            src="/images/inkfetish_logo.png" 
            alt="Inkfetish Logo" 
            className="w-14 h-14 rounded-full mx-auto mb-4 border border-[#d4af37]/40 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
          />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#f3e5ab] mb-3">
            Backed by Inkfetish Publication
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-light">
            Inkfetish Publication is a premier traditional publishing house dedicated to unearthing raw talent and bringing extraordinary voices to the forefront of global literature. Join a community of authors who are shaping the future of storytelling.
          </p>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative z-10 border-t border-white/10 bg-[#050403] py-8 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Inkfetish Publication. All rights reserved. People's Choice Award.</p>
      </footer>

    </div>
  );
}
