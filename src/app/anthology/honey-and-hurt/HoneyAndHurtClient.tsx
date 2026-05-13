'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Heart, 
  PenTool, 
  BookOpen, 
  Feather, 
  Sparkles, 
  Award, 
  BadgeCheck,
  ChevronRight,
  Globe,
  Quote,
  Star
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const HoneyAndHurtClient = () => {
    const router = useRouter();
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    // Parallax effects for cinematic feel
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacityHero = useTransform(scrollY, [0, 300], [1, 0]);

    const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500&display=swap');
        
        :root {
            --gold-main: #D88A06;
            --gold-light: #FFCC66;
            --gold-dark: #8F4D00;
            --obsidian: #0B0B0C;
            --ivory: #F5F2EE;
        }

        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        
        .gold-shimmer {
            background: linear-gradient(135deg, #8f4d00 0%, #d88a06 25%, #ffcf6b 50%, #d88a06 75%, #8f4d00 100%);
            background-size: 400% 400%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer 8s ease infinite;
        }

        @keyframes shimmer {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .gold-button {
            background: linear-gradient(135deg, #ffcf6b, #d88a06);
            color: black;
            transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
            box-shadow: 0 4px 20px rgba(216, 138, 6, 0.2);
        }

        .gold-button:hover {
            box-shadow: 0 10px 30px rgba(216, 138, 6, 0.4);
            transform: translateY(-2px);
            filter: brightness(1.1);
        }

        .text-obsidian { color: var(--obsidian); }
        .bg-ivory { background-color: var(--ivory); }
        .bg-obsidian { background-color: var(--obsidian); }
        
        .editorial-spacing { letter-spacing: 0.15em; }
        .luxury-border { border-color: #E3D8C7; }
        
        .gold-drip {
            position: absolute;
            width: 1px;
            background: linear-gradient(to bottom, transparent, var(--gold-main), transparent);
            height: 100px;
        }
    `;

    return (
        <div className="min-h-screen bg-ivory text-obsidian font-cormorant selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden">
            <style>{styles}</style>

            {/* --- TOP BAR (URGENCY) --- */}
            <div className="bg-obsidian text-slate-50 py-2.5 text-center font-cinzel text-[8px] md:text-[10px] tracking-[0.5em] uppercase sticky top-0 z-[60] shadow-md px-4 border-b border-gold-dark/20">
                <span className="flex items-center justify-center gap-4 max-w-xs mx-auto md:max-w-none leading-tight">
                    <span className="gold-shimmer font-bold">LIMITED: 12 SLOTS REMAINING</span>
                    <span className="hidden md:inline text-slate-500">|</span>
                    <span className="hidden md:inline">PREMIUM 80 GSM MATTE EDITION</span>
                </span>
            </div>

            {/* --- LUXURY NAVBAR --- */}
            <nav className={`fixed top-10 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'translate-y-[-40px] opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div className="container mx-auto px-6">
                    <div className="glass-effect rounded-full px-8 py-4 flex items-center justify-between shadow-2xl border border-white/20">
                        <div className="font-cinzel text-lg tracking-[0.3em] font-bold text-obsidian">INKFETISH</div>
                        
                        <div className="hidden md:flex items-center gap-10 font-cinzel text-[10px] tracking-widest uppercase text-slate-500">
                            <a href="#concept" className="hover:text-gold-main transition-colors">The Soul</a>
                            <a href="#benefits" className="hover:text-gold-main transition-colors">Privileges</a>
                            <a href="#process" className="hover:text-gold-main transition-colors">The Path</a>
                        </div>

                        <button 
                            onClick={() => router.push('/anthology/honey-and-hurt/register')}
                            className="gold-button px-6 py-2.5 rounded-full font-cinzel font-bold text-[9px] tracking-widest uppercase"
                        >
                            Claim Slot
                        </button>
                    </div>
                </div>
            </nav>

            {/* --- CINEMATIC HERO (HORMOZI STYLE) --- */}
            <section className="relative min-h-screen flex items-center pt-32 pb-20 px-6 overflow-hidden">
                <motion.div style={{ opacity: opacityHero }} className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,_var(--gold-light)_0%,_transparent_50%)] opacity-10" />
                </motion.div>

                <div className="container mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left Column: The Offer */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="space-y-8 text-center lg:text-left"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-obsidian text-white rounded-full font-cinzel text-[10px] tracking-[0.3em] uppercase">
                                <Sparkles className="w-3 h-3 text-gold-main" /> The Grand Slam Offer
                            </div>
                            
                            <h1 className="font-cinzel text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter">
                                <span className="gold-shimmer block">HONEY</span>
                                <span className="text-obsidian block opacity-90">& HURT</span>
                            </h1>

                            <p className="font-cormorant text-2xl md:text-3xl text-slate-600 leading-relaxed italic max-w-xl">
                                Become a Globally Published Author in 15 Days—Even if You've Never Published Before.
                            </p>

                            <div className="space-y-4 pt-4">
                                {[
                                    "Guaranteed Amazon & Global Distribution",
                                    "Professional Editorial & Cover Design",
                                    "Personalized Author Portfolio Website (Value ₹15k)",
                                    "Official ISBN & Gilded Certification"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 justify-center lg:justify-start">
                                        <BadgeCheck className="w-5 h-5 text-gold-main shrink-0" />
                                        <span className="font-inter text-sm tracking-wide text-slate-700 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-6">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => router.push('/anthology/honey-and-hurt/register')}
                                    className="gold-button px-12 py-5 rounded-full font-cinzel font-bold text-xs tracking-[0.3em] uppercase shadow-2xl"
                                >
                                    Claim Your Author Slot
                                </motion.button>
                            </div>

                            {/* Trust Signal */}
                            <div className="pt-8 flex items-center justify-center lg:justify-start gap-4">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200" />
                                    ))}
                                </div>
                                <div className="text-left">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-gold-main text-gold-main" />)}
                                    </div>
                                    <p className="font-inter text-[10px] text-slate-500 uppercase tracking-widest mt-1">Joined by 400+ Gilded Authors</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column: The Product Visual */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                            animate={{ opacity: 1, scale: 1, rotate: -2 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="relative"
                        >
                            <div className="relative z-10 w-full max-w-lg mx-auto aspect-[4/5] drop-shadow-[0_35px_35px_rgba(216,138,6,0.2)]">
                                <img 
                                    src="/anthology/honey-and-hurt-book.png" 
                                    alt="Honey and Hurt Anthology Book Cover" 
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            {/* Decorative Elements */}
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-gold-main/10 rounded-full blur-[100px] -z-10" />
                            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-obsidian/5 rounded-full blur-[100px] -z-10" />
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
                >
                    <span className="font-cinzel text-[8px] tracking-[0.4em] uppercase">Scroll</span>
                    <div className="w-px h-12 bg-obsidian" />
                </motion.div>
            </section>

            {/* --- STORY TEASER (Massive Whitespace) --- */}
            <section id="concept" className="py-40 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="text-center space-y-12"
                        >
                            <h2 className="font-cinzel text-2xl md:text-4xl tracking-[0.2em] text-obsidian uppercase">The Story Behind The Gilded</h2>
                            <div className="w-16 h-px bg-gold-main mx-auto" />
                            <p className="font-cormorant text-2xl md:text-4xl leading-[1.6] text-slate-500 font-light italic">
                                Following the massive success of <span className="text-obsidian font-bold">SYAAHI</span>, where we featured the Top 200 writers of India, Honey & Hurt is our most ambitious project yet. We aren't just printing another book; we are crafting an artifact. 
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
                                <div className="text-center">
                                    <p className="font-cinzel text-xl text-obsidian font-bold">80 GSM</p>
                                    <p className="font-cinzel text-[8px] tracking-widest uppercase text-slate-400">Premium Paper</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-cinzel text-xl text-obsidian font-bold">Matte</p>
                                    <p className="font-cinzel text-[8px] tracking-widest uppercase text-slate-400">Finish</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-cinzel text-xl text-obsidian font-bold">Global</p>
                                    <p className="font-cinzel text-[8px] tracking-widest uppercase text-slate-400">ISBN</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-cinzel text-xl text-obsidian font-bold">Limited</p>
                                    <p className="font-cinzel text-[8px] tracking-widest uppercase text-slate-400">Edition</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- THEMES (Gothic Romance) --- */}
            <section className="py-32 bg-obsidian text-ivory relative">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                        <div className="space-y-12">
                            <h3 className="font-cinzel text-4xl md:text-6xl font-bold leading-tight">
                                <span className="text-white">Sweetness</span> <br />
                                <span className="gold-shimmer">Meets Decay</span>
                            </h3>
                            <div className="space-y-8 font-cormorant text-xl text-slate-400">
                                <p className="leading-relaxed">
                                    Our editorial team selects only the most resonant voices for this edition. This isn't just a book; it's a legacy piece bound in obsidian and gold.
                                </p>
                                <ul className="space-y-6">
                                    {[
                                        { t: "Love & Obsession", d: "The intoxicating nectar that blinds the senses." },
                                        { t: "Pain & Healing", d: "The sharp sting that leaves a permanent mark." },
                                        { t: "The Duality", d: "Where the honey meets the hurt." }
                                    ].map((item, i) => (
                                        <li key={i} className="group border-l border-gold-dark pl-6 py-2 hover:border-gold-light transition-colors">
                                            <span className="font-cinzel text-xs tracking-[0.2em] uppercase text-white block mb-1">{item.t}</span>
                                            <span className="italic">{item.d}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-[3/4] border luxury-border p-4 relative group">
                                <div className="absolute inset-0 bg-gold-main/5 group-hover:bg-transparent transition-colors duration-700" />
                                <div className="w-full h-full bg-slate-900 flex items-center justify-center border luxury-border overflow-hidden">
                                    <motion.div 
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ repeat: Infinity, duration: 10 }}
                                        className="text-center p-8"
                                    >
                                        <Quote className="w-12 h-12 text-gold-main mx-auto mb-8 opacity-50" />
                                        <p className="font-cinzel text-2xl tracking-widest text-white mb-4">MORTAL WORDS</p>
                                        <p className="font-cinzel text-2xl tracking-widest gold-shimmer">IMMORTAL LEGACY</p>
                                    </motion.div>
                                </div>
                                {/* Ornamental Corners */}
                                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-gold-main" />
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-gold-main" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- BENIFITS (Editorial Grid) --- */}
            <section id="benefits" className="py-32 bg-ivory">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24">
                        <span className="font-cinzel text-[10px] tracking-[0.5em] uppercase text-gold-main block mb-4">The Author's Privilege</span>
                        <h2 className="font-cinzel text-4xl md:text-5xl">Gilded Recognition</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E3D8C7] border luxury-border">
                        {[
                            { title: "ISBN CERTIFICATION", icon: <BadgeCheck className="w-6 h-6" />, desc: "Official international registration for your contribution." },
                            { title: "GLOBAL FOOTPRINT", icon: <Globe className="w-6 h-6" />, desc: "Distribution via Amazon & major retailers worldwide." },
                            { title: "EDITORIAL MASTERY", icon: <PenTool className="w-6 h-6" />, desc: "Professional curation to ensure your work shines." },
                            { title: "AUTHOR PORTFOLIO", icon: <Star className="w-6 h-6" />, desc: "An exclusive digital space on the Inkfetish platform." },
                            { title: "GILDED CERTIFICATE", icon: <Award className="w-6 h-6" />, desc: "A physical/digital honor marking your status as a published author." },
                            { title: "ROYALTY RIGHTS", icon: <BookOpen className="w-6 h-6" />, desc: "Earn your share from every copy sold globally." }
                        ].map((item, i) => (
                            <div key={i} className="bg-ivory p-12 hover:bg-white transition-colors group">
                                <div className="text-gold-main mb-8 transform group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                                <h4 className="font-cinzel text-sm tracking-[0.3em] uppercase mb-4">{item.title}</h4>
                                <p className="font-cormorant text-lg text-slate-500 leading-relaxed italic">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- THE PATH (The Process) --- */}
            <section id="process" className="py-32 bg-obsidian text-white relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24">
                        <span className="font-cinzel text-[10px] tracking-[0.5em] uppercase text-gold-main block mb-4">The Journey</span>
                        <h2 className="font-cinzel text-4xl md:text-5xl">Your Path to Immortality</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { step: "01", title: "Registration", desc: "Submit your basic details and secure your slot in the first edition." },
                            { step: "02", title: "Curation", desc: "Our editors work with you to refine your manuscript to perfection." },
                            { step: "03", title: "Global Launch", desc: "Your name is printed, bound, and distributed to readers worldwide." }
                        ].map((item, i) => (
                            <div key={i} className="relative p-8 border luxury-border bg-white/5 hover:bg-white/10 transition-all group">
                                <span className="font-cinzel text-5xl opacity-10 absolute top-4 right-4 group-hover:opacity-30 transition-opacity">{item.step}</span>
                                <h4 className="font-cinzel text-lg tracking-widest mb-6 gold-shimmer">{item.title}</h4>
                                <p className="font-cormorant text-xl text-slate-400 italic leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- PREVIOUS ANTHOLOGIES (PROOF OF CONCEPT) --- */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24">
                        <span className="font-cinzel text-[10px] tracking-[0.5em] uppercase text-slate-400 block mb-4">Proof of Excellence</span>
                        <h2 className="font-cinzel text-4xl md:text-5xl uppercase tracking-tighter">Legacy of the <span className="gold-shimmer">Inkfetish</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {[
                            { title: "Love at Minus One", img: "https://i.ibb.co/PZk5Qnmt/Whats-App-Image-2025-12-25-at-2-27-03-AM-2.jpg", status: "Sold Out" },
                            { title: "Syaahi", img: "https://i.ibb.co/Y4zN8Rp0/Whats-App-Image-2025-12-08-at-6-39-26-PM-2.jpg", status: "Bestseller" },
                            { title: "The Poet's Heart", img: "https://i.ibb.co/mCH1WTBD/Whats-App-Image-2025-12-25-at-2-27-03-AM-1.jpg", status: "Sold Out" }
                        ].map((book, i) => (
                            <motion.div key={i} whileHover={{ y: -10 }} className="group relative">
                                <div className="aspect-[3/4] overflow-hidden border luxury-border grayscale group-hover:grayscale-0 transition-all duration-700">
                                    <img src={book.img} alt={book.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute top-4 right-4 bg-obsidian text-gold-main font-cinzel text-[8px] px-3 py-1 tracking-[0.2em] uppercase">
                                        {book.status}
                                    </div>
                                </div>
                                <div className="mt-6 text-center">
                                    <h4 className="font-cinzel text-sm tracking-widest text-obsidian uppercase">{book.title}</h4>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- THE GRAND SLAM OFFER (THE DEAL) --- */}
            <section className="py-32 bg-ivory border-y luxury-border">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto bg-obsidian text-white rounded-3xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(216,138,6,0.3)] border border-gold-dark/30">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="p-12 md:p-16 space-y-8">
                                <h3 className="font-cinzel text-3xl md:text-5xl font-bold leading-tight">
                                    Everything You Need to <span className="gold-shimmer">Go Pro</span>.
                                </h3>
                                <p className="font-cormorant text-xl text-slate-400 italic">
                                    We don't just publish your work; we build your career. 
                                </p>
                                <div className="space-y-6">
                                    {[
                                        { t: "Global Distribution", v: "₹9,999", d: "Amazon, Flipkart & Kindle Worldwide." },
                                        { t: "Professional Portfolio", v: "₹14,999", d: "Your own dedicated author website." },
                                        { t: "Editorial Mastery", v: "₹4,999", d: "Premium manuscript refinement." },
                                        { t: "Gilded Marketing", v: "₹7,999", d: "Social media feature & spotlight." }
                                    ].map((item, i) => (
                                        <div key={i} className="flex justify-between items-start border-b border-white/10 pb-4">
                                            <div>
                                                <p className="font-cinzel text-xs tracking-widest text-white">{item.t}</p>
                                                <p className="font-inter text-[10px] text-slate-500 mt-1 uppercase">{item.d}</p>
                                            </div>
                                            <span className="font-inter text-[10px] text-gold-main line-through">{item.v}</span>
                                        </div>
                                    ))}

                                    {/* Bonus Section (Syaahi Inspired) */}
                                    <div className="bg-gold-main/10 border border-gold-main/30 p-5 rounded-xl mt-6">
                                        <div className="flex items-start gap-4">
                                            <Sparkles className="w-5 h-5 text-gold-main shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-cinzel text-[10px] tracking-[0.2em] uppercase text-white font-bold">Gilded Bonus Secured</p>
                                                <p className="font-cormorant text-sm text-slate-400 italic">₹500 Digital Credit for your next solo book launch.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-6 flex justify-between items-center">
                                        <div>
                                            <p className="font-cinzel text-xs tracking-[0.3em] uppercase text-slate-400">Total Value</p>
                                            <p className="font-cinzel text-2xl line-through opacity-30 tracking-widest">₹37,996</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-cinzel text-xs tracking-[0.3em] uppercase text-gold-main font-bold">Your Investment</p>
                                            <p className="font-cinzel text-4xl gold-shimmer tracking-tighter">₹2,499</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gold-main/5 p-12 md:p-16 flex flex-col justify-center space-y-8 border-l border-white/10">
                                <div className="space-y-4">
                                    <h4 className="font-cinzel text-xl tracking-widest text-white">READY TO CLAIM YOUR SPOT?</h4>
                                    <p className="font-cormorant text-lg text-slate-400 leading-relaxed italic">
                                        Once the 12 remaining slots are filled, registration will close for this edition. No exceptions.
                                    </p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => router.push('/anthology/honey-and-hurt/register')}
                                    className="gold-button w-full py-6 rounded-full font-cinzel font-bold text-xs tracking-[0.4em] uppercase"
                                >
                                    Join The Anthology Now
                                </motion.button>
                                <p className="text-center font-inter text-[9px] uppercase tracking-widest text-slate-500">
                                    100% Satisfaction Guarantee | Gilded Selection Process
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- WALL OF PRESTIGE (Testimonials) --- */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24">
                        <span className="font-cinzel text-[10px] tracking-[0.5em] uppercase text-slate-400 block mb-4">Voice of the Gilded</span>
                        <h2 className="font-cinzel text-4xl md:text-5xl">Wall of Prestige</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { name: "Ananya R.", role: "Published Author", text: "Inkfetish didn't just publish my book; they treated my words like art. The Honey & Hurt team is exceptional." },
                            { name: "Vikram S.", role: "Poet", text: "The transition from a draft to a hardbound luxury book was seamless. Becoming a co-author was the best decision for my writing career." },
                            { name: "Sara M.", role: "Storyteller", text: "The global distribution is real. Seeing my name on Amazon next to international authors was a dream come true." }
                        ].map((item, i) => (
                            <div key={i} className="p-10 bg-ivory border luxury-border rounded-sm space-y-6 hover:shadow-xl transition-all">
                                <Quote className="w-8 h-8 text-gold-main opacity-30" />
                                <p className="font-cormorant text-xl italic text-slate-700 leading-relaxed">"{item.text}"</p>
                                <div className="pt-6 border-t luxury-border">
                                    <p className="font-cinzel text-xs tracking-widest text-obsidian">{item.name}</p>
                                    <p className="font-inter text-[9px] uppercase tracking-widest text-slate-400 mt-1">{item.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- QUOTE SECTION --- */}
            <section className="py-40 bg-white italic text-center">
                <div className="container mx-auto px-6">
                    <Quote className="w-10 h-10 text-gold-main mx-auto mb-12 opacity-30" />
                    <p className="font-cormorant text-3xl md:text-5xl max-w-4xl mx-auto leading-tight text-obsidian">
                        "Your pain is a petal, <br /> and your healing is the nectar."
                    </p>
                </div>
            </section>

            {/* --- CALL TO ACTION (Obsidian & Gold) --- */}
            <section className="py-32 bg-obsidian text-white relative overflow-hidden">
                {/* Decorative background texture */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]" />
                
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="space-y-6"
                        >
                            <h2 className="font-cinzel text-5xl md:text-7xl font-bold tracking-tight">
                                BECOME <br className="md:hidden" /> <span className="gold-shimmer">IMMORTAL</span>
                            </h2>
                            <div className="w-24 h-px bg-gold-dark mx-auto" />
                            <p className="font-cinzel text-xs tracking-[0.4em] uppercase text-slate-500">First Edition Submissions Closing Soon</p>
                        </motion.div>

                        <div className="flex flex-col items-center gap-8">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => router.push('/anthology/honey-and-hurt/register')}
                                className="gold-button px-16 py-6 rounded-full font-cinzel font-bold text-sm tracking-[0.4em] uppercase"
                            >
                                Start Your Journey
                            </motion.button>
                            
                            <div className="flex gap-12 text-slate-500 pt-8">
                                <div className="text-center">
                                    <p className="font-cinzel text-xl text-white">400+</p>
                                    <p className="font-cinzel text-[8px] tracking-widest uppercase">Authors Worldwide</p>
                                </div>
                                <div className="w-px h-10 bg-slate-800" />
                                <div className="text-center">
                                    <p className="font-cinzel text-xl text-white">15 Days</p>
                                    <p className="font-cinzel text-[8px] tracking-widest uppercase">To Launch</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="py-20 bg-ivory border-t luxury-border">
                <div className="container mx-auto px-6 text-center space-y-8">
                    <p className="font-cinzel text-2xl tracking-[0.4em] text-obsidian uppercase">Inkfetish</p>
                    <div className="flex justify-center gap-8 font-cinzel text-[10px] tracking-widest uppercase text-slate-400">
                        <button className="hover:text-gold-main transition-colors">Instagram</button>
                        <button className="hover:text-gold-main transition-colors">Privacy</button>
                        <button className="hover:text-gold-main transition-colors">Terms</button>
                    </div>
                    <p className="font-inter text-[9px] tracking-[0.2em] text-slate-400 uppercase">
                        © 2026 Inkfetish Publishing. Crafted for the Gilded Soul.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default HoneyAndHurtClient;
