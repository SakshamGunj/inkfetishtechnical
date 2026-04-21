'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Star, Heart, ArrowUpRight, BookOpen, PenTool, Sparkles, Instagram, Mail, Globe } from 'lucide-react';
import StructuredData from '@/components/StructuredData';

const BrutalistCard = ({ children, className = "", color = "bg-white" }: { children: React.ReactNode, className?: string, color?: string }) => (
    <div className={`${color} border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${className} hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200`}>
        {children}
    </div>
);

const Badge = ({ text, color = "bg-yellow-300" }: { text: string, color?: string }) => (
    <span className={`${color} border-[2px] border-black px-3 py-1 font-bold text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
        {text}
    </span>
);

const AnweshaAuthor = () => {
    return (
        <div className="min-h-screen bg-[#F0F0F0] font-sans text-black overflow-x-hidden selection:bg-black selection:text-white">
            <Helmet>
                <title>ANWESHA | Writer & Artist</title>
                <meta name="description" content="Portfolio of Anwesha - A 14-year-old creative powerhouse. Writer of 'Silfira', Artist, and Dreamer." />

                {/* Open Graph / Facebook / WhatsApp */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://authorverse.com/publishedauthor/anwesha" />
                <meta property="og:title" content="ANWESHA | Writer & Artist" />
                <meta property="og:description" content="Meet Anwesha - A 14-year-old creative powerhouse. Writer of 'Silfira', Artist, and Dreamer." />
                <meta property="og:image" content="https://authorverse-summit-launch.vercel.app/images/anwesha-profile.jpg" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://authorverse.com/publishedauthor/anwesha" />
                <meta property="twitter:title" content="ANWESHA | Writer & Artist" />
                <meta property="twitter:description" content="Meet Anwesha - A 14-year-old creative powerhouse. Writer of 'Silfira', Artist, and Dreamer." />
                <meta property="twitter:image" content="https://www.inkfetish.in/images/anwesha-profile.jpg" />
            </Helmet>

            <StructuredData 
                data={{
                    "@context": "https://schema.org",
                    "@type": "Person",
                    "name": "Anwesha",
                    "jobTitle": "Writer & Artist",
                    "description": "A 14-year-old creative powerhouse. Writer of 'Silfira', Artist, and Dreamer.",
                    "url": "https://www.inkfetish.in/publishedauthor/anwesha",
                    "image": "https://www.inkfetish.in/images/anwesha-profile.jpg",
                    "sameAs": [
                        "https://www.instagram.com/ink.fetish"
                    ]
                }}
            />

            {/* Navbar */}
            <div className="bg-black text-white py-4 px-6 border-b-[3px] border-black font-display font-bold text-lg sm:text-xl tracking-wider flex justify-between items-center">
                <span>INKFETISH PUBLICATION</span>
                <span className="text-[10px] sm:text-xs font-mono bg-[#fe019a] text-white px-2 py-1 border border-white">ESTD. 2025</span>
            </div>

            {/* Marquee Header */}
            <div className="bg-[#FEF08A] border-b-[3px] border-black py-3 marquee-container font-mono font-bold text-sm tracking-widest uppercase">
                <div className="marquee-content">
                    WRITER • ARTIST • DREAMER • ANWESHA • 14 YEARS OLD • SILFIRA COMING SOON • LEARNER • CREATOR • WRITER • ARTIST • DREAMER • ANWESHA • 14 YEARS OLD • SILFIRA COMING SOON • LEARNER • CREATOR •
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 min-h-[85vh]">

                    {/* Left Column - Profile & Quick Stats */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        {/* Profile Image Card */}
                        <BrutalistCard color="bg-[#E9D5FF]" className="p-4 relative overflow-hidden group">
                            <div className="mb-2 font-display font-bold text-lg border-b-[3px] border-black inline-block">ABOUT AUTHOR</div>
                            <div className="absolute top-2 right-2 z-10">
                                <Badge text="Available" color="bg-[#BBF7D0]" />
                            </div>
                            <div className="aspect-[3/4] border-[3px] border-black relative z-0 bg-white overflow-hidden">
                                <img
                                    src="/images/anwesha-profile.jpg"
                                    alt="Anwesha Profile"
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                                />
                            </div>
                            <div className="mt-4 flex justify-between items-end">
                                <div>
                                    <h3 className="font-display text-2xl font-bold leading-none">ANWESHA</h3>
                                    <p className="font-body text-sm font-bold opacity-60">EST. 2011</p>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-8 h-8 bg-white border-[2px] border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        <Instagram size={16} />
                                    </div>
                                    <div className="w-8 h-8 bg-white border-[2px] border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        <Mail size={16} />
                                    </div>
                                </div>
                            </div>
                        </BrutalistCard>

                        {/* Quick Stats */}
                        <BrutalistCard color="bg-[#FBCFE8]" className="p-6 flex-grow flex flex-col justify-center">
                            <h3 className="font-display text-xl font-bold mb-4 border-b-[3px] border-black inline-block pb-1">STATS</h3>
                            <div className="space-y-3 font-mono text-sm font-bold">
                                <div className="flex justify-between items-center bg-white border-[2px] border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    <span>LEVEL</span>
                                    <span>14</span>
                                </div>
                                <div className="flex justify-between items-center bg-white border-[2px] border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    <span>CLASS</span>
                                    <span>WRITER</span>
                                </div>
                                <div className="flex justify-between items-center bg-white border-[2px] border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    <span>BDAY</span>
                                    <span>19 DEC</span>
                                </div>
                                <div className="flex justify-between items-center bg-white border-[2px] border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    <span>EDU</span>
                                    <span className="truncate max-w-[120px]" title="CAMBRIDGE B2">CAMBRIDGE B2</span>
                                </div>
                                <div className="flex justify-between items-center bg-white border-[2px] border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    <span>STATUS</span>
                                    <span className="text-green-600">ONLINE</span>
                                </div>
                            </div>
                        </BrutalistCard>
                    </div>


                    {/* Middle Column - Main Info */}
                    <div className="lg:col-span-4 flex flex-col gap-6 order-first lg:order-none">
                        {/* Name Header */}
                        <div className="bg-black text-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
                            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-5xl xl:text-7xl font-black leading-[0.85] tracking-tighter break-words">
                                HELLO<br />
                                <span className="text-[#FEF08A]">WORLD</span>
                            </h1>
                        </div>

                        {/* Bio Card */}
                        {/* Bio & Motivation Card */}
                        <BrutalistCard color="bg-white" className="p-6 flex-grow flex flex-col gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles className="w-6 h-6 text-[#FBCFE8] fill-current stroke-black stroke-[1.5]" />
                                    <h3 className="font-display text-xl font-bold">THE JOURNEY</h3>
                                </div>
                                <p className="font-body text-sm leading-relaxed mb-4 break-words">
                                    I'm a 14-year-old artist & writer. My journey started on a random day in <span className="bg-[#FEF08A] px-1 border border-black font-bold">March 2025</span> when I was going through a rough phase. I wanted a place to dump my feelings, and that's when I realized I could create a website to share my thoughts.
                                </p>
                            </div>

                            <div className="border-t-[3px] border-black pt-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Heart className="w-6 h-6 text-[#BBF7D0] fill-current stroke-black stroke-[1.5]" />
                                    <h3 className="font-display text-xl font-bold">MOTIVATION</h3>
                                </div>
                                <p className="font-body text-sm leading-relaxed break-words">
                                    My motivation ain't really anybody famous. <span className="font-bold underline decoration-wavy decoration-[#FBCFE8]">It was me.</span> I realized my skills like writing, art, and Kathak are my drive. I started this journey without looking back at the cons.
                                </p>
                            </div>

                            <div className="flex gap-2 flex-wrap mt-auto pt-2">
                                <Badge text="Debating" color="bg-[#E9D5FF]" />
                                <Badge text="Law / Writng" color="bg-[#BBF7D0]" />
                                <Badge text="Kathak" color="bg-[#FBCFE8]" />
                                <Badge text="B2 Level" color="bg-[#FEF08A]" />
                            </div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-display text-2xl font-bold">SILFIRA</h3>
                                <Badge text="WIP" color="bg-white" />
                            </div>
                            <p className="font-mono text-xs font-bold mb-2">"A SILENT FIRE"</p>
                            <p className="font-body text-sm mb-4 flex-grow">
                                My upcoming book. "Silfira" signifies a silent fire. Everybody is sent for a reason.
                            </p>
                            <Link to="/books/silfira" className="w-full bg-black text-white py-2 font-mono font-bold hover:bg-white hover:text-black border-[2px] border-black transition-colors flex items-center justify-center gap-2 text-sm">
                                PREVIEW <ArrowUpRight size={14} />
                            </Link>
                        </BrutalistCard>

                        {/* Projects Grid used to be a grid, now flex col for cleaner stack on mobile */}
                        <div className="flex flex-col gap-6">
                            {/* Medical App Idea */}
                            <BrutalistCard color="bg-[#E9D5FF]" className="p-6 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-display text-2xl font-bold">MED-APP</h3>
                                    <Badge text="IDEA" color="bg-white" />
                                </div>
                                <p className="font-mono text-xs font-bold mb-2">"CONSULTATION"</p>
                                <p className="font-body text-sm mb-4 flex-grow break-words">
                                    An app concept to help society find the best budget-friendly medical consultation nearby.
                                </p>
                                <button className="w-full bg-white text-black py-2 font-mono font-bold hover:bg-black hover:text-white border-[2px] border-black transition-colors flex items-center justify-center gap-2 text-sm">
                                    DETAILS <ArrowUpRight size={14} />
                                </button>
                            </BrutalistCard>
                        </div>
                    </div>

                    {/* Right Column - Quotes & Extra */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        {/* Quotes Card */}
                        <BrutalistCard color="bg-[#FEF08A]" className="p-6 flex-grow flex flex-col justify-center text-center">
                            <div className="mb-8">
                                <h2 className="font-display text-3xl font-black mb-4 leading-none">"कोशिश करने वालो की कभी हार नहीं होती!"</h2>
                                <div className="h-[3px] w-12 bg-black mx-auto"></div>
                            </div>
                            <div>
                                <h2 className="font-display text-2xl font-black mb-2 leading-tight">"जहाँ हो सुकून,<br />वहाँ हो जुनून।"</h2>
                                <p className="font-mono text-xs font-bold mt-2 uppercase tracking-widest">(Where there's peace, there’s passion)</p>
                            </div>

                        </BrutalistCard>

                        {/* Books Link */}
                        <Link to="/publishedauthor/anwesha/books" className="group">
                            <BrutalistCard color="bg-white" className="p-6 flex items-center justify-between group-hover:bg-black group-hover:text-white transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 border-[2px] border-black bg-[#BBF7D0] group-hover:border-white">
                                        <BookOpen size={20} className="stroke-black" />
                                    </div>
                                    <span className="font-display font-bold text-xl">BOOKS</span>
                                </div>
                                <ArrowUpRight size={24} className="stroke-[3px]" />
                            </BrutalistCard>
                        </Link>


                        {/* Writings Link */}
                        <Link to="/publishedauthor/anwesha/writings" className="group">
                            <BrutalistCard color="bg-black" className="p-6 flex items-center justify-between group-hover:bg-[#fe019a] transition-colors">
                                <div className="flex items-center gap-3 text-white">
                                    <div className="p-2 border-[2px] border-white bg-black">
                                        <PenTool size={20} className="stroke-white" />
                                    </div>
                                    <span className="font-display font-bold text-xl">WRITINGS</span>
                                </div>
                                <ArrowUpRight size={24} className="stroke-[3px] text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </BrutalistCard>
                        </Link>

                        {/* Link Card */}
                        <a href="#" className="group">
                            <BrutalistCard color="bg-white" className="p-6 flex items-center justify-between group-hover:bg-black group-hover:text-white transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 border-[2px] border-black bg-[#FBCFE8] group-hover:border-white">
                                        <Heart size={20} className="stroke-black" />
                                    </div>
                                    <span className="font-display font-bold text-xl">ETSY SHOP</span>
                                </div>
                                <ArrowUpRight size={24} className="stroke-[3px]" />
                            </BrutalistCard>
                        </a>

                        {/* Footer Box */}
                        <div className="bg-black p-4 text-white text-center font-mono text-xs border-[3px] border-black">
                            <p>© 2026 ANWESHA.TXT</p>
                            <p className="opacity-50 mt-1">NO RIGHTS RESERVED. JUST VIBES.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AnweshaAuthor;
