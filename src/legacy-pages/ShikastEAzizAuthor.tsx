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
    Scale,
    Gavel
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const authorData = {
    name: "Abdul Aziz Imran",
    displayName: "Shikast-e-Aziz",
    title: "Poet & Legal Mind",
    subtitle: "Inking the Trapped Emotions | Carrying the Legacy of Verse",
    bio: "Abdul Aziz Imran, writing under the evocative pen name 'Shikast-e-Aziz', is a 24-year-old law student whose literary roots run deep. A science graduate from Saudi Arabia now navigating the corridors of justice, he finds his true liberation in the rhythmic dance of poetry—a craft inherited and nurtured by the profound influence of his father.",
    longBio: "Aziz's journey into the world of words began at the tender age of 13, ignited by the poetic spirit of his father. Today, they share a rare bond, exchanging verses that bridge generations. Having excelled in science with a 95.68% from Saudi Arabia, he is now channeling that analytical precision into Law, while his heart remains anchored in the emotional depths of Urdu and Hindi literature. For Aziz, writing is more than a hobby; it's a mission to liberate the emotions that dwell within, ensuring that history remembers the voices that refused to be silent.",
    location: "India / Saudi Arabia",
    email: "contact@shikasteaziz.com", // Placeholder
    instagram: "shikasteaziz", // Placeholder
    stats: {
        age: 24,
        role: "Law Student / Poet",
        education: "Science Graduate (95.68%)",
        release: "Upcoming 2026",
        status: "Active Voice",
        genre: "Ghazals & Contemporary Poetry"
    },
    journey: {
        start: "I started when I was 13 years old, inspired by my father who is also a poet. Today, we share our own poetries with each other, keeping the flame of our heritage alive.",
        motivation: "My Dad. He taught me that poetry isn't just about rhyming words; it's about capturing the soul.",
        vision: "I aspire to be a famous and published author, leaving a mark on the literary history of my time.",
        message: "Pick the pen and write the emotions that trapped inside you. Who knows? Maybe one day you'll be remembered as a poet, writer, or author in this damn History."
    },
    currentWork: {
        title: "The Coward's Silhouette",
        desc: "Currently crafting a poignant exploration of cowardice and the human spirit's struggle against fear.",
    },
    images: {
        hero: "https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1776839099/WhatsApp_Image_2026-03-31_at_4.27.13_PM_wfrxzd.jpg",
        secondary: "https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1776839099/WhatsApp_Image_2026-03-31_at_4.27.15_PM_r2alzn.jpg",
        tertiary: "https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto/f_auto/v1776839099/WhatsApp_Image_2026-03-31_at_4.27.16_PM_mnph2j.jpg"
    }
};

const ShikastEAzizAuthor = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, -100]);
    const y2 = useTransform(scrollY, [0, 500], [0, -50]);

    return (
        <div className="min-h-screen bg-ink-black text-parchment font-serif selection:bg-gold selection:text-ink-black overflow-x-hidden">
            <Helmet>
                <title>Shikast-e-Aziz (Abdul Aziz Imran) | Inkfetish Author</title>
                <meta name="description" content="Explore the poetic world of Shikast-e-Aziz. A legal mind carrying a legacy of verse, inking trapped emotions into history." />
                <meta property="og:title" content="Shikast-e-Aziz | Inkfetish Author Portfolio" />
                <meta property="og:description" content="Poet, Law student, and Seeker. Discover the journey of Abdul Aziz Imran." />
                <meta property="og:image" content={authorData.images.hero} />
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
                            <p className="text-xs text-parchment/50">x Shikast-e-Aziz</p>
                        </div>
                    </div>
                    <div className="hidden md:flex gap-8 text-xs tracking-[0.2em] uppercase text-parchment/60">
                        <a href="#about" className="hover:text-gold transition-colors">Dossier</a>
                        <a href="#journey" className="hover:text-gold transition-colors">The Spark</a>
                        <a href="#work" className="hover:text-gold transition-colors">Manifesto</a>
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs tracking-widest uppercase">
                            <Star className="w-3 h-3 animate-pulse" />
                            <span>Legacy in the Making</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight">
                            {authorData.displayName} <br />
                            <span className="text-gold italic font-normal font-display">Shikast-e-Aziz</span>
                        </h1>

                        <p className="text-xl text-parchment/70 font-light max-w-lg leading-relaxed mx-auto lg:mx-0">
                            {authorData.subtitle}
                        </p>

                        <div className="flex flex-col gap-6 pt-4 justify-center lg:justify-start">
                            <div className="flex items-center gap-6">
                                <Button
                                    onClick={() => toast.success("Connected to Author's feed!")}
                                    className="bg-gold text-ink-black hover:bg-gold/90 font-sans tracking-wide px-8 py-6 text-lg rounded-sm"
                                >
                                    Follow The Verse
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
                                alt={authorData.displayName}
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-transparent to-transparent opacity-60" />

                            {/* Floating Element */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 hidden sm:block"
                            >
                                <Gavel className="w-6 h-6 text-gold mb-2" />
                                <p className="text-xs text-parchment/60 uppercase tracking-wider">Legal Mind</p>
                                <p className="text-sm text-white font-serif">Poetic Soul</p>
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
                        "{authorData.journey.message}"
                    </motion.h2>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-[1px] w-12 bg-white/20" />
                        <p className="text-parchment/50 font-sans text-sm tracking-[0.2em] uppercase">{authorData.displayName}</p>
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
                            { label: "Origin", value: "Saudi Arab", icon: MapPin },
                            { label: "Education", value: "Law Student", icon: GraduationCap },
                            { label: "Role", value: "Jurisprudent", icon: Scale },
                            { label: "Genre", value: "Verse", icon: Scroll },
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
                                    The Dossier
                                </h2>
                                <p className="text-xl text-parchment/80 leading-relaxed font-light mb-6">
                                    {authorData.longBio}
                                </p>
                                <p className="text-parchment/60 leading-relaxed">
                                    His education in the sciences and now in the law provides a unique lens through which he views the human experience—combining empirical truth with the search for justice and the beauty of poetic expression.
                                </p>
                            </motion.div>

                            {/* Journey Timeline */}
                            <div className="space-y-8" id="journey">
                                <h3 className="text-2xl font-serif text-white">The Descent into Verse</h3>

                                {[
                                    { title: "The Inheritance", year: "Age 13", desc: "Started writing, heavily influenced by his father, a fellow poet and lifelong inspiration.", icon: Sparkles },
                                    { title: "The Saudi Years", year: "Graduation", desc: "Excelled in Science with 95.68%, proving that logic and art can coexist.", icon: BookOpen },
                                    { title: "The Legal Horizon", year: "Present Day", desc: "Navigating the complexities of Law while preparing for his first major publication.", icon: Scale }
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
                                    <h3 className="text-xl font-bold mb-4 relative z-10 font-serif">Inspiration</h3>
                                    <p className="text-parchment/70 leading-relaxed relative z-10">{authorData.journey.motivation}</p>
                                </motion.div>

                                {/* Multi-Image Gallery */}
                                <div className="grid grid-cols-2 gap-4">
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        className="aspect-square rounded-xl overflow-hidden border border-white/10"
                                    >
                                        <img src={authorData.images.secondary} className="w-full h-full object-cover" alt="Perspective" />
                                    </motion.div>
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.1 }}
                                        className="aspect-square rounded-xl overflow-hidden border border-white/10"
                                    >
                                        <img src={authorData.images.tertiary} className="w-full h-full object-cover" alt="Perspective" />
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Current Work Section */}
            <section id="work" className="py-24 bg-ink-charcoal/30 border-t border-white/5 relative">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="bg-zinc-900/50 p-12 rounded-3xl border border-gold/20 backdrop-blur-md relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-48 bg-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                            <div>
                                <h2 className="text-3xl font-light mb-6 flex items-center gap-4 text-white">
                                    <PenTool className="w-6 h-6 text-gold" />
                                    In The Works
                                </h2>
                                <h3 className="text-4xl font-display italic text-gold mb-6">{authorData.currentWork.title}</h3>
                                <p className="text-xl text-parchment/70 leading-relaxed mb-8">
                                    {authorData.currentWork.desc}
                                </p>
                                <Button className="bg-transparent border border-gold/30 text-gold hover:bg-gold hover:text-ink-black px-8 py-6 rounded-none tracking-widest uppercase text-xs">
                                    Get Early Access
                                </Button>
                            </div>
                            <div className="flex justify-center">
                                <motion.div 
                                    style={{ y: y2 }}
                                    className="w-full max-w-[300px] aspect-[3/4] rounded-lg overflow-hidden border-2 border-white/10 shadow-2xl rotate-3"
                                >
                                    <img src={authorData.images.tertiary} className="w-full h-full object-cover grayscale opacity-50" alt="Process" />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Behind the Ink */}
            <section className="py-24 bg-ink-black border-t border-white/5">
                <div className="container mx-auto px-6 max-w-6xl">
                    <h2 className="text-3xl font-light mb-12 text-center tracking-widest uppercase">The Aesthetic</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Legacy", desc: "A poetic flame passed from father to son, burning brighter with each verse.", icon: Sparkles },
                            { title: "Justice", desc: "Seeking truth in the courtroom and beauty in the written word.", icon: Scale },
                            { title: "Emotion", desc: "Writing to liberate the feelings that find no home in the ordinary world.", icon: Heart }
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
                        "Your emotions are the ink; the world is your canvas."
                    </p>
                    <div className="h-[1px] w-24 bg-gold/30 mx-auto mb-8" />
                    <div className="flex justify-center gap-8 text-xs tracking-widest uppercase text-parchment/40">
                        <span className="hover:text-gold cursor-pointer transition-colors">Instagram</span>
                        <span className="hover:text-gold cursor-pointer transition-colors">Email</span>
                    </div>
                    <p className="text-xs text-parchment/20 mt-8 tracking-widest">© {new Date().getFullYear()} Shikast-e-Aziz. All rights reserved.</p>
                </div>
            </section>
        </div>
    );
};

export default ShikastEAzizAuthor;
