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
    Palette,
    Camera,
    BookOpen,
    Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const authorData = {
    name: "Haarleen Sethi",
    title: "Model, Commercial Artist & Author",
    subtitle: "Artistry in Motion, Canvas, and Verse",
    bio: "Haarleen Sethi is a multifaceted talent—a professional model, a commercial artist, and an author. From managing a family school business to stepping into the spotlight of modeling and painting, her debut poetry book marks her newest creative frontier.",
    longBio: "Haarleen’s life is a vibrant tapestry of different art forms. A graduate and a commercial artist by profession, she has always carried the soul of an artist. By day, she models for demand-driven projects and manages her family’s school business, balancing entrepreneurship with glamour. Yet, in her quiet moments, she has always been writing. Starting at a very early age, she penned her thoughts without realizing where the journey would lead. Today, stepping out with her very first solo poetry book, Haarleen brings the same passion to the page that she brings to the canvas and the camera lens.",
    location: "India",
    email: "", // Placeholder
    instagram: "", // Placeholder
    stats: {
        age: 35,
        role: "Model & Artist",
        education: "Graduate, Com. Art",
        status: "Active",
        business: "Education & Art",
        debut: "First Solo Book"
    },
    journey: {
        start: "I started my writing journey at a very early age, though at that time, I never thought it would lead me to this stage of publishing a book.",
        motivation: "At the time, no one specifically inspired me because I was unaware of my own writing skills. But my intuition guided me, and I simply didn't stop writing.",
        vision: "This is my soul's first book. People's reactions matter a lot to me. If readers resonate with my poetry and the way it is presented, it might just be the beginning of my next book. The rest is destiny.",
        message: "When you have talent and no one understands you, trust your intuition and work hard in silence. When the right time comes, the world will know you. Think big, find where your true talent lies, and never lose hope. Hurdles are just part of the journey. Keep trying until you succeed—this is the mantra of success."
    }
};

const HaarleenSethiAuthor = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, -100]);

    return (
        <div className="min-h-screen bg-ink-black text-parchment font-serif selection:bg-purple-500/30 selection:text-white overflow-x-hidden">
            <Helmet>
                <title>Haarleen Sethi | Inkfetish Author</title>
                <meta name="description" content="Model, Commercial Artist, and Author. Discover the creative world of Haarleen Sethi." />
                <meta property="og:title" content="Haarleen Sethi | Inkfetish" />
                <meta property="og:description" content="Artistry in Motion, Canvas, and Verse. Explore the journey of Haarleen Sethi." />
                <meta property="og:type" content="profile" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Haarleen Sethi | Inkfetish" />
            </Helmet>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-ink-black/80 backdrop-blur-md border-b border-white/5">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center border border-purple-500/20">
                            <Feather className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-parchment tracking-widest uppercase">Inkfetish</h1>
                            <p className="text-xs text-parchment/50">x Haarleen Sethi</p>
                        </div>
                    </div>
                    <div className="hidden md:flex gap-8 text-xs tracking-[0.2em] uppercase text-parchment/60">
                        <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
                        <a href="#journey" className="hover:text-purple-400 transition-colors">Journey</a>
                        <a href="#projects" className="hover:text-purple-400 transition-colors">Projects</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-30 pointer-events-none" />

                {/* Sleek platinum/purple ambient for fashion/art theme */}
                <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-900/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="space-y-8 text-center lg:text-left order-2 lg:order-1"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs text-purple-400 uppercase tracking-[0.2em] font-sans">
                            <Palette className="w-3 h-3" />
                            Model & Artist
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight">
                            Haar<span className="text-purple-400 italic font-normal font-display">leen</span>
                            <br /> Sethi
                        </h1>

                        <p className="text-xl text-parchment/70 font-light max-w-lg leading-relaxed mx-auto lg:mx-0">
                            {authorData.subtitle}
                        </p>

                        {/* Special Focus Badge */}
                        <div className="inline-flex items-center gap-3 p-3 bg-white/5 border border-purple-900/30 rounded-xl backdrop-blur-sm">
                            <div className="w-10 h-14 bg-gradient-to-br from-purple-900/40 to-pink-950/20 rounded-sm border border-purple-800/30 flex items-center justify-center flex-shrink-0">
                                <BookOpen className="w-5 h-5 text-purple-400/80" />
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-parchment/40 uppercase tracking-widest font-sans">Debut Release</p>
                                <p className="text-sm text-parchment font-serif font-semibold">First Solo Poetry Book</p>
                                <p className="text-xs text-purple-400/60 italic">From soul to paper</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 justify-center lg:justify-start pt-2">
                            <Button
                                onClick={() => toast.success("Feature coming soon!")}
                                className="bg-purple-600/80 text-white hover:bg-purple-500 font-sans tracking-wide px-8 py-6 text-lg rounded-sm backdrop-blur-sm"
                            >
                                Join Reader List
                            </Button>

                            <div className="flex gap-4 text-parchment/40">
                                <Instagram className="w-6 h-6 hover:text-purple-400 cursor-pointer transition-colors hover:scale-110 duration-300" />
                                <Mail className="w-6 h-6 hover:text-purple-400 cursor-pointer transition-colors hover:scale-110 duration-300" />
                                <Globe className="w-6 h-6 hover:text-purple-400 cursor-pointer transition-colors hover:scale-110 duration-300" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Author Image Frame */}
                    <motion.div
                        style={{ y: y1 }}
                        className="relative order-1 lg:order-2"
                    >
                        <div className="absolute inset-0 border border-purple-500/20 rounded-t-[100px] rounded-b-lg transform rotate-6 translate-x-4 scale-105" />
                        <div className="absolute inset-0 border border-white/5 rounded-t-[100px] rounded-b-lg transform -rotate-3 -translate-x-2 scale-105" />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2 }}
                            className="w-full max-w-[450px] mx-auto aspect-[3/4] bg-zinc-900 rounded-t-[100px] rounded-b-lg overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                        >
                            {/* Theme placeholder */}
                            <div className="w-full h-full bg-gradient-to-br from-zinc-800 via-purple-950/20 to-ink-black flex items-center justify-center relative">
                                <div className="text-center space-y-6 p-8 relative z-10">
                                    <div className="w-36 h-36 mx-auto rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                                        <Camera className="w-14 h-14 text-purple-400/60" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-parchment/30 text-sm font-sans tracking-[0.2em] uppercase">Haarleen Sethi</p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-radial-gradient from-purple-500/5 to-transparent opacity-50" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-transparent to-transparent opacity-60" />

                            {/* Floating Element */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 hidden sm:block"
                            >
                                <Sparkles className="w-6 h-6 text-purple-400 mb-2" />
                                <p className="text-xs text-parchment/60 uppercase tracking-wider">Work Hard</p>
                                <p className="text-sm text-white font-serif">In Silence</p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Quote */}
            <section className="py-24 bg-ink-900/50 border-y border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <Quote className="w-12 h-12 text-purple-500/20 mx-auto mb-8" />
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-light leading-relaxed max-w-4xl mx-auto mb-10 font-display"
                    >
                        "When you have talent and no one understands you, trust your intuition and work hard in silence.{" "}
                        <span className="text-purple-400/80 italic">When the right time comes, the world will know you."</span>
                    </motion.h2>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-[1px] w-12 bg-white/20" />
                        <p className="text-parchment/50 font-sans text-sm tracking-[0.2em] uppercase">Haarleen Sethi</p>
                        <div className="h-[1px] w-12 bg-white/20" />
                    </div>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="py-20 bg-ink-black/50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                            { label: "Age", value: "35", icon: Calendar },
                            { label: "Role", value: "Model & Artist", icon: Camera },
                            { label: "Education", value: "Commercial Art", icon: GraduationCap },
                            { label: "Business", value: "Education", icon: Building2 },
                            { label: "Passion", value: "Painting", icon: Palette },
                            { label: "Debut", value: "Poetry Book", icon: BookOpen }
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white/5 border border-white/5 rounded-xl p-4 text-center hover:bg-white/10 hover:border-purple-500/20 transition-all group"
                            >
                                <stat.icon className="w-5 h-5 text-purple-400/50 mx-auto mb-3 group-hover:text-purple-400 transition-colors" />
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
                                    <span className="w-12 h-[1px] bg-purple-500" />
                                    About Haarleen
                                </h2>
                                <p className="text-xl text-parchment/80 leading-relaxed font-light mb-6">
                                    {authorData.longBio}
                                </p>
                            </motion.div>

                            {/* Journey Timeline */}
                            <div id="journey" className="space-y-8">
                                <h3 className="text-2xl font-serif text-white">The Creative Journey</h3>

                                {[
                                    {
                                        title: "The Silent Writer",
                                        year: "Early Years",
                                        desc: "Started writing at a young age, guided purely by intuition and unaware that these private thoughts would one day become a book.",
                                        icon: PenTool
                                    },
                                    {
                                        title: "Commercial Artist",
                                        year: "Foundation",
                                        desc: "Graduated with a focus on Commercial Art, turning a lifelong passion for aesthetics into a formal profession and skill set.",
                                        icon: Palette
                                    },
                                    {
                                        title: "Modeling & Enterprise",
                                        year: "Present",
                                        desc: "Balancing the fast-paced world of professional modeling with the grounded responsibilities of running a family school business.",
                                        icon: Camera
                                    },
                                    {
                                        title: "The Debut Book",
                                        year: "New Horizon",
                                        desc: "Publishing her very first solo poetry book, bravely stepping out to share her soul and art with the world.",
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
                                            <div className="w-12 h-12 rounded-full border border-purple-500/30 bg-ink-900 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-ink-black transition-all">
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            {i !== 3 && <div className="w-[1px] h-full bg-white/10 my-2 group-hover:bg-purple-500/30 transition-colors" />}
                                        </div>
                                        <div className="pb-10">
                                            <span className="text-xs text-purple-400 uppercase tracking-widest">{item.year}</span>
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
                                    className="p-8 bg-zinc-900/40 rounded-2xl border border-white/5 backdrop-blur-sm relative overflow-hidden group hover:border-purple-500/30 transition-colors"
                                >
                                    <div className="absolute top-0 right-0 p-32 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                    <Eye className="w-8 h-8 text-purple-400 mb-6 relative z-10" />
                                    <h3 className="text-xl font-bold mb-4 relative z-10 font-serif">Vision & Destiny</h3>
                                    <p className="text-parchment/70 leading-relaxed relative z-10">{authorData.journey.vision}</p>
                                </motion.div>

                                {/* Motivation Card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="p-8 bg-zinc-900/40 rounded-2xl border border-white/5 backdrop-blur-sm relative overflow-hidden group hover:border-purple-500/30 transition-colors"
                                >
                                    <Heart className="w-8 h-8 text-purple-400 mb-6 relative z-10" />
                                    <h3 className="text-xl font-bold mb-4 relative z-10 font-serif">Intuition & Will</h3>
                                    <p className="text-parchment/70 leading-relaxed relative z-10">{authorData.journey.motivation}</p>
                                </motion.div>

                                {/* Current Projects Card */}
                                <div id="projects" className="p-8 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl border border-purple-500/20 relative overflow-hidden">
                                    <div className="flex items-start justify-between mb-6">
                                        <Briefcase className="w-8 h-8 text-purple-400" />
                                        <Badge className="bg-purple-500/80 text-white hover:bg-purple-500 border-none">Active Projects</Badge>
                                    </div>
                                    <h3 className="text-xl font-serif text-white mb-4">Current Work</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <Palette className="w-3 h-3 text-purple-400 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm text-parchment font-semibold">Fine Art Painting</p>
                                                <p className="text-xs text-parchment/50 italic">Commercial Art Project</p>
                                            </div>
                                        </div>
                                        <div className="h-[1px] bg-white/5" />
                                        <div className="flex items-start gap-3">
                                            <Camera className="w-3 h-3 text-purple-400/60 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm text-parchment/80">Professional Modeling</p>
                                                <p className="text-xs text-parchment/40 italic">Demand-driven Projects</p>
                                            </div>
                                        </div>
                                        <div className="h-[1px] bg-white/5" />
                                        <div className="flex items-start gap-3">
                                            <BookOpen className="w-3 h-3 text-purple-400/60 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm text-parchment/80">Debut Poetry Book</p>
                                                <p className="text-xs text-parchment/40 italic">Literature & Verse</p>
                                            </div>
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
                    <h2 className="text-3xl font-light mb-12 text-center">A Spectrum of Creativity</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "The Model",
                                desc: "Bringing grace, elegance, and dynamic presence to professional modeling projects and commercial shoots.",
                                icon: Camera
                            },
                            {
                                title: "The Artist",
                                desc: "Trained in Commercial Art, executing fine art painting projects and breathing visual life onto the canvas.",
                                icon: Palette
                            },
                            {
                                title: "The Author",
                                desc: "Channeling a lifetime of silent, intuitive writing into a debut solo poetry book that speaks from the soul.",
                                icon: BookOpen
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
                                    <item.icon className="w-6 h-6 text-purple-400" />
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
                <div className="absolute inset-0 bg-purple-500/5 blur-[100px] pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <Quote className="w-12 h-12 text-purple-500/20 mx-auto mb-8" />
                    <p className="text-2xl md:text-3xl font-light italic text-parchment/90 leading-relaxed mb-12 font-display">
                        "Think big and one day you will reach your goal. Everyone has some talent... keep doing it, don't leave the hope. Hurdles are just part of your journey. Keep trying until you succeed."
                    </p>
                    <div className="h-[1px] w-24 bg-purple-500/30 mx-auto mb-8" />
                    <div className="flex justify-center gap-8 text-xs tracking-widest uppercase text-parchment/40">
                        <span className="hover:text-purple-400 cursor-pointer transition-colors">Instagram</span>
                        <span className="hover:text-purple-400 cursor-pointer transition-colors">Email</span>
                        <span className="hover:text-purple-400 cursor-pointer transition-colors">Portfolio</span>
                    </div>
                    <p className="text-xs text-parchment/20 mt-8 tracking-widest">© {new Date().getFullYear()} Haarleen Sethi. All rights reserved.</p>
                </div>
            </section>
        </div>
    );
};

export default HaarleenSethiAuthor;
