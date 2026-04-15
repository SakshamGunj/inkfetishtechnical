import React from 'react';

const LaunchChapterAppendix = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 font-serif text-lg md:text-xl leading-relaxed text-parchment/90">
            {/* Title */}
            <div className="text-center mb-16">
                <span className="text-gold text-sm font-sans uppercase tracking-widest block mb-4">Chapter 10</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">APPENDIX: WORKSHEETS & TEMPLATES</h2>
                <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
            </div>

            <p className="mb-6">
                Use these templates to accelerate your launch planning. Copy them, fill in your specific details, and execute.
            </p>

            <div className="my-12 bg-ink-900/50 p-8 rounded-xl border border-white/10">
                <h3 className="text-2xl font-bold text-gold mb-6 font-sans border-b border-white/10 pb-4">Reader Avatar Worksheet</h3>
                <div className="space-y-4 font-sans text-base">
                    <p>Name: ___________</p>
                    <p>Age: _____ Gender: _____ City: _________</p>
                    <p>Income: ₹_______ Job/Profession: ___________</p>

                    <p className="font-bold text-white mt-4">Reading Habits:</p>
                    <ul className="list-disc list-inside pl-4 space-y-2">
                        <li>Where do they buy books? ___________</li>
                        <li>How often? ___________</li>
                        <li>Favorite genres: ___________</li>
                        <li>Comparable authors they love: ___________</li>
                    </ul>

                    <p className="font-bold text-white mt-4">Media Consumption:</p>
                    <ul className="list-disc list-inside pl-4 space-y-2">
                        <li>Primary social platform: ___________</li>
                        <li>Hours per day on social: _____</li>
                        <li>Other platforms they use: ___________</li>
                    </ul>

                    <p className="font-bold text-white mt-4">Pain Points/Desires Related to Your Book:</p>
                    <div className="h-24 border border-white/20 rounded-md"></div>

                    <p className="font-bold text-white mt-4">One-Sentence Summary of Your Ideal Reader:</p>
                    <div className="h-12 border border-white/20 rounded-md"></div>
                </div>
            </div>

            {/* Visual 1: The Reader Avatar Card (Placeholder) */}
            <figure className="my-16">
                <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 flex justify-center items-center bg-ink-black py-16 px-8 text-center min-h-[300px]">
                    <div className="flex flex-col items-center">
                        <div className="text-gold text-4xl mb-4 font-sans">Visual Placeholder</div>
                        <p className="text-parchment/60 font-sans max-w-md">
                            (Image generation quota active. This space reserved for "The Reader Avatar Persona Card" visual.)
                        </p>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/60 mt-4 font-sans italic">
                    Figure 10.1: Know exactly who you are writing for.
                </figcaption>
            </figure>

            <div className="my-16">
                <h3 className="text-2xl font-bold text-gold mb-6 font-sans border-b border-white/10 pb-4">90-Day Launch Calendar Template</h3>
                <p className="mb-6">
                    Copy this into Google Sheets or Excel. Fill in your specific dates and actions.
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-left font-sans text-base border-collapse border border-white/20">
                        <thead className="bg-white/10 text-gold">
                            <tr>
                                <th className="p-4 border border-white/20">Week</th>
                                <th className="p-4 border border-white/20">Days</th>
                                <th className="p-4 border border-white/20">Focus</th>
                                <th className="p-4 border border-white/20">Specific Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-parchment/80">
                            <tr>
                                <td className="p-4 border border-white/20">1-6</td>
                                <td className="p-4 border border-white/20">0 to -52</td>
                                <td className="p-4 border border-white/20 font-bold text-white">Cover Design + List Building</td>
                                <td className="p-4 border border-white/20">Announce cover process, collect emails, create content bank</td>
                            </tr>
                            <tr>
                                <td className="p-4 border border-white/20">2-4</td>
                                <td className="p-4 border border-white/20">-51 to -30</td>
                                <td className="p-4 border border-white/20 font-bold text-white">ARC Recruitment</td>
                                <td className="p-4 border border-white/20">Share cover progress, recruit 30-100 ARC readers, grow list by 150+</td>
                            </tr>
                            <tr>
                                <td className="p-4 border border-white/20">5</td>
                                <td className="p-4 border border-white/20">-29 to -22</td>
                                <td className="p-4 border border-white/20 font-bold text-white">Cover Reveal</td>
                                <td className="p-4 border border-white/20">Coordinate reveal across all platforms, open pre-orders or ARC signups</td>
                            </tr>
                            <tr>
                                <td className="p-4 border border-white/20">6-7</td>
                                <td className="p-4 border border-white/20">-21 to -8</td>
                                <td className="p-4 border border-white/20 font-bold text-white">ARC Distribution</td>
                                <td className="p-4 border border-white/20">Send books to reviewers, continue social engagement, prepare launch content</td>
                            </tr>
                            <tr>
                                <td className="p-4 border border-white/20">8</td>
                                <td className="p-4 border border-white/20">0 to 7</td>
                                <td className="p-4 border border-white/20 font-bold text-gold">LAUNCH WEEK</td>
                                <td className="p-4 border border-white/20">Execute launch at 7-9 PM IST, daily engagement, push for 100 reviews</td>
                            </tr>
                            <tr>
                                <td className="p-4 border border-white/20">9-11</td>
                                <td className="p-4 border border-white/20">8 to 30</td>
                                <td className="p-4 border border-white/20 font-bold text-white">Post-Launch Momentum</td>
                                <td className="p-4 border border-white/20">Thank supporters, collect UGC, run price promotion, start ads</td>
                            </tr>
                            <tr>
                                <td className="p-4 border border-white/20">12-13</td>
                                <td className="p-4 border border-white/20">31 to 60</td>
                                <td className="p-4 border border-white/20 font-bold text-white">Sustained Growth</td>
                                <td className="p-4 border border-white/20">Ads optimization, podcast pitches, plan next book</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Visual 2: 90-Day Visual Timeline (Placeholder) */}
            <figure className="my-16">
                <div className="rounded-xl overflow-hidden shadow-2xl border border-gold/20 flex justify-center items-center bg-ink-black py-16 px-8 text-center min-h-[300px]">
                    <div className="flex flex-col items-center">
                        <div className="text-gold text-4xl mb-4 font-sans">Visual Placeholder</div>
                        <p className="text-parchment/60 font-sans max-w-md">
                            (Image generation quota active. This space reserved for "The 90-Day Launch Timeline" visual.)
                        </p>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/60 mt-4 font-sans italic">
                    Figure 10.2: Visualize the runway. Don't rush; follow the plan.
                </figcaption>
            </figure>

            <div className="my-12 bg-ink-900/50 p-8 rounded-xl border border-white/10">
                <h3 className="text-2xl font-bold text-gold mb-6 font-sans border-b border-white/10 pb-4">ARC Team Outreach Email Template</h3>
                <div className="font-sans text-base space-y-4">
                    <p><span className="font-bold text-white">Subject:</span> Invitation to Join My Advance Review Team</p>
                    <p>Hi [Name],</p>
                    <p>I'm launching my [genre] book, [Book Title], on [Launch Date] and I'm building a team of advance readers.</p>
                    <p>I'd love for you to be part of it. Here's what's involved:</p>
                    <p className="font-bold text-white">What You Get:</p>
                    <ul className="list-disc list-inside pl-4">
                        <li>Free digital copy of my book 3-4 weeks before launch</li>
                        <li>Exclusive bonus content</li>
                        <li>Your name in the acknowledgments</li>
                    </ul>
                    <p className="font-bold text-white">What I'm Asking:</p>
                    <ul className="list-disc list-inside pl-4">
                        <li>Read the book before launch (no pressure on timing—life happens!)</li>
                        <li>Post an honest review on Amazon and/or Goodreads on launch day</li>
                    </ul>
                    <p>Interested? Just reply to this email and I'll send details.</p>
                    <p>Thanks for considering!</p>
                    <p>[Your Name]</p>
                </div>
            </div>

            <div className="my-12 bg-ink-900/50 p-8 rounded-xl border border-white/10">
                <h3 className="text-2xl font-bold text-gold mb-6 font-sans border-b border-white/10 pb-4">Bookstore Pitch Sell Sheet Template</h3>
                <div className="font-sans text-base space-y-4 border border-dashed border-white/30 p-6 bg-black/20">
                    <div className="w-full h-48 bg-gray-800 flex items-center justify-center text-gray-400 mb-4">[YOUR BOOK COVER IMAGE - HIGH QUALITY]</div>
                    <p className="text-2xl font-bold text-white">[Book Title]</p>
                    <p className="text-lg text-parchment">by [Your Name]</p>

                    <p className="font-bold text-gold uppercase mt-4">Three-Line Pitch:</p>
                    <p>[Hook sentence about your book]</p>
                    <p>[What makes it unique or compelling]</p>
                    <p>[Who it's for / Comparable titles]</p>

                    <p className="font-bold text-gold uppercase mt-4">Perfect for Readers Who Loved:</p>
                    <ul className="list-disc list-inside pl-4">
                        <li>[Comparable Book 1]</li>
                        <li>[Comparable Book 2]</li>
                        <li>[Comparable Book 3]</li>
                    </ul>

                    <p className="font-bold text-gold uppercase mt-4">Author Platform:</p>
                    <ul className="list-disc list-inside pl-4">
                        <li>Instagram/Social followers</li>
                        <li>Email subscribers</li>
                        <li>Active in [City] literary community</li>
                        <li>Will drive traffic to your store</li>
                    </ul>

                    <p className="font-bold text-gold uppercase mt-4">Wholesale Terms:</p>
                    <ul className="list-disc list-inside pl-4">
                        <li>[XX]% discount</li>
                        <li>Consignment available</li>
                        <li>Returnable [Yes/No]</li>
                    </ul>

                    <p className="font-bold text-gold uppercase mt-4">Contact:</p>
                    <p>Email: [your email]</p>
                    <p>Phone: [your number]</p>
                    <p>Website: [your URL]</p>
                </div>
            </div>

            <div className="my-12 bg-ink-900/50 p-8 rounded-xl border border-white/10">
                <h3 className="text-2xl font-bold text-gold mb-6 font-sans border-b border-white/10 pb-4">Review Request Email Template</h3>
                <div className="font-sans text-base space-y-4">
                    <p><span className="font-bold text-white">Subject:</span> Quick question about [Book Title]</p>
                    <p>Hi [Name],</p>
                    <p>I hope you're enjoying [Book Title]! I saw you picked up a copy [last week/recently] and I wanted to check in.</p>
                    <p>If you've finished reading and have a moment, I'd be incredibly grateful if you could leave an honest review on Amazon. Reviews help other readers discover the book, and every single one makes a huge difference.</p>
                    <p>Here's the direct link: [Amazon Review Link]</p>
                    <p>No pressure at all—I just wanted to say thank you for reading.</p>
                    <p>[Your Name]</p>
                    <p className="italic text-parchment/60">P.S. If you haven't finished yet, no worries! Take your time and enjoy.</p>
                </div>
            </div>

            <div className="my-16">
                <h3 className="text-2xl font-bold text-gold mb-6 font-sans border-b border-white/10 pb-4">30-Day Social Media Content Calendar Template</h3>
                <p className="mb-6">
                    Use this rotation to never run out of content. Adapt to your specific genre and style.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-base">
                    <div className="border border-white/20 p-6 rounded-lg bg-ink-900/40">
                        <h4 className="font-bold text-gold mb-3">Week 1</h4>
                        <ul className="space-y-2">
                            <li><span className="text-white font-bold">Monday:</span> Story - Why I wrote this book</li>
                            <li><span className="text-white font-bold">Wednesday:</span> Value - 3 book recommendations</li>
                            <li><span className="text-white font-bold">Friday:</span> Proof - Reader testimonial screenshot</li>
                            <li><span className="text-white font-bold">Saturday:</span> Story - My writing routine</li>
                        </ul>
                    </div>
                    <div className="border border-white/20 p-6 rounded-lg bg-ink-900/40">
                        <h4 className="font-bold text-gold mb-3">Week 2</h4>
                        <ul className="space-y-2">
                            <li><span className="text-white font-bold">Monday:</span> Value - Writing tip or genre insight</li>
                            <li><span className="text-white font-bold">Wednesday:</span> Proof - Sales milestone or ranking update</li>
                            <li><span className="text-white font-bold">Friday:</span> Story - Behind-the-scenes of a specific scene</li>
                            <li><span className="text-white font-bold">Sunday:</span> Value - Answer a reader question</li>
                        </ul>
                    </div>
                    <div className="border border-white/20 p-6 rounded-lg bg-ink-900/40">
                        <h4 className="font-bold text-gold mb-3">Week 3</h4>
                        <ul className="space-y-2">
                            <li><span className="text-white font-bold">Monday:</span> Story - Rejection or failure I overcame</li>
                            <li><span className="text-white font-bold">Wednesday:</span> Value - Character development tip (fiction) or lesson from book (non-fiction)</li>
                            <li><span className="text-white font-bold">Friday:</span> Proof - Review screenshot</li>
                            <li><span className="text-white font-bold">Saturday:</span> Story - What I'm reading now</li>
                        </ul>
                    </div>
                    <div className="border border-white/20 p-6 rounded-lg bg-ink-900/40">
                        <h4 className="font-bold text-gold mb-3">Week 4</h4>
                        <ul className="space-y-2">
                            <li><span className="text-white font-bold">Monday:</span> Value - Industry trend or book news commentary</li>
                            <li><span className="text-white font-bold">Wednesday:</span> Proof - User-generated content (reader photo with book)</li>
                            <li><span className="text-white font-bold">Friday:</span> Story - Future book teaser</li>
                            <li><span className="text-white font-bold">Sunday:</span> Value - Resources or tools I use</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Visual 3: Social Media Rotation Grid (Placeholder) */}
            <figure className="my-16">
                <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 flex justify-center items-center bg-ink-black py-16 px-8 text-center min-h-[300px]">
                    <div className="flex flex-col items-center">
                        <div className="text-gold text-4xl mb-4 font-sans">Visual Placeholder</div>
                        <p className="text-parchment/60 font-sans max-w-md">
                            (Image generation quota active. This space reserved for "The 30-Day Content Rotation" visual grid.)
                        </p>
                    </div>
                </div>
                <figcaption className="text-center text-sm text-parchment/60 mt-4 font-sans italic">
                    Figure 10.3: Consistency is key. Plan once, post for a month.
                </figcaption>
            </figure>

            <div className="my-12 bg-ink-900/50 p-8 rounded-xl border border-white/10">
                <h3 className="text-2xl font-bold text-gold mb-6 font-sans border-b border-white/10 pb-4">Book Description Formula Worksheet</h3>
                <div className="font-sans text-base space-y-6">
                    <div>
                        <p className="font-bold text-white mb-2">Opening Hook (2-3 lines, bold if possible):</p>
                        <p className="text-parchment/60 italic">[Create intrigue or state the emotional core]</p>
                        <div className="h-20 border border-white/20 rounded-md mt-2"></div>
                    </div>

                    <div>
                        <p className="font-bold text-white mb-2">Stakes or Transformation (3-4 short paragraphs):</p>
                        <p className="text-parchment/60 italic">Para 1: Introduce protagonist/reader situation</p>
                        <div className="h-16 border border-white/20 rounded-md mt-2 mb-2"></div>
                        <p className="text-parchment/60 italic">Para 2: Introduce conflict or problem</p>
                        <div className="h-16 border border-white/20 rounded-md mt-2 mb-2"></div>
                        <p className="text-parchment/60 italic">Para 3: Raise the stakes or deepen the tension</p>
                        <div className="h-16 border border-white/20 rounded-md mt-2"></div>
                    </div>

                    <div>
                        <p className="font-bold text-white mb-2">Perfect For Readers Who Love:</p>
                        <ul className="list-disc list-inside pl-4 text-parchment/60 italic">
                            <li>[Trope/theme 1]</li>
                            <li>[Trope/theme 2]</li>
                            <li>[Trope/theme 3]</li>
                        </ul>
                    </div>

                    <div>
                        <p className="font-bold text-white mb-2">Comparable Titles:</p>
                        <p>If you loved [Book X], [Book Y], and [Book Z], you'll devour this.</p>
                    </div>

                    <div>
                        <p className="font-bold text-white mb-2">Call to Action:</p>
                        <p>Scroll up and click Buy Now to start this [emotional descriptor] journey today.</p>
                    </div>
                </div>
            </div>

            {/* CONCLUSION */}
            <div className="mt-24 mb-16 pt-12 border-t border-gold/30 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">CONCLUSION: YOUR LAUNCH STARTS NOW</h2>
                <div className="w-24 h-1 bg-gold mx-auto rounded-full mb-8" />

                <p className="mb-6 text-left">
                    You now have everything you need to launch like a bestseller. Not theory. Not vague advice. A complete, step-by-step system.
                </p>
                <p className="mb-6 text-left">
                    Most authors never implement what they learn. They read, nod along, then go back to winging it. Do not be most authors. The difference between someone who sells 50 copies and someone who sells 5,000 copies is not talent or luck. It is execution.
                </p>
                <p className="mb-6 text-left font-bold text-white">
                    Start today. Not next week. Not when you feel ready. Today.
                </p>
                <p className="mb-6 text-left">
                    If your book is not written yet, use the Market-First Thinking chapter to validate your concept before you write another word. If your book is written but not launched, work backwards from your launch date and build your 90-day calendar right now. If your book has already launched, implement the Post-Launch strategies to resurrect momentum.
                </p>
                <p className="mb-6 text-left">
                    Every single tactic in this playbook has been tested on real books with real sales data. Some will work better for your genre or audience than others. That is fine. Test, measure, adapt. But you must start.
                </p>
                <p className="mb-6 text-left">
                    Your book deserves more than hope and good intentions. It deserves a strategic launch that gives it every possible advantage. Readers are out there waiting for your story or solution. Your job is to make sure they find it.
                </p>
                <p className="mb-6 text-left">
                    Stop overthinking. Stop waiting for perfect conditions. Stop telling yourself you will do it later.
                </p>
                <p className="mb-6 text-left">
                    Open your calendar. Block 90 days. Start executing.
                </p>
                <p className="mb-6 text-left">
                    The authors who win are not the ones with the most talent or the biggest budgets. They are the ones who take action consistently and refuse to give up.
                </p>
                <p className="mb-6 text-left font-bold text-gold text-xl italic">
                    Welcome to your launch. Let's make it a bestseller.
                </p>
            </div>

            {/* About the Author */}
            <div className="mt-24 bg-white/5 p-8 rounded-xl border border-white/10 flex flex-col md:flex-row gap-8 items-start">
                {/* Placeholder for Author Photo if needed, but text doesn't explicitly ask for one, sticking to text */}
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-gold mb-4 font-sans uppercase tracking-widest">About the Author</h3>
                    <p className="mb-4 text-base">
                        This playbook was created by a senior book marketing strategist with over 15 years of experience launching bestselling titles at major publishing houses and advising self-published authors globally. Having worked with 100+ authors across fiction and non-fiction, the strategies in this book are battle-tested and proven to work in both Indian and international markets.
                    </p>
                    <p className="text-base">
                        For more resources, templates, and updates on book marketing, visit [your website] or follow @[your handle] on social media.
                    </p>
                </div>
            </div>

            {/* One Last Thing */}
            <div className="mt-12 text-center text-parchment/60 text-base italic">
                <p className="mb-4 font-bold text-gold not-italic uppercase">One Last Thing</p>
                <p className="mb-2">If this playbook helped you, I have one small ask. When you launch your book and hit your goals, send me a message. Tell me what worked. Tell me your numbers. Tell me your story.</p>
                <p className="mb-2">Nothing fuels me more than seeing authors succeed. Your wins are my wins.</p>
                <p>Now go build something remarkable.</p>
            </div>
        </div>
    );
};

export default LaunchChapterAppendix;
