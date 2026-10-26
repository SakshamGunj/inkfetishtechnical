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
        <section className="relative royal-poster-bg pt-7 pb-10 sm:pt-14 sm:pb-16 px-3.5 sm:px-6 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 canvas-grain" />

          <div className="pointer-events-none absolute top-[32%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[600px] h-[280px] sm:h-[600px] rounded-full bg-blue-500/25 blur-[90px] sm:blur-[110px]" />
          <div className="pointer-events-none absolute top-[22%] left-1/2 -translate-x-1/2 w-[220px] sm:w-[420px] h-[160px] rounded-full bg-pink-400/10 blur-[80px]" />

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
            {/* INITIATIVE BY ink.fetish */}
            <div className="mb-1.5 sm:mb-4">
              <p className="text-[10px] sm:text-sm tracking-[0.28em] uppercase font-medium text-white/95 mb-0.5">
                INITIATIVE BY
              </p>
              <div className="text-2xl sm:text-4xl font-extrabold tracking-[-0.04em] text-white leading-none">
                ink.fetish
              </div>
            </div>

            {/* OPEN BOOK & QUILL ARTWORK */}
            <div className="w-full my-0.5 sm:my-2">
              <BookQuillEmblem />
            </div>

            {/* STACKED TITLE TYPOGRAPHY */}
            <div className="mt-0.5 sm:mt-2 flex flex-col items-center select-none">
              <span className="text-[1.75rem] xs:text-[2rem] sm:text-5xl md:text-[3.5rem] font-extrabold tracking-[-0.03em] text-white leading-[1.02] drop-shadow-[0_4px_20px_rgba(0,10,50,0.5)]">
                The Great
              </span>

              <h1 className="flex flex-col items-center">
                <span className="text-[3.6rem] xs:text-[4.1rem] sm:text-[6.5rem] md:text-[7.75rem] font-black lowercase tracking-[-0.045em] text-white leading-[0.85] drop-shadow-[0_6px_25px_rgba(0,10,50,0.55)]">
                  indian
                </span>

                <span className="font-poetry-script text-[3.1rem] xs:text-[3.55rem] sm:text-[5.6rem] md:text-[6.8rem] text-white leading-[0.82] -mt-1.5 sm:-mt-3 -mb-1 sm:-mb-2 px-3 drop-shadow-[0_6px_24px_rgba(0,12,60,0.75)]">
                  free poetry
                </span>

                <span className="text-[3.05rem] xs:text-[3.45rem] sm:text-[5.6rem] md:text-[6.8rem] font-black lowercase tracking-[-0.045em] text-white leading-[0.92] drop-shadow-[0_6px_25px_rgba(0,10,50,0.55)]">
                  challenge
                </span>
              </h1>
            </div>

            {/* 4-COLUMN FEATURE STRIP */}
            <div className="w-full max-w-4xl mt-7 sm:mt-12 grid grid-cols-4 divide-x divide-white/35">
              {/* Item 1 */}
              <div className="px-1.5 sm:px-5 flex flex-col items-center justify-start text-center">
                <ThemeSubjectIcon />
                <span className="text-[7.5px] xs:text-[8.5px] sm:text-xs uppercase tracking-[0.08em] sm:tracking-[0.15em] text-white/90 font-medium leading-tight mb-1">
                  THEME / SUBJECT
                </span>
                <span className="text-xs xs:text-sm sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
                  Open
                </span>
              </div>

              {/* Item 2 */}
              <div className="px-1.5 sm:px-5 flex flex-col items-center justify-start text-center">
                <WordLimitIcon />
                <span className="text-[7.5px] xs:text-[8.5px] sm:text-xs uppercase tracking-[0.06em] sm:tracking-[0.14em] text-white/90 font-medium leading-tight mb-1">
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
                <span className="text-[7.5px] xs:text-[8.5px] sm:text-xs uppercase tracking-[0.06em] sm:tracking-[0.14em] text-white/90 font-medium leading-tight mb-1">
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
                <span className="text-[7.5px] xs:text-[8.5px] sm:text-xs uppercase tracking-[0.06em] sm:tracking-[0.14em] text-white/90 font-medium leading-tight mb-1">
                  APPRECIATION
                  <br className="sm:hidden" /> LETTER
                </span>
                <span className="text-xs xs:text-sm sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
                  for All
                </span>
              </div>
            </div>

            {/* POSTER PILL + REGISTER CTA */}
            <div className="mt-7 sm:mt-12 flex flex-col items-center gap-3.5 sm:gap-4 w-full max-w-md px-1">
              <button
                type="button"
                onClick={scrollToRegister}
                className="w-full rounded-full border-[1.5px] border-white/90 bg-[#010929]/90 hover:bg-white hover:text-[#010B2E] text-white py-3 sm:py-4 px-5 text-[11px] xs:text-xs sm:text-base font-semibold uppercase tracking-[0.22em] sm:tracking-[0.26em] shadow-[0_8px_30px_rgba(0,5,30,0.7)] transition-all duration-300"
              >
                FREE CHALLENGE / CONTEST
              </button>

              <button
                type="button"
                onClick={scrollToRegister}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-white via-blue-50 to-pink-100 text-[#021042] font-extrabold text-sm sm:text-base px-6 py-3.5 sm:py-4 shadow-[0_0_30px_rgba(255,255,255,0.35)] active:scale-[0.99] hover:scale-[1.02] transition-all"
              >
                <span>Register & Submit Poem Now (₹0)</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <p className="text-[11px] sm:text-xs text-blue-200/85 tracking-wide leading-relaxed">
                ✨ Zero Registration Fee · Instant Confirmation · Appreciation Letter for All
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          2. HIGH-ATTENTION INLINE REGISTRATION & POEM SUBMISSION FORM
             (Directly after Hero section, with crisp WHITE input fields!)
         ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="register-section"
        className="relative royal-section-bg pt-6 pb-14 sm:py-20 px-3 sm:px-6 border-t border-white/20"
      >
        <div className="pointer-events-none absolute inset-0 canvas-grain" />

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Outer Glowing Attention Frame */}
          <div className="relative rounded-[1.75rem] sm:rounded-[2.25rem] p-[2px] bg-gradient-to-b from-white via-pink-300 to-blue-400 shadow-[0_0_55px_rgba(59,130,246,0.45)]">
            <div className="rounded-[1.65rem] sm:rounded-[2.15rem] bg-[#031554] overflow-hidden">
              {/* Bold Attention Top Banner */}
              <div className="bg-gradient-to-r from-white via-blue-50 to-pink-100 text-[#010B2E] px-4 py-3.5 sm:px-8 sm:py-4 text-center border-b-2 border-blue-200">
                <h2 className="text-lg xs:text-xl sm:text-2xl font-black tracking-tight text-[#010B2E]">
                  Fill Details & Submit Your Poem Below (₹0 Free)
                </h2>
              </div>

              {/* Form Body */}
              <form
                onSubmit={handleRegisterSubmit}
                className="p-4 xs:p-5 sm:p-8 space-y-6"
              >
                {/* PART 1: POET REGISTRATION DETAILS */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-white text-[#021042] font-black text-xs flex items-center justify-center shrink-0">
                        1
                      </span>
                      <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white">
                        Poet Registration Details
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 px-2.5 py-0.5 rounded-full">
                      FREE ENTRY
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-white mb-1.5 tracking-wide">
                        Full Name <span className="text-pink-300">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full rounded-xl bg-white text-[#010B2E] font-semibold border-2 border-white focus:border-pink-400 focus:ring-4 focus:ring-pink-400/25 px-3.5 py-3 text-base sm:text-sm placeholder:text-slate-400 placeholder:font-normal focus:outline-none shadow-sm transition-all"
                      />
                    </div>

                    {/* WhatsApp Number */}
                    <div>
                      <label className="block text-xs font-bold text-white mb-1.5 tracking-wide">
                        WhatsApp Number <span className="text-pink-300">*</span>
                      </label>
                      <div className="flex rounded-xl overflow-hidden bg-white border-2 border-white focus-within:border-pink-400 focus-within:ring-4 focus-within:ring-pink-400/25 shadow-sm transition-all">
                        <span className="inline-flex items-center px-3 bg-slate-100 border-r border-slate-200 text-xs font-extrabold text-[#052691]">
                          +91
                        </span>
                        <input
                          type="tel"
                          inputMode="numeric"
                          required
                          maxLength={10}
                          autoComplete="tel"
                          placeholder="10-digit WhatsApp number"
                          value={formData.whatsapp}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              whatsapp: e.target.value.replace(/\D/g, '').slice(0, 10),
                            })
                          }
                          className="w-full bg-white text-[#010B2E] font-semibold px-3.5 py-3 text-base sm:text-sm placeholder:text-slate-400 placeholder:font-normal focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-bold text-white mb-1.5 tracking-wide">
                        Email Address <span className="text-pink-300">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl bg-white text-[#010B2E] font-semibold border-2 border-white focus:border-pink-400 focus:ring-4 focus:ring-pink-400/25 px-3.5 py-3 text-base sm:text-sm placeholder:text-slate-400 placeholder:font-normal focus:outline-none shadow-sm transition-all"
                      />
                    </div>

                    {/* Your Age & Language */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-white mb-1.5 tracking-wide">
                          Your Age <span className="text-pink-300">*</span>
                        </label>
                        <input
                          type="number"
                          inputMode="numeric"
                          required
                          min={8}
                          max={99}
                          placeholder="e.g. 21"
                          value={formData.age}
                          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                          className="w-full rounded-xl bg-white text-[#010B2E] font-semibold border-2 border-white focus:border-pink-400 focus:ring-4 focus:ring-pink-400/25 px-3.5 py-3 text-base sm:text-sm placeholder:text-slate-400 placeholder:font-normal focus:outline-none shadow-sm transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-white mb-1.5 tracking-wide">
                          Language <span className="text-pink-300">*</span>
                        </label>
                        <select
                          value={formData.language}
                          onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                          className="w-full rounded-xl bg-white text-[#010B2E] font-semibold border-2 border-white focus:border-pink-400 focus:ring-4 focus:ring-pink-400/25 px-3 py-3 text-base sm:text-sm focus:outline-none shadow-sm transition-all"
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
                          <option value="Other Indian Language">Other Indian Language</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PART 2: POETRY THEME, POETRY TITLE & POETRY CONTENT */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-white text-[#021042] font-black text-xs flex items-center justify-center shrink-0">
                        2
                      </span>
                      <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white">
                        Your Poetry Submission
                      </span>
                    </div>
                    <span
                      className={`text-[10px] sm:text-xs font-extrabold px-2.5 py-0.5 rounded-full border ${
                        currentLineCount > 40
                          ? 'bg-red-500 text-white border-red-300'
                          : 'bg-white text-[#052691] border-white'
                      }`}
                    >
                      {currentLineCount} / 40 Lines Max
                    </span>
                  </div>

                  {/* Poetry Theme & Poetry Title */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className="block text-xs font-bold text-white mb-1.5 tracking-wide">
                        Poetry Theme <span className="text-pink-300">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Love, Life, Hope, Heartbreak, Open..."
                        value={formData.poetryTheme}
                        onChange={(e) => setFormData({ ...formData, poetryTheme: e.target.value })}
                        className="w-full rounded-xl bg-white text-[#010B2E] font-semibold border-2 border-white focus:border-pink-400 focus:ring-4 focus:ring-pink-400/25 px-3.5 py-3 text-base sm:text-sm placeholder:text-slate-400 placeholder:font-normal focus:outline-none shadow-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-white mb-1.5 tracking-wide">
                        Poetry Title <span className="text-pink-300">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter the title of your poem"
                        value={formData.poetryTitle}
                        onChange={(e) => setFormData({ ...formData, poetryTitle: e.target.value })}
                        className="w-full rounded-xl bg-white text-[#010B2E] font-semibold border-2 border-white focus:border-pink-400 focus:ring-4 focus:ring-pink-400/25 px-3.5 py-3 text-base sm:text-sm placeholder:text-slate-400 placeholder:font-normal focus:outline-none shadow-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Poetry Content */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-white tracking-wide">
                        Poetry Content (Maximum 40 Lines) <span className="text-pink-300">*</span>
                      </label>
                      <span className="text-[11px] text-blue-200 font-medium">
                        Theme: Open
                      </span>
                    </div>
                    <textarea
                      rows={8}
                      required
                      placeholder="Write or paste your poem here (up to 40 lines maximum)..."
                      value={formData.poetryContent}
                      onChange={(e) => setFormData({ ...formData, poetryContent: e.target.value })}
                      className="w-full rounded-2xl bg-white text-[#010B2E] font-medium border-2 border-white focus:border-pink-400 focus:ring-4 focus:ring-pink-400/25 p-3.5 sm:p-4 text-base sm:text-sm placeholder:text-slate-400 placeholder:font-normal focus:outline-none shadow-sm transition-all leading-relaxed"
                    />
                  </div>
                </div>

                {errorMessage && (
                  <div className="rounded-xl bg-red-500/25 border-2 border-red-400 px-4 py-3 text-xs sm:text-sm font-semibold text-white">
                    ⚠️ {errorMessage}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-2xl bg-gradient-to-r from-amber-300 via-yellow-200 to-pink-200 hover:brightness-105 text-[#010B2E] font-black text-base sm:text-lg py-4 px-6 shadow-[0_10px_35px_rgba(251,191,36,0.35)] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 disabled:opacity-60 border-2 border-white"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-5 h-5 animate-spin text-[#010B2E]" />
                      <span>Submitting Your Poem...</span>
                    </>
                  ) : (
                    <>
                      <span>SUBMIT REGISTRATION & POEM (FREE)</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-blue-100/80 leading-relaxed">
                  🔒 100% Free Challenge · Appreciation Letter for All · Instant Confirmation
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          3. CONCISE INFORMATION, REWARDS & RULES SECTION
         ══════════════════════════════════════════════════════════════════════ */}
      {!standaloneRegister && (
        <section className="relative royal-poster-bg py-12 sm:py-20 px-3.5 sm:px-6 border-t border-white/10">
          <div className="pointer-events-none absolute inset-0 canvas-grain" />

          <div className="relative z-10 max-w-4xl mx-auto space-y-10 sm:space-y-14">
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-pink-200 font-semibold bg-white/10 border border-white/15 px-3.5 py-1 rounded-full mb-3">
                CHALLENGE HIGHLIGHTS
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                REWARDS AND BENEFITS FOR POETS
              </h2>
              <p className="text-xs sm:text-sm text-blue-100/85 mt-2 leading-relaxed">
                Organized by <strong className="text-white">ink.fetish</strong> (India&apos;s 210,000+ writers community) to discover and honor poetic talent across the nation with zero entry barriers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Top 10 Winners */}
              <div className="rounded-2xl sm:rounded-3xl bg-[#020E3B]/90 border border-white/20 p-5 sm:p-7 shadow-xl">
                <div className="inline-flex items-center gap-2 bg-pink-400/15 border border-pink-300/30 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-pink-200 font-bold mb-3">
                  <Trophy className="w-3.5 h-3.5 text-pink-300" />
                  TOP 10 WINNERS
                </div>
                <h3 className="text-lg sm:text-2xl font-extrabold text-white mb-2">
                  Trophy or Cash Prizes for Top 10
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-blue-100/90 mt-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-pink-300 shrink-0 mt-0.5" />
                    <span>Winner&apos;s Trophy or Direct Cash Prize for Top 10 Poets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-pink-300 shrink-0 mt-0.5" />
                    <span>National Certificate of Excellence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-pink-300 shrink-0 mt-0.5" />
                    <span>Featured on @ink.fetish Instagram (210K+ readers)</span>
                  </li>
                </ul>
              </div>

              {/* Appreciation Letter for All */}
              <div className="rounded-2xl sm:rounded-3xl bg-[#020E3B]/90 border border-white/20 p-5 sm:p-7 shadow-xl">
                <div className="inline-flex items-center gap-2 bg-blue-400/15 border border-blue-300/30 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-blue-200 font-bold mb-3">
                  <Award className="w-3.5 h-3.5 text-blue-200" />
                  FOR ALL PARTICIPANTS
                </div>
                <h3 className="text-lg sm:text-2xl font-extrabold text-white mb-2">
                  Appreciation Letter for All
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-blue-100/90 mt-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-300 shrink-0 mt-0.5" />
                    <span>Official Appreciation Letter issued to every participant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-300 shrink-0 mt-0.5" />
                    <span>Editorial evaluation by the ink.fetish jury panel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-300 shrink-0 mt-0.5" />
                    <span>You retain 100% rights & copyright to your poetry</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contest Rules & Guidelines — Distinct Editorial Strip Layout */}
            <div className="pt-2">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-5 mb-6 border-b border-white/20">
                <div>
                  <span className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-pink-300 font-bold mb-1.5">
                    RULES &amp; ELIGIBILITY
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    Simple Rules.{' '}
                    <span className="font-poetry-script font-normal text-pink-200 text-3xl sm:text-4xl">
                      Pure Poetry.
                    </span>
                  </h3>
                </div>
                <span className="text-xs text-blue-200/80 font-medium">
                  Open to all poets &amp; beginners across India
                </span>
              </div>

              <div className="divide-y divide-white/15 border-y border-white/15">
                {[
                  {
                    num: '01',
                    tag: 'ANY TOPIC',
                    title: 'Open Theme / Subject',
                    desc: 'Write on any subject—love, life, heartbreak, hope, society, nostalgia, or any emotion close to your heart.',
                  },
                  {
                    num: '02',
                    tag: 'MAX 40 LINES',
                    title: '40 Lines Maximum Limit',
                    desc: 'Any poetic style (free verse, rhyming, ghazal, haiku, spoken word) is welcome up to 40 lines maximum.',
                  },
                  {
                    num: '03',
                    tag: 'MULTI-LANGUAGE',
                    title: 'All Indian Languages Welcome',
                    desc: 'Submit your poem in English, Hinglish, Hindi, Punjabi, Urdu, Marathi, Bengali, Tamil, Telugu, or more.',
                  },
                  {
                    num: '04',
                    tag: 'FULL OWNERSHIP',
                    title: '100% Original & Your Copyright',
                    desc: 'Your poem must be original. You retain 100% ownership and copyright of your work at all times.',
                  },
                ].map((rule) => (
                  <div
                    key={rule.num}
                    className="py-4 sm:py-5 flex items-start sm:items-center gap-3.5 sm:gap-6 group"
                  >
                    {/* Glowing Number Circle */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/10 border border-white/25 flex items-center justify-center shrink-0 font-black text-sm sm:text-base text-pink-200 shadow-inner">
                      {rule.num}
                    </div>

                    {/* Rule Title & Description */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h4 className="text-sm sm:text-lg font-extrabold text-white">
                          {rule.title}
                        </h4>
                        <span className="inline-block text-[9px] sm:text-[10px] font-black uppercase tracking-[0.16em] bg-white/15 text-blue-100 px-2.5 py-0.5 rounded-full border border-white/20">
                          {rule.tag}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed">
                        {rule.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Below Rules & Eligibility */}
              <div className="mt-7 sm:mt-8 rounded-2xl sm:rounded-3xl bg-white/10 border border-white/25 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div>
                  <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.2em] text-pink-200 block mb-1">
                    READY TO SHARE YOUR WORDS?
                  </span>
                  <h4 className="text-base sm:text-xl font-black text-white">
                    Click the button to register &amp; submit your poem for free!
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={scrollToRegister}
                  className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-white via-blue-50 to-pink-100 text-[#021042] font-black text-xs sm:text-sm px-7 py-3.5 shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-[0.99] transition-all"
                >
                  <span>Register for Free (₹0)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* How It Works — Distinct 2-Step Connected Flow */}
            <div className="py-4 sm:py-6">
              <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
                <span className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-pink-200 font-semibold bg-white/10 border border-white/15 px-3.5 py-1 rounded-full mb-2.5">
                  HOW IT WORKS
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-white">
                  Just 2 Simple Steps
                </h3>
              </div>

              <div className="relative max-w-3xl mx-auto flex flex-col md:flex-row items-stretch gap-5 md:gap-8">
                {/* Step 01 */}
                <div className="flex-1 relative rounded-3xl bg-white text-[#010B2E] p-6 sm:p-7 shadow-[0_15px_40px_rgba(0,8,45,0.6)] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#052691] text-white text-[11px] font-black uppercase tracking-[0.18em] px-3.5 py-1">
                        STEP 01
                      </span>
                      <span className="text-3xl sm:text-4xl font-black text-slate-200 select-none leading-none">
                        01
                      </span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-black text-[#010B2E] mb-2">
                      Submit Your Poem for Free
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      Fill in your basic details, choose your language &amp; poetry theme, and submit your poem (up to 40 lines) in the registration form above.
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#052691]">
                    <span>⚡ Takes under 60 seconds</span>
                    <span>₹0 Entry Fee</span>
                  </div>
                </div>

                {/* Center Connector Badge */}
                <div className="flex md:flex-col items-center justify-center -my-2 md:my-0 md:-mx-3 z-10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-pink-400 to-amber-300 text-[#010B2E] font-black flex items-center justify-center shadow-[0_0_25px_rgba(244,114,182,0.6)] border-2 border-white">
                    <ArrowRight className="w-5 h-5 rotate-90 md:rotate-0" />
                  </div>
                </div>

                {/* Step 02 */}
                <div className="flex-1 relative rounded-3xl bg-gradient-to-br from-[#064E3B] via-[#047857] to-[#065F46] border-2 border-emerald-300/80 text-white p-6 sm:p-7 shadow-[0_15px_40px_rgba(6,78,59,0.5)] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white text-[#064E3B] text-[11px] font-black uppercase tracking-[0.18em] px-3.5 py-1">
                        STEP 02
                      </span>
                      <span className="text-3xl sm:text-4xl font-black text-emerald-300/30 select-none leading-none">
                        02
                      </span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-black text-white mb-2">
                      Join the WhatsApp Group on Thank You Page
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-50/95 leading-relaxed font-medium">
                      Right after submitting, join our official WhatsApp group on the Thank You page—there you will get all updates about your <strong className="text-white underline decoration-emerald-200 underline-offset-2">Appreciation Letter, Results, Rewards, and upcoming events</strong>!
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] font-bold text-emerald-200">
                    <span>📲 Instant Group Access</span>
                    <span>All Official Updates</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section with Heading & Expanded Questions */}
            <div className="pt-2 space-y-6 max-w-2xl mx-auto">
              <div className="text-center">
                <span className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-pink-200 font-semibold bg-white/10 border border-white/15 px-3.5 py-1 rounded-full mb-2.5">
                  FAQ · FREQUENTLY ASKED QUESTIONS
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                  Got Questions? We&apos;ve Got Answers
                </h3>
                <p className="text-xs sm:text-sm text-blue-100/80 mt-1.5">
                  Everything you need to know about The Great Indian Free Poetry Challenge.
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    q: 'Is there any registration or entry fee?',
                    a: 'No! The Great Indian Free Poetry Challenge is 100% free to enter (₹0). There are no registration fees or hidden charges to submit your poem.',
                  },
                  {
                    q: 'What is the theme and maximum length?',
                    a: 'The theme/subject is completely Open—you can write on any topic or emotion of your choice. The poem length must be 40 lines maximum.',
                  },
                  {
                    q: 'How will I receive my Appreciation Letter & results?',
                    a: 'All participants will receive their Official Appreciation Letter and Top 10 result updates via the official WhatsApp Group, registered WhatsApp number, and Email.',
                  },
                  {
                    q: 'What do the Top 10 Winners receive?',
                    a: 'The Top 10 poets selected by our editorial jury will be awarded a prestigious Winner’s Trophy or Direct Cash Prize, along with a National Certificate of Excellence and a feature on @ink.fetish (210,000+ community).',
                  },
                  {
                    q: 'Will every participant receive an Appreciation Letter?',
                    a: 'Yes! Every single poet who submits an original entry receives an Official Appreciation Letter from Inkfetish Publication honoring their contribution to the challenge.',
                  },
                  {
                    q: 'Which languages can I submit my poem in?',
                    a: 'You can submit your poem in English, Hinglish, Hindi, Punjabi, Urdu, Marathi, Bengali, Gujarati, Tamil, Telugu, Malayalam, Kannada, or any other Indian language.',
                  },
                  {
                    q: 'Who owns the rights/copyright to my poem?',
                    a: 'You retain 100% copyright and ownership of your poem at all times. You are free to share or publish your poem anywhere else.',
                  },
                  {
                    q: 'Who is eligible to participate in this challenge?',
                    a: 'The challenge is open to all poets, writers, students, and beginners across India of all age groups.',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-[#020E3B]/90 border border-white/15 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full px-4 sm:px-5 py-3.5 sm:py-4 text-left flex items-center justify-between gap-3 font-bold text-xs sm:text-sm text-white hover:bg-white/[0.03] transition-colors"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-pink-300 shrink-0 transition-transform ${
                          openFaq === idx ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="px-4 sm:px-5 pb-4 text-xs sm:text-sm text-blue-100/85 leading-relaxed border-t border-white/10 pt-2.5">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Final Bottom CTA */}
              <div className="pt-4 text-center space-y-3">
                <p className="text-xs sm:text-sm text-blue-100/90 font-medium">
                  Click the button below to register and submit your poem for free!
                </p>
                <button
                  type="button"
                  onClick={scrollToRegister}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-300 via-yellow-200 to-pink-200 text-[#010B2E] font-black text-sm sm:text-base px-8 py-4 shadow-[0_10px_30px_rgba(251,191,36,0.3)] hover:scale-105 active:scale-[0.99] transition-all border-2 border-white"
                >
                  <span>Register &amp; Submit Poem for Free (₹0)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── MINIMAL ROYAL BLUE FOOTER ── */}
      <footer className="bg-[#010720] border-t border-white/10 py-8 px-4 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center space-y-2">
          <p className="text-[9px] tracking-[0.28em] uppercase text-blue-200/70">
            INITIATIVE BY
          </p>
          <p className="text-xl font-extrabold tracking-[-0.04em] text-white">
            ink.fetish
          </p>
          <p className="text-[11px] text-blue-200/50 pt-1">
            © {new Date().getFullYear()} Inkfetish Publication · The Great Indian Free Poetry Challenge
          </p>
        </div>
      </footer>
    </div>
  );
}
