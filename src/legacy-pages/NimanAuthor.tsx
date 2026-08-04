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
    Star,
    Users,
    Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const authorData = {
    name: "Niman",
    title: "Medical Professional & Published Author",
    subtitle: "Writing to Heal. Writing to Remember.",
    bio: "Niman is a diagnostic healthcare professional and published author whose debut book 'Maa I Still Remember You' honours the love, memories, and emotions tied to her grandmother. Through writing, she transforms deeply personal grief into words that heal others.",
    longBio: "Niman's writing journey began in childhood — poems, stories, and school literary activities were the earliest chapters of a voice that had always needed to speak. Her official debut came in 2026 with Maa I Still Remember You, a tribute to her grandmother, lovingly called 'Maa'. By day, she works in the diagnostic healthcare field — a profession built on precision and care — and by night, she pours that same care into prose. She is also a co-author in anthologies Honey & Hurt, Beyond the Ink, and Everything I Couldn't Tell the Moon. Her upcoming novels, Corporate Connection… An Unexpected Adhuri Mulakat and The Girl I Never Really Knew, mark the next chapter of a writing life that is only just beginning.",
    location: "India",
    email: "authorniman@gmail.com",
    instagram: "khwaab_unleashed",
    stats: {
        age: 29,
        role: "Author & Healthcare Pro",
        education: "B.Sc. Biochemistry",
        status: "Active",
        genre: "Emotional Fiction",
        books: "1 Debut + 3 Anthologies"
    },
    journey: {
        start: "My writing journey began in childhood — poems, stories, and school literary activities. I officially stepped into the publishing world in 2026 with my debut book, Maa I Still Remember You.",
        motivation: "The biggest inspiration behind my writing is my grandmother, whom I lovingly called 'Maa.' Her memories, love, and the emotions tied to my childhood encouraged me to write — and to preserve those feelings forever.",
        vision: "I aspire to become a recognised author whose words connect deeply with people. I wish to publish more books, contribute to meaningful anthologies, and inspire others to express their emotions through writing.",
        message: "Never be afraid to show your emotions. Your story, your memories, and your struggles have the power to heal not only you but also someone else who silently relates to them. Keep dreaming, keep working, and keep expressing yourself."
    }
};

const NimanAuthor = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, -100]);

    return (
        <div className="min-h-screen bg-ink-black text-parchment font-serif selection:bg-gold selection:text-ink-black overflow-x-hidden">
            <Helmet>
                <title>Niman | Inkfetish Author</title>
                <meta name="description" content="Medical professional and published author. Discover the words of Niman — author of Maa I Still Remember You. Writing to heal. Writing to remember." />
                <meta property="og:title" content="Niman | Inkfetish" />
                <meta property="og:description" content="Writing to Heal. Writing to Remember. Explore the books and journey of Niman." />
                <meta property="og:type" content="profile" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Niman | Inkfetish" />
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
                            <p className="text-xs text-parchment/50">x Niman</p>
                        </div>
                    </div>
                    <div className="hidden md:flex gap-8 text-xs tracking-[0.2em] uppercase text-parchment/60">
                        <a href="#about" className="hover:text-gold transition-colors">About</a>
                        <a href="#journey" className="hover:text-gold transition-colors">Journey</a>
                        <a href="#books" className="hover:text-gold transition-colors">Books</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-30 pointer-events-none" />
                {/* Warm mauve / dusty rose ambient — grief and love */}
                <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-rose-950/20 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-950/15 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="space-y-8 text-center lg:text-left order-2 lg:order-1"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full text-xs text-gold uppercase tracking-[0.2em] font-sans">
                            <BookOpen className="w-3 h-3" />
                            Published Author · 2026 Debut
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight">
                            Ni<span className="text-gold italic font-normal font-display">man</span>
                        </h1>

                        <p className="text-xl text-parchment/70 font-light max-w-lg leading-relaxed mx-auto lg:mx-0">
                            {authorData.subtitle}
                        </p>

                        {/* Debut Book Badge */}
                        <div className="inline-flex items-center gap-3 p-3 bg-white/5 border border-rose-900/30 rounded-xl backdrop-blur-sm">
                            <div className="w-10 h-14 bg-gradient-to-br from-rose-900/40 to-rose-950/20 rounded-sm border border-rose-800/30 flex items-center justify-center flex-shrink-0">
                                <Heart className="w-5 h-5 text-rose-400/80" />
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-parchment/40 uppercase tracking-widest font-sans">Debut Book · 2026</p>
                                <p className="text-sm text-parchment font-serif font-semibold">Maa I Still Remember You</p>
                                <p className="text-xs text-gold/60 italic">A tribute to her grandmother</p>
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
                                <a href="https://instagram.com/khwaab_unleashed" target="_blank" rel="noopener noreferrer">
                                    <Instagram className="w-6 h-6 hover:text-gold cursor-pointer transition-colors hover:scale-110 duration-300" />
                                </a>
                                <a href="mailto:authorniman@gmail.com">
                                    <Mail className="w-6 h-6 hover:text-gold cursor-pointer transition-colors hover:scale-110 duration-300" />
                                </a>
                                <Globe className="w-6 h-6 hover:text-gold cursor-pointer transition-colors hover:scale-110 duration-300" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Author Image Frame */}
                    <motion.div
                        style={{ y: y1 }}
                        className="relative order-1 lg:order-2"
                    >
                        <div className="absolute inset-0 border border-rose-900/20 rounded-t-[100px] rounded-b-lg transform rotate-6 translate-x-4 scale-105" />
                        <div className="absolute inset-0 border border-white/5 rounded-t-[100px] rounded-b-lg transform -rotate-3 -translate-x-2 scale-105" />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2 }}
                            className="w-full max-w-[450px] mx-auto aspect-[3/4] bg-zinc-900 rounded-t-[100px] rounded-b-lg overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                        >
                            <div className="w-full h-full bg-gradient-to-br from-zinc-800 via-rose-950/20 to-ink-black flex items-center justify-center">
                                <div className="text-center space-y-6 p-8 relative z-10">
                                    <div className="w-36 h-36 mx-auto rounded-full bg-rose-900/10 border border-rose-800/20 flex items-center justify-center">
                                        <Heart className="w-14 h-14 text-rose-400/30" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-parchment/20 text-xs font-sans tracking-[0.3em] uppercase">Niman</p>
                                        <p className="text-parchment/10 text-xs font-sans tracking-[0.2em] italic">@khwaab_unleashed</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-transparent to-transparent opacity-60" />

                            {/* Floating Element */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 hidden sm:block"
                            >
                                <Heart className="w-6 h-6 text-rose-400/70 mb-2" />
                                <p className="text-xs text-parchment/60 uppercase tracking-wider">For Maa</p>
                                <p className="text-sm text-white font-serif">Always</p>
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
                        "Never be afraid to show your emotions — your story, your memories, and your struggles{" "}
                        <span className="text-gold/80 italic">have the power to heal not only you, but also someone else who silently relates to them."</span>
                    </motion.h2>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-[1px] w-12 bg-white/20" />
                        <p className="text-parchment/50 font-sans text-sm tracking-[0.2em] uppercase">Niman</p>
                        <div className="h-[1px] w-12 bg-white/20" />
                    </div>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="py-20 bg-ink-black/50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                            { label: "Age", value: "29", icon: Calendar },
                            { label: "Role", value: "Author & Medic", icon: Briefcase },
                            { label: "Education", value: "B.Sc. Biochem", icon: GraduationCap },
                            { label: "Genre", value: "Emotional Fiction", icon: Scroll },
                            { label: "Published", value: "4 Works", icon: BookOpen },
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
                                    Between diagnostic labs and literary pages, Niman carries the same intent — precision, care, and a deep desire to help. One saves lives. The other saves feelings. Both matter.
                                </p>
                            </motion.div>

                            {/* Journey Timeline */}
                            <div id="journey" className="space-y-8">
                                <h3 className="text-2xl font-serif text-white">The Path Traveled</h3>

                                {[
                                    {
                                        title: "The Earliest Pages",
                                        year: "Childhood",
                                        desc: "Poems, stories, school literary activities — the first signs of a writer who had always been waiting to emerge.",
                                        icon: Sparkles
                                    },
                                    {
                                        title: "The Professional Path",
                                        year: "Healthcare Career",
                                        desc: "Built a career in diagnostic healthcare, earning certifications in ISO 15189 and Lean Six Sigma — a life of discipline, precision, and service.",
                                        icon: Award
                                    },
                                    {
                                        title: "Maa I Still Remember You",
                                        year: "2026 · Debut",
                                        desc: "Officially stepped into the publishing world with a debut book honouring her grandmother — the woman who inspired everything. A tribute written in love and memory.",
                                        icon: Heart
                                    },
                                    {
                                        title: "The Anthologies & Beyond",
                                        year: "Present Day",
                                        desc: "Co-author in Honey & Hurt, Beyond the Ink, and Everything I Couldn't Tell the Moon. Two novels in progress — the writing life is accelerating.",
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
                                    className="p-8 bg-gradient-to-br from-rose-950/20 to-zinc-900/40 rounded-2xl border border-rose-900/20 backdrop-blur-sm relative overflow-hidden group hover:border-rose-700/30 transition-colors"
                                >
                                    <Heart className="w-8 h-8 text-rose-400/70 mb-6 relative z-10" />
                                    <h3 className="text-xl font-bold mb-4 relative z-10 font-serif">For Maa</h3>
                                    <p className="text-parchment/70 leading-relaxed relative z-10">{authorData.journey.motivation}</p>
                                </motion.div>

                                {/* Books & Anthologies Card */}
                                <div id="books" className="p-8 bg-gradient-to-br from-gold/10 to-transparent rounded-2xl border border-gold/20 relative overflow-hidden">
                                    <div className="flex items-start justify-between mb-6">
                                        <BookOpen className="w-8 h-8 text-gold" />
                                        <Badge className="bg-gold text-ink-black hover:bg-gold/90">Published Works</Badge>
                                    </div>
                                    <h3 className="text-xl font-serif text-white mb-4">Works & Anthologies</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <Star className="w-3 h-3 text-gold mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm text-parchment font-semibold">Maa I Still Remember You</p>
                                                <p className="text-xs text-parchment/50 italic">Debut Book · 2026</p>
                                            </div>
                                        </div>
                                        <div className="h-[1px] bg-white/5" />
                                        {["Honey & Hurt", "Beyond the Ink", "Everything I Couldn't Tell the Moon"].map((title) => (
                                            <div key={title} className="flex items-start gap-3">
                                                <Users className="w-3 h-3 text-gold/60 mt-1 flex-shrink-0" />
                                                <div>
                                                    <p className="text-sm text-parchment/80">{title}</p>
                                                    <p className="text-xs text-parchment/40 italic">Co-author · Anthology</p>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="h-[1px] bg-white/5" />
                                        <div className="pt-1">
                                            <p className="text-xs text-gold uppercase tracking-wider mb-2">Upcoming Novels</p>
                                            <p className="text-xs text-parchment/60 italic">Corporate Connection… An Unexpected Adhuri Mulakat</p>
                                            <p className="text-xs text-parchment/60 italic mt-1">The Girl I Never Really Knew</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* The Dual Life Section */}
            <section className="py-24 bg-ink-charcoal/30 border-t border-white/5">
                <div className="container mx-auto px-6 max-w-6xl">
                    <h2 className="text-3xl font-light mb-12 text-center">Two Worlds. One Heart.</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "The Professional",
                                desc: "ISO-certified and Lean Six Sigma trained, Niman brings the same precision and care to the diagnostic healthcare field as she does to every sentence she writes.",
                                icon: Award
                            },
                            {
                                title: "The Author",
                                desc: "From childhood poems to a published debut and three anthologies, the writing has always been there — growing steadily, waiting to be shared with the world.",
                                icon: Feather
                            },
                            {
                                title: "The Memory Keeper",
                                desc: "At the heart of it all is Maa — a grandmother whose love lives on in every page, every word, every book that carries her memory forward.",
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
                        <a href="https://instagram.com/khwaab_unleashed" target="_blank" rel="noopener noreferrer" className="hover:text-gold cursor-pointer transition-colors">Instagram</a>
                        <a href="mailto:authorniman@gmail.com" className="hover:text-gold cursor-pointer transition-colors">Email</a>
                    </div>
                    <p className="text-xs text-parchment/20 mt-8 tracking-widest">© {new Date().getFullYear()} Niman. All rights reserved.</p>
                </div>
            </section>
        </div>
    );
};

export default NimanAuthor;
