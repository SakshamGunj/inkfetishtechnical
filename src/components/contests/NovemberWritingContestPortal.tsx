'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  CheckCircle2,
  Send,
  ArrowRight,
  Clock,
  ChevronDown,
  Trophy,
  Award,
  Instagram,
  ShieldCheck,
  Sparkles,
  Lock,
  Star,
} from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, doc, setDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { load } from '@cashfreepayments/cashfree-js';
import {
  rememberNovemberOrderId,
  readRememberedNovemberOrderIds,
  saveNovemberDraftReg,
  readNovemberDraftReg,
  clearNovemberDraftAfterSubmit,
  pollNovemberPaymentStatus,
  verifyNovemberPaymentStatus,
} from '@/lib/novemberContestVerifyClient';

/* ──────────────────────────────────────────────────────────────────────────
   STRICT 3-COLOR PALETTE
   Wine:          #930400  (RGB: 147, 4, 0)
   Milk:          #FFF7E6  (RGB: 255, 247, 230)
   Heavenly Blue: #95BAEB  (RGB: 149, 186, 235)
   ────────────────────────────────────────────────────────────────────────── */

export interface NovemberSubmissionRecord {
  registrationId: string;
  docId?: string;
  fullName: string;
  email: string;
  whatsapp: string;
  age: string;
  tier?: '1_entry' | '2_entries';
  amount?: number;
  category: string;
  language: string;
  theme: string;
  title: string;
  content: string;
  lineCount: number;
  wordCount: number;
  entry2Category?: string;
  entry2Language?: string;
  entry2Title?: string;
  entry2Content?: string;
  entry2LineCount?: number;
  entry2WordCount?: number;
  status: string;
  submittedAtIso: string;
}

const CATEGORIES = ['Poetry', 'Short Story', 'Essay / Prose', 'Micro-Fiction'];

const LANGUAGES = [
  'English',
  'Hinglish',
  'Hindi',
  'Urdu',
  'Punjabi',
  'Bengali',
  'Marathi',
  'Gujarati',
  'Tamil',
  'Telugu',
  'Malayalam',
  'Kannada',
  'Other',
];

const PAST_WRITER_IMAGES = [
  {
    url: 'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775926450/WhatsApp_Image_2026-04-11_at_7.20.21_PM_1_-compressed_hgkckw.webp',
    title: 'National Winner',
    location: 'Delhi',
  },
  {
    url: 'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775926445/WhatsApp_Image_2026-04-11_at_7.20.21_PM-compressed_fxtkcv.webp',
    title: 'Anthology Author',
    location: 'Mumbai',
  },
  {
    url: 'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897600/WhatsApp_Image_2026-04-09_at_2.59.25_PM-compressed_in2led.webp',
    title: 'Poetry Winner',
    location: 'Bangalore',
  },
  {
    url: 'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897599/WhatsApp_Image_2026-04-09_at_2.53.04_PM-compressed_wsnhmu.webp',
    title: 'Certified Writer',
    location: 'Pune',
  },
  {
    url: 'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897599/WhatsApp_Image_2026-04-07_at_8.39.44_PM-compressed_ztxsge.webp',
    title: 'Story Author',
    location: 'Kolkata',
  },
  {
    url: 'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897598/WhatsApp_Image_2026-04-07_at_8.39.44_PM_2_-compressed_hfr0wv.webp',
    title: 'Merit Holder',
    location: 'Hyderabad',
  },
  {
    url: 'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897597/WhatsApp_Image_2026-04-04_at_12.20.06_PM_1_-compressed_lrqjv2.webp',
    title: 'Published Poet',
    location: 'Jaipur',
  },
  {
    url: 'https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100331/WhatsApp_Image_2026-04-13_at_9.06.50_PM-compressed_f54p62.webp',
    title: 'Literary Champion',
    location: 'Delhi',
  },
  {
    url: 'https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100331/WhatsApp_Image_2026-04-13_at_9.06.50_PM_1_-compressed_bla9w8.webp',
    title: 'Featured Author',
    location: 'Mumbai',
  },
  {
    url: 'https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100331/WhatsApp_Image_2026-04-13_at_9.06.49_PM-compressed_krdg8g.webp',
    title: 'Award Winner',
    location: 'Bangalore',
  },
  {
    url: 'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897595/WhatsApp_Image_2026-04-02_at_5.17.33_PM_3_-compressed_kosajj.webp',
    title: 'Book Launch',
    location: 'Ahmedabad',
  },
  {
    url: 'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897594/WhatsApp_Image_2026-04-02_at_5.17.33_PM_2_-compressed_sz4wld.webp',
    title: 'Jury Choice',
    location: 'Lucknow',
  },
  {
    url: 'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897594/WhatsApp_Image_2026-04-01_at_6.40.55_AM_1_-compressed_j51ngs.webp',
    title: 'Poetry Finalist',
    location: 'Chandigarh',
  },
  {
    url: 'https://res.cloudinary.com/dde8ekuuu/image/upload/v1775897593/WhatsApp_Image_2026-04-01_at_6.40.37_AM-compressed_eibjs4.webp',
    title: 'Excellence Award',
    location: 'Indore',
  },
  {
    url: 'https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_8.12.24_PM-compressed_skr10b.webp',
    title: 'Top Finalist',
    location: 'Chennai',
  },
];

export default function NovemberWritingContestPortal() {
  const router = useRouter();

  const [selectedTier, setSelectedTier] = useState<'1_entry' | '2_entries'>('1_entry');
  const [isPaid, setIsPaid] = useState(false);
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);
  const [registrationId, setRegistrationId] = useState('');
  const [docId, setDocId] = useState('');
  const [cashfree, setCashfree] = useState<any>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    age: '',
    category: 'Poetry',
    language: 'English',
    title: '',
    content: '',
    entry2Category: 'Poetry',
    entry2Language: 'English',
    entry2Title: '',
    entry2Content: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const getLineCount = (text: string) => {
    if (!text.trim()) return 0;
    return text.split(/\r?\n/).filter((line) => line.trim().length > 0).length;
  };

  const getWordCount = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  };

  const currentLineCount = getLineCount(formData.content);
  const currentWordCount = getWordCount(formData.content);
  const entry2LineCount = getLineCount(formData.entry2Content);
  const entry2WordCount = getWordCount(formData.entry2Content);

  const scrollToPortal = () => {
    const el = document.getElementById('submission-portal');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 1. Load Cashfree JS v3 SDK
  useEffect(() => {
    const initCashfree = async () => {
      try {
        const mode = (process.env.NEXT_PUBLIC_CASHFREE_MODE || 'production') as
          | 'sandbox'
          | 'production';
        const cf = await load({ mode });
        setCashfree(cf);
      } catch (err) {
        console.error('Failed to load Cashfree SDK:', err);
      }
    };
    initCashfree();
  }, []);

  // 2. Restore saved draft from localStorage & verify payment status automatically when writer returns
  useEffect(() => {
    try {
      const savedEntriesRaw = localStorage.getItem('november_contest_2026_draft_entries');
      if (savedEntriesRaw) {
        const parsedEntries = JSON.parse(savedEntriesRaw);
        setFormData((prev) => ({
          ...prev,
          category: parsedEntries.category || prev.category,
          language: parsedEntries.language || prev.language,
          title: parsedEntries.title || prev.title,
          content: parsedEntries.content || prev.content,
          entry2Category: parsedEntries.entry2Category || prev.entry2Category,
          entry2Language: parsedEntries.entry2Language || prev.entry2Language,
          entry2Title: parsedEntries.entry2Title || prev.entry2Title,
          entry2Content: parsedEntries.entry2Content || prev.entry2Content,
        }));
      }
    } catch {
      // ignore storage errors
    }

    const cleanOrderQueryFromUrl = () => {
      try {
        const url = new URL(window.location.href);
        if (url.searchParams.has('order_id') || url.searchParams.has('reg_id')) {
          url.searchParams.delete('order_id');
          url.searchParams.delete('reg_id');
          const nextSearch = url.searchParams.toString();
          window.history.replaceState(
            {},
            '',
            `${url.pathname}${nextSearch ? `?${nextSearch}` : ''}${url.hash}`
          );
        }
      } catch {
        // ignore URL cleanup errors
      }
    };

    const runRecoveryCheck = async () => {
      const savedDraft = readNovemberDraftReg();
      const savedOrderIds = readRememberedNovemberOrderIds();
      const params = new URLSearchParams(window.location.search);
      const urlOrderId = params.get('order_id') || '';
      const urlRegId = params.get('reg_id') || '';
      const previewPaid = params.get('preview_paid');

      if (previewPaid === '1' || previewPaid === '2') {
        const tier = previewPaid === '2' ? '2_entries' : '1_entry';
        setSelectedTier(tier);
        setIsPaid(true);
        setRegistrationId((prev) => prev || 'NOV26-582914');
        setFormData((prev) => ({
          ...prev,
          fullName: prev.fullName || 'Aarav Sharma',
          email: prev.email || 'writer@inkfetish.in',
          whatsapp: prev.whatsapp || '9876543210',
          age: prev.age || '22',
        }));
        return;
      }

      if (urlOrderId) {
        rememberNovemberOrderId(urlOrderId);
      }

      // Restore author registration details into Step 1 form so returning users never re-type
      if (savedDraft && !savedDraft.submitted) {
        setFormData((prev) => ({
          ...prev,
          fullName: savedDraft.fullName || prev.fullName,
          email: savedDraft.email || prev.email,
          whatsapp: savedDraft.whatsapp || prev.whatsapp,
          age: savedDraft.age || prev.age,
        }));
        setSelectedTier(savedDraft.tier || '1_entry');
        setRegistrationId(savedDraft.registrationId || urlRegId || '');
        setDocId(savedDraft.docId || urlRegId || '');

        // If user already completed payment and closed/re-opened the app, immediately show Submission Portal
        if (savedDraft.paymentStatus === 'PAID') {
          setIsPaid(true);
        }
      } else if (urlRegId) {
        setRegistrationId(urlRegId);
        setDocId(urlRegId);
      }

      const allOrderIds = Array.from(
        new Set([...savedOrderIds, ...(urlOrderId ? [urlOrderId] : [])].filter(Boolean))
      );

      // Verify against backend (Cashfree PGFetchOrder + Firestore webhook status)
      if (
        allOrderIds.length > 0 ||
        urlRegId ||
        savedDraft?.docId ||
        savedDraft?.registrationId
      ) {
        setIsCheckingPayment(true);
        const checkFn = urlOrderId ? pollNovemberPaymentStatus : verifyNovemberPaymentStatus;
        const verified = await checkFn({
          orderId: urlOrderId || allOrderIds[0],
          orderIds: allOrderIds,
          docId: urlRegId || savedDraft?.docId,
          registrationId: urlRegId || savedDraft?.registrationId,
          email: savedDraft?.email,
          phone: savedDraft?.whatsapp,
        });
        setIsCheckingPayment(false);

        if (verified.status === 'ALREADY_SUBMITTED') {
          clearNovemberDraftAfterSubmit();
          setIsPaid(false);
          cleanOrderQueryFromUrl();
          return;
        }

        if (verified.paid) {
          const reg = verified.registration;
          const nextRegId =
            reg?.registrationId ||
            urlRegId ||
            savedDraft?.registrationId ||
            `NOV26-${Math.floor(100000 + Math.random() * 900000)}`;
          const nextDocId = reg?.docId || verified.docId || urlRegId || savedDraft?.docId || '';
          const nextTier = reg?.tier || savedDraft?.tier || '1_entry';
          const nextAmount =
            reg?.amount || savedDraft?.amount || (nextTier === '2_entries' ? 499 : 399);

          setIsPaid(true);
          setErrorMessage('');
          setRegistrationId(nextRegId);
          setDocId(nextDocId);
          setSelectedTier(nextTier);

          if (reg) {
            setFormData((prev) => ({
              ...prev,
              fullName: reg.fullName || prev.fullName,
              email: reg.email || prev.email,
              whatsapp: reg.whatsapp || prev.whatsapp,
              age: reg.age || prev.age,
            }));
          }

          saveNovemberDraftReg({
            docId: nextDocId,
            registrationId: nextRegId,
            fullName: reg?.fullName || savedDraft?.fullName || '',
            email: reg?.email || savedDraft?.email || '',
            whatsapp: reg?.whatsapp || savedDraft?.whatsapp || '',
            age: reg?.age || savedDraft?.age || '',
            tier: nextTier,
            amount: nextAmount,
            paymentStatus: 'PAID',
            paidOrderId: verified.orderId,
          });
          if (urlOrderId) {
            cleanOrderQueryFromUrl();
            scrollToPortal();
          }
        } else if (savedDraft?.paymentStatus !== 'PAID') {
          // Strictly keep unpaid / failed-payment users on Step 1 Registration Form (never unlock submission portal)
          setIsPaid(false);
          const reg = verified.registration;
          if (reg) {
            setFormData((prev) => ({
              ...prev,
              fullName: prev.fullName || reg.fullName || '',
              email: prev.email || reg.email || '',
              whatsapp: prev.whatsapp || reg.whatsapp || '',
              age: prev.age || reg.age || '',
            }));
            if (reg.tier) setSelectedTier(reg.tier);
            if (reg.registrationId) setRegistrationId(reg.registrationId);
            if (reg.docId) setDocId(reg.docId);
          }

          if (savedDraft) {
            saveNovemberDraftReg({
              ...savedDraft,
              paymentStatus: 'PENDING',
            });
          }

          if (urlOrderId) {
            setErrorMessage(
              'Payment was not completed. Your registration details are saved below — click Proceed to Payment to complete your registration.'
            );
            cleanOrderQueryFromUrl();
            scrollToPortal();
          }
        }
      } else {
        setIsPaid(false);
      }
    };

    runRecoveryCheck();

    // Also re-check when user switches back from UPI app / another tab
    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === 'visible') {
        const draft = readNovemberDraftReg();
        const ids = readRememberedNovemberOrderIds();
        if (draft && draft.paymentStatus !== 'PAID' && (ids.length > 0 || draft.docId)) {
          runRecoveryCheck();
        }
      }
    };

    window.addEventListener('focus', handleVisibilityOrFocus);
    document.addEventListener('visibilitychange', handleVisibilityOrFocus);
    return () => {
      window.removeEventListener('focus', handleVisibilityOrFocus);
      document.removeEventListener('visibilitychange', handleVisibilityOrFocus);
    };
  }, []);

  // Auto-save typed entry content in localStorage while writing so copy-pasting from Notes never loses text
  useEffect(() => {
    if (!isPaid) return;
    try {
      localStorage.setItem(
        'november_contest_2026_draft_entries',
        JSON.stringify({
          category: formData.category,
          language: formData.language,
          title: formData.title,
          content: formData.content,
          entry2Category: formData.entry2Category,
          entry2Language: formData.entry2Language,
          entry2Title: formData.entry2Title,
          entry2Content: formData.entry2Content,
        })
      );
    } catch {
      // ignore storage errors
    }
  }, [
    isPaid,
    formData.category,
    formData.language,
    formData.title,
    formData.content,
    formData.entry2Category,
    formData.entry2Language,
    formData.entry2Title,
    formData.entry2Content,
  ]);

  const handleManualVerifyPayment = async () => {
    setErrorMessage('');
    const savedDraft = readNovemberDraftReg();
    const savedOrderIds = readRememberedNovemberOrderIds();
    const cleanPhone = formData.whatsapp.replace(/\D/g, '').slice(-10) || savedDraft?.whatsapp || '';
    const cleanEmail = formData.email.trim().toLowerCase() || savedDraft?.email || '';

    if (
      savedOrderIds.length === 0 &&
      !docId &&
      !savedDraft?.docId &&
      !cleanPhone &&
      !cleanEmail
    ) {
      setErrorMessage('Enter your registered WhatsApp number or Email above, then click Verify.');
      return;
    }

    setIsCheckingPayment(true);
    const verified = await verifyNovemberPaymentStatus({
      orderIds: savedOrderIds,
      docId: docId || savedDraft?.docId,
      registrationId: registrationId || savedDraft?.registrationId,
      email: cleanEmail,
      phone: cleanPhone,
    });
    setIsCheckingPayment(false);

    if (verified.paid) {
      const reg = verified.registration;
      const nextTier = reg?.tier || savedDraft?.tier || selectedTier;
      const nextRegId =
        reg?.registrationId ||
        registrationId ||
        savedDraft?.registrationId ||
        `NOV26-${Math.floor(100000 + Math.random() * 900000)}`;
      const nextDocId = reg?.docId || verified.docId || docId || savedDraft?.docId || '';

      setIsPaid(true);
      setSelectedTier(nextTier);
      setRegistrationId(nextRegId);
      setDocId(nextDocId);

      if (reg) {
        setFormData((prev) => ({
          ...prev,
          fullName: reg.fullName || prev.fullName,
          email: reg.email || prev.email,
          whatsapp: reg.whatsapp || prev.whatsapp,
          age: reg.age || prev.age,
        }));
      }

      saveNovemberDraftReg({
        docId: nextDocId,
        registrationId: nextRegId,
        fullName: reg?.fullName || formData.fullName || savedDraft?.fullName || '',
        email: reg?.email || cleanEmail,
        whatsapp: reg?.whatsapp || cleanPhone,
        age: reg?.age || formData.age || savedDraft?.age || '',
        tier: nextTier,
        amount: nextTier === '2_entries' ? 499 : 399,
        paymentStatus: 'PAID',
        paidOrderId: verified.orderId,
      });
      scrollToPortal();
    } else {
      setIsPaid(false);
      setErrorMessage('No completed payment found yet for these details. Please complete payment above.');
    }
  };

  // STEP 1 HANDLER: Register Author Details & Open Cashfree Payment (₹399 or ₹499)
  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.whatsapp.trim() ||
      !formData.age.trim()
    ) {
      setErrorMessage('Please fill in all required author registration details.');
      return;
    }

    const cleanPhone = formData.whatsapp.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit WhatsApp number.');
      return;
    }

    const amount = selectedTier === '2_entries' ? 499 : 399;
    const regCode =
      registrationId || docId || `NOV26-${Math.floor(100000 + Math.random() * 900000)}`;
    const targetDocId = docId || regCode;
    setRegistrationId(regCode);
    setDocId(targetDocId);
    setIsSubmitting(true);

    // 1. Save draft registration in localStorage BEFORE initiating payment
    saveNovemberDraftReg({
      docId: targetDocId,
      registrationId: regCode,
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      whatsapp: cleanPhone,
      age: formData.age.trim(),
      tier: selectedTier,
      amount,
      paymentStatus: 'PENDING',
    });

    // 1b. Pre-save registration in client Firestore non-blockingly in the background for maximum speed
    void setDoc(
      doc(db, 'november_writing_contest_2026', targetDocId),
      {
        registrationId: regCode,
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        whatsapp: cleanPhone,
        age: formData.age.trim(),
        tier: selectedTier,
        amount,
        contestName: 'November Poetry & Writing Contest 2026',
        updated_at: new Date().toISOString(),
      },
      { merge: true }
    ).catch(() => {});

    try {
      // Load Cashfree SDK and create order in parallel for fastest modal launch
      const defaultMode = (process.env.NEXT_PUBLIC_CASHFREE_MODE || 'production') as
        | 'sandbox'
        | 'production';
      const cfPromise = cashfree ? Promise.resolve(cashfree) : load({ mode: defaultMode });

      const orderResPromise = fetch('/api/november-contest/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: cleanPhone,
          age: formData.age.trim(),
          tier: selectedTier,
          amount,
          registrationId: regCode,
          docId: targetDocId,
        }),
      });

      let [cfInstance, res] = await Promise.all([cfPromise, orderResPromise]);

      const orderData = await res.json();
      if (!res.ok) {
        throw new Error(orderData.error || 'Failed to create payment order');
      }

      // If server specifies a mode (sandbox vs production) that differs, load matching SDK
      if (orderData.mode && orderData.mode !== defaultMode) {
        cfInstance = await load({ mode: orderData.mode });
      }
      if (cfInstance && !cashfree) {
        setCashfree(cfInstance);
      }

      const nextDocId = orderData.docId || targetDocId;
      const nextRegCode = orderData.registrationId || regCode;
      setDocId(nextDocId);
      setRegistrationId(nextRegCode);

      // If server found this registration was already PAID and unsubmitted, unlock Step 2 immediately
      if (orderData.already_paid) {
        const paidTier = orderData.tier === '2_entries' ? '2_entries' : selectedTier;
        setIsPaid(true);
        setSelectedTier(paidTier);
        saveNovemberDraftReg({
          docId: nextDocId,
          registrationId: nextRegCode,
          fullName: formData.fullName.trim(),
          email: formData.email.trim().toLowerCase(),
          whatsapp: cleanPhone,
          age: formData.age.trim(),
          tier: paidTier,
          amount: paidTier === '2_entries' ? 499 : 399,
          paymentStatus: 'PAID',
          paidOrderId: orderData.order_id,
        });
        setIsSubmitting(false);
        scrollToPortal();
        return;
      }

      if (!cfInstance) {
        throw new Error('Payment gateway could not be initialized. Please refresh and try again.');
      }

      // 3. Save order_id and docId in localStorage + client Firestore BEFORE opening Cashfree modal
      rememberNovemberOrderId(orderData.order_id);
      saveNovemberDraftReg({
        docId: nextDocId,
        registrationId: nextRegCode,
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        whatsapp: cleanPhone,
        age: formData.age.trim(),
        tier: selectedTier,
        amount,
        paymentStatus: 'PENDING',
      });

      void setDoc(
        doc(db, 'november_writing_contest_2026', nextDocId),
        {
          cashfree_order_id: orderData.order_id,
          cashfree_order_ids: arrayUnion(orderData.order_id),
          updated_at: new Date().toISOString(),
        },
        { merge: true }
      ).catch(() => {});

      void setDoc(
        doc(db, 'september_contest_registrations', nextDocId),
        {
          contest: 'november_writing_contest_2026',
          cashfree_order_id: orderData.order_id,
          cashfree_order_ids: arrayUnion(orderData.order_id),
          updated_at: new Date().toISOString(),
        },
        { merge: true }
      ).catch(() => {});

      // 4. Launch Cashfree Checkout Modal (with automatic _self redirect fallback if modal is blocked on an in-app browser)
      let result: any;
      try {
        result = await cfInstance.checkout({
          paymentSessionId: orderData.payment_session_id,
          redirectTarget: '_modal',
        });
      } catch (modalErr) {
        console.warn('Modal checkout fallback to _self redirect:', modalErr);
        await cfInstance.checkout({
          paymentSessionId: orderData.payment_session_id,
          redirectTarget: '_self',
        });
        return;
      }

      if (result?.error) {
        // Even if modal closed with error/cancel, do one quick check in case UPI completed in background
        const quickCheck = await verifyNovemberPaymentStatus({
          orderId: orderData.order_id,
          orderIds: readRememberedNovemberOrderIds(),
          docId: nextDocId,
          registrationId: nextRegCode,
          email: formData.email.trim().toLowerCase(),
          phone: cleanPhone,
        });
        if (quickCheck.paid) {
          setIsPaid(true);
          saveNovemberDraftReg({
            docId: nextDocId,
            registrationId: nextRegCode,
            fullName: formData.fullName.trim(),
            email: formData.email.trim().toLowerCase(),
            whatsapp: cleanPhone,
            age: formData.age.trim(),
            tier: selectedTier,
            amount,
            paymentStatus: 'PAID',
            paidOrderId: orderData.order_id,
          });
          void setDoc(
            doc(db, 'november_writing_contest_2026', nextDocId),
            {
              payment_status: 'PAID',
              status: 'REGISTERED_PAID',
              cashfree_order_id: orderData.order_id,
              paidAt: serverTimestamp(),
            },
            { merge: true }
          ).catch(() => {});
          setIsSubmitting(false);
          scrollToPortal();
          return;
        }
        // Keep user on Step 1 Registration Form (do NOT open submission portal)
        setIsPaid(false);
        setErrorMessage('Payment was not completed. Click below to complete payment and submit your entry.');
        setIsSubmitting(false);
        return;
      }

      // 5. Poll backend verification after checkout modal closes
      const verified = await pollNovemberPaymentStatus({
        orderId: orderData.order_id,
        orderIds: readRememberedNovemberOrderIds(),
        docId: nextDocId,
        registrationId: nextRegCode,
        email: formData.email.trim().toLowerCase(),
        phone: cleanPhone,
      });

      if (verified.paid) {
        setIsPaid(true);
        saveNovemberDraftReg({
          docId: nextDocId,
          registrationId: nextRegCode,
          fullName: formData.fullName.trim(),
          email: formData.email.trim().toLowerCase(),
          whatsapp: cleanPhone,
          age: formData.age.trim(),
          tier: selectedTier,
          amount,
          paymentStatus: 'PAID',
          paidOrderId: verified.orderId || orderData.order_id,
        });
        void setDoc(
          doc(db, 'november_writing_contest_2026', nextDocId),
          {
            payment_status: 'PAID',
            status: 'REGISTERED_PAID',
            cashfree_order_id: verified.orderId || orderData.order_id,
            paidAt: serverTimestamp(),
          },
          { merge: true }
        ).catch(() => {});
        setIsSubmitting(false);
        scrollToPortal();
      } else {
        setIsPaid(false);
        setErrorMessage('Payment was not completed yet. Click below to try again or complete your payment.');
        setIsSubmitting(false);
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      setIsPaid(false);
      setErrorMessage(err.message || 'Unable to initiate payment. Please try again.');
      setIsSubmitting(false);
    }
  };

  // STEP 2 HANDLER: Direct Entry Submission (After Payment is Verified)
  const handleFinalEntrySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.title.trim() || !formData.content.trim()) {
      setErrorMessage('Please enter your Entry Title and Writing Content.');
      return;
    }

    if (
      selectedTier === '2_entries' &&
      (!formData.entry2Title.trim() || !formData.entry2Content.trim())
    ) {
      setErrorMessage('Please enter the Title and Writing Content for your 2nd Entry.');
      return;
    }

    setIsSubmitting(true);
    const cleanPhone = formData.whatsapp.replace(/\D/g, '').slice(-10);
    const finalRegCode =
      registrationId || docId || `NOV26-${Math.floor(100000 + Math.random() * 900000)}`;
    const targetDocId = docId || finalRegCode;
    const amount = selectedTier === '2_entries' ? 499 : 399;

    const submissionPayload: NovemberSubmissionRecord = {
      registrationId: finalRegCode,
      docId: targetDocId,
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      whatsapp: cleanPhone,
      age: formData.age.trim(),
      tier: selectedTier,
      amount,
      category: formData.category,
      language: formData.language,
      theme: 'Open Theme',
      title: formData.title.trim(),
      content: formData.content.trim(),
      lineCount: currentLineCount,
      wordCount: currentWordCount,
      ...(selectedTier === '2_entries'
        ? {
            entry2Category: formData.entry2Category,
            entry2Language: formData.entry2Language,
            entry2Title: formData.entry2Title.trim(),
            entry2Content: formData.entry2Content.trim(),
            entry2LineCount,
            entry2WordCount,
          }
        : {}),
      status: 'SUBMITTED',
      submittedAtIso: new Date().toISOString(),
    };

    try {
      // Save via Server API and Client Firestore concurrently for maximum speed and 100% reliability
      const apiPromise = fetch('/api/november-contest/submit-entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionPayload),
      }).then((r) => r.ok);

      const clientPrimaryPromise = setDoc(
        doc(db, 'november_writing_contest_2026', targetDocId),
        {
          ...submissionPayload,
          contest: 'november_writing_contest_2026',
          payment_status: 'PAID',
          contestName: 'November Poetry & Writing Contest 2026',
          submittedAt: serverTimestamp(),
          updated_at: new Date().toISOString(),
        },
        { merge: true }
      ).then(() => true);

      const clientMirrorPromise = setDoc(
        doc(db, 'september_contest_submissions', targetDocId),
        {
          ...submissionPayload,
          contest: 'november_writing_contest_2026',
          payment_status: 'PAID',
          contestName: 'November Poetry & Writing Contest 2026',
          submittedAt: serverTimestamp(),
          updated_at: new Date().toISOString(),
        },
        { merge: true }
      ).then(() => true);

      const [apiResult, primaryResult, mirrorResult] = await Promise.allSettled([
        apiPromise,
        clientPrimaryPromise,
        clientMirrorPromise,
      ]);

      const anySucceeded =
        (apiResult.status === 'fulfilled' && apiResult.value === true) ||
        (primaryResult.status === 'fulfilled' && primaryResult.value === true) ||
        (mirrorResult.status === 'fulfilled' && mirrorResult.value === true);

      if (!anySucceeded) {
        await addDoc(collection(db, 'september_contest_submissions'), {
          ...submissionPayload,
          contest: 'november_writing_contest_2026',
          payment_status: 'PAID',
          contestName: 'November Poetry & Writing Contest 2026',
          createdAt: serverTimestamp(),
        });
      }

      localStorage.setItem(
        'november_contest_2026_submission',
        JSON.stringify(submissionPayload)
      );
      localStorage.removeItem('november_contest_2026_draft_entries');
      clearNovemberDraftAfterSubmit();
      router.push('/november-writing-contest/thank-you');
    } catch (err) {
      console.error('Error saving entry:', err);
      setErrorMessage('Unable to submit right now. Please check your internet connection and try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF7E6] text-[#930400] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#930400] selection:text-[#FFF7E6] overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta_Sans:wght@400;500;600;700;800&display=swap');

        .font-editorial {
          font-family: 'Instrument Serif', Georgia, serif;
        }

        @keyframes inkfetish-marquee-rtl {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .animate-marquee-rtl {
          display: flex;
          width: max-content;
          animation: inkfetish-marquee-rtl 48s linear infinite;
          will-change: transform;
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════════════
          OPTIMIZED STICKY NAVBAR WITH OFFICIAL LOGO & VERIFIED CREDENTIALS
         ══════════════════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-40 bg-[#FFF7E6]/95 backdrop-blur-md border-b border-[#930400]/15">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-2.5 min-h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src="/images/inkfetish_logo.webp"
              alt="Inkfetish Logo"
              fetchPriority="high"
              decoding="async"
              className="w-10 h-10 rounded-full object-cover border-2 border-[#930400] shrink-0"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-tight text-base sm:text-lg text-[#930400] leading-none">
                  ink.fetish
                </span>
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#95BAEB]/45 text-[#930400] text-[9px] font-extrabold uppercase tracking-wider">
                  <ShieldCheck className="w-2.5 h-2.5 text-[#930400]" />
                  <span>Verified</span>
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-semibold text-[#930400]/80 leading-snug mt-0.5">
                Officially GST &amp; MSME Registered Company Based in India
              </p>
            </div>
          </div>

          <span className="shrink-0 px-3 py-1 rounded-full bg-[#95BAEB]/40 text-[#930400] text-[11px] font-bold">
            November 2026
          </span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-8 pb-20 space-y-12 sm:space-y-16">
        {/* ══════════════════════════════════════════════════════════════════════
            1. CALM, SPACIOUS HERO HEADER
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#95BAEB]/40 text-[#930400] text-xs font-bold">
            <span>Open Theme · All Languages · Online Submission</span>
          </div>

          <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#930400] leading-[0.96]">
            November Poetry &amp;{' '}
            <span className="italic underline decoration-[#95BAEB] decoration-4 underline-offset-4">
              Writing Contest
            </span>{' '}
            2026
          </h1>

          <p className="text-xs sm:text-sm text-[#930400]/80 max-w-md mx-auto leading-relaxed">
            An initiative by <strong>Inkfetish Publication</strong>. Register and submit your poem,
            short story, or prose directly below.
          </p>

          {/* Spec Pills (Theme + 6-Avatar Trusted by 3,900+ Writers across India) */}
          <div className="pt-2 grid grid-cols-2 gap-2.5 max-w-md mx-auto text-center">
            <div className="rounded-2xl bg-[#95BAEB]/25 border border-[#95BAEB] px-3 py-3 flex flex-col items-center justify-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#930400]/75 block">
                Theme
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-[#930400] mt-0.5 block">
                Open Subject
              </span>
            </div>

            {/* 6-Icon Writer Avatar Stack + 4.9/5 Stars + Trusted by 3,900+ writers across India */}
            <div className="rounded-2xl bg-[#95BAEB]/25 border border-[#95BAEB] px-2.5 py-2.5 flex flex-col items-center justify-center">
              <div className="flex items-center justify-center -space-x-1.5 mb-1">
                {PAST_WRITER_IMAGES.slice(0, 6).map((writer, i) => (
                  <img
                    key={i}
                    src={writer.url}
                    alt={`Writer ${i + 1}`}
                    decoding="async"
                    className="w-5 h-5 rounded-full border border-[#FFF7E6] object-cover"
                  />
                ))}
              </div>
              <div className="flex items-center justify-center gap-0.5 text-[#930400] mb-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 fill-current text-[#930400]" />
                ))}
                <span className="text-[#930400] font-extrabold text-[10px] ml-0.5">4.9/5</span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#930400] leading-tight block">
                Trusted by <strong className="font-extrabold">3,900+</strong> writers across India
              </span>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            1B. CONTINUOUS RIGHT-TO-LEFT SLIDING WRITER PROOF REEL (FULL WIDTH)
           ══════════════════════════════════════════════════════════════════════ */}
        <section
          aria-label="Past Inkfetish Writers & Winners"
          className="w-screen relative left-1/2 -translate-x-1/2 space-y-3"
        >
          <p className="text-center text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#930400]/75 px-4">
            Trusted by 3,900+ Certified Writers &amp; Winners Across India
          </p>

          <div className="relative w-full overflow-hidden py-1">
            <div className="animate-marquee-rtl">
              {[...PAST_WRITER_IMAGES, ...PAST_WRITER_IMAGES].map((img, idx) => (
                <div
                  key={`${img.url}-${idx}`}
                  className="w-36 h-36 sm:w-44 sm:h-44 aspect-square mr-1 overflow-hidden border border-[#930400]/15 bg-[#95BAEB]/20 shrink-0"
                >
                  <img
                    src={img.url}
                    alt="Inkfetish Contest Writer"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 2 Side-by-Side Writer Collage Images in 1 Compact Row Below Sliding Strip */}
          <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-1">
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
              {[
                'https://res.cloudinary.com/dde8ekuuu/image/upload/f_auto,q_auto,w_800/v1793560521/Screenshot_2026-11-02_at_12.41.34_AM_a2hm5g.png',
                'https://res.cloudinary.com/dde8ekuuu/image/upload/f_auto,q_auto,w_800/v1793560517/Screenshot_2026-11-02_at_12.41.23_AM_g8yees.png',
              ].map((imgUrl, idx) => (
                <div
                  key={imgUrl}
                  className="overflow-hidden border border-[#930400]/15 bg-[#95BAEB]/15"
                >
                  <img
                    src={imgUrl}
                    alt={`Inkfetish Certified Writers Collage ${idx + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto block object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            2. TWO-PART OFFICIAL PORTAL CARD:
               PART A (UNPAID): AUTHOR DETAILS + ENTRY PLAN (₹399 / ₹499) + CASHFREE PAY
               PART B (PAID):   DIRECT ENTRY SUBMISSION UNLOCKED IN-PLACE
           ══════════════════════════════════════════════════════════════════════ */}
        <section
          id="submission-portal"
          className="rounded-2xl sm:rounded-3xl border-2 border-[#930400] bg-[#FFF7E6] shadow-xl overflow-hidden scroll-mt-16"
        >
          {/* Official Wine Top Banner — Compact on Mobile */}
          <div className="bg-[#930400] text-[#FFF7E6] px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#95BAEB] text-[#930400] text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider mb-1">
                <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span>
                  {isPaid ? 'Payment Verified · Step 2 of 2' : 'Official Submission Portal'}
                </span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-4xl text-[#FFF7E6] leading-tight">
                {isPaid
                  ? selectedTier === '2_entries'
                    ? 'Submit Your 2 Contest Entries'
                    : 'Submit Your Contest Entry'
                  : 'Register & Submit Your Entry'}
              </h2>
            </div>

            {isPaid && (
              <div className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FFF7E6]/10 border border-[#FFF7E6]/20 text-[10px] sm:text-[11px] font-semibold text-[#FFF7E6]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#95BAEB]" />
                <span>{selectedTier === '2_entries' ? '2 Forms' : '1 Form'}</span>
              </div>
            )}
          </div>

          {isCheckingPayment && !isPaid && (
            <div className="bg-[#95BAEB]/30 border-b border-[#930400]/15 px-4 py-2 flex items-center justify-center gap-2 text-xs font-bold text-[#930400]">
              <Clock className="w-3.5 h-3.5 animate-spin" />
              <span>Verifying your payment status...</span>
            </div>
          )}

          {!isPaid ? (
            /* ══════════════════════════════════════════════════════════════════
               PART 1: AUTHOR REGISTRATION DETAILS + ENTRY TIER SELECTION + PAY
               ══════════════════════════════════════════════════════════════════ */
            <form onSubmit={handleProceedToPayment} className="p-4 sm:p-7 space-y-5">
              {/* ── 01: AUTHOR DETAILS ── */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#930400]/15 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-[#930400] text-[#FFF7E6] text-[10px] font-extrabold">
                      01
                    </span>
                    <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-[#930400]">
                      Author Registration Details
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#930400]/70 hidden sm:inline">
                    Used for Official Certificate
                  </span>
                </div>

                {/* Row 1: Full Name */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-[#930400] mb-1">
                    Full Name (as on Certificate) *
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full rounded-xl bg-[#FFF7E6] border-2 border-[#930400]/20 text-[#930400] font-semibold px-3 py-2.5 sm:py-3 text-[16px] sm:text-sm placeholder:text-[#930400]/40 focus:outline-none focus:border-[#930400] transition-colors"
                  />
                </div>

                {/* Row 2: WhatsApp + Age (Side-by-Side on Mobile & Desktop) */}
                <div className="grid grid-cols-12 gap-2.5 sm:gap-3">
                  <div className="col-span-8">
                    <label className="block text-[11px] sm:text-xs font-bold text-[#930400] mb-1">
                      WhatsApp Number *
                    </label>
                    <div className="flex rounded-xl overflow-hidden border-2 border-[#930400]/20 bg-[#FFF7E6] focus-within:border-[#930400] transition-colors">
                      <span className="inline-flex items-center px-2.5 sm:px-3 bg-[#95BAEB]/35 text-[#930400] text-xs font-extrabold border-r border-[#930400]/15">
                        +91
                      </span>
                      <input
                        type="tel"
                        inputMode="numeric"
                        required
                        maxLength={10}
                        autoComplete="tel"
                        placeholder="10-digit number"
                        value={formData.whatsapp}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            whatsapp: e.target.value.replace(/\D/g, '').slice(0, 10),
                          })
                        }
                        className="w-full bg-[#FFF7E6] text-[#930400] font-semibold px-2.5 sm:px-3 py-2.5 sm:py-3 text-[16px] sm:text-sm placeholder:text-[#930400]/40 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="col-span-4">
                    <label className="block text-[11px] sm:text-xs font-bold text-[#930400] mb-1">
                      Your Age *
                    </label>
                    <input
                      type="number"
                      inputMode="numeric"
                      required
                      min={8}
                      max={99}
                      placeholder="e.g. 21"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full rounded-xl bg-[#FFF7E6] border-2 border-[#930400]/20 text-[#930400] font-semibold px-2.5 sm:px-3 py-2.5 sm:py-3 text-[16px] sm:text-sm placeholder:text-[#930400]/40 focus:outline-none focus:border-[#930400] transition-colors"
                    />
                  </div>
                </div>

                {/* Row 3: Email Address */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-[#930400] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl bg-[#FFF7E6] border-2 border-[#930400]/20 text-[#930400] font-semibold px-3 py-2.5 sm:py-3 text-[16px] sm:text-sm placeholder:text-[#930400]/40 focus:outline-none focus:border-[#930400] transition-colors"
                  />
                </div>
              </div>

              {/* ── 02: SELECT HOW MANY ENTRIES YOU WANT TO SUBMIT ── */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between border-b border-[#930400]/15 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-[#930400] text-[#FFF7E6] text-[10px] font-extrabold">
                      02
                    </span>
                    <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-[#930400]">
                      How Many Entries to Submit?
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#930400]/70">
                    Select Plan
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                  {/* Option 1: 1 Entry — ₹399 */}
                  <button
                    type="button"
                    onClick={() => setSelectedTier('1_entry')}
                    className={`text-left rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border-2 transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                      selectedTier === '1_entry'
                        ? 'bg-[#930400] text-[#FFF7E6] border-[#930400] shadow-md'
                        : 'bg-[#FFF7E6] text-[#930400] border-[#930400]/25 hover:border-[#930400]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-baseline gap-2">
                        <span className="font-editorial text-2xl sm:text-3xl leading-none">
                          ₹399
                        </span>
                        <span
                          className={`text-xs font-extrabold ${
                            selectedTier === '1_entry' ? 'text-[#95BAEB]' : 'text-[#930400]'
                          }`}
                        >
                          · 1 Entry Submission
                        </span>
                      </div>

                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          selectedTier === '1_entry'
                            ? 'border-[#95BAEB] bg-[#95BAEB]'
                            : 'border-[#930400]/40'
                        }`}
                      >
                        {selectedTier === '1_entry' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#930400]" />
                        )}
                      </span>
                    </div>

                    <p
                      className={`text-[11px] leading-snug ${
                        selectedTier === '1_entry' ? 'text-[#FFF7E6]/85' : 'text-[#930400]/75'
                      }`}
                    >
                      Submit 1 Entry + Guaranteed Certificate &amp; Appreciation Letter.
                    </p>
                  </button>

                  {/* Option 2: 2 Entries — ₹499 (+45% Winning Chance) */}
                  <button
                    type="button"
                    onClick={() => setSelectedTier('2_entries')}
                    className={`relative text-left rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border-2 transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                      selectedTier === '2_entries'
                        ? 'bg-[#930400] text-[#FFF7E6] border-[#930400] shadow-md'
                        : 'bg-[#95BAEB]/20 text-[#930400] border-[#930400]/35 hover:border-[#930400]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="font-editorial text-2xl sm:text-3xl leading-none">
                          ₹499
                        </span>
                        <span
                          className={`text-xs font-extrabold ${
                            selectedTier === '2_entries' ? 'text-[#FFF7E6]' : 'text-[#930400]'
                          }`}
                        >
                          · 2 Entries
                        </span>
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#95BAEB] text-[#930400] text-[9px] font-extrabold uppercase tracking-wider">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>+45% Winning Chance</span>
                        </span>
                      </div>

                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          selectedTier === '2_entries'
                            ? 'border-[#95BAEB] bg-[#95BAEB]'
                            : 'border-[#930400]/40'
                        }`}
                      >
                        {selectedTier === '2_entries' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#930400]" />
                        )}
                      </span>
                    </div>

                    <p
                      className={`text-[11px] leading-snug ${
                        selectedTier === '2_entries' ? 'text-[#FFF7E6]/85' : 'text-[#930400]/75'
                      }`}
                    >
                      Submit 2 Entries · <strong>45% higher chance of winning Top 10</strong> +
                      Double Jury Review.
                    </p>
                  </button>
                </div>
              </div>

              {errorMessage && (
                <div className="rounded-xl bg-[#930400]/10 border border-[#930400]/30 px-3.5 py-2 text-xs font-bold text-[#930400]">
                  ⚠️ {errorMessage}
                </div>
              )}

              {/* Pay & Proceed CTA Button */}
              <div className="space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-[#930400] hover:opacity-95 text-[#FFF7E6] font-extrabold text-sm sm:text-base py-3.5 sm:py-4 px-5 shadow-md transition-opacity flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-4 h-4 animate-spin text-[#95BAEB]" />
                      <span>Opening Secure Payment...</span>
                    </>
                  ) : (
                    <>
                      <span>
                        Pay ₹{selectedTier === '2_entries' ? '499' : '399'} &amp; Submit Your{' '}
                        {selectedTier === '2_entries' ? '2 Entries' : 'Entry'}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#95BAEB]" />
                    </>
                  )}
                </button>

                <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[10px] sm:text-[11px] font-semibold text-[#930400]/75 text-center">
                  <span className="inline-flex items-center gap-1">
                    <Lock className="w-3 h-3 text-[#930400]" />
                    <span>100% Secure Checkout</span>
                  </span>
                  <span>·</span>
                  <span>Entry Form Opens Here After Payment</span>
                </div>
              </div>
            </form>
          ) : (
            /* ══════════════════════════════════════════════════════════════════
               PART 2: DIRECT ENTRY SUBMISSION (UNLOCKED IN-PLACE AFTER PAYMENT)
               - If 1_entry (₹399): Renders 1 Entry Submission Form
               - If 2_entries (₹499): Renders 2 Entry Submission Forms (Entry 1 + Entry 2)
               ══════════════════════════════════════════════════════════════════ */
            <form onSubmit={handleFinalEntrySubmit} className="p-4 sm:p-7 space-y-4 sm:space-y-5">
              {/* Verified Author Summary Strip */}
              <div className="rounded-xl bg-[#95BAEB]/30 border border-[#95BAEB] px-3.5 py-2.5 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#930400] truncate">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#930400] shrink-0" />
                    <span className="truncate">Verified: {formData.fullName}</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] font-semibold text-[#930400]/80">
                    ID: <strong>{registrationId}</strong> ·{' '}
                    {selectedTier === '2_entries' ? '2 Entries Plan (₹499)' : '1 Entry Plan (₹399)'}
                  </p>
                </div>
                <span className="shrink-0 px-2 py-0.5 rounded-full bg-[#930400] text-[#FFF7E6] text-[9px] font-extrabold uppercase tracking-wider">
                  Paid ✓
                </span>
              </div>

              {/* ── ENTRY SUBMISSION FORM #1 ── */}
              <div className="rounded-xl sm:rounded-2xl border-2 border-[#930400]/20 bg-[#FFF7E6] p-3.5 sm:p-5 space-y-3.5">
                <div className="flex items-center justify-between border-b border-[#930400]/15 pb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-[#930400] text-[#FFF7E6] text-[10px] font-extrabold uppercase tracking-wider">
                      {selectedTier === '2_entries' ? 'Entry 01' : 'Entry'}
                    </span>
                    <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-[#930400]">
                      {selectedTier === '2_entries'
                        ? 'First Contest Entry (1 of 2)'
                        : 'Your Contest Entry'}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#930400]/70 hidden sm:inline">
                    Theme: Open Subject
                  </span>
                </div>

                {/* 1-Tap Category Pills */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-[#930400] mb-1.5">
                    Select Category *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                    {CATEGORIES.map((cat) => {
                      const active = formData.category === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setFormData({ ...formData, category: cat })}
                          className={`rounded-lg sm:rounded-xl py-2 px-2.5 text-xs font-extrabold transition-all cursor-pointer border ${
                            active
                              ? 'bg-[#930400] text-[#FFF7E6] border-[#930400] shadow-sm'
                              : 'bg-[#95BAEB]/20 text-[#930400] border-[#930400]/20 hover:bg-[#95BAEB]/35'
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Language + Title */}
                <div className="grid grid-cols-12 gap-2.5 sm:gap-3">
                  <div className="col-span-5 sm:col-span-4">
                    <label className="block text-[11px] sm:text-xs font-bold text-[#930400] mb-1">
                      Language *
                    </label>
                    <select
                      value={formData.language}
                      onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                      className="w-full rounded-xl bg-[#FFF7E6] border-2 border-[#930400]/20 text-[#930400] font-semibold px-2.5 py-2.5 sm:py-3 text-[16px] sm:text-sm focus:outline-none focus:border-[#930400] transition-colors"
                    >
                      {LANGUAGES.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-7 sm:col-span-8">
                    <label className="block text-[11px] sm:text-xs font-bold text-[#930400] mb-1">
                      Title of Your {formData.category} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={`Enter ${formData.category.toLowerCase()} title`}
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full rounded-xl bg-[#FFF7E6] border-2 border-[#930400]/20 text-[#930400] font-semibold px-3 py-2.5 sm:py-3 text-[16px] sm:text-sm placeholder:text-[#930400]/40 focus:outline-none focus:border-[#930400] transition-colors"
                    />
                  </div>
                </div>

                {/* Writing Content */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] sm:text-xs font-bold text-[#930400]">
                      Write or Paste Your {formData.category} *
                    </label>
                    <span className="px-2 py-0.5 rounded-full bg-[#95BAEB]/35 text-[#930400] text-[10px] font-bold">
                      {currentLineCount} lines · {currentWordCount} words
                    </span>
                  </div>
                  <textarea
                    rows={6}
                    required
                    placeholder="Paste or type your complete entry here..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full rounded-xl bg-[#FFF7E6] border-2 border-[#930400]/20 text-[#930400] font-medium p-3 text-[16px] sm:text-sm placeholder:text-[#930400]/40 focus:outline-none focus:border-[#930400] leading-relaxed min-h-[145px] transition-colors"
                  />
                </div>
              </div>

              {/* ── ENTRY SUBMISSION FORM #2 (ONLY SHOWN WHEN 2 ENTRIES PLAN WAS PAID) ── */}
              {selectedTier === '2_entries' && (
                <div className="rounded-xl sm:rounded-2xl border-2 border-[#930400]/25 bg-[#95BAEB]/15 p-3.5 sm:p-5 space-y-3.5">
                  <div className="flex items-center justify-between border-b border-[#930400]/15 pb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-[#930400] text-[#FFF7E6] text-[10px] font-extrabold uppercase tracking-wider">
                        Entry 02
                      </span>
                      <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-[#930400]">
                        Second Contest Entry (2 of 2)
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold text-[#930400]/70 hidden sm:inline">
                      Theme: Open Subject
                    </span>
                  </div>

                  {/* 1-Tap Category Pills for Entry 2 */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-[#930400] mb-1.5">
                      Select Category for Entry #2 *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                      {CATEGORIES.map((cat) => {
                        const active = formData.entry2Category === cat;
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setFormData({ ...formData, entry2Category: cat })}
                            className={`rounded-lg sm:rounded-xl py-2 px-2.5 text-xs font-extrabold transition-all cursor-pointer border ${
                              active
                                ? 'bg-[#930400] text-[#FFF7E6] border-[#930400] shadow-sm'
                                : 'bg-[#95BAEB]/20 text-[#930400] border-[#930400]/20 hover:bg-[#95BAEB]/35'
                            }`}
                          >
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Language + Title for Entry 2 */}
                  <div className="grid grid-cols-12 gap-2.5 sm:gap-3">
                    <div className="col-span-5 sm:col-span-4">
                      <label className="block text-[11px] sm:text-xs font-bold text-[#930400] mb-1">
                        Language *
                      </label>
                      <select
                        value={formData.entry2Language}
                        onChange={(e) =>
                          setFormData({ ...formData, entry2Language: e.target.value })
                        }
                        className="w-full rounded-xl bg-[#FFF7E6] border-2 border-[#930400]/20 text-[#930400] font-semibold px-2.5 py-2.5 sm:py-3 text-[16px] sm:text-sm focus:outline-none focus:border-[#930400] transition-colors"
                      >
                        {LANGUAGES.map((lang) => (
                          <option key={lang} value={lang}>
                            {lang}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-7 sm:col-span-8">
                      <label className="block text-[11px] sm:text-xs font-bold text-[#930400] mb-1">
                        Title of 2nd {formData.entry2Category} *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={`Enter 2nd ${formData.entry2Category.toLowerCase()} title`}
                        value={formData.entry2Title}
                        onChange={(e) =>
                          setFormData({ ...formData, entry2Title: e.target.value })
                        }
                        className="w-full rounded-xl bg-[#FFF7E6] border-2 border-[#930400]/20 text-[#930400] font-semibold px-3 py-2.5 sm:py-3 text-[16px] sm:text-sm placeholder:text-[#930400]/40 focus:outline-none focus:border-[#930400] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Writing Content for Entry 2 */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] sm:text-xs font-bold text-[#930400]">
                        Write or Paste Your 2nd {formData.entry2Category} *
                      </label>
                      <span className="px-2 py-0.5 rounded-full bg-[#95BAEB]/35 text-[#930400] text-[10px] font-bold">
                        {entry2LineCount} lines · {entry2WordCount} words
                      </span>
                    </div>
                    <textarea
                      rows={6}
                      required
                      placeholder="Paste or type your second entry here..."
                      value={formData.entry2Content}
                      onChange={(e) =>
                        setFormData({ ...formData, entry2Content: e.target.value })
                      }
                      className="w-full rounded-xl bg-[#FFF7E6] border-2 border-[#930400]/20 text-[#930400] font-medium p-3 text-[16px] sm:text-sm placeholder:text-[#930400]/40 focus:outline-none focus:border-[#930400] leading-relaxed min-h-[145px] transition-colors"
                    />
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="rounded-xl bg-[#930400]/10 border border-[#930400]/30 px-3.5 py-2 text-xs font-bold text-[#930400]">
                  ⚠️ {errorMessage}
                </div>
              )}

              {/* Submit Final Entry Button */}
              <div className="space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-[#930400] hover:opacity-95 text-[#FFF7E6] font-extrabold text-sm sm:text-base py-3.5 sm:py-4 px-5 shadow-md transition-opacity flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-4 h-4 animate-spin text-[#95BAEB]" />
                      <span>Submitting Your Entry...</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {selectedTier === '2_entries'
                          ? 'Submit Both Contest Entries'
                          : 'Submit Your Contest Entry'}
                      </span>
                      <Send className="w-4 h-4 text-[#95BAEB]" />
                    </>
                  )}
                </button>

                <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[10px] sm:text-[11px] font-semibold text-[#930400]/75 text-center">
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#930400]" />
                    <span>100% Author Copyright</span>
                  </span>
                  <span>·</span>
                  <span>Instant Confirmation Receipt</span>
                </div>
              </div>
            </form>
          )}
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            3. BENEFITS: DISTINCT EDITORIAL FORMATS FOR WINNERS & ALL PARTICIPANTS
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-12">
          {/* ── PART A: TOP 10 WINNERS (OPEN EDITORIAL HONOR LEDGER) ── */}
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#930400]/75">
                  <Trophy className="w-3.5 h-3.5 text-[#930400]" />
                  <span>NATIONAL MERIT HONORS</span>
                </span>
                <h2 className="font-editorial text-4xl sm:text-5xl text-[#930400] leading-none mt-1">
                  Top 10 Winners
                </h2>
              </div>
              <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-[#930400] text-[#FFF7E6] text-[11px] font-bold">
                10 National Winner Positions
              </span>
            </div>

            <div className="border-y-2 border-[#930400] divide-y divide-[#930400]/15">
              {[
                {
                  num: '01',
                  title: 'Winner’s Trophy or Cash Prize',
                  desc: 'Receive an engraved National Winner Trophy or direct cash prize reward.',
                  tag: 'Trophy / Cash',
                },
                {
                  num: '02',
                  title: 'Certificate of Excellence',
                  desc: 'Signed National Merit Certificate recognizing your Top 10 distinction.',
                  tag: 'Merit Rank',
                },
                {
                  num: '03',
                  title: '@ink.fetish Feature (210K+ Readers)',
                  desc: 'Permanent spotlight of your winning piece on our official Instagram page.',
                  tag: '210K+ Reach',
                },
                {
                  num: '04',
                  title: 'Print Anthology Spotlight',
                  desc: 'Priority publication of your winning entry in our upcoming print book.',
                  tag: 'Print Feature',
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="py-4 flex items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
                    <span className="font-editorial italic text-3xl sm:text-4xl text-[#930400] leading-none w-8 shrink-0">
                      {item.num}
                    </span>
                    <div>
                      <h3 className="text-sm sm:text-base font-extrabold text-[#930400]">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#930400]/75 mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 px-2.5 py-1 rounded-full bg-[#95BAEB]/40 border border-[#95BAEB] text-[#930400] text-[10px] font-extrabold uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── PART B: EVERY PARTICIPANT (OFFICIAL GUARANTEE TICKET) ── */}
          <div className="rounded-2xl border-2 border-[#930400] overflow-hidden">
            {/* Top Header Strip */}
            <div className="bg-[#930400] text-[#FFF7E6] px-5 py-3.5 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#95BAEB]" />
                <span className="text-sm sm:text-base font-extrabold tracking-tight">
                  For Every Participant (Guaranteed for All)
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#95BAEB] text-[#930400] text-[10px] font-extrabold uppercase tracking-wider">
                100% Guaranteed
              </span>
            </div>

            {/* Clean 2x2 Divided Checklist (No nested boxes) */}
            <div className="bg-[#95BAEB]/20 grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#930400]/15">
              <div className="p-5 space-y-3.5">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#930400] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-[#930400]">
                      National Participation Certificate
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#930400]/75 mt-0.5">
                      Verifiable certificate issued to every valid entrant.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 pt-3.5 border-t border-[#930400]/12">
                  <CheckCircle2 className="w-4 h-4 text-[#930400] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-[#930400]">
                      Official Appreciation Letter
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#930400]/75 mt-0.5">
                      Personalized letter of recognition from Inkfetish Publication.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-3.5">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#930400] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-[#930400]">
                      Editorial Jury Review
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#930400]/75 mt-0.5">
                      Every entry is read and scored by our 5-member literary panel.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 pt-3.5 border-t border-[#930400]/12">
                  <CheckCircle2 className="w-4 h-4 text-[#930400] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-[#930400]">
                      100% Author Copyright
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#930400]/75 mt-0.5">
                      Complete rights and ownership of your writing remain yours.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Verification Strip */}
            <div className="bg-[#FFF7E6] border-t border-[#930400]/15 px-5 py-2.5 flex items-center justify-center gap-2 text-[11px] font-bold text-[#930400]">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>Certificates &amp; Results shared via Official WhatsApp &amp; Email</span>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            4. IMPORTANT CONTEST DETAILS & SCHEDULE (CLEAN SPEC SHEET FORMAT)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-6">
          <div className="text-center space-y-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#930400]/70">
              GUIDELINES &amp; SCHEDULE
            </p>
            <h2 className="font-editorial text-4xl sm:text-5xl text-[#930400]">
              Important Contest Details
            </h2>
          </div>

          <div className="space-y-2">
            {[
              {
                label: 'Contest Theme',
                value: 'Open Theme (Any Subject, Topic, or Emotion)',
                badge: 'Open to All',
              },
              {
                label: 'Categories',
                value: 'Poetry · Short Story · Essay / Prose · Micro-Fiction',
              },
              {
                label: 'Languages',
                value: 'English, Hinglish, Hindi, Urdu & All Indian Languages',
              },
              {
                label: 'Age Eligibility',
                value: 'Open to All Age Groups (Students, Youth & Adults)',
              },
              {
                label: 'Word / Line Limit',
                value: 'No Strict Restriction (Short to Full-Length Works)',
              },
              {
                label: 'Submission Deadline',
                value: '30 November 2026 (11:59 PM IST)',
                badge: 'Entries Open',
                highlight: true,
              },
              {
                label: 'Result Declaration',
                value: '10 December 2026 (Via Official WhatsApp & Email)',
                highlight: true,
              },
            ].map((row, idx) => (
              <div
                key={row.label}
                className={`rounded-xl px-4 sm:px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 ${
                  row.highlight
                    ? 'bg-[#930400] text-[#FFF7E6]'
                    : idx % 2 === 0
                    ? 'bg-[#95BAEB]/25 border border-[#95BAEB]/60 text-[#930400]'
                    : 'bg-[#FFF7E6] border border-[#930400]/15 text-[#930400]'
                }`}
              >
                <span
                  className={`text-xs font-extrabold uppercase tracking-wider shrink-0 ${
                    row.highlight ? 'text-[#95BAEB]' : 'text-[#930400]/75'
                  }`}
                >
                  {row.label}
                </span>

                <div className="flex flex-wrap items-center sm:justify-end gap-2">
                  <span
                    className={`text-xs sm:text-sm font-bold ${
                      row.highlight ? 'text-[#FFF7E6]' : 'text-[#930400]'
                    }`}
                  >
                    {row.value}
                  </span>
                  {row.badge && (
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        row.highlight
                          ? 'bg-[#95BAEB] text-[#930400]'
                          : 'bg-[#930400] text-[#FFF7E6]'
                      }`}
                    >
                      {row.badge}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            4B. OUR PREVIOUS WRITERS & WINNERS (3-ROW LARGE IMAGE GALLERY)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-6">
          <div className="text-center space-y-1.5">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#930400]/75">
              GLIMPSES FROM PAST EDITIONS
            </p>
            <h2 className="font-editorial text-4xl sm:text-5xl text-[#930400] leading-none">
              Our Previous Writers &amp; Winners
            </h2>
            <p className="text-xs sm:text-sm text-[#930400]/80 max-w-md mx-auto leading-relaxed pt-1">
              Celebrating poets, storytellers, and certified authors from our previous national
              writing editions across India.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {[
              'https://res.cloudinary.com/dde8ekuuu/image/upload/f_auto,q_auto,w_1200/v1793560521/Screenshot_2026-11-02_at_12.41.34_AM_a2hm5g.png',
              'https://res.cloudinary.com/dde8ekuuu/image/upload/f_auto,q_auto,w_1200/v1793560519/Screenshot_2026-11-02_at_12.37.24_AM_y0u0av.png',
              'https://res.cloudinary.com/dde8ekuuu/image/upload/f_auto,q_auto,w_1200/v1793560517/Screenshot_2026-11-02_at_12.41.23_AM_g8yees.png',
            ].map((imgUrl, idx) => (
              <div
                key={imgUrl}
                className="w-full overflow-hidden border border-[#930400]/20 bg-[#95BAEB]/15"
              >
                <img
                  src={imgUrl}
                  alt={`Inkfetish Previous Contest Writers Gallery ${idx + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto block object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            5. ABOUT INKFETISH (WITH LOGO) & PAST EVENTS
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="rounded-3xl bg-[#95BAEB]/20 border border-[#95BAEB] p-6 sm:p-8 text-center space-y-6">
          <div className="flex flex-col items-center space-y-2.5">
            <img
              src="/images/inkfetish_logo.webp"
              alt="Inkfetish Publication"
              className="w-16 h-16 rounded-full object-cover border-2 border-[#930400]"
            />
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#930400]">
              <Instagram className="w-3.5 h-3.5" />
              <span>@ink.fetish · 210,000+ Community</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#930400]">
              About Inkfetish Publication
            </h2>
            <p className="text-xs sm:text-sm text-[#930400]/80 max-w-md mx-auto leading-relaxed">
              India&apos;s trusted literary platform with 3,900+ certified writers and ₹5.75L+
              awarded across national writing and poetry editions.
            </p>
          </div>

          {/* Past Events Minimal List */}
          <div className="pt-2 border-t border-[#930400]/15">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#930400]/70 mb-3">
              OUR PAST EDITIONS
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                'The Great Indian Poetry Challenge',
                'Indian Writers League S1 & S2',
                "People's Choice Award",
                'Shakespeare Poetry Award',
                'September Writing Contest',
              ].map((ev) => (
                <span
                  key={ev}
                  className="px-3 py-1 rounded-full bg-[#FFF7E6] border border-[#930400]/20 text-xs font-semibold text-[#930400]"
                >
                  {ev}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            5. SIMPLE FAQ SECTION
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-6">
          <div className="text-center space-y-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#930400]/70">
              FAQ
            </p>
            <h2 className="font-editorial text-4xl sm:text-5xl text-[#930400]">
              Common Questions
            </h2>
          </div>

          <div className="divide-y divide-[#930400]/15 border-y border-[#930400]/15">
            {[
              {
                q: 'What is the theme and which categories can I submit?',
                a: 'The theme is completely Open. You can submit Poetry, Short Stories, Essays/Prose, or Micro-Fiction.',
              },
              {
                q: 'Which languages are accepted?',
                a: 'You can submit in English, Hinglish, Hindi, Urdu, Punjabi, Bengali, Marathi, Tamil, Telugu, or any Indian language.',
              },
              {
                q: 'How will I receive my Certificate & Results?',
                a: 'Right after submitting, join the official WhatsApp group on the Thank You page to receive your Certificate, Appreciation Letter, and Result updates.',
              },
              {
                q: 'Who owns the copyright to my writing?',
                a: 'You retain 100% copyright and ownership of your work at all times.',
              },
            ].map((item, idx) => (
              <div key={idx} className="py-1">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#930400] cursor-pointer"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#930400] shrink-0 transition-transform ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <p className="pb-4 text-xs sm:text-sm text-[#930400]/80 leading-relaxed">
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={scrollToPortal}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#930400] text-[#FFF7E6] font-extrabold text-xs sm:text-sm px-8 py-4 shadow-md hover:opacity-95 transition-opacity cursor-pointer"
            >
              <span>Submit Your Entry Now</span>
              <ArrowRight className="w-4 h-4 text-[#95BAEB]" />
            </button>
          </div>
        </section>
      </main>

      {/* ══════════════════════════════════════════════════════════════════════
          CUSTOM NOVEMBER COMPETITION & INKFETISH PUBLICATION FOOTER
         ══════════════════════════════════════════════════════════════════════ */}
      <footer className="bg-[#930400] text-[#FFF7E6] border-t-2 border-[#95BAEB]/30 pt-10 pb-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Top Brand & Official Credentials */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#FFF7E6]/15">
            <div className="flex items-center gap-3.5">
              <img
                src="/images/inkfetish_logo.webp"
                alt="Inkfetish Publication Logo"
                className="w-12 h-12 rounded-full object-cover border-2 border-[#95BAEB] shrink-0"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-extrabold tracking-tight text-[#FFF7E6]">
                    ink.fetish
                  </span>
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#95BAEB] text-[#930400] text-[9px] font-extrabold uppercase tracking-wider">
                    <ShieldCheck className="w-2.5 h-2.5 text-[#930400]" />
                    <span>Verified</span>
                  </span>
                </div>
                <p className="text-xs font-semibold text-[#95BAEB] mt-0.5">
                  Officially GST &amp; MSME Registered Company Based in India
                </p>
              </div>
            </div>

            <a
              href="https://www.instagram.com/ink.fetish/"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#FFF7E6]/10 hover:bg-[#FFF7E6]/15 border border-[#95BAEB]/40 text-xs font-bold text-[#FFF7E6] transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-[#95BAEB]" />
              <span>@ink.fetish · 210K+ Community</span>
            </a>
          </div>

          {/* Middle 2-Column Info: About Inkfetish & November Contest Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs leading-relaxed">
            <div className="space-y-2">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#95BAEB]">
                About Inkfetish Publication
              </p>
              <p className="text-[#FFF7E6]/85">
                Inkfetish Publication is one of India&apos;s leading literary platforms and
                publishing collectives, having certified over 3,900+ writers and awarded ₹5.75L+
                in prizes across national poetry and writing editions.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#95BAEB]">
                November Poetry &amp; Writing Contest 2026
              </p>
              <ul className="space-y-1 text-[#FFF7E6]/85 font-medium">
                <li>• Theme: Open Subject (Poetry, Story, Essay &amp; Micro-Fiction)</li>
                <li>• Deadline: 30 November 2026 · Results: 10 December 2026</li>
                <li>• 100% Author Copyright Retained by the Writer</li>
                <li>• Guaranteed Certificate &amp; Appreciation Letter for All</li>
              </ul>
            </div>
          </div>

          {/* Bottom Legal & Copyright Bar */}
          <div className="pt-6 border-t border-[#FFF7E6]/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#95BAEB]">
            <p>
              © {new Date().getFullYear()} Inkfetish Publication · Official November Contest Portal
            </p>
            <div className="flex items-center gap-4 text-[#FFF7E6]/80 font-semibold">
              <a href="/privacy-policy" className="hover:text-[#95BAEB] transition-colors">
                Privacy Policy
              </a>
              <span>·</span>
              <a href="/terms-of-service" className="hover:text-[#95BAEB] transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
