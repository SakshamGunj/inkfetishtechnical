import React from 'react';
import {
    Layers, TrendingUp, Calendar,
    CheckSquare, Target, ArrowRight,
    Briefcase, Youtube, BookOpen, Mic2
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PagesChapterConclusion = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 font-serif text-lg md:text-xl leading-relaxed text-parchment/90">
            {/* Title Section */}
            <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 border-gold/50 text-gold tracking-[0.2em] font-sans">
                    CONCLUSION
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">PUTTING IT ALL TOGETHER: THE ₹50 LAKH PLUS PER YEAR STACK</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-gold to-emerald-500 mx-auto rounded-full" />
            </div>

            {/* Paragraph 1 */}
            <p className="mb-6 first-letter:text-5xl first-letter:text-gold first-letter:font-bold first-letter:mr-2 first-letter:float-left">
                You've just learned fourteen different ways to monetize your words. The magic isn't in mastering all fourteen, it's in strategically stacking three to five streams that complement each other and compound over time. This is how you build a writing business that generates ₹50 lakh to ₹5 crore per year.
            </p>

            {/* Paragraph 2 - Revenue Model */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Real Twelve-Month Revenue Model Combining Streams</h3>
            <p className="mb-6">
                Let me show you what an actual ₹50 lakh per year writing business looks like when you stack income streams intelligently.
            </p>
            <p className="mb-6">
                Your active income streams generating ₹30 lakh might include two ghostwriting projects delivered over the year at ₹8 lakh each for ₹16 lakh total, two freelance retainer clients paying ₹40,000 and ₹45,000 monthly for content strategy and execution totaling ₹10.2 lakh annually, and six paid speaking engagements ranging from ₹40,000 to ₹1 lakh each adding up to ₹3.8 lakh.
            </p>
            <p className="mb-6">
                Your product income streams generating ₹15 lakh could consist of a self-published book series earning ₹60,000 to ₹80,000 monthly from combined sales in India and internationally for ₹8.4 lakh annually, an online course launched three times with growing email list generating ₹1.8 lakh, ₹2.4 lakh, and ₹2.6 lakh per launch for ₹6.8 lakh total.
            </p>
            <p className="mb-6">
                Your passive and semi-passive income streams adding another ₹5 lakh include affiliate commissions from recommended tools and courses averaging ₹8,000 to ₹12,000 monthly for ₹1.2 lakh annually, newsletter sponsorships running at ₹18,000 to ₹25,000 monthly for ₹2.5 lakh annually, and translation rights for your books licensed to two regional publishers for ₹1.3 lakh total.
            </p>
            <p className="mb-6">
                Add these together and you reach ₹50.2 lakh per year. None of these numbers are fantasy. They're conservative estimates based on the rates and models detailed in each stream chapter. The writers earning ₹1 crore plus per year simply have more and bigger deals in each category.
            </p>

            {/* Visual 1: The Stack Breakdown */}
            <figure className="my-12">
                <div className="bg-ink-900 border border-white/10 p-6 rounded-xl font-sans relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10"></div>
                    <h4 className="text-center font-bold text-white mb-8 uppercase tracking-widest text-sm">The ₹50.2 Lakh/Year Architecture</h4>

                    <div className="space-y-6">
                        {/* Active Layer */}
                        <div className="relative">
                            <div className="flex justify-between items-end mb-2">
                                <div className="flex items-center gap-2 text-blue-400 font-bold"><Briefcase className="w-5 h-5" /> Active Income</div>
                                <div className="text-white font-bold">₹30 Lakh <span className="text-xs text-parchment/50 font-normal">(60%)</span></div>
                            </div>
                            <div className="h-4 bg-white/5 rounded-full overflow-hidden flex">
                                <div className="h-full bg-blue-500 w-[53%]" title="Ghostwriting (₹16L)"></div>
                                <div className="h-full bg-blue-400 w-[34%]" title="Retainers (₹10.2L)"></div>
                                <div className="h-full bg-blue-300 w-[13%]" title="Speaking (₹3.8L)"></div>
                            </div>
                            <div className="flex justify-between text-[10px] text-parchment/40 mt-1">
                                <span>Ghostwriting</span>
                                <span>Retainers</span>
                                <span>Speaking</span>
                            </div>
                        </div>

                        {/* Product Layer */}
                        <div className="relative">
                            <div className="flex justify-between items-end mb-2">
                                <div className="flex items-center gap-2 text-emerald-400 font-bold"><BookOpen className="w-5 h-5" /> Product Income</div>
                                <div className="text-white font-bold">₹15 Lakh <span className="text-xs text-parchment/50 font-normal">(30%)</span></div>
                            </div>
                            <div className="h-4 bg-white/5 rounded-full overflow-hidden flex">
                                <div className="h-full bg-emerald-500 w-[56%]" title="Books (₹8.4L)"></div>
                                <div className="h-full bg-emerald-400 w-[44%]" title="Courses (₹6.8L)"></div>
                            </div>
                            <div className="flex justify-between text-[10px] text-parchment/40 mt-1">
                                <span>Book Sales</span>
                                <span>Course Launches</span>
                            </div>
                        </div>

                        {/* Passive Layer */}
                        <div className="relative">
                            <div className="flex justify-between items-end mb-2">
                                <div className="flex items-center gap-2 text-gold font-bold"><Layers className="w-5 h-5" /> Passive Income</div>
                                <div className="text-white font-bold">₹5.2 Lakh <span className="text-xs text-parchment/50 font-normal">(10%)</span></div>
                            </div>
                            <div className="h-4 bg-white/5 rounded-full overflow-hidden flex">
                                <div className="h-full bg-amber-500 w-[23%]" title="Affiliates (₹1.2L)"></div>
                                <div className="h-full bg-amber-400 w-[48%]" title="Sponsorships (₹2.5L)"></div>
                                <div className="h-full bg-amber-300 w-[29%]" title="Rights (₹1.3L)"></div>
                            </div>
                            <div className="flex justify-between text-[10px] text-parchment/40 mt-1">
                                <span>Affiliates</span>
                                <span>Sponsors</span>
                                <span>Rights</span>
                            </div>
                        </div>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 15.1: The Income Layer Cake. Stack streams to build stability and scale.
                </figcaption>
            </figure>


            {/* Paragraph 3 - Action Plan */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">The Ninety-Day Action Plan to Launch Your Multi-Stream Business</h3>
            <p className="mb-6">
                Month one is about building your foundation. Pick your two primary income streams based on what aligns with your current skills and market access. If you can write long-form and have LinkedIn connections, start with ghostwriting. If you have specialized knowledge, start with freelance content strategy. Build portfolio samples or case studies for each stream even if they're spec work initially. Set up your basic systems including a simple one-page website, payment processing through Instamojo or Razorpay, contract templates you can customize per client, and invoicing and tracking system in Excel or Notion. Join five online communities, Facebook groups, or Slack channels where your ideal clients spend time. Don't pitch yet, just observe and build relationships.
            </p>
            <p className="mb-6">
                Month two shifts to outreach and initial sales. Send fifty pitches or connection requests, which breaks down to ten per weekday for five days per week. Personalize each one showing you researched the recipient. Launch your first product whether it's an ebook, mini-course, or workshop with a simple sales page and payment link. Post valuable content daily on one primary social platform to build visibility and authority in your niche. Book five to ten discovery calls with potential clients by offering free value upfront like audits, consultations, or strategy sessions.
            </p>
            <p className="mb-6">
                Month three focuses on closing deals and delivering excellence. Land your first two to three clients or customers by following up persistently but not desperately with everyone who showed interest. Over-deliver on these first projects because testimonials equal future sales and referrals. Get detailed case studies documenting the process, results, and client feedback. Ask every satisfied client for referrals to two to three other potential clients in their network. Reinvest twenty to thirty percent of your earnings into tools that save time, ads that generate leads, or outsourcing that frees you for higher-value work.
            </p>
            <p className="mb-6">
                By month four, you should be generating ₹50,000 to ₹1 lakh per month if you executed the plan. By month twelve with consistent effort and optimization, ₹3 to 5 lakh monthly becomes realistic and achievable.
            </p>

            {/* Visual 2: 90-Day Timeline */}
            <figure className="my-12">
                <div className="relative font-sans border-l-2 border-white/10 ml-6 space-y-10 py-4">
                    {/* Month 1 */}
                    <div className="relative pl-8">
                        <div className="absolute -left-[21px] top-0 w-10 h-10 rounded-full bg-ink-900 border-4 border-ink-black shadow-[0_0_0_2px_rgba(255,255,255,0.1)] flex items-center justify-center font-bold text-white text-sm">01</div>
                        <h4 className="font-bold text-xl text-white">Foundation</h4>
                        <div className="mt-3 grid grid-cols-2 gap-3">
                            <div className="bg-white/5 p-3 rounded text-sm text-parchment/80">Pick 2 Streams</div>
                            <div className="bg-white/5 p-3 rounded text-sm text-parchment/80">Build Portfolio</div>
                            <div className="bg-white/5 p-3 rounded text-sm text-parchment/80">Setup Payments</div>
                            <div className="bg-white/5 p-3 rounded text-sm text-parchment/80">Join Communities</div>
                        </div>
                    </div>

                    {/* Month 2 */}
                    <div className="relative pl-8">
                        <div className="absolute -left-[21px] top-0 w-10 h-10 rounded-full bg-ink-900 border-4 border-ink-black shadow-[0_0_0_2px_rgba(255,255,255,0.1)] flex items-center justify-center font-bold text-white text-sm">02</div>
                        <h4 className="font-bold text-xl text-white">Outreach</h4>
                        <div className="mt-3 grid grid-cols-2 gap-3">
                            <div className="bg-white/5 p-3 rounded text-sm text-parchment/80">50 Pitches</div>
                            <div className="bg-white/5 p-3 rounded text-sm text-parchment/80">Launch Product</div>
                            <div className="bg-white/5 p-3 rounded text-sm text-parchment/80">Daily Content</div>
                            <div className="bg-white/5 p-3 rounded text-sm text-parchment/80">10 Discovery Calls</div>
                        </div>
                    </div>

                    {/* Month 3 */}
                    <div className="relative pl-8">
                        <div className="absolute -left-[21px] top-0 w-10 h-10 rounded-full bg-emerald-600 border-4 border-ink-black shadow-[0_0_0_2px_rgba(16,185,129,0.5)] flex items-center justify-center font-bold text-white text-sm">03</div>
                        <h4 className="font-bold text-xl text-emerald-400">Closing & Scale</h4>
                        <div className="mt-3 grid grid-cols-2 gap-3">
                            <div className="bg-emerald-900/20 p-3 rounded text-sm text-parchment/80 border border-emerald-500/20">Close 3 Clients</div>
                            <div className="bg-emerald-900/20 p-3 rounded text-sm text-parchment/80 border border-emerald-500/20">Get Case Studies</div>
                            <div className="bg-emerald-900/20 p-3 rounded text-sm text-parchment/80 border border-emerald-500/20">Reinvest 20%</div>
                            <div className="bg-emerald-900/20 p-3 rounded text-sm text-parchment/80 border border-emerald-500/20">Ask Referrals</div>
                        </div>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 15.2: The Execution Roadmap. Linear steps to exponential results.
                </figcaption>
            </figure>


            {/* Paragraph 4 - Prioritization Matrix */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">The Income Stream Prioritization Matrix</h3>
            <p className="mb-6">
                Not all income streams are created equal for your current situation. Use this matrix to decide what to pursue first.
            </p>
            <p className="mb-6">
                Ghostwriting reaches first income within thirty to sixty days, has medium scalability since you're trading time for money but at premium rates, requires medium difficulty to break in, and you should start if you can write long-form content and have access to potential clients via LinkedIn or networking.
            </p>
            <p className="mb-6">
                Freelance content work generates first income in seven to thirty days, offers high scalability through retainers and outsourcing, needs low to medium difficulty to start, and makes sense if you have any niche expertise like technology, finance, marketing, or healthcare.
            </p>
            <p className="mb-6">
                Self-publishing takes ninety to one hundred eighty days to first meaningful income, provides very high scalability since books sell while you sleep, requires medium to high difficulty mastering the full process, and you should pursue if you have a book written or can write one and commit to marketing.
            </p>
            <p className="mb-6">
                Speaking and workshops bring first income in sixty to one hundred twenty days, offer medium scalability limited by your available time and travel, need medium difficulty to develop talks and book gigs, and work best if you're comfortable presenting to groups on camera or on stage.
            </p>
            <p className="mb-6">
                Online courses generate income in thirty to ninety days from idea to first sales, scale very high with evergreen funnels and automation, require medium difficulty to create quality curriculum, and make sense if you have teachable expertise and can build an email list.
            </p>
            <p className="mb-6">
                Content strategy consulting produces income in thirty to sixty days with the right positioning, scales well through high fees and retainers, needs medium difficulty requiring strategic thinking beyond execution, and suits you if you have several years of content experience and can think strategically.
            </p>
            <p className="mb-6">
                Choose your starting streams based on which ones align with where you are now, not where you wish you were. A beginning writer should start with freelancing to build skills and cash flow, then add ghostwriting and courses. An established author should leverage their platform with speaking, courses, and licensing.
            </p>

            {/* Visual 3: Prioritization Grid */}
            <figure className="my-12">
                <div className="bg-ink-900 border border-white/10 p-6 rounded-xl font-sans text-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-parchment/50 border-b border-white/10">
                                    <th className="p-3 font-normal uppercase tracking-wider text-xs">Stream</th>
                                    <th className="p-3 font-normal uppercase tracking-wider text-xs">Time to Cash</th>
                                    <th className="p-3 font-normal uppercase tracking-wider text-xs">Scalability</th>
                                    <th className="p-3 font-normal uppercase tracking-wider text-xs">Ideal For</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-parchment/80">
                                <tr className="hover:bg-white/5">
                                    <td className="p-3 font-bold text-white">Freelancing</td>
                                    <td className="p-3 text-emerald-400 font-bold">7-30 Days</td>
                                    <td className="p-3">High (Outsource)</td>
                                    <td className="p-3 text-xs">Beginners / Niche Experts</td>
                                </tr>
                                <tr className="hover:bg-white/5">
                                    <td className="p-3 font-bold text-white">Strategy</td>
                                    <td className="p-3 text-emerald-400 font-bold">30-60 Days</td>
                                    <td className="p-3">Medium</td>
                                    <td className="p-3 text-xs">Experienced Writers</td>
                                </tr>
                                <tr className="hover:bg-white/5">
                                    <td className="p-3 font-bold text-white">Ghostwriting</td>
                                    <td className="p-3 text-emerald-400 font-bold">30-60 Days</td>
                                    <td className="p-3">Medium</td>
                                    <td className="p-3 text-xs">Long-form Writers</td>
                                </tr>
                                <tr className="hover:bg-white/5">
                                    <td className="p-3 font-bold text-white">Courses</td>
                                    <td className="p-3 text-amber-400">30-90 Days</td>
                                    <td className="p-3 text-emerald-400 font-bold">Very High</td>
                                    <td className="p-3 text-xs">Teachable Expertise</td>
                                </tr>
                                <tr className="hover:bg-white/5">
                                    <td className="p-3 font-bold text-white">Speaking</td>
                                    <td className="p-3 text-amber-400">60-120 Days</td>
                                    <td className="p-3">Medium</td>
                                    <td className="p-3 text-xs">Public Speakers</td>
                                </tr>
                                <tr className="hover:bg-white/5">
                                    <td className="p-3 font-bold text-white">Self-Publishing</td>
                                    <td className="p-3 text-white/40">90-180 Days</td>
                                    <td className="p-3 text-emerald-400 font-bold">Very High</td>
                                    <td className="p-3 text-xs">Authors with Patience</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 15.3: The Selection Matrix. New to the game? Start with Freelancing.
                </figcaption>
            </figure>


            {/* Paragraph 5 - Mistakes & Next 24 Hours */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">The Biggest Mistakes Writers Make Building Multi-Stream Income</h3>
            <p className="mb-6">
                Mistake one is trying to launch all fourteen streams simultaneously. You spread yourself impossibly thin and succeed at none of them. Pick two to three streams, master them until they generate consistent income, then add more.
            </p>
            <p className="mb-6">
                Mistake two involves underpricing everything to get clients or customers faster. Low prices attract low-quality clients who demand the most and appreciate the least. Price based on value delivered, not your insecurity about what you're worth.
            </p>
            <p className="mb-6">
                Mistake three is not treating this like a real business with systems, tracking, and financial planning. You need to track income and expenses monthly, set quarterly revenue goals and review progress, systematize repeatable processes with templates and checklists, and save thirty to forty percent of income for taxes because freelance income isn't tax-withheld.
            </p>
            <p className="mb-6">
                Mistake four happens when writers quit too early when results don't come in thirty days. Building multiple income streams takes six to twelve months of consistent effort before the compounding effect kicks in. Month one might generate ₹15,000 while month twelve generates ₹4 lakh from the same activities because of accumulated clients, products, and reputation.
            </p>
            <p className="mb-6">
                Mistake five is refusing to invest in growth whether through tools, courses, coaching, or ads. Every ₹10,000 spent strategically on improving your skills or reaching more clients returns ₹50,000 to ₹2 lakh when done right. Hoarding every rupee and refusing to reinvest caps your growth.
            </p>

            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Your Next Twenty-Four Hours</h3>
            <p className="mb-6">
                Here's exactly what you should do in the next day to start building your multi-stream writing income.
            </p>
            <p className="mb-6">
                Pick three streams from this book that resonate most with your current situation and skills. Don't overthink it. Choose based on gut feel and what excites you.
            </p>
            <p className="mb-6">
                Write down which one you'll start this week as your primary focus. This is the stream that will generate your first ₹50,000 to ₹1 lakh.
            </p>
            <p className="mb-6">
                Complete the first action step from that stream's chapter. If it's ghostwriting, write your three sample chapters today. If it's freelancing, create your portfolio samples. If it's self-publishing, outline your book. If it's speaking, outline your signature talk.
            </p>
            <p className="mb-6">
                Block three hours on your calendar this week to do the second action step. You don't need a perfect plan. You need to start moving.
            </p>
            <p className="mb-6">
                In twelve months, you won't recognize your bank account. Your monthly income could be five to ten times what it is today. Your confidence in your value as a professional writer will have transformed completely. You'll have systems generating money while you sleep, clients seeking you out rather than you chasing them, and the freedom to choose projects based on interest rather than desperation.
            </p>
            <p className="mb-6">
                But only if you treat your writing like the multi-crore business it can become starting today.
            </p>
            <p className="mb-6 font-bold text-gold">
                Not next month when things calm down. Not next year when you feel more ready. Today.
            </p>

            {/* Action Box */}
            <div className="mt-16 bg-gradient-to-br from-gold/10 to-ink-900 border border-gold/30 rounded-2xl p-8 relative overflow-hidden text-center">
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>

                <h3 className="text-3xl font-bold text-white mb-6">Commit to Your Future</h3>

                <div className="grid md:grid-cols-3 gap-6 relative z-10 font-sans text-left max-w-3xl mx-auto">
                    <div className="bg-ink-900/80 p-5 rounded-lg border border-white/10 hover:border-gold/30 transition-colors">
                        <div className="text-sm text-parchment/60 uppercase tracking-widest mb-2">Step 1</div>
                        <h4 className="font-bold text-white mb-2">Pick 3 Streams</h4>
                        <p className="text-xs text-parchment/50">Follow your gut. Which ones excite you?</p>
                    </div>
                    <div className="bg-ink-900/80 p-5 rounded-lg border border-white/10 hover:border-gold/30 transition-colors">
                        <div className="text-sm text-parchment/60 uppercase tracking-widest mb-2">Step 2</div>
                        <h4 className="font-bold text-white mb-2">Do Action 1</h4>
                        <p className="text-xs text-parchment/50">Write the outline. Make the sample. Today.</p>
                    </div>
                    <div className="bg-ink-900/80 p-5 rounded-lg border border-white/10 hover:border-gold/30 transition-colors">
                        <div className="text-sm text-parchment/60 uppercase tracking-widest mb-2">Step 3</div>
                        <h4 className="font-bold text-white mb-2">Block 3 Hours</h4>
                        <p className="text-xs text-parchment/50">Put it on the calendar for this week.</p>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5">
                    <p className="text-xl text-white font-serif italic">"In 12 months, you won't recognize your bank account."</p>
                </div>
            </div>

        </div>
    );
};

export default PagesChapterConclusion;
