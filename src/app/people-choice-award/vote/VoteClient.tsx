'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, CheckCircle2, AlertCircle, ArrowRight,
  Check, Search, Lock, BookOpen, Feather,
  X, Eye, ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { INITIAL_CANDIDATES, CandidateEntry, getCurrentTimeSeed, getRotatedCandidates } from '@/data/peopleChoiceCandidates';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore';

interface VoterInfo {
  name: string;
  email: string;
  phone: string;
}

interface VoteRecord {
  vote_id: string;
  voter_name: string;
  voter_email: string;
  voter_phone: string;
  candidate_ids: string[];
  selected_candidates: {
    id: string;
    authorName: string;
    pieceTitle: string;
    category: string;
    theme?: string;
  }[];
  votes_count: number;
  created_at: string;
}

export default function VoteClient() {
  // Step state: 'login' | 'ballot' | 'already_voted'
  const [step, setStep] = useState<'login' | 'ballot' | 'already_voted'>('login');

  // Step 1: Voter details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Active verified voter
  const [activeVoter, setActiveVoter] = useState<VoterInfo | null>(null);

  // Modal Preview state (when user clicks to expand a piece)
  const [previewCandidate, setPreviewCandidate] = useState<CandidateEntry | null>(null);

  // Ballot selections: array of up to 5 candidate IDs (STRICT MAX: 5)
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Confirmation Modal before final commit
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Completed / Already Voted Record
  const [voteRecord, setVoteRecord] = useState<VoteRecord | null>(null);
  const [duplicateReason, setDuplicateReason] = useState<string | null>(null);

  // Check localStorage on mount for previously sealed vote
  useEffect(() => {
    try {
      const savedRecord = localStorage.getItem('pca_vote_record');
      if (savedRecord) {
        const parsed = JSON.parse(savedRecord);
        setVoteRecord(parsed);
        setStep('already_voted');
        return;
      }
    } catch (e) {
      console.error('Error reading localStorage for PCA vote record:', e);
    }
  }, []);

  // 15-minute rotation seed state (updates every 15 min so all entries get equal top exposure)
  const [timeSeed, setTimeSeed] = useState(() => getCurrentTimeSeed());

  useEffect(() => {
    // Check periodically if a new 15-minute block has started
    const timer = setInterval(() => {
      const nextSeed = getCurrentTimeSeed();
      setTimeSeed((prev) => (prev !== nextSeed ? nextSeed : prev));
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  // Rotated candidates according to the current 15-minute window
  const rotatedCandidates = useMemo(() => {
    return getRotatedCandidates(INITIAL_CANDIDATES, timeSeed);
  }, [timeSeed]);

  // Filtered Candidates based on rotated list + search query
  const filteredCandidates = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return rotatedCandidates;
    return rotatedCandidates.filter((c) => {
      return (
        c.authorName.toLowerCase().includes(q) ||
        c.pieceTitle.toLowerCase().includes(q) ||
        (c.theme && c.theme.toLowerCase().includes(q)) ||
        c.excerpt.toLowerCase().includes(q)
      );
    });
  }, [rotatedCandidates, searchQuery]);

  // Selected candidates data objects
  const selectedCandidates = useMemo(() => {
    return INITIAL_CANDIDATES.filter((c) => selectedIds.includes(c.id));
  }, [selectedIds]);

  // Toggle candidate vote selection (Strictly max 5)
  const toggleSelectCandidate = (candidateId: string) => {
    if (selectedIds.includes(candidateId)) {
      setSelectedIds((prev) => prev.filter((id) => id !== candidateId));
    } else {
      if (selectedIds.length >= 5) return; // Strict max 5 votes
      setSelectedIds((prev) => [...prev, candidateId]);
    }
  };

  // Trigger celebration confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#c5a059', '#e5c97b', '#ffffff', '#9e7b39']
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 50,
          origin: { x: 0 },
          colors: ['#c5a059', '#e5c97b', '#9e7b39']
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 50,
          origin: { x: 1 },
          colors: ['#c5a059', '#e5c97b', '#9e7b39']
        });
      }, 250);
    } catch (e) {
      console.log('Confetti trigger:', e);
    }
  };

  // Step 1: Verify Reader Details before entering voting floor
  const handleVerifyVoter = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const trimmedName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);

    if (trimmedName.length < 2) {
      setLoginError('Please enter your full name (minimum 2 characters).');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setLoginError('Please enter a valid email address.');
      return;
    }
    if (cleanPhone.length !== 10) {
      setLoginError('Please enter a valid 10-digit mobile or WhatsApp number.');
      return;
    }

    setIsVerifying(true);

    try {
      // 1. Query Firestore for phone number duplicate (only block if already sealed ballot)
      const phoneQuery = query(
        collection(db, 'people_choice_votes'),
        where('voter_phone', '==', cleanPhone)
      );
      const phoneSnap = await getDocs(phoneQuery);

      const sealedPhoneDoc = phoneSnap.docs.find(
        (d) => d.data().status === 'sealed_ballot' || (d.data().candidate_ids && d.data().candidate_ids.length === 5)
      );

      if (sealedPhoneDoc) {
        const existingData = sealedPhoneDoc.data() as VoteRecord;
        localStorage.setItem('pca_vote_record', JSON.stringify(existingData));
        localStorage.setItem('pca_voted_phone', cleanPhone);
        setVoteRecord(existingData);
        setDuplicateReason(`A ballot has already been submitted using WhatsApp/Mobile +91 ${cleanPhone}.`);
        setStep('already_voted');
        setIsVerifying(false);
        return;
      }

      // 2. Query Firestore for email duplicate
      const emailQuery = query(
        collection(db, 'people_choice_votes'),
        where('voter_email', '==', cleanEmail)
      );
      const emailSnap = await getDocs(emailQuery);

      const sealedEmailDoc = emailSnap.docs.find(
        (d) => d.data().status === 'sealed_ballot' || (d.data().candidate_ids && d.data().candidate_ids.length === 5)
      );

      if (sealedEmailDoc) {
        const existingData = sealedEmailDoc.data() as VoteRecord;
        localStorage.setItem('pca_vote_record', JSON.stringify(existingData));
        localStorage.setItem('pca_voted_email', cleanEmail);
        setVoteRecord(existingData);
        setDuplicateReason(`A ballot has already been submitted using email ${cleanEmail}.`);
        setStep('already_voted');
        setIsVerifying(false);
        return;
      }

      // 3. Immediately save reader verification details to Firebase Firestore
      const readerDocId = `reader_${cleanPhone}_${Date.now()}`;
      try {
        await setDoc(doc(db, 'people_choice_votes', readerDocId), {
          record_type: 'voter_verification',
          voter_name: trimmedName,
          voter_email: cleanEmail,
          voter_phone: cleanPhone,
          status: 'ballot_unlocked',
          created_at: new Date().toISOString(),
          user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
        });
        localStorage.setItem('pca_reader_session_id', readerDocId);
      } catch (saveErr) {
        console.warn('Could not save initial reader lead (check Firestore rules):', saveErr);
      }

      // Valid reader: allow entry into ballot
      setActiveVoter({
        name: trimmedName,
        email: cleanEmail,
        phone: cleanPhone
      });
      setStep('ballot');
    } catch (err: any) {
      console.error('Error verifying voter:', err);
      // Fallback: proceed to ballot
      setActiveVoter({
        name: trimmedName,
        email: cleanEmail,
        phone: cleanPhone
      });
      setStep('ballot');
    } finally {
      setIsVerifying(false);
    }
  };

  // Step 2 Final Submit: Commit the 5 votes to Firestore
  const handleFinalSubmit = async () => {
    if (!activeVoter) return;
    if (selectedIds.length !== 5) {
      setSubmitError('Please select exactly 5 candidates before submitting.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const voteId = `pca_vote_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const voteData: VoteRecord = {
        vote_id: voteId,
        voter_name: activeVoter.name,
        voter_email: activeVoter.email,
        voter_phone: activeVoter.phone,
        candidate_ids: selectedIds,
        selected_candidates: selectedCandidates.map((c) => ({
          id: c.id,
          authorName: c.authorName,
          pieceTitle: c.pieceTitle,
          category: c.category,
          theme: c.theme
        })),
        votes_count: 5,
        created_at: new Date().toISOString()
      };

      await setDoc(doc(db, 'people_choice_votes', voteId), {
        ...voteData,
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        status: 'sealed_ballot'
      });

      // Save to localStorage for permanent lock
      localStorage.setItem('pca_vote_record', JSON.stringify(voteData));
      localStorage.setItem('pca_voted_phone', activeVoter.phone);
      localStorage.setItem('pca_voted_email', activeVoter.email);

      setVoteRecord(voteData);
      setShowConfirmModal(false);
      setStep('already_voted');
      triggerConfetti();
    } catch (err: any) {
      console.error('Failed to submit vote to Firestore:', err);
      setSubmitError('Failed to record ballot. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080706] text-[#ede8dd] font-sans selection:bg-[#c5a059] selection:text-black relative overflow-x-hidden pb-32">
      {/* Ambient background lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-[radial-gradient(ellipse_at_top,#2a2215_0%,transparent_75%)] opacity-30 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1a1408_1px,transparent_1px),linear-gradient(to_bottom,#1f1a1408_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-40 bg-[#080706]/92 backdrop-blur-md border-b border-[#252017] py-3 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/people-choice-award" className="flex items-center gap-3 group">
            <img
              src="/images/inkfetish_logo.png"
              alt="Inkfetish Publication"
              className="w-8 h-8 rounded-full object-cover border border-[#c5a059]/40 group-hover:border-[#c5a059] transition-colors"
            />
            <div>
              <span className="font-serif text-sm tracking-wide text-[#ede8dd] font-medium block">
                Inkfetish Publication
              </span>
              <span className="text-[10px] text-[#9c9384] tracking-widest uppercase block">
                People&apos;s Choice Award 2026
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 bg-[#14110c] border border-[#2e261a] px-3 py-1 rounded-full text-[11px] text-[#c5a059]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Voting is Live 🗳️</span>
            </div>
            <Link
              href="/people-choice-award"
              className="text-xs text-[#9c9384] hover:text-[#ede8dd] transition-colors flex items-center gap-1 font-sans"
            >
              <span>Award Details</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">

        {/* ============================================================== */}
        {/* STEP 1: READER DETAILS FORM (BEFORE ENTERING VOTING)            */}
        {/* ============================================================== */}
        {step === 'login' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-lg mx-auto text-center"
          >
            {/* Minimal Badge */}
            <div className="inline-flex items-center gap-1.5 bg-[#14110c] border border-[#2e261a] px-3.5 py-1 rounded-full mb-3">
              <Trophy className="w-3 h-3 text-[#c5a059]" />
              <span className="text-[11px] font-sans tracking-wide text-[#baa47e]">
                People&apos;s Choice Award 2026
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-[#fbf7ee] leading-snug mb-2">
              Cast Your 5 Votes. <br />
              <span className="italic text-[#c5a059] font-light">Choose India&apos;s Top 20 Writers &amp; Poets.</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#9c9384] max-w-md mx-auto leading-relaxed font-light mb-6">
              Enter your details to unlock your ballot and pick your 5 favorites.
            </p>

            {/* Verification Card */}
            <div className="bg-[#100d09] border border-[#231d13] rounded-2xl p-6 sm:p-8 shadow-2xl text-left relative overflow-hidden">
              {loginError && (
                <div className="mb-5 bg-red-950/30 border border-red-800/40 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-red-200">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{loginError}</span>
                </div>
              )}

              <form onSubmit={handleVerifyVoter} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-medium text-[#baa47e] mb-1.5 font-sans">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-[#0a0806] border border-[#262016] focus:border-[#c5a059] rounded-xl px-4 py-3 text-sm text-[#fbf7ee] placeholder-[#5a5244] focus:outline-none focus:ring-1 focus:ring-[#c5a059]/40 transition-colors font-sans"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-medium text-[#baa47e] mb-1.5 font-sans">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-[#0a0806] border border-[#262016] focus:border-[#c5a059] rounded-xl px-4 py-3 text-sm text-[#fbf7ee] placeholder-[#5a5244] focus:outline-none focus:ring-1 focus:ring-[#c5a059]/40 transition-colors font-sans"
                  />
                </div>

                {/* WhatsApp / Mobile Number */}
                <div>
                  <label className="block text-xs font-medium text-[#baa47e] mb-1.5 font-sans">
                    WhatsApp / Mobile Number *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-[#262016] bg-[#14110c] text-xs text-[#baa47e] font-mono">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="9876543210"
                      className="w-full bg-[#0a0806] border border-[#262016] focus:border-[#c5a059] rounded-r-xl px-4 py-3 text-sm text-[#fbf7ee] placeholder-[#5a5244] focus:outline-none font-mono transition-colors"
                    />
                  </div>
                  <span className="text-[11px] text-[#6b6253] mt-1 block font-sans">
                    Ensures each reader can vote only once. Max 5 votes allowed.
                  </span>
                </div>

                {/* Enter Voting Floor Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="w-full bg-gradient-to-r from-[#c5a059] via-[#e5c97b] to-[#c5a059] hover:brightness-105 text-black font-sans font-semibold py-3.5 px-6 rounded-xl text-xs sm:text-sm tracking-wider uppercase transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 shadow-lg shadow-[#c5a059]/10"
                  >
                    {isVerifying ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span className="font-sans text-xs">Checking Voting Status...</span>
                      </>
                    ) : (
                      <>
                        <span>Enter Voting Floor (Pick 5 Entries)</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Minimal Trust Indicator */}
              <div className="mt-5 pt-4 border-t border-[#1e1911] flex items-center justify-center gap-2 text-xs text-[#7a7162] text-center font-sans">
                <Lock className="w-3.5 h-3.5 text-[#baa47e]" />
                <span>100% Free &amp; Fair Democratic Voting • Inkfetish Publication</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* STEP 2: VOTING CARDS (WITH VOTE OPTION ON EACH CARD & MODAL)   */}
        {/* ============================================================== */}
        {step === 'ballot' && activeVoter && (
          <div>
            {/* Slim Header & Progress Indicator */}
            <div className="bg-[#100d09] border border-[#231d13] rounded-2xl p-4 sm:p-5 mb-5">
              <div className="flex items-center justify-between gap-3 mb-2.5">
                <div>
                  <h2 className="font-serif text-lg sm:text-xl font-normal text-[#fbf7ee]">
                    Pick Your 5 Favorites
                  </h2>
                  <p className="text-[11px] sm:text-xs text-[#8e8576]">
                    Voting as <span className="text-[#baa47e] font-medium">{activeVoter.name}</span> • Exactly 5 votes
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <span className={`inline-flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded-md border ${
                    selectedIds.length === 5
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 font-semibold'
                      : 'bg-[#18130c] border-[#2e261a] text-[#c5a059]'
                  }`}>
                    {selectedIds.length === 5 ? '✓ 5 of 5 Selected' : `${selectedIds.length} of 5 Selected`}
                  </span>
                </div>
              </div>

              {/* Slim Progress Bar */}
              <div className="w-full h-1 bg-[#17130d] rounded-full overflow-hidden border border-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#c5a059] via-[#e5c97b] to-[#c5a059]"
                  initial={{ width: 0 }}
                  animate={{ width: `${(selectedIds.length / 5) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-5 max-w-sm">
              <div className="relative w-full">
                <Search className="w-3.5 h-3.5 text-[#7a7162] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search author, title..."
                  className="w-full bg-[#100d09] border border-[#231d13] focus:border-[#c5a059] rounded-xl pl-8 pr-7 py-2 text-xs text-[#ede8dd] placeholder-[#5a5244] focus:outline-none font-sans"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7a7162] hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Candidates Grid: Clean, mobile friendly cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-24">
              {filteredCandidates.map((candidate) => {
                const isSelected = selectedIds.includes(candidate.id);
                const selectionIndex = selectedIds.indexOf(candidate.id) + 1;
                const isLimitReached = selectedIds.length >= 5 && !isSelected;

                return (
                  <div
                    key={candidate.id}
                    className={`bg-[#0e0c09] rounded-2xl border transition-all duration-200 p-4 sm:p-5 flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#c5a059] shadow-lg shadow-[#c5a059]/15 bg-[#140f09]'
                        : 'border-[#231d13] hover:border-[#382f1f]'
                    }`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#baa47e] bg-[#16120b] border border-[#2b2214] px-2 py-0.5 rounded-md flex items-center gap-1">
                          {candidate.category.includes('Poetry') ? (
                            <Feather className="w-3 h-3 text-[#c5a059]" />
                          ) : (
                            <BookOpen className="w-3 h-3 text-[#c5a059]" />
                          )}
                          <span>{candidate.category}</span>
                        </span>

                        {isSelected ? (
                          <span className="bg-[#c5a059] text-black text-[10px] font-mono font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>Vote #{selectionIndex}</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-[#665e51]">
                            {candidate.theme}
                          </span>
                        )}
                      </div>

                      {/* Piece Title */}
                      <h3
                        onClick={() => setPreviewCandidate(candidate)}
                        className="font-serif text-base sm:text-lg font-normal text-[#fbf7ee] mb-1 leading-snug hover:text-[#c5a059] transition-colors cursor-pointer"
                        title="Click to expand & read in modal"
                      >
                        &ldquo;{candidate.pieceTitle}&rdquo;
                      </h3>

                      {/* Author Name */}
                      <p className="text-xs text-[#baa47e] font-sans mb-2.5">
                        by {candidate.authorName}
                      </p>

                      {/* Excerpt Preview (Clickable to open modal) */}
                      <p
                        onClick={() => setPreviewCandidate(candidate)}
                        className="font-serif italic text-xs text-[#8e8576] leading-relaxed mb-4 line-clamp-3 hover:text-[#c4bdae] transition-colors cursor-pointer"
                        title="Click to expand & read in modal"
                      >
                        &ldquo;{candidate.excerpt}&rdquo;
                      </p>
                    </div>

                    {/* Action Bar on Each Card */}
                    <div className="pt-3 border-t border-[#1a160f] flex items-center gap-2">
                      {/* Expand / Read in Modal Button */}
                      <button
                        type="button"
                        onClick={() => setPreviewCandidate(candidate)}
                        className="w-2/5 py-2 px-2.5 rounded-xl border border-[#2b2214] text-[#8e8576] hover:text-[#ede8dd] hover:bg-[#18130c] hover:border-[#3a3020] transition-colors text-xs flex items-center justify-center gap-1.5 cursor-pointer font-sans"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#baa47e]" />
                        <span>Read</span>
                      </button>

                      {/* Direct Vote Button on Each Card */}
                      <button
                        type="button"
                        disabled={isLimitReached}
                        onClick={() => toggleSelectCandidate(candidate.id)}
                        className={`w-3/5 py-2 px-3 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#c5a059] text-black shadow-md'
                            : isLimitReached
                            ? 'bg-[#14110c] border border-white/5 text-[#5a5244] cursor-not-allowed'
                            : 'bg-[#16120b] border border-[#2b2214] text-[#ede8dd] hover:border-[#c5a059] hover:text-white'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Voted ✓</span>
                          </>
                        ) : isLimitReached ? (
                          <span>Max 5</span>
                        ) : (
                          <span>+ Vote</span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* MOBILE-FIRST COMPACT STICKY BOTTOM BAR */}
            <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#080706]/95 backdrop-blur-xl border-t border-[#231d13] px-4 py-3 shadow-2xl">
              <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
                {/* Left: Selected count and quick indicator */}
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                    selectedIds.length === 5
                      ? 'bg-[#c5a059] text-black shadow-md shadow-[#c5a059]/20'
                      : 'bg-[#18130c] border border-[#2e261a] text-[#baa47e]'
                  }`}>
                    {selectedIds.length}/5
                  </div>
                  <div>
                    <div className="text-xs font-serif text-[#ede8dd] font-medium leading-tight">
                      {selectedIds.length === 5 ? '5 Votes Selected' : `${selectedIds.length} of 5 Selected`}
                    </div>
                    <div className="text-[10px] text-[#7a7162] font-sans">
                      {selectedIds.length === 5 ? 'Ready to submit!' : `Pick ${5 - selectedIds.length} more`}
                    </div>
                  </div>
                </div>

                {/* Right: Submit Button */}
                <button
                  type="button"
                  disabled={selectedIds.length !== 5}
                  onClick={() => setShowConfirmModal(true)}
                  className={`py-2.5 px-4 sm:px-6 rounded-xl font-sans font-semibold text-xs sm:text-sm tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0 ${
                    selectedIds.length === 5
                      ? 'bg-gradient-to-r from-[#c5a059] via-[#e5c97b] to-[#c5a059] hover:brightness-105 text-black shadow-lg shadow-[#c5a059]/20'
                      : 'bg-[#14110c] border border-[#231d13] text-[#5a5244] cursor-not-allowed'
                  }`}
                >
                  <Trophy className="w-3.5 h-3.5" />
                  <span>{selectedIds.length === 5 ? 'Submit 5 Votes' : `Select 5 to Submit`}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* STEP 3: THANK YOU SCREEN (MINIMAL & CLEAN)                      */}
        {/* ============================================================== */}
        {step === 'already_voted' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center py-16 px-4"
          >
            <div className="w-16 h-16 rounded-full bg-[#18130c] border border-[#c5a059] mx-auto flex items-center justify-center shadow-lg shadow-[#c5a059]/20 mb-5">
              <CheckCircle2 className="w-8 h-8 text-[#c5a059]" />
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#fbf7ee] mb-2 font-normal">
              Thank You!
            </h1>

            <p className="text-base text-[#baa47e] font-medium mb-3">
              Your vote has been casted.
            </p>

            <p className="text-xs text-[#8e8576] max-w-xs mx-auto leading-relaxed">
              Thank you for supporting India&apos;s finest writers and poets in the People&apos;s Choice Award 2026.
            </p>
          </motion.div>
        )}

      </main>

      {/* ============================================================== */}
      {/* EXPANDED READING MODAL (When reader clicks to read full piece) */}
      {/* ============================================================== */}
      <AnimatePresence>
        {previewCandidate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-[#100d09] border border-[#2e261a] rounded-2xl max-w-2xl w-full max-h-[88vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-5 sm:p-6 border-b border-[#231d13] flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#baa47e] block mb-1">
                    {previewCandidate.category} • {previewCandidate.theme}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#fbf7ee]">
                    &ldquo;{previewCandidate.pieceTitle}&rdquo;
                  </h3>
                  <p className="text-xs text-[#8e8576] mt-1">
                    by <span className="text-[#ede8dd] font-medium">{previewCandidate.authorName}</span>
                  </p>
                </div>
                <button
                  onClick={() => setPreviewCandidate(null)}
                  className="p-2 rounded-lg text-[#7a7162] hover:text-white hover:bg-white/5 cursor-pointer shrink-0"
                  title="Close Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-sm text-[#c4bdae] leading-relaxed font-serif">
                {previewCandidate.authorBio && (
                  <div className="bg-[#0a0806] border border-[#1e1911] rounded-xl p-3.5 text-xs text-[#8e8576] font-sans">
                    <span className="font-semibold text-[#baa47e]">Author Bio: </span>
                    {previewCandidate.authorBio}
                  </div>
                )}

                <div className="bg-[#0a0806] p-5 rounded-xl border border-white/5 whitespace-pre-line text-sm sm:text-base text-[#ede8dd] leading-relaxed">
                  {previewCandidate.fullContent || previewCandidate.excerpt}
                </div>
              </div>

              {/* Modal Footer: Close + Vote Option right in the modal */}
              <div className="p-4 sm:p-5 border-t border-[#231d13] flex items-center justify-between bg-[#0c0a07]">
                <button
                  type="button"
                  onClick={() => setPreviewCandidate(null)}
                  className="text-xs text-[#7a7162] hover:text-white px-4 py-2 cursor-pointer font-sans"
                >
                  Close
                </button>

                {step === 'ballot' && (
                  <button
                    type="button"
                    disabled={selectedIds.length >= 5 && !selectedIds.includes(previewCandidate.id)}
                    onClick={() => {
                      toggleSelectCandidate(previewCandidate.id);
                    }}
                    className={`py-2.5 px-5 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedIds.includes(previewCandidate.id)
                        ? 'bg-[#c5a059] text-black shadow-md'
                        : selectedIds.length >= 5
                        ? 'bg-[#18130c] text-[#5a5244] cursor-not-allowed border border-white/5'
                        : 'bg-gradient-to-r from-[#c5a059] via-[#e5c97b] to-[#c5a059] text-black hover:brightness-105 shadow-md'
                    }`}
                  >
                    {selectedIds.includes(previewCandidate.id) ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Selected (Vote #{selectedIds.indexOf(previewCandidate.id) + 1}) • Remove</span>
                      </>
                    ) : selectedIds.length >= 5 ? (
                      <span>5/5 Selected (Max Limit)</span>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>+ Vote for this Entry</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* FINAL CONFIRMATION MODAL                                       */}
      {/* ============================================================== */}
      <AnimatePresence>
        {showConfirmModal && activeVoter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-[#100d09] border border-[#2e261a] rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowConfirmModal(false)}
                className="absolute top-5 right-5 text-[#7a7162] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#18130c] border border-[#c5a059] flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-[#c5a059]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-normal text-[#fbf7ee]">
                    Confirm &amp; Seal Your 5 Votes
                  </h3>
                  <p className="text-xs text-[#8e8576]">
                    Voting as {activeVoter.name} (+91 {activeVoter.phone})
                  </p>
                </div>
              </div>

              {submitError && (
                <div className="mb-4 bg-red-950/30 border border-red-800/40 rounded-xl p-3 text-xs text-red-200 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Summary of 5 Chosen Candidates */}
              <div className="bg-[#0a0806] border border-[#1e1911] rounded-xl p-3.5 mb-5 space-y-2 max-h-56 overflow-y-auto">
                <span className="text-[10px] font-mono text-[#baa47e] uppercase tracking-wider block mb-1">
                  Your 5 Selected Nominees:
                </span>
                {selectedCandidates.map((c, i) => (
                  <div key={c.id} className="text-xs flex items-center justify-between text-[#c4bdae] py-1 border-b border-white/5 last:border-0 font-sans">
                    <span className="font-serif truncate max-w-[220px]">
                      <span className="text-[#c5a059] font-mono font-bold mr-1.5">#{i + 1}</span> &ldquo;{c.pieceTitle}&rdquo;
                    </span>
                    <span className="text-[#8e8576] text-[11px] truncate max-w-[120px]">
                      {c.authorName}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-[#8e8576] font-sans mb-5 leading-relaxed">
                Once submitted, your 5 votes will be cast and cannot be changed.
              </p>

              <div className="flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs text-[#8e8576] hover:text-white transition-colors cursor-pointer font-sans"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleFinalSubmit}
                  className="bg-gradient-to-r from-[#c5a059] via-[#e5c97b] to-[#c5a059] hover:brightness-105 text-black font-sans font-semibold text-xs py-2.5 px-5 rounded-xl tracking-wide flex items-center gap-1.5 cursor-pointer disabled:opacity-60 shadow-lg shadow-[#c5a059]/10"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Submit 5 Votes</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
