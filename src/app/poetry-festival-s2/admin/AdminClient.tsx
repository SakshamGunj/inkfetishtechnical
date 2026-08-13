'use client';

import React, { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { Lock, FileText, Download, ArrowLeft, Loader2, BookOpen } from 'lucide-react';

interface Submission {
  id: string;
  authorName: string;
  title: string;
  poetryHtml: string;
  wordCount: number;
  whatsappNumber: string;
  email: string;
  status: string;
  created_at: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// HTML → plain-text line extractor
// Preserves paragraph / line-break structure from TipTap HTML output
// ─────────────────────────────────────────────────────────────────────────────
function htmlToLines(html: string): string[] {
  // Replace block-level closing tags with a newline marker before stripping
  const withBreaks = html
    .replace(/<\/p>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<\/h[1-6]>/gi, '\n\n')
    .replace(/<hr[^>]*>/gi, '───────────────────────\n')
    .replace(/<[^>]+>/g, ''); // strip remaining tags

  // Decode common HTML entities
  const decoded = withBreaks
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '\u2014')
    .replace(/&ndash;/g, '\u2013')
    .replace(/&ldquo;/g, '\u201C')
    .replace(/&rdquo;/g, '\u201D')
    .replace(/&lsquo;/g, '\u2018')
    .replace(/&rsquo;/g, '\u2019');

  // Split into lines, trim trailing spaces but keep empty lines (stanza breaks)
  return decoded.split('\n').map((l) => l.trimEnd());
}


// Build a print-ready HTML page for one or all submissions
// Uses the browser's own rendering — supports ALL languages/scripts natively
// ─────────────────────────────────────────────────────────────────────────────
const PRINT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&family=Noto+Sans:ital,wght@0,400;0,700;1,400&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  @page {
    size: A5 portrait;
    margin: 16mm 16mm 16mm 16mm;
  }

  body {
    font-family: 'Noto Serif', 'Times New Roman', serif;
    font-size: 10.5pt;
    line-height: 1.75;
    color: #000;
    background: #fff;
  }

  .submission {
    page-break-before: always;
  }
  .submission:first-child {
    page-break-before: avoid;
  }

  .submission-header {
    text-align: right;
    margin-bottom: 10pt;
    padding-bottom: 8pt;
    border-bottom: 0.5pt solid #bbb;
  }
  .submission-title {
    font-size: 15pt;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 3pt;
  }
  .submission-author {
    font-size: 10pt;
    font-style: italic;
    color: #555;
  }

  .submission-body {
    margin-top: 10pt;
    font-family: 'Noto Serif', 'Times New Roman', serif;
    font-size: 10.5pt;
    line-height: 1.75;
  }
  .submission-body p {
    margin: 0;
    min-height: 1em;
  }
  .submission-body strong { font-weight: bold; }
  .submission-body em { font-style: italic; }
  .submission-body u { text-decoration: underline; }
  .submission-body blockquote {
    border-left: 2pt solid #ccc;
    padding-left: 12pt;
    font-style: italic;
    color: #444;
    margin: 6pt 0;
  }

  .print-bar {
    position: fixed;
    top: 0; left: 0; right: 0;
    background: #1a1a1a;
    color: #fff;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: sans-serif;
    font-size: 13px;
    z-index: 9999;
    box-shadow: 0 2px 12px rgba(0,0,0,0.4);
  }
  .print-bar button {
    background: #c9a84c;
    color: #000;
    border: none;
    padding: 8px 20px;
    font-weight: 700;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    border-radius: 3px;
  }
  .print-bar button:hover { background: #e0bf6e; }

  @media print {
    .print-bar { display: none !important; }
    body { padding-top: 0; }
  }
`;

function openPrintWindow(submissions: Submission[], single?: Submission) {
  const list = single ? [single] : submissions;

  const submissionsHtml = list.map((sub, i) => `
    <div class="submission">
      <div class="submission-header">
        <div class="submission-title">${sub.title || 'Untitled'}</div>
        <div class="submission-author">By ${sub.authorName || 'Unknown'}</div>
      </div>
      <div class="submission-body">${sub.poetryHtml || ''}</div>
    </div>
  `).join('\n');

  const label = single
    ? `${single.authorName} — ${single.title}`
    : `Master Anthology (${submissions.length} submissions)`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${label}</title>
  <style>${PRINT_STYLES}</style>
</head>
<body>
  <div class="print-bar">
    <span>📖 ${label}</span>
    <button onclick="window.print()">⬇ Save as PDF / Print</button>
  </div>
  <div style="padding-top: 52px;">
    ${submissionsHtml}
  </div>
</body>
</html>`;

  const win = window.open('', '_blank');
  if (!win) { alert('Popup blocked. Please allow popups for this page.'); return; }
  win.document.write(html);
  
  const scriptEl = win.document.createElement('script');
  scriptEl.textContent = `
    window.addEventListener('load', () => {
      setTimeout(() => {
        if (document.fonts && document.fonts.ready) {
          document.fonts.ready.then(() => window.print());
        } else {
          window.print();
        }
      }, 800);
    });
  `;
  win.document.body.appendChild(scriptEl);
  win.document.close();
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export default function AdminClient() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);

  const paperRef = useRef<HTMLDivElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'ADMINPORTALINKFETISH12' || password === 'admin123') {
      setAuthenticated(true);
      fetchSubmissions();
    } else {
      alert('Incorrect password');
    }
  };

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('poetry_festival_s2_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      alert('Error fetching submissions from Supabase.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = () => {
    if (!selectedSubmission) return;
    openPrintWindow(submissions, selectedSubmission);
  };

  const handleMasterDownload = () => {
    if (submissions.length === 0) { alert('No submissions to compile!'); return; }
    openPrintWindow(submissions);
  };


  // ── LOGIN ──
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center font-sans">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-[#0a0a0a] border border-white/10 p-8 rounded-sm shadow-2xl space-y-6">
          <div className="text-center">
            <Lock className="w-6 h-6 text-gold mx-auto mb-3" />
            <h1 className="text-white font-bold uppercase tracking-widest text-sm">Editor Dashboard</h1>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Master Password"
            className="w-full bg-[#050505] border border-white/10 px-4 py-3 text-sm text-white focus:border-gold outline-none rounded-sm transition-colors text-center"
          />
          <button type="submit" className="w-full bg-gold hover:bg-[#ebd298] text-black font-bold uppercase tracking-widest text-xs py-3 rounded-sm transition-colors">
            Access Terminal
          </button>
        </form>
      </div>
    );
  }

  // ── DASHBOARD ──
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row font-sans overflow-hidden">

      {/* SIDEBAR */}
      <div className={`w-full md:w-80 shrink-0 border-r border-white/10 flex-col h-screen bg-[#0a0a0a] z-20 ${selectedSubmission ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-white/10 shrink-0 bg-[#050505]">
          <h2 className="font-bold uppercase tracking-widest text-xs text-gold flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Editorial Queue
          </h2>
          <div className="text-[10px] text-[#555] uppercase tracking-wider mt-1">{submissions.length} Submissions Found</div>
        </div>

        {/* Master Download */}
        <div className="p-4 border-b border-white/10 shrink-0 bg-[#111]">
          <button
            onClick={handleMasterDownload}
            disabled={isCompiling || submissions.length === 0}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-sm transition-colors disabled:opacity-50"
          >
            {isCompiling
              ? <Loader2 className="w-4 h-4 animate-spin" />
              : <Download className="w-4 h-4" />}
            Download Full Anthology PDF
          </button>
          <p className="text-[9px] text-[#555] text-center mt-2 uppercase tracking-wider">
            Reads directly from database — fast
          </p>
        </div>

        {/* Submission list */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-32 text-[#555]">
              <Loader2 className="w-5 h-5 animate-spin mb-2" />
              <span className="text-xs">Loading poems...</span>
            </div>
          ) : submissions.length === 0 ? (
            <div className="p-6 text-center text-[#555] text-xs">No submissions yet.</div>
          ) : (
            <div className="divide-y divide-white/5">
              {submissions.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubmission(sub)}
                  className={`w-full text-left p-4 hover:bg-white/5 transition-colors flex items-start gap-3 ${selectedSubmission?.id === sub.id ? 'bg-white/5 border-l-2 border-gold' : 'border-l-2 border-transparent'}`}
                >
                  <FileText className={`w-4 h-4 shrink-0 mt-0.5 ${selectedSubmission?.id === sub.id ? 'text-gold' : 'text-[#555]'}`} />
                  <div className="min-w-0">
                    <div className="text-sm font-bold truncate text-white">{sub.title}</div>
                    <div className="text-xs text-[#888] truncate mt-0.5">By {sub.authorName}</div>
                    <div className="text-[10px] text-[#444] mt-2 uppercase tracking-widest">{sub.wordCount} words</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className={`flex-1 h-screen flex-col bg-[#0f0f0f] relative z-10 ${!selectedSubmission ? 'hidden md:flex' : 'flex'}`}>
        {selectedSubmission ? (
          <>
            {/* Toolbar */}
            <div className="shrink-0 h-16 border-b border-white/10 bg-[#0a0a0a] flex items-center justify-between px-4 sm:px-6">
              <div className="flex items-center gap-4">
                <button onClick={() => setSelectedSubmission(null)} className="md:hidden text-white/50 hover:text-white">
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="flex flex-col">
                  <div className="text-xs font-bold uppercase tracking-widest text-white/50">
                    Viewing: <span className="text-gold">{selectedSubmission.authorName}</span>
                  </div>
                  {(selectedSubmission.whatsappNumber || selectedSubmission.email) && (
                    <div className="text-[9px] text-[#555] uppercase tracking-wider mt-0.5 flex gap-3">
                      {selectedSubmission.whatsappNumber && <span>📞 {selectedSubmission.whatsappNumber}</span>}
                      {selectedSubmission.email && <span>✉️ {selectedSubmission.email}</span>}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={handleDownloadPdf}
                disabled={isCompiling}
                className="flex items-center gap-2 bg-gold hover:bg-[#ebd298] text-black px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors shadow-lg disabled:opacity-50"
              >
                {isCompiling ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">Export Single PDF</span>
              </button>
            </div>

            {/* A5 Preview */}
            <div className="flex-1 overflow-auto bg-[#0f0f0f] custom-scrollbar relative">
              <div className="min-w-[600px] p-4 sm:p-10 flex flex-col items-center justify-start gap-12 absolute inset-0">
                <div ref={paperRef} className="bg-transparent shrink-0">
                  <div
                    className="bg-white text-black relative mx-auto"
                    style={{
                      width: '559px',
                      minHeight: '794px',
                      padding: '64px',
                      fontFamily: '"Times New Roman", Times, serif',
                      lineHeight: '1.5',
                      fontSize: '12px',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                      boxSizing: 'border-box',
                    }}
                  >
                    <div className="flex flex-col items-end space-y-1 shrink-0 mb-4">
                      <div className="w-full font-serif text-xl font-bold text-right">{selectedSubmission.title}</div>
                      <div className="flex items-center justify-end gap-2 w-full">
                        <span className="font-serif italic text-black/60 text-sm">By</span>
                        <div className="font-serif italic text-sm text-right w-[350px]">{selectedSubmission.authorName}</div>
                      </div>
                    </div>
                    <div
                      className="parsed-tiptap-content"
                      style={{ wordWrap: 'break-word' }}
                      dangerouslySetInnerHTML={{ __html: selectedSubmission.poetryHtml }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-[#555]">
            <FileText className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-sm">Select a submission from the sidebar to view &amp; export.</p>
          </div>
        )}
      </div>




      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0f0f0f; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 4px; }
        .parsed-tiptap-content p { margin-bottom: 0; min-height: 1.5em; }
        .parsed-tiptap-content strong { font-weight: bold; }
        .parsed-tiptap-content em { font-style: italic; }
        .parsed-tiptap-content u { text-decoration: underline; }
        .parsed-tiptap-content s { text-decoration: line-through; }
        .parsed-tiptap-content blockquote {
          border-left: 3px solid rgba(0,0,0,0.2);
          padding-left: 1rem;
          margin-left: 0;
          font-style: italic;
          color: rgba(0,0,0,0.7);
        }
        .parsed-tiptap-content hr { border: none; border-top: 1px solid rgba(0,0,0,0.2); margin: 2rem 0; }
        .parsed-tiptap-content ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
        .parsed-tiptap-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
      `}} />
    </div>
  );
}
