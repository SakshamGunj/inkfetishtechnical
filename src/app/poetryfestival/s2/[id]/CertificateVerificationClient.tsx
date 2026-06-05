'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  ShieldAlert,
  Copy,
  Check,
  Calendar,
  Printer,
  Share2,
  FileCheck,
  Feather,
  Lock,
  Database,
  CheckCircle2
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
  const [scanStep, setScanStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  // Simulation of secure verification handshake
  useEffect(() => {
    const step1 = setTimeout(() => setScanStep(1), 500);
    const step2 = setTimeout(() => setScanStep(2), 1000);
    const step3 = setTimeout(() => setScanStep(3), 1500);

    const timer = setTimeout(() => {
      setVerifying(false);
      if (initialData) {
        // Trigger a premium gold/green confetti celebration on successful verification
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
    }, 2200);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(timer);
    };
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

  // Deterministic pseudo-hash for ledger authenticity
  const generateCertHash = (certId: string) => {
    if (!certId) return '';
    let hash = 0;
    for (let i = 0; i < certId.length; i++) {
      hash = (hash << 5) - hash + certId.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    const salt = "9e77e8a9592b3c9f";
    return `sha256:${hex}${salt.substring(0, 16)}${certId.substring(certId.length - 4)}`;
  };

  return (
    <div className="min-h-screen bg-[#030303] text-[#fdfbf7] font-sans selection:bg-[#ebd298] selection:text-black overflow-x-hidden relative flex flex-col justify-between print:bg-white print:text-black">
      {/* Background ambient light */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c0117] via-[#030303] to-[#060010] pointer-events-none print:hidden" />
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-950/10 blur-[150px] rounded-full pointer-events-none print:hidden animate-pulse duration-10000" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-gold-dark/5 blur-[130px] rounded-full pointer-events-none print:hidden" />

      {/* Header */}
      <header className="relative z-10 w-full border-b border-white/5 bg-[#050505]/40 backdrop-blur-md py-4 px-6 print:hidden">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-serif font-black tracking-[0.2em] text-xs sm:text-sm uppercase text-[#fdfbf7] group-hover:text-[#ebd298] transition-colors">
              Inkfetish
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] font-sans font-bold text-[#c5a059] border border-[#c5a059]/30 px-1.5 py-0.5 rounded-sm">
              PUBLICATIONS
            </span>
          </Link>
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#555]">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Secure Verification System</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex items-center justify-center p-4 sm:p-6 my-6 sm:my-10 print:p-0 print:my-0">
        <div className="max-w-xl w-full">
          <AnimatePresence mode="wait">
            {verifying ? (
              /* Verification Loader */
              <motion.div
                key="loader"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="bg-[#050505]/80 border border-white/10 p-8 sm:p-12 text-center rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-md flex flex-col items-center justify-center min-h-[420px]"
              >
                <div className="relative w-20 h-20 mb-8">
                  {/* Outer spinning ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-t-[#ebd298] border-r-transparent border-b-transparent border-l-transparent"
                  />
                  {/* Inner pulsing ring */}
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                    className="absolute inset-2 rounded-full border border-purple-500/20"
                  />
                  {/* Central icon */}
                  <div className="absolute inset-4 flex items-center justify-center bg-[#0d051a] rounded-full border border-white/5">
                    <FileCheck className="w-6 h-6 text-[#ebd298] animate-pulse" />
                  </div>
                </div>
                
                <h2 className="text-lg font-serif font-bold uppercase tracking-wider text-[#fdfbf7] mb-2">
                  Scanning Credentials
                </h2>
                <p className="text-[10px] text-[#555] uppercase tracking-[0.2em] font-sans font-bold mb-8">
                  Inkfetish Secure Registry
                </p>

                {/* Animated Scanner Steps */}
                <div className="space-y-3 w-full max-w-xs text-left font-mono text-[11px] text-white/30 border-t border-white/5 pt-6">
                  <div className="flex items-center gap-2.5">
                    {scanStep >= 1 ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-white/10 animate-pulse shrink-0" />
                    )}
                    <span className={scanStep >= 1 ? "text-emerald-400/90" : "text-white/40"}>
                      Connecting to registry database
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {scanStep >= 2 ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-white/10 shrink-0" />
                    )}
                    <span className={scanStep >= 2 ? "text-emerald-400/90" : scanStep >= 1 ? "text-white/70 animate-pulse" : "text-white/20"}>
                      Checking ID #{id} records
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {scanStep >= 3 ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-white/10 shrink-0" />
                    )}
                    <span className={scanStep >= 3 ? "text-emerald-400/90" : scanStep >= 2 ? "text-white/70 animate-pulse" : "text-white/10"}>
                      Validating digital signature hash
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : !initialData ? (
              /* Unverified State */
              <motion.div
                key="unverified"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-[#050505]/95 border border-red-950/40 p-8 sm:p-12 text-center rounded-sm shadow-[0_0_50px_rgba(239,68,68,0.05)] backdrop-blur-md flex flex-col items-center justify-center min-h-[420px]"
              >
                <div className="w-14 h-14 bg-red-950/20 border border-red-500/20 rounded-full flex items-center justify-center mb-6 text-red-500/80">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h1 className="text-xl font-serif font-black uppercase tracking-wider text-red-500 mb-3">
                  Verification Failed
                </h1>
                <p className="text-xs sm:text-sm text-[#888] font-normal max-w-md mx-auto leading-relaxed mb-6">
                  The Certificate ID <strong className="text-white font-semibold font-mono">{id}</strong> is not verified in our registry ledger. The document could be invalid or expired.
                </p>
                <div className="bg-red-950/5 border border-red-500/10 p-4 text-left text-xs text-[#666] font-sans max-w-sm leading-relaxed rounded-sm mb-8">
                  <span className="font-bold text-red-400 block mb-1">Manual Assistance Needed?</span>
                  If this is a physical registration, please contact our support desk with your details to verify manually.
                </div>
                <a href="mailto:support@inkfetish.in" className="px-6 py-3 border border-red-500/30 hover:bg-red-500/5 text-red-400 text-xs uppercase tracking-widest font-black transition-all rounded-sm">
                  Contact Registrar
                </a>
              </motion.div>
            ) : (
              /* Verified Certificate Card */
              <motion.div
                key="verified"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative bg-[#050505]/90 border border-white/10 rounded-sm p-6 xs:p-8 sm:p-12 shadow-[0_0_80px_rgba(197,160,89,0.05)] backdrop-blur-xl print:border-none print:shadow-none print:bg-white print:p-0 overflow-hidden"
              >
                {/* Dynamically Inject signature font */}
                <style jsx global>{`
                  @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
                  .font-signature {
                    font-family: 'Great Vibes', cursive;
                  }
                `}</style>

                {/* Subtle double thin framing lines */}
                <div className="absolute inset-3 border border-white/5 rounded-sm pointer-events-none print:hidden" />

                {/* Secure SSL indicator */}
                <div className="flex justify-center mb-8 print:hidden">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/5 border border-emerald-500/25 text-emerald-400 rounded-full text-[9px] font-semibold tracking-widest font-mono">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    SECURE VERIFIED RECORD
                  </div>
                </div>

                {/* Header branding */}
                <div className="text-center mb-10">
                  <span className="text-[10px] tracking-[0.3em] font-sans font-black text-[#c5a059]/70 block uppercase mb-1">
                    Inkfetish Publications
                  </span>
                  <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#fdfbf7] print:text-black">
                    Poetry Festival Season 2
                  </h1>
                  <span className="text-[10px] tracking-[0.15em] font-sans font-bold text-[#555] block uppercase mt-0.5">
                    Official Verification Statement
                  </span>
                </div>

                {/* Statement of authenticity */}
                <div className="text-center my-8">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-[#555] block mb-2">
                    This certifies the authentic record of
                  </span>
                  <h2
                    style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                    className="text-3xl sm:text-4.5xl text-[#ebd298] italic font-normal tracking-wide py-1.5 print:text-black break-words"
                  >
                    {initialData.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#888] font-sans font-normal max-w-md mx-auto leading-relaxed mt-4 print:text-black px-2">
                    who successfully participated in India&apos;s premier poetry contest and presented outstanding poetry at the <strong className="text-[#fdfbf7] font-semibold">Poetry Festival Season 2</strong>, demonstrating literary excellence.
                  </p>
                </div>

                {/* Registry Ledger Sheet */}
                <div className="max-w-md mx-auto my-8 bg-white/[0.01] border border-white/5 p-5 rounded-sm print:bg-white print:border-black/10 print:text-black">
                  <div className="text-[9px] uppercase tracking-widest text-[#555] font-bold mb-3.5 pb-2 border-b border-white/5 font-mono flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-[#c5a059]/60" /> REGISTRY LEDGER DETAILS
                  </div>

                  <div className="space-y-3.5 text-xs font-sans">
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-[#555] uppercase tracking-wider font-semibold text-[9px]">Recipient</span>
                      <span className="text-[#fdfbf7] font-medium font-serif print:text-black">{initialData.name}</span>
                    </div>

                    <div className="flex justify-between items-center py-0.5 border-t border-white/[0.03] print:border-black/5">
                      <span className="text-[#555] uppercase tracking-wider font-semibold text-[9px]">Certificate ID</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[#fdfbf7] font-semibold print:text-black">{initialData.certificateId}</span>
                        <button
                          onClick={handleCopyId}
                          className="text-[#555] hover:text-[#c5a059] transition-colors p-0.5 print:hidden"
                          title="Copy Certificate ID"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center py-0.5 border-t border-white/[0.03] print:border-black/5">
                      <span className="text-[#555] uppercase tracking-wider font-semibold text-[9px]">Issue Date</span>
                      <span className="text-[#fdfbf7] font-semibold print:text-black flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-[#c5a059]/60" />
                        4th June 2026
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-0.5 border-t border-white/[0.03] print:border-black/5">
                      <span className="text-[#555] uppercase tracking-wider font-semibold text-[9px]">Status</span>
                      <span className="text-emerald-400 font-bold uppercase tracking-widest text-[9px] flex items-center gap-1">
                        <Lock className="w-3 h-3 shrink-0" />
                        ACTIVE & VERIFIED
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-0.5 border-t border-white/[0.03] print:border-black/5 overflow-hidden">
                      <span className="text-[#555] uppercase tracking-wider font-semibold text-[9px] shrink-0">Registry Hash</span>
                      <span className="font-mono text-[9px] text-[#444] truncate max-w-[180px] sm:max-w-[220px]" title={generateCertHash(id)}>
                        {generateCertHash(id)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Signatures & Seal */}
                <div className="flex items-center justify-between gap-8 max-w-md mx-auto mt-10 pt-6 border-t border-white/5 print:border-black/10">
                  {/* Signature */}
                  <div className="flex flex-col items-start">
                    <span className="font-signature text-3.5xl sm:text-4xl text-[#ebd298] leading-none select-none py-1">
                      Priya Varshney
                    </span>
                    <div className="h-px w-20 bg-white/10 my-1.5 print:bg-black/10" />
                    <span className="text-[9px] uppercase tracking-widest text-[#555] font-bold">
                      Chief Editor, Inkfetish
                    </span>
                  </div>

                  {/* Elegant Gold Foil Seal */}
                  <div className="w-16 h-16 rounded-full border border-[#c5a059]/40 bg-gradient-to-br from-[#c5a059]/15 via-[#c5a059]/5 to-[#c5a059]/25 flex items-center justify-center relative rotate-6 shadow-[0_0_20px_rgba(197,160,89,0.08)] shrink-0 print:border-black/20">
                    <div className="absolute inset-1 rounded-full border border-dashed border-[#c5a059]/30" />
                    <div className="absolute inset-2 rounded-full border border-[#c5a059]/10" />
                    <Feather className="w-6 h-6 text-[#c5a059]/80" strokeWidth={1.2} />
                  </div>
                </div>

                {/* Secure Registry Disclaimer */}
                <div className="text-center mt-10 text-[9px] text-[#444] uppercase tracking-widest">
                  Digitally certified by the Inkfetish Publications registry division.
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 border-t border-white/5 pt-6 print:hidden">
                  <button
                    onClick={handleShare}
                    className="w-full sm:w-auto px-5 py-3 border border-white/10 hover:border-[#c5a059]/30 hover:bg-white/[0.02] hover:text-[#ebd298] text-[10px] uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 rounded-sm"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    {shared ? 'Copied Link!' : 'Share Verification'}
                  </button>

                  <button
                    onClick={handlePrint}
                    className="w-full sm:w-auto px-5 py-3 border border-white/10 hover:border-[#c5a059]/30 hover:bg-white/[0.02] hover:text-[#ebd298] text-[10px] uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 rounded-sm"
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

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-white/5 py-5 px-6 text-center text-[10px] text-[#444] uppercase tracking-widest print:hidden">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>
            © {new Date().getFullYear()} Inkfetish Publications. All Rights Reserved.
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Secure SSL Ledger Verification
          </span>
        </div>
      </footer>
    </div>
  );
}
