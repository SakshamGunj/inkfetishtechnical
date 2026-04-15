import React, { useState } from 'react';
import { Flag, Star, Map, AlertTriangle, CheckSquare, ArrowRight, Zap, Trophy, ShieldAlert, BarChart } from 'lucide-react';

export const Chapter7Content = () => {
    return (
        <div className="space-y-16">

            {/* --- HERO --- */}
            <section className="space-y-6">
                <h3 className="text-3xl font-serif text-parchment leading-tight">
                    CHAPTER 7: <br />
                    <span className="text-gold">The 30-Day Habit Installation Plan</span>
                </h3>
                <div className="bg-ink-900/50 p-6 rounded-xl border border-white/5 space-y-4">
                    <p className="text-parchment/80 font-serif leading-relaxed">
                        This is your roadmap. Follow it exactly. In 30 days, writing becomes automatic. Most people quit by Day 14. You won't.
                    </p>
                </div>
            </section>

            {/* --- ROADMAP VISUAL --- */}
            <section className="space-y-8">
                <div className="relative rounded-xl overflow-hidden border border-gold/20 group h-64 md:h-96">
                    <img
                        src="/images/habit_bible_30day_roadmap.png"
                        alt="30-Day Habit Installation Roadmap"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90" />
                    <div className="absolute bottom-6 left-6 right-6">
                        <h4 className="text-gold font-serif text-2xl mb-2 flex items-center gap-3">
                            <Map className="w-6 h-6" />
                            Your Journey to Automation
                        </h4>
                        <p className="text-white/70 text-sm">Week 1: Foundation → Week 2: Momentum → Week 3: Refinement → Week 4: Automation.</p>
                    </div>
                </div>
            </section>

            {/* --- WEEKLY BREAKDOWN TABS --- */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-parchment text-center">Week-by-Week Execution</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <WeekCard
                        title="Week 1: Foundation"
                        focus="Consistency &gt; Quantity"
                        target="50-150 words"
                        tasks={[
                            "Day 1-4: Exact time/place. 50-100w.",
                            "Day 5: Track visibly.",
                            "Day 7: Celebrate Week 1 completion."
                        ]}
                    />
                    <WeekCard
                        title="Week 2: Momentum"
                        focus="Habit feels 'normal'"
                        target="200 words"
                        tasks={[
                            "Maintain identical time/place.",
                            "Add Power-Off ritual.",
                            "Defense: Trust process, not feelings."
                        ]}
                    />
                    <WeekCard
                        title="Week 3: Refinement"
                        focus="Remove friction"
                        target="300 words"
                        tasks={[
                            "Mid-point review: What's working?",
                            "Identify & kill top 2 obstacles.",
                            "Refine environment."
                        ]}
                    />
                    <WeekCard
                        title="Week 4: Automation"
                        focus="Default Behavior"
                        target="300-400 words"
                        tasks={[
                            "Habit feels automatic.",
                            "Flow state comes faster.",
                            "Celebrate: Top 5% Finisher."
                        ]}
                    />
                </div>
            </section>

            {/* --- 30-DAY TRACKER --- */}
            <section className="bg-ink-950 border border-gold/30 p-8 rounded-2xl relative">
                <div className="flex items-center gap-3 mb-6">
                    <CheckSquare className="w-6 h-6 text-gold" />
                    <h3 className="text-xl font-bold text-parchment uppercase tracking-widest">30-Day Installation Tracker</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8 font-mono text-xs">
                    {/* Week 1 */}
                    <div className="space-y-2">
                        <div className="text-gold font-bold mb-2 border-b border-white/10 pb-1">WEEK 1: FOUNDATION</div>
                        <div className="grid grid-cols-4 gap-2">
                            {['D1: 50w', 'D2: 75w', 'D3: 100w', 'D4: 100w', 'D5: 100w', 'D6: 125w', 'D7: 150w'].map((t, i) => (
                                <div key={i} className="flex gap-1 items-center opacity-70 hover:opacity-100 cursor-pointer">
                                    <div className="w-3 h-3 border border-white/40 rounded-sm"></div>
                                    <span>{t}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Week 2 */}
                    <div className="space-y-2">
                        <div className="text-gold font-bold mb-2 border-b border-white/10 pb-1">WEEK 2: MOMENTUM</div>
                        <div className="grid grid-cols-4 gap-2">
                            {['D8: 200w', 'D9', 'D10', 'D11', 'D12', 'D13', 'D14'].map((t, i) => (
                                <div key={i} className="flex gap-1 items-center opacity-70 hover:opacity-100 cursor-pointer">
                                    <div className="w-3 h-3 border border-white/40 rounded-sm"></div>
                                    <span>{t}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Week 3 */}
                    <div className="space-y-2">
                        <div className="text-gold font-bold mb-2 border-b border-white/10 pb-1">WEEK 3: REFINEMENT</div>
                        <div className="grid grid-cols-4 gap-2">
                            {['D15', 'D16', 'D17', 'D18', 'D19', 'D20', 'D21'].map((t, i) => (
                                <div key={i} className="flex gap-1 items-center opacity-70 hover:opacity-100 cursor-pointer">
                                    <div className="w-3 h-3 border border-white/40 rounded-sm"></div>
                                    <span>{t}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Week 4 */}
                    <div className="space-y-2">
                        <div className="text-gold font-bold mb-2 border-b border-white/10 pb-1">WEEK 4: AUTOMATION</div>
                        <div className="grid grid-cols-4 gap-2">
                            {['D22', 'D23', 'D24', 'D25', 'D26', 'D27', 'D28', 'D29', '30: DONE!'].map((t, i) => (
                                <div key={i} className="flex gap-1 items-center opacity-70 hover:opacity-100 cursor-pointer">
                                    <div className="w-3 h-3 border border-white/40 rounded-sm"></div>
                                    <span>{t}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                    <p className="text-center text-sm text-parchment/60">
                        <Trophy className="w-4 h-4 inline-block text-gold mr-2" />
                        <strong>Goal:</strong> "I am a writer" (Identity Shift).
                    </p>
                </div>
            </section>

            {/* --- WARNING SIGNS --- */}
            <section className="space-y-6">
                <h3 className="text-xl font-serif text-red-400 flex items-center gap-2 justify-center">
                    <ShieldAlert className="w-5 h-5" /> Warning Signs & Quick Fixes
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <WarningCard sign="Missing 2+ days" fix="Emergency Minimum. Write 1 sentence today." />
                    <WarningCard sign="Dreading writing time" fix="Lower target by 50%. Make it fun." />
                    <WarningCard sign="Rescheduling constantly" fix="Time slot is wrong. Pick new protected time." />
                    <WarningCard sign="Hating every word" fix="Stop editing. Separate creation from judgment." />
                </div>
            </section>

        </div>
    );
};

// --- SUB-COMPONENTS ---

const WeekCard = ({ title, focus, target, tasks }: any) => (
    <div className="bg-ink-950 p-6 rounded-xl border border-white/10 hover:border-gold/30 transition-colors">
        <h4 className="font-bold text-lg text-gold mb-1">{title}</h4>
        <div className="text-xs text-parchment/50 uppercase tracking-widest mb-4">Focus: {focus}</div>
        <div className="bg-black/20 p-2 rounded mb-4 text-center border border-white/5">
            <span className="text-parchment/70 text-sm">Target: </span>
            <span className="text-white font-bold">{target}</span>
        </div>
        <ul className="space-y-2 text-sm text-parchment/80">
            {tasks.map((t: string, i: number) => (
                <li key={i} className="flex gap-2 items-start opacity-80">
                    <ArrowRight className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    {t}
                </li>
            ))}
        </ul>
    </div>
);

const WarningCard = ({ sign, fix }: any) => (
    <div className="bg-red-950/10 p-4 rounded-lg border border-red-500/10 flex justify-between items-center gap-4">
        <div>
            <div className="text-red-400 font-bold text-sm mb-1">{sign}</div>
            <div className="text-parchment/60 text-xs">Fix: {fix}</div>
        </div>
        <div className="bg-red-500/10 p-2 rounded-full text-red-500">
            <Zap className="w-4 h-4" />
        </div>
    </div>
);
