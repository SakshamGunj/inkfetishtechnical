'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Feather,
  Trophy,
  BookOpen,
  MapPin,
  Mail,
  Phone,
  User,
  Sparkles,
  ChevronLeft,
  Loader2,
  Check,
  X,
  Truck,
  Clock,
  Star,
  Award,
  Ticket
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { CertificateData } from '@/lib/certificate';

function usePersistentTimer(hours: number, key: string) {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const endTimeStr = localStorage.getItem(key);
    let endTime: number;

    if (endTimeStr) {
      endTime = parseInt(endTimeStr, 10);
    } else {
      endTime = Date.now() + hours * 60 * 60 * 1000;
      localStorage.setItem(key, endTime.toString());
    }

    const updateTimer = () => {
      const now = Date.now();
      setTimeLeft(Math.max(0, Math.floor((endTime - now) / 1000)));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [hours, key]);

  if (timeLeft === null) return null;

  const h = Math.floor(timeLeft / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;

  return { h, m, s, isExpired: timeLeft <= 0 };
}

interface HomeDeliveryClientProps {
  id: string;
  initialData: CertificateData | null;
}

type OrderStatus = 'checking' | 'already_ordered' | 'ready';

export default function HomeDeliveryClient({
  id,
  initialData,
}: HomeDeliveryClientProps) {
  const router = useRouter();
  const timer = usePersistentTimer(32, `offer_timer_${id}`);
  const [status, setStatus] = useState<OrderStatus>('checking');
  const [existingOrderDetails, setExistingOrderDetails] = useState<any>(null);

  // Retrieve first name for personalized greeting
  const firstName = initialData ? initialData.name.split(' ')[0] : 'Poet';

  // Run dynamic check on mount to see if this certificate is already ordered
  useEffect(() => {
    const checkDbStatus = async () => {
      // 1. Check local storage first for quick response
      const localStatus = localStorage.getItem(`ordered_homedelivery_${id}`);
      if (localStatus === 'paid') {
        setStatus('already_ordered');
        return;
      }

      // 2. Perform backend check to ensure accuracy across devices
      try {
        const res = await fetch(`/api/homedelivery/check?id=${id}`);
        const data = await res.json();
        
        if (data.ordered) {
          localStorage.setItem(`ordered_homedelivery_${id}`, 'paid');
          setExistingOrderDetails(data.order);
          setStatus('already_ordered');
        } else {
          setStatus('ready');
        }
      } catch (err) {
        console.error('Error checking delivery order status:', err);
        setStatus('ready');
      }
    };

    if (id && initialData) {
      checkDbStatus();
    } else if (id) {
        setStatus('ready');
    }
  }, [id, initialData]);

  return (
    <div className="min-h-screen bg-[#030303] text-[#fdfbf7] font-sans selection:bg-[#ebd298] selection:text-black overflow-x-hidden relative flex flex-col justify-between">


      {/* Decorative ambient backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c0117] via-[#030303] to-[#060010] pointer-events-none" />
      <div className="absolute top-[-10%] left-[-15%] w-[600px] h-[600px] bg-purple-950/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Sticky secure header */}
      <header className="sticky top-0 z-50 border-b border-gold/10 bg-[#050505]/95 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          
          {/* Left Side: Inkfetish */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm overflow-hidden bg-white/5 flex items-center justify-center shrink-0 relative">
               <Image 
                 src="/images/inkfetish_logo.png" 
                 alt="Inkfetish Publications" 
                 fill
                 className="object-contain p-1"
               />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-black text-[10px] tracking-[0.2em] uppercase text-white/80">
                Inkfetish
              </span>
              <span className="font-serif italic text-[10px] text-gold">Publications</span>
            </div>
          </div>

          {/* Right Side: Poetry Festival */}
          <div className="flex items-center gap-2">
            <span className="font-serif font-black text-[10px] sm:text-xs tracking-widest uppercase text-white/90 text-right">
              Poetry Festival<br className="sm:hidden" /><span className="hidden sm:inline"> · </span>Season 2
            </span>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gold via-gold-dim to-[#ebd298] flex items-center justify-center rounded-sm shrink-0 shadow-[0_0_15px_rgba(197,160,89,0.2)]">
              <Feather className="w-4 h-4 sm:w-5 sm:h-5 text-[#030303]" />
            </div>
          </div>
          
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-grow max-w-5xl w-full mx-auto px-4 py-8 sm:py-12 flex items-center justify-center">
        
        <AnimatePresence mode="wait">
          
          {/* STATE 1: LOADING & CHECKING DATABASE */}
          {status === 'checking' && (
            <motion.div
              key="checking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 flex flex-col items-center"
            >
              <Loader2 className="w-10 h-10 text-gold animate-spin mb-4" />
              <p className="text-xs uppercase tracking-widest text-[#555] font-bold">Verifying Shipping Eligibility...</p>
            </motion.div>
          )}

          {/* STATE 2: ALREADY ORDERED VIEW */}
          {status === 'already_ordered' && (
            <motion.div
              key="already_ordered"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md w-full bg-[#050505] border border-green-500/25 p-8 sm:p-12 text-center rounded-sm shadow-[0_0_80px_rgba(16,185,129,0.03)] backdrop-blur-md"
            >
              <div className="w-16 h-16 bg-emerald-950/20 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h1 className="text-xl sm:text-2xl font-serif font-black uppercase tracking-wider text-emerald-400 mb-2">
                Order Already Placed
              </h1>
              <p className="text-xs uppercase tracking-[0.25em] font-sans font-bold text-[#555] mb-6">
                Certificate S2 Registry
              </p>

              <div className="h-px w-20 bg-white/5 mx-auto mb-6" />

              <p className="text-xs sm:text-sm text-[#888] font-normal leading-relaxed mb-8">
                Hi <strong className="text-white">{firstName}</strong>, you have already ordered your physical certificate, custom medal, and recommendation letter kit. Our publishing team is currently preparing your shipment.
              </p>

              <div className="bg-white/[0.01] border border-white/5 p-4 rounded-sm text-left text-xs text-[#555] space-y-2 font-mono">
                <div><span className="text-[#888]">Recipient:</span> {formData.name || existingOrderDetails?.name}</div>
                <div><span className="text-[#888]">Status:</span> Processing for Courier</div>
                <div><span className="text-[#888]">Medal Casting:</span> Locked & Reserved</div>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href={`/poetryfestival/s2/${id}`}
                  className="w-full py-3.5 border border-white/10 hover:border-gold/30 hover:text-gold text-xs uppercase tracking-widest font-bold transition-all rounded-sm block text-center"
                >
                  View Digital Certificate
                </Link>
                <a
                  href="mailto:support@inkfetish.in"
                  className="w-full py-3.5 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-xs uppercase tracking-widest font-bold transition-all rounded-sm block text-center"
                >
                  Contact Support
                </a>
              </div>
            </motion.div>
          )}

          {/* STATE 3: ORDER CREATED / PAYING / VERIFYING BACKEND LOADER */}
          {(status === 'creating_order' || status === 'paying' || status === 'verifying') && (
            <motion.div
              key="payment_loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md w-full bg-[#050505] border border-white/10 p-12 text-center rounded-sm shadow-2xl backdrop-blur-md flex flex-col items-center justify-center min-h-[350px]"
            >
              <div className="relative w-16 h-16 mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-2 border-t-gold border-r-transparent border-b-transparent border-l-transparent"
                />
                <div className="absolute inset-3 flex items-center justify-center bg-[#0e0a1a] rounded-full border border-white/5">
                  <Lock className="w-5 h-5 text-gold animate-pulse" />
                </div>
              </div>

              <h2 className="text-base uppercase tracking-widest font-bold text-white mb-2">
                {status === 'creating_order' && 'Initializing Secure Order...'}
                {status === 'paying' && 'Awaiting Gateway Checkout...'}
                {status === 'verifying' && 'Verifying Payment Transaction...'}
              </h2>
              <p className="text-[10px] text-[#555] uppercase tracking-widest font-mono">
                {status === 'creating_order' && 'Contacting Cashfree Registry'}
                {status === 'paying' && 'Please complete checkout in the popup'}
                {status === 'verifying' && 'Updating Supabase Database ledger'}
              </p>
            </motion.div>
          )}

          {/* STATE 4: PAYMENT SUCCESS VIEW */}
          {status === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md w-full bg-[#050505] border border-gold/30 p-8 sm:p-12 text-center rounded-sm shadow-[0_0_80px_rgba(197,160,89,0.08)] backdrop-blur-md"
            >
              <div className="w-16 h-16 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center mx-auto mb-6 text-gold">
                <Trophy className="w-8 h-8" />
              </div>
              <h1 className="text-xl sm:text-2xl font-serif font-black uppercase tracking-wider text-gold mb-2">
                Order Confirmed!
              </h1>
              <p className="text-xs uppercase tracking-[0.25em] font-sans font-bold text-[#555] mb-6">
                Inkfetish S2 Courier Desk
              </p>

              <div className="h-px w-20 bg-white/5 mx-auto mb-6" />

              <p className="text-xs sm:text-sm text-[#888] font-normal leading-relaxed mb-6">
                Congratulations <strong className="text-white">{firstName}</strong>! Your order is successfully booked and your gold medal casting is locked.
              </p>

              <div className="bg-[#10B981]/5 border border-[#10B981]/25 p-4 rounded-sm text-left text-xs text-emerald-400 space-y-2 mb-8 font-mono">
                <div className="font-bold flex items-center gap-1.5"><Check className="w-4 h-4" /> PAYMENT VERIFIED</div>
                <div className="text-[10px] text-white/40 border-t border-white/5 pt-2 mt-2">
                  We are custom-casting your physical medal and preparing your laminated certificate + recommendation letter. Delivery updates will be shared via SMS/WhatsApp.
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href={`/poetryfestival/s2/${id}`}
                  className="w-full py-3.5 bg-gradient-to-r from-gold to-gold-dim hover:from-gold-glow hover:to-gold text-black text-xs uppercase tracking-widest font-black transition-all rounded-sm block text-center"
                >
                  Return to Certificate
                </Link>
              </div>
            </motion.div>
          )}

          {/* STATE 5: PREMIUM LANDING PAGE (NO INLINE FORM) */}
          {status === 'ready' && (
            <motion.div
              key="checkout_landing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl w-full mx-auto"
            >
              {/* Premium Hero Banner with Image Background */}
              <div className="relative p-[1px] rounded-sm bg-gradient-to-b from-gold/40 via-white/5 to-transparent shadow-[0_0_40px_rgba(197,160,89,0.1)] mb-12">
                <div 
                  className="min-h-[400px] sm:min-h-[480px] rounded-sm relative overflow-hidden flex flex-col items-center justify-center p-6 sm:p-12 bg-cover bg-center text-center"
                  style={{ backgroundImage: 'linear-gradient(to bottom, rgba(3,3,3,0.85) 0%, rgba(3,3,3,0.4) 50%, rgba(3,3,3,0.95) 100%), url("https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1777555292/La_Polentina_-_Joey_Guidone_spmmpb.jpg")' }}
                >
                  <div className="relative z-10 space-y-6 max-w-3xl mx-auto mt-8 sm:mt-12">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-gold/40 text-gold text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(197,160,89,0.3)] backdrop-blur-md">
                      <Sparkles className="w-3.5 h-3.5" /> Exclusive Participant Upgrade
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-serif font-black leading-tight text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] via-[#ebd298] to-[#c5a059] drop-shadow-lg pb-2">
                      Claim Your Physical Honors Kit
                    </h1>
                    <p className="text-base sm:text-lg text-white font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-xl">
                      Hi <strong className="text-gold font-black">{firstName}</strong>! Your achievement deserves more than a digital certificate.<br className="hidden sm:block" />
                      <br className="hidden sm:block" />
                      Claim your <strong className="text-[#fdfbf7] font-black">Physical Honors Kit</strong> and celebrate your success for Poetry Festival Season 2 with a special keepsake you can proudly hold, display, and remember.
                    </p>
                  </div>
                </div>
              </div>

              {/* Value Stack Grid */}
              <div className="bg-[#050505] border border-gold/20 rounded-sm p-6 sm:p-10 shadow-[0_0_50px_rgba(197,160,89,0.05)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[80px] pointer-events-none" />
                
                <div className="text-center mb-8 relative z-10">
                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-widest">What You're Getting Today</h3>
                  
                  {timer && !timer.isExpired && (
                    <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-red-950/20 border border-red-500/20 rounded-sm">
                      <Clock className="w-3.5 h-3.5 text-red-400" />
                      <span className="text-[11px] font-black uppercase tracking-widest text-red-400">
                        Offer Valid For: {String(timer.h).padStart(2, '0')}h {String(timer.m).padStart(2, '0')}m {String(timer.s).padStart(2, '0')}s
                      </span>
                    </div>
                  )}

                  <div className="w-16 h-px bg-gold mx-auto mt-5" />
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-10 relative z-10">
                  {/* Item 1 */}
                  <div className="flex gap-4 items-center bg-[#0a0a0a] border border-white/5 p-4 rounded-sm hover:border-gold/30 transition-all group">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dim flex items-center justify-center shrink-0 text-black shadow-[0_0_15px_rgba(197,160,89,0.4)] group-hover:scale-110 transition-transform">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div className="flex-grow">
                      <div className="font-bold text-[#fdfbf7] text-sm">Physical Gold Medal</div>
                      <div className="text-[#888] text-[10px] uppercase tracking-wider font-semibold mt-0.5">Custom Cast & Engraved</div>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex gap-4 items-center bg-[#0a0a0a] border border-white/5 p-4 rounded-sm hover:border-gold/30 transition-all group">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dim flex items-center justify-center shrink-0 text-black shadow-[0_0_15px_rgba(197,160,89,0.4)] group-hover:scale-110 transition-transform">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div className="flex-grow">
                      <div className="font-bold text-[#fdfbf7] text-sm">Laminated Certificate</div>
                      <div className="text-[#888] text-[10px] uppercase tracking-wider font-semibold mt-0.5">High-Grade Cardstock</div>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex gap-4 items-center bg-[#0a0a0a] border border-white/5 p-4 rounded-sm hover:border-gold/30 transition-all group">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dim flex items-center justify-center shrink-0 text-black shadow-[0_0_15px_rgba(197,160,89,0.4)] group-hover:scale-110 transition-transform">
                      <Award className="w-6 h-6" />
                    </div>
                    <div className="flex-grow">
                      <div className="font-bold text-[#fdfbf7] text-sm">Recommendation Letter</div>
                      <div className="text-[#888] text-[9px] uppercase tracking-wider font-semibold mt-0.5 leading-tight">Poetry Festival Officially<br/>Signed & Validated</div>
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div className="flex gap-4 items-center bg-[#0a0a0a] border border-white/5 p-4 rounded-sm hover:border-gold/30 transition-all group">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dim flex items-center justify-center shrink-0 text-black shadow-[0_0_15px_rgba(197,160,89,0.4)] group-hover:scale-110 transition-transform">
                      <Ticket className="w-6 h-6" />
                    </div>
                    <div className="flex-grow">
                      <div className="font-bold text-[#fdfbf7] text-sm">₹100 Discount Coupon</div>
                      <div className="text-[#888] text-[9px] uppercase tracking-wider font-semibold mt-0.5 leading-tight">For Our Next<br/>Poetry Contest</div>
                    </div>
                  </div>

                  {/* Item 5 - Special Green Delivery Box */}
                  <div className="sm:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-emerald-600 via-green-400 to-emerald-600 p-[1.5px] rounded-sm shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:shadow-[0_0_50px_rgba(16,185,129,0.3)] transition-all group">
                    <div className="flex w-full items-center gap-4 sm:gap-5 bg-[#050505] p-5 rounded-[1px] relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                      <div className="w-14 h-14 rounded-sm bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shrink-0 text-black shadow-inner group-hover:scale-105 transition-transform relative z-10">
                        <Truck className="w-7 h-7 text-black" />
                      </div>
                      <div className="flex-grow text-left relative z-10">
                        <div className="font-serif italic text-emerald-400 text-lg sm:text-xl drop-shadow-md mb-0.5">Direct Home Delivery</div>
                        <div className="text-white/80 text-[10px] sm:text-[11px] uppercase tracking-widest font-black">Tracked, Protected & Secured Shipping</div>
                      </div>
                      <div className="hidden sm:flex items-center justify-center w-12 h-12 border border-emerald-500/30 rounded-full bg-emerald-500/10 text-emerald-400 relative z-10">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust Statistics Row */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 relative z-10">
                  {/* Trust Card 1 */}
                  <div className="bg-[#080808] border border-white/5 rounded-sm p-3 sm:p-4 text-center flex flex-col items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    <div className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-white font-black text-sm sm:text-base">1500+</div>
                      <div className="text-[#888] text-[8px] sm:text-[9px] uppercase tracking-wider font-bold mt-0.5 leading-tight">Delivered<br/>Past Month</div>
                    </div>
                  </div>

                  {/* Trust Card 2 */}
                  <div className="bg-[#080808] border border-white/5 rounded-sm p-3 sm:p-4 text-center flex flex-col items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-white font-black text-sm sm:text-base">98%</div>
                      <div className="text-[#888] text-[8px] sm:text-[9px] uppercase tracking-wider font-bold mt-0.5 leading-tight">Delivery<br/>Success</div>
                    </div>
                  </div>

                  {/* Trust Card 3 */}
                  <div className="bg-[#080808] border border-white/5 rounded-sm p-3 sm:p-4 text-center flex flex-col items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/10 text-yellow-400 flex items-center justify-center">
                      <Star className="w-4 h-4" fill="currentColor" />
                    </div>
                    <div>
                      <div className="text-white font-black text-sm sm:text-base">4.9/5</div>
                      <div className="text-[#888] text-[8px] sm:text-[9px] uppercase tracking-wider font-bold mt-0.5 leading-tight">Customer<br/>Rating</div>
                    </div>
                  </div>
                </div>

                {/* Big Final CTA Box */}
                <div className="bg-gradient-to-r from-gold/15 via-gold/5 to-transparent border border-gold/40 p-6 sm:p-8 rounded-sm text-center relative overflow-hidden z-10 mt-6">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gold/20 blur-[80px]" />
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                    <div className="text-center sm:text-left">
                      <div className="text-xs uppercase tracking-widest text-gold font-bold mb-1">Total Real World Value: <span className="line-through decoration-red-500 decoration-2 text-white/50">₹1,700</span></div>
                      <div className="text-[10px] text-white/70 uppercase tracking-widest font-bold">Your Exclusive Offer</div>
                      <div className="text-4xl sm:text-5xl font-black text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.4)] mt-2">
                        ₹1
                      </div>
                      <div className="text-[9px] text-white/40 mt-1 uppercase tracking-widest">(Only printing & shipping)</div>
                      
                      {timer && !timer.isExpired && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-sm mt-3">
                          <Clock className="w-3 h-3 text-red-400" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-red-400">
                            Offer Ends In: {String(timer.h).padStart(2, '0')}h {String(timer.m).padStart(2, '0')}m {String(timer.s).padStart(2, '0')}s
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => router.push(`/poetryfestival/s2/${id}/homedelivery/getkit/shipping`)}
                      className="w-full sm:w-auto px-8 py-5 bg-green-500 text-black text-sm uppercase tracking-widest font-black rounded-sm shadow-[0_0_40px_rgba(34,197,94,0.4)] hover:bg-green-400 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_15px_50px_rgba(34,197,94,0.6)] transition-all duration-300 relative overflow-hidden group shrink-0"
                    >
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                      <span className="flex items-center justify-center gap-2 relative z-10">
                        <Sparkles className="w-5 h-5" /> CLAIM KIT NOW
                      </span>
                    </button>
                  </div>
                </div>
                
                {/* Trust Badges */}
                <div className="mt-6 flex items-center justify-center gap-6 text-[#555] text-[10px] uppercase tracking-wider font-bold relative z-10">
                  <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green-500" /> SSL Secured</span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-gold" /> Encrypted Checkout</span>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-white/5 pt-16 pb-32 sm:pb-16 px-6 bg-[#030303] mt-12">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-sm bg-white/5 flex items-center justify-center relative overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <Image src="/images/inkfetish_logo.png" alt="Inkfetish Logo" fill className="object-contain p-2" />
          </div>
          <div className="flex flex-col items-center gap-1.5 -mt-2">
            <h2 className="font-serif italic text-2xl sm:text-3xl text-[#ebd298]">Inkfetish Publication</h2>
            <p className="text-white/80 font-black uppercase tracking-[0.2em] text-[10px]">Publishing the Legends of Tomorrow, Today.</p>
          </div>
          
          <p className="text-[#888] text-xs sm:text-sm leading-relaxed font-medium px-4">
            Inkfetish is a premium publication house and a collective of 2 Lakh+ writers. We bridge the gap between digital creativity and physical craftsmanship.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-2">
            <a href="https://instagram.com/inkfetish_official" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#555] hover:text-white transition-colors text-xs font-bold uppercase tracking-wider">
              <span>Instagram</span>
            </a>
            <a href="mailto:support@inkfetish.in" className="flex items-center gap-2 text-[#555] hover:text-white transition-colors text-xs font-bold uppercase tracking-wider">
              <Mail className="w-4 h-4" /> <span>Email Us</span>
            </a>
            <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#555] hover:text-green-500 transition-colors text-xs font-bold uppercase tracking-wider">
              <Phone className="w-4 h-4" /> <span>WhatsApp Support</span>
            </a>
          </div>

          <div className="w-24 h-px bg-white/5 mt-4" />
          
          <div className="text-[#333] text-[9px] sm:text-[10px] uppercase tracking-widest flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            <span>© {new Date().getFullYear()} Inkfetish Publications. All Rights Reserved.</span>
            <span className="hidden sm:block">•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> 100% Secure Checkout
            </span>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA Banner */}
      <AnimatePresence>
        {status === 'ready' && (
          <motion.div
            initial={{ y: 150 }}
            animate={{ y: 0 }}
            exit={{ y: 150 }}
            transition={{ type: "spring", damping: 25, stiffness: 200, delay: 0.5 }}
            className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-gold/30 p-4 shadow-[0_-10px_50px_rgba(0,0,0,0.8)]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white uppercase tracking-wider">The Ultimate Kit</span>
                <span className="text-[10px] text-green-400 font-black uppercase tracking-widest">Save ₹1,415 Today</span>
              </div>
              <div className="text-right flex flex-col">
                <span className="text-[10px] text-white/50 line-through">₹1,700</span>
                <span className="text-xl font-black text-gold leading-none">₹1</span>
              </div>
            </div>
            <button
              onClick={() => router.push(`/poetryfestival/s2/${id}/homedelivery/getkit/shipping`)}
              className="w-full py-3.5 bg-gradient-to-r from-gold to-gold-dim text-black text-xs uppercase tracking-widest font-black rounded-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(197,160,89,0.3)] relative overflow-hidden group"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <Sparkles className="w-4 h-4" /> GET YOUR KIT NOW
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
