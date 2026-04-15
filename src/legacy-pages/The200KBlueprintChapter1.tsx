import React from 'react';
import {
    Calendar,
    ArrowRight,
    TrendingUp,
    AlertCircle,
    CheckCircle2,
    XCircle,
    Star,
    MessageCircle,
    Users,
    Clock,
    Target
} from 'lucide-react';

export const Chapter1Content = () => {
    return (
        <div className="space-y-16">

            {/* --- THE BEGINNING (Day Zero) --- */}
            <section className="space-y-8">
                <div className="bg-ink-900/50 border border-gold/10 p-8 rounded-2xl relative overflow-hidden group hover:border-gold/20 transition-all">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl group-hover:bg-gold/10 transition-colors" />

                    <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                        <div className="flex-1 space-y-6">
                            <h3 className="text-2xl font-serif text-gold flex items-center gap-3">
                                <Calendar className="w-5 h-5" />
                                The Beginning (Day Zero)
                            </h3>
                            <p className="text-parchment/80 font-serif leading-relaxed">
                                Let me take you back to a cold March evening, one day before I turned twenty years old. I was sitting in my room during the lockdown, surrounded by books I'd collected over years of being a literature student. Van Gogh. Franz Kafka. Charles Bukowski. These writers had saved me during my darkest times, and I felt like nobody on Instagram was talking about them.
                            </p>
                            <p className="text-parchment/80 font-serif leading-relaxed">
                                But here's the thing nobody tells you about starting a poetry page: <strong className="text-gold">the real beginning wasn't pretty.</strong>
                            </p>
                            <p className="text-parchment/80 font-serif leading-relaxed">
                                I had actually created the Inkfetish Instagram account months earlier, in May 2020, right when lockdown started. But I didn't post anything. The account just sat there, empty, while I debated whether I was brave enough to share my voice with the world.
                            </p>
                        </div>

                        {/* Visual: The March 26 Resolution */}
                        <div className="w-full md:w-80 bg-ink-950 p-6 rounded-xl border border-white/5 shadow-2xl shrink-0">
                            <div className="text-center border-b border-white/10 pb-4 mb-4">
                                <div className="text-xs uppercase tracking-widest text-parchment/40">The Resolution</div>
                                <div className="text-4xl font-serif text-gold font-bold mt-2">March 26</div>
                            </div>
                            <p className="text-sm text-parchment/60 italic text-center leading-relaxed">
                                "I would post every single day, no matter how many views I got. No matter if anyone even saw it."
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <p className="text-parchment/80 font-serif leading-relaxed">
                        You see, I had a history with poetry that wasn't exactly encouraging. Back in eleventh and twelfth grade, I carried a diary everywhere. I wrote poetry constantly. And for this, I was bullied mercilessly. My classmates would snatch pages from my diary, tear them up, and throw them in my face. They'd mock me: "Look at the poet! Writing her little poems!" It wasn't harmless teasing. It hurt deeply enough that I blocked most of those people when lockdown gave me the courage to do it.
                    </p>
                    <p className="text-parchment/80 font-serif leading-relaxed">
                        So when I finally decided to start posting on March 26, exactly one day before my twentieth birthday, it wasn't just about starting an Instagram page. <strong className="text-gold italic">It was about reclaiming something that had been taken from me.</strong> It was my birthday resolution to myself.
                    </p>
                </div>
            </section>

            {/* --- THE FIRST ATTEMPTS --- */}
            <section className="space-y-8">
                <div className="bg-white/5 rounded-xl p-8 border-l-4 border-gold/50">
                    <p className="text-parchment/80 font-serif leading-relaxed mb-6">
                        My first few posts were simple. Quotes from Van Gogh. Lines from Kafka. Beautiful words from Bukowski. I designed them myself using basic apps, choosing dark backgrounds with white text. Nothing fancy. I didn't even know what I was doing.
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="h-px bg-white/10 flex-1" />
                        <span className="text-gold font-serif italic text-lg">The Response? Crickets.</span>
                        <div className="h-px bg-white/10 flex-1" />
                    </div>
                    <p className="text-parchment/80 font-serif leading-relaxed mt-6">
                        My posts got maybe ten views. Sometimes twenty. Most were probably just bots or people who accidentally clicked. No comments. No shares. No growth.
                        <br /><br />
                        But I had made a promise to myself, so I kept posting. Every single day.
                    </p>
                </div>
            </section>


            {/* --- THE DARK VALLEY --- */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-gold flex items-center gap-3">
                    <TrendingUp className="w-5 h-5" />
                    The Dark Valley (The First Year of No Growth)
                </h3>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <p className="text-parchment/80 font-serif leading-relaxed">
                            Let me be brutally honest with you: <strong className="text-red-400">my first year on Instagram was a complete failure by most standards.</strong>
                        </p>
                        <p className="text-parchment/80 font-serif leading-relaxed">
                            When I say I had no growth, I mean NO GROWTH. My posts would get around one hundred views if I was lucky. My follower count crawled upward like a snail climbing a mountain. Some days I'd gain three followers. Other days I'd lose two. By the end of month three, I had maybe two hundred followers, and half of them were probably relatives and friends who felt obligated.
                        </p>
                        <p className="text-parchment/80 font-serif leading-relaxed">
                            The algorithm seemed to hate me. Or maybe it just didn't know I existed.
                        </p>
                    </div>

                    {/* Visual: The Failed Experiments */}
                    <div className="bg-ink-950 p-6 rounded-xl border border-white/5 space-y-4">
                        <div className="text-xs uppercase tracking-widest text-parchment/40 mb-2 border-b border-white/5 pb-2">The Failed Experiments</div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-red-400/60 text-sm">
                                <XCircle className="w-4 h-4 shrink-0" />
                                <span>Posted Hindi poetry indiscriminately</span>
                            </div>
                            <div className="flex items-center gap-3 text-red-400/60 text-sm">
                                <XCircle className="w-4 h-4 shrink-0" />
                                <span>Shared popular songs with aesthetic backgrounds</span>
                            </div>
                            <div className="flex items-center gap-3 text-red-400/60 text-sm">
                                <XCircle className="w-4 h-4 shrink-0" />
                                <span>Copied "viral" designs from Pinterest</span>
                            </div>
                        </div>
                        <div className="mt-4 p-3 bg-red-950/20 rounded-lg text-red-300 text-xs italic text-center">
                            "I thought if I just copied what was working for other pages, it would work for me too. It didn't."
                        </div>
                    </div>
                </div>

                <div className="bg-ink-900/50 p-6 rounded-xl border border-gold/10">
                    <p className="text-parchment/80 font-serif leading-relaxed">
                        Instagram in 2026 is incredibly smart at detecting copied content and unoriginal ideas. It promotes uniqueness. It rewards fresh perspectives. And I was just another page trying to do what everyone else was doing.
                    </p>
                    <p className="text-parchment/80 font-serif leading-relaxed mt-4">
                        The temptation to quit was overwhelming. I'd see other poetry pages growing to ten thousand followers in months, and I'd wonder what was wrong with me. Why wasn't I good enough? Why didn't people care about the beautiful words I was sharing?
                        <br /><br />
                        But remember that promise I made to myself? That birthday resolution? It kept me going. I posted every single day, even when only fifty people saw it.
                    </p>
                </div>
            </section>


            {/* --- THE TURNING POINT --- */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-gold flex items-center gap-3">
                    <Star className="w-5 h-5 fill-gold" />
                    The Turning Point (When Everything Changed)
                </h3>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Visual: Hero Image for Turning Point */}
                    <div className="relative group rounded-xl overflow-hidden shadow-2xl border border-gold/20">
                        <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                        <img
                            src="/images/blueprint_turning_point.png"
                            alt="The Viral Moment"
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 z-20">
                            <div className="text-gold font-bold text-3xl font-serif">1,000,000+</div>
                            <div className="text-parchment/60 text-sm uppercase tracking-widest">Views in one week</div>
                        </div>
                    </div>

                    <div className="space-y-6 flex flex-col justify-center">
                        <p className="text-parchment/80 font-serif leading-relaxed">
                            Six months in, something shifted. I stopped trying to be everything to everyone. I went back to what I actually loved: <strong className="text-gold">classic literature.</strong> Van Gogh. Kafka. Bukowski. Sylvia Plath. The writers who had saved me.
                        </p>
                        <p className="text-parchment/80 font-serif leading-relaxed">
                            I made a decision: I would become the page for classic literature quotes and dark poetry. Nothing else. Just that.
                        </p>
                        <div className="bg-white/5 p-6 rounded-lg border-l-2 border-gold italic text-parchment/70">
                            "Some days I am Van Gogh's starry night, and some days I am his suicide letter."
                        </div>
                        <p className="text-parchment/80 font-serif leading-relaxed">
                            That reel changed everything. It hit one hundred thousand views in the first day. Then two hundred thousand. Then five hundred thousand. By the end of the week, it had crossed a million views. My follower count jumped from around <span className="text-red-400">800</span> to over <span className="text-gold font-bold">5,000</span> in just seven days.
                        </p>
                    </div>
                </div>

                <div className="bg-ink-950 p-6 rounded-xl border border-white/5">
                    <h4 className="text-gold font-serif text-lg mb-4">The Crucial Realization</h4>
                    <p className="text-parchment/80 font-serif leading-relaxed mb-4">
                        People were commenting, sharing, saving the post. They were saying things like "I've never felt so seen" and "How did you know exactly what I needed to hear?" The reel resonated because it touched something real. It acknowledged both the beauty and the darkness that exists in all of us.
                    </p>
                    <div className="flex items-center gap-4 bg-gold/10 p-4 rounded-lg">
                        <MessageCircle className="w-6 h-6 text-gold" />
                        <p className="text-sm text-gold font-bold">
                            People don't just want pretty words. They want somebody who understands their dark side.
                        </p>
                    </div>
                    <p className="text-parchment/60 text-sm mt-4 italic">
                        That reel has now been posted twice on my page (I deleted and reposted it once), and both times it went to over a million views. It taught me that when you find content that truly resonates, you've struck gold.
                    </p>
                </div>
            </section>

            {/* --- THE GROWTH PHASES --- */}
            <section className="space-y-12">
                <h3 className="text-3xl font-serif text-parchment text-center mb-12">The Growth Phases</h3>

                <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-12">
                    {/* Phase 1 */}
                    <div className="relative pl-8 md:pl-12">
                        <div className="absolute -left-3 top-0 w-6 h-6 bg-ink-900 border-2 border-white/20 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white/50 rounded-full" />
                        </div>
                        <div className="space-y-4">
                            <div className="flex flex-col md:flex-row gap-2 md:items-center">
                                <h4 className="text-xl font-bold text-parchment">Phase 1: The Struggle</h4>
                                <span className="text-xs px-2 py-1 bg-white/5 rounded text-parchment/50">0 to 1,000 followers • 6 months</span>
                            </div>
                            <div className="bg-ink-950/50 p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                <p className="text-parchment/80 mb-4 text-sm">
                                    <strong className="text-gold">Strategy:</strong> Survival. Posted daily without fail. Used search-based hashtags. Commented on bigger pages.
                                </p>
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <div className="text-green-400/80">
                                        <span className="font-bold block mb-1">Worked:</span>
                                        Consistency built a habit. Learned what my audience engaged with.
                                    </div>
                                    <div className="text-red-400/80">
                                        <span className="font-bold block mb-1">Didn't Work:</span>
                                        Copying others. Random content. Trending sounds I didn't get.
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-gold/80 italic">
                                Key Learning: You need to post consistently long enough to discover your unique voice and niche.
                            </p>
                        </div>
                    </div>

                    {/* Phase 2 */}
                    <div className="relative pl-8 md:pl-12">
                        <div className="absolute -left-3 top-0 w-6 h-6 bg-ink-900 border-2 border-gold/50 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(255,215,0,0.2)]">
                            <div className="w-2 h-2 bg-gold rounded-full" />
                        </div>
                        <div className="space-y-4">
                            <div className="flex flex-col md:flex-row gap-2 md:items-center">
                                <h4 className="text-xl font-bold text-gold">Phase 2: The Breakthrough</h4>
                                <span className="text-xs px-2 py-1 bg-gold/10 rounded text-gold/70">1,000 to 10,000 followers • 3 months</span>
                            </div>
                            <div className="bg-gradient-to-br from-ink-950 to-brown-950/30 p-6 rounded-xl border border-gold/20">
                                <p className="text-parchment/80 mb-4 text-sm">
                                    <strong className="text-gold">Strategy:</strong> Focused Niche. Doubled down on classic lit + dark aesthetic after the viral reel. One feed post daily, one reel every 3 days.
                                </p>
                                <ul className="list-disc list-inside text-sm text-parchment/70 space-y-1 mb-4">
                                    <li>70% Classic Lit Quotes</li>
                                    <li>20% Emerging Original Poetry</li>
                                    <li>10% Engagement Stories (Polls)</li>
                                </ul>
                                <p className="text-sm text-parchment/80">
                                    <strong>Collabs:</strong> Shoutout exchanges with similar-sized pages to access new audiences.
                                </p>
                            </div>
                            <p className="text-xs text-gold/80 italic">
                                Key Learning: The algorithm rewards consistency within a niche. It categorized me as "classic lit page" and found my people.
                            </p>
                        </div>
                    </div>

                    {/* Phase 3 */}
                    <div className="relative pl-8 md:pl-12">
                        <div className="absolute -left-3 top-0 w-6 h-6 bg-ink-900 border-2 border-white/20 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white/50 rounded-full" />
                        </div>
                        <div className="space-y-4">
                            <div className="flex flex-col md:flex-row gap-2 md:items-center">
                                <h4 className="text-xl font-bold text-parchment">Phase 3: Scaling Up</h4>
                                <span className="text-xs px-2 py-1 bg-white/5 rounded text-parchment/50">10,000 to 50,000 followers • 6 months</span>
                            </div>
                            <div className="bg-ink-950/50 p-6 rounded-xl border border-white/5">
                                <p className="text-parchment/80 mb-4 text-sm">
                                    <strong className="text-gold">Strategy:</strong> Original Content + High Engagement. Responding to every DM/comment within 1 hour.
                                </p>
                                <div className="space-y-2 text-sm text-parchment/70">
                                    <p>• <strong>Monetization:</strong> Multiple brand deals, audio deals, and launched competitions to sustain the page.</p>
                                    <p>• <strong>Community:</strong> Featured other poets weekly to build goodwill.</p>
                                </div>
                            </div>
                            <p className="text-xs text-gold/80 italic">
                                Key Learning: Engagement rate &gt; Follower count. A small, engaged community grows faster.
                            </p>
                        </div>
                    </div>

                    {/* Phase 4 */}
                    <div className="relative pl-8 md:pl-12">
                        <div className="absolute -left-3 top-0 w-6 h-6 bg-ink-900 border-2 border-white/20 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white/50 rounded-full" />
                        </div>
                        <div className="space-y-4">
                            <div className="flex flex-col md:flex-row gap-2 md:items-center">
                                <h4 className="text-xl font-bold text-parchment">Phase 4: Momentum</h4>
                                <span className="text-xs px-2 py-1 bg-white/5 rounded text-parchment/50">50,000 to 200,000 followers • 7 months</span>
                            </div>
                            <div className="bg-ink-950/50 p-6 rounded-xl border border-white/5">
                                <p className="text-parchment/80 mb-4 text-sm">
                                    <strong className="text-gold">Strategy:</strong> Systems & Data. Batched content. Analyzed insights religiously.
                                </p>
                                <p className="text-sm text-parchment/70 mb-2">
                                    Increased reel frequency to 5/week. Experimented with formats.
                                </p>
                                <div className="p-3 bg-gold/5 rounded border border-gold/10 text-gold text-xs font-bold">
                                    Current Status: ~195k followers. Organic growth 1-2k/week. Brands approach me.
                                </div>
                            </div>
                            <p className="text-xs text-gold/80 italic">
                                Key Learning: Once you crack the algorithm, it's not magic. It's a scalable system.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- KEY LESSONS --- */}
            <section className="space-y-8">
                <h3 className="text-3xl font-serif text-gold text-center">Key Lessons From The Journey</h3>
                <p className="text-center text-parchment/60 italic">Distilling two years of building Inkfetish.</p>

                <div className="grid md:grid-cols-2 gap-4">
                    <LessonCard title="Consistency &gt; Talent" desc="I'm not the best poet. But I showed up every day for two years. That signaled to the algorithm that I was serious." />
                    <LessonCard title="Niche Clarity is Power" desc="When I tried to be everything, I was nothing. When I became THE page for classic lit, I became something." />
                    <LessonCard title="Uniqueness &gt; Quality" desc="A perfectly designed generic quote will lose to a poorly designed unique perspective every time. Originality wins in 2026." />
                    <LessonCard title="Engagement is Reach" desc="Comments signal value. 1,000 likes with 500 comments reaches more people than 5,000 likes with 100 comments." />
                    <LessonCard title="Your Pain is Power" desc="My authenticity about bullying and darkness created connection. Don't hide the struggle." />
                    <LessonCard title="Community &gt; Audience" desc="I don't have followers; I have a support system. That's worth infinitely more than vanity metrics." />
                    <LessonCard title="Patience is the Price" desc="Six months of 100 views broke most people. It didn't break me. That's the only difference." fullWidth />
                </div>
            </section>

            {/* --- ACTION ITEMS --- */}
            <section className="bg-ink-950/80 p-8 rounded-2xl border border-gold/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl" />

                <div className="relative z-10 space-y-6">
                    <h3 className="text-2xl font-serif text-white flex items-center gap-3">
                        <Target className="w-6 h-6 text-gold" />
                        Action Items - Chapter 1
                    </h3>
                    <p className="text-parchment/60 italic">Before moving to the next chapter, complete these exercises:</p>

                    <div className="space-y-4">
                        <ActionItem text='Write down your "why". Make it deeper than "I want followers". Who needs to hear your words?' />
                        <ActionItem text='Study your first ten posts. What patterns do you see? What got the most/least engagement?' />
                        <ActionItem text="Identify which growth phase you're currently in. Be honest. Everyone starts in Phase 1." />
                        <ActionItem text="Set a realistic six-month follower goal. Break it down into milestones (1k, 5k, 10k)." />
                    </div>
                </div>
            </section>

        </div>
    );
};

const LessonCard = ({ title, desc, fullWidth }: { title: string, desc: string, fullWidth?: boolean }) => (
    <div className={`bg-ink-900/40 p-6 rounded-xl border border-white/5 hover:border-gold/30 transition-all group ${fullWidth ? 'md:col-span-2' : ''}`}>
        <h4 className="text-gold font-bold mb-2 group-hover:text-white transition-colors">{title}</h4>
        <p className="text-parchment/70 text-sm leading-relaxed">{desc}</p>
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
