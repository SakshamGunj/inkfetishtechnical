'use client';

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Loader2, Award, User, Tag, QrCode } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import Navbar from "@/components/Navbar";

type SubmissionContent = {
  title?: string;
  content?: string;
};

type Submission = {
  id: string;
  name?: string;
  category?: string;
  activeSubmission?: SubmissionContent;
};

export default function HallOfFameClient() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // SVG ref for QR Code download
  const qrRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await fetch("/api/submissions");
        if (!res.ok) throw new Error("Failed to fetch submissions");
        const data = await res.json();
        setSubmissions(data.submissions);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  const handleNext = () => {
    if (currentIndex < submissions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const downloadQR = () => {
    if (!qrRef.current) return;
    const svg = qrRef.current;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    // Scale up for better resolution
    const scale = 4;
    canvas.width = 128 * scale;
    canvas.height = 128 * scale;

    img.onload = () => {
      ctx!.fillStyle = "white";
      ctx!.fillRect(0, 0, canvas.width, canvas.height);
      ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `QR_${currentSubmission?.name || "Poem"}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-4" />
        <p className="text-zinc-500 font-medium tracking-tight">Loading Hall of Fame...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 max-w-md w-full text-center">
          <p className="font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-zinc-200 max-w-md w-full text-center shadow-sm">
          <Award className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
          <p className="text-zinc-600 font-medium">No Hall of Fame submissions found.</p>
        </div>
      </div>
    );
  }

  const currentSubmission = submissions[currentIndex];
  // QR URL points to /p/[id]
  const uniqueUrl = typeof window !== 'undefined' ? `${window.location.origin}/p/${currentSubmission.id}` : '';

  const renderContent = (sub?: SubmissionContent) => {
    if (!sub || (!sub.title && !sub.content)) return null;
    return (
      <div className="mt-5 border-t border-zinc-100 pt-5 first:mt-0 first:border-0 first:pt-0">
        <h3 className="text-lg font-bold text-zinc-900 mb-2 font-serif uppercase tracking-tight">
          {sub.title || `Untitled`}
        </h3>
        <p className="text-zinc-700 leading-relaxed whitespace-pre-wrap font-serif text-sm sm:text-base italic">
          {sub.content}
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center font-sans overflow-hidden">
      <Navbar />
      
      <div className="w-full max-w-4xl flex flex-col h-[85vh] mt-24 px-2 sm:px-4">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-3 shrink-0 px-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <Award className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-zinc-900 tracking-tight leading-tight">Hall of Fame</h1>
              <p className="text-xs text-zinc-500 font-sans uppercase tracking-widest font-bold">IWL Submissions</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Hidden QR SVG mapped to URL */}
            <div className="hidden">
              <QRCodeSVG 
                value={uniqueUrl} 
                size={128} 
                ref={qrRef}
                level="H"
                includeMargin={true}
              />
            </div>
            <button
              onClick={downloadQR}
              className="group relative flex items-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-4 py-1.5 rounded-full text-xs font-bold transition-all border border-zinc-200 shadow-sm uppercase tracking-wider"
            >
              <QrCode className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              Download QR
            </button>
            <div className="bg-white px-3 py-1.5 rounded-full border border-zinc-200 shadow-sm text-xs font-bold text-zinc-600 font-sans">
              {currentIndex + 1} <span className="text-zinc-400 mx-1">/</span> {submissions.length}
            </div>
          </div>
        </div>

        {/* Card Viewer */}
        <div className="flex-1 bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col relative group">
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-zinc-50 skew-x-12 translate-x-12 -translate-y-12 pointer-events-none group-hover:bg-indigo-50 transition-colors" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSubmission.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex-1 overflow-y-auto p-6 sm:p-10 hide-scrollbar z-10"
            >
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="flex items-center gap-1.5 text-zinc-600 bg-zinc-50 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-zinc-100">
                  <User className="w-3 h-3" />
                  <span>{currentSubmission.name || "Anonymous"}</span>
                </div>
                {currentSubmission.category && (
                  <div className="flex items-center gap-1.5 text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100 italic">
                    <Tag className="w-3 h-3" />
                    <span>{currentSubmission.category.replace('_', ' ')}</span>
                  </div>
                )}
              </div>

              <div className="prose prose-zinc max-w-none">
                {renderContent(currentSubmission.activeSubmission)}
              </div>
              
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-6 shrink-0 px-1 gap-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all text-zinc-700 bg-white border border-zinc-200 hover:bg-zinc-50 disabled:opacity-30 disabled:pointer-events-none shadow-sm hover:shadow-md active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentIndex === submissions.length - 1}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-30 disabled:pointer-events-none shadow-lg hover:shadow-indigo-200 active:scale-95"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Global style for hide-scrollbar */}
      <style jsx global>{`
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
}
