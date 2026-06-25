'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, ChevronRight, Lock, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SubmissionClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(true);
  const [isPaid, setIsPaid] = useState(false);
  
  const [formData, setFormData] = useState({ title: '', poem: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Verification & State Management
  useEffect(() => {
    const urlOrderId = searchParams.get('order_id');
    const localOrderId = localStorage.getItem('spa_vol2_payment_id');
    
    const activeOrderId = urlOrderId || localOrderId;
    
    if (!activeOrderId) {
      // No order ID found anywhere, redirect to register
      router.push('/shakespeare-award-v2/register');
      return;
    }
    
    setOrderId(activeOrderId);
    
    // Check if they already submitted locally to prevent UI flicker
    if (localStorage.getItem(`spa_vol2_submitted_${activeOrderId}`)) {
      setIsSubmitted(true);
      setIsVerifying(false);
      return;
    }

    // Verify payment on the backend just to be safe
    const verifyAccess = async () => {
      try {
        const res = await fetch(`/api/payment/verify-order?order_id=${activeOrderId}`);
        const data = await res.json();
        
        if (data.order_status === 'PAID') {
          setIsPaid(true);
          // Sync URL and LocalStorage silently
          if (!localOrderId) localStorage.setItem('spa_vol2_payment_id', activeOrderId);
          if (!urlOrderId) router.replace(`/shakespeare-award-v2/submit?order_id=${activeOrderId}`);
        } else {
          // Fake order ID or unpaid
          localStorage.removeItem('spa_vol2_payment_id');
          router.push('/shakespeare-award-v2/register');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsVerifying(false);
      }
    };
    
    verifyAccess();
  }, [searchParams, router]);

  const wordCount = formData.poem.trim() === '' ? 0 : formData.poem.trim().split(/\s+/).length;
  const charCount = formData.poem.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId || !formData.title || !formData.poem) return;
    
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/payment/submit-poem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: orderId,
          title: formData.title,
          poem: formData.poem,
        }),
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        localStorage.setItem(`spa_vol2_submitted_${orderId}`, 'true');
        setIsSubmitted(true);
      } else {
        alert(data.error || 'Failed to submit poem. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error. Your poem was not submitted. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-[#14100C] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Dark Academia Background Effects */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[600px] bg-[#c5a059]/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <Loader2 className="w-8 h-8 text-gold animate-spin mb-4 relative z-10" />
        <p className="text-gold font-serif tracking-widest text-sm uppercase animate-pulse relative z-10">Verifying Payment Access...</p>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#14100C] text-[#fdfbf7] flex items-center justify-center p-4 selection:bg-gold selection:text-black relative overflow-hidden">
        {/* Dark Academia Background Effects */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[600px] bg-[#c5a059]/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-2xl w-full bg-gradient-to-br from-[#1A1613] to-[#14100C] border border-gold/30 p-8 sm:p-16 text-center shadow-[0_0_50px_rgba(197,160,89,0.1)] relative z-10 rounded-sm">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-3xl rounded-full pointer-events-none"></div>
          
          <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-serif font-black mb-4">Masterpiece Received</h1>
          <p className="text-ink-400 font-light mb-8 text-sm leading-relaxed">
            Your poem has been successfully submitted and stored securely in our database.<br/>
            The editorial board will begin evaluating entries soon.
          </p>
          
          <div className="bg-[#14100C] border border-white/5 p-6 mb-8 text-left space-y-4 shadow-inner">
            <h3 className="text-xs uppercase tracking-widest font-bold text-gold">What Happens Next?</h3>
            <ul className="space-y-3 text-sm text-ink-300">
              <li className="flex gap-3"><ArrowRight className="w-4 h-4 text-gold shrink-0 mt-0.5" /> Your physical Certificate of Excellence is already being processed for shipping.</li>
              <li className="flex gap-3"><ArrowRight className="w-4 h-4 text-gold shrink-0 mt-0.5" /> The Top 10 Winners will be announced LIVE via a Zoom presentation. Stay tuned to your email for the invite.</li>
              <li className="flex gap-3"><ArrowRight className="w-4 h-4 text-gold shrink-0 mt-0.5" /> The Volume 2 Anthology formatting process will begin shortly after the Top 10 announcement.</li>
            </ul>
          </div>
          
          <Link href="/shakespeare-award-v2" className="inline-block bg-gradient-to-b from-[#ebd298] to-[#c5a059] hover:from-[#fdfbf7] hover:to-[#ebd298] text-[#14100C] font-black uppercase tracking-widest text-xs px-10 py-4 transition-all">
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#14100C] text-[#fdfbf7] font-sans selection:bg-gold selection:text-black relative overflow-hidden">
      {/* Dark Academia Background Effects */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
      <div className="absolute top-0 right-0 w-3/4 h-full bg-[#1A1613] opacity-30 transform -skew-x-12 translate-x-32 pointer-events-none border-l border-gold/5"></div>
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[600px] bg-[#c5a059]/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <header className="border-b border-white/5 bg-[#1A1613]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gold flex items-center justify-center text-black font-serif font-black text-xl">S</div>
            <span className="font-serif font-bold text-lg hidden sm:block tracking-wide">Shakespeare Poetry Award</span>
          </div>
          <div className="flex items-center gap-2 text-green-500 text-xs font-bold uppercase tracking-widest bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Payment </span>Successful
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-serif font-black mb-4">Submit Your Masterpiece</h1>
          <p className="text-ink-400 font-light text-sm sm:text-base">
            Your registration is complete. Please submit the poem you wish to be evaluated <br className="hidden sm:block" />
            for the Top 10 Award and permanently published in Volume 2.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-[#1A1613] to-[#14100C] border border-gold/20 p-6 sm:p-10 shadow-[0_20px_50px_rgba(197,160,89,0.05)] relative overflow-hidden rounded-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-3xl rounded-full pointer-events-none"></div>
          
          <div className="space-y-8 relative z-10">
            {/* Title Input */}
            <div className="space-y-3">
              <label htmlFor="title" className="block text-xs uppercase tracking-[0.2em] font-bold text-ink-400">
                Poetry Title
              </label>
              <input
                id="title"
                type="text"
                required
                placeholder="The Raven"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-[#14100C] border border-white/10 p-4 text-white placeholder-ink-600 focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all font-serif text-lg outline-none"
              />
            </div>

            {/* Poem Textarea */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label htmlFor="poem" className="block text-xs uppercase tracking-[0.2em] font-bold text-ink-400">
                  The Poem
                </label>
                
                {/* Live Counters */}
                <div className="flex gap-4 text-[10px] uppercase tracking-widest font-bold">
                  <span className={wordCount > 500 ? 'text-red-400' : 'text-gold'}>
                    {wordCount} <span className="text-ink-500 font-light">Words</span>
                  </span>
                  <span className="text-gold">
                    {charCount} <span className="text-ink-500 font-light">Chars</span>
                  </span>
                </div>
              </div>
              
              <textarea
                id="poem"
                required
                placeholder="Once upon a midnight dreary..."
                value={formData.poem}
                onChange={(e) => setFormData({ ...formData, poem: e.target.value })}
                className="w-full bg-[#14100C] border border-white/10 p-5 text-white placeholder-ink-600 focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all font-serif text-base sm:text-lg min-h-[400px] resize-y outline-none leading-relaxed"
              />
              <p className="text-[10px] text-ink-500 uppercase tracking-widest text-right">
                Please ensure all line breaks are exactly as you intend them to appear in print.
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-white/5">
              <button 
                type="submit"
                disabled={isSubmitting || wordCount === 0}
                className={`w-full relative group overflow-hidden bg-gradient-to-b from-[#ebd298] to-[#c5a059] hover:from-[#fdfbf7] hover:to-[#ebd298] text-[#14100C] transition-all py-5 font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 ${isSubmitting || wordCount === 0 ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Sealing Entry...
                  </>
                ) : (
                  <>
                    <BookOpen className="w-5 h-5" /> Submit Poem For Volume 2
                  </>
                )}
                
                {!isSubmitting && wordCount > 0 && (
                  <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 group-hover:animate-[sweep_1.5s_ease-in-out]"></div>
                )}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
