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
    Quote,
    Eye,
    Briefcase,
    GraduationCap,
    Scroll,
    Lightbulb,
    RefreshCw,
    Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const authorData = {
    name: "Sunitha Sukumaran",
    title: "Author, IT Professional & Lifelong Learner",
    subtitle: "Keep Learning. Keep Unlearning. Keep Relearning.",
    bio: "Sunitha Sukumaran is an IT professional, author, and lifelong learner whose journey spans the financial sector, management, and technology. She channels her experiences, observations, and lessons into writing that others can deeply connect with.",
    longBio: "Sunitha's journey did not begin with one particular moment — it evolved gradually through different phases of life. From a career in finance to management roles to the IT industry, she developed a strong curiosity for learning from people, books, experiences, and everyday life. Writing began through personal journaling and reflections, gradually transforming into something she wanted to share with the world. This evolution led to the publication of her first book, UNFOLDING: Moments That Shape Who We Become — a collection of reflections on the experiences and everyday moments that shape us. From there, writing became more than a personal practice; it became a continuing journey.",
    location: "India",
    email: "contact@sunitha-sukumaran.com",
    instagram: "sunitha_sukumaran",
    stats: {
        age: 33,
        role: "IT Professional & Author",
        education: "MBA (Human Resources)",
        status: "Active",
        genre: "Self-Development & Reflections"
    },
    journey: {
        start: "My journey did not begin with one particular moment. It evolved gradually — from finance to management to IT — and writing began through personal journaling and reflections that I eventually wanted to share with others.",
        motivation: "Curiosity has always been one of my greatest motivations. I've always been fascinated by people who possess knowledge, confidence, creativity, or a unique skill. Instead of simply admiring them, I began asking myself: 'What can I learn from them?'",
        vision: "I want to continue growing as an author, professional, and lifelong learner while creating meaningful work that encourages others to invest in themselves — writing more books, exploring public speaking, and sharing ideas that inspire people to remain curious.",
        message: "Never stop being a student of life. Learn from books, but also learn from people. Stay curious enough to question what you know, courageous enough to unlearn what no longer serves you, and humble enough to relearn when life gives you a new perspective. Because the best version of you is not someone you discover once — it is someone you continually become."
    }
};

const SunithaSukumaranAuthor = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, -100]);

    return (
        <div className="min-h-screen bg-ink-black text-parchment font-serif selection:bg-gold selection:text-ink-black overflow-x-hidden">
            <Helmet>
                <title>Sunitha Sukumaran | Inkfetish Author</title>
                <meta name="description" content="IT Professional, Author, and Lifelong Learner. Discover the books and journey of Sunitha Sukumaran — author of UNFOLDING: Moments That Shape Who We Become." />
                <meta property="og:title" content="Sunitha Sukumaran | Inkfetish" />
                <meta property="og:description" content="Keep Learning. Keep Unlearning. Keep Relearning. Explore the writing and journey of Sunitha Sukumaran." />
                <meta property="og:type" content="profile" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Sunitha Sukumaran | Inkfetish" />
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
                            <p className="text-xs text-parchment/50">x Sunitha Sukumaran</p>
                        </div>
                    </div>
                    <div className="hidden md:flex gap-8 text-xs tracking-[0.2em] uppercase text-parchment/60">
                        <a href="#about" className="hover:text-gold transition-colors">About</a>
                        <a href="#journey" className="hover:text-gold transition-colors">Journey</a>
                        <a href="#work" className="hover:text-gold transition-colors">Works</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-30 pointer-events-none" />
                <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="space-y-8 text-center lg:text-left order-2 lg:order-1"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full text-xs text-gold uppercase tracking-[0.2em] font-sans">
                            <BookOpen className="w-3 h-3" />
                            Published Author
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight">
                            Sunitha <br />
                            <span className="text-gold italic font-normal font-display">Sukumaran</span>
                        </h1>

                        <p className="text-xl text-parchment/70 font-light max-w-lg leading-relaxed mx-auto lg:mx-0">
                            {authorData.subtitle}
                        </p>

                        {/* Book Badge */}
                        <div className="inline-flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                            <div className="w-10 h-14 bg-gradient-to-br from-gold/30 to-gold/10 rounded-sm border border-gold/20 flex items-center justify-center flex-shrink-0">
                                <BookOpen className="w-5 h-5 text-gold" />
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-parchment/40 uppercase tracking-widest font-sans">Published Book</p>
                                <p className="text-sm text-parchment font-serif font-semibold">UNFOLDING</p>
                                <p className="text-xs text-gold/70 italic">Moments That Shape Who We Become</p>
                            </div>
                        </div>

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
                            className="w-full max-w-[450px] mx-auto aspect-[3/4] bg-zinc-900 rounded-t-[100px] rounded-b-lg overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-1000 group shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                        >
                            {/* Placeholder gradient background since no photo provided */}
                            <div className="w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-ink-black flex items-center justify-center">
                                <div className="text-center space-y-4 p-8">
                                    <div className="w-32 h-32 mx-auto rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                                        <Feather className="w-12 h-12 text-gold/60" />
                                    </div>
                                    <p className="text-parchment/30 text-sm font-sans tracking-widest uppercase">Sunitha Sukumaran</p>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-transparent to-transparent opacity-60" />

                            {/* Floating Element */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 hidden sm:block"
                            >
                                <Lightbulb className="w-6 h-6 text-gold mb-2" />
                                <p className="text-xs text-parchment/60 uppercase tracking-wider">Lifelong</p>
                                <p className="text-sm text-white font-serif">Learner</p>
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
                        "The best version of you is not someone you discover once —{" "}
                        <span className="text-gold/80 italic">it is someone you continually become."</span>
                    </motion.h2>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-[1px] w-12 bg-white/20" />
                        <p className="text-parchment/50 font-sans text-sm tracking-[0.2em] uppercase">Sunitha Sukumaran</p>
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
                            { label: "Role", value: "IT & Author", icon: Briefcase },
                            { label: "Education", value: "MBA (HR)", icon: GraduationCap },
                            { label: "Location", value: "India", icon: MapPin },
                            { label: "Genre", value: "Self-Development", icon: Scroll },
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
                                    About The Author
                                </h2>
                                <p className="text-xl text-parchment/80 leading-relaxed font-light mb-6">
                                    {authorData.longBio}
                                </p>
                                <p className="text-parchment/60 leading-relaxed">
                                    Her work reflects a deep belief that growth is not about becoming someone else — it is about continuously discovering what we are capable of becoming. Every book, every page, every reflection is an invitation to that discovery.
                                </p>
                            </motion.div>

                            {/* Journey Timeline */}
                            <div id="journey" className="space-y-8">
                                <h3 className="text-2xl font-serif text-white">The Path Traveled</h3>

                                {[
                                    { title: "The Foundation", year: "Finance & Management Era", desc: "Built a career in the financial sector and management roles, developing strong curiosity and a hunger for continuous learning from every experience.", icon: Briefcase },
                                    { title: "The Awakening", year: "The IT Chapter", desc: "Moved into the IT industry while journaling and reflecting privately — writing became a companion through growth, challenges, and self-discovery.", icon: Lightbulb },
                                    { title: "The First Book", year: "UNFOLDING Published", desc: "Published her debut book UNFOLDING: Moments That Shape Who We Become — transforming personal reflections into something readers everywhere could connect with.", icon: BookOpen },
                                    { title: "The Continuing Journey", year: "Present Day", desc: "Working on the upcoming book Learning. Unlearning. Relearning. — exploring self-development through lessons from people, habits, technology, and everyday life.", icon: RefreshCw }
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
                                    <h3 className="text-xl font-bold mb-4 relative z-10 font-serif">Inner Motivation</h3>
                                    <p className="text-parchment/70 leading-relaxed relative z-10">{authorData.journey.motivation}</p>
                                </motion.div>

                                {/* Upcoming Book Card */}
                                <div id="work" className="p-8 bg-gradient-to-br from-gold/10 to-transparent rounded-2xl border border-gold/20 relative overflow-hidden">
                                    <div className="flex items-start justify-between mb-6">
                                        <BookOpen className="w-8 h-8 text-gold" />
                                        <Badge className="bg-gold text-ink-black hover:bg-gold/90">Upcoming</Badge>
                                    </div>
                                    <h3 className="text-2xl font-serif text-white mb-2">Next Book</h3>
                                    <p className="text-gold/80 italic text-lg mb-3 font-serif">Learning. Unlearning. Relearning.</p>
                                    <p className="text-parchment/60 text-sm">Exploring self-development through lessons from books, people, experiences, habits, technology, and everyday life — reflecting that growth is not a destination but an ongoing process.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Behind the Writing */}
            <section className="py-24 bg-ink-charcoal/30 border-t border-white/5">
                <div className="container mx-auto px-6 max-w-6xl">
                    <h2 className="text-3xl font-light mb-12 text-center">The Learning Philosophy</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Learn", desc: "From books, people, experiences, technology, mentors, and the quiet lessons hidden in everyday life.", icon: Sparkles },
                            { title: "Unlearn", desc: "Question what you know. Let go of beliefs and habits that no longer serve your growth or your becoming.", icon: RefreshCw },
                            { title: "Relearn", desc: "Stay humble enough to relearn when life offers a new perspective. Growth is not a destination — it's a process.", icon: Target }
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
                    <p className="text-xs text-parchment/20 mt-8 tracking-widest">© {new Date().getFullYear()} Sunitha Sukumaran. All rights reserved.</p>
                </div>
            </section>
        </div>
    );
};

export default SunithaSukumaranAuthor;
