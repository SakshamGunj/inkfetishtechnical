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
    Dog,
    Target,
    Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
import Image from "next/image";

const authorData = {
    name: "Sharmila Maitra",
    title: "Marketing Professional & Author",
    subtitle: "Writing from the Heart, Fighting for the Soul",
    bio: "Sharmila Maitra is a Marketing and Communications professional by day and a devoted writer by heart. Balancing the corporate world with her dual passions for boxing and storytelling, she crafts narratives that challenge perspectives and spark the imagination.",
    longBio: "Sharmila's journey began on a sunny afternoon when she was sixteen. Choosing daydreams over mid-term studies, a flock of birds flying with quiet purpose inspired her very first poem. Since that moment, writing became her constant companion—a way to make sense of happiness, sadness, anger, and anxiety. When the words don't flow easily, she turns to boxing, finding strategy and mental clarity in the rhythm of the heavy bag. Armed with an MBA from Symbiosis, a Master's Diploma in Mass Comm, and a deep-seated love for animals, Sharmila uses both pen and gloves to slow down, process the world, and find her balance.",
    location: "India",
    email: "", // Placeholder
    instagram: "", // Placeholder
    stats: {
        age: 37,
        role: "Comms & Author",
        education: "MBA, Symbiosis",
        status: "Active",
        passion: "Boxing & Writing",
        goal: "10 Books / 10 Yrs"
    },
    journey: {
        start: "One sunny afternoon, as I sat basking on my terrace choosing daydreams over studying, I watched a flock of birds cutting across the sky. I wrote a poem, unaware it would mark the beginning of something far greater.",
        motivation: "Writing and playing a sport are the easiest ways to let things out. Writing helps me make sense of my emotions, and on days when words don't come easily, I turn to boxing. Both help me slow down and process what's inside.",
        vision: "To tell compelling stories rooted in novel concepts that challenge perspectives. My ultimate goal is to author and publish ten books over the next ten years, reflecting creativity, consistency, and growth.",
        message: "Evolution is the key to growth. Keep setting goals, big or small, and don't stop until you've achieved them."
    },
    currentBook: {
        title: "Tiger Homeward On His Own Terms: A Journey To Belonging",
        dedication: "DEDICATED TO MY ELDEST FUR BABY TIGER. YOU WILL ALWAYS BE HARNESSED TO MY HEART",
        desc: "A novel told from the perspective of a furry friend. It traces his journey of learning, survival, and self-discovery on the streets before fate finally leads him to his hooman mom at the ripe age of ten."
    }
};

const SharmilaMaitraAuthor = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, -100]);

    return (
        <div className="min-h-screen bg-ink-black text-parchment font-serif selection:bg-orange-500/30 selection:text-white overflow-x-hidden">
            <Helmet>
                <title>Sharmila Maitra | Inkfetish Author</title>
                <meta name="description" content="Marketing Professional & Author. Discover the stories of Sharmila Maitra." />
                <meta property="og:title" content="Sharmila Maitra | Inkfetish" />
                <meta property="og:description" content="Writing from the Heart, Fighting for the Soul." />
                <meta property="og:type" content="profile" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Sharmila Maitra | Inkfetish" />
            </Helmet>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-ink-black/80 backdrop-blur-md border-b border-white/5">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center border border-orange-500/20">
                            <Feather className="w-5 h-5 text-orange-400" />
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-parchment tracking-widest uppercase">Inkfetish</h1>
                            <p className="text-xs text-parchment/50">x Sharmila Maitra</p>
                        </div>
                    </div>
                    <div className="hidden md:flex gap-8 text-xs tracking-[0.2em] uppercase text-parchment/60">
                        <a href="#about" className="hover:text-orange-400 transition-colors">About</a>
                        <a href="#journey" className="hover:text-orange-400 transition-colors">Journey</a>
                        <a href="#projects" className="hover:text-orange-400 transition-colors">Projects</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-30 pointer-events-none" />

                {/* Warm terracotta and copper ambient */}
                <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-orange-900/15 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-900/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="space-y-8 text-center lg:text-left order-2 lg:order-1"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-xs text-orange-400 uppercase tracking-[0.2em] font-sans">
                            <Briefcase className="w-3 h-3" />
                            Comms Pro & Writer
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight">
                            Shar<span className="text-orange-400 italic font-normal font-display">mila</span>
                            <br /> Maitra
                        </h1>

                        <p className="text-xl text-parchment/70 font-light max-w-lg leading-relaxed mx-auto lg:mx-0">
                            {authorData.subtitle}
                        </p>

                        {/* Special Focus Badge */}
                        <div className="inline-flex items-center gap-3 p-3 bg-white/5 border border-orange-900/30 rounded-xl backdrop-blur-sm">
                            <div className="w-10 h-14 bg-gradient-to-br from-orange-900/40 to-amber-950/20 rounded-sm border border-orange-800/30 flex items-center justify-center flex-shrink-0">
                                <Dog className="w-5 h-5 text-orange-400/80" />
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-parchment/40 uppercase tracking-widest font-sans">Upcoming Release</p>
                                <p className="text-sm text-parchment font-serif font-semibold truncate max-w-[200px] sm:max-w-xs">Tiger Homeward On His Own Terms</p>
                                <p className="text-xs text-orange-400/60 italic">A Journey To Belonging</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 justify-center lg:justify-start pt-2">
                            <Button
                                onClick={() => toast.success("Feature coming soon!")}
                                className="bg-orange-600/80 text-white hover:bg-orange-500 font-sans tracking-wide px-8 py-6 text-lg rounded-sm backdrop-blur-sm"
                            >
                                Join Reader List
                            </Button>

                            <div className="flex gap-4 text-parchment/40">
                                <Instagram className="w-6 h-6 hover:text-orange-400 cursor-pointer transition-colors hover:scale-110 duration-300" />
                                <Mail className="w-6 h-6 hover:text-orange-400 cursor-pointer transition-colors hover:scale-110 duration-300" />
                                <Globe className="w-6 h-6 hover:text-orange-400 cursor-pointer transition-colors hover:scale-110 duration-300" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Author Image Frame */}
                    <motion.div
                        style={{ y: y1 }}
                        className="relative order-1 lg:order-2"
                    >
                        <div className="absolute inset-0 border border-orange-500/20 rounded-t-[100px] rounded-b-lg transform rotate-6 translate-x-4 scale-105" />
                        <div className="absolute inset-0 border border-white/5 rounded-t-[100px] rounded-b-lg transform -rotate-3 -translate-x-2 scale-105" />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2 }}
                            className="w-full max-w-[450px] mx-auto aspect-[3/4] bg-zinc-900 rounded-t-[100px] rounded-b-lg overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                        >
                            <Image
                                src="/authors/sharmila.jpg"
                                alt="Sharmila Maitra"
                                fill
                                className="object-cover relative z-10"
                                sizes="(max-width: 768px) 100vw, 450px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-ink-black/20 to-transparent opacity-80 z-20" />

                            {/* Floating Element */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 hidden sm:block z-30"
                            >
                                <Target className="w-6 h-6 text-orange-400 mb-2" />
                                <p className="text-xs text-parchment/60 uppercase tracking-wider">Evolution Is</p>
                                <p className="text-sm text-white font-serif">Growth</p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Quote */}
            <section className="py-24 bg-ink-900/50 border-y border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <Quote className="w-12 h-12 text-orange-500/20 mx-auto mb-8" />
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-light leading-relaxed max-w-4xl mx-auto mb-10 font-display"
                    >
                        "Evolution is the key to growth. Keep setting goals, big or small, and{" "}
                        <span className="text-orange-400/80 italic">don't stop until you've achieved them."</span>
                    </motion.h2>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-[1px] w-12 bg-white/20" />
                        <p className="text-parchment/50 font-sans text-sm tracking-[0.2em] uppercase">Sharmila Maitra</p>
                        <div className="h-[1px] w-12 bg-white/20" />
                    </div>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="py-20 bg-ink-black/50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                            { label: "Age", value: "37", icon: Calendar },
                            { label: "Profession", value: "Marketing", icon: Briefcase },
                            { label: "Education", value: "MBA", icon: GraduationCap },
                            { label: "Passion", value: "Boxing & Ink", icon: Activity },
                            { label: "Goal", value: "10 Books", icon: Target },
                            { label: "Release", value: "Fur Baby Novel", icon: Dog }
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white/5 border border-white/5 rounded-xl p-4 text-center hover:bg-white/10 hover:border-orange-500/20 transition-all group"
                            >
                                <stat.icon className="w-5 h-5 text-orange-400/50 mx-auto mb-3 group-hover:text-orange-400 transition-colors" />
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
                                    <span className="w-12 h-[1px] bg-orange-500" />
                                    About Sharmila
                                </h2>
                                <p className="text-xl text-parchment/80 leading-relaxed font-light mb-6">
                                    {authorData.longBio}
                                </p>
                            </motion.div>

                            {/* Journey Timeline */}
                            <div id="journey" className="space-y-8">
                                <h3 className="text-2xl font-serif text-white">A Balanced Life</h3>

                                {[
                                    {
                                        title: "The Terrace Epiphany",
                                        year: "Age 16",
                                        desc: "Watching birds cut across the sky instead of studying for mid-terms led to her first poem—and the start of a lifelong companion in writing.",
                                        icon: Eye
                                    },
                                    {
                                        title: "The Corporate World",
                                        year: "Career",
                                        desc: "Built a robust career in Marketing and Communications, backed by a BA, a Mass Comm diploma, and an MBA.",
                                        icon: Briefcase
                                    },
                                    {
                                        title: "Gloves & Pen",
                                        year: "Processing Life",
                                        desc: "Using boxing to clear her head and strategize, and writing to make sense of deep emotions. Two opposite ends of the spectrum that bring ultimate balance.",
                                        icon: Activity
                                    },
                                    {
                                        title: "The Visionary Goal",
                                        year: "Next 10 Years",
                                        desc: "Determined to write and publish ten books in ten years, leaving a legacy of compelling stories and novel concepts.",
                                        icon: Target
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
                                            <div className="w-12 h-12 rounded-full border border-orange-500/30 bg-ink-900 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-ink-black transition-all">
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            {i !== 3 && <div className="w-[1px] h-full bg-white/10 my-2 group-hover:bg-orange-500/30 transition-colors" />}
                                        </div>
                                        <div className="pb-10">
                                            <span className="text-xs text-orange-400 uppercase tracking-widest">{item.year}</span>
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
                                    className="p-8 bg-zinc-900/40 rounded-2xl border border-white/5 backdrop-blur-sm relative overflow-hidden group hover:border-orange-500/30 transition-colors"
                                >
                                    <div className="absolute top-0 right-0 p-32 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                    <Target className="w-8 h-8 text-orange-400 mb-6 relative z-10" />
                                    <h3 className="text-xl font-bold mb-4 relative z-10 font-serif">10 Books, 10 Years</h3>
                                    <p className="text-parchment/70 leading-relaxed relative z-10">{authorData.journey.vision}</p>
                                </motion.div>

                                {/* Current Projects Card */}
                                <div id="projects" className="p-8 bg-gradient-to-br from-orange-500/10 to-transparent rounded-2xl border border-orange-500/20 relative overflow-hidden">
                                    <div className="flex items-start justify-between mb-6">
                                        <BookOpen className="w-8 h-8 text-orange-400" />
                                        <Badge className="bg-orange-500/80 text-white hover:bg-orange-500 border-none">Publishing Soon</Badge>
                                    </div>
                                    <h3 className="text-xl font-serif text-white mb-2">{authorData.currentBook.title}</h3>
                                    <p className="text-xs text-orange-400 font-sans tracking-wide mb-6">{authorData.currentBook.dedication}</p>
                                    
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <Dog className="w-4 h-4 text-orange-400 mt-1 flex-shrink-0" />
                                            <p className="text-sm text-parchment/80 leading-relaxed">
                                                {authorData.currentBook.desc}
                                            </p>
                                        </div>
                                        <div className="h-[1px] bg-white/5" />
                                        <p className="text-xs text-parchment/50 italic text-center">
                                            Through his eyes, the story maps not just life on the streets, but the deep emotional bonds and unspoken hopes that guide him home.
                                        </p>
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
                    <h2 className="text-3xl font-light mb-12 text-center">Mind, Body, and Soul</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "The Strategist",
                                desc: "Navigating the fast-paced world of Marketing and Communications with precision and business acumen.",
                                icon: Briefcase
                            },
                            {
                                title: "The Fighter",
                                desc: "Using the discipline and rhythm of boxing to process thoughts, strategize, and clear the mind on challenging days.",
                                icon: Activity
                            },
                            {
                                title: "The Compassionate Author",
                                desc: "Pouring genuine emotion onto paper, particularly honoring the deep bonds between humans and animals.",
                                icon: Heart
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
                                    <item.icon className="w-6 h-6 text-orange-400" />
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
                <div className="absolute inset-0 bg-orange-500/5 blur-[100px] pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <Quote className="w-12 h-12 text-orange-500/20 mx-auto mb-8" />
                    <p className="text-2xl md:text-3xl font-light italic text-parchment/90 leading-relaxed mb-12 font-display">
                        "Evolution is the key to growth. Keep setting goals, big or small, and don't stop until you've achieved them."
                    </p>
                    <div className="h-[1px] w-24 bg-orange-500/30 mx-auto mb-8" />
                    <div className="flex justify-center gap-8 text-xs tracking-widest uppercase text-parchment/40">
                        <span className="hover:text-orange-400 cursor-pointer transition-colors">Instagram</span>
                        <span className="hover:text-orange-400 cursor-pointer transition-colors">Email</span>
                    </div>
                    <p className="text-xs text-parchment/20 mt-8 tracking-widest">© {new Date().getFullYear()} Sharmila Maitra. All rights reserved.</p>
                </div>
            </section>
        </div>
    );
};

export default SharmilaMaitraAuthor;
