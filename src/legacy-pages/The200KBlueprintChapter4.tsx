import React, { useState } from 'react';
import {
    Hash,
    Search,
    TrendingUp,
    MapPin,
    Copy,
    Check,
    AlertTriangle,
    Layers,
    ArrowUp,
    Target
} from 'lucide-react';

export const Chapter4Content = () => {
    return (
        <div className="space-y-16">

            {/* --- THE TRUTH ABOUT HASHTAGS --- */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-gold flex items-center gap-3">
                    <Hash className="w-5 h-5" />
                    The Truth About Hashtags in 2026
                </h3>

                <div className="bg-ink-900/50 p-6 rounded-xl border border-white/5 space-y-4">
                    <p className="text-parchment/80 font-serif leading-relaxed">
                        Let me start with honesty: <strong className="text-red-400">hashtags are not the magic growth solution they were in 2018.</strong> The algorithm has fundamentally changed.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-red-950/20 p-4 rounded border-l-2 border-red-500/50">
                            <div className="text-red-400 font-bold mb-1 text-sm">Old Way (Dead)</div>
                            <p className="text-parchment/60 text-xs">Spamming 30 tags. Aiming for massive exposure. Assuming more tags = more views.</p>
                        </div>
                        <div className="bg-green-950/20 p-4 rounded border-l-2 border-green-500/50">
                            <div className="text-green-400 font-bold mb-1 text-sm">New Way (2026)</div>
                            <p className="text-parchment/60 text-xs">Quality over quantity. 8-13 relevant tags. Using tags as descriptive labels for categorization.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- THE THREE-TIER SYSTEM --- */}
            <section className="space-y-12">
                <h3 className="text-3xl font-serif text-parchment text-center mb-12">The Three-Tier Hashtag System</h3>

                {/* Visual: CSS Pyramid Representation */}
                <div className="relative max-w-2xl mx-auto py-8">
                    {/* Tier 3: Large */}
                    <div className="w-1/3 mx-auto mb-2">
                        <TierBlock
                            level="Tier 3: Large"
                            range="500K - 10M+"
                            role="Categorization"
                            color="bg-red-900/40 border-red-500/30 text-red-100"
                            count="2-3 Tags"
                        />
                    </div>
                    {/* Tier 2: Medium */}
                    <div className="w-2/3 mx-auto mb-2">
                        <TierBlock
                            level="Tier 2: Medium"
                            range="50K - 500K"
                            role="Balance"
                            color="bg-gold/20 border-gold/40 text-gold"
                            count="3-5 Tags"
                        />
                    </div>
                    {/* Tier 1: Small */}
                    <div className="w-full mx-auto">
                        <TierBlock
                            level="Tier 1: Small"
                            range="1K - 50K"
                            role="Ranking Potential"
                            color="bg-green-900/40 border-green-500/30 text-green-100"
                            count="3-5 Tags"
                        />
                    </div>
                    <p className="text-center text-xs text-parchment/40 mt-4 uppercase tracking-widest">Total: 8-13 Tags Per Post</p>
                </div>

                <div className="grid gap-6">
                    <TierDeepDive
                        title="Tier 1: Small (1K - 50K)"
                        desc="Your realistic chance to rank in 'Top Posts'. Less competition."
                        examples={['#poetryheals', '#spilledthoughts', '#darkpoetrycommunity', '#indianpoetssociety']}
                    />
                    <TierDeepDive
                        title="Tier 2: Medium (50K - 500K)"
                        desc="The sweet spot. More traffic than small tags, but not impossible to rank."
                        examples={['#poetryislife', '#writingcommunity', '#heartbreakpoetry', '#spilledink']}
                    />
                    <TierDeepDive
                        title="Tier 3: Large (500K - 10M+)"
                        desc="Massive volume. Use sparingly mainly to help Instagram categorize you."
                        examples={['#poetry', '#writersofinstagram', '#lovequotes']}
                        warning="One variation per post only."
                    />
                </div>
            </section>

            {/* --- LOCATION & NICHE --- */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-gold mb-6 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Location + Niche Strategy (India Specific)
                </h3>
                <div className="bg-ink-900/40 p-6 rounded-xl border border-white/5">
                    <p className="text-parchment/80 mb-6">target Indian audiences specifically using these community builders:</p>
                    <div className="grid md:grid-cols-3 gap-4">
                        <NicheGroup title="City Based" tags={['#delhiwriters', '#mumbaipoets', '#bangalorepoetry', '#kolkatawriters']} />
                        <NicheGroup title="Language Based" tags={['#hindipoetry', '#hinglishpoetry', '#urdushayari', '#desiquotes']} />
                        <NicheGroup title="Community Based" tags={['#indianpoetscommunity', '#poetsofindia', '#browngirlthatwrite']} />
                    </div>
                </div>
            </section>

            {/* --- READY TO COPY SETS --- */}
            <section className="space-y-8">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-serif text-gold">Ready-To-Copy Sets</h3>
                    <span className="text-xs text-parchment/50 border border-white/10 px-2 py-1 rounded">Click to copy</span>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <HashtagSet
                        title="Set 1: Love Poetry"
                        tags="#lovepoetry #poetrylovers #loveandpoetry #lovequotesandsayings #romanticpoetry #indianpoetscommunity #poetrycommunityindia #hinglishpoetry #spilledthoughts #heartandpen #writerscommunity #poetryislife"
                    />
                    <HashtagSet
                        title="Set 2: Heartbreak"
                        tags="#heartbreakpoetry #sadquotes #spilledink #heartbrokenpoetry #poetryheals #darkpoetrycommunity #painfulquotes #healingpoetry #indianwriters #poetsofindia #emotionalpoetry #movingonquotes"
                    />
                    <HashtagSet
                        title="Set 3: Motivational"
                        tags="#inspirationalquotes #motivationalpoetry #wordsofwisdom #lifelessons #poetryinspiration #indianwritersofinstagram #quoteoftheday #dailyquotes #writingcommunity #poetrylovers #mindfulness #growthmindset"
                    />
                </div>
            </section>

            {/* --- CAPTION VS COMMENTS --- */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-gold mb-6">Where To Put Hashtags?</h3>

                <div className="relative bg-ink-950 p-8 rounded-2xl border border-gold/10 overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <TrendingUp className="w-32 h-32 text-gold" />
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1 space-y-4">
                            <h4 className="text-xl font-bold text-parchment">The Verdict: Caption Wins</h4>
                            <p className="text-parchment/80 text-sm leading-relaxed">
                                My tests showed <strong className="text-gold">15% higher reach</strong> when tags were in the caption vs comments.
                            </p>
                            <ul className="space-y-2 text-sm text-parchment/70">
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Instagram reads caption immediately.</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Comments can get buried/delayed.</li>
                            </ul>
                        </div>
                        <div className="w-full md:w-1/2 bg-ink-900/80 p-4 rounded-lg border border-dashed border-white/20 font-mono text-xs text-parchment/60">
                            <div>[Your beautiful caption here]</div>
                            <div className="my-2">.</div>
                            <div className="my-2">.</div>
                            <div className="my-2">.</div>
                            <div className="text-blue-400">#hashtag1 #hashtag2 #hashtag3...</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- ACTION ITEMS --- */}
            <section className="bg-ink-950/80 p-8 rounded-2xl border border-gold/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl" />

                <div className="relative z-10 space-y-6">
                    <h3 className="text-2xl font-serif text-white flex items-center gap-3">
                        <Target className="w-6 h-6 text-gold" />
                        Action Items - Chapter 4
                    </h3>
                    <p className="text-parchment/60 italic">Before moving forward, complete these exercises:</p>

                    <div className="space-y-4">
                        <ActionItem text='Research 3 custom hashtag sets (Small, Medium, Large mix) for your niche.' />
                        <ActionItem text='Save these sets in your phone notes for instant access.' />
                        <ActionItem text='Test placement: Post 3 times with tags in Caption vs 3 times in Comments.' />
                        <ActionItem text='Check "Discovery" insights after 2 weeks to see which specific tags are working.' />
                    </div>
                </div>
            </section>

        </div>
    );
};

// --- Sub-Components ---

const TierBlock = ({ level, range, role, color, count }: any) => (
    <div className={`p-4 rounded-lg text-center border transition-all hover:scale-[1.02] shadow-lg ${color}`}>
        <div className="font-bold text-lg mb-1">{level}</div>
        <div className="text-xs opacity-80 font-mono mb-2">{range}</div>
        <div className="text-xs font-bold uppercase tracking-wider opacity-90">{role}</div>
        <div className="mt-2 text-[10px] bg-black/20 inline-block px-2 py-1 rounded">{count}</div>
    </div>
);

const TierDeepDive = ({ title, desc, examples, warning }: any) => (
    <div className="bg-ink-900/40 p-6 rounded-xl border border-white/5 hover:border-gold/20 transition-colors">
        <h4 className="font-bold text-gold text-lg mb-2">{title}</h4>
        <p className="text-parchment/80 text-sm mb-4">{desc}</p>
        <div className="flex flex-wrap gap-2 mb-2">
            {examples.map((tag: string) => (
                <span key={tag} className="text-xs bg-white/5 px-2 py-1 rounded text-parchment/60 font-mono">
                    {tag}
                </span>
            ))}
        </div>
        {warning && (
            <div className="flex items-center gap-2 text-red-400 text-xs mt-3 bg-red-950/10 p-2 rounded">
                <AlertTriangle className="w-3 h-3" />
                {warning}
            </div>
        )}
    </div>
);

const NicheGroup = ({ title, tags }: any) => (
    <div className="bg-ink-950 p-4 rounded-lg border border-white/5">
        <div className="text-xs uppercase text-gold/70 font-bold mb-3">{title}</div>
        <div className="flex flex-wrap gap-2">
            {tags.map((tag: string) => (
                <span key={tag} className="text-[10px] bg-white/5 px-2 py-1 rounded text-parchment/50 font-mono">
                    {tag}
                </span>
            ))}
        </div>
    </div>
);

const HashtagSet = ({ title, tags }: any) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(tags);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            onClick={handleCopy}
            className="group cursor-pointer bg-ink-900/60 p-6 rounded-xl border border-white/5 hover:border-gold/40 hover:bg-ink-900 transition-all relative overflow-hidden"
        >
            <div className="absolute top-4 right-4 text-parchment/20 group-hover:text-gold transition-colors">
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </div>

            <h4 className="font-bold text-parchment mb-4 group-hover:text-gold transition-colors">{title}</h4>

            <div className="p-3 bg-black/30 rounded border border-white/5 text-xs text-parchment/60 font-mono leading-relaxed group-hover:bg-black/50 transition-colors">
                {tags}
            </div>

            <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/20 rounded-xl transition-all pointer-events-none" />

            {copied && (
                <div className="absolute bottom-4 right-4 text-xs text-green-400 font-bold bg-green-950/80 px-2 py-1 rounded">
                    Copied!
                </div>
            )}
        </div>
    );
};

const ActionItem = ({ text }: { text: string }) => (
    <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-white/5 hover:bg-gold/5 transition-colors cursor-default">
        <div className="mt-1 w-5 h-5 rounded-full border-2 border-gold/30 flex items-center justify-center shrink-0">
            <div className="w-2.5 h-2.5 bg-gold rounded-full opacity-0 hover:opacity-100 transition-opacity" />
        </div>
        <p className="text-parchment/90 font-serif">{text}</p>
    </div>
);
