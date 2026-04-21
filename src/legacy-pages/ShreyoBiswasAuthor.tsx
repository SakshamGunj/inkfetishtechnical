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
    Waves
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const authorData = {
    name: "Shreyo Biswas",
    bengaliName: "শ্রেয় বিশ্বাস",
    title: "Author & Forensic Science Student",
    subtitle: "Exploring the intersections of science and literature | Versatile and Adaptive",
    bio: "Shreyo Biswas is a forensic science student and an emerging author with a deep-rooted passion for writing. Born and raised in Kolkata, his journey began in the classrooms of his youth and flourished under the mentorship of Shri Tapan Gupta.",
    longBio: "Hailing from a culturally rich family, Shreyo's knack for writing surfaced as early as class 2. However, his true foundation was built around class 8, where he honed his skills in English and Bengali writing under the guidance of his teacher, Shri Tapan Gupta. Today, as a forensic science student, he balances the precision of the lab with the expressive power of literature, seeking to stay versatile and adapt to life's challenges.",
    location: "Kolkata, India",
    email: "contact@shreyobiswas.com", // Placeholder
    instagram: "shreyo_biswas", // Placeholder
    stats: {
        age: 19,
        role: "Forensic Student / Author",
        education: "Forensic Science",
        release: "May 9, 2026",
        status: "Rising Author",
        genre: "Contemporary Literature"
    },
    journey: {
        start: "The journey began in class 2, sparked by a natural knack for storytelling within a cultural family setting.",
        motivation: "To express myself amongst others and to help myself to express to others through the medium of literature.",
        vision: "To excel as a forensic scientist in the lab while continuing to refine my voice as an author.",
        message: "Empty your mind, be formless. Shapeless, like water. If you put water into a cup, it becomes the cup. You put water into a bottle and it becomes the bottle. You put it in a teapot, it becomes the teapot. Now, water can flow or it can crash. Be water, my friend."
    },
    images: {
        hero: "https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1776802129/WhatsApp_Image_2026-04-22_at_1.37.09_AM_jk1voz.jpg",
        secondary: "https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1776802129/WhatsApp_Image_2026-04-22_at_1.37.09_AM_1_v2i3bu.jpg",
        tertiary: "https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1776802129/WhatsApp_Image_2026-04-22_at_1.37.09_AM_2_d7vvc7.jpg"
    }
};

const ShreyoBiswasAuthor = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, -100]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <div className="min-h-screen bg-ink-black text-parchment font-serif selection:bg-gold selection:text-ink-black overflow-x-hidden">
            <Helmet>
                <title>Shreyo Biswas | Inkfetish Author</title>
                <meta name="description" content="Author and Forensic Science Student. Discover the world of Shreyo Biswas, where science meets literature." />
                <meta property="og:title" content="Shreyo Biswas | Inkfetish" />
                <meta property="og:description" content="Versatile and Adaptive. Explore the writing and journey of Shreyo Biswas." />
                <meta property="og:type" content="profile" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Shreyo Biswas | Inkfetish" />
            </Helmet>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-ink-black/80 backdrop-blur-md border-b border-white/5">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center border border-gold/20">
                            <Waves className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-parchment tracking-widest uppercase">Inkfetish</h1>
                            <p className="text-xs text-parchment/50">x Shreyo Biswas</p>
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
                <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

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
                            Shreyo <br />
                            <span className="text-gold italic font-normal font-display">Biswas</span>
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
                                src={authorData.images.hero} 
                                alt={authorData.name} 
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-transparent to-transparent opacity-60" />

                            {/* Floating Element */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 hidden sm:block"
                            >
                                <Feather className="w-6 h-6 text-gold mb-2" />
                                <p className="text-xs text-parchment/60 uppercase tracking-wider">Forensic Student</p>
                                <p className="text-sm text-white font-serif">Future Lab Professional</p>
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
                        "Be formless, <span className="text-gold/80 italic">be like water.</span>"
                    </motion.h2>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-[1px] w-12 bg-white/20" />
                        <p className="text-parchment/50 font-sans text-sm tracking-[0.2em] uppercase">Bruce Lee</p>
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
                            { label: "Role", value: "Student/Author", icon: Briefcase },
                            { label: "Education", value: "Forensic Science", icon: GraduationCap },
                            { label: "Location", value: "Kolkata", icon: MapPin },
                            { label: "Genre", value: "Contemporary", icon: Scroll },
                            { label: "Status", value: "Rising", icon: PenTool }
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
                                <div className="p-6 bg-gold/5 border-l-2 border-gold rounded-r-xl italic text-parchment/70 mb-6">
                                    {`শ্রেয় বিশ্বাস, বর্তমানে একজন ফরেন্সিক সাইন্স স্টুডেন্ট। কলকাতায় জন্ম এবং বেড়ে ওঠার সময়, তার নিজের শহরের অনেক সাংস্কৃতিক দিকের সাথে চেনা পরিচিত হয়। পরে শিক্ষক শ্রী তপন গপ্তর তত্ত্বাবধানে ইংরেজি এবং বাংলা লেখার বিভিন্ন পদ্ধতি শেখে। এবং নভেম্বর ২০২৫ এ প্রকাশিত হয় তার প্রথম ইংরেজি বই: "words of mind"।`}
                                </div>
                            </motion.div>

                            <div className="space-y-8">
                                <h3 className="text-2xl font-serif text-white">The Path Traveled</h3>
                                {[
                                    { title: "Early Spark", year: "Class 2", desc: "Started writing at a very young age, nurtured by a cultural family background.", icon: Sparkles },
                                    { title: "The Foundation", year: "Class 8", desc: "Developed a strong base for writing under the guidance of Shri Tapan Gupta.", icon: BookOpen },
                                    { title: "Current Pursuit", year: "Present", desc: "Studying Forensic Science while preparing for his next literary release.", icon: GraduationCap }
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

                        <div className="lg:col-span-5 space-y-6">
                            <div className="sticky top-24 space-y-6">
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

                                <div className="p-8 bg-gradient-to-br from-gold/10 to-transparent rounded-2xl border border-gold/20 relative overflow-hidden">
                                    <div className="flex items-start justify-between mb-6">
                                        <BookOpen className="w-8 h-8 text-gold" />
                                        <Badge className="bg-gold text-ink-black hover:bg-gold/90">Upcoming Release</Badge>
                                    </div>
                                    <h3 className="text-2xl font-serif text-white mb-2">বাস্তব কথা</h3>
                                    <p className="text-parchment/60 text-sm mb-6">Expected release on May 9th, 2026. A journey into the depths of thought and reality.</p>
                                    <Button className="w-full bg-transparent border border-gold/30 text-gold hover:bg-gold hover:text-ink-black transition-all">
                                        Notify Me
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visual Narrative Section */}
            <section className="py-24 bg-ink-black">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 group"
                        >
                            <img 
                                src={authorData.images.tertiary} 
                                alt="Shreyo Biswas Philosophy" 
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-ink-black/80 to-transparent flex flex-col justify-end p-8">
                                <p className="text-gold text-xs uppercase tracking-widest mb-2">The Philosophy</p>
                                <h3 className="text-2xl font-serif text-white">Versatility & Adaptation</h3>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl font-light leading-tight">
                                Applying Scientific Precision to <span className="text-gold italic font-display">Creative Expression.</span>
                            </h2>
                            <p className="text-parchment/60 leading-relaxed">
                                Shreyo's background in Forensic Science provides him with a unique lens—one of observation, analysis, and meticulous detail. He brings this same level of scrutiny and depth to his literary work, creating narratives that are as precise as they are profound.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                                    <h4 className="text-gold font-bold mb-1">Observation</h4>
                                    <p className="text-xs text-parchment/40">Seeing what others overlook.</p>
                                </div>
                                <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                                    <h4 className="text-gold font-bold mb-1">Analysis</h4>
                                    <p className="text-xs text-parchment/40">Deconstructing complex emotions.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Behind the Ink */}
            <section className="py-24 bg-ink-charcoal/30 border-t border-white/5">
                <div className="container mx-auto px-6 max-w-6xl">
                    <h2 className="text-3xl font-light mb-12 text-center">Behind The Ink</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "The Philosophy", desc: "Stay versatile and adapt to solve difficult situations in life.", icon: Waves, img: authorData.images.hero },
                            { title: "The Mission", desc: "To express the self and help others find their own expression through literature.", icon: Heart, img: authorData.images.secondary },
                            { title: "The Lab", desc: "Applying the precision of forensic science to the craft of writing.", icon: Briefcase, img: authorData.images.tertiary }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center p-8 border border-white/5 rounded-2xl hover:bg-white/5 transition-colors group overflow-hidden relative"
                            >
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                                    <img src={item.img} className="w-full h-full object-cover" />
                                </div>
                                <div className="w-16 h-16 mx-auto bg-ink-black rounded-full flex items-center justify-center border border-white/10 mb-6 shadow-lg relative z-10">
                                    <item.icon className="w-6 h-6 text-gold" />
                                </div>
                                <h3 className="text-xl font-serif text-white mb-3 relative z-10">{item.title}</h3>
                                <p className="text-parchment/60 leading-relaxed relative z-10">{item.desc}</p>
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
                    <p className="text-xl md:text-2xl font-light italic text-parchment/90 leading-relaxed mb-12 font-display">
                        "{authorData.journey.message}"
                    </p>
                    <div className="h-[1px] w-24 bg-gold/30 mx-auto mb-8" />
                    <div className="flex justify-center gap-8 text-xs tracking-widest uppercase text-parchment/40">
                        <span className="hover:text-gold cursor-pointer transition-colors">Instagram</span>
                        <span className="hover:text-gold cursor-pointer transition-colors">Email</span>
                    </div>
                    <p className="text-xs text-parchment/20 mt-8 tracking-widest">© {new Date().getFullYear()} Shreyo Biswas. All rights reserved.</p>
                </div>
            </section>
        </div>
    );
};

export default ShreyoBiswasAuthor;
