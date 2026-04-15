import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

const PortfolioOnboardAdmin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const [submissions, setSubmissions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'Thisisthestart@123') {
            setIsAuthenticated(true);
            fetchSubmissions();
        } else {
            setErrorMsg('INCORRECT PASSWORD ACCESS DENIED!');
            setPassword('');
            setTimeout(() => setErrorMsg(''), 3000);
        }
    };

    const fetchSubmissions = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('portfolio_authors')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setSubmissions(data || []);
        } catch (error: any) {
            console.error('Error fetching submissions:', error);
            alert('Failed to fetch data');
        } finally {
            setIsLoading(false);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const { error } = await supabase
                .from('portfolio_authors')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;

            // Update local state
            setSubmissions(submissions.map(sub =>
                sub.id === id ? { ...sub, status: newStatus } : sub
            ));
        } catch (error: any) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 font-mono">
                <div className="max-w-md w-full border-[4px] border-[#39FF14] bg-black p-8 shadow-[8px_8px_0px_0px_#39FF14] text-[#39FF14]">
                    <h1 className="text-3xl font-black uppercase tracking-widest mb-8 text-center border-b-2 border-[#39FF14] pb-4">
                        ADMIN TERMINAL
                    </h1>

                    {errorMsg && (
                        <div className="bg-[#FF003C] text-white p-3 font-bold uppercase mb-6 animate-pulse text-center">
                            {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block font-bold uppercase mb-2">» Enter Access Code_</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black border-2 border-[#39FF14] text-[#39FF14] p-3 text-xl focus:outline-none focus:ring-0 focus:shadow-[0_0_15px_#39FF14] transition-all font-mono placeholder:text-[#39FF14]/30"
                                placeholder="********"
                                autoFocus
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#39FF14] text-black font-black py-3 uppercase tracking-widest hover:bg-white hover:shadow-[0_0_20px_#39FF14] transition-all"
                        >
                            INITIALIZE &gt;&gt;
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFFDF7] p-4 md:p-8 font-mono selection:bg-[#00A3FF] selection:text-white">
            <div className="max-w-7xl mx-auto">

                <header className="mb-8 border-[4px] border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col md:flex-row justify-between items-center gap-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFC700] rounded-bl-full border-b-[4px] border-l-[4px] border-black" />

                    <div className="relative z-10 flex items-center gap-4">
                        <div className="w-16 h-16 bg-black flex items-center justify-center">
                            <span className="text-[#39FF14] font-black text-2xl">⚡</span>
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">PORTFOLIO HQ</h1>
                            <p className="font-bold uppercase tracking-widest text-[#00A3FF]">Admin Dashboard v1.0</p>
                        </div>
                    </div>

                    <div className="relative z-10 flex gap-4">
                        <button
                            onClick={fetchSubmissions}
                            className="border-2 border-black bg-white px-4 py-2 font-bold uppercase hover:bg-black hover:text-white transition-colors flex items-center gap-2"
                        >
                            {isLoading ? 'SYNCING...' : 'REFRESH DATA'}
                        </button>
                        <button
                            onClick={() => setIsAuthenticated(false)}
                            className="border-2 border-black bg-[#FF4F00] text-white px-4 py-2 font-bold uppercase hover:bg-black hover:text-[#FF4F00] transition-colors"
                        >
                            LOGOUT
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {submissions.map((sub, idx) => (
                            <motion.div
                                key={sub.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className={`border-[3px] border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative flex flex-col 
                  ${sub.status === 'approved' ? 'bg-green-50' : ''}
                  ${sub.status === 'rejected' ? 'bg-red-50' : ''}
                `}
                            >
                                {/* Status Ribbon */}
                                <div className={`absolute -right-[3px] -top-[3px] border-[3px] border-black px-3 py-1 font-bold text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                  ${sub.status === 'approved' ? 'bg-[#39FF14] text-black' : ''}
                  ${sub.status === 'rejected' ? 'bg-[#FF003C] text-white' : ''}
                  ${sub.status === 'pending' || !sub.status ? 'bg-[#FFC700] text-black' : ''}
                `}>
                                    {sub.status || 'pending'}
                                </div>

                                <div className="mb-6 mt-4">
                                    <h2 className="font-black text-2xl uppercase break-words">{sub.name}</h2>
                                    {sub.pen_name && (
                                        <p className="text-sm font-bold text-gray-500 uppercase">A.K.A {sub.pen_name}</p>
                                    )}
                                    <p className="text-xs font-bold mt-1 bg-black text-white inline-block px-2 py-0.5">
                                        DOB: {sub.dob}
                                    </p>
                                    {sub.email && (
                                        <p className="text-xs font-bold mt-1 bg-black text-white inline-block px-2 py-0.5 ml-1">
                                            {sub.email}
                                        </p>
                                    )}
                                    {sub.phone && (
                                        <p className="text-xs font-bold mt-1 bg-black text-white inline-block px-2 py-0.5 ml-1">
                                            {sub.phone}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-4 flex-grow text-sm border-t-2 border-black pt-4">
                                    {sub.theme && (
                                        <div>
                                            <span className="font-bold uppercase text-xs bg-gray-200 px-1">Theme / Genre</span>
                                            <p className="mt-1 font-medium">{sub.theme}</p>
                                        </div>
                                    )}
                                    {sub.instagram && (
                                        <div>
                                            <span className="font-bold uppercase text-xs bg-gray-200 px-1">Instagram</span>
                                            <p className="mt-1 font-medium break-words text-blue-600 underline">
                                                <a href={sub.instagram} target="_blank" rel="noopener noreferrer">{sub.instagram}</a>
                                            </p>
                                        </div>
                                    )}
                                    {sub.writing_title && (
                                        <div>
                                            <span className="font-bold uppercase text-xs bg-gray-200 px-1">Piece: {sub.writing_title}</span>
                                            <p className="mt-1 font-medium whitespace-pre-wrap max-h-32 overflow-y-auto border border-dashed border-gray-400 p-2">{sub.writing_content}</p>
                                        </div>
                                    )}
                                    <div>
                                        <span className="font-bold uppercase text-xs bg-gray-200 px-1">Other Publications</span>
                                        <p className="mt-1 font-medium whitespace-pre-wrap">{sub.writings}</p>
                                    </div>
                                    <div>
                                        <span className="font-bold uppercase text-xs bg-gray-200 px-1">Bio</span>
                                        <p className="mt-1 font-medium whitespace-pre-wrap line-clamp-3 hover:line-clamp-none transition-all cursor-pointer">{sub.bio}</p>
                                    </div>
                                    {sub.other_details && (
                                        <div>
                                            <span className="font-bold uppercase text-xs bg-gray-200 px-1">Other Details</span>
                                            <p className="mt-1 font-medium break-words">{sub.other_details}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 pt-4 border-t-2 border-black flex gap-3">
                                    <button
                                        onClick={() => updateStatus(sub.id, 'approved')}
                                        disabled={sub.status === 'approved'}
                                        className="flex-1 border-2 border-black bg-[#39FF14] font-bold uppercase py-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        APPROVE
                                    </button>
                                    <button
                                        onClick={() => updateStatus(sub.id, 'rejected')}
                                        disabled={sub.status === 'rejected'}
                                        className="flex-1 border-2 border-black bg-[#FF003C] text-white font-bold uppercase py-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        REJECT
                                    </button>
                                </div>
                            </motion.div>
                        ))}

                        {submissions.length === 0 && !isLoading && (
                            <div className="col-span-full py-12 text-center border-[3px] border-black border-dashed">
                                <h3 className="text-2xl font-black uppercase tracking-widest text-gray-400">NO SUBMISSIONS FOUND</h3>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
};

export default PortfolioOnboardAdmin;
