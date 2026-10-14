"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────────────────────
   DANIYA KHAN — DIGITAL PDF E-BOOK EDITION
   Design: Editorial / Warm / Playful-Modern
   Palette: Cream (#F5F0E8), Ink (#1A1A1A), Accents (#F2A7B0, #A8D8C0, #F7E56B)
───────────────────────────────────────────────────────────────────────────── */

export default function DaniyaKhanPdfPage() {
  const router = useRouter();
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [stickyVisible, setStickyVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const floatY = useTransform(scrollY, [0, 600], [0, -40]);

  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);

    // Auto-redirect if user already completed a PDF purchase
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

    return () => window.removeEventListener("scroll", onScroll);
  }, [router]);

  /* ── Reusable animation variants ── */
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };

  const FloatingTag = ({
    children,
    className = "",
    rotate = 0,
  }: {
    children: React.ReactNode;
    className?: string;
    rotate?: number;
  }) => (
    <div
      className={`absolute bg-[#F7E8C3] border-2 border-[#1A1A1A] rounded-[14px] px-4 py-2 text-sm font-bold text-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A] whitespace-nowrap pointer-events-none ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </div>
  );

  const reviews = [
    {
      text: "I read it in one sitting. Every poem felt like she had been reading my diary. I cried so quietly my roommate didn't even notice.",
      name: "Ananya S.",
      city: "Mumbai, India",
      stars: 5,
    },
    {
      text: "Buying from Dubai was seamless! I got the PDF download link immediately. Daniya writes about heartbreak with raw perfection.",
      name: "Fatima K.",
      city: "Dubai, UAE",
      stars: 5,
    },
    {
      text: "I read the PDF on my iPad in London. The formatting is crisp and reading her words felt like holding a piece of her soul.",
      name: "Rohan M.",
      city: "London, UK",
      stars: 5,
    },
    {
      text: "Instant download, crisp typography, and unmatched words. Daniya Khan's voice demands to be read over and over.",
      name: "Zara K.",
      city: "Toronto, Canada",
      stars: 5,
    },
  ];

  const faqs = [
    {
      q: "Can I buy this PDF if I live outside India?",
      a: "Yes! Readers from India, UAE, US, UK, Canada, Australia, and worldwide can purchase and download the PDF instantly using International Cards or UPI.",
    },
    {
      q: "How do I receive my PDF file?",
      a: "Instant download! As soon as payment completes, your high-resolution PDF download button unlocks immediately on screen, and a backup copy is emailed to you.",
    },
    {
      q: "Can I read this PDF on Phone, iPad, or Kindle?",
      a: "Yes! The PDF is formatted to render crisp and beautiful on iOS, Android, tablets, laptops, and e-readers.",
    },
    {
      q: "Is the Lost Chapter included in the PDF?",
      a: "Yes! The Digital PDF Edition includes 'The Lost Chapter' bonus content.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#1A1A1A] font-serif selection:bg-[#F2A7B0] selection:text-[#1A1A1A] relative overflow-x-hidden">
      
      {/* ── TOP ANNOUNCEMENT BANNER ── */}
      <div className="bg-[#1A1A1A] text-[#F5F0E8] text-xs font-ui py-2.5 px-4 sticky top-0 z-50 border-b border-white/10">
        <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2 truncate">
            <span className="bg-[#F2A7B0] text-[#1A1A1A] px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider shrink-0">
              🌍 WORLDWIDE DIGITAL RELEASE
            </span>
            <span className="hidden sm:inline text-white/80">
              Available for readers in India (₹99) & International ($1.99)
            </span>
          </div>
          <Link
            href="/daniya-khan"
            className="text-[#F7E56B] hover:underline font-bold shrink-0 flex items-center gap-1 text-[11px] sm:text-xs"
          >
            Want Physical Paperback? Click here ↗
          </Link>
        </div>
      </div>

      {/* ── HERO SECTION ── */}
      <section ref={heroRef} className="relative pt-8 pb-16 md:pt-14 md:pb-24 px-5">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Text */}
          <motion.div initial="hidden" animate="show" variants={stagger} className="lg:col-span-7 space-y-6">
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2">
              <span className="bg-[#A8D8C0] border-2 border-[#1A1A1A] text-[#1A1A1A] px-3.5 py-1 rounded-full text-xs font-ui font-bold shadow-[2px_2px_0px_#1A1A1A]">
                📱 DIGITAL PDF E-BOOK
              </span>
              <span className="bg-[#F7E56B] border-2 border-[#1A1A1A] text-[#1A1A1A] px-3.5 py-1 rounded-full text-xs font-ui font-bold shadow-[2px_2px_0px_#1A1A1A]">
                🇮🇳 INDIA & 🌍 INTERNATIONAL
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="font-display italic text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A] leading-[1.08] tracking-tight">
              Deserted Hearts. <br />
              <span className="font-normal not-italic text-3xl sm:text-4xl text-[#666]">
                Digital PDF Edition
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="font-ui text-sm sm:text-base text-[#555] max-w-xl leading-relaxed">
              <span className="font-display italic font-bold text-[#1A1A1A] block text-lg mb-1">
                “to those who adorn their cemetery of grief with flowers of poetry.”
              </span>
              A piece of heart for every soul that lost its own Freny. Download the official PDF E-Book instantly on your phone, tablet, or laptop — anywhere in the world.
            </motion.p>

            <motion.div variants={fadeUp} className="flex items-center gap-3 pt-1">
              <div className="flex text-[#FFD700] text-lg">★★★★★</div>
              <span className="font-ui text-xs font-bold text-[#444]">4.9/5 Rating (2,400+ Global Digital Readers)</span>
            </motion.div>

            {/* Price & Action Button */}
            <motion.div variants={fadeUp} className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => router.push('/daniya-khan/pdf/checkout')}
                className="pill-btn-pink text-base px-9 py-4 shadow-[4px_4px_0px_#1A1A1A] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-center"
              >
                Download PDF — ₹99 / $1.99 ↗
              </button>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-6 pt-3 text-xs text-[#777] font-ui">
              <span>🇮🇳 UPI & Cards (India)</span>
              <span>🌍 International Cards (Global)</span>
              <span>⚡ Instant PDF Download</span>
            </motion.div>
          </motion.div>

          {/* Right Column: Floating 3D Book Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <motion.div style={{ y: floatY }} className="relative max-w-[320px] sm:max-w-[380px] w-full">
              {/* Cloudinary Book Cover Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#1A1A1A] bg-[#1A1A1A]">
                <img
                  src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1785695857/Untitled_design_52_1_kymdoi.png"
                  alt="Deserted Hearts by Daniya Khan — Digital PDF Edition"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-[#F2A7B0] border-2 border-[#1A1A1A] text-[#1A1A1A] text-[11px] font-ui font-bold px-3 py-1 rounded-full shadow-[2px_2px_0px_#1A1A1A]">
                  📄 HD PDF E-BOOK
                </div>
              </div>

              {/* Floating stickers */}
              <FloatingTag rotate={-6} className="-top-4 -left-6 bg-[#F2A7B0]">
                🌸 Instant Download
              </FloatingTag>
              <FloatingTag rotate={5} className="-bottom-4 -right-4 bg-[#F7E56B]">
                📖 + The Lost Chapter
              </FloatingTag>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── INSTAGRAM PROFILE CARD REPLICA ── */}
      <section className="py-12 bg-[#FDFBF7] border-y-2 border-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-5">
          <div className="text-center mb-8">
            <span className="font-ui text-xs font-bold uppercase tracking-widest text-[#888]">AUTHOR SPOTLIGHT</span>
            <h2 className="font-display italic text-3xl md:text-4xl text-[#1A1A1A] mt-1">Written by Daniya Khan</h2>
          </div>

          <div className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-6 md:p-8 shadow-[6px_6px_0px_#1A1A1A] max-w-xl mx-auto">
            <div className="flex items-center gap-4 mb-5">
              <img
                src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1785698669/471294185_1283175799591646_5032088166272439393_n_y64bdi.jpg"
                alt="Daniya Khan Instagram Avatar"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#1A1A1A] object-cover shrink-0"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-ui font-bold text-lg text-[#1A1A1A]">@altruistic_writer</h3>
                  <span className="text-[#0095F6] text-base" title="Verified Author">☑️</span>
                </div>
                <p className="font-ui text-xs text-[#777] mt-0.5">Daniya Khan · Author & Poet</p>
                <div className="flex items-center gap-4 mt-2 font-ui text-xs text-[#444]">
                  <span><strong>1,186</strong> posts</span>
                  <span><strong>170K</strong> followers</span>
                </div>
              </div>
            </div>
            <p className="font-serif italic text-sm text-[#333] border-t border-dashed border-[#DDD] pt-4">
              “to those who adorn their cemetery of grief with flowers of poetry.”
            </p>
            <div className="mt-4 pt-3 border-t border-[#EEE] flex items-center justify-between text-xs font-ui">
              <span className="text-[#888]">Official Publication by Inkfetish</span>
              <a
                href="https://instagram.com/altruistic_writer"
                target="_blank"
                rel="noreferrer"
                className="text-[#0095F6] font-bold hover:underline"
              >
                Follow on Instagram ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIGITAL PDF SINGLE PRICING TICKET ── */}
      <section className="py-16 md:py-24 px-5 bg-[#FDFBF7] border-t-2 border-[#1A1A1A]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-ui text-xs font-bold uppercase tracking-widest text-[#888]">INSTANT DIGITAL ACCESS</span>
            <h2 className="font-display italic text-4xl md:text-5xl text-[#1A1A1A] mt-2">
              Get the Digital PDF Edition.
            </h2>
            <p className="font-ui text-sm text-[#666] mt-2">Available for readers in India & International worldwide.</p>
          </div>

          <div className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-8 md:p-10 shadow-[8px_8px_0px_#1A1A1A] max-w-2xl mx-auto relative">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <span className="bg-[#A8D8C0] border border-[#1A1A1A] text-[#1A1A1A] px-3.5 py-1 rounded-full text-xs font-ui font-bold">
                📱 OFFICIAL PDF E-BOOK
              </span>
              <span className="bg-[#F7E56B] border border-[#1A1A1A] text-[#1A1A1A] px-3.5 py-1 rounded-full text-xs font-ui font-bold">
                🇮🇳 INDIA & 🌍 GLOBAL
              </span>
            </div>

            <h3 className="font-display italic text-3xl md:text-4xl text-[#1A1A1A]">
              Deserted Hearts — PDF Edition
            </h3>
            <p className="font-ui text-xs text-[#777] mt-1">Full poetry collection + Lost Chapter bonus</p>

            <div className="my-8 flex flex-wrap items-baseline gap-4 border-y-2 border-dashed border-[#DDD] py-6">
              <div>
                <p className="font-ui text-xs text-[#888]">Indian Readers</p>
                <p className="font-display italic text-5xl font-bold text-[#1A1A1A]">₹99</p>
              </div>
              <div className="border-l-2 border-[#DDD] pl-6">
                <p className="font-ui text-xs text-[#888]">International Readers</p>
                <p className="font-display italic text-4xl font-bold text-[#1A1A1A]">$1.99 <span className="text-xs font-ui text-[#777]">USD</span></p>
              </div>
            </div>

            <ul className="space-y-3.5 font-ui text-sm text-[#444] mb-8">
              <li className="flex items-center gap-3">
                <span className="text-[#A8D8C0] font-bold text-lg">✓</span>
                <span><strong>Full High-Definition PDF E-Book</strong> (Optimized for Phone, Tablet & Kindle)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#A8D8C0] font-bold text-lg">✓</span>
                <span><strong>The Lost Chapter</strong> (Exclusive bonus content included)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#A8D8C0] font-bold text-lg">✓</span>
                <span><strong>Instant On-Screen Download</strong> right after payment</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#A8D8C0] font-bold text-lg">✓</span>
                <span><strong>Backup Copy Emailed</strong> automatically to your inbox</span>
              </li>
            </ul>

            <button
              onClick={() => router.push('/daniya-khan/pdf/checkout')}
              className="w-full pill-btn-pink text-base py-4 shadow-[4px_4px_0px_#1A1A1A] text-center"
            >
              Get Digital PDF Edition (₹99 / $1.99) ↗
            </button>
          </div>

          {/* Switch to Physical Book Link */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-[#F5F0E8] border-2 border-[#1A1A1A] rounded-2xl p-5 shadow-[4px_4px_0px_#1A1A1A]">
              <p className="font-ui text-sm font-bold text-[#1A1A1A]">Prefer a physical signed paperback book instead?</p>
              <p className="font-ui text-xs text-[#666] mt-1">Get the officially signed & stamped paperback shipped straight to your doorstep.</p>
              <Link
                href="/daniya-khan"
                className="inline-block mt-3 bg-[#1A1A1A] text-[#F5F0E8] rounded-full px-6 py-2.5 font-ui font-bold text-xs hover:bg-[#F2A7B0] hover:text-[#1A1A1A] transition-colors"
              >
                View Physical Paperback Edition (₹229) ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── READER REVIEWS ── */}
      <section className="py-16 md:py-24 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-ui text-xs font-bold uppercase tracking-widest text-[#888]">GLOBAL READERS</span>
            <h2 className="font-display italic text-4xl text-[#1A1A1A] mt-2">What readers around the world are saying.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-6 shadow-[4px_4px_0px_#1A1A1A]">
                <div className="text-[#FFD700] text-sm mb-3">★★★★★</div>
                <p className="font-serif italic text-sm text-[#333] leading-relaxed mb-4">&quot;{r.text}&quot;</p>
                <div className="font-ui text-xs font-bold text-[#1A1A1A] flex items-center justify-between border-t border-dashed border-[#EEE] pt-3">
                  <span>{r.name}</span>
                  <span className="text-[#888] font-normal">{r.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="py-16 md:py-24 px-5 bg-[#FDFBF7] border-t-2 border-[#1A1A1A]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display italic text-4xl text-[#1A1A1A]">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4 font-ui">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border-2 border-[#1A1A1A] rounded-xl overflow-hidden shadow-[3px_3px_0px_#1A1A1A]">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full text-left p-5 font-bold text-base text-[#1A1A1A] flex items-center justify-between"
                >
                  <span>{faq.q}</span>
                  <span className="text-xl">{faqOpen === i ? "−" : "+"}</span>
                </button>
                {faqOpen === i && (
                  <div className="px-5 pb-5 text-sm text-[#555] border-t border-dashed border-[#EEE] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8.5: FEATURE YOUR WRITING ── */}
      <section className="py-16 px-5 bg-[#1A1A1A] text-[#F5F0E8]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="bg-[#F2A7B0] text-[#1A1A1A] px-3 py-1 rounded-full text-xs font-ui font-bold uppercase tracking-wider">
            FOR POETS & WRITERS
          </span>
          <h2 className="font-display italic text-3xl md:text-4xl">Want to get published by Inkfetish?</h2>
          <p className="font-ui text-sm text-[#AAA] max-w-xl mx-auto">
            Submit your manuscript or poem for feature publishing in our upcoming anthology publications.
          </p>
          <div className="pt-2">
            <Link
              href="/bharat-writes/submit"
              className="inline-block bg-[#F7E56B] text-[#1A1A1A] font-ui font-bold rounded-full px-8 py-3.5 text-sm hover:bg-[#A8D8C0] transition-colors"
            >
              Submit Your Writing ↗
            </Link>
          </div>
        </div>
      </section>

      {/* ── CUSTOM FOOTER ── */}
      <footer className="bg-[#1A1A1A] text-[#F5F0E8] py-8 px-5 border-t border-white/10 text-center font-ui text-xs text-[#888]">
        <p>Deserted Hearts (Digital PDF Edition) · Daniya Khan — Official Publication by Inkfetish Publication</p>
        <p className="mt-2 text-[#555]">© 2026 Inkfetish. All rights reserved.</p>
      </footer>

      {/* ── MOBILE STICKY BOTTOM BAR ── */}
      <AnimatePresence>
        {stickyVisible && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-4 py-3 bg-[#F5F0E8] border-t-2 border-[#1A1A1A] flex items-center justify-between"
          >
            <div>
              <p className="font-display italic text-base font-bold">Deserted Hearts (PDF)</p>
              <p className="font-ui text-xs text-[#777]">Digital Edition — ₹99 / $1.99</p>
            </div>
            <button
              className="pill-btn-pink text-sm px-5 py-3"
              onClick={() => router.push('/daniya-khan/pdf/checkout')}
            >
              Get PDF ↗
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
