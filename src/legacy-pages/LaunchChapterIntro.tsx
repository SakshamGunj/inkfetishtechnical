import React from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";

const LaunchChapterIntro = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 font-serif text-lg md:text-xl leading-relaxed text-parchment/90">
            {/* Title */}
            <div className="text-center mb-16">
                <span className="text-gold text-sm font-sans uppercase tracking-widest block mb-4">Introduction</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">THE LAUNCH OPERATING SYSTEM</h2>
                <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
            </div>

            {/* Paragraph 1 - The Story */}
            <p className="mb-6">
                Let me tell you about two authors I know.
            </p>
            <p className="mb-6">
                Meera spent eight months writing her debut romance novel. Beautiful prose. Compelling characters. The day she published on Amazon, she posted on Instagram with a link and waited. Three months later, she had sold forty-seven copies, mostly to friends and family. She had nine reviews. Her book was ranked somewhere around 400,000 in the Kindle store.
            </p>
            <p className="mb-8">
                Aditya also wrote his debut that same year, also a romance. But starting ninety days before launch, he built an email list of three hundred readers. He recruited fifty people to read advance copies. He coordinated with ten book bloggers. On launch day, his book hit number three in Contemporary Romance on Amazon India. By week two, he had seventy-eight reviews. By month three, he had sold over two thousand copies and quit his marketing job to write full-time.
            </p>
            <p className="mb-12 font-bold text-white text-2xl text-center italic">
                Same genre. Similar quality writing. Wildly different outcomes.
            </p>

            {/* Visual 1: Comparison */}
            <figure className="my-16">
                <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 group">
                    <img
                        src="/images/launch/comparison.png"
                        alt="Comparison of Amateur vs Professional Launch Trajectories"
                        className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
                <figcaption className="text-center text-sm text-parchment/60 mt-4 font-sans italic">
                    Figure 1: The difference isn't talent. It's the trajectory designed by a systematized launch.
                </figcaption>
            </figure>

            <p className="mb-6">
                The difference was not talent. It was not luck. It was system versus chaos.
            </p>
            <p className="mb-6">
                Here's what nobody tells you about self-publishing. Writing the book is the easy part. What happens in the ninety days around your launch determines everything. Your sales velocity. Your review count. Your algorithmic visibility. Your ability to actually build a career instead of just having a hobby that costs you money.
            </p>
            <p className="mb-8">
                Most authors treat launch day like a birthday party. They announce it, hope people show up, and feel disappointed when the confetti settles and nothing has changed. But professional authors treat launch like a product release. They build anticipation. They coordinate assets. They stack the deck in their favor.
            </p>

            {/* Visual 2: Launch System */}
            <figure className="my-16">
                <div className="rounded-xl overflow-hidden shadow-2xl border border-gold/20 relative">
                    <div className="absolute inset-0 bg-gold/5 mix-blend-overlay" />
                    <img
                        src="/images/launch/system.png"
                        alt="The Launch Operating System Conceptual Visualization"
                        className="w-full h-auto"
                    />
                </div>
                <figcaption className="text-center text-sm text-parchment/60 mt-4 font-sans italic">
                    Figure 2: Viewing your launch as an interconnected Operating System (OS) enables predictable results.
                </figcaption>
            </figure>

            <p className="mb-6">
                This book gives you that system.
            </p>
            <p className="mb-6">
                If you follow this ninety-day framework, you will accomplish five specific things.
            </p>
            <p className="mb-6">
                First, you will build an email list of real readers, not just social media followers who scroll past your posts. These people will actually open your messages and buy your books.
            </p>
            <p className="mb-6">
                Second, you will get fifty-plus reviews in your first week. Not in six months. Not eventually. In week one. This is the difference between Amazon's algorithm noticing you or burying you.
            </p>
            <p className="mb-6">
                Third, you will hit bestseller rank in your category. Not the overall Kindle store, that is unrealistic for most debuts. But in your specific category, you will rank high enough that readers browsing that section will see your cover.
            </p>
            <p className="mb-6">
                Fourth, you will avoid the ten catastrophic mistakes that kill ninety percent of self-published books before they even have a chance. Wrong cover. Bad positioning. No launch plan. Invisible metadata. We are fixing all of that.
            </p>
            <p className="mb-12">
                Fifth, you will have a repeatable system. Book two will be easier. Book three will be easier still. You are not just launching one book. You are building a publishing business.
            </p>

            <div className="my-16 p-8 bg-ink-900/50 border-l-4 border-gold rounded-r-xl">
                <h3 className="text-2xl font-bold text-white mb-4 font-sans">Who this playbook is for.</h3>
                <p className="mb-6">
                    This is for self-published authors in India and globally who are serious about treating their book as a product, not just a passion project. You do not need a marketing degree. You do not need a massive budget. But you do need to be willing to work the system consistently for ninety days.
                </p>
                <p className="mb-6">
                    This is for the IT professional in Pune who writes thrillers on weekends. The college student in Delhi who finished a YA fantasy. The corporate trainer in Mumbai who has a productivity book. The stay-at-home parent in Bangalore with a romance manuscript.
                </p>
                <p className="mb-0 font-bold text-gold">
                    If you are willing to put in focused effort, this system works regardless of your starting point.
                </p>
            </div>

            <div className="my-16 p-8 bg-red-950/20 border-l-4 border-red-500/50 rounded-r-xl">
                <h3 className="text-2xl font-bold text-red-100 mb-4 font-sans">What this is NOT.</h3>
                <p className="mb-4 text-red-50">
                    This is not vague advice about posting more on social media or finding your authentic voice. You will find zero fluffy platitudes here.
                </p>
                <p className="mb-4 text-red-50">
                    This is not theory from someone who has never actually sold books. Everything in this playbook comes from launching over one hundred titles, including multiple category bestsellers.
                </p>
                <p className="mb-0 text-red-50">
                    This is not a get-rich-quick scheme. Self-publishing is a business. Some books earn ₹5,000 a month. Some earn ₹50,000. Some earn ₹5 lakh. Your results depend on your execution, your genre, and your consistency. But without a launch system, you earn nothing.
                </p>
            </div>

            <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-white mb-8">The Five Launch Pillars</h3>
                <p className="mb-8">
                    Everything in this playbook connects to five core pillars. Think of these as the foundation of your launch operating system.
                </p>
            </div>

            {/* Visual 3: Five Pillars */}
            <figure className="my-12">
                <div className="rounded-xl overflow-hidden shadow-2xl border border-blue-500/20">
                    <img
                        src="/images/launch/pillars.png"
                        alt="The Five Strategic Pillars of a Bestseller Launch"
                        className="w-full h-auto"
                    />
                </div>
                <figcaption className="text-center text-sm text-parchment/60 mt-4 font-sans italic">
                    Figure 3: Market Thinking, Positioning, Platform, Calendar, and Growth Engine form the structural integrity of your launch.
                </figcaption>
            </figure>

            <p className="mb-6">
                Pillar One is Market-First Thinking. Most authors write first and find readers later. That is backwards. You need to understand your ideal reader, your competitive landscape, and your unique positioning before you finalize your title or cover. The market tells you what works. Your job is to listen and adapt.
            </p>
            <p className="mb-6">
                Pillar Two is Positioning and Packaging. Your title, subtitle, cover, and book description are not creative choices. They are strategic marketing assets. Every element must signal genre, create intrigue, and make the purchase decision easy. Your cover is a billboard on a tiny thumbnail. Your description is a sales page. Treat them accordingly.
            </p>
            <p className="mb-6">
                Pillar Three is Platform Assets. You need three things: one primary social platform where your readers actually hang out, an email list you own, and a simple landing page. That is it. You do not need a fancy website or presence on every platform. You need focused effort on the channels that actually convert to sales.
            </p>
            <p className="mb-6">
                Pillar Four is the Ninety-Day Launch Calendar. This is the heartbeat of everything. A detailed timeline from sixty days before launch through sixty days after. Every week has specific goals and actions. You are not winging it. You are executing a plan.
            </p>
            <p className="mb-12">
                Pillar Five is the Post-Launch Growth Engine. Most authors think launch week is the finish line. Wrong. Launch week is the starting line. The real game is turning your book into a sales machine that runs for months and years. Sustained visibility. Continuous reviews. Strategic promotions. Series planning.
            </p>

            <div className="my-16 border-t border-b border-white/10 py-12">
                <h3 className="text-2xl font-bold text-white mb-6 font-sans">How to use this playbook.</h3>
                <p className="mb-6">
                    Read it straight through first. Get the full picture. Then go back to each chapter and execute the action steps in order. Keep a notebook or Google Doc where you track your progress.
                </p>
                <p className="mb-6">
                    Some sections will feel uncomfortable. The chapter on positioning makes you niche down hard. The launch calendar will feel intense. That discomfort means you are doing real work, not just consuming information.
                </p>
                <p className="mb-8">
                    You will be tempted to skip steps or do things halfway. Fight that urge. The system works because all the pieces connect. Partial execution gets partial results.
                </p>
                <p className="text-xl text-center text-gold font-bold italic">
                    Ready? Let's build your launch.
                </p>
            </div>
        </div>
    );
};

export default LaunchChapterIntro;
