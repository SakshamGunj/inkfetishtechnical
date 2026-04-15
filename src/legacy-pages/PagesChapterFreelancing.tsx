import React from 'react';
import {
    PenTool, Briefcase, TrendingUp, DollarSign,
    Target, Building2, Stethoscope, LineChart,
    CheckCircle2, ArrowRight, Laptop
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PagesChapterFreelancing = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 font-serif text-lg md:text-xl leading-relaxed text-parchment/90">
            {/* Title Section */}
            <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 border-emerald-500/50 text-emerald-400 tracking-[0.2em] font-sans">
                    STREAM 3
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">FREELANCE WRITING – ₹50,000 TO ₹3 LAKH PER MONTH</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-gold mx-auto rounded-full" />
            </div>

            {/* Paragraph 1 */}
            <p className="mb-6 first-letter:text-5xl first-letter:text-emerald-400 first-letter:font-bold first-letter:mr-2 first-letter:float-left">
                Freelance writing is the fastest way to go from zero to ₹50,000 per month, but most freelancers get stuck there because they're selling hours instead of outcomes. The writers making ₹2 to 3 lakh per month understand something crucial: you're not a writer-for-hire, you're a business outcome provider who happens to use words.
            </p>

            {/* Visual 1: The Freelance Evolution */}
            <figure className="my-12">
                <div className="relative pt-8">
                    <div className="absolute left-0 right-0 top-[45%] h-1 bg-white/5 -z-10" />
                    <div className="grid grid-cols-2 gap-8">
                        <div className="bg-ink-900 border border-white/10 p-6 rounded-xl text-center opacity-60">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
                                <PenTool className="w-6 h-6 text-parchment/50" />
                            </div>
                            <h4 className="text-sm font-sans uppercase tracking-widest text-parchment/60 mb-1">Writer-for-Hire</h4>
                            <div className="text-xl font-bold text-white mb-2">₹50k / mo</div>
                            <div className="text-xs text-parchment/40">"I sell words."</div>
                        </div>
                        <div className="bg-emerald-950/30 border border-emerald-500/50 p-6 rounded-xl text-center relative shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-ink-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">Goal State</div>
                            <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/50">
                                <Briefcase className="w-6 h-6 text-emerald-400" />
                            </div>
                            <h4 className="text-sm font-sans uppercase tracking-widest text-emerald-400 mb-1">Outcome Provider</h4>
                            <div className="text-xl font-bold text-white mb-2">₹3 Lakh / mo</div>
                            <div className="text-xs text-emerald-400/60">"I sell leads & sales."</div>
                        </div>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 3.1: The mindset shift required to break the ₹50k ceiling. Stop selling input (words) and start selling output (results).
                </figcaption>
            </figure>

            {/* Paragraph 2 - Economics */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">The Freelance Writing Economics</h3>
            <p className="mb-6">
                Beginner rates in India run ₹0.50 to ₹2 per word for blog posts and articles. Intermediate rates hit ₹2 to ₹5 per word once you specialize. Expert rates with niche positioning reach ₹5 to ₹15 per word. International clients through Upwork or direct outreach pay five to fifty cents USD per word, which translates to ₹40 to ₹400 per hundred words at current exchange rates.
            </p>

            {/* Paragraph 3 */}
            <p className="mb-6">
                But per-word pricing is actually a trap that keeps you stuck. The ₹3 lakh per month freelancers don't charge per word. They charge per project or on retainer, which breaks the time-for-money ceiling.
            </p>

            {/* Visual 2: Rate Ladder */}
            <figure className="my-12">
                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 rounded-lg border border-white/5 bg-white/[0.02]">
                        <div className="w-24 text-center text-xs text-parchment/40 font-sans uppercase">Beginner</div>
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="w-[10%] h-full bg-parchment/30" />
                        </div>
                        <div className="w-24 text-right font-mono text-sm text-parchment/60">₹0.5 - 2</div>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-lg border border-white/5 bg-white/[0.02]">
                        <div className="w-24 text-center text-xs text-parchment/60 font-sans uppercase">Expert</div>
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="w-[40%] h-full bg-emerald-500/50" />
                        </div>
                        <div className="w-24 text-right font-mono text-sm text-emerald-400">₹5 - 15</div>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-lg border border-gold/20 bg-gold/5 relative overflow-hidden">
                        <div className="w-24 text-center text-xs text-gold font-sans uppercase font-bold">Retainer</div>
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="w-full h-full bg-gold animate-pulse" />
                        </div>
                        <div className="w-24 text-right font-mono text-sm text-gold font-bold">UNCAPPED</div>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 3.2: Why trading per-word rates for retainers unlocks uncapped earning potential.
                </figcaption>
            </figure>


            {/* Paragraph 4 - The Three Models */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">The Three Freelance Models That Scale</h3>
            <p className="mb-6">
                Model one is project-based pricing. Instead of ₹2 per word for a thousand-word article, you charge ₹25,000 for a complete white paper that positions the client as a thought leader and generates leads. Same writing time, ten times the fee, because you're pricing based on the business outcome, not the word count.
            </p>

            {/* Paragraph 5 */}
            <p className="mb-6">
                Model two is retainer agreements. You charge ₹80,000 to ₹2.5 lakh per month for a set deliverable package like four blog posts, two social media caption sets, and one email newsletter per month. The client gets predictable content, you get predictable income, and you can stack two to three retainers for ₹2 to 5 lakh monthly revenue.
            </p>

            {/* Paragraph 6 */}
            <p className="mb-6">
                Model three is value-based pricing with performance bonuses. You charge a base fee of ₹40,000 per month plus a percentage of the revenue your content generates. If your email campaign drives ₹10 lakh in sales, you take five percent as a bonus. This model works best with e-commerce brands and info-product creators who can track direct attribution.
            </p>

            {/* Visual 3: Model Comparison Cards */}
            <figure className="my-12 grid md:grid-cols-3 gap-6">
                <Card className="bg-ink-900 border border-white/10 p-5 hover:bg-white/5 transition-colors">
                    <div className="h-10 w-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 text-blue-400">
                        <DollarSign className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Project-Based</h4>
                    <p className="text-sm text-parchment/60 mb-4 h-16">Price based on outcome value (leads), not input cost (words).</p>
                    <div className="text-xs font-mono text-blue-400">Target: ₹25k / Whitepaper</div>
                </Card>

                <Card className="bg-ink-900 border border-emerald-500/30 p-5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-2 opacity-50"><CheckCircle2 className="w-16 h-16 text-emerald-500/10" /></div>
                    <div className="h-10 w-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4 text-emerald-400">
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Retainer</h4>
                    <p className="text-sm text-parchment/60 mb-4 h-16">Recurring monthly fee for a set content package.</p>
                    <div className="text-xs font-mono text-emerald-400">Target: ₹80k - 2.5L / mo</div>
                </Card>

                <Card className="bg-ink-900 border border-gold/20 p-5 hover:bg-gold/5 transition-colors">
                    <div className="h-10 w-10 bg-gold/20 rounded-lg flex items-center justify-center mb-4 text-gold">
                        <Target className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Value-Based</h4>
                    <p className="text-sm text-parchment/60 mb-4 h-16">Base fee + % of sales generated by your copy.</p>
                    <div className="text-xs font-mono text-gold">Target: Base + 5% Comm</div>
                </Card>
            </figure>


            {/* Paragraph 7 - Niches */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Niches That Pay ₹5 to ₹15 Per Word</h3>
            <p className="mb-6">
                SaaS and tech writing serves software companies that need product marketing content, case studies, technical documentation, and integration guides. Clients pay premium rates because good tech writers who understand both the product and the customer are rare. Rate range: ₹5 to 12 per word or ₹50,000 to ₹1.5 lakh per project.
            </p>

            {/* Paragraph 8 */}
            <p className="mb-6">
                Finance and fintech writing includes personal finance blogs, investment guides, cryptocurrency explainers, and regulatory content. Banks, wealth management firms, and fintech startups pay well because accuracy and compliance matter. Rate range: ₹6 to 15 per word or ₹60,000 to ₹2 lakh per white paper.
            </p>

            {/* Paragraph 9 */}
            <p className="mb-6">
                Healthcare and medical writing covers patient education content, medical device documentation, pharmaceutical marketing, and health tech blogs. You need to understand medical terminology and cite sources properly, which is why rates are high. Rate range: ₹7 to 15 per word or ₹1 to 3 lakh for comprehensive guides.
            </p>

            {/* Paragraph 10 */}
            <p className="mb-6">
                B2B marketing and thought leadership serves consultants, agencies, and enterprise software companies that need executive-level content like LinkedIn articles, industry reports, and conference presentations. Rate range: ₹8 to 20 per word or ₹1 to 4 lakh per major deliverable.
            </p>

            {/* Visual 4: Payment Niches Grid */}
            <figure className="my-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: Laptop, title: "SaaS & Tech", rate: "₹5 - 12", sub: "per word" },
                    { icon: LineChart, title: "Fintech", rate: "₹6 - 15", sub: "per word" },
                    { icon: Stethoscope, title: "Medical", rate: "₹7 - 15", sub: "per word" },
                    { icon: Building2, title: "B2B", rate: "₹8 - 20", sub: "per word" },
                ].map((item, i) => (
                    <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/5 text-center group hover:bg-white/10 transition-all hover:-translate-y-1">
                        <item.icon className="w-8 h-8 mx-auto mb-3 text-parchment/50 group-hover:text-emerald-400 transition-colors" />
                        <h4 className="font-sans text-xs uppercase tracking-widest text-parchment/60 mb-2">{item.title}</h4>
                        <div className="font-bold text-white text-lg">{item.rate}</div>
                        <div className="text-[10px] text-parchment/40">{item.sub}</div>
                    </div>
                ))}
            </figure>

            {/* Paragraph 11 - The System */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">The System to Land ₹80,000 Plus Retainer Clients</h3>
            <p className="mb-6">
                Step one: Pick a profitable niche and build three portfolio samples. Don't be a generalist "I write everything" freelancer. Choose one niche from the high-paying list above. Write three unsolicited samples that showcase your ability. If you're targeting SaaS companies, write a sample case study titled "How [Made-up Company] Reduced Churn by 23% with Better Onboarding." If you're targeting fintech, write "The Complete Guide to UPI Payments for Small Business Owners." Post these on Medium or your personal website. Now you have a portfolio even without paid clients.
            </p>

            {/* Paragraph 12 */}
            <p className="mb-6">
                Step two: Build a simple one-page website. Use Carrd, Wix, or Notion to create a single page with these sections: headline stating your specialty, three portfolio samples with links, testimonial section even if it starts empty, clear call-to-action like "Book a free consultation call," and your contact information. Total cost: ₹0 to ₹2,000. Total time: four hours.
            </p>

            {/* Paragraph 13 */}
            <p className="mb-6">
                Step three: Find clients where they already are. LinkedIn is your primary hunting ground. Search for "[your niche] companies hiring" or "[your niche] content manager" or "[your niche] marketing director." Send connection requests with a note: "Hi [Name], I help [niche] companies with [specific outcome]. Noticed you're at [Company], would love to connect." After they accept, wait two days, then send a message offering value first: "Saw your recent post about [topic]. I wrote a quick guide on [related topic] that might be useful for your team. No strings attached." Attach your sample.
            </p>

            {/* Paragraph 14 */}
            <p className="mb-6">
                Step four: The retainer proposal template. Once you've done a few one-off projects and proven your value, propose a retainer. Email: "Hi [Name], I've really enjoyed working on the last few projects with [Company]. I'm wondering if a monthly retainer makes sense for both of us. I could handle [X deliverables] per month for [₹Y], which would give you consistent content and save you the hassle of per-project negotiations. Would you be open to discussing this?" Retainer rates for specialized niches run ₹60,000 to ₹2.5 lakh per month depending on deliverable volume and your expertise level.
            </p>

            {/* Visual 5: Retainer Email Preview */}
            <figure className="my-12">
                <div className="bg-ink-900 border border-white/10 rounded-lg overflow-hidden max-w-2xl mx-auto shadow-2xl">
                    <div className="bg-black/30 px-4 py-2 border-b border-white/5 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                        <div className="w-2 h-2 rounded-full bg-yellow-400" />
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                        <span className="text-xs font-mono text-parchment/40 ml-2">retainer_pitch.msg</span>
                    </div>
                    <div className="p-6 font-mono text-sm text-parchment/80 leading-relaxed whitespace-pre-wrap">
                        Hi [Name],<br /><br />
                        I've really enjoyed working on the last few projects with [Company].<br /><br />

                        I'm wondering if a monthly retainer makes sense for both of us.<br /><br />

                        I could handle <span className="text-emerald-400 bg-emerald-500/10 px-1 rounded">[X deliverables]</span> per month for <span className="text-emerald-400 bg-emerald-500/10 px-1 rounded">[₹Y]</span>, which would give you consistent content and save you the hassle of per-project negotiations.<br /><br />

                        Would you be open to discussing this?
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 3.3: The "Soft Pitch". Don't sell it hard; frame it as a convenience for them.
                </figcaption>
            </figure>


            {/* Paragraph 15 */}
            <p className="mb-6">
                Step five: Scale to multiple retainers. Once you have one retainer client, you have proof. Use that case study to land the second one. Two retainers at ₹1 lakh each equals ₹2 lakh per month. Add occasional project work and you hit ₹2.5 to 3 lakh monthly. The key is time management: batch similar tasks, create templates and frameworks, and outsource basic research to a ₹15,000 per month assistant once you cross ₹1.5 lakh monthly income.
            </p>

            {/* Paragraph 16 - Real Example */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Real Example: Meera's ₹2.3 Lakh Per Month SaaS Writing Business</h3>
            <p className="mb-6">
                Meera, thirty-one years old in Pune, started freelancing with general blog posts at ₹1.50 per word. She was making ₹35,000 per month and hitting a ceiling. She repositioned as a "SaaS product marketing writer" and created three sample case studies based on real companies but written on spec. She targeted Series A and Series B SaaS startups on LinkedIn, sent fifty connection requests per week, and offered free value through mini-guides.
            </p>

            {/* Paragraph 17 */}
            <p className="mb-6">
                Within sixty days, she landed her first ₹75,000 per month retainer client who needed four case studies per month. Ninety days later, she added a second retainer at ₹90,000 per month for blog posts and email sequences. She also took on project work worth ₹60,000 to ₹80,000 per month. Total monthly income: ₹2.3 lakh. Time invested: twenty-five to thirty hours per week, because she templatized her process and hired a junior researcher for ₹18,000 per month to handle data gathering.
            </p>

            {/* Visual 6: Meera's Stack */}
            <figure className="my-12">
                <Card className="bg-gradient-to-br from-indigo-900/20 to-blue-900/10 border-white/10 p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-ink-black font-bold text-xl shrink-0">M</div>
                        <div>
                            <h4 className="font-bold text-white text-lg">Meera's Income Stack</h4>
                            <p className="text-parchment/60 text-sm italic">SaaS Niche • 2 Retainers • 1 Assistant</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                            <div className="text-[10px] uppercase font-bold text-parchment/40 mb-1">Retainer 1</div>
                            <div className="text-xl font-bold text-white">₹75k</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                            <div className="text-[10px] uppercase font-bold text-parchment/40 mb-1">Retainer 2</div>
                            <div className="text-xl font-bold text-white">₹90k</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                            <div className="text-[10px] uppercase font-bold text-parchment/40 mb-1">Projects</div>
                            <div className="text-xl font-bold text-white">₹65k</div>
                        </div>
                    </div>
                    <div className="mt-4 p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/30 text-center flex justify-between items-center">
                        <span className="text-sm text-emerald-400 font-bold uppercase tracking-widest">Total Monthly Income</span>
                        <span className="text-2xl font-bold text-emerald-400">₹2.3 Lakh</span>
                    </div>
                </Card>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 3.4: Stacking retainers is the secret to stability and scale.
                </figcaption>
            </figure>


            {/* Paragraph 18 - Common Mistakes */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Common Mistakes</h3>
            <p className="mb-6">
                Mistake number one: staying a generalist. "I write about anything" means you compete with ten thousand other freelancers. "I write case studies for HR tech companies" means you're one of fifty.
            </p>
            <p className="mb-6">
                Mistake number two: charging per word or per hour once you're past beginner stage. Both models cap your income at the number of hours you can work. Project and retainer pricing scales much faster.
            </p>
            <p className="mb-6">
                Mistake number three: not asking for testimonials and case studies. Every successful project should end with "Can I write up this project as a case study and could you provide a short testimonial?" Your next client won't hire you without proof.
            </p>
            <p className="mb-6">
                Mistake number four: underselling yourself on retainers. If a client wants to pay you ₹40,000 per month for work that takes you forty hours, you're making ₹1,000 per hour. That's fine at first, but as you get faster, that same work might take you twenty hours. Don't drop your price—add more value or take on another retainer.
            </p>

            {/* Paragraph 19 - Real Numbers Snapshot */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Real Numbers Snapshot</h3>
            <p className="mb-6">
                Month one to three scenario: land two clients at ₹25,000 per project. Complete four projects per month. Revenue: ₹50,000 per month.
            </p>
            <p className="mb-6">
                Month four to six scenario: convert one client to ₹70,000 monthly retainer. Add project work at ₹40,000 to ₹50,000 per month. Revenue: ₹1.1 to 1.2 lakh per month.
            </p>
            <p className="mb-6">
                Month seven to twelve scenario: add a second retainer at ₹85,000 per month. Occasional project work adds ₹30,000 to ₹40,000 per month. Revenue: ₹1.85 to 2.1 lakh per month.
            </p>
            <p className="mb-6">
                Year two goal: three retainers at ₹80,000 to ₹1.2 lakh each. Total: ₹2.5 to 3.5 lakh per month.
            </p>

            {/* Action Box */}
            <div className="mt-16 bg-gradient-to-r from-emerald-900/40 to-ink-900 border border-emerald-500/50 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Laptop className="w-32 h-32 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-ink-black text-sm">🚀</span>
                    ACTION BOX: Build Your Freelance Engine
                </h3>
                <div className="space-y-6 relative z-10 font-sans">
                    <div className="flex gap-4">
                        <div className="w-32 shrink-0 font-bold text-emerald-400 Uppercase text-sm mt-1">This Week</div>
                        <div className="text-parchment/80">Pick your niche. Write three portfolio samples. Create your one-page website. Send twenty-five LinkedIn connection requests to potential clients in your niche.</div>
                    </div>

                    <div className="bg-emerald-500/10 rounded-lg p-4 mt-6 border border-emerald-500/30 text-center">
                        <span className="text-emerald-400 font-bold uppercase tracking-widest text-sm">Goal: Book three discovery calls within fourteen days.</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PagesChapterFreelancing;
