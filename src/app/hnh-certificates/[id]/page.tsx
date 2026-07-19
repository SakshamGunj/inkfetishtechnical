"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft, CheckCircle2, ShieldCheck, Share2, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CertificateDownloadPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  
  const [recordName, setRecordName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  // We fetch the CSV again here to verify the name, just to show it in the UI.
  useEffect(() => {
    const verifyCertificate = async () => {
      try {
        const response = await fetch("/hnhcertificate.csv");
        if (!response.ok) throw new Error("Failed to fetch CSV");
        const text = await response.text();
        
        const lines = text.split("\n").filter((line) => line.trim() !== "");
        const parsed = lines.slice(1).map((line) => {
          const [name, certId] = line.split(",").map((s) => s.trim());
          return { name, id: certId };
        });
        
        const match = parsed.find(r => r.id === id);
        if (match) {
          setRecordName(match.name);
        } else {
          // If not found in CSV, we might just leave it null or redirect
          // But maybe we allow it if the PDF exists.
        }
      } catch (error) {
        console.error("Error verifying:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      verifyCertificate();
    }
  }, [id]);

  const pdfUrl = `/hnhcertificatefolder/${id}.pdf`;

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(pdfUrl);
      if (!response.ok) throw new Error("Network response was not ok");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.download = `Certificate-${recordName || id}.pdf`;
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
      // Fallback for extreme cases
      window.open(pdfUrl, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Honey & Heart Certificate',
          text: `Check out my verified certificate for Honey & Heart!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-rose-50 text-slate-800 py-10 pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Navigation & Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <Link href="/hnh-certificates" className="inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-800 transition-colors mb-4 bg-amber-100/50 px-3 py-1.5 rounded-full hover:bg-amber-100">
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Back to Search
            </Link>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-rose-600"
            >
              {recordName ? `${recordName}'s Certificate` : 'Your Certificate'}
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-3 mt-3 text-sm text-slate-600"
            >
              <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-100 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Officially Verified
              </div>
              <div className="flex items-center gap-1.5 opacity-80">
                <span className="font-semibold text-slate-500">ID:</span>
                <span className="font-mono bg-white px-2 py-0.5 rounded shadow-sm border border-slate-200">{id}</span>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex gap-3"
          >
            <Button variant="outline" onClick={handleShare} className="gap-2 bg-white/80 backdrop-blur border-amber-200 hover:bg-amber-50 hover:text-amber-700 text-amber-600">
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button onClick={handleDownload} disabled={isDownloading} className="gap-2 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white shadow-md hover:shadow-lg transition-all min-w-[140px]">
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download PDF
                </>
              )}
            </Button>
          </motion.div>
        </div>

        {/* Certificate Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl p-2 border border-slate-100/50 backdrop-blur-xl aspect-[1.414/1] md:aspect-[1.414/1] relative overflow-hidden group w-full max-w-[1000px] mx-auto"
        >
          {/* We use iframe to show PDF, fallback object */}
          <iframe 
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            className="w-full h-full rounded-xl border border-slate-200 bg-slate-100/50"
            title="Certificate PDF Preview"
          />
          
          {/* Overlay to intercept clicks if we wanted to enforce download, but iframe is fine */}
          <div className="absolute inset-0 bg-transparent pointer-events-none rounded-xl" />
        </motion.div>
        
        <div className="mt-12 text-center text-slate-500 text-sm">
          <p>
            Having trouble downloading?{' '}
            <a 
              href={pdfUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-amber-600 font-medium hover:underline"
            >
              Open the PDF directly in a new tab
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
