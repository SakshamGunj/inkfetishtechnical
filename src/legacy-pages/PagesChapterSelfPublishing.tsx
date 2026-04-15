import React from 'react';
import {
    BookOpen, Rocket, DollarSign, TrendingUp,
    Globe, Users, Calendar, AlertTriangle,
    CheckCircle2, ArrowRight, BarChart3, Target
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PagesChapterSelfPublishing = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 font-serif text-lg md:text-xl leading-relaxed text-parchment/90">
            {/* Title Section */}
            <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 border-emerald-500/50 text-emerald-400 tracking-[0.2em] font-sans">
                    STREAM 2
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">SELF-PUBLISHING – ROYALTIES THAT COMPOUND</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-gold mx-auto rounded-full" />
            </div>

            {/* Paragraph 1 */}
            <p className="mb-6 first-letter:text-5xl first-letter:text-emerald-400 first-letter:font-bold first-letter:mr-2 first-letter:float-left">
                A traditionally published author earns ₹22 per book sold. A self-published author earns ₹180 per book sold. Same book. Eight times more money. Once you understand this math, you'll never look at publishing the same way again.
            </p>

            {/* Visual 1: The Royalty Math Showdown */}
            <figure className="my-12">
                <Card className="bg-ink-900 border border-white/10 p-4 md:p-8 relative overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0 md:gap-8">
                        {/* Traditional Side */}
                        <div className="p-6 bg-white/5 rounded-t-xl md:rounded-l-xl md:rounded-tr-none border border-white/5 text-center relative group">
                            <div className="text-xs font-sans uppercase tracking-widest text-parchment/50 mb-4">Traditional Publishing</div>
                            <div className="text-4xl font-bold text-red-400 mb-2">₹22</div>
                            <div className="text-[10px] text-parchment/40">Per Book Sold</div>

                            <div className="mt-6 space-y-2 text-xs text-parchment/60 text-left mx-auto max-w-[180px]">
                                <div className="flex justify-between"><span>Wholesale Discount:</span> <span className="text-red-400">-55%</span></div>
                                <div className="flex justify-between"><span>Publisher Cut:</span> <span className="text-red-400">-90%</span></div>
                                <div className="flex justify-between pt-2 border-t border-white/10 font-bold"><span>Your Cut:</span> <span>7.5%</span></div>
                            </div>
                        </div>

                        {/* Self-Pub Side */}
                        <div className="p-6 bg-emerald-950/20 rounded-b-xl md:rounded-r-xl md:rounded-bl-none border border-emerald-500/30 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-emerald-500 text-ink-black text-[10px] font-bold px-2 py-1 rounded-bl">WINNER</div>
                            <div className="text-xs font-sans uppercase tracking-widest text-emerald-400 mb-4">Self-Publishing</div>
                            <div className="text-5xl font-bold text-emerald-400 mb-2">₹180</div>
                            <div className="text-[10px] text-emerald-400/60">Per Book Sold</div>

                            <div className="mt-6 space-y-2 text-xs text-parchment/60 text-left mx-auto max-w-[180px]">
                                <div className="flex justify-between"><span>Platform Fee:</span> <span className="text-parchment/40">-30%</span></div>
                                <div className="flex justify-between pt-2 border-t border-emerald-500/20 font-bold text-white"><span>Your Cut:</span> <span className="text-emerald-400">70%</span></div>
                            </div>
                        </div>
                    </div>
                </Card>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 2.1: The math is undeniable. Sell 8x fewer books to make the same money.
                </figcaption>
            </figure>

            {/* Paragraph 2 - The Economics */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">The Economics That Change Everything</h3>
            <p className="mb-6">
                Let me show you the royalty math that the traditional publishing industry doesn't advertise. Take a book with a retail price of ₹299. In traditional publishing, bookstores get a wholesale discount of fifty to fifty-five percent. The publisher takes ninety to ninety-two-point-five percent of what's left. You get a royalty of seven-point-five to ten percent of the wholesale price, which works out to ₹22 per book. In self-publishing through Amazon, there's no wholesale discount because you're selling direct. Amazon takes thirty percent of the retail price. You keep sixty to seventy percent of retail, which equals ₹180 per book.
            </p>

            {/* Paragraph 3 */}
            <p className="mb-6">
                When you sell one thousand copies, traditional publishing pays you ₹22,000. Self-publishing pays you ₹1,80,000. That's ₹1,58,000 more for the exact same book. The catch? You do your own marketing, which is why most self-published authors fail. They don't treat it like a business. They upload a book, hope for sales, and wonder why nothing happens.
            </p>

            {/* Visual 2: 1000 Copies Comparison Bar Chart */}
            <figure className="my-12">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-sans uppercase tracking-widest text-parchment/60">
                            <span>Traditional (1000 Sales)</span>
                            <span>₹22,000</span>
                        </div>
                        <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-red-400 w-[12%]" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-sans uppercase tracking-widest text-emerald-400">
                            <span>Self-Publishing (1000 Sales)</span>
                            <span>₹1,80,000</span>
                        </div>
                        <div className="h-4 bg-emerald-950/30 rounded-full overflow-hidden border border-emerald-500/20">
                            <div className="h-full bg-emerald-500 w-full" />
                        </div>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 2.2: The "Volume Trap" exposed. You don't need to be a bestseller to make a living; you just need better margins.
                </figcaption>
            </figure>


            {/* Paragraph 4 - The Business Model */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">The Self-Publishing Business Model in Three Phases</h3>
            <p className="mb-6">
                Phase One is The Launch, which happens in months one through three. Your goal is to create explosive momentum in week one to trigger Amazon's algorithm, which then shows your book to more potential readers.
            </p>

            {/* Paragraph 5 */}
            <p className="mb-6">
                Sixty days before launch, start your pre-launch sequence. Build an email list of two hundred to five hundred subscribers using a lead magnet like a free chapter, character artwork, or reading guide. Recruit an ARC team of thirty to one hundred advance readers from your email list, Bookstagram accounts, Goodreads groups, and writing communities. These readers get free advance copies in exchange for honest reviews on launch day. Tease your cover by posting three blurred options, running polls to get engagement, and doing the final reveal thirty days before launch. Open pre-orders and offer a bonus like a deleted scene, signed bookplate, or live question-and-answer session for early buyers.
            </p>

            {/* Paragraph 6 */}
            <p className="mb-6">
                Launch week is where you push hard. On day zero, which is launch day, announce everywhere at eight to nine PM Indian Standard Time because that's peak engagement time. Send an email blast saying "It's live! Buy in the next forty-eight hours to get [bonus]." Your ARC team posts their reviews simultaneously, aiming for thirty to fifty reviews on day one. Share across all social platforms with an Instagram carousel plus Reels, a Twitter thread, and a Facebook post.
            </p>

            {/* Paragraph 7 */}
            <p className="mb-6">
                Track these metrics closely: your sales rank in your category, with a goal of reaching the top ten in your sub-category. Count the number of reviews, aiming for fifty-plus in week one. Monitor email open and click rates, which should hit twenty-five to thirty-five percent if your list is warm and engaged.
            </p>

            {/* Paragraph 8 */}
            <p className="mb-6">
                Real launch numbers for a romance novel look like this: one hundred fifty sales on day one, four hundred to six hundred sales in week one. The result is a number three rank in Indian Romance, sixty-five reviews, and ₹72,000 in revenue after Amazon's cut.
            </p>

            {/* Visual 3: Launch Timeline Map */}
            <figure className="my-12">
                <div className="relative border-l border-emerald-500/30 ml-4 pl-8 py-2 space-y-12">
                    <div className="relative">
                        <span className="absolute -left-[41px] w-6 h-6 rounded-full bg-ink-900 border-2 border-emerald-500 flex items-center justify-center text-[10px] text-emerald-400 font-bold">1</span>
                        <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-2">T-Minus 60 Days: Pre-Launch</h4>
                        <ul className="text-sm text-parchment/70 space-y-1 list-disc list-inside marker:text-emerald-500/50">
                            <li>Build Email List (200-500 subs)</li>
                            <li>Recruit ARC Team (30-100 readers)</li>
                            <li>Cover Reveal Strategy</li>
                        </ul>
                    </div>
                    <div className="relative">
                        <span className="absolute -left-[41px] w-6 h-6 rounded-full bg-ink-900 border-2 border-emerald-500 flex items-center justify-center text-[10px] text-emerald-400 font-bold">2</span>
                        <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">Day Zero: Launch Day</h4>
                        <ul className="text-sm text-parchment/70 space-y-1 list-disc list-inside marker:text-emerald-500/50">
                            <li>8-9 PM IST Announcement</li>
                            <li>Email Blast ("It's Live!")</li>
                            <li>ARC Reviews Drop (Goal: 30-50)</li>
                        </ul>
                    </div>
                    <div className="relative">
                        <span className="absolute -left-[41px] w-6 h-6 rounded-full bg-ink-900 border-2 border-emerald-500 flex items-center justify-center text-[10px] text-emerald-400 font-bold">3</span>
                        <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">Launch Week Results</h4>
                        <div className="bg-emerald-900/10 border border-emerald-500/20 p-3 rounded text-xs text-parchment/80 font-mono">
                            <div>Result: 400-600 Sales</div>
                            <div>Reviews: 65+</div>
                            <div className="text-emerald-400 font-bold">Revenue: ₹72,000</div>
                        </div>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 2.3: The "Explosive Launch" roadmap. Momentum in week one is the key to algorithmic visibility.
                </figcaption>
            </figure>

            {/* Paragraph 9 - Phase Two */}
            <p className="mb-6">
                Phase Two is Paid Traffic, which runs from month four through month twelve. Start running ads only after you have twenty-plus reviews and an optimized book listing, because ads won't convert without social proof.
            </p>

            {/* Paragraph 10 */}
            <p className="mb-6">
                For Amazon Ads, budget ₹5,000 to ₹20,000 per month. Run Sponsored Products campaigns. Target exact match keywords on competing author names plus genre keywords like "Mumbai romance" or "Indian thriller." Your expected return on ad spend is one-point-five to three times, meaning every ₹1 spent generates ₹1.50 to ₹3 in revenue.
            </p>

            {/* Paragraph 11 */}
            <p className="mb-6">
                For Meta Ads on Facebook and Instagram, budget ₹10,000 to ₹30,000 per month. Set your objective to drive traffic to Amazon. Create video ads showing a book flip-through with review quotes overlaid. Target interests matching comparable authors and book reader audiences in India.
            </p>

            {/* Paragraph 12 */}
            <p className="mb-6">
                For BookBub and Written Word Media, spend ₹5,000 to ₹15,000 for a one-time promotion. Discount your book to ₹99 for three days. This typically generates five hundred to two thousand downloads, which drives reviews and series read-through if you have additional books.
            </p>

            {/* Paragraph 13 */}
            <p className="mb-6">
                Your goal for this phase is two hundred to five hundred sales per month, breaking even or making profit on your ad spend while building momentum.
            </p>

            {/* Visual 4: Paid Channels Grid */}
            <figure className="my-12 grid md:grid-cols-3 gap-4">
                {[
                    { title: "Amazon Ads", budget: "₹5k-20k/mo", roi: "1.5x - 3x ROI", icon: Target },
                    { title: "Meta Ads", budget: "₹10k-30k/mo", roi: "Traffic Driver", icon: Users },
                    { title: "BookBub Promo", budget: "₹5k-15k (One-time)", roi: "500-2k Downloads", icon: Rocket }
                ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-xl text-center">
                        <item.icon className="w-8 h-8 mx-auto text-parchment/40 mb-3" />
                        <div className="font-bold text-white text-sm uppercase tracking-wider mb-1">{item.title}</div>
                        <div className="text-emerald-400 font-bold mb-1">{item.budget}</div>
                        <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-400/80">{item.roi}</Badge>
                    </div>
                ))}
            </figure>


            {/* Paragraph 14 - Phase Three */}
            <p className="mb-6">
                Phase Three is Backlist and Series, which starts in year two and beyond. This is where compounding happens. Book one leads readers to book two, which leads to book three. Readers who finish book one automatically buy books two and three if they loved the story. A series becomes a passive income machine.
            </p>

            {/* Paragraph 15 */}
            <p className="mb-6">
                Strategy one: make book one permanently free, which drives readers to buy the paid sequels. Strategy two: create boxed sets bundling three books for ₹499, giving higher perceived value. Strategy three: cross-promote in the back matter of each book with lines like "If you loved this, read my other series starting with [Title]." The result is ₹2 to 5 lakh per year per series without active marketing once the flywheel is spinning.
            </p>

            {/* Paragraph 16 - Genre Economics */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Genre Economics: Where the Money Is</h3>
            <p className="mb-6">
                Romance novels price at ₹199 to ₹299, have high read-through rates above seventy percent, are eligible for Kindle Unlimited, and generate annual potential of ₹3 to 8 lakh from a five-book series.
            </p>
            <p className="mb-6">
                Thrillers price at ₹299 to ₹399, have medium-high read-through, are eligible for Kindle Unlimited, and generate ₹2 to 6 lakh annually.
            </p>
            <p className="mb-6">
                Self-help books price at ₹399 to ₹599, have medium read-through, are sometimes eligible for Kindle Unlimited, and generate ₹4 to 10 lakh annually.
            </p>
            <p className="mb-6">
                Business books price at ₹599 to ₹999, have lower volume but higher ticket prices, rarely go into Kindle Unlimited, and generate ₹5 to 15 lakh annually from fewer books.
            </p>
            <p className="mb-6">
                The Indian market reality: Kindle Unlimited readers binge series, and you earn ₹8 to 12 per complete read. Print-on-demand through Amazon India and Notion Press removes inventory risk entirely. Adding audiobooks via Findaway Voices adds thirty percent more revenue with minimal extra work.
            </p>

            {/* Visual 5: Genre Matrix */}
            <figure className="my-12 overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                    <thead>
                        <tr className="border-b border-white/10 text-parchment/50 font-sans uppercase text-xs tracking-wider">
                            <th className="p-3">Genre</th>
                            <th className="p-3">Pricing</th>
                            <th className="p-3">Read-Through</th>
                            <th className="p-3 text-right">Potential/Year</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono text-parchment/80">
                        <tr className="bg-white/[0.02]">
                            <td className="p-3 font-bold text-white">Romance</td>
                            <td className="p-3">₹199 - 299</td>
                            <td className="p-3 text-emerald-400">High (&gt;70%)</td>
                            <td className="p-3 text-right font-bold text-white">₹3-8 Lakh</td>
                        </tr>
                        <tr>
                            <td className="p-3 font-bold text-white">Thriller</td>
                            <td className="p-3">₹299 - 399</td>
                            <td className="p-3 text-emerald-400/80">Med-High</td>
                            <td className="p-3 text-right font-bold text-white">₹2-6 Lakh</td>
                        </tr>
                        <tr className="bg-white/[0.02]">
                            <td className="p-3 font-bold text-white">Self-Help</td>
                            <td className="p-3">₹399 - 599</td>
                            <td className="p-3 text-yellow-400/80">Medium</td>
                            <td className="p-3 text-right font-bold text-white">₹4-10 Lakh</td>
                        </tr>
                        <tr>
                            <td className="p-3 font-bold text-white">Business</td>
                            <td className="p-3">₹599 - 999</td>
                            <td className="p-3 text-red-400/80">Low Volume</td>
                            <td className="p-3 text-right font-bold text-emerald-400">₹5-15 Lakh</td>
                        </tr>
                    </tbody>
                </table>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 2.4: Choose your lane wisely. Volume games (Romance) vs. Margin games (Business).
                </figcaption>
            </figure>

            {/* Paragraph 17 - Advanced Tactics */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Advanced Tactics for ₹5 Lakh Plus Per Year</h3>
            <p className="mb-6">
                Tactic one: Write to market, not to your ego. Study the top twenty books in your genre on Amazon India. Note the cover styles, popular tropes, typical lengths, and the language used in reviews. Deliver what readers expect because you can innovate within genre rules but breaking them entirely means no sales. Use a fast release schedule of one book every three to four months because algorithms reward consistency.
            </p>
            <p className="mb-6">
                Tactic two: Build a newsletter funnel in the back of every book. On the last page, include "Get a free bonus epilogue at [yoursite.com/bonus]." Capture their email address and automate launch announcements for your next books. Your email list becomes an instant fifty to two hundred sales on day one of every new release.
            </p>
            <p className="mb-6">
                Tactic three: Target international markets for two to three times more revenue. Publish globally via Amazon KDP in the United States, United Kingdom, Canada, Australia, Germany, France, Spain, Italy, and Japan. Price in local currency: ₹299 in India equals three-point-ninety-nine dollars in the US. US royalty at seventy percent of three-ninety-nine equals two-point-eighty dollars per sale, which is ₹230. You expand your reach without any extra work.
            </p>
            <p className="mb-6">
                Tactic four: Sell translation rights for bonus ₹50,000 to 2 lakh. License Hindi, Tamil, or Bengali rights to regional publishers. Advances run ₹50,000 to ₹2 lakh per language. You retain English rights while they handle translation and distribution. No extra effort after the deal is signed.
            </p>

            {/* Paragraph 18 - Real Case */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Real Case: Priya's ₹17.8 Lakh Per Year Romance Series</h3>
            <p className="mb-6">
                Priya, twenty-nine years old, based in Bangalore, wrote five contemporary romance novels over eighteen months. Each book ran sixty thousand words at a ₹249 price point.
            </p>
            <p className="mb-6">
                Her monthly sales in steady state after all launches: one hundred copies per book times five books equals five hundred sales per month in India. Profit per book after costs is ₹180. India revenue: ₹90,000 per month equals ₹10.8 lakh per year.
            </p>
            <p className="mb-6">
                In international markets, primarily the US, she sells fifty copies per book times five books equals two hundred fifty sales per month. Profit is two-point-eighty dollars per book, which is ₹230. International revenue: ₹57,500 per month equals ₹6.9 lakh per year.
            </p>
            <p className="mb-6">
                Total: ₹17.7 lakh per year from one five-book series, mostly passive income after year one.
            </p>

            {/* Visual 6: Priya's Income Waterfall */}
            <figure className="my-12">
                <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/10 border-white/10 p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-ink-black font-bold text-xl shrink-0">P</div>
                        <div>
                            <h4 className="font-bold text-white text-lg">Priya's Romance Empire</h4>
                            <p className="text-parchment/60 text-sm italic">5 Books • 18 Months Work • Lifetime Income</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded border border-white/5">
                            <div className="flex items-center gap-3">
                                <Globe className="w-4 h-4 text-emerald-400" />
                                <span className="text-sm font-sans">India Sales (500/mo)</span>
                            </div>
                            <div className="font-bold text-emerald-400">₹10.8 Lakh/yr</div>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded border border-white/5">
                            <div className="flex items-center gap-3">
                                <Globe className="w-4 h-4 text-blue-400" />
                                <span className="text-sm font-sans">US/Intl Sales (250/mo)</span>
                            </div>
                            <div className="font-bold text-blue-400">₹6.9 Lakh/yr</div>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-emerald-500/20 rounded border border-emerald-500/50 mt-2">
                            <div className="font-bold uppercase tracking-widest text-sm text-emerald-400">Total Passive Income</div>
                            <div className="text-2xl font-bold text-emerald-400">₹17.7 Lakh/yr</div>
                        </div>
                    </div>
                </Card>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 2.5: The compounding power of a series + international reach.
                </figcaption>
            </figure>


            {/* Paragraph 19 - Common Mistakes */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Common Mistakes</h3>
            <p className="mb-6">
                Mistake number one: launching without an email list, which means no day-one momentum and no algorithm boost.
            </p>
            <p className="mb-6">
                Mistake number two: not getting reviews before launch, which makes your book look untrustworthy to new readers.
            </p>
            <p className="mb-6">
                Mistake number three: running ads before optimizing your book listing and cover, which just wastes money on clicks that don't convert.
            </p>
            <p className="mb-6">
                Mistake number four: writing one book and then waiting to see what happens. Algorithms reward series and consistency, not one-offs.
            </p>

            {/* Paragraph 20 - Real Numbers Snapshot */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Real Numbers Snapshot</h3>
            <p className="mb-6">
                Year one conservative scenario: launch three books. Average fifty sales per book per month. Profit is ₹180 per book. Revenue: one hundred fifty sales times ₹180 times twelve months equals ₹3.24 lakh.
            </p>
            <p className="mb-6">
                Year two scaling scenario: five books total including two new releases plus three backlist titles. Average one hundred sales per book per month. Revenue: five hundred sales times ₹180 times twelve months equals ₹10.8 lakh.
            </p>

            {/* Action Box */}
            <div className="mt-16 bg-gradient-to-r from-emerald-900/40 to-ink-900 border border-emerald-500/50 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Rocket className="w-32 h-32 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-ink-black text-sm">🚀</span>
                    ACTION BOX: Launch Your Self-Publishing Engine
                </h3>
                <div className="space-y-6 relative z-10 font-sans">
                    <div className="flex gap-4">
                        <div className="w-32 shrink-0 font-bold text-emerald-400 Uppercase text-sm mt-1">This Month</div>
                        <div className="text-parchment/80">Finish your manuscript. Hire a cover designer for ₹5,000 to ₹15,000. Set your launch date ninety days out. Start building your email list with a free chapter lead magnet. Recruit thirty advance readers.</div>
                    </div>

                    <div className="bg-emerald-500/10 rounded-lg p-4 mt-6 border border-emerald-500/30 text-center">
                        <span className="text-emerald-400 font-bold uppercase tracking-widest text-sm">Goal: Fifty reviews plus three hundred sales in week one.</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PagesChapterSelfPublishing;
