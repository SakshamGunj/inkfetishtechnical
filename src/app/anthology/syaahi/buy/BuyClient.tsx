'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Feather, ShieldCheck, Truck, Lock, ArrowLeft, Loader2, Star, CheckCircle2, Gift, PlusCircle, Heart, Clock } from 'lucide-react';

type PaymentStatus = 'idle' | 'creating' | 'paying' | 'verifying' | 'paid' | 'failed';

export default function BuyClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [addCertificate, setAddCertificate] = useState(false);
  const [addPortfolio, setAddPortfolio] = useState(false);

  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [cashfree, setCashfree] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra & Nagar Haveli and Daman & Diu",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
  ];

  // Pricing Logic
  const basePrice = 499;
  const earlyBirdDiscount = 114;
  const discountedPrice = basePrice - earlyBirdDiscount; // 385
  const certPrice = 50;
  const portPrice = 150;

  const totalAmount = discountedPrice + (addCertificate ? certPrice : 0) + (addPortfolio ? portPrice : 0);

  useEffect(() => {
    // Check for previous successful order to prevent double-buying
    const paidOrderId = localStorage.getItem('syaahi_paid_order_id');
    if (paidOrderId) {
      fetch(`/api/syahi/verify-order?order_id=${paidOrderId}`)
        .then(res => res.json())
        .then(data => {
          if (data.order_status === 'PAID') {
            window.location.href = `/anthology/syaahi/thank-you?order_id=${paidOrderId}`;
          } else {
            localStorage.removeItem('syaahi_paid_order_id');
          }
        })
        .catch(() => {});
    }

    // Load Cashfree SDK
    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.async = true;
    script.onload = () => {
      setCashfree((window as any).Cashfree({ 
        mode: process.env.NEXT_PUBLIC_CASHFREE_MODE || 'sandbox' 
      }));
    };
    document.head.appendChild(script);

    // Restore from localStorage
    const saved = localStorage.getItem('syahi_customer_info');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.whatsapp || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      setError('Please fill in all shipping details.');
      return false;
    }
    if (!/^\d{10}$/.test(formData.whatsapp.replace(/\D/g, '').slice(-10))) {
      setError('Please enter a valid 10-digit WhatsApp number.');
      return false;
    }
    if (!/^\d{6}$/.test(formData.pincode)) {
      setError('Please enter a valid 6-digit Pincode.');
      return false;
    }
    return true;
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;
    if (!cashfree) {
      setError('Payment system is loading. Please wait.');
      return;
    }

    setPaymentStatus('creating');
    localStorage.setItem('syahi_customer_info', JSON.stringify(formData));

    try {
      // 1. Create order with dynamic totalAmount
      const res = await fetch('/api/syahi/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalAmount,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.whatsapp,
          boughtCertificate: addCertificate,
          boughtPortfolio: addPortfolio,
          ...formData,
        }),
      });

      const orderData = await res.json();
      if (!res.ok) throw new Error(orderData.error || 'Failed to create order');

      setPaymentStatus('paying');

      // 2. Open Cashfree
      await cashfree.checkout({
        paymentSessionId: orderData.payment_session_id,
        redirectTarget: '_modal',
      });

      // 3. Verify
      setPaymentStatus('verifying');
      const verifyRes = await fetch(`/api/syahi/verify-order?order_id=${orderData.order_id}`);
      const verifyData = await verifyRes.json();

      if (verifyData.order_status === 'PAID') {
        setPaymentStatus('paid');
        localStorage.setItem('syaahi_paid_order_id', orderData.order_id);
        window.location.href = `/anthology/syaahi/thank-you?order_id=${orderData.order_id}`;
      } else {
        setPaymentStatus('failed');
        setError('Payment was not completed. Please try again.');
      }

    } catch (err: any) {
      console.error('Payment error:', err);
      setPaymentStatus('failed');
      setError(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700&display=swap');
        .font-cinzel { font-family: 'Montserrat', sans-serif; }
        .font-playfair { font-family: 'Outfit', sans-serif; }
        .bg-parchment {
          background-color: #f2e6d3;
          background-image: radial-gradient(circle at 50% 50%, transparent 20%, rgba(200, 180, 150, 0.1) 80%), linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4));
        }
        .text-navy { color: #0a1b3f; }
        .bg-navy { background-color: #0a1b3f; }
      `}} />

      <div className="min-h-screen bg-parchment text-navy font-sans selection:bg-navy selection:text-white pb-28 lg:pb-12 pt-16 px-6 relative">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] border-[1px] border-[#b8860b] rounded-full mix-blend-overlay"></div>
          <div className="absolute bottom-[-10%] left-[-20%] w-[600px] h-[600px] border-[1px] border-[#b8860b] rounded-full mix-blend-overlay"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <div className="mb-4 sm:mb-6 flex flex-row items-center justify-between border-b border-[#b8860b]/30 pb-2 sm:pb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <a href="/anthology/syaahi" className="p-1 sm:p-2 border border-[#b8860b]/30 rounded-full hover:bg-white/50 transition-colors">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#b8860b]" />
              </a>
              <div className="flex flex-col items-start">
                <h1 className="text-base sm:text-2xl font-cinzel font-bold text-navy leading-none">Checkout</h1>
                <p className="hidden sm:block text-xs font-playfair italic text-navy/70 mt-1">Secure your collector's edition</p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-white/50 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-[#b8860b]/20 backdrop-blur-sm">
              <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
              <span className="text-[8px] sm:text-xs font-cinzel font-bold tracking-widest text-navy uppercase">Secure SSL</span>
            </div>
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6 lg:gap-10">
            
            {/* Right Side: Order Summary (Now FIRST on mobile, SECOND on desktop via order classes) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="order-1 lg:order-2 lg:col-span-2 space-y-4"
            >
              <div className="bg-navy p-4 sm:p-6 lg:p-6 rounded-sm shadow-xl border border-[#b8860b]/40 relative overflow-hidden">
                 {/* Corner Ornaments */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#b8860b]/50"></div>
                <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#b8860b]/50"></div>
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#b8860b]/50"></div>
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#b8860b]/50"></div>

                <h3 className="text-lg font-cinzel font-bold text-[#f2e6d3] mb-4 uppercase tracking-widest border-b border-[#b8860b]/30 pb-3 flex items-center justify-between">
                  Order Summary
                </h3>
                
                <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr] gap-4 mb-6 items-center bg-white/5 p-3 rounded-sm border border-white/5">
                  <div className="w-20 h-28 sm:w-24 sm:h-32 bg-transparent shrink-0 relative flex items-center justify-center -ml-2">
                    <img 
                      src="https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1778137798/rbb6irz8p3oipppmuzld_2_fpgyrg.webp" 
                      alt="Syaahi Book" 
                      className="w-full h-full object-contain drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)] scale-110"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-base sm:text-lg font-cinzel font-bold text-[#f2e6d3] leading-tight mb-1">Syaahi Vol. 1</h4>
                    <p className="text-xs font-playfair italic text-[#f2e6d3]/60 mb-3">Collector's Edition</p>
                    <div className="inline-flex items-center gap-1.5 text-[0.6rem] sm:text-[0.65rem] font-bold text-[#b8860b] uppercase tracking-widest bg-[#b8860b]/10 w-fit px-2 py-1.5 rounded-sm border border-[#b8860b]/20">
                      <Star className="w-3 h-3 fill-current shrink-0" /> Official Anthology
                    </div>
                  </div>
                </div>

                <div className="space-y-2 font-playfair text-[#f2e6d3]/80 text-sm">
                  <div className="flex justify-between text-[#f2e6d3]">
                    <span>Syaahi Vol 1 (Launch Price)</span>
                    <span>₹{basePrice}</span>
                  </div>
                  <div className="flex justify-between text-[#b8860b] font-bold">
                    <span>Early Bird / Community Discount</span>
                    <span>-₹{earlyBirdDiscount}</span>
                  </div>

                  {/* Dynamic Bumps */}
                  {addCertificate && (
                    <div className="flex justify-between text-[#f2e6d3]">
                      <span>Official IWL Certificate</span>
                      <span>+₹{certPrice}</span>
                    </div>
                  )}
                  {addPortfolio && (
                    <div className="flex justify-between text-[#f2e6d3]">
                      <span>1-Year Author Portfolio Site</span>
                      <span>+₹{portPrice}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-green-400">
                    <span>Shipping</span>
                    <span className="font-bold uppercase text-xs tracking-wider">Free</span>
                  </div>

                  {/* Free Bonus */}
                  <div className="bg-[#b8860b]/10 border border-[#b8860b]/30 p-3 rounded-sm mt-4 flex items-start gap-3">
                    <Gift className="w-5 h-5 text-[#b8860b] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[#b8860b] font-cinzel font-bold text-sm">FREE BONUS SECURED</div>
                      <div className="text-xs opacity-80 leading-relaxed">
                        ₹150 Digital Cash to redeem on the next Inkfetish contest.
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#b8860b]/30 flex justify-between items-center mt-3">
                    <span className="text-base font-cinzel font-bold text-[#f2e6d3]">Final Total</span>
                    <span className="text-3xl font-cinzel font-black text-[#b8860b]">₹{totalAmount}</span>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/50 backdrop-blur-sm p-4 rounded-sm border border-[#b8860b]/20 flex flex-col items-center text-center">
                  <Truck className="w-6 h-6 text-[#b8860b] mb-2" />
                  <div className="text-xs font-cinzel font-bold text-navy tracking-widest">Express</div>
                  <div className="text-[0.65rem] font-playfair italic text-navy/60">Pan India Delivery</div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm p-4 rounded-sm border border-[#b8860b]/20 flex flex-col items-center text-center">
                  <ShieldCheck className="w-6 h-6 text-[#b8860b] mb-2" />
                  <div className="text-xs font-cinzel font-bold text-navy tracking-widest">Cashfree</div>
                  <div className="text-[0.65rem] font-playfair italic text-navy/60">Protected Payments</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-4 opacity-40 mix-blend-luminosity">
                <img src="https://cdn.cashfree.com/images/payment-icons/cards.png" alt="Cards" className="h-4" />
                <img src="https://cdn.cashfree.com/images/payment-icons/upi.png" alt="UPI" className="h-4" />
                <img src="https://cdn.cashfree.com/images/payment-icons/netbanking.png" alt="Netbanking" className="h-4" />
              </div>

              {/* Inkfetish Guarantee Badges */}
              <div className="pt-2">
                <div className="bg-navy/5 border border-[#b8860b]/20 rounded-sm p-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                    <span className="font-cinzel font-bold text-[9px] sm:text-[10px] text-navy uppercase tracking-widest">Premium Quality</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-[#b8860b] fill-[#b8860b]/20" />
                    <span className="font-cinzel font-bold text-[9px] sm:text-[10px] text-navy uppercase tracking-widest">Curated With Love</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-navy/70" />
                    <span className="font-cinzel font-bold text-[9px] sm:text-[10px] text-navy uppercase tracking-widest">Dispatches in 7-10 Days</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Left Side: Shipping Form & Order Bumps (Now SECOND on mobile, FIRST on desktop via order classes) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="order-2 lg:order-1 lg:col-span-3 space-y-8"
            >
              {/* Shipping Details */}
              <div className="bg-white/70 backdrop-blur-md p-5 sm:p-8 lg:p-8 rounded-sm shadow-xl border border-[#b8860b]/20 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#b8860b] to-transparent opacity-50"></div>
                
                <h2 className="text-xl lg:text-2xl font-cinzel font-bold text-navy mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-navy rounded-full flex items-center justify-center text-[#b8860b]">
                    <Truck className="w-4 h-4 lg:w-5 lg:h-5" />
                  </div>
                  Shipping Information
                </h2>

                <form id="checkout-form" onSubmit={handlePayment} className="space-y-4 lg:space-y-5 font-playfair text-base">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] lg:text-xs font-cinzel font-bold uppercase tracking-widest text-navy/70">Full Name</label>
                      <input 
                        type="text" name="name" required value={formData.name} onChange={handleInputChange}
                        className="w-full px-3 py-2.5 lg:px-4 lg:py-2.5 border-b border-navy/20 bg-transparent focus:border-[#b8860b] outline-none transition-all text-navy placeholder:text-navy/30"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] lg:text-xs font-cinzel font-bold uppercase tracking-widest text-navy/70">WhatsApp Number</label>
                      <input 
                        type="tel" name="whatsapp" required value={formData.whatsapp} onChange={handleInputChange}
                        className="w-full px-3 py-2.5 lg:px-4 lg:py-2.5 border-b border-navy/20 bg-transparent focus:border-[#b8860b] outline-none transition-all text-navy placeholder:text-navy/30"
                        placeholder="10-digit number"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] lg:text-xs font-cinzel font-bold uppercase tracking-widest text-navy/70">Email Address</label>
                    <input 
                      type="email" name="email" required value={formData.email} onChange={handleInputChange}
                      className="w-full px-3 py-2.5 lg:px-4 lg:py-2.5 border-b border-navy/20 bg-transparent focus:border-[#b8860b] outline-none transition-all text-navy placeholder:text-navy/30"
                      placeholder="name@example.com"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] lg:text-xs font-cinzel font-bold uppercase tracking-widest text-navy/70">Full Shipping Address</label>
                    <textarea 
                      name="address" required value={formData.address} onChange={handleInputChange} rows={2}
                      className="w-full px-3 py-2.5 lg:px-4 lg:py-2.5 border-b border-navy/20 bg-transparent focus:border-[#b8860b] outline-none transition-all text-navy placeholder:text-navy/30 resize-none"
                      placeholder="House No, Street, Landmark..."
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4 lg:gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] lg:text-xs font-cinzel font-bold uppercase tracking-widest text-navy/70">City</label>
                      <input 
                        type="text" name="city" required value={formData.city} onChange={handleInputChange}
                        className="w-full px-3 py-2.5 lg:px-4 lg:py-2.5 border-b border-navy/20 bg-transparent focus:border-[#b8860b] outline-none transition-all text-navy placeholder:text-navy/30"
                        placeholder="City"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] lg:text-xs font-cinzel font-bold uppercase tracking-widest text-navy/70">State</label>
                      <select 
                        name="state" required value={formData.state} onChange={handleInputChange as any}
                        className="w-full px-3 py-2.5 lg:px-4 lg:py-2.5 border-b border-navy/20 bg-transparent focus:border-[#b8860b] outline-none transition-all text-navy cursor-pointer"
                      >
                        <option value="" disabled className="text-navy/50 bg-[#f2e6d3]">Select State</option>
                        {indianStates.map(state => (
                          <option key={state} value={state} className="bg-white text-navy">{state}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] lg:text-xs font-cinzel font-bold uppercase tracking-widest text-navy/70">Pincode</label>
                      <input 
                        type="text" name="pincode" required value={formData.pincode} onChange={handleInputChange}
                        className="w-full px-3 py-2.5 lg:px-4 lg:py-2.5 border-b border-navy/20 bg-transparent focus:border-[#b8860b] outline-none transition-all text-navy placeholder:text-navy/30"
                        placeholder="6 digits"
                      />
                    </div>
                  </div>

                  {/* Order Bumps */}
                  <div className="pt-6 space-y-4">
                    <h3 className="font-cinzel font-bold text-navy border-b border-[#b8860b]/20 pb-2 flex items-center gap-2">
                      <Star className="w-4 h-4 text-[#b8860b] fill-current" /> Exclusive Upgrades
                    </h3>
                    
                    {/* Bump 1: Certificate */}
                    <div 
                      onClick={() => setAddCertificate(!addCertificate)}
                      className={`p-4 rounded-sm border-2 cursor-pointer transition-all flex items-start gap-4 ${addCertificate ? 'bg-[#b8860b]/10 border-[#b8860b]' : 'bg-white/50 border-navy/10 hover:border-[#b8860b]/50'}`}
                    >
                      <div className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${addCertificate ? 'bg-[#b8860b] border-[#b8860b] text-navy' : 'border-navy/30 bg-white'}`}>
                        {addCertificate && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-cinzel font-bold text-navy text-sm sm:text-base">Official Inkfetish Certificate</h4>
                          <span className="font-bold text-[#b8860b]">+₹50</span>
                        </div>
                        <p className="text-sm text-navy/70 mt-1 leading-snug">
                          Get your own personalized, printed community certificate from Inkfetish alongside your book.
                        </p>
                      </div>
                    </div>

                    {/* Bump 2: Portfolio */}
                    <div 
                      onClick={() => setAddPortfolio(!addPortfolio)}
                      className={`p-4 rounded-sm border-2 cursor-pointer transition-all flex items-start gap-4 ${addPortfolio ? 'bg-[#b8860b]/10 border-[#b8860b]' : 'bg-white/50 border-navy/10 hover:border-[#b8860b]/50'}`}
                    >
                      <div className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${addPortfolio ? 'bg-[#b8860b] border-[#b8860b] text-navy' : 'border-navy/30 bg-white'}`}>
                        {addPortfolio && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-cinzel font-bold text-navy text-sm sm:text-base">1-Year Author Portfolio Site</h4>
                          <span className="font-bold text-[#b8860b]">+₹150</span>
                        </div>
                        <p className="text-sm text-navy/70 mt-1 leading-snug">
                          Establish your digital presence with a premium, verified author portfolio website hosted by Inkfetish.
                        </p>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-50 text-red-700 rounded-sm text-sm font-playfair border border-red-200">
                      {error}
                    </motion.div>
                  )}

                  <div className="pt-4 lg:pt-6">
                    <button 
                      type="submit"
                      disabled={paymentStatus !== 'idle' && paymentStatus !== 'failed'}
                      className="w-full bg-navy text-[#f2e6d3] py-4 rounded-sm font-cinzel font-bold text-base lg:text-lg hover:bg-[#b8860b] hover:text-navy transition-all shadow-xl shadow-navy/20 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed border-2 border-transparent hover:border-[#b8860b]"
                    >
                      {paymentStatus === 'idle' || paymentStatus === 'failed' ? (
                        <>
                          PAY ₹{totalAmount} SECURELY
                          <Lock className="w-5 h-5 opacity-70" />
                        </>
                      ) : (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          {paymentStatus === 'creating' && 'Securing Order...'}
                          {paymentStatus === 'paying' && 'Awaiting Payment...'}
                          {paymentStatus === 'verifying' && 'Verifying Payment...'}
                        </>
                      )}
                    </button>
                    <div className="text-center mt-4 flex items-center justify-center gap-2 text-xs font-playfair text-navy/60">
                      <ShieldCheck className="w-4 h-4 text-green-600" />
                      <span>Guaranteed safe & secure checkout.</span>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Overlay for successful verification */}
        <AnimatePresence>
          {paymentStatus === 'paid' && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="fixed inset-0 z-[100] bg-navy flex flex-col items-center justify-center text-center p-6"
            >
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12 }}>
                <div className="w-24 h-24 bg-[#b8860b] rounded-full flex items-center justify-center text-navy mb-8 shadow-2xl">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
              </motion.div>
              <h2 className="text-4xl font-cinzel font-bold text-[#f2e6d3] mb-4">Payment Confirmed!</h2>
              <p className="text-[#f2e6d3]/60 mb-12 max-w-sm font-playfair italic text-lg">Your legacy is sealed. Redirecting you to the vault...</p>
              <Loader2 className="w-8 h-8 animate-spin text-[#b8860b]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sticky Bottom Checkout Bar (Mobile Priority) */}
        <div className="fixed bottom-0 left-0 w-full bg-navy/95 backdrop-blur-md border-t border-[#b8860b]/30 p-4 z-50 shadow-[0_-10px_30px_rgba(10,27,63,0.5)] lg:hidden">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-[#f2e6d3] font-cinzel font-bold text-xs uppercase tracking-widest">Total Pay</span>
              <span className="text-[#b8860b] font-cinzel font-black text-2xl leading-none">₹{totalAmount}</span>
            </div>
            <button 
              form="checkout-form"
              type="submit"
              disabled={paymentStatus !== 'idle' && paymentStatus !== 'failed'}
              className="flex-1 bg-[#b8860b] text-navy py-3 px-4 rounded-sm font-cinzel font-bold text-sm hover:bg-white transition-all shadow-xl uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-70 border-2 border-transparent hover:border-[#b8860b]"
            >
              {paymentStatus === 'idle' || paymentStatus === 'failed' ? (
                <>BUY NOW <Lock className="w-4 h-4 opacity-70" /></>
              ) : (
                <Loader2 className="w-5 h-5 animate-spin" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

