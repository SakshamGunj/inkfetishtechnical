'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Clock,
  Lock,
  Unlock,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  User,
  ChevronDown,
  Zap,
  MapPin,
  Truck,
  Gift,
  Star,
  Award,
  BookOpen,
  Loader2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

const formSchema = z.object({
  fullName: z.string().trim().min(2, 'Enter your full name'),
  email: z.string().trim().email('Enter a valid email'),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit WhatsApp number (starts with 6-9)'),
  writingType: z.string().optional(),
  address: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap');

  .font-cinzel { font-family: 'Cinzel', serif; }
  .font-inter { font-family: 'Inter', sans-serif; }
  .text-gold-main { color: #D88A06; }
  .bg-gold-main { background-color: #D88A06; }
  .border-gold-main { border-color: #D88A06; }
  .luxury-border { border-color: #E3D8C7; }

  .gold-shimmer {
    background: linear-gradient(135deg, #8f4d00 0%, #d88a06 25%, #ffcf6b 50%, #d88a06 75%, #8f4d00 100%);
    background-size: 400% 400%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 8s ease infinite;
  }

  @keyframes shimmer {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra & Nagar Haveli and Daman & Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const inclusions = [
  'Verifiable ISBN publishing credit',
  'Elite editorial review & formatting',
  'Professional Author Portfolio Website (Value ₹15k)',
  'Gilded digital certificate & e-appreciation letter',
  'Global Amazon & Kindle distribution',
];

type PaymentStatus = 'idle' | 'creating' | 'paying' | 'verifying' | 'paid' | 'failed';

const HoneyAndHurtRegister = () => {
  const router = useRouter();
  const [cashfree, setCashfree] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [addBook, setAddBook] = useState(false);
  const [addMedal, setAddMedal] = useState(false);
  const [paidRegistration, setPaidRegistration] = useState<any>(null);
  const [loadingDb, setLoadingDb] = useState(true);

  // Pricing Model
  const basePrice = 1;
  const bookPrice = 1;
  const medalPrice = 1;
  const totalAmount = basePrice + (addBook ? bookPrice : 0) + (addMedal ? medalPrice : 0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      writingType: '',
      address: '',
      address2: '',
      city: '',
      state: '',
      pincode: '',
    },
  });

  const fullNameValue = watch('fullName') || '';
  const emailValue = watch('email') || '';
  const phoneValue = watch('phone') || '';

  const isFullNameValid = fullNameValue.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  const isPhoneValid = /^[6-9]\d{9}$/.test(phoneValue);

  useEffect(() => {
    // 1. Sync & verify previous successful/pending order from local storage/database
    const paidOrderId = localStorage.getItem('honey_and_hurt_paid_order_id');
    const pendingOrderId = localStorage.getItem('honey_and_hurt_pending_order_id');

    if (paidOrderId) {
      const docRef = doc(db, 'honey_and_hurt_registrations', paidOrderId);
      getDoc(docRef).then((snap) => {
        if (snap.exists() && snap.data().status === 'PAID') {
          setPaidRegistration(snap.data());
          setPaymentStatus('paid');
        } else {
          localStorage.removeItem('honey_and_hurt_paid_order_id');
        }
        setLoadingDb(false);
      }).catch((err) => {
        console.error("Firestore order retrieval error:", err);
        setLoadingDb(false);
      });
    } else if (pendingOrderId) {
      setLoadingDb(true);
      fetch(`/api/honey-and-hurt/verify-order?order_id=${pendingOrderId}`)
        .then((res) => res.json())
        .then(async (verifyData) => {
          if (verifyData.order_status === 'PAID') {
            const docRef = doc(db, 'honey_and_hurt_registrations', pendingOrderId);
            await updateDoc(docRef, { status: 'PAID' });
            localStorage.setItem('honey_and_hurt_paid_order_id', pendingOrderId);
            localStorage.removeItem('honey_and_hurt_pending_order_id');
            const snap = await getDoc(docRef);
            if (snap.exists()) {
              setPaidRegistration(snap.data());
            }
            setPaymentStatus('paid');
          } else {
            // Keep pending order in case they decide to try paying again
          }
          setLoadingDb(false);
        })
        .catch((err) => {
          console.error("Pending order verification error:", err);
          setLoadingDb(false);
        });
    } else {
      setLoadingDb(false);
    }

    // 2. Load Cashfree SDK
    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.async = true;
    script.onload = () => {
      setCashfree((window as any).Cashfree({
        mode: process.env.NEXT_PUBLIC_CASHFREE_MODE || 'sandbox'
      }));
    };
    document.head.appendChild(script);

    // Restore registration leads from localStorage if available
    try {
      const savedLead = localStorage.getItem('honeyAndHurtLead');
      if (savedLead) {
        const parsed = JSON.parse(savedLead);
        if (parsed.fullName) setValue('fullName', parsed.fullName);
        if (parsed.email) setValue('email', parsed.email);
        if (parsed.phone) setValue('phone', parsed.phone);
        if (parsed.writingType) setValue('writingType', parsed.writingType);
      }
    } catch (e) {}
  }, [setValue]);

  const onSubmit = async (data: FormValues) => {
    if (addBook || addMedal) {
      if (!data.address?.trim() || !data.city?.trim() || !data.state?.trim() || !data.pincode?.trim()) {
        toast.error('Please fill in all shipping details for your physical upgrades.');
        setTimeout(() => {
          const shippingSection = document.getElementById('shipping-details-section');
          if (shippingSection) {
            shippingSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            document.getElementById('address')?.focus();
          }
        }, 100);
        return;
      }
      if (!/^\d{6}$/.test(data.pincode.trim())) {
        toast.error('Please enter a valid 6-digit Pincode.');
        setTimeout(() => {
          const pinInput = document.getElementById('pincode');
          if (pinInput) {
            pinInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            pinInput.focus();
          }
        }, 100);
        return;
      }
    }

    if (!cashfree) {
      toast.error('Payment gateway is initializing. Please wait a moment.');
      return;
    }

    setPaymentStatus('creating');

    try {
      // 1. Create order on Next.js backend API
      const res = await fetch('/api/honey-and-hurt/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalAmount,
          customerName: data.fullName,
          customerEmail: data.email,
          customerPhone: data.phone,
        }),
      });

      const orderData = await res.json();
      if (!res.ok) {
        throw new Error(orderData.error || 'Failed to create order. Please try again.');
      }

      const orderId = orderData.order_id;
      const paymentSessionId = orderData.payment_session_id;

      // 2. Save document to Firestore as PENDING
      await setDoc(doc(db, 'honey_and_hurt_registrations', orderId), {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        writingType: data.writingType || '',
        amount: totalAmount,
        boughtBookDelivery: addBook,
        boughtCertificateMedal: addMedal,
        address: (data.address || '').trim() + (data.address2?.trim() ? ', ' + data.address2.trim() : ''),
        city: data.city || '',
        state: data.state || '',
        pincode: data.pincode || '',
        status: 'PENDING',
        orderId: orderId,
        createdAt: new Date().toISOString(),
      });

      // Save to pending in localStorage
      localStorage.setItem('honey_and_hurt_pending_order_id', orderId);

      setPaymentStatus('paying');

      // 3. Initiate checkout overlay modal
      await cashfree.checkout({
        paymentSessionId: paymentSessionId,
        redirectTarget: '_modal',
      });

      // 4. Verify transaction with verify-order API
      setPaymentStatus('verifying');
      const verifyRes = await fetch(`/api/honey-and-hurt/verify-order?order_id=${orderId}`);
      const verifyData = await verifyRes.json();

      if (verifyData.order_status === 'PAID') {
        // 5. Update status in Firestore
        await updateDoc(doc(db, 'honey_and_hurt_registrations', orderId), {
          status: 'PAID',
          paidAt: new Date().toISOString(),
        });

        // Set success paid order id in localStorage
        localStorage.setItem('honey_and_hurt_paid_order_id', orderId);

        // Fetch paid details
        const snap = await getDoc(doc(db, 'honey_and_hurt_registrations', orderId));
        if (snap.exists()) {
          setPaidRegistration(snap.data());
        }

        setPaymentStatus('paid');
        toast.success('Author slot successfully secured!');
      } else {
        setPaymentStatus('failed');
        toast.error('Payment was not completed. Please try again.');
      }

    } catch (error: any) {
      console.error("Order process error:", error);
      setPaymentStatus('failed');
      toast.error(error.message || 'Something went wrong. Please try again.');
    }
  };

  // ----------------------------------------------------
  // SCREEN STATE: SUCCESSFUL CO-AUTHOR VAULT (DASHBOARD)
  // ----------------------------------------------------
  if (paymentStatus === 'paid' && paidRegistration) {
    return (
      <div className="min-h-screen bg-obsidian text-white font-inter selection:bg-gold-main/20 selection:text-gold-main pb-16">
        <style>{styles}</style>
        
        {/* Top Celebration Banner */}
        <div className="bg-emerald-600 text-white py-3 text-center font-inter text-xs font-black tracking-widest uppercase sticky top-0 z-[60] shadow-md px-4 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 animate-bounce" /> VERIFIED PUBLISHED CO-AUTHOR SLOT SECURED
        </div>

        <div className="container mx-auto px-6 max-w-4xl pt-12 md:pt-20 space-y-12">
          {/* Header Card */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden backdrop-blur-md"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_70%_30%,_var(--gold-light)_0%,_transparent_60%)] opacity-20 pointer-events-none" />
            <div className="absolute top-4 right-4 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-black uppercase tracking-wider py-1.5 px-3 rounded-full flex items-center gap-1.5 shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Active Co-Author
            </div>

            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-gold-main/10 border border-gold-main/30 flex items-center justify-center text-gold-main">
                <Award className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl font-cinzel font-bold text-white tracking-wide leading-tight">
                  Welcome to the <br className="hidden sm:block" />
                  <span className="gold-shimmer">Co-Author Vault</span>
                </h1>
                <p className="text-slate-400 font-medium text-base md:text-lg">
                  Congratulations, <span className="text-white font-black">{paidRegistration.fullName}</span>! Your credentials have been synced and registered in our database.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Secure details list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Box 1: Verified Credentials */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-5">
              <h3 className="font-cinzel font-bold text-lg text-gold-main flex items-center gap-2 border-b border-white/10 pb-3">
                <ShieldCheck className="w-5 h-5" /> Secured Package Details
              </h3>
              <div className="space-y-3.5 text-sm font-medium text-slate-300">
                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-slate-500">Order ID:</span>
                  <span className="font-mono text-slate-400 font-bold">{paidRegistration.orderId}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-slate-500">Publishing License:</span>
                  <span className="text-emerald-400 font-bold uppercase tracking-widest text-xs">ISBN Verified</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-slate-500">Author Portfolio:</span>
                  <span className="text-gold-main font-bold">1-Year Dedicated Website</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-slate-500">Delivery Upgrade:</span>
                  <span>{paidRegistration.boughtBookDelivery ? '✅ Physical Copy Delivery Secured' : '❌ Digital-Only License'}</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-slate-500">Award Certificate & Medal:</span>
                  <span>{paidRegistration.boughtCertificateMedal ? '✅ Laminated Certificate + Medal' : '❌ e-Certificate & e-Appreciation'}</span>
                </div>
              </div>
            </div>

            {/* Box 2: Unlocked Submission Portal */}
            <div className="bg-[#1A1815] border border-emerald-500/30 rounded-2xl p-6 md:p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-900 rounded-full text-[10px] font-black uppercase tracking-wider">
                  <Unlock className="w-3 h-3 animate-pulse" /> Submission Vault: Unlocked
                </div>
                <h3 className="font-cinzel font-bold text-xl text-white">Manuscript Upload Portal</h3>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-medium">
                  Your co-author slot is fully verified! You can now upload your manuscript directly into the Honey & Hurt editorial volume.
                  <br/><br/>
                  Submit your poetry, prose, or microfiction now to secure formatting and typesetting review.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => router.push('/anthology/honey-and-hurt/submit')}
                  className="w-full bg-[#e53e3e] hover:bg-red-700 text-white py-3.5 rounded-xl font-inter font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  Submit Your Writing Now <ChevronRight className="w-4 h-4" />
                </button>
                <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 text-center">
                  <span className="text-slate-500 text-[9px] uppercase font-bold tracking-widest block mb-0.5">Official Submission Portal</span>
                  <span className="text-gold-main font-cinzel font-bold text-xs tracking-wide">Now Open & Accepting Manuscripts</span>
                </div>
              </div>
            </div>

          </div>

          <div className="text-center pt-4">
            <button 
              onClick={() => router.push('/anthology/honey-and-hurt')} 
              className="px-8 py-3.5 rounded-xl border border-white/20 hover:border-white font-inter font-black text-xs uppercase tracking-widest transition-colors hover:bg-white/5"
            >
              Return to Anthology Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // STANDARD LOADER (PREVENTS FLASH OF FORM ON PAGELOAD)
  // ----------------------------------------------------
  if (loadingDb) {
    return (
      <div className="min-h-screen bg-obsidian text-white font-inter flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold-main" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian text-white font-inter selection:bg-gold-main/20 selection:text-gold-main pb-20">
      <style>{styles}</style>

      {/* High Urgency Sticky Header */}
      <div className="bg-gold-main text-obsidian py-2.5 text-center font-inter text-xs font-black tracking-wide uppercase sticky top-0 z-[60] shadow-sm px-4">
        <span className="flex items-center justify-center gap-2 max-w-xs mx-auto md:max-w-none">
          <Zap className="w-3.5 h-3.5 animate-pulse" /> SECURE YOUR HONEY & HURT PUBLISHING SLOT
        </span>
      </div>

      <nav className="p-5 md:p-8 flex items-center justify-between container mx-auto max-w-6xl relative z-10 gap-4">
        <div className="flex items-center">
          <button
            onClick={() => router.push('/anthology/honey-and-hurt')}
            className="flex items-center gap-1.5 font-inter font-bold text-xs uppercase text-slate-400 hover:text-white transition-colors border border-white/10 px-3 py-1.5 rounded-full bg-white/5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
        </div>
        <div className="font-cinzel text-xs sm:text-base md:text-xl font-black uppercase tracking-widest gold-shimmer cursor-pointer text-center" onClick={() => router.push('/')}>
          Inkfetish Publications
        </div>
        <div className="hidden sm:flex items-center gap-1.5 font-inter text-[10px] font-black uppercase text-gold-main bg-white/5 border border-white/10 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm">
          <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit SSL Secure
        </div>
      </nav>

      <main className="container mx-auto px-5 max-w-6xl relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Summary & Upgrades (Order: 2 on Mobile, 1 on Desktop) */}
          <div className="w-full lg:col-span-5 space-y-8 order-2 lg:order-1">
            
            {/* Value inclusions Box */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md">
              <h3 className="font-cinzel font-bold text-lg text-white uppercase tracking-wider mb-6 border-b border-white/10 pb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-gold-main" /> Inclusions list:
              </h3>
              
              <div className="space-y-4">
                {inclusions.map((item) => (
                  <div key={item} className="flex gap-3 items-start">
                    <div className="bg-gold-main/20 p-1 rounded-full shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-main" />
                    </div>
                    <p className="font-inter text-xs font-semibold text-slate-300 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>

              {/* Dynamic Price Calculation */}
              <div className="mt-8 pt-6 border-t border-white/10 space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Co-Author Slot (Base Package)</span>
                  <span>₹{basePrice}</span>
                </div>
                {addBook && (
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Physical Book Delivery</span>
                    <span>+₹{bookPrice}</span>
                  </div>
                )}
                {addMedal && (
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Certificate & Medal Upgrade</span>
                    <span>+₹{medalPrice}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs text-emerald-400">
                  <span>Shipping & Delivery Cost</span>
                  <span className="font-black uppercase text-[10px]">Free</span>
                </div>
                <div className="flex items-end justify-between pt-4 border-t border-dashed border-white/15">
                  <span className="font-cinzel text-xs font-bold text-slate-400">Final Investment</span>
                  <span className="font-cinzel text-3xl font-black text-white">₹{totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Micro Badges for trust */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 flex flex-col items-center text-center">
                <Truck className="w-6 h-6 text-gold-main mb-2" />
                <span className="text-[10px] font-inter font-black text-white uppercase tracking-wider">Free Delivery</span>
                <span className="text-[9px] font-inter font-medium text-slate-500 italic mt-0.5">Pan-India Courier</span>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 flex flex-col items-center text-center">
                <ShieldCheck className="w-6 h-6 text-gold-main mb-2" />
                <span className="text-[10px] font-inter font-black text-white uppercase tracking-wider">Protected Gateway</span>
                <span className="text-[9px] font-inter font-medium text-slate-500 italic mt-0.5">By Cashfree Payments</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Form & Order Bumps (Order: 1 on Mobile, 2 on Desktop) */}
          <div className="w-full lg:col-span-7 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white text-obsidian p-6 md:p-10 rounded-3xl shadow-2xl relative"
            >
              <div className="relative z-10 space-y-6">
                <div className="space-y-1.5 text-center">
                  <h3 className="font-cinzel text-2xl md:text-3xl font-black uppercase text-obsidian tracking-tight">Co-Author Registration</h3>
                  <p className="font-inter text-xs font-medium text-slate-500">
                    Submit details accurately to register your verifiable slot.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" id="register-payment-form">
                  
                  {/* Basic Credentials */}
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label htmlFor="fullName" className="font-inter text-[10px] font-black uppercase text-slate-500 ml-1 tracking-widest">Full Legal Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          id="fullName"
                          {...register('fullName')}
                          autoComplete="name"
                          className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3 pl-11 pr-10 font-inter text-sm focus:border-gold-main focus:bg-white outline-none transition-all placeholder:text-slate-400 text-obsidian font-bold"
                          placeholder="Your Name"
                        />
                        {isFullNameValid && (
                          <CheckCircle2 className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 z-10" />
                        )}
                      </div>
                      {errors.fullName && <p className="text-red-600 text-[10px] font-bold mt-1 uppercase ml-1">{errors.fullName.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="email" className="font-inter text-[10px] font-black uppercase text-slate-500 ml-1 tracking-widest">Best Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            id="email"
                            type="email"
                            {...register('email')}
                            autoComplete="email"
                            className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3 pl-11 pr-10 font-inter text-sm focus:border-gold-main focus:bg-white outline-none transition-all placeholder:text-slate-400 text-obsidian font-bold"
                            placeholder="Where to send portfolio files?"
                          />
                          {isEmailValid && (
                            <CheckCircle2 className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 z-10" />
                          )}
                        </div>
                        {errors.email && <p className="text-red-600 text-[10px] font-bold mt-1 uppercase ml-1">{errors.email.message}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="phone" className="font-inter text-[10px] font-black uppercase text-slate-500 ml-1 tracking-widest">WhatsApp Number</label>
                        <div className="relative">
                          {/* Premium Indian Flag & +91 Dial Prefix Badge */}
                          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-slate-500 font-inter text-xs font-black select-none pointer-events-none z-10">
                            <span className="text-sm">🇮🇳</span>
                            <span className="text-slate-400 font-bold border-r border-slate-200 pr-2">+91</span>
                          </div>
                          <input
                            id="phone"
                            type="tel"
                            maxLength={10}
                            {...register('phone', {
                              onChange: (e) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                              }
                            })}
                            autoComplete="tel"
                            className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3 pl-20 pr-10 font-inter text-sm focus:border-gold-main focus:bg-white outline-none transition-all placeholder:text-slate-400 text-obsidian font-bold"
                            placeholder="Your Number"
                          />
                          {isPhoneValid && (
                            <CheckCircle2 className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 z-10" />
                          )}
                        </div>
                        {errors.phone && <p className="text-red-600 text-[10px] font-bold mt-1 uppercase ml-1">{errors.phone.message}</p>}
                      </div>
                    </div>
                  </div>

                  {/* ---------------------------------------------------- */}
                  {/* BUMP OFFERS SECTION */}
                  {/* ---------------------------------------------------- */}
                  <div className="pt-4 border-t border-slate-100 space-y-4">
                    <h4 className="font-cinzel text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5 mb-2">
                      <Star className="w-4 h-4 text-gold-main fill-gold-main/30" /> Optional Order Upgrades
                    </h4>

                    {/* Bump 1: Physical Book Delivery */}
                    <div 
                      onClick={() => setAddBook(!addBook)}
                      className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex items-start gap-4 select-none ${
                        addBook 
                          ? 'bg-gradient-to-br from-amber-50/50 to-amber-100/30 border-amber-500 shadow-[0_12px_24px_rgba(216,138,6,0.15)] scale-[1.01]' 
                          : 'bg-white border-slate-200 hover:border-amber-400 hover:bg-slate-50/50 hover:shadow-md'
                      }`}
                    >
                      {/* Floating Recommendation Badge */}
                      <div className={`absolute -top-3 left-4 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm z-10 border transition-all duration-300 ${
                        addBook 
                          ? 'bg-amber-500 border-amber-600 text-white' 
                          : 'bg-slate-100 border-slate-200 text-slate-500'
                      }`}>
                        🔥 Highly Recommended
                      </div>

                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-1 transition-all duration-300 ${
                        addBook 
                          ? 'bg-amber-500 border-amber-500 text-white shadow-sm' 
                          : 'border-slate-300 bg-white'
                      }`}>
                        {addBook && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>

                      <div className="space-y-2 flex-1 pt-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <h5 className="font-inter text-sm md:text-base font-black text-obsidian flex items-center gap-1.5 uppercase tracking-wide leading-tight">
                              <BookOpen className={`w-4 h-4 transition-colors duration-300 ${addBook ? 'text-amber-600' : 'text-slate-400'}`} /> Physical Book Delivery
                            </h5>
                            <p className="font-inter text-[10px] md:text-xs font-bold text-amber-600 uppercase tracking-wider mt-1">
                              Paperback Book — High Quality Printed Edition
                            </p>
                          </div>
                          <span className="font-inter text-xs md:text-sm font-black text-amber-600 shrink-0 leading-none bg-amber-50 border border-amber-200/50 px-2.5 py-1.5 rounded-lg w-fit">Only +₹150</span>
                        </div>
                        
                        <p className="text-[11px] md:text-xs text-slate-500 font-medium leading-relaxed">
                          Get a high-quality printed paperback edition of the Honey & Hurt book, featuring a premium glossy finish and thick collector-grade paper.
                        </p>
                        
                        <div className="flex items-center gap-1.5 pt-1">
                          <Truck className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="font-inter text-[9px] font-black uppercase text-emerald-600 tracking-wider">Free Shipping Pan-India Included</span>
                        </div>
                      </div>
                    </div>

                    {/* Bump 2: Certificate & Medal Upgrade */}
                    <div 
                      onClick={() => setAddMedal(!addMedal)}
                      className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex items-start gap-4 select-none ${
                        addMedal 
                          ? 'bg-gradient-to-br from-amber-50/50 to-amber-100/30 border-amber-500 shadow-[0_12px_24px_rgba(216,138,6,0.15)] scale-[1.01]' 
                          : 'bg-white border-slate-200 hover:border-amber-400 hover:bg-slate-50/50 hover:shadow-md'
                      }`}
                    >
                      {/* Floating Recommendation Badge */}
                      <div className={`absolute -top-3 left-4 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm z-10 border transition-all duration-300 ${
                        addMedal 
                          ? 'bg-amber-500 border-amber-600 text-white' 
                          : 'bg-slate-100 border-slate-200 text-slate-500'
                      }`}>
                        🏆 Most Popular Upgrade
                      </div>

                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-1 transition-all duration-300 ${
                        addMedal 
                          ? 'bg-amber-500 border-amber-500 text-white shadow-sm' 
                          : 'border-slate-300 bg-white'
                      }`}>
                        {addMedal && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>

                      <div className="space-y-2 flex-1 pt-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <h5 className="font-inter text-sm md:text-base font-black text-obsidian flex items-center gap-1.5 uppercase tracking-wide leading-tight">
                              <Award className={`w-4 h-4 transition-colors duration-300 ${addMedal ? 'text-amber-600' : 'text-slate-400'}`} /> Physical Laminated Certificate & Medal
                            </h5>
                            <p className="font-inter text-[10px] md:text-xs font-bold text-amber-600 uppercase tracking-wider mt-1">
                              Laminated High Quality Certificate with High Quality Medal
                            </p>
                          </div>
                          <span className="font-inter text-xs md:text-sm font-black text-amber-600 shrink-0 leading-none bg-amber-50 border border-amber-200/50 px-2.5 py-1.5 rounded-lg w-fit">Only +₹150</span>
                        </div>
                        
                        <p className="text-[11px] md:text-xs text-slate-500 font-medium leading-relaxed">
                          Get a physical, laminated gold-foil certificate of co-authorship along with a premium engraved metal co-author medal.
                        </p>
                        
                        <div className="flex items-center gap-1.5 pt-1">
                          <Gift className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="font-inter text-[9px] font-black uppercase text-emerald-600 tracking-wider">Premium Co-Author Pack Upgrade</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ---------------------------------------------------- */}
                  {/* SHIPPING DETAILS SECTION (CONDITIONAL) */}
                  {/* ---------------------------------------------------- */}
                  <AnimatePresence>
                    {(addBook || addMedal) && (
                      <motion.div 
                        id="shipping-details-section"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden pt-4 border-t border-slate-100 space-y-4"
                      >
                        <h4 className="font-cinzel text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5 mb-1">
                          <MapPin className="w-4 h-4 text-gold-main" /> Shipping Address
                        </h4>
                        
                        <div className="space-y-3.5">
                          {/* Address Line 1 */}
                          <div className="space-y-1">
                            <label htmlFor="address" className="font-inter text-[9px] font-black uppercase text-slate-500 ml-1 tracking-widest">Address Line 1</label>
                            <input
                              id="address"
                              {...register('address')}
                              className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-2.5 px-4 font-inter text-xs focus:border-gold-main focus:bg-white outline-none transition-all text-obsidian font-bold"
                              placeholder="House No, Flat, Building, Street, Road..."
                            />
                          </div>

                          {/* Address Line 2 */}
                          <div className="space-y-1">
                            <label htmlFor="address2" className="font-inter text-[9px] font-black uppercase text-slate-500 ml-1 tracking-widest">Address Line 2</label>
                            <input
                              id="address2"
                              {...register('address2')}
                              className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-2.5 px-4 font-inter text-xs focus:border-gold-main focus:bg-white outline-none transition-all text-obsidian font-bold"
                              placeholder="Colony, Sector, Area, Landmark..."
                            />
                          </div>

                          {/* City, State, Pincode Grid (Responsive: stacked on mobile, row on desktop) */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                            <div className="space-y-1">
                              <label htmlFor="city" className="font-inter text-[9px] font-black uppercase text-slate-500 ml-1 tracking-widest">City</label>
                              <input
                                id="city"
                                {...register('city')}
                                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-2.5 px-3 font-inter text-xs focus:border-gold-main focus:bg-white outline-none transition-all text-obsidian font-bold"
                                placeholder="City"
                              />
                            </div>
                            <div className="space-y-1">
                              <label htmlFor="state" className="font-inter text-[9px] font-black uppercase text-slate-500 ml-1 tracking-widest">State</label>
                              <div className="relative">
                                <select
                                  id="state"
                                  {...register('state')}
                                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-2.5 pl-3 pr-8 font-inter text-xs focus:border-gold-main focus:bg-white outline-none transition-all text-obsidian font-bold appearance-none cursor-pointer"
                                >
                                  <option value="">State</option>
                                  {indianStates.map((st) => (
                                    <option key={st} value={st}>{st}</option>
                                  ))}
                                </select>
                                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <label htmlFor="pincode" className="font-inter text-[9px] font-black uppercase text-slate-500 ml-1 tracking-widest">Pincode</label>
                              <input
                                id="pincode"
                                {...register('pincode')}
                                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-2.5 px-3 font-inter text-xs focus:border-gold-main focus:bg-white outline-none transition-all text-obsidian font-bold"
                                placeholder="6 digits"
                                maxLength={6}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Dynamic Pricing Mini-Summary (Optimized for Mobile UX) */}
                  <div className="bg-slate-50 border border-slate-200 p-4.5 rounded-2xl mb-2 font-inter text-xs space-y-2 mt-4">
                    <div className="flex justify-between font-bold text-slate-700">
                      <span>Co-Author Slot (Base Package):</span>
                      <span>₹{basePrice}</span>
                    </div>
                    {addBook && (
                      <div className="flex justify-between text-slate-500 font-medium">
                        <span>+ Physical Book Delivery:</span>
                        <span>+₹{bookPrice}</span>
                      </div>
                    )}
                    {addMedal && (
                      <div className="flex justify-between text-slate-500 font-medium">
                        <span>+ Laminated Certificate & Medal:</span>
                        <span>+₹{medalPrice}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-emerald-600 font-black border-t border-slate-200 pt-2 mt-1.5 text-sm uppercase tracking-wide">
                      <span>Total to Pay:</span>
                      <span>₹{totalAmount}</span>
                    </div>
                  </div>

                  {/* Submission and Payment Checkout CTA */}
                  <div className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      disabled={paymentStatus === 'creating' || paymentStatus === 'paying' || paymentStatus === 'verifying'}
                      type="submit"
                      className="w-full bg-[#1A1A1A] hover:bg-black text-white py-5 rounded-xl font-inter font-black text-sm uppercase tracking-widest shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-all flex items-center justify-center gap-2.5 disabled:opacity-75 disabled:cursor-not-allowed group border border-slate-800"
                    >
                      {paymentStatus === 'creating' && (
                        <>Securing Order... <Loader2 className="w-4 h-4 animate-spin text-gold-main" /></>
                      )}
                      {paymentStatus === 'paying' && (
                        <>Awaiting Checkout... <Loader2 className="w-4 h-4 animate-spin text-gold-main" /></>
                      )}
                      {paymentStatus === 'verifying' && (
                        <>Verifying Payment... <Loader2 className="w-4 h-4 animate-spin text-gold-main" /></>
                      )}
                      {paymentStatus === 'idle' || paymentStatus === 'failed' ? (
                        <>
                          <span className="flex items-center gap-2 group-hover:text-gold-main transition-colors">
                            Register & Pay ₹{totalAmount} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </>
                      ) : null}
                    </motion.button>
                  </div>

                  {/* Gateway Trust footer info */}
                  <div className="flex flex-col items-center justify-center gap-2 text-slate-500 mt-4 pt-3.5 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                      <span className="font-inter text-[10px] uppercase font-black tracking-wider text-obsidian">
                        100% Encrypted Transactions
                      </span>
                    </div>
                    <p className="text-[9px] text-center max-w-xs leading-relaxed">
                      Payments verified securely by Cashfree Payments. Secure token storage ensures safe checkouts.
                    </p>
                  </div>

                </form>
              </div>
            </motion.div>
          </div>

        </div>
      </main>

      {/* STICKY BOTTOM CHECKOUT PANEL FOR MOBILE */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0B0B0C] border-t-[2px] border-gold-main/30 p-4 lg:hidden shadow-[0_-8px_20px_rgba(0,0,0,0.4)] flex justify-between items-center">
        <div className="flex flex-col">
          <span className="font-inter font-black text-slate-400 uppercase text-[9px] tracking-widest">Total Investment</span>
          <span className="font-inter font-black text-white text-2xl">₹{totalAmount}</span>
        </div>
        <button
          form="register-payment-form"
          type="submit"
          disabled={paymentStatus === 'creating' || paymentStatus === 'paying' || paymentStatus === 'verifying'}
          className="bg-gold-main hover:bg-gold-main/90 text-black py-3 px-6 rounded-xl font-inter font-black text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-1.5 disabled:opacity-75"
        >
          {paymentStatus === 'creating' || paymentStatus === 'paying' || paymentStatus === 'verifying' ? (
            <Loader2 className="w-4 h-4 animate-spin text-black" />
          ) : (
            <>Checkout <ChevronRight className="w-4 h-4" /></>
          )}
        </button>
      </div>

    </div>
  );
};

export default HoneyAndHurtRegister;
