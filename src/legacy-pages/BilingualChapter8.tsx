
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { CheckCircle2, Circle, PenTool, Mic2, Layers, Heart, MessageCircle, AlertCircle, FileText, CheckSquare, Sparkles } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const PortfolioBlueprint = () => {
    const poems = [
        {
            id: 'poem1',
            title: '1. The Almost-Relationship',
            icon: <Heart className="w-4 h-4" />,
            specs: { length: '150-200 words', theme: 'Situationship that never became official' },
            technique: { name: 'Dialogue in Hindi', desc: "Narration in English. Use 'officially' or 'technically' in English, then Hindi for the emotional reality." },
            prompt: "Write about something that felt like a relationship but never got the title."
        },
        {
            id: 'poem2',
            title: '2. The Emotional Distance',
            icon: <Layers className="w-4 h-4" />,
            specs: { length: '100-150 words', theme: 'Together but feeling alone' },
            technique: { name: 'Untranslatable Words', desc: "Use phrases like 'khamoshi', 'dooriyan', 'tanhaai'. Use Hindi for the gaps, English for surface interaction." },
            prompt: "Describe being physically close to someone but emotionally miles apart."
        },
        {
            id: 'poem3',
            title: '3. The Frozen Moment',
            icon: <AlertCircle className="w-4 h-4" />,
            specs: { length: '200-250 words', theme: 'The pause before heartbreak' },
            technique: { name: 'Refrain Anchor', desc: "Use a Hindi phrase as a recurring question throughout the poem." },
            prompt: "Capture the moment you knew it was ending but neither of you said it yet."
        },
        {
            id: 'poem4',
            title: '4. The Unspoken',
            icon: <MessageCircle className="w-4 h-4" />,
            specs: { length: '80-120 words', theme: 'Things we never said' },
            technique: { name: 'Translation Betrayal', desc: "Show the gap between what you said (English) and what you meant (Hindi)." },
            prompt: "Write about a conversation where the Hindi truth and English words didn't match."
        },
        {
            id: 'poem5',
            title: '5. The Waiting',
            icon: <Mic2 className="w-4 h-4" />,
            specs: { length: '150-200 words', theme: "Loving someone who won't commit" },
            technique: { name: 'Cinematic Code-Switch', desc: "Narrate in English, use Hindi for your internal pleading." },
            prompt: "Describe waiting for someone to choose you."
        }
    ];

    return (
        <Card className="my-12 overflow-hidden bg-ink-900/30 border-white/10 p-6 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="mb-8 flex items-center justify-between">
                <h4 className="text-xl font-bold text-gold flex items-center gap-2">
                    <FileText className="w-5 h-5" /> Portfolio Blueprint
                </h4>
                <div className="text-xs font-serif text-parchment/60 italic">5 Strategic Pieces</div>
            </div>

            <Tabs defaultValue="poem1" className="w-full">
                <TabsList className="bg-transparent border-b border-white/10 w-full justify-start p-0 h-auto gap-4 overflow-x-auto pb-2 timeline-scrollbar">
                    {poems.map(poem => (
                        <TabsTrigger
                            key={poem.id}
                            value={poem.id}
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:text-gold data-[state=active]:bg-gold/5 px-4 py-2 transition-all"
                        >
                            {poem.title.split('.')[0]}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <div className="mt-8">
                    {poems.map(poem => (
                        <TabsContent key={poem.id} value={poem.id}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="grid md:grid-cols-2 gap-8"
                            >
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-serif text-white">{poem.title.split('. ')[1]}</h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-black/20 p-4 rounded border border-white/5">
                                            <p className="text-xs uppercase tracking-widest text-parchment/40 mb-1">Length</p>
                                            <p className="text-parchment font-semibold">{poem.specs.length}</p>
                                        </div>
                                        <div className="bg-black/20 p-4 rounded border border-white/5">
                                            <p className="text-xs uppercase tracking-widest text-parchment/40 mb-1">Theme</p>
                                            <p className="text-parchment font-semibold">{poem.specs.theme}</p>
                                        </div>
                                    </div>

                                    <div className="bg-gold/5 border border-gold/20 p-4 rounded-lg">
                                        <p className="text-xs uppercase tracking-widest text-gold mb-2 font-bold flex items-center gap-2">
                                            <Sparkles className="w-3 h-3" /> Technical Strategy
                                        </p>
                                        <p className="text-white font-bold mb-1">{poem.technique.name}</p>
                                        <p className="text-sm text-parchment/80">{poem.technique.desc}</p>
                                    </div>
                                </div>

                                <div className="bg-ink-800 p-6 rounded-lg border-l-4 border-gold relative overflow-hidden group">
                                    <div className="absolute top-2 right-2 text-6xl text-white/5 font-serif font-bold group-hover:text-white/10 transition-colors">?</div>
                                    <p className="text-xs uppercase tracking-widest text-parchment/40 mb-4">Writing Prompt</p>
                                    <p className="text-xl font-serif text-white italic leading-relaxed">"{poem.prompt}"</p>

                                    <div className="mt-8 pt-4 border-t border-white/5 flex gap-2">
                                        <div className="h-2 w-2 rounded-full bg-gold animate-pulse" />
                                        <p className="text-xs text-gold/60">Ready to draft?</p>
                                    </div>
                                </div>
                            </motion.div>
                        </TabsContent>
                    ))}
                </div>
            </Tabs>
        </Card>
    );
};

export const RevisionChecklist = () => {
    const categories = [
        {
            title: "Linguistic Authenticity",
            items: [
                "Does the Hinglish feel natural or forced?",
                "Would I actually speak this way, or am I performing 'Indian-ness'?",
                "Are Hindi words surrounded by enough context for inference?"
            ]
        },
        {
            title: "Technical Quality",
            items: [
                "Does language-switching serve the emotion, or is it arbitrary?",
                "Would a non-Hindi speaker still grasp 70-80% of meaning?",
                "Is there at least one untranslatable word carrying real weight?",
                "Are line breaks intentional?"
            ]
        },
        {
            title: "Theme Alignment",
            items: [
                "Does this fit 'love at minus one' (frozen feelings, emotional distance)?",
                "Is the emotional core clear?",
                "Does it avoid clichés while remaining relatable?"
            ]
        },
        {
            title: "Submission Readiness",
            items: [
                "Clean formatting (no weird spacing or fonts)?",
                "Consistent throughout (don't switch formatting styles)?",
                "Author note explaining bilingualism if helpful?",
                "Word count within guidelines?"
            ]
        }
    ];

    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    const toggleCheck = (idx: string) => {
        setCheckedItems(prev => ({
            ...prev,
            [idx]: !prev[idx]
        }));
    };

    const isAllChecked = (categoryIndex: number) => {
        return categories[categoryIndex].items.every((_, itemIdx) => checkedItems[`${categoryIndex}-${itemIdx}`]);
    };

    return (
        <Card className="my-12 p-8 bg-ink-900 border-white/10">
            <h4 className="text-xl font-bold text-parchment mb-6 text-center border-b border-white/10 pb-4">
                The Final Revision Gatcheck
            </h4>

            <div className="grid md:grid-cols-2 gap-8">
                {categories.map((cat, catIdx) => (
                    <div key={catIdx} className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h5 className="text-gold font-bold uppercase text-sm tracking-widest">{cat.title}</h5>
                            {isAllChecked(catIdx) && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                        </div>

                        <div className="space-y-2">
                            {cat.items.map((item, itemIdx) => {
                                const id = `${catIdx}-${itemIdx}`;
                                const checked = !!checkedItems[id];

                                return (
                                    <div
                                        key={itemIdx}
                                        onClick={() => toggleCheck(id)}
                                        className={`
                                            p-3 rounded cursor-pointer border transition-all duration-200 flex items-start gap-3
                                            ${checked ? 'bg-green-900/10 border-green-500/30' : 'bg-black/20 border-white/5 hover:bg-white/5'}
                                        `}
                                    >
                                        <div className={`mt-1 ${checked ? 'text-green-500' : 'text-parchment/30'}`}>
                                            {checked ? <CheckSquare className="w-4 h-4" /> : <div className="w-4 h-4 border border-current rounded-sm" />}
                                        </div>
                                        <p className={`text-sm ${checked ? 'text-parchment/60 line-through' : 'text-parchment'}`}>
                                            {item}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center">
                <p className="text-xs text-parchment/40 italic">
                    * If you can check all these, your portfolio is ready.
                </p>
            </div>
        </Card>
    );
};
