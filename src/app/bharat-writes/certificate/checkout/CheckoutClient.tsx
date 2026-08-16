'use client';

import React, { useState, useEffect } from 'react';
import { load } from '@cashfreepayments/cashfree-js';
import { Truck, ShieldCheck, MapPin, Loader2, Sparkles, Award, FileText, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const testimonials = [
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100331/WhatsApp_Image_2026-04-13_at_9.06.50_PM-compressed_f54p62.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_9.06.50_PM_2_-compressed_nrkzf4.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100329/WhatsApp_Image_2026-04-13_at_8.19.16_PM-compressed_pii87q.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_8.27.49_PM-compressed_hhn7yj.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_8.12.24_PM-compressed_skr10b.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775933367/WhatsApp_Image_2026-03-28_at_8.00.34_PM-compressed_yfhhz2.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775933368/WhatsApp_Image_2026-03-29_at_12.35.16_PM_2_-compressed_d12sxy.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775926450/WhatsApp_Image_2026-04-11_at_7.20.21_PM_1_-compressed_hgkckw.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775926445/WhatsApp_Image_2026-04-11_at_7.20.21_PM-compressed_fxtkcv.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897600/WhatsApp_Image_2026-04-09_at_2.59.25_PM-compressed_in2led.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897599/WhatsApp_Image_2026-04-09_at_2.53.04_PM-compressed_wsnhmu.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897599/WhatsApp_Image_2026-04-07_at_8.39.44_PM-compressed_ztxsge.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897598/WhatsApp_Image_2026-04-07_at_8.39.44_PM_1_-compressed_gjnlck.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897597/WhatsApp_Image_2026-04-04_at_12.20.06_PM_1_-compressed_lrqjv2.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897597/WhatsApp_Image_2026-04-03_at_10.52.05_AM_1_-compressed_uphqxg.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897594/WhatsApp_Image_2026-04-02_at_5.17.33_PM_2_-compressed_sz4wld.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897591/WhatsApp_Image_2026-03-23_at_7.03.31_PM_3_-compressed_ofwyil.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897590/WhatsApp_Image_2026-03-23_at_7.03.30_PM-compressed_fsgkug.webp"
];

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Lakshadweep", "Puducherry"
];

export default function CheckoutClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [loading, setLoading] = useState(false);
  const [cashfree, setCashfree] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeCashfree = async () => {
      try {
        const cf = await load({ mode: 'production' });
        setCashfree(cf);
      } catch (err) {
        console.error('Failed to load Cashfree SDK', err);
      }
    };
    initializeCashfree();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cashfree) {
      setError('Payment gateway is initializing. Please wait a moment.');
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/cashfree/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 1, // TEST PRICE
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          plan: 'premium_kit',
          source: 'bharat_writes_kit',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initialize payment');
      }

      await cashfree.checkout({
        paymentSessionId: data.payment_session_id,
        redirectTarget: '_self',
      });

    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans relative">
      
      {/* GLOBAL NAVBAR */}
      <nav className="w-full bg-white border-b border-[#E2E8F0] sticky top-0 z-50">
        <div className="h-1 w-full flex">
          <div className="h-full flex-1 bg-[#FF9933]"></div>
          <div className="h-full flex-1 bg-white"></div>
          <div className="h-full flex-1 bg-[#138808]"></div>
        </div>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#000080] rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:bg-[#1A202C] transition-colors">
              IN
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#1A202C] text-lg leading-tight tracking-tight">Inkfetish</span>
              <span className="text-[10px] font-semibold text-[#FF9933] uppercase tracking-widest leading-none">Publication</span>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#F7FAFC] border border-[#E2E8F0] rounded-full text-xs font-bold text-[#4A5568]">
              <ShieldCheck className="w-4 h-4 text-[#138808]" />
              SECURE CHECKOUT
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-10 lg:py-16">
        
        <div className="mb-8">
          <Link href="/bharat-writes/certificate" className="text-sm font-bold text-[#718096] hover:text-[#1A202C] transition-colors uppercase tracking-wider border-b border-transparent hover:border-[#1A202C] pb-1">
            &larr; Back to Certificate Portal
          </Link>
          <h1 className="text-3xl md:text-5xl font-black text-[#1A202C] mt-6 tracking-tight">
            Complete Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] to-[#138808]">Order</span>
          </h1>
          <p className="text-[#4A5568] mt-2 text-lg">Where should we deliver your Bharat Pride Honor Kit?</p>
        </div>

        {/* TESTIMONIALS MARQUEE */}
        <div className="mb-10 overflow-hidden bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-6">
          <h3 className="text-center font-bold text-[#1A202C] uppercase tracking-widest text-sm mb-6 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FF9933]" /> Our Testimonials - Previously Delivered Orders <Sparkles className="w-4 h-4 text-[#FF9933]" />
          </h3>
          <div className="relative w-full overflow-hidden flex whitespace-nowrap mask-image-fade">
            <div className="animate-marquee flex gap-4 items-center shrink-0">
              {testimonials.map((url, i) => (
                <div key={i} className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden shrink-0 border-2 border-[#E2E8F0] shadow-md relative group">
                  <Image src={url} alt={`Testimonial ${i}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              ))}
            </div>
            {/* Duplicate for seamless looping */}
            <div className="animate-marquee flex gap-4 items-center shrink-0 pl-4">
              {testimonials.map((url, i) => (
                <div key={`dup-${i}`} className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden shrink-0 border-2 border-[#E2E8F0] shadow-md relative group">
                  <Image src={url} alt={`Testimonial ${i}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* LEFT: FORM */}
          <div className="flex-[1.5] w-full bg-white rounded-2xl shadow-xl shadow-black/5 border border-[#E2E8F0] p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E2E8F0]">
              <div className="w-10 h-10 rounded-full bg-[#000080]/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#000080]" />
              </div>
              <h2 className="text-xl font-bold text-[#1A202C]">Shipping Details</h2>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium flex items-start gap-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleCheckout} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#4A5568] uppercase tracking-wider mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#F7FAFC] border border-[#E2E8F0] rounded-xl text-[#1A202C] font-medium focus:outline-none focus:border-[#000080] focus:ring-1 focus:ring-[#000080] transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#4A5568] uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#F7FAFC] border border-[#E2E8F0] rounded-xl text-[#1A202C] font-medium focus:outline-none focus:border-[#000080] focus:ring-1 focus:ring-[#000080] transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A5568] uppercase tracking-wider mb-2">WhatsApp Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    if (val.length <= 10) setFormData(prev => ({...prev, phone: val}));
                  }}
                  required
                  pattern="\d{10}"
                  maxLength={10}
                  className="w-full px-4 py-3 bg-[#F7FAFC] border border-[#E2E8F0] rounded-xl text-[#1A202C] font-medium focus:outline-none focus:border-[#000080] focus:ring-1 focus:ring-[#000080] transition-all"
                  placeholder="10-digit number"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A5568] uppercase tracking-wider mb-2">Full Delivery Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-[#F7FAFC] border border-[#E2E8F0] rounded-xl text-[#1A202C] font-medium focus:outline-none focus:border-[#000080] focus:ring-1 focus:ring-[#000080] transition-all resize-none"
                  placeholder="House/Flat No, Building Name, Street Name, Landmark"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#4A5568] uppercase tracking-wider mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#F7FAFC] border border-[#E2E8F0] rounded-xl text-[#1A202C] font-medium focus:outline-none focus:border-[#000080] focus:ring-1 focus:ring-[#000080] transition-all"
                    placeholder="Mumbai"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#4A5568] uppercase tracking-wider mb-2">State</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={(e: any) => handleChange(e)}
                    required
                    className="w-full px-4 py-3 bg-[#F7FAFC] border border-[#E2E8F0] rounded-xl text-[#1A202C] font-medium focus:outline-none focus:border-[#000080] focus:ring-1 focus:ring-[#000080] transition-all appearance-none"
                  >
                    <option value="" disabled>Select State</option>
                    {indianStates.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#4A5568] uppercase tracking-wider mb-2">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      if (val.length <= 6) setFormData(prev => ({...prev, pincode: val}));
                    }}
                    required
                    pattern="\d{6}"
                    maxLength={6}
                    className="w-full px-4 py-3 bg-[#F7FAFC] border border-[#E2E8F0] rounded-xl text-[#1A202C] font-medium focus:outline-none focus:border-[#000080] focus:ring-1 focus:ring-[#000080] transition-all"
                    placeholder="400001"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || formData.phone.length !== 10 || formData.pincode.length !== 6}
                className="w-full bg-[#138808] text-white py-5 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl shadow-[#138808]/20 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>Proceed to Secure Payment (₹1)</>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 mt-4 text-[#718096] text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#138808]" />
                100% Secure Checkout powered by Cashfree
              </div>

            </form>
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="flex-1 w-full sticky top-24">
            
            <div className="bg-white rounded-2xl shadow-xl shadow-black/5 border border-[#E2E8F0] overflow-hidden mb-6">
              <div className="bg-[#1A202C] p-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer pointer-events-none"></div>
                <h3 className="text-xl font-bold mb-1">Order Summary</h3>
                <p className="text-sm text-gray-400">Physical Bharat Pride Kit</p>
              </div>

              <div className="p-6">
                <div className="flex gap-4 mb-6 pb-6 border-b border-[#E2E8F0]">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200 shadow-inner">
                    <Image src="/images/bharat-pride-mockup.jpg" alt="Kit" width={80} height={80} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#1A202C] leading-tight">Physical Bharat Pride Certificate + Premium Medal</h4>
                    <p className="text-xs font-bold text-[#FF9933] uppercase tracking-widest mt-1">Free Delivery</p>
                  </div>
                  <div className="font-black text-xl text-[#1A202C]">₹1</div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm font-medium text-[#4A5568]">
                    <span>Subtotal</span>
                    <span>₹799</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-[#138808]">
                    <span>Special Discount</span>
                    <span>- ₹798</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-[#4A5568]">
                    <span>Shipping</span>
                    <span className="text-[#138808] font-bold">FREE</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-dashed border-[#E2E8F0]">
                  <span className="font-bold text-[#1A202C] uppercase tracking-wider text-sm">Total To Pay</span>
                  <span className="text-3xl font-black text-[#1A202C]">₹1</span>
                </div>
              </div>
            </div>

            {/* TRUST BADGES */}
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-[#F7FAFC] border border-[#E2E8F0] rounded-xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                  <Truck className="w-6 h-6 text-[#000080]" />
                </div>
                <div>
                  <h5 className="font-bold text-[#1A202C] text-sm">99% Delivery Accuracy</h5>
                  <p className="text-xs text-[#718096]">We partner with top couriers across India.</p>
                </div>
              </div>
              <div className="bg-[#F7FAFC] border border-[#E2E8F0] rounded-xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                  <Sparkles className="w-6 h-6 text-[#FF9933]" />
                </div>
                <div>
                  <h5 className="font-bold text-[#1A202C] text-sm">Premium Quality Guaranteed</h5>
                  <p className="text-xs text-[#718096]">High-grade prints and metallic medals.</p>
                </div>
              </div>
              <div className="bg-[#F7FAFC] border border-[#E2E8F0] rounded-xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                  <ShieldCheck className="w-6 h-6 text-[#138808]" />
                </div>
                <div>
                  <h5 className="font-bold text-[#1A202C] text-sm">Safe & Secure Payment</h5>
                  <p className="text-xs text-[#718096]">256-bit encryption for all transactions.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}

// Add missing icon 
const AlertCircle = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);
