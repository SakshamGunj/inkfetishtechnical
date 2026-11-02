'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Instagram,
  MessageCircle,
  ArrowRight,
  Check,
} from 'lucide-react';
import type { NovemberSubmissionRecord } from '@/components/contests/NovemberWritingContestPortal';

const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/JGQ0bTtT5agDZGkqJ5MaS8';

export default function NovemberContestThankYouPage() {
  const [data, setData] = useState<NovemberSubmissionRecord | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('november_contest_2026_submission');
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
    <div className="min-h-screen bg-[#FFF7E6] text-[#930400] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#930400] selection:text-[#FFF7E6] flex flex-col justify-between">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .font-editorial {
          font-family: 'Instrument Serif', Georgia, serif;
        }
      `}</style>

      {/* Minimal Header with Official Logo */}
      <header className="bg-[#FFF7E6] border-b border-[#930400]/12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-2.5 min-h-16 flex items-center justify-between gap-3">
          <Link href="/november-writing-contest" className="flex items-center gap-2.5">
            <img
              src="/images/inkfetish_logo.webp"
              alt="Inkfetish Logo"
              className="w-9 h-9 rounded-full object-cover border border-[#930400]/20 shrink-0"
            />
            <div>
              <span className="font-extrabold text-base sm:text-lg text-[#930400] block leading-none">
                ink.fetish
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#930400]/80 block leading-tight mt-0.5">
                Officially GST &amp; MSME Registered Company Based in India
              </span>
            </div>
          </Link>
          <span className="shrink-0 px-3 py-1 rounded-full bg-[#95BAEB]/40 text-[#930400] text-[11px] font-bold">
            Submission Confirmed
          </span>
        </div>
      </header>

      <main className="max-w-lg mx-auto w-full px-4 sm:px-6 py-10">
        <div className="rounded-3xl bg-[#930400] text-[#FFF7E6] shadow-xl p-6 sm:p-8 text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-[#95BAEB] text-[#930400] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#95BAEB]">
              NOVEMBER CONTEST 2026
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl text-[#FFF7E6]">
              Thank You{data?.fullName ? `, ${data.fullName.split(' ')[0]}` : ''}!
            </h1>
            <p className="text-xs sm:text-sm text-[#FFF7E6]/85 max-w-sm mx-auto">
              Your entry has been officially registered and submitted.
            </p>
          </div>

          {/* WhatsApp Group Callout */}
          <div className="rounded-2xl bg-[#95BAEB] text-[#930400] p-5 sm:p-6 space-y-3">
            <span className="inline-block px-3 py-0.5 rounded-full bg-[#FFF7E6] text-[#930400] text-[10px] font-extrabold uppercase tracking-widest">
              IMPORTANT NEXT STEP
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#930400]">
              Join the Official WhatsApp Group
            </h2>
            <p className="text-xs font-medium text-[#930400] leading-relaxed">
              Join this group to receive your <strong>National Certificate</strong>,{' '}
              <strong>Appreciation Letter</strong>, <strong>Result Updates</strong>, and Rewards.
            </p>
            <a
              href={WHATSAPP_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#930400] text-[#FFF7E6] font-extrabold text-xs sm:text-sm py-3.5 px-5 shadow-md hover:opacity-95 transition-opacity"
            >
              <MessageCircle className="w-4 h-4 text-[#95BAEB]" />
              <span>Join WhatsApp Group Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Receipt Card */}
          {data && (
            <div className="rounded-2xl bg-[#FFF7E6] text-[#930400] p-4 sm:p-5 text-left space-y-3">
              <div className="flex items-center justify-between border-b border-[#930400]/15 pb-2.5">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#930400]/70 block">
                    Registration ID
                  </span>
                  <span className="text-sm sm:text-base font-extrabold">{data.registrationId}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="inline-flex items-center gap-1 rounded-lg bg-[#95BAEB]/45 text-[#930400] px-3 py-1 text-xs font-bold cursor-pointer"
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
                  <span className="text-[10px] uppercase font-semibold text-[#930400]/70 block">
                    Participant
                  </span>
                  <span className="font-bold">{data.fullName}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-[#930400]/70 block">
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
                  <span className="text-[10px] uppercase font-semibold text-[#930400]/70 block">
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
            <Link href="/november-writing-contest" className="text-[#95BAEB] hover:underline">
              ← Back to Portal
            </Link>
            <a
              href="https://www.instagram.com/ink.fetish/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#FFF7E6] hover:text-[#95BAEB]"
            >
              <Instagram className="w-4 h-4 text-[#95BAEB]" />
              <span>@ink.fetish</span>
            </a>
          </div>
        </div>
      </main>

      <footer className="bg-[#930400] text-[#FFF7E6] py-6 px-4 text-center text-xs">
        © {new Date().getFullYear()} Inkfetish Publication
      </footer>
    </div>
  );
}
