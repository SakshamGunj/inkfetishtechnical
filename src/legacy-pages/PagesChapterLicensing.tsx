import React from 'react';
import {
    Globe, Film, Mic, ShoppingBag,
    FileSignature, Scale, ChevronRight,
    Languages, Clapperboard, Headphones, CheckCircle2
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PagesChapterLicensing = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 font-serif text-lg md:text-xl leading-relaxed text-parchment/90">
            {/* Title Section */}
            <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 border-emerald-500/50 text-emerald-400 tracking-[0.2em] font-sans">
                    STREAM 11
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">LICENSING AND SUBSIDIARY RIGHTS – ₹50,000 TO ₹50 LAKH</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-gold mx-auto rounded-full" />
            </div>

            {/* Paragraph 1 */}
            <p className="mb-6 first-letter:text-5xl first-letter:text-emerald-400 first-letter:font-bold first-letter:mr-2 first-letter:float-left">
                Licensing your written content for translation, adaptation, foreign editions, or multimedia formats creates passive revenue from work you've already done. Your book, article, or story can earn money in markets and formats you never imagined.
            </p>

            {/* Visual 1: The Rights Tree */}
            <figure className="my-12">
                <div className="flex justify-center bg-ink-900/50 p-4 rounded-xl border border-white/5">
                    <div className="overflow-x-auto w-full pb-4">
                        <div className="relative font-sans text-sm min-w-[500px] mx-auto"> {/* Added min-width and mx-auto */}
                            <div className="bg-white/10 p-4 rounded-lg text-center font-bold text-white mb-8 border border-white/20 relative z-10 w-fit mx-auto shadow-lg shadow-black/20">
                                The Original Manuscript
                            </div>
                            {/* Connecting Lines */}
                            <div className="absolute top-10 left-1/2 -ml-[0.5px] w-[1px] h-8 bg-white/20 shadow-[0_0_2px_rgba(255,255,255,0.2)]"></div>
                            <div className="absolute top-[4.5rem] left-[12.5%] right-[12.5%] h-[1px] bg-white/20 border-t border-dashed border-white/30"></div>

                            {/* Branches */}
                            <div className="grid grid-cols-4 gap-4 text-center mt-2 px-4">
                                {/* Branch 1 */}
                                <div className="flex flex-col items-center">
                                    <div className="w-[1px] h-4 bg-white/20 mb-2"></div>
                                    <div className="bg-emerald-900/40 p-3 rounded border border-emerald-500/30 w-full hover:bg-emerald-900/60 transition-colors group cursor-pointer">
                                        <Languages className="w-5 h-5 mx-auto mb-1 text-emerald-400 group-hover:scale-110 transition-transform" />
                                        <div className="font-bold text-white text-xs">Translation</div>
                                        <div className="hidden group-hover:block text-[9px] text-emerald-200 mt-1 animate-in fade-in slide-in-from-top-1">Hindi, French</div>
                                    </div>
                                </div>
                                {/* Branch 2 */}
                                <div className="flex flex-col items-center">
                                    <div className="w-[1px] h-4 bg-white/20 mb-2"></div>
                                    <div className="bg-emerald-900/40 p-3 rounded border border-emerald-500/30 w-full hover:bg-emerald-900/60 transition-colors group cursor-pointer">
                                        <Clapperboard className="w-5 h-5 mx-auto mb-1 text-rose-400 group-hover:scale-110 transition-transform" />
                                        <div className="font-bold text-white text-xs">Adaptation</div>
                                        <div className="hidden group-hover:block text-[9px] text-emerald-200 mt-1 animate-in fade-in slide-in-from-top-1">Film, TV, Web</div>
                                    </div>
                                </div>
                                {/* Branch 3 */}
                                <div className="flex flex-col items-center">
                                    <div className="w-[1px] h-4 bg-white/20 mb-2"></div>
                                    <div className="bg-emerald-900/40 p-3 rounded border border-emerald-500/30 w-full hover:bg-emerald-900/60 transition-colors group cursor-pointer">
                                        <Headphones className="w-5 h-5 mx-auto mb-1 text-blue-400 group-hover:scale-110 transition-transform" />
                                        <div className="font-bold text-white text-xs">Audio</div>
                                        <div className="hidden group-hover:block text-[9px] text-emerald-200 mt-1 animate-in fade-in slide-in-from-top-1">Audiobooks</div>
                                    </div>
                                </div>
                                {/* Branch 4 */}
                                <div className="flex flex-col items-center">
                                    <div className="w-[1px] h-4 bg-white/20 mb-2"></div>
                                    <div className="bg-emerald-900/40 p-3 rounded border border-emerald-500/30 w-full hover:bg-emerald-900/60 transition-colors group cursor-pointer">
                                        <Globe className="w-5 h-5 mx-auto mb-1 text-amber-400 group-hover:scale-110 transition-transform" />
                                        <div className="font-bold text-white text-xs">Foreign</div>
                                        <div className="hidden group-hover:block text-[9px] text-emerald-200 mt-1 animate-in fade-in slide-in-from-top-1">US, UK Rights</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 11.1: The IP Tree. One root asset branches into multiple revenue streams.
                </figcaption>
            </figure>


            {/* Paragraph 2 - Types of Rights */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Types of Rights You Can Sell</h3>
            <p className="mb-6">
                Translation rights license your book to publishers in other languages. Hindi, Tamil, Bengali, Marathi, and regional Indian language publishers pay ₹50,000 to ₹3 lakh as an advance for popular English books. International translations into Spanish, French, German, or Mandarin can fetch one thousand to ten thousand dollars, which is ₹80,000 to ₹8 lakh, depending on your book's success and the market size.
            </p>
            <p className="mb-6">
                Foreign territory rights sell your English book to publishers in other countries. UK rights for an Indian book might bring ₹2 to 8 lakh as an advance. US rights could generate five thousand to fifty thousand dollars, which is ₹4 to 40 lakh, for established authors with proven sales.
            </p>
            <p className="mb-6">
                Film and television rights license your story for adaptation into movies, web series, or TV shows. Initial option agreements pay ₹2 to 15 lakh for exclusive rights for eighteen to twenty-four months. If the project goes into production, you negotiate a purchase price of ₹10 lakh to ₹10 crore depending on budget and your negotiating power.
            </p>
            <p className="mb-6">
                Audio rights license your book for audiobook production. Platforms like Audible, Storytel, and Findaway Voices either pay a per-finished-hour rate of five hundred to two thousand dollars, which is ₹40,000 to ₹1.6 lakh for a typical eight-hour audiobook, or offer a royalty share model of twenty-five to forty percent of sales with no upfront payment.
            </p>
            <p className="mb-6">
                Merchandise and brand licensing allows companies to use your characters, quotes, or world-building on products. This is rare but lucrative for breakout books, paying ₹1 to 10 lakh as advance plus five to fifteen percent royalty on sales.
            </p>

            {/* Visual 2: Valuation Cards */}
            <figure className="my-12 grid gap-4 sm:grid-cols-2">
                <Card className="bg-ink-900 border border-white/10 p-5 group hover:border-emerald-500/50 transition-all">
                    <div className="flex justify-between items-start mb-3">
                        <div className="font-bold text-white text-sm uppercase tracking-wide">Regional Lang</div>
                        <Languages className="w-4 h-4 text-parchment/40 group-hover:text-emerald-400" />
                    </div>
                    <div className="text-2xl font-bold text-emerald-400 mb-1">₹50k - 3L</div>
                    <p className="text-xs text-parchment/60">Per Language (Hindi, Tamil, etc.)</p>
                </Card>
                <Card className="bg-ink-900 border border-white/10 p-5 group hover:border-rose-500/50 transition-all">
                    <div className="flex justify-between items-start mb-3">
                        <div className="font-bold text-white text-sm uppercase tracking-wide">Film Option</div>
                        <Clapperboard className="w-4 h-4 text-parchment/40 group-hover:text-rose-400" />
                    </div>
                    <div className="text-2xl font-bold text-rose-400 mb-1">₹2L - 15L</div>
                    <p className="text-xs text-parchment/60">18-24 Month Exclusivity</p>
                </Card>
                <Card className="bg-ink-900 border border-white/10 p-5 group hover:border-blue-500/50 transition-all">
                    <div className="flex justify-between items-start mb-3">
                        <div className="font-bold text-white text-sm uppercase tracking-wide">Audiobook</div>
                        <Headphones className="w-4 h-4 text-parchment/40 group-hover:text-blue-400" />
                    </div>
                    <div className="text-2xl font-bold text-blue-400 mb-1">₹40k - 1.6L</div>
                    <p className="text-xs text-parchment/60">Per Finished Hour Rate</p>
                </Card>
                <Card className="bg-ink-900 border border-white/10 p-5 group hover:border-amber-500/50 transition-all">
                    <div className="flex justify-between items-start mb-3">
                        <div className="font-bold text-white text-sm uppercase tracking-wide">Foreign (US/UK)</div>
                        <Globe className="w-4 h-4 text-parchment/40 group-hover:text-amber-400" />
                    </div>
                    <div className="text-2xl font-bold text-amber-400 mb-1">₹4L - 40L</div>
                    <p className="text-xs text-parchment/60">Advance for English Rights</p>
                </Card>
                <figcaption className="col-span-2 text-center text-sm text-parchment/50 mt-2 font-sans italic">
                    Figure 11.2: The Price Menu. Typical advance ranges for Indian authors.
                </figcaption>
            </figure>


            {/* Paragraph 3 - How to Sell */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">How to Sell Rights You Own</h3>
            <p className="mb-6">
                Step one: Understand what rights you actually own. If you're traditionally published, your publisher likely controls most subsidiary rights in your contract. Read your contract carefully or have a literary lawyer review it. With self-published books, you own all rights and can license them individually.
            </p>
            <p className="mb-6">
                Step two: Research potential buyers for each right. For translation rights, identify publishers in your target language who publish your genre, attend international book fairs like Frankfurt or London virtually, and hire a foreign rights agent who specializes in selling to specific territories. For film rights, research production companies making content in your genre, connect with script consultants who work with producers, and consider hiring an entertainment lawyer to shop your book to studios.
            </p>
            <p className="mb-6">
                Step three: Prepare your pitch materials. Create a one-page sell sheet highlighting your book's concept, sales figures and social proof, why it would work in the target market or medium, and comparable successful titles or films. For film rights, write a one to two-page treatment showing how your book translates to screen with key scenes, character arcs, and visual potential.
            </p>
            <p className="mb-6">
                Step four: Price strategically based on market and your leverage. If your book sold well in India with fifty thousand plus copies, you have negotiating power for higher advances. If it's a debut with modest sales, be realistic about pricing to close deals and build momentum. Translation advances are typically ten to twenty percent of your original advance. Film options start at ₹2 to 5 lakh for debuts, ₹10 to 30 lakh for established authors.
            </p>
            <p className="mb-6">
                Step five: Get everything in writing with clear terms. Work with a literary agent or lawyer to draft rights agreements. Key terms include advance amount and royalty percentage, reversion clause if the buyer doesn't publish or produce within agreed timeframe, territories and languages covered, formats included, and your approval rights over translation quality or creative adaptation.
            </p>

            {/* Visual 3: The Deal Process Steps */}
            <figure className="my-12">
                <div className="space-y-4 font-sans border-l-2 border-white/10 ml-4 pl-6 relative">
                    {[
                        { step: "Audit", desc: "Check contract: Do you own these rights?" },
                        { step: "Research", desc: "Find publishers/producers in target niche." },
                        { step: "Pitch", desc: "Send One-Sheet & Sales Data." },
                        { step: "Negotiate", desc: "Agree on Advance, Royalty & Term." },
                        { step: "Contract", desc: "Sign with Reversion Clause included." }
                    ].map((item, i) => (
                        <div key={i} className="relative">
                            <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-ink-900 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                            <h4 className="font-bold text-white text-sm uppercase tracking-wide">{item.step}</h4>
                            <p className="text-xs text-parchment/60">{item.desc}</p>
                        </div>
                    ))}
                </div>
                <figcaption className="text-left ml-4 pl-6 text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 11.3: The Licensing Workflow. Treat each right as a separate product launch.
                </figcaption>
            </figure>


            {/* Paragraph 4 - Real Example */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Real Example: Sanjay's ₹16.4 Lakh in Rights Sales</h3>
            <p className="mb-6">
                Sanjay, forty-one years old in Kolkata, self-published a historical thriller that sold eighteen thousand copies in India over two years. Based on those sales, he approached regional publishers about translation rights.
            </p>
            <p className="mb-6">
                He licensed Hindi rights to a Delhi publisher for ₹1.8 lakh advance, Bengali rights for ₹1.2 lakh, and Marathi rights for ₹80,000. Total translation advances: ₹3.8 lakh. These editions sold well, earning him an additional ₹2.4 lakh in royalties over the next year.
            </p>
            <p className="mb-6">
                He also produced an audiobook through Findaway Voices at a fifty-fifty royalty split rather than upfront payment. The audiobook generated ₹3.6 lakh in his share of royalties over eighteen months with minimal ongoing effort.
            </p>
            <p className="mb-6">
                A production company optioned his book for web series adaptation, paying ₹4.5 lakh for an eighteen-month exclusive option. They're still developing the script. Total rights income from one book: ₹14.3 lakh over two years, in addition to his ongoing English book sales.
            </p>

            {/* Visual 4: Sanjay's Income Stack */}
            <figure className="my-12">
                <div className="bg-ink-900 border border-white/10 p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-6">
                        <h4 className="font-sans font-bold text-white text-sm uppercase tracking-widest">Sanjay's Deal Memo</h4>
                        <div className="text-emerald-400 font-bold text-lg">Total: ₹14.3 Lakh</div>
                    </div>
                    <div className="space-y-4 font-sans text-sm">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                            <div className="flex items-center gap-3">
                                <Languages className="w-4 h-4 text-parchment/40" />
                                <span className="text-parchment/80">Translations (Hindi, Ben, Mar)</span>
                            </div>
                            <div className="text-white font-bold">₹3.8L + ₹2.4L</div>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                            <div className="flex items-center gap-3">
                                <Headphones className="w-4 h-4 text-parchment/40" />
                                <span className="text-parchment/80">Audiobook (Royalties)</span>
                            </div>
                            <div className="text-white font-bold">₹3.6 Lakh</div>
                        </div>
                        <div className="flex justify-between items-center bg-emerald-900/20 p-2 rounded -mx-2 border border-emerald-500/20">
                            <div className="flex items-center gap-3">
                                <Clapperboard className="w-4 h-4 text-emerald-400" />
                                <span className="text-white">Web Series Option</span>
                            </div>
                            <div className="text-emerald-400 font-bold">₹4.5 Lakh</div>
                        </div>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/50 mt-4 font-sans italic">
                    Figure 11.4: One Book, Four Paychecks. Maximizing asset value without writing a new word.
                </figcaption>
            </figure>


            {/* Paragraph 5 - Building Strategy */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Building a Rights Strategy Into Your Writing Career</h3>
            <p className="mb-6">
                Write with commercial potential in mind if you want to maximize rights value. Stories with universal themes, clear cinematic visuals, series potential, and strong emotional hooks attract more buyers. Genre fiction like thriller, romance, and fantasy tends to sell rights more easily than literary fiction.
            </p>
            <p className="mb-6">
                Maintain good sales records and social proof because buyers want to see evidence of audience demand. If your book sold twenty thousand copies or has a four-point-five star rating with five hundred reviews, lead with those numbers in every pitch.
            </p>
            <p className="mb-6">
                Build relationships at book fairs and industry events. Virtual attendance at international book fairs like Frankfurt, London, or Bologna connects you with foreign publishers and rights buyers. Join professional organizations like the Society of Authors or the Indian Writers' Forum that offer rights-related resources and connections.
            </p>
            <p className="mb-6">
                Consider hiring a foreign rights agent once you have a commercially successful book. Agents typically take fifteen to twenty percent commission but have established relationships with publishers worldwide and can negotiate better deals than most authors can on their own.
            </p>

            {/* Paragraph 6 - Mistakes */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Common Mistakes</h3>
            <p className="mb-6">
                Mistake number one is selling rights too cheaply out of excitement or desperation. A ₹30,000 translation advance when your sales justify ₹1.5 lakh leaves money on the table. Research market rates and comparable deals before agreeing to terms.
            </p>
            <p className="mb-6">
                Mistake number two involves signing away rights in perpetuity without reversion clauses. If a publisher or producer doesn't execute within two to three years, rights should revert to you so you can sell them to someone who will actually use them.
            </p>
            <p className="mb-6">
                Mistake number three is not understanding what rights you're selling. Some contracts have vague language that could give away more than you intended. Always have a lawyer review before signing, especially for film or international deals.
            </p>
            <p className="mb-6">
                Mistake number four is neglecting to follow up with buyers about royalty statements and payments. Track what you're owed, verify sales reports, and don't assume you'll automatically receive what's due. Many authors discover unpaid royalties only when they audit their agreements.
            </p>

            {/* Paragraph 7 - Snapshot */}
            <h3 className="text-2xl font-bold text-white mt-12 mb-6">Real Numbers Snapshot</h3>
            <p className="mb-6">
                Year one scenario with a moderately successful self-published book that sold ten thousand to fifteen thousand copies: license two regional language translations at ₹1 lakh each for ₹2 lakh total. Produce audiobook on royalty share earning ₹40,000 to ₹80,000. Total rights income: ₹2.4 to 2.8 lakh.
            </p>
            <p className="mb-6">
                Year two scenario: three more translation licenses at ₹80,000 to ₹1.5 lakh each for ₹3.2 lakh. Audiobook royalties grow to ₹1.2 lakh. Option film rights for ₹3 lakh. Total: ₹7.4 lakh.
            </p>
            <p className="mb-6">
                Year three with strong sales track record: license foreign English editions for ₹5 lakh. Add two more translations for ₹2.4 lakh. Audiobook at ₹1.5 lakh. Film option renewal or purchase for ₹5 to 15 lakh. Total: ₹13.9 to 23.9 lakh.
            </p>

            {/* Action Box */}
            <div className="mt-16 bg-gradient-to-r from-emerald-900/40 to-ink-900 border border-emerald-500/50 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <FileSignature className="w-32 h-32 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-ink-black text-sm">🚀</span>
                    ACTION BOX: Start Your Rights Strategy
                </h3>
                <div className="grid md:grid-cols-2 gap-8 relative z-10 font-sans">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span className="font-bold text-white uppercase text-sm">This Week</span>
                        </div>
                        <p className="text-parchment/80 text-sm pl-6 mb-4">Audit contracts. List potential buyers for audio/trans/film.</p>

                        <div className="flex items-center gap-2 mb-3">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span className="font-bold text-white uppercase text-sm">Next Month</span>
                        </div>
                        <p className="text-parchment/80 text-sm pl-6">Create Sell Sheets. Pitch 3 regional publishers/producers.</p>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="bg-emerald-500/10 rounded-lg p-6 border border-emerald-500/30 text-center">
                            <div className="text-xs uppercase tracking-widest text-emerald-400 mb-2">90-Day Goal</div>
                            <div className="text-3xl font-bold text-white mb-1">License 1 Right</div>
                            <div className="text-[10px] text-parchment/60">Target: ₹50k - 2L Advance</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PagesChapterLicensing;
