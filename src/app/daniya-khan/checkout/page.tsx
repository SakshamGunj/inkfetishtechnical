"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

/* ─────────────────────────────────────────────────────────────────────────
   DANIYA KHAN — PRE-ORDER CHECKOUT PAGE
   Route: /daniya-khan/checkout
   Uses: Cashfree.js v3 Drop-in (_modal mode)
──────────────────────────────────────────────────────────────────────────*/

declare global {
  interface Window {
    Cashfree: (config: { mode: string }) => {
      checkout: (opts: { paymentSessionId: string; redirectTarget: string }) => Promise<{
        error?: { message: string; type: string };
        redirect?: boolean;
        paymentDetails?: unknown;
      }>;
    };
  }
}

const BUNDLES = [
  {
    id: "standard",
    label: "First Edition Paperback",
    price: 299,
    strikePrice: 699,
    perks: [
      { icon: "✍️", text: "Officially Signed & Stamped Copy by Daniya" },
      { icon: "📚", text: "First Edition Paperback" },
      { icon: "📖", text: "The Lost Chapter (Digital)" },
      { icon: "🎟️", text: "Entry in ₹30,000 Lucky Draw" },
      { icon: "📦", text: "Free tracked shipping (Pan-India)" },
    ],
    badge: "Book Only",
    badgeColor: "#A8D8C0",
  },
  {
    id: "signed",
    label: "Elite Mystery Box",
    price: 599,
    strikePrice: 1299,
    perks: [
      { icon: "✍️", text: "Officially Signed & Stamped Copy by Daniya" },
      { icon: "🎁", text: "Book + 2 Secret Mystery Items" },
      { icon: "🎟️", text: "Entry in ₹30,000 Lucky Draw" },
      { icon: "📦", text: "Free tracked shipping (Pan-India)" },
    ],
    badge: "Most Popular",
    badgeColor: "#F7E56B",
  },
  {
    id: "grand",
    label: "Platinum Mystery Box",
    price: 999,
    strikePrice: 2499,
    perks: [
      { icon: "✍️", text: "Officially Signed & Stamped Copy by Daniya" },
      { icon: "👑", text: "Book + 4 Secret Mystery Items" },
      { icon: "🎟️", text: "2x Entries in ₹30,000 Lucky Draw" },
      { icon: "📦", text: "Hardcover Gift Box + Priority Delivery" },
    ],
    badge: "Platinum Experience",
    badgeColor: "#B497D6",
  },
];

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
  "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
  "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
  "Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
  "Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Chandigarh","Puducherry",
  "Jammu & Kashmir","Ladakh","Andaman & Nicobar","Lakshadweep",
];

export default function CheckoutPage() {
  const router = useRouter();
  const [selectedBundle, setSelectedBundle] = useState<"standard" | "signed" | "grand">("signed");
  const [quantity, setQuantity] = useState(1);
  const [step, setStep] = useState<1 | 2>(1); // 1 = bundle select, 2 = form+pay
  const [loading, setLoading] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [payError, setPayError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Load Cashfree SDK & check existing paid order
  useEffect(() => {
    const savedOrderId = localStorage.getItem("daniya_last_order_id");
    if (savedOrderId) {
      fetch(`/api/daniya-khan/verify-order?order_id=${savedOrderId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.order_status === "PAID") {
            router.push(`/daniya-khan/success?order_id=${savedOrderId}`);
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

  const bundle = BUNDLES.find((b) => b.id === selectedBundle)!;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10) e.phone = "10-digit phone required";
    if (!form.address1.trim()) e.address1 = "Address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.state) e.state = "State is required";
    if (!form.pincode.trim() || form.pincode.replace(/\D/g, "").length !== 6) e.pincode = "Valid 6-digit pincode required";
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
      // Step 1: Create order
      const orderRes = await fetch("/api/daniya-khan/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          addressLine1: form.address1,
          addressLine2: form.address2,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
          bundleType: selectedBundle,
          quantity: quantity,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.payment_session_id) {
        setPayError(orderData.error || "Failed to create order. Please try again.");
        setLoading(false);
        return;
      }

      // Save generated order ID to localStorage to track payment attempt
      localStorage.setItem("daniya_last_order_id", orderData.order_id);

      // Step 2: Open Cashfree checkout modal
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

      // Step 3: Always verify on backend
      const verifyRes = await fetch(`/api/daniya-khan/verify-order?order_id=${orderData.order_id}`);
      const verifyData = await verifyRes.json();

      if (verifyData.order_status === "PAID") {
        localStorage.setItem("daniya_last_order_id", orderData.order_id);
        router.push(`/daniya-khan/success?order_id=${orderData.order_id}`);
      } else {
        setPayError("Payment could not be confirmed. If amount was debited, contact us.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setPayError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Instrument Serif', serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        .font-ui { font-family: 'Space Grotesk', sans-serif; }

        .checkout-input {
          width: 100%;
          background: #fff;
          border: 2px solid #D8D0C0;
          border-radius: 12px;
          padding: 13px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #1A1A1A;
          outline: none;
          transition: border-color 0.2s;
        }
        .checkout-input:focus { border-color: #1A1A1A; }
        .checkout-input.error { border-color: #E05555; }
        .checkout-input::placeholder { color: #AAA; }

        .checkout-select {
          width: 100%;
          background: #fff;
          border: 2px solid #D8D0C0;
          border-radius: 12px;
          padding: 13px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #1A1A1A;
          outline: none;
          appearance: none;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .checkout-select:focus { border-color: #1A1A1A; }
        .checkout-select.error { border-color: #E05555; }

        .pill-pay-btn {
          width: 100%;
          background: #1A1A1A;
          color: #F5F0E8;
          border: 2px solid #1A1A1A;
          border-radius: 100px;
          padding: 17px 32px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .pill-pay-btn:hover:not(:disabled) {
          background: #333;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.18);
        }
        .pill-pay-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .bundle-card {
          border: 2px solid #D8D0C0;
          border-radius: 20px;
          padding: 24px;
          cursor: pointer;
          transition: all 0.2s;
          background: #FDFBF7;
          position: relative;
        }
        .bundle-card.selected {
          border-color: #1A1A1A;
          box-shadow: 4px 4px 0px #1A1A1A;
          background: #F5F0E8;
          transform: translate(-2px, -2px);
        }
        .bundle-card:hover:not(.selected) { border-color: #888; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 20px; height: 20px;
          border: 2px solid rgba(245,240,232,0.3);
          border-top-color: #F5F0E8;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .step-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #F5F0E8;
          border: 2px solid #1A1A1A;
          border-radius: 100px;
          padding: 6px 16px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 12px;
          color: #1A1A1A;
        }
        .step-pill.active { background: #1A1A1A; color: #F5F0E8; }
      `}</style>

      <div className="min-h-screen bg-[#F5F0E8] font-body">
        {/* Top nav bar */}
        <div className="border-b-2 border-[#1A1A1A] bg-[#F5F0E8] px-3.5 sm:px-5 py-3 sm:py-4 flex items-center justify-between gap-2">
          <button
            onClick={() => (step === 2 ? setStep(1) : router.push("/daniya-khan"))}
            className="font-ui text-xs sm:text-sm font-medium text-[#777] hover:text-[#1A1A1A] transition-colors flex items-center gap-1 shrink-0"
          >
            ← {step === 2 ? "Change bundle" : "Back to book"}
          </button>
          <div className="font-display italic text-base sm:text-lg truncate hidden xs:block">Deserted Hearts</div>
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <span className={`step-pill ${step === 1 ? "active" : ""}`}>1 Bundle</span>
            <span className="text-[#CCC] text-xs">—</span>
            <span className={`step-pill ${step === 2 ? "active" : ""}`}>2 Details</span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-5 py-10">
          <AnimatePresence mode="wait">
            {/* ── STEP 1: BUNDLE SELECTION ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -20 }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
              >
                <motion.div variants={fadeUp} className="text-center mb-10">
                  <p className="font-ui text-sm text-[#888] uppercase tracking-widest mb-2">Step 1 of 2</p>
                  <h1 className="font-display italic text-4xl md:text-5xl text-[#1A1A1A]">
                    Choose your bundle.
                  </h1>
                  <p className="text-[#777] mt-3">All bonuses vanish on launch day.</p>
                </motion.div>

                <motion.div variants={fadeUp} className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mb-8">
                  {BUNDLES.map((b) => (
                    <div
                      key={b.id}
                      className={`bundle-card ${selectedBundle === b.id ? "selected" : ""}`}
                      onClick={() => setSelectedBundle(b.id as "standard" | "signed" | "grand")}
                    >
                      {/* Badge */}
                      <div
                        className="absolute -top-3 left-6 px-3 py-1 rounded-full border-2 border-[#1A1A1A] text-[11px] font-ui font-bold"
                        style={{ background: b.badgeColor }}
                      >
                        {b.badge}
                      </div>

                      {/* Radio indicator */}
                      <div className="flex items-start justify-between mb-5 mt-2">
                        <h3 className="font-display italic text-2xl text-[#1A1A1A]">{b.label}</h3>
                        <div
                          className="w-6 h-6 rounded-full border-2 border-[#1A1A1A] flex items-center justify-center shrink-0 mt-1"
                          style={{ background: selectedBundle === b.id ? "#1A1A1A" : "transparent" }}
                        >
                          {selectedBundle === b.id && <div className="w-2.5 h-2.5 rounded-full bg-[#F5F0E8]" />}
                        </div>
                      </div>

                      <ul className="space-y-2.5 mb-6">
                        {b.perks.map((p, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm text-[#555]">
                            <span className="text-lg">{p.icon}</span>
                            <span>{p.text}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="border-t-2 border-dashed border-[#D8D0C0] pt-5 flex items-end justify-between">
                        <div>
                          <p className="font-ui text-xs text-[#AAA] line-through mb-0.5">₹{b.strikePrice}</p>
                          <p className="font-display italic text-3xl text-[#1A1A1A]">₹{b.price}</p>
                          <p className="font-ui text-xs text-[#888]">incl. free shipping</p>
                        </div>
                        {selectedBundle === b.id && (
                          <span className="bg-[#A8D8C0] border-2 border-[#1A1A1A] rounded-full px-3 py-1 text-[11px] font-ui font-bold">
                            ✓ Selected
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* Quantity Selector Box */}
                <motion.div variants={fadeUp} className="bg-[#FDFBF7] border-2 border-[#1A1A1A] rounded-2xl p-5 max-w-md mx-auto mb-8 shadow-[4px_4px_0px_#1A1A1A] flex items-center justify-between gap-4">
                  <div>
                    <p className="font-ui font-bold text-sm text-[#1A1A1A]">Select Quantity</p>
                    <p className="font-ui text-xs text-[#777] mt-0.5">Subtotal: <strong className="text-[#1A1A1A]">₹{bundle.price * quantity}</strong></p>
                  </div>
                  <div className="flex items-center gap-3 bg-[#F5F0E8] border-2 border-[#1A1A1A] rounded-full px-3.5 py-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 rounded-full bg-white border border-[#1A1A1A] font-bold text-sm flex items-center justify-center hover:bg-[#F2A7B0] transition-colors"
                    >
                      -
                    </button>
                    <span className="font-ui font-bold text-base w-5 text-center">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-7 h-7 rounded-full bg-white border border-[#1A1A1A] font-bold text-sm flex items-center justify-center hover:bg-[#A8D8C0] transition-colors"
                    >
                      +
                    </button>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="flex justify-center">
                  <button
                    onClick={() => setStep(2)}
                    className="pill-pay-btn max-w-sm"
                    style={{ borderRadius: "100px" }}
                  >
                    Continue to Details (₹{bundle.price * quantity}) →
                  </button>
                </motion.div>
              </motion.div>
            )}

            {/* ── STEP 2: FORM + PAYMENT ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial="hidden"
                animate="show"
                exit={{ opacity: 0 }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
                className="grid md:grid-cols-[1fr_340px] gap-8 items-start"
              >
                {/* Left: Form */}
                <div>
                  <motion.div variants={fadeUp} className="mb-8">
                    <p className="font-ui text-sm text-[#888] uppercase tracking-widest mb-2">Step 2 of 2</p>
                    <h1 className="font-display italic text-4xl text-[#1A1A1A]">Your details.</h1>
                    <p className="text-[#777] mt-1">We need these to dispatch your copy.</p>
                  </motion.div>

                  {/* Contact */}
                  <motion.div variants={fadeUp} className="mb-8">
                    <h3 className="font-ui font-semibold text-sm uppercase tracking-widest text-[#888] mb-4">
                      Contact Info
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="font-ui text-sm font-medium text-[#1A1A1A] mb-1.5 block">Full Name *</label>
                        <input
                          className={`checkout-input ${errors.name ? "error" : ""}`}
                          placeholder="Daniya Khan"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                        {errors.name && <p className="text-[#E05555] text-xs mt-1">{errors.name}</p>}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="font-ui text-sm font-medium text-[#1A1A1A] mb-1.5 block">Email *</label>
                          <input
                            type="email"
                            className={`checkout-input ${errors.email ? "error" : ""}`}
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                          />
                          {errors.email && <p className="text-[#E05555] text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div>
                          <label className="font-ui text-sm font-medium text-[#1A1A1A] mb-1.5 block">Phone *</label>
                          <input
                            type="tel"
                            className={`checkout-input ${errors.phone ? "error" : ""}`}
                            placeholder="9999999999"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          />
                          {errors.phone && <p className="text-[#E05555] text-xs mt-1">{errors.phone}</p>}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Shipping Address */}
                  <motion.div variants={fadeUp} className="mb-8">
                    <h3 className="font-ui font-semibold text-sm uppercase tracking-widest text-[#888] mb-4">
                      Shipping Address
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="font-ui text-sm font-medium text-[#1A1A1A] mb-1.5 block">Address Line 1 *</label>
                        <input
                          className={`checkout-input ${errors.address1 ? "error" : ""}`}
                          placeholder="Flat / House No., Street"
                          value={form.address1}
                          onChange={(e) => setForm({ ...form, address1: e.target.value })}
                        />
                        {errors.address1 && <p className="text-[#E05555] text-xs mt-1">{errors.address1}</p>}
                      </div>

                      <div>
                        <label className="font-ui text-sm font-medium text-[#1A1A1A] mb-1.5 block">
                          Address Line 2 <span className="text-[#AAA] font-normal">(Optional)</span>
                        </label>
                        <input
                          className="checkout-input"
                          placeholder="Landmark, Area"
                          value={form.address2}
                          onChange={(e) => setForm({ ...form, address2: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="font-ui text-sm font-medium text-[#1A1A1A] mb-1.5 block">City *</label>
                          <input
                            className={`checkout-input ${errors.city ? "error" : ""}`}
                            placeholder="Mumbai"
                            value={form.city}
                            onChange={(e) => setForm({ ...form, city: e.target.value })}
                          />
                          {errors.city && <p className="text-[#E05555] text-xs mt-1">{errors.city}</p>}
                        </div>
                        <div>
                          <label className="font-ui text-sm font-medium text-[#1A1A1A] mb-1.5 block">Pincode *</label>
                          <input
                            className={`checkout-input ${errors.pincode ? "error" : ""}`}
                            placeholder="400001"
                            maxLength={6}
                            value={form.pincode}
                            onChange={(e) => setForm({ ...form, pincode: e.target.value.replace(/\D/g, "") })}
                          />
                          {errors.pincode && <p className="text-[#E05555] text-xs mt-1">{errors.pincode}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="font-ui text-sm font-medium text-[#1A1A1A] mb-1.5 block">State *</label>
                        <div className="relative">
                          <select
                            className={`checkout-select ${errors.state ? "error" : ""}`}
                            value={form.state}
                            onChange={(e) => setForm({ ...form, state: e.target.value })}
                          >
                            <option value="">Select your state</option>
                            {INDIAN_STATES.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#888]">▾</div>
                        </div>
                        {errors.state && <p className="text-[#E05555] text-xs mt-1">{errors.state}</p>}
                      </div>
                    </div>
                  </motion.div>

                  {/* Error message */}
                  <AnimatePresence>
                    {payError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mb-6 p-4 border-2 border-[#E05555] rounded-xl bg-[#FFF0F0] text-[#E05555] text-sm font-ui"
                      >
                        ⚠️ {payError}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    variants={fadeUp}
                    className="pill-pay-btn"
                    disabled={loading}
                    onClick={handlePay}
                  >
                    {loading ? (
                      <>
                        <div className="spinner" />
                        Processing...
                      </>
                    ) : (
                      <>🔒 Pay ₹{bundle.price * quantity} Securely</>
                    )}
                  </motion.button>

                  <p className="text-center text-xs text-[#AAA] mt-3 font-ui">
                    UPI · Card · NetBanking · PhonePe · Google Pay · Paytm
                  </p>
                </div>

                {/* Right: Order Summary */}
                <motion.div variants={fadeUp} className="sticky top-8">
                  <div
                    className="bg-[#F5F0E8] border-2 border-[#1A1A1A] rounded-2xl overflow-hidden"
                    style={{ boxShadow: "4px 4px 0px #1A1A1A" }}
                  >
                    {/* Book preview */}
                    <div className="bg-[#1A1A1A] p-6 flex items-center gap-5">
                      <div className="w-14 sm:w-16 shrink-0 relative">
                        <img
                          src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1785695857/Untitled_design_52_1_kymdoi.png"
                          alt="Deserted Hearts Book Cover"
                          className="w-full h-auto drop-shadow-md"
                        />
                      </div>
                      <div>
                        <p className="font-display italic text-[#F5F0E8] text-lg leading-tight">
                          Deserted Hearts
                        </p>
                        <p className="font-ui text-xs text-[#999] mt-1">Daniya Khan</p>
                        <div
                          className="mt-2 inline-block px-2 py-0.5 rounded-full border border-white/20 text-[#F7E56B] text-[10px] font-ui font-bold"
                          style={{ background: "rgba(247,229,107,0.1)" }}
                        >
                          {bundle.label}
                        </div>
                      </div>
                    </div>

                    {/* Perks list */}
                    <div className="p-5 space-y-3">
                      {bundle.perks.map((p, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm">
                          <span className="text-base">{p.icon}</span>
                          <span className="text-[#555]">{p.text}</span>
                          <span className="ml-auto text-[#A8D8C0] font-bold text-xs">✓</span>
                        </div>
                      ))}
                    </div>

                    {/* Price breakdown */}
                    <div className="border-t-2 border-dashed border-[#D8D0C0] mx-5" />
                    <div className="p-5 space-y-2">
                      <div className="flex justify-between text-sm text-[#777]">
                        <span>Unit Price ({bundle.label})</span>
                        <span>₹{bundle.price}</span>
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
                        <span>Shipping</span>
                        <span className="text-[#A8D8C0] font-bold">Free</span>
                      </div>
                      <div className="flex justify-between font-ui font-bold text-[#1A1A1A] text-base pt-2 border-t border-[#D8D0C0]">
                        <span>Total ({quantity} {quantity > 1 ? "items" : "item"})</span>
                        <span>₹{bundle.price * quantity}</span>
                      </div>
                    </div>

                    {/* Trust */}
                    <div className="bg-[#1A1A1A]/5 px-5 py-4 flex items-center gap-2 text-xs text-[#777] font-ui border-t border-[#D8D0C0]">
                      🔒 Secured by Cashfree · 256-bit SSL
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(1)}
                    className="w-full mt-4 text-center text-sm text-[#888] hover:text-[#1A1A1A] transition-colors font-ui underline underline-offset-2"
                  >
                    ← Switch bundle
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
