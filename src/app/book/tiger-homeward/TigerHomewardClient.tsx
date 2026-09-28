'use client';

import React from "react";
import { motion } from "framer-motion";
import {
    BookOpen,
    Dog,
    Heart,
    Star,
    ArrowRight,
    ShoppingBag,
    FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
import Image from "next/image";

const TigerHomewardClient = () => {
    return (
        <div className="min-h-screen bg-ink-black text-parchment font-serif selection:bg-orange-500/30 selection:text-white overflow-x-hidden">
            <Helmet>
                <title>Tiger Homeward On His Own Terms | Sharmila Maitra</title>
                <meta name="description" content="A novel told from the perspective of a furry friend. It traces his journey of learning, survival, and self-discovery on the streets." />
            </Helmet>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-ink-black/80 backdrop-blur-md border-b border-white/5">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center border border-orange-500/20">
                            <Dog className="w-5 h-5 text-orange-400" />
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-parchment tracking-widest uppercase">Inkfetish Publishing</h1>
                            <p className="text-xs text-parchment/50">Tiger Homeward</p>
                        </div>
                    </div>
                    <div className="hidden md:flex gap-8 text-xs tracking-[0.2em] uppercase text-parchment/60">
                        <a href="#synopsis" className="hover:text-orange-400 transition-colors">Synopsis</a>
                        <a href="#excerpt" className="hover:text-orange-400 transition-colors">Excerpt</a>
                        <a href="#author" className="hover:text-orange-400 transition-colors">Author</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-30 pointer-events-none" />
                <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-orange-900/15 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-900/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            className="space-y-8"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-xs text-orange-400 uppercase tracking-[0.2em] font-sans">
                                <Star className="w-3 h-3" />
                                Official Pre-Order
                            </div>

                            <h1 className="text-5xl md:text-7xl font-light leading-tight">
                                Tiger <span className="text-orange-400 italic">Homeward</span>
                            </h1>
                            <h2 className="text-2xl md:text-3xl font-light text-parchment/80">
                                On His Own Terms: A Journey To Belonging
                            </h2>

                            <p className="text-xl text-parchment/70 font-light leading-relaxed">
                                A heartwarming novel by Sharmila Maitra.
                            </p>

                            <div className="p-4 bg-white/5 border border-orange-900/30 rounded-xl backdrop-blur-sm max-w-md border-l-4 border-l-orange-500">
                                <p className="text-sm text-parchment/80 italic">
                                    "----DEDICATED TO MY ELDEST FUR BABY TIGER---- YOU WILL ALWAYS BE HARNESSED TO MY HEART"
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                                <Button
                                    onClick={() => toast.success("Pre-orders opening soon!")}
                                    className="w-full sm:w-auto bg-orange-600/80 text-white hover:bg-orange-500 font-sans tracking-wide px-8 py-6 text-lg rounded-sm"
                                >
                                    <ShoppingBag className="w-5 h-5 mr-2" />
                                    Pre-Order Now
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        document.getElementById('excerpt')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="w-full sm:w-auto border-orange-500/30 text-orange-400 hover:bg-orange-500/10 font-sans tracking-wide px-8 py-6 text-lg rounded-sm bg-transparent"
                                >
                                    <FileText className="w-5 h-5 mr-2" />
                                    Read Excerpt
                                </Button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2 }}
                            className="relative lg:ml-auto w-full max-w-md"
                        >
                            <div className="aspect-[2/3] bg-gradient-to-br from-zinc-800 to-ink-charcoal rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 relative overflow-hidden flex items-center justify-center">
                                {/* Book Cover Placeholder styling */}
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-20" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="text-center p-8 relative z-10 space-y-6">
                                    <Dog className="w-20 h-20 text-orange-400/80 mx-auto" />
                                    <h3 className="text-3xl font-display font-light text-white uppercase tracking-wider">Tiger Homeward</h3>
                                    <p className="text-sm text-parchment/60 uppercase tracking-[0.2em]">A Journey to Belonging</p>
                                    <div className="w-12 h-[1px] bg-orange-500/50 mx-auto my-4" />
                                    <p className="text-sm font-sans tracking-widest text-parchment/80">SHARMILA MAITRA</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Synopsis */}
            <section id="synopsis" className="py-24 bg-ink-900/50 border-y border-white/5 relative">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <Heart className="w-10 h-10 text-orange-500/40 mx-auto mb-8" />
                    <h2 className="text-3xl font-light mb-8">About the Book</h2>
                    <p className="text-xl text-parchment/80 leading-relaxed font-light mb-6">
                        It traces his journey of learning, survival, and self-discovery on the streets—shaped by fleeting encounters, hard-earned lessons, and quiet moments of resilience—before fate finally leads him to his hooman mom at the ripe age of ten.
                    </p>
                    <p className="text-lg text-parchment/60 leading-relaxed font-light">
                        Through his eyes, the story maps not just life on the streets, but the deep emotional bonds and unspoken hopes that guide him home. It is a tale of survival, the taste of kindness, and the extraordinary power of an unyielding spirit.
                    </p>
                </div>
            </section>

            {/* Excerpt */}
            <section id="excerpt" className="py-32 relative">
                <div className="container mx-auto px-6 max-w-3xl">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-orange-500/30" />
                        <h2 className="text-2xl font-serif text-orange-400 uppercase tracking-widest">Sneak Peek</h2>
                        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-orange-500/30" />
                    </div>

                    <div className="bg-white/5 p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl relative">
                        <div className="absolute -top-6 -left-6 w-12 h-12 bg-ink-black border border-white/10 rounded-full flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-orange-400" />
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-6 text-white font-display">Chapter 1: The First Cold</h3>
                        <p className="text-xs text-orange-400 uppercase tracking-widest mb-8">---- No One Is Coming To Save You ----</p>

                        <div className="space-y-6 text-lg text-parchment/80 leading-relaxed font-light">
                            <p>
                                I don't remember my mother's face. That's the first thing you should know about me. I remember warmth, a pressing, breathing warmth that smelled like milk and safety. I remember the sound of heartbeats, plural, all around me in the darkness. But faces? No. The world was all scent and sound and the desperate pull toward something soft that would feed me.
                            </p>
                            <p>
                                Then one day, the warmth was gone.
                            </p>
                            <p>
                                I was maybe eight weeks old when I found myself alone in a cardboard box behind a dumpster. The box was wet from rain, collapsing on one side, and it smelled like rotting vegetables and something chemical that made my nose burn. I didn't understand what had happened. I only knew that the warmth was gone, and I was so cold that my whole body shivered, and I couldn't make it stop.
                            </p>
                            <p>
                                I whined. God! How I whined. I didn't know I was capable of making sounds that desperate, that raw. They came from somewhere deep in my chest, somewhere I didn't know existed. Why I whined so much, I still don’t know; perhaps I expected someone to come and save me from this fate that awaits me. But no one came.
                            </p>
                            <p className="italic text-parchment/60 text-center pt-4">
                                That was my first lesson: no one is coming to save you.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Author */}
            <section id="author" className="py-24 bg-ink-charcoal/30 border-t border-white/5">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <h2 className="text-3xl font-light mb-6">About Sharmila Maitra</h2>
                            <p className="text-lg text-parchment/70 leading-relaxed mb-8">
                                Sharmila Maitra is a Marketing and Communications professional by day and a devoted writer by heart. Balancing the corporate world with her dual passions for boxing and storytelling, she crafts narratives that challenge perspectives and spark the imagination.
                            </p>
                            <a 
                                href="/publishedauthor/sharmila" 
                                className="inline-flex items-center text-orange-400 hover:text-orange-300 transition-colors uppercase tracking-widest text-sm font-sans"
                            >
                                Visit Author Profile <ArrowRight className="w-4 h-4 ml-2" />
                            </a>
                        </div>
                        <div className="order-1 md:order-2 flex justify-center">
                            <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-orange-500/20 relative shadow-2xl">
                                <Image
                                    src="/authors/sharmila.jpg"
                                    alt="Sharmila Maitra"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-white/5 text-center px-6">
                <p className="text-xs text-parchment/40 tracking-widest uppercase">
                    © {new Date().getFullYear()} Ink Fetish Publishing House / Sharmila Maitra. All Rights Reserved.
                </p>
            </footer>
        </div>
    );
};

export default TigerHomewardClient;
