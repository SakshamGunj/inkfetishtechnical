'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { load } from '@cashfreepayments/cashfree-js';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Lock, Star, ChevronRight, CheckCircle2, 
  ArrowRight, Users, Trophy, Mail, BookOpen, AlertCircle, Loader2
} from 'lucide-react';

export default function RegisterClient() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    address1: '',
    address2: '',
    landmark: '',
    pincode: ''
  });

  const isFormFilled = formData.name && formData.email && formData.phone.length === 10 && formData.city && formData.state && formData.address1 && formData.pincode;
  
  const handleMobileCtaClick = () => {
    if (isFormFilled) {
      if (formRef.current) formRef.current.requestSubmit();
    } else {
      if (formRef.current) formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const [isProcessing, setIsProcessing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  // Check LocalStorage on mount to prevent double payments
  useEffect(() => {
    const checkExistingPayment = async () => {
      const existingOrderId = localStorage.getItem('spa_vol2_payment_id');
      if (existingOrderId) {
        try {
          const verifyRes = await fetch(`/api/payment/verify-order?order_id=${existingOrderId}`);
          const verifyData = await verifyRes.json();
          if (verifyData.order_status === 'PAID') {
            // Already paid, redirect
            router.push(`/shakespeare-award-v2/submit?order_id=${existingOrderId}`);
            return;
          } else {
            // Not paid, clear storage
            localStorage.removeItem('spa_vol2_payment_id');
          }
        } catch (e) {
          console.error(e);
        }
      }
      setIsVerifying(false);
    };
    checkExistingPayment();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone number length exactly 10
    if (formData.phone.length !== 10) {
      alert("Please enter exactly 10 digits for your WhatsApp number.");
      return;
    }
    
    setIsProcessing(true);
    try {
      const mode = process.env.NEXT_PUBLIC_CASHFREE_MODE === 'production' ? 'production' : 'sandbox';
      const cashfree = await load({ mode });
      
      // Reconstruct for backend compatibility
      const submissionData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: `${formData.city}, ${formData.state}`,
        address: `${formData.address1}${formData.address2 ? `, ${formData.address2}` : ''}${formData.landmark ? `, Landmark: ${formData.landmark}` : ''}`,
        pincode: formData.pincode
      };
      
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });
      const data = await response.json();
      
      if (!response.ok || data.error) {
        alert("Failed to initialize secure checkout. Please try again.");
        setIsProcessing(false);
        return;
      }
      
      const checkoutOptions = {
        paymentSessionId: data.payment_session_id,
        redirectTarget: "_modal",
      };
      
      const result = await cashfree.checkout(checkoutOptions);
      
      if (result.error) {
          console.error(result.error);
          setIsProcessing(false);
          return;
      }
      
      verifyPayment(data.order_id);
      
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
      alert("Something went wrong. Please check your connection.");
    }
  };

  const verifyPayment = async (orderId: string) => {
    try {
      const verifyRes = await fetch(`/api/payment/verify-order?order_id=${orderId}`);
      const verifyData = await verifyRes.json();
      
      if (verifyData.order_status === 'PAID') {
        // Save to LocalStorage immediately
        localStorage.setItem('spa_vol2_payment_id', orderId);
        // Redirect to poem submission page
        router.push(`/shakespeare-award-v2/submit?order_id=${orderId}`);
      } else {
        alert("Payment was not completed successfully. If money was deducted, it will be refunded.");
        setIsProcessing(false);
      }
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-[#14100C] flex flex-col items-center justify-center p-4">
        <Loader2 className="w-8 h-8 text-gold animate-spin mb-4" />
        <p className="text-gold font-serif tracking-widest text-sm uppercase animate-pulse">Verifying Access...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#14100C] text-[#fdfbf7] font-sans selection:bg-gold selection:text-black relative overflow-hidden">
      
      {/* Dark Academia Background Effects */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
      <div className="absolute top-0 right-0 w-3/4 h-full bg-[#1A1613] opacity-30 transform -skew-x-12 translate-x-32 pointer-events-none border-l border-gold/5"></div>
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[600px] bg-[#c5a059]/10 blur-[120px] rounded-full pointer-events-none"></div>
      {/* ⚠️ Minimalist Header - STRICTLY NO NAV LINKS TO DISTRACT FROM CHECKOUT */}
      <header className="border-b border-white/5 bg-[#1A1613]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-2 sm:py-4 flex justify-between items-center">
          <Link href="/shakespeare-award-v2" className="flex items-center gap-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gold flex items-center justify-center text-black font-serif font-black text-base sm:text-xl">S</div>
            <span className="font-serif font-bold text-lg hidden sm:block tracking-wide">Shakespeare Poetry Award</span>
          </Link>
          <div className="flex items-center gap-2 text-ink-400 text-xs font-bold uppercase tracking-widest">
            <Lock className="w-3.5 h-3.5 text-green-500" />
            <span className="hidden sm:inline">256-Bit</span> Secure Checkout
          </div>
        </div>
      </header>

      {/* Main Checkout Layout */}
      <main className="max-w-6xl mx-auto px-2 sm:px-4 py-6 sm:py-16">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-6 lg:gap-16 items-start">

          {/* LEFT COLUMN: THE FORM */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="space-y-3">
              <h1 className="text-xl sm:text-3xl font-serif font-black border-b border-white/5 pb-4">
                Complete Your Registration
              </h1>
              <div className="flex bg-[#7a1b1b]/10 border border-[#7a1b1b]/30 p-3 rounded-none items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-red-200 leading-relaxed font-light">
                  <strong className="font-bold text-red-400">High Demand Notice:</strong> Due to strict 200-seat limits, your session will be held for <span className="text-white font-bold">10:00</span>. Please complete your details to secure your spot in Volume 2.
                </p>
              </div>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="bg-[#1A1613]/95 backdrop-blur-md border border-gold/20 rounded-sm shadow-2xl p-6 sm:p-10 space-y-6 relative overflow-hidden">
              {/* Subtle light leak for luxury feel */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full pointer-events-none"></div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-ink-400 mb-6 flex items-center gap-2">
                  <span className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center text-white text-[10px]">1</span> 
                  Author Details
                </h3>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-ink-500 font-bold block">Legal Name (For Certificate)</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-[#14100C] border border-white/10 px-4 py-3 text-base sm:text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors placeholder:text-white/20"
                        className="w-full bg-[#FDFBF7] border border-gold/40 p-4 text-black placeholder-black/50 font-medium shadow-inner focus:border-gold focus:ring-1 focus:ring-gold transition-all text-base sm:text-sm rounded-sm outline-none"
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
                        placeholder="you@email.com" 
                        className="w-full bg-[#FDFBF7] border border-gold/40 p-4 text-black placeholder-black/50 font-medium shadow-inner focus:border-gold focus:ring-1 focus:ring-gold transition-all text-base sm:text-sm rounded-sm outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-ink-500 font-bold block">WhatsApp Number</label>
                      <div className="relative flex items-center">
                        <span className="absolute left-4 text-black/60 font-bold">+91</span>
                        <input 
                          type="tel" 
                          name="phone"
                          required
                          maxLength={10}
                          pattern="[0-9]{10}"
                          title="Please enter exactly 10 digits"
                          value={formData.phone}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            if (val.length <= 10) setFormData({ ...formData, phone: val });
                          }}
                          className="w-full bg-[#FDFBF7] border border-gold/40 p-4 pl-12 text-black placeholder-black/50 font-medium shadow-inner focus:border-gold focus:ring-1 focus:ring-gold transition-all text-base sm:text-sm rounded-sm outline-none"
                          placeholder="9876543210"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-ink-500 font-bold block">City & State</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="City" 
                          className="w-1/2 bg-[#FDFBF7] border border-gold/40 p-4 text-black placeholder-black/50 font-medium shadow-inner focus:border-gold focus:ring-1 focus:ring-gold transition-all text-base sm:text-sm rounded-sm outline-none"
                        />
                        <select
                          name="state"
                          required
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-1/2 bg-[#14100C] border border-gold/20 p-4 text-[#fdfbf7] focus:border-gold focus:ring-1 focus:ring-gold transition-all text-base sm:text-sm rounded-sm outline-none cursor-pointer appearance-none"
                        >
                          <option value="" disabled className="text-black/50">Select State</option>
                          <option value="Andaman and Nicobar Islands">Andaman and Nicobar</option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                          <option value="Assam">Assam</option>
                          <option value="Bihar">Bihar</option>
                          <option value="Chandigarh">Chandigarh</option>
                          <option value="Chhattisgarh">Chhattisgarh</option>
                          <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                          <option value="Daman and Diu">Daman and Diu</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Goa">Goa</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Haryana">Haryana</option>
                          <option value="Himachal Pradesh">Himachal Pradesh</option>
                          <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                          <option value="Jharkhand">Jharkhand</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Ladakh">Ladakh</option>
                          <option value="Lakshadweep">Lakshadweep</option>
                          <option value="Madhya Pradesh">Madhya Pradesh</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Manipur">Manipur</option>
                          <option value="Meghalaya">Meghalaya</option>
                          <option value="Mizoram">Mizoram</option>
                          <option value="Nagaland">Nagaland</option>
                          <option value="Odisha">Odisha</option>
                          <option value="Puducherry">Puducherry</option>
                          <option value="Punjab">Punjab</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Sikkim">Sikkim</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Telangana">Telangana</option>
                          <option value="Tripura">Tripura</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Uttarakhand">Uttarakhand</option>
                          <option value="West Bengal">West Bengal</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[11px] uppercase tracking-wider text-ink-500 font-bold block flex items-center justify-between">
                      <span>Full Shipping Address (For Delivery)</span>
                      <span className="text-gold text-[9px] bg-gold/10 px-2 py-0.5 rounded-sm">Physical Delivery Included</span>
                    </label>
                    <input 
                      type="text"
                      name="address1"
                      required
                      value={formData.address1}
                      onChange={handleChange}
                      className="w-full bg-[#FDFBF7] border border-gold/40 p-4 text-black placeholder-black/50 font-medium shadow-inner focus:border-gold focus:ring-1 focus:ring-gold transition-all text-base sm:text-sm rounded-sm outline-none"
                      placeholder="Address Line 1 (House No, Building, Street Area...)"
                    />
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input 
                        type="text"
                        name="address2"
                        value={formData.address2}
                        onChange={handleChange}
                        className="w-full bg-[#FDFBF7] border border-gold/40 p-4 text-black placeholder-black/50 font-medium shadow-inner focus:border-gold focus:ring-1 focus:ring-gold transition-all text-base sm:text-sm rounded-sm outline-none"
                        placeholder="Address Line 2 (Optional)"
                      />
                      <input 
                        type="text"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleChange}
                        className="w-full bg-[#FDFBF7] border border-gold/40 p-4 text-black placeholder-black/50 font-medium shadow-inner focus:border-gold focus:ring-1 focus:ring-gold transition-all text-base sm:text-sm rounded-sm outline-none"
                        placeholder="Landmark (Optional)"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-ink-500 font-bold block">Pincode</label>
                    <input 
                      type="text" 
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="400001" 
                      className="w-full bg-[#FDFBF7] border border-gold/40 p-4 text-black placeholder-black/50 font-medium shadow-inner focus:border-gold focus:ring-1 focus:ring-gold transition-all text-base sm:text-sm rounded-sm outline-none"
                    />
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
                    <span className="text-xs font-bold text-gold shrink-0">Cashfree Secure</span>
                  </label>
                </div>

                <button 
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full relative group overflow-hidden bg-gradient-to-b from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 text-white transition-all py-4 font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  <Lock className="w-4 h-4" />
                  {isProcessing ? "Securing Connection..." : "Secure My Spot Now"}
                  
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
              <div className="text-[10px] font-bold tracking-widest">CASHFREE</div>
            </div>
            
          </div>

          {/* RIGHT COLUMN: THE OFFER STACK (Hormozi/Brunson Style) */}
          <div className="lg:col-span-5 relative w-full">
            {/* Desktop sticky behavior */}
            <div className="sticky top-24 space-y-6">

              {/* Order Summary Box */}
              <div className="bg-[#1A1613]/95 backdrop-blur-md border border-gold/20 rounded-sm shadow-2xl p-4 sm:p-8 relative">
                {/* Corner tape illusion */}
                <div className="absolute -top-3 -right-3 w-16 h-6 bg-gold/20 rotate-45 backdrop-blur-md hidden sm:block shadow-sm"></div>
                
                <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-ink-400 mb-4 sm:mb-6 border-b border-white/5 pb-3 sm:pb-4">Order Summary</h2>
                
                <div className="flex gap-3 sm:gap-4 mb-4 pb-4 sm:mb-6 sm:pb-6 border-b border-white/5">
                  <div className="w-14 h-20 sm:w-20 sm:h-24 bg-[#14100C] border border-white/10 shrink-0 relative overflow-hidden flex items-center justify-center">
                     <Image
                        src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1782388720/Shakespeare_Poetry_Award_Content_2_1080_x_1080_px_2_bko409.png"
                        alt="Award Book"
                        fill
                        className="object-cover opacity-80"
                      />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm sm:text-base leading-tight mb-1">Shakespeare Poetry Award — Volume 2</h3>
                    <p className="text-[11px] text-ink-400 font-light mt-2 uppercase tracking-wide">Standard Entry Package</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-gold">What You Specially Get Today:</h4>
                  
                  <ul className="space-y-2 sm:space-y-3">
                    <li className="flex items-start gap-2 sm:gap-3">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <div className="text-[13px]">
                        <span className="text-white font-medium">Guaranteed Publication</span>
                        <p className="text-ink-400 text-[11px] leading-tight mt-0.5 sm:mt-1">Your poem published permanently in the print anthology.</p>
                      </div>
                      <span className="ml-auto text-[11px] text-ink-500 line-through">₹1,500</span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <div className="text-[13px]">
                        <span className="text-white font-medium">Physical Home Delivery Included</span>
                        <p className="text-ink-400 text-[11px] leading-tight mt-0.5 sm:mt-1">The Next Shakespeare Certificate & Appreciation Letter physically shipped to your door.</p>
                      </div>
                      <span className="ml-auto text-[11px] text-ink-500 line-through">₹500</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/5 space-y-1 sm:space-y-2">
                  <div className="flex justify-between text-xs text-ink-400 font-bold uppercase tracking-widest">
                    <span>Total Real World Value</span>
                    <span className="line-through">₹2,000+</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-xs text-white uppercase tracking-widest font-bold">Today's Price</span>
                    <span className="text-2xl font-serif font-black text-gold">₹699</span>
                  </div>
                </div>
              </div>

              {/* Trust & Guarantee Box */}
              <div className="bg-[#14100C] border border-gold/20 rounded-sm p-5 sm:p-6 flex gap-4 items-start shadow-xl">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0 border border-gold/20">
                  <ShieldCheck className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-xs text-ink-400 font-light leading-relaxed">
                    We maintain a <strong className="text-white">99% successful delivery rate</strong> across India.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>


      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 w-full p-4 bg-[#14100C]/95 backdrop-blur-md border-t border-gold/20 z-50">
        <button 
          onClick={handleMobileCtaClick}
          disabled={isProcessing}
          className={`w-full relative group overflow-hidden bg-gradient-to-b from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 text-white transition-all py-4 font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-2 ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          <Lock className="w-4 h-4" />
          {isProcessing ? "Securing..." : (isFormFilled ? "Secure My Spot Now" : "Complete Details to Pay")}
        </button>
      </div>
    </div>
  );
}
