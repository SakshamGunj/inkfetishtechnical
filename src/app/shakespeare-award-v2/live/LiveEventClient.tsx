'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Star, Clock, 
  Video, Users, MapPin, 
  Calendar, Gift, ChevronRight, ChevronLeft,
  PlayCircle, Award, BookOpen, Gamepad2, BrainCircuit, Puzzle, Rocket, X, CheckCircle
} from 'lucide-react';
import Link from 'next/link';

const quizQuestions = [
  { q: "Which famous Shakespeare sonnet begins with the line:\n\"Shall I compare thee to a summer's day?\"", options: ["A. Sonnet 1", "B. Sonnet 18", "C. Sonnet 130", "D. Sonnet 116"], a: "B. Sonnet 18" },
  { q: "Which literary device gives human qualities to non-human objects?", options: ["A. Simile", "B. Metaphor", "C. Personification", "D. Hyperbole"], a: "C. Personification" },
  { q: "A poem with 14 lines is traditionally known as a:", options: ["A. Haiku", "B. Sonnet", "C. Limerick", "D. Ode"], a: "B. Sonnet" },
  { q: "Which famous poet wrote The Road Not Taken?", options: ["A. Robert Frost", "B. Walt Whitman", "C. Emily Dickinson", "D. Sylvia Plath"], a: "A. Robert Frost" },
  { q: "What does the abbreviation ISBN stand for?", options: ["A. International Standard Book Number", "B. Indian Standard Book Name", "C. International Serial Book Name", "D. Independent Standard Book Number"], a: "A. International Standard Book Number" },
  { q: "Which famous Indian poet won the Nobel Prize in Literature in 1913?", options: ["A. Sarojini Naidu", "B. Munshi Premchand", "C. Rabindranath Tagore", "D. Kamala Das"], a: "C. Rabindranath Tagore" },
  { q: "In poetry, what is the term for the central message or underlying idea of a poem?", options: ["A. Stanza", "B. Meter", "C. Theme", "D. Rhyme Scheme"], a: "C. Theme" },
  { q: "Which punctuation mark is most commonly used to indicate a pause in the middle of a poetic line?", options: ["A. Comma (,)", "B. Period (.)", "C. Dash (-)", "D. Semicolon (;)"], a: "A. Comma (,)" },
  { q: "What is the name of a poetry collection featuring works by multiple authors?", options: ["A. Anthology", "B. Biography", "C. Encyclopedia", "D. Memoir"], a: "A. Anthology" },
  { q: "What is the literary device called when two unlike things are compared without using \"like\" or \"as\"?", options: ["A. Simile", "B. Metaphor", "C. Alliteration", "D. Personification"], a: "B. Metaphor" },
  { q: "Which famous poet wrote the epic poem Paradise Lost?", options: ["A. William Blake", "B. John Milton", "C. John Keats", "D. Lord Byron"], a: "B. John Milton" },
  { q: "What is the process of preparing a manuscript by correcting grammar, improving clarity, and refining language before publication called?", options: ["A. Drafting", "B. Publishing", "C. Editing", "D. Formatting"], a: "C. Editing" },
  { q: "Which poetic form originated in Japan and traditionally follows a 5–7–5 syllable pattern?", options: ["A. Sonnet", "B. Limerick", "C. Ode", "D. Haiku"], a: "D. Haiku" },
  { q: "In publishing, what legal protection automatically belongs to the creator of an original poem?", options: ["A. Patent", "B. Trademark", "C. Copyright", "D. Licensing"], a: "C. Copyright" },
  { q: "Which famous playwright is often referred to as \"The Bard of Avon\"?", options: ["A. Christopher Marlowe", "B. William Shakespeare", "C. Oscar Wilde", "D. George Bernard Shaw"], a: "B. William Shakespeare" },
  { q: "Which of these books is NOT written by William Shakespeare?", options: ["A. Hamlet", "B. Macbeth", "C. Pride and Prejudice", "D. Othello"], a: "C. Pride and Prejudice" },
  { q: "What is the name of the repeated consonant sound at the beginning of nearby words, as in \"Wild winds whisper\"?", options: ["A. Alliteration", "B. Assonance", "C. Onomatopoeia", "D. Hyperbole"], a: "A. Alliteration" },
  { q: "Which famous quote is from Shakespeare's Hamlet?", options: ["A. \"To be, or not to be.\"", "B. \"Miles to go before I sleep.\"", "C. \"Hope is the thing with feathers.\"", "D. \"Where the mind is without fear.\""], a: "A. \"To be, or not to be.\"" }
];

export default function LiveEventClient() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const totalSlides = 62; // 0-14 (content), 15-25 (pitch), 26 (games intro), 27 (quiz intro), 28-63 (quiz Q&A), 64 (final)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Countdown timer
  useEffect(() => {
    const targetDate = new Date('2026-08-01T20:00:00+05:30').getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    })
  };

  // Render Slides
  const renderSlide = () => {
    switch (currentSlide) {
      case 0:
        return (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-5xl mx-auto px-4 text-center relative">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-4">
              <Image src="/inkfetish_logo.png" alt="Inkfetish Logo" width={80} height={80} className="w-12 sm:w-16 h-auto mx-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6 flex items-center gap-3">
              <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-gold/60"></div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] font-bold text-gold/70">
                Inkfetish Publications Presents
              </span>
              <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-gold/60"></div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }} className="mb-4 relative z-10">
              <div className="relative inline-block rounded-sm overflow-hidden border border-gold/40 shadow-[0_15px_40px_rgba(197,160,89,0.2)] bg-[#1A1613]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#14100C]/80 via-transparent to-transparent pointer-events-none z-10"></div>
                <Image src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1782388720/Shakespeare_Poetry_Award_Content_2_1080_x_1080_px_2_bko409.png" alt="Shakespeare Poetry Award Logo" width={400} height={400} className="w-32 sm:w-48 lg:w-56 h-auto object-cover relative z-0" />
              </div>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-serif font-black leading-[1.05] tracking-tight mb-6 w-full">
              <span className="block text-[2.5rem] sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] via-[#ebd298] to-[#b8922a] pb-2 drop-shadow-[0_0_25px_rgba(197,160,89,0.2)]">
                The Live Results
              </span>
              <span className="block text-lg sm:text-xl md:text-2xl font-light italic text-white/70 mt-2 tracking-wide">
                Shakespeare Poetry Award • Season 2
              </span>
            </motion.h1>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-6 w-full max-w-2xl border border-gold/20 bg-[#1A1613]/80 p-4 sm:p-5 backdrop-blur-md rounded-sm shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
              <div className="text-gold font-bold uppercase tracking-[0.3em] text-[10px] sm:text-xs mb-2 drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]">
                Today • 2nd August, Sunday
              </div>
              <div className="text-lg sm:text-2xl font-serif font-black text-white leading-snug">
                Welcome to all the immensely talented writers tonight.
              </div>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-ink-400 text-[10px] sm:text-xs uppercase tracking-widest font-bold mt-2 animate-pulse">
              Press <kbd className="border border-ink-600 rounded px-2 mx-1">Right Arrow</kbd> to begin
            </motion.p>
          </div>
        );

      case 1:
        return (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-5xl mx-auto px-4 text-center relative">
            <h2 className="text-[10px] md:text-xs uppercase font-bold tracking-[0.4em] text-gold mb-6 inline-flex items-center gap-2 border-b border-gold/20 pb-2">
              <Award className="w-4 h-4" /> The Highest Literary Honor
            </h2>
            
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black text-white mb-8 leading-tight">
              The <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] to-[#c5a059] italic drop-shadow-[0_0_20px_rgba(197,160,89,0.4)]">Shakespeare</span> Poetry Award
            </h3>
            
            <p className="text-sm md:text-lg text-ink-300 max-w-4xl mx-auto font-light leading-relaxed mb-8">
              The Shakespeare Poetry Award was created to continue the legacy of William Shakespeare by recognising the next generation of poets. Every participant will receive an official Certificate of Recognition and have their poem published in the official anthology. The Top 10 poets will also receive the prestigious NEXT Shakespeare Trophy and Premium Medal, celebrating their outstanding talent.
            </p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 max-w-3xl mx-auto">
              <span className="px-4 py-2 border border-gold/20 bg-gradient-to-br from-[#1A1613] to-[#14100C] rounded text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gold drop-shadow-[0_0_10px_rgba(197,160,89,0.1)] flex items-center gap-2">
                <Star className="w-3 h-3" /> Official Anthology
              </span>
              <span className="px-4 py-2 border border-gold/20 bg-gradient-to-br from-[#1A1613] to-[#14100C] rounded text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gold drop-shadow-[0_0_10px_rgba(197,160,89,0.1)] flex items-center gap-2">
                <Award className="w-3 h-3" /> Certificate of Recognition
              </span>
              <span className="px-4 py-2 border border-gold/20 bg-gradient-to-br from-[#1A1613] to-[#14100C] rounded text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gold drop-shadow-[0_0_10px_rgba(197,160,89,0.1)] flex items-center gap-2">
                <Trophy className="w-3 h-3" /> NEXT Master Trophy
              </span>
              <span className="px-4 py-2 border border-gold/20 bg-gradient-to-br from-[#1A1613] to-[#14100C] rounded text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gold drop-shadow-[0_0_10px_rgba(197,160,89,0.1)] flex items-center gap-2">
                <Award className="w-3 h-3" /> Premium Medal
              </span>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="flex items-center justify-center">
              <div className="inline-flex items-center gap-4 bg-[#1A1613]/95 backdrop-blur-md border border-gold/30 px-8 py-5 rounded-sm shadow-[0_20px_50px_rgba(197,160,89,0.15)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-[40px] pointer-events-none group-hover:bg-gold/20 transition-all duration-700"></div>
                <Trophy className="w-10 h-10 text-gold drop-shadow-[0_0_20px_rgba(197,160,89,0.8)] relative z-10" />
                <div className="text-left ml-2 border-l border-gold/20 pl-5 relative z-10">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-ink-300 font-bold mb-1">Volume 2</div>
                  <div className="text-white text-sm font-black uppercase tracking-widest drop-shadow-md">A physical testament to mastery</div>
                </div>
              </div>
            </motion.div>
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-[10px] md:text-xs uppercase font-bold tracking-[0.4em] text-gold mb-8 inline-flex items-center gap-2 border-b border-gold/20 pb-2">
              <Star className="w-4 h-4" /> Season 2 Highlights
            </h2>
            
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-white mb-12 leading-tight">
              By The <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] to-[#c5a059] italic drop-shadow-[0_0_20px_rgba(197,160,89,0.4)]">Numbers</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-6 w-full">
              <div className="bg-[#1A1613]/90 border border-gold/20 p-6 rounded-sm shadow-xl hover:-translate-y-2 transition-transform duration-500">
                <div className="text-3xl font-black text-white mb-2">565 <span className="text-gold text-lg">Submissions</span></div>
                <div className="text-ink-300 text-sm font-light">But exactly <strong className="text-white">200 poets</strong> officially joined us. Every participant receives a certificate.</div>
              </div>

              <div className="bg-[#1A1613]/90 border border-gold/20 p-6 rounded-sm shadow-xl hover:-translate-y-2 transition-transform duration-500">
                <div className="text-3xl font-black text-white mb-2">9 to 76 <span className="text-gold text-lg">Years</span></div>
                <div className="text-ink-300 text-sm font-light">From kids to the elderly, generations united for poetry. A truly diverse range of minds.</div>
              </div>

              <div className="bg-[#1A1613]/90 border border-gold/20 p-6 rounded-sm shadow-xl hover:-translate-y-2 transition-transform duration-500">
                <div className="text-3xl font-black text-white mb-2">16 <span className="text-gold text-lg">Global</span></div>
                <div className="text-ink-300 text-sm font-light">Participants joined us from outside India, bringing a truly international flavor to Season 2.</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
              <div className="bg-gradient-to-r from-[#1A1613] to-[#14100C] border border-gold/30 p-5 rounded-sm shadow-xl flex items-center gap-4 text-left hover:scale-[1.02] transition-transform">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <Star className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest font-bold text-gold mb-1">Major Themes</div>
                  <div className="text-white text-sm font-light">All types of poems—primarily <strong className="font-bold">Love, Heartbreak, and Animal Love</strong>.</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#1A1613] to-[#14100C] border border-gold/30 p-5 rounded-sm shadow-xl flex items-center gap-4 text-left hover:scale-[1.02] transition-transform">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest font-bold text-gold mb-1">Major Languages</div>
                  <div className="text-white text-sm font-light"><strong className="font-bold">English & Hindi</strong>, followed by Tamil, Bengali, Marathi, Punjabi & more.</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-[10px] md:text-xs uppercase font-bold tracking-[0.4em] text-gold mb-8 inline-flex items-center gap-2 border-b border-gold/20 pb-2">
              <Star className="w-4 h-4" /> About Inkfetish Publications
            </h2>
            
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black text-white mb-6 leading-tight">
              More Than a <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] to-[#c5a059] italic drop-shadow-[0_0_20px_rgba(197,160,89,0.4)]">Publisher.</span><br/>
              A Home for <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] to-[#c5a059] italic drop-shadow-[0_0_20px_rgba(197,160,89,0.4)]">Every Writer.</span>
            </h3>

            <div className="bg-gradient-to-b from-[#1A1613]/80 to-[#14100C]/80 border border-gold/20 p-8 md:p-12 rounded-sm shadow-[0_20px_50px_rgba(197,160,89,0.1)] relative overflow-hidden mt-6 text-left max-w-4xl mx-auto hover:-translate-y-1 transition-transform duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[80px] pointer-events-none"></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>
              
              <div className="relative z-10 space-y-6 text-sm md:text-lg text-ink-300 font-light leading-relaxed">
                <p>
                  <strong className="text-white font-serif">At Inkfetish Publications</strong>, we believe every writer deserves a chance to be seen, recognised, and remembered.
                </p>
                <p>
                  We don't just publish books. We create opportunities for writers to become published authors, take part in national literary awards, and share their words with readers across the country.
                </p>
                <p>
                  Every anthology, every award, and every project we build is made with one purpose—to celebrate talent and give writers something they can be proud of for years to come.
                </p>
                <p className="border-l-2 border-gold/50 pl-6 text-white italic font-serif text-lg md:text-xl drop-shadow-md">
                  Because great writing deserves more than just likes on social media. It deserves a real book, real recognition, and a place in literary history.
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-[10px] md:text-xs uppercase font-bold tracking-[0.4em] text-gold mb-6 inline-flex items-center gap-2 border-b border-gold/20 pb-2">
              <Award className="w-4 h-4" /> The Inkfetish Legacy
            </h2>
            
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-white mb-4 leading-tight drop-shadow-[0_0_20px_rgba(197,160,89,0.3)]">
              "The Numbers Don't Lie."
            </h3>
            <p className="text-[10px] md:text-xs text-ink-300 font-bold tracking-[0.3em] uppercase mb-12 border border-gold/10 inline-block px-4 py-2 bg-[#1A1613]/50">
              Built slowly. Delivered consistently. Trusted completely.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-5xl mx-auto mb-10">
              <div className="bg-[#1A1613]/90 border border-gold/20 p-6 rounded-sm shadow-[0_10px_30px_rgba(197,160,89,0.1)] hover:-translate-y-2 transition-transform duration-500">
                <div className="text-2xl md:text-4xl font-black text-white mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-gold">₹5,75,000+</div>
                <div className="text-gold text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2">Total Prize Money</div>
                <div className="text-ink-400 text-[9px] sm:text-[10px] uppercase tracking-widest">Given Away To Indian Writers</div>
              </div>
              <div className="bg-[#1A1613]/90 border border-gold/20 p-6 rounded-sm shadow-[0_10px_30px_rgba(197,160,89,0.1)] hover:-translate-y-2 transition-transform duration-500">
                <div className="text-2xl md:text-4xl font-black text-white mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-gold">1,155+</div>
                <div className="text-gold text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2">Writers Competed</div>
                <div className="text-ink-400 text-[9px] sm:text-[10px] uppercase tracking-widest">Across All Our Contests</div>
              </div>
              <div className="bg-[#1A1613]/90 border border-gold/20 p-6 rounded-sm shadow-[0_10px_30px_rgba(197,160,89,0.1)] hover:-translate-y-2 transition-transform duration-500">
                <div className="text-2xl md:text-4xl font-black text-white mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-gold">165+</div>
                <div className="text-gold text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2">Anthology Writers</div>
                <div className="text-ink-400 text-[9px] sm:text-[10px] uppercase tracking-widest">Published in Our Anthologies</div>
              </div>
              <div className="bg-[#1A1613]/90 border border-gold/20 p-6 rounded-sm shadow-[0_10px_30px_rgba(197,160,89,0.1)] hover:-translate-y-2 transition-transform duration-500">
                <div className="text-2xl md:text-4xl font-black text-white mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-gold">182</div>
                <div className="text-gold text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2">Books Sold</div>
                <div className="text-ink-400 text-[9px] sm:text-[10px] uppercase tracking-widest">In Just 24 Hours</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-3xl mx-auto">
              <div className="flex items-center gap-3 bg-gradient-to-r from-[#1A1613] to-[#14100C] border border-gold/30 px-6 py-4 rounded-sm shadow-xl w-full sm:w-auto">
                <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                  <Star className="w-3 h-3 text-gold" />
                </div>
                <span className="text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest">Launched 5+ Anthologies</span>
              </div>
              <div className="flex items-center gap-3 bg-gradient-to-r from-[#14100C] to-[#1A1613] border border-gold/30 px-6 py-4 rounded-sm shadow-xl w-full sm:w-auto">
                <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                  <Trophy className="w-3 h-3 text-gold" />
                </div>
                <span className="text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest">8 Successful Competitions Hosted</span>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-6xl mx-auto px-4 text-center relative">
            <h2 className="text-[10px] md:text-xs uppercase font-bold tracking-[0.4em] text-gold mb-6 inline-flex items-center gap-2 border-b border-gold/20 pb-2">
              <Star className="w-4 h-4" /> A History of Excellence
            </h2>
            
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black text-white mb-6 leading-tight">
              A Legacy You Can <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] to-[#c5a059] italic drop-shadow-[0_0_20px_rgba(197,160,89,0.4)]">Trust.</span>
            </h3>
            <p className="text-sm md:text-lg text-ink-300 font-light max-w-3xl mx-auto mb-10">
              We have successfully organised some of the most prestigious literary events in the country. When you participate with us, you are joining a proven legacy of excellence.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full max-w-4xl mx-auto mb-10">
              {[
                "Poetry Contest",
                "Poetry Festival Season 1",
                "Author Verse Summit",
                "September Writing Competition",
                "Poetry Festival Season 2",
                "Indian Writers League Volume 1",
                "Writers Mania",
                "Shakespeare Poetry Award Season 1",
              ].map((event, idx) => (
                <div key={idx} className="bg-gradient-to-r from-[#1A1613] to-[#14100C] border border-gold/20 px-4 py-3 rounded-sm text-ink-300 text-[10px] sm:text-xs uppercase tracking-widest font-bold shadow-lg hover:border-gold/50 transition-colors">
                  {event}
                </div>
              ))}
              <div className="bg-gradient-to-r from-[#b8922a] to-[#ebd298] border border-gold px-5 py-3 rounded-sm text-[#14100C] text-[10px] sm:text-xs uppercase tracking-widest font-black shadow-[0_0_20px_rgba(197,160,89,0.4)] scale-105">
                Shakespeare Poetry Award Season 2 (Current)
              </div>
            </div>
            
            <div className="inline-flex items-center gap-3 border-t border-gold/20 pt-6">
              <Award className="w-5 h-5 text-gold" />
              <span className="text-white text-xs sm:text-sm font-serif italic tracking-wide">Committed to discovering the best writers.</span>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-[10px] md:text-xs uppercase font-bold tracking-[0.4em] text-gold mb-4 inline-flex items-center gap-2 border-b border-gold/20 pb-2">
              <Star className="w-4 h-4" /> Bestselling Publications
            </h2>
            
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-white mb-8 leading-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] to-[#c5a059] italic drop-shadow-[0_0_20px_rgba(197,160,89,0.4)]">Masterpieces.</span>
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 w-full max-w-7xl mx-auto mb-10">
              {/* Syaahi */}
              <div className="bg-gradient-to-br from-[#1A1613] to-[#14100C] border border-gold/20 p-4 md:p-5 rounded-sm text-left hover:-translate-y-2 transition-transform duration-500 shadow-xl flex flex-col group">
                <div className="w-full aspect-[3/4] mb-4 overflow-hidden rounded border border-white/5 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                  <img src="https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1778137587/pezfosvx2fszfwxaffhs_mtcvbi.webp" alt="Syaahi" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="text-gold text-[9px] md:text-[10px] uppercase font-bold tracking-widest mb-1 mt-auto">Collection of top 200 writers</div>
                <h4 className="text-lg md:text-xl font-serif font-black text-white mb-2 drop-shadow-md">Syaahi</h4>
                <div className="bg-gold/10 border border-gold/20 text-gold text-[9px] md:text-[10px] font-bold px-2 py-1 rounded inline-block mb-2 w-fit">185 Sales in 24 Hours</div>
                <p className="text-ink-400 text-[10px] md:text-xs font-light leading-relaxed">Our all-time best-selling book. Compiles masterpiece works of the top 200 elite writers from the prestigious Indian Writers League (IWL).</p>
              </div>

              {/* Shakespeare & What Remained */}
              <div className="bg-gradient-to-br from-[#1A1613] to-[#14100C] border border-gold/20 p-4 md:p-5 rounded-sm text-left hover:-translate-y-2 transition-transform duration-500 shadow-xl flex flex-col group">
                <div className="w-full aspect-[3/4] mb-4 overflow-hidden rounded border border-white/5 shadow-[0_0_15px_rgba(0,0,0,0.5)] bg-white/5">
                  <img src="https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1779673450/ChatGPT_Image_May_25_2026_07_12_11_AM_yaaaie.webp" alt="Shakespeare & What Remained" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="text-gold text-[9px] md:text-[10px] uppercase font-bold tracking-widest mb-1 mt-auto">Poetry Anthology</div>
                <h4 className="text-lg md:text-xl font-serif font-black text-white mb-2 leading-tight drop-shadow-md">Shakespeare &<br/>What Remained</h4>
                <div className="bg-gold/10 border border-gold/20 text-gold text-[9px] md:text-[10px] font-bold px-2 py-1 rounded inline-block mb-2 w-fit">65 Sales in 48 Hours</div>
                <p className="text-ink-400 text-[10px] md:text-xs font-light leading-relaxed">A compilation celebrating classic verses, featuring all fine poetries from the Shakespeare Poetry Award hosted in 2025.</p>
              </div>

              {/* Love at Minus One */}
              <div className="bg-gradient-to-br from-[#1A1613] to-[#14100C] border border-gold/20 p-4 md:p-5 rounded-sm text-left hover:-translate-y-2 transition-transform duration-500 shadow-xl flex flex-col group">
                <div className="w-full aspect-[3/4] mb-4 overflow-hidden rounded border border-white/5 shadow-[0_0_15px_rgba(0,0,0,0.5)] bg-white/5">
                  <img src="https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1779674268/ChatGPTImageMay25202607_27_27A_h2iwrz.jpg" alt="Love at Minus One" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="text-gold text-[9px] md:text-[10px] uppercase font-bold tracking-widest mb-1 mt-auto">Romance Anthology</div>
                <h4 className="text-lg md:text-xl font-serif font-black text-white mb-2 leading-tight drop-shadow-md">Love at<br/>Minus One</h4>
                <div className="bg-gold/10 border border-gold/20 text-gold text-[9px] md:text-[10px] font-bold px-2 py-1 rounded inline-block mb-2 w-fit">155 Sales in 2 Days</div>
                <p className="text-ink-400 text-[10px] md:text-xs font-light leading-relaxed">Launched in the chilling winter of December 2025. A poetry anthology exploring romance and heartbreak where the heart freezes.</p>
              </div>

              {/* Petals and Scars */}
              <div className="bg-gradient-to-br from-[#1A1613] to-[#14100C] border border-gold/20 p-4 md:p-5 rounded-sm text-left hover:-translate-y-2 transition-transform duration-500 shadow-xl flex flex-col group">
                <div className="w-full aspect-[3/4] mb-4 overflow-hidden rounded border border-white/5 shadow-[0_0_15px_rgba(0,0,0,0.5)] bg-white/5">
                  <img src="https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1779673963/ChatGPTImageMay25202607_20_11A_vcxbxc.jpg" alt="Petals and Scars" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="text-gold text-[9px] md:text-[10px] uppercase font-bold tracking-widest mb-1 mt-auto">Poetry Collection</div>
                <h4 className="text-lg md:text-xl font-serif font-black text-white mb-2 leading-tight drop-shadow-md">Petals and<br/>Scars</h4>
                <div className="bg-gold/10 border border-gold/20 text-gold text-[9px] md:text-[10px] font-bold px-2 py-1 rounded inline-block mb-2 w-fit">182 Sales in 24 Hours</div>
                <p className="text-ink-400 text-[10px] md:text-xs font-light leading-relaxed">A masterpiece collection featuring all top writings from our Authorverse Summit and the September Writing Competition.</p>
              </div>

              {/* The Margins */}
              <div className="bg-gradient-to-br from-[#1A1613] to-[#14100C] border border-gold/20 p-4 md:p-5 rounded-sm text-left hover:-translate-y-2 transition-transform duration-500 shadow-xl flex flex-col group lg:col-span-1">
                <div className="w-full aspect-[3/4] mb-4 overflow-hidden rounded border border-white/5 shadow-[0_0_15px_rgba(0,0,0,0.5)] bg-[#111] flex items-center justify-center p-2">
                  <img src="/margins-mockup.png" alt="The Margins" className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700 drop-shadow-2xl" />
                </div>
                <div className="text-gold text-[9px] md:text-[10px] uppercase font-bold tracking-widest mb-1 mt-auto">Poetry Anthology</div>
                <h4 className="text-lg md:text-xl font-serif font-black text-white mb-2 drop-shadow-md">The Margins</h4>
                <div className="bg-gold/10 border border-gold/20 text-gold text-[9px] md:text-[10px] font-bold px-2 py-1 rounded inline-block mb-2 w-fit">102 Sales in 36 Hours</div>
                <p className="text-ink-400 text-[10px] md:text-xs font-light leading-relaxed">An anthology collection of the top 200 poets from Poetry Festival Season 2.</p>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-7xl mx-auto px-4 text-center overflow-hidden">
            <h2 className="text-[10px] md:text-xs uppercase font-bold tracking-[0.4em] text-gold mb-6 inline-flex items-center gap-2 border-b border-gold/20 pb-2">
              <Users className="w-4 h-4" /> TESTIMONIALS FROM WRITERS
            </h2>
            
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black text-white mb-8 leading-tight">
              Words from <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] to-[#c5a059] italic drop-shadow-[0_0_20px_rgba(197,160,89,0.4)]">Our Writers.</span>
            </h3>

            {/* Fast scrollable gallery container */}
            <div className="w-full relative h-[45vh] max-h-[500px]">
              {/* Fade masks for smooth scroll effect */}
              <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-[#0a0806] to-transparent z-10 pointer-events-none"></div>
              <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-[#0a0806] to-transparent z-10 pointer-events-none"></div>

              <div className="flex gap-4 overflow-x-auto pb-6 pt-2 h-full snap-x snap-mandatory hide-scrollbar items-center scroll-smooth">
                {[
                  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897715/WhatsApp_Image_2026-04-01_at_1.54.07_PM_3_-compressed_moo9ra.webp",
                  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897714/WhatsApp_Image_2026-04-01_at_1.54.07_PM_2_-compressed_j6w9sn.webp",
                  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897713/WhatsApp_Image_2026-04-01_at_1.54.07_PM_1_-compressed_slt2mj.webp",
                  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897712/WhatsApp_Image_2026-04-01_at_1.54.06_PM_3_-compressed_czwtzu.webp",
                  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897712/WhatsApp_Image_2026-04-01_at_1.54.06_PM_2_-compressed_l5bsna.webp",
                  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897711/WhatsApp_Image_2026-04-01_at_1.54.05_PM_1_-compressed_eoiarj.webp",
                  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897716/WhatsApp_Image_2026-04-07_at_12.09.27_AM-compressed_bzgl8t.webp",
                  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897715/WhatsApp_Image_2026-04-07_at_12.09.27_AM_1_-compressed_ugjy5e.webp",
                ].map((src, i) => (
                  <div key={i} className="relative h-full aspect-[4/5] sm:aspect-auto sm:w-[320px] shrink-0 snap-center border border-gold/20 rounded-sm overflow-hidden bg-[#1A1613] shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-gold/60 transition-colors duration-300">
                    <Image 
                      src={src} 
                      alt={`Writer Testimonial ${i+1}`} 
                      fill 
                      className="object-cover sm:object-contain hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <style jsx>{`
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
              .hide-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
          </div>
        );

      case 8:
        return (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-[10px] md:text-xs uppercase font-bold tracking-[0.4em] text-gold mb-6 inline-flex items-center gap-2 border-b border-gold/20 pb-2">
              <Gift className="w-4 h-4" /> Rewards & Recognition
            </h2>
            
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-white mb-2 leading-tight">
              The Benefits You've <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] to-[#c5a059] italic drop-shadow-[0_0_20px_rgba(197,160,89,0.4)]">Unlocked.</span>
            </h3>
            <p className="text-ink-400 text-sm md:text-base font-light mb-10 max-w-2xl mx-auto">
              By Joining the Shakespeare Poetry Award – Season 2
            </p>

            <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto text-left">
              {/* Base Registration Box */}
              <div className="bg-gradient-to-br from-[#1A1613] to-[#14100C] border border-gold/30 p-8 rounded-sm shadow-xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
                <div className="absolute top-0 right-0 bg-gold text-[#14100C] font-black px-4 py-1 text-sm rounded-bl-sm z-10 shadow-md">₹699</div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                
                <h4 className="text-2xl font-serif font-black text-white mb-2 relative z-10">Official Registration</h4>
                <p className="text-gold text-xs font-bold uppercase tracking-widest mb-8 relative z-10">Your confirmed registration includes:</p>
                
                <ul className="space-y-6 relative z-10">
                  <li className="flex gap-4 items-start">
                    <div className="bg-gold/10 p-2 rounded-full shrink-0"><Star className="w-4 h-4 text-gold" /></div>
                    <div>
                      <div className="text-white font-bold text-sm mb-1">Publication in the Official Anthology</div>
                      <div className="text-ink-400 text-xs font-light leading-relaxed">Your poem will be published as part of the official Shakespeare Poetry Award anthology.</div>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="bg-gold/10 p-2 rounded-full shrink-0"><Award className="w-4 h-4 text-gold" /></div>
                    <div>
                      <div className="text-white font-bold text-sm mb-1">Official Certificate of Recognition</div>
                      <div className="text-ink-400 text-xs font-light leading-relaxed">A professionally printed certificate delivered directly to your home.</div>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="bg-gold/10 p-2 rounded-full shrink-0"><Users className="w-4 h-4 text-gold" /></div>
                    <div>
                      <div className="text-white font-bold text-sm mb-1">Official Appreciation Letter</div>
                      <div className="text-ink-400 text-xs font-light leading-relaxed">A signed appreciation letter recognising your participation.</div>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="bg-gold/10 p-2 rounded-full shrink-0"><MapPin className="w-4 h-4 text-gold" /></div>
                    <div>
                      <div className="text-white font-bold text-sm mb-1">Home Delivery</div>
                      <div className="text-ink-400 text-xs font-light leading-relaxed">Your certificate and appreciation letter will be safely delivered to your doorstep.</div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Top 10 Box */}
              <div className="bg-gradient-to-br from-[#2a2217] to-[#1A1613] border-2 border-gold/50 p-8 rounded-sm shadow-[0_0_30px_rgba(197,160,89,0.15)] relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 blur-[50px] rounded-full mix-blend-overlay pointer-events-none"></div>
                
                <h4 className="text-2xl font-serif font-black text-white mb-2 relative z-10 flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-gold drop-shadow-md" /> For the Top 10 Winners
                </h4>
                <p className="text-gold text-xs font-bold uppercase tracking-widest mb-8 relative z-10">Included everything above—plus:</p>
                
                <ul className="space-y-8 relative z-10 mt-4">
                  <li className="flex gap-4 items-start">
                    <div className="bg-gold/20 p-3 rounded-full shrink-0 shadow-[0_0_15px_rgba(197,160,89,0.4)]"><Trophy className="w-5 h-5 text-gold" /></div>
                    <div>
                      <div className="text-white font-bold text-sm md:text-base mb-1">The Shakespeare Trophy</div>
                      <div className="text-ink-300 text-xs md:text-sm font-light leading-relaxed">The official premium Shakespeare Trophy awarded to the Top 10 poets.</div>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="bg-gold/20 p-3 rounded-full shrink-0 shadow-[0_0_15px_rgba(197,160,89,0.4)]"><Award className="w-5 h-5 text-gold" /></div>
                    <div>
                      <div className="text-white font-bold text-sm md:text-base mb-1">The Shakespeare Medal</div>
                      <div className="text-ink-300 text-xs md:text-sm font-light leading-relaxed">A beautifully crafted premium medal to honour your achievement.</div>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="bg-gold/20 p-3 rounded-full shrink-0 shadow-[0_0_15px_rgba(197,160,89,0.4)]"><MapPin className="w-5 h-5 text-gold" /></div>
                    <div>
                      <div className="text-white font-bold text-sm md:text-base mb-1">Delivered to Your Home</div>
                      <div className="text-ink-300 text-xs md:text-sm font-light leading-relaxed">Both the trophy and medal will be delivered directly to your doorstep.</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-[10px] md:text-xs uppercase font-bold tracking-[0.4em] text-gold mb-6 inline-flex items-center gap-2 border-b border-gold/20 pb-2">
              <Award className="w-4 h-4" /> Official Verification
            </h2>
            
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black text-white mb-10 leading-tight">
              The Mark of a <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] to-[#c5a059] italic drop-shadow-[0_0_20px_rgba(197,160,89,0.4)]">Recognised Poet.</span>
            </h3>

            <div className="bg-gradient-to-b from-[#1A1613]/80 to-[#14100C]/80 border border-gold/20 p-8 md:p-12 rounded-sm shadow-[0_20px_50px_rgba(197,160,89,0.1)] relative overflow-hidden text-left max-w-4xl mx-auto hover:-translate-y-1 transition-transform duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[80px] pointer-events-none"></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>
              
              <div className="relative z-10 space-y-6 text-sm md:text-lg text-ink-300 font-light leading-relaxed">
                <p>
                  Every official Shakespeare Poetry Award Certificate includes a <strong className="text-white font-bold">unique QR Code and Certificate ID</strong> for instant verification.
                </p>
                <p>
                  With a simple scan, anyone can confirm that your certificate was officially issued by Inkfetish Publications and that you successfully participated in the Shakespeare Poetry Award – Season 2.
                </p>
                <div className="border-l-2 border-gold/50 pl-6 py-2 mt-4">
                  <p className="text-white italic font-serif text-lg md:text-xl drop-shadow-md">
                    "It's more than a certificate—it's a verified record of your literary achievement, designed to give your recognition credibility wherever you share it."
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 10:
        return (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-[10px] md:text-xs uppercase font-bold tracking-[0.4em] text-gold mb-6 inline-flex items-center gap-2 border-b border-gold/20 pb-2">
              <Star className="w-4 h-4" /> But that's not all...
            </h2>
            
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black text-white mb-10 leading-tight">
              We have huge <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] to-[#c5a059] italic drop-shadow-[0_0_20px_rgba(197,160,89,0.4)]">announcements</span> to make.
            </h3>

            <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto text-left">
              <div className="bg-gradient-to-br from-[#1A1613] to-[#14100C] border border-gold/30 p-8 rounded-sm shadow-xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                <BookOpen className="w-8 h-8 text-gold mb-4 drop-shadow-md" />
                <h4 className="text-2xl font-serif font-black text-white mb-3 relative z-10">Solo Publishing & Events</h4>
                <p className="text-ink-300 text-sm md:text-base font-light leading-relaxed relative z-10">
                  We will be unveiling our exclusive Solo Book Publishing opportunities and amazing upcoming events just for you.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#1A1613] to-[#14100C] border border-gold/30 p-8 rounded-sm shadow-xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                <MapPin className="w-8 h-8 text-gold mb-4 drop-shadow-md" />
                <h4 className="text-2xl font-serif font-black text-white mb-3 relative z-10">Physical Prize & Certificate Delivery</h4>
                <p className="text-ink-300 text-sm md:text-base font-light leading-relaxed relative z-10">
                  Finally, at the very end, we will give you the complete timeline and information regarding the delivery of your physical prize and certificate hardcopy!
                </p>
              </div>
            </div>
          </div>
        );

      case 11:
        return (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-[10px] md:text-xs uppercase font-bold tracking-[0.4em] text-gold mb-6 inline-flex items-center gap-2 border-b border-gold/20 pb-2">
              <Star className="w-4 h-4" /> The Moment is Here
            </h2>
            
            <h3 className="text-4xl md:text-6xl lg:text-7xl font-serif font-black text-white mb-10 leading-tight drop-shadow-[0_0_30px_rgba(197,160,89,0.3)]">
              The <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] to-[#c5a059] italic">Top 200</span> Hall of Fame
            </h3>
            
            <p className="text-lg md:text-2xl text-ink-300 max-w-3xl mx-auto font-light leading-relaxed mb-12">
              We are incredibly proud to announce the Top 200 writers of the Shakespeare Poetry Award. <br/><br/>
              Every writer on this list will receive an exclusive digital <strong className="text-white">Hall of Fame Certificate</strong> within the next 2-3 days.
            </p>

            <div className="bg-[#1A1613] border-2 border-gold/40 p-8 shadow-[0_10px_30px_rgba(197,160,89,0.2)] rounded-sm max-w-2xl mx-auto animate-pulse">
              <p className="text-gold font-bold uppercase tracking-widest text-sm mb-4">Are you on the list?</p>
              <p className="text-white text-base md:text-lg">
                We have just dropped the official link in the <strong className="text-gold">Zoom Chat</strong> and <strong className="text-gold">WhatsApp Group</strong>. 
                <br/><br/>Click the link to view the Top 200 Hall of Fame!
              </p>
            </div>
          </div>
        );

      case 23:
        return (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-[10px] md:text-xs uppercase font-bold tracking-[0.4em] text-gold mb-6 inline-flex items-center gap-2 border-b border-gold/20 pb-2">
              <Gamepad2 className="w-4 h-4" /> Interactive Session
            </h2>
            
            <h3 className="text-4xl md:text-5xl lg:text-7xl font-serif font-black text-white mb-6 leading-tight">
              Let's Play Some <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] to-[#c5a059] italic drop-shadow-[0_0_20px_rgba(197,160,89,0.4)]">Games.</span>
            </h3>

            <p className="text-base md:text-xl text-ink-300 max-w-3xl mx-auto font-light leading-relaxed mb-12">
              Before we wrap up the night, it's time for some fun. Get ready to test your wits and reflexes in our live interactive games!
            </p>

            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
              <div className="bg-[#1A1613] border border-gold/30 p-8 flex flex-col items-center shadow-[0_10px_30px_rgba(197,160,89,0.1)] rounded-sm group hover:-translate-y-1 transition-transform duration-500">
                <div className="bg-gold/10 p-5 rounded-full mb-6 group-hover:scale-110 transition-transform duration-500">
                  <BrainCircuit className="w-8 h-8 text-gold" />
                </div>
                <h4 className="text-2xl font-serif font-bold text-white mb-3">Live Quiz</h4>
                <p className="text-ink-400 text-sm md:text-base font-light text-center leading-relaxed">A fast-paced trivia challenge. Let's see who knows their literature and poetry best.</p>
              </div>

              <div className="bg-[#1A1613] border border-gold/30 p-8 flex flex-col items-center shadow-[0_10px_30px_rgba(197,160,89,0.1)] rounded-sm group hover:-translate-y-1 transition-transform duration-500">
                <div className="bg-gold/10 p-5 rounded-full mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Puzzle className="w-8 h-8 text-gold" />
                </div>
                <h4 className="text-2xl font-serif font-bold text-white mb-3">Mystery Puzzle</h4>
                <p className="text-ink-400 text-sm md:text-base font-light text-center leading-relaxed">A brain-teasing interactive puzzle game designed to keep you on your toes.</p>
              </div>
            </div>
          </div>
        );

      case 24:
        return (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-4xl mx-auto px-4 text-center">
            <Gamepad2 className="w-16 h-16 text-gold mx-auto mb-8 drop-shadow-[0_0_20px_rgba(197,160,89,0.6)]" />
            <h2 className="text-4xl md:text-6xl font-serif font-black text-white mb-6 drop-shadow-md">
              Let the <span className="italic text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] to-[#c5a059]">Quiz</span> Begin.
            </h2>
            <p className="text-xl md:text-2xl text-ink-300 font-light max-w-2xl">
              We have <strong className="text-white">18 questions</strong> lined up. <br/>First to answer correctly in the chat wins. Get ready!
            </p>
          </div>
        );

      case 12:
        return (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-[10px] md:text-xs uppercase font-bold tracking-[0.4em] text-gold mb-8 inline-flex items-center gap-2 border-b border-gold/20 pb-2">
              <Star className="w-4 h-4" /> An Exclusive Opportunity
            </h2>
            
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black text-white mb-6 leading-tight drop-shadow-md">
              Before we announce <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] to-[#c5a059] italic">something special...</span>
            </h3>
            
            <div className="bg-gradient-to-br from-[#1A1613] to-[#14100C] border border-gold/30 p-8 rounded-sm shadow-xl max-w-4xl mx-auto mb-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
              <p className="text-lg md:text-xl text-ink-300 font-light leading-relaxed relative z-10">
                I have something <strong className="text-white">very special</strong> for everyone who dreams of publishing their own poetry book, novel, or story.
              </p>
            </div>

            <p className="text-sm md:text-base text-ink-400 font-light mb-8 max-w-2xl mx-auto uppercase tracking-widest">
              But before I tell you about this opportunity... I want to ask you one simple question.
            </p>

            <div className="border border-gold/20 bg-[#1A1613]/80 p-6 md:p-8 backdrop-blur-md rounded-sm shadow-[0_15px_40px_rgba(0,0,0,0.4)] max-w-3xl mx-auto mb-10 transform transition-transform duration-500 hover:scale-[1.02]">
              <h4 className="text-xl md:text-3xl font-serif font-black text-gold mb-6 leading-snug">
                Do you know why we named this event the "Shakespeare Poetry Award"?
              </h4>
              <div className="grid sm:grid-cols-2 gap-4 text-left">
                <div className="bg-[#14100C] border border-gold/10 p-4 rounded-sm flex items-start gap-3">
                  <div className="bg-gold/10 p-2 rounded-full shrink-0"><BookOpen className="w-4 h-4 text-gold" /></div>
                  <p className="text-ink-300 text-sm font-light">Is it just because Shakespeare was a great writer?</p>
                </div>
                <div className="bg-[#14100C] border border-gold/10 p-4 rounded-sm flex items-start gap-3">
                  <div className="bg-gold/10 p-2 rounded-full shrink-0"><BrainCircuit className="w-4 h-4 text-gold" /></div>
                  <p className="text-ink-300 text-sm font-light">Or is there a much bigger reason behind this name?</p>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-3 animate-pulse">
              <span className="text-white text-sm md:text-lg font-serif italic tracking-wide">Let's discover it together...</span>
              <ChevronRight className="w-5 h-5 text-gold" />
            </div>
          </div>
        );

      case 13:
        return (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-[10px] md:text-xs uppercase font-bold tracking-[0.4em] text-gold mb-6 inline-flex items-center gap-2 border-b border-gold/20 pb-2">
              <BookOpen className="w-4 h-4" /> The Secret to Legacy
            </h2>
            
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-white mb-8 leading-tight drop-shadow-[0_0_20px_rgba(197,160,89,0.3)]">
              Why did Shakespeare become the <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] to-[#c5a059] italic">world-famous</span> Shakespeare we know today?
            </h3>
            
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-base md:text-xl text-ink-300 font-light leading-relaxed">
                Shakespeare became Shakespeare <strong className="text-white font-bold">not just because he was a great writer</strong>, but because his words reached the world. His poems, plays, and stories were preserved and published in the form of books, allowing generation after generation to read his work.
              </p>

              <div className="bg-gradient-to-br from-[#1A1613] to-[#14100C] border-l-4 border-gold p-6 md:p-8 rounded-r-sm shadow-[0_15px_40px_rgba(0,0,0,0.6)] relative overflow-hidden group hover:bg-[#1A1613] transition-colors duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-[40px] pointer-events-none group-hover:bg-gold/20 transition-all duration-700"></div>
                <p className="text-lg md:text-2xl text-white font-serif font-medium leading-relaxed relative z-10 italic">
                  "His writing inspired millions of people and made a lasting contribution to literature. Even after more than 400 years, people still know his name because his words were not left hidden—they were shared with the world."
                </p>
                <div className="mt-4 text-gold text-xs md:text-sm font-bold uppercase tracking-widest relative z-10">
                  That's how a writer becomes a legacy.
                </div>
              </div>
            </div>
          </div>
        );

      case 14:
        return (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-5xl mx-auto px-4 text-center">
            <h3 className="text-4xl md:text-6xl lg:text-7xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] to-[#c5a059] mb-8 drop-shadow-lg italic">
              Just imagine...
            </h3>
            
            <p className="text-xl md:text-3xl text-white font-light leading-relaxed max-w-4xl mx-auto mb-10">
              ...if Shakespeare had <span className="border-b border-red-500/50 pb-1 text-red-100">never published</span> or preserved his writings, would the world still know his name today? <br/>
              <span className="text-ink-400 italic block mt-4 font-serif">Maybe not.</span>
            </p>

            <div className="bg-gradient-to-b from-[#1A1613]/95 to-[#14100C]/95 border border-gold/40 p-8 md:p-12 rounded-sm shadow-[0_20px_60px_rgba(197,160,89,0.15)] relative overflow-hidden transform hover:-translate-y-2 transition-transform duration-500 w-full max-w-3xl">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>
              <div className="bg-gold/10 p-4 rounded-full inline-block mb-6 relative z-10"><Trophy className="w-8 h-8 text-gold" /></div>
              
              <p className="text-lg md:text-2xl text-white font-serif font-bold leading-relaxed relative z-10 drop-shadow-md">
                It was his published work that turned a talented writer into a timeless legend. 
              </p>
              <p className="text-ink-300 text-sm md:text-lg font-light leading-relaxed relative z-10 mt-4">
                That's why we still remember Shakespeare, even after 400 years.
              </p>
            </div>
          </div>
        );

      case 15:
        return (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-5xl mx-auto px-4 text-center">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-[0.4em] text-gold mb-6 border-b border-gold/20 pb-2">
              Now the question is...
            </span>
            
            <h3 className="text-3xl md:text-5xl font-serif font-black text-white mb-8 leading-tight drop-shadow-md">
              How can you begin your own journey as an <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] to-[#c5a059] italic">author</span>, just like Shakespeare began his?
            </h3>
            
            <div className="bg-gradient-to-br from-[#1A1613] to-[#14100C] border border-gold/40 p-6 md:p-8 rounded-sm shadow-[0_15px_40px_rgba(0,0,0,0.5)] max-w-4xl mx-auto mb-10 hover:border-gold/60 transition-colors duration-500">
              <p className="text-xl md:text-2xl text-white font-serif font-bold leading-relaxed italic">
                "Not by becoming another Shakespeare, but by following the same path of <span className="text-gold">sharing your words with the world</span>."
              </p>
            </div>

            <p className="text-base md:text-xl text-ink-300 font-light leading-relaxed max-w-4xl mx-auto mb-12">
              Shakespeare started by writing, but his legacy was built because his work was published and preserved. In the same way, if you want people to know your writing, remember your name, and build your own author identity, you also need to take that next step.
            </p>

            <div className="inline-flex items-center gap-3 bg-gold/10 border border-gold/30 px-6 py-3 rounded-full animate-bounce mt-4 shadow-[0_0_20px_rgba(197,160,89,0.2)]">
              <span className="text-gold text-lg md:text-xl font-bold font-serif italic tracking-wide">Now, what is the next step?</span>
              <ChevronRight className="w-5 h-5 text-gold" />
            </div>
          </div>
        );

      case 16:
        return (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-5xl mx-auto px-4 text-center">
            <span className="text-sm md:text-base font-serif italic text-gold/80 mb-4 inline-block">
              Now,
            </span>
            
            <h3 className="text-3xl md:text-5xl font-serif font-black text-white mb-6 leading-tight drop-shadow-md">
              To build your own author identity, you have to <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] to-[#c5a059] italic">cross a bridge...</span>
            </h3>
            
            <div className="bg-gradient-to-b from-[#1A1613] to-[#14100C] border-y-2 border-gold/40 py-8 px-6 w-full max-w-4xl mx-auto mb-10 shadow-[0_0_50px_rgba(197,160,89,0.15)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
              <p className="text-2xl md:text-4xl text-white font-serif font-black leading-relaxed relative z-10 drop-shadow-md">
                ...and we call it the <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ebd298] via-[#c5a059] to-[#ebd298] italic text-4xl md:text-6xl mt-2 block tracking-wide">"Shakespeare Bridge"</span>
              </p>
            </div>

            <p className="text-base md:text-xl text-ink-300 font-light leading-relaxed max-w-4xl mx-auto mb-12">
              This is the bridge that takes a writer one step closer to becoming a published author and building an author brand. <strong className="text-white font-medium">Publishing a book isn't the final destination</strong>—it's the bridge that helps transform a writer into an author brand that people can discover, remember, and follow.
            </p>

            <div className="inline-flex flex-col items-center gap-2 mt-2 animate-bounce">
              <span className="text-gold text-lg md:text-xl font-bold font-serif italic tracking-wide">But you all will start asking... what is the Shakespeare Bridge???</span>
              <ChevronRight className="w-6 h-6 text-gold rotate-90" />
            </div>
          </div>
        );

      case 17:
        return (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-[95vw] mx-auto px-2">
            <div className="relative w-full h-[88vh] rounded-lg overflow-hidden shadow-[0_20px_60px_rgba(197,160,89,0.3)] border-2 border-gold/40 group flex items-center justify-center bg-black/40">
              <div className="absolute inset-0 bg-gold/5 mix-blend-overlay pointer-events-none z-10 group-hover:bg-transparent transition-colors duration-700"></div>
              <Image 
                src="/shakespeare-bridge.png" 
                alt="The Shakespeare Bridge" 
                fill 
                className="object-contain scale-100 group-hover:scale-[1.02] transition-transform duration-[2s] ease-out"
                priority
              />
            </div>
            
            <div className="inline-flex items-center gap-3 mt-4 animate-pulse">
              <span className="text-white text-sm md:text-lg font-serif italic tracking-wide">The Journey Awaits...</span>
              <ChevronRight className="w-5 h-5 text-gold" />
            </div>
          </div>
        );

      case 18:
        return (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-serif text-ink-300 mb-6 italic font-light drop-shadow-md">
              Now you know the path.
            </h2>
            
            <h3 className="text-4xl md:text-6xl font-serif font-black text-white mb-8 leading-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              But the real question is... <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ebd298] via-[#c5a059] to-[#ebd298]">who will help you cross the Shakespeare Bridge?</span>
            </h3>

            <p className="text-lg md:text-2xl text-ink-300 font-light max-w-3xl mx-auto mb-10 italic border-l-2 border-gold/30 pl-6 text-left">
              "Who will help you go beyond simply publishing a book and start building your own author identity?"
            </p>
            
            <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-10 mx-auto"></div>

            <div className="bg-gradient-to-b from-[#1A1613] to-[#14100C] border border-gold/20 p-8 md:p-12 rounded-sm shadow-[0_20px_60px_rgba(197,160,89,0.15)] transform transition-transform hover:scale-[1.01] duration-500 relative overflow-hidden group w-full max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
              
              <div className="bg-gold/10 p-3 rounded-full inline-block mb-6 relative z-10"><Star className="w-6 h-6 text-gold" /></div>
              
              <h4 className="text-3xl md:text-5xl font-serif font-black text-white mb-8 relative z-10">
                That is where <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ebd298] via-[#c5a059] to-[#ebd298] italic">Inkfetish Publications</span> comes in.
              </h4>
              
              <p className="text-base md:text-xl text-ink-200 font-light leading-relaxed max-w-3xl mx-auto relative z-10">
                Our mission is <strong className="text-white font-medium">not just to publish your book.</strong> We are here to help you begin your journey as an author, build your author brand, and share your words with readers across the world. Just like every great author started with one step, we're here to help you take yours.
              </p>
            </div>
          </div>
        );

      case 19:
        return (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-6xl mx-auto px-4 text-center">
            <p className="text-xl md:text-2xl text-ink-300 font-light mb-12 max-w-3xl mx-auto italic drop-shadow-md">
              We believe we are the best partner to bridge the gap between where you are today and where you want to be.
            </p>
            
            <div className="mb-14">
              <h2 className="text-xs md:text-sm uppercase tracking-[0.4em] font-bold text-gold mb-6 inline-flex items-center gap-3">
                <Rocket className="w-5 h-5" /> Introducing
              </h2>
              <h3 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] via-[#ebd298] to-[#c5a059] leading-tight drop-shadow-[0_0_40px_rgba(197,160,89,0.2)]">
                AuthorLaunchpad™
              </h3>
              <div className="text-lg md:text-xl font-bold tracking-widest uppercase text-ink-400 mt-4">The Flagship Program</div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto mb-12">
              <div className="bg-[#1A1613]/60 border border-red-500/10 p-8 rounded-sm backdrop-blur-sm transform transition-all duration-500 hover:bg-[#1A1613] hover:-translate-y-1">
                <div className="bg-red-500/10 p-3 rounded-full inline-block mb-4"><X className="w-6 h-6 text-red-400" /></div>
                <p className="text-xl md:text-3xl text-ink-400 font-serif font-light leading-relaxed">
                  We don't just <br/><span className="text-red-300/80 line-through decoration-red-500/50 block mt-2 font-medium">publish your book.</span>
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-[#1A1613] to-[#14100C] border border-gold/40 p-8 rounded-sm shadow-[0_20px_50px_rgba(197,160,89,0.15)] transform transition-all duration-500 hover:-translate-y-1 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gold/5 pointer-events-none group-hover:bg-gold/10 transition-colors duration-500"></div>
                <div className="bg-gold/10 p-3 rounded-full inline-block mb-4 relative z-10"><Star className="w-6 h-6 text-gold" /></div>
                <p className="text-xl md:text-3xl text-white font-serif font-light leading-relaxed relative z-10">
                  We launch your <br/><span className="text-gold italic block mt-2 font-black">Author Brand.</span>
                </p>
              </div>
            </div>
            
            <p className="text-lg md:text-2xl text-ink-200 font-light max-w-4xl mx-auto bg-black/40 p-6 md:p-8 rounded-sm border-l-4 border-gold shadow-lg">
              We help you cross the Shakespeare Bridge so you don't just become a published author—you become an <strong className="text-white">author brand</strong> and the <strong className="text-gold italic font-serif">Shakespeare of 2026.</strong>
            </p>
          </div>
        );

      case 20:
        return (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-5xl mx-auto px-4 text-center">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-[0.4em] text-gold mb-6 border-b border-gold/20 pb-2">
              A Special Announcement
            </span>
            
            <h3 className="text-4xl md:text-6xl font-serif font-black text-white mb-10 leading-tight drop-shadow-md">
              Because you are <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] to-[#c5a059] italic">still here...</span>
            </h3>

            <div className="bg-gradient-to-br from-[#1A1613] to-[#14100C] border border-gold/30 p-8 md:p-12 rounded-sm shadow-[0_20px_60px_rgba(197,160,89,0.15)] max-w-4xl mx-auto mb-10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
              
              <h4 className="text-2xl md:text-4xl text-white font-serif font-bold leading-relaxed relative z-10 mb-6">
                We are offering an exclusive <span className="text-gold">Flat ₹5,000 Discount</span> on our Flagship Package.
              </h4>
              <p className="text-base md:text-xl text-ink-300 font-light leading-relaxed relative z-10">
                This is reserved strictly for those present here today—those who took part in this event, are ready to cross that bridge, and are determined to become an <strong className="text-white">author brand</strong>.
              </p>
            </div>

            <div className="max-w-3xl mx-auto mb-12">
              <p className="text-xl md:text-3xl text-gold font-serif italic leading-relaxed drop-shadow-md mb-4">
                "This is not a cost. This is not an expense."
              </p>
              <p className="text-sm md:text-base text-ink-200 font-light uppercase tracking-widest">
                It is an investment in your brand that will generate returns for years.
              </p>
            </div>

            <div className="inline-flex items-center gap-3 animate-pulse">
              <span className="text-white text-sm md:text-lg font-serif italic tracking-wide">Let's explore what's inside...</span>
              <ChevronRight className="w-5 h-5 text-gold" />
            </div>
          </div>
        );

      case 21:
        return (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] via-[#ebd298] to-[#c5a059] mb-2 drop-shadow-md">
              Flagship AuthorLaunchpad™
            </h2>
            <p className="text-base md:text-xl text-ink-300 font-light mb-10 italic">
              Everything you need to build your author brand.
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full mx-auto">
              {/* Left Column - Pricing */}
              <div className="bg-[#1A1613]/80 border border-gold/40 p-8 md:p-10 rounded-sm shadow-[0_20px_50px_rgba(197,160,89,0.15)] flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent pointer-events-none"></div>
                <h4 className="text-gold text-xs md:text-sm font-bold uppercase tracking-widest mb-6 relative z-10">Exclusive Attendee Price</h4>
                
                <div className="flex items-center justify-center gap-4 mb-2 relative z-10">
                  <s className="text-3xl md:text-4xl text-red-500/60 font-serif font-medium">₹15,000</s>
                </div>
                <div className="text-6xl md:text-8xl font-black text-white font-serif drop-shadow-[0_0_30px_rgba(197,160,89,0.4)] mb-4 relative z-10">
                  ₹10,000
                </div>
                
                <div className="bg-gold text-[#14100C] text-sm md:text-base font-black uppercase tracking-[0.2em] py-2 px-6 rounded-full inline-block mx-auto mb-8 shadow-lg relative z-10">
                  Flat ₹5,000 Off Today
                </div>

                <div className="border-t border-gold/20 pt-6 relative z-10 text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-white font-bold tracking-wide">0% Interest</span>
                  </div>
                  <p className="text-ink-300 text-xs md:text-sm font-light">
                    Flexible EMI Options Available: <br/>
                    <strong className="text-gold mt-1 inline-block">10 Days &nbsp;•&nbsp; 15 Days &nbsp;•&nbsp; 2 Months</strong>
                  </p>
                </div>
              </div>

              {/* Right Column - Features */}
              <div className="bg-transparent border border-gold/20 p-8 md:p-10 rounded-sm text-left flex flex-col justify-center">
                <h4 className="text-white text-lg md:text-xl font-serif font-bold mb-6 border-b border-gold/20 pb-4">What's Included:</h4>
                <ul className="space-y-4">
                  {[
                    "Complete Author Brand Identity Setup",
                    "Premium Book Cover & Interior Design",
                    "Global Distribution & ISBN Assignment",
                    "Cinematic 3D Book Launch Video",
                    "Custom Book Marketing Poster & Materials",
                    "Social Media Brand Kit",
                    "Verified Author Recognition Certificate",
                    "Dedicated Launchpad Support Team"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <span className="text-ink-200 text-sm md:text-base font-light">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );

      case 22:
        return (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-5xl mx-auto px-4 text-center">
            <span className="text-xs md:text-sm uppercase font-bold tracking-[0.4em] text-gold mb-6 border-b border-gold/20 pb-2">
              Next Steps
            </span>
            
            <h3 className="text-3xl md:text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-[#fdfbf7] via-[#ebd298] to-[#c5a059] mb-8 leading-tight drop-shadow-md">
              Free Solo Book Publishing Consultation
            </h3>

            <div className="bg-[#1A1613]/80 border border-gold/30 p-8 md:p-10 rounded-sm shadow-[0_20px_50px_rgba(197,160,89,0.1)] max-w-3xl mx-auto mb-10 transform transition-transform hover:scale-[1.02] duration-500">
              <Calendar className="w-12 h-12 text-gold mx-auto mb-6 opacity-80" />
              <p className="text-lg md:text-2xl text-white font-serif font-light leading-relaxed mb-4">
                Ready to claim your Flagship Package? <br className="hidden md:block" />
                Have questions about publishing your own solo book?
              </p>
              <p className="text-base md:text-xl text-ink-300 font-light">
                Schedule a 1:1 call with our experts to get all the answers.
              </p>
            </div>

            <div className="bg-gold/10 border border-gold/40 text-white font-black text-sm md:text-lg uppercase tracking-widest py-4 px-8 rounded-full mb-10 shadow-[0_0_30px_rgba(197,160,89,0.3)] animate-pulse">
              Link shared in the WhatsApp Group & Chat
            </div>

            <p className="text-xl md:text-3xl text-gold font-serif italic drop-shadow-md">
              Let's build your author brand!
            </p>
          </div>
        );

      case 61:
        return (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-4xl mx-auto px-4 text-center">
            <Trophy className="w-16 h-16 text-gold mx-auto mb-8 drop-shadow-[0_0_20px_rgba(197,160,89,0.6)]" />
            <h2 className="text-4xl md:text-6xl font-serif font-black text-white mb-8">
              Be There. <span className="italic text-gold">Live.</span>
            </h2>
            <p className="text-base md:text-lg text-ink-300 font-light mb-12 leading-relaxed">
              The Zoom link will be emailed to all participants 24 hours prior. <br/>
              Ensure you reserve your evening. This is the moment your legacy is cemented.
            </p>

            <button className="relative px-12 py-5 bg-gradient-to-r from-[#c5a059] to-[#b8922a] hover:from-[#ebd298] hover:to-[#c5a059] text-[#14100C] font-black text-[11px] sm:text-xs uppercase tracking-[0.25em] transition-all rounded-sm shadow-[0_0_30px_rgba(197,160,89,0.3)] hover:shadow-[0_0_40px_rgba(197,160,89,0.5)] hover:-translate-y-1 inline-flex items-center gap-3 group overflow-hidden mb-8">
              <span className="relative z-10 flex items-center gap-2">
                 Get The Zoom Link <ChevronRight className="w-4 h-4" />
              </span>
               <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 group-hover:animate-[sweep_1.5s_ease-in-out] pointer-events-none"></div>
            </button>

            <div className="text-[10px] uppercase font-bold tracking-widest text-ink-500">
              Attendance is mandatory for Top 10 prize eligibility.
            </div>
          </div>
        );

      default:
        break;
    }

    if (currentSlide >= 25 && currentSlide <= 60) {
      const quizIndex = Math.floor((currentSlide - 25) / 2);
      const isAnswerSlide = (currentSlide - 25) % 2 === 1;
      const question = quizQuestions[quizIndex];

      return (
        <div className="flex flex-col items-center justify-center h-full w-full max-w-5xl mx-auto px-4 text-center relative overflow-hidden">
          <h2 className="text-[10px] md:text-xs uppercase font-bold tracking-[0.4em] text-gold mb-8 inline-flex items-center gap-2 border-b border-gold/20 pb-2 relative z-10">
            Question {quizIndex + 1} of 18
          </h2>

          <div className={`transition-all duration-700 w-full relative z-10 ${isAnswerSlide ? 'opacity-20 blur-sm scale-95' : 'opacity-100 scale-100'}`}>
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-serif font-black text-white mb-10 leading-relaxed whitespace-pre-wrap max-w-4xl mx-auto drop-shadow-md">
              {question.q}
            </h3>
            
            {question.options.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mt-8">
                {question.options.map((opt, i) => (
                  <div key={i} className="bg-[#1A1613] border border-gold/20 p-5 rounded-sm text-ink-300 text-left font-bold font-serif text-lg shadow-xl">
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>

          {isAnswerSlide && (
            <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/70 backdrop-blur-md">
              <div className="bg-gradient-to-b from-[#0F1A12] to-[#0A120C] border-2 border-green-500/60 p-10 md:p-16 rounded-xl shadow-[0_0_80px_rgba(34,197,94,0.25)] max-w-4xl w-full mx-4 text-center animate-in zoom-in-95 duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-green-500/5 mix-blend-overlay"></div>
                <div className="bg-green-500/10 p-4 rounded-full inline-block mb-6 relative z-10">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <h4 className="text-green-400 text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-8 relative z-10">Correct Answer</h4>
                <h3 className="text-4xl md:text-6xl font-serif font-black text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] leading-tight relative z-10">
                  {question.a}
                </h3>
              </div>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#14100C] text-parchment-light font-sans selection:bg-gold selection:text-[#14100C]"
      style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #2A2118 0%, #14100C 60%)' }}>
      
      {/* Background elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23c5a059\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.08)_0%,transparent_70%)] pointer-events-none"></div>
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.04)_0%,transparent_70%)] pointer-events-none"></div>

      {/* Progress Bar (Top) */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[#1A1613] z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-gold to-[#ebd298]"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Slide Number Indicator */}
      <div className="absolute top-6 right-6 z-50 text-[9px] font-bold tracking-[0.2em] text-ink-500/80 uppercase">
        {currentSlide + 1} / {totalSlides}
      </div>

      {/* Main Slide Content */}
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence initial={false} custom={1}>
          <motion.div
            key={currentSlide}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            {renderSlide()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls Removed as requested */}
      
      {/* Invisible Click Areas for Desktop */}
      <div className="absolute inset-y-0 left-0 w-[15%] z-40 cursor-pointer hidden md:block" onClick={prevSlide} />
      <div className="absolute inset-y-0 right-0 w-[15%] z-40 cursor-pointer hidden md:block" onClick={nextSlide} />

    </div>
  );
}
