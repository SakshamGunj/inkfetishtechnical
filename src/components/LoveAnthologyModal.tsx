import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface LoveAnthologyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoveAnthologyModal: React.FC<LoveAnthologyModalProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const handleJoin = () => {
        navigate('/love-at-minus-one');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col md:flex-row bg-[#0c0502] border border-[#FFD700]/30 rounded-2xl overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white z-50 bg-black/50 rounded-full p-1 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Background Image/Texture */}
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] pointer-events-none" />

                        {/* Left Side: Image */}
                        <div className="relative h-64 md:h-auto md:w-5/12 shrink-0 overflow-hidden">
                            <img
                                src="/images/love-at-minus-one-cover.jpg"
                                alt="Love at Minus One Book Cover"
                                className="w-full h-full object-cover object-top transform transition-transform duration-700 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0c0502] via-transparent to-transparent opacity-90 md:opacity-100" />
                        </div>

                        {/* Right Side: Content */}
                        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center relative z-10 text-center md:text-left overflow-y-auto">

                            {/* Header Group */}
                            <div className="mb-4">
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                    <Sparkles className="w-3 h-3 text-[#FFD700]" />
                                    <span className="text-[10px] font-[Cinzel] tracking-[0.2em] text-[#FFD700] uppercase">Official Invitation</span>
                                </div>
                                <p className="text-slate-400 font-serif italic text-sm md:text-base">
                                    This Winter, we are launching...
                                </p>
                            </div>

                            {/* Title Group */}
                            <div className="mb-6">
                                <h2 className="text-2xl md:text-3xl font-[Cinzel] text-white leading-tight drop-shadow-md">
                                    Love at Minus One
                                </h2>
                                <p className="text-lg md:text-xl text-[#FFD700]/90 font-[Playfair Display] italic mt-1">
                                    Anthology
                                </p>
                            </div>

                            {/* Additional Info */}
                            <div className="space-y-1 mb-6">
                                <p className="text-slate-200 text-sm md:text-base font-light">
                                    Your opportunity to become a <strong className="text-white font-semibold">Published Co-Author.</strong>
                                </p>
                                <p className="text-slate-400 text-xs md:text-sm uppercase tracking-wide">
                                    Releasing First Week of February
                                </p>
                            </div>

                            {/* Themes */}
                            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6 text-xs md:text-sm text-slate-300 font-serif">
                                <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-full">💔 Love Breakups</span>
                                <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-full">❄️ Situationships</span>
                                <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-full">🧊 Unrequited</span>
                            </div>

                            {/* Stats */}
                            <div className="bg-[#1A120B] border border-[#3E2723] rounded-lg p-3 mb-6 shadow-inner">
                                <p className="text-[#8B7355] text-xs uppercase tracking-widest mt-2 flex items-center justify-center gap-4">
                                    <span>132 writers joined</span>
                                    <span className="w-1 h-1 bg-[#8B7355] rounded-full" />
                                    <span className="text-[#FFD700]">Only 68 spots left</span>
                                </p>
                            </div>

                            {/* CTA */}
                            <div className="space-y-3">
                                <Button
                                    onClick={handleJoin}
                                    className="w-full bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-black font-bold uppercase tracking-wider hover:brightness-110 py-3 shadow-lg shadow-gold/10"
                                >
                                    Yes, I want to be a Co-Author
                                </Button>
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest text-center">
                                    Legitimate ISBN • Global Distribution
                                </p>
                            </div>

                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default LoveAnthologyModal;
