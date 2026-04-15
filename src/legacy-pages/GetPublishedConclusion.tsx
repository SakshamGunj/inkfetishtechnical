import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle2,
    ArrowRight,
    Clock,
    Calendar,
    BookOpen,
    ExternalLink,
    PenTool,
    Instagram,
    Mail,
    Layout,
    AlertTriangle,
    Target,
    Zap,
    Heart
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ConclusionContent = () => {
    return (
        <div className="space-y-16">

            {/* 1. You Have Everything You Need - Recap */}
            <section className="space-y-8">
                <h3 className="text-2xl md:text-3xl font-serif text-parchment">You Have Everything You Need</h3>
                <div className="prose prose-invert prose-lg text-parchment/80 leading-relaxed font-serif">
                    <p>Let's review what you have at this moment:</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <RecapItem text="You understand why anthology publishing is your fastest, most affordable path." />
                    <RecapItem text="You've learned the seven elements: Specificity, Show don't tell, Strong endings, etc." />
                    <RecapItem text="You've unlocked bilingual writing techniques (Code-switching, Untranslatables)." />
                    <RecapItem text="You have a complete 15-day action plan from research to submission." />
                    <RecapItem text="You understand submission secrets: First three lines, Titles, Timing." />
                    <RecapItem text="You know how to leverage 'Published Author' status for career & income." />
                    <RecapItem text="You have a concrete opportunity: Love at Minus One (68 spots left)." />
                </div>

                <div className="bg-ink-900/50 p-6 rounded-xl border border-gold/30 text-center">
                    <p className="text-xl font-serif text-gold mb-2">You have the knowledge. You have the opportunity. You have the timeline.</p>
                    <p className="text-parchment/70 italic">What separates published authors from aspiring writers? Not talent. Not luck. <strong>Action.</strong></p>
                </div>
            </section>

            {/* 2. The Gap Between Knowing and Doing */}
            <section className="space-y-6">
                <h3 className="text-2xl font-serif text-gold">The Gap Between Knowing and Doing</h3>
                <div className="prose prose-invert prose-lg text-parchment/80 leading-relaxed font-serif">
                    <p>
                        Here's what happens to most people who read guides like this: They feel inspired. They bookmark the page. They tell themselves "I'll start tomorrow." Tomorrow becomes next month. The opportunity closes. And they're still in the same place.
                    </p>
                    <p className="font-bold text-red-400">Don't be that person.</p>
                    <p>
                        Your turn is now. Not when you're "ready." Not when you're "good enough." <strong className="text-gold">Now.</strong>
                    </p>
                    <p className="italic text-sm opacity-70">
                        "Published authors aren't better writers than you. They're writers who acted while you waited."
                    </p>
                </div>
            </section>

            {/* 3. Your 15-Day Action Plan Starts Today */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-parchment mb-6">Your 15-Day Action Plan Starts Today</h3>
                <div className="relative border-l-2 border-gold/20 ml-4 md:ml-6 space-y-12 pb-4">

                    <TimelineStep title="TODAY" icon={<Zap className="w-5 h-5" />}>
                        <ul className="text-sm text-parchment/70 space-y-2">
                            <li className="flex gap-2">• Open a fresh document</li>
                            <li className="flex gap-2">• Write "Love at Minus One" at the top</li>
                            <li className="flex gap-2">• Spend 30 minutes brainstorming (Love, Loss, Absence)</li>
                            <li className="flex gap-2 text-gold italic">• Don't edit. Don't judge. Just write.</li>
                        </ul>
                    </TimelineStep>

                    <TimelineStep title="THIS WEEK" icon={<PenTool className="w-5 h-5" />}>
                        <ul className="text-sm text-parchment/70 space-y-2">
                            <li className="flex gap-2">• Follow Days 4-8 from Chapter 4</li>
                            <li className="flex gap-2">• Write multiple drafts & select strongest</li>
                            <li className="flex gap-2">• Revise for structure & bilingual elements</li>
                            <li className="flex gap-2">• Check against the Seven Elements</li>
                        </ul>
                    </TimelineStep>

                    <TimelineStep title="NEXT WEEK" icon={<Users className="w-5 h-5" />}>
                        <ul className="text-sm text-parchment/70 space-y-2">
                            <li className="flex gap-2">• Get feedback from 2-3 trusted readers</li>
                            <li className="flex gap-2">• Incorporate improvements</li>
                            <li className="flex gap-2">• Format perfectly</li>
                            <li className="flex gap-2 font-bold text-gold">• SUBMIT before the deadline</li>
                        </ul>
                    </TimelineStep>

                    <TimelineStep title="FEBRUARY 2025" icon={<BookOpen className="w-5 h-5" />}>
                        <ul className="text-sm text-parchment/70 space-y-2">
                            <li className="flex gap-2">• Hold your published book</li>
                            <li className="flex gap-2">• Update LinkedIn to "Published Author"</li>
                            <li className="flex gap-2">• Share Amazon author page</li>
                            <li className="flex gap-2">• Begin leveraging new status</li>
                        </ul>
                    </TimelineStep>
                </div>

                <div className="bg-ink-900/50 p-4 rounded text-center text-xs text-parchment/60">
                    Total active work time: 15 days. Total transformation: Aspiring writer → Published author.
                </div>
            </section>

            {/* 4. The Decision */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-gold text-center mb-8">The Decision You're About to Make</h3>
                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="bg-gray-900/40 border-gray-700/30 p-8 grayscale opacity-70 hover:opacity-100 transition-all">
                        <h4 className="text-xl font-bold text-gray-400 mb-4">Path 1: The Familiar</h4>
                        <p className="text-sm text-gray-400 leading-relaxed mb-4">
                            "Someday." "Maybe next time." Comfortable. Safe. Requires no vulnerability.
                        </p>
                        <p className="text-sm text-gray-500 italic">
                            Result: Millions spend their lives here, never becoming published authors.
                        </p>
                    </Card>

                    <Card className="bg-gold/10 border-gold/50 p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gold/20 blur-[50px] rounded-full" />
                        <h4 className="text-xl font-bold text-gold mb-4">Path 2: The Action</h4>
                        <p className="text-sm text-parchment leading-relaxed mb-4">
                            Uncomfortable. Requires action today. Requires vulnerability. Scary. Uncertain.
                        </p>
                        <p className="text-sm text-gold font-bold">
                            Result: The only path that leads to published author status.
                        </p>
                    </Card>
                </div>
            </section>

            {/* 5. The Truth About Courage & Final Words */}
            <section className="bg-gradient-to-br from-ink-900 to-black p-8 rounded-2xl border border-white/10 space-y-6">
                <h3 className="text-2xl font-serif text-parchment">The Truth About Courage</h3>
                <div className="prose prose-invert prose-lg text-parchment/70 font-serif">
                    <p>
                        Courage doesn't feel like courage. It feels like being scared and doing it anyway.
                        Every published author felt fear, doubt, and imposter syndrome. They submitted anyway.
                    </p>
                    <p>
                        In 15 days, you could be submitting. In 10-12 weeks, holding your book. In one year, leveraging a career.
                        Or you could be in the exact same place.
                    </p>
                    <p className="text-xl text-gold font-bold text-center mt-8">
                        The 15-day countdown starts the moment you decide it does. Decide right now.
                    </p>
                </div>
                <div className="flex justify-center pt-4">
                    <Button className="bg-gold text-ink-950 hover:bg-yellow-500 font-bold px-12 py-4 rounded-full text-lg" onClick={() => window.open('https://instagram.com/inkfetish', '_blank')}>
                        Start Writing & Submit
                    </Button>
                </div>
            </section>

            {/* 6. Resources Grid */}
            <section className="space-y-8 pt-8 border-t border-white/10">
                <h3 className="text-2xl font-serif text-parchment mb-6">Resources</h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <h4 className="font-bold text-gold text-sm uppercase tracking-wider mb-2">Essential Links</h4>
                        <ResourceLink icon={<Instagram className="w-4 h-4" />} text="@inkfetish (199K Community)" />
                        <ResourceLink icon={<Globe className="w-4 h-4" />} text="www.inkfetish.com" />
                        <ResourceLink icon={<ArrowRight className="w-4 h-4" />} text="Submissions Portal (Bio Link)" />
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold text-gold text-sm uppercase tracking-wider mb-2">Recommended Tools</h4>
                        <ResourceLink icon={<PenTool className="w-4 h-4" />} text="Grammarly / Hemingway App" />
                        <ResourceLink icon={<Layout className="w-4 h-4" />} text="Notion / Trello (Organization)" />
                        <ResourceLink icon={<Google className="w-4 h-4" />} text="Google Docs (Writing)" />
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold text-gold text-sm uppercase tracking-wider mb-2">Your Next Steps</h4>
                        <ul className="text-xs text-parchment/70 space-y-2">
                            <li>1. Follow @inkfetish on Instagram</li>
                            <li>2. Read full submission guidelines</li>
                            <li>3. Start Day 1 today</li>
                            <li>4. Submit before deadline</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Footer - About Inkfetish */}
            <footer className="bg-ink-950 p-8 rounded-xl border border-white/5 text-center space-y-4 mt-8">
                <h4 className="text-gold font-serif font-bold tracking-widest uppercase">About Inkfetish</h4>
                <p className="text-parchment/60 text-sm max-w-2xl mx-auto">
                    Inkfetish is India's thriving writing community of 199,000+ poets and storytellers. We're committed to transforming aspiring writers into published authors through quality anthology projects.
                </p>
                <div className="text-xs text-parchment/30 uppercase tracking-widest mt-8">
                    Get Published in 15 Days: The Indian Writer's Fast-Track to Anthology Success<br />
                    © 2024 All Rights Reserved
                </div>
            </footer>

        </div>
    );
};

const RecapItem = ({ text }: { text: string }) => (
    <div className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/5">
        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
        <p className="text-sm text-parchment/80">{text}</p>
    </div>
);

const TimelineStep = ({ title, icon, children }: any) => (
    <div className="relative pl-8 md:pl-10">
        <div className="absolute -left-[19px] md:-left-[21px] top-0 bg-ink-900 border-2 border-gold text-gold rounded-full p-2 z-10">
            {icon}
        </div>
        <h4 className="text-xl font-bold text-gold mb-4 font-serif">{title}</h4>
        <div className="bg-ink-900/40 border border-white/5 p-4 rounded-xl">
            {children}
        </div>
    </div>
);

const ResourceLink = ({ icon, text }: any) => (
    <div className="flex items-center gap-3 text-sm text-parchment/70 hover:text-gold transition-colors cursor-pointer">
        {icon}
        <span>{text}</span>
    </div>
);

function Users(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    )
}

function Globe(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" x2="22" y1="12" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    )
}

function Google(props: any) {
    return (
        <svg  {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="currentColor" />
        </svg>
    )
}
