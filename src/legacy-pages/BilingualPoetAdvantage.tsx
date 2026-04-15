import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { AlertTriangle, ArrowRight, Book, BookOpen, Brain, Briefcase, Calendar, CheckCircle2, ChevronDown, Clock, Crown, DoorOpen, Feather, FileText, Globe, GraduationCap, Heart, HelpCircle, History, Home, Languages, List, Lock, Mic, Moon, PenTool, Scale, Smartphone, Sparkles, Star, Sun, Sunset, User, Users, XCircle, Zap, DollarSign, Bookmark, Quote } from 'lucide-react';
import { Technique1Switcharoo, Technique2Untranslatable, Technique3Refrain, Technique4Cinematic, Technique5Translation, Technique6Cultural, Technique7Enjambment } from './BilingualChapter2';
import { ItalicsGuide, ScriptDecisionTree, ContextScale } from './BilingualChapter3';
import { AnthologyShowcase, InstagramStrategy } from './BilingualChapter4';
import { ClicheFlipper, BeforeAfterPoem, OptimizationChecklist } from './BilingualChapter5';
import { CaseStudies } from './BilingualChapter6';
import { WordVault, UsageRecipe } from './BilingualChapter7';
import { PortfolioBlueprint, RevisionChecklist } from './BilingualChapter8';
import { MindsetShifter, PermissionSlip, ImposterAntidotes } from './BilingualChapter9';
import { SevenDayRoadmap } from './BilingualChapter10';
import { IncomeStreamGrid, PitchTemplate } from './BilingualChapter11';
import { FutureTimeline, AnthologyInvitation, FinalTruth } from './BilingualChapter12';
import { PromptsDeck, SubmissionEmail, RecommendedReading } from './BilingualBonus';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// ... (existing imports)

const OptimizationStation = () => (
    <div className="my-12">
        <Tabs defaultValue="area1" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-ink-900 border border-white/10 p-1 h-auto mb-6">
                <TabsTrigger value="area1" className="data-[state=active]:bg-gold data-[state=active]:text-ink-black h-10 md:h-12 font-serif">1. Imagery</TabsTrigger>
                <TabsTrigger value="area2" className="data-[state=active]:bg-gold data-[state=active]:text-ink-black h-10 md:h-12 font-serif">2. Tightening</TabsTrigger>
                <TabsTrigger value="area3" className="data-[state=active]:bg-gold data-[state=active]:text-ink-black h-10 md:h-12 font-serif">3. Structure</TabsTrigger>
                <TabsTrigger value="area4" className="data-[state=active]:bg-gold data-[state=active]:text-ink-black h-10 md:h-12 font-serif">4. Impact</TabsTrigger>
            </TabsList>

            <TabsContent value="area1" className="mt-0 outline-none">
                <div className="bg-ink-900/50 border border-white/10 p-6 md:p-8 rounded-xl backdrop-blur-sm animate-in fade-in slide-in-from-left-4 duration-500">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex-1">
                            <h4 className="text-xl font-bold text-parchment mb-3 flex items-center gap-2">
                                <Sparkles className="text-gold w-5 h-5" /> From Cliché to Fresh Imagery
                            </h4>
                            <p className="text-parchment/80 leading-relaxed mb-4">
                                A cliché is any phrase used so often it loses impact ("broken heart", "drowning in tears").
                                Your task is to replace these with specific, personal details from your actual reality.
                            </p>
                            <div className="bg-ink-black/50 p-4 rounded-lg border-l-2 border-gold italic">
                                <p className="mb-2 text-red-400/80 line-through decoration-red-400/50"><span className="font-bold text-red-500 no-underline">Cliché:</span> "My heart shattered into a million pieces when you left."</p>
                                <p className="text-green-400/90"><span className="font-bold text-green-500">Fresh:</span> "I still flinch when I hear your particular knock on the door, three quick taps and a pause."</p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 aspect-video md:aspect-square bg-black/40 rounded-lg overflow-hidden relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 mix-blend-overlay" />
                            <div className="absolute inset-0 flex items-center justify-center text-center p-4">
                                <p className="text-parchment/60 font-serif italic">"Specificity is the cure for the cliché."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="area2" className="mt-0 outline-none">
                <div className="bg-ink-900/50 border border-white/10 p-6 md:p-8 rounded-xl backdrop-blur-sm animate-in fade-in slide-in-from-right-4 duration-500">
                    <h4 className="text-xl font-bold text-parchment mb-3 flex items-center gap-2">
                        <Feather className="text-gold w-5 h-5" /> Tightening Language
                    </h4>
                    <p className="text-parchment/80 leading-relaxed mb-6">
                        Every word must earn its place. Cut qualifiers ("maybe", "just"), filters ("I feel", "I think"), and redundant adjectives.
                        A tight 25-line poem beats a flabby 40-line one.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
                            <h5 className="font-bold text-red-400 mb-2 text-sm uppercase">Cut These</h5>
                            <ul className="text-sm space-y-1 text-parchment/70 list-disc pl-4">
                                <li>"Maybe", "Sort of"</li>
                                <li>"Suddenly"</li>
                                <li>"I started to"</li>
                                <li>"Very", "Really"</li>
                            </ul>
                        </div>
                        <div className="p-4 bg-green-900/20 border border-green-500/20 rounded-lg">
                            <h5 className="font-bold text-green-400 mb-2 text-sm uppercase">Keep These</h5>
                            <ul className="text-sm space-y-1 text-parchment/70 list-disc pl-4">
                                <li>Concrete Nouns</li>
                                <li>Active Verbs</li>
                                <li>Specific Names</li>
                                <li>Sensory Details</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="area3" className="mt-0 outline-none">
                <div className="bg-ink-900/50 border border-white/10 p-6 md:p-8 rounded-xl backdrop-blur-sm animate-in fade-in zoom-in-95 duration-500">
                    <h4 className="text-xl font-bold text-parchment mb-3 flex items-center gap-2">
                        <List className="text-gold w-5 h-5" /> Intentional Structure
                    </h4>
                    <p className="text-parchment/80 leading-relaxed mb-4">
                        Don't break lines randomly. Break them to control pacing, create emphasis, or highlight a double-meaning.
                        Use stanza breaks (white space) to signal emotional shifts.
                    </p>
                    <div className="relative h-24 bg-parchment/5 rounded-lg border border-white/5 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 flex flex-col gap-2 p-4 opacity-50 select-none pointer-events-none">
                            <div className="h-2 w-3/4 bg-current rounded-full" />
                            <div className="h-2 w-1/2 bg-current rounded-full" />
                            <div className="h-2 w-full bg-current rounded-full" />
                        </div>
                        <p className="relative z-10 bg-ink-900 px-4 py-1 rounded-full border border-gold/50 text-gold text-sm shadow-xl">
                            White space is an active ingredient.
                        </p>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="area4" className="mt-0 outline-none">
                <div className="bg-ink-900/50 border border-white/10 p-6 md:p-8 rounded-xl backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h4 className="text-xl font-bold text-parchment mb-3 flex items-center gap-2">
                        <Star className="text-gold w-5 h-5" /> Opening & Ending Impact
                    </h4>
                    <div className="space-y-6">
                        <div>
                            <span className="text-gold font-bold text-sm uppercase tracking-wider block mb-1">The Opening</span>
                            <p className="text-parchment/80 text-sm">Don't clear your throat ("I remember when..."). Start in the middle of the action or image. Hook them instantly.</p>
                        </div>
                        <div className="h-px w-full bg-white/10" />
                        <div>
                            <span className="text-gold font-bold text-sm uppercase tracking-wider block mb-1">The Ending</span>
                            <p className="text-parchment/80 text-sm">Don't summarize or explain the moral. End on a resonant image or a "turn" that changes the meaning of what came before.</p>
                        </div>
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    </div>
);

const AnthologyVettingTool = () => (
    <div className="my-12 space-y-8">
        <Tabs defaultValue="redflags" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-ink-900 border border-white/10 p-1 h-14 mb-6">
                <TabsTrigger value="redflags" className="data-[state=active]:bg-red-900/40 data-[state=active]:text-red-300 data-[state=active]:border-red-500/30 border border-transparent h-12 font-serif text-lg">
                    <XCircle className="w-5 h-5 mr-2" /> Red Flags (Run)
                </TabsTrigger>
                <TabsTrigger value="greenflags" className="data-[state=active]:bg-green-900/40 data-[state=active]:text-green-300 data-[state=active]:border-green-500/30 border border-transparent h-12 font-serif text-lg">
                    <CheckCircle2 className="w-5 h-5 mr-2" /> Green Flags (Submit)
                </TabsTrigger>
            </TabsList>

            <TabsContent value="redflags" className="mt-0 outline-none animate-in fade-in slide-in-from-left-4">
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-ink-900/50 border-red-900/30 p-6">
                        <h4 className="font-bold text-red-400 mb-4 flex items-center gap-2">⚠️ Excessive Pricing</h4>
                        <p className="text-sm text-parchment/70 mb-4">If they charge {'>'} ₹700, ask why. Production costs for 50 contributors are typically ₹300-600/person.</p>
                        <div className="bg-red-950/30 p-3 rounded text-xs font-mono text-red-300/80">
                            Math: (Printing ₹60 + Design ₹50 + ISBN ₹20 + Shipping ₹60) x 3 copies ≈ ₹570
                        </div>
                    </Card>
                    <Card className="bg-ink-900/50 border-red-900/30 p-6">
                        <h4 className="font-bold text-red-400 mb-4 flex items-center gap-2">⚠️ "Everyone Gets In"</h4>
                        <p className="text-sm text-parchment/70">No curation = no quality control. If they accept everything, the book will be amateurish.</p>
                    </Card>
                    <Card className="bg-ink-900/50 border-red-900/30 p-6">
                        <h4 className="font-bold text-red-400 mb-4 flex items-center gap-2">⚠️ False Urgency</h4>
                        <p className="text-sm text-parchment/70">"2 slots left!" usually means "we need your money now." Real publishers give you time to decide.</p>
                    </Card>
                    <Card className="bg-ink-900/50 border-red-900/30 p-6">
                        <h4 className="font-bold text-red-400 mb-4 flex items-center gap-2">⚠️ Exclusive Rights</h4>
                        <p className="text-sm text-parchment/70">NEVER give exclusive rights for an anthology. You should own your poem to publish elsewhere later.</p>
                    </Card>
                </div>
            </TabsContent>

            <TabsContent value="greenflags" className="mt-0 outline-none animate-in fade-in slide-in-from-right-4">
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-ink-900/50 border-green-900/30 p-6">
                        <h4 className="font-bold text-green-400 mb-4 flex items-center gap-2">✅ Fair Pricing (₹300-600)</h4>
                        <p className="text-sm text-parchment/70">Covers production, ISBN, design, and your physical copies. Transparent breakdown.</p>
                    </Card>
                    <Card className="bg-ink-900/50 border-green-900/30 p-6">
                        <h4 className="font-bold text-green-400 mb-4 flex items-center gap-2">✅ Clear Theme & Vision</h4>
                        <p className="text-sm text-parchment/70">Defined theme (e.g., "Frozen Feelings") creates a cohesive reader experience.</p>
                    </Card>
                    <Card className="bg-ink-900/50 border-green-900/30 p-6">
                        <h4 className="font-bold text-green-400 mb-4 flex items-center gap-2">✅ Quality Curation</h4>
                        <p className="text-sm text-parchment/70">They read submissions and reject some. This protects your reputation as a co-author.</p>
                    </Card>
                    <Card className="bg-ink-900/50 border-green-900/30 p-6">
                        <h4 className="font-bold text-green-400 mb-4 flex items-center gap-2">✅ Community Focus</h4>
                        <p className="text-sm text-parchment/70">Look for WhatsApp groups, launch events, or networks beyond just the book transaction.</p>
                    </Card>
                </div>
            </TabsContent>
        </Tabs>
    </div>
);

const LoveAtMinusOneScorecard = () => (
    <div className="my-12 bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold shadow-lg shrink-0">
                <img src="/images/love_at_minus_one.png" alt="Love at Minus One" className="w-full h-full object-cover" />
            </div>
            <div>
                <h3 className="text-2xl font-serif text-parchment">Case Study: 'Love at Minus One'</h3>
                <p className="text-parchment/60 text-sm">Applying the framework to this specific opportunity.</p>
            </div>
        </div>

        <div className="space-y-6">
            <div className="flex gap-4 items-start pb-6 border-b border-white/5">
                <div className="bg-green-500/20 p-2 rounded-full text-green-400 shrink-0 mt-1"><CheckCircle2 className="w-5 h-5" /></div>
                <div>
                    <h5 className="font-bold text-parchment mb-1">Theme & Vision</h5>
                    <p className="text-sm text-parchment/70">"Some hearts freeze before they break." Specific (emotional distance, situationships) yet broad enough for unique voices. High relevance to Gen Z/Millennials.</p>
                </div>
            </div>
            <div className="flex gap-4 items-start pb-6 border-b border-white/5">
                <div className="bg-green-500/20 p-2 rounded-full text-green-400 shrink-0 mt-1"><CheckCircle2 className="w-5 h-5" /></div>
                <div>
                    <h5 className="font-bold text-parchment mb-1">Pricing & Transparency</h5>
                    <p className="text-sm text-parchment/70">₹399 per slot. Falls squarely in the ethical green zone. Covers ISBN, design, editing, and distribution.</p>
                </div>
            </div>
            <div className="flex gap-4 items-start pb-6 border-b border-white/5">
                <div className="bg-green-500/20 p-2 rounded-full text-green-400 shrink-0 mt-1"><CheckCircle2 className="w-5 h-5" /></div>
                <div>
                    <h5 className="font-bold text-parchment mb-1">Rights & Respect</h5>
                    <p className="text-sm text-parchment/70">Non-exclusive rights only. You retain copyright and can publish elsewhere. 100% creator-friendly.</p>
                </div>
            </div>
            <div className="flex gap-4 items-start">
                <div className="bg-green-500/20 p-2 rounded-full text-green-400 shrink-0 mt-1"><CheckCircle2 className="w-5 h-5" /></div>
                <div>
                    <h5 className="font-bold text-parchment mb-1">Curation</h5>
                    <p className="text-sm text-parchment/70">Not a "pay-to-play" mill. Submissions are reviewed for quality and fit. Acceptance is a genuine credential.</p>
                </div>
            </div>
        </div>
    </div>
);

const SubmissionChecklist = () => {
    const [checked, setChecked] = useState<Record<string, boolean>>({});

    const toggle = (id: string) => {
        setChecked(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const steps = [
        { id: "step1", title: "Day 9: Evaluate", desc: "Research deeply. Read guidelines. Check for Red Flags. Decide if this is the right home for your work." },
        { id: "step2", title: "Day 10: Prepare", desc: "Format poem (Word/PDF). Write 3-sentence bio. Prepare contact info. Final proofread." },
        { id: "step3", title: "Day 11: Submit", desc: "Pay fee via UPI/Bank used by organizer. Email materials. Save receipt. Celebrate! 🎉" },
    ];

    return (
        <div className="grid md:grid-cols-3 gap-4 my-8">
            {steps.map((step, i) => (
                <div
                    key={step.id}
                    onClick={() => toggle(step.id)}
                    className={`relative p-6 rounded-xl border cursor-pointer transition-all group overflow-hidden ${checked[step.id] ? 'bg-gold/10 border-gold/50' : 'bg-white/5 border-white/10 hover:border-gold/30'}`}
                >
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-parchment/50">Step 0{i + 1}</span>
                        {checked[step.id] ? <CheckCircle2 className="w-6 h-6 text-gold animate-in zoom-in spin-in-90 duration-300" /> : <div className="w-6 h-6 rounded-full border border-white/20" />}
                    </div>
                    <h4 className={`text-lg font-bold mb-2 transition-colors ${checked[step.id] ? 'text-gold' : 'text-parchment'}`}>{step.title}</h4>
                    <p className="text-sm text-parchment/70">{step.desc}</p>

                    {checked[step.id] && <div className="absolute inset-0 border-2 border-gold/20 rounded-xl pointer-events-none animate-pulse" />}
                </div>
            ))}
        </div>
    );
};

const ImposterSyndromeShield = () => {
    const doubts = [
        {
            icon: <AlertTriangle className="w-6 h-6 text-orange-400" />,
            fear: "What if I'm not good enough?",
            reframe: "If you followed Phases P and O, you're not submitting random work - you're submitting your best. Rejection is usually about fit, not worth."
        },
        {
            icon: <Lock className="w-6 h-6 text-red-400" />,
            fear: "It's a waste of money.",
            reframe: "₹399 is less than dinner and a movie. It's an investment in your portfolio. You're buying a credential, not just a book."
        },
        {
            icon: <Users className="w-6 h-6 text-blue-400" />,
            fear: "Other poets are better.",
            reframe: "If accepted, you belong there. Validated by the editor. Use it to learn from them, not compare hierarchies."
        },
        {
            icon: <Home className="w-6 h-6 text-purple-400" />,
            fear: "My parents won't get it.",
            reframe: "Frame it as a career investment: 'I'm getting published in a book with an ISBN for my CV.' That is fact, not spin."
        }
    ];

    return (
        <div className="my-12">
            <h3 className="text-xl font-serif text-center mb-8 text-parchment/80 italic">"But I'm Scared..." (The Imposter Syndrome Shield)</h3>
            <div className="grid md:grid-cols-2 gap-4">
                {doubts.map((item, i) => (
                    <div key={i} className="bg-ink-900/40 border border-white/5 p-6 rounded-xl hover:bg-white/5 transition-colors group">
                        <div className="flex items-center gap-3 mb-3 opacity-70 group-hover:opacity-100 transition-opacity">
                            {item.icon}
                            <h4 className="font-bold text-parchment font-serif">{item.fear}</h4>
                        </div>
                        <p className="text-sm text-parchment/60 pl-9 border-l-2 border-gold/20 group-hover:border-gold/50 transition-colors pt-1">
                            <span className="text-gold uppercase text-[10px] tracking-widest block mb-1">Reframe</span>
                            {item.reframe}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const BioTransformation = () => {
    const [mode, setMode] = useState<'before' | 'after'>('before');

    return (
        <div className="my-12 bg-ink-900/50 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
            <div className="flex border-b border-white/10">
                <button
                    onClick={() => setMode('before')}
                    className={`flex-1 p-4 font-serif text-lg transition-colors ${mode === 'before' ? 'bg-white/5 text-parchment' : 'text-parchment/50 hover:text-parchment'}`}
                >
                    The "Before" Bio
                </button>
                <button
                    onClick={() => setMode('after')}
                    className={`flex-1 p-4 font-serif text-lg transition-colors ${mode === 'after' ? 'bg-gold/10 text-gold' : 'text-parchment/50 hover:text-gold'}`}
                >
                    The "After" Bio
                </button>
            </div>
            <div className="p-8 text-center min-h-[200px] flex flex-col items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 mb-6 flex items-center justify-center overflow-hidden">
                    <User className="w-12 h-12 text-parchment/50" />
                </div>
                {mode === 'before' ? (
                    <div className="animate-in fade-in zoom-in duration-300">
                        <p className="font-bold text-parchment text-lg mb-2">Aspiring Poet 🌙</p>
                        <p className="text-parchment/60 italic">Writing about love & heartbreak | Mumbai | DM for collabs</p>
                        <p className="mt-6 text-sm text-red-400 bg-red-950/20 px-4 py-2 rounded-full inline-block">
                            Feeling: "Hobbyist. Unproven. Just starting."
                        </p>
                    </div>
                ) : (
                    <div className="animate-in fade-in zoom-in duration-300">
                        <p className="font-bold text-gold text-lg mb-2">Published Poet 📖</p>
                        <p className="text-parchment/80 italic">Co-author in 'Love at Minus One' | Exploring emotional distance & frozen feelings | Mumbai</p>
                        <p className="mt-6 text-sm text-green-400 bg-green-950/20 px-4 py-2 rounded-full inline-block">
                            Feeling: "Professional. Validated. Established."
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

const LeverageGrid = () => (
    <div className="grid md:grid-cols-3 gap-6 my-12">
        <Card className="bg-ink-900/40 border-white/10 p-6 hover:border-gold/30 transition-colors group">
            <div className="w-12 h-12 rounded-full bg-blue-900/20 flex items-center justify-center mb-4 text-blue-400 group-hover:bg-blue-900/40 transition-colors">
                <Briefcase className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-parchment mb-2">Professional</h4>
            <p className="text-sm text-parchment/70">"I'm a published author."</p>
            <p className="text-xs text-parchment/50 mt-4 border-t border-white/5 pt-4">Signals: Completion, Creativity, Follow-through. Use in interviews & CVs.</p>
        </Card>
        <Card className="bg-ink-900/40 border-white/10 p-6 hover:border-gold/30 transition-colors group">
            <div className="w-12 h-12 rounded-full bg-purple-900/20 flex items-center justify-center mb-4 text-purple-400 group-hover:bg-purple-900/40 transition-colors">
                <GraduationCap className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-parchment mb-2">Academic</h4>
            <p className="text-sm text-parchment/70">"My work was selected for publication."</p>
            <p className="text-xs text-parchment/50 mt-4 border-t border-white/5 pt-4">Signals: Excellence, Discipline, Extra-curricular achievement. Use in essays.</p>
        </Card>
        <Card className="bg-ink-900/40 border-white/10 p-6 hover:border-gold/30 transition-colors group">
            <div className="w-12 h-12 rounded-full bg-pink-900/20 flex items-center justify-center mb-4 text-pink-400 group-hover:bg-pink-900/40 transition-colors">
                <Users className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-parchment mb-2">Social</h4>
            <p className="text-sm text-parchment/70">"It's available on Amazon."</p>
            <p className="text-xs text-parchment/50 mt-4 border-t border-white/5 pt-4">Signals: Legitimacy. Stops the "what are you doing with your life?" questions.</p>
        </Card>
    </div>
);

const ActivationChecklist = () => {
    const [checked, setChecked] = useState<Record<string, boolean>>({});

    const toggle = (id: string) => {
        setChecked(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const steps = [
        { id: "act1", title: "Day 12: Identity Update", desc: "Update Instagram bio, LinkedIn Headline, and Email Signature. Claim the title." },
        { id: "act2", title: "Day 13: The Announcement", desc: "Post the 'I'm Published' story/post. Tag the anthology. Respond to every congratulation." },
        { id: "act3", title: "Day 14: Network Activation", desc: "Connect with 5 co-authors. Send a 'great poem' DM. Build your circle." },
        { id: "act4", title: "Day 15: The Next Step", desc: "Don't stop. Identify your next submission target. Momentum is everything." },
    ];

    return (
        <div className="space-y-4 my-8">
            {steps.map(step => (
                <div
                    key={step.id}
                    onClick={() => toggle(step.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${checked[step.id] ? 'bg-gold/10 border-gold/50' : 'bg-white/5 border-white/10 hover:border-gold/30'}`}
                >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${checked[step.id] ? 'bg-gold border-gold text-ink-black' : 'border-white/20 text-transparent'}`}>
                        <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className={`font-bold transition-colors ${checked[step.id] ? 'text-gold' : 'text-parchment'}`}>{step.title}</h4>
                        <p className="text-sm text-parchment/70">{step.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

const SocialShareGuide = () => {
    return (
        <div className="my-12 grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <h4 className="font-serif text-red-400 font-bold mb-4 flex items-center gap-2">
                    <XCircle className="w-5 h-5" /> The "Cringe" Approach
                </h4>
                <div className="bg-red-950/20 border border-red-500/20 p-4 rounded-lg text-sm text-parchment/60 italic">
                    "I can't believe I'm a published author now... I'm nobody special, sorry to bother you guys but..."
                    <span className="block mt-2 text-red-400 font-normal not-italic text-xs border-t border-red-500/20 pt-2">why: Performative humility. Makes people uncomfortable.</span>
                </div>
                <div className="bg-red-950/20 border border-red-500/20 p-4 rounded-lg text-sm text-parchment/60 italic">
                    "I TOLD YOU I WAS TALENTED. Look at me now! #HatersGonnaHate"
                    <span className="block mt-2 text-red-400 font-normal not-italic text-xs border-t border-red-500/20 pt-2">Why: Ego-driven. Alienates your supporters.</span>
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="font-serif text-green-400 font-bold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> The "Authentic" Approach
                </h4>
                <div className="bg-green-950/20 border border-green-500/20 p-6 rounded-lg text-sm text-parchment/90">
                    "Holding my first published book feels surreal. My poem 'Title' appears in 'Love at Minus One' alongside 40+ other voices exploring love, distance, and all the ways we freeze before we break. Grateful to everyone who supported this journey. This is just the beginning. 📖"
                    <span className="block mt-4 text-green-400 font-normal text-xs border-t border-green-500/20 pt-2">Why: Grounded excitement. Gives credit. Invites celebration.</span>
                </div>
            </div>
        </div>
    );
};

const TransformationInsights = () => (
    <div className="my-12 grid md:grid-cols-2 gap-6">
        <div className="bg-ink-900/40 p-6 rounded-xl border border-white/5 hover:border-gold/20 transition-all">
            <h4 className="font-serif text-lg font-bold text-parchment mb-2">🚀 Action Over Aspiration</h4>
            <p className="text-sm text-parchment/70">"They all started by taking one concrete action instead of staying stuck in aspiration or fear."</p>
        </div>
        <div className="bg-ink-900/40 p-6 rounded-xl border border-white/5 hover:border-gold/20 transition-all">
            <h4 className="font-serif text-lg font-bold text-parchment mb-2">🎯 Strategic Approach</h4>
            <p className="text-sm text-parchment/70">"They didn't just 'submit.' They selected carefully, refined thoughtfully, and aimed intentionally."</p>
        </div>
        <div className="bg-ink-900/40 p-6 rounded-xl border border-white/5 hover:border-gold/20 transition-all">
            <h4 className="font-serif text-lg font-bold text-parchment mb-2">🏁 Waypoint, Not Destination</h4>
            <p className="text-sm text-parchment/70">"They treated their first publication as a beginning that led to more opportunities, not the end."</p>
        </div>
        <div className="bg-ink-900/40 p-6 rounded-xl border border-white/5 hover:border-gold/20 transition-all">
            <h4 className="font-serif text-lg font-bold text-parchment mb-2">🧠 Identity Shift</h4>
            <p className="text-sm text-parchment/70">"They all had to work through 'who am I to do this?' before stepping into their identity as writers."</p>
        </div>
    </div>
);


const DecisionPoint = () => (
    <div className="my-20 max-w-2xl mx-auto text-center">
        <Feather className="w-12 h-12 text-gold mx-auto mb-6" />
        <h3 className="text-3xl md:text-4xl font-serif text-parchment mb-8">The Decision Point</h3>
        <p className="text-lg text-parchment/80 mb-8 leading-relaxed">
            Will you actually do this? Will you follow these fifteen days? Or will you close this tab and tell yourself "maybe later"?
        </p>
        <p className="text-xl text-gold font-serif italic mb-12">
            "Later has a way of becoming never. Your poems are frozen at minus one. It's time to thaw them out."
        </p>
    </div>
);

const UltimateInvitation = () => (
    <div className="relative py-24 my-12 overflow-hidden rounded-2xl border border-gold/30 group">
        <div className="absolute inset-0 bg-[url('/images/paper_texture.png')] opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-black to-ink-900" />

        <div className="relative z-10 text-center px-6">
            <h2 className="text-4xl md:text-6xl font-serif text-gold mb-6 drop-shadow-md">Begin Day 1</h2>
            <p className="text-parchment/60 max-w-lg mx-auto mb-10 text-lg">
                The container is waiting. The anthology is open. The path is mapped.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button className="bg-gold text-ink-black hover:bg-gold/90 text-xl px-10 py-8 rounded-full font-bold shadow-[0_0_30px_rgba(255,215,0,0.2)] hover:shadow-[0_0_50px_rgba(255,215,0,0.4)] transition-all">
                    Start Your 15-Day Journey <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
            </div>

            <p className="mt-8 text-sm text-parchment/40 uppercase tracking-widest font-sans">
                Transformation starts now
            </p>
        </div>
    </div>
);

const StoryShowcase = () => (
    <div className="my-12">
        <Tabs defaultValue="ananya" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-ink-900 border border-white/10 p-1 h-auto mb-6">
                <TabsTrigger value="ananya" className="data-[state=active]:bg-gold data-[state=active]:text-ink-black h-12 font-serif">Ananya</TabsTrigger>
                <TabsTrigger value="rohan" className="data-[state=active]:bg-gold data-[state=active]:text-ink-black h-12 font-serif">Rohan</TabsTrigger>
                <TabsTrigger value="priya" className="data-[state=active]:bg-gold data-[state=active]:text-ink-black h-12 font-serif">Priya</TabsTrigger>
                <TabsTrigger value="kabir" className="data-[state=active]:bg-gold data-[state=active]:text-ink-black h-12 font-serif">Kabir</TabsTrigger>
            </TabsList>

            <TabsContent value="ananya" className="mt-0 outline-none animate-in fade-in slide-in-from-left-4">
                <Card className="bg-ink-900/50 border-white/10 p-6 md:p-8 backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                        <div className="w-20 h-20 rounded-full bg-white/10 shrink-0 flex items-center justify-center border border-white/20">
                            <Sparkles className="w-8 h-8 text-gold" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-serif text-gold">The Small-Town Poet</h3>
                            <p className="text-parchment/60 italic">"I thought poetry wasn't for people like me."</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="p-4 bg-white/5 rounded-lg border-l-2 border-red-500/50">
                            <h4 className="font-bold text-parchment mb-1">Before</h4>
                            <p className="text-sm text-parchment/70">Writing in secret lecture notes. 70 Instagram followers. Convinced "real poets" only lived in big cities.</p>
                        </div>
                        <div className="p-4 bg-gold/10 rounded-lg border-l-2 border-gold">
                            <h4 className="font-bold text-parchment mb-1">The Shift</h4>
                            <p className="text-sm text-parchment/70">Submitted to an anthology about unrequited love. Replaced clichés with real details about small-town longing.</p>
                        </div>
                        <div className="p-4 bg-green-900/20 rounded-lg border-l-2 border-green-500/50">
                            <h4 className="font-bold text-parchment mb-1">After</h4>
                            <p className="text-sm text-parchment/70">Published author. Gained 2k+ followers. Published a solo chapbook. Now sees herself as both an engineer AND a poet.</p>
                        </div>
                    </div>
                </Card>
            </TabsContent>

            <TabsContent value="rohan" className="mt-0 outline-none animate-in fade-in slide-in-from-left-4">
                <Card className="bg-ink-900/50 border-white/10 p-6 md:p-8 backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                        <div className="w-20 h-20 rounded-full bg-white/10 shrink-0 flex items-center justify-center border border-white/20">
                            <Briefcase className="w-8 h-8 text-gold" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-serif text-gold">The Burnout Professional</h3>
                            <p className="text-parchment/60 italic">"I was successful but completely numb."</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="p-4 bg-white/5 rounded-lg border-l-2 border-red-500/50">
                            <h4 className="font-bold text-parchment mb-1">Before</h4>
                            <p className="text-sm text-parchment/70">IT professional. Writing stopped after college. Felt like a machine going through motions.</p>
                        </div>
                        <div className="p-4 bg-gold/10 rounded-lg border-l-2 border-gold">
                            <h4 className="font-bold text-parchment mb-1">The Shift</h4>
                            <p className="text-sm text-parchment/70">Resonated with "Love at Minus One" (frozen feelings). Used writing to reconnect with his emotions.</p>
                        </div>
                        <div className="p-4 bg-green-900/20 rounded-lg border-l-2 border-green-500/50">
                            <h4 className="font-bold text-parchment mb-1">After</h4>
                            <p className="text-sm text-parchment/70">3 anthology credits. Found a content strategy role. Reclaimed his creative identity without quitting his job.</p>
                        </div>
                    </div>
                </Card>
            </TabsContent>

            <TabsContent value="priya" className="mt-0 outline-none animate-in fade-in slide-in-from-left-4">
                <Card className="bg-ink-900/50 border-white/10 p-6 md:p-8 backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                        <div className="w-20 h-20 rounded-full bg-white/10 shrink-0 flex items-center justify-center border border-white/20">
                            <Clock className="w-8 h-8 text-gold" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-serif text-gold">The Serial "Almost"</h3>
                            <p className="text-parchment/60 italic">"I was tired of nearly making it."</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="p-4 bg-white/5 rounded-lg border-l-2 border-red-500/50">
                            <h4 className="font-bold text-parchment mb-1">Before</h4>
                            <p className="text-sm text-parchment/70">Finalist but never winner. "Under consideration" forever. Cynical about submission calls.</p>
                        </div>
                        <div className="p-4 bg-gold/10 rounded-lg border-l-2 border-gold">
                            <h4 className="font-bold text-parchment mb-1">The Shift</h4>
                            <p className="text-sm text-parchment/70">Stopped writing to please. Wrote with anger and honesty about being a "backup plan."</p>
                        </div>
                        <div className="p-4 bg-green-900/20 rounded-lg border-l-2 border-green-500/50">
                            <h4 className="font-bold text-parchment mb-1">After</h4>
                            <p className="text-sm text-parchment/70">Acceptance ended the drought. Learned resilience. Now working on a full-length collection.</p>
                        </div>
                    </div>
                </Card>
            </TabsContent>

            <TabsContent value="kabir" className="mt-0 outline-none animate-in fade-in slide-in-from-left-4">
                <Card className="bg-ink-900/50 border-white/10 p-6 md:p-8 backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                        <div className="w-20 h-20 rounded-full bg-white/10 shrink-0 flex items-center justify-center border border-white/20">
                            <User className="w-8 h-8 text-gold" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-serif text-gold">The Late Bloomer</h3>
                            <p className="text-parchment/60 italic">"I started writing at 31. I thought I was too old."</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="p-4 bg-white/5 rounded-lg border-l-2 border-red-500/50">
                            <h4 className="font-bold text-parchment mb-1">Before</h4>
                            <p className="text-sm text-parchment/70">Academic critic. Divorced. Thinking poetry was a young person's game.</p>
                        </div>
                        <div className="p-4 bg-gold/10 rounded-lg border-l-2 border-gold">
                            <h4 className="font-bold text-parchment mb-1">The Shift</h4>
                            <p className="text-sm text-parchment/70">Submitted anonymously. Found that "starting late" meant starting when he actually had something to say.</p>
                        </div>
                        <div className="p-4 bg-green-900/20 rounded-lg border-l-2 border-green-500/50">
                            <h4 className="font-bold text-parchment mb-1">After</h4>
                            <p className="text-sm text-parchment/70">Accepted into mentorship. Publishing first collection at 35. Realized there is no deadline.</p>
                        </div>
                    </div>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
);

const InteractiveChecklist = () => {
    const [checked, setChecked] = useState<Record<string, boolean>>({});

    const toggle = (id: string) => {
        setChecked(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const items = [
        { id: "d6", day: "Day 6", title: "Cliché Elimination", desc: "Circled every cliché and replaced it with a specific detail." },
        { id: "d7", day: "Day 7", title: "Tightening & Structure", desc: "Read aloud, cut weak words, fixed line breaks." },
        { id: "d8", day: "Day 8", title: "Final Polish", desc: "Tested 3 openings/endings. Final typo check." },
    ];

    return (
        <div className="space-y-4 my-8">
            {items.map(item => (
                <div
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    className={`flex gap-4 p-4 rounded-xl border transition-all cursor-pointer group ${checked[item.id] ? 'bg-green-900/20 border-green-500/50' : 'bg-white/5 border-white/5 hover:border-gold/30'}`}
                >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${checked[item.id] ? 'bg-green-500 text-ink-black' : 'bg-gold/10 text-gold group-hover:bg-gold group-hover:text-ink-black'}`}>
                        {checked[item.id] ? <CheckCircle2 className="w-6 h-6" /> : item.day}
                    </div>
                    <div>
                        <h4 className={`text-lg font-bold transition-colors ${checked[item.id] ? 'text-green-400' : 'text-parchment'}`}>
                            {item.title}
                        </h4>
                        <p className={`text-sm mt-1 transition-colors ${checked[item.id] ? 'text-parchment/60 line-through' : 'text-parchment/70'}`}>
                            {item.desc}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

// --- Chapter 1 Components ---

const LinguisticDualism = () => (
    <div className="my-16 relative">
        <h3 className="text-2xl font-serif text-center mb-8 text-parchment">The Linguistic Layering System</h3>
        <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden border border-white/10 shadow-2xl group">
            <img src="/images/linguistic_layering.png" alt="Linguistic Layering System" className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col md:flex-row gap-6 justify-between items-end">
                <div className="md:w-1/3 p-4 bg-blue-950/40 backdrop-blur-md rounded-lg border border-blue-500/20">
                    <h4 className="text-blue-300 font-bold mb-2 flex items-center gap-2"><Brain className="w-4 h-4" /> English Carries</h4>
                    <p className="text-xs text-parchment/80">Intellectual distance. Therapy speak. The buffer we need to analyze pain (Anxiety, Dread, Burnout).</p>
                </div>

                <div className="md:w-1/3 p-4 bg-orange-950/40 backdrop-blur-md rounded-lg border border-orange-500/20 text-right">
                    <h4 className="text-orange-300 font-bold mb-2 flex items-center gap-2 justify-end">Hindi/Urdu Carries <Heart className="w-4 h-4" /></h4>
                    <p className="text-xs text-parchment/80">Vulnerability. embodied weight. Cultural memory. (Dil, Rooh, Jaan). The raw wound itself.</p>
                </div>
            </div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="bg-ink-black/80 backdrop-blur px-6 py-3 rounded-full border border-purple-500/50 text-purple-200 font-serif text-lg glow-text">
                    The Spark: Hinglish
                </div>
            </div>
        </div>
    </div>
);

const PoetryEvolution = () => {
    const [step, setStep] = useState(1);

    return (
        <div className="my-16 bg-ink-900/30 border border-white/5 rounded-xl overflow-hidden backdrop-blur-sm">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-xl font-serif text-parchment">Evolution of a Verse</h3>
                <div className="flex gap-2">
                    {[1, 2, 3].map(i => (
                        <button
                            key={i}
                            onClick={() => setStep(i)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step === i ? 'bg-gold text-ink-black scale-110' : 'bg-white/5 text-parchment/50 hover:bg-white/10'}`}
                        >
                            {i}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-8 md:p-12 min-h-[300px] flex items-center justify-center relative">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="bg-blue-900/10 border border-blue-500/20 p-8 rounded-lg max-w-md w-full"
                        >
                            <span className="text-blue-400 text-xs uppercase tracking-widest mb-4 block">Version 1: English Only</span>
                            <p className="font-serif text-xl leading-relaxed text-parchment/80 italic">
                                "I miss you<br />
                                But I know you're not coming back"
                            </p>
                            <p className="mt-6 text-sm text-blue-300/60 border-t border-blue-500/10 pt-4">
                                <span className="font-bold">Critique:</span> Relatable but flat. "Miss you" is overused. It states the fact but hides the feeling.
                            </p>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="bg-orange-900/10 border border-orange-500/20 p-8 rounded-lg max-w-md w-full"
                        >
                            <span className="text-orange-400 text-xs uppercase tracking-widest mb-4 block">Version 2: Hindi Only</span>
                            <p className="font-serif text-xl leading-relaxed text-parchment/80 italic">
                                "Main tumhein yaad karta hoon<br />
                                Par jaanta hoon tum laut ke nahi aaoge"
                            </p>
                            <p className="mt-6 text-sm text-orange-300/60 border-t border-orange-500/10 pt-4">
                                <span className="font-bold">Critique:</span> Pure and heavy. But for a modern reader, it might feel too traditional or 'filmy' if not grounded.
                            </p>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-gradient-to-br from-purple-900/20 to-gold/10 border border-purple-500/30 p-8 rounded-lg max-w-lg w-full relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-2 opacity-50">
                                <img src="/images/code_switch.png" alt="Ink Pen" className="w-24 h-24 object-contain opacity-30 mask-image-gradient" />
                            </div>
                            <span className="text-gold text-xs uppercase tracking-widest mb-4 block flex items-center gap-2"><Sparkles className="w-3 h-3" /> The Hinglish Advantage</span>
                            <p className="font-serif text-xl leading-relaxed text-parchment italic relative z-10">
                                "I pretend I'm fine at work,<br />
                                Smiling through meetings like everything's normal.<br />
                                But <span className="text-gold">har subah</span> when I wake up,<br />
                                <span className="text-gold">Tumhari yaad</span> hits different<br />
                                Like muscle memory of a life<br />
                                I'm trying to convince myself I never had."
                            </p>
                            <p className="mt-6 text-sm text-parchment/60 border-t border-white/10 pt-4 relative z-10">
                                <span className="font-bold text-gold">Why it wins:</span> English sets the mask ("meetings"). Hindi exposes the wound ("har subah"). The code-switch enacts the emotional shift on the reader's brain.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const MythBusterTimeline = () => (
    <div className="my-16">
        <h3 className="text-2xl font-serif text-center mb-12 text-parchment">Cultural Permission: Dispelling the 'Purity' Myth</h3>
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 space-y-4">
                <Card className="bg-ink-900/40 border-white/5 p-6 hover:bg-white/5 transition-colors cursor-default group">
                    <h4 className="text-lg font-bold text-parchment/80 mb-2 group-hover:text-gold transition-colors">1. The Colonial Hangover</h4>
                    <p className="text-sm text-parchment/60">"Purity is sophistication." The Empire needed us to believe our natural bilingualism was a defect. It was never about grammar; it was about control.</p>
                </Card>

                <Card className="bg-ink-900/40 border-white/5 p-6 hover:bg-white/5 transition-colors cursor-default group">
                    <h4 className="text-lg font-bold text-parchment/80 mb-2 group-hover:text-gold transition-colors">2. The Nationalist Trap</h4>
                    <p className="text-sm text-parchment/60">"Real Indians speak one language." False. Amir Khusro mixed Persian and Braj. Ghalib code-switched. You are the heir to a multilingual lineage.</p>
                </Card>

                <Card className="bg-ink-900/40 border-gold/20 p-6 bg-gradient-to-r from-ink-900 to-purple-900/20 shadow-lg glow-border">
                    <h4 className="text-lg font-bold text-gold mb-2 flex items-center gap-2"><Smartphone className="w-5 h-5" /> 3. The Instagram Revolution</h4>
                    <p className="text-sm text-parchment/80">The audience voted with their likes. "Finally someone writes like I think." Hinglish isn't broken English; it's the authentic sound of our consciousness.</p>
                </Card>
            </div>

            <div className="order-1 md:order-2 relative h-[500px] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                <img src="/images/history_timeline.png" alt="History of Expression" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-l from-ink-900/20 to-transparent" />
            </div>
        </div>
    </div>
);

const EmotionalDiagnosisMap = () => (
    <div className="my-16 bg-white/5 border border-white/10 rounded-xl p-8 md:p-12">
        <div className="text-center mb-10">
            <h3 className="text-3xl font-serif text-parchment mb-4">'Love at Minus One' Framework</h3>
            <p className="text-parchment/70 max-w-2xl mx-auto">Why bilingualism is the perfect tool for "almost relationships".</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="bg-ink-black/40 p-6 rounded-lg text-center border border-white/5">
                <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                    <Zap className="w-8 h-8 text-blue-400" />
                </div>
                <h4 className="text-lg font-bold text-blue-400 mb-2">The Diagnosis (English)</h4>
                <p className="text-sm text-parchment/60 mb-6 font-mono">"Emotionally Unavailable"<br />"Situationship"<br />"Commitment Issues"</p>
                <p className="text-xs text-parchment/40 italic">Clinical. Distant. Therapy speak.</p>
            </div>

            <div className="bg-ink-black/40 p-6 rounded-lg text-center border border-gold/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gold/5 animate-pulse" />
                <div className="relative z-10 basic-fade-in">
                    <div className="w-16 h-16 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-4">
                        <Heart className="w-8 h-8 text-gold" />
                    </div>
                    <h4 className="text-lg font-bold text-gold mb-2">The Feeling (Hinglish)</h4>
                    <p className="text-sm text-parchment mb-6 font-serif leading-relaxed">
                        "Tum ho, par nahi ho."<br />
                        "Ek ummeed jo mar nahi sakti."<br />
                        "Close enough to hurt, far enough to never heal."
                    </p>
                    <p className="text-xs text-parchment/60 italic">Resonant. Paradoxical. Accurate.</p>
                </div>
            </div>
        </div>

        <div className="mt-8 text-center">
            <p className="text-parchment/80 italic text-lg">
                Your bilingual voice isn't a limitation. It's the only way to capture the "Minus One" state.
            </p>
        </div>
    </div>
);

// --- Section Components ---

const chapters = [
    { id: 'hero', title: 'Start', days: 'Intro', icon: <Star className="w-4 h-4" /> },
    { id: 'chapter-1', title: 'Chapter 1: The Bilingual Mind', days: 'Psychology', icon: <Brain className="w-4 h-4" /> },
    { id: 'chapter-2', title: 'Chapter 2: 7 Techniques', days: 'Toolkit', icon: <PenTool className="w-4 h-4" /> },
    { id: 'chapter-3', title: 'Chapter 3: Grammar', days: 'Rules', icon: <Scale className="w-4 h-4" /> },
    { id: 'chapter-4', title: 'Chapter 4: Publishing', days: 'Career', icon: <Crown className="w-4 h-4" /> },
    { id: 'chapter-5', title: 'Chapter 5: Optimization', days: 'Phase O', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'chapter-6', title: 'Chapter 6: Case Studies', days: 'Examples', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'chapter-7', title: 'Chapter 7: Nuance Bible', days: 'Reference', icon: <Book className="w-4 h-4" /> },
    { id: 'chapter-8', title: 'Chapter 8: Portfolio', days: 'Submission', icon: <FileText className="w-4 h-4" /> },
    { id: 'chapter-9', title: 'Chapter 9: The Mindset', days: 'Decolonize', icon: <Brain className="w-4 h-4" /> },
    { id: 'chapter-10', title: 'Chapter 10: Action Plan', days: 'Execute', icon: <Calendar className="w-4 h-4" /> },
    { id: 'chapter-11', title: 'Chapter 11: Money Talk', days: 'Revenue', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'chapter-12', title: 'Chapter 12: Invitation', days: 'Closing', icon: <DoorOpen className="w-4 h-4" /> },
    { id: 'bonus', title: 'Bonus & Tools', days: 'Toolkit', icon: <Sparkles className="w-4 h-4" /> },
];

const DesktopSidebar = ({ activeChapter, showSidebar }: { activeChapter: string, showSidebar: boolean }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: showSidebar ? 1 : 0, x: showSidebar ? 0 : -50 }}
            className="fixed left-6 top-28 bottom-8 z-50 hidden xl:flex flex-col gap-2 pointer-events-none"
        >
            <div className={`bg-ink-900/95 backdrop-blur-xl p-4 rounded-xl border border-white/10 shadow-2xl w-72 transition-all duration-500 pointer-events-auto gold-scrollbar overflow-y-auto ${showSidebar ? 'translate-x-0' : '-translate-x-10'}`}>
                <h4 className="text-gold font-serif mb-4 text-xs uppercase tracking-[0.2em] pl-1 border-b border-white/5 pb-3 sticky top-0 bg-ink-900/95 backdrop-blur-md z-20">
                    The Framework
                </h4>
                <div className="space-y-0.5 relative">
                    {/* Active Indicator Line */}
                    <div className="absolute left-[11px] top-2 bottom-2 w-px bg-white/5" />

                    {chapters.map((chapter) => {
                        const isActive = activeChapter === chapter.id;
                        // Parse title: "Chapter 1: The Reality Check" -> ["Chapter 1", "The Reality Check"]
                        // Some titles might not have colon, handle safely.
                        const parts = chapter.title.includes(': ') ? chapter.title.split(': ') : ['', chapter.title];
                        const chapterNum = parts[0];
                        const chapterName = parts[1];

                        return (
                            <a
                                key={chapter.id}
                                href={`#${chapter.id}`}
                                className={`relative flex items-center group py-2 pl-1 ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-80'}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById(chapter.id)?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                {/* Dot Indicator */}
                                <div className={`w-1.5 h-1.5 rounded-full mr-4 z-10 transition-all duration-300 ${isActive ? 'bg-gold scale-125 shadow-[0_0_8px_rgba(197,160,89,0.8)]' : 'bg-parchment/30 group-hover:bg-parchment/70'}`} />

                                <div className="flex flex-col">
                                    {chapterNum && <span className="text-[10px] uppercase tracking-widest text-gold/80 mb-0.5 font-sans">{chapterNum}</span>}
                                    <span className={`text-sm font-serif leading-tight transition-colors ${isActive ? 'text-parchment' : 'text-parchment/80'}`}>{chapterName || chapterNum}</span>
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
        <div className="fixed bottom-6 left-6 z-50 md:hidden">
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
                                        <span className="truncate">{chapter.title.split(': ')[1] || chapter.title}</span>
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
        </div>
    );
};

const HeroSection = ({ activeChapter, showSidebar }: { activeChapter: string, showSidebar: boolean }) => {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="relative min-h-[60vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden">


            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://i.ibb.co/s9NHy7dQ/Gemini-Generated-Image-etbpx7etbpx7etb.jpg"
                    alt="The Bilingual Poet's Advantage - Inkfetish Signature Series"
                    className="w-full h-full object-cover object-center"
                />
                {/* Subtle dark overlay to reduce raw brightness */}
                <div className="absolute inset-0 bg-black/20" />

                {/* Seamless fade to background color at the bottom */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-ink-black" />
            </div>

            <DesktopSidebar activeChapter={activeChapter} showSidebar={showSidebar} />
            <MobileCompactNav activeChapter={activeChapter} />

            {/* Content - Button Only, shifted down */}
            <div className="relative z-10 w-full max-w-4xl px-6 text-center mt-[35vh] sm:mt-[40vh]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <Button
                        size="lg"
                        className="bg-gold/90 text-ink-900 font-bold text-lg px-10 py-7 rounded-full hover:bg-white hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,215,0,0.4)] border-2 border-gold backdrop-blur-sm"
                        onClick={() => scrollToSection('chapter-1')}
                    >
                        Start Reading <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <p className="mt-6 text-xs uppercase tracking-[0.3em] text-gold font-bold drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
                        Made by Inkfetish
                    </p>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
            >
                <ChevronDown className="w-8 h-8" />
            </motion.div>
        </header>
    );
};

const ThreeDoorsSection = () => {
    const [activeDoor, setActiveDoor] = useState<number | null>(null);

    const doors = [
        {
            id: 1,
            name: "Traditional Publishing",
            icon: <BookOpen className="w-8 h-8" />,
            desc: "The prestigious path. Literary agents, big houses. High prestige, but extremely low acceptance rates for new poets.",
            color: "border-parchment/20"
        },
        {
            id: 2,
            name: "Solo Self-Publishing",
            icon: <PenTool className="w-8 h-8" />,
            desc: "Maximum control. You hire editors, designers, and print it yourself. High cost (₹20k+) and high risk for beginners.",
            color: "border-parchment/20"
        },
        {
            id: 3,
            name: "Co-Author Anthologies",
            icon: <Users className="w-8 h-8" />,
            desc: "The smart first step. Shared costs (approx ₹400), legitimate ISBN, community support. Perfect for building momentum.",
            color: "border-gold shadow-[0_0_30px_rgba(197,160,89,0.2)] bg-gold/5" // Highlighted
        }
    ];

    return (
        <section className="py-24 md:py-32 bg-ink-black relative border-y border-white/5 scroll-mt-20">
            <div className="container px-6 mx-auto">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
                    <div className="w-full lg:w-1/2">
                        <Badge className="mb-6 bg-parchment/10 text-parchment hover:bg-parchment/20 border-parchment/20">Chapter 2</Badge>
                        <h2 className="text-4xl md:text-5xl font-serif text-parchment mb-6 leading-tight">The Three Doors <br /> <span className="text-gold italic">Of Publishing</span></h2>
                        <p className="text-parchment/60 text-lg leading-relaxed mb-8">
                            Imagine you're standing in a hallway. There are three ways to become a published author. Most poets get stuck because they don't understand which door is the right strategic move for <em>now</em>.
                        </p>
                        <div className="bg-ink-900/50 p-6 rounded-xl border border-white/5 backdrop-blur-sm relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gold/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            <p className="italic text-gold/80 relative z-10 font-serif text-lg">
                                "Walking through the anthology door first doesn't close the others. It gives you the credentials to open them later."
                            </p>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 relative h-[600px] flex items-center justify-center">
                        {/* Illustration Background */}
                        <div className="absolute inset-0 bg-[url('/images/three_doors.png')] bg-contain bg-center bg-no-repeat opacity-40 mix-blend-screen pointer-events-none" />

                        {/* Interactive Hotspots / Cards */}
                        <div className="relative z-10 flex flex-col gap-4 w-full max-w-md">
                            {doors.map((door) => (
                                <motion.div
                                    key={door.id}
                                    className={`p-6 rounded-xl border backdrop-blur-md cursor-pointer transition-all duration-300 ${activeDoor === door.id ? 'bg-ink-black/90 border-gold scale-105 shadow-[0_0_30px_rgba(197,160,89,0.15)] ring-1 ring-gold/50' : 'bg-ink-black/60 ' + door.color + ' hover:bg-ink-black/80 hover:border-parchment/40'}`}
                                    onClick={() => setActiveDoor(door.id === activeDoor ? null : door.id)}
                                    whileHover={{ x: 5 }}
                                >
                                    <div className="flex items-start gap-5">
                                        <div className={`mt-1 p-3 rounded-lg ${door.id === 3 ? 'bg-gold/20 text-gold' : 'bg-white/5 text-parchment'}`}>
                                            {door.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-1">
                                                <h3 className={`text-xl font-bold ${door.id === 3 ? 'text-gold' : 'text-parchment'}`}>{door.name}</h3>
                                                {activeDoor === door.id ? <DoorOpen className="w-4 h-4 text-gold" /> : (door.id === 3 && <Sparkles className="w-4 h-4 text-gold animate-pulse" />)}
                                            </div>
                                            <AnimatePresence mode="wait">
                                                {(activeDoor === door.id || window.innerWidth >= 1024) && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <p className="text-parchment/60 text-sm mt-2 leading-relaxed border-t border-white/5 pt-2">
                                                            {door.desc}
                                                        </p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const OptimizationSlider = () => {
    const [sliderValue, setSliderValue] = useState(50);

    const opacityBad = Math.max(0, (50 - sliderValue) / 50);
    const opacityGood = Math.max(0, (sliderValue - 50) / 50);

    // Calculate clip path content based on slider
    // We'll overlay two divs and clip them

    return (
        <section className="py-32 bg-ink-black relative border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <Badge variant="outline" className="mb-4 border-gold/40 text-gold">Phase O: Optimize</Badge>
                        <h2 className="text-4xl font-serif text-parchment mb-6">From Cliché to Crystal</h2>
                        <p className="text-parchment/60 text-lg leading-relaxed mb-8">
                            Instagram poetry allows for vagueness. Printed poetry demands precision.
                            See the difference between a "first draft" and an "anthology-ready" poem.
                        </p>

                        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                            <h4 className="flex items-center gap-2 text-gold font-bold mb-4">
                                <Sparkles className="w-5 h-5" /> The Upgrade Checklist
                            </h4>
                            <ul className="space-y-3 text-parchment/70 text-sm">
                                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500/70" /> Replace clichés ("broken heart") with specific images.</li>
                                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500/70" /> Tighten rhythm. Remove unnecessary "maybe"s.</li>
                                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500/70" /> End on an image, not an explanation.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="relative w-full max-w-md mx-auto aspect-[3/4] bg-[#F5F0E1] text-ink-black rounded-lg shadow-2xl overflow-hidden p-8 font-serif leading-relaxed">
                        {/* Background Texture */}
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] pointer-events-none" />

                        <div className="relative z-10 h-full">
                            {/* Comparison Logic using overlapping absolute divs */}

                            {/* BAD VERSION (Visible on Left drag) */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-center" style={{ opacity: Math.max(0, 1 - sliderValue / 100 * 2) }}>
                                <h3 className="text-center text-sm uppercase tracking-widest text-red-800/50 mb-8 font-sans font-bold">The Draft</h3>
                                <p className="mb-4">sometimes i think about us<br />and how we were almost something<br />but not quite</p>
                                <p className="mb-4">you were like summer<br />warm and bright<br />but summer always ends</p>
                                <p className="mb-4 italic text-red-900/60 text-sm">(Clichéd metaphor...)</p>
                                <p>and now you're gone<br />and i'm cold and empty<br />missing the warmth.</p>
                            </div>

                            {/* GOOD VERSION (Visible on Right drag) */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-center" style={{ opacity: Math.max(0, (sliderValue / 100 * 2) - 1) }}>
                                <h3 className="text-center text-sm uppercase tracking-widest text-gold/80 mb-8 font-sans font-bold">Anthology Ready</h3>
                                <p className="mb-4">Three times you said you'd call back.<br />I memorized the pattern: the way you'd<br />brighten when we were alone, then cool</p>
                                <p className="mb-4">the second your phone buzzed.<br />July was full of almosts-your hand<br />hovering near mine in the theater dark,<br />never quite landing. August, you stopped<br />pretending to try.</p>
                                <p>Now it's December. I still can't wear<br />yellow without seeing your shirt<br />against my apartment wall.</p>
                            </div>

                            {/* Overlay Controls */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <Slider
                                    defaultValue={[0]}
                                    max={100}
                                    step={1}
                                    value={[sliderValue]}
                                    onValueChange={(val) => setSliderValue(val[0])}
                                    className="cursor-pointer"
                                />
                                <div className="flex justify-between text-xs text-ink-black/40 mt-2 font-sans font-bold uppercase tracking-widest">
                                    <span>Draft</span>
                                    <span>Polished</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const TimelineSection = () => {
    const days = [
        { day: 1, title: "Gathering & Inventory", m: "Collect last 6-12 months of poems. No judgment yet.", a: "Study 'Love at Minus One' theme. Connect it to your life.", e: "Filter for thematic alignment. Pick 5-7 candidates." },
        { day: 2, title: "Scoring & Evaluation", m: "Review the 7-Point Scorecard dimensions.", a: "Score each candidate poem 1-5. Be honest.", e: "Select primary candidate. Read aloud 3 times." },
        { day: 3, title: "Rough Alignment Check", m: "Stress-test for 'Frozen Feelings' theme fit.", a: "Decide: Optimize existing or Draft fresh?", e: "If drafting fresh: Brainstorm 3 starting angles." },
        { day: 4, title: "Drafting or Rest", m: "Drafting: Write freely. Focus on emotional truth.", a: "Read draft aloud. Note weak spots.", e: "Drafting: Try a retention edit. Others: Read inspiring poetry." },
        { day: 5, title: "Final Selection", m: "Compare fresh draft vs original candidate. Choose one.", a: "Print/Write it on fresh paper. This is The Poem.", e: "Read aloud. Mental notes only. No editing yet." },
        { day: 6, title: "Cliché Elimination (Phase O)", m: "Circle every vague phrase or cliché.", a: "Replace with specific, personal details.", e: "Type up Draft 2." },
        { day: 7, title: "Tightening & Structure", m: "Read slow. Mark stumbles or bored spots.", a: "Cut the fluff. Remove weak qualifiers.", e: "Check line breaks. Create intentional emphasis. Draft 3." },
        { day: 8, title: "Polish & Perfect", m: "Write 3 alternative opening lines. Pick best.", a: "Write 3 alternative endings. Pick best.", e: "Final polish. Check typos. 'Final Draft' ready." },
        { day: 9, title: "Research & Vetting (Phase E)", m: "Research the anthology. Check socials/guidelines.", a: "Apply Red/Green Flag test.", e: "Decide: Submit here or find alternative." },
        { day: 10, title: "Submission Prep", m: "Format document (Font, Name, Contact).", a: "Write 2-3 sentence bio ('Meera is...').", e: "Prepare payment method. Check deadline." },
        { day: 11, title: "Submission Day", m: "Final read. Trust your work.", a: "Submit! Pay, Email, Confirm.", e: "Save receipt. Let it go. Celebrate." },
        { day: 12, title: "Identity Activation (Phase T)", m: "Draft new 'Published Poet' bios.", a: "Draft your announcement post + caption.", e: "List 5 people to share news with first." },
        { day: 13, title: "Community Connection", m: "Follow anthology & co-authors.", a: "Engage with 5 poets you admire.", e: "Envision your future writing circle." },
        { day: 14, title: "Momentum Planning", m: "Find 3 future submission targets.", a: "Set 2-3 goals for next 6 months.", e: "Commit to a sustainable writing schedule." },
        { day: 15, title: "Reflection & Commitment", m: "Journal: What did I learn?", a: "Acknowledge the shift: Aspiring -> Submitted.", e: "Write your 'I Am A Poet' manifesto." }
    ];

    return (
        <section className="py-20 bg-ink-black relative">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl md:text-5xl font-serif text-parchment text-center mb-16">Your 15-Day Roadmap</h2>

                <div className="max-w-4xl mx-auto relative">
                    {/* Vertical Line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />

                    {days.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className={`flex flex-col md:flex-row gap-8 mb-12 relative ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Center Node */}
                            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-ink-black border-2 border-gold z-10 mt-6 shadow-[0_0_10px_rgba(255,215,0,0.5)]">
                                <div className="absolute inset-0 bg-gold/50 rounded-full animate-ping opacity-20" />
                            </div>

                            {/* Content Side */}
                            <div className="md:w-1/2 pl-16 md:pl-0 md:px-12">
                                <Card className="bg-ink-900/80 border-white/10 p-6 hover:border-gold/30 transition-all hover:shadow-[0_0_20px_rgba(255,215,0,0.05)] group">
                                    <div className="flex items-center gap-4 mb-4 border-b border-white/5 pb-4">
                                        <span className="text-4xl font-serif text-white/5 font-bold absolute top-4 right-6 group-hover:text-gold/10 transition-colors">
                                            {item.day}
                                        </span>
                                        <h3 className="text-xl font-bold text-gold">{item.title}</h3>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex gap-3 items-start">
                                            <Sun className="w-4 h-4 text-orange-400 mt-1 shrink-0" />
                                            <p className="text-sm text-parchment/80"><span className="text-orange-400/50 uppercase text-[10px] font-bold tracking-wider mr-2">Morning</span> {item.m}</p>
                                        </div>
                                        <div className="flex gap-3 items-start">
                                            <Sun className="w-4 h-4 text-yellow-200 mt-1 shrink-0" />
                                            <p className="text-sm text-parchment/80"><span className="text-yellow-200/50 uppercase text-[10px] font-bold tracking-wider mr-2">Afternoon</span> {item.a}</p>
                                        </div>
                                        <div className="flex gap-3 items-start">
                                            <Moon className="w-4 h-4 text-blue-300 mt-1 shrink-0" />
                                            <p className="text-sm text-parchment/80"><span className="text-blue-300/50 uppercase text-[10px] font-bold tracking-wider mr-2">Evening</span> {item.e}</p>
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            {/* Empty Side for Layout Balance */}
                            <div className="md:w-1/2 hidden md:block" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FooterCTA = () => (
    <section className="py-32 bg-gold/5 border-t border-gold/10 text-center relative overflow-hidden">
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-4xl md:text-5xl font-serif text-parchment mb-8">Ready to Start?</h2>
            <p className="text-lg text-parchment/60 max-w-xl mx-auto mb-10">
                The door is open. The map is in your hands. Join us in
                <em> Love at Minus One</em> or find your own path. Just begin.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="bg-gold text-ink-black hover:bg-gold/90 h-14 px-8 rounded-full text-lg font-bold">
                    Join Anthology
                </Button>
                <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/5 h-14 px-8 rounded-full text-lg">
                    Download Full Ebook
                </Button>
            </div>
        </div>
    </section>
)

// --- Chapter Text Component ---
const ChapterText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`max-w-3xl mx-auto px-6 leading-relaxed text-lg text-parchment/80 [&>p]:mb-6 [&>h2]:text-3xl [&>h2]:md:text-4xl [&>h2]:font-serif [&>h2]:text-parchment [&>h2]:mb-8 [&>h2]:mt-12 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-gold [&>h3]:mb-4 [&>h3]:mt-8 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>ul]:mb-6 ${className}`}>
        {children}
    </div>
);

const SectionDivider = () => (
    <div className="flex justify-center py-12 opacity-30">
        <Feather className="w-6 h-6 text-gold rotate-45" />
    </div>
);

const LoveAtMinusOneModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0F172A] border border-blue-200/20 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row"
                    >
                        {/* Winter/Frost Effect Background (Global) */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-0 left-0 w-full h-full opacity-30 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        </div>

                        {/* LEFT COLUMN: VISUALS (Book Cover) */}
                        <div className="md:w-2/5 relative p-4 md:p-8 flex flex-col items-center justify-center bg-blue-950/30 border-b md:border-b-0 md:border-r border-white/5 shrink-0">
                            {/* Blue Glow Background */}
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-50" />
                            <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl" />

                            {/* Book Cover Container */}
                            <div className="relative w-24 md:w-48 group cursor-pointer perspective-1000" onClick={() => window.open('/anthology/join', '_blank')}>
                                <div className="absolute inset-0 bg-gold/20 blur-2xl rounded-md group-hover:bg-gold/40 transition-all duration-500" />
                                <img
                                    src="/images/love-at-minus-one-cover.jpg"
                                    alt="Love at Minus One Book Cover"
                                    className="relative rounded-md shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border border-white/10 transform group-hover:scale-105 transition-transform duration-500 rotate-y-6 group-hover:rotate-y-0"
                                />
                            </div>
                            <p className="mt-3 text-[10px] uppercase tracking-widest text-slate-500 md:hidden">
                                Tap to view
                            </p>
                        </div>

                        {/* RIGHT COLUMN: CONTENT */}
                        <div className="md:w-3/5 relative flex flex-col min-h-0 bg-[#0F172A]">
                            {/* Close Button - Fixed to corner of container */}
                            <button
                                onClick={onClose}
                                className="absolute top-3 right-3 p-2 bg-black/20 hover:bg-black/40 rounded-full text-slate-400 hover:text-white transition-colors z-20 backdrop-blur-sm"
                            >
                                <XCircle className="w-6 h-6" />
                            </button>

                            {/* Scrollable Content Container */}
                            <div className="flex-1 overflow-y-auto p-5 md:p-10 text-center md:text-left no-scrollbar">
                                {/* Header */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <Badge className="bg-blue-900/50 text-blue-200 border-blue-500/30 mb-4 px-3 py-1 text-xs tracking-widest uppercase self-center md:self-start inline-flex">
                                        Official Invitation
                                    </Badge>

                                    <h2 className="text-xl md:text-2xl font-serif text-white mb-1 leading-tight">
                                        This Winter, we are launching...
                                    </h2>
                                    <h3 className="text-3xl md:text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-gold italic mb-1">
                                        Love at Minus One
                                    </h3>
                                    <div className="text-[10px] uppercase tracking-[0.4em] text-blue-200/50 font-sans mb-6">
                                        Anthology
                                    </div>
                                    <p className="text-sm text-blue-200/80 mb-6 font-medium">
                                        Your opportunity to become a <span className="text-white border-b border-gold/30">Published Co-Author</span>.
                                        <br />
                                        <span className="text-gold mt-1 block text-xs tracking-wider uppercase">Releasing First Week of February</span>
                                    </p>
                                </motion.div>

                                {/* Divider */}
                                <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mx-auto md:mx-0 my-6" />

                                {/* Social Proof Box */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-blue-900/20 border border-blue-500/10 rounded-xl p-3 md:p-4 mb-5 backdrop-blur-sm"
                                >
                                    <div className="flex flex-wrap justify-center md:justify-start gap-2 text-xs md:text-sm text-gold/90 font-medium mb-3">
                                        <span>💔 Love Breakups</span>
                                        <span>❄️ Situationships</span>
                                        <span>🧊 Unrequited</span>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="flex-1">
                                            <p className="text-sm text-left">
                                                <span className="text-gold font-bold">56 writers</span> joined.
                                            </p>
                                            <div className="w-full h-1.5 bg-blue-950 rounded-full mt-1.5 overflow-hidden">
                                                <div className="h-full bg-gold w-[28%] rounded-full" />
                                            </div>
                                            <p className="text-[10px] text-blue-200/50 text-left mt-1">
                                                Only <strong className="text-white">68 spots</strong> left.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* CTA */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="pb-2"
                                >
                                    <Button
                                        onClick={() => window.open('/anthology/join', '_blank')}
                                        className="w-full bg-gradient-to-r from-gold to-[#B8860B] hover:from-white hover:to-white hover:text-ink-900 text-ink-900 font-bold py-3 md:py-6 text-base md:text-lg shadow-lg hover:shadow-gold/20 transition-all border border-gold/50 rounded-xl"
                                    >
                                        Yes, I want to be a Co-Author <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                                    </Button>
                                    <p className="mt-3 text-[9px] md:text-[10px] uppercase tracking-widest text-slate-500 text-center">
                                        Legitimate ISBN • Global Distribution
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const BilingualPoetAdvantage = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const [activeChapter, setActiveChapter] = useState('');
    const [showSidebar, setShowSidebar] = useState(false);

    // Define chapters for scroll spy
    const chapters = [
        { id: 'hero', title: 'Start', days: 'Intro', icon: <Star className="w-4 h-4" /> },
        { id: 'chapter-1', title: 'Chapter 1: The Bilingual Mind', days: 'Psychology', icon: <Brain className="w-4 h-4" /> },
        { id: 'chapter-2', title: 'Chapter 2: 7 Techniques', days: 'Toolkit', icon: <PenTool className="w-4 h-4" /> },
        { id: 'chapter-3', title: 'Chapter 3: Grammar', days: 'Rules', icon: <Scale className="w-4 h-4" /> },
        { id: 'chapter-4', title: 'Chapter 4: Publishing', days: 'Career', icon: <Crown className="w-4 h-4" /> },
        { id: 'chapter-5', title: 'Chapter 5: Optimization', days: 'Phase O', icon: <Sparkles className="w-4 h-4" /> },
        { id: 'chapter-6', title: 'Chapter 6: Case Studies', days: 'Examples', icon: <BookOpen className="w-4 h-4" /> },
        { id: 'chapter-7', title: 'Chapter 7: Nuance Bible', days: 'Reference', icon: <Book className="w-4 h-4" /> },
        { id: 'chapter-8', title: 'Chapter 8: Portfolio', days: 'Submission', icon: <FileText className="w-4 h-4" /> },
        { id: 'chapter-9', title: 'Chapter 9: The Mindset', days: 'Decolonize', icon: <Brain className="w-4 h-4" /> },
        { id: 'chapter-10', title: 'Chapter 10: Action Plan', days: 'Execute', icon: <Calendar className="w-4 h-4" /> },
        { id: 'chapter-11', title: 'Chapter 11: Money Talk', days: 'Revenue', icon: <DollarSign className="w-4 h-4" /> },
        { id: 'chapter-12', title: 'Chapter 12: Invitation', days: 'Closing', icon: <DoorOpen className="w-4 h-4" /> },
        { id: 'bonus', title: 'Bonus & Tools', days: 'Toolkit', icon: <Sparkles className="w-4 h-4" /> },
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight * 0.8) {
                setShowSidebar(true);
            } else {
                setShowSidebar(false);
            }

            // Scroll Spy Logic
            const sections = chapters.map(c => document.getElementById(c.id)).filter(Boolean);
            let current = '';
            for (const section of sections) {
                if (!section) continue;
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight / 2) {
                    current = section.id;
                } else {
                    break;
                }
            }
            if (!current && window.scrollY < 100) current = 'hero';
            setActiveChapter(current);
        };



        window.addEventListener('scroll', handleScroll);
        setTimeout(handleScroll, 100);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Upsell Modal Logic
    const [isUpsellOpen, setIsUpsellOpen] = useState(false);
    const [hasUpsellShown, setHasUpsellShown] = useState(false);

    useEffect(() => {
        if (activeChapter === 'chapter-3' && !hasUpsellShown) {
            setIsUpsellOpen(true);
            setHasUpsellShown(true);
        }
    }, [activeChapter, hasUpsellShown]);

    return (
        <div className="min-h-screen bg-ink-black text-parchment font-sans selection:bg-gold/30 overflow-x-hidden">
            <Helmet>
                <title>The Bilingual Poet's Advantage | Inkfetish</title>
                <meta name="description" content="The Psychology of Bilingual Expression: Why Hinglish Hits Different." />
            </Helmet>

            <LoveAtMinusOneModal isOpen={isUpsellOpen} onClose={() => setIsUpsellOpen(false)} />

            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gold origin-left z-50"
                style={{ scaleX }}
            />

            <DesktopSidebar activeChapter={activeChapter} showSidebar={showSidebar} />
            <MobileCompactNav activeChapter={activeChapter} />

            <main>
                <div id="hero">
                    <HeroSection activeChapter={activeChapter} showSidebar={showSidebar} />
                </div>

                <SectionDivider />

                <article className="pb-24">
                    <div id="chapter-1">
                        <ChapterText className="pt-20">
                            <span className="block text-center text-gold font-serif text-sm uppercase tracking-widest mb-4">Chapter 1</span>
                            <h2 className="text-center !mt-0">THE PSYCHOLOGY OF BILINGUAL EXPRESSION<br /><span className="text-2xl opacity-60">(Why Hinglish Hits Different)</span></h2>

                            <h3 className="text-center mb-8">THE SCIENCE OF CODE-SWITCHING POETRY</h3>
                            <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-gold first-letter:mr-3 first-letter:float-left">
                                When you switch languages mid-poem, something neurologically interesting happens in the reader's brain. It's not just stylistic - it's cognitive. The language switch signals: <em>'Pay attention. We're shifting emotional registers now.'</em>
                            </p>
                            <p>
                                Let me show you what I mean with a framework I call <strong>The Linguistic Layering System</strong>.
                            </p>
                        </ChapterText>
                    </div>

                    <div id="layering">
                        <ChapterText>
                            <LinguisticDualism />

                            <h3>What Hinglish Uniquely Allows:</h3>
                            <p>
                                Bilingual poetry lets you shift between intellectual analysis and raw feeling within the same breath. You can zoom out (English) and zoom in (Hindi). You can establish relatability (English) and then drop into cultural intimacy (Hindi).
                            </p>
                            <p>
                                You can say the unsayable - the things that only exist in the crack between languages. Let's look at a concrete example:
                            </p>
                        </ChapterText>
                    </div>

                    <div id="evolution">
                        <ChapterText>
                            <PoetryEvolution />
                        </ChapterText>
                    </div>

                    <div id="myths">
                        <ChapterText>
                            <h3 className="text-center">CULTURAL PERMISSION: DISPELLING THE 'PURITY' MYTH</h3>
                            <p>
                                Let's talk about why we think 'real' poetry must be in one pure language. Spoiler: it's colonial damage mixed with nationalist damage, and neither actually cares about poetry.
                            </p>
                            <MythBusterTimeline />
                            <p>
                                <strong>The Historical Truth:</strong> Indian literature has always been multilingual. Amir Khusro, the father of qawwali, mixed Persian, Hindi, and Braj Bhasha freely. Mirza Ghalib's ghazals code-switch between Urdu and Persian. Sant Kabir wrote in a hybrid of Hindi dialects. These are canonical literary giants, and they were linguistic rebels.
                            </p>
                            <p>
                                Even modern writers prove this: Salman Rushdie creates entirely new English words from Hindi roots. Jhumpa Lahiri uses Bengali and Hindi words without italics in <em>The Namesake</em>. Chetan Bhagat's commercial success partly comes from his Hinglish dialogue feeling authentic to young Indians.
                            </p>
                        </ChapterText>
                    </div>

                    {/* 'Love at Minus One' Framework section removed as per user request */}

                    <SectionDivider />

                    <div id="chapter-2">
                        <ChapterText className="pt-20">
                            <span className="block text-center text-gold font-serif text-sm uppercase tracking-widest mb-4">Chapter 2</span>
                            <h2 className="text-center !mt-0">THE 7 BILINGUAL TECHNIQUES THAT MAKE EDITORS SAY YES</h2>
                            <p className="text-center text-xl text-parchment/60 mb-12">Let me give you seven concrete methods I've seen consistently get bilingual poems accepted. These aren't theories - these are techniques you can use today.</p>

                            {/* TECHNIQUE 1 */}
                            <h3 className="text-gold border-b border-white/10 pb-4 mb-8">TECHNIQUE 1: THE OPENING HOOK SWITCHAROO</h3>
                            <p><strong>The Strategy:</strong> Start in one language to establish normalcy, then switch to the other in line 2-3 to create a 'double-take' effect that signals depth.</p>

                            <Technique1Switcharoo />

                            <p><strong>Why it works:</strong> Line 1 establishes the relatable situation in casual English. Line 2 reveals the lie by repeating it in Hindi - suddenly we're in private truth territory. The code-switch announces: 'What I say in public (English) versus what I know privately (Hindi) are different.' Lines 3-7 weave both languages to maintain that tension.</p>
                            <p><strong>When to use it:</strong> Perfect for poems about hiding feelings, internal conflict, or maintaining facades. Ideal for 'Love at Minus One' theme of emotional distance - showing the gap between what we show and what we feel.</p>
                            <div className="bg-white/5 p-4 rounded-lg text-sm text-parchment/70"><strong className="text-gold">Exercise:</strong> Take your last 'I'm fine' lie. Write it in English, then immediately after, write the Hindi truth your inner voice knew.</div>

                            {/* TECHNIQUE 2 */}
                            <h3 className="text-gold border-b border-white/10 pb-4 mb-8 mt-16">TECHNIQUE 2: THE UNTRANSLATABLE WORD TECHNIQUE</h3>
                            <p><strong>The Strategy:</strong> Build your poem around Hindi/Urdu words that have no direct English equivalent. These become emotional anchors that English simply can't replace.</p>

                            <Technique2Untranslatable />

                            <div className="my-8 pl-4 border-l border-gold/30">
                                <strong>Example poem:</strong><br />
                                We talk every day<br />
                                Good morning texts, goodnight calls,<br />
                                All the right words in all the right places.<br />
                                But there's a <span className="text-gold">khamoshi</span> between us now.<br />
                                Not silence. Something heavier.<br />
                                The sound of things we're both too scared to say<br />
                                Building walls in the spaces between words.<br /><br />

                                I feel the <span className="text-gold">dooriyan</span> growing.<br />
                                Not in miles. In meanings.<br />
                                You're here, but <span className="text-gold">viraha</span> sits in my chest<br />
                                Like you've already left.<br />
                                Like I'm practicing grief<br />
                                For a loss that hasn't happened yet.
                            </div>

                            <p><strong>Why this works:</strong> English sets the scene with relatable modern relationship behavior (texts, calls). Then Hindi words create emotional depth English can't touch. 'Khamoshi' isn't just silence - it's pregnant silence, loaded silence. 'Dooriyan' (plural) suggests multiple types of distance accumulating. 'Viraha' elevates generic missing into the register of classical poetry, suggesting this isn't just casual dating pain - it's archetypal separation grief.</p>
                            <p className="text-sm opacity-60"><strong>Common mistake:</strong> Don't italicize these words unless you're deliberately creating distance. If they're part of natural speech, leave them un-italicized. This treats bilingualism as normal, not foreign.</p>
                            <div className="bg-white/5 p-4 rounded-lg text-sm text-parchment/70"><strong className="text-gold">Exercise:</strong> Pick three words from the list above. Write three sentences using them, each switching from English to Hindi organically.</div>

                            {/* TECHNIQUE 3 */}
                            <h3 className="text-gold border-b border-white/10 pb-4 mb-8 mt-16">TECHNIQUE 3: THE REFRAIN ANCHOR</h3>
                            <p><strong>The Strategy:</strong> Use a Hindi/Urdu phrase as a recurring refrain that grounds the poem emotionally while English stanzas explore different angles.</p>
                            <ul className="list-disc pl-5 space-y-2 mb-6 opacity-80 text-sm">
                                <li>Stanza 1 (English exploration) → Hindi refrain</li>
                                <li>Stanza 2 (English exploration) → Same Hindi refrain</li>
                                <li>Stanza 3 (English/Hindi mix) → Hindi refrain with English translation</li>
                            </ul>

                            <Technique3Refrain />

                            <p><strong>Why it works:</strong> The refrain 'Kyun karte hain hum yeh' (Why do we do this?) becomes the poem's heartbeat. Each stanza circles the same question from different angles, but the Hindi refrain stays constant - suggesting this is an ancient question, asked by heartbroken people across generations. The final stanza translates it, giving non-Hindi readers access while maintaining the emotional primacy of Hindi.</p>
                            <p><strong>When to use it:</strong> Perfect for poems exploring repetitive patterns, cyclic behavior, or universal human tendencies. The refrain technique comes from traditional Indian poetry and ghazal forms.</p>
                            <div className="bg-white/5 p-4 rounded-lg text-sm text-parchment/70"><strong className="text-gold">Exercise:</strong> Think of a question you keep asking yourself about a relationship. Phrase it as a Hindi question (even simple Hindi works). Build three stanzas around it.</div>

                            {/* TECHNIQUE 4 */}
                            <h3 className="text-gold border-b border-white/10 pb-4 mb-8 mt-16">TECHNIQUE 4: THE CINEMATIC CODE-SWITCH</h3>
                            <p><strong>The Strategy:</strong> Write like a Bollywood scene-narration in English, dialogue/inner voice in Hindi (or vice versa). This creates a movie-like effect readers can visualize.</p>

                            <Technique4Cinematic />

                            <p><strong>Why it works:</strong> English narration gives us the observational, analytical outer layer - this is how we explain events. Hindi dialogue is raw, unfiltered truth - this is what we actually say in vulnerable moments. The contrast shows the gap between observation (English) and feeling (Hindi). The phrase 'Farak nahi padta ab' carries resignation that 'it doesn't matter' in English doesn't quite capture - there's a weariness in those Hindi words.</p>
                            <p><strong>When to use it:</strong> Excellent for dramatic moments, confrontations, or critical relationship conversations. Works beautifully for 'Love at Minus One' theme because it can capture the moment of freezing - the conversation where things crystallize into distance.</p>
                            <div className="bg-white/5 p-4 rounded-lg text-sm text-parchment/70"><strong className="text-gold">Exercise:</strong> Write about a difficult conversation. Narrate the scene in English but write the actual painful words spoken in Hindi.</div>

                            {/* TECHNIQUE 5 */}
                            <h3 className="text-gold border-b border-white/10 pb-4 mb-8 mt-16">TECHNIQUE 5: THE TRANSLATION BETRAYAL</h3>
                            <p><strong>The Strategy:</strong> Write a line in Hindi, then 'translate' it to English - but deliberately show something gets lost, commenting on the impossibility of direct translation.</p>

                            <Technique5Translation />

                            <div className="my-8 pl-4 border-l border-gold/30 italic text-parchment/80">
                                "Main theek hoon," I told my mother on the phone.<br />
                                Which technically translates to "I'm fine"<br />
                                But actually means: I'm functional enough<br />
                                To not fall apart in front of you.<br />
                                To keep my voice steady.<br />
                                To lie convincingly about whether I've eaten.<br /><br />
                                Some phrases lose their weight when translated.<br />
                                Like how "I'm okay" will never carry<br />
                                The same nahi hoon that sits in my throat,<br />
                                The "not quite" that English can't hold.
                            </div>

                            <p><strong>Why this works:</strong> The poem itself becomes meta-commentary on language and truth. By showing translation failing, you make a point about untranslatability - some emotional states only exist in specific languages. 'Theek hoon' vs 'I'm fine' seem equivalent, but the poem reveals they're not. This creates depth while being clever about bilingual linguistics.</p>
                            <p><strong>When to use it:</strong> Perfect for poems about miscommunication, things left unsaid, or the gap between appearance and reality. Also works for poems exploring cultural identity.</p>
                            <div className="bg-white/5 p-4 rounded-lg text-sm text-parchment/70"><strong className="text-gold">Exercise:</strong> Think of a Hindi phrase you use that doesn't quite translate. Write it, translate it, then explain what's lost.</div>

                            {/* TECHNIQUE 6 */}
                            <h3 className="text-gold border-b border-white/10 pb-4 mb-8 mt-16">TECHNIQUE 6: THE CULTURAL CALLBACK</h3>
                            <p><strong>The Strategy:</strong> Reference Hindi film songs, Urdu poetry traditions, or Indian cultural moments that carry emotional shorthand for Indian readers.</p>

                            <Technique6Cultural />

                            <div className="my-8 pl-4 border-l border-gold/30 italic text-parchment/80">
                                You left like a Bollywood interval<br />
                                Right when the story was getting good,<br />
                                Right before the big confession scene.<br />
                                But there was no 'Tum Hi Ho' playing in the background,<br />
                                No perfectly-timed rain sequence to make it poetic,<br />
                                Just a WhatsApp message: 'I think we should talk.'<br /><br />
                                And suddenly I'm the side character<br />
                                In my own love story,<br />
                                The friend who gets one sad song<br />
                                While the hero moves on to the next plot.
                            </div>

                            <p><strong>Why it works:</strong> Indian readers instantly get the Bollywood reference - the interval (intermission) that breaks the film at a cliffhanger. 'Tum Hi Ho' is an iconic romantic song, so invoking it creates ironic contrast (no soundtrack for this breakup). WhatsApp grounds it in reality - this is how actual modern breakups happen, not like films. The callback creates intimacy with Indian readers while being accessible enough for others to follow.</p>
                            <p className="text-sm opacity-60"><strong>Caution:</strong> Only use references that genuinely serve the emotion. Don't just namedrop Bollywood for 'Indian flavor' - use it when the metaphor is organic.</p>
                            <div className="bg-white/5 p-4 rounded-lg text-sm text-parchment/70"><strong className="text-gold">Exercise:</strong> Think of a Bollywood moment or Hindi song that captures a feeling you've had. Build a poem comparing your real experience to the cinematic version.</div>

                            {/* TECHNIQUE 7 */}
                            <h3 className="text-gold border-b border-white/10 pb-4 mb-8 mt-16">TECHNIQUE 7: THE BILINGUAL ENJAMBMENT</h3>
                            <p><strong>The Strategy:</strong> Break lines mid-thought across languages to create double meanings or emphasize the linguistic shift.</p>

                            <Technique7Enjambment />

                            <p><strong>Why it works:</strong> 'But you left in silence. / Khamoshi mein chale gaye' - the line break makes you pause before the Hindi, emphasizing the language shift. Then 'Khamoshi mein chale gaye' flows directly into 'Without even the courtesy,' creating a bilingual sentence that works in both languages simultaneously. The enjambment (running sentences across line breaks) creates rhythmic complexity while the bilingualism creates semantic richness.</p>
                            <p><strong>When to use it:</strong> Advanced technique for poets comfortable with line breaks. Great for creating musicality and emphasis through strategic pauses.</p>
                            <div className="bg-white/5 p-4 rounded-lg text-sm text-parchment/70"><strong className="text-gold">Exercise:</strong> Take an existing poem and try breaking lines differently, placing Hindi words at line beginnings or ends to change emphasis.</div>
                        </ChapterText>
                    </div>

                    <SectionDivider />

                    <div id="chapter-3">
                        <ChapterText className="pt-20">
                            <span className="block text-center text-gold font-serif text-sm uppercase tracking-widest mb-4">Chapter 3</span>
                            <h2 className="text-center !mt-0">THE GRAMMAR OF HINGLISH POETRY</h2>

                            <h3 className="text-gold border-b border-white/10 pb-4 mb-8">WHEN TO ITALICIZE (AND WHEN NOT TO)</h3>
                            <div className="space-y-4 mb-8">
                                <p><strong className="text-red-400">Old Rule (outdated):</strong> Italicize all non-English words to signal they're 'foreign.'</p>
                                <p><strong className="text-green-400">New Rule:</strong> Only italicize for deliberate emphasis or irony. If Hindi is part of natural speech, <strong className="text-parchment">DON'T</strong> italicize.</p>
                            </div>

                            <ItalicsGuide />

                            <div className="my-8 space-y-4 text-parchment/80">
                                <p><strong>When TO italicize:</strong></p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>For emphasis/irony: <em>Pyaar</em>, they called it. I called it self-destruction.</li>
                                    <li>For examining a phrase as object: What does '<em>I love you</em>' even mean if you only say it over text?</li>
                                    <li>For anthology submissions like 'Love at Minus One': Follow their specific guidelines, but generally, treat Hindi as integrated, not foreign.</li>
                                </ul>
                            </div>

                            <h3 className="text-gold border-b border-white/10 pb-4 mb-8 mt-16">SCRIPT-SWITCHING: WHEN TO USE DEVANAGARI</h3>
                            <ScriptDecisionTree />

                            <h3 className="text-gold border-b border-white/10 pb-4 mb-8 mt-16">THE 'TRANSLATION TAX': HOW MUCH CONTEXT TO PROVIDE</h3>
                            <p className="text-xl text-center text-parchment/60 italic mb-8">Balance is everything.</p>

                            <ContextScale />

                            <p className="mt-8"><strong>The Rule:</strong> Hindi should be surrounded by enough English that meaning is inferrable from context. Think of it like reading Shakespeare - you encounter archaic words but context helps you understand.</p>
                            <div className="bg-white/5 p-4 rounded-lg text-sm text-parchment/70 border-l-2 border-gold"><strong className="text-gold">Test:</strong> If someone who doesn't speak Hindi could still grasp 70-80% of your poem's meaning and emotion, you've balanced correctly.</div>
                        </ChapterText>
                    </div>

                    <SectionDivider />

                    <div id="chapter-4">
                        <ChapterText className="pt-20">
                            <span className="block text-center text-gold font-serif text-sm uppercase tracking-widest mb-4">Chapter 4</span>
                            <h2 className="text-center !mt-0">WHERE HINGLISH POETRY ACTUALLY GETS PUBLISHED</h2>

                            <h3 className="text-gold border-b border-white/10 pb-4 mb-8">THE ANTHOLOGY LANDSCAPE</h3>
                            <div className="bg-ink-900/30 p-6 rounded-xl border-l-4 border-gold mb-8">
                                <h4 className="text-xl font-bold text-parchment mb-2">'Love at Minus One' (Your Primary Opportunity)</h4>
                                <ul className="space-y-4 text-parchment/80">
                                    <li><strong>Theme:</strong> Love at minus one degree - emotional distance, frozen feelings, relationships that never quite start.</li>
                                    <li><strong>Why they welcome Hinglish:</strong> The theme aligns with the gap between English dating culture & Hindi vocabulary.</li>
                                </ul>
                            </div>
                            <AnthologyShowcase />
                            <h3 className="text-gold border-b border-white/10 pb-4 mb-8 mt-16">INSTAGRAM AS YOUR PORTFOLIO BUILDER</h3>
                            <InstagramStrategy />
                        </ChapterText>
                    </div>

                    <SectionDivider />

                    <div id="chapter-5">
                        <ChapterText className="pt-20">
                            <span className="block text-center text-gold font-serif text-sm uppercase tracking-widest mb-4">Chapter 5</span>
                            <h2 className="text-center !mt-0">PHASE O – OPTIMIZE YOUR POEM FOR PUBLICATION</h2>
                            <p className="text-lg text-parchment/80 mb-8">Potential is not the same as publication-ready. This phase is about closing the gap between Instagram poetry and anthology poetry.</p>

                            <h3 className="text-gold border-b border-white/10 pb-4 mb-8">AREA ONE: FROM CLICHÉ TO FRESH IMAGERY</h3>
                            <ClicheFlipper />

                            <h3 className="text-gold border-b border-white/10 pb-4 mb-8 mt-16">A BEFORE AND AFTER EXAMPLE</h3>
                            <BeforeAfterPoem />

                            <h3 className="text-gold border-b border-white/10 pb-4 mb-8 mt-16">YOUR THREE-DAY OPTIMIZATION CHECKLIST</h3>
                            <OptimizationChecklist />

                            <p className="text-xl text-center font-serif italic text-gold mt-12 mb-8">"If you can imagine it sitting in a book next to other skilled poets' work without embarrassment, then it's ready."</p>

                            <p className="font-bold mt-4 text-center">Let's move into Phase E: Enrollment.</p>
                        </ChapterText>
                    </div>

                    <SectionDivider />

                    <div id="chapter-6">
                        <ChapterText className="pt-20">
                            <span className="block text-center text-gold font-serif text-sm uppercase tracking-widest mb-4">Chapter 6</span>
                            <h2 className="text-center !mt-0">CASE STUDY BREAKDOWNS: POEMS THAT GOT PUBLISHED</h2>
                            <p className="text-lg text-parchment/80 mb-8">Theory is good. Proof is better. Let's look at three specific poems that broke through - Hinglish poems that got accepted into literary venues or went viral.</p>

                            <CaseStudies />

                            <div className="mt-12 bg-ink-900/50 p-6 rounded-xl border border-gold/20 text-center">
                                <h4 className="text-xl font-bold text-gold mb-4">The Common Thread</h4>
                                <p className="text-parchment/80">None of these poems use Hinglish just for "flavor." In every single case, the switch between languages <strong>does work that English alone could not do.</strong> That is the secret.</p>
                            </div>
                        </ChapterText>
                    </div>

                    <SectionDivider />

                    <div id="chapter-7">
                        <ChapterText className="pt-20">
                            <span className="block text-center text-gold font-serif text-sm uppercase tracking-widest mb-4">Chapter 7</span>
                            <h2 className="text-center !mt-0">THE CULTURAL NUANCE BIBLE: 50 ESSENTIAL WORDS</h2>
                            <p className="text-lg text-parchment/80 mb-8">I'm giving you a goldmine reference section. These are the Hindi/Urdu words that carry emotional weight English can't match. Use them strategically.</p>

                            <WordVault />

                            <h3 className="text-gold border-b border-white/10 pb-4 mb-8 mt-16">HOW TO USE THIS BIBLE</h3>
                            <UsageRecipe />
                        </ChapterText>
                    </div>

                    <SectionDivider />

                    <div id="chapter-8">
                        <ChapterText className="pt-20">
                            <span className="block text-center text-gold font-serif text-sm uppercase tracking-widest mb-4">Chapter 8</span>
                            <h2 className="text-center !mt-0">THE SUBMISSION PORTFOLIO: PREPARING 5 ANTHOLOGY-READY POEMS</h2>
                            <p className="text-lg text-parchment/80 mb-8">Don't submit random poems. Create a strategic portfolio that shows range while maintaining thematic coherence.</p>

                            <h3 className="text-gold border-b border-white/10 pb-4 mb-8">YOUR 'LOVE AT MINUS ONE' PORTFOLIO BLUEPRINT</h3>
                            <PortfolioBlueprint />

                            <h3 className="text-gold border-b border-white/10 pb-4 mb-8 mt-16">REVISION CHECKLIST (THE GATEKEEPER)</h3>
                            <RevisionChecklist />

                            <p className="text-xl text-center font-serif italic text-gold mt-12 mb-8">"Submission is not about luck. It's about preparation meeting opportunity."</p>

                            <p className="font-bold mt-4 text-center">Let's move into Phase T: Transformation.</p>
                        </ChapterText>
                    </div>

                    <SectionDivider />

                    <div id="chapter-9">
                        <ChapterText className="pt-20">
                            <span className="block text-center text-gold font-serif text-sm uppercase tracking-widest mb-4">Chapter 9</span>
                            ```html
                            <h3 className="text-gold border-b border-white/10 pb-4 mb-8 mt-16">IMPOSTER SYNDROME ANTIDOTES</h3>
                            <ImposterAntidotes />

                            <h3 className="text-gold border-b border-white/10 pb-4 mb-8 mt-16">YOUR OFFICIAL PERMISSION SLIP</h3>
                            <div className="mt-16 p-6 border border-gold/30 bg-ink-900/50 rounded-lg text-center">
                                <h3 className="text-xl font-serif text-gold mb-4">You Are Ready.</h3>
                                <p className="text-parchment/80 mb-6 font-serif italic">
                                    "Poetry is not about being perfect in one language. It is about being honest in all of them."
                                </p>
                                <p className="text-sm text-parchment/60 uppercase tracking-widest">
                                    End of Volume 1
                                </p>
                            </div>
                        </ChapterText>
                    </div>

                    <SectionDivider />

                    <div id="chapter-11">
                        <ChapterText className="pt-20">
                            <span className="block text-center text-gold font-serif text-sm uppercase tracking-widest mb-4">Chapter 11</span>
                            <h2 className="text-center !mt-0">THE MONEY TALK: MONETIZING YOUR BILINGUAL VOICE</h2>
                            <p className="text-lg text-parchment/80 mb-8">Poetry isn't just art; it's a unique skill. Here is how your bilingual voice pays bills.</p>

                            <h3 className="text-gold border-b border-white/10 pb-4 mb-8">5 REVENUE STREAMS FOR BILINGUAL POETS</h3>
                            <IncomeStreamGrid />

                            <h3 className="text-gold border-b border-white/10 pb-4 mb-8 mt-16">YOUR "COLD PITCH" TEMPLATE</h3>
                            <p className="text-parchment/80 mb-6">Use this exact script to pitch Indian brands.</p>
                            <PitchTemplate />

                            <div className="mt-16 text-center">
                                <p className="text-sm text-parchment/60 uppercase tracking-widest">
                                    End of Volume 1
                                </p>
                            </div>
                        </ChapterText>
                    </div>

                    <SectionDivider />

                    <div id="chapter-12">
                        <ChapterText className="pt-20">
                            <span className="block text-center text-gold font-serif text-sm uppercase tracking-widest mb-4">Chapter 12</span>
                            <h2 className="text-center !mt-0">CLOSING: THE INVITATION</h2>
                            <p className="text-lg text-parchment/80 mb-8 text-center bg-gold/5 p-6 rounded-lg border border-gold/10 font-serif italic">
                                "Zubaan sirf bolne ke liye nahi, mehsoos karne ke liye bhi hoti hai." - Gulzar
                            </p>

                            <p className="mb-4">You already know this. Every time you've started a sentence in English and finished it in Hindi, you weren't being confused - you were being being emotionally precise.</p>
                            <img src="/images/voice_resonance.png" alt="Bilingual Resonance" className="w-full rounded-lg shadow-2xl border border-gold/20 my-8 opacity-90" />
                            <p className="mb-8">Your bilingual voice is not a compromise. It is a third language entirely.</p>

                            <h3 className="text-gold border-b border-white/10 pb-4 mb-8">WHAT HAPPENS NEXT</h3>
                            <p className="mb-8">Here is the path from where you are now to holding a book with your name in it.</p>
                            <FutureTimeline />

                            <h3 className="text-gold border-b border-white/10 pb-4 mb-8 mt-16">THE ANTHOLOGY AWAITS</h3>
                            <img src="/images/invitation_door.png" alt="The Open Door" className="w-full h-48 object-cover rounded-t-lg border-t border-x border-gold/20 opacity-80" />
                            <AnthologyInvitation />
                        </ChapterText>
                    </div>

                    <SectionDivider />

                    <div id="bonus">
                        <ChapterText className="pt-20">
                            <span className="block text-center text-gold font-serif text-sm uppercase tracking-widest mb-4">Bonus Section</span>
                            <h2 className="text-center !mt-0">AUTHOR'S TOOLKIT & APPENDICES</h2>

                            <div className="bg-gradient-to-br from-gold/10 to-transparent p-6 rounded-lg border border-gold/20 mb-8 max-w-2xl mx-auto text-center">
                                <p className="text-parchment/90 mb-0 italic font-serif">
                                    "Your Hinglish poetry isn't a phase. It's the exact voice Indian literature needs right now."
                                </p>
                            </div>

                            <h3 className="text-gold border-b border-white/10 pb-4 mb-8 mt-12">20 BILINGUAL WRITING PROMPTS</h3>
                            <p className="mb-4 text-center text-parchment/70">Use these to unlock your 'Love at Minus One' submission.</p>
                            <img src="/images/prompts_deck.png" alt="Writing Prompts" className="w-full rounded-lg shadow-2xl border border-gold/20 mb-8 opacity-80" />
                            <PromptsDeck />

                            <h3 className="text-gold border-b border-white/10 pb-4 mb-8 mt-24">APPENDIX A: SUBMISSION EMAIL TEMPLATE</h3>
                            <img src="/images/submission_scroll.png" alt="Formal Submission" className="w-full h-32 object-cover rounded-lg border border-gold/20 mb-6 opacity-60" />
                            <SubmissionEmail />

                            <h3 className="text-gold border-b border-white/10 pb-4 mb-8 mt-24">APPENDIX B: RECOMMENDED READING</h3>
                            <p className="mb-4">Study the masters of the bilingual craft.</p>
                            <img src="/images/poet_library.png" alt="Poet's Library" className="w-full h-40 object-cover rounded-lg border border-gold/20 mb-6 opacity-60" />
                            <RecommendedReading />

                            <div className="mt-24 p-8 border border-gold/30 rounded-lg text-center bg-ink-900/50 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gold/5 animate-pulse opacity-20 pointer-events-none" />
                                <h3 className="text-2xl font-serif text-gold mb-4 relative z-10">A Final Note</h3>
                                <p className="text-parchment/80 mb-6 relative z-10">
                                    The gatekeepers who said 'confused' were wrong. You're not confused. You're bilingual. And that is your superpower.
                                </p>
                                <p className="text-white font-bold text-lg relative z-10">
                                    Aapki awaaz matter karti hai.
                                </p>
                            </div>

                        </ChapterText>
                    </div>

                    <FinalTruth />

                    <div className="mt-24 mb-16 text-center">
                        <div className="inline-block p-1 rounded-full bg-gradient-to-r from-transparent via-gold/50 to-transparent w-3/4 mb-8" />
                        <p className="text-sm text-parchment/40 uppercase tracking-widest mb-8">Authorverse Summit Presents</p>
                        <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Your Voice is Valid.</h2>
                        <p className="text-xl text-parchment/80 max-w-2xl mx-auto mb-8">
                            The world doesn't need another copy of a British poet. It needs <strong>you</strong>. In all your messy, mixed, beautiful linguistic glory.
                        </p>
                        <Button className="bg-gold text-ink-900 font-bold text-lg px-8 py-6 rounded-full hover:bg-white transition-all shadow-lg hover:shadow-gold/20">
                            Start Writing Now <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </article >

                <FooterCTA />
            </main >
        </div >
    );
};

export default BilingualPoetAdvantage;
