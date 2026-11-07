'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Smartphone,
  User,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Lock,
  Scroll,
  ChevronRight,
  Star,
  Building2,
  Hash,
  Mail,
  FileSpreadsheet,
  Truck,
  Check,
} from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const INDIAN_STATES = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

const LOCAL_STORAGE_KEY = 'iwl_s2_599_address_submitted';

interface CustomerRecord {
  orderId: string;
  referenceId: string;
  name: string;
  phone: string; // 10 digit
  fullPhone: string; // 91 + 10 digit
  email: string;
  amount: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  updatedAt?: string;
}

type Step = 'loading_cache' | 'verify_phone' | 'fill_address' | 'already_recorded';

export default function AddressPortalClient() {
  const [step, setStep] = useState<Step>('loading_cache');
  const [phoneInput, setPhoneInput] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  const [customer, setCustomer] = useState<CustomerRecord | null>(null);

  // Address form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [justSubmitted, setJustSubmitted] = useState(false);

  //Deterministic star positions for hydration safety
  const stars = [
    { top: '12%', left: '18%', size: '2.5px', dur: '3.2s' },
    { top: '24%', left: '82%', size: '2px', dur: '4.1s' },
    { top: '38%', left: '10%', size: '3px', dur: '2.7s' },
    { top: '65%', left: '88%', size: '2.2px', dur: '3.8s' },
    { top: '78%', left: '22%', size: '2.8px', dur: '2.5s' },
    { top: '15%', left: '52%', size: '2px', dur: '4.5s' },
    { top: '48%', left: '74%', size: '3px', dur: '3.1s' },
    { top: '86%', left: '64%', size: '2.4px', dur: '2.9s' },
    { top: '32%', left: '34%', size: '1.8px', dur: '3.6s' },
    { top: '55%', left: '15%', size: '2.6px', dur: '4.2s' },
  ];

  // Check localStorage on mount so returning users immediately see "Your address is already recorded"
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.phone && parsed.address) {
          setCustomer(parsed);
          setStep('already_recorded');
          return;
        }
      }
    } catch (e) {
      console.error('Error reading localStorage:', e);
    }
    setStep('verify_phone');
  }, []);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 95,
        spread: 75,
        origin: { y: 0.6 },
      });
    } catch (e) {}
  };

  // Step 1: Verify 10-digit phone number (backend automatically prepends 91 to verify against CSV)
  const handleVerifyPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phoneInput.replace(/\D/g, '').slice(0, 10);

    if (cleanPhone.length !== 10) {
      setVerifyError('Please enter a valid 10-digit WhatsApp/Mobile number.');
      return;
    }

    setVerifying(true);
    setVerifyError(null);

    try {
      const res = await fetch(`/api/iwl/address?phone=${cleanPhone}`);
      const data = await res.json();

      if (!res.ok || !data.verified) {
        setVerifyError(
          data.error ||
            `No ₹599 IWL Certificate order found for +91 ${cleanPhone}. Please enter the 10-digit number used during payment.`
        );
        setVerifying(false);
        return;
      }

      const cust: CustomerRecord = data.customer;

      if (data.alreadySubmitted) {
        setCustomer(cust);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cust));
        setStep('already_recorded');
        setVerifying(false);
        return;
      }

      setCustomer(cust);
      setName(cust.name || '');
      setPhone(cust.phone || cleanPhone);
      setStep('fill_address');
    } catch (err: any) {
      setVerifyError('Something went wrong while verifying your number. Please try again.');
    } finally {
      setVerifying(false);
    }
  };

  // Step 2: Submit shipping address
  const handleSubmitAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const cleanPincode = pincode.replace(/\D/g, '');
    if (!name.trim()) {
      setSubmitError('Please enter your full name.');
      return;
    }
    if (phone.replace(/\D/g, '').length !== 10) {
      setSubmitError('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!address.trim() || address.trim().length < 5) {
      setSubmitError('Please enter your complete delivery address (House/Flat No., Building, Street, Area).');
      return;
    }
    if (!state) {
      setSubmitError('Please select your State from the dropdown.');
      return;
    }
    if (cleanPincode.length !== 6) {
      setSubmitError('Please enter a valid 6-digit Pincode.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/iwl/address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: customer?.phone || phone,
          name: name.trim(),
          address: address.trim(),
          city: city.trim(),
          state,
          pincode: cleanPincode,
        }),
      });

      const data = await res.json();

      if (res.status === 409 || data.alreadySubmitted) {
        const existingCust = data.customer || {
          ...customer,
          name,
          address,
          city,
          state,
          pincode: cleanPincode,
        };
        setCustomer(existingCust);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingCust));
        setStep('already_recorded');
        setSubmitting(false);
        return;
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save your shipping address.');
      }

      const updatedCustomer: CustomerRecord = data.customer;

      // Save in localStorage so revisiting the portal immediately shows "Your address is already recorded"
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCustomer));

      setCustomer(updatedCustomer);
      setJustSubmitted(true);
      setStep('already_recorded');
      triggerConfetti();
    } catch (err: any) {
      setSubmitError(err.message || 'Could not save address. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-x-hidden min-h-screen font-sans selection:bg-[#420C0C] selection:text-[#FFD700] bg-[#1A0505] text-[#FFD700] flex flex-col justify-between">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Cinematic Background matching IWL Season 2 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#420C0C] via-[#2A0A0A] to-[#000000]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 animate-pulse" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {stars.map((s, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#FFD700] opacity-30 animate-pulse"
              style={{
                top: s.top,
                left: s.left,
                width: s.size,
                height: s.size,
                animationDuration: s.dur,
              }}
            />
          ))}
        </div>
      </div>

      {/* Minimal Logo Navbar matching IWL Season 2 */}
      <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-[#E0C097]/20 flex-shrink-0 max-w-[55%]">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center p-1 shadow-lg flex-shrink-0">
            <img src="/images/inkfetish_logo.png" alt="Inkfetish Publication" className="w-full h-full object-contain" />
          </div>
          <span className="font-sans font-bold text-[9px] md:text-xs text-[#E5D4B3] tracking-widest uppercase whitespace-nowrap overflow-hidden text-ellipsis">
            Inkfetish Publication
          </span>
        </div>

        <div className="flex flex-col items-end gap-1 bg-gradient-to-b from-black/60 to-black/30 backdrop-blur-md px-3 py-1.5 md:px-5 md:py-2 rounded-xl border border-[#FFD700]/40 shadow-[0_0_15px_rgba(255,215,0,0.15)] flex-shrink-0">
          <div className="flex items-center gap-1 text-[#FFD700] text-[8px] md:text-[9px] font-sans font-bold uppercase tracking-widest">
            <span className="text-green-500">✓</span> Verified Portal
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              <Star className="w-2.5 h-2.5 md:w-4 md:h-4 text-[#FFD700] fill-[#FFD700]" />
              <Star className="w-2.5 h-2.5 md:w-4 md:h-4 text-[#FFD700] fill-[#FFD700]" />
              <Star className="w-2.5 h-2.5 md:w-4 md:h-4 text-[#FFD700] fill-[#FFD700]" />
              <Star className="w-2.5 h-2.5 md:w-4 md:h-4 text-[#FFD700] fill-[#FFD700]" />
              <Star className="w-2.5 h-2.5 md:w-4 md:h-4 text-[#FFD700] fill-[#FFD700]" />
            </div>
            <span className="font-sans font-black text-[10px] md:text-sm text-[#FFD700] tracking-widest leading-none">
              4.8/5
            </span>
          </div>
        </div>
      </div>

      {/* Scrolling News Ticker matching IWL Season 2 */}
      <div className="absolute top-[80px] md:top-[90px] left-0 right-0 overflow-hidden z-40 bg-black/30 backdrop-blur-md border-y border-[#FFD700]/30 py-1.5">
        <div className="whitespace-nowrap animate-[marquee_22s_linear_infinite] flex items-center gap-8 text-[#FFD700] text-xs md:text-sm font-semibold uppercase tracking-wider">
          <span>📦 Official Certificate & Honours Kit Dispatch Portal — Verify your 10-digit number to lock your shipping address.</span>
          <span>•</span>
          <span>📦 Official Certificate & Honours Kit Dispatch Portal — Verify your 10-digit number to lock your shipping address.</span>
          <span>•</span>
          <span>📦 Official Certificate & Honours Kit Dispatch Portal — Verify your 10-digit number to lock your shipping address.</span>
          <span>•</span>
          <span>📦 Official Certificate & Honours Kit Dispatch Portal — Verify your 10-digit number to lock your shipping address.</span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="relative z-40 max-w-4xl w-full mx-auto px-4 pt-32 md:pt-40 pb-16">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col items-center justify-center mb-8 md:mb-10"
        >
          <div className="text-[#FFD700] text-xs md:text-sm mb-4 tracking-[0.2em] font-serif border border-[#FFD700] px-4 py-1 rounded-full bg-black/50 backdrop-blur-sm uppercase">
            SEASON 2: OFFICIAL DISPATCH PORTAL
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-center leading-tight drop-shadow-[0_0_15px_rgba(255,215,0,0.3)] mb-6">
            <span className="block text-[#E5D4B3]">INDIAN</span>
            <span className="block text-[#FFD700] font-bold mt-[-6px] md:mt-[-10px]">WRITERS</span>
            <span className="block text-[#E5D4B3] mt-1.5 text-2xl md:text-4xl tracking-[0.3em]">LEAGUE</span>
          </h1>

          {/* Trust Indicators - Glassmorphic Style matching Season 2 */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 w-full max-w-md mx-auto">
            <div className="flex flex-col items-center justify-center text-center p-2.5 md:p-3.5 rounded-xl bg-black/40 border border-[#E0C097]/20 shadow-lg backdrop-blur-md">
              <Lock className="w-4 h-4 md:w-5 md:h-5 text-[#FFD700] mb-1" />
              <span className="text-[8px] md:text-xs font-black uppercase tracking-wider text-[#E5D4B3] leading-tight">
                Phone Verified
              </span>
              <span className="text-[7px] md:text-[10px] text-[#A1887F] font-bold mt-0.5 leading-tight">
                ₹599 Order Match
              </span>
            </div>
            <div className="flex flex-col items-center justify-center text-center p-2.5 md:p-3.5 rounded-xl bg-black/40 border border-[#E0C097]/20 shadow-lg backdrop-blur-md">
              <Truck className="w-4 h-4 md:w-5 md:h-5 text-[#FFD700] mb-1" />
              <span className="text-[8px] md:text-xs font-black uppercase tracking-wider text-[#E5D4B3] leading-tight">
                Safe Dispatch
              </span>
              <span className="text-[7px] md:text-[10px] text-[#A1887F] font-bold mt-0.5 leading-tight">
                Home Delivery
              </span>
            </div>
          </div>
        </motion.div>

        {/* Form Steps Area */}
        <AnimatePresence mode="wait">
          {/* LOADING CACHE */}
          {step === 'loading_cache' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/40 backdrop-blur-md border border-[#E0C097]/30 rounded-xl p-10 text-center max-w-2xl mx-auto shadow-2xl"
            >
              <div className="w-12 h-12 border-4 border-[#FFD700] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="font-serif text-lg text-[#E0C097]">Checking Verification Status...</p>
            </motion.div>
          )}

          {/* STEP 1: VERIFY 10-DIGIT PHONE NUMBER */}
          {step === 'verify_phone' && (
            <motion.div
              key="verify_phone"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <h3 className="text-2xl md:text-3xl text-center font-serif text-[#E0C097] mb-6 drop-shadow-md">
                Certificate Shipping Address Form
              </h3>

              <form
                onSubmit={handleVerifyPhone}
                className="space-y-6 bg-white/95 backdrop-blur-sm p-6 md:p-10 rounded-xl shadow-2xl border border-[#D7CCC8]"
              >
                <div className="border-b border-[#D7CCC8] pb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#420C0C] text-[#FFD700] font-serif text-xs font-bold uppercase tracking-wider mb-2">
                    Step 1 of 2 • Verification
                  </span>
                  <h4 className="font-serif font-bold text-xl md:text-2xl text-[#2A0A0A]">
                    Verify Your Registered Phone Number
                  </h4>
                  <p className="text-sm text-[#4E342E] font-serif mt-1">
                    Enter your 10-digit WhatsApp/Mobile number used during your ₹599 certificate order.
                  </p>
                </div>

                {verifyError && (
                  <div className="bg-red-50 border border-red-300 text-red-900 p-4 rounded-xl flex items-start gap-3 font-serif text-sm">
                    <AlertCircle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
                    <span>{verifyError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-[#420C0C] font-bold mb-2 md:mb-3 flex items-center gap-2 md:text-lg font-serif">
                    <Smartphone className="w-5 h-5" /> 10-Digit WhatsApp / Mobile Number
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-[#D7CCC8] pr-3">
                      <img src="https://flagcdn.com/w20/in.png" alt="India" className="w-6" />
                      <span className="text-[#4E342E] font-bold md:text-lg">+91</span>
                    </div>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      required
                      value={phoneInput}
                      onChange={(e) => {
                        setPhoneInput(e.target.value.replace(/\D/g, '').slice(0, 10));
                        setVerifyError(null);
                      }}
                      className="w-full bg-white border border-[#D7CCC8] p-4 md:p-5 pl-28 md:pl-32 rounded-xl focus:border-[#420C0C] focus:ring-2 focus:ring-[#420C0C]/50 outline-none font-serif text-lg md:text-xl tracking-widest text-[#2A0A0A] placeholder:text-[#A1887F]"
                      placeholder="9999999999"
                    />
                  </div>
                  <p className="text-xs text-[#4E342E]/80 font-serif mt-2 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#420C0C]" />
                    Enter only your 10-digit number (system automatically checks with <strong>91</strong> prefix).
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={verifying || phoneInput.length !== 10}
                  className={`w-full py-4 bg-[#FFD700] text-[#2A0A0A] font-bold text-base md:text-lg rounded-lg hover:bg-[#FFE55C] shadow-lg flex items-center justify-center gap-2 transition-transform ${
                    phoneInput.length === 10 && !verifying
                      ? 'hover:scale-[1.02] cursor-pointer'
                      : 'opacity-60 cursor-not-allowed'
                  }`}
                >
                  {verifying ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#2A0A0A]/30 border-t-[#2A0A0A] rounded-full animate-spin" />
                      Verifying Phone Number...
                    </>
                  ) : (
                    <>
                      Verify & Proceed to Address <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}

          {/* STEP 2: FILL FULL ADDRESS */}
          {step === 'fill_address' && customer && (
            <motion.div
              key="fill_address"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto"
            >
              <h3 className="text-2xl md:text-3xl text-center font-serif text-[#E0C097] mb-6 drop-shadow-md">
                Complete Your Shipping Address
              </h3>

              {/* Verified Writer Banner matching Season 2 dark glass card */}
              <div className="bg-black/40 backdrop-blur-md border border-[#FFD700]/40 p-4 md:p-6 rounded-xl flex items-center justify-between gap-3 shadow-lg mb-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-green-500/20 border border-green-400/40 text-green-300 text-[10px] font-bold uppercase tracking-widest">
                      ✓ Phone Verified
                    </span>
                    <span className="text-xs text-[#E5D4B3] font-mono opacity-80">
                      Order: {customer.orderId}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 md:w-5 md:h-5 text-[#FFD700] flex-shrink-0" />
                    <p className="font-serif font-bold text-base md:text-2xl text-[#FFD700] truncate">
                      {customer.name}
                    </p>
                  </div>
                  <p className="text-xs md:text-sm text-[#E5D4B3] opacity-85 flex flex-wrap items-center gap-2 mt-1">
                    {customer.email && customer.email !== 'N/A' && (
                      <>
                        <span className="flex items-center gap-1 truncate">
                          <Mail className="w-3.5 h-3.5" /> {customer.email}
                        </span>
                        <span className="text-[#FFD700]/50">•</span>
                      </>
                    )}
                    <span className="flex items-center gap-1 whitespace-nowrap">
                      <Smartphone className="w-3.5 h-3.5" /> +91 {customer.phone}
                    </span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setStep('verify_phone');
                    setVerifyError(null);
                  }}
                  className="flex-shrink-0 text-[10px] md:text-xs font-bold uppercase tracking-widest border border-[#E0C097]/40 text-[#E5D4B3] px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-[#FFD700]/10 transition-colors"
                >
                  Change Number
                </button>
              </div>

              {/* White/Cream Form Card matching Season 2 */}
              <form
                onSubmit={handleSubmitAddress}
                className="space-y-6 bg-white/95 backdrop-blur-sm p-6 md:p-10 rounded-xl shadow-2xl border border-[#D7CCC8]"
              >
                {submitError && (
                  <div className="bg-red-50 border border-red-300 text-red-900 p-4 rounded-xl flex items-start gap-3 font-serif text-sm">
                    <AlertCircle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="md:col-span-1">
                    <label className="block text-[#420C0C] font-bold mb-2 flex items-center gap-2 md:text-lg font-serif">
                      <User className="w-5 h-5" /> Recipient Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border border-[#D7CCC8] p-4 rounded-xl focus:border-[#420C0C] focus:ring-2 focus:ring-[#420C0C]/50 outline-none font-serif text-base md:text-lg text-[#2A0A0A] placeholder:text-[#A1887F]"
                      placeholder="Full Name"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="md:col-span-1">
                    <label className="block text-[#420C0C] font-bold mb-2 flex items-center gap-2 md:text-lg font-serif">
                      <Smartphone className="w-5 h-5" /> Phone Number (10 Digits)
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-[#D7CCC8] pr-3">
                        <img src="https://flagcdn.com/w20/in.png" alt="India" className="w-5" />
                        <span className="text-[#4E342E] font-bold">+91</span>
                      </div>
                      <input
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="w-full bg-white border border-[#D7CCC8] p-4 pl-24 rounded-xl focus:border-[#420C0C] focus:ring-2 focus:ring-[#420C0C]/50 outline-none font-serif text-base md:text-lg tracking-wider text-[#2A0A0A]"
                        placeholder="9999999999"
                      />
                    </div>
                  </div>

                  {/* Full Street Address */}
                  <div className="md:col-span-2">
                    <label className="block text-[#420C0C] font-bold mb-2 flex items-center gap-2 md:text-lg font-serif">
                      <MapPin className="w-5 h-5" /> Complete Delivery Address
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-white border border-[#D7CCC8] p-4 rounded-xl focus:border-[#420C0C] focus:ring-2 focus:ring-[#420C0C]/50 outline-none font-serif text-base md:text-lg text-[#2A0A0A] placeholder:text-[#A1887F] resize-none"
                      placeholder="House/Flat No., Building Name, Street/Road, Locality, Landmark..."
                    />
                  </div>

                  {/* City / Town */}
                  <div className="md:col-span-1">
                    <label className="block text-[#420C0C] font-bold mb-2 flex items-center gap-2 md:text-lg font-serif">
                      <Building2 className="w-5 h-5" /> City / District
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-white border border-[#D7CCC8] p-4 rounded-xl focus:border-[#420C0C] focus:ring-2 focus:ring-[#420C0C]/50 outline-none font-serif text-base md:text-lg text-[#2A0A0A] placeholder:text-[#A1887F]"
                      placeholder="Enter your City or Town"
                    />
                  </div>

                  {/* Pincode */}
                  <div className="md:col-span-1">
                    <label className="block text-[#420C0C] font-bold mb-2 flex items-center gap-2 md:text-lg font-serif">
                      <Hash className="w-5 h-5" /> Pincode (6 Digits)
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="w-full bg-white border border-[#D7CCC8] p-4 rounded-xl focus:border-[#420C0C] focus:ring-2 focus:ring-[#420C0C]/50 outline-none font-serif text-base md:text-lg tracking-widest text-[#2A0A0A] placeholder:text-[#A1887F]"
                      placeholder="e.g. 110001"
                    />
                  </div>

                  {/* State Dropdown Selection */}
                  <div className="md:col-span-2">
                    <label className="block text-[#420C0C] font-bold mb-2 flex items-center gap-2 md:text-lg font-serif">
                      <Truck className="w-5 h-5" /> Select State / Union Territory
                    </label>
                    <select
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-white border border-[#D7CCC8] p-4 md:p-5 rounded-xl focus:border-[#420C0C] focus:ring-2 focus:ring-[#420C0C]/50 outline-none font-serif text-base md:text-lg text-[#2A0A0A] cursor-pointer"
                    >
                      <option value="" disabled>
                        -- Select Your State from Dropdown --
                      </option>
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="bg-[#FFF8E7] border border-[#E0C097] rounded-xl p-4 text-xs md:text-sm text-[#420C0C] font-serif flex items-start gap-2.5">
                  <Lock className="w-4 h-4 text-[#420C0C] shrink-0 mt-0.5" />
                  <span>
                    <strong>One-Time Submission Notice:</strong> Please verify your full address and pincode carefully. Once you submit, your address will be locked in our dispatch records and cannot be edited again.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-[#FFD700] text-[#2A0A0A] font-bold text-base md:text-lg rounded-lg hover:bg-[#FFE55C] shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#2A0A0A]/30 border-t-[#2A0A0A] rounded-full animate-spin" />
                      Recording Your Address...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" /> Submit & Lock Shipping Address
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}

          {/* STEP 3: ADDRESS ALREADY RECORDED */}
          {step === 'already_recorded' && (
            <motion.div
              key="already_recorded"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white/95 backdrop-blur-sm p-8 md:p-10 rounded-xl shadow-2xl border-2 border-[#FFD700] text-center">
                <div className="w-20 h-20 rounded-full bg-[#420C0C] border-4 border-[#FFD700] flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <Check className="w-10 h-10 text-[#FFD700]" />
                </div>

                <span className="inline-block px-4 py-1 rounded-full bg-[#420C0C] text-[#FFD700] font-serif text-xs font-bold uppercase tracking-widest mb-3">
                  ✓ Dispatch Record Confirmed
                </span>

                <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#2A0A0A] mb-2">
                  Your Address is Already Recorded!
                </h2>
                <p className="text-sm md:text-base font-serif text-[#4E342E] max-w-lg mx-auto mb-6">
                  {justSubmitted
                    ? 'Thank you! Your shipping address has been securely recorded for your IWL Season 2 Certificate & Honours Kit.'
                    : 'Thank you! Your shipping address has already been recorded in our portal. Multiple submissions are locked to ensure accurate dispatch.'}
                </p>

                {customer && (
                  <div className="bg-[#FAF5EF] border border-[#D7CCC8] rounded-xl p-5 md:p-6 text-left font-serif space-y-2 mb-6 shadow-inner">
                    <div className="flex items-center justify-between border-b border-[#D7CCC8] pb-2 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#420C0C]">
                        Locked Delivery Details
                      </span>
                      <span className="text-xs font-mono font-bold text-[#4E342E]">
                        {customer.orderId}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-[#2A0A0A]">{customer.name}</p>
                    <p className="text-sm md:text-base text-[#4E342E] leading-relaxed">
                      {customer.address}
                      {customer.city ? `, ${customer.city}` : ''}
                    </p>
                    <p className="text-sm md:text-base font-bold text-[#2A0A0A]">
                      {customer.state} — {customer.pincode}
                    </p>
                    <p className="text-xs md:text-sm text-[#4E342E] pt-1">
                      <strong>Phone:</strong> +91 {customer.phone}
                    </p>
                  </div>
                )}

                <div className="bg-[#420C0C] text-[#E5D4B3] p-4 rounded-xl font-serif text-xs md:text-sm leading-relaxed">
                  Your kit is queued for preparation and dispatch. Tracking details will be shared on your registered WhatsApp number once shipped.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer matching IWL Season 2 */}
      <div className="text-center py-8 text-[#E0C097]/60 text-xs md:text-sm font-serif tracking-[0.2em] uppercase relative z-10 border-t border-[#FFD700]/10 mt-12 bg-black/40 backdrop-blur-sm">
        Indian Writers League | An Inkfetish Publication
      </div>
    </div>
  );
}
