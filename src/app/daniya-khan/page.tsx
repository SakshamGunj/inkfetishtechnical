"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";

/* ─────────────────────────────────────────────────────────────────────────────
   DANIYA KHAN — PRE-LAUNCH PAGE
   Design: Editorial / Warm / Playful-Modern
   Inspired by: ticket-layout, bold type, 3D floating elements, cream palette
───────────────────────────────────────────────────────────────────────────── */

export default function DaniyaKhanPage() {
  const router = useRouter();
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [stickyVisible, setStickyVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const floatY = useTransform(scrollY, [0, 600], [0, -40]);

  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      city: "Mumbai",
      stars: 5,
    },
    {
      text: "Daniya writes about heartbreak the way only someone who has truly lived it can. Raw, ruthless, and achingly beautiful.",
      name: "Rohan M.",
      city: "Delhi",
      stars: 5,
    },
    {
      text: "I sent three poems to my best friend at 2 AM with no context. She called me crying. That's the power of this collection.",
      name: "Priya V.",
      city: "Bengaluru",
      stars: 5,
    },
    {
      text: "These aren't just poems. They're evidence that someone else felt exactly what I thought was unspeakable. A debut that demands to be read.",
      name: "Zara K.",
      city: "Hyderabad",
      stars: 5,
    },
  ];

  const faqs = [
    {
      q: "When will I receive my copy?",
      a: "Books dispatch on launch day and arrive within 3–5 business days across India via tracked courier.",
    },
    {
      q: "Do you ship pan-India?",
      a: "Yes — every pin code. We use BlueDart and Delhivery for 100% tracked, reliable delivery.",
    },
    {
      q: "How do I get the digital bonuses?",
      a: "Your order confirmation email contains a secure download link for the exclusive poems PDF and your VIP Q&A invite, delivered instantly.",
    },
    {
      q: "Can I pay via UPI?",
      a: "Absolutely. Google Pay, PhonePe, Paytm, all major UPI apps, plus Credit/Debit cards and NetBanking.",
    },
    {
      q: "Is this a limited pre-order?",
      a: "The exclusive bonuses are limited to the first 1,000 pre-orders. After that, only the book is available.",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        
        .font-display { font-family: 'Instrument Serif', serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        .font-ui { font-family: 'Space Grotesk', sans-serif; }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(var(--r, 0deg)); }
          50% { transform: translateY(-10px) rotate(var(--r, 0deg)); }
        }
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0px) rotate(var(--r, 0deg)); }
          50% { transform: translateY(10px) rotate(var(--r, 0deg)); }
        }
        .float-1 { animation: float 4s ease-in-out infinite; }
        .float-2 { animation: floatReverse 5s ease-in-out infinite; }
        .float-3 { animation: float 3.5s ease-in-out infinite; }

        .ticket-tear {
          position: relative;
        }
        .ticket-tear::before {
          content: '';
          position: absolute;
          top: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: repeating-linear-gradient(
            90deg,
            #1A1A1A 0px,
            #1A1A1A 8px,
            transparent 8px,
            transparent 16px
          );
        }

        .pill-btn {
          background: #1A1A1A;
          color: #F5F0E8;
          border: 2px solid #1A1A1A;
          border-radius: 100px;
          padding: 14px 32px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .pill-btn:hover {
          background: #F5F0E8;
          color: #1A1A1A;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }

        .pill-btn-outline {
          background: transparent;
          color: #1A1A1A;
          border: 2px solid #1A1A1A;
          border-radius: 100px;
          padding: 12px 28px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .pill-btn-outline:hover {
          background: #1A1A1A;
          color: #F5F0E8;
          transform: translateY(-1px);
        }

        .pill-btn-pink {
          background: #F2A7B0;
          color: #1A1A1A;
          border: 2px solid #1A1A1A;
          border-radius: 100px;
          padding: 14px 32px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 3px 3px 0px #1A1A1A;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .pill-btn-pink:hover {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0px #1A1A1A;
        }
        .pill-btn-pink:active {
          transform: translate(1px, 1px);
          box-shadow: 1px 1px 0px #1A1A1A;
        }

        .card-neo {
          background: #F5F0E8;
          border: 2px solid #1A1A1A;
          border-radius: 20px;
          box-shadow: 4px 4px 0px #1A1A1A;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .card-neo:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0px #1A1A1A;
        }

        .badge-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #F2A7B0;
          border: 2px solid #1A1A1A;
          border-radius: 100px;
          padding: 6px 16px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 12px;
          color: #1A1A1A;
          letter-spacing: 0.02em;
          box-shadow: 2px 2px 0px #1A1A1A;
        }

        .badge-tag-mint {
          background: #A8D8C0;
          border: 2px solid #1A1A1A;
          border-radius: 100px;
          padding: 6px 16px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 12px;
          color: #1A1A1A;
          box-shadow: 2px 2px 0px #1A1A1A;
          display: inline-block;
        }

        .badge-tag-yellow {
          background: #F7E56B;
          border: 2px solid #1A1A1A;
          border-radius: 100px;
          padding: 6px 16px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 12px;
          color: #1A1A1A;
          box-shadow: 2px 2px 0px #1A1A1A;
          display: inline-block;
        }

        .book-3d {
          perspective: 1200px;
        }
        .book-inner {
          transform: rotateY(-20deg) rotateX(3deg);
          transform-style: preserve-3d;
          transition: transform 0.6s ease;
          filter: drop-shadow(20px 20px 40px rgba(0,0,0,0.25));
        }
        .book-inner:hover {
          transform: rotateY(-8deg) rotateX(1deg);
        }

        .marquee-track {
          display: flex;
          gap: 24px;
          animation: marquee 25s linear infinite;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .star-rating { color: #1A1A1A; font-size: 14px; letter-spacing: 1px; }

        .faq-item {
          border: 2px solid #1A1A1A;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 12px;
        }
        .faq-q {
          width: 100%;
          text-align: left;
          background: #F5F0E8;
          padding: 20px 24px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 15px;
          color: #1A1A1A;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: none;
        }
        .faq-a {
          background: #FDFBF7;
          padding: 16px 24px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #555;
          line-height: 1.7;
          border-top: 2px solid #1A1A1A;
        }
      `}</style>

      <div className="font-body bg-[#F5F0E8] text-[#1A1A1A] min-h-screen overflow-x-hidden">

        {/* ── STICKY MOBILE CTA ── */}
        <AnimatePresence>
          {stickyVisible && (
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-4 py-3 bg-[#F5F0E8] border-t-2 border-[#1A1A1A] flex items-center justify-between"
            >
              <div>
                <p className="font-display italic text-base font-bold">Deserted Hearts</p>
                <p className="font-ui text-xs text-[#777]">First edition poetry collection — ₹399</p>
              </div>
              <button className="pill-btn-pink text-sm px-5 py-3" onClick={() => router.push('/daniya-khan/checkout')}>Pre-Order ↗</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ────────────────────────────────────────────────
            SECTION 1 — HERO
        ──────────────────────────────────────────────── */}
        <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-5 py-20 overflow-hidden">

          {/* Background subtle texture */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#F2E4C4,transparent_50%),radial-gradient(circle_at_80%_80%,#E8D5F5,transparent_50%)] opacity-60 pointer-events-none" />

          {/* Floating 3D decorative elements */}
          <div className="absolute top-16 left-8 text-5xl float-1 select-none" style={{ "--r": "-12deg" } as React.CSSProperties}>✨</div>
          <div className="absolute top-24 right-12 text-4xl float-2 select-none" style={{ "--r": "8deg" } as React.CSSProperties}>⭐</div>
          <div className="absolute bottom-32 left-16 text-5xl float-3 select-none" style={{ "--r": "-6deg" } as React.CSSProperties}>🌸</div>
          <div className="absolute bottom-24 right-8 text-4xl float-1 select-none" style={{ "--r": "10deg" } as React.CSSProperties}>💌</div>
          <div className="absolute top-1/2 left-4 text-3xl float-2 select-none hidden md:block" style={{ "--r": "-15deg" } as React.CSSProperties}>📖</div>
          <div className="absolute top-1/3 right-6 text-3xl float-3 select-none hidden md:block" style={{ "--r": "12deg" } as React.CSSProperties}>🖊️</div>

          {/* Floating label tags */}
          <div className="absolute top-10 left-1/4 float-1 hidden md:block">
            <div className="bg-[#A8D8C0] border-2 border-[#1A1A1A] rounded-2xl px-4 py-2 text-xs font-ui font-bold shadow-[2px_2px_0px_#1A1A1A]" style={{ transform: "rotate(-6deg)" }}>
              her debut novel
            </div>
          </div>
          <div className="absolute top-20 right-1/4 float-2 hidden md:block">
            <div className="bg-[#F2A7B0] border-2 border-[#1A1A1A] rounded-2xl px-4 py-2 text-xs font-ui font-bold shadow-[2px_2px_0px_#1A1A1A]" style={{ transform: "rotate(5deg)" }}>
              you're invited! ↓
            </div>
          </div>

          {/* Main content */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="relative z-10 max-w-2xl mx-auto text-center"
          >
            <motion.div variants={fadeUp} className="flex justify-center mb-5">
              <span className="badge-tag">✦ pre-order now open</span>
            </motion.div>

            <motion.p variants={fadeUp} className="font-ui font-semibold text-sm tracking-widest uppercase text-[#888] mb-3">
              daniya khan · debut poetry collection
            </motion.p>

            <motion.h1 variants={fadeUp} className="font-display italic text-[clamp(52px,11vw,120px)] leading-[0.92] tracking-tight text-[#1A1A1A] mb-4">
              deserted<br />
              <span className="not-italic font-display text-[clamp(48px,10vw,110px)]">hearts.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="font-body text-base md:text-lg text-[#555] leading-relaxed max-w-md mx-auto mt-6 mb-8">
              Poems about the people who left. The silences they left behind. And the strange, quiet courage of learning to stay anyway.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center mb-10">
              <button className="pill-btn-pink text-[15px] px-7 py-[14px]" onClick={() => router.push('/daniya-khan/checkout')}>
                Secure my first edition ↗
              </button>
              <button className="pill-btn-outline text-[14px] px-6 py-[12px]">
                Read first chapter free →
              </button>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 text-sm text-[#777]">
              <div className="flex -space-x-2">
                {["🧕","👩","👩‍🦱","👩‍🦳"].map((e, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#F5F0E8] bg-[#E8D5C0] flex items-center justify-center text-base">
                    {e}
                  </div>
                ))}
              </div>
              <span className="font-ui font-medium">10,000+ on the waitlist</span>
            </motion.div>
          </motion.div>

          {/* Book mockup below heading on mobile, floating on desktop */}
          <motion.div
            style={{ y: floatY }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative mt-14 md:absolute md:right-[5%] md:top-1/2 md:-translate-y-1/2 z-10"
          >
            <div className="book-3d w-[180px] md:w-[220px] mx-auto">
              <div className="book-inner">
                <div
                  className="w-full aspect-[2/3] rounded-xl overflow-hidden border-2 border-[#1A1A1A]"
                  style={{ boxShadow: "8px 8px 0px #1A1A1A" }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-[#2B1810] via-[#5C2D20] to-[#8B4A2A] flex flex-col items-center justify-center p-6 relative">
                    <div className="absolute inset-0 opacity-10" style={{
                      backgroundImage: "radial-gradient(circle at 30% 70%, #fff 0%, transparent 60%)"
                    }} />
                    <div className="w-8 h-[1px] bg-[#D4AF37] mb-4" />
                    <h2 className="font-display italic text-[#F5EDD5] text-center text-2xl leading-tight mb-3">
                      Deserted<br/>Hearts
                    </h2>
                    <div className="w-8 h-[1px] bg-[#D4AF37] mb-4" />
                    <p className="font-ui text-[#C8A87D] text-xs tracking-[0.3em] uppercase">Daniya Khan</p>
                  </div>
                </div>
              </div>
            </div>

            {/* floating badge on book */}
            <div className="absolute -top-4 -right-4 bg-[#F7E56B] border-2 border-[#1A1A1A] rounded-full w-16 h-16 flex items-center justify-center text-[10px] font-ui font-bold text-center leading-tight shadow-[2px_2px_0px_#1A1A1A]" style={{ transform: "rotate(12deg)" }}>
              1st<br/>Edition
            </div>
          </motion.div>
        </section>

        {/* ────────────────────────────────────────────────
            MARQUEE BAND
        ──────────────────────────────────────────────── */}
        <div className="border-y-2 border-[#1A1A1A] bg-[#F2A7B0] py-3 overflow-hidden">
          <div className="marquee-track">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="flex items-center gap-6 shrink-0">
                <span className="font-display italic text-base font-bold whitespace-nowrap">deserted hearts</span>
                <span className="text-lg">✦</span>
                <span className="font-ui text-xs font-bold tracking-widest uppercase whitespace-nowrap">daniya khan · poems</span>
                <span className="text-lg">🌵</span>
              </div>
            ))}
          </div>
        </div>

        {/* ────────────────────────────────────────────────
            SECTION 2 — THE PULLQUOTE / RESONANCE
        ──────────────────────────────────────────────── */}
        <section className="py-24 px-5 max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-5xl mb-6 select-none">🌵</motion.div>
            <motion.h2 variants={fadeUp} className="font-display italic text-[clamp(28px,5vw,52px)] text-[#1A1A1A] leading-tight">
              "For everyone who has loved someone who was already halfway out the door — and stayed silent about it."
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-8">
              <span className="badge-tag-mint">— from the dedication</span>
            </motion.div>
          </motion.div>
        </section>

        {/* ────────────────────────────────────────────────
            SECTION 3 — THE STORY
        ──────────────────────────────────────────────── */}
        <section className="py-16 px-5 max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            {/* Left: story card */}
            <motion.div variants={fadeUp} className="card-neo p-8 md:p-10">
              <div className="badge-tag-yellow mb-6 inline-block">the collection ✦</div>
              <h2 className="font-display italic text-[clamp(28px,4vw,42px)] leading-tight text-[#1A1A1A] mb-6">
                Forty-seven poems.<br />One impossible love.
              </h2>
              <div className="space-y-4 text-[#555] text-base leading-relaxed">
                <p>
                  <i>Deserted Hearts</i> is a debut poetry collection written across three years of loving too much, too quietly, and too late. It moves through the geography of longing — the waiting, the almost, the after.
                </p>
                <p>
                  Part elegy, part love letter to everyone who never got a proper goodbye. Daniya writes about heartbreak not as an event, but as a landscape you keep returning to.
                </p>
                <p className="font-semibold text-[#1A1A1A]">
                  These are not sad poems. They are honest ones.
                </p>
              </div>
              <button className="pill-btn mt-8">
                Read 5 poems free →
              </button>
            </motion.div>

            {/* Right: stats + image */}
            <motion.div variants={fadeUp} className="flex flex-col gap-5">
              {/* Atmospheric image */}
              <div
                className="w-full aspect-[4/3] rounded-2xl border-2 border-[#1A1A1A] overflow-hidden"
                style={{ boxShadow: "5px 5px 0px #1A1A1A" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1546&auto=format&fit=crop"
                  alt="Story atmosphere"
                  className="w-full h-full object-cover filter sepia-[20%] hover:sepia-0 transition-all duration-500"
                />
              </div>

              {/* Mini-stats row */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { val: "47", label: "poems" },
                  { val: "3 yrs", label: "in the making" },
                  { val: "2026", label: "debut" },
                ].map((s, i) => (
                  <div key={i} className="card-neo p-4 text-center">
                    <p className="font-display italic text-2xl font-bold text-[#1A1A1A]">{s.val}</p>
                    <p className="font-ui text-xs text-[#888] mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ────────────────────────────────────────────────
            SECTION 4 — SOCIAL PROOF
        ──────────────────────────────────────────────── */}
        <section className="py-16 px-5 bg-[#1A1A1A] text-[#F5F0E8]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="text-center mb-12">
                <span className="inline-block bg-[#F2A7B0] text-[#1A1A1A] font-ui font-bold text-xs tracking-widest px-4 py-2 rounded-full border-2 border-[#F5F0E8] mb-4">early readers say</span>
                <h2 className="font-display italic text-[clamp(30px,5vw,56px)] text-[#F5F0E8] mt-2">
                  "She put words to what I couldn't."
                </h2>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {reviews.map((r, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="bg-[#252525] border border-[#333] rounded-2xl p-6 hover:border-[#F2A7B0] transition-colors"
                  >
                    <div className="star-rating mb-3">{"★".repeat(r.stars)}</div>
                    <p className="text-[#D8D0C4] text-sm leading-relaxed italic mb-5">"{r.text}"</p>
                    <div>
                      <p className="font-ui font-semibold text-sm text-[#F5F0E8]">{r.name}</p>
                      <p className="font-ui text-xs text-[#666]">{r.city}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────
            SECTION 5 — MEET DANIYA
        ──────────────────────────────────────────────── */}
        <section className="py-24 px-5 max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Author portrait */}
            <motion.div variants={fadeUp} className="relative">
              <div
                className="aspect-[3/4] rounded-3xl overflow-hidden border-2 border-[#1A1A1A]"
                style={{ boxShadow: "6px 6px 0px #1A1A1A" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
                  alt="Daniya Khan"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* floating label */}
              <div
                className="absolute -bottom-5 -right-4 bg-[#F7E56B] border-2 border-[#1A1A1A] rounded-2xl px-5 py-3 font-ui font-bold text-sm shadow-[3px_3px_0px_#1A1A1A]"
                style={{ transform: "rotate(3deg)" }}
              >
                🖊️ daniya khan
              </div>
            </motion.div>

            {/* Letter */}
            <motion.div variants={fadeUp} className="card-neo p-8 md:p-10">
              <div className="badge-tag mb-6 inline-block">a letter from daniya</div>
              <h2 className="font-display italic text-3xl mb-6">Dear Reader,</h2>
              <div className="space-y-4 text-[#555] leading-relaxed">
                <p>I wrote the first poem in this collection on a night when I had no one left to call. It wasn't meant to be poetry. It was meant to be a message I'd never send.</p>
                <p>Three years later, <i>Deserted Hearts</i> is forty-seven of those moments — the 2 AM thoughts, the rehearsed conversations, the things I said only to the ceiling. I wrote it for me. But reading it back, I realised I had written it for anyone who has ever loved in silence and ached in private.</p>
                <p>I am terrified to share it. Which probably means it's time.</p>
                <p className="text-[#1A1A1A] font-semibold">Thank you for being here at the very beginning. I've kept something special for you below... ↓</p>
              </div>
              <div className="mt-8 pt-6 border-t-2 border-dashed border-[#D8CFC0]">
                <p className="font-display italic text-2xl">Daniya Khan</p>
                <p className="font-ui text-xs text-[#888] mt-1">Poet · Deserted Hearts</p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ────────────────────────────────────────────────
            SECTION 6 — THE OFFER (TICKET LAYOUT)
        ──────────────────────────────────────────────── */}
        <section className="py-16 px-5 bg-[#E8E2D5]">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="text-center mb-10">
                <span className="badge-tag-mint">strictly limited ✦ first 1,000 orders</span>
                <h2 className="font-display italic text-[clamp(32px,5vw,56px)] mt-4 text-[#1A1A1A]">
                  the pre-order bundle.
                </h2>
                <p className="text-[#777] text-base mt-2">Pre-order today. The exclusive bonuses disappear the moment we go live.</p>
              </motion.div>

              {/* Ticket card */}
              <motion.div
                variants={fadeUp}
                className="bg-[#F5F0E8] border-2 border-[#1A1A1A] rounded-3xl overflow-hidden"
                style={{ boxShadow: "6px 6px 0px #1A1A1A" }}
              >
                {/* Ticket body */}
                <div className="p-8 space-y-5">
                  {[
                    { icon: "📕", title: "Deserted Hearts — First Edition", desc: "The debut poetry collection, beautifully printed and delivered to your door.", tag: "the book" },
                    { icon: "✍️", title: "Hand-Signed Bookplate", desc: "Personally signed by Daniya. A keepsake worth keeping forever.", tag: "free" },
                    { icon: "🌵", title: "5 Unpublished Poems (Digital)", desc: "Poems that didn't make the final cut — raw, unedited, and exclusive to pre-order readers.", tag: "free" },
                    { icon: "🎙️", title: "Private VIP Q&A with Daniya", desc: "A closed-door virtual session. Ask her about the poems, the process, the heartbreaks.", tag: "free" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 pb-5 border-b border-dashed border-[#D8CFC0] last:border-0 last:pb-0">
                      <div className="text-3xl shrink-0">{item.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-ui font-semibold text-base">{item.title}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border border-[#1A1A1A] ${item.tag === "free" ? "bg-[#A8D8C0]" : "bg-[#F7E56B]"}`}>
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-[#777] text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Ticket tear divider */}
                <div className="relative">
                  <div className="border-t-2 border-dashed border-[#1A1A1A] mx-6" />
                  {/* Notches */}
                  <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#E8E2D5] border-2 border-[#1A1A1A]" />
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#E8E2D5] border-2 border-[#1A1A1A]" />
                </div>

                {/* Ticket footer */}
                <div className="p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <p className="font-ui text-xs text-[#888] line-through mb-1">Total value: ₹1,899</p>
                    <p className="font-display italic text-4xl font-bold text-[#1A1A1A]">₹399</p>
                    <p className="font-ui text-xs text-[#888] mt-1">+ free shipping across India</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <button className="pill-btn-pink text-base px-8 py-4" onClick={() => router.push('/daniya-khan/checkout')}>
                      Secure my bonuses ↗
                    </button>
                    <p className="text-xs text-[#999] flex items-center gap-1">
                      🔒 Secure UPI / Card checkout
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────
            SECTION 7 — TRUST / PAYMENT LOGOS
        ──────────────────────────────────────────────── */}
        <section className="py-10 px-5 border-y-2 border-[#1A1A1A] bg-[#F5F0E8]">
          <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-8">
            {[
              { label: "UPI", sub: "Google Pay · PhonePe · Paytm" },
              { label: "VISA / MC", sub: "All major cards" },
              { label: "🔒 SSL", sub: "256-bit encrypted" },
              { label: "📦 Ships", sub: "Pan-India · Tracked" },
            ].map((t, i) => (
              <div key={i} className="text-center">
                <p className="font-ui font-bold text-sm text-[#1A1A1A]">{t.label}</p>
                <p className="font-ui text-xs text-[#999]">{t.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ────────────────────────────────────────────────
            SECTION 8 — FAQ
        ──────────────────────────────────────────────── */}
        <section className="py-24 px-5 max-w-2xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-10">
              <span className="badge-tag-yellow">got questions?</span>
              <h2 className="font-display italic text-4xl mt-4">We've got answers.</h2>
            </motion.div>

            <motion.div variants={fadeUp}>
              {faqs.map((faq, i) => (
                <div key={i} className="faq-item">
                  <button
                    className="faq-q"
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  >
                    {faq.q}
                    <span className="text-[#F2A7B0] font-bold text-xl transition-transform duration-200"
                      style={{ transform: faqOpen === i ? "rotate(45deg)" : "rotate(0deg)", display: "inline-block" }}>
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {faqOpen === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="faq-a overflow-hidden"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ────────────────────────────────────────────────
            SECTION 9 — FINAL CTA (TICKET-STYLE)
        ──────────────────────────────────────────────── */}
        <section className="py-24 px-5 bg-[#1A1A1A] relative overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute top-8 right-12 text-6xl float-1 opacity-30 select-none">✨</div>
          <div className="absolute bottom-8 left-12 text-6xl float-2 opacity-30 select-none">🌸</div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-block bg-[#F2A7B0] text-[#1A1A1A] font-ui font-bold text-xs tracking-widest px-4 py-2 rounded-full border-2 border-[#F5F0E8] mb-6">
                don't miss this
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-display italic text-[clamp(40px,7vw,80px)] text-[#F5F0E8] leading-tight mb-4">
              the poems await.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#888] text-base mb-10">
              First edition + ₹1,500 in exclusive bonuses. Only for the first 1,000.
            </motion.p>
            <motion.div variants={fadeUp}>
              <button className="pill-btn-pink text-base px-10 py-5" onClick={() => router.push('/daniya-khan/checkout')}>
                Secure my copy now ↗
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 px-5 border-t-2 border-[#1A1A1A] bg-[#F5F0E8]">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#999]">
            <p className="font-ui">© 2026 Daniya Khan. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#1A1A1A] transition-colors font-ui">Privacy Policy</a>
              <a href="#" className="hover:text-[#1A1A1A] transition-colors font-ui">Terms</a>
              <a href="#" className="hover:text-[#1A1A1A] transition-colors font-ui">Contact</a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
