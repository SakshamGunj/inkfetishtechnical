'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Instagram,
  MessageCircle,
  ArrowRight,
  Check,
  ShieldCheck,
} from 'lucide-react';
import type { IwcSubmissionRecord } from '@/components/contests/IndianWritersChampionshipPortal';

const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/JGQ0bTtT5agDZGkqJ5MaS8';

export default function IndianWritersChampionshipThankYouPage() {
  const [data, setData] = useState<IwcSubmissionRecord | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('iwc_contest_2026_submission');
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
    <div className="min-h-screen bg-[#F5F8FC] text-[#0F2744] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#0F2744] selection:text-[#F5F8FC] flex flex-col justify-between">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;1,500;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .font-editorial {
          font-family: 'Playfair Display', Georgia, serif;
        }
      `}</style>

      {/* Minimal Header with Official Logo */}
      <header className="bg-[#F5F8FC] border-b border-[#0F2744]/12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-2.5 min-h-16 flex items-center justify-between gap-3">
          <Link href="/indian-writers-championship" className="flex items-center gap-2.5">
            <img
              src="/images/inkfetish_logo.webp"
              alt="Inkfetish Logo"
              className="w-9 h-9 rounded-full object-cover border border-[#0F2744]/20 shrink-0"
            />
            <div>
              <span className="font-extrabold text-base sm:text-lg text-[#0F2744] block leading-none">
                ink.fetish
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#475A70] block leading-tight mt-0.5">
                216,000+ Instagram Followers · NGO-Verified
              </span>
            </div>
          </Link>
          <span className="shrink-0 px-3 py-1 rounded-full bg-[#E8F0FA] border border-[#B8862D]/35 text-[#0F2744] text-[11px] font-bold">
            Submission Confirmed
          </span>
        </div>
      </header>

      <main className="max-w-lg mx-auto w-full px-4 sm:px-6 py-10">
        <div className="rounded-3xl bg-[#0F2744] text-[#F5F8FC] shadow-xl p-6 sm:p-8 text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-[#E5C687] text-[#0F2744] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E5C687]">
              INDIAN WRITERS CHAMPIONSHIP
            </span>
            <h1 className="font-editorial font-bold text-3xl sm:text-4xl text-[#F5F8FC]">
              Thank You{data?.fullName ? `, ${data.fullName.split(' ')[0]}` : ''}!
            </h1>
            <p className="text-xs sm:text-sm text-[#F5F8FC]/85 max-w-sm mx-auto">
              Your championship entry has been officially registered and submitted.
            </p>
          </div>

          {/* WhatsApp Group Callout */}
          <div className="rounded-2xl bg-[#E8F0FA] text-[#0F2744] p-5 sm:p-6 space-y-3">
            <span className="inline-block px-3 py-0.5 rounded-full bg-white text-[#0F2744] text-[10px] font-extrabold uppercase tracking-widest">
              IMPORTANT NEXT STEP
            </span>
            <h2 className="font-editorial font-bold text-2xl sm:text-3xl text-[#0F2744]">
              Join the Official WhatsApp Group
            </h2>
            <p className="text-xs font-medium text-[#475A70] leading-relaxed">
              Join this group to receive your <strong className="text-[#0F2744]">NGO-Verified Certificate</strong>,{' '}
              <strong className="text-[#0F2744]">Appreciation Letter</strong>,{' '}
              <strong className="text-[#0F2744]">Live Zoom Results Link</strong>, and Championship Updates.
            </p>
            <a
              href={WHATSAPP_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F2744] text-[#F5F8FC] font-extrabold text-xs sm:text-sm py-3.5 px-5 shadow-md hover:bg-[#163459] transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#E5C687]" />
              <span>Join WhatsApp Group Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Receipt Card */}
          {data && (
            <div className="rounded-2xl bg-[#F5F8FC] text-[#0F2744] p-4 sm:p-5 text-left space-y-3">
              <div className="flex items-center justify-between border-b border-[#0F2744]/15 pb-2.5">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#475A70] block">
                    Registration ID
                  </span>
                  <span className="text-sm sm:text-base font-extrabold">{data.registrationId}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="inline-flex items-center gap-1 rounded-lg bg-[#E8F0FA] border border-[#B8862D]/35 text-[#0F2744] px-3 py-1 text-xs font-bold cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <span>Copy ID</span>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-[#475A70] block">
                    Participant
                  </span>
                  <span className="font-bold">{data.fullName}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-[#475A70] block">
                    Plan &amp; Category
                  </span>
                  <span className="font-bold">
                    {data.tier === '2_entries'
                      ? `2 Entries (${data.category}${
                          data.entry2Category && data.entry2Category !== data.category
                            ? ` & ${data.entry2Category}`
                            : ''
                        })`
                      : data.category}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] uppercase font-semibold text-[#475A70] block">
                    {data.entry2Title ? 'Submitted Entries' : 'Entry Title'}
                  </span>
                  <span className="font-bold block">&ldquo;{data.title}&rdquo;</span>
                  {data.entry2Title && (
                    <span className="font-bold block mt-0.5">
                      &ldquo;{data.entry2Title}&rdquo;
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-xs font-semibold pt-1">
            <Link href="/indian-writers-championship" className="text-[#E5C687] hover:underline">
              ← Back to Championship Portal
            </Link>
            <a
              href="https://www.instagram.com/ink.fetish/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#F5F8FC] hover:text-[#E5C687]"
            >
              <Instagram className="w-4 h-4 text-[#E5C687]" />
              <span>@ink.fetish</span>
            </a>
          </div>
        </div>
      </main>

      <footer className="bg-[#0F2744] text-[#F5F8FC] py-6 px-4 text-center text-xs">
        <span className="inline-flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#E5C687]" />
          <span>© {new Date().getFullYear()} Inkfetish Publication · Indian Writers Championship</span>
        </span>
      </footer>
    </div>
  );
}
