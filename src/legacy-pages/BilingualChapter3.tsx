
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowRightLeft, ArrowDown, Mic, Play, Pause, Music, Film, Type, AlignLeft, Check, X, AlertTriangle, Scale } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";

export const ItalicsGuide = () => {
    const [activeTab, setActiveTab] = useState<'old' | 'new'>('new');

    return (
        <div className="my-12">
            <h4 className="text-gold font-bold mb-6 text-center">Italics: The New Rulebook</h4>
            <div className="grid md:grid-cols-2 gap-8">
                {/* Visual Typography Art */}
                <div className="relative aspect-square md:aspect-video rounded-xl overflow-hidden border border-white/10 group">
                    <img src="/images/typography_fusion.png" alt="Typography Fusion" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-black/90 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="text-2xl font-serif text-parchment leading-relaxed text-center">
                            "Treat Hindi as <span className="text-gold italic">integrated</span>, not foreign."
                        </div>
                    </div>
                </div>

                {/* Interactive Comparator */}
                <div className="bg-ink-900/40 p-1 rounded-xl border border-white/10 flex flex-col">
                    <div className="grid grid-cols-2 p-1 bg-black/20 rounded-lg mb-6">
                        <Button
                            variant="ghost"
                            onClick={() => setActiveTab('old')}
                            className={`${activeTab === 'old' ? 'bg-red-500/20 text-red-200' : 'text-white/40'} hover:text-white hover:bg-white/5 transition-all`}
                        >
                            Old Rule (Scary)
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => setActiveTab('new')}
                            className={`${activeTab === 'new' ? 'bg-green-500/20 text-green-200' : 'text-white/40'} hover:text-white hover:bg-white/5 transition-all`}
                        >
                            New Rule (Natural)
                        </Button>
                    </div>

                    <div className="flex-1 flex flex-col justify-center px-6 pb-6">
                        <AnimatePresence mode="wait">
                            {activeTab === 'old' ? (
                                <motion.div
                                    key="old"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-4"
                                >
                                    <h5 className="text-red-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                                        <X className="w-4 h-4" /> Outdated Approach
                                    </h5>
                                    <div className="font-serif text-lg bg-red-950/30 p-4 rounded border border-red-500/20 text-parchment/60">
                                        <span className="italic">Kya</span> I would give anything<br />
                                        To hear your voice <span className="italic">ek baar aur</span>
                                    </div>
                                    <p className="text-xs text-red-300/60">
                                        Effect: "Othering". Signals to the reader that these words are weird, foreign, or need special attention. Breaks the flow.
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="new"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-4"
                                >
                                    <h5 className="text-green-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                                        <Check className="w-4 h-4" /> Modern Approach
                                    </h5>
                                    <div className="font-serif text-lg bg-green-950/30 p-4 rounded border border-green-500/20 text-parchment">
                                        Kya I would give anything<br />
                                        To hear your voice ek baar aur
                                    </div>
                                    <p className="text-xs text-green-300/60">
                                        Effect: Seamless integration. The Hindi feels as natural as the English, mirroring the bilingual mind.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ScriptDecisionTree = () => {
    return (
        <div className="my-16 grid gap-6 md:grid-cols-2">
            <Card className="bg-ink-900/30 border-white/5 p-6 hover:bg-ink-900/50 transition-colors group">
                <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-2xl font-serif text-purple-400">अ</span>
                </div>
                <h4 className="text-lg font-bold text-parchment mb-4">When to use Devanagari</h4>
                <ul className="space-y-3 text-sm text-parchment/70">
                    <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                        <span>Instagram/Visual poetry where aesthetics matter</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                        <span>Titles or headers for dramatic effect</span>
                    </li>
                </ul>
                <div className="mt-6 p-3 bg-black/40 rounded text-center border border-purple-500/20">
                    <span className="text-2xl text-purple-300 font-serif">तुम्हारी याद</span>
                </div>
            </Card>

            <Card className="bg-ink-900/30 border-white/5 p-6 hover:bg-ink-900/50 transition-colors group">
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-2xl font-serif text-blue-400">A</span>
                </div>
                <h4 className="text-lg font-bold text-parchment mb-4">When to use Roman Script</h4>
                <ul className="space-y-3 text-sm text-parchment/70">
                    <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                        <span>Submitting to anthologies (compatibility)</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                        <span>Maximum accessibility for non-readers of script</span>
                    </li>
                </ul>
                <div className="mt-6 p-3 bg-black/40 rounded text-center border border-blue-500/20">
                    <span className="text-xl text-blue-300 font-serif">Tumhari Yaad</span>
                </div>
            </Card>

            <div className="md:col-span-2 bg-gold/5 border border-gold/20 p-4 rounded-lg flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div className="text-sm text-parchment/80">
                    <strong>For 'Love at Minus One':</strong> Submit in Roman script. You can note in your bio: "Hindi words presented in Roman script for accessibility."
                </div>
            </div>
        </div>
    );
};

export const ContextScale = () => {
    const [level, setLevel] = useState(2); // 0: Too much, 1: Too little, 2: Just right (UI logic: 1, 0, 2 order for visual flow maybe? No 1,2,3 is better)
    // Actually scale usually goes Little -> Right -> Much. Let's do 0: Little, 1: Right, 2: Much.

    const examples = [
        {
            title: "Too Little Context",
            content: "Tumhari judaai ne / Mere dil ko tod diya / Har roz intezaar mein / Main mar raha hoon",
            critique: "Alienating. If the reader knows no Hindi, this is gibberish.",
            icon: <AlertTriangle className="w-5 h-5 text-red-400" />,
            color: "text-red-400"
        },
        {
            title: "The Golden Balance",
            content: "I miss you / Main tumhe yaad karta hoon / Every morning like clockwork. / The alarm goes off and for three seconds / I forget you're not here. / Then memory hits. Phir yaad aati hai.",
            critique: "Perfect. Hindi is surrounded by enough English that meaning is inferrable.",
            icon: <Scale className="w-5 h-5 text-gold" />,
            color: "text-gold"
        },
        {
            title: "Too Much Context",
            content: "Main tumhe yaad karta hoon (I miss you in Hindi) / Every subah (morning in Hindi) when I wake up",
            critique: "Kills the poetry. Feels like a textbook translation.",
            icon: <X className="w-5 h-5 text-orange-400" />,
            color: "text-orange-400"
        }
    ];

    return (
        <div className="my-16">
            <div className="relative aspect-[21/9] rounded-xl overflow-hidden mb-12 border border-white/10">
                <img src="/images/translation_balance.png" alt="Translation Balance Scale" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-8">
                    <div className="text-center max-w-2xl">
                        <h3 className="text-3xl font-serif text-white mb-4">The Translation Tax</h3>
                        <p className="text-lg text-parchment/80">"If someone who doesn't speak Hindi can grasp <span className="text-gold font-bold">70-80%</span> of the emotion, you've balanced correctly."</p>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {examples.map((ex, i) => (
                    <Card
                        key={i}
                        onClick={() => setLevel(i)}
                        className={`bg-ink-900/20 border-white/5 p-6 cursor-pointer transition-all hover:bg-white/5 relative overflow-hidden group ${level === i ? 'ring-1 ring-gold/50 bg-white/5' : ''}`}
                    >
                        {level === i && <div className="absolute top-0 left-0 w-full h-1 bg-gold" />}
                        <div className={`mb-4 flex items-center gap-2 font-bold ${ex.color}`}>
                            {ex.icon} {ex.title}
                        </div>
                        <div className="font-serif italic text-parchment/70 mb-4 min-h-[100px]">
                            "{ex.content}"
                        </div>
                        <div className={`text-xs uppercase tracking-widest ${ex.color} opacity-80`}>
                            {ex.critique}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
