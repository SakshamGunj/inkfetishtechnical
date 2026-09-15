'use client';

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Award, 
  Edit3, 
  Calendar, 
  Video, 
  Wifi, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Feather,
  Instagram,
  FileText,
  HelpCircle,
  ShieldCheck,
  Star,
  Quote,
  Check,
  Users,
  TrendingUp,
  HeartHandshake,
  X,
  Camera,
  Trophy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { auth } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, updateDoc, query, where, getDocs, arrayUnion } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { load } from '@cashfreepayments/cashfree-js';
import {
  anySeptemberOrderPaid,
  pollSeptemberOrderPaid,
  readRememberedSeptemberOrderIds,
  rememberSeptemberOrderId,
} from '@/lib/septemberContestVerifyClient';

// Cloudinary images of previous writers receiving certificates, trophies & books
const row1Images = [
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775926450/WhatsApp_Image_2026-04-11_at_7.20.21_PM_1_-compressed_hgkckw.webp", title: "National Contest Winner", location: "Delhi" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775926445/WhatsApp_Image_2026-04-11_at_7.20.21_PM-compressed_fxtkcv.webp", title: "Published Anthology Author", location: "Mumbai" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897600/WhatsApp_Image_2026-04-09_at_2.59.25_PM-compressed_in2led.webp", title: "Poetry Category Winner", location: "Bangalore" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897599/WhatsApp_Image_2026-04-09_at_2.53.04_PM-compressed_wsnhmu.webp", title: "Certificate Recipient", location: "Pune" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897599/WhatsApp_Image_2026-04-07_at_8.39.44_PM-compressed_ztxsge.webp", title: "Short Story Author", location: "Kolkata" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897598/WhatsApp_Image_2026-04-07_at_8.39.44_PM_2_-compressed_hfr0wv.webp", title: "National Certificate Holder", location: "Hyderabad" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897597/WhatsApp_Image_2026-04-04_at_12.20.06_PM_1_-compressed_lrqjv2.webp", title: "Inkfetish Anthology Author", location: "Jaipur" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100331/WhatsApp_Image_2026-04-13_at_9.06.50_PM-compressed_f54p62.webp", title: "Literary Champion", location: "Delhi" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100331/WhatsApp_Image_2026-04-13_at_9.06.50_PM_1_-compressed_bla9w8.webp", title: "Published Writer", location: "Mumbai" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100331/WhatsApp_Image_2026-04-13_at_9.06.49_PM-compressed_krdg8g.webp", title: "Poetry Award Winner", location: "Bangalore" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_9.06.50_PM_2_-compressed_nrkzf4.webp", title: "Certificate Winner", location: "Pune" },
];

const row2Images = [
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897595/WhatsApp_Image_2026-04-02_at_5.17.33_PM_3_-compressed_kosajj.webp", title: "Paperback Book Launch", location: "Ahmedabad" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897594/WhatsApp_Image_2026-04-02_at_5.17.33_PM_2_-compressed_sz4wld.webp", title: "Judged Award Winner", location: "Lucknow" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897594/WhatsApp_Image_2026-04-01_at_6.40.55_AM_1_-compressed_j51ngs.webp", title: "National Poetry Finalist", location: "Chandigarh" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897593/WhatsApp_Image_2026-04-01_at_6.40.37_AM-compressed_eibjs4.webp", title: "Certificate of Excellence", location: "Indore" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897593/WhatsApp_Image_2026-03-31_at_11.00.31_PM-compressed_a58ono.webp", title: "Featured Contest Author", location: "Bhopal" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897592/WhatsApp_Image_2026-03-28_at_11.47.30_PM_1_-compressed_abkbxy.webp", title: "Printed Book Feature", location: "Guwahati" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897592/WhatsApp_Image_2026-03-23_at_7.03.31_PM_5_-compressed_hgy6j1.webp", title: "National Champion", location: "Patna" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_9.06.49_PM_1_-compressed_ylopb7.webp", title: "Story Winner", location: "Kolkata" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_9.06.48_PM-compressed_ftx5ea.webp", title: "Featured Writer", location: "Hyderabad" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100329/WhatsApp_Image_2026-04-13_at_8.19.16_PM-compressed_pii87q.webp", title: "Anthology Launch", location: "Jaipur" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_8.12.24_PM-compressed_skr10b.webp", title: "Top Finalist", location: "Chennai" },
];

const row3Images = [
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897591/WhatsApp_Image_2026-03-23_at_7.03.31_PM_4_-compressed_dnisid.webp", title: "Author Profile", location: "India" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897591/WhatsApp_Image_2026-03-23_at_7.03.31_PM_3_-compressed_ofwyil.webp", title: "Book Launch", location: "India" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897590/WhatsApp_Image_2026-03-23_at_7.03.30_PM-compressed_fsgkug.webp", title: "Writer Award", location: "India" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897715/WhatsApp_Image_2026-04-01_at_1.54.07_PM_3_-compressed_moo9ra.webp", title: "Literature Meet", location: "India" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897716/WhatsApp_Image_2026-04-07_at_12.09.27_AM-compressed_bzgl8t.webp", title: "Top Writer", location: "India" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897713/WhatsApp_Image_2026-04-01_at_1.54.07_PM_1_-compressed_slt2mj.webp", title: "Book Event", location: "India" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897712/WhatsApp_Image_2026-04-01_at_1.54.06_PM_2_-compressed_l5bsna.webp", title: "Poetry Open Mic", location: "India" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897711/WhatsApp_Image_2026-04-01_at_1.54.05_PM_1_-compressed_eoiarj.webp", title: "Certificate Feature", location: "India" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775933371/WhatsApp_Image_2026-03-29_at_12.40.13_PM-compressed_wjaeil.webp", title: "Book Reveal", location: "Ahmedabad" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775933368/WhatsApp_Image_2026-03-29_at_12.35.16_PM_2_-compressed_d12sxy.webp", title: "Judges Choice", location: "Lucknow" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775933367/WhatsApp_Image_2026-03-28_at_8.00.34_PM-compressed_yfhhz2.webp", title: "Inkfetish Author", location: "Chandigarh" },
];

export default function SeptemberWritingContest() {
  const { toast } = useToast();
  
  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Tier selection: '1_entry' (₹249) or '2_entries' (₹299)
  const [selectedTier, setSelectedTier] = useState<'1_entry' | '2_entries'>('1_entry');

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    password: '',
    genre: 'Poetry',
    entry1Title: '',
    entry1Text: '',
    entry2Title: '',
    entry2Text: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'register' | 'login'>('register');
  const [authError, setAuthError] = useState('');
  const [cashfree, setCashfree] = useState<any>(null);

  const [user, setUser] = useState<any>(null);
  const [userReg, setUserReg] = useState<any>(null);

  useEffect(() => {
    // 1. Auth Listener
    const unsubAuth = auth.onAuthStateChanged(async (u) => {
      setUser(u);
      if (u) {
        // Fetch registration record
        const q = query(collection(db, 'september_contest_registrations'), where('uid', '==', u.uid));
        const snap = await getDocs(q);
        if (!snap.empty) {
          const regDoc = snap.docs[0];
          const regData = regDoc.data();
          setUserReg({ id: regDoc.id, ...regData });

          // If pending, try recovery
          if (regData.payment_status !== 'PAID') {
            const existingOrderIds = regData.cashfree_order_ids || [];
            const localOrderIds = readRememberedSeptemberOrderIds();
            const allToVerify = Array.from(new Set([...existingOrderIds, ...localOrderIds]));
            
            if (allToVerify.length > 0) {
              const paidOrderId = await anySeptemberOrderPaid(allToVerify);
              if (paidOrderId) {
                await updateDoc(regDoc.ref, { 
                  payment_status: 'PAID',
                  cashfree_order_id: paidOrderId,
                  updated_at: new Date().toISOString()
                });
                setUserReg((prev: any) => ({ ...prev, payment_status: 'PAID', cashfree_order_id: paidOrderId }));
                toast({
                  title: "Payment Verified ✓",
                  description: "We found your previous payment. You can now submit your entry.",
                });
              }
            }
          }
        }
      } else {
        setUserReg(null);
      }
    });

    // 2. URL Order Check (Cashfree Return)
    const checkUrlOrder = async () => {
      const params = new URLSearchParams(window.location.search);
      const orderId = params.get('order_id');
      if (orderId) {
        const paid = await pollSeptemberOrderPaid(orderId);
        if (paid) {
          window.location.href = '/september-writing-contest/submit';
        }
      }
    };

    checkUrlOrder();
    return () => unsubAuth();
  }, []);

  useEffect(() => {
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

  // Lock background scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDrawerOpen]);

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen]);

  // Countdown timer to Sept 30, 2026
  const targetDate = new Date('2026-10-10T23:59:59').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = Math.max(0, targetDate - now);
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const openRegistrationDrawer = (tier?: '1_entry' | '2_entries') => {
    if (tier) {
      setSelectedTier(tier);
    }
    setIsDrawerOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (drawerMode === 'login') {
      if (!formData.email || !formData.password) {
        setAuthError('Please enter your email and password.');
        return;
      }
      setIsSubmitting(true);
      try {
        const userCred = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        
        // Fetch registration record
        const q = query(collection(db, 'september_contest_registrations'), where('uid', '==', userCred.user.uid));
        const snap = await getDocs(q);
        
        if (snap.empty) {
          setAuthError('No registration found for this account.');
          setIsSubmitting(false);
          return;
        }

        const registrationDoc = snap.docs[0];
        const regData = registrationDoc.data();

        if (regData.payment_status === 'PAID') {
          setIsDrawerOpen(false);
          window.location.href = '/september-writing-contest/submit';
        } else {
          // 1. CHECK FOR PREVIOUS PAYMENTS FIRST (Recovery)
          const existingOrderIds = regData.cashfree_order_ids || [];
          const localOrderIds = readRememberedSeptemberOrderIds();
          const allToVerify = Array.from(new Set([...existingOrderIds, ...localOrderIds]));

          if (allToVerify.length > 0) {
            const paidOrderId = await anySeptemberOrderPaid(allToVerify);
            if (paidOrderId) {
              await updateDoc(registrationDoc.ref, { 
                payment_status: 'PAID',
                cashfree_order_id: paidOrderId,
                updated_at: new Date().toISOString()
              });
              setIsDrawerOpen(false);
              window.location.href = '/september-writing-contest/submit';
              return;
            }
          }

          // 2. Trigger payment for PENDING users if no previous paid order found
          if (!cashfree) throw new Error("Cashfree SDK not loaded");

          const res = await fetch('/api/september-contest/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: regData.fullName,
              email: regData.email,
              phone: regData.phone,
              amount: regData.amount,
              registrationId: registrationDoc.id,
              uid: userCred.user.uid
            })
          });
          
          const orderData = await res.json();
          if (!res.ok) throw new Error(orderData.error || 'Failed to create payment order');

          // Remember this order ID locally and in Firestore
          rememberSeptemberOrderId(orderData.order_id);
          await updateDoc(registrationDoc.ref, {
            cashfree_order_ids: arrayUnion(orderData.order_id)
          });

          const result = await cashfree.checkout({
            paymentSessionId: orderData.payment_session_id,
            redirectTarget: "_modal",
          });

          if (result.error) {
            setAuthError("Payment was cancelled or failed. Please try again.");
            setIsSubmitting(false);
            return; 
          }

          const verifyRes = await fetch('/api/september-contest/verify-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order_id: orderData.order_id })
          });

          const verifyData = await verifyRes.json();
          
          if (verifyData.status === 'PAID') {
            await updateDoc(registrationDoc.ref, { payment_status: 'PAID' });
            setIsDrawerOpen(false);
            window.location.href = '/september-writing-contest/submit';
          } else {
            setAuthError("Payment was not successful. Please try again.");
          }
        }
      } catch (err: any) {
        setAuthError(err.message || 'Invalid email or password. Please try again.');
        setIsSubmitting(false);
      }
      return;
    }

    // Register mode
    if (!formData.fullName || !formData.email || !formData.phone || !formData.age || !formData.password) {
      setAuthError('Please fill in all fields.');
      return;
    }
    if (formData.phone.length !== 10) {
      setAuthError('Please enter a valid 10-digit WhatsApp number.');
      return;
    }
    if (formData.password.length < 6) {
      setAuthError('Password must be at least 6 characters.');
      return;
    }
    setIsSubmitting(true);
    try {
      if (!cashfree) throw new Error("Cashfree SDK not loaded");
      
      // Calculate Amount
      const amount = selectedTier === '1_entry' ? 249 : 299;
      const userCred = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      const docRef = await addDoc(collection(db, 'september_contest_registrations'), {
        uid: userCred.user.uid,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        age: formData.age,
        tier: selectedTier,
        amount: amount,
        payment_status: 'PENDING',
        registeredAt: serverTimestamp(),
      });

      // Create Order
      const res = await fetch('/api/september-contest/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          amount: amount,
          registrationId: docRef.id,
          uid: userCred.user.uid
        })
      });
      
      const orderData = await res.json();
      if (!res.ok) throw new Error(orderData.error || 'Failed to create payment order');

      // Remember this order ID locally and in Firestore
      rememberSeptemberOrderId(orderData.order_id);
      await updateDoc(docRef, {
        cashfree_order_ids: arrayUnion(orderData.order_id)
      });

      // Cashfree Checkout
      const result = await cashfree.checkout({
        paymentSessionId: orderData.payment_session_id,
        redirectTarget: "_modal",
      });

      if (result.error) {
        setAuthError("Payment was cancelled. Please use Login to complete payment.");
        setIsSubmitting(false);
        return; 
      }

      // Verify Payment
      const verifyRes = await fetch('/api/september-contest/verify-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: orderData.order_id })
      });

      const verifyData = await verifyRes.json();
      
      if (verifyData.status === 'PAID') {
        await updateDoc(docRef, { payment_status: 'PAID' });
        setIsDrawerOpen(false);
        window.location.href = `/september-writing-contest/submit`;
      } else {
        setAuthError("Payment was not successful. Please login to try again.");
      }
      
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setAuthError('This email is already registered. Please login to complete payment or submit.');
      } else {
        setAuthError(err.message || 'Something went wrong. Please try again.');
      }
      setIsSubmitting(false);
    }
  };

  const currentPrice = selectedTier === '1_entry' ? '₹249' : '₹299';

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#2C1C13] font-serif selection:bg-[#B91C1C] selection:text-white relative overflow-x-hidden">
      
      {/* Top Banner Navigation */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-[#F4EFE6]/90 border-b border-[#E3DAC9] px-4 md:px-10 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <img src="/images/inkfetish_logo.webp" alt="Inkfetish Logo" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover shadow-sm border border-[#E3DAC9]" />
          <div>
            <span className="font-serif font-bold text-lg tracking-tight text-[#2C1C13]">
              InkFetish<span className="text-[#B91C1C] text-xs align-top font-sans ml-0.5">™</span>
            </span>
            <span className="hidden sm:inline-block text-[11px] text-[#7A6B5D] ml-3 uppercase tracking-widest font-sans font-medium">
              WRITE · READ · BELONG
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs font-sans font-semibold text-[#8C7A6B]">
            <Instagram className="w-4 h-4 text-[#B91C1C]" />
            <span>210,000+ Writers on Instagram</span>
          </div>
          <Button 
            onClick={() => {
              if (userReg?.payment_status === 'PAID') {
                window.location.href = '/september-writing-contest/submit';
              } else {
                openRegistrationDrawer();
              }
            }}
            className="rounded-full bg-[#B91C1C] hover:bg-[#991515] text-white font-sans text-xs uppercase tracking-wider font-bold px-5 py-2 shadow-md transition-all hover:scale-105"
          >
            {userReg?.payment_status === 'PAID' ? 'Submit Entry' : `Register Now (${currentPrice})`}
          </Button>
        </div>
      </nav>

      {/* Main Container Wrapper */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-28 relative">
        
        {/* Editorial Arch Card Wrapper */}
        <div className="bg-[#FAF6F0] border border-[#E8DFD1] shadow-2xl rounded-t-[100px] sm:rounded-t-[180px] md:rounded-t-[220px] rounded-b-3xl px-6 sm:px-12 md:px-16 pt-12 pb-16 relative overflow-hidden my-4">
          
          {/* Top Brand Header */}
          <div className="text-center mb-6">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#2C1C13]">
              InkFetish<span className="text-xs text-[#B91C1C] align-top">™</span>
            </h3>
            <p className="text-[10px] sm:text-xs font-sans tracking-[0.35em] text-[#7A6A5A] uppercase mt-1">
              WRITE · READ · BELONG
            </p>
            <p className="text-xs sm:text-sm font-sans tracking-[0.25em] text-[#9A8574] uppercase mt-4 font-semibold">
              I N T R O D U C I N G
            </p>
          </div>

          {/* Main Title Section */}
          <div className="text-center max-w-3xl mx-auto">
            <span className="block font-sans font-bold text-xs sm:text-sm tracking-[0.4em] text-[#7A6A5A] uppercase mb-1">
              T H E
            </span>
            <h1 className="font-serif font-black text-4xl sm:text-7xl md:text-8xl tracking-tight uppercase leading-[0.9] text-[#B91C1C] mb-2 drop-shadow-sm">
              SEPTEMBER
            </h1>
            <h2 className="font-serif font-black text-3xl sm:text-6xl md:text-7xl tracking-tight uppercase leading-[0.95] text-[#2C1C13]">
              WRITING COMPETITION
            </h2>

            {/* Subtitle Badge */}
            <div className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#EDE5D8] border border-[#DDD3C2] text-xs sm:text-sm font-sans text-[#4A3B2F] font-medium">
              by <strong className="font-bold text-[#2C1C13]">Inkfetish™</strong> | <span className="text-[#B91C1C] font-semibold">210,000+</span> Writers & Readers on Instagram
            </div>

            {/* Tagline */}
            <p className="italic font-serif text-base sm:text-xl text-[#5C4D40] mt-4">
              A Monthly Writing Contest for Every Storytellers, Writers and Poets
            </p>
          </div>

          {/* REWARDS SECTION */}
          <div className="my-12">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px bg-[#DCD3C3] w-16 sm:w-28" />
              <span className="font-sans font-extrabold text-xs sm:text-sm tracking-[0.3em] text-[#6B5A4B] uppercase">
                R E W A R D S
              </span>
              <div className="h-px bg-[#DCD3C3] w-16 sm:w-28" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              
              {/* Reward 1 */}
              <div className="bg-[#F4EFE6]/80 border border-[#E3DAC8] rounded-2xl p-6 text-center backdrop-blur-xs shadow-sm hover:shadow-md transition-all group">
                <div className="w-16 h-16 rounded-full bg-[#E8DEC9] border border-[#D5C9B3] flex items-center justify-center mx-auto mb-4 text-[#2C1C13] group-hover:scale-105 transition-transform">
                  <BookOpen className="w-8 h-8 text-[#2C1C13]" />
                </div>
                <h4 className="font-serif font-bold text-xl text-[#2C1C13] mb-1.5">Get Published</h4>
                <p className="font-sans text-xs text-[#6B5B4C] leading-relaxed">
                  Your writeup features in our official Anthology paperback release.
                </p>
              </div>

              {/* Reward 2 */}
              <div className="bg-[#F4EFE6]/80 border border-[#E3DAC8] rounded-2xl p-6 text-center backdrop-blur-xs shadow-sm hover:shadow-md transition-all group">
                <div className="w-16 h-16 rounded-full bg-[#E8DEC9] border border-[#D5C9B3] flex items-center justify-center mx-auto mb-4 text-[#2C1C13] group-hover:scale-105 transition-transform">
                  <Award className="w-8 h-8 text-[#2C1C13]" />
                </div>
                <h4 className="font-serif font-bold text-xl text-[#2C1C13] mb-1.5">National Certificate</h4>
                <p className="font-sans text-xs text-[#6B5B4C] leading-relaxed">
                  Valid across all states, for every participant with verification ID.
                </p>
              </div>

              {/* Reward 3 */}
              <div className="bg-[#F4EFE6]/80 border border-[#E3DAC8] rounded-2xl p-6 text-center backdrop-blur-xs shadow-sm hover:shadow-md transition-all group">
                <div className="w-16 h-16 rounded-full bg-[#E8DEC9] border border-[#D5C9B3] flex items-center justify-center mx-auto mb-4 text-[#2C1C13] group-hover:scale-105 transition-transform">
                  <Edit3 className="w-8 h-8 text-[#2C1C13]" />
                </div>
                <h4 className="font-serif font-bold text-xl text-[#2C1C13] mb-1.5">Judged Review</h4>
                <p className="font-sans text-xs text-[#6B5B4C] leading-relaxed">
                  Expert feedback + marks on your writing from editorial panel.
                </p>
              </div>

            </div>
          </div>

          {/* LIFETIME CERTIFICATE GUARANTEE BANNER */}
          <div className="my-10 relative group cursor-default">
            {/* Outer Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] via-[#B91C1C] to-[#D4AF37] rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            {/* Banner Content */}
            <div className="relative bg-[#FAF6F0] border border-[#E3DAC8] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left shadow-sm">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#B91C1C] to-[#801313] shadow-md flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h4 className="font-serif font-extrabold text-sm sm:text-base text-[#2C1C13] uppercase tracking-wide mb-1">
                  The Inkfetish Guarantee
                </h4>
                <p className="font-sans text-xs sm:text-sm text-[#4A3B2F] leading-relaxed">
                  Every single participant receives a <strong className="font-bold text-[#B91C1C] underline decoration-[#D4AF37] underline-offset-2">Lifetime Valid, QR-Verified National Certificate</strong> for their literary portfolio.
                </p>
              </div>
            </div>
          </div>

          {/* IMPORTANT DETAILS SECTION */}
          <div className="my-10 bg-[#EDE5D8]/70 border border-[#DDD2BF] rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px bg-[#D5C9B4] w-12 sm:w-20" />
              <span className="font-sans font-bold text-xs tracking-[0.25em] text-[#6B5A4B] uppercase">
                I M P O R T A N T &nbsp; D E T A I L S
              </span>
              <div className="h-px bg-[#D5C9B4] w-12 sm:w-20" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              
              {/* Detail 1 */}
              <div className="bg-[#F7F2EA] border border-[#E3D8C4] rounded-xl p-4 flex flex-col items-center justify-center">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-[#B91C1C]" />
                  <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#7A6857]">RESULT</span>
                </div>
                <span className="font-serif font-extrabold text-lg text-[#2C1C13]">10th October</span>
              </div>

              {/* Detail 2 */}
              <div className="bg-[#F7F2EA] border border-[#E3D8C4] rounded-xl p-4 flex flex-col items-center justify-center">
                <div className="flex items-center gap-2 mb-1">
                  <Video className="w-4 h-4 text-[#B91C1C]" />
                  <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#7A6857]">ANNOUNCEMENT</span>
                </div>
                <span className="font-sans font-semibold text-xs text-[#2C1C13]">
                  Live Result Announcement <br />
                  <span className="text-[11px] text-[#6B5B4C] font-normal">via Zoom, with all participants</span>
                </span>
              </div>

              {/* Detail 3 */}
              <div className="bg-[#F7F2EA] border border-[#E3D8C4] rounded-xl p-4 flex flex-col items-center justify-center">
                <div className="flex items-center gap-2 mb-1">
                  <Wifi className="w-4 h-4 text-[#B91C1C]" />
                  <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#7A6857]">MODE</span>
                </div>
                <span className="font-serif font-extrabold text-lg text-[#2C1C13]">Online Submission</span>
              </div>

            </div>
          </div>

          {/* ENTRY FEE SELECTION BOX */}
          <div className="my-10 bg-[#FAF6F0] border-2 border-[#D5C6AF] rounded-2xl p-6 sm:p-8 text-center shadow-xs">
            <span className="font-sans font-bold text-xs tracking-[0.3em] text-[#7A6857] uppercase block mb-4">
              E N T R Y &nbsp; F E E
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-6">
              
              {/* Option 1: ₹249 */}
              <div 
                onClick={() => {
                  if (userReg?.payment_status === 'PAID') {
                    window.location.href = '/september-writing-contest/submit';
                  } else {
                    setSelectedTier('1_entry');
                    setIsDrawerOpen(true);
                  }
                }}
                className={`cursor-pointer rounded-xl p-5 border-2 transition-all text-center flex flex-col justify-center relative ${
                  selectedTier === '1_entry' 
                    ? 'border-[#B91C1C] bg-[#F7F0E6] shadow-sm' 
                    : 'border-[#E0D4C0] bg-[#F7F2EA] hover:border-[#B91C1C]/50'
                }`}
              >
                <span className="font-serif font-black text-3xl text-[#2C1C13]">₹249</span>
                <span className="font-sans font-semibold text-sm text-[#6B5B4C] mt-0.5">1 Entry</span>
              </div>

              {/* Option 2: ₹299 */}
              <div 
                onClick={() => {
                  if (userReg?.payment_status === 'PAID') {
                    window.location.href = '/september-writing-contest/submit';
                  } else {
                    setSelectedTier('2_entries');
                    setIsDrawerOpen(true);
                  }
                }}
                className={`cursor-pointer rounded-xl p-5 border-2 transition-all text-center flex flex-col justify-center relative ${
                  selectedTier === '2_entries' 
                    ? 'border-[#B91C1C] bg-[#F7F0E6] shadow-sm' 
                    : 'border-[#E0D4C0] bg-[#F7F2EA] hover:border-[#B91C1C]/50'
                }`}
              >
                <span className="absolute -top-2.5 right-4 bg-[#B91C1C] text-white text-[10px] font-sans uppercase font-bold px-2 py-0.5 rounded-full">
                  Best Value
                </span>
                <span className="font-serif font-black text-3xl text-[#2C1C13]">₹299</span>
                <span className="font-sans font-semibold text-sm text-[#6B5B4C] mt-0.5">2 Entries</span>
              </div>

            </div>

            <Button 
              onClick={() => {
                if (userReg?.payment_status === 'PAID') {
                  window.location.href = '/september-writing-contest/submit';
                } else {
                  setIsDrawerOpen(true);
                }
              }}
              className="rounded-full bg-[#B91C1C] hover:bg-[#991515] text-white font-sans text-sm uppercase tracking-wider font-bold px-10 py-6 shadow-lg transition-all hover:scale-105 gap-2"
            >
              {userReg?.payment_status === 'PAID' ? (
                <>Go to Submission <Send className="w-4 h-4" /></>
              ) : (
                <><Send className="w-4 h-4" /> Open Registration Form ({currentPrice})</>
              )}
            </Button>
          </div>

          {/* CTA BEFORE CHAMPIONS */}
          <div className="mt-16 mb-8 text-center flex flex-col items-center justify-center">
            <h4 className="font-serif font-extrabold text-2xl text-[#2C1C13] mb-6">
              Start your journey to becoming a published author
            </h4>
            <Button 
              onClick={() => { setDrawerMode('register'); setIsDrawerOpen(true); }}
              className="px-8 py-6 rounded-full bg-[#B91C1C] hover:bg-[#991515] text-white font-sans text-sm uppercase tracking-wider font-bold shadow-lg shadow-[#B91C1C]/20 transition-all hover:-translate-y-1"
            >
              Submit Your Entry Now <Send className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* 2-ROW INFINITE SLIDING MARQUEE: OUR PREVIOUS WRITERS & CHAMPIONS (NEWLY ADDED) */}
          <div className="my-16 pt-10 border-t border-[#E5DAC8]">
            <div className="text-center mb-8">
              <span className="font-sans font-extrabold text-xs tracking-[0.3em] text-[#B91C1C] uppercase block mb-2">
                O U R &nbsp; C H A M P I O N S
              </span>
              <h3 className="font-serif font-extrabold text-3xl sm:text-4xl text-[#2C1C13]">
                Meet Our Previous Writers & Published Authors
              </h3>
              <p className="font-sans text-xs text-[#6B5B4C] max-w-xl mx-auto mt-2 leading-relaxed">
                Real writers across India receiving their published paperback books, national certificates, and awards.
              </p>
            </div>

            {/* Continuous Marquee Container */}
            <div className="space-y-4 sm:space-y-6 overflow-hidden relative py-4">

              {/* Row 1: Sliding Left */}
              <div className="flex w-max gap-3 sm:gap-4 animate-scroll-left hover:[animation-play-state:paused] transition-all [animation-duration:12s]">
                {[...row1Images, ...row1Images].map((img, idx) => (
                  <div 
                    key={`row1-${idx}`} 
                    className="w-44 sm:w-64 h-52 sm:h-64 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 shadow-md group"
                  >
                    <img 
                      src={img.url} 
                      alt={img.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              {/* Row 2: Sliding Right */}
              <div className="flex w-max gap-3 sm:gap-4 animate-scroll-right hover:[animation-play-state:paused] transition-all [animation-duration:12s]">
                {[...row2Images, ...row2Images].map((img, idx) => (
                  <div 
                    key={`row2-${idx}`} 
                    className="w-44 sm:w-64 h-52 sm:h-64 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 shadow-md group"
                  >
                    <img 
                      src={img.url} 
                      alt={img.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

            </div>
          </div>


          {/* BENEFITS & REWARDS SECTION */}
          <div className="my-16 pt-10 border-t border-[#E5DAC8]">
            <div className="text-center mb-12">
              <span className="font-sans font-extrabold text-xs tracking-[0.3em] text-[#B91C1C] uppercase block mb-3">
                B E N E F I T S &nbsp; & &nbsp; R E W A R D S
              </span>
              <h3 className="font-serif font-extrabold text-3xl sm:text-4xl text-[#2C1C13] leading-tight">
                What will participants receive?
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* TOP 3 WINNERS */}
              <div className="bg-gradient-to-br from-[#FAF6F0] to-white border-2 border-[#D4AF37]/40 rounded-3xl p-8 sm:p-10 relative shadow-[0_12px_40px_rgba(212,175,55,0.1)] group hover:-translate-y-1 transition-all overflow-hidden flex flex-col justify-center">
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-[#D4AF37]/20 rounded-full blur-2xl group-hover:bg-[#D4AF37]/30 transition-all"></div>
                <div className="flex items-center gap-3 mb-6 relative z-10 justify-center text-center flex-col sm:flex-row">
                  <Trophy className="w-10 h-10 text-[#D4AF37]" />
                  <h4 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#2C1C13] uppercase tracking-wide">
                    TOP 3 WINNERS <br className="hidden sm:block"/>WILL RECEIVE
                  </h4>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-[#E3D8C4] shadow-sm relative z-10 text-center">
                  <p className="font-serif font-bold text-[#B91C1C] text-lg sm:text-xl mb-6">
                    September Writers&apos; Cup with:
                  </p>
                  <ul className="space-y-4 font-sans text-sm sm:text-base text-[#4A3B2F] font-semibold inline-flex flex-col text-left">
                    <li className="flex items-center gap-3">
                      <span className="text-2xl">🥇</span>
                      <span>Gold-Plated Medal</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-2xl">📜</span>
                      <span>Winner&apos;s Certificate</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* EVERY PARTICIPANT */}
              <div className="bg-white border-2 border-[#E3D8C4] rounded-3xl p-8 sm:p-10 relative shadow-[0_8px_30px_rgba(0,0,0,0.04)] group hover:-translate-y-1 hover:border-[#B91C1C]/30 transition-all">
                <div className="flex items-center gap-3 mb-8">
                  <h4 className="font-serif font-extrabold text-xl sm:text-2xl text-[#2C1C13] uppercase tracking-wide flex items-center gap-2">
                    <span className="text-2xl">✍️</span> EVERY PARTICIPANT WILL RECEIVE
                  </h4>
                </div>
                
                <div className="space-y-6">
                  {/* Item 1 */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#FAF6F0] flex items-center justify-center shrink-0 border border-[#E3D8C4]">
                      <span className="text-lg">📜</span>
                    </div>
                    <div>
                      <h5 className="font-serif font-bold text-[#2C1C13] text-base mb-1">National-Level Certificate</h5>
                      <p className="font-sans text-xs sm:text-sm text-[#6B5B4C] leading-relaxed">
                        Every participant will receive a National Certificate, community-verified and signed by the competition judges.
                      </p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#FAF6F0] flex items-center justify-center shrink-0 border border-[#E3D8C4]">
                      <span className="text-lg">📖</span>
                    </div>
                    <div>
                      <h5 className="font-serif font-bold text-[#2C1C13] text-base mb-1">Featured in the September Poetry Anthology</h5>
                      <p className="font-sans text-xs sm:text-sm text-[#6B5B4C] leading-relaxed">
                        Every participant will get the opportunity to have their name and selected write-up featured in our September Poetry Anthology/Book, giving their work a permanent place in a published collection.
                      </p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#FAF6F0] flex items-center justify-center shrink-0 border border-[#E3D8C4]">
                      <span className="text-lg">📊</span>
                    </div>
                    <div>
                      <h5 className="font-serif font-bold text-[#2C1C13] text-base mb-1">Personal Judging Report</h5>
                      <p className="font-sans text-xs sm:text-sm text-[#6B5B4C] leading-relaxed">
                        Every participant will receive a detailed judging report with their marks, helping them understand how their entry was evaluated by the judges.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>


          {/* JUDGING PANEL SECTION */}
          <div className="my-16 pt-10 border-t border-[#E5DAC8]">
            <div className="text-center mb-10">
              <span className="font-sans font-extrabold text-xs tracking-[0.3em] text-[#B91C1C] uppercase block mb-2">
                E V A L U A T I O N &nbsp; P R O C E S S
              </span>
              <h3 className="font-serif font-extrabold text-3xl sm:text-4xl text-[#2C1C13]">
                Meet The Judging Panel
              </h3>
            </div>
            
            <div className="bg-[#FAF6F0] border border-[#E3D8C4] rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#B91C1C]/10 mb-6 mx-auto md:mx-0">
                    <Users className="w-8 h-8 text-[#B91C1C]" />
                  </div>
                  <h4 className="font-serif font-bold text-2xl sm:text-3xl text-[#2C1C13] mb-4">
                    A 5-Panel Expert Jury
                  </h4>
                  <p className="font-sans text-sm sm:text-base text-[#4A3B2F] leading-relaxed mb-6">
                    Every poem and story submitted goes through a rigorous, blind-review process. Our <strong className="font-bold text-[#B91C1C]">5-panel jury</strong> consists of seasoned authors, literature professors, and editorial critics who meticulously read and score each piece.
                  </p>
                  <p className="font-sans text-sm text-[#6B5B4C] leading-relaxed italic border-l-4 border-[#D4AF37] pl-4">
                    "Only after all 5 judges have completely reviewed and scored the entries will the final results be calculated and announced."
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  {[
                    { title: "Language Experts", desc: "Specialists evaluating grammatical brilliance, vocabulary depth, and rhythmic flow." },
                    { title: "Regional Experts", desc: "Cultural literature consultants who deeply understand the nuance of regional themes." },
                    { title: "Literary Critics", desc: "Judges dedicated to evaluating the emotional impact, storytelling, and soul of your writing." },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white border border-[#E3DAC8] rounded-2xl p-5 flex items-start gap-4 shadow-xs hover:border-[#D4AF37] transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-serif font-bold text-base text-[#2C1C13] mb-1">{item.title}</h5>
                        <p className="font-sans text-xs text-[#6B5B4C] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* INSTAGRAM CREDIBILITY SECTION */}
          <div className="my-16 pt-10 border-t border-[#E5DAC8]">
            <div className="bg-[#F7F2EA] border border-[#E3D8C4] rounded-3xl p-8 sm:p-12 text-center shadow-sm relative overflow-hidden">
              
              {/* Subtle background decoration */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-tr from-transparent via-[#F58529]/10 to-[#DD2A7B]/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-gradient-to-tr from-[#8134AF]/10 via-[#DD2A7B]/10 to-transparent rounded-full blur-3xl" />

              <div className="flex flex-col items-center justify-center relative z-10">
                
                {/* Profile Image & Blue Tick */}
                <div className="relative mb-5">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] shadow-md">
                    <img 
                      src="/images/inkfetish_logo.webp" 
                      alt="Inkfetish Instagram Logo" 
                      className="w-full h-full rounded-full object-cover border-[3px] border-[#F7F2EA]"
                    />
                  </div>
                  {/* Blue Tick */}
                  <div className="absolute bottom-1 right-1 sm:bottom-1 sm:right-1">
                    <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-[#1DA1F2] drop-shadow-sm" />
                  </div>
                </div>

                {/* Handle & Insta Logo */}
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-[#DD2A7B]" />
                  <h3 className="font-sans font-black text-2xl sm:text-3xl text-[#2C1C13] tracking-tight">
                    @ink.fetish
                  </h3>
                </div>

                <p className="font-serif italic text-lg sm:text-xl text-[#6B5B4C] mb-8 max-w-lg">
                  Join India's most loved and trusted writing community. Home to <strong className="font-bold text-[#B91C1C]">210,000+</strong> writers, poets, and storytellers.
                </p>

                {/* Stats / Trust badges */}
                <div className="flex items-center justify-center gap-4 sm:gap-12 w-full max-w-xl mx-auto border-t border-[#E3D8C4] pt-8">
                  <div className="text-center px-2">
                    <span className="block font-sans font-black text-2xl sm:text-3xl text-[#2C1C13]">210K+</span>
                    <span className="block font-sans text-[9px] sm:text-[11px] font-bold text-[#7A6B5D] uppercase tracking-[0.2em] mt-1.5">Followers</span>
                  </div>
                  <div className="h-12 w-px bg-[#DCD3C3]" />
                  <div className="text-center px-2">
                    <span className="block font-sans font-black text-2xl sm:text-3xl text-[#2C1C13]">12M+</span>
                    <span className="block font-sans text-[9px] sm:text-[11px] font-bold text-[#7A6B5D] uppercase tracking-[0.2em] mt-1.5">Monthly Reach</span>
                  </div>
                  <div className="h-12 w-px bg-[#DCD3C3]" />
                  <div className="text-center px-2">
                    <span className="block font-sans font-black text-2xl sm:text-3xl text-[#2C1C13]">100%</span>
                    <span className="block font-sans text-[9px] sm:text-[11px] font-bold text-[#7A6B5D] uppercase tracking-[0.2em] mt-1.5">Trusted</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ABOUT INKFETISH SECTION */}
          <div className="my-16 pt-10 border-t border-[#E5DAC8]">
            <div className="bg-[#1A100B] border border-[#2C1C13] rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
              
              {/* Background Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-64 bg-[#B91C1C]/10 rounded-full blur-[100px] pointer-events-none" />

              {/* Top label */}
              <div className="inline-flex items-center gap-3 bg-[#2C1C13] border border-[#4A3B2F] px-4 py-1.5 rounded-full mb-8 relative z-10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B91C1C] animate-pulse" />
                <span className="font-sans font-bold text-[10px] sm:text-xs tracking-[0.3em] text-[#C9B99A] uppercase">
                  A B O U T &nbsp; U S
                </span>
              </div>

              {/* Main heading: INKFETISH big, Publication small */}
              <div className="mb-4 relative z-10">
                <h3 className="font-serif font-black text-5xl sm:text-7xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-[#FAF6F0] to-[#9A8574] uppercase leading-none tracking-tighter drop-shadow-lg">
                  INKFETISH
                </h3>
                <p className="font-sans font-bold text-xs sm:text-base tracking-[0.5em] text-[#B91C1C] uppercase mt-2">
                  P U B L I C A T I O N
                </p>
              </div>

              <p className="font-serif italic text-lg sm:text-2xl text-[#C9B99A] mt-6 mb-10 relative z-10 font-medium">
                Building India's Fastest Growing Writing Community
              </p>
              
              <div className="flex items-center justify-center gap-4 sm:gap-10 mb-12 relative z-10">
                {['Words', 'Soul', 'Legacy'].map((word, i) => (
                  <React.Fragment key={word}>
                    <span className="font-serif font-black text-xl sm:text-3xl text-[#FAF6F0] tracking-wide">{word}.</span>
                    {i !== 2 && <span className="text-[#B91C1C] opacity-50">✦</span>}
                  </React.Fragment>
                ))}
              </div>
              
              <div className="h-px bg-gradient-to-r from-transparent via-[#4A3B2F] to-transparent w-full mb-12" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 text-left relative z-10">
                
                {/* Left Col: Journey */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <Trophy className="w-6 h-6 text-[#B91C1C]" />
                    <p className="font-sans font-bold text-xs sm:text-sm tracking-[0.2em] text-[#FAF6F0] uppercase">
                      O U R &nbsp; J O U R N E Y
                    </p>
                  </div>
                  <div className="space-y-4">
                    {[
                      ['Authorverse Summit', 'Global Literary Conference'],
                      ['Poetry Festival', 'Celebrating the Art of Poetry'],
                      ['Shakespeare Poetry Award', 'Honoring Timeless Excellence'],
                      ['Indian Writers League', 'Uniting Writers. Inspiring Stories.'],
                      ['Bharat Writes', "Showcasing India's Writing Talent"],
                      ['September Writing Competition', 'Where Words Begin Change'],
                    ].map(([title, sub]) => (
                      <div key={title} className="flex items-start gap-3.5 bg-[#251710] border border-[#3A261B] p-4 rounded-xl hover:bg-[#2C1C13] hover:border-[#B91C1C]/40 transition-colors">
                        <CheckCircle2 className="w-5 h-5 text-[#B91C1C] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-serif font-bold text-sm sm:text-base text-[#FAF6F0] block mb-0.5">{title}</span>
                          <span className="font-sans text-[11px] sm:text-xs text-[#9A8574]">{sub}</span>
                        </div>
                      </div>
                    ))}
                    <div className="pl-4 pt-2">
                      <span className="font-serif italic text-sm text-[#7A6B5D]">And Many More...</span>
                    </div>
                  </div>
                </div>

                {/* Right Col: Achievements & Closing */}
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <TrendingUp className="w-6 h-6 text-[#B91C1C]" />
                      <p className="font-sans font-bold text-xs sm:text-sm tracking-[0.2em] text-[#FAF6F0] uppercase">
                        O U R &nbsp; I M P A C T
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        ['8+', 'Competitions Hosted'],
                        ['3900+', 'Writers Joined'],
                        ['₹5.25L+', 'Prize Money Awarded'],
                        ['100%', 'Verified Participants'],
                      ].map(([stat, label], i) => (
                        <div key={label} className={`bg-[#251710] border border-[#3A261B] rounded-xl p-5 text-center flex flex-col justify-center ${i === 2 ? 'col-span-2 sm:col-span-1' : ''} ${i === 3 ? 'col-span-2 sm:col-span-1' : ''}`}>
                          <span className="font-serif font-black text-2xl sm:text-3xl text-[#B91C1C] block mb-1 drop-shadow-sm">{stat}</span>
                          <span className="font-sans text-[9px] sm:text-[10px] text-[#C9B99A] uppercase font-bold tracking-widest">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-12 bg-gradient-to-br from-[#B91C1C] to-[#801313] rounded-2xl p-6 sm:p-8 text-center shadow-lg border border-[#D92C2C]/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                    <p className="font-sans font-black text-xs tracking-[0.3em] text-[#F7F2EA]/80 uppercase mb-4">
                      T H E &nbsp; M I S S I O N
                    </p>
                    <p className="font-serif font-black text-xl sm:text-2xl text-white uppercase leading-snug">
                      BUILDING OPPORTUNITIES.<br />
                      CELEBRATING TALENT.<br />
                      EMPOWERING WRITERS.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* IMAGE GALLERY SECTION */}
          <div className="my-16 pt-10 border-t border-[#E5DAC8] overflow-hidden">
            <div className="text-center mb-10 px-4">
              <span className="font-sans font-extrabold text-xs tracking-[0.3em] text-[#B91C1C] uppercase block mb-2">
                O U R &nbsp; C H A M P I O N S
              </span>
              <h3 className="font-serif font-extrabold text-3xl sm:text-4xl text-[#2C1C13] mb-3">
                Meet Our Previous Writers & Published Authors
              </h3>
              <p className="font-sans text-sm sm:text-base text-[#6B5B4C] max-w-2xl mx-auto">
                Real writers across India receiving their published paperback books, national certificates, and awards.
              </p>
            </div>
            
            <style>{`
              @keyframes slideLeft {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              @keyframes slideRight {
                0% { transform: translateX(-50%); }
                100% { transform: translateX(0); }
              }
              .animate-slide-left {
                animation: slideLeft 20s linear infinite;
              }
              .animate-slide-right {
                animation: slideRight 20s linear infinite;
              }
              .pause-on-hover:hover {
                animation-play-state: paused;
              }
            `}</style>

            <div className="relative w-[200vw] sm:w-[150vw] left-1/2 -translate-x-1/2 flex flex-col gap-4">
              {/* Row 1 */}
              <div className="flex gap-4 animate-slide-left pause-on-hover w-max">
                {[...row1Images, ...row1Images, ...row1Images].map((img, i) => (
                  <div key={i} className="w-48 sm:w-64 aspect-square rounded-2xl overflow-hidden shrink-0 border border-[#E3D8C4] shadow-sm relative group">
                    <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white font-sans text-[10px] font-bold tracking-wide">{img.title}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Row 2 */}
              <div className="flex gap-4 animate-slide-right pause-on-hover w-max">
                {[...row2Images, ...row2Images, ...row2Images].map((img, i) => (
                  <div key={i} className="w-48 sm:w-64 aspect-[4/3] rounded-2xl overflow-hidden shrink-0 border border-[#E3D8C4] shadow-sm relative group">
                    <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white font-sans text-[10px] font-bold tracking-wide">{img.title}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Row 3 */}
              <div className="flex gap-4 animate-slide-left pause-on-hover w-max" style={{ animationDuration: '25s' }}>
                {[...row3Images, ...row3Images, ...row3Images].map((img, i) => (
                  <div key={i} className="w-48 sm:w-64 aspect-square rounded-2xl overflow-hidden shrink-0 border border-[#E3D8C4] shadow-sm relative group">
                    <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white font-sans text-[10px] font-bold tracking-wide">{img.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* REVIEWS & TESTIMONIALS SECTION */}
          <div className="my-16 pt-10 border-t border-[#E5DAC8]">
            <div className="text-center mb-10">
              <span className="font-sans font-extrabold text-xs tracking-[0.3em] text-[#B91C1C] uppercase block mb-2">
                T E S T I M O N I A L S
              </span>
              <h3 className="font-serif font-extrabold text-3xl sm:text-4xl text-[#2C1C13]">
                What Our Authors & Contestants Say
              </h3>
              <p className="font-sans text-xs text-[#6B5B4C] max-w-xl mx-auto mt-2">
                Real feedback from poets and storytellers across India who transformed their writing journey with Inkfetish.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Review 1 */}
              <div className="bg-[#F7F2EA] border border-[#E3D8C4] rounded-2xl p-6 relative flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-[#B91C1C]" />
                    ))}
                  </div>
                  <p className="font-serif italic text-sm text-[#4A3B2F] mb-4 leading-relaxed">
                    "This was the first time I participated in something like this. The zoom session was genuinely so well organised, felt super special when my name was announced."
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E8DFD1] flex items-center justify-between">
                  <div>
                    <span className="font-serif font-bold text-sm text-[#2C1C13] block">Priya Sharma</span>
                    <span className="font-sans text-[10px] text-[#7A6B5D]">New Delhi · Poetry</span>
                  </div>
                  <span className="text-[10px] font-sans font-bold bg-[#E8DEC9] text-[#2C1C13] px-2 py-0.5 rounded-md">
                    Published
                  </span>
                </div>
              </div>

              {/* Review 2 */}
              <div className="bg-[#F7F2EA] border border-[#E3D8C4] rounded-2xl p-6 relative flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-[#B91C1C]" />
                    ))}
                  </div>
                  <p className="font-serif italic text-sm text-[#4A3B2F] mb-4 leading-relaxed">
                    "చాలా మంచి ప్లాట్‌ఫామ్ ఇది (Very good platform). I didn't expect a regional language poem to get this much attention. Book quality is just amazing!"
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E8DFD1] flex items-center justify-between">
                  <div>
                    <span className="font-serif font-bold text-sm text-[#2C1C13] block">Venkatesh Rao</span>
                    <span className="font-sans text-[10px] text-[#7A6B5D]">Hyderabad · Telugu Poem</span>
                  </div>
                  <span className="text-[10px] font-sans font-bold bg-[#E8DEC9] text-[#2C1C13] px-2 py-0.5 rounded-md">
                    Verified
                  </span>
                </div>
              </div>

              {/* Review 3 */}
              <div className="bg-[#F7F2EA] border border-[#E3D8C4] rounded-2xl p-6 relative flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-[#B91C1C]" />
                    ))}
                  </div>
                  <p className="font-serif italic text-sm text-[#4A3B2F] mb-4 leading-relaxed">
                    "Honestly, I thought these contests were scams, but Inkfetish proved me wrong. Got the tracking ID on WhatsApp and the physical certificate arrived perfectly packed."
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E8DFD1] flex items-center justify-between">
                  <div>
                    <span className="font-serif font-bold text-sm text-[#2C1C13] block">Ananya Sen</span>
                    <span className="font-sans text-[10px] text-[#7A6B5D]">Kolkata · Essay</span>
                  </div>
                  <span className="text-[10px] font-sans font-bold bg-[#E8DEC9] text-[#2C1C13] px-2 py-0.5 rounded-md">
                    Anthology Author
                  </span>
                </div>
              </div>

              {/* Review 4 */}
              <div className="bg-[#F7F2EA] border border-[#E3D8C4] rounded-2xl p-6 relative flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-[#B91C1C]" />
                    ))}
                  </div>
                  <p className="font-serif italic text-sm text-[#4A3B2F] mb-4 leading-relaxed">
                    "The judges feedback literally pointed out things in my writing I never noticed before. Best 249 rupees I have ever spent, period."
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E8DFD1] flex items-center justify-between">
                  <div>
                    <span className="font-serif font-bold text-sm text-[#2C1C13] block">Fatima Sheikh</span>
                    <span className="font-sans text-[10px] text-[#7A6B5D]">Lucknow · Ghazal</span>
                  </div>
                  <span className="text-[10px] font-sans font-bold bg-[#E8DEC9] text-[#2C1C13] px-2 py-0.5 rounded-md">
                    Published
                  </span>
                </div>
              </div>

              {/* Review 5 */}
              <div className="bg-[#F7F2EA] border border-[#E3D8C4] rounded-2xl p-6 relative flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-[#B91C1C]" />
                    ))}
                  </div>
                  <p className="font-serif italic text-sm text-[#4A3B2F] mb-4 leading-relaxed">
                    "Great experience overall. Customer support on WhatsApp was quite responsive when I had a doubt about my shipping address."
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E8DFD1] flex items-center justify-between">
                  <div>
                    <span className="font-serif font-bold text-sm text-[#2C1C13] block">Rohan Deshmukh</span>
                    <span className="font-sans text-[10px] text-[#7A6B5D]">Pune · Short Story</span>
                  </div>
                  <span className="text-[10px] font-sans font-bold bg-[#E8DEC9] text-[#2C1C13] px-2 py-0.5 rounded-md">
                    Verified
                  </span>
                </div>
              </div>

              {/* Review 6 */}
              <div className="bg-[#F7F2EA] border border-[#E3D8C4] rounded-2xl p-6 relative flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-[#B91C1C]" />
                    ))}
                  </div>
                  <p className="font-serif italic text-sm text-[#4A3B2F] mb-4 leading-relaxed">
                    "The ISBN book is kept proudly in my living room now. The pride on my parents&apos; face when they saw my printed name was worth everything."
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E8DFD1] flex items-center justify-between">
                  <div>
                    <span className="font-serif font-bold text-sm text-[#2C1C13] block">Sneha Patel</span>
                    <span className="font-sans text-[10px] text-[#7A6B5D]">Ahmedabad · Micro-Tale</span>
                  </div>
                  <span className="text-[10px] font-sans font-bold bg-[#E8DEC9] text-[#2C1C13] px-2 py-0.5 rounded-md">
                    Featured
                  </span>
                </div>
              </div>

              {/* Review 7 */}
              <div className="bg-[#F7F2EA] border border-[#E3D8C4] rounded-2xl p-6 relative flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-[#B91C1C]" />
                    ))}
                  </div>
                  <p className="font-serif italic text-sm text-[#4A3B2F] mb-4 leading-relaxed">
                    "सर्टिफिकेट की क्वालिटी बहुत प्रीमियम है। और किताब में अपनी कविता देख कर जो खुशी हुई, वो शब्दों में नहीं बता सकता। धन्यवाद!"
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E8DFD1] flex items-center justify-between">
                  <div>
                    <span className="font-serif font-bold text-sm text-[#2C1C13] block">Amit Kumar</span>
                    <span className="font-sans text-[10px] text-[#7A6B5D]">Patna · Hindi Kavita</span>
                  </div>
                  <span className="text-[10px] font-sans font-bold bg-[#E8DEC9] text-[#2C1C13] px-2 py-0.5 rounded-md">
                    Published
                  </span>
                </div>
              </div>

              {/* Review 8 */}
              <div className="bg-[#F7F2EA] border border-[#E3D8C4] rounded-2xl p-6 relative flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-[#B91C1C]" />
                    ))}
                  </div>
                  <p className="font-serif italic text-sm text-[#4A3B2F] mb-4 leading-relaxed">
                    "Took around 3 weeks for the book delivery which was slightly long, but the hardcover and print quality completely made up for it."
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E8DFD1] flex items-center justify-between">
                  <div>
                    <span className="font-serif font-bold text-sm text-[#2C1C13] block">Karthik Iyer</span>
                    <span className="font-sans text-[10px] text-[#7A6B5D]">Chennai · Novel Excerpt</span>
                  </div>
                  <span className="text-[10px] font-sans font-bold bg-[#E8DEC9] text-[#2C1C13] px-2 py-0.5 rounded-md">
                    Anthology Author
                  </span>
                </div>
              </div>

              {/* Review 9 */}
              <div className="bg-[#F7F2EA] border border-[#E3D8C4] rounded-2xl p-6 relative flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-[#B91C1C]" />
                    ))}
                  </div>
                  <p className="font-serif italic text-sm text-[#4A3B2F] mb-4 leading-relaxed">
                    "From registration to the grand Zoom ceremony, everything was flawless. The scorecard is actually very detailed and helpful."
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E8DFD1] flex items-center justify-between">
                  <div>
                    <span className="font-serif font-bold text-sm text-[#2C1C13] block">Jaspreet Singh</span>
                    <span className="font-sans text-[10px] text-[#7A6B5D]">Chandigarh · Micro-Tale</span>
                  </div>
                  <span className="text-[10px] font-sans font-bold bg-[#E8DEC9] text-[#2C1C13] px-2 py-0.5 rounded-md">
                    Featured
                  </span>
                </div>
              </div>

              {/* Review 10 */}
              <div className="bg-[#F7F2EA] border border-[#E3D8C4] rounded-2xl p-6 relative flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-[#B91C1C]" />
                    ))}
                  </div>
                  <p className="font-serif italic text-sm text-[#4A3B2F] mb-4 leading-relaxed">
                    "Really transparent jury process. I didn&apos;t win the cash prize but the appreciation letter and feedback report were massive confidence boosters."
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E8DFD1] flex items-center justify-between">
                  <div>
                    <span className="font-serif font-bold text-sm text-[#2C1C13] block">Meenakshi Pillai</span>
                    <span className="font-sans text-[10px] text-[#7A6B5D]">Trivandrum · English Poetry</span>
                  </div>
                  <span className="text-[10px] font-sans font-bold bg-[#E8DEC9] text-[#2C1C13] px-2 py-0.5 rounded-md">
                    Verified
                  </span>
                </div>
              </div>

              {/* Review 11 */}
              <div className="bg-[#F7F2EA] border border-[#E3D8C4] rounded-2xl p-6 relative flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-[#B91C1C]" />
                    ))}
                  </div>
                  <p className="font-serif italic text-sm text-[#4A3B2F] mb-4 leading-relaxed">
                    "मैं गांव से हूँ, मुझे लगा नहीं था कि मेरी कहानी छपेगी। पर इन्होने सच में सपोर्ट किया। बहुत अच्छा काम कर रहे हैं आप लोग।"
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E8DFD1] flex items-center justify-between">
                  <div>
                    <span className="font-serif font-bold text-sm text-[#2C1C13] block">Rakesh Verma</span>
                    <span className="font-sans text-[10px] text-[#7A6B5D]">Jaipur · Hindi Kahani</span>
                  </div>
                  <span className="text-[10px] font-sans font-bold bg-[#E8DEC9] text-[#2C1C13] px-2 py-0.5 rounded-md">
                    Published
                  </span>
                </div>
              </div>

              {/* Review 12 */}
              <div className="bg-[#F7F2EA] border border-[#E3D8C4] rounded-2xl p-6 relative flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-[#B91C1C]" />
                    ))}
                  </div>
                  <p className="font-serif italic text-sm text-[#4A3B2F] mb-4 leading-relaxed">
                    "Legit and highly recommended for beginners! My friends ordered 3 copies of the book just to read my piece haha."
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E8DFD1] flex items-center justify-between">
                  <div>
                    <span className="font-serif font-bold text-sm text-[#2C1C13] block">Diya Mukherjee</span>
                    <span className="font-sans text-[10px] text-[#7A6B5D]">Guwahati · Short Story</span>
                  </div>
                  <span className="text-[10px] font-sans font-bold bg-[#E8DEC9] text-[#2C1C13] px-2 py-0.5 rounded-md">
                    Verified
                  </span>
                </div>
              </div>

            </div>

            <div className="mt-12 text-center flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 bg-[#F7F2EA] px-5 py-2.5 rounded-full border border-[#E3D8C4] shadow-xs">
                <div className="flex -space-x-2">
                  <img src="https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1776802129/WhatsApp_Image_2026-04-22_at_1.37.09_AM_2_d7vvc7.jpg" alt="Writer" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                  <img src="https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1776839099/WhatsApp_Image_2026-03-31_at_4.27.16_PM_mnph2j.jpg" alt="Writer" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                  <img src="https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1779219146/WhatsApp_Image_2026-04-23_at_11.56.53_AM_wcnfvy.jpg" alt="Writer" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                </div>
                <div className="w-px h-4 bg-[#DCD3C3] mx-1"></div>
                <span className="font-sans text-xs text-[#4A3B2F] font-bold">
                  Join <span className="text-[#B91C1C]">450+ more</span> 4.9-star reviews from writers across India
                </span>
              </div>
            </div>
          </div>

          {/* Vintage Typewriter Artwork & Quote Section at Bottom of Arch */}
          <div className="mt-16 pt-10 border-t border-[#E5DAC8] text-center flex flex-col items-center">
            
            {/* Typewriter Box Graphic */}
            <div className="w-48 sm:w-64 h-32 bg-[#2C1C13] rounded-t-3xl border-4 border-[#1A100B] relative flex flex-col items-center justify-end p-4 shadow-xl">
              {/* Paper sticking out */}
              <div className="absolute -top-12 w-36 h-20 bg-[#FAF6F0] border border-[#DCD3C3] shadow-md rounded-t-md p-2 text-center flex flex-col items-center justify-center">
                <span className="font-serif italic text-[11px] font-semibold text-[#2C1C13] leading-tight">
                  "Good Stories <br /> Live Longer."
                </span>
                <span className="font-sans text-[8px] font-bold text-[#B91C1C] tracking-widest uppercase mt-1">
                  InkFetish
                </span>
              </div>
              
              {/* Typewriter Keys simulation */}
              <div className="w-full grid grid-cols-6 gap-1 mt-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="h-2 rounded-full bg-[#5C4537] border border-[#1A100B]" />
                ))}
              </div>
            </div>

            <p className="font-serif italic text-sm text-[#6B5B4C] mt-4">
              "Ideas · People · Emotions · Stories · You"
            </p>
            <p className="font-sans text-[11px] tracking-[0.2em] uppercase font-bold text-[#7A6B5D] mt-1">
              SAME PEOPLE DIFFERENT STORIES • KEEP WRITING
            </p>
          </div>
        </div>

        {/* CUSTOM CONTEST FOOTER */}
        <footer className="mt-20 border-t border-[#E5DAC8] pt-12 pb-24 sm:pb-32 text-center relative bg-gradient-to-b from-transparent to-[#E8DEC9]/50 -mx-4 sm:-mx-8 lg:-mx-12 px-4 sm:px-8 lg:px-12">
          <h4 className="font-serif font-extrabold text-2xl text-[#2C1C13] mb-4">
            September Writing Competition
          </h4>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 mb-8 font-sans text-sm text-[#4A3B2F]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#B91C1C]" />
              <span>Result Date: <strong className="font-bold">10th October</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#B91C1C]" />
              <span>Entry Options: <strong className="font-bold">₹249 / ₹299</strong></span>
            </div>
          </div>
          
          <Button 
            onClick={() => { setDrawerMode('register'); setIsDrawerOpen(true); }}
            className="px-10 py-6 rounded-full bg-[#B91C1C] hover:bg-[#991515] text-white font-sans text-sm uppercase tracking-wider font-bold shadow-lg shadow-[#B91C1C]/20 transition-all hover:-translate-y-1"
          >
            Submit Your Entry Now <Send className="w-4 h-4 ml-2" />
          </Button>
          
          <div className="mt-12 pt-8 border-t border-[#E3D8C4] flex flex-col items-center justify-center">
            <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#7A6B5D] mb-2">
              Inkfetish Publication • Estd 2025
            </span>
            <p className="font-sans text-[11px] text-[#A69B8F] max-w-xs mx-auto">
              Bridging the gap between digital creativity and physical craftsmanship.
            </p>
          </div>
        </footer>

      </main>

      {/* STICKY BOTTOM FLOATING BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#F4EFE6]/95 backdrop-blur-md border-t border-[#E3DAC9] px-3 sm:px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#B91C1C] animate-ping shrink-0" />
          <div className="text-left overflow-hidden">
            <span className="font-serif font-bold text-[11px] sm:text-sm text-[#2C1C13] block leading-tight truncate">
              September Writing Competition
            </span>
            <span className="font-sans text-[9px] sm:text-[10px] text-[#7A6B5D] truncate block">
              Result: 10th Oct · Entry {currentPrice}
            </span>
          </div>
        </div>

        <Button 
          onClick={() => {
            if (userReg?.payment_status === 'PAID') {
              window.location.href = '/september-writing-contest/submit';
            } else {
              openRegistrationDrawer();
            }
          }}
          className="rounded-full bg-[#B91C1C] hover:bg-[#991515] text-white font-sans text-[10px] sm:text-xs uppercase tracking-wider font-bold px-4 sm:px-6 py-2 sm:py-2.5 shadow-md transition-all hover:scale-105 shrink-0 flex items-center gap-1.5"
        >
          {userReg?.payment_status === 'PAID' ? (
            <><Send className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Submit</>
          ) : (
            <><Send className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Register</>
          )}
        </Button>
      </div>

      {/* SLIDE-UP TRAY DRAWER (FOR REGISTRATION FORM) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end justify-center transition-all animate-in fade-in duration-200">
          
          {/* Backdrop Overlay Click to Close */}
          <div 
            className="absolute inset-0" 
            onClick={() => setIsDrawerOpen(false)} 
          />

          {/* Drawer Content Sheet */}
          <div className="w-full max-w-2xl max-h-[92vh] bg-[#FAF6F0] border-t-4 border-[#B91C1C] rounded-t-3xl shadow-2xl flex flex-col overflow-hidden relative z-10 animate-in slide-in-from-bottom duration-300">
            
            {/* Drawer Header with Artwork Banner */}
            <div className="bg-[#EDE5D8] border-b border-[#DCD3C3] px-6 py-4 flex items-center justify-between relative shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#B91C1C] flex items-center justify-center text-white font-bold shadow-xs shrink-0">
                  <Feather className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-serif font-bold text-sm sm:text-lg text-[#2C1C13] leading-tight truncate">
                    September Competition
                  </h4>
                  <p className="font-sans text-[9px] sm:text-[11px] text-[#7A6B5D] uppercase tracking-wider font-medium truncate">
                    Inkfetish™ | 210K+ Readers
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="w-9 h-9 rounded-full bg-[#FAF6F0] hover:bg-[#E3DAC8] text-[#2C1C13] flex items-center justify-center transition-colors border border-[#DCD3C3]"
                aria-label="Close registration drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(92vh-80px)] space-y-6">
              
              {/* Mini Banner */}
              <div className="bg-[#F4EFE6] border border-[#E3DAC8] rounded-xl p-4 text-center flex items-center justify-between">
                <div className="text-left">
                  <span className="font-serif font-black text-xl text-[#B91C1C] block">SEPTEMBER CONTEST</span>
                  <span className="font-sans text-xs text-[#6B5B4C]">📅 Result: 10th October · 🎥 Live Zoom Ceremony</span>
                </div>
                <div className="bg-[#B91C1C] text-white px-3 py-1.5 rounded-lg text-center">
                  <span className="font-serif font-bold text-base block">{currentPrice}</span>
                  <span className="font-sans text-[9px] uppercase tracking-wider font-semibold">Entry Fee</span>
                </div>
              </div>

              {/* Trust Badge / Reviews */}
              <div className="flex items-center justify-center gap-3 bg-[#E8DEC9]/30 border border-[#D5C9B3] rounded-lg p-2.5 shadow-xs">
                <div className="flex -space-x-2 shrink-0">
                  <img src="https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1776802129/WhatsApp_Image_2026-04-22_at_1.37.09_AM_2_d7vvc7.jpg" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#FAF6F0] object-cover" alt="Writer 1" />
                  <img src="https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1776839099/WhatsApp_Image_2026-03-31_at_4.27.16_PM_mnph2j.jpg" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#FAF6F0] object-cover" alt="Writer 2" />
                  <img src="https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1779219146/WhatsApp_Image_2026-04-23_at_11.56.53_AM_wcnfvy.jpg" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#FAF6F0] object-cover" alt="Writer 3" />
                </div>
                <div className="text-left leading-none">
                  <div className="flex items-center gap-0.5 text-[#D4AF37] mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                    <span className="text-[#2C1C13] font-bold text-[11px] ml-1 font-sans">4.9/5</span>
                  </div>
                  <span className="font-sans text-[11px] text-[#4A3B2F] font-medium block">
                    Trusted by <strong className="font-bold text-[#B91C1C]">3900+</strong> writers across India
                  </span>
                </div>
              </div>

              {/* Mode Toggle */}

              <form onSubmit={handleSubmit} className="space-y-5 text-left font-sans">

                {drawerMode === 'login' ? (
                  <>
                    <div>
                      <label className="text-xs font-bold text-[#4A3B2F] uppercase tracking-wider mb-1 block">Email *</label>
                      <Input type="email" placeholder="name@example.com" value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="bg-[#F7F2EA] border-[#DCD3C3] focus:border-[#B91C1C] text-[#2C1C13] h-11 rounded-xl text-sm" required />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#4A3B2F] uppercase tracking-wider mb-1 block">Password *</label>
                      <Input type="password" placeholder="Your password" value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="bg-[#F7F2EA] border-[#DCD3C3] focus:border-[#B91C1C] text-[#2C1C13] h-11 rounded-xl text-sm" required />
                    </div>
                    <button type="button" onClick={() => { setDrawerMode('register'); setAuthError(''); }}
                      className="w-full text-center font-sans text-xs text-[#7A6B5D] font-semibold underline underline-offset-2 py-1">
                      ← New here? Register instead
                    </button>
                  </>
                ) : (
                  <>
                    {/* Tier Switcher */}
                    <div>
                      <label className="text-xs font-bold text-[#4A3B2F] uppercase tracking-wider mb-2 block">Select Entry Option</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button type="button" onClick={() => setSelectedTier('1_entry')}
                          className={`py-3 px-4 rounded-xl text-xs font-bold uppercase border transition-all ${
                            selectedTier === '1_entry' ? 'bg-[#B91C1C] text-white border-[#B91C1C]' : 'bg-[#F4EFE6] text-[#4A3B2F] border-[#DCD3C3]'
                          }`}>
                          1 Entry
                        </button>
                        <button type="button" onClick={() => setSelectedTier('2_entries')}
                          className={`py-3 px-4 rounded-xl text-xs font-bold uppercase border transition-all ${
                            selectedTier === '2_entries' ? 'bg-[#B91C1C] text-white border-[#B91C1C]' : 'bg-[#F4EFE6] text-[#4A3B2F] border-[#DCD3C3]'
                          }`}>
                          2 Entries
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#4A3B2F] uppercase tracking-wider mb-1 block">Full Name *</label>
                      <Input placeholder="Enter your full name" value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="bg-[#F7F2EA] border-[#DCD3C3] focus:border-[#B91C1C] text-[#2C1C13] h-11 rounded-xl text-sm" required />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-[#4A3B2F] uppercase tracking-wider mb-1 block">Email *</label>
                        <Input type="email" placeholder="name@example.com" value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="bg-[#F7F2EA] border-[#DCD3C3] focus:border-[#B91C1C] text-[#2C1C13] h-11 rounded-xl text-sm" required />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-[#4A3B2F] uppercase tracking-wider mb-1 block">WhatsApp *</label>
                        <Input type="tel" placeholder="10-digit number" value={formData.phone}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                            setFormData({...formData, phone: val});
                          }}
                          maxLength={10}
                          className="bg-[#F7F2EA] border-[#DCD3C3] focus:border-[#B91C1C] text-[#2C1C13] h-11 rounded-xl text-sm" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-[#4A3B2F] uppercase tracking-wider mb-1 block">Age *</label>
                        <Input type="number" placeholder="e.g. 22" min="5" max="100" value={formData.age}
                          onChange={(e) => setFormData({...formData, age: e.target.value})}
                          className="bg-[#F7F2EA] border-[#DCD3C3] focus:border-[#B91C1C] text-[#2C1C13] h-11 rounded-xl text-sm" required />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-[#4A3B2F] uppercase tracking-wider mb-1 block">Password *</label>
                        <Input type="password" placeholder="Min 6 characters" value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          className="bg-[#F7F2EA] border-[#DCD3C3] focus:border-[#B91C1C] text-[#2C1C13] h-11 rounded-xl text-sm" required />
                      </div>
                    </div>
                    {/* Already Registered button */}
                    <button type="button" onClick={() => { setDrawerMode('login'); setAuthError(''); }}
                      className="w-full text-center font-sans text-xs text-[#B91C1C] font-bold underline underline-offset-2 py-1">
                      Already Registered? Login & Submit Artwork →
                    </button>
                  </>
                )}

                {authError && (
                  <p className="font-sans text-xs text-[#B91C1C] bg-[#FEF2F2] border border-[#FECACA] rounded-xl px-4 py-3">
                    {authError}
                  </p>
                )}

                <div className="pt-2 text-center">
                  <Button type="submit" disabled={isSubmitting}
                    className="w-full py-6 rounded-full bg-[#B91C1C] hover:bg-[#991515] text-white font-sans text-sm uppercase tracking-wider font-bold shadow-lg transition-all hover:scale-[1.02]">
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4 animate-spin" /> {drawerMode === 'login' ? 'Logging in...' : 'Saving...'}
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        {drawerMode === 'login' ? 'Login & Submit Artwork' : 'Continue to Submit Entry'} <Send className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                  <p className="text-[11px] text-[#7A6B5D] mt-2.5">
                    {drawerMode === 'login' ? '🔒 Login to access your submission page' : '🔒 Your details are safe · Next step: paste your writing'}
                  </p>
                </div>

              </form>

            </div>
          </div>

        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#E3DAC8] bg-[#ECE5D8] py-8 px-4 text-center font-sans">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <span className="font-serif font-bold text-base text-[#2C1C13]">
              InkFetish<span className="text-[#B91C1C] text-xs">™</span>
            </span>
            <p className="text-[11px] text-[#7A6B5D]">A Kinder, More Writers Internet · Estd 2025</p>
          </div>
          <p className="text-xs text-[#7A6B5D]">
            © 2026 Inkfetish Publication. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
