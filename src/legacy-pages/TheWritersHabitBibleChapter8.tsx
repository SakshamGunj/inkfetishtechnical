import React, { useState } from 'react';
import { Leaf, Layers, AlertCircle, HelpCircle, CheckCircle2, ChevronDown, ChevronUp, Zap, Target, BookOpen, Crown } from 'lucide-react';

export const Chapter8Content = () => {
    return (
        <div className="space-y-16">

            {/* --- HERO --- */}
            <section className="space-y-6">
                <h3 className="text-3xl font-serif text-parchment leading-tight">
                    CHAPTER 8: <br />
                    <span className="text-gold">Advanced Strategies for Long-Term Success</span>
                </h3>
                <div className="bg-ink-900/50 p-6 rounded-xl border border-white/5 space-y-4">
                    <p className="text-parchment/80 font-serif leading-relaxed">
                        Month 1 was about discipline. Month 3 is the danger zone. Month 6 is when writing becomes your identity. Here's how to get there.
                    </p>
                </div>
            </section>

            {/* --- IDENTITY TREE VISUAL --- */}
            <section className="space-y-8">
                <div className="relative rounded-xl overflow-hidden border border-gold/20 group h-64 md:h-96">
                    <img
                        src="/images/habit_bible_identity_tree.png"
                        alt="The Writer's Identity Tree"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90" />
                    <div className="absolute bottom-6 left-6 right-6">
                        <h4 className="text-gold font-serif text-2xl mb-2 flex items-center gap-3">
                            <Leaf className="w-6 h-6" />
                            From Doing to Being
                        </h4>
                        <p className="text-white/70 text-sm max-w-lg">
                            The shift from "I write" to "I am a writer". Roots (habits) lead to Fruits (published books).
                        </p>
                    </div>
                </div>
            </section>

            {/* --- 3-MONTH DANGER ZONE --- */}
            <section className="bg-red-950/20 border border-red-500/20 p-8 rounded-2xl relative">
                <div className="flex items-center gap-3 mb-4 text-red-400">
                    <AlertCircle className="w-6 h-6" />
                    <h3 className="text-xl font-bold uppercase tracking-widest">The 3-Month Danger Zone</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6 text-sm text-parchment/80">
                    <div className="bg-black/20 p-4 rounded border border-white/5">
                        <strong className="block text-parchment mb-2">Months 1-2</strong>
                        <p className="opacity-70">Novelty & Motivation. Excitement carries you.</p>
                    </div>
                    <div className="bg-red-950/20 p-4 rounded border border-red-500/30 ring-1 ring-red-500/20">
                        <strong className="block text-red-200 mb-2">Month 3 (Danger)</strong>
                        <p className="opacity-90 text-red-100/70">Habit formed, but boredom hits. 80% quit here.</p>
                    </div>
                    <div className="bg-green-950/20 p-4 rounded border border-green-500/30">
                        <strong className="block text-green-200 mb-2">Month 6+</strong>
                        <p className="opacity-90 text-green-100/70">Automatic Identity. "I am a writer."</p>
                    </div>
                </div>
                <p className="mt-6 text-center text-xs opacity-60 italic">Boredom means you've succeeded at automation. Keep going.</p>
            </section>

            {/* --- HABIT STACKING --- */}
            <section className="space-y-6">
                <h3 className="text-2xl font-serif text-gold flex items-center gap-3 justify-center">
                    <Layers className="w-6 h-6" /> Habit Stacking Formula
                </h3>
                <div className="bg-ink-950 p-6 rounded-xl border border-white/10 text-center max-w-2xl mx-auto">
                    <p className="font-mono text-lg mb-6 text-parchment">
                        "After <span className="text-gold border-b border-gold/30">[CURRENT HABIT]</span>, I will <span className="text-green-400 border-b border-green-400/30">[NEW HABIT]</span>."
                    </p>
                    <div className="text-left space-y-3 text-sm text-parchment/70 bg-black/20 p-4 rounded-lg">
                        <p>• After morning writing (300w) -&gt; I will outline tomorrow's scene.</p>
                        <p>• After writing session -&gt; I will read 10 pages.</p>
                        <p>• After Sunday session -&gt; I will plan next week's targets.</p>
                    </div>
                </div>
            </section>

            {/* --- EMERGENCY PROTOCOLS --- */}
            <section className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h4 className="text-gold font-bold flex items-center gap-2">
                        <Zap className="w-5 h-5" /> 5-Min Warm-Ups
                    </h4>
                    <ul className="space-y-2 text-sm text-parchment/70">
                        <li className="bg-ink-950 p-3 rounded border border-white/5"><strong>Word Sprint:</strong> Free-associate for 2 mins.</li>
                        <li className="bg-ink-950 p-3 rounded border border-white/5"><strong>Sense Memory:</strong> Describe rain with 5 senses.</li>
                        <li className="bg-ink-950 p-3 rounded border border-white/5"><strong>Dialogue Only:</strong> 10 lines, no tags.</li>
                        <li className="bg-ink-950 p-3 rounded border border-white/5"><strong>Worst Paragraph:</strong> Write garbage on purpose.</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-red-400 font-bold flex items-center gap-2">
                        <ShieldAlertIcon className="w-5 h-5" /> Emergency Protocol
                    </h4>
                    <div className="bg-red-950/10 p-5 rounded-xl border border-red-500/20 space-y-3 text-sm">
                        <div className="flex justify-between text-red-200"><span>1. The 2-Min Rule</span><span className="opacity-50">Timer on.</span></div>
                        <div className="flex justify-between text-red-200"><span>2. Garbage Permission</span><span className="opacity-50">It can suck.</span></div>
                        <div className="flex justify-between text-red-200"><span>3. Future Self</span><span className="opacity-50">Do it for them.</span></div>
                        <div className="flex justify-between text-red-200"><span>4. Bare Minimum</span><span className="opacity-50">50 words.</span></div>
                        <div className="border-t border-red-500/20 pt-2 text-center text-xs text-red-400 italic">Beats zero every time.</div>
                    </div>
                </div>
            </section>

            {/* --- WRITER'S FAQ --- */}
            <section className="space-y-6">
                <h3 className="text-xl font-serif text-parchment text-center flex items-center justify-center gap-2">
                    <HelpCircle className="w-5 h-5 text-gold" /> Writer's Troubleshooting FAQ
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <FAQItem q="I missed 3 days. Is it ruined?" a="No. Restart today. Comebacks are part of the process." />
                    <FAQItem q="Everything I write is garbage." a="Good. Drafts are raw material. Bad drafts become good books." />
                    <FAQItem q="I'm too tired after work." a="Write before work. Or lower target to 150 words. Tired &gt; Zero." />
                    <FAQItem q="I feel like a fraud." a="Impostor syndrome means you care. Write anyway." />
                    <FAQItem q="Family doesn't take me seriously." a="You don't need permission. Finished books earn respect." />
                    <FAQItem q="I start but never finish." a="Stop starting. Finish ONE. You have a finishing problem." />
                </div>
            </section>

            {/* --- CONCLUSION & ACTION --- */}
            <section className="bg-gradient-to-br from-gold/10 to-ink-950 border border-gold/30 p-8 rounded-2xl relative text-center">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

                <Crown className="w-12 h-12 text-gold mx-auto mb-4" />
                <h2 className="text-3xl font-serif text-parchment mb-4">Your Writing Life Starts Now</h2>
                <p className="text-parchment/70 max-w-2xl mx-auto mb-8 text-sm leading-relaxed">
                    You're not becoming a writer someday. You became one the moment you decided to show up daily.
                    The only difference between you and published authors? They didn't quit on the hard days.
                </p>

                <div className="inline-block text-left bg-black/40 p-6 rounded-xl border border-gold/20 max-w-md mx-auto w-full">
                    <h5 className="text-gold font-bold mb-4 flex items-center gap-2 uppercase tracking-wide text-xs">
                        <Target className="w-4 h-4" /> Your 24-Hour Action Plan
                    </h5>
                    <div className="space-y-3 text-sm text-parchment/80">
                        <div className="flex gap-3 items-center"><div className="w-4 h-4 border border-gold rounded-sm shrink-0" /> Choose 3 starter habits.</div>
                        <div className="flex gap-3 items-center"><div className="w-4 h-4 border border-gold rounded-sm shrink-0" /> Set exact time & place.</div>
                        <div className="flex gap-3 items-center"><div className="w-4 h-4 border border-gold rounded-sm shrink-0" /> Clear workspace.</div>
                        <div className="flex gap-3 items-center"><div className="w-4 h-4 border border-gold rounded-sm shrink-0" /> Write 100 words NOW.</div>
                    </div>
                </div>

                <p className="mt-8 text-gold font-serif italic text-lg">
                    "Consistency is the only magic that exists."
                </p>
            </section>

        </div>
    );
};

// --- SUB-COMPONENTS ---

const ShieldAlertIcon = (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
); // Using custom SVG since ShieldAlert might not be in the lucide-react version available or was named differently.

const FAQItem = ({ q, a }: any) => (
    <div className="bg-ink-950 p-4 rounded-lg border border-white/5 hover:border-gold/30 transition-colors">
        <h5 className="text-gold font-bold text-xs mb-1 uppercase tracking-wider">Q: {q}</h5>
        <p className="text-sm text-parchment/80">A: {a}</p>
    </div>
);
