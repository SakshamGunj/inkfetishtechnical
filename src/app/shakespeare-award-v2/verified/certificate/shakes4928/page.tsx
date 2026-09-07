"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Shield, Award, Star, BadgeCheck } from "lucide-react";

export default function ShakespeareVerifiedCertificate() {
  const [phase, setPhase] = useState<"scanning" | "verified">("scanning");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar over ~2 seconds
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase("verified"), 200);
          return 100;
        }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#14100C] text-slate-200 flex items-center justify-center px-4 py-16 relative overflow-hidden"
      style={{ backgroundImage: "radial-gradient(circle at 50% 0%, #2A2118 0%, #14100C 60%)" }}
    >
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.1)_0%,transparent_70%)] pointer-events-none" />

      <AnimatePresence mode="wait">
        {phase === "scanning" ? (
          <motion.div
            key="scanning"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-6 w-full max-w-sm"
          >
            {/* Pulsing shield */}
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              className="w-20 h-20 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shadow-[0_0_40px_rgba(197,160,89,0.2)]"
            >
              <Shield className="w-9 h-9 text-[#ebd298]" />
            </motion.div>

            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-gold/70 font-bold mb-1">Inkfetish Publications</p>
              <h2 className="text-xl font-serif font-bold text-white">Verifying Certificate</h2>
              <p className="text-sm text-slate-400 mt-1 font-light">Shakespeare Poetry Award · Season 2</p>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-[#1A1613] border border-gold/20 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#c5a059] to-[#ebd298] rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 font-light tracking-widest uppercase">
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-gold"
              />
              Authenticating record...
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="verified"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-2xl"
          >
            {/* Certificate card */}
            <div className="relative bg-gradient-to-br from-[#1A1613] to-[#0E0B08] border border-gold/30 rounded-sm shadow-[0_40px_80px_rgba(197,160,89,0.15)] overflow-hidden">

              {/* Top gold bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#c5a059] via-[#ebd298] to-[#c5a059]" />

              {/* Corner ornaments */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold/40 rounded-tl-sm" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold/40 rounded-tr-sm" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-gold/40 rounded-bl-sm" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold/40 rounded-br-sm" />

              <div className="px-8 py-10 sm:px-14 sm:py-14 flex flex-col items-center text-center gap-6">

                {/* Verified badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
                  className="relative"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500/40 flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.2)]">
                    <CheckCircle2 className="w-10 h-10 text-green-400" />
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.35 }}
                    className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#14100C] border border-gold/40 flex items-center justify-center"
                  >
                    <BadgeCheck className="w-4 h-4 text-[#ebd298]" />
                  </motion.div>
                </motion.div>

                {/* Status pill */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 text-[10px] font-black tracking-[0.25em] uppercase px-4 py-2 rounded-sm"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Successfully Verified
                </motion.div>

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <p className="text-[10px] uppercase tracking-[0.35em] text-gold/60 font-bold mb-2">
                    Inkfetish Publications · Official Record
                  </p>
                  <h1 className="font-serif font-black text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] via-[#ebd298] to-[#b8922a] leading-tight">
                    Certificate of Excellence
                  </h1>
                  <p className="text-base sm:text-lg font-light italic text-white/60 mt-1 tracking-wide">
                    Shakespeare Poetry Award · Season 2
                  </p>
                </motion.div>

                {/* Divider */}
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

                {/* Verification details */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3"
                >
                  {[
                    { icon: <Shield className="w-4 h-4" />, label: "Certificate ID", value: "SHAKES4928" },
                    { icon: <Award className="w-4 h-4" />, label: "Program", value: "SPA Season 2" },
                    { icon: <Star className="w-4 h-4" />, label: "Validity", value: "All States · India" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.08 }}
                      className="bg-[#0E0B08] border border-gold/15 rounded-sm px-4 py-3 flex flex-col items-center gap-1"
                    >
                      <span className="text-gold/60">{item.icon}</span>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-bold">{item.label}</span>
                      <span className="text-xs font-bold text-white/80">{item.value}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Main verification message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="w-full bg-green-500/5 border border-green-500/20 rounded-sm px-6 py-5"
                >
                  <p className="text-sm text-green-300/90 font-light leading-relaxed">
                    This certificate has been <span className="font-bold text-green-300">successfully verified</span> and is authentic. It was issued by Inkfetish Publications as part of the <span className="font-semibold text-white/80">Shakespeare Poetry Award — Season 2</span> and is recognised and valid across all states of India.
                  </p>
                </motion.div>

                {/* Trust badges */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.65 }}
                  className="flex flex-wrap items-center justify-center gap-4 text-[9px] uppercase tracking-[0.2em] text-slate-500 font-bold"
                >
                  {["Tamper-Proof", "Digitally Authenticated", "Valid Nationwide", "Inkfetish Certified"].map((badge) => (
                    <span key={badge} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-green-500/70" />
                      {badge}
                    </span>
                  ))}
                </motion.div>

              </div>

              {/* Bottom gold bar */}
              <div className="h-1 w-full bg-gradient-to-r from-[#c5a059] via-[#ebd298] to-[#c5a059]" />
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-[10px] text-slate-600 font-light tracking-wide">
                © Inkfetish Publications · Shakespeare Poetry Award Season 2 · Certificate ID: SHAKES4928
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
