'use client';

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    BookOpen,
    Calendar,
    Feather,
    Globe,
    Heart,
    Instagram,
    Mail,
    MapPin,
    PenTool,
    Sparkles,
    Star,
    Quote,
    Eye,
    Coffee,
    Palette,
    Briefcase,
    GraduationCap,
    Clock,
    Scroll,
    Cloud
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const authorData = {
    name: "Bhavin \"Nix\" Triwadi",
    displayName: "Bhavin Triwadi",
    nickname: "Nix",
    title: "Entrepreneur & Contemporary Author",
    subtitle: "Mapping the invisible connections of human pain | Voices of the Misunderstood",
    bio: "Bhavin \"Nix\" Triwadi is a 22-year-old entrepreneur and writer who found his voice in the silence of isolation. Based in a family-run business, he balances the practical world of commerce with a profound literary exploration of the human heart.",
    longBio: "Bhavin's journey is one of resilience and self-discovery. Having spent much of his life in solitude, books became his primary companions—reading everything from English textbooks to borrowed poems to master the art of language. In late 2023, amidst a struggle with depression, anxiety, and ADHD, he turned to writing as a lifeline. What began as a private catharsis soon evolved into a powerful mission to reach others who feel misunderstood. An English and Economics topper in college, Bhavin uses his precision with words to articulate the 'storm inside the heart' that many feel but few can name.",
    location: "India",
    email: "contact@bhavintriwadi.com", // Placeholder
    instagram: "nix_triwadi", // Placeholder
    stats: {
        age: 22,
        role: "Business Owner / Writer",
        education: "Commerce (English & Eco Topper)",
        release: "May 5, 2026",
        status: "Emerging Author",
        genre: "Contemporary Prose / Memoir"
    },
    journey: {
        start: "Writing became my voice in late 2023. Lacking anyone to speak to, I used words to express the heavy emotions bottling up inside my heart.",
        motivation: "To reach every heart that has felt the pain of being misunderstood. I want to let them know they aren't alone in the storm.",
        vision: "To soothe souls through shared experience and realize that no matter how different our lives seem, our feelings are often the same.",
        message: "You are not alone. You are understood. You aren't a burden. Once you find the right people, the heavy feeling in your heart will ease up."
    },
    book: {
        title: "Have We All Been Living the Same Life All Along",
        intro: "This book is a collection of thoughts, memories, and emotions I struggled to put into words for a long time. It is not meant to explain everything, nor to offer solutions. It is simply a reflection—of pain, of growth, and of the people I met along the way who made me realize something important: That no matter how different our lives may seem, the things we feel often aren’t.",
        expected: "May 5, 2026"
    },
    images: {
        hero: "https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1776803007/WhatsApp_Image_2026-04-11_at_12.38.02_AM_1_mbgjdu.jpg"
    }
};

const BhavinTriwadiAuthor = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, -100]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <div className="min-h-screen bg-ink-black text-parchment font-serif selection:bg-gold selection:text-ink-black overflow-x-hidden">
            <Helmet>
                <title>Bhavin "Nix" Triwadi | Inkfetish Author</title>
                <meta name="description" content="Contemporary Author and Entrepreneur. Explore the world of Bhavin Triwadi, mapping the invisible connections of human pain." />
                <meta property="og:title" content="Bhavin Nix Triwadi | Inkfetish" />
                <meta property="og:description" content="Have We All Been Living the Same Life All Along. A journey of growth and connection." />
                <meta property="og:type" content="profile" />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-ink-black/80 backdrop-blur-md border-b border-white/5">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center border border-gold/20">
                            <Cloud className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-parchment tracking-widest uppercase">Inkfetish</h1>
                            <p className="text-xs text-parchment/50">x Bhavin "Nix" Triwadi</p>
                        </div>
                    </div>
                    <div className="hidden md:flex gap-8 text-xs tracking-[0.2em] uppercase text-parchment/60">
                        <a href="#about" className="hover:text-gold transition-colors">The Writer</a>
                        <a href="#philosophy" className="hover:text-gold transition-colors">Philosophy</a>
                        <a href="#book" className="hover:text-gold transition-colors">The Work</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-30 pointer-events-none" />
                <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-zinc-900/20 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="space-y-8 text-center lg:text-left order-2 lg:order-1"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs tracking-widest uppercase">
                            <Star className="w-3 h-3 animate-pulse" />
                            <span>Release: {authorData.stats.release}</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight">
                            Bhavin <br />
                            <span className="text-gold italic font-normal font-display">Triwadi</span>
                        </h1>

                        <p className="text-xl text-parchment/70 font-light max-w-lg leading-relaxed mx-auto lg:mx-0">
                            {authorData.subtitle}
                        </p>

                        <div className="flex flex-col gap-6 pt-4 justify-center lg:justify-start">
                            <div className="flex items-center gap-6">
                                <Button
                                    onClick={() => toast.success("Reader list updated!")}
                                    className="bg-gold text-ink-black hover:bg-gold/90 font-sans tracking-wide px-8 py-6 text-lg rounded-sm"
                                >
                                    Pre-Order Waitlist
                                </Button>

                                <div className="flex gap-4 text-parchment/40">
                                    <Instagram className="w-6 h-6 hover:text-gold cursor-pointer transition-colors hover:scale-110 duration-300" />
                                    <Mail className="w-6 h-6 hover:text-gold cursor-pointer transition-colors hover:scale-110 duration-300" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Author Image Frame */}
                    <motion.div
                        style={{ y: y1 }}
                        className="relative order-1 lg:order-2"
                    >
                        <div className="absolute inset-0 border border-gold/10 rounded-t-[100px] rounded-b-lg transform rotate-3 translate-x-4 scale-105" />
                        <div className="absolute inset-0 border border-white/5 rounded-t-[100px] rounded-b-lg transform -rotate-2 -translate-x-2 scale-105" />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2 }}
                            className="w-full max-w-[450px] mx-auto aspect-[3/4] bg-zinc-900 rounded-t-[100px] rounded-b-lg overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-1000 group shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                        >
                            <img
                                src={authorData.images.hero}
                                alt={authorData.name}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2s]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-transparent to-transparent opacity-60" />

                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 hidden sm:block"
                            >
                                <Cloud className="w-6 h-6 text-gold mb-2" />
                                <p className="text-xs text-parchment/60 uppercase tracking-wider">The Storm Within</p>
                                <p className="text-sm text-white font-serif">Mapping Connections</p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Quote - Message to Hearts */}
            <section id="philosophy" className="py-24 bg-ink-900/50 border-y border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <Quote className="w-12 h-12 text-gold/20 mx-auto mb-8" />
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-light leading-relaxed max-w-4xl mx-auto mb-10 font-display"
                    >
                        "You are not alone, you are understood, <br />
                        <span className="text-gold/80 italic">and once you find the right people, the heavy feeling will start to ease up."</span>
                    </motion.h2>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-[1px] w-12 bg-white/20" />
                        <p className="text-parchment/50 font-sans text-sm tracking-[0.2em] uppercase">Bhavin "Nix" Triwadi</p>
                        <div className="h-[1px] w-12 bg-white/20" />
                    </div>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="py-20 bg-ink-black/50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                            { label: "Age", value: authorData.stats.age, icon: Calendar },
                            { label: "Role", value: "Entrepreneur", icon: Briefcase },
                            { label: "Education", value: "Commerce", icon: GraduationCap },
                            { label: "Location", value: "India", icon: MapPin },
                            { label: "Release", value: "May 2026", icon: Clock },
                            { label: "Genre", value: "Contemporary", icon: Scroll }
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
                                    The Silent Architect
                                </h2>
                                <p className="text-xl text-parchment/80 leading-relaxed font-light mb-6">
                                    {authorData.longBio}
                                </p>
                                <p className="text-parchment/60 leading-relaxed italic border-l-2 border-gold/30 pl-6">
                                    "I initially started writing at the end of 2023 because since I didn't have anyone to talk to, I used words to express my emotions. Bottling up made my heart heavy, and writing worked well hand-in-hand with my good writing skills."
                                </p>
                            </motion.div>

                            {/* Achievements/Context */}
                            <div className="grid sm:grid-cols-2 gap-8">
                                <div className="p-6 bg-white/5 rounded-xl border border-white/5 group hover:border-gold/20 transition-colors">
                                    <GraduationCap className="w-6 h-6 text-gold mb-4" />
                                    <h4 className="text-lg font-bold mb-2">Academic Excellence</h4>
                                    <p className="text-sm text-parchment/60">Subject topper in English and Economics. A precision for language that translates complex emotions into clear prose.</p>
                                </div>
                                <div className="p-6 bg-white/5 rounded-xl border border-white/5 group hover:border-gold/20 transition-colors">
                                    <Briefcase className="w-6 h-6 text-gold mb-4" />
                                    <h4 className="text-lg font-bold mb-2">Family Business</h4>
                                    <p className="text-sm text-parchment/60">Runs two shops with father and brother. A writer grounded in the realities of hard work and daily life.</p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Cards */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="sticky top-24 space-y-6">
                                {/* Journey Card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="p-8 bg-zinc-900/40 rounded-2xl border border-white/5 backdrop-blur-sm relative overflow-hidden group hover:border-gold/30 transition-colors"
                                >
                                    <div className="absolute top-0 right-0 p-32 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                    <Eye className="w-8 h-8 text-gold mb-6 relative z-10" />
                                    <h3 className="text-xl font-bold mb-4 relative z-10 font-serif">The Mission</h3>
                                    <p className="text-parchment/70 leading-relaxed relative z-10">{authorData.journey.vision}</p>
                                </motion.div>

                                {/* Background Card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="p-8 bg-zinc-900/40 rounded-2xl border border-white/5 backdrop-blur-sm relative overflow-hidden group hover:border-gold/30 transition-colors"
                                >
                                    <PenTool className="w-8 h-8 text-gold mb-6 relative z-10" />
                                    <h3 className="text-xl font-bold mb-4 relative z-10 font-serif">A Voice for the Unheard</h3>
                                    <p className="text-parchment/70 leading-relaxed relative z-10">{authorData.journey.motivation}</p>
                                </motion.div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* The Work - Book Section */}
            <section id="book" className="py-32 bg-ink-900/30 border-t border-white/5 relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 text-gold text-xs tracking-widest uppercase mb-6 border border-gold/20">
                                <BookOpen className="w-3 h-3" />
                                <span>Upcoming Release</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-light mb-8 font-display italic">
                                {authorData.book.title}
                            </h2>
                            <div className="space-y-6 text-parchment/70 leading-relaxed">
                                <p className="text-lg text-parchment font-light">
                                    "This book is a collection of thoughts, memories, and emotions I struggled to put into words for a long time."
                                </p>
                                <p>
                                    Through this work, Bhavin explores the shared struggles of life, mapping the invisible connection between people suffering in silence. It is a reflection of pain, growth, and the realization that no matter how different our lives seem, our feelings are often identical.
                                </p>
                                <div className="pt-4 flex flex-col gap-3">
                                    <div className="flex items-center gap-3 text-gold">
                                        <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                                        <span className="text-sm uppercase tracking-widest font-sans font-bold">Release Date: {authorData.book.expected}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-parchment/40">
                                        <Globe className="w-4 h-4" />
                                        <span className="text-sm">Available Worldwide via Inkfetish</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Book Mockup/Visual */}
                        <div className="order-1 lg:order-2 flex justify-center">
                            <motion.div
                                initial={{ rotate: 12, opacity: 0 }}
                                whileInView={{ rotate: -5, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                                className="w-64 h-96 bg-zinc-800 rounded-sm shadow-[20px_20px_60px_rgba(0,0,0,0.8)] border border-white/10 relative group overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent" />
                                <div className="absolute inset-0 flex flex-col justify-between p-8 text-center">
                                    <div className="space-y-2">
                                        <p className="text-[10px] tracking-[0.3em] uppercase text-gold">Inkfetish Publication</p>
                                        <div className="w-8 h-[1px] bg-gold/30 mx-auto" />
                                    </div>
                                    <h3 className="text-2xl font-display italic text-white leading-tight">
                                        Have We All Been Living the Same Life All Along
                                    </h3>
                                    <div className="space-y-2">
                                        <div className="w-8 h-[1px] bg-gold/30 mx-auto" />
                                        <p className="text-xs tracking-widest uppercase text-parchment font-bold">Bhavin "Nix" Triwadi</p>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Behind the Ink */}
            <section className="py-24 bg-ink-black border-t border-white/5">
                <div className="container mx-auto px-6 max-w-6xl">
                    <h2 className="text-3xl font-light mb-12 text-center">The Narrative Connection</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Shared Pain", desc: "How we all share a life through pain and struggles, regardless of their difference.", icon: Sparkles },
                            { title: "Invisible Link", desc: "Understanding each other's situation without words, across many different people.", icon: Heart },
                            { title: "Personal Truth", desc: "A collection of memories and reflections of pain, growth, and the journey.", icon: Star }
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
                                    <item.icon className="w-6 h-6 text-gold" />
                                </div>
                                <h3 className="text-xl font-serif text-white mb-3">{item.title}</h3>
                                <p className="text-parchment/60 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer Message */}
            <section className="py-32 text-center px-6 relative overflow-hidden bg-gradient-to-b from-ink-black to-zinc-900/50">
                <div className="absolute inset-0 bg-gold/5 blur-[100px] pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <Quote className="w-12 h-12 text-gold/20 mx-auto mb-8" />
                    <p className="text-2xl md:text-4xl font-light italic text-parchment/90 leading-relaxed mb-12 font-display">
                        "If you find even a small part of yourself in these pages, then perhaps this story has done what it was meant to."
                    </p>
                    <div className="h-[1px] w-24 bg-gold/30 mx-auto mb-8" />
                    <div className="flex justify-center gap-8 text-xs tracking-widest uppercase text-parchment/40">
                        <span className="hover:text-gold cursor-pointer transition-colors">Instagram</span>
                        <span className="hover:text-gold cursor-pointer transition-colors">Email</span>
                    </div>
                    <p className="text-xs text-parchment/20 mt-8 tracking-widest">© {new Date().getFullYear()} Bhavin Triwadi. Individual rights belong to the author.</p>
                </div>
            </section>
        </div>
    );
};

export default BhavinTriwadiAuthor;
