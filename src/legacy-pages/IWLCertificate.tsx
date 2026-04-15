import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Smartphone, Download, CheckCircle, Search, FileImage } from 'lucide-react';
import certificatesData from '../data/iwl_certificates.json';

// Cast the imported JSON to an object with string values
const certificates: Record<string, { name: string, url: string }> = certificatesData;

const IWLCertificate = () => {
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState<'idle' | 'searching' | 'found' | 'not_found'>('idle');
    const [certUrl, setCertUrl] = useState<string | null>(null);
    const [authorName, setAuthorName] = useState<string | null>(null);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        const cleanPhone = phone.replace(/\D/g, '');
        if (cleanPhone.length !== 10) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        setStatus('searching');

        setTimeout(() => {
            const data = certificates[cleanPhone];
            if (data && data.url) {
                setCertUrl(data.url);
                setAuthorName(data.name);
                setStatus('found');
            } else {
                setStatus('not_found');
            }
        }, 800); // Simulate subtle loading
    };

    const handleDownload = () => {
        if (!certUrl) return;
        setIsDownloading(true);

        // Open directly in a new tab which triggers native browser handling instantly
        window.open(certUrl, '_blank');

        setTimeout(() => {
            setIsDownloading(false);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-[#F0EBE0] font-sans selection:bg-[#420C0C] selection:text-[#FFD700]">
            <Helmet>
                <title>Download Certificate | Indian Writers League</title>
                <meta name="description" content="Download your Indian Writers League Certificate" />
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
                `}</style>
            </Helmet>

            <div className="pt-20 pb-12 text-center px-4">
                <div className="inline-block mb-4 px-4 py-1 rounded-full border border-[#420C0C]/30 bg-white/50 backdrop-blur-md text-[#420C0C] font-[Cinzel] text-[10px] md:text-sm uppercase tracking-widest">
                    Season 1: The Beginning
                </div>
                <h1 className="text-4xl md:text-6xl font-[Cinzel] text-[#420C0C] mb-4">INDIAN WRITERS LEAGUE</h1>
                <p className="text-[#5D4037] font-serif text-lg md:text-2xl mt-2 max-w-2xl mx-auto">
                    Download Your Participant Certificate
                </p>
            </div>

            <div className="max-w-xl mx-auto px-4 pb-32">
                <div className="bg-white rounded-2xl shadow-xl border border-[#D7CCC8] p-6 md:p-10">
                    <form onSubmit={handleSearch} className="mb-8">
                        <label className="block text-[#420C0C] font-bold mb-3 flex items-center gap-2">
                            <Smartphone className="w-5 h-5" /> Enter your WhatsApp Number
                        </label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-[#D7CCC8] pr-3">
                                <span className="text-[#4E342E] font-bold">+91</span>
                            </div>
                            <input
                                type="tel"
                                maxLength={10}
                                value={phone}
                                onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                                className="w-full bg-[#F5F5F5] border border-[#D7CCC8] p-4 pl-20 rounded-xl focus:border-[#420C0C] focus:ring-2 focus:ring-[#420C0C]/20 outline-none font-serif text-xl tracking-widest text-[#2A0A0A] placeholder:text-[#A1887F] transition-all"
                                placeholder="9999999999"
                                disabled={status === 'searching'}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={phone.length !== 10 || status === 'searching'}
                            className="w-full mt-6 py-4 bg-[#420C0C] text-[#FFD700] font-bold rounded-xl hover:bg-[#2A0A0A] shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                        >
                            {status === 'searching' ? (
                                <div className="w-6 h-6 border-2 border-[#FFD700] border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <><Search className="w-5 h-5" /> Find My Certificate</>
                            )}
                        </button>
                    </form>

                    <AnimatePresence mode="wait">
                        {status === 'not_found' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl text-center font-serif"
                            >
                                No certificate found for this number. Check if the number is correct or contact support if you believe this is an error.
                            </motion.div>
                        )}

                        {status === 'found' && certUrl && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="border-t border-[#D7CCC8] pt-8"
                            >
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-[Cinzel] text-[#420C0C]">Certificate Found!</h3>
                                    <p className="text-[#5D4037] font-serif mt-1">Hello, <span className="font-bold">{authorName}</span></p>
                                </div>

                                <div className="bg-[#1A0505] p-2 rounded-xl shadow-2xl relative group overflow-hidden mb-6">
                                    <img
                                        src={certUrl}
                                        alt="IWL Certificate"
                                        className="w-full h-auto rounded-lg"
                                        onContextMenu={(e) => e.preventDefault()}
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                        <FileImage className="w-12 h-12 text-[#FFD700]" />
                                    </div>
                                </div>

                                <button
                                    onClick={handleDownload}
                                    disabled={isDownloading}
                                    className="w-full py-4 bg-[#FFD700] text-[#2A0A0A] font-bold rounded-xl hover:bg-[#FFE55C] shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] disabled:opacity-75 disabled:hover:scale-100 text-lg"
                                >
                                    {isDownloading ? (
                                        <><div className="w-5 h-5 border-2 border-[#2A0A0A] border-t-transparent rounded-full animate-spin" /> Preparing Download...</>
                                    ) : (
                                        <><Download className="w-6 h-6" /> Download Certificate HQ</>
                                    )}
                                </button>

                                <p className="text-center text-xs text-[#8D6E63] mt-4 font-serif">
                                    If download fails, right-click (or long-press) the image and select "Save Image As...".
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Footer */}
            <div className="pb-12 text-center text-[#8D6E63] text-sm opacity-80 font-serif">
                Organized by Inkfetish | 199K+ Writers Community
            </div>
        </div>
    );
};

export default IWLCertificate;
