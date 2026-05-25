'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Feather,
  ShieldCheck,
  CheckCircle2,
  Download,
  Loader2,
  Sparkles,
  Clock,
  ArrowLeft,
  AlertCircle,
  MapPin,
  User,
  Mail,
  FileText,
  BookOpen,
  ChevronDown,
  Lock,
  Calendar,
  DollarSign
} from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

export default function HoneyAndHurtSubmitClient() {
  const router = useRouter();
  
  // Basic states
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isUnpaid, setIsUnpaid] = useState(false);
  const [countdown, setCountdown] = useState(3);
  
  // Registration data
  const [orderId, setOrderId] = useState('');
  const [registration, setRegistration] = useState<any>(null);
  
  // Submission Form states
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [genre, setGenre] = useState('');
  const [pieceTitle, setPieceTitle] = useState('');
  const [theme, setTheme] = useState('');
  const [customTheme, setCustomTheme] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const paidId = localStorage.getItem('honey_and_hurt_paid_order_id');
    const pendingId = localStorage.getItem('honey_and_hurt_pending_order_id');

    if (paidId) {
      setOrderId(paidId);
      const docRef = doc(db, 'honey_and_hurt_registrations', paidId);
      getDoc(docRef).then((snap) => {
        if (snap.exists()) {
          const data = snap.data();
          setRegistration(data);
          if (data.hasSubmitted) {
            setHasSubmitted(true);
            setSubmittedData(data.submissionDetails || null);
          }
        } else {
          // If no doc found on Firestore despite localstorage, trigger redirect
          triggerUnpaidRedirect();
        }
        setLoading(false);
      }).catch((err) => {
        console.error("Error retrieving registration details:", err);
        setLoading(false);
      });
    } else if (pendingId) {
      // Pending order found - try auto-verifying with Cashfree
      setLoading(true);
      fetch(`/api/honey-and-hurt/verify-order?order_id=${pendingId}`)
        .then((res) => res.json())
        .then(async (verifyData) => {
          if (verifyData.order_status === 'PAID') {
            const docRef = doc(db, 'honey_and_hurt_registrations', pendingId);
            await updateDoc(docRef, { status: 'PAID' });
            localStorage.setItem('honey_and_hurt_paid_order_id', pendingId);
            localStorage.removeItem('honey_and_hurt_pending_order_id');
            setOrderId(pendingId);
            const snap = await getDoc(docRef);
            if (snap.exists()) {
              const data = snap.data();
              setRegistration(data);
              if (data.hasSubmitted) {
                setHasSubmitted(true);
                setSubmittedData(data.submissionDetails || null);
              }
            }
            toast.success("Payment verified successfully!");
            setLoading(false);
          } else {
            triggerUnpaidRedirect();
          }
        })
        .catch(() => {
          triggerUnpaidRedirect();
        });
    } else {
      triggerUnpaidRedirect();
    }
  }, []);

  const triggerUnpaidRedirect = () => {
    setIsUnpaid(true);
    setLoading(false);
    let count = 3;
    const interval = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count <= 0) {
        clearInterval(interval);
        router.push('/anthology/honey-and-hurt/register');
      }
    }, 1000);
  };

  const handleDownloadPDF = async () => {
    if (!registration) return;
    setIsDownloading(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const element = document.getElementById('receipt-pdf-template');
      if (element) {
        // Temporarily show the template for capture
        element.style.display = 'block';
        
        const opt = {
          margin:       0.3,
          filename:     `Inkfetish_Receipt_${orderId}.pdf`,
          image:        { type: 'jpeg' as any, quality: 0.98 },
          html2canvas:  { scale: 2, useCORS: true },
          jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' as any }
        };
        
        await html2pdf().from(element).set(opt).save();
        
        // Hide it again
        element.style.display = 'none';
        toast.success("Registration receipt downloaded successfully!");
      }
    } catch (e) {
      console.error("PDF generation error:", e);
      toast.error("Failed to generate receipt PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!genre || !pieceTitle.trim() || !theme || !content.trim()) {
      toast.error("Please fill in all the details for your submission.");
      return;
    }

    if (content.trim().split(/\s+/).length < 10) {
      toast.error("Your piece should be at least 10 words long.");
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionDetails = {
        genre,
        pieceTitle: pieceTitle.trim(),
        theme: theme === 'Custom' ? customTheme.trim() : theme,
        content: content.trim(),
        submittedAt: new Date().toISOString(),
      };

      // 1. Update Firestore registration document
      const docRef = doc(db, 'honey_and_hurt_registrations', orderId);
      await updateDoc(docRef, {
        hasSubmitted: true,
        submissionDetails: submissionDetails
      });

      // 2. Save in a separate submissions collection for easier extraction
      await setDoc(doc(db, 'honey_and_hurt_submissions', orderId), {
        ...submissionDetails,
        fullName: registration.fullName,
        email: registration.email,
        phone: registration.phone,
        orderId,
        boughtBookDelivery: registration.boughtBookDelivery || false,
        boughtCertificateMedal: registration.boughtCertificateMedal || false,
        address: registration.address || '',
        city: registration.city || '',
        state: registration.state || '',
        pincode: registration.pincode || '',
      });

      localStorage.setItem('honey_and_hurt_has_submitted', 'true');
      
      setHasSubmitted(true);
      setSubmittedData(submissionDetails);

      // Trigger Confetti!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });

      toast.success("Manuscript submitted successfully! Congratulations!");
    } catch (err: any) {
      console.error("Submission error:", err);
      toast.error("Submission failed: " + (err.message || "Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper count details
  const wordCount = content.trim() === '' ? 0 : content.trim().split(/\s+/).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-gold-main animate-spin" style={{ color: '#D88A06' }} />
        <p className="font-inter text-sm font-semibold tracking-wider uppercase text-slate-400">Verifying Anthology Access...</p>
      </div>
    );
  }

  if (isUnpaid) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white text-obsidian p-8 md:p-12 rounded-3xl max-w-md w-full shadow-2xl text-center space-y-6"
        >
          <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
            <AlertCircle className="w-10 h-10" />
          </div>
          <h2 className="font-cinzel text-2xl font-black uppercase text-obsidian tracking-tight">Access Restricted</h2>
          <p className="font-inter text-sm font-semibold text-slate-500 leading-relaxed">
            You have not joined the anthology or your payment has not been verified yet.
          </p>
          <div className="bg-red-50 border-2 border-red-200 p-4 rounded-2xl">
            <p className="font-inter text-xs font-black text-red-600 uppercase tracking-widest">
              Redirecting you to registration in
            </p>
            <p className="font-cinzel text-5xl font-black text-red-600 mt-2">{countdown}...</p>
          </div>
          <p className="font-inter text-[10px] text-slate-400 italic">
            Secure your co-author slot before all 12 positions are occupied.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-inter pb-20 relative overflow-x-hidden selection:bg-amber-500/20 selection:text-amber-200">
      
      {/* Visual background lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-main/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-900/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Dynamic Header */}
      <header className="p-6 md:p-8 flex items-center justify-between container mx-auto max-w-6xl relative z-10 gap-4">
        <button
          onClick={() => router.push('/anthology/honey-and-hurt')}
          className="flex items-center gap-1.5 font-inter font-bold text-xs uppercase text-slate-400 hover:text-white transition-colors border border-white/10 px-3.5 py-2 rounded-full bg-white/5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Landing
        </button>
        <div 
          className="font-cinzel text-sm sm:text-base md:text-xl font-black uppercase tracking-widest cursor-pointer text-center" 
          onClick={() => router.push('/')}
          style={{
            background: 'linear-gradient(135deg, #8f4d00 0%, #d88a06 25%, #ffcf6b 50%, #d88a06 75%, #8f4d00 100%)',
            backgroundSize: '400% 400%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Inkfetish Publications
        </div>
        <div className="hidden sm:flex items-center gap-1.5 font-inter text-[10px] font-black uppercase text-emerald-400 bg-white/5 border border-white/10 px-4 py-2 rounded-full shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5" /> Co-Author Secured
        </div>
      </header>

      <main className="container mx-auto px-5 max-w-4xl relative z-10 mt-6">
        
        {/* Verification Success Box */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md mb-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verifiable Co-Author Slot
              </div>
              <h1 className="font-cinzel text-xl md:text-2xl font-black uppercase tracking-wide text-white pt-1">
                Thank you for joining Honey & Hurt!
              </h1>
            </div>
            
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="flex items-center gap-2 font-inter font-black text-xs uppercase bg-[#D88A06] hover:bg-amber-600 text-obsidian px-5 py-3 rounded-xl shadow-md transition-all shrink-0 disabled:opacity-50"
            >
              {isDownloading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              {isDownloading ? 'Generating...' : 'Download Receipt (PDF)'}
            </button>
          </div>

          {/* Quick Registration Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-inter pt-2">
            <div>
              <p className="text-slate-500 font-bold uppercase tracking-wider mb-1">Registration ID</p>
              <p className="text-white font-black font-mono bg-white/5 py-1.5 px-2.5 rounded-lg border border-white/5 w-fit">{orderId}</p>
            </div>
            <div>
              <p className="text-slate-500 font-bold uppercase tracking-wider mb-1">Registered Name</p>
              <p className="text-white font-bold py-1">{registration?.fullName}</p>
            </div>
            <div>
              <p className="text-slate-500 font-bold uppercase tracking-wider mb-1">WhatsApp Number</p>
              <p className="text-white font-bold py-1">🇮🇳 +91 {registration?.phone}</p>
            </div>
            <div>
              <p className="text-slate-500 font-bold uppercase tracking-wider mb-1">Co-Author Status</p>
              <span className="inline-block mt-0.5 px-2.5 py-1 bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 rounded-md font-black uppercase text-[9px] tracking-wider shadow-sm">
                Paid & Secured
              </span>
            </div>
          </div>

          {/* Package Inclusions Preview */}
          <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-4.5 text-xs text-slate-300 space-y-2">
            <p className="font-black uppercase tracking-wider text-[10px] text-[#D88A06] mb-1">Secured Package Inclusions:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] font-semibold">
              <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Verifiable ISBN publishing credit</p>
              <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Elite editorial review & formatting</p>
              <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Professional Author Portfolio Website</p>
              <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Global Amazon & Kindle distribution</p>
              {registration?.boughtBookDelivery && (
                <p className="flex items-center gap-2 text-amber-400"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Physical book delivery upgraded</p>
              )}
              {registration?.boughtCertificateMedal && (
                <p className="flex items-center gap-2 text-amber-400"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Certificate & medal pack upgraded</p>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic State Layout (Already Submitted View vs Submission Form) */}
        <AnimatePresence mode="wait">
          {hasSubmitted ? (
            <motion.div
              key="submitted-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white text-obsidian p-6 md:p-10 rounded-3xl shadow-2xl relative space-y-6"
            >
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h2 className="font-cinzel text-xl md:text-2xl font-black uppercase text-obsidian tracking-tight">Manuscript Submitted!</h2>
                <p className="font-inter text-xs font-semibold text-slate-500">
                  Congratulations! Your co-author manuscript has been successfully logged in our records.
                </p>
              </div>

              {/* Submitted Data Recap */}
              <div className="border-t border-b border-slate-200 py-6 space-y-4 font-inter text-sm">
                <h3 className="font-cinzel text-xs font-black uppercase tracking-widest text-[#D88A06] mb-2 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#D88A06]" /> Your Submitted Content
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 font-bold uppercase tracking-wider block mb-0.5">Piece Title</span>
                    <span className="text-obsidian font-extrabold text-sm font-cinzel">"{submittedData?.pieceTitle}"</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold uppercase tracking-wider block mb-0.5">Writing Genre</span>
                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-800 rounded-lg font-bold text-xs uppercase mt-0.5">
                      {submittedData?.genre}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold uppercase tracking-wider block mb-0.5">Chosen Theme</span>
                    <span className="text-obsidian font-bold text-xs">{submittedData?.theme}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold uppercase tracking-wider block mb-0.5">Submission Date</span>
                    <span className="text-obsidian font-bold text-xs font-mono">
                      {submittedData?.submittedAt ? new Date(submittedData.submittedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : 'Verified'}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-slate-500 font-bold uppercase tracking-wider block mb-2">Manuscript Preview</span>
                  <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 font-serif text-sm leading-relaxed italic text-slate-800 whitespace-pre-wrap max-h-60 overflow-y-auto">
                    {submittedData?.content}
                  </div>
                </div>
              </div>

              {/* What happens next message */}
              <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 flex items-start gap-4">
                <Lock className="w-6 h-6 text-[#D88A06] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-cinzel text-xs font-black uppercase text-obsidian tracking-wider">🔒 Manuscript Locked in Queue</p>
                  <p className="font-inter text-xs text-slate-600 leading-relaxed font-semibold">
                    Your piece has been securely lined up in our editorial queue. Our editor, **Sherin**, will personally reach out to you via WhatsApp (+91 92166 81908) within **3-5 business days** to review typesetting, page margins, and share the official layout draft. No further steps are needed.
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="submission-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white text-obsidian p-6 md:p-10 rounded-3xl shadow-2xl relative"
            >
              <div className="space-y-1.5 text-center mb-6">
                <h3 className="font-cinzel text-2xl font-black uppercase text-obsidian tracking-tight">Manuscript Submission</h3>
                <p className="font-inter text-xs font-semibold text-slate-500">
                  Pour your heart out. Submit your verifiable co-author writing piece below.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Genre of Writing */}
                  <div className="space-y-1.5">
                    <label htmlFor="genre" className="font-inter text-[10px] font-black uppercase text-slate-500 ml-1 tracking-widest">
                      Writing Genre *
                    </label>
                    <div className="relative">
                      <select
                        id="genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                        className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3 pl-4 pr-10 font-inter text-xs focus:border-gold-main focus:bg-white outline-none transition-all text-obsidian font-bold appearance-none cursor-pointer"
                      >
                        <option value="">Select Genre</option>
                        <option value="Poetry">Poetry</option>
                        <option value="Prose">Prose & Stories</option>
                        <option value="Microfiction">Microfiction & Quotes</option>
                        <option value="Other">Other</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Chosen Theme */}
                  <div className="space-y-1.5">
                    <label htmlFor="theme" className="font-inter text-[10px] font-black uppercase text-slate-500 ml-1 tracking-widest">
                      Anthology Theme *
                    </label>
                    <div className="relative">
                      <select
                        id="theme"
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        required
                        className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3 pl-4 pr-10 font-inter text-xs focus:border-gold-main focus:bg-white outline-none transition-all text-obsidian font-bold appearance-none cursor-pointer"
                      >
                        <option value="">Select Theme</option>
                        <option value="Love">Love & Longing</option>
                        <option value="Heartbreak">Heartbreak & Grief</option>
                        <option value="Healing">Healing & Growth</option>
                        <option value="Secrets & Shadows">Secrets & Shadows</option>
                        <option value="Custom">Custom Theme</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Custom Theme (Conditional) */}
                <AnimatePresence>
                  {theme === 'Custom' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-1.5 overflow-hidden"
                    >
                      <label htmlFor="customTheme" className="font-inter text-[10px] font-black uppercase text-slate-500 ml-1 tracking-widest">
                        Define Custom Theme *
                      </label>
                      <input
                        id="customTheme"
                        type="text"
                        value={customTheme}
                        onChange={(e) => setCustomTheme(e.target.value)}
                        required
                        className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3 px-4 font-inter text-xs focus:border-gold-main focus:bg-white outline-none transition-all text-obsidian font-bold"
                        placeholder="e.g. Melancholic Nostalgia"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Piece Title */}
                <div className="space-y-1.5">
                  <label htmlFor="pieceTitle" className="font-inter text-[10px] font-black uppercase text-slate-500 ml-1 tracking-widest">
                    Title of Your Piece *
                  </label>
                  <input
                    id="pieceTitle"
                    type="text"
                    value={pieceTitle}
                    onChange={(e) => setPieceTitle(e.target.value)}
                    required
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3 px-4 font-inter text-xs focus:border-gold-main focus:bg-white outline-none transition-all text-obsidian font-bold"
                    placeholder="Enter the official title..."
                  />
                </div>

                {/* Main Content */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center ml-1">
                    <label htmlFor="content" className="font-inter text-[10px] font-black uppercase text-slate-500 tracking-widest">
                      Your Writing Piece (Manuscript) *
                    </label>
                    <span className="font-inter text-[9px] font-extrabold text-slate-400 bg-slate-100 py-0.5 px-2 rounded-md">
                      {wordCount} Words
                    </span>
                  </div>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={12}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl py-3 px-4 font-serif text-sm focus:border-gold-main focus:bg-white outline-none transition-all text-obsidian font-bold leading-relaxed resize-none"
                    placeholder="Pour your soul here... Double check punctuation, line breaks, and spelling. What you submit is exactly what gets printed."
                  />
                  <div className="flex justify-between items-center font-inter text-[9px] font-bold text-slate-400 ml-1">
                    <span>⚠️ Double check line breaks and spacing before hitting submit</span>
                    <span>Min: 10 words</span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#D88A06] hover:bg-amber-600 text-obsidian py-4 text-base font-black uppercase tracking-wider rounded-2xl shadow-lg mt-4 flex items-center justify-center gap-2.5 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Uploading Manuscript...
                    </>
                  ) : (
                    <>
                      <Feather className="w-5 h-5 shrink-0" />
                      Submit Final Manuscript
                    </>
                  )}
                </button>

                <p className="text-center font-inter text-[10px] font-bold text-slate-400 tracking-wider uppercase pt-2">
                  🔒 By submitting, you grant publishing rights for this volume only. You retain 100% intellectual copyrights.
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ======================================================== */}
      {/* HIDDEN GORGEOUS PDF RECEIPT TEMPLATE (FOR HTML2PDF INJECTION) */}
      {/* ======================================================== */}
      <div 
        id="receipt-pdf-template" 
        style={{
          display: 'none',
          fontFamily: 'Georgia, serif',
          padding: '40px',
          color: '#1a1a1a',
          backgroundColor: '#ffffff',
          border: '15px double #D88A06',
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img 
            src="https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1777556045/iflogo_y3ss8e.png" 
            alt="Inkfetish Logo" 
            style={{ width: '70px', height: '70px', borderRadius: '50%', marginBottom: '10px', border: '1px solid #D88A06' }}
          />
          <h1 style={{ fontSize: '26px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', color: '#030303', margin: '0 0 5px 0' }}>
            Inkfetish Publications
          </h1>
          <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '3px', color: '#D88A06', fontWeight: 'bold', margin: '0' }}>
            Official Co-Author Registration Certificate
          </p>
        </div>

        <div style={{ borderTop: '2px solid #eaeaea', borderBottom: '2px solid #eaeaea', padding: '15px 0', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
          <div>
            <p style={{ margin: '0 0 5px 0' }}><strong>Registration ID:</strong> <span style={{ fontFamily: 'monospace' }}>{orderId}</span></p>
            <p style={{ margin: '0 0 5px 0' }}><strong>Anthology Title:</strong> Honey & Hurt Volume I</p>
            <p style={{ margin: '0' }}><strong>Status:</strong> <span style={{ color: '#10b981', fontWeight: 'bold' }}>PAID & SECURED</span></p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: '0 0 5px 0' }}><strong>Date:</strong> {registration?.createdAt ? new Date(registration.createdAt).toLocaleDateString('en-IN') : new Date().toLocaleDateString('en-IN')}</p>
            <p style={{ margin: '0 0 5px 0' }}><strong>Gateway:</strong> Cashfree Secure Network</p>
            <p style={{ margin: '0' }}><strong>ISBN Allocation:</strong> Verifiable Reserved</p>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #eaeaea', paddingBottom: '5px', margin: '0 0 15px 0', color: '#D88A06' }}>
            Co-Author Details
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <tbody>
              <tr>
                <td style={{ padding: '8px 0', color: '#666666', width: '35%' }}>Full Legal Name</td>
                <td style={{ padding: '8px 0', fontWeight: 'bold' }}>{registration?.fullName}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 0', color: '#666666' }}>Email Address</td>
                <td style={{ padding: '8px 0', fontWeight: 'bold' }}>{registration?.email}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 0', color: '#666666' }}>WhatsApp Contact</td>
                <td style={{ padding: '8px 0', fontWeight: 'bold' }}>+91 {registration?.phone}</td>
              </tr>
              {registration?.writingType && (
                <tr>
                  <td style={{ padding: '8px 0', color: '#666666' }}>Preferred Writing Style</td>
                  <td style={{ padding: '8px 0', fontWeight: 'bold' }}>{registration?.writingType}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #eaeaea', paddingBottom: '5px', margin: '0 0 15px 0', color: '#D88A06' }}>
            Order Allocation & Upgrades
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #eaeaea' }}>
                <th style={{ textAlign: 'left', padding: '8px 0', color: '#666666' }}>Description</th>
                <th style={{ textAlign: 'right', padding: '8px 0', color: '#666666' }}>Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px 0' }}>
                  <strong>Base Co-Author Publishing Slot</strong>
                  <div style={{ fontSize: '10px', color: '#666666', marginTop: '2px' }}>Includes ISBN listing, editorial layout, and global Amazon distribution.</div>
                </td>
                <td style={{ textAlign: 'right', fontWeight: 'bold' }}>₹485.00</td>
              </tr>
              {registration?.boughtBookDelivery && (
                <tr>
                  <td style={{ padding: '10px 0' }}>
                    <strong>Physical Book Delivery Upgrade</strong>
                    <div style={{ fontSize: '10px', color: '#666666', marginTop: '2px' }}>High-quality printed paperback volume shipped to your address.</div>
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 'bold' }}>+₹150.00</td>
                </tr>
              )}
              {registration?.boughtCertificateMedal && (
                <tr>
                  <td style={{ padding: '10px 0' }}>
                    <strong>Certificate & Medal Gilded Pack Upgrade</strong>
                    <div style={{ fontSize: '10px', color: '#666666', marginTop: '2px' }}>Engraved metal co-author medal and laminated physical certificate.</div>
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 'bold' }}>+₹150.00</td>
                </tr>
              )}
              <tr style={{ borderTop: '2px solid #1a1a1a', borderBottom: '2px solid #1a1a1a' }}>
                <td style={{ padding: '12px 0', fontWeight: 'bold', fontSize: '13px' }}>Total Amount Paid</td>
                <td style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '14px', color: '#D88A06' }}>
                  ₹{registration?.amount || 485}.00
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Shipping Address Recap inside PDF */}
        {(registration?.boughtBookDelivery || registration?.boughtCertificateMedal) && (
          <div style={{ marginBottom: '35px', backgroundColor: '#fafafa', border: '1px solid #eaeaea', padding: '15px', borderRadius: '8px' }}>
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#333333', margin: '0 0 10px 0' }}>
              📍 Courier Shipping Details
            </h4>
            <p style={{ fontSize: '11px', lineHeight: '1.6', margin: '0', color: '#444444' }}>
              <strong>Full Address:</strong> {registration?.address}<br />
              <strong>City & State:</strong> {registration?.city}, {registration?.state}<br />
              <strong>Pincode:</strong> {registration?.pincode}<br />
              <strong>Shipping Type:</strong> Pan-India Courier Network (Free Delivery)
            </p>
          </div>
        )}

        {/* Closing Signature Seal */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '50px', fontSize: '11px' }}>
          <div>
            <p style={{ margin: '0 0 5px 0', color: '#888888', textTransform: 'uppercase', letterSpacing: '1px' }}>🔒 Security Authentication</p>
            <p style={{ margin: '0', color: '#666666' }}>256-Bit SSL Encrypted Record</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'Zapf Chancery, cursive', fontSize: '18px', color: '#D88A06', fontWeight: 'bold', fontStyle: 'italic', marginBottom: '2px' }}>
              Sherin
            </div>
            <p style={{ borderTop: '1px solid #eaeaea', paddingTop: '5px', margin: '0', fontWeight: 'bold' }}>
              Sherin
            </p>
            <p style={{ margin: '2px 0 0 0', color: '#666666', fontSize: '10px' }}>Owner & Director, Inkfetish</p>
          </div>
        </div>
      </div>
    </div>
  );
}
