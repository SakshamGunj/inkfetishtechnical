import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, CheckCircle2, Music, Sparkles, Feather, ArrowRight, Heart, Star, Zap } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const LoveLaunchPoll = () => {
    const [step, setStep] = useState(0); // 0: Poll Start, 1: Date, 2: Time, 3: Success, 4: Already Voted
    const [introCompleted, setIntroCompleted] = useState(false);
    const [introPhase, setIntroPhase] = useState(0); // 0: Start, 1: Hey, 2: Lovely Soul, 3: Event

    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Play Intro Sequence
        const t1 = setTimeout(() => setIntroPhase(1), 500);
        const t2 = setTimeout(() => setIntroPhase(2), 2000);
        const t3 = setTimeout(() => setIntroPhase(3), 4000);
        const t4 = setTimeout(() => setIntroCompleted(true), 7000);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
        };
    }, []);

    useEffect(() => {
        const hasVoted = localStorage.getItem('hasVotedLoveLaunch');
        if (hasVoted) {
            setStep(4);
        }
    }, []);

    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
        setTimeout(() => setStep(2), 300);
    };

    const handleTimeSelect = async (time: string) => {
        setSelectedTime(time);
        setIsSubmitting(true);

        try {
            await addDoc(collection(db, "love_launch_poll"), {
                date: selectedDate,
                time: time,
                createdAt: serverTimestamp(),
                deviceInfo: navigator.userAgent
            });
            localStorage.setItem('hasVotedLoveLaunch', 'true');
            setTimeout(() => {
                setIsSubmitting(false);
                setStep(3);
            }, 500);
        } catch (error) {
            console.error("Error submitting vote:", error);
            setIsSubmitting(false);
            alert("Something went wrong. Please try again.");
        }
    };

    const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap');
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-lato { font-family: 'Lato', sans-serif; }
    `;

    return (
        <div className="min-h-[100dvh] bg-slate-950 relative overflow-hidden font-playfair selection:bg-cyan-500/30 flex items-center justify-center p-4">
            <Helmet>
                <title>Event Poll | Love at Minus One</title>
                <style>{styles}</style>
            </Helmet>

            {/* Cinematic Background Layer */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <AnimatePresence>
                    {introCompleted && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black" />
                            <AuroraBackground />
                            <SnowParticles />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* INTRO SEQUENCE */}
            <AnimatePresence>
                {!introCompleted && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black flex items-center justify-center flex-col p-6 text-center"
                        exit={{ opacity: 0, transition: { duration: 1.5 } }}
                    >
                        <AnimatePresence mode="wait">
                            {introPhase === 1 && (
                                <motion.div
                                    key="phase1"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, filter: "blur(10px)" }}
                                    className="text-center"
                                >
                                    <Sparkles className="w-12 h-12 text-cyan-400 mx-auto mb-4 animate-pulse" />
                                    <h2 className="text-3xl font-cinzel text-white tracking-widest leading-relaxed">
                                        Hey...
                                    </h2>
                                </motion.div>
                            )}
                            {introPhase === 2 && (
                                <motion.div
                                    key="phase2"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                                    className="text-center"
                                >
                                    <Heart className="w-16 h-16 text-rose-500 mx-auto mb-6 fill-rose-500/20 animate-bounce-slow" />
                                    <h2 className="text-4xl md:text-6xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-cyan-200">
                                        Lovely Soul
                                    </h2>
                                </motion.div>
                            )}
                            {introPhase === 3 && (
                                <motion.div
                                    key="phase3"
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 1.5 }}
                                    className="text-center"
                                >
                                    <h1 className="text-3xl md:text-5xl font-cinzel font-bold text-white mb-4 leading-tight">
                                        Love at <span className="text-cyan-400 italic">-1°C</span>
                                    </h1>
                                    <div className="h-0.5 w-24 bg-gradient-to-r from-cyan-500 to-transparent mx-auto rounded-full" />
                                    <p className="text-slate-400 mt-6 font-playfair italic text-lg opacity-80">
                                        "Let's create the moment."
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MAIN CONTENT */}
            {introCompleted && (
                <>
                    {/* Navbar */}
                    <motion.div
                        initial={{ y: -100 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-center bg-gradient-to-b from-slate-950/80 to-transparent pointer-events-none"
                    >
                        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full pointer-events-auto shadow-lg hover:shadow-cyan-500/20 transition-shadow">
                            <Feather className="w-4 h-4 text-cyan-400" />
                            <span className="font-cinzel font-bold text-white text-xs md:text-sm tracking-widest">Inkfetish</span>
                        </div>
                    </motion.div>

                    <div className="relative z-10 w-full max-w-xl">
                        <AnimatePresence mode="wait">

                            {/* STEP 0: START */}
                            {step === 0 && (
                                <motion.div key="intro" className="w-full text-center px-4" {...stepTransition}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                    >
                                        <div className="w-20 h-20 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(6,182,212,0.2)] animate-float">
                                            <Calendar className="w-8 h-8 text-cyan-400" />
                                        </div>

                                        <h1 className="font-cinzel text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                                            Welcome to Deciding<br />
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-400 relative inline-block">
                                                Event Dates
                                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-cyan-500 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                                                </svg>
                                            </span>
                                        </h1>

                                        <p className="font-playfair text-slate-300 text-lg md:text-xl italic mb-10 max-w-md mx-auto leading-relaxed">
                                            "For the Live Zoom Launch of <strong className="text-white not-italic">Love at -1°C</strong>"
                                        </p>

                                        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-10 max-w-sm mx-auto">
                                            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center">
                                                <Star className="w-5 h-5 text-yellow-400 mb-2 fill-yellow-400/20" />
                                                <span className="text-[9px] uppercase tracking-widest text-slate-400">Premium</span>
                                            </div>
                                            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center">
                                                <Zap className="w-5 h-5 text-cyan-400 mb-2 fill-cyan-400/20" />
                                                <span className="text-[9px] uppercase tracking-widest text-slate-400">Live</span>
                                            </div>
                                            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center">
                                                <Heart className="w-5 h-5 text-rose-400 mb-2 fill-rose-400/20" />
                                                <span className="text-[9px] uppercase tracking-widest text-slate-400">Soulful</span>
                                            </div>
                                        </div>

                                        <motion.button
                                            onClick={() => setStep(1)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-10 py-5 bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-full font-cinzel font-bold tracking-[0.2em] uppercase shadow-[0_0_40px_rgba(8,145,178,0.4)] hover:shadow-[0_0_60px_rgba(8,145,178,0.6)] transition-all"
                                        >
                                            Select Date
                                        </motion.button>
                                    </motion.div>
                                </motion.div>
                            )}

                            {/* STEP 1: DATE */}
                            {step === 1 && (
                                <motion.div key="date" className="w-full" {...stepTransition}>
                                    <GlassCard title="Ideal Date" subtitle="Phase 01">
                                        <div className="space-y-4">
                                            <p className="text-slate-400 text-sm font-playfair italic mb-6">"Which day aligns with your stars?"</p>
                                            {['16th Feb', '17th Feb', '18th Feb'].map((date) => (
                                                <motion.button
                                                    key={date}
                                                    whileHover={{ x: 5 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => handleDateSelect(date)}
                                                    className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-cyan-950/30 hover:border-cyan-500/50 transition-all group flex items-center justify-between"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center group-hover:border-cyan-500 transition-colors">
                                                            <Calendar className="w-5 h-5 text-slate-400 group-hover:text-cyan-400" />
                                                        </div>
                                                        <div className="text-left">
                                                            <span className="font-cinzel font-bold text-lg text-white block">{date}</span>
                                                        </div>
                                                    </div>
                                                    <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                                </motion.button>
                                            ))}
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            )}

                            {/* STEP 2: TIME */}
                            {step === 2 && (
                                <motion.div key="time" className="w-full" {...stepTransition}>
                                    <GlassCard title="Golden Hour" subtitle="Phase 02">
                                        <p className="text-slate-400 text-sm font-playfair italic mb-4">"Evenings, when the world quiets down."</p>
                                        <div className="flex justify-center mb-8">
                                            <p className="text-cyan-400 text-[10px] md:text-xs font-cinzel tracking-widest uppercase bg-cyan-950/30 border border-cyan-500/20 py-2 px-4 rounded-full inline-block">
                                                Event Duration: 1 - 2 Hours Max
                                            </p>
                                        </div>
                                        <div className="space-y-4">
                                            {[
                                                { label: '7:00 PM', sub: 'Early Evening' },
                                                { label: '8:00 PM', sub: 'Prime Time' },
                                                { label: '9:00 PM', sub: 'Late Night' }
                                            ].map((time) => (
                                                <motion.button
                                                    key={time.label}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => handleTimeSelect(time.label)}
                                                    disabled={isSubmitting}
                                                    className="w-full bg-white/5 p-5 rounded-2xl border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-950/30 transition-all flex items-center justify-between group"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <Clock className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                                                        <div className="text-left">
                                                            <span className="font-cinzel font-bold text-slate-200 group-hover:text-white text-lg block">{time.label}</span>
                                                            <span className="text-[10px] text-slate-500 uppercase tracking-wider">{time.sub}</span>
                                                        </div>
                                                    </div>
                                                    <div className="w-4 h-4 rounded-full border-2 border-slate-600 group-hover:border-cyan-400" />
                                                </motion.button>
                                            ))}
                                        </div>
                                        {isSubmitting && <p className="text-xs uppercase tracking-widest text-cyan-400 animate-pulse mt-6 text-center">Recording your voice...</p>}
                                    </GlassCard>
                                </motion.div>
                            )}

                            {/* STEP 3: SUCCESS */}
                            {step === 3 && (
                                <motion.div key="success" className="w-full text-center" {...stepTransition}>
                                    <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-[0_0_100px_rgba(8,145,178,0.2)] relative overflow-hidden">
                                        <div className="w-20 h-20 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(34,197,94,0.4)]">
                                            <CheckCircle2 className="w-10 h-10 text-white" />
                                        </div>

                                        <h2 className="font-cinzel text-3xl font-bold text-white mb-2">Voice Recorded</h2>
                                        <p className="text-slate-400 mb-8 font-playfair italic">"Your choice shapes our memory."</p>

                                        <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                            <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-500 font-bold mb-2">Selected</p>
                                            <div className="font-cinzel font-bold text-xl text-white">
                                                {selectedDate} • {selectedTime}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 4: ALREADY VOTED */}
                            {step === 4 && (
                                <motion.div key="done" className="w-full text-center" {...stepTransition}>
                                    <div className="w-24 h-24 bg-slate-900/80 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] animate-float">
                                        <Heart className="w-10 h-10 text-rose-500 fill-rose-500" />
                                    </div>

                                    <h2 className="font-cinzel text-3xl font-bold text-white mb-6">Hello Lovely Soul!</h2>

                                    <GlassCard title="Already Voted" subtitle="Status">
                                        <p className="font-playfair text-lg text-slate-300 italic">
                                            "You have already shared your preference. We appreciate your voice!"
                                        </p>
                                    </GlassCard>
                                </motion.div>
                            )}

                        </AnimatePresence>
                    </div>
                </>
            )}
        </div>
    );
};

// --- Helper Components ---

const GlassCard = ({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
    >
        <div className="relative z-10 mb-8 text-center md:text-left">
            <p className="text-xs font-bold tracking-[0.2em] text-cyan-500 uppercase mb-2">{subtitle}</p>
            <h2 className="font-cinzel text-3xl font-bold text-white leading-tight">{title}</h2>
        </div>
        <div className="relative z-10">
            {children}
        </div>
    </motion.div>
);

const stepTransition = {
    initial: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, scale: 1.05, filter: "blur(10px)" },
    transition: { duration: 0.6, ease: "easeInOut" }
};

const AuroraBackground = () => (
    <>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full animate-pulse-slow pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full animate-pulse-slow pointer-events-none" />
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-cyan-900/10 blur-[100px] rounded-full pointer-events-none" />
    </>
);

const SnowParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
            <div
                key={i}
                className="absolute bg-white rounded-full opacity-0 animate-[snowfall_10s_linear_infinite]"
                style={{
                    left: `${Math.random() * 100}%`,
                    top: '-10px',
                    width: `${Math.random() * 3 + 1}px`,
                    height: `${Math.random() * 3 + 1}px`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${Math.random() * 10 + 10}s`,
                    opacity: Math.random() * 0.5 + 0.1
                }}
            />
        ))}
        <style>{`
            @keyframes snowfall {
                0% { transform: translateY(-10vh) translateX(0); opacity: 0.8; }
                100% { transform: translateY(110vh) translateX(20px); opacity: 0; }
            }
            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            .animate-float { animation: float 6s ease-in-out infinite; }
            .animate-pulse-slow { animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        `}</style>
    </div>
);

export default LoveLaunchPoll;
