'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, FileText, ChevronDown, ChevronUp, Award, Download, Loader2, Feather } from 'lucide-react';
import { collection, query, where, getDocs, limit, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const AuthorSiteClient = ({ username }: { username: string }) => {
    const [authorData, setAuthorData] = useState<any>(null);
    const [expandedPiece, setExpandedPiece] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            if (!username) {
                setError("No username found.");
                return;
            }

            try {
                // Query the author_portfolios collection where the username field matches the URL param
                const portfoliosRef = collection(db, 'author_portfolios');
                const q = query(portfoliosRef, where("username", "==", username.toLowerCase()), limit(1));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    setAuthorData(querySnapshot.docs[0].data());
                } else {
                    // Fallback: Check if the username parameter is actually their raw document ID
                    const docRef = doc(db, 'author_portfolios', username);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setAuthorData(docSnap.data());
                    } else {
                        setError("AUTHOR NOT FOUND.");
                    }
                }
            } catch (err) {
                console.error("Failed to fetch profile:", err);
                setError("FAILED TO LOAD PROFILE.");
            }
        };

        loadData();
    }, [username]);

    const togglePiece = (id: string) => {
        if (expandedPiece === id) {
            setExpandedPiece(null);
        } else {
            setExpandedPiece(id);
        }
    };

    if (error) return (
        <div className="min-h-screen bg-[#FFFDF7] flex flex-col justify-center items-center font-mono">
            <h1 className="text-4xl md:text-6xl font-black uppercase text-[#FF4F00] tracking-tighter mb-4">404 : NOT FOUND</h1>
            <p className="text-lg font-bold bg-black text-white px-4 py-2">{error}</p>
            <Link href="/" className="mt-8 border-[3px] border-black px-6 py-3 font-black uppercase hover:bg-[#39FF14] transition-colors shadow-[4px_4px_0_0_#000]">
                GO TO HOMEPAGE
            </Link>
        </div>
    );

    if (!authorData) return (
        <div className="min-h-screen bg-[#FFFDF7] flex justify-center items-center font-mono">
            <Loader2 className="w-16 h-16 animate-spin text-black mb-4 mr-4" />
            <h1 className="text-2xl md:text-4xl font-black uppercase tracking-widest animate-pulse">LOADING PROFILE...</h1>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FFFDF7] font-mono selection:bg-[#FF4F00] selection:text-white pb-20 overflow-x-hidden">

            {/* Top Navigation / Banner */}
            <div className="w-full bg-black text-white py-2 px-4 flex justify-between items-center text-xs md:text-sm font-bold uppercase shadow-[0_4px_0_0_#FF4F00] mb-8 md:mb-12 sticky top-0 z-50">
                <span className="tracking-[0.2em] flex-grow truncate">INKFETISH PUBLICATIONS</span>
                <Link href="/authorsite/dashboard" className="hover:text-[#39FF14] transition-colors underline decoration-2 underline-offset-4 whitespace-nowrap ml-4">
                    MY DASHBOARD
                </Link>
            </div>

            <main className="max-w-5xl mx-auto px-3 md:px-8 space-y-12">

                {/* HERO SECTION */}
                <section className="bg-white border-[4px] border-black p-6 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative group">
                    {/* Decorative tape elements */}
                    <div className="absolute -top-4 -left-4 w-16 h-8 bg-gray-300 rotate-12 opacity-80 z-20" />
                    <div className="absolute -bottom-4 right-10 w-24 h-8 bg-gray-300 -rotate-6 opacity-80 z-20" />

                    <div className="absolute top-0 right-0 w-24 h-24 md:w-48 md:h-48 bg-[#FFC700] rounded-bl-full border-b-[4px] border-l-[4px] border-black -z-0 transition-all duration-500 group-hover:scale-105 origin-top-right" />

                    <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start text-center md:text-left">

                        {/* Avatar/Photo */}
                        <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 flex-shrink-0 border-[4px] border-black bg-[#E5E5E5] shadow-[6px_6px_0px_0px_#00A3FF] relative overflow-hidden group/img rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
                            {authorData.profile_image ? (
                                <img src={authorData.profile_image} alt={authorData.name} className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition-all duration-500" />
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center font-bold text-gray-400">
                                    <span className="text-4xl md:text-6xl text-black">☻</span>
                                    <span className="mt-2 text-[10px] md:text-sm uppercase tracking-widest text-black">NO PHOTO</span>
                                </div>
                            )}
                            <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(transparent 50%, rgba(0,0,0,0.2) 50%)', backgroundSize: '100% 4px' }} />
                        </div>

                        {/* Author Identity */}
                        <div className="flex-grow pt-4 md:pt-8 w-full max-w-full overflow-hidden">
                            <div className="inline-block w-full sm:w-auto text-center bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest mb-4 animate-bounce">
                                FEATURED AUTHOR
                            </div>
                            <h1 className="text-4xl sm:text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-2 md:mb-4 break-words">
                                {authorData.name}
                            </h1>
                            {authorData.pen_name && (
                                <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-gray-600 uppercase tracking-wide bg-[#39FF14] inline-block px-2 text-black border-2 border-black ml-1 rotate-1 max-w-full break-words">
                                    A.K.A. {authorData.pen_name}
                                </h2>
                            )}

                            {/* Tags Display */}
                            {authorData.tags && authorData.tags.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                                    {authorData.tags.map((tag: string, index: number) => (
                                        <span key={index} className="bg-white border-2 border-black px-3 py-1 text-sm font-black uppercase text-black shadow-[2px_2px_0_0_#FF4F00] rotate-[-1deg]">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* WIP Progress Bar */}
                            {authorData.wip_title && authorData.wip_target > 0 && (
                                <div className="mt-8 md:mt-12 w-full bg-[#FFF] border-[4px] border-black p-4 shadow-[6px_6px_0_0_#39FF14] relative overflow-hidden group/wip max-w-lg mx-auto md:mx-0">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-2 relative z-10 gap-2 sm:gap-0">
                                        <div className="flex flex-col text-left pr-2 w-full sm:w-auto">
                                            <span className="text-[10px] md:text-xs font-black tracking-widest text-gray-500 uppercase">WHAT I'M WRITING NOW</span>
                                            <h3 className="text-lg md:text-2xl font-black uppercase tracking-tighter truncate w-full sm:max-w-[200px] hover:text-clip hover:overflow-visible transition-all">{authorData.wip_title}</h3>
                                        </div>
                                        <div className="text-left sm:text-right flex flex-col items-start sm:items-end">
                                            <span className="text-2xl md:text-3xl font-black leading-none text-[#FF4F00]">
                                                {Math.min(100, Math.round((authorData.wip_current / authorData.wip_target) * 100))}%
                                            </span>
                                            <span className="text-[10px] md:text-xs font-black tracking-widest text-gray-500 uppercase mt-1">
                                                {authorData.wip_current.toLocaleString()} / {authorData.wip_target.toLocaleString()} WORDS
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full h-8 bg-gray-200 border-[3px] border-black mt-4 relative overflow-hidden flex items-center">
                                        <div
                                            className="h-full bg-black transition-all duration-1000 ease-out flex items-center"
                                            style={{ width: `${Math.min(100, Math.max(0, (authorData.wip_current / authorData.wip_target) * 100))}%` }}
                                        >
                                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #FFF 10px, #FFF 20px)' }}></div>
                                        </div>
                                        <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30" style={{ backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.5) 50%)', backgroundSize: '4px 100%' }}></div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-3 w-full justify-center md:justify-start">
                                {authorData.theme && (
                                    <span className="border-2 w-full sm:w-auto text-center border-black bg-[#FFC700] px-4 py-2 text-sm md:text-base font-black uppercase shadow-[4px_4px_0_0_#000] hover:-translate-y-1 transition-transform">
                                        {authorData.theme}
                                    </span>
                                )}
                                {authorData.instagram && (
                                    <a href={authorData.instagram} target="_blank" rel="noopener noreferrer" className="border-2 w-full sm:w-auto text-center border-black bg-[#FF4F00] text-white px-4 py-2 text-sm md:text-base font-black uppercase hover:bg-black hover:text-[#FF4F00] transition-colors shadow-[4px_4px_0_0_#000] active:translate-y-1 active:shadow-none">
                                        INSTAGRAM ↗
                                    </a>
                                )}
                                {authorData.website && (
                                    <a href={authorData.website} target="_blank" rel="noopener noreferrer" className="border-2 w-full sm:w-auto text-center border-black bg-gray-200 text-black px-4 py-2 text-sm md:text-base font-black uppercase hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0_0_#000] active:translate-y-1 active:shadow-none">
                                        WEBSITE ↗
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* SCROLLING TICKER */}
                <div className="w-full overflow-hidden bg-black text-white py-3 border-y-[4px] border-black flex whitespace-nowrap shadow-[0_6px_0_0_#39FF14]">
                    <div className="animate-[marquee_20s_linear_infinite] font-black tracking-widest text-lg uppercase flex items-center gap-8">
                        {Array(10).fill(`${authorData.name} // PORTFOLIO // `).map((text, i) => (
                            <span key={i}>{text} <span className="text-[#FF4F00] px-4">★</span></span>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
                    <div className="lg:col-span-4 space-y-8 md:space-y-12">
                        <section className="bg-white border-[4px] border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
                            <h3 className="bg-black text-white px-3 py-1 text-sm font-bold uppercase inline-block mb-6 shadow-[2px_2px_0_0_#39FF14]">ABOUT ME</h3>
                            <p className="font-semibold text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                                {authorData.bio || "No biography provided."}
                            </p>
                        </section>
                    </div>

                    <div className="lg:col-span-8 flex flex-col gap-12">
                        <section className="bg-black text-white border-[4px] border-black p-6 md:p-10 lg:p-16 shadow-[12px_12px_0px_0px_#FFC700] relative">
                            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-8 md:mb-10 text-white break-words">
                                {authorData.writing_title || "MY WRITING"}
                            </h2>
                            <div
                                className="font-medium text-base md:text-2xl leading-relaxed md:leading-[1.8] text-gray-200 border-l-[4px] md:border-l-[6px] border-[#39FF14] pl-4 md:pl-8 font-serif"
                                dangerouslySetInnerHTML={{ __html: authorData.writing_content || "Writing goes here..." }}
                            />
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AuthorSiteClient;
