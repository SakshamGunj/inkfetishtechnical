'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, ArrowLeft, Loader2, Check } from 'lucide-react';
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({ weight: ['500', '600', '700', '800'], subsets: ['latin'] });

type PaymentStatus = 'idle' | 'creating' | 'paying' | 'verifying' | 'paid' | 'failed';

export default function BuyClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [addCertificate] = useState(true);
  const [addPortfolio] = useState(false);

  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [cashfree, setCashfree] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const indianStates = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra & Nagar Haveli and Daman & Diu',
    'Delhi',
    'Jammu and Kashmir',
    'Ladakh',
    'Lakshadweep',
    'Puducherry',
  ];

  const basePrice = 499;
  const portPrice = 150;

  const totalAmount = basePrice + (addPortfolio ? portPrice : 0);

  useEffect(() => {
    const paidOrderId = localStorage.getItem('suno_bharat_paid_order_id');
    if (paidOrderId) {
      fetch(`/api/suno-bharat/verify-order?order_id=${paidOrderId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.order_status === 'PAID') {
            window.location.href = `/anthology/suno-bharat/thank-you?order_id=${paidOrderId}`;
          } else {
            localStorage.removeItem('suno_bharat_paid_order_id');
          }
        })
        .catch(() => {});
    }

    if (typeof window !== 'undefined' && (window as any).Cashfree) {
      setCashfree(
        (window as any).Cashfree({
          mode: process.env.NEXT_PUBLIC_CASHFREE_MODE || 'sandbox',
        })
      );
    } else {
      const script = document.createElement('script');
      script.id = 'cashfree-sdk';
      script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
      script.async = true;
      script.onload = () => {
        setCashfree(
          (window as any).Cashfree({
            mode: process.env.NEXT_PUBLIC_CASHFREE_MODE || 'sandbox',
          })
        );
      };
      if (!document.getElementById('cashfree-sdk')) {
        document.head.appendChild(script);
      }
    }

    const saved = localStorage.getItem('suno_bharat_customer_info');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
        return;
      } catch (e) {}
    }

    const savedAuthor = localStorage.getItem('bharat_writes_author');
    if (savedAuthor) {
      try {
        const parsed = JSON.parse(savedAuthor);
        setFormData((prev) => ({
          ...prev,
          name: parsed.name || prev.name,
          email: parsed.email || prev.email,
          whatsapp: parsed.whatsapp || prev.whatsapp,
        }));
      } catch (e) {}
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.whatsapp ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      setError('Please fill in all shipping details.');
      return false;
    }
    if (!/^\d{10}$/.test(formData.whatsapp.replace(/\D/g, '').slice(-10))) {
      setError('Please enter a valid 10-digit WhatsApp number.');
      return false;
    }
    if (!/^\d{6}$/.test(formData.pincode.trim())) {
      setError('Please enter a valid 6-digit Pincode.');
      return false;
    }
    return true;
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;
    if (!cashfree) {
      setError('Payment gateway is loading. Please try again in a moment.');
      return;
    }

    setPaymentStatus('creating');
    localStorage.setItem('suno_bharat_customer_info', JSON.stringify(formData));

    try {
      const res = await fetch('/api/suno-bharat/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalAmount,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.whatsapp,
          boughtCertificate: addCertificate,
          boughtPortfolio: addPortfolio,
          ...formData,
        }),
      });

      const orderData = await res.json();
      if (!res.ok) throw new Error(orderData.error || 'Failed to create order');

      setPaymentStatus('paying');

      const checkoutResult = await cashfree.checkout({
        paymentSessionId: orderData.payment_session_id,
        redirectTarget: '_modal',
      });

      if (checkoutResult?.error) {
        setPaymentStatus('failed');
        setError('Payment was not completed. Please try again.');
        return;
      }

      setPaymentStatus('verifying');
      const verifyRes = await fetch(`/api/suno-bharat/verify-order?order_id=${orderData.order_id}`);
      const verifyData = await verifyRes.json();

      if (verifyData.order_status === 'PAID') {
        setPaymentStatus('paid');
        localStorage.setItem('suno_bharat_paid_order_id', orderData.order_id);
        window.location.href = `/anthology/suno-bharat/thank-you?order_id=${orderData.order_id}`;
      } else {
        setPaymentStatus('failed');
        setError('Payment was not completed. Please try again.');
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      setPaymentStatus('failed');
      setError(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className={`min-h-screen bg-[#F8F9FA] text-[#1A202C] ${inter.className} pb-20`}>
      {/* ── MINIMAL HEADER ── */}
      <nav className="w-full bg-white border-b border-[#E2E8F0] sticky top-0 z-50">
        <div className="h-1 w-full flex">
          <div className="h-full flex-1 bg-[#FF9933]" />
          <div className="h-full flex-1 bg-white" />
          <div className="h-full flex-1 bg-[#138808]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-2.5 min-h-16 flex items-center justify-between gap-2.5 sm:gap-3">
          <Link href="/anthology/suno-bharat" className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <img
              src="/images/inkfetish_logo.webp"
              alt="Inkfetish Logo"
              fetchPriority="high"
              decoding="async"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-[#000080] shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className={`${poppins.className} font-extrabold tracking-tight text-sm sm:text-lg text-[#000080] leading-none`}>
                  ink.fetish
                </span>
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#E8F0FA] border border-[#1E4E8C]/25 text-[#000080] text-[9px] font-extrabold uppercase tracking-wider">
                  <ShieldCheck className="w-2.5 h-2.5 text-[#1E4E8C]" />
                  <span>NGO-Verified</span>
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-semibold text-[#475A70] leading-snug mt-0.5 truncate">
                216,000+ Instagram Followers · GST &amp; MSME Registered
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#138808] shrink-0">
            <ShieldCheck className="w-4 h-4" /> Secure Checkout
          </div>
        </div>
      </nav>

      {/* ── SUB-HEADER BANNER (SUNO BHARAT • BHARAT WRITES • INKFETISH) ── */}
      <div className="w-full bg-[#000080] text-white py-2 px-4 text-center border-b border-[#000066]">
        <p className="max-w-4xl mx-auto text-[11px] sm:text-xs font-medium tracking-wide">
          🇮🇳 <strong className="text-[#FF9933]">Suno Bharat</strong> — Official Anthology of{' '}
          <strong>Bharat Writes</strong> by <strong className="text-[#4ADE80]">Inkfetish Publication</strong>
        </p>
      </div>

      {/* ── MAIN CHECKOUT CONTAINER ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
        <div className="mb-6">
          <h1 className={`${poppins.className} text-2xl sm:text-3xl font-bold text-[#000080]`}>
            Delivery Details
          </h1>
          <p className="text-sm text-[#4A5568] mt-1">
            Your poetry from the <strong>Bharat Writes — National Independence Poetry Contest</strong> is published inside <strong>Suno Bharat</strong>. Enter your shipping address below.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* Left: Shipping Form */}
          <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
            <form id="checkout-form" onSubmit={handlePayment} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A5568] mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-[#E2E8F0] rounded-lg focus:border-[#000080] focus:bg-white outline-none text-sm"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A5568] mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setFormData((prev) => ({ ...prev, whatsapp: val }));
                    }}
                    className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-[#E2E8F0] rounded-lg focus:border-[#000080] focus:bg-white outline-none text-sm"
                    placeholder="10-digit number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A5568] mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-[#E2E8F0] rounded-lg focus:border-[#000080] focus:bg-white outline-none text-sm"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A5568] mb-1">
                  Full Delivery Address *
                </label>
                <textarea
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-[#E2E8F0] rounded-lg focus:border-[#000080] focus:bg-white outline-none text-sm resize-none"
                  placeholder="House/Flat No., Street, Area, Landmark"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#4A5568] mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-[#F8F9FA] border border-[#E2E8F0] rounded-lg focus:border-[#000080] focus:bg-white outline-none text-sm"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A5568] mb-1">State *</label>
                  <select
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-2.5 py-2.5 bg-[#F8F9FA] border border-[#E2E8F0] rounded-lg focus:border-[#000080] focus:bg-white outline-none text-sm"
                  >
                    <option value="" disabled>
                      State
                    </option>
                    {indianStates.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A5568] mb-1">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setFormData((prev) => ({ ...prev, pincode: val }));
                    }}
                    className="w-full px-3 py-2.5 bg-[#F8F9FA] border border-[#E2E8F0] rounded-lg focus:border-[#000080] focus:bg-white outline-none text-sm"
                    placeholder="6 digits"
                  />
                </div>
              </div>

              {/* Included in Your ₹499 Package */}
              <div className="pt-3 border-t border-[#E2E8F0] space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-[#138808]">
                  Included in Your ₹499 Package
                </div>
                <div className="p-3.5 rounded-lg bg-[#F0FFF4] border border-[#138808]/25 space-y-2 text-xs sm:text-sm font-medium text-[#1A202C]">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#138808] shrink-0" />
                    <span><strong>Suno Bharat Anthology Book</strong> (Physical Collector&apos;s Copy)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#138808] shrink-0" />
                    <span><strong>Official Publication Certificate</strong> (Included Free)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#138808] shrink-0" />
                    <span><strong>Free Entry to Next Contest</strong> (Included Free)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#138808] shrink-0" />
                    <span><strong>Free Shipping All Over India</strong> (₹0 Delivery Charge)</span>
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg text-xs font-semibold border border-red-200">
                  {error}
                </div>
              )}
            </form>
          </div>

          {/* Right: Clean Order Summary */}
          <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 flex">
              <div className="h-full flex-1 bg-[#FF9933]" />
              <div className="h-full flex-1 bg-white" />
              <div className="h-full flex-1 bg-[#138808]" />
            </div>

            <h3 className={`${poppins.className} text-base font-bold text-[#000080] mb-4`}>
              Order Summary
            </h3>

            <div className="flex items-center gap-3.5 p-3 bg-[#F8F9FA] rounded-lg border border-[#E2E8F0] mb-4">
              <img
                src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1795175801/Suno_bharat_front_and_back_2_lavogj.png"
                alt="Suno Bharat Book"
                className="w-16 h-16 object-contain shrink-0"
              />
              <div>
                <div className={`${poppins.className} text-sm font-bold text-[#000080]`}>
                  Suno Bharat Anthology
                </div>
                <div className="text-xs text-[#718096]">Collector&apos;s Print Edition</div>
              </div>
            </div>

            <div className="space-y-2.5 text-sm pb-4 border-b border-[#E2E8F0]">
              <div className="flex justify-between text-[#1A202C] font-medium">
                <span>Suno Bharat Anthology Book</span>
                <span className="font-semibold">₹{basePrice}</span>
              </div>
              <div className="flex justify-between text-[#1A202C]">
                <span>Publication Certificate</span>
                <span className="text-[#138808] font-semibold">FREE</span>
              </div>
              <div className="flex justify-between text-[#1A202C]">
                <span>Free Entry to Next Contest</span>
                <span className="text-[#138808] font-semibold">FREE</span>
              </div>
              <div className="flex justify-between text-[#1A202C]">
                <span>Shipping All Over India</span>
                <span className="text-[#138808] font-semibold">FREE</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-4">
              <span className="font-bold text-[#1A202C]">Total Payable</span>
              <span className={`${poppins.className} text-2xl font-extrabold text-[#000080]`}>
                ₹{totalAmount}
              </span>
            </div>

            <button
              form="checkout-form"
              type="submit"
              disabled={paymentStatus !== 'idle' && paymentStatus !== 'failed'}
              className={`${poppins.className} w-full bg-[#000080] hover:bg-[#1A202C] text-white py-3.5 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-70`}
            >
              {paymentStatus === 'idle' || paymentStatus === 'failed' ? (
                <>
                  Pay ₹{totalAmount} Securely <Lock className="w-4 h-4 text-[#FF9933]" />
                </>
              ) : (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {paymentStatus === 'creating' && 'Creating Order...'}
                  {paymentStatus === 'paying' && 'Completing Payment...'}
                  {paymentStatus === 'verifying' && 'Verifying...'}
                </>
              )}
            </button>

            <p className="text-[11px] text-center text-[#718096] mt-3">
              UPI, Cards &amp; NetBanking supported via Cashfree
            </p>

            <div className="mt-4 pt-3.5 border-t border-[#E2E8F0] bg-[#F0FFF4] rounded-lg p-3 text-center">
              <div className="text-xs font-bold text-[#138808]">
                ✓ 98.5% Success Delivery Rate
              </div>
              <div className="text-[11px] font-medium text-[#000080] mt-0.5">
                2,345+ Parcels Delivered to Writers Till Now
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
