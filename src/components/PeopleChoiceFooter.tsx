'use client';

import React from 'react';
import Link from 'next/link';

export function PeopleChoiceFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 bg-[#070605] border-t border-[#d4af37]/25 text-gray-400 py-8 sm:py-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <img 
            src="/images/inkfetish_logo.png" 
            alt="Inkfetish Publication" 
            className="w-7 h-7 rounded-full object-cover border border-[#d4af37]/30 shadow-[0_0_10px_rgba(212,175,55,0.3)]"
          />
          <div>
            <span className="font-serif text-sm font-semibold tracking-wider text-[#f3e5ab] block">
              People's Choice Award 2026
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#d4af37]">
              Inkfetish Publication
            </span>
          </div>
        </div>

        {/* Minimal Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-300 font-medium">
          <Link href="/people-choice-award" className="hover:text-[#fcf6ba] transition-colors">
            Award Overview
          </Link>
          <Link href="/people-choice-award/register" className="hover:text-[#fcf6ba] transition-colors">
            Apply Now
          </Link>
          <Link href="/privacy-policy" className="hover:text-[#fcf6ba] transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:text-[#fcf6ba] transition-colors">
            Terms of Service
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-[11px] text-gray-500">
          © {currentYear} Inkfetish Publication. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default PeopleChoiceFooter;
