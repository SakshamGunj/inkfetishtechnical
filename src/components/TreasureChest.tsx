import React from 'react';
import { motion, Variants } from 'framer-motion';

interface TreasureChestProps {
    isOpen: boolean;
    onClick: () => void;
}

const TreasureChest: React.FC<TreasureChestProps> = ({ isOpen, onClick }) => {
    const chestVariants: Variants = {
        closed: { y: 0, rotateY: 0, scale: 1 },
        hover: {
            y: -15,
            rotateY: [0, -3, 3, -2, 2, 0],
            scale: 1.02,
            transition: {
                rotateY: { duration: 1.5, repeat: Infinity, repeatType: "reverse" },
                y: { duration: 0.8, repeat: Infinity, repeatType: "reverse" }
            }
        },
        open: { y: 30, scale: 0.9 }
    };

    const lidVariants: Variants = {
        closed: { rotateX: 0 },
        open: { rotateX: -120, transition: { type: "spring", stiffness: 100, damping: 12 } } // Bouncy open
    };

    const glowVariants: Variants = {
        closed: { opacity: 0, scale: 0.8 },
        open: {
            opacity: [0, 1, 0.8, 1],
            scale: 1.5,
            transition: { opacity: { repeat: Infinity, duration: 2 }, duration: 0.5 }
        }
    };

    // Reference Palette (Vibrant & Engaging):
    // Gold: #FFD700 (Bright) -> #FFA500 (Deep)
    // Wood: #5D4037 (Rich Brown) -> #3E2723 (Dark)

    return (
        <div className="relative w-80 h-64 perspective-1000 cursor-pointer group select-none" onClick={onClick}>

            {/* External Glow / Aura */}
            <motion.div
                animate={isOpen ? { opacity: 0.6, scale: 1.2 } : { opacity: 0.2, scale: 1 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-20 bg-gold/50 blur-[60px] rounded-full transition-all duration-700"
            />

            <motion.div
                className="w-full h-full relative preserve-3d"
                variants={chestVariants}
                initial="closed"
                whileHover={!isOpen ? "hover" : undefined}
                animate={isOpen ? "open" : "closed"}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* ==================== LID GROUP ==================== */}
                <motion.div
                    className="absolute top-0 left-0 w-full h-20 origin-top preserve-3d z-20"
                    variants={lidVariants}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* --- Lid Top (Arched) --- */}
                    {/* Using a gradient to simulate curvature on a flat plane for performance, but with 3D layers for depth */}
                    <div className="absolute inset-0 bg-[#5D4037] rounded-t-[50px] transform translate-z-[48px] overflow-hidden"
                        style={{ transform: 'translateZ(48px)' }}>

                        {/* Wood Texture */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-60 mix-blend-multiply" />

                        {/* Top Highlight (Curvature) */}
                        <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white/20 to-transparent" />

                        {/* Thick Gold Bands */}
                        <div className="absolute top-0 bottom-0 left-10 w-8 bg-gradient-to-r from-[#FFD700] via-[#FFFFE0] to-[#B8860B] border-x border-[#B8860B] shadow-lg" />
                        <div className="absolute top-0 bottom-0 right-10 w-8 bg-gradient-to-r from-[#FFD700] via-[#FFFFE0] to-[#B8860B] border-x border-[#B8860B] shadow-lg" />
                    </div>

                    {/* --- Lid Front Lip (The Clasp Area) --- */}
                    <div className="absolute bottom-0 left-0 w-full h-12 origin-bottom transform rotate-x-[-90deg] translate-y-12 bg-[#3E2723] border-b-[6px] border-[#FFD700] flex items-center justify-center translate-z-[48px]"
                        style={{ transform: 'rotateX(-90deg) translateY(48px) translateZ(48px)' }}>
                        {/* Large Gold Hasp */}
                        <div className="w-16 h-16 bg-gradient-to-b from-[#FFD700] to-[#DAA520] rounded-b-xl border-2 border-[#B8860B] shadow-xl flex items-center justify-center relative -mt-8 z-20">
                            <div className="w-4 h-6 bg-[#2A1B15] rounded-full shadow-inner" />
                        </div>
                    </div>

                    {/* --- Lid Back Face --- */}
                    <div className="absolute top-0 left-0 w-full h-12 origin-top transform rotate-x-[-90deg] bg-[#2A1B15]" />

                    {/* --- Lid Sides --- */}
                    {[0, 1].map((side) => (
                        <div key={side}
                            className={`absolute top-0 w-48 h-20 bg-[#3E2723] rounded-t-full border-[6px] border-[#FFD700] origin-${side === 0 ? 'left' : 'right'} transform rotate-y-${side === 0 ? '[-90deg]' : '[90deg]'} overflow-hidden`}
                            style={{ [side === 0 ? 'left' : 'right']: 0, transform: `rotateY(${side === 0 ? -90 : 90}deg)`, width: '96px' }}>
                            <div className="absolute inset-0 bg-black/20" /> {/* Shading */}
                        </div>
                    ))}
                </motion.div>


                {/* ==================== BODY GROUP ==================== */}
                <div className="absolute bottom-0 w-full h-44 preserve-3d">

                    {/* --- Front Face --- */}
                    <div className="absolute inset-0 bg-[#5D4037] transform translate-z-[48px] rounded-b-xl border-x-[6px] border-b-[6px] border-[#FFD700] overflow-hidden"
                        style={{ transform: 'translateZ(48px)' }}>

                        {/* Wood Texture */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-60 mix-blend-multiply" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" /> {/* Gradient shading */}

                        {/* Corner Bumpers */}
                        <div className="absolute bottom-0 left-0 w-10 h-10 border-l-[6px] border-b-[6px] border-[#FFD700] rounded-bl-xl bg-[#DAA520]" />
                        <div className="absolute bottom-0 right-0 w-10 h-10 border-r-[6px] border-b-[6px] border-[#FFD700] rounded-br-xl bg-[#DAA520]" />

                        {/* Vertical Bands */}
                        <div className="absolute top-0 bottom-0 left-10 w-8 bg-gradient-to-r from-[#FFD700] via-[#FFFFE0] to-[#B8860B] border-x border-[#B8860B] shadow-md flex flex-col justify-around py-3">
                            {[...Array(3)].map((_, i) => <div key={i} className="w-4 h-4 mx-auto rounded-full bg-[#B8860B] shadow-inner" />)}
                        </div>
                        <div className="absolute top-0 bottom-0 right-10 w-8 bg-gradient-to-r from-[#FFD700] via-[#FFFFE0] to-[#B8860B] border-x border-[#B8860B] shadow-md flex flex-col justify-around py-3">
                            {[...Array(3)].map((_, i) => <div key={i} className="w-4 h-4 mx-auto rounded-full bg-[#B8860B] shadow-inner" />)}
                        </div>

                        {/* Large Lock Body */}
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-20 h-20">
                            <div className="w-full h-full bg-gradient-to-br from-[#FFD700] to-[#DAA520] rounded-full border-4 border-[#B8860B] shadow-2xl flex items-center justify-center">
                                <div className="w-4 h-8 bg-[#2A1B15] rounded-full shadow-inner border border-[#B8860B]" />
                            </div>
                        </div>
                    </div>

                    {/* --- Back Face --- */}
                    <div className="absolute inset-0 bg-[#2A1B15] transform rotate-y-[180deg] translate-z-[48px]"
                        style={{ transform: 'rotateY(180deg) translateZ(48px)' }} />

                    {/* --- Sides --- */}
                    <div className="absolute left-0 top-0 h-full w-[96px] bg-[#3E2723] border-x-[6px] border-b-[6px] border-[#FFD700] origin-left transform rotate-y-[-90deg] flex items-center justify-center shadow-inset">
                        <div className="w-14 h-14 rounded-full border-4 border-[#DAA520] flex items-center justify-center">
                            <div className="w-10 h-2 bg-[#2A1B15] rounded-full" /> {/* Handle */}
                        </div>
                    </div>
                    <div className="absolute right-0 top-0 h-full w-[96px] bg-[#3E2723] border-x-[6px] border-b-[6px] border-[#FFD700] origin-right transform rotate-y-[90deg] flex items-center justify-center shadow-inset">
                        <div className="w-14 h-14 rounded-full border-4 border-[#DAA520] flex items-center justify-center">
                            <div className="w-10 h-2 bg-[#2A1B15] rounded-full" /> {/* Handle */}
                        </div>
                    </div>

                    {/* --- Bottom Face --- */}
                    <div className="absolute bottom-0 w-full h-[96px] bg-black/80 origin-bottom transform rotate-x-[-90deg] shadow-2xl" />

                    {/* --- MAGICAL INTERIOR --- */}
                    <div className="absolute inset-0 top-1 bg-[#1A0505] transform translate-z-[40px] flex items-center justify-center overflow-hidden border-4 border-[#FFD700]"
                        style={{ transform: 'translateZ(40px) scaleX(0.92)' }}>

                        {/* The Treasure Glow */}
                        <motion.div
                            variants={glowVariants}
                            className="w-full h-full relative"
                        >
                            {/* Blinding Center Light */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[150%] bg-[radial-gradient(circle_at_bottom,_#FFF_10%,_#FFD700_40%,_transparent_80%)] blur-lg mix-blend-screen" />

                            {/* Floating Text - NEW */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                            >
                                <h3 className="font-[Cinzel] font-black text-[#5e2916] text-3xl tracking-[0.2em] drop-shadow-sm scale-y-110">THE VAULT</h3>
                            </motion.div>

                            {/* Particles */}
                            <div className="absolute inset-0 overflow-hidden">
                                {[...Array(10)].map((_, i) => (
                                    <div key={i} className="absolute w-2 h-2 bg-white rounded-full animate-ping"
                                        style={{
                                            top: `${Math.random() * 80 + 20}%`,
                                            left: `${Math.random() * 100}%`,
                                            animationDelay: `${Math.random()}s`,
                                            opacity: 0.6
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

            </motion.div>
        </div>
    );
};
export default TreasureChest;
