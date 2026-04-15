import React from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp, DollarSign, BookOpen, Users,
    Zap, Target, ArrowRight, BarChart3, AlertTriangle, Layers
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PagesChapterIntro = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 font-serif text-lg md:text-xl leading-relaxed text-parchment/90">
            {/* Title Section */}
            <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 border-emerald-500/50 text-emerald-400 tracking-[0.2em] font-sans">
                    THE FOUNDATION
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">THE ₹10 CRORE WRITER'S MINDSET</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-gold mx-auto rounded-full" />
            </div>

            {/* Paragraph 1 */}
            <p className="mb-6 first-letter:text-5xl first-letter:text-emerald-400 first-letter:font-bold first-letter:mr-2 first-letter:float-left">
                In 2019, I earned ₹2.4 lakh from my first traditionally published book. It took eighteen months of work—writing, editing, waiting for the publisher's approval, more waiting for the release date, then watching sales trickle in at ₹22 per book sold. In 2024, I earned ₹8.7 crore from writing. Half of it wasn't even from books. Here's what changed: I stopped being a "writer" and started being a monetization architect.
            </p>

            {/* Visual 1: The Income Shift (Comparison) */}
            <figure className="my-12">
                <Card className="bg-ink-900 border-emerald-500/20 p-6 md:p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <BarChart3 className="w-32 h-32 text-emerald-500" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 relative z-10">
                        <div className="space-y-2 border-r border-white/10 pr-4">
                            <h4 className="text-parchment/60 font-sans text-sm uppercase tracking-widest">2019: The "Writer"</h4>
                            <div className="text-3xl font-bold text-parchment">₹2.4 Lakh</div>
                            <div className="text-sm text-parchment/40 italic">18 Months of Work</div>
                            <div className="flex gap-2 flex-wrap mt-2">
                                <Badge variant="secondary" className="bg-white/5 text-parchment/50">Traditional Pub</Badge>
                                <Badge variant="secondary" className="bg-white/5 text-parchment/50">Royalties Only</Badge>
                            </div>
                        </div>
                        <div className="space-y-2 pl-4">
                            <h4 className="text-emerald-400 font-sans text-sm uppercase tracking-widest">2024: The Architect</h4>
                            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-gold">₹8.7 Crore</div>
                            <div className="text-sm text-emerald-400/60 italic">Multi-Stream Ecosystem</div>
                            <div className="flex gap-2 flex-wrap mt-2">
                                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/50">Books (50%)</Badge>
                                <Badge className="bg-gold/20 text-gold border-gold/50">Ecosystem (50%)</Badge>
                            </div>
                        </div>
                    </div>
                </Card>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 1: The exponential shift that occurs when you move from a royalty-dependent model to a monetization ecosystem.
                </figcaption>
            </figure>

            {/* Paragraph 2 */}
            <p className="mb-6">
                Let me hit you with some brutal math. The average traditionally published Indian debut author gets a ₹2-5 lakh advance, waits eighteen to twenty-four months to see their book in stores, and then earns ₹22 per book sold after that. If you're a mid-list self-published author with one book, you might pull in ₹50,000 to ₹2 lakh per year. But a writer who treats their words as a multi-stream business? They're making ₹50 lakh to ₹5 crore per year, and they can start within ninety days.
            </p>

            {/* Visual 2: The Brutal Math Table */}
            <figure className="my-12">
                <div className="rounded-xl overflow-hidden border border-white/10 bg-ink-black shadow-2xl">
                    <div className="grid grid-cols-3 bg-white/5 p-4 border-b border-white/10 font-sans text-xs md:text-sm font-bold text-center uppercase tracking-widest text-parchment/70">
                        <div>Model</div>
                        <div>Timeline</div>
                        <div>Earnings/Year</div>
                    </div>
                    <div className="divide-y divide-white/5 font-sans text-sm">
                        <div className="grid grid-cols-3 p-4 items-center">
                            <div className="text-parchment/60">Traditional Debut</div>
                            <div className="text-center text-parchment/40">18-24 Months</div>
                            <div className="text-right text-red-400 font-bold">₹2 - 5 Lakh</div>
                        </div>
                        <div className="grid grid-cols-3 p-4 items-center bg-white/[0.02]">
                            <div className="text-parchment/60">Mid-List Self-Pub</div>
                            <div className="text-center text-parchment/40">Ongoing</div>
                            <div className="text-right text-red-300 font-bold">₹50k - 2 Lakh</div>
                        </div>
                        <div className="grid grid-cols-3 p-4 items-center bg-emerald-900/10 border-l-4 border-emerald-500">
                            <div className="text-emerald-400 font-bold">Monetization Architect</div>
                            <div className="text-center text-emerald-400/60">Starts in 90 Days</div>
                            <div className="text-right text-emerald-400 font-bold text-lg">₹50L - 5 Cr</div>
                        </div>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 2: Comparing traditional timelines and caps against the unlimited ceiling of the architect model.
                </figcaption>
            </figure>

            {/* Paragraph 3 */}
            <p className="mb-6">
                This book contains something the writing industry doesn't want you to know: your words are worth way more than what traditional publishing or single-income freelancing will ever pay you. Inside these pages, you'll find a complete breakdown of fourteen income streams that working writers are using right now to build real wealth. I'm talking exact rates for both Indian and international markets, the platforms and tools you need, outreach templates that actually work, pricing models that protect your value, and real case studies with timelines and numbers.
            </p>

            {/* Visual 3: The 14 Stream Ecosystem */}
            <figure className="my-12">
                <div className="bg-ink-900 border border-gold/20 rounded-xl p-8 text-center relative overflow-hidden group">
                    {/* Decorative background elements */}
                    <div className="absolute -left-10 -top-10 w-40 h-40 bg-purple-500/10 rounded-full blur-[50px] group-hover:bg-purple-500/20 transition-all duration-700" />
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-[50px] group-hover:bg-emerald-500/20 transition-all duration-700" />

                    <Layers className="w-12 h-12 text-gold mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">The Wealth Ecosystem</h3>
                    <p className="text-parchment/60 mb-6 max-w-lg mx-auto text-sm">
                        You are not just a writer. You are a content IP owner. We will unlock 14 distinct channels from your core skill.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {["Ghostwriting", "Consulting", "Newsletters", "Workshops", "Digital Products", "Licensing", "Affiliates", "+7 More"].map((item, i) => (
                            <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-parchment/80 font-mono hover:border-gold/50 hover:text-gold transition-colors cursor-default">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 3: A glimpse into the sophisticated ecosystem we will build, moving beyond simple "royalties" or "client work".
                </figcaption>
            </figure>


            {/* Paragraph 4 */}
            <p className="mb-6">
                Who needs this book? You do, if you're a writer earning under ₹5 lakh per year and you know you're capable of more. You need this if you've published books but have no monetization system beyond hoping for royalties. You need this if you're a freelancer stuck at ₹20,000 to ₹40,000 per month, doing work you could do in your sleep, wondering why your bank account doesn't reflect your talent. You need this if you've been treating writing as a hobby but you're ready to treat it as an asset portfolio.
            </p>

            {/* Visual 4: The Target Audience Identifiers */}
            <figure className="my-12 grid md:grid-cols-2 gap-4">
                {[
                    { icon: AlertTriangle, title: "The Undervalued", desc: "Earning < ₹5L/year but capable of more." },
                    { icon: BookOpen, title: "The Royalty hoper", desc: "Published but relying purely on Amazon." },
                    { icon: Users, title: "The Stuck Freelancer", desc: "Capped at ₹20-40k/mo doing low-level work." },
                    { icon: Target, title: "The Asset Builder", desc: "Ready to treat words as an investment portfolio." }
                ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                        <item.icon className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-parchment text-base">{item.title}</h4>
                            <p className="text-sm text-parchment/60 italic">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </figure>

            {/* Paragraph 5 */}
            <p className="mb-6">
                Here's my promise to you: if you implement three to four of these streams over the next ninety days, you'll hit ₹1 lakh per month. By month twelve, ₹5 to 10 lakh per month is realistic. I'm not saying it's guaranteed, but I am saying it's a proven path that I've walked and that hundreds of writers I know have walked successfully.
            </p>

            {/* Visual 5: The Growth Trajectory */}
            <figure className="my-12">
                <div className="bg-gradient-to-br from-emerald-950/30 to-ink-black rounded-xl p-6 border border-emerald-500/20">
                    <div className="flex justify-between items-end h-48 relative ml-8 pb-8 border-l border-b border-white/20">
                        {/* Axis Labels */}
                        <div className="absolute -left-8 top-0 text-[10px] text-parchment/40 -rotate-90 origin-right">Monthly Income</div>
                        <div className="absolute bottom-[-25px] right-0 text-[10px] text-parchment/40">Time</div>

                        {/* Data Points */}
                        <div className="flex flex-col items-center justify-end h-[20%] w-1/4 group relative">
                            <div className="absolute -top-8 text-xs font-bold text-parchment/60 opacity-0 group-hover:opacity-100 transition-opacity">Start</div>
                            <div className="w-full bg-white/10 h-full rounded-t-sm mx-1" />
                        </div>
                        <div className="flex flex-col items-center justify-end h-[50%] w-1/4 group relative">
                            <div className="absolute -top-10 text-emerald-400 font-bold text-sm bg-ink-900 border border-emerald-500/50 px-2 py-1 rounded shadow-lg transform translate-y-2 mb-2">₹1 Lakh/mo</div>
                            <div className="w-full bg-emerald-600/60 h-full rounded-t-sm mx-1 animate-pulse" />
                            <div className="mt-2 text-[10px] md:text-xs text-emerald-400 font-bold uppercase">Day 90</div>
                        </div>
                        <div className="flex flex-col items-center justify-end h-[90%] w-1/4 group relative">
                            <div className="absolute -top-8 text-gold font-bold text-sm">₹5-10 L/mo</div>
                            <div className="w-full bg-gold/60 h-full rounded-t-sm mx-1" />
                            <div className="mt-2 text-[10px] md:text-xs text-gold font-bold uppercase">Month 12</div>
                        </div>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 4: The projected income acceleration curve when implementing just 3-4 streams from this playbook.
                </figcaption>
            </figure>

            {/* Paragraph 6 */}
            <p className="mb-0 font-medium text-xl text-center text-white/90 italic border-l-4 border-gold pl-6 py-2 bg-white/5 rounded-r-lg">
                The difference between a broke writer and a wealthy writer isn't talent. It's not even luck. It's understanding that every word you write can be monetized in multiple ways, across multiple platforms, for multiple audiences. You're about to learn exactly how to do that.
            </p>
        </div>
    );
};

export default PagesChapterIntro;
