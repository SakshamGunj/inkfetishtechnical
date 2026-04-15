import React from 'react';
import {
    Share2,
    Users,
    Clock,
    Zap,
    Layout,
    TrendingUp,
    MessageCircle,
    Heart,
    Bookmark,
    Target
} from 'lucide-react';

export const Chapter2Content = () => {
    return (
        <div className="space-y-16">

            {/* --- HOW INSTAGRAM DECIDES --- */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-gold flex items-center gap-3">
                    <Share2 className="w-5 h-5" />
                    How Instagram Decides What To Show
                </h3>

                <div className="bg-ink-900/50 p-6 rounded-xl border border-white/5 space-y-4">
                    <p className="text-parchment/80 font-serif leading-relaxed">
                        Here's what you need to understand: <strong className="text-red-400">Instagram doesn't show your posts to all your followers anymore.</strong> In 2026, organic reach to your follower base is typically between 5-15% for feed posts and can be 30-60% for reels.
                    </p>
                    <p className="text-parchment/80 font-serif leading-relaxed">
                        This means if you have 10,000 followers, your typical feed post will be seen by only 500 to 1,500 of them. The rest? Instagram decides whether they're interested based on complex signals.
                    </p>
                    <div className="flex items-center gap-4 bg-green-950/20 p-4 rounded-lg border-l-2 border-green-500/50">
                        <Zap className="w-5 h-5 text-green-400 shrink-0" />
                        <p className="text-sm text-green-300">
                            But here's the good news: Instagram will show your content to people who DON'T follow you if it performs well with your existing audience. Your followers are your gateway to reaching new people.
                        </p>
                    </div>
                </div>

                {/* Visual: Distribution Channels */}
                <div className="grid md:grid-cols-3 gap-4">
                    <ChannelCard
                        icon={<Layout className="w-5 h-5" />}
                        title="Home Feed"
                        desc="Where your followers look first. Your content competes with everything else."
                    />
                    <ChannelCard
                        icon={<TrendingUp className="w-5 h-5" />}
                        title="Explore Page"
                        desc="Pure discovery. Requires strong engagement from existing followers to unlock."
                    />
                    <ChannelCard
                        icon={<Zap className="w-5 h-5" />}
                        title="Reels Tab"
                        desc="2026's Priority. Can reach 10-20x more people than static posts."
                        highlight
                    />
                </div>
            </section>

            {/* --- THE FIVE SIGNALS --- */}
            <section className="space-y-12">
                <h3 className="text-3xl font-serif text-parchment text-center mb-12">The Five Signals That Determine Your Reach</h3>

                {/* Hero Image: Algorithm Dashboard */}
                <div className="relative group rounded-xl overflow-hidden shadow-2xl border border-gold/20 mb-12">
                    <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                    <img
                        src="/images/blueprint_algorithm_dashboard.png"
                        alt="Instagram Algorithm Dashboard 2026"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-4 right-4 bg-black/80 px-4 py-2 rounded-full border border-gold/30 text-gold text-xs font-mono">
                        ALGORITHM_V2026.SYS
                    </div>
                </div>

                <div className="grid gap-8">
                    {/* Signal 1: Engagement */}
                    <SignalBlock
                        num="1"
                        icon={<Heart className="w-5 h-5" />}
                        title="Engagement Rate"
                        desc="The % of people who interact vs. see it. (Likes + Comments + Saves + Shares) / Reach * 100."
                        benchmark="Aim for 5-10% for poetry pages."
                    />

                    {/* Signal 2: Time Spent */}
                    <SignalBlock
                        num="2"
                        icon={<Clock className="w-5 h-5" />}
                        title="Time Spent"
                        desc="Quality indicator. Did they pause? Did they read the whole poem? Did they swipe?"
                        benchmark="Single img: 3-5s. Carousel: 10-20s. Reel: 70%+ retention."
                    />

                    {/* Signal 3: Relationship */}
                    <SignalBlock
                        num="3"
                        icon={<Users className="w-5 h-5" />}
                        title="Relationship"
                        desc="How often someone interacts with YOU. Your 'super fans'."
                        benchmark="Key Tactic: Respond to DMs within 1 hour."
                    />

                    {/* Signal 4: Timeliness */}
                    <SignalBlock
                        num="4"
                        icon={<Zap className="w-5 h-5" />}
                        title="Timeliness"
                        desc="Initial boost window. Needs quick engagement to expand reach."
                        benchmark="Gold Slots: 7-9 AM, 1-3 PM, 8-10 PM."
                    />

                    {/* Signal 5: Content Type */}
                    <SignalBlock
                        num="5"
                        icon={<Layout className="w-5 h-5" />}
                        title="Content Type Preference"
                        desc="Instagram prioritizes Reels. It's not optional anymore."
                        benchmark="Mix: 40% Reels, 30% Carousels, 20% Single, 10% Stories."
                    />
                </div>
            </section>

            {/* --- CONTENT TYPES BREAKDOWN --- */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-gold mb-6">Feed vs Carousels vs Reels vs Stories</h3>

                <div className="grid md:grid-cols-2 gap-6">
                    <ContentTypeCard type="Static Feed" reach="10-20%" role="Brand Authority" tip="High contrast designs." />
                    <ContentTypeCard type="Carousels" reach="20-30%" role="Depth &amp; Engagement" tip="Swipe rate &gt; 40%." />
                    <ContentTypeCard type="Reels" reach="40-60%+" role="Massive Discovery" tip="First 3s are life/death." highlight />
                    <ContentTypeCard type="Stories" reach="20-30%" role="Community Building" tip="Use engagement stickers." />
                </div>
            </section>

            {/* --- THE HACK: HOOK-RETAIN-ENGAGE --- */}
            <section className="space-y-8">
                <div className="bg-ink-950/80 rounded-2xl p-8 border border-white/10">
                    <div className="text-center mb-8">
                        <div className="text-sm uppercase tracking-widest text-parchment/40 mb-2">The System</div>
                        <h3 className="text-3xl font-serif text-gold">The Poetry Page Algorithm Hack</h3>
                        <p className="text-parchment/60 italic mt-2">The "Hook-Retain-Engage" System</p>
                    </div>

                    <div className="space-y-8 relative">
                        {/* Connecting Line */}
                        <div className="absolute left-[19px] top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent hidden md:block" />

                        <StepCard
                            step="01"
                            title="Hook (First 3s)"
                            desc="Stop the scroll. Combine Emotion + Curiosity."
                            bad="Example Bad: 'Here's a poem I wrote.'"
                            good="Example Good: 'I wrote this at 3AM while crying in my car.'"
                        />
                        <StepCard
                            step="02"
                            title="Retain (Hold Attention)"
                            desc="Easy to read formatting. Logical flow. Pacing."
                            bad="Don't cram text. Don't rush voiceovers."
                            good="Reveal one meaningful line every 2-3 seconds."
                        />
                        <StepCard
                            step="03"
                            title="Engage (The Ask)"
                            desc="Convert attention to interaction. Clear CTA."
                            bad="Generic: 'Comment below.'"
                            good="Specific: 'Which line hit you hardest? Mine was the third one.'"
                        />
                    </div>
                </div>
            </section>

            {/* --- ACTION ITEMS --- */}
            <section className="bg-ink-950/80 p-8 rounded-2xl border border-gold/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl" />

                <div className="relative z-10 space-y-6">
                    <h3 className="text-2xl font-serif text-white flex items-center gap-3">
                        <Target className="w-6 h-6 text-gold" />
                        Action Items - Chapter 2
                    </h3>
                    <p className="text-parchment/60 italic">Before moving forward, complete these practical exercises:</p>

                    <div className="space-y-4">
                        <ActionItem text='Calculate your Engagement Rate baseline (Interactions / Reach * 100).' />
                        <ActionItem text='Analyze your content mix. Are you posting enough Reels?' />
                        <ActionItem text='Test the "Golden Hour" posting slots (Morning, Afternoon, Evening).' />
                        <ActionItem text='Create ONE Reel using the Hook-Retain-Engage formula this week.' />
                    </div>
                </div>
            </section>

        </div>
    );
};

// --- Sub-Components ---

const ChannelCard = ({ icon, title, desc, highlight }: any) => (
    <div className={`p-6 rounded-xl border transition-all ${highlight ? 'bg-gold/10 border-gold/50 shadow-[0_0_15px_rgba(255,215,0,0.1)]' : 'bg-ink-900/40 border-white/5 hover:border-gold/20'}`}>
        <div className={`${highlight ? 'text-gold' : 'text-parchment/70'} mb-3`}>{icon}</div>
        <h4 className={`font-bold mb-2 ${highlight ? 'text-gold' : 'text-parchment'}`}>{title}</h4>
        <p className="text-sm text-parchment/60 leading-relaxed">{desc}</p>
    </div>
);

const SignalBlock = ({ num, icon, title, desc, benchmark }: any) => (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-ink-900/30 rounded-xl border border-white/5 hover:bg-white/5 transition-colors">
        <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-ink-950 border border-gold/20 text-gold font-bold font-serif text-xl">
            {num}
        </div>
        <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
                <div className="text-gold/80">{icon}</div>
                <h4 className="font-bold text-parchment text-lg">{title}</h4>
            </div>
            <p className="text-parchment/70">{desc}</p>
            <div className="bg-gold/5 inline-block px-3 py-1 rounded text-xs text-gold/80 border border-gold/10">
                <span className="font-bold">Benchmark:</span> {benchmark}
            </div>
        </div>
    </div>
);

const ContentTypeCard = ({ type, reach, role, tip, highlight }: any) => (
    <div className={`p-6 rounded-xl border relative overflow-hidden ${highlight ? 'bg-gradient-to-br from-gold/20 to-ink-900 border-gold/40' : 'bg-ink-950 border-white/10'}`}>
        <div className="flex justify-between items-start mb-4">
            <h4 className={`text-xl font-serif font-bold ${highlight ? 'text-gold' : 'text-parchment'}`}>{type}</h4>
            <span className={`text-xs px-2 py-1 rounded ${highlight ? 'bg-black/30 text-gold' : 'bg-white/5 text-parchment/50'}`}>Reach: {reach}</span>
        </div>
        <div className="space-y-2 text-sm">
            <p className="text-parchment/80"><strong className="text-parchment/50">Role:</strong> {role}</p>
            <p className="text-parchment/80"><strong className="text-parchment/50">Pro Tip:</strong> {tip}</p>
        </div>
    </div>
);

const StepCard = ({ step, title, desc, bad, good }: any) => (
    <div className="relative pl-0 md:pl-12">
        <div className="absolute left-0 top-0 w-10 h-10 bg-ink-900 border-2 border-gold rounded-full hidden md:flex items-center justify-center z-10 font-bold text-gold shadow-lg">
            {step}
        </div>
        <div className="bg-ink-900/60 p-6 rounded-xl border border-white/5 hover:border-gold/30 transition-all">
            <div className="flex items-center gap-3 mb-3 md:hidden">
                <span className="bg-gold text-ink-black text-xs font-bold px-2 py-1 rounded-full">{step}</span>
                <h4 className="text-lg font-bold text-gold">{title}</h4>
            </div>
            <h4 className="text-lg font-bold text-gold hidden md:block mb-2">{title}</h4>
            <p className="text-parchment/80 mb-4">{desc}</p>

            <div className="grid md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-red-950/20 p-3 rounded border border-red-500/10 text-red-300/80">
                    <span className="block text-red-500 font-bold mb-1">✕ Avoid:</span>
                    {bad}
                </div>
                <div className="bg-green-950/20 p-3 rounded border border-green-500/10 text-green-300/80">
                    <span className="block text-green-500 font-bold mb-1">✓ Do This:</span>
                    {good}
                </div>
            </div>
        </div>
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
