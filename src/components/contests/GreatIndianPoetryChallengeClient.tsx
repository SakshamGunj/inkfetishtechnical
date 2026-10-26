'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  CheckCircle2,
  Send,
  ArrowRight,
  Clock,
  ChevronDown,
  Trophy,
  Award,
  Sparkles,
  FileText,
  PenTool,
} from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/* ──────────────────────────────────────────────────────────────────────────
   CUSTOM SVG EMBLEM: Open Book & Feather Quill (Matches Poster Artwork 1:1)
   ────────────────────────────────────────────────────────────────────────── */
export function BookQuillEmblem({
  className = 'w-full max-w-[260px] xs:max-w-[300px] sm:max-w-[430px]',
}: {
  className?: string;
}) {
  return (
    <div className={`relative mx-auto select-none ${className}`}>
      <svg
        viewBox="0 0 640 310"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible drop-shadow-[0_10px_30px_rgba(0,10,60,0.65)]"
      >
        <defs>
          <radialGradient id="pastelVioletLeft" cx="35%" cy="65%" r="45%">
            <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.65" />
            <stop offset="55%" stopColor="#F472B6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="pastelCoralRight" cx="55%" cy="48%" r="45%">
            <stop offset="0%" stopColor="#FB7185" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#F472B6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="pastelQuillTip" cx="65%" cy="30%" r="48%">
            <stop offset="0%" stopColor="#E879F9" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#93C5FD" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="pastelRightCorner" cx="65%" cy="60%" r="50%">
            <stop offset="0%" stopColor="#FB7185" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── LEFT BOOK PAGES (3 Fanned Layers) ── */}
        <path
          d="M300 264 C 282 196, 232 140, 152 118 L 132 162 C 210 176, 266 216, 297 265 Z"
          fill="#FFFFFF"
        />
        <path
          d="M294 266 C 266 212, 206 180, 124 170 L 105 215 C 190 218, 252 238, 291 267 Z"
          fill="#FFFFFF"
        />
        <path
          d="M294 266 C 266 212, 206 180, 124 170 L 105 215 C 190 218, 252 238, 291 267 Z"
          fill="url(#pastelVioletLeft)"
        />
        <path
          d="M286 268 C 248 242, 184 224, 98 223 L 82 264 C 166 256, 238 260, 284 269 Z"
          fill="#FFFFFF"
        />
        <path
          d="M286 268 C 248 242, 184 224, 98 223 L 82 264 C 166 256, 238 260, 284 269 Z"
          fill="url(#pastelVioletLeft)"
        />

        {/* ── RIGHT BOOK PAGES (3 Fanned Layers) ── */}
        <path
          d="M306 264 C 324 196, 374 140, 454 118 L 474 162 C 396 176, 340 216, 309 265 Z"
          fill="#FFFFFF"
        />
        <path
          d="M312 266 C 340 212, 396 182, 472 171 L 460 218 C 396 221, 348 240, 315 267 Z"
          fill="#FFFFFF"
        />
        <path
          d="M312 266 C 340 212, 396 182, 472 171 L 460 218 C 396 221, 348 240, 315 267 Z"
          fill="url(#pastelCoralRight)"
        />
        <path
          d="M320 268 C 352 246, 396 232, 446 228 L 434 263 C 392 260, 352 263, 320 268 Z"
          fill="#FFFFFF"
        />
        <path d="M460 226 L 498 224 L 516 265 L 452 264 Z" fill="#FFFFFF" />
        <path
          d="M460 226 L 498 224 L 516 265 L 452 264 Z"
          fill="url(#pastelRightCorner)"
        />

        {/* ── FEATHER QUILL PEN ── */}
        <path
          d="M446 236 C 454 166, 496 74, 578 16 C 542 74, 496 156, 450 242 Z"
          fill="#FFFFFF"
        />
        <path
          d="M446 236 C 454 166, 496 74, 578 16 C 542 74, 496 156, 450 242 Z"
          fill="url(#pastelQuillTip)"
        />
        <path
          d="M445 235
             C 452 162, 496 68, 578 16
             C 572 48, 558 76, 540 96
             L 557 93
             C 543 116, 526 135, 506 148
             L 528 145
             C 512 166, 494 182, 474 192
             L 495 190
             C 480 208, 464 218, 449 224
             Z"
          fill="#FFFFFF"
        />
        <path
          d="M445 235
             C 452 162, 496 68, 578 16
             C 572 48, 558 76, 540 96
             L 557 93
             C 543 116, 526 135, 506 148
             L 528 145
             C 512 166, 494 182, 474 192
             L 495 190
             C 480 208, 464 218, 449 224
             Z"
          fill="url(#pastelQuillTip)"
        />

        <path
          d="M552 46 C 508 106, 466 184, 444 268"
          stroke="#041E72"
          strokeWidth="4.5"
          strokeLinecap="round"
        />

        <path
          d="M72 271 L 284 271 C 296 271, 300 278, 303 280 C 306 278, 310 271, 322 271 L 444 271"
          stroke="#FFFFFF"
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M448 258 C 443 274, 442 282, 452 278 C 482 266, 525 268, 562 282 C 588 292, 614 294, 632 289"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   CUSTOM SVG FEATURE ICONS (Mobile & Desktop Responsive)
   ────────────────────────────────────────────────────────────────────────── */
function ThemeSubjectIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-1.5 sm:mb-3 drop-shadow-[0_0_10px_rgba(244,114,182,0.35)]"
    >
      <rect x="10" y="8" width="34" height="44" rx="5" stroke="white" strokeWidth="3.2" fill="#041D6E" />
      <line x1="17" y1="18" x2="26" y2="18" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <line x1="17" y1="25" x2="36" y2="25" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <line x1="17" y1="32" x2="34" y2="32" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <line x1="17" y1="39" x2="28" y2="39" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <g transform="translate(26, 22)">
        <path
          d="M22 4 L28 10 L11 27 L3 29 L5 21 Z"
          fill="#041D6E"
          stroke="white"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <line x1="18" y1="8" x2="24" y2="14" stroke="white" strokeWidth="2.8" />
      </g>
    </svg>
  );
}

function WordLimitIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-1.5 sm:mb-3 drop-shadow-[0_0_10px_rgba(244,114,182,0.35)]"
    >
      <rect x="14" y="8" width="36" height="48" rx="6" stroke="white" strokeWidth="3.2" fill="#041D6E" />
      {[20, 28, 36, 44].map((y) => (
        <React.Fragment key={y}>
          <circle cx="22" cy={y} r="2" fill="white" />
          <line x1="28" y1={y} x2="42" y2={y} stroke="white" strokeWidth="3" strokeLinecap="round" />
        </React.Fragment>
      ))}
    </svg>
  );
}

function TrophyPrizeIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-1.5 sm:mb-3 drop-shadow-[0_0_12px_rgba(244,114,182,0.4)]"
    >
      <defs>
        <radialGradient id="trophyGlow" cx="50%" cy="35%" r="50%">
          <stop offset="0%" stopColor="#F9A8D4" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
        </radialGradient>
      </defs>
      <path
        d="M18 14 H11 C9 14 8 16 8 19 C8 26 13 31 20 31"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M46 14 H53 C55 14 56 16 56 19 C56 26 51 31 44 31"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M17 10 H47 V24 C47 33 40 39 32 39 C24 39 17 33 17 24 V10 Z"
        fill="url(#trophyGlow)"
      />
      <rect x="29" y="38" width="6" height="11" fill="white" />
      <rect x="21" y="48" width="22" height="4.5" rx="2" fill="white" />
      <rect x="17" y="53" width="30" height="4" rx="2" fill="white" />
    </svg>
  );
}

function AppreciationLetterIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-1.5 sm:mb-3 drop-shadow-[0_0_10px_rgba(244,114,182,0.35)]"
    >
      <path
        d="M36 46 H12 C9.8 46 8 44.2 8 42 V14 C8 11.8 9.8 10 12 10 H52 C54.2 10 56 11.8 56 14 V38"
        stroke="white"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="#041D6E"
      />
      <line x1="16" y1="21" x2="36" y2="21" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <line x1="16" y1="29" x2="28" y2="29" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <circle cx="45" cy="40" r="8" fill="#041D6E" stroke="white" strokeWidth="3.2" />
      <path
        d="M41 47 L39 57 L45 53 L51 57 L49 47"
        stroke="white"
        strokeWidth="2.8"
        strokeLinejoin="round"
        fill="#041D6E"
      />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ────────────────────────────────────────────────────────────────────────── */
export default function GreatIndianPoetryChallengeClient({
  standaloneRegister = false,
}: {
  standaloneRegister?: boolean;
}) {
  const router = useRouter();
  const [checkingSubmitted, setCheckingSubmitted] = useState(true);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    age: '',
    language: 'English',
    poetryTheme: '',
    poetryTitle: '',
    poetryContent: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // If the user has already submitted (saved in localStorage), instantly take them to the Thank You page!
  useEffect(() => {
    try {
      const existing = localStorage.getItem('gipc_submitted_2026');
      if (existing) {
        const parsed = JSON.parse(existing);
        if (parsed?.registrationId) {
          router.replace('/great-indian-poetry-challenge/thank-you');
          return;
        }
      }
    } catch {
      // ignore localStorage read errors
    }
    setCheckingSubmitted(false);
  }, [router]);

  // Calculate non-empty lines for the 40-line maximum rule
  const getLineCount = (text: string) => {
    if (!text.trim()) return 0;
    return text
      .split(/\r?\n/)
      .filter((line) => line.trim().length > 0).length;
  };

  const currentLineCount = getLineCount(formData.poetryContent);

  const scrollToRegister = () => {
    const el = document.getElementById('register-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.whatsapp.trim() ||
      !formData.age.trim()
    ) {
      setErrorMessage('Please fill in all required personal details.');
      return;
    }

    const cleanPhone = formData.whatsapp.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit WhatsApp number.');
      return;
    }

    if (!formData.poetryTheme.trim() || !formData.poetryTitle.trim() || !formData.poetryContent.trim()) {
      setErrorMessage('Please enter your Poetry Theme, Poetry Title, and Poetry Content.');
      return;
    }

    if (currentLineCount > 40) {
      setErrorMessage(
        `Your poem currently has ${currentLineCount} lines. Please keep it within the 40 lines maximum limit.`
      );
      return;
    }

    setIsSubmitting(true);
    const regCode = `GIPC-${Math.floor(100000 + Math.random() * 900000)}`;

    const submissionPayload = {
      registrationId: regCode,
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      whatsapp: cleanPhone,
      age: formData.age.trim(),
      language: formData.language,
      poetryTheme: formData.poetryTheme.trim(),
      poetryTitle: formData.poetryTitle.trim(),
      poetryContent: formData.poetryContent.trim(),
      lineCount: currentLineCount,
      entryFee: 'FREE',
      contestName: 'The Great Indian Free Poetry Challenge',
      status: 'SUBMITTED',
      submittedAtIso: new Date().toISOString(),
    };

    try {
      // Save in the dedicated new Firestore collection: great_indian_free_poetry_challenge
      await addDoc(collection(db, 'great_indian_free_poetry_challenge'), {
        ...submissionPayload,
        createdAt: serverTimestamp(),
      });

      // Mark as submitted in localStorage so future visits instantly redirect to Thank You page
      localStorage.setItem('gipc_submitted_2026', JSON.stringify(submissionPayload));

      // Redirect to Thank You page
      router.push('/great-indian-poetry-challenge/thank-you');
    } catch (err: any) {
      console.error('Error saving to Firebase:', err);
      setErrorMessage('Unable to submit right now. Please check your internet connection and try again.');
      setIsSubmitting(false);
    }
  };

  if (checkingSubmitted) {
    return (
      <div className="min-h-screen bg-[#010B2E] flex items-center justify-center text-white">
        <Clock className="w-7 h-7 animate-spin text-blue-300" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#010B2E] text-white font-['Poppins',sans-serif] selection:bg-pink-400 selection:text-[#010B2E] relative overflow-x-hidden">
      {/* Fonts & Royal Blue Canvas Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Damion&family=Poppins:wght@400;500;600;700;800;900&family=Satisfy&display=swap');

        .font-poetry-script {
          font-family: 'Damion', 'Satisfy', cursive;
        }

        .royal-poster-bg {
          background:
            radial-gradient(circle at 50% 34%, rgba(16, 82, 240, 0.94) 0%, rgba(5, 38, 145, 0.96) 46%, rgba(1, 11, 48, 1) 100%);
        }

        .royal-section-bg {
          background:
            radial-gradient(circle at 50% 0%, rgba(12, 62, 198, 0.5) 0%, rgba(2, 14, 58, 0.98) 70%, rgba(1, 9, 38, 1) 100%);
        }

        .canvas-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════════════
          1. HERO SECTION — MOBILE-OPTIMIZED POSTER REPLICA
         ══════════════════════════════════════════════════════════════════════ */}
      {!standaloneRegister && (
        <section className="relative royal-poster-bg pt-9 pb-12 sm:pt-14 sm:pb-16 px-5 sm:px-6 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 canvas-grain" />

          <div className="pointer-events-none absolute top-[32%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[600px] h-[280px] sm:h-[600px] rounded-full bg-blue-500/25 blur-[90px] sm:blur-[110px]" />
          <div className="pointer-events-none absolute top-[22%] left-1/2 -translate-x-1/2 w-[220px] sm:w-[420px] h-[160px] rounded-full bg-pink-400/10 blur-[80px]" />

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
            {/* INITIATIVE BY ink.fetish */}
            <div className="mb-2 sm:mb-4">
              <p className="text-[10px] sm:text-sm tracking-[0.28em] uppercase font-medium text-white/90 mb-0.5">
                INITIATIVE BY
              </p>
              <div className="text-2xl sm:text-4xl font-extrabold tracking-[-0.04em] text-white leading-none">
                ink.fetish
              </div>
            </div>

            {/* OPEN BOOK & QUILL ARTWORK */}
            <div className="w-full my-1 sm:my-2">
              <BookQuillEmblem />
            </div>

            {/* STACKED TITLE TYPOGRAPHY */}
            <div className="mt-1 sm:mt-2 flex flex-col items-center select-none">
              <span className="text-[1.75rem] xs:text-[2rem] sm:text-5xl md:text-[3.5rem] font-extrabold tracking-[-0.03em] text-white leading-[1.02] drop-shadow-[0_4px_20px_rgba(0,10,50,0.5)]">
                The Great
              </span>

              <h1 className="flex flex-col items-center">
                <span className="text-[3.5rem] xs:text-[4rem] sm:text-[6.5rem] md:text-[7.75rem] font-black lowercase tracking-[-0.045em] text-white leading-[0.86] drop-shadow-[0_6px_25px_rgba(0,10,50,0.55)]">
                  indian
                </span>

                <span className="font-poetry-script text-[3rem] xs:text-[3.45rem] sm:text-[5.6rem] md:text-[6.8rem] text-white leading-[0.84] -mt-1 sm:-mt-3 -mb-0.5 sm:-mb-2 px-3 drop-shadow-[0_6px_24px_rgba(0,12,60,0.75)]">
                  free poetry
                </span>

                <span className="text-[2.95rem] xs:text-[3.35rem] sm:text-[5.6rem] md:text-[6.8rem] font-black lowercase tracking-[-0.045em] text-white leading-[0.94] drop-shadow-[0_6px_25px_rgba(0,10,50,0.55)]">
                  challenge
                </span>
              </h1>
            </div>

            {/* 4-COLUMN FEATURE STRIP */}
            <div className="w-full max-w-3xl mt-9 sm:mt-12 grid grid-cols-4 divide-x divide-white/30">
              {/* Item 1 */}
              <div className="px-1.5 sm:px-5 flex flex-col items-center justify-start text-center">
                <ThemeSubjectIcon />
                <span className="text-[7.5px] xs:text-[8.5px] sm:text-xs uppercase tracking-[0.06em] sm:tracking-[0.15em] text-white/85 font-medium leading-tight mb-1">
                  THEME / SUBJECT
                </span>
                <span className="text-xs xs:text-sm sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
                  Open
                </span>
              </div>

              {/* Item 2 */}
              <div className="px-1.5 sm:px-5 flex flex-col items-center justify-start text-center">
                <WordLimitIcon />
                <span className="text-[7.5px] xs:text-[8.5px] sm:text-xs uppercase tracking-[0.06em] sm:tracking-[0.14em] text-white/85 font-medium leading-tight mb-1">
                  POETRY WORD LIMIT
                </span>
                <span className="text-xs xs:text-sm sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
                  40 Lines
                  <br />
                  Maximum
                </span>
              </div>

              {/* Item 3 */}
              <div className="px-1.5 sm:px-5 flex flex-col items-center justify-start text-center">
                <TrophyPrizeIcon />
                <span className="text-[7.5px] xs:text-[8.5px] sm:text-xs uppercase tracking-[0.06em] sm:tracking-[0.14em] text-white/85 font-medium leading-tight mb-1">
                  TROPHY OR
                  <br />
                  CASH PRIZES
                </span>
                <span className="text-xs xs:text-sm sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
                  for Top 10
                </span>
              </div>

              {/* Item 4 */}
              <div className="px-1.5 sm:px-5 flex flex-col items-center justify-start text-center">
                <AppreciationLetterIcon />
                <span className="text-[7.5px] xs:text-[8.5px] sm:text-xs uppercase tracking-[0.06em] sm:tracking-[0.14em] text-white/85 font-medium leading-tight mb-1">
                  APPRECIATION
                  <br className="sm:hidden" /> LETTER
                </span>
                <span className="text-xs xs:text-sm sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
                  for All
                </span>
              </div>
            </div>

            {/* POSTER PILL CTA */}
            <div className="mt-9 sm:mt-12 flex flex-col items-center w-full max-w-sm">
              <button
                type="button"
                onClick={scrollToRegister}
                className="w-full rounded-full bg-white hover:bg-blue-50 text-[#010B2E] py-3.5 sm:py-4 px-6 text-xs sm:text-base font-extrabold uppercase tracking-[0.2em] sm:tracking-[0.24em] shadow-[0_8px_30px_rgba(255,255,255,0.28)] active:scale-[0.99] transition-all duration-300"
              >
                REGISTER &amp; SUBMIT POETRY
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          2. COMPACT, CALM REGISTRATION & POEM SUBMISSION FORM
             (Fits comfortably on mobile screens with crisp white fields)
         ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="register-section"
        className="relative royal-section-bg py-8 sm:py-16 px-4 sm:px-6"
      >
        <div className="pointer-events-none absolute inset-0 canvas-grain" />

        <div className="relative z-10 max-w-lg mx-auto">
          <div className="rounded-2xl sm:rounded-3xl bg-[#04185E]/90 border border-white/20 shadow-[0_16px_48px_rgba(0,6,32,0.65)] p-4 xs:p-5 sm:p-7">
            {/* Simple, Calm Header */}
            <div className="text-center pb-4 mb-4 border-b border-white/15">
              <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-pink-200 mb-1">
                100% FREE ENTRY
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                Submit Your Poem
              </h2>
            </div>

            {/* Compact Form Body */}
            <form
              onSubmit={handleRegisterSubmit}
              className="space-y-3 sm:space-y-4"
            >
              {/* Row 1: Full Name */}
              <div>
                <label className="block text-[11px] font-medium text-blue-100/90 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full rounded-lg bg-white text-[#010B2E] font-medium px-3 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              {/* Row 2: WhatsApp (2/3) + Age (1/3) side-by-side on mobile */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                <div className="col-span-2">
                  <label className="block text-[11px] font-medium text-blue-100/90 mb-1">
                    WhatsApp Number *
                  </label>
                  <div className="flex rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-pink-300">
                    <span className="inline-flex items-center px-2.5 bg-slate-100 border-r border-slate-200 text-xs font-bold text-[#052691]">
                      +91
                    </span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      required
                      maxLength={10}
                      autoComplete="tel"
                      placeholder="10-digit number"
                      value={formData.whatsapp}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          whatsapp: e.target.value.replace(/\D/g, '').slice(0, 10),
                        })
                      }
                      className="w-full bg-white text-[#010B2E] font-medium px-2.5 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-blue-100/90 mb-1">
                    Age *
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    required
                    min={8}
                    max={99}
                    placeholder="21"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full rounded-lg bg-white text-[#010B2E] font-medium px-3 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>
              </div>

              {/* Row 3: Email Address */}
              <div>
                <label className="block text-[11px] font-medium text-blue-100/90 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg bg-white text-[#010B2E] font-medium px-3 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              {/* Row 4: Language + Poetry Theme side-by-side on mobile */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-blue-100/90 mb-1">
                    Language *
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="w-full rounded-lg bg-white text-[#010B2E] font-medium px-2.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                  >
                    <option value="English">English</option>
                    <option value="Hinglish">Hinglish</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Punjabi">Punjabi</option>
                    <option value="Urdu">Urdu</option>
                    <option value="Marathi">Marathi</option>
                    <option value="Bengali">Bengali</option>
                    <option value="Gujarati">Gujarati</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Malayalam">Malayalam</option>
                    <option value="Kannada">Kannada</option>
                    <option value="Odia">Odia</option>
                    <option value="Assamese">Assamese</option>
                    <option value="Kashmiri">Kashmiri</option>
                    <option value="Sanskrit">Sanskrit</option>
                    <option value="Other Indian Language">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-blue-100/90 mb-1">
                    Poetry Theme *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Love, Life, Open..."
                    value={formData.poetryTheme}
                    onChange={(e) => setFormData({ ...formData, poetryTheme: e.target.value })}
                    className="w-full rounded-lg bg-white text-[#010B2E] font-medium px-3 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                </div>
              </div>

              {/* Row 5: Poetry Title */}
              <div>
                <label className="block text-[11px] font-medium text-blue-100/90 mb-1">
                  Poetry Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Title of your poem"
                  value={formData.poetryTitle}
                  onChange={(e) => setFormData({ ...formData, poetryTitle: e.target.value })}
                  className="w-full rounded-lg bg-white text-[#010B2E] font-medium px-3 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              {/* Row 6: Poetry Content (Compact 4 rows) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-medium text-blue-100/90">
                    Your Poem (Max 40 lines) *
                  </label>
                  <span
                    className={`text-[10px] font-semibold ${
                      currentLineCount > 40 ? 'text-red-300' : 'text-blue-200/80'
                    }`}
                  >
                    {currentLineCount}/40 lines
                  </span>
                </div>
                <textarea
                  rows={8}
                  required
                  placeholder="Paste or write your poem here..."
                  value={formData.poetryContent}
                  onChange={(e) => setFormData({ ...formData, poetryContent: e.target.value })}
                  className="w-full rounded-lg bg-white text-[#010B2E] font-medium p-3.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-300 leading-relaxed min-h-[180px]"
                />
              </div>

              {errorMessage && (
                <div className="rounded-lg bg-red-500/25 border border-red-400 px-3 py-2 text-xs font-medium text-white">
                  ⚠️ {errorMessage}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-gradient-to-r from-amber-300 via-yellow-200 to-pink-200 hover:brightness-105 text-[#010B2E] font-extrabold text-sm py-3.5 px-5 shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-4 h-4 animate-spin text-[#010B2E]" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Poem (Free)</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          3. SPACIOUS REWARDS, RULES, HOW IT WORKS & FAQ
         ══════════════════════════════════════════════════════════════════════ */}
      {!standaloneRegister && (
        <section className="relative royal-poster-bg py-16 sm:py-24 px-5 sm:px-6 border-t border-white/10">
          <div className="pointer-events-none absolute inset-0 canvas-grain" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-20 sm:space-y-24">
            {/* ── REWARDS AND BENEFITS FOR POETS ── */}
            <div className="space-y-8">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <p className="text-[11px] uppercase tracking-[0.25em] text-pink-200 font-semibold">
                  CHALLENGE HIGHLIGHTS
                </p>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                  REWARDS AND BENEFITS FOR POETS
                </h2>
                <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed">
                  An initiative by <strong className="text-white">ink.fetish</strong> (210,000+ community) to celebrate poets across India.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                {/* Top 10 Winners */}
                <div className="rounded-2xl bg-[#020E3B]/80 border border-white/15 p-6 sm:p-7 space-y-3">
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-pink-200 font-bold">
                    <Trophy className="w-4 h-4 text-pink-300" />
                    <span>TOP 10 WINNERS</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white">
                    Trophy or Cash Prizes for Top 10
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-blue-100/85 pt-1">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-pink-300 shrink-0 mt-0.5" />
                      <span>Winner&apos;s Trophy or Direct Cash Prize</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-pink-300 shrink-0 mt-0.5" />
                      <span>National Certificate of Excellence</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-pink-300 shrink-0 mt-0.5" />
                      <span>Featured on @ink.fetish Instagram (210K+ readers)</span>
                    </li>
                  </ul>
                </div>

                {/* Appreciation Letter for All */}
                <div className="rounded-2xl bg-[#020E3B]/80 border border-white/15 p-6 sm:p-7 space-y-3">
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-blue-200 font-bold">
                    <Award className="w-4 h-4 text-blue-200" />
                    <span>FOR ALL PARTICIPANTS</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white">
                    Appreciation Letter for All
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-blue-100/85 pt-1">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-300 shrink-0 mt-0.5" />
                      <span>Official Appreciation Letter for every participant</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-300 shrink-0 mt-0.5" />
                      <span>Reviewed by the ink.fetish editorial jury</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-300 shrink-0 mt-0.5" />
                      <span>You keep 100% copyright of your poetry</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ── RULES & ELIGIBILITY ── */}
            <div className="space-y-6">
              <div className="text-center sm:text-left">
                <p className="text-[11px] uppercase tracking-[0.25em] text-pink-200 font-semibold mb-1.5">
                  RULES &amp; ELIGIBILITY
                </p>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Simple Rules.{' '}
                  <span className="font-poetry-script font-normal text-pink-200 text-3xl sm:text-4xl">
                    Pure Poetry.
                  </span>
                </h3>
              </div>

              <div className="divide-y divide-white/15 border-y border-white/15">
                {[
                  {
                    num: '01',
                    title: 'Open Theme',
                    desc: 'Write on any subject—love, life, hope, heartbreak, or any emotion.',
                  },
                  {
                    num: '02',
                    title: '40 Lines Maximum',
                    desc: 'Any poetic style is welcome, up to 40 lines maximum.',
                  },
                  {
                    num: '03',
                    title: 'All Indian Languages',
                    desc: 'Submit in English, Hinglish, Hindi, Punjabi, Urdu, or regional languages.',
                  },
                  {
                    num: '04',
                    title: '100% Your Copyright',
                    desc: 'Your poem must be original and remains 100% yours.',
                  },
                ].map((rule) => (
                  <div
                    key={rule.num}
                    className="py-5 flex items-start gap-4"
                  >
                    <span className="text-sm font-extrabold text-pink-200/90 pt-0.5 shrink-0">
                      {rule.num}.
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                        {rule.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-blue-100/75 leading-relaxed">
                        {rule.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clean CTA Below Rules */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={scrollToRegister}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#010B2E] font-extrabold text-xs sm:text-sm px-8 py-3.5 shadow-lg hover:scale-105 active:scale-[0.99] transition-all"
                >
                  <span>Register for Free (₹0)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ── HOW IT WORKS — 2 SIMPLE STEPS ── */}
            <div className="space-y-8">
              <div className="text-center space-y-1.5">
                <p className="text-[11px] uppercase tracking-[0.25em] text-pink-200 font-semibold">
                  HOW IT WORKS
                </p>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Just 2 Simple Steps
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Step 01 */}
                <div className="rounded-2xl bg-white text-[#010B2E] p-6 sm:p-7 space-y-2.5 shadow-lg">
                  <span className="inline-block text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#052691] bg-blue-50 px-3 py-1 rounded-full">
                    STEP 01
                  </span>
                  <h4 className="text-lg font-extrabold text-[#010B2E]">
                    Submit Your Poem for Free
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Fill in your details and submit your poem (up to 40 lines) in the registration form above.
                  </p>
                </div>

                {/* Step 02 */}
                <div className="rounded-2xl bg-[#046C4E] border border-emerald-300/40 text-white p-6 sm:p-7 space-y-2.5 shadow-lg">
                  <span className="inline-block text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#064E3B] bg-white px-3 py-1 rounded-full">
                    STEP 02
                  </span>
                  <h4 className="text-lg font-extrabold text-white">
                    Join the WhatsApp Group
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-50/90 leading-relaxed">
                    On the Thank You page, join the official WhatsApp group to get all updates about your Appreciation Letter, Results, and Rewards.
                  </p>
                </div>
              </div>
            </div>

            {/* ── FAQ SECTION ── */}
            <div className="space-y-8">
              <div className="text-center space-y-1.5">
                <p className="text-[11px] uppercase tracking-[0.25em] text-pink-200 font-semibold">
                  FAQ
                </p>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="divide-y divide-white/15 border-y border-white/15">
                {[
                  {
                    q: 'Is there any registration or entry fee?',
                    a: 'No! The Great Indian Free Poetry Challenge is 100% free to enter (₹0). There are no hidden charges.',
                  },
                  {
                    q: 'What is the theme and maximum length?',
                    a: 'The theme is completely Open—you can write on any topic. The maximum poem length is 40 lines.',
                  },
                  {
                    q: 'How will I receive my Appreciation Letter & results?',
                    a: 'All updates regarding your Official Appreciation Letter, Top 10 results, and rewards are shared in the official WhatsApp Group on the Thank You page, as well as via WhatsApp and Email.',
                  },
                  {
                    q: 'Which languages can I submit my poem in?',
                    a: 'You can submit in English, Hinglish, Hindi, Punjabi, Urdu, Marathi, Bengali, Tamil, Telugu, or any Indian language.',
                  },
                  {
                    q: 'Who owns the copyright to my poem?',
                    a: 'You retain 100% copyright and ownership of your poem at all times.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="py-1">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full py-4 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-white"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-pink-200 shrink-0 transition-transform ${
                          openFaq === idx ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="pb-4 text-xs sm:text-sm text-blue-100/80 leading-relaxed">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Clean Final CTA */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={scrollToRegister}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-300 via-yellow-200 to-pink-200 text-[#010B2E] font-extrabold text-sm sm:text-base px-8 py-4 shadow-lg active:scale-[0.99] transition-all"
                >
                  <span>Register &amp; Submit Poem (₹0)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── MINIMAL ROYAL BLUE FOOTER ── */}
      <footer className="bg-[#010720] border-t border-white/10 py-10 px-5 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center space-y-1.5">
          <p className="text-[9px] tracking-[0.28em] uppercase text-blue-200/70">
            INITIATIVE BY
          </p>
          <p className="text-xl font-extrabold tracking-[-0.04em] text-white">
            ink.fetish
          </p>
          <p className="text-[11px] text-blue-200/50 pt-1">
            © {new Date().getFullYear()} Inkfetish Publication
          </p>
        </div>
      </footer>
    </div>
  );
}
