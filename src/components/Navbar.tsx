'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Menu, X, Feather, MoveRight, 
    BookOpen, Library, Users, 
    Trophy, Sparkles, PenTool,
    Star, MessageSquare, HelpCircle,
    ShoppingBag, Layers, Zap, ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
    const pathname = usePathname();

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navGroups = [
        {
            title: 'Write',
            links: [
                { name: 'Contests', path: '/contests', icon: <PenTool size={14} /> },
                { name: 'Poetry Festival', path: '/poetry-festival-s2', icon: <Star size={14} /> },
                { name: 'Launchpad', path: '/launchpad', icon: <Zap size={14} /> }
            ]
        },
        {
            title: 'Publish',
            links: [
                { name: 'Services', path: '/services', icon: <Sparkles size={14} /> },
                { name: 'Anthologies', path: '/anthologies', icon: <Layers size={14} /> },
                { name: 'Highlights', path: '/highlights', icon: <Feather size={14} /> },
                { name: 'Contact', path: '/contact', icon: <HelpCircle size={14} /> }
            ]
        },
        {
            title: 'Community',
            links: [
                { name: 'Authors', path: '/authors', icon: <Users size={14} /> },
                { name: 'Hall of Fame', path: '/awards', icon: <Trophy size={14} /> },
                { name: 'Reviews', path: '/testimonials', icon: <MessageSquare size={14} /> }
            ]
        },
        {
            title: 'Shop',
            links: [
                { name: 'Bookstore', path: '/bookstore', icon: <ShoppingBag size={14} /> },
                { name: 'Archive', path: '/archive', icon: <Library size={14} /> }
            ]
        }
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled || isMobileMenuOpen 
                        ? 'bg-[#FDFBF7]/95 backdrop-blur-md border-b border-ink-900/10' 
                        : 'bg-transparent'
                }`}
            >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 md:h-24">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group relative z-[60]" onClick={() => setIsMobileMenuOpen(false)}>
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full border border-ink-900/10 flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                            <img src="/images/inkfetish_logo.png" alt="Inkfetish Publication" className="w-[85%] h-[85%] object-contain" />
                        </div>
                        <span className="font-serif font-black text-xl text-ink-900 tracking-tight hidden sm:block">Inkfetish Publication</span>
                    </Link>

                    {/* Desktop Nav - Cleaned up */}
                    <div className="hidden xl:flex items-center gap-6">
                        {navGroups.map((group) => (
                            <div key={group.title} className="relative group/dropdown py-6">
                                <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-ink-900 cursor-default hover:text-[#9D00FF] transition-colors font-black whitespace-nowrap">
                                    {group.title}
                                </span>
                                 {/* Dropdown Menu */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 pointer-events-none group-hover/dropdown:opacity-100 group-hover/dropdown:pointer-events-auto transition-all duration-300 transform translate-y-2 group-hover/dropdown:translate-y-0">
                                    <div className="bg-[#FDFBF7] border border-ink-900/10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] py-4 min-w-[220px] flex flex-col relative before:content-[''] before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-b-ink-900/10 after:content-[''] after:absolute after:-top-[6px] after:left-1/2 after:-translate-x-1/2 after:border-[7px] after:border-transparent after:border-b-[#FDFBF7]">
                                        {group.links.map(link => (
                                            <Link
                                                key={link.path}
                                                href={link.path}
                                                className="px-6 py-4 hover:bg-ink-900/5 transition-all flex items-center gap-4 group/item"
                                            >
                                                <div className="text-ink-300 group-hover/item:text-[#9D00FF] transition-colors shrink-0">
                                                    {link.icon}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[9px] font-sans font-black uppercase tracking-[0.25em] text-ink-900 leading-none">
                                                        {link.name}
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        ))}
                        
                        <div className="w-px h-6 bg-ink-900/20 mx-2"></div>
                        
                        <div className="flex items-center gap-4">
                            <Link href="/launchpad">
                               <Button className="bg-ink-900 text-[#FDFBF7] hover:bg-gold hover:text-ink-900 border border-ink-900 shadow-none rounded-none text-[10px] tracking-[0.2em] font-sans h-10 px-6 transition-colors font-black uppercase">
                                   JOIN LAUNCHPAD
                               </Button>
                            </Link>
                            <Link href="/journey">
                               <Button className="bg-transparent text-ink-900 border border-ink-900/10 hover:border-ink-900 hover:bg-ink-900/5 shadow-none rounded-none text-[10px] tracking-[0.2em] font-sans h-10 px-6 transition-colors font-bold uppercase italic">
                                   Login
                               </Button>
                            </Link>
                        </div>

                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="xl:hidden p-2 text-ink-900 relative z-[60] hover:bg-ink-900/5 transition-colors rounded-full"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
                    </button>
                </div>
            </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 z-40 bg-[#FDFBF7] flex flex-col pt-24 pb-8 px-6 overflow-y-auto"
                    >
                        <div className="flex flex-col h-full overflow-y-auto">
                            <div className="space-y-8 flex flex-col mt-8">
                                {navGroups.map((group, i) => (
                                    <motion.div
                                        key={group.title}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1, duration: 0.4 }}
                                        className="flex flex-col border-b border-ink-900/10 last:border-0"
                                    >
                                        <button 
                                            onClick={() => setExpandedGroup(expandedGroup === group.title ? null : group.title)}
                                            className="flex items-center justify-between py-6 group"
                                        >
                                            <div className="text-xl font-serif font-black uppercase tracking-tighter text-ink-900 group-hover:text-gold transition-colors">{group.title}</div>
                                            <motion.div
                                                animate={{ rotate: expandedGroup === group.title ? 180 : 0 }}
                                                className="text-ink-300"
                                            >
                                                <ChevronDown size={20} />
                                            </motion.div>
                                        </button>

                                        <AnimatePresence>
                                            {expandedGroup === group.title && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="flex flex-col gap-2 pb-6 pl-4">
                                                        {group.links.map(link => (
                                                            <Link
                                                                key={link.path}
                                                                href={link.path}
                                                                onClick={() => setIsMobileMenuOpen(false)}
                                                                className={`py-3 flex items-center gap-4 transition-all ${
                                                                    pathname === link.path ? 'text-gold' : 'text-ink-600'
                                                                }`}
                                                            >
                                                                <div className="shrink-0 opacity-50">
                                                                    {link.icon}
                                                                </div>
                                                                <span className="text-sm font-sans font-black uppercase tracking-widest">
                                                                    {link.name}
                                                                </span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                            
                            <motion.div 
                                className="mt-12 mb-8 flex flex-col gap-4 pt-8 border-t border-ink-900/10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <Link href="/launchpad" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button className="w-full bg-ink-900 text-[#FDFBF7] hover:bg-gold hover:text-ink-900 border border-ink-900 shadow-none rounded-none py-7 text-xs font-sans tracking-[0.25em] uppercase transition-all font-black">
                                        JOIN LAUNCHPAD
                                    </Button>
                                </Link>
                                <Link href="/journey" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button className="w-full bg-transparent text-ink-900 border border-ink-900/10 hover:border-ink-900 rounded-none py-7 text-xs font-sans tracking-[0.25em] uppercase transition-all font-bold mt-2">
                                        LOGIN
                                    </Button>
                                </Link>
                                <div className="mt-8 text-center flex items-center justify-center gap-2 text-ink-400">
                                    <Feather className="w-4 h-4" strokeWidth={1} />
                                    <span className="text-xs font-sans tracking-[0.2em] uppercase">Inkfetish Publication</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
