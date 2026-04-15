import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Feather, ArrowRight, BookOpen, CheckCircle2, Copy } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

const LoveAnthologySubmission = () => {
    const [step, setStep] = useState(0); // 0 = Oath, 1 = Identity, 2 = Contact, 3 = Poem 1, 4 = Poem 2, 5 = Success
    const [formData, setFormData] = useState({
        realName: '',
        bookName: '',
        isPenName: false,
        whatsapp: '',
        isGroupMember: false,
        poem1Title: '',
        poem1Theme: '',
        poem1Content: '',
        addPoem2: false,
        poem2Title: '',
        poem2Theme: '',
        poem2Content: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loveToken, setLoveToken] = useState('');

    const generateLoveToken = () => {
        const nameSource = formData.realName || formData.bookName || "XX";
        const cleanName = nameSource.replace(/[^a-zA-Z]/g, '').toUpperCase();
        const prefix = (cleanName.length >= 2 ? cleanName.substring(0, 2) : (cleanName + 'X').substring(0, 2));
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        return `${prefix}-${randomNum}`;
    };

    const [showOpening, setShowOpening] = useState(true);
    const [introPhase, setIntroPhase] = useState(0); // 0: Start, 1: Inkfetish, 2: Winter Anthology, 3: Title

    useEffect(() => {
        // Timeline:
        // 0.5s: Phase 1 (Inkfetish Presents)
        // 2.5s: Phase 2 (Winter Anthology)
        // 6.0s: Phase 3 (Love at -1°C)
        // 9.5s: End

        const t1 = setTimeout(() => setIntroPhase(1), 500);
        const t2 = setTimeout(() => setIntroPhase(2), 2500);
        const t3 = setTimeout(() => setIntroPhase(3), 6000);
        const t4 = setTimeout(() => setShowOpening(false), 9500);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
        };
    }, []);

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);
    const handleSubmit = async () => {
        setIsSubmitting(true);
        const token = generateLoveToken();
        setLoveToken(token);

        // Determine the final name to store as book_name
        const finalBookName = formData.isPenName ? formData.bookName : formData.realName;

        try {
            const { error } = await supabase
                .from('anthology_submissions')
                .insert([{
                    love_token: token,
                    real_name: formData.realName,
                    book_name: finalBookName,
                    is_pen_name: formData.isPenName,
                    whatsapp: formData.whatsapp,
                    poem1_title: formData.poem1Title,
                    poem1_theme: formData.poem1Theme,
                    poem1_content: formData.poem1Content,
                    poem2_title: formData.addPoem2 ? formData.poem2Title : null,
                    poem2_theme: formData.addPoem2 ? formData.poem2Theme : null,
                    poem2_content: formData.addPoem2 ? formData.poem2Content : null
                }]);

            if (error) throw error;
            setStep(5); // Success Step
        } catch (error: any) {
            console.error('Submission Error:', error);
            alert(`Error: ${error.message || 'Something went wrong.'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const copyToken = () => {
        navigator.clipboard.writeText(loveToken);
        alert('Token copied to clipboard!');
    };

    return (
        <div className="min-h-[100dvh] bg-slate-950 relative overflow-hidden font-playfair selection:bg-cyan-500/30">
            {/* Cinematic Opening Sequence */}
            <AnimatePresence>
                {showOpening && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black flex items-center justify-center flex-col p-6"
                        exit={{ opacity: 0, transition: { duration: 1.5 } }}
                    >
                        <AnimatePresence mode="wait">
                            {introPhase === 1 && (
                                <motion.div
                                    key="phase1"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                                    transition={{ duration: 1, ease: "easeInOut" }}
                                    className="text-center"
                                >
                                    <Feather className="w-8 h-8 md:w-12 md:h-12 text-cyan-500 mx-auto mb-4 animate-pulse" />
                                    <span className="text-cyan-500 font-cinzel tracking-[0.3em] uppercase text-xs md:text-sm">Inkfetish Presents</span>
                                </motion.div>
                            )}

                            {introPhase === 2 && (
                                <motion.div
                                    key="phase2"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                                    transition={{ duration: 1.2, ease: "easeInOut" }}
                                    className="text-center relative"
                                >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-cyan-500/20 blur-3xl rounded-full" />
                                    <h2 className="text-2xl md:text-5xl font-cinzel font-bold text-white mb-2 relative z-10">
                                        India's First <br /> <span className="text-cyan-400 italic">Winter Anthology</span>
                                    </h2>
                                    <p className="text-slate-400 text-xs md:text-sm tracking-widest uppercase mt-4">Witness the Chill</p>
                                </motion.div>
                            )}

                            {introPhase === 3 && (
                                <motion.div
                                    key="phase3"
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                    className="text-center w-full"
                                >
                                    <motion.h1
                                        initial={{ opacity: 0, filter: 'blur(20px)' }}
                                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                                        transition={{ delay: 0.2, duration: 1.5 }}
                                        className="text-5xl md:text-8xl font-bold font-cinzel text-white mb-6 leading-tight"
                                    >
                                        Love at <br className="md:hidden" /> -1°C
                                    </motion.h1>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100px" }}
                                        transition={{ delay: 1.0, duration: 1 }}
                                        className="h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Navbar */}
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ delay: 4.5, type: "spring", stiffness: 100 }}
                className="fixed top-0 left-0 right-0 z-40 p-4 md:p-6 flex justify-between items-center bg-gradient-to-b from-slate-950/80 to-transparent pointer-events-none"
            >
                <div className="flex items-center gap-2 md:gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-3 py-2 md:px-4 md:py-2 rounded-full pointer-events-auto">
                    <Feather className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
                    <span className="font-cinzel font-bold text-white text-xs md:text-sm tracking-widest">Inkfetish</span>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 px-3 py-2 md:px-4 md:py-2 rounded-full pointer-events-auto">
                    <span className="font-playfair text-slate-300 text-[10px] md:text-xs tracking-wider">Submission Portal</span>
                </div>
            </motion.div>

            {/* Cinematic Background Layer */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black" />
                <AuroraBackground />
                <SnowParticles />
            </div>

            <div className="relative z-10 min-h-[100dvh] flex flex-col items-center justify-center p-3 md:p-6 w-full max-w-[100vw] overflow-x-hidden pt-20 md:pt-0">

                <AnimatePresence mode="wait">
                    {/* STEP 0: THE OATH (Cinematic Entrance) */}
                    {step === 0 && !showOpening && (
                        <motion.div
                            key="oath"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                            className="text-center w-full max-w-4xl relative px-4"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="mb-6 md:mb-8 inline-block"
                            >
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1px] mx-auto animate-spin-slow">
                                    <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                                        <Feather className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" />
                                    </div>
                                </div>
                            </motion.div>

                            <h1 className="font-cinzel text-2xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-slate-400 mb-6 md:mb-8 leading-tight tracking-tight">
                                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>Love</motion.span>{" "}
                                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>at</motion.span>{" "}
                                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="italic text-cyan-400 block md:inline mt-2 md:mt-0">-1°C</motion.span>
                            </h1>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5, duration: 1.5 }}
                                className="text-lg md:text-3xl text-slate-300 font-light italic mb-8 md:mb-12 leading-relaxed space-y-4"
                            >
                                <p>"I pledge to give my absolute best."</p>
                                <p className="text-slate-400 text-sm md:text-lg">Words that bleed. Emotions that freeze.</p>
                            </motion.div>

                            <motion.button
                                onClick={nextStep}
                                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(6,182,212,0.4)" }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2.5 }}
                                className="group relative px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-full font-cinzel font-bold tracking-[0.2em] uppercase overflow-hidden w-full md:w-auto"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-4 text-xs md:text-base">
                                    Enter The Submission Portal <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </motion.button>
                        </motion.div>
                    )}

                    {/* STEP 1: IDENTITY */}
                    {step === 1 && (
                        <motion.div key="identity" className="w-full max-w-xl px-2 md:px-0" {...stepTransition}>
                            <GlassCard title="Who is the Author?" subtitle="Step 01 / Identity">
                                <div className="space-y-8 md:space-y-10">
                                    <FloatingInput
                                        label="Your Full Name"
                                        value={formData.realName}
                                        onChange={(v: string) => setFormData({ ...formData, realName: v })}
                                        autoFocus
                                    />

                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group" onClick={() => setFormData({ ...formData, isPenName: !formData.isPenName })}>
                                        <div className={`w-6 h-6 shrink-0 rounded border-2 flex items-center justify-center transition-colors ${formData.isPenName ? 'bg-cyan-500 border-cyan-500' : 'border-slate-500 group-hover:border-cyan-400'}`}>
                                            {formData.isPenName && <CheckCircle2 className="w-4 h-4 text-white" />}
                                        </div>
                                        <div>
                                            <p className="text-white font-cinzel tracking-wider text-sm md:text-base">I want to publish under a Pen Name</p>
                                            <p className="text-slate-400 text-xs">If unchecked, your Full Name will be used.</p>
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {formData.isPenName && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <FloatingInput
                                                    label="Pen Name for Book"
                                                    value={formData.bookName}
                                                    onChange={(v: string) => setFormData({ ...formData, bookName: v })}
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <NavButtons onNext={nextStep} isDisabled={!formData.realName || (formData.isPenName && !formData.bookName)} />
                            </GlassCard>
                        </motion.div>
                    )}

                    {/* STEP 2: VERIFICATION */}
                    {step === 2 && (
                        <motion.div key="contact" className="w-full max-w-xl px-2 md:px-0" {...stepTransition}>
                            <GlassCard title="Verification" subtitle="Step 02 / Security">
                                <div className="space-y-8 md:space-y-10">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-bold ml-1">WhatsApp Number</label>
                                        <div className="relative group">
                                            <span className="absolute left-0 bottom-3 md:bottom-4 text-xl md:text-2xl text-slate-500 font-cinzel select-none">🇮🇳 +91</span>
                                            <input
                                                type="tel"
                                                maxLength={10}
                                                className="w-full bg-transparent border-b border-slate-700 focus:border-cyan-400 text-white text-3xl md:text-4xl py-2 pl-24 md:pl-28 outline-none transition-all font-cinzel tracking-widest placeholder:text-slate-800 focus:placeholder:text-slate-900/0 z-10 relative"
                                                placeholder="00000"
                                                value={formData.whatsapp}
                                                onChange={e => setFormData({ ...formData, whatsapp: e.target.value.replace(/\D/g, '') })}
                                                autoFocus
                                            />
                                            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-500 transition-all duration-700 group-focus-within:w-full" />
                                        </div>
                                    </div>

                                    <div className={`p-4 md:p-6 rounded-xl border transition-all duration-500 ${formData.isGroupMember ? 'bg-cyan-950/30 border-cyan-500/50' : 'bg-slate-900/50 border-white/10'}`}>
                                        <div className="flex gap-4 items-start">
                                            <div onClick={() => setFormData({ ...formData, isGroupMember: !formData.isGroupMember })} className={`mt-1 w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${formData.isGroupMember ? 'border-cyan-400 bg-cyan-400' : 'border-slate-500 hover:border-cyan-400'}`}>
                                                {formData.isGroupMember && <CheckCircle2 className="w-4 h-4 text-black" />}
                                            </div>
                                            <div className="cursor-pointer" onClick={() => setFormData({ ...formData, isGroupMember: !formData.isGroupMember })}>
                                                <p className="text-white font-bold text-xs md:text-sm uppercase tracking-wider mb-1">Mandatory Group Check</p>
                                                <p className="text-slate-400 text-xs md:text-sm leading-relaxed">I confirm that I am a member of the official "Love at -1°C" WhatsApp group and this number is registered there.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <NavButtons onNext={nextStep} onPrev={prevStep} isDisabled={!formData.whatsapp || formData.whatsapp.length !== 10 || !formData.isGroupMember} />
                            </GlassCard>
                        </motion.div>
                    )}

                    {/* STEP 3: POEM 1 */}
                    {step === 3 && (
                        <motion.div key="poem1" className="w-full max-w-2xl px-2 md:px-0" {...stepTransition}>
                            <GlassCard title="Your Masterpiece" subtitle="Step 03 / Submission">
                                <div className="space-y-6 md:space-y-8">
                                    <FloatingInput
                                        label="Title of Poem"
                                        value={formData.poem1Title}
                                        onChange={(v: string) => setFormData({ ...formData, poem1Title: v })}
                                    />
                                    <FloatingInput
                                        label="Theme / Emotion"
                                        value={formData.poem1Theme}
                                        onChange={(v: string) => setFormData({ ...formData, poem1Theme: v })}
                                    />
                                    <div className="space-y-3 pt-4">
                                        <div className="flex justify-between items-end">
                                            <label className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-bold">Poem Content</label>
                                            <span className="text-[10px] text-slate-500 uppercase tracking-wider">Paste your work below</span>
                                        </div>
                                        <div className="relative group">
                                            <textarea
                                                className="w-full bg-slate-950/50 border border-white/10 hover:border-white/20 focus:border-cyan-500/50 text-slate-200 text-sm md:text-lg p-3 md:p-6 rounded-2xl outline-none transition-all placeholder:text-slate-700 h-48 md:h-80 resize-none leading-loose font-playfair italic shadow-inner z-10 relative"
                                                placeholder="In the silence of the winter night..."
                                                value={formData.poem1Content}
                                                onChange={e => setFormData({ ...formData, poem1Content: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <NavButtons onNext={nextStep} onPrev={prevStep} isDisabled={!formData.poem1Title || !formData.poem1Content} />
                            </GlassCard>
                        </motion.div>
                    )}

                    {/* STEP 4: POEM 2 (OPTIONAL) */}
                    {step === 4 && (
                        <motion.div key="poem2" className="w-full max-w-2xl px-2 md:px-0" {...stepTransition}>
                            <GlassCard title="The Second Act" subtitle="Step 04 / Optional">
                                <div className="space-y-6 md:space-y-8">
                                    <div className="flex flex-col md:flex-row items-center justify-between p-4 md:p-6 bg-gradient-to-r from-slate-900 to-slate-900/50 rounded-2xl border border-white/10 gap-4 md:gap-0">
                                        <div className="text-center md:text-left">
                                            <h3 className="text-white font-cinzel text-lg md:text-xl mb-1">Second Submission</h3>
                                            <p className="text-slate-400 text-xs md:text-sm">Submit a second poem? We will publish your best work.</p>
                                        </div>
                                        <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0">
                                            <button
                                                onClick={() => setFormData({ ...formData, addPoem2: true })}
                                                className={`flex-1 md:flex-none px-6 py-2 rounded-full font-bold tracking-wider transition-all duration-300 ${formData.addPoem2 ? 'bg-cyan-600 text-white shadow-[0_0_20px_rgba(8,145,178,0.4)]' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                                            >
                                                YES, SUBMIT 2ND
                                            </button>
                                            <button
                                                onClick={() => setFormData({ ...formData, addPoem2: false })}
                                                className={`flex-1 md:flex-none px-6 py-2 rounded-full font-bold tracking-wider transition-all duration-300 ${!formData.addPoem2 ? 'bg-slate-700 text-white border border-slate-500' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                                            >
                                                NO, I'M OKAY
                                            </button>
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {formData.addPoem2 && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, height: 'auto', scale: 1 }}
                                                exit={{ opacity: 0, height: 0, scale: 0.95 }}
                                                className="space-y-6 md:space-y-8 pt-4 overflow-hidden"
                                            >
                                                <FloatingInput
                                                    label="Title of Poem 2"
                                                    value={formData.poem2Title}
                                                    onChange={(v: string) => setFormData({ ...formData, poem2Title: v })}
                                                />
                                                <FloatingInput
                                                    label="Theme / Emotion"
                                                    value={formData.poem2Theme}
                                                    onChange={(v: string) => setFormData({ ...formData, poem2Theme: v })}
                                                />
                                                <div className="space-y-3">
                                                    <label className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-bold">Poem Content</label>
                                                    <textarea
                                                        className="w-full bg-slate-950/50 border border-white/10 hover:border-white/20 focus:border-cyan-500/50 text-slate-200 text-sm md:text-lg p-3 md:p-6 rounded-2xl outline-none transition-all placeholder:text-slate-700 h-48 md:h-80 resize-none leading-loose font-playfair italic shadow-inner z-10 relative"
                                                        placeholder="And when the stars align..."
                                                        value={formData.poem2Content}
                                                        onChange={e => setFormData({ ...formData, poem2Content: e.target.value })}
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <NavButtons
                                    onNext={handleSubmit}
                                    onPrev={prevStep}
                                    isNextSubmit
                                    isSubmitting={isSubmitting}
                                    isDisabled={formData.addPoem2 && (!formData.poem2Title || !formData.poem2Content)}
                                />
                            </GlassCard>
                        </motion.div>
                    )}

                    {/* STEP 5: SUCCESS */}
                    {step === 5 && (
                        <motion.div key="success" className="w-full max-w-lg text-center px-4" {...stepTransition}>
                            <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-6 md:p-10 rounded-[2rem] shadow-[0_0_100px_rgba(8,145,178,0.2)] relative overflow-hidden">
                                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />

                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", damping: 15 }}
                                    className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-[0_0_40px_rgba(34,197,94,0.4)] relative z-10"
                                >
                                    <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-white" />
                                </motion.div>

                                <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-white mb-2 md:mb-4">Submission Confirmed</h2>
                                <p className="text-slate-400 mb-8 md:mb-10 font-playfair italic text-base md:text-lg">"Your voice has been captured in the winter winds."</p>

                                <div className="bg-black/40 p-6 md:p-8 rounded-2xl border border-white/5 mb-8 md:mb-10 relative group">
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-500 font-bold mb-4">Save your Token Number</p>
                                    <div className="flex items-center justify-center gap-4 md:gap-6 relative z-10">
                                        <span className="text-2xl md:text-4xl font-cinzel font-bold text-white tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{loveToken}</span>
                                        <button onClick={copyToken} className="p-2 md:p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all hover:scale-110 active:scale-95 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                            <Copy className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
                                        </button>
                                    </div>
                                    <div className="absolute inset-0 bg-cyan-500/5 blur-2xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

// --- Cinematic Components ---

const GlassCard = ({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle: string }) => (
    <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="relative z-10 mb-6 md:mb-10">
            <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-cyan-500 uppercase mb-2">{subtitle}</p>
            <h2 className="font-cinzel text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 leading-tight">{title}</h2>
        </div>
        <div className="relative z-10">
            {children}
        </div>
    </div>
);

const FloatingInput = ({ label, value, onChange, autoFocus }: any) => (
    <div className="relative group">
        <input
            type="text"
            className="peer w-full bg-transparent border-b border-slate-700 focus:border-cyan-400 text-white text-xl md:text-2xl py-3 outline-none transition-all font-playfair placeholder-transparent pt-6 relative z-10"
            placeholder={label}
            value={value}
            onChange={e => onChange(e.target.value)}
            autoFocus={autoFocus}
        />
        <label className={`
            absolute left-0 transition-all duration-300 pointer-events-none uppercase tracking-widest font-bold text-[10px] md:text-xs z-20
            ${value ? '-top-2 text-cyan-500' : 'top-4 text-slate-500 group-focus-within:-top-2 group-focus-within:text-cyan-500'}
        `}>
            {label}
        </label>
        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-700 group-focus-within:w-full box-shadow-[0_0_10px_cyan]" />
    </div>
);

const NavButtons = ({ onNext, onPrev, isDisabled, isNextSubmit, isSubmitting }: any) => (
    <div className="flex justify-between items-center mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/5">
        {onPrev ? (
            <button onClick={onPrev} className="text-slate-500 hover:text-white text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold px-3 py-2 md:px-4 md:py-2 hover:-translate-x-1 transition-transform">
                Back
            </button>
        ) : <div />}

        <button
            onClick={onNext}
            disabled={isDisabled || isSubmitting}
            className={`
                group px-6 py-3 md:px-10 md:py-4 rounded-full font-bold tracking-[0.2em] uppercase transition-all duration-500 flex items-center gap-3 relative overflow-hidden font-cinzel text-xs md:text-sm
                ${isDisabled
                    ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-white/5'
                    : 'bg-white text-black hover:bg-cyan-50 hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]'
                }
            `}
        >
            <span className="relative z-10 flex items-center gap-2">
                {isSubmitting ? 'Sending...' : isNextSubmit ? 'Submit' : 'Next Step'}
                {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </span>
            {!isDisabled && <div className="absolute inset-0 bg-gradient-to-r from-cyan-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
        </button>
    </div>
);

const stepTransition = {
    initial: { opacity: 0, y: 20, scale: 0.98, filter: "blur(10px)" },
    animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, y: -20, scale: 0.98, filter: "blur(10px)" },
    transition: { duration: 0.5, ease: "easeInOut" }
};

// --- Background Effects ---

const AuroraBackground = () => (
    <>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full animate-pulse pointer-events-none" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full animate-pulse pointer-events-none" style={{ animationDuration: '12s' }} />
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-cyan-900/10 blur-[100px] rounded-full animate-bounce-slow pointer-events-none" />
    </>
);

const SnowParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
            <div
                key={i}
                className="absolute bg-white rounded-full opacity-0 animate-snow"
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
    </div>
);

export default LoveAnthologySubmission;
