'use client';

import { useEffect, useState } from "react";
import { Loader2, Award } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function SinglePoemClient({ id }: { id: string }) {
  const [submission, setSubmission] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const res = await fetch(`/api/submissions/${id}`);
        if (!res.ok) throw new Error("Poem not found");
        const data = await res.json();
        setSubmission(data.submission);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchSubmission();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (error || !submission) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
        <div className="bg-white p-12 rounded-3xl border border-zinc-200 text-center shadow-xl max-w-md w-full">
           <Award className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
           <p className="text-zinc-500 font-serif uppercase tracking-widest font-black text-sm">
             {error || "Poem could not be located"}
           </p>
        </div>
      </div>
    );
  }

  const content = submission.activeSubmission;

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans flex flex-col items-center">
      <Navbar />
      
      <div className="w-full max-w-3xl flex flex-col items-center px-4 pt-32 pb-20">
        <div className="w-full bg-white rounded-[40px] p-8 sm:p-20 shadow-2xl border border-zinc-100 relative overflow-hidden">
          
          {/* Subtle Accent */}
          <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600" />
          
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-8 bg-zinc-50 px-4 py-2 rounded-full border border-zinc-100">
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Author</span>
               <div className="w-px h-3 bg-zinc-200" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">
                 {submission.name || "Anonymous"}
               </span>
            </div>
            
            {content?.title && (
              <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 mb-12 font-serif leading-[0.9] tracking-tighter uppercase italic">
                {content.title}
              </h1>
            )}
            
            {content?.content && (
              <p className="text-zinc-800 leading-relaxed sm:leading-[2.5] whitespace-pre-wrap font-serif text-lg sm:text-xl text-center italic max-w-2xl">
                {content.content}
              </p>
            )}

            <div className="mt-20 pt-12 border-t border-zinc-100 w-full flex flex-col items-center">
               <Award className="w-8 h-8 text-indigo-200 mb-4" />
               <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">
                 Indian Writers League Season 1
               </p>
               <p className="text-[9px] font-sans font-medium text-zinc-300 mt-2 uppercase tracking-widest">
                 Inkfetish Publications Official Hall of Fame
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
