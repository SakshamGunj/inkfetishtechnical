"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, Award, CheckCircle2, Loader2, Download, CheckSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface CustomerRecord {
  name: string;
  phone: string;
  originalIndex: number;
}

export default function SPACertificateSearchPage() {
  const [phoneQuery, setPhoneQuery] = useState("");
  const [records, setRecords] = useState<CustomerRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const response = await fetch("/spa_list%20-%20Sheet4.csv");
        if (!response.ok) throw new Error("Failed to fetch CSV");
        const text = await response.text();
        
        const lines = text.split("\n").filter((line) => line.trim() !== "");
        const parsed = lines.slice(1).map((line, index) => {
          const cols = line.split(",");
          const name = cols[2]?.trim();
          const phone = cols[3]?.trim();
          return { name, phone, originalIndex: index };
        }).filter(r => r.name && r.phone);
        
        setRecords(parsed);
      } catch (error) {
        console.error("Error loading certificates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCSV();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchInitiated(true);
  };

  const getFilteredRecords = () => {
    const cleanQuery = phoneQuery.replace(/\D/g, "");
    if (cleanQuery.length === 0) return [];

    return records.filter((r) => {
      const cleanRecordPhone = r.phone.replace(/\D/g, "");
      const recordLast10 = cleanRecordPhone.length >= 10 
        ? cleanRecordPhone.slice(-10) 
        : cleanRecordPhone;
      return recordLast10 === cleanQuery;
    });
  };

  const filteredRecords = getFilteredRecords();

  return (
    <div className="min-h-screen bg-[#14100C] text-slate-200 font-sans selection:bg-gold selection:text-[#14100C] overflow-x-hidden relative"
      style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #2A2118 0%, #14100C 60%)' }}>
      
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23c5a059\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

      {/* Deep radial glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.08)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 pt-20 pb-24">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 inline-flex items-center gap-2.5 bg-[#1A1613] border border-gold/30 text-[#ebd298] text-[10px] sm:text-[11px] font-black tracking-[0.25em] uppercase px-5 py-2.5 shadow-[0_0_25px_rgba(197,160,89,0.1)] rounded-sm"
          >
            <Award className="w-4 h-4 text-gold" />
            Official Documentation
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif font-black leading-[1.05] tracking-tight mb-4"
          >
            <span className="block text-sm sm:text-base font-sans font-light tracking-[0.3em] uppercase text-white/50 mb-3">
              Retrieve your
            </span>
            <span className="block text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] via-[#ebd298] to-[#b8922a] pb-1">
              Certificate of Excellence
            </span>
            <span className="block text-lg sm:text-xl font-light italic text-white/70 mt-3 tracking-wide">
              Shakespeare Poetry Award · Volume 2
            </span>
          </motion.h1>
        </div>

        {/* Search Section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-[#1A1613] to-[#14100C] border border-gold/20 p-6 sm:p-10 rounded-sm shadow-[0_30px_60px_rgba(197,160,89,0.15)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[80px] pointer-events-none"></div>

          <div className="mb-8 text-center relative z-10">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-white">Find Your Secure Record</h2>
            <p className="text-sm text-slate-400 mt-2 font-light">Enter your 10-digit registered phone number below to retrieve your official certificate.</p>
          </div>
          
          <form onSubmit={handleSearch} className="max-w-md mx-auto mb-10 relative z-10">
            <div className="flex flex-col gap-5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gold/70 font-medium text-lg">+91</span>
                </div>
                <Input
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  className="pl-14 py-7 text-lg bg-[#0E0B08] border-gold/30 text-white placeholder:text-white/30 rounded-sm focus-visible:ring-gold focus-visible:border-gold shadow-inner transition-all focus:bg-[#14100C]"
                  value={phoneQuery}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    if (val.length <= 10) setPhoneQuery(val);
                    setSearchInitiated(false);
                  }}
                  disabled={loading}
                />
              </div>
              <button 
                type="submit" 
                className="w-full relative px-8 py-5 bg-gradient-to-r from-[#c5a059] to-[#b8922a] hover:from-[#ebd298] hover:to-[#c5a059] text-[#14100C] font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 rounded-sm overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(197,160,89,0.3)]"
                disabled={loading || phoneQuery.length !== 10}
              >
                <Search className="w-5 h-5" />
                Access Certificate
              </button>
            </div>
          </form>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-8 text-gold/60 relative z-10">
              <Loader2 className="h-8 w-8 animate-spin mb-4" />
              <p className="text-sm uppercase tracking-widest font-bold">Accessing Secure Vault...</p>
            </div>
          ) : (
            <div className="min-h-[150px] relative z-10">
              {searchInitiated && phoneQuery.length === 10 && (
                <>
                  {filteredRecords.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-10 text-center bg-[#0E0B08] border border-red-900/30 rounded-sm shadow-inner"
                    >
                      <p className="text-lg font-serif font-bold text-red-400 mb-2">No Record Found</p>
                      <p className="text-sm text-slate-400 font-light">We couldn't find a registration matching this phone number. Please ensure you entered the exact registered number without country code.</p>
                    </motion.div>
                  ) : (
                    <div className="space-y-6">
                      <p className="text-center text-xs uppercase tracking-[0.2em] text-green-400 font-bold mb-2">
                        <CheckSquare className="w-4 h-4 inline-block mr-1 -mt-1" /> Match Found
                      </p>
                      <AnimatePresence>
                        {filteredRecords.map((record, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col md:flex-row items-center justify-between p-6 bg-[#0E0B08] border-l-4 border-l-gold border-y border-y-gold/10 border-r border-r-gold/10 rounded-sm shadow-xl"
                          >
                            <div className="flex items-center gap-5 w-full md:w-auto mb-6 md:mb-0">
                              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/20 shrink-0 shadow-[0_0_15px_rgba(197,160,89,0.15)]">
                                <Award className="w-7 h-7" />
                              </div>
                              <div>
                                <h3 className="font-serif font-black text-white text-xl sm:text-2xl">
                                  {record.name}
                                </h3>
                                <div className="flex items-center text-xs text-slate-400 gap-1.5 mt-1 font-light tracking-wide">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                                  <span className="uppercase tracking-widest text-[9px] text-green-500/80 font-bold">Verified Participant · Vol 2</span>
                                </div>
                              </div>
                            </div>
                            
                            <button 
                              disabled={downloadingId === record.originalIndex}
                              onClick={async () => {
                                try {
                                  setDownloadingId(record.originalIndex);
                                  const url = `/api/certificate/download?pageIndex=${record.originalIndex}&name=${encodeURIComponent(record.name)}`;
                                  
                                  const response = await fetch(url);
                                  if (!response.ok) throw new Error("Failed to download");
                                  
                                  const blob = await response.blob();
                                  const downloadUrl = window.URL.createObjectURL(blob);
                                  const a = document.createElement('a');
                                  a.href = downloadUrl;
                                  a.download = `${record.name.replace(/\s+/g, '_')}_SPA_Certificate.pdf`;
                                  document.body.appendChild(a);
                                  a.click();
                                  a.remove();
                                  window.URL.revokeObjectURL(downloadUrl);
                                } catch (error) {
                                  console.error("Download failed", error);
                                  alert("Failed to download certificate. Please try again.");
                                } finally {
                                  setDownloadingId(null);
                                }
                              }}
                              className="w-full md:w-auto px-6 py-3 border border-gold/40 text-gold hover:bg-gold hover:text-[#14100C] text-xs font-bold uppercase tracking-[0.15em] transition-all rounded-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                            >
                              {downloadingId === record.originalIndex ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  Preparing...
                                </>
                              ) : (
                                <>
                                  <Download className="w-4 h-4" />
                                  Download File
                                </>
                              )}
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </motion.div>

        {/* Footer info */}
        <div className="mt-12 text-center border-t border-gold/10 pt-8">
           <div className="flex items-center justify-center gap-2 mb-2">
             <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>
             <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Inkfetish Publications</div>
             <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>
           </div>
           <p className="text-[11px] text-slate-600 font-light max-w-lg mx-auto">
             If you are facing issues retrieving your certificate, please contact support with your registration ID.
           </p>
        </div>

      </div>
    </div>
  );
}
