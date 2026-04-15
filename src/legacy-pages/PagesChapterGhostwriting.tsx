import React from 'react';
import {
    Ghost, Globe, Briefcase, Book, Mic, PenTool,
    CheckCircle2, XCircle, AlertTriangle, ArrowRight,
    DollarSign, Clock, Users, FileText
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from 'react';
import LoveAnthologyModal from '../components/LoveAnthologyModal';

const PagesChapterGhostwriting = () => {
    const [showModal, setShowModal] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);
    const triggerRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasTriggered) {
                    setShowModal(true);
                    setHasTriggered(true);
                }
            },
            { threshold: 0.5 }
        );

        if (triggerRef.current) {
            observer.observe(triggerRef.current);
        }

        return () => {
            if (triggerRef.current) observer.unobserve(triggerRef.current);
        };
    }, [hasTriggered]);
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 font-serif text-lg md:text-xl leading-relaxed text-parchment/90">
            {/* Title Section */}
            <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 border-emerald-500/50 text-emerald-400 tracking-[0.2em] font-sans">
                    STREAM 1
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">GHOSTWRITING – THE FASTEST ₹5-25 LAKH</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-gold mx-auto rounded-full" />
            </div>

            {/* Paragraph 1 */}
            <p className="mb-6 first-letter:text-5xl first-letter:text-emerald-400 first-letter:font-bold first-letter:mr-2 first-letter:float-left">
                Ghostwriting is invisible money. You write, they take credit, you take ₹8 to 25 lakh per project. No book launch stress. No marketing campaigns. No worrying about reviews. Just deliverables and deposits. It's the highest return-on-investment writing work in India right now, and most writers don't even know it exists.
            </p>

            {/* Visual 1: The Invisible Money Card */}
            <figure className="my-12">
                <Card className="bg-ink-900/50 border-white/10 p-8 backdrop-blur-sm relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500">
                    <div className="absolute top-0 right-0 p-8 opacity-5 transition-opacity group-hover:opacity-10">
                        <Ghost className="w-48 h-48 text-emerald-500" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
                        <div className="space-y-4">
                            <h3 className="text-xl font-sans font-bold text-white uppercase tracking-widest">The Trade-Off</h3>
                            <ul className="space-y-3 font-sans text-sm md:text-base">
                                <li className="flex items-center gap-3 text-parchment/70">
                                    <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                                    <span>No Public Credit</span>
                                </li>
                                <li className="flex items-center gap-3 text-parchment/70">
                                    <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                                    <span>No Royalties</span>
                                </li>
                                <li className="flex items-center gap-3 text-emerald-400 font-bold">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <span>Immediate High Cashflow</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-emerald-950/30 p-6 rounded-xl border border-emerald-500/20 text-center">
                            <div className="text-sm font-sans uppercase tracking-widest text-emerald-400/80 mb-2">Project Range</div>
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">₹8 - 25 L</div>
                            <div className="text-xs text-parchment/40 font-mono">Per Project • No Marketing Required</div>
                        </div>
                    </div>
                </Card>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 1.1: The core value proposition of ghostwriting—trading visibility for significant, immediate income.
                </figcaption>
            </figure>

            {/* Paragraph 2 - The Market Reality */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">The Market Reality</h3>
            <p className="mb-6">
                Let me break down what ghostwriters actually earn in India. For fiction ghostwriting, rates run from ₹3 to ₹15 per word. Business non-fiction commands ₹5 to ₹25 per word. Memoirs fall somewhere in between at ₹4 to ₹12 per word. Speeches, which are shorter-form ghostwriting, pay ₹10,000 to ₹50,000 per speech depending on the client's stature and the event's importance.
            </p>

            {/* Visual 2: Rate Card Grid */}
            <figure className="my-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { icon: PenTool, title: "Fiction", rate: "₹3 - 15", unit: "per word" },
                    { icon: Briefcase, title: "Business", rate: "₹5 - 25", unit: "per word", highlight: true },
                    { icon: Book, title: "Memoirs", rate: "₹4 - 12", unit: "per word" },
                    { icon: Mic, title: "Speeches", rate: "₹10k-50k", unit: "per speech" },
                ].map((item, i) => (
                    <div key={i} className={`p-4 rounded-xl border ${item.highlight ? 'bg-emerald-900/20 border-emerald-500/50' : 'bg-white/5 border-white/10'} text-center transition-transform hover:-translate-y-1`}>
                        <item.icon className={`w-6 h-6 mx-auto mb-3 ${item.highlight ? 'text-emerald-400' : 'text-parchment/50'}`} />
                        <h4 className="font-sans text-xs uppercase tracking-widest text-parchment/60 mb-2">{item.title}</h4>
                        <div className={`font-bold text-lg md:text-xl ${item.highlight ? 'text-white' : 'text-parchment'}`}>{item.rate}</div>
                        <div className="text-[10px] text-parchment/40 font-mono">{item.unit}</div>
                    </div>
                ))}
            </figure>

            {/* Paragraph 3 */}
            <p className="mb-6">
                Compare that to international rates and you'll see why Indian ghostwriters are also targeting US and UK clients. American and British clients pay ten cents to fifty cents per word, which translates to ₹8 to ₹40 per word at current exchange rates. A fifty-thousand-word book at ₹10 per word equals ₹5 lakh. A sixty-thousand-word book at ₹15 per word equals ₹9 lakh. Do that math again—that's a single project paying what many freelancers earn in an entire year.
            </p>

            {/* Paragraph 4 */}
            <p className="mb-6">
                Why do clients pay these rates? Because CEOs and founders need authority in their industries, and a published book gives them instant credibility. They don't have time to write, or frankly, they're terrible at it. A ₹10 lakh ghostwriting fee is actually cheaper than six months of their time, especially when you factor in their hourly rate and opportunity cost. They're buying their way to thought leadership, and you're providing the vehicle.
            </p>

            {/* Visual 3: The CEO's Value Equation */}
            <figure className="my-12">
                <div className="bg-ink-black border border-gold/20 rounded-xl p-6 md:p-8">
                    <h4 className="text-center font-sans text-xs uppercase tracking-widest text-gold mb-6">Why CEOs Happy Pay ₹10 Lakh</h4>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center w-full">
                            <div className="text-red-400 font-bold mb-2">CEO Writing It Themselves</div>
                            <div className="text-sm text-parchment/60">6 Months Time Cost</div>
                            <div className="text-xs text-parchment/40">(@ ₹50k/day)</div>
                            <div className="text-2xl font-bold text-red-500 mt-2">Cost: ₹90 Lakhs</div>
                        </div>
                        <div className="text-2xl text-parchment/40">VS</div>
                        <div className="text-center w-full">
                            <div className="text-emerald-400 font-bold mb-2">Hiring You</div>
                            <div className="text-sm text-parchment/60">Ghostwriting Fee</div>
                            <div className="text-xs text-parchment/40">(Expert Delivery)</div>
                            <div className="text-2xl font-bold text-emerald-500 mt-2">Cost: ₹10 Lakhs</div>
                        </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-white/10 text-center">
                        <Badge className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30">Result: 9x ROI for the Client</Badge>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 1.2: Understanding the client's ROI perspective. For a CEO, paying you ₹10 Lakhs is actually a massive saving compared to their time cost.
                </figcaption>
            </figure>


            {/* Paragraph 5 - Types of Projects */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Types of Ghostwriting Projects</h3>
            <p className="mb-6">
                Business Books are where the highest pay and fastest closes happen. Your ideal client is a CEO, consultant, coach, or startup founder who wants a forty to sixty-thousand-word book full of practical frameworks written in their voice. Rates range from ₹5 to 25 lakh depending on the client's revenue and public profile. Timeline is typically three to six months from outline to final manuscript after revisions. You find these clients on LinkedIn, through publishing agencies that package corporate books, or by networking with book proposal writers who land clients but don't write the manuscripts themselves.
            </p>

            {/* Paragraph 6 */}
            <p className="mb-6">
                Memoirs and autobiographies attract politicians, actors, athletes, and senior executives. Rates run ₹3 to 15 lakh. The skill set here includes interviewing, which means ten to twenty hours of recorded calls, plus the ability to structure narrative and hit emotional beats that make the story compelling. The trap to avoid: clients who just want to "tell their story" but have no clear narrative arc. You'll waste months trying to find the through-line that doesn't exist.
            </p>

            {/* Paragraph 7 */}
            <p className="mb-6">
                Fiction ghostwriting serves authors who want to publish six to ten books per year, or romance and thriller mills that need consistent output. Rates are ₹3 to 8 lakh per sixty to eighty-thousand-word novel. Fast turnaround is expected, usually sixty to ninety days if you're efficient. There's a niche opportunity here in indie authors who've established a series and need to outsource continuations to meet reader demand.
            </p>

            {/* Paragraph 8 */}
            <p className="mb-6">
                Speeches and short-form ghostwriting pays ₹10,000 to ₹50,000 per speech depending on the client and event. Timeline is one to two weeks. This work is perfect for generating quick cash between larger book projects and keeping your pipeline full.
            </p>

            {/* Paragraph 9 - The System */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">The System to Land Your First ₹5 Lakh Plus Gig</h3>
            <p className="mb-6">
                Step One: Build a Stealth Portfolio in Week One. You need to write three sample chapters in different styles to show range. Write a business chapter like "Chapter Three: How to Scale Your SaaS Startup Without Burning Out." Write a memoir chapter like "Chapter Seven: The Day I Lost Everything and Found My Purpose." Write a fiction chapter like "Chapter One: The Last Train to Mumbai." Then create a one-page portfolio PDF with a hundred-word bio, the phrase "Sample chapters available on request," and your contact information. You don't need past client names because confidentiality is actually your selling point in ghostwriting.
            </p>

            {/* Visual 4: Portfolio Checklist */}
            <figure className="my-8 ml-6 border-l-2 border-emerald-500/50 pl-6">
                <h4 className="font-sans font-bold text-emerald-400 text-sm uppercase mb-3">Your Stealth Portfolio Checklist</h4>
                <div className="space-y-2 text-sm text-parchment/80 font-sans">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>Business Sample ("How to Scale...")</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>Memoir Sample ("The Day I Lost...")</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>Fiction Sample ("Last Train...")</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>1-Page PDF (Bio + Contact Info)</span>
                    </div>
                </div>
            </figure>

            {/* Paragraph 10 */}
            <p className="mb-6">
                Step Two: Target the Right Clients in Week Two. Go to LinkedIn and use these search strings: "CEO" plus "author," "consultant" plus "book," "entrepreneur" plus "writing a book," "keynote speaker" plus "India." Reach out to publishing agencies that package corporate books with a simple message: "I'm a ghostwriter available for projects." Connect with book proposal writers because they land clients who need manuscripts but the proposal writers themselves don't do that work. Offer a sixty-forty revenue split or a fixed referral fee for projects they send your way.
            </p>

            {/* Paragraph 11 */}
            <p className="mb-6">
                Step Three: Use This Cold Outreach Template. Subject line: "Ghostwriting for [Their Industry slash Book Topic]." Body: "Hi [Name], I help [business leaders slash experts slash consultants] turn their expertise into authority-building books without spending six months writing. I've ghostwritten [X projects slash worked with clients in Y industry], handling everything from structure to final manuscript while you stay focused on [their business]. If you're considering a book project, I'd be happy to share my process, timeline, and rates. Best, [Your Name] [Portfolio Link]." Follow up on day three with "Just following up, still interested in exploring this?" On day seven, send "No worries if timing isn't right. Here's a free resource: my one-page book outline template."
            </p>

            {/* Visual 5: Copy-Paste Template Card */}
            <figure className="my-12">
                <div className="bg-ink-900 border border-white/10 rounded-lg overflow-hidden">
                    <div className="bg-black/30 px-4 py-2 border-b border-white/5 flex items-center justify-between">
                        <span className="text-xs font-mono text-parchment/40">email_template.txt</span>
                        <Badge variant="secondary" className="text-[10px] bg-emerald-500/10 text-emerald-400">High Converting</Badge>
                    </div>
                    <div className="p-6 font-mono text-sm text-parchment/80 leading-relaxed whitespace-pre-wrap">
                        <span className="text-parchment/40">Subject:</span> Ghostwriting for [Their Industry / Book Topic]<br /><br />

                        Hi [Name],<br /><br />

                        I help [business leaders / experts] turn their expertise into authority-building books without spending six months writing.<br /><br />

                        I've worked with clients in [Y industry], handling everything from structure to final manuscript while you stay focused on [their business].<br /><br />

                        If you're considering a book project, I'd be happy to share my process, timeline, and rates.<br /><br />

                        Best,<br />
                        [Your Name]<br />
                        [Portfolio Link]
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 1.3: The exact cold email framework. Keep it brief, outcome-focused, and respect their time.
                </figcaption>
            </figure>

            {/* Paragraph 12 */}
            <p className="mb-6">
                Step Four: Pricing and Closing. You have three pricing models to choose from. The flat fee structure runs ₹5 to 25 lakh total, paid in milestones like thirty percent upfront, thirty percent at first draft delivery, forty percent at final manuscript. This is the most common model because clients prefer cost certainty. The per-word model charges ₹5 to 15 per word and works best for shorter projects or variable scope situations. The retainer model pays ₹1 to 3 lakh per month for four to six months and suits ongoing relationships where the client wants a slower, more collaborative pace.
            </p>

            {/* Paragraph 13 */}
            <p className="mb-6">
                Your negotiation rules are non-negotiable. Always get thirty to fifty percent upfront. Always. Build milestone payments into the contract and never agree to "pay on completion." Charge an extra thirty percent for rush timelines under ninety days. Walk away from "royalty share instead of payment" offers because ninety-nine percent of the time it's a scam.
            </p>

            {/* Visual 6: Pricing Models Table */}
            <figure className="my-12">
                <div className="rounded-xl overflow-hidden border border-white/10 bg-ink-black text-sm font-sans">
                    <div className="grid grid-cols-4 bg-white/5 p-3 font-bold text-center uppercase tracking-widest text-parchment/60">
                        <div className="col-span-1 text-left pl-2">Model</div>
                        <div>Range</div>
                        <div>Best For</div>
                        <div>Pros</div>
                    </div>
                    <div className="divide-y divide-white/5">
                        <div className="grid grid-cols-4 p-4 items-center">
                            <div className="col-span-1 font-bold text-white">Flat Fee</div>
                            <div className="text-center text-emerald-400">₹5 - 25 L</div>
                            <div className="text-center text-parchment/60 text-xs">Standard Books</div>
                            <div className="text-center text-parchment/60 text-xs">Cost Certainty</div>
                        </div>
                        <div className="grid grid-cols-4 p-4 items-center bg-white/[0.02]">
                            <div className="col-span-1 font-bold text-white">Per Word</div>
                            <div className="text-center text-emerald-400">₹5 - 15 / word</div>
                            <div className="text-center text-parchment/60 text-xs">Variable Scope</div>
                            <div className="text-center text-parchment/60 text-xs">Getting Paid for Creep</div>
                        </div>
                        <div className="grid grid-cols-4 p-4 items-center">
                            <div className="col-span-1 font-bold text-white">Retainer</div>
                            <div className="text-center text-emerald-400">₹1 - 3 L / mo</div>
                            <div className="text-center text-parchment/60 text-xs">Long Term</div>
                            <div className="text-center text-parchment/60 text-xs">Steady Cashflow</div>
                        </div>
                    </div>
                </div>
            </figure>

            {/* Paragraph 14 */}
            <p className="mb-6">
                Step Five: Protect Your Scope. Include these clauses in every contract: X number of revisions included, usually two rounds. Additional revisions cost ₹X per round, stated upfront. Add a scope creep clause that says "If word count exceeds the agreed amount by more than ten percent, an additional fee of ₹Y applies." This protects you from the client who keeps adding "just one more chapter."
            </p>

            {/* Paragraph 15 - Real Example */}
            <h3 ref={triggerRef} className="text-2xl font-bold text-white mt-12 mb-6">Real Example: Rohan's ₹12 Lakh Deal</h3>
            <p className="mb-6">
                Rohan, a thirty-two-year-old writer in Delhi, had published two novels but was earning ₹40,000 per month from freelancing. He saw a LinkedIn post from a fintech CEO saying "I really need to write a book about financial literacy." Rohan sent a direct message, shared his portfolio, and closed a ₹12 lakh ghostwriting deal for a fifty-five-thousand-word book to be delivered in four months. The payment breakdown was ₹3.6 lakh upfront, ₹3.6 lakh at first draft, and ₹4.8 lakh at final manuscript delivery. That single project equaled ten months of his previous income, and it took him just four months to complete while still doing some lighter freelance work on the side.
            </p>
            <LoveAnthologyModal isOpen={showModal} onClose={() => setShowModal(false)} />

            {/* Visual 7: Success Story Card */}
            <figure className="my-12">
                <Card className="bg-gradient-to-br from-ink-900 to-emerald-950/20 border-emerald-500/30 p-6">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-ink-black font-bold text-xl shrink-0">R</div>
                        <div>
                            <h4 className="font-bold text-white text-lg">Rohan's Jump</h4>
                            <p className="text-parchment/60 text-sm italic">From ₹40k/mo freelancer to ₹12L deal</p>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-4 text-sm font-sans">
                        <div className="flex-1 bg-black/40 p-3 rounded border border-white/5">
                            <div className="text-parchment/40 text-xs uppercase">Before</div>
                            <div className="text-lg font-bold text-white">₹40,000</div>
                            <div className="text-[10px] text-parchment/40">Monthly Income</div>
                        </div>
                        <div className="flex items-center justify-center text-emerald-500">
                            <ArrowRight className="w-5 h-5" />
                        </div>
                        <div className="flex-1 bg-emerald-500/10 p-3 rounded border border-emerald-500/40">
                            <div className="text-emerald-400/60 text-xs uppercase">The Deal</div>
                            <div className="text-lg font-bold text-emerald-400">₹12,00,000</div>
                            <div className="text-[10px] text-emerald-400/60">Single Project (4 Mo)</div>
                        </div>
                    </div>
                </Card>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 1.4: Real world results. Accessing the right client changes the decimal place of your income.
                </figcaption>
            </figure>


            {/* Paragraph 16 - Common Traps */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Common Traps</h3>
            <p className="mb-6">
                Red flag number one: the client wants to "see a sample chapter first" before agreeing to pay anything. They're fishing for free work. Tell them you're happy to share your portfolio samples, but custom work requires a deposit.
            </p>
            <p className="mb-6">
                Red flag number two: "Let's do a royalty split instead of payment." Unless they're a proven bestselling author with an existing platform, this offer is worthless. Future hypothetical money is not the same as money in your account today.
            </p>
            <p className="mb-6">
                Red flag number three: vague timelines and no deadline penalties for client delays. Lock in specific deadlines with penalties when the client causes delays by not providing feedback or materials on time. Otherwise you'll be waiting months for their input while other projects pile up.
            </p>

            {/* Paragraph 17 - Real Numbers Snapshot */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Real Numbers Snapshot</h3>
            <p className="mb-6">
                Conservative model for year one: complete two ghostwriting projects at ₹8 lakh each for ₹16 lakh per year. Add six speeches at ₹20,000 each for ₹1.2 lakh per year. Total from ghostwriting alone: ₹17.2 lakh.
            </p>
            <p className="mb-6">
                Aggressive model for year two and beyond: complete three projects at ₹12 lakh each for ₹36 lakh per year. Land one international client at fifteen thousand dollars, which is roughly ₹12 lakh, for another ₹12 lakh. Total: ₹48 lakh per year from ghostwriting.
            </p>

            {/* Action Box */}
            <div className="mt-16 bg-gradient-to-r from-emerald-900/40 to-ink-900 border border-emerald-500/50 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <CheckCircle2 className="w-32 h-32 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-ink-black text-sm">🚀</span>
                    ACTION BOX: Start Your Ghostwriting Pipeline This Week
                </h3>
                <div className="space-y-6 relative z-10 font-sans">
                    <div className="flex gap-4">
                        <div className="w-24 shrink-0 font-bold text-emerald-400 Uppercase text-sm mt-1">Monday</div>
                        <div className="text-parchment/80">Write your three sample chapters in business, memoir, and fiction styles.</div>
                    </div>
                    <div className="w-full h-px bg-white/5" />
                    <div className="flex gap-4">
                        <div className="w-24 shrink-0 font-bold text-emerald-400 Uppercase text-sm mt-1">Wednesday</div>
                        <div className="text-parchment/80">Create your one-page portfolio PDF with bio and contact information.</div>
                    </div>
                    <div className="w-full h-px bg-white/5" />
                    <div className="flex gap-4">
                        <div className="w-24 shrink-0 font-bold text-emerald-400 Uppercase text-sm mt-1">Friday</div>
                        <div className="text-parchment/80">Send ten LinkedIn cold messages using the template above.</div>
                    </div>

                    <div className="bg-emerald-500/10 rounded-lg p-4 mt-6 border border-emerald-500/30 text-center">
                        <span className="text-emerald-400 font-bold uppercase tracking-widest text-sm">Goal: Book two discovery calls by end of week.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PagesChapterGhostwriting;
