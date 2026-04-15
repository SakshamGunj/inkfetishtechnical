import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, PenTool, ArrowUpRight, FileText, Coffee } from 'lucide-react';
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

const ReadModal = ({ isOpen, onClose, title, content }: { isOpen: boolean, onClose: () => void, title: string, content: string }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-2xl max-h-[80vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 bg-black text-white p-4 flex justify-between items-center border-b-[3px] border-black">
                    <h3 className="font-display text-xl font-bold uppercase truncate pr-4">{title}</h3>
                    <button onClick={onClose} className="hover:text-[#fe019a] font-mono font-bold">[CLOSE]</button>
                </div>
                <div className="p-8 font-body text-lg leading-relaxed whitespace-pre-wrap">
                    {content}
                </div>
            </motion.div>
        </div>
    );
};

const AnweshaWritings = () => {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [selectedWork, setSelectedWork] = React.useState<{ title: string, content: string } | null>(null);

    const openForReading = (title: string) => {
        const demoContent = `Here is a sample of "${title}"...\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n(This is a demo preview. The full content will be available soon!)`;
        setSelectedWork({ title, content: demoContent });
        setModalOpen(true);
    };

    const writings = [
        {
            title: "The Silent Echo",
            type: "Poem",
            date: "Jan 2026",
            desc: "A reflection on the sounds we miss in the chaos.",
            color: "bg-[#FBCFE8]",
            link: "#"
        },
        {
            title: "Midnight Thoughts",
            type: "Blog",
            date: "Dec 2025",
            desc: "Random musings from a sleepless night.",
            color: "bg-[#BBF7D0]",
            link: "#"
        },
        {
            title: "Lost in Translation",
            type: "Short Story",
            date: "Nov 2025",
            desc: "Two strangers, one city, and a language barrier.",
            color: "bg-[#E9D5FF]",
            link: "#"
        },
        {
            title: "Canvas of Dreams",
            type: "Essay",
            date: "Oct 2025",
            desc: "Why art matters more than we think.",
            color: "bg-[#FEF08A]",
            link: "#"
        }
    ];

    return (
        <div className="min-h-screen bg-[#F0F0F0] font-sans text-black overflow-x-hidden selection:bg-black selection:text-white">
            <Helmet>
                <title>ANWESHA | Writings Archive</title>
                <meta name="description" content="Read all writings by Anwesha - Poems, Stories, and Blogs." />
            </Helmet>

            <ReadModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={selectedWork?.title || ""}
                content={selectedWork?.content || ""}
            />

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
                    <PenTool size={16} />
                    <span className="hidden sm:inline">ARCHIVE</span>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 lg:py-12 max-w-6xl">

                {/* Header */}
                <div className="mb-12">
                    <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black leading-none mb-4">
                        THE <span className="text-[#fe019a] px-2 bg-black border-[3px] border-black inline-block transform -skew-x-12">ARCHIVE</span>
                    </h1>
                    <p className="font-mono font-bold text-lg border-l-[4px] border-black pl-4">
                        A COLLECTION OF THOUGHTS, POEMS, AND STORIES.
                    </p>
                </div>

                {/* Featured: Silfira */}
                <div className="mb-12">
                    <div className="bg-black text-white p-2 mb-2 inline-block font-mono font-bold text-sm tracking-widest border border-black">FEATURED WORK</div>
                    <Link to="/books/silfira" className="block group">
                        <BrutalistCard color="bg-[#FEF08A]" className="p-8 flex-row items-center justify-between gap-6 group-hover:bg-black group-hover:text-white transition-colors">
                            <div>
                                <h2 className="font-display text-4xl md:text-5xl font-bold mb-2">SILFIRA</h2>
                                <p className="font-body text-lg opacity-80 mb-4">My upcoming book. "Silfira" signifies a silent fire.</p>
                                <div className="flex gap-2">
                                    <Badge text="Book" color="bg-white text-black" />
                                    <Badge text="WIP" color="bg-[#FF0000] text-white" />
                                </div>
                            </div>
                            <div className="hidden md:flex bg-white text-black w-16 h-16 border-[3px] border-black rounded-full items-center justify-center group-hover:scale-110 transition-transform">
                                <ArrowUpRight size={32} />
                            </div>
                        </BrutalistCard>
                    </Link>
                </div>

                {/* Grid of Writings */}
                <div className="mb-8 flex items-center gap-2">
                    <Coffee className="w-6 h-6" />
                    <h2 className="font-display text-3xl font-bold">LATEST WRITINGS</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {writings.map((item, index) => (
                        <BrutalistCard key={index} color={item.color} className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <Badge text={item.type} color="bg-white" />
                                <span className="font-mono text-xs font-bold opacity-60">{item.date}</span>
                            </div>
                            <h3 className="font-display text-2xl font-bold mb-2 leading-tight">{item.title}</h3>
                            <p className="font-body text-sm mb-6 flex-grow border-t border-black/10 pt-2">
                                {item.desc}
                            </p>
                            <button
                                onClick={() => openForReading(item.title)}
                                className="w-full bg-transparent border-[2px] border-black py-2 font-mono font-bold hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2 text-sm mt-auto">
                                READ <FileText size={14} />
                            </button>
                        </BrutalistCard>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default AnweshaWritings;
