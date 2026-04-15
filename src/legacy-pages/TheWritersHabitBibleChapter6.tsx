import React from 'react';
import { BarChart2, CheckCircle2, XCircle, Calendar, Users, Trophy, Smartphone, Book, FileSpreadsheet, Link2 } from 'lucide-react';

export const Chapter6Content = () => {
    return (
        <div className="space-y-16">

            {/* --- HERO --- */}
            <section className="space-y-6">
                <h3 className="text-3xl font-serif text-parchment leading-tight">
                    CHAPTER 6: <br />
                    <span className="text-gold">Tracking & Accountability</span>
                </h3>
                <div className="bg-ink-900/50 p-6 rounded-xl border border-white/5 space-y-4">
                    <p className="text-parchment/80 font-serif leading-relaxed">
                        If you don't track it, you can't improve it. Data removes emotion. "I feel unproductive" becomes "I wrote 6,000 words this week."
                    </p>
                </div>
            </section>

            {/* --- CHAIN TRACKER VISUAL --- */}
            <section className="space-y-8">
                <div className="relative rounded-xl overflow-hidden border border-gold/20 group h-64 md:h-96">
                    <img
                        src="/images/habit_bible_chain_tracker.png"
                        alt="Don't Break The Chain Method"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90" />
                    <div className="absolute bottom-6 left-6 right-6">
                        <h4 className="text-gold font-serif text-2xl mb-2 flex items-center gap-3">
                            <Link2 className="w-6 h-6" />
                            Don't Break The Chain
                        </h4>
                        <p className="text-white/70 text-sm max-w-lg">
                            Jerry Seinfeld's secret: A wall calendar and a red marker. <br />
                            1 Day = Action. 2 Days = Habit. 365 Days = Identity.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- METRICS CHECKLIST --- */}
            <section className="grid md:grid-cols-2 gap-8">
                <div className="bg-green-950/20 p-6 rounded-xl border border-green-900/20 space-y-4">
                    <h5 className="text-green-400 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Track This
                    </h5>
                    <ul className="space-y-2 text-sm text-parchment/70">
                        <li className="flex gap-2 items-center"><div className="w-1.5 h-1.5 bg-green-500 rounded-full" />Daily Word Count</li>
                        <li className="flex gap-2 items-center"><div className="w-1.5 h-1.5 bg-green-500 rounded-full" />Days Completed (Streak)</li>
                        <li className="flex gap-2 items-center"><div className="w-1.5 h-1.5 bg-green-500 rounded-full" />Weekly & Monthly Totals</li>
                    </ul>
                </div>

                <div className="bg-red-950/20 p-6 rounded-xl border border-red-900/20 space-y-4">
                    <h5 className="text-red-400 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                        <XCircle className="w-4 h-4" /> Not This
                    </h5>
                    <ul className="space-y-2 text-sm text-parchment/70">
                        <li className="flex gap-2 items-center"><div className="w-1.5 h-1.5 bg-red-500 rounded-full" />"Quality" (Too subjective)</li>
                        <li className="flex gap-2 items-center"><div className="w-1.5 h-1.5 bg-red-500 rounded-full" />Social Media Engagement</li>
                        <li className="flex gap-2 items-center"><div className="w-1.5 h-1.5 bg-red-500 rounded-full" />Comparison to others</li>
                    </ul>
                </div>
            </section>

            {/* --- 3 TRACKING METHODS --- */}
            <section className="space-y-6">
                <h3 className="text-xl font-serif text-parchment text-center">3 Simple Tracking Methods</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    <MethodCard
                        icon={<Book className="w-5 h-5" />}
                        title="1. Bullet Journal"
                        desc="Paper & Pen. Tactile satisfaction. Visual grid."
                        bestFor="Lovers of handwriting & physical journals."
                    />
                    <MethodCard
                        icon={<FileSpreadsheet className="w-5 h-5" />}
                        title="2. Spreadsheet"
                        desc="Auto-calculations. Graphs. Cloud access."
                        bestFor="Data-driven minds who love patterns."
                    />
                    <MethodCard
                        icon={<Smartphone className="w-5 h-5" />}
                        title="3. Apps"
                        desc="Habitica, Streaks. Gamified points & nudges."
                        bestFor="Gamification lovers & phone users."
                    />
                </div>
            </section>

            {/* --- ACCOUNTABILITY & CELEBRATIONS --- */}
            <section className="grid md:grid-cols-2 gap-8">
                <div className="bg-ink-950 p-6 rounded-xl border border-white/5 space-y-4">
                    <div className="flex items-center gap-3 text-gold">
                        <Users className="w-5 h-5" />
                        <h4 className="font-bold">Accountability</h4>
                    </div>
                    <div className="space-y-4 text-sm">
                        <div className="p-3 bg-black/20 rounded border border-white/5">
                            <strong className="text-parchment block mb-1">Partner (Introvert)</strong>
                            <p className="text-parchment/60 text-xs">One focused friend. Specific goal sharing. Less noise.</p>
                        </div>
                        <div className="p-3 bg-black/20 rounded border border-white/5">
                            <strong className="text-parchment block mb-1">Community (Extrovert)</strong>
                            <p className="text-parchment/60 text-xs">Discord/Groups. Networking. Varied support.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-ink-950 p-6 rounded-xl border border-white/5 space-y-4">
                    <div className="flex items-center gap-3 text-gold">
                        <Trophy className="w-5 h-5" />
                        <h4 className="font-bold">Micro-Wins</h4>
                    </div>
                    <ul className="space-y-3 text-sm text-parchment/70">
                        <li className="flex justify-between border-b border-white/5 pb-2">
                            <span>7-Day Streak</span>
                            <span className="text-gold">Small Treat</span>
                        </li>
                        <li className="flex justify-between border-b border-white/5 pb-2">
                            <span>10k Words</span>
                            <span className="text-gold">Special Dinner</span>
                        </li>
                        <li className="flex justify-between border-b border-white/5 pb-2">
                            <span>Completed Draft</span>
                            <span className="text-gold">Weekend Trip</span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* --- ACTION STEP: TRACKING TEMPLATE --- */}
            <section className="bg-white/5 border border-white/10 p-8 rounded-2xl relative overflow-hidden font-mono text-sm">
                <div className="flex items-center gap-3 mb-6">
                    <Calendar className="w-6 h-6 text-gold" />
                    <h3 className="text-xl font-bold text-parchment uppercase tracking-widest font-sans">Monthly Progress Template</h3>
                </div>

                <div className="space-y-6 text-parchment/60">
                    <div className="text-center border-b border-white/10 pb-4">
                        MONTH: <span className="inline-block w-32 border-b border-white/20"></span>
                    </div>

                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-black/20 p-4 rounded border border-white/5">
                            <div className="text-gold font-bold mb-2">WEEK {i}</div>
                            <div className="grid grid-cols-7 gap-1 text-[10px] uppercase tracking-wider mb-2 text-center opacity-50">
                                <div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
                            </div>
                            <div className="grid grid-cols-7 gap-2 mb-3">
                                {[...Array(7)].map((_, d) => (
                                    <div key={d} className="h-8 bg-white/5 rounded border border-white/5" />
                                ))}
                            </div>
                            <div className="flex justify-between text-xs opacity-70">
                                <span>Total: ______ words</span>
                                <span>Streak: ___ days</span>
                            </div>
                        </div>
                    ))}

                    <div className="pt-4 flex justify-between text-parchment font-bold">
                        <span>MONTHLY TOTAL: _________</span>
                        <span>LONGEST STREAK: _________</span>
                    </div>
                </div>

                <p className="text-center text-xs text-parchment/40 mt-8 uppercase tracking-widest font-sans">
                    Setup Tonight. Review Sundays. Celebrating Progress.
                </p>
            </section>

        </div>
    );
};

// --- SUB-COMPONENTS ---

const MethodCard = ({ icon, title, desc, bestFor }: any) => (
    <div className="bg-ink-950 p-5 rounded-xl border border-white/5 hover:border-gold/30 transition-colors text-center group">
        <div className="text-gold mb-3 flex justify-center group-hover:scale-110 transition-transform">{icon}</div>
        <h4 className="font-bold text-parchment text-sm mb-2">{title}</h4>
        <p className="text-xs text-parchment/60 mb-3 leading-relaxed h-8">{desc}</p>
        <div className="text-[10px] text-parchment/40 border-t border-white/5 pt-2 italic">
            Best for: {bestFor}
        </div>
    </div>
);
