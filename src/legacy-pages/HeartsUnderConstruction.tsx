import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Feather, Heart, PenTool, BookOpen, Clock, AlertCircle, Sparkles, Scroll, Send, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeartsUnderConstruction = () => {
    const navigate = useNavigate();
    const [introStage, setIntroStage] = useState(0); // 0: clear, 1: Inkfetish, 2: Presents, 3: Heart, 4: Done

    useEffect(() => {
        // Set body background to black to prevent white flash on scroll
        document.body.style.backgroundColor = '#000';

        // Orchestrate the cinematic timeline
        const sequence = async () => {
            // Stage 1: "Inkfetish Publications"
            setIntroStage(1);
            await new Promise(r => setTimeout(r, 2000));

            // Stage 2: "Presents"
            setIntroStage(2);
            await new Promise(r => setTimeout(r, 1500));

            // Stage 3: Heart Animation
            setIntroStage(3);
            await new Promise(r => setTimeout(r, 4500)); // Allow time for full break animation

            // Stage 4: End
            setIntroStage(4);
        };

        sequence();

        // Cleanup function to reset background when leaving the page
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Great+Vibes&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap');
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-handwriting { font-family: 'Great Vibes', cursive; }
        .font-typewriter { font-family: 'Courier Prime', monospace; }
        
        .vintage-paper {
            background-color: #fdfbf7;
            background-image: url("https://www.transparenttextures.com/patterns/aged-paper.png");
        }
        
        .ink-splatter {
            background-image: radial-gradient(circle, #000 10%, transparent 10%), radial-gradient(circle, #000 10%, transparent 10%);
            background-size: 20px 20px;
            background-position: 0 0, 10px 10px;
            opacity: 0.05;
        }

        @keyframes flicker {
            0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
            20%, 24%, 55% { opacity: 0.4; }
        }
    `;

    return (
        <div className="min-h-screen bg-black text-stone-200 overflow-x-hidden font-playfair">
            <Helmet>
                <title>Hearts Under Construction | Inkfetish</title>
                <style>{styles}</style>
            </Helmet>

            {/* Cinematic Intro Overlay */}
            <AnimatePresence mode="wait">
                {introStage < 4 && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
                        exit={{ opacity: 0, transition: { duration: 1.5 } }}
                    >
                        {/* Stage 1: Inkfetish Publications */}
                        {introStage === 1 && (
                            <motion.div
                                key="stage1"
                                initial={{ opacity: 0, scale: 0.9, letterSpacing: "0.2em" }}
                                animate={{ opacity: 1, scale: 1, letterSpacing: "0.4em" }}
                                exit={{ opacity: 0, filter: "blur(10px)", scale: 1.1 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="text-center"
                            >
                                <div className="text-stone-500 text-xs font-typewriter uppercase mb-2 tracking-widest">
                                    EST. 2024
                                </div>
                                <h1 className="font-cinzel text-3xl md:text-5xl text-white font-bold tracking-widest">
                                    INKFETISH
                                </h1>
                                <p className="font-cinzel text-base md:text-xl text-stone-400 mt-2 tracking-[0.3em] uppercase">
                                    PUBLICATIONS
                                </p>
                            </motion.div>
                        )}

                        {/* Stage 2: Presents */}
                        {introStage === 2 && (
                            <motion.div
                                key="stage2"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, filter: "blur(10px)", scale: 1.1 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                className="text-center"
                            >
                                <h2 className="font-handwriting text-5xl md:text-7xl text-white">
                                    Presents
                                </h2>
                            </motion.div>
                        )}

                        {/* Stage 3: The Heart Break */}
                        {introStage === 3 && (
                            <motion.div
                                key="stage3"
                                className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center p-10" // Added padding to contain overflow
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 1 }}
                            >
                                {/* Left Heart Half */}
                                <motion.svg
                                    width="200"
                                    height="200"
                                    viewBox="0 0 100 100"
                                    className="absolute overflow-visible"
                                    initial={{ x: 0, rotate: 0 }}
                                    animate={{
                                        x: -30,
                                        rotate: -20,
                                        opacity: [1, 1, 0.8] // Fade out slightly at very end
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        times: [0, 0.5, 1], // Start break sooner relative to duration
                                        delay: 1, // Wait for crack
                                        ease: "circOut"
                                    }}
                                >
                                    <path
                                        d="M50 30 C 40 10, 10 10, 10 40 C 10 65, 50 90, 50 90"
                                        fill="#7f1d1d"
                                        stroke="#450a0a"
                                        strokeWidth="1"
                                    />
                                </motion.svg>

                                {/* Right Heart Half */}
                                <motion.svg
                                    width="200"
                                    height="200"
                                    viewBox="0 0 100 100"
                                    className="absolute overflow-visible"
                                    initial={{ x: 0, rotate: 0 }}
                                    animate={{
                                        x: 30,
                                        rotate: 20,
                                        opacity: [1, 1, 0.8]
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        times: [0, 0.5, 1],
                                        delay: 1,
                                        ease: "circOut"
                                    }}
                                >
                                    <path
                                        d="M50 90 C 50 90, 90 65, 90 40 C 90 10, 60 10, 50 30"
                                        fill="#7f1d1d"
                                        stroke="#450a0a"
                                        strokeWidth="1"
                                    />
                                </motion.svg>

                                {/* The Crack (Draws quickly) */}
                                <motion.svg
                                    width="200"
                                    height="200"
                                    viewBox="0 0 100 100"
                                    className="absolute overflow-visible bg-transparent z-10"
                                >
                                    <motion.path
                                        d="M50 30 L 48 35 L 52 45 L 45 55 L 53 65 L 49 75 L 50 90"
                                        fill="transparent"
                                        stroke="black"
                                        strokeWidth="2"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 0.4, delay: 0.5 }}
                                    />
                                </motion.svg>

                                {/* Construction Tape Overlay (Slaps on after break) */}
                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                                    initial={{ opacity: 0, scale: 1.5, rotate: -20 }}
                                    animate={{ opacity: 1, scale: 1, rotate: -12 }}
                                    transition={{ delay: 2.0, duration: 0.3, type: "spring", bounce: 0.5 }}
                                >
                                    <div className="bg-[#fbbf24] text-black font-black font-typewriter text-xs md:text-sm px-12 md:px-20 py-2 shadow-2xl tracking-[0.2em] uppercase border-y-[3px] border-black">
                                        Under Construction
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content (Revealed after intro) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: introStage === 4 ? 1 : 0 }}
                transition={{ duration: 2 }}
            >
                {/* Navbar Placeholder / Back Button */}
                <div className="absolute top-0 left-0 p-6 z-40 w-full flex justify-between items-center mix-blend-difference">
                    <button onClick={() => navigate('/')} className="text-white/50 hover:text-white transition-colors flex items-center gap-2 text-sm uppercase tracking-widest font-typewriter">
                        <Feather className="w-4 h-4" /> Inkfetish Publications
                    </button>
                    <div className="hidden md:block text-stone-500 text-xs font-cinzel tracking-[0.2em] uppercase">
                        Valentine Week Anthology
                    </div>
                    <div className="flex items-center gap-2 text-red-500/80 animate-pulse">
                        <span className="h-2 w-2 rounded-full bg-red-500"></span>
                        <span className="text-xs uppercase tracking-widest font-bold">Live</span>
                    </div>
                </div>

                {/* Hero Section */}
                <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
                    {/* Background Texture */}
                    <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-0 pointer-events-none" />

                    {/* Vintage Typewriter Element */}
                    <div className="absolute top-1/4 left-10 md:left-20 w-64 h-64 border border-white/5 rounded-full flex items-center justify-center opacity-20 rotate-12">
                        <div className="w-full h-px bg-white/20 absolute" />
                        <div className="h-full w-px bg-white/20 absolute" />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column: Text */}
                        <div className="text-center lg:text-left space-y-12 order-2 lg:order-1">
                            <motion.div
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1, delay: 3.5 }}
                                className="space-y-6"
                            >
                                <div className="inline-block relative">
                                    <Sparkles className="absolute -top-8 -right-8 text-yellow-600/50 w-8 h-8 animate-pulse" />
                                    <h1 className="font-cinzel text-5xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-stone-200 via-stone-400 to-stone-700 leading-tight">
                                        Hearts Under<br />
                                        <span className="text-white italic font-playfair pr-4">Construction</span>
                                    </h1>
                                </div>

                                <div className="h-px w-32 bg-gradient-to-r from-transparent via-red-900 to-transparent mx-auto lg:mx-0 my-4" />

                                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                                    <span className="px-4 py-1.5 border border-stone-700 rounded-full text-xs font-typewriter uppercase tracking-widest text-stone-300 bg-stone-900/50">
                                        It's Free
                                    </span>
                                    <span className="px-4 py-1.5 border border-red-900/50 rounded-full text-xs font-typewriter uppercase tracking-widest text-red-400 bg-red-950/20 animate-pulse">
                                        150 Spots Remaining
                                    </span>
                                    <span className="px-4 py-1.5 border border-stone-700 rounded-full text-xs font-typewriter uppercase tracking-widest text-yellow-500 bg-yellow-900/10">
                                        Launching Feb 22nd
                                    </span>
                                </div>



                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 5.0, duration: 1 }}
                                    className="mt-8 p-4 border border-stone-800 bg-stone-900/30 backdrop-blur-sm rounded-lg max-w-xl mx-auto lg:mx-0"
                                >
                                    <p className="font-playfair text-stone-300 text-lg md:text-xl italic leading-relaxed">
                                        "This Valentine's Week, we are launching an anthology for the ones who loved in silence, for the stories that never made it to the mailbox."
                                    </p>
                                </motion.div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 5.5 }}
                                className="flex flex-col sm:flex-row items-center lg:items-start gap-6 justify-center lg:justify-start"
                            >
                                <button
                                    onClick={() => navigate('/anthology/hearts-under-construction/register')}
                                    className="px-8 py-4 bg-red-900 text-white font-cinzel font-bold tracking-widest uppercase hover:bg-red-800 transition-all shadow-lg hover:shadow-red-900/20"
                                >
                                    Participate as Co-Author
                                </button>
                                <button
                                    onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="group relative px-8 py-4 bg-transparent border border-stone-700 hover:border-red-900/50 transition-all duration-500 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-red-950/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                    <span className="relative z-10 font-typewriter text-stone-300 uppercase tracking-[0.2em] group-hover:text-red-200 text-sm flex items-center gap-3">
                                        Why This Anthology? <span className="group-hover:translate-x-1 transition-transform">↓</span>
                                    </span>
                                </button>
                            </motion.div>
                        </div>

                        {/* Right Column: Book Cover Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{ duration: 1.5, delay: 4, type: "spring" }}
                            className="relative order-1 lg:order-2 perspective-1000"
                        >
                            <div className="relative w-64 md:w-80 lg:w-96 mx-auto transform transition-transform duration-700 hover:scale-105 hover:rotate-y-6">
                                {/* Book Cover */}
                                <img
                                    src="/images/hearts-under-construction-cover.jpg"
                                    alt="Hearts Under Construction Book Cover"
                                    className="w-full h-auto rounded-r-lg shadow-2xl border-l-[3px] border-stone-800"
                                    style={{ boxShadow: '20px 20px 60px rgba(0,0,0,0.5), -5px 0 10px rgba(255,255,255,0.05)' }}
                                />
                                {/* Overlay Sheen */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 rounded-r-lg pointer-events-none" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Scroll Indicator */}
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-stone-600 hidden lg:block"
                    >
                        <div className="w-px h-16 bg-gradient-to-b from-stone-600 to-transparent mx-auto" />
                    </motion.div>
                </section>

                {/* About / Theme Section */}
                <section id="about" className="py-24 px-6 bg-stone-950 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-red-900/5 rounded-full blur-[120px]" />

                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="absolute -inset-4 border border-stone-800 rotate-3 z-0" />
                            <div className="absolute -inset-4 border border-stone-800 -rotate-3 z-0" />
                            <div className="relative z-10 bg-black p-8 md:p-12 border border-stone-800 shadow-2xl space-y-8">
                                <div>
                                    <Scroll className="w-10 h-10 text-stone-500 mb-6" />
                                    <h3 className="font-cinzel text-3xl text-white mb-6">The Unsent Letters</h3>
                                    <p className="font-playfair text-lg text-stone-400 leading-relaxed mb-6">
                                        This Valentine's Week, we are launching an anthology for the words that never made it to the mailbox. For the poems you always wanted to write but were too afraid to send.
                                    </p>
                                    <p className="font-playfair text-lg text-stone-400 leading-relaxed max-w-lg">
                                        This is about that specific ache—the love that almost happened, the heartbreak that lingers, and the beautiful mess of rebuilding. It is for the romantics, the heartbroken, and the hopeful.
                                    </p>

                                    <div className="mt-8 pt-8 border-t border-stone-800">
                                        <span className="text-xs font-typewriter text-red-500 uppercase tracking-widest mb-4 block">Who Can Join?</span>
                                        <div className="space-y-3">
                                            {["One who is in love.", "One who was in love.", "One who will be in love."].map((item, i) => (
                                                <div key={i} className="flex items-center gap-3 text-stone-300 font-playfair italic">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-stone-600" />
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Image in Middle Section */}
                                <div className="relative w-full overflow-hidden rounded-lg border border-stone-800 group">
                                    <img
                                        src="/images/hearts-under-construction-cover.jpg"
                                        alt="Book Theme Visual"
                                        className="w-full h-64 object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                    <div className="absolute bottom-4 left-4">
                                        <span className="text-xs font-typewriter text-stone-400 uppercase tracking-widest border-b border-stone-600 pb-1">Fig. 1: The Blueprint of Healing</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-12">
                            <div className="space-y-6">
                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-stone-900 border border-stone-800 rounded group-hover:border-red-900/50 transition-colors">
                                        <Heart className="w-6 h-6 text-stone-500 group-hover:text-red-500 transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="font-cinzel text-xl text-white mb-2">Vintage Romance</h4>
                                        <p className="text-stone-500 text-sm font-typewriter">Old school love in a modern world. Letters, polaroids, and timeless emotions.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-stone-900 border border-stone-800 rounded group-hover:border-red-900/50 transition-colors">
                                        <PenTool className="w-6 h-6 text-stone-500 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="font-cinzel text-xl text-white mb-2">Raw & Real</h4>
                                        <p className="text-stone-500 text-sm font-typewriter">No filters. Just the honest truth about how love changes us.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-stone-900 border border-stone-800 rounded group-hover:border-red-900/50 transition-colors">
                                        <Clock className="w-6 h-6 text-stone-500 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="font-cinzel text-xl text-white mb-2">Limited Edition</h4>
                                        <p className="text-stone-500 text-sm font-typewriter">Only 150 spots. A carefully curated collection of voices.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Roller Coaster of Emotion Section */}
                <section className="py-24 px-6 bg-black relative overflow-hidden">
                    {/* Curved Path Line */}
                    <div className="absolute top-1/2 left-0 w-full h-px border-t border-dashed border-stone-800 hidden lg:block -translate-y-12" />

                    <div className="max-w-7xl mx-auto mb-20 text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-cinzel text-3xl md:text-5xl text-white mb-6">A Roller Coaster of <span className="text-red-800">Emotion</span></h2>
                            <p className="font-playfair text-stone-400 text-lg max-w-2xl mx-auto italic mb-8">
                                "This won't be just an anthology. This will be divided into 5 flows or 5 parts and you can choose in which you will write."
                            </p>
                            <div className="inline-block px-6 py-2 border border-yellow-900/30 rounded-full bg-yellow-950/10 text-yellow-600 font-typewriter text-xs uppercase tracking-widest animate-pulse">
                                Choose the tone you want to add your poem in
                            </div>
                        </motion.div>
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
                            {[
                                {
                                    stage: "01",
                                    title: "The Wanting",
                                    desc: "The quiet ache of loneliness, the spark of desire, and the thrill of those first few messages.",
                                    delay: 0
                                },
                                {
                                    stage: "02",
                                    title: "The Falling",
                                    desc: "The magic of the first kiss, the courage of vulnerability, and the feeling of 'us against the world'.",
                                    delay: 0.1
                                },
                                {
                                    stage: "03",
                                    title: "The Breaking",
                                    desc: "The sharp pain of betrayal, the weight of heartbreak, and the long nights of mourning what was lost.",
                                    delay: 0.2
                                },
                                {
                                    stage: "04",
                                    title: "The Healing",
                                    desc: "The journey through therapy, the grace of forgiveness, and the strength found in setting boundaries.",
                                    delay: 0.3
                                },
                                {
                                    stage: "05",
                                    title: "The Becoming",
                                    desc: "The embrace of self-love, the power of radical acceptance, and the ultimate freedom of being whole.",
                                    delay: 0.4
                                }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: item.delay, duration: 0.8 }}
                                    className="relative group"
                                >
                                    {/* Timeline Node (Desktop) */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-16 hidden lg:flex flex-col items-center">
                                        <div className="w-4 h-4 rounded-full bg-stone-900 border border-stone-700 group-hover:bg-red-900 group-hover:border-red-500 transition-colors duration-500" />
                                        <div className="h-8 w-px bg-stone-800" />
                                    </div>

                                    <div className="h-[320px] border border-stone-800 bg-stone-950 overflow-hidden relative group hover:border-red-900/50 transition-colors duration-500 flex flex-col p-6">
                                        {/* Number Background */}
                                        <div className="absolute -right-4 -top-4 text-[120px] font-black text-stone-900/30 font-cinzel leading-none select-none z-0 group-hover:text-red-950/20 transition-colors duration-500">
                                            {item.stage}
                                        </div>

                                        {/* Content Section */}
                                        <div className="flex-1 flex flex-col justify-between relative z-10">
                                            <div>
                                                <div className="text-red-700 font-typewriter text-xs uppercase tracking-widest mb-4">Stage {item.stage}</div>
                                                <h3 className="font-cinzel text-2xl text-white mb-4 group-hover:text-red-100 transition-colors">{item.title}</h3>
                                                <p className="font-playfair text-stone-400 text-sm leading-relaxed border-t border-stone-900 pt-4 italic">
                                                    "{item.desc}"
                                                </p>
                                            </div>
                                            <div className="pt-4">
                                                <button onClick={() => navigate('/anthology/hearts-under-construction/register')} className="text-xs font-typewriter text-stone-500 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 group/btn">
                                                    Add Poem <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits You Will Get Section */}
                <section className="py-24 px-6 bg-stone-950 border-t border-stone-900 relative">
                    {/* Background Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-stone-800/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-900/5 rounded-full blur-[100px]" />

                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="font-cinzel text-stone-500 text-sm tracking-[0.2em] uppercase">The Privileges</span>
                            <h2 className="font-cinzel text-3xl md:text-5xl text-white mt-2 mb-6">Benefits of a <span className="text-red-800">Co-Author</span></h2>
                            <p className="font-playfair text-stone-400 text-lg max-w-2xl mx-auto italic">
                                "Transform from a writer into a published author with a suite of premium privileges designed to immortalize your words."
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Published Author Status",
                                    subtitle: "Credential",
                                    desc: "Your name becomes searchable on Amazon as a published author forever. A real credential for your portfolio.",
                                    icon: BookOpen
                                },
                                {
                                    title: "Personal Author Website",
                                    subtitle: "Digital Portfolio",
                                    desc: "You get your own professional author website (yourname.inkfetish.com) with your bio and work.",
                                    icon: Scroll
                                },
                                {
                                    title: "Amazon Global Distribution",
                                    subtitle: "Global Reach",
                                    desc: "Your work is published on Amazon with an official ISBN number, recognized globally.",
                                    icon: Send
                                },
                                {
                                    title: "Massive Social Proof",
                                    subtitle: "199K Exposure",
                                    desc: "Your work gets announced to Inkfetish's 199K Instagram followers—instant community exposure.",
                                    icon: Sparkles
                                },
                                {
                                    title: "Professional Book Quality",
                                    subtitle: "Premium Production",
                                    desc: "Premium cover design, high-quality interior layout, and proper printing.",
                                    icon: Heart
                                },
                                {
                                    title: "Author Bio Page",
                                    subtitle: "Featured Profile",
                                    desc: "A dedicated author page in the book with your photo, bio, and story.",
                                    icon: Feather
                                },
                                {
                                    title: "Google & GoodReads Listing",
                                    subtitle: "Searchability",
                                    desc: "Your book profile will be created on GoodReads and Google Books for maximum discoverability.",
                                    icon: BookOpen
                                },
                                {
                                    title: "Official ISBN Number",
                                    subtitle: "Legitimacy",
                                    desc: "Assigned a legitimate ISBN number that registers your book in the global library database.",
                                    icon: AlertCircle
                                },
                                {
                                    title: "Get Published in 15 Days",
                                    subtitle: "Fast-Track",
                                    desc: "A streamlined process to go from manuscript to published author in just two weeks.",
                                    icon: Clock
                                }
                            ].map((benefit, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -5 }}
                                    className="p-8 border border-stone-800 bg-black hover:border-red-900/30 transition-all duration-300 group rounded-sm"
                                >
                                    <div className="w-12 h-12 bg-stone-900 rounded-sm flex items-center justify-center mb-6 group-hover:bg-red-950/20 transition-colors">
                                        <benefit.icon className="w-6 h-6 text-stone-500 group-hover:text-red-500 transition-colors" />
                                    </div>
                                    <span className="text-stone-600 font-typewriter text-xs uppercase tracking-widest block mb-2">{benefit.subtitle}</span>
                                    <h3 className="text-xl font-cinzel text-white mb-4 group-hover:text-red-100 transition-colors">{benefit.title}</h3>
                                    <p className="text-stone-400 font-playfair leading-relaxed text-sm">
                                        {benefit.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="py-32 px-6 relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-50" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />

                    <div className="relative z-10 max-w-4xl mx-auto text-center space-y-10">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="bg-stone-900/30 backdrop-blur-sm border border-stone-800 p-10 md:p-16 rounded-sm relative"
                        >
                            {/* Decorative Corners */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-900/50" />
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-900/50" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-900/50" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-900/50" />

                            <h2 className="font-cinzel text-4xl md:text-5xl text-white mb-6">Claim Your Spot</h2>
                            <p className="font-playfair text-xl text-stone-400 mb-10 italic">
                                "History will remember the stories we were brave enough to write."
                            </p>

                            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                                <button
                                    onClick={() => navigate('/anthology/hearts-under-construction/register')}
                                    className="px-8 py-4 bg-red-900/20 hover:bg-red-900/40 border border-red-900 text-red-100 font-cinzel font-bold tracking-widest uppercase transition-all duration-300 w-full md:w-auto"
                                >
                                    Register as Co-Author
                                </button>
                                <p className="text-stone-600 text-xs font-typewriter uppercase tracking-widest">
                                    <AlertCircle className="w-3 h-3 inline mr-1" />
                                    Launch: Feb 22nd
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-12 bg-black border-t border-stone-900/50 text-center">
                    <div className="flex flex-col items-center justify-center gap-4 mb-8">
                        <img src="/images/inkfetish_logo.png" alt="Inkfetish Logo" className="w-24 h-auto opacity-50 hover:opacity-80 transition-opacity" />
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-4 opacity-50 hover:opacity-100 transition-opacity">
                        <Feather className="w-5 h-5 text-stone-500" />
                        <span className="font-cinzel text-stone-500 font-bold tracking-widest">INKFETISH</span>
                    </div>
                    <p className="text-stone-700 text-xs font-typewriter">© 2025 Inkfetish Publications. All rights reserved.</p>
                </footer>

                {/* Mobile Sticky CTA */}
                <div className="fixed bottom-0 left-0 w-full bg-stone-950/90 backdrop-blur-md border-t border-stone-800 p-4 z-50 md:hidden pb-safe">
                    <button
                        onClick={() => navigate('/anthology/hearts-under-construction/register')}
                        className="w-full py-4 bg-red-900 text-white font-cinzel font-bold tracking-widest uppercase shadow-lg shadow-red-900/20 flex items-center justify-center gap-2"
                    >
                        Join as Co-Author <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default HeartsUnderConstruction;
