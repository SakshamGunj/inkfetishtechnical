import React from 'react';
import {
    Mail, Users, DollarSign, TrendingUp,
    Target, BarChart, CheckCircle2, Megaphone,
    MousePointerClick, Calendar
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PagesChapterNewsletters = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 font-serif text-lg md:text-xl leading-relaxed text-parchment/90">
            {/* Title Section */}
            <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 border-emerald-500/50 text-emerald-400 tracking-[0.2em] font-sans">
                    STREAM 8
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">NEWSLETTER SPONSORSHIPS – ₹10,000 TO ₹3 LAKH PER MONTH</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-gold mx-auto rounded-full" />
            </div>

            {/* Paragraph 1 */}
            <p className="mb-6 first-letter:text-5xl first-letter:text-emerald-400 first-letter:font-bold first-letter:mr-2 first-letter:float-left">
                Newsletter sponsorships turn your email list into a recurring revenue stream. Brands pay you to reach your engaged audience directly in their inboxes. The magic number is one thousand subscribers, but the real money starts at five thousand subscribers with high open rates.
            </p>

            {/* Visual 1: The Magic Number Card */}
            <figure className="my-12">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                    <Card className="bg-white/5 border-white/10 p-6 flex flex-col items-center flex-1 w-full text-center">
                        <Users className="w-8 h-8 text-parchment/40 mb-3" />
                        <div className="text-2xl font-bold text-white mb-1">1,000</div>
                        <div className="text-xs uppercase tracking-widest text-parchment/60">Subscribers</div>
                        <div className="mt-4 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-bold">Monetization Unlocked</div>
                    </Card>
                    <div className="hidden md:block text-parchment/20">
                        <ArrowRightIcon />
                    </div>
                    <Card className="bg-emerald-900/20 border-emerald-500/30 p-6 flex flex-col items-center flex-1 w-full text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/20 blur-2xl rounded-full"></div>
                        <DollarSign className="w-8 h-8 text-emerald-400 mb-3" />
                        <div className="text-2xl font-bold text-emerald-400 mb-1">5,000+</div>
                        <div className="text-xs uppercase tracking-widest text-emerald-200/60">High Income Zone</div>
                        <div className="mt-4 px-3 py-1 bg-emerald-500 text-ink-black rounded text-xs font-bold">Real Money Starts</div>
                    </Card>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 8.1: The Scale Threshold. Hit 1k to start, but 5k is where you replace your salary.
                </figcaption>
            </figure>

            {/* Paragraph 2 - Economics */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">The Newsletter Economics</h3>
            <p className="mb-6">
                With one thousand to three thousand subscribers and a thirty-five percent plus open rate, you can charge ₹5,000 to ₹15,000 per sponsored email or newsletter slot. With three thousand to ten thousand subscribers maintaining thirty percent plus opens, rates jump to ₹15,000 to ₹50,000 per sponsorship. At ten thousand to thirty thousand subscribers with twenty-five percent plus opens, you're looking at ₹50,000 to ₹1.5 lakh per sponsor slot. Above thirty thousand subscribers, premium newsletters charge ₹1.5 to 5 lakh per sponsorship, especially in profitable niches like business, finance, technology, and marketing.
            </p>

            {/* Paragraph 3 */}
            <p className="mb-6">
                The key metric isn't just subscriber count but engagement rate. A newsletter with five thousand subscribers and a forty percent open rate is worth more than one with twenty thousand subscribers and a ten percent open rate. Sponsors pay for attention and action, not vanity metrics.
            </p>

            {/* Visual 2: The Value Formula */}
            <figure className="my-12">
                <div className="bg-ink-900 border border-white/10 rounded-xl p-6 font-mono text-sm md:text-base text-center">
                    <div className="flex items-center justify-center gap-2 md:gap-4 text-parchment/60 mb-2">
                        <span>( Subscribers</span>
                        <span className="text-white">x</span>
                        <span>Open Rate )</span>
                        <span className="text-white">x</span>
                        <span>Niche Value</span>
                    </div>
                    <div className="text-2xl md:text-3xl text-emerald-400 font-bold">= Sponsorship Fee</div>
                    <div className="mt-4 pt-4 border-t border-white/10 flex justify-center gap-8 text-xs text-parchment/40 font-sans">
                        <div className="text-center">
                            <div className="text-white font-bold mb-1">40% Open Rate</div>
                            <div>Gold Standard</div>
                        </div>
                        <div className="text-center">
                            <div className="text-red-400 font-bold mb-1">&lt;20% Open Rate</div>
                            <div>Hard to Sell</div>
                        </div>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 8.2: The Sponsor's Calculus. A small engaged list beats a large dead list every time.
                </figcaption>
            </figure>

            {/* Paragraph 4 - Niches */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Newsletter Niches That Attract Sponsors</h3>
            <p className="mb-6">
                Business and entrepreneurship newsletters attract SaaS companies, productivity tools, business books, online courses, and consulting services as sponsors. These companies have healthy budgets and understand content marketing ROI.
            </p>
            <p className="mb-6">
                Marketing and copywriting newsletters get approached by marketing automation platforms, design tools, analytics software, and agencies looking for freelancers. The audience has purchasing power and buys tools regularly.
            </p>
            <p className="mb-6">
                Personal finance and investing newsletters are sponsored by investment platforms, insurance companies, financial advisors, personal finance apps, and wealth management services. High-ticket sponsors with generous budgets.
            </p>
            <p className="mb-6">
                Writing and publishing newsletters attract self-publishing tools, writing software, editing services, book marketing agencies, and online courses for writers. Engaged audience willing to invest in their craft.
            </p>
            <p className="mb-6">
                Technology and startup newsletters get approached by cloud hosting providers, developer tools, recruitment platforms, and B2B SaaS companies targeting founders and product teams.
            </p>

            {/* Visual 3: Niche Matrix */}
            <figure className="my-12 grid grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                    { niche: "Business", sponsor: "SaaS & Tools", icon: Target },
                    { niche: "Marketing", sponsor: "Analytics/Agencies", icon: Megaphone },
                    { niche: "Finance", sponsor: "Invest Apps", icon: TrendingUp },
                    { niche: "Writing", sponsor: "Publishing Tools", icon: Mail },
                    { niche: "Tech", sponsor: "Cloud/Dev Tools", icon: MousePointerClick },
                    { niche: "Health", sponsor: "Supplements/Apps", icon: CheckCircle2 },
                ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-3 rounded hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                            <item.icon className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs font-bold text-white uppercase">{item.niche}</span>
                        </div>
                        <div className="text-[10px] text-parchment/60">Sponsors: <span className="text-parchment/90">{item.sponsor}</span></div>
                    </div>
                ))}
            </figure>


            {/* Paragraph 5 - Building */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Building a Sponsorship-Ready Newsletter</h3>
            <p className="mb-6">
                Step one: Choose a specific niche and audience. Don't build a general newsletter about "life and writing." Build one specifically for "freelance content writers who want to earn ₹2 lakh plus per month" or "first-time authors navigating self-publishing." Specific niches attract specific sponsors who want that exact audience.
            </p>
            <p className="mb-6">
                Step two: Grow to one thousand engaged subscribers first. Use a lead magnet that solves a specific problem for your target audience. Promote it through LinkedIn posts, Twitter threads, guest posts, podcast interviews, and collaborations with complementary newsletters. Aim for fifty to one hundred new subscribers per week through consistent content and promotion.
            </p>
            <p className="mb-6">
                Step three: Establish publishing consistency and high-quality content. Send your newsletter weekly or bi-weekly on the same day and time. Write valuable, original content that subscribers actually want to open and read. Your open rate needs to stay above thirty percent to attract sponsors. If it drops below twenty-five percent, sponsors won't be interested.
            </p>
            <p className="mb-6">
                Step four: Create a sponsor page on your website. Once you hit one thousand subscribers, create a dedicated "Sponsor This Newsletter" page. Include your subscriber count, open rate, click rate, audience demographics, sample topics you cover, pricing packages, and testimonials from past sponsors if you have them. Make it easy for brands to understand who they'll reach and what it costs.
            </p>
            <p className="mb-6">
                Step five: Proactively pitch brands in your niche. Don't just wait for sponsors to find you. Make a list of twenty brands whose products or services align with your audience's interests. Email their marketing manager with a personalized pitch explaining who your audience is, why they'd benefit from sponsoring, your rates, and examples of past sponsorships or engagement metrics. Close rate on cold pitches is typically ten to twenty percent if your audience matches their customer profile.
            </p>

            {/* Visual 4: The 5-Step Build */}
            <figure className="my-12">
                <div className="space-y-4 font-sans">
                    {[
                        { step: "Niche Down", desc: "Specific Audience = High Value" },
                        { step: "Grow to 1k", desc: "The Validation Milestone" },
                        { step: "Consistency", desc: "Weekly Rhythm, >30% Open Rate" },
                        { step: "Sponsor Page", desc: "Public Media Kit & Pricing" },
                        { step: "Pitch Brands", desc: "Cold Outreach to Ideal Sponsors" }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4 items-center">
                            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold border border-emerald-500/50">{i + 1}</div>
                            <div className="flex-1 bg-white/5 p-3 rounded border-l-2 border-emerald-500/20">
                                <div className="font-bold text-white text-sm">{item.step}</div>
                                <div className="text-xs text-parchment/60">{item.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </figure>


            {/* Paragraph 6 - Pricing Models */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Sponsorship Models and Pricing</h3>
            <p className="mb-6">
                The dedicated email sponsorship involves sending a standalone email promoting the sponsor's product or service to your entire list. Charge ₹10,000 to ₹1 lakh depending on list size and niche. This format converts best but use it sparingly, maybe once per month maximum, or risk annoying subscribers.
            </p>
            <p className="mb-6">
                The newsletter section sponsorship includes a two-hundred to three-hundred-word sponsored section within your regular newsletter content. Charge ₹5,000 to ₹50,000 depending on list size. You can include one sponsor per newsletter without disrupting the reader experience.
            </p>
            <p className="mb-6">
                The classified ads section lists three to five brief sponsor mentions at the end of each newsletter. Charge ₹2,000 to ₹10,000 per listing. This allows multiple sponsors per issue and creates recurring monthly revenue.
            </p>
            <p className="mb-6">
                The monthly package bundles four newsletter mentions plus one dedicated email for a discounted rate. Charge ₹40,000 to ₹3 lakh for the package depending on your reach. Sponsors love packages because they get better ROI through repeated exposure.
            </p>

            {/* Visual 5: Ad Format Cards */}
            <figure className="my-12 grid gap-4 md:grid-cols-3">
                <Card className="bg-emerald-950/30 border-emerald-500/50 p-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-emerald-500 text-[9px] font-bold px-2 py-0.5 text-ink-black uppercase">High Ticket</div>
                    <h4 className="text-white font-bold mb-2 text-sm">Dedicated Email</h4>
                    <p className="text-xs text-parchment/60 mb-3">Standalone promo to full list.</p>
                    <div className="text-emerald-400 font-bold text-sm">₹10k - 1 Lakh</div>
                </Card>
                <Card className="bg-white/5 border-white/10 p-4">
                    <h4 className="text-white font-bold mb-2 text-sm">Sponsored Section</h4>
                    <p className="text-xs text-parchment/60 mb-3">200-300 words inside content.</p>
                    <div className="text-parchment/80 font-bold text-sm">₹5k - 50k</div>
                </Card>
                <Card className="bg-white/5 border-white/10 p-4">
                    <h4 className="text-white font-bold mb-2 text-sm">Classifieds</h4>
                    <p className="text-xs text-parchment/60 mb-3">Brief mentions at footer.</p>
                    <div className="text-parchment/80 font-bold text-sm">₹2k - 10k</div>
                </Card>
            </figure>


            {/* Paragraph 7 - Maintenance */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Maintaining List Quality While Monetizing</h3>
            <p className="mb-6">
                Always disclose sponsored content clearly with labels like "Sponsored" or "Partner Content." Transparency builds trust. Only promote products you've vetted or would personally use or recommend. One bad sponsor recommendation can destroy subscriber trust you spent months building.
            </p>
            <p className="mb-6">
                Limit sponsorships to twenty to thirty percent of your newsletter content. If every issue is mostly ads, people unsubscribe. Your content-to-sponsor ratio should heavily favor content.
            </p>
            <p className="mb-6">
                Survey your audience about what types of products or services they'd find valuable. Sponsor pitches that align with subscriber interests feel helpful rather than intrusive.
            </p>
            <p className="mb-6">
                Track sponsor performance using unique links and discount codes. Share results with sponsors showing open rates, click rates, and conversions. Happy sponsors renew and refer other sponsors.
            </p>

            {/* Paragraph 8 - Real Example */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Real Example: Rahul's ₹14.2 Lakh Newsletter Revenue</h3>
            <p className="mb-6">
                Rahul, thirty-three years old in Hyderabad, started a newsletter called "The Freelance Stack" about building a freelance writing business. He grew it to twelve hundred subscribers in six months through LinkedIn posts and a free "Freelancer Rate Calculator" lead magnet.
            </p>
            <p className="mb-6">
                At twelve hundred subscribers with a thirty-eight percent open rate, he landed his first sponsor, a project management tool, for ₹12,000 for a newsletter section sponsorship. He included sponsor metrics in his follow-up email showing a six percent click rate. The sponsor renewed for three months.
            </p>
            <p className="mb-6">
                By month twelve, his list grew to four thousand two hundred subscribers. He charged ₹28,000 per newsletter sponsorship and maintained two sponsors per month plus one dedicated email quarterly at ₹60,000. Monthly sponsor revenue averaged ₹56,000, totaling ₹6.7 lakh for the year.
            </p>
            <p className="mb-6">
                Year two, he grew to eleven thousand subscribers and raised rates to ₹65,000 per newsletter spot and ₹1.2 lakh per dedicated email. He maintained consistent sponsor demand, averaging ₹1.18 lakh per month in sponsorship revenue for ₹14.2 lakh annually, all while creating valuable free content his audience loved.
            </p>

            {/* Visual 6: Rahul's Growth Chart */}
            <figure className="my-12">
                <div className="flex gap-4 h-56 items-end border-b border-white/20 pb-0 px-4">
                    <div className="w-1/2 group flex flex-col justify-end h-full gap-2">
                        <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity mb-2">
                            <div className="text-white font-bold text-lg">₹6.7 Lakh</div>
                            <div className="text-[10px] text-parchment/40">4.2k Subs</div>
                        </div>
                        <div className="w-full bg-white/10 rounded-t h-[47%] relative border-t border-x border-white/20"></div>
                        <div className="text-center border-t border-white/20 pt-2 text-xs font-bold text-parchment/60 uppercase">Year 1</div>
                    </div>
                    <div className="w-1/2 group flex flex-col justify-end h-full gap-2">
                        <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity mb-2">
                            <div className="text-emerald-400 font-bold text-xl">₹14.2 Lakh</div>
                            <div className="text-[10px] text-parchment/40">11k Subs</div>
                        </div>
                        <div className="w-full bg-emerald-500/20 rounded-t h-full relative border-t border-x border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]"></div>
                        <div className="text-center border-t border-white/20 pt-2 text-xs font-bold text-emerald-400 uppercase">Year 2</div>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 8.3: The Compound Effect. As subscriber count grows, so does your rate card and sponsor demand.
                </figcaption>
            </figure>


            {/* Paragraph 9 - Mistakes */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Common Mistakes</h3>
            <p className="mb-6">
                Mistake number one: trying to monetize too early with low subscriber count or poor engagement. Build to one thousand engaged subscribers first, then monetize. Starting sponsorships at three hundred subscribers with a fifteen percent open rate makes you look desperate and damages your credibility.
            </p>
            <p className="mb-6">
                Mistake number two: accepting any sponsor who offers money. Promoting products your audience doesn't care about or that don't align with your values erodes trust fast. Be selective.
            </p>
            <p className="mb-6">
                Mistake number three: not negotiating rates. If a sponsor offers ₹8,000 for a slot you usually charge ₹25,000 for, counter-offer or decline. Know your worth and stick to rate minimums.
            </p>
            <p className="mb-6">
                Mistake number four: sending too many sponsored emails. One dedicated sponsor email per month maximum. Two to three in-newsletter mentions per month maximum. More than that and you're training subscribers to ignore or unsubscribe from your emails.
            </p>

            {/* Paragraph 10 - Snapshot */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Real Numbers Snapshot</h3>
            <p className="mb-6">
                Months one through six scenario: grow from zero to one thousand five hundred subscribers. No sponsorships yet, focus on content quality and engagement.
            </p>
            <p className="mb-6">
                Months seven through twelve scenario: one thousand five hundred to four thousand subscribers. Two sponsors per month at ₹15,000 each. Revenue: ₹30,000 per month times six months equals ₹1.8 lakh.
            </p>
            <p className="mb-6">
                Year two scenario: four thousand to ten thousand subscribers. Three sponsors per month averaging ₹35,000 each plus one quarterly dedicated email at ₹75,000. Revenue: ₹1.05 lakh per month times twelve plus ₹3 lakh quarterly emails equals ₹15.6 lakh.
            </p>
            <p className="mb-6">
                Year three scenario: ten thousand to twenty thousand subscribers. Four sponsors monthly at ₹60,000 average plus one monthly dedicated email at ₹1.2 lakh. Revenue: ₹2.4 lakh per month plus ₹1.2 lakh equals ₹3.6 lakh per month times twelve equals ₹43.2 lakh annually.
            </p>

            {/* Action Box */}
            <div className="mt-16 bg-gradient-to-r from-emerald-900/40 to-ink-900 border border-emerald-500/50 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Mail className="w-32 h-32 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-ink-black text-sm">🚀</span>
                    ACTION BOX: Build Your Sponsorship Newsletter
                </h3>
                <div className="space-y-6 relative z-10 font-sans">
                    <div>
                        <div className="font-bold text-emerald-400 Uppercase text-sm mb-2">This Month</div>
                        <p className="text-parchment/80 text-sm">Choose niche, create lead magnet, setup platform (Substack/ConvertKit).</p>
                    </div>
                    <div className="w-full h-px bg-white/10"></div>
                    <div>
                        <div className="font-bold text-emerald-400 Uppercase text-sm mb-2">Next 3 Months</div>
                        <p className="text-parchment/80 text-sm">Publish weekly, promote on social, grow to 1,000 subs.</p>
                    </div>

                    <div className="bg-emerald-500/10 rounded-lg p-4 mt-6 border border-emerald-500/30 text-center">
                        <span className="text-emerald-400 font-bold uppercase tracking-widest text-sm">Goal: Hit 1k subs &gt; 35% open rate, then pitch sponsor.</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

// Helper Icon
function ArrowRightIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
    )
}

export default PagesChapterNewsletters;
