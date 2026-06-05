'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { CertificateData } from '@/lib/certificate';
import { MapPin, User, Phone, ShieldCheck, AlertCircle, ArrowLeft, CheckCircle2, Lock, Feather, Mail } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface ShippingClientProps {
  id: string;
  initialData: CertificateData | null;
}

type OrderStatus = 'checking' | 'already_ordered' | 'form' | 'creating_order' | 'success' | 'failed';

export default function ShippingClient({ id, initialData }: ShippingClientProps) {
  const router = useRouter();
  const [status, setStatus] = useState<OrderStatus>('checking');
  const [cashfree, setCashfree] = useState<any>(null);
  const [existingOrderDetails, setExistingOrderDetails] = useState<any>(null);

  const rawPhone = initialData?.customerPhone || '';
  const cleanPhone = rawPhone.replace(/^\+?91/, '').slice(0, 10);

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.customerEmail || '',
    phone: cleanPhone,
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [formError, setFormError] = useState<string | null>(null);

  // Load Cashfree script
  useEffect(() => {
    const initCashfree = () => {
      if (typeof window !== 'undefined' && (window as any).Cashfree) {
        try {
          const mode = process.env.NEXT_PUBLIC_CASHFREE_MODE || 'sandbox';
          setCashfree((window as any).Cashfree({ mode }));
          return true;
        } catch (err) {
          console.error('Error initializing Cashfree:', err);
        }
      }
      return false;
    };

    if (initCashfree()) return;

    const interval = setInterval(() => {
      if (initCashfree()) {
        clearInterval(interval);
      }
    }, 100);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const handleScriptLoad = () => {
    if (typeof window !== 'undefined' && (window as any).Cashfree) {
      const mode = process.env.NEXT_PUBLIC_CASHFREE_MODE || 'sandbox';
      setCashfree((window as any).Cashfree({ mode }));
    }
  };

  // Check if order exists
  useEffect(() => {
    const checkDbStatus = async () => {
      try {
        const res = await fetch(`/api/homedelivery/check-order?id=${id}`);
        const data = await res.json();
        if (data.ordered) {
          setExistingOrderDetails(data.order);
          setStatus('already_ordered');
        } else {
          setStatus('form');
        }
      } catch (err) {
        console.error('Error checking delivery order status:', err);
        setStatus('form');
      }
    };

    if (id) {
      checkDbStatus();
    } else {
      setStatus('failed');
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError(null);
  };

  const isFormValid = formData.name.trim() && formData.phone.length === 10 && formData.address.trim() && formData.city.trim() && formData.state.trim() && formData.pincode.trim();

  // Process Checkout Order Creation
  const handleOnSubmitPayment = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      setFormError('Please fill in all shipping fields correctly.');
      return;
    }

    if (!cashfree) {
      setFormError('Payment gateway loading... please wait a moment and try again.');
      return;
    }

    setStatus('creating_order');
    setFormError(null);

    try {
      // Step 1: Create transaction order on backend
      const res = await fetch('/api/homedelivery/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          certificateId: id,
          name: formData.name,
          email: formData.email.trim() || 'participant@poetryfestival.in',
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          amount: 1,
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create order');

      const createdOrderId = data.order_id;

      // Step 2: Open Cashfree payment modal
      const result = await cashfree.checkout({
        paymentSessionId: data.payment_session_id,
        redirectTarget: '_modal',
      });

      if (result.error) {
        console.error('Cashfree Checkout Error:', result.error);
        setFormError(result.error.message || 'Payment failed or was cancelled.');
        setStatus('form');
        return;
      }

      // Step 3: Server-side verification — poll until PAID (max 5 attempts)
      setStatus('creating_order'); // show loading while verifying
      let verified = false;

      for (let attempt = 0; attempt < 5; attempt++) {
        await new Promise(resolve => setTimeout(resolve, attempt * 1500)); // 0s, 1.5s, 3s, 4.5s, 6s

        try {
          const verifyRes = await fetch(`/api/homedelivery/verify-order?order_id=${createdOrderId}`);
          const verifyData = await verifyRes.json();

          if (verifyData.order_status === 'PAID') {
            verified = true;
            break;
          } else if (verifyData.order_status === 'EXPIRED' || verifyData.order_status === 'TERMINATED') {
            break; // payment failed, stop polling
          }
        } catch (verifyErr) {
          console.warn('Verification attempt failed:', verifyErr);
        }
      }

      if (verified) {
        setStatus('success');
        fireConfetti();
      } else {
        setFormError('Payment status could not be confirmed. If your payment was debited, please contact support@inkfetish.in');
        setStatus('form');
      }
    } catch (err: any) {
      console.error('Error initiating checkout:', err);
      setFormError(err.message || 'Something went wrong. Please try again.');
      setStatus('form');
    }
  };

  const fireConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-[#fdfbf7] flex flex-col relative overflow-hidden font-sans selection:bg-[#ebd298] selection:text-black">
      {/* Script injection */}
      <Script
        src="https://sdk.cashfree.com/js/v3/cashfree.js"
        onLoad={handleScriptLoad}
        strategy="afterInteractive"
      />

      {/* Decorative ambient backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c0117] via-[#030303] to-[#060010] pointer-events-none" />
      <div className="absolute top-[-10%] left-[-15%] w-[600px] h-[600px] bg-purple-950/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Sticky secure header */}
      <header className="sticky top-0 z-50 border-b border-gold/10 bg-[#050505]/95 backdrop-blur-md w-full">
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

      <div className="w-full max-w-md mx-auto px-4 sm:px-6 relative z-10 flex flex-col pt-8 flex-grow pb-12">
        {/* Header Back Button */}
        <button 
          onClick={() => router.push(`/poetryfestival/s2/${id}/homedelivery`)}
          className="flex items-center gap-2 text-[#888] hover:text-white transition-colors mb-8 text-xs font-bold uppercase tracking-widest self-start group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Kit
        </button>

        {/* Trust Builder Row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { stat: '1500+', label: 'Delivered', sub: 'Past Month', icon: '🚚' },
            { stat: '98%', label: 'Delivery', sub: 'Success', icon: '🛡️' },
            { stat: '4.9/5', label: 'Customer', sub: 'Rating', icon: '⭐' },
          ].map((item) => (
            <div key={item.stat} className="bg-[#0a0a0a] border border-white/5 rounded-xl p-3 text-center flex flex-col items-center gap-0.5 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
              <span className="text-base mb-0.5">{item.icon}</span>
              <span className="text-base font-black text-gold leading-none">{item.stat}</span>
              <span className="text-[9px] uppercase tracking-widest font-bold text-white/70 leading-tight">{item.label}</span>
              <span className="text-[9px] uppercase tracking-widest font-bold text-[#555] leading-tight">{item.sub}</span>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {status === 'checking' && (
            <motion.div key="checking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center p-12 bg-[#0a0a0a] rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10">
              <div className="w-10 h-10 border-4 border-white/10 border-t-gold rounded-full animate-spin mb-4" />
              <p className="text-[#888] font-bold uppercase tracking-widest text-xs">Loading Secure Checkout...</p>
            </motion.div>
          )}

          {status === 'already_ordered' && (
            <motion.div key="already_ordered" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0a0a0a] rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 p-8 text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-black text-white mb-2 font-serif">Already Claimed!</h2>
              <p className="text-[#888] mb-6 text-sm">You have already successfully claimed the Physical Honors Kit. Your kit is being prepared for dispatch.</p>
              
              <div className="bg-[#050505] p-4 rounded-xl text-left space-y-2 mb-6 border border-white/5">
                <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                  <span className="text-[#888] font-bold uppercase tracking-wider">Order ID</span>
                  <span className="font-mono text-gold font-bold">{existingOrderDetails?.order_id}</span>
                </div>
                <div className="flex justify-between items-center text-xs pt-1">
                  <span className="text-[#888] font-bold uppercase tracking-wider">Status</span>
                  <span className="text-green-500 font-black uppercase tracking-widest">Confirmed</span>
                </div>
              </div>
              <button 
                onClick={() => router.push(`/poetryfestival/s2/${id}`)}
                className="w-full py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-sm uppercase tracking-widest font-black rounded-lg transition-all"
              >
                Return to Dashboard
              </button>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0a0a0a] rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-600" />
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-3xl font-black text-gold mb-3 font-serif italic">Thank You!</h2>
              <p className="text-[#888] mb-6 font-medium leading-relaxed">
                Your secure payment was successful and your <strong className="text-white">Physical Honors Kit</strong> has been locked in.
              </p>
              <div className="bg-[#050505] p-4 rounded-xl border border-green-500/20 mb-8 text-left">
                <p className="text-xs text-green-400 font-medium">
                  We've sent a confirmation email. You will receive tracking details via WhatsApp/SMS once dispatched.
                </p>
              </div>
              <button 
                onClick={() => router.push(`/poetryfestival/s2/${id}`)}
                className="w-full py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-sm uppercase tracking-widest font-black rounded-lg transition-all"
              >
                Return to Dashboard
              </button>
            </motion.div>
          )}

          {(status === 'form' || status === 'creating_order') && (
            <motion.div key="form" initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="bg-[#0a0a0a] rounded-xl shadow-[0_0_80px_rgba(255,255,255,0.02)] border border-white/10 overflow-hidden relative">
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-50" />
              <div className="bg-[#050505] p-6 border-b border-white/5 relative">
                <h3 className="text-xl font-serif font-black text-[#ebd298] mb-1 italic">Where should we send it?</h3>
                <p className="text-[10px] text-green-500 uppercase tracking-widest font-bold flex items-center gap-1.5"><Lock className="w-3 h-3"/> Secure Shipping Details</p>
              </div>

              <div className="p-6">
                {formError && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3.5 rounded-lg mb-5 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{formError}</span>
                  </div>
                )}

                <form id="shipping-form" onSubmit={handleOnSubmitPayment} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-[#888] font-bold flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#555]" /> Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[#0d0b06] border border-gold/20 px-4 py-3.5 text-sm rounded-lg focus:border-gold/60 focus:ring-2 focus:ring-gold/20 outline-none transition-all text-[#ebd298] font-medium shadow-[inset_0_0_20px_rgba(197,160,89,0.03)] placeholder:text-[#4a3f25]"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-[#888] font-bold flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#555]" /> Phone / WhatsApp
                    </label>
                    <div className="flex w-full shadow-sm rounded-lg overflow-hidden border border-gold/20 focus-within:border-gold/60 focus-within:ring-2 focus-within:ring-gold/20 transition-all bg-[#0d0b06]">
                      <div className="bg-[#100e07] px-3 py-3.5 border-r border-gold/20 flex items-center gap-2 shrink-0">
                        <span className="text-base">🇮🇳</span>
                        <span className="text-sm font-bold text-[#888]">+91</span>
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        required
                        maxLength={10}
                        value={formData.phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          if (val.length <= 10) setFormData(prev => ({ ...prev, phone: val }));
                        }}
                        className="w-full px-4 py-3.5 text-sm outline-none text-[#ebd298] font-medium placeholder:text-[#4a3f25] bg-transparent"
                        placeholder="Enter 10-digit number"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-[#888] font-bold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#555]" /> Complete Shipping Address
                    </label>
                    <textarea
                      name="address"
                      required
                      rows={2}
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full bg-[#0d0b06] border border-gold/20 px-4 py-3.5 text-sm rounded-lg focus:border-gold/60 focus:ring-2 focus:ring-gold/20 outline-none transition-all text-[#ebd298] font-medium shadow-[inset_0_0_20px_rgba(197,160,89,0.03)] placeholder:text-[#4a3f25] resize-none"
                      placeholder="Flat/House No., Building, Street Name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-[#888] font-bold">City</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full bg-[#0d0b06] border border-gold/20 px-4 py-3.5 text-sm rounded-lg focus:border-gold/60 focus:ring-2 focus:ring-gold/20 outline-none transition-all text-[#ebd298] font-medium shadow-[inset_0_0_20px_rgba(197,160,89,0.03)] placeholder:text-[#4a3f25]"
                        placeholder="City"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-[#888] font-bold">Pincode</label>
                      <input
                        type="text"
                        name="pincode"
                        required
                        value={formData.pincode}
                        onChange={handleChange}
                        className="w-full bg-[#0d0b06] border border-gold/20 px-4 py-3.5 text-sm rounded-lg focus:border-gold/60 focus:ring-2 focus:ring-gold/20 outline-none transition-all text-[#ebd298] font-medium shadow-[inset_0_0_20px_rgba(197,160,89,0.03)] placeholder:text-[#4a3f25]"
                        placeholder="Pincode"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-white/5 mt-4">
                     <label className="text-[10px] uppercase tracking-wider text-[#888] font-bold">State / UT</label>
                      <select
                        name="state"
                        required
                        value={formData.state}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, state: e.target.value }));
                          setFormError(null);
                        }}
                        className="w-full bg-[#0d0b06] border border-gold/20 px-4 py-3.5 text-sm rounded-lg focus:border-gold/60 focus:ring-2 focus:ring-gold/20 outline-none transition-all font-medium shadow-[inset_0_0_20px_rgba(197,160,89,0.03)] appearance-none cursor-pointer"
                        style={{ color: formData.state ? '#ebd298' : '#4a3f25' }}
                      >
                        <option value="" disabled style={{ color: '#444', background: '#0a0a0a' }}>Select your state</option>
                        {[
                          'Andaman and Nicobar Islands','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar',
                          'Chandigarh','Chhattisgarh','Dadra and Nagar Haveli and Daman and Diu','Delhi',
                          'Goa','Gujarat','Haryana','Himachal Pradesh','Jammu and Kashmir','Jharkhand',
                          'Karnataka','Kerala','Ladakh','Lakshadweep','Madhya Pradesh','Maharashtra',
                          'Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Puducherry','Punjab',
                          'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
                          'Uttarakhand','West Bengal'
                        ].map(state => (
                          <option key={state} value={state} style={{ background: '#0a0a0a', color: '#fff' }}>
                            {state}
                          </option>
                        ))}
                      </select>
                  </div>
                </form>
              </div>

              <div className="p-6 bg-[#050505] border-t border-white/5 shrink-0">
                <button
                  type="submit"
                  form="shipping-form"
                  disabled={!isFormValid || status === 'creating_order'}
                  className={`w-full py-4 font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 rounded-lg transition-all relative overflow-hidden group ${isFormValid ? 'bg-green-500 text-black shadow-[0_8px_30px_rgba(34,197,94,0.3)] cursor-pointer hover:bg-green-400 hover:scale-[1.02] hover:-translate-y-1' : 'bg-white/5 text-[#555] border border-white/10 cursor-not-allowed'}`}
                >
                  {isFormValid && status !== 'creating_order' && (
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  )}
                  {status === 'creating_order' ? (
                    <><div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"/> PROCESSING...</>
                  ) : (
                    <><ShieldCheck className="w-5 h-5" /> {isFormValid ? 'PROCEED TO PAY ₹1' : 'ENTER DETAILS TO CONTINUE'}</>
                  )}
                </button>
                <div className="text-center text-[10px] text-[#555] mt-4 uppercase tracking-wider font-bold">
                  Payment is 100% Secure & Encrypted
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-white/5 pt-16 pb-16 px-6 bg-[#030303] mt-12">
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
    </div>
  );
}
