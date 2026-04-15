import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Languages,
    MessageCircle,
    Type,
    Music,
    Globe,
    XCircle,
    CheckCircle2,
    BookOpen,
    AlertTriangle,
    Sparkles,
    Mic,
    RefreshCw
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Chapter3Content = () => {
    return (
        <div className="space-y-16">

            {/* 1. Introduction - Narrative */}
            <section className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-serif text-parchment">Your Secret Superpower</h3>
                <div className="prose prose-invert prose-lg text-parchment/80 leading-relaxed font-serif">
                    <p>
                        You have an advantage most English-language poets don't: <strong className="text-gold">you think in multiple languages.</strong>
                    </p>
                    <p>
                        When you feel something deeply, your mind reaches for words in Hindi and English simultaneously. Sometimes the perfect word is "longing." Sometimes it's "viraha." Sometimes it's the way those two words sit next to each other, each adding meaning the other can't fully capture.
                    </p>
                    <div className="bg-gradient-to-r from-gold/10 to-transparent border-l-4 border-gold p-6 rounded-r-xl italic text-parchment/90 my-6">
                        "This isn't a limitation. It's a superpower. And anthology editors know it."
                    </div>
                </div>
            </section>

            {/* 2. Why Bilingual Works - Benefits Grid */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-gold mb-6">Why Bilingual Writing Gives You an Edge</h3>
                <p className="text-parchment/80 mb-8 italic">
                    Think about the last time you tried to explain a Hindi word to someone who only speaks English. "Udaasi" isn't just sadness. "Ghar" isn't just house. "Kal" means both yesterday and tomorrow. These untranslatable moments are where the best poetry lives.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-ink-900/40 border-white/10 p-6 hover:border-gold/30 transition-all group">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-purple-500/10 p-3 rounded-full text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                                <MessageCircle className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-parchment text-lg">Richer Emotional Vocabulary</h4>
                        </div>
                        <p className="text-sm text-parchment/70">
                            Some feelings exist more fully in Hindi. <em>Viraha</em> isn't just longing; it's the ache of separation. You use the Hindi word with context to capture depth English can't reach.
                        </p>
                    </Card>

                    <Card className="bg-ink-900/40 border-white/10 p-6 hover:border-gold/30 transition-all group">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-green-500/10 p-3 rounded-full text-green-400 group-hover:bg-green-500/20 transition-colors">
                                <Languages className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-parchment text-lg">Cultural Authenticity</h4>
                        </div>
                        <p className="text-sm text-parchment/70">
                            Code-switching signals lived experience. You're not performing Indianness; you're writing from inside your actual life. Editors recognize this authenticity immediately.
                        </p>
                    </Card>

                    <Card className="bg-ink-900/40 border-white/10 p-6 hover:border-gold/30 transition-all group">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-blue-500/10 p-3 rounded-full text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                                <Mic className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-parchment text-lg">Distinctive Voice</h4>
                        </div>
                        <p className="text-sm text-parchment/70">
                            In a stack of 100 submissions, bilingual poems stand out. They have rhythms and textures that purely English poems don't. Your voice becomes memorable.
                        </p>
                    </Card>

                    <Card className="bg-ink-900/40 border-white/10 p-6 hover:border-gold/30 transition-all group">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-orange-500/10 p-3 rounded-full text-orange-400 group-hover:bg-orange-500/20 transition-colors">
                                <Globe className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-parchment text-lg">Global Appeal with Local Truth</h4>
                        </div>
                        <p className="text-sm text-parchment/70">
                            Counterintuitive but true: Bilingual poetry appeals to the global Indian diaspora. Second-gen Indians are hungry for writing that reflects their multilingual reality.
                        </p>
                    </Card>
                </div>
            </section>

            {/* 3. The 5 Techniques - Tabs */}
            <section className="space-y-8">
                <div className="mb-6 text-center">
                    <h3 className="text-3xl font-serif text-gold mb-4">The Five Bilingual Techniques That Actually Work</h3>
                    <p className="text-parchment/80 max-w-2xl mx-auto">
                        These aren't abstract principles. These are specific techniques you can apply today.
                    </p>
                </div>

                <Tabs defaultValue="tech1" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-ink-900/50 p-1 mb-8 h-auto">
                        <TabsTrigger value="tech1" className="h-12 data-[state=active]:bg-gold data-[state=active]:text-ink-black font-serif">Code-Switching</TabsTrigger>
                        <TabsTrigger value="tech2" className="h-12 data-[state=active]:bg-gold data-[state=active]:text-ink-black font-serif">Untranslatables</TabsTrigger>
                        <TabsTrigger value="tech3" className="h-12 data-[state=active]:bg-gold data-[state=active]:text-ink-black font-serif">Emotional Anchors</TabsTrigger>
                        <TabsTrigger value="tech4" className="h-12 data-[state=active]:bg-gold data-[state=active]:text-ink-black font-serif">Cultural Imagery</TabsTrigger>
                        <TabsTrigger value="tech5" className="h-12 data-[state=active]:bg-gold data-[state=active]:text-ink-black font-serif">Transliteration</TabsTrigger>
                    </TabsList>

                    <div className="bg-ink-900/30 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm min-h-[400px]">
                        <TabsContent value="tech1" className="mt-0 space-y-6">
                            <div className="flex items-center gap-3 mb-4">
                                <RefreshCw className="w-6 h-6 text-gold" />
                                <h4 className="text-2xl font-serif text-parchment">Technique 1: Code-Switching</h4>
                            </div>
                            <p className="text-parchment/80">
                                <strong>What It Is:</strong> Moving fluidly between Hindi and English generally, the way we actually talk.<br />
                                <strong>When to Use It:</strong> In dialogue, moments of heightened emotion, or to capture Indian rhythm.
                            </p>
                            <div className="bg-ink-950 p-6 rounded-lg border-l-4 border-gold italic text-parchment/90 font-serif">
                                "Come home early," she said.<br />
                                I promised.<br />
                                <strong>Ghar aane mein der ho gayi.</strong><br />
                                There's always der.<br />
                                <strong>Hamesha.</strong>
                            </div>
                            <p className="text-xs text-parchment/60 italic">
                                Note: "Ghar aane mein der ho gayi" carries the weight of repeated failures in a way "I came home late" never could.
                            </p>
                            <div className="flex items-center gap-2 text-red-300 text-sm bg-red-950/20 p-3 rounded">
                                <AlertTriangle className="w-4 h-4" /> Mistake to Avoid: Switching languages randomly without emotional reason.
                            </div>
                        </TabsContent>

                        <TabsContent value="tech2" className="mt-0 space-y-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Sparkles className="w-6 h-6 text-gold" />
                                <h4 className="text-2xl font-serif text-parchment">Technique 2: Hindi Words for Untranslatable Emotions</h4>
                            </div>
                            <p className="text-parchment/80">
                                <strong>What It Is:</strong> Using specific Hindi words that English requires entire phrases to approximate.<br />
                                <strong>Examples:</strong> <em>Viraha</em> (spiritual longing), <em>Udaasi</em> (melancholic sadness), <em>Kasak</em> (needling pain), <em>Khaalipan</em> (emptiness).
                            </p>
                            <div className="bg-ink-950 p-6 rounded-lg border-l-4 border-gold italic text-parchment/90 font-serif">
                                Your absence doesn't feel like sadness.<br />
                                It feels like <strong>viraha</strong>—<br />
                                that ancient ache poets wrote about,<br />
                                the one that sits in your chest<br />
                                and makes breathing feel like effort.
                            </div>
                            <div className="flex items-center gap-2 text-red-300 text-sm bg-red-950/20 p-3 rounded">
                                <AlertTriangle className="w-4 h-4" /> Mistake to Avoid: Immediate translation in parentheses like "(Viraha/longing)". Trust the context.
                            </div>
                        </TabsContent>

                        <TabsContent value="tech3" className="mt-0 space-y-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Anchor className="w-6 h-6 text-gold" />
                                <h4 className="text-2xl font-serif text-parchment">Technique 3: Hindi Phrases as Emotional Anchors</h4>
                            </div>
                            <p className="text-parchment/80">
                                <strong>What It Is:</strong> Using short Hindi phrases at emotional turning points.<br />
                                <strong>Powerful Phrases:</strong> "Kya karein?" (What to do?), "Ab kya?" (Now what?), "Bas itna hi?" (Just this much?).
                            </p>
                            <div className="bg-ink-950 p-6 rounded-lg border-l-4 border-gold italic text-parchment/90 font-serif">
                                You said you'd stay.<br />
                                I believed you.<br />
                                Three years later, I'm still holding the promise like loose change.<br />
                                <strong>Kya karein?</strong><br />
                                Some losses we carry like names.
                            </div>
                            <p className="text-xs text-parchment/60 italic">
                                Note: "Kya karein?" implies philosophical resignation that "What can I do?" lacks.
                            </p>
                            <div className="flex items-center gap-2 text-red-300 text-sm bg-red-950/20 p-3 rounded">
                                <AlertTriangle className="w-4 h-4" /> Mistake to Avoid: Overusing. One or two per poem is enough.
                            </div>
                        </TabsContent>

                        <TabsContent value="tech4" className="mt-0 space-y-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Globe className="w-6 h-6 text-gold" />
                                <h4 className="text-2xl font-serif text-parchment">Technique 4: Cultural Imagery in English</h4>
                            </div>
                            <p className="text-parchment/80">
                                <strong>What It Is:</strong> Describing Indian scenes using English words. Cultural resonance through imagery, not just language.<br />
                                <strong>Examples:</strong> Monsoon (not just rain), Chai in steel tumblers, Railway stations, Autorickshaws.
                            </p>
                            <div className="bg-ink-950 p-6 rounded-lg border-l-4 border-gold italic text-parchment/90 font-serif">
                                We met in <strong>monsoon</strong>,<br />
                                that first desperate July rain...<br />
                                You bought me <strong>chai from a stall</strong> with no name,<br />
                                sort ved in <strong>glasses washed with water from the tap</strong> we both knew better than to trust.<br />
                                We drank anyway.
                            </div>
                            <div className="flex items-center gap-2 text-red-300 text-sm bg-red-950/20 p-3 rounded">
                                <AlertTriangle className="w-4 h-4" /> Mistake to Avoid: Explaining details unnecessarily like "Golgappa (a fried hollow sphere...)".
                            </div>
                        </TabsContent>

                        <TabsContent value="tech5" className="mt-0 space-y-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Type className="w-6 h-6 text-gold" />
                                <h4 className="text-2xl font-serif text-parchment">Technique 5: Transliteration with Context</h4>
                            </div>
                            <p className="text-parchment/80">
                                <strong>What It Is:</strong> Writing Hindi words in Roman script, letting context clarify meaning.<br />
                                <strong>When to Use It:</strong> When the Hindi word is more precise or musical than English.
                            </p>
                            <div className="bg-ink-950 p-6 rounded-lg border-l-4 border-gold italic text-parchment/90 font-serif">
                                Winter hit in November...<br />
                                The <strong>sardi</strong> wasn't just weather—<br />
                                it was the coldness of your absence<br />
                                creeping into every corner,<br />
                                making warm chai taste like duty.
                            </div>
                            <div className="flex items-center gap-2 text-red-300 text-sm bg-red-950/20 p-3 rounded">
                                <AlertTriangle className="w-4 h-4" /> Mistake to Avoid: Using "Main" instead of "I" for no reason. Use Hindi only when it adds something.
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </section>

            {/* 4. Common Mistakes - Red Cards */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-parchment mb-6">Common Bilingual Mistakes to Avoid</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-red-950/20 border border-red-900/30 p-6 rounded-xl">
                        <h4 className="text-red-400 font-bold mb-3 flex items-center gap-2"><XCircle className="w-5 h-5" /> 1. Over-Translation</h4>
                        <p className="text-sm text-parchment/70 mb-2"><strong>Bad:</strong> I feel viraha (longing/separation) for you.</p>
                        <p className="text-xs text-parchment/50">Parentheses kill flow. Contextualize instead.</p>
                    </div>
                    <div className="bg-red-950/20 border border-red-900/30 p-6 rounded-xl">
                        <h4 className="text-red-400 font-bold mb-3 flex items-center gap-2"><XCircle className="w-5 h-5" /> 2. Random Insertion</h4>
                        <p className="text-sm text-parchment/70 mb-2"><strong>Bad:</strong> The pyaar between us was strong. We had vishwas.</p>
                        <p className="text-xs text-parchment/50">Doesn't add meaning. "Love" and "Trust" work fine here.</p>
                    </div>
                    <div className="bg-red-950/20 border border-red-900/30 p-6 rounded-xl">
                        <h4 className="text-red-400 font-bold mb-3 flex items-center gap-2"><XCircle className="w-5 h-5" /> 3. Alienating Readers</h4>
                        <p className="text-sm text-parchment/70 mb-2"><strong>Bad:</strong> Long stretches of Hindi with zero English context.</p>
                        <p className="text-xs text-parchment/50">Make meaning accessible to all through strategic context.</p>
                    </div>
                    <div className="bg-red-950/20 border border-red-900/30 p-6 rounded-xl">
                        <h4 className="text-red-400 font-bold mb-3 flex items-center gap-2"><XCircle className="w-5 h-5" /> 4. Over-Italicizing</h4>
                        <p className="text-sm text-parchment/70 mb-2"><strong>Bad:</strong> When it rains, I remember <em>teri yaad</em>.</p>
                        <p className="text-xs text-parchment/50">Italics create distance. Let languages flow naturally.</p>
                    </div>
                </div>
            </section>

            {/* 5. Practice Exercise - Showcase */}
            <section className="my-16 bg-gradient-to-br from-ink-900 to-black border border-gold/30 rounded-2xl p-8 relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-2xl font-serif text-gold mb-6">Practice Exercise: Bilingual Depth</h3>
                    <p className="text-parchment/80 mb-8">
                        Take this generic English line and rewrite it with bilingual depth using different techniques.<br />
                        <strong>Original:</strong> "I miss you when it rains."
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                            <h5 className="font-bold text-parchment text-sm mb-2">Version 1 (Hindi Emotional Word)</h5>
                            <p className="text-parchment/60 italic text-sm">"When it rains, I feel <span className="text-gold/80">viraha</span> - that old wound poets wrote about."</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                            <h5 className="font-bold text-parchment text-sm mb-2">Version 2 (Code-Switching)</h5>
                            <p className="text-parchment/60 italic text-sm">"When it rains, I think <span className="text-gold/80">tumhe kahan baarish aayi hogi</span>. Did you remember me too?"</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                            <h5 className="font-bold text-parchment text-sm mb-2">Version 3 (Hindi Phrase Anchor)</h5>
                            <p className="text-parchment/60 italic text-sm">"When it rains, I wonder if you're dry wherever you are. <span className="text-gold/80">Kya karein?</span> Missing you has become its own weather."</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                            <h5 className="font-bold text-parchment text-sm mb-2">Version 4 (Cultural Imagery)</h5>
                            <p className="text-parchment/60 italic text-sm">"When <span className="text-gold/80">monsoon</span> came this year, I stood on the balcony like we used to, <span className="text-gold/80">chai</span> in hand, waiting for someone who lives in another city now."</p>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-parchment/70 italic text-sm">
                        "Bilingual entries have a massive advantage in anthology selections. Editors at Inkfetish specifically celebrate this. You're already ahead of the curve."
                    </p>
                </div>
            </section>

        </div>
    );
};

function Anchor(props: any) {
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
            <circle cx="12" cy="5" r="3" />
            <line x1="12" x2="12" y1="22" y2="8" />
            <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
        </svg>
    )
}
