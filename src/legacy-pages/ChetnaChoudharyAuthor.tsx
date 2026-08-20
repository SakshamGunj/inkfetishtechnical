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
    Scroll,
    Flame,
    BookOpen,
    Sun
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const authorData = {
    name: "Chetna Choudhary",
    title: "PhD Scholar, Artisan & Author",
    subtitle: "Illuminating Minds with Words and Light",
    bio: "Chetna Choudhary is an academic scholar, writer, and artisan. Pursuing a PhD in English and running a candle-making business, she blends intellectual rigor with creative warmth, writing devotional poetry, novels, and academic literature.",
    longBio: "Chetna’s life is a delicate balance of academic pursuit and creative expression. Currently pursuing a PhD in English after successfully clearing the UGC NET, she is deeply rooted in the world of literature. Yet, her creativity is not confined to academia. As the founder of a candle-making business, she crafts physical light, while as an author, she crafts the light of hope through words. This year marked a significant milestone as she began writing a book of 21 devotional poems. With a completed novel manuscript and a new academic book underway, Chetna is steadily building a diverse portfolio spanning poetry, fiction, and motivational literature.",
    location: "India",
    email: "", // Placeholder
    instagram: "", // Placeholder
    stats: {
        age: 29,
        role: "Scholar & Writer",
        education: "PhD (Pursuing), NET",
        status: "Active",
        business: "Candle Artisan",
        projects: "3 Active Manuscripts"
    },
    journey: {
        start: "My journey took a profound turn this year when I started writing a book consisting of 21 devotional poems alongside many others.",
        motivation: "My motivation comes from the desire to grow as an author, inspire readers, and continue creating stories that leave a lasting impact. I believe every page I write brings me one step closer to fulfilling my dream of becoming an author whose words make a difference.",
        vision: "My goal is to establish myself as a successful and respected author whose books inspire, comfort, and connect with readers across the world in genres including poetry, novels, and motivational literature.",
        message: "Through my writing, I hope to encourage people to dream fearlessly, embrace kindness, and never give up. Whether you read a poem or a story, I hope you leave with a little more faith, courage, and happiness than you had before."
    }
};

const ChetnaChoudharyAuthor = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, -100]);

    return (
        <div className="min-h-screen bg-ink-black text-parchment font-serif selection:bg-amber-500 selection:text-ink-black overflow-x-hidden">
            <Helmet>
                <title>Chetna Choudhary | Inkfetish Author</title>
                <meta name="description" content="PhD Scholar, Artisan, and Writer. Discover the words and warmth of Chetna Choudhary." />
                <meta property="og:title" content="Chetna Choudhary | Inkfetish" />
                <meta property="og:description" content="Illuminating Minds with Words and Light. Explore the journey of Chetna Choudhary." />
                <meta property="og:type" content="profile" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Chetna Choudhary | Inkfetish" />
            </Helmet>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-ink-black/80 backdrop-blur-md border-b border-white/5">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center border border-amber-500/20">
                            <Feather className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-parchment tracking-widest uppercase">Inkfetish</h1>
                            <p className="text-xs text-parchment/50">x Chetna Choudhary</p>
                        </div>
                    </div>
                    <div className="hidden md:flex gap-8 text-xs tracking-[0.2em] uppercase text-parchment/60">
                        <a href="#about" className="hover:text-amber-500 transition-colors">About</a>
                        <a href="#journey" className="hover:text-amber-500 transition-colors">Journey</a>
                        <a href="#projects" className="hover:text-amber-500 transition-colors">Projects</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-30 pointer-events-none" />

                {/* Warm amber/gold ambient for the candle/light theme */}
                <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-amber-600/15 rounded-full blur-[150px] pointer-events-none animate-pulse duration-10000" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="space-y-8 text-center lg:text-left order-2 lg:order-1"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs text-amber-500 uppercase tracking-[0.2em] font-sans">
                            <Flame className="w-3 h-3" />
                            Scholar & Artisan Writer
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight">
                            Chet<span className="text-amber-500 italic font-normal font-display">na</span>
                            <br /> Choudhary
                        </h1>

                        <p className="text-xl text-parchment/70 font-light max-w-lg leading-relaxed mx-auto lg:mx-0">
                            {authorData.subtitle}
                        </p>

                        {/* Special Focus Badge */}
                        <div className="inline-flex items-center gap-3 p-3 bg-white/5 border border-amber-900/30 rounded-xl backdrop-blur-sm">
                            <div className="w-10 h-14 bg-gradient-to-br from-amber-900/40 to-orange-950/20 rounded-sm border border-amber-800/30 flex items-center justify-center flex-shrink-0">
                                <Sun className="w-5 h-5 text-amber-400/80" />
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-parchment/40 uppercase tracking-widest font-sans">In Progress</p>
                                <p className="text-sm text-parchment font-serif font-semibold">21 Devotional Poems</p>
                                <p className="text-xs text-amber-500/60 italic">A journey of faith and words</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 justify-center lg:justify-start pt-2">
                            <Button
                                onClick={() => toast.success("Feature coming soon!")}
                                className="bg-amber-600 text-ink-black hover:bg-amber-500 font-sans tracking-wide px-8 py-6 text-lg rounded-sm"
                            >
                                Join Reader List
                            </Button>

                            <div className="flex gap-4 text-parchment/40">
                                <Instagram className="w-6 h-6 hover:text-amber-500 cursor-pointer transition-colors hover:scale-110 duration-300" />
                                <Mail className="w-6 h-6 hover:text-amber-500 cursor-pointer transition-colors hover:scale-110 duration-300" />
                                <Globe className="w-6 h-6 hover:text-amber-500 cursor-pointer transition-colors hover:scale-110 duration-300" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Author Image Frame */}
                    <motion.div
                        style={{ y: y1 }}
                        className="relative order-1 lg:order-2"
                    >
                        <div className="absolute inset-0 border border-amber-500/20 rounded-t-[100px] rounded-b-lg transform rotate-6 translate-x-4 scale-105" />
                        <div className="absolute inset-0 border border-white/5 rounded-t-[100px] rounded-b-lg transform -rotate-3 -translate-x-2 scale-105" />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2 }}
                            className="w-full max-w-[450px] mx-auto aspect-[3/4] bg-zinc-900 rounded-t-[100px] rounded-b-lg overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                        >
                            {/* Theme placeholder */}
                            <div className="w-full h-full bg-gradient-to-br from-zinc-800 via-amber-950/20 to-ink-black flex items-center justify-center relative">
                                <div className="text-center space-y-6 p-8 relative z-10">
                                    <div className="w-36 h-36 mx-auto rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                                        <Flame className="w-14 h-14 text-amber-500/60" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-parchment/30 text-sm font-sans tracking-[0.2em] uppercase">Chetna Choudhary</p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-radial-gradient from-amber-500/5 to-transparent opacity-50" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-transparent to-transparent opacity-60" />

                            {/* Floating Element */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 hidden sm:block"
                            >
                                <Heart className="w-6 h-6 text-amber-500 mb-2" />
                                <p className="text-xs text-parchment/60 uppercase tracking-wider">Dream</p>
                                <p className="text-sm text-white font-serif">Fearlessly</p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Quote */}
            <section className="py-24 bg-ink-900/50 border-y border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <Quote className="w-12 h-12 text-amber-500/20 mx-auto mb-8" />
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-light leading-relaxed max-w-4xl mx-auto mb-10 font-display"
                    >
                        "Whether you are here to read a poem, explore a story, or simply find a moment of peace,{" "}
                        <span className="text-amber-500/80 italic">I hope you leave with a little more faith, courage, and happiness than you had before."</span>
                    </motion.h2>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-[1px] w-12 bg-white/20" />
                        <p className="text-parchment/50 font-sans text-sm tracking-[0.2em] uppercase">Chetna Choudhary</p>
                        <div className="h-[1px] w-12 bg-white/20" />
                    </div>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="py-20 bg-ink-black/50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                            { label: "Age", value: "29", icon: Calendar },
                            { label: "Role", value: "Scholar & Writer", icon: PenTool },
                            { label: "Education", value: "PhD (Pursuing)", icon: GraduationCap },
                            { label: "Business", value: "Candle Artisan", icon: Flame },
                            { label: "Writing", value: "Poetry & Fiction", icon: Feather },
                            { label: "Projects", value: "3 Manuscripts", icon: BookOpen }
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white/5 border border-white/5 rounded-xl p-4 text-center hover:bg-white/10 hover:border-amber-500/20 transition-all group"
                            >
                                <stat.icon className="w-5 h-5 text-amber-500/50 mx-auto mb-3 group-hover:text-amber-500 transition-colors" />
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
                                    <span className="w-12 h-[1px] bg-amber-500" />
                                    About Chetna
                                </h2>
                                <p className="text-xl text-parchment/80 leading-relaxed font-light mb-6">
                                    {authorData.longBio}
                                </p>
                            </motion.div>

                            {/* Journey Timeline */}
                            <div id="journey" className="space-y-8">
                                <h3 className="text-2xl font-serif text-white">The Pursuit of Light</h3>

                                {[
                                    {
                                        title: "The Academic Mind",
                                        year: "Foundation",
                                        desc: "Cleared UGC NET and is currently pursuing a PhD in English, immersing herself in the depths of literature.",
                                        icon: GraduationCap
                                    },
                                    {
                                        title: "The Artisan",
                                        year: "Business",
                                        desc: "Founded a candle-making business, blending the love of aesthetics, light, and warmth in physical form.",
                                        icon: Flame
                                    },
                                    {
                                        title: "Devotional Verses",
                                        year: "Present Year",
                                        desc: "Began writing a highly anticipated book comprising 21 devotional poems, merging spiritual reflection with poetry.",
                                        icon: Heart
                                    },
                                    {
                                        title: "Novels & Academia",
                                        year: "Ongoing",
                                        desc: "Successfully completed a novel manuscript and has commenced writing a new academic book, broadening her literary scope.",
                                        icon: BookOpen
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
                                            <div className="w-12 h-12 rounded-full border border-amber-500/30 bg-ink-900 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-ink-black transition-all">
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            {i !== 3 && <div className="w-[1px] h-full bg-white/10 my-2 group-hover:bg-amber-500/30 transition-colors" />}
                                        </div>
                                        <div className="pb-10">
                                            <span className="text-xs text-amber-500 uppercase tracking-widest">{item.year}</span>
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
                                    className="p-8 bg-zinc-900/40 rounded-2xl border border-white/5 backdrop-blur-sm relative overflow-hidden group hover:border-amber-500/30 transition-colors"
                                >
                                    <div className="absolute top-0 right-0 p-32 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                    <Eye className="w-8 h-8 text-amber-500 mb-6 relative z-10" />
                                    <h3 className="text-xl font-bold mb-4 relative z-10 font-serif">Vision & Goals</h3>
                                    <p className="text-parchment/70 leading-relaxed relative z-10">{authorData.journey.vision}</p>
                                </motion.div>

                                {/* Motivation Card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="p-8 bg-gradient-to-br from-amber-950/20 to-zinc-900/40 rounded-2xl border border-amber-900/20 backdrop-blur-sm relative overflow-hidden group hover:border-amber-700/30 transition-colors"
                                >
                                    <Sparkles className="w-8 h-8 text-amber-400/70 mb-6 relative z-10" />
                                    <h3 className="text-xl font-bold mb-4 relative z-10 font-serif">A Drive to Inspire</h3>
                                    <p className="text-parchment/70 leading-relaxed relative z-10">{authorData.journey.motivation}</p>
                                </motion.div>

                                {/* Current Projects Card */}
                                <div id="projects" className="p-8 bg-gradient-to-br from-amber-500/10 to-transparent rounded-2xl border border-amber-500/20 relative overflow-hidden">
                                    <div className="flex items-start justify-between mb-6">
                                        <BookOpen className="w-8 h-8 text-amber-500" />
                                        <Badge className="bg-amber-500 text-ink-black hover:bg-amber-600">Active Works</Badge>
                                    </div>
                                    <h3 className="text-xl font-serif text-white mb-4">Current Projects</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <Heart className="w-3 h-3 text-amber-500 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm text-parchment font-semibold">21 Devotional Poems</p>
                                                <p className="text-xs text-parchment/50 italic">Poetry Collection · In Progress</p>
                                            </div>
                                        </div>
                                        <div className="h-[1px] bg-white/5" />
                                        <div className="flex items-start gap-3">
                                            <Feather className="w-3 h-3 text-amber-500/60 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm text-parchment/80">Novel Manuscript</p>
                                                <p className="text-xs text-parchment/40 italic">Fiction · Completed</p>
                                            </div>
                                        </div>
                                        <div className="h-[1px] bg-white/5" />
                                        <div className="flex items-start gap-3">
                                            <GraduationCap className="w-3 h-3 text-amber-500/60 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm text-parchment/80">Academic Book</p>
                                                <p className="text-xs text-parchment/40 italic">Literature · In Progress</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* The Dual Life Section */}
            <section className="py-24 bg-ink-charcoal/30 border-t border-white/5">
                <div className="container mx-auto px-6 max-w-6xl">
                    <h2 className="text-3xl font-light mb-12 text-center">Between Scholarship and Art</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "The Academic",
                                desc: "UGC NET qualified and deep into PhD research in English literature, building a strong foundation of knowledge and critical thought.",
                                icon: GraduationCap
                            },
                            {
                                title: "The Artisan",
                                desc: "Running a candle-making business, finding beauty in creating physical sources of light and warmth.",
                                icon: Flame
                            },
                            {
                                title: "The Wordsmith",
                                desc: "Writing across multiple genres—devotional poetry, fiction, and academic literature—to comfort, inspire, and educate.",
                                icon: Feather
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
                                    <item.icon className="w-6 h-6 text-amber-500" />
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
                <div className="absolute inset-0 bg-amber-500/5 blur-[100px] pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <Quote className="w-12 h-12 text-amber-500/20 mx-auto mb-8" />
                    <p className="text-2xl md:text-4xl font-light italic text-parchment/90 leading-relaxed mb-12 font-display">
                        "Through my writing, I hope to encourage people to dream fearlessly, embrace kindness, and never give up on themselves or the people they love."
                    </p>
                    <div className="h-[1px] w-24 bg-amber-500/30 mx-auto mb-8" />
                    <div className="flex justify-center gap-8 text-xs tracking-widest uppercase text-parchment/40">
                        <span className="hover:text-amber-500 cursor-pointer transition-colors">Instagram</span>
                        <span className="hover:text-amber-500 cursor-pointer transition-colors">Email</span>
                        <span className="hover:text-amber-500 cursor-pointer transition-colors">Business</span>
                    </div>
                    <p className="text-xs text-parchment/20 mt-8 tracking-widest">© {new Date().getFullYear()} Chetna Choudhary. All rights reserved.</p>
                </div>
            </section>
        </div>
    );
};

export default ChetnaChoudharyAuthor;
