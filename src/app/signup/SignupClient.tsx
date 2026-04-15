'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { UserPlus, Key, Mail, User, AlertTriangle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';

const SignupClient = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const router = useRouter();
    const { toast } = useToast();

    const formatUsername = (val: string) => {
        return val.toLowerCase().replace(/[^a-z0-9_]/g, '');
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (username.length < 3) {
            const msg = "Username must be at least 3 characters long.";
            setError(msg);
            setIsLoading(false);
            toast({ title: "TOO SHORT", description: msg, variant: 'destructive' });
            return;
        }

        try {
            // 1. Create the Auth User
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. Initialize their Portfolio Document in Firestore
            await setDoc(doc(db, 'author_portfolios', user.uid), {
                uid: user.uid,
                email: user.email,
                username: username,
                name: "NEW WRITER",
                pen_name: "",
                bio: "Tell us about yourself...",
                theme: "MODERN",
                books: [],
                experiences: [],
                awards: [],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            });

            toast({
                title: "WELCOME ABOARD",
                description: "Your account is ready.",
            });

            // Redirect to dashboard
            router.push('/authorsite/dashboard');

        } catch (err: any) {
            console.error(err);
            const msg = err.message || "Something went wrong.";
            setError(msg);
            toast({
                title: "STARTUP FAILED",
                description: msg,
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FFFDF7] text-black font-sans selection:bg-[#FFC700] selection:text-black flex flex-col justify-center items-center px-4 py-8 md:p-4">

            <div className="absolute top-0 left-0 w-full p-4 md:p-8 flex justify-between items-center z-10">
                <Link href="/" className="text-xl md:text-3xl font-black tracking-tighter uppercase relative group">
                    <span className="relative z-10">INKFETISH</span>
                    <span className="absolute bottom-1 left-0 w-full h-3 md:h-4 bg-[#00A3FF] -z-10 group-hover:h-full transition-all duration-300"></span>
                </Link>
            </div>

            <div className="w-full max-w-md bg-white border-[4px] border-black p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group hover:shadow-[12px_12px_0px_0px_#00A3FF] transition-all duration-300">

                {/* Decorative BG element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00A3FF] -z-0 -mr-16 -mt-16 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-black text-white flex items-center justify-center transform rotate-3">
                            <UserPlus size={24} />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                            CREATE ACCOUNT
                        </h1>
                    </div>

                    <p className="text-gray-600 mb-8 font-bold text-sm md:text-base border-l-4 border-black pl-3 uppercase">
                        Join our community of writers.
                    </p>

                    {error && (
                        <div className="bg-red-500 text-white p-3 mb-6 font-bold flex items-center gap-2 text-sm">
                            <AlertTriangle size={16} />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSignup} className="space-y-5">

                        <div>
                            <label className="block text-sm font-black uppercase mb-2 flex items-center gap-2">
                                <User size={16} />
                                Choose your username
                            </label>
                            <div className="relative flex flex-col sm:flex-row items-start sm:items-center border-b-2 border-black border-dashed sm:focus-within:border-solid transition-colors">
                                <span className="text-gray-400 font-mono font-bold text-xs sm:text-base sm:pl-2 pt-2 sm:pt-0">inkfetish.com/author/</span>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(formatUsername(e.target.value))}
                                    className="w-full bg-transparent py-2 sm:p-2 font-mono text-base sm:text-lg focus:outline-none focus:bg-[#00A3FF]/10 font-bold"
                                    placeholder="johndoe"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-black uppercase mb-2 flex items-center gap-2 pt-2">
                                <Mail size={16} />
                                Your email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent border-b-2 border-black border-dashed p-2 font-mono text-lg focus:outline-none focus:border-solid focus:bg-[#00A3FF]/10 transition-colors font-bold"
                                placeholder="name@email.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-black uppercase mb-2 flex items-center gap-2 pt-2">
                                <Key size={16} />
                                Choose a password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent border-b-2 border-black border-dashed p-2 font-mono text-lg focus:outline-none focus:border-solid focus:bg-[#00A3FF]/10 transition-colors font-bold"
                                placeholder="••••••••"
                                minLength={6}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-black text-white mt-4 border-[3px] border-black py-4 font-black text-lg uppercase tracking-widest hover:bg-[#00A3FF] hover:text-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000] active:translate-y-0 active:shadow-none transition-all duration-200 flex justify-center items-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''} shadow-none`}
                        >
                            {isLoading ? 'STARTING...' : 'JOIN NOW'}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t-[3px] border-black border-dashed text-center">
                        <p className="font-bold text-sm text-gray-600 uppercase">
                            Already have an account?
                        </p>
                        <Link href="/login" className="inline-block mt-2 font-black text-lg hover:text-[#00A3FF] hover:underline decoration-4 underline-offset-4 transition-colors uppercase">
                            LOGIN HERE
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupClient;
