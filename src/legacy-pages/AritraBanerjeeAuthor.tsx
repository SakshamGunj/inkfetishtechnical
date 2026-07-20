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
    Clock,
    Scroll,
    Music
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const authorData = {
    name: "Aritra Banerjee",
    title: "Writer & Singer",
    subtitle: "Embracing Inner Light and Dreams",
    bio: "Aritra Banerjee is a creative writer and singer with an M.A. in English Literature. Her creative journey began in class 3 with short stories and poetry, fueled by encouragement from her teachers. Today, she weaves her unique voice through writing and music, pursuing her lifelong dream of publishing books.",
    longBio: "Aritra's creative venture started early in class 3, where she began writing short stories and mostly poems. The praise and encouragement from her teachers at Usha Martin school laid a strong foundation for her artistic journey. With a Master's degree in English Literature from Calcutta University, she is now actively participating in poetry competitions and taking on music projects. Guided by her inner faith, intuition, and the unwavering support of her soulmate Elliot, she is determined to give real shape to her dreams.",
    location: "Kolkata, India",
    email: "contact@aritrarbanerjee.com", // Placeholder
    instagram: "aritra_banerjee", // Placeholder
    stats: {
        age: 23,
        role: "Creative Writer & Singer",
        education: "M.A. English Literature",
        status: "Active",
        genre: "Poetry & Short Stories"
    },
    journey: {
        start: "My creative venture started from class 3 onwards, writing short stories and poems. The praise and encouragement from my teachers is where my journey truly began.",
        motivation: "My soulmate and life partner Elliot motivates me to keep writing, to express and embrace my unique voice, and to give real shape to my dreams by believing in my own magic.",
        vision: "To shine as a writer and a singer in the future, having more books published, and to keep on writing and singing. This is my dream career, and I am walking towards it.",
        message: "If you have a dream, no matter how dark or rough the terrains may seem, shine your inner light, and walk towards your dream... the storms shall pass, all hurdles will be crossed and the sun will shine again. Never, ever stop or give up!"
    }
};

const AritraBanerjeeAuthor = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, -100]);

    return (
        <div className="min-h-screen bg-ink-black text-parchment font-serif selection:bg-gold selection:text-ink-black overflow-x-hidden">
            <Helmet>
                <title>Aritra Banerjee | Inkfetish Author</title>
                <meta name="description" content="Writer, Singer, and Dreamer. Discover the works and journey of Aritra Banerjee." />
                <meta property="og:title" content="Aritra Banerjee | Inkfetish" />
                <meta property="og:description" content="Embracing Inner Light and Dreams. Explore the poetry and journey of Aritra Banerjee." />
                <meta property="og:image" content="https://i.ibb.co/60ZXYwF/placeholder-author.jpg" /> {/* Using a placeholder, change later if image is provided */}
                <meta property="og:type" content="profile" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Aritra Banerjee | Inkfetish" />
                <meta name="twitter:image" content="https://i.ibb.co/60ZXYwF/placeholder-author.jpg" />
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
                            <p className="text-xs text-parchment/50">x Aritra Banerjee</p>
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
                            Aritra <br />
                            <span className="text-gold italic font-normal font-display">Banerjee</span>
                        </h1>

                        <p className="text-xl text-parchment/70 font-light max-w-lg leading-relaxed mx-auto lg:mx-0">
                            {authorData.subtitle}
                        </p>

                        <div className="flex flex-col gap-6 pt-4 justify-center lg:justify-start">
                            <div className="flex items-center gap-6">
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
                                src="https://i.ibb.co/3sW82yT/Screenshot-2025-01-20-at-6-49-16-PM.png" // Reusing a default author placeholder if no specific image is provided
                                alt="Aritra Banerjee"
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-transparent to-transparent opacity-60" />

                            {/* Floating Element */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 hidden sm:block"
                            >
                                <Music className="w-6 h-6 text-gold mb-2" />
                                <p className="text-xs text-parchment/60 uppercase tracking-wider">Soulful Voice</p>
                                <p className="text-sm text-white font-serif">Poetic Pen</p>
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
                        "If you believe in yourself, in the power of the universe, <br />
                        <span className="text-gold/80 italic">and have determination that the dream is not a maybe rather a must be, it will definitely work out✨"</span>
                    </motion.h2>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-[1px] w-12 bg-white/20" />
                        <p className="text-parchment/50 font-sans text-sm tracking-[0.2em] uppercase">Aritra Banerjee</p>
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
                            { label: "Role", value: "Writer & Singer", icon: Briefcase },
                            { label: "Education", value: "M.A. English", icon: GraduationCap },
                            { label: "Location", value: "Kolkata, India", icon: MapPin },
                            { label: "Genre", value: "Poetry", icon: Scroll },
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
                                    Enduring storms and overcoming friction, Aritra continues to write and sing, drawing strength from her inner light. She believes that the darkest terrains can be crossed when one is guided by faith, intuition, and courage.
                                </p>
                            </motion.div>

                            {/* Journey Timeline */}
                            <div className="space-y-8">
                                <h3 className="text-2xl font-serif text-white">The Path Traveled</h3>

                                {[
                                    { title: "The Beginning", year: "Class 3 Onwards", desc: "Started the creative venture writing short stories and poems, encouraged by teachers at Usha Martin.", icon: Sparkles },
                                    { title: "The Foundation", year: "University Days", desc: "Completed M.A. in English Literature from Calcutta University, deepening the bond with words.", icon: BookOpen },
                                    { title: "The Rising Star", year: "Present Day", desc: "Participating in poetry competitions, taking on music projects, and taking decisive steps toward a published book.", icon: Briefcase }
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

                                {/* Current Focus Card */}
                                <div className="p-8 bg-gradient-to-br from-gold/10 to-transparent rounded-2xl border border-gold/20 relative overflow-hidden">
                                    <div className="flex items-start justify-between mb-6">
                                        <BookOpen className="w-8 h-8 text-gold" />
                                        <Badge className="bg-gold text-ink-black hover:bg-gold/90">Current Focus</Badge>
                                    </div>
                                    <h3 className="text-2xl font-serif text-white mb-2">Upcoming Works</h3>
                                    <p className="text-parchment/60 text-sm mb-6">Actively participating in online poetry competitions and exploring music projects, working steadily toward the release of her debut book.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Behind the Ink */}
            <section className="py-24 bg-ink-charcoal/30 border-t border-white/5">
                <div className="container mx-auto px-6 max-w-6xl">
                    <h2 className="text-3xl font-light mb-12 text-center">The Creative Spirit</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "The Writer", desc: "Crafting short stories and poems since class 3, turning latent dreams into a powerful voice.", icon: PenTool },
                            { title: "The Singer", desc: "A harmonious soul who embraces the magic of music as a core part of her artistic identity.", icon: Music },
                            { title: "The Believer", desc: "Trusting in the power of the universe, inner light, and intuition to overcome all hurdles.", icon: Sparkles }
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
                    <p className="text-xs text-parchment/20 mt-8 tracking-widest">© {new Date().getFullYear()} Aritra Banerjee. All rights reserved.</p>
                </div>
            </section>
        </div>
    );
};

export default AritraBanerjeeAuthor;
