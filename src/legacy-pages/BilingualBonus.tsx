
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, CheckCircle2, ChevronRight, ChevronLeft, BookOpen, Quote, Mail, Sparkles, Instagram, ExternalLink, Bookmark } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PromptsDeck = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prompts = [
        { id: 1, title: "The Unsent Text", theme: "Silence", content: "Write about a text you typed but never sent. Use Hindi for what you wanted to say, English for why you didn't send it." },
        { id: 2, title: "The Distance Between Us", theme: "Dooriyan", content: "Explore 'dooriyan' in a relationship where you're physically together but emotionally miles apart." },
        { id: 3, title: "The Almost Conversation", theme: "Fear", content: "Write about the conversation you keep avoiding. English for the rehearsed version, Hindi for the honest truth." },
        { id: 4, title: "The Freeze", theme: "Stasis", content: "Capture the moment a relationship froze-not ended, but stopped growing. Hindi for the feeling, English for analysis." },
        { id: 5, title: "The 'We're Fine' Lie", theme: "Facade", content: "Everyone asks if you're together. you say 'we're fine.' Write about the khamoshi (loaded silence) behind that phrase." },
        { id: 6, title: "The Waiting Game", theme: "Intezaar", content: "Write about waiting for someone to decide they want you. Use 'intezaar' and show the toll." },
        { id: 7, title: "The Unspoken Rules", theme: "Ambiguity", content: "A relationship with no labels, just unspoken rules. Use code-switching to show the contradiction." },
        { id: 8, title: "The Emotional Weather", theme: "Atmosphere", content: "Describe your relationship as temperature. Hindi for cold/warmth. Show it dropping to minus one." },
        { id: 9, title: "The Almost-Daily Texts", theme: "Routine", content: "You text daily, but it's lonely. Hindi for disappointment, English for surface interaction." },
        { id: 10, title: "The Goodbye That Wasn't", theme: "Closure", content: "A relationship ending without a breakup. Use 'guzar-gaya' (passed by) for endings without closure." },
        { id: 11, title: "The Comparison", theme: "Reality vs Image", content: "Instagram relationship vs reality. English caption, Hindi truth." },
        { id: 12, title: "Physical Touch, Emotional Distance", theme: "Disconnect", content: "Intimacy without connection. Hindi for body, English for analysis." },
        { id: 13, title: "The Hope That Won't Die", theme: "Ummeed", content: "Explore 'ummeed' (hope) that becomes destructive even when you know it's over." },
        { id: 14, title: "The Code-Switch Moment", theme: "Identity", content: "The exact moment you switched from 'we' to 'I' in your mind. Show through language shift." },
        { id: 15, title: "The Silence After Fighting", theme: "Khamoshi", content: "Write about the loaded silence after an argument, not the fight itself." },
        { id: 16, title: "The Maybe Someday", theme: "Deferral", content: "'Maybe when the timing's better' is a lie. Hindi for yearning, English for rational acceptance." },
        { id: 17, title: "The Parallel Lives", theme: "Divergence", content: "Moving forward, but not together. Dooriyan growing from paths diverging." },
        { id: 18, title: "The Emotional Checklist", theme: "Numbness", content: "Going through motions, feeling nothing. Use Hindi to capture the numbness." },
        { id: 19, title: "The Question You Can't Ask", theme: "Vulnerability", content: "One clarifying question you're too afraid to ask. Hindi for question, English for fear." },
        { id: 20, title: "The Minus One Manifesto", theme: "Definition", content: "Define 'minus one' personally. Use both languages for a complete definition." },
    ];

    const nextPrompt = () => setCurrentIndex((prev) => (prev + 1) % prompts.length);
    const prevPrompt = () => setCurrentIndex((prev) => (prev - 1 + prompts.length) % prompts.length);

    return (
        <div className="relative my-16">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gold/5 blur-3xl rounded-full opacity-30 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        exit={{ opacity: 0, scale: 0.9, rotateY: -90 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-md"
                    >
                        <Card className="bg-ink-900 border-gold/30 aspect-[3/4] flex flex-col items-center justify-center p-8 text-center relative shadow-2xl shadow-gold/10 group">
                            <div className="absolute top-4 right-4 text-gold/30 font-serif text-4xl font-bold opacity-20 group-hover:opacity-40 transition-opacity">
                                {prompts[currentIndex].id}
                            </div>

                            <Badge variant="outline" className="mb-6 border-gold/50 text-gold bg-gold/5 uppercase tracking-widest">
                                {prompts[currentIndex].theme}
                            </Badge>

                            <h3 className="text-2xl font-serif text-white mb-6 leading-tight">
                                {prompts[currentIndex].title}
                            </h3>

                            <div className="w-12 h-px bg-gold/50 mb-6" />

                            <p className="text-parchment text-lg italic leading-relaxed">
                                "{prompts[currentIndex].content}"
                            </p>

                            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                                <span className="w-1.5 h-1.5 rounded-full bg-gold/20" />
                                <span className="w-1.5 h-1.5 rounded-full bg-gold/20" />
                            </div>
                        </Card>
                    </motion.div>
                </AnimatePresence>

                <div className="flex items-center gap-8 mt-8">
                    <Button variant="outline" onClick={prevPrompt} className="rounded-full w-12 h-12 p-0 border-white/20 hover:border-gold hover:text-gold bg-transparent">
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <span className="text-parchment/60 text-sm font-mono">
                        {currentIndex + 1} / {prompts.length}
                    </span>
                    <Button variant="outline" onClick={nextPrompt} className="rounded-full w-12 h-12 p-0 border-white/20 hover:border-gold hover:text-gold bg-transparent">
                        <ChevronRight className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export const SubmissionEmail = () => {
    const [copied, setCopied] = useState(false);
    const emailText = `Subject: Bilingual Poetry Submission: 'Minus One' for Love at Minus One

Dear [Editor Name],

I'm submitting 'Minus One,' a bilingual poem written in Hinglish, for consideration in the Love at Minus One anthology.

The poem explores the specific emotional space of relationships frozen at 'minus one degree'-not yet broken, but no longer warm. Through organic code-switching between English and Hindi/Urdu, the poem captures how modern relationship dysfunction (commitment fears, situationships) intersects with traditional heartbreak vocabulary (khamoshi, intezaar, dooriyan).

The bilingual approach reflects how many young Indians actually process these experiences-some feelings require English's analytical distance, others demand Hindi's emotional intimacy. Rather than translating experience into one language, this poem presents it as it originally occurred: in the space between English and Hindi.

I'm a 24-year-old poet from Mumbai whose work explores modern love through a bilingual lens. I believe this piece aligns strongly with your anthology's theme of emotional distance and frozen feelings in contemporary relationships.

Thank you for creating space for authentic Indian voices that refuse linguistic purity. I look forward to hearing from you.

Best,
[Your Name]
Instagram: @yourhandle
Email: your@email.com`;

    const handleCopy = () => {
        navigator.clipboard.writeText(emailText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#ffffff', '#fcd34d']
        });
    };

    return (
        <div className="relative my-12 group">
            <div className="absolute inset-0 bg-white/5 rotate-1 rounded-lg transition-transform group-hover:rotate-2 duration-500" />
            <div className="relative bg-ink-900 border border-white/10 p-8 rounded-lg shadow-xl">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/10 p-2 rounded-full">
                            <Mail className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                            <p className="text-xs text-parchment/60 uppercase tracking-widest">Appendix A</p>
                            <h4 className="text-white font-serif text-lg">Submission Email Template</h4>
                        </div>
                    </div>
                    <Button
                        size="sm"
                        onClick={handleCopy}
                        className={`transition-all ${copied ? 'bg-green-600 text-white' : 'bg-gold text-ink-900 hover:bg-white'}`}
                    >
                        {copied ? <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Copied</span> : <span className="flex items-center gap-2"><Copy className="w-4 h-4" /> Copy Text</span>}
                    </Button>
                </div>

                <div className="bg-black/40 p-6 rounded border border-white/5 font-mono text-sm text-parchment/80 whitespace-pre-wrap max-h-[300px] overflow-y-auto custom-scrollbar shadow-inner">
                    {emailText}
                </div>
            </div>
        </div>
    );
};

export const RecommendedReading = () => {
    const poets = [
        { name: "Arundhathi Subramaniam", desc: "Blends English with Sanskrit/Tamil references." },
        { name: "Ranjit Hoskote", desc: "Multilingual poetics & translation theory." },
        { name: "Priya Malik", desc: "Viral Hinglish spoken word sensation.", handle: "@priyamalikk" },
        { name: "Aranya Johar", desc: "Feminist Hinglish poetry.", handle: "@aranya_johar" },
        { name: "Hussain Haidry", desc: "Film dialogue writer & Hinglish poet.", handle: "@hussainhaidry" },
    ];

    return (
        <div className="grid md:grid-cols-2 gap-8 my-12">
            <div>
                <Card className="h-full bg-ink-900/50 border-white/10 p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-5">
                        <BookOpen className="w-32 h-32 text-white" />
                    </div>

                    <h4 className="text-xl font-serif text-gold mb-6 flex items-center gap-2">
                        <Bookmark className="w-5 h-5" /> Poets to Study
                    </h4>

                    <div className="space-y-4 relative z-10">
                        {poets.map((poet, idx) => (
                            <div key={idx} className="border-b border-white/5 last:border-0 pb-3 last:pb-0">
                                <p className="text-white font-bold text-lg">{poet.name}</p>
                                <p className="text-parchment/60 text-sm">{poet.desc}</p>
                                {poet.handle && (
                                    <span className="inline-flex items-center gap-1 text-gold/80 text-xs mt-1 bg-gold/5 px-2 py-0.5 rounded-full">
                                        <Instagram className="w-3 h-3" /> {poet.handle}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <div className="space-y-6">
                <Card className="bg-ink-900/50 border-white/10 p-6">
                    <h4 className="text-lg font-serif text-white mb-4">Essential Collections</h4>
                    <ul className="space-y-3 text-parchment/80 text-sm">
                        <li className="flex gap-2">
                            <BookOpen className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                            <span><strong className="text-white">The Bloodaxe Book of Contemporary Indian Poets</strong> (ed. Jeet Thayil)</span>
                        </li>
                        <li className="flex gap-2">
                            <BookOpen className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                            <span><strong className="text-white">60 Indian Poets</strong> (ed. Jeet Thayil)</span>
                        </li>
                        <li className="flex gap-2">
                            <BookOpen className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                            <span><strong className="text-white">When God Is a Traveller</strong> by Arundhathi Subramaniam</span>
                        </li>
                    </ul>
                </Card>

                <div className="bg-gold/10 p-6 rounded-lg text-center border border-gold/20">
                    <Quote className="w-8 h-8 text-gold mx-auto mb-3 opacity-50" />
                    <p className="text-parchment italic text-sm">
                        "Study them not to copy, but to see how successful Indian poets navigate multiple linguistic identities."
                    </p>
                </div>
            </div>
        </div>
    );
};
