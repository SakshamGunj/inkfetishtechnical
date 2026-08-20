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
    Scroll,
    Languages,
    Users,
    Music,
    Film,
    BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const authorData = {
    name: "Rajesh Tiwari",
    title: "Principal, Educator, Author & Artist",
    subtitle: "A Life Dedicated to Education and Art",
    bio: "Rajesh Tiwari is a visionary educator with over 25 years of experience in academia, currently serving as a CBSE school Principal. Beyond the classroom, he is a true polymath—a self-published author in three languages, a professional playwright, actor, and musician.",
    longBio: "Rajesh's journey is defined by his boundless passion for learning, guiding, and expressing. With an M.A. and B.Ed. in English, and a PG Diploma in Guidance and Counseling, he has dedicated 12 years to teaching and the last 13 years to leading as a Principal. His academic expertise extends to IELTS and personality development coaching. Yet, his creative soul shines just as brightly. He is a self-published author of four books across English, Hindi, and Gujarati. A professional playwright and actor, he has graced the theater stage and worked as an Assistant Director for Chowdhary Films Pvt. Ltd. Furthermore, Rajesh is a singer, composer, gazal artist, and a certified Numerologist. His life is a beautiful symphony of intellectual depth and artistic brilliance.",
    location: "India",
    email: "", // Placeholder
    instagram: "", // Placeholder
    stats: {
        experience: "25+ Years",
        role: "Principal & Author",
        education: "M.A., B.Ed., PGDGC",
        status: "Active",
        languages: "Eng, Hin, Guj",
        genre: "Multilingual Literature"
    },
    journey: {
        start: "My journey began in the classrooms, teaching a diverse array of subjects from English to Economics, shaping minds for 12 years before taking on the mantle of Principal for the last 13 years.",
        motivation: "Education and art are two sides of the same coin. Whether I am counseling a student, writing a book, acting on stage, or composing a gazal, the core motivation remains the same: to connect, inspire, and elevate the human spirit.",
        vision: "To continue merging the worlds of education and creative arts. I aim to write more, guide more students as a counselor and mentor, and create art that speaks across languages and generations.",
        message: "Life is a stage, a classroom, and a blank canvas all at once. Never limit yourself to a single role. Explore your talents, guide others with compassion, and let your voice be heard in whatever language or medium you choose."
    }
};

const RajeshTiwariAuthor = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, -100]);

    return (
        <div className="min-h-screen bg-ink-black text-parchment font-serif selection:bg-gold selection:text-ink-black overflow-x-hidden">
            <Helmet>
                <title>Rajesh Tiwari | Inkfetish Author</title>
                <meta name="description" content="Principal, Educator, Author, and Artist. Discover the multifaceted journey of Rajesh Tiwari." />
                <meta property="og:title" content="Rajesh Tiwari | Inkfetish" />
                <meta property="og:description" content="A Life Dedicated to Education and Art. Explore the writing and journey of Rajesh Tiwari." />
                <meta property="og:type" content="profile" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Rajesh Tiwari | Inkfetish" />
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
                            <p className="text-xs text-parchment/50">x Rajesh Tiwari</p>
                        </div>
                    </div>
                    <div className="hidden md:flex gap-8 text-xs tracking-[0.2em] uppercase text-parchment/60">
                        <a href="#about" className="hover:text-gold transition-colors">About</a>
                        <a href="#journey" className="hover:text-gold transition-colors">Journey</a>
                        <a href="#works" className="hover:text-gold transition-colors">Works</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-30 pointer-events-none" />

                {/* Distinguished gold and deep blue ambient for authority and creativity */}
                <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="space-y-8 text-center lg:text-left order-2 lg:order-1"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full text-xs text-gold uppercase tracking-[0.2em] font-sans">
                            <Briefcase className="w-3 h-3" />
                            Principal & Author
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight">
                            Rajesh <br />
                            <span className="text-gold italic font-normal font-display">Tiwari</span>
                        </h1>

                        <p className="text-xl text-parchment/70 font-light max-w-lg leading-relaxed mx-auto lg:mx-0">
                            {authorData.subtitle}
                        </p>

                        <div className="flex items-center gap-6 justify-center lg:justify-start pt-2">
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
                            className="w-full max-w-[450px] mx-auto aspect-[3/4] bg-zinc-900 rounded-t-[100px] rounded-b-lg overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                        >
                            {/* Professional placeholder */}
                            <div className="w-full h-full bg-gradient-to-br from-zinc-800 via-blue-950/20 to-ink-black flex items-center justify-center relative">
                                <div className="text-center space-y-6 p-8 relative z-10">
                                    <div className="w-36 h-36 mx-auto rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                                        <GraduationCap className="w-14 h-14 text-gold/60" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-parchment/30 text-sm font-sans tracking-[0.2em] uppercase">Rajesh Tiwari</p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-radial-gradient from-gold/5 to-transparent opacity-50" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-transparent to-transparent opacity-60" />

                            {/* Floating Element */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 hidden sm:block"
                            >
                                <BookOpen className="w-6 h-6 text-gold mb-2" />
                                <p className="text-xs text-parchment/60 uppercase tracking-wider">4 Books</p>
                                <p className="text-sm text-white font-serif">3 Languages</p>
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
                        "Life is a stage, a classroom, and a blank canvas all at once.{" "}
                        <span className="text-gold/80 italic">Never limit yourself to a single role."</span>
                    </motion.h2>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-[1px] w-12 bg-white/20" />
                        <p className="text-parchment/50 font-sans text-sm tracking-[0.2em] uppercase">Rajesh Tiwari</p>
                        <div className="h-[1px] w-12 bg-white/20" />
                    </div>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="py-20 bg-ink-black/50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                            { label: "Experience", value: "25+ Yrs", icon: Calendar },
                            { label: "Role", value: "Principal", icon: Briefcase },
                            { label: "Education", value: "M.A., B.Ed.", icon: GraduationCap },
                            { label: "Books", value: "4 Published", icon: BookOpen },
                            { label: "Languages", value: "Eng, Hin, Guj", icon: Languages },
                            { label: "Arts", value: "Theater & Music", icon: Music }
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
                                    About The Polymath
                                </h2>
                                <p className="text-xl text-parchment/80 leading-relaxed font-light mb-6">
                                    {authorData.longBio}
                                </p>
                                <p className="text-parchment/60 leading-relaxed">
                                    Whether guiding a student through a difficult phase as a counselor, performing on stage as an actor, or writing verses in multiple languages, Rajesh embodies the true spirit of a lifelong learner and creator.
                                </p>
                            </motion.div>

                            {/* Journey Timeline */}
                            <div id="journey" className="space-y-8">
                                <h3 className="text-2xl font-serif text-white">The Path Traveled</h3>

                                {[
                                    {
                                        title: "The Educator",
                                        year: "12 Years",
                                        desc: "Taught English, Economics, Social Studies, Hindi, Sanskrit, and Organization of Commerce in secondary and higher secondary sections.",
                                        icon: BookOpen
                                    },
                                    {
                                        title: "The Leader",
                                        year: "13 Years",
                                        desc: "Serving as the Principal in a CBSE school, guiding students, faculty, and shaping the future of education.",
                                        icon: Briefcase
                                    },
                                    {
                                        title: "The Counselor & Coach",
                                        year: "Professional",
                                        desc: "Holds a PG Diploma in Guidance and Counseling. Acts as a professional IELTS and personality development faculty.",
                                        icon: Users
                                    },
                                    {
                                        title: "The Artist & Writer",
                                        year: "Creative Arts",
                                        desc: "Self-published four books in three languages. Active in professional theater as a playwright and actor. Singer, composer, gazal artist, and Assistant Director in web series.",
                                        icon: Sparkles
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
                                    <h3 className="text-xl font-bold mb-4 relative z-10 font-serif">Vision & Philosophy</h3>
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
                                    <h3 className="text-xl font-bold mb-4 relative z-10 font-serif">Core Motivation</h3>
                                    <p className="text-parchment/70 leading-relaxed relative z-10">{authorData.journey.motivation}</p>
                                </motion.div>

                                {/* Multilingual Card */}
                                <div id="works" className="p-8 bg-gradient-to-br from-gold/10 to-transparent rounded-2xl border border-gold/20 relative overflow-hidden">
                                    <div className="flex items-start justify-between mb-6">
                                        <Languages className="w-8 h-8 text-gold" />
                                    </div>
                                    <h3 className="text-2xl font-serif text-white mb-3">Multilingual Author</h3>
                                    <div className="flex gap-3 mb-4">
                                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-parchment/70 font-sans tracking-wider">English</span>
                                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-parchment/70 font-sans tracking-wider">Hindi</span>
                                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-parchment/70 font-sans tracking-wider">Gujarati</span>
                                    </div>
                                    <p className="text-parchment/60 text-sm leading-relaxed">Author of four self-published books spanning three languages, showcasing a deep linguistic command and cultural connection.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* The Many Hats */}
            <section className="py-24 bg-ink-charcoal/30 border-t border-white/5">
                <div className="container mx-auto px-6 max-w-6xl">
                    <h2 className="text-3xl font-light mb-12 text-center">A Man of Many Hats</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Theater & Screen",
                                desc: "A professional playwright and actor with extensive theater experience, and an Assistant Director for web series at Chowdhary Films Pvt. Ltd.",
                                icon: Film
                            },
                            {
                                title: "Music & Poetry",
                                desc: "A talented singer, composer, lyricist, and gazal artist who weaves emotions into melodies and poetic verses.",
                                icon: Music
                            },
                            {
                                title: "Guidance & Mysticism",
                                desc: "Combining a PG Diploma in Guidance and Counseling with certified expertise in Numerology to guide individuals holistically.",
                                icon: Sparkles
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
                        <span className="hover:text-gold cursor-pointer transition-colors">Instagram</span>
                        <span className="hover:text-gold cursor-pointer transition-colors">Email</span>
                        <span className="hover:text-gold cursor-pointer transition-colors">Twitter</span>
                    </div>
                    <p className="text-xs text-parchment/20 mt-8 tracking-widest">© {new Date().getFullYear()} Rajesh Tiwari. All rights reserved.</p>
                </div>
            </section>
        </div>
    );
};

export default RajeshTiwariAuthor;
