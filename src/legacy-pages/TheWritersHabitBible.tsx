import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { List, BookOpen, Star, Book, Feather, Target, Clock, Zap, Menu, X, Shield, Home, BarChart2, Map as MapIcon, Crown } from 'lucide-react';
import ProtectedVaultRoute from '@/components/ProtectedVaultRoute';
import LoveAnthologyModal from '@/components/LoveAnthologyModal';
import { IntroductionContent } from './TheWritersHabitBibleIntroduction';
import { Chapter1Content } from './TheWritersHabitBibleChapter1';
import { Chapter2Content } from './TheWritersHabitBibleChapter2';
import { Chapter3Content } from './TheWritersHabitBibleChapter3';
import { Chapter4Content } from './TheWritersHabitBibleChapter4';
import { Chapter5Content } from './TheWritersHabitBibleChapter5';
import { Chapter6Content } from './TheWritersHabitBibleChapter6';
import { Chapter7Content } from './TheWritersHabitBibleChapter7';
import { Chapter8Content } from './TheWritersHabitBibleChapter8';

// --- Configuration ---

const chapters = [
    { id: 'introduction', title: 'Introduction', days: 'Start Here', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'chapter-1', title: 'Chapter 1: The Willpower Myth', days: 'Day 1', icon: <Target className="w-4 h-4" /> },
    { id: 'chapter-2', title: 'Chapter 2: The 7 Habits', days: 'Day 2', icon: <List className="w-4 h-4" /> },
    { id: 'chapter-3', title: 'Chapter 3: Design Your Routine', days: 'Day 3', icon: <Clock className="w-4 h-4" /> },
    { id: 'chapter-4', title: 'Chapter 4: Bulletproof Your Habit', days: 'Day 4', icon: <Shield className="w-4 h-4" /> },
    { id: 'chapter-5', title: 'Chapter 5: The Environment', days: 'Day 5', icon: <Home className="w-4 h-4" /> },
    { id: 'chapter-6', title: 'Chapter 6: Tracking & Accountability', days: 'Day 6', icon: <BarChart2 className="w-4 h-4" /> },
    { id: 'chapter-7', title: 'Chapter 7: 30-Day Plan', days: 'Day 7', icon: <MapIcon className="w-4 h-4" /> },
    { id: 'chapter-8', title: 'Chapter 8: Long-Term Success', days: 'Day 8+', icon: <Crown className="w-4 h-4" /> },
];

// --- Sub-Components ---

const ComponentNav = ({ activeChapter }: { activeChapter: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed bottom-6 right-6 z-50 bg-gold text-ink-black p-4 rounded-full shadow-[0_0_20px_rgba(255,215,0,0.3)]"
            >
                {isOpen ? <X className="w-6 h-6" /> : <List className="w-6 h-6" />}
            </button>

            {/* Sidebar */}
            <div className={`
                fixed top-0 right-0 h-full w-80 bg-ink-950/95 backdrop-blur-xl border-l border-white/10 z-40 transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                lg:translate-x-0 lg:left-0 lg:right-auto lg:border-r lg:border-l-0
            `}>
                <div className="p-8">
                    <div className="text-gold font-serif font-bold text-xl tracking-widest mb-2">INKFETISH</div>
                    <div className="text-xs text-parchment/40 uppercase tracking-widest mb-8">The Routine Guide</div>

                    <div className="space-y-2">
                        {chapters.map((chapter) => (
                            <button
                                key={chapter.id}
                                onClick={() => {
                                    document.getElementById(chapter.id)?.scrollIntoView({ behavior: 'smooth' });
                                    setIsOpen(false);
                                }}
                                className={`
                                    w-full text-left px-4 py-3 rounded-lg text-sm transition-all group flex items-center gap-3
                                    ${activeChapter === chapter.id
                                        ? 'bg-gold/10 text-gold border border-gold/20'
                                        : 'text-parchment/60 hover:bg-white/5 hover:text-parchment'}
                                `}
                            >
                                <div className={`
                                    w-8 h-8 rounded-full flex items-center justify-center shrink-0 border
                                    ${activeChapter === chapter.id
                                        ? 'bg-gold text-ink-black border-gold'
                                        : 'bg-black/40 border-white/10 group-hover:border-gold/30'}
                                `}>
                                    {chapter.icon}
                                </div>
                                <div>
                                    <div className="font-bold">{chapter.title.split(':')[0]}</div>
                                    <div className="text-[10px] opacity-60 uppercase tracking-wider">{chapter.days}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

const HeroSection = () => {
    return (
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-ink-black/20 lg:ml-80">
            {/* Top Navbar */}
            <div className="absolute top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center">
                <div className="text-gold font-serif text-lg tracking-widest font-bold lg:hidden">INKFETISH</div>
                <div className="hidden lg:block"></div> {/* Spacer */}
                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs font-bold uppercase tracking-widest text-parchment/80">
                    Day 2
                </div>
            </div>

            <div className="absolute inset-0 bg-[url('/images/habit_bible_header_bg.png')] bg-cover bg-center opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink-950/95 via-ink-900/40 to-ink-900" />

            <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/40 border border-white/10 rounded-full text-gold font-sans text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
                        <Clock className="w-3 h-3" /> The Routine Guide
                    </div>

                    <h1 className="text-5xl md:text-7xl font-serif font-black text-parchment mb-6 leading-tight">
                        THE WRITER'S <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-gold">
                            HABIT BIBLE
                        </span>
                    </h1>

                    <p className="text-xl text-parchment/60 font-serif italic max-w-2xl mx-auto leading-relaxed">
                        Build an Unshakeable Writing Routine That Gets Books Done.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

const ChapterContainer = ({ id, title, children }: { id: string, title: string, children: React.ReactNode }) => (
    <section id={id} className="min-h-screen py-24 border-b border-white/5 relative lg:ml-80">
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

// --- Main Component ---

const TheWritersHabitBible = () => {
    const [activeChapter, setActiveChapter] = useState('introduction');
    const [isLoveModalOpen, setIsLoveModalOpen] = useState(false);
    const [triggeredModalChapters, setTriggeredModalChapters] = useState<string[]>([]);

    useEffect(() => {
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

    // Effect for triggering Modal at Chapter 2, 3 and 6
    useEffect(() => {
        if ((activeChapter === 'chapter-2' || activeChapter === 'chapter-3' || activeChapter === 'chapter-6') && !triggeredModalChapters.includes(activeChapter)) {
            setIsLoveModalOpen(true);
            setTriggeredModalChapters(prev => [...prev, activeChapter]);
        }
    }, [activeChapter]);

    return (
        <ProtectedVaultRoute>
            <div className="min-h-screen bg-ink-900 text-parchment font-sans selection:bg-gold/30 selection:text-white">
                <Helmet>
                    <title>Writer's Habit Bible | Authorverse</title>
                </Helmet>

                <LoveAnthologyModal isOpen={isLoveModalOpen} onClose={() => setIsLoveModalOpen(false)} />

                <ComponentNav activeChapter={activeChapter} />

                <HeroSection />

                <ChapterContainer id="introduction" title="Introduction">
                    <IntroductionContent />
                </ChapterContainer>

                <ChapterContainer id="chapter-1" title="Chapter 1: The Willpower Myth">
                    <Chapter1Content />
                </ChapterContainer>

                <ChapterContainer id="chapter-2" title="Chapter 2: The 7 Non-Negotiable Habits">
                    <Chapter2Content />
                </ChapterContainer>

                <ChapterContainer id="chapter-3" title="Chapter 3: Design Your Perfect Writing Day">
                    <Chapter3Content />
                </ChapterContainer>

                <ChapterContainer id="chapter-4" title="Chapter 4: Bulletproof Your Writing Habit">
                    <Chapter4Content />
                </ChapterContainer>

                <ChapterContainer id="chapter-5" title="Chapter 5: The Environment Advantage">
                    <Chapter5Content />
                </ChapterContainer>

                <ChapterContainer id="chapter-6" title="Chapter 6: Tracking & Accountability">
                    <Chapter6Content />
                </ChapterContainer>

                <ChapterContainer id="chapter-7" title="Chapter 7: The 30-Day Habit Installation Plan">
                    <Chapter7Content />
                </ChapterContainer>

                <ChapterContainer id="chapter-8" title="Chapter 8: Advanced Strategies for Long-Term Success">
                    <Chapter8Content />
                </ChapterContainer>

                <footer className="py-12 text-center border-t border-white/10 text-parchment/40 text-sm uppercase tracking-widest lg:ml-80">
                    © 2024 Authorverse. All rights reserved. Made by Inkfetish.
                </footer>
            </div>
        </ProtectedVaultRoute>
    );
};

export default TheWritersHabitBible;
