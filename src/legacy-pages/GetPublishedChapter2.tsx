import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Heart,
    Sparkles,
    PenTool,
    Layers,
    XCircle,
    CheckCircle2,
    Search,
    Eye,
    Zap,
    AlertTriangle,
    Scissors,
    Anchor,
    Feather,
    ArrowRight
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Chapter2Content = () => {
    return (
        <div className="space-y-16">

            {/* 1. The Brutal Truth - Narrative Intro */}
            <section className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-serif text-parchment">The Brutal Truth About Submissions</h3>
                <div className="prose prose-invert prose-lg text-parchment/80 leading-relaxed font-serif">
                    <p>Let's be honest: most poetry submissions get rejected.</p>
                    <p>Not because they're terrible. Not because the editors are cruel. But because they're <strong>forgettable.</strong></p>
                    <p>An anthology editor receives 100 to 200 submissions for 50 available spots. They spend maybe two minutes per poem, sometimes less. They're looking for reasons to say yes, but mostly they're finding reasons to say no.</p>
                    <div className="bg-ink-800/50 p-6 rounded-xl border-l-4 border-red-500 italic text-parchment/90 my-6">
                        "Your poem has 120 seconds to make someone stop scrolling and say, 'This one. This one matters.' Here's how you write that poem."
                    </div>
                </div>
            </section>

            {/* 2. Selection Formula - Visual Infographic */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-gold mb-6">What Anthology Editors Actually Look For</h3>
                <p className="text-parchment/80 mb-8 italic">
                    I've spoken with dozens of anthology editors, reviewed hundreds of submissions, and edited poetry collections myself. The selection criteria are consistent across quality anthologies. Here's exactly what determines whether your poem gets selected.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Emotional Impact 40% */}
                    <Card className="bg-ink-900/40 border-pink-500/30 p-6 relative overflow-hidden group hover:border-pink-500/50 transition-all">
                        <div className="absolute inset-0 bg-pink-500/5 group-hover:bg-pink-500/10 transition-colors" />
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-4">
                                <Heart className="w-8 h-8 text-pink-400" />
                                <span className="text-2xl font-black text-pink-500/50">40%</span>
                            </div>
                            <h4 className="font-bold text-pink-300 mb-2">Emotional Impact</h4>
                            <p className="text-xs text-parchment/70 leading-relaxed">
                                Does this poem make me feel something? Editors can forgive technical issues, but not emotional flatness.
                            </p>
                        </div>
                    </Card>

                    {/* Originality 30% */}
                    <Card className="bg-ink-900/40 border-purple-500/30 p-6 relative overflow-hidden group hover:border-purple-500/50 transition-all">
                        <div className="absolute inset-0 bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors" />
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-4">
                                <Sparkles className="w-8 h-8 text-purple-400" />
                                <span className="text-2xl font-black text-purple-500/50">30%</span>
                            </div>
                            <h4 className="font-bold text-purple-300 mb-2">Originality</h4>
                            <p className="text-xs text-parchment/70 leading-relaxed">
                                Have I read this 50 times? Does this voice sound distinct? Your specific truth in your specific voice.
                            </p>
                        </div>
                    </Card>

                    {/* Technical Quality 20% */}
                    <Card className="bg-ink-900/40 border-blue-500/30 p-6 relative overflow-hidden group hover:border-blue-500/50 transition-all">
                        <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors" />
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-4">
                                <PenTool className="w-8 h-8 text-blue-400" />
                                <span className="text-2xl font-black text-blue-500/50">20%</span>
                            </div>
                            <h4 className="font-bold text-blue-300 mb-2">Technical Quality</h4>
                            <p className="text-xs text-parchment/70 leading-relaxed">
                                Basic grammar, intentional line breaks, pacing. You don't need perfection, but you need competence.
                            </p>
                        </div>
                    </Card>

                    {/* Theme Fit 10% */}
                    <Card className="bg-ink-900/40 border-green-500/30 p-6 relative overflow-hidden group hover:border-green-500/50 transition-all">
                        <div className="absolute inset-0 bg-green-500/5 group-hover:bg-green-500/10 transition-colors" />
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-4">
                                <Layers className="w-8 h-8 text-green-400" />
                                <span className="text-2xl font-black text-green-500/50">10%</span>
                            </div>
                            <h4 className="font-bold text-green-300 mb-2">Theme Fit</h4>
                            <p className="text-xs text-parchment/70 leading-relaxed">
                                Does it belong? Submitting a happy poem to a heartbreak anthology makes the editor's job harder.
                            </p>
                        </div>
                    </Card>
                </div>
            </section>

            {/* 3. Selected vs Rejected Breakdown - Comparison Component */}
            <section className="space-y-8">
                <div className="mb-6">
                    <h3 className="text-2xl font-serif text-parchment mb-2">The Selected vs Rejected Breakdown</h3>
                    <p className="text-parchment/60 text-sm italic">Let me show you why similar poems get different outcomes.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Rejected Example */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-red-400 font-bold uppercase tracking-wider text-sm border-b border-red-500/30 pb-2">
                            <XCircle className="w-5 h-5" /> Example 1: The Generic Rejection
                        </div>
                        <div className="bg-ink-950 p-6 rounded-lg font-serif italic text-parchment/60 border border-white/5">
                            "I miss you when it rains<br />
                            My heart feels so much pain<br />
                            The memories remain<br />
                            Like tears on the windowpane"
                        </div>
                        <div className="bg-red-950/20 p-4 rounded-lg border-l-2 border-red-500">
                            <h5 className="font-bold text-red-300 mb-2 text-sm">Why This Failed:</h5>
                            <p className="text-sm text-parchment/70 leading-relaxed">
                                Zero specificity. "Miss you" tells us nothing. "Heart feels pain" is the laziest emotional shorthand. "Memories remain" is vague. "Tears on windowpane" is a cliché 10,000 times over. Generic. Forgettable.
                            </p>
                        </div>
                    </div>

                    {/* Selected Example */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-green-400 font-bold uppercase tracking-wider text-sm border-b border-green-500/30 pb-2">
                            <CheckCircle2 className="w-5 h-5" /> Example 2: The Specific Selection
                        </div>
                        <div className="bg-ink-950 p-6 rounded-lg font-serif italic text-parchment border border-gold/30">
                            "I miss you in Decembers<br />
                            when fruit vendors sell oranges<br />
                            we never bought together...<br />
                            Tumhara absence bhari hai.<br />
                            Weightier than your presence ever was."
                        </div>
                        <div className="bg-green-950/20 p-4 rounded-lg border-l-2 border-green-500">
                            <h5 className="font-bold text-green-300 mb-2 text-sm">Why This Worked:</h5>
                            <p className="text-sm text-parchment/70 leading-relaxed">
                                Specificity everywhere (Decembers, Oranges, Autorickshaws). Bilingual element ("Tumhara absence bhari hai") adds authenticity. The ending subverts expectation. We can see it, feel it, remember it.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. The Seven Elements - Accordion/List */}
            <section className="space-y-8">
                <div className="mb-6 text-center">
                    <h3 className="text-3xl font-serif text-gold mb-4">The Seven Elements of Selection-Worthy Poetry</h3>
                    <p className="text-parchment/80 max-w-2xl mx-auto">
                        Every selected poem contains most or all of these seven elements. Master these, and your selection rate will skyrocket.
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Element 1 */}
                    <ElementItem
                        icon={<Search className="w-6 h-6 text-gold" />}
                        title="1. Specificity (The Most Important Rule)"
                        definition="Using concrete details instead of abstract generalizations."
                        why="Generic statements create distance. Specific details create vivid images that stick."
                        bad="I was sad when you left."
                        good="I rearranged the kitchen three times the week you left, moving your favorite mug to progressively higher shelves."
                        practice="Take any abstract emotion (love, anger) and describe it using only physical objects. Never name the emotion."
                    />

                    {/* Element 2 */}
                    <ElementItem
                        icon={<Anchor className="w-6 h-6 text-gold" />}
                        title="2. Cultural Resonance"
                        definition="Using imagery/language that feels authentically Indian without explaining it."
                        why="Editors seek authentic voices. Cultural specificity is your advantage."
                        bad="The tea was cold when you came home."
                        good="The chai cooled in steel tumblers... Ghar laut aaye, finally. But different."
                        practice="Ground a universal emotion in a specifically Indian setting (Railway stations, Monsoon, Weddings)."
                    />

                    {/* Element 3 */}
                    <ElementItem
                        icon={<Eye className="w-6 h-6 text-gold" />}
                        title="3. Show, Don't Tell"
                        definition="Demonstrating emotion through action, image, and scene rather than naming it."
                        why="Telling creates distance. Showing creates emotional transfer."
                        bad="I felt angry and betrayed."
                        good="I found the receipts folded in your wallet... Made dinner. The silence tasted like rust."
                        practice="Write about jealousy without using words like jealous or insecure. Use only actions."
                    />

                    {/* Element 4 */}
                    <ElementItem
                        icon={<Zap className="w-6 h-6 text-gold" />}
                        title="4. Surprising Metaphors"
                        definition="Comparing unlike things in ways that create fresh insights."
                        why="Original metaphors make editors pause. Clichés (Love is fire) lose impact."
                        bad="Love is a fire. Time is a river."
                        good="Our relationship was a shared Netflix subscription nobody wanted to cancel first."
                        practice="Create a contemporary Indian metaphor for a tired concept using modern details (Swiggy, WhatsApp)."
                    />

                    {/* Element 5 */}
                    <ElementItem
                        icon={<AlertTriangle className="w-6 h-6 text-gold" />}
                        title="5. Authentic Vulnerability"
                        definition="Revealing truths that feel risky, admitting messy feelings."
                        why="Readers connect with honesty, not perfection. Shameful truths hit harder."
                        bad="I loved you purely and completely."
                        good="I loved you angrily. Resented how your absence meant more... Checked your Instagram after you blocked me."
                        practice="Write about an emotion you're slightly ashamed of (Jealousy, Relief at failure)."
                    />

                    {/* Element 6 */}
                    <ElementItem
                        icon={<Scissors className="w-6 h-6 text-gold" />}
                        title="6. Intentional Line Breaks"
                        definition="Ending lines at deliberate points to control pacing/emphasis."
                        why="Random breaks show lack of craft. Intentional breaks show mastery."
                        bad="I wanted to / call you yesterday / but I didn't"
                        good="I wanted to call you yesterday. / Didn't. / Knew you wouldn't answer."
                        practice="Break a prose paragraph into lines three different ways. Compare the pacing."
                    />

                    {/* Element 7 */}
                    <ElementItem
                        icon={<ArrowRight className="w-6 h-6 text-gold" />}
                        title="7. Strong Ending"
                        definition="Concluding with an impactful line or image."
                        why="Endings are what readers remember. It's your final argument for selection."
                        bad="I'll always remember you."
                        good="I kept the shirt... Like leaving evidence at a crime scene. Maybe I want to be caught."
                        practice="Write three endings: Vague, Surprising, Image-based. Compare them."
                    />
                </div>
            </section>

            {/* 5. Putting It All Together - Practice */}
            <section className="my-16 bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm">
                <h3 className="text-2xl font-serif text-gold mb-6">Putting It All Together: Practice Exercise</h3>
                <p className="text-parchment/80 mb-6">
                    Take these three scenarios and write a 10-15 line poem for each, ensuring you hit all seven elements:
                </p>
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-ink-900 p-4 rounded border border-white/5 text-sm text-parchment/70">1. The moment you realized someone who said they loved you was lying.</div>
                    <div className="bg-ink-900 p-4 rounded border border-white/5 text-sm text-parchment/70">2. Running into someone you used to love at a mundane place (grocery store, etc.).</div>
                    <div className="bg-ink-900 p-4 rounded border border-white/5 text-sm text-parchment/70">3. The first time you felt truly alone after a relationship ended.</div>
                </div>

                <div className="bg-ink-800/50 p-6 rounded-lg border border-gold/20">
                    <h4 className="font-bold text-gold mb-4 text-sm uppercase tracking-widest">Self-Score Checklist</h4>
                    <div className="grid md:grid-cols-2 gap-y-2 text-sm text-parchment/80">
                        <div className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Specific details (no generic statements)</div>
                        <div className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Cultural resonance (Indian context)</div>
                        <div className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Showing not telling</div>
                        <div className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Fresh metaphors (nothing clichéd)</div>
                        <div className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Authentic vulnerability</div>
                        <div className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Intentional line breaks</div>
                        <div className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Strong ending</div>
                    </div>
                </div>
                <p className="mt-8 text-center italic text-parchment/60 text-sm">
                    "Selection-worthy poems score 7 or higher on all seven elements. Not perfect, but consistently strong."
                </p>
            </section>

            {/* 6. Pro Tip Callout */}
            <div className="bg-gradient-to-r from-gold/10 to-transparent border-l-4 border-gold p-8 rounded-r-xl my-12">
                <h4 className="font-bold text-gold text-lg mb-2 flex items-center gap-2"><Sparkles className="w-5 h-5" /> Pro Tip</h4>
                <p className="text-parchment/80 leading-relaxed">
                    Using these techniques and strategies? You can get published in our upcoming anthology by Inkfetish: <strong>Love at Minus One</strong>. Submissions are open now, and editors are specifically looking for poetry with emotional depth, cultural authenticity, and unique voice. Exactly what we just covered.
                </p>
            </div>

        </div>
    );
};

const ElementItem = ({ icon, title, definition, why, bad, good, practice }: any) => (
    <div className="bg-ink-900/30 border border-white/5 rounded-xl overflow-hidden hover:border-gold/30 transition-all group">
        <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/5 rounded-full group-hover:bg-gold/10 transition-colors">
                    {icon}
                </div>
                <h4 className="text-xl font-bold text-parchment font-serif">{title}</h4>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <p className="text-sm text-parchment/90 mb-2 font-bold">{definition}</p>
                    <p className="text-xs text-parchment/60 italic mb-4">{why}</p>
                    <div className="bg-white/5 p-3 rounded text-xs space-y-2">
                        <div className="text-red-300"><span className="font-bold uppercase text-[10px]">Bad:</span> "{bad}"</div>
                        <div className="text-green-300"><span className="font-bold uppercase text-[10px]">Good:</span> "{good}"</div>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="w-full bg-ink-950/50 border-l-2 border-gold/50 p-3 rounded-r text-xs text-parchment/70">
                        <span className="text-gold font-bold block mb-1 uppercase text-[10px] tracking-widest">Quick Practice</span>
                        {practice}
                    </div>
                </div>
            </div>
        </div>
    </div>
);
