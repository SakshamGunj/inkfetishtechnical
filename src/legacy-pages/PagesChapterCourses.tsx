import React from 'react';
import {
    GraduationCap, Video, Users, DollarSign,
    BarChart3, CheckCircle2, Calendar, Mail,
    Layout, ArrowUpRight, PlayCircle
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PagesChapterCourses = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 font-serif text-lg md:text-xl leading-relaxed text-parchment/90">
            {/* Title Section */}
            <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 border-emerald-500/50 text-emerald-400 tracking-[0.2em] font-sans">
                    STREAM 4
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">ONLINE COURSES – ₹5 TO 50 LAKH PER YEAR</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-gold mx-auto rounded-full" />
            </div>

            {/* Paragraph 1 */}
            <p className="mb-6 first-letter:text-5xl first-letter:text-emerald-400 first-letter:font-bold first-letter:mr-2 first-letter:float-left">
                Online courses turn your knowledge into a product that sells while you sleep. The Indian e-learning market is exploding, and writers have a unique advantage: you know how to structure information, tell stories, and explain complex concepts clearly. Those are exactly the skills that make great courses.
            </p>

            {/* Visual 1: Course Economics Pyramid */}
            <figure className="my-12">
                <div className="flex flex-col items-center gap-2 max-w-lg mx-auto">
                    {/* Expert Tier */}
                    <div className="w-[30%] bg-emerald-500 p-4 rounded-t-xl text-center shadow-[0_0_20px_rgba(16,185,129,0.4)] z-30 relative group hover:scale-105 transition-transform">
                        <div className="text-ink-black font-bold uppercase text-xs tracking-widest mb-1">Expert</div>
                        <div className="text-ink-black font-bold text-lg">₹5Cr+</div>
                        <div className="text-[10px] text-ink-900/60 font-mono">High Ticket Masterminds</div>
                    </div>
                    {/* Intermediate Tier */}
                    <div className="w-[60%] bg-emerald-600/80 p-4 text-center z-20 relative border-t border-white/10 group hover:scale-105 transition-transform">
                        <div className="text-white font-bold uppercase text-xs tracking-widest mb-1">Intermediate</div>
                        <div className="text-white font-bold text-lg">₹15-80L</div>
                        <div className="text-[10px] text-white/60 font-mono">Mid-Tier + Ads</div>
                    </div>
                    {/* Beginner Tier */}
                    <div className="w-full bg-emerald-900/40 p-4 rounded-b-xl text-center z-10 relative border-t border-emerald-500/20 group hover:scale-105 transition-transform">
                        <div className="text-emerald-400 font-bold uppercase text-xs tracking-widest mb-1">Beginner</div>
                        <div className="text-emerald-400 font-bold text-lg">₹25k-4L</div>
                        <div className="text-[10px] text-emerald-400/60 font-mono">Low Ticket Launch</div>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 4.1: The Creator Income Pyramid. Climb from low-ticket volumes to high-ticket exclusivity.
                </figcaption>
            </figure>

            {/* Paragraph 2 - Economics Text */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">The Course Economics</h3>
            <p className="mb-6">
                Beginner course creators in India price their courses at ₹499 to ₹1,999 and sell to small audiences of fifty to two hundred students per launch. That's ₹25,000 to ₹4 lakh per course launch. Intermediate creators price at ₹2,999 to ₹7,999 and sell to five hundred to one thousand students through larger email lists and paid ads. That's ₹15 to 80 lakh per year. Expert creators with established personal brands charge ₹9,999 to ₹49,999 for high-ticket courses and masterminds, selling to fifty to three hundred premium buyers per year for ₹5 to 1.5 crore annually.
            </p>

            {/* Paragraph 3 */}
            <p className="mb-6">
                The platform you choose matters. Graphy takes zero to three percent and gives you full control, making it ideal for established creators. Freshlearn charges similar rates with better analytics. Teachable works well for international audiences but takes five percent of revenue on their free plan. Udemy gives you a massive audience but keeps fifty to seventy-five percent of your revenue, which makes it good for validation but terrible for profit.
            </p>

            {/* Visual 2: Platform Comparison Matrix */}
            <figure className="my-12 overflow-hidden rounded-xl border border-white/10">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="bg-white/5 text-parchment/50 font-sans uppercase text-xs tracking-wider">
                            <th className="p-4 font-normal">Platform</th>
                            <th className="p-4 font-normal">Fee Structure</th>
                            <th className="p-4 font-normal">Best For</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-sans">
                        <tr className="bg-emerald-900/10">
                            <td className="p-4 font-bold text-white">Graphy</td>
                            <td className="p-4 text-emerald-400">0-3% Fee</td>
                            <td className="p-4 text-parchment/80">Established Creators (Control)</td>
                        </tr>
                        <tr>
                            <td className="p-4 font-bold text-white">Freshlearn</td>
                            <td className="p-4 text-emerald-400">Low Fees</td>
                            <td className="p-4 text-parchment/80">Analytics & Data</td>
                        </tr>
                        <tr>
                            <td className="p-4 font-bold text-white">Teachable</td>
                            <td className="p-4 text-yellow-400">5% (Free Plan)</td>
                            <td className="p-4 text-parchment/80">International Audiences</td>
                        </tr>
                        <tr className="bg-red-900/10">
                            <td className="p-4 font-bold text-white">Udemy</td>
                            <td className="p-4 text-red-400">50-75% Fee</td>
                            <td className="p-4 text-parchment/80">Validation Only (Low Profit)</td>
                        </tr>
                    </tbody>
                </table>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 4.2: Choose your infrastructure wisely. Don't build your empire on rented land that takes 75% of your harvest.
                </figcaption>
            </figure>


            {/* Paragraph 4 - Topics */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Course Topics That Sell in the Indian Market</h3>
            <p className="mb-6">
                Writing and content creation courses teach freelance writing, copywriting, storytelling for business, or how to write a novel. Your target audience is aspiring writers and content creators aged twenty-two to forty. Price range: ₹1,999 to ₹9,999. Annual potential: ₹8 to 30 lakh with good marketing.
            </p>

            {/* Paragraph 5 */}
            <p className="mb-6">
                Publishing and book launch courses cover self-publishing, book marketing, Amazon ads for authors, or how to land a traditional publishing deal. Your audience is authors who've written manuscripts but don't know what to do next. Price range: ₹2,999 to ₹12,999. Annual potential: ₹5 to 25 lakh.
            </p>

            {/* Paragraph 6 */}
            <p className="mb-6">
                Business writing and communication courses teach email writing for professionals, business proposal writing, LinkedIn content strategy, or executive communication. Corporate professionals pay premium rates for career advancement skills. Price range: ₹4,999 to ₹19,999. Annual potential: ₹10 to 60 lakh.
            </p>

            {/* Paragraph 7 */}
            <p className="mb-6">
                Personal branding for writers courses cover building an author platform, monetizing your writing, newsletter growth, or social media for authors. Writers who want to make money from their craft will pay to learn how. Price range: ₹3,999 to ₹14,999. Annual potential: ₹8 to 40 lakh.
            </p>

            {/* Visual 3: Topics Grid */}
            <figure className="my-12 grid md:grid-cols-2 gap-4">
                {[
                    { title: "Writing & Content", range: "₹2k - 10k", pot: "₹8-30L/yr", icon: PlayCircle },
                    { title: "Publishing & Launch", range: "₹3k - 13k", pot: "₹5-25L/yr", icon: ArrowUpRight },
                    { title: "Biz Communication", range: "₹5k - 20k", pot: "₹10-60L/yr", icon: Mail, highlight: true },
                    { title: "Personal Branding", range: "₹4k - 15k", pot: "₹8-40L/yr", icon: Users },
                ].map((item, i) => (
                    <Card key={i} className={`p-5 border ${item.highlight ? 'bg-emerald-950/20 border-emerald-500/50' : 'bg-white/5 border-white/10'}`}>
                        <div className="flex justify-between items-start mb-4">
                            <item.icon className={`w-6 h-6 ${item.highlight ? 'text-emerald-400' : 'text-parchment/60'}`} />
                            <Badge variant="secondary" className="bg-black/40 text-parchment/60 font-mono text-[10px]">{item.range}</Badge>
                        </div>
                        <h4 className={`font-bold text-lg mb-1 ${item.highlight ? 'text-white' : 'text-parchment'}`}>{item.title}</h4>
                        <div className={`text-sm font-bold ${item.highlight ? 'text-emerald-400' : 'text-parchment/40'}`}>Potential: {item.pot}</div>
                    </Card>
                ))}
            </figure>


            {/* Paragraph 8 - The 6 Week System */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">The Course Creation System in Six Weeks</h3>
            <p className="mb-6">
                Week one: Validate your idea before building anything. Create a simple Google Form survey asking your target audience what their biggest challenge is in [your topic]. Share it in Facebook groups, WhatsApp writing communities, and your email list if you have one. Aim for fifty to one hundred responses. Look for patterns in the answers. If thirty people say "I don't know how to market my book," that's your course topic validated.
            </p>

            {/* Paragraph 9 */}
            <p className="mb-6">
                Week two: Pre-sell the course. Write a sales page on Notion or Google Docs describing the course you're going to create. Include the transformation promise, the curriculum outline with module names, bonuses you'll include, and the price with an early-bird discount. Share this page with your survey respondents and your network. Set a goal of ten to thirty pre-sales before you record a single video. Use Instamojo or Razorpay for payments. If you don't hit at least ten sales, your topic needs refinement.
            </p>

            {/* Paragraph 10 */}
            <p className="mb-6">
                Week three: Create your curriculum structure. Map out four to eight modules, with each module containing three to six lessons. Each lesson should be eight to fifteen minutes long. Use the framework: pain point identification, concept explanation, step-by-step process, real example or case study, action step. Write detailed outlines for every lesson before you start recording.
            </p>

            {/* Paragraph 11 */}
            <p className="mb-6">
                Week four: Record all video content. Use Loom, OBS Studio (free), or Camtasia for screen recording. For talking-head videos, use your phone camera with good lighting from a window. Record all videos in one to two intensive days to maintain consistency in energy and appearance. Don't aim for perfection on the first course—good enough is better than perfect but never launched.
            </p>

            {/* Paragraph 12 */}
            <p className="mb-6">
                Week five: Build the course platform and upload content. Set up your Graphy or Freshlearn account. Upload all videos. Add downloadable resources like templates, worksheets, and checklists as PDFs. Write lesson descriptions and module summaries. Create a welcome video explaining how to navigate the course.
            </p>

            {/* Paragraph 13 */}
            <p className="mb-6">
                Week six: Launch to your pre-buyers and first live cohort. Email everyone who pre-purchased with their login details. Offer a "founding member" group where you'll provide extra support via a WhatsApp or Telegram group for the first thirty days. Ask for testimonials and case studies from people who implement and get results. Use those testimonials for your next launch.
            </p>

            {/* Visual 4: 6-Week Roadmap */}
            <figure className="my-12">
                <div className="space-y-0.5 font-sans">
                    {['Validate (Survey)', 'Pre-Sell (Cash First)', 'Structure (Curriculum)', 'Record (Sprint)', 'Build (Platform)', 'Launch (Delivery)'].map((step, i) => (
                        <div key={i} className="flex items-center gap-4 group">
                            <div className="w-8 h-8 rounded-full bg-ink-900 border border-emerald-500/30 flex items-center justify-center shrink-0 z-10 font-bold text-xs text-emerald-400 group-hover:bg-emerald-500 group-hover:text-ink-black transition-colors">
                                {i + 1}
                            </div>
                            <div className="flex-1 bg-white/[0.03] p-3 rounded-r border-l-2 border-emerald-500/20 group-hover:border-emerald-500 group-hover:bg-white/5 transition-all">
                                <span className="text-sm font-bold text-parchment/80 group-hover:text-white">{step}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 4.3: The Sprint Schedule. Note that 'Recording' comes AFTER 'Selling'. Never build without a buyer.
                </figcaption>
            </figure>


            {/* Paragraph 14 - Marketing */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Marketing and Launching Your Course</h3>
            <p className="mb-6">
                Email list is non-negotiable. You need two hundred to five hundred people minimum for a profitable launch. Build your list by offering a free mini-course, checklist, or template related to your paid course topic. Use ConvertKit, Mailchimp, or Zoho Campaigns. Aim to grow the list by fifty to one hundred subscribers per month through content marketing and social media.
            </p>

            {/* Paragraph 15 */}
            <p className="mb-6">
                Launch sequence structure. Five to seven days before launch, start warming up your audience with valuable content emails. Three days before, send a "coming soon" announcement with early-bird pricing. Launch day: send "doors are open" email at 9 AM. Send reminder emails on days two, three, and five. Final day: send "last chance" email in the morning and "doors closing in 3 hours" in the evening. Cart close creates urgency and forces decision-making.
            </p>

            {/* Paragraph 16 */}
            <p className="mb-6">
                Organic social media strategy. Post valuable content related to your course topic daily for sixty days before launch. Use Instagram Reels showing behind-the-scenes of course creation, quick tips from the curriculum, student wins if you have them, and personal stories about why you're teaching this. On LinkedIn, write text posts sharing lessons and frameworks. Include a call-to-action to join your email list in your bio.
            </p>

            {/* Paragraph 17 */}
            <p className="mb-6">
                Paid advertising. Once you've validated the course with organic sales, invest ₹15,000 to ₹50,000 in Meta Ads targeting your ideal student demographic. Create video ads showing you teaching a concept from the course. Drive traffic to a landing page offering a free lead magnet in exchange for email signup. Nurture that list for two to four weeks before pitching the paid course.
            </p>

            {/* Visual 5: Launch Funnel */}
            <figure className="my-12">
                <Card className="bg-gradient-to-b from-ink-900 to-black p-6 border-white/10">
                    <h4 className="text-center font-sans font-bold text-white text-sm uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Launch Week Email Sequence</h4>
                    <div className="flex justify-between items-end gap-2 h-40">
                        {/* Bars representing email intensity/urgency */}
                        {['Mon (Open)', 'Tue', 'Wed', 'Thu', 'Fri (Remind)', 'Sat', 'Sun (CLOSE)'].map((day, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 group w-full">
                                <div className={`w-full rounded-t transition-all ${i === 0 || i === 6 ? 'bg-emerald-500 h-[80%]' : 'bg-white/10 h-[30%] group-hover:bg-white/20'}`}></div>
                                <div className="text-[9px] uppercase font-bold text-parchment/40 rotate-0 md:rotate-0">{day.split(' ')[0]}</div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex gap-4 justify-center text-[10px] text-parchment/60 font-mono">
                        <div className="flex items-center gap-1"><div className="w-2 h-2 bg-emerald-500 rounded-sm"></div>High Traffic</div>
                        <div className="flex items-center gap-1"><div className="w-2 h-2 bg-white/20 rounded-sm"></div>Nurture</div>
                    </div>
                </Card>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 4.4: The "Sales Spike" visualization. Most sales happen on Open Day and Close Day.
                </figcaption>
            </figure>


            {/* Paragraph 18 - Real Example */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Real Example: Karthik's ₹18.6 Lakh Copywriting Course</h3>
            <p className="mb-6">
                Karthik, twenty-eight years old in Chennai, was a freelance copywriter earning ₹80,000 per month. He created a course called "The Freelance Copywriter Blueprint" priced at ₹6,999. His curriculum covered finding clients, pricing, writing persuasive copy, and building retainer relationships.
            </p>
            <p className="mb-6">
                He built an email list of four hundred fifty subscribers over four months by posting copywriting tips on LinkedIn and offering a free "Cold Email Template Pack" as a lead magnet. His first launch sold forty-three courses in seven days for ₹3 lakh revenue. He ran two more launches that year with improved testimonials and case studies, selling sixty-one and seventy-eight courses respectively. Total year-one revenue: ₹12.7 lakh from courses, plus he continued earning ₹80,000 per month from client work.
            </p>
            <p className="mb-6">
                Year two, he doubled his email list to nine hundred subscribers, raised the price to ₹8,999, and ran three launches selling ninety, one hundred fifteen, and one hundred thirty-two courses. Year-two course revenue: ₹28.2 lakh. His course income now exceeded his freelance income, so he reduced client work and focused on growing the course business.
            </p>

            {/* Visual 6: Karthik's Growth Chart */}
            <figure className="my-12">
                <div className="flex gap-4 items-end h-64 border-b border-white/20 pb-0 px-4">
                    {/* Year 1 */}
                    <div className="w-1/2 flex flex-col justify-end h-full gap-2 group">
                        <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity mb-2">
                            <div className="text-sm font-bold text-white">₹12.7 Lakh</div>
                            <div className="text-[10px] text-parchment/40">3 Launches</div>
                        </div>
                        <div className="h-[45%] bg-white/10 border-t border-x border-white/20 rounded-t w-full mx-auto relative overflow-hidden">
                            <div className="absolute bottom-0 w-full h-[60%] bg-blue-500/20"></div> {/* Freelance income block */}
                        </div>
                        <div className="text-center border-t border-white/20 pt-2 text-xs font-bold text-parchment/60 uppercase">Year 1</div>
                    </div>

                    {/* Year 2 */}
                    <div className="w-1/2 flex flex-col justify-end h-full gap-2 group">
                        <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity mb-2">
                            <div className="text-xl font-bold text-emerald-400">₹28.2 Lakh</div>
                            <div className="text-[10px] text-parchment/40">Doubled List & Price</div>
                        </div>
                        <div className="h-full bg-emerald-500/20 border-t border-x border-emerald-500/50 rounded-t w-full mx-auto relative overflow-hidden accent-glow">
                            <div className="absolute bottom-0 w-full h-[20%] bg-blue-500/10"></div> {/* Reduced freelance income */}
                        </div>
                        <div className="text-center border-t border-white/20 pt-2 text-xs font-bold text-emerald-400 uppercase">Year 2</div>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 4.5: The Crossover Point. In Year 2, course income overtakes service income, buying back your time.
                </figcaption>
            </figure>


            {/* Paragraph 19 - Mistakes */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Common Mistakes</h3>
            <p className="mb-6">
                Mistake number one: creating the entire course before validating demand. You waste weeks or months building something nobody wants to buy.
            </p>
            <p className="mb-6">
                Mistake number two: underpricing to "get students first." A ₹499 course needs to sell one thousand copies to make ₹5 lakh. A ₹4,999 course needs to sell one hundred copies. Which is easier?
            </p>
            <p className="mb-6">
                Mistake number three: launching once and then wondering why sales stopped. Courses need evergreen funnels or repeated launches every sixty to ninety days to maintain revenue.
            </p>
            <p className="mb-6">
                Mistake number four: not collecting testimonials and success stories. Your next launch converts at double the rate when you have ten to twenty video testimonials from happy students.
            </p>

            {/* Paragraph 20 - Snapshot */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Real Numbers Snapshot</h3>
            <p className="mb-6">
                First launch scenario: four hundred email subscribers, five percent conversion rate equals twenty students. Price at ₹4,999. Revenue: ₹1 lakh.
            </p>
            <p className="mb-6">
                Three launches in year one: growing email list from four hundred to eight hundred subscribers. Average twenty-five to forty students per launch. Total students: ninety. Revenue at ₹5,999 average: ₹5.4 lakh.
            </p>
            <p className="mb-6">
                Year two scenario: twelve hundred email subscribers. Four launches. Average sixty students per launch. Total students: two hundred forty. Revenue at ₹6,999: ₹16.8 lakh.
            </p>

            {/* Action Box */}
            <div className="mt-16 bg-gradient-to-r from-emerald-900/40 to-ink-900 border border-emerald-500/50 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <GraduationCap className="w-32 h-32 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-ink-black text-sm">🚀</span>
                    ACTION BOX: Launch Your First Course
                </h3>
                <div className="space-y-6 relative z-10 font-sans">
                    <div className="space-y-4 text-parchment/80">
                        <div className="flex gap-4">
                            <div className="w-32 shrink-0 font-bold text-emerald-400 text-sm mt-1 uppercase">Week 1</div>
                            <div>Survey fifty people about their biggest challenge in your expertise area.</div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-32 shrink-0 font-bold text-emerald-400 text-sm mt-1 uppercase">Week 2</div>
                            <div>Create sales page and pre-sell to ten to thirty people.</div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-32 shrink-0 font-bold text-emerald-400 text-sm mt-1 uppercase">Weeks 3-5</div>
                            <div>Build and record the course.</div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-32 shrink-0 font-bold text-emerald-400 text-sm mt-1 uppercase">Week 6</div>
                            <div>Deliver to pre-buyers and collect testimonials.</div>
                        </div>
                    </div>

                    <div className="bg-emerald-500/10 rounded-lg p-4 mt-6 border border-emerald-500/30 text-center">
                        <span className="text-emerald-400 font-bold uppercase tracking-widest text-sm">Goal: ₹1 to 3 lakh from your first course launch.</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PagesChapterCourses;
