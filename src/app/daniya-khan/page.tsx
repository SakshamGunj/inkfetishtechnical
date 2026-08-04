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

        {/* ── TOP ANNOUNCEMENT BANNER ── */}
        <div className="w-full bg-[#1A1A1A] text-[#F5F0E8] py-2.5 px-4 flex flex-wrap items-center justify-center gap-1.5 font-ui text-[13px] font-medium tracking-wide relative z-50">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          <span>Book by Daniya khan</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#38bdf8" className="w-4 h-4"><path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" /></svg>
          <span className="opacity-70 mx-1">—</span>
          <span>170k followers on instagram</span>
        </div>

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
                <p className="font-ui text-xs text-[#777]">First edition poetry collection — Starts at ₹229</p>
              </div>
              <button className="pill-btn-pink text-sm px-5 py-3" onClick={() => router.push('/daniya-khan/checkout')}>Pre-Order ↗</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ────────────────────────────────────────────────
            SECTION 1 — HERO
        ──────────────────────────────────────────────── */}
        <section ref={heroRef} className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-start md:justify-center px-5 pt-10 pb-20 md:py-20 overflow-hidden">

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

          {/* Main content and book in 2-column grid */}
          <div className="relative z-10 w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center pt-8 md:pt-16">
            
            {/* Left Column: Text */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="text-center md:text-left"
            >
              <motion.div variants={fadeUp} className="flex justify-center md:justify-start mb-5">
                <span className="badge-tag">✦ pre-order now open</span>
              </motion.div>

              <motion.p variants={fadeUp} className="font-ui font-semibold text-sm tracking-widest uppercase text-[#888] mb-3">
                daniya khan · debut poetry collection
              </motion.p>

              <motion.h1 variants={fadeUp} className="font-display italic text-[clamp(52px,9vw,120px)] leading-[0.92] tracking-tight text-[#1A1A1A] mb-4">
                deserted<br />
                <span className="not-italic font-display text-[clamp(48px,8vw,110px)]">hearts.</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="font-body text-base md:text-lg text-[#555] leading-relaxed max-w-md mx-auto md:mx-0 mt-6 mb-8">
                A piece of my heart for those who find it difficult to cross the threshold of childhood, who cannot disentangle themselves from nostalgia and memories, for every soul that lost its own Freny.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center md:justify-start mb-10">
                <button className="pill-btn-pink text-[15px] px-7 py-[14px]" onClick={() => router.push('/daniya-khan/checkout')}>
                  Secure my Mystery Box ↗
                </button>
                <button className="pill-btn-outline text-[14px] px-6 py-[12px]">
                  Read first poem free →
                </button>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center justify-center md:justify-start gap-3 text-sm text-[#777]">
                <div className="flex -space-x-2">
                  {["🧕","👩","👩‍🦱","👩‍🦳"].map((e, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#F5F0E8] bg-[#E8D5C0] flex items-center justify-center text-base">
                      {e}
                    </div>
                  ))}
                </div>
                <span className="font-ui font-medium">267 people are in waitlist</span>
              </motion.div>
            </motion.div>

            {/* Right Column: Big Book */}
            <motion.div
              style={{ y: floatY }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="relative mt-10 md:mt-0 flex justify-center"
            >
              <div className="w-[220px] md:w-[85%] lg:w-[450px] relative z-10">
                <img 
                  src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1785695857/Untitled_design_52_1_kymdoi.png" 
                  alt="Deserted Hearts Book"
                  className="w-full h-auto drop-shadow-2xl hover:-translate-y-3 transition-transform duration-500"
                />
                
                {/* floating badge on book */}
                <div className="absolute -top-4 -right-4 md:-top-8 md:-right-8 bg-[#F7E56B] border-2 border-[#1A1A1A] rounded-full w-20 h-20 md:w-24 md:h-24 flex items-center justify-center text-xs md:text-sm font-ui font-bold text-center leading-tight shadow-[4px_4px_0px_#1A1A1A]" style={{ transform: "rotate(12deg)" }}>
                  1st<br/>Edition
                </div>
              </div>
            </motion.div>
          </div>
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
        <section className="py-16 md:py-24 px-5 max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-5xl mb-6 select-none">🌵</motion.div>
            <motion.h2 variants={fadeUp} className="font-display italic text-[clamp(28px,5vw,52px)] text-[#1A1A1A] leading-tight">
              “to those who adorn their cemetery of grief with flowers of poetry.”
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-4">
              <span className="badge-tag-mint">— from the dedication</span>
            </motion.div>
          </motion.div>
        </section>

        {/* ────────────────────────────────────────────────
            SECTION 3 — THE STORY
        ──────────────────────────────────────────────── */}
        <section className="py-12 md:py-16 px-5 max-w-6xl mx-auto">
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
                57 Poems<br />& the Child who refused to grow up
              </h2>
              <div className="space-y-4 text-[#555] text-base leading-relaxed">
                <p>
                  <i>Deserted Hearts</i> is a debut poetry book written across years of despair, nostalgia, the stubbornness of not growing up. It moves through the geography of longing of becoming a child again.
                </p>
                <p>
                  The heartbreak of love may be worse, but the heartbreak of realising that you will never be in the arms of your grandparents being their little princess and counting the stars along with them, this realisation will leave you with a heartache, but will touch your heart as well.
                </p>
                <p>
                  This poetry book will summon your ripples of laughter of your childhood again in front of your eyes.
                </p>
                <p className="font-semibold text-[#1A1A1A] italic">
                  _These are not sad poems, but honest one._
                </p>
              </div>
              <button className="pill-btn mt-8">
                Read first poem free →
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
                  src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1785697666/ChatGPT_Image_Aug_3_2026_12_36_44_AM_1_lvnslj.png"
                  alt="Story atmosphere"
                  className="w-full h-full object-cover filter sepia-[20%] hover:sepia-0 transition-all duration-500"
                />
              </div>

              {/* Mini-stats row */}
              <div className="grid grid-cols-3 gap-4">
                {[


                  { val: "57", label: "poems" },
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
            SECTION 5 — MEET DANIYA
        ──────────────────────────────────────────────── */}
        <section className="py-16 md:py-24 px-5 max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-8 md:gap-12 items-start"
          >
            {/* Author Info */}
            <motion.div variants={fadeUp} className="relative flex flex-col items-center">

              {/* About the Author */}
              <div className="text-center w-full max-w-sm">
                <h3 className="font-display italic text-3xl mb-4 text-[#1A1A1A]">About The Author</h3>
                <p className="font-body text-[#555] leading-relaxed mb-6">
                  "What’s the purpose of saying anything about myself when my dear readers will judge me by how deeply I touched their hearts?"
                </p>

                {/* Instagram Profile Replica */}
                <div className="bg-[#121212] text-white border-2 border-[#1A1A1A] rounded-2xl p-5 mb-6 text-left shadow-[4px_4px_0px_#1A1A1A] font-ui w-full">
                  <div className="flex items-center gap-4 mb-4">
                    {/* Story Ring & PFP */}
                    <div className="relative shrink-0">
                      <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-[#FEDA75] via-[#D62976] to-[#962FBF]">
                        <div className="w-full h-full rounded-full border-2 border-[#121212] overflow-hidden bg-zinc-800">
                           <img src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1785698669/471294185_1283175799591646_5032088166272439393_n_y64bdi.jpg" alt="Daniya" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>
                    {/* Header */}
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="font-bold text-lg tracking-tight">altruistic_writer</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#38bdf8" className="w-4 h-4"><path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" /></svg>
                      </div>
                      <p className="text-sm text-gray-300">✯Daniya | دانیہ</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-3 mb-4 text-[13px] border-y border-gray-800 py-3">
                    <div className="text-gray-300"><span className="font-bold text-white">1,186</span> posts</div>
                    <div className="text-gray-300"><span className="font-bold text-white">170K</span> followers</div>
                    <div className="text-gray-300"><span className="font-bold text-white">126</span> following</div>
                  </div>

                  {/* Bio */}
                  <div className="text-[13px] text-gray-200 space-y-0.5 mb-3 leading-snug">
                    <p className="text-gray-400">Writer</p>
                    <p>debut book, ‘Deserted Hearts’ coming soon🫶🏽</p>
                    <p>quotes| poetry| kindness</p>
                    <p>dm for paid promotions&lt;3</p>
                  </div>
                  
                  {/* Link */}
                  <a href="https://allpoetry.com/Daniya" target="_blank" className="text-blue-300 text-[13px] font-medium flex items-center gap-1.5 hover:underline">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                    allpoetry.com/Daniya
                  </a>
                </div>
                
                {/* Instagram Highlight */}
                <a 
                  href="https://instagram.com/altruistic_writer" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex flex-col items-center justify-center bg-[#F7E56B] border-2 border-[#1A1A1A] rounded-2xl p-4 shadow-[4px_4px_0px_#1A1A1A] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1A1A1A] transition-all w-full"
                >
                  <span className="font-ui text-xs uppercase tracking-widest text-[#888] mb-1">Follow her journey</span>
                  <span className="font-display italic text-2xl text-[#1A1A1A]">@altruistic_writer</span>
                </a>
              </div>
            </motion.div>

            {/* Letter */}
            <motion.div variants={fadeUp} className="card-neo p-8 md:p-10 sticky top-24">
              <div className="badge-tag mb-6 inline-block">a letter from daniya</div>
              <h2 className="font-display italic text-3xl mb-6">Dear Readers,</h2>
              <div className="space-y-4 text-[#555] leading-relaxed">
                <p>The thought of this book was once a seed, not knowing who would water it, which flower would thrive, or who would pluck it. But as God sent me promises and help from the unimaginable, this poetry collection paved its way.</p>
                <p>This book is for those who find it difficult to cross the threshold of childhood, who cannot disentangle themselves from nostalgia and memories, for every soul that lost its own Freny.</p>
                <p className="text-[#1A1A1A] font-semibold mt-6">I am terrified to share it which probably means it's time to show.</p>
              </div>
              <div className="mt-8 pt-6 border-t-2 border-dashed border-[#D8CFC0]">
                <p className="font-display italic text-2xl">Daniya Khan</p>
                <p className="font-ui text-xs text-[#888] mt-1">Poet · Deserted Hearts</p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ────────────────────────────────────────────────
            SECTION 5.5 — THE MYSTERY BOX EXPLAINER
        ──────────────────────────────────────────────── */}
        <section className="py-12 md:py-20 px-5 max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="border-2 border-[#1A1A1A] rounded-[20px] bg-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_#1A1A1A] transition-all duration-200 text-[#F5F0E8] p-6 md:p-14 text-center relative overflow-hidden"
          >
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F2A7B0] rounded-full blur-[100px] opacity-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B497D6] rounded-full blur-[100px] opacity-20 pointer-events-none" />
            
            <motion.div variants={fadeUp} className="relative z-10">
              <span className="badge-tag-yellow mb-6">best value</span>
              <h2 className="font-display italic text-4xl md:text-5xl mb-6">
                Get your pre-order book with the <span className="text-[#B497D6]">Mystery Box</span> bundle.
              </h2>
              <p className="font-body text-lg md:text-xl text-[#CCC] leading-relaxed max-w-2xl mx-auto mb-8">
                The beautiful <i>Deserted Hearts</i> book is permanently included. But along with the book, you will receive a secret, curated surprise gift from us that will absolutely make your month and day.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="bg-[#2A2A2A] rounded-2xl px-6 py-4 flex items-center gap-4">
                  <div className="text-3xl">📕</div>
                  <div className="text-left">
                    <p className="font-ui font-bold text-sm">The Book</p>
                    <p className="font-ui text-xs text-[#888]">Guaranteed</p>
                  </div>
                </div>
                <div className="text-[#555] text-xl">+</div>
                <div className="bg-[#2A2A2A] border border-[#B497D6]/30 rounded-2xl px-6 py-4 flex items-center gap-4 relative">
                  <div className="absolute -top-2 -right-2 text-xl animate-bounce">✨</div>
                  <div className="text-3xl">🎁</div>
                  <div className="text-left">
                    <p className="font-ui font-bold text-sm text-[#B497D6]">Secret Gift</p>
                    <p className="font-ui text-xs text-[#888]">A beautiful surprise</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ────────────────────────────────────────────────
            SECTION 6 — THE OFFER (TICKET LAYOUT)
        ──────────────────────────────────────────────── */}
        <section className="py-12 md:py-16 px-5 bg-[#E8E2D5]">
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
                    { icon: "📕", title: "First Edition Paperback", desc: "The debut poetry collection, beautifully printed.", tag: "the book" },
                    { icon: "📖", title: "The Lost Chapter (Digital)", desc: "Exclusive digital poems and behind-the-scenes.", tag: "free" },
                    { icon: "📦", title: "Free Tracked Shipping", desc: "Delivered safely anywhere across Pan-India.", tag: "free" },
                    { icon: "🎁", title: "The Mystery Box", desc: "Available in the premium bundle. Includes vintage polaroids, a wax-sealed secret poem, and nostalgic goodies.", tag: "mystery" },
                    { icon: "✍️", title: "Personal Dedication", desc: "Included in the Mystery Box bundle.", tag: "mystery" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 pb-5 border-b border-dashed border-[#D8CFC0] last:border-0 last:pb-0">
                      <div className="text-3xl shrink-0">{item.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-ui font-semibold text-base">{item.title}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border border-[#1A1A1A] ${item.tag === "free" ? "bg-[#A8D8C0]" : item.tag === "mystery" ? "bg-[#B497D6]" : "bg-[#F2A7B0]"}`}>
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
                    <p className="font-ui text-xs text-[#888] line-through mb-1">Total value: ₹999</p>
                    <p className="font-display italic text-4xl font-bold text-[#1A1A1A]">Starts at ₹229</p>
                    <p className="font-ui text-xs text-[#888] mt-1">First edition paperback</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <button className="pill-btn-pink text-base px-8 py-4" onClick={() => router.push('/daniya-khan/checkout')}>
                      Secure my Mystery Box ↗
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
        <section className="py-16 md:py-24 px-5 max-w-2xl mx-auto">
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
        <section className="py-16 md:py-24 px-5 bg-[#1A1A1A] relative overflow-hidden">
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
