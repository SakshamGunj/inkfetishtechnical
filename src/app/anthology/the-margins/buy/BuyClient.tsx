'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Truck, Lock, ArrowLeft, Loader2, Star, CheckCircle2, Gift, Heart, Clock } from 'lucide-react';

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
    // Check for previous successful order
    const paidOrderId = localStorage.getItem('margins_paid_order_id');
    if (paidOrderId) {
      fetch(`/api/margins/verify-order?order_id=${paidOrderId}`)
        .then(res => res.json())
        .then(data => {
          if (data.order_status === 'PAID') {
            window.location.href = `/anthology/the-margins/thank-you?order_id=${paidOrderId}`;
          } else {
            localStorage.removeItem('margins_paid_order_id');
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
    const saved = localStorage.getItem('margins_customer_info');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    localStorage.setItem('margins_customer_info', JSON.stringify(formData));

    try {
      const res = await fetch('/api/margins/create-order', {
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

      await cashfree.checkout({
        paymentSessionId: orderData.payment_session_id,
        redirectTarget: '_modal',
      });

      setPaymentStatus('verifying');
      const verifyRes = await fetch(`/api/margins/verify-order?order_id=${orderData.order_id}`);
      const verifyData = await verifyRes.json();

      if (verifyData.order_status === 'PAID') {
        setPaymentStatus('paid');
        localStorage.setItem('margins_paid_order_id', orderData.order_id);
        window.location.href = `/anthology/the-margins/thank-you?order_id=${orderData.order_id}`;
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
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap');
        .font-oswald { font-family: 'Oswald', sans-serif; }
        .font-mono { font-family: 'Space Mono', monospace; }
        .font-inter { font-family: 'Inter', sans-serif; }
        
        .bg-typewriter-paper { 
            background-color: #F5EEDB;
            background-image: radial-gradient(#d3c6a6 1px, transparent 1px);
            background-size: 20px 20px;
            background-position: 0 0, 10px 10px;
        }
      `}} />

      <div className="min-h-screen bg-[#F05C33] text-[#111] font-inter selection:bg-[#111] selection:text-white pb-28 lg:pb-12 pt-8 sm:pt-12 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <a href="/anthology/the-margins" className="flex items-center gap-2 group text-[#111] hover:text-white transition-colors">
              <div className="bg-[#111] p-2 rounded-full text-white group-hover:bg-white group-hover:text-[#111] transition-colors border border-transparent group-hover:border-[#111]">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <span className="font-oswald font-bold uppercase tracking-widest text-sm hidden sm:block">Back to Anthology</span>
            </a>
            <div className="flex items-center gap-1.5 bg-[#111] px-4 py-2 text-white border-2 border-white/20">
              <ShieldCheck className="w-4 h-4 text-[#25D366]" />
              <span className="text-xs font-oswald font-bold tracking-widest uppercase">Secure Checkout</span>
            </div>
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
            
            {/* Left Side: Order Summary (First on mobile, Second on desktop) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="order-1 lg:order-2 lg:col-span-5 space-y-6"
            >
              <div className="bg-[#111] text-[#F5EEDB] p-6 sm:p-8 shadow-2xl relative border-l-4 border-[#F05C33]">
                <h3 className="text-2xl font-oswald font-bold uppercase tracking-widest border-b border-white/20 pb-4 mb-6 flex items-center justify-between text-white">
                  Order Summary
                </h3>
                
                <div className="flex items-center gap-5 mb-8 bg-white/5 p-4 border border-white/10">
                  <div className="w-24 h-32 shrink-0 relative flex items-center justify-center drop-shadow-2xl">
                    <img 
                      src="/margins-mockup.png" 
                      alt="The Margins Book Cover" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-xl font-oswald font-bold text-white leading-tight mb-1">The Margins</h4>
                    <p className="text-sm font-inter opacity-70 mb-3">Official Collection</p>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#111] uppercase tracking-widest bg-[#F05C33] px-2 py-1">
                      <Star className="w-3 h-3 fill-current" /> Hall of Fame
                    </div>
                  </div>
                </div>

                <div className="space-y-4 font-inter text-sm mb-6">
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="opacity-90">The Margins (Launch Price)</span>
                    <span className="font-bold">₹{basePrice}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10 text-[#F05C33]">
                    <span className="font-bold flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Early Bird / Community Discount</span>
                    <span className="font-bold">-₹{earlyBirdDiscount}</span>
                  </div>

                  {addCertificate && (
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="opacity-90">Official IWL Certificate</span>
                      <span className="font-bold">+₹{certPrice}</span>
                    </div>
                  )}
                  {addPortfolio && (
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="opacity-90">1-Year Author Portfolio</span>
                      <span className="font-bold">+₹{portPrice}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center py-2 border-b border-white/10 text-[#25D366]">
                    <span className="opacity-90">Shipping</span>
                    <span className="font-bold uppercase tracking-widest">Free</span>
                  </div>
                </div>

                {/* Free Bonus */}
                <div className="bg-[#F05C33]/20 border border-[#F05C33] p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Gift className="w-5 h-5 text-[#F05C33] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[#F05C33] font-oswald font-bold tracking-wide">FREE BONUS SECURED</div>
                      <div className="text-xs opacity-80 mt-1 font-inter">
                        ₹150 Digital Cash to redeem on the next Inkfetish contest.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F5EEDB] text-[#111] p-5 flex justify-between items-center -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 mt-6">
                  <span className="text-lg font-oswald font-bold uppercase tracking-widest">Final Total</span>
                  <span className="text-4xl font-oswald font-black text-[#F05C33]">₹{totalAmount}</span>
                </div>
              </div>

              {/* Badges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 p-4 border border-[#111]/20 flex flex-col items-center text-center backdrop-blur-sm">
                  <Truck className="w-6 h-6 text-[#111] mb-2" />
                  <div className="text-xs font-oswald font-bold text-[#111] tracking-widest uppercase">Free Delivery</div>
                  <div className="text-[10px] font-mono text-[#111]/70 mt-1">Pan India Shipping</div>
                </div>
                <div className="bg-white/20 p-4 border border-[#111]/20 flex flex-col items-center text-center backdrop-blur-sm">
                  <ShieldCheck className="w-6 h-6 text-[#111] mb-2" />
                  <div className="text-xs font-oswald font-bold text-[#111] tracking-widest uppercase">Secure Pay</div>
                  <div className="text-[10px] font-mono text-[#111]/70 mt-1">100% Protected</div>
                </div>
              </div>
            </motion.div>

            {/* Right Side: Shipping Form & Order Bumps (Second on mobile, First on desktop) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="order-2 lg:order-1 lg:col-span-7 space-y-6"
            >
              <div className="bg-typewriter-paper p-6 sm:p-8 shadow-2xl relative border-2 border-[#111]">
                <div className="flex items-center gap-3 mb-8 border-b-2 border-dashed border-[#111]/20 pb-4">
                  <div className="w-10 h-10 bg-[#F05C33] flex items-center justify-center text-white shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-oswald font-bold text-[#111] uppercase tracking-wide">
                    Shipping Details
                  </h2>
                </div>

                <form id="checkout-form" onSubmit={handlePayment} className="space-y-5 font-inter">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-oswald font-bold uppercase tracking-widest text-[#111]/70">Full Name</label>
                      <input 
                        type="text" name="name" required value={formData.name} onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-[#111]/20 focus:border-[#F05C33] outline-none transition-all text-[#111] placeholder:text-[#111]/30 font-medium"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-oswald font-bold uppercase tracking-widest text-[#111]/70">WhatsApp Number</label>
                      <input 
                        type="tel" name="whatsapp" required value={formData.whatsapp} onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-[#111]/20 focus:border-[#F05C33] outline-none transition-all text-[#111] placeholder:text-[#111]/30 font-medium"
                        placeholder="10-digit number"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-oswald font-bold uppercase tracking-widest text-[#111]/70">Email Address</label>
                    <input 
                      type="email" name="email" required value={formData.email} onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-[#111]/20 focus:border-[#F05C33] outline-none transition-all text-[#111] placeholder:text-[#111]/30 font-medium"
                      placeholder="name@example.com"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-oswald font-bold uppercase tracking-widest text-[#111]/70">Full Shipping Address</label>
                    <textarea 
                      name="address" required value={formData.address} onChange={handleInputChange} rows={3}
                      className="w-full px-4 py-3 bg-white border border-[#111]/20 focus:border-[#F05C33] outline-none transition-all text-[#111] placeholder:text-[#111]/30 font-medium resize-none"
                      placeholder="House No, Street, Landmark..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-oswald font-bold uppercase tracking-widest text-[#111]/70">City</label>
                      <input 
                        type="text" name="city" required value={formData.city} onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-[#111]/20 focus:border-[#F05C33] outline-none transition-all text-[#111] font-medium"
                        placeholder="City"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-oswald font-bold uppercase tracking-widest text-[#111]/70">State</label>
                      <select 
                        name="state" required value={formData.state} onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-[#111]/20 focus:border-[#F05C33] outline-none transition-all text-[#111] font-medium cursor-pointer"
                      >
                        <option value="" disabled>Select State</option>
                        {indianStates.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-oswald font-bold uppercase tracking-widest text-[#111]/70">Pincode</label>
                      <input 
                        type="text" name="pincode" required value={formData.pincode} onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-[#111]/20 focus:border-[#F05C33] outline-none transition-all text-[#111] font-medium"
                        placeholder="6 digits"
                      />
                    </div>
                  </div>

                  {/* Order Bumps */}
                  <div className="pt-8">
                    <h3 className="font-oswald font-bold text-[#111] text-lg border-b-2 border-dashed border-[#111]/20 pb-2 mb-4 uppercase tracking-widest">
                      Enhance Your Order
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Bump 1 */}
                      <div 
                        onClick={() => setAddCertificate(!addCertificate)}
                        className={`p-4 sm:p-5 border-2 cursor-pointer transition-all flex items-start gap-4 ${addCertificate ? 'bg-[#111] border-[#111] text-white shadow-xl' : 'bg-white border-[#111]/20 hover:border-[#111]/50 text-[#111]'}`}
                      >
                        <div className={`w-6 h-6 border-2 flex items-center justify-center shrink-0 mt-0.5 ${addCertificate ? 'border-white bg-[#F05C33] text-white' : 'border-[#111]/30 bg-[#F5EEDB]'}`}>
                          {addCertificate && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-oswald font-bold text-base sm:text-lg uppercase tracking-wide">Official Inkfetish Certificate</h4>
                            <span className={`font-bold ${addCertificate ? 'text-[#F05C33]' : 'text-[#111]'}`}>+₹50</span>
                          </div>
                          <p className={`text-sm leading-relaxed ${addCertificate ? 'text-white/80' : 'text-[#111]/70'}`}>
                            Get your own personalized, printed community certificate from Inkfetish alongside your book.
                          </p>
                        </div>
                      </div>

                      {/* Bump 2 */}
                      <div 
                        onClick={() => setAddPortfolio(!addPortfolio)}
                        className={`p-4 sm:p-5 border-2 cursor-pointer transition-all flex items-start gap-4 ${addPortfolio ? 'bg-[#111] border-[#111] text-white shadow-xl' : 'bg-white border-[#111]/20 hover:border-[#111]/50 text-[#111]'}`}
                      >
                        <div className={`w-6 h-6 border-2 flex items-center justify-center shrink-0 mt-0.5 ${addPortfolio ? 'border-white bg-[#F05C33] text-white' : 'border-[#111]/30 bg-[#F5EEDB]'}`}>
                          {addPortfolio && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-oswald font-bold text-base sm:text-lg uppercase tracking-wide">1-Year Author Portfolio Site</h4>
                            <span className={`font-bold ${addPortfolio ? 'text-[#F05C33]' : 'text-[#111]'}`}>+₹150</span>
                          </div>
                          <p className={`text-sm leading-relaxed ${addPortfolio ? 'text-white/80' : 'text-[#111]/70'}`}>
                            Establish your digital presence with a premium, verified author portfolio website hosted by Inkfetish.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-100 text-red-700 font-bold border-l-4 border-red-500 text-sm mt-4">
                      {error}
                    </motion.div>
                  )}

                  <div className="pt-6 hidden lg:block">
                    <button 
                      type="submit"
                      disabled={paymentStatus !== 'idle' && paymentStatus !== 'failed'}
                      className="w-full bg-[#111] text-white py-5 font-oswald font-bold text-xl hover:bg-[#F05C33] transition-colors shadow-2xl flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest border-4 border-transparent hover:border-white/20"
                    >
                      {paymentStatus === 'idle' || paymentStatus === 'failed' ? (
                        <>
                          PAY ₹{totalAmount} SECURELY
                          <Lock className="w-5 h-5 opacity-80" />
                        </>
                      ) : (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          Processing Order...
                        </>
                      )}
                    </button>
                    <div className="text-center mt-4 flex items-center justify-center gap-2 text-xs font-mono text-[#111]/60 font-bold uppercase tracking-widest">
                      <ShieldCheck className="w-4 h-4 text-[#25D366]" />
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
              className="fixed inset-0 z-[100] bg-[#111] flex flex-col items-center justify-center text-center p-6"
            >
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12 }}>
                <div className="w-24 h-24 bg-[#F05C33] rounded-full flex items-center justify-center text-white mb-8 shadow-[0_0_50px_rgba(240,92,51,0.5)]">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
              </motion.div>
              <h2 className="text-4xl sm:text-5xl font-oswald font-bold text-white mb-4 uppercase tracking-widest">Order Confirmed!</h2>
              <p className="text-white/60 mb-12 max-w-sm font-mono text-sm leading-relaxed">Your legacy is sealed. Redirecting you to the confirmation page...</p>
              <Loader2 className="w-8 h-8 animate-spin text-[#F05C33]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sticky Bottom Checkout Bar (Mobile Priority) */}
        <div className="fixed bottom-0 left-0 w-full bg-[#111] border-t-4 border-[#F05C33] p-4 z-50 shadow-[0_-15px_40px_rgba(0,0,0,0.5)] lg:hidden">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-[#F5EEDB] font-mono font-bold text-[10px] uppercase tracking-widest">Total Secure Pay</span>
              <span className="text-white font-oswald font-black text-3xl leading-none mt-1">₹{totalAmount}</span>
            </div>
            <button 
              form="checkout-form"
              type="submit"
              disabled={paymentStatus !== 'idle' && paymentStatus !== 'failed'}
              className="flex-1 bg-[#F05C33] text-white py-3.5 px-4 font-oswald font-bold text-lg hover:bg-white hover:text-[#111] transition-colors shadow-xl uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {paymentStatus === 'idle' || paymentStatus === 'failed' ? (
                <>PAY NOW <Lock className="w-4 h-4 opacity-70" /></>
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
