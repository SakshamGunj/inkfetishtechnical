import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Loader2, Award, User, Tag, QrCode, Download } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SinglePoem from "./SinglePoem";

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

function HallOfFameList() {
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
  const uniqueUrl = `${window.location.origin}/p/${currentSubmission.id}`;

  const renderContent = (sub?: SubmissionContent) => {
    if (!sub || (!sub.title && !sub.content)) return null;
    return (
      <div className="mt-5 border-t border-zinc-100 pt-5 first:mt-0 first:border-0 first:pt-0">
        <h3 className="text-lg font-bold text-zinc-900 mb-2 font-serif">
          {sub.title || `Untitled`}
        </h3>
        <p className="text-zinc-700 leading-relaxed whitespace-pre-wrap font-serif text-sm sm:text-base">
          {sub.content}
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-2 sm:p-4 font-sans overflow-hidden">
      <div className="w-full max-w-4xl flex flex-col h-[96vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-3 shrink-0 px-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <Award className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-zinc-900 tracking-tight leading-tight">Hall of Fame</h1>
              <p className="text-xs text-zinc-500">IWL Submissions</p>
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
              className="flex items-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-3 py-1 rounded-full text-xs font-medium transition-colors border border-zinc-200 shadow-sm"
            >
              <QrCode className="w-3.5 h-3.5" />
              Download QR
            </button>
            <div className="bg-white px-3 py-1 rounded-full border border-zinc-200 shadow-sm text-xs font-medium text-zinc-600">
              {currentIndex + 1} <span className="text-zinc-400 mx-1">/</span> {submissions.length}
            </div>
          </div>
        </div>

        {/* Card Viewer */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSubmission.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex-1 overflow-y-auto p-4 sm:p-6 hide-scrollbar"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex items-center gap-1.5 text-zinc-600 bg-zinc-50 px-2 py-1 rounded text-xs border border-zinc-100">
                  <User className="w-3.5 h-3.5" />
                  <span className="font-medium">{currentSubmission.name || "Anonymous"}</span>
                </div>
                {currentSubmission.category && (
                  <div className="flex items-center gap-1.5 text-indigo-600 bg-indigo-50 px-2 py-1 rounded text-xs border border-indigo-100 capitalize">
                    <Tag className="w-3.5 h-3.5" />
                    <span className="font-medium">{currentSubmission.category.replace('_', ' ')}</span>
                  </div>
                )}
              </div>

              {renderContent(currentSubmission.activeSubmission)}
              
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-3 shrink-0 px-1">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all text-zinc-700 bg-white border border-zinc-200 hover:bg-zinc-50 disabled:opacity-50 disabled:pointer-events-none shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentIndex === submissions.length - 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none shadow-sm"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Global style to hide scrollbar but keep functionality */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HallOfFameList />} />
        <Route path="/p/:id" element={<SinglePoem />} />
      </Routes>
    </BrowserRouter>
  );
}
