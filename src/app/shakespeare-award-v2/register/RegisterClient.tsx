'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Lock, Star, ChevronRight, CheckCircle2, 
  ArrowRight, Users, Trophy, Mail, BookOpen, AlertCircle
} from 'lucide-react';

export default function RegisterClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Payment integration would go here
    console.log("Proceeding to payment...", formData);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-[#fdfbf7] font-sans selection:bg-gold selection:text-black">
      
      {/* ⚠️ Minimalist Header - STRICTLY NO NAV LINKS TO DISTRACT FROM CHECKOUT */}
      <header className="border-b border-white/5 bg-[#050505]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/shakespeare-award-v2" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gold flex items-center justify-center text-black font-serif font-black text-xl">S</div>
            <span className="font-serif font-bold text-lg hidden sm:block tracking-wide">Shakespeare Poetry Award</span>
          </Link>
          <div className="flex items-center gap-2 text-ink-400 text-xs font-bold uppercase tracking-widest">
            <Lock className="w-3.5 h-3.5 text-green-500" />
            <span className="hidden sm:inline">256-Bit</span> Secure Checkout
          </div>
        </div>
      </header>

      {/* Main Checkout Layout */}
      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">

          {/* LEFT COLUMN: THE FORM */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-serif font-black border-b border-white/5 pb-4">
                Complete Your Registration
              </h1>
              <div className="flex bg-[#7a1b1b]/10 border border-[#7a1b1b]/30 p-3 rounded-none items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-red-200 leading-relaxed font-light">
                  <strong className="font-bold text-red-400">High Demand Notice:</strong> Due to strict 200-seat limits, your session will be held for <span className="text-white font-bold">10:00</span>. Please complete your details to secure your spot in Volume 2.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-[#050505] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              {/* Subtle light leak for luxury feel */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full pointer-events-none"></div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-ink-400 mb-6 flex items-center gap-2">
                  <span className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center text-white text-[10px]">1</span> 
                  Author Details
                </h3>
                
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-ink-500 font-bold block">Legal Name (For Certificate)</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors placeholder:text-white/20"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-ink-500 font-bold block">Email Address (For Updates)</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors placeholder:text-white/20"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-ink-500 font-bold block">WhatsApp Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors placeholder:text-white/20"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-ink-500 font-bold block">City of Residence</label>
                      <input 
                        type="text" 
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors placeholder:text-white/20"
                        placeholder="Mumbai, etc."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <h3 className="text-sm font-bold uppercase tracking-widest text-ink-400 mb-6 flex items-center gap-2">
                  <span className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center text-white text-[10px]">2</span> 
                  Secure Payment
                </h3>
                
                {/* Visual Fake Payment Selector showing Razorpay/UPI options */}
                <div className="space-y-3 mb-6">
                  <label className="flex items-center gap-3 p-4 border border-gold/50 bg-gold/5 cursor-pointer">
                    <input type="radio" name="payment" defaultChecked className="text-gold focus:ring-gold accent-gold w-4 h-4" />
                    <span className="text-sm font-bold flex-grow">Credit Card / UPI / NetBanking</span>
                    <span className="text-xs font-bold text-gold shrink-0">Razorpay Secure</span>
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full relative group overflow-hidden bg-gold hover:bg-[#e6c175] text-black transition-all py-5 font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                >
                  <Lock className="w-4 h-4" />
                  Proceed to Secure Checkout — ₹599
                  
                  {/* Sweep animation on button */}
                  <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 group-hover:animate-[sweep_1.5s_ease-in-out]"></div>
                </button>
                <p className="text-center text-[10px] uppercase tracking-wider text-ink-500 mt-4 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Guaranteed Safe & Secure Checkout
                </p>
              </div>
            </form>

            <div className="flex items-center justify-center gap-6 opacity-30 grayscale pt-4">
              {/* Payment Method Badges Placeholder */}
              <div className="text-[10px] font-bold tracking-widest">VISA</div>
              <div className="text-[10px] font-bold tracking-widest">MASTERCARD</div>
              <div className="text-[10px] font-bold tracking-widest">UPI</div>
              <div className="text-[10px] font-bold tracking-widest">RAZORPAY</div>
            </div>
            
          </div>

          {/* RIGHT COLUMN: THE OFFER STACK (Hormozi/Brunson Style) */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            {/* Desktop sticky behavior */}
            <div className="sticky top-24 space-y-6">

              {/* Order Summary Box */}
              <div className="bg-[#0a0a0a] border border-white/10 p-6 sm:p-8 relative">
                {/* Corner tape illusion */}
                <div className="absolute -top-3 -right-3 w-16 h-6 bg-gold/20 rotate-45 backdrop-blur-md hidden sm:block"></div>
                
                <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-ink-400 mb-6 border-b border-white/5 pb-4">Order Summary</h2>
                
                <div className="flex gap-4 mb-6 pb-6 border-b border-white/5">
                  <div className="w-20 h-24 bg-[#030303] border border-white/10 shrink-0 relative overflow-hidden flex items-center justify-center">
                     <Image
                        src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1776189507/Banner_SPA_hudujw_xkk65b-compressed_oho1wm.webp"
                        alt="Award Book"
                        fill
                        className="object-cover opacity-80"
                      />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg leading-tight mb-1">Shakespeare Poetry Award — Volume 2</h3>
                    <p className="text-[11px] text-ink-400 font-light mt-2 uppercase tracking-wide">Standard Entry Package</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-gold">What You Specially Get Today:</h4>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <div className="text-[13px]">
                        <span className="text-white font-medium">Guaranteed Publication</span>
                        <p className="text-ink-400 text-[11px] mt-1 leading-snug">Your poem published permanently in the print anthology.</p>
                      </div>
                      <span className="ml-auto text-[11px] text-ink-500 line-through">₹1,500</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <div className="text-[13px]">
                        <span className="text-white font-medium">Physical Home Delivery</span>
                        <p className="text-ink-400 text-[11px] mt-1 leading-snug">Hardcopy Certificate & Appreciation Letter shipped.</p>
                      </div>
                      <span className="ml-auto text-[11px] text-ink-500 line-through">₹500</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <div className="text-[13px]">
                        <span className="text-white font-medium">Access to Top 10 Evaluation</span>
                        <p className="text-ink-400 text-[11px] mt-1 leading-snug">Chance to win the Heavy-Weight Award Medal.</p>
                      </div>
                      <span className="ml-auto text-[11px] text-ink-500 line-through">Priceless</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-6 border-t border-white/5 space-y-2">
                  <div className="flex justify-between text-xs text-ink-400 font-bold uppercase tracking-widest">
                    <span>Total Real World Value</span>
                    <span className="line-through">₹2,000+</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-xs text-white uppercase tracking-widest font-bold">Today's Price</span>
                    <span className="text-3xl font-serif font-black text-gold">₹599</span>
                  </div>
                </div>
              </div>

              {/* Trust & Guarantee Box */}
              <div className="bg-[#050505] border border-white/5 p-6 flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0 border border-gold/20">
                  <ShieldCheck className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">The Iron-Clad Guarantee</h4>
                  <p className="text-xs text-ink-400 font-light leading-relaxed">
                    If Volume 1 proved anything, it’s that we deliver on our promises. 150 poets signed up. 150 certificates were delivered. 1 anthology was printed. Zero undelivered promises.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
