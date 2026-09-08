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
import { collection, addDoc, serverTimestamp, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { load } from '@cashfreepayments/cashfree-js';

// Cloudinary images of previous writers receiving certificates, trophies & books
const row1Images = [
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100331/WhatsApp_Image_2026-04-13_at_9.06.50_PM-compressed_f54p62.webp", title: "National Contest Winner", location: "Delhi" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100331/WhatsApp_Image_2026-04-13_at_9.06.50_PM_1_-compressed_bla9w8.webp", title: "Published Anthology Author", location: "Mumbai" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100331/WhatsApp_Image_2026-04-13_at_9.06.49_PM-compressed_krdg8g.webp", title: "Poetry Category Winner", location: "Bangalore" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_9.06.49_PM_1_-compressed_ylopb7.webp", title: "Certificate Recipient", location: "Pune" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_9.06.50_PM_2_-compressed_nrkzf4.webp", title: "Short Story Author", location: "Kolkata" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_8.12.24_PM-compressed_skr10b.webp", title: "National Certificate Holder", location: "Hyderabad" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_9.06.48_PM-compressed_ftx5ea.webp", title: "Inkfetish Anthology Author", location: "Jaipur" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_9.06.48_PM_1_-compressed_zolkao.webp", title: "Top 10 Finalist", location: "Chennai" },
];

const row2Images = [
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_8.27.49_PM-compressed_hhn7yj.webp", title: "Paperback Book Launch", location: "Ahmedabad" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100329/WhatsApp_Image_2026-04-13_at_8.19.16_PM-compressed_pii87q.webp", title: "Judged Award Winner", location: "Lucknow" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775933371/WhatsApp_Image_2026-03-29_at_12.40.13_PM-compressed_wjaeil.webp", title: "National Poetry Finalist", location: "Chandigarh" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775933370/WhatsApp_Image_2026-03-29_at_12.35.16_PM-compressed_qldola.webp", title: "Certificate of Excellence", location: "Indore" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775933368/WhatsApp_Image_2026-03-29_at_12.35.16_PM_2_-compressed_d12sxy.webp", title: "Featured Contest Author", location: "Bhopal" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775933367/WhatsApp_Image_2026-03-29_at_12.35.16_PM_1_-compressed_ddda2d.webp", title: "Printed Book Feature", location: "Guwahati" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775933367/WhatsApp_Image_2026-03-28_at_8.00.34_PM-compressed_yfhhz2.webp", title: "National Champion", location: "Patna" },
  { url: "https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1778137798/rbb6irz8p3oipppmuzld_2_fpgyrg.webp", title: "Syaahi Anthology Collector", location: "Pan-India" },
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
  const targetDate = new Date('2026-09-30T23:59:59').getTime();
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
          // Trigger payment for PENDING users
          if (!cashfree) throw new Error("Cashfree SDK not loaded");

          const res = await fetch('/api/september-contest/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: regData.fullName,
              email: regData.email,
              phone: regData.phone,
              amount: regData.amount
            })
          });
          
          const orderData = await res.json();
          if (!res.ok) throw new Error(orderData.error || 'Failed to create payment order');

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
      
      const amount = selectedTier === '1_entry' ? 1 : 2;
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
          amount: amount
        })
      });
      
      const orderData = await res.json();
      if (!res.ok) throw new Error(orderData.error || 'Failed to create payment order');

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

  const currentPrice = selectedTier === '1_entry' ? '₹1' : '₹2';

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#2C1C13] font-serif selection:bg-[#B91C1C] selection:text-white relative overflow-x-hidden">
      
      {/* Top Banner Navigation */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-[#F4EFE6]/90 border-b border-[#E3DAC9] px-4 md:px-10 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#B91C1C] flex items-center justify-center text-white shadow-sm">
            <Feather className="w-4 h-4" />
          </div>
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
            onClick={() => openRegistrationDrawer()}
            className="rounded-full bg-[#B91C1C] hover:bg-[#991515] text-white font-sans text-xs uppercase tracking-wider font-bold px-5 py-2 shadow-md transition-all hover:scale-105"
          >
            Register Now ({currentPrice})
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
            <h1 className="font-serif font-black text-5xl sm:text-7xl md:text-8xl tracking-tight uppercase leading-[0.9] text-[#B91C1C] mb-2 drop-shadow-sm">
              SEPTEMBER
            </h1>
            <h2 className="font-serif font-black text-4xl sm:text-6xl md:text-7xl tracking-tight uppercase leading-[0.95] text-[#2C1C13]">
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
                <span className="font-serif font-extrabold text-lg text-[#2C1C13]">30th September</span>
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
                onClick={() => openRegistrationDrawer('1_entry')}
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
                onClick={() => openRegistrationDrawer('2_entries')}
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
              onClick={() => openRegistrationDrawer()}
              className="rounded-full bg-[#B91C1C] hover:bg-[#991515] text-white font-sans text-sm uppercase tracking-wider font-bold px-10 py-6 shadow-lg transition-all hover:scale-105 gap-2"
            >
              <Send className="w-4 h-4" /> Open Registration Form ({currentPrice})
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
            <div className="space-y-6 overflow-hidden relative py-4">
              
              {/* Fade Overlay Edges for Vignette Effect */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#FAF6F0] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#FAF6F0] to-transparent z-10 pointer-events-none" />

              {/* Row 1: Sliding Left */}
              <div className="flex w-[200%] gap-4 animate-scroll-left hover:[animation-play-state:paused] transition-all">
                {[...row1Images, ...row1Images].map((img, idx) => (
                  <div 
                    key={`row1-${idx}`} 
                    className="w-56 sm:w-64 h-64 rounded-2xl overflow-hidden shrink-0 shadow-md group"
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
              <div className="flex w-[200%] gap-4 animate-scroll-right hover:[animation-play-state:paused] transition-all">
                {[...row2Images, ...row2Images].map((img, idx) => (
                  <div 
                    key={`row2-${idx}`} 
                    className="w-56 sm:w-64 h-64 rounded-2xl overflow-hidden shrink-0 shadow-md group"
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

          {/* DETAILED BENEFITS SECTION */}
          <div className="my-16 pt-10 border-t border-[#E5DAC8]">
            <div className="text-center mb-10">
              <span className="font-sans font-extrabold text-xs tracking-[0.3em] text-[#B91C1C] uppercase block mb-2">
                W H Y &nbsp; J O I N
              </span>
              <h3 className="font-serif font-extrabold text-3xl sm:text-4xl text-[#2C1C13]">
                Comprehensive Benefits For Every Writer
              </h3>
              <p className="font-sans text-xs text-[#6B5B4C] max-w-xl mx-auto mt-2 leading-relaxed">
                Whether you write poetry, fiction, or non-fiction, Inkfetish provides real physical & digital publishing outcomes for your craft.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Benefit Card 1 */}
              <div className="bg-[#F7F2EA] border border-[#E3D8C4] rounded-2xl p-6 relative flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#B91C1C]/10 border border-[#B91C1C]/20 flex items-center justify-center shrink-0 text-[#B91C1C]">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-[#2C1C13] mb-1">
                    Print Anthology Feature with ISBN
                  </h4>
                  <p className="font-sans text-xs text-[#6B5B4C] leading-relaxed">
                    Selected works are compiled into our monthly paperback anthology with an official ISBN code, distributed on Amazon & Flipkart worldwide.
                  </p>
                </div>
              </div>

              {/* Benefit Card 2 */}
              <div className="bg-[#F7F2EA] border border-[#E3D8C4] rounded-2xl p-6 relative flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#B91C1C]/10 border border-[#B91C1C]/20 flex items-center justify-center shrink-0 text-[#B91C1C]">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-[#2C1C13] mb-1">
                    Government Valid Digital Certificate
                  </h4>
                  <p className="font-sans text-xs text-[#6B5B4C] leading-relaxed">
                    Every participant receives an authenticated National Certificate with a unique verification code valid across academic & professional portfolios.
                  </p>
                </div>
              </div>

              {/* Benefit Card 3 */}
              <div className="bg-[#F7F2EA] border border-[#E3D8C4] rounded-2xl p-6 relative flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#B91C1C]/10 border border-[#B91C1C]/20 flex items-center justify-center shrink-0 text-[#B91C1C]">
                  <Edit3 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-[#2C1C13] mb-1">
                    Editorial Breakdown & Scorecard
                  </h4>
                  <p className="font-sans text-xs text-[#6B5B4C] leading-relaxed">
                    Get detailed constructive critique and score breakdown from bestselling authors covering imagery, emotion, rhythm, and literary impact.
                  </p>
                </div>
              </div>

              {/* Benefit Card 4 */}
              <div className="bg-[#F7F2EA] border border-[#E3D8C4] rounded-2xl p-6 relative flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#B91C1C]/10 border border-[#B91C1C]/20 flex items-center justify-center shrink-0 text-[#B91C1C]">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-[#2C1C13] mb-1">
                    Feature to 210,000+ Readers
                  </h4>
                  <p className="font-sans text-xs text-[#6B5B4C] leading-relaxed">
                    Winning pieces and author spotlights are featured across our official Instagram network with over 210K engaged literary readers.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* ABOUT INKFETISH SECTION */}
          <div className="my-16 pt-10 border-t border-[#E5DAC8]">
            <div className="bg-[#2C1C13] rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">

              {/* Top label */}
              <p className="font-sans font-bold text-[10px] tracking-[0.4em] text-[#7A6B5D] uppercase mb-6">
                A B O U T &nbsp; U S
              </p>

              {/* Main heading: INKFETISH big, Publication small */}
              <div className="mb-2">
                <h3 className="font-serif font-black text-6xl sm:text-8xl md:text-9xl text-[#FAF6F0] uppercase leading-none tracking-tight">
                  INKFETISH
                </h3>
                <p className="font-sans font-semibold text-sm sm:text-base tracking-[0.4em] text-[#B91C1C] uppercase mt-1">
                  P U B L I C A T I O N
                </p>
              </div>

              <p className="font-serif italic text-base sm:text-xl text-[#C9B99A] mt-5 mb-8">
                Building India's Fastest<br />Growing Writing Community
              </p>
              <div className="flex items-center justify-center gap-6 sm:gap-10 mb-10">
                {['Words.', 'Soul.', 'Legacy.'].map((word) => (
                  <span key={word} className="font-serif font-black text-xl sm:text-3xl text-[#FAF6F0]">{word}</span>
                ))}
              </div>
              <div className="h-px bg-[#4A3B2F] mb-10" />
              <p className="font-sans font-bold text-xs tracking-[0.3em] text-[#B91C1C] uppercase mb-6">
                O U R &nbsp; J O U R N E Y &nbsp; S O &nbsp; F A R
              </p>
              <p className="font-sans font-semibold text-[11px] tracking-[0.2em] text-[#9A8574] uppercase mb-4">COMPETITIONS HOSTED</p>
              <div className="space-y-2 max-w-sm mx-auto text-left mb-4">
                {[
                  ['Authorverse Summit', 'A Global Literary Conference'],
                  ['Poetry Festival', 'Celebrating the Art of Poetry'],
                  ['Shakespeare Poetry Award', 'Honoring Timeless Poetic Excellence'],
                  ['Indian Writers League', 'Uniting Writers. Inspiring Stories.'],
                  ['Bharat Writes', "Showcasing India's Writing Talent"],
                  ['September Writing Competition', 'Where Words Begin Change'],
                  ['Writers Mania', 'For the Passionate Storytellers'],
                ].map(([title, sub]) => (
                  <div key={title} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B91C1C] mt-1.5 shrink-0" />
                    <div>
                      <span className="font-serif font-bold text-sm text-[#FAF6F0] block">{title}</span>
                      <span className="font-sans text-[11px] text-[#9A8574]">{sub}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="font-serif italic text-sm text-[#7A6B5D] mb-8">And Many More...</p>
              <div className="h-px bg-[#4A3B2F] mb-8" />
              <p className="font-sans font-bold text-xs tracking-[0.3em] text-[#B91C1C] uppercase mb-6">
                O U R &nbsp; A C H I E V E M E N T S
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl mx-auto mb-8">
                {[
                  ['8+', 'Successful Competitions Hosted'],
                  ['3900+', 'Writers Joined'],
                  ['₹5,25,000+', 'Prize Money Awarded'],
                  ['60+', 'Winners Rewarded'],
                  ['Certificates', 'For Every Participant'],
                ].map(([stat, label]) => (
                  <div key={label} className="bg-[#1A100B] rounded-xl p-4 text-center">
                    <span className="font-serif font-black text-xl sm:text-2xl text-[#B91C1C] block">{stat}</span>
                    <span className="font-sans text-[10px] text-[#9A8574] uppercase font-semibold leading-tight block mt-0.5">{label}</span>
                  </div>
                ))}
              </div>
              <div className="h-px bg-[#4A3B2F] mb-8" />
              <p className="font-sans font-bold text-xs tracking-[0.3em] text-[#B91C1C] uppercase mb-4">
                C L O S I N G &nbsp; S T A T E M E N T
              </p>
              <p className="font-serif font-black text-lg sm:text-2xl text-[#FAF6F0] uppercase leading-snug">
                BUILDING OPPORTUNITIES.<br />
                CELEBRATING TALENT.<br />
                <span className="text-[#B91C1C]">EMPOWERING WRITERS ACROSS INDIA.</span>
              </p>
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
                    "Getting my poem published in an anthology with an official ISBN was a dream come true! The live Zoom ceremony made me feel like a celebrated author."
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E8DFD1] flex items-center justify-between">
                  <div>
                    <span className="font-serif font-bold text-sm text-[#2C1C13] block">Priya Sharma</span>
                    <span className="font-sans text-[10px] text-[#7A6B5D]">New Delhi · Poetry Winner</span>
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
                    "The judged review report gave me actionable feedback that improved my writing style massively. ₹249 was the best investment I've made in my writing!"
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E8DFD1] flex items-center justify-between">
                  <div>
                    <span className="font-serif font-bold text-sm text-[#2C1C13] block">Rohan Deshmukh</span>
                    <span className="font-sans text-[10px] text-[#7A6B5D]">Pune · Short Story Winner</span>
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
                    "Inkfetish is the most genuine and supportive community for writers in India. Received my printed book and national certificate right on time!"
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E8DFD1] flex items-center justify-between">
                  <div>
                    <span className="font-serif font-bold text-sm text-[#2C1C13] block">Ananya Sen</span>
                    <span className="font-sans text-[10px] text-[#7A6B5D]">Kolkata · Essay Winner</span>
                  </div>
                  <span className="text-[10px] font-sans font-bold bg-[#E8DEC9] text-[#2C1C13] px-2 py-0.5 rounded-md">
                    Anthology Author
                  </span>
                </div>
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

      </main>

      {/* STICKY BOTTOM FLOATING BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#F4EFE6]/95 backdrop-blur-md border-t border-[#E3DAC9] px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#B91C1C] animate-ping" />
          <div className="text-left">
            <span className="font-serif font-bold text-xs sm:text-sm text-[#2C1C13] block leading-tight">
              September Writing Competition
            </span>
            <span className="font-sans text-[10px] text-[#7A6B5D]">
              Result: 30th September · Entry from {currentPrice}
            </span>
          </div>
        </div>

        <Button 
          onClick={() => openRegistrationDrawer()}
          className="rounded-full bg-[#B91C1C] hover:bg-[#991515] text-white font-sans text-xs uppercase tracking-wider font-bold px-6 py-2.5 shadow-md transition-all hover:scale-105 gap-1.5"
        >
          <Send className="w-3.5 h-3.5" /> Register Now ({currentPrice})
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
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#B91C1C] flex items-center justify-center text-white font-bold shadow-xs">
                  <Feather className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-[#2C1C13] leading-tight">
                    The September Writing Competition
                  </h4>
                  <p className="font-sans text-[11px] text-[#7A6B5D] uppercase tracking-wider font-medium">
                    Inkfetish™ | 210,000+ Instagram Community
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
                  <span className="font-sans text-xs text-[#6B5B4C]">📅 Result: 30th September · 🎥 Live Zoom Ceremony</span>
                </div>
                <div className="bg-[#B91C1C] text-white px-3 py-1.5 rounded-lg text-center">
                  <span className="font-serif font-bold text-base block">{currentPrice}</span>
                  <span className="font-sans text-[9px] uppercase tracking-wider font-semibold">Entry Fee</span>
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
                          1 Entry (₹1)
                        </button>
                        <button type="button" onClick={() => setSelectedTier('2_entries')}
                          className={`py-3 px-4 rounded-xl text-xs font-bold uppercase border transition-all ${
                            selectedTier === '2_entries' ? 'bg-[#B91C1C] text-white border-[#B91C1C]' : 'bg-[#F4EFE6] text-[#4A3B2F] border-[#DCD3C3]'
                          }`}>
                          2 Entries (₹2)
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
                    <div className="grid grid-cols-2 gap-4">
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
