'use client';

import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Instagram,
  Trophy,
  Award,
  Sparkles,
  MessageCircle,
  ArrowRight,
  Check,
} from 'lucide-react';
import { BookQuillEmblem } from '@/components/contests/GreatIndianPoetryChallengeClient';

interface SubmittedData {
  registrationId: string;
  fullName: string;
  email: string;
  whatsapp: string;
  age: string;
  language: string;
  poetryTheme: string;
  poetryTitle: string;
  poetryContent: string;
  lineCount: number;
  submittedAtIso?: string;
}

const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/JGQ0bTtT5agDZGkqJ5MaS8';

export default function GreatIndianPoetryChallengeThankYouPage() {
  const [data, setData] = useState<SubmittedData | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('gipc_submitted_2026');
      if (saved) {
        setData(JSON.parse(saved));
      }
    } catch {
      // ignore storage read error
    }
  }, []);

  const handleCopyId = () => {
    if (!data?.registrationId) return;
    navigator.clipboard?.writeText(data.registrationId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#010B2E] text-white font-['Poppins',sans-serif] selection:bg-pink-400 selection:text-[#010B2E] relative overflow-x-hidden flex flex-col justify-between">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Damion&family=Poppins:wght@400;500;600;700;800;900&family=Satisfy&display=swap');

        .font-poetry-script {
          font-family: 'Damion', 'Satisfy', cursive;
        }

        .royal-poster-bg {
          background:
            radial-gradient(circle at 50% 30%, rgba(16, 82, 240, 0.94) 0%, rgba(5, 38, 145, 0.96) 48%, rgba(1, 11, 48, 1) 100%);
        }

        .canvas-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E");
        }
      `}</style>

      <main className="relative royal-poster-bg flex-grow pt-7 pb-16 sm:py-14 px-3.5 sm:px-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 canvas-grain" />
        <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[550px] h-[300px] sm:h-[550px] rounded-full bg-blue-500/25 blur-[100px]" />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center text-center">
          {/* Top Brand */}
          <div className="mb-1.5">
            <p className="text-[10px] sm:text-xs tracking-[0.28em] uppercase font-medium text-white/90 mb-0.5">
              INITIATIVE BY
            </p>
            <div className="text-2xl sm:text-3xl font-extrabold tracking-[-0.04em] text-white leading-none">
              ink.fetish
            </div>
          </div>

          {/* Compact Book & Quill Emblem */}
          <div className="w-full max-w-[190px] sm:max-w-[250px] my-0.5">
            <BookQuillEmblem className="w-full" />
          </div>

          {/* Thank You Card */}
          <div className="w-full mt-3 rounded-3xl bg-[#020E3B]/95 backdrop-blur-xl border-2 border-white/25 shadow-[0_25px_70px_rgba(0,4,24,0.85)] p-4 xs:p-6 sm:p-9 text-center space-y-6">
            {/* Green Check Badge */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_35px_rgba(52,211,153,0.4)]">
              <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11 text-emerald-300" />
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 border border-emerald-400/40 px-3.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
                <Sparkles className="w-3.5 h-3.5" />
                SUBMISSION RECEIVED
              </span>

              <h1 className="text-2xl xs:text-3xl sm:text-4xl font-black text-white leading-tight pt-1">
                Thanks for Taking Part
                {data?.fullName ? `, ${data.fullName.split(' ')[0]}!` : '!'}
              </h1>

              <p className="text-xs sm:text-sm text-blue-100/85 max-w-md mx-auto leading-relaxed">
                Thank you for participating in{' '}
                <strong className="text-white">The Great Indian Free Poetry Challenge</strong> by{' '}
                <strong className="text-white">ink.fetish</strong>. Your poem has been safely recorded in our database.
              </p>
            </div>

            {/* ── BIG HIGHLIGHTED WHATSAPP GROUP CALLOUT ── */}
            <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#064E3B] via-[#047857] to-[#065F46] border-2 border-emerald-300 p-5 sm:p-7 text-center shadow-[0_0_45px_rgba(16,185,129,0.4)] space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/30 px-3.5 py-1 text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-100">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
                IMPORTANT STEP FOR ALL PARTICIPANTS
              </div>

              <h2 className="text-xl xs:text-2xl sm:text-3xl font-black text-white leading-snug">
                Join the Official WhatsApp Group Now!
              </h2>

              <p className="text-sm sm:text-base font-medium text-emerald-50 leading-relaxed max-w-lg mx-auto">
                Join this WhatsApp group to get your <strong className="text-white underline decoration-emerald-200 underline-offset-2">Appreciation Letter Announcement</strong>, <strong className="text-white underline decoration-emerald-200 underline-offset-2">Result Announcement</strong>, <strong className="text-white underline decoration-emerald-200 underline-offset-2">Rewards</strong>, and all official updates related to <strong className="text-white">The Great Indian Free Poetry Challenge</strong>.
              </p>

              <div className="pt-1">
                <a
                  href={WHATSAPP_GROUP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 rounded-2xl bg-white hover:bg-emerald-50 text-[#064E3B] font-black text-base sm:text-lg py-4 px-6 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-[0.99] transition-all"
                >
                  <MessageCircle className="w-6 h-6 fill-[#25D366] text-[#25D366] shrink-0" />
                  <span>JOIN WHATSAPP GROUP NOW</span>
                  <ArrowRight className="w-5 h-5 shrink-0" />
                </a>
              </div>
            </div>

            {/* Submission Receipt Box */}
            {data && (
              <div className="rounded-2xl bg-white text-[#010B2E] p-4 sm:p-6 text-left shadow-lg space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 block">
                      OFFICIAL REGISTRATION ID
                    </span>
                    <span className="text-base sm:text-lg font-black text-[#052691] tracking-wide">
                      {data.registrationId}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyId}
                    className="inline-flex items-center gap-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#052691] px-3 py-1.5 text-xs font-bold transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <span>Copy ID</span>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Poet Name
                    </span>
                    <span className="font-bold text-slate-900">{data.fullName}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      WhatsApp / Email
                    </span>
                    <span className="font-semibold text-slate-700 truncate block">
                      +91 {data.whatsapp} · {data.email}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Poetry Theme
                    </span>
                    <span className="font-bold text-[#052691]">{data.poetryTheme}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Poetry Title
                    </span>
                    <span className="font-bold text-slate-900">&ldquo;{data.poetryTitle}&rdquo;</span>
                  </div>
                </div>
              </div>
            )}

            {/* Follow @ink.fetish CTA */}
            <div className="pt-1 space-y-3">
              <a
                href="https://www.instagram.com/ink.fetish/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-xs sm:text-sm py-3.5 px-6 transition-all"
              >
                <Instagram className="w-4 h-4 text-pink-300" />
                <span>Follow @ink.fetish on Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#010720] border-t border-white/10 py-6 px-4 text-center">
        <p className="text-[11px] text-blue-200/50">
          © {new Date().getFullYear()} Inkfetish Publication · The Great Indian Free Poetry Challenge
        </p>
      </footer>
    </div>
  );
}
