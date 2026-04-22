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
    Home,
    Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const authorData = {
    name: "Meghana Sheth",
    displayName: "Veiled Verses",
    title: "Poet & Management Student",
    subtitle: "Giving Voice to the Silence | The Ink That Didn't Reach You",
    bio: "Meghana Sheth, known in the literary world as 'Veiled Verses', is a 20-year-old poet and management student who translates the weight of silence into the lightness of verse. Her journey is not one of academic pursuit, but of lived emotions—a rhythmic exploration of the words that were once too heavy to speak.",
    longBio: "Meghana's writing didn't begin with a decision; it began with a need. In the quiet moments of life where feelings lacked a name and belonging felt out of reach, she found refuge in the pen. Currently pursuing her BBA, she balances the structured world of management with the boundless honesty of poetry. For Meghana, every poem is a safe space—a sanctuary where unspoken words finally find their home.",
    location: "India",
    email: "contact@veiledverses.com", // Placeholder
    instagram: "https://www.instagram.com/veiled_verses_0?igsh=MWFicHphcDUyYTA2ZA%3D%3D&utm_source=qr",
    stats: {
        age: 20,
        role: "Student of Management (BBA)",
        education: "Lived Emotions & BBA",
        release: "Upcoming 2026",
        status: "Rising Poet",
        genre: "Contemporary Poetry & Spoken Word"
    },
    journey: {
        start: "My journey began with silence. There were things I couldn't say, feelings I didn't know how to express. Writing became my way of letting those unspoken words exist.",
        motivation: "Inspired by everything I couldn't say out loud—the quiet battles, the need to belong, and the slow journey of finding myself.",
        vision: "To reach the people who feel like they don't belong anywhere. I want to explore stories of healing, identity, and self-love through a series of works.",
        message: "I want to create a space where people feel understood without having to explain themselves. A place where my words wrap around them like home—sometimes even more than home ever did."
    },
    currentWork: {
        title: "The Ink That Didn't Reach You",
        desc: "A debut collection shaping a narrative from a lost voice to self-discovery, exploring the depths of healing and identity.",
    }
};

const MeghanaShethAuthor = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, -100]);

    return (
        <div className="min-h-screen bg-ink-black text-parchment font-serif selection:bg-gold selection:text-ink-black overflow-x-hidden">
            <Helmet>
                <title>Veiled Verses (Meghana Sheth) | Inkfetish Author</title>
                <meta name="description" content="Discover the poetry of Veiled Verses. A sanctuary of words where silence finds its home and the unheard are seen." />
                <meta property="og:title" content="Veiled Verses | Inkfetish Author Portfolio" />
                <meta property="og:description" content="Giving voice to silence. Explore the journey and poetry of Meghana Sheth." />
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
                            <p className="text-xs text-parchment/50">x Veiled Verses</p>
                        </div>
                    </div>
                    <div className="hidden md:flex gap-8 text-xs tracking-[0.2em] uppercase text-parchment/60">
                        <a href="#about" className="hover:text-gold transition-colors">The Writer</a>
                        <a href="#journey" className="hover:text-gold transition-colors">Philosophy</a>
                        <a href="#work" className="hover:text-gold transition-colors">The Ink</a>
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
                            <span>Voice of the Unheard</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight">
                            Veiled <br />
                            <span className="text-gold italic font-normal font-display">Verses</span>
                        </h1>

                        <p className="text-xl text-parchment/70 font-light max-w-lg leading-relaxed mx-auto lg:mx-0">
                            {authorData.subtitle}
                        </p>

                        <div className="flex flex-col gap-6 pt-4 justify-center lg:justify-start">
                            <div className="flex items-center gap-6">
                                <Button
                                    onClick={() => window.open(authorData.instagram, "_blank")}
                                    className="bg-gold text-ink-black hover:bg-gold/90 font-sans tracking-wide px-8 py-6 text-lg rounded-sm"
                                >
                                    Follow On Instagram
                                </Button>

                                <div className="flex gap-4 text-parchment/40">
                                    <Instagram className="w-6 h-6 hover:text-gold cursor-pointer transition-colors hover:scale-110 duration-300" onClick={() => window.open(authorData.instagram, "_blank")} />
                                    <Mail className="w-6 h-6 hover:text-gold cursor-pointer transition-colors hover:scale-110 duration-300" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Author Typographic Frame (No Image) */}
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
                            className="w-full max-w-[450px] mx-auto aspect-[3/4] bg-zinc-900 rounded-t-[100px] rounded-b-lg overflow-hidden relative group shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center border border-white/5"
                        >
                            {/* Artistic Typographic Avatar */}
                            <div className="text-center p-12 relative z-10">
                                <span className="text-[12rem] font-display italic text-gold/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">VV</span>
                                <h2 className="text-4xl md:text-6xl font-light text-white mb-4 relative z-10 tracking-widest uppercase">
                                    {authorData.name.split(' ')[0]} <br />
                                    <span className="text-gold italic font-display lowercase">{authorData.name.split(' ')[1]}</span>
                                </h2>
                                <div className="w-24 h-[1px] bg-gold/50 mx-auto mb-6 relative z-10" />
                                <p className="text-parchment/40 text-xs tracking-[0.3em] uppercase relative z-10">A Sanctuary of Words</p>
                            </div>
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-transparent to-transparent opacity-60" />

                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 hidden sm:block"
                            >
                                <Home className="w-6 h-6 text-gold mb-2" />
                                <p className="text-xs text-parchment/60 uppercase tracking-wider">Unspoken Feelings</p>
                                <p className="text-sm text-white font-serif">Finally Finding Home</p>
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
                        "{authorData.journey.message}"
                    </motion.h2>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-[1px] w-12 bg-white/20" />
                        <p className="text-parchment/50 font-sans text-sm tracking-[0.2em] uppercase">Veiled Verses</p>
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
                            { label: "Role", value: "Management", icon: Briefcase },
                            { label: "Education", value: "BBA", icon: GraduationCap },
                            { label: "Origin", value: "India", icon: MapPin },
                            { label: "Release", value: "Upcoming", icon: Clock },
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
                                    The Silenced Architect
                                </h2>
                                <p className="text-xl text-parchment/80 leading-relaxed font-light mb-6">
                                    {authorData.longBio}
                                </p>
                                <p className="text-parchment/60 leading-relaxed italic border-l-2 border-gold/30 pl-6">
                                    "{authorData.journey.start}"
                                </p>
                            </motion.div>

                            {/* Achievements/Context */}
                            <div className="grid sm:grid-cols-2 gap-8">
                                <div className="p-6 bg-white/5 rounded-xl border border-white/5 group hover:border-gold/20 transition-colors">
                                    <Search className="w-6 h-6 text-gold mb-4" />
                                    <h4 className="text-lg font-bold mb-2">Self-Discovery</h4>
                                    <p className="text-sm text-parchment/60">Using poetry to map the quiet battles and the need to belong, finding identity in the rhythmic flow of ink.</p>
                                </div>
                                <div className="p-6 bg-white/5 rounded-xl border border-white/5 group hover:border-gold/20 transition-colors">
                                    <Briefcase className="w-6 h-6 text-gold mb-4" />
                                    <h4 className="text-lg font-bold mb-2">Management Mindset</h4>
                                    <p className="text-sm text-parchment/60">Currently pursuing a BBA, bringing a structured perspective to the boundless world of poetic expression.</p>
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
            <section id="work" className="py-32 bg-ink-900/30 border-t border-white/5 relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 text-gold text-xs tracking-widest uppercase mb-6 border border-gold/20">
                                <BookOpen className="w-3 h-3" />
                                <span>Upcoming Release</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-light mb-8 font-display italic">
                                {authorData.currentWork.title}
                            </h2>
                            <div className="space-y-6 text-parchment/70 leading-relaxed">
                                <p className="text-lg text-parchment font-light">
                                    "Shaping a narrative from a lost voice to self-discovery."
                                </p>
                                <p>
                                    Meghana's debut collection is a mapping of the invisible connections that bind us through shared pain and the quiet triumph of being understood. It explores healing, identity, and the radical act of self-love.
                                </p>
                                <div className="pt-4 flex flex-col gap-3">
                                    <div className="flex items-center gap-3 text-gold">
                                        <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                                        <span className="text-sm uppercase tracking-widest font-sans font-bold">Release Status: Final Manuscript</span>
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
                                        {authorData.currentWork.title}
                                    </h3>
                                    <div className="space-y-2">
                                        <div className="w-8 h-[1px] bg-gold/30 mx-auto" />
                                        <p className="text-xs tracking-widest uppercase text-parchment font-bold">Veiled Verses</p>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Message */}
            <section className="py-32 text-center px-6 relative overflow-hidden bg-gradient-to-b from-ink-black to-zinc-900/50">
                <div className="absolute inset-0 bg-gold/5 blur-[100px] pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <Quote className="w-12 h-12 text-gold/20 mx-auto mb-8" />
                    <p className="text-2xl md:text-4xl font-light italic text-parchment/90 leading-relaxed mb-12 font-display">
                        "Your unspoken words are valid. Let them be seen."
                    </p>
                    <div className="h-[1px] w-24 bg-gold/30 mx-auto mb-8" />
                    <div className="flex justify-center gap-8 text-xs tracking-widest uppercase text-parchment/40">
                        <span className="hover:text-gold cursor-pointer transition-colors" onClick={() => window.open(authorData.instagram, "_blank")}>Instagram</span>
                        <span className="hover:text-gold cursor-pointer transition-colors">Email</span>
                    </div>
                    <p className="text-xs text-parchment/20 mt-8 tracking-widest">© {new Date().getFullYear()} Meghana Sheth. All rights reserved.</p>
                </div>
            </section>
        </div>
    );
};

export default MeghanaShethAuthor;
