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
    Award,
    GraduationCap,
    Clock,
    Scroll,
    User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const authorData = {
    name: "Hon. Dr. R. M. Priya Bharathy",
    displayName: "Priya Bharathy",
    title: "Author, Storyteller & Poet",
    subtitle: "Giving voice to stories that remain unspoken | Recipient of Honorary Doctorate in Literature",
    bio: "Hon. Dr. R. M. Priya Bharathy is an emerging Indian writer known for her emotionally rich and inspirational storytelling. Born in Chennai, she has developed a distinctive voice that reflects authenticity, healing, and the quiet strength found in everyday life.",
    longBio: "Priya's literary journey is a testament to resilience. Despite facing significant health challenges that led her to pause her nursing studies, she has emerged as a powerful voice in contemporary literature. Inspired by William Shakespeare and the timeless life of her mother, she explores themes of human emotions, gratitude, and resilience. Her work has been recognized with the Ashoka Stamp Achievement Award and the Emerging Literary Excellence Award 2026. Recently, she was conferred an Honorary Doctorate for her contributions to storytelling and literary impact.",
    location: "Chennai, Tamil Nadu, India",
    email: "contact@priyabharathy.com", // Placeholder
    instagram: "priya_bharathy", // Placeholder
    stats: {
        age: 21,
        role: "Emerging Author",
        honors: "Honorary Doctorate",
        release: "May 10, 2026",
        status: "Award Winning",
        genre: "Memoir & Poetry"
    },
    book: {
        title: "Unseen Heroine of My Life",
        subtitle: "A Tribute to Silent Strength",
        intro: "Some stories are not written to impress. They are written to remember. This book was born from silence—from the quiet strength of a woman whose sacrifices were never announced, whose pain was never documented, and whose courage was never celebrated publicly. Yet her life shaped generations.",
        dedication: "This book is lovingly dedicated to my mother, Mrs. Revathy Munuswamy. A woman whose strength was never announced, whose sacrifices were never recorded, and whose courage was never displayed for the world to see.",
        expected: "May 10, 2026"
    }
};

const PriyaBharathyAuthor = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, -100]);
    
    return (
        <div className="min-h-screen bg-ink-black text-parchment font-serif selection:bg-gold selection:text-ink-black overflow-x-hidden">
            <Helmet>
                <title>Hon. Dr. R. M. Priya Bharathy | Inkfetish Author</title>
                <meta name="description" content="Author of 'Unseen Heroine of My Life'. Discover the inspirational journey of Hon. Dr. R. M. Priya Bharathy." />
                <meta property="og:title" content="Priya Bharathy | Inkfetish Author" />
                <meta property="og:description" content="A memoir dedicated to silent strength and unconditional love." />
                <meta property="og:type" content="profile" />
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
                            <p className="text-xs text-parchment/50">x Priya Bharathy</p>
                        </div>
                    </div>
                    <div className="hidden md:flex gap-8 text-xs tracking-[0.2em] uppercase text-parchment/60">
                        <a href="#biography" className="hover:text-gold transition-colors">Biography</a>
                        <a href="#memoir" className="hover:text-gold transition-colors">The Memoir</a>
                        <a href="#honors" className="hover:text-gold transition-colors">Honors</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section - Typographic Focus */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-30 pointer-events-none" />
                <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-rose-900/10 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="space-y-8 text-center lg:text-left order-2 lg:order-1"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs tracking-widest uppercase">
                            <Award className="w-3 h-3 animate-pulse" />
                            <span>{authorData.stats.honors}</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight">
                            Priya <br />
                            <span className="text-gold italic font-normal font-display">Bharathy</span>
                        </h1>

                        <p className="text-xl text-parchment/70 font-light max-w-lg leading-relaxed mx-auto lg:mx-0">
                            {authorData.subtitle}
                        </p>

                        <div className="flex flex-col gap-6 pt-4 justify-center lg:justify-start">
                            <div className="flex items-center gap-6">
                                <Button
                                    onClick={() => toast.success("Added to reader list!")}
                                    className="bg-gold text-ink-black hover:bg-gold/90 font-sans tracking-wide px-8 py-6 text-lg rounded-sm"
                                >
                                    Pre-Order Memoir
                                </Button>

                                <div className="flex gap-4 text-parchment/40">
                                    <Instagram className="w-6 h-6 hover:text-gold cursor-pointer transition-colors" />
                                    <Mail className="w-6 h-6 hover:text-gold cursor-pointer transition-colors" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Author Typography Frame (No Image as requested) */}
                    <motion.div
                        style={{ y: y1 }}
                        className="relative order-1 lg:order-2 flex justify-center"
                    >
                        <div className="w-full max-w-[450px] aspect-[3/4] border-[3px] border-gold/20 flex flex-col items-center justify-center p-12 text-center group hover:border-gold/50 transition-all duration-700 bg-zinc-900/40 backdrop-blur-sm relative">
                             <div className="absolute inset-4 border border-gold/10" />
                             <User className="w-20 h-20 text-gold/10 mb-8 group-hover:text-gold/20 transition-all" />
                             <h3 className="text-4xl font-display italic text-gold/80 mb-4 tracking-tighter">Hon. Dr.</h3>
                             <p className="text-2xl font-bold uppercase tracking-[0.2em] text-white">R. M. Priya Bharathy</p>
                             <div className="w-16 h-[1px] bg-gold/30 my-6" />
                             <p className="text-xs tracking-widest text-parchment/40 uppercase">Emerging Literary Excellence</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Dedication Section */}
            <section className="py-24 bg-ink-900/50 border-y border-white/5 relative overflow-hidden">
                <div className="container mx-auto px-6 text-center relative z-10">
                    <Heart className="w-12 h-12 text-rose-500/20 mx-auto mb-8" />
                    <h3 className="text-gold uppercase tracking-[0.3em] text-xs mb-6">DEDICATION</h3>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xl md:text-3xl font-light leading-relaxed max-w-4xl mx-auto mb-10 font-serif italic text-parchment/90"
                    >
                        "{authorData.book.dedication}"
                    </motion.p>
                    <div className="flex items-center justify-center gap-4">
                        <p className="text-parchment/30 font-sans text-xs tracking-[0.2em] uppercase">— Unseen Heroine of My Life</p>
                    </div>
                </div>
            </section>

            {/* Stats Grid */}
            <section id="honors" className="py-20 bg-ink-black/50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                            { label: "Age", value: authorData.stats.age, icon: Calendar },
                            { label: "Honors", value: "Honorary Doc", icon: Award },
                            { label: "Role", value: "Author/Storyteller", icon: PenTool },
                            { label: "Location", value: "Chennai", icon: MapPin },
                            { label: "Co-Authored", value: "10+ Anthologies", icon: Scroll },
                            { label: "Coming", value: "May 2026", icon: Clock }
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

            {/* Biography & Achievements */}
            <section id="biography" className="py-32 relative">
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
                                    A Journey of Resilience
                                </h2>
                                <p className="text-xl text-parchment/80 leading-relaxed font-light mb-8">
                                    {authorData.longBio}
                                </p>
                                <div className="space-y-4">
                                    <h4 className="text-gold font-bold uppercase tracking-widest text-sm">Key Recognitions</h4>
                                    <ul className="grid sm:grid-cols-2 gap-4 text-sm text-parchment/60 font-sans">
                                        <li className="flex items-start gap-3"><Award className="w-4 h-4 text-gold shrink-0" /> Honorary Doctorate in Literature</li>
                                        <li className="flex items-start gap-3"><Award className="w-4 h-4 text-gold shrink-0" /> Ashoka Stamp Achievement Award</li>
                                        <li className="flex items-start gap-3"><Award className="w-4 h-4 text-gold shrink-0" /> Pen Share Trophy (Top 20)</li>
                                        <li className="flex items-start gap-3"><Award className="w-4 h-4 text-gold shrink-0" /> Emerging Literary Excellence Award</li>
                                    </ul>
                                </div>
                            </motion.div>

                            <div className="p-8 bg-zinc-900/40 border border-gold/10 rounded-2xl italic text-parchment/70 leading-relaxed font-light relative">
                                <Quote className="absolute -top-4 -left-4 w-8 h-8 text-gold/20" />
                                "My writing journey began during my teenage years when I started expressing my emotions and life experiences through poetry. My greatest inspiration is my mother, whose life of strength, sacrifice, and unconditional love deeply influenced my writing."
                            </div>
                        </div>

                        {/* Sidebar: Anthologies List */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="p-8 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-sm">
                                <h3 className="text-xl font-bold mb-6 font-serif">Anthology Contributions</h3>
                                <div className="space-y-3 text-sm text-parchment/50">
                                    {[
                                        "Rise Beyond the Limits (Vol. 3)",
                                        "Love at Minus One",
                                        "The One Who Felt Everything",
                                        "Aurora of Words (Vol. 3)",
                                        "Seven Shades of Love (Vol. 1)",
                                        "Whispering My Love",
                                        "Moon Flowers and Manuscript",
                                        "Ribbon Crystal and Quiet Glow"
                                    ].map((a, i) => (
                                        <div key={i} className="flex items-center gap-3 border-b border-white/5 pb-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
                                            {a}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 pt-8 border-t border-white/10">
                                    <h4 className="text-gold font-bold text-xs uppercase mb-4 tracking-widest">Notable Works</h4>
                                    <p className="text-sm font-bold text-white mb-2">The Gratitude to My Mentor</p>
                                    <p className="text-sm font-bold text-white">The Courage to Begin Again</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Book Section */}
            <section id="memoir" className="py-32 bg-ink-900/30 border-t border-white/5 relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 space-y-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-950/20 text-rose-300 text-xs tracking-widest uppercase border border-rose-500/20">
                                <Heart className="w-3 h-3" />
                                <span>An Inspirational Memoir</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-light font-display italic leading-tight">
                                {authorData.book.title}
                            </h2>
                            <div className="h-1 w-20 bg-gold" />
                            <div className="space-y-6 text-parchment/70 leading-relaxed font-light">
                                <p className="text-xl text-parchment">
                                    "{authorData.book.intro}"
                                </p>
                                <p>
                                    Unseen Heroine of My Life is a deeply personal lived truth. It documents the journey of Mrs. Revathy Munuswamy—a woman who faced physical challenges, societal pressure, and loss, yet chose responsibility over surrender every single time.
                                </p>
                                <div className="grid grid-cols-2 gap-6 text-xs uppercase tracking-widest text-gold/60 pt-6">
                                    <div>• Physical Resilience</div>
                                    <div>• Domestic Struggle</div>
                                    <div>• Healing & Rebuilding</div>
                                    <div>• Motherhood Unmasked</div>
                                </div>
                            </div>
                        </div>

                        {/* Visual Representation (No Book Image, using Typographic Card) */}
                        <div className="order-1 lg:order-2 flex justify-center">
                            <motion.div
                                initial={{ rotate: 5, opacity: 0 }}
                                whileInView={{ rotate: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="w-72 h-[450px] bg-[#1a1a1a] shadow-2xl p-10 flex flex-col justify-between border border-gold/10 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent" />
                                <div className="text-center relative z-10">
                                    <p className="text-[10px] tracking-[0.4em] uppercase text-gold/50 mb-12">Inkfetish Publication</p>
                                    <h3 className="text-3xl font-display italic text-white leading-tight mb-4">
                                        Unseen Heroine of My Life
                                    </h3>
                                    <div className="w-8 h-[1px] bg-gold/30 mx-auto mb-4" />
                                    <p className="text-xs text-parchment/40">A TRUE STORY</p>
                                </div>
                                <div className="text-center relative z-10">
                                    <p className="text-[10px] tracking-widest uppercase text-gold mb-2">Hon. Dr. Author</p>
                                    <p className="text-sm font-bold uppercase tracking-widest text-white">R. M. Priya Bharathy</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Behind the Ink / Message */}
            <section className="py-24 bg-ink-black border-t border-white/5">
                <div className="container mx-auto px-6 max-w-6xl">
                    <h2 className="text-3xl font-light mb-12 text-center uppercase tracking-widest text-gold/40">Author's Reflections</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "The Preface", desc: "Some stories are not written to impress. They are written to remember.", icon: Scroll },
                            { title: "The Mission", desc: "To remind people to value the silent sacrifices made by those who shape our lives.", icon: Eye },
                            { title: "The Promise", desc: "This book does not promise comfort. It promises honesty.", icon: Star }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center p-8 bg-zinc-900/20 border border-white/5 rounded-2xl hover:bg-gold/5 transition-all"
                            >
                                <div className="w-16 h-16 mx-auto bg-ink-black rounded-full flex items-center justify-center border border-white/10 mb-6">
                                    <item.icon className="w-6 h-6 text-gold" />
                                </div>
                                <h3 className="text-xl font-serif text-white mb-3">{item.title}</h3>
                                <p className="text-parchment/60 leading-relaxed text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer Message */}
            <section className="py-32 text-center px-6 relative overflow-hidden bg-gradient-to-b from-ink-black to-[#0a0a0a]">
                <div className="absolute inset-0 bg-gold/5 blur-[100px] pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <Quote className="w-12 h-12 text-gold/20 mx-auto mb-8" />
                    <p className="text-2xl md:text-4xl font-light italic text-parchment/90 leading-relaxed mb-12 font-display">
                        "Every person has a story worth telling. <br className="hidden md:block" />
                        Value the love and resilience that shape our lives."
                    </p>
                    <div className="h-[1px] w-24 bg-gold/30 mx-auto mb-8" />
                    <div className="flex justify-center gap-8 text-xs tracking-widest uppercase text-parchment/40">
                        <span className="hover:text-gold cursor-pointer transition-colors">Instagram</span>
                        <span className="hover:text-gold cursor-pointer transition-colors">Email</span>
                    </div>
                    <p className="text-[10px] text-parchment/20 mt-12 tracking-[0.3em] uppercase">© {new Date().getFullYear()} Hon. Dr. R. M. Priya Bharathy • Inkfetish Publication</p>
                </div>
            </section>
        </div>
    );
};

export default PriyaBharathyAuthor;
