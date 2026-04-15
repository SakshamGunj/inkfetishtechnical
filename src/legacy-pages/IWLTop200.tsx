import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Trophy, Medal, Star, Scroll } from 'lucide-react';
import Navbar from '../components/Navbar'; // We'll add this if needed, or build custom header
import { Link } from 'react-router-dom';

// Function to generate 199 placeholder Indian writer names
const generateIndianNames = () => {
    const firstNames = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayaan", "Krishna", "Ishaan", "Shaurya", "Atharv", "Advik", "Pranav", "Dhruv", "Rudra", "Nishant", "Ananya", "Myra", "Aarohi", "Saanvi", "Diya", "Pari", "Dhriti", "Isha", "Riya", "Aadhya", "Navya", "Avni", "Kavya", "Rahul", "Neha", "Pooja", "Vikram", "Suresh", "Ramesh", "Deepak", "Sneha", "Kiran", "Amit", "Sumit", "Ravi", "Sanjay", "Meena", "Geeta", "Sunita", "Anita", "Ritu", "Mohit", "Rohit"];
    const lastNames = ["Sharma", "Verma", "Gupta", "Singh", "Kumar", "Das", "Bose", "Chatterjee", "Banerjee", "Mukherjee", "Patel", "Desai", "Mehta", "Parekh", "Shah", "Joshi", "Kulkarni", "Deshpande", "Reddy", "Rao", "Nair", "Menon", "Pillai", "Iyer", "Iyengar", "Rajput", "Chauhan", "Yadav", "Tiwari", "Mishra", "Pandey", "Shukla", "Dubey", "Agnihotri", "Srivastava", "Saxena", "Mathur", "Bhatnagar", "Jain", "Agarwal", "Goel", "Garg", "Bansal", "Kaur", "Gill", "Sandhu", "Brar", "Dhillon", "Grewal", "Chopra"];

    const names = new Set<string>();

    // Always include Saksham Gunj
    names.add("Saksham Gunj");

    while (names.size < 200) {
        const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
        const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
        names.add(`${fn} ${ln}`);
    }

    // Convert set to array, sort Saksham to the top, then random sort the rest slightly, or just alphabetical
    const namesArray = Array.from(names);

    // Let's sort alphabetically but ensure Saksham is highlighted later, or we can just randomize them
    return namesArray.sort((a, b) => a.localeCompare(b));
};

const IWLTop200 = () => {
    const [names, setNames] = useState<string[]>([]);

    useEffect(() => {
        setNames(generateIndianNames());
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#1A0505] font-sans selection:bg-[#420C0C] selection:text-[#FFD700] relative text-[#FFD700]">
            <Helmet>
                <title>IWL Season 1 | Top 200 Writers</title>
                <meta name="description" content="Announcing the Top 200 writers of the Indian Writers League Season 1." />
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
                `}</style>
            </Helmet>

            {/* Cinematic Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#420C0C] via-[#2A0A0A] to-[#000000]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 animate-pulse" />
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="absolute rounded-full bg-[#FFD700] opacity-30 animate-pulse" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, width: `${Math.random() * 3}px`, height: `${Math.random() * 3}px`, animationDuration: `${Math.random() * 3 + 2}s` }} />
                    ))}
                </div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-24">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <div className="inline-flex items-center justify-center gap-2 text-[#FFD700] text-sm md:text-base mb-6 tracking-[0.2em] font-serif border border-[#FFD700]/50 px-6 py-2 rounded-full bg-black/50 backdrop-blur-sm">
                        <Trophy className="w-4 h-4" /> OFFICIAL ANNOUNCEMENT
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-serif text-center leading-tight drop-shadow-[0_0_15px_rgba(255,215,0,0.3)] mb-6">
                        <span className="block text-[#E5D4B3] text-2xl md:text-4xl lg:text-5xl mb-2">INDIAN WRITERS LEAGUE</span>
                        <span className="block text-[#FFD700] font-bold">TOP 200</span>
                        <span className="block text-[#E5D4B3] mt-2 text-xl md:text-3xl tracking-[0.2em] font-light">SEASON 1</span>
                    </h1>

                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto mb-8"></div>

                    <p className="max-w-2xl mx-auto text-[#E5D4B3] font-serif text-lg md:text-xl leading-relaxed opacity-90">
                        Out of thousands of phenomenal entries, we proudly present the elite literary voices that form the Top 200 of the Indian Writers League.
                    </p>
                </motion.div>

                {/* The List Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <div className="bg-black/40 backdrop-blur-md border border-[#FFD700]/20 rounded-2xl p-6 md:p-12 shadow-[0_0_30px_rgba(66,12,12,0.8)] relative overflow-hidden">

                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#FFD700]/50 rounded-tl-xl"></div>
                        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#FFD700]/50 rounded-tr-xl"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#FFD700]/50 rounded-bl-xl"></div>
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#FFD700]/50 rounded-br-xl"></div>

                        <div className="flex items-center justify-center gap-4 mb-12">
                            <Scroll className="text-[#FFD700] w-8 h-8 opacity-70" />
                            <h2 className="text-3xl md:text-4xl font-serif text-[#FFD700] text-center tracking-[0.1em]">THE HONOREES</h2>
                            <Scroll className="text-[#FFD700] w-8 h-8 opacity-70" />
                        </div>

                        {/* Grid of Names */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {names.map((name, index) => {
                                const isTarget = name === "Saksham Gunj";
                                return (
                                    <div
                                        key={index}
                                        className={`p-4 rounded-lg font-serif text-center transition-all duration-300 ${isTarget
                                            ? 'bg-gradient-to-br from-[#420C0C] to-[#2A0A0A] border-2 border-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.5)] transform hover:scale-105 z-10'
                                            : 'bg-black/30 border border-[#FFD700]/10 hover:border-[#FFD700]/40 hover:bg-black/50 text-[#E5D4B3]'
                                            }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            {isTarget && <Star className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />}
                                            <span className={`${isTarget ? 'text-[#FFD700] font-bold text-lg' : 'text-base opacity-90'}`}>
                                                {name}
                                            </span>
                                            {isTarget && <Star className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* Footer / CTA
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="mt-16 text-center"
                >
                    <p className="text-[#E5D4B3] font-serif mb-6 opacity-70">
                        Congratulations to all the selected writers. This is just the beginning of your legendary journey.
                    </p>
                </motion.div>
                */}

            </div>
        </div>
    );
};

export default IWLTop200;
