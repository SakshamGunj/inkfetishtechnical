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

      <main className="relative royal-poster-bg flex-grow py-10 sm:py-16 px-5 sm:px-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 canvas-grain" />
        <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[550px] h-[280px] sm:h-[550px] rounded-full bg-blue-500/20 blur-[100px]" />

        <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center text-center space-y-6">
          {/* Top Brand */}
          <div>
            <p className="text-[10px] tracking-[0.28em] uppercase font-medium text-white/85 mb-0.5">
              INITIATIVE BY
            </p>
            <div className="text-2xl sm:text-3xl font-extrabold tracking-[-0.04em] text-white leading-none">
              ink.fetish
            </div>
          </div>

          {/* Thank You Card */}
          <div className="w-full rounded-3xl bg-[#020E3B]/90 border border-white/20 shadow-2xl p-6 sm:p-9 text-center space-y-6">
            {/* Green Check Badge */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9 text-emerald-300" />
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Thanks for Taking Part
                {data?.fullName ? `, ${data.fullName.split(' ')[0]}!` : '!'}
              </h1>

              <p className="text-xs sm:text-sm text-blue-100/80 max-w-md mx-auto leading-relaxed">
                Your poem has been submitted for{' '}
                <strong className="text-white">The Great Indian Free Poetry Challenge</strong>.
              </p>
            </div>

            {/* ── BIG HIGHLIGHTED WHATSAPP GROUP CALLOUT ── */}
            <div className="rounded-2xl bg-[#046C4E] border border-emerald-300/60 p-5 sm:p-7 text-center space-y-4">
              <span className="inline-block text-[10px] font-extrabold uppercase tracking-[0.18em] text-emerald-100 bg-white/15 px-3 py-1 rounded-full">
                IMPORTANT NEXT STEP
              </span>

              <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                Join the Official WhatsApp Group
              </h2>

              <p className="text-xs sm:text-sm text-emerald-50/95 leading-relaxed">
                Join this WhatsApp group to receive your{' '}
                <strong className="text-white">Appreciation Letter</strong>,{' '}
                <strong className="text-white">Result Announcement</strong>,{' '}
                <strong className="text-white">Rewards</strong>, and all updates related to The Great Indian Free Poetry Challenge.
              </p>

              <div className="pt-1">
                <a
                  href={WHATSAPP_GROUP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-emerald-50 text-[#064E3B] font-extrabold text-sm sm:text-base py-4 px-5 shadow-lg active:scale-[0.99] transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-[#25D366] text-[#25D366] shrink-0" />
                  <span>Join WhatsApp Group Now</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </a>
              </div>
            </div>

            {/* Submission Receipt Box */}
            {data && (
              <div className="rounded-2xl bg-white text-[#010B2E] p-4 sm:p-5 text-left space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block">
                      Registration ID
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-[#052691]">
                      {data.registrationId}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyId}
                    className="inline-flex items-center gap-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#052691] px-2.5 py-1 text-xs font-semibold transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <span>Copy</span>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                      Poet
                    </span>
                    <span className="font-bold text-slate-900">{data.fullName}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                      Theme
                    </span>
                    <span className="font-bold text-[#052691]">{data.poetryTheme}</span>
                  </div>

                  <div className="col-span-2">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                      Poem Title
                    </span>
                    <span className="font-bold text-slate-900">&ldquo;{data.poetryTitle}&rdquo;</span>
                  </div>
                </div>
              </div>
            )}

            {/* Follow @ink.fetish CTA */}
            <div>
              <a
                href="https://www.instagram.com/ink.fetish/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm text-blue-200 hover:text-white font-medium transition-colors"
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
          © {new Date().getFullYear()} Inkfetish Publication
        </p>
      </footer>
    </div>
  );
}
