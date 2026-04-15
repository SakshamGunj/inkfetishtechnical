import React from 'react';
import {
    Crown, TrendingUp, Sparkles,
    ArrowRight, Trophy, Target,
    Gem, Zap, Clock
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PagesChapterEpilogue = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 font-serif text-lg md:text-xl leading-relaxed text-parchment/90">
            {/* Title Section */}
            <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 border-emerald-500/50 text-emerald-400 tracking-[0.2em] font-sans">
                    THE FINAL WORD
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">CONCLUSION: FROM PAGES TO EMPIRE</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-gold mx-auto rounded-full" />
            </div>

            {/* Paragraph 1 */}
            <p className="mb-6 first-letter:text-5xl first-letter:text-emerald-400 first-letter:font-bold first-letter:mr-2 first-letter:float-left">
                Most writers stay broke because they see writing as self-expression. They wait for inspiration, hope for publication, dream of the day their talent gets discovered. They write beautiful words that never become bank deposits.
            </p>
            <p className="mb-6">
                The writers earning ₹10 crore per year see writing as asset creation. Every article is a potential course module. Every book is intellectual property that can be licensed to five languages and adapted for film. Every client project is a case study that lands three more clients. Every social media post is building an audience that will buy products for years.
            </p>

            {/* Visual 1: Mindset Shift */}
            <figure className="my-12">
                <div className="grid md:grid-cols-2 gap-0 border border-white/10 rounded-xl overflow-hidden font-sans">
                    <div className="bg-ink-900/50 p-6 border-b md:border-b-0 md:border-r border-white/10">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-red-500/10 rounded text-red-400"><TrendingUp className="w-5 h-5 rotate-180" /></div>
                            <h4 className="font-bold text-white">The Struggling Artist</h4>
                        </div>
                        <ul className="space-y-3 text-sm text-parchment/60">
                            <li className="flex gap-2"><span className="text-red-400">×</span> Writing = Self-Expression</li>
                            <li className="flex gap-2"><span className="text-red-400">×</span> Waits for inspiration</li>
                            <li className="flex gap-2"><span className="text-red-400">×</span> Hopes for discovery</li>
                            <li className="flex gap-2"><span className="text-red-400">×</span> Single-use words</li>
                        </ul>
                    </div>
                    <div className="bg-emerald-900/10 p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl -z-10"></div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-emerald-500/10 rounded text-emerald-400"><Gem className="w-5 h-5" /></div>
                            <h4 className="font-bold text-white">The Wealthy Writer</h4>
                        </div>
                        <ul className="space-y-3 text-sm text-parchment/80">
                            <li className="flex gap-2"><span className="text-emerald-400">✓</span> Writing = Asset Creation</li>
                            <li className="flex gap-2"><span className="text-emerald-400">✓</span> Builds systems</li>
                            <li className="flex gap-2"><span className="text-emerald-400">✓</span> Creates opportunities</li>
                            <li className="flex gap-2"><span className="text-emerald-400">✓</span> Multi-use IP</li>
                        </ul>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 16.1: The Mindset Shift. Move from 'Expression' to 'Equity'.
                </figcaption>
            </figure>


            {/* Paragraph 2 - Value of Words */}
            <p className="mb-6">
                Your words aren't just words. They're ghostwriting contracts worth ₹5 to 25 lakh that you can land in sixty days. They're book royalties compounding year after year while you write the next one. They're online course content that sells while you sleep and generates ₹5 to 50 lakh annually. They're intellectual property that can be optioned for ₹10 lakh to ₹10 crore by production companies. They're consulting expertise that commands ₹15,000 per hour and ₹3 lakh per strategy project.
            </p>
            <p className="mb-6">
                The fourteen streams in this book aren't theory pulled from thin air. They're the exact playbook I used to go from ₹2.4 lakh per year from one traditionally published book to ₹8.7 crore per year from fourteen income streams. They're the systems hundreds of writers I know personally have used to go from ₹30,000 per month freelancing to ₹3 lakh plus per month multi-stream businesses.
            </p>
            <p className="mb-6">
                Every single number, rate, timeline, and example in these pages is based on real writers doing real deals in today's market. The Indian freelancer earning ₹2.3 lakh monthly from SaaS writing is real. The romance author making ₹17.7 lakh annually from a five-book series is real. The ghostwriter who closed a ₹12 lakh project in four months is real. These aren't outliers or lottery winners. They're writers who decided their words deserved to be monetized professionally and systematically.
            </p>

            {/* Visual 2: The Proof Cards */}
            <figure className="my-12">
                <div className="flex flex-wrap justify-center gap-4 font-sans text-sm">
                    <div className="bg-ink-900 border border-white/10 p-4 rounded-lg w-full md:w-[30%] text-center">
                        <div className="text-blue-400 font-bold text-lg mb-1">₹2.3 Lakh/mo</div>
                        <div className="text-xs text-parchment/50">SaaS Freelancer</div>
                    </div>
                    <div className="bg-ink-900 border border-white/10 p-4 rounded-lg w-full md:w-[30%] text-center">
                        <div className="text-rose-400 font-bold text-lg mb-1">₹17.7 Lakh/yr</div>
                        <div className="text-xs text-parchment/50">Romance Author</div>
                    </div>
                    <div className="bg-ink-900 border border-white/10 p-4 rounded-lg w-full md:w-[30%] text-center">
                        <div className="text-amber-400 font-bold text-lg mb-1">₹12 Lakh Priority</div>
                        <div className="text-xs text-parchment/50">Ghostwriter Deal</div>
                    </div>
                    <div className="bg-gradient-to-r from-emerald-900/40 to-ink-900 border border-emerald-500/30 p-4 rounded-lg w-full text-center mt-2">
                        <div className="text-emerald-400 font-bold text-2xl mb-1">₹8.7 Crore / Year</div>
                        <div className="text-xs text-parchment/50 uppercase tracking-widest">My Personal Results</div>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 16.2: Real Results. Not theory, but proven market data.
                </figcaption>
            </figure>


            {/* Paragraph 3 - Start Now */}
            <p className="mb-6">
                You have everything you need to start right now. You don't need a bigger platform, a traditional publishing deal, an MFA degree, or perfect circumstances. You need to pick three streams that align with your current skills and market access, execute the action plans in the relevant chapters, and treat your writing like the business it is.
            </p>
            <p className="mb-6">
                In ninety days, you can have two ghostwriting discovery calls booked, one freelance retainer client paying ₹60,000 monthly, and a self-published book generating ₹15,000 in monthly royalties. That's ₹75,000 per month from streams that didn't exist ninety days earlier.
            </p>
            <p className="mb-6">
                In twelve months, you can have landed four ghostwriting projects totaling ₹20 lakh, built three retainer clients generating ₹2.4 lakh monthly, published a trilogy earning ₹8 lakh annually, and launched a course that sold ₹6 lakh in three launches. That's ₹63.2 lakh in year one.
            </p>
            <p className="mb-6">
                In twenty-four months, you can have a six-figure monthly income business with passive streams covering your baseline expenses, active streams funding your growth and lifestyle, and systems running so efficiently that you work thirty hours per week instead of sixty.
            </p>

            {/* Visual 3: 24-Month Roadmap */}
            <figure className="my-12">
                <div className="bg-ink-900 border border-white/10 p-6 rounded-xl relative">
                    <div className="absolute left-[29px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-500 via-emerald-500 to-gold"></div>
                    <div className="space-y-8 relative">
                        <div className="flex gap-6 items-start">
                            <div className="w-14 h-14 rounded-full bg-ink-900 border-4 border-blue-500/50 flex items-center justify-center font-bold text-white z-10 shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.3)]">90d</div>
                            <div className="flex-1 bg-white/5 p-4 rounded-lg border border-white/5">
                                <h4 className="font-bold text-blue-400 mb-1">Momentum Phase</h4>
                                <div className="text-2xl font-bold text-white mb-2">₹75k / Month</div>
                                <p className="text-sm text-parchment/60">2 Calls + 1 Retainer + Book Royalties</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="w-14 h-14 rounded-full bg-ink-900 border-4 border-emerald-500/50 flex items-center justify-center font-bold text-white z-10 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.3)]">12m</div>
                            <div className="flex-1 bg-white/5 p-4 rounded-lg border border-white/5">
                                <h4 className="font-bold text-emerald-400 mb-1">Expansion Phase</h4>
                                <div className="text-2xl font-bold text-white mb-2">₹63.2 Lakh / Year</div>
                                <p className="text-sm text-parchment/60">4 Ghostwriting Gigs + 3 Retainers + Trilogy + Course</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="w-14 h-14 rounded-full bg-ink-900 border-4 border-gold/50 flex items-center justify-center font-bold text-white z-10 shrink-0 shadow-[0_0_15px_rgba(255,193,7,0.3)]">24m</div>
                            <div className="flex-1 bg-gradient-to-r from-white/5 to-gold/10 p-4 rounded-lg border border-gold/20">
                                <h4 className="font-bold text-gold mb-1">Empire Phase</h4>
                                <div className="text-2xl font-bold text-white mb-2">6-Figures / Month</div>
                                <p className="text-sm text-parchment/60">Passive baseline. Efficient systems. 30hr work week.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 16.3: The Trajectory. From momentum to empire in 2 years.
                </figcaption>
            </figure>


            {/* Paragraph 4 - Final Call */}
            <p className="mb-6">
                But none of this happens by accident or by waiting for permission or perfect timing.
            </p>
            <p className="mb-6">
                It happens when you close this book, pick your first income stream, and complete the first action step today.
            </p>
            <p className="mb-6">
                Not tomorrow. Not after you finish one more course or read one more book about writing. Today.
            </p>
            <p className="mb-6">
                The marketplace is paying billions of rupees every year for words. For expertise. For storytelling. For content that educates, persuades, entertains, and transforms.
            </p>
            <p className="mb-6">
                Writers who treat their words as products and their expertise as assets are collecting those billions. Writers who treat writing as a mystical calling that shouldn't be commercialized are staying broke while complaining that nobody values art anymore.
            </p>
            <p className="mb-6">
                You get to choose which writer you become.
            </p>
            <p className="mb-6">
                Choose to be the one with ₹4.2 lakh in the bank account at the end of this month instead of ₹42,000. Choose to be the one who says yes to opportunities based on interest rather than desperation. Choose to be the one who builds an asset portfolio that pays you for decades rather than trading hours for rupees until you burn out.
            </p>
            <p className="mb-6 font-bold text-white">
                Your next twenty-four hours determine your next twelve months.
            </p>
            <p className="mb-6 font-bold text-white">
                Pick your streams. Start the action steps. Build your empire.
            </p>
            <p className="mb-6 font-bold text-gold text-2xl">
                The market is waiting for your words. Go get paid.
            </p>

            {/* Visual 4: The End Frame */}
            <div className="mt-24 text-center">
                <div className="inline-flex items-center justify-center p-3 rounded-full border border-white/10 bg-white/5 mb-6">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                    <span className="text-xs font-sans uppercase tracking-[0.3em] text-parchment/60">End of Volume 1</span>
                </div>
                <div className="max-w-md mx-auto p-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>

        </div>
    );
};

export default PagesChapterEpilogue;
