'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Feather, ArrowLeft, Send, Sparkles, User, Mail, Phone, Loader2, Check, Download, Eye, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { supabase } from '@/lib/supabase';
import { useEditor, EditorContent, Extension } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify, Bold, Italic, Underline as UnderlineIcon, ArrowUpDown, Type, Strikethrough, Minus, Quote, List, ListOrdered } from 'lucide-react';

// ── CUSTOM EXTENSIONS ──
const LineHeight = Extension.create({
  name: 'lineHeight',
  addOptions() {
    return { types: ['paragraph', 'heading'], defaultLineHeight: '1.15' };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: this.options.defaultLineHeight,
            parseHTML: element => element.style.lineHeight || this.options.defaultLineHeight,
            renderHTML: attributes => {
              if (attributes.lineHeight === this.options.defaultLineHeight) return {};
              return { style: `line-height: ${attributes.lineHeight}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setLineHeight: (lineHeight: string) => ({ commands }: any) => {
        return this.options.types.every((type: string) => commands.updateAttributes(type, { lineHeight }));
      },
    } as any;
  },
});

const LetterSpacing = Extension.create({
  name: 'letterSpacing',
  addOptions() {
    return { types: ['paragraph', 'heading'], defaultLetterSpacing: 'normal' };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          letterSpacing: {
            default: this.options.defaultLetterSpacing,
            parseHTML: element => element.style.letterSpacing || this.options.defaultLetterSpacing,
            renderHTML: attributes => {
              if (attributes.letterSpacing === this.options.defaultLetterSpacing) return {};
              return { style: `letter-spacing: ${attributes.letterSpacing}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setLetterSpacing: (letterSpacing: string) => ({ commands }: any) => {
        return this.options.types.every((type: string) => commands.updateAttributes(type, { letterSpacing }));
      },
    } as any;
  },
});

export default function PoetrySubmissionClient() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [checkingStorage, setCheckingStorage] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [scale, setScale] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeEditorId, setActiveEditorId] = useState<1 | 2>(1);
  const [toast, setToast] = useState<{ message: string; type: 'error' | 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'error' | 'success' | 'info' = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── TIP-TAP EDITORS ──
  const editor2 = useEditor({
    extensions: [
      StarterKit,
      Underline,
      LineHeight,
      LetterSpacing,
      TextAlign.configure({ types: ['heading', 'paragraph'] })
    ],
    content: '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'tiptap-editor outline-none h-full',
      },
      handleKeyDown: (view, event) => {
        // Allow backspace, delete, navigation, and shortcuts
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'Meta', 'Control', 'Alt', 'Shift'];
        if (allowedKeys.includes(event.key) || event.metaKey || event.ctrlKey) {
          return false; // Let Prosemirror handle it
        }
        
        // Strict Keyboard Hard Stop
        const dom = view.dom;
        if (dom.scrollHeight > dom.clientHeight + 1) {
          event.preventDefault();
          showToast('Maximum 2 pages allowed.');
          return true; // Handled! (Blocked)
        }
        return false;
      },
      handlePaste: (view, event, slice) => {
        event.preventDefault();
        const pastedText = event.clipboardData?.getData('text/plain') || '';
        if (!pastedText) return true;
        
        // Character + Layout Hybrid Limit for Pasting
        const currentChars = view.state.doc.textContent.length;
        const maxChars = 2500; // Maximized capacity for A5 physical height
        const remainingChars = Math.max(0, maxChars - currentChars);
        
        if (remainingChars === 0 || view.dom.scrollHeight > view.dom.clientHeight + 1) {
          showToast('Page 2 is completely full.');
          return true;
        }
        
        // Trim extra content before inserting
        const trimmedText = pastedText.slice(0, remainingChars);
        const { state, dispatch } = view;
        dispatch(state.tr.insertText(trimmedText));
        
        if (pastedText.length > remainingChars) {
          showToast('Pasted text was truncated to fit the 2-page limit.', 'info');
        }
        return true;
      }
    },
    onUpdate: ({ editor }) => {
      // Debounce Backup Height Detection to prevent input glitching
      setTimeout(() => {
        const dom = editor.view.dom;
        if (dom.scrollHeight > dom.clientHeight + 1) {
          // Instead of undoing the whole line/transaction, we just delete the last character typed!
          const { from } = editor.state.selection;
          if (from > 1) {
             editor.commands.deleteRange({ from: from - 1, to: from });
          }
        }
      }, 50);
      
      // If user deletes everything on Page 2, jump back to Page 1
      if (editor.isEmpty) {
        editor1?.commands.focus('end');
      }
    },
    onFocus: () => setActiveEditorId(2),
  });

  const editor1 = useEditor({
    extensions: [
      StarterKit,
      Underline,
      LineHeight,
      LetterSpacing,
      TextAlign.configure({ types: ['heading', 'paragraph'] })
    ],
    content: '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'tiptap-editor outline-none h-full',
      },
    },
    onUpdate: ({ editor }) => {
      // Debounce pagination check so it never fights active typing
      setTimeout(() => {
        const dom = editor.view.dom;
        // Buffer applied: height > clientHeight + 1
        if (dom.scrollHeight > dom.clientHeight + 1) {
          const { state } = editor;
          const { doc } = state;
          
          // Helper to check if we can move words
          const lastChild = doc.lastChild;
          if (lastChild && lastChild.isTextblock) {
            const text = lastChild.textContent;
            const lastSpaceIndex = text.lastIndexOf(' ');
            
            if (lastSpaceIndex !== -1) {
              // Extract the last word
              const lastWord = text.slice(lastSpaceIndex);
              
              // Remove last word from Page 1
              const pos = doc.content.size - lastWord.length - 1;
              editor.chain().deleteRange({ from: pos, to: doc.content.size }).run();
              
              // Add to Page 2
              if (editor2 && !editor2.isDestroyed) {
                // If Page 2 is empty, create a paragraph with the word
                // If not, prepend to first paragraph
                editor2.chain().insertContentAt(0, lastWord).focus('start').run();
              }
              return;
            }
          }

          // Fallback: If no spaces or not a textblock, move the whole node
          if (lastChild && doc.childCount > 1) {
            const docSize = doc.content.size;
            const deleteFrom = docSize - lastChild.nodeSize;
            const json = editor.getJSON();
            const lastNodeJSON = json.content.pop();
            
            editor.commands.deleteRange({ from: deleteFrom, to: docSize });
            if (editor2 && !editor2.isDestroyed) {
              editor2.commands.insertContentAt(0, lastNodeJSON);
              editor2.commands.focus('start');
            }
          } else {
            editor.commands.undo();
            setErrorMsg('Line too long. Please use Enter to move to next page.');
            setTimeout(() => setErrorMsg(''), 3000);
          }
        }
      }, 50);
    },
    onFocus: () => setActiveEditorId(1),
  });

  // Check LocalStorage on Mount
  useEffect(() => {
    const savedData = localStorage.getItem('inkfetish_s2_author');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.name && parsed.whatsapp && parsed.email) {
          setName(parsed.name);
          setWhatsapp(parsed.whatsapp);
          setEmail(parsed.email);
          setIsOnboarded(true);
        }
      } catch (e) {}
    }
    setCheckingStorage(false);
  }, []);

  // Responsive Scaling Logic for A5 pages
  useEffect(() => {
    const checkScale = () => {
      const w = window.innerWidth;
      if (w < 600) {
        // Mobile: Shrink to fit screen with minimal margin
        setScale((w - 12) / 559);
      } else if (w >= 1280) {
        // Large Desktop: Zoom in 30% for a better reading experience
        setScale(1.3);
      } else if (w >= 1024) {
        // Small Desktop: Zoom in 15%
        setScale(1.15);
      } else {
        // Tablet: Native size
        setScale(1);
      }
    };
    checkScale();
    window.addEventListener('resize', checkScale);
    return () => window.removeEventListener('resize', checkScale);
  }, []);

  const [status, setStatus] = useState<'editing' | 'confirming' | 'success'>('editing');
  const [submittedData, setSubmittedData] = useState<any>(null);

  // Restore submission status from localStorage
  useEffect(() => {
    const savedStatus = localStorage.getItem('poetry_submission_status');
    const savedData = localStorage.getItem('poetry_submission_data');
    if (savedStatus === 'success' && savedData) {
      setStatus('success');
      setSubmittedData(JSON.parse(savedData));
    }
  }, []);

  // ── SMART FLOW: PAGE 2 BACK TO PAGE 1 ──
  useEffect(() => {
    if (!editor1 || !editor2) return;

    const handleBackflow = ({ editor }: { editor: any }) => {
      const { state } = editor;
      const { selection } = state;
      
      // If at the very start of Page 2 and pressing backspace
      if (selection.empty && selection.anchor === 1 && state.doc.content.size === 2) {
        editor1.commands.focus('end');
      }
    };

    // We use a custom event or just check on update if empty
    editor2.on('selectionUpdate', handleBackflow);
    return () => {
      editor2.off('selectionUpdate', handleBackflow);
    };
  }, [editor1, editor2]);



  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const updateStats = () => {
    const text1 = editor1?.getText() || '';
    const text2 = editor2?.getText() || '';
    const fullText = (text1 + (text2 ? '\n' + text2 : '')).trim();
    
    if (!fullText) {
      setWordCount(0);
      setCharCount(0);
      return;
    }
    
    const words = fullText.match(/\S+/g);
    setWordCount(words ? words.length : 0);
    setCharCount(fullText.length);
  };

  useEffect(() => {
    if (!editor1 || !editor2) return;
    
    const triggerUpdate = () => updateStats();
    
    editor1.on('update', triggerUpdate);
    editor2.on('update', triggerUpdate);
    
    // Initial count
    triggerUpdate();
    
    return () => {
      editor1.off('update', triggerUpdate);
editor1.off('update', triggerUpdate);
      editor2.off('update', triggerUpdate);
    };
  }, [editor1, editor2]);

  const WORD_LIMIT = 600;
  const CHAR_LIMIT = 4000;

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // Clear previous errors
    setToast(null);

    if (!title.trim()) {
      showToast('Title is required. Please provide a title before submitting.');
      return;
    }

    if (!name.trim()) {
      showToast("Name is required. Please go back to the setup section.");
      return;
    }

    if (wordCount === 0) {
      showToast('Content is required. Please write your poetry before submitting.');
      return;
    }

    if (wordCount > WORD_LIMIT || charCount > CHAR_LIMIT) {
      showToast(`Entry exceeds limits (${wordCount}/${WORD_LIMIT} words).`);
      return;
    }

    setStatus('confirming');
  };

  const handleFinalSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    
    try {
      const combinedHtml = `
        <div class="poetry-page-1">${editor1?.getHTML()}</div>
        <div class="poetry-page-2">${editor2?.getHTML()}</div>
      `;

      const { data, error } = await supabase
        .from('poetry_festival_s2_submissions')
        .insert([{
          authorName: name,
          title: title,
          email,
          whatsappNumber: whatsapp,
          poetryHtml: combinedHtml,
          wordCount: wordCount,
          status: 'pending'
        }])
        .select()
        .single();

      if (error) throw error;

      // SUCCESS FLOW
      localStorage.setItem('poetry_submission_status', 'success');
      localStorage.setItem('poetry_submission_data', JSON.stringify(data));
      setSubmittedData(data);
      
      // Delay state change slightly for a smoother transition
      setTimeout(() => {
        setStatus('success');
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#EAA134', '#ffffff', '#000000']
        });
      }, 500);
      
    } catch (err: any) {
      console.error('Submission error:', err);
      showToast('Failed to submit: ' + (err.message || 'Server error'), 'error');
      // If error, stay in confirming state but stop submitting
    } finally {
      setSubmitting(false);
    }
  };

  const downloadReceipt = async () => {
    const receiptElement = document.getElementById('submission-receipt');
    if (!receiptElement) return;

    // Use a small delay to ensure the UI is stable before heavy canvas work
    setTimeout(async () => {
      try {
        const canvas = await html2canvas(receiptElement, {
          scale: 2, // 2x is plenty for a clean PDF and faster/more stable than 3x
          backgroundColor: '#050505',
          useCORS: true,
          logging: false,
          scrollX: 0,
          scrollY: -window.scrollY, // Correct for any current scroll position
          windowWidth: 600,
          windowHeight: 800
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [canvas.width, canvas.height]
        });
        
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`Inkfetish_Receipt_${submittedData?.id?.slice(0, 8) || 'S2'}.pdf`);
        showToast('Receipt downloaded successfully!', 'success');
      } catch (err) {
        console.error('PDF error:', err);
        showToast('Failed to generate PDF.', 'error');
      }
    }, 100);
  };

  const handleOnboardingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim() || !email.trim()) {
      alert("Please fill in all details to proceed.");
      return;
    }
    
    setIsRegistering(true);
    
    // Save to local storage
    localStorage.setItem('inkfetish_s2_author', JSON.stringify({
      name,
      whatsapp,
      email
    }));
    
    // Capture lead in database immediately
    try {
      const { error } = await supabase
        .from('poetry_festival_s2_registrations')
        .insert([{
          authorName: name,
          whatsappNumber: whatsapp,
          email: email
        }]);
        
      if (error) {
        console.error("Supabase insert error:", error);
        alert(`Database Error: ${error.message}\n\nPlease run the updated poetry_festival_schema.sql in your Supabase SQL Editor to create the table!`);
        setIsRegistering(false);
        return; // DO NOT MOVE AHEAD IF ERROR
      }
    } catch (err) {
      console.error("Failed to capture lead:", err);
      alert("Network or database failure. Cannot proceed.");
      setIsRegistering(false);
      return; // DO NOT MOVE AHEAD IF ERROR
    }
    
    // Cinematic delay for the loader
    setTimeout(() => {
      setIsRegistering(false);
      setIsOnboarded(true);
    }, 2000);
  };

  if (!editor1 || !editor2) return null; // Avoid SSR hydration mismatch

  if (checkingStorage) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <div className="text-gold/50 text-xs font-bold uppercase tracking-widest animate-pulse">Loading Studio...</div>
      </div>
    );
  }

  // ── CONFIRMATION MODAL ──
  const ConfirmationModal = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={() => setStatus('editing')}
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-[#161616] border border-white/10 p-8 rounded-3xl max-w-md w-full shadow-2xl text-center"
      >
        <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-gold">
          <Send className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-white mb-2">Final Submission?</h3>
        <p className="text-white/60 text-sm mb-8 leading-relaxed">
          Please review your poetry one last time. Once submitted, you won't be able to edit it further for this entry.
        </p>
        <div className="flex flex-col gap-3">
          <button 
            onClick={handleFinalSubmit}
            disabled={submitting}
            className="w-full bg-gold text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-3"
          >
            {submitting ? (
              <>
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Confirm & Submit
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </>
            )}
          </button>
          <button 
            onClick={() => setStatus('editing')}
            className="w-full bg-white/5 text-white/50 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
          >
            Back to Editing
          </button>
        </div>
      </motion.div>
    </div>
  );

  // ── SUCCESS PAGE ──
  const SuccessPage = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[110] bg-[#0f0f0f] flex flex-col items-center justify-center p-6 text-center overflow-y-auto"
    >
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl w-full"
      >
        <div className="w-24 h-24 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-8 text-gold">
          <Check className="w-12 h-12" />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Poetry Submission</h2>
        <h3 className="text-xl md:text-2xl font-serif font-bold text-gold/80 mb-6">Poetry Festival Season 2</h3>
        <p className="text-white/50 text-base md:text-lg mb-12 leading-relaxed italic max-w-lg mx-auto">
          "The ink is dry, the words are set. Your voice has joined the chorus of Inkfetish Season 2."
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5 text-left">
            <span className="text-[10px] uppercase tracking-widest text-gold block mb-1">Author</span>
            <span className="text-xl font-bold text-white">{submittedData?.authorName || name}</span>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5 text-left">
            <span className="text-[10px] uppercase tracking-widest text-gold block mb-1">Word Count</span>
            <span className="text-xl font-bold text-white">{submittedData?.wordCount || wordCount} Words</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={downloadReceipt}
            className="flex-1 bg-white text-black px-8 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-gold transition-all flex items-center justify-center gap-2 shadow-xl"
          >
            <Download className="w-4 h-4" /> Download Receipt
          </button>
          <Link 
            href={`/poetry-festival-s2/read/${submittedData?.id || ''}`}
            className="flex-1 bg-[#161616] border border-white/10 text-white px-8 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-white/5 transition-all flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" /> Read Entry
          </Link>
        </div>

        <button 
          onClick={() => {
            localStorage.removeItem('poetry_submission_status');
            localStorage.removeItem('poetry_submission_data');
            window.location.reload();
          }}
          className="mt-12 text-white/30 hover:text-white text-[10px] uppercase tracking-widest font-bold transition-colors"
        >
          Submit Another Poem
        </button>
      </motion.div>
    </motion.div>
  );

  if (!isOnboarded) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#fdfbf7] flex flex-col md:flex-row font-sans selection:bg-gold/30 selection:text-white relative overflow-x-hidden">
        
        {/* ── CINEMATIC LOADER OVERLAY ── */}
        <AnimatePresence>
          {isRegistering && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[200] bg-[#050505]/90 backdrop-blur-md flex flex-col items-center justify-center"
            >
              <Loader2 className="w-12 h-12 text-[#EAA134] animate-spin mb-6" />
              <div className="text-[#EAA134] font-black tracking-[0.3em] uppercase text-xs animate-pulse">
                Preparing The Studio...
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── CINEMATIC BACKGROUND (Left Side) ── */}
        <div className="absolute inset-y-0 left-0 w-full md:w-[60%] pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d0118] via-[#050505] to-[#080012]" />
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 blur-[150px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-indigo-900/10 blur-[130px] rounded-full" />
          
          {/* Decorative Grid Lines */}
          <div className="absolute inset-0 overflow-hidden opacity-50">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="absolute top-0 bottom-0 border-l border-white/[0.03]" style={{ left: `${25 * (i + 1)}%` }} />
            ))}
          </div>
        </div>

        {/* ── MINIMAL NAVBAR ── */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-0 inset-x-0 z-[100] flex items-center justify-center py-4 md:py-8 pointer-events-none"
        >
          <div className="flex items-center gap-2 md:gap-3 bg-[#050505]/90 backdrop-blur-xl border border-white/10 px-5 py-2 md:px-8 md:py-3 rounded-full shadow-[0_0_40px_rgba(0,0,0,0.8)]">
            <img 
              src="https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1777556045/iflogo_y3ss8e.png" 
              alt="Inkfetish Logo" 
              className="w-7 h-7 md:w-10 md:h-10 object-cover rounded-full bg-black/50"
            />
            <span className="text-[9px] md:text-xs uppercase tracking-[0.3em] font-bold text-[#fdfbf7]">
              Inkfetish Publication
            </span>
          </div>
        </motion.div>
        
        {/* ── RIGHT SIDE: ARTWORK WITH DIAGONAL CUT ── */}
        <div className="w-full md:w-[50%] md:absolute md:top-0 md:right-0 md:bottom-0 z-10 order-1 md:order-2 h-[35vh] md:h-screen relative">
          {/* Mobile fade gradient so it blends into the form */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-20 md:hidden" />
          
          {/* The Artwork */}
          <div 
            className="w-full h-full bg-cover bg-[center_top] md:bg-[center_left] md:[clip-path:polygon(15%_0,100%_0,100%_100%,0%_100%)] relative"
            style={{ 
              backgroundImage: 'url("https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1777555292/La_Polentina_-_Joey_Guidone_spmmpb.jpg")'
            }}
          >
            {/* Subtle overlay to blend colors */}
            <div className="absolute inset-0 bg-purple-900/10 mix-blend-overlay pointer-events-none" />
            {/* Inner glow on the slice edge */}
            <div className="absolute inset-0 shadow-[inset_20px_0_40px_rgba(0,0,0,0.8)] hidden md:block" />
          </div>
        </div>

        {/* ── LEFT SIDE: CONTENT & FORM ── */}
        <div className="w-full md:w-[55%] relative z-20 order-2 md:order-1 flex flex-col justify-center pb-12 pt-0 md:py-10 px-6 lg:px-16 xl:px-24 -mt-24 md:mt-0">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-lg mx-auto md:mx-0"
          >
            {/* Header */}
            <div className="space-y-4 mb-10 text-center md:text-left">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1a0a2e] to-[#0d0118] border border-purple-900/50 flex items-center justify-center mx-auto md:mx-0 shadow-[0_0_40px_rgba(88,28,135,0.3)] relative"
              >
                <Feather className="w-6 h-6 text-gold" />
                <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-black animate-pulse" />
              </motion.div>
              
              <div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-[11px] uppercase tracking-[0.4em] font-bold text-purple-400 mb-2"
                >
                  Poetry Festival • Season 2
                </motion.div>
                <h1 className="text-5xl lg:text-[70px] font-serif font-black text-[#fdfbf7] tracking-tight leading-[0.9] mb-4">
                  Writer <span className="italic text-gold">Entry.</span>
                </h1>
                <p className="text-sm text-[#888] font-light max-w-sm mx-auto md:mx-0">
                  Register your details to access the secure A5 writing dashboard.
                </p>
              </div>
            </div>
            
            {/* Form Box */}
            <div className="relative mt-2">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="bg-[#EAA134] p-6 sm:p-8 rounded-sm shadow-[0_0_50px_rgba(234,161,52,0.3)] relative z-10"
              >
                <form onSubmit={handleOnboardingSubmit} className="space-y-6 relative z-10">
                
                <div className="space-y-2 group">
                  <label className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-black font-black flex items-center justify-between">
                    <span>Full Name / Pen Name</span>
                    <Sparkles className="w-3.5 h-3.5 text-black/50" />
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="w-4 h-4 text-black/50" />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="How should we credit you?"
                      required
                      className="w-full bg-white border-2 border-transparent pl-11 pr-5 py-3.5 text-sm text-black placeholder-black/40 rounded-sm outline-none focus:border-black transition-all font-bold shadow-sm"
                    />
                  </div>
                </div>
                
                <div className="space-y-2 group">
                  <label className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-black font-black flex items-center justify-between">
                    <span>WhatsApp Number</span>
                    <Phone className="w-3.5 h-3.5 text-black/50" />
                  </label>
                  <div className="flex items-stretch relative">
                    <div className="flex items-center justify-center bg-white/90 border-2 border-transparent border-r-0 px-3 rounded-l-sm z-10 relative shadow-sm">
                      <span className="text-lg mr-1.5 leading-none">🇮🇳</span>
                      <span className="text-sm text-black font-black">+91</span>
                    </div>
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={e => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setWhatsapp(val);
                      }}
                      placeholder="10-digit mobile number"
                      pattern="[0-9]{10}"
                      required
                      className="w-full bg-white border-2 border-transparent border-l-0 pl-3 pr-5 py-3.5 text-sm text-black placeholder-black/40 rounded-r-sm outline-none focus:border-black transition-all font-bold relative shadow-sm"
                      style={{ marginLeft: '-1px' }}
                    />
                  </div>
                </div>

                <div className="space-y-2 group">
                  <label className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-black font-black flex items-center justify-between">
                    <span>Email Address</span>
                    <Mail className="w-3.5 h-3.5 text-black/50" />
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="w-4 h-4 text-black/50" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="For PDF delivery"
                      required
                      className="w-full bg-white border-2 border-transparent pl-11 pr-5 py-3.5 text-sm text-black placeholder-black/40 rounded-sm outline-none focus:border-black transition-all font-bold shadow-sm"
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <button 
                    type="submit" 
                    className="w-full relative group rounded-sm overflow-hidden shadow-2xl hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all"
                  >
                    <div className="w-full py-5 bg-[#0a0a0a] hover:bg-black text-[#EAA134] font-black uppercase tracking-[0.2em] text-xs transition-colors flex items-center justify-center gap-3">
                      ENTER THE POETRY FESTIVAL <ArrowLeft className="w-5 h-5 rotate-180" />
                    </div>
                  </button>
                </div>
              </form>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 text-[9px] uppercase tracking-[0.2em] font-bold text-[#555] text-center md:text-left"
            >
              Inkfetish Publication • Estd 2025
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#d4d4d4] font-sans selection:bg-gold/30 selection:text-white flex flex-col h-screen overflow-hidden">
      
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 w-full z-50 bg-[#0f0f0f]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group min-w-0 flex-shrink">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105 shrink-0 border border-white/10 shadow-lg">
              <img 
                src="https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1777556045/iflogo_y3ss8e.png" 
                alt="Inkfetish Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif font-bold text-white leading-tight text-sm sm:text-base whitespace-nowrap">Poetry Festival Season 2</span>
              <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-widest text-gold whitespace-nowrap">Inkfetish Publication</span>
            </div>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className={`text-[10px] font-bold uppercase tracking-widest flex flex-col items-end gap-0.5 hidden sm:flex`}>
              <span className={wordCount > WORD_LIMIT ? 'text-red-500' : 'text-gold/80'}>{wordCount} / {WORD_LIMIT} Words</span>
              <span className={charCount > CHAR_LIMIT ? 'text-red-500' : 'text-white/30'}>{charCount} / {CHAR_LIMIT} Chars</span>
            </div>
            <button 
              onClick={handleSubmit}
              disabled={submitting || wordCount === 0 || !name.trim()}
              className="flex items-center justify-center gap-2 bg-gold text-black px-6 sm:px-10 py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg whitespace-nowrap min-w-[80px] sm:min-w-[140px]"
            >
              <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">{submitting ? 'Submitting...' : 'Submit Entry'}</span>
              <span className="sm:hidden">{submitting ? '...' : 'Submit'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── TOOLBAR ── */}
      <div className="fixed top-16 w-full z-40 bg-[#161616] border-b border-white/5 shadow-xl transition-all">
        <div className="max-w-[1000px] mx-auto px-4 py-2 sm:h-12 flex flex-wrap items-center justify-center sm:justify-between gap-y-2 gap-x-4">
          
          {(() => {
            const activeEditor = activeEditorId === 1 ? editor1 : editor2;
            return (
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 w-full">
                {/* ── ROW 1: PRIMARY FORMATTING ── */}
                <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
                  {/* Text Styles */}
                  <div className="flex items-center gap-1 bg-white/5 rounded-md p-1 shrink-0">
                    <button 
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => activeEditor.chain().focus().toggleBold().run()} 
                      className={`p-1.5 rounded transition-colors ${activeEditor.isActive('bold') ? 'bg-white/20 text-white shadow-sm' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
                      title="Bold"
                    >
                      <Bold className="w-4 h-4" />
                    </button>
                    <button 
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => activeEditor.chain().focus().toggleItalic().run()} 
                      className={`p-1.5 rounded transition-colors ${activeEditor.isActive('italic') ? 'bg-white/20 text-white shadow-sm' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
                      title="Italic"
                    >
                      <Italic className="w-4 h-4" />
                    </button>
                    <button 
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => activeEditor.chain().focus().toggleUnderline().run()} 
                      className={`p-1.5 rounded transition-colors ${activeEditor.isActive('underline') ? 'bg-white/20 text-white shadow-sm' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
                      title="Underline"
                    >
                      <UnderlineIcon className="w-4 h-4" />
                    </button>
                    <button 
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => activeEditor.chain().focus().toggleStrike().run()} 
                      className={`p-1.5 rounded transition-colors ${activeEditor.isActive('strike') ? 'bg-white/20 text-white shadow-sm' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
                      title="Strikethrough"
                    >
                      <Strikethrough className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="w-px h-6 bg-white/10 mx-1 shrink-0 hidden sm:block"></div>

                  {/* Blocks & Lists */}
                  <div className="flex items-center gap-1 bg-white/5 rounded-md p-1 shrink-0">
                    <button 
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => activeEditor.chain().focus().toggleBlockquote().run()} 
                      className={`p-1.5 rounded transition-colors ${activeEditor.isActive('blockquote') ? 'bg-white/20 text-white shadow-sm' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
                      title="Quote"
                    >
                      <Quote className="w-4 h-4" />
                    </button>
                    <button 
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => activeEditor.chain().focus().setHorizontalRule().run()} 
                      className="p-1.5 rounded transition-colors text-white/50 hover:bg-white/10 hover:text-white"
                      title="Horizontal Line"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <button 
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => activeEditor.chain().focus().toggleBulletList().run()} 
                      className={`p-1.5 rounded transition-colors ${activeEditor.isActive('bulletList') ? 'bg-white/20 text-white shadow-sm' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
                      title="Bullet List"
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button 
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => activeEditor.chain().focus().toggleOrderedList().run()} 
                      className={`p-1.5 rounded transition-colors ${activeEditor.isActive('orderedList') ? 'bg-white/20 text-white shadow-sm' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
                      title="Numbered List"
                    >
                      <ListOrdered className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Alignment */}
                  <div className="flex items-center gap-1 bg-white/5 rounded-md p-1 shrink-0">
                    <button 
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => activeEditor.chain().focus().setTextAlign('left').run()} 
                      className={`p-1.5 rounded transition-colors ${activeEditor.isActive({ textAlign: 'left' }) ? 'bg-white/20 text-white shadow-sm' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
                      title="Align Left"
                    >
                      <AlignLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => activeEditor.chain().focus().setTextAlign('center').run()} 
                      className={`p-1.5 rounded transition-colors ${activeEditor.isActive({ textAlign: 'center' }) ? 'bg-white/20 text-white shadow-sm' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
                      title="Align Center"
                    >
                      <AlignCenter className="w-4 h-4" />
                    </button>
                    <button 
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => activeEditor.chain().focus().setTextAlign('right').run()} 
                      className={`p-1.5 rounded transition-colors ${activeEditor.isActive({ textAlign: 'right' }) ? 'bg-white/20 text-white shadow-sm' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
                      title="Align Right"
                    >
                      <AlignRight className="w-4 h-4" />
                    </button>
                    <button 
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => activeEditor.chain().focus().setTextAlign('justify').run()} 
                      className={`p-1.5 rounded transition-colors ${activeEditor.isActive({ textAlign: 'justify' }) ? 'bg-white/20 text-white shadow-sm' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
                      title="Justify"
                    >
                      <AlignJustify className="w-4 h-4" />
                    </button>

                    {/* Compact Toolbar Counter (Mobile Only) */}
                    <div className="sm:hidden flex items-center gap-2 bg-white/10 px-2 py-1 rounded ml-1 border border-white/5">
                      <span className={`text-[8px] font-bold ${wordCount > WORD_LIMIT ? 'text-red-500' : 'text-gold'}`}>{wordCount} Words</span>
                      <div className="w-px h-2.5 bg-white/20"></div>
                      <span className={`text-[8px] font-bold ${charCount > CHAR_LIMIT ? 'text-red-500' : 'text-white/50'}`}>{charCount} Chars</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
        

      </div>

      {/* ── WORKSPACE (Scrollable) ── */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#0f0f0f] pt-40 sm:pt-36 pb-24 custom-scrollbar flex flex-col items-center">
        
        <div className="flex flex-col gap-12 items-center" style={{ width: '559px' }}>
          
          {/* ── PAGE 1 ── */}
          <div className="relative page-wrapper" style={{ 
            width: '559px', 
            height: '794px',
            transform: `scale(${scale})`, 
            transformOrigin: 'top center',
            marginBottom: `${794 * (scale - 1)}px`
          }}>
            <div className="absolute -top-6 left-0 text-white/30 text-[10px] font-bold uppercase tracking-widest">Page 1</div>
            
            <div className="w-full h-full bg-white text-black shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col p-[64px] box-border !overflow-hidden page-content-box">
              
              {/* Document Header Fields */}
              <div className="flex flex-col items-end space-y-1 shrink-0 mb-4">
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title of your poem"
                  className="w-full font-serif text-xl font-bold bg-transparent border-none outline-none placeholder:text-black/20 text-right"
                />
                <div className="flex items-center justify-end gap-2 w-full">
                  <span className="font-serif italic text-black/60 text-sm">By</span>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="font-serif italic text-sm bg-transparent border-b border-black/10 focus:border-black/30 outline-none placeholder:text-black/20 text-right w-[350px] transition-colors"
                  />
                </div>
              </div>

              {/* TipTap Editor Page 1 */}
              <div className="flex-1 overflow-hidden">
                <EditorContent editor={editor1} className="h-full" />
              </div>
            </div>
          </div>

          {/* ── PAGE 2 ── */}
          <div className="relative page-wrapper" style={{ 
            width: '559px', 
            height: '794px',
            transform: `scale(${scale})`, 
            transformOrigin: 'top center',
            marginBottom: `${794 * (scale - 1)}px`
          }}>
            <div className="absolute -top-6 left-0 text-white/30 text-[10px] font-bold uppercase tracking-widest">Page 2</div>
            
            <div className="w-full h-full bg-white text-black shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col p-[64px] box-border !overflow-hidden page-content-box">
              {/* TipTap Editor Page 2 */}
              <div className="flex-1 overflow-hidden">
                <EditorContent editor={editor2} className="h-full" />
              </div>
            </div>
          </div>
          
        </div>
        
        <div className="text-center text-white/30 text-[10px] font-bold uppercase tracking-widest mt-20">
          Max 2 Pages • A5 Format • TipTap Engine
        </div>

        {/* Dashboard Return Button */}
        <div className="mt-12 flex justify-center pb-24">
          <Link href="/poetry-festival-s2" className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-white/50 hover:text-white transition-colors bg-white/5 px-6 py-3 rounded-full">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </main>

      {/* ── FLOATING OVERLAY SUBMIT BUTTON ── */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex flex-col items-center gap-2">
         <button 
           onClick={handleSubmit}
           disabled={submitting || wordCount === 0 || !name.trim()}
           className="pointer-events-auto flex items-center justify-center gap-2 bg-gold text-black px-8 py-3 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-white hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all shadow-[0_10px_40px_rgba(234,161,52,0.4)] whitespace-nowrap"
         >
           <Send className="w-3.5 h-3.5" />
           {submitting ? 'Submitting...' : 'Submit Entry'}
         </button>
      </div>

      {/* ── TOAST NOTIFICATION ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 20, x: '-50%', opacity: 0 }}
            animate={{ y: 0, x: '-50%', opacity: 1 }}
            exit={{ y: 20, x: '-50%', opacity: 0 }}
            className="fixed bottom-24 left-1/2 z-[200] bg-black border border-white/10 px-5 py-4 rounded-2xl shadow-2xl flex flex-col gap-2 w-[85%] sm:w-auto sm:min-w-[350px] max-w-[450px]"
          >
            <div className="flex items-center gap-3">
              <div className={`shrink-0 w-2.5 h-2.5 rounded-full ${toast.type === 'error' ? 'bg-red-500 animate-pulse' : (toast.type === 'success' ? 'bg-green-500' : 'bg-gold')}`} />
              <span className="text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-widest leading-tight">
                {toast.message}
              </span>
            </div>
            <motion.div 
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 3, ease: 'linear' }}
              className="h-1 bg-gold rounded-full opacity-60"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MODALS & OVERLAYS ── */}
      <AnimatePresence mode="wait">
        {status === 'confirming' && (
          <motion.div 
            key="confirm-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          >
            <div 
              className="absolute inset-0" 
              onClick={() => setStatus('editing')}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#161616] border border-white/10 p-8 rounded-3xl max-w-md w-full shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-gold">
                <Send className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-2">Final Submission?</h3>
              <p className="text-white/60 text-sm mb-8 leading-relaxed">
                Please review your poetry one last time. Once submitted, you won't be able to edit it further for this entry.
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleFinalSubmit}
                  disabled={submitting}
                  className="w-full bg-gold text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-3"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Confirm & Submit
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </>
                  )}
                </button>
                <button 
                  onClick={() => setStatus('editing')}
                  className="w-full bg-white/5 text-white/50 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                  Back to Editing
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {status === 'success' && (
          <motion.div 
            key="success-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110]"
          >
            <SuccessPage />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HIDDEN RECEIPT TEMPLATE (For PDF Generation) ── */}
      <div className="fixed left-[-9999px] top-[-9999px]">
        <div id="submission-receipt" className="w-[600px] bg-[#050505] text-white p-16 font-serif relative overflow-hidden border-[12px] border-[#1a1a1a]">
          {/* Background Accents */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[80px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 blur-[80px] rounded-full" />
          
          {/* Border Frame */}
          <div className="absolute inset-4 border border-gold/20 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6 border border-gold/20">
              <Feather className="text-gold w-8 h-8" />
            </div>
            
            <span className="text-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-2">Official Submission Receipt</span>
            <h2 className="text-4xl font-bold mb-1 tracking-tight">Poetry Festival</h2>
            <h3 className="text-xl text-gold/80 mb-12 tracking-[0.1em]">Season 2 • Editorial Board</h3>
            
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-12" />
            
            <div className="space-y-8 mb-16">
              <div>
                <span className="block text-gold/40 text-[9px] uppercase tracking-widest mb-1">Authenticated For</span>
                <span className="text-3xl font-bold">{submittedData?.authorName || name}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <span className="block text-gold/40 text-[9px] uppercase tracking-widest mb-1">Poem Title</span>
                  <span className="text-lg font-bold">{submittedData?.title || title}</span>
                </div>
                <div>
                  <span className="block text-gold/40 text-[9px] uppercase tracking-widest mb-1">Word Count</span>
                  <span className="text-lg font-bold">{submittedData?.wordCount || wordCount} Words</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center mb-16">
               <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-xl mb-4">
                 <span className="block text-gold/40 text-[8px] uppercase tracking-widest mb-1">Unique Submission ID</span>
                 <span className="text-[12px] font-mono font-bold text-gold">{submittedData?.id || 'PENDING_AUTH_02'}</span>
               </div>
               <span className="text-[10px] text-white/30 italic">Validated by Inkfetish Publication House</span>
            </div>

            <div className="w-full flex justify-between items-end border-t border-white/10 pt-12">
              <div className="text-left">
                <span className="block text-gold/40 text-[8px] uppercase tracking-widest mb-1">Date of Entry</span>
                <span className="text-[11px] font-bold">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="text-right">
                <div className="w-32 h-px bg-white/20 mb-2 mx-auto md:mr-0" />
                <span className="block text-gold/40 text-[8px] uppercase tracking-widest">Editorial Seal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── STYLES ── */}
      <style dangerouslySetInnerHTML={{__html: `
        /* Prevent scroll bleed */
        html, body {
          overflow-x: hidden;
        }

        .page-wrapper * {
          box-sizing: border-box;
        }

        /* Scrollbar for workspace */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0f0f0f;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2a2a2a;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3a3a3a;
        }

        /* TipTap Core Styles */
        .tiptap-editor {
          font-family: 'Times New Roman', Times, serif;
          font-size: 16px;
          line-height: 1.15;
          cursor: text;
          height: 100%;
          overflow: hidden !important;
        }
        
        .tiptap-editor p {
          margin: 0 0 0.4em 0;
        }

        @media (max-width: 600px) {
          .tiptap-editor {
            font-size: 18px;
          }
          .page-content-box {
            padding: 32px !important;
          }
        }
        
        .tiptap-editor p:last-child {
          margin-bottom: 0;
        }
        
        .tiptap-editor.ProseMirror-focused {
          outline: none;
        }
        
        .tiptap-editor p.is-editor-empty:first-child::before {
          color: rgba(0,0,0,0.3);
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }

        /* TipTap Block Elements */
        .tiptap-editor blockquote {
          border-left: 3px solid rgba(0,0,0,0.2);
          padding-left: 1rem;
          margin-left: 0;
          margin-right: 0;
          font-style: italic;
          color: rgba(0,0,0,0.7);
        }
        
        .tiptap-editor hr {
          border: none;
          border-top: 1px solid rgba(0,0,0,0.2);
          margin: 2rem 0;
        }
        
        .tiptap-editor ul, .tiptap-editor ol {
          padding-left: 1.5rem;
          margin-bottom: 1em;
        }
        
        .tiptap-editor ul {
          list-style-type: disc;
        }
        
        .tiptap-editor ol {
          list-style-type: decimal;
        }
      `}} />
    </div>
  );
}
