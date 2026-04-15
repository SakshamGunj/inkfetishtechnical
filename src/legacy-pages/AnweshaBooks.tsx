import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Book, ArrowUpRight, BookOpen, Star, Flag } from 'lucide-react';
import { Link } from 'react-router-dom';

const BrutalistCard = ({ children, className = "", color = "bg-white" }: { children: React.ReactNode, className?: string, color?: string }) => (
    <div className={`${color} border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${className} hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 h-full flex flex-col`}>
        {children}
    </div>
);

const Badge = ({ text, color = "bg-yellow-300" }: { text: string, color?: string }) => (
    <span className={`${color} border-[2px] border-black px-3 py-1 font-bold text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] inline-block`}>
        {text}
    </span>
);

const AnweshaBooks = () => {
    return (
        <div className="min-h-screen bg-[#F0F0F0] font-sans text-black overflow-x-hidden selection:bg-black selection:text-white">
            <Helmet>
                <title>ANWESHA | Library of Books</title>
                <meta name="description" content="Explore books written by Anwesha. Featuring Silfira and more coming soon." />
            </Helmet>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Syne:wght@700;800&display=swap');
                .font-display { font-family: 'Syne', sans-serif; }
                .font-body { font-family: 'Space Grotesk', sans-serif; }
            `}</style>

            {/* Navbar */}
            <div className="bg-black text-white py-4 px-6 border-b-[3px] border-black font-display font-bold text-lg sm:text-xl tracking-wider flex justify-between items-center sticky top-0 z-50">
                <Link to="/publishedauthor/anwesha" className="flex items-center gap-2 hover:text-[#FEF08A] transition-colors">
                    <ArrowLeft size={20} />
                    <span>BACK TO PROFILE</span>
                </Link>
                <div className="flex items-center gap-2">
                    <Book size={16} />
                    <span className="hidden sm:inline">LIBRARY</span>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 lg:py-12 max-w-6xl">

                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="font-display text-5xl sm:text-6xl md:text-8xl font-black leading-none mb-4 tracking-tighter">
                        THE <span className="text-[#fe019a] text-stroke-black">LIBRARY</span>
                    </h1>
                    <p className="font-mono font-bold text-lg max-w-2xl mx-auto">
                        STORIES THAT BURN, HEAL, AND INSPIRE. WELCOME TO MY WORLD OF BOOKS.
                    </p>
                </div>

                {/* Books Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Book 1: Silfira */}
                    <Link to="/books/silfira" className="group block h-full">
                        <BrutalistCard color="bg-[#BBF7D0]" className="p-0 overflow-hidden group-hover:bg-[#fe019a] transition-colors">
                            <div className="p-6 border-b-[3px] border-black bg-[#BBF7D0] relative overflow-hidden h-64 flex items-center justify-center">
                                {/* Abstract Cover Art */}
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')] opacity-20"></div>
                                <div className="text-center relative z-10 p-4 border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-3deg] group-hover:rotate-0 transition-transform duration-300">
                                    <h2 className="font-display text-3xl font-black">SILFIRA</h2>
                                    <p className="font-mono text-xs mt-1">A SILENT FIRE</p>
                                </div>
                                <div className="absolute top-4 right-4 animate-bounce">
                                    <Badge text="NEW" color="bg-[#FEF08A]" />
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow bg-white group-hover:bg-white/95 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-display text-2xl font-bold">SILFIRA</h3>
                                    <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </div>
                                <p className="font-body text-sm mb-4 line-clamp-3">
                                    "Silfira" signifies a silent fire. Everybody is sent for a reason. Sometimes, keeping the fire silent is the loudest way to burn.
                                </p>
                                <div className="mt-auto pt-4 border-t-[2px] border-black flex gap-2">
                                    <Badge text="POETRY" color="bg-[#E9D5FF]" />
                                    <Badge text="PROSE" color="bg-[#FBCFE8]" />
                                </div>
                            </div>
                        </BrutalistCard>
                    </Link>

                    {/* Placeholder for Next Book */}
                    <BrutalistCard color="bg-[#F0F0F0]" className="p-8 flex flex-col items-center justify-center text-center opacity-70 border-dashed">
                        <div className="w-16 h-16 rounded-full bg-black/10 flex items-center justify-center mb-4">
                            <Star className="w-8 h-8 text-black/40" />
                        </div>
                        <h3 className="font-display text-2xl font-bold mb-2">NEXT TITLE</h3>
                        <p className="font-body text-sm font-bold">WORK IN PROGRESS</p>
                        <div className="mt-4">
                            <Badge text="COMING SOON" color="bg-white" />
                        </div>
                    </BrutalistCard>

                </div>
            </div>
        </div>
    );
};

export default AnweshaBooks;
