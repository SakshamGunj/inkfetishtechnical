import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, FileText, ChevronDown, ChevronUp, Award, Download, Loader2 } from 'lucide-react';
import { generateRetroPressKit } from '../utils/generatePressKit';
import { collection, query, where, getDocs, limit, doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const DEFAULT_DEMO_DATA = {
    // ... omitting lines 9-45 for brevity as they are unchanged
    wip_target: 80000
};

const AuthorSite = () => {
    const { username } = useParams();
    const [authorData, setAuthorData] = useState<any>(null);
    const [expandedPiece, setExpandedPiece] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            if (!username) {
                setError("No operative callsign provided.");
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
                        setError("OPERATIVE NOT FOUND IN DATABASE.");
                    }
                }
            } catch (err) {
                console.error("Failed to fetch profile:", err);
                setError("CONNECTION TO AUTHORVERSE FAILED.");
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
            <Link to="/" className="mt-8 border-[3px] border-black px-6 py-3 font-black uppercase hover:bg-[#39FF14] transition-colors shadow-[4px_4px_0_0_#000]">
                RETURN TO BASE
            </Link>
        </div>
    );

    if (!authorData) return (
        <div className="min-h-screen bg-[#FFFDF7] flex justify-center items-center font-mono">
            <Loader2 className="w-16 h-16 animate-spin text-black mb-4 mr-4" />
            <h1 className="text-2xl md:text-4xl font-black uppercase tracking-widest animate-pulse">ESTABLISHING UPLINK...</h1>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FFFDF7] font-mono selection:bg-[#FF4F00] selection:text-white pb-20 overflow-x-hidden">

            {/* Top Navigation / Banner */}
            <div className="w-full bg-black text-white py-2 px-4 flex justify-between items-center text-xs md:text-sm font-bold uppercase shadow-[0_4px_0_0_#FF4F00] mb-8 md:mb-12 sticky top-0 z-50">
                <span className="tracking-[0.2em] flex-grow truncate">INKFETISH PUBLICATIONS</span>
                <Link to="/authorsite/dashboard" className="hover:text-[#39FF14] transition-colors underline decoration-2 underline-offset-4 whitespace-nowrap ml-4">
                    COMMAND CENTER //
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
                                    <span className="mt-2 text-[10px] md:text-sm uppercase tracking-widest text-black">NO SIGNAL</span>
                                </div>
                            )}
                            {/* Scanline effect */}
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
                                            <span className="text-[10px] md:text-xs font-black tracking-widest text-gray-500 uppercase">CURRENT PROJECT // WIP</span>
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
                                    {/* The Bar Background */}
                                    <div className="w-full h-8 bg-gray-200 border-[3px] border-black mt-4 relative overflow-hidden flex items-center">
                                        {/* The Fill */}
                                        <div
                                            className="h-full bg-black transition-all duration-1000 ease-out flex items-center"
                                            style={{ width: `${Math.min(100, Math.max(0, (authorData.wip_current / authorData.wip_target) * 100))}%` }}
                                        >
                                            {/* Striped pattern overlay for fill */}
                                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #FFF 10px, #FFF 20px)' }}></div>
                                        </div>
                                        {/* Scanline overlay for whole bar */}
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

                                {/* New Media Kit Download Button */}
                                <button
                                    onClick={() => generateRetroPressKit(authorData)}
                                    className="border-[3px] w-full sm:w-auto justify-center border-black bg-[#9D00FF] text-white px-4 py-2 text-sm md:text-base font-black uppercase hover:bg-black transition-colors shadow-[4px_4px_0_0_#000] active:translate-y-1 active:shadow-none flex items-center gap-2"
                                >
                                    <Download size={18} />
                                    MEDIA KIT (PDF)
                                </button>

                                {authorData.instagram && (
                                    <a href={authorData.instagram} target="_blank" rel="noopener noreferrer" className="border-2 w-full sm:w-auto text-center border-black bg-[#FF4F00] text-white px-4 py-2 text-sm md:text-base font-black uppercase hover:bg-black hover:text-[#FF4F00] transition-colors shadow-[4px_4px_0_0_#000] active:translate-y-1 active:shadow-none">
                                        INSTAGRAM ↗
                                    </a>
                                )}
                                {authorData.twitter && (
                                    <a href={authorData.twitter} target="_blank" rel="noopener noreferrer" className="border-2 w-full sm:w-auto text-center border-black bg-white text-black px-4 py-2 text-sm md:text-base font-black uppercase hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0_0_#000] active:translate-y-1 active:shadow-none">
                                        X / TWITTER ↗
                                    </a>
                                )}
                                {authorData.tiktok && (
                                    <a href={authorData.tiktok} target="_blank" rel="noopener noreferrer" className="border-2 w-full sm:w-auto text-center border-black bg-black text-white px-4 py-2 text-sm md:text-base font-black uppercase hover:bg-[#39FF14] hover:text-black transition-colors shadow-[4px_4px_0_0_#39FF14] active:translate-y-1 active:shadow-none">
                                        TIKTOK ↗
                                    </a>
                                )}
                                {authorData.substack && (
                                    <a href={authorData.substack} target="_blank" rel="noopener noreferrer" className="border-2 w-full sm:w-auto text-center border-black bg-[#00A3FF] text-white px-4 py-2 text-sm md:text-base font-black uppercase hover:bg-black transition-colors shadow-[4px_4px_0_0_#000] active:translate-y-1 active:shadow-none">
                                        NEWSLETTER ↗
                                    </a>
                                )}
                                {authorData.website && (
                                    <a href={authorData.website} target="_blank" rel="noopener noreferrer" className="border-2 w-full sm:w-auto text-center border-black bg-gray-200 text-black px-4 py-2 text-sm md:text-base font-black uppercase hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0_0_#000] active:translate-y-1 active:shadow-none">
                                        UPLINK ↗
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

                    {/* LEFT COLUMN: ABOUT & DETAILS (Col 4) */}
                    <div className="lg:col-span-4 space-y-8 md:space-y-12">

                        <section className="bg-white border-[4px] border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
                            {/* Pin graphic */}
                            <div className="absolute top-2 right-4 w-4 h-4 rounded-full bg-red-500 shadow-inner border border-black z-10" />
                            <div className="absolute top-2 right-4 w-12 h-6 border-b-2 border-gray-400 -rotate-45 origin-top-left -z-0 opacity-50" />

                            <h3 className="bg-black text-white px-3 py-1 text-sm font-bold uppercase inline-block mb-6 shadow-[2px_2px_0_0_#39FF14]">THE AUTHOR</h3>
                            <p className="font-semibold text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                                {authorData.bio || "No biography provided."}
                            </p>
                        </section>

                        <section className="bg-[#E5E5E5] border-[4px] border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-sm">
                            <h3 className="bg-black text-white px-3 py-1 text-sm font-bold uppercase inline-block mb-6 shadow-[2px_2px_0_0_#FF4F00]">DOSSIER</h3>
                            <ul className="space-y-6">
                                {authorData.location && (
                                    <li className="flex flex-col border-b-[3px] border-black pb-3">
                                        <span className="font-black text-gray-500 text-xs tracking-widest">BASE OF OPERATIONS</span>
                                        <span className="font-bold text-base md:text-lg uppercase">{authorData.location}</span>
                                    </li>
                                )}
                                {authorData.dob && (
                                    <li className="flex flex-col border-b-[3px] border-black pb-3">
                                        <span className="font-black text-gray-500 text-xs tracking-widest">ESTABLISHED</span>
                                        <span className="font-bold text-base md:text-lg">{new Date(authorData.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </li>
                                )}
                                <li className="flex flex-col border-b-[3px] border-black pb-3">
                                    <span className="font-black text-gray-500 text-xs tracking-widest">SECURE COMMS</span>
                                    <a href={`mailto:${authorData.email}`} className="font-bold text-base sm:text-lg md:text-xl break-all hover:text-[#FF4F00] hover:underline underline-offset-4 transition-colors">{authorData.email}</a>
                                </li>
                                {authorData.website && (
                                    <li className="flex flex-col border-b-[3px] border-black pb-3">
                                        <span className="font-black text-gray-500 text-xs tracking-widest">MAIN TERMINAL</span>
                                        <a href={authorData.website} target="_blank" rel="noopener noreferrer" className="font-bold text-sm sm:text-base md:text-lg text-blue-600 hover:underline break-all">{authorData.website.replace(/^https?:\/\//, '')} ↗</a>
                                    </li>
                                )}
                                {authorData.other_details && (
                                    <li className="flex flex-col border-b-[3px] border-black pb-3">
                                        <span className="font-black text-gray-500 text-xs tracking-widest">EXTRA INTEL</span>
                                        <span className="font-bold text-base md:text-lg whitespace-pre-wrap">{authorData.other_details}</span>
                                    </li>
                                )}
                            </ul>
                        </section>

                        {/* Professional Timeline / Experience */}
                        {authorData.experiences && authorData.experiences.filter((e: any) => e.is_public).length > 0 && (
                            <section className="bg-black text-white border-[4px] border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_#FFC700]">
                                <h3 className="bg-[#FF4F00] text-white px-3 py-1 text-sm font-bold uppercase inline-block mb-10 shadow-[2px_2px_0_0_#FFF]">EXPERIENCE</h3>

                                <div className="ml-2 md:ml-4 border-l-[4px] border-[#39FF14] pl-6 md:pl-8 space-y-10 py-2">
                                    {authorData.experiences.filter((exp: any) => exp.is_public).map((exp: any, index: number) => (
                                        <div key={exp.id} className="relative w-full">
                                            {/* Green Dot on Timeline */}
                                            <div className="absolute -left-[36px] md:-left-[44px] top-4 md:top-6 w-[24px] h-[24px] rounded-full border-[4px] border-black bg-[#39FF14] z-10 shadow-[2px_2px_0_0_#FFF]" />

                                            {/* Experience Card */}
                                            <div className="bg-white text-black p-4 md:p-6 border-[3px] border-black shadow-[6px_6px_0_0_#FF4F00] w-full break-words group">
                                                <span className="font-black text-[#FF4F00] text-xs uppercase tracking-widest block mb-1 group-hover:translate-x-1 transition-transform">{exp.year}</span>
                                                <h4 className="font-black text-xl md:text-2xl uppercase leading-tight mb-2 break-words group-hover:translate-x-1 transition-transform">{exp.title}</h4>
                                                {exp.description && (
                                                    <p className="font-medium text-sm md:text-base text-gray-700 leading-relaxed max-w-none group-hover:translate-x-1 transition-transform">{exp.description}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                    </div>

                    {/* RIGHT COLUMN: MANUSCRIPTS & LIBRARY (Col 8) */}
                    <div className="lg:col-span-8 flex flex-col gap-12">

                        {/* Featured Piece */}
                        <section className="bg-black text-white border-[4px] border-black p-6 md:p-10 lg:p-16 shadow-[12px_12px_0px_0px_#FFC700] relative">
                            {/* Tape effect */}
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-48 h-10 bg-white/20 -rotate-2 mix-blend-overlay backdrop-blur-sm z-10" />

                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                                <h4 className="text-[#39FF14] text-xs md:text-sm font-bold uppercase tracking-widest">++ FEATURED EXCERPT ++</h4>
                            </div>

                            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-8 md:mb-10 text-white break-words">
                                {authorData.writing_title || "UNTITLED PIECE"}
                            </h2>

                            <div
                                className="font-medium text-base md:text-2xl leading-relaxed md:leading-[1.8] text-gray-200 border-l-[4px] md:border-l-[6px] border-[#39FF14] pl-4 md:pl-8 font-serif [&_ul]:list-disc [&_ul]:pl-6 md:[&_ul]:pl-8 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 md:[&_ol]:pl-8 [&_ol]:my-4 [&_b]:font-bold [&_i]:italic [&_h1]:text-2xl [&_h1]:md:text-4xl [&_h1]:font-black [&_h1]:uppercase [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_blockquote]:border-l-[4px] [&_blockquote]:border-[#39FF14] [&_blockquote]:pl-4 [&_blockquote]:py-2 [&_blockquote]:italic [&_blockquote]:my-6 [&_blockquote]:bg-white/10 [&_hr]:border-t-[4px] [&_hr]:border-dashed [&_hr]:border-white/30 [&_hr]:my-8 [&_s]:line-through [&_s]:decoration-red-500 [&_s]:decoration-[3px]"
                                dangerouslySetInnerHTML={{ __html: authorData.writing_content || "Content goes here..." }}
                            />
                        </section>

                        {/* The Library (Books) */}
                        <section className="bg-[#FFFDF7]">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="bg-[#00A3FF] p-3 border-[3px] border-black shadow-[4px_4px_0_0_#000]">
                                    <BookOpen size={28} className="text-black" />
                                </div>
                                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">THE LIBRARY</h3>
                                <div className="flex-grow h-[4px] bg-black ml-4 hidden sm:block" />
                            </div>

                            {(!authorData.books || authorData.books.filter((b: any) => b.is_public).length === 0) ? (
                                <div className="border-[4px] border-dashed border-gray-400 p-8 text-center text-gray-500 font-bold uppercase">No published books listed.</div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {authorData.books.filter((b: any) => b.is_public).map((book: any) => (
                                        <div key={book.id} className="bg-white border-[4px] border-black flex flex-col h-full shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#FF4F00] hover:-translate-y-2 transition-all duration-300">
                                            {book.cover_image && (
                                                <div className="h-48 border-b-[4px] border-black border-dashed overflow-hidden bg-gray-100 flex-shrink-0">
                                                    <img src={book.cover_image} alt={book.title} className="w-full h-full object-cover" />
                                                </div>
                                            )}
                                            <div className="p-6 flex flex-col flex-grow">
                                                <div className="mb-2">
                                                    {book.role && book.role !== "Author" && (
                                                        <span className="bg-[#FF4F00] text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 inline-block mb-2 shadow-[2px_2px_0_0_#000]">
                                                            {book.role}
                                                        </span>
                                                    )}
                                                    <div className="flex justify-between items-start gap-2">
                                                        <h4 className="text-2xl font-black uppercase leading-tight">{book.title}</h4>
                                                        {book.year && <span className="bg-black text-white text-xs font-bold px-2 py-1 flex-shrink-0">{book.year}</span>}
                                                    </div>
                                                </div>
                                                <p className="font-medium text-gray-700 text-sm md:text-base mb-6 flex-grow">{book.description}</p>
                                                {book.link && (
                                                    <a href={book.link} target="_blank" rel="noopener noreferrer" className="bg-[#FFC700] text-black border-[3px] border-black px-4 py-3 font-black text-center uppercase tracking-widest hover:bg-black hover:text-[#FFC700] transition-colors mt-auto">
                                                        VIEW BOOK ↗
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* The Archive (Writings) */}
                        <section className="bg-[#FFFDF7]">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="bg-[#39FF14] p-3 border-[3px] border-black shadow-[4px_4px_0_0_#000]">
                                    <FileText size={28} className="text-black" />
                                </div>
                                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">THE ARCHIVE</h3>
                                <div className="flex-grow h-[4px] bg-black ml-4 hidden sm:block" />
                            </div>

                            {(!authorData.writing_pieces || authorData.writing_pieces.filter((p: any) => p.is_public).length === 0) ? (
                                <div className="border-[4px] border-dashed border-gray-400 p-8 text-center text-gray-500 font-bold uppercase">No archived writings found.</div>
                            ) : (
                                <div className="space-y-4">
                                    {authorData.writing_pieces.filter((p: any) => p.is_public).map((piece: any) => (
                                        <div key={piece.id} className="border-[4px] border-black bg-white shadow-[6px_6px_0_0_#000]">
                                            <button
                                                onClick={() => togglePiece(piece.id)}
                                                className="w-full flex justify-between items-center p-4 md:p-6 bg-white hover:bg-gray-50 transition-colors text-left"
                                            >
                                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pr-2 overflow-hidden">
                                                    <span className="bg-black text-white text-[10px] md:text-xs font-bold px-2 py-1 uppercase tracking-widest w-fit">
                                                        {piece.type}
                                                    </span>
                                                    <h4 className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight truncate max-w-full">{piece.title}</h4>
                                                </div>
                                                <div className="flex-shrink-0 bg-gray-200 p-2 border-2 border-black ml-2 mt-auto md:mt-0">
                                                    {expandedPiece === piece.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                                </div>
                                            </button>

                                            {/* Expandable Content */}
                                            {expandedPiece === piece.id && (
                                                <div
                                                    className="p-6 md:p-8 border-t-[4px] border-black bg-gray-50 font-serif text-base md:text-lg leading-relaxed [&_ul]:list-disc [&_ul]:pl-8 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-8 [&_ol]:my-4 [&_b]:font-bold [&_i]:italic [&_h1]:text-3xl [&_h1]:md:text-4xl [&_h1]:font-black [&_h1]:uppercase [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_blockquote]:border-l-[4px] [&_blockquote]:border-black [&_blockquote]:pl-4 [&_blockquote]:py-2 [&_blockquote]:italic [&_blockquote]:my-6 [&_blockquote]:bg-gray-200 [&_blockquote]:text-gray-800 [&_hr]:border-t-[4px] [&_hr]:border-dashed [&_hr]:border-black [&_hr]:my-8 [&_s]:line-through [&_s]:decoration-red-500 [&_s]:decoration-[3px]"
                                                    dangerouslySetInnerHTML={{ __html: piece.content }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* Awards & Press */}
                        {authorData.awards && authorData.awards.length > 0 && (
                            <section className="bg-[#FFFDF7]">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="bg-[#9D00FF] p-3 border-[3px] border-black shadow-[4px_4px_0_0_#000]">
                                        <Award size={28} className="text-white" />
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">AWARDS & PRESS</h3>
                                    <div className="flex-grow h-[4px] bg-black ml-4 hidden sm:block" />
                                </div>
                                <div className="grid grid-cols-1 gap-6">
                                    {authorData.awards.map((award: any) => (
                                        <div key={award.id} className="border-[4px] border-black bg-white p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center shadow-[6px_6px_0_0_#000] hover:shadow-[10px_10px_0_0_#9D00FF] hover:-translate-y-1 transition-all">
                                            <div className="flex-shrink-0 w-24 h-24 bg-gray-100 border-[3px] border-black border-dashed flex items-center justify-center rotate-[-3deg]">
                                                <Award size={40} className="text-[#9D00FF]" />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                                                    <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">{award.title}</h4>
                                                    {award.year && <span className="bg-black text-white font-bold px-2 py-1 text-sm md:text-base shadow-[2px_2px_0_0_#FFC700] md:rotate-3">{award.year}</span>}
                                                </div>
                                                <h5 className="text-[#FF4F00] font-black tracking-widest uppercase mb-4">{award.organization}</h5>
                                                {award.description && <p className="font-medium text-gray-700 leading-relaxed max-w-2xl">{award.description}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                    </div>
                </div>

                {/* Collaboration & Contact Block */}
                {(authorData.collab_prompt || authorData.collab_email) && (
                    <section className="mt-12 md:mt-16 bg-[#39FF14] text-black border-[4px] border-black p-8 md:p-12 lg:p-16 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                        {/* Decorative BG elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-black rounded-full mix-blend-overlay opacity-10 -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-10 w-32 h-32 border-[8px] border-black rounded-full mix-blend-overlay opacity-10 translate-y-1/2" />

                        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">OPPORTUNITIES & COLLABORATIONS</h2>
                            {authorData.collab_prompt && (
                                <p className="text-lg md:text-2xl font-bold leading-relaxed mb-8 md:mb-12 max-w-3xl">
                                    "{authorData.collab_prompt}"
                                </p>
                            )}
                            <a
                                href={`mailto:${authorData.collab_email || authorData.email}`}
                                className="inline-block w-full sm:w-auto text-center bg-black text-white hover:bg-[#FF4F00] hover:text-white px-6 md:px-12 py-4 md:py-6 border-[4px] border-black font-black text-base sm:text-lg md:text-2xl uppercase tracking-widest transition-all shadow-[6px_6px_0_0_rgba(0,0,0,0.3)] hover:shadow-[10px_10px_0_0_rgba(0,0,0,1)] hover:-translate-y-2 active:translate-y-0 active:shadow-none leading-tight"
                            >
                                INITIATE SECURE COMMS ↗
                            </a>
                        </div>
                    </section>
                )}

            </main>
        </div>
    );
};

export default AuthorSite;
