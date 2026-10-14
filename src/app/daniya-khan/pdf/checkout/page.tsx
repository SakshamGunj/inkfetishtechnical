"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

declare global {
  interface Window {
    Cashfree: (config: { mode: "sandbox" | "production" }) => {
      checkout: (options: {
        paymentSessionId: string;
        redirectTarget?: string;
      }) => Promise<{
        error?: { message: string };
        redirect?: boolean;
      }>;
    };
  }
}

function PdfCheckoutForm() {
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [payError, setPayError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Load Cashfree SDK & check existing paid PDF order
  useEffect(() => {
    const savedOrderId = localStorage.getItem("daniya_pdf_last_order_id");
    if (savedOrderId) {
      fetch(`/api/daniya-khan/pdf/verify-order?order_id=${savedOrderId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.order_status === "PAID") {
            router.push(`/daniya-khan/pdf/success?order_id=${savedOrderId}`);
          }
        })
        .catch(() => {});
    }

    if (document.getElementById("cashfree-sdk")) {
      setSdkReady(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "cashfree-sdk";
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.onload = () => setSdkReady(true);
    document.head.appendChild(script);
  }, [router]);

  const unitPrice = 99;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10) e.phone = "10-digit phone/mobile required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePay = async () => {
    setPayError("");
    if (!validate()) return;
    if (!sdkReady || !window.Cashfree) {
      setPayError("Payment SDK not loaded. Please refresh and try again.");
      return;
    }

    setLoading(true);
    try {
      // Create PDF order
      const orderRes = await fetch("/api/daniya-khan/pdf/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          bundleType: "pdf_only",
          quantity: quantity,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.payment_session_id) {
        setPayError(orderData.error || "Failed to create order. Please try again.");
        setLoading(false);
        return;
      }

      // Track order ID in localStorage
      localStorage.setItem("daniya_pdf_last_order_id", orderData.order_id);

      // Open Cashfree checkout modal
      const cashfree = window.Cashfree({
        mode: process.env.NODE_ENV === "production" ? "production" : "sandbox",
      });

      const result = await cashfree.checkout({
        paymentSessionId: orderData.payment_session_id,
        redirectTarget: "_modal",
      });

      if (result.error) {
        setPayError(result.error.message || "Payment failed. Please try again.");
        setLoading(false);
        return;
      }

      // Verify on backend
      const verifyRes = await fetch(`/api/daniya-khan/pdf/verify-order?order_id=${orderData.order_id}`);
      const verifyData = await verifyRes.json();

      if (verifyData.order_status === "PAID") {
        localStorage.setItem("daniya_pdf_last_order_id", orderData.order_id);
        router.push(`/daniya-khan/pdf/success?order_id=${orderData.order_id}`);
      } else {
        setPayError("Payment could not be confirmed. If amount was debited, contact us.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setPayError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#1A1A1A] font-serif selection:bg-[#F2A7B0] selection:text-[#1A1A1A] py-10 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-8 pb-4 border-b-2 border-[#1A1A1A]">
        <Link href="/daniya-khan/pdf" className="font-display italic text-xl font-bold text-[#1A1A1A]">
          ← Deserted Hearts (PDF)
        </Link>
        <div className="flex items-center gap-2 font-ui text-xs">
          <span className="bg-[#A8D8C0] text-[#1A1A1A] border border-[#1A1A1A] px-3 py-1 rounded-full font-bold">
            ⚡ Instant PDF Access
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-display italic text-4xl text-[#1A1A1A]">
            Digital PDF E-Book Checkout
          </h1>
          <p className="font-ui text-xs text-[#666] mt-2">
            Supports Indian Readers (UPI / Cards) & International Readers (Cards / Cross-Border)
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white border-2 border-[#1A1A1A] rounded-2xl p-6 md:p-8 shadow-[6px_6px_0px_#1A1A1A]">
            <div className="mb-6 pb-4 border-b-2 border-dashed border-[#DDD]">
              <h2 className="font-display italic text-2xl text-[#1A1A1A]">Customer Info</h2>
              <p className="font-ui text-xs text-[#777] mt-0.5">Where should we deliver your PDF copy & receipt?</p>
            </div>

            <div className="space-y-4 font-ui">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-[#333]">
                  Full Name <span className="text-[#E05555]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ananya Sharma / John Smith"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border-2 font-ui text-sm focus:outline-none ${errors.name ? "border-[#E05555] bg-[#FFF0F0]" : "border-[#1A1A1A]"}`}
                />
                {errors.name && <p className="text-[#E05555] text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-[#333]">
                  Email Address <span className="text-[#E05555]">*</span>
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border-2 font-ui text-sm focus:outline-none ${errors.email ? "border-[#E05555] bg-[#FFF0F0]" : "border-[#1A1A1A]"}`}
                />
                <p className="text-[11px] text-[#888] mt-1">PDF download link & receipt backup will be sent here.</p>
                {errors.email && <p className="text-[#E05555] text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-[#333]">
                  Mobile / WhatsApp Number <span className="text-[#E05555]">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Mobile number (with country code if outside India)"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border-2 font-ui text-sm focus:outline-none ${errors.phone ? "border-[#E05555] bg-[#FFF0F0]" : "border-[#1A1A1A]"}`}
                />
                {errors.phone && <p className="text-[#E05555] text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            {payError && (
              <div className="mt-6 p-4 border-2 border-[#E05555] rounded-xl bg-[#FFF0F0] text-[#E05555] text-sm font-ui">
                ⚠️ {payError}
              </div>
            )}

            <div className="mt-8">
              <button
                disabled={loading}
                onClick={handlePay}
                className="pill-pay-btn w-full py-4 text-center"
              >
                {loading ? "Processing Payment..." : `🔒 Pay ₹${unitPrice * quantity} / $${(1.99 * quantity).toFixed(2)} & Download PDF`}
              </button>
              <p className="text-center text-xs text-[#AAA] mt-3 font-ui">
                🇮🇳 UPI · Card · NetBanking · 🌍 International Cards
              </p>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 bg-[#F5F0E8] border-2 border-[#1A1A1A] rounded-2xl overflow-hidden shadow-[6px_6px_0px_#1A1A1A] sticky top-8">
            <div className="bg-[#1A1A1A] p-6 flex items-center gap-4 text-white">
              <div className="w-14 shrink-0">
                <img
                  src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1785695857/Untitled_design_52_1_kymdoi.png"
                  alt="Deserted Hearts PDF"
                  className="w-full h-auto drop-shadow-md"
                />
              </div>
              <div>
                <h3 className="font-display italic text-lg leading-tight text-white">Deserted Hearts</h3>
                <p className="font-ui text-xs text-[#999] mt-0.5">Daniya Khan · Digital PDF Edition</p>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full border border-white/20 text-[#F7E56B] text-[10px] font-ui font-bold bg-white/10">
                  HD PDF E-Book
                </span>
              </div>
            </div>

            <div className="p-5 space-y-3 font-ui">
              <div className="flex items-center gap-3 text-sm text-[#555]">
                <span>📄</span>
                <span>Full HD PDF E-Book Download</span>
                <span className="ml-auto text-[#A8D8C0] font-bold text-xs">✓</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#555]">
                <span>📖</span>
                <span>The Lost Chapter (Digital Bonus)</span>
                <span className="ml-auto text-[#A8D8C0] font-bold text-xs">✓</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#555]">
                <span>📱</span>
                <span>Read on Phone, Tablet & Kindle</span>
                <span className="ml-auto text-[#A8D8C0] font-bold text-xs">✓</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#555]">
                <span>⚡</span>
                <span>Instant On-Screen Download</span>
                <span className="ml-auto text-[#A8D8C0] font-bold text-xs">✓</span>
              </div>
            </div>

            <div className="border-t-2 border-dashed border-[#D8D0C0] mx-5" />
            <div className="p-5 space-y-2 font-ui">
              <div className="flex justify-between text-sm text-[#777]">
                <span>Indian Price</span>
                <span>₹{unitPrice} INR</span>
              </div>
              <div className="flex justify-between text-sm text-[#777]">
                <span>International Price</span>
                <span>$1.99 USD</span>
              </div>
              <div className="flex justify-between items-center text-sm text-[#777]">
                <span>Quantity</span>
                <div className="flex items-center gap-2 bg-white border border-[#1A1A1A] rounded-full px-2 py-0.5">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-4 h-4 rounded-full bg-[#F5F0E8] border border-[#1A1A1A] text-xs font-bold flex items-center justify-center hover:bg-[#F2A7B0]"
                  >
                    -
                  </button>
                  <span className="font-ui font-bold text-xs text-[#1A1A1A] min-w-[12px] text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-4 h-4 rounded-full bg-[#F5F0E8] border border-[#1A1A1A] text-xs font-bold flex items-center justify-center hover:bg-[#A8D8C0]"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex justify-between text-sm text-[#777]">
                <span>Delivery</span>
                <span className="text-[#A8D8C0] font-bold">Instant Download</span>
              </div>
              <div className="flex justify-between font-bold text-[#1A1A1A] text-base pt-2 border-t border-[#D8D0C0]">
                <span>Total Amount</span>
                <span>₹{unitPrice * quantity} / ${(1.99 * quantity).toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-[#1A1A1A]/5 px-5 py-4 flex items-center gap-2 text-xs text-[#777] font-ui border-t border-[#D8D0C0]">
              🔒 Secured by Cashfree · Instant Global Access
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DaniyaKhanPdfCheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center text-[#1A1A1A] font-ui font-bold">Loading PDF Checkout...</div>}>
      <PdfCheckoutForm />
    </Suspense>
  );
}
