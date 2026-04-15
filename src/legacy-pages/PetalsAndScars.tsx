import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Feather, BookOpen, Heart, Info, Users, Barcode, Layers, Timer } from 'lucide-react';
import { useState } from 'react';

const PetalsAndScars = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const images = [
        "/images/petals_scars_rose_1.jpg",
        "/images/petals_scars_1.jpg",
        "/images/petals_scars_back.jpg",
        "/images/petals_scars_rose_2.jpg",
        "/images/petals_scars_ornament.jpg"
    ];

    const CountdownTimer = () => {
        const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

        useEffect(() => {
            // Fixed end date for the offer (Jan 7, 2026)
            const targetDate = new Date('2026-01-07T23:59:59');

            const updateTimer = () => {
                const now = new Date();
                const difference = targetDate.getTime() - now.getTime();

                if (difference > 0) {
                    setTimeLeft({
                        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                        minutes: Math.floor((difference / 1000 / 60) % 60),
                        seconds: Math.floor((difference / 1000) % 60)
                    });
                } else {
                    setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                }
            };

            updateTimer(); // Initial call
            const interval = setInterval(updateTimer, 1000);

            return () => clearInterval(interval);
        }, []);

        return (
            <div className="flex gap-4 text-center mt-6">
                {Object.entries(timeLeft).map(([label, value]) => (
                    <div key={label} className="bg-[#B22222]/10 border border-[#B22222]/20 rounded-lg p-2 md:p-3 w-16 md:w-20">
                        <div className="text-xl md:text-2xl font-bold font-cinzel text-[#F5E6CC]">{value}</div>
                        <div className="text-[10px] uppercase tracking-wider text-[#F5E6CC]/60">{label}</div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#2A0A0A] text-[#F5E6CC] font-serif overflow-x-hidden selection:bg-[#B22222] selection:text-white">
            <Helmet>
                <title>Petals & Scars | The Story of Unheard Voices</title>
                <meta name="description" content="Petals & Scars is a powerful poetry and prose anthology featuring the winning voices of Ink Fetish. Stories of softness, ache, resilience, and survival." />
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
                    .font-cinzel { font-family: 'Cinzel', serif; }
                    .font-playfair { font-family: 'Playfair Display', serif; }
                `}</style>
            </Helmet>

            {/* --- HERO SECTION --- */}
            <div className="relative min-h-[90vh] flex items-center justify-center p-6 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-50 z-0" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/60 via-transparent to-[#2A0A0A] z-0" />

                {/* Floating Elements */}
                <motion.div
                    animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute top-20 right-20 w-64 h-64 bg-[#B22222] rounded-full blur-[120px] opacity-20"
                />

                <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-2 gap-8 md:gap-12 items-center">



                    {/* Hero Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="space-y-8 text-center md:text-left"
                    >
                        <div>
                            <span className="text-[#B22222] font-cinzel tracking-[0.2em] uppercase text-[10px] md:text-sm font-bold bg-[#F5E6CC]/10 px-3 py-1 md:px-4 md:py-2 rounded-full border border-[#B22222]/30">
                                Presenting The Inkfetish Winners' Collection
                            </span>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-cinzel font-bold text-[#F5E6CC] mt-6 leading-[0.9]">
                                Petals <span className="text-[#B22222]">&</span> Scars
                            </h1>

                            {/* Mobile Hero Image */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="md:hidden w-full max-w-[280px] mx-auto my-8 relative"
                            >
                                <div className="absolute inset-0 bg-[#B22222] rounded-xl blur-[40px] opacity-30" />
                                <img
                                    src="/images/petals_scars_rose_1.jpg"
                                    alt="Petals & Scars Book Cover"
                                    className="relative w-full rounded-xl shadow-2xl border border-[#F5E6CC]/20"
                                />
                                {/* Mobile Badge */}
                                <div className="absolute -bottom-4 -right-4 bg-[#F5E6CC] text-[#2A0A0A] w-20 h-20 rounded-full flex flex-col items-center justify-center font-cinzel font-bold shadow-xl border-2 border-[#2A0A0A] animate-spin-slow p-2 text-center text-[10px] z-20">
                                    <span className="text-sm block">100+</span>
                                    <span>Winners</span>
                                </div>
                            </motion.div>

                            <p className="font-playfair text-xl md:text-2xl text-[#F5E6CC]/80 mt-4 italic">
                                The Story of Unheard Voices
                            </p>
                        </div>

                        <p className="font-playfair text-lg leading-relaxed text-[#F5E6CC]/70 max-w-lg mx-auto md:mx-0">
                            A powerful poetry and prose anthology woven from softness, ache, resilience, and survival. Written by writers who chose courage over silence.
                        </p>

                        <div className="bg-[#F5E6CC]/5 border border-[#F5E6CC]/10 rounded-xl p-4 md:p-6 backdrop-blur-sm">
                            <div className="flex items-center gap-2 mb-2 text-[#B22222] font-bold tracking-widest text-xs uppercase">
                                <Timer className="w-4 h-4" /> Early Bird Price Ends In:
                            </div>
                            <CountdownTimer />
                        </div>

                        {/* Custom Buy Button */}
                        <div className="flex flex-col md:flex-row items-center gap-8 pt-6">
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="https://payments.cashfree.com/forms/petalsandscarsinkfetish"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gradient-to-r from-[#F5E6CC] to-[#E6D5B8] text-[#5e0000] px-8 py-4 rounded-xl font-cinzel font-bold text-lg shadow-[0_0_20px_rgba(245,230,204,0.3)] hover:shadow-[0_0_30px_rgba(245,230,204,0.5)] transition-all flex items-center gap-3 border border-[#5e0000]/10"
                            >
                                <BookOpen className="w-5 h-5" />
                                <span>Order Your Copy Now</span>
                            </motion.a>

                            <div className="flex items-center gap-4 text-sm text-[#F5E6CC]/60 font-cinzel">
                                <span className="w-2 h-2 bg-[#00ff00] rounded-full animate-pulse shadow-[0_0_10px_#00ff00]" />
                                <span>Selling Fast</span>
                            </div>
                        </div>

                        {/* Hero Badges - High Converting */}
                        <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-[#F5E6CC]/10">
                            {[
                                { label: "Pages", value: "170+", icon: Layers, sub: "Premium Paper" },
                                { label: "Authors", value: "100+", icon: Users, sub: "Global Talent" },
                                { label: "ISBN", value: "978-81-995999-7-0", icon: Barcode, sub: "Registered" },
                                { label: "Finish", value: "Matte", icon: Feather, sub: "Soft Touch" },
                            ].map((spec, i) => (
                                <div key={i} className="flex items-center gap-3 bg-[#F5E6CC]/5 p-3 rounded-lg border border-[#F5E6CC]/10 hover:bg-[#F5E6CC]/10 transition-colors">
                                    <div className="bg-[#B22222]/20 p-2 rounded-full text-[#B22222]">
                                        <spec.icon className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-[#F5E6CC] font-bold font-cinzel text-sm md:text-base leading-none mb-1">{spec.value}</div>
                                        <div className="text-[#F5E6CC]/50 text-[10px] uppercase tracking-wider">{spec.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, rotate: 5 }}
                        animate={{ opacity: 1, x: 0, rotate: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative hidden md:block"
                    >
                        <div className="absolute inset-0 bg-[#B22222] rounded-xl blur-[60px] opacity-30 transform rotate-12" />
                        <img
                            src="/images/petals_scars_rose_1.jpg"
                            alt="Petals & Scars Book Cover"
                            className="relative w-full max-w-md mx-auto rounded-xl shadow-2xl border border-[#F5E6CC]/20 transform hover:scale-105 transition-transform duration-700 hover:rotate-2"
                        />
                        {/* Badge */}
                        <div className="absolute -bottom-6 -right-6 bg-[#F5E6CC] text-[#2A0A0A] w-32 h-32 rounded-full flex flex-col items-center justify-center font-cinzel font-bold shadow-xl border-4 border-[#2A0A0A] animate-spin-slow p-4 text-center text-xs z-20">
                            <span className="text-xl block">100+</span>
                            <span>Winning Voices</span>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ delay: 2, duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#F5E6CC]/40"
                >
                    <div className="w-[1px] h-12 bg-gradient-to-b from-[#F5E6CC]/0 via-[#F5E6CC]/50 to-[#F5E6CC]/0 mx-auto" />
                </motion.div>
            </div>

            {/* --- THE STORY SECTION --- */}
            <section className="py-20 md:py-32 relative bg-[#220808]">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-10" />

                <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
                    <div className="text-center mb-12 md:mb-16 space-y-4">
                        <Feather className="w-8 h-8 text-[#B22222] mx-auto opacity-80" />
                        <h2 className="text-3xl md:text-5xl font-cinzel font-bold text-[#F5E6CC] px-4">The Story of Unheard Voices</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#B22222] to-transparent mx-auto" />
                    </div>

                    <div className="space-y-8 font-playfair text-lg md:text-xl leading-relaxed text-[#F5E6CC]/90 text-center md:text-justify max-w-3xl mx-auto">
                        <p>
                            <span className="text-[#B22222] font-bold text-2xl">Petals & Scars</span> is a powerful poetry and prose anthology featuring the winning voices of the Authorverse and September Writing Competition by Ink Fetish. These pages hold stories woven from softness, ache, resilience, and survival, written by writers who chose courage over silence.
                        </p>
                        <p>
                            What begins as a whisper becomes a chorus of truth. From longing and heartbreak to healing and quiet strength, every piece carries an honesty that feels deeply intimate and universally human. These are not just words, they are fragments of hearts that dared to feel, break, rebuild, and bloom again.
                        </p>

                        <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <img src="/images/petals_scars_back.jpg" alt="Book Back Cover" className="rounded-lg shadow-lg border border-[#F5E6CC]/10 opacity-90 hover:opacity-100 transition-opacity" />
                            <div className="text-base text-[#F5E6CC]/70 italic border-l-2 border-[#B22222]/30 pl-6">
                                "Ink Fetish began in 2021 with one belief: every unheard writer deserves a home. What started as a small corner of hope has now grown into a global community of 190,000+ dreamers, students, creators, and everyday storytellers finding their voice through the noise of life."
                            </div>
                        </div>

                        <p className="text-center text-xl font-medium">
                            This anthology is a tribute to them — to every writer who trusted their words, submitted their truth, and shared a piece of their soul.
                        </p>

                        <div className="pt-8 flex justify-center">
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="https://payments.cashfree.com/forms/petalsandscarsinkfetish"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gradient-to-r from-[#F5E6CC] to-[#E6D5B8] text-[#5e0000] px-8 py-4 rounded-xl font-cinzel font-bold text-lg shadow-[0_0_20px_rgba(245,230,204,0.3)] hover:shadow-[0_0_30px_rgba(245,230,204,0.5)] transition-all flex items-center gap-3 border border-[#5e0000]/10"
                            >
                                <BookOpen className="w-5 h-5" />
                                <span>Order Your Copy Now</span>
                            </motion.a>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- BOOK SPECIFICATIONS --- */}
            <section className="py-16 bg-[#2A0A0A] border-t border-[#B22222]/10 relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-20" />
                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {[
                            { label: "Pages", value: "170+", sub: "Premium Quality" },
                            { label: "Authors", value: "100+", sub: "Selected Voices" },
                            { label: "Format", value: "Paperback", sub: "Matte Finish" },
                            { label: "ISBN", value: "978-81-995999-7-0", sub: "Registered" },
                        ].map((spec, i) => (
                            <div key={i} className="p-6 rounded-xl border border-[#F5E6CC]/10 bg-[#1A0505] hover:border-[#B22222]/30 transition-colors group">
                                <h4 className="text-[#B22222] font-cinzel font-bold text-3xl mb-1 group-hover:scale-110 transition-transform">{spec.value}</h4>
                                <div className="text-[#F5E6CC] font-bold uppercase tracking-widest text-xs mb-1">{spec.label}</div>
                                <div className="text-[#F5E6CC]/40 text-[10px] font-serif italic">{spec.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- GALLERY & DETAILS --- */}
            <section className="py-20 bg-[#1A0505] relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        {[
                            { title: "A Sanctuary", desc: "For quiet strength.", icon: Sparkles },
                            { title: "A Celebration", desc: "Of vulnerability.", icon: Heart },
                            { title: "A Reminder", desc: "That soft voices echo.", icon: Info },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="bg-[#2A0A0A] p-8 rounded-2xl border border-[#B22222]/20 text-center relative group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#B22222]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                                <item.icon className="w-10 h-10 text-[#B22222] mx-auto mb-4" />
                                <h3 className="font-cinzel text-xl font-bold mb-2 text-[#F5E6CC]">{item.title}</h3>
                                <p className="font-playfair italic text-[#F5E6CC]/60">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Image Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 h-auto md:h-96">
                        {images.map((img, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className={`rounded-xl overflow-hidden border border-[#F5E6CC]/10 shadow-lg relative cursor-pointer group
                                    ${index === 0 ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1'}
                                `}
                            >
                                <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FINAL CTA --- */}
            <section className="py-24 bg-[#2A0A0A] relative text-center px-6">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#B22222] to-transparent" />

                <div className="max-w-2xl mx-auto space-y-8">
                    <Heart className="w-12 h-12 text-[#B22222] mx-auto animate-pulse" />

                    <h2 className="text-3xl md:text-5xl font-cinzel font-bold text-[#F5E6CC]">
                        For every reader who carries both <br />
                        <span className="text-[#B22222]">petals</span> and <span className="text-[#B22222]">scars</span>...
                    </h2>

                    <p className="font-playfair text-xl italic text-[#F5E6CC]/80">
                        this book is for you.
                    </p>

                    <div className="pt-8 flex justify-center">
                        {/* Custom Buy Button Bottom */}
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="https://payments.cashfree.com/forms/petalsandscarsinkfetish"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gradient-to-r from-[#F5E6CC] to-[#E6D5B8] text-[#5e0000] px-10 py-5 rounded-xl font-cinzel font-bold text-xl shadow-[0_0_30px_rgba(245,230,204,0.2)] hover:shadow-[0_0_50px_rgba(245,230,204,0.4)] transition-all flex items-center gap-4 border border-[#5e0000]/10"
                        >
                            <BookOpen className="w-6 h-6" />
                            <span>Get Your Copy Today</span>
                        </motion.a>
                    </div>
                </div>
            </section>

            {/* Footer Note */}
            <div className="py-8 bg-[#150202] text-center text-[#F5E6CC]/30 font-cinzel text-xs tracking-widest border-t border-[#B22222]/10">
                INKFETISH PUBLISHING • EST 2021
            </div>
        </div>
    );
};

export default PetalsAndScars;
