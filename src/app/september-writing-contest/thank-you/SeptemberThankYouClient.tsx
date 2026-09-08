'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Feather, CheckCircle2, Calendar, Video, BookOpen, Award, Edit3, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SeptemberThankYouClient() {
  const params = useSearchParams();
  const name = params.get('name') || 'Writer';
  const email = params.get('email') || '';
  const type = params.get('type') || 'Entry';
  const title = params.get('title') || 'Your Writing';

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#2C1C13] font-serif selection:bg-[#B91C1C] selection:text-white">

      {/* Nav */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-[#F4EFE6]/90 border-b border-[#E3DAC9] px-4 md:px-10 py-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#B91C1C] flex items-center justify-center text-white shadow-sm">
            <Feather className="w-4 h-4" />
          </div>
          <span className="font-serif font-bold text-lg tracking-tight text-[#2C1C13]">
            InkFetish<span className="text-[#B91C1C] text-xs align-top font-sans ml-0.5">™</span>
          </span>
        </div>
        <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-[#B91C1C]">
          September Competition
        </span>
      </nav>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-12 pb-24">

        {/* Main Card */}
        <div className="bg-[#FAF6F0] border border-[#E8DFD1] rounded-3xl shadow-xl overflow-hidden">

          {/* Top dark banner */}
          <div className="bg-[#2C1C13] px-8 py-10 text-center">
            <CheckCircle2 className="w-14 h-14 text-[#B91C1C] mx-auto mb-4" />
            <p className="font-sans font-bold text-[10px] tracking-[0.4em] text-[#9A8574] uppercase mb-2">
              E N T R Y &nbsp; R E C E I V E D
            </p>
            <h1 className="font-serif font-black text-3xl sm:text-4xl text-[#FAF6F0] uppercase leading-tight">
              YOU'RE IN,<br />
              <span className="text-[#B91C1C]">{name.split(' ')[0].toUpperCase()}!</span>
            </h1>
            <p className="font-serif italic text-sm text-[#C9B99A] mt-3">
              Your entry has been successfully submitted to the September Writing Competition.
            </p>
          </div>

          {/* Entry Summary */}
          <div className="px-8 py-6 border-b border-[#E8DFD1] space-y-3">
            <p className="font-sans font-bold text-[10px] tracking-[0.3em] text-[#7A6857] uppercase mb-4">
              E N T R Y &nbsp; S U M M A R Y
            </p>
            {[
              ['Participant', name],
              ['Email', email],
              ['Writing Type', type],
              ['Title', title],
              ['Status', 'Confirmed ✓'],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-[#F0E8DC] last:border-0">
                <span className="font-sans text-xs font-semibold text-[#7A6B5D] uppercase tracking-wider">{label}</span>
                <span className={`font-serif text-sm font-bold ${label === 'Status' ? 'text-[#16a34a]' : 'text-[#2C1C13]'}`}>{value}</span>
              </div>
            ))}
          </div>

          {/* What Happens Next */}
          <div className="px-8 py-6 border-b border-[#E8DFD1]">
            <p className="font-sans font-bold text-[10px] tracking-[0.3em] text-[#7A6857] uppercase mb-5">
              W H A T &nbsp; H A P P E N S &nbsp; N E X T
            </p>
            <div className="space-y-4">
              {[
                { icon: Edit3, title: 'Editorial Review', desc: 'Our panel reviews and scores your submission for imagery, emotion & impact.' },
                { icon: Calendar, title: 'Results on 30th September', desc: 'Winners and top entries announced on September 30th, 2026.' },
                { icon: Video, title: 'Live Zoom Ceremony', desc: 'All participants are invited to the live result announcement on Zoom.' },
                { icon: BookOpen, title: 'Anthology Publication', desc: 'Selected works get published in our official print anthology with ISBN.' },
                { icon: Award, title: 'National Certificate', desc: 'Every participant receives a verified national certificate with a unique ID.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#B91C1C]/10 border border-[#B91C1C]/20 flex items-center justify-center shrink-0 text-[#B91C1C]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-sm text-[#2C1C13] block">{title}</span>
                    <span className="font-sans text-xs text-[#7A6B5D]">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="px-8 py-8 text-center space-y-4">
            <p className="font-serif italic text-sm text-[#6B5B4C]">
              "Every great story begins with a single submission."
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://www.instagram.com/ink.fetish/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="rounded-full bg-[#2C1C13] hover:bg-[#1A100B] text-white font-sans text-xs uppercase tracking-wider font-bold px-6 py-5 gap-2">
                  <Instagram className="w-4 h-4" /> Follow on Instagram
                </Button>
              </a>
              <Link href="/september-writing-contest">
                <Button variant="outline" className="rounded-full border-[#DCD3C3] text-[#2C1C13] font-sans text-xs uppercase tracking-wider font-bold px-6 py-5 hover:bg-[#EDE5D8]">
                  Back to Contest Page
                </Button>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom note */}
        <p className="font-sans text-[11px] text-[#9A8574] text-center mt-6">
          A confirmation has been saved. For queries, reach us on Instagram @ink.fetish
        </p>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#E3DAC8] bg-[#ECE5D8] py-6 px-4 text-center font-sans">
        <span className="font-serif font-bold text-sm text-[#2C1C13]">
          InkFetish<span className="text-[#B91C1C] text-xs">™</span>
        </span>
        <p className="text-[11px] text-[#7A6B5D] mt-1">© 2026 Inkfetish Publication. All rights reserved.</p>
      </footer>
    </div>
  );
}
