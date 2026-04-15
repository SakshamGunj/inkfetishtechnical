import React from 'react';
import { BookOpen, Star, Clock, Target, ArrowRight, Zap, AlertTriangle, CheckCircle2, XCircle, Brain, Sparkles, Layers } from 'lucide-react';

export const IntroductionContent = () => {
    return (
        <div className="space-y-24">

            {/* --- SECTION 1: THE INSPIRATION LIE --- */}
            <section className="space-y-8">
                <div className="flex items-center gap-3 text-red-400 mb-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-mono text-xs tracking-widest uppercase">The Great Deception</span>
                </div>
                <h3 className="text-4xl md:text-6xl font-serif text-parchment leading-tight">
                    INTRODUCTION: <br />
                    <span className="text-red-500 italic">The Inspiration Lie</span>
                </h3>

                <div className="bg-ink-900/50 p-8 rounded-xl border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-full h-full opacity-20 bg-[url('/images/habit_bible_inspiration_lie.png')] bg-cover bg-center mix-blend-overlay transition-transform duration-1000 group-hover:scale-105" />
                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <p className="text-xl text-parchment/90 font-serif leading-relaxed">
                                You've been lied to. They told you great writers wait for inspiration. That's garbage.
                            </p>
                            <p className="text-parchment/70 font-serif leading-relaxed">
                                Here's what nobody tells you: Professional writers don't wait for <span className="text-gold italic">the muse</span>. They show up. Every single day. Rain or shine. Inspired or exhausted. Motivated or not.
                            </p>
                            <div className="inline-block px-6 py-4 bg-black/40 border-l-2 border-gold text-lg font-serif italic text-gold">
                                "Inspiration is what amateurs wait for. Habits are what professionals build."
                            </div>
                        </div>

                        {/* Visual: Amateur vs Pro */}
                        <div className="space-y-4">
                            <ComparisonCard
                                variant="amateur"
                                title="The Amateur"
                                points={["Waits for 'The Muse'", "Writes when motivated", "0 Finished Manuscripts"]}
                            />
                            <ComparisonCard
                                variant="pro"
                                title="The Professional"
                                points={["Builds a System", "Writes regardless of mood", "Consistent Output"]}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 2: YOUR STORY (IS THIS YOU?) --- */}
            <section className="space-y-8">
                <h4 className="text-2xl font-serif text-parchment text-center">Let me guess your story...</h4>

                <div className="grid md:grid-cols-3 gap-6">
                    <StoryCard
                        icon={<Layers className="w-6 h-6" />}
                        title="The Graveyard"
                        desc="You've started three novels. Written the first chapter of each. They're sitting in your Google Drive right now, collecting digital dust."
                    />
                    <StoryCard
                        icon={<Brain className="w-6 h-6" />}
                        title="The Consumer"
                        desc="You've bought writing courses. Bookmarked productivity articles. Followed inspiring writers. But you still haven't finished anything."
                    />
                    <StoryCard
                        icon={<Sparkles className="w-6 h-6" />}
                        title="The Imposter"
                        desc="Your parents think writing is 'just a hobby.' Your friends don't take it seriously. And secretly, you're starting to wonder if they're right."
                    />
                </div>

                <div className="text-center max-w-2xl mx-auto py-8">
                    <p className="text-xl font-serif text-gold italic mb-6">
                        Here's the truth that changes everything:
                    </p>
                    <div className="bg-white/5 p-6 rounded-lg border border-white/5 backdrop-blur-sm">
                        <p className="text-lg text-parchment/90 leading-relaxed">
                            You are not broken. You're not lazy. You don't lack talent. <br />
                            <strong className="text-gold text-2xl block mt-4">You just need a system.</strong>
                        </p>
                    </div>
                </div>
            </section>

            {/* --- SECTION 3: THE TRANSFORMATION --- */}
            <section className="relative py-12 border-y border-white/5 my-12">
                <div className="absolute inset-0 bg-gold/5 blur-3xl opacity-30" />
                <div className="relative z-10 space-y-8">
                    <h3 className="text-2xl md:text-3xl font-serif text-parchment text-center mb-8">My Transition</h3>

                    <div className="flex flex-col md:flex-row items-stretch gap-0 md:gap-8 justify-center">
                        {/* BEFORE */}
                        <div className="flex-1 bg-red-950/20 p-8 rounded-2xl border border-red-900/30 text-center space-y-4">
                            <div className="text-red-400 text-sm font-bold uppercase tracking-widest">Before Systems</div>
                            <div className="text-4xl font-serif text-red-200">200</div>
                            <div className="text-xs text-red-300/50 uppercase">Words per Month</div>
                            <div className="pt-4 border-t border-red-900/30 text-red-200/70 text-sm italic">
                                "Inconsistent. 27 unfinished drafts. Felt like a fraud."
                            </div>
                        </div>

                        {/* ARROW */}
                        <div className="hidden md:flex items-center justify-center text-gold/50">
                            <ArrowRight className="w-8 h-8" />
                        </div>

                        {/* AFTER */}
                        <div className="flex-1 bg-green-950/20 p-8 rounded-2xl border border-green-900/30 text-center space-y-4 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-green-500/50" />
                            <div className="text-green-400 text-sm font-bold uppercase tracking-widest">After Systems</div>
                            <div className="text-4xl font-serif text-green-200">500</div>
                            <div className="text-xs text-green-300/50 uppercase">Words per DAY</div>
                            <div className="pt-4 border-t border-green-900/30 text-green-200/70 text-sm italic">
                                "3 Books Published. From 'Aspiring' to Writer."
                            </div>
                        </div>
                    </div>

                    <p className="text-center text-parchment/60 font-serif italic max-w-2xl mx-auto">
                        "I discovered what every successful writer knows: Writing isn't about waiting for the perfect moment. It's about building habits so strong that writing becomes as automatic as brushing your teeth."
                    </p>
                </div>
            </section>

            {/* --- SECTION 4: WHAT THIS DELIVERS --- */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-gold flex items-center gap-3">
                    <BookOpen className="w-6 h-6" /> What This Book Delivers
                </h3>
                <p className="text-parchment/60 text-sm font-sans mb-4">In the next 35 pages, you'll get:</p>

                <div className="grid md:grid-cols-2 gap-4">
                    <DeliverableItem text="The 7 core habits that make writing automatic" />
                    <DeliverableItem text="A 30-day plan to install unshakeable writing routines" />
                    <DeliverableItem text="Strategies designed for Indian writers juggling jobs & families" />
                    <DeliverableItem text="Worksheets and tracking systems you can start using today" />
                    <DeliverableItem width="full" text="Real solutions for real obstacles" />
                </div>
            </section>

            {/* --- SECTION 5: HOW TO USE --- */}
            <section className="bg-ink-950 p-8 rounded-2xl border border-white/5 space-y-6">
                <h3 className="text-xl font-serif text-parchment mb-4">How to Use This Book</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <StepBlock num="1" text="Read one chapter at a time" />
                    <StepBlock num="2" text="Complete action steps immediately" />
                    <StepBlock num="3" text="Pick one habit and start today" />
                    <StepBlock num="4" text="Track your progress daily" />
                    <StepBlock num="5" text="Adjust based on what works" />
                </div>
            </section>

            {/* --- SECTION 6: THE PROMISE --- */}
            <section className="relative py-16 text-center">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent blur-3xl" />
                <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                    <h3 className="text-3xl font-serif text-gold">The Promise</h3>
                    <p className="text-lg text-parchment/80 font-serif leading-relaxed">
                        By page 35, you'll have your personalized writing system. <br />
                        By day 30, writing will feel as natural as checking Instagram. <br />
                        By day 90, you'll have a finished draft.
                    </p>

                    <div className="bg-white/5 border border-gold/30 p-8 rounded-xl backdrop-blur-md">
                        <p className="text-xl md:text-2xl font-serif text-white italic mb-4">
                            "But here's what matters most: By tomorrow, you'll have written something. And that's where every finished book begins."
                        </p>
                        <p className="text-gold/80 font-bold uppercase tracking-widest text-sm">
                            You're not becoming a writer. You already are one.
                        </p>
                    </div>

                    <button
                        onClick={() => {/* Navigate to Ch1 */ }}
                        className="bg-gold text-ink-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gold/90 transition-all shadow-[0_0_20px_rgba(255,215,0,0.2)]"
                    >
                        Let's Start
                    </button>
                </div>
            </section>

        </div>
    );
};

// --- SUB-COMPONENTS ---

const ComparisonCard = ({ variant, title, points }: any) => {
    const isPro = variant === 'pro';
    return (
        <div className={`p-6 rounded-xl border ${isPro ? 'bg-green-950/20 border-green-500/30' : 'bg-red-950/20 border-red-500/30'}`}>
            <h4 className={`text-lg font-bold mb-4 ${isPro ? 'text-green-400' : 'text-red-400'}`}>{title}</h4>
            <ul className="space-y-3">
                {points.map((p: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-parchment/80">
                        {isPro ? <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> : <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />}
                        {p}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const StoryCard = ({ icon, title, desc }: any) => (
    <div className="p-6 bg-white/5 rounded-xl border border-white/5 hover:border-gold/20 transition-all group">
        <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-parchment/60 group-hover:text-gold transition-colors mb-4">
            {icon}
        </div>
        <h5 className="font-bold text-parchment mb-2">{title}</h5>
        <p className="text-sm text-parchment/60 leading-relaxed">{desc}</p>
    </div>
);

const DeliverableItem = ({ text, width }: any) => (
    <div className={`flex items-center gap-3 p-4 bg-ink-900/50 rounded-lg border border-white/5 ${width === 'full' ? 'md:col-span-2' : ''}`}>
        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
        <p className="text-parchment/80 font-serif text-sm">{text}</p>
    </div>
);

const StepBlock = ({ num, text }: any) => (
    <div className="text-center p-3">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gold font-bold mx-auto mb-2 border border-white/5">{num}</div>
        <p className="text-xs text-parchment/70 leading-tight">{text}</p>
    </div>
);
