import React, { useState } from 'react';
import { Battery, Zap, AlertTriangle, Repeat, XCircle, CheckCircle2, IndianRupee, Clock, Coffee, BookOpen } from 'lucide-react';

export const Chapter1Content = () => {
    return (
        <div className="space-y-16">

            {/* --- HERO: THE PROBLEM --- */}
            <section className="space-y-6">
                <h3 className="text-3xl font-serif text-parchment leading-tight">
                    CHAPTER 1: <br />
                    <span className="text-red-400">Why Willpower is Killing Your Writing</span>
                </h3>
                <div className="bg-ink-900/50 p-6 rounded-xl border border-white/5 space-y-4">
                    <p className="text-parchment/80 font-serif leading-relaxed">
                        Let me guess. You've tried to "just be disciplined" before. How'd that work out?
                    </p>
                    <p className="text-parchment/80 font-serif leading-relaxed">
                        You promised yourself you'd write every morning. Lasted three days. Or you swore you'd write 1000 words daily. Day one: 1200 words. Day three: Too tired. Day four: Gave up.
                    </p>
                </div>
            </section>

            {/* --- THE WILLPOWER MYTH (VISUAL) --- */}
            <section className="space-y-8">
                <div className="relative rounded-xl overflow-hidden border border-gold/20 group">
                    <img
                        src="/images/habit_bible_willpower_loop.png"
                        alt="Willpower Battery vs Habit Loop"
                        className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6">
                        <h4 className="text-white font-serif text-2xl mb-2 flex items-center gap-3">
                            <Battery className="w-6 h-6 text-red-500" />
                            The Willpower Myth
                        </h4>
                        <p className="text-white/80 text-sm max-w-xl">
                            Willpower is a battery. Every decision you make drains it. By 6 PM, your battery is at 2%. This is why "just be disciplined" fails 94% of the time. You're not fighting laziness. You're fighting biology.
                        </p>
                    </div>
                </div>

                {/* Indian Context Highlight */}
                <div className="bg-orange-950/20 p-6 rounded-xl border border-orange-500/20 flex gap-4">
                    <div className="shrink-0 mt-1">
                        <IndianRupee className="w-6 h-6 text-orange-400" />
                    </div>
                    <div>
                        <h5 className="font-bold text-orange-200 mb-2">The Reality of Indian Life</h5>
                        <p className="text-sm text-orange-100/70 leading-relaxed">
                            Add to this the reality of Indian life. Your mother wants help with dinner. Your father asks about exams. Friends want chai. Your boss needs a reply at 9 PM. Each interruption drains your willpower battery. No wonder you can't write consistently.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- THE HABIT LOOP --- */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-gold text-center">The Habit Loop Science (Simplified)</h3>
                <p className="text-center text-parchment/70 max-w-2xl mx-auto">
                    Habits don't require willpower. Think about brushing your teeth. You don't debate it. You just do it. That's what we're building.
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                    <LoopNode
                        step="1"
                        title="CUE"
                        desc="The trigger that starts the behavior."
                        example="Ex: Pouring morning coffee."
                        icon={<Coffee className="w-5 h-5" />}
                    />
                    <LoopNode
                        step="2"
                        title="ROUTINE"
                        desc="The behavior itself."
                        example="Ex: Writing 200 words."
                        icon={<Repeat className="w-5 h-5" />}
                    />
                    <LoopNode
                        step="3"
                        title="REWARD"
                        desc="The satisfaction that reinforces it."
                        example="Ex: First sip of coffee."
                        icon={<Zap className="w-5 h-5" />}
                    />
                </div>

                <div className="bg-white/5 p-6 rounded-xl border border-white/5 mx-auto max-w-3xl">
                    <h5 className="font-bold text-parchment mb-2">Real Example: Meera, Mumbai Copywriter</h5>
                    <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-parchment/60">
                        <span>Too tired after work.</span>
                        <span className="hidden md:inline">→</span>
                        <span>Anchored writing to morning chai.</span>
                        <span className="hidden md:inline">→</span>
                        <span>Kettle On (Cue) → Write while boiling (Routine) → First sip (Reward).</span>
                        <span className="hidden md:inline">→</span>
                        <span className="text-gold font-bold">6 Months later: 80,000 word novel done.</span>
                    </div>
                </div>
            </section>

            {/* --- 5 MISTAKES --- */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-parchment mb-6">The 5 Habit Formation Mistakes</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <MistakeCard
                        num="1"
                        title="Starting Too Big"
                        desc="'I'll write 2000 words!' fails by Day 4. Start with 50 words. One paragraph."
                    />
                    <MistakeCard
                        num="2"
                        title="No Clear Trigger"
                        desc="'When I feel inspired' is not a trigger. Attach writing to an existing daily habit."
                    />
                    <MistakeCard
                        num="3"
                        title="Unclear Reward"
                        desc="If there's no immediate satisfaction/dopamine, your brain won't repeat it."
                    />
                    <MistakeCard
                        num="4"
                        title="Fighting Biology"
                        desc="Night owl writing at 5 AM? Torture. Work with your natural rhythm."
                    />
                    <MistakeCard
                        num="5"
                        title="Skipping Identity"
                        desc="Don't say 'I want to be a writer'. Say 'I AM a writer who writes'."
                    />
                </div>
            </section>

            {/* --- ACTION & QUICK WIN --- */}
            <section className="grid md:grid-cols-2 gap-8">
                <div className="bg-ink-950 p-6 rounded-xl border border-gold/20">
                    <div className="flex items-center gap-3 mb-4">
                        <Clock className="w-5 h-5 text-gold" />
                        <h4 className="font-bold text-parchment uppercase tracking-widest text-sm">Action Step: Audit</h4>
                    </div>
                    <p className="text-sm text-parchment/60 mb-4">List your last 5 writing sessions. What triggered them? If you can't remember, that's your pattern. Random = Failure.</p>
                    <div className="space-y-2 bg-black/20 p-4 rounded text-xs font-mono text-parchment/40">
                        <div>Date: _____ Time: _____ Trigger: _____</div>
                        <div>Date: _____ Time: _____ Trigger: _____</div>
                        <div>Date: _____ Time: _____ Trigger: _____</div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-gold/10 to-gold/5 p-6 rounded-xl border border-gold/30">
                    <div className="flex items-center gap-3 mb-4">
                        <Zap className="w-5 h-5 text-gold" />
                        <h4 className="font-bold text-gold uppercase tracking-widest text-sm">Quick Win</h4>
                    </div>
                    <p className="text-parchment/80 text-sm leading-relaxed mb-4">
                        Tonight: Set your notebook next to your coffee mug. Tomorrow: Write <strong className="text-gold">one sentence</strong> before your first sip.
                    </p>
                    <p className="text-xs text-parchment/50 italic">
                        You've just started building your habit loop.
                    </p>
                </div>
            </section>

        </div>
    );
};

// --- SUB-COMPONENTS ---

const LoopNode = ({ step, title, desc, example, icon }: any) => (
    <div className="bg-ink-900/40 p-6 rounded-xl border border-white/5 text-center hover:border-gold/20 transition-all">
        <div className="w-12 h-12 rounded-full bg-white/5 mx-auto flex items-center justify-center text-gold mb-4 border border-white/5">
            {icon}
        </div>
        <div className="text-xs font-bold text-gold/50 mb-1">STEP {step}</div>
        <h4 className="font-bold text-lg text-parchment mb-2">{title}</h4>
        <p className="text-sm text-parchment/60 mb-3">{desc}</p>
        <div className="text-xs text-parchment/40 italic bg-black/20 py-1 rounded">{example}</div>
    </div>
);

const MistakeCard = ({ num, title, desc }: any) => (
    <div className="flex gap-4 p-4 rounded-lg bg-red-950/10 border border-red-900/20 hover:bg-red-950/20 transition-colors">
        <div className="text-red-500 font-bold font-serif text-xl opacity-50">0{num}</div>
        <div>
            <h5 className="font-bold text-red-200 text-sm mb-1">{title}</h5>
            <p className="text-xs text-red-100/60 leading-relaxed">{desc}</p>
        </div>
    </div>
);
