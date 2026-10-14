'use client';

import React, { useState, useEffect, useRef, useId, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Cinzel, Playfair_Display } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Download,
  ExternalLink,
  Share2,
  CheckCircle2,
  Award,
  FileText,
  User,
  X,
  ShieldCheck,
  Check,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import Link from 'next/link';
import {
  searchSeptemberCertificates,
  highlightMatch,
  SeptemberCertificate,
  SearchHit,
  CERTIFICATES,
} from '@/lib/septemberCertificateSearch';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  display: 'swap',
});

export default function SeptemberCertificateClient() {
  const searchParams = useSearchParams();
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCert, setSelectedCert] = useState<SeptemberCertificate | null>(null);
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Live search results on every keystroke
  const results: SearchHit[] = useMemo(() => {
    return searchSeptemberCertificates(query, 8);
  }, [query]);

  const hasTyped = query.trim().length > 0;

  // Check URL query parameters on initial mount (e.g. ?sno=42 or ?name=...)
  useEffect(() => {
    const snoParam = searchParams.get('sno');
    const nameParam = searchParams.get('name');

    if (snoParam) {
      const parsedSno = parseInt(snoParam, 10);
      const matched = CERTIFICATES.find((c) => c.sno === parsedSno);
      if (matched) {
        setSelectedCert(matched);
        setQuery(matched.name);
        return;
      }
    }

    if (nameParam) {
      const hits = searchSeptemberCertificates(nameParam, 1);
      if (hits.length > 0) {
        setSelectedCert(hits[0]);
        setQuery(hits[0].name);
        return;
      }
    }
  }, [searchParams]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Reset active arrow index when query changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Select a certificate from dropdown
  const handleSelect = (cert: SeptemberCertificate) => {
    setSelectedCert(cert);
    setQuery(cert.name);
    setIsOpen(false);
    inputRef.current?.blur();

    // Update URL query string smoothly
    try {
      const newUrl = `${window.location.pathname}?sno=${cert.sno}`;
      window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
    } catch {}
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIsOpen(true);
      setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[activeIndex]) {
        handleSelect(results[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Clear query
  const handleClear = () => {
    setQuery('');
    setSelectedCert(null);
    setIsOpen(false);
    try {
      window.history.replaceState({}, '', window.location.pathname);
    } catch {}
    inputRef.current?.focus();
  };

  // Download certificate with multi-device support
  const handleDownload = () => {
    if (!selectedCert) return;
    setIsDownloading(true);

    const downloadEndpoint = `/api/september-certificates/download?sno=${selectedCert.sno}`;

    const link = document.createElement('a');
    link.href = downloadEndpoint;
    link.setAttribute('download', `Certificate_Participation_${selectedCert.name.replace(/\s+/g, '_')}.pdf`);
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  // Share functionality
  const handleShare = async () => {
    if (!selectedCert) return;
    const shareUrl = `${window.location.origin}/september-writing-contest/certificate?sno=${selectedCert.sno}`;
    const shareText = `Certificate of Participation for ${selectedCert.name} — Inkfetish September National Writing Competition 2026`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'September Writing Competition Certificate',
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {}
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {}
  };

  const showDropdown = isOpen && hasTyped;

  return (
    <div
      className="min-h-screen bg-[#F4EFE6] text-[#2C1C13] selection:bg-[#7A1A1A] selection:text-[#FAF5EE] relative overflow-x-hidden"
      style={{ fontFamily: playfair.style.fontFamily }}
    >
      {/* Subtle vintage texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.035] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative Top Accent Bar */}
      <div className="h-1.5 sm:h-2 w-full bg-gradient-to-r from-[#7A1A1A] via-[#D4AF37] to-[#7A1A1A]" />

      {/* Header Navigation - Mobile Optimized */}
      <nav className="relative z-10 border-b border-[#8A3324]/15 bg-[#FAF6EE]/90 backdrop-blur-md px-3.5 sm:px-8 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/september-writing-contest"
            className="flex items-center gap-2 sm:gap-2.5 text-[#2C1C13] hover:text-[#7A1A1A] transition-colors"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#7A1A1A] text-[#FAF5EE] flex items-center justify-center font-bold text-xs sm:text-sm shadow-sm shrink-0">
              IF
            </div>
            <div>
              <span className="font-bold tracking-wider text-xs sm:text-base block leading-none" style={{ fontFamily: cinzel.style.fontFamily }}>
                INKFETISH
              </span>
              <span className="text-[9px] sm:text-[10px] text-[#7A1A1A] uppercase tracking-wider block font-medium">
                National Writing Contest
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 text-xs font-sans">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#7A1A1A]/10 text-[#7A1A1A] font-semibold text-[11px] sm:text-xs border border-[#7A1A1A]/20">
              <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              Verified Portal
            </span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-8 sm:pt-12 pb-6 px-3.5 sm:px-4 text-center">
        <div className="max-w-2xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#7A1A1A]/10 border border-[#8A3324]/25 text-[#7A1A1A] text-[11px] sm:text-xs font-semibold mb-3 shadow-xs"
          >
            <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Official Certificate of Participation</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-black text-[#2C1C13] tracking-tight mb-3"
            style={{ fontFamily: cinzel.style.fontFamily }}
          >
            September Writing Contest
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs sm:text-base text-[#5A3825] max-w-xl mx-auto font-sans leading-relaxed px-1"
          >
            Find, view, and securely download your official Certificate of Participation.
            Search instantly by typing your <span className="font-bold text-[#7A1A1A]">Full Name</span>.
          </motion.p>
        </div>
      </section>

      {/* Main Interactive Search Card - Full Mobile Optimization */}
      <main className="relative z-10 max-w-2xl mx-auto px-3.5 sm:px-4 pb-16 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#FAF6EE] rounded-2xl sm:rounded-3xl border border-[#D4AF37]/40 shadow-xl shadow-[#7A1A1A]/5 p-4 sm:p-7 relative"
        >
          {/* Subtle gold ribbon line */}
          <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent rounded-full" />

          {/* Search Box Container */}
          <div ref={containerRef} className="relative">
            <label
              htmlFor="cert-search-input"
              className="block text-[11px] sm:text-xs uppercase tracking-widest font-bold text-[#7A1A1A] mb-1.5 font-sans"
            >
              Search Your Name
            </label>

            <div className="relative flex items-center">
              <div className="absolute left-3.5 sm:left-4 text-[#8A3324]/70 pointer-events-none flex items-center">
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              <input
                id="cert-search-input"
                ref={inputRef}
                type="text"
                autoComplete="off"
                spellCheck="false"
                role="combobox"
                aria-expanded={showDropdown}
                aria-autocomplete="list"
                aria-controls={listId}
                placeholder="Type your full name..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIsOpen(true);
                }}
                onFocus={() => {
                  if (query.trim()) setIsOpen(true);
                }}
                onKeyDown={handleKeyDown}
                className="w-full pl-10 sm:pl-12 pr-10 py-3.5 sm:py-4 bg-white/95 text-[#2C1C13] placeholder-[#8A3324]/40 text-base rounded-xl sm:rounded-2xl border-2 border-[#8A3324]/20 focus:border-[#7A1A1A] focus:outline-none focus:ring-4 focus:ring-[#7A1A1A]/10 transition-all font-sans font-medium shadow-inner"
              />

              {query && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 p-1.5 rounded-full text-[#8A3324]/60 hover:text-[#7A1A1A] hover:bg-[#7A1A1A]/10 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Autocomplete Suggestions Dropdown - Mobile Touch Optimized */}
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  id={listId}
                  role="listbox"
                  className="absolute left-0 right-0 top-full mt-2 bg-[#FAF6EE] border-2 border-[#D4AF37]/50 rounded-xl sm:rounded-2xl shadow-2xl z-50 overflow-hidden max-h-[55vh] sm:max-h-[360px] overflow-y-auto overscroll-contain"
                >
                  {results.length > 0 ? (
                    <div className="py-1 divide-y divide-[#8A3324]/10">
                      <div className="px-3.5 py-1.5 text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-wider text-[#7A1A1A] bg-[#7A1A1A]/5 flex items-center justify-between">
                        <span>Matching Names ({results.length})</span>
                        <span className="text-[9px] sm:text-[10px] text-[#5A3825] lowercase">tap name to view</span>
                      </div>

                      {results.map((hit, idx) => {
                        const isCurrentActive = idx === activeIndex;
                        const highlighted = highlightMatch(hit.name, query);

                        return (
                          <div
                            key={hit.sno}
                            role="option"
                            aria-selected={isCurrentActive}
                            onClick={() => handleSelect(hit)}
                            onMouseEnter={() => setActiveIndex(idx)}
                            className={`px-3.5 sm:px-4 py-3 sm:py-3.5 cursor-pointer transition-colors flex items-center justify-between gap-2.5 active:bg-[#7A1A1A] active:text-white ${
                              isCurrentActive
                                ? 'bg-[#7A1A1A] text-[#FAF5EE]'
                                : 'hover:bg-[#7A1A1A]/10 text-[#2C1C13]'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                                  isCurrentActive
                                    ? 'bg-[#D4AF37] text-[#2C1C13]'
                                    : 'bg-[#7A1A1A]/10 text-[#7A1A1A]'
                                }`}
                                style={{ fontFamily: cinzel.style.fontFamily }}
                              >
                                {hit.sno}
                              </div>

                              <div className="min-w-0">
                                <div className="font-bold text-sm sm:text-base truncate leading-snug">
                                  {highlighted.map((seg, sIdx) => (
                                    <span
                                      key={sIdx}
                                      className={
                                        seg.isMatch
                                          ? isCurrentActive
                                            ? 'underline decoration-[#D4AF37] decoration-2 font-black'
                                            : 'text-[#7A1A1A] font-black underline decoration-[#D4AF37]'
                                          : ''
                                      }
                                    >
                                      {seg.text}
                                    </span>
                                  ))}
                                </div>

                                <div
                                  className={`text-[11px] sm:text-xs truncate flex items-center gap-1.5 mt-0.5 ${
                                    isCurrentActive ? 'text-[#FAF5EE]/80' : 'text-[#5A3825]'
                                  } font-sans`}
                                >
                                  {hit.writingType && (
                                    <span className="capitalize">{hit.writingType}</span>
                                  )}
                                  {hit.title && (
                                    <>
                                      <span>•</span>
                                      <span className="italic truncate max-w-[140px] sm:max-w-[200px]">
                                        &ldquo;{hit.title}&rdquo;
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="shrink-0 flex items-center gap-1">
                              <span
                                className={`text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                                  isCurrentActive
                                    ? 'bg-[#D4AF37] text-[#2C1C13]'
                                    : 'bg-[#8A3324]/10 text-[#7A1A1A]'
                                }`}
                              >
                                #{hit.sno}
                              </span>
                              <ArrowRight
                                className={`w-3.5 h-3.5 ${
                                  isCurrentActive ? 'text-[#D4AF37]' : 'text-[#8A3324]/40'
                                }`}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-5 text-center text-[#5A3825] font-sans space-y-1.5">
                      <HelpCircle className="w-7 h-7 text-[#8A3324]/40 mx-auto" />
                      <p className="font-semibold text-sm">No participant matching &ldquo;{query}&rdquo;</p>
                      <p className="text-xs text-[#5A3825]/80 max-w-sm mx-auto">
                        Please check your full name spelling. If you submitted under a pen name, try searching for that name.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Active Certificate Card Presentation - Responsive */}
          <AnimatePresence mode="wait">
            {selectedCert ? (
              <motion.div
                key={selectedCert.sno}
                initial={{ opacity: 0, scale: 0.97, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 12 }}
                transition={{ duration: 0.35 }}
                className="mt-6 pt-6 border-t border-[#D4AF37]/30"
              >
                {/* Certificate Frame Preview */}
                <div className="relative rounded-2xl p-4 sm:p-7 bg-gradient-to-br from-[#FFFDF9] via-[#FAF6EE] to-[#F5ECE0] border-2 sm:border-4 border-[#D4AF37] shadow-xl overflow-hidden">
                  {/* Decorative Corner Ornaments */}
                  <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 w-4 h-4 border-t-2 border-l-2 border-[#7A1A1A]" />
                  <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-4 h-4 border-t-2 border-r-2 border-[#7A1A1A]" />
                  <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 w-4 h-4 border-b-2 border-l-2 border-[#7A1A1A]" />
                  <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 w-4 h-4 border-b-2 border-r-2 border-[#7A1A1A]" />

                  {/* Inner Watermark / Badge */}
                  <div className="text-center space-y-2.5 sm:space-y-3">
                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#996515] text-white shadow-md mx-auto">
                      <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>

                    <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#7A1A1A]" style={{ fontFamily: cinzel.style.fontFamily }}>
                      Inkfetish Publication
                    </div>

                    <h2
                      className="text-lg sm:text-2xl font-black text-[#2C1C13] tracking-wide leading-snug"
                      style={{ fontFamily: cinzel.style.fontFamily }}
                    >
                      Certificate of Participation
                    </h2>

                    <p className="text-[11px] sm:text-xs text-[#5A3825] italic font-serif">
                      This certificate is proudly awarded to
                    </p>

                    {/* Participant Name - Responsive wrap */}
                    <div className="py-1 px-1 max-w-full">
                      <div
                        className="text-xl sm:text-3xl font-black text-[#7A1A1A] tracking-tight border-b-2 border-[#D4AF37]/60 inline-block px-2 sm:px-4 pb-1 max-w-full break-words leading-tight"
                        style={{ fontFamily: cinzel.style.fontFamily }}
                      >
                        {selectedCert.name}
                      </div>
                    </div>

                    <p className="text-[11px] sm:text-sm text-[#5A3825] max-w-lg mx-auto font-sans leading-relaxed px-1">
                      for demonstrating literary creativity in the{' '}
                      <span className="font-bold text-[#2C1C13]">September National Writing Competition 2026</span>
                      {selectedCert.writingType && (
                        <span>
                          {' '}in <span className="font-semibold text-[#7A1A1A]">{selectedCert.writingType}</span>
                        </span>
                      )}
                      {selectedCert.title && (
                        <span>
                          {' '}with the entry <span className="italic font-semibold">&ldquo;{selectedCert.title}&rdquo;</span>
                        </span>
                      )}.
                    </p>

                    {/* Details Pill Strip */}
                    <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs font-sans">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#7A1A1A]/10 text-[#7A1A1A] font-semibold text-[11px] sm:text-xs border border-[#7A1A1A]/20">
                        Serial No: #{selectedCert.sno.toString().padStart(3, '0')}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold text-[11px] sm:text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        Official Entry
                      </span>
                    </div>
                  </div>

                  {/* Actions Grid - Full Mobile Optimized Buttons */}
                  <div className="mt-6 pt-5 border-t border-[#8A3324]/15 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                    {/* Primary Button: Direct Native Download */}
                    <button
                      type="button"
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#7A1A1A] via-[#8A2424] to-[#7A1A1A] hover:from-[#661212] hover:to-[#661212] text-white font-bold text-sm sm:text-base shadow-md transition-all active:scale-[0.99] disabled:opacity-75 font-sans cursor-pointer"
                    >
                      <Download className={`w-4 h-4 sm:w-5 sm:h-5 ${isDownloading ? 'animate-bounce' : ''}`} />
                      <span>{isDownloading ? 'Downloading PDF...' : 'Download Certificate (PDF)'}</span>
                    </button>

                    {/* Secondary Button: Open in New Tab */}
                    <a
                      href={selectedCert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-[#FAF5EE] text-[#2C1C13] hover:text-[#7A1A1A] font-bold text-sm sm:text-base border-2 border-[#D4AF37] shadow-sm transition-all active:scale-[0.99] font-sans cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
                      <span>Open in New Tab</span>
                    </a>
                  </div>

                  {/* Share & Link Utilities */}
                  <div className="mt-3.5 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={handleShare}
                      className="inline-flex items-center gap-1.5 text-xs text-[#5A3825] hover:text-[#7A1A1A] font-sans font-medium px-3 py-1.5 rounded-lg hover:bg-[#7A1A1A]/5 active:bg-[#7A1A1A]/10 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">Link Copied!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Share / Copy Certificate Link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Idle Prompt Card */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 text-center py-8 px-3 rounded-2xl bg-white/40 border border-dashed border-[#8A3324]/20"
              >
                <div className="w-10 h-10 rounded-full bg-[#7A1A1A]/5 text-[#7A1A1A] flex items-center justify-center mx-auto mb-2.5">
                  <FileText className="w-5 h-5" />
                </div>
                <h3
                  className="text-sm sm:text-base font-bold text-[#2C1C13] mb-1"
                  style={{ fontFamily: cinzel.style.fontFamily }}
                >
                  Enter Your Name Above
                </h3>
                <p className="text-xs sm:text-sm text-[#5A3825] max-w-sm mx-auto font-sans leading-relaxed">
                  Start typing your full name in the search box above to immediately preview and download your official certificate.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Feature Information Cards - Mobile 2-column or stacked */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 font-sans">
          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FAF6EE]/80 border border-[#D4AF37]/30 text-center space-y-1 shadow-xs">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#7A1A1A]/10 text-[#7A1A1A] flex items-center justify-center mx-auto">
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-[#2C1C13]">All Devices Supported</h4>
            <p className="text-[11px] sm:text-xs text-[#5A3825] leading-normal">
              Seamless one-click download designed specifically for iPhone Safari, Android Chrome, and Desktop.
            </p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FAF6EE]/80 border border-[#D4AF37]/30 text-center space-y-1 shadow-xs">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#7A1A1A]/10 text-[#7A1A1A] flex items-center justify-center mx-auto">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-[#2C1C13]">National Verification</h4>
            <p className="text-[11px] sm:text-xs text-[#5A3825] leading-normal">
              Every certificate carries an official Serial Number and verification mark from Inkfetish Publication.
            </p>
          </div>
        </div>

        {/* Support Box - Big, Prominent & Mobile-Friendly */}
        <div className="mt-8 sm:mt-10 p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#FAF6EE] border-2 border-[#D4AF37]/50 shadow-md text-center font-sans space-y-2.5">
          <h3 className="text-base sm:text-lg font-bold text-[#2C1C13]">
            Need help locating your certificate?
          </h3>
          <p className="text-xs sm:text-sm text-[#5A3825]">
            Contact our editorial support team directly via email:
          </p>
          <div className="pt-0.5">
            <a
              href="mailto:help@inkfetish.in"
              className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-[#7A1A1A] hover:bg-[#601212] active:bg-[#500e0e] text-white font-bold text-sm sm:text-base shadow-sm transition-all active:scale-95"
            >
              <span>help@inkfetish.in</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
