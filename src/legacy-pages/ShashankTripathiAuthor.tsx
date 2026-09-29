'use client';

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    BookOpen,
    Feather,
    Heart,
    Star,
    Quote,
    Compass,
    GraduationCap,
    Clock,
    PenTool,
    Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
import Image from "next/image";

const authorData = {
    name: "Shashank Tripathi",
    title: "Poet & Student",
    subtitle: "Painting with Words, Discovering the Self",
    bio: "Shashank Tripathi is a 21-year-old engineering student navigating the vibrant intersection of science and art. His journey into poetry began as a wandering thought during his travels, opening his eyes to a hidden world of emotions. He paints vivid pictures not with a brush, but through the delicate art of words.",
    longBio: "In 2024, while testing the bounds of his own thoughts during a journey, Shashank discovered a realm visible only to a few—a space of profound introspection that defies simple definition. Encouraged by a dear friend and his physics teacher (whom he reverently calls 'Ustaad'), he realized that his words could bloom into beautiful landscapes. Currently expanding his first volume of ghazals and planning a novelette, his ultimate quest is simple yet profound: to know who he truly is without looking into a mirror.",
    location: "India",
    stats: {
        books: 1,
        awards: 0,
        years: 1,
        readers: "Growing"
    },
    vision: "To be able to identify and answer 'who am I' without any external sources and without looking into a mirror.",
    quote: "Never underestimate your art, it is one of the easiest things one can do to meet himself. Practice, preach, pursue but don't abandon your art. It is something which makes life a little colorful.",
    social: {
        instagram: "#"
    },
    timeline: [
        {
            year: "2024",
            title: "The Awakening",
            description: "A simple travel journey turned into a profound exploration of thoughts, revealing a hidden world of poetry."
        },
        {
            year: "Present",
            title: "Engineering & Poetry",
            description: "Balancing his B.Tech studies with the delicate art of writing ghazals, finding harmony between logic and emotion."
        },
        {
            year: "Future",
            title: "Literary Horizons",
            description: "Working on a complete volume of ghazals and plotting the narrative for his upcoming novelette."
        }
    ],
    features: [
        {
            icon: <Compass className="w-6 h-6" />,
            title: "The Seeker",
            description: "On a quest to discover the self through introspection, rejecting mirrors for words."
        },
        {
            icon: <PenTool className="w-6 h-6" />,
            title: "The Word Painter",
            description: "Translating abstract thoughts into colorful landscapes of prose and poetry."
        },
        {
            icon: <GraduationCap className="w-6 h-6" />,
            title: "The Student",
            description: "A B.Tech scholar proving that science and art can coexist beautifully in a single mind."
        }
    ]
};

const ShashankTripathiAuthor = () => {
    const { scrollYProgress } = useScroll();
    const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    return (
        <div className="min-h-screen bg-ink-950 text-parchment font-serif selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">
            <Helmet>
                <title>{authorData.name} | {authorData.title}</title>
                <meta name="description" content={authorData.bio} />
            </Helmet>

            {/* Navigation Placeholder */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-ink-950/80 backdrop-blur-md border-b border-indigo-900/30">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-xl font-bold text-parchment tracking-widest uppercase flex items-center gap-2">
                        <Feather className="w-5 h-5 text-indigo-400" />
                        {authorData.name}
                    </div>
                    <Button
                        variant="outline"
                        className="border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10 font-sans tracking-widest uppercase text-xs"
                        onClick={() => window.location.href = '/'}
                    >
                        Back to Directory
                    </Button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
                <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-900/10 rounded-full blur-[150px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="space-y-8"
                        >
                            <Badge variant="outline" className="border-indigo-500/30 text-indigo-300 bg-indigo-500/10 px-4 py-1 font-sans tracking-widest">
                                {authorData.title}
                            </Badge>
                            
                            <h1 className="text-5xl md:text-7xl font-light leading-tight text-white">
                                {authorData.name.split(' ')[0]} <br />
                                <span className="text-indigo-400 italic">{authorData.name.split(' ')[1]}</span>
                            </h1>
                            
                            <p className="text-2xl text-parchment/80 font-light italic">
                                "{authorData.subtitle}"
                            </p>
                            
                            <p className="text-lg text-parchment/60 leading-relaxed max-w-lg font-light">
                                {authorData.bio}
                            </p>

                            <div className="pt-4">
                                <Button 
                                    className="bg-indigo-600/80 text-white hover:bg-indigo-500 px-8 py-6 rounded-none font-sans tracking-widest uppercase text-xs"
                                    onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    Explore Works
                                </Button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, delay: 0.2 }}
                            className="relative lg:ml-auto w-full max-w-md aspect-[3/4]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-t-full rounded-b-xl shadow-2xl border border-white/10 overflow-hidden flex items-center justify-center p-8">
                                <div className="text-center space-y-6">
                                    <Compass className="w-16 h-16 text-indigo-300 mx-auto opacity-50" />
                                    <h3 className="text-2xl font-light text-white uppercase tracking-widest">{authorData.name}</h3>
                                    <div className="w-12 h-px bg-indigo-500/50 mx-auto" />
                                    <p className="text-sm tracking-[0.3em] uppercase text-indigo-200">Volume I • Ghazals</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Philosophy / Quote Section */}
            <section className="py-24 bg-ink-950 relative border-y border-white/5">
                <div className="absolute inset-0 bg-indigo-900/5" />
                <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
                    <Quote className="w-12 h-12 text-indigo-500/40 mx-auto mb-8" />
                    <h2 className="text-2xl md:text-4xl font-light leading-relaxed text-parchment/90 italic">
                        "{authorData.quote}"
                    </h2>
                </div>
            </section>

            {/* Biography & Vision */}
            <section className="py-32 relative">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="h-px bg-indigo-500/50 flex-1" />
                                <span className="text-indigo-400 font-sans tracking-[0.3em] uppercase text-sm">The Journey</span>
                            </div>
                            <h2 className="text-4xl font-light text-white">From Thoughts to Canvas</h2>
                            <p className="text-lg text-parchment/70 leading-relaxed font-light">
                                {authorData.longBio}
                            </p>
                            
                            <div className="p-6 bg-indigo-900/10 border border-indigo-500/20 rounded-2xl backdrop-blur-sm mt-8">
                                <h3 className="text-xl text-indigo-300 mb-2 flex items-center gap-2">
                                    <Star className="w-5 h-5" /> The Ultimate Vision
                                </h3>
                                <p className="text-parchment/80 italic">
                                    "{authorData.vision}"
                                </p>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {authorData.features.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={`p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors ${idx === 2 ? 'sm:col-span-2' : ''}`}
                                >
                                    <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400 mb-4 border border-indigo-500/20">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-lg text-white mb-2 font-medium">{feature.title}</h3>
                                    <p className="text-sm text-parchment/60 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-24 bg-ink-900 relative">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-light text-white mb-4">The Evolution</h2>
                        <p className="text-parchment/60 font-sans tracking-widest uppercase text-sm">Milestones of a young poet</p>
                    </div>

                    <div className="space-y-12">
                        {authorData.timeline.map((item, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative pl-8 md:pl-0"
                            >
                                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-indigo-500/20 -translate-x-1/2" />
                                
                                <div className={`md:flex items-center justify-between ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                                    <div className="hidden md:block w-5/12" />
                                    
                                    <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-indigo-500 rounded-full -translate-x-1/2 mt-1.5 md:mt-0 shadow-[0_0_15px_rgba(99,102,241,0.5)] border-4 border-ink-900" />
                                    
                                    <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                        <div className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-sans tracking-widest rounded-full mb-3 border border-indigo-500/20">
                                            {item.year}
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                        <p className="text-parchment/70 font-light">{item.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Current Works */}
            <section id="works" className="py-32 relative border-t border-white/5">
                <div className="container mx-auto px-6 max-w-5xl text-center">
                    <BookOpen className="w-12 h-12 text-indigo-500/40 mx-auto mb-8" />
                    <h2 className="text-4xl font-light text-white mb-6">Current Projects</h2>
                    <p className="text-xl text-parchment/60 font-light max-w-2xl mx-auto mb-16">
                        Currently expanding his first volume of ghazals and laying the groundwork for a novelette.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-8 border border-white/10 rounded-2xl bg-gradient-to-br from-white/5 to-transparent hover:border-indigo-500/50 transition-colors text-left group">
                            <Feather className="w-8 h-8 text-indigo-400 mb-6 opacity-50 group-hover:opacity-100 transition-opacity" />
                            <h3 className="text-2xl text-white mb-3 font-light">Volume of Ghazals</h3>
                            <p className="text-parchment/60 mb-6">A collection of deeply introspective poems exploring the nuances of self-discovery and unseen worlds.</p>
                            <Badge className="bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30">In Progress</Badge>
                        </div>
                        <div className="p-8 border border-white/10 rounded-2xl bg-gradient-to-br from-white/5 to-transparent hover:border-purple-500/50 transition-colors text-left group">
                            <BookOpen className="w-8 h-8 text-purple-400 mb-6 opacity-50 group-hover:opacity-100 transition-opacity" />
                            <h3 className="text-2xl text-white mb-3 font-light">Upcoming Novelette</h3>
                            <p className="text-parchment/60 mb-6">A foray into narrative prose, weaving thoughts and philosophies into a compelling storyline.</p>
                            <Badge className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30">Planning Phase</Badge>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-white/5 text-center px-6 bg-ink-950">
                <div className="flex justify-center items-center gap-2 mb-6">
                    <Feather className="w-5 h-5 text-indigo-500/50" />
                </div>
                <p className="text-xs font-sans tracking-[0.2em] text-parchment/40 uppercase">
                    © {new Date().getFullYear()} {authorData.name}. All Rights Reserved.
                </p>
            </footer>
        </div>
    );
};

export default ShashankTripathiAuthor;
