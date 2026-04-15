import React from 'react';
import { motion } from 'framer-motion';
import {
    Clock,
    DollarSign,
    CheckCircle2,
    Users,
    Award,
    AlertTriangle,
    XCircle,
    BookOpen,
    Globe,
    Layout,
    ShieldCheck,
    TrendingUp,
    Search
} from 'lucide-react';
import { Card } from "@/components/ui/card";

export const Chapter1Content = () => {
    return (
        <div className="space-y-12">

            {/* 1. The Dream That Takes Too Long - Narrative Text Block */}
            <section className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-serif text-parchment">The Dream That Takes Too Long</h3>
                <div className="prose prose-invert prose-lg text-parchment/80 leading-relaxed font-serif">
                    <p>
                        Picture this: You've been writing for years. Poems, stories, thoughts that keep you awake at night. You've filled notebooks, typed until your fingers cramped, revised until you've memorized every word.
                    </p>
                    <p>
                        And now you want to publish.
                    </p>
                    <p>
                        So you research traditional publishing. You learn about query letters, literary agents, submission guidelines that run five pages long. You discover that the average time from query to published book is two to three years. If you're lucky. If you get accepted. After hundreds of rejections.
                    </p>
                    <p>
                        Then you look into self-publishing. That seems faster, right? Except now you're drowning in decisions. Cover design. Interior layout. Editing. Proofreading. ISBN numbers. Distribution channels. Marketing strategies. Print-on-demand versus offset printing. Amazon algorithms. Social media promotion plans.
                    </p>
                    <p>
                        It's overwhelming. You just wanted to be a writer, not run a publishing company.
                    </p>
                    <blockquote className="border-l-2 border-gold pl-6 italic text-parchment my-8">
                        So you tell yourself, "Someday. When I'm ready. When I have more time. When I'm better."
                        <br /><span className="text-gold mt-2 block not-italic font-sans text-sm uppercase tracking-widest">And someday never comes.</span>
                    </blockquote>
                </div>
            </section>

            {/* 2. The Traditional Publishing Trap & Self-Publishing Overwhelm - Visual Comparison */}
            <section className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Traditional Trap */}
                    <Card className="bg-ink-900/40 border-red-900/30 p-8 relative overflow-hidden group hover:border-red-500/20 transition-all">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Clock className="w-24 h-24 text-red-500" />
                        </div>
                        <h3 className="text-xl font-bold text-red-400 mb-4 font-serif">The Traditional Publishing Trap</h3>
                        <div className="space-y-4 text-parchment/80 text-sm">
                            <p>Let me be direct about traditional publishing. It's not impossible, but it's designed for a specific type of project and a specific type of timeline.</p>
                            <ul className="space-y-2 list-disc pl-4 marker:text-red-500/50">
                                <li><strong>Timeline:</strong> Slow wheels turning for two years.</li>
                                <li><strong>Requirement:</strong> Proven markets, minimal risk, massive social following.</li>
                                <li><strong>For Poets:</strong> "Too small" market. "Too tight" margins.</li>
                                <li><strong>Agents:</strong> Like finding a needle in a haystack. During a dust storm.</li>
                            </ul>
                            <p className="italic text-red-300/80 pt-2 border-t border-red-900/30">
                                "This isn't meant to discourage you. It's meant to free you. Because traditional publishing isn't the only path anymore."
                            </p>
                        </div>
                    </Card>

                    {/* Self-Publishing Overwhelm */}
                    <Card className="bg-ink-900/40 border-orange-900/30 p-8 relative overflow-hidden group hover:border-orange-500/20 transition-all">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <DollarSign className="w-24 h-24 text-orange-500" />
                        </div>
                        <h3 className="text-xl font-bold text-orange-400 mb-4 font-serif">The Self-Publishing Overwhelm</h3>
                        <div className="space-y-4 text-parchment/80 text-sm">
                            <p>Self-publishing gives you complete control. You own everything. You keep all profits. <strong>You also do all the work.</strong></p>
                            <div className="bg-orange-950/20 p-4 rounded-lg border border-orange-500/10">
                                <h4 className="text-orange-300 text-xs uppercase tracking-widest mb-2 font-bold">The Cost of "Free"</h4>
                                <ul className="space-y-1 text-xs">
                                    <li className="flex justify-between"><span>Cover Design</span> <span>₹15,000 - ₹30,000</span></li>
                                    <li className="flex justify-between"><span>Editing</span> <span>₹10,000+</span></li>
                                    <li className="flex justify-between border-t border-orange-500/20 pt-1 mt-1 font-bold text-orange-200"><span>Total Risk</span> <span>₹50,000+ & 6 Months</span></li>
                                </ul>
                            </div>
                            <p className="italic text-orange-300/80">
                                "Without a platform... your book sits on Amazon with zero sales. Most sell fewer than 100 copies total."
                            </p>
                        </div>
                    </Card>
                </div>

                <p className="text-center text-parchment/80 italic text-lg max-w-2xl mx-auto">
                    "If you're reading this guide, you're probably looking for something faster, easier, and more affordable. That's where anthology publishing changes everything."
                </p>
            </section>

            {/* 3. The Anthology Advantage - Infographic/Grid */}
            <section className="space-y-8">
                <div className="text-center mb-8">
                    <h3 className="text-2xl md:text-3xl font-serif text-gold mb-4">The Anthology Advantage</h3>
                    <p className="text-parchment/70 max-w-3xl mx-auto">
                        An anthology is a collection of works by multiple authors, published together. Think of it as a collaborative project where twenty, fifty, or even two hundred writers each contribute one piece to create something bigger than any of us could create alone.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-ink-800/50 p-6 rounded-xl border border-white/5 hover:border-gold/30 transition-all group">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                            <TrendingUp className="w-6 h-6 text-blue-400" />
                        </div>
                        <h4 className="text-lg font-bold text-parchment mb-2">Speed</h4>
                        <p className="text-sm text-parchment/70">
                            Traditional: Years. Self: Months. <strong>Anthology: Weeks.</strong><br />
                            From submission to published author status in 6-8 weeks total.
                        </p>
                    </div>
                    <div className="bg-ink-800/50 p-6 rounded-xl border border-white/5 hover:border-gold/30 transition-all group">
                        <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                            <DollarSign className="w-6 h-6 text-green-400" />
                        </div>
                        <h4 className="text-lg font-bold text-parchment mb-2">Affordability</h4>
                        <p className="text-sm text-parchment/70">
                            Instead of ₹50,000+, quality co-authorship is typically <strong>₹3,000 - ₹8,000 total.</strong> Professional team included.
                        </p>
                    </div>
                    <div className="bg-ink-800/50 p-6 rounded-xl border border-white/5 hover:border-gold/30 transition-all group">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                            <Award className="w-6 h-6 text-purple-400" />
                        </div>
                        <h4 className="text-lg font-bold text-parchment mb-2">Legitimacy</h4>
                        <p className="text-sm text-parchment/70">
                            Real ISBN. Searchable on Amazon. You're not just "someone who wrote something." <strong>You're a published author with proof.</strong>
                        </p>
                    </div>
                    <div className="bg-ink-800/50 p-6 rounded-xl border border-white/5 hover:border-gold/30 transition-all group md:col-span-1">
                        <div className="w-12 h-12 bg-pink-500/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-pink-500/20 transition-colors">
                            <Users className="w-6 h-6 text-pink-400" />
                        </div>
                        <h4 className="text-lg font-bold text-parchment mb-2">Community</h4>
                        <p className="text-sm text-parchment/70">
                            Join 200+ fellow authors. Cross-promote. Build relationships. Don't publish alone.
                        </p>
                    </div>
                    <div className="bg-ink-800/50 p-6 rounded-xl border border-white/5 hover:border-gold/30 transition-all group md:col-span-2 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-transparent" />
                        <div className="relative z-10 flex flex-col justify-center h-full">
                            <h4 className="text-lg font-bold text-gold mb-2">Lower Barrier, Same Credential</h4>
                            <p className="text-sm text-parchment/80">
                                Whether solo collection or anthology, the credential is identical. LinkedIn says "Published Author." Resume lists publication. One path requires one poem and 15 days. The other requires thirty poems and two years.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Quality vs Vanity - Red & Green Flags */}
            <section className="space-y-8">
                <div className="mb-6">
                    <h3 className="text-2xl font-serif text-parchment mb-4">What Makes a Quality Anthology Worth Joining</h3>
                    <p className="text-parchment/80 italic">
                        Not all anthologies are created equal. Some are vanity projects; others are legitimate publications. Your name will be attached forever. Choose wisely.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Red Flags */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <XCircle className="w-6 h-6 text-red-500" />
                            <h4 className="text-xl font-bold text-red-400 font-serif">Red Flags (Run Away)</h4>
                        </div>
                        <div className="space-y-3">
                            {[
                                { title: "No ISBN Registration", desc: "If no ISBN, it's just an expensive PDF. Not a real publication." },
                                { title: "Excessive Fees", desc: "If &gt; ₹15k-20k with vague explanations, walk away." },
                                { title: "No Distribution Plan", desc: "Must be on Amazon/Major retailers, not just a random website." },
                                { title: "Zero Curation", desc: "If they accept everything, it's a directory, not an anthology." },
                                { title: "Poor Production", desc: "Bad covers, typos, cramped layout. Check previous work." },
                                { title: "Hidden Costs", desc: "Mandatory 'author copy' fees or surprise add-ons." },
                                { title: "Unclear Timeline", desc: "Vague dates usually mean disorganized operations." }
                            ].map((item, i) => (
                                <div key={i} className="bg-red-950/20 border border-red-900/30 p-4 rounded-lg">
                                    <strong className="text-red-300 block mb-1 text-sm">{item.title}</strong>
                                    <span className="text-xs text-parchment/60">{item.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Green Flags */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                            <h4 className="text-xl font-bold text-green-400 font-serif">Green Flags (Quality)</h4>
                        </div>
                        <div className="space-y-3">
                            {[
                                { title: "Real ISBN Registration", desc: "Searchable on Amazon, Google Books, Libraries." },
                                { title: "Personal Author Website", desc: "Often included. Permanent professional home." },
                                { title: "Amazon Distribution", desc: "Properly categorized and globally available." },
                                { title: "Professional Design", desc: "Striking cover, clean margins, good paper." },
                                { title: "Editorial Curation", desc: "Real selection process. Not pay-to-play." },
                                { title: "Author Recognition", desc: "Name on cover/bio page. Treated as co-author." },
                                { title: "Fair Transparent Pricing", desc: "No surprises. Clear value exchange." },
                                { title: "Strong Social Proof", desc: "Engaged community, happy previous authors." }
                            ].map((item, i) => (
                                <div key={i} className="bg-green-950/20 border border-green-900/30 p-4 rounded-lg">
                                    <strong className="text-green-300 block mb-1 text-sm">{item.title}</strong>
                                    <span className="text-xs text-parchment/60">{item.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. The Inkfetish Quality Standard - Showcase */}
            <section className="my-16 bg-gradient-to-br from-ink-900 to-black border border-gold/30 rounded-2xl p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 text-center mb-10">
                    <h3 className="text-3xl font-serif text-gold mb-4">The Inkfetish Quality Standard</h3>
                    <p className="text-parchment/80 max-w-2xl mx-auto">
                        Let me show you what a quality anthology should provide using a specific example. <strong>Inkfetish Publications</strong>, which has successfully launched multiple editions in recent months and is organizing many more for India's writing community, sets this standard:
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {[
                        { icon: <BookOpen className="w-5 h-5 text-gold" />, title: "Real ISBN Registration", desc: "Officially published. Separates real publication from vanity." },
                        { icon: <Globe className="w-5 h-5 text-gold" />, title: "Personal Author Website", desc: "Custom domain (yourname.inkfetish.com). Permanent online presence." },
                        { icon: <Users className="w-5 h-5 text-gold" />, title: "Massive Distribution Reach", desc: "Featured to 199,000+ engaged writers on Instagram." },
                        { icon: <Layout className="w-5 h-5 text-gold" />, title: "Professional Book Quality", desc: "Premium cover, clean layout, quality printing. A book you're proud of." },
                        { icon: <TrendingUp className="w-5 h-5 text-gold" />, title: "Lifetime Royalty Rights", desc: "Passive income from every copy sold. Forever." },
                        { icon: <Users className="w-5 h-5 text-gold" />, title: "Community Access", desc: "Network of 200+ authors. Friendships and future collaborations." },
                        { icon: <Award className="w-5 h-5 text-gold" />, title: "Social Proof", desc: "Gain visibility and followers from the announcement." },
                        { icon: <ShieldCheck className="w-5 h-5 text-gold" />, title: "LinkedIn Credential", desc: "'Published Author' backed by real ISBN. Verifiable." }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-gold/20 transition-all">
                            <div className="shrink-0 mt-1">{item.icon}</div>
                            <div>
                                <h4 className="font-bold text-parchment text-sm mb-1">{item.title}</h4>
                                <p className="text-xs text-parchment/60">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 text-center border-t border-white/10 pt-8">
                    <p className="text-lg font-serif text-parchment italic mb-6">
                        "This is the standard a quality anthology should meet. <span className="text-red-400">Anything significantly less than this, and you should ask why.</span>"
                    </p>
                </div>
            </section>

            {/* 6. Making Your Decision - Narrative Closing */}
            <section className="space-y-6 bg-ink-800/30 p-8 rounded-xl border-l-4 border-gold">
                <h3 className="text-2xl font-serif text-gold mb-4">Making Your Decision</h3>
                <div className="prose prose-invert prose-lg text-parchment/80 leading-relaxed font-serif">
                    <p>Before you commit to any anthology, ask yourself these questions:</p>
                    <ul className="list-disc pl-5 space-y-2 marker:text-gold">
                        <li>Will this enhance my author credibility or diminish it?</li>
                        <li>Will I be proud to share this book with potential clients and employers?</li>
                        <li>Will this anthology still matter five years from now, or will it disappear?</li>
                        <li>Am I paying a fair price for real value, or am I being overcharged for a vanity project?</li>
                    </ul>
                    <p className="text-xl font-bold text-parchment mt-6">
                        Your first publication matters. It sets the trajectory for how you're perceived as an author. Choose quality. Choose legitimacy. Choose an anthology you'll still be glad you joined a decade from now.
                    </p>
                    <p className="italic text-sm opacity-60 mt-8">
                        Want to see these standards in action? Keep reading. We'll introduce you to an anthology that checks every single box by the end of this guide. But first, you need to learn how to write poetry that actually gets selected.
                    </p>
                </div>
            </section>
        </div>
    );
};
