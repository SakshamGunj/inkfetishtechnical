'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Loader2, Download, Search, FileText, Lock, Users, Printer } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminClient() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  // Hidden template target data
  const [pdfData, setPdfData] = useState<any>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubmissions();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === 'ADMINPORTALINKFETISH12' || pin === '1234' || pin === 'Inkfetish2026') {
      setIsAuthenticated(true);
      toast.success("Access Granted");
    } else {
      toast.error("Invalid PIN");
    }
  };

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'honey_and_hurt_submissions')
        // orderBy('submittedAt', 'desc') // we'll sort locally to avoid index errors if not created
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Sort locally by date descending
      data.sort((a: any, b: any) => {
        const dateA = a.submittedAt ? new Date(a.submittedAt).getTime() : 0;
        const dateB = b.submittedAt ? new Date(b.submittedAt).getTime() : 0;
        return dateB - dateA;
      });

      setSubmissions(data);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      toast.error("Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };

  const generateTextContent = (sub: any, isMarkdown: boolean) => {
    if (isMarkdown) {
      return `**Author Name:** ${sub.fullName || 'N/A'}\n**Title:** ${sub.pieceTitle || 'N/A'}\n**Theme:** ${sub.theme || 'N/A'}\n\n${sub.content || ''}\n`;
    } else {
      return `Author Name: ${sub.fullName || 'N/A'}\nTitle: ${sub.pieceTitle || 'N/A'}\nTheme: ${sub.theme || 'N/A'}\n\n${sub.content || ''}\n`;
    }
  };

  const downloadFile = (content: string, filename: string, type: 'text/markdown' | 'text/plain') => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadSingle = (sub: any, format: 'md' | 'txt') => {
    const content = generateTextContent(sub, format === 'md');
    const filename = `HnH_Submission_${(sub.fullName || 'author').replace(/\s+/g, '_')}.${format}`;
    downloadFile(content, filename, format === 'md' ? 'text/markdown' : 'text/plain');
    toast.success(`Downloaded: ${sub.pieceTitle} as ${format.toUpperCase()}`);
  };

  const handleDownloadAll = (format: 'md' | 'txt') => {
    if (filteredSubmissions.length === 0) return;
    
    let combinedContent = "";
    filteredSubmissions.forEach(sub => {
      combinedContent += generateTextContent(sub, format === 'md');
      combinedContent += format === 'md' ? '\n\n<div style="page-break-after: always;"></div>\n\n' : '\n\n\n\n';
    });
    
    const filename = `HnH_All_Submissions.${format}`;
    downloadFile(combinedContent, filename, format === 'md' ? 'text/markdown' : 'text/plain');
    toast.success(`Downloaded all submissions as ${format.toUpperCase()}`);
  };

  const filteredSubmissions = submissions.filter(sub => {
    const searchStr = searchQuery.toLowerCase();
    return (
      (sub.fullName?.toLowerCase().includes(searchStr) || '') ||
      (sub.email?.toLowerCase().includes(searchStr) || '') ||
      (sub.pieceTitle?.toLowerCase().includes(searchStr) || '')
    );
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl max-w-sm w-full text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h2 className="font-cinzel text-xl font-black uppercase text-obsidian">Admin Access</h2>
            <p className="text-slate-500 font-inter text-xs mt-1">Enter PIN to view submissions</p>
          </div>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3 px-4 text-center font-bold tracking-[0.5em] text-obsidian"
            placeholder="****"
            autoFocus
          />
          <button type="submit" className="w-full bg-[#D88A06] text-obsidian py-3 rounded-xl font-bold uppercase tracking-wider">
            Enter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-inter text-slate-800 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h1 className="font-cinzel text-2xl md:text-3xl font-black uppercase text-obsidian">Honey & Hurt Submissions</h1>
            <p className="text-slate-500 font-medium text-sm flex items-center gap-2 mt-1">
              <Users className="w-4 h-4" /> Total Received: {submissions.length}
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search name, title..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 border-none rounded-xl py-2.5 pl-9 pr-4 text-sm font-medium focus:ring-2 focus:ring-[#D88A06] outline-none"
              />
            </div>
            <button 
              onClick={() => handleDownloadAll('txt')}
              disabled={filteredSubmissions.length === 0}
              className="flex items-center gap-2 bg-[#D88A06] hover:bg-amber-600 text-obsidian font-bold text-xs uppercase px-4 py-2.5 rounded-xl transition-all disabled:opacity-50 shrink-0"
            >
              <Printer className="w-4 h-4" />
              All as TXT
            </button>
            <button 
              onClick={() => handleDownloadAll('md')}
              disabled={filteredSubmissions.length === 0}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs uppercase px-4 py-2.5 rounded-xl transition-all disabled:opacity-50 shrink-0"
            >
              <Printer className="w-4 h-4" />
              All as MD
            </button>
          </div>
        </div>

        {/* Submissions List */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="p-10 flex justify-center">
              <Loader2 className="w-8 h-8 text-[#D88A06] animate-spin" />
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="p-10 text-center text-slate-500 font-medium">
              No submissions found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-100/50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-6 py-4">Author Details</th>
                    <th className="px-6 py-4">Piece Title</th>
                    <th className="px-6 py-4">Genre / Theme</th>
                    <th className="px-6 py-4">Date Submitted</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSubmissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-obsidian text-sm">{sub.fullName}</p>
                        <p className="text-xs text-slate-500">{sub.email}</p>
                        <p className="text-xs text-slate-500">+91 {sub.phone}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-cinzel font-bold text-obsidian whitespace-pre-wrap max-w-xs">{sub.pieceTitle}</p>
                        <p className="text-[10px] text-slate-400 font-mono mt-1">Word Count: {sub.content ? sub.content.trim().split(/\s+/).length : 0}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-2.5 py-1 bg-amber-50 text-amber-700 rounded-md font-bold text-[10px] uppercase tracking-wide mr-2">
                          {sub.genre}
                        </span>
                        <p className="text-xs text-slate-500 font-medium mt-1">{sub.theme}</p>
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-medium text-xs">
                        {sub.submittedAt ? new Date(sub.submittedAt).toLocaleDateString('en-IN') : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-right flex justify-end gap-2">
                        <button
                          onClick={() => handleDownloadSingle(sub, 'txt')}
                          className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] uppercase px-3 py-2 rounded-lg transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          TXT
                        </button>
                        <button
                          onClick={() => handleDownloadSingle(sub, 'md')}
                          className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-[10px] uppercase px-3 py-2 rounded-lg transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          MD
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
