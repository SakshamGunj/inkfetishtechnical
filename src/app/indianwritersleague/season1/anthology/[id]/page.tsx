import React from 'react';
import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface AnthologyPageProps {
  params: {
    id: string;
  };
}

// Generate metadata dynamically for SEO
export async function generateMetadata({ params }: AnthologyPageProps): Promise<Metadata> {
  const resolvedParams = await (params as any);
  const { id } = resolvedParams;

  const { data: item } = await supabase
    .from('iwl_anthology_poetry')
    .select('title, author_name, content')
    .eq('id', id)
    .single();

  if (!item) {
    return {
      title: 'Poetry Not Found | Inkfetish',
    };
  }

  const titleSnippet = item.title || 'Untitled Poem';
  const authorSnippet = item.author_name ? ` by ${item.author_name}` : '';
  
  return {
    title: `${titleSnippet}${authorSnippet} | IWL Season 1 Anthology`,
    description: item.content.slice(0, 160) + '...',
    openGraph: {
      title: `${titleSnippet}${authorSnippet} | IWL Season 1 Anthology`,
      description: item.content.slice(0, 160) + '...',
      type: 'article',
    },
  };
}

export default async function AnthologyPublicPage({ params }: AnthologyPageProps) {
  // Await params for compatibility with modern Next.js versions
  const resolvedParams = await (params as any);
  const { id } = resolvedParams;

  console.log('Fetching anthology piece:', id);

  if (!supabase) {
    console.error('Supabase client not initialized on server');
    return (
      <div className="p-8 text-center">
        <h1 className="text-xl font-bold text-red-600">Configuration Error</h1>
        <p>Supabase connection is not established. Please check environment variables.</p>
      </div>
    );
  }

  // Fetch the poetry content
  const { data: item, error } = await supabase
    .from('iwl_anthology_poetry')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !item) {
    if (error) console.error('Supabase error fetching anthology piece:', error);
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 font-serif">
      {/* Premium Border Decor */}
      <div className="fixed top-0 left-0 w-full h-1 bg-indigo-600 z-50" />
      
      <main className="max-w-3xl mx-auto px-6 py-20 sm:py-32">
        <header className="mb-16 text-center space-y-4">
          <p className="text-indigo-600 font-sans font-bold uppercase tracking-[0.2em] text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
            Indian Writers League Season 1 Anthology
          </p>
          <h2 className="text-slate-400 font-sans text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            by Inkfetish Publications
          </h2>
          <div className="w-12 h-[1px] bg-slate-200 mx-auto mt-8" />
        </header>

        <article className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          {(item.title || item.author_name) && (
            <div className="mb-12 text-center">
              {item.title && (
                <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4 italic">
                  {item.title}
                </h1>
              )}
              {item.author_name && (
                <p className="text-slate-500 font-sans text-lg">
                  — {item.author_name}
                </p>
              )}
            </div>
          )}

          <div className="poetry-content whitespace-pre-wrap text-lg sm:text-xl leading-relaxed text-slate-800 font-medium">
            {item.content}
          </div>
        </article>

        <footer className="mt-24 pt-12 border-t border-slate-100 text-center animate-in fade-in duration-1000 delay-500">
          <div className="flex flex-col items-center gap-4">
            <img 
              src="/images/inkfetish_logo.png" 
              alt="Inkfetish Logo" 
              className="w-10 h-10 opacity-30 grayscale"
            />
            <p className="text-slate-400 font-sans text-xs tracking-widest uppercase">
              Part of the Official Anthology Series
            </p>
          </div>
        </footer>
      </main>

      {/* Subtle Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.1]" />
    </div>
  );
}
