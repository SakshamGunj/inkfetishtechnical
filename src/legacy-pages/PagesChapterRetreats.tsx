import React from 'react';
import {
    Users, Tent, Calendar, Coffee, MapPin,
    Sunrise, Sunset, BookOpen, MessageSquare,
    Gem, CheckCircle2, DollarSign
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PagesChapterRetreats = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 font-serif text-lg md:text-xl leading-relaxed text-parchment/90">
            {/* Title Section */}
            <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 border-emerald-500/50 text-emerald-400 tracking-[0.2em] font-sans">
                    STREAM 10
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">WRITING RETREATS AND MASTERMINDS – ₹50,000 TO ₹8 LAKH PER EVENT</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-gold mx-auto rounded-full" />
            </div>

            {/* Paragraph 1 */}
            <p className="mb-6 first-letter:text-5xl first-letter:text-emerald-400 first-letter:font-bold first-letter:mr-2 first-letter:float-left">
                Writing retreats and masterminds combine high-ticket pricing with transformational experiences. You're selling focused time, expert guidance, community, and results in an intimate setting. One retreat can generate what three months of freelancing generates.
            </p>

            {/* Visual 1: The Leverage Multiplier */}
            <figure className="my-12">
                <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
                    <Card className="bg-ink-900 border border-white/10 p-6 w-full md:w-1/3 text-center opacity-60">
                        <div className="text-parchment/60 uppercase tracking-widest text-xs mb-2">Freelancing</div>
                        <div className="text-3xl font-bold text-white mb-2">3 Months</div>
                        <p className="text-sm font-sans text-parchment/50">Grinding daily deadlines</p>
                    </Card>
                    <div className="font-bold text-emerald-400 text-xl font-sans">=</div>
                    <Card className="bg-emerald-900/20 border border-emerald-500/50 p-6 w-full md:w-1/3 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-emerald-500 text-ink-black text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest">High Leverage</div>
                        <div className="text-emerald-400 uppercase tracking-widest text-xs mb-2">Retreat</div>
                        <div className="text-3xl font-bold text-white mb-2">3 Days</div>
                        <p className="text-sm font-sans text-emerald-200/60">One immersive event</p>
                    </Card>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 10.1: The Time-Money Trade. Compressing revenue collection into high-value weekends.
                </figcaption>
            </figure>


            {/* Paragraph 2 - Market */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">The Retreat and Mastermind Market</h3>
            <p className="mb-6">
                Weekend writing retreats run Friday evening through Sunday afternoon, accommodate eight to twenty participants, and charge ₹15,000 to ₹40,000 per person. A retreat with fifteen participants at ₹25,000 each generates ₹3.75 lakh in revenue minus venue and catering costs of ₹75,000 to ₹1.5 lakh, netting you ₹2.25 to 3 lakh for one weekend.
            </p>
            <p className="mb-6">
                Week-long intensive retreats typically run Monday through Friday, limit groups to ten to fifteen writers for personalized attention, and charge ₹40,000 to ₹1.2 lakh per participant depending on location and amenities. A week-long retreat with twelve participants at ₹60,000 each generates ₹7.2 lakh revenue.
            </p>
            <p className="mb-6">
                Quarterly masterminds meet four times per year either in person or virtually, cap membership at six to twelve writers for intimate group dynamics, and charge ₹80,000 to ₹3 lakh for annual membership with quarterly sessions. A mastermind with eight members at ₹1.5 lakh each generates ₹12 lakh annually.
            </p>
            <p className="mb-6">
                Virtual intensives conducted over Zoom for two to three days charge ₹8,000 to ₹30,000 per participant with groups of twenty to fifty people, generating ₹4 to 15 lakh per event with minimal overhead costs.
            </p>

            {/* Visual 2: Event Types Matrix */}
            <figure className="my-12 grid gap-4 md:grid-cols-2">
                {[
                    { title: "Weekend Retreat", dur: "2.5 Days", size: "8-20 ppl", price: "₹15k - 40k", net: "₹2.25L - 3L" },
                    { title: "Week-Long Intensive", dur: "5 Days", size: "10-15 ppl", price: "₹40k - 1.2L", net: "₹5L - 7.2L" },
                    { title: "Quarterly Mastermind", dur: "1 Year", size: "6-12 ppl", price: "₹80k - 3L", net: "₹6L - 36L" },
                    { title: "Virtual Intensive", dur: "2-3 Days", size: "20-50 ppl", price: "₹8k - 30k", net: "₹4L - 15L" },
                ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-lg hover:bg-white/10 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-white text-sm">{item.title}</h4>
                            <Badge variant="secondary" className="bg-white/10 text-[10px]">{item.dur}</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs font-sans text-parchment/60 mb-3">
                            <div>Size: {item.size}</div>
                            <div>Price: {item.price}</div>
                        </div>
                        <div className="border-t border-white/10 pt-2 flex items-center justify-between">
                            <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold">Potential Net</span>
                            <span className="font-bold text-white">{item.net}</span>
                        </div>
                    </div>
                ))}
                <figcaption className="col-span-2 text-center text-sm text-parchment/50 mt-2 font-sans italic">
                    Figure 10.2: The Event Ledger. Different formats serve different budgets and time commitments.
                </figcaption>
            </figure>


            {/* Paragraph 3 - What Sells */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">What Makes Retreats Sell</h3>
            <p className="mb-6">
                Strong positioning around a specific outcome is critical. Don't sell a generic "writing retreat." Sell "Finish Your Novel Retreat: Write 15,000 Words in 3 Days" or "Business Book Bootcamp: Outline to First Draft in 5 Days." The more specific the promise, the easier the sell.
            </p>
            <p className="mb-6">
                Expert facilitation and curriculum make people willing to pay premium prices. You provide structured writing sprints, craft workshops on specific techniques, individual feedback sessions, mastermind-style group feedback, and accountability systems that ensure participants leave with tangible progress.
            </p>
            <p className="mb-6">
                Beautiful or inspiring locations justify higher prices. Hill stations like Mussoorie or Coorg, beach properties in Goa, heritage properties in Rajasthan, or peaceful farmhouses outside Bangalore all create an environment that removes distractions and sparks creativity.
            </p>
            <p className="mb-6">
                Community and connection are what participants remember years later. Build in social meals, evening discussions around a fire, morning meditation or yoga, and structured networking time. People pay for the relationships and support as much as the content.
            </p>
            <p className="mb-6">
                Limited availability creates urgency and exclusivity. Cap your retreat at twelve to twenty people and promote the limited spots. Early bird pricing for the first five to eight registrations rewards fast action and builds momentum.
            </p>

            {/* Visual 3: Value Stack Card */}
            <figure className="my-12">
                <Card className="bg-gradient-to-br from-indigo-950/30 to-ink-900 border border-indigo-500/20 p-6 md:p-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5"><Gem className="w-48 h-48" /></div>
                    <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm relative z-10">The Premium Experience Stack</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400"><MapPin className="w-6 h-6" /></div>
                            <div className="text-xs font-bold text-parchment">Dream Location</div>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400"><BookOpen className="w-6 h-6" /></div>
                            <div className="text-xs font-bold text-parchment">Specific Outcome</div>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400"><Users className="w-6 h-6" /></div>
                            <div className="text-xs font-bold text-parchment">Tribe Connection</div>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400"><Coffee className="w-6 h-6" /></div>
                            <div className="text-xs font-bold text-parchment">Zero Distractions</div>
                        </div>
                    </div>
                </Card>
            </figure>


            {/* Paragraph 4 - Running First Retreat */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Building and Running Your First Retreat</h3>
            <p className="mb-6">
                Step one: Choose your retreat format and promise. Decide on weekend versus week-long, the specific outcome participants will achieve, your ideal participant profile, and the price point that reflects the transformation value. Your first retreat should be weekend-length to reduce your risk and commitment.
            </p>
            <p className="mb-6">
                Step two: Find the perfect venue. Search on Airbnb for large properties that sleep ten to fifteen people, look for retreat centers that offer packages including accommodation and meals, consider partnering with boutique hotels or resorts during off-peak season for better rates, and visit the venue in advance to ensure it matches your vision and has necessary amenities like good wifi, quiet writing spaces, and comfortable common areas.
            </p>
            <p className="mb-6">
                Step three: Build your curriculum and schedule. Map out the full weekend hour by hour including arrival and orientation, writing sprint blocks of ninety minutes to two hours, craft workshops on specific techniques, one-on-one feedback sessions, group sharing and critique, meals and breaks, and evening social time. Balance structured activities with free writing time.
            </p>
            <p className="mb-6">
                Step four: Market to your existing audience first. Email your newsletter list announcing the retreat sixty days before the event. Post on social media with compelling visuals of the venue and the retreat promise. Reach out personally to writers you know who fit the ideal participant profile. Offer early bird pricing for the first week of registration. Create a simple landing page with all details, testimonials if you have them from other events, clear pricing and what's included, photos of the venue, your bio and credentials, and an application form or payment link.
            </p>
            <p className="mb-6">
                Step five: Deliver an exceptional experience and gather testimonials. Over-deliver on content and personal attention. Capture photos and short video testimonials from participants during the retreat while energy is high. Follow up with participants thirty and ninety days later to see what they accomplished post-retreat and turn those wins into case studies for marketing your next event.
            </p>

            {/* Visual 4: Sample Weekend Schedule */}
            <figure className="my-12 font-sans">
                <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                    <div className="bg-white/10 p-3 text-center font-bold text-white text-sm uppercase tracking-widest">Sample Day Structure</div>
                    <div className="divide-y divide-white/5">
                        <div className="flex p-3 hover:bg-white/5 transition-colors">
                            <div className="w-20 text-xs text-parchment/60 pt-0.5 font-mono">07:00 AM</div>
                            <div className="flex-1">
                                <div className="text-sm font-bold text-emerald-400 flex items-center gap-2"><Sunrise className="w-3 h-3" /> Morning Pages & Yoga</div>
                                <div className="text-xs text-parchment/40">Clear the mind before the work.</div>
                            </div>
                        </div>
                        <div className="flex p-3 hover:bg-white/5 transition-colors">
                            <div className="w-20 text-xs text-parchment/60 pt-0.5 font-mono">09:30 AM</div>
                            <div className="flex-1">
                                <div className="text-sm font-bold text-white flex items-center gap-2"><BookOpen className="w-3 h-3" /> Deep Work Sprint</div>
                                <div className="text-xs text-parchment/40">90 mins uninterrupted writing time.</div>
                            </div>
                        </div>
                        <div className="flex p-3 hover:bg-white/5 transition-colors">
                            <div className="w-20 text-xs text-parchment/60 pt-0.5 font-mono">02:00 PM</div>
                            <div className="flex-1">
                                <div className="text-sm font-bold text-amber-400 flex items-center gap-2"><MessageSquare className="w-3 h-3" /> Craft Workshop</div>
                                <div className="text-xs text-parchment/40">Teaching technique & feedback loops.</div>
                            </div>
                        </div>
                        <div className="flex p-3 hover:bg-white/5 transition-colors">
                            <div className="w-20 text-xs text-parchment/60 pt-0.5 font-mono">08:00 PM</div>
                            <div className="flex-1">
                                <div className="text-sm font-bold text-indigo-400 flex items-center gap-2"><Sunset className="w-3 h-3" /> Bonfire & Storytelling</div>
                                <div className="text-xs text-parchment/40">Community bonding & wine.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 10.3: The Rhythm. Structure provides safety; freedom provides creativity.
                </figcaption>
            </figure>


            {/* Paragraph 5 - Mastermind */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Mastermind Group Structure</h3>
            <p className="mb-6">
                Quarterly in-person meetings create rhythm and accountability. Each meeting runs a full day from 10 AM to 6 PM, includes hot seat coaching where each member gets focused time to solve their biggest challenge, progress sharing and accountability check-ins, expert teaching on relevant topics, and masterminding where the group collectively solves problems.
            </p>
            <p className="mb-6">
                Monthly virtual check-ins between quarterly meetings keep momentum. Conduct sixty to ninety-minute Zoom calls where members share wins and challenges, provide brief hot seats for urgent issues, and maintain accountability to goals set in the previous quarterly meeting.
            </p>
            <p className="mb-6">
                Private community access via WhatsApp, Slack, or a private Facebook group enables ongoing support, questions, resource sharing, and celebration of wins between official meetings.
            </p>
            <p className="mb-6">
                Annual membership model charges upfront or in quarterly installments. Price based on the value of your expertise and the caliber of members. A mastermind of published authors earning ₹10 to 50 lakh annually might charge ₹1.5 to 3 lakh for annual membership. Beginning writers building freelance businesses might pay ₹60,000 to ₹1.2 lakh annually.
            </p>

            {/* Paragraph 6 - Real Example */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Real Example: Ankita's ₹11.8 Lakh Retreat Business</h3>
            <p className="mb-6">
                Ankita, thirty-eight years old in Pune, was a published novelist and writing coach. She organized her first weekend writing retreat in Lonavala with twelve participants at ₹18,000 each. Venue cost including accommodation and meals was ₹1.2 lakh. Revenue: ₹2.16 lakh minus ₹1.2 lakh costs equals ₹96,000 profit for one weekend.
            </p>
            <p className="mb-6">
                Based on glowing testimonials, she ran three more retreats that year: one in Goa at ₹22,000 per person with fifteen participants, one repeat in Lonavala at ₹20,000 with fourteen participants, and a premium week-long retreat in Coorg at ₹55,000 with ten participants. Total year-one retreat revenue after all costs: ₹6.8 lakh.
            </p>
            <p className="mb-6">
                Year two, she added a mastermind for eight published authors at ₹1.2 lakh each for annual membership, generating ₹9.6 lakh. She also ran three weekend retreats netting ₹3.2 lakh after costs. Total year-two revenue from retreats and masterminds: ₹12.8 lakh, working approximately one weekend per month plus quarterly mastermind sessions.
            </p>

            {/* Visual 5: Growth Chart */}
            <figure className="my-12">
                <div className="bg-ink-900 border border-white/10 p-6 rounded-xl">
                    <h4 className="text-center font-sans font-bold text-white text-sm uppercase tracking-widest mb-6">Annual Profit Growth</h4>
                    <div className="flex flex-col gap-4">
                        {/* Year 1 */}
                        <div className="flex items-center gap-4 group">
                            <div className="w-16 text-xs text-parchment/60 font-bold uppercase">Year 1</div>
                            <div className="flex-1 h-8 bg-white/5 rounded-r overflow-hidden relative">
                                <div className="absolute top-0 left-0 h-full bg-blue-500 w-[53%]"></div>
                                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-white z-10">₹6.8 Lakh</span>
                            </div>
                        </div>
                        {/* Year 2 */}
                        <div className="flex items-center gap-4 group">
                            <div className="w-16 text-xs text-emerald-400 font-bold uppercase">Year 2</div>
                            <div className="flex-1 h-8 bg-white/5 rounded-r overflow-hidden relative">
                                <div className="absolute top-0 left-0 h-full bg-emerald-500 w-full shadow-[0_0_20px_rgba(16,185,129,0.4)]"></div>
                                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-ink-black z-10">₹12.8 Lakh</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 text-center text-xs text-parchment/40 font-sans italic">
                        Doubled revenue by adding a recurring Mastermind.
                    </div>
                </div>
            </figure>


            {/* Paragraph 7 - Mistakes */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Common Mistakes</h3>
            <p className="mb-6">
                Mistake number one: underpricing to fill spots quickly. Price reflects value. A ₹10,000 retreat attracts tire-kickers. A ₹25,000 retreat attracts serious writers who actually implement. You want quality participants who'll become testimonials and referral sources.
            </p>
            <p className="mb-6">
                Mistake number two: picking a venue that's cheap but lacks the right atmosphere. The venue is fifty percent of the experience. Spending an extra ₹20,000 on a beautiful property with great food is worth it for participant satisfaction and testimonials.
            </p>
            <p className="mb-6">
                Mistake number three: over-programming every minute. Writers need unstructured time to actually write. Build in long writing sprint blocks and free time. Don't fill every hour with talking and teaching.
            </p>
            <p className="mb-6">
                Mistake number four: not creating community among participants. The relationships formed at retreats often outlast the content learned. Facilitate introductions, create small group discussions, and design activities that help participants connect beyond surface level.
            </p>

            {/* Paragraph 8 - Snapshot */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Real Numbers Snapshot</h3>
            <p className="mb-6">
                First retreat scenario: weekend format with twelve participants at ₹20,000 each. Revenue ₹2.4 lakh minus ₹1 lakh venue costs equals ₹1.4 lakh profit.
            </p>
            <p className="mb-6">
                Year one scenario: run three weekend retreats with twelve to fifteen participants averaging ₹22,000 each. Total revenue ₹8 to 10 lakh minus ₹3.5 to 4 lakh costs equals ₹4.5 to 6 lakh profit.
            </p>
            <p className="mb-6">
                Year two scenario: four retreats plus launch a mastermind with eight members at ₹1.2 lakh annual fee. Retreat profit ₹6 to 7.5 lakh plus mastermind ₹9.6 lakh equals ₹15.6 to 17.1 lakh total.
            </p>

            {/* Action Box */}
            <div className="mt-16 bg-gradient-to-r from-emerald-900/40 to-ink-900 border border-emerald-500/50 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Tent className="w-32 h-32 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-ink-black text-sm">🚀</span>
                    ACTION BOX: Plan Your First Retreat
                </h3>
                <div className="grid md:grid-cols-2 gap-8 relative z-10 font-sans">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span className="font-bold text-white uppercase text-sm">This Week</span>
                        </div>
                        <p className="text-parchment/80 text-sm pl-6 mb-4">Define promise & participant profile. Research 5 venues near major city.</p>

                        <div className="flex items-center gap-2 mb-3">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span className="font-bold text-white uppercase text-sm">Next Week</span>
                        </div>
                        <p className="text-parchment/80 text-sm pl-6">Visit top venue. Create schedule. Design landing page with Early Bird.</p>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="bg-emerald-500/10 rounded-lg p-6 border border-emerald-500/30 text-center">
                            <div className="text-xs uppercase tracking-widest text-emerald-400 mb-2">90-Day Goal</div>
                            <div className="text-3xl font-bold text-white mb-1">Pre-Sell 8 Spots</div>
                            <div className="text-[10px] text-parchment/60">Run Your First Event</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PagesChapterRetreats;
