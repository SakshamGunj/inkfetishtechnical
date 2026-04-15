'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, ArrowUpRight, BookOpen, PenTool, Sparkles, Instagram, Mail } from 'lucide-react';
import Link from 'next/link';

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

const AnweshaClient = () => {
    return (
        <div className="min-h-screen bg-[#F0F0F0] font-sans text-black overflow-x-hidden selection:bg-black selection:text-white pb-20">
            {/* Navbar */}
            <div className="bg-black text-white py-4 px-6 border-b-[3px] border-black font-bold text-lg sm:text-xl tracking-wider flex justify-between items-center">
                <Link href="/">INKFETISH PUBLICATION</Link>
                <span className="text-[10px] sm:text-xs font-mono bg-[#fe019a] text-white px-2 py-1 border border-white font-bold">ESTD. 2025</span>
            </div>

            {/* Marquee Header */}
            <div className="bg-[#FEF08A] border-b-[3px] border-black py-3 overflow-hidden font-mono font-bold text-sm tracking-widest uppercase">
                <div className="whitespace-nowrap animate-marquee flex gap-4">
                    <span>WRITER • ARTIST • DREAMER • ANWESHA • 14 YEARS OLD • SILFIRA COMING SOON • LEARNER • CREATOR • WRITER • ARTIST • DREAMER • ANWESHA • 14 YEARS OLD • SILFIRA COMING SOON • LEARNER • CREATOR •</span>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 min-h-[85vh]">

                    {/* Left Column */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <BrutalistCard color="bg-[#E9D5FF]" className="p-4 relative overflow-hidden group">
                            <div className="mb-2 font-bold text-lg border-b-[3px] border-black inline-block uppercase">ABOUT ME</div>
                            <div className="absolute top-4 right-4 z-10">
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
                                    <h3 className="text-2xl font-black leading-none uppercase">ANWESHA</h3>
                                    <p className="text-sm font-bold opacity-60">14 YEARS OLD</p>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-10 h-10 bg-white border-[2px] border-black flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        <Instagram size={18} />
                                    </div>
                                    <div className="w-10 h-10 bg-white border-[2px] border-black flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        <Mail size={18} />
                                    </div>
                                </div>
                            </div>
                        </BrutalistCard>

                        <BrutalistCard color="bg-[#FBCFE8]" className="p-6 flex-grow flex flex-col justify-center">
                            <h3 className="text-xl font-bold mb-4 border-b-[3px] border-black inline-block pb-1 uppercase">QUICK INFO</h3>
                            <div className="space-y-4 font-mono text-sm font-bold">
                                {[
                                    { label: 'AGE', val: '14' },
                                    { label: 'ROLE', val: 'WRITER' },
                                    { label: 'MODE', val: 'LIVE', color: 'text-green-600' }
                                ].map((s, i) => (
                                    <div key={i} className="flex justify-between items-center bg-white border-[2px] border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] uppercase">
                                        <span>{s.label}</span>
                                        <span className={s.color}>{s.val}</span>
                                    </div>
                                ))}
                            </div>
                        </BrutalistCard>
                    </div>

                    {/* Middle Column */}
                    <div className="lg:col-span-4 flex flex-col gap-6 order-first lg:order-none">
                        <div className="bg-black text-white p-8 border-[3px] border-black shadow-[6px_6px_0_0_#fe019a]">
                            <h1 className="text-5xl md:text-7xl lg:text-6xl font-black leading-tight tracking-tighter uppercase italic">
                                HELLO<br />
                                <span className="text-[#FEF08A] not-italic">WORLD</span>
                            </h1>
                        </div>

                        <BrutalistCard color="bg-white" className="p-8 flex-grow flex flex-col gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-6 h-6 text-[#FBCFE8]" />
                                    <h3 className="text-2xl font-black uppercase">MY STORY</h3>
                                </div>
                                <p className="text-base leading-relaxed font-bold opacity-80">
                                    I'm a 14-year-old artist & writer. My journey started in <span className="bg-[#FEF08A] px-1 border-2 border-black">March 2025</span>. I wanted a place to share my feelings... I realized I could create a website to show my thoughts to the world.
                                </p>
                            </div>

                            <div className="border-t-[4px] border-black pt-6">
                                <h3 className="text-2xl font-black uppercase mb-4">WHY I WRITE</h3>
                                <p className="text-base leading-relaxed font-bold opacity-80 underline decoration-[#FBCFE8] decoration-4 underline-offset-4">
                                    I write for myself. I realized my skills like writing, art, and dance are what keep me going.
                                </p>
                            </div>

                            <div className="flex gap-2 flex-wrap pt-4">
                                <Badge text="Debating" color="bg-[#E9D5FF]" />
                                <Badge text="Law" color="bg-[#BBF7D0]" />
                                <Badge text="Dance" color="bg-[#FBCFE8]" />
                            </div>
                        </BrutalistCard>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <BrutalistCard color="bg-[#FEF08A]" className="p-10 flex-grow flex flex-col justify-center text-center">
                            <div className="mb-10">
                                <h2 className="text-4xl font-black mb-6 leading-[0.9] uppercase italic">"Don't give up!"</h2>
                                <div className="h-[4px] w-20 bg-black mx-auto"></div>
                            </div>
                            <h2 className="text-3xl font-black uppercase italic leading-tight">"Where there is peace,<br />there is passion."</h2>
                        </BrutalistCard>

                        <Link href="/publishedauthor/anwesha/books" className="group">
                            <BrutalistCard color="bg-white" className="p-8 flex items-center justify-between group-hover:bg-black group-hover:text-white transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 border-[3px] border-black bg-[#BBF7D0] group-hover:bg-white transition-colors">
                                        <BookOpen size={24} className="text-black" />
                                    </div>
                                    <span className="font-black text-2xl uppercase italic">MY BOOKS</span>
                                </div>
                                <ArrowUpRight size={32} className="stroke-[3px]" />
                            </BrutalistCard>
                        </Link>

                        <div className="bg-black p-4 text-white text-center font-mono text-xs border-[3px] border-black font-bold uppercase tracking-widest">
                            <p>© 2026 ANWESHA</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AnweshaClient;
