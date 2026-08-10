'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { LogIn, Key, Mail, AlertTriangle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';

const LoginClient = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const router = useRouter();
    const { toast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Check approval status in Firestore author_portfolios
            const docRef = doc(db, 'author_portfolios', user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                // If status is explicitly pending or approved is false
                if (data.status === 'pending' || data.approved === false) {
                    await auth.signOut();
                    const pendingMsg = "ACCOUNT PENDING APPROVAL: Your author application is under review by our admin team. You can log in once approved.";
                    setError(pendingMsg);
                    toast({
                        title: "PENDING APPROVAL",
                        description: pendingMsg,
                        variant: 'destructive',
                    });
                    setIsLoading(false);
                    return;
                }
            }

            toast({
                title: "WELCOME BACK",
                description: "Good to see you again.",
            });
            // Redirect to dashboard (Next.js route)
            router.push('/authorsite/dashboard');
        } catch (err: any) {
            console.error(err);
            const msg = err.message || "Login failed.";
            setError(msg);
            toast({
                title: "LOGIN FAILED",
                description: msg,
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
                <Link href="/" className="text-xl md:text-3xl font-black tracking-tighter uppercase relative group">
                    <span className="relative z-10">INKFETISH</span>
                    <span className="absolute bottom-1 left-0 w-full h-3 md:h-4 bg-[#FFC700] -z-10 group-hover:h-full transition-all duration-300"></span>
                </Link>
            </div>

            <div className="w-full max-w-md bg-white border-[4px] border-black p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group hover:shadow-[12px_12px_0px_0px_#9D00FF] transition-all duration-300">

                {/* Decorative BG element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#39FF14] -z-0 -mr-16 -mt-16 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-black text-white flex items-center justify-center transform -rotate-3">
                            <LogIn size={24} />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
                            LOGIN
                        </h1>
                    </div>

                    <p className="text-gray-600 mb-8 font-bold text-sm md:text-base border-l-4 border-[#FF4F00] pl-3 uppercase">
                        Sign in to manage your books.
                    </p>

                    {error && (
                        <div className="bg-[#FF4F00] text-white p-3 mb-6 font-bold flex items-center gap-2 text-sm animate-pulse">
                            <AlertTriangle size={16} />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-black uppercase mb-2 flex items-center gap-2">
                                <Mail size={16} />
                                Your email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent border-b-2 border-black border-dashed p-2 font-mono text-lg focus:outline-none focus:border-solid focus:bg-[#39FF14]/10 transition-all font-bold"
                                placeholder="name@email.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-black uppercase mb-2 flex items-center gap-2">
                                <Key size={16} />
                                Your password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent border-b-2 border-black border-dashed p-2 font-mono text-lg focus:outline-none focus:border-solid focus:bg-[#39FF14]/10 transition-all font-bold"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-[#39FF14] border-[3px] border-black text-black py-4 font-black text-lg uppercase tracking-widest hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000] active:translate-y-0 active:shadow-none transition-all duration-200 flex justify-center items-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''} shadow-none`}
                        >
                            {isLoading ? 'WORKING...' : 'LOGIN'}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-black/10 text-center">
                        <p className="text-xs font-bold uppercase text-gray-500 mb-4">New writer?</p>
                        <Link href="/author/signup" className="text-sm font-black uppercase hover:text-[#9D00FF] transition-colors underline decoration-2 underline-offset-4">
                            Create Account →
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LoginClient;
