'use client';

import React from 'react';
import Link from 'next/link';
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

const AnweshaClientProfile = () => {
    return (
        <div className="min-h-screen bg-[#F0F0F0] font-sans text-black overflow-x-hidden selection:bg-black selection:text-white pb-20">
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
            <div className="bg-[#FEF08A] border-b-[3px] border-black py-3 overflow-hidden font-mono font-bold text-sm tracking-widest uppercase">
                <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap gap-8">
                    {Array(4).fill(0).map((_, i) => (
                        <span key={i}>WRITER • ARTIST • DREAMER • ANWESHA • 14 YEARS OLD • SILFIRA COMING SOON • LEARNER • CREATOR • </span>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 min-h-[85vh]">

                    {/* Left Column - Profile & Quick Stats */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
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
                            </div>
                        </BrutalistCard>
                    </div>

                    {/* Middle Column - Main Info */}
                    <div className="lg:col-span-4 flex flex-col gap-6 order-first lg:order-none">
                        <div className="bg-black text-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
                            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-5xl xl:text-7xl font-black leading-[0.85] tracking-tighter break-words">
                                HELLO<br />
                                <span className="text-[#FEF08A]">WORLD</span>
                            </h1>
                        </div>

                        <BrutalistCard color="bg-white" className="p-6 flex-grow flex flex-col gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles className="w-6 h-6 text-[#FBCFE8] fill-current stroke-black stroke-[1.5]" />
                                    <h3 className="font-display text-xl font-bold">THE JOURNEY</h3>
                                </div>
                                <p className="font-body text-sm leading-relaxed mb-4 break-words">
                                    I'm a 14-year-old artist & writer. My journey started on a random day in <span className="bg-[#FEF08A] px-1 border border-black font-bold">March 2025</span> when I was going through a rough phase.
                                </p>
                            </div>

                            <div className="border-t-[3px] border-black pt-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-display text-2xl font-bold">SILFIRA</h3>
                                    <Badge text="WIP" color="bg-white" />
                                </div>
                                <p className="font-body text-sm mb-4">"A silent fire. Everybody is sent for a reason."</p>
                                <Link href="/books/silfira" className="w-full bg-black text-white py-2 font-mono font-bold hover:bg-white hover:text-black border-[2px] border-black transition-colors flex items-center justify-center gap-2 text-sm">
                                    PREVIEW <ArrowUpRight size={14} />
                                </Link>
                            </div>
                        </BrutalistCard>
                    </div>

                    {/* Right Column - Links & Extra */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <BrutalistCard color="bg-black" className="p-6 flex flex-col justify-center text-center text-white">
                            <h2 className="font-display text-3xl font-black mb-4">"कोशिश करने वालो की कभी हार नहीं होती!"</h2>
                        </BrutalistCard>

                        <Link href="/publishedauthor/anwesha/books" className="group">
                            <BrutalistCard color="bg-white" className="p-6 flex items-center justify-between group-hover:bg-black group-hover:text-white transition-colors">
                                <span className="font-display font-bold text-xl">BOOKS</span>
                                <ArrowUpRight size={24} className="stroke-[3px]" />
                            </BrutalistCard>
                        </Link>

                        <div className="bg-black p-4 text-white text-center font-mono text-xs border-[3px] border-black">
                            <p>© 2026 ANWESHA.TXT</p>
                        </div>
                    </div>

                </div>
            </div>
            
            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
};

export default AnweshaClientProfile;
