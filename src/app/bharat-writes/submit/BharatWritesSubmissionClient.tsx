'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Feather, ArrowLeft, ArrowRight, Send, User, Mail, Phone, Loader2, Check, Download, Eye, FileText, Shield, Flag } from 'lucide-react';
import confetti from 'canvas-confetti';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { supabase } from '@/lib/supabase';
import { db } from '@/lib/firebase';
import { collection, addDoc, setDoc, updateDoc, doc } from 'firebase/firestore';
import { useEditor, EditorContent, Extension } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify, Bold, Italic, Underline as UnderlineIcon, ArrowUpDown, Type, Strikethrough, Minus, Quote, List, ListOrdered } from 'lucide-react';
import { Inter, Poppins, Great_Vibes } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({ weight: ['400', '600', '700', '900'], subsets: ['latin'] });
const greatVibes = Great_Vibes({ weight: ['400'], subsets: ['latin'] });

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

// ── PAYMENT SESSION ──
type PaymentStatus = 'idle' | 'creating' | 'paying' | 'verifying' | 'paid' | 'failed' | 'cancelled';
type PoemSession = {
  orderId: string;
  plan: 'single' | 'double' | 'triple';
  paymentStatus: 'PAID';
  name: string;
  email: string;
  whatsapp: string;
  amount: number;
  poem1?: { id: string; title: string; wordCount: number };
  poem2?: { id: string; title: string; wordCount: number };
  poem3?: { id: string; title: string; wordCount: number };
};

export default function BharatWritesSubmissionClient() {
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
  const [activeEditorId, setActiveEditorId] = useState<1 | 2 | 3>(1);
  const [toast, setToast] = useState<{ message: string; type: 'error' | 'success' | 'info' } | null>(null);
  const [plan, setPlan] = useState<'single' | 'double' | 'triple' | null>(null);
  const [step, setStep] = useState<'setup' | 'plan'>('setup');

  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [poemSession, setPoemSession] = useState<PoemSession | null>(null);
  const [activePoemSlot, setActivePoemSlot] = useState<1 | 2 | 3>(1);
  const [editorMode, setEditorMode] = useState<'dashboard' | 'writing'>('writing');
  const [status, setStatus] = useState<'editing' | 'confirming' | 'success'>('editing');
  const [submittedData, setSubmittedData] = useState<any>(null);

  const showToast = (message: string, type: 'error' | 'success' | 'info' = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const [cashfree, setCashfree] = useState<any>(null);

  // ── LOAD CASHFREE SDK ──
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

  // ── RESTORE SESSION ──
  useEffect(() => {
    const checkExistingSession = async () => {
      const savedSession = localStorage.getItem('bharat_writes_payment_session');
      const pendingOrderId = localStorage.getItem('bharat_writes_pending_order_id');
      
      let hasActiveSession = false;

      // Check fully active session first
      if (savedSession) {
        try {
          const parsed: PoemSession = JSON.parse(savedSession);
          const verifyRes = await fetch(`/api/cashfree/verify-order?order_id=${parsed.orderId}`);
          const verifyData = await verifyRes.json();
          if (verifyData.order_status === 'PAID') {
            hasActiveSession = true;
            setPoemSession(parsed);
            setName(parsed.name);
            setEmail(parsed.email);
            setWhatsapp(parsed.whatsapp);
            setPlan(parsed.plan);
            setPaymentStatus('paid');
            setIsOnboarded(true);
            
            if (parsed.plan === 'double' && parsed.poem1 && parsed.poem2) {
              setStatus('success');
            } else if (parsed.plan === 'triple' && parsed.poem1 && parsed.poem2 && parsed.poem3) {
              setStatus('success');
            } else if (parsed.plan === 'double' || parsed.plan === 'triple') {
              setEditorMode('dashboard');
            }
            if (parsed.plan === 'single' && parsed.poem1) {
              setStatus('success');
              setSubmittedData(parsed.poem1);
            }
          } else {
            localStorage.removeItem('bharat_writes_payment_session');
          }
        } catch (e) {
          localStorage.removeItem('bharat_writes_payment_session');
        }
      }

      // If no active session, but there is a pending order, check if it was actually paid in the background
      if (!hasActiveSession && pendingOrderId) {
        try {
          const verifyRes = await fetch(`/api/cashfree/verify-order?order_id=${pendingOrderId}`);
          const verifyData = await verifyRes.json();
          
          if (verifyData.order_status === 'PAID') {
            const tags = verifyData.order_tags || {};
            const recoveredPlan = tags.plan || 'single';
            
            const recoveredSession: PoemSession = {
              orderId: pendingOrderId,
              name: tags.name || '',
              email: tags.email || '',
              whatsapp: tags.whatsapp || '',
              plan: recoveredPlan as 'single' | 'double' | 'triple',
              paymentStatus: 'paid',
              amount: verifyData.order_amount || 1
            };
            
            localStorage.setItem('bharat_writes_payment_session', JSON.stringify(recoveredSession));
            localStorage.removeItem('bharat_writes_pending_order_id');
            
            setPoemSession(recoveredSession);
            setName(recoveredSession.name);
            setEmail(recoveredSession.email);
            setWhatsapp(recoveredSession.whatsapp);
            setPlan(recoveredSession.plan);
            
            setPaymentStatus('paid');
            setIsOnboarded(true);
            
            if (recoveredPlan === 'double' || recoveredPlan === 'triple') {
              setEditorMode('dashboard');
            }
            hasActiveSession = true;
          }
        } catch (e) {
          console.error("Pending cart recovery failed", e);
        }
      }

      const savedAuthor = localStorage.getItem('bharat_writes_author');
      if (savedAuthor) {
        try {
          const parsed = JSON.parse(savedAuthor);
          if (parsed.name) setName(parsed.name);
          if (parsed.whatsapp) setWhatsapp(parsed.whatsapp);
          if (parsed.email) setEmail(parsed.email);
          if (parsed.name && parsed.email && !savedSession) {
            setStep('plan');
          }
        } catch (e) {}
      }

      setCheckingStorage(false);
    };
    checkExistingSession();
  }, []);

  // ── INITIATE PAYMENT ──
  const initiatePayment = async (planType: 'single' | 'double' | 'triple') => {
    if (!cashfree) {
      showToast('Secure payment gateway loading... please try again.', 'info');
      return;
    }

    const amount = planType === 'single' ? 1 : planType === 'double' ? 2 : 3;
    setPaymentStatus('creating');
    setIsRegistering(true);

    try {
      const orderRes = await fetch('/api/cashfree/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          customerName: name,
          customerEmail: email,
          customerPhone: whatsapp,
          plan: planType,
          source: 'bharat_writes'
        })
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || 'Failed to initialize secure connection');

      // 1. Create PENDING document in Firestore BEFORE opening Cashfree
      await setDoc(doc(db, 'bharat_writes_registrations', orderData.order_id), {
        authorName: name,
        whatsappNumber: whatsapp,
        email: email,
        plan: planType,
        amount: amount,
        status: 'PENDING',
        orderId: orderData.order_id,
        createdAt: new Date().toISOString()
      });

      // 2. Save to local storage for cart recovery
      localStorage.setItem('bharat_writes_pending_order_id', orderData.order_id);

      setCurrentOrderId(orderData.order_id);
      setPaymentStatus('paying');
      setIsRegistering(false);

      const checkoutResult = await cashfree.checkout({
        paymentSessionId: orderData.payment_session_id,
        redirectTarget: '_modal',
      });

      if (checkoutResult?.error) {
        setPaymentStatus('failed');
        showToast('Payment encountered an error. Please try again.', 'error');
        return;
      }

      setPaymentStatus('verifying');
      setIsRegistering(true);

      let verified = false;
      for (let attempt = 0; attempt < 4; attempt++) {
        await new Promise(r => setTimeout(r, attempt * 1200));
        const verifyRes = await fetch(`/api/cashfree/verify-order?order_id=${orderData.order_id}`);
        const verifyData = await verifyRes.json();

        if (verifyData.order_status === 'PAID') {
          // 2. Update document to PAID in Firestore upon successful verification
          await updateDoc(doc(db, 'bharat_writes_registrations', orderData.order_id), {
            status: 'PAID'
          });

          const session: PoemSession = {
            orderId: orderData.order_id,
            plan: planType,
            paymentStatus: 'PAID',
            name,
            email,
            whatsapp,
            amount,
          };
          localStorage.setItem('bharat_writes_payment_session', JSON.stringify(session));
          setPoemSession(session);
          setPlan(planType);
          setPaymentStatus('paid');
          setIsOnboarded(true);

          if (planType === 'double' || planType === 'triple') {
            setEditorMode('dashboard');
          }

          confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 }, colors: ['#FF9933', '#FFFFFF', '#138808'] });
          showToast('Authorization complete. Access granted to submission portal.', 'success');
          verified = true;
          break;
        } else if (verifyData.order_status === 'ACTIVE') {
          continue;
        } else {
          break;
        }
      }

      if (!verified) {
        setPaymentStatus('failed');
        showToast('Payment could not be verified. Please contact support.', 'error');
      }

    } catch (err: any) {
      console.error('Payment error:', err);
      setPaymentStatus('failed');
      showToast(err.message || 'Secure payment failed. Please try again.', 'error');
    } finally {
      setIsRegistering(false);
    }
  };



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
      attributes: { class: 'tiptap-editor outline-none min-h-[400px]' },
    },
  });

  useEffect(() => {
    const checkScale = () => {
      const w = window.innerWidth;
      if (w < 600) setScale((w - 12) / 559);
      else if (w >= 1280) setScale(1.3);
      else if (w >= 1024) setScale(1.15);
      else setScale(1);
    };
    checkScale();
    window.addEventListener('resize', checkScale);
    return () => window.removeEventListener('resize', checkScale);
  }, []);



  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const updateStats = () => {
    const text1 = editor1?.getText() || '';
    const fullText = text1.trim();
    
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
    if (!editor1) return;
    const triggerUpdate = () => updateStats();
    editor1.on('update', triggerUpdate);
    triggerUpdate();
    return () => {
      editor1.off('update', triggerUpdate);
    };
  }, [editor1]);

  const WORD_LIMIT = 600;
  const CHAR_LIMIT = 4000;

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setToast(null);

    if (!title.trim()) {
      showToast('Submission Title is required.');
      return;
    }

    if (wordCount === 0) {
      showToast('Document is empty. Please construct your entry.');
      return;
    }

    if (wordCount > WORD_LIMIT || charCount > CHAR_LIMIT) {
      showToast(`Entry exceeds official limits (${wordCount}/${WORD_LIMIT} words).`);
      return;
    }

    setStatus('confirming');
  };

  const handleFinalSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    
    try {
      const combinedHtml = `
        <div class="poetry-content">${editor1?.getHTML()}</div>
      `;

      const docRef = await addDoc(collection(db, 'bharat_writes_submissions'), {
        authorName: name,
        title: title,
        email,
        whatsappNumber: whatsapp,
        poetryHtml: combinedHtml,
        wordCount: wordCount,
        status: 'pending',
        order_id: poemSession?.orderId || null,
        poem_number: (plan === 'double' || plan === 'triple') ? activePoemSlot : 1,
        createdAt: new Date().toISOString()
      });

      const submissionInfo = { id: docRef.id, title: title, wordCount: wordCount };

      if (plan === 'double' || plan === 'triple') {
        let updatedSession: PoemSession = { ...poemSession! };
        if (activePoemSlot === 1) updatedSession.poem1 = submissionInfo;
        else if (activePoemSlot === 2) updatedSession.poem2 = submissionInfo;
        else if (activePoemSlot === 3) updatedSession.poem3 = submissionInfo;
        
        localStorage.setItem('bharat_writes_payment_session', JSON.stringify(updatedSession));
        setPoemSession(updatedSession);

        const isComplete = 
          (plan === 'double' && updatedSession.poem1 && updatedSession.poem2) ||
          (plan === 'triple' && updatedSession.poem1 && updatedSession.poem2 && updatedSession.poem3);

        if (!isComplete) {
          setStatus('editing');
          setEditorMode('dashboard');
          setTitle('');
          editor1?.commands.clearContent();
          confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 }, colors: ['#FF9933', '#138808'] });
          showToast(`Entry ${activePoemSlot} recorded. Please proceed to Entry ${activePoemSlot + 1}.`, 'success');
        } else {
          setSubmittedData(submissionInfo);
          setTimeout(() => {
            setStatus('success');
            confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 }, colors: ['#FF9933', '#FFFFFF', '#138808'] });
          }, 300);
        }
      } else {
        const updatedSession = { ...poemSession!, poem1: submissionInfo };
        localStorage.setItem('bharat_writes_payment_session', JSON.stringify(updatedSession));
        setPoemSession(updatedSession);
        setSubmittedData(submissionInfo);
        setTimeout(() => {
          setStatus('success');
          confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#FF9933', '#FFFFFF', '#138808'] });
        }, 300);
      }
      
    } catch (err: any) {
      console.error('Submission error:', err);
      showToast('System failure during submission: ' + (err.message || 'Network error'), 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const downloadReceipt = async (dataOverride?: any) => {
    const data = dataOverride || submittedData;
    const receiptElement = document.getElementById('submission-receipt');
    if (!receiptElement) {
      showToast('Receipt rendering error.', 'error');
      return;
    }

    setTimeout(async () => {
      try {
        const canvas = await html2canvas(receiptElement, {
          scale: 2,
          backgroundColor: '#FAFAFA',
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
        const fileName = `Bharat_Writes_Receipt_${data?.id?.slice(0, 8) || 'BW'}.pdf`;
        pdf.save(fileName);
        showToast('Receipt issued successfully.', 'success');
      } catch (err) {
        showToast('PDF compilation failed.', 'error');
      }
    }, 150);
  };

  const handleOnboardingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim() || !email.trim()) {
      showToast("All fields are mandatory for registration.");
      return;
    }
    
    localStorage.setItem('bharat_writes_author', JSON.stringify({
      name,
      whatsapp,
      email
    }));

    setIsRegistering(true);
    
    setTimeout(() => {
      setIsRegistering(false);
      setStep('plan');
    }, 800);
  };

  if (!editor1 || !editor2) return null;

  if (checkingStorage) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-[#000080] text-sm font-display font-bold uppercase tracking-widest animate-pulse flex flex-col items-center gap-2">
          <Shield className="w-8 h-8 text-[#FF9933]" />
          Securing Portal...
        </div>
      </div>
    );
  }

  const ConfirmationModal = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={() => setStatus('editing')}
      />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-white border border-[#E2E8F0] p-8 rounded-xl max-w-md w-full shadow-2xl text-center"
      >
        <div className="w-16 h-16 bg-[#F8F9FA] border border-[#E2E8F0] rounded-full flex items-center justify-center mx-auto mb-6 text-[#000080]">
          <Shield className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-display font-bold text-[#1A202C] mb-2">Final Declaration</h3>
        <p className="text-[#4A5568] text-sm mb-8 leading-relaxed">
          I hereby declare that this submission is original. Once submitted, modifications will not be permitted in accordance with contest regulations.
        </p>
        <div className="flex flex-col gap-3">
          <button 
            onClick={handleFinalSubmit}
            disabled={submitting}
            className="w-full bg-[#000080] text-white py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-[#1A202C] transition-all flex items-center justify-center gap-3"
          >
            {submitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Confirm & Submit Entry
              </>
            )}
          </button>
          <button 
            onClick={() => setStatus('editing')}
            className="w-full bg-[#F7FAFC] text-[#4A5568] py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-[#E2E8F0] transition-all border border-[#E2E8F0]"
          >
            Return to Editor
          </button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A202C] font-sans selection:bg-[#FF9933] selection:text-white">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-4 left-1/2 z-[100] px-6 py-3 rounded-lg shadow-xl border flex items-center gap-3 font-medium tracking-wide ${
              toast.type === 'success' 
                ? 'bg-white border-[#138808] text-[#138808]' 
                : toast.type === 'info'
                ? 'bg-white border-[#000080] text-[#000080]'
                : 'bg-white border-red-600 text-red-600'
            }`}
          >
            {toast.type === 'success' && <Check className="w-4 h-4" />}
            {toast.type === 'info' && <Shield className="w-4 h-4" />}
            <span className="text-sm">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {isOnboarded && (
        <>
          <div className="h-1 w-full flex">
            <div className="h-full flex-1 bg-[#FF9933]" />
            <div className="h-full flex-1 bg-white" />
            <div className="h-full flex-1 bg-[#138808]" />
          </div>

          <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] z-50 px-6 py-3 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 pr-4 border-r border-[#E2E8F0]">
                <img src="/images/inkfetish_logo.png" alt="Inkfetish Logo" className="w-6 h-6 object-contain" />
                <span className="font-display font-bold text-[10px] tracking-widest uppercase text-[#1A202C]">Inkfetish Publications</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F7FAFC] border border-[#E2E8F0] flex items-center justify-center">
                  <Flag className="w-4 h-4 text-[#000080]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-lg leading-none tracking-tight text-[#000080]">Bharat Writes</span>
                  <span className="text-[10px] uppercase font-bold text-[#4A5568] tracking-widest mt-1">Inkfetish Publication</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold text-[#4A5568] tracking-widest uppercase">
              <div className="hidden md:flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#138808]"></span>
                Secure Session
              </div>
              {(plan === 'double' || plan === 'triple') && editorMode === 'writing' && (
                <button
                  onClick={() => setEditorMode('dashboard')}
                  className="text-[#000080] hover:underline"
                >
                  Dashboard
                </button>
              )}
            </div>
          </nav>
          
          <div className="fixed top-[60px] w-full bg-[#000080] text-white overflow-hidden z-40 py-1.5 border-b border-[#FF9933]/30 shadow-md">
            <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] inline-block font-bold text-sm tracking-widest">
              <span className="mx-4">🎖️ EVERY PARTICIPANT WILL RECEIVE:</span>
              <span className="mx-4 text-[#FF9933]">• BHARAT PRIDE CERTIFICATE (PDF)</span>
              <span className="mx-4 text-[#138808]">• BHARAT PRIDE APPRECIATION LETTER (PDF)</span>
              <span className="mx-8 opacity-50">|</span>
              <span className="mx-4">🎖️ EVERY PARTICIPANT WILL RECEIVE:</span>
              <span className="mx-4 text-[#FF9933]">• BHARAT PRIDE CERTIFICATE (PDF)</span>
              <span className="mx-4 text-[#138808]">• BHARAT PRIDE APPRECIATION LETTER (PDF)</span>
              <span className="mx-8 opacity-50">|</span>
              <span className="mx-4">🎖️ EVERY PARTICIPANT WILL RECEIVE:</span>
              <span className="mx-4 text-[#FF9933]">• BHARAT PRIDE CERTIFICATE (PDF)</span>
              <span className="mx-4 text-[#138808]">• BHARAT PRIDE APPRECIATION LETTER (PDF)</span>
            </div>
            <style jsx>{`
              @keyframes marquee {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-33.33%); }
              }
            `}</style>
          </div>
        </>
      )}

      {!isOnboarded ? (
        <div className="flex flex-col md:flex-row w-full min-h-screen relative bg-[#F8F9FA]">
          <AnimatePresence mode="wait">
            {isRegistering ? (
              <motion.div 
                key="register-loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-[200] bg-[#F8F9FA]/95 backdrop-blur-md flex flex-col items-center justify-center"
              >
                <Loader2 className="w-12 h-12 text-[#FF9933] animate-spin mb-6" />
                <div className="text-[#000080] font-black tracking-widest uppercase text-xs animate-pulse mb-3">
                  {paymentStatus === 'creating' && 'Creating Secure Order...'}
                  {paymentStatus === 'verifying' && 'Verifying Payment...'}
                  {paymentStatus === 'idle' && 'Securing Portal...'}
                  {!['creating', 'verifying', 'idle'].includes(paymentStatus) && 'Please Wait...'}
                </div>
                {paymentStatus === 'verifying' && (
                  <p className="text-[#4A5568] text-[10px] max-w-xs text-center leading-relaxed font-bold">
                    Confirming with Cashfree Gateway. Do not close this tab.
                  </p>
                )}
                {currentOrderId && paymentStatus === 'verifying' && (
                  <p className="text-[#A0AEC0] text-[9px] mt-4 font-mono font-bold">Ref: {currentOrderId}</p>
                )}
              </motion.div>
            ) : step === 'setup' ? (
              <motion.div 
                key="setup-step"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col md:flex-row w-full min-h-screen relative z-[100] bg-[#F8F9FA]"
              >
                {/* ── CINEMATIC BACKGROUND (Left Side) ── */}
                <div className="absolute inset-y-0 left-0 w-full md:w-[60%] pointer-events-none z-0">
                  <div className="absolute inset-0 bg-[#F8F9FA]" />
                  <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#FF9933]/5 blur-[100px] rounded-full" />
                  <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-[#138808]/5 blur-[100px] rounded-full" />
                </div>

                {/* ── MINIMAL NAVBAR ── */}
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="absolute top-0 inset-x-0 z-[100] flex items-center justify-center py-4 md:py-8 pointer-events-none"
                >
                  <div className="flex items-center gap-3 md:gap-5 bg-white/90 backdrop-blur-xl border border-[#E2E8F0] px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg shadow-black/5">
                    <div className="flex items-center gap-2 border-r border-[#E2E8F0] pr-3 md:pr-5">
                      <img src="/images/inkfetish_logo.png" alt="Inkfetish Logo" className="w-5 h-5 object-contain" />
                      <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-[#1A202C] hidden sm:block">Inkfetish Publications</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flag className="w-4 h-4 md:w-5 md:h-5 text-[#000080]" />
                      <span className="text-[9px] md:text-xs uppercase tracking-[0.3em] font-bold text-[#000080]">
                        Bharat Writes
                      </span>
                    </div>
                  </div>
                </motion.div>
                
                {/* ── RIGHT SIDE: ARTWORK WITH DIAGONAL CUT ── */}
                <div className="w-full shrink-0 md:w-[50%] md:absolute md:top-0 md:right-0 md:bottom-0 z-10 order-1 md:order-2 h-[45vh] md:h-screen relative pt-16 md:pt-0">
                  <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#F8F9FA] to-transparent z-20 md:hidden" />
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#F8F9FA] to-transparent z-20 md:hidden" />
                  <div 
                    className="w-full h-full bg-cover bg-[center_top] md:bg-cover md:bg-[center_left] md:[clip-path:polygon(15%_0,100%_0,100%_100%,0%_100%)] relative bg-[url('https://res.cloudinary.com/dde8ekuuu/image/upload/v1785959354/ChatGPT_Image_Aug_6_2026_01_18_09_AM_1_pux2r7.png')] md:bg-[url('https://res.cloudinary.com/dde8ekuuu/image/upload/v1785959357/ChatGPT_Image_Aug_6_2026_01_18_06_AM_1_yfxsk5.png')]"
                  >
                    <div className="absolute inset-0 bg-[#000080]/10 mix-blend-overlay pointer-events-none" />
                    <div className="absolute inset-0 shadow-[inset_20px_0_40px_rgba(248,249,250,1)] hidden md:block" />
                  </div>
                </div>

                {/* ── LEFT SIDE: CONTENT & FORM ── */}
                <div className="w-full md:w-[55%] relative z-20 order-2 md:order-1 flex flex-col justify-center pb-12 pt-0 md:py-10 px-6 lg:px-16 xl:px-24 mt-2 md:mt-0">
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-lg mx-auto md:mx-0"
                  >
                    {/* Header */}
                    <div className="space-y-4 mb-10 text-center md:text-left mt-8 md:mt-0">
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="w-14 h-14 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center mx-auto md:mx-0 shadow-lg relative"
                      >
                        <Shield className="w-6 h-6 text-[#000080]" />
                        <div className="absolute top-0 right-0 w-3 h-3 bg-[#138808] rounded-full border border-white animate-pulse" />
                      </motion.div>
                      
                      <div>
                        <div className="text-xs md:text-[13px] uppercase tracking-[0.3em] font-bold text-[#FF9933] mb-2 mt-4 md:mt-0">
                          National Independence Poetry Contest
                        </div>
                        <h1 className="text-4xl lg:text-[55px] font-display font-black text-[#000080] tracking-tight leading-[1.1] mb-4">
                          Registration <span className={`text-[#138808] font-normal tracking-normal ${greatVibes.className}`} style={{ fontSize: '1.3em', verticalAlign: 'middle' }}>Portal</span><br />
                          for <span className="text-[#138808]">Writers</span>
                        </h1>
                        <p className="text-sm text-[#4A5568] font-bold max-w-sm mx-auto md:mx-0 leading-relaxed">
                          Enter your official details to access the secure submission portal for Bharat writers
                        </p>
                      </div>
                    </div>
                    
                    {/* Form Box */}
                    <div className="relative mt-2">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E8F0] shadow-[0_20px_50px_rgba(0,0,128,0.05)] relative z-10"
                      >
                        <div className="absolute top-0 left-0 w-full h-1 flex rounded-t-xl overflow-hidden">
                          <div className="h-full flex-1 bg-[#FF9933]" />
                          <div className="h-full flex-1 bg-white" />
                          <div className="h-full flex-1 bg-[#138808]" />
                        </div>

                        <form onSubmit={handleOnboardingSubmit} className="space-y-6 relative z-10 mt-2">
                          <div className="space-y-2 group">
                            <label className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#4A5568] font-black flex items-center justify-between">
                              <span>Legal Name</span>
                              <User className="w-3.5 h-3.5 text-[#A0AEC0]" />
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <User className="w-4 h-4 text-[#A0AEC0]" />
                              </div>
                              <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="As it should appear on certificate"
                                required
                                className="w-full bg-[#F7FAFC] border-2 border-[#E2E8F0] pl-11 pr-5 py-3.5 text-sm text-[#1A202C] placeholder-[#A0AEC0] rounded-lg outline-none focus:border-[#000080] focus:bg-white transition-all font-bold shadow-sm"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2 group">
                            <label className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#4A5568] font-black flex items-center justify-between">
                              <span>WhatsApp Contact</span>
                              <Phone className="w-3.5 h-3.5 text-[#A0AEC0]" />
                            </label>
                            <div className="flex items-stretch relative">
                              <div className="flex items-center justify-center bg-[#EDF2F7] border-2 border-[#E2E8F0] border-r-0 px-3 rounded-l-lg z-10 relative shadow-sm">
                                <span className="text-lg mr-1.5 leading-none">🇮🇳</span>
                                <span className="text-sm text-[#4A5568] font-black">+91</span>
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
                                className="w-full bg-[#F7FAFC] border-2 border-[#E2E8F0] border-l-0 pl-3 pr-5 py-3.5 text-sm text-[#1A202C] placeholder-[#A0AEC0] rounded-r-lg outline-none focus:border-[#000080] focus:bg-white transition-all font-bold relative shadow-sm"
                                style={{ marginLeft: '-1px' }}
                              />
                            </div>
                          </div>

                          <div className="space-y-2 group">
                            <label className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#4A5568] font-black flex items-center justify-between">
                              <span>Email Address</span>
                              <Mail className="w-3.5 h-3.5 text-[#A0AEC0]" />
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail className="w-4 h-4 text-[#A0AEC0]" />
                              </div>
                              <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="For official communications"
                                required
                                className="w-full bg-[#F7FAFC] border-2 border-[#E2E8F0] pl-11 pr-5 py-3.5 text-sm text-[#1A202C] placeholder-[#A0AEC0] rounded-lg outline-none focus:border-[#000080] focus:bg-white transition-all font-bold shadow-sm"
                              />
                            </div>
                          </div>
                          
                          <div className="pt-4">
                            <button 
                              type="submit" 
                              className="w-full relative group rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all"
                            >
                              <div className="w-full py-5 bg-[#000080] hover:bg-[#1A202C] text-white font-black uppercase tracking-[0.2em] text-xs transition-colors flex items-center justify-center gap-3">
                                PROCEED TO PORTAL <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
                      className="mt-6 text-[9px] uppercase tracking-[0.2em] font-bold text-[#A0AEC0] text-center md:text-left flex items-center justify-center md:justify-start gap-2"
                    >
                      <Shield className="w-3 h-3" /> Secure Registration Portal
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
                className="w-full h-full min-h-screen flex items-center justify-center bg-[#F8F9FA] p-4"
              >
                <div className="w-full max-w-xl mx-auto bg-white border border-[#E2E8F0] p-10 rounded-xl shadow-lg relative overflow-hidden animate-in fade-in zoom-in duration-500">
                  <div className="absolute top-0 left-0 w-full h-1 flex">
                    <div className="h-full flex-1 bg-[#FF9933]" />
                    <div className="h-full flex-1 bg-white" />
                    <div className="h-full flex-1 bg-[#138808]" />
                  </div>
                  <div className="text-center mb-8">
                    <button onClick={() => setStep('setup')} className="text-[#A0AEC0] hover:text-[#000080] mb-4 flex items-center justify-center gap-2 mx-auto text-sm font-semibold transition-colors">
                      <ArrowLeft className="w-4 h-4" /> Edit Profile
                    </button>
                    <h2 className="text-3xl font-display font-bold text-[#000080] mb-3">Select Category</h2>
                    <p className="text-[#4A5568] text-sm">Choose your submission classification for Bharat Writes.</p>
                  </div>

                  <div className="space-y-4">
                    <div 
                      onClick={() => initiatePayment('single')}
                      className={`relative overflow-hidden border-2 rounded-xl p-6 cursor-pointer transition-all ${
                        paymentStatus === 'creating' ? 'opacity-50 pointer-events-none' : 'hover:border-[#000080] bg-white border-[#E2E8F0]'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-[#1A202C]">Bharat Writes 1 Poem Entry</h3>
                          <p className="text-[#4A5568] text-sm mt-1">Single poem submission</p>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-[#000080]">₹1</span>
                        </div>
                      </div>
                      <ul className="space-y-3 text-sm text-[#4A5568]">
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#138808]" /> Submit 1 Poem (Max 2 pages)</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#138808]" /> National E-Certificate of Participation</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#138808]" /> Eligible for Official Anthology Publication</li>
                      </ul>
                    </div>

                    <div 
                      onClick={() => initiatePayment('double')}
                      className={`relative overflow-hidden border-2 rounded-xl p-6 cursor-pointer transition-all ${
                        paymentStatus === 'creating' ? 'opacity-50 pointer-events-none' : 'hover:border-[#FF9933] bg-[#FFFaf0] border-[#FF9933]'
                      }`}
                    >
                      <div className="absolute top-0 right-0 bg-[#FF9933] text-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-bl-lg">Recommended</div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-[#1A202C]">Bharat Writes 2 Poem Entry</h3>
                          <p className="text-[#4A5568] text-sm mt-1">Two poem submissions</p>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-[#FF9933]">₹2</span>
                        </div>
                      </div>
                      <ul className="space-y-3 text-sm text-[#4A5568]">
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#138808]" /> Submit 2 Poems (Higher selection chance)</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#138808]" /> Special Recognition E-Certificate</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#138808]" /> Priority consideration for anthology</li>
                      </ul>
                    </div>

                    <div 
                      onClick={() => initiatePayment('triple')}
                      className={`relative overflow-hidden border-2 rounded-xl p-6 cursor-pointer transition-all ${
                        paymentStatus === 'creating' ? 'opacity-50 pointer-events-none' : 'hover:border-[#138808] bg-[#F0FFF4] border-[#138808]'
                      }`}
                    >
                      <div className="absolute top-0 right-0 bg-[#138808] text-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-bl-lg">Premium</div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-[#1A202C]">Bharat Writes 3 Poem Entry</h3>
                          <p className="text-[#4A5568] text-sm mt-1">Three poem submissions</p>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-[#138808]">₹3</span>
                        </div>
                      </div>
                      <ul className="space-y-3 text-sm text-[#4A5568]">
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#138808]" /> Submit 3 Poems (Highest selection chance)</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#138808]" /> Premium Recognition E-Certificate</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#138808]" /> Guaranteed publication in anthology (if selected)</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex items-center justify-center gap-2 text-xs text-[#A0AEC0]">
                    <Shield className="w-4 h-4" />
                    Payments processed securely via Cashfree Gateway (RBI Regulated)
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        ) : (
          <main className="pt-28 pb-32">
            {status === 'success' ? (
              <div className="max-w-2xl mx-auto px-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-[#E2E8F0] p-10 rounded-xl shadow-xl text-center relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 flex">
                    <div className="h-full flex-1 bg-[#FF9933]" />
                    <div className="h-full flex-1 bg-white" />
                    <div className="h-full flex-1 bg-[#138808]" />
                  </div>

                  <div className="w-20 h-20 bg-[#F0FFF4] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-[#138808]" />
                  </div>
                  
                  <h2 className="text-3xl font-display font-bold text-[#000080] mb-4">Official Submission Recorded</h2>
                  <p className="text-[#4A5568] mb-8 leading-relaxed max-w-lg mx-auto">
                    Your patriotic verse has been successfully archived in the national registry for the Bharat Writes contest. 
                    The editorial council will commence review shortly.
                  </p>

                  <div className="bg-[#F7FAFC] border border-[#E2E8F0] rounded-xl p-6 text-left mb-8">
                    <div className="flex justify-between items-center mb-6 pb-6 border-b border-[#E2E8F0]">
                      <div>
                        <p className="text-xs text-[#A0AEC0] uppercase tracking-widest font-bold mb-1">Author / Delegate</p>
                        <p className="font-semibold text-[#1A202C]">{poemSession?.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[#A0AEC0] uppercase tracking-widest font-bold mb-1">Document ID</p>
                        <p className="font-mono text-sm font-semibold text-[#1A202C]">#{poemSession?.orderId?.slice(0,8).toUpperCase()}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {poemSession?.poem1 && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-[#000080]" />
                            <div>
                              <p className="font-medium text-[#1A202C]">Entry I: {poemSession.poem1.title}</p>
                              <p className="text-xs text-[#A0AEC0]">{poemSession.poem1.wordCount} words recorded</p>
                            </div>
                          </div>
                          <span className="px-3 py-1 bg-[#E6FFFA] text-[#319795] text-xs font-bold uppercase tracking-wider rounded-full">Archived</span>
                        </div>
                      )}
                      
                      {poemSession?.poem2 && (
                        <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-[#000080]" />
                            <div>
                              <p className="font-medium text-[#1A202C]">Entry II: {poemSession.poem2.title}</p>
                              <p className="text-xs text-[#A0AEC0]">{poemSession.poem2.wordCount} words recorded</p>
                            </div>
                          </div>
                          <span className="px-3 py-1 bg-[#E6FFFA] text-[#319795] text-xs font-bold uppercase tracking-wider rounded-full">Archived</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <button 
                    onClick={() => downloadReceipt()}
                    className="w-full bg-[#000080] text-white py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-[#1A202C] transition-all flex items-center justify-center gap-3"
                  >
                    <Download className="w-5 h-5" />
                    Download Official Receipt
                  </button>
                  
                  {/* HIDDEN RECEIPT FOR PDF GENERATION */}
                  <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
                    <div id="submission-receipt" className="w-[600px] bg-white p-12 text-[#1A202C] font-display border-8 border-[#000080] relative">
                      <div className="absolute top-0 left-0 w-full h-2 flex">
                        <div className="h-full flex-1 bg-[#FF9933]" />
                        <div className="h-full flex-1 bg-white" />
                        <div className="h-full flex-1 bg-[#138808]" />
                      </div>
                      <div className="text-center border-b-2 border-[#E2E8F0] pb-8 mb-8">
                        <h1 className="text-4xl font-bold text-[#000080] mb-2 uppercase tracking-widest">Bharat Writes</h1>
                        <p className="text-[#4A5568] tracking-widest uppercase text-sm">National Independence Poetry Contest</p>
                      </div>
                      <div className="mb-10 text-center">
                        <p className="text-2xl font-bold mb-2 tracking-widest">OFFICIAL SUBMISSION RECEIPT</p>
                        <p className="text-gray-500 font-mono">ID: {poemSession?.orderId}</p>
                      </div>
                      <div className="space-y-6 text-lg mb-12">
                        <div className="flex border-b border-gray-200 pb-2"><span className="w-1/3 font-bold text-gray-500 uppercase">Delegate</span><span className="w-2/3 font-semibold">{poemSession?.name}</span></div>
                        <div className="flex border-b border-gray-200 pb-2"><span className="w-1/3 font-bold text-gray-500 uppercase">Email</span><span className="w-2/3">{poemSession?.email}</span></div>
                        <div className="flex border-b border-gray-200 pb-2"><span className="w-1/3 font-bold text-gray-500 uppercase">Status</span><span className="w-2/3 text-[#138808] font-bold uppercase">Archived Successfully</span></div>
                      </div>
                      <div className="text-center pt-8 border-t-2 border-[#E2E8F0] text-gray-500 text-sm">
                        <p>This is a system-generated document and does not require a physical signature.</p>
                        <p className={`mt-4 text-3xl text-[#000080] opacity-80 ${greatVibes.className}`}>Bharat Writes Editorial Council</p>
                        <p className="mt-2 text-xs">Inkfetish Publications © {new Date().getFullYear()}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : editorMode === 'dashboard' ? (
              <div className="max-w-4xl mx-auto px-4">
                <div className="mb-10">
                  <h1 className="text-3xl font-display font-bold text-[#000080] mb-2">Author Dashboard</h1>
                  <p className="text-[#4A5568]">Manage your submissions for the {plan === 'triple' ? 'Premium' : 'Extended'} Entry plan.</p>
                </div>
                
                <div className={`grid gap-6 ${plan === 'triple' ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
                  {/* POEM 1 SLOT */}
                  <div className={`border-2 rounded-xl p-8 relative ${poemSession?.poem1 ? 'bg-white border-[#E2E8F0]' : 'bg-[#F7FAFC] border-[#000080] shadow-sm'}`}>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-full bg-[#EDF2F7] flex items-center justify-center text-xl font-display font-bold text-[#4A5568]">
                        I
                      </div>
                      {poemSession?.poem1 ? (
                        <span className="px-3 py-1 bg-[#E6FFFA] text-[#319795] text-xs font-bold uppercase tracking-wider rounded-full">Completed</span>
                      ) : (
                        <span className="px-3 py-1 bg-[#000080] text-white text-xs font-bold uppercase tracking-wider rounded-full">Pending</span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-[#1A202C] mb-2">
                      {poemSession?.poem1 ? poemSession.poem1.title : 'Entry I'}
                    </h3>
                    
                    {poemSession?.poem1 ? (
                      <p className="text-[#4A5568] text-sm mb-6">{poemSession.poem1.wordCount} words successfully archived.</p>
                    ) : (
                      <p className="text-[#4A5568] text-sm mb-6">Compose your first patriotic verse.</p>
                    )}
                    
                    {!poemSession?.poem1 && (
                      <button 
                        onClick={() => { setActivePoemSlot(1); setEditorMode('writing'); }}
                        className="w-full py-3 bg-[#000080] text-white rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-[#1A202C] transition-all"
                      >
                        Draft Entry
                      </button>
                    )}
                    {poemSession?.poem1 && (
                      <button 
                        onClick={() => {
                          setSubmittedData(poemSession.poem1);
                          downloadReceipt(poemSession.poem1);
                        }}
                        className="w-full py-3 bg-[#EDF2F7] text-[#4A5568] rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-[#E2E8F0] transition-all flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" /> Receipt
                      </button>
                    )}
                  </div>

                  {/* POEM 2 SLOT */}
                  <div className={`border-2 rounded-xl p-8 relative ${poemSession?.poem2 ? 'bg-white border-[#E2E8F0]' : poemSession?.poem1 ? 'bg-[#F7FAFC] border-[#FF9933] shadow-sm' : 'bg-white border-[#E2E8F0] opacity-50'}`}>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-full bg-[#EDF2F7] flex items-center justify-center text-xl font-display font-bold text-[#4A5568]">
                        II
                      </div>
                      {poemSession?.poem2 ? (
                        <span className="px-3 py-1 bg-[#E6FFFA] text-[#319795] text-xs font-bold uppercase tracking-wider rounded-full">Completed</span>
                      ) : poemSession?.poem1 ? (
                        <span className="px-3 py-1 bg-[#FFFaf0] text-[#FF9933] text-xs font-bold uppercase tracking-wider rounded-full border border-[#FF9933]">Next</span>
                      ) : (
                        <span className="px-3 py-1 bg-[#EDF2F7] text-[#A0AEC0] text-xs font-bold uppercase tracking-wider rounded-full">Locked</span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-[#1A202C] mb-2">
                      {poemSession?.poem2 ? poemSession.poem2.title : 'Entry II'}
                    </h3>
                    
                    {poemSession?.poem2 ? (
                      <p className="text-[#4A5568] text-sm mb-6">{poemSession.poem2.wordCount} words successfully archived.</p>
                    ) : (
                      <p className="text-[#4A5568] text-sm mb-6">Unlock by completing Entry I.</p>
                    )}
                    
                    {poemSession?.poem1 && !poemSession?.poem2 && (
                      <button 
                        onClick={() => { setActivePoemSlot(2); setEditorMode('writing'); }}
                        className="w-full py-3 bg-[#FF9933] text-white rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-[#DD6B20] transition-all"
                      >
                        Draft Entry II
                      </button>
                    )}
                  </div>

                  {/* POEM 3 SLOT */}
                  {plan === 'triple' && (
                    <div className={`border-2 rounded-xl p-8 relative ${poemSession?.poem3 ? 'bg-white border-[#E2E8F0]' : poemSession?.poem2 ? 'bg-[#F7FAFC] border-[#138808] shadow-sm' : 'bg-white border-[#E2E8F0] opacity-50'}`}>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-full bg-[#EDF2F7] flex items-center justify-center text-xl font-display font-bold text-[#4A5568]">
                          III
                        </div>
                        {poemSession?.poem3 ? (
                          <span className="px-3 py-1 bg-[#E6FFFA] text-[#319795] text-xs font-bold uppercase tracking-wider rounded-full">Completed</span>
                        ) : poemSession?.poem2 ? (
                          <span className="px-3 py-1 bg-[#F0FFF4] text-[#138808] text-xs font-bold uppercase tracking-wider rounded-full border border-[#138808]">Next</span>
                        ) : (
                          <span className="px-3 py-1 bg-[#EDF2F7] text-[#A0AEC0] text-xs font-bold uppercase tracking-wider rounded-full">Locked</span>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold text-[#1A202C] mb-2">
                        {poemSession?.poem3 ? poemSession.poem3.title : 'Entry III'}
                      </h3>
                      
                      {poemSession?.poem3 ? (
                        <p className="text-[#4A5568] text-sm mb-6">{poemSession.poem3.wordCount} words successfully archived.</p>
                      ) : (
                        <p className="text-[#4A5568] text-sm mb-6">Unlock by completing Entry II.</p>
                      )}
                      
                      {poemSession?.poem2 && !poemSession?.poem3 && (
                        <button 
                          onClick={() => { setActivePoemSlot(3); setEditorMode('writing'); }}
                          className="w-full py-3 bg-[#138808] text-white rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-[#0E6005] transition-all"
                        >
                          Draft Entry III
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="max-w-[1400px] mx-auto px-4 lg:flex gap-8 items-start h-[calc(100vh-200px)]">
                {/* TOOLBAR */}
                <div className="lg:w-[320px] shrink-0 bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm sticky top-28 h-fit max-h-[calc(100vh-140px)] overflow-y-auto">
                  
                  <div className="mb-6 p-4 bg-[#FF9933]/10 border border-[#FF9933]/20 rounded-lg">
                    <label className="block text-[10px] font-bold text-[#FF9933] uppercase tracking-wider mb-1">Theme</label>
                    <p className="text-sm font-semibold text-[#1A202C]">Freedom, Independence, India</p>
                  </div>

                  <div className="mb-6">
                    <label className="block text-xs font-bold text-[#4A5568] uppercase tracking-wider mb-2">Title of the Verse</label>
                    <input 
                      type="text" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter the title..."
                      className="w-full bg-[#F7FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3 text-[#1A202C] focus:outline-none focus:border-[#000080] font-display transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-5 gap-2 bg-[#F7FAFC] p-2 rounded-lg border border-[#E2E8F0] mb-6">
                    <button onClick={() => editor1?.chain().focus().toggleBold().run()} className={`p-2 rounded flex items-center justify-center transition-colors ${editor1?.isActive('bold') ? 'bg-[#000080] text-white' : 'text-[#4A5568] hover:bg-[#E2E8F0]'}`}><Bold className="w-4 h-4" /></button>
                    <button onClick={() => editor1?.chain().focus().toggleItalic().run()} className={`p-2 rounded flex items-center justify-center transition-colors ${editor1?.isActive('italic') ? 'bg-[#000080] text-white' : 'text-[#4A5568] hover:bg-[#E2E8F0]'}`}><Italic className="w-4 h-4" /></button>
                    <button onClick={() => editor1?.chain().focus().toggleUnderline().run()} className={`p-2 rounded flex items-center justify-center transition-colors ${editor1?.isActive('underline') ? 'bg-[#000080] text-white' : 'text-[#4A5568] hover:bg-[#E2E8F0]'}`}><UnderlineIcon className="w-4 h-4" /></button>
                    <button onClick={() => editor1?.chain().focus().toggleStrike().run()} className={`p-2 rounded flex items-center justify-center transition-colors ${editor1?.isActive('strike') ? 'bg-[#000080] text-white' : 'text-[#4A5568] hover:bg-[#E2E8F0]'}`}><Strikethrough className="w-4 h-4" /></button>
                    <button onClick={() => editor1?.chain().focus().toggleBlockquote().run()} className={`p-2 rounded flex items-center justify-center transition-colors ${editor1?.isActive('blockquote') ? 'bg-[#000080] text-white' : 'text-[#4A5568] hover:bg-[#E2E8F0]'}`}><Quote className="w-4 h-4" /></button>
                  </div>

                  <div className="grid grid-cols-4 gap-2 bg-[#F7FAFC] p-2 rounded-lg border border-[#E2E8F0] mb-6">
                    <button onClick={() => editor1?.chain().focus().setTextAlign('left').run()} className={`p-2 rounded flex items-center justify-center transition-colors ${editor1?.isActive({ textAlign: 'left' }) ? 'bg-[#000080] text-white' : 'text-[#4A5568] hover:bg-[#E2E8F0]'}`}><AlignLeft className="w-4 h-4" /></button>
                    <button onClick={() => editor1?.chain().focus().setTextAlign('center').run()} className={`p-2 rounded flex items-center justify-center transition-colors ${editor1?.isActive({ textAlign: 'center' }) ? 'bg-[#000080] text-white' : 'text-[#4A5568] hover:bg-[#E2E8F0]'}`}><AlignCenter className="w-4 h-4" /></button>
                    <button onClick={() => editor1?.chain().focus().setTextAlign('right').run()} className={`p-2 rounded flex items-center justify-center transition-colors ${editor1?.isActive({ textAlign: 'right' }) ? 'bg-[#000080] text-white' : 'text-[#4A5568] hover:bg-[#E2E8F0]'}`}><AlignRight className="w-4 h-4" /></button>
                    <button onClick={() => editor1?.chain().focus().setTextAlign('justify').run()} className={`p-2 rounded flex items-center justify-center transition-colors ${editor1?.isActive({ textAlign: 'justify' }) ? 'bg-[#000080] text-white' : 'text-[#4A5568] hover:bg-[#E2E8F0]'}`}><AlignJustify className="w-4 h-4" /></button>
                  </div>

                  <div className="bg-[#F7FAFC] rounded-lg border border-[#E2E8F0] p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-[#4A5568] uppercase tracking-wider">Document Volume</span>
                      <span className={`text-sm font-bold ${wordCount > WORD_LIMIT ? 'text-red-600' : 'text-[#000080]'}`}>
                        {wordCount} / {WORD_LIMIT}
                      </span>
                    </div>
                    <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${wordCount > WORD_LIMIT ? 'bg-red-600' : 'bg-[#FF9933]'}`}
                        style={{ width: `${Math.min((wordCount / WORD_LIMIT) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  <button 
                    onClick={handleSubmit}
                    className="w-full bg-[#000080] text-white py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-[#1A202C] transition-all flex items-center justify-center gap-3"
                  >
                    Lodge Submission <ArrowRight className="w-4 h-4" />
                  </button>
                  
                </div>

                {/* EDITOR CANVAS */}
                <div className="flex-1 mt-8 lg:mt-0 pb-20 relative w-full overflow-x-hidden min-h-[500px]">
                  <div className="relative w-full transition-transform duration-300">
                    <div className="absolute -inset-1 bg-gradient-to-b from-[#FF9933]/20 via-[#ffffff]/0 to-[#138808]/20 rounded-lg blur opacity-75"></div>
                    <div className="relative w-full min-h-[600px] bg-white text-[#1A202C] shadow-lg rounded-sm overflow-hidden flex flex-col font-display border border-[#E2E8F0]">
                      <div className="w-full text-center py-8 pb-4 border-b border-[#E2E8F0]/50 shrink-0">
                        <h1 className="text-4xl font-bold px-12 leading-tight uppercase tracking-wide text-[#000080]" style={{ wordBreak: 'break-word' }}>
                          {title || <span className="opacity-30">Untitled Verse</span>}
                        </h1>
                        <p className="mt-4 text-sm text-[#4A5568] tracking-widest uppercase">— by {name || 'Author'} —</p>
                      </div>
                      <div className="flex-1 p-8 md:p-16 text-[17px] relative leading-relaxed">
                        <EditorContent editor={editor1} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </main>
      )}
      {status === 'confirming' && <ConfirmationModal />}

      {/* CUSTOM FOOTER */}
      <footer className="w-full bg-[#1A202C] text-white py-12 px-6 mt-auto border-t-[4px] border-[#000080]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div>
            <h2 className="text-2xl font-display font-bold uppercase tracking-widest text-[#FF9933] mb-2">Bharat Writes National Independence Poetry Contest</h2>
            <p className="text-sm tracking-[0.2em] text-[#E2E8F0] opacity-80">🇮🇳 Independence • Freedom • India • Bharat</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-[#4A5568]/30">
            <div>
              <h3 className="text-[#138808] font-bold tracking-widest uppercase text-xs mb-2 flex items-center justify-center gap-2">🌍 Languages</h3>
              <p className="text-sm text-[#A0AEC0]">All Indian languages are welcome.</p>
            </div>
            <div>
              <h3 className="text-[#138808] font-bold tracking-widest uppercase text-xs mb-2 flex items-center justify-center gap-2">✍️ Poetry Length</h3>
              <p className="text-sm text-[#A0AEC0]">There is no word limit. Express your thoughts freely.</p>
            </div>
            <div>
              <h3 className="text-[#138808] font-bold tracking-widest uppercase text-xs mb-2 flex items-center justify-center gap-2">👥 Participation Limit</h3>
              <p className="text-sm text-[#A0AEC0]">Only 100 writers will be accepted on a first-come, first-served basis.</p>
            </div>
          </div>
          
          <div>
            <div className="inline-block bg-[#000080] px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-3">MODE - ONLINE</div>
            <p className="text-lg font-serif italic text-[#E2E8F0]">Write for Bharat. Let your words become a part of history. 🇮🇳</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
