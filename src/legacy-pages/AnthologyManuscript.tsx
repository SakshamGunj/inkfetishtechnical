import { useEffect, useState } from "react";
import { Printer, BookOpen } from "lucide-react";
import { saveAs } from "file-saver";
// @ts-ignore
import { asBlob } from "html-docx-js-typescript";
import submissionsData from "../data/anthology_submissions.json";

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

const AnthologyManuscript = () => {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        // Transform the imported JSON to match our state type if needed, 
        // though it should match directly based on our script.
        setSubmissions(submissionsData as Submission[]);
        setLoading(false);
    }, []);

    const handlePrint = () => {
        window.print();
    };

    const downloadDoc = () => {
        const header = `<!DOCTYPE html>
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
            <meta charset='utf-8'>
            <title>Anthology Manuscript</title>
        </head><body>`;
        const footer = "</body></html>";
        const content = document.getElementById("manuscript-content")?.innerHTML;

        if (content) {
            const htmlString = header + content + footer;
            asBlob(htmlString).then((blob: Blob) => {
                saveAs(blob, "anthology_manuscript.docx");
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-xl text-gray-600">Loading manuscript...</div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen text-black font-serif p-8 md:p-16 print:p-0">
            {/* Control Bar - Hidden when printing */}
            <div className="fixed top-4 right-4 print:hidden z-50 flex gap-2">
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors shadow-lg"
                >
                    <Printer className="w-4 h-4" />
                    Download PDF
                </button>
                <button
                    onClick={downloadDoc}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                >
                    <BookOpen className="w-4 h-4" />
                    Download Word (.docx)
                </button>
            </div>

            <div id="manuscript-content" className="max-w-4xl mx-auto space-y-16 print:space-y-0">
                {/* Title Page */}
                <div className="min-h-[90vh] flex flex-col items-center justify-center text-center page-break-after">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 uppercase tracking-widest">
                        Love at -1°C
                    </h1>
                    <div className="w-24 h-1 bg-black mb-8"></div>
                    <p className="text-xl italic text-gray-600">Manuscript Draft</p>
                    <p className="mt-4 text-sm text-gray-400">
                        Generated on {new Date().toLocaleDateString()}
                    </p>
                </div>

                {/* Content */}
                {submissions.map((sub, index) => {
                    const authorName = sub.is_pen_name ? sub.book_name : sub.real_name;

                    return (
                        <div key={sub.id} className="print:break-inside-avoid page-break-after mb-24">
                            {/* Author Header */}
                            <div className="mb-8 text-center border-b border-gray-200 pb-4 mx-12">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-800 uppercase tracking-widest">{authorName}</h3>
                            </div>

                            {/* Poem 1 */}
                            <div className="mb-12">
                                <div className="mb-6 text-center">
                                    <h2 className="text-3xl font-serif font-medium italic mb-2">{sub.poem1_title}</h2>
                                </div>
                                <div className="whitespace-pre-wrap leading-relaxed text-lg text-justify px-4 md:px-12">
                                    {sub.poem1_content}
                                </div>
                            </div>

                            {/* Poem 2 (if exists) */}
                            {sub.poem2_title && sub.poem2_content && (
                                <div className="mt-12 pt-8 border-t-2 border-black/5 print:border-0 print:pt-4">
                                    <div className="mb-6 text-center">
                                        <h2 className="text-3xl font-serif font-medium italic mb-2">{sub.poem2_title}</h2>
                                    </div>
                                    <div className="whitespace-pre-wrap leading-relaxed text-lg text-justify px-4 md:px-12">
                                        {sub.poem2_content}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}

                {submissions.length === 0 && !errorMsg && (
                    <div className="text-center text-gray-500 py-20">
                        No submissions found.
                    </div>
                )}

                {errorMsg && (
                    <div className="text-center text-red-500 py-20 border border-red-200 bg-red-50 rounded-lg p-8">
                        <h3 className="font-bold text-xl mb-2">Error Loading Submissions</h3>
                        <p>{errorMsg}</p>
                        <p className="text-sm mt-4 text-gray-600">Please check your database connection/RLS policies.</p>
                    </div>
                )}
            </div>

            <style>{`
        @media print {
          @page {
            margin: 2cm;
          }
          .page-break-after {
            page-break-after: always;
          }
          .page-break-before {
            page-break-before: always;
          }
          body {
            background: white;
            color: black;
          }
        }
      `}</style>
        </div>
    );
};

export default AnthologyManuscript;
