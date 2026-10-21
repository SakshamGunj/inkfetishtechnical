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
    PenTool,
    Sparkles,
    Quote,
    Eye,
    Briefcase,
    GraduationCap,
    Clock,
    Award,
    Mic
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const authorData = {
    name: "Dr. Neil Shah",
    title: "Psychiatrist, Mindfulness Coach & Author",
    subtitle: "Understanding the Human Being Behind Every Achievement",
    bio: "Dr. Neil Shah is a Gold Medalist Psychiatrist (MBBS, MD) and Mindfulness Coach dedicated to making the human mind easier to understand. Alongside his clinical practice and podcast 'Mindful Living with Neil', he is the author of 'Detox Your Mind' and his newest book, 'The 10 PM Effect'—written for founders and business owners whose minds keep working long after the workday ends.",
    longBio: "Dr. Neil's journey began during medical school with a deep curiosity about self-understanding—asking what he truly wanted from life rather than merely following external expectations. That quest led him into psychiatry, where he earned a Gold Medal in his MD, and into the realm of mindfulness and personal growth. Through clinical conversations with founders and business owners, he noticed a recurring pattern: many had returned home physically, yet their minds were still at work—replaying conversations, worrying about tomorrow, and struggling to be present. 'The 10 PM Effect' was born from these conversations to help high-achievers understand what happens within them and build a healthier relationship with their thoughts and emotions.",
    location: "India",
    email: "contact@drneilshah.com",
    instagram: "drneilshah",
    stats: {
        age: 32,
        role: "Psychiatrist & Coach",
        education: "MBBS, MD (Gold Medalist)",
        status: "Published Author",
        genre: "Mindfulness & Growth"
    },
    journey: {
        start: "My journey began with a growing interest in understanding myself during medical school—asking what I truly wanted from life rather than only following what others expected of me. That curiosity led me toward psychiatry, personal growth, and eventually 'The 10 PM Effect'.",
        motivation: "I wanted to understand the person behind the achievements. Someone can look successful from the outside and still feel worried, restless, or mentally tired inside. I wrote 'The 10 PM Effect' to help founders understand what is happening within them rather than simply telling them to relax or work harder.",
        vision: "To make understanding the mind easier and more relatable. My hope is that founders learn to give the person building the business as much attention as the business itself—making decisions with clarity and staying connected to the life they want to build.",
        message: "There is a human being behind every business. That person deserves care too. Building a successful business should not mean losing touch with yourself and the people you love. Before asking how to build a better business, take some time to understand the person building it."
    }
};

const NeilShahAuthor = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, -100]);

    return (
        <div className="min-h-screen bg-ink-black text-parchment font-serif selection:bg-gold selection:text-ink-black overflow-x-hidden">
            <Helmet>
                <title>Dr. Neil Shah | Inkfetish Author</title>
                <meta name="description" content="Psychiatrist, Mindfulness Coach, and Author of The 10 PM Effect and Detox Your Mind." />
                <meta property="og:title" content="Dr. Neil Shah | Inkfetish" />
                <meta property="og:description" content="Understanding the human being behind every achievement. Explore the books and work of Dr. Neil Shah." />
                <meta property="og:image" content="/authors/neil.jpg" />
                <meta property="og:type" content="profile" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Dr. Neil Shah | Inkfetish" />
                <meta name="twitter:image" content="/authors/neil.jpg" />
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
                            <p className="text-xs text-parchment/50">x Dr. Neil Shah</p>
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
                {/* Animated Background Elements */}
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
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight">
                            Dr. Neil <br />
                            <span className="text-gold italic font-normal font-display">Shah</span>
                        </h1>

                        <p className="text-xl text-parchment/70 font-light max-w-lg leading-relaxed mx-auto lg:mx-0">
                            {authorData.subtitle}
                        </p>

                        <div className="flex flex-col gap-6 pt-4 justify-center lg:justify-start">
                            <div className="flex items-center gap-6 justify-center lg:justify-start">
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
                            <img
                                src="/authors/neil.jpg"
                                alt="Dr. Neil Shah"
                                className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-transparent to-transparent opacity-60" />

                            {/* Floating Element */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 hidden sm:block"
                            >
                                <Award className="w-6 h-6 text-gold mb-2" />
                                <p className="text-xs text-parchment/60 uppercase tracking-wider">MD Psychiatry</p>
                                <p className="text-sm text-white font-serif">Gold Medalist</p>
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
                        "Before asking how to build a better business, <br />
                        <span className="text-gold/80 italic">take some time to understand the person building it."</span>
                    </motion.h2>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-[1px] w-12 bg-white/20" />
                        <p className="text-parchment/50 font-sans text-sm tracking-[0.2em] uppercase">Dr. Neil Shah</p>
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
                            { label: "Role", value: "Psychiatrist & Coach", icon: Briefcase },
                            { label: "Education", value: "MBBS, MD Psychiatry", icon: GraduationCap },
                            { label: "Honour", value: "Gold Medalist", icon: Award },
                            { label: "Featured Book", value: "The 10 PM Effect", icon: BookOpen },
                            { label: "Podcast", value: "Mindful Living", icon: Mic }
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
                                    Alongside his clinical psychiatry practice, Dr. Neil creates videos, podcasts, and books that bridge clinical wisdom with practical mindfulness—helping people step out of overthinking and reconnect with their lives outside work.
                                </p>
                            </motion.div>

                            {/* Journey Timeline */}
                            <div id="journey" className="space-y-8">
                                <h3 className="text-2xl font-serif text-white">The Path Traveled</h3>

                                {[
                                    { title: "Self-Inquiry in Medical School", year: "The Beginning", desc: "Started questioning what he truly wanted from life rather than simply following expectations, sparking a lifelong dedication to the mind.", icon: Sparkles },
                                    { title: "Gold Medalist in MD Psychiatry", year: "Clinical Mastery", desc: "Completed MBBS and earned a Gold Medal in MD Psychiatry, combining clinical depth with compassionate mindfulness coaching.", icon: GraduationCap },
                                    { title: "The 10 PM Effect & Beyond", year: "Present Day", desc: "Authoring 'The 10 PM Effect' and 'Detox Your Mind', and hosting 'Mindful Living with Neil' to help founders and readers thrive.", icon: BookOpen }
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
                                            {i !== 2 && <div className="w-[1px] h-full bg-white/10 my-2 group-hover:bg-gold/30 transition-colors" />}
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

                                {/* Books & Podcast Card */}
                                <div id="work" className="p-8 bg-gradient-to-br from-gold/10 to-transparent rounded-2xl border border-gold/20 relative overflow-hidden">
                                    <div className="flex items-start justify-between mb-6">
                                        <BookOpen className="w-8 h-8 text-gold" />
                                        <Badge className="bg-gold text-ink-black hover:bg-gold/90">Featured Works</Badge>
                                    </div>
                                    <h3 className="text-2xl font-serif text-white mb-2">The 10 PM Effect</h3>
                                    <p className="text-parchment/70 text-sm mb-4">
                                        Written for founders and business owners whose minds keep working even after the workday ends—exploring overthinking, emotional pressure, and the art of being present outside work.
                                    </p>
                                    <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-parchment/60">
                                        <p><span className="text-gold uppercase tracking-wider">Previous Book:</span> Detox Your Mind</p>
                                        <p><span className="text-gold uppercase tracking-wider">Podcast:</span> Mindful Living with Neil</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Behind the Ink */}
            <section className="py-24 bg-ink-charcoal/30 border-t border-white/5">
                <div className="container mx-auto px-6 max-w-6xl">
                    <h2 className="text-3xl font-light mb-12 text-center">Behind The Ink</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "The 10 PM Effect", desc: "Helping founders and leaders switch off mental noise after hours and return home both physically and mentally.", icon: Clock },
                            { title: "Clinical Wisdom", desc: "Grounded in his practice as a Gold Medalist MD Psychiatrist and mindfulness coach.", icon: Award },
                            { title: "Mindful Living", desc: "Sharing relatable insights through his book 'Detox Your Mind', videos, and the 'Mindful Living with Neil' podcast.", icon: Mic }
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
                        <span className="hover:text-gold cursor-pointer transition-colors">Podcast</span>
                    </div>
                    <p className="text-xs text-parchment/20 mt-8 tracking-widest">© {new Date().getFullYear()} Dr. Neil Shah. All rights reserved.</p>
                </div>
            </section>
        </div>
    );
};

export default NeilShahAuthor;
