
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowRightLeft, ArrowDown, Mic, Play, Pause, Music, Film, Type, AlignLeft, Check, X, AlertTriangle, Scale, BookOpen, Crown, Globe, Instagram, Send, Hash } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";

export const AnthologyShowcase = () => {
    return (
        <div className="my-12">
            <div className="relative aspect-video rounded-xl overflow-hidden mb-12 border border-white/10 group">
                <img src="/images/publishing_ecosystem.png" alt="Publishing Ecosystem Map" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-transparent to-transparent" />
                <div className="absolute top-6 left-6 bg-black/40 backdrop-blur-md p-3 rounded border border-gold/30">
                    <span className="text-xs text-gold uppercase tracking-widest font-bold">The Literary Landscape</span>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-2xl font-serif text-white max-w-2xl">
                        "The theme itself exists in the gap between English dating culture and Hindi emotional vocabulary."
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <Card className="bg-gradient-to-br from-ink-900 via-ink-black to-ink-900 border-gold/30 p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-32 bg-gold/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-gold/10 transition-colors" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <Crown className="w-6 h-6 text-gold" />
                            <h3 className="text-2xl font-serif text-gold">Love at Minus One</h3>
                        </div>

                        <div className="space-y-4 text-parchment/80 mb-8">
                            <div className="p-4 bg-white/5 rounded border-l-2 border-gold/50">
                                <strong>Why it fits:</strong> Designed for "situationships" (English concept) + "khamoshi" (Hindi feeling).
                            </div>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-400 mt-0.5" /> Authentic voice (not textbook)</li>
                                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-400 mt-0.5" /> Emotional honesty</li>
                                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-400 mt-0.5" /> Cultural specificity</li>
                            </ul>
                        </div>

                        <div className="flex justify-between items-end border-t border-white/10 pt-6">
                            <div>
                                <p className="text-xs text-parchment/50 uppercase tracking-widest mb-1">Investment</p>
                                <p className="text-xl font-bold text-parchment">₹399 <span className="text-sm font-normal opacity-50">(approx)</span></p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-parchment/50 uppercase tracking-widest mb-1">Outcome</p>
                                <p className="text-sm font-bold text-gold">Published Author Status</p>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="space-y-4">
                    <h4 className="text-lg font-bold text-parchment mb-4">Other Friendly Venues</h4>
                    {[
                        { name: "Ek Shabd Series", desc: "Dedicated bilingual focus" },
                        { name: "The Alipore Post", desc: "Progressive literary space" },
                        { name: "Indian Ruminations", desc: "Hawakal Publishers" },
                        { name: "The Chakkar", desc: "Digital mag seeking code-switching" },
                        { name: "Borderless Journal", desc: "Crosses linguistic borders" }
                    ].map((venue, i) => (
                        <div key={i} className="p-4 bg-ink-900/40 border border-white/5 rounded hover:border-white/20 transition-colors flex justify-between items-center group">
                            <div>
                                <h5 className="font-bold text-parchment group-hover:text-gold transition-colors">{venue.name}</h5>
                                <p className="text-xs text-parchment/50">{venue.desc}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-white/20 group-hover:translate-x-1 transition-transform" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const InstagramStrategy = () => {
    return (
        <div className="my-16">
            <h4 className="text-center font-bold text-gold mb-12">Instagram: Your Portfolio Builder</h4>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 space-y-8">
                    <div className="bg-ink-900/30 p-6 rounded-xl border border-white/5">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="p-2 bg-pink-500/10 rounded-full text-pink-500"><Instagram className="w-5 h-5" /></span>
                            <h5 className="font-bold text-parchment">The "Young Indian" Advantage</h5>
                        </div>
                        <p className="text-sm text-parchment/70 leading-relaxed">
                            The 18-35 demographic <strong>thinks</strong> in Hinglish. Bilingual posts get higher engagement because they sound like actual people, not poets trying to be 'literary'.
                        </p>
                    </div>

                    <div>
                        <h5 className="font-bold text-gold mb-4 text-sm uppercase tracking-widest">Growth Formula</h5>
                        <ul className="space-y-4">
                            <li className="flex gap-4">
                                <div className="p-2 bg-white/5 rounded h-fit shrink-0"><Send className="w-4 h-4 text-gold" /></div>
                                <div>
                                    <strong className="block text-parchment text-sm">Frequency</strong>
                                    <span className="text-xs text-parchment/50">3-4 bilingual poems per week</span>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="p-2 bg-white/5 rounded h-fit shrink-0"><Hash className="w-4 h-4 text-gold" /></div>
                                <div>
                                    <strong className="block text-parchment text-sm">Targeted Tags</strong>
                                    <span className="text-xs text-parchment/50">#HinglishPoetry #BilingualPoet #LoveAtMinusOne</span>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="p-2 bg-white/5 rounded h-fit shrink-0"><Globe className="w-4 h-4 text-gold" /></div>
                                <div>
                                    <strong className="block text-parchment text-sm">Crucial Milestone</strong>
                                    <span className="text-xs text-parchment/50">At 1,000+ followers, organizers start noticing you.</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="order-1 md:order-2 relative aspect-[4/5] rounded-xl overflow-hidden border-2 border-white/5 group shadow-2xl shadow-purple-900/20">
                    <img src="/images/instagram_growth.png" alt="Instagram Growth Concept" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-white">600</span>
                            <ArrowRight className="w-4 h-4 text-gold animate-pulse" />
                            <span className="text-4xl font-bold text-gold">12,000</span>
                        </div>
                        <p className="text-sm text-parchment/80 italic border-l-2 border-gold pl-3">
                            "A poet started posting Hinglish heartbreak poetry... Grew to 12k in 8 months. Got invited to 3 anthologies."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
