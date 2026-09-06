'use client';

import React, { useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, PenTool, Feather, CheckCircle2,
  AlertCircle, ArrowRight, ChevronDown, Info,
  Type, Hash, Tag, FileText, Send
} from 'lucide-react';
import Link from 'next/link';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';

// ─── Types ─────────────────────────────────────────────────────────────────────

type ContentType = 'poetry' | 'short_story' | 'novel_excerpt';
type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const CONTENT_TYPES: { id: ContentType; label: string; desc: string; icon: React.ReactNode }[] = [
  {
    id: 'poetry',
    label: 'Poetry / Shayari',
    desc: 'A poem, ghazal, haiku, free verse, or shayari in any language.',
    icon: <Feather className="w-5 h-5" />,
  },
  {
    id: 'short_story',
    label: 'Short Story',
    desc: 'A complete short-form narrative with a beginning, middle, and end.',
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    id: 'novel_excerpt',
    label: 'Novel / Prose Excerpt',
    desc: 'A compelling excerpt from your novel, novella, or long-form prose.',
    icon: <FileText className="w-5 h-5" />,
  }
];

const THEMES = [
  'Love & Longing',
  'Identity & Self-Discovery',
  'Grief & Healing',
  'Nostalgia & Belonging',
  'Social Justice & Change',
  'Nature & Environment',
  'Spirituality & Faith',
  'Freedom & Rebellion',
  'War & Survival',
  'Hope & New Beginnings',
  'Dreams & Reality',
  'Family & Relationships',
  'Other / Open Theme'
];

// ─── Rich Text Toolbar ─────────────────────────────────────────────────────────

function ToolbarButton({ onClick, active, title, children }: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer min-h-[32px] ${
        active
          ? 'bg-[#d4af37]/30 text-[#f3e5ab] border border-[#d4af37]/60'
          : 'text-gray-400 hover:bg-white/10 hover:text-white border border-transparent'
      }`}
    >
      {children}
    </button>
  );
}

function EditorToolbar({ editor }: { editor: ReturnType<typeof useEditor> }) {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-1 p-2.5 bg-black/60 border-b border-white/10 rounded-t-xl">
      {/* Text Format */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive('bold')}
        title="Bold"
      >
        <strong>B</strong>
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive('italic')}
        title="Italic"
      >
        <em>I</em>
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        active={editor.isActive('underline')}
        title="Underline"
      >
        <span className="underline">U</span>
      </ToolbarButton>

      <div className="w-px h-5 bg-white/20 mx-1" />

      {/* Headings */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive('heading', { level: 2 })}
        title="Heading"
      >
        H2
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor.isActive('heading', { level: 3 })}
        title="Sub-heading"
      >
        H3
      </ToolbarButton>

      <div className="w-px h-5 bg-white/20 mx-1" />

      {/* Alignment */}
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        active={editor.isActive({ textAlign: 'left' })}
        title="Align Left"
      >
        ≡L
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        active={editor.isActive({ textAlign: 'center' })}
        title="Align Center"
      >
        ≡C
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        active={editor.isActive({ textAlign: 'right' })}
        title="Align Right"
      >
        ≡R
      </ToolbarButton>

      <div className="w-px h-5 bg-white/20 mx-1" />

      {/* Lists */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive('bulletList')}
        title="Bullet List"
      >
        • List
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive('orderedList')}
        title="Numbered List"
      >
        1. List
      </ToolbarButton>

      <div className="w-px h-5 bg-white/20 mx-1" />

      {/* Blockquote */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive('blockquote')}
        title="Block Quote"
      >
        " Quote
      </ToolbarButton>

      {/* Line break */}
      <ToolbarButton
        onClick={() => editor.chain().focus().setHardBreak().run()}
        title="Line Break"
        active={false}
      >
        ↵ Break
      </ToolbarButton>
    </div>
  );
}

// ─── Word Count ────────────────────────────────────────────────────────────────

function getWordCount(html: string): number {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text ? text.split(' ').length : 0;
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function SubmitClient() {
  const searchParams = useSearchParams();
  const nominationId = searchParams.get('nomination_id') || '';
  const prefillName = searchParams.get('name') || '';

  const [title, setTitle] = useState('');
  const [contentType, setContentType] = useState<ContentType | null>(null);
  const [theme, setTheme] = useState('');
  const [authorNote, setAuthorNote] = useState('');
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [themeOpen, setThemeOpen] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] })
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'min-h-[320px] max-h-[600px] overflow-y-auto p-5 text-[#f0e6cc] text-sm sm:text-base leading-relaxed font-serif focus:outline-none prose-invert'
      }
    }
  });

  const wordCount = editor ? getWordCount(editor.getHTML()) : 0;

  const isOverLimit = false;

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contentType) {
      setErrorMsg('Please select a submission type (Poetry, Short Story, or Novel Excerpt).');
      return;
    }
    if (!title.trim()) {
      setErrorMsg('Please provide a title for your submission.');
      return;
    }
    if (!theme) {
      setErrorMsg('Please select a theme for your work.');
      return;
    }
    if (!editor || editor.isEmpty) {
      setErrorMsg('Please write or paste your submission in the editor below.');
      return;
    }

    setErrorMsg('');
    setStatus('submitting');

    try {
      const body = {
        nominationId,
        authorName: prefillName || 'Anonymous',
        title: title.trim(),
        contentType,
        theme,
        authorNote: authorNote.trim(),
        content: editor.getHTML(),
        wordCount,
        submittedAt: new Date().toISOString()
      };

      const res = await fetch('/api/people-choice/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Submission failed. Please try again.');
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Unexpected error. Please try again.');
    }
  }, [contentType, title, theme, editor, authorNote, nominationId, prefillName, wordCount]);

  // ─── Success Screen ─────────────────────────────────────────────────────────

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-[#070605] text-[#f5f0e1] font-sans relative overflow-x-hidden">
        {/* Background glow */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-[15%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,#aa771c_0%,transparent_70%)] opacity-20 blur-[100px] animate-pulse" />
          <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,#d4af37_0%,transparent_70%)] opacity-15 blur-[120px] animate-pulse" />
        </div>

        {/* Navbar */}
        <nav className="sticky top-0 z-50 bg-[#070605]/85 backdrop-blur-md border-b border-[#d4af37]/20 py-2 px-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/people-choice-award" className="flex items-center gap-2.5">
              <img src="/images/inkfetish_logo.png" alt="Inkfetish" className="w-8 h-8 rounded-full border border-[#d4af37]/30" />
              <span className="font-serif text-sm font-semibold tracking-wider text-[#f3e5ab]">Inkfetish Publication</span>
            </Link>
            <span className="text-[10px] uppercase tracking-widest text-green-400 font-serif border border-green-500/40 bg-green-950/40 px-3 py-1 rounded-full">
              ✓ Entry Submitted
            </span>
          </div>
        </nav>

        <main className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 pt-10 pb-20">

          {/* Big success icon + headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 space-y-4"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#bf953f] to-[#aa771c] p-1 mx-auto shadow-[0_0_40px_rgba(212,175,55,0.5)]">
              <div className="w-full h-full rounded-full bg-[#120f0a] flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-[#d4af37]" />
              </div>
            </div>
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c]">
                Entry Submitted!
              </h1>
              <p className="mt-2 text-sm sm:text-base text-gray-300 font-light max-w-lg mx-auto">
                Your work has been officially received for the <strong className="text-[#f3e5ab]">People's Choice Award 2026</strong>. It will now go before 2,10,000+ readers.
              </p>
            </div>
          </motion.div>

          {/* Confirmation card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-gradient-to-br from-[#1c160c] via-[#120f0a] to-[#1c160c] border-2 border-[#d4af37]/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(212,175,55,0.2)] mb-6"
          >
            {/* Header */}
            <div className="text-center border-b border-[#d4af37]/25 pb-4 mb-5">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#d4af37] font-serif font-bold">
                <span>✦</span>
                <span>Official Submission Confirmation</span>
                <span>✦</span>
              </div>
            </div>

            {/* Details grid */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/50 border border-white/8 rounded-xl p-3.5">
                  <span className="text-[9px] uppercase tracking-wider text-gray-500 block mb-1">Entry Title</span>
                  <span className="font-serif font-bold text-[#f3e5ab] text-sm leading-snug">"{title}"</span>
                </div>
                <div className="bg-black/50 border border-white/8 rounded-xl p-3.5">
                  <span className="text-[9px] uppercase tracking-wider text-gray-500 block mb-1">Submission Type</span>
                  <span className="font-serif font-bold text-white text-sm capitalize">{contentType?.replace('_', ' ')}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/50 border border-white/8 rounded-xl p-3.5">
                  <span className="text-[9px] uppercase tracking-wider text-gray-500 block mb-1">Theme</span>
                  <span className="font-serif font-bold text-white text-sm">{theme}</span>
                </div>
                <div className="bg-black/50 border border-white/8 rounded-xl p-3.5">
                  <span className="text-[9px] uppercase tracking-wider text-gray-500 block mb-1">Status</span>
                  <span className="font-bold text-green-400 text-xs flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Under Review
                  </span>
                </div>
              </div>
              {nominationId && (
                <div className="bg-black/30 border border-white/5 rounded-xl p-3 text-center">
                  <span className="text-[9px] uppercase tracking-wider text-gray-500 block mb-1">Nomination ID</span>
                  <span className="font-mono text-[#d4af37] text-xs">{nominationId}</span>
                </div>
              )}
            </div>

            {/* What happens next */}
            <div className="mt-6 pt-5 border-t border-[#d4af37]/20 space-y-3">
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#d4af37] font-serif font-bold text-center">
                ✦ What Happens Next ✦
              </div>
              <div className="space-y-2.5">
                {[
                  { step: '01', text: 'Our editorial team reviews your entry within 48 hours.' },
                  { step: '02', text: 'Your work goes live for 2,10,000+ readers to vote on from 5th–8th October.' },
                  { step: '03', text: 'Top 20 winners are announced at the Live Zoom Gala on 10th October 2026.' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3 bg-black/30 rounded-xl px-4 py-3">
                    <span className="font-serif font-black text-[#d4af37] text-xs shrink-0 mt-0.5">{item.step}</span>
                    <span className="text-xs text-gray-300 leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`🏆 I just submitted my entry for the People's Choice Award 2026 by Inkfetish Publication! 2,10,000+ readers will vote from 5th–8th October. Join me → https://www.inkfetish.in/people-choice-award`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3.5 px-5 rounded-xl font-bold text-sm uppercase tracking-wider text-white bg-green-700 hover:bg-green-600 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <span>📲</span>
              <span>Share on WhatsApp</span>
            </a>
            <Link
              href="/people-choice-award"
              className="flex-1 py-3.5 px-5 rounded-xl font-bold text-sm uppercase tracking-wider text-black bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(212,175,55,0.3)]"
            >
              <span>Back to Award Page</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

        </main>
      </div>
    );
  }

  // ─── Submission Form ────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#070605] text-[#f5f0e1] font-sans relative overflow-x-hidden pb-20">
      
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,#aa771c_0%,transparent_70%)] opacity-15 blur-[100px]" />
        <div className="absolute -bottom-[15%] -right-[5%] w-[55vw] h-[55vw] rounded-full bg-[radial-gradient(circle,#d4af37_0%,transparent_70%)] opacity-10 blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#070605]/90 backdrop-blur-md border-b border-[#d4af37]/20 py-2 px-4 shadow-lg">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/people-choice-award" className="flex items-center gap-2.5">
            <img src="/images/inkfetish_logo.png" alt="Inkfetish" className="w-7 h-7 rounded-full border border-[#d4af37]/40" />
            <span className="font-serif text-sm font-semibold tracking-wider text-[#f3e5ab]">Inkfetish Publication</span>
          </Link>
          <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-serif border border-[#d4af37]/30 px-3 py-1 rounded-full">
            Entry Submission
          </span>
        </div>
      </nav>

      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 space-y-2"
        >
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#d4af37] font-serif mb-3">
            <PenTool className="w-3.5 h-3.5" />
            <span>People's Choice Award 2026</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] tracking-wide">
            Submit Your Entry
          </h1>
          <p className="text-sm text-gray-400 max-w-xl mx-auto font-light">
            Write or paste your work below. Your entry will be presented to 2,10,000+ voting readers across India.
          </p>
          {nominationId && (
            <div className="inline-flex items-center gap-1.5 text-[10px] text-gray-500 font-mono bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              <span>Nomination:</span>
              <span className="text-[#d4af37]">{nominationId}</span>
            </div>
          )}
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ── STEP 1: Submission Type ── */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-300">
              <Tag className="w-3.5 h-3.5 text-[#d4af37]" />
              Submission Type *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CONTENT_TYPES.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setContentType(type.id)}
                  className={`text-left p-4 rounded-xl border transition-all cursor-pointer group ${
                    contentType === type.id
                      ? 'bg-[#1e170e] border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.2)] ring-1 ring-[#d4af37]/30'
                      : 'bg-black/40 border-white/10 hover:border-white/25 hover:bg-black/60'
                  }`}
                >
                  <div className={`mb-2.5 ${contentType === type.id ? 'text-[#d4af37]' : 'text-gray-500 group-hover:text-gray-300'}`}>
                    {type.icon}
                  </div>
                  <div className="font-serif font-bold text-sm text-white leading-tight mb-1">{type.label}</div>
                  <div className="text-[10px] text-gray-500 leading-snug">{type.desc}</div>

                </button>
              ))}
            </div>
          </div>

          {/* ── STEP 2: Title ── */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-300">
              <Type className="w-3.5 h-3.5 text-[#d4af37]" />
              Title of Your Work *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                contentType === 'poetry' ? 'e.g. Ek Pal Ki Khwahish'
                : contentType === 'short_story' ? 'e.g. The Last Letter'
                : 'e.g. Chapter One: The Awakening'
              }
              maxLength={120}
              className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/50 transition-all font-serif"
            />
            <div className="text-right text-[10px] text-gray-600">{title.length}/120</div>
          </div>

          {/* ── STEP 3: Theme ── */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-300">
              <Hash className="w-3.5 h-3.5 text-[#d4af37]" />
              Theme / Topic *
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setThemeOpen(!themeOpen)}
                className={`w-full flex items-center justify-between bg-black/60 border rounded-xl px-4 py-3 text-sm transition-all ${
                  theme ? 'text-white border-[#d4af37]/50' : 'text-gray-600 border-white/15'
                } focus:outline-none hover:border-white/25 cursor-pointer`}
              >
                <span>{theme || 'Select the central theme of your work'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${themeOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {themeOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute top-full left-0 right-0 mt-1 bg-[#120f0a] border border-[#d4af37]/30 rounded-xl shadow-2xl z-20 overflow-hidden max-h-56 overflow-y-auto"
                  >
                    {THEMES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => { setTheme(t); setThemeOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm font-serif transition-all cursor-pointer ${
                          theme === t
                            ? 'bg-[#d4af37]/20 text-[#f3e5ab] font-bold'
                            : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── STEP 4: Rich Text Editor ── */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-300">
                <PenTool className="w-3.5 h-3.5 text-[#d4af37]" />
                Your Submission *
              </label>
              <div className="text-[11px] font-mono text-gray-500">
                {wordCount.toLocaleString()} words
              </div>
            </div>

            <div className="border border-white/15 rounded-xl overflow-hidden shadow-lg focus-within:border-[#d4af37]/60 focus-within:ring-1 focus-within:ring-[#d4af37]/30 transition-all">
              <EditorToolbar editor={editor} />
              <div className="bg-[#0c0904]">
                <EditorContent editor={editor} />
              </div>
              <div className="bg-black/40 border-t border-white/10 px-4 py-2 flex items-center gap-1.5 text-[10px] text-gray-600">
                <Info className="w-3 h-3 text-[#d4af37]/60" />
                <span>
                  {contentType === 'poetry' && 'Press Shift+Enter for a line break, Enter for a new stanza.'}
                  {contentType === 'short_story' && 'Use block quote for dialogues and emphasis.'}
                  {contentType === 'novel_excerpt' && 'Submit your strongest chapter or opening excerpt.'}
                  {!contentType && 'Select a submission type above for formatting tips.'}
                </span>
              </div>
            </div>
          </div>

          {/* ── STEP 5: Author Note (Optional) ── */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-300">
              <Info className="w-3.5 h-3.5 text-[#d4af37]" />
              Author's Note <span className="text-gray-600 normal-case font-normal">(optional)</span>
            </label>
            <textarea
              value={authorNote}
              onChange={(e) => setAuthorNote(e.target.value)}
              placeholder="Share a brief note about this piece — the inspiration, context, or anything you'd like readers to know. (Max 300 characters)"
              maxLength={300}
              rows={3}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-[#d4af37]/50 transition-all resize-none"
            />
            <div className="text-right text-[10px] text-gray-600">{authorNote.length}/300</div>
          </div>

          {/* ── Error Message ── */}
          <AnimatePresence>
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-3 bg-red-950/70 border border-red-500/40 rounded-xl p-4 text-sm text-red-200"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400" />
                <span>{errorMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Submit Button ── */}
          <button
            type="submit"
            disabled={status === 'submitting' || isOverLimit}
            className="w-full py-4 px-6 rounded-xl font-bold text-sm uppercase tracking-wider text-black bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] hover:brightness-110 active:scale-[0.99] transition-all shadow-[0_4px_20px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 min-h-[52px]"
          >
            {status === 'submitting' ? (
              <>
                <span className="w-4 h-4 border-2 border-black/50 border-t-black rounded-full animate-spin" />
                <span>Submitting Your Entry...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Entry for People's Choice Award</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-[11px] text-gray-500 text-center">
            By submitting, you confirm this is your original work and agree to Inkfetish Publication's submission guidelines.
          </p>

        </form>
      </main>

      {/* Tiptap base styles */}
      <style>{`
        .ProseMirror h2 { font-size: 1.25rem; font-weight: 700; font-family: serif; color: #f3e5ab; margin: 1rem 0 0.5rem; }
        .ProseMirror h3 { font-size: 1.1rem; font-weight: 600; font-family: serif; color: #f3e5ab; margin: 0.75rem 0 0.4rem; }
        .ProseMirror p { margin: 0.5rem 0; }
        .ProseMirror blockquote { border-left: 3px solid #d4af37; padding-left: 1rem; color: #cfc0a4; font-style: italic; margin: 0.75rem 0; }
        .ProseMirror ul { list-style: disc; padding-left: 1.5rem; }
        .ProseMirror ol { list-style: decimal; padding-left: 1.5rem; }
        .ProseMirror li { margin: 0.25rem 0; }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          color: #4b5563;
          pointer-events: none;
          float: left;
          height: 0;
        }
      `}</style>
    </div>
  );
}
