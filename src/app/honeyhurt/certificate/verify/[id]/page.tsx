"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, ShieldCheck, Award } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CertificateVerifyPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [recordName, setRecordName] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);

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
          setIsVerified(true);
        } else {
          setIsVerified(false);
        }
      } catch (error) {
        console.error("Error verifying:", error);
        setIsVerified(false);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      verifyCertificate();
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-rose-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 md:p-12 border border-white relative overflow-hidden"
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-500">
              <Loader2 className="w-10 h-10 animate-spin text-amber-500 mb-4" />
              <p className="text-lg font-medium">Verifying Certificate...</p>
              <p className="text-sm opacity-70">Checking our database</p>
            </div>
          ) : isVerified ? (
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-100 mb-2 shadow-inner border-4 border-white">
                <ShieldCheck className="w-12 h-12 text-emerald-500" />
              </div>
              
              <div>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-widest border border-emerald-200 mb-4"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Officially Verified
                </motion.div>
                
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Certificate Valid</h1>
                <p className="text-slate-500">This certificate is an official, authentic document issued by Inkfetish Publication.</p>
              </div>

              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 text-left space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-200/50 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Issued To</p>
                    <p className="text-lg font-bold text-slate-800">{recordName}</p>
                  </div>
                </div>
                
                <div className="border-t border-amber-200/50 pt-4 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Certificate ID</p>
                    <p className="font-mono text-sm text-slate-700 font-medium">{id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Event</p>
                    <p className="text-sm font-semibold text-amber-700">Honey & Hurt</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Link href={`/hnh-certificates/${id}`} className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white shadow-md">
                    View Certificate
                  </Button>
                </Link>
                <Link href="/hnh-certificates" className="flex-1">
                  <Button variant="outline" className="w-full border-amber-200 text-amber-700 hover:bg-amber-50">
                    Search Another
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-rose-100 mb-2 shadow-inner border-4 border-white">
                <XCircle className="w-12 h-12 text-rose-500" />
              </div>
              
              <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Invalid Certificate</h1>
                <p className="text-slate-500">We could not find any official records matching this Certificate ID in our database.</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Provided ID</p>
                <p className="font-mono text-lg text-slate-700 font-medium">{id}</p>
              </div>

              <div className="pt-4">
                <Link href="/hnh-certificates">
                  <Button className="w-full bg-slate-800 hover:bg-slate-900 text-white">
                    Return to Search
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
