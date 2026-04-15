import React from 'react';
import {
    Users, BookOpen, PenTool, CheckCircle,
    TrendingUp, Calendar, DollarSign, Target,
    FileText, Glasses, MessageCircle, Briefcase
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PagesChapterCoaching = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 font-serif text-lg md:text-xl leading-relaxed text-parchment/90">
            {/* Title Section */}
            <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 border-emerald-500/50 text-emerald-400 tracking-[0.2em] font-sans">
                    STREAM 7
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">BOOK COACHING AND EDITING – ₹40,000 TO ₹6 LAKH PER CLIENT</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-gold mx-auto rounded-full" />
            </div>

            {/* Paragraph 1 */}
            <p className="mb-6 first-letter:text-5xl first-letter:text-emerald-400 first-letter:font-bold first-letter:mr-2 first-letter:float-left">
                Book coaching and editing lets you monetize your writing expertise without doing the actual writing. You guide aspiring authors through their book journey, from idea to published manuscript. It's recurring revenue because writers will pay monthly for accountability, feedback, and expert guidance.
            </p>

            {/* Visual 1: The 'Guide' vs 'Writer' Concept */}
            <figure className="my-12">
                <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-ink-900 border-white/10 p-6 flex flex-col items-center text-center opacity-70 hover:opacity-100 transition-opacity">
                        <PenTool className="w-8 h-8 text-parchment/60 mb-3" />
                        <h3 className="text-parchment font-bold mb-1">Writer</h3>
                        <p className="text-xs text-parchment/40">"I write the words."</p>
                        <div className="mt-4 text-sm font-mono text-parchment/60">One-time Fee</div>
                    </Card>
                    <Card className="bg-emerald-900/20 border-emerald-500/30 p-6 flex flex-col items-center text-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 bg-emerald-500 text-ink-black text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest">Recurring</div>
                        <Users className="w-8 h-8 text-emerald-400 mb-3" />
                        <h3 className="text-white font-bold mb-1">Coach</h3>
                        <p className="text-xs text-emerald-200/60">"I guide the author."</p>
                        <div className="mt-4 text-sm font-mono text-emerald-400">Monthly Retainer</div>
                    </Card>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 7.1: The Model Shift. Moving from "Done-For-You" to "Done-With-You" creates recurring income.
                </figcaption>
            </figure>


            {/* Paragraph 2 - The Market */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">The Book Coaching Market</h3>
            <p className="mb-6">
                Developmental coaching helps writers structure their book, develop their ideas, and stay accountable through the writing process. Fees run ₹40,000 to ₹2 lakh for a three to six-month engagement, usually including bi-weekly calls, manuscript feedback, and email support.
            </p>

            {/* Paragraph 3 */}
            <p className="mb-6">
                Manuscript editing comes in three levels. Developmental editing focuses on structure, pacing, and big-picture issues, charging ₹2 to ₹8 per word or ₹1.5 to 6 lakh for a full novel. Line editing addresses sentence-level issues and clarity, charging ₹1 to ₹4 per word or ₹75,000 to 3 lakh per book. Copy editing covers grammar, consistency, and formatting, charging ₹0.50 to ₹2 per word or ₹40,000 to 1.5 lakh per manuscript.
            </p>

            {/* Paragraph 4 */}
            <p className="mb-6">
                Book proposal coaching for writers targeting traditional publishers charges ₹50,000 to ₹2 lakh for helping them create a compelling proposal, sample chapters, and agent query letter.
            </p>

            {/* Paragraph 5 */}
            <p className="mb-6">
                Hybrid packages combine coaching and editing, running ₹2 to 6 lakh for complete hand-holding from outline to polished manuscript over six to twelve months.
            </p>

            {/* Visual 2: Market Rates & Service Tiers Table */}
            <figure className="my-12 overflow-hidden rounded-xl border border-white/10">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="bg-white/5 text-parchment/50 font-sans uppercase text-[10px] tracking-wider">
                            <th className="p-4 font-normal">Service Type</th>
                            <th className="p-4 font-normal">Focus</th>
                            <th className="p-4 font-normal text-right">Fee Range</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-sans">
                        <tr className="bg-emerald-900/10">
                            <td className="p-4 font-bold text-white">Dev Coaching</td>
                            <td className="p-4 text-parchment/60">Accountability & Structure</td>
                            <td className="p-4 text-emerald-400 text-right font-bold">₹40k - 2L</td>
                        </tr>
                        <tr>
                            <td className="p-4 font-bold text-parchment">Dev Editing</td>
                            <td className="p-4 text-parchment/60">Big Picture & Plot</td>
                            <td className="p-4 text-parchment/80 text-right">₹1.5L - 6L</td>
                        </tr>
                        <tr>
                            <td className="p-4 font-bold text-parchment">Line Editing</td>
                            <td className="p-4 text-parchment/60">Flow & Clarity</td>
                            <td className="p-4 text-parchment/80 text-right">₹75k - 3L</td>
                        </tr>
                        <tr>
                            <td className="p-4 font-bold text-parchment">Copy Editing</td>
                            <td className="p-4 text-parchment/60">Grammar & Mechanics</td>
                            <td className="p-4 text-parchment/80 text-right">₹40k - 1.5L</td>
                        </tr>
                        <tr className="bg-gold/5">
                            <td className="p-4 font-bold text-gold">Hybrid Package</td>
                            <td className="p-4 text-parchment/60">Full Hand-holding</td>
                            <td className="p-4 text-gold text-right font-bold">₹2L - 6L</td>
                        </tr>
                    </tbody>
                </table>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 7.2: The Editor's Menu. Developmental work (big picture) commands the highest fees.
                </figcaption>
            </figure>


            {/* Paragraph 6 - Who Hires */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Who Hires Book Coaches</h3>
            <p className="mb-6">
                First-time authors with book ideas but no writing experience are willing to pay ₹60,000 to ₹1.5 lakh for structure, accountability, and expert feedback to actually finish their book.
            </p>

            {/* Paragraph 7 */}
            <p className="mb-6">
                Experienced writers working on a new genre or complex project hire coaches at ₹1 to 3 lakh for specialized expertise and objective feedback.
            </p>

            {/* Paragraph 8 */}
            <p className="mb-6">
                Entrepreneurs and executives writing business books pay ₹1.5 to 4 lakh because they value their time and want expert guidance to create a professional product.
            </p>

            {/* Paragraph 9 */}
            <p className="mb-6">
                Self-publishing authors preparing for launch invest ₹75,000 to 2.5 lakh in editing to ensure their book competes with traditionally published titles.
            </p>

            {/* Visual 3: Client Persona Cards */}
            <figure className="my-12">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center"><Briefcase className="w-4 h-4 text-blue-400" /></div>
                            <h4 className="font-bold text-white text-sm">The Executive</h4>
                        </div>
                        <p className="text-xs text-parchment/60 mb-2">Needs a professional business book effectively. Values time over money.</p>
                        <div className="text-right text-emerald-400 font-bold text-sm">Pays: ₹1.5L - 4L</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center"><BookOpen className="w-4 h-4 text-purple-400" /></div>
                            <h4 className="font-bold text-white text-sm">First-Time Author</h4>
                        </div>
                        <p className="text-xs text-parchment/60 mb-2">Needs structure & accountability to finally finish. Needs "hand-holding".</p>
                        <div className="text-right text-emerald-400 font-bold text-sm">Pays: ₹60k - 1.5L</div>
                    </div>
                </div>
            </figure>


            {/* Paragraph 10 - The System */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">The Coaching System</h3>
            <p className="mb-6">
                Step one: Define your specialty and ideal client. Don't be a generic "book coach." Specialize in business books for executives, romance novels for women, memoirs for retirees, or self-help books for coaches. Your marketing becomes easier and you can charge premium rates as the go-to expert in that niche.
            </p>

            {/* Paragraph 11 */}
            <p className="mb-6">
                Step two: Create a signature framework. Develop a proprietary system like "The 90-Day Novel Framework" or "The Business Book Blueprint." Break it into clear phases with specific milestones. Having a proven methodology makes clients confident they'll get results.
            </p>

            {/* Paragraph 12 */}
            <p className="mb-6">
                Step three: Package your services with clear deliverables. Create three tiers: the basic package might be monthly group coaching at ₹15,000 per month for six months. The standard package is bi-weekly one-on-one calls plus manuscript feedback at ₹35,000 per month for six months. The premium package includes weekly calls, detailed manuscript feedback, editing, and publishing guidance at ₹75,000 per month for six to nine months.
            </p>

            {/* Paragraph 13 */}
            <p className="mb-6">
                Step four: Market through content and authority building. Write articles on Medium or LinkedIn about the book-writing process. Create YouTube videos sharing writing tips. Host a free webinar on "How to Finally Write Your Book in 90 Days." Build an email list of aspiring authors by offering a free book outline template or first chapter checklist.
            </p>

            {/* Paragraph 14 */}
            <p className="mb-6">
                Step five: The discovery call process. When someone inquires, book a thirty-minute free discovery call. Ask about their book idea, writing experience, timeline, and budget. Share how your system works and which package fits their needs. If they're serious and qualified, send a proposal with investment options and next steps. Close rate should be thirty to fifty percent of qualified discovery calls.
            </p>

            {/* Visual 4: The 5-Step Coaching Roadmap */}
            <figure className="my-12 relative pl-4 border-l border-white/10 font-sans">
                {[
                    { step: "Specialty", desc: "Niche Down (e.g. Memoirs for Retirees)" },
                    { step: "Framework", desc: "Create Your Proprietary System" },
                    { step: "Package", desc: "3 Tiers: Basic, Standard, Premium" },
                    { step: "Authority", desc: "Content Marketing & Webinars" },
                    { step: "Sales", desc: "Discovery Call & Proposal" }
                ].map((item, i) => (
                    <div key={i} className="mb-6 last:mb-0 relative">
                        <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-ink-900 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-wide">{item.step}</h4>
                        <p className="text-parchment/60 text-xs mt-1">{item.desc}</p>
                    </div>
                ))}
                <figcaption className="text-left pl-4 text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 7.3: The Coach's Blueprint. Systematize your genius to scale beyond hourly rates.
                </figcaption>
            </figure>


            {/* Paragraph 15 - Editing Rates */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Editing Rates and Process</h3>
            <p className="mb-6">
                For developmental editing, read the full manuscript, create a detailed editorial letter covering structure, character development, pacing, plot holes, and theme consistency. Include margin comments throughout the document. Timeline: four to six weeks for a novel. Fee: ₹2 to 8 per word based on manuscript quality and your experience.
            </p>

            {/* Paragraph 16 */}
            <p className="mb-6">
                For line editing, go sentence by sentence improving clarity, flow, and readability while preserving the author's voice. Use track changes in Microsoft Word or Google Docs. Timeline: three to five weeks. Fee: ₹1 to 4 per word.
            </p>

            {/* Paragraph 17 */}
            <p className="mb-6">
                For copy editing, fix grammar, spelling, punctuation, consistency in style, and formatting. This is the final polish before publication. Timeline: two to three weeks. Fee: ₹0.50 to 2 per word.
            </p>

            {/* Paragraph 18 */}
            <p className="mb-6">
                Set payment milestones: fifty percent upfront, fifty percent on delivery. For larger projects, use three milestones: thirty-three percent upfront, thirty-three percent at halfway point, thirty-four percent on final delivery.
            </p>

            {/* Visual 5: Simplified Timeline */}
            <figure className="my-12">
                <div className="flex items-center justify-between text-center text-xs font-sans text-parchment/60 mb-2">
                    <span>Start</span>
                    <span>Finish</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden flex">
                    <div className="w-1/3 bg-blue-500/50 hover:bg-blue-500 transition-colors" title="Developmental"></div>
                    <div className="w-1/3 bg-purple-500/50 hover:bg-purple-500 transition-colors" title="Line Edit"></div>
                    <div className="w-1/3 bg-emerald-500/50 hover:bg-emerald-500 transition-colors" title="Copy Edit"></div>
                </div>
                <div className="flex justify-between mt-2 text-[10px] uppercase font-bold tracking-widest text-parchment/40">
                    <div className="text-blue-400">Structure</div>
                    <div className="text-purple-400">Flow</div>
                    <div className="text-emerald-400">Polish</div>
                </div>
            </figure>


            {/* Paragraph 19 - Real Example */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Real Example: Divya's ₹18.3 Lakh Coaching Practice</h3>
            <p className="mb-6">
                Divya, forty-one years old in Delhi, published three romance novels traditionally and self-published two more. She started offering book coaching for romance writers at ₹25,000 per month for a six-month program including bi-weekly calls and chapter feedback.
            </p>
            <p className="mb-6">
                Her first client was a referral from a writing group. That client finished her novel and self-published successfully, giving Divya a glowing testimonial. Divya used that case study to attract three more clients at ₹30,000 per month. She also offered developmental editing for ₹3 per word, completing four editing projects that year at ₹2 to 3.5 lakh each.
            </p>
            <p className="mb-6">
                Year-one revenue: four coaching clients at six months each averaging ₹28,000 per month equals ₹6.7 lakh, plus four editing projects totaling ₹11.6 lakh. Total: ₹18.3 lakh working twenty to twenty-five hours per week.
            </p>
            <p className="mb-6">
                Year two, she raised coaching fees to ₹40,000 per month, had six clients running at any given time, and completed six editing projects. Revenue jumped to ₹31.8 lakh.
            </p>

            {/* Visual 6: Divya's Income Comparison */}
            <figure className="my-12">
                <div className="bg-ink-900 border border-white/10 p-6 rounded-xl">
                    <h4 className="text-center font-sans font-bold text-white text-sm uppercase tracking-widest mb-6">Annual Revenue Growth</h4>
                    <div className="flex flex-col gap-4">
                        {/* Year 1 */}
                        <div className="flex items-center gap-4 group">
                            <div className="w-16 text-xs text-parchment/60 font-bold uppercase">Year 1</div>
                            <div className="flex-1 h-8 bg-white/5 rounded-r overflow-hidden relative">
                                <div className="absolute top-0 left-0 h-full bg-blue-500 w-[57%]"></div> {/* 18.3 is ~57% of 31.8 */}
                                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-white z-10">₹18.3L</span>
                            </div>
                        </div>
                        {/* Year 2 */}
                        <div className="flex items-center gap-4 group">
                            <div className="w-16 text-xs text-emerald-400 font-bold uppercase">Year 2</div>
                            <div className="flex-1 h-8 bg-white/5 rounded-r overflow-hidden relative">
                                <div className="absolute top-0 left-0 h-full bg-emerald-500 w-full shadow-[0_0_20px_rgba(16,185,129,0.4)]"></div>
                                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-ink-black z-10">₹31.8L</span>
                            </div>
                        </div>
                    </div>
                </div>
            </figure>


            {/* Paragraph 20 - Mistakes */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Common Mistakes</h3>
            <p className="mb-6">
                Mistake number one: taking on clients who aren't serious about finishing. If they haven't written anything yet and aren't willing to commit to a paid program, they'll waste your time. Qualify clients carefully.
            </p>
            <p className="mb-6">
                Mistake number two: not having a structured curriculum or framework. Coaching calls that are just free-form conversation don't produce results. Build a week-by-week plan with specific milestones.
            </p>
            <p className="mb-6">
                Mistake number three: undercharging because you feel bad asking for money from fellow writers. Your expertise saves them years of trial and error and hundreds of hours. That's worth ₹50,000 to ₹2 lakh.
            </p>
            <p className="mb-6">
                Mistake number four: trying to coach or edit in genres you don't know well. Stick to your expertise. Refer clients outside your wheelhouse to specialists and ask for reciprocal referrals.
            </p>

            {/* Paragraph 21 - Snapshot */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Real Numbers Snapshot</h3>
            <p className="mb-6">
                First six months: two coaching clients at ₹25,000 per month for six months each. Plus two editing projects at ₹1.2 lakh each. Revenue: ₹3 lakh from coaching plus ₹2.4 lakh from editing equals ₹5.4 lakh.
            </p>
            <p className="mb-6">
                Year one: four coaching clients running simultaneously at ₹30,000 per month average. Plus five editing projects averaging ₹1.8 lakh. Revenue: ₹14.4 lakh from coaching plus ₹9 lakh from editing equals ₹23.4 lakh total.
            </p>
            <p className="mb-6">
                Year two: six clients at ₹40,000 per month. Plus seven editing projects at ₹2.5 lakh average. Revenue: ₹28.8 lakh from coaching plus ₹17.5 lakh from editing equals ₹46.3 lakh total.
            </p>


            {/* Action Box */}
            <div className="mt-16 bg-gradient-to-r from-emerald-900/40 to-ink-900 border border-emerald-500/50 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Glasses className="w-32 h-32 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-ink-black text-sm">🚀</span>
                    ACTION BOX: Launch Your Coaching Practice
                </h3>
                <div className="space-y-6 relative z-10 font-sans">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <div className="font-bold text-emerald-400 Uppercase text-sm mb-2">This Week</div>
                            <ul className="list-disc list-inside text-parchment/80 space-y-2 text-sm">
                                <li>Define your niche (e.g., Business Books)</li>
                                <li>Create signature coaching framework</li>
                                <li>Write service descriptions for 3 tiers</li>
                            </ul>
                        </div>
                        <div>
                            <div className="font-bold text-emerald-400 Uppercase text-sm mb-2">Next Week</div>
                            <ul className="list-disc list-inside text-parchment/80 space-y-2 text-sm">
                                <li>Publish 3 content pieces (Medium/LinkedIn)</li>
                                <li>Create lead magnet (Chapter Outline)</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-emerald-500/10 rounded-lg p-4 mt-6 border border-emerald-500/30 text-center">
                        <span className="text-emerald-400 font-bold uppercase tracking-widest text-sm">Goal: Book 3 discovery calls & close 1 client in 45 days</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PagesChapterCoaching;
