'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, Download, Share2, 
  Sparkles, Home, ShieldCheck, FileText, PenTool
} from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function ThankYouClient() {
  const searchParams = useSearchParams();
  const rawName = searchParams.get('name') || 'Honored Nominee';
  const email = searchParams.get('email') || 'registered@email.com';
  const category = searchParams.get('category') || 'Writer / Poet';
  const plan = searchParams.get('plan') || '699';
  const orderId = searchParams.get('order_id') || `pca_${Date.now().toString(36)}`;

  const [isDownloading, setIsDownloading] = useState(false);
  const slipRef = useRef<HTMLDivElement>(null);

  const formattedDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Trigger celebration confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 400);
    } catch (e) {
      console.error('Confetti error:', e);
    }
  }, []);

  const handleDownloadPDF = async () => {
    if (!slipRef.current) return;
    setIsDownloading(true);

    try {
      const canvas = await html2canvas(slipRef.current, {
        scale: 3, // 3x high resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#0b0804',
        logging: false
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      const safeName = rawName.replace(/[^a-zA-Z0-9]/g, '_');
      pdf.save(`Peoples_Choice_Registration_Slip_${safeName}.pdf`);
    } catch (err) {
      console.error('Error generating Registration Slip PDF:', err);
      alert('Could not auto-download PDF. Please try again or take a screenshot of your registration slip.');
    } finally {
      setIsDownloading(false);
    }
  };

  const shareText = encodeURIComponent(
    `🏆 My registration for the People's Choice Award 2026 by Inkfetish Publication is confirmed! Nomination ID: ${orderId} ✦ https://www.inkfetish.in/people-choice-award`
  );

  return (
    <div className="min-h-screen bg-[#070605] text-[#f5f0e1] font-sans selection:bg-[#d4af37] selection:text-black relative overflow-x-hidden pb-16">
      
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[15%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,#aa771c_0%,transparent_70%)] opacity-20 blur-[100px] animate-pulse" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,#d4af37_0%,transparent_70%)] opacity-15 blur-[120px] animate-pulse" />
      </div>

      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 bg-[#070605]/85 backdrop-blur-md border-b border-[#d4af37]/20 py-2 px-4 shadow-lg shadow-black/40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/people-choice-award" className="flex items-center gap-3">
            <img 
              src="/images/inkfetish_logo.png" 
              alt="Inkfetish Publication" 
              className="w-8 h-8 rounded-full object-cover border border-[#d4af37]/30 shadow-[0_0_10px_rgba(212,175,55,0.3)]"
            />
            <span className="font-serif text-sm font-semibold tracking-wider text-[#f3e5ab]">
              Inkfetish Publication
            </span>
          </Link>
          <span className="text-xs bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#f3e5ab] px-3 py-1 rounded-full font-serif uppercase tracking-wider">
            Registration Confirmed
          </span>
        </div>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-16">
        
        {/* --- VICTORY HEADER BANNER --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 space-y-3"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#bf953f] to-[#aa771c] p-0.5 mx-auto shadow-[0_0_30px_rgba(212,175,55,0.4)]">
            <div className="w-full h-full rounded-full bg-[#120f0a] flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9 text-[#d4af37]" />
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c]">
            Registration Successful!
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto font-light">
            Thank you for registering for the <strong>People's Choice Award 2026</strong>. Download your official registration slip below.
          </p>
        </motion.div>

        {/* --- SUBMIT ENTRY CTA (FIRST & BIG) --- */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-10"
        >
          <div className="relative bg-gradient-to-br from-[#1e160a] via-[#120f0a] to-[#1e160a] border-2 border-[#d4af37]/70 rounded-3xl p-8 sm:p-12 shadow-[0_0_60px_rgba(212,175,55,0.25)] overflow-hidden">
            {/* Glow blobs */}
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-[#aa771c]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 text-center space-y-5">
              {/* Step badge */}
              <div className="inline-flex items-center gap-2 bg-[#d4af37]/15 border border-[#d4af37]/50 px-4 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
                <span className="text-[11px] font-serif font-bold uppercase tracking-[0.25em] text-[#f3e5ab]">Your Next Step</span>
              </div>

              {/* Headline */}
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] leading-tight">
                  Submit Your Entry Now
                </h2>
                <p className="mt-3 text-sm sm:text-base text-gray-300 max-w-xl mx-auto font-light leading-relaxed">
                  Your registration is confirmed! Submit your poem, short story, or novel excerpt to enter the reader voting stage. Deadline: <strong className="text-[#f3e5ab]">1st October 2026</strong>.
                </p>
              </div>

              {/* What you can submit */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-left">
                {[
                  { icon: '✍️', label: 'Poetry / Shayari', sub: 'Up to 150 lines' },
                  { icon: '📖', label: 'Short Story', sub: 'Up to 3,000 words' },
                  { icon: '📝', label: 'Novel Excerpt', sub: 'Up to 2,000 words' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <div className="text-xs font-bold text-[#f3e5ab] font-serif">{item.label}</div>
                      <div className="text-[10px] text-gray-500">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Big CTA button */}
              <Link
                href={`/people-choice-award/submit?nomination_id=${orderId}&name=${encodeURIComponent(rawName)}`}
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] text-black font-bold text-base sm:text-lg px-10 py-5 rounded-2xl shadow-[0_6px_30px_rgba(212,175,55,0.45)] uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer w-full sm:w-auto"
              >
                <PenTool className="w-5 h-5" />
                <span>Submit My Entry →</span>
              </Link>

              <p className="text-[11px] text-gray-500">
                Nomination ID: <span className="font-mono text-[#d4af37]/70">{orderId}</span>
              </p>
            </div>
          </div>
        </motion.section>

        {/* --- OFFICIAL REGISTRATION SLIP SECTION --- */}
        <section className="space-y-6">
          <div className="text-center space-y-1">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-serif">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span>Official Verification Document</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Official Registration Slip 📄
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto">
              This slip serves as your official proof of entry for the People's Choice Award 2026. Click below to download as PDF.
            </p>
          </div>

          {/* --- THE REGISTRATION SLIP DOCUMENT CARD --- */}
          <div className="flex justify-center my-6">
            <div 
              ref={slipRef}
              id="registration-slip"
              className="w-full max-w-[550px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1c1409] via-[#0b0804] to-[#040302] border-[5px] border-[#d4af37] rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between shadow-[0_0_70px_rgba(212,175,55,0.4)] selection:bg-transparent text-left"
            >
              {/* Inner Decorative Hairline Frame */}
              <div className="absolute inset-3 border border-[#d4af37]/35 rounded-2xl pointer-events-none" />

              {/* Inset Gold Corner Flourishes */}
              <div className="absolute top-5 left-5 w-4 h-4 border-t-2 border-l-2 border-[#f3e5ab] pointer-events-none" />
              <div className="absolute top-5 right-5 w-4 h-4 border-t-2 border-r-2 border-[#f3e5ab] pointer-events-none" />
              <div className="absolute bottom-5 left-5 w-4 h-4 border-b-2 border-l-2 border-[#f3e5ab] pointer-events-none" />
              <div className="absolute bottom-5 right-5 w-4 h-4 border-b-2 border-r-2 border-[#f3e5ab] pointer-events-none" />

              {/* SLIP HEADER */}
              <div className="text-center border-b border-[#d4af37]/35 pb-4 mb-5 relative z-10">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-b from-[#d4af37] to-[#aa771c] p-0.5 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                  <img 
                    src="/images/inkfetish_logo.png" 
                    alt="Inkfetish Logo" 
                    crossOrigin="anonymous"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <h3 className="font-serif text-sm font-bold tracking-[0.3em] text-[#f3e5ab] uppercase">
                  Inkfetish Publication
                </h3>
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-serif font-semibold mt-0.5">
                  PEOPLE'S CHOICE AWARD 2026
                </div>
                <div className="mt-3 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] text-black font-serif font-black text-xs uppercase tracking-[0.25em] py-1.5 px-4 rounded-full inline-block shadow">
                  OFFICIAL REGISTRATION SLIP
                </div>
              </div>

              {/* NOMINEE DETAILS TABLE */}
              <div className="space-y-3 relative z-10 my-2">
                <div className="grid grid-cols-2 gap-3 bg-black/60 border border-[#d4af37]/30 rounded-xl p-3.5 text-xs">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Candidate Name</span>
                    <span className="font-serif font-bold text-[#fff8dc] text-sm sm:text-base block truncate uppercase mt-0.5">
                      {rawName}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Registration Status</span>
                    <span className="font-bold text-green-400 text-xs flex items-center gap-1.5 mt-1">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> VERIFIED ENTRY
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 bg-black/40 border border-white/10 rounded-xl p-3 text-xs">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Email Address</span>
                    <span className="font-mono text-gray-200 text-xs truncate block mt-0.5">{email || 'Not provided'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Nomination Category</span>
                    <span className="font-serif font-bold text-[#f3e5ab] text-xs capitalize mt-0.5 block">{category}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 bg-black/40 border border-white/10 rounded-xl p-3 text-xs">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Entry Plan Package</span>
                    <span className="font-serif font-bold text-[#fcf6ba] text-xs block mt-0.5">
                      ₹{plan || '449'} (Official Entry Plan)
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Registration ID</span>
                    <span className="font-mono text-[#f3e5ab] text-xs truncate block mt-0.5">{orderId}</span>
                  </div>
                </div>

                <div className="bg-black/30 border border-white/5 rounded-xl p-2.5 text-center">
                  <span className="text-[9px] text-gray-400 uppercase tracking-widest block">Issue Date</span>
                  <span className="font-serif text-xs text-gray-300 font-medium">{formattedDate}</span>
                </div>
              </div>

              {/* OFFICIAL EVENT INSTRUCTIONS */}
              <div className="mt-4 pt-3 border-t border-[#d4af37]/30 relative z-10 space-y-2 text-xs">
                <div className="font-serif text-[10px] font-bold tracking-widest text-[#d4af37] uppercase text-center">
                  ✦ OFFICIAL PARTICIPANT INSTRUCTIONS ✦
                </div>
                <ul className="space-y-1.5 text-[11px] text-gray-300 leading-snug list-disc pl-4 font-light">
                  <li>
                    <strong>Manuscript Submission:</strong> Please submit your poem or story before the deadline on <strong>1st October 2026</strong>.
                  </li>
                  <li>
                    <strong>Reader Voting:</strong> Voting takes place 5th–8th October across 2,10,000+ verified readers.
                  </li>
                  <li>
                    <strong>Laureate Awards:</strong> Top 20 winners will be honored with physical trophies, certificates, and traditional publication deals.
                  </li>
                </ul>
              </div>

              {/* FOOTER & SEAL */}
              <div className="mt-5 pt-3 border-t border-[#d4af37]/40 relative z-10 flex items-center justify-between">
                <div>
                  <span className="text-[8px] uppercase tracking-widest text-gray-400 block">Issued By Authority</span>
                  <span className="font-serif text-[10px] font-bold text-[#f3e5ab] uppercase block">Inkfetish Publication</span>
                  <span className="text-[8px] font-mono text-gray-500 block">www.inkfetish.in</span>
                </div>
                <div className="text-right">
                  <div className="w-10 h-10 rounded-full border border-[#d4af37] bg-gradient-to-br from-[#d4af37]/30 to-black flex items-center justify-center text-[8px] font-bold text-[#fcf6ba] uppercase text-center p-1 leading-none shadow">
                    SEAL 2026
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Action Buttons: Download PDF & Share */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-black bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] hover:brightness-110 active:scale-95 transition-all shadow-[0_4px_20px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 min-h-[46px]"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? 'Generating PDF...' : 'Download Registration Slip (PDF)'}</span>
            </button>

            <a
              href={`https://api.whatsapp.com/send?text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-green-700 hover:bg-green-600 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer min-h-[46px]"
            >
              <Share2 className="w-4 h-4" />
              <span>Share on WhatsApp</span>
            </a>
          </div>

        </section>

        {/* --- FOOTER LINKS --- */}
        <div className="mt-8 text-center">
          <Link
            href="/people-choice-award"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#d4af37] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Award Homepage</span>
          </Link>
        </div>

      </main>
    </div>
  );
}
