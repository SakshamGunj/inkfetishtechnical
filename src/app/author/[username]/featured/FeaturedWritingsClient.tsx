'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';
import { collection, query, where, getDocs, limit, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const FeaturedWritingsClient = ({ username }: { username: string }) => {
    const [authorData, setAuthorData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [claps, setClaps] = useState<number>(0);
    const [hasClapped, setHasClapped] = useState(false);
    const [filterFormat, setFilterFormat] = useState<string>('ALL');
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const loadData = async () => {
            if (!username) return;
            try {
                const portfoliosRef = collection(db, 'author_portfolios');
                const q = query(portfoliosRef, where("username", "==", username.toLowerCase()), limit(1));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const data = querySnapshot.docs[0].data();
                    setAuthorData(data);
                    setClaps(data.claps || 0);
                } else {
                    const docRef = doc(db, 'author_portfolios', username);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setAuthorData(data);
                        setClaps(data.claps || 0);
                    } else {
                        setError("Author profile not found.");
                    }
                }
            } catch (err) {
                console.error("Error fetching author data:", err);
                setError("Failed to load author profile.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [username]);

    const handleClap = async () => {
        setClaps((prev) => prev + 1);
        setHasClapped(true);
        if (authorData?.uid) {
            try {
                const docRef = doc(db, 'author_portfolios', authorData.uid);
                await setDoc(docRef, { claps: (claps || 0) + 1 }, { merge: true });
            } catch (e) {
                console.error("Clap error:", e);
            }
        }
    };

    const getReadingTime = (content: string) => {
        if (!content) return "0 MIN READ";
        const plainText = content.replace(/<[^>]+>/g, ' ').trim();
        const words = plainText.split(/\s+/).filter(Boolean).length;
        if (words === 0) return "0 MIN READ";
        if (words < 150) {
            const seconds = Math.max(15, Math.ceil((words / 200) * 60));
            return `${seconds} SEC READ`;
        }
        const minutes = Math.ceil(words / 200);
        return `${minutes} MIN READ`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FFFDF7] flex flex-col items-center justify-center font-mono">
                <div className="text-2xl font-black uppercase tracking-widest animate-pulse">
                    LOADING LITERARY ARCHIVE...
                </div>
            </div>
        );
    }

    if (error || !authorData) {
        return (
            <div className="min-h-screen bg-[#FFFDF7] flex flex-col items-center justify-center p-6 font-mono">
                <div className="bg-red-500 text-white p-8 border-4 border-black shadow-[8px_8px_0_0_#000] max-w-md w-full text-center space-y-4">
                    <h1 className="text-3xl font-black uppercase">AUTHOR NOT FOUND</h1>
                    <p className="font-bold text-sm">{error || "Could not locate this author's featured writings."}</p>
                    <Link href="/" className="inline-block bg-black text-white px-6 py-2 font-black uppercase text-xs border border-white">
                        ← RETURN HOME
                    </Link>
                </div>
            </div>
        );
    }

    const allPieces: any[] = authorData.featured_pieces && authorData.featured_pieces.length > 0
        ? authorData.featured_pieces
        : (authorData.writing_content ? [{
            id: 'legacy-1',
            title: authorData.writing_title || "FEATURED WRITING",
            content: authorData.writing_content,
            format: authorData.writing_format || 'POETRY',
            font: authorData.writing_font || 'SERIF',
            backstory: authorData.writing_backstory || '',
            pinned: true
        }] : []);

    const filteredPieces = allPieces.filter((piece: any) => {
        const matchesFormat = filterFormat === 'ALL' || piece.format === filterFormat;
        const matchesSearch = !searchQuery || 
            piece.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            piece.content.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFormat && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-[#FFFDF7] text-black font-sans selection:bg-[#39FF14] selection:text-black">
            {/* TOP BAR NAVIGATION */}
            <header className="sticky top-0 z-40 bg-black text-white border-b-4 border-black px-4 md:px-12 py-4 flex items-center justify-between shadow-[0_4px_0_0_#39FF14]">
                <Link
                    href={`/author/${username}`}
                    className="flex items-center gap-2 bg-[#39FF14] text-black px-4 py-2 text-xs md:text-sm font-black uppercase border-2 border-white hover:bg-white transition-colors"
                >
                    <ArrowLeft size={16} /> BACK TO AUTHOR PROFILE
                </Link>
                <div className="text-right">
                    <span className="font-black text-sm md:text-base uppercase tracking-tight text-[#39FF14]">
                        {authorData.name}
                    </span>
                    <span className="block text-[10px] font-bold text-gray-400 uppercase">OFFICIAL FEATURED ARCHIVE</span>
                </div>
            </header>

            {/* HERO TITLE BANNER */}
            <section className="bg-black text-white px-6 py-12 md:py-20 border-b-4 border-black text-center space-y-4 shadow-[0_8px_0_0_#FFC700]">
                <div className="inline-block bg-[#39FF14] text-black font-black text-xs px-3 py-1 uppercase border-2 border-white mb-2">
                    LITERARY FEATURED WRITINGS ARCHIVE
                </div>
                <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight text-white max-w-4xl mx-auto">
                    {authorData.name}'S WRITING ARCHIVE
                </h1>
                <p className="text-gray-300 font-serif italic text-base md:text-xl max-w-2xl mx-auto">
                    Explore all published poems, prose excerpts, spoken word pieces & flash fiction by {authorData.name}.
                </p>

                {/* SEARCH & FILTER CONTROLS */}
                <div className="pt-6 max-w-3xl mx-auto flex flex-col md:flex-row gap-4 justify-center items-center">
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="SEARCH PIECES..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-gray-900 border-2 border-white text-white pl-9 pr-4 py-2.5 text-xs font-black uppercase outline-none focus:border-[#39FF14]"
                        />
                    </div>

                    <div className="flex gap-2 flex-wrap justify-center">
                        {['ALL', 'POETRY', 'PROSE_POETRY', 'FLASH_FICTION', 'CHAPTER_EXCERPT', 'ESSAY'].map((fmt) => (
                            <button
                                key={fmt}
                                onClick={() => setFilterFormat(fmt)}
                                className={`px-3 py-2 text-xs font-black uppercase border-2 border-white transition-all ${filterFormat === fmt ? 'bg-[#39FF14] text-black shadow-[2px_2px_0_0_#FFF]' : 'bg-black text-white hover:bg-gray-800'}`}
                            >
                                {fmt === 'ALL' ? 'ALL FORMATS' : fmt.replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURED PIECES LIST */}
            <main className="max-w-5xl mx-auto px-6 py-16 space-y-12">
                {filteredPieces.length === 0 ? (
                    <div className="bg-white border-4 border-black p-12 text-center shadow-[8px_8px_0_0_#000] space-y-4">
                        <h3 className="text-2xl font-black uppercase">NO WRITINGS MATCHED YOUR FILTER</h3>
                        <p className="text-xs font-bold text-gray-500">Try selecting "ALL FORMATS" or clearing your search term.</p>
                        <button
                            onClick={() => { setFilterFormat('ALL'); setSearchQuery(''); }}
                            className="bg-black text-white px-6 py-2 font-black text-xs uppercase border-2 border-black"
                        >
                            RESET FILTERS ↺
                        </button>
                    </div>
                ) : (
                    filteredPieces.map((piece: any, idx: number) => (
                        <article
                            key={piece.id || idx}
                            className="bg-black text-white border-[4px] border-black p-8 md:p-14 shadow-[14px_14px_0_0_#39FF14] space-y-8 relative overflow-hidden"
                        >
                            {/* BADGES BAR */}
                            <div className="flex items-center justify-between flex-wrap gap-4 border-b-2 border-gray-800 pb-4">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="bg-[#39FF14] text-black text-xs font-black px-3 py-1 uppercase border-2 border-white shadow-[2px_2px_0_0_#FFF]">
                                        {piece.format === 'PROSE_POETRY' ? '✒️ PROSE POETRY' :
                                         piece.format === 'FLASH_FICTION' ? '⚡ FLASH FICTION' :
                                         piece.format === 'CHAPTER_EXCERPT' ? '📖 CHAPTER EXCERPT' :
                                         piece.format === 'SPOKEN_WORD' ? '🎤 SPOKEN WORD' :
                                         piece.format === 'ESSAY' ? '📝 PERSONAL ESSAY' : '📜 POETRY'}
                                    </span>
                                    {piece.pinned !== false && (
                                        <span className="bg-[#FFC700] text-black text-xs font-black px-3 py-1 uppercase border-2 border-white shadow-[2px_2px_0_0_#FFF]">
                                            📌 PINNED PIECE
                                        </span>
                                    )}
                                </div>
                                <span className="bg-white text-black text-xs font-black px-3 py-1 uppercase border-2 border-white shadow-[2px_2px_0_0_#FFF]">
                                    ⏱️ {getReadingTime(piece.content)}
                                </span>
                            </div>

                            {/* TITLE */}
                            <h2 className="text-3xl md:text-5xl font-black uppercase text-[#39FF14] tracking-tight">
                                {piece.title}
                            </h2>

                            {/* FULL WRITING CONTENT */}
                            <div
                                className={`font-medium text-lg md:text-2xl leading-relaxed md:leading-[1.8] text-gray-200 border-l-[6px] border-[#39FF14] pl-6 md:pl-10 break-words ${
                                    piece.font === 'MONO' ? 'font-mono' :
                                    piece.font === 'SANS' ? 'font-sans' : 'font-serif'
                                }`}
                                dangerouslySetInnerHTML={{ __html: piece.content }}
                            />

                            {/* BACKSTORY AUTHOR NOTE */}
                            {piece.backstory && (
                                <div className="bg-white/10 p-5 border-l-4 border-[#FFC700] space-y-1">
                                    <span className="text-xs font-black uppercase text-[#FFC700] tracking-wider">📖 BEHIND THE WORDS (AUTHOR NOTE)</span>
                                    <p className="text-sm font-serif italic text-gray-300">“{piece.backstory}”</p>
                                </div>
                            )}

                            {/* CLAPS FOOTER */}
                            <div className="pt-4 border-t border-gray-800 flex items-center justify-between flex-wrap gap-4">
                                <button
                                    onClick={handleClap}
                                    className={`flex items-center gap-3 px-6 py-3 border-2 border-white font-black text-sm uppercase transition-all shadow-[4px_4px_0_0_#39FF14] ${hasClapped ? 'bg-[#39FF14] text-black' : 'bg-white text-black hover:bg-[#39FF14]'}`}
                                >
                                    👏 APPRECIATE / CLAP <span className="bg-black text-white px-2.5 py-0.5 text-xs font-black rounded-full border border-white">{claps}</span>
                                </button>
                                <span className="text-xs font-bold uppercase text-gray-400">AUTHOR FEATURED WORK #{idx + 1}</span>
                            </div>
                        </article>
                    ))
                )}
            </main>
        </div>
    );
};

export default FeaturedWritingsClient;
