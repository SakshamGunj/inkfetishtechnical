import React, { useState } from 'react';
import { Download, Search, AlertCircle, Award, CheckCircle2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { certificateData } from '../data/loveAtMinusOneCertificates';
import { motion, AnimatePresence } from 'framer-motion';

const LoveAtMinusOneCertificate = () => {
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [certificateUrl, setCertificateUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        const cleanedNumber = whatsappNumber.replace(/\D/g, '');
        if (cleanedNumber.length < 10) {
            setError("Please enter a valid 10-digit WhatsApp number.");
            setCertificateUrl(null);
            return;
        }

        setIsVerifying(true);
        setError(null);
        setCertificateUrl(null);

        // Simulate a slight network delay for better UX
        setTimeout(() => {
            const cert = certificateData.find(c => c.whatsapp === cleanedNumber || c.whatsapp.includes(cleanedNumber.slice(-10)));

            if (cert && cert.certificate_url) {
                setCertificateUrl(cert.certificate_url);
            } else {
                setError("No certificate found for this number. Please check the number and try again.");
            }
            setIsVerifying(false);
        }, 800);
    };

    const handleDownload = async () => {
        if (!certificateUrl) return;

        try {
            // Fetch the image to trigger an actual download instead of opening in a new tab
            const response = await fetch(certificateUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `Love_at_Minus_One_Certificate_${whatsappNumber}.png`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err) {
            console.error("Download failed, opening in new tab", err);
            // Fallback
            window.open(`${certificateUrl}?download=`, '_blank');
        }
    };

    const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap');
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-lato { font-family: 'Lato', sans-serif; }
    `;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 font-serif selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden relative flex flex-col items-center justify-center p-4 py-20">
            <Helmet>
                <title>Download Certificate | Love at Minus One</title>
                <style>{styles}</style>
            </Helmet>

            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] bg-red-900/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] bg-amber-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />

            <div className="container relative z-10 max-w-3xl mx-auto w-full">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.15)] mb-6">
                        <Award className="w-8 h-8 text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                    </div>

                    <h1 className="font-cinzel text-3xl md:text-5xl font-black text-white mb-4 leading-tight drop-shadow-lg">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600">
                            Download Your Certificate
                        </span>
                    </h1>
                    <p className="font-playfair text-lg md:text-xl text-slate-400 italic">
                        Love at Minus One Anthology
                    </p>
                </motion.div>

                {/* Verification Box */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />

                    <form onSubmit={handleVerify} className="max-w-md mx-auto space-y-6">
                        <div className="space-y-2 text-center mb-8">
                            <label htmlFor="whatsapp" className="font-lato text-sm font-bold tracking-widest uppercase text-slate-300">
                                Verify Your Identity
                            </label>
                            <p className="text-slate-500 text-xs font-lato">
                                Enter the 10-digit WhatsApp number you used during registration to access your official certificate of publication.
                            </p>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="text-slate-500 font-lato font-bold">+91</span>
                            </div>
                            <input
                                type="text"
                                id="whatsapp"
                                value={whatsappNumber}
                                onChange={(e) => setWhatsappNumber(e.target.value.replace(/[^0-9]/g, ''))}
                                placeholder="Enter 10 digit number"
                                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-4 pl-14 pr-4 text-white font-lato text-lg focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-slate-700"
                                maxLength={10}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isVerifying || whatsappNumber.length < 10}
                            className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-cinzel font-bold text-sm md:text-base tracking-[0.2em] uppercase rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            {isVerifying ? (
                                <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Search className="w-5 h-5 mb-0.5" />
                                    Find Certificate
                                </>
                            )}
                        </button>
                    </form>

                    {/* Error State */}
                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3 max-w-md mx-auto"
                            >
                                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                                <p className="text-red-200 text-sm font-lato leading-relaxed">{error}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Success / Certificate Display State */}
                    <AnimatePresence mode="wait">
                        {certificateUrl && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="mt-10 border-t border-white/10 pt-10"
                            >
                                <div className="text-center mb-6">
                                    <div className="inline-flex items-center justify-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest font-lato mb-4">
                                        <CheckCircle2 className="w-4 h-4" />
                                        Identity Verified
                                    </div>
                                    <h3 className="font-cinzel text-xl text-white">Your Certificate is Ready</h3>
                                </div>

                                <div className="relative group max-w-2xl mx-auto rounded-xl overflow-hidden shadow-2xl border-4 border-slate-800">
                                    {/* Preview Image */}
                                    <img
                                        src={certificateUrl}
                                        alt="Certificate Preview"
                                        className="w-full h-auto object-contain bg-slate-950"
                                    />
                                </div>

                                {/* Explicit Download Button */}
                                <div className="mt-8 text-center">
                                    <a
                                        href={`${certificateUrl}?download=`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download={`Love_at_Minus_One_Certificate_${whatsappNumber}.png`}
                                        className="inline-flex w-full md:w-auto px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-cinzel font-bold text-sm md:text-base tracking-[0.2em] uppercase rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:-translate-y-1 transition-all flex border border-amber-400/50 items-center justify-center gap-3"
                                    >
                                        <Download className="w-5 h-5 mb-0.5" />
                                        Download My Certificate
                                    </a>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default LoveAtMinusOneCertificate;
