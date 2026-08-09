"use client";

import React, { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";

/* ─────────────────────────────────────────────────────────────────────────
   DANIYA KHAN — ORDER SUCCESS / CONFIRMATION PAGE
   Route: /daniya-khan/success?order_id=xxx
──────────────────────────────────────────────────────────────────────────*/

type OrderData = {
  order_status: string;
  order_amount: number;
  customer_name: string;
  customer_email: string;
  bundle: string;
  address: string;
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("order_id");

  const [status, setStatus] = useState<"loading" | "paid" | "pending" | "failed">("loading");
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    if (!orderId) {
      setStatus("failed");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(`/api/daniya-khan/verify-order?order_id=${orderId}`);
        const data = await res.json();

        if (data.order_status === "PAID") {
          setStatus("paid");
          setOrderData(data);
          if (orderId) {
            localStorage.setItem("daniya_last_order_id", orderId);
          }
          setTimeout(() => setConfetti(true), 300);
        } else if (data.order_status === "ACTIVE") {
          setStatus("pending");
        } else {
          setStatus("failed");
        }
      } catch {
        setStatus("failed");
      }
    };

    verify();
  }, [orderId]);

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Instrument Serif', serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        .font-ui { font-family: 'Space Grotesk', sans-serif; }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(var(--r, 0deg)); }
          50% { transform: translateY(-12px) rotate(var(--r, 0deg)); }
        }
        .float-1 { animation: float 4s ease-in-out infinite; }
        .float-2 { animation: float 5s ease-in-out infinite 1s; }
        .float-3 { animation: float 3.5s ease-in-out infinite 0.5s; }

        @keyframes confetti-fall {
          from { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          to { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        .confetti-piece {
          position: fixed;
          pointer-events: none;
          animation: confetti-fall linear forwards;
          z-index: 100;
        }

        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .pulse-ring {
          animation: pulse-ring 1.5s ease-out infinite;
        }

        .bonus-card {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px;
          background: #FDFBF7;
          border: 2px solid #E8DFD0;
          border-radius: 14px;
          transition: border-color 0.2s;
        }
        .bonus-card:hover { border-color: #1A1A1A; }
      `}</style>

      {/* Confetti */}
      {confetti && (
        <>
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                width: `${Math.random() * 10 + 6}px`,
                height: `${Math.random() * 10 + 6}px`,
                borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                background: ["#F2A7B0", "#A8D8C0", "#F7E56B", "#C4B5F0", "#FFD7A1"][Math.floor(Math.random() * 5)],
                animationDuration: `${Math.random() * 2 + 2}s`,
                animationDelay: `${Math.random() * 1}s`,
              }}
            />
          ))}
        </>
      )}

      <div className="min-h-screen bg-[#F5F0E8] font-body">
        {/* Nav */}
        <div className="border-b-2 border-[#1A1A1A] px-5 py-4 text-center">
          <span className="font-display italic text-lg">Deserted Hearts</span>
        </div>

        <div className="max-w-2xl mx-auto px-5 py-16">

          {/* LOADING */}
          {status === "loading" && (
            <div className="text-center py-20">
              <div className="w-16 h-16 border-2 border-[#D8D0C0] border-t-[#1A1A1A] rounded-full animate-spin mx-auto mb-4" />
              <p className="font-ui text-[#777]">Confirming your order...</p>
            </div>
          )}

          {/* SUCCESS */}
          {status === "paid" && (
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="text-center"
            >
              {/* Check circle with pulse */}
              <motion.div variants={fadeUp} className="relative w-24 h-24 mx-auto mb-8">
                <div className="absolute inset-0 bg-[#A8D8C0] rounded-full pulse-ring" />
                <div
                  className="relative w-24 h-24 bg-[#A8D8C0] rounded-full border-2 border-[#1A1A1A] flex items-center justify-center text-4xl"
                  style={{ boxShadow: "4px 4px 0px #1A1A1A" }}
                >
                  ✓
                </div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <span
                  className="inline-block bg-[#A8D8C0] border-2 border-[#1A1A1A] rounded-full px-4 py-1.5 text-xs font-ui font-bold mb-5"
                  style={{ boxShadow: "2px 2px 0px #1A1A1A" }}
                >
                  Order Confirmed 🎉
                </span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="font-display italic text-[clamp(36px,7vw,64px)] text-[#1A1A1A] leading-tight mb-3">
                Your copy is<br />on its way.
              </motion.h1>

              <motion.p variants={fadeUp} className="text-[#777] text-base mb-10 max-w-md mx-auto">
                {orderData?.customer_name ? `Hey ${orderData.customer_name.split(" ")[0]}, ` : ""}
                Thank you so much for pre-ordering. A confirmation email is headed to{" "}
                <strong className="text-[#1A1A1A]">{orderData?.customer_email}</strong> with your receipt and bonus download links.
              </motion.p>

              {/* Order summary card */}
              <motion.div
                variants={fadeUp}
                className="bg-[#FDFBF7] border-2 border-[#1A1A1A] rounded-2xl overflow-hidden text-left mb-8"
                style={{ boxShadow: "5px 5px 0px #1A1A1A" }}
              >
                <div className="bg-[#1A1A1A] px-6 py-4 flex items-center justify-between">
                  <span className="font-ui font-semibold text-[#F5F0E8] text-sm">Order Summary</span>
                  <span className="font-ui text-[#777] text-xs">#{orderId?.slice(-8)}</span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#555]">Bundle</span>
                    <span className="font-ui font-semibold capitalize">
                      {orderData?.bundle === "signed" ? "Signed + Dedication" : "First Edition"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#555]">Amount Paid</span>
                    <span className="font-ui font-bold text-[#1A1A1A]">₹{orderData?.order_amount}</span>
                  </div>
                  {orderData?.address && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#555]">Ships to</span>
                      <span className="font-ui text-[#1A1A1A] text-right max-w-[180px] leading-relaxed">{orderData.address}</span>
                    </div>
                  )}
                </div>

                <div className="border-t-2 border-dashed border-[#D8D0C0] mx-6" />

                <div className="px-6 py-4 flex items-center gap-2 text-xs text-[#888] font-ui">
                  📦 Dispatches on launch day · Tracked delivery · 3–5 business days
                </div>
              </motion.div>

              {/* What you unlock */}
              <motion.div variants={fadeUp} className="text-left mb-10">
                <h2 className="font-display italic text-2xl text-[#1A1A1A] mb-4 text-center">
                  Your exclusive bonuses are unlocked.
                </h2>
                <div className="space-y-3">
                  {[
                    { icon: "📖", title: "The Lost Chapter", desc: "Check your email for the secure download link. Available immediately." },
                    { icon: "🎙️", title: "VIP Q&A Invite", desc: "You'll receive the invite link 3 days before the session." },
                    ...(orderData?.bundle === "signed"
                      ? [{ icon: "✍️", title: "Signed Bookplate", desc: "Ships with your book on launch day." }]
                      : []),
                  ].map((b, i) => (
                    <div key={i} className="bonus-card">
                      <span className="text-2xl shrink-0">{b.icon}</span>
                      <div>
                        <p className="font-ui font-semibold text-sm text-[#1A1A1A]">{b.title}</p>
                        <p className="text-[#777] text-xs mt-0.5">{b.desc}</p>
                      </div>
                      <span className="ml-auto text-[#A8D8C0] font-bold text-sm shrink-0">✓</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Floating decorative elements */}
              <div className="relative h-16 mb-6 pointer-events-none select-none hidden md:block">
                <div className="absolute left-0 text-4xl float-1" style={{ "--r": "-10deg" } as React.CSSProperties}>🌸</div>
                <div className="absolute left-1/4 text-3xl float-2" style={{ "--r": "8deg" } as React.CSSProperties}>⭐</div>
                <div className="absolute right-1/4 text-4xl float-3" style={{ "--r": "-5deg" } as React.CSSProperties}>✨</div>
                <div className="absolute right-0 text-3xl float-1" style={{ "--r": "12deg" } as React.CSSProperties}>💌</div>
              </div>

              {/* Share / back buttons */}
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => {
                    localStorage.removeItem("daniya_last_order_id");
                    router.push("/daniya-khan");
                  }}
                  className="px-8 py-3.5 bg-[#A8D8C0] border-2 border-[#1A1A1A] rounded-full font-ui font-bold text-sm text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F5F0E8] transition-all shadow-[3px_3px_0px_#1A1A1A]"
                >
                  🛒 I want to order more copies →
                </button>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: "Deserted Hearts — Daniya Khan",
                        text: "I just pre-ordered Deserted Hearts by Daniya Khan! 📚",
                        url: window.location.origin + "/daniya-khan",
                      });
                    }
                  }}
                  className="px-8 py-3.5 bg-[#F2A7B0] border-2 border-[#1A1A1A] rounded-full font-ui font-bold text-sm transition-all hover:opacity-90 shadow-[3px_3px_0px_#1A1A1A]"
                >
                  📢 Tell a friend
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* PENDING */}
          {status === "pending" && (
            <div className="text-center py-16">
              <div className="text-5xl mb-6">⏳</div>
              <h2 className="font-display italic text-3xl text-[#1A1A1A] mb-3">Payment is being verified.</h2>
              <p className="text-[#777] mb-6">This usually takes a few seconds. Please don't close this tab.</p>
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-[#F7E56B] border-2 border-[#1A1A1A] rounded-full font-ui font-bold text-sm"
                style={{ boxShadow: "3px 3px 0px #1A1A1A" }}
              >
                Refresh Status
              </button>
            </div>
          )}

          {/* FAILED */}
          {status === "failed" && (
            <div className="text-center py-16">
              <div className="text-5xl mb-6">😔</div>
              <h2 className="font-display italic text-3xl text-[#1A1A1A] mb-3">Payment not confirmed.</h2>
              <p className="text-[#777] mb-2">
                If your payment was deducted, it will be automatically refunded within 5–7 business days.
              </p>
              <p className="text-[#777] mb-8 text-sm">
                Order reference: <code className="bg-[#E8E0D0] px-2 py-0.5 rounded text-xs">{orderId || "—"}</code>
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => router.push("/daniya-khan/checkout")}
                  className="px-8 py-3 bg-[#1A1A1A] text-[#F5F0E8] border-2 border-[#1A1A1A] rounded-full font-ui font-bold text-sm"
                >
                  Try again →
                </button>
                <button
                  onClick={() => router.push("/daniya-khan")}
                  className="px-8 py-3 border-2 border-[#1A1A1A] rounded-full font-ui font-semibold text-sm hover:bg-[#1A1A1A] hover:text-[#F5F0E8] transition-all"
                >
                  Back to book page
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#D8D0C0] border-t-[#1A1A1A] rounded-full animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
