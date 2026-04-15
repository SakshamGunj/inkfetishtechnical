import React from 'react';
import {
    Clock,
    Calendar,
    PenTool,
    MessageCircle,
    BarChart2,
    Zap,
    AlertTriangle,
    Shield,
    Heart,
    Rocket,
    CheckCircle2,
    TrendingUp,
    Layers,
    Share2,
    Users
} from 'lucide-react';

export const Chapter8Content = () => {
    return (
        <div className="space-y-16">

            {/* --- THE DAILY ROUTINE --- */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-gold flex items-center gap-3">
                    <Clock className="w-5 h-5" />
                    The Daily Routine of a 200K Page
                </h3>

                <div className="bg-ink-900/50 p-6 rounded-xl border border-white/5 space-y-6">
                    <p className="text-parchment/80 font-serif leading-relaxed text-center italic">
                        Consistency at scale requires systems. Here is my exact routine.
                    </p>

                    {/* Hero Image: Growth Dashboard */}
                    <div className="relative group rounded-xl overflow-hidden shadow-2xl border border-gold/20 mb-8">
                        <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                        <img
                            src="/images/blueprint_growth_dashboard.png"
                            alt="Advanced Growth Dashboard"
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 right-4 bg-black/80 px-4 py-2 rounded-full border border-gold/30 text-green-400 text-xs font-mono flex items-center gap-2">
                            <TrendingUp className="w-3 h-3" />
                            GROWTH: OPTIMIZED
                        </div>
                    </div>

                    <div className="space-y-4">
                        <RoutineItem
                            time="Morning (7:00 AM)"
                            title="Community Audit"
                            tasks={['Check DMs (15m)', 'Check Insights (10m)', 'Engage (5m)']}
                        />
                        <RoutineItem
                            time="Content (10:00 AM)"
                            title="Creation Batching (3x/Week)"
                            tasks={['Mon: 10 Poems', 'Tue: 15 Designs', 'Thu: 7 Reels']}
                            highlight
                        />
                        <RoutineItem
                            time="Afternoon (2:00 PM)"
                            title="Posting & Response"
                            tasks={['Post Scheduled Content', 'Reply to Comments (First Hour)']}
                        />
                        <RoutineItem
                            time="Evening (9:00 PM)"
                            title="Stories & Connection"
                            tasks={['Post 5-7 Story Frames', 'Authentic Engagement (No Pods)']}
                        />
                    </div>
                </div>
            </section>

            {/* --- AUTOMATION & TOOLS --- */}
            <section className="space-y-12">
                <h3 className="text-3xl font-serif text-parchment text-center mb-12">The Tech Stack</h3>

                <div className="grid md:grid-cols-2 gap-6">
                    <ToolCard
                        icon={<Calendar className="w-5 h-5" />}
                        title="Scheduling"
                        tools="Later, Meta Business Suite"
                        desc="Schedule Feed/Reels. NEVER schedule Stories."
                    />
                    <ToolCard
                        icon={<PenTool className="w-5 h-5" />}
                        title="Design"
                        tools="Canva Pro"
                        desc="Use reusable templates. Cut design time to 2 mins."
                    />
                    <ToolCard
                        icon={<BarChart2 className="w-5 h-5" />}
                        title="Analytics"
                        tools="Instagram Insights"
                        desc="Track: Growth Rate, Engagement Rate, Saves."
                    />
                    <ToolCard
                        icon={<Zap className="w-5 h-5" />}
                        title="Caption AI"
                        tools="ChatGPT (Brainstorm Only)"
                        desc="Ask for hooks. Write caption yourself. AI has no soul."
                    />
                </div>
            </section>

            {/* --- BREAKING PLATEAUS --- */}
            <section className="space-y-8">
                <div className="bg-ink-950 p-8 rounded-2xl border border-red-900/30">
                    <h3 className="text-2xl font-serif text-white mb-6 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        Breaking Through Plateaus
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        <StrategyBlock
                            title="1. Content Refresh"
                            desc="Audit last 50 posts. If saturated, introduce new themes (e.g., healing vs heartbreak) or visuals."
                        />
                        <StrategyBlock
                            title="2. Niche Expansion"
                            desc="Expand slightly. 'Heartbreak' -> 'Emotional Poetry'. Test slowly."
                        />
                        <StrategyBlock
                            title="3. Platform Expansion"
                            desc="Don't rely solely on IG. Start YouTube Shorts, Pinterest (Huge for poetry), or Newsletter."
                        />
                        <StrategyBlock
                            title="4. Paid Promotion"
                            desc="Only if you have a product. Don't pay for vanity metrics. ROI focus."
                        />
                    </div>
                </div>
            </section>

            {/* --- MENTAL HEALTH & BURNOUT --- */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-gold mb-6 flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Protecting Your Creative Soul
                </h3>

                <div className="grid md:grid-cols-3 gap-6">
                    <MentalHealthCard
                        title="Comparison Trap"
                        desc="Unfollow accounts that make you feel inadequate. Celebrate your own Day 1."
                    />
                    <MentalHealthCard
                        title="Hate Comments"
                        desc="Real critique? Engage. Trolls? Block. Taking it personally creates writer's block."
                    />
                    <MentalHealthCard
                        title="Burnout"
                        desc="Batch content so you can take days off. If you hate posting, stop and reset."
                    />
                </div>
            </section>

            {/* --- VISION & FINAL WORDS --- */}
            <section className="space-y-8">
                <div className="border-l-2 border-gold/50 pl-6 py-2">
                    <h3 className="text-3xl font-serif text-parchment mb-4">The Next Level (Beyond 200K)</h3>
                    <ul className="space-y-3 text-parchment/70">
                        <li className="flex items-center gap-3"><Rocket className="w-4 h-4 text-gold" /> Build a Publishing House</li>
                        <li className="flex items-center gap-3"><Users className="w-4 h-4 text-gold" /> Mentor Emerging Poets</li>
                        <li className="flex items-center gap-3"><Share2 className="w-4 h-4 text-gold" /> Create a Social Movement</li>
                    </ul>
                </div>

                <div className="bg-gradient-to-r from-ink-950 to-ink-900 p-8 rounded-2xl border border-white/10 text-center space-y-6">
                    <h3 className="text-2xl font-serif text-gold">Final Words</h3>
                    <p className="text-parchment/80 leading-relaxed max-w-2xl mx-auto">
                        "Your unique voice is your only true competitive advantage. Ten thousand poetry pages exist. Only one has your exact perspective. Grow your page, yes. But never lose what made your poetry worth sharing in the first place."
                    </p>
                    <div className="text-sm font-mono text-gold/60">— The Inkfetish Team</div>
                </div>
            </section>

            {/* --- ACTION ITEMS --- */}
            <section className="bg-ink-950/80 p-8 rounded-2xl border border-gold/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl" />

                <div className="relative z-10 space-y-6">
                    <h3 className="text-2xl font-serif text-white flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-gold" />
                        Final Challenge
                    </h3>
                    <p className="text-parchment/60 italic">Don't just read. execute.</p>

                    <div className="space-y-4">
                        <ActionItem text='Create your Daily Routine schedule and stick to it.' />
                        <ActionItem text='Set up one automation tool (Later/Meta Suite) this week.' />
                        <ActionItem text='Write down your 1-Year Vision beyond follower count.' />
                        <ActionItem text='Close this guide. Write 1 poem using Chapter 3 methods. POST IT TODAY.' />
                    </div>
                </div>
            </section>

        </div>
    );
};

// --- Sub-Components ---

const RoutineItem = ({ time, title, tasks, highlight }: any) => (
    <div className={`flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-lg border ${highlight ? 'bg-gold/10 border-gold/30' : 'bg-white/5 border-white/5'}`}>
        <div className={`w-32 font-mono text-xs opacity-70 ${highlight ? 'text-gold' : 'text-parchment'}`}>{time}</div>
        <div className="flex-1">
            <div className={`font-bold mb-1 ${highlight ? 'text-gold' : 'text-parchment'}`}>{title}</div>
            <div className="flex flex-wrap gap-2">
                {tasks.map((t: string) => (
                    <span key={t} className={`text-xs px-2 py-1 rounded ${highlight ? 'bg-black/20 text-gold/80' : 'bg-white/5 text-parchment/60'}`}>
                        {t}
                    </span>
                ))}
            </div>
        </div>
    </div>
);

const ToolCard = ({ icon, title, tools, desc }: any) => (
    <div className="p-6 bg-ink-900/40 rounded-xl border border-white/5 hover:border-gold/20 transition-all">
        <div className="text-gold mb-3">{icon}</div>
        <h4 className="font-bold text-parchment mb-1">{title}</h4>
        <div className="text-xs font-bold text-gold/80 mb-2">{tools}</div>
        <p className="text-xs text-parchment/60 leading-relaxed">{desc}</p>
    </div>
);

const StrategyBlock = ({ title, desc }: any) => (
    <div className="p-4 bg-black/20 rounded-lg border border-white/5">
        <h4 className="font-bold text-parchment text-sm mb-2">{title}</h4>
        <p className="text-xs text-parchment/60">{desc}</p>
    </div>
);

const MentalHealthCard = ({ title, desc }: any) => (
    <div className="p-6 bg-ink-900/60 rounded-xl border border-white/5 text-center">
        <div className="font-bold text-parchment mb-2">{title}</div>
        <p className="text-sm text-parchment/60 leading-relaxed">{desc}</p>
    </div>
);

const ActionItem = ({ text }: { text: string }) => (
    <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-white/5 hover:bg-gold/5 transition-colors cursor-default">
        <div className="mt-1 w-5 h-5 rounded-full border-2 border-gold/30 flex items-center justify-center shrink-0">
            <div className="w-2.5 h-2.5 bg-gold rounded-full opacity-0 hover:opacity-100 transition-opacity" />
        </div>
        <p className="text-parchment/90 font-serif">{text}</p>
    </div>
);
