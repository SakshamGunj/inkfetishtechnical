import React from 'react';
import {
    PenTool,
    Quote,
    BookOpen,
    MessageCircle,
    Users,
    Layers,
    Clock,
    Repeat,
    BarChart2,
    Save,
    Share2,
    Target
} from 'lucide-react';

export const Chapter3Content = () => {
    return (
        <div className="space-y-16">

            {/* --- THE FIVE CONTENT PILLARS --- */}
            <section className="space-y-12">
                <h3 className="text-3xl font-serif text-parchment text-center mb-12">The Five Content Pillars System</h3>
                <p className="text-center text-parchment/60 max-w-2xl mx-auto -mt-8 mb-12 italic">
                    A balanced strategy works together to attract new followers, keep existing followers engaged, and build authority.
                </p>

                {/* Hero Image: Five Pillars */}
                <div className="relative group rounded-xl overflow-hidden shadow-2xl border border-gold/20 mb-12">
                    <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                    <img
                        src="/images/blueprint_five_pillars.png"
                        alt="The Five Content Pillars of Poetry Growth"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/80 px-4 py-2 rounded-full border border-gold/30 text-gold text-xs font-mono">
                        STRATEGY_FOUNDATION.ARCH
                    </div>
                </div>

                <div className="grid gap-8">
                    {/* Pillar 1: Original Poetry */}
                    <PillarCard
                        icon={<PenTool className="w-6 h-6" />}
                        title="Pillar 1: Original Poetry"
                        percent="40%"
                        desc="Your unique voice. Why people ultimately follow YOU."
                        content={
                            <ul className="space-y-2 text-sm text-parchment/70 mt-4">
                                <li className="flex items-center gap-2"><span className="text-gold">•</span> Focus: Love, Heartbreak, Social Commentary, Personal Stories.</li>
                                <li className="flex items-center gap-2"><span className="text-gold">•</span> Length: 8-16 lines max for single posts.</li>
                                <li className="flex items-center gap-2"><span className="text-gold">•</span> Design: High contrast. Readable fonts. Center aligned.</li>
                            </ul>
                        }
                    />

                    {/* Pillar 2: Curated Quotes */}
                    <PillarCard
                        icon={<Quote className="w-6 h-6" />}
                        title="Pillar 2: Curated Quotes"
                        percent="20%"
                        desc="Fills gaps and provides variety. Requires strict attribution."
                        content={
                            <div className="bg-ink-950/50 p-4 rounded border border-white/5 mt-4 text-xs italic text-parchment/60">
                                "Always credit the author clearly. Never post with 'Unknown' attribution. It damages credibility."
                            </div>
                        }
                    />

                    {/* Pillar 3: Educational Content */}
                    <PillarCard
                        icon={<BookOpen className="w-6 h-6" />}
                        title="Pillar 3: Educational Content"
                        percent="15%"
                        desc="Builds authority. Helps aspiring poets in your community."
                        content={
                            <div className="mt-4 space-y-2">
                                <div className="text-sm font-bold text-gold">High-Performing Topics:</div>
                                <div className="flex flex-wrap gap-2">
                                    <Tag>Writing Tips</Tag>
                                    <Tag>Literary Devices</Tag>
                                    <Tag>Author Spotlights</Tag>
                                    <Tag>Prompts</Tag>
                                </div>
                            </div>
                        }
                    />

                    {/* Pillar 4: Engagement Content */}
                    <PillarCard
                        icon={<MessageCircle className="w-6 h-6" />}
                        title="Pillar 4: Engagement Content"
                        percent="15%"
                        desc="Boosts signals. Turns passive followers into active participants."
                        content={
                            <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-parchment/80">
                                <div className="bg-white/5 p-2 rounded">Fill-in-the-blank</div>
                                <div className="bg-white/5 p-2 rounded">Caption This</div>
                                <div className="bg-white/5 p-2 rounded">Poetry Challenges</div>
                                <div className="bg-white/5 p-2 rounded">Polls</div>
                            </div>
                        }
                    />

                    {/* Pillar 5: Community Content */}
                    <PillarCard
                        icon={<Users className="w-6 h-6" />}
                        title="Pillar 5: Community Content"
                        percent="10%"
                        desc="Builds loyalty. Makes followers feel valued."
                        content={
                            <p className="text-sm text-parchment/70 mt-4">
                                Includes featuring other poets, celebrating milestones, and behind-the-scenes content.
                            </p>
                        }
                    />
                </div>
            </section>

            {/* --- THE CONTENT SOURCING SYSTEM --- */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-gold mb-6">The "Never Run Out of Ideas" System</h3>

                <div className="grid md:grid-cols-2 gap-6">
                    <SystemCard
                        title="Step 1: The Swipe File"
                        desc="Your personal collection of inspiration. Save design layouts, caption structures, and hooks that stop you."
                        action="Action: Spend 5 mins daily saving inspiring posts."
                    />
                    <SystemCard
                        title="Step 2: 15-Min Routine"
                        desc="Check 5 niche pages. Note trends. Read 10 poems (fuel). Save 3 new formats to try."
                        action="Action: Create a morning ritual before creating."
                    />
                    <SystemCard
                        title="Step 3: Batch Creation"
                        desc="Monday: Write 10 poems. Tuesday: Design 10 posts. Wednesday: Schedule everything."
                        action="Action: Stop creating daily. It leads to burnout."
                    />
                    <SystemCard
                        title="Step 4: Remix Srtategy"
                        desc="Turn 1 poem into 4 pieces of content: Feed Post, Carousel, Reel, Story Series."
                        action="Action: Quadruple your output instantly."
                    />
                </div>
            </section>

            {/* --- THE REMIX STRATEGY VISUALIZED --- */}
            <section className="bg-ink-950/50 p-8 rounded-2xl border border-gold/10">
                <h3 className="text-xl font-serif text-gold mb-6 flex items-center gap-2">
                    <Repeat className="w-5 h-5" />
                    Visualizing The Content Remix
                </h3>
                <div className="flex flex-col md:flex-row items-center gap-4 text-center">
                    <div className="bg-white/10 p-6 rounded-xl border border-white/10 w-full md:w-1/5">
                        <div className="text-2xl mb-2">📄</div>
                        <div className="font-bold text-parchment">1 Core Poem</div>
                    </div>

                    <div className="hidden md:block text-gold text-2xl">→</div>
                    <div className="md:hidden text-gold text-2xl">↓</div>

                    <div className="grid grid-cols-2 gap-4 w-full md:w-4/5">
                        <RemixOutput icon="🖼️" title="Feed Post" desc="Permanent & Polished" />
                        <RemixOutput icon="🎞️" title="Carousel" desc="5 Slides / Story Arc" />
                        <RemixOutput icon="🎬" title="Reel" desc="Voiceover / Text Anim" />
                        <RemixOutput icon="⭕" title="Story Series" desc="Context + Interactive" />
                    </div>
                </div>
            </section>

            {/* --- DATA DRIVEN POETRY --- */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-gold mb-6 flex items-center gap-2">
                    <BarChart2 className="w-6 h-6" />
                    Analyzing What Works
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                    <MetricCard
                        icon={<Share2 className="w-5 h-5" />}
                        title="Reach"
                        desc="Unique accounts. 10-30% is normal for feed. 50-150% is great for reels."
                    />
                    <MetricCard
                        icon={<MessageCircle className="w-5 h-5" />}
                        title="Engagement Rate"
                        desc="(Interactions / Reach) * 100. Aim for >8%."
                    />
                    <MetricCard
                        icon={<Save className="w-5 h-5" />}
                        title="Saves (Must Important)"
                        desc="Strongest quality signal. Means 'I want to come back'. Discovery ticket."
                        highlight
                    />
                    <MetricCard
                        icon={<Repeat className="w-5 h-5" />}
                        title="Shares (Growth)"
                        desc="The ultimate compliment. Happens when you articulate unexpressed feelings."
                    />
                </div>
            </section>

            {/* --- CAPTION WRITING FRAMEWORK --- */}
            <section className="space-y-8">
                <div className="bg-gradient-to-br from-ink-950 to-brown-950/30 p-8 rounded-2xl border border-gold/20">
                    <h3 className="text-2xl font-serif text-parchment mb-2">Caption Writing for Poets</h3>
                    <p className="text-gold/80 italic mb-8">The "Hook-Story-Offer" Framework</p>

                    <div className="space-y-6">
                        <FrameworkStep
                            step="01"
                            title="The Hook (First Line)"
                            desc="Must grab attention immediately. Question, Bold Statement, Relatable Pain, or Curiosity."
                            example='"Have you ever loved someone who forgot you existed?"'
                        />
                        <FrameworkStep
                            step="02"
                            title="The Story (Context)"
                            desc="Build connection. Share personal vulnerability that points to a universal truth."
                            example='"I wrote this in the bathtub at 2AM... It is about the version of yourself you only meet in solitude."'
                        />
                        <FrameworkStep
                            step="03"
                            title="The Offer (CTA)"
                            desc="Convert attention to interaction. Ask specific questions, request DMs, or encourage saves."
                            example='"Save this for the next time you catch yourself looking for them."'
                        />
                    </div>
                </div>
            </section>

            {/* --- ACTION ITEMS --- */}
            <section className="bg-ink-950/80 p-8 rounded-2xl border border-gold/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl" />

                <div className="relative z-10 space-y-6">
                    <h3 className="text-2xl font-serif text-white flex items-center gap-3">
                        <Target className="w-6 h-6 text-gold" />
                        Action Items - Chapter 3
                    </h3>
                    <p className="text-parchment/60 italic">Before moving to the next chapter, complete these exercises:</p>

                    <div className="space-y-4">
                        <ActionItem text='Define your 5 Pillar percentages (e.g., 40% Original, 20% Quotes...).' />
                        <ActionItem text='Start your Swipe File today. Save 20 inspiring posts.' />
                        <ActionItem text='Write 5 poems using the Hook-Story-Offer caption framework.' />
                        <ActionItem text='Design 3 posts using the 3 styles: Minimalist, Text on Photo, Handwritten.' />
                        <ActionItem text='Run your first Content Audit on existing posts.' />
                    </div>
                </div>
            </section>

        </div>
    );
};

// --- Sub-Components ---

const PillarCard = ({ icon, title, percent, desc, content }: any) => (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-ink-900/40 rounded-xl border border-white/5 hover:border-gold/30 transition-all group">
        <div className="shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-ink-950 border border-gold/10 group-hover:bg-gold/10 group-hover:text-gold text-parchment transition-colors">
            {icon}
        </div>
        <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
                <h4 className="text-xl font-serif font-bold text-parchment group-hover:text-gold transition-colors">{title}</h4>
                <span className="bg-gold/10 text-gold px-3 py-1 rounded text-xs font-bold">{percent}</span>
            </div>
            <p className="text-parchment/80 mb-2">{desc}</p>
            {content}
        </div>
    </div>
);

const Tag = ({ children }: { children: React.ReactNode }) => (
    <span className="bg-white/5 px-2 py-1 rounded text-xs text-parchment/60 hover:text-parchment hover:bg-white/10 transition-colors cursor-default">
        {children}
    </span>
);

const SystemCard = ({ title, desc, action }: any) => (
    <div className="bg-ink-950 p-6 rounded-xl border border-white/5 hover:border-gold/20 transition-colors">
        <h4 className="font-bold text-gold mb-3">{title}</h4>
        <p className="text-parchment/70 text-sm mb-4 leading-relaxed">{desc}</p>
        <div className="text-xs text-green-400/80 font-mono bg-green-900/10 p-2 rounded border border-green-500/10">
            {action}
        </div>
    </div>
);

const RemixOutput = ({ icon, title, desc }: any) => (
    <div className="bg-ink-900 p-4 rounded-lg border border-white/5 hover:bg-white/5 transition-colors">
        <div className="text-xl mb-2">{icon}</div>
        <div className="font-bold text-parchment text-sm mb-1">{title}</div>
        <div className="text-xs text-parchment/50">{desc}</div>
    </div>
);

const MetricCard = ({ icon, title, desc, highlight }: any) => (
    <div className={`p-6 rounded-xl border transition-all ${highlight ? 'bg-gold/10 border-gold/40' : 'bg-ink-900/40 border-white/5'}`}>
        <div className={`mb-3 ${highlight ? 'text-gold' : 'text-parchment/60'}`}>{icon}</div>
        <h4 className={`font-bold mb-2 ${highlight ? 'text-gold' : 'text-parchment'}`}>{title}</h4>
        <p className="text-sm text-parchment/70 leading-relaxed">{desc}</p>
    </div>
);

const FrameworkStep = ({ step, title, desc, example }: any) => (
    <div className="relative pl-8 md:pl-12 border-l border-white/10 pb-2 last:pb-0 last:border-0">
        <div className="absolute -left-3 top-0 w-6 h-6 bg-ink-900 border-2 border-gold rounded-full flex items-center justify-center text-[10px] text-gold font-bold">
            {step}
        </div>
        <h4 className="font-bold text-parchment mb-1">{title}</h4>
        <p className="text-sm text-parchment/70 mb-3">{desc}</p>
        <div className="bg-black/30 p-3 rounded border-l-2 border-gold text-xs text-parchment/80 italic font-serif">
            {example}
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
