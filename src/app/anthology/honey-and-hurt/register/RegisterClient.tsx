'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BadgeCheck, 
  Sparkles, 
  ChevronRight, 
  ArrowLeft,
  CheckCircle2,
  Lock,
  User,
  Mail,
  Phone,
  PenTool
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const formSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Invalid phone number"),
    experience: z.string().optional(),
});

const HoneyAndHurtRegister = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        toast.success("Application submitted! We will contact you shortly.");
        setIsSubmitting(false);
        // Redirect to a success page or payment
    };

    const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500&display=swap');
        
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        
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

        .gold-button {
            background: linear-gradient(135deg, #ffcf6b, #d88a06);
            color: black;
        }
    `;

    return (
        <div className="min-h-screen bg-[#F5F2EE] text-[#0B0B0C] font-cormorant selection:bg-amber-100 selection:text-amber-900">
            <style>{styles}</style>

            <nav className="p-6">
                <button 
                    onClick={() => router.back()}
                    className="flex items-center gap-2 font-cinzel text-[10px] tracking-widest uppercase hover:text-[#D88A06] transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Invitation
                </button>
            </nav>

            <div className="container mx-auto px-6 py-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    
                    {/* Left: The "Reason Why" (Alex Hormozi Style) */}
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <h1 className="font-cinzel text-4xl md:text-6xl font-black leading-tight">
                                APPLY FOR <br /> <span className="gold-shimmer">HONEY & HURT</span>
                            </h1>
                            <p className="font-cormorant text-2xl text-slate-600 italic leading-relaxed">
                                Join the ranks of 400+ globally published authors. Secure your legacy today.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {[
                                { t: "Global Credibility", d: "Official ISBN & distribution in 150+ countries." },
                                { t: "Done-For-You Publishing", d: "We handle editing, design, formatting & distribution." },
                                { t: "Author Brand", d: "Receive a professional digital portfolio and certification." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-slate-200">
                                        <CheckCircle2 className="w-6 h-6 text-[#D88A06]" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-cinzel text-sm tracking-widest font-bold uppercase">{item.t}</h4>
                                        <p className="text-slate-500 font-inter text-sm leading-relaxed">{item.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-8 bg-white border border-[#E3D8C7] rounded-2xl shadow-sm space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white" />
                                    ))}
                                </div>
                                <p className="font-inter text-[10px] uppercase tracking-widest text-slate-400">Join authors like Ananya R. & Vikram S.</p>
                            </div>
                            <p className="font-cormorant text-lg italic text-slate-700">
                                "The transition from draft to published was seamless. Inkfetish is the gold standard for emerging authors."
                            </p>
                        </div>
                    </div>

                    {/* Right: The Application Form */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#0B0B0C] text-white p-8 md:p-12 rounded-3xl shadow-2xl border border-white/5 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <PenTool className="w-32 h-32" />
                        </div>

                        <div className="relative z-10 space-y-8">
                            <div className="space-y-2">
                                <h3 className="font-cinzel text-xl tracking-widest gold-shimmer uppercase font-bold">Author Application</h3>
                                <p className="font-inter text-[10px] uppercase tracking-widest text-slate-500">Secure Your Limited Author Slot</p>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="font-cinzel text-[10px] tracking-[0.2em] uppercase text-slate-400 ml-1">Full Legal Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <input 
                                            {...register("fullName")}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 font-inter text-sm focus:border-[#D88A06] outline-none transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    {errors.fullName && <p className="text-red-500 text-[10px] uppercase mt-1">{errors.fullName.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="font-cinzel text-[10px] tracking-[0.2em] uppercase text-slate-400 ml-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <input 
                                            {...register("email")}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 font-inter text-sm focus:border-[#D88A06] outline-none transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-[10px] uppercase mt-1">{errors.email.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="font-cinzel text-[10px] tracking-[0.2em] uppercase text-slate-400 ml-1">Phone Number (WhatsApp)</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <input 
                                            {...register("phone")}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 font-inter text-sm focus:border-[#D88A06] outline-none transition-colors"
                                            placeholder="+91 XXXXX XXXXX"
                                        />
                                    </div>
                                    {errors.phone && <p className="text-red-500 text-[10px] uppercase mt-1">{errors.phone.message}</p>}
                                </div>

                                <div className="space-y-2 pt-4">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={isSubmitting}
                                        type="submit"
                                        className="gold-button w-full py-5 rounded-xl font-cinzel font-bold text-xs tracking-[0.3em] uppercase flex items-center justify-center gap-3"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">Processing <Sparkles className="w-4 h-4 animate-spin" /></span>
                                        ) : (
                                            <span className="flex items-center gap-2">Secure My Slot <ChevronRight className="w-4 h-4" /></span>
                                        )}
                                    </motion.button>
                                </div>

                                <div className="flex items-center justify-center gap-2 text-slate-500 mt-4">
                                    <Lock className="w-3 h-3" />
                                    <span className="font-inter text-[9px] uppercase tracking-widest">Secured 256-Bit SSL Connection</span>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default HoneyAndHurtRegister;
