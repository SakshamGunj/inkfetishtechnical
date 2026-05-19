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
    GraduationCap,
    Clock,
    Scroll,
    TrendingUp,
    Shield,
    Sparkle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const authorData = {
    name: "Mahika Mukund",
    fullName: "Mahika Mukund",
    title: "Contemporary Author & Poet",
    subtitle: "Weaving Shadows of Time, Secrets of the Heart, and Intertwined Destinies",
    bio: "Mahika Mukund is a 22-year-old graduated writer and poet who transforms deep romantic mysteries and emotional echoes into compelling contemporary literature. Inspired by the legends of poetry, she crafts narratives that explore the timeless dance of love, secrets, and shadows.",
    longBio: "Mahika's creative journey began in the halls of her 12th-grade year. Captivated by the timeless verses of legendary poets like William Shakespeare, Sarojini Naidu, and Kamala Das online, she felt a powerful calling to put her own feelings into words. Today, as a graduate, she channels her analytical clarity and deep emotional intelligence into full-length prose. Her writing bridges the classical grandeur of her inspirations with the raw, relatable tensions of modern romance, seeking to craft stories that resonate with respect, recognition, and eternal love.",
    location: "India",
    email: "mahikamukund09@gmail.com",
    stats: {
        age: 22,
        role: "Author / Poet",
        education: "Graduate",
        release: "Coming Soon",
        status: "Emerging Author",
        genre: "Contemporary Romance & Mystery"
    },
    journey: {
        start: "Began in 12th grade after being captivated by classical poetry online.",
        motivation: "Inspired by William Shakespeare, Sarojini Naidu, and Kamala Das to write verses that speak to the soul.",
        vision: "To achieve deep respect, global recognition, and heartfelt love through her published works.",
        message: "To everyone reading my words—thank you for being here. If even one line touches your heart, it means everything to me. 💫"
    },
    book: {
        title: "Intertwined Destinies",
        subtitle: "Love, Secrets, and Shadows Through Time",
        intro: "A gripping tale of connection, hidden mysteries, and the invisible threads that tie hearts together across different lifetimes. In this upcoming romance novel, Mahika weaves a intricate web of love, secrets, and shadows that defy the boundaries of time.",
        expected: "Coming Soon"
    },
    images: {
        hero: "https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1779219915/WhatsApp_Image_2026-05-04_at_7.09.29_PM_o6pio8.jpg"
    }
};

const MahikaMukundAuthor = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, -100]);
    
    return (
        <div className="min-h-screen bg-ink-black text-parchment font-serif selection:bg-gold selection:text-ink-black overflow-x-hidden">
            <Helmet>
                <title>Mahika Mukund | Inkfetish Author</title>
                <meta name="description" content="Discover the world of Mahika Mukund, contemporary author and poet. Explore her upcoming book Intertwined Destinies." />
                <meta property="og:title" content="Mahika Mukund | Inkfetish" />
                <meta property="og:description" content="Weaving Shadows of Time, Secrets of the Heart, and Intertwined Destinies." />
                <meta property="og:type" content="profile" />
                <meta name="twitter:card" content="summary_large_image" />
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
                            <p className="text-xs text-parchment/50">x Mahika Mukund</p>
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
                <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none" />
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
                            <span>Emerging Author status: Active</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight">
                            Mahika <br />
                            <span className="text-gold italic font-normal font-display">Mukund</span>
                        </h1>

                        <p className="text-xl text-parchment/70 font-light max-w-lg leading-relaxed mx-auto lg:mx-0">
                            {authorData.subtitle}
                        </p>

                        <div className="flex flex-col gap-6 pt-4 justify-center lg:justify-start">
                            <div className="flex items-center gap-6">
                                <Button
                                    onClick={() => toast.success("Intertwined Destinies waitlist joined!")}
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
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-transparent to-transparent opacity-60" />

                            {/* Floating Element */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 hidden sm:block z-10"
                            >
                                <Sparkles className="w-6 h-6 text-gold mb-2" />
                                <p className="text-xs text-parchment/60 uppercase tracking-wider">Destiny & Secrets</p>
                                <p className="text-sm text-white font-serif">Poetic Voice</p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Quote */}
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
                        "To everyone reading my words—thank you for being here. <br />
                        <span className="text-gold/80 italic">If even one line touches your heart, it means everything to me."</span>
                    </motion.h2>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-[1px] w-12 bg-white/20" />
                        <p className="text-parchment/50 font-sans text-sm tracking-[0.2em] uppercase">Mahika Mukund</p>
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
                            { label: "Role", value: authorData.stats.role, icon: PenTool },
                            { label: "Education", value: authorData.stats.education, icon: GraduationCap },
                            { label: "Location", value: authorData.location, icon: MapPin },
                            { label: "Genre", value: "Romance & Shadows", icon: Scroll },
                            { label: "Status", value: authorData.stats.status, icon: TrendingUp }
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
                                    "I started my writing journey in 12th grade, seeing great poems online from William Shakespeare, Sarojini Naidu, and Kamala Das. It inspired me to realize that I also have words to give the world."
                                </div>
                            </motion.div>

                            <div className="space-y-8">
                                <h3 className="text-2xl font-serif text-white">The Path Traveled</h3>
                                {[
                                    { title: "Spark of Poetry", year: "12th Grade", desc: "Discovered master poets online, triggering a strong desire to create and express emotions through written verses.", icon: Sparkle },
                                    { title: "Academic & Personal Growth", year: "Graduation", desc: "Evolved her voice during university years, graduating with deep analytical and literary focus.", icon: GraduationCap },
                                    { title: "Upcoming Debut Novel", year: "Present Day", desc: "Drafting her ambitious novel 'Intertwined Destinies' to bridge modern romantic thrillers with classical grandeur.", icon: BookOpen }
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
                                    <h3 className="text-xl font-bold mb-4 relative z-10 font-serif">Future Vision</h3>
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
                                    <h3 className="text-xl font-bold mb-4 relative z-10 font-serif">Literary Inspiration</h3>
                                    <p className="text-parchment/70 leading-relaxed relative z-10">{authorData.journey.motivation}</p>
                                </motion.div>

                                <div className="p-8 bg-gradient-to-br from-gold/10 to-transparent rounded-2xl border border-gold/20 relative overflow-hidden">
                                    <div className="flex items-start justify-between mb-6">
                                        <BookOpen className="w-8 h-8 text-gold" />
                                        <Badge className="bg-gold text-ink-black hover:bg-gold/90">Upcoming Release</Badge>
                                    </div>
                                    <h3 className="text-2xl font-serif text-white mb-2">Intertwined Destinies</h3>
                                    <p className="text-parchment/60 text-sm mb-6">A gripping journey where love, secrets, and shadows cross over borders of time and lifetimes.</p>
                                    <Button 
                                        onClick={() => toast.success("Intertwined Destinies waitlist joined!")}
                                        className="w-full bg-transparent border border-gold/30 text-gold hover:bg-gold hover:text-ink-black transition-all"
                                    >
                                        Pre-Order Interest
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Upcoming Book Spotlight */}
            <section id="book" className="py-32 bg-ink-900/30 border-t border-white/5 relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 text-gold text-xs tracking-widest uppercase mb-6 border border-gold/20">
                                <BookOpen className="w-3 h-3" />
                                <span>Upcoming Release</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-light mb-4 font-display">
                                {authorData.book.title}
                            </h2>
                            <p className="text-lg text-gold font-sans uppercase tracking-[0.1em] font-bold mb-8">
                                {authorData.book.subtitle}
                            </p>
                            <div className="space-y-6 text-parchment/70 leading-relaxed">
                                <p className="text-lg text-parchment font-light">
                                    "A timeless tale of connections, hidden mysteries, and the invisible threads that tie hearts together across the ages."
                                </p>
                                <p>
                                    Through this highly anticipated work, Mahika Mukund details a story where destinies align and collide, exploring the deepest chambers of love and shadows. It is written for readers who seek elegant prose, profound characters, and a mystery that keeps you turning pages through the night.
                                </p>
                                <div className="pt-4 flex flex-col gap-3">
                                    <div className="flex items-center gap-3 text-gold">
                                        <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                                        <span className="text-sm uppercase tracking-widest font-sans font-bold">Status: Writing in Progress</span>
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
                                className="w-64 h-96 bg-gradient-to-br from-zinc-800 to-zinc-950 rounded-sm shadow-[20px_20px_60px_rgba(0,0,0,0.8)] border border-white/10 relative group overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-black" />
                                <div className="absolute inset-0 flex flex-col justify-between p-8 text-center">
                                    <div className="space-y-2">
                                        <p className="text-[10px] tracking-[0.3em] uppercase text-gold">Inkfetish Publication</p>
                                        <div className="w-8 h-[1px] bg-gold/30 mx-auto" />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-3xl font-display italic text-white leading-tight">
                                            Intertwined Destinies
                                        </h3>
                                        <p className="text-[10px] tracking-widest text-parchment/50 uppercase font-sans">Love, Secrets, & Shadows</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="w-8 h-[1px] bg-gold/30 mx-auto" />
                                        <p className="text-xs tracking-widest uppercase text-parchment font-bold">Mahika Mukund</p>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        </div>
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
                    <p className="text-xs text-parchment/20 mt-8 tracking-widest">© {new Date().getFullYear()} {authorData.fullName}. All rights reserved.</p>
                </div>
            </section>
        </div>
    );
};

export default MahikaMukundAuthor;
