import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
    Book, CheckCircle, ChevronDown, List, XCircle,
    BookOpen, Map, DoorOpen, Layout,
    Image as ImageIcon, Calendar, Globe,
    Building, MessageSquare, FileText, ArrowRight,
    DollarSign, TrendingUp, Wallet, PieChart, Ghost, Rocket, Briefcase, GraduationCap, Mic2, BrainCircuit, PenTool, Mail, RefreshCw, Tent, FileSignature, Layers, Infinity, Printer, CheckSquare, Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import PagesChapterIntro from './PagesChapterIntro';
import PagesChapterGhostwriting from './PagesChapterGhostwriting';
import PagesChapterSelfPublishing from './PagesChapterSelfPublishing';
import PagesChapterFreelancing from './PagesChapterFreelancing';
import PagesChapterCourses from './PagesChapterCourses';
import PagesChapterSpeaking from './PagesChapterSpeaking';
import PagesChapterConsulting from './PagesChapterConsulting';
import PagesChapterCoaching from './PagesChapterCoaching';
import PagesChapterNewsletters from './PagesChapterNewsletters';
import PagesChapterAffiliate from './PagesChapterAffiliate';
import PagesChapterRetreats from './PagesChapterRetreats';
import PagesChapterLicensing from './PagesChapterLicensing';
import PagesChapterBrandContent from './PagesChapterBrandContent';
import PagesChapterMembership from './PagesChapterMembership';
import PagesChapterPOD from './PagesChapterPOD';
import PagesChapterConclusion from './PagesChapterConclusion';
import PagesChapterEpilogue from './PagesChapterEpilogue';

// --- Configuration ---

const chapters = [
    { id: 'introduction', title: 'Introduction: The Money Mindset', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'chapter-1', title: 'Ch 1: Ghostwriting', icon: <Ghost className="w-4 h-4" /> },
    { id: 'chapter-2', title: 'Ch 2: Self-Publishing', icon: <Rocket className="w-4 h-4" /> },
    { id: 'chapter-3', title: 'Ch 3: Freelancing', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'chapter-4', title: 'Ch 4: Online Courses', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'chapter-5', title: 'Ch 5: Speaking', icon: <Mic2 className="w-4 h-4" /> },
    { id: 'chapter-6', title: 'Ch 6: Consulting', icon: <BrainCircuit className="w-4 h-4" /> },
    { id: 'chapter-7', title: 'Ch 7: Book Coaching', icon: <PenTool className="w-4 h-4" /> },
    { id: 'chapter-8', title: 'Ch 8: Newsletters', icon: <Mail className="w-4 h-4" /> },
    { id: 'chapter-9', title: 'Ch 9: Affiliate Marketing', icon: <RefreshCw className="w-4 h-4" /> },
    { id: 'chapter-10', title: 'Ch 10: Retreats', icon: <Tent className="w-4 h-4" /> },
    { id: 'chapter-11', title: 'Ch 11: Licensing', icon: <FileSignature className="w-4 h-4" /> },
    { id: 'chapter-12', title: 'Ch 12: Brand Content', icon: <Layers className="w-4 h-4" /> },
    { id: 'chapter-13', title: 'Ch 13: Membership', icon: <Infinity className="w-4 h-4" /> },
    { id: 'chapter-14', title: 'Ch 14: POD Products', icon: <Printer className="w-4 h-4" /> },
    { id: 'conclusion', title: 'Conclusion: The Stack', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'epilogue', title: 'Epilogue: Build Your Empire', icon: <Crown className="w-4 h-4" /> },
];

// --- Sub-Components ---

const DesktopSidebar = ({ activeChapter }: { activeChapter: string }) => {
    return (
        <aside className="hidden xl:flex fixed left-0 top-0 bottom-0 w-72 flex-col z-40 bg-ink-900 border-r border-white/5 pt-24 pb-6 overflow-y-auto custom-scrollbar">
            <div className="px-6 mb-6">
                <h4 className="text-gold font-serif text-xs uppercase tracking-[0.2em] font-bold">
                    Monetization Map
                </h4>
            </div>
            <div className="flex-1 px-4 space-y-1">
                {chapters.map((chapter) => {
                    const isActive = activeChapter === chapter.id;
                    return (
                        <a
                            key={chapter.id}
                            href={`#${chapter.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(chapter.id)?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`group flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 ${isActive ? 'bg-gold/10 border border-gold/20' : 'hover:bg-white/5 border border-transparent'}`}
                        >
                            <div className={`shrink-0 transition-colors ${isActive ? 'text-gold' : 'text-parchment/40 group-hover:text-parchment/80'}`}>
                                {chapter.icon}
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className={`text-xs font-sans font-bold leading-none mb-1 transition-colors ${isActive ? 'text-gold' : 'text-parchment/60'}`}>
                                    {chapter.title.split(': ')[0]}
                                </span>
                                <span className={`text-xs font-serif truncate transition-colors ${isActive ? 'text-parchment' : 'text-parchment/40'}`}>
                                    {chapter.title.split(': ')[1]}
                                </span>
                            </div>
                        </a>
                    );
                })}
            </div>

            <div className="px-6 mt-6 pt-6 border-t border-white/5">
                <p className="text-[10px] text-parchment/30 text-center uppercase tracking-widest leading-relaxed">
                    Strategy by<br />Authorverse Summit
                </p>
            </div>
        </aside>
    );
};

const MobileCompactNav = ({ activeChapter }: { activeChapter: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="fixed bottom-6 left-6 z-50 xl:hidden">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-full mb-4 left-0 w-64 bg-ink-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden origin-bottom-left"
                    >
                        <div className="p-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
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
                <span className="font-bold text-sm tracking-wide">Roadmap</span>
            </motion.button>
            <p className="text-[10px] text-parchment/40 mt-1.5 text-center font-serif italic animate-pulse">Click to navigate</p>
        </div>
    );
};

const ChapterContent = ({ id, children }: { id: string, children: React.ReactNode }) => (
    <section id={id} className="min-h-screen py-12 md:py-24 border-b border-white/5 relative bg-ink-900 odd:bg-ink-black overflow-hidden w-full">
        <div className="container mx-auto px-4 md:px-6 max-w-full md:max-w-4xl overflow-x-hidden">
            {children}
        </div>
    </section>
);

const HeroSection = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-ink-950 w-full">
            {/* Top Navbar */}
            <div className="absolute top-0 left-0 right-0 z-50 px-4 py-4 md:px-6 md:py-6 flex justify-between items-center w-full max-w-[100vw]">
                <div className="xl:pl-80 transition-all duration-300"> {/* Added wrapper to apply padding only to logo area if needed, or remove completely if centering is preferred. Let's keep uniform separation */}
                    <div className="text-gold font-serif text-lg md:text-xl tracking-widest font-bold">INKFETISH</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10 text-[10px] md:text-xs font-bold uppercase tracking-widest text-parchment/80 whitespace-nowrap">
                    Writer's Vault: Day 3 💰
                </div>
            </div>

            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/pages-into-paychecks-hero.png"
                    alt="Vintage writer's desk with floating golden letters"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-ink-900/80 backdrop-blur-[2px]"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-ink-900/50"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center xl:pl-72 w-full max-w-[100vw]">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="inline-block px-3 py-1 rounded-full border border-gold/30 bg-gold/10 text-gold text-[10px] md:text-sm font-sans font-bold uppercase tracking-widest mb-4 md:mb-6">
                        The Monetization Guide
                    </div>

                    <h1 className="text-2xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight break-words">
                        PAGES INTO <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-400 to-green-600">PAYCHECKS</span>
                    </h1>
                    <p className="text-sm sm:text-lg md:text-2xl text-parchment/70 font-serif italic max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-4">
                        The Practical Guide to Making Real Money from Your Words
                    </p>

                    <button
                        onClick={() => document.getElementById('introduction')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-emerald-600 text-white hover:bg-emerald-500 px-6 py-2 md:px-8 md:py-4 rounded-full font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] text-xs md:text-base border border-emerald-400/20"
                    >
                        Start Earning
                    </button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-parchment/40"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <ChevronDown className="w-8 h-8" />
            </motion.div>
        </section>
    );
};

// --- Main Page Component ---

const PagesIntoPaychecks = () => {
    const [activeChapter, setActiveChapter] = useState('introduction');
    const { scrollYProgress } = useScroll();
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

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

    return (
        <div className="min-h-screen bg-ink-black text-white selection:bg-emerald-500/30 font-sans overflow-x-hidden w-full max-w-[100vw]">
            <Helmet>
                <title>Pages into Paychecks | Inkfetish</title>
                <meta name="description" content="The Practical Guide to Making Real Money from Your Words. 14 Income Streams for Authors beyond royalties." />
                <meta property="og:title" content="Pages into Paychecks | Inkfetish" />
                <meta property="og:description" content="The Practical Guide to Making Real Money from Your Words. 14 Income Streams for Authors beyond royalties." />
                <meta property="og:image" content="https://www.inkfetish.in/images/link_preview_card_v2.jpg" />
                <meta property="og:url" content="https://www.inkfetish.in/learning/pages-into-paychecks" />
                <meta property="og:type" content="article" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image" content="https://www.inkfetish.in/images/link_preview_card_v2.jpg" />
            </Helmet>

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 origin-left z-50 mobile-progress-bar"
                style={{ scaleX }}
            />

            <DesktopSidebar activeChapter={activeChapter} />
            <MobileCompactNav activeChapter={activeChapter} />
            <HeroSection />

            <div className="relative z-10 xl:pl-72 w-full max-w-[100vw] overflow-x-hidden">
                <ChapterContent id="introduction">
                    <PagesChapterIntro />
                </ChapterContent>

                <ChapterContent id="chapter-1">
                    <PagesChapterGhostwriting />
                </ChapterContent>

                <ChapterContent id="chapter-2">
                    <PagesChapterSelfPublishing />
                </ChapterContent>

                <ChapterContent id="chapter-3">
                    <PagesChapterFreelancing />
                </ChapterContent>

                <ChapterContent id="chapter-4">
                    <PagesChapterCourses />
                </ChapterContent>

                <ChapterContent id="chapter-5">
                    <PagesChapterSpeaking />
                </ChapterContent>

                <ChapterContent id="chapter-6">
                    <PagesChapterConsulting />
                </ChapterContent>

                <ChapterContent id="chapter-7">
                    <PagesChapterCoaching />
                </ChapterContent>

                <ChapterContent id="chapter-8">
                    <PagesChapterNewsletters />
                </ChapterContent>

                <ChapterContent id="chapter-9">
                    <PagesChapterAffiliate />
                </ChapterContent>

                <ChapterContent id="chapter-10">
                    <PagesChapterRetreats />
                </ChapterContent>

                <ChapterContent id="chapter-11">
                    <PagesChapterLicensing />
                </ChapterContent>

                <ChapterContent id="chapter-12">
                    <PagesChapterBrandContent />
                </ChapterContent>

                <ChapterContent id="chapter-13">
                    <PagesChapterMembership />
                </ChapterContent>

                <ChapterContent id="chapter-14">
                    <PagesChapterPOD />
                </ChapterContent>

                <ChapterContent id="conclusion">
                    <PagesChapterConclusion />
                </ChapterContent>

                <ChapterContent id="epilogue">
                    <PagesChapterEpilogue />
                </ChapterContent>

                {chapters.slice(17).map(chapter => (
                    <ChapterContent key={chapter.id} id={chapter.id}>
                        <div className="p-8 text-center text-parchment/60 italic border border-white/5 rounded-xl bg-white/5 max-w-2xl mx-auto">
                            <h3 className="text-xl font-bold text-white mb-4">{chapter.title}</h3>
                            <p>Content waiting for input...</p>
                        </div>
                    </ChapterContent>
                ))}

                <div className="container mx-auto px-4 py-24 w-full overflow-hidden">
                    <div className="border border-emerald-500/20 bg-ink-900/50 p-8 md:p-12 rounded-2xl text-center max-w-3xl mx-auto backdrop-blur-sm relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10" />
                        <div className="relative z-10">
                            <DollarSign className="w-12 h-12 md:w-16 md:h-16 text-emerald-500 mx-auto mb-6" />
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white mb-6">Ready to Monetize?</h3>
                            <p className="text-lg md:text-xl text-parchment/80 mb-10 leading-relaxed font-serif px-4">
                                Turning words into wealth is a skill. You have the blueprint. Now build the business.
                            </p>
                            <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-4 md:px-8 md:py-6 rounded-full text-base md:text-lg font-bold tracking-widest uppercase w-full sm:w-auto">
                                Return to Vault
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="py-12 text-center border-t border-white/5 text-parchment/30 text-xs uppercase tracking-widest bg-ink-black xl:pl-72 w-full overflow-hidden">
                Authorverse Summit © 2024
            </footer>
        </div>
    );
};

export default PagesIntoPaychecks;
