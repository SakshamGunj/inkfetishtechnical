import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

const PortfolioOnboard = () => {
    const [formData, setFormData] = useState({
        name: '',
        pen_name: '',
        dob: '',
        email: '',
        phone: '',
        instagram: '',
        theme: '',
        writing_title: '',
        writing_content: '',
        writings: '',
        bio: '',
        other_details: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'under_review'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const status = localStorage.getItem('portfolio_submission_status');
        if (status === 'under_review') {
            setSubmissionStatus('under_review');
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMsg('');

        try {
            const { error } = await supabase
                .from('portfolio_authors')
                .insert([{
                    ...formData,
                    status: 'pending'
                }]);

            if (error) throw error;

            localStorage.setItem('portfolio_submission_status', 'under_review');
            setSubmissionStatus('under_review');
            window.scrollTo(0, 0);

        } catch (error: any) {
            console.error('Error submitting form:', error);
            setErrorMsg(error.message || 'Error occurred while submitting.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submissionStatus === 'under_review') {
        return (
            <div className="min-h-screen bg-[#FFFDF7] flex items-center justify-center p-6 font-mono selection:bg-[#FF4F00] selection:text-white">
                <div className="max-w-md w-full border-[3px] border-black bg-white p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-3 flex">
                        <div className="w-1/3 bg-[#FF4F00]" />
                        <div className="w-1/3 bg-[#00A3FF]" />
                        <div className="w-1/3 bg-[#FFC700]" />
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 mt-4">
                        Submission<br />Received
                    </h1>

                    <div className="bg-black text-white p-4 font-bold text-sm md:text-base uppercase tracking-widest mb-8 border-2 border-dashed border-white/50">
                        UNDER REVIEW
                    </div>

                    <p className="text-black font-semibold text-sm md:text-base leading-relaxed border-t-2 border-b-2 border-black py-6">
                        Your portfolio details have been sent to the Inkfetish Publications team. We are currently verifying your credentials.
                        <br /><br />
                        Please check back later or wait for our email.
                    </p>

                    <div className="mt-8 flex justify-center">
                        <div className="w-16 h-16 border-4 border-black border-t-[#FF4F00] rounded-full animate-spin" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFFDF7] font-mono selection:bg-[#FF4F00] selection:text-white pb-8">
            {/* Top Navigation / Banner */}
            <div className="w-full bg-black text-white py-2 px-4 text-center font-bold tracking-[0.2em] text-xs md:text-sm uppercase shadow-[0_4px_0_0_#FF4F00] mb-6 md:mb-10">
                INKFETISH PUBLICATIONS
            </div>

            <div className="max-w-4xl mx-auto px-4 md:px-8">
                <header className="mb-12 border-b-[4px] border-black pb-8 pt-0">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                        <div>
                            <p className="bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest inline-block mb-4 shadow-[4px_4px_0px_0px_#FF4F00]">AUTHOR PORTFOLIO SITE</p>
                            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mt-2">
                                AUTHOR PORTFOLIO SITE<br />ONBOARDING
                            </h1>
                        </div>
                        <div className="text-right flex flex-col items-end">
                            <div className="w-20 h-20 bg-black rotate-3 flex items-center justify-center shadow-[4px_4px_0px_0px_#00A3FF]">
                                <span className="text-[#39FF14] text-5xl font-black">★</span>
                            </div>
                            <p className="mt-4 font-bold text-sm uppercase">Get Published<br />In Style</p>
                        </div>
                    </div>
                </header>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {errorMsg && (
                        <div className="bg-[#FF4F00] text-white p-4 border-[3px] border-black font-bold uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            ERROR: {errorMsg}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column - Basic & Contact */}
                        <div className="space-y-8">
                            <div className="relative group">
                                <label className="block bg-black text-white px-3 py-1 text-sm font-bold uppercase mb-2 inline-block">Your Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-white border-[3px] border-black p-4 text-xl font-bold focus:outline-none focus:ring-0 focus:shadow-[8px_8px_0px_0px_#FFC700] transition-all"
                                    placeholder="JOHN DOE"
                                />
                            </div>

                            <div className="relative group">
                                <label className="block bg-black text-white px-3 py-1 text-sm font-bold uppercase mb-2 inline-block">Pen Name (Optional)</label>
                                <input
                                    type="text"
                                    name="pen_name"
                                    value={formData.pen_name}
                                    onChange={handleChange}
                                    className="w-full bg-white border-[3px] border-black p-4 text-xl font-bold focus:outline-none focus:ring-0 focus:shadow-[8px_8px_0px_0px_#00A3FF] transition-all"
                                    placeholder="J.D. SALINGER"
                                />
                            </div>

                            <div className="relative group">
                                <label className="block bg-black text-white px-3 py-1 text-sm font-bold uppercase mb-2 inline-block">Date of Birth *</label>
                                <input
                                    type="date"
                                    name="dob"
                                    required
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className="w-full bg-white border-[3px] border-black p-4 text-xl font-bold focus:outline-none focus:ring-0 focus:shadow-[8px_8px_0px_0px_#FF4F00] transition-all uppercase"
                                />
                            </div>

                            <div className="relative group">
                                <label className="block bg-black text-white px-3 py-1 text-sm font-bold uppercase mb-2 inline-block">Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-white border-[3px] border-black p-4 text-xl font-bold focus:outline-none focus:ring-0 focus:shadow-[8px_8px_0px_0px_#FFC700] transition-all"
                                    placeholder="AUTHOR@EXAMPLE.COM"
                                />
                            </div>

                            <div className="relative group">
                                <label className="block bg-black text-white px-3 py-1 text-sm font-bold uppercase mb-2 inline-block">Phone Number *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-white border-[3px] border-black p-4 text-xl font-bold focus:outline-none focus:ring-0 focus:shadow-[8px_8px_0px_0px_#00A3FF] transition-all"
                                    placeholder="+91 9876543210"
                                />
                            </div>

                            <div className="relative group">
                                <label className="block bg-black text-white px-3 py-1 text-sm font-bold uppercase mb-2 inline-block">Instagram Link</label>
                                <input
                                    type="url"
                                    name="instagram"
                                    value={formData.instagram}
                                    onChange={handleChange}
                                    className="w-full bg-white border-[3px] border-black p-4 text-xl font-bold focus:outline-none focus:ring-0 focus:shadow-[8px_8px_0px_0px_#FF4F00] transition-all"
                                    placeholder="https://instagram.com/yourhandle"
                                />
                            </div>
                        </div>

                        {/* Right Column - Writing details */}
                        <div className="space-y-8">

                            <div className="relative group">
                                <label className="block bg-black text-white px-3 py-1 text-sm font-bold uppercase mb-2 inline-block">Theme / Genre *</label>
                                <input
                                    type="text"
                                    name="theme"
                                    required
                                    value={formData.theme}
                                    onChange={handleChange}
                                    className="w-full bg-white border-[3px] border-black p-4 text-xl font-bold focus:outline-none focus:ring-0 focus:shadow-[8px_8px_0px_0px_#FFC700] transition-all"
                                    placeholder="e.g., ROMANCE, HORROR, POETRY"
                                />
                            </div>

                            <div className="relative group">
                                <label className="block bg-black text-white px-3 py-1 text-sm font-bold uppercase mb-2 inline-block">Featured Piece Title *</label>
                                <input
                                    type="text"
                                    name="writing_title"
                                    required
                                    value={formData.writing_title}
                                    onChange={handleChange}
                                    className="w-full bg-white border-[3px] border-black p-4 text-xl font-bold focus:outline-none focus:ring-0 focus:shadow-[8px_8px_0px_0px_#00A3FF] transition-all"
                                    placeholder="TITLE OF YOUR BEST WORK"
                                />
                            </div>

                            <div className="relative group">
                                <label className="block bg-black text-white px-3 py-1 text-sm font-bold uppercase mb-2 inline-block">Featured Writing Content *</label>
                                <textarea
                                    name="writing_content"
                                    required
                                    value={formData.writing_content}
                                    onChange={handleChange}
                                    className="w-full h-40 bg-white border-[3px] border-black p-4 text-base font-medium focus:outline-none focus:ring-0 focus:shadow-[8px_8px_0px_0px_#FF4F00] transition-all resize-y"
                                    placeholder="Paste your poem or short story excerpt here..."
                                />
                            </div>

                            <div className="relative group h-full">
                                <label className="block bg-black text-white px-3 py-1 text-sm font-bold uppercase mb-2 inline-block">Other Published Writings *</label>
                                <textarea
                                    name="writings"
                                    required
                                    value={formData.writings}
                                    onChange={handleChange}
                                    className="w-full h-32 bg-white border-[3px] border-black p-4 text-base font-medium focus:outline-none focus:ring-0 focus:shadow-[8px_8px_0px_0px_#FFC700] transition-all resize-none"
                                    placeholder="List your other published works, articles, books..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="relative group">
                        <label className="block bg-black text-white px-3 py-1 text-sm font-bold uppercase mb-2 inline-block">Your Bio / About You *</label>
                        <textarea
                            name="bio"
                            required
                            value={formData.bio}
                            onChange={handleChange}
                            className="w-full h-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNjY2MiLz48L3N2Zz4=')] bg-white border-[3px] border-black p-4 text-base font-semibold focus:outline-none focus:ring-0 focus:shadow-[8px_8px_0px_0px_#00A3FF] transition-all leading-relaxed resize-none"
                            placeholder="Tell the world your story..."
                        />
                    </div>

                    <div className="relative group flex flex-col md:flex-row gap-4">
                        <div className="flex-grow">
                            <label className="block bg-black text-white px-3 py-1 text-sm font-bold uppercase mb-2 inline-block">Other Details / Links</label>
                            <input
                                type="text"
                                name="other_details"
                                value={formData.other_details}
                                onChange={handleChange}
                                className="w-full bg-white border-[3px] border-black p-4 text-xl font-bold focus:outline-none focus:ring-0 focus:shadow-[8px_8px_0px_0px_#FFC700] transition-all"
                                placeholder="Any other links, achievements, details..."
                            />
                        </div>
                        <div className="md:w-64 flex-shrink-0 flex items-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#FF4F00] text-white border-[3px] border-black py-4 px-6 text-xl font-black uppercase tracking-widest hover:translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'SENDING...' : 'SUBMIT NOW'}
                            </button>
                        </div>
                    </div>
                </form>

                <footer className="mt-16 pt-8 border-t-[4px] border-black flex flex-col md:flex-row justify-between items-center text-sm font-bold uppercase">
                    <p>© {new Date().getFullYear()} Inkfetish Publications</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <div className="w-4 h-4 rounded-full bg-[#FF4F00] border-2 border-black" />
                        <div className="w-4 h-4 rounded-full bg-[#00A3FF] border-2 border-black" />
                        <div className="w-4 h-4 rounded-full bg-[#FFC700] border-2 border-black" />
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default PortfolioOnboard;
