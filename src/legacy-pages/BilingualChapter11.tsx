
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Copy, Linkedin, Instagram, Mail, TrendingUp, Users, Mic2, Briefcase, GraduationCap, ArrowRight, DollarSign, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

export const IncomeStreamGrid = () => {
    const [unlocked, setUnlocked] = useState<number[]>([1]);
    const [activeStream, setActiveStream] = useState<number | null>(null);

    const streams = [
        {
            id: 1,
            title: "Anthology Credits",
            subtitle: "Increase Freelance Rates",
            icon: <Briefcase className="w-6 h-6" />,
            potential: "₹5k–25k / project",
            desc: "Legitimize your status. 'Published Poet' isn't vanity; it's a credibility badge that doubles your freelance rates.",
            action: "Update LinkedIn Headline",
            details: (
                <div className="space-y-4">
                    <div className="bg-ink-900 p-4 rounded border border-white/10">
                        <p className="text-sm text-parchment/60 mb-2 uppercase tracking-wide">The Pitch</p>
                        <p className="font-serif italic text-white">"I'm a published poet featured in [Anthology]. I understand emotional resonance and cultural nuance. I can bring this depth to your brand copy."</p>
                    </div>
                </div>
            )
        },
        {
            id: 2,
            title: "Bilingual Copywriting",
            subtitle: "For Indian Brands",
            icon: <Globe className="w-6 h-6" />, // Changed to Globe if defined, or just use another icon
            potential: "₹15k–50k / retainer",
            desc: "D2C brands (Boat, Mamaearth) need copy that sounds like actual Indians, not textbooks. You are that voice.",
            action: "Pitch D2C Brands",
            details: (
                <div className="space-y-4">
                    <div className="bg-ink-900 p-4 rounded border border-white/10">
                        <p className="text-sm text-parchment/60 mb-2 uppercase tracking-wide">Target Clients</p>
                        <ul className="list-disc pl-5 text-parchment space-y-1">
                            <li>D2C Brands (Snitch, Bewakoof)</li>
                            <li>Regional Apps (ShareChat, Moj)</li>
                            <li>Fintech/Edtech for Tier 2 cities</li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            id: 3,
            title: "Brand Collaborations",
            subtitle: "Instagram Monetization",
            icon: <Instagram className="w-6 h-6" />,
            potential: "₹3k–15k / post",
            desc: "At 1,000+ followers, you are a micro-influencer. Brands pay for authentic, emotional storytelling.",
            action: "Post 3-4x/Week",
            details: (
                <div className="space-y-4">
                    <p className="text-parchment/80">Offer: Sponsored poems that subtly incorporate a product while maintaining emotional integrity.</p>
                </div>
            )
        },
        {
            id: 4,
            title: "Teaching Workshops",
            subtitle: "Live Sessions",
            icon: <Users className="w-6 h-6" />,
            potential: "₹15k–60k / workshop",
            desc: "Teach 'Writing in Your Mother Tongue'. Low overhead (Zoom), high value. Cap at 20 students.",
            action: "Launch a Webinar",
            details: (
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                        <span className="text-parchment">Ticket Price</span>
                        <span className="text-gold font-bold">₹799 - ₹1,999</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-parchment">Capacity</span>
                        <span className="text-gold font-bold">20-30 Students</span>
                    </div>
                </div>
            )
        },
        {
            id: 5,
            title: "1-on-1 Coaching",
            subtitle: "Premium Service",
            icon: <GraduationCap className="w-6 h-6" />,
            potential: "₹20k–40k / month",
            desc: "Guide new poets to their first anthology. 3-session package: Audit, Write, Revise.",
            action: "Offer Coaching",
            details: (
                <div className="space-y-4">
                    <div className="bg-gold/10 p-3 rounded text-center">
                        <p className="text-gold font-bold">Package: ₹4k–7k for 3 Sessions</p>
                    </div>
                </div>
            )
        }
    ];

    const unlockNext = (id: number) => {
        if (!unlocked.includes(id)) {
            setUnlocked([...unlocked, id]);
            setActiveStream(id);
        } else {
            setActiveStream(id === activeStream ? null : id);
        }
    };

    return (
        <div className="grid gap-6 my-12">
            {streams.map((stream) => {
                const isUnlocked = unlocked.includes(stream.id) || stream.id === 1; // Always show first, or logic to unlock sequentially
                // Check if previous is unlocked to allow unlocking current
                const isUnlockable = stream.id === 1 || unlocked.includes(stream.id - 1);

                return (
                    <motion.div
                        key={stream.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card
                            className={`
                                relative overflow-hidden transition-all duration-300 border
                                ${isUnlocked ? 'bg-ink-900/40 border-gold/30 hover:border-gold/60' : 'bg-black/40 border-white/5 opacity-60'}
                            `}
                        >
                            {!isUnlocked && isUnlockable && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10 backdrop-blur-sm cursor-pointer" onClick={() => unlockNext(stream.id)}>
                                    <div className="flex flex-col items-center gap-2 text-gold animate-pulse">
                                        <Lock className="w-8 h-8" />
                                        <span className="uppercase tracking-widest text-xs font-bold">Click to Unlock Stream #{stream.id}</span>
                                    </div>
                                </div>
                            )}

                            <div
                                className={`p-6 ${isUnlocked ? 'cursor-pointer' : ''}`}
                                onClick={() => isUnlocked && setActiveStream(activeStream === stream.id ? null : stream.id)}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-full ${isUnlocked ? 'bg-gold/10 text-gold' : 'bg-white/5 text-gray-500'}`}>
                                            {stream.icon}
                                        </div>
                                        <div>
                                            <h4 className={`text-xl font-serif font-bold ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>{stream.title}</h4>
                                            <p className="text-xs uppercase tracking-widest text-parchment/60">{stream.subtitle}</p>
                                        </div>
                                    </div>
                                    {isUnlocked && (
                                        <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-500/30 flex gap-1 items-center">
                                            <TrendingUp className="w-3 h-3" /> {stream.potential}
                                        </Badge>
                                    )}
                                </div>

                                <AnimatePresence>
                                    {activeStream === stream.id && isUnlocked && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="mt-6 pt-6 border-t border-white/10 grid md:grid-cols-2 gap-8">
                                                <div>
                                                    <p className="text-parchment/90 mb-4 leading-relaxed">{stream.desc}</p>
                                                    <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white border border-white/10">
                                                        {stream.action} <ArrowRight className="w-4 h-4 ml-2" />
                                                    </Button>
                                                </div>
                                                <div>
                                                    {stream.details}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </Card>
                    </motion.div>
                );
            })}
        </div>
    );
};

export const PitchTemplate = () => {
    const [copied, setCopied] = useState(false);

    const emailBody = `Subject: Bilingual Copywriter for Authentic Indian Voice

Hi [Name],

I'm a published poet whose bilingual work explores how urban Indians actually think and speak-mixing Hindi and English naturally. I've noticed [Brand] is trying to reach [Tier 2 cities / bilingual millennials], and I can help create copy that sounds like your audience's actual voice, not a translation.

My work is featured in [Anthology Name]. I understand the emotional registers of both languages and how to code-switch for maximum impact.

Would you be open to a 15-minute call to discuss how bilingual copy could elevate your next campaign?

Best,
[Your Name]
Portfolio: [Link]`;

    const handleCopy = () => {
        navigator.clipboard.writeText(emailBody);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#ffffff', '#a8a29e'] // white/parchment
        });
    };

    return (
        <Card className="my-12 bg-white/5 border-white/10 p-8 relative group">
            <div className="absolute top-4 right-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className={`gap-2 transition-all ${copied ? 'bg-green-500 text-white border-green-500' : 'hover:bg-gold hover:text-ink-900 hover:border-gold'}`}
                >
                    {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied!" : "Copy Template"}
                </Button>
            </div>

            <h4 className="text-xl font-bold text-gold mb-6 flex items-center gap-2">
                <Mail className="w-5 h-5" /> The "Cold Pitch" Email Template
            </h4>

            <div className="font-mono text-sm bg-black/40 p-6 rounded-lg text-parchment/80 whitespace-pre-wrap border border-white/5 shadow-inner">
                {emailBody}
            </div>

            <p className="mt-4 text-xs text-center text-parchment/40 italic">
                *Always customize [Bracketed Text] before sending. Authenticity wins.
            </p>
        </Card>
    );
}

// Helper icon import (Globe was missing in previous map spread, adding fallback import if needed)
import { Globe } from 'lucide-react';
