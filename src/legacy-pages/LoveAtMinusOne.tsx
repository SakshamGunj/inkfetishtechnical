import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Heart, PenTool, BookOpen, Feather, Sparkles, CheckCircle2, Globe, Layout, Barcode, Coins, Linkedin, Users, Crown, Calendar, ShoppingBag, Truck, Zap, Star, Search, Rocket, MessageCircle, Video, Award, Instagram, BadgeCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoveAtMinusOne = () => {
    const navigate = useNavigate();

    // Snowflake effect state
    const [snowflakes, setSnowflakes] = useState<number[]>([]);
    const [expandedCard, setExpandedCard] = useState<number | null>(null);

    useEffect(() => {
        // Prevent white flash by syncing body background
        const originalHtmlBg = document.documentElement.style.backgroundColor;
        const originalBodyBg = document.body.style.backgroundColor;

        document.documentElement.style.backgroundColor = '#f8fafc'; // slate-50
        document.body.style.backgroundColor = '#f8fafc'; // slate-50

        window.scrollTo(0, 0);
        setSnowflakes(Array.from({ length: 50 }).map((_, i) => i));

        return () => {
            document.documentElement.style.backgroundColor = originalHtmlBg;
            document.body.style.backgroundColor = originalBodyBg;
        };
    }, []);

    // Marquee Images Configuration
    const row1Images = [
        "https://i.ibb.co/PZk5Qnmt/Whats-App-Image-2025-12-25-at-2-27-03-AM-2.jpg",
        "https://i.ibb.co/mCH1WTBD/Whats-App-Image-2025-12-25-at-2-27-03-AM-1.jpg",
        "https://i.ibb.co/Hfkbvxr6/Whats-App-Image-2025-12-25-at-2-27-03-AM.jpg",
        "https://i.ibb.co/RG1w4d3V/Whats-App-Image-2025-12-25-at-2-27-04-AM.jpg",
        "https://i.ibb.co/TDqbdSkj/Whats-App-Image-2025-12-08-at-6-39-25-PM.jpg",
    ];
    // Quadruple for smooth loop
    const row1 = [...row1Images, ...row1Images, ...row1Images, ...row1Images];

    const row2Images = [
        "https://i.ibb.co/Y4zN8Rp0/Whats-App-Image-2025-12-08-at-6-39-26-PM-2.jpg",
        "https://i.ibb.co/tThTSLWq/Whats-App-Image-2025-12-08-at-6-39-26-PM-1.jpg",
        "https://i.ibb.co/pvmGYjk2/Whats-App-Image-2025-12-08-at-6-39-26-PM.jpg",
        "https://i.ibb.co/XfLjmGvj/Whats-App-Image-2025-12-08-at-6-39-27-PM.jpg",
    ];
    // Quadruple for smooth loop
    const row2 = [...row2Images, ...row2Images, ...row2Images, ...row2Images];

    const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap');
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-lato { font-family: 'Lato', sans-serif; }
        
        @keyframes snowfall {
            0% { transform: translateY(-10vh) translateX(0); opacity: 1; }
            100% { transform: translateY(110vh) translateX(20px); opacity: 0; }
        }
        .snowflake {
            position: fixed;
            top: -10px;
            color: #93c5fd;
            font-size: 1em;
            font-family: Arial;
            text-shadow: 0 0 1px #000;
            animation-name: snowfall;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            z-index: 0;
            pointer-events: none;
        }

        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
        }
        @keyframes marquee-reverse {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(0); }
        }
        .animate-marquee {
            animation: marquee 40s linear infinite;
        }
        .animate-marquee-reverse {
            animation: marquee-reverse 40s linear infinite;
        }
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        .animate-float {
            animation: float 3s ease-in-out infinite;
        }
    `;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-serif selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
            <Helmet>
                <title>Love at Minus One | Winter Anthology Launch</title>
                <style>{styles}</style>
            </Helmet>

            {/* Snow Effect */}
            {snowflakes.map((i) => (
                <div
                    key={i}
                    className="snowflake opacity-20"
                    style={{
                        left: `${(i * 1.9) % 100}%`,
                        animationDuration: `${Math.random() * 5 + 5}s`,
                        animationDelay: `${Math.random() * 5}s`,
                        fontSize: `${Math.random() * 10 + 10}px`
                    }}
                >
                    ❄
                </div>
            ))}

            {/* --- TOP BAR --- */}
            <div className="bg-slate-900 text-slate-50 py-2.5 text-center font-lato text-[10px] md:text-sm tracking-widest uppercase sticky top-0 z-50 shadow-md px-4">
                <span className="flex items-center justify-center gap-2 max-w-xs mx-auto md:max-w-none leading-tight">
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-blue-300 shrink-0" />
                    From Manuscript to Globally Published Author in 15 Days
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-blue-300 shrink-0" />
                </span>
            </div>

            {/* --- HERO SECTION --- */}
            <section className="relative min-h-screen flex items-center pt-8 pb-20 px-6 overflow-hidden">
                {/* Background Gradients - Strictly Contained */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/50 to-white" />
                    <div className="absolute top-0 right-0 w-[80vw] md:w-[50vw] h-[80vw] md:h-[50vw] bg-blue-100/50 rounded-full blur-[80px] md:blur-[120px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[60vw] md:w-[40vw] h-[60vw] md:h-[40vw] bg-indigo-100/50 rounded-full blur-[70px] md:blur-[100px] translate-y-1/2 -translate-x-1/2" />
                </div>

                <div className="container mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="space-y-6 text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-white font-lato text-xs font-bold tracking-widest uppercase mb-2 shadow-lg">
                            <Feather className="w-3 h-3" /> Official Invitation
                        </div>

                        <div className="space-y-1">
                            <p className="font-playfair text-lg md:text-xl text-slate-600 italic">This Winter, we are launching...</p>
                            <h1 className="font-cinzel text-4xl md:text-7xl font-black text-slate-900 leading-[1.1] drop-shadow-sm">
                                Love at <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                    Minus One
                                </span>
                            </h1>
                            <p className="font-cinzel text-xl md:text-2xl text-slate-400 font-bold uppercase tracking-[0.3em] mt-1">Anthology</p>
                        </div>

                        <div className="space-y-4 py-6 border-t border-b border-slate-200 backdrop-blur-sm bg-white/30 rounded-xl p-4 md:p-0 md:bg-transparent md:border-0">
                            <h3 className="font-lato font-bold text-slate-900 text-lg">
                                Your opportunity to become a <span className="text-blue-600">Published Co-Author</span>.
                            </h3>
                            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">
                                🗓️ On 15th Feb on Exclusive Zoom Live Event
                            </p>

                        </div>

                        {/* Progress Bar Card */}
                        <div className="bg-white border border-blue-100 p-4 rounded-xl shadow-lg inline-block w-full max-w-md">
                            <div className="flex justify-between items-center text-sm font-bold text-slate-700 mb-2 font-lato uppercase tracking-wider">
                                <span>132 writers joined</span>
                                <span className="text-red-500 flex items-center gap-1"><Sparkles className="w-3 h-3" /> Only 68 spots left</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 w-[66%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)]" />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                            <button
                                onClick={() => navigate('/love-at-minus-one/register')}
                                className="px-8 py-5 bg-slate-900 text-white font-cinzel font-bold tracking-widest uppercase hover:bg-blue-900 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 w-full sm:w-auto rounded-sm flex items-center justify-center gap-3 relative overflow-hidden group"
                            >
                                <span className="relative z-10">Yes, I want to be a Co-Author</span>
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-4 text-xs font-lato text-slate-500 uppercase tracking-wider max-w-sm mx-auto lg:mx-0">
                            <div className="flex items-center justify-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-100 shadow-sm hover:border-blue-200 transition-colors">
                                <CheckCircle2 className="w-4 h-4 text-blue-500" /> Legitimate ISBN
                            </div>
                            <div className="flex items-center justify-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-100 shadow-sm hover:border-blue-200 transition-colors">
                                <CheckCircle2 className="w-4 h-4 text-blue-500" /> Global Dist.
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Book Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative mx-auto lg:mx-0"
                    >
                        {/* Book Mockup Container */}
                        <div className="relative w-[300px] md:w-[380px] aspect-[2/3] mx-auto perspective-1000 group">
                            {/* Floating Benefit Cards */}
                            {[
                                { text: "Be part of upcoming bestseller", classes: "top-[-30px] -left-2 md:top-10 md:-left-20", delay: 0 },
                                { text: "Get official author website", classes: "top-[-20px] -right-2 md:top-20 md:-right-20", delay: 1 },
                                { text: "Get published in 15 days", classes: "bottom-[-30px] -left-2 md:bottom-32 md:-left-16", delay: 2 },
                                { text: "Massive distribution to 199k followers", classes: "bottom-[-20px] -right-2 md:bottom-10 md:-right-16", delay: 3 }
                            ].map((card, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, delay: card.delay, repeat: Infinity, ease: "easeInOut" }}
                                    className={`absolute ${card.classes} z-20 bg-white/90 backdrop-blur-md px-3 py-2 md:px-4 md:py-3 rounded-xl shadow-xl border border-blue-100 flex items-center gap-2 md:gap-3 min-w-[140px] md:min-w-[180px] max-w-[160px] md:max-w-[200px]`}
                                >
                                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
                                    </div>
                                    <p className="text-[9px] md:text-[10px] font-bold text-slate-800 leading-tight">{card.text}</p>
                                </motion.div>
                            ))}

                            <div className="absolute inset-0 bg-white rounded-r-lg shadow-2xl transform rotate-y-[-15deg] transition-transform duration-700 group-hover:rotate-y-[0deg] border-l-4 border-slate-200 z-10">
                                {/* Actual Cover Image */}
                                <img
                                    src="/images/love-at-minus-one-cover.webp"
                                    alt="Love at Minus One Book Cover"
                                    className="w-full h-full object-cover rounded-r-lg shadow-inner"
                                />
                                {/* Sheen Effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/30 rounded-r-lg pointer-events-none" />

                                {/* Verified Seal */}
                                <div className="absolute bottom-4 right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                    <div className="text-center text-white text-[8px] font-bold uppercase leading-tight font-lato">
                                        Editor's<br />Choice<br />2024
                                    </div>
                                </div>
                            </div>

                            {/* Shadow/Reflection */}
                            <div className="absolute -bottom-10 left-8 right-8 h-6 bg-black/20 blur-xl rounded-[100%]" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- SOCIAL TRUST & MISSION BAR --- */}
            <section className="py-8 bg-white border-b border-slate-100 relative z-20 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">

                        {/* Instagram Milestone */}
                        <div className="flex items-center gap-4 group">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-[2px] shadow-lg group-hover:scale-105 transition-transform duration-500 hover:shadow-indigo-500/20 shrink-0">
                                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                                    <Instagram className="w-7 h-7 md:w-8 md:h-8 text-[#dc2743]" />
                                </div>
                            </div>
                            <div className="space-y-0.5 text-left">
                                <div className="flex items-center gap-2">
                                    <span className="font-cinzel font-black text-xl md:text-2xl text-slate-900 tracking-tight">INKFETISH</span>
                                    <BadgeCheck className="w-5 h-5 md:w-6 md:h-6 text-blue-500 fill-blue-500/10" />
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md text-[9px] md:text-[10px] font-black uppercase tracking-widest border border-blue-100">199K+ Followers</span>
                                    <span className="text-slate-400 text-[10px] md:text-xs font-medium italic">India's Leading Writing Community</span>
                                </div>
                            </div>
                        </div>

                        {/* Mission Statement */}
                        <div className="flex-1 max-w-xl text-center md:text-left border-l-0 md:border-l border-slate-100 md:pl-10">
                            <p className="text-slate-600 font-playfair text-sm md:text-lg leading-relaxed px-2 md:px-0">
                                "We are launching this initiative to give <span className="text-slate-900 font-bold decoration-blue-500/30 underline decoration-2 underline-offset-4">your words a real book platform</span>. Helping writers evolve from social media posts into globally recognized authors."
                            </p>
                            <div className="flex items-center justify-center md:justify-start gap-2 mt-3">
                                <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-emerald-500" />
                                <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Official Registered Company</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- WHAT YOU GET (BENEFITS: ORBIT + GRID) --- */}
            <section className="py-24 bg-slate-50 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 space-y-4">
                        <span className="text-blue-600 font-bold tracking-[0.2em] text-xs uppercase">
                            The Privileges
                        </span>
                        <h2 className="font-cinzel text-3xl md:text-5xl font-bold text-slate-900">
                            Benefits You Will Get as a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Co-Author</span>
                        </h2>
                        <p className="font-playfair text-slate-600 text-lg max-w-2xl mx-auto italic">
                            Transform from a writer into a published author with a suite of premium privileges designed to immortalize your words.
                        </p>
                    </div>

                    {/* ORBIT SECTION (Top 3) */}
                    <div className="relative min-h-[280px] md:min-h-[500px] flex items-center justify-center mb-12 md:mb-20 origin-center overflow-visible px-4">
                        {/* Background Animated Rings - Ultra Compact */}
                        <div className="absolute w-[200px] h-[200px] md:w-[380px] md:h-[380px] border border-blue-200/40 rounded-full animate-spin-slow" />
                        <div className="absolute w-[280px] h-[280px] md:w-[520px] md:h-[520px] border border-blue-100/20 rounded-full animate-spin-slow delay-75" />

                        {/* Central Element (Book) */}
                        <div className="relative z-10 w-24 h-24 md:w-36 md:h-36 bg-slate-900 rounded-full flex flex-col items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.3)] border-4 border-slate-800 text-center p-2">
                            <Sparkles className="w-6 h-6 md:w-10 md:h-10 text-[#FFD700] animate-pulse mb-1" />
                            <span className="text-white font-cinzel font-bold text-[8px] md:text-xs uppercase tracking-widest leading-tight">Core<br />Benefits</span>
                            <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-ping opacity-20" />
                        </div>

                        {/* Orbiting Satellites (4 Items - Circular & Tight) */}
                        <div className="absolute inset-0 pointer-events-none">
                            {/* 1. Get Published (Top) */}
                            <div className="absolute z-20 left-1/2 top-1/2 -ml-[56px] -mt-[56px] md:-ml-[80px] md:-mt-[80px] -translate-y-[135px] md:-translate-y-[210px] pointer-events-auto hover:z-50 transition-transform duration-300">
                                <div className="w-28 h-28 md:w-40 md:h-40 p-4 bg-slate-900/95 backdrop-blur-md rounded-full border border-blue-500/40 shadow-2xl hover:scale-110 hover:bg-slate-800 transition-all duration-300 group flex flex-col items-center justify-center text-center cursor-default">
                                    <div className="w-7 h-7 md:w-10 md:h-10 mx-auto bg-blue-600 rounded-lg flex items-center justify-center mb-1 shadow-lg">
                                        <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                    </div>
                                    <h3 className="text-white font-cinzel font-bold text-[10px] md:text-xs tracking-wider leading-tight">Get<br />Published</h3>
                                </div>
                            </div>

                            {/* 2. Get Author Website (Right) */}
                            <div className="absolute z-20 left-1/2 top-1/2 -ml-[56px] -mt-[56px] md:-ml-[80px] md:-mt-[80px] translate-x-[115px] md:translate-x-[210px] pointer-events-auto hover:z-50 transition-transform duration-300">
                                <div className="w-28 h-28 md:w-40 md:h-40 p-4 bg-slate-900/95 backdrop-blur-md rounded-full border border-blue-500/40 shadow-2xl hover:scale-110 hover:bg-slate-800 transition-all duration-300 group flex flex-col items-center justify-center text-center cursor-default">
                                    <div className="w-7 h-7 md:w-10 md:h-10 mx-auto bg-indigo-600 rounded-lg flex items-center justify-center mb-1 shadow-lg">
                                        <Layout className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                    </div>
                                    <h3 className="text-white font-cinzel font-bold text-[10px] md:text-xs tracking-wider leading-tight">Get Author<br />Website</h3>
                                </div>
                            </div>

                            {/* 3. Amazon & Flipkart (Bottom) */}
                            <div className="absolute z-20 left-1/2 top-1/2 -ml-[56px] -mt-[56px] md:-ml-[80px] md:-mt-[80px] translate-y-[135px] md:translate-y-[210px] pointer-events-auto hover:z-50 transition-transform duration-300">
                                <div className="w-28 h-28 md:w-40 md:h-40 p-4 bg-slate-900/95 backdrop-blur-md rounded-full border border-blue-500/40 shadow-2xl hover:scale-110 hover:bg-slate-800 transition-all duration-300 group flex flex-col items-center justify-center text-center cursor-default">
                                    <div className="w-7 h-7 md:w-10 md:h-10 mx-auto bg-violet-600 rounded-lg flex items-center justify-center mb-1 shadow-lg">
                                        <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                    </div>
                                    <h3 className="text-white font-cinzel font-bold text-[10px] md:text-xs tracking-wider leading-tight">Amazon &<br />Flipkart</h3>
                                </div>
                            </div>

                            {/* 4. 199k Dist & Mktg (Left) */}
                            <div className="absolute z-20 left-1/2 top-1/2 -ml-[56px] -mt-[56px] md:-ml-[80px] md:-mt-[80px] -translate-x-[115px] md:-translate-x-[210px] pointer-events-auto hover:z-50 transition-transform duration-300">
                                <div className="w-28 h-28 md:w-40 md:h-40 p-4 bg-slate-900/95 backdrop-blur-md rounded-full border border-blue-500/40 shadow-2xl hover:scale-110 hover:bg-slate-800 transition-all duration-300 group flex flex-col items-center justify-center text-center cursor-default">
                                    <div className="w-7 h-7 md:w-10 md:h-10 mx-auto bg-rose-600 rounded-lg flex items-center justify-center mb-1 shadow-lg">
                                        <Users className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                    </div>
                                    <h3 className="text-white font-cinzel font-bold text-[10px] md:text-xs tracking-wider leading-tight">199K Dist.<br />& Mktg.</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* GRID SECTION (Expandable Premium Cards) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center max-w-7xl mx-auto px-4">
                        {[
                            {
                                title: "Published Author Status",
                                subtitle: "Credential",
                                desc: "Your name becomes searchable on Amazon as a published author forever. This is a real credential you can use on LinkedIn, resumes, and portfolios.",
                                icon: BookOpen,
                                color: "blue"
                            },
                            {
                                title: "Personal Author Website",
                                subtitle: "Digital Portfolio",
                                desc: "You get your own professional author website (yourname.inkfetish.com) with your bio, published work, and contact form—yours to keep permanently.",
                                icon: Layout,
                                color: "indigo"
                            },
                            {
                                title: "Amazon Distribution",
                                subtitle: "Global Reach",
                                desc: "Your work is published on Amazon with an official ISBN number, making it a legitimate publication recognized globally.",
                                icon: ShoppingBag,
                                color: "violet"
                            },
                            {
                                title: "Massive Social Proof",
                                subtitle: "199K Exposure",
                                desc: "When you're selected, your work gets announced to Inkfetish's 199K Instagram followers—instant exposure to an engaged writing community.",
                                icon: Users,
                                color: "rose"
                            },
                            {
                                title: "Professional Book Quality",
                                subtitle: "Premium Production",
                                desc: "Premium cover design, high-quality interior layout, and proper printing—your name appears in a book that looks and feels professional.",
                                icon: Sparkles,
                                color: "amber"
                            },
                            {
                                title: "Author Bio Page",
                                subtitle: "Featured Profile",
                                desc: "You get a dedicated author page in the book with your photo, bio, and story—not just your work, but recognition of YOU as the writer.",
                                icon: Feather,
                                color: "emerald"
                            }
                        ].map((card, i) => (
                            <motion.div
                                key={i}
                                layout
                                onClick={() => setExpandedCard(expandedCard === i ? null : i)}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ layout: { duration: 0.4, type: "spring", stiffness: 100, damping: 15 } }}
                                className={`relative group rounded-[2rem] p-8 flex flex-col items-center justify-start text-center cursor-pointer overflow-hidden border shadow-[0_15px_35px_rgba(0,0,0,0.3)] bg-gradient-to-b from-slate-800 to-slate-900 ${expandedCard === i
                                    ? 'border-[#FFD700]/50 shadow-[0_25px_60px_rgba(0,0,0,0.6)]'
                                    : 'h-[260px] border-[#FFD700]/20 hover:border-[#FFD700]/40 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
                                    }`}
                            >
                                {/* Animated Glow Overlay (Always active, stronger on hover) */}
                                <div className={`absolute -inset-2 bg-gradient-to-r from-blue-500/0 via-[#FFD700]/5 to-purple-500/0 ${expandedCard === i ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-700 blur-2xl`} />

                                {/* Icon blooming container */}
                                <div className="relative mb-6 shrink-0">
                                    <div className={`absolute inset-0 bg-blue-500/20 blur-2xl rounded-full ${expandedCard === i ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-500`} />
                                    <div className={`w-16 h-16 rounded-2xl bg-slate-950 border flex items-center justify-center relative z-10 transition-all duration-500 shadow-2xl ${expandedCard === i ? 'border-[#FFD700]/70 ring-4 ring-[#FFD700]/10 scale-105' : 'border-[#FFD700]/30 group-hover:scale-110 group-hover:border-[#FFD700]/50 ring-2 ring-white/5'}`}>
                                        <card.icon className={`w-8 h-8 transition-colors duration-300 ${expandedCard === i ? 'text-[#FFD700]' : 'text-[#FFD700]/80 group-hover:text-[#FFD700]'}`} />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="relative z-10 w-full">
                                    <span className="text-[#FFD700]/80 font-cinzel text-[10px] font-bold uppercase tracking-[0.3em] block mb-3 group-hover:text-[#FFD700] transition-colors">
                                        {card.subtitle}
                                    </span>
                                    <h3 className="font-cinzel text-xl md:text-2xl font-bold text-white mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-200 transition-all">
                                        {card.title}
                                    </h3>

                                    {/* Elastic Expansion */}
                                    <AnimatePresence>
                                        {(expandedCard === i) && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.3, ease: "easeOut" }}
                                                className="text-slate-300 font-lato text-base leading-relaxed border-t border-white/10 pt-6 mt-4 text-left"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] mt-2 shrink-0 animate-pulse" />
                                                    <p>{card.desc}</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {expandedCard !== i && (
                                        <div className="flex items-center justify-center gap-2 mt-6">
                                            <div className="h-[1px] w-4 bg-[#FFD700]/20" />
                                            <div className="text-[10px] text-slate-400 font-cinzel uppercase tracking-[0.2em] animate-pulse group-hover:text-slate-200">
                                                Explore Impact
                                            </div>
                                            <div className="h-[1px] w-4 bg-[#FFD700]/20" />
                                        </div>
                                    )}
                                </div>

                                {/* Decoration Corner */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#FFD700]/5 to-transparent pointer-events-none" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- ABOUT THE BOOK --- */}
            <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />

                <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-blue-400 font-bold tracking-widest uppercase text-xs mb-4 block">OFFICIAL PUBLISHER INVITATION • PREMIER SERIES</span>
                        <h2 className="font-cinzel text-4xl md:text-5xl font-bold leading-tight mb-8">
                            About Anthology
                        </h2>
                        <div className="space-y-6 font-playfair text-lg text-blue-100/80 leading-relaxed">
                            <p>
                                <strong className="text-white">Love at Minus One</strong> is a winter‑themed poetry and prose anthology about love after it breaks, the empty space, the "minus one" that remains in your life. It brings together honest, modern voices writing about heartbreak, distance, almost‑love, and healing in a way that feels real and relatable.
                            </p>
                            <p>
                                This book is for writers and readers who feel deeply, who have loved, lost, and still want to put those feelings into words. Bilingual (Hindi–English) and English pieces are welcome, so you can write in the voice that feels true to you.
                            </p>
                            <p>
                                As a contributor, you are not just "sending a piece"; you are stepping in as an <strong className="text-blue-300">author</strong> in a carefully curated, high‑quality project that respects both your emotions and your craft.
                            </p>
                        </div>
                        <div className="mt-8">
                            <h3 className="font-cinzel text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">Themes of the Anthology</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300">
                                        <Heart className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-cinzel text-white tracking-widest uppercase">Love</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300">
                                        <Zap className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-cinzel text-white tracking-widest uppercase">Heartbreak</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300">
                                        <Globe className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-cinzel text-white tracking-widest uppercase">Distance</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300">
                                        <Sparkles className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-cinzel text-white tracking-widest uppercase">Healing</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Premium Collage */}
                    <div className="relative h-[600px] w-full grid grid-cols-12 grid-rows-12 gap-4">
                        {/* Main Image (Rose) - Left Vertical */}
                        <div className="col-span-12 md:col-span-7 row-span-6 md:row-span-12 relative rounded-2xl overflow-hidden group shadow-2xl border border-white/10">
                            <img
                                src="/images/love_minus_one_collage_1_1767182636843.webp"
                                alt="Frozen Rose"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                            <div className="absolute bottom-6 left-6">
                                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 inline-flex items-center gap-2">
                                    <Heart className="w-3 h-3 text-red-400 fill-red-400" />
                                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">Emotional Depth</span>
                                </div>
                            </div>
                        </div>

                        {/* Top Right (Letter) */}
                        <div className="col-span-6 md:col-span-5 row-span-6 relative rounded-2xl overflow-hidden group shadow-2xl border border-white/10">
                            <img
                                src="/images/love_minus_one_collage_2_1767182655830.webp"
                                alt="Vintage Letter"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors duration-300" />
                        </div>

                        {/* Bottom Right (Heart) */}
                        <div className="col-span-6 md:col-span-5 row-span-6 relative rounded-2xl overflow-hidden group shadow-2xl border border-white/10">
                            <img
                                src="/images/love_minus_one_collage_3_1767182674795.webp"
                                alt="Crystal Heart"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors duration-300" />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- EXCLUSIVE PRIVILEGES BAR --- */}
            <section className="py-20 bg-slate-950 relative overflow-hidden border-y border-white/5">
                {/* Background Glows */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[100px]" />

                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    <div className="text-center mb-12">
                        <span className="font-cinzel text-blue-400 text-sm tracking-[0.2em] uppercase">Unmatched Value</span>
                        <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-white mt-2">Exclusive <span className="text-[#FFD700]">Privileges</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Privilege 1: Certificate */}
                        <div className="group relative bg-slate-900/50 backdrop-blur-sm p-8 rounded-3xl border border-blue-500/30 hover:border-blue-400/60 transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-blue-500/20 transition-colors" />

                            <div className="relative w-20 h-20 shrink-0">
                                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full group-hover:bg-blue-500/30 transition-colors" />
                                <div className="relative w-full h-full bg-slate-900 border border-blue-500/50 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                                    <Award className="w-10 h-10 text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
                                </div>
                            </div>

                            <div className="relative z-10">
                                <h4 className="text-white font-cinzel font-bold text-xl tracking-wide mb-2 group-hover:text-blue-200 transition-colors">Official E-Certificate</h4>
                                <p className="text-slate-400 text-sm leading-relaxed font-lato group-hover:text-slate-300 transition-colors">
                                    You don't just write; you <span className="text-blue-400 font-semibold italic">earn</span> your place in history. Receive a prestigious, verified digital certificate honoring your official selection as a published co-author.
                                </p>
                            </div>
                        </div>

                        {/* Privilege 2: Discount */}
                        <div className="group relative bg-slate-900/50 backdrop-blur-sm p-8 rounded-3xl border border-amber-500/30 hover:border-amber-400/60 transition-all duration-500 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)] flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-amber-500/20 transition-colors" />

                            <div className="relative w-20 h-20 shrink-0">
                                <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full group-hover:bg-amber-500/30 transition-colors" />
                                <div className="relative w-full h-full bg-slate-900 border border-amber-500/50 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                                    <Coins className="w-10 h-10 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                                </div>
                            </div>

                            <div className="relative z-10">
                                <h4 className="text-white font-cinzel font-bold text-xl tracking-wide mb-2 group-hover:text-amber-200 transition-colors">₹10,000 Career Credit</h4>
                                <p className="text-slate-400 text-sm leading-relaxed font-lato group-hover:text-slate-300 transition-colors">
                                    Your journey doesn't end here. Unlock an exclusive <span className="text-amber-400 font-bold">₹10,000 Scholarship Credit</span> to launch your own solo book with <span className="italic text-amber-200">Inkfetish</span>—because the world deserves your full story.
                                </p>
                            </div>
                        </div>

                        {/* --- NEW: PROFESSIONAL AUTHOR WEBSITE --- */}
                        <div className="group relative bg-slate-900/50 backdrop-blur-sm p-8 rounded-3xl border border-blue-500/30 hover:border-blue-400/60 transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 overflow-hidden md:col-span-2">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-blue-500/20 transition-colors" />

                            <div className="relative w-20 h-20 shrink-0">
                                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full group-hover:bg-blue-500/30 transition-colors" />
                                <div className="relative w-full h-full bg-slate-900 border border-blue-500/50 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                                    <img
                                        src="/images/author_website_icon_gold.png"
                                        alt="Author Website"
                                        className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                    />
                                </div>
                            </div>

                            <div className="relative z-10">
                                <h4 className="text-white font-cinzel font-bold text-xl tracking-wide mb-2 group-hover:text-blue-200 transition-colors">Professional Author Website</h4>
                                <p className="text-slate-400 text-sm leading-relaxed font-lato group-hover:text-slate-300 transition-colors">
                                    Get your <span className="text-blue-400 font-bold">Personal Professional Author Website</span> to showcase to your friends and family. Add it to your bio. It will be your personal profile with your custom domain.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- CTA 1: JOIN AS CO-AUTHOR --- */}
                <div className="container mx-auto px-6 max-w-4xl mt-16 text-center relative z-20">
                    <h3 className="font-cinzel text-xl text-blue-200 mb-6 tracking-widest uppercase">Join as a Co-Author Today</h3>
                    <button
                        onClick={() => navigate('/love-at-minus-one/register')}
                        className="px-4 py-3 md:px-10 md:py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-cinzel font-bold text-xs md:text-lg tracking-[0.15em] uppercase rounded-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                    >
                        Click to Become Part of This Anthology
                    </button>
                </div>
            </section>

            {/* --- PROCESS TIMELINE (REDESIGNED) --- */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                        {/* Image Content (Left on Desktop for visual balance) */}
                        <div className="lg:w-1/2 relative group order-2 lg:order-1">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-amber-400/20 to-blue-600/20 rounded-[2rem] blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white transform group-hover:scale-[1.01] transition-transform duration-700">
                                <img
                                    src="/images/journey_roadmap.webp"
                                    alt="Writer's Journey Roadmap"
                                    className="w-full h-auto object-cover"
                                />
                                {/* Floating Badge */}
                                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-100 animate-float" style={{ animationDelay: '1s' }}>
                                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center border border-amber-200">
                                        <Star className="w-5 h-5 text-amber-600 fill-amber-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm leading-tight">Fast-Track</p>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">15 Days to Publish</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="lg:w-1/2 order-1 lg:order-2">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-200 mb-8 w-fit">
                                <Rocket className="w-4 h-4 text-blue-600" />
                                <span className="text-slate-600 font-bold text-xs uppercase tracking-widest">Your Pathway</span>
                            </div>

                            <h2 className="font-cinzel text-4xl lg:text-5xl font-bold text-slate-900 mb-2 leading-tight">
                                Your 15-Day <span className="text-blue-600">Journey</span>
                            </h2>
                            <p className="font-playfair text-slate-500 text-lg mb-10 italic">From Submission to Publication</p>

                            <div className="space-y-8 relative">
                                {/* Vertical Line */}
                                <div className="absolute left-[22px] top-4 bottom-8 w-0.5 bg-gradient-to-b from-blue-200 via-blue-100 to-transparent" />

                                {[
                                    { step: "01", title: "Apply Now", desc: "Click the 'Register Now' button and fill out the application form carefully with your best work.", icon: PenTool },
                                    { step: "02", title: "Review & Contact", desc: "Sherin or our team will review your application and personally contact you via WhatsApp/Email.", icon: MessageCircle },
                                    { step: "03", title: "Seat Booking", desc: "We will share the full joining details and guide you through the official seat booking process.", icon: Users },
                                    { step: "04", title: "Publication", desc: "Once your slot is booked, we begin the journey to make you a published author.", icon: Feather }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 relative group/step">
                                        <div className="relative z-10 w-11 h-11 flex-shrink-0 bg-white border-2 border-blue-100 rounded-full flex items-center justify-center shadow-sm group-hover/step:border-blue-500 group-hover/step:scale-110 transition-all duration-300">
                                            <span className="font-cinzel font-bold text-slate-300 text-sm group-hover/step:text-blue-600 transition-colors">{item.step}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-lg mb-1 group-hover/step:text-blue-700 transition-colors">{item.title}</h3>
                                            <p className="text-slate-600 font-playfair text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- PRICING --- */}
            <section className="py-24 bg-blue-50/30">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-slate-900 mb-4">Choose Your Legacy Package</h2>
                        <p className="text-slate-500 font-lato uppercase tracking-widest text-sm">Limited Spots Available in Both Tiers</p>

                        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4 inline-block max-w-2xl mx-auto shadow-sm">
                            <p className="text-amber-800 text-sm font-lato leading-relaxed">
                                <span className="font-bold">Note:</span> You do not need to pay immediately. simply fill out the application form now. Our team will review your profile and contact you via WhatsApp or Email to share the official joining details.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        {/* Standard Tier */}
                        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group">
                            <h3 className="font-cinzel text-2xl font-bold text-slate-900 mb-2">Standard Author</h3>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-3xl font-bold text-slate-900">₹499</span>
                                <span className="text-sm text-slate-400 font-lato line-through">₹2,999</span>
                            </div>
                            <p className="text-slate-500 text-sm mb-8 font-lato leading-relaxed">Perfect for writers starting their publishing journey.</p>

                            <ul className="space-y-4 mb-8">
                                {[
                                    "Published in Anthology",
                                    "Official ISBN Assignment",
                                    "Amazon & Goodreads Listing",
                                    "Digital Author Certificate",
                                    "E-Appreciation Letter",
                                    "Lifetime Royalty Rights"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                                        <CheckCircle2 className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                                <li className="flex items-start gap-3 text-sm text-slate-600 bg-blue-50 p-2 rounded-lg -mx-2 border border-blue-100">
                                    <Globe className="w-4 h-4 text-blue-600 mt-1 shrink-0" />
                                    <span className="font-bold text-blue-800">Personal & Professional Author Website</span>
                                </li>
                            </ul>

                            <button
                                onClick={() => navigate('/love-at-minus-one/register')}
                                className="w-full py-4 border border-slate-900 text-slate-900 hover:bg-slate-50 font-cinzel font-bold tracking-widest uppercase rounded-lg transition-all text-sm"
                            >
                                Select Standard
                            </button>
                        </div>

                        {/* Premium Tier */}
                        <div className="bg-white rounded-2xl p-8 border-2 border-blue-500 shadow-2xl relative overflow-hidden transform md:-translate-y-4">
                            <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg tracking-widest uppercase">
                                Most Popular
                            </div>
                            <h3 className="font-cinzel text-2xl font-bold text-slate-900 mb-2">Premium Box</h3>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-4xl font-black text-blue-600">₹699</span>
                                <span className="text-sm text-slate-400 font-lato line-through">₹5,999</span>
                            </div>
                            <p className="text-slate-500 text-sm mb-8 font-lato leading-relaxed">The complete author experience with physical rewards.</p>

                            <ul className="space-y-4 mb-8">
                                {[
                                    "Everything in Standard",
                                    "Physical Book Delivered (Home)",
                                    "Framed Author Certificate",
                                    "Medal of Honor",
                                    "Writer's Portfolio Kit",
                                    "Printed Appreciation Letter"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-900">
                                        <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => navigate('/love-at-minus-one/register')}
                                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-cinzel font-bold tracking-widest uppercase rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all text-sm flex items-center justify-center gap-2"
                            >
                                Claim Premium Access <Sparkles className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- DISTRIBUTION SECTION (NEW) --- */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-4 block">Global Reach</span>
                            <h2 className="font-cinzel text-3xl md:text-5xl font-bold text-slate-900 mb-6"> Our Plan to Distribute the Book</h2>
                            <p className="font-playfair text-slate-600 text-lg leading-relaxed mb-8">
                                Your words deserve to be read by the world. We ensure your book travels far beyond local bookstores, reaching readers in over <strong className="text-slate-900">150+ countries</strong> through our massive distribution network.
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <h4 className="font-bold text-slate-900 text-3xl mb-1">5+</h4>
                                    <p className="text-xs text-slate-500 uppercase tracking-widest">Platform</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <h4 className="font-bold text-slate-900 text-3xl mb-1">100%</h4>
                                    <p className="text-xs text-slate-500 uppercase tracking-widest">Global Availability</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative min-h-[450px] md:min-h-[550px] flex items-center justify-center">
                            {/* Orbit Rings (Expanded) */}
                            <div className="absolute w-[280px] h-[280px] md:w-[380px] md:h-[380px] border border-blue-200/60 rounded-full animate-spin-slow" />
                            <div className="absolute w-[380px] h-[380px] md:w-[520px] md:h-[520px] border border-blue-100/40 rounded-full animate-spin-slow delay-100" />

                            {/* Central Text (Larger) */}
                            <div className="relative z-10 w-32 h-32 md:w-44 md:h-44 bg-white rounded-full flex flex-col items-center justify-center shadow-2xl border-4 md:border-8 border-blue-50 text-center p-6 transition-all duration-500 hover:scale-105">
                                <span className="text-slate-900 font-cinzel font-bold text-xs md:text-sm uppercase tracking-widest leading-tight">Major<br />Platforms</span>
                            </div>

                            {/* Orbiting Logos Container - Static Positioning but Responsive Orbit */}
                            <div className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] pointer-events-none">
                                {/* Amazon (Top) */}
                                <div className="absolute left-1/2 top-0 -ml-16 md:-ml-[88px] -mt-16 md:-mt-[88px] pointer-events-auto hover:scale-110 transition-transform animate-float">
                                    <div className="w-32 h-32 md:w-44 md:h-44 bg-white rounded-3xl shadow-lg border border-slate-100 flex items-center justify-center p-4 md:p-5">
                                        <img src="/images/dist_amazon.webp" alt="Amazon" className="w-full h-auto object-contain" />
                                    </div>
                                </div>

                                {/* Flipkart (Top Right) */}
                                <div className="absolute right-[5%] md:right-[0%] top-[15%] md:top-[10%] pointer-events-auto hover:scale-110 transition-transform animate-float" style={{ animationDelay: '0.5s' }}>
                                    <div className="w-32 h-32 md:w-44 md:h-44 bg-white rounded-3xl shadow-lg border border-slate-100 flex items-center justify-center p-4 md:p-5">
                                        <img src="/images/dist_flipkart.webp" alt="Flipkart" className="w-full h-auto object-contain" />
                                    </div>
                                </div>

                                {/* Goodreads (Bottom Right) */}
                                <div className="absolute right-[5%] md:right-[0%] bottom-[15%] md:bottom-[10%] pointer-events-auto hover:scale-110 transition-transform animate-float" style={{ animationDelay: '1s' }}>
                                    <div className="w-32 h-32 md:w-44 md:h-44 bg-white rounded-3xl shadow-lg border border-slate-100 flex items-center justify-center p-4 md:p-5">
                                        <img src="/images/dist_goodreads.webp" alt="Goodreads" className="w-full h-auto object-contain" />
                                    </div>
                                </div>

                                {/* Kindle (Bottom Left) */}
                                <div className="absolute left-[5%] md:left-[0%] bottom-[15%] md:bottom-[10%] pointer-events-auto hover:scale-110 transition-transform animate-float" style={{ animationDelay: '1.5s' }}>
                                    <div className="w-32 h-32 md:w-44 md:h-44 bg-white rounded-3xl shadow-lg border border-slate-100 flex items-center justify-center p-4 md:p-5">
                                        <img src="/images/dist_kindle.webp" alt="Kindle" className="w-full h-full object-contain rounded-2xl" />
                                    </div>
                                </div>

                                {/* Instagram (Top Left) */}
                                <div className="absolute left-[5%] md:left-[0%] top-[15%] md:top-[10%] pointer-events-auto hover:scale-110 transition-transform animate-float" style={{ animationDelay: '2s' }}>
                                    <div className="w-32 h-32 md:w-44 md:h-44 bg-white rounded-3xl shadow-lg border border-slate-100 flex items-center justify-center p-4 md:p-5">
                                        <img src="/images/dist_instagram.webp" alt="Instagram" className="w-full h-auto object-contain" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- LIVE CELEBRATION SECTION --- */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-blue-50/50 skew-x-12 transform origin-top-right pointer-events-none" />
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        {/* Text Content */}
                        <div className="lg:w-1/2 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/50 rounded-full border border-blue-200 mb-6 w-fit mx-auto lg:mx-0">
                                <Video className="w-4 h-4 text-blue-600 animate-pulse" />
                                <span className="text-blue-700 font-bold text-xs uppercase tracking-widest">Live Virtual Launch</span>
                            </div>

                            <h2 className="font-cinzel text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                                A Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Celebration</span>
                            </h2>

                            <p className="font-playfair text-slate-600 text-lg lg:text-xl leading-relaxed mb-8">
                                The <span className="italic font-semibold text-slate-800">Love at Minus One</span> anthology will be launched <strong className="text-slate-900">transparently</strong> in a massive live Zoom event.
                                Join <strong className="text-blue-600">200+ co-authors</strong> as we complete the official listing together in real-time—making it a fun, interactive, and historic celebration.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                                <div className="flex -space-x-4">
                                    {/* Avatars */}
                                    <div className="w-12 h-12 rounded-full border-2 border-white bg-slate-200 overflow-hidden"><img src="https://i.pravatar.cc/150?img=32" alt="" className="w-full h-full object-cover" /></div>
                                    <div className="w-12 h-12 rounded-full border-2 border-white bg-slate-200 overflow-hidden"><img src="https://i.pravatar.cc/150?img=12" alt="" className="w-full h-full object-cover" /></div>
                                    <div className="w-12 h-12 rounded-full border-2 border-white bg-slate-200 overflow-hidden"><img src="https://i.pravatar.cc/150?img=5" alt="" className="w-full h-full object-cover" /></div>
                                    <div className="w-12 h-12 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-lg relative z-10">+200</div>
                                </div>
                                <div className="text-center sm:text-left">
                                    <p className="font-bold text-slate-900 leading-tight">Authors & Readers</p>
                                    <p className="text-xs text-slate-500 uppercase tracking-widest">Joining Live Worldwide</p>
                                </div>
                            </div>
                        </div>

                        {/* Image Content */}
                        <div className="lg:w-1/2 relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform group-hover:-translate-y-2 transition-transform duration-700">
                                <img
                                    src="/images/zoom_launch_meeting.webp"
                                    alt="Live Zoom Launch"
                                    className="w-full h-auto object-cover"
                                />
                                {/* Floating Badge */}
                                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-6 py-3 rounded-xl shadow-xl flex items-center gap-4 border border-blue-50">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center p-2">
                                        <Video className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 leading-tight">Official Launch</p>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Hosted on Zoom</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- HALL OF FAME SLIDER (NEW) --- */}
            <section className="py-24 bg-slate-900 overflow-hidden border-y border-blue-900/50 relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6 mb-12 text-center relative z-10">
                    <h2 className="font-cinzel text-3xl md:text-5xl font-bold text-white mb-4">Hall of <span className="text-blue-500">Fame</span></h2>
                    <p className="font-playfair text-slate-400 italic">Witness the glory of our past champions.</p>
                </div>

                <div className="space-y-8 relative z-10">
                    {/* Row 1: Left to Right */}
                    <div className="flex overflow-hidden group gap-4 mask-gradient">
                        {/* Set 1 */}
                        <div className="flex gap-4 animate-marquee whitespace-nowrap min-w-full shrink-0 group-hover:[animation-play-state:paused]">
                            {row1.map((src, i) => (
                                <div key={`r1-s1-${i}`} className="h-64 md:h-80 w-auto shrink-0 rounded-xl overflow-hidden border-2 border-blue-500/30 relative group/card">
                                    <div className="absolute inset-0 bg-blue-900/20 group-hover/card:bg-transparent transition-colors z-10" />
                                    <img src={src} alt="Winner" className="h-full w-auto max-w-none object-contain transform hover:scale-105 transition-transform duration-700" />
                                </div>
                            ))}
                        </div>
                        {/* Set 2 (Duplicate for Seamless Loop) */}
                        <div className="flex gap-4 animate-marquee whitespace-nowrap min-w-full shrink-0 group-hover:[animation-play-state:paused]">
                            {row1.map((src, i) => (
                                <div key={`r1-s2-${i}`} className="h-64 md:h-80 w-auto shrink-0 rounded-xl overflow-hidden border-2 border-blue-500/30 relative group/card">
                                    <div className="absolute inset-0 bg-blue-900/20 group-hover/card:bg-transparent transition-colors z-10" />
                                    <img src={src} alt="Winner" className="h-full w-auto max-w-none object-contain transform hover:scale-105 transition-transform duration-700" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Row 2: Right to Left */}
                    <div className="flex overflow-hidden group gap-4 mask-gradient mt-8">
                        {/* Set 1 */}
                        <div className="flex gap-4 animate-marquee-reverse whitespace-nowrap min-w-full shrink-0 group-hover:[animation-play-state:paused] -translate-x-full">
                            {row2.map((src, i) => (
                                <div key={`r2-s1-${i}`} className="h-64 md:h-80 w-auto shrink-0 rounded-xl overflow-hidden border-2 border-blue-500/30 relative group/card">
                                    <div className="absolute inset-0 bg-blue-900/20 group-hover/card:bg-transparent transition-colors z-10" />
                                    <img src={src} alt="Winner" className="h-full w-auto max-w-none object-contain transform hover:scale-105 transition-transform duration-700" />
                                </div>
                            ))}
                        </div>
                        {/* Set 2 */}
                        <div className="flex gap-4 animate-marquee-reverse whitespace-nowrap min-w-full shrink-0 group-hover:[animation-play-state:paused] -translate-x-full">
                            {row2.map((src, i) => (
                                <div key={`r2-s2-${i}`} className="h-64 md:h-80 w-auto shrink-0 rounded-xl overflow-hidden border-2 border-blue-500/30 relative group/card">
                                    <div className="absolute inset-0 bg-blue-900/20 group-hover/card:bg-transparent transition-colors z-10" />
                                    <img src={src} alt="Winner" className="h-full w-auto max-w-none object-contain transform hover:scale-105 transition-transform duration-700" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CTA 2: HALL OF FAME CTA --- */}
            <section className="py-16 bg-slate-900 border-b border-blue-900/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/5" />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <div className="inline-block p-1 rounded-full bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 mb-8 w-full max-w-2xl mx-auto">
                        <div className="h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent w-full" />
                    </div>

                    <h3 className="font-cinzel text-2xl md:text-3xl text-white mb-8 font-bold">Ready to see your photo here next?</h3>

                    <button
                        onClick={() => navigate('/love-at-minus-one/register')}
                        className="group relative px-4 py-3 md:px-10 md:py-5 bg-white text-slate-900 font-cinzel font-bold text-xs md:text-lg tracking-[0.15em] uppercase rounded-lg shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Click to Become Part of This Anthology <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                </div>
            </section>

            {/* --- LEGACY & POWERED BY (INKFETISH) - WINTER THEME --- */}
            <section className="py-20 px-6 bg-slate-900 text-slate-50 relative overflow-hidden border-t border-blue-900/30">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-900/20 rounded-full blur-[120px]" />

                <div className="max-w-7xl mx-auto space-y-16 relative z-10">

                    {/* 1. Powered By */}
                    <div className="bg-slate-800/50 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-blue-500/20 flex flex-col md:flex-row items-center gap-10 md:gap-16 shadow-2xl">
                        {/* Logo Side */}
                        <div className="md:w-1/3 text-center">
                            <div className="w-32 h-32 md:w-48 md:h-48 mx-auto bg-white rounded-full flex items-center justify-center p-6 border-4 border-blue-100/10 shadow-[0_0_30px_rgba(59,130,246,0.2)] relative">
                                <div className="absolute inset-0 border border-blue-500/20 rounded-full animate-spin-slow" />
                                <img src="/images/inkfetish_logo.webp" alt="Inkfetish" className="w-full object-contain filter drop-shadow-lg" />
                            </div>
                            <div className="mt-6 font-cinzel text-blue-400 text-[10px] uppercase tracking-[0.2em] font-bold">Powered By</div>
                            <h3 className="font-cinzel text-2xl font-bold text-white mt-1">Inkfetish Publications</h3>
                        </div>

                        {/* Content Side */}
                        <div className="md:w-2/3 space-y-8 text-center md:text-left">
                            <p className="font-playfair text-blue-100/80 text-lg md:text-xl leading-relaxed">
                                India's fastest-growing literary house with <strong className="text-white">10,000+ storytellers</strong> and <strong className="text-white">50+ Anthologies</strong>. We don't just publish books; we launch careers.
                            </p>

                            {/* Badges Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                                {[
                                    { label: "ISBN Registered", icon: BookOpen },
                                    { label: "Global Validity", icon: Globe },
                                    { label: "Amazon Listed", icon: ShoppingBag },
                                    { label: "Worldwide Dist.", icon: Truck },
                                ].map((badge, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2 p-4 bg-blue-900/20 rounded-xl border border-blue-500/20 hover:bg-blue-800/30 transition-colors">
                                        <badge.icon className="w-6 h-6 text-blue-400" />
                                        <span className="font-cinzel text-[10px] font-bold text-blue-100 uppercase tracking-wide text-center leading-tight">{badge.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 2. Our Legacy (History) */}
                    <div className="text-center space-y-10">
                        <div>
                            <h2 className="font-cinzel text-3xl md:text-5xl font-bold text-white mb-3">Our Legacy of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Legends</span></h2>
                            <p className="font-playfair text-blue-200/60 text-lg italic">Previous battlegrounds where champions were forged</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                            {[
                                { name: "Poetry Festival", year: "2023", icon: PenTool },
                                { name: "Writer's Mania", year: "Season 1", icon: Zap },
                                { name: "Sept Writing Contest", year: "2024", icon: Calendar },
                                { name: "Authorverse Summit", year: "2024", icon: Crown },
                                { name: "Poetry Contest", year: "Stage 2", icon: Feather },
                            ].map((event, i) => (
                                <div key={i} className="bg-slate-800/40 backdrop-blur-sm border border-white/5 p-6 rounded-2xl hover:bg-blue-900/20 hover:border-blue-500/30 transition-all duration-300 group transform hover:-translate-y-1 hover:shadow-lg">
                                    <event.icon className="w-8 h-8 text-blue-500 mx-auto mb-3 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform" />
                                    <div className="font-cinzel font-bold text-xs text-white uppercase tracking-wider mb-1">{event.name}</div>
                                    <div className="font-playfair text-[10px] text-blue-400 font-bold">{event.year}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FAQ SECTION (NEW) --- */}
            <section className="py-24 px-6 bg-slate-50 border-t border-slate-200">
                <div className="max-w-3xl mx-auto space-y-12">
                    <h2 className="font-cinzel text-3xl text-center font-bold text-slate-900">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {[
                            { q: "Is there an entry fee?", a: "Yes, you only pay IF you are selected. Standard package is ₹499 and Premium is ₹699." },
                            { q: "What languages are accepted?", a: "English, Hindi, and Hinglish. We believe emotions transcend language." },
                            { q: "Do I keep the rights to my work?", a: "Absolutely. You retain 100% copyright of your content. We only take publishing rights." },
                            { q: "How long is the process?", a: "From submission to publication, the entire journey takes approximately 15-20 days." }
                        ].map((faq, i) => (
                            <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:border-blue-300 transition-colors">
                                <h3 className="font-cinzel font-bold text-slate-900 mb-2 text-lg">Q: {faq.q}</h3>
                                <p className="font-playfair text-slate-600">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- STICKY MOBILE CTA (NEW) --- */}
            <div className="fixed bottom-0 inset-x-0 w-full px-4 py-3 bg-slate-900/95 backdrop-blur border-t border-blue-500/30 md:hidden z-[100] shadow-[0_-5px_20px_rgba(0,0,0,0.5)] flex items-center justify-between gap-4 m-0">
                <div className="flex-1">
                    <div className="font-cinzel font-bold text-white text-xs leading-tight">Become a <span className="text-[#FFD700]">Co-Author</span></div>
                    <div className="text-[10px] font-playfair text-blue-200/60 italic">In Love at Minus One anthology</div>
                </div>
                <button
                    onClick={() => navigate('/love-at-minus-one/register')}
                    className="px-6 py-2.5 bg-[#FFD700] text-slate-900 font-cinzel font-bold text-xs tracking-widest uppercase rounded shadow-[0_0_15px_rgba(255,215,0,0.4)] animate-pulse"
                >
                    Join Now
                </button>
            </div>

            {/* --- FOOTER (NEW) --- */}
            <footer className="py-8 text-center border-t border-slate-200 bg-white text-slate-500 font-cinzel text-xs tracking-widest uppercase">
                © 2024 Love at Minus One Anthology. Powered by Inkfetish Publications.
            </footer>

        </div>
    );
};

export default LoveAtMinusOne;
