import React from 'react';
import {
    Users, ShieldCheck, Zap, Heart,
    BarChart3, Rocket, MessageCircle,
    CreditCard, Lock, Infinity as InfinityIcon
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PagesChapterMembership = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 font-serif text-lg md:text-xl leading-relaxed text-parchment/90">
            {/* Title Section */}
            <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 border-emerald-500/50 text-emerald-400 tracking-[0.2em] font-sans">
                    STREAM 13
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">MEMBERSHIP COMMUNITIES – ₹2 TO 30 LAKH PER YEAR</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-gold mx-auto rounded-full" />
            </div>

            {/* Paragraph 1 */}
            <p className="mb-6 first-letter:text-5xl first-letter:text-emerald-400 first-letter:font-bold first-letter:mr-2 first-letter:float-left">
                Membership communities turn your expertise and audience into recurring monthly revenue. You create a space where writers, authors, or content creators pay to access your knowledge, get feedback, and connect with peers. It's scalable because adding members doesn't increase your workload proportionally.
            </p>

            {/* Paragraph 2 - Economics */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">The Membership Economics</h3>
            <p className="mb-6">
                Small communities of fifty to one hundred fifty members charging ₹500 to ₹1,500 per month generate ₹25,000 to ₹2.25 lakh monthly or ₹3 to 27 lakh annually. The lower price point makes it accessible while the volume creates meaningful revenue.
            </p>
            <p className="mb-6">
                Mid-size communities of one hundred fifty to five hundred members at ₹1,000 to ₹2,500 monthly generate ₹1.5 to 12.5 lakh per month or ₹18 lakh to ₹1.5 crore annually. This is the sweet spot where community management remains feasible without a large team.
            </p>
            <p className="mb-6">
                Premium communities of thirty to one hundred members charging ₹3,000 to ₹8,000 monthly generate ₹90,000 to ₹8 lakh per month or ₹10.8 to 96 lakh annually. The higher price attracts serious, committed members and allows for more personalized attention and premium perks.
            </p>
            <p className="mb-6">
                The key to membership success is delivering ongoing value that justifies the recurring payment. One-time content isn't enough. Members need fresh resources, regular interaction, and tangible progress toward their goals.
            </p>

            {/* Visual 1: Revenue Matrix */}
            <figure className="my-12">
                <div className="bg-ink-900 border border-white/10 rounded-xl overflow-hidden font-sans">
                    <div className="overflow-x-auto pb-2"> {/* Added overflow wrapper */}
                        <div className="min-w-[500px]"> {/* Ensure min-width to force scroll on small screens */}
                            <div className="grid grid-cols-4 bg-white/5 border-b border-white/10 p-3 text-xs font-bold text-parchment/60 uppercase tracking-wider text-center">
                                <div className="text-left pl-2">Type</div>
                                <div>Members</div>
                                <div>Price (Mo)</div>
                                <div className="text-emerald-400">Potential (Yr)</div>
                            </div>
                            <div className="divide-y divide-white/5 text-sm">
                                <div className="grid grid-cols-4 p-4 items-center text-center hover:bg-white/5 transition-colors">
                                    <div className="text-left pl-2 font-bold text-white">Small</div>
                                    <div className="text-parchment/80">50 - 150</div>
                                    <div>₹500 - 1.5k</div>
                                    <div className="font-bold text-emerald-400">₹3L - 27L</div>
                                </div>
                                <div className="grid grid-cols-4 p-4 items-center text-center hover:bg-white/5 transition-colors bg-emerald-900/10">
                                    <div className="text-left pl-2 font-bold text-white">Mid-Size</div>
                                    <div className="text-parchment/80">150 - 500</div>
                                    <div>₹1k - 2.5k</div>
                                    <div className="font-bold text-emerald-400">₹18L - 1.5Cr</div>
                                </div>
                                <div className="grid grid-cols-4 p-4 items-center text-center hover:bg-white/5 transition-colors">
                                    <div className="text-left pl-2 font-bold text-white">Premium</div>
                                    <div className="text-parchment/80">30 - 100</div>
                                    <div>₹3k - 8k</div>
                                    <div className="font-bold text-emerald-400">₹10L - 96L</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 13.1: The Recurring Math. Even small communities can generate full-time incomes.
                </figcaption>
            </figure>


            {/* Paragraph 3 - Retention */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">What Makes Members Stay and Pay</h3>
            <p className="mb-6">
                Expert access and guidance means monthly live teaching sessions, regular office hours for questions and feedback, manuscript or work reviews, and direct access to you via community chat or forum. Members pay for shortcuts to solutions you've already figured out.
            </p>
            <p className="mb-6">
                Peer community and accountability provides a space to connect with other writers at similar stages, accountability partnerships and writing sprints, feedback and critique from peers who understand the craft, and celebration of wins and support through challenges. Community value often exceeds the content value.
            </p>
            <p className="mb-6">
                Resources and tools include templates and frameworks for outlines, pitches, marketing, course curriculum, recording archives of all past sessions, tools and software recommendations with discounts, and downloadable worksheets and guides. These resources compound over time, increasing member value.
            </p>
            <p className="mb-6">
                Opportunities and connections mean job boards or client leads shared in the community, collaboration opportunities between members, guest expert sessions with agents, editors, or successful authors, and exclusive access to beta test your new products or services.
            </p>
            <p className="mb-6">
                Progress and results tracking helps members see their growth through milestone celebrations, success story features, skill development pathways, and monthly challenges or sprints that create forward momentum.
            </p>

            {/* Visual 2: The Stickiness Triad */}
            <figure className="my-12">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-center font-sans">
                    <Card className="flex-1 p-6 bg-gradient-to-br from-indigo-950/40 to-ink-900 border border-indigo-500/20 text-center hover:-translate-y-1 transition-transform cursor-default">
                        <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto mb-4 text-indigo-400"><Zap className="w-6 h-6" /></div>
                        <h4 className="font-bold text-white mb-2">Expert Access</h4>
                        <p className="text-xs text-parchment/60">"I stay for the answers."</p>
                    </Card>
                    <div className="text-2xl text-parchment/20">+</div>
                    <Card className="flex-1 p-6 bg-gradient-to-br from-purple-950/40 to-ink-900 border border-purple-500/20 text-center hover:-translate-y-1 transition-transform cursor-default">
                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4 text-purple-400"><Users className="w-6 h-6" /></div>
                        <h4 className="font-bold text-white mb-2">Community</h4>
                        <p className="text-xs text-parchment/60">"I stay for the friends."</p>
                    </Card>
                    <div className="text-2xl text-parchment/20">+</div>
                    <Card className="flex-1 p-6 bg-gradient-to-br from-emerald-950/40 to-ink-900 border border-emerald-500/20 text-center hover:-translate-y-1 transition-transform cursor-default">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4 text-emerald-400"><BarChart3 className="w-6 h-6" /></div>
                        <h4 className="font-bold text-white mb-2">Results</h4>
                        <p className="text-xs text-parchment/60">"I stay for the growth."</p>
                    </Card>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 13.2: The Retention Triad. Balance these three to minimize churn.
                </figcaption>
            </figure>


            {/* Paragraph 4 - Building */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Building Your Membership Community</h3>
            <p className="mb-6">
                Step one is validating demand before building. Survey your email list or social audience asking if they'd join a paid community for writers and what they'd want included. Gauge price sensitivity by offering three tiers and seeing which gets most interest. Aim for thirty to fifty people expressing serious interest before launching.
            </p>
            <p className="mb-6">
                Step two involves choosing your platform. Circle, Mighty Networks, and Kajabi work well for all-in-one community platforms with built-in payments, content hosting, and forums. Monthly fees run ₹2,000 to ₹10,000 depending on features and member count. Discord or Slack are free platforms but require separate payment processors like Gumroad or Memberful. Facebook Groups are familiar to users but harder to monetize and you don't own the platform.
            </p>
            <p className="mb-6">
                Step three is structuring your membership tiers. The basic tier at ₹500 to ₹1,000 monthly might include community access, monthly group calls, and resource library. The premium tier at ₹1,500 to ₹3,000 monthly adds weekly office hours, manuscript feedback queue, and exclusive workshops. The VIP tier at ₹4,000 to ₹8,000 monthly includes everything plus one-on-one monthly calls and priority access to all new resources.
            </p>
            <p className="mb-6">
                Step four uses a founding member launch strategy. Offer the first fifty members a special founding rate locked in for life, like ₹750 monthly when the regular price will be ₹1,500. This rewards early believers and creates urgency to join now. Founding members also often become your biggest advocates and help recruit future members.
            </p>
            <p className="mb-6">
                Step five focuses on delivering consistent value. Host weekly or bi-weekly live sessions on a set schedule. Share monthly resources or challenges. Facilitate member connections through introductions and collaboration threads. Celebrate member wins publicly. Stay active in discussions daily or hire a community manager to maintain engagement.
            </p>

            {/* Visual 3: Launch Timeline */}
            <figure className="my-12">
                <div className="relative font-sans border-l-2 border-white/10 ml-6 space-y-8 py-2">
                    <div className="relative pl-8">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-ink-900 border-2 border-parchment/40"></div>
                        <h4 className="font-bold text-white text-sm">Validation Phase</h4>
                        <p className="text-xs text-parchment/60 mt-1">Survey audience. Goal: 30-50 'Yes'.</p>
                    </div>
                    <div className="relative pl-8">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-ink-900 border-2 border-parchment/40"></div>
                        <h4 className="font-bold text-white text-sm">Tech Setup</h4>
                        <p className="text-xs text-parchment/60 mt-1">Pick Platform (Circle/Discord). Set Pricing.</p>
                    </div>
                    <div className="relative pl-8">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                        <h4 className="font-bold text-emerald-400 text-sm">Founding Launch</h4>
                        <p className="text-xs text-parchment/60 mt-1">Lifetime discount for first 50 members.</p>
                    </div>
                    <div className="relative pl-8">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-ink-900 border-2 border-parchment/40"></div>
                        <h4 className="font-bold text-white text-sm">Public Launch</h4>
                        <p className="text-xs text-parchment/60 mt-1">Full pricing. Regular enrollment.</p>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 13.3: The Launch Runway. Don't build in secret; validate then create.
                </figcaption>
            </figure>


            {/* Paragraph 5 - Pricing/Retention */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Pricing and Retention Strategy</h3>
            <p className="mb-6">
                Annual payment options offer ten to twenty percent discounts for paying yearly upfront instead of monthly. This improves cash flow and increases retention since people who prepay are less likely to cancel mid-year. A ₹1,500 monthly membership becomes ₹15,000 annually instead of ₹18,000, saving members ₹3,000 while giving you predictable revenue.
            </p>
            <p className="mb-6">
                Pause options instead of cancellation reduce churn. Allow members to pause for one to three months during busy periods rather than canceling completely. Many will return after the pause rather than churning permanently.
            </p>
            <p className="mb-6">
                Upgrade paths encourage members to move from basic to premium tiers as their needs grow. Someone joining at ₹750 monthly might upgrade to ₹2,500 monthly after six months when they need more personalized support.
            </p>
            <p className="mb-6">
                Exit surveys help you understand why people leave. Ask departing members what would have kept them engaged. Use this feedback to improve offerings and reduce future churn. Churn should be under five to ten percent monthly for a healthy community.
            </p>

            {/* Paragraph 6 - Real Example */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Real Example: Vikram's ₹14.6 Lakh Community</h3>
            <p className="mb-6">
                Vikram, thirty-seven years old in Mumbai, built an audience of three thousand newsletter subscribers interested in storytelling for business. He launched a membership community called "Story Architects" at ₹1,200 monthly with a founding rate of ₹750 for the first one hundred members.
            </p>
            <p className="mb-6">
                He attracted sixty-three founding members in the first month for ₹47,250 monthly revenue. He hosted weekly live workshops on storytelling frameworks, monthly manuscript reviews, and daily community engagement. Member testimonials praised the accountability and peer feedback as the most valuable elements.
            </p>
            <p className="mb-6">
                By month six, he had one hundred eight members with a mix of founding rate and full price members averaging ₹950 per member. Monthly revenue: ₹1.03 lakh or ₹12.4 lakh annually. By month twelve, membership grew to one hundred thirty-two members averaging ₹1,100 each for ₹1.45 lakh monthly or ₹17.4 lakh annually.
            </p>
            <p className="mb-6">
                He spent approximately twelve to fifteen hours per week on community management, content creation, and live sessions. With ₹17.4 lakh annual revenue and minimal expenses beyond the platform fee of ₹80,000 annually, his net income was ₹16.6 lakh for part-time work.
            </p>

            {/* Visual 4: Vikram's Growth Chart */}
            <figure className="my-12">
                <div className="bg-ink-900 border border-white/10 p-6 rounded-xl">
                    <h4 className="text-center font-bold text-white mb-6 uppercase tracking-widest text-sm">Vikram's 'Story Architects' Growth</h4>
                    <div className="flex items-end gap-4 h-48 border-b border-white/10 pb-2 font-sans px-4">
                        <div className="flex-1 flex flex-col justify-end items-center gap-2 group">
                            <div className="text-xs font-bold text-white mb-1">₹47k</div>
                            <div className="w-full bg-blue-500/50 rounded-t h-[30%]"></div>
                            <div className="text-[10px] text-parchment/60">Month 1</div>
                        </div>
                        <div className="flex-1 flex flex-col justify-end items-center gap-2 group">
                            <div className="text-xs font-bold text-white mb-1">₹1.03L</div>
                            <div className="w-full bg-blue-500/50 rounded-t h-[65%]"></div>
                            <div className="text-[10px] text-parchment/60">Month 6</div>
                        </div>
                        <div className="flex-1 flex flex-col justify-end items-center gap-2 group">
                            <div className="text-xs font-bold text-emerald-400 mb-1">₹1.45L</div>
                            <div className="w-full bg-emerald-500 rounded-t h-[90%] shadow-[0_0_20px_rgba(16,185,129,0.3)]"></div>
                            <div className="text-[10px] text-emerald-400 font-bold">Month 12</div>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-between px-4 text-xs text-parchment/50 font-sans italic">
                        <span>63 Members</span>
                        <span>132 Members</span>
                    </div>
                </div>
            </figure>


            {/* Paragraph 7 - Mistakes */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Common Mistakes</h3>
            <p className="mb-6">
                Mistake number one is launching without enough content or structure. Members who join and find an empty community with no clear value leave immediately and leave bad reviews. Pre-create at least four weeks of content and resources before opening doors.
            </p>
            <p className="mb-6">
                Mistake number two involves pricing too low out of fear nobody will pay. A ₹300 monthly membership attracts people who aren't serious and creates unsustainable revenue. You need three hundred members at ₹300 to earn ₹90,000 monthly, but only thirty members at ₹3,000.
            </p>
            <p className="mb-6">
                Mistake number three is inconsistent engagement and showing up. If you host promised weekly calls sporadically or go silent in the community for weeks, members feel abandoned and cancel. Consistency is more important than perfection.
            </p>
            <p className="mb-6">
                Mistake number four is trying to serve everyone instead of a specific niche. A community for "all writers" lacks focus and attracts people with wildly different needs. A community for "freelance writers building six-figure businesses" or "romance authors self-publishing series" creates alignment and better peer support.
            </p>

            {/* Paragraph 8 - Snapshot */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Real Numbers Snapshot</h3>
            <p className="mb-6">
                Months one through three: launch with thirty to fifty founding members at ₹750 to ₹1,200 monthly. Revenue: ₹22,500 to ₹60,000 per month.
            </p>
            <p className="mb-6">
                Months four through twelve: grow to eighty to one hundred twenty members at ₹950 to ₹1,300 average. Revenue: ₹76,000 to ₹1.56 lakh monthly or ₹9.1 to 18.7 lakh annually.
            </p>
            <p className="mb-6">
                Year two: one hundred twenty to two hundred members at ₹1,100 to ₹1,500 average as you phase out founding rates. Revenue: ₹1.32 to 3 lakh monthly or ₹15.8 to 36 lakh annually.
            </p>

            {/* Action Box */}
            <div className="mt-16 bg-gradient-to-r from-emerald-900/40 to-ink-900 border border-emerald-500/50 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <InfinityIcon className="w-32 h-32 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-ink-black text-sm">🚀</span>
                    ACTION BOX: Launch Your Membership
                </h3>
                <div className="grid md:grid-cols-2 gap-8 relative z-10 font-sans">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            <span className="font-bold text-white uppercase text-sm">This Week</span>
                        </div>
                        <p className="text-parchment/80 text-sm pl-6 mb-4">Survey audience for interest & pricing. Choose platform (Circle/Mighty).</p>

                        <div className="flex items-center gap-2 mb-3">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            <span className="font-bold text-white uppercase text-sm">Next 2 Weeks</span>
                        </div>
                        <p className="text-parchment/80 text-sm pl-6">Pre-create 4 weeks of content. Set up payments.</p>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="bg-emerald-500/10 rounded-lg p-6 border border-emerald-500/30 text-center">
                            <div className="text-xs uppercase tracking-widest text-emerald-400 mb-2">Launch Goal</div>
                            <div className="text-3xl font-bold text-white mb-1">50 Founders</div>
                            <div className="text-[10px] text-parchment/60">Recurring Monthly Revenue</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PagesChapterMembership;
