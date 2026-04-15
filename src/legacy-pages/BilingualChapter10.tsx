
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Calendar, Clock, ArrowRight, PenTool, Search, Mail, Sparkles, Send, FileText, StickyNote, RefreshCw, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SevenDayRoadmap = () => {
    const [activeDay, setActiveDay] = useState<number | null>(1);
    const [completedDays, setCompletedDays] = useState<number[]>([]);

    const toggleComplete = (day: number) => {
        if (completedDays.includes(day)) {
            setCompletedDays(prev => prev.filter(d => d !== day));
        } else {
            setCompletedDays(prev => [...prev, day]);
            if (day === 7) {
                confetti({
                    particleCount: 200,
                    spread: 100,
                    origin: { y: 0.6 },
                    colors: ['#FFD700', '#DAA520', '#FFFFFF']
                });
            }
        }
    };

    const days = [
        {
            day: 1,
            title: "Audit Your Existing Work",
            icon: <Search className="w-5 h-5" />,
            time: "45 mins",
            content: (
                <div className="space-y-4">
                    <p className="text-parchment/80">Go through your last 20 poems. For each, ask:</p>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-parchment/70">
                        <li>Does it already have Hindi words?</li>
                        <li>Would Hinglish make it more emotionally true?</li>
                        <li>Does it feel stiff or 'performed'?</li>
                    </ul>
                    <div className="bg-ink-900/50 p-3 rounded border border-gold/20 flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-gold" />
                        <span className="text-white font-bold text-sm">Deliverable: Mark 5 poems for bilingual revision.</span>
                    </div>
                </div>
            )
        },
        {
            day: 2,
            title: "Deep Dive Into Untranslatable Words",
            icon: <StickyNote className="w-5 h-5" />,
            time: "30 mins",
            content: (
                <div className="space-y-4">
                    <p className="text-parchment/80">From Chapter 7's bible, choose 10 words that resonate with your actual emotional experiences.</p>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-yellow-200/10 p-3 rotate-1 rounded shadow-lg border border-yellow-200/20 text-center">
                            <span className="block text-yellow-200 font-bold mb-1">Word</span>
                            <span className="text-xs text-yellow-100/60">+ Personal Memory</span>
                        </div>
                        <div className="bg-yellow-200/10 p-3 -rotate-1 rounded shadow-lg border border-yellow-200/20 text-center">
                            <span className="block text-yellow-200 font-bold mb-1">Emotion</span>
                            <span className="text-xs text-yellow-100/60">+ Why it fits</span>
                        </div>
                    </div>
                    <div className="bg-ink-900/50 p-3 rounded border border-gold/20 flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-gold" />
                        <span className="text-white font-bold text-sm">Deliverable: 10 sticky notes with words + associations.</span>
                    </div>
                </div>
            )
        },
        {
            day: 3,
            title: "Write Your First Intentionally Bilingual Poem",
            icon: <PenTool className="w-5 h-5" />,
            time: "1-2 hours",
            content: (
                <div className="space-y-4">
                    <div className="bg-gold/10 p-4 rounded border-l-4 border-gold">
                        <p className="text-xs uppercase tracking-widest text-gold font-bold mb-2">Prompt: Love at Minus One</p>
                        <p className="italic text-parchment">Write about a relationship that never officially started but still broke your heart. Think: talking stage that fizzled.</p>
                    </div>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-parchment/70">
                        <li>Use at least 3 Hindi/Urdu words from Day 2</li>
                        <li>Target: 150-200 words</li>
                        <li>Try ONE technique from Chapter 2</li>
                    </ul>
                    <div className="bg-ink-900/50 p-3 rounded border border-gold/20 flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-gold" />
                        <span className="text-white font-bold text-sm">Deliverable: Complete draft poem.</span>
                    </div>
                </div>
            )
        },
        {
            day: 4,
            title: "Revise With Technique",
            icon: <RefreshCw className="w-5 h-5" />,
            time: "1 hour",
            content: (
                <div className="space-y-4">
                    <p className="text-parchment/80">Take Day 3's poem and apply the Chapter 8 Checklist:</p>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-parchment/70">
                        <li>Circle forced Hindi words (replace/remove)</li>
                        <li>Check if non-Hindi speakers grasp 70-80%</li>
                        <li>Strengthen opening & ending lines (try 3 alternatives)</li>
                        <li>Read aloud for natural flow</li>
                    </ul>
                    <div className="bg-ink-900/50 p-3 rounded border border-gold/20 flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-gold" />
                        <span className="text-white font-bold text-sm">Deliverable: Revised poem that feels ready.</span>
                    </div>
                </div>
            )
        },
        {
            day: 5,
            title: "Portfolio Assembly",
            icon: <Layers className="w-5 h-5" />,
            time: "1-1.5 hours",
            content: (
                <div className="space-y-4">
                    <p className="text-parchment/80">Gather your 5 best bilingual poems.</p>
                    <div className="p-4 bg-white/5 rounded border border-dashed border-white/20 text-center">
                        <FileText className="w-8 h-8 text-white/20 mx-auto mb-2" />
                        <p className="font-serif text-white">"My Bilingual Poetry Portfolio"</p>
                        <p className="text-xs text-parchment/40 mt-1">Clean spacing · Roman script · Consistent formatting</p>
                    </div>
                    <div className="bg-ink-900/50 p-3 rounded border border-gold/20 flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-gold" />
                        <span className="text-white font-bold text-sm">Deliverable: One formatted document with 5 poems.</span>
                    </div>
                </div>
            )
        },
        {
            day: 6,
            title: "Research & Target",
            icon: <Search className="w-5 h-5" />,
            time: "45 mins",
            content: (
                <div className="space-y-4">
                    <ul className="list-disc pl-5 space-y-2 text-sm text-parchment/70">
                        <li>Visit submission page guidelines</li>
                        <li>Read sample poems if available</li>
                        <li>Confirm theme alignment (Emotional Distance/Frozen Feelings)</li>
                        <li>Write covering email draft</li>
                    </ul>
                    <div className="bg-ink-900/50 p-3 rounded border border-gold/20 flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-gold" />
                        <span className="text-white font-bold text-sm">Deliverable: Submission email ready & deadline noted.</span>
                    </div>
                </div>
            )
        },
        {
            day: 7,
            title: "SUBMIT",
            icon: <Send className="w-5 h-5" />,
            time: "20 mins",
            content: (
                <div className="space-y-6 text-center">
                    <p className="text-parchment/90 text-lg">Triple-check everything. Take a deep breath.</p>
                    <Button
                        onClick={() => toggleComplete(7)}
                        className={`
                            px-8 py-6 rounded-full text-xl font-bold transition-all shadow-lg hover:scroll-py-12
                            ${completedDays.includes(7) ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gold text-ink-900 hover:bg-white hover:shadow-gold/50'}
                        `}
                    >
                        {completedDays.includes(7) ? (
                            <span className="flex items-center gap-2"><CheckCircle2 /> SUBMITTED!</span>
                        ) : (
                            <span className="flex items-center gap-2">Hit Send <Send className="w-5 h-5" /></span>
                        )}
                    </Button>
                    {completedDays.includes(7) && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold font-serif italic">
                            Congratulations, Author. The wait begins.
                        </motion.div>
                    )}
                </div>
            )
        }
    ];

    return (
        <div className="my-12 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
                {/* Timeline Buttons */}
                <div className="space-y-2">
                    {days.map((item) => (
                        <button
                            key={item.day}
                            onClick={() => setActiveDay(item.day)}
                            className={`
                                w-full flex items-center justify-between p-4 rounded-lg border transition-all duration-300 text-left relative overflow-hidden group
                                ${activeDay === item.day ? 'bg-gold border-gold text-ink-900 shadow-lg shadow-gold/20 scale-105' : 'bg-black/20 border-white/5 text-parchment hover:bg-white/5'}
                                ${completedDays.includes(item.day) && activeDay !== item.day ? 'opacity-50' : ''}
                            `}
                        >
                            <div className="flex items-center gap-3 relative z-10">
                                <span className={`
                                    w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border
                                    ${activeDay === item.day ? 'bg-ink-900 text-gold border-ink-900' : 'bg-white/5 border-white/10'}
                                `}>
                                    {item.day}
                                </span>
                                <div>
                                    <p className={`text-xs uppercase tracking-widest opacity-60 font-bold ${activeDay === item.day ? 'text-ink-900' : 'text-parchment'}`}>Day {item.day}</p>
                                    <p className={`font-serif leading-tight ${activeDay === item.day ? 'font-bold' : ''}`}>{item.title}</p>
                                </div>
                            </div>

                            {completedDays.includes(item.day) && (
                                <CheckCircle2 className={`w-5 h-5 ${activeDay === item.day ? 'text-ink-900' : 'text-green-500'}`} />
                            )}
                        </button>
                    ))}
                </div>

                {/* Content Panel */}
                <div className="md:col-span-2">
                    <AnimatePresence mode="wait">
                        {activeDay && (
                            <motion.div
                                key={activeDay}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="h-full bg-ink-900/50 border-gold/30 p-8 relative overflow-hidden">
                                    {/* Background Decor */}
                                    <div className="absolute top-0 right-0 p-8 opacity-10">
                                        {days[activeDay - 1].icon && React.cloneElement(days[activeDay - 1].icon as React.ReactElement, { className: "w-32 h-32 text-gold" })}
                                    </div>

                                    <div className="relative z-10 space-y-6">
                                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                            <h3 className="text-2xl font-serif text-white">{days[activeDay - 1].title}</h3>
                                            <div className="flex items-center gap-2 text-gold/80 bg-gold/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                                <Clock className="w-3 h-3" /> {days[activeDay - 1].time}
                                            </div>
                                        </div>

                                        <div className="min-h-[200px]">
                                            {days[activeDay - 1].content}
                                        </div>

                                        <div className="pt-8 border-t border-white/10 flex justify-between items-center">
                                            <Button
                                                variant="ghost"
                                                className="text-parchment/40 hover:text-white hover:bg-white/5"
                                                onClick={() => setActiveDay(Math.max(1, activeDay - 1))}
                                                disabled={activeDay === 1}
                                            >
                                                Previous
                                            </Button>

                                            <Button
                                                onClick={() => {
                                                    toggleComplete(activeDay);
                                                    if (activeDay < 7 && !completedDays.includes(activeDay)) {
                                                        setTimeout(() => setActiveDay(activeDay + 1), 500);
                                                    }
                                                }}
                                                className={`
                                                    gap-2 transition-all
                                                    ${completedDays.includes(activeDay) ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gold hover:bg-white text-ink-900'}
                                                `}
                                            >
                                                {completedDays.includes(activeDay) ? (
                                                    <>Completed <CheckCircle2 className="w-4 h-4" /></>
                                                ) : (
                                                    days[activeDay - 1].day === 7 ? "Submit & Celebrate" : "Mark Complete & Next"
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
