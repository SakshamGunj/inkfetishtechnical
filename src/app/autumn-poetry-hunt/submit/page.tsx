"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { ArrowLeft, CheckCircle2, Bold, Italic, Underline as UnderlineIcon, AlignLeft, AlignCenter, AlignRight, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function SubmissionPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: '<p>Write your masterpiece here...</p>',
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-[400px] max-w-none text-lg leading-relaxed text-[#2C100C] [&_p]:mb-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_blockquote]:border-l-4 [&_blockquote]:border-[#8B3A2B] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:mb-4',
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !topic || !editor || editor.isEmpty) return;
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'autumn_poetry_submissions'), {
        title,
        topic,
        contentHtml: editor.getHTML(),
        contentText: editor.getText(),
        status: 'pending',
        createdAt: serverTimestamp()
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error saving submission:", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[url('/bg-texture.png')] bg-cover bg-center flex items-center justify-center p-4 md:p-6">
        <div className="bg-white/60 backdrop-blur-2xl p-10 md:p-16 rounded-[2rem] border border-white shadow-[0_20px_50px_rgba(139,58,43,0.1)] max-w-2xl w-full text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full mx-auto flex items-center justify-center mb-8 shadow-xl border-4 border-white">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-[#2C100C] to-[#5A1810] mb-4">Masterpiece Secured</h2>
          <p className="text-[#5A3828] text-lg mb-8 leading-relaxed font-medium">
            Your poem <span className="font-bold text-[#8B3A2B]">"{title}"</span> has been successfully submitted to the Autumn Poetry Hunt. Our elite jury will review your work.
          </p>
          <Link href="/autumn-poetry-hunt">
            <Button className="bg-gradient-to-r from-[#2C100C] to-[#5A1810] hover:from-black hover:to-[#2C100C] text-white px-10 py-6 text-lg rounded-xl shadow-xl transition-all hover:-translate-y-1">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url('/bg-texture.png')] bg-cover bg-center text-[#2C100C]">
      {/* Sleek Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-xl border-b border-white shadow-sm h-16 md:h-20 flex items-center px-4 md:px-8">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <Link href="/autumn-poetry-hunt" className="flex items-center gap-2 text-[#8B3A2B] hover:text-[#2C100C] transition-colors font-bold uppercase tracking-widest text-xs">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="relative w-32 h-10">
            <Image src="/logo-transparent-v2.png" alt="Logo" fill className="object-contain brightness-0" />
          </div>
          <div className="w-16"></div> {/* Spacer for centering */}
        </div>
      </header>

      <main className="pt-28 md:pt-36 pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-[#2C100C] to-[#5A1810] mb-4">
              Submit Your Verse
            </h1>
            <p className="text-[#5A3828] text-base md:text-xl font-medium">Immortalize your words. Craft your masterpiece below.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 md:p-12 border border-white shadow-[0_20px_50px_rgba(139,58,43,0.08)] space-y-10">
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="text-xs font-bold text-[#8B3A2B] uppercase tracking-widest">Poem Title</Label>
                <Input 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Whispers of the Falling Leaves" 
                  className="bg-white border-white/50 focus-visible:ring-[#8B3A2B] focus-visible:border-[#8B3A2B] text-lg py-7 px-4 rounded-xl shadow-inner font-serif"
                  required
                />
              </div>
              <div className="space-y-3">
                <Label className="text-xs font-bold text-[#8B3A2B] uppercase tracking-widest">Theme / Topic</Label>
                <Input 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Melancholy, Urban Decay, Love..." 
                  className="bg-white border-white/50 focus-visible:ring-[#8B3A2B] focus-visible:border-[#8B3A2B] text-lg py-7 px-4 rounded-xl shadow-inner font-serif"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-bold text-[#8B3A2B] uppercase tracking-widest">Your Poetry</Label>
                <span className="text-xs text-[#5A3828] font-medium opacity-70">Rich Text Supported</span>
              </div>
              
              <div className="bg-white border border-white/80 rounded-2xl overflow-hidden shadow-inner">
                {/* Custom TipTap Toolbar */}
                {editor && (
                  <div className="bg-[#fdfcfb] border-b border-[#8B3A2B]/10 p-2 md:p-3 flex items-center gap-2 flex-wrap">
                    <div className="flex bg-white shadow-sm border border-black/5 rounded-lg overflow-hidden">
                      <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBold().run()} className={`h-10 w-10 p-0 rounded-none border-r border-black/5 ${editor.isActive('bold') ? 'bg-[#8B3A2B]/10 text-[#8B3A2B]' : 'text-[#5A3828] hover:bg-[#8B3A2B]/5'}`}><Bold className="w-4 h-4" /></Button>
                      <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleItalic().run()} className={`h-10 w-10 p-0 rounded-none border-r border-black/5 ${editor.isActive('italic') ? 'bg-[#8B3A2B]/10 text-[#8B3A2B]' : 'text-[#5A3828] hover:bg-[#8B3A2B]/5'}`}><Italic className="w-4 h-4" /></Button>
                      <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleUnderline().run()} className={`h-10 w-10 p-0 rounded-none ${editor.isActive('underline') ? 'bg-[#8B3A2B]/10 text-[#8B3A2B]' : 'text-[#5A3828] hover:bg-[#8B3A2B]/5'}`}><UnderlineIcon className="w-4 h-4" /></Button>
                    </div>
                    
                    <div className="flex bg-white shadow-sm border border-black/5 rounded-lg overflow-hidden">
                      <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={`h-10 w-10 p-0 rounded-none border-r border-black/5 ${editor.isActive({ textAlign: 'left' }) ? 'bg-[#8B3A2B]/10 text-[#8B3A2B]' : 'text-[#5A3828] hover:bg-[#8B3A2B]/5'}`}><AlignLeft className="w-4 h-4" /></Button>
                      <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={`h-10 w-10 p-0 rounded-none border-r border-black/5 ${editor.isActive({ textAlign: 'center' }) ? 'bg-[#8B3A2B]/10 text-[#8B3A2B]' : 'text-[#5A3828] hover:bg-[#8B3A2B]/5'}`}><AlignCenter className="w-4 h-4" /></Button>
                      <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={`h-10 w-10 p-0 rounded-none ${editor.isActive({ textAlign: 'right' }) ? 'bg-[#8B3A2B]/10 text-[#8B3A2B]' : 'text-[#5A3828] hover:bg-[#8B3A2B]/5'}`}><AlignRight className="w-4 h-4" /></Button>
                    </div>
                  </div>
                )}
                
                <div className="p-6 md:p-10 font-serif text-lg bg-white/50">
                  <EditorContent editor={editor} />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-[#2C100C] to-[#5A1810] hover:from-black hover:to-[#2C100C] text-white text-lg md:text-xl font-bold py-8 rounded-xl shadow-xl hover:-translate-y-1 transition-all group flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:translate-y-0">
                <Send className={`w-5 h-5 md:w-6 md:h-6 text-orange-400 ${isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-1 transition-transform'}`} />
                {isSubmitting ? 'Saving to Vault...' : 'Submit For Evaluation'}
              </Button>
              <p className="text-center text-xs text-[#5A3828] font-medium mt-4 tracking-widest uppercase opacity-60">
                You cannot edit your submission once sent.
              </p>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}
