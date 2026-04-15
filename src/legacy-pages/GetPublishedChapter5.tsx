import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Unlock,
    Eye,
    Type,
    User,
    CheckSquare,
    Clock,
    AlertTriangle,
    XCircle,
    CheckCircle2,
    FileText,
    HelpCircle,
    ArrowRight
} from 'lucide-react';
import { Card } from "@/components/ui/card";

export const Chapter5Content = () => {
    return (
        <div className="space-y-16">

            {/* 1. Behind the Scenes - Narrative */}
            <section className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-serif text-parchment">Behind the Scenes</h3>
                <div className="prose prose-invert prose-lg text-parchment/80 leading-relaxed font-serif">
                    <p>
                        I'm going to share what happens behind the scenes when editors review 100+ submissions. This is the insider knowledge that changes everything.
                    </p>
                    <p>
                        Most writers think selection is mysterious. They imagine editors sitting in dimly lit rooms, debating the merits of complex literary theory. The reality is simpler: Editors are busy humans trying to build the best collection within time constraints.
                    </p>
                    <div className="bg-ink-800/50 p-6 rounded-xl border-l-4 border-gold italic text-parchment/90 my-6">
                        "Understanding what they're actually looking for gives you a massive advantage."
                    </div>
                </div>
            </section>

            {/* 2. The 5 Secrets */}
            <section className="space-y-12">
                <h3 className="text-3xl font-serif text-gold mb-8 text-center">What Makes Your Submission Stand Out</h3>

                {/* Secret 1 */}
                <SecretBlock
                    number="1"
                    icon={<Eye className="w-6 h-6 text-gold" />}
                    title="First Three Lines Decide Everything"
                    desc="Editors spend 30-90 seconds on your initial submission. Your first three lines are your audition."
                >
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div className="bg-red-950/20 border border-red-900/30 p-4 rounded-lg">
                            <h5 className="font-bold text-red-400 mb-2 text-sm flex items-center gap-2"><XCircle className="w-4 h-4" /> Weak Openings (Risk)</h5>
                            <ul className="text-xs space-y-2 text-parchment/70">
                                <li>"This is a poem about..." (Never announce)</li>
                                <li>"Love is like a rose..." (Clichéd)</li>
                                <li>"I remember when..." (Generic nostalgia)</li>
                            </ul>
                        </div>
                        <div className="bg-green-950/20 border border-green-900/30 p-4 rounded-lg">
                            <h5 className="font-bold text-green-400 mb-2 text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Strong Openings (Interest)</h5>
                            <ul className="text-xs space-y-2 text-parchment/70">
                                <li>"I kept the receipt from our last argument..."</li>
                                <li>"Tuesday morning, I learned heartbreak tastes like..."</li>
                                <li>"Tumne kaha tha you'd stay..."</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-4 bg-ink-900 p-3 rounded text-xs text-center border border-white/5">
                        <strong className="text-gold">Your Action:</strong> Review your opening three lines. Would they make a busy editor stop scrolling?
                    </div>
                </SecretBlock>

                {/* Secret 2 */}
                <SecretBlock
                    number="2"
                    icon={<Type className="w-6 h-6 text-gold" />}
                    title="Title Matters More Than You Think"
                    desc="Editors see your title before a single line. A bad title creates negative bias instantly."
                >
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div className="bg-red-950/20 border border-red-900/30 p-4 rounded-lg">
                            <h5 className="font-bold text-red-400 mb-2 text-sm">Titles That Hurt</h5>
                            <ul className="text-xs space-y-1 text-parchment/70">
                                <li>"Untitled" (Lazy)</li>
                                <li>"Poem #7" (Amateur)</li>
                                <li>"Love" / "Pain" (Generic)</li>
                                <li>Overly long summaries</li>
                            </ul>
                        </div>
                        <div className="bg-green-950/20 border border-green-900/30 p-4 rounded-lg">
                            <h5 className="font-bold text-green-400 mb-2 text-sm">Titles That Help</h5>
                            <ul className="text-xs space-y-1 text-parchment/70">
                                <li>"The Geometry of Missing You" (Intriguing)</li>
                                <li>"Viraha in the Time of Video Calls" (Cultural)</li>
                                <li>"Love Poem Ending in Accounting" (Surprising)</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-4 bg-ink-900 p-3 rounded text-xs text-center border border-white/5">
                        <strong className="text-gold">Your Action:</strong> Write five alternative titles. Choose the most specific one.
                    </div>
                </SecretBlock>

                {/* Secret 3 */}
                <SecretBlock
                    number="3"
                    icon={<User className="w-6 h-6 text-gold" />}
                    title="Author Bio Is a Selection Factor"
                    desc="Your bio signals professionalism. Editors read it before making final decisions."
                >
                    <div className="space-y-4 mt-6">
                        <div className="bg-red-950/20 border border-red-900/30 p-4 rounded-lg">
                            <h5 className="font-bold text-red-400 mb-2 text-sm">Weak Bio (Amateur Signal)</h5>
                            <p className="text-xs italic text-parchment/60">"I like to write poetry sometimes when I'm feeling sad. This is my first time submitting. I hope you like it!"</p>
                        </div>
                        <div className="bg-green-950/20 border border-green-900/30 p-4 rounded-lg">
                            <h5 className="font-bold text-green-400 mb-2 text-sm">Strong Bio (Professional Signal)</h5>
                            <p className="text-xs italic text-parchment/60">"Arjun Mehta is a Delhi-based writer exploring themes of displacement and identity through Hindi-English poetry. This is his first submitted work. He writes daily..."</p>
                        </div>
                    </div>
                    <div className="mt-4 bg-ink-900 p-3 rounded text-xs text-center border border-white/5">
                        <strong className="text-gold">Your Action:</strong> Rewrite your bio to signal commitment, even if you're new.
                    </div>
                </SecretBlock>

                {/* Secret 4 */}
                <SecretBlock
                    number="4"
                    icon={<CheckSquare className="w-6 h-6 text-gold" />}
                    title="Follow Formatting Guidelines EXACTLY"
                    desc="You'd be surprised how many submissions get rejected for ignoring basic rules."
                >
                    <div className="flex flex-col md:flex-row gap-8 items-center justify-center mt-6">
                        <div className="space-y-2 text-right opacity-60">
                            <div className="text-xs line-through decorating-red-500">Arial, 14pt</div>
                            <div className="text-xs line-through decorating-red-500">Single-spaced</div>
                            <div className="text-xs line-through decorating-red-500">2000 words</div>
                            <div className="text-xs line-through decorating-red-500">.pdf file</div>
                        </div>
                        <div className="h-24 w-px bg-white/10 hidden md:block" />
                        <ArrowRight className="w-6 h-6 text-red-500 md:hidden rotate-90" />
                        <div className="space-y-2">
                            <div className="text-xs font-bold text-green-400 flex items-center gap-2"><CheckCircle2 className="w-3 h-3" /> Times New Roman, 12pt</div>
                            <div className="text-xs font-bold text-green-400 flex items-center gap-2"><CheckCircle2 className="w-3 h-3" /> Double-spaced</div>
                            <div className="text-xs font-bold text-green-400 flex items-center gap-2"><CheckCircle2 className="w-3 h-3" /> Max 1500 words</div>
                            <div className="text-xs font-bold text-green-400 flex items-center gap-2"><CheckCircle2 className="w-3 h-3" /> .docx format</div>
                        </div>
                    </div>
                    <div className="mt-6 bg-ink-900 p-3 rounded text-xs text-center border border-white/5">
                        Writers who ignore guidelines create extra work. <strong className="text-gold">Instant rejection.</strong>
                    </div>
                </SecretBlock>

                {/* Secret 5 */}
                <SecretBlock
                    number="5"
                    icon={<Clock className="w-6 h-6 text-gold" />}
                    title="Timing Your Submission"
                    desc="When you submit affects your chances. Compete when editors are fresh."
                >
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div className="bg-ink-900/50 p-4 rounded border border-white/5">
                            <h5 className="font-bold text-green-400 mb-2 text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Best Times</h5>
                            <ul className="text-xs space-y-2 text-parchment/70">
                                <li><strong>First week:</strong> Editors are fresh and enthusiastic.</li>
                                <li><strong>Mid-cycle:</strong> Clear standards established.</li>
                                <li><strong>Tue-Thu, 9-11 AM:</strong> Peak productivity hours.</li>
                            </ul>
                        </div>
                        <div className="bg-ink-900/50 p-4 rounded border border-white/5">
                            <h5 className="font-bold text-red-400 mb-2 text-sm flex items-center gap-2"><XCircle className="w-4 h-4" /> Worst Times</h5>
                            <ul className="text-xs space-y-2 text-parchment/70">
                                <li><strong>Last day:</strong> Competing with procrastinators (Email #147 of 150).</li>
                                <li><strong>Weekend/Late Night:</strong> Buried under new emails.</li>
                            </ul>
                        </div>
                    </div>
                </SecretBlock>
            </section>

            {/* 3. Common Rejection Reasons */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-parchment mb-4">Common Rejection Reasons (And How to Avoid Them)</h3>

                <div className="space-y-4">
                    <RejectionReason
                        title="1. Doesn't Fit Theme"
                        problem="Writers submit favorite poem regardless of theme."
                        solution="Read theme strictly. When in doubt, write something new."
                    />
                    <RejectionReason
                        title="2. Too Many Clichés"
                        problem="Lazy writing signals inexperience (Love is fire, Tears like rain)."
                        solution="Ask 'Have I read this before?' Replace with specific experience."
                    />
                    <RejectionReason
                        title="3. Lacks Emotional Depth"
                        problem="Surface emotion ('I was sad')."
                        solution="Dig deeper. 'I was sad, then angry, then guilty, then tired.' Explore the mess."
                    />
                    <RejectionReason
                        title="4. Needs More Revision"
                        problem="Submitted first draft, only revised once."
                        solution="Follow the 15-day timeline. Don't rush."
                    />
                    <RejectionReason
                        title="5. Strong But Anthology Full"
                        problem="Poem is good, but theme is covered or anthology is full."
                        solution="Circumstantial, not about quality. Submit elsewhere immediately."
                    />
                </div>
            </section>

            {/* 4. Follow Up Question */}
            <section className="bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm text-center">
                <HelpCircle className="w-8 h-8 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-serif text-gold mb-2">The Follow-Up Question Nobody Asks</h3>
                <p className="text-parchment/70 italic text-sm mb-4">
                    "What can I learn from this for my next submission?" (Better than "What did I do wrong?")
                </p>
                <p className="text-parchment/80 max-w-2xl mx-auto leading-relaxed">
                    Rejection isn't an endpoint. It's redirection. Strong writers collect rejections while getting progressively better. The skills you're building compound. Keep writing. Keep submitting. Keep improving.
                </p>
            </section>

        </div>
    );
};

const SecretBlock = ({ number, icon, title, desc, children }: any) => (
    <div className="relative border-l-2 border-gold/30 pl-8 pb-4">
        <div className="absolute -left-[20px] top-0 flex items-center justify-center w-10 h-10 rounded-full bg-ink-900 border-2 border-gold text-gold font-bold font-serif shadow-lg z-10">
            {number}
        </div>
        <div className="flex items-center gap-3 mb-2">
            {icon}
            <h4 className="text-xl font-bold text-parchment font-serif">{title}</h4>
        </div>
        <p className="text-parchment/70 text-sm mb-6 max-w-3xl">{desc}</p>
        <div className="bg-ink-800/30 rounded-xl p-2 md:p-6 border border-white/5">
            {children}
        </div>
    </div>
);

const RejectionReason = ({ title, problem, solution }: any) => (
    <div className="bg-ink-900/40 border border-white/5 hover:border-gold/20 p-5 rounded-lg transition-all group">
        <h4 className="font-bold text-gold mb-3 text-lg font-serif group-hover:text-amber-300 transition-colors">{title}</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
                <span className="text-red-400 font-bold uppercase text-xs tracking-wider block mb-1">The Problem</span>
                <p className="text-parchment/70 leading-relaxed">{problem}</p>
            </div>
            <div>
                <span className="text-green-400 font-bold uppercase text-xs tracking-wider block mb-1">The Solution</span>
                <p className="text-parchment/70 leading-relaxed">{solution}</p>
            </div>
        </div>
    </div>
);
