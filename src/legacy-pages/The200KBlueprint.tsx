import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { List, XCircle, BookOpen, Star, Instagram, Book, Rocket, Hash, Video, Users, DollarSign, TrendingUp, Palette, Search } from 'lucide-react';
import { IntroductionContent } from './The200KBlueprintIntroduction';
import { Chapter1Content } from './The200KBlueprintChapter1';
import { Chapter2Content } from './The200KBlueprintChapter2';
import { Chapter3Content } from './The200KBlueprintChapter3';
import { Chapter4Content } from './The200KBlueprintChapter4';
import { Chapter5Content } from './The200KBlueprintChapter5';
import { Chapter6Content } from './The200KBlueprintChapter6';
import { Chapter7Content } from './The200KBlueprintChapter7';
import { Chapter8Content } from './The200KBlueprintChapter8';
import ProtectedVaultRoute from '@/components/ProtectedVaultRoute';
import LoveAnthologyModal from '@/components/LoveAnthologyModal';

// --- Configuration ---

const chapters = [
    { id: 'introduction', title: 'Introduction: The Blueprint', days: 'Start Here', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'chapter-1', title: 'Chapter 1: The Inkfetish Story', days: 'Day Zero', icon: <Book className="w-4 h-4" /> },
    { id: 'chapter-2', title: 'Chapter 2: Understanding The Algorithm', days: 'The Rules', icon: <Rocket className="w-4 h-4" /> },
    { id: 'chapter-3', title: 'Chapter 3: Content Strategy', days: 'The Work', icon: <List className="w-4 h-4" /> },
    { id: 'chapter-4', title: 'Chapter 4: Hashtag Strategy', days: 'The Reach', icon: <Hash className="w-4 h-4" /> },
    { id: 'chapter-5', title: 'Chapter 5: Reels Strategy', days: 'The Volume', icon: <Video className="w-4 h-4" /> },
    { id: 'chapter-6', title: 'Chapter 6: Collaboration & Community', days: 'The Multiplier', icon: <Users className="w-4 h-4" /> },
    { id: 'chapter-7', title: 'Chapter 7: Monetization', days: 'The Income', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'chapter-8', title: 'Chapter 8: Advanced Growth', days: 'The Routine', icon: <TrendingUp className="w-4 h-4" /> },
];

// --- Sub-Components ---

const MobileCompactNav = ({ activeChapter }: { activeChapter: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="fixed bottom-6 left-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-full mb-4 left-0 w-64 bg-ink-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden origin-bottom-left"
                    >
                        <div className="p-4 max-h-[60vh] overflow-y-auto no-scrollbar">
                            <h4 className="text-gold font-serif text-xs uppercase tracking-widest mb-3 pl-2 border-b border-white/5 pb-2">Jump to Chapter</h4>
                            <div className="space-y-1">
                                {chapters.map((chapter) => (
                                    <button
                                        key={chapter.id}
                                        onClick={() => {
                                            document.getElementById(chapter.id)?.scrollIntoView({ behavior: 'smooth' });
                                            setIsOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all text-sm text-left ${activeChapter === chapter.id ? 'bg-gold/10 text-gold font-bold' : 'text-parchment/70 hover:bg-white/5 hover:text-parchment'}`}
                                    >
                                        <div className={`shrink-0 ${activeChapter === chapter.id ? 'text-gold' : 'opacity-50'}`}>{chapter.icon}</div>
                                        <span className="truncate">{chapter.title}</span>
                                        {activeChapter === chapter.id && <div className="w-1.5 h-1.5 rounded-full bg-gold ml-auto shrink-0" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 h-12 px-5 rounded-full shadow-lg border backdrop-blur-md transition-all ${isOpen ? 'bg-gold text-ink-black border-gold' : 'bg-ink-900/80 text-parchment border-white/10 hover:border-gold/50'}`}
            >
                {isOpen ? <XCircle className="w-5 h-5" /> : <List className="w-5 h-5" />}
                <span className="font-bold text-sm tracking-wide">Chapters</span>
            </motion.button>
            <p className="text-[10px] text-parchment/40 mt-1.5 text-center font-serif italic animate-pulse">Click to navigate</p>
        </div>
    );
};

const HeroSection = () => {
    return (
        <section className="relative h-[85vh] sm:min-h-[90vh] flex items-end justify-center pb-20 overflow-hidden bg-ink-black/20">
            {/* Top Navbar */}
            <div className="absolute top-0 left-0 right-0 z-50 px-4 py-4 md:px-6 md:py-6 flex justify-between items-center">
                <div className="text-gold font-serif text-lg md:text-xl tracking-widest font-bold">WRITERS VAULT</div>
                <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10 text-[10px] md:text-xs font-bold uppercase tracking-widest text-parchment/80">
                    Day 2
                </div>
            </div>

            <div className="absolute inset-0 bg-[url('/images/blueprint_header_bg.png')] bg-cover bg-center opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink-950/95 via-ink-900/80 to-ink-950/95" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gold font-sans text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
                        <Instagram className="w-3 h-3" /> The Growth Manual
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black text-parchment mb-6 leading-[0.9] tracking-tight">
                        THE 200K <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-gold">
                            BLUEPRINT
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-parchment/60 font-serif italic max-w-2xl mx-auto leading-relaxed">
                        How I Grew Inkfetish to 200,000 Followers
                    </p>

                    <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={() => document.getElementById('introduction')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-gold text-ink-black hover:bg-gold/90 px-8 py-4 rounded-full font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(255,215,0,0.15)] hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]"
                        >
                            Read The Blueprint
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const ChapterContent = ({ id, title, children }: { id: string, title: string, children: React.ReactNode }) => (
    <section id={id} className="min-h-screen py-24 border-b border-white/5 relative">
        <div className="container mx-auto px-6 max-w-4xl">
            <div className="mb-12">
                <h2 className="text-3xl md:text-5xl font-serif text-gold mb-4">{title}</h2>
                <div className="h-1 w-24 bg-gradient-to-r from-gold to-transparent" />
            </div>
            <div className="prose prose-invert prose-lg max-w-none text-parchment/80 font-serif leading-loose">
                {children}
            </div>
        </div>
    </section>
);

// --- Main Page Component ---

const The200KBlueprint = () => {
    const [activeChapter, setActiveChapter] = useState('introduction');
    const [showPromoModal, setShowPromoModal] = useState(false);
    const [triggers, setTriggers] = useState({ chapter3: false, chapter6: false });

    useEffect(() => {
        const handleScroll = () => {
            const sections = chapters.map(c => document.getElementById(c.id));
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            for (const section of sections) {
                if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
                    setActiveChapter(section.id);

                    // Trigger Modal on reaching Chapter 3 (First Time)
                    if (section.id === 'chapter-3' && !triggers.chapter3) {
                        setShowPromoModal(true);
                        setTriggers(prev => ({ ...prev, chapter3: true }));
                    }

                    // Trigger Modal on reaching Chapter 6 (Second Time)
                    if (section.id === 'chapter-6' && !triggers.chapter6) {
                        setShowPromoModal(true);
                        setTriggers(prev => ({ ...prev, chapter6: true }));
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [triggers]);

    return (
        <ProtectedVaultRoute>
            <div className="min-h-screen bg-ink-900 text-parchment font-sans selection:bg-gold/30 selection:text-white">
                <Helmet>
                    <title>The 200K Blueprint | Growth Guide</title>
                </Helmet>

                <MobileCompactNav activeChapter={activeChapter} />

                <HeroSection />

                {/* --- TOOLKIT REVEAL --- */}
                <section className="container mx-auto px-6 max-w-4xl pt-16 -mb-8 relative z-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block p-6 rounded-2xl bg-ink-900/80 border border-gold/20 backdrop-blur-md shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
                    >
                        <p className="text-parchment/90 font-serif italic mb-4 text-lg">
                            "What apps do I actually use?"
                            <span className="block text-xs font-sans not-italic text-gold uppercase tracking-widest mt-1 opacity-70">(No secrets. Just these.)</span>
                        </p>

                        <div className="flex flex-wrap justify-center gap-3">
                            <div className="flex items-center gap-2 px-4 py-2 bg-black/40 rounded-lg border border-white/5 hover:border-gold/30 transition-colors">
                                <Palette className="w-4 h-4 text-cyan-400" />
                                <span className="font-bold text-parchment text-sm">Canva</span>
                                <span className="text-xs text-parchment/40">for Design</span>
                            </div>

                            <div className="flex items-center gap-2 px-4 py-2 bg-black/40 rounded-lg border border-white/5 hover:border-gold/30 transition-colors">
                                <Video className="w-4 h-4 text-purple-400" />
                                <span className="font-bold text-parchment text-sm">CapCut / VN</span>
                                <span className="text-xs text-parchment/40">for Edits</span>
                            </div>

                            <div className="flex items-center gap-2 px-4 py-2 bg-black/40 rounded-lg border border-white/5 hover:border-gold/30 transition-colors">
                                <Search className="w-4 h-4 text-red-400" />
                                <span className="font-bold text-parchment text-sm">Pinterest</span>
                                <span className="text-xs text-parchment/40">for Inspo</span>
                            </div>

                            <div className="flex items-center gap-2 px-4 py-2 bg-black/40 rounded-lg border border-white/5 hover:border-gold/30 transition-colors">
                                <Instagram className="w-4 h-4 text-pink-500" />
                                <span className="font-bold text-parchment text-sm">Instagram</span>
                                <span className="text-xs text-parchment/40">for Posting</span>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* --- CONTENT --- */}

                <ChapterContent id="introduction" title="Introduction: The Blueprint">
                    <IntroductionContent />
                </ChapterContent>

                <ChapterContent id="chapter-1" title="Chapter 1: The Inkfetish Story">
                    <Chapter1Content />
                </ChapterContent>

                <ChapterContent id="chapter-2" title="Chapter 2: Understanding The Algorithm">
                    <Chapter2Content />
                </ChapterContent>

                <ChapterContent id="chapter-3" title="Chapter 3: Content Strategy">
                    <Chapter3Content />
                </ChapterContent>

                <ChapterContent id="chapter-4" title="Chapter 4: Hashtag Strategy">
                    <Chapter4Content />
                </ChapterContent>

                <ChapterContent id="chapter-5" title="Chapter 5: Reels Strategy">
                    <Chapter5Content />
                </ChapterContent>

                <ChapterContent id="chapter-6" title="Chapter 6: Collaboration & Community">
                    <Chapter6Content />
                </ChapterContent>

                <ChapterContent id="chapter-7" title="Chapter 7: Monetization">
                    <Chapter7Content />
                </ChapterContent>

                <ChapterContent id="chapter-8" title="Chapter 8: Advanced Growth Tactics">
                    <Chapter8Content />
                </ChapterContent>

                <footer className="py-12 text-center border-t border-white/10 text-parchment/40 text-sm uppercase tracking-widest">
                    © 2024 Authorverse. All rights reserved.
                </footer>

                <LoveAnthologyModal
                    isOpen={showPromoModal}
                    onClose={() => setShowPromoModal(false)}
                />
            </div>
        </ProtectedVaultRoute>
    );
};

export default The200KBlueprint;
