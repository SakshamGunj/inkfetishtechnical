'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, Package, Heart, Loader2, Flag, ShieldCheck, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({ weight: ['400', '500', '600', '700', '800', '900'], subsets: ['latin'] });

export default function SunoBharatThankYouPage() {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [cashfree, setCashfree] = useState<any>(null);
  const [upsellLoading, setUpsellLoading] = useState<string | null>(null);
  const [hasPurchasedUpsell, setHasPurchasedUpsell] = useState(false);

  useEffect(() => {
    // Load Cashfree SDK for upsells
    if (typeof window !== 'undefined' && (window as any).Cashfree) {
      setCashfree(
        (window as any).Cashfree({ mode: process.env.NEXT_PUBLIC_CASHFREE_MODE || 'sandbox' })
      );
    } else {
      const script = document.createElement('script');
      script.id = 'cashfree-sdk';
      script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
      script.async = true;
      script.onload = () => {
        setCashfree(
          (window as any).Cashfree({ mode: process.env.NEXT_PUBLIC_CASHFREE_MODE || 'sandbox' })
        );
      };
      if (!document.getElementById('cashfree-sdk')) {
        document.head.appendChild(script);
      }
    }

    const params = new URLSearchParams(window.location.search);
    const id = params.get('order_id');

    if (id && !id.startsWith('sbupg_')) {
      setOrderId(id);
      fetch(`/api/suno-bharat/verify-order?order_id=${id}`)
        .then((res) => res.json())
        .then((data) => setOrderDetails(data));
    } else if (id && id.startsWith('sbupg_')) {
      // Returned from an upsell
      localStorage.setItem('suno_bharat_upsell_purchased', 'true');
      setHasPurchasedUpsell(true);
      fetch(`/api/suno-bharat/verify-upsell-order?order_id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.parent_order_id) {
            setOrderId(data.parent_order_id);
            window.history.replaceState(
              null,
              '',
              `/anthology/suno-bharat/thank-you?order_id=${data.parent_order_id}`
            );
            return fetch(`/api/suno-bharat/verify-order?order_id=${data.parent_order_id}`);
          }
        })
        .then((res) => res?.json())
        .then((data) => {
          if (data) setOrderDetails(data);
        });
    }

    if (localStorage.getItem('suno_bharat_upsell_purchased') === 'true') {
      setHasPurchasedUpsell(true);
    }

    // Celebratory Tricolor confetti (Saffron, White/Navy, India Green)
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF9933', '#000080', '#138808'],
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF9933', '#000080', '#138808'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const handleUpsell = async (type: 'cert' | 'port', amount: number) => {
    if (!cashfree || !orderId) return;
    setUpsellLoading(type);

    try {
      const res = await fetch('/api/suno-bharat/create-upsell-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentOrderId: orderId,
          upgradeType: type,
          amount: amount,
        }),
      });

      const orderData = await res.json();
      if (!res.ok) throw new Error('Failed to create order');

      await cashfree.checkout({
        paymentSessionId: orderData.payment_session_id,
        redirectTarget: '_modal',
      });

      window.location.href = `/anthology/suno-bharat/thank-you?order_id=${orderData.order_id}`;
    } catch (err) {
      console.error(err);
      setUpsellLoading(null);
    }
  };

  const hasCert = orderDetails?.order_tags?.cert === 'yes';
  const hasPort = orderDetails?.order_tags?.port === 'yes';

  return (
    <div
      className={`min-h-screen bg-[#F8F9FA] flex flex-col justify-between ${inter.className} relative overflow-hidden`}
    >
      {/* ── BHARAT WRITES PORTAL TOP BAR ── */}
      <nav className="w-full bg-white border-b border-[#E2E8F0] sticky top-0 z-50">
        <div className="h-1.5 w-full flex">
          <div className="h-full flex-1 bg-[#FF9933]" />
          <div className="h-full flex-1 bg-white" />
          <div className="h-full flex-1 bg-[#138808]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/anthology/suno-bharat" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#000080] rounded-lg flex items-center justify-center text-white font-bold shadow">
              <Flag className="w-4 h-4 text-[#FF9933]" />
            </div>
            <div className="flex flex-col">
              <span className={`${poppins.className} font-bold text-[#000080] text-base leading-tight`}>
                Suno Bharat
              </span>
              <span className="text-[9px] font-bold text-[#FF9933] uppercase tracking-[0.2em]">
                Official Receipt Portal
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F0FFF4] border border-[#138808]/30 rounded-full text-xs font-bold text-[#138808]">
            <ShieldCheck className="w-4 h-4" />
            <span>VERIFIED ORDER</span>
          </div>
        </div>
      </nav>

      {/* Background Accents */}
      <div className="absolute top-10 right-[-10%] w-[450px] h-[450px] bg-[#FF9933]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-[-10%] w-[450px] h-[450px] bg-[#138808]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full bg-white rounded-2xl p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,128,0.08)] border border-[#E2E8F0] text-center relative z-10 my-8 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 flex">
            <div className="h-full flex-1 bg-[#FF9933]" />
            <div className="h-full flex-1 bg-white" />
            <div className="h-full flex-1 bg-[#138808]" />
          </div>

          <div className="relative z-10">
            <div className="w-20 h-20 bg-[#F0FFF4] border-2 border-[#138808] rounded-full flex items-center justify-center text-[#138808] mx-auto mb-6 shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#FF9933] mb-2">
              🇮🇳 Bharat Writes National Archive
            </div>
            <h1
              className={`${poppins.className} text-3xl sm:text-4xl font-black text-[#000080] mb-3 uppercase tracking-wide`}
            >
              Order Confirmed
            </h1>
            <p className="text-sm sm:text-base text-[#4A5568] mb-8 leading-relaxed max-w-lg mx-auto">
              Your Collector&apos;s Edition of <strong className="text-[#000080]">Suno Bharat — Vol. 1</strong> has been
              officially reserved under your name. Welcome to the legacy.
            </p>

            {/* Order Details Card */}
            <div className="bg-[#000080] text-white p-6 sm:p-7 rounded-xl mb-8 text-left border border-[#000066] shadow-inner relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 flex">
                <div className="h-full flex-1 bg-[#FF9933]" />
                <div className="h-full flex-1 bg-white" />
                <div className="h-full flex-1 bg-[#138808]" />
              </div>

              <h3
                className={`${poppins.className} text-xs font-bold uppercase tracking-widest text-white/70 mb-5 flex items-center gap-2 border-b border-white/15 pb-3`}
              >
                <Package className="w-4 h-4 text-[#FF9933]" /> Reserved Items
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold text-sm sm:text-base flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#4ADE80] shrink-0" /> Suno Bharat Collector&apos;s
                    Edition Book
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold text-sm sm:text-base flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#4ADE80] shrink-0" /> Official Publication Certificate
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/95 text-sm sm:text-base flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#FF9933] shrink-0" /> Free Entry to Next Inkfetish Contest
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/95 text-sm sm:text-base flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#4ADE80] shrink-0" /> Free Shipping All Over India
                  </span>
                </div>
                {hasPort && (
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold text-sm sm:text-base flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#4ADE80] shrink-0" /> 1-Year Verified Author Portfolio Site
                    </span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center text-xs sm:text-sm mt-6 border-t border-white/15 pt-4">
                <span className="text-white/60 font-bold uppercase tracking-widest">OFFICIAL ORDER ID</span>
                <code className="text-[#FF9933] font-mono font-bold tracking-wider">
                  {orderId || 'SUNO_BHARAT_PAID'}
                </code>
              </div>
            </div>

            {/* ── POST-PURCHASE 1-CLICK UPSELL SECTION ── */}
            {orderDetails && (!hasCert || !hasPort) && !hasPurchasedUpsell && (
              <div className="mb-8 mt-8">
                <h3 className={`${poppins.className} text-lg sm:text-xl font-bold text-[#000080] mb-2`}>
                  Wait! Complete Your Bharat Writes Package
                </h3>
                <p className="text-xs sm:text-sm text-[#4A5568] mb-5">
                  Add these official author upgrades to your existing book shipment with 1 click:
                </p>

                <div className="space-y-4 text-left">
                  {!hasCert && (
                    <div className="border-2 border-[#FF9933]/50 p-5 rounded-xl bg-[#FFFaf0] shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-[#FF9933] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-lg">
                        Exclusive Add-On
                      </div>
                      <div className="flex justify-between items-start mb-1.5 mt-2">
                        <h4 className={`${poppins.className} font-bold text-[#000080] text-base sm:text-lg`}>
                          Official Bharat Writes Printed Certificate
                        </h4>
                        <span className={`${poppins.className} font-black text-[#FF9933] text-lg`}>₹50</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#4A5568] mb-4">
                        Get your personalized, high-GSM printed Bharat Pride Certificate shipped inside your book
                        parcel.
                      </p>
                      <button
                        onClick={() => handleUpsell('cert', 50)}
                        disabled={upsellLoading !== null}
                        className={`${poppins.className} w-full py-3 bg-[#000080] hover:bg-[#1A202C] text-white rounded-lg font-bold text-xs sm:text-sm tracking-widest uppercase transition-colors flex items-center justify-center gap-2`}
                      >
                        {upsellLoading === 'cert' ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            ADD TO MY BOOK ORDER <ArrowRight className="w-4 h-4 text-[#FF9933]" />
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {!hasPort && (
                    <div className="border-2 border-[#138808]/40 p-5 rounded-xl bg-[#F0FFF4] shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-[#138808] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-lg">
                        Recommended
                      </div>
                      <div className="flex justify-between items-start mb-1.5 mt-2">
                        <h4 className={`${poppins.className} font-bold text-[#000080] text-base sm:text-lg`}>
                          1-Year Verified Author Portfolio Site
                        </h4>
                        <span className={`${poppins.className} font-black text-[#138808] text-lg`}>₹150</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#4A5568] mb-4">
                        Establish your official digital presence with a personalized, verified author portfolio website
                        hosted by Inkfetish.
                      </p>
                      <button
                        onClick={() => handleUpsell('port', 150)}
                        disabled={upsellLoading !== null}
                        className={`${poppins.className} w-full py-3 bg-[#000080] hover:bg-[#1A202C] text-white rounded-lg font-bold text-xs sm:text-sm tracking-widest uppercase transition-colors flex items-center justify-center gap-2`}
                      >
                        {upsellLoading === 'port' ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            ADD TO MY BOOK ORDER <ArrowRight className="w-4 h-4 text-[#4ADE80]" />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-4 items-center justify-center border-t border-[#E2E8F0] pt-6 mt-6">
              <div className="flex items-center gap-2 text-[#4A5568] text-xs sm:text-sm font-medium">
                Crafted with <Heart className="w-4 h-4 text-[#FF9933] fill-[#FF9933]/20" /> for Bharat by Inkfetish
                Publication
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
