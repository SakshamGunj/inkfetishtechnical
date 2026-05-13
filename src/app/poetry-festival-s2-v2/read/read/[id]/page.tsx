'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Feather, Loader2, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ReadPoetryPage() {
  const { id } = useParams();
  const [poetry, setPoetry] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoetry = async () => {
      try {
        const { data, error } = await supabase
          .from('poetry_festival_s2_submissions')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        setPoetry(data);
      } catch (err) {
        console.error('Error fetching poetry:', err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchPoetry();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#EAA134] animate-spin mb-4" />
        <span className="text-gold font-bold uppercase tracking-widest text-xs">Opening The Inkfetish Archives...</span>
      </div>
    );
  }

  if (!poetry) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-serif text-white mb-4">Poem Not Found</h2>
        <p className="text-white/50 mb-8">This entry may have been moved or archived.</p>
        <Link href="/poetry-festival-s2/submit" className="bg-gold text-black px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs">Back to Portal</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-sans selection:bg-gold/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-white/5 px-6 flex items-center justify-between">
        <Link href="/poetry-festival-s2/submit" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Back</span>
        </Link>
        <div className="flex flex-col items-center">
           <span className="text-gold font-bold uppercase tracking-[0.3em] text-[10px]">Inkfetish</span>
           <span className="text-white/40 text-[9px] uppercase tracking-widest font-medium">Archives • S2</span>
        </div>
        <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center border border-gold/20">
           <Feather className="w-4 h-4 text-gold" />
        </div>
      </nav>

      {/* Content */}
      <main className="pt-32 pb-24 px-6 flex flex-col items-center">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-2xl w-full flex flex-col items-center"
        >
          <div className="flex items-center gap-2 mb-8 bg-gold/5 px-4 py-1.5 rounded-full border border-gold/10">
            <Sparkles className="w-3 h-3 text-gold" />
            <span className="text-gold text-[10px] font-bold uppercase tracking-widest">Season 2 Submission</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold text-center mb-4 leading-tight">{poetry.title}</h1>
          <p className="text-white/50 text-xl font-serif italic mb-16">by {poetry.authorName}</p>

          <div className="w-full bg-white text-black p-12 md:p-20 shadow-2xl rounded-sm font-serif text-lg md:text-xl leading-relaxed whitespace-pre-wrap poetry-content border-b-8 border-gold">
            <div dangerouslySetInnerHTML={{ __html: poetry.poetryHtml }} />
          </div>

          <div className="mt-20 flex flex-col items-center">
             <div className="w-px h-24 bg-gradient-to-b from-gold/50 to-transparent mb-8" />
             <p className="text-white/30 text-[10px] uppercase tracking-[0.5em] font-bold">End of Archive</p>
          </div>
        </motion.div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .poetry-content p { margin-bottom: 1.5em; }
        .poetry-content {
          min-height: 800px;
          box-shadow: 0 40px 100px -20px rgba(0,0,0,0.8);
        }
      `}} />
    </div>
  );
}
