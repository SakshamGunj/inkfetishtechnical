import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { LogIn, Key, Mail, AlertTriangle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const AuthorLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { toast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast({
                title: "ACCESS GRANTED",
                description: "Welcome back to the Authorverse.",
                variant: 'default',
            });
            // Redirect to dashboard (this routing will be setup in main.tsx)
            navigate('/authorsite/dashboard');
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to authenticate.");
            toast({
                title: "ACCESS DENIED",
                description: error,
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FFFDF7] text-black font-sans selection:bg-[#39FF14] selection:text-black flex flex-col justify-center items-center px-4 py-8 md:p-4">

            {/* Top Navigation Bar / Branding */}
            <div className="absolute top-0 left-0 w-full p-4 md:p-8 flex justify-between items-center z-10">
                <Link to="/" className="text-xl md:text-3xl font-black tracking-tighter uppercase relative group">
                    <span className="relative z-10">INKFETISH</span>
                    <span className="absolute bottom-1 left-0 w-full h-3 md:h-4 bg-[#FFC700] -z-10 group-hover:h-full transition-all duration-300"></span>
                </Link>
            </div>

            <div className="w-full max-w-md bg-white border-[4px] border-black p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group hover:shadow-[12px_12px_0px_0px_#9D00FF] transition-shadow duration-300">

                {/* Decorative BG element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#39FF14] -z-0 -mr-16 -mt-16 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-black text-white flex items-center justify-center transform -rotate-3">
                            <LogIn size={24} />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
                            UPLINK
                        </h1>
                    </div>

                    <p className="text-gray-600 mb-8 font-bold text-sm md:text-base border-l-4 border-[#FF4F00] pl-3 uppercase">
                        Access your Authorportfolio site Center.
                    </p>

                    {error && (
                        <div className="bg-[#FF4F00] text-white p-3 mb-6 font-bold flex items-center gap-2 text-sm">
                            <AlertTriangle size={16} />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-black uppercase mb-2 flex items-center gap-2">
                                <Mail size={16} />
                                Operative Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent border-b-2 border-black border-dashed p-2 font-mono text-lg focus:outline-none focus:border-solid focus:bg-[#39FF14]/10 transition-colors"
                                placeholder="name@inkfetish.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-black uppercase mb-2 flex items-center gap-2">
                                <Key size={16} />
                                Secure Passcode
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent border-b-2 border-black border-dashed p-2 font-mono text-lg focus:outline-none focus:border-solid focus:bg-[#39FF14]/10 transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-[#39FF14] border-[3px] border-black text-black py-4 font-black text-lg uppercase tracking-widest hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000] active:translate-y-0 active:shadow-none transition-all duration-200 flex justify-center items-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'ESTABLISHING LINK...' : 'INITIATE LOGIN >'}
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default AuthorLogin;
