import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Book,
    Globe,
    User,
    Truck,
    Barcode,
    Layout,
    Rocket,
    Instagram,
    ShoppingCart,
    Megaphone,
    DollarSign,
    Linkedin,
    FileText,
    Users,
    Star,
    CheckCircle2,
    XCircle,
    Calendar,
    ArrowRight,
    Lock
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Chapter7Content = () => {
    return (
        <div className="space-y-16">

            {/* 1. Intro & Recap */}
            <section className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-serif text-parchment">Your Next Step Starts Here</h3>
                <div className="prose prose-invert prose-lg text-parchment/80 leading-relaxed font-serif">
                    <p>
                        Let's recap what you've learned over the past six chapters:
                        You understand why anthology publishing is your fastest path. You know how to write poetry that gets selected. You've unlocked bilingual superpowers. You have a 15-day roadmap. You know insider secrets. And you know how to leverage your status.
                    </p>
                    <p>
                        You have the knowledge. You have the tools. You have the timeline. <strong className="text-gold">Now it's time for action.</strong>
                    </p>
                </div>
            </section>

            {/* 2. Meet Love at Minus One */}
            <section className="bg-gradient-to-br from-ink-900 via-ink-900 to-blue-950/30 border border-blue-500/20 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full" />
                <h2 className="text-3xl md:text-4xl font-serif text-gold mb-6 relative z-10">Meet Love at Minus One: Winter's Most Anticipated Anthology</h2>
                <p className="text-parchment/80 max-w-3xl mx-auto mb-8 relative z-10 text-lg leading-relaxed">
                    Everything we've discussed in this guide has been building toward this moment. I want to introduce you to an anthology opportunity that embodies every quality standard, every benefit, and every best practice we've covered.
                </p>
                <div className="bg-ink-950/50 inline-block px-6 py-3 rounded-full border border-gold/30 text-gold font-bold uppercase tracking-wider text-sm relative z-10">
                    This isn't just theory anymore. This is your concrete next step.
                </div>
            </section>

            {/* 3. Inkfetish Trust Section */}
            <section className="space-y-8">
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-px bg-white/10 flex-grow" />
                    <h3 className="text-xl font-serif text-parchment/60 uppercase tracking-widest">Organized by Inkfetish</h3>
                    <div className="h-px bg-white/10 flex-grow" />
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <h4 className="text-3xl font-serif text-gold">199K Writers Trust Us</h4>
                        <p className="text-parchment/80 leading-relaxed">
                            Inkfetish isn't just another organizer. We're an established literary community with a proven track record. When you publish with us, you're joining a community, not just a project.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex gap-3 text-parchment/70 text-sm"><CheckCircle2 className="w-5 h-5 text-gold shrink-0" /> Community of 199,000 engaged writers on Instagram</li>
                            <li className="flex gap-3 text-parchment/70 text-sm"><CheckCircle2 className="w-5 h-5 text-gold shrink-0" /> Multiple successful anthology editions published</li>
                            <li className="flex gap-3 text-parchment/70 text-sm"><CheckCircle2 className="w-5 h-5 text-gold shrink-0" /> Recognized voice in Indian creative writing</li>
                        </ul>
                    </div>
                    <div className="bg-ink-900/50 p-6 rounded-xl border border-white/5 grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-white/5 rounded-lg">
                            <Users className="w-8 h-8 text-gold mx-auto mb-2" />
                            <div className="text-2xl font-bold text-parchment">199K+</div>
                            <div className="text-xs text-parchment/50 uppercase tracking-wider">Community</div>
                        </div>
                        <div className="text-center p-4 bg-white/5 rounded-lg">
                            <Book className="w-8 h-8 text-gold mx-auto mb-2" />
                            <div className="text-2xl font-bold text-parchment">Multiple</div>
                            <div className="text-xs text-parchment/50 uppercase tracking-wider">Bestsellers</div>
                        </div>
                        <div className="text-center p-4 bg-white/5 rounded-lg col-span-2">
                            <Star className="w-8 h-8 text-gold mx-auto mb-2" />
                            <div className="text-2xl font-bold text-parchment">Premium</div>
                            <div className="text-xs text-parchment/50 uppercase tracking-wider">Quality Standard</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. The Quality Standards (Benefits) */}
            <section className="space-y-12">
                <div className="text-center max-w-3xl mx-auto">
                    <h3 className="text-3xl font-serif text-gold mb-4">The Quality Standards We Set</h3>
                    <p className="text-parchment/70 italic">Let me show you exactly what co-authors receive. The complete package.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <BenefitCard icon={<User className="w-5 h-5" />} title="Published Co-Author Status" desc="Lifetime credential. Searchable. Verifiable. Official." />
                    <BenefitCard icon={<Globe className="w-5 h-5" />} title="Personal Author Website" desc="Custom domain (yourname.inkfetish.com). Your permanent portfolio." />
                    <BenefitCard icon={<ShoppingCart className="w-5 h-5" />} title="Amazon Author Profile" desc="Global visibility. Usually takes years to build." />
                    <BenefitCard icon={<Book className="w-5 h-5" />} title="Physical Book Delivered" desc="Tangible proof. Printed copies sent to your door." />
                    <BenefitCard icon={<Barcode className="w-5 h-5" />} title="Official ISBN Number" desc="Library-quality registration. Not a vanity PDF." />
                    <BenefitCard icon={<FileText className="w-5 h-5" />} title="Author Bio Page" desc="Dedicated page inside book with your photo and bio." />
                    <BenefitCard icon={<Layout className="w-5 h-5" />} title="Professional Book Design" desc="Premium cover and interior layout by experts." />
                    <BenefitCard icon={<Megaphone className="w-5 h-5" />} title="Massive Social Proof" desc="Announced to 199K followers. Instant visibility." />
                    <BenefitCard icon={<DollarSign className="w-5 h-5" />} title="Lifetime Royalty Rights" desc="Earn from every copy sold, forever. Passive income." />
                </div>

                <div className="bg-ink-900/40 p-6 rounded-xl border border-gold/20 text-center">
                    <p className="text-parchment/80 italic">
                        "This is the complete package. If an anthology offers significantly less than this, you should ask why."
                    </p>
                </div>
            </section>

            {/* 5. The Theme */}
            <section className="relative bg-black rounded-2xl overflow-hidden min-h-[400px] flex items-center justify-center border border-white/10 group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity duration-700 contrast-125 saturate-0" />
                <div className="relative z-10 p-8 md:p-16 max-w-4xl text-center space-y-6">
                    <h3 className="text-4xl md:text-6xl font-serif text-white mb-2 drop-shadow-2xl tracking-tight">Love at Minus One</h3>
                    <p className="text-blue-100/90 text-lg md:text-xl font-serif leading-relaxed drop-shadow-lg italic">
                        "The minus one is the absence. The person-shaped hole. <br />The empty chair. The love that existed but doesn't anymore."
                    </p>
                    <div className="grid md:grid-cols-2 gap-8 text-left mt-8 bg-black/60 p-8 rounded-xl backdrop-blur-md border border-white/10">
                        <div>
                            <strong className="text-blue-200 block mb-4 uppercase tracking-widest text-xs">What We're Looking For</strong>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5" /> Love lost in any form</li>
                                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5" /> Heartbreak with depth</li>
                                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5" /> Winter metaphors</li>
                                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5" /> Bilingual explorations</li>
                            </ul>
                        </div>
                        <div>
                            <strong className="text-red-200 block mb-4 uppercase tracking-widest text-xs">What We're NOT Looking For</strong>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 mt-0.5" /> Generic heartbreak</li>
                                <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 mt-0.5" /> Surface-level emotions</li>
                                <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 mt-0.5" /> Happy love poems</li>
                                <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 mt-0.5" /> Abstract musings</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Submission Details & Status */}
            <section className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <h3 className="text-2xl font-serif text-parchment">Submission Details</h3>

                    <div className="space-y-6">
                        <div className="bg-ink-900/50 p-6 rounded-xl border border-white/5">
                            <h4 className="font-bold text-gold mb-4 flex items-center gap-2"><Calendar className="w-5 h-5" /> Timeline</h4>
                            <ul className="space-y-3 text-sm text-parchment/80">
                                <li className="flex justify-between border-b border-white/5 pb-2"><span>Submissions Open</span> <span className="text-green-400">Live Now</span></li>
                                <li className="flex justify-between border-b border-white/5 pb-2"><span>Deadline</span> <span>Check Instagram</span></li>
                                <li className="flex justify-between border-b border-white/5 pb-2"><span>Selection Notification</span> <span>Within 2 weeks</span></li>
                                <li className="flex justify-between"><span>Book Launch</span> <span>Feb 2025</span></li>
                            </ul>
                        </div>

                        <div className="bg-ink-900/50 p-6 rounded-xl border border-white/5">
                            <h4 className="font-bold text-gold mb-4 flex items-center gap-2"><CheckSquare className="w-5 h-5" /> Requirements</h4>
                            <ul className="space-y-2 text-sm text-parchment/80">
                                <li>• 500-2000 words</li>
                                <li>• .docx format, Times New Roman, 12pt</li>
                                <li>• Must fit "Love at Minus One" theme</li>
                                <li>• Unpublished work only</li>
                                <li>• One submission per writer</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <h3 className="text-2xl font-serif text-parchment">Current Status</h3>

                    <div className="bg-gradient-to-br from-ink-900 to-ink-950 p-8 rounded-2xl border border-gold/30 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10"><Rocket className="w-32 h-32" /></div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-parchment/60 text-sm uppercase tracking-widest">Spots Available</span>
                                <span className="text-gold font-bold text-3xl font-serif">144 / 200</span>
                            </div>
                            <div className="w-full bg-ink-800 rounded-full h-3 mb-6 overflow-hidden">
                                <div className="bg-gold h-full w-[28%]" />
                            </div>

                            <p className="text-sm text-parchment/70 mb-8 leading-relaxed">
                                <strong>56 co-authors confirmed.</strong> Quality anthologies fill fast. Early submission secures your spot and ensures editor freshness.
                            </p>

                            <div className="border-t border-white/10 pt-6">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-bold text-parchment">Entry Fee</span>
                                    <span className="font-bold text-gold text-2xl">₹299</span>
                                </div>
                                <p className="text-xs text-parchment/50 mb-6 italic">
                                    Covers professional editorial review. Serious submissions only. Co-author contribution applies if selected (check Instagram).
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-ink-900/30 p-6 rounded-xl border border-white/5 italic text-sm text-parchment/70">
                        <p className="mb-4">"The personal author website alone is worth it. I share that link everywhere now." - Rahul M.</p>
                        <p className="mb-0">"Publishing with Inkfetish gave me visibility I could never build alone." - Karan P.</p>
                    </div>
                </div>
            </section>

            {/* 7. How to Submit */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-gold text-center mb-8">How to Submit (Your Action Steps)</h3>
                <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <StepCard num="1" title="Prepare" desc="Write, Bilingual-ize, Revise (Chapters 2-5)" />
                    <StepCard num="2" title="Format" desc=".docx, 12pt Times New Roman, Contact Info" />
                    <StepCard num="3" title="Portal" desc="Go to Instagram @inkfetish link in bio" />
                    <StepCard num="4" title="Upload" desc="Upload file & pay ₹299 entry fee" />
                    <StepCard num="5" title="Wait" desc="Notification within 2 weeks" />
                </div>
            </section>

            {/* 8. Final CTA */}
            <section className="text-center py-12 border-t border-white/10">
                <h2 className="text-3xl md:text-5xl font-serif text-parchment mb-6">The Opportunity Window Is Now</h2>
                <p className="text-parchment/60 text-lg max-w-2xl mx-auto mb-8">
                    The difference between "I'll submit someday" and "I am a published author" is 15 days and one decision. That decision is yours to make. Right now.
                </p>
                <Button className="bg-gold text-ink-950 hover:bg-yellow-500 font-bold px-8 py-6 text-lg rounded-full" onClick={() => window.open('https://instagram.com/inkfetish', '_blank')}>
                    Submit via Instagram @inkfetish
                </Button>
            </section>

        </div>
    );
};

const BenefitCard = ({ icon, title, desc }: any) => (
    <Card className="bg-ink-900/40 border-white/5 p-5 hover:border-gold/20 transition-all group">
        <div className="bg-gold/10 w-10 h-10 rounded-full flex items-center justify-center text-gold mb-4 group-hover:bg-gold group-hover:text-ink-900 transition-colors">
            {icon}
        </div>
        <h4 className="font-bold text-parchment mb-2">{title}</h4>
        <p className="text-sm text-parchment/60 leading-relaxed">{desc}</p>
    </Card>
);

const StepCard = ({ num, title, desc }: any) => (
    <div className="bg-ink-900/30 border border-white/5 p-6 rounded-xl text-center hover:bg-ink-900/50 transition-all relative">
        <div className="text-4xl font-bold text-white/5 absolute top-2 right-4">{num}</div>
        <h4 className="font-bold text-gold mb-2 text-lg">{title}</h4>
        <p className="text-xs text-parchment/60">{desc}</p>
    </div>
);

function CheckSquare(props: any) {
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
            <path d="m9 11 3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
    )
}
