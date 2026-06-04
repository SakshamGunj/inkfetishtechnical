'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  ShieldAlert,
  Copy,
  Check,
  Award,
  BookOpen,
  Calendar,
  Sparkles,
  ExternalLink,
  Printer,
  Share2,
  FileCheck,
  Feather
} from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { CertificateData } from '@/lib/certificate';

interface CertificateVerificationClientProps {
  id: string;
  initialData: CertificateData | null;
}

export default function CertificateVerificationClient({
  id,
  initialData,
}: CertificateVerificationClientProps) {
  const [verifying, setVerifying] = useState(true);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  // Run initial simulation of scanning the ledger/database
  useEffect(() => {
    const timer = setTimeout(() => {
      setVerifying(false);
      if (initialData) {
        // Trigger a premium gold/green confetti celebration on successful verification!
        const duration = 2.5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          // Gold & green sparks
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#c5a059', '#d4a843', '#10B981', '#ffffff']
          });
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#c5a059', '#d4a843', '#10B981', '#ffffff']
          });
        }, 250);
      }
    }, 1800);

    return () => clearTimeout(timer);
  }, [initialData]);

  // Handle Copy ID
  const handleCopyId = () => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle Share Link
  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  // Handle Print Page
  const handlePrint = () => {
    window.print();
  };

  // Format Date Nicely
  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'May 2026';
    try {
      const date = new Date(dateStr.replace(' ', 'T'));
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#fdfbf7] font-sans selection:bg-gold selection:text-black overflow-x-hidden relative flex flex-col justify-between print:bg-white print:text-black">
      {/* ── Background decoration ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d0118] via-[#050505] to-[#080012] pointer-events-none print:hidden" />
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none print:hidden" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-gold/[0.02] blur-[130px] rounded-full pointer-events-none print:hidden" />

      {/* ── Header ── */}
      <header className="relative z-10 w-full border-b border-white/5 bg-[#0a0a0a]/40 backdrop-blur-md py-4 px-6 print:hidden">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-serif font-black tracking-[0.2em] text-sm uppercase text-[#fdfbf7] group-hover:text-gold transition-colors">
              Inkfetish
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-gold border border-gold/30 px-2 py-0.5 rounded-sm">
              PUBLICATIONS
            </span>
          </Link>
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#555]">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>SECURE VERIFICATION PORTAL</span>
          </div>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="relative z-10 flex-grow flex items-center justify-center p-6 my-8 print:p-0 print:my-0">
        <div className="max-w-2xl w-full">
          <AnimatePresence mode="wait">
            {verifying ? (
              /* ── Verification Loader ── */
              <motion.div
                key="loader"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-[#0a0a0a]/80 border border-white/10 p-12 text-center rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-md flex flex-col items-center justify-center min-h-[400px]"
              >
                <div className="relative w-20 h-20 mb-8">
                  {/* Outer spinning ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-t-gold border-r-transparent border-b-transparent border-l-transparent"
                  />
                  {/* Secondary pulsing ring */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-2 rounded-full border border-purple-500/20"
                  />
                  {/* Central icon */}
                  <div className="absolute inset-4 flex items-center justify-center bg-[#150a25] rounded-full">
                    <FileCheck className="w-6 h-6 text-gold animate-pulse" />
                  </div>
                </div>
                <h2 className="text-xl font-serif font-black uppercase tracking-wider mb-2">
                  Scanning Credentials...
                </h2>
                <p className="text-xs text-[#666] uppercase tracking-[0.3em] font-sans font-semibold animate-pulse">
                  Querying Inkfetish Secure Ledger
                </p>
              </motion.div>
            ) : !initialData ? (
              /* ── Not Found / Unverified State ── */
              <motion.div
                key="unverified"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#0a0a0a]/80 border border-red-950/40 p-12 text-center rounded-sm shadow-[0_0_50px_rgba(239,68,68,0.05)] backdrop-blur-md flex flex-col items-center justify-center min-h-[450px]"
              >
                <div className="w-16 h-16 bg-red-950/20 border border-red-500/30 rounded-full flex items-center justify-center mb-8 text-red-500">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-serif font-black uppercase tracking-tight text-red-500 mb-4">
                  Verification Failed
                </h1>
                <p className="text-sm text-[#aaa] font-light max-w-md mx-auto leading-relaxed mb-8">
                  The Certificate ID <strong className="text-white font-semibold font-mono">{id}</strong> could not be verified by our database. This record may be invalid, modified, or revoked.
                </p>
                <div className="bg-red-950/10 border-l-4 border-red-500/50 p-5 text-left text-xs text-[#888] font-sans max-w-md leading-relaxed mb-8">
                  Please verify the certificate URL or contact the Inkfetish Publications support team to validate physical registrations manually.
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <Link href="/poetry-festival-s2" className="px-6 py-3 border border-white/10 hover:border-white/20 text-xs uppercase tracking-widest font-bold transition-all rounded-sm">
                    Back to Poetry Festival
                  </Link>
                  <a href="mailto:support@inkfetish.in" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs uppercase tracking-widest font-black transition-all rounded-sm">
                    Contact Support
                  </a>
                </div>
              </motion.div>
            ) : (
              /* ── Verified Certificate Card ── */
              <motion.div
                key="verified"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative bg-[#0a0a0a]/90 border-2 border-gold/30 p-5 xs:p-6 sm:p-12 rounded-sm shadow-[0_0_60px_rgba(197,160,89,0.1)] backdrop-blur-md print:border-none print:shadow-none print:bg-white print:p-0"
              >
                {/* Decorative gold corner accents */}
                <div className="absolute top-3 left-3 w-8 h-8 border-t border-l border-gold/40 pointer-events-none print:hidden" />
                <div className="absolute top-3 right-3 w-8 h-8 border-t border-r border-gold/40 pointer-events-none print:hidden" />
                <div className="absolute bottom-3 left-3 w-8 h-8 border-b border-l border-gold/40 pointer-events-none print:hidden" />
                <div className="absolute bottom-3 right-3 w-8 h-8 border-b border-r border-gold/40 pointer-events-none print:hidden" />

                {/* Badge Overlay */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 border border-green-400/50 px-4 py-1.5 shadow-[0_4px_15px_rgba(16,185,129,0.3)] flex items-center gap-1.5 rounded-full print:hidden">
                  <ShieldCheck className="w-3.5 h-3.5 text-white" />
                  <span className="text-[10px] font-sans font-black uppercase tracking-widest text-white">
                    OFFICIALLY VERIFIED
                  </span>
                </div>

                {/* Verification Title */}
                <div className="text-center mt-4 mb-8">
                  <span className="text-[9px] uppercase tracking-[0.4em] font-sans font-black text-gold/80 block mb-2">
                    Inkfetish Publications Verification Statement
                  </span>
                  <h1 className="text-2xl sm:text-4xl font-serif font-black uppercase tracking-tight text-[#fdfbf7] print:text-black">
                    Poetry Festival Season 2
                  </h1>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent my-6" />

                {/* Recipient Box */}
                <div className="text-center my-8">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-[#666] block mb-3">
                    THIS CERTIFICATE IS OFFICIALLY REGISTERED TO
                  </span>
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#e6c887] to-gold italic py-2 print:text-black print:bg-none break-words"
                  >
                    {initialData.name}
                  </motion.h2>
                  <p className="text-xs sm:text-sm text-[#ccc] font-sans font-light max-w-md mx-auto leading-relaxed mt-4 print:text-black px-2">
                    Who has successfully participated in India's premier poetry contest, performing and presenting their outstanding, beautiful poetry that captivated the festival and showcased true literary excellence.
                  </p>
                </div>

                {/* Metadata Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 bg-black/40 border border-white/5 p-4 sm:p-6 rounded-sm print:bg-white print:border-black/10 print:text-black">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#555] block mb-1">
                      Certificate ID
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-sm font-bold text-[#fdfbf7] print:text-black">
                        {initialData.certificateId}
                      </span>
                      <button
                        onClick={handleCopyId}
                        className="text-[#666] hover:text-gold transition-colors p-1 print:hidden"
                        title="Copy Certificate ID"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#555] block mb-1">
                      Verification Status
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-xs uppercase tracking-wider font-bold text-green-500">
                        Active & Verified
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#555] block mb-1">
                      Issue Date
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-[#ccc] print:text-black font-medium">
                      <Calendar className="w-3.5 h-3.5 text-gold/60" />
                      <span>4th June 2026</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#555] block mb-1">
                      Reference Ledger
                    </span>
                    <span className="text-xs font-mono text-[#aaa] print:text-black">
                      Ref: {initialData.referenceId}
                    </span>
                  </div>
                </div>

                {/* Trust Badges Strip */}
                <div className="grid grid-cols-3 gap-2 mt-8 text-center border-t border-white/5 pt-8 print:border-black/10">
                  <div className="flex flex-col items-center p-2">
                    <Award className="w-5 h-5 text-gold mb-2" />
                    <span className="text-[8px] uppercase tracking-widest text-[#fdfbf7] font-bold block mb-1 print:text-black">
                      Season 2 Honor
                    </span>
                    <span className="text-[8px] text-[#666] leading-snug">
                      Official Laureate
                    </span>
                  </div>

                  <div className="flex flex-col items-center p-2 border-x border-white/5 print:border-black/10">
                    <Feather className="w-5 h-5 text-purple-400 mb-2" />
                    <span className="text-[8px] uppercase tracking-widest text-[#fdfbf7] font-bold block mb-1 print:text-black">
                      Exquisite Verse
                    </span>
                    <span className="text-[8px] text-[#666] leading-snug">
                      Presented Poetry
                    </span>
                  </div>

                  <div className="flex flex-col items-center p-2">
                    <Sparkles className="w-5 h-5 text-gold mb-2" />
                    <span className="text-[8px] uppercase tracking-widest text-[#fdfbf7] font-bold block mb-1 print:text-black">
                      Authenticated
                    </span>
                    <span className="text-[8px] text-[#666] leading-snug">
                      Inkfetish Pubs
                    </span>
                  </div>
                </div>

                {/* Bottom trust statement */}
                <div className="mt-8 text-center text-[10px] text-[#555] leading-relaxed">
                  This public verification statement is generated programmatically on behalf of Inkfetish Publications. If you require physical copies of verification records, contact support.
                </div>

                {/* Interactive Sharing Actions */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-10 border-t border-white/5 pt-8 print:hidden">
                  <button
                    onClick={handleShare}
                    className="flex-1 sm:flex-initial px-4 py-3 border border-white/10 hover:border-gold/30 hover:text-gold text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 rounded-sm"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    {shared ? 'Copied Link!' : 'Share Verification'}
                  </button>

                  <button
                    onClick={handlePrint}
                    className="flex-1 sm:flex-initial px-4 py-3 border border-white/10 hover:border-gold/30 hover:text-gold text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 rounded-sm"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Print Statement
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 w-full border-t border-white/5 py-6 px-6 text-center text-[10px] text-[#444] uppercase tracking-widest print:hidden">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>
            © {new Date().getFullYear()} Inkfetish Publications. All Rights Reserved.
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Secure SSL Ledger Verification
          </span>
        </div>
      </footer>
    </div>
  );
}
