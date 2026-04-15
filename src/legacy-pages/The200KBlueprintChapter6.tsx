import React, { useState } from 'react';
import {
    Users,
    MessageCircle,
    Copy,
    Check,
    Heart,
    Share2,
    Zap,
    Search,
    UserPlus,
    Target
} from 'lucide-react';

export const Chapter6Content = () => {
    return (
        <div className="space-y-16">

            {/* --- THE COLLABORATION MULTIPLIER --- */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-gold flex items-center gap-3">
                    <Users className="w-5 h-5" />
                    The Collaboration Multiplier
                </h3>

                <div className="bg-ink-900/50 p-6 rounded-xl border border-white/5 space-y-6">
                    <p className="text-parchment/80 font-serif leading-relaxed">
                        Here's a growth hack that costs zero money and works incredibly fast: <strong className="text-gold">collaboration</strong>.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 text-center">
                        <BenefitCard icon={<Zap className="w-5 h-5" />} title="More Reach" desc="Tap into their audience instantly." />
                        <BenefitCard icon={<Target className="w-5 h-5" />} title="Quality Leads" desc="Access new fans who already love poetry." />
                        <BenefitCard icon={<Check className="w-5 h-5" />} title="Social Proof" desc="Endorsement transfers credibility." />
                    </div>
                </div>

                {/* Hero Image: Community Connection */}
                <div className="relative group rounded-xl overflow-hidden shadow-2xl border border-gold/20">
                    <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                    <img
                        src="/images/blueprint_community_connection.png"
                        alt="Poetry Community Connection"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/80 px-4 py-2 rounded-full border border-gold/30 text-gold text-xs font-mono">
                        NETWORK_ESTABLISHED
                    </div>
                </div>
            </section>

            {/* --- FINDING PARTNERS --- */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-parchment text-center mb-8">Finding The Right Partners</h3>

                <div className="grid md:grid-cols-2 gap-8">
                    <CriteriaList
                        title="Good Partner Criteria"
                        items={[
                            "Similar Follower Count (within 2x range)",
                            "Similar Niche (Poets/Writers/Quotes)",
                            "High Engagement Rate (Check likes ratio)",
                            " aligned Values (Brand fit)"
                        ]}
                        positive
                    />
                    <CriteriaList
                        title="Avoid If..."
                        items={[
                            "Disparate Niche (e.g., Food/Fitness)",
                            "Low Engagement (Ghost followers)",
                            "Zero prior collaborations",
                            "Conflicting brand values"
                        ]}
                    />
                </div>
            </section>

            {/* --- THE DM PITCH --- */}
            <section className="space-y-8">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-serif text-gold">The Perfect DM Pitch</h3>
                    <span className="text-xs text-parchment/50 border border-white/10 px-2 py-1 rounded">Click to copy</span>
                </div>

                <div className="grid gap-6">
                    <PitchTemplate
                        title="The 'Good Pitch' Template"
                        content={`Hey [Name], I've been following your page for a while and your poem about [topic] really resonated with me—especially the line about [specific line]. That's exactly how [personal reaction].

I run @[yourhandle], a poetry page focused on [your niche]. We have similar audiences and I thought we might do a collaboration together.

I was thinking of a shoutout exchange where we each feature one of the other's poems. My audience is really engaged (avg [X]% engagement) and I'd love to expose them to your work.

Would you be interested?`}
                    />

                    <div className="bg-ink-900/30 p-4 rounded-lg border border-white/5 text-sm text-parchment/60">
                        <strong className="text-gold">Why this works:</strong> Personalized. Genuine appreciation. Clearly explains benefit. Respectful.
                    </div>
                </div>
            </section>

            {/* --- COLLABORATION TYPES --- */}
            <section className="space-y-12">
                <h3 className="text-2xl font-serif text-gold mb-6 text-center">4 Ways To Collaborate</h3>

                <div className="grid md:grid-cols-2 gap-6">
                    <CollabType
                        title="1. Shoutout Exchange"
                        desc="You post them, they post you. Ideally same day."
                        tip="Start with Stories (lower pressure), then move to Feed."
                    />
                    <CollabType
                        title="2. Collaborative Post"
                        desc="Use Instagram's 'Invite Collaborator' feature. Post appears on both feeds."
                        tip="Co-write a poem or split a theme."
                    />
                    <CollabType
                        title="3. Joint Challenge"
                        desc="Host a 7-Day writing challenge together."
                        tip="Great for high engagement and repeated exposure."
                    />
                    <CollabType
                        title="4. Guest Feature"
                        desc="Post their poem on your page with deep praise."
                        tip="Requires explicit permission. Builds deep trust."
                    />
                </div>
            </section>

            {/* --- COMMUNITY BUILDING TACTICS --- */}
            <section className="space-y-8">
                <div className="bg-gradient-to-br from-ink-950 to-brown-950/30 p-8 rounded-2xl border border-gold/20">
                    <h3 className="text-2xl font-serif text-parchment mb-2">Building Your Tribe</h3>
                    <p className="text-gold/80 italic mb-8">From Audience to Community</p>

                    <div className="space-y-4">
                        <Tactic
                            num="01"
                            title="Community Hashtag"
                            desc="Create a unique tag (e.g. #InkfetishCommunity) for followers to use."
                        />
                        <Tactic
                            num="02"
                            title="Weekly Follower Feature"
                            desc="Showcase one follower's poem every week. Creates aspirational value."
                        />
                        <Tactic
                            num="03"
                            title="Monthly Challenges"
                            desc="Prompt challenges or 'rewrite this' contests. Consistency is key."
                        />
                        <Tactic
                            num="04"
                            title="Respond to EVERY DM"
                            desc="My secret weapon. The first 1,000 followers need personal connection."
                            highlight
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
                        Action Items - Chapter 6
                    </h3>
                    <p className="text-parchment/60 italic">Grow your network this week:</p>

                    <div className="space-y-4">
                        <ActionItem text='Identify 5 potential partners using the criteria list.' />
                        <ActionItem text='Send 3 personalized Collab DMs using the template.' />
                        <ActionItem text='Feature one follower&apos;s poem on your Story or Feed.' />
                        <ActionItem text='Create and launch your unique Community Hashtag.' />
                    </div>
                </div>
            </section>

        </div>
    );
};

// --- Sub-Components ---

const BenefitCard = ({ icon, title, desc }: any) => (
    <div className="p-4 bg-ink-900 rounded-lg border border-white/5 flex flex-col items-center">
        <div className="text-gold mb-2 bg-gold/10 p-2 rounded-full">{icon}</div>
        <div className="font-bold text-parchment text-sm mb-1">{title}</div>
        <div className="text-xs text-parchment/60">{desc}</div>
    </div>
);

const CriteriaList = ({ title, items, positive }: any) => (
    <div className={`p-6 rounded-xl border ${positive ? 'bg-green-950/10 border-green-500/20' : 'bg-red-950/10 border-red-500/20'}`}>
        <h4 className={`font-bold mb-4 ${positive ? 'text-green-400' : 'text-red-400'}`}>{title}</h4>
        <ul className="space-y-3">
            {items.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-parchment/80">
                    <span className={positive ? 'text-green-500' : 'text-red-500'}>•</span>
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

const PitchTemplate = ({ title, content }: any) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            onClick={handleCopy}
            className="group cursor-pointer bg-ink-900/60 p-6 rounded-xl border border-white/5 hover:border-gold/40 hover:bg-ink-900 transition-all relative"
        >
            <div className="absolute top-4 right-4 text-parchment/20 group-hover:text-gold transition-colors">
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </div>
            <h4 className="font-bold text-parchment mb-4 group-hover:text-gold transition-colors">{title}</h4>
            <div className="font-mono text-xs text-parchment/70 whitespace-pre-wrap leading-relaxed bg-black/30 p-4 rounded border border-white/5">
                {content}
            </div>
            {copied && (
                <div className="absolute bottom-4 right-4 text-xs text-green-400 font-bold bg-green-950/80 px-2 py-1 rounded">
                    Copied!
                </div>
            )}
        </div>
    );
};

const CollabType = ({ title, desc, tip }: any) => (
    <div className="p-6 bg-ink-900/40 rounded-xl border border-white/5 hover:border-gold/30 transition-all">
        <h4 className="font-bold text-parchment text-lg mb-2">{title}</h4>
        <p className="text-parchment/70 text-sm mb-3">{desc}</p>
        <div className="text-xs text-gold/80 italic flex items-center gap-2">
            <span className="font-bold">Tip:</span> {tip}
        </div>
    </div>
);

const Tactic = ({ num, title, desc, highlight }: any) => (
    <div className={`flex items-center gap-4 p-4 rounded-lg border ${highlight ? 'bg-gold/10 border-gold/30' : 'bg-white/5 border-white/5'}`}>
        <div className={`text-xl font-bold font-serif opacity-50 ${highlight ? 'text-gold' : 'text-parchment'}`}>{num}</div>
        <div>
            <div className={`font-bold ${highlight ? 'text-gold' : 'text-parchment'}`}>{title}</div>
            <div className={`text-sm ${highlight ? 'text-gold/80' : 'text-parchment/60'}`}>{desc}</div>
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
