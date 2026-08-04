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
    Scroll,
    Languages,
    Users,
    MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const authorData = {
    name: "Thalir",
    title: "Poet & Writer",
    subtitle: "Tamil & English Kavithai",
    bio: "Thalir is a young poet who writes in both Tamil and English, weaving words that heal, bring smiles, and make people feel seen. What began as scribbling thoughts in school evolved into a quiet, powerful voice that people carry with them.",
    longBio: "Thalir's journey with words started in school — jotting down random thoughts whenever friends shared something that needed to be felt more than said. In college, those thoughts grew into short poems, kavithai in Tamil and English, written for friends and family. Slowly, confidence followed. Words became more than a habit; they became a gift. A few lines could shift someone's mood instantly, make them feel seen, feel special. Once shared, the words no longer belonged to Thalir alone — people made them their own. And that, more than anything, is what keeps the pen moving.",
    location: "India",
    email: "",
    instagram: "",
    stats: {
        age: 23,
        role: "Poet",
        education: "—",
        status: "Active",
        languages: "Tamil & English",
        genre: "Kavithai / Poetry"
    },
    journey: {
        start: "It started in school — writing down random thoughts as words whenever my friends shared something with me. In college, this grew into writing short poems (kavithai) in Tamil and English.",
        motivation: "Seeing my words heal someone, or bring a smile to their face — that's what pulled me in. Words don't have to be mine alone; once shared, people make them their own. A few lines can shift someone's mood instantly, make them feel seen, feel special.",
        vision: "To become a writer people return to — someone whose words feel like a space to escape reality, even briefly, and live out the emotions they dream of but rarely get to feel fully.",
        message: "The joy of your world depends on the words you spread — choose them like they matter, because they do."
    }
};

const ThalirAuthor = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, -100]);

    return (
        <div className="min-h-screen bg-ink-black text-parchment font-serif selection:bg-gold selection:text-ink-black overflow-x-hidden">
            <Helmet>
                <title>Thalir | Inkfetish Author</title>
                <meta name="description" content="Poet and writer in Tamil and English. Discover the words of Thalir — kavithai that heal, bring smiles, and make you feel seen." />
                <meta property="og:title" content="Thalir | Inkfetish" />
                <meta property="og:description" content="Tamil & English Kavithai. Explore the poetry and journey of Thalir." />
                <meta property="og:type" content="profile" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Thalir | Inkfetish" />
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
                            <p className="text-xs text-parchment/50">x Thalir</p>
                        </div>
                    </div>
                    <div className="hidden md:flex gap-8 text-xs tracking-[0.2em] uppercase text-parchment/60">
                        <a href="#about" className="hover:text-gold transition-colors">About</a>
                        <a href="#journey" className="hover:text-gold transition-colors">Journey</a>
                        <a href="#words" className="hover:text-gold transition-colors">Words</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-30 pointer-events-none" />

                {/* Soft rose-green ambient for Tamil roots */}
                <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-900/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/3 rounded-full blur-[200px] pointer-events-none" />

                <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="space-y-8 text-center lg:text-left order-2 lg:order-1"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full text-xs text-gold uppercase tracking-[0.2em] font-sans">
                            <Languages className="w-3 h-3" />
                            Tamil & English Kavithai
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight">
                            Tha<span className="text-gold italic font-normal font-display">lir</span>
                        </h1>

                        {/* Tamil word meaning sprout/new leaf — a beautiful touch */}
                        <p className="text-sm text-parchment/40 uppercase tracking-[0.3em] font-sans -mt-4">
                            தளிர் &nbsp;·&nbsp; New Growth
                        </p>

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
                            {/* Poetic placeholder */}
                            <div className="w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-ink-black flex items-center justify-center relative">
                                {/* Decorative Tamil letter */}
                                <div className="text-center space-y-6 p-8 relative z-10">
                                    <div className="w-36 h-36 mx-auto rounded-full bg-gold/5 border border-gold/15 flex items-center justify-center">
                                        <span className="text-6xl text-gold/30 font-serif select-none">த</span>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-parchment/20 text-xs font-sans tracking-[0.3em] uppercase">Thalir</p>
                                        <p className="text-parchment/10 text-xs font-sans tracking-[0.2em]">தளிர்</p>
                                    </div>
                                </div>
                                {/* Subtle radial glow */}
                                <div className="absolute inset-0 bg-radial-gradient from-gold/5 to-transparent opacity-50" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-transparent to-transparent opacity-60" />

                            {/* Floating Element */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 hidden sm:block"
                            >
                                <MessageCircle className="w-6 h-6 text-gold mb-2" />
                                <p className="text-xs text-parchment/60 uppercase tracking-wider">Words that</p>
                                <p className="text-sm text-white font-serif">Heal & Heal</p>
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
                        "The joy of your world depends on the words you spread —{" "}
                        <span className="text-gold/80 italic">choose them like they matter, because they do."</span>
                    </motion.h2>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-[1px] w-12 bg-white/20" />
                        <p className="text-parchment/50 font-sans text-sm tracking-[0.2em] uppercase">Thalir</p>
                        <div className="h-[1px] w-12 bg-white/20" />
                    </div>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="py-20 bg-ink-black/50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                            { label: "Age", value: "23", icon: Calendar },
                            { label: "Role", value: "Poet", icon: Briefcase },
                            { label: "Languages", value: "Tamil & EN", icon: Languages },
                            { label: "Style", value: "Kavithai", icon: Scroll },
                            { label: "Reach", value: "Hearts", icon: Users },
                            { label: "Status", value: "Active", icon: PenTool }
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
                                <p className="text-parchment/60 leading-relaxed">
                                    Writing in both Tamil and English, Thalir bridges two worlds with one heart — crafting kavithai that don't just read, they resonate. Each poem is a small act of care, sent into the world hoping someone on the other end feels a little less alone.
                                </p>
                            </motion.div>

                            {/* Journey Timeline */}
                            <div id="journey" className="space-y-8">
                                <h3 className="text-2xl font-serif text-white">The Path Traveled</h3>

                                {[
                                    {
                                        title: "The First Words",
                                        year: "School Days",
                                        desc: "Writing down random thoughts whenever friends shared something — not as poems yet, but as words that needed to exist somewhere.",
                                        icon: Sparkles
                                    },
                                    {
                                        title: "The Kavithai Begin",
                                        year: "College Years",
                                        desc: "Short poems in Tamil and English for friends and family. Each one a gift. Each one slowly building the confidence to share more widely.",
                                        icon: Feather
                                    },
                                    {
                                        title: "Words That Heal",
                                        year: "The Discovery",
                                        desc: "Seeing words bring a smile, ease someone's pain, make them feel seen — realising that once shared, words stop being yours and start being everyone's.",
                                        icon: Heart
                                    },
                                    {
                                        title: "The Voice Grows",
                                        year: "Present Day",
                                        desc: "Continuing to write, to heal, to gift. Building a body of words that people can return to whenever they need to feel something real.",
                                        icon: PenTool
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
                                    <h3 className="text-xl font-bold mb-4 relative z-10 font-serif">Vision & Dream</h3>
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
                                    <h3 className="text-xl font-bold mb-4 relative z-10 font-serif">Why Words</h3>
                                    <p className="text-parchment/70 leading-relaxed relative z-10">{authorData.journey.motivation}</p>
                                </motion.div>

                                {/* Languages Card */}
                                <div id="words" className="p-8 bg-gradient-to-br from-gold/10 to-transparent rounded-2xl border border-gold/20 relative overflow-hidden">
                                    <div className="flex items-start justify-between mb-6">
                                        <Languages className="w-8 h-8 text-gold" />
                                    </div>
                                    <h3 className="text-2xl font-serif text-white mb-3">Bilingual Voice</h3>
                                    <div className="flex gap-3 mb-4">
                                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-parchment/70 font-sans tracking-wider">தமிழ் (Tamil)</span>
                                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-parchment/70 font-sans tracking-wider">English</span>
                                    </div>
                                    <p className="text-parchment/60 text-sm leading-relaxed">Writing kavithai in both Tamil and English — bridging languages, cultures, and emotions through the universality of feeling.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* The Philosophy of Words */}
            <section className="py-24 bg-ink-charcoal/30 border-t border-white/5">
                <div className="container mx-auto px-6 max-w-6xl">
                    <h2 className="text-3xl font-light mb-12 text-center">The Power of a Few Lines</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "To Heal",
                                desc: "Words written with care carry the power to ease pain, mend something quietly broken, and remind us we are not alone.",
                                icon: Heart
                            },
                            {
                                title: "To Belong",
                                desc: "Once shared, words stop being the poet's alone. They become mirrors — people see their own feelings reflected back.",
                                icon: Users
                            },
                            {
                                title: "To Stay",
                                desc: "A few lines that shift a mood. A poem you return to on hard days. Words that outlive the moment they were written for.",
                                icon: Sparkles
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
                    <p className="text-xs text-parchment/20 mt-8 tracking-widest">© {new Date().getFullYear()} Thalir. All rights reserved.</p>
                </div>
            </section>
        </div>
    );
};

export default ThalirAuthor;
