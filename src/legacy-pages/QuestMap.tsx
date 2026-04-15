import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Lock, Check, X, Sparkles, Key, ChevronRight, PenTool, BookOpen, Feather, Vault, Loader2, BadgeCheck, Instagram, Clock, Ban } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import TreasureChest from '../components/TreasureChest';

import { supabase } from '../lib/supabase';
import { PeriskopeApi } from '@periskope/periskope-client';

// --- SUB-COMPONENTS ---

/* ... VaultCard component ... */
const VaultCard = ({ day, title, subtitle, status, onClick, delay }: any) => {
    const isLocked = status === 'locked';
    const isCompleted = status === 'completed';
    const isActive = status === 'active';
    const isExpired = status === 'expired';
    const [isUnlocking, setIsUnlocking] = useState(false);

    const handleUnlock = () => {
        if ((isActive || isCompleted) && !isUnlocking) {
            setIsUnlocking(true);
            setTimeout(() => {
                setIsUnlocking(false);
                onClick();
            }, 1500);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.6 }}
            className={`relative w-full max-w-lg mx-auto p-[1px] rounded-xl overflow-hidden group
                ${isLocked ? 'opacity-60 grayscale' : ''}
                ${isExpired ? 'opacity-40 grayscale blur-[1px]' : ''}
                ${isActive || isCompleted ? 'opacity-100' : ''}
            `}
        >
            {/* animated border gradient for active */}
            {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
            )}

            <div className={`relative bg-[#1A120B] rounded-xl p-6 md:p-8 border ${isActive ? 'border-[#FFD700]/50' : 'border-[#3E2723]'} shadow-2xl flex items-center justify-between gap-4 backdrop-blur-md overflow-hidden`}>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-20 pointer-events-none" />


                {/* Left: Info */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] md:text-xs font-[Cinzel] uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border 
                            ${isActive ? 'bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/30' :
                                isExpired ? 'bg-red-900/20 text-red-800 border-red-900/30' :
                                    'bg-[#3E2723]/30 text-[#8B7355] border-[#3E2723]'}
                        `}>
                            Day {day}
                        </span>
                        {isLocked && <Lock className="w-3 h-3 text-[#8B7355]" />}
                        {isActive && <span className="text-[#FFD700] text-xs flex items-center gap-1 font-bold animate-pulse"><Sparkles className="w-3 h-3" /> Active</span>}
                        {isCompleted && <span className="text-[#00FF00] text-xs flex items-center gap-1"><Check className="w-3 h-3" /> Unlocked</span>}
                        {isExpired && <span className="text-red-800 text-xs flex items-center gap-1 font-bold">Ended</span>}
                    </div>

                    <h3 className={`font-[Cinzel] text-xl md:text-2xl font-bold ${isActive ? 'text-[#F5E6CC] text-glow' : 'text-[#8B7355]'}`}>
                        {title}
                    </h3>
                    <p className="font-[Playfair Display] text-[#8B7355] text-sm italic mt-1">{subtitle}</p>
                </div>

                {/* Right: Action */}
                <div>
                    {(isActive || isCompleted) ? (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                                boxShadow: ["0 0 0px rgba(255, 215, 0, 0)", "0 0 15px rgba(255, 215, 0, 0.3)", "0 0 0px rgba(255, 215, 0, 0)"],
                                border: ["1px solid rgba(255, 215, 0, 0.3)", "1px solid rgba(255, 215, 0, 0.8)", "1px solid rgba(255, 215, 0, 0.3)"]
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            onClick={handleUnlock}
                            disabled={isUnlocking}
                            className={`flex flex-col items-center justify-center gap-1 ${isCompleted ? 'bg-gradient-to-br from-green-600 to-green-800 text-white' : 'bg-gradient-to-br from-[#FFD700] to-[#B8860B] text-[#1A120B]'} w-20 h-20 rounded-xl shadow-lg relative overflow-hidden`}
                        >
                            {isUnlocking ? (
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                                    <Loader2 className="w-8 h-8 opacity-80" />
                                </motion.div>
                            ) : (
                                <>
                                    {isCompleted ? <BookOpen className="w-8 h-8" /> : <Vault className="w-8 h-8" />}
                                    <span className="text-[10px] font-bold uppercase tracking-wide leading-none">{isCompleted ? 'Enter' : 'Open'}</span>
                                </>
                            )}
                        </motion.button>
                    ) : isExpired ? (
                        <div className="w-14 h-14 rounded-full bg-[#1c0a0a] border border-red-900/30 flex items-center justify-center">
                            <Clock className="w-6 h-6 text-red-900/50" />
                        </div>
                    ) : (
                        <div className="w-14 h-14 rounded-full bg-[#0c0502] border border-[#3E2723] flex items-center justify-center">
                            <Lock className="w-6 h-6 text-[#3E2723]" />
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

// --- MAIN PAGE ---

const QuestMap = () => {
    const navigate = useNavigate();
    const [isVaultOpen, setIsVaultOpen] = useState(false);
    const [day1Completed, setDay1Completed] = useState(false);
    const [day2Completed, setDay2Completed] = useState(false);
    const [day3Completed, setDay3Completed] = useState(false);
    const [activeVaultDay, setActiveVaultDay] = useState(1);
    const [vaultStage, setVaultStage] = useState<'reveal' | 'claim'>('reveal');

    // Form State
    const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', instagram: '' });
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const [isInternational, setIsInternational] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Persistence Logic
    useEffect(() => {
        const isUnlocked1 = localStorage.getItem('vault_day1_unlocked');
        if (isUnlocked1 === 'true') setDay1Completed(true);

        const isUnlocked2 = localStorage.getItem('vault_day2_unlocked');
        if (isUnlocked2 === 'true') setDay2Completed(true);

        const isUnlocked3 = localStorage.getItem('vault_day3_unlocked');
        if (isUnlocked3 === 'true') setDay3Completed(true);

        // Auto-fill form if previously completed
        const savedName = localStorage.getItem('vault_user_name');
        const savedEmail = localStorage.getItem('vault_user_email');
        if (savedName && savedEmail) {
            setFormData(prev => ({ ...prev, name: savedName, email: savedEmail }));
        }
    }, []);

    const handleOpenVault = (day: number) => {
        setActiveVaultDay(day);

        if (day === 1 && day1Completed) {
            setIsVaultOpen(true);
            setVaultStage('reveal');
        } else if (day === 2 && day2Completed) {
            setIsVaultOpen(true);
            setVaultStage('reveal');
        } else if (day === 3 && day3Completed) {
            setIsVaultOpen(true);
            setVaultStage('reveal');
        } else {
            setIsVaultOpen(true);
            setVaultStage('reveal');
        }
    };


    // Handle Claim Reward
    const handleClaimReward = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');
        setErrorMessage('');

        // Validation for Indian Numbers
        if (!isInternational && formData.whatsapp.length !== 10) {
            setErrorMessage("Please enter a valid 10-digit Indian WhatsApp number.");
            setFormStatus('idle');
            return;
        }

        try {
            // Prep Payload
            const payload = {
                ...formData,
                is_international: isInternational,
                timestamp: new Date().toISOString(),
                source: 'writers_vault_quest_map',
                day_unlocked: activeVaultDay
            };

            console.log("[Webhook] Sending Payload:", payload);

            // Send to Webhook (Make.com)
            const webhookPromise = fetch('https://hook.eu1.make.com/41rivmffwx2tp0jq49281hquk6trc0iu', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }).then(res => {
                console.log("[Webhook] Request Sent (Opaque Response)");
                return res;
            }).catch(err => {
                console.error("[Webhook] Fetch Error:", err);
                throw err;
            });

            // Insert into Supabase
            const { error } = await supabase
                .from('vault_claims')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        whatsapp: formData.whatsapp,
                        instagram: formData.instagram,
                        day_unlocked: activeVaultDay
                    }
                ]);

            if (error) throw error;
            await webhookPromise;

            // Success & Persistence
            setFormStatus('success');

            if (activeVaultDay === 1) {
                setDay1Completed(true);
                localStorage.setItem('vault_day1_unlocked', 'true');
            } else if (activeVaultDay === 2) {
                setDay2Completed(true);
                localStorage.setItem('vault_day2_unlocked', 'true');
                console.log("[Vault] Day 2 Unlocked and Saved.");
            } else if (activeVaultDay === 3) {
                setDay3Completed(true);
                localStorage.setItem('vault_day3_unlocked', 'true');
                console.log("[Vault] Day 3 Unlocked and Saved.");
            }

            // Persist user details
            localStorage.setItem('vault_user_name', formData.name);
            localStorage.setItem('vault_user_email', formData.email);

            confetti({ particleCount: 150, shapes: ['circle', 'square'], colors: ['#FFD700', '#8B0000'] });

            setTimeout(() => {
                setIsVaultOpen(false);
            }, 3000);

            // Send WhatsApp Message via Periskope SDK (Day 3 Only && Indian User)
            // User requested: "for internain audient whatsapp wont go okay only email okay"
            if (activeVaultDay === 3 && !isInternational) {
                try {
                    const client = new PeriskopeApi({
                        authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCIgOiAiYzIxOTljOWUtYzAxYy00YWNkLThmMzEtZDE2ZjY1NDYxZWRhIiwgInJvbGUiIDogImFwaSIsICJ0eXBlIiA6ICJhcGkiLCAibmFtZSIgOiAiaW5rZmV0aXNoIiwgImV4cCIgOiAyMDg0MzYxNjEyLCAiaWF0IiA6IDE3Njg4Mjg4MTIsICJzdWIiIDogImEwOGYzNTYyLWUzYjUtNDgxYy1iZTAwLThjZGVlMGUwZmZiOCIsICJpc3MiIDogInBlcmlza29wZS5hcHAiLCAibWV0YWRhdGEiIDogeyJzY29wZXMiOiBbIjkxNzg1MDk2MzcwOUBjLnVzIl19fQ.w6_zrLGMVpaA8gqu5INkZwhEmiKZf1qsof--b0Q28zU',
                        phone: '917850963709', // Sender Phone
                    });

                    // Ensure number is 10 digits for India
                    const cleanNumber = formData.whatsapp.replace(/\D/g, '');
                    if (cleanNumber.length === 10) {
                        await client.message.send({
                            chat_id: `91${cleanNumber}`,
                            message: `*DAY 3 TREASURES UNLOCKED* 🔓✨\n\nWriters Vault Day 3 Handover\n\nPREMIUM RESOURCE 01\n*Launch Like A Bestseller*\nhttps://www.inkfetish.in/learning/launch-like-a-bestseller\n\nPREMIUM RESOURCE 02\n*Pages Into Paychecks*\nhttps://www.inkfetish.in/learning/pages-into-paychecks\n\n🎁 *Now here is the gift*\n\n*Official Invitation: Love at -1°C Anthology*\nThis winter, we are launching a deeply emotional anthology that explores love at its coldest point — the distance, the silence, the “minus one” that stays after someone leaves.\n\n*Your opportunity to become a Published Co-Author.*\n📅 Releasing First Week of February\n\n*What you get:*\n📚 Officially recognized co-author with ISBN\n🖋 Your Name on the Book\n🌐 Personal Author Website\n📣 199K+ Community Marketing\n🛒 Global Distribution\n🏆 Premium Publishing\n\n⚠️ *155 spots already filled. Submissions are closing soon.*\n\n*Become a Co-Author:*\nhttps://www.inkfetish.in/love-at-minus-one\n\nBest,\nTeam InkFetish 💙`
                        });
                        console.log("[Periskope] WhatsApp Sent");
                    } else {
                        console.warn("[Periskope] Skipped: Invalid Indian Number format for WhatsApp.");
                    }
                } catch (err) {
                    console.error("[Periskope] SDK Error", err);
                }
            }

        } catch (error: any) {
            console.error("Supabase Error:", error);
            setFormStatus('idle'); // Allow retry
            setErrorMessage("Failed to save. Please try again.");
        }
    };


    // Render content based on active day
    const getModalContent = () => {
        if (activeVaultDay === 3) {
            return {
                title: "The Final Keys",
                desc: "Day 3 vault is open. Unlock the strategies to launch and monetize.",
                rewards: [
                    { title: "LAUNCH LIKE A BESTSELLER", subtitle: "The 90-Day Roadmap to #1" },
                    { title: "PAGES INTO PAYCHECKS", subtitle: "14 Income Streams for Authors" }
                ],
                img1: "/images/launch_hero_bg_v2.png",
                img2: "/images/pages-into-paychecks-hero.png",
                label1: "LAUNCH LIKE A BESTSELLER",
                label2: "PAGES INTO PAYCHECKS",
                desc1: "The comprehensive system to hit #1 New Release and sustain sales velocity.",
                desc2: "Stop relying on royalties. Build a 6-figure ecosystem around your book."
            };
        }
        if (activeVaultDay === 2) {
            return {
                title: "Congratulations!",
                desc: "Day 2 vault is open. Click avail to avail the gift",
                rewards: [
                    { title: "THE 200K BLUEPRINT", subtitle: "How I Grew My Poetry Page to 200,000 Followers (And How You Can Copy It)" },
                    { title: "THE WRITER'S HABIT BIBLE", subtitle: "Build an Unshakeable Writing Routine" }
                ],
                img1: "/images/cover_200k_blueprint.png",
                img2: "/images/habit_bible_cover_new.jpg",
                label1: "The 200K Blueprint",
                label2: "Writer's Habit Bible",
                desc1: "How I Grew My Poetry Page to 200,000 Followers (And How You Can Copy It)",
                desc2: "The 7 Non-Negotiable Habits every writer needs to build an unshakeable daily routine."
            };
        }
        // Day 1 Content - Fallback
        return {
            title: "Access Granted",
            desc: "The foundation of your writing journey.",
            rewards: [
                { title: "MORNING PAGES", subtitle: "The Art of Creative Clearance" },
                { title: "15-MIN RULE", subtitle: "The Power of Consistency" }
            ],
            img1: "/images/habit_bible_morning_pages.png",
            img2: "/images/habit_bible_day2_foundation.png",
            label1: "Morning Pages",
            label2: "15-Min Rule",
            desc1: "Clear your mind and unlock your creative potential every single morning.",
            desc2: "The simplest strategy to ensure you never have a 'zero' day in your writing life."
        };
    };

    const modalContent = getModalContent();

    return (
        <div className="min-h-screen bg-[#0c0502] overflow-x-hidden relative font-serif selection:bg-[#FFD700] selection:text-[#1A120B]">
            <Helmet>
                <title>The Writer's Vault | Authorverse</title>
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
                    .text-glow { text-shadow: 0 0 10px rgba(255, 215, 0, 0.3); }
                    @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
                    .animate-shimmer { animation: shimmer 3s infinite linear; }
                `}</style>
            </Helmet>

            {/* --- BACKGROUND --- */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2A1B15] via-[#0c0502] to-[#000000]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-30" />
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/20 to-transparent" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-20 flex flex-col min-h-screen">

                {/* --- HEADER --- */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12 space-y-6"
                >
                    <div className="flex items-center justify-center gap-4 border-b border-[#FFD700]/30 pb-4 px-8 mb-8">
                        {/* Logo & Trust Signals */}
                        <div className="relative group">
                            {/* Glow Behind Logo */}
                            <div className="absolute inset-0 bg-[#FFD700] blur-md opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
                            <img src="/images/inkfetish_logo.png" alt="Inkfetish Logo" className="w-12 h-12 rounded-full border border-[#FFD700]/50 relative z-10 shadow-lg" />
                            {/* Trust Badge 1 (Verified) */}
                            <div className="absolute -bottom-1 -right-1 z-20 bg-[#0c0502] rounded-full p-0.5 border border-[#FFD700]/30">
                                <BadgeCheck className="w-4 h-4 text-[#1DA1F2] fill-[#0c0502]" />
                            </div>
                        </div>

                        <div className="flex flex-col items-start gap-0.5">
                            <span className="text-[#FFD700] font-[Cinzel] font-bold tracking-[0.15em] text-base uppercase leading-none">
                                INKFETISH
                            </span>
                            {/* Trust Badge 2 (Followers) */}
                            <div className="flex items-center gap-1 opacity-80">
                                <Instagram className="w-3 h-3 text-[#E1306C]" />
                                <span className="text-[#8B7355] text-[10px] font-bold font-sans tracking-wide">199k Followers</span>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-[Cinzel] text-[#F5E6CC] drop-shadow-2xl leading-tight">
                        The Writer's Vault
                    </h1>
                    <p className="max-w-xl mx-auto text-[#8B7355] font-[Playfair Display] text-lg italic leading-relaxed">
                        "I’m opening The Writer’s Vault – a 3-day private drop for those who genuinely write."
                    </p>
                </motion.div>

                {/* --- VAULT STACK --- */}
                <div className="space-y-8 flex-1">

                    {/* DAY 1: Expired */}
                    <VaultCard
                        day="1"
                        title="DAY 1"
                        subtitle="Expired"
                        status={'expired'}
                        delay={0.2}
                        onClick={() => { }}
                    />

                    {/* DAY 2: Expired */}
                    <VaultCard
                        day="2"
                        title="DAY 2"
                        subtitle="Expired"
                        status={'expired'}
                        delay={0.3}
                        onClick={() => { }}
                    />

                    {/* DAY 3: UNLOCKED OR ACTIVE */}
                    {day3Completed ? ( /* Using correct day3Completed logic */
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[#1A120B]/80 border border-[#FFD700] rounded-2xl p-6 md:p-8 shadow-[0_0_30px_rgba(255,215,0,0.1)] relative overflow-hidden"
                        >
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#FFD700] rounded-full blur-[100px] opacity-10" />

                            <div className="flex items-center justify-between mb-8 border-b border-[#FFD700]/10 pb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <BadgeCheck className="w-4 h-4 text-[#FFD700]" />
                                        <span className="text-[#FFD700] text-xs font-[Cinzel] tracking-widest uppercase">Vault Unlocked</span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-[Cinzel] text-[#F5E6CC]">Day 3: The Grand Finale</h2>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Resource 1: Launch Like a Bestseller */}
                                <div
                                    onClick={() => {
                                        setTimeout(() => navigate('/learning/launch-like-a-bestseller'), 100);
                                    }}
                                    className="group relative bg-[#0c0502] border border-[#3E2723] hover:border-[#FFD700]/50 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden"
                                >
                                    <div className="absolute inset-0 z-0">
                                        <img src="/images/launch_hero_bg_v2.png" alt="Launch Cover" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 scale-110 group-hover:scale-100" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0502] via-[#0c0502]/80 to-transparent" />
                                    </div>
                                    <div className="relative z-10">
                                        <h3 className="text-lg font-[Cinzel] text-[#F5E6CC] mb-2 group-hover:text-[#FFD700] transition-colors drop-shadow-md">Launch Like A Bestseller</h3>
                                        <p className="text-sm text-[#F5E6CC]/80 leading-relaxed font-medium">The 90-Day Roadmap to #1 New Release and Sales Velocity.</p>
                                    </div>
                                </div>

                                {/* Resource 2: Pages into Paychecks */}
                                <div
                                    onClick={() => {
                                        setTimeout(() => navigate('/learning/pages-into-paychecks'), 100);
                                    }}
                                    className="group relative bg-[#0c0502] border border-[#3E2723] hover:border-[#FFD700]/50 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden"
                                >
                                    <div className="absolute inset-0 z-0">
                                        <img src="/images/pages-into-paychecks-hero.png" alt="Paychecks Cover" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 scale-110 group-hover:scale-100" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0502] via-[#0c0502]/80 to-transparent" />
                                    </div>
                                    <div className="relative z-10">
                                        <h3 className="text-lg font-[Cinzel] text-[#F5E6CC] mb-2 group-hover:text-[#FFD700] transition-colors drop-shadow-md">Pages Into Paychecks</h3>
                                        <p className="text-sm text-[#F5E6CC]/80 leading-relaxed font-medium">14 Income Streams. Turn your words into a 6-figure ecosystem.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <VaultCard
                            day="3"
                            title="DAY 3"
                            subtitle="Avail the Final Gift 🎁"
                            status={'active'}
                            delay={0.4}
                            onClick={() => handleOpenVault(3)}
                        />
                    )}

                </div>

                <div className="mt-16 text-center">
                    <p className="text-[#3E2723] text-xs font-[Cinzel] tracking-widest uppercase">Dark Academia Premium Theme • Authorverse</p>
                </div>

            </div>

            {/* --- VAULT REVEAL MODAL --- */}
            <AnimatePresence>
                {isVaultOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                        onClick={() => setIsVaultOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-[#0c0502] border border-[#FFD700]/30 rounded-2xl w-full max-w-4xl min-h-[600px] md:min-h-0 max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col md:flex-row overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Texture Overlay */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-50 pointer-events-none z-0" />
                            <button onClick={() => setIsVaultOpen(false)} className="absolute top-4 right-4 z-50 text-[#8B7355] hover:text-[#F5E6CC] transition-colors"><X className="w-6 h-6" /></button>

                            <div className="flex flex-col md:flex-row w-full h-full relative z-10">

                                {/* STAGE 1: REVEAL */}
                                {vaultStage === 'reveal' && (
                                    <div className="w-full h-full flex flex-col items-center justify-center p-6 md:p-10 text-center relative">

                                        {/* Floating Rewards */}
                                        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
                                            {/* Reward 1 */}
                                            <motion.div
                                                initial={{ opacity: 0, x: 0, y: 50, scale: 0, rotate: 0 }}
                                                animate={{ opacity: 1, x: isMobile ? -60 : -160, y: isMobile ? -150 : -180, scale: 1, rotate: -12 }}
                                                className="absolute w-24 md:w-40 aspect-[2/3] rounded-lg shadow-2xl z-30 overflow-hidden border border-[#FFD700]/40 group"
                                            >
                                                <img src={modalContent.img1} alt="Reward 1" className="w-full h-full object-cover" />
                                                <div className="absolute bottom-0 inset-x-0 bg-black/80 px-2 py-1 text-center border-t border-[#FFD700]/20">
                                                    <span className="text-[8px] md:text-[10px] text-[#FFD700] uppercase font-bold tracking-widest">{modalContent.label1}</span>
                                                </div>
                                            </motion.div>

                                            {/* Reward 2 */}
                                            <motion.div
                                                initial={{ opacity: 0, x: 0, y: 50, scale: 0, rotate: 0 }}
                                                animate={{ opacity: 1, x: isMobile ? 60 : 160, y: isMobile ? -150 : -140, scale: 1, rotate: 12 }}
                                                className="absolute w-24 md:w-40 aspect-[2/3] rounded-lg shadow-2xl z-20 overflow-hidden border border-[#FFD700]/40 group"
                                            >
                                                <img src={modalContent.img2} alt="Reward 2" className="w-full h-full object-cover" />
                                                <div className="absolute bottom-0 inset-x-0 bg-black/80 px-2 py-1 text-center border-t border-[#FFD700]/20">
                                                    <span className="text-[8px] md:text-[10px] text-[#FFD700] uppercase font-bold tracking-widest">{modalContent.label2}</span>
                                                </div>
                                            </motion.div>
                                        </div>

                                        <motion.div
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.8, ease: "backOut" }}
                                            className="relative mb-8 group"
                                        >
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FFD700] rounded-full blur-[100px] opacity-40 animate-pulse" />
                                            <motion.img src="/images/treasure_chest_open.png" alt="Open Vault" className="relative w-24 md:w-80 drop-shadow-2xl z-10" animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
                                            <Sparkles className="absolute top-0 right-10 w-8 h-8 text-[#FFD700] animate-bounce opacity-80" />
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 1.2 }}
                                        >
                                            <h2 className="font-[Cinzel] text-2xl md:text-4xl text-[#FFD700] mb-2 mt-32 md:mt-8 tracking-widest uppercase drop-shadow-lg leading-tight">
                                                {modalContent.title}
                                            </h2>
                                            <p className="text-[#8B7355] font-[Playfair Display] text-lg mb-6 italic">{modalContent.desc}</p>

                                            <div className="max-w-2xl mx-auto grid grid-cols-2 gap-6 mb-12">
                                                {(modalContent as any).rewards?.map((reward: any, idx: number) => (
                                                    <motion.div
                                                        key={idx}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 1.5 + (idx * 0.2) }}
                                                        className="flex flex-col items-center gap-3 group text-center"
                                                    >
                                                        <div className="text-[#FFD700] opacity-80 group-hover:opacity-100 transition-opacity">
                                                            <BookOpen className="w-6 h-6" />
                                                        </div>
                                                        <div>
                                                            <div className="text-[#F5E6CC] font-[Cinzel] font-bold text-sm tracking-widest mb-1">{reward.title}</div>
                                                            <div className="text-[#8B7355] text-[10px] uppercase tracking-wider leading-relaxed">{reward.subtitle}</div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>

                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setVaultStage('claim')}
                                                className="relative px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-[#1A120B] font-[Cinzel] font-bold text-xl rounded-lg shadow-lg shadow-[#FFD700]/20 overflow-hidden group mx-auto block"
                                            >
                                                <span className="relative z-10 flex items-center gap-2"><Vault className="w-5 h-5" /> Avail Gift</span>
                                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                            </motion.button>
                                        </motion.div>
                                    </div>
                                )}

                                {/* STAGE 2: CLAIM */}
                                {vaultStage === 'claim' && (
                                    <>
                                        {/* Left Side: Visuals */}
                                        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="w-full md:w-1/2 bg-[#150f0a]/90 relative p-6 md:p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#3E2723] overflow-y-auto">
                                            <h3 className="text-[#8B7355] font-[Cinzel] text-center mb-6 uppercase tracking-[0.2em] text-xs">Unlock These Treasures</h3>
                                            <div className="space-y-4 max-w-sm mx-auto w-full">
                                                {/* Card 1 */}
                                                <div className="relative group rounded-xl overflow-hidden border border-[#FFD700]/30 aspect-[16/9] md:aspect-[2/1] shadow-xl">
                                                    <img src={modalContent.img1} alt="Reward 1" className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700 opacity-40" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent flex flex-col justify-end p-4">
                                                        <h4 className="text-[#FFD700] font-[Cinzel] font-bold text-sm leading-tight drop-shadow-md mb-1">{modalContent.label1}</h4>
                                                        <p className="text-[#8B7355] text-[10px] leading-snug">{(modalContent as any).desc1}</p>
                                                    </div>
                                                </div>
                                                {/* Card 2 */}
                                                <div className="relative group rounded-xl overflow-hidden border border-[#FFD700]/30 aspect-[16/9] md:aspect-[2/1] shadow-xl">
                                                    <img src={modalContent.img2} alt="Reward 2" className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700 opacity-40" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent flex flex-col justify-end p-4">
                                                        <h4 className="text-[#FFD700] font-[Cinzel] font-bold text-sm leading-tight drop-shadow-md mb-1">{modalContent.label2}</h4>
                                                        <p className="text-[#8B7355] text-[10px] leading-snug">{(modalContent as any).desc2}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Right Side: Form */}
                                        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="w-full md:w-1/2 p-6 md:p-10 bg-[#0c0502]/90 flex flex-col justify-center relative">
                                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
                                            {formStatus === 'success' ? (
                                                <div className="text-center py-8">
                                                    <div className="w-16 h-16 rounded-full bg-green-900/20 border border-green-500/50 flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8 text-green-500" /></div>
                                                    <h3 className="text-xl font-[Cinzel] text-[#F5E6CC] mb-2">Access Granted</h3>
                                                    <p className="text-[#8B7355] max-w-xs mx-auto mb-6">You have successfully unlocked the Day 2 treasures.</p>

                                                    <div className="bg-[#FFD700]/10 border border-[#FFD700]/20 p-5 rounded-xl mb-8 border-dashed shadow-inner">
                                                        <p className="text-[#FFD700] text-sm font-bold tracking-wide italic leading-relaxed">
                                                            Check your email for one more important gift! 📧
                                                        </p>
                                                    </div>

                                                    <p className="text-[#8B7355]/60 text-xs animate-pulse font-[Playfair Display]">Redirecting to your content...</p>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    <div className="text-center mb-2">
                                                        <h3 className="font-[Cinzel] text-xl text-[#F5E6CC] mb-1">Claim Rewards</h3>
                                                        <p className="text-[#8B7355] text-xs">Enter your details to unlock Day {activeVaultDay}.</p>
                                                    </div>
                                                    <form onSubmit={handleClaimReward} className="space-y-3">
                                                        <div className="space-y-1"><input required placeholder="Your Name" className="w-full bg-[#1A120B]/80 border border-[#3E2723] rounded-lg p-3 text-[#F5E6CC] focus:border-[#FFD700] outline-none" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
                                                        <div className="space-y-1"><input required type="email" placeholder="Your Email" className="w-full bg-[#1A120B]/80 border border-[#3E2723] rounded-lg p-3 text-[#F5E6CC] focus:border-[#FFD700] outline-none" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} /></div>
                                                        <div className="space-y-2">
                                                            <div className="relative">
                                                                {!isInternational && (
                                                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-[#3E2723] pr-2 pointer-events-none">
                                                                        <span className="text-sm">🇮🇳</span>
                                                                        <span className="text-[#8B7355] text-sm font-sans font-bold">+91</span>
                                                                    </div>
                                                                )}
                                                                <input
                                                                    required
                                                                    type="tel"
                                                                    placeholder={isInternational ? "Full WhatsApp Number (with country code)" : "10-digit WhatsApp Number"}
                                                                    className={`w-full bg-[#1A120B]/80 border border-[#3E2723] rounded-lg p-3 text-[#F5E6CC] focus:border-[#FFD700] outline-none ${!isInternational ? 'pl-20' : ''}`}
                                                                    value={formData.whatsapp}
                                                                    onChange={e => {
                                                                        const val = e.target.value;
                                                                        // If Indian, only allow numbers and max 10
                                                                        if (!isInternational) {
                                                                            const numericVal = val.replace(/\D/g, '');
                                                                            if (numericVal.length <= 10) {
                                                                                setFormData({ ...formData, whatsapp: numericVal });
                                                                            }
                                                                        } else {
                                                                            setFormData({ ...formData, whatsapp: val });
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="flex items-start gap-2 ml-1">
                                                                <input
                                                                    type="checkbox"
                                                                    id="intl_toggle"
                                                                    checked={isInternational}
                                                                    onChange={(e) => {
                                                                        setIsInternational(e.target.checked);
                                                                        setFormData({ ...formData, whatsapp: '' }); // Clear input on toggle to avoid confusion
                                                                    }}
                                                                    className="mt-1 w-4 h-4 rounded border-gray-600 bg-[#0c0502] text-[#FFD700] focus:ring-[#FFD700]"
                                                                />
                                                                <label htmlFor="intl_toggle" className="text-[10px] text-[#8B7355] cursor-pointer select-none leading-tight">
                                                                    I am outside India (International Number)<br />
                                                                    <span className="text-[9px] opacity-70">Note: You will receive the Day 3 kit via Email only.</span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-1"><input required placeholder="Instagram ID" className="w-full bg-[#1A120B]/80 border border-[#3E2723] rounded-lg p-3 text-[#F5E6CC] focus:border-[#FFD700] outline-none" value={formData.instagram} onChange={e => setFormData({ ...formData, instagram: e.target.value })} /></div>
                                                        {errorMessage && <p className="text-red-400 text-xs text-center">{errorMessage}</p>}
                                                        <button disabled={formStatus === 'submitting'} type="submit" className="w-full bg-[#FFD700] hover:bg-[#F5E6CC] text-[#1A120B] font-bold py-3 rounded-lg mt-2 transition-colors flex items-center justify-center gap-2 uppercase tracking-wider text-sm disabled:opacity-50 shadow-lg">{formStatus === 'submitting' ? 'Verifying...' : 'Unlock Content'}{!formStatus && <ChevronRight className="w-4 h-4" />}</button>
                                                    </form>
                                                </div>
                                            )}
                                        </motion.div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default QuestMap;
