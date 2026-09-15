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
    ShieldAlert,
    Music
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const authorData = {
    name: "Sureshkalalayam",
    title: "Poet & Retired State Govt. Employee",
    subtitle: "Responding to Society Through Verses",
    bio: "Sureshkalalayam is a poet and a retired State Government employee. Armed with an MSc in Zoology, his literary journey began in the 1990s and has grown into a powerful medium to express his thoughts, visions, and protest against societal evils.",
    longBio: "At 61, Sureshkalalayam brings decades of life experience into his writing. His journey into poetry started out of necessity when he wrote an Onam festival song for a Malayalee Association in Lucknow during his time at CDRI. This song became part of a 30-minute musical program telecasted by Lucknow Doordarshan, sparking a lifelong passion for writing. Today, he writes to reflect on socially relevant matters and is actively working on publishing a poetry collection with Inkfetish, writing on social media, and creating musical albums.",
    location: "India",
    email: "", // Placeholder
    instagram: "", // Placeholder
    stats: {
        age: 61,
        role: "Poet",
        education: "MSc Zoology",
        status: "Active Writer",
        debut: "1990s"
    },
    journey: {
        start: "My journey began in the 90s. While working at CDRI in Lucknow, I wrote an Onam Festival song for a Malayalee Association, which led to a 30-minute musical program telecasted by Lucknow Doordarshan. This inspired my further writing.",
        motivation: "To respond to all socially relevant matters, express my thoughts and visions, and to protest against the evils happening around us through my writings.",
        vision: "To establish myself as a poet, continue publishing poetry collections, and keep contributing to literature, social media, and musical albums.",
        message: "Keep on reading books of all kind as words are your thoughts."
    }
};

const SureshkalalayamAuthor = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, -100]);

    return (
        <div className="min-h-screen bg-ink-black text-parchment font-serif selection:bg-gold selection:text-ink-black overflow-x-hidden">
            <Helmet>
                <title>Sureshkalalayam | Inkfetish Author</title>
                <meta name="description" content="Poet, Retired State Govt. Employee, and Author. Discover the journey of Sureshkalalayam." />
                <meta property="og:title" content="Sureshkalalayam | Inkfetish" />
                <meta property="og:description" content="Responding to Society Through Verses. Explore the writing and journey of Sureshkalalayam." />
                <meta property="og:type" content="profile" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Sureshkalalayam | Inkfetish" />
            </Helmet>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-ink-black/80 backdrop-blur-md border-b border-white/5">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center border border-gold/20">
                            <Feather className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-parchment tracking-widest uppercase">Inkfetish</h1>
                            <p className="text-xs text-parchment/50">x Sureshkalalayam</p>
                        </div>
                    </div>
                    <div className="hidden md:flex gap-8 text-xs tracking-[0.2em] uppercase text-parchment/60">
                        <a href="#about" className="hover:text-gold transition-colors">About</a>
                        <a href="#journey" className="hover:text-gold transition-colors">Journey</a>
                        <a href="#works" className="hover:text-gold transition-colors">Works</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-30 pointer-events-none" />
                <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="space-y-8 text-center lg:text-left order-2 lg:order-1"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full text-xs text-gold uppercase tracking-[0.2em] font-sans">
                            <Briefcase className="w-3 h-3" />
                            Retired State Govt. Employee
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight">
                            Suresh <br />
                            <span className="text-gold italic font-normal font-display">kalalayam</span>
                        </h1>

                        <p className="text-xl text-parchment/70 font-light max-w-lg leading-relaxed mx-auto lg:mx-0">
                            {authorData.subtitle}
                        </p>

                        <div className="flex items-center gap-6 justify-center lg:justify-start pt-2">
                            <Button
                                onClick={() => toast.success("Feature coming soon!")}
                                className="bg-gold text-ink-black hover:bg-gold/90 font-sans tracking-wide px-8 py-6 text-lg rounded-sm"
                            >
                                Join Reader List
                            </Button>

                            <div className="flex gap-4 text-parchment/40">
                                <Instagram className="w-6 h-6 hover:text-gold cursor-pointer transition-colors hover:scale-110 duration-300" />
                                <Mail className="w-6 h-6 hover:text-gold cursor-pointer transition-colors hover:scale-110 duration-300" />
                                <Globe className="w-6 h-6 hover:text-gold cursor-pointer transition-colors hover:scale-110 duration-300" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Author Image Frame */}
                    <motion.div
                        style={{ y: y1 }}
                        className="relative order-1 lg:order-2"
                    >
                        <div className="absolute inset-0 border border-gold/10 rounded-t-[100px] rounded-b-lg transform rotate-6 translate-x-4 scale-105" />
                        <div className="absolute inset-0 border border-white/5 rounded-t-[100px] rounded-b-lg transform -rotate-3 -translate-x-2 scale-105" />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2 }}
                            className="w-full max-w-[450px] mx-auto aspect-[3/4] bg-zinc-900 rounded-t-[100px] rounded-b-lg overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                        >
                            {/* Professional placeholder */}
                            <div className="w-full h-full bg-gradient-to-br from-zinc-800 via-red-950/20 to-ink-black flex items-center justify-center relative">
                                <div className="text-center space-y-6 p-8 relative z-10">
                                    <div className="w-36 h-36 mx-auto rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                                        <PenTool className="w-14 h-14 text-gold/60" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-parchment/30 text-sm font-sans tracking-[0.2em] uppercase">Sureshkalalayam</p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-radial-gradient from-gold/5 to-transparent opacity-50" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-transparent to-transparent opacity-60" />

                            {/* Floating Element */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 hidden sm:block"
                            >
                                <BookOpen className="w-6 h-6 text-gold mb-2" />
                                <p className="text-xs text-parchment/60 uppercase tracking-wider">Social Reform</p>
                                <p className="text-sm text-white font-serif">Poet & Writer</p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Quote */}
            <section className="py-24 bg-ink-900/50 border-y border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <Quote className="w-12 h-12 text-gold/20 mx-auto mb-8" />
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-light leading-relaxed max-w-4xl mx-auto mb-10 font-display"
                    >
                        "{authorData.journey.message}"
                    </motion.h2>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-[1px] w-12 bg-white/20" />
                        <p className="text-parchment/50 font-sans text-sm tracking-[0.2em] uppercase">Sureshkalalayam</p>
                        <div className="h-[1px] w-12 bg-white/20" />
                    </div>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="py-20 bg-ink-black/50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {[
                            { label: "Age", value: authorData.stats.age, icon: Calendar },
                            { label: "Role", value: "Poet", icon: PenTool },
                            { label: "Education", value: authorData.stats.education, icon: GraduationCap },
                            { label: "Status", value: authorData.stats.status, icon: Briefcase },
                            { label: "Debut", value: authorData.stats.debut, icon: BookOpen }
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white/5 border border-white/5 rounded-xl p-4 text-center hover:bg-white/10 hover:border-gold/20 transition-all group"
                            >
                                <stat.icon className="w-5 h-5 text-gold/50 mx-auto mb-3 group-hover:text-gold transition-colors" />
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
                                    <span className="w-12 h-[1px] bg-gold" />
                                    About The Poet
                                </h2>
                                <p className="text-xl text-parchment/80 leading-relaxed font-light mb-6">
                                    {authorData.longBio}
                                </p>
                            </motion.div>

                            {/* Journey Timeline */}
                            <div id="journey" className="space-y-8">
                                <h3 className="text-2xl font-serif text-white">The Path Traveled</h3>

                                {[
                                    {
                                        title: "Academic & Career Beginnings",
                                        year: "Early Years",
                                        desc: "Graduated with an MSc in Zoology and worked as a State Government Employee, building a foundation of discipline and experience.",
                                        icon: GraduationCap
                                    },
                                    {
                                        title: "The Creative Spark",
                                        year: "1990s",
                                        desc: "Wrote an Onam Festival song for a Malayalee Association at Lucknow while at CDRI. It was telecasted by Lucknow Doordarshan.",
                                        icon: Sparkles
                                    },
                                    {
                                        title: "Poetry as Protest",
                                        year: "Evolution",
                                        desc: "Began to use poetry to respond to socially relevant matters, expressing thoughts and visions against societal evils.",
                                        icon: ShieldAlert
                                    },
                                    {
                                        title: "Present Pursuits",
                                        year: "Today",
                                        desc: "Working with Inkfetish to publish a poetry collection. Actively writing on social media and creating musical albums.",
                                        icon: Music
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
                                            <div className="w-12 h-12 rounded-full border border-gold/30 bg-ink-900 flex items-center justify-center group-hover:bg-gold group-hover:text-ink-black transition-all">
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            {i !== 3 && <div className="w-[1px] h-full bg-white/10 my-2 group-hover:bg-gold/30 transition-colors" />}
                                        </div>
                                        <div className="pb-10">
                                            <span className="text-xs text-gold uppercase tracking-widest">{item.year}</span>
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
                                    className="p-8 bg-zinc-900/40 rounded-2xl border border-white/5 backdrop-blur-sm relative overflow-hidden group hover:border-gold/30 transition-colors"
                                >
                                    <div className="absolute top-0 right-0 p-32 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                    <Eye className="w-8 h-8 text-gold mb-6 relative z-10" />
                                    <h3 className="text-xl font-bold mb-4 relative z-10 font-serif">Vision & Goals</h3>
                                    <p className="text-parchment/70 leading-relaxed relative z-10">{authorData.journey.vision}</p>
                                </motion.div>

                                {/* Motivation Card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="p-8 bg-zinc-900/40 rounded-2xl border border-white/5 backdrop-blur-sm relative overflow-hidden group hover:border-gold/30 transition-colors"
                                >
                                    <Heart className="w-8 h-8 text-gold mb-6 relative z-10" />
                                    <h3 className="text-xl font-bold mb-4 relative z-10 font-serif">Core Motivation</h3>
                                    <p className="text-parchment/70 leading-relaxed relative z-10">{authorData.journey.motivation}</p>
                                </motion.div>

                                {/* Current Projects */}
                                <div id="works" className="p-8 bg-gradient-to-br from-gold/10 to-transparent rounded-2xl border border-gold/20 relative overflow-hidden">
                                    <div className="flex items-start justify-between mb-6">
                                        <BookOpen className="w-8 h-8 text-gold" />
                                    </div>
                                    <h3 className="text-2xl font-serif text-white mb-3">Current Projects</h3>
                                    <p className="text-parchment/60 text-sm leading-relaxed">Presently collaborating with Inkfetish on an upcoming poetry collection, alongside active contributions to social media and musical albums.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Footer Message */}
            <section className="py-32 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gold/5 blur-[100px] pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <Quote className="w-12 h-12 text-gold/20 mx-auto mb-8" />
                    <p className="text-2xl md:text-4xl font-light italic text-parchment/90 leading-relaxed mb-12 font-display">
                        "{authorData.journey.message}"
                    </p>
                    <div className="h-[1px] w-24 bg-gold/30 mx-auto mb-8" />
                    <div className="flex justify-center gap-8 text-xs tracking-widest uppercase text-parchment/40">
                        <span className="hover:text-gold cursor-pointer transition-colors">Instagram</span>
                        <span className="hover:text-gold cursor-pointer transition-colors">Email</span>
                        <span className="hover:text-gold cursor-pointer transition-colors">Twitter</span>
                    </div>
                    <p className="text-xs text-parchment/20 mt-8 tracking-widest">© {new Date().getFullYear()} Sureshkalalayam. All rights reserved.</p>
                </div>
            </section>
        </div>
    );
};

export default SureshkalalayamAuthor;
