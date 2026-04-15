import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, Lock, CheckCircle2, XCircle, BookOpen, Crown, Star, Sparkles, Feather, PenTool, Users, DoorOpen, List, ArrowRight, Clock, HelpCircle, User, Briefcase, GraduationCap, Sun, Sunset, Moon, AlertTriangle, Home } from 'lucide-react';
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
            reframe: "If you followed Phases P and O, you're not submitting random work-you're submitting your best. Rejection is usually about fit, not worth."
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

// --- Section Components ---

const chapters = [
    { id: 'chapter-1', title: 'Chapter 1: The Reality Check', days: 'Day 0', icon: <XCircle className="w-4 h-4" /> },
    { id: 'chapter-2', title: 'Chapter 2: The Three Doors', days: 'Day 0', icon: <DoorOpen className="w-4 h-4" /> },
    { id: 'chapter-3', title: 'Chapter 3: P.O.E.T. Overview', days: 'Overview', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'chapter-4', title: 'Chapter 4: Pick (Phase P)', days: 'Days 1-5', icon: <Feather className="w-4 h-4" /> },
    { id: 'chapter-5', title: 'Chapter 5: Optimize (Phase O)', days: 'Days 6-8', icon: <PenTool className="w-4 h-4" /> },
    { id: 'chapter-6', title: 'Chapter 6: Enroll (Phase E)', days: 'Days 9-11', icon: <Users className="w-4 h-4" /> },
    { id: 'chapter-7', title: 'Chapter 7: Transform (Phase T)', days: 'Days 12-15+', icon: <Star className="w-4 h-4" /> },
    { id: 'chapter-8', title: 'Chapter 8: Real Stories', days: 'Inspiration', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'chapter-9', title: 'Chapter 9: Action Plan', days: 'Checklist', icon: <CheckCircle2 className="w-4 h-4" /> },
];

const DesktopSidebar = ({ activeChapter, showSidebar }: { activeChapter: string, showSidebar: boolean }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: showSidebar ? 1 : 0, x: showSidebar ? 0 : -50 }}
            className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50 hidden xl:flex flex-col gap-2 pointer-events-none"
        >
            <div className={`bg-ink-900/40 backdrop-blur-md p-6 rounded-xl border border-white/5 shadow-2xl w-72 transition-all duration-500 pointer-events-auto ${showSidebar ? 'translate-x-0' : '-translate-x-10'}`}>
                <h4 className="text-gold font-serif mb-6 text-xs uppercase tracking-[0.2em] pl-1 border-b border-white/5 pb-3">
                    The Framework
                </h4>
                <div className="space-y-1 relative">
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
    const scrollToChapter1 = () => {
        const element = document.getElementById('chapter-1');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative h-[85vh] sm:min-h-[90vh] flex items-end justify-center pb-20 overflow-hidden bg-ink-black/20">
            <DesktopSidebar activeChapter={activeChapter} showSidebar={showSidebar} />
            <MobileCompactNav activeChapter={activeChapter} />

            <div className="absolute inset-0 bg-ink-black z-0" />

            {/* Main Background Image - Mobile Optimized */}
            <div className="absolute inset-0 z-0 flex items-center justify-center">
                <img
                    src="/images/poet_hero_text_v3.webp"
                    alt="P.O.E.T. Framework"
                    className="w-full h-full object-cover object-center md:object-cover sm:object-top opacity-90"
                />
                {/* Gradient overlay for button readability */}
                <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink-black via-ink-black/80 to-transparent" />
            </div>

            <div className="relative z-10 text-center container px-4 sm:px-6 max-w-5xl mx-auto flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="w-full flex flex-col items-center"
                >

                    <div className="flex flex-col sm:flex-row gap-6 w-full justify-center px-4 mt-4 sm:mt-12 items-center">
                        {/* Button 1: Start Journey - OUTSTANDING STYLE */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto"
                        >
                            <Button
                                onClick={scrollToChapter1}
                                className="w-full sm:w-auto bg-gradient-to-r from-gold via-yellow-500 to-gold text-ink-black hover:from-white hover:to-gold h-16 md:h-20 px-10 md:px-14 rounded-full text-xl md:text-2xl font-bold tracking-wider shadow-[0_0_50px_rgba(197,160,89,0.5)] border-2 border-white/20 relative overflow-hidden group"
                            >
                                <span className="relative z-10 flex items-center">
                                    Start The Journey <ArrowRight className="ml-3 w-6 h-6 md:w-7 md:h-7 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 blur-md" />
                            </Button>
                        </motion.div>

                        {/* Button 2: See Chapters */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                                    <Button variant="outline" className="w-full sm:w-auto bg-black/60 backdrop-blur-xl border-gold/30 text-parchment hover:bg-gold/10 hover:text-gold hover:border-gold h-14 md:h-16 px-8 md:px-10 rounded-full text-lg md:text-xl font-medium tracking-wide transition-all shadow-lg">
                                        <BookOpen className="mr-2 w-5 h-5 md:w-6 md:h-6" /> See Chapters
                                    </Button>
                                </motion.div>
                            </SheetTrigger>
                            <SheetContent side="left" className="bg-ink-900 border-r border-gold/20 text-parchment overflow-y-auto">
                                <SheetHeader className="mb-8 text-left">
                                    <SheetTitle className="text-gold font-display text-3xl">Chapters</SheetTitle>
                                    <SheetDescription className="text-parchment/60">
                                        Jump to any step of your 15-day journey.
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="space-y-6">
                                    {chapters.map((chapter) => (
                                        <a
                                            key={chapter.id}
                                            href={`#${chapter.id}`}
                                            className="block group"
                                            onClick={(e) => {
                                                const element = document.getElementById(chapter.id);
                                                if (element) {
                                                    e.preventDefault();
                                                    element.scrollIntoView({ behavior: 'smooth' });
                                                }
                                            }}
                                        >
                                            <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-gold/10">
                                                <Badge variant="secondary" className="bg-gold/10 text-gold text-[10px] w-16 justify-center shrink-0">{chapter.days}</Badge>
                                                <span className="text-sm font-medium group-hover:text-gold transition-colors">{chapter.title}</span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-parchment/50 flex flex-col items-center gap-2 z-20"
            >
                <span className="text-[10px] uppercase tracking-widest font-sans drop-shadow-md">Scroll to Begin</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-parchment/0 via-parchment/50 to-parchment/0 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </motion.div>
        </section>
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

// --- Main Page Component ---

const POETFramework = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const [activeChapter, setActiveChapter] = useState('');
    const [showSidebar, setShowSidebar] = useState(false);

    // Define chapters for scroll spy
    const chapters = [
        { id: 'chapter-1', title: 'Chapter 1: Reality Check', icon: <XCircle className="w-4 h-4" /> },
        { id: 'chapter-2', title: 'Chapter 2: Three Doors', icon: <DoorOpen className="w-4 h-4" /> },
        { id: 'chapter-3', title: 'Chapter 3: P.O.E.T. Overview', icon: <Sparkles className="w-4 h-4" /> },
        { id: 'chapter-4', title: 'Chapter 4: Phase P: Pick', icon: <Feather className="w-4 h-4" /> },
        { id: 'chapter-5', title: 'Chapter 5: Phase O: Optimize', icon: <PenTool className="w-4 h-4" /> },
        { id: 'chapter-6', title: 'Chapter 6: Phase E: Enroll', icon: <Users className="w-4 h-4" /> },
        { id: 'chapter-7', title: 'Chapter 7: Phase T: Transform', icon: <Star className="w-4 h-4" /> },
        { id: 'chapter-8', title: 'Chapter 8: Real Stories', icon: <BookOpen className="w-4 h-4" /> },
        { id: 'chapter-9', title: 'Chapter 9: Action Plan', icon: <CheckCircle2 className="w-4 h-4" /> },
    ];

    useEffect(() => {
        const handleScroll = () => {
            // Visibility check - Show after passing Hero (approx 80vh or 700px)
            if (window.scrollY > window.innerHeight * 0.8) {
                setShowSidebar(true);
            } else {
                setShowSidebar(false);
            }

            const sections = chapters.map(c => document.getElementById(c.id)).filter(Boolean);
            let current = '';

            // Find the last section whose top is accessible (moved past or currently viewing)
            for (const section of sections) {
                if (!section) continue;
                const rect = section.getBoundingClientRect();
                // If section top is above the "read line" (e.g. 1/3 down the screen)
                if (rect.top <= window.innerHeight / 3) {
                    current = section.id;
                    // Continue to active the next one if it matches too
                } else {
                    // This section is too far down, so the previous one was the current one
                    break;
                }
            }

            // If at the very top, or no chapter is active, consider hero section active
            if (window.scrollY < 100 || current === '') {
                current = 'hero'; // Or an empty string if hero is default
            }

            setActiveChapter(current);
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-ink-black min-h-screen text-foreground font-sans selection:bg-gold selection:text-ink-black overflow-x-hidden">
            <Helmet>
                <title>The P.O.E.T. Framework | Full Guide</title>
                <meta name="description" content="The complete 15-day roadmap for Indian poets to get published." />
            </Helmet>

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gold z-50 origin-left"
                style={{ scaleX }}
            />

            <HeroSection activeChapter={activeChapter} showSidebar={showSidebar} />

            <article className="py-24">
                {/* Author's Letter */}
                <section className="container mx-auto px-6 max-w-4xl relative mb-24">
                    {/* Paper Texture Background */}
                    <div className="absolute inset-0 bg-[#F5F0E1] transform -rotate-1 shadow-2xl rounded-sm z-0">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/paper.png')]" />
                    </div>

                    <div className="relative z-10 p-8 md:p-16 text-ink-black font-serif leading-relaxed text-lg">

                        {/* Header Visual */}
                        <div className="w-full aspect-[21/9] mb-12 rounded-lg overflow-hidden border border-ink-black/10 shadow-inner">
                            <img src="/images/writers_desk_signature.png" alt="Writer's Desk" className="w-full h-full object-cover sepia-[.3]" />
                        </div>

                        <h3 className="text-center text-ink-black/60 uppercase tracking-widest text-sm mb-12 font-sans font-bold border-b border-ink-black/10 pb-4 mx-auto max-w-[200px]">Author's Letter</h3>

                        <p className="mb-6 drop-cap first-letter:text-5xl first-letter:font-display first-letter:float-left first-letter:mr-3 first-letter:mt-[-5px]">Dear poet,</p>

                        <p className="mb-6">I know what it feels like to write at one in the morning, your phone screen glowing in the dark, typing words that feel like they're bleeding out of you. I know the strange combination of pride and embarrassment when you post a poem to your Instagram story, wondering if people will think you're being dramatic or attention-seeking. I know the loneliness of carrying beautiful, painful words inside you and having nowhere legitimate to put them.</p>

                        <p className="mb-6">Three years ago, I was exactly where you might be now. I had a notes app full of poems about heartbreak, distance, and all the quiet ways people hurt each other. I had maybe two hundred followers who occasionally liked my posts. And I had this persistent, almost embarrassing dream: I wanted to be a real published author. Not just someone who wrote captions. A real author, with a real book, with an ISBN number and everything.</p>

                        <p className="mb-6">But everywhere I looked, the path seemed impossible. Traditional publishers weren't interested in unknown poets, especially not ones writing about millennial heartbreak in Instagram-style verses. Self-publishing seemed to cost lakhs of rupees that I definitely didn't have. And then there were these anthology opportunities that kept popping up on my feed, charging anywhere from eight hundred to two thousand rupees just for a 'slot' in a book, with no information about quality, editing, or whether they were even legitimate.</p>

                        <p className="mb-6">I felt stuck between a dream and a scam, with no clear path forward.</p>

                        <p className="mb-6">Then I learned something that changed everything. I discovered that the co-author anthology model, when done ethically and with genuine care for quality, could be the exact bridge that poets like us need. Not a replacement for eventually writing our own books, but a first rung on the ladder. A way to transform from 'someone who writes poems' to 'a published author' in a realistic timeframe, without taking a massive financial risk, and without compromising on quality or self-respect.</p>

                        <p className="mb-6">Over the past three years, I've helped dozens of Indian poets navigate this path. I've seen nineteen-year-olds from small towns hold their first published book and cry. I've watched IT professionals find their voice again after years of feeling numb. I've witnessed the quiet power of what happens when someone who has always been told their words don't matter sees those words printed, bound, and real.</p>

                        <p className="mb-6">But I've also seen the damage that scammy, overpriced, low-quality anthologies can do. They take people's money and dreams and give them back something that feels hollow and embarrassing rather than empowering. That's why I'm obsessive about ethics, transparency, and quality in this space. That's why I needed to write this ebook.</p>

                        <p className="mb-6">This isn't a motivational pep talk about believing in yourself. This is a structured, practical framework that I've refined over years of working in this space. It's called The P.O.E.T. Framework™, and it maps out exactly what you need to do, day by day, to go from 'Instagram poet with a dream' to 'published co-author with an ISBN book' in just fifteen days.</p>

                        <p className="mb-6">More importantly, this ebook will teach you how to evaluate anthology opportunities so you never waste your money or your trust on something that doesn't serve you. You'll learn to spot red flags, recognize green flags, and make informed decisions about where to invest your words and your rupees.</p>

                        <p className="mb-6">As you read through this, you'll notice that I reference a specific anthology called 'Love at Minus One' as an example of how this framework works in practice. This is a real opportunity, a curated collection about love, emotional distance, and frozen feelings, priced ethically under five hundred rupees. I mention it because it directly embodies the principles I teach in this ebook. If the theme resonates with your work, it might be the perfect first step for you. But even if you never join that particular anthology, the framework in this book will serve you for every future opportunity you encounter.</p>

                        <p className="mb-6">I'm not here to manipulate you or pressure you. I'm here because I remember how lost and invisible I felt, and I want to hand you the map I wish I'd had.</p>

                        <p className="mb-6">Your words matter. Your heartbreak matters. Your quiet observations about love and distance and all the ways we freeze before we break, they all matter. And they deserve a container worthy of them.</p>

                        <p className="mb-8 font-bold text-ink-black/80">Let's build that container together.</p>

                        <div className="mt-12 text-right">
                            <p className="mb-2 italic text-sm text-ink-black/60">With respect and solidarity,</p>
                            <img src="/images/writers_desk_signature.png" alt="Sherin" className="w-32 inline-block -mt-10 mix-blend-multiply opacity-80" style={{ clipPath: "polygon(0 80%, 100% 80%, 100% 100%, 0 100%)", transform: "scale(1.5) translateY(-5px)" }} />
                            {/* Note: The clip-path hack is to try and focus on the signature part if it's at the bottom of the generated image, but often AI places it nicely. 
                                 A safer bet with generated images is usually to just use the image or a text signature. 
                                 Since I generated a full desk image, the signature is small at the bottom. 
                                 I'll use a text signature fallback for clarity if the image crop is tricky, 
                                 BUT I can also use a distinct font. Let's stick to the styling plan but use a text signature for high readability 
                                 alongside the desk image at the top. */}
                            <p className="font-display text-4xl text-gold mt-2 rotate-[-2deg]">Sherin</p>
                        </div>
                    </div>
                </section>

                <SectionDivider />

                {/* Chapter 1 */}
                <ChapterText>
                    <div id="chapter-1" className="scroll-mt-24">
                        <h2 className="text-3xl md:text-4xl font-serif text-parchment mb-8 mt-12">Chapter 1: The Reality Check</h2>
                    </div>

                    <div className="float-right ml-6 mb-6 w-full md:w-1/2 aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shadow-lg">
                        <img src="/images/poet_dilemma.png" alt="A poet writing at 2 AM" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700" />
                        <p className="text-xs text-parchment/40 text-center mt-2 font-sans">The 2 AM creative hour.</p>
                    </div>

                    <p>You write at strange hours. Maybe it's after everyone in your house has gone to sleep, when you can finally think without interruption. Maybe it's during your lunch break at work, when something someone said triggered a memory and suddenly words are flowing. Maybe it's in the back of a lecture hall, pretending to take notes while actually drafting verses about the person three rows ahead who will never know how you feel.</p>
                    <p>Your poems live in your phone's notes app. Sometimes you transfer them to Instagram, trying different fonts and backgrounds, spending twenty minutes choosing between two caption options before posting to your story where they'll disappear in twenty-four hours.</p>
                    <p>Sometimes you get likes. Sometimes someone DMs you saying 'felt this' with a heart emoji, and that small validation feels enormous. But most of the time, your poems just sit there, accumulating in digital folders, never quite reaching the audience or legitimacy you secretly hope for.</p>

                    <h3 className="text-xl font-bold text-gold mb-4 mt-8">The Fear of Being a "Fraud"</h3>

                    <div className="md:float-left md:mr-8 mb-6 w-full md:w-5/12 aspect-[3/4] rounded-xl overflow-hidden border border-white/10 shadow-lg relative group">
                        <img src="/images/poet_dream.png" alt="Holding a published book" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink-black/80 to-transparent p-4">
                            <p className="text-xs text-parchment/60 font-sans italic text-center">"You want to hold a physical book with your name in it."</p>
                        </div>
                    </div>

                    <p>And then there's the dream. The one you're almost embarrassed to admit, even to yourself. You want to be published. Not just Instagram-published. Really published. You want to hold a physical book with your name in it. You want to update your bio to say 'Published Author' without feeling like a fraud. You want your parents to understand that this thing you do at midnight, this thing they keep calling a 'hobby' or a 'phase,' is actually real.</p>
                    <p>But every time you try to figure out how to make that dream real, you hit walls.</p>
                    <div className="clear-both" />
                </ChapterText>

                {/* The Walls Interactive Component */}
                <section className="py-12 px-4">
                    <div className="container mx-auto max-w-5xl grid md:grid-cols-3 gap-6">
                        <motion.div whileHover={{ y: -10 }} className="bg-ink-900 border border-white/10 p-6 rounded-xl hover:border-red-500/30 transition-colors group">
                            <div className="bg-red-500/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-500/20 text-red-400">
                                <img src="https://api.iconify.design/lucide:castle.svg?color=%23f87171" className="w-6 h-6" alt="Castle" />
                            </div>
                            <h4 className="text-parchment font-serif text-xl mb-2">The Ivory Tower</h4>
                            <p className="text-parchment/50 text-sm mb-4">Traditional Publishing</p>
                            <p className="text-parchment/70 text-sm leading-relaxed">
                                Reserved for the elite. Requires query letters, agents, and years of waiting. Acceptance rate &lt; 1% for debut poets without massive followings.
                            </p>
                        </motion.div>

                        <motion.div whileHover={{ y: -10 }} className="bg-ink-900 border border-white/10 p-6 rounded-xl hover:border-yellow-500/30 transition-colors group">
                            <div className="bg-yellow-500/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:bg-yellow-500/20 text-yellow-400">
                                <img src="https://api.iconify.design/lucide:coins.svg?color=%23facc15" className="w-6 h-6" alt="Coins" />
                            </div>
                            <h4 className="text-parchment font-serif text-xl mb-2">The Paywall</h4>
                            <p className="text-parchment/50 text-sm mb-4">Self-Publishing</p>
                            <p className="text-parchment/70 text-sm leading-relaxed">
                                Maximum control, maximum cost. ₹20,000 to ₹1 Lakh just to print. Plus you have to be your own marketer, distributor, and salesperson.
                            </p>
                        </motion.div>

                        <motion.div whileHover={{ y: -10 }} className="bg-ink-900 border border-white/10 p-6 rounded-xl hover:border-purple-500/30 transition-colors group">
                            <div className="bg-purple-500/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-500/20 text-purple-400">
                                <img src="https://api.iconify.design/lucide:ghost.svg?color=%23c084fc" className="w-6 h-6" alt="Ghost" />
                            </div>
                            <h4 className="text-parchment font-serif text-xl mb-2">The Trap</h4>
                            <p className="text-parchment/50 text-sm mb-4">Scam Anthologies</p>
                            <p className="text-parchment/70 text-sm leading-relaxed">
                                "Limited Slots Available!" Vague promises, high fees, no editing. They prey on your desperation for an ISBN.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <ChapterText>
                    <div className="my-8" />
                    <h3 className="text-xl font-bold text-gold mb-4">The Anthology Trap</h3>

                    <div className="float-right ml-6 mb-6 w-full md:w-1/2 rounded-xl overflow-hidden border border-white/10 shadow-lg relative group">
                        {/* Using video-like interactive overlay feel */}
                        <img src="/images/anthology_chaos.png" alt="Scrolling through confusing anthology posters" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all" />
                        <div className="absolute inset-0 bg-purple-900/10 mix-blend-overlay pointer-events-none" />
                    </div>

                    <p>So you end up scrolling through Instagram, where you keep seeing these colorful posters about anthology opportunities. 'Become a published co-author!' they proclaim. 'Limited slots available!' Some of them seem exciting. Some of them seem suspicious. The prices range wildly.</p>
                    <p>You screenshot a few of them, meaning to research later, but you never quite follow through because you're not sure how to tell the real opportunities from the scams.</p>
                    <div className="clear-both" />
                </ChapterText>

                {/* Peer Comparison Visual */}
                <section className="py-12 my-8 bg-white/5 border-y border-white/5">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <h3 className="text-center text-parchment font-serif text-2xl mb-8">The Reality Gap</h3>
                        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">

                            {/* Friends Side */}
                            <div className="flex-1 text-right space-y-4 opacity-50 blur-[0.5px] hover:blur-none hover:opacity-80 transition-all duration-500">
                                <h4 className="text-parchment/60 font-bold uppercase tracking-widest text-sm">Your Friends</h4>
                                <div className="flex items-center justify-end gap-4">
                                    <div>
                                        <p className="text-parchment font-bold">MBA Acceptance</p>
                                        <p className="text-xs text-parchment/50">Moving forward</p>
                                    </div>
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"><CheckCircle2 className="w-5 h-5" /></div>
                                </div>
                                <div className="flex items-center justify-end gap-4">
                                    <div>
                                        <p className="text-parchment font-bold">Engagement</p>
                                        <p className="text-xs text-parchment/50">Settling down</p>
                                    </div>
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"><CheckCircle2 className="w-5 h-5" /></div>
                                </div>
                                <div className="flex items-center justify-end gap-4">
                                    <div>
                                        <p className="text-parchment font-bold">IT Promotion</p>
                                        <p className="text-xs text-parchment/50">Earning well</p>
                                    </div>
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"><CheckCircle2 className="w-5 h-5" /></div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="h-px w-full md:w-px md:h-48 bg-gold/50" />

                            {/* You Side */}
                            <div className="flex-1 space-y-4">
                                <h4 className="text-gold font-bold uppercase tracking-widest text-sm">You (The Poet)</h4>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gold/20 text-gold rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(197,160,89,0.3)]"><Clock className="w-5 h-5" /></div>
                                    <div>
                                        <p className="text-parchment font-bold">2 AM Writing</p>
                                        <p className="text-xs text-parchment/50">Bleeding ink & soul</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gold/20 text-gold rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(197,160,89,0.3)]"><Feather className="w-5 h-5" /></div>
                                    <div>
                                        <p className="text-parchment font-bold">Heartbreak Poems</p>
                                        <p className="text-xs text-parchment/50">From 2 years ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gold/20 text-gold rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(197,160,89,0.3)]"><HelpCircle className="w-5 h-5" /></div>
                                    <div>
                                        <p className="text-parchment font-bold">"Is this real?"</p>
                                        <p className="text-xs text-parchment/50">Seeking validation</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                <ChapterText>
                    <h3 className="text-xl font-bold text-gold mb-4 mt-8">It's Not Lack of Talent</h3>
                    <p>Here's what I need you to understand: this feeling of being stuck is not your fault, and it's not because you lack talent or dedication. You're stuck because nobody has given you a clear, honest map of how publishing actually works in India right now, especially for poets like us who exist primarily in the digital space.</p>
                    <p>The publishing industry in India has changed dramatically in the last five years, but most of the advice floating around is still based on old models. The Instagram poetry ecosystem is creating a whole new generation of writers who don't fit into traditional publishing categories. We write short, emotionally intense pieces. We care about aesthetics and shareability. We have audiences, even if they're small ones. But we lack the formal credentials and networks that traditional publishing requires.</p>

                    <p>This is where the confusion and vulnerability come in. You know you're a real writer. You know your work is good. But you don't know how to translate that into the kind of legitimacy that feels official, that your family will respect, that you can put on a resume or a bio without feeling uncertain.</p>
                    <p>And when you're in that vulnerable state, it's easy to either give up entirely or make impulsive decisions. It's easy to pay too much for a low-quality anthology because you're desperate for validation. It's easy to stay paralyzed, never taking any action because you're afraid of making the wrong choice.</p>

                    <div className="my-8 p-6 border-l-2 border-gold bg-gold/5 italic text-parchment/90">
                        "Here's the truth that might change everything for you: getting published is not about being 'chosen' by some mythical gatekeeper who recognizes your genius. It's about understanding the different models that exist and strategically choosing the one that matches your current stage, your goals, and your resources."
                    </div>

                    <p>There are three main doors into the publishing world in India. Each one leads somewhere different. Each one requires different investments of time, money, and energy. And critically, they're not mutually exclusive. Walking through one door doesn't close the others. In fact, walking through the right first door often makes it easier to access the others later.</p>
                    <p>Most Indian Instagram poets, especially those publishing for the first time, should walk through the co-author anthology door. Not because it's the 'best' option in some absolute sense, but because it's the smartest strategic first move. It gives you legitimate credentials quickly and affordably. It teaches you how the publishing process works. It connects you with other writers. And it transforms your identity from 'aspiring writer' to 'published author' in a way that creates momentum for everything else you'll do.</p>
                    <p>But here's the problem: not all anthology opportunities are created equal. Some are run by passionate, ethical people who genuinely care about quality and community. Others are just money-making schemes that prey on writers' desperation for validation. And if you can't tell the difference, you're at risk of either wasting your money on something embarrassing or missing out on something genuinely valuable.</p>

                    <p>That's why you need a framework. Not just a checklist, but a comprehensive system that helps you identify your best work, polish it to professional standards, evaluate anthology opportunities with clear criteria, and then leverage that first publication into real momentum and opportunities.</p>
                    <p>Over the next chapters, I'm going to give you that framework. It's called The P.O.E.T. Framework™, and it's specifically designed for Indian poets like you who are navigating this confusing landscape for the first time. It will take you from where you are now-talented but unpublished, motivated but uncertain-to where you want to be: a published co-author with an ISBN book, with clarity about your next steps, and with a foundation for building a meaningful writing career or practice.</p>
                    <p>But first, you need to understand the landscape. You need to see all three doors clearly, so you can make an informed choice about which one to walk through first.</p>
                    <p>Let's map this territory together.</p>
                </ChapterText>

                <SectionDivider />

                {/* Chapter 2 */}
                <ChapterText>
                    <h2 id="chapter-2" className="text-3xl md:text-4xl font-serif text-parchment mb-8 mt-12 scroll-mt-24">Chapter 2: The Three Doors of Publishing</h2>
                    <p>Imagine you're standing in front of a building with three different entrances. Each door leads to the same destination-becoming a published author-but each path is completely different in terms of time, cost, difficulty, and what you'll experience along the way. Most aspiring writers only know about one or two of these doors, and that limited knowledge keeps them stuck.</p>
                    <p>Let me show you all three doors clearly, so you can make an informed choice.</p>
                </ChapterText>

                {/* Interactive Component for Chapter 2 */}
                <ThreeDoorsSection />

                <ChapterText>

                    {/* DOOR ONE */}
                    <div className="mb-16">
                        <h3 className="text-2xl font-serif text-gold mb-4 mt-8 flex items-center gap-3">
                            <span className="bg-gold/10 w-8 h-8 rounded-full flex items-center justify-center text-sm border border-gold/30">1</span>
                            Door One: Traditional Publishing
                        </h3>
                        <p>This is the door most people think of when they imagine 'real' publishing. It's the prestigious path: literary agents, publishing houses with famous imprints, editorial teams, and the possibility of your book sitting in Crossword or Oxford Bookstore.</p>
                        <p>Here's how it typically works. You write a full manuscript, often a novel or a collection of poems long enough to be a standalone book. You then research literary agents who represent your genre. You send them query letters, which are essentially formal pitches for your work, along with sample chapters or poems. If an agent is interested, they request your full manuscript. If they love it, they sign you as a client and then pitch your work to publishing houses on your behalf.</p>
                        <p>The publishing house, if they're interested, offers you a contract. They handle editing, design, printing, distribution, and marketing. You get an advance against future royalties, meaning they pay you some money upfront, and then you earn additional money as the book sells. Your book ends up in actual bookstores, and you get to say you're published by a 'real' publisher.</p>
                        <p><strong>For poets specifically, traditional publishing is extraordinarily difficult.</strong> Poetry doesn't sell well in India compared to fiction or non-fiction. Most traditional publishers will only take on poetry collections from poets who already have significant recognition, either through prizes, academic positions, or very large social media followings. If you're a relatively unknown Instagram poet, even one with a few thousand followers, you're almost certainly going to face rejection after rejection.</p>

                        <div className="grid md:grid-cols-2 gap-4 my-8 not-prose">
                            <div className="bg-green-900/10 border border-green-500/20 p-6 rounded-lg">
                                <h4 className="text-green-500 font-bold mb-3 uppercase tracking-wider text-xs">Advantages</h4>
                                <ul className="space-y-2 text-sm text-parchment/80">
                                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Maximum prestige</li>
                                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> No out-of-pocket cost</li>
                                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Professional support</li>
                                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Real distribution infrastructure</li>
                                </ul>
                            </div>
                            <div className="bg-red-900/10 border border-red-500/20 p-6 rounded-lg">
                                <h4 className="text-red-500 font-bold mb-3 uppercase tracking-wider text-xs">Disadvantages</h4>
                                <ul className="space-y-2 text-sm text-parchment/80">
                                    <li className="flex gap-2"><XCircle className="w-4 h-4 text-red-500 shrink-0" /> Extremely low acceptance rates</li>
                                    <li className="flex gap-2"><XCircle className="w-4 h-4 text-red-500 shrink-0" /> Timelines stretching years</li>
                                    <li className="flex gap-2"><XCircle className="w-4 h-4 text-red-500 shrink-0" /> Limited interest in poetry</li>
                                    <li className="flex gap-2"><XCircle className="w-4 h-4 text-red-500 shrink-0" /> Essentialy closed for debut poets</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* DOOR TWO */}
                    <div className="mb-16">
                        <h3 className="text-2xl font-serif text-gold mb-4 mt-8 flex items-center gap-3">
                            <span className="bg-gold/10 w-8 h-8 rounded-full flex items-center justify-center text-sm border border-gold/30">2</span>
                            Door Two: Solo Self-Publishing
                        </h3>
                        <p>This is the door for authors who want complete control and are willing to invest significant money and effort to make their book happen on their own terms.</p>
                        <p>The process goes like this. You write your complete manuscript. You hire or become your own editor, proofreading and refining until the work is polished. You hire or create your own cover design and interior layout. You choose a printing service, which in India usually means companies like Pothi, NotionPress, Blurose, or various local printers. You pay them to print copies of your book.</p>
                        <p>The costs for solo self-publishing in India typically range from twenty thousand rupees on the very low end to several lakhs if you hire professionals. The advantages are complete creative control and higher profit margins. But the disadvantages are substantial. The upfront cost is prohibitive for most young Indian poets. More importantly, you are responsible for everything: marketing, publicity, distribution.</p>

                        <div className="grid md:grid-cols-2 gap-4 my-8 not-prose">
                            <div className="bg-green-900/10 border border-green-500/20 p-6 rounded-lg">
                                <h4 className="text-green-500 font-bold mb-3 uppercase tracking-wider text-xs">Advantages</h4>
                                <ul className="space-y-2 text-sm text-parchment/80">
                                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Complete creative control</li>
                                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Higher profit margins per book</li>
                                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Publish exactly what you want</li>
                                </ul>
                            </div>
                            <div className="bg-red-900/10 border border-red-500/20 p-6 rounded-lg">
                                <h4 className="text-red-500 font-bold mb-3 uppercase tracking-wider text-xs">Disadvantages</h4>
                                <ul className="space-y-2 text-sm text-parchment/80">
                                    <li className="flex gap-2"><XCircle className="w-4 h-4 text-red-500 shrink-0" /> High upfront cost (₹20k - ₹1 Lakh)</li>
                                    <li className="flex gap-2"><XCircle className="w-4 h-4 text-red-500 shrink-0" /> You typically handle all marketing</li>
                                    <li className="flex gap-2"><XCircle className="w-4 h-4 text-red-500 shrink-0" /> Risk of books sitting unread in boxes</li>
                                </ul>
                            </div>
                        </div>

                        <p className="italic text-parchment/60">For first-time poets who are still building their audience and craft, solo self-publishing is usually not the smartest first move. It makes more sense as a second or third book.</p>
                    </div>

                    {/* DOOR THREE */}
                    <div className="mb-16">
                        <h3 className="text-2xl font-serif text-gold mb-4 mt-8 flex items-center gap-3">
                            <span className="bg-gold/10 w-8 h-8 rounded-full flex items-center justify-center text-sm border border-gold/30">3</span>
                            Door Three: Co-Author Anthologies
                        </h3>
                        <p>This is the door that most Indian Instagram poets should walk through first, but it's also the door that's most misunderstood and surrounded by the most skepticism.</p>
                        <p>Here's the core concept. Multiple writers, anywhere from ten to a hundred, each contribute one or a few poems to a single book built around a theme. The book is published with a proper ISBN. Each contributor gets credit as a co-author.</p>
                        <p>Because costs are shared, each person pays a relatively small amount (typically ₹300-₹500 for ethical ones). This makes it accessible. You get legitimate publishing credentials, an ISBN, and you learn the process without bearing all the risk.</p>

                        <div className="grid md:grid-cols-2 gap-4 my-8 not-prose">
                            <div className="bg-green-900/10 border border-green-500/20 p-6 rounded-lg">
                                <h4 className="text-green-500 font-bold mb-3 uppercase tracking-wider text-xs">Advantages</h4>
                                <ul className="space-y-2 text-sm text-parchment/80">
                                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Manageable cost (&lt; dinner for two)</li>
                                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Fast timeline (weeks not years)</li>
                                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Legitimate ISBN credentials</li>
                                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Community support</li>
                                </ul>
                            </div>
                            <div className="bg-red-900/10 border border-red-500/20 p-6 rounded-lg">
                                <h4 className="text-red-500 font-bold mb-3 uppercase tracking-wider text-xs">Disadvantages</h4>
                                <ul className="space-y-2 text-sm text-parchment/80">
                                    <li className="flex gap-2"><XCircle className="w-4 h-4 text-red-500 shrink-0" /> Shared spotlight, not a solo book</li>
                                    <li className="flex gap-2"><XCircle className="w-4 h-4 text-red-500 shrink-0" /> Limited control over design</li>
                                    <li className="flex gap-2"><XCircle className="w-4 h-4 text-red-500 shrink-0" /> Less individual visibility</li>
                                </ul>
                            </div>
                        </div>

                        <p>But here's what makes this model particularly powerful for you: it addresses exactly where you are. You have talent but lack credentials. You have limited budget. You need to cross the threshold (The Wall) from 'aspiring' to 'published' to build momentum.</p>

                        <div className="my-12 bg-ink-900 p-8 rounded-xl border border-gold/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Feather className="w-24 h-24" />
                            </div>
                            <h4 className="text-xl font-serif text-gold mb-4 relative z-10">The Musician Analogy</h4>
                            <p className="relative z-10 italic text-lg leading-relaxed">
                                "Think of it this way: if you wanted to become a professional musician, you probably wouldn't start by immediately recording a solo album and booking a nationwide tour. <strong>You'd join a band first.</strong> You'd play at local venues. You'd collaborate. Co-author anthologies are the equivalent of joining a band for poets. They're the training ground."
                            </p>
                        </div>

                        <p>The problem is: the space is crowded with both ethical opportunities and scams. You need to distinguish them.</p>

                        {/* Ethical vs Bad Table/Comparison */}
                        <div className="grid md:grid-cols-2 gap-8 my-8">
                            <div className="bg-ink-black border border-green-500/30 p-6 rounded-xl">
                                <h4 className="text-green-400 font-serif text-lg mb-4 flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Ethical Anthology</h4>
                                <ul className="space-y-3 text-sm text-parchment/70">
                                    <li className="flex gap-3"><span className="text-green-500 font-bold">✓</span> Clear, compelling theme</li>
                                    <li className="flex gap-3"><span className="text-green-500 font-bold">✓</span> Reasonable fee (₹300-500)</li>
                                    <li className="flex gap-3"><span className="text-green-500 font-bold">✓</span> Proper ISBN & Amazon listing</li>
                                    <li className="flex gap-3"><span className="text-green-500 font-bold">✓</span> Curation (not everyone gets in)</li>
                                    <li className="flex gap-3"><span className="text-green-500 font-bold">✓</span> Transparent about rights</li>
                                </ul>
                            </div>
                            <div className="bg-ink-black border border-red-500/30 p-6 rounded-xl">
                                <h4 className="text-red-400 font-serif text-lg mb-4 flex items-center gap-2"><XCircle className="w-5 h-5" /> Exploitative Anthology</h4>
                                <ul className="space-y-3 text-sm text-parchment/70">
                                    <li className="flex gap-3"><span className="text-red-500 font-bold">×</span> Excessive fees (₹1500+)</li>
                                    <li className="flex gap-3"><span className="text-red-500 font-bold">×</span> Vague about ISBN/Distribution</li>
                                    <li className="flex gap-3"><span className="text-red-500 font-bold">×</span> No curation (anyone who pays gets in)</li>
                                    <li className="flex gap-3"><span className="text-red-500 font-bold">×</span> Artificial urgency ("2 slots left!")</li>
                                    <li className="flex gap-3"><span className="text-red-500 font-bold">×</span> Asks for exclusive rights</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-12 p-6 bg-white/5 border-l-2 border-gold rounded-r-lg">
                            <h4 className="text-parchment font-bold mb-2">"Won't people judge me?"</h4>
                            <p className="text-parchment/70 text-sm">
                                "Anyone who would judge you for taking a smart, strategic first step toward your publishing goals is not someone whose opinion matters. The anthology is not the destination. It's the doorway. But it's a doorway that leads somewhere real."
                            </p>
                        </div>
                    </div>
                </ChapterText>

                <SectionDivider />

                {/* Chapter 3 */}
                <ChapterText>
                    <h2 id="chapter-3" className="text-3xl md:text-4xl font-serif text-parchment mb-8 mt-12 scroll-mt-24">Chapter 3: The P.O.E.T. Framework™ Overview</h2>
                    <p>Every meaningful transformation requires a structured approach. You don't accidentally become a published author any more than you accidentally learn a language or accidentally build a house. You need a system, a sequence of steps that builds naturally from one phase to the next.</p>
                    <p>The P.O.E.T. Framework™ is that system. It compresses what would normally be months of confused trial and error into a focused fifteen-day roadmap built specifically for Indian Instagram poets.</p>
                </ChapterText>

                {/* Visual Overview Grid */}
                <section className="py-12">
                    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { l: 'P', title: 'Pick Your Best Work', days: 'Days 1-5', desc: 'Select legally & thematically. Don\'t guess. Filter your work through an editor\'s eyes.' },
                            { l: 'O', title: 'Optimize to Standard', days: 'Days 6-8', desc: 'Upgrade from "Instagram Draft" to "Publication Ready". Tighten language and remove clichés.' },
                            { l: 'E', title: 'Enroll in Anthology', days: 'Days 9-11', desc: 'Sift opportunities. Spot Red Flags vs Green Flags. Submit with confidence.' },
                            { l: 'T', title: 'Transform Identity', days: 'Days 12-15+', desc: 'Leverage the credential. Update your bio. Step into your new reality as an author.' }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-ink-900/50 border border-gold/20 p-6 rounded-lg hover:border-gold/50 transition-colors group"
                            >
                                <div className="text-4xl font-display text-gold/20 group-hover:text-gold/50 transition-colors mb-4">{item.l}</div>
                                <h4 className="text-lg font-bold text-parchment mb-2">{item.title}</h4>
                                <span className="text-xs uppercase tracking-widest text-gold/60 mb-3 block">{item.days}</span>
                                <p className="text-sm text-parchment/60 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <ChapterText>
                    <div className="space-y-16">
                        {/* P - PICK */}
                        {/* Chapter 3 Visual: The Blueprint */}
                        <div className="mb-12 rounded-xl overflow-hidden border border-gold/20 shadow-2xl relative group">
                            <div className="absolute inset-0 bg-gradient-to-t from-ink-black/80 to-transparent z-10" />
                            <img src="/images/poet_blueprint.png" alt="The P.O.E.T. Framework Blueprint" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute bottom-4 left-6 z-20">
                                <p className="text-gold font-serif italic text-sm">Fig 3.1: The Ancient Blueprint</p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -left-4 -top-4 text-9xl font-display text-gold/5 pointer-events-none select-none">P</div>
                            <h3 className="text-2xl font-serif text-gold mb-6 relative z-10">P – Pick Your Best Work (Days 1-5)</h3>
                            <p>The first phase is about strategic selection. You're going to identify the single most anthology-ready poem you currently have, or draft a new one that's specifically aligned with anthology themes you're interested in.</p>
                            <p>This might sound simple, but it's actually one of the most critical phases. Many poets approach anthology submissions randomly, just sending whatever poem they wrote most recently or whatever they personally like best. But anthology editors are looking for specific things: thematic alignment, emotional resonance, craft quality, and originality. Your goal in the Pick phase is to evaluate your work through an editor's eyes and choose strategically rather than emotionally.</p>
                            <p>By the end of these five days, you'll have one primary poem identified as your strongest candidate, ideally with a backup option as well. You'll understand why this particular poem is anthology-ready, how it aligns with themes that anthologies commonly seek, and where it might need refinement.</p>
                            <p>The emotional state during this phase is usually a mix of excitement and uncertainty. You're taking your private work and preparing to make it public in a formal way. You're learning to see your own writing more objectively. You might feel vulnerable, but also energized by the possibility of what comes next.</p>
                        </div>

                        {/* O - OPTIMIZE */}
                        <div className="relative">
                            <div className="absolute -left-4 -top-4 text-9xl font-display text-gold/5 pointer-events-none select-none">O</div>
                            <h3 className="text-2xl font-serif text-gold mb-6 relative z-10">O – Optimize for Standards (Days 6-8)</h3>
                            <p>The second phase is about upgrading your selected poem from 'good Instagram post' to 'professional publication-ready work.' There's a difference between writing that works well for social media and writing that works well in a book. This phase teaches you to recognize and bridge that gap.</p>
                            <p>You'll learn specific editing techniques for poetry: how to eliminate clichés while preserving emotional truth, how to strengthen imagery, how to manage rhythm and white space intentionally, how to craft openings and endings that land with impact. You'll also learn formatting standards and the level of polish that serious anthologies expect.</p>
                            <p>This phase takes only three days because you're not rewriting from scratch. You're refining, sharpening, and elevating work that's already fundamentally strong. Think of it like taking a rough diamond and cutting it so it catches light properly.</p>
                            <p>By the end of these three days, your poem should feel noticeably stronger. You should be able to read it aloud and feel confident that it represents your best work, that it's ready to sit alongside poems from other skilled writers without embarrassment.</p>
                            <p>The emotional state during this phase is usually focused and slightly perfectionist. You're in craft mode, making careful decisions about every word and line break. It can feel tedious at moments, but there's also deep satisfaction in watching your work get tighter and more powerful.</p>
                        </div>

                        {/* E - ENROLL */}
                        <div className="relative">
                            <div className="absolute -left-4 -top-4 text-9xl font-display text-gold/5 pointer-events-none select-none">E</div>
                            <h3 className="text-2xl font-serif text-gold mb-6 relative z-10">E – Enroll in Anthology (Days 9-11)</h3>
                            <p>The third phase is about evaluation and decision-making. You're going to learn how to vet anthology opportunities, distinguish high-quality ones from low-quality ones, and make an informed choice about where to submit your work.</p>
                            <p>This phase includes both the practical elements (understanding pricing, rights, and what's included) and the emotional elements (overcoming imposter syndrome, deciding you're ready, actually submitting rather than staying in 'maybe later' mode).</p>
                            <p>I'll show you the exact red flags and green flags to look for in anthology opportunities. I'll introduce you to a specific anthology called 'Love at Minus One,' which is built around themes of emotional distance, frozen feelings, and love that never quite becomes a relationship. This anthology is a real opportunity that embodies all the green flags I teach, and if the theme aligns with your work, it might be the perfect application of everything you've learned in the P and O phases.</p>
                            <p>But whether or not you choose that specific anthology, this phase equips you to evaluate any future opportunity you encounter. You'll never again feel lost or uncertain about whether an anthology is legitimate.</p>
                            <p>By the end of these three days, you should have identified at least one anthology that meets your standards, understood its requirements and timeline, and ideally submitted your application. The emotional state during this phase shifts from analytical to brave. You're moving from preparation to action, which always requires courage.</p>
                        </div>

                        {/* T - TRANSFORM */}
                        <div className="relative">
                            <div className="absolute -left-4 -top-4 text-9xl font-display text-gold/5 pointer-events-none select-none">T</div>
                            <h3 className="text-2xl font-serif text-gold mb-6 relative z-10">T – Transform Identity (Days 12-15 and Beyond)</h3>
                            <p>The fourth phase is about identity activation and strategic leverage. Getting accepted into an anthology doesn't automatically change your life. What changes your life is how you activate that credential and use it to create momentum.</p>
                            <p>This phase teaches you how to update your bios authentically, share your news without sounding braggy or apologetic, how to connect with fellow co-authors to build community, and how to leverage your published author status in other areas of life: job applications, freelance pitches, scholarship essays, or just internal confidence.</p>
                            <p>This phase extends beyond fifteen days because transformation is ongoing. But the first few days after acceptance are critical for setting up good habits and mindsets. You're learning to embody the identity of 'published author' rather than just having it as a credential on paper.</p>
                            <p>The emotional state during this phase is usually a combination of pride, relief, vulnerability, and excitement. Something shifts when you can truthfully say 'I'm a published author.' It's not that all your doubts disappear, but they matter less. You have proof now, not just hope.</p>
                        </div>
                    </div>

                    <div className="mt-12 p-8 border-t border-b border-gold/10 bg-gold/5">
                        <h4 className="font-serif text-xl text-parchment mb-4 text-center">How the Phases Build on Each Other</h4>
                        <p className="text-parchment/80 leading-relaxed text-center mb-4">
                            The power of this framework is in the sequence. Each phase creates the foundation for the next one.
                        </p>
                        <p className="text-parchment/80 italic text-center">
                            "You can't optimize a poem (Phase O) until you've strategically selected which poem to optimize (Phase P). You can't confidently submit to an anthology (Phase E) until you've polished your work to professional standards (Phase O). And you can't fully leverage your publication (Phase T) if you've rushed through the earlier phases and ended up in a low-quality anthology you're embarrassed about."
                        </p>
                        <p className="text-parchment/80 text-center mt-4">
                            The fifteen-day timeline is intentionally compressed. It's long enough to do quality work in each phase, but short enough that you maintain momentum. This framework forces action while ensuring that action is strategic.
                        </p>
                    </div>

                    <p className="mt-12 text-center text-lg">
                        Over the next four chapters, we're going to go deep into each phase. I'll give you specific exercises, decision tools, checklists, and examples. By the time you finish this ebook, you won't just understand the framework conceptually. You'll have actually worked through it.<br />
                        <span className="text-gold font-bold block mt-4 text-xl">Are you ready to start? Let's begin with Phase P: picking your best work.</span>
                    </p>
                </ChapterText>


                <SectionDivider />

                {/* Chapter 4 */}
                <ChapterText>
                    <h2 id="chapter-4" className="text-3xl md:text-4xl font-serif text-parchment mb-8 mt-12 scroll-mt-24">Chapter 4: Phase P – Pick Your Best Work (Days 1-5)</h2>
                    <p>Most poets approach anthology submissions the wrong way. They write a new poem in a burst of inspiration the night before the deadline, or they grab whatever poem they happened to post on Instagram most recently, or they submit their personal favorite without considering whether it actually fits what the anthology needs.</p>
                    <p>This is like applying to jobs by sending the same generic resume to every company without reading what they're looking for. It might occasionally work by accident, but it's not strategic.</p>
                    <p>Phase P is about being strategic. You're going to spend five days examining your existing work, understanding what makes a poem anthology-ready, and selecting the single best candidate for publication. If you don't currently have a poem that meets the criteria, you'll draft one that does.</p>

                    {/* Chapter 4 Visual: The Inspection */}
                    <div className="float-right ml-8 mb-6 w-full md:w-1/2 rounded-xl overflow-hidden border border-gold/20 shadow-lg relative my-4">
                        <img src="/images/poet_inspection.png" alt="Inspecting a poem with a magnifying glass" className="w-full h-auto" />
                    </div>

                    <p>This investment of time is not procrastination. It's preparation that dramatically increases your chances of acceptance and ensures you're proud of what gets published under your name.</p>

                    <h3 className="text-2xl font-serif text-gold mt-12 mb-6">Why Selection Matters More Than You Think</h3>
                    <p>When anthology editors review submissions, they're looking for several things simultaneously. They want poems that align thematically with the anthology's concept. They want work that demonstrates craft, not just raw emotion. They want pieces that will work well alongside other poems in the collection, contributing to a cohesive reader experience. And they want writing that represents the quality level they've promised readers.</p>
                    <p>If you send a poem that doesn't align with their theme, it gets rejected regardless of quality. If you send a thematically aligned poem that's poorly crafted or filled with clichés, it gets rejected. If you send strong work that doesn't quite fit the anthology's tone or style, it might get rejected even though the poem itself is good.</p>
                    <p>Your goal is to maximize the overlap between what you write naturally, what you write well, and what the anthology is seeking. That overlap is your sweet spot, and finding it requires honest evaluation rather than wishful thinking.</p>

                    <div className="bg-ink-900/50 border border-gold/20 p-8 rounded-xl my-12 backdrop-blur-sm">
                        <h3 className="text-2xl font-serif text-gold mb-8 text-center uppercase tracking-widest border-b border-gold/10 pb-4">The Anthology-Ready Poem Scorecard</h3>
                        <p className="mb-6">I'm going to give you a framework for evaluating your poems objectively. Take out your notes app or journal and look at the last ten to fifteen poems you've written. For each one, you're going to score it on seven different dimensions, using a scale of one to five for each dimension.</p>

                        <div className="space-y-8">
                            {[
                                {
                                    title: "Dimension One: Universality of Theme",
                                    q: "Could a stranger reading this poem see themselves in it?",
                                    desc: "Does this poem speak to an experience or emotion that many people can relate to, or is it so personal and specific that only you would understand it? Poetry can be personal and still universal. A poem about your specific ex-girlfriend might actually be universal if it captures the feeling of loving someone who's emotionally unavailable."
                                },
                                {
                                    title: "Dimension Two: Emotional Intensity and Nuance",
                                    q: "Does this poem make the reader feel something complex?",
                                    desc: "Anthology editors are looking for emotional depth. Not just 'I'm sad' but the specific texture of sadness. The best anthology poems often contain contradictions: love mixed with resentment, grief mixed with relief."
                                },
                                {
                                    title: "Dimension Three: Imagery and Specificity",
                                    q: "Does it contain vivid images or just abstract concepts?",
                                    desc: "Images are concrete nouns: smoke, skin, bed, rain. 'My heart is broken' is abstract. 'Your side of the bed smells like smoke' is specific. If your poem has fewer than three vivid images, it likely reads as abstract."
                                },
                                {
                                    title: "Dimension Four: Clarity vs. Confusion",
                                    q: "Can a reader follow the emotional thread?",
                                    desc: "Some poets confuse obscurity with depth. Editors reject overly obscure work. It doesn't need to be simple, but there should be a clear thread. Readers shouldn't finish reading and have no idea what just happened."
                                },
                                {
                                    title: "Dimension Five: Opening Line Strength",
                                    q: "Does the first line hook the reader immediately?",
                                    desc: "The opening line is your audition. It should present an arresting image, a surprising statement, or immediate emotional urgency. 'I think about you sometimes' is weak. 'The knives in the drawer are quiet tonight' is strong."
                                },
                                {
                                    title: "Dimension Six: Ending Impact",
                                    q: "Does the poem end on a resonant note?",
                                    desc: "The ending is your last chance to affect the reader. Weak endings repeat what was said or just stop. Strong endings often involve a turn, a revelation, or a final image that crystallizes everything."
                                },
                                {
                                    title: "Dimension Seven: Thematic Alignment",
                                    q: "Does it fit common anthology themes?",
                                    desc: "This is about market fit. Common themes: romantic love, heartbreak, mental health, family, identity. For 'Love at Minus One' specifically: love that didn't work, situationships, emotional numbness, almost-relationships."
                                }
                            ].map((dim, i) => (
                                <div key={i} className="bg-ink-black/40 p-6 rounded-lg border-l-2 border-gold/30">
                                    <h4 className="text-gold font-bold mb-2 text-lg">{dim.title}</h4>
                                    <p className="text-parchment font-serif italic mb-3 text-lg opacity-90">"{dim.q}"</p>
                                    <p className="text-sm text-parchment/70 leading-relaxed">{dim.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-parchment mt-8 mb-4">Calculating Your Scores</h3>
                    <p>Once you've scored all your poems, add up the total. Max score is 35. Most poems will be 15-25. Your highest-scoring poem is your leading candidate. If you have multiple high scorers, that's great options. Focus heavily on dimensions 3-7 (imagery, clarity, openings, endings, fit).</p>

                    <h3 className="text-xl font-bold text-parchment mt-8 mb-4">If Your Highest Scorer Isn't Quite There Yet</h3>
                    <p>If your best poem scores a 22, or is strong on emotion but weak on imagery, you have valuable data. <strong>Option 1:</strong> Revise it (we'll cover this in Phase O). <strong>Option 2:</strong> Draft a new poem from scratch with these dimensions in mind.</p>

                    <div className="bg-parchment/5 p-8 rounded-xl my-8 border border-parchment/10">
                        <h3 className="text-2xl font-serif text-gold mb-6">Drafting a New Anthology-Aligned Poem</h3>

                        {/* Chapter 4 Visual: Love at Minus One */}
                        <div className="mb-8 rounded-lg overflow-hidden border border-parchment/10 relative">
                            <img src="/images/love_at_minus_one.png" alt="Love at Minus One Theme" className="w-full h-64 object-cover object-center opacity-80" />
                            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 to-transparent p-4">
                                <p className="text-parchment/80 font-serif text-center italic text-sm">Theme Visualization: "Love at Minus One"</p>
                            </div>
                        </div>

                        <p className="mb-4">Start with Dimension 7 (Theme). Choose a universal theme, then find your specific authentic angle. For 'Love at Minus One', think about:</p>
                        <ul className="space-y-3 list-none">
                            <li className="flex gap-3"><span className="text-gold font-bold">→</span> <span className="text-parchment/80">A person you almost loved but never quite did. The feeling of "almostness".</span></li>
                            <li className="flex gap-3"><span className="text-gold font-bold">→</span> <span className="text-parchment/80">Emotional numbness. Going through motions without feeling.</span></li>
                            <li className="flex gap-3"><span className="text-gold font-bold">→</span> <span className="text-parchment/80">The end of a talking stage. The texture of that specific disappointment.</span></li>
                            <li className="flex gap-3"><span className="text-gold font-bold">→</span> <span className="text-parchment/80">Distance that isn't geographic. Two people in the same room, miles apart emotionally.</span></li>
                        </ul>
                        <p className="mt-6 italic text-sm text-parchment/60">"Start with a strong image. Build on specific details. Let emotion be complex. Ensure the opening hooks and the ending resonates. Give yourself the full 5 days."</p>
                    </div>

                    <p className="text-xl font-serif text-center mt-12 mb-8">
                        By the end of day five, you should have ONE poem that represents your best work.<br />
                        <span className="text-gold font-bold">Write that poem's title at the top of a fresh document. That's your candidate.</span>
                    </p>
                </ChapterText>

                <SectionDivider />

                {/* Chapter 5 */}
                <ChapterText>
                    <h2 id="chapter-5" className="text-3xl md:text-4xl font-serif text-parchment mb-8 mt-12 scroll-mt-24">Chapter 5: Phase O – Optimize Your Poem for Publication (Days 6-8)</h2>

                    {/* New Illustration */}
                    <div className="float-right ml-6 mb-6 w-full md:w-1/2 rounded-xl overflow-hidden border border-white/10 shadow-lg relative group">
                        <img src="/images/poet_optimization_alchemy.png" alt="The Alchemist's Workbench - Optimization" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700" />
                        <div className="absolute inset-0 bg-gold/10 mix-blend-overlay" />
                    </div>

                    <p>You have a strong poem now. You went through the selection process in Phase P and identified work that has real potential. But potential is not the same as publication-ready. There's a specific level of craft and polish that distinguishes Instagram poetry from anthology poetry, and these next three days are about closing that gap.</p>
                    <p>This is not about changing your voice or making your poem less authentic. This is about removing everything that doesn't serve the poem, strengthening what's already working, and making deliberate craft choices rather than accidental ones.</p>

                    <h3 className="text-2xl font-serif text-gold mt-12 mb-6">The Difference Between Instagram-Ready and Anthology-Ready</h3>
                    <p>Instagram poetry is designed for a specific context: quick consumption on a phone screen, often with visual elements like background images or fonts, meant to work as a standalone post that someone might screenshot or share to their story.</p>
                    <p>Anthology poetry is designed for a different context: sustained reading in print, sitting alongside other poems, meant to work purely through language without visual aids, read by someone who is actually focusing on the words rather than scrolling.</p>
                    <p>In an anthology, your poem has to work harder because it's competing for attention with other poems on the same page and the pages around it. It has to justify itself through language alone.</p>

                    <h3 className="text-2xl font-serif text-gold mt-12 mb-6">The Four Optimization Areas</h3>
                    <p>Over the next three days, you're going to focus on four specific areas where Instagram poets most commonly need to level up.</p>

                    {/* Interactive Tabbed Component Replacing Static Text */}
                    <OptimizationStation />

                    <p className="font-serif italic text-lg text-center my-8 text-gold/80">"A Before and After Example"</p>
                    <p>Let me show you how this works in practice with a hypothetical poem that gets upgraded from Instagram draft to Anthology-ready.</p>
                </ChapterText>

                {/* Interactive Component for Chapter 5 */}
                <OptimizationSlider />

                <ChapterText>
                    <h3 className="text-2xl font-serif text-gold mt-12 mb-6">Your Three-Day Optimization Checklist</h3>

                    {/* Interactive Checklist Replacing Static List */}
                    <InteractiveChecklist />

                    <p className="mt-12 text-xl font-serif text-center">
                        You've completed Phase O. Your poem is now anthology-ready. <br />
                        <span className="text-gold font-bold block mt-4">Now comes the strategic decision: which anthology deserves this work?</span>
                    </p>
                </ChapterText>

                <SectionDivider />

                {/* Chapter 6 */}
                <ChapterText>
                    <h2 id="chapter-6" className="text-3xl md:text-4xl font-serif text-parchment mb-8 mt-12 scroll-mt-24">Chapter 6: Phase E – Enroll (Days 9-11)</h2>

                    {/* Marketplace Illustration */}
                    <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden border border-white/10 shadow-lg relative group mb-8">
                        <img src="/images/anthology_marketplace_gate.png" alt="The Anthology Marketplace" className="w-full h-full object-cover object-bottom opacity-90 group-hover:opacity-100 transition-all duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-6 left-6 max-w-lg">
                            <h3 className="text-2xl font-serif text-gold mb-2 drop-shadow-lg">The Anthology Marketplace</h3>
                            <p className="text-parchment/90 text-sm drop-shadow-md">Not all gates lead to the same castle. Learn to spot the difference between a genuine opportunity and a tourist trap.</p>
                        </div>
                    </div>

                    <p>You have a strong, polished poem now. You've done the strategic selection work in Phase P and the craft refinement work in Phase O. Your poem is anthology-ready, which means it's time to decide where to submit it.</p>
                    <p>This phase is about three things: learning to evaluate anthology opportunities with clear criteria, applying those criteria to real opportunities including <em className="text-gold">'Love at Minus One,'</em> and actually taking action rather than staying in analysis paralysis.</p>

                    <AnthologyVettingTool />

                    <h3 className="text-2xl font-serif text-gold mt-16 mb-6">Applying the Framework to 'Love at Minus One'</h3>
                    <p>Let's walk through how this specific anthology scores on the Red Flag / Green Flag framework so you can see evaluation in action.</p>

                    <LoveAtMinusOneScorecard />

                    <div className="p-8 my-8 border-l-4 border-gold bg-gradient-to-r from-gold/5 to-transparent">
                        <h4 className="font-serif text-lg text-gold mb-2">Why this theme works for us</h4>
                        <p className="text-parchment/80 italic">
                            "We're the generation of talking stages that go nowhere, of matches that fade after three days. We know what it feels like to be with someone who's simultaneously present and absent. 'Love at Minus One' captures that specific, frozen in-between state."
                        </p>
                    </div>

                    <ImposterSyndromeShield />

                    <h3 className="text-2xl font-serif text-gold mt-16 mb-6">Your 3-Day Action Plan</h3>
                    <p>Don't just read. Do. Follow this simple timeline to move from "aspiring" to "submitted."</p>

                    <SubmissionChecklist />

                    <div className="mt-12 bg-white/5 p-8 rounded-xl border border-white/10 text-center">
                        <p className="text-lg font-serif italic text-parchment/80 mb-4">"Taking action always involves risk. But staying stuck, writing poems that never go anywhere, dreaming without doing-that's also a risk."</p>
                        <p className="text-gold font-bold">- The P.O.E.T. Framework</p>
                    </div>

                </ChapterText>

                <SectionDivider />

                {/* Chapter 7 */}
                <ChapterText>
                    <h2 id="chapter-7" className="text-3xl md:text-4xl font-serif text-parchment mb-8 mt-12 scroll-mt-24">Chapter 7: Phase T – Transform (Days 12-15+)</h2>

                    {/* Identity Mirror Illustration */}
                    <div className="md:float-right md:ml-8 mb-8 w-full md:w-5/12 rounded-xl overflow-hidden border border-white/10 shadow-lg relative group">
                        <img src="/images/poet_identity_mirror.png" alt="The Identity Mirror" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700" />
                        <div className="absolute inset-0 bg-gold/10 mix-blend-overlay" />
                    </div>

                    <p>Getting accepted is just the beginning. The real shift is internal. This final phase isn't about writing; it's about <strong>becoming</strong>.</p>
                    <p>It's about the moment someone asks "What do you do?" and you decide whether to say "I write poems sometimes" or "I'm a published author." That choice changes everything.</p>

                    <h3 className="text-2xl font-serif text-gold mt-12 mb-6">The Digital Transformation</h3>
                    <p>Your online presence is your first impression. It needs to reflect your new reality immediately.</p>

                    <BioTransformation />

                    <h3 className="text-2xl font-serif text-gold mt-12 mb-6">How to Share the News (Without Cringing)</h3>
                    <p>There's a fine line between sharing your joy and performing humility or arrogance. Here is the exact script to use.</p>
                    <SocialShareGuide />

                    <h3 className="text-2xl font-serif text-gold mt-12 mb-6">Leveraging Your Credential</h3>
                    <p>Being published isn't just an ego boost. It's a key that opens specific doors in your life, if you know how to turn it.</p>

                    <LeverageGrid />

                    <div className="my-12 p-8 border-l-4 border-gold bg-gradient-to-r from-gold/5 to-transparent">
                        <p className="text-xl font-serif italic text-parchment">
                            "The biggest mistake new authors make is treating their first publication as a destination rather than a waypoint. They celebrate once, then go back to their old habits. Don't let that be you."
                        </p>
                    </div>

                    <h3 className="text-2xl font-serif text-gold mt-12 mb-6">Your Activation Checklist (Days 12-15)</h3>
                    <ActivationChecklist />

                    <p className="mt-8 text-center text-parchment/60 italic">
                        The framework is complete. But your journey is just beginning.
                    </p>

                </ChapterText>

                <SectionDivider />

                {/* Chapter 8 - Stories */}
                <ChapterText>
                    <h2 id="chapter-8" className="text-3xl md:text-4xl font-serif text-parchment mb-8 mt-12 scroll-mt-24">Chapter 8: Real Stories (Voices from the Archive)</h2>

                    {/* Voices Illustration */}
                    <div className="float-right ml-6 mb-6 w-full md:w-1/2 rounded-xl overflow-hidden border border-white/10 shadow-lg relative group">
                        <img src="/images/poet_voices_collage.png" alt="Voices of the Archive" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700" />
                        <div className="absolute inset-0 bg-gold/10 mix-blend-overlay" />
                    </div>

                    <p>You are not the first to walk this path. These are real patterns of transformation.</p>
                    <p>Meet four poets who used this framework to change their trajectory.</p>

                    <StoryShowcase />

                    <h3 className="text-2xl font-serif text-gold mt-12 mb-6">What These Stories Reveal</h3>
                    <p>These four poets had completely different starting points, but they shared common threads that led to their success.</p>
                    <TransformationInsights />

                    <div className="mt-8 text-center bg-white/5 p-6 rounded-xl border border-white/10">
                        <p className="text-lg font-serif italic text-parchment/80">"Your story will be different. But the pattern is the same: Take one strategic step. Then another. Then another."</p>
                    </div>

                </ChapterText>

                <SectionDivider />

                {/* Chapter 9 - Action Plan */}
                <ChapterText>
                    <h2 id="chapter-9" className="text-3xl md:text-4xl font-serif text-parchment mb-8 mt-12 scroll-mt-24">Chapter 9: The Path Forward (Your 15-Day Plan)</h2>
                    <p>Understanding is not doing. You have the map, the tools, and the destination. Now you need to walk the path.</p>
                    <p>Here is your day-by-day checklist to move from "aspiring" to "published" in exactly 15 days.</p>
                </ChapterText>

                <TimelineSection />

                <DecisionPoint />
                <UltimateInvitation />

                <div className="container mx-auto px-6 max-w-4xl mt-16 prose prose-invert prose-p:text-parchment/80 prose-headings:font-serif prose-headings:text-gold">
                    <h3>What Happens After Day 15?</h3>
                    <p>Within 1-3 weeks, you'll hear back. If accepted as a co-author, you begin Phase T: Transformation. If rejected, you use the feedback to aim for the next target.</p>
                    <p>Within 6-12 weeks, the physical book arrives. That is your moment.</p>

                    <SectionDivider />

                    <h2 className="text-center text-3xl md:text-4xl mt-12 mb-8">The Decision Point</h2>
                    <p>You have the map. You have the tools. You have the 15-day plan.</p>
                    <p>Now you have to decide: Will you actually do this? Or will you close this tab and say "maybe later"?</p>
                    <p>"Later" has a way of becoming "never." The voice saying you aren't ready will never go away. You have to act anyway.</p>
                    <p>If your poems about frozen feelings-about love at minus one-are sitting in your notes app, they are frozen in potential. Give them a container. Give them a chance to be read.</p>
                    <p className="text-xl font-serif italic text-gold text-center my-8">"Love at Minus One is not just a metaphor. It's a real door. Open it."</p>
                </div>

                <div className="my-16 p-8 bg-gradient-to-b from-ink-900 to-ink-black border border-gold/30 rounded-xl text-center max-w-3xl mx-auto shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('/images/paper_texture.png')] opacity-5 mix-blend-overlay" />
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />

                    <h3 className="text-3xl font-serif text-gold mb-6 relative z-10">The Ultimate Truth About Transformation</h3>
                    <p className="text-parchment/80 leading-relaxed mb-6 relative z-10 font-serif text-lg">
                        "You transform every time you choose to write even when you don't feel like it. Every time you edit ruthlessly. Every time you submit despite fear."
                    </p>
                    <p className="text-parchment/80 leading-relaxed mb-8 relative z-10 font-serif text-lg">
                        "You're not just a published author now. You're someone who followed through. Someone who invested in themselves. That's who you are now."
                    </p>

                    <Button
                        size="lg"
                        className="bg-gold text-ink-black hover:bg-gold/90 font-bold px-8 py-6 text-lg relative z-10 shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        Start Day 1 Today <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>

            </article >

            <FooterCTA />
        </div >
    );
};

export default POETFramework;
