import React from 'react';
import {
    Printer, BookOpen, Palette, ShoppingBag,
    BarChart3, Globe, PenLine, Package,
    Search, TrendingUp, CheckCircle2, Layers
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PagesChapterPOD = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 font-serif text-lg md:text-xl leading-relaxed text-parchment/90">
            {/* Title Section */}
            <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 border-emerald-500/50 text-emerald-400 tracking-[0.2em] font-sans">
                    STREAM 14
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">PRINT-ON-DEMAND PRODUCTS – ₹3 TO 15 LAKH PER YEAR</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-gold mx-auto rounded-full" />
            </div>

            {/* Paragraph 1 */}
            <p className="mb-6 first-letter:text-5xl first-letter:text-emerald-400 first-letter:font-bold first-letter:mr-2 first-letter:float-left">
                Print-on-demand turns your words into physical products like journals, planners, workbooks, and quote books with zero inventory risk. You create the content once, upload to platforms, and earn royalties on every sale without handling production or shipping.
            </p>

            {/* Paragraph 2 - The Market */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">The POD Market for Writers</h3>
            <p className="mb-6">
                Low-content books include journals with prompts, planners and organizers, coloring books with your designs or themes, logbooks and trackers, and activity books. These products sell for ₹199 to ₹599 on Amazon India and internationally. Royalties run ₹40 to ₹200 per sale depending on page count and print costs.
            </p>
            <p className="mb-6">
                Workbooks and companions complement your main books or courses with exercises and worksheets, step-by-step implementation guides, templates and frameworks in fillable format, and guided journals for specific outcomes. Price range: ₹299 to ₹999. Royalties: ₹80 to ₹350 per sale.
            </p>
            <p className="mb-6">
                Quote and poetry books compile your social media quotes or original poetry into beautiful small format books perfect for gifting. Price range: ₹199 to ₹499. Royalties: ₹50 to ₹180 per sale.
            </p>
            <p className="mb-6">
                Niche planners serve specific audiences like writers' planning journals with word count trackers, content creator planners with social media calendars, author marketing planners with launch checklists, and freelancer business planners with client trackers. Price range: ₹399 to ₹899. Royalties: ₹120 to ₹320 per sale.
            </p>

            {/* Visual 1: Product Types Matrix */}
            <figure className="my-12">
                <div className="grid gap-4 sm:grid-cols-2 font-sans text-sm">
                    <div className="bg-ink-900 border border-white/10 p-5 rounded-lg hover:border-emerald-500/30 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="bg-blue-900/40 p-2 rounded text-blue-400"><BookOpen className="w-5 h-5" /></div>
                            <h4 className="font-bold text-white">Low-Content</h4>
                        </div>
                        <p className="text-parchment/60 text-xs mb-3">Journals, coloring books, logs.</p>
                        <div className="flex justify-between items-end border-t border-white/5 pt-3">
                            <div>
                                <div className="text-[10px] text-parchment/40 uppercase">Price</div>
                                <div className="text-white font-bold">₹199 - 599</div>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] text-parchment/40 uppercase">Royalty</div>
                                <div className="text-emerald-400 font-bold">₹40 - 200</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-ink-900 border border-white/10 p-5 rounded-lg hover:border-emerald-500/30 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="bg-amber-900/40 p-2 rounded text-amber-400"><Layers className="w-5 h-5" /></div>
                            <h4 className="font-bold text-white">Workbooks</h4>
                        </div>
                        <p className="text-parchment/60 text-xs mb-3">Course companions, guides.</p>
                        <div className="flex justify-between items-end border-t border-white/5 pt-3">
                            <div>
                                <div className="text-[10px] text-parchment/40 uppercase">Price</div>
                                <div className="text-white font-bold">₹299 - 999</div>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] text-parchment/40 uppercase">Royalty</div>
                                <div className="text-emerald-400 font-bold">₹80 - 350</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-ink-900 border border-white/10 p-5 rounded-lg hover:border-emerald-500/30 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="bg-purple-900/40 p-2 rounded text-purple-400"><PenLine className="w-5 h-5" /></div>
                            <h4 className="font-bold text-white">Quote Books</h4>
                        </div>
                        <p className="text-parchment/60 text-xs mb-3">Poetry, gift books.</p>
                        <div className="flex justify-between items-end border-t border-white/5 pt-3">
                            <div>
                                <div className="text-[10px] text-parchment/40 uppercase">Price</div>
                                <div className="text-white font-bold">₹199 - 499</div>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] text-parchment/40 uppercase">Royalty</div>
                                <div className="text-emerald-400 font-bold">₹50 - 180</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-ink-900 border border-white/10 p-5 rounded-lg hover:border-emerald-500/30 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="bg-emerald-900/40 p-2 rounded text-emerald-400"><FaCalendarAltIconFallback /></div>
                            <h4 className="font-bold text-white">Niche Planners</h4>
                        </div>
                        <p className="text-parchment/60 text-xs mb-3">Specific audience trackers.</p>
                        <div className="flex justify-between items-end border-t border-white/5 pt-3">
                            <div>
                                <div className="text-[10px] text-parchment/40 uppercase">Price</div>
                                <div className="text-white font-bold">₹399 - 899</div>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] text-parchment/40 uppercase">Royalty</div>
                                <div className="text-emerald-400 font-bold">₹120 - 320</div>
                            </div>
                        </div>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 14.1: The POD Product Catalog. Choose high-value formats like planners for better margins.
                </figcaption>
            </figure>


            {/* Paragraph 3 - Creating Products */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Creating POD Products That Sell</h3>
            <p className="mb-6">
                Research what's already selling in your niche on Amazon by searching relevant keywords and sorting by bestsellers. Look at top products noting their pricing, page count, design style, and review themes. Identify gaps where you can offer something better or more specialized.
            </p>
            <p className="mb-6">
                Create high-quality interiors using Canva, Adobe InDesign, or Microsoft Word with proper formatting for print. Standard sizes like six by nine inches or eight-point-five by eleven inches keep printing costs low. Use adequate margins of at least half an inch. Keep page count between eighty to one hundred twenty pages for good pricing balance.
            </p>
            <p className="mb-6">
                Design eye-catching covers that stand out in Amazon thumbnails using professional design tools or hiring a designer for ₹2,000 to ₹8,000. The cover sells the product so invest in quality. Use readable fonts, clear titles, and attractive imagery that communicates the product's purpose instantly.
            </p>
            <p className="mb-6">
                Write compelling product descriptions using the A-I-D-A framework: Attention with a hook, Interest with benefits, Desire by showing transformation, and Action with clear call to buy. Include keywords naturally for Amazon search visibility. Add seven backend keywords in KDP to maximize discoverability.
            </p>
            <p className="mb-6">
                Price competitively by checking similar products but don't race to the bottom. Premium pricing at ₹499 to ₹899 works when your product offers clear additional value like better prompts, more pages, or specialized focus. Test pricing and adjust based on sales velocity.
            </p>

            {/* Visual 2: AIDA Framework */}
            <figure className="my-12">
                <div className="bg-ink-900 border border-white/10 rounded-xl overflow-hidden font-sans">
                    <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
                        <div className="p-4 bg-gradient-to-b from-emerald-900/20 to-transparent">
                            <div className="text-4xl font-black text-white/10 mb-2">A</div>
                            <h4 className="font-bold text-emerald-400">Attention</h4>
                            <p className="text-xs text-parchment/60 mt-1">Hook the reader immediately.</p>
                        </div>
                        <div className="p-4 bg-gradient-to-b from-emerald-900/20 to-transparent">
                            <div className="text-4xl font-black text-white/10 mb-2">I</div>
                            <h4 className="font-bold text-emerald-400">Interest</h4>
                            <p className="text-xs text-parchment/60 mt-1">List benefits, not just features.</p>
                        </div>
                        <div className="p-4 bg-gradient-to-b from-emerald-900/20 to-transparent">
                            <div className="text-4xl font-black text-white/10 mb-2">D</div>
                            <h4 className="font-bold text-emerald-400">Desire</h4>
                            <p className="text-xs text-parchment/60 mt-1">Show the transformation.</p>
                        </div>
                        <div className="p-4 bg-gradient-to-b from-emerald-900/20 to-transparent">
                            <div className="text-4xl font-black text-white/10 mb-2">A</div>
                            <h4 className="font-bold text-emerald-400">Action</h4>
                            <p className="text-xs text-parchment/60 mt-1">Clear call to buy now.</p>
                        </div>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 14.2: The Copywriting Formula. Use A-I-D-A for descriptions that convert browsers to buyers.
                </figcaption>
            </figure>


            {/* Paragraph 4 - Platforms */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Platforms for Print-on-Demand</h3>
            <p className="mb-6">
                Amazon Kindle Direct Publishing serves the largest market with access to India and international territories. Upload once, available globally. Amazon handles printing, shipping, and customer service. You earn royalties of thirty to sixty percent depending on distribution and pricing. No upfront costs.
            </p>
            <p className="mb-6">
                Notion Press offers print-on-demand services in India with potentially better local distribution. Good for authors wanting a stronger presence in physical bookstores. They handle ISBN, printing, and distribution but take a larger cut of royalties than Amazon self-service.
            </p>
            <p className="mb-6">
                Lulu and IngramSpark provide access to wider distribution channels including bookstores and libraries globally. Higher printing quality options and more format choices. Better for serious authors building a professional catalog. Slightly more complex setup but worthwhile for premium products.
            </p>
            <p className="mb-6">
                Etsy works well for niche planners and journals marketed directly to specific communities. You list your PDF once, customers pay, and you fulfill through a POD service or they receive a downloadable version. Allows for more personalized branding and direct customer relationships.
            </p>

            {/* Paragraph 5 - Marketing */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Marketing Your POD Products</h3>
            <p className="mb-6">
                Amazon ads targeting relevant keywords drive the most sales for POD products. Start with a budget of ₹3,000 to ₹10,000 per month. Bid on keywords like "writing journal," "content planner," or your specific niche terms. Track advertising cost of sale, aiming for under forty percent, meaning every ₹1 spent on ads generates ₹2.50 in sales.
            </p>
            <p className="mb-6">
                Social media promotion showing the product in use converts well. Create Reels or TikToks flipping through pages, demonstrating the prompts or layouts, and sharing how the product helps achieve specific goals. Tag relevant communities and use niche hashtags. Include the Amazon link in bio.
            </p>
            <p className="mb-6">
                Bundle with your other products by mentioning your POD workbook at the end of your main book, offering it as a bonus for course purchasers at a discount, or including it in membership community resources. Cross-selling to an audience that already trusts you converts at higher rates.
            </p>
            <p className="mb-6">
                Launch sequences for new products create initial momentum. Build an email list of people interested in this product type. Announce the launch with early bird pricing or bonuses. Drive sales in the first week to boost Amazon ranking in your category. Higher ranking leads to more organic discovery.
            </p>
            <p className="mb-6">
                Reviews are critical for POD products because buyers can't flip through before purchasing. Include a note in the product asking satisfied users to leave a review. Aim for twenty to fifty reviews to build social proof. Respond to all reviews, especially constructive criticism, to show you care about customer satisfaction.
            </p>

            {/* Paragraph 6 - Scaling */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Scaling Your POD Business</h3>
            <p className="mb-6">
                Create product lines rather than one-off products. If you publish a "Freelance Writer's Planner," create companion products like "Freelance Income Tracker," "Client Management Logbook," and "Writing Goals Journal." Customers who love one often buy the set.
            </p>
            <p className="mb-6">
                Seasonal and updated editions maintain freshness. Release a new edition of your planner each year with updated layouts or bonus sections. Launch seasonal journals for specific times like "New Year Writing Goals Journal" or "NaNoWriMo Survival Planner."
            </p>
            <p className="mb-6">
                International markets multiply your revenue. If your journal sells fifty copies monthly in India, it might sell twenty in the US, ten in the UK, and five in Australia. That's eighty-five sales total instead of fifty, with US sales earning two to three times higher royalties due to pricing.
            </p>
            <p className="mb-6">
                Hire designers as you scale to increase output without burning out. Pay ₹3,000 to ₹12,000 per interior design for more complex planners. You provide the concept and content, they handle layout and formatting. This lets you launch one product per month instead of one per quarter.
            </p>

            {/* Visual 3: Scaling Ladder */}
            <figure className="my-12">
                <div className="flex flex-col md:flex-row gap-6 items-center justify-center font-sans">
                    <div className="relative group text-center">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-ink-900 border border-white/20 flex items-center justify-center mx-auto mb-3 z-10 relative group-hover:bg-emerald-900 transition-colors">
                            <Package className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        </div>
                        <div className="text-white font-bold">1 Product</div>
                        <div className="text-xs text-parchment/50">Start Here</div>
                    </div>
                    <div className="hidden md:block h-0.5 w-16 bg-white/10"></div>
                    <div className="relative group text-center">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-ink-900 border border-white/20 flex items-center justify-center mx-auto mb-3 z-10 relative group-hover:bg-emerald-900 transition-colors">
                            <Layers className="w-6 h-6 md:w-8 md:h-8 text-emerald-400" />
                        </div>
                        <div className="text-white font-bold">Product Line</div>
                        <div className="text-xs text-parchment/50">Cross-Sell</div>
                    </div>
                    <div className="hidden md:block h-0.5 w-16 bg-white/10"></div>
                    <div className="relative group text-center">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-ink-900 border border-white/20 flex items-center justify-center mx-auto mb-3 z-10 relative group-hover:bg-emerald-900 transition-colors">
                            <Globe className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
                        </div>
                        <div className="text-white font-bold">Global Scale</div>
                        <div className="text-xs text-parchment/50">USD Royalties</div>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 14.3: The Scaling Ladder. Content once, sold globally.
                </figcaption>
            </figure>


            {/* Paragraph 7 - Real Example */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Real Example: Leela's ₹11.8 Lakh POD Income</h3>
            <p className="mb-6">
                Leela, twenty-nine years old in Chennai, created a "Content Creator's Planner" with monthly calendars, content idea trackers, and analytics pages. She priced it at ₹599 on Amazon India and eight-ninety-nine dollars in the US. Her royalty per sale averaged ₹180 in India and ₹280 internationally.
            </p>
            <p className="mb-6">
                Month one post-launch: she sold thirty-two planners in India and eighteen internationally through her social media promotion and email list announcement. Revenue: ₹10,800.
            </p>
            <p className="mb-6">
                She invested ₹5,000 monthly in Amazon ads targeting "content planner" and "social media planner" keywords. By month three, organic ranking improved and sales stabilized at sixty Indian and thirty-five international sales monthly for approximately ₹18,600 monthly revenue.
            </p>
            <p className="mb-6">
                She then created four companion products over the next six months: Social Media Content Tracker, YouTube Video Planner, Blogging Journal, and Creator Income Tracker. Each product sold twenty to forty copies monthly. By month twelve, her five-product line generated ₹98,000 monthly or ₹11.8 lakh annually with minimal ongoing work beyond updating listings and managing ads.
            </p>

            {/* Visual 4: Leela's Growth Chart */}
            <figure className="my-12">
                <div className="bg-ink-900 border border-white/10 p-6 rounded-xl">
                    <h4 className="text-center font-bold text-white mb-6 uppercase tracking-widest text-sm">Leela's Revenue Growth (1 Year)</h4>
                    <div className="relative h-48 border-l border-b border-white/10 font-sans text-xs">
                        {/* Month 1 */}
                        <div className="absolute left-[5%] bottom-0 w-[15%] h-[11%] bg-blue-500/50 hover:bg-emerald-400 transition-colors rounded-t group">
                            <div className="absolute -top-6 w-full text-center font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">₹10.8k</div>
                            <div className="absolute -bottom-6 w-full text-center text-parchment/60">Mo 1</div>
                        </div>
                        {/* Month 3 */}
                        <div className="absolute left-[30%] bottom-0 w-[15%] h-[19%] bg-blue-500/50 hover:bg-emerald-400 transition-colors rounded-t group">
                            <div className="absolute -top-6 w-full text-center font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">₹18.6k</div>
                            <div className="absolute -bottom-6 w-full text-center text-parchment/60">Mo 3</div>
                        </div>
                        {/* Month 12 */}
                        <div className="absolute right-[5%] bottom-0 w-[15%] h-[98%] bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] rounded-t group">
                            <div className="absolute -top-6 w-full text-center font-bold text-emerald-400">₹98k</div>
                            <div className="absolute -bottom-6 w-full text-center text-emerald-400 font-bold">Mo 12</div>
                        </div>

                        {/* Trend Line (Approximate visualization) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                            <path d="M 40 170 Q 150 150 350 10 " fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" className="text-white/20" />
                        </svg>
                    </div>
                    <div className="text-center mt-8 text-xs text-parchment/50 italic">
                        From 1 product (₹10k) to 5-product line (₹98k).
                    </div>
                </div>
            </figure>


            {/* Paragraph 8 - Mistakes */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Common Mistakes</h3>
            <p className="mb-6">
                Mistake number one is creating generic products that don't solve specific problems. A "Daily Journal" competes with thousands of others. A "Freelance Writer's Daily Planner with Income Tracker and Pitch Log" serves a specific need and reduces competition.
            </p>
            <p className="mb-6">
                Mistake number two involves poor interior design and formatting that looks amateurish. Buyers judge quality instantly. Invest in learning proper design principles or hire professionals. A badly formatted planner with cramped text and inconsistent spacing gets bad reviews and returns.
            </p>
            <p className="mb-6">
                Mistake number three is not testing pricing. Many creators underprice POD products at ₹199 when the target audience would happily pay ₹499 or ₹699 for a quality product. Test higher prices and monitor sales velocity.
            </p>
            <p className="mb-6">
                Mistake number four involves launching products without marketing plans. Simply uploading to Amazon and hoping for sales doesn't work. Build an audience first or budget for ads. Without visibility, even great products don't sell.
            </p>

            {/* Paragraph 9 - Snapshot */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Real Numbers Snapshot</h3>
            <p className="mb-6">
                Months one through three: launch first product, test ads, gather reviews. Average twenty to thirty sales monthly at ₹150 to ₹200 royalty. Revenue: ₹3,000 to ₹6,000 per month.
            </p>
            <p className="mb-6">
                Months four through twelve: optimize ads, add second and third products. Average sixty to one hundred sales monthly across products at ₹160 average royalty. Revenue: ₹9,600 to ₹16,000 monthly or ₹1.15 to 1.92 lakh annually.
            </p>
            <p className="mb-6">
                Year two: five to seven products in the catalog, improved rankings, international sales growing. Average one hundred eighty to three hundred sales monthly at ₹170 average royalty. Revenue: ₹30,600 to ₹51,000 monthly or ₹3.67 to 6.12 lakh annually.
            </p>
            <p className="mb-6">
                Year three: ten to fifteen products, strong catalog effect where customers buy multiple products, established brand in your niche. Average three hundred fifty to five hundred sales monthly at ₹180 average royalty. Revenue: ₹63,000 to ₹90,000 monthly or ₹7.56 to 10.8 lakh annually.
            </p>

            {/* Action Box */}
            <div className="mt-16 bg-gradient-to-r from-emerald-900/40 to-ink-900 border border-emerald-500/50 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Printer className="w-32 h-32 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-ink-black text-sm">🚀</span>
                    ACTION BOX: Launch Your First POD Product
                </h3>
                <div className="grid md:grid-cols-2 gap-8 relative z-10 font-sans">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Search className="w-4 h-4 text-emerald-400" />
                            <span className="font-bold text-white uppercase text-sm">This Week</span>
                        </div>
                        <p className="text-parchment/80 text-sm pl-6 mb-4">Research Amazon bestsellers in niche. Identify gap or specific need.</p>

                        <div className="flex items-center gap-2 mb-3">
                            <Palette className="w-4 h-4 text-emerald-400" />
                            <span className="font-bold text-white uppercase text-sm">Next 2 Weeks</span>
                        </div>
                        <p className="text-parchment/80 text-sm pl-6">Design interior & cover. Write AIDA description.</p>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="bg-emerald-500/10 rounded-lg p-6 border border-emerald-500/30 text-center">
                            <div className="text-xs uppercase tracking-widest text-emerald-400 mb-2">First 30 Days</div>
                            <div className="text-3xl font-bold text-white mb-1">20 Sales</div>
                            <div className="text-[10px] text-parchment/60">5 Reviews Goal</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

const FaCalendarAltIconFallback = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
)

export default PagesChapterPOD;
