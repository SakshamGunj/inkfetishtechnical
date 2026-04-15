'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Heart, BookOpen, AlertCircle, Clock } from 'lucide-react';
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

const SilfiraClientProfile = () => {
    return (
        <div className="min-h-screen bg-[#F0F0F0] font-sans text-black overflow-x-hidden selection:bg-black selection:text-white pb-20">
            <StructuredData 
                data={{
                    "@context": "https://schema.org",
                    "@type": "Book",
                    "name": "Silfira",
                    "alternateName": "A Silent Fire",
                    "author": {
                        "@type": "Person",
                        "name": "Anwesha"
                    },
                    "description": "It explores the unsaid emotions, the quiet struggles, and the burning passion that resides within us all.",
                    "publisher": {
                        "@type": "Organization",
                        "name": "Inkfetish Publication"
                    },
                    "url": "https://www.inkfetish.in/books/silfira"
                }}
            />

            {/* Navbar */}
            <div className="bg-black text-white py-4 px-6 border-b-[3px] border-black font-bold text-lg sm:text-xl tracking-wider flex justify-between items-center sticky top-0 z-50">
                <Link href="/publishedauthor/anwesha" className="flex items-center gap-2 hover:text-[#FEF08A] transition-colors">
                    <ArrowLeft size={20} />
                    <span>BACK TO ANWESHA</span>
                </Link>
                <span className="text-[10px] sm:text-xs font-mono bg-[#fe019a] text-white px-2 py-1 border border-white">COMING SOON</span>
            </div>

            <div className="container mx-auto px-4 py-8 lg:py-12 max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Left: Book Cover / Visual */}
                    <div className="flex flex-col gap-6">
                        <BrutalistCard color="bg-[#BBF7D0]" className="p-8 flex items-center justify-center aspect-[3/4] relative overflow-hidden">
                            <div className="text-center relative z-10">
                                <h1 className="text-6xl font-black mb-2 tracking-tighter">SILFIRA</h1>
                                <p className="font-mono text-xl font-bold tracking-widest uppercase mb-8">A Silent Fire</p>
                                <div className="w-16 h-16 bg-black rounded-full mx-auto flex items-center justify-center animate-pulse">
                                    <BookOpen className="text-white w-8 h-8" />
                                </div>
                            </div>
                        </BrutalistCard>
                    </div>

                    {/* Right: Details */}
                    <div className="flex flex-col gap-6">
                        <div className="bg-black text-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
                            <h2 className="text-4xl font-bold mb-2">ABOUT THE BOOK</h2>
                            <p className="text-lg leading-relaxed opacity-90">
                                "Silfira" signifies a silent fire. It explores the unsaid emotions, the quiet struggles, and the burning passion that resides within us all.
                            </p>
                        </div>

                        <BrutalistCard color="bg-white" className="p-6">
                            <h3 className="text-2xl font-bold mb-4">THE CONCEPT</h3>
                            <p className="text-base leading-relaxed mb-4">
                                Everybody is sent for a reason. Sometimes, keeping the fire silent is the loudest way to burn.
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                <Badge text="Poetry" color="bg-[#E9D5FF]" />
                                <Badge text="Prose" color="bg-[#BBF7D0]" />
                            </div>
                        </BrutalistCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SilfiraClientProfile;
