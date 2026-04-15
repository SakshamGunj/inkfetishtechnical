import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { List, XCircle, BookOpen, Star, Sparkles, Feather, PenTool, Users, DoorOpen, CheckCircle2, Clock, Map, Languages, Calendar, Unlock, Rocket, Heart } from 'lucide-react';
import { Chapter1Content } from './GetPublishedChapter1';
import { Chapter2Content } from './GetPublishedChapter2';
import { Chapter3Content } from './GetPublishedChapter3';
import { Chapter4Content } from './GetPublishedChapter4';
import { Chapter5Content } from './GetPublishedChapter5';
import { Chapter6Content } from './GetPublishedChapter6';
import { Chapter7Content } from './GetPublishedChapter7';
import { ConclusionContent } from './GetPublishedConclusion';
import { IntroductionContent } from './GetPublishedIntroduction';
import LoveAnthologyModal from '@/components/LoveAnthologyModal';
import ProtectedVaultRoute from '@/components/ProtectedVaultRoute';

// --- Configuration ---

const chapters = [
    { id: 'introduction', title: 'Introduction: Stop Waiting. Start Publishing.', days: 'Start Here', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'chapter-1', title: 'Chapter 1: Why Anthology Publishing Is Your Fastest Path', days: 'The Strategy', icon: <DoorOpen className="w-4 h-4" /> },
    { id: 'chapter-2', title: 'Chapter 2: Writing Poetry That Gets Selected', days: 'The Craft', icon: <PenTool className="w-4 h-4" /> },
    { id: 'chapter-3', title: 'Chapter 3: Bilingual Writing Secrets', days: 'The Edge', icon: <Languages className="w-4 h-4" /> },
    { id: 'chapter-4', title: 'Chapter 4: The 15-Day Publication Timeline', days: 'The Plan', icon: <Calendar className="w-4 h-4" /> },
    { id: 'chapter-5', title: 'Chapter 5: Submission Secrets Editors Won\'t Tell You', days: 'The Insider', icon: <Unlock className="w-4 h-4" /> },
    { id: 'chapter-6', title: 'Chapter 6: Leveraging Your Published Author Status', days: 'The Future', icon: <Rocket className="w-4 h-4" /> },
    { id: 'chapter-7', title: 'Chapter 7: Introducing Love at Minus One Anthology', days: 'The Opportunity', icon: <Heart className="w-4 h-4" /> },
    { id: 'conclusion', title: 'Conclusion: Your 15-Day Countdown Starts Now', days: 'The Start', icon: <Star className="w-4 h-4" /> },
];

// --- Sub-Components ---

const DesktopSidebar = ({ activeChapter, showSidebar }: { activeChapter: string, showSidebar: boolean }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: showSidebar ? 1 : 0, x: showSidebar ? 0 : -50 }}
            className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50 hidden xl:flex flex-col gap-2 pointer-events-none"
        >
            <div className={`bg-ink-900/40 backdrop-blur-md p-4 rounded-xl border border-white/5 shadow-2xl w-72 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gold/20 scrollbar-track-transparent transition-all duration-500 pointer-events-auto ${showSidebar ? 'translate-x-0' : '-translate-x-10'}`}>
                <h4 className="text-gold font-serif mb-4 text-xs uppercase tracking-[0.2em] pl-1 border-b border-white/5 pb-3 sticky top-0 bg-ink-900/95 backdrop-blur z-20">
                    15-Day Roadmap
                </h4>
                <div className="space-y-0.5 relative">
                    <div className="absolute left-[11px] top-2 bottom-2 w-px bg-white/5" />
                    {chapters.map((chapter) => {
                        const isActive = activeChapter === chapter.id;
                        return (
                            <a
                                key={chapter.id}
                                href={`#${chapter.id}`}
                                className={`relative flex items-center group py-1.5 pl-1 ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-80'}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById(chapter.id)?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                <div className={`w-1.5 h-1.5 rounded-full mr-4 z-10 transition-all duration-300 ${isActive ? 'bg-gold scale-125 shadow-[0_0_8px_rgba(197,160,89,0.8)]' : 'bg-parchment/30 group-hover:bg-parchment/70'}`} />
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-widest text-gold/80 mb-0.5 font-sans">{chapter.days}</span>
                                    <span className={`text-sm font-serif leading-tight transition-colors ${isActive ? 'text-parchment' : 'text-parchment/80'}`}>{chapter.title.split(': ')[1] || chapter.title}</span>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
};

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
                            <h4 className="text-gold font-serif text-xs uppercase tracking-widest mb-3 pl-2 border-b border-white/5 pb-2">Jump to Day</h4>
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
                <span className="font-bold text-sm tracking-wide">Roadmap</span>
            </motion.button>
            <p className="text-[10px] text-parchment/40 mt-1.5 text-center font-serif italic animate-pulse">Click to go to chapter</p>
        </div>
    );
};

const HeroSection = () => {
    return (
        <section className="relative h-[85vh] sm:min-h-[90vh] flex items-end justify-center pb-20 overflow-hidden bg-ink-black/20">
            {/* Top Navbar */}
            <div className="absolute top-0 left-0 right-0 z-50 px-4 py-4 md:px-6 md:py-6 flex justify-between items-center">
                <div className="text-gold font-serif text-lg md:text-xl tracking-widest font-bold">INKFETISH</div>
                <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10 text-[10px] md:text-xs font-bold uppercase tracking-widest text-parchment/80">
                    Writer's Vault: 3-Day Launch! 🚀
                </div>
            </div>

            <div className="absolute inset-0 bg-[url('/images/StartTheJourneyBG.png')] bg-cover bg-center opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink-950/90 via-ink-900/60 to-ink-950/90" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gold font-sans text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
                        <Map className="w-3 h-3" /> The Roadmap
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black text-parchment mb-6 leading-[0.9] tracking-tight">
                        GET PUBLISHED <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-gold">
                            IN 15 DAYS
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-parchment/60 font-serif italic max-w-2xl mx-auto leading-relaxed">
                        The Indian Writer's Fast-Track to Anthology Success
                    </p>

                    <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={() => document.getElementById('chapter-1')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-gold text-ink-black hover:bg-gold/90 px-8 py-4 rounded-full font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(255,215,0,0.15)] hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]"
                        >
                            Start the Journey
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

const GetPublishedIn15Days = () => {
    const [activeChapter, setActiveChapter] = useState('chapter-1');
    const [showModal, setShowModal] = useState(false);
    const [hasShownModal, setHasShownModal] = useState(false);

    // Trigger Modal on Chapter 3
    useEffect(() => {
        if (activeChapter === 'chapter-3' && !hasShownModal) {
            setShowModal(true);
            setHasShownModal(true);
        }
    }, [activeChapter, hasShownModal]);

    React.useEffect(() => {
        const handleScroll = () => {
            const sections = chapters.map(c => document.getElementById(c.id));
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            for (const section of sections) {
                if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
                    setActiveChapter(section.id);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <ProtectedVaultRoute>
            <div className="min-h-screen bg-ink-900 text-parchment font-sans selection:bg-gold/30 selection:text-white">
                <Helmet>
                    <title>Get Published in 15 Days | Authorverse Guide</title>
                </Helmet>

                {/* <DesktopSidebar activeChapter={activeChapter} showSidebar={true} /> */}
                <MobileCompactNav activeChapter={activeChapter} />

                <LoveAnthologyModal isOpen={showModal} onClose={() => setShowModal(false)} />

                <HeroSection />

                {/* --- CONTENT --- */}

                <ChapterContent id="introduction" title="Introduction: Stop Waiting. Start Publishing.">
                    <IntroductionContent />
                </ChapterContent>

                <ChapterContent id="chapter-1" title="Chapter 1: Why Anthology Publishing Is Your Fastest Path">
                    <Chapter1Content />
                </ChapterContent>

                <ChapterContent id="chapter-2" title="Chapter 2: Writing Poetry That Gets Selected">
                    <Chapter2Content />
                </ChapterContent>

                <ChapterContent id="chapter-3" title="Chapter 3: Bilingual Writing Secrets (Hindi-English)">
                    <Chapter3Content />
                </ChapterContent>

                <ChapterContent id="chapter-4" title="Chapter 4: The 15-Day Publication Timeline">
                    <Chapter4Content />
                </ChapterContent>

                <ChapterContent id="chapter-5" title="Chapter 5: Submission Secrets Editors Won't Tell You">
                    <Chapter5Content />
                </ChapterContent>

                <ChapterContent id="chapter-6" title="Chapter 6: Leveraging Your Published Author Status">
                    <Chapter6Content />
                </ChapterContent>

                <ChapterContent id="chapter-7" title="Chapter 7: Introducing Love at Minus One Anthology">
                    <Chapter7Content />
                </ChapterContent>

                <ChapterContent id="conclusion" title="Conclusion: Your 15-Day Countdown Starts Now">
                    <ConclusionContent />
                </ChapterContent>

                <footer className="py-12 text-center border-t border-white/10 text-parchment/40 text-sm uppercase tracking-widest">
                    © 2024 Authorverse Summit. All rights reserved.
                </footer>
            </div>
        </ProtectedVaultRoute>
    );
};

export default GetPublishedIn15Days;
