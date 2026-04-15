
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, CheckCircle2, ShieldCheck, PenTool, Sparkles, AlertTriangle, ArrowRight, Heart, Brain, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

export const MindsetShifter = () => {
    const thoughts = [
        {
            id: 1,
            negative: "My Hindi isn't pure enough-real Urdu poets will judge me",
            origin: "Colonial education & Class anxiety",
            reframe: "You're not writing for purists. You're writing for the 350+ million Indians who think in Hinglish-people like you."
        },
        {
            id: 2,
            negative: "My English isn't sophisticated enough-literary people will dismiss me",
            origin: "Academic elitism",
            reframe: "Your bilingualism IS your professionalism. Publishers crave this authentic voice."
        },
        {
            id: 3,
            negative: "Mixing languages makes me look unprofessional or unsure",
            origin: "Legacy 'Purity' Mindset",
            reframe: "Code-switching requires MORE sophistication. You need deep knowledge of both emotional registers."
        },
        {
            id: 4,
            negative: "I should pick one language to be taken seriously",
            origin: "Outdated Publishing Norms",
            reframe: "Amir Khusro, Mirza Ghalib, and Salman Rushdie all mixed languages. You are in good company."
        }
    ];

    const [flippedId, setFlippedId] = useState<number | null>(null);

    return (
        <div className="grid md:grid-cols-2 gap-6 my-12">
            {thoughts.map((item) => (
                <div key={item.id} className="h-64 perspective-1000 cursor-pointer group" onClick={() => setFlippedId(flippedId === item.id ? null : item.id)}>
                    <motion.div
                        initial={false}
                        animate={{ rotateY: flippedId === item.id ? 180 : 0 }}
                        transition={{ duration: 0.6, type: "spring" }}
                        className="relative w-full h-full preserve-3d"
                    >
                        {/* Front: Negative Thought */}
                        <Card className="absolute inset-0 backface-hidden bg-ink-900 border-red-500/20 p-6 flex flex-col justify-center items-center text-center shadow-lg group-hover:border-red-500/40 transition-colors">
                            <AlertTriangle className="w-8 h-8 text-red-500 mb-4" />
                            <p className="font-serif italic text-lg text-white/90">"{item.negative}"</p>
                            <p className="text-xs text-red-400 mt-4 uppercase tracking-widest flex items-center gap-2">
                                <Lock className="w-3 h-3" /> Origin: {item.origin}
                            </p>
                            <div className="mt-4 text-xs text-parchment/40">Click to Reframe</div>
                        </Card>

                        {/* Back: Positive Reframe */}
                        <Card className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-green-900/40 to-ink-900 border-green-500/30 p-6 flex flex-col justify-center items-center text-center shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                            <div className="bg-green-500/20 p-3 rounded-full mb-4">
                                <CheckCircle2 className="w-6 h-6 text-green-400" />
                            </div>
                            <p className="font-bold text-lg text-green-100">{item.reframe}</p>
                            <div className="mt-4 text-xs text-green-400/60 uppercase tracking-widest">Growth Mindset Unlocked</div>
                        </Card>
                    </motion.div>
                </div>
            ))}
        </div>
    );
};

export const PermissionSlip = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date().toLocaleDateString());
    const [isSigned, setIsSigned] = useState(false);

    const handleSign = () => {
        if (!name) return;
        setIsSigned(true);
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFD700', '#F5E6D3', '#DAA520']
        });
    };

    return (
        <div className="my-16 relative perspective-1000 max-w-2xl mx-auto">
            <motion.div
                animate={{ rotateX: isSigned ? 5 : 0, scale: isSigned ? 1.02 : 1 }}
                className="relative bg-[#F5E6D3] text-ink-900 p-8 md:p-12 rounded-sm shadow-2xl border-4 border-double border-ink-900/20"
                style={{
                    backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                }}
            >
                {/* Decorative Corner Elements */}
                <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-ink-900/30" />
                <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-ink-900/30" />
                <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-ink-900/30" />
                <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-ink-900/30" />

                <div className="text-center mb-8">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-ink-900 mb-2 tracking-tight">The Permission Slip</h2>
                    <div className="h-1 w-32 bg-ink-900 mx-auto" />
                </div>

                <div className="space-y-6 text-lg md:text-xl font-serif leading-relaxed text-center">
                    <p>
                        I, <input
                            type="text"
                            placeholder="Your Name"
                            className={`bg-transparent border-b-2 border-ink-900/50 w-48 text-center font-bold focus:outline-none focus:border-ink-900 transition-colors ${isSigned ? 'text-ink-900 cursor-default' : 'text-ink-600'}`}
                            value={name}
                            onChange={(e) => !isSigned && setName(e.target.value)}
                            disabled={isSigned}
                        />, give myself permission to:
                    </p>

                    <ul className="text-left list-disc pl-8 space-y-3 mx-auto max-w-lg">
                        <li>Write in the language(s) my heart actually speaks</li>
                        <li>Use Hindi words without explaining them to death</li>
                        <li>Create my own linguistic rules when traditional ones don't fit</li>
                        <li>Submit to anthologies that may reject me, knowing rejection is about fit, not worth</li>
                        <li>Call myself a serious poet even though I refuse linguistic purity</li>
                    </ul>

                    <div className="mt-12 flex flex-col md:flex-row justify-between items-end gap-8 pt-8 border-t border-ink-900/10">
                        <div className="w-full md:w-1/2 text-left">
                            <p className="text-sm uppercase tracking-widest mb-2 opacity-60">Signed</p>
                            {isSigned ? (
                                <motion.div
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    className="text-3xl font-cursive text-indigo-900 font-bold"
                                    style={{ fontFamily: 'cursive' }}
                                >
                                    {name}
                                </motion.div>
                            ) : (
                                <Button
                                    onClick={handleSign}
                                    disabled={!name}
                                    className="bg-ink-900 text-parchment hover:bg-ink-800 w-full font-serif"
                                >
                                    <PenTool className="w-4 h-4 mr-2" /> Sign Here
                                </Button>
                            )}
                        </div>
                        <div className="w-full md:w-1/3 text-left">
                            <p className="text-sm uppercase tracking-widest mb-2 opacity-60">Date</p>
                            <p className="font-bold border-b border-ink-900/30 pb-1">{date}</p>
                        </div>
                    </div>
                </div>

                {isSigned && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute -top-6 -right-6 bg-gold text-ink-900 w-24 h-24 rounded-full flex items-center justify-center font-bold rotate-12 shadow-xl border-4 border-white"
                    >
                        <span className="text-center text-xs uppercase tracking-widest font-black">Official<br />Poet</span>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export const ImposterAntidotes = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const antidotes = [
        {
            id: 1,
            trigger: "Who am I to break grammar rules?",
            antidote: "Every major Indian poet broke linguistic rules. That's how literature evolves. You are an innovator, not a mistake."
        },
        {
            id: 2,
            trigger: "Editors will think I'm lazy for not translating.",
            antidote: "You're not lazy, you're linguistically precise. Untranslatable words exist because some feelings live in specific languages."
        },
        {
            id: 3,
            trigger: "My work isn't literary enough.",
            antidote: "Literary means emotionally true and technically skilled. It has nothing to do with linguistic purity."
        },
        {
            id: 4,
            trigger: "Maybe I should just write in English to be safe.",
            antidote: "Safe doesn't get published. Authentic does. Editors are drowning in 'safe' English poems. Yours stands out."
        }
    ];

    return (
        <Card className="my-12 bg-ink-900/30 border-white/10 p-6 md:p-8">
            <h4 className="text-xl font-bold text-gold mb-8 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" /> Imposter Syndrome Antidotes
            </h4>

            <div className="space-y-4">
                {antidotes.map((item) => (
                    <div key={item.id} className="border border-white/5 rounded-lg overflow-hidden transition-all duration-300 hover:border-white/20 bg-black/20">
                        <button
                            onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
                            className="w-full text-left p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                        >
                            <span className="font-serif text-parchment/90 flex items-center gap-3">
                                <span className="text-xs uppercase tracking-widest text-parchment/40 bg-white/5 px-2 py-1 rounded">When you think</span>
                                "{item.trigger}"
                            </span>
                            <div className={`transition-transform duration-300 ${selectedId === item.id ? 'rotate-90' : ''}`}>
                                <ArrowRight className="w-4 h-4 text-gold/50" />
                            </div>
                        </button>

                        <AnimatePresence>
                            {selectedId === item.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-4 pt-0 border-t border-white/5 bg-gold/5">
                                        <div className="flex gap-3 items-start mt-4">
                                            <Sparkles className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-xs uppercase tracking-widest text-gold mb-1 font-bold">Remember</p>
                                                <p className="text-white leading-relaxed">{item.antidote}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </Card>
    );
};
