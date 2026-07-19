"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Award, Heart, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface CertificateRecord {
  name: string;
  id: string;
}

export default function CertificateSearchPage() {
  const [query, setQuery] = useState("");
  const [records, setRecords] = useState<CertificateRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const response = await fetch("/hnhcertificate.csv");
        if (!response.ok) throw new Error("Failed to fetch CSV");
        const text = await response.text();
        
        const lines = text.split("\n").filter((line) => line.trim() !== "");
        // skip header (first line)
        const parsed = lines.slice(1).map((line) => {
          // split by comma, handling potential quotes if needed
          const [name, id] = line.split(",").map((s) => s.trim());
          return { name, id };
        }).filter(r => r.name && r.id);
        
        setRecords(parsed);
      } catch (error) {
        console.error("Error loading certificates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCSV();
  }, []);

  const filteredRecords = useMemo(() => {
    if (!query.trim()) return records;
    const lowerQuery = query.toLowerCase();
    return records.filter((r) => r.name.toLowerCase().includes(lowerQuery));
  }, [query, records]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-rose-50 text-slate-800 pb-20 pt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header & Details */}
        <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full max-w-[320px] mx-auto md:mx-0 relative drop-shadow-2xl"
          >
            <img 
              src="https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1779675277/ChatGPTImageMay25202607_43_49A_chgtxw.jpg" 
              alt="Honey and Hurt Anthology Book Cover" 
              className="w-full h-auto rounded-2xl" 
            />
            <div className="absolute -bottom-4 -right-4 bg-emerald-500 text-white border-2 border-white px-3 py-1.5 rounded-full shadow-lg transform rotate-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Published</span>
            </div>
          </motion.div>

          <div className="flex-1 text-center md:text-left space-y-6">
            <div>
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-900"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Honey & Hurt
              </motion.h1>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-amber-800/80 font-medium max-w-xl mx-auto md:mx-0 italic"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                An open-theme anthology exploring the beautiful duality of the human experience.
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-3 text-sm text-slate-700 bg-white/40 p-5 rounded-2xl border border-white/60 backdrop-blur-sm"
            >
              <p><strong>HONEY</strong> represents the sweet, the beautiful, and the light. It's the love that heals, the moments of pure joy, and the gentle side of life.</p>
              <p><strong>HURT</strong> represents the dark, the trauma, and the pain. It's the heartbreak that shatters, the grief that lingers, and the struggles we face.</p>
            </motion.div>
          </div>
        </div>

        {/* Search Section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-6 md:p-8 border border-white/50 relative overflow-hidden"
        >
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-slate-800">Retrieve Your Certificate</h2>
            <p className="text-sm text-slate-500 mt-1">Enter your full name to download your verified publication certificate.</p>
          </div>
          
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-amber-500" />
            </div>
            <Input
              type="text"
              placeholder="Search by your full name..."
              className="pl-12 py-6 text-lg rounded-xl border-amber-200 focus-visible:ring-amber-500 focus-visible:border-amber-500 shadow-sm transition-all"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={loading}
            />
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <Loader2 className="h-8 w-8 animate-spin mb-4 text-amber-500" />
              <p>Loading certificate database...</p>
            </div>
          ) : (
            <div className="min-h-[300px]">
              {filteredRecords.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center text-slate-500">
                  <p className="text-lg font-medium text-slate-700 mb-2">No certificates found</p>
                  <p className="text-sm">Please ensure you are typing your exact name as registered.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence>
                    {filteredRecords.map((record, index) => (
                      <motion.div
                        key={record.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2, delay: (index % 15) * 0.03 }}
                      >
                        <Link href={`/hnh-certificates/${record.id}`}>
                          <div className="group flex flex-col items-start p-4 bg-white hover:bg-gradient-to-br hover:from-amber-50 hover:to-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer h-full">
                            <div className="flex items-center gap-3 w-full">
                              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                                <Award className="w-5 h-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-slate-800 text-sm md:text-base group-hover:text-amber-700 transition-colors truncate">
                                  {record.name}
                                </h3>
                                <div className="flex items-center text-xs text-slate-500 gap-1 mt-0.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                  <span className="truncate">Verified Participant</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
