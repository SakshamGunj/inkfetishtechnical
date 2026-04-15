import React from 'react';
import { Sun, Clock, MapPin, BarChart3, BookOpen, Calendar, PowerOff, CheckSquare, Zap, AlertCircle, Quote } from 'lucide-react';

export const Chapter2Content = () => {
    return (
        <div className="space-y-16">

            {/* --- HERO --- */}
            <section className="space-y-6">
                <h3 className="text-3xl font-serif text-parchment leading-tight">
                    CHAPTER 2: <br />
                    <span className="text-gold">The 7 Non-Negotiable Writing Habits</span>
                </h3>
                <div className="bg-ink-900/50 p-6 rounded-xl border border-white/5">
                    <p className="text-parchment/80 font-serif leading-relaxed">
                        You don't need 47 habits. You need these 7. Pick 3 to start with. Master them. Then add more.
                    </p>
                </div>
            </section>

            {/* --- HABIT 1: MORNING PAGES --- */}
            <section className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative rounded-xl overflow-hidden border border-gold/20 h-64 md:h-full group">
                    <img
                        src="/images/habit_bible_day2_foundation.png"
                        alt="Morning Pages & 15-Minute Rule"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                        <div className="text-gold font-bold flex items-center gap-2">
                            <Sun className="w-5 h-5" />
                            Habit 1: Morning Pages
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <HabitBenefit
                        title="One-line benefit"
                        desc="Clears mental clutter so real writing flows."
                    />
                    <HabitBlock title="Why it works">
                        Your brain is full of noise. Morning pages drain the swamp so clear water can flow.
                    </HabitBlock>
                    <div className="bg-white/5 p-4 rounded-lg text-sm text-parchment/70 space-y-2">
                        <div className="font-bold text-parchment mb-2">How to implement:</div>
                        <ul className="list-disc pl-4 space-y-1">
                            <li>First thing after waking, before social media</li>
                            <li>Write 3 pages of stream-of-consciousness garbage</li>
                            <li>Don't think. Don't judge. Just dump.</li>
                            <li>Nobody reads this. Ever.</li>
                        </ul>
                    </div>
                    <ExampleBlock
                        name="Rajesh, Bangalore Software Engineer"
                        story="Couldn't write after work due to stress. Started 5-min morning brain dumps. Drained the noise. Now writes 500 words every evening."
                    />
                    <QuickWin>
                        Tomorrow morning: Write one page of complete nonsense before checking your phone. Feel the lightness.
                    </QuickWin>
                </div>
            </section>

            {/* --- HABIT 2: THE 15-MINUTE RULE --- */}
            <section className="bg-ink-900/30 p-8 rounded-2xl border border-white/5 space-y-6">
                <div className="flex items-center gap-3 text-gold mb-2">
                    <Clock className="w-6 h-6" />
                    <h4 className="text-2xl font-serif">Habit 2: The 15-Minute Rule</h4>
                </div>
                <HabitBenefit
                    title="One-line benefit"
                    desc="Eliminates 'I don't have time' excuse forever."
                />
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <p className="text-parchment/70 leading-relaxed text-sm">
                            Fifteen minutes daily beats three hours monthly. Your brain builds habits through repetition, not duration.
                        </p>
                        <div className="bg-black/20 p-4 rounded text-sm space-y-2 border-l-2 border-gold/50">
                            <strong>How to implement:</strong>
                            <ul className="list-disc pl-4 text-parchment/60 space-y-1">
                                <li>Commit to exactly 15 minutes, not more</li>
                                <li>Set a timer on your phone</li>
                                <li><strong>Stop when it beeps</strong>, even mid-flow</li>
                                <li>Stopping creates anticipation for tomorrow</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <ExampleBlock
                            name="Priya, Delhi Single Mother"
                            story="Found 15 mins during kids' classes. Wrote a 75-page poetry collection in 8 months. Published it."
                        />
                        <div className="mt-4 flex gap-3 text-xs text-red-300 bg-red-950/20 p-3 rounded border border-red-900/30">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            Mistake: Extending to 2 hours on day 1. Discipline beats intensity.
                        </div>
                    </div>
                </div>
            </section>

            {/* --- HABIT 3, 4, 5 (GRID) --- */}
            <section className="grid md:grid-cols-3 gap-6">
                {/* HABIT 3 */}
                <HabitGridCard
                    icon={<MapPin className="w-5 h-5" />}
                    title="Habit 3: Same Time, Same Place"
                    benefit="Your brain automates the 'decision to write'."
                    implement={["Pick ONE time", "Pick ONE spot", "Anchor to existing habit"]}
                    example="Pooja writes 6:15 AM at her tiny study desk. The spot triggers creative mode instantly."
                    win="Choose your exact time and spot right now. Calendar it."
                />
                {/* HABIT 4 */}
                <HabitGridCard
                    icon={<BarChart3 className="w-5 h-5" />}
                    title="Habit 4: Daily Tracking"
                    benefit="What gets measured gets managed."
                    implement={["Pick daily target (start small)", "Track in notes/journal", "Don't break the chain"]}
                    example="Arjun tracked 150 words daily. Monthly total of 4,500 motivated him. Finished novella in 4 months."
                    win="Today's target: 100 words. Track them."
                />
                {/* HABIT 5 */}
                <HabitGridCard
                    icon={<BookOpen className="w-5 h-5" />}
                    title="Habit 5: Read Before Write"
                    benefit="Fills creative well and primes brain."
                    implement={["Read 10 pages before session", "Choose quality writing", "Read actively for technique"]}
                    example="Kavya reads 2 poems before writing. Didn't copy, just absorbed. Imagery improved in 3 months."
                    win="Read 5 pages tonight. Use one technique tomorrow."
                />
            </section>

            {/* --- HABIT 6 & 7 (SPLIT) --- */}
            <section className="grid md:grid-cols-2 gap-8">
                {/* HABIT 6 */}
                <div className="bg-ink-950 p-6 rounded-xl border border-white/5 hover:border-gold/20 transition-colors">
                    <div className="flex items-center gap-3 text-gold mb-4">
                        <Calendar className="w-5 h-5" />
                        <h4 className="font-serif text-lg font-bold">Habit 6: Weekly Review</h4>
                    </div>
                    <p className="text-parchment/60 text-sm mb-4">Data reveals truth that feelings hide.</p>
                    <ul className="text-sm text-parchment/70 space-y-2 mb-4 bg-black/20 p-4 rounded border border-white/5">
                        <li className="flex gap-2"><CheckSquare className="w-4 h-4 text-green-500" /> Count Total Words</li>
                        <li className="flex gap-2"><CheckSquare className="w-4 h-4 text-green-500" /> Identify Obstacles</li>
                        <li className="flex gap-2"><CheckSquare className="w-4 h-4 text-green-500" /> Adjust One Thing</li>
                    </ul>
                    <ExampleBlock
                        name="Rohit"
                        story="Realized Thursday nights never worked. Moved quota to Sunday. Consistency jumped 60% -> 95%."
                    />
                </div>

                {/* HABIT 7 */}
                <div className="bg-ink-950 p-6 rounded-xl border border-white/5 hover:border-gold/20 transition-colors">
                    <div className="flex items-center gap-3 text-gold mb-4">
                        <PowerOff className="w-5 h-5" />
                        <h4 className="font-serif text-lg font-bold">Habit 7: Power-Off Ritual</h4>
                    </div>
                    <p className="text-parchment/60 text-sm mb-4">Proper endings create clean starts.</p>
                    <ul className="text-sm text-parchment/70 space-y-2 mb-4 bg-black/20 p-4 rounded border border-white/5">
                        <li className="flex gap-2"><Zap className="w-4 h-4 text-gold" /> Stop mid-sentence</li>
                        <li className="flex gap-2"><Zap className="w-4 h-4 text-gold" /> Write note for tomorrow</li>
                        <li className="flex gap-2"><Zap className="w-4 h-4 text-gold" /> Close with intention</li>
                    </ul>
                    <ExampleBlock
                        name="Neha"
                        story="Always stops mid-dialogue. Next day knows exactly where to start. No blank page staring."
                    />
                </div>
            </section>

            {/* --- ACTION SECTION --- */}
            <section className="bg-gold/5 p-8 rounded-2xl border border-gold/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl -mr-16 -mt-16" />

                <h3 className="text-2xl font-serif text-gold mb-6 text-center">ACTION SECTION: Pick Your 3 Starter Habits</h3>
                <p className="text-center text-parchment/60 mb-8 max-w-xl mx-auto">
                    Don't try all 7. Pick 3. Master them for 30 days.
                </p>

                <div className="bg-ink-950/80 p-6 rounded-xl border border-white/10 max-w-2xl mx-auto space-y-6 font-mono text-sm text-parchment/70">
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex items-end gap-2">
                                    <span className="text-gold font-bold">Habit {i}:</span>
                                    <div className="flex-1 border-b border-white/10 h-6"></div>
                                </div>
                                <div className="flex items-end gap-2 pl-4">
                                    <span className="text-xs opacity-50">Why:</span>
                                    <div className="flex-1 border-b border-white/10 h-6"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 border-t border-white/10">
                        <p className="mb-4">My commitment: I will practice these 3 habits daily for 30 days.</p>
                        <div className="flex items-end gap-2">
                            <span>Signature:</span>
                            <div className="w-48 border-b border-gold/30 h-6"></div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center bg-white/5 p-4 rounded-lg inline-block mx-auto w-full">
                    <div className="flex justify-center gap-2 text-gold mb-2"><Quote className="w-4 h-4 fill-gold" /><Quote className="w-4 h-4 fill-gold" /></div>
                    <p className="font-serif italic text-parchment/80">
                        "A mediocre habit done daily beats a perfect habit done occasionally. Done beats perfect every single time."
                    </p>
                </div>
            </section>

        </div>
    );
};

// --- SUB-COMPONENTS ---

const HabitBenefit = ({ title, desc }: any) => (
    <div className="flex gap-2 items-baseline text-sm">
        <span className="text-gold font-bold uppercase tracking-wide shrink-0">{title}:</span>
        <span className="text-parchment/80 italic">{desc}</span>
    </div>
);

const HabitBlock = ({ title, children }: any) => (
    <div>
        <h5 className="font-bold text-parchment mb-1 text-sm">{title}:</h5>
        <div className="text-parchment/70 text-sm leading-relaxed">{children}</div>
    </div>
);

const ExampleBlock = ({ name, story }: any) => (
    <div className="bg-green-950/20 p-4 rounded-lg border border-green-900/20 text-sm mt-4">
        <div className="text-green-400 font-bold mb-1 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            Example: {name}
        </div>
        <p className="text-green-100/70 leading-relaxed">{story}</p>
    </div>
);

const QuickWin = ({ children }: any) => (
    <div className="bg-gold/10 p-4 rounded-lg border border-gold/20 text-sm flex gap-3">
        <Zap className="w-5 h-5 text-gold shrink-0 mt-0.5" />
        <p className="text-parchment/80"><strong className="text-gold">Quick Win:</strong> {children}</p>
    </div>
);

const HabitGridCard = ({ icon, title, benefit, implement, example, win }: any) => (
    <div className="bg-ink-900/40 p-5 rounded-xl border border-white/5 flex flex-col h-full hover:bg-ink-900/60 transition-colors group">
        <div className="text-gold mb-4 group-hover:scale-110 transition-transform duration-300 transform origin-left">{icon}</div>
        <h4 className="font-bold text-parchment mb-2">{title}</h4>
        <p className="text-xs text-parchment/50 mb-4 h-8">{benefit}</p>

        <div className="space-y-4 flex-1">
            <ul className="list-disc pl-4 text-xs text-parchment/70 space-y-1">
                {implement.map((item: string, i: number) => <li key={i}>{item}</li>)}
            </ul>
            <div className="bg-green-950/10 p-2 rounded border border-green-900/10 text-[10px] text-green-200/60">
                <strong>Ex:</strong> {example}
            </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/5 text-[10px] text-gold/80 italic">
            Win: {win}
        </div>
    </div>
);
