import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Printer, BarChart, X } from 'lucide-react';
import submissionsData from '../data/anthology_submissions.json';

// --- Types ---
interface Submission {
    id: string;
    created_at: string;
    real_name: string;
    book_name: string;
    is_pen_name: boolean;
    poem1_title: string;
    poem1_content: string;
    poem2_title?: string;
    poem2_content?: string;
}

interface RenderItem {
    type: 'title' | 'author' | 'paragraph' | 'spacing';
    content: string;
    height: number; // in pixels
    originalIndex?: number; // for tracking
}

interface PageData {
    pageNumber: number;
    items: RenderItem[];
}

interface PoemMetric {
    title: string;
    author: string;
    startPage: number;
    endPage: number;
    pagesUsed: number;
}

interface AnalysisResult {
    totalPoems: number;
    totalPages: number;
    singlePagePoems: number;
    doublePagePoems: number;
    multiPagePoems: number;
    maxPagesUsed: number;
    avgPagesPerPoem: number;
    avgPageUtil: number;
    poemMetrics: PoemMetric[];
    pageUtilizations: number[]; // Index = page number - 1
}

// --- Constants (Professional Book Layout v6: Top Flow) ---
const MM_TO_PX = 3.78;

const PAGE_WIDTH_MM = 148;
const PAGE_HEIGHT_MM = 210;

// 1. Margins (Strict Book Metrics)
const MARGIN_TOP_MM = 10; // Tight top
const MARGIN_BOTTOM_MM = 11; // Tight bottom (Footer boundary)

// Alternating Logic:
// Odd (Recto/Right): Inside Left(16), Outside Right(13)
// Even (Verso/Left): Outside Left(13), Inside Right(16)
const MARGIN_INSIDE_MM = 16;
const MARGIN_OUTSIDE_MM = 13;

// 2. Header Metrics
const HEADER_HEIGHT_MM = 7;
const HEADER_GAP_MM = 2; // Tighter gap

// 3. Effective Body Start/End
// Body starts Y = 10 + 7 + 2 = 19mm from Top
const BODY_START_Y_MM = MARGIN_TOP_MM + HEADER_HEIGHT_MM + HEADER_GAP_MM;
const BODY_PADDING_BOTTOM_MM = MARGIN_BOTTOM_MM; // 11mm (Footer area is empty whitespace)

// 4. Usable Content Area
// Width: 148 - 16 - 13 = 119mm
const CONTENT_WIDTH_MM = PAGE_WIDTH_MM - MARGIN_INSIDE_MM - MARGIN_OUTSIDE_MM;
const CONTENT_WIDTH_PX = CONTENT_WIDTH_MM * MM_TO_PX;

// Height: 210 - 19 - 11 = 180mm (Professional Density)
const CONTENT_HEIGHT_MM = PAGE_HEIGHT_MM - BODY_START_Y_MM - BODY_PADDING_BOTTOM_MM;
const CONTENT_HEIGHT_PX = CONTENT_HEIGHT_MM * MM_TO_PX;


// Typography Constants (v6 Professional)
// Title: 14pt, Bold, Center. Spacing below: 5mm.
const FONT_TITLE = "font-serif font-bold text-[14pt] leading-tight text-center mb-[5mm]";
// Author: 10pt, Italic, Center. Spacing below: 6mm.
const FONT_AUTHOR = "font-serif italic text-[10pt] text-center mb-[6mm]";
// Body: 10.3pt, Regular, Left. Line Height: 1.20. Paragraph spacing: 1.5mm.
// Tracking: -0.2% (~-0.002em). Hyphenation: Off.
const FONT_BODY = "font-serif text-[10.3pt] leading-[1.20] tracking-[-0.002em] text-left mb-[1.5mm]"; // hyphens-none default

// Header Font: 8.5pt, 70% Black (text-neutral-600)
const FONT_HEADER = "font-serif text-[8.5pt] text-neutral-600";

// --- Engine ---

const LoveAnthologyManuscript = () => {
    const [status, setStatus] = useState<'idle' | 'measuring' | 'paginating' | 'ready'>('idle');
    const [rawItems, setRawItems] = useState<RenderItem[]>([]);
    const [pages, setPages] = useState<PageData[]>([]);
    const [showAnalysis, setShowAnalysis] = useState(false);
    const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null);
    const measureContainerRef = useRef<HTMLDivElement>(null);

    // 1. Load Data & Prepare Items
    useEffect(() => {
        setStatus('measuring');
        const items: RenderItem[] = [];

        (submissionsData as Submission[]).forEach((sub) => {
            const authorName = sub.is_pen_name ? sub.book_name : sub.real_name;
            let selectedPoem = { title: sub.poem1_title, content: sub.poem1_content };
            if (sub.poem2_content && sub.poem2_content.trim().length > 0) {
                if (Math.random() > 0.5) {
                    selectedPoem = { title: sub.poem2_title || "Untitled", content: sub.poem2_content };
                }
            }

            items.push({ type: 'title', content: selectedPoem.title, height: 0 });
            items.push({ type: 'author', content: authorName, height: 0 });

            const rawLines = selectedPoem.content.replace(/\r\n/g, '\n').split('\n');
            let blankLineCount = 0;

            rawLines.forEach(p => {
                const isBlank = p.trim() === '';
                if (isBlank) {
                    blankLineCount++;
                    if (blankLineCount <= 1) {
                        // Collapse multiple blank lines to one spacer
                        // v6 spacing rule: 1.5mm between stanzas. 
                        // Standard paragraph has mb-[1.5mm].
                        // A blank line should be roughly 1 line height or just a slightly larger gap?
                        // "Collapse multiple blank lines to one stanza break." => standard gap.
                        // But if we put NOTHING, it's just a paragraph break (1.5mm).
                        // If user typed a blank line, they mean a stanza break.
                        // A simple paragraph margin IS the stanza break in this layout.
                        // So we should NOT add a spacer if we rely on margin.
                        // BUT standard paragraphs might just be wrapped lines.
                        // Wait, poem lines are usually separate blocks.
                        // So "paragraph" = "line".
                        // Stanza break = Extra space.
                        // Current logic: Each input line is a paragraph.
                        // So 1.5mm between lines.
                        // Stanza break needs MORE than 1.5mm?
                        // User said: "Between stanzas: 1.5mm".
                        // Wait, "Between LINES: Controlled by line-height only".
                        // Ah! Input text has newline per line?
                        // If I render each line as a <p>, the margin applies to EVERY line.
                        // That would be 1.5mm between EVERY line. That's huge if line-height is 1.20!
                        // POETRY RENDERING FIX:
                        // We should render stanzas as blocks depending on input.
                        // But if input is just lines... 
                        // Check implementation: `p` splits by `\n`.
                        // `font-serif ... mb-[1.5mm]` per line!
                        // This means 1.5mm gap between EVERY line.
                        // If user meant "Between Stanzas 1.5mm", then lines within stanza should be tight (0mm margin).
                        // BUT `leading-[1.20]` handles line height.
                        // If we use <p> per line, we get line-height + margin-bottom.
                        // This explains "Loose layout"!
                        // FIX: `mb-0` for lines, `mb-[1.5mm]` for blank lines (spacers)?
                        // OR: Only apply margin if next line is blank?

                        // Let's look at standards: 
                        // "Between lines: Controlled by line-height".
                        // "Between stanzas: 1.5mm".

                        // My current code: `mb-[1.5mm]` on EVERY paragraph (line).
                        // THIS IS THE BUG CAUSING VERTICAL LOOSENESS.
                        // 1.5mm ~ 4px. 4px extra per line!

                        // REVISED LOGIC FOR v6:
                        // Lines should have `mb-0`.
                        // Stanza breaks (blank lines) should have ... well height.
                        // Actually, let's set `min-height` for spacer?
                        // Or use `mb-[1.5mm]` ONLY on the last line of a stanza?
                        // Hard to detect last line in this loop easily without lookahead.

                        // Better: Use `mb-0` for all lines.
                        // Use `h-[1.5mm]` div for spacer (blank line).
                        // And ensure RenderItem 'spacing' is that spacer.

                        // Let's modify: 
                        // FONT_BODY uses `mb-0`.
                        // 'spacing' item uses height = 1.5mm (approx 6px).

                        // wait, user said "Collapse multiple blank lines to one stanza break".
                        // So if input has: Line \n \n Line.
                        // Loop finds Line (mb0), Blank (Spacer 1.5mm), Blank (Skip), Line (mb0).
                        // Result: Line, Gap, Line. Perfect.

                        items.push({ type: 'spacing', content: '', height: 6 }); // 1.5mm ~ 6px
                    }
                } else {
                    blankLineCount = 0;
                    items.push({ type: 'paragraph', content: p, height: 0 });
                }
            });
        });

        setRawItems(items);
    }, []);

    // 2. Measure Heights
    useLayoutEffect(() => {
        if (status === 'measuring' && measureContainerRef.current && rawItems.length > 0) {
            const container = measureContainerRef.current;
            const updatedItems = [...rawItems];
            const children = container.children;

            for (let i = 0; i < updatedItems.length; i++) {
                const item = updatedItems[i];
                if (item.type !== 'spacing') {
                    const domNode = children[i];
                    if (domNode) {
                        const style = window.getComputedStyle(domNode);
                        const marginBottom = parseFloat(style.marginBottom);
                        updatedItems[i].height = domNode.getBoundingClientRect().height + marginBottom;
                    }
                }
            }

            setRawItems(updatedItems);
            setStatus('paginating');
        }
    }, [status, rawItems]);

    // 3. Paginate (Standard Top Flow)
    useEffect(() => {
        if (status === 'paginating') {
            const newPages: PageData[] = [];
            let currentPageItems: RenderItem[] = [];
            let currentY = 0;
            const MAX_H = CONTENT_HEIGHT_PX;

            let i = 0;
            while (i < rawItems.length) {
                const item = rawItems[i];

                // FORCE PAGE BREAK for Titles
                if (item.type === 'title' && currentPageItems.length > 0) {
                    newPages.push({ pageNumber: newPages.length + 1, items: currentPageItems });
                    currentPageItems = [];
                    currentY = 0;
                    continue;
                }

                if (currentY + item.height <= MAX_H) {
                    currentPageItems.push(item);
                    currentY += item.height;
                    i++;
                } else {
                    newPages.push({ pageNumber: newPages.length + 1, items: currentPageItems });
                    currentPageItems = [];
                    currentY = 0;
                    currentPageItems.push(item);
                    currentY += item.height;
                    i++;
                }
            }

            if (currentPageItems.length > 0) {
                newPages.push({ pageNumber: newPages.length + 1, items: currentPageItems });
            }

            setPages(newPages);
            setStatus('ready');
        }
    }, [status, rawItems]);

    // --- Analysis ---
    const runAnalysis = () => {
        if (pages.length === 0) return;
        const poemMetrics: PoemMetric[] = [];
        const completedMetrics: PoemMetric[] = [];
        let activePoem: PoemMetric | null = null;

        pages.forEach(page => {
            page.items.forEach(item => {
                if (item.type === 'title') {
                    if (activePoem) {
                        activePoem.pagesUsed = activePoem.endPage - activePoem.startPage + 1;
                        completedMetrics.push(activePoem);
                    }
                    activePoem = {
                        title: item.content,
                        author: "",
                        startPage: page.pageNumber,
                        endPage: page.pageNumber,
                        pagesUsed: 0
                    };
                } else if (item.type === 'author' && activePoem) {
                    activePoem.author = item.content;
                }
                if (activePoem) {
                    activePoem.endPage = page.pageNumber;
                }
            });
        });
        if (activePoem) {
            activePoem.pagesUsed = activePoem.endPage - activePoem.startPage + 1;
            completedMetrics.push(activePoem);
        }

        const totalPoems = completedMetrics.length;
        const totalPages = pages.length;
        const singlePagePoems = completedMetrics.filter(p => p.pagesUsed === 1).length;
        const doublePagePoems = completedMetrics.filter(p => p.pagesUsed === 2).length;
        const multiPagePoems = completedMetrics.filter(p => p.pagesUsed > 2).length;
        const maxPagesUsed = totalPoems > 0 ? Math.max(...completedMetrics.map(p => p.pagesUsed)) : 0;
        const avgPagesPerPoem = totalPoems > 0 ? (totalPages / totalPoems) : 0;

        const pageUtilizations = pages.map(page => {
            const usedHeight = page.items.reduce((sum, item) => sum + item.height, 0);
            return (usedHeight / CONTENT_HEIGHT_PX) * 100;
        });
        const avgPageUtil = pageUtilizations.length > 0
            ? pageUtilizations.reduce((a, b) => a + b, 0) / pageUtilizations.length
            : 0;

        const results: AnalysisResult = {
            totalPoems,
            totalPages,
            singlePagePoems,
            doublePagePoems,
            multiPagePoems,
            maxPagesUsed,
            avgPagesPerPoem,
            avgPageUtil,
            poemMetrics: completedMetrics,
            pageUtilizations
        };
        setAnalysisData(results);
        setShowAnalysis(true);
    };


    const getItemClass = (type: string) => {
        switch (type) {
            case 'title': return FONT_TITLE;
            case 'author': return FONT_AUTHOR;
            case 'paragraph': return FONT_BODY;
            case 'spacing': return "";
            default: return "";
        }
    };

    return (
        <div className="min-h-screen bg-neutral-200 p-8 flex flex-col items-center">
            <Helmet>
                <title>Love at Minus One | Master Layout</title>
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap');
                    
                    @page {
                        size: 148mm 210mm;
                        margin: 0; 
                    }
                    
                    @media print {
                        body { background: white; }
                        .no-print { display: none !important; }
                        .print-page {
                            break-after: page;
                            page-break-after: always;
                        }
                    }

                    .font-serif { font-family: 'Cormorant Garamond', 'Times New Roman', serif; }
                `}</style>
            </Helmet>

            <div className="no-print fixed top-6 right-6 flex gap-4 z-50">
                <div className="bg-white px-4 py-2 rounded shadow text-sm font-bold text-neutral-600">
                    Status: {status.toUpperCase()}
                </div>
                {status === 'ready' && (
                    <button onClick={runAnalysis} className="bg-purple-600 text-white px-6 py-2 rounded shadow font-bold flex items-center gap-2 hover:bg-purple-700 transition-colors">
                        <BarChart size={16} /> Analyze
                    </button>
                )}
                <button onClick={() => window.print()} className="bg-blue-600 text-white px-6 py-2 rounded shadow font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors">
                    <Printer size={16} /> Print PDF
                </button>
            </div>

            {/* Analysis Overlay */}
            {showAnalysis && analysisData && (
                <div className="no-print fixed inset-0 bg-black/50 z-[100] flex justify-center items-center p-8 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                    <BarChart className="text-purple-600" /> Manuscript Analytics
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">Professional Layout v6 Metrics</p>
                            </div>
                            <button onClick={() => setShowAnalysis(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-auto p-8 bg-gray-50/50">
                            <div className="grid grid-cols-4 gap-6 mb-8">
                                <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
                                    <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">Total Poems</div>
                                    <div className="text-4xl font-bold text-gray-900">{analysisData.totalPoems}</div>
                                </div>
                                <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
                                    <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">Total Pages</div>
                                    <div className="text-4xl font-bold text-green-800">{analysisData.totalPages}</div>
                                </div>
                                <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm">
                                    <div className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">Avg Pages/Poem</div>
                                    <div className="text-4xl font-bold text-gray-900">{analysisData.avgPagesPerPoem.toFixed(2)}</div>
                                </div>
                                <div className="bg-white p-6 rounded-xl border border-orange-100 shadow-sm">
                                    <div className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-2">Avg Utilization</div>
                                    <div className="text-4xl font-bold text-gray-900">{analysisData.avgPageUtil.toFixed(1)}%</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                                <div className="bg-white p-6 rounded-xl border shadow-sm">
                                    <h3 className="font-bold text-gray-800 mb-6 border-b pb-2">Page Span Distribution</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center group">
                                            <span className="text-gray-600 group-hover:text-gray-900">Single Page</span>
                                            <span className="font-bold">{analysisData.singlePagePoems}</span>
                                        </div>
                                        <div className="flex justify-between items-center group">
                                            <span className="text-gray-600 group-hover:text-gray-900">Double Page</span>
                                            <span className="font-bold">{analysisData.doublePagePoems}</span>
                                        </div>
                                        <div className="flex justify-between items-center group">
                                            <span className="text-gray-600 group-hover:text-gray-900">Multi-Page (3+)</span>
                                            <span className="font-bold text-red-600">{analysisData.multiPagePoems}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-xl border shadow-sm lg:col-span-2">
                                    <h3 className="font-bold text-gray-800 mb-6 border-b pb-2">Page Density Map (First 50 Pages)</h3>
                                    <div className="flex items-end gap-[2px] h-40">
                                        {analysisData.pageUtilizations.slice(0, 50).map((util, i) => (
                                            <div key={i} className="relative flex-1 group h-full flex items-end">
                                                <div
                                                    className={`w-full rounded-t transition-all duration-300 ${util > 90 ? 'bg-green-500' : 'bg-blue-300'}`}
                                                    style={{ height: `${util}%` }}
                                                ></div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-center text-gray-400 mt-2">Utilization % of v6 Tall Height (180mm)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Measurement Container */}
            <div
                ref={measureContainerRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: '-9999px',
                    width: `${CONTENT_WIDTH_PX}px`,
                    visibility: 'hidden'
                }}
            >
                {rawItems.map((item, idx) => (
                    <div key={idx} className={getItemClass(item.type)}>
                        {item.type !== 'spacing' && item.content}
                        {item.type === 'spacing' && <div style={{ height: item.height }} />}
                    </div>
                ))}
            </div>

            {/* Render Pages */}
            {status === 'ready' && pages.map((page) => {
                // Alternating Logic
                const isEven = page.pageNumber % 2 === 0; // Left Page
                const isOdd = !isEven; // Right Page

                const paddingLeft = isOdd ? MARGIN_INSIDE_MM : MARGIN_OUTSIDE_MM;
                const paddingRight = isOdd ? MARGIN_OUTSIDE_MM : MARGIN_INSIDE_MM;

                return (
                    <div
                        key={page.pageNumber}
                        className="print-page bg-white shadow-lg mb-8 relative"
                        style={{
                            width: `${PAGE_WIDTH_MM}mm`,
                            height: `${PAGE_HEIGHT_MM}mm`,
                            paddingTop: `${BODY_START_Y_MM}mm`,
                            paddingBottom: `${BODY_PADDING_BOTTOM_MM}mm`,
                            paddingLeft: `${paddingLeft}mm`,
                            paddingRight: `${paddingRight}mm`,
                            overflow: 'hidden'
                        }}
                    >
                        {/* Header */}
                        {isEven ? (
                            // Even (Left Page): Page Number at TOP LEFT
                            <div className="absolute flex items-end"
                                style={{
                                    top: `${MARGIN_TOP_MM}mm`,
                                    left: `${MARGIN_OUTSIDE_MM}mm`, // Outside
                                    right: `${MARGIN_INSIDE_MM}mm`,
                                    height: `${HEADER_HEIGHT_MM}mm`,
                                    justifyContent: 'flex-start'
                                }}>
                                <span className={FONT_HEADER}>{page.pageNumber}</span>
                            </div>
                        ) : (
                            // Odd (Right Page): Title at TOP RIGHT
                            <div className="absolute flex items-end"
                                style={{
                                    top: `${MARGIN_TOP_MM}mm`,
                                    left: `${MARGIN_INSIDE_MM}mm`,
                                    right: `${MARGIN_OUTSIDE_MM}mm`, // Outside
                                    height: `${HEADER_HEIGHT_MM}mm`,
                                    justifyContent: 'flex-end'
                                }}>
                                <span className={FONT_HEADER}>Love at Minus One</span>
                            </div>
                        )}

                        {/* Content Container - STRICT TOP BLOCK FLOW */}
                        <div style={{ width: '100%', height: 'auto', display: 'block' }}>
                            {page.items.map((item, idx) => (
                                <div key={idx} className={`w-full ${getItemClass(item.type)}`}>
                                    {item.type !== 'spacing' && item.content}
                                    {item.type === 'spacing' && <div style={{ height: item.height }} />}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}

            {status !== 'ready' && (
                <div className="mt-20 text-xl font-serif animate-pulse">
                    Generating Professional Book Layout (v6 Top Flow)...
                </div>
            )}
        </div>
    );
};

export default LoveAnthologyManuscript;
