
import React, { useState } from 'react';
import { Heart, Club, Cloud, Timer, Clock, Mic2, Book, Sparkles, AlertTriangle } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';

// Mock pronunciation (since we can't do real audio easily)
const SpeakerIcon = () => (
    <span className="inline-block p-1 bg-white/5 rounded-full hover:bg-gold/20 cursor-pointer transition-colors ml-2" title="Pronunciation">
        <Mic2 className="w-3 h-3 text-parchment/60" />
    </span>
);

export const WordVault = () => {

    const categories = [
        {
            id: 'love',
            title: 'Love (Pyaar)',
            icon: <Heart className="w-4 h-4" />,
            color: 'from-pink-900/40 to-ink-900',
            borderColor: 'border-pink-500/20',
            words: [
                { word: 'Mohabbat', script: 'मोहब्बत', meaning: 'Love deeper than pyaar; obsessive, all-consuming', usage: "Your mohabbat became my madness" },
                { word: 'Ishq', script: 'इश्क़', meaning: 'Passionate, often unrequited love; love that destroys', usage: "Ishq is just another word for choosing pain" },
                { word: 'Chahat', script: 'चाहat', meaning: 'Desire, deep wanting', usage: "My chahat died the day you said 'maybe'" },
                { word: 'Junoon', script: 'जूनून', meaning: 'Passionate obsession, fervent love', usage: "What we had wasn't love, it was junoon-and junoon always burns out" },
                { word: 'Lagan', script: 'लगन', meaning: 'Attachment, devotion that persists', usage: "Even after you left, my lagan wouldn't let go" }
            ]
        },
        {
            id: 'heartbreak',
            title: 'Heartbreak (Dard)',
            icon: <AlertTriangle className="w-4 h-4" />,
            color: 'from-red-900/40 to-ink-900',
            borderColor: 'border-red-500/20',
            words: [
                { word: 'Judaai', script: 'जुदाई', meaning: 'Separation; the state of being apart', usage: "This judaai is teaching me who I am without you" },
                { word: 'Gham', script: 'ग़म', meaning: 'Grief, deep sorrow', usage: "Your absence left gham that English 'sadness' doesn't touch" },
                { word: 'Dard', script: 'दर्द', meaning: 'Pain, specifically emotional pain', usage: "There's dard, and then there's the dard of loving someone who doesn't try" },
                { word: 'Rog', script: 'रोग', meaning: 'Disease; here used for consuming heartache', usage: "You became my rog-the sickness I couldn't cure" },
                { word: 'Zakham', script: 'ज़ख्म', meaning: 'Wound, deep injury', usage: "Old zakham that never fully healed" }
            ]
        },
        {
            id: 'longing',
            title: 'Longing (Intezaar)',
            icon: <Clock className="w-4 h-4" />,
            color: 'from-purple-900/40 to-ink-900',
            borderColor: 'border-purple-500/20',
            words: [
                { word: 'Intezaar', script: 'इंतज़ार', meaning: 'Waiting with hope slowly fading', usage: "Intezaar is just hope dressed up in patience" },
                { word: 'Viraha', script: 'विरह', meaning: 'Aching separation from beloved', usage: "This viraha sits in my chest like a stone" },
                { word: 'Aas', script: 'आस', meaning: 'Hope, expectation', usage: "I live on the edge of aas that you'll come back" },
                { word: 'Tamanna', script: 'तमन्ना', meaning: 'Deep wish, yearning', usage: "My only tamanna was to be enough for you" },
                { word: 'Khwaab', script: 'ख्वाब', meaning: 'Dream', usage: "You were a khwaab I tried to live in" }
            ]
        },
        {
            id: 'silence',
            title: 'Silence (Khamoshi)',
            icon: <Cloud className="w-4 h-4" />,
            color: 'from-blue-900/40 to-ink-900',
            borderColor: 'border-blue-500/20',
            words: [
                { word: 'Khamoshi', script: 'खामोशी', meaning: 'Weighted silence, meaningful quiet', usage: "There's a khamoshi between us that words can't fix" },
                { word: 'Dooriyan', script: 'दूरियां', meaning: 'Distances (plural)', usage: "The dooriyan grow-not in miles, in meanings" },
                { word: 'Tanhaai', script: 'तन्हाई', meaning: 'Loneliness, solitude', usage: "I never knew tanhaai until I was surrounded by people who don't see me" },
                { word: 'Sunaapan', script: 'सूनापन', meaning: 'Emptiness, desolation', usage: "Your leaving created sunaapan that objects can't fill" },
                { word: 'Maun', script: 'मौन', meaning: 'Silence, particularly chosen silence', usage: "I chose maun over explaining myself again" }
            ]
        },
        {
            id: 'time',
            title: 'Time (Waqt)',
            icon: <Timer className="w-4 h-4" />,
            color: 'from-amber-900/40 to-ink-900',
            borderColor: 'border-amber-500/20',
            words: [
                { word: 'Waqt', script: 'वक़्त', meaning: 'Time', usage: "They say waqt heals everything, but waqt is tired of waiting for me to move on" },
                { word: 'Yaad', script: 'याद', meaning: 'Memory, remembrance', usage: "Tumhari yaad is muscle memory I can't unlearn" },
                { word: 'Pal', script: 'पल', meaning: 'Moment', usage: "We had our pal, and then it was gone" },
                { word: 'Lamha', script: 'लम्हा', meaning: 'Fleeting moment', usage: "Every lamha with you felt borrowed" },
                { word: 'Guzar-gaya', script: 'गुज़र गया', meaning: 'Passed, gone by', usage: "That version of us guzar-gaya-we can't go back" }
            ]
        }
    ];

    return (
        <div className="my-16">
            <h4 className="text-gold font-bold mb-8 flex items-center justify-center gap-2">
                <Book className="w-5 h-5" /> The Vault of Necessary Words
            </h4>

            <Tabs defaultValue="love" className="w-full">
                <div className="flex overflow-x-auto pb-4 mb-4 timeline-scrollbar">
                    <TabsList className="bg-transparent border-b border-white/10 w-full justify-start md:justify-center p-0 h-auto gap-2">
                        {categories.map(cat => (
                            <TabsTrigger
                                key={cat.id}
                                value={cat.id}
                                className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold data-[state=active]:border-b-2 data-[state=active]:border-gold rounded-none px-4 py-3 flex items-center gap-2 transition-all"
                            >
                                {cat.icon} {cat.title}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                {categories.map(cat => (
                    <TabsContent key={cat.id} value={cat.id} className="mt-4">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cat.words.map((wordObj, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <div className={`
                                        group relative overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br ${cat.color} 
                                        p-6 h-full hover:border-gold/40 transition-all duration-500 hover:shadow-2xl hover:shadow-${cat.id}-500/10
                                    `}>
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h5 className="text-2xl font-serif text-white font-bold tracking-wide">{wordObj.word}</h5>
                                                    <p className="text-gold/60 text-lg font-serif">{wordObj.script} <SpeakerIcon /></p>
                                                </div>
                                                <div className={`p-2 rounded-full border ${cat.borderColor} bg-black/20 text-white/50`}>
                                                    {cat.icon}
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <p className="text-xs uppercase tracking-widest text-parchment/40 mb-1">Meaning</p>
                                                    <p className="text-sm text-parchment leading-relaxed">{wordObj.meaning}</p>
                                                </div>

                                                <div className="pt-4 border-t border-white/5">
                                                    <p className="text-xs uppercase tracking-widest text-parchment/40 mb-1">Usage</p>
                                                    <p className="text-sm text-white/90 italic">"{wordObj.usage}"</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hover Glow Effect */}
                                        <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};

export const UsageRecipe = () => {
    return (
        <Card className="my-12 p-8 bg-ink-900/50 border-gold/30">
            <h4 className="text-xl font-bold text-parchment mb-6 text-center">Protocol: How to Use This Bible</h4>
            <div className="grid md:grid-cols-5 gap-4 relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-6 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

                {[
                    { step: 1, title: "Draft", desc: "Write the full skeleton in English first." },
                    { step: 2, title: "Identify", desc: "Circle the emotional peaks (where you feel most)." },
                    { step: 3, title: "Consult", desc: "Find the Hindi word in the Vault that matches the weight." },
                    { step: 4, title: "Replace", desc: "Swap English for Hindi ONLY at those peaks." },
                    { step: 5, title: "Test", desc: "Read aloud. Does it feel authentic or forced?" }
                ].map((item) => (
                    <div key={item.step} className="relative z-10 flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-ink-800 border border-gold text-gold flex items-center justify-center font-bold text-lg mb-4 shadow-lg shadow-black">
                            {item.step}
                        </div>
                        <h5 className="font-bold text-white mb-2">{item.title}</h5>
                        <p className="text-xs text-parchment/60">{item.desc}</p>
                    </div>
                ))}
            </div>

            <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex gap-4 items-start">
                <Sparkles className="w-5 h-5 text-yellow-500 shrink-0 mt-1" />
                <p className="text-sm text-yellow-200/80">
                    <strong className="text-yellow-400">Pro Tip:</strong> Don't use more than 3-4 untranslatable words per poem. Strategic deployment creates power. Overuse creates confusion.
                </p>
            </div>
        </Card>
    );
};
