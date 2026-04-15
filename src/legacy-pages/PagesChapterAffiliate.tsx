import React from 'react';
import {
    Link, MousePointerClick, RefreshCw, Layers,
    BarChart3, CheckCircle, ShieldCheck, AlertTriangle,
    Coins, ArrowRight, Laptop
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PagesChapterAffiliate = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 font-serif text-lg md:text-xl leading-relaxed text-parchment/90">
            {/* Title Section */}
            <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 border-emerald-500/50 text-emerald-400 tracking-[0.2em] font-sans">
                    STREAM 9
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">AFFILIATE MARKETING – ₹5,000 TO ₹2 LAKH PER MONTH</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-gold mx-auto rounded-full" />
            </div>

            {/* Paragraph 1 */}
            <p className="mb-6 first-letter:text-5xl first-letter:text-emerald-400 first-letter:font-bold first-letter:mr-2 first-letter:float-left">
                Affiliate marketing is recommending tools, courses, and products you already use and earning a commission when your audience buys through your link. It's passive income that compounds as your content library and audience grow.
            </p>

            {/* Visual 1: The Passive Income Loop */}
            <figure className="my-12">
                <div className="flex flex-col md:flex-row items-center gap-4 justify-center font-sans text-sm">
                    <Card className="p-4 bg-white/5 border-white/10 text-center w-full md:w-1/3">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-3"><Laptop className="w-5 h-5" /></div>
                        <div className="font-bold text-white">Create Content</div>
                        <div className="text-xs text-parchment/60 mt-1">Write once.</div>
                    </Card>
                    <ArrowRight className="hidden md:block text-parchment/20" />
                    <Card className="p-4 bg-white/5 border-white/10 text-center w-full md:w-1/3">
                        <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-3"><MousePointerClick className="w-5 h-5" /></div>
                        <div className="font-bold text-white">Visitor Clicks</div>
                        <div className="text-xs text-parchment/60 mt-1">24/7 Traffic.</div>
                    </Card>
                    <ArrowRight className="hidden md:block text-parchment/20" />
                    <Card className="p-4 bg-emerald-900/20 border-emerald-500/30 text-center w-full md:w-1/3 relative overflow-hidden">
                        <div className="absolute inset-0 bg-emerald-500/5 animate-pulse"></div>
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3 relative z-10"><Coins className="w-5 h-5" /></div>
                        <div className="font-bold text-emerald-400 relative z-10">Earn Commission</div>
                        <div className="text-xs text-emerald-200/60 mt-1 relative z-10">While you sleep.</div>
                    </Card>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 9.1: The Passive Engine. Build the asset once, get paid repeatedly.
                </figcaption>
            </figure>


            {/* Paragraph 2 - Economics */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">The Affiliate Economics in Writing Niches</h3>
            <p className="mb-6">
                Writing tools and software typically offer fifteen to thirty percent recurring commissions. Grammarly pays around twenty dollars per premium signup, which is roughly ₹1,600. Scrivener pays twenty-five percent on each sale. ProWritingAid offers fifty percent commission on subscriptions.
            </p>
            <p className="mb-6">
                Self-publishing tools and services provide generous affiliate programs. Amazon Associates pays four to ten percent on book sales and linked products. Canva offers ten dollars per free trial conversion. Vellum pays twenty-five percent on software sales at around forty-nine dollars per license.
            </p>
            <p className="mb-6">
                Online courses and education platforms offer thirty to fifty percent commissions. Teachable affiliates earn thirty percent recurring. Skillshare pays seven dollars per referral. Udemy offers fifteen to fifty percent depending on whether it's a new or existing customer.
            </p>
            <p className="mb-6">
                Hosting and website tools pay well for long-term subscriptions. Bluehost offers sixty-five to hundred-thirty dollars per signup. ConvertKit pays thirty percent recurring monthly. Namecheap gives twenty to hundred dollars per domain or hosting sale.
            </p>

            {/* Visual 2: Commission Potential Grid */}
            <figure className="my-12">
                <div className="grid gap-3 sm:grid-cols-2">
                    <div className="bg-ink-900 border border-white/10 p-4 rounded-lg flex justify-between items-center group hover:border-emerald-500/30 transition-colors">
                        <div>
                            <h4 className="font-bold text-white text-sm">Hosting (Bluehost)</h4>
                            <p className="text-xs text-parchment/60">High CPA</p>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-emerald-400">₹5,000+</div>
                            <div className="text-[10px] uppercase text-parchment/40">Per Signup</div>
                        </div>
                    </div>
                    <div className="bg-ink-900 border border-white/10 p-4 rounded-lg flex justify-between items-center group hover:border-purple-500/30 transition-colors">
                        <div>
                            <h4 className="font-bold text-white text-sm">Email (ConvertKit)</h4>
                            <p className="text-xs text-parchment/60">Recurring Monthly</p>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-purple-400">30%</div>
                            <div className="text-[10px] uppercase text-parchment/40">Lifetime</div>
                        </div>
                    </div>
                    <div className="bg-ink-900 border border-white/10 p-4 rounded-lg flex justify-between items-center group hover:border-blue-500/30 transition-colors">
                        <div>
                            <h4 className="font-bold text-white text-sm">Software (Vellum)</h4>
                            <p className="text-xs text-parchment/60">One-time Sale</p>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-blue-400">25%</div>
                            <div className="text-[10px] uppercase text-parchment/40">Per License</div>
                        </div>
                    </div>
                    <div className="bg-ink-900 border border-white/10 p-4 rounded-lg flex justify-between items-center group hover:border-amber-500/30 transition-colors">
                        <div>
                            <h4 className="font-bold text-white text-sm">Courses (Teachable)</h4>
                            <p className="text-xs text-parchment/60">High Ticket</p>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-amber-400">30-50%</div>
                            <div className="text-[10px] uppercase text-parchment/40">Commission</div>
                        </div>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 9.2: The Bounty Board. Hosting and Recurring SaaS offer the highest long-term yields.
                </figcaption>
            </figure>


            {/* Paragraph 3 - Strategies */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">High-Converting Affiliate Strategies</h3>
            <p className="mb-6">
                Resource pages convert the best. Create a "Tools I Use" or "My Writing Tech Stack" page listing every software, app, and resource you actually use with affiliate links. Add brief explanations of why you use each tool and who it's best for. Update this page quarterly and link to it from your newsletter signature, blog posts, and social profiles.
            </p>
            <p className="mb-6">
                Tutorial content drives qualified traffic. Write blog posts or create YouTube videos like "How to Format Your Book Using Vellum" or "Setting Up Your Author Website with Bluehost in 10 Minutes." The people watching these are ready to buy, making conversion rates much higher than random traffic. Include your affiliate link in the description or post with clear disclosure.
            </p>
            <p className="mb-6">
                Email recommendations to engaged subscribers. When you genuinely love a new tool or course, tell your email list about it. Share specifically how it solved a problem for you and who else would benefit. Your warm audience trusts your recommendations more than cold traffic does. Conversion rates can hit five to fifteen percent on targeted email recommendations to engaged subscribers.
            </p>
            <p className="mb-6">
                Comparison posts answer buyer questions. Write articles comparing tools in the same category like "Scrivener vs Google Docs for Novel Writing" or "ConvertKit vs Mailchimp for Authors." Provide honest pros and cons for each, then make a clear recommendation. These posts rank well in search and catch people actively researching purchase decisions.
            </p>
            <p className="mb-6">
                Course and book reviews with bonuses. Review online courses or books in your niche, then offer exclusive bonuses for people who purchase through your link. Your bonus might be a thirty-minute consultation call, a downloadable template, or access to a private community. This tips the decision in your favor when someone is comparing affiliates.
            </p>

            {/* Visual 3: Content Conversion Funnel */}
            <figure className="my-12">
                <div className="flex flex-col gap-1 items-center font-sans">
                    {/* Tier 1 */}
                    <div className="w-full max-w-[90%] bg-emerald-900/10 border border-emerald-500/10 p-4 rounded text-center">
                        <h4 className="text-white font-bold text-sm">Resource Page</h4>
                        <p className="text-[10px] text-parchment/60">Broad Appeal • Low Conv % • Passive</p>
                    </div>
                    <div className="h-4 border-l border-dashed border-emerald-500/30"></div>
                    {/* Tier 2 */}
                    <div className="w-full max-w-[70%] bg-emerald-900/20 border border-emerald-500/20 p-4 rounded text-center">
                        <h4 className="text-white font-bold text-sm">Comparison / Tutorial</h4>
                        <p className="text-[10px] text-parchment/60">High Intent • Med Conv % • Search Traffic</p>
                    </div>
                    <div className="h-4 border-l border-dashed border-emerald-500/30"></div>
                    {/* Tier 3 */}
                    <div className="w-full max-w-[50%] bg-emerald-900/40 border border-emerald-500/40 p-4 rounded text-center shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                        <h4 className="text-white font-bold text-lg">Email Recommendation</h4>
                        <p className="text-xs text-emerald-200/80">Warm Audience • High Conv (5-15%)</p>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 9.3: The Conversion Ladder. The more specific and personal the recommendation, the higher the conversion.
                </figcaption>
            </figure>


            {/* Paragraph 4 - Building Stream */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Building an Affiliate Income Stream</h3>
            <p className="mb-6">
                Step one: Sign up for relevant affiliate programs. Start with Amazon Associates for books and general products. Join ShareASale and Impact for access to hundreds of tools and services. Apply to individual programs for software you already use like Grammarly, Canva, and ConvertKit. Keep a spreadsheet tracking your affiliate links, commission rates, cookie duration, and payout thresholds.
            </p>
            <p className="mb-6">
                Step two: Create your foundational affiliate content. Write your comprehensive "Tools and Resources" page. Create three to five detailed tutorial posts or videos showing how to use your favorite tools. Publish honest reviews of courses or books you've completed. This content works for you 24/7 generating clicks and sales.
            </p>
            <p className="mb-6">
                Step three: Integrate affiliate mentions naturally in regular content. When you write a blog post about productivity, mention the writing app you use with your affiliate link. When you teach a workshop about self-publishing, reference the formatting software you recommend. Don't force it, but don't miss obvious opportunities either.
            </p>
            <p className="mb-6">
                Step four: Track what converts and double down. Use link tracking through platforms like Pretty Links or Bitly to see which content drives the most affiliate clicks and sales. If your Scrivener tutorial generates ₹8,000 per month while your Grammarly post generates ₹500, create more Scrivener content. Follow the data.
            </p>
            <p className="mb-6">
                Step five: Build recurring commission sources. Prioritize promoting software and services that pay monthly recurring commissions rather than one-time payments. A single ConvertKit referral paying ₹800 per month for two years is worth ₹19,200 over time, far more valuable than a one-time ₹2,000 course commission.
            </p>

            {/* Visual 4: Recurring vs One-Time Vis */}
            <figure className="my-12">
                <div className="bg-ink-900 border border-white/10 p-6 rounded-xl flex flex-col md:flex-row gap-8 items-end">
                    <div className="flex-1 w-full text-center">
                        <div className="h-16 w-full bg-blue-500/20 border border-blue-500/50 rounded-t flex items-end justify-center pb-2 text-xs text-blue-300 mb-1">One Time</div>
                        <div className="text-white font-bold pb-2">Course Sale</div>
                        <div className="h-32 w-4 mx-auto bg-blue-500 rounded-t"></div>
                        <div className="mt-2 text-sm text-parchment/60">₹2,000 Today</div>
                    </div>
                    <div className="text-2xl text-parchment/20 font-bold mb-12">VS</div>
                    <div className="flex-1 w-full text-center">
                        <div className="h-16 w-full bg-purple-500/20 border border-purple-500/50 rounded-t flex items-end justify-center pb-2 text-xs text-purple-300 mb-1">Recurring</div>
                        <div className="text-white font-bold pb-2">SaaS Sub</div>
                        <div className="flex justify-center items-end gap-1 h-32">
                            {[1, 2, 3, 4, 5, 6].map(h => (
                                <div key={h} className="w-3 bg-purple-500 rounded-t" style={{ height: `${h * 15}%`, opacity: 0.5 + (h * 0.1) }}></div>
                            ))}
                        </div>
                        <div className="mt-2 text-sm text-emerald-400 font-bold">₹19,200 Over Time</div>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 9.4: The Recurring Advantage. Small monthly commissions compound into massive lifetime value.
                </figcaption>
            </figure>


            {/* Paragraph 5 - Disclosure */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Disclosure and Trust</h3>
            <p className="mb-6">
                Always disclose affiliate relationships clearly. Use language like "This post contains affiliate links, which means I earn a small commission if you purchase through my link at no extra cost to you." Put this at the beginning of posts and in video descriptions. It's legally required in many jurisdictions and ethically necessary everywhere.
            </p>
            <p className="mb-6">
                Only promote products you've actually used and would recommend regardless of commission. Your credibility is worth more than short-term affiliate income. One bad recommendation damages trust you spent months building.
            </p>
            <p className="mb-6">
                Be honest about limitations and drawbacks. If a tool has weaknesses, mention them alongside the strengths. Balanced reviews convert better because readers trust you're being real with them rather than just chasing commissions.
            </p>

            {/* Visual 5: Trust Indicators */}
            <figure className="my-12">
                <div className="bg-gradient-to-br from-ink-900 to-emerald-950/20 border border-emerald-500/20 p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                        <ShieldCheck className="w-6 h-6 text-emerald-500" />
                        <h4 className="text-white font-bold">The Trust Checklist</h4>
                    </div>
                    <ul className="space-y-3 font-sans text-sm text-parchment/80">
                        <li className="flex gap-3">
                            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span><strong>Clear Disclosure:</strong> Top of post, plain English.</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span><strong>Personal Use:</strong> "I actually use this."</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span><strong>Balanced Review:</strong> "Good for X, bad for Y."</span>
                        </li>
                    </ul>
                </div>
            </figure>


            {/* Paragraph 6 - Real Example */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Real Example: Pooja's ₹8.3 Lakh Affiliate Income</h3>
            <p className="mb-6">
                Pooja, twenty-nine years old in Mumbai, ran a blog about self-publishing that got five thousand visitors per month. She created a detailed "Self-Publishing Tech Stack" page with affiliate links to Vellum, Canva, Amazon KDP, ProWritingAid, and Findaway Voices.
            </p>
            <p className="mb-6">
                She also wrote in-depth tutorials on "How to Format Your Ebook in Vellum" and "Creating Book Covers in Canva" that ranked well in Google search. These evergreen posts brought in one thousand targeted visitors per month who were actively looking to buy these tools.
            </p>
            <p className="mb-6">
                Her first year affiliate income breakdown looked like this: Vellum referrals at twenty-five percent commission generated ₹2.1 lakh from forty-three sales. Canva Pro referrals earned ₹1.3 lakh from one hundred sixty signups. ProWritingAid recurring commissions built to ₹2,400 per month by year end for ₹28,800 annually. Amazon Associates from book recommendations and linked products added ₹1.8 lakh. Various other affiliate programs contributed ₹1.2 lakh. Total year-one affiliate revenue: ₹6.4 lakh.
            </p>
            <p className="mb-6">
                Year two, her traffic doubled to ten thousand monthly visitors. Her Vellum and Canva tutorials ranked number one and two in Google for key search terms. Affiliate income grew to ₹14.7 lakh with minimal additional work since the content was evergreen. She spent maybe three hours per month updating old posts and adding new affiliate content.
            </p>

            {/* Visual 6: Income Breakdown */}
            <figure className="my-12">
                <h4 className="text-center text-xs font-bold uppercase tracking-widest text-parchment/60 mb-6 font-sans">Pooja's Year 1 Income Stack (₹6.4 Lakh)</h4>
                <div className="flex flex-col gap-2 font-sans text-sm">
                    {[
                        { label: "Vellum (Software)", val: "₹2.1L", pct: 33, col: "bg-blue-500" },
                        { label: "Amazon (Books)", val: "₹1.8L", pct: 28, col: "bg-orange-500" },
                        { label: "Canva (SaaS)", val: "₹1.3L", pct: 20, col: "bg-purple-500" },
                        { label: "Other Programs", val: "₹1.2L", pct: 19, col: "bg-emerald-500" },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <div className="w-32 text-right text-xs text-parchment/60 truncate">{item.label}</div>
                            <div className="flex-1 bg-white/5 rounded-r overflow-hidden h-8 relative group">
                                <div className={`h-full ${item.col} absolute top-0 left-0 hover:brightness-110 transition-all`} style={{ width: `${item.pct}%` }}></div>
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-white z-10">{item.val}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </figure>


            {/* Paragraph 7 - Mistakes */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Common Mistakes</h3>
            <p className="mb-6">
                Mistake number one: promoting products you've never used or wouldn't personally recommend. Readers sense inauthenticity instantly and your conversion rates tank.
            </p>
            <p className="mb-6">
                Mistake number two: turning every post into an affiliate pitch. If every piece of content screams "buy this," people stop reading. The ratio should be ninety percent pure value to ten percent affiliate mentions.
            </p>
            <p className="mb-6">
                Mistake number three: not disclosing affiliate relationships. This violates FTC guidelines in the US, can get you banned from affiliate programs, and destroys reader trust when discovered.
            </p>
            <p className="mb-6">
                Mistake number four: giving up after one month when you've made ₹500. Affiliate income is a compound game. Your content library builds over months, rankings improve over time, and recurring commissions stack. Give it six to twelve months of consistent effort before evaluating.
            </p>

            {/* Paragraph 8 - Snapshot */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Real Numbers Snapshot</h3>
            <p className="mb-6">
                Months one through three scenario: set up affiliate accounts, create foundational content. Minimal income of ₹2,000 to ₹8,000 per month.
            </p>
            <p className="mb-6">
                Months four through twelve scenario: content starts ranking, traffic builds, recurring commissions accumulate. Income grows from ₹8,000 to ₹35,000 per month. Year-one total: ₹1.8 to 3.2 lakh.
            </p>
            <p className="mb-6">
                Year two scenario: established content ranks well, recurring commissions compound, traffic at eight thousand to twelve thousand monthly visitors. Average ₹50,000 to ₹90,000 per month. Year-two total: ₹6 to 11 lakh.
            </p>
            <p className="mb-6">
                Year three scenario: mature affiliate business with strong SEO, loyal audience, stacked recurring commissions. Average ₹1 to 1.8 lakh per month. Year-three total: ₹12 to 22 lakh.
            </p>

            {/* Action Box */}
            <div className="mt-16 bg-gradient-to-r from-emerald-900/40 to-ink-900 border border-emerald-500/50 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <RefreshCw className="w-32 h-32 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-ink-black text-sm">🚀</span>
                    ACTION BOX: Start Your Affiliate Engine
                </h3>
                <div className="grid md:grid-cols-2 gap-8 relative z-10 font-sans">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                            <span className="font-bold text-white uppercase text-sm">This Week</span>
                        </div>
                        <p className="text-parchment/80 text-sm pl-6 mb-4">Sign up for Amazon Associates + 3 tool programs (e.g. Grammarly, ConvertKit).</p>

                        <div className="flex items-center gap-2 mb-3">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                            <span className="font-bold text-white uppercase text-sm">Next Week</span>
                        </div>
                        <p className="text-parchment/80 text-sm pl-6">Publish "Tools I Use" page & 1 detailed tutorial.</p>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="bg-emerald-500/10 rounded-lg p-6 border border-emerald-500/30 text-center">
                            <div className="text-xs uppercase tracking-widest text-emerald-400 mb-2">60-Day Goal</div>
                            <div className="text-3xl font-bold text-white mb-1">₹5,000</div>
                            <div className="text-[10px] text-parchment/60">First Commissions Earned</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PagesChapterAffiliate;
