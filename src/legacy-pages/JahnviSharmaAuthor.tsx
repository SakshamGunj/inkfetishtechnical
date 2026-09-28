'use client';

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    Calendar,
    Feather,
    Globe,
    Heart,
    Instagram,
    Mail,
    PenTool,
    Sparkles,
    Quote,
    Eye,
    Briefcase,
    GraduationCap,
    BookOpen,
    Globe2,
    Compass
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const authorData = {
    name: "Jahnvi Sharma",
    title: "Writer & TEFL Certified Educator",
    subtitle: "Words that transcend borders and bridge hearts.",
    bio: "Jahnvi Sharma is a passionate writer and TEFL-certified professional whose work bridges the gap between raw emotion and evocative storytelling. With publications in university magazines and literary journals, she is on the cusp of releasing her highly anticipated debut book.",
    longBio: "Jahnvi’s writing journey began during her school years—what initially started as a personal outlet for thoughts, emotions, and observations gradually blossomed into a genuine passion. Through poetry, stories, and reflective pieces, writing became her lens for understanding herself and the world. Her articles have graced the pages of university magazines, and her poetry has been featured across various literary publications. Finding profound comfort in writing, she realized early on that words possess the unique ability to preserve feelings, memories, and experiences. Today, writing is no longer just a hobby; it is her life's calling—a way of connecting deeply with others.",
    location: "India",
    email: "", // Placeholder
    instagram: "", // Placeholder
    stats: {
        role: "Author",
        certification: "TEFL Certified",
        status: "Active",
        debut: "5 November Release",
        genre: "Poetry & Fiction",
        vision: "Global Reach"
    },
    journey: {
        start: "My writing journey started during my school years, when I began putting my thoughts, emotions, and observations into words. It grew from personal expression into a genuine passion.",
        motivation: "My motivation stems from the desire to express thoughts and emotions I couldn't otherwise articulate. Seeing my articles in university magazines and poems in literary publications gave me the courage to explore my voice and share it with a wider audience.",
        vision: "My vision is to create stories that people connect with on a deeply personal level. I aspire to become a globally recognised writer whose work reaches across cultures, leaving a lasting literary legacy.",
        message: "I believe that words possess the extraordinary power to transcend borders, bridge hearts, and give meaning to the emotions we often leave unspoken. My greatest wish is to write fearlessly, dream endlessly, and let my words travel far beyond where my own voice can reach."
    }
};

const JahnviSharmaAuthor = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, -100]);

    return (
        <div className="min-h-screen bg-ink-black text-parchment font-serif selection:bg-emerald-500/30 selection:text-white overflow-x-hidden">
            <Helmet>
                <title>Jahnvi Sharma | Inkfetish Author</title>
                <meta name="description" content="Writer & TEFL Certified Educator. Discover the evocative words of Jahnvi Sharma." />
                <meta property="og:title" content="Jahnvi Sharma | Inkfetish" />
                <meta property="og:description" content="Words that transcend borders and bridge hearts. Explore the journey of Jahnvi Sharma." />
                <meta property="og:type" content="profile" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Jahnvi Sharma | Inkfetish" />
            </Helmet>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-ink-black/80 backdrop-blur-md border-b border-white/5">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-500/20">
                            <Feather className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-parchment tracking-widest uppercase">Inkfetish</h1>
                            <p className="text-xs text-parchment/50">x Jahnvi Sharma</p>
                        </div>
                    </div>
                    <div className="hidden md:flex gap-8 text-xs tracking-[0.2em] uppercase text-parchment/60">
                        <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
                        <a href="#journey" className="hover:text-emerald-400 transition-colors">Journey</a>
                        <a href="#projects" className="hover:text-emerald-400 transition-colors">Projects</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-30 pointer-events-none" />

                {/* Elegant Emerald & Midnight Blue Ambient */}
                <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-emerald-900/15 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-900/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="space-y-8 text-center lg:text-left order-2 lg:order-1"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs text-emerald-400 uppercase tracking-[0.2em] font-sans">
                            <Compass className="w-3 h-3" />
                            Writer & Educator
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight">
                            Jahn<span className="text-emerald-400 italic font-normal font-display">vi</span>
                            <br /> Sharma
                        </h1>

                        <p className="text-xl text-parchment/70 font-light max-w-lg leading-relaxed mx-auto lg:mx-0">
                            {authorData.subtitle}
                        </p>

                        {/* Special Focus Badge */}
                        <div className="inline-flex items-center gap-3 p-3 bg-white/5 border border-emerald-900/30 rounded-xl backdrop-blur-sm">
                            <div className="w-10 h-14 bg-gradient-to-br from-emerald-900/40 to-teal-950/20 rounded-sm border border-emerald-800/30 flex items-center justify-center flex-shrink-0">
                                <BookOpen className="w-5 h-5 text-emerald-400/80" />
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-parchment/40 uppercase tracking-widest font-sans">Upcoming Release</p>
                                <p className="text-sm text-parchment font-serif font-semibold">Debut Book</p>
                                <p className="text-xs text-emerald-400/60 italic">Launching November 5th</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 justify-center lg:justify-start pt-2">
                            <Button
                                onClick={() => toast.success("Feature coming soon!")}
                                className="bg-emerald-600/80 text-white hover:bg-emerald-500 font-sans tracking-wide px-8 py-6 text-lg rounded-sm backdrop-blur-sm"
                            >
                                Join Reader List
                            </Button>

                            <div className="flex gap-4 text-parchment/40">
                                <Instagram className="w-6 h-6 hover:text-emerald-400 cursor-pointer transition-colors hover:scale-110 duration-300" />
                                <Mail className="w-6 h-6 hover:text-emerald-400 cursor-pointer transition-colors hover:scale-110 duration-300" />
                                <Globe className="w-6 h-6 hover:text-emerald-400 cursor-pointer transition-colors hover:scale-110 duration-300" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Author Image Frame */}
                    <motion.div
                        style={{ y: y1 }}
                        className="relative order-1 lg:order-2"
                    >
                        <div className="absolute inset-0 border border-emerald-500/20 rounded-t-[100px] rounded-b-lg transform rotate-6 translate-x-4 scale-105" />
                        <div className="absolute inset-0 border border-white/5 rounded-t-[100px] rounded-b-lg transform -rotate-3 -translate-x-2 scale-105" />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2 }}
                            className="w-full max-w-[450px] mx-auto aspect-[3/4] bg-zinc-900 rounded-t-[100px] rounded-b-lg overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                        >
                            {/* Theme placeholder */}
                            <div className="w-full h-full bg-gradient-to-br from-zinc-800 via-emerald-950/20 to-ink-black flex items-center justify-center relative">
                                <div className="text-center space-y-6 p-8 relative z-10">
                                    <div className="w-36 h-36 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                        <Feather className="w-14 h-14 text-emerald-400/60" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-parchment/30 text-sm font-sans tracking-[0.2em] uppercase">Jahnvi Sharma</p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-radial-gradient from-emerald-500/5 to-transparent opacity-50" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-transparent to-transparent opacity-60" />

                            {/* Floating Element */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 hidden sm:block"
                            >
                                <Sparkles className="w-6 h-6 text-emerald-400 mb-2" />
                                <p className="text-xs text-parchment/60 uppercase tracking-wider">Dream</p>
                                <p className="text-sm text-white font-serif">Endlessly</p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Quote */}
            <section className="py-24 bg-ink-900/50 border-y border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <Quote className="w-12 h-12 text-emerald-500/20 mx-auto mb-8" />
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-light leading-relaxed max-w-4xl mx-auto mb-10 font-display"
                    >
                        "I believe that words possess the extraordinary power to transcend borders, bridge hearts, and{" "}
                        <span className="text-emerald-400/80 italic">give meaning to the emotions we often leave unspoken."</span>
                    </motion.h2>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-[1px] w-12 bg-white/20" />
                        <p className="text-parchment/50 font-sans text-sm tracking-[0.2em] uppercase">Jahnvi Sharma</p>
                        <div className="h-[1px] w-12 bg-white/20" />
                    </div>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="py-20 bg-ink-black/50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                            { label: "Role", value: "Author", icon: PenTool },
                            { label: "Credentials", value: "TEFL Certified", icon: GraduationCap },
                            { label: "Publications", value: "Magazines", icon: BookOpen },
                            { label: "Debut Book", value: "5 Nov Launch", icon: Calendar },
                            { label: "Genre", value: "Poetry & Fiction", icon: Feather },
                            { label: "Vision", value: "Global Reach", icon: Globe2 }
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white/5 border border-white/5 rounded-xl p-4 text-center hover:bg-white/10 hover:border-emerald-500/20 transition-all group"
                            >
                                <stat.icon className="w-5 h-5 text-emerald-400/50 mx-auto mb-3 group-hover:text-emerald-400 transition-colors" />
                                <h3 className="text-lg font-bold text-parchment group-hover:text-white mb-1">{stat.value}</h3>
                                <p className="text-xs text-parchment/40 uppercase tracking-wider">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bio & Journey */}
            <section id="about" className="py-32 relative">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-12 gap-16">

                        {/* Main Content */}
                        <div className="lg:col-span-7 space-y-16">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-4xl font-light mb-8 flex items-center gap-4">
                                    <span className="w-12 h-[1px] bg-emerald-500" />
                                    About Jahnvi
                                </h2>
                                <p className="text-xl text-parchment/80 leading-relaxed font-light mb-6">
                                    {authorData.longBio}
                                </p>
                            </motion.div>

                            {/* Journey Timeline */}
                            <div id="journey" className="space-y-8">
                                <h3 className="text-2xl font-serif text-white">The Writer's Arc</h3>

                                {[
                                    {
                                        title: "The Silent Observer",
                                        year: "School Years",
                                        desc: "Started documenting thoughts, emotions, and observations. Writing served as a personal sanctuary to make sense of the world.",
                                        icon: Eye
                                    },
                                    {
                                        title: "First Publications",
                                        year: "University",
                                        desc: "Articles featured in university magazines and poetry published in various literary journals, cementing her confidence.",
                                        icon: BookOpen
                                    },
                                    {
                                        title: "TEFL Certification",
                                        year: "Professional",
                                        desc: "Earned her TEFL certification, strengthening her mastery of language and education.",
                                        icon: GraduationCap
                                    },
                                    {
                                        title: "The Debut Launch",
                                        year: "5 November",
                                        desc: "Currently preparing for the release of her highly anticipated debut book—a project incredibly close to her heart.",
                                        icon: Sparkles
                                    }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.2 }}
                                        className="flex gap-6 group"
                                    >
                                        <div className="flex flex-col items-center">
                                            <div className="w-12 h-12 rounded-full border border-emerald-500/30 bg-ink-900 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-ink-black transition-all">
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            {i !== 3 && <div className="w-[1px] h-full bg-white/10 my-2 group-hover:bg-emerald-500/30 transition-colors" />}
                                        </div>
                                        <div className="pb-10">
                                            <span className="text-xs text-emerald-400 uppercase tracking-widest">{item.year}</span>
                                            <h4 className="text-xl font-bold text-parchment mb-2">{item.title}</h4>
                                            <p className="text-parchment/60 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar Cards */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="sticky top-24 space-y-6">
                                {/* Vision Card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="p-8 bg-zinc-900/40 rounded-2xl border border-white/5 backdrop-blur-sm relative overflow-hidden group hover:border-emerald-500/30 transition-colors"
                                >
                                    <div className="absolute top-0 right-0 p-32 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                    <Globe2 className="w-8 h-8 text-emerald-400 mb-6 relative z-10" />
                                    <h3 className="text-xl font-bold mb-4 relative z-10 font-serif">Global Vision</h3>
                                    <p className="text-parchment/70 leading-relaxed relative z-10">{authorData.journey.vision}</p>
                                </motion.div>

                                {/* Motivation Card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="p-8 bg-zinc-900/40 rounded-2xl border border-white/5 backdrop-blur-sm relative overflow-hidden group hover:border-emerald-500/30 transition-colors"
                                >
                                    <Heart className="w-8 h-8 text-emerald-400 mb-6 relative z-10" />
                                    <h3 className="text-xl font-bold mb-4 relative z-10 font-serif">Emotional Canvas</h3>
                                    <p className="text-parchment/70 leading-relaxed relative z-10">{authorData.journey.motivation}</p>
                                </motion.div>

                                {/* Current Projects Card */}
                                <div id="projects" className="p-8 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-2xl border border-emerald-500/20 relative overflow-hidden">
                                    <div className="flex items-start justify-between mb-6">
                                        <Briefcase className="w-8 h-8 text-emerald-400" />
                                        <Badge className="bg-emerald-500/80 text-white hover:bg-emerald-500 border-none">Coming Soon</Badge>
                                    </div>
                                    <h3 className="text-xl font-serif text-white mb-4">Debut Release</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <Calendar className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm text-parchment font-semibold">5 November 2026</p>
                                                <p className="text-xs text-parchment/50 italic">Mark the Date</p>
                                            </div>
                                        </div>
                                        <div className="h-[1px] bg-white/5" />
                                        <div className="pt-2">
                                            <p className="text-sm text-parchment/80 leading-relaxed">
                                                Currently finalizing her highly anticipated debut book—a project incredibly close to her heart. Stay tuned for the journey ahead.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* The Triple Threat Section */}
            <section className="py-24 bg-ink-charcoal/30 border-t border-white/5">
                <div className="container mx-auto px-6 max-w-6xl">
                    <h2 className="text-3xl font-light mb-12 text-center">Beyond the Ink</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "The Storyteller",
                                desc: "Creating stories that people can connect with on a deeply personal level, touching hearts and giving voice to the unspoken.",
                                icon: PenTool
                            },
                            {
                                title: "The Linguist",
                                desc: "Holding a TEFL certification, bringing a profound understanding of language and communication to her writing.",
                                icon: GraduationCap
                            },
                            {
                                title: "The Visionary",
                                desc: "Aspiring to build a lasting literary legacy with words that are remembered long after the final page is turned.",
                                icon: Globe2
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center p-8 border border-white/5 rounded-2xl hover:bg-white/5 transition-colors"
                            >
                                <div className="w-16 h-16 mx-auto bg-ink-black rounded-full flex items-center justify-center border border-white/10 mb-6 shadow-lg">
                                    <item.icon className="w-6 h-6 text-emerald-400" />
                                </div>
                                <h3 className="text-xl font-serif text-white mb-3">{item.title}</h3>
                                <p className="text-parchment/60 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer Message */}
            <section className="py-32 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-emerald-500/5 blur-[100px] pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <Quote className="w-12 h-12 text-emerald-500/20 mx-auto mb-8" />
                    <p className="text-2xl md:text-3xl font-light italic text-parchment/90 leading-relaxed mb-12 font-display">
                        "My greatest wish is to write fearlessly, dream endlessly, and let my words travel far beyond where my own voice can reach."
                    </p>
                    <div className="h-[1px] w-24 bg-emerald-500/30 mx-auto mb-8" />
                    <div className="flex justify-center gap-8 text-xs tracking-widest uppercase text-parchment/40">
                        <span className="hover:text-emerald-400 cursor-pointer transition-colors">Instagram</span>
                        <span className="hover:text-emerald-400 cursor-pointer transition-colors">Email</span>
                        <span className="hover:text-emerald-400 cursor-pointer transition-colors">Pre-Order</span>
                    </div>
                    <p className="text-xs text-parchment/20 mt-8 tracking-widest">© {new Date().getFullYear()} Jahnvi Sharma. All rights reserved.</p>
                </div>
            </section>
        </div>
    );
};

export default JahnviSharmaAuthor;
