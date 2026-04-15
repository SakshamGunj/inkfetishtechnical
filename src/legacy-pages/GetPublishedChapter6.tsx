import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Briefcase,
    Mic,
    Users,
    Newspaper,
    Linkedin,
    Instagram,
    FileText,
    DollarSign,
    TrendingUp,
    CheckCircle2,
    ArrowRight,
    Star,
    BookOpen
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Chapter6Content = () => {
    return (
        <div className="space-y-16">

            {/* 1. The Day Everything Changes - Narrative */}
            <section className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-serif text-parchment">The Day Everything Changes</h3>
                <div className="prose prose-invert prose-lg text-parchment/80 leading-relaxed font-serif">
                    <p>
                        The day your book goes live on Amazon, something fundamental shifts.
                        You're no longer "someone who writes." You're no longer "aspiring." <strong className="text-gold">You're a published author. Searchable. Verifiable. Official.</strong>
                    </p>
                    <p>
                        This isn't just about ego or validation (though those feel good too). This is about tangible opportunities that open once you have that credential.
                    </p>
                    <div className="bg-gradient-to-r from-gold/10 to-transparent border-l-4 border-gold p-6 rounded-r-xl italic text-parchment/90 my-6">
                        "Let me show you exactly how to leverage this status."
                    </div>
                </div>
            </section>

            {/* 2. Career Opportunities Grid */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-gold mb-6">Career Opportunities That Suddenly Appear</h3>
                <p className="text-parchment/80 mb-6 italic">Being a published author isn't just a title. It's a door opener.</p>

                <div className="grid md:grid-cols-2 gap-6">
                    <OpportunityCard
                        icon={<Briefcase className="w-5 h-5" />}
                        title="Freelance Writing Projects"
                        range="₹5,000 - ₹50,000"
                        desc="Content agencies prioritize published writers. It signals reliability. 'Published Author' moves you above unpublished competitors."
                    />
                    <OpportunityCard
                        icon={<Users className="w-5 h-5" />}
                        title="Content Agency Priority"
                        range="Priority Access"
                        desc="Agencies maintain rosters. Published authors get first priority for premium clients. Your anthology credit is your foot in the door."
                    />
                    <OpportunityCard
                        icon={<Mic className="w-5 h-5" />}
                        title="Speaking Opportunities"
                        range="Guest Spots"
                        desc="Libraries, colleges, and clubs seek speakers. Even with one published poem, you're fitting for engagements that build your platform."
                    />
                    <OpportunityCard
                        icon={<Newspaper className="w-5 h-5" />}
                        title="Media Features"
                        range="Publicity"
                        desc="Local newspapers love hometown author stories. 'Local Writer Published on Amazon' is a story they'll cover."
                    />
                </div>
            </section>

            {/* 3. Comparisons: LinkedIn & Instagram */}
            <section className="space-y-12">
                <h3 className="text-3xl font-serif text-parchment text-center mb-8">Social Media Power Moves</h3>

                {/* LinkedIn */}
                <div className="bg-ink-900/50 border border-blue-500/20 rounded-xl overflow-hidden">
                    <div className="bg-blue-900/20 p-4 border-b border-blue-500/20 flex items-center gap-2">
                        <Linkedin className="w-5 h-5 text-blue-400" />
                        <h4 className="font-bold text-blue-100">LinkedIn Profile Transformation</h4>
                    </div>
                    <div className="p-6 grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-2 opacity-60">
                            <span className="text-xs uppercase tracking-widest block mb-1">Before</span>
                            <div className="text-sm border-l-2 border-white/20 pl-4 py-2">
                                <h5 className="font-bold">Saksham Gunjal</h5>
                                <p>Writer | Poet | Content Enthusiast</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <span className="text-xs uppercase tracking-widest text-gold block mb-1">After (The Power Move)</span>
                            <div className="text-sm border-l-4 border-gold pl-4 py-2 bg-gold/5 rounded-r">
                                <h5 className="font-bold text-white">Saksham Gunjal</h5>
                                <p className="text-gold font-bold">Published Author | Poet | Available for Freelance Writing Projects</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-blue-950/30 p-4 text-xs text-parchment/70 border-t border-blue-500/20">
                        <strong>Also Add:</strong> "Co-authored [Anthology Name], published on Amazon with ISBN [number]" to your Experience section.
                    </div>
                </div>

                {/* Instagram */}
                <div className="bg-ink-900/50 border border-pink-500/20 rounded-xl overflow-hidden">
                    <div className="bg-pink-900/20 p-4 border-b border-pink-500/20 flex items-center gap-2">
                        <Instagram className="w-5 h-5 text-pink-400" />
                        <h4 className="font-bold text-pink-100">Instagram Bio Update</h4>
                    </div>
                    <div className="p-6 grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-2 opacity-60">
                            <span className="text-xs uppercase tracking-widest block mb-1">Before</span>
                            <div className="text-sm border-l-2 border-white/20 pl-4 py-2 font-sans">
                                <p>Poetry | Writer | Coffee Addict ☕</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <span className="text-xs uppercase tracking-widest text-gold block mb-1">After</span>
                            <div className="text-sm border-l-4 border-gold pl-4 py-2 bg-gold/5 rounded-r font-sans">
                                <p>Published Author 📚 | Poet | Work featured on Amazon | DM for collaborations</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-pink-950/30 p-4 text-xs text-parchment/70 border-t border-pink-500/20">
                        <strong>Power Tip:</strong> Pin an announcement post with your book cover. Immediate proof.
                    </div>
                </div>
            </section>

            {/* 4. Resume Snippet */}
            <section className="space-y-6">
                <h3 className="text-2xl font-serif text-gold">Resume Enhancement</h3>
                <p className="text-parchment/80">If you're applying for jobs, your publication belongs prominently on your resume.</p>

                <div className="bg-white text-black p-8 rounded shadow-xl font-serif max-w-2xl mx-auto relative text-left">
                    <div className="absolute top-0 left-0 w-full h-2 bg-black" />
                    <h4 className="border-b-2 border-black inline-block uppercase tracking-widest font-bold mb-4 text-black">Publications</h4>

                    <div className="mb-2">
                        <div className="flex justify-between items-baseline font-bold text-black">
                            <span>Co-Author, [Anthology Name]</span>
                            <span className="text-sm text-gray-600">[Month Year]</span>
                        </div>
                        <div className="italic text-sm mb-1 text-gray-700">[Publishing Organization]</div>
                        <ul className="list-disc pl-5 text-sm space-y-1 text-gray-800 marker:text-black">
                            <li>Poetry selected for inclusion in curated anthology of [X] authors</li>
                            <li>Published on Amazon, ISBN: [number]</li>
                            <li>Themes: [brief description]</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* 5. Income Streams */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-parchment mb-6">Monetizing Your Author Status</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <IncomeStreamCard
                        title="1. Freelance Writing"
                        earning="₹5,000 - ₹50,000"
                        what="Articles, blog posts, site copy."
                        why="Clients trust published writers with brand voice."
                        how="Update Upwork profile. Pitch to agencies."
                    />
                    <IncomeStreamCard
                        title="2. Workshops & Coaching"
                        earning="₹500 - ₹2,000 / session"
                        what="Teaching others your craft."
                        why="'Published Author' credential makes people willing to pay."
                        how="Start with free workshops, then offer 1-on-1."
                    />
                    <IncomeStreamCard
                        title="3. Ghostwriting"
                        earning="₹10k - ₹1 Lakh+"
                        what="Writing books/articles for others."
                        why="Clients want assurance of quality."
                        how="Join ghostwriting groups. Network with publishers."
                    />
                    <IncomeStreamCard
                        title="4. Anthology Royalties"
                        earning="Passive Income"
                        what="₹5-20 per sale."
                        why="Small individual payouts, but it's passive and forever."
                        how="Promote the book. More sales = more royalties."
                    />
                </div>
            </section>

            {/* 6. The Compounding Effect */}
            <section className="bg-gradient-to-r from-ink-900 to-emerald-950/30 border border-emerald-500/20 p-8 rounded-xl text-center">
                <TrendingUp className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-2xl font-serif text-emerald-100 mb-4">The Compounding Effect</h3>
                <p className="text-emerald-100/70 max-w-3xl mx-auto mb-8 leading-relaxed">
                    Most new authors don't realize: <strong>your first publication is a foothold.</strong><br />
                    Publication #1 gets you #2. Those get you clients. Clients get you testimonials. Testimonials get you workshops.
                </p>
                <div className="bg-ink-950/50 p-6 rounded-lg inline-block text-left max-w-lg">
                    <h5 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-4">5 Years From Now:</h5>
                    <ul className="space-y-3 text-sm text-parchment/80">
                        <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 15 Anthology Publications</li>
                        <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Regular freelance income (₹30-50k/mo)</li>
                        <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Quarterly writing workshops</li>
                        <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Growing audience</li>
                    </ul>
                </div>
                <p className="mt-8 text-parchment/50 italic text-sm">
                    "And it all started with that first anthology publication. The one you're working toward right now."
                </p>
            </section>
        </div>
    );
};

const OpportunityCard = ({ icon, title, range, desc }: any) => (
    <Card className="bg-ink-900/40 border-white/5 p-6 hover:border-gold/20 transition-all">
        <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
                <div className="text-gold bg-gold/10 p-2 rounded-full">{icon}</div>
                <h4 className="font-bold text-parchment">{title}</h4>
            </div>
            <Badge variant="outline" className="border-gold/30 text-gold text-xs">{range}</Badge>
        </div>
        <p className="text-sm text-parchment/70 leading-relaxed">{desc}</p>
    </Card>
);

const IncomeStreamCard = ({ title, earning, what, why, how }: any) => (
    <div className="bg-ink-900/40 border border-white/5 p-6 rounded-xl hover:bg-ink-900/60 transition-colors">
        <div className="flex justify-between items-start mb-3 border-b border-white/5 pb-3">
            <h4 className="font-bold text-lg text-gold font-serif">{title}</h4>
            <span className="text-green-400 font-bold text-xs bg-green-950/30 px-2 py-1 rounded">{earning}</span>
        </div>
        <div className="space-y-3 text-sm">
            <div>
                <span className="text-parchment/40 uppercase text-xs font-bold block">What</span>
                <p className="text-parchment/80">{what}</p>
            </div>
            <div>
                <span className="text-parchment/40 uppercase text-xs font-bold block">Why</span>
                <p className="text-parchment/80">{why}</p>
            </div>
            <div>
                <span className="text-parchment/40 uppercase text-xs font-bold block">How To Start</span>
                <p className="text-parchment/80">{how}</p>
            </div>
        </div>
    </div>
);
