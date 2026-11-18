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
  Video,
  Users,
  Laptop,
  Hourglass,
  Medal,
  Truck,
} from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, doc, setDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { load } from '@cashfreepayments/cashfree-js';
import {
  rememberIwcOrderId,
  readRememberedIwcOrderIds,
  saveIwcDraftReg,
  readIwcDraftReg,
  clearIwcDraftAfterSubmit,
  pollIwcPaymentStatus,
  verifyIwcPaymentStatus,
} from '@/lib/iwcContestVerifyClient';

const IWC_COLLECTION = 'indian_writers_championship_2026';

/* ──────────────────────────────────────────────────────────────────────────
   POSTER-INSPIRED REGAL MIDNIGHT NAVY & CHAMPAGNE GOLD PALETTE
   Midnight Navy:   #081826  (Deep Literary Night Canvas)
   Royal Prussian:  #0D2438  (Elevated Card Surface)
   Champagne Gold:  #E5C687  (Primary Regal Accent & Metallic Highlights)
   Rich Gold:       #C89D54  (Gold Gradient & Borders)
   Parchment Ivory: #FBF6EC  (Crisp Warm Editorial Text)
   ────────────────────────────────────────────────────────────────────────── */

export interface IwcSubmissionRecord {
  registrationId: string;
  docId?: string;
  fullName: string;
  email: string;
  whatsapp: string;
  age: string;
  tier?: '1_entry' | '2_entries';
  amount?: number;
  homeDeliveryIncluded?: boolean;
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

const CATEGORIES = ['Poetry', 'Short Stories', 'Novels', 'Creative Writing'];

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

export default function IndianWritersChampionshipPortal() {
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
      const savedEntriesRaw = localStorage.getItem('iwc_contest_2026_draft_entries');
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
      const savedDraft = readIwcDraftReg();
      const savedOrderIds = readRememberedIwcOrderIds();
      const params = new URLSearchParams(window.location.search);
      const urlOrderId = params.get('order_id') || '';
      const urlRegId = params.get('reg_id') || '';
      const previewPaid = params.get('preview_paid');

      if (previewPaid === '1' || previewPaid === '2') {
        const tier = previewPaid === '2' ? '2_entries' : '1_entry';
        setSelectedTier(tier);
        setIsPaid(true);
        setRegistrationId((prev) => prev || 'IWC26-582914');
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
        rememberIwcOrderId(urlOrderId);
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
        const checkFn = urlOrderId ? pollIwcPaymentStatus : verifyIwcPaymentStatus;
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
          clearIwcDraftAfterSubmit();
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
            `IWC26-${Math.floor(100000 + Math.random() * 900000)}`;
          const nextDocId = reg?.docId || verified.docId || urlRegId || savedDraft?.docId || '';
          const nextTier = reg?.tier || savedDraft?.tier || '1_entry';
          const nextAmount =
            reg?.amount || savedDraft?.amount || (nextTier === '2_entries' ? 399 : 199);

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

          saveIwcDraftReg({
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
            saveIwcDraftReg({
              ...savedDraft,
              paymentStatus: 'PENDING',
            });
          }

          if (urlOrderId) {
            setErrorMessage(
              'Payment was not completed. Your registration details are saved below — click Register Now to complete your registration.'
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

    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === 'visible') {
        const draft = readIwcDraftReg();
        const ids = readRememberedIwcOrderIds();
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

  // Auto-save typed entry content in localStorage while writing
  useEffect(() => {
    if (!isPaid) return;
    try {
      localStorage.setItem(
        'iwc_contest_2026_draft_entries',
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

  // STEP 1 HANDLER: Register Author Details & Open Cashfree Payment (₹199 or ₹399)
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

    const amount = selectedTier === '2_entries' ? 399 : 199;
    const regCode =
      registrationId || docId || `IWC26-${Math.floor(100000 + Math.random() * 900000)}`;
    const targetDocId = docId || regCode;
    setRegistrationId(regCode);
    setDocId(targetDocId);
    setIsSubmitting(true);

    // 1. Save draft registration in localStorage BEFORE initiating payment
    saveIwcDraftReg({
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

    // 1b. Pre-save registration in client Firestore non-blockingly in the background
    void setDoc(
      doc(db, IWC_COLLECTION, targetDocId),
      {
        registrationId: regCode,
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        whatsapp: cleanPhone,
        age: formData.age.trim(),
        tier: selectedTier,
        amount,
        homeDeliveryIncluded: selectedTier === '2_entries',
        contest: IWC_COLLECTION,
        contestName: 'Indian Writers Championship — The National Writing Competition',
        updated_at: new Date().toISOString(),
      },
      { merge: true }
    ).catch(() => {});

    try {
      const defaultMode = (process.env.NEXT_PUBLIC_CASHFREE_MODE || 'production') as
        | 'sandbox'
        | 'production';
      const cfPromise = cashfree ? Promise.resolve(cashfree) : load({ mode: defaultMode });

      const orderResPromise = fetch('/api/indian-writers-championship/create-order', {
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

      if (orderData.already_paid) {
        const paidTier = orderData.tier === '2_entries' ? '2_entries' : selectedTier;
        setIsPaid(true);
        setSelectedTier(paidTier);
        saveIwcDraftReg({
          docId: nextDocId,
          registrationId: nextRegCode,
          fullName: formData.fullName.trim(),
          email: formData.email.trim().toLowerCase(),
          whatsapp: cleanPhone,
          age: formData.age.trim(),
          tier: paidTier,
          amount: paidTier === '2_entries' ? 399 : 199,
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
      rememberIwcOrderId(orderData.order_id);
      saveIwcDraftReg({
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
        doc(db, IWC_COLLECTION, nextDocId),
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
          contest: IWC_COLLECTION,
          cashfree_order_id: orderData.order_id,
          cashfree_order_ids: arrayUnion(orderData.order_id),
          updated_at: new Date().toISOString(),
        },
        { merge: true }
      ).catch(() => {});

      // 4. Launch Cashfree Checkout Modal (with automatic _self redirect fallback)
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
        const quickCheck = await verifyIwcPaymentStatus({
          orderId: orderData.order_id,
          orderIds: readRememberedIwcOrderIds(),
          docId: nextDocId,
          registrationId: nextRegCode,
          email: formData.email.trim().toLowerCase(),
          phone: cleanPhone,
        });
        if (quickCheck.paid) {
          setIsPaid(true);
          saveIwcDraftReg({
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
            doc(db, IWC_COLLECTION, nextDocId),
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
        setIsPaid(false);
        setErrorMessage('Payment was not completed. Click below to complete payment and submit your entry.');
        setIsSubmitting(false);
        return;
      }

      // 5. Poll backend verification after checkout modal closes
      const verified = await pollIwcPaymentStatus({
        orderId: orderData.order_id,
        orderIds: readRememberedIwcOrderIds(),
        docId: nextDocId,
        registrationId: nextRegCode,
        email: formData.email.trim().toLowerCase(),
        phone: cleanPhone,
      });

      if (verified.paid) {
        setIsPaid(true);
        saveIwcDraftReg({
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
          doc(db, IWC_COLLECTION, nextDocId),
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
      registrationId || docId || `IWC26-${Math.floor(100000 + Math.random() * 900000)}`;
    const targetDocId = docId || finalRegCode;
    const amount = selectedTier === '2_entries' ? 399 : 199;

    const submissionPayload: IwcSubmissionRecord = {
      registrationId: finalRegCode,
      docId: targetDocId,
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      whatsapp: cleanPhone,
      age: formData.age.trim(),
      tier: selectedTier,
      amount,
      homeDeliveryIncluded: selectedTier === '2_entries',
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
      const apiPromise = fetch('/api/indian-writers-championship/submit-entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionPayload),
      }).then((r) => r.ok);

      const clientPrimaryPromise = setDoc(
        doc(db, IWC_COLLECTION, targetDocId),
        {
          ...submissionPayload,
          contest: IWC_COLLECTION,
          payment_status: 'PAID',
          contestName: 'Indian Writers Championship — The National Writing Competition',
          submittedAt: serverTimestamp(),
          updated_at: new Date().toISOString(),
        },
        { merge: true }
      ).then(() => true);

      const clientMirrorPromise = setDoc(
        doc(db, 'september_contest_submissions', targetDocId),
        {
          ...submissionPayload,
          contest: IWC_COLLECTION,
          payment_status: 'PAID',
          contestName: 'Indian Writers Championship — The National Writing Competition',
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
          contest: IWC_COLLECTION,
          payment_status: 'PAID',
          contestName: 'Indian Writers Championship — The National Writing Competition',
          createdAt: serverTimestamp(),
        });
      }

      localStorage.setItem(
        'iwc_contest_2026_submission',
        JSON.stringify(submissionPayload)
      );
      localStorage.removeItem('iwc_contest_2026_draft_entries');
      clearIwcDraftAfterSubmit();
      router.push('/indian-writers-championship/thank-you');
    } catch (err) {
      console.error('Error saving entry:', err);
      setErrorMessage('Unable to submit right now. Please check your internet connection and try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#081826] text-[#FBF6EC] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#E5C687] selection:text-[#081826] overflow-x-hidden relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .font-championship {
          font-family: 'Cinzel', 'Cormorant Garamond', Georgia, serif;
        }

        .font-editorial {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }

        .gold-text-gradient {
          background: linear-gradient(180deg, #FFF5D6 0%, #E5C687 52%, #C89D54 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .gold-btn-gradient {
          background: linear-gradient(180deg, #F3DFB2 0%, #DFB973 50%, #C69A4B 100%);
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

      {/* Subtle Ambient Radial Spotlight Inspired by the Poster */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at 50% 15%, rgba(229, 198, 135, 0.10) 0%, rgba(16, 46, 71, 0.45) 45%, rgba(8, 24, 38, 0.98) 100%)',
        }}
      />

      {/* ══════════════════════════════════════════════════════════════════════
          OPTIMIZED STICKY NAVBAR WITH OFFICIAL LOGO & 216,000+ FOLLOWERS
         ══════════════════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-40 bg-[#081826]/95 backdrop-blur-md border-b border-[#E5C687]/20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-2.5 min-h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src="/images/inkfetish_logo.webp"
              alt="Inkfetish Logo"
              fetchPriority="high"
              decoding="async"
              className="w-10 h-10 rounded-full object-cover border-2 border-[#E5C687] shrink-0"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-editorial font-bold tracking-tight text-lg sm:text-xl text-[#FBF6EC] leading-none">
                  ink.fetish
                </span>
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#E5C687]/20 border border-[#E5C687]/40 text-[#E5C687] text-[9px] font-extrabold uppercase tracking-wider">
                  <ShieldCheck className="w-2.5 h-2.5 text-[#E5C687]" />
                  <span>NGO-Verified</span>
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-semibold text-[#E5C687] leading-snug mt-0.5">
                216,000+ Instagram Followers · GST &amp; MSME Registered
              </p>
            </div>
          </div>

          <span className="shrink-0 px-3 py-1 rounded-full bg-[#E5C687]/15 border border-[#E5C687]/40 text-[#E5C687] text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider">
            Only 350 Seats
          </span>
        </div>
      </header>

      <main className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 pt-8 pb-20 space-y-12 sm:space-y-16">
        {/* ══════════════════════════════════════════════════════════════════════
            1. POSTER-INSPIRED REGAL HERO HEADER
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D2438] border border-[#E5C687]/40 text-[#E5C687] text-[11px] sm:text-xs font-bold tracking-wide">
            <span>Open to Writers &amp; Poets Across India 🇮🇳 · NGO-Verified Recognition</span>
          </div>

          <div className="space-y-2">
            <h1 className="font-championship text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide gold-text-gradient leading-[1.05] uppercase">
              Indian Writers Championship
            </h1>
            <p className="font-editorial italic text-2xl sm:text-3xl text-[#FBF6EC]/90 tracking-wide">
              The National Writing Competition
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#B8CADB] max-w-md mx-auto leading-relaxed">
            Organised by <strong className="text-[#FBF6EC]">ink.fetish</strong> (216,000+ Instagram
            Followers). Submit your Poetry, Short Stories, Novels, or Creative Writing below.
          </p>

          {/* Poster Highlight Strip: 4 Key Competition Details + ₹10,000 Cash Prize Pool */}
          <div className="rounded-2xl bg-[#0D2438]/90 border border-[#E5C687]/35 p-4 sm:p-5 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3.5 border-b border-[#E5C687]/20">
              <div className="text-center sm:text-left">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#E5C687] block">
                  GRAND NATIONAL HONORS
                </span>
                <div className="font-championship text-2xl sm:text-3xl font-bold gold-text-gradient leading-tight">
                  ₹10,000 Cash Prize Pool
                </div>
                <p className="text-[11px] font-semibold text-[#FBF6EC]/85 mt-0.5">
                  1st: ₹5,000 · 2nd: ₹3,000 · 3rd: ₹1,000 · 4th: ₹1,000
                </p>
              </div>
              <div className="shrink-0 px-3.5 py-1.5 rounded-full gold-btn-gradient text-[#081826] text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                + Winner Memento &amp; Medal
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left">
              <div className="rounded-xl bg-[#081826]/80 border border-[#E5C687]/20 p-2.5 flex items-center gap-2">
                <Laptop className="w-4 h-4 text-[#E5C687] shrink-0" />
                <div>
                  <span className="text-[10px] text-[#B8CADB] block leading-tight">Mode</span>
                  <span className="text-[11px] font-extrabold text-[#FBF6EC] leading-tight block">
                    Online Entry
                  </span>
                </div>
              </div>
              <div className="rounded-xl bg-[#081826]/80 border border-[#E5C687]/20 p-2.5 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#E5C687] shrink-0" />
                <div>
                  <span className="text-[10px] text-[#B8CADB] block leading-tight">Intake</span>
                  <span className="text-[11px] font-extrabold text-[#E5C687] leading-tight block">
                    Only 350 Seats
                  </span>
                </div>
              </div>
              <div className="rounded-xl bg-[#081826]/80 border border-[#E5C687]/20 p-2.5 flex items-center gap-2">
                <Hourglass className="w-4 h-4 text-[#E5C687] shrink-0" />
                <div>
                  <span className="text-[10px] text-[#B8CADB] block leading-tight">Window</span>
                  <span className="text-[11px] font-extrabold text-[#FBF6EC] leading-tight block">
                    Open 10 Days
                  </span>
                </div>
              </div>
              <div className="rounded-xl bg-[#081826]/80 border border-[#E5C687]/20 p-2.5 flex items-center gap-2">
                <Video className="w-4 h-4 text-[#E5C687] shrink-0" />
                <div>
                  <span className="text-[10px] text-[#B8CADB] block leading-tight">Results</span>
                  <span className="text-[11px] font-extrabold text-[#E5C687] leading-tight block">
                    Live on Zoom
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Spec Pills (Entry Starts at ₹199 + 6-Avatar Trusted by 3,900+ Writers across India) */}
          <div className="pt-1 grid grid-cols-2 gap-2.5 max-w-md mx-auto text-center">
            <div className="rounded-2xl bg-[#0D2438] border border-[#E5C687]/40 px-3 py-3 flex flex-col items-center justify-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5C687] block">
                Entry Starts At
              </span>
              <span className="font-championship text-xl sm:text-2xl font-bold text-[#FBF6EC] mt-0.5 block leading-none">
                ₹199
              </span>
              <span className="text-[10px] font-semibold text-[#B8CADB] mt-1 block">
                Poetry · Stories · Novels
              </span>
            </div>

            {/* 6-Icon Writer Avatar Stack + 4.9/5 Stars + Trusted by 3,900+ writers across India */}
            <div className="rounded-2xl bg-[#0D2438] border border-[#E5C687]/40 px-2.5 py-2.5 flex flex-col items-center justify-center">
              <div className="flex items-center justify-center -space-x-1.5 mb-1">
                {PAST_WRITER_IMAGES.slice(0, 6).map((writer, i) => (
                  <img
                    key={i}
                    src={writer.url}
                    alt={`Writer ${i + 1}`}
                    decoding="async"
                    className="w-5 h-5 rounded-full border border-[#E5C687] object-cover"
                  />
                ))}
              </div>
              <div className="flex items-center justify-center gap-0.5 text-[#E5C687] mb-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 fill-current text-[#E5C687]" />
                ))}
                <span className="text-[#FBF6EC] font-extrabold text-[10px] ml-0.5">4.9/5</span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#FBF6EC] leading-tight block">
                Trusted by <strong className="text-[#E5C687]">3,900+</strong> writers across India
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
          <p className="text-center text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#E5C687] px-4">
            Trusted by 3,900+ Certified Writers &amp; Winners Across India
          </p>

          <div className="relative w-full overflow-hidden py-1">
            <div className="animate-marquee-rtl">
              {[...PAST_WRITER_IMAGES, ...PAST_WRITER_IMAGES].map((img, idx) => (
                <div
                  key={`${img.url}-${idx}`}
                  className="w-36 h-36 sm:w-44 sm:h-44 aspect-square mr-1 overflow-hidden border border-[#E5C687]/30 bg-[#0D2438] shrink-0"
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
                  className="overflow-hidden border border-[#E5C687]/30 bg-[#0D2438]"
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
               PART A (UNPAID): AUTHOR DETAILS + ENTRY PLAN (₹199 / ₹399) + CASHFREE PAY
               PART B (PAID):   DIRECT ENTRY SUBMISSION UNLOCKED IN-PLACE
           ══════════════════════════════════════════════════════════════════════ */}
        <section
          id="submission-portal"
          className="rounded-2xl sm:rounded-3xl border-2 border-[#E5C687]/70 bg-[#0D2438] shadow-2xl overflow-hidden scroll-mt-16"
        >
          {/* Official Royal Gold & Navy Top Banner */}
          <div className="bg-gradient-to-r from-[#06131E] via-[#0F2C45] to-[#06131E] border-b border-[#E5C687]/35 px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full gold-btn-gradient text-[#081826] text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider mb-1">
                <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span>
                  {isPaid ? 'Payment Verified · Step 2 of 2' : 'Official Championship Portal'}
                </span>
              </div>
              <h2 className="font-editorial font-bold text-2xl sm:text-4xl text-[#FBF6EC] leading-tight">
                {isPaid
                  ? selectedTier === '2_entries'
                    ? 'Submit Your 2 Championship Entries'
                    : 'Submit Your Championship Entry'
                  : 'Register & Submit Your Entry'}
              </h2>
            </div>

            {isPaid ? (
              <div className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#E5C687]/15 border border-[#E5C687]/40 text-[10px] sm:text-[11px] font-semibold text-[#E5C687]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5C687]" />
                <span>{selectedTier === '2_entries' ? '2 Forms' : '1 Form'}</span>
              </div>
            ) : (
              <div className="hidden sm:flex flex-col items-end text-right">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#E5C687]">
                  Limited Intake
                </span>
                <span className="text-xs font-bold text-[#FBF6EC]/85">Only 350 Participants</span>
              </div>
            )}
          </div>

          {isCheckingPayment && !isPaid && (
            <div className="bg-[#E5C687]/15 border-b border-[#E5C687]/30 px-4 py-2 flex items-center justify-center gap-2 text-xs font-bold text-[#E5C687]">
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
                <div className="flex items-center justify-between border-b border-[#E5C687]/20 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded gold-btn-gradient text-[#081826] text-[10px] font-extrabold">
                      01
                    </span>
                    <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-[#E5C687]">
                      Author Registration Details
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#B8CADB] hidden sm:inline">
                    Used for NGO-Verified Certificate
                  </span>
                </div>

                {/* Row 1: Full Name */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-[#FBF6EC] mb-1">
                    Full Name (as on Certificate) *
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full rounded-xl bg-[#081826] border-2 border-[#E5C687]/30 text-[#FBF6EC] font-semibold px-3 py-2.5 sm:py-3 text-[16px] sm:text-sm placeholder:text-[#B8CADB]/45 focus:outline-none focus:border-[#E5C687] transition-colors"
                  />
                </div>

                {/* Row 2: WhatsApp + Age (Side-by-Side on Mobile & Desktop) */}
                <div className="grid grid-cols-12 gap-2.5 sm:gap-3">
                  <div className="col-span-8">
                    <label className="block text-[11px] sm:text-xs font-bold text-[#FBF6EC] mb-1">
                      WhatsApp Number *
                    </label>
                    <div className="flex rounded-xl overflow-hidden border-2 border-[#E5C687]/30 bg-[#081826] focus-within:border-[#E5C687] transition-colors">
                      <span className="inline-flex items-center px-2.5 sm:px-3 bg-[#E5C687]/20 text-[#E5C687] text-xs font-extrabold border-r border-[#E5C687]/25">
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
                        className="w-full bg-[#081826] text-[#FBF6EC] font-semibold px-2.5 sm:px-3 py-2.5 sm:py-3 text-[16px] sm:text-sm placeholder:text-[#B8CADB]/45 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="col-span-4">
                    <label className="block text-[11px] sm:text-xs font-bold text-[#FBF6EC] mb-1">
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
                      className="w-full rounded-xl bg-[#081826] border-2 border-[#E5C687]/30 text-[#FBF6EC] font-semibold px-2.5 sm:px-3 py-2.5 sm:py-3 text-[16px] sm:text-sm placeholder:text-[#B8CADB]/45 focus:outline-none focus:border-[#E5C687] transition-colors"
                    />
                  </div>
                </div>

                {/* Row 3: Email Address */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-[#FBF6EC] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl bg-[#081826] border-2 border-[#E5C687]/30 text-[#FBF6EC] font-semibold px-3 py-2.5 sm:py-3 text-[16px] sm:text-sm placeholder:text-[#B8CADB]/45 focus:outline-none focus:border-[#E5C687] transition-colors"
                  />
                </div>
              </div>

              {/* ── 02: SELECT HOW MANY ENTRIES YOU WANT TO SUBMIT ── */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between border-b border-[#E5C687]/20 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded gold-btn-gradient text-[#081826] text-[10px] font-extrabold">
                      02
                    </span>
                    <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-[#E5C687]">
                      How Many Entries to Submit?
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#B8CADB]">
                    Select Plan
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                  {/* Option 1: 1 Entry — ₹199 */}
                  <button
                    type="button"
                    onClick={() => setSelectedTier('1_entry')}
                    className={`text-left rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border-2 transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                      selectedTier === '1_entry'
                        ? 'bg-[#E5C687]/15 text-[#FBF6EC] border-[#E5C687] shadow-lg'
                        : 'bg-[#081826] text-[#FBF6EC] border-[#E5C687]/25 hover:border-[#E5C687]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-baseline gap-2">
                        <span className="font-championship font-bold text-2xl sm:text-3xl text-[#E5C687] leading-none">
                          ₹199
                        </span>
                        <span className="text-xs font-extrabold text-[#FBF6EC]">
                          · 1 Entry Submission
                        </span>
                      </div>

                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          selectedTier === '1_entry'
                            ? 'border-[#E5C687] bg-[#E5C687]'
                            : 'border-[#E5C687]/40'
                        }`}
                      >
                        {selectedTier === '1_entry' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#081826]" />
                        )}
                      </span>
                    </div>

                    <p className="text-[11px] leading-snug text-[#B8CADB]">
                      Submit 1 Entry + Guaranteed NGO-Verified Certificate &amp; Appreciation Letter.
                    </p>
                  </button>

                  {/* Option 2: 2 Entries — ₹399 (+45% Winning Chance + Home Delivery + Double Jury Review) */}
                  <button
                    type="button"
                    onClick={() => setSelectedTier('2_entries')}
                    className={`relative text-left rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border-2 transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                      selectedTier === '2_entries'
                        ? 'bg-[#E5C687]/20 text-[#FBF6EC] border-[#E5C687] shadow-lg'
                        : 'bg-[#081826] text-[#FBF6EC] border-[#E5C687]/35 hover:border-[#E5C687]/70'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="font-championship font-bold text-2xl sm:text-3xl text-[#E5C687] leading-none">
                          ₹399
                        </span>
                        <span className="text-xs font-extrabold text-[#FBF6EC]">
                          · 2 Entries
                        </span>
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full gold-btn-gradient text-[#081826] text-[9px] font-extrabold uppercase tracking-wider">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>+45% Winning Chance</span>
                        </span>
                      </div>

                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          selectedTier === '2_entries'
                            ? 'border-[#E5C687] bg-[#E5C687]'
                            : 'border-[#E5C687]/40'
                        }`}
                      >
                        {selectedTier === '2_entries' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#081826]" />
                        )}
                      </span>
                    </div>

                    <p className="text-[11px] leading-snug text-[#B8CADB]">
                      Submit 2 Entries · <strong className="text-[#E5C687]">Home Delivery</strong> of
                      Certificate + <strong className="text-[#FBF6EC]">45% higher chance of winning</strong>{' '}
                      + Double Jury Review.
                    </p>
                  </button>
                </div>
              </div>

              {errorMessage && (
                <div className="rounded-xl bg-[#E5C687]/10 border border-[#E5C687]/40 px-3.5 py-2 text-xs font-bold text-[#E5C687]">
                  ⚠️ {errorMessage}
                </div>
              )}

              {/* Pay & Proceed CTA Button (Styled like Poster's Gold Pill Button) */}
              <div className="space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full gold-btn-gradient hover:opacity-95 text-[#081826] font-extrabold text-sm sm:text-base py-3.5 sm:py-4 px-6 shadow-xl transition-opacity flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 uppercase tracking-wider"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-4 h-4 animate-spin text-[#081826]" />
                      <span>Opening Secure Payment...</span>
                    </>
                  ) : (
                    <>
                      <span>
                        Register Now · Pay ₹{selectedTier === '2_entries' ? '399' : '199'} (
                        {selectedTier === '2_entries' ? '2 Entries + Home Delivery' : '1 Entry'})
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#081826]" />
                    </>
                  )}
                </button>

                <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[10px] sm:text-[11px] font-semibold text-[#B8CADB] text-center">
                  <span className="inline-flex items-center gap-1 text-[#E5C687]">
                    <Lock className="w-3 h-3" />
                    <span>100% Secure Cashfree Checkout</span>
                  </span>
                  <span>·</span>
                  <span>Entry Submission Form Opens Here Immediately After Payment</span>
                </div>
              </div>
            </form>
          ) : (
            /* ══════════════════════════════════════════════════════════════════
               PART 2: DIRECT ENTRY SUBMISSION (UNLOCKED IN-PLACE AFTER PAYMENT)
               - If 1_entry (₹199): Renders 1 Entry Submission Form
               - If 2_entries (₹399): Renders 2 Entry Submission Forms (Entry 1 + Entry 2)
               ══════════════════════════════════════════════════════════════════ */
            <form onSubmit={handleFinalEntrySubmit} className="p-4 sm:p-7 space-y-4 sm:space-y-5">
              {/* Verified Author Summary Strip */}
              <div className="rounded-xl bg-[#081826] border border-[#E5C687]/45 px-3.5 py-2.5 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#E5C687] truncate">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E5C687] shrink-0" />
                    <span className="truncate">Verified: {formData.fullName}</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] font-semibold text-[#B8CADB]">
                    ID: <strong className="text-[#FBF6EC]">{registrationId}</strong> ·{' '}
                    {selectedTier === '2_entries'
                      ? '2 Entries + Home Delivery Plan (₹399)'
                      : '1 Entry Plan (₹199)'}
                  </p>
                </div>
                <span className="shrink-0 px-2.5 py-0.5 rounded-full gold-btn-gradient text-[#081826] text-[9px] font-extrabold uppercase tracking-wider">
                  Paid ✓
                </span>
              </div>

              {/* ── ENTRY SUBMISSION FORM #1 ── */}
              <div className="rounded-xl sm:rounded-2xl border-2 border-[#E5C687]/30 bg-[#081826] p-3.5 sm:p-5 space-y-3.5">
                <div className="flex items-center justify-between border-b border-[#E5C687]/20 pb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded gold-btn-gradient text-[#081826] text-[10px] font-extrabold uppercase tracking-wider">
                      {selectedTier === '2_entries' ? 'Entry 01' : 'Entry'}
                    </span>
                    <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-[#E5C687]">
                      {selectedTier === '2_entries'
                        ? 'First Championship Entry (1 of 2)'
                        : 'Your Championship Entry'}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#B8CADB] hidden sm:inline">
                    Theme: Open Subject
                  </span>
                </div>

                {/* 1-Tap Category Pills */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-[#FBF6EC] mb-1.5">
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
                              ? 'gold-btn-gradient text-[#081826] border-[#E5C687] shadow-sm'
                              : 'bg-[#0D2438] text-[#FBF6EC] border-[#E5C687]/25 hover:border-[#E5C687]/60'
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
                    <label className="block text-[11px] sm:text-xs font-bold text-[#FBF6EC] mb-1">
                      Language *
                    </label>
                    <select
                      value={formData.language}
                      onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                      className="w-full rounded-xl bg-[#0D2438] border-2 border-[#E5C687]/30 text-[#FBF6EC] font-semibold px-2.5 py-2.5 sm:py-3 text-[16px] sm:text-sm focus:outline-none focus:border-[#E5C687] transition-colors"
                    >
                      {LANGUAGES.map((lang) => (
                        <option key={lang} value={lang} className="bg-[#081826] text-[#FBF6EC]">
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-7 sm:col-span-8">
                    <label className="block text-[11px] sm:text-xs font-bold text-[#FBF6EC] mb-1">
                      Title of Your {formData.category} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={`Enter ${formData.category.toLowerCase()} title`}
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full rounded-xl bg-[#0D2438] border-2 border-[#E5C687]/30 text-[#FBF6EC] font-semibold px-3 py-2.5 sm:py-3 text-[16px] sm:text-sm placeholder:text-[#B8CADB]/45 focus:outline-none focus:border-[#E5C687] transition-colors"
                    />
                  </div>
                </div>

                {/* Writing Content */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] sm:text-xs font-bold text-[#FBF6EC]">
                      Write or Paste Your {formData.category} *
                    </label>
                    <span className="px-2 py-0.5 rounded-full bg-[#E5C687]/15 border border-[#E5C687]/30 text-[#E5C687] text-[10px] font-bold">
                      {currentLineCount} lines · {currentWordCount} words
                    </span>
                  </div>
                  <textarea
                    rows={6}
                    required
                    placeholder="Paste or type your complete entry here..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full rounded-xl bg-[#0D2438] border-2 border-[#E5C687]/30 text-[#FBF6EC] font-medium p-3 text-[16px] sm:text-sm placeholder:text-[#B8CADB]/45 focus:outline-none focus:border-[#E5C687] leading-relaxed min-h-[145px] transition-colors"
                  />
                </div>
              </div>

              {/* ── ENTRY SUBMISSION FORM #2 (ONLY SHOWN WHEN 2 ENTRIES PLAN WAS PAID) ── */}
              {selectedTier === '2_entries' && (
                <div className="rounded-xl sm:rounded-2xl border-2 border-[#E5C687]/45 bg-[#081826] p-3.5 sm:p-5 space-y-3.5">
                  <div className="flex items-center justify-between border-b border-[#E5C687]/20 pb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded gold-btn-gradient text-[#081826] text-[10px] font-extrabold uppercase tracking-wider">
                        Entry 02
                      </span>
                      <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-[#E5C687]">
                        Second Championship Entry (2 of 2)
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold text-[#B8CADB] hidden sm:inline">
                      Double Jury Review Unlocked
                    </span>
                  </div>

                  {/* 1-Tap Category Pills for Entry 2 */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-[#FBF6EC] mb-1.5">
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
                                ? 'gold-btn-gradient text-[#081826] border-[#E5C687] shadow-sm'
                                : 'bg-[#0D2438] text-[#FBF6EC] border-[#E5C687]/25 hover:border-[#E5C687]/60'
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
                      <label className="block text-[11px] sm:text-xs font-bold text-[#FBF6EC] mb-1">
                        Language *
                      </label>
                      <select
                        value={formData.entry2Language}
                        onChange={(e) =>
                          setFormData({ ...formData, entry2Language: e.target.value })
                        }
                        className="w-full rounded-xl bg-[#0D2438] border-2 border-[#E5C687]/30 text-[#FBF6EC] font-semibold px-2.5 py-2.5 sm:py-3 text-[16px] sm:text-sm focus:outline-none focus:border-[#E5C687] transition-colors"
                      >
                        {LANGUAGES.map((lang) => (
                          <option key={lang} value={lang} className="bg-[#081826] text-[#FBF6EC]">
                            {lang}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-7 sm:col-span-8">
                      <label className="block text-[11px] sm:text-xs font-bold text-[#FBF6EC] mb-1">
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
                        className="w-full rounded-xl bg-[#0D2438] border-2 border-[#E5C687]/30 text-[#FBF6EC] font-semibold px-3 py-2.5 sm:py-3 text-[16px] sm:text-sm placeholder:text-[#B8CADB]/45 focus:outline-none focus:border-[#E5C687] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Writing Content for Entry 2 */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] sm:text-xs font-bold text-[#FBF6EC]">
                        Write or Paste Your 2nd {formData.entry2Category} *
                      </label>
                      <span className="px-2 py-0.5 rounded-full bg-[#E5C687]/15 border border-[#E5C687]/30 text-[#E5C687] text-[10px] font-bold">
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
                      className="w-full rounded-xl bg-[#0D2438] border-2 border-[#E5C687]/30 text-[#FBF6EC] font-medium p-3 text-[16px] sm:text-sm placeholder:text-[#B8CADB]/45 focus:outline-none focus:border-[#E5C687] leading-relaxed min-h-[145px] transition-colors"
                    />
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="rounded-xl bg-[#E5C687]/10 border border-[#E5C687]/40 px-3.5 py-2 text-xs font-bold text-[#E5C687]">
                  ⚠️ {errorMessage}
                </div>
              )}

              {/* Submit Final Entry Button */}
              <div className="space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full gold-btn-gradient hover:opacity-95 text-[#081826] font-extrabold text-sm sm:text-base py-3.5 sm:py-4 px-6 shadow-xl transition-opacity flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 uppercase tracking-wider"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-4 h-4 animate-spin text-[#081826]" />
                      <span>Submitting Your Entry...</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {selectedTier === '2_entries'
                          ? 'Submit Both Championship Entries'
                          : 'Submit Your Championship Entry'}
                      </span>
                      <Send className="w-4 h-4 text-[#081826]" />
                    </>
                  )}
                </button>

                <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[10px] sm:text-[11px] font-semibold text-[#B8CADB] text-center">
                  <span className="inline-flex items-center gap-1 text-[#E5C687]">
                    <ShieldCheck className="w-3 h-3" />
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
            3. PRIZE POOL & PARTICIPANT HONORS
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-12">
          {/* ── PART A: ₹10,000 CASH PRIZE POOL + WINNER MEMENTO + MEDAL ── */}
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#E5C687]">
                  <Trophy className="w-3.5 h-3.5 text-[#E5C687]" />
                  <span>CHAMPIONSHIP PRIZE POOL</span>
                </span>
                <h2 className="font-championship text-3xl sm:text-4xl font-bold gold-text-gradient leading-none mt-1">
                  ₹10,000 Cash Prize Pool
                </h2>
              </div>
              <span className="self-start sm:self-auto px-3 py-1 rounded-full gold-btn-gradient text-[#081826] text-[11px] font-extrabold uppercase tracking-wider">
                + Winner Memento &amp; Medal
              </span>
            </div>

            <div className="border-y-2 border-[#E5C687]/40 divide-y divide-[#E5C687]/15">
              {[
                {
                  rank: '1st',
                  prize: '₹5,000 — 1st Prize',
                  desc: '₹5,000 Direct Cash Prize + Engraved Winner Memento + Championship Medal + NGO-Verified Merit Certificate.',
                  tag: '₹5,000 + Memento + Medal',
                },
                {
                  rank: '2nd',
                  prize: '₹3,000 — 2nd Prize',
                  desc: '₹3,000 Direct Cash Prize + Engraved Winner Memento + Championship Medal + NGO-Verified Merit Certificate.',
                  tag: '₹3,000 + Memento + Medal',
                },
                {
                  rank: '3rd',
                  prize: '₹1,000 — 3rd Prize',
                  desc: '₹1,000 Direct Cash Prize + Engraved Winner Memento + Championship Medal + NGO-Verified Merit Certificate.',
                  tag: '₹1,000 + Memento + Medal',
                },
                {
                  rank: '4th',
                  prize: '₹1,000 — 4th Prize',
                  desc: '₹1,000 Direct Cash Prize + Engraved Winner Memento + Championship Medal + NGO-Verified Merit Certificate.',
                  tag: '₹1,000 + Memento + Medal',
                },
                {
                  rank: '★',
                  prize: '@ink.fetish Feature (216,000+ Followers)',
                  desc: 'Permanent spotlight of winning writers on our official Instagram page & live recognition on Zoom.',
                  tag: '216K+ Reach',
                },
              ].map((item) => (
                <div
                  key={item.rank}
                  className="py-4 flex items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
                    <span className="font-editorial italic font-bold text-2xl sm:text-3xl text-[#E5C687] leading-none w-10 shrink-0">
                      {item.rank}
                    </span>
                    <div>
                      <h3 className="text-sm sm:text-base font-extrabold text-[#FBF6EC]">
                        {item.prize}
                      </h3>
                      <p className="text-xs text-[#B8CADB] mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 px-2.5 py-1 rounded-full bg-[#0D2438] border border-[#E5C687]/40 text-[#E5C687] text-[10px] font-extrabold uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── PART B: EVERY PARTICIPANT (NGO-VERIFIED GUARANTEE TICKET) ── */}
          <div className="rounded-2xl border-2 border-[#E5C687]/60 bg-[#0D2438] overflow-hidden shadow-xl">
            {/* Top Header Strip */}
            <div className="bg-gradient-to-r from-[#06131E] via-[#0F2C45] to-[#06131E] border-b border-[#E5C687]/30 px-5 py-3.5 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#E5C687]" />
                <span className="text-sm sm:text-base font-extrabold tracking-tight text-[#FBF6EC]">
                  For Every Participant (NGO-Verified Recognition)
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full gold-btn-gradient text-[#081826] text-[10px] font-extrabold uppercase tracking-wider">
                100% Guaranteed
              </span>
            </div>

            {/* Clean 2x2 Divided Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#E5C687]/20">
              <div className="p-5 space-y-3.5">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E5C687] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-[#FBF6EC]">
                      NGO-Verified National Certificate
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#B8CADB] mt-0.5">
                      Official verifiable certificate of participation issued to every entrant.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 pt-3.5 border-t border-[#E5C687]/15">
                  <CheckCircle2 className="w-4 h-4 text-[#E5C687] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-[#FBF6EC]">
                      Official Appreciation Letter
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#B8CADB] mt-0.5">
                      Personalized letter of literary recognition from Inkfetish Publication.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-3.5">
                <div className="flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-[#E5C687] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-[#FBF6EC]">
                      Home Delivery + Double Jury (₹399 Plan)
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#B8CADB] mt-0.5">
                      2-Entry participants receive doorstep delivery + 45% higher winning chance.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 pt-3.5 border-t border-[#E5C687]/15">
                  <Medal className="w-4 h-4 text-[#E5C687] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-[#FBF6EC]">
                      Live Results on Zoom &amp; 100% Copyright
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#B8CADB] mt-0.5">
                      Results announced live on Zoom. Complete ownership of your work stays yours.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Verification Strip */}
            <div className="bg-[#081826] border-t border-[#E5C687]/20 px-5 py-2.5 flex items-center justify-center gap-2 text-[11px] font-bold text-[#E5C687]">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>Certificates, Zoom Link &amp; Updates shared via Official WhatsApp &amp; Email</span>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            4. COMPETITION DETAILS & ELIGIBILITY (SPEC SHEET FORMAT)
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-6">
          <div className="text-center space-y-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E5C687]">
              GUIDELINES &amp; FORMAT
            </p>
            <h2 className="font-championship text-3xl sm:text-4xl font-bold text-[#FBF6EC]">
              Championship Details
            </h2>
          </div>

          <div className="space-y-2">
            {[
              {
                label: 'Participation Mode',
                value: '100% Online Participation (Submit Directly From Anywhere)',
                badge: 'Online',
              },
              {
                label: 'Participant Cap',
                value: 'Only 350 Participants Across India',
                badge: 'Limited Seats',
                highlight: true,
              },
              {
                label: 'Registration Window',
                value: 'Registration Open for 10 Days Only',
                badge: '10 Days',
              },
              {
                label: 'Results Announcement',
                value: 'Results Announced Live on Zoom',
                badge: 'Live on Zoom',
                highlight: true,
              },
              {
                label: 'Categories',
                value: 'Poetry · Short Stories · Novels · Creative Writing',
              },
              {
                label: 'Eligibility',
                value: 'Open to Writers & Poets Across India 🇮🇳 (All Languages & Open Theme)',
              },
              {
                label: 'Recognition',
                value: 'NGO-Verified Recognition + Winner Memento & Medal',
              },
              {
                label: 'Entry Fee Plans',
                value: '₹199 (1 Entry) · ₹399 (2 Entries + Home Delivery + Double Jury Review)',
                badge: 'Starts at ₹199',
              },
            ].map((row, idx) => (
              <div
                key={row.label}
                className={`rounded-xl px-4 sm:px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 ${
                  row.highlight
                    ? 'bg-gradient-to-r from-[#0F2C45] to-[#153A59] border border-[#E5C687]/60 text-[#FBF6EC]'
                    : idx % 2 === 0
                    ? 'bg-[#0D2438] border border-[#E5C687]/25 text-[#FBF6EC]'
                    : 'bg-[#081826] border border-[#E5C687]/15 text-[#FBF6EC]'
                }`}
              >
                <span className="text-xs font-extrabold uppercase tracking-wider shrink-0 text-[#E5C687]">
                  {row.label}
                </span>

                <div className="flex flex-wrap items-center sm:justify-end gap-2">
                  <span className="text-xs sm:text-sm font-bold text-[#FBF6EC]">
                    {row.value}
                  </span>
                  {row.badge && (
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        row.highlight
                          ? 'gold-btn-gradient text-[#081826]'
                          : 'bg-[#E5C687]/20 border border-[#E5C687]/40 text-[#E5C687]'
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
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E5C687]">
              GLIMPSES FROM PAST EDITIONS
            </p>
            <h2 className="font-championship text-3xl sm:text-4xl font-bold text-[#FBF6EC] leading-none">
              Our Previous Writers &amp; Winners
            </h2>
            <p className="text-xs sm:text-sm text-[#B8CADB] max-w-md mx-auto leading-relaxed pt-1">
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
                className="w-full overflow-hidden border border-[#E5C687]/35 bg-[#0D2438]"
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
            5. ABOUT INKFETISH (WITH LOGO & 216,000+ FOLLOWERS) & PAST EVENTS
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="rounded-3xl bg-[#0D2438] border border-[#E5C687]/40 p-6 sm:p-8 text-center space-y-6">
          <div className="flex flex-col items-center space-y-2.5">
            <img
              src="/images/inkfetish_logo.webp"
              alt="Inkfetish Publication"
              className="w-16 h-16 rounded-full object-cover border-2 border-[#E5C687]"
            />
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E5C687]">
              <Instagram className="w-3.5 h-3.5" />
              <span>@ink.fetish · 216,000+ Instagram Followers</span>
            </div>
            <h2 className="font-championship text-2xl sm:text-3xl font-bold text-[#FBF6EC]">
              Organised by ink.fetish
            </h2>
            <p className="text-xs sm:text-sm text-[#B8CADB] max-w-md mx-auto leading-relaxed">
              India&apos;s trusted literary platform with 216,000+ Instagram followers, 3,900+
              certified writers, and ₹5.75L+ awarded across national writing and poetry editions.
            </p>
          </div>

          {/* Past Events Minimal List */}
          <div className="pt-2 border-t border-[#E5C687]/20">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E5C687] mb-3">
              OUR PAST EDITIONS
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                'The Great Indian Poetry Challenge',
                'Indian Writers League S1 & S2',
                "People's Choice Award",
                'Shakespeare Poetry Award',
                'November Writing Contest',
              ].map((ev) => (
                <span
                  key={ev}
                  className="px-3 py-1 rounded-full bg-[#081826] border border-[#E5C687]/30 text-xs font-semibold text-[#FBF6EC]"
                >
                  {ev}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            6. SIMPLE FAQ SECTION
           ══════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-6">
          <div className="text-center space-y-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E5C687]">
              FAQ
            </p>
            <h2 className="font-championship text-3xl sm:text-4xl font-bold text-[#FBF6EC]">
              Common Questions
            </h2>
          </div>

          <div className="divide-y divide-[#E5C687]/20 border-y border-[#E5C687]/20">
            {[
              {
                q: 'What categories and themes are accepted in the Indian Writers Championship?',
                a: 'The theme is completely Open. You can submit in Poetry, Short Stories, Novels (excerpts/chapters or complete works), or Creative Writing.',
              },
              {
                q: 'What is included in the ₹199 vs ₹399 entry plans?',
                a: 'The ₹199 plan covers 1 Entry with a guaranteed NGO-Verified Certificate & Appreciation Letter. The ₹399 plan lets you submit 2 Entries, gives you a 45% higher chance of winning with Double Jury Review, and includes Home Delivery of your recognition.',
              },
              {
                q: 'How are the winners and results announced?',
                a: 'The Top 4 Winners share the ₹10,000 Cash Prize Pool (1st: ₹5,000, 2nd: ₹3,000, 3rd: ₹1,000, 4th: ₹1,000) plus a Winner Memento & Medal. Results are announced live on Zoom and shared via the official WhatsApp group.',
              },
              {
                q: 'Who retains the copyright to my submitted work?',
                a: 'You retain 100% copyright and ownership of your writing at all times.',
              },
            ].map((item, idx) => (
              <div key={idx} className="py-1">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#FBF6EC] cursor-pointer"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#E5C687] shrink-0 transition-transform ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <p className="pb-4 text-xs sm:text-sm text-[#B8CADB] leading-relaxed">
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="text-center pt-2 space-y-2">
            <p className="font-editorial italic text-lg sm:text-xl text-[#E5C687]">
              &ldquo;Your words deserve a stage.&rdquo;
            </p>
            <button
              type="button"
              onClick={scrollToPortal}
              className="inline-flex items-center justify-center gap-2 rounded-full gold-btn-gradient text-[#081826] font-extrabold text-xs sm:text-sm px-8 py-4 shadow-xl hover:opacity-95 transition-opacity cursor-pointer uppercase tracking-wider"
            >
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4 text-[#081826]" />
            </button>
          </div>
        </section>
      </main>

      {/* ══════════════════════════════════════════════════════════════════════
          CUSTOM INDIAN WRITERS CHAMPIONSHIP & INKFETISH PUBLICATION FOOTER
         ══════════════════════════════════════════════════════════════════════ */}
      <footer className="relative z-10 bg-[#05101A] text-[#FBF6EC] border-t-2 border-[#E5C687]/35 pt-10 pb-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Top Brand & Official Credentials */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5C687]/20">
            <div className="flex items-center gap-3.5">
              <img
                src="/images/inkfetish_logo.webp"
                alt="Inkfetish Publication Logo"
                className="w-12 h-12 rounded-full object-cover border-2 border-[#E5C687] shrink-0"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-editorial text-xl font-bold tracking-tight text-[#FBF6EC]">
                    ink.fetish
                  </span>
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full gold-btn-gradient text-[#081826] text-[9px] font-extrabold uppercase tracking-wider">
                    <ShieldCheck className="w-2.5 h-2.5 text-[#081826]" />
                    <span>NGO-Verified</span>
                  </span>
                </div>
                <p className="text-xs font-semibold text-[#E5C687] mt-0.5">
                  Officially GST &amp; MSME Registered · 216,000+ Followers
                </p>
              </div>
            </div>

            <a
              href="https://www.instagram.com/ink.fetish/"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#0D2438] hover:bg-[#13324D] border border-[#E5C687]/40 text-xs font-bold text-[#FBF6EC] transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-[#E5C687]" />
              <span>@ink.fetish · 216,000+ Followers</span>
            </a>
          </div>

          {/* Middle 2-Column Info: About Inkfetish & Championship Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs leading-relaxed">
            <div className="space-y-2">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#E5C687]">
                About Inkfetish Publication
              </p>
              <p className="text-[#B8CADB]">
                Inkfetish Publication is one of India&apos;s leading literary platforms and
                publishing collectives with 216,000+ Instagram followers, having certified over
                3,900+ writers and awarded ₹5.75L+ in prizes across national editions.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#E5C687]">
                Indian Writers Championship
              </p>
              <ul className="space-y-1 text-[#B8CADB] font-medium">
                <li>• Categories: Poetry, Short Stories, Novels &amp; Creative Writing</li>
                <li>• ₹10,000 Cash Prize Pool + Winner Memento &amp; Medal</li>
                <li>• Only 350 Participants · Results Live on Zoom</li>
                <li>• NGO-Verified Recognition &amp; 100% Author Copyright</li>
              </ul>
            </div>
          </div>

          {/* Bottom Legal & Copyright Bar */}
          <div className="pt-6 border-t border-[#E5C687]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#E5C687]">
            <p>
              © {new Date().getFullYear()} Inkfetish Publication · Indian Writers Championship
            </p>
            <div className="flex items-center gap-4 text-[#B8CADB] font-semibold">
              <a href="/privacy-policy" className="hover:text-[#E5C687] transition-colors">
                Privacy Policy
              </a>
              <span>·</span>
              <a href="/terms-of-service" className="hover:text-[#E5C687] transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
