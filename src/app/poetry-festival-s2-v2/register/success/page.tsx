'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, Trophy, Mail, Calendar, Feather, Home } from 'lucide-react';

export default function RegistrationSuccessPage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('paymentId');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate verification
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-[#fdfbf7] font-sans overflow-hidden flex items-center justify-center px-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-green-900/10 blur-[100px] rounded-full"
          animate={{ x: [-40, 40, -40], y: [-40, 40, -40] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-purple-900/10 blur-[100px] rounded-full"
          animate={{ x: [40, -40, 40], y: [40, -40, 40] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-2xl w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {loading ? (
          // Loading state
          <div className="text-center">
            <motion.div
              className="w-16 h-16 mx-auto mb-6 rounded-full border-4 border-gold/30 border-t-gold"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            <h2 className="text-2xl font-serif font-black mb-2">Processing Your Payment</h2>
            <p className="text-[#666]">Confirming your registration...</p>
          </div>
        ) : (
          // Success state
          <>
            <motion.div
              className="text-center mb-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-900/20 border-2 border-green-500 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h1 className="text-4xl font-serif font-black mb-2">Registration Confirmed!</h1>
              <p className="text-lg text-[#666] font-light">
                Your seat for Poetry Festival Season 2 is now locked in.
              </p>
            </motion.div>

            <motion.div
              className="bg-[#050505] border border-white/8 rounded-sm p-8 mb-8 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-gold mb-4 flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  What Happens Next?
                </h2>
                <ul className="space-y-4">
                  {[
                    {
                      icon: Mail,
                      title: 'Confirmation Email (Next 5 mins)',
                      desc: 'Check your inbox for submission guidelines & Zoom link'
                    },
                    {
                      icon: Calendar,
                      title: 'Submission Deadline',
                      desc: 'You have until May 15, 2026 to submit your poem'
                    },
                    {
                      icon: Trophy,
                      title: 'Results & Delivery',
                      desc: 'June 1, 2026: Live Zoom event + physical certificates start shipping'
                    },
                  ].map(({ icon: Icon, title, desc }, idx) => (
                    <motion.li
                      key={idx}
                      className="flex gap-4 items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                    >
                      <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0 mt-1">
                        <Icon className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <div className="font-bold text-[#fdfbf7]">{title}</div>
                        <div className="text-sm text-[#666] font-light">{desc}</div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-white/5 pt-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gold mb-3 flex items-center gap-2">
                  <Feather className="w-4 h-4" />
                  Your Registration Details
                </h3>
                <div className="space-y-2 text-sm text-[#888]">
                  <div className="flex justify-between">
                    <span>Payment ID:</span>
                    <code className="font-mono text-gold">{paymentId || 'Loading...'}</code>
                  </div>
                  <div className="flex justify-between">
                    <span>Entry Fee Paid:</span>
                    <span className="text-gold font-bold">₹299</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Registration Date:</span>
                    <span>{new Date().toLocaleDateString('en-IN', { dateStyle: 'medium' })}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <p className="text-sm text-center text-[#666]">
                A detailed confirmation email will arrive shortly. Save it for submission guidelines!
              </p>
              <Link
                href="/poetry-festival-s2"
                className="block w-full py-4 bg-gradient-to-r from-gold to-[#c5a059] hover:from-[#ebd298] hover:to-gold text-[#050505] font-black uppercase tracking-widest rounded-sm text-center transition-all"
              >
                <span className="flex items-center justify-center gap-2">
                  <Home className="w-4 h-4" />
                  Back to Festival Page
                </span>
              </Link>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}
