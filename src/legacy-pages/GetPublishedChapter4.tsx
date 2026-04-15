import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Calendar,
    CheckSquare,
    Edit3,
    Users,
    FileText,
    Mail,
    Send,
    CheckCircle2,
    Clock,
    AlertCircle,
    BookOpen,
    PenTool,
    ChevronDown,
    ChevronUp,
    Copy,
    Instagram,
    Facebook
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Chapter4Content = () => {
    return (
        <div className="space-y-16">

            {/* 1. Introduction */}
            <section className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-serif text-parchment">Your Day-by-Day Roadmap</h3>
                <div className="prose prose-invert prose-lg text-parchment/80 leading-relaxed font-serif">
                    <p>
                        Here's your day-by-day roadmap from blank page to submitted author. Follow this exactly, and in 15 days, you'll be on your way to published status.
                    </p>
                    <div className="bg-gradient-to-r from-gold/10 to-transparent border-l-4 border-gold p-6 rounded-r-xl italic text-parchment/90 my-6">
                        "No more 'someday.' No more 'when I'm ready.' This is your structured path forward, starting today."
                    </div>
                </div>
            </section>

            {/* 2. Phase 1: Days 1-3 - Research & Selection */}
            <TimelinePhase
                title="Days 1-3: Research & Selection"
                icon={<Search className="w-6 h-6 text-gold" />}
                color="border-blue-500/30"
            >
                <DayCard day="Day 1" title="Find Quality Anthologies">
                    <div className="space-y-4 text-sm text-parchment/80">
                        <p><strong>Your Task:</strong> Spend one focused hour researching current anthology opportunities.</p>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-ink-900/50 p-4 rounded border border-white/5">
                                <strong className="text-gold block mb-2">Where to Search:</strong>
                                <ul className="list-disc pl-4 space-y-1 text-xs">
                                    <li>Instagram hashtags: #anthologyopen #submissionsopen</li>
                                    <li>Writing communities: Inkfetish, The Poetic Scribbles</li>
                                    <li>Facebook groups: Indian Writers Network</li>
                                </ul>
                            </div>
                            <div className="bg-ink-900/50 p-4 rounded border border-white/5">
                                <strong className="text-gold block mb-2">What to Look For:</strong>
                                <ul className="list-disc pl-4 space-y-1 text-xs">
                                    <li>Real ISBN registration mentioned</li>
                                    <li>Clear submission guidelines posted</li>
                                    <li>Professional previous editions</li>
                                    <li>Reasonable pricing transparency</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-blue-900/20 border border-blue-500/30 p-3 rounded text-center">
                            <strong>Your Goal:</strong> By end of day, have a shortlist of three anthologies worth considering.
                        </div>
                    </div>
                </DayCard>

                <DayCard day="Day 2" title="Deep Dive into Guidelines">
                    <div className="space-y-4 text-sm text-parchment/80">
                        <p><strong>Your Task:</strong> Read guidelines for your top three choices with obsessive attention to detail.</p>
                        <p><strong>Create a Comparison Sheet:</strong></p>

                        <div className="overflow-x-auto">
                            <table className="w-full text-xs border border-white/10 rounded-lg">
                                <thead className="bg-white/5 text-gold font-bold">
                                    <tr>
                                        <th className="p-2 text-left">Anthology</th>
                                        <th className="p-2 text-left">Theme</th>
                                        <th className="p-2 text-left">Word Count</th>
                                        <th className="p-2 text-left">Deadline</th>
                                        <th className="p-2 text-left">Fee</th>
                                        <th className="p-2 text-left">Benefits</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    <tr>
                                        <td className="p-2">Example 1</td>
                                        <td className="p-2">Love & Loss</td>
                                        <td className="p-2">500-1500</td>
                                        <td className="p-2">Jan 15</td>
                                        <td className="p-2">₹299</td>
                                        <td className="p-2">ISBN, Amazon, Website</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2">Example 2</td>
                                        <td className="p-2">Monsoon</td>
                                        <td className="p-2">1000 max</td>
                                        <td className="p-2">Jan 30</td>
                                        <td className="p-2">₹499</td>
                                        <td className="p-2">ISBN Only</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-blue-900/20 border border-blue-500/30 p-3 rounded text-center">
                            <strong>Your Goal:</strong> By end of day, understand exactly what each anthology requires and offers.
                        </div>
                    </div>
                </DayCard>

                <DayCard day="Day 3" title="Decide and Commit">
                    <div className="space-y-4 text-sm text-parchment/80">
                        <p><strong>Your Task:</strong> Choose one or two anthologies maximum. More spreads energy too thin.</p>
                        <ul className="list-disc pl-4 space-y-1">
                            <li>Which theme excites you most?</li>
                            <li>Which deadline is realistic?</li>
                            <li>Which benefits package offers best value?</li>
                        </ul>
                        <div className="bg-ink-900/50 p-4 rounded border border-white/5">
                            <strong className="text-gold block mb-2">Commitment Action:</strong>
                            <ul className="list-disc pl-4 space-y-1 text-xs">
                                <li>Create dedicated document</li>
                                <li>Block time on calendar for Days 4-14</li>
                                <li>Tell one person (accountability)</li>
                            </ul>
                        </div>
                        <div className="bg-blue-900/20 border border-blue-500/30 p-3 rounded text-center">
                            <strong>Your Goal:</strong> By end of day, you've committed to specific anthology(s) and scheduled writing time.
                        </div>
                    </div>
                </DayCard>
            </TimelinePhase>

            {/* 3. Phase 2: Days 4-8 - Writing & Refinement */}
            <TimelinePhase
                title="Days 4-8: Writing & Refinement"
                icon={<PenTool className="w-6 h-6 text-gold" />}
                color="border-purple-500/30"
            >
                <DayCard day="Day 4" title="Brainstorm and Free Write">
                    <div className="space-y-4 text-sm text-parchment/80">
                        <p><strong>Your Task:</strong> Generate raw material without judgment. Set a 30-min timer. Write continuously.</p>
                        <div className="bg-white/5 p-4 rounded italic text-parchment/60">
                            "I have nothing to say I have nothing to say" (write this until new words come)
                        </div>
                        <div className="bg-yellow-900/20 border border-yellow-500/30 p-3 rounded flex gap-2">
                            <AlertCircle className="w-4 h-4 text-yellow-500 shrink-0" />
                            <span><strong>Important:</strong> Do not edit anything today. Mine for gold, don't polish jewelry.</span>
                        </div>
                    </div>
                </DayCard>

                <DayCard day="Day 5" title="Select Strongest Draft">
                    <div className="space-y-4 text-sm text-parchment/80">
                        <p><strong>Your Task:</strong> Choose which draft has potential. Read aloud.</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-green-900/20 p-3 rounded border border-green-500/30">
                                <strong className="text-green-400 block mb-1">The Right Choice:</strong>
                                <ul className="text-xs space-y-1 list-disc pl-3">
                                    <li>Makes you nervous to share</li>
                                    <li>Has specific details</li>
                                    <li>Feels true even if imperfect</li>
                                </ul>
                            </div>
                            <div className="bg-red-900/20 p-3 rounded border border-red-500/30">
                                <strong className="text-red-400 block mb-1">Warning Signs:</strong>
                                <ul className="text-xs space-y-1 list-disc pl-3">
                                    <li>Sounds "poetic" (clichéd)</li>
                                    <li>Feels safe</li>
                                    <li>Chosen because you think editors want it</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </DayCard>

                <DayCard day="Day 6" title="First Revision - Structure">
                    <div className="space-y-4 text-sm text-parchment/80">
                        <p><strong>Your Task:</strong> Strengthen emotional arc and structure.</p>
                        <ul className="list-disc pl-4 space-y-2">
                            <li><strong>Opening:</strong> does it grab attention? <br /><span className="text-xs opacity-60">Weak: "This is a poem about love." vs Strong: "I kept the receipt from our first date."</span></li>
                            <li><strong>Emotional Arc:</strong> does it go somewhere?</li>
                            <li><strong>Line Breaks:</strong> are they intentional? (See Chapter 2)</li>
                            <li><strong>Ending:</strong> does it land with impact?</li>
                        </ul>
                    </div>
                </DayCard>

                <DayCard day="Day 7" title="Second Revision - Bilingual Enhancement">
                    <div className="space-y-4 text-sm text-parchment/80">
                        <p><strong>Your Task:</strong> Add depth through strategic Hindi-English layering (Review Chapter 3).</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <strong className="text-gold text-xs uppercase">Where to Add Hindi:</strong>
                                <ul className="list-disc pl-4 text-xs space-y-1 mt-1">
                                    <li>Emotional turning points</li>
                                    <li>Cultural details</li>
                                    <li>Untranslatable feelings (viraha)</li>
                                </ul>
                            </div>
                            <div>
                                <strong className="text-gold text-xs uppercase">Where Not to Add:</strong>
                                <ul className="list-disc pl-4 text-xs space-y-1 mt-1">
                                    <li>Random decoration</li>
                                    <li>When English is equal</li>
                                    <li>Where it interrupts flow</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </DayCard>

                <DayCard day="Day 8" title="Final Polish">
                    <div className="space-y-4 text-sm text-parchment/80">
                        <p><strong>Your Task:</strong> Clean up technical issues.</p>
                        <div className="bg-ink-900/50 p-4 rounded border border-white/5">
                            <strong className="text-gold block mb-2 flex items-center gap-2"><CheckSquare className="w-3 h-3" /> Polish Checklist</strong>
                            <ul className="space-y-2 text-xs">
                                <li className="flex gap-2"><span className="text-gold">•</span> Grammar/Punctuation: Intentional choices only.</li>
                                <li className="flex gap-2"><span className="text-gold">•</span> Cliché Hunt: Replace "Love is fire", "Tears", "Soul".</li>
                                <li className="flex gap-2"><span className="text-gold">•</span> Specificity Check: Replace abstract words.</li>
                                <li className="flex gap-2"><span className="text-gold">•</span> Adverb Elimination: Kill -ly words.</li>
                                <li className="flex gap-2"><span className="text-gold">•</span> Formatting: Match guidelines exactly.</li>
                            </ul>
                        </div>
                    </div>
                </DayCard>
            </TimelinePhase>

            {/* 4. Phase 3: Days 9-11 - Feedback & Final Revision */}
            <TimelinePhase
                title="Days 9-11: Feedback & Final Revision"
                icon={<Users className="w-6 h-6 text-gold" />}
                color="border-green-500/30"
            >
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DayCard day="Day 9" title="Get Feedback">
                        <p className="text-sm text-parchment/80 mb-2"><strong>Ask Specifics:</strong></p>
                        <ul className="list-disc pl-4 text-xs text-parchment/70 space-y-1">
                            <li>Which lines are strongest?</li>
                            <li>Which lines confused you?</li>
                            <li>Where did you lose interest?</li>
                            <li><strong>Do not ask:</strong> "Do you like it?"</li>
                        </ul>
                    </DayCard>
                    <DayCard day="Day 10" title="Incorporate Feedback">
                        <p className="text-sm text-parchment/80 mb-2"><strong>Prioritize:</strong></p>
                        <ul className="list-disc pl-4 text-xs text-parchment/70 space-y-1">
                            <li>Fix confusing lines immediately.</li>
                            <li>Consider pacing issues.</li>
                            <li>Ignore feedback that changes your voice entirely.</li>
                        </ul>
                    </DayCard>
                    <DayCard day="Day 11" title="Final Read-Through">
                        <p className="text-sm text-parchment/80 mb-2"><strong>The 3 Checks:</strong></p>
                        <ul className="list-disc pl-4 text-xs text-parchment/70 space-y-1">
                            <li>Read Aloud 1: Flow/Tongue-twisters.</li>
                            <li>Read Aloud 2: Emotional Impact.</li>
                            <li>Read Aloud 3: Rhythm/Music.</li>
                            <li><strong>Then sleep on it.</strong></li>
                        </ul>
                    </DayCard>
                </div>
            </TimelinePhase>

            {/* 5. Phase 4: Days 12-13 - Submission Prep */}
            <TimelinePhase
                title="Days 12-13: Submission Preparation"
                icon={<FileText className="w-6 h-6 text-gold" />}
                color="border-orange-500/30"
            >
                <DayCard day="Day 12" title="Format Perfectly">
                    <div className="space-y-4 text-sm text-parchment/80">
                        <p><strong>Your Task:</strong> Make it technically flawless. Editors reject guideline-ignorers immediately.</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-ink-900/40 p-2 rounded">Match Font Exactly</div>
                            <div className="bg-ink-900/40 p-2 rounded">Match Size (12pt)</div>
                            <div className="bg-ink-900/40 p-2 rounded">Correct Spacing</div>
                            <div className="bg-ink-900/40 p-2 rounded">Title Aligned Correctly</div>
                            <div className="bg-ink-900/40 p-2 rounded">Contact Info Included</div>
                            <div className="bg-ink-900/40 p-2 rounded">Filename Correct</div>
                        </div>
                    </div>
                </DayCard>

                <DayCard day="Day 13" title="Craft Cover Email/Bio">
                    <div className="space-y-4 text-sm text-parchment/80">
                        <p><strong>Your Task:</strong> Write a professional cover email.</p>

                        {/* Email Template */}
                        <div className="bg-white text-ink-900 p-6 rounded-lg font-sans text-sm shadow-xl border-l-4 border-blue-500">
                            <div className="border-b pb-2 mb-4 text-gray-400 text-xs">New Message</div>
                            <p className="mb-2"><strong>Subject:</strong> [Anthology Name] Submission - [Your Name]</p>
                            <p className="mb-4">Dear [Editor Name],</p>
                            <p className="mb-2">Please find attached my submission for the [Anthology Name] anthology. My [poem] "[Title]" explores [one sentence theme].</p>
                            <p className="mb-2">[One sentence background, or "This will be my first published work."]</p>
                            <p className="mb-4">I have formatted the submission according to your guidelines.</p>
                            <p className="mb-4">Best regards,<br />[Your Name]<br />[Your Email]</p>
                        </div>

                        <div className="bg-ink-900/50 p-4 rounded border border-white/5">
                            <strong className="text-gold text-xs block mb-2">Author Bio (50-75 words):</strong>
                            <p className="text-xs italic opacity-70">
                                "Priya Sharma is a Mumbai-based poet exploring themes of urban loneliness. This is her first publication..."
                            </p>
                        </div>
                    </div>
                </DayCard>
            </TimelinePhase>

            {/* 6. Phase 5: Days 14-15 - Submit & Follow Up */}
            <TimelinePhase
                title="Days 14-15: Submit & Follow Up"
                icon={<Send className="w-6 h-6 text-gold" />}
                color="border-green-500/50"
            >
                <div className="grid md:grid-cols-2 gap-6">
                    <DayCard day="Day 14" title="SUBMIT">
                        <div className="space-y-4 text-sm text-parchment/80">
                            <p><strong>Your Task:</strong> Hit the submit button.</p>
                            <ul className="list-disc pl-4 text-xs space-y-1">
                                <li>Submit during business hours (Tue-Thu ideal).</li>
                                <li>Double-click attachment to verify.</li>
                                <li>Save copy of sent email.</li>
                            </ul>
                            <div className="italic opacity-60 text-xs mt-2">
                                "The moment after is weird. You'll feel doubt. Don't obsess. Start a new project immediately."
                            </div>
                        </div>
                    </DayCard>
                    <DayCard day="Day 15" title="Optional Follow-Up">
                        <div className="space-y-4 text-sm text-parchment/80">
                            <p><strong>Your Task:</strong> Confirm receipt if needed (only if no auto-reply after 48h).</p>
                            <div className="bg-white/5 p-3 rounded text-xs">
                                <strong>Subject:</strong> Submission Confirmation Request - [Name]<br />
                                "I submitted '[Title]' on [Date]. Confirming receipt."
                            </div>
                        </div>
                    </DayCard>
                </div>
            </TimelinePhase>

            {/* 7. Post-Submission Timeline */}
            <section className="mt-16 bg-gradient-to-br from-ink-900 to-black border border-white/10 p-8 rounded-xl">
                <h3 className="text-2xl font-serif text-gold mb-8 flex items-center gap-3">
                    <Clock className="w-6 h-6" /> What Happens After Submission
                </h3>

                <div className="relative space-y-8 pl-8 md:pl-0 md:space-y-0 md:flex md:justify-between md:items-start text-sm">
                    {/* Horizontal Line for Desktop */}
                    <div className="hidden md:block absolute top-3 left-0 right-0 h-0.5 bg-white/10 -z-10" />

                    {[
                        { title: "Wk 1-2: Review", desc: "Editors read. First pass cuts weak entries. Second pass compares strong ones.", icon: <BookOpen className="w-4 h-4" /> },
                        { title: "Wk 2-3: Notification", desc: "Acceptance email with contract/payment details. Or rejection (it happens).", icon: <Mail className="w-4 h-4" /> },
                        { title: "Wk 3-6: Production", desc: "Editing, cover design, ISBN setup. Author approves final version.", icon: <Edit3 className="w-4 h-4" /> },
                        { title: "Wk 6-8: Pre-Launch", desc: "Amazon listing goes live. Author copies ship. Marketing begins.", icon: <Send className="w-4 h-4" /> },
                        { title: "Wk 8+: Published!", desc: "Book launches. ISBN active. You are a published author.", icon: <CheckCircle2 className="w-4 h-4" /> }
                    ].map((step, i) => (
                        <div key={i} className="relative md:w-1/5 md:px-2 group">
                            <div className="md:hidden absolute -left-8 top-1 bottom-0 w-0.5 bg-white/10" />
                            <div className="absolute -left-[35px] md:-left-0 md:-top-[26px] md:relative w-4 h-4 rounded-full bg-gold/20 border border-gold group-hover:bg-gold transition-colors z-10" />

                            <h4 className="font-bold text-parchment mb-1 group-hover:text-gold transition-colors">{step.title}</h4>
                            <p className="text-xs text-parchment/60 leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>

                <p className="text-center mt-12 text-parchment/50 italic text-sm">
                    Total timeline: 10-12 weeks. Your active work: 15 days. The rest is waiting while professionals work.
                </p>
            </section>

        </div>
    );
};

const TimelinePhase = ({ title, icon, color, children }: any) => (
    <div className={`border-l-2 pl-6 md:pl-8 relative py-2 ${color}`}>
        <div className="absolute -left-[11px] top-0 bg-ink-900 border border-white/20 p-1.5 rounded-full text-gold">
            {icon}
        </div>
        <h3 className="text-xl md:text-2xl font-serif text-parchment mb-6">{title}</h3>
        <div className="space-y-6">
            {children}
        </div>
    </div>
);

const DayCard = ({ day, title, children }: any) => (
    <Card className="bg-ink-900/40 border-white/5 p-6 rounded-xl hover:border-gold/20 transition-all">
        <div className="flex items-start justify-between mb-4 border-b border-white/5 pb-2">
            <h4 className="font-bold text-gold text-lg font-serif">{day}</h4>
            <span className="text-parchment/60 text-sm">{title}</span>
        </div>
        {children}
    </Card>
);
