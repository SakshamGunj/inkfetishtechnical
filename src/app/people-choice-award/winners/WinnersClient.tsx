'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, Medal, Crown, Sparkles, Share2, Play, Pause,
  ChevronLeft, ChevronRight, Feather, BookOpen, Volume2, VolumeX, Check, Copy
} from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { OFFICIAL_WINNERS } from '@/data/peopleChoiceWinners';

// Optional Web Audio chime synthesis for cinematic reveals
function playCeremonyChime(isChampion = false) {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    const notes = isChampion ? [523.25, 659.25, 783.99, 1046.50] : [440, 554.37, 659.25];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = isChampion ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);

      gain.gain.setValueAtTime(0, now + idx * 0.12);
      gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.12 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.9);
    });
  } catch (e) {
    // Browser audio policy
  }
}

export default function WinnersClient() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [copiedBroadcast, setCopiedBroadcast] = useState<boolean>(false);

  const activeWinner = OFFICIAL_WINNERS[currentIndex];

  const triggerConfetti = (intense = false) => {
    try {
      if (intense) {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#bf953f', '#fcf6ba', '#b38728', '#ffd700', '#ffffff']
        });
      } else {
        confetti({
          particleCount: 35,
          spread: 50,
          origin: { y: 0.65 },
          colors: ['#bf953f', '#fcf6ba', '#d4af37']
        });
      }
    } catch (e) {
      // ignore
    }
  };

  const goToWinner = (idx: number, playSound = true) => {
    const clamped = Math.max(0, Math.min(OFFICIAL_WINNERS.length - 1, idx));
    setCurrentIndex(clamped);
    setProgress(0);

    const winner = OFFICIAL_WINNERS[clamped];
    const isTop3 = winner.rank <= 3;
    const isChampion = winner.rank === 1;

    if (playSound && soundEnabled) {
      playCeremonyChime(isChampion);
    }

    if (isTop3) {
      triggerConfetti(isChampion);
    }
  };

  const handleNext = () => {
    if (currentIndex < OFFICIAL_WINNERS.length - 1) {
      goToWinner(currentIndex + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      goToWinner(currentIndex - 1);
    }
  };

  // Video Autoplay Timer
  useEffect(() => {
    if (!isPlaying) {
      setProgress(0);
      return;
    }

    const DURATION_MS = 4500;
    const INTERVAL_MS = 50;
    const increment = (INTERVAL_MS / DURATION_MS) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentIndex < OFFICIAL_WINNERS.length - 1) {
            goToWinner(currentIndex + 1);
          } else {
            setIsPlaying(false);
          }
          return 0;
        }
        return prev + increment;
      });
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, [isPlaying, currentIndex, soundEnabled]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isPlaying]);

  // Initial welcome confetti on mount
  useEffect(() => {
    const t = setTimeout(() => {
      triggerConfetti(true);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  const handleCopyBroadcast = () => {
    const broadcastText = `🏆 *PEOPLE'S CHOICE AWARD 2026 — OFFICIAL RESULTS* 🏆\n` +
      `By Inkfetish Publication\n\n` +
      `"This time, the people decided. Up to 2 lakh readers had the opportunity to vote and choose India's Top 20 Writers & Poets." ❤️\n\n` +
      `🥇 Rank 1: MR.VIJAY TARACHAND CHAUDHARI(अवि) — "व्हायचंच झालं तर काय व्हावं?" (Poetry / Verse)\n` +
      `🥈 Rank 2: Saniya S — "The Ocean Within Me" (Story / Prose)\n` +
      `🥉 Rank 3: Sadiqua Jabeen — "Another Earth" (Poetry / Verse)\n\n` +
      OFFICIAL_WINNERS.slice(3).map((w) => `Rank ${w.rank}: ${w.authorName} — "${w.pieceTitle}" (${w.category})`).join('\n') +
      `\n\n✨ View official announcement: https://www.inkfetish.in/people-choice-award/winners`;

    navigator.clipboard.writeText(broadcastText).then(() => {
      setCopiedBroadcast(true);
      setTimeout(() => setCopiedBroadcast(false), 3000);
    });
  };

  return (
    <div className="min-h-screen bg-[#070605] text-[#ede8dd] font-sans selection:bg-[#d4af37] selection:text-black relative overflow-x-hidden pb-20">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_top,#8a631c_0%,transparent_70%)] opacity-25 blur-3xl" />
        <div className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle,#aa771c_0%,transparent_70%)] opacity-10 blur-3xl" />
      </div>

      {/* --- TOP NAVBAR --- */}
      <nav className="sticky top-0 z-50 bg-[#070605]/90 backdrop-blur-md border-b border-[#2a2113] py-3 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/people-choice-award" className="flex items-center gap-2.5">
            <img
              src="/images/inkfetish_logo.png"
              alt="Inkfetish Publication"
              className="w-7 h-7 rounded-full object-cover border border-[#c5a059]/40"
            />
            <div className="flex flex-col">
              <span className="font-serif text-sm font-semibold tracking-wide text-[#fbf7ee]">
                Inkfetish Publication
              </span>
              <span className="text-[10px] text-[#c5a059] tracking-wider uppercase font-medium">
                People's Choice Award 2026
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyBroadcast}
              className="bg-gradient-to-r from-[#bf953f] to-[#aa771c] text-black font-serif font-bold text-xs px-3.5 py-1.5 rounded-full hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 shadow-md"
            >
              {copiedBroadcast ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedBroadcast ? 'Copied!' : 'Share Results'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO HEADER --- */}
      <header className="relative z-10 max-w-3xl mx-auto px-4 pt-10 pb-6 text-center">
        {/* Crown Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#140e07] border border-[#d4af37]/40 text-[#fcf6ba] text-xs font-serif font-bold tracking-wider uppercase mb-4">
          <Crown className="w-3.5 h-3.5 text-amber-400" />
          <span>Official Public Verdict • Top 20 Winners</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#fbf5b7] via-[#d4af37] to-[#aa771c] mb-3">
          People’s Choice Award 2026
        </h1>
        <p className="text-sm font-serif italic text-amber-100/80 mb-6">
          Chosen by readers and public voting across India
        </p>

        {/* --- MANDATORY PHILOSOPHY / INTRO CARD --- */}
        <div className="text-left p-6 sm:p-7 rounded-2xl bg-[#110c06] border border-[#d4af37]/35 shadow-xl max-w-2xl mx-auto">
          <div className="text-lg sm:text-xl font-serif font-bold text-amber-300 mb-3">
            People’s Choice Award is ? ⬇️
          </div>
          <div className="space-y-2.5 text-amber-100/90 font-serif text-xs sm:text-sm leading-relaxed">
            <p>
              For the first time, we are introducing an award where it’s not just about submitting your writing, getting judged by a few judges, and receiving an award.
            </p>
            <p className="text-[#fcf6ba] font-semibold text-sm sm:text-base flex items-center gap-1.5">
              <span>This time, the people will decide.</span>
              <span className="text-red-500">❤️</span>
            </p>
            <p>
              Your writing will be presented to a massive audience, and up to 2 lakh people will get the opportunity to vote and choose their favourite writers.
            </p>
            <p className="pt-1 text-amber-300 font-semibold border-t border-[#d4af37]/20">
              Based on the public voting, the Top 20 Writers will be selected.
            </p>
          </div>
        </div>
      </header>

      {/* --- VIDEO ANNOUNCEMENT STAGE (CLEAN & MINIMALIST) --- */}
      <section className="relative z-10 max-w-2xl mx-auto px-4 py-6">
        <div className="rounded-3xl bg-[#0f0c07] border-2 border-[#d4af37]/45 shadow-[0_0_40px_rgba(212,175,55,0.18)] p-6 sm:p-8">
          {/* Progress bar */}
          <div className="w-full bg-[#1f160a] h-1.5 rounded-full overflow-hidden mb-5">
            <div
              className="h-full bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] transition-all duration-75"
              style={{ width: isPlaying ? `${progress}%` : `${((currentIndex + 1) / OFFICIAL_WINNERS.length) * 100}%` }}
            />
          </div>

          {/* Top Bar on Stage */}
          <div className="flex items-center justify-between text-xs font-serif text-amber-300/80 pb-3 mb-4 border-b border-[#d4af37]/15">
            <span>WINNER {currentIndex + 1} OF 20</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSoundEnabled((s) => !s)}
                className="p-1 rounded-full text-amber-400 hover:text-white"
                title={soundEnabled ? 'Mute Chime' : 'Unmute Chime'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
              </button>
              <button
                onClick={() => triggerConfetti(true)}
                className="p-1 rounded-full text-amber-400 hover:text-white"
                title="Celebrate"
              >
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Winner Stage Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeWinner.rank}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="text-center py-4"
            >
              {/* Rank Pill */}
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full font-serif text-xs font-bold uppercase tracking-wider mb-4 shadow-md bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] text-black">
                {activeWinner.rank === 1 && <Crown className="w-4 h-4 fill-black" />}
                {activeWinner.rank === 2 && <Medal className="w-4 h-4" />}
                {activeWinner.rank === 3 && <Medal className="w-4 h-4" />}
                {activeWinner.rank > 3 && <Trophy className="w-3.5 h-3.5" />}
                <span>
                  {activeWinner.rank === 1
                    ? '🥇 Rank 1 • Champion'
                    : activeWinner.rank === 2
                    ? '🥈 Rank 2 • 1st Runner Up'
                    : activeWinner.rank === 3
                    ? '🥉 Rank 3 • 2nd Runner Up'
                    : `Rank ${activeWinner.rank} • Top 20 Winner`}
                </span>
              </div>

              {/* Author Name */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-2 leading-tight">
                {activeWinner.authorName}
              </h2>

              {/* Piece Title */}
              <div className="text-lg sm:text-xl font-serif italic text-amber-300 font-medium mb-3">
                “{activeWinner.pieceTitle}”
              </div>

              {/* Category */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#161007] border border-[#d4af37]/25 text-amber-200 text-xs font-serif">
                {activeWinner.category === 'Poetry / Verse' ? (
                  <Feather className="w-3 h-3 text-amber-400" />
                ) : (
                  <BookOpen className="w-3 h-3 text-amber-400" />
                )}
                <span>{activeWinner.category}</span>
                <span className="text-amber-500/40">•</span>
                <span className="text-amber-300/80">Audience Choice</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Stage Controls */}
          <div className="mt-6 pt-4 border-t border-[#d4af37]/20 flex items-center justify-between gap-3">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-full bg-[#181208] border border-[#d4af37]/30 text-amber-200 text-xs font-serif font-semibold hover:bg-[#251b0d] disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] text-black font-serif font-bold text-xs hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 shadow-md"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black" />}
              <span>{isPlaying ? 'Pause' : 'Auto Play Video'}</span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === OFFICIAL_WINNERS.length - 1}
              className="px-4 py-2 rounded-full bg-[#181208] border border-[#d4af37]/30 text-amber-200 text-xs font-serif font-semibold hover:bg-[#251b0d] disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick jump scrubber */}
          <div className="mt-4 pt-3 flex flex-wrap items-center justify-center gap-1.5">
            {OFFICIAL_WINNERS.map((w, idx) => (
              <button
                key={w.rank}
                onClick={() => goToWinner(idx)}
                className={`w-6 h-6 rounded-full text-xs font-serif font-bold transition-all ${
                  idx === currentIndex
                    ? 'bg-amber-300 text-black scale-110 shadow-sm'
                    : 'bg-[#150f07] text-amber-200/60 border border-[#d4af37]/20 hover:text-white'
                }`}
              >
                {w.rank}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- TOP 20 CLEAN LIST (NO ENTRY TEXT, NO VOTES, SIMPLE & ELEGANT) --- */}
      <section className="relative z-10 max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#fcf6ba]">
            The Top 20 Winners
          </h3>
          <p className="text-xs font-serif text-amber-200/70 mt-1">
            Official ranking decided by reader audience
          </p>
        </div>

        <div className="space-y-2.5">
          {OFFICIAL_WINNERS.map((winner, idx) => (
            <div
              key={winner.rank}
              onClick={() => goToWinner(idx)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                idx === currentIndex
                  ? 'bg-[#1c1409] border-amber-400 shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                  : winner.rank === 1
                  ? 'bg-[#160f06] border-amber-500/60 hover:bg-[#1a1208]'
                  : winner.rank === 2 || winner.rank === 3
                  ? 'bg-[#120e07] border-amber-500/35 hover:bg-[#181208]'
                  : 'bg-[#0d0a06] border-[#291f11] hover:bg-[#140e08]'
              }`}
            >
              {/* Left: Rank & Author & Title */}
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div
                  className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center font-serif text-xs font-bold ${
                    winner.rank === 1
                      ? 'bg-gradient-to-r from-[#bf953f] to-[#aa771c] text-black shadow-md'
                      : winner.rank === 2
                      ? 'bg-zinc-200 text-black'
                      : winner.rank === 3
                      ? 'bg-[#cd7f32] text-black'
                      : 'bg-[#1c150c] text-amber-300 border border-[#d4af37]/30'
                  }`}
                >
                  {winner.rank === 1 ? '🥇' : winner.rank === 2 ? '🥈' : winner.rank === 3 ? '🥉' : winner.rank}
                </div>

                <div className="min-w-0">
                  <div className="font-serif font-bold text-sm sm:text-base text-white truncate">
                    {winner.authorName}
                  </div>
                  <div className="font-serif text-xs text-amber-300/90 truncate italic">
                    “{winner.pieceTitle}”
                  </div>
                </div>
              </div>

              {/* Right: Category badge */}
              <div className="shrink-0 text-right">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#181208] border border-[#d4af37]/20 text-[11px] font-serif text-amber-200/80">
                  {winner.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative z-10 max-w-3xl mx-auto px-4 pt-8 text-center border-t border-[#2a2113]">
        <div className="flex items-center justify-center gap-2 mb-2">
          <img
            src="/images/inkfetish_logo.png"
            alt="Inkfetish"
            className="w-5 h-5 rounded-full"
          />
          <span className="font-serif text-xs font-semibold text-amber-200">
            Inkfetish Publication
          </span>
        </div>
        <p className="text-[11px] font-serif text-amber-400/50">
          © 2026 Inkfetish Publication. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
