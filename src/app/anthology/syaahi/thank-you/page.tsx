'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, Package, Mail, Truck, Heart, Loader2, Star, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ThankYouPage() {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [cashfree, setCashfree] = useState<any>(null);
  const [upsellLoading, setUpsellLoading] = useState<string | null>(null);
  const [hasPurchasedUpsell, setHasPurchasedUpsell] = useState(false);

  useEffect(() => {
    // Load Cashfree SDK for upsells
    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.async = true;
    script.onload = () => {
      setCashfree((window as any).Cashfree({ mode: process.env.NEXT_PUBLIC_CASHFREE_MODE || 'sandbox' }));
    };
    document.head.appendChild(script);

    const params = new URLSearchParams(window.location.search);
    const id = params.get('order_id');
    
    if (id && !id.startsWith('upg_')) {
      setOrderId(id);
      fetch(`/api/syahi/verify-order?order_id=${id}`)
        .then(res => res.json())
        .then(data => setOrderDetails(data));
    } else if (id && id.startsWith('upg_')) {
      // Returned from an upsell
      localStorage.setItem('syaahi_upsell_purchased', 'true');
      setHasPurchasedUpsell(true);
      fetch(`/api/syahi/verify-upsell-order?order_id=${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.parent_order_id) {
             setOrderId(data.parent_order_id);
             window.history.replaceState(null, '', `/anthology/syaahi/thank-you?order_id=${data.parent_order_id}`);
             return fetch(`/api/syahi/verify-order?order_id=${data.parent_order_id}`);
          }
        })
        .then(res => res?.json())
        .then(data => {
            if(data) setOrderDetails(data);
        });
    }

    if (localStorage.getItem('syaahi_upsell_purchased') === 'true') {
      setHasPurchasedUpsell(true);
    }

    // Celebratory confetti (Gold & Navy)
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#0a1b3f', '#b8860b', '#f2e6d3']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#0a1b3f', '#b8860b', '#f2e6d3']
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
      const res = await fetch('/api/syahi/create-upsell-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentOrderId: orderId,
          upgradeType: type,
          amount: amount
        }),
      });

      const orderData = await res.json();
      if (!res.ok) throw new Error('Failed to create order');

      await cashfree.checkout({
        paymentSessionId: orderData.payment_session_id,
        redirectTarget: '_modal',
      });

      // Verification will happen via return_url reload or we can manually check
      window.location.href = `/anthology/syaahi/thank-you?order_id=${orderData.order_id}`;
    } catch (err) {
      console.error(err);
      setUpsellLoading(null);
    }
  };

  const hasCert = orderDetails?.order_tags?.cert === 'yes';
  const hasPort = orderDetails?.order_tags?.port === 'yes';

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700&display=swap');
        .font-cinzel { font-family: 'Montserrat', sans-serif; }
        .font-playfair { font-family: 'Outfit', sans-serif; }
        .bg-parchment {
          background-color: #f2e6d3;
          background-image: radial-gradient(circle at 50% 50%, transparent 20%, rgba(200, 180, 150, 0.1) 80%), linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4));
        }
        .bg-navy { background-color: #0a1b3f; }
        .text-navy { color: #0a1b3f; }
      `}} />

      <div className="min-h-screen bg-parchment flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#b8860b] rounded-full mix-blend-multiply filter blur-[100px] opacity-10"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-navy rounded-full mix-blend-multiply filter blur-[100px] opacity-10"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full bg-white/95 backdrop-blur-md rounded-sm p-8 lg:p-14 shadow-2xl border border-[#b8860b]/30 text-center relative z-10 my-10"
        >
          {/* Corner Ornaments */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#b8860b]/40 hidden sm:block"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#b8860b]/40 hidden sm:block"></div>

          <div className="relative z-10">
            <div className="w-20 h-20 bg-green-500/10 border-2 border-green-500 rounded-full flex items-center justify-center text-green-600 mx-auto mb-8 shadow-xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-black text-navy mb-4 uppercase tracking-wider">Order Confirmed</h1>
            <p className="text-base sm:text-lg lg:text-xl text-navy/70 mb-10 font-playfair leading-relaxed">
              Your Collector's Edition of <span className="text-navy font-bold">Syaahi Vol. 1</span> has been successfully secured. Welcome to the legacy.
            </p>

            <div className="bg-navy p-6 sm:p-8 rounded-sm mb-10 text-left border border-[#b8860b]/50 shadow-inner">
              <h3 className="text-xs font-cinzel font-bold uppercase tracking-widest text-[#f2e6d3]/60 mb-6 flex items-center gap-2 border-b border-[#b8860b]/30 pb-3">
                <Package className="w-4 h-4 text-[#b8860b]" /> Order Details
              </h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[#f2e6d3] font-playfair text-base sm:text-lg flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> Syaahi Vol. 1 Book
                </span>
              </div>
              {hasCert && (
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[#f2e6d3] font-playfair text-base sm:text-lg flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> Official Certificate
                  </span>
                </div>
              )}
              {hasPort && (
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[#f2e6d3] font-playfair text-base sm:text-lg flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> 1-Year Portfolio Site
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center text-sm mt-6 border-t border-[#f2e6d3]/10 pt-4">
                <span className="text-[#f2e6d3]/60 font-cinzel tracking-widest">ORDER ID</span>
                <code className="text-[#b8860b] font-cinzel font-bold tracking-wider">{orderId || 'SYAAHI_EXPRESS'}</code>
              </div>
            </div>

            {/* UPSELL SECTION */}
            {orderDetails && (!hasCert || !hasPort) && !hasPurchasedUpsell && (
              <div className="mb-10 mt-10">
                <h3 className="text-xl font-cinzel font-bold text-navy mb-6">Wait! Before you go...</h3>
                <div className="space-y-4 text-left">
                  
                  {!hasCert && (
                    <div className="border border-[#b8860b]/30 p-5 rounded-sm bg-gradient-to-r from-white to-[#b8860b]/5 shadow-lg relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-[#b8860b] text-navy text-[10px] font-bold uppercase tracking-widest px-3 py-1 font-cinzel">Exclusive</div>
                      <div className="flex justify-between items-start mb-2 mt-2">
                        <h4 className="font-cinzel font-bold text-navy text-lg">Official Inkfetish Certificate</h4>
                        <span className="font-cinzel font-bold text-[#b8860b] text-lg">₹50</span>
                      </div>
                      <p className="text-sm font-playfair text-navy/70 mb-4">Get your own personalized, printed community certificate from Inkfetish alongside your book.</p>
                      <button 
                        onClick={() => handleUpsell('cert', 50)}
                        disabled={upsellLoading !== null}
                        className="w-full py-3 bg-navy text-[#f2e6d3] font-cinzel font-bold text-sm tracking-widest uppercase hover:bg-[#b8860b] hover:text-navy transition-colors flex items-center justify-center gap-2"
                      >
                        {upsellLoading === 'cert' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'ADD TO ORDER NOW'}
                      </button>
                    </div>
                  )}

                  {!hasPort && (
                    <div className="border border-[#b8860b]/30 p-5 rounded-sm bg-gradient-to-r from-white to-[#b8860b]/5 shadow-lg relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-[#b8860b] text-navy text-[10px] font-bold uppercase tracking-widest px-3 py-1 font-cinzel">Recommended</div>
                      <div className="flex justify-between items-start mb-2 mt-2">
                        <h4 className="font-cinzel font-bold text-navy text-lg">1-Year Author Portfolio Site</h4>
                        <span className="font-cinzel font-bold text-[#b8860b] text-lg">₹150</span>
                      </div>
                      <p className="text-sm font-playfair text-navy/70 mb-4">Establish your digital presence with a premium, verified author portfolio website hosted by Inkfetish.</p>
                      <button 
                        onClick={() => handleUpsell('port', 150)}
                        disabled={upsellLoading !== null}
                        className="w-full py-3 bg-navy text-[#f2e6d3] font-cinzel font-bold text-sm tracking-widest uppercase hover:bg-[#b8860b] hover:text-navy transition-colors flex items-center justify-center gap-2"
                      >
                        {upsellLoading === 'port' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'ADD TO ORDER NOW'}
                      </button>
                    </div>
                  )}

                </div>
              </div>
            )}

            <div className="flex flex-col gap-6 items-center justify-center border-t border-navy/10 pt-8 mt-8">
              <div className="flex items-center gap-2 text-navy/60 font-playfair text-xs sm:text-sm italic">
                Crafted with <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-[#b8860b] fill-[#b8860b]/20" /> by Inkfetish Publication
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
