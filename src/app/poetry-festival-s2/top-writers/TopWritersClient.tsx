'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Search, AlertCircle, ArrowUp, User, Trophy, Award,
  X, Download, FileText, Loader2, BookOpen, ChevronRight, Eye
} from 'lucide-react';
import Link from 'next/link';

const AUTHORS = [
  "Gayathri Nair C",
  "Pen name - Mamnoon",
  "Monalisa Biswal",
  "SWARUP GHOSH",
  "Salman Tamimi",
  "Shubham Pandey Radhey",
  "Karthik sadagopal",
  "Ramanpreet",
  "Sheetal Sanghvi",
  "Anjana Ragunath",
  "Udit pratap singh",
  "NinjaMenon",
  "Prachala Anupmeya",
  "Bhargavi Sonowal Kouli",
  "Ankita Kakati",
  "Narahari Rao Bapuram",
  "Dr. Tushar Amankar",
  "Dr. Tushar mankar",
  "Harshdeep singh",
  "Vanya Singh Jauhar",
  "The New Era",
  "Priyami Dutta",
  "Rashi Suhasaria",
  "Lokesh Goenka",
  "Ribon Teronpi",
  "Chandra Prakash Yadav",
  "Deependra Vashishtha",
  "GS Chandrashekhar",
  "Adeela Jawaid",
  "Sejal C.",
  "Ridhima Bhagawati",
  "Jump Start Your Heart",
  "Debasish Mahapatra",
  "Sushil Kumar Rana",
  "HENSI CHELANI",
  "Moumita",
  "Dharmesh Parmar",
  "Akshay Khare",
  "Utsab Dey",
  "Surekha Anandraya Bhat",
  "Ashish Changavalli",
  "chetna choudhary",
  "Vinamra Pawar",
  "Kirtika",
  "RAVIKANT VISHWANATH KHADSE",
  "Meenakshi",
  "Ashok Bhandari",
  "Swati Sharma",
  "SANJAY DANGE",
  "Anil Gokhale",
  "Sumegha S",
  "Rafat naseer",
  "Jia modha",
  "Dr Deepak Tak",
  "kumkum saxena",
  "Azra Azad",
  "ਹਰਮਨਪ੍ਰੀ ਤ ਕੌਰ",
  "Dr Mohan Shende",
  "Mrutyunjay Dash",
  "Deepali Singhal",
  "Pragya Narayan",
  "YAJUSH DUBEY",
  "Shalu parveen",
  "Roohani Sharma",
  "Rupesh Mahotra",
  "Nishtha Mishra",
  "PRIYANKA DARGI",
  "EShruti Gokhale",
  "Samriddhi",
  "Kalkhi heenal",
  "Prachi Dhawan",
  "Vaishali saxena",
  "Pooja Soni",
  "Mehek Naskar",
  "FATHIMA A",
  "M Shiva Kumar",
  "Asmita Mishra",
  "Pranshu",
  "Subasini mohanty",
  "Srishti Kumari",
  "Sreetija Choudhury",
  "Arshiya",
  "arshpreet kaur",
  "Naqiyah Jariwala",
  "Gargi Kulkarni",
  "Shahnawaz Salmani",
  "Anchal Trivedi",
  "Ananya Narang",
  "Shauryam Rawat",
  "V Poojitha",
  "Geetha Haridas",
  "Nikita Pathak Jog",
  "Jyotee Dokhale",
  "Dr. Infini Lionne",
  "Aswin A",
  "Nivisha",
  "Akshay Udaykumar Jangam",
  "Dr. Mervyn Abreo",
  "Mahima Mittal Gupta",
  "Agni (Selva Mahalakshmi)",
  "Deeksha Mehta",
  "Pathan Kiswakhan",
  "Devananda V",
  "Samar Nayak",
  "Fasiha Khan",
  "Aleena Kashif",
  "इम्ति या ज़ संजी दा",
  "Debangana Bhattacharjee",
  "Punya Prasun Dash",
  "Sumayya.P.M",
  "Dr.ANAPARTHI RAMA MOHANA RAO",
  "Salil Bahl",
  "Arjumand Bint Wahaj",
  "Pratiti Bhadra",
  "Aditi Kadam",
  "Srijita Bhattacharyya",
  "Amandeep Kaur",
  "Sasanka Satapathy",
  "Shibi A R",
  "Wasaka bari shah",
  "Hemant Prasad",
  "Kartik Raina",
  "Dr. Biplab Chowdhury",
  "M Blessy Aquila",
  "Deebikaa.E",
  "Debashis Bhattacharyya",
  "RAHUL BHUJEL",
  "Gopinath S Iyengar",
  "Sree Bindu.R.S",
  "Gargi Sidana",
  "Wangshak",
  "Upadhayayula Krishna Sanjana",
  "Beetroot",
  "Clint climaco colaco",
  "Lakshmi Supriya",
  "Dr. Ekta Priya",
  "Archana Anil Patil/Girija",
  "Kaviya Karthikeyan",
  "VIVEK ARPOYIL",
  "DR. SUDEVI BASU",
  "Deepika Rawal",
  "Aizah Khan",
  "Sanjukta Guha",
  "Aarna Khivasara",
  "Siddhi Singh",
  "Alina Shaikh",
  "Mohammed Mukarram",
  "Dharmik Mehta",
  "Dr.B.Ps.Toi",
  "Dr. Aditya Verma",
  "Aritra Banerjee",
  "Mohammed Adil",
  "Smitha krishna",
  "Dr D Wilfin John",
  "K.BHUVANEESHWARI/SRIKO",
  "Harleen sethi",
  "L Leema Daphne",
  "Dilnaz. J",
  "Truce",
  "Zunera Asad",
  "Nabanita Roy",
  "REMADEVI RAJESH",
  "Preetha T",
  "Kekhuleto Viswentso",
  "Asim Baadshah",
  "डॉ अनुरा ग शर्मा",
  "Piya Poppy Rathbone",
  "Manjistha Pathak",
  "Mayur Parashar",
  "Raghav Keer",
  "shashank tripathi (RAHI)",
  "Kumar Shekhar",
  "Himanshi Priyani",
  "Rahul Kulkarni",
  "Bincy Babu",
  "Ananya Narang",
  "JOYDEV MURMU",
  "Ishi Kakkar",
  "Prabha Tiwari",
  "Mauli Agrawal",
  "Pragya B",
  "Kalindi Singh",
  "Domya Kaur",
  "Rasika S",
  "UpaSana Mitra",
  "Lavanya Jalan",
  "Purnasha Paul",
  "Adhiyan",
  "Dr Akshara T",
  "Debadrita Mukherjee",
  "Amritha Jain",
  "K. BHUVANEESHWARI/SRIKO",
  "Somanathan",
  "Kartik Kulkarni",
  "Ayush Kartik/Aoi Raikage",
  "Prachi Dhawan",
  "Sheetal Sanghvi",
  "Mrutyunjay Dash",
  "Deepali Singhal",
  "Utsab Dey",
  "Divya Kumawat",
  "Swara Moharkar",
  "Vijay Pratap",
  "Amita Saxena",
  "Himanshi Priyani",
  "Mitali Saikia",
  "Lavanya",
];

interface Poem {
  id: string;
  title: string;
  authorName: string;
  poemNumber: number;
  wordCount: number;
  plainText: string;
  submittedAt: string;
}

interface PoemModalProps {
  authorName: string;
  onClose: () => void;
}

/* ─── POEM MODAL ──────────────────────────────────────────── */
function PoemModal({ authorName, onClose }: PoemModalProps) {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activePoem, setActivePoem] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Keyboard: Escape to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Fetch poems from API
  useEffect(() => {
    const fetchPoems = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/poetry-festival-s2/poems-by-name?name=${encodeURIComponent(authorName)}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch');
        setPoems(data.poems || []);
      } catch (err: any) {
        setError(err.message || 'Could not load poems');
      } finally {
        setLoading(false);
      }
    };
    fetchPoems();
  }, [authorName]);

  // Generate markdown string for a poem
  const buildMarkdown = (poem: Poem): string => {
    const dateStr = poem.submittedAt
      ? new Date(poem.submittedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
      : '';
    return [
      `# ${poem.title}`,
      ``,
      `*by ${poem.authorName}*`,
      ``,
      dateStr ? `*Submitted: ${dateStr}*` : '',
      dateStr ? `` : '',
      `---`,
      ``,
      poem.plainText,
      ``,
      `---`,
      ``,
      `*Poetry Festival Season 2 — Hall of Fame Top 200*`,
      `*Published by Inkfetish Publications*`,
    ].filter(line => line !== null).join('\n');
  };

  // Download markdown file
  const handleDownload = (poem: Poem) => {
    const md = buildMarkdown(poem);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safeName = poem.authorName.replace(/[^a-z0-9]/gi, '_');
    const safeTitle = poem.title.replace(/[^a-z0-9]/gi, '_');
    a.download = `${safeName}_${safeTitle}_PFS2.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Download ALL poems as one combined markdown
  const handleDownloadAll = () => {
    const combined = poems.map((poem, idx) => {
      const md = buildMarkdown(poem);
      return idx > 0 ? `\n\n---\n\n${md}` : md;
    }).join('');
    const blob = new Blob([combined], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safeName = authorName.replace(/[^a-z0-9]/gi, '_');
    a.download = `${safeName}_PFS2_Poems.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentPoem = poems[activePoem];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#0a0908] border border-gold/20 rounded-xl shadow-[0_30px_80px_rgba(0,0,0,0.9)] overflow-hidden">

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-gold" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold/70">Poetry Festival S2 — Hall of Fame</p>
              <h2 className="text-sm font-bold text-white tracking-wide">{authorName}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#555] hover:text-white transition-colors p-1 rounded-md hover:bg-white/5"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-8 h-8 text-gold animate-spin" />
              <p className="text-xs font-mono uppercase tracking-widest text-[#555]">Fetching submitted poems...</p>
            </div>
          )}

          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-20 gap-3 px-6">
              <AlertCircle className="w-8 h-8 text-red-400/70" />
              <p className="text-xs text-center text-[#666] font-mono">{error}</p>
            </div>
          )}

          {!loading && !error && poems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 gap-3 px-8 text-center">
              <FileText className="w-10 h-10 text-[#222]" />
              <p className="text-sm font-serif text-[#555] italic">No submitted poems found for this writer.</p>
              <p className="text-[11px] text-[#444] font-mono">Their submission may have been recorded under a different name or they may not have submitted yet.</p>
            </div>
          )}

          {!loading && !error && poems.length > 0 && (
            <div className="flex flex-col">

              {/* Poem Tabs (if 2 poems) */}
              {poems.length > 1 && (
                <div className="flex border-b border-white/5 shrink-0">
                  {poems.map((poem, idx) => (
                    <button
                      key={poem.id}
                      onClick={() => setActivePoem(idx)}
                      className={`flex-1 py-3 px-4 text-[11px] font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                        activePoem === idx
                          ? 'text-gold border-b-2 border-gold bg-gold/5'
                          : 'text-[#555] hover:text-[#888] hover:bg-white/3'
                      }`}
                    >
                      <FileText className="w-3 h-3" />
                      Poem {idx + 1}
                      {activePoem === idx && <ChevronRight className="w-3 h-3" />}
                    </button>
                  ))}
                </div>
              )}

              {/* Poem Content */}
              {currentPoem && (
                <div className="p-6">
                  {/* Poem Title */}
                  <div className="mb-6">
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-white leading-snug mb-2">
                      {currentPoem.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-[#555]">
                      <span className="text-gold/60">{currentPoem.wordCount} words</span>
                      <span>•</span>
                      <span>Poem {currentPoem.poemNumber}</span>
                      {currentPoem.submittedAt && (
                        <>
                          <span>•</span>
                          <span>
                            {new Date(currentPoem.submittedAt).toLocaleDateString('en-IN', {
                              day: 'numeric', month: 'short', year: 'numeric'
                            })}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-12 h-px bg-gold/30 mb-6" />

                  {/* Poem Body — Markdown-style rendering */}
                  <div className="font-serif text-[15px] leading-loose text-[#ddd] whitespace-pre-wrap tracking-wide poem-body">
                    {currentPoem.plainText}
                  </div>

                  {/* Bottom metadata */}
                  <div className="mt-8 pt-6 border-t border-white/5">
                    <p className="text-[10px] font-mono text-[#444] uppercase tracking-[0.2em]">
                      Poetry Festival Season 2 — Hall of Fame Top 200 · Inkfetish Publications
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {!loading && !error && poems.length > 0 && currentPoem && (
          <div className="border-t border-white/5 p-4 shrink-0 bg-[#060605]">
            <div className="flex items-center gap-3">
              {/* Download current poem */}
              <button
                onClick={() => handleDownload(currentPoem)}
                className="flex-1 flex items-center justify-center gap-2 bg-[#111] hover:bg-[#181818] border border-white/8 hover:border-gold/30 text-white text-[11px] font-mono uppercase tracking-widest py-2.5 px-4 rounded-md transition-all"
              >
                <Download className="w-3.5 h-3.5 text-gold" />
                Download Poem {currentPoem.poemNumber} (.md)
              </button>

              {/* Download all if 2 poems */}
              {poems.length > 1 && (
                <button
                  onClick={handleDownloadAll}
                  className="flex items-center justify-center gap-2 bg-gold hover:bg-[#cda640] text-black text-[11px] font-mono font-bold uppercase tracking-widest py-2.5 px-4 rounded-md transition-all whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5" />
                  All Poems
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ───────────────────────────────────────────── */
export default function TopWritersClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [bulkDownloading, setBulkDownloading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);

  // Bulk download all poems as one .md file
  const handleBulkDownload = async () => {
    setBulkDownloading(true);
    try {
      const res = await fetch('/api/poetry-festival-s2/export-all-poems');
      if (!res.ok) throw new Error('Export failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'PFS2_Hall_of_Fame_All_Poems.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Bulk download error:', err);
      alert('Download failed. Please try again.');
    } finally {
      setBulkDownloading(false);
    }
  };

  // Filter list
  const filteredAuthors = AUTHORS.filter(name =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Deduplicate for display (some appear twice due to double-plan)
  const displayAuthors = filteredAuthors.filter(
    (name, idx, arr) => arr.findIndex(n => n.toLowerCase() === name.toLowerCase()) === idx
  );

  // Monitor scroll for "back to top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to extract initials for placeholder monograms
  const getInitials = (name: string) => {
    const cleanName = name.replace(/^(Dr\.|Pen name -|Advocate)\s+/i, '').trim();
    const parts = cleanName.split(/[\s/_()]+/);
    const initials = parts
      .filter(p => p.length > 0)
      .map(p => p[0].toUpperCase())
      .slice(0, 2)
      .join('');
    return initials || 'PF';
  };

  const openPoems = useCallback((name: string) => {
    setSelectedAuthor(name);
  }, []);

  const closePoems = useCallback(() => {
    setSelectedAuthor(null);
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-[#eee] font-sans antialiased relative overflow-hidden py-16 px-4 md:px-8">
      {/* Decorative background spotlights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b from-gold/5 via-transparent to-transparent blur-[100px] pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-gold/5 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Navigation / Back to main site link */}
        <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-4">
          <Link
            href="/poetry-festival-s2"
            className="text-xs uppercase tracking-widest text-[#888] hover:text-gold transition-colors font-mono"
          >
            ← Back to Festival Page
          </Link>
          <span className="text-[10px] tracking-[0.25em] uppercase text-gold font-bold font-mono bg-[#1a1510] border border-gold/15 py-1 px-3.5 rounded-full select-none">
            Inkfetish publications
          </span>
        </div>

        {/* Hero Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-1.5 mb-3 text-gold">
            <Trophy className="w-5 h-5 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.3em] font-bold">Official Recognition</span>
            <Trophy className="w-5 h-5 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-black uppercase tracking-wider text-white mb-4">
            Top Writers Showcase
          </h1>
          <p className="text-sm md:text-base text-gold font-serif italic mb-8 max-w-xl mx-auto">
            Poetry Festival Season 2
          </p>

          {/* Bulk Download Button */}
          <div className="mb-6">
            <button
              onClick={handleBulkDownload}
              disabled={bulkDownloading}
              className="inline-flex items-center gap-2.5 bg-gold hover:bg-[#cda640] disabled:bg-gold/50 text-black font-black uppercase tracking-widest text-xs py-3 px-8 rounded-sm transition-all shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:scale-100"
            >
              {bulkDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Preparing Download...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download All Poems (.md)
                </>
              )}
            </button>
            <p className="text-[10px] font-mono text-[#555] mt-2 uppercase tracking-widest">
              All {AUTHORS.length}+ submitted poems in one Markdown file
            </p>
          </div>

          {/* Clickable hint banner */}
          <div className="max-w-xl mx-auto mb-6 bg-[#0f0f0a] border border-gold/15 px-4 py-2.5 rounded-sm flex items-center justify-center gap-2">
            <Eye className="w-3.5 h-3.5 text-gold" />
            <p className="text-[11px] font-mono uppercase tracking-widest text-[#777]">
              Click any writer card to read & download their submitted poem(s) as Markdown
            </p>
          </div>

          {/* CRITICAL: Non-ranked Disclaimer Banner */}
          <div className="max-w-2xl mx-auto bg-[#181410] border border-gold/20 p-4 rounded-sm text-left flex gap-3.5 items-start shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-gold" />
            <AlertCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs uppercase tracking-widest text-gold font-bold font-mono">
                Official Disclaimer: Non-Ranked Showcase
              </h4>
              <p className="text-xs text-white/70 leading-relaxed">
                This directory is presented in <strong>no particular order</strong> of ranking or scores. All featured writers have demonstrated exceptional literary merit, emotional depth, and outstanding craft during Poetry Festival Season 2.
              </p>
            </div>
          </div>
        </div>

        {/* Search & Statistics Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 p-4 rounded-sm mb-10 sticky top-4 z-40 shadow-xl">
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-[#444] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search writers by name..."
              className="w-full bg-[#121212] border border-white/10 rounded-sm py-2 pl-10 pr-4 text-xs text-white placeholder-[#444] focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all font-mono"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2 text-xs text-[#555] hover:text-white font-mono"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Stats */}
          <div className="flex gap-6 text-[10px] uppercase font-mono tracking-wider text-[#666] select-none">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-gold" />
              <span>Total Honorees: <strong className="text-white font-bold">{displayAuthors.length}</strong></span>
            </div>
            {searchTerm && (
              <div className="flex items-center gap-1.5 bg-gold/10 px-2 py-0.5 rounded-sm border border-gold/20">
                <span className="text-gold">Matches: <strong>{displayAuthors.length}</strong></span>
              </div>
            )}
          </div>
        </div>

        {/* Writers Grid Container */}
        {displayAuthors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayAuthors.map((name, index) => (
              <button
                key={`${name}-${index}`}
                onClick={() => openPoems(name)}
                className="bg-[#0a0a0a] border border-white/5 p-4 rounded-sm hover:border-gold/40 hover:shadow-[0_0_20px_rgba(212,175,55,0.08)] transition-all duration-300 flex items-center gap-3.5 group relative overflow-hidden text-left cursor-pointer w-full active:scale-[0.98]"
              >
                {/* Thin gold side line active on hover */}
                <div className="absolute top-0 left-0 w-0.5 h-full bg-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />

                {/* Monogram / Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#181410] to-[#121212] border border-gold/15 flex items-center justify-center shrink-0 group-hover:border-gold/45 transition-colors select-none font-mono">
                  <span className="text-[11px] font-bold text-gold/80 group-hover:text-gold transition-colors tracking-wide">
                    {getInitials(name)}
                  </span>
                </div>

                {/* Name Info */}
                <div className="overflow-hidden space-y-0.5 flex-1">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider group-hover:text-gold transition-colors truncate">
                    {name}
                  </h3>
                  <div className="flex items-center gap-1 text-[9px] text-[#555] uppercase tracking-widest font-mono">
                    <Award className="w-2.5 h-2.5 text-[#333] group-hover:text-gold/40 transition-colors" />
                    <span>Honored Poet</span>
                  </div>
                </div>

                {/* Read icon */}
                <Eye className="w-3.5 h-3.5 text-[#333] group-hover:text-gold/60 transition-colors shrink-0" />
              </button>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-[#0a0a0a] border border-white/5 rounded-sm">
            <Award className="w-10 h-10 text-[#222] mx-auto mb-3" />
            <p className="text-xs uppercase tracking-widest text-[#444] font-mono mb-2">No Writers Match Your Search</p>
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs text-gold hover:underline font-mono uppercase tracking-widest"
            >
              Reset Search Filter
            </button>
          </div>
        )}

        {/* Branded Footer Badge */}
        <div className="mt-20 border-t border-white/5 pt-12 text-center pb-8">
          <div className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] font-mono text-[#555] select-none">
            <span>Inkfetish Publications</span>
            <span className="text-gold">•</span>
            <span>Est. 2020</span>
          </div>
        </div>

      </div>

      {/* Floating Scroll to Top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-[#0d0d0d] border border-gold/30 hover:border-gold hover:shadow-[0_0_15px_rgba(212,175,55,0.25)] text-gold p-2.5 rounded-sm transition-all duration-300"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Poem Modal */}
      {selectedAuthor && (
        <PoemModal
          authorName={selectedAuthor}
          onClose={closePoems}
        />
      )}
    </main>
  );
}
