
import React, { useState } from 'react';
import { RefreshCw, Scissors, Sparkles, AlertTriangle, CheckCircle2, ChevronRight, Maximize2, Minimize2, ArrowRight } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ClicheFlipper = () => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="my-12 perspective-1000">
            <h4 className="text-center text-gold font-bold mb-6">Tap to Transmute Clichés</h4>
            <div
                className="relative w-full max-w-xl mx-auto cursor-pointer h-64 transition-transform duration-700 transform-style-3d"
                onClick={() => setIsFlipped(!isFlipped)}
                style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >
                {/* Front: Cliché */}
                <div className="absolute inset-0 backface-hidden bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center">
                    <span className="p-3 bg-red-500/20 rounded-full mb-4">
                        <AlertTriangle className="w-8 h-8 text-red-400" />
                    </span>
                    <h5 className="text-xl font-serif text-white mb-2">"My heart shattered into a million pieces"</h5>
                    <p className="text-sm text-red-300 uppercase tracking-widest mt-4">Status: Cliché</p>
                    <p className="text-xs text-white/40 mt-2">Seen 1,000,000 times before</p>
                </div>

                {/* Back: Fresh Image */}
                <div
                    className="absolute inset-0 backface-hidden bg-gradient-to-br from-purple-900/50 to-ink-900 border border-gold/30 rounded-xl p-8 flex flex-col items-center justify-center text-center"
                    style={{ transform: 'rotateY(180deg)' }}
                >
                    <span className="p-3 bg-gold/20 rounded-full mb-4">
                        <Sparkles className="w-8 h-8 text-gold" />
                    </span>
                    <h5 className="text-xl font-serif text-white mb-2">"I still flinch when I hear your particular knock, three quick taps and a pause"</h5>
                    <p className="text-sm text-gold uppercase tracking-widest mt-4">Status: Fresh Imagery</p>
                    <p className="text-xs text-white/40 mt-2">Specific. Personal. Yours.</p>
                </div>
            </div>
            <p className="text-center text-xs text-white/30 mt-4">(Tap card to flip)</p>
        </div>
    );
};

export const BeforeAfterPoem = () => {
    return (
        <div className="my-16">
            <h4 className="text-gold font-bold mb-6 flex items-center gap-2">
                <Maximize2 className="w-5 h-5" /> From Instagram to Anthology
            </h4>
            <Tabs defaultValue="before" className="w-full">
                <TabsList className="w-full grid grid-cols-2 bg-ink-900/50 mb-6">
                    <TabsTrigger value="before" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-300">Instagram Draft (Before)</TabsTrigger>
                    <TabsTrigger value="after" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-300">Anthology Ready (After)</TabsTrigger>
                </TabsList>

                <TabsContent value="before">
                    <Card className="p-8 bg-ink-900/30 border-white/5 relative overflow-hidden">
                        <div className="absolute top-4 right-4 text-xs font-bold text-red-400 border border-red-500/30 px-2 py-1 rounded">VAGUE & CLICHÉD</div>
                        <div className="font-serif leading-relaxed text-parchment/60 italic">
                            sometimes i think about us<br />
                            and how we were almost something<br />
                            but not quite<br />
                            you were like summer <span className="text-red-400 font-bold mx-1">[CLICHÉ]</span><br />
                            warm and bright<br />
                            but summer always ends<br />
                            and now you're gone<br />
                            and i'm cold and empty <span className="text-red-400 font-bold mx-1">[CLICHÉ]</span><br />
                            missing the warmth<br />
                            wondering if you ever think about me<br />
                            the way i still think about you
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="after">
                    <Card className="p-8 bg-gradient-to-br from-ink-900 to-black/50 border-gold/20 relative overflow-hidden">
                        <div className="absolute top-4 right-4 text-xs font-bold text-green-400 border border-green-500/30 px-2 py-1 rounded">SPECIFIC & TIGHT</div>
                        <div className="font-serif leading-relaxed text-parchment">
                            Three times you said you'd call back.<br />
                            I memorized the pattern: the way you'd<br />
                            brighten when we were alone, then cool<br />
                            the second your phone buzzed with someone else's name.<br />
                            July was full of almosts-your hand<br />
                            hovering near mine in the movie theater dark,<br />
                            never quite landing. August, you stopped<br />
                            pretending to try. September,<br />
                            I stopped checking my phone.<br />
                            Now it's December and I still can't<br />
                            wear anything yellow without thinking of your shirt,<br />
                            how it looked against my apartment wall<br />
                            the last time you almost stayed.
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export const OptimizationChecklist = () => {
    const [checked, setChecked] = useState<string[]>([]);

    const toggle = (id: string) => {
        if (checked.includes(id)) {
            setChecked(checked.filter(i => i !== id));
        } else {
            setChecked([...checked, id]);
        }
    };

    const steps = [
        { id: 'd6', day: 'Day 6', title: 'Cliché Elimination', desc: 'Circle every phrase seen before. Replace with specific truth.' },
        { id: 'd7', day: 'Day 7', title: 'Tightening & Structure', desc: 'Cut unnecessary words. Fix line breaks. Read aloud for rhythm.' },
        { id: 'd8', day: 'Day 8', title: 'Openings & Endings', desc: 'Write 3 alt openings/endings. Choose the strongest.' }
    ];

    return (
        <div className="my-12">
            <h4 className="text-gold font-bold mb-6">Your 3-Day Optimization Arc</h4>
            <div className="space-y-4">
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className={`p-4 rounded-lg cursor-pointer transition-all border ${checked.includes(step.id) ? 'bg-green-900/10 border-green-500/30' : 'bg-white/5 border-white/10 hover:border-gold/30'}`}
                        onClick={() => toggle(step.id)}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${checked.includes(step.id) ? 'bg-green-500 border-green-500' : 'border-white/30'}`}>
                                {checked.includes(step.id) && <CheckCircle2 className="w-4 h-4 text-black" />}
                            </div>
                            <div>
                                <h5 className={`font-bold ${checked.includes(step.id) ? 'text-green-400' : 'text-parchment'}`}>
                                    <span className="text-xs uppercase tracking-widest opacity-70 mr-2">{step.day}:</span>
                                    {step.title}
                                </h5>
                                <p className="text-sm text-parchment/60">{step.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <img src="/images/optimization_alchemy.png" alt="Optimization Alchemy" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                    <p className="text-xl font-serif text-gold text-center max-w-lg px-4">
                        "This is not about changing your voice. It's about removing everything that doesn't serve the poem."
                    </p>
                </div>
            </div>
        </div>
    );
};
