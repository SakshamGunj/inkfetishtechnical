'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Feather, ArrowLeft, ArrowRight, Send, Sparkles, User, Mail, Phone, Loader2, Check, Download, Eye, FileText } from 'lucide-react';
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

// ── PAYMENT SESSION — persisted across page reloads ──
type PaymentStatus = 'idle' | 'creating' | 'paying' | 'verifying' | 'paid' | 'failed' | 'cancelled';
type PoemSession = {
  orderId: string;
  plan: 'single' | 'double';
  paymentStatus: 'PAID';
  name: string;
  email: string;
  whatsapp: string;
  amount: number;
  poem1?: { id: string; title: string; wordCount: number };
  poem2?: { id: string; title: string; wordCount: number };
};

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
  const [plan, setPlan] = useState<'single' | 'double' | null>(null);
  const [step, setStep] = useState<'setup' | 'plan'>('setup');

  // ── PAYMENT STATE MACHINE ──
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [poemSession, setPoemSession] = useState<PoemSession | null>(null);
  // For ₹399 double plan: which poem is user currently writing
  const [activePoemSlot, setActivePoemSlot] = useState<1 | 2>(1);
  // Editor mode: 'dashboard' = choosing which poem to write, 'writing' = in editor
  const [editorMode, setEditorMode] = useState<'dashboard' | 'writing'>('writing');

  const showToast = (message: string, type: 'error' | 'success' | 'info' = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const [cashfree, setCashfree] = useState<any>(null);

  // ── LOAD CASHFREE SDK (once, guarded against double-load) ──
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Cashfree) {
      setCashfree((window as any).Cashfree({ 
        mode: process.env.NEXT_PUBLIC_CASHFREE_MODE || 'sandbox' 
      }));
      return;
    }
    const script = document.createElement('script');
    script.id = 'cashfree-sdk';
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.async = true;
    script.onload = () => {
      setCashfree((window as any).Cashfree({ 
        mode: process.env.NEXT_PUBLIC_CASHFREE_MODE || 'sandbox' 
      }));
    };
    if (!document.getElementById('cashfree-sdk')) {
      document.head.appendChild(script);
    }
  }, []);

  // ── RESTORE SESSION FROM LOCALSTORAGE ON MOUNT ──
  // This is the key for enterprise-grade resilience: if user paid and closed the tab,
  // they come back and we re-verify from the server before granting access.
  useEffect(() => {
    const checkExistingSession = async () => {
      const savedSession = localStorage.getItem('pfs2_payment_session');
      if (savedSession) {
        try {
          const parsed: PoemSession = JSON.parse(savedSession);
          // Re-verify with backend — never trust localStorage alone
          const verifyRes = await fetch(`/api/cashfree/verify-order?order_id=${parsed.orderId}`);
          const verifyData = await verifyRes.json();
          if (verifyData.order_status === 'PAID') {
            // Restore session — user has already paid
            setPoemSession(parsed);
            setName(parsed.name);
            setEmail(parsed.email);
            setWhatsapp(parsed.whatsapp);
            setPlan(parsed.plan);
            setPaymentStatus('paid');
            setIsOnboarded(true);
            // For double plan: check if both poems are submitted
            if (parsed.plan === 'double' && parsed.poem1 && parsed.poem2) {
              // Both submitted — show final success
              setStatus('success');
            } else if (parsed.plan === 'double') {
              // Partially submitted — show dashboard
              setEditorMode('dashboard');
            }
            // For single plan: if poem submitted, show success
            if (parsed.plan === 'single' && parsed.poem1) {
              setStatus('success');
              setSubmittedData(parsed.poem1);
            }
          } else {
            // Payment not confirmed — clean up stale session
            localStorage.removeItem('pfs2_payment_session');
          }
        } catch (e) {
          localStorage.removeItem('pfs2_payment_session');
        }
      }

      // Also restore author info
      const savedAuthor = localStorage.getItem('inkfetish_s2_author');
      if (savedAuthor) {
        try {
          const parsed = JSON.parse(savedAuthor);
          if (parsed.name) setName(parsed.name);
          if (parsed.whatsapp) setWhatsapp(parsed.whatsapp);
          if (parsed.email) setEmail(parsed.email);
          // ✅ RETURNING USER: skip registration, go straight to plan selection
          // (They already registered; they just haven't paid yet)
          if (parsed.name && parsed.email && !savedSession) {
            setStep('plan');
          }
        } catch (e) {}
      }

      setCheckingStorage(false);
    };
    checkExistingSession();
  }, []);

  // ── INITIATE PAYMENT with full verification loop ──
  const initiatePayment = async (planType: 'single' | 'double') => {
    if (!cashfree) {
      showToast('Payment system loading... please try again in a moment.', 'info');
      return;
    }

    const amount = planType === 'single' ? 299 : 399;
    setPaymentStatus('creating');
    setIsRegistering(true);

    try {
      // Step 1: Create order on backend (secret never touches browser)
      const orderRes = await fetch('/api/cashfree/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          customerName: name,
          customerEmail: email,
          customerPhone: whatsapp,
          plan: planType,
        })
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || 'Failed to create payment order');

      setCurrentOrderId(orderData.order_id);
      setPaymentStatus('paying');
      setIsRegistering(false);

      // Step 2: Open Cashfree popup
      const checkoutResult = await cashfree.checkout({
        paymentSessionId: orderData.payment_session_id,
        redirectTarget: '_modal',
      });

      // User closed the modal — could be success, failure, or dropped
      if (checkoutResult?.error) {
        // SDK reported an error (e.g. network failure inside modal)
        setPaymentStatus('failed');
        showToast('Payment encountered an error. Please try again.', 'error');
        return;
      }

      // Step 3: ALWAYS verify server-side — never trust client result
      setPaymentStatus('verifying');
      setIsRegistering(true);

      // Retry verification up to 4 times (handles race condition where webhook is slow)
      let verified = false;
      for (let attempt = 0; attempt < 4; attempt++) {
        await new Promise(r => setTimeout(r, attempt * 1200)); // 0s, 1.2s, 2.4s, 3.6s
        const verifyRes = await fetch(`/api/cashfree/verify-order?order_id=${orderData.order_id}`);
        const verifyData = await verifyRes.json();

        if (verifyData.order_status === 'PAID') {
          // ✅ PAYMENT CONFIRMED
          const session: PoemSession = {
            orderId: orderData.order_id,
            plan: planType,
            paymentStatus: 'PAID',
            name,
            email,
            whatsapp,
            amount,
          };
          // Persist session to localStorage for page-reload resilience
          localStorage.setItem('pfs2_payment_session', JSON.stringify(session));
          setPoemSession(session);
          setPlan(planType);
          setPaymentStatus('paid');
          setIsOnboarded(true);

          if (planType === 'double') {
            setEditorMode('dashboard'); // Show poem selection dashboard
          }

          confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 }, colors: ['#EAA134', '#fff', '#000'] });
          showToast('Payment confirmed! Welcome to Poetry Festival S2.', 'success');
          verified = true;
          break;
        } else if (verifyData.order_status === 'ACTIVE') {
          // Still processing — retry
          continue;
        } else {
          // EXPIRED, TERMINATED, or FAILED
          break;
        }
      }

      if (!verified) {
        // Payment was not confirmed after retries
        setPaymentStatus('failed');
        showToast(
          'Payment could not be confirmed. If money was deducted, contact support with Order ID: ' + orderData.order_id,
          'error'
        );
      }

    } catch (err: any) {
      console.error('Payment error:', err);
      setPaymentStatus('failed');
      showToast(err.message || 'Payment failed. Please try again.', 'error');
    } finally {
      setIsRegistering(false);
    }
  };
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
            showToast('Line too long. Please use Enter to move to the next page.', 'info');
            // no-op timeout needed
          }
        }
      }, 50);
    },
    onFocus: () => setActiveEditorId(1),
  });

  const [status, setStatus] = useState<'editing' | 'confirming' | 'success'>('editing');
  const [submittedData, setSubmittedData] = useState<any>(null);

  // Responsive Scaling Logic for A5 pages
  useEffect(() => {
    const checkScale = () => {
      const w = window.innerWidth;
      if (w < 600) {
        setScale((w - 12) / 559);
      } else if (w >= 1280) {
        setScale(1.3);
      } else if (w >= 1024) {
        setScale(1.15);
      } else {
        setScale(1);
      }
    };
    checkScale();
    window.addEventListener('resize', checkScale);
    return () => window.removeEventListener('resize', checkScale);
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
          status: 'pending',
          order_id: poemSession?.orderId || null,
          poem_number: plan === 'double' ? activePoemSlot : 1,
        }])
        .select()
        .single();

      if (error) throw error;

      const submissionInfo = { id: data.id, title: title, wordCount: wordCount };

      if (plan === 'double') {
        // Update the session with this poem's info
        const updatedSession: PoemSession = {
          ...poemSession!,
          ...(activePoemSlot === 1 ? { poem1: submissionInfo } : { poem2: submissionInfo }),
        };
        localStorage.setItem('pfs2_payment_session', JSON.stringify(updatedSession));
        setPoemSession(updatedSession);

        if (activePoemSlot === 1 && !updatedSession.poem2) {
          // Poem 1 done — go back to dashboard to submit poem 2
          setStatus('editing');
          setEditorMode('dashboard');
          setTitle('');
          editor1?.commands.clearContent();
          editor2?.commands.clearContent();
          confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 }, colors: ['#EAA134', '#fff'] });
          showToast('Poem 1 submitted! Now write your second poem.', 'success');
        } else {
          // Both poems done
          setSubmittedData(updatedSession.poem2);
          localStorage.setItem('poetry_submission_status', 'success');
          setTimeout(() => {
            setStatus('success');
            confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 }, colors: ['#EAA134', '#ffffff', '#000000'] });
          }, 300);
        }
      } else {
        // Single plan — straight to success
        localStorage.setItem('poetry_submission_status', 'success');
        localStorage.setItem('poetry_submission_data', JSON.stringify(data));
        const updatedSession = { ...poemSession!, poem1: submissionInfo };
        localStorage.setItem('pfs2_payment_session', JSON.stringify(updatedSession));
        setPoemSession(updatedSession);
        setSubmittedData(data);
        setTimeout(() => {
          setStatus('success');
          confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#EAA134', '#ffffff', '#000000'] });
        }, 300);
      }
      
    } catch (err: any) {
      console.error('Submission error:', err);
      showToast('Failed to submit: ' + (err.message || 'Server error'), 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const downloadReceipt = async (dataOverride?: any) => {
    const data = dataOverride || submittedData;
    const receiptElement = document.getElementById('submission-receipt');
    if (!receiptElement) {
      console.error('Receipt element not found');
      showToast('Error: Receipt template missing.', 'error');
      return;
    }

    // Use a small delay to ensure the UI is stable before heavy canvas work
    setTimeout(async () => {
      try {
        const canvas = await html2canvas(receiptElement, {
          scale: 2,
          backgroundColor: '#050505',
          useCORS: true,
          logging: false,
          allowTaint: true,
          scrollX: 0,
          scrollY: 0,
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
        const fileName = `Inkfetish_Receipt_${data?.id?.slice(0, 8) || 'S2'}.pdf`;
        pdf.save(fileName);
        showToast('Receipt downloaded successfully!', 'success');
      } catch (err) {
        console.error('PDF generation failed:', err);
        showToast('Failed to generate PDF. Please try again.', 'error');
      }
    }, 150);
  };

  const handleOnboardingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim() || !email.trim()) {
      showToast("Please fill in all details to proceed.");
      return;
    }
    
    // Save to local storage
    localStorage.setItem('inkfetish_s2_author', JSON.stringify({
      name,
      whatsapp,
      email
    }));

    setIsRegistering(true);
    
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
        showToast(`Registration Error: ${error.message}`, 'error');
        setIsRegistering(false);
        return;
      }

      // Smooth transition to plan selection
      setTimeout(() => {
        setIsRegistering(false);
        setStep('plan');
      }, 1500);

    } catch (err) {
      console.error("Failed to capture lead:", err);
      showToast("Network failure. Please try again.", 'error');
      setIsRegistering(false);
    }
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
  // ── PLAN SELECTION UI ──
  const PlanSelection = () => (
    <div className="min-h-screen md:h-screen bg-[#050505] text-[#fdfbf7] font-sans selection:bg-gold/30 relative overflow-x-hidden md:overflow-hidden pt-8 md:pt-0 pb-12 md:pb-0 flex flex-col justify-center">
      {/* ── BACKGROUND ATMOSPHERE ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d0118] via-[#050505] to-[#080012]" />
        <div className="absolute top-[-15%] left-[-5%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-purple-900/15 blur-[120px] md:blur-[160px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-gold/10 blur-[100px] md:blur-[140px] rounded-full" />
        <div className="absolute inset-0 opacity-15">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute top-0 bottom-0 border-l border-white/[0.03]" style={{ left: `${20 * (i + 1)}%` }} />
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full flex flex-col items-center">
        {/* ── LOGO/NAV ── */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="mb-6 md:mb-10"
        >
          <div className="flex items-center gap-2.5 bg-white/[0.02] backdrop-blur-xl border border-white/10 px-4 py-1.5 rounded-full">
            <img
              src="https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1777556045/iflogo_y3ss8e.png"
              alt="Inkfetish Logo"
              className="w-5 h-5 object-cover rounded-full"
            />
            <span className="text-[8px] uppercase tracking-[0.3em] font-black text-white/70">Inkfetish Publication</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-4xl md:text-7xl font-serif font-black text-white tracking-tighter leading-[1] md:leading-[0.8] mb-6">
            Choose Your <br className="hidden md:block" /> <span className="italic text-gold drop-shadow-[0_0_25px_rgba(234,161,52,0.25)]">Entry Option.</span>
          </h1>

          <p className="text-white/40 text-[10px] md:text-sm max-w-md mx-auto leading-relaxed font-black uppercase tracking-[0.2em]">
            Poetry Festival Season 2 is where your words become our legacy. <br className="hidden md:block" /> Start your entry today.
          </p>
        </motion.div>

        {/* ── PLAN CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full max-w-4xl mx-auto items-stretch">

          {/* ── ₹299 SINGLE ENTRY ── */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="group relative bg-[#0d0d0d] border border-white/10 rounded-3xl overflow-hidden flex flex-col hover:border-white/20 transition-all duration-300 shadow-2xl"
          >
            <div className="p-6 md:p-8 flex flex-col flex-1">
              <span className="text-[8px] uppercase tracking-[0.3em] font-black text-white/30 block mb-4">Path I — Single</span>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl md:text-6xl font-black text-white tracking-tighter">₹299</span>
                <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest">/ Entry</span>
              </div>

              <div className="space-y-2.5 mb-8 flex-1">
                {[
                  'Submit 1 Single Poem',
                  'Participation Certificate',
                  'Editorial Appreciation Letter',
                  'Excellence Digital Award',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="w-3 h-3 text-white/20" />
                    <span className="text-[11px] text-white/60 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => initiatePayment('single')}
                className="w-full py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] border border-white/10 text-white bg-white/[0.03] hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Begin My Entry
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* ── ₹399 DOUBLE ENTRY ── */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="group relative bg-[#0d0d0d] border-2 border-gold/30 rounded-3xl overflow-hidden flex flex-col shadow-[0_25px_60px_rgba(234,161,52,0.1)] hover:scale-[1.01] transition-all duration-300"
          >
            {/* Badges */}
            <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5">
              <span className="bg-gold text-black text-[7px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest shadow-lg">
                Most Taken
              </span>
            </div>

            <div className="p-6 md:p-8 flex flex-col flex-1 relative z-10">
              <span className="text-[8px] uppercase tracking-[0.3em] font-black text-gold/60 block mb-4">Path II — Double</span>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl md:text-6xl font-black text-white tracking-tighter">₹399</span>
                <div className="flex flex-col">
                  <span className="text-gold/40 text-[10px] line-through font-bold">₹598</span>
                  <span className="text-gold/80 text-[8px] font-black uppercase tracking-widest">Best Value</span>
                </div>
              </div>

              <div className="space-y-2.5 mb-8 flex-1">
                {[
                  'Submit 2 Independent Poems',
                  'Premium Appreciation Kit',
                  'Creative Excellence Award',
                  { label: 'Exclusive Judging Report', premium: true },
                  { label: 'Editorial Recommendation', premium: true },
                ].map((item, i) => {
                  const isPremium = typeof item === 'object' && item.premium;
                  const label = typeof item === 'string' ? item : item.label;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <Check className={`w-3 h-3 ${isPremium ? 'text-gold' : 'text-gold/30'}`} />
                      <span className={`text-[11px] font-bold ${
                        isPremium ? 'text-gold' : 'text-white/60'
                      }`}>
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => initiatePayment('double')}
                className="w-full py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] bg-gold text-black hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Double My Legacy
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* ── TRUST BAR ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 md:mt-12 w-full flex flex-col items-center"
        >
          <div className="flex items-center justify-center gap-6 opacity-20 text-[7px] uppercase tracking-[0.4em] font-black mb-6">
            <span className="flex items-center gap-1.5"><Check className="w-2.5 h-2.5" /> Secure Checkout</span>
            <span className="flex items-center gap-1.5"><Check className="w-2.5 h-2.5" /> Instant Access</span>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem('inkfetish_s2_author');
              setStep('setup');
              setName('');
              setEmail('');
              setWhatsapp('');
            }}
            className="text-white/20 hover:text-white/50 text-[7px] uppercase tracking-[0.4em] font-black transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-2.5 h-2.5" /> Not you? Re-register
          </button>
        </motion.div>
      </div>
    </div>
  );

  // ── DOUBLE PLAN DASHBOARD (₹399) ──
  // Shown between poem 1 and poem 2 submissions
  const DoublePlanDashboard = () => (
    <div className="fixed inset-0 z-[110] bg-[#0a0a0a] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 px-4 py-1.5 rounded-full mb-6">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-black">Double Entry — ₹399 Plan</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">Your Submissions</h2>
          <p className="text-white/40 text-sm max-w-md mx-auto">
            {poemSession?.poem1 && poemSession?.poem2 
              ? 'Both poems submitted. Your voice is immortalized.' 
              : poemSession?.poem1 
              ? 'Poem 1 received. One more voice left to share.' 
              : 'Choose your first poem slot to begin.'}
          </p>
        </div>

        {/* Poem Slots */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {/* POEM 1 SLOT */}
          <motion.div
            whileHover={!poemSession?.poem1 ? { y: -5 } : {}}
            className={`relative rounded-2xl border p-6 transition-all ${
              poemSession?.poem1 
                ? 'bg-gold/5 border-gold/30' 
                : 'bg-white/[0.03] border-white/10 cursor-pointer hover:border-gold/40'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold/70 font-bold block mb-1">Poem 1</span>
                <span className={`text-xs font-bold uppercase tracking-wider ${poemSession?.poem1 ? 'text-gold' : 'text-white/30'}`}>
                  {poemSession?.poem1 ? '✓ Submitted' : 'Pending'}
                </span>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${poemSession?.poem1 ? 'bg-gold/20' : 'bg-white/5'}`}>
                {poemSession?.poem1 ? <Check className="w-5 h-5 text-gold" /> : <Send className="w-4 h-4 text-white/30" />}
              </div>
            </div>

            {poemSession?.poem1 ? (
              <div className="space-y-3">
                <p className="text-white font-bold text-base line-clamp-1">{poemSession.poem1.title}</p>
                <p className="text-white/40 text-xs">{poemSession.poem1.wordCount} words</p>
                <div className="flex gap-2 pt-1">
                  <Link
                    href={`/poetry-festival-s2/read/${poemSession.poem1.id}`}
                    className="flex-1 bg-white/5 border border-white/10 text-white/70 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-white/10 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3 h-3" /> Read
                  </Link>
                  <button
                    onClick={() => {
                      setSubmittedData(poemSession.poem1);
                      downloadReceipt();
                    }}
                    className="flex-1 bg-gold/10 border border-gold/20 text-gold py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-gold/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3 h-3" /> Receipt
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setActivePoemSlot(1);
                  setEditorMode('writing');
                }}
                className="w-full mt-2 bg-gold text-black py-3.5 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all"
              >
                Write Poem 1
              </button>
            )}
          </motion.div>

          {/* POEM 2 SLOT */}
          <motion.div
            whileHover={poemSession?.poem1 && !poemSession?.poem2 ? { y: -5 } : {}}
            className={`relative rounded-2xl border p-6 transition-all ${
              poemSession?.poem2 
                ? 'bg-gold/5 border-gold/30' 
                : poemSession?.poem1 
                ? 'bg-white/[0.03] border-gold/20 cursor-pointer' 
                : 'bg-white/[0.02] border-white/5 opacity-50'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold/70 font-bold block mb-1">Poem 2</span>
                <span className={`text-xs font-bold uppercase tracking-wider ${poemSession?.poem2 ? 'text-gold' : poemSession?.poem1 ? 'text-white/50' : 'text-white/20'}`}>
                  {poemSession?.poem2 ? '✓ Submitted' : poemSession?.poem1 ? 'Ready to write' : 'Submit poem 1 first'}
                </span>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${poemSession?.poem2 ? 'bg-gold/20' : 'bg-white/5'}`}>
                {poemSession?.poem2 ? <Check className="w-5 h-5 text-gold" /> : <Send className="w-4 h-4 text-white/30" />}
              </div>
            </div>

            {poemSession?.poem2 ? (
              <div className="space-y-3">
                <p className="text-white font-bold text-base line-clamp-1">{poemSession.poem2.title}</p>
                <p className="text-white/40 text-xs">{poemSession.poem2.wordCount} words</p>
                <div className="flex gap-2 pt-1">
                  <Link
                    href={`/poetry-festival-s2/read/${poemSession.poem2.id}`}
                    className="flex-1 bg-white/5 border border-white/10 text-white/70 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-white/10 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3 h-3" /> Read
                  </Link>
                  <button
                    onClick={() => {
                      setSubmittedData(poemSession.poem2);
                      downloadReceipt();
                    }}
                    className="flex-1 bg-gold/10 border border-gold/20 text-gold py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-gold/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3 h-3" /> Receipt
                  </button>
                </div>
              </div>
            ) : poemSession?.poem1 ? (
              <button
                onClick={() => {
                  setActivePoemSlot(2);
                  setEditorMode('writing');
                }}
                className="w-full mt-2 bg-gold text-black py-3.5 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all"
              >
                Write Poem 2
              </button>
            ) : (
              <div className="mt-2 text-white/20 text-[10px] uppercase tracking-widest font-bold text-center py-3">
                Locked
              </div>
            )}
          </motion.div>
        </div>

        {/* Footer */}
        {poemSession?.poem1 && poemSession?.poem2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest">
              <Check className="w-4 h-4" /> All Submissions Complete
            </div>
          </motion.div>
        )}

        <p className="text-center text-white/20 text-[9px] uppercase tracking-widest mt-8">
          Order ID: {poemSession?.orderId} • {name}
        </p>
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
        className="max-w-3xl w-full"
      >
        <div className="w-24 h-24 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-8 text-gold">
          <Check className="w-12 h-12" />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
          {plan === 'double' ? 'Both Poems Submitted' : 'Poetry Submitted'}
        </h2>
        <h3 className="text-xl md:text-2xl font-serif font-bold text-gold/80 mb-4">Poetry Festival Season 2</h3>
        <p className="text-white/50 text-base md:text-lg mb-12 leading-relaxed italic max-w-lg mx-auto">
          "The ink is dry, the words are set. Your voice has joined the chorus of Inkfetish Season 2."
        </p>

        {/* For double plan: show both poem cards */}
        {plan === 'double' && poemSession ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {poemSession.poem1 && (
              <div className="bg-white/5 border border-gold/20 p-6 rounded-2xl text-left">
                <span className="text-[10px] uppercase tracking-widest text-gold block mb-1">Poem 1</span>
                <p className="text-white font-bold text-lg mb-1 line-clamp-1">{poemSession.poem1.title}</p>
                <p className="text-white/40 text-xs mb-4">{poemSession.poem1.wordCount} words</p>
                <div className="flex gap-2">
                  <Link href={`/poetry-festival-s2/read/${poemSession.poem1.id}`}
                    className="flex-1 bg-white/5 border border-white/10 text-white/70 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-white/10 transition-all flex items-center justify-center gap-1.5">
                    <Eye className="w-3 h-3" /> Read
                  </Link>
                  <button onClick={() => downloadReceipt(poemSession.poem1)}
                    className="flex-1 bg-gold/10 border border-gold/20 text-gold py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-gold/20 transition-all flex items-center justify-center gap-1.5">
                    <Download className="w-3 h-3" /> Receipt
                  </button>
                </div>
              </div>
            )}
            {poemSession.poem2 && (
              <div className="bg-white/5 border border-gold/20 p-6 rounded-2xl text-left">
                <span className="text-[10px] uppercase tracking-widest text-gold block mb-1">Poem 2</span>
                <p className="text-white font-bold text-lg mb-1 line-clamp-1">{poemSession.poem2.title}</p>
                <p className="text-white/40 text-xs mb-4">{poemSession.poem2.wordCount} words</p>
                <div className="flex gap-2">
                  <Link href={`/poetry-festival-s2/read/${poemSession.poem2.id}`}
                    className="flex-1 bg-white/5 border border-white/10 text-white/70 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-white/10 transition-all flex items-center justify-center gap-1.5">
                    <Eye className="w-3 h-3" /> Read
                  </Link>
                  <button onClick={() => downloadReceipt(poemSession.poem2)}
                    className="flex-1 bg-gold/10 border border-gold/20 text-gold py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-gold/20 transition-all flex items-center justify-center gap-1.5">
                    <Download className="w-3 h-3" /> Receipt
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Single plan: original layout
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
        )}

        {plan !== 'double' && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button 
              onClick={() => downloadReceipt(submittedData)}
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
        )}

        <button 
          onClick={() => {
            localStorage.removeItem('poetry_submission_status');
            localStorage.removeItem('poetry_submission_data');
            localStorage.removeItem('pfs2_payment_session');
            window.location.reload();
          }}
          className="mt-4 text-white/30 hover:text-white text-[10px] uppercase tracking-widest font-bold transition-colors"
        >
          Start New Entry
        </button>

        <p className="text-white/15 text-[9px] uppercase tracking-widest mt-6">
          Order: {poemSession?.orderId || currentOrderId}
        </p>
      </motion.div>
    </motion.div>
  );


  if (!isOnboarded) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#fdfbf7] flex flex-col md:flex-row font-sans selection:bg-gold/30 selection:text-white relative overflow-x-hidden">
        <AnimatePresence mode="wait">
          {isRegistering ? (
            <motion.div 
              key="register-loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[200] bg-[#050505]/95 backdrop-blur-md flex flex-col items-center justify-center"
            >
              <Loader2 className="w-12 h-12 text-[#EAA134] animate-spin mb-6" />
              <div className="text-[#EAA134] font-black tracking-[0.3em] uppercase text-xs animate-pulse mb-3">
                {paymentStatus === 'creating' && 'Creating Secure Order...'}
                {paymentStatus === 'verifying' && 'Verifying Payment...'}
                {paymentStatus === 'idle' && 'Preparing The Studio...'}
                {!['creating', 'verifying', 'idle'].includes(paymentStatus) && 'Please Wait...'}
              </div>
              {paymentStatus === 'verifying' && (
                <p className="text-white/30 text-[10px] max-w-xs text-center leading-relaxed">
                  Confirming with Cashfree servers. Do not close this tab.
                </p>
              )}
              {currentOrderId && paymentStatus === 'verifying' && (
                <p className="text-white/20 text-[9px] mt-4 font-mono">Ref: {currentOrderId}</p>
              )}
            </motion.div>
          ) : step === 'setup' ? (
            <motion.div 
              key="setup-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col md:flex-row w-full min-h-screen"
            >
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
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-20 md:hidden" />
                <div 
                  className="w-full h-full bg-cover bg-[center_top] md:bg-[center_left] md:[clip-path:polygon(15%_0,100%_0,100%_100%,0%_100%)] relative"
                  style={{ 
                    backgroundImage: 'url("https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1777555292/La_Polentina_-_Joey_Guidone_spmmpb.jpg")'
                  }}
                >
                  <div className="absolute inset-0 bg-purple-900/10 mix-blend-overlay pointer-events-none" />
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
                      <div className="text-[11px] uppercase tracking-[0.4em] font-bold text-purple-400 mb-2">
                        Poetry Festival • Season 2
                      </div>
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
            </motion.div>
          ) : step === 'plan' ? (
            <motion.div 
              key="plan-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <PlanSelection />
            </motion.div>
          ) : null}
        </AnimatePresence>
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
        
        {/* ── DOUBLE PLAN DASHBOARD (between poems) ── */}
        {plan === 'double' && editorMode === 'dashboard' && status !== 'success' && (
          <motion.div 
            key="double-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110]"
          >
            <DoublePlanDashboard />
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
