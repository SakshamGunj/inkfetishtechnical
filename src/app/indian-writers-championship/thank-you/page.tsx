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
    <div className="min-h-screen bg-[#081826] text-[#FBF6EC] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#E5C687] selection:text-[#081826] flex flex-col justify-between">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .font-championship {
          font-family: 'Cinzel', 'Cormorant Garamond', Georgia, serif;
        }

        .font-editorial {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }

        .gold-text-gradient {
          background: linear-gradient(180deg, #FFF5D6 0%, #E5C687 52%, #C89D54 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .gold-btn-gradient {
          background: linear-gradient(180deg, #F3DFB2 0%, #DFB973 50%, #C69A4B 100%);
        }
      `}</style>

      {/* Minimal Header with Official Logo */}
      <header className="bg-[#081826] border-b border-[#E5C687]/20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-2.5 min-h-16 flex items-center justify-between gap-3">
          <Link href="/indian-writers-championship" className="flex items-center gap-2.5">
            <img
              src="/images/inkfetish_logo.webp"
              alt="Inkfetish Logo"
              className="w-9 h-9 rounded-full object-cover border border-[#E5C687] shrink-0"
            />
            <div>
              <span className="font-editorial font-bold text-lg sm:text-xl text-[#FBF6EC] block leading-none">
                ink.fetish
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#E5C687] block leading-tight mt-0.5">
                216,000+ Instagram Followers · NGO-Verified
              </span>
            </div>
          </Link>
          <span className="shrink-0 px-3 py-1 rounded-full gold-btn-gradient text-[#081826] text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider">
            Submission Confirmed
          </span>
        </div>
      </header>

      <main className="max-w-lg mx-auto w-full px-4 sm:px-6 py-10">
        <div className="rounded-3xl bg-[#0D2438] border-2 border-[#E5C687]/60 text-[#FBF6EC] shadow-2xl p-6 sm:p-8 text-center space-y-6">
          <div className="w-14 h-14 rounded-full gold-btn-gradient text-[#081826] flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E5C687]">
              INDIAN WRITERS CHAMPIONSHIP
            </span>
            <h1 className="font-championship text-3xl sm:text-4xl font-bold gold-text-gradient">
              Thank You{data?.fullName ? `, ${data.fullName.split(' ')[0]}` : ''}!
            </h1>
            <p className="text-xs sm:text-sm text-[#B8CADB] max-w-sm mx-auto">
              Your championship entry has been officially registered and submitted.
            </p>
          </div>

          {/* WhatsApp Group Callout */}
          <div className="rounded-2xl bg-[#081826] border border-[#E5C687]/40 p-5 sm:p-6 space-y-3">
            <span className="inline-block px-3 py-0.5 rounded-full gold-btn-gradient text-[#081826] text-[10px] font-extrabold uppercase tracking-widest">
              IMPORTANT NEXT STEP
            </span>
            <h2 className="font-editorial font-bold text-2xl sm:text-3xl text-[#FBF6EC]">
              Join the Official WhatsApp Group
            </h2>
            <p className="text-xs font-medium text-[#B8CADB] leading-relaxed">
              Join this group to receive your <strong className="text-[#E5C687]">NGO-Verified Certificate</strong>,{' '}
              <strong className="text-[#E5C687]">Appreciation Letter</strong>,{' '}
              <strong className="text-[#FBF6EC]">Live Zoom Results Link</strong>, and Championship Updates.
            </p>
            <a
              href={WHATSAPP_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full gold-btn-gradient text-[#081826] font-extrabold text-xs sm:text-sm py-3.5 px-5 shadow-md hover:opacity-95 transition-opacity uppercase tracking-wider"
            >
              <MessageCircle className="w-4 h-4 text-[#081826]" />
              <span>Join WhatsApp Group Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Receipt Card */}
          {data && (
            <div className="rounded-2xl bg-[#081826] border border-[#E5C687]/30 text-[#FBF6EC] p-4 sm:p-5 text-left space-y-3">
              <div className="flex items-center justify-between border-b border-[#E5C687]/20 pb-2.5">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#E5C687] block">
                    Registration ID
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-[#FBF6EC]">
                    {data.registrationId}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="inline-flex items-center gap-1 rounded-lg bg-[#E5C687]/20 border border-[#E5C687]/40 text-[#E5C687] px-3 py-1 text-xs font-bold cursor-pointer"
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
                  <span className="text-[10px] uppercase font-semibold text-[#B8CADB] block">
                    Participant
                  </span>
                  <span className="font-bold text-[#FBF6EC]">{data.fullName}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-[#B8CADB] block">
                    Plan &amp; Category
                  </span>
                  <span className="font-bold text-[#E5C687]">
                    {data.tier === '2_entries'
                      ? `2 Entries + Home Delivery (${data.category}${
                          data.entry2Category && data.entry2Category !== data.category
                            ? ` & ${data.entry2Category}`
                            : ''
                        })`
                      : data.category}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] uppercase font-semibold text-[#B8CADB] block">
                    {data.entry2Title ? 'Submitted Entries' : 'Entry Title'}
                  </span>
                  <span className="font-bold text-[#FBF6EC] block">&ldquo;{data.title}&rdquo;</span>
                  {data.entry2Title && (
                    <span className="font-bold text-[#FBF6EC] block mt-0.5">
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
              className="inline-flex items-center gap-1.5 text-[#FBF6EC] hover:text-[#E5C687]"
            >
              <Instagram className="w-4 h-4 text-[#E5C687]" />
              <span>@ink.fetish</span>
            </a>
          </div>
        </div>
      </main>

      <footer className="bg-[#05101A] border-t border-[#E5C687]/20 text-[#E5C687] py-6 px-4 text-center text-xs">
        <span className="inline-flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>© {new Date().getFullYear()} Inkfetish Publication · Indian Writers Championship</span>
        </span>
      </footer>
    </div>
  );
}
