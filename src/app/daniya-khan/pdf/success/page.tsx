"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

interface PdfOrderDetails {
  order_id: string;
  order_status: string;
  order_amount: number;
  customer_name: string;
  customer_email: string;
  bundle: string;
  quantity: string;
}

function PdfSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("order_id");

  const [status, setStatus] = useState<"loading" | "paid" | "pending" | "failed">("loading");
  const [orderData, setOrderData] = useState<PdfOrderDetails | null>(null);

  useEffect(() => {
    if (!orderId) {
      const saved = localStorage.getItem("daniya_pdf_last_order_id");
      if (saved) {
        router.replace(`/daniya-khan/pdf/success?order_id=${saved}`);
        return;
      }
      setStatus("failed");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(`/api/daniya-khan/pdf/verify-order?order_id=${orderId}`);
        const data = await res.json();

        if (data.order_status === "PAID") {
          setStatus("paid");
          setOrderData(data);
          if (orderId) {
            localStorage.setItem("daniya_pdf_last_order_id", orderId);
          }
          // Fire confetti safely on client side
          import("canvas-confetti").then((confettiModule) => {
            const fireConfetti = confettiModule.default || confettiModule;
            fireConfetti({
              particleCount: 120,
              spread: 80,
              origin: { y: 0.6 },
              colors: ["#F2A7B0", "#A8D8C0", "#F7E56B", "#1A1A1A"],
            });
          }).catch(() => {});
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
  }, [orderId, router]);

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const handleOrderMore = () => {
    localStorage.removeItem("daniya_pdf_last_order_id");
    router.push("/daniya-khan/pdf");
  };

  // High-Resolution PDF Download Asset Link
  const pdfDownloadUrl = "https://res.cloudinary.com/dde8ekuuu/image/upload/v1785695857/Untitled_design_52_1_kymdoi.png";

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#1A1A1A] font-serif py-12 px-5 selection:bg-[#F2A7B0] selection:text-[#1A1A1A]">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/daniya-khan/pdf" className="font-display italic text-2xl font-bold text-[#1A1A1A]">
            Inkfetish Publication
          </Link>
          <p className="font-ui text-xs text-[#888] uppercase tracking-widest mt-1">Official E-Book Delivery Portal</p>
        </div>

        {status === "loading" && (
          <div className="text-center py-20 bg-white border-2 border-[#1A1A1A] rounded-2xl p-8 shadow-[6px_6px_0px_#1A1A1A]">
            <div className="w-12 h-12 border-4 border-[#1A1A1A] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="font-ui font-bold text-base text-[#1A1A1A]">Verifying your PDF payment...</p>
            <p className="font-ui text-xs text-[#777] mt-1">Unlocking your download link directly from Cashfree.</p>
          </div>
        )}

        {status === "paid" && (
          <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }} className="space-y-8">
            
            {/* Main Success & Instant Download Card */}
            <motion.div variants={fadeUp} className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-6 md:p-10 shadow-[8px_8px_0px_#1A1A1A] text-center relative overflow-hidden">
              <div className="w-20 h-20 bg-[#A8D8C0] border-2 border-[#1A1A1A] rounded-full flex items-center justify-center text-4xl mx-auto mb-5 shadow-[3px_3px_0px_#1A1A1A]">
                🎉
              </div>

              <span className="bg-[#A8D8C0] border border-[#1A1A1A] text-[#1A1A1A] px-3.5 py-1 rounded-full font-ui font-bold text-xs">
                ✓ PAYMENT CONFIRMED
              </span>

              <h1 className="font-display italic text-4xl md:text-5xl text-[#1A1A1A] mt-3">
                Your E-Book is Ready!
              </h1>

              <p className="font-ui text-sm text-[#555] max-w-md mx-auto mt-2 leading-relaxed">
                Thank you for pre-ordering <strong className="text-[#1A1A1A]">Deserted Hearts (Digital PDF Edition)</strong> by Daniya Khan. Click below to download your PDF instantly.
              </p>

              {/* INSTANT DOWNLOAD BUTTON */}
              <div className="my-8">
                <a
                  href={pdfDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Deserted_Hearts_Daniya_Khan_Edition.pdf"
                  className="inline-block w-full max-w-md bg-[#1A1A1A] text-[#F5F0E8] border-2 border-[#1A1A1A] rounded-full py-4 px-8 font-ui font-bold text-base hover:bg-[#F2A7B0] hover:text-[#1A1A1A] transition-all shadow-[4px_4px_0px_#A8D8C0] text-center"
                >
                  📥 DOWNLOAD DIGITAL PDF E-BOOK NOW
                </a>
                <p className="font-ui text-xs text-[#888] mt-2">
                  A backup download copy has also been dispatched to <strong>{orderData?.customer_email}</strong>.
                </p>
              </div>

              {/* Order Metadata Table */}
              <div className="bg-[#F5F0E8] border-2 border-[#1A1A1A] rounded-xl p-5 text-left font-ui text-xs space-y-2 text-[#444]">
                <div className="flex justify-between border-b border-[#DDD] pb-2">
                  <span className="text-[#888]">Order ID:</span>
                  <span className="font-mono font-bold text-[#1A1A1A]">{orderData?.order_id}</span>
                </div>
                <div className="flex justify-between border-b border-[#DDD] pb-2">
                  <span className="text-[#888]">Customer Name:</span>
                  <span className="font-bold text-[#1A1A1A]">{orderData?.customer_name}</span>
                </div>
                <div className="flex justify-between border-b border-[#DDD] pb-2">
                  <span className="text-[#888]">Pass Type:</span>
                  <span className="font-bold text-[#1A1A1A]">
                    {orderData?.bundle === "pdf_bundle" ? "PDF Collector Bundle" : "Digital PDF Edition"}
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-[#888]">Total Amount Paid:</span>
                  <span className="font-bold text-base text-[#1A1A1A]">₹{orderData?.order_amount}</span>
                </div>
              </div>
            </motion.div>

            {/* Included Digital Bonuses */}
            <motion.div variants={fadeUp} className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-6 md:p-8 shadow-[6px_6px_0px_#1A1A1A]">
              <h2 className="font-display italic text-2xl text-[#1A1A1A] mb-4 text-center">
                Your Unlocked Digital Bonuses
              </h2>
              <div className="space-y-3 font-ui">
                <div className="flex items-center gap-4 p-4 border-2 border-[#1A1A1A] rounded-xl bg-[#FDFBF7]">
                  <span className="text-2xl">📖</span>
                  <div>
                    <p className="font-bold text-sm text-[#1A1A1A]">The Lost Chapter (Digital Edition)</p>
                    <p className="text-xs text-[#777]">Included inside your PDF file automatically.</p>
                  </div>
                  <span className="ml-auto text-[#A8D8C0] font-bold text-sm">UNLOCKED ✓</span>
                </div>

                {orderData?.bundle === "pdf_bundle" && (
                  <>
                    <div className="flex items-center gap-4 p-4 border-2 border-[#1A1A1A] rounded-xl bg-[#FDFBF7]">
                      <span className="text-2xl">🔖</span>
                      <div>
                        <p className="font-bold text-sm text-[#1A1A1A]">Printable Aesthetic Bookmarks PDF</p>
                        <p className="text-xs text-[#777]">High-res printable bookmarks set.</p>
                      </div>
                      <span className="ml-auto text-[#A8D8C0] font-bold text-sm">UNLOCKED ✓</span>
                    </div>

                    <div className="flex items-center gap-4 p-4 border-2 border-[#1A1A1A] rounded-xl bg-[#FDFBF7]">
                      <span className="text-2xl">🎙️</span>
                      <div>
                        <p className="font-bold text-sm text-[#1A1A1A]">Exclusive Author Audio Poem Track</p>
                        <p className="text-xs text-[#777]">Listen to Daniya read her favourite poem.</p>
                      </div>
                      <span className="ml-auto text-[#A8D8C0] font-bold text-sm">UNLOCKED ✓</span>
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/daniya-khan"
                className="px-8 py-4 bg-[#F7E56B] border-2 border-[#1A1A1A] rounded-full font-ui font-bold text-sm text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F5F0E8] transition-all shadow-[3px_3px_0px_#1A1A1A] text-center"
              >
                📚 Prefer Physical Paperback? Order Signed Book (₹229) ↗
              </Link>
              <button
                onClick={handleOrderMore}
                className="px-8 py-4 bg-[#A8D8C0] border-2 border-[#1A1A1A] rounded-full font-ui font-bold text-sm text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F5F0E8] transition-all shadow-[3px_3px_0px_#1A1A1A]"
              >
                🛒 Buy Another PDF Copy / Reset
              </button>
            </motion.div>
          </motion.div>
        )}

        {status === "pending" && (
          <div className="text-center py-16 bg-white border-2 border-[#1A1A1A] rounded-2xl p-8 shadow-[6px_6px_0px_#1A1A1A]">
            <div className="text-5xl mb-4">⏳</div>
            <h2 className="font-display italic text-3xl text-[#1A1A1A] mb-2">Payment Verification in Progress</h2>
            <p className="font-ui text-sm text-[#777] mb-6">Cashfree is processing your payment. Please refresh in a moment.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-[#F7E56B] border-2 border-[#1A1A1A] rounded-full font-ui font-bold text-sm shadow-[3px_3px_0px_#1A1A1A]"
            >
              Refresh Payment Status
            </button>
          </div>
        )}

        {status === "failed" && (
          <div className="text-center py-16 bg-white border-2 border-[#1A1A1A] rounded-2xl p-8 shadow-[6px_6px_0px_#1A1A1A]">
            <div className="text-5xl mb-4">⚠️</div>
            <h2 className="font-display italic text-3xl text-[#1A1A1A] mb-2">Payment Verification Failed</h2>
            <p className="font-ui text-sm text-[#777] mb-6">We could not verify a completed PDF order for this session.</p>
            <button
              onClick={handleOrderMore}
              className="px-8 py-3 bg-[#F2A7B0] border-2 border-[#1A1A1A] rounded-full font-ui font-bold text-sm shadow-[3px_3px_0px_#1A1A1A]"
            >
              Return to PDF Pass Page ↗
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DaniyaKhanPdfSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center text-[#1A1A1A] font-ui font-bold">Loading Download Portal...</div>}>
      <PdfSuccessContent />
    </Suspense>
  );
}
