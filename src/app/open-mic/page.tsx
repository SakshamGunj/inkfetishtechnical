"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mic2, User, Mail, Phone, Instagram, Send, Sparkles, ChevronRight, CheckCircle2, Video, Trophy, Camera, Users, Clock } from "lucide-react";
import { load } from '@cashfreepayments/cashfree-js';

// Subtle noise texture for a premium matte feel
const NoiseOverlay = () => (
  <div 
    className="pointer-events-none absolute inset-0 z-50 opacity-[0.03]" 
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

export default function OpenMicRegistrationPremium() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasRegistered, setHasRegistered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [cashfree, setCashfree] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    
    // Check if they previously registered and paid successfully
    if (typeof window !== "undefined") {
      if (localStorage.getItem("openMicRegistered") === "true") {
        setHasRegistered(true);
      }
    }

    // Initialize Cashfree SDK
    const initCashfree = async () => {
      try {
        const mode = process.env.NEXT_PUBLIC_CASHFREE_MODE || "sandbox";
        const cf = await load({ mode });
        setCashfree(cf);
      } catch (err) {
        console.error("Failed to load Cashfree SDK:", err);
      }
    };
    initCashfree();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone')
    };

    try {
      if (!cashfree) throw new Error("Cashfree SDK not loaded");

      // 1. Create Order on Backend
      const res = await fetch('/api/open-mic/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      const orderData = await res.json();
      
      if (!res.ok) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      // 2. Open Cashfree Checkout Modal
      const result = await cashfree.checkout({
        paymentSessionId: orderData.payment_session_id,
        redirectTarget: "_modal",
      });

      if (result.error) {
        console.error("Payment error or cancelled", result.error);
        setIsSubmitting(false);
        return; // User cancelled or error occurred
      }

      // 3. Verify Payment on Backend
      const verifyRes = await fetch('/api/open-mic/verify-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: orderData.order_id })
      });

      const verifyData = await verifyRes.json();
      
      if (verifyData.status === 'PAID') {
        setIsSubmitted(true);
        setHasRegistered(true);
        localStorage.setItem("openMicRegistered", "true");
      } else {
        alert("Payment was not successful. Please try again.");
      }

    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020202] text-neutral-200 relative flex flex-col lg:flex-row overflow-x-hidden selection:bg-emerald-500/30 font-sans">
      <NoiseOverlay />
      
      {/* Decorative ambient lighting */}
      <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[50%] rounded-full bg-emerald-900/20 blur-[100px] lg:blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[40%] rounded-full bg-amber-800/10 blur-[100px] lg:blur-[120px] pointer-events-none mix-blend-screen" />

      {/* Left Column: Visual Storytelling */}
      <div className="relative w-full lg:w-1/2 flex flex-col justify-end lg:justify-center lg:min-h-screen">
        {/* Background Image that stays behind the content */}
        <div className="absolute inset-0 w-full h-[60vh] lg:h-full z-0">
          <Image
            src="/open-mic-bg.png"
            alt="Open Mic Event"
            fill
            priority
            className="object-cover object-[center_top] opacity-40 lg:opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020202]/80 to-[#020202] lg:bg-gradient-to-r lg:from-[#020202]/50 lg:via-[#020202]/80 lg:to-[#020202]" />
        </div>
        
        <div className="relative z-10 p-5 pt-32 lg:p-12 lg:pt-12 flex flex-col justify-center min-h-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-wrap items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
              <div className="flex items-center gap-1.5 border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 lg:px-3 lg:py-1.5 rounded-full backdrop-blur-md">
                <span className="w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-300 text-[8px] lg:text-[10px] font-bold tracking-[0.15em] uppercase">Registrations Open</span>
              </div>
              <div className="flex items-center gap-1.5 border border-white/10 bg-white/5 px-2.5 py-1 lg:px-3 lg:py-1.5 rounded-full backdrop-blur-md">
                <Clock className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-neutral-400" />
                <span className="text-neutral-300 text-[8px] lg:text-[10px] font-bold tracking-[0.15em] uppercase">Next: Sunday 7 PM</span>
              </div>
            </div>
            
            <h1 className="mb-3 lg:mb-5 leading-[1.1] tracking-tight font-serif">
              <span className="block font-light italic text-amber-400/90 text-4xl sm:text-5xl lg:text-7xl mb-1 lg:mb-2">Weekly Open Mic by Inkfetish</span>
              <span className="block text-white text-xl sm:text-2xl lg:text-3xl">Inviting Poets & Writers Across India.</span>
            </h1>
            
            <p className="text-sm lg:text-base text-neutral-300 font-light max-w-xl leading-relaxed mb-6">
              A fun night to recite your poetry or story! Enjoy the weekly open mic with a community of talented artists.
            </p>
            
            <div className="flex flex-col gap-3 mb-8 lg:mb-10">
              <div className="inline-flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 px-4 py-2.5 rounded-md lg:rounded-lg backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.15)] w-fit">
                <Trophy className="w-4 h-4 lg:w-5 lg:h-5 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                <span className="text-amber-100 text-xs lg:text-sm font-semibold tracking-wide drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]">
                  1 Winner gets a physical certificate delivered to their home!
                </span>
              </div>
              <div className="flex flex-nowrap items-center gap-2 lg:gap-3 overflow-x-auto hide-scrollbar w-full">
                <div className="shrink-0 inline-flex items-center gap-1.5 lg:gap-3 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1.5 lg:px-4 lg:py-2.5 rounded-lg lg:rounded-xl backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)] w-fit">
                  <Clock className="w-3 h-3 lg:w-5 lg:h-5 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  <span className="text-emerald-100 text-xs sm:text-sm lg:text-base font-semibold tracking-wide whitespace-nowrap drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]">
                    Every Sunday at 7 PM
                  </span>
                </div>
                <div className="shrink-0 inline-flex items-center gap-1.5 lg:gap-3 bg-blue-500/10 border border-blue-500/30 px-2.5 py-1.5 lg:px-4 lg:py-2.5 rounded-lg lg:rounded-xl backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.15)] w-fit">
                  <Clock className="w-3 h-3 lg:w-5 lg:h-5 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  <span className="text-blue-100 text-xs sm:text-sm lg:text-base font-semibold tracking-wide whitespace-nowrap drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">
                    Next: 21st June, 7 PM
                  </span>
                </div>
              </div>
            </div>
            
            {/* Feature Cards Grid - Super compact on mobile */}
            <div className="grid grid-cols-2 gap-2 lg:gap-4 lg:pr-10 pb-4 lg:pb-0">
              
              <div className="bg-white/5 border border-white/10 p-3 lg:p-4 rounded-xl backdrop-blur-sm">
                <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mb-2 lg:mb-3">
                  <Users className="w-3 h-3 lg:w-4 lg:h-4 text-emerald-400" />
                </div>
                <h3 className="text-white font-semibold text-xs lg:text-sm mb-0.5">Strictly 50 Slots</h3>
                <p className="text-[9px] lg:text-xs text-neutral-400 leading-snug">Only 50 participants to ensure everyone gets stage time.</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-3 lg:p-4 rounded-xl backdrop-blur-sm">
                <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-blue-500/20 flex items-center justify-center mb-2 lg:mb-3">
                  <Video className="w-3 h-3 lg:w-4 lg:h-4 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold text-xs lg:text-sm mb-0.5">Live on Zoom meet</h3>
                <p className="text-[9px] lg:text-xs text-neutral-400 leading-snug">Held on official Zoom, and recordings given to all.</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-3 lg:p-4 rounded-xl backdrop-blur-sm">
                <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-amber-500/20 flex items-center justify-center mb-2 lg:mb-3">
                  <Trophy className="w-3 h-3 lg:w-4 lg:h-4 text-amber-400" />
                </div>
                <h3 className="text-white font-semibold text-xs lg:text-sm mb-0.5">Certificates</h3>
                <p className="text-[9px] lg:text-xs text-neutral-400 leading-snug">Top performers get a printed certificate delivered straight to their home! Plus, every participant receives an E-certificate.</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-3 lg:p-4 rounded-xl backdrop-blur-sm">
                <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-purple-500/20 flex items-center justify-center mb-2 lg:mb-3">
                  <Camera className="w-3 h-3 lg:w-4 lg:h-4 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold text-xs lg:text-sm mb-0.5">Social Media</h3>
                <p className="text-[9px] lg:text-xs text-neutral-400 leading-snug">Clips may be uploaded to socials (with your consent).</p>
              </div>

            </div>

            {/* Persistent Registration Success Message */}
            {hasRegistered && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 lg:mt-8 bg-emerald-500/10 border border-emerald-500/30 p-4 lg:p-6 rounded-2xl backdrop-blur-md shadow-[0_0_30px_rgba(16,185,129,0.15)] max-w-xl lg:pr-10"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-emerald-500/20 rounded-full flex items-center justify-center shrink-0 shadow-inner">
                    <CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-emerald-300 font-serif text-lg lg:text-xl mb-1">Spot Confirmed!</h3>
                    <p className="text-neutral-300 text-xs lg:text-sm leading-relaxed">
                      You have successfully registered for the Open Mic! The exclusive Zoom link will be sent to your email.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

          </motion.div>
        </div>
      </div>

      {/* Right Column: High Converting White Registration Form - Compact on Mobile */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 pb-12 lg:p-12 z-20 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="w-full max-w-lg relative"
        >
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 lg:p-10 text-center shadow-xl relative overflow-hidden border border-gray-100"
            >
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 relative shadow-inner">
                <CheckCircle2 className="w-8 h-8 lg:w-10 lg:h-10 text-emerald-500" />
              </div>
              
              <h2 className="text-xl lg:text-2xl font-serif text-gray-900 mb-2">Registration Complete!</h2>
              <p className="text-xs lg:text-sm text-gray-600 mb-6 lg:mb-8 leading-relaxed">
                Your spot is confirmed. We've received your ₹1 payment. An exclusive Zoom link and instructions will be sent to your email. We can't wait to see you perform!
              </p>
              
              <button 
                onClick={() => setIsSubmitted(false)}
                className="group flex items-center justify-center gap-2 mx-auto text-xs lg:text-sm text-emerald-600 hover:text-emerald-700 uppercase tracking-widest font-semibold transition-all py-2.5 px-5 lg:py-3 lg:px-6 rounded-full border border-emerald-100 hover:border-emerald-200 bg-emerald-50/50"
              >
                <span>Register Another Act</span>
                <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ) : (
            <div className="bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] rounded-2xl lg:rounded-[2rem] p-5 sm:p-7 lg:p-10 relative overflow-hidden border border-gray-100">
              
              <div className="mb-6 lg:mb-8">
                <h2 className="text-xl lg:text-2xl font-serif text-gray-900 mb-1 lg:mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-amber-500" />
                  Join Open Mic
                </h2>
                <p className="text-xs lg:text-sm text-gray-500 leading-relaxed">
                  Join the fun. The Stage Awaits You. 
                </p>
                <div className="flex flex-wrap items-center gap-2 lg:gap-3 mt-2 lg:mt-3">
                  <div className="inline-block bg-amber-50 border border-amber-100 px-2.5 py-1 lg:px-3 lg:py-1.5 rounded-md lg:rounded-lg">
                    <p className="text-amber-800 text-xs lg:text-sm font-semibold flex items-center gap-2">
                      Registration Fee: ₹1
                    </p>
                  </div>
                  <div className="inline-block bg-blue-50 border border-blue-100 px-2.5 py-1 lg:px-3 lg:py-1.5 rounded-md lg:rounded-lg">
                    <p className="text-blue-800 text-xs lg:text-sm font-semibold flex items-center gap-2">
                      <Clock className="w-3 h-3 lg:w-4 lg:h-4" />
                      Next Open Mic: 21st June, 7 PM
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
                <div className="space-y-1 relative group/input">
                  <label className="text-[9px] lg:text-[10px] font-bold text-gray-500 uppercase tracking-[0.1em] ml-1">Artist Name</label>
                  <div className="relative flex items-center">
                    <User className="absolute left-3 w-4 h-4 lg:w-5 lg:h-5 text-gray-400 group-focus-within/input:text-emerald-500 transition-colors" />
                    <input 
                      type="text" 
                      name="name"
                      required
                      placeholder="Stage name or full name"
                      className="w-full bg-gray-50/50 border border-gray-200 py-2.5 lg:py-3 pl-9 lg:pl-10 pr-3 text-xs lg:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all rounded-lg lg:rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
                  <div className="space-y-1 relative group/input">
                    <label className="text-[9px] lg:text-[10px] font-bold text-gray-500 uppercase tracking-[0.1em] ml-1">Email</label>
                    <div className="relative flex items-center">
                      <Mail className="absolute left-3 w-4 h-4 lg:w-5 lg:h-5 text-gray-400 group-focus-within/input:text-emerald-500 transition-colors" />
                      <input 
                        type="email" 
                        name="email"
                        required
                        placeholder="hello@example.com"
                        className="w-full bg-gray-50/50 border border-gray-200 py-2.5 lg:py-3 pl-9 lg:pl-10 pr-3 text-xs lg:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all rounded-lg lg:rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 relative group/input">
                    <label className="text-[9px] lg:text-[10px] font-bold text-gray-500 uppercase tracking-[0.1em] ml-1">WhatsApp Number</label>
                    <div className="relative flex items-center">
                      <Phone className="absolute left-3 w-4 h-4 lg:w-5 lg:h-5 text-gray-400 group-focus-within/input:text-emerald-500 transition-colors" />
                      <input 
                        type="tel" 
                        name="phone"
                        required
                        placeholder="+91 98765 43210"
                        className="w-full bg-gray-50/50 border border-gray-200 py-2.5 lg:py-3 pl-9 lg:pl-10 pr-3 text-xs lg:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all rounded-lg lg:rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 lg:pt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting || !cashfree}
                    className="w-full relative overflow-hidden rounded-xl lg:rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white py-4 lg:py-5 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(16,185,129,0.8)] disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed group border border-emerald-300"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2 lg:gap-3">
                        <div className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span className="font-semibold tracking-wider text-[10px] lg:text-sm uppercase">Processing...</span>
                      </div>
                    ) : (
                      <span className="flex items-center gap-2 font-bold tracking-widest uppercase text-xs lg:text-base drop-shadow-md">
                        Pay ₹1 & Register
                        <Send className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </button>
                  <p className="text-center text-[10px] lg:text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                    Secure payment powered by Cashfree
                  </p>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
