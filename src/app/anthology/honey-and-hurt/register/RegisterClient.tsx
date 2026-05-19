'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Clock,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  User,
  ChevronDown
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

const formSchema = z.object({
  fullName: z.string().trim().min(2, 'Enter your full name'),
  email: z.string().trim().email('Enter a valid email'),
  phone: z.string().trim().min(10, 'Enter a valid WhatsApp number'),
  writingType: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const inclusions = [
  'Guaranteed ISBN publishing credit',
  'Elite editorial review & formatting',
  'Professional Author Portfolio Website',
  'Global Amazon & Kindle Distribution',
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap');

  .font-cinzel { font-family: 'Cinzel', serif; }
  .font-inter { font-family: 'Inter', sans-serif; }
  .text-gold-main { color: #D88A06; }
  .bg-gold-main { background-color: #D88A06; }
  .border-gold-main { border-color: #D88A06; }
  .luxury-border { border-color: #E3D8C7; }

  .gold-shimmer {
    background: linear-gradient(135deg, #8f4d00 0%, #d88a06 25%, #ffcf6b 50%, #d88a06 75%, #8f4d00 100%);
    background-size: 400% 400%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 8s ease infinite;
  }

  @keyframes shimmer {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const HoneyAndHurtRegister = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      writingType: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    try {
      window.localStorage.setItem('honeyAndHurtLead', JSON.stringify({ ...data, submittedAt: new Date().toISOString() }));
    } catch {
      // Local persistence
    }
    toast.success('Application locked in! We will contact you shortly.');
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#F5F2EE] text-[#0B0B0C] font-inter selection:bg-amber-100 selection:text-amber-900">
        <style>{styles}</style>
        <div className="container mx-auto px-6 min-h-screen flex items-center justify-center py-12">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl w-full bg-[#0B0B0C] text-white rounded-2xl p-8 md:p-12 shadow-xl border-[3px] border-green-500/30 text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-green-500"></div>
            
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <div className="space-y-3">
              <p className="font-inter font-black text-[11px] tracking-widest uppercase text-green-400">Step 1 Complete</p>
              <h1 className="font-inter text-3xl md:text-4xl font-black leading-tight tracking-tight">
                PRICE LOCKED: ₹485.
                <br />
                <span className="text-slate-400 text-2xl md:text-3xl">Application Under Review.</span>
              </h1>
              <p className="font-inter text-sm text-slate-300 font-medium max-w-lg mx-auto pt-2 leading-relaxed">
                Our editorial team is reviewing your details. We will reach out via WhatsApp/Email to confirm your fit. 
                <br/><br/>
                <span className="text-gold-main font-bold">Only if approved, will you be sent the secure link to pay the ₹485 launch investment.</span>
              </p>
            </div>
            
            <div className="pt-4">
              <button onClick={() => router.push('/anthology/honey-and-hurt')} className="px-6 py-3 rounded-lg border-2 border-white/20 font-inter font-bold text-xs uppercase hover:bg-white/10 transition-colors">
                Return to Landing Page
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian text-white font-inter selection:bg-gold-main/20 selection:text-gold-main">
      <style>{styles}</style>

      {/* High Urgency Header */}
      <div className="bg-gold-main text-obsidian py-2.5 text-center font-inter text-xs font-black tracking-wide uppercase sticky top-0 z-[60] shadow-sm px-4">
        <span className="flex items-center justify-center gap-2 max-w-xs mx-auto md:max-w-none">
          <Zap className="w-3.5 h-3.5 animate-pulse" /> LIMITED SPOTS REMAINING FOR HONEY & HURT
        </span>
      </div>

      <nav className="p-5 md:p-8 flex items-center justify-between container mx-auto max-w-6xl relative z-10">
        <button
          onClick={() => router.push('/anthology/honey-and-hurt')}
          className="flex items-center gap-1.5 font-inter font-bold text-xs uppercase text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
        <div className="flex items-center gap-1.5 font-inter text-[10px] font-black uppercase text-gold-main bg-white/5 border border-white/10 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm">
          <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit SSL Secure
        </div>
      </nav>

      <main className="container mx-auto px-5 pb-20 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left Column: The Stack & Urgency */}
          <div className="space-y-10 order-2 lg:order-1 mt-10 lg:mt-0">
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-block bg-gold-main/10 border border-gold-main/20 text-gold-main px-4 py-1.5 rounded-full font-inter text-xs font-black uppercase tracking-widest">
                Application Form
              </div>
              <h1 className="font-inter text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight uppercase text-white">
                Become a <br className="hidden md:block"/> <span className="gold-shimmer">Published Author.</span>
              </h1>
              <p className="font-inter text-lg text-slate-400 font-medium max-w-lg mx-auto lg:mx-0">
                You are 60 seconds away from locking in your spot in the Honey & Hurt Anthology. No payment required today.
              </p>
            </div>

            {/* The Box */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md max-w-lg mx-auto lg:mx-0">
              <h3 className="font-inter text-xl font-black text-white uppercase tracking-wide mb-6 border-b border-white/10 pb-4">What you're getting:</h3>
              <div className="space-y-4">
                {inclusions.map((item) => (
                  <div key={item} className="flex gap-4 items-start">
                    <div className="bg-gold-main/20 p-1.5 rounded-full shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-gold-main" />
                    </div>
                    <p className="font-inter text-sm font-medium text-slate-300 leading-relaxed pt-0.5">{item}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/10 flex items-end justify-between">
                <div>
                  <p className="font-inter text-xs uppercase font-black text-slate-500 mb-1">Total Value: <span className="line-through">₹24,996</span></p>
                  <p className="font-inter text-sm uppercase font-bold text-slate-400">Launch Promo:</p>
                </div>
                <div className="text-right">
                  <p className="font-inter text-4xl font-black text-white">₹485</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: The Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white text-obsidian p-6 md:p-10 rounded-3xl shadow-2xl relative order-1 lg:order-2"
          >
            <div className="relative z-10 space-y-8">
              <div className="space-y-2 text-center">
                <h3 className="font-inter text-2xl md:text-3xl font-black uppercase text-obsidian tracking-tight">Claim Your Spot</h3>
                <p className="font-inter text-sm font-medium text-slate-500">
                  Enter your details carefully. We use this to contact you.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="font-inter text-xs font-black uppercase text-slate-600 ml-1 tracking-wider">Full Legal Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      id="fullName"
                      {...register('fullName')}
                      autoComplete="name"
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-4 pl-12 pr-4 font-inter text-base focus:border-gold-main focus:bg-white outline-none transition-all placeholder:text-slate-400 text-obsidian font-bold shadow-sm"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  {errors.fullName && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase ml-1">{errors.fullName.message}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="font-inter text-xs font-black uppercase text-slate-600 ml-1 tracking-wider">Best Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      autoComplete="email"
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-4 pl-12 pr-4 font-inter text-base focus:border-gold-main focus:bg-white outline-none transition-all placeholder:text-slate-400 text-obsidian font-bold shadow-sm"
                      placeholder="Where should we send updates?"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase ml-1">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="font-inter text-xs font-black uppercase text-slate-600 ml-1 tracking-wider">WhatsApp Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                      autoComplete="tel"
                      inputMode="tel"
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-4 pl-12 pr-4 font-inter text-base focus:border-gold-main focus:bg-white outline-none transition-all placeholder:text-slate-400 text-obsidian font-bold shadow-sm"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase ml-1">{errors.phone.message}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="writingType" className="font-inter text-xs font-black uppercase text-slate-600 ml-1 tracking-wider">What do you write? <span className="text-slate-400 font-medium normal-case">(Optional)</span></label>
                  <div className="relative">
                    <select
                      id="writingType"
                      {...register('writingType')}
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-4 pl-4 pr-10 font-inter text-base focus:border-gold-main focus:bg-white outline-none transition-all text-obsidian font-bold appearance-none shadow-sm cursor-pointer"
                    >
                      <option value="">Select your style</option>
                      <option value="Poetry">Poetry</option>
                      <option value="Prose">Prose & Stories</option>
                      <option value="Microfiction">Microfiction / Quotes</option>
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-[#1A1A1A] hover:bg-black text-white py-5 rounded-xl font-inter font-black text-base uppercase tracking-widest shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group border border-slate-800"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">Locking Spot... <Sparkles className="w-5 h-5 animate-spin" /></span>
                    ) : (
                      <span className="flex items-center gap-2 group-hover:text-gold-main transition-colors">Submit Application <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
                    )}
                  </motion.button>
                </div>

                <div className="flex flex-col items-center justify-center gap-2 text-slate-500 mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-green-600" />
                    <span className="font-inter text-[11px] uppercase font-black tracking-widest text-obsidian">
                      Zero Payment Required Today
                    </span>
                  </div>
                  <p className="text-[10px] text-center max-w-xs leading-relaxed">
                    We process all payments safely via Cashfree only after your application is reviewed and approved.
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default HoneyAndHurtRegister;
