import React from 'react';
import {
    Video,
    Mic,
    PenTool,
    Type,
    Camera,
    Music,
    TrendingUp,
    Clock,
    AlertCircle,
    CheckCircle2,
    PlayCircle,
    Target,
    Zap
} from 'lucide-react';

export const Chapter5Content = () => {
    return (
        <div className="space-y-16">

            {/* --- WHY REELS ARE NON-NEGOTIABLE --- */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-gold flex items-center gap-3">
                    <Video className="w-5 h-5" />
                    Why Reels Are Non-Negotiable
                </h3>

                <div className="bg-ink-900/50 p-6 rounded-xl border border-white/5 space-y-4">
                    <p className="text-parchment/80 font-serif leading-relaxed">
                        Here's the uncomfortable truth: <strong className="text-gold">if you're not creating reels, your page will not grow in 2026.</strong>
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-black/30 p-4 rounded border border-white/5">
                            <div className="text-parchment/60 text-xs uppercase tracking-widest mb-1">Feed Post Reach</div>
                            <div className="text-2xl font-bold text-parchment">1,000 People</div>
                        </div>
                        <div className="bg-gold/10 p-4 rounded border border-gold/30">
                            <div className="text-gold/60 text-xs uppercase tracking-widest mb-1">Reel Reach</div>
                            <div className="text-2xl font-bold text-gold">10,000+ People</div>
                        </div>
                    </div>
                </div>

                {/* Hero Image: Reel Production */}
                <div className="relative group rounded-xl overflow-hidden shadow-2xl border border-gold/20">
                    <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                    <img
                        src="/images/blueprint_reels_production.png"
                        alt="Poetry Reel Production Aesthetic"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-4 right-4 bg-black/80 px-4 py-2 rounded-full border border-gold/30 text-gold text-xs font-mono">
                        REC 00:15
                    </div>
                </div>
            </section>

            {/* --- 7 REEL FORMATS --- */}
            <section className="space-y-12">
                <h3 className="text-3xl font-serif text-parchment text-center mb-12">7 Reel Formats (No Face Required)</h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FormatCard
                        icon={<Type className="w-5 h-5" />}
                        title="1. Text-Based"
                        desc="Simplest. Words appear rhythmically to music."
                        tip="Use typewriter effect. <15s."
                    />
                    <FormatCard
                        icon={<Type className="w-5 h-5" />}
                        title="2. Typing Visual"
                        desc="Screen recording of typing in Notes app."
                        tip="Add typos for realism. Satisfying to watch."
                    />
                    <FormatCard
                        icon={<PenTool className="w-5 h-5" />}
                        title="3. Hand-Writing"
                        desc="Filming your hand writing on paper."
                        tip="Overhead angle. Good lighting. Meditative."
                    />
                    <FormatCard
                        icon={<Camera className="w-5 h-5" />}
                        title="4. Aesthetic B-Roll"
                        desc="Rain, city lights, nature with text overlay."
                        tip="Visual must match emotion (e.g., rain = sad)."
                    />
                    <FormatCard
                        icon={<Mic className="w-5 h-5" />}
                        title="5. Recitation"
                        desc="Static image + your voice reading."
                        tip="Voice carries emotion. Don't sound robotic."
                    />
                    <FormatCard
                        icon={<TrendingUp className="w-5 h-5" />}
                        title="6. Trend Adaptation"
                        desc="Using trending audio with a poetry twist."
                        tip="Don't copy exact trend. Make it literary."
                    />
                    <FormatCard
                        icon={<Video className="w-5 h-5" />}
                        title="7. Behind-The-Scenes"
                        desc="The story behind the poem."
                        tip="Builds connection. 'I wrote this at 3AM...'"
                        cols="md:col-span-2 lg:col-span-3"
                    />
                </div>
            </section>

            {/* --- THE HOOK FORMULA --- */}
            <section className="space-y-8">
                <div className="bg-ink-950/80 rounded-2xl p-8 border border-gold/20">
                    <h3 className="text-2xl font-serif text-gold mb-6 flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        The 1-Second Hook Rule
                    </h3>
                    <p className="text-parchment/80 mb-8 italic">90% scroll away in 1 second. You must stop them instantly.</p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <HookType title="Bold Statement" example='"Heartbreak is not the end."' />
                        <HookType title="Question" example='"Ever loved someone who didn&apos;t love you back?"' />
                        <HookType title="Relatability" example='"POV: You&apos;re reading old texts at 2 AM"' />
                        <HookType title="Curiosity" example='"The poem I&apos;ll never publish"' />
                    </div>
                </div>
            </section>

            {/* --- POSTING STRATEGY --- */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-gold mb-6 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Posting Strategy
                </h3>

                <div className="grid md:grid-cols-3 gap-6">
                    <StrategyCard title="Frequency" value="1/Day" desc="Optimal. Min 3/week. Batch create 7 in one day." />
                    <StrategyCard title="Length" value="7-15s" desc="Sweet spot for completion rate. Short wins." />
                    <StrategyCard title="Time (IST)" value="7-9 PM" desc="Best slot. Also good: 1-2 PM (Lunch), 10-11 PM (Night)." />
                </div>
            </section>

            {/* --- MISTAKES TO AVOID --- */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-red-400 mb-6 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Mistakes That Kill Reach
                </h3>
                <div className="grid gap-4">
                    <MistakeItem title="Wrong Audio" desc="Don't use copyrighted music not in IG library." />
                    <MistakeItem title="Low Quality" desc="Blurry video = instant scroll. Use 1080x1920." />
                    <MistakeItem title="No Hook" desc="Starting slowly. Introduction = death." />
                    <MistakeItem title="Too Long" desc="60s reels rarely get finished. Keep it tight." />
                    <MistakeItem title="TikTok Watermarks" desc="IG suppresses these. Remove them." />
                </div>
            </section>

            {/* --- ACTION ITEMS --- */}
            <section className="bg-ink-950/80 p-8 rounded-2xl border border-gold/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl" />

                <div className="relative z-10 space-y-6">
                    <h3 className="text-2xl font-serif text-white flex items-center gap-3">
                        <Target className="w-6 h-6 text-gold" />
                        Action Items - Chapter 5
                    </h3>
                    <p className="text-parchment/60 italic">Before moving forward, complete these exercises:</p>

                    <div className="space-y-4">
                        <ActionItem text='Create 3 reels this week using 3 different formats (Text, Typing, Aesthetic).' />
                        <ActionItem text='Find 5 trending audios that fit your vibe and Save them.' />
                        <ActionItem text='Test posting at 3 different time slots (1 PM, 8 PM, 10 PM) and track views.' />
                        <ActionItem text='Analyze results after 1 week. Double down on the winner.' />
                    </div>
                </div>
            </section>

        </div>
    );
};

// --- Sub-Components ---

const FormatCard = ({ icon, title, desc, tip, cols }: any) => (
    <div className={`p-6 bg-ink-900/40 rounded-xl border border-white/5 hover:border-gold/30 transition-all ${cols || ''}`}>
        <div className="text-gold mb-3">{icon}</div>
        <h4 className="font-bold text-parchment mb-2">{title}</h4>
        <p className="text-parchment/70 text-sm mb-3">{desc}</p>
        <div className="text-xs text-gold/60 italic bg-gold/5 p-2 rounded border border-gold/10">
            Tip: {tip}
        </div>
    </div>
);

const HookType = ({ title, example }: any) => (
    <div className="p-4 bg-ink-950 rounded-lg border border-white/5">
        <h4 className="font-bold text-gold text-sm mb-2">{title}</h4>
        <p className="text-parchment/80 font-serif italic text-sm">{example}</p>
    </div>
);

const StrategyCard = ({ title, value, desc }: any) => (
    <div className="p-6 bg-ink-900/30 rounded-xl border border-white/5 text-center">
        <div className="text-xs uppercase tracking-widest text-parchment/40 mb-2">{title}</div>
        <div className="text-3xl font-bold text-gold mb-2">{value}</div>
        <p className="text-xs text-parchment/60">{desc}</p>
    </div>
);

const MistakeItem = ({ title, desc }: any) => (
    <div className="flex items-center gap-4 p-4 bg-red-950/10 rounded-lg border border-red-500/10">
        <XCircleRed />
        <div>
            <div className="font-bold text-white text-sm">{title}</div>
            <div className="text-parchment/60 text-xs">{desc}</div>
        </div>
    </div>
);

const XCircleRed = () => (
    <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
        <div className="text-red-500 font-bold">✕</div>
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
