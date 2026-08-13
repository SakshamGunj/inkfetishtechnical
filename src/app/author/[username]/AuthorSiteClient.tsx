'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, FileText, ChevronDown, ChevronUp, Award, Download, Loader2, Feather } from 'lucide-react';
import { collection, query, where, getDocs, limit, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const AuthorSiteClient = ({ username }: { username: string }) => {
    const [authorData, setAuthorData] = useState<any>(null);
    const [expandedPiece, setExpandedPiece] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [claps, setClaps] = useState<number>(0);
    const [hasClapped, setHasClapped] = useState(false);
    const [activeModalPiece, setActiveModalPiece] = useState<any | null>(null);

    useEffect(() => {
        if (authorData?.claps) {
            setClaps(authorData.claps);
        }
    }, [authorData]);

    const handleClap = async () => {
        setClaps((prev) => prev + 1);
        setHasClapped(true);
        if (authorData?.uid) {
            try {
                const docRef = doc(db, 'author_portfolios', authorData.uid);
                await setDoc(docRef, { claps: (claps || 0) + 1 }, { merge: true });
            } catch (e) {
                console.error("Clap persist error:", e);
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

    const formatExternalUrl = (url?: string) => {
        if (!url) return '';
        const trimmed = url.trim();
        if (!trimmed) return '';
        if (/^https?:\/\//i.test(trimmed)) return trimmed;
        return `https://${trimmed}`;
    };

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

    if (authorData && (authorData.status === 'pending' || authorData.approved === false)) {
        return (
            <div className="min-h-screen bg-[#FFFDF7] flex flex-col justify-center items-center font-mono p-4">
                <div className="bg-white border-[4px] border-black p-8 shadow-[12px_12px_0_0_#FFC700] max-w-xl text-center space-y-6">
                    <div className="w-16 h-16 bg-[#FFC700] border-[3px] border-black mx-auto flex items-center justify-center text-3xl shadow-[4px_4px_0_0_#000] rotate-3">
                        ⏳
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">SITE PENDING APPROVAL</h1>
                    <p className="font-bold text-gray-700 text-sm md:text-base leading-relaxed border-l-4 border-black text-left pl-4 uppercase">
                        The portfolio for <span className="bg-black text-white px-2 py-0.5">@{username}</span> is currently under editorial review by Inkfetish Publications. Once approved by our team, this author site will be live.
                    </p>
                    <Link href="/" className="inline-block mt-4 border-[3px] border-black bg-black text-white px-6 py-3 font-black uppercase hover:bg-[#39FF14] hover:text-black transition-colors shadow-[4px_4px_0_0_#000]">
                        RETURN TO HOMEPAGE
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFFDF7] font-mono selection:bg-[#FF4F00] selection:text-white pb-20 overflow-x-hidden">

            {/* Top Navigation / Banner */}
            <div className="w-full bg-black text-white py-2.5 px-4 flex justify-between items-center text-xs md:text-sm font-bold uppercase shadow-[0_4px_0_0_#FF4F00] mb-8 md:mb-12 sticky top-0 z-50">
                <span className="tracking-[0.2em] font-black text-[#FF4F00]">INKFETISH PUBLICATIONS</span>
                <span className="text-[10px] sm:text-xs font-black tracking-widest text-gray-300 uppercase">OFFICIAL AUTHOR PORTFOLIO</span>
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

                            {/* AVAILABILITY STATUS BADGE & TAGLINE */}
                            {authorData.availability_status && (
                                <div className="mt-3">
                                    {authorData.availability_status === 'OPEN_FOR_SUBMISSIONS' && (
                                        <span className="inline-block bg-[#39FF14] text-black border-2 border-black px-3 py-1 text-xs font-black uppercase shadow-[2px_2px_0_0_#000]">
                                            🟢 OPEN FOR BOOK DEALS & AGENTS
                                        </span>
                                    )}
                                    {authorData.availability_status === 'DEEP_WRITING_MODE' && (
                                        <span className="inline-block bg-[#FFC700] text-black border-2 border-black px-3 py-1 text-xs font-black uppercase shadow-[2px_2px_0_0_#000]">
                                            🟡 DEEP WRITING MODE (NEXT MANUSCRIPT)
                                        </span>
                                    )}
                                    {authorData.availability_status === 'AVAILABLE_FOR_SPEAKING' && (
                                        <span className="inline-block bg-[#00A3FF] text-white border-2 border-black px-3 py-1 text-xs font-black uppercase shadow-[2px_2px_0_0_#000]">
                                            🔵 AVAILABLE FOR SPEAKING & WORKSHOPS
                                        </span>
                                    )}
                                    {authorData.availability_status === 'OPEN_FOR_COLLABS' && (
                                        <span className="inline-block bg-[#9D00FF] text-white border-2 border-black px-3 py-1 text-xs font-black uppercase shadow-[2px_2px_0_0_#000]">
                                            🟣 OPEN FOR CO-AUTHORSHIP & ANTHOLOGIES
                                        </span>
                                    )}
                                </div>
                            )}

                            {authorData.tagline && (
                                <p className="text-base md:text-xl font-bold italic text-gray-800 mt-3 border-l-4 border-black pl-3 py-0.5 max-w-2xl break-words">
                                    “{authorData.tagline}”
                                </p>
                            )}

                            {/* GENRE HASHTAGS DISPLAY (MAX 3) */}
                            {authorData.tags && authorData.tags.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                                    {authorData.tags.slice(0, 3).map((tag: string, idx: number) => (
                                        <span key={idx} className="bg-[#39FF14] text-black border-2 border-black px-3 py-1 text-xs font-black uppercase shadow-[2px_2px_0_0_#000]">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* AGE / DOB & WRITING SINCE & HOMETOWN & WRITING TYPES & LANGUAGES */}
                            <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
                                {authorData.show_gender !== false && authorData.gender && (
                                    <span className="bg-[#9D00FF] text-white border-2 border-black px-3 py-1 text-xs font-black uppercase shadow-[2px_2px_0_0_#000]">
                                        👤 {authorData.gender}
                                    </span>
                                )}
                                {authorData.show_age && authorData.age_val && (
                                    <span className="bg-black text-white border-2 border-black px-3 py-1 text-xs font-black uppercase shadow-[2px_2px_0_0_#000]">
                                        🎂 {authorData.age_type === 'dob' ? `BORN ${authorData.age_val}` : `${authorData.age_val} YRS OLD`}
                                    </span>
                                )}
                                {authorData.show_writing_since !== false && authorData.writing_since_year && (
                                    <span className="bg-[#FFC700] text-black border-2 border-black px-3 py-1 text-xs font-black uppercase shadow-[2px_2px_0_0_#000]">
                                        ✍️ WRITING SINCE {authorData.writing_since_year}
                                    </span>
                                )}
                                {authorData.hometown && (
                                    <span className="bg-white text-black border-2 border-black px-3 py-1 text-xs font-black uppercase shadow-[2px_2px_0_0_#000]">
                                        📍 BASED IN {authorData.hometown}
                                    </span>
                                )}
                                {authorData.writing_types && authorData.writing_types.map((wt: string, idx: number) => (
                                    <span key={idx} className="bg-black text-white border-2 border-black px-3 py-1 text-xs font-black uppercase shadow-[2px_2px_0_0_#000]">
                                        ✍️ {wt}
                                    </span>
                                ))}
                                {authorData.languages && authorData.languages.map((lang: string, idx: number) => (
                                    <span key={idx} className="bg-[#00A3FF] text-white border-2 border-black px-3 py-1 text-xs font-black uppercase shadow-[2px_2px_0_0_#000]">
                                        🗣️ {lang}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-3 w-full justify-center md:justify-start">
                                {authorData.press_kit_url && (
                                    <a href={authorData.press_kit_url} target="_blank" rel="noopener noreferrer" className="border-2 w-full sm:w-auto text-center border-black bg-[#39FF14] text-black px-4 py-2 text-sm md:text-base font-black uppercase hover:bg-black hover:text-[#39FF14] transition-colors shadow-[4px_4px_0_0_#000] active:translate-y-1 active:shadow-none">
                                        📄 PRESS KIT / RESUME ↗
                                    </a>
                                )}
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

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 w-full max-w-full overflow-hidden">
                    <div className="lg:col-span-4 space-y-8 md:space-y-12 w-full max-w-full min-w-0 overflow-hidden">
                        <section className="bg-white border-[4px] border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative w-full max-w-full min-w-0 overflow-hidden break-words">
                            <h3 className="bg-black text-white px-3 py-1 text-sm font-bold uppercase inline-block mb-6 shadow-[2px_2px_0_0_#39FF14]">ABOUT ME</h3>
                            <p className="font-semibold text-base md:text-lg leading-relaxed whitespace-pre-wrap break-words [overflow-wrap:anywhere] max-w-full min-w-0 overflow-hidden">
                                {authorData.bio || "No biography provided."}
                            </p>
                        </section>

                        {/* AWARDS SECTION */}
                        {authorData.awards && authorData.awards.length > 0 && (
                            <section className="bg-white border-[4px] border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_#9D00FF] w-full max-w-full min-w-0 overflow-hidden break-words">
                                <h3 className="bg-[#9D00FF] text-white px-3 py-1 text-sm font-bold uppercase inline-block mb-6 shadow-[2px_2px_0_0_#000]">
                                    AWARDS & HONORS
                                </h3>
                                <div className="space-y-4 w-full min-w-0 overflow-hidden">
                                    {authorData.awards.map((award: any, idx: number) => (
                                        <div key={idx} className="border-2 border-black p-4 bg-purple-50/50 w-full min-w-0 overflow-hidden break-words">
                                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                <span className="text-xs font-black bg-black text-white px-2 py-0.5 uppercase">🏆 {award.year || 'Award'}</span>
                                                {award.issuer && <span className="text-xs font-bold text-gray-600 break-words">{award.issuer}</span>}
                                            </div>
                                            <h4 className="font-black text-base uppercase break-words [overflow-wrap:anywhere]">{award.title}</h4>
                                            {award.description && <p className="text-xs text-gray-700 font-medium mt-1 break-words [overflow-wrap:anywhere]">{award.description}</p>}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* COLLABORATIONS SECTION */}
                        {(authorData.collab_prompt || authorData.collab_email) && (
                            <section className="bg-yellow-400 border-[4px] border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_#000] text-black w-full max-w-full min-w-0 overflow-hidden break-words">
                                <h3 className="bg-black text-white px-3 py-1 text-sm font-bold uppercase inline-block mb-4 shadow-[2px_2px_0_0_#FFF]">
                                    OPEN FOR COLLABORATION
                                </h3>
                                <p className="font-bold text-sm leading-relaxed mb-4 break-words [overflow-wrap:anywhere]">
                                    {authorData.collab_prompt || "Open for speaking opportunities, literary workshops, press interviews, and book signings."}
                                </p>
                                {authorData.collab_email && (
                                    <a href={`mailto:${authorData.collab_email}`} className="inline-block bg-black text-white font-black text-xs px-4 py-2 uppercase border border-black hover:bg-white hover:text-black transition-colors break-all">
                                        GET IN TOUCH ✉️
                                    </a>
                                )}
                            </section>
                        )}
                    </div>

                    <div className="lg:col-span-8 flex flex-col gap-12 w-full max-w-full min-w-0 overflow-hidden">
                        {/* FEATURED WRITING SECTION */}
                        {(() => {
                            const allFeatured: any[] = authorData.featured_pieces && authorData.featured_pieces.length > 0
                                ? authorData.featured_pieces
                                : (authorData.writing_content ? [{
                                    id: 'legacy-1',
                                    title: authorData.writing_title || "MY WRITING",
                                    content: authorData.writing_content,
                                    format: authorData.writing_format || 'POETRY',
                                    font: authorData.writing_font || 'SERIF',
                                    backstory: authorData.writing_backstory || '',
                                    pinned: true
                                }] : []);

                            const pinnedList = allFeatured.filter((p: any) => p.pinned !== false).slice(0, 3);
                            if (pinnedList.length === 0 && allFeatured.length > 0) {
                                pinnedList.push(allFeatured[0]);
                            }

                            return (
                                <section className="space-y-8">
                                    <div className="flex items-center justify-between flex-wrap gap-4 border-b-4 border-black pb-4">
                                        <h2 className="text-3xl md:text-5xl font-black uppercase text-black">
                                            FEATURED WRITING
                                        </h2>
                                        <Link
                                            href={`/author/${username}/featured`}
                                            className="bg-black text-[#39FF14] px-4 py-2 text-xs md:text-sm font-black uppercase border-2 border-black hover:bg-[#39FF14] hover:text-black transition-colors shadow-[4px_4px_0_0_#000]"
                                        >
                                            READ ALL FEATURED WORKS ({allFeatured.length}) →
                                        </Link>
                                    </div>

                                    <div className="space-y-8">
                                        {pinnedList.map((piece: any, idx: number) => {
                                            const plainSnippet = piece.content ? piece.content.replace(/<[^>]+>/g, ' ').slice(0, 180) : '';
                                            return (
                                                <div
                                                    key={piece.id || idx}
                                                    className="bg-black text-white border-[4px] border-black p-6 md:p-10 shadow-[10px_10px_0px_0px_#FFC700] space-y-6"
                                                >
                                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                                        <span className="bg-[#39FF14] text-black text-xs font-black px-3 py-1 uppercase border-2 border-white shadow-[2px_2px_0_0_#FFF]">
                                                            {piece.format === 'PROSE_POETRY' ? '✒️ PROSE POETRY' :
                                                             piece.format === 'FLASH_FICTION' ? '⚡ FLASH FICTION' :
                                                             piece.format === 'CHAPTER_EXCERPT' ? '📖 CHAPTER EXCERPT' :
                                                             piece.format === 'SPOKEN_WORD' ? '🎤 SPOKEN WORD' :
                                                             piece.format === 'ESSAY' ? '📝 PERSONAL ESSAY' : '📜 POETRY'}
                                                        </span>
                                                        <span className="bg-white text-black text-xs font-black px-3 py-1 uppercase border-2 border-white shadow-[2px_2px_0_0_#FFF]">
                                                            ⏱️ {getReadingTime(piece.content)}
                                                        </span>
                                                    </div>

                                                    <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white break-words">
                                                        {piece.title || "UNTITLED PIECE"}
                                                    </h3>

                                                    <div
                                                        className={`font-medium text-base md:text-xl leading-relaxed text-gray-300 border-l-4 border-[#39FF14] pl-4 ${
                                                            piece.font === 'MONO' ? 'font-mono' :
                                                            piece.font === 'SANS' ? 'font-sans' : 'font-serif'
                                                        }`}
                                                    >
                                                        <p className="line-clamp-3">"{plainSnippet}..."</p>
                                                    </div>

                                                    {piece.backstory && (
                                                        <div className="bg-white/10 p-3 border-l-4 border-[#FFC700] text-xs font-serif italic text-gray-300">
                                                            “{piece.backstory}”
                                                        </div>
                                                    )}

                                                    <div className="pt-2 flex items-center justify-between flex-wrap gap-4 border-t border-gray-800">
                                                        <button
                                                            onClick={() => setActiveModalPiece(piece)}
                                                            className="bg-[#39FF14] text-black px-6 py-3 font-black text-xs md:text-sm uppercase border-2 border-white shadow-[4px_4px_0_0_#FFF] hover:bg-white transition-colors"
                                                        >
                                                            READ FULL PIECE ↗
                                                        </button>
                                                        <button
                                                            onClick={handleClap}
                                                            className={`flex items-center gap-2 px-4 py-2 border border-white text-xs font-black uppercase ${hasClapped ? 'bg-[#39FF14] text-black' : 'bg-white text-black'}`}
                                                        >
                                                            👏 CLAP ({claps})
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {allFeatured.length > 3 && (
                                        <div className="text-center pt-4">
                                            <Link
                                                href={`/author/${username}/featured`}
                                                className="inline-block bg-black text-[#39FF14] px-8 py-4 font-black text-sm uppercase border-4 border-black shadow-[6px_6px_0_0_#39FF14] hover:bg-[#39FF14] hover:text-black transition-colors"
                                            >
                                                VIEW ALL {allFeatured.length} FEATURED WRITINGS BY AUTHOR →
                                            </Link>
                                        </div>
                                    )}
                                </section>
                            );
                        })()}

                        {/* PUBLISHED BOOKS SECTION */}
                        {authorData.books && authorData.books.length > 0 && (
                            <section className="bg-white border-[4px] border-black p-6 md:p-10 shadow-[12px_12px_0px_0px_#00A3FF] w-full max-w-full min-w-0 overflow-hidden break-words">
                                <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-6 text-[#00A3FF]">
                                    PUBLISHED BOOKS
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full min-w-0">
                                    {authorData.books.map((book: any, idx: number) => {
                                        const rawLink = book.buy_link || book.buyLink || book.link || '';
                                        const finalUrl = formatExternalUrl(rawLink);

                                        return (
                                            <div key={idx} className="border-[3px] border-black p-5 bg-blue-50/30 shadow-[4px_4px_0_0_#000] flex flex-col justify-between space-y-4 w-full min-w-0 overflow-hidden break-words">
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                                        <span className="bg-[#00A3FF] text-white text-[10px] font-black px-2 py-0.5 uppercase border border-black">{book.format || 'Book'}</span>
                                                        {book.price && <span className="font-black text-sm text-black">₹{book.price}</span>}
                                                    </div>
                                                    <h3 className="font-black text-xl uppercase leading-tight break-words [overflow-wrap:anywhere]">{book.title}</h3>
                                                    {book.description && <p className="text-xs text-gray-700 font-medium break-words [overflow-wrap:anywhere]">{book.description}</p>}
                                                </div>

                                                {finalUrl ? (
                                                    <a
                                                        href={finalUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-block w-full text-center bg-black text-[#39FF14] px-4 py-3 text-xs font-black uppercase hover:bg-[#00A3FF] hover:text-white transition-colors border-2 border-black shadow-[3px_3px_0_0_#000]"
                                                    >
                                                        BUY NOW ↗
                                                    </a>
                                                ) : (
                                                    <span className="inline-block w-full text-center bg-gray-200 text-gray-500 px-4 py-2 text-[10px] font-black uppercase border border-black cursor-not-allowed">
                                                        NO BUYING LINK PROVIDED
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </main>

            {/* FULL READING MODAL */}
            {activeModalPiece && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-black text-white border-[4px] border-white p-6 md:p-12 shadow-[16px_16px_0_0_#39FF14] max-w-4xl w-full max-h-[90vh] overflow-y-auto space-y-6 animate-in zoom-in-95">
                        <div className="flex justify-between items-center border-b-2 border-gray-800 pb-4">
                            <div className="flex items-center gap-2">
                                <span className="bg-[#39FF14] text-black text-xs font-black px-3 py-1 uppercase border border-white">
                                    {activeModalPiece.format || 'POETRY'}
                                </span>
                                <span className="bg-white text-black text-xs font-black px-3 py-1 uppercase border border-white">
                                    ⏱️ {getReadingTime(activeModalPiece.content)}
                                </span>
                            </div>
                            <button
                                onClick={() => setActiveModalPiece(null)}
                                className="bg-red-600 text-white font-black px-4 py-1.5 text-xs uppercase border-2 border-white hover:bg-white hover:text-black transition-colors"
                            >
                                CLOSE ✕
                            </button>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-black uppercase text-[#39FF14]">
                            {activeModalPiece.title}
                        </h2>

                        <div
                            className={`font-medium text-lg md:text-2xl leading-relaxed text-gray-200 border-l-[6px] border-[#39FF14] pl-6 ${
                                activeModalPiece.font === 'MONO' ? 'font-mono' :
                                activeModalPiece.font === 'SANS' ? 'font-sans' : 'font-serif'
                            }`}
                            dangerouslySetInnerHTML={{ __html: activeModalPiece.content }}
                        />

                        {activeModalPiece.backstory && (
                            <div className="bg-white/10 p-4 border-l-4 border-[#FFC700] space-y-1">
                                <span className="text-[10px] font-black uppercase text-[#FFC700]">📖 BEHIND THE WORDS (AUTHOR NOTE)</span>
                                <p className="text-sm font-serif italic text-gray-300">“{activeModalPiece.backstory}”</p>
                            </div>
                        )}

                        <div className="pt-4 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
                            <button
                                onClick={handleClap}
                                className={`flex items-center justify-center gap-3 px-6 py-3 border-2 border-white font-black text-sm uppercase min-h-[44px] ${hasClapped ? 'bg-[#39FF14] text-black' : 'bg-white text-black'}`}
                            >
                                👏 APPRECIATE / CLAP <span className="bg-black text-white px-2 py-0.5 text-xs rounded-full">{claps}</span>
                            </button>
                            <button
                                onClick={() => setActiveModalPiece(null)}
                                className="bg-white text-black font-black px-6 py-3 text-xs uppercase hover:bg-[#39FF14] transition-colors min-h-[44px]"
                            >
                                DONE READING ✕
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AuthorSiteClient;
