import React from 'react';
import {
    BrainCircuit, Target, BarChart2, Briefcase,
    Search, Calendar, Settings, TrendingUp,
    CheckCircle2, ArrowRight
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PagesChapterConsulting = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 font-serif text-lg md:text-xl leading-relaxed text-parchment/90">
            {/* Title Section */}
            <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 border-emerald-500/50 text-emerald-400 tracking-[0.2em] font-sans">
                    STREAM 6
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">CONTENT STRATEGY CONSULTING – ₹75,000 TO ₹8 LAKH PER PROJECT</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-gold mx-auto rounded-full" />
            </div>

            {/* Paragraph 1 */}
            <p className="mb-6 first-letter:text-5xl first-letter:text-emerald-400 first-letter:font-bold first-letter:mr-2 first-letter:float-left">
                Content strategy consulting is where writers charge executive-level fees without doing the actual writing. You're paid to think, plan, and guide a company's entire content ecosystem. It's the difference between being a chef and being a restaurant consultant who designs the menu.
            </p>

            {/* Visual 1: The Strategist Multiplier */}
            <figure className="my-12">
                <div className="bg-gradient-to-br from-ink-900 to-black border border-white/10 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left space-y-2 opacity-50 grayscale filter">
                        <div className="text-xs uppercase font-sans tracking-widest text-parchment/60">Execution (Chef)</div>
                        <div className="text-2xl font-bold text-white">₹1 Lakh/mo</div>
                        <div className="text-[10px] text-parchment/40">40+ Hours/Week</div>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="h-px w-16 bg-white/20 my-2"></div>
                        <div className="text-xs font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded">5X Leverage</div>
                        <div className="h-px w-16 bg-white/20 my-2"></div>
                    </div>

                    <div className="text-center md:text-right space-y-2 relative">
                        <div className="absolute -top-6 right-0 md:right-0 left-0 md:left-auto bg-gold text-ink-black px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(255,215,0,0.4)] w-fit mx-auto md:mx-0">High Elevation</div>
                        <div className="text-xs uppercase font-sans tracking-widest text-gold/80">Strategy (Consultant)</div>
                        <div className="text-4xl font-bold text-white">₹5 Lakh/project</div>
                        <div className="text-[10px] text-gold/60">20 Hours Total</div>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 6.1: The Elevation Effect. Moving from 'doing' to 'directing' multiplies your effective hourly rate.
                </figcaption>
            </figure>

            {/* Paragraph 2 - Definition */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">What Content Strategy Actually Means</h3>
            <p className="mb-6">
                Content strategy encompasses audit and analysis of existing content, content calendar planning for six to twelve months, tone and voice guidelines documentation, SEO keyword strategy and topic clusters, content distribution and promotion plans, team workflows and approval processes, measurement frameworks and KPI definition.
            </p>

            {/* Visual 2: The Strategy Stack */}
            <figure className="my-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                        { label: 'Audit & Analysis', icon: Search },
                        { label: '12-Mo Calendar', icon: Calendar },
                        { label: 'SEO & Keywords', icon: Target },
                        { label: 'Team Workflows', icon: Settings },
                        { label: 'Distribution', icon: Briefcase },
                        { label: 'KPI Frameworks', icon: BarChart2 },
                        { label: 'Voice Guidelines', icon: BrainCircuit },
                        { label: 'Approval Process', icon: CheckCircle2 }
                    ].map((item, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 p-3 rounded flex flex-col items-center gap-2 text-center hover:bg-emerald-900/20 hover:border-emerald-500/30 transition-colors group">
                            <item.icon className="w-5 h-5 text-parchment/60 group-hover:text-emerald-400" />
                            <span className="text-xs font-bold text-parchment/80 group-hover:text-white leading-tight">{item.label}</span>
                        </div>
                    ))}
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 6.2: The Deliverables Deck. Clients pay for this comprehensive ecosystem, not just articles.
                </figcaption>
            </figure>

            {/* Paragraph 3 */}
            <p className="mb-6">
                Companies pay premium rates for this because bad content wastes hundreds of hours and lakhs of rupees. A solid strategy upfront ensures every piece of content serves a business goal, reaches the right audience, and generates measurable ROI.
            </p>

            {/* Paragraph 4 - The Market */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">The Consulting Market and Rates</h3>
            <p className="mb-6">
                Startups and small businesses pay ₹75,000 to ₹2.5 lakh for a complete content strategy project that typically takes twenty to forty hours over four to six weeks.
            </p>

            {/* Paragraph 5 */}
            <p className="mb-6">
                Mid-size companies pay ₹2.5 to 6 lakh for comprehensive strategies including competitive analysis, multi-channel planning, team training, and ongoing advisory for three to six months.
            </p>

            {/* Paragraph 6 */}
            <p className="mb-6">
                Enterprise clients and agencies pay ₹6 to 15 lakh for large-scale projects involving multiple stakeholders, global content operations, complex workflows, and strategic positioning that impacts the entire organization.
            </p>


            {/* Paragraph 7 - Project Types */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Four Types of Content Strategy Projects</h3>
            <p className="mb-6">
                The Content Audit and Roadmap involves analyzing all existing content, identifying gaps and opportunities, creating a prioritized roadmap, and delivering a strategic plan. Timeline: three to four weeks. Fee: ₹1 to 3 lakh. Best for companies that have been creating content randomly and need direction.
            </p>

            {/* Paragraph 8 */}
            <p className="mb-6">
                The Launch Strategy covers pre-launch content planning for a new product, service, or company rebrand. Deliverables include messaging framework, content calendar, channel strategy, and launch week playbook. Timeline: four to six weeks. Fee: ₹1.5 to 4 lakh. Best for startups raising a round or launching a major initiative.
            </p>

            {/* Paragraph 9 */}
            <p className="mb-6">
                The SEO Content Strategy includes keyword research and clustering, content gap analysis versus competitors, editorial calendar built on search intent, and optimization guidelines for the team. Timeline: three to five weeks. Fee: ₹1.2 to 3.5 lakh. Best for companies wanting to build organic search traffic.
            </p>

            {/* Paragraph 10 */}
            <p className="mb-6">
                The Ongoing Advisory Retainer provides monthly strategy calls, quarterly content planning, team training and mentorship, and performance reviews with optimization recommendations. Duration: six to twelve months. Fee: ₹60,000 to ₹2.5 lakh per month. Best for companies that want a strategic partner without hiring a full-time head of content.
            </p>

            {/* Visual 3: Project Types Matrix */}
            <figure className="my-12 grid md:grid-cols-2 gap-4">
                {[
                    { title: "Audit & Roadmap", fee: "₹1 - 3 Lakh", time: "3-4 Weeks", fit: "Directing Random Effort" },
                    { title: "Launch Strategy", fee: "₹1.5 - 4 Lakh", time: "4-6 Weeks", fit: "New Products/Brands", highlight: true },
                    { title: "SEO Strategy", fee: "₹1.2 - 3.5 Lakh", time: "3-5 Weeks", fit: "Traffic Growth" },
                    { title: "Advisory Retainer", fee: "₹60k - 2.5L/mo", time: "6-12 Months", fit: "Ongoing Leadership" },
                ].map((item, i) => (
                    <div key={i} className={`p-5 rounded-lg border ${item.highlight ? 'bg-emerald-950/20 border-emerald-500/50 relative overflow-hidden' : 'bg-white/5 border-white/10'}`}>
                        {item.highlight && <div className="absolute top-0 right-0 p-1"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div></div>}
                        <h4 className={`font-bold text-lg mb-2 ${item.highlight ? 'text-white' : 'text-parchment'}`}>{item.title}</h4>
                        <div className="flex justify-between items-center mb-3 text-sm">
                            <span className="font-mono font-bold text-emerald-400">{item.fee}</span>
                            <span className="text-parchment/60">{item.time}</span>
                        </div>
                        <div className={`text-xs ${item.highlight ? 'text-parchment/80' : 'text-parchment/40'}`}>Best For: {item.fit}</div>
                    </div>
                ))}
                <figcaption className="md:col-span-2 text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 6.3: The Menu of Services. Most consultants start with an Audit (low friction) and upsell to Retainer (recurring revenue).
                </figcaption>
            </figure>


            {/* Paragraph 11 - The System */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">The System to Land Your First Consulting Client</h3>
            <p className="mb-6">
                Step one: Position yourself as a strategist, not a writer. Update your LinkedIn headline to something like "Content Strategy Consultant helping B2B SaaS companies build thought leadership" instead of "Freelance Writer." Write thought leadership posts about content strategy frameworks, common content mistakes, and ROI metrics. You're educating the market about what strategy is and why it matters.
            </p>

            {/* Paragraph 12 */}
            <p className="mb-6">
                Step two: Create a strategy diagnostic tool. Build a simple Google Form with fifteen to twenty questions diagnosing a company's content maturity: Do you have documented buyer personas? Do you track content ROI? Do you have a content calendar? Offer this free audit in exchange for an email address. The results email should highlight gaps and offer a call to discuss solutions.
            </p>

            {/* Paragraph 13 */}
            <p className="mb-6">
                Step three: Target companies at the right stage. Seed stage startups don't have budget. Enterprise companies have in-house teams. Your sweet spot is Series A to Series C startups, agencies managing multiple clients, mid-size B2B companies with ₹10 to 100 crore revenue, and fast-growing D2C brands.
            </p>

            {/* Paragraph 14 */}
            <p className="mb-6">
                Step four: The consulting proposal template. After a discovery call where you understand their challenges, send a proposal within twenty-four hours. Structure: executive summary of their current situation and goals, your recommended approach with clear phases, deliverables list with timelines, investment required with payment milestones, next steps and timeline to start. Price using value-based logic: if your strategy helps them close one extra enterprise deal worth ₹50 lakh, your ₹3 lakh fee is a 16x return.
            </p>

            {/* Paragraph 15 */}
            <p className="mb-6">
                Step five: Deliver insane value and ask for case studies. Over-deliver on your first three projects. Document the impact with metrics: traffic increased by X percent, leads increased by Y, content production costs decreased by Z percent. Write detailed case studies and post them on LinkedIn. Use those case studies to raise your fees and attract better clients.
            </p>

            {/* Visual 4: The Path to Client 1 */}
            <figure className="my-12">
                <div className="relative font-sans">
                    <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-emerald-500 to-transparent"></div>
                    {[
                        { step: "Position", desc: "Change Headline to 'Strategist'" },
                        { step: "Diagnose", desc: "Create Free Audit Tool (Magnet)" },
                        { step: "Target", desc: "Series A-C Startups (Sweet Spot)" },
                        { step: "Propose", desc: "Send ROI-Based Proposal" },
                        { step: "Deliver", desc: "Case Studies & Metrics" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4 mb-6 last:mb-0 relative">
                            <div className="w-8 h-8 rounded-full bg-ink-900 border-2 border-emerald-500 flex items-center justify-center shrink-0 z-10">
                                <span className="text-emerald-400 font-bold text-xs">{i + 1}</span>
                            </div>
                            <div className="bg-white/5 p-3 rounded w-full border border-white/5">
                                <div className="font-bold text-white text-sm">{item.step}</div>
                                <div className="text-parchment/60 text-xs">{item.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </figure>


            {/* Paragraph 16 - Tools */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Tools and Frameworks That Make You Credible</h3>
            <p className="mb-6">
                Learn and use these tools in your client work: SEMrush or Ahrefs for keyword research and competitive analysis, Google Analytics and Google Search Console for performance tracking, Notion or Airtable for content calendars and workflow management, Hotjar or Microsoft Clarity for understanding how users consume content, Clearscope or Surfer SEO for content optimization.
            </p>
            <p className="mb-6">
                Develop proprietary frameworks that you can trademark or name: "The Content ROI Canvas," "The 90-Day Launch Content System," "The Thought Leadership Ladder." Having a named methodology positions you as an expert with unique intellectual property rather than just another consultant.
            </p>

            {/* Paragraph 17 - Real Example */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Real Example: Arjun's ₹26.4 Lakh Consulting Practice</h3>
            <p className="mb-6">
                Arjun, thirty-six years old in Bangalore, spent five years as a freelance content writer earning ₹60,000 to ₹1 lakh per month. He realized he was giving strategy advice for free during client calls and then charging only for execution. He repositioned as a content strategist and raised his minimum project fee to ₹1.5 lakh.
            </p>
            <p className="mb-6">
                His first strategy client was a fintech startup he'd written blog posts for. He proposed a complete content overhaul for ₹2.2 lakh, which included competitor analysis, SEO strategy, six-month content calendar, and team training. The project took thirty-two hours over five weeks.
            </p>
            <p className="mb-6">
                In his first year as a strategist, he completed nine projects ranging from ₹1.5 to 4.2 lakh each, totaling ₹21.8 lakh. He also kept two monthly advisory retainers at ₹75,000 per month each for ₹9 lakh annually. Total first-year income: ₹30.8 lakh, working roughly twenty hours per week compared to forty-plus hours as a freelance writer.
            </p>
            <p className="mb-6">
                Year two, he raised his minimum to ₹2.5 lakh, completed eight projects, and increased his retainer rates to ₹1.2 lakh per month. Total income: ₹42.6 lakh while working even less because he'd systematized his frameworks and templatized his deliverables.
            </p>

            {/* Visual 5: Arjun's Growth Chart */}
            <figure className="my-12">
                <Card className="bg-ink-900 border border-white/10 p-6">
                    <div className="flex justify-between items-end gap-4 h-48 mb-4">
                        <div className="w-1/3 h-[50%] bg-white/10 rounded-t flex flex-col justify-end items-center pb-2 relative group hover:bg-white/20 transition-colors">
                            <span className="text-white font-bold text-lg mb-1">₹12L</span>
                            <span className="text-[10px] text-parchment/40 uppercase tracking-widest">Year 0</span>
                            <div className="absolute top-2 w-full text-center text-[9px] text-parchment/30 opacity-0 group-hover:opacity-100">Writer Mode</div>
                        </div>
                        <div className="w-1/3 h-[75%] bg-emerald-500/40 rounded-t flex flex-col justify-end items-center pb-2 relative group hover:bg-emerald-500/50 transition-colors">
                            <span className="text-emerald-300 font-bold text-lg mb-1">₹30.8L</span>
                            <span className="text-[10px] text-parchment/40 uppercase tracking-widest">Year 1</span>
                            <div className="absolute top-2 w-full text-center text-[9px] text-emerald-200/60 opacity-0 group-hover:opacity-100">Consultant Mode</div>
                        </div>
                        <div className="w-1/3 h-full bg-emerald-500 rounded-t flex flex-col justify-end items-center pb-2 relative group hover:bg-emerald-400 transition-colors shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                            <span className="text-ink-black font-bold text-lg mb-1">₹42.6L</span>
                            <span className="text-[10px] text-ink-900/60 font-bold uppercase tracking-widest">Year 2</span>
                            <div className="absolute top-2 w-full text-center text-[9px] text-ink-900/40 font-bold opacity-0 group-hover:opacity-100">Systematized</div>
                        </div>
                    </div>
                    <div className="text-center text-sm text-parchment/50 font-sans italic border-t border-white/10 pt-4">
                        Figure 6.4: The Consultant's Leap. Note the massive jump in Y1 when shifting from execution to strategy.
                    </div>
                </Card>
            </figure>


            {/* Paragraph 18 - Mistakes */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Common Mistakes</h3>
            <p className="mb-6">
                Mistake number one: calling yourself a strategist but pricing like a writer. Strategy commands 3x to 5x higher fees than execution. If you're charging ₹50,000 for a strategy that takes twenty hours, you're undervaluing yourself.
            </p>
            <p className="mb-6">
                Mistake number two: delivering a strategy document and disappearing. Offer implementation support, even if it's paid separately. Strategies that don't get executed become expensive paperweights, and you don't get great testimonials.
            </p>
            <p className="mb-6">
                Mistake number three: using jargon without explaining the business impact. Clients don't care about "pillar pages" and "topic clusters"—they care about leads, revenue, and growth. Translate strategy speak into business outcomes.
            </p>
            <p className="mb-6">
                Mistake number four: not having a clear deliverable list and timeline. Vague scope leads to scope creep and unhappy clients. Be crystal clear about what they're getting and when.
            </p>

            {/* Paragraph 19 - Snapshot */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Real Numbers Snapshot</h3>
            <p className="mb-6">
                First six months: land three strategy projects at ₹1.5 lakh each. Revenue: ₹4.5 lakh.
            </p>
            <p className="mb-6">
                Year one: complete eight to ten projects averaging ₹2 lakh each. Add one retainer at ₹60,000 per month. Revenue: ₹16 to 20 lakh plus ₹7.2 lakh from retainer equals ₹23 to 27 lakh total.
            </p>
            <p className="mb-6">
                Year two: ten to twelve projects averaging ₹3 lakh each plus two retainers at ₹1 lakh per month. Revenue: ₹30 to 36 lakh plus ₹24 lakh from retainers equals ₹54 to 60 lakh total.
            </p>


            {/* Action Box */}
            <div className="mt-16 bg-gradient-to-r from-emerald-900/40 to-ink-900 border border-emerald-500/50 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <BrainCircuit className="w-32 h-32 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-ink-black text-sm">🚀</span>
                    ACTION BOX: Land Your First Strategy Client
                </h3>
                <div className="space-y-6 relative z-10 font-sans">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <div className="font-bold text-emerald-400 Uppercase text-sm mb-2">This Week</div>
                            <ul className="list-disc list-inside text-parchment/80 space-y-2 text-sm">
                                <li>Create free content audit diagnostic tool</li>
                                <li>Reposition LinkedIn profile as "Strategist"</li>
                                <li>Identify 10 potential clients (Series A-C)</li>
                            </ul>
                        </div>
                        <div>
                            <div className="font-bold text-emerald-400 Uppercase text-sm mb-2">Next Week</div>
                            <ul className="list-disc list-inside text-parchment/80 space-y-2 text-sm">
                                <li>Reach out offering free audit</li>
                                <li>Book discovery calls</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-emerald-500/10 rounded-lg p-4 mt-6 border border-emerald-500/30 text-center">
                        <span className="text-emerald-400 font-bold uppercase tracking-widest text-sm">Goal: Close one strategy project at ₹1.5 to 3 lakh within sixty days</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PagesChapterConsulting;
