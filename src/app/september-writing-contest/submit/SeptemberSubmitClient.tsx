'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Feather, Send, Clock, BookOpen, FileText, Pen, BookMarked, ScrollText, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { db, auth } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';

const WRITING_TYPES = [
  { value: 'Poetry', label: 'Poetry', icon: Pen, desc: 'Poems, verses, haiku, free verse' },
  { value: 'Short Story', label: 'Short Story', icon: BookOpen, desc: 'Fiction under 3,000 words' },
  { value: 'Novella', label: 'Novella', icon: BookMarked, desc: 'Long-form fiction, 3,000–10,000 words' },
  { value: 'Essay', label: 'Essay', icon: FileText, desc: 'Personal, narrative or opinion essays' },
  { value: 'Micro Fiction', label: 'Micro Fiction', icon: ScrollText, desc: 'Flash fiction under 500 words' },
];

export default function SeptemberSubmitClient() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [prefilled, setPrefilled] = useState({ fullName: '', email: '', phone: '', age: '', tier: '1_entry' });
  const [entries, setEntries] = useState([
    { writingType: '', theme: '', title: '', content: '' }
  ]);

  const setEntry = (index: number, field: string, value: string) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setEntries(newEntries);
  };

  // Check auth state and load registration data
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setAuthLoading(false);
      if (u) {
        try {
          const q = query(collection(db, 'september_contest_registrations'), where('uid', '==', u.uid));
          const snap = await getDocs(q);
          if (!snap.empty) {
            const data = snap.docs[0].data();
            if (data.payment_status !== 'PAID') {
              router.push('/september-writing-contest');
              return;
            }
            setPrefilled({
              fullName: data.fullName || '',
              email: data.email || '',
              phone: data.phone || '',
              age: data.age || '',
              tier: data.tier || '1_entry'
            });
            if (data.tier === '2_entries') {
              setEntries([
                { writingType: '', theme: '', title: '', content: '' },
                { writingType: '', theme: '', title: '', content: '' }
              ]);
            }
          }
        } catch (e) {
          console.error(e);
        }
      }
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    for (let i = 0; i < entries.length; i++) {
      const { writingType, theme, title, content } = entries[i];
      if (!writingType || !theme || !title || !content) {
        setError(`Please fill in all fields for Entry ${i + 1} before submitting.`);
        return;
      }
    }
    
    setError('');
    setIsSubmitting(true);
    try {
      for (const entry of entries) {
        await addDoc(collection(db, 'september_contest_submissions'), {
          uid: user?.uid || null,
          fullName: prefilled.fullName,
          email: prefilled.email,
          phone: prefilled.phone,
          age: prefilled.age,
          writingType: entry.writingType,
          theme: entry.theme,
          title: entry.title,
          content: entry.content,
          payment_status: 'PAID',
          submittedAt: serverTimestamp(),
        });
      }
      
      const firstEntry = entries[0];
      router.push(
        `/september-writing-contest/thank-you?name=${encodeURIComponent(prefilled.fullName)}&email=${encodeURIComponent(prefilled.email)}&type=${encodeURIComponent(firstEntry.writingType)}&title=${encodeURIComponent(firstEntry.title)}`
      );
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Not logged in
  if (!authLoading && !user) {
    return (
      <div className="min-h-screen bg-[#F4EFE6] flex flex-col items-center justify-center px-4 font-serif">
        <div className="bg-[#FAF6F0] border border-[#E8DFD1] rounded-3xl shadow-xl p-10 max-w-md w-full text-center space-y-5">
          <div className="w-14 h-14 rounded-full bg-[#B91C1C] flex items-center justify-center mx-auto">
            <LogIn className="w-6 h-6 text-white" />
          </div>
          <h2 className="font-serif font-black text-2xl text-[#2C1C13] uppercase">Login Required</h2>
          <p className="font-sans text-sm text-[#6B5B4C]">
            Please register or login from the contest page to access your submission form.
          </p>
          <Button
            onClick={() => router.push('/september-writing-contest')}
            className="rounded-full bg-[#B91C1C] hover:bg-[#991515] text-white font-sans text-xs uppercase tracking-wider font-bold px-8 py-5 w-full"
          >
            Go to Contest Page
          </Button>
        </div>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#F4EFE6] flex items-center justify-center">
        <Clock className="w-6 h-6 text-[#B91C1C] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#2C1C13] font-serif selection:bg-[#B91C1C] selection:text-white">

      {/* Nav */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-[#F4EFE6]/90 border-b border-[#E3DAC9] px-4 md:px-10 py-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#B91C1C] flex items-center justify-center text-white shadow-sm">
            <Feather className="w-4 h-4" />
          </div>
          <span className="font-serif font-bold text-lg tracking-tight text-[#2C1C13]">
            InkFetish<span className="text-[#B91C1C] text-xs align-top font-sans ml-0.5">™</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-sans text-[11px] text-[#7A6B5D] hidden sm:block">
            Logged in as <strong className="text-[#2C1C13]">{prefilled.email || user?.email}</strong>
          </span>
          <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-[#B91C1C]">
            September Competition
          </span>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-10 pb-24">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-sans font-bold text-[10px] tracking-[0.4em] text-[#B91C1C] uppercase mb-3">
            S U B M I T &nbsp; Y O U R &nbsp; E N T R Y
          </p>
          <h1 className="font-serif font-black text-4xl sm:text-5xl text-[#2C1C13] uppercase leading-tight">
            SEPTEMBER<br />
            <span className="text-[#B91C1C]">WRITING</span> COMPETITION
          </h1>
          <p className="font-serif italic text-sm text-[#6B5B4C] mt-3">
            Welcome back, {prefilled.fullName || 'Writer'}. Paste your writing below.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EDE5D8] border border-[#DDD3C2] text-xs font-sans text-[#4A3B2F]">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            Submissions Open · Closes 30th September
          </div>
        </div>

        <div className="bg-[#FAF6F0] border border-[#E8DFD1] rounded-3xl shadow-xl p-6 sm:p-10 space-y-7">

          {/* Pre-filled details (read-only) */}
          <div className="space-y-3">
            <p className="font-sans font-bold text-[10px] tracking-[0.3em] text-[#7A6857] uppercase border-b border-[#E8DFD1] pb-2">
              Y O U R &nbsp; D E T A I L S
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                ['Name', prefilled.fullName],
                ['Email', prefilled.email],
                ['WhatsApp', prefilled.phone],
                ['Age', prefilled.age],
              ].map(([label, val]) => (
                <div key={label} className="bg-[#F0EAE0] border border-[#E3D8C4] rounded-xl px-4 py-3">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#9A8574] block">{label}</span>
                  <span className="font-serif text-sm font-bold text-[#2C1C13]">{val || '—'}</span>
                </div>
              ))}
            </div>
            <p className="font-sans text-[10px] text-[#9A8574]">Details from your registration · <span className="text-[#B91C1C] font-semibold">Payment: PAID ✓</span></p>
          </div>

          {entries.map((entry, index) => (
            <div key={index} className="space-y-7 pb-8 border-b border-[#E8DFD1] last:border-0 last:pb-0">
              {entries.length > 1 && (
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-px bg-[#D5C9B4] flex-1" />
                  <span className="font-serif font-black text-lg text-[#B91C1C] uppercase tracking-wider">
                    Entry {index + 1}
                  </span>
                  <div className="h-px bg-[#D5C9B4] flex-1" />
                </div>
              )}

              {/* Writing Type */}
              <div className="space-y-3">
                <p className="font-sans font-bold text-[10px] tracking-[0.3em] text-[#7A6857] uppercase border-b border-[#E8DFD1] pb-2">
                  T Y P E &nbsp; O F &nbsp; W R I T I N G *
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {WRITING_TYPES.map(({ value, label, icon: Icon, desc }) => (
                    <button key={value} type="button" onClick={() => setEntry(index, 'writingType', value)}
                      className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                        entry.writingType === value
                          ? 'border-[#B91C1C] bg-[#F7F0E6]'
                          : 'border-[#E0D4C0] bg-[#F7F2EA] hover:border-[#B91C1C]/40'
                      }`}>
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        entry.writingType === value ? 'bg-[#B91C1C] text-white' : 'bg-[#E8DEC9] text-[#2C1C13]'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-serif font-bold text-sm text-[#2C1C13] block">{label}</span>
                        <span className="font-sans text-[10px] text-[#7A6B5D]">{desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme & Title */}
              <div className="space-y-4">
                <p className="font-sans font-bold text-[10px] tracking-[0.3em] text-[#7A6857] uppercase border-b border-[#E8DFD1] pb-2">
                  E N T R Y &nbsp; D E T A I L S
                </p>
                <div>
                  <label className="text-xs font-bold text-[#4A3B2F] uppercase tracking-wider mb-1 block">Theme / Topic *</label>
                  <Input placeholder="e.g. Loss, Hope, Monsoon, Identity, Love..."
                    value={entry.theme} onChange={(e) => setEntry(index, 'theme', e.target.value)}
                    className="bg-[#F7F2EA] border-[#DCD3C3] focus:border-[#B91C1C] text-[#2C1C13] h-11 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#4A3B2F] uppercase tracking-wider mb-1 block">Title of Your Writing *</label>
                  <Input placeholder="e.g. Echoes of Autumn"
                    value={entry.title} onChange={(e) => setEntry(index, 'title', e.target.value)}
                    className="bg-[#F7F2EA] border-[#DCD3C3] focus:border-[#B91C1C] text-[#2C1C13] h-11 rounded-xl text-sm" />
                </div>
              </div>

              {/* Writing Content */}
              <div className="space-y-3">
                <p className="font-sans font-bold text-[10px] tracking-[0.3em] text-[#7A6857] uppercase border-b border-[#E8DFD1] pb-2">
                  Y O U R &nbsp; W R I T I N G *
                </p>
                <Textarea placeholder="Paste your full poem, story, essay or novella here..."
                  value={entry.content} onChange={(e) => setEntry(index, 'content', e.target.value)}
                  className="bg-[#F7F2EA] border-[#DCD3C3] focus:border-[#B91C1C] text-[#2C1C13] min-h-[260px] rounded-xl text-sm p-4 leading-relaxed" />
                <p className="font-sans text-[10px] text-[#9A8574]">
                  {entry.content.length} characters · Paste your complete manuscript
                </p>
              </div>
            </div>
          ))}

          {error && (
            <p className="font-sans text-xs text-[#B91C1C] bg-[#FEF2F2] border border-[#FECACA] rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}
              className="w-full py-6 rounded-full bg-[#B91C1C] hover:bg-[#991515] text-white font-sans text-sm uppercase tracking-wider font-bold shadow-lg transition-all hover:scale-[1.02] gap-2">
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4 animate-spin" /> Submitting Entry...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Submit My Entry
                </span>
              )}
            </Button>
            <p className="font-sans text-[11px] text-[#7A6B5D] text-center mt-3">
              🔒 Your writing is safe with us · All original rights remain with the author
            </p>
          </form>

        </div>
      </main>

      <footer className="border-t border-[#E3DAC8] bg-[#ECE5D8] py-6 px-4 text-center font-sans">
        <span className="font-serif font-bold text-sm text-[#2C1C13]">
          InkFetish<span className="text-[#B91C1C] text-xs">™</span>
        </span>
        <p className="text-[11px] text-[#7A6B5D] mt-1">© 2026 Inkfetish Publication. All rights reserved.</p>
      </footer>
    </div>
  );
}
