
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Book, Calendar, CheckCircle2, Crown, ExternalLink, Feather, Heart, Mail, Map, Sparkles, Star, Users } from 'lucide-react';
import confetti from 'canvas-confetti';

export const FutureTimeline = () => {
    const steps = [
        {
            time: "Week 1",
            title: "Validation",
            desc: "You finish this ebook feeling seen. Someone finally said: 'Your voice is not confused. Your voice is complete.'",
            icon: <Heart className="w-5 h-5" />
        },
        {
            time: "Week 2",
            title: "Creation",
            desc: "You write 5 bilingual poems. At least one lies in the truest language of your heart.",
            icon: <Feather className="w-5 h-5" />
        },
        {
            time: "Week 3",
            title: "Submission",
            desc: "You submit to 'Love at Minus One'. You hit send with a mix of terror and excitement.",
            icon: <Mail className="w-5 h-5" />
        },
        {
            time: "Weeks 6-8",
            title: "Acceptance",
            desc: "You get the email: 'Congratulations'. Your bilingual poem is going into a real book.",
            icon: <CheckCircle2 className="w-5 h-5" />
        },
        {
            time: "Month 4",
            title: "Publication",
            desc: "The book arrives. Your name is in it. English and Hindi, side by side, perfectly valid.",
            icon: <Book className="w-5 h-5" />
        },
        {
            time: "Forever",
            title: "Impact",
            desc: "Someone reads your poem and says: 'This is exactly how I feel.' That is why you write.",
            icon: <Sparkles className="w-5 h-5" />
        }
    ];

    return (
        <div className="relative border-l-2 border-white/10 ml-6 space-y-8 my-12">
            {steps.map((step, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-8"
                >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-ink-900 border-2 border-gold flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 sm:items-start">
                        <div className="bg-white/5 p-3 rounded-lg border border-white/10 backdrop-blur-sm self-start shrink-0">
                            {step.icon}
                        </div>
                        <div>
                            <span className="text-xs uppercase tracking-widest text-gold font-bold bg-gold/10 px-2 py-0.5 rounded">
                                {step.time}
                            </span>
                            <h4 className="text-xl font-serif text-white mt-1 mb-2">{step.title}</h4>
                            <p className="text-parchment/80 leading-relaxed max-w-xl">
                                {step.desc}
                            </p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export const AnthologyInvitation = () => {
    const handleJoin = () => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFD700', '#DAA520', '#FFFFFF']
        });
        window.open('https://instagram.com/authorverse_summit', '_blank'); // Placeholder link based on context
    };

    return (
        <div className="my-16 relative">
            {/* Visual Flair */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

            <Card className="bg-ink-900/80 border-gold border hover:border-gold transition-all duration-500 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="p-8 md:p-12 relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <Badge className="bg-gold text-ink-900 hover:bg-white transition-colors">
                            <Crown className="w-3 h-3 mr-1" /> Official Invitation
                        </Badge>

                        <div>
                            <h3 className="text-3xl md:text-4xl font-serif text-white mb-2">
                                Love at <span className="text-gold italic">Minus One</span>
                            </h3>
                            <p className="text-parchment/60 uppercase tracking-widest text-sm">
                                The Anthology for Frozen Feelings
                            </p>
                        </div>

                        <p className="text-parchment text-lg leading-relaxed">
                            A literary space designed for voices like yours. Indian poets writing about modern love, emotional distance, and the gap between <span className="text-white italic">situationships</span> and <span className="text-white italic">duri</span>.
                        </p>

                        <div className="grid grid-cols-2 gap-4 text-sm text-parchment/80">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-gold" /> Real ISBN Book
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-gold" /> Global Distibution
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-gold" /> Published Author Status
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-gold" /> Community of 40+ Poets
                            </div>
                        </div>
                    </div>

                    <div className="bg-black/40 p-8 rounded-xl border border-white/10 text-center space-y-6 relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ink-900 px-4 text-xs text-gold uppercase tracking-widest border border-gold/30 rounded-full">
                            Limited Opportunity
                        </div>

                        <div className="space-y-1">
                            <p className="text-parchment/60 text-sm">Investment</p>
                            <p className="text-4xl font-serif text-white">₹399</p>
                            <p className="text-xs text-parchment/40">Less than two coffees.</p>
                        </div>

                        <div className="w-full h-px bg-white/10" />

                        <Button
                            onClick={handleJoin}
                            className="w-full bg-gold text-ink-900 font-bold py-6 text-lg hover:bg-white hover:scale-105 transition-all shadow-lg hover:shadow-gold/20"
                        >
                            Submit Your Portfolio <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>

                        <p className="text-xs text-parchment/40 italic">
                            "For less than ₹500, you get permanent credentials."
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export const FinalTruth = () => {
    return (
        <div className="relative py-24 text-center overflow-hidden">
            <div className="max-w-3xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-gold via-white to-gold/50 mb-8 leading-tight">
                        Yeh Awaaz Aapki Hai.
                    </h2>
                    <p className="text-xl md:text-2xl text-parchment/90 font-light mb-12">
                        "Stop translating your heart into a language it doesn't naturally speak. Stop performing linguistic purity for gatekeepers who don't understand how we actually live."
                    </p>

                    <div className="inline-block p-1 rounded-full bg-gradient-to-r from-transparent via-gold/30 to-transparent w-1/2" />

                    <div className="mt-12">
                        <p className="text-sm text-gold uppercase tracking-[0.3em] mb-4">The Anthology is Waiting</p>
                        <p className="text-white text-lg animate-pulse">Your Words Are Ready.</p>
                    </div>
                </motion.div>
            </div>

            {/* Ambient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-gold/10 blur-[120px] pointer-events-none" />
        </div>
    );
};
