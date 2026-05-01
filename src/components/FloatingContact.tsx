'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Mail, X, Phone, MoveRight, HelpCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function FloatingContact() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    // Hide on festival app pages (register, submit, read)
    // Keep it on landing page (/poetry-festival-s2)
    if (pathname?.startsWith('/poetry-festival-s2/')) return null;

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const contactDetails = [
        {
            icon: <Phone className="w-5 h-5" />,
            label: "WhatsApp",
            value: "+91 92166 81908",
            link: "https://wa.me/919216681908",
            color: "text-green-500"
        },
        {
            icon: <Mail className="w-5 h-5" />,
            label: "Email",
            value: "inkfetishh@gmail.com",
            link: "mailto:inkfetishh@gmail.com",
            color: "text-blue-500"
        }
    ];

    return (
        <div className="fixed bottom-6 right-6 z-[9999]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={modalRef}
                        initial={{ opacity: 0, y: 20, scale: 0.9, bgBlur: 0 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="absolute bottom-20 right-0 w-80 bg-white border border-ink-900/10 shadow-[0_20px_60px_rgba(0,0,0,0.15)] rounded-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-ink-900 p-6 text-white relative">
                            <div className="absolute top-0 right-0 p-4">
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="hover:rotate-90 transition-transform duration-300"
                                >
                                    <X size={20} className="opacity-60" />
                                </button>
                            </div>
                            <h3 className="text-[10px] font-sans font-black uppercase tracking-[0.3em] text-gold mb-2">Editorial Desk</h3>
                            <h4 className="text-2xl font-serif font-black uppercase tracking-tighter">Get In Touch.</h4>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4 bg-[#FDFBF7]">
                            {contactDetails.map((item, i) => (
                                <a 
                                    key={i}
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-5 p-4 bg-white border border-ink-900/5 hover:border-gold hover:shadow-lg transition-all group"
                                >
                                    <div className={`${item.color} group-hover:scale-110 transition-transform`}>
                                        {item.icon}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-ink-400 mb-1">{item.label}</span>
                                        <span className="text-sm font-sans font-black text-ink-900">{item.value}</span>
                                    </div>
                                    <MoveRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-all text-gold" />
                                </a>
                            ))}
                        </div>

                        <div className="px-6 py-4 bg-white border-t border-ink-900/5 text-center">
                           <p className="text-[10px] font-sans font-medium text-ink-400 uppercase tracking-widest leading-relaxed">
                              We typically respond within <br/> 2–4 business hours.
                           </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Trigger Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 relative ${
                    isOpen ? 'bg-white text-ink-900 border border-ink-900/10' : 'bg-ink-900 text-white'
                }`}
            >
                {isOpen ? <X size={24} /> : (
                    <div className="relative">
                        <MessageCircle size={24} />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-gold rounded-full border-2 border-ink-900 animate-pulse" />
                    </div>
                )}
            </motion.button>
        </div>
    );
}
