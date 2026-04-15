import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Feather, Lock, Star, Sparkles, ChevronRight, Scroll, Crown, CheckCircle2, Globe, Gift, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

// Resource Data Structure
const resources = [
    {
        day: 1,
        title: "The Foundation",
        items: [
            { id: 1, title: "15-Day Publishing Guide", path: "/learning/15-day-guide", type: "guide" },
            { id: 4, title: "Daily Writing Prompts", path: "/writing-prompts", type: "excercise" }
        ]
    },
    {
        day: 2,
        title: "The Architecture",
        items: [
            { id: 1, title: "The ₹200K Blueprint", path: "/learning/200k-blueprint", type: "blueprint" },
            { id: 2, title: "The Writer's Habit Bible", path: "/habit-bible", type: "habit" }
        ]
    },
    {
        day: 3,
        title: "The Launch",
        items: [
            { id: 1, title: "Launch Like A Bestseller", path: "/learning/launch-like-a-bestseller", type: "strategy" },
            { id: 2, title: "Pages Into Paychecks", path: "/pages-into-paychecks", type: "monetization" }
        ]
    }
];

const WritersVault = () => {
    const navigate = useNavigate();

    // Auth State
    const [hasAccess, setHasAccess] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showGiftMessage, setShowGiftMessage] = useState(false); // Toggle for header text

    // Intro & Content State
    const [introStep, setIntroStep] = useState(0); // 0: Idle, 1: Presents, 2: Title, 3: Tagline, 4: Done

    useEffect(() => {
        // Check local storage initally
        const savedAccess = localStorage.getItem('writers_vault_access');
        let accessGranted = false;
        if (savedAccess === 'granted') {
            setHasAccess(true);
            accessGranted = true;
        }

        // Start Intro Sequence
        const t1 = setTimeout(() => setIntroStep(1), 500);   // Show "Inkfetish Presents"
        const t2 = setTimeout(() => setIntroStep(2), 2000);  // Show Title
        const t3 = setTimeout(() => {
            setIntroStep(3); // Show Tagline

            // Only show form if access is NOT granted yet
            if (!accessGranted) {
                setTimeout(() => setShowForm(true), 3500);
            }
        }, 4000);

        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, []);

    // Auto-progress to Content if Access Already Granted OR when granted
    useEffect(() => {
        if (introStep === 3 && hasAccess) {
            const t4 = setTimeout(() => {
                setIntroStep(4);
                setShowForm(false);
            }, 3500);
            return () => clearTimeout(t4);
        }
    }, [introStep, hasAccess]);

    // Form Data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        isInternational: false
    });

    const handleAccessGrant = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Optimistic UI Update: Grant access immediately
        setHasAccess(true);
        setShowForm(false);
        setIntroStep(4); // Jump directly to content (Step 4)
        setShowGiftMessage(true); // Show "Check Email" message

        // Grant ALL access keys (Legacy support for ProtectedVaultRoute)
        localStorage.setItem('writers_vault_access', 'granted');
        localStorage.setItem('vault_day1_unlocked', 'true');
        localStorage.setItem('vault_day2_unlocked', 'true');
        localStorage.setItem('vault_day3_unlocked', 'true');

        setIsSubmitting(false);

        // Fire-and-forget Database Insert (don't await to block UI)
        supabase
            .from('writers_vault_users')
            .insert([{
                name: formData.name,
                email: formData.email,
                whatsapp: formData.whatsapp,
                is_international: formData.isInternational,
                access_granted: true
            }])
            .then(({ error }) => {
                if (error) console.error("DB Error:", error);
            });

        // Fire-and-forget Webhook (n8n)
        console.log("🚀 Sending data to Webhook...", { name: formData.name, email: formData.email });

        // Using 'no-cors' mode to prevent browser blocking, BUT this means we can't read the response 
        // and n8n might not get the JSON body correctly if it expects strict CORS. 
        // Standard fetch for now, logging errors.
        fetch('https://inkfetishh.app.n8n.cloud/webhook/fa4b45f3-539f-4013-a42f-610b6b0a8b3d', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                whatsapp: formData.whatsapp,
                is_international: formData.isInternational,
                submitted_at: new Date().toISOString()
            })
        })
            .then(res => {
                console.log("✅ Webhook Response Status:", res.status);
                if (res.ok) console.log("🎉 Webhook delivered successfully!");
                else console.log("⚠️ Webhook server returned error.");
            })
            .catch(err => console.error("❌ Webhook Network Error (CORS?):", err));
    };

    const showContent = introStep === 4;

    return (
        <div className="min-h-screen bg-[#0F0505] text-[#F5E6CC] font-sans selection:bg-[#420C0C] selection:text-[#FFD700] relative overflow-hidden">
            <Helmet>
                <title>The Writer's Vault | Authorverse</title>
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
                `}</style>
            </Helmet>

            {/* Background Textures (No Snow/Stardust) */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#2A0A0A] via-[#0F0505] to-[#000000]" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent" />
            </div>

            {/* GATEKEEPER FORM */}
            <AnimatePresence mode='wait'>
                {showForm && !hasAccess && (
                    <motion.div
                        key="gatekeeper"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                        transition={{ duration: 0.8 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#0F0505]/80 backdrop-blur-md"
                    >
                        <div className="max-w-md w-full bg-[#1A0A0A] border border-[#3E2723] p-8 md:p-10 rounded-sm shadow-2xl relative overflow-hidden">
                            {/* Decorative Corners */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#FFD700]/50" />
                            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#FFD700]/50" />
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#FFD700]/50" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#FFD700]/50" />

                            <div className="text-center mb-8">
                                <Crown className="w-8 h-8 text-[#FFD700] mx-auto mb-4 animate-pulse" />
                                <h2 className="font-[Cinzel] text-3xl font-bold text-[#FFD700] mb-2">Vault Access</h2>
                                <p className="font-[Playfair Display] text-[#8B7355] italic text-sm">
                                    "Enter your details to reveal the archives."
                                </p>
                            </div>

                            <form onSubmit={handleAccessGrant} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-[Cinzel] uppercase tracking-widest text-[#8B7355]">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full bg-[#0F0505] border border-[#3E2723] text-[#F5E6CC] p-3 rounded-none focus:border-[#FFD700] outline-none transition-colors font-serif placeholder:text-[#3E2723]"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-[Cinzel] uppercase tracking-widest text-[#8B7355]">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        className="w-full bg-[#0F0505] border border-[#3E2723] text-[#F5E6CC] p-3 rounded-none focus:border-[#FFD700] outline-none transition-colors font-serif placeholder:text-[#3E2723]"
                                        placeholder="name@example.com"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-[10px] font-[Cinzel] uppercase tracking-widest text-[#8B7355]">WhatsApp Number</label>
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                className="accent-[#FFD700] w-3 h-3"
                                                checked={formData.isInternational}
                                                onChange={e => setFormData({ ...formData, isInternational: e.target.checked })}
                                            />
                                            <span className="text-[10px] text-[#5c4d3c] group-hover:text-[#8B7355] transition-colors flex items-center gap-1">
                                                <Globe className="w-3 h-3" /> International?
                                            </span>
                                        </label>
                                    </div>

                                    <div className="relative">
                                        {!formData.isInternational && (
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-[#3E2723] pr-2 pointer-events-none">
                                                <span className="text-sm">🇮🇳</span>
                                                <span className="font-serif text-[#8B7355] text-sm">+91</span>
                                            </div>
                                        )}
                                        <input
                                            required
                                            type={formData.isInternational ? "text" : "tel"}
                                            maxLength={formData.isInternational ? 20 : 10}
                                            className={`w-full bg-[#0F0505] border border-[#3E2723] text-[#F5E6CC] p-3 rounded-none focus:border-[#FFD700] outline-none transition-colors font-serif placeholder:text-[#3E2723] ${!formData.isInternational ? 'pl-20' : ''}`}
                                            placeholder={formData.isInternational ? "Correct Country Code + Number" : "99999 99999"}
                                            value={formData.whatsapp}
                                            onChange={e => {
                                                const val = e.target.value;
                                                const cleanVal = formData.isInternational ? val : val.replace(/\D/g, ''); // Only numbers for India
                                                setFormData({ ...formData, whatsapp: cleanVal });
                                            }}
                                        />
                                    </div>
                                    {!formData.isInternational && formData.whatsapp && formData.whatsapp.length !== 10 && (
                                        <p className="text-red-900/80 text-[10px] font-bold mt-1">Must be exactly 10 digits.</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting || (!formData.isInternational && formData.whatsapp.length !== 10)}
                                    className="w-full bg-[#1A0505] border border-[#FFD700]/30 text-[#FFD700] py-3 mt-4 hover:bg-[#FFD700] hover:text-[#1A0505] transition-all duration-300 font-[Cinzel] font-bold tracking-widest disabled:opacity-50 disabled:cursor-not-allowed uppercase text-sm"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <Sparkles className="w-4 h-4 animate-spin" /> Unlocking...
                                        </span>
                                    ) : (
                                        "Unlock Vault"
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CINEMATIC INTRO (Conditionally rendered to avoid replay on direct submit?) 
                Actually, if we jump to Step 4, we want THIS component below to render immediately.
            */}

            <AnimatePresence mode='wait'>
                {/* Intro Logic: Show only if content is NOT yet visible (step 4) */}
                {!showContent && (
                    <motion.div
                        key="intro"
                        className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#0F0505] px-4"
                        exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
                    >
                        {/* Step 1: Inkfetish Presents */}
                        {introStep === 1 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.5 } }}
                                transition={{ duration: 0.8 }}
                                className="text-[#FFD700] font-[Cinzel] tracking-[0.3em] text-sm md:text-lg uppercase"
                            >
                                Inkfetish Presents
                            </motion.div>
                        )}

                        {/* Step 2 & 3: Title & Tagline */}
                        {(introStep === 2 || introStep === 3) && (
                            <motion.div
                                layout
                                className="text-center w-full max-w-4xl mx-auto"
                            >
                                <motion.h1
                                    layout
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ duration: 1, ease: "easeOut", layout: { duration: 0.8, ease: "easeInOut" } }}
                                    className="font-[Cinzel] text-4xl sm:text-5xl md:text-7xl font-bold text-[#FFD700] mb-6 md:mb-8 drop-shadow-[0_0_25px_rgba(255,215,0,0.3)] leading-tight"
                                >
                                    THE WRITER'S VAULT
                                </motion.h1>

                                {introStep === 3 && (
                                    <motion.p
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 1, delay: 0.2 }}
                                        className="font-[Playfair Display] text-[#F5E6CC] text-lg sm:text-xl md:text-2xl italic max-w-2xl mx-auto leading-relaxed px-4"
                                    >
                                        "6 Free resources that will help you In earning, publishing, writing, and growing your instagram presence as a writer."
                                    </motion.p>
                                )}
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {hasAccess && showContent && (
                    <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 md:py-32">

                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-24"
                        >
                            <div className="mb-4">
                                <span className="text-[#8B7355] font-[Cinzel] text-[10px] md:text-xs tracking-[0.4em] uppercase opacity-80 block animate-pulse">
                                    Inkfetish Presents
                                </span>
                            </div>

                            <div className="inline-flex items-center gap-3 mb-6">
                                <div className="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-[#FFD700]" />
                                <span className="text-[#FFD700] font-[Cinzel] text-[10px] md:text-sm tracking-[0.3em] uppercase whitespace-nowrap">Premium Resource Library</span>
                                <div className="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-[#FFD700]" />
                            </div>
                            <h1 className="font-[Cinzel] text-4xl sm:text-6xl md:text-7xl font-bold text-[#FFD700] mb-6 drop-shadow-[0_0_15px_rgba(255,215,0,0.2)]">
                                The Writer's Vault
                            </h1>

                            {/* DYNAMIC HEADER TEXT: Replaces Tagline with Gift Message */}
                            <AnimatePresence mode='wait'>
                                {showGiftMessage ? (
                                    <motion.div
                                        key="gift-msg"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-[#FFD700]/10 border border-[#FFD700]/30 p-4 rounded-sm inline-flex items-center gap-4 max-w-2xl mx-auto"
                                    >
                                        <div className="bg-[#FFD700]/10 p-2 rounded-full border border-[#FFD700]/30 shrink-0">
                                            <Mail className="w-5 h-5 text-[#FFD700]" />
                                        </div>
                                        <p className="font-[Playfair Display] text-[#FFD700] text-lg md:text-xl italic leading-relaxed text-left">
                                            "One more winter gift sent to your email. Check your inbox."
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.p
                                        key="default-msg"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="font-[Playfair Display] text-[#8B7355] text-base md:text-xl italic max-w-2xl mx-auto px-4 leading-relaxed"
                                    >
                                        "Here lie the secrets of bestselling authors, ancient strategies, and modern blueprints. Unlock them one by one."
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Vault Sections (Days) */}
                        <div className="space-y-16 md:space-y-24">
                            {resources.map((day, dayIndex) => (
                                <motion.div
                                    key={day.day}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: dayIndex * 0.2 }}
                                    className="relative"
                                >
                                    {/* Day Header */}
                                    <div className="flex items-end gap-6 mb-8 border-b border-[#3E2723] pb-4 relative">
                                        <span className="font-[Cinzel] text-6xl sm:text-8xl md:text-9xl font-bold text-[#2A1810] leading-none absolute -top-8 -left-4 md:-top-14 md:-left-8 z-0 select-none pointer-events-none">
                                            {String(day.day).padStart(2, '0')}
                                        </span>
                                        <div className="relative z-10 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 ml-10 md:ml-20 w-full">
                                            <h2 className="font-[Cinzel] text-2xl md:text-4xl text-[#E5D4B3]">Day {day.day}</h2>
                                            <span className="hidden md:block h-px w-12 bg-[#8B7355]" />
                                            <span className="font-[Playfair Display] text-[#FFD700] italic text-lg md:text-2xl opacity-90">{day.title}</span>
                                        </div>
                                    </div>

                                    {/* Resources Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 ml-0 md:ml-20">
                                        {day.items.map((item, itemIndex) => (
                                            <motion.div
                                                key={item.id}
                                                whileHover={{ x: 5, backgroundColor: 'rgba(66, 12, 12, 0.4)' }}
                                                onClick={() => navigate(item.path)}
                                                className="group cursor-pointer bg-[#1A0A0A]/80 border border-[#3E2723] p-5 md:p-8 rounded-sm hover:border-[#FFD700]/40 transition-all duration-300 relative overflow-hidden backdrop-blur-sm"
                                            >
                                                <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <Sparkles className="w-5 h-5 text-[#FFD700]" />
                                                </div>

                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <span className="text-[10px] md:text-xs font-[Cinzel] uppercase tracking-widest text-[#8B7355] border border-[#3E2723] px-3 py-1 rounded-full group-hover:border-[#FFD700]/30 group-hover:text-[#FFD700] transition-colors">
                                                                {item.type}
                                                            </span>
                                                        </div>
                                                        <h3 className="font-[Cinzel] text-lg md:text-xl text-[#F5E6CC] group-hover:text-[#FFD700] transition-colors mb-1 leading-snug">
                                                            {item.title}
                                                        </h3>
                                                    </div>
                                                    <div className="text-[#3E2723] group-hover:text-[#FFD700] transition-colors transform group-hover:translate-x-1 duration-300 shrink-0 self-center">
                                                        <ChevronRight className="w-6 h-6" />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Footer Decor */}
                        <div className="mt-24 md:mt-32 text-center opacity-30 pb-12">
                            <Crown className="w-8 h-8 md:w-10 md:h-10 text-[#8B7355] mx-auto mb-4" />
                            <div className="h-px w-32 md:w-48 bg-gradient-to-r from-transparent via-[#8B7355] to-transparent mx-auto" />
                            <p className="font-[Cinzel] text-[10px] uppercase tracking-widest mt-4 text-[#8B7355]">Authorized by Authorverse</p>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WritersVault;
