'use client';

import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { Cinzel, Playfair_Display } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Download, CheckCircle, Award, X, FileText, ExternalLink, Share2 } from 'lucide-react';
import { searchLetters, highlight, LETTERS, type Hit } from '@/lib/letterSearch';

const cinzel = Cinzel({ subsets: ['latin'], weight: ['400', '700', '900'], display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' });
const CINZEL = { fontFamily: cinzel.style.fontFamily };

const PDF_BASE = 'https://purring-beige-qsq1caog.edgeone.dev';

interface Info {
  id: number;
  name: string;
  pdfUrl: string; // opens in a new tab
  downloadUrl: string; // direct download
}

export default function CertificatesClient() {
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [info, setInfo] = useState<Info | null>(null);
  const [copied, setCopied] = useState(false);

  // pure in-memory fuzzy search: instant on every keystroke
  const results: Hit[] = useMemo(() => searchLetters(query), [query]);
  const typed = query.trim().length > 0;

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const pick = (h: Hit) => {
    setQuery(h.name);
    setOpen(false);
    inputRef.current?.blur();
    setInfo({
      id: h.id,
      name: h.name,
      pdfUrl: `${PDF_BASE}/${h.id}.pdf`,
      downloadUrl: `/api/iwl-certificates/download?id=${h.id}`,
    });
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[active]) pick(results[active]);
    } else if (e.key === 'Escape') setOpen(false);
  };

  const clear = () => {
    setQuery('');
    setInfo(null);
    setOpen(false);
    inputRef.current?.focus();
  };

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: 'Indian Writers League — Letter of Honour', url });
      else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {}
  };

  const showList = open && typed;

  return (
    <div
      className="min-h-screen bg-[#F0EBE0] text-[#2A0A0A] selection:bg-[#420C0C] selection:text-[#FFD700]"
      style={{ fontFamily: playfair.style.fontFamily }}
    >
      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-b from-[#2A0A0A] via-[#420C0C] to-[#5a1414] text-center px-4 pt-10 sm:pt-16 pb-24 sm:pb-28">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #FFD700 0, transparent 35%), radial-gradient(circle at 80% 80%, #FFD700 0, transparent 30%)' }} />
        <div className="relative max-w-3xl mx-auto">
          <Image src="/images/iwl_new_logo.png" alt="Indian Writers League" width={112} height={112} priority sizes="112px" className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 mx-auto mb-5 rounded-full object-cover border-2 border-[#FFD700]/60 shadow-lg" />
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1 rounded-full border border-[#FFD700]/40 bg-white/5 text-[#FFD700] text-[10px] md:text-xs uppercase tracking-[0.15em] sm:tracking-[0.25em] max-w-full" style={CINZEL}>
            <Award className="w-3.5 h-3.5" /> Season 2 · Letter of Honour Retrieval
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-[#FFD700] leading-tight" style={CINZEL}>
            INDIAN WRITERS LEAGUE
          </h1>
          <h2 className="mt-2 text-base sm:text-xl md:text-2xl text-[#F0EBE0] tracking-[0.12em] sm:tracking-[0.2em] uppercase" style={CINZEL}>
            Letter of Honour · Season 2
          </h2>
          <p className="mt-4 text-[#F0EBE0]/90 text-base sm:text-lg md:text-xl italic max-w-xl mx-auto">
            Start typing your name — your Letter of Honour is one tap away.
          </p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 -mt-16 pb-20 relative">
        <div className="bg-white rounded-2xl shadow-2xl border border-[#D7CCC8] p-5 sm:p-6 md:p-10">
          <label htmlFor="q" className="block text-[#420C0C] font-bold mb-1 text-lg">
            Find your Letter of Honour
          </label>
          <p className="text-sm text-[#8D6E63] mb-4">Type your name as you registered. Spelling doesn’t have to be perfect.</p>

          <div ref={boxRef} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A1887F] pointer-events-none" />
            <input
              id="q"
              ref={inputRef}
              role="combobox"
              aria-expanded={showList}
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={showList && results[active] ? `${listId}-${results[active].id}` : undefined}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
                if (info) setInfo(null);
              }}
              onFocus={() => setOpen(true)}
              onKeyDown={onKey}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="search"
              placeholder="Start typing your name…"
              style={{ fontSize: 16 }}
              className="w-full bg-[#F8F5F0] border border-[#D7CCC8] pl-12 pr-12 py-4 rounded-xl outline-none focus:border-[#420C0C] focus:ring-2 focus:ring-[#420C0C]/20 placeholder:text-[#BCAAA4] transition"
            />
            {typed && (
              <button type="button" onClick={clear} aria-label="Clear" className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-[#8D6E63] hover:bg-[#E7DFD3]">
                <X className="w-4 h-4" />
              </button>
            )}

            {showList && (
              <ul id={listId} role="listbox" className="absolute z-20 left-0 right-0 mt-2 max-h-[min(22rem,55vh)] overflow-y-auto bg-white border border-[#D7CCC8] rounded-xl shadow-2xl overscroll-contain">
                {results.length === 0 ? (
                  <li className="px-4 py-5 text-sm text-center text-[#8D6E63]">
                    No close match. Try just your first or last name.
                  </li>
                ) : (
                  results.map((r, i) => (
                    <li
                      key={r.id}
                      id={`${listId}-${r.id}`}
                      role="option"
                      aria-selected={i === active}
                      onMouseEnter={() => setActive(i)}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => pick(r)}
                      className={`flex items-center gap-3 px-4 py-3 cursor-pointer touch-manipulation ${i === active ? 'bg-[#F5EEE3]' : ''} ${i > 0 ? 'border-t border-[#F0EBE0]' : ''}`}
                    >
                      <span className="shrink-0 w-9 h-9 rounded-full bg-[#420C0C] text-[#FFD700] flex items-center justify-center text-sm font-bold" style={CINZEL}>
                        {r.name.replace(/^(dr\.?|mr\.?|ms\.?)\s+/i, '').charAt(0).toUpperCase()}
                      </span>
                      <span className="flex-1 min-w-0 truncate">
                        {highlight(r.name, query).map((s, k) => (
                          <span key={k} className={s.h ? 'font-bold text-[#420C0C]' : 'text-[#4E342E]'}>
                            {s.t}
                          </span>
                        ))}
                      </span>
                      <span className="shrink-0 text-[11px] text-[#A1887F] tracking-wider">#{r.id}</span>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>

          <p className="mt-3 text-xs text-[#A1887F]">{LETTERS.length} writers honoured in Season 2</p>

          <AnimatePresence mode="wait">
            {info && (
              <motion.div key={info.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-8 border-t border-[#E7DFD3] pt-8">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#420C0C]" style={CINZEL}>Letter of Honour Found</h3>
                  <p className="text-[#5D4037] mt-1">Congratulations, <span className="font-bold">{info.name}</span>!</p>
                </div>

                <div className="mb-5 flex items-center gap-4 p-5 rounded-xl border border-[#D7CCC8] bg-[#F8F5F0]">
                  <span className="w-12 h-12 rounded-lg bg-[#420C0C] flex items-center justify-center shrink-0"><FileText className="w-6 h-6 text-[#FFD700]" /></span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-bold truncate">Letter of Honour · {info.name}</span>
                    <span className="block text-xs text-[#8D6E63]">PDF · Letter #{info.id}</span>
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <a href={info.downloadUrl} download className="py-4 touch-manipulation bg-[#FFD700] text-[#2A0A0A] font-bold rounded-xl hover:bg-[#FFE55C] shadow-lg flex items-center justify-center gap-2 transition active:scale-[0.98] text-base">
                    <Download className="w-5 h-5" /> Download PDF
                  </a>
                  <a href={info.pdfUrl} target="_blank" rel="noopener noreferrer" className="py-4 touch-manipulation bg-[#420C0C] text-[#FFD700] font-bold rounded-xl hover:bg-[#2A0A0A] shadow-lg flex items-center justify-center gap-2 transition active:scale-[0.98] text-base">
                    <ExternalLink className="w-5 h-5" /> Open in New Tab
                  </a>
                </div>
                <button onClick={share} className="w-full mt-3 py-3 border border-[#D7CCC8] rounded-xl text-[#420C0C] font-semibold flex items-center justify-center gap-2 hover:bg-[#F8F5F0] transition">
                  <Share2 className="w-4 h-4" /> {copied ? 'Link copied!' : 'Share this page with fellow writers'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <section className="mt-10 text-center px-2">
          <h3 className="text-xl font-bold text-[#420C0C]" style={CINZEL}>About the League</h3>
          <p className="mt-3 text-[#5D4037] leading-relaxed">
            The Indian Writers League is India's writing competition for poets, storytellers and novelists — a stage to write, be seen and be heard. Every honoured writer receives an official Letter of Honour recognising their contribution.
          </p>
        </section>
      </main>

      <footer className="bg-[#2A0A0A] text-center px-4 py-10 border-t-2 border-[#FFD700]/40">
        <p className="text-[#FFD700] text-sm sm:text-lg tracking-[0.12em] sm:tracking-[0.2em] uppercase" style={CINZEL}>
          Indian Writers League · Letter of Honour Retrieval
        </p>
        <p className="mt-2 text-[#F0EBE0]/80 text-sm">Season 2 · Issued by Inkfetish</p>
        <a href="https://instagram.com/ink.fetish" target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-[#FFD700] hover:underline text-sm">
          @ink.fetish
        </a>
        <p className="mt-5 text-[#F0EBE0]/50 text-xs">© 2026 Inkfetish. Individual rights belong to respective authors.</p>
      </footer>
    </div>
  );
}
