import React from 'react';
import { Shield, Skull, AlertOctagon, HelpCircle, Flame, EyeOff, XCircle, Zap, Activity, Repeat } from 'lucide-react';

export const Chapter4Content = () => {
    return (
        <div className="space-y-16">

            {/* --- HERO --- */}
            <section className="space-y-6">
                <h3 className="text-3xl font-serif text-parchment leading-tight">
                    CHAPTER 4: <br />
                    <span className="text-red-400">Bulletproof Your Writing Habit</span>
                </h3>
                <div className="bg-ink-900/50 p-6 rounded-xl border border-white/5 space-y-4">
                    <p className="text-parchment/80 font-serif leading-relaxed">
                        Your habit will be attacked. By life, by doubt, by exhaustion. Here's how to defend it.
                    </p>
                </div>
            </section>

            {/* --- SHIELD VISUAL --- */}
            <section className="space-y-8">
                <div className="relative rounded-xl overflow-hidden border border-gold/20 group h-64 md:h-96">
                    <img
                        src="/images/habit_bible_shield_defense.png"
                        alt="Writing Habit Defense Shield"
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-6 left-6 right-6">
                        <h4 className="text-gold font-serif text-2xl mb-2 flex items-center gap-3">
                            <Shield className="w-6 h-6" />
                            The Defense System
                        </h4>
                        <p className="text-white/70 text-sm">7 Habit Killers vs. Your Unbreakable Defense.</p>
                    </div>
                </div>
            </section>

            {/* --- THE 7 KILLERS --- */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-parchment text-center">The 7 Habit Killers</h3>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* KILLER 1: DECISION FATIGUE */}
                    <KillerCard
                        icon={<HelpCircle className="w-6 h-6" />}
                        title="1. Decision Fatigue"
                        attack="What should I write? Which project? Now or later?"
                        defense="Eliminate decisions. Decide the night before. Use 'If-Then' rules."
                        example="Preeti wasted mornings deciding. Now she plans at night. Decision time: 0. Writing: 100%."
                    />

                    {/* KILLER 2: PERFECTIONISM */}
                    <KillerCard
                        icon={<EyeOff className="w-6 h-6" />}
                        title="2. Perfectionism Paralysis"
                        attack="This sentence is terrible. I'm a fraud. Delete everything."
                        defense="NEVER edit while drafting. First drafts are raw material. Fix it later."
                        example="Amit deleted 3 drafts. Accepted 'shitty first draft' rule. Finished novel in 4 months."
                    />

                    {/* KILLER 3: COMPARISON */}
                    <KillerCard
                        icon={<Activity className="w-6 h-6" />}
                        title="3. Comparison Trap"
                        attack="That Instagram poet has 100k followers. I'm nobody."
                        defense="Unfollow triggering accounts. Their Chapter 20 is your Chapter 1. Stop consuming, start creating."
                        example="Diya quit social media for 90 days. Finished book. Came back to 25k followers."
                    />

                    {/* KILLER 4: SHINY OBJECT */}
                    <KillerCard
                        icon={<Zap className="w-6 h-6" />}
                        title="4. Shiny Object Syndrome"
                        attack="My NEW idea is so much better! I'll start that instead."
                        defense="Keep an 'Idea Parking Lot'. Write new ideas down, then return to current project. Finishers succeed."
                        example="Karan had 12 unfinished novels. Rule: Finish ONE. Now has 3 published books."
                    />

                    {/* KILLER 5 & 6 & 7 (Compact) */}
                    <div className="md:col-span-2 grid md:grid-cols-3 gap-6">
                        <KillerCardCompact
                            title="5. Life Emergencies"
                            attack="Sick. Family visiting. Crisis."
                            defense="2-Day Rule. Emergency min: 50 words."
                        />
                        <KillerCardCompact
                            title="6. Burnout"
                            attack="I hate writing now."
                            defense="Take breaks. Lower target. Use play."
                        />
                        <KillerCardCompact
                            title="7. Impostor Syndrome"
                            attack="Who am I to write?"
                            defense="Action cures fear. Write anyway."
                        />
                    </div>
                </div>
            </section>

            {/* --- THE 2-DAY RULE --- */}
            <section className="bg-red-950/20 border border-red-500/30 p-8 rounded-2xl text-center relative overflow-hidden group hover:bg-red-950/30 transition-colors">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-transparent" />
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-red-500/10 rounded-full blur-3xl" />

                <div className="inline-flex items-center gap-2 px-4 py-1 bg-red-500/10 rounded-full border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest mb-6">
                    <AlertOctagon className="w-4 h-4" /> Most Important Defense
                </div>

                <h3 className="text-3xl font-serif text-parchment mb-4">The 2-Day Rule</h3>
                <p className="text-xl text-parchment/80 font-serif italic max-w-2xl mx-auto mb-8">
                    Never skip two days in a row.
                </p>

                <div className="grid grid-cols-3 gap-4 text-xs font-mono max-w-lg mx-auto mb-8">
                    <div className="bg-ink-950 p-3 rounded opacity-50">1 Miss = Life</div>
                    <div className="bg-red-900/40 p-3 rounded border border-red-500/50 text-red-200">2 Misses = Danger</div>
                    <div className="bg-red-950 p-3 rounded border border-red-500 text-red-400 font-bold">3 Misses = Quit</div>
                </div>

                <p className="text-parchment/60 text-sm max-w-xl mx-auto">
                    If you miss today, tomorrow is non-negotiable. Even 50 words. The streak survives.
                </p>
            </section>

            {/* --- ACTION STEP: WHEN-THEN --- */}
            <section className="bg-ink-900 border border-gold/30 p-8 rounded-2xl relative">
                <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-6 h-6 text-gold" />
                    <h3 className="text-xl font-bold text-parchment uppercase tracking-widest">Action Step: Backup Plans</h3>
                </div>

                <p className="text-parchment/60 text-sm mb-6">"When [OBSTACLE], then I will [MINIMUM ACTION]."</p>

                <div className="bg-black/40 p-6 rounded-xl space-y-4 font-mono text-sm text-parchment/80 border border-white/5">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex gap-2 items-center">
                            <span className="text-gold opacity-50">When</span>
                            <div className="flex-1 border-b border-white/10 h-6"></div>
                            <span className="text-gold opacity-50">then I will</span>
                            <div className="flex-1 border-b border-white/10 h-6"></div>
                        </div>
                    ))}
                </div>

                <p className="text-center text-xs text-parchment/40 mt-6 uppercase tracking-widest">
                    Write these down. Plan instead of excuse.
                </p>
            </section>

        </div>
    );
};

// --- SUB-COMPONENTS ---

const KillerCard = ({ icon, title, attack, defense, example }: any) => (
    <div className="bg-ink-950 border border-white/10 rounded-xl p-6 hover:border-red-500/30 transition-colors group">
        <div className="flex justify-between items-start mb-4">
            <h4 className="font-bold text-parchment text-lg">{title}</h4>
            <div className="text-red-500/70 group-hover:text-red-500 transition-colors">{icon}</div>
        </div>

        <div className="space-y-3 mb-4">
            <div className="text-xs bg-red-950/20 p-2 rounded border border-red-900/10 text-red-200/70">
                <strong className="text-red-400">Attack:</strong> "{attack}"
            </div>
            <div className="text-xs bg-green-950/20 p-2 rounded border border-green-900/10 text-green-200/70">
                <strong className="text-green-400">Defense:</strong> {defense}
            </div>
        </div>

        <div className="text-[10px] text-parchment/40 border-t border-white/5 pt-3 italic">
            Ex: {example}
        </div>
    </div>
);

const KillerCardCompact = ({ title, attack, defense }: any) => (
    <div className="bg-ink-950 border border-white/10 rounded-xl p-4 hover:border-red-500/30 transition-colors">
        <h4 className="font-bold text-parchment text-sm mb-2">{title}</h4>
        <div className="space-y-2 text-xs">
            <p className="text-red-400/70">Attack: "{attack}"</p>
            <p className="text-green-400/70">Defense: {defense}</p>
        </div>
    </div>
);
