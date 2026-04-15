import React from 'react';
import {
    Mic2, Users, Presentation, Video,
    Globe, Mail, Calendar, TrendingUp,
    CheckCircle2, ArrowRight, MessageSquare
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PagesChapterSpeaking = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 font-serif text-lg md:text-xl leading-relaxed text-parchment/90">
            {/* Title Section */}
            <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 border-emerald-500/50 text-emerald-400 tracking-[0.2em] font-sans">
                    STREAM 5
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">SPEAKING AND WORKSHOPS – ₹25,000 TO ₹5 LAKH PER GIG</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-gold mx-auto rounded-full" />
            </div>

            {/* Paragraph 1 */}
            <p className="mb-6 first-letter:text-5xl first-letter:text-emerald-400 first-letter:font-bold first-letter:mr-2 first-letter:float-left">
                Speaking turns your writing expertise into high-ticket, high-impact income. One ninety-minute workshop can pay what three weeks of freelancing pays. One keynote speech can equal a month's worth of article writing. The leverage is insane, and you're building authority that feeds all your other income streams.
            </p>

            {/* Visual 1: The Leverage Multiplier */}
            <figure className="my-12">
                <div className="grid md:grid-cols-2 gap-8 items-center bg-white/5 border border-white/10 rounded-xl p-8">
                    <div className="text-center space-y-2 opacity-60 grayscale filter">
                        <div className="text-xs uppercase font-sans tracking-widest text-parchment/60">Freelancing</div>
                        <div className="text-3xl font-bold text-white">3 Weeks</div>
                        <div className="text-[10px] text-parchment/40">Writing Articles</div>
                    </div>
                    <div className="relative text-center space-y-2">
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-emerald-500 text-ink-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.5)]">Equal Income</div>
                        <div className="text-xs uppercase font-sans tracking-widest text-emerald-400">Speaking</div>
                        <div className="text-5xl font-bold text-emerald-400">90 Mins</div>
                        <div className="text-[10px] text-emerald-400/60">Single Workshop</div>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 5.1: The Leverage Equation. Why trade weeks for money when you can trade minutes?
                </figcaption>
            </figure>

            {/* Paragraph 2 - The Market */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">The Speaking Market in India</h3>
            <p className="mb-6">
                Corporate workshops pay ₹40,000 to ₹3 lakh per session depending on company size and your expertise level. Topics that pay well: content marketing strategy, business writing skills, storytelling for sales, leadership communication, personal branding for executives.
            </p>

            {/* Paragraph 3 */}
            <p className="mb-6">
                College and university talks pay ₹10,000 to ₹50,000 per event. Lower fees but easier to book when starting out, plus you build testimonials and video footage.
            </p>

            {/* Paragraph 4 */}
            <p className="mb-6">
                Writing conferences and literary festivals pay ₹15,000 to ₹1.5 lakh per session depending on the event's prestige and your profile. Jaipur Literature Festival, Bangalore Literature Festival, and Mumbai Litfest are top-tier.
            </p>

            {/* Paragraph 5 */}
            <p className="mb-6">
                Virtual workshops on Zoom pay ₹25,000 to ₹2 lakh and have no travel overhead. You can run these monthly and build a predictable income stream.
            </p>

            {/* Paragraph 6 */}
            <p className="mb-6">
                International speaking gigs pay five hundred to five thousand dollars USD per event, which is ₹40,000 to ₹4 lakh, plus they often cover travel and accommodation.
            </p>

            {/* Visual 2: Market Rate Pyramid */}
            <figure className="my-12 relative">
                <div className="space-y-2">
                    {/* International */}
                    <div className="w-[40%] mx-auto bg-purple-900/40 p-3 text-center border border-purple-500/30 rounded-t-lg">
                        <Globe className="w-5 h-5 mx-auto text-purple-400 mb-1" />
                        <div className="text-sm font-bold text-purple-300">International</div>
                        <div className="text-xs text-purple-300/60">₹40k - 4 Lakh</div>
                    </div>
                    {/* Corporate */}
                    <div className="w-[60%] mx-auto bg-emerald-900/40 p-3 text-center border border-emerald-500/30">
                        <Users className="w-5 h-5 mx-auto text-emerald-400 mb-1" />
                        <div className="text-sm font-bold text-emerald-400">Corporate</div>
                        <div className="text-xs text-emerald-400/60">₹40k - 3 Lakh</div>
                    </div>
                    {/* Virtual */}
                    <div className="w-[80%] mx-auto bg-blue-900/30 p-3 text-center border border-blue-500/20">
                        <Video className="w-5 h-5 mx-auto text-blue-400 mb-1" />
                        <div className="text-sm font-bold text-blue-300">Virtual</div>
                        <div className="text-xs text-blue-300/60">₹25k - 2 Lakh</div>
                    </div>
                    {/* Colleges/Festivals */}
                    <div className="w-full mx-auto bg-white/5 p-3 text-center border border-white/10 rounded-b-lg">
                        <Presentation className="w-5 h-5 mx-auto text-parchment/50 mb-1" />
                        <div className="text-sm font-bold text-parchment/80">Colleges & Litfests</div>
                        <div className="text-xs text-parchment/40">₹10k - 1.5 Lakh</div>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 5.2: The Speaking Ladder. Start at colleges to build footage, move to corporate for income.
                </figcaption>
            </figure>


            {/* Paragraph 7 - Types */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Types of Speaking Engagements</h3>
            <p className="mb-6">
                Keynote speeches run thirty to sixty minutes, focus on one big idea or story, and pay the highest fees of ₹50,000 to ₹5 lakh depending on audience size and event budget. You need strong stage presence, a signature talk, and video proof of past performances.
            </p>

            {/* Paragraph 8 */}
            <p className="mb-6">
                Workshops and training sessions run two to four hours, involve hands-on exercises, and pay ₹40,000 to ₹2.5 lakh. Companies hire you to train their teams on specific skills like business writing, email communication, or content strategy.
            </p>

            {/* Paragraph 9 */}
            <p className="mb-6">
                Panel discussions and fireside chats run thirty to sixty minutes, involve conversation rather than solo speaking, and pay ₹15,000 to ₹75,000. Easier to book because there's less pressure to carry the entire session yourself.
            </p>

            {/* Paragraph 10 */}
            <p className="mb-6">
                Virtual webinars and masterclasses run sixty to ninety minutes, work well for building your own audience, and generate ₹499 to ₹2,999 per attendee if you're selling tickets directly, or ₹25,000 to ₹1.5 lakh if a company sponsors the event.
            </p>

            {/* Visual 3: Engagement Types Grid */}
            <figure className="my-12 grid grid-cols-2 gap-4">
                {[
                    { title: "Keynote", time: "30-60m", pay: "₹50k - 5L", icon: Mic2, desc: "Big Idea, High Impact" },
                    { title: "Workshop", time: "2-4 hrs", pay: "₹40k - 2.5L", icon: Users, desc: "Hands-on Training" },
                    { title: "Panel", time: "30-60m", pay: "₹15k - 75k", icon: MessageSquare, desc: "Conversation" },
                    { title: "Webinar", time: "60-90m", pay: "₹25k - 1.5L", icon: Video, desc: "Virtual/Low Overhead" },
                ].map((item, i) => (
                    <Card key={i} className="bg-ink-900 border border-white/10 p-4 hover:border-emerald-500/30 transition-colors">
                        <div className="flex justify-between items-center mb-3">
                            <item.icon className="w-5 h-5 text-emerald-400" />
                            <Badge variant="outline" className="text-[10px] text-parchment/50 border-white/10">{item.time}</Badge>
                        </div>
                        <h4 className="font-bold text-white mb-1">{item.title}</h4>
                        <div className="text-emerald-400 text-sm font-bold mb-1">{item.pay}</div>
                        <div className="text-[10px] text-parchment/40">{item.desc}</div>
                    </Card>
                ))}
            </figure>


            {/* Paragraph 11 - The System */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">The System to Book Your First Paid Speaking Gig</h3>
            <p className="mb-6">
                Step one: Develop your signature talk in week one. Choose one topic you can speak about for forty-five to ninety minutes. Use the framework: powerful opening story, three main points with examples each, audience interaction or exercise, closing call-to-action. Write a one-page speaker sheet with talk title, three key takeaways, ideal audience, your bio, and past speaking experience even if it's just local meetups or online sessions.
            </p>

            {/* Paragraph 12 */}
            <p className="mb-6">
                Step two: Record a demo video in week two. Speak your signature talk to an empty room, a small audience of friends, or record a Zoom presentation. Edit it down to a three to five-minute highlight reel showing your best moments. This demo is essential because event organizers won't book you without seeing you speak.
            </p>

            {/* Paragraph 13 */}
            <p className="mb-6">
                Step three: Target the right opportunities in week three. Make a list of twenty potential clients: local companies in your niche, colleges, writing conferences, online summit organizers, corporate training companies. Find the contact person, usually HR manager for corporate, event coordinator for conferences, faculty head for colleges.
            </p>

            {/* Paragraph 14 */}
            <p className="mb-6">
                Step four: The cold outreach template. Subject line: "Workshop on [Topic] for [Their Audience]." Body: "Hi [Name], I help [audience type] with [specific outcome] through interactive workshops on [your topic]. I've worked with [mention any past clients or experience]. I'd love to explore running a session for [their organization/event] on [specific benefit to their audience]. I've attached my speaker sheet and a short demo video. Are you open to a quick call to discuss?" Follow up after five days if no response.
            </p>

            {/* Visual 4: Cold Outreach Card */}
            <figure className="my-12">
                <div className="bg-gradient-to-br from-ink-900 to-black border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                    <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-parchment/40" />
                            <span className="text-xs font-mono text-parchment/40">speaker_pitch_v1.eml</span>
                        </div>
                        <Badge variant="secondary" className="text-[10px] bg-emerald-500/10 text-emerald-400 border-none">Proof Attached</Badge>
                    </div>
                    <div className="p-6 font-mono text-sm text-parchment/80 leading-relaxed whitespace-pre-wrap">
                        <span className="text-parchment/40">Subject:</span> Workshop on [Topic] for [Their Audience]<br /><br />

                        Hi [Name],<br /><br />

                        I help [audience type] with [specific outcome] through interactive workshops on [your topic].<br /><br />

                        I've worked with [mention past experience]. I'd love to explore running a session for [Organization] on <span className="text-emerald-400 bg-emerald-500/10 px-1 rounded">[specific benefit]</span>.<br /><br />

                        I've attached my <span className="text-white underline decoration-dotted">speaker sheet</span> and a <span className="text-white underline decoration-dotted">short demo video</span>.<br /><br />

                        Are you open to a quick call to discuss?
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 5.3: The "Evidence First" Pitch. Always attach your speaker sheet and video—they can't book what they can't see.
                </figcaption>
            </figure>


            {/* Paragraph 15 */}
            <p className="mb-6">
                Step five: Price and negotiate confidently. For your first five gigs, charge ₹25,000 to ₹50,000 to build experience and testimonials. Once you have video testimonials and proven impact, raise to ₹75,000 to ₹1.5 lakh. Never speak for free unless it's a massive audience that will generate leads for your other products, or a cause you deeply care about. When they say budget is tight, respond with "I understand budget constraints. My standard fee is [₹X], but I can offer [reduced scope version] for [₹Y]. Would that work?"
            </p>

            {/* Paragraph 16 - Building Your Business */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Building Your Speaker Business</h3>
            <p className="mb-6">
                Create multiple talk variations. Your core expertise can be packaged into different talks: a sixty-minute keynote version, a half-day workshop with exercises, a ninety-minute webinar, a three-hour intensive training. This lets you say yes to different types of opportunities without creating new content from scratch.
            </p>

            {/* Paragraph 17 */}
            <p className="mb-6">
                Join speaker bureaus and directories. Register on platforms like SpeakIn, Hubilo, and The Speakers Practice in India. List your topics, fee range, and demo video. These platforms connect you with corporate clients looking for speakers and handle some of the sales process.
            </p>

            {/* Paragraph 18 */}
            <p className="mb-6">
                Build relationships with event organizers. After every speaking gig, ask "Who else do you know who might need a speaker on this topic?" Get introduced to other organizers. Speaking is a referral business. One great performance leads to three more bookings.
            </p>

            {/* Paragraph 19 */}
            <p className="mb-6">
                Repurpose your talks into content. Record every speech or workshop. Turn the content into blog posts, LinkedIn articles, YouTube videos, or even a mini-course. One ninety-minute workshop becomes eight social media posts, two blog articles, a YouTube video, and a lead magnet PDF.
            </p>

            {/* Paragraph 20 - Real Example */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Real Example: Simran's ₹14.6 Lakh Speaking Income</h3>
            <p className="mb-6">
                Simran, thirty-four years old in Mumbai, was a business writer who developed a workshop called "Writing Emails That Actually Get Read." She started by delivering it free to two startup accelerators to build testimonials and video footage.
            </p>
            <p className="mb-6">
                She then pitched ten corporate training companies and landed her first paid gig at ₹40,000 for a three-hour workshop at a tech company. That led to a referral to an HR consulting firm that books her quarterly for ₹75,000 per session.
            </p>
            <p className="mb-6">
                In year one, she delivered fourteen paid workshops: eight at ₹50,000, four at ₹75,000, and two virtual sessions at ₹35,000 each. Total speaking income: ₹7.7 lakh. Year two, she raised her fees to ₹85,000 to ₹1.2 lakh and delivered sixteen sessions for ₹14.6 lakh. She now blocks out two speaking dates per month and fills the rest of her calendar with writing and course creation.
            </p>

            {/* Visual 5: Growth Bar Chart */}
            <figure className="my-12">
                <div className="flex gap-8 items-end h-64 border-b border-white/20 pb-0 px-4 md:px-12">
                    {/* Year 1 */}
                    <div className="w-1/2 flex flex-col justify-end h-full gap-2 group cursor-pointer">
                        <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity mb-2">
                            <div className="text-lg font-bold text-white">₹7.7 Lakh</div>
                            <div className="text-[10px] text-parchment/40">14 Gigs (Avg ₹55k)</div>
                        </div>
                        <div className="h-[52%] bg-white/10 border-t border-x border-white/20 rounded-t w-full relative group-hover:bg-white/20 transition-colors"></div>
                        <div className="text-center border-t border-white/20 pt-3 text-xs font-bold text-parchment/60 uppercase">Year 1</div>
                    </div>

                    {/* Year 2 */}
                    <div className="w-1/2 flex flex-col justify-end h-full gap-2 group cursor-pointer">
                        <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity mb-2">
                            <div className="text-xl font-bold text-emerald-400">₹14.6 Lakh</div>
                            <div className="text-[10px] text-parchment/40">16 Gigs (Avg ₹90k)</div>
                        </div>
                        <div className="h-full bg-emerald-500/20 border-t border-x border-emerald-500/50 rounded-t w-full relative group-hover:bg-emerald-500/30 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.1)]"></div>
                        <div className="text-center border-t border-white/20 pt-3 text-xs font-bold text-emerald-400 uppercase">Year 2</div>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 5.4: The Price Hike Effect. Same number of gigs (roughly), but double the income by raising fees.
                </figcaption>
            </figure>


            {/* Paragraph 21 - Mistakes */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Common Mistakes</h3>
            <p className="mb-6">
                Mistake number one: speaking for free hoping it leads to paid work. It rarely does. Charge something, even if it's just ₹10,000, to establish you're a professional.
            </p>
            <p className="mb-6">
                Mistake number two: not having a clear call-to-action at the end of your talk. Tell the audience what to do next: visit your website, join your email list, book a consultation, buy your book. Speaking should feed your other revenue streams.
            </p>
            <p className="mb-6">
                Mistake number three: delivering the same generic presentation to every audience. Customize at least the examples and the opening story to each specific audience's industry and challenges.
            </p>
            <p className="mb-6">
                Mistake number four: not following up with event organizers after the gig. Send a thank-you email, ask for a testimonial, and request referrals within forty-eight hours while you're still top of mind.
            </p>

            {/* Paragraph 22 - Snapshot */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Real Numbers Snapshot</h3>
            <p className="mb-6">
                Months one through six: deliver six talks at ₹25,000 to ₹40,000 each while building skills. Revenue: ₹1.8 to 2.4 lakh.
            </p>
            <p className="mb-6">
                Year one total: twelve to sixteen gigs averaging ₹50,000. Revenue: ₹6 to 8 lakh.
            </p>
            <p className="mb-6">
                Year two: twenty gigs averaging ₹75,000 with a few premium ₹1.5 lakh keynotes. Revenue: ₹15 to 20 lakh.
            </p>
            <p className="mb-6">
                Year three: move into ₹1 to 2 lakh average fee range. Fifteen to twenty gigs annually. Revenue: ₹20 to 35 lakh.
            </p>

            {/* Action Box */}
            <div className="mt-16 bg-gradient-to-r from-emerald-900/40 to-ink-900 border border-emerald-500/50 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Mic2 className="w-32 h-32 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-ink-black text-sm">🚀</span>
                    ACTION BOX: Book Your First Speaking Gig
                </h3>
                <div className="space-y-6 relative z-10 font-sans">
                    <div className="flex gap-4">
                        <div className="w-32 shrink-0 font-bold text-emerald-400 Uppercase text-sm mt-1">This Week</div>
                        <div className="text-parchment/80">Outline your signature talk. Record a three-minute demo video. Create your one-page speaker sheet.</div>
                    </div>
                    <div className="w-full h-px bg-white/5" />
                    <div className="flex gap-4">
                        <div className="w-32 shrink-0 font-bold text-emerald-400 Uppercase text-sm mt-1">Next Week</div>
                        <div className="text-parchment/80">Email twenty potential clients using the template above.</div>
                    </div>

                    <div className="bg-emerald-500/10 rounded-lg p-4 mt-6 border border-emerald-500/30 text-center">
                        <span className="text-emerald-400 font-bold uppercase tracking-widest text-sm">Goal: Book three discovery calls and close one paid gig within thirty days.</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PagesChapterSpeaking;
