import React from 'react';
import {
    Briefcase, PenTool, Mail, Globe,
    TrendingUp, Users, Calendar,
    CheckCircle2, Target, BarChart3, Layers
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PagesChapterBrandContent = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 font-serif text-lg md:text-xl leading-relaxed text-parchment/90">
            {/* Title Section */}
            <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 border-emerald-500/50 text-emerald-400 tracking-[0.2em] font-sans">
                    STREAM 12
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">CONTENT CREATION FOR BRANDS – ₹40,000 TO ₹5 LAKH PER MONTH</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-gold mx-auto rounded-full" />
            </div>

            {/* Paragraph 1 */}
            <p className="mb-6 first-letter:text-5xl first-letter:text-emerald-400 first-letter:font-bold first-letter:mr-2 first-letter:float-left">
                Creating content directly for brands as a retained creator combines writing with strategy, social media, and brand storytelling. You become their in-house voice without being on their payroll, charging premium monthly retainers for consistent content across platforms.
            </p>

            {/* Paragraph 2 - The Market */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">The Brand Content Market</h3>
            <p className="mb-6">
                Small businesses and startups with limited budgets pay ₹40,000 to ₹1.2 lakh per month for basic packages including social media posts, blog articles, and email newsletters. They need regular content but can't afford a full-time content person.
            </p>
            <p className="mb-6">
                Mid-size companies and established brands pay ₹1.2 to 3.5 lakh per month for comprehensive content that spans LinkedIn thought leadership, Instagram and Facebook campaigns, website copy and landing pages, email sequences, and video scripts. They understand content ROI and invest accordingly.
            </p>
            <p className="mb-6">
                Premium brands and enterprise clients pay ₹3.5 to 8 lakh per month for strategic content creation that includes brand storytelling and positioning, campaign concepts and execution, content across all channels, performance tracking and optimization, and collaboration with design and video teams.
            </p>
            <p className="mb-6">
                The key to brand content is understanding you're not just a writer but a brand voice architect who translates business goals into compelling content that drives engagement and conversions.
            </p>

            {/* Visual 1: Market Pyramid */}
            <figure className="my-12">
                <div className="overflow-x-auto pb-4"> {/* Added scroll wrapper */}
                    <div className="flex flex-col items-center gap-2 font-sans min-w-[400px]"> {/* Added min-width */}
                        {/* Tier 1 - Top */}
                        <div className="w-48 bg-emerald-900/60 border border-emerald-500/50 p-4 rounded-t-lg text-center relative z-10">
                            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Premium / Enterprise</div>
                            <div className="text-white font-bold">₹3.5L - 8L / mo</div>
                            <div className="text-[10px] text-parchment/60 mt-1">Full Strategy & Omni-channel</div>
                        </div>
                        {/* Tier 2 - Mid */}
                        <div className="w-72 bg-emerald-900/40 border border-emerald-500/30 p-4 text-center -mt-2 pt-6 relative z-0">
                            <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1">Mid-Size Brands</div>
                            <div className="text-white font-bold">₹1.2L - 3.5L / mo</div>
                            <div className="text-[10px] text-parchment/60 mt-1">Comprehensive Campaigns</div>
                        </div>
                        {/* Tier 3 - Base */}
                        <div className="w-96 bg-emerald-900/20 border border-emerald-500/20 p-4 rounded-b-lg text-center -mt-2 pt-6 relative -z-10">
                            <div className="text-xs font-bold text-emerald-200 uppercase tracking-wider mb-1">Small Business / Startup</div>
                            <div className="text-white font-bold">₹40k - 1.2L / mo</div>
                            <div className="text-[10px] text-parchment/60 mt-1">Basic Social & Blog Pkg</div>
                        </div>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 12.1: The Content Budget Pyramid. Move upmarket by selling strategy, not just words.
                </figcaption>
            </figure>


            {/* Paragraph 3 - Project Types */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Types of Brand Content Projects</h3>
            <p className="mb-6">
                Social media management involves creating daily or weekly posts for Instagram, LinkedIn, Facebook, and Twitter. You write captions, develop content themes, plan monthly calendars, and engage with comments and messages. Monthly retainer: ₹35,000 to ₹1.5 lakh depending on volume and platforms.
            </p>
            <p className="mb-6">
                Blog and SEO content creation delivers two to eight optimized articles per month targeting specific keywords and customer journey stages. You handle research, writing, meta descriptions, and basic SEO optimization. Monthly retainer: ₹50,000 to ₹2 lakh based on article count and depth.
            </p>
            <p className="mb-6">
                Email marketing and automation includes weekly newsletters, promotional campaigns, automated sequences for onboarding or nurture, and seasonal campaigns. Monthly retainer: ₹40,000 to ₹1.2 lakh depending on complexity and list size.
            </p>
            <p className="mb-6">
                Website copy and landing pages involves writing or rewriting homepage, about page, service pages, product descriptions, and conversion-focused landing pages for campaigns. Project-based: ₹60,000 to ₹4 lakh for complete website rewrites.
            </p>
            <p className="mb-6">
                Brand storytelling and thought leadership creates long-form articles for company blogs or LinkedIn, case studies showcasing customer success, white papers and industry reports, and founder or executive ghostwriting. Monthly retainer: ₹80,000 to ₹3 lakh for premium positioning work.
            </p>

            {/* Visual 2: Service Cards */}
            <figure className="my-12 grid gap-4 sm:grid-cols-2 text-sm">
                <div className="bg-ink-900 border border-white/10 p-4 rounded-lg flex gap-3">
                    <Users className="w-8 h-8 text-blue-400 shrink-0" />
                    <div>
                        <h4 className="font-bold text-white">Social Media</h4>
                        <p className="text-parchment/60 text-xs mt-1">Captions, Calendars, Engagement</p>
                        <div className="text-emerald-400 font-bold text-xs mt-2">₹35k - 1.5L / mo</div>
                    </div>
                </div>
                <div className="bg-ink-900 border border-white/10 p-4 rounded-lg flex gap-3">
                    <Globe className="w-8 h-8 text-amber-400 shrink-0" />
                    <div>
                        <h4 className="font-bold text-white">SEO & Blog</h4>
                        <p className="text-parchment/60 text-xs mt-1">Optimized Articles, Research</p>
                        <div className="text-emerald-400 font-bold text-xs mt-2">₹50k - 2L / mo</div>
                    </div>
                </div>
                <div className="bg-ink-900 border border-white/10 p-4 rounded-lg flex gap-3">
                    <Mail className="w-8 h-8 text-purple-400 shrink-0" />
                    <div>
                        <h4 className="font-bold text-white">Email Marketing</h4>
                        <p className="text-parchment/60 text-xs mt-1">Newsletters, Automations</p>
                        <div className="text-emerald-400 font-bold text-xs mt-2">₹40k - 1.2L / mo</div>
                    </div>
                </div>
                <div className="bg-ink-900 border border-white/10 p-4 rounded-lg flex gap-3">
                    <PenTool className="w-8 h-8 text-rose-400 shrink-0" />
                    <div>
                        <h4 className="font-bold text-white">Thought Leadership</h4>
                        <p className="text-parchment/60 text-xs mt-1">Ghostwriting, White Papers</p>
                        <div className="text-emerald-400 font-bold text-xs mt-2">₹80k - 3L / mo</div>
                    </div>
                </div>
                <figcaption className="col-span-2 text-center text-sm text-parchment/50 mt-2 font-sans italic">
                    Figure 12.2: The Retainer Menu. Combine these services for high-value packages.
                </figcaption>
            </figure>


            {/* Paragraph 4 - The System */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">The System to Land Brand Content Retainers</h3>
            <p className="mb-6">
                Step one is to choose industries where you have credibility or interest. Don't pitch random brands. Focus on two to three industries where you understand the customer, the pain points, the language, and the competitive landscape. This specialization makes your pitches stronger and your content better.
            </p>
            <p className="mb-6">
                Step two involves building case studies even without paid clients. Create sample campaigns for real brands as spec work. Write a LinkedIn post series for a SaaS company showing how you'd position their product. Draft three Instagram captions for a D2C skincare brand. Design a monthly content calendar for a fitness coach. Put these samples in a portfolio showing what you can deliver.
            </p>
            <p className="mb-6">
                Step three is targeting the right decision-makers. For small businesses, pitch directly to founders. For mid-size companies, connect with marketing managers or heads of content. For agencies, reach out to account directors who manage multiple clients. Send personalized messages showing you understand their brand and have ideas for improving their content.
            </p>
            <p className="mb-6">
                Step four uses this outreach template. Subject line: "Content strategy for your Brand Name." Body: "Hi Name, I've been following Brand Name and noticed your recent campaign theme. I work with industry type companies to create content that target customer action like drive qualified leads or build thought leadership. I had a few ideas for your LinkedIn presence or Instagram strategy that might interest you. Would you be open to a fifteen-minute call to discuss?" Attach your portfolio or a one-page case study.
            </p>
            <p className="mb-6">
                Step five involves the retainer proposal structure. After a discovery call, send a proposal outlining their current content challenges, your recommended content strategy, monthly deliverables broken down by platform and quantity, timeline and workflow for approvals and publishing, investment options with three tiers from basic to premium, and success metrics you'll track. Price based on value delivered, not hours worked.
            </p>

            {/* Visual 3: Outreach Pipeline */}
            <figure className="my-12">
                <div className="relative font-sans text-sm">
                    <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-emerald-500/20"></div>
                    <div className="space-y-6">
                        {[
                            { step: "1. Niche Down", detail: "Pick 2-3 industries (e.g. Fintech, D2C)." },
                            { step: "2. Build Proof", detail: "Create Spec Work if you have no clients." },
                            { step: "3. Identify Targets", detail: "Founders (Small Biz) vs Marketing Mgrs (Mid)." },
                            { step: "4. Cold Pitch", detail: "Personalized value-first email." },
                            { step: "5. Close Retainer", detail: "Proposal with 3 pricing tiers." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 items-start relative">
                                <div className="w-12 h-12 rounded-full bg-emerald-900 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold shrink-0 z-10">
                                    {i + 1}
                                </div>
                                <div className="bg-white/5 border border-white/10 p-3 rounded flex-1">
                                    <h4 className="font-bold text-white">{item.step}</h4>
                                    <p className="text-parchment/60 text-xs">{item.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 12.3: The Client Acquisition Engine. A linear path from zero to booked.
                </figcaption>
            </figure>


            {/* Paragraph 5 - Pricing */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Pricing Your Brand Content Services</h3>
            <p className="mb-6">
                Use tiered packaging to give clients choice. The starter package might include eight social posts per week, two blog articles per month, and one email newsletter for ₹60,000 monthly. The growth package adds daily social posts, four blog articles, two email campaigns, and monthly analytics reports for ₹1.4 lakh monthly. The premium package provides comprehensive content across all channels, strategy calls, campaign planning, and dedicated support for ₹2.8 lakh monthly.
            </p>
            <p className="mb-6">
                Calculate your pricing based on deliverable value and your opportunity cost. If a monthly blog article drives five new leads worth ₹50,000 each to the client, your ₹30,000 fee for writing it is a bargain. If you can earn ₹1.5 lakh per month from other work, your retainer rate needs to exceed that to make sense.
            </p>
            <p className="mb-6">
                Build annual contracts with quarterly reviews to create stability and predictability. Offer a ten to fifteen percent discount for annual prepayment or commitment. This locks in recurring revenue and reduces client churn.
            </p>

            {/* Paragraph 6 - Managing Multiple Clients */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Managing Multiple Brand Retainers</h3>
            <p className="mb-6">
                Batch similar tasks across clients to maximize efficiency. Write all social media content for all clients on Mondays and Tuesdays. Handle all blog articles on Wednesdays and Thursdays. Reserve Fridays for strategy calls and planning. This batching prevents constant context switching and doubles your effective output.
            </p>
            <p className="mb-6">
                Create templates and frameworks you can customize per client. Your Instagram caption template, blog article structure, email sequence framework, and content calendar format should be reusable with client-specific customization. This cuts creation time by forty to sixty percent.
            </p>
            <p className="mb-6">
                Use tools to scale your operation without hiring. Notion or Airtable for content calendars and client management, Grammarly for editing and consistency, Canva for basic graphics when needed, Buffer or Later for social scheduling, and Google Drive for organized client folders and shared documents.
            </p>
            <p className="mb-6">
                Consider hiring a junior writer or virtual assistant at ₹20,000 to ₹35,000 per month once you cross ₹2 lakh monthly revenue. They can handle research, first drafts, and basic social posts while you focus on strategy, editing, and client relationships.
            </p>

            {/* Visual 4: Batching Schedule */}
            <figure className="my-12">
                <div className="bg-ink-900 border border-white/10 rounded-lg overflow-hidden font-sans text-sm">
                    <div className="overflow-x-auto pb-2"> {/* Added scroll wrapper */}
                        <div className="min-w-[600px]"> {/* Ensure min-width */}
                            <div className="grid grid-cols-5 divide-x divide-white/10 bg-white/5 border-b border-white/10 font-bold text-white text-center py-2">
                                <div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div>
                            </div>
                            <div className="grid grid-cols-5 divide-x divide-white/10 h-32">
                                <div className="p-2 bg-blue-500/10 flex flex-col justify-center text-center"><span className="font-bold text-blue-300">Social Media</span><span className="text-xs text-blue-200/50">All Clients</span></div>
                                <div className="p-2 bg-blue-500/10 flex flex-col justify-center text-center"><span className="font-bold text-blue-300">Social Media</span><span className="text-xs text-blue-200/50">All Clients</span></div>
                                <div className="p-2 bg-amber-500/10 flex flex-col justify-center text-center"><span className="font-bold text-amber-300">Blogs / SEO</span><span className="text-xs text-amber-200/50">Deep Work</span></div>
                                <div className="p-2 bg-amber-500/10 flex flex-col justify-center text-center"><span className="font-bold text-amber-300">Blogs / SEO</span><span className="text-xs text-amber-200/50">Deep Work</span></div>
                                <div className="p-2 bg-purple-500/10 flex flex-col justify-center text-center"><span className="font-bold text-purple-300">Strategy</span><span className="text-xs text-purple-200/50">Calls & Planning</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 12.4: The Batching Protocol. Grouping tasks prevents mental fatigue and context switching.
                </figcaption>
            </figure>


            {/* Paragraph 7 - Real Example */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Real Example: Nisha's ₹4.3 Lakh Monthly Brand Content Business</h3>
            <p className="mb-6">
                Nisha, thirty-three years old in Bangalore, started with one small e-commerce client at ₹45,000 per month creating social content and blog posts. She delivered excellent results, documented the engagement growth and sales impact, and used that case study to pitch similar brands.
            </p>
            <p className="mb-6">
                Within six months, she had four retainer clients paying ₹45,000 to ₹85,000 monthly. Her specialized knowledge of e-commerce and D2C brands made her content more effective than generalist writers. Total monthly revenue: ₹2.4 lakh.
            </p>
            <p className="mb-6">
                By month twelve, she raised existing client fees to ₹60,000 to ₹1.1 lakh based on proven results. She added two premium clients at ₹1.3 lakh and ₹1.5 lakh monthly. She hired a part-time writer at ₹25,000 monthly to handle routine tasks. Her net monthly income after the assistant: ₹4.3 lakh working thirty hours per week.
            </p>

            {/* Visual 5: Growth Graph */}
            <figure className="my-12">
                <div className="bg-ink-900 border border-white/10 p-6 rounded-xl">
                    <h4 className="text-center font-bold text-white mb-6 uppercase tracking-widest text-sm">Nisha's Monthly Revenue Growth</h4>
                    <div className="flex items-end gap-2 h-48 border-b border-white/10 pb-2">
                        <div className="flex-1 flex flex-col justify-end items-center gap-2 group">
                            <div className="text-xs font-bold text-white mb-1 group-hover:scale-110 transition-transform">₹45k</div>
                            <div className="w-full bg-blue-500/50 hover:bg-blue-400 rounded-t h-[10%] transition-colors"></div>
                            <div className="text-[10px] text-parchment/60">Month 1</div>
                        </div>
                        <div className="flex-1 flex flex-col justify-end items-center gap-2 group">
                            <div className="text-xs font-bold text-white mb-1 group-hover:scale-110 transition-transform">₹2.4L</div>
                            <div className="w-full bg-blue-500/50 hover:bg-blue-400 rounded-t h-[55%] transition-colors"></div>
                            <div className="text-[10px] text-parchment/60">Month 6</div>
                        </div>
                        <div className="flex-1 flex flex-col justify-end items-center gap-2 group">
                            <div className="text-xs font-bold text-emerald-400 mb-1 group-hover:scale-110 transition-transform">₹4.3L</div>
                            <div className="w-full bg-emerald-500 hover:bg-emerald-400 rounded-t h-[95%] shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-colors"></div>
                            <div className="text-[10px] text-parchment/60 text-emerald-400 font-bold">Month 12</div>
                        </div>
                    </div>
                </div>
            </figure>


            {/* Paragraph 8 - Mistakes */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Common Mistakes</h3>
            <p className="mb-6">
                Mistake number one is accepting every client regardless of fit. Bad-fit clients who don't value content or constantly micromanage will drain your energy and time without appropriate compensation. Be selective and qualify clients carefully.
            </p>
            <p className="mb-6">
                Mistake number two involves underpricing to win business. If you charge ₹30,000 monthly but deliver content worth ₹1.5 lakh to the client's business, you're leaving money on the table and attracting price-conscious clients instead of value-conscious ones.
            </p>
            <p className="mb-6">
                Mistake number three is not documenting results and impact. Track metrics like engagement rates, website traffic from your content, leads generated, and sales influenced. These numbers justify rate increases and make renewals automatic.
            </p>
            <p className="mb-6">
                Mistake number four involves doing work outside agreed scope without charging extra. When clients ask for "just one more post" or "a quick email," politely explain it's outside scope and offer to add it as paid work or roll it into next month's deliverables. Otherwise you're working for free.
            </p>

            {/* Paragraph 9 - Snapshot */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Real Numbers Snapshot</h3>
            <p className="mb-6">
                Months one through three: land your first client at ₹50,000 to ₹70,000 monthly. Revenue: ₹50,000 to ₹70,000 per month.
            </p>
            <p className="mb-6">
                Months four through nine: add two more clients at similar rates. Revenue: ₹1.5 to 2.1 lakh monthly.
            </p>
            <p className="mb-6">
                Months ten through twelve: add fourth client, raise rates on original client based on results. Revenue: ₹2.2 to 2.8 lakh monthly.
            </p>
            <p className="mb-6">
                Year two: five to six clients with rates from ₹60,000 to ₹1.5 lakh. Hire assistant for ₹25,000 monthly. Net revenue: ₹3.5 to 5 lakh monthly.
            </p>

            {/* Action Box */}
            <div className="mt-16 bg-gradient-to-r from-emerald-900/40 to-ink-900 border border-emerald-500/50 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Layers className="w-32 h-32 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-ink-black text-sm">🚀</span>
                    ACTION BOX: Launch Your Brand Content Service
                </h3>
                <div className="grid md:grid-cols-2 gap-8 relative z-10 font-sans">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span className="font-bold text-white uppercase text-sm">This Week</span>
                        </div>
                        <p className="text-parchment/80 text-sm pl-6 mb-4">Pick 2 target industries. Create 3 spec pieces (e.g. LinkedIn posts, IG captions).</p>

                        <div className="flex items-center gap-2 mb-3">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span className="font-bold text-white uppercase text-sm">Next Week</span>
                        </div>
                        <p className="text-parchment/80 text-sm pl-6">Build portfolio. Identify 15 targets. Send 10 pitches.</p>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="bg-emerald-500/10 rounded-lg p-6 border border-emerald-500/30 text-center">
                            <div className="text-xs uppercase tracking-widest text-emerald-400 mb-2">60-Day Goal</div>
                            <div className="text-3xl font-bold text-white mb-1">1st Retainer</div>
                            <div className="text-[10px] text-parchment/60">₹50k - 1L / Month</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PagesChapterBrandContent;
