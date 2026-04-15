import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';

interface ProtectedVaultRouteProps {
    children: React.ReactNode;
    day?: number;
}

const ProtectedVaultRoute: React.FC<ProtectedVaultRouteProps> = ({ children, day = 1 }) => {
    const [status, setStatus] = useState<'idle' | 'verifying' | 'granted' | 'denied'>('idle');
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            setStatus('verifying');

            // Minimal delay for visual feedback of security check
            await new Promise(resolve => setTimeout(resolve, 600));

            const checkDay = Number(day);
            const masterAccess = localStorage.getItem('writers_vault_access') === 'granted'; // Master Key
            const isDay1Unlocked = localStorage.getItem('vault_day1_unlocked') === 'true';
            const isDay2Unlocked = localStorage.getItem('vault_day2_unlocked') === 'true';
            const isDay3Unlocked = localStorage.getItem('vault_day3_unlocked') === 'true';

            let hasAccess = false;

            // If they have the Master Key (from the main gatekeeper), they get access to EVERYTHING.
            if (masterAccess) {
                hasAccess = true;
            } else if (checkDay === 3) {
                // To access Day 3, you MUST have day 3 unlocked
                hasAccess = isDay3Unlocked;
            } else if (checkDay === 2) {
                // To access Day 2, you MUST have day 2 unlocked
                hasAccess = isDay2Unlocked;
            } else {
                // To access Day 1, having any day unlocked is sufficient
                hasAccess = isDay1Unlocked || isDay2Unlocked || isDay3Unlocked;
            }

            if (hasAccess) {
                setStatus('granted');
            } else {
                setStatus('denied');
                // Redirect back to Writers Vault so they can unlock it
                setTimeout(() => navigate('/writers-vault'), 2500);
            }
        };

        verify();
    }, [day, navigate]);

    if (status === 'granted') return <>{children}</>;

    return (
        <div className="fixed inset-0 z-[100] bg-[#0c0502] flex items-center justify-center font-serif text-center">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-20 pointer-events-none" />

            <div className="relative z-10 px-6 max-w-md">
                <AnimatePresence mode="wait">
                    {status === 'verifying' && (
                        <motion.div key="v" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <Lock className="w-12 h-12 text-[#FFD700] mx-auto mb-4 animate-pulse" />
                            <h2 className="text-[#F5E6CC] text-xl font-[Cinzel] tracking-widest uppercase">Verifying Day {day} Access</h2>
                            <p className="text-[#8B7355] text-xs mt-2 italic">Scanning the archives...</p>
                        </motion.div>
                    )}

                    {status === 'denied' && (
                        <motion.div key="d" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                            <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                                <AlertCircle className="w-10 h-10 text-red-500" />
                            </div>
                            <h2 className="text-red-400 text-2xl font-[Cinzel] font-bold tracking-widest uppercase mb-2">Access Denied</h2>
                            <p className="text-[#8B7355] text-sm leading-relaxed">
                                You haven't unlocked the Day {day} treasures yet.<br />
                                <span className="italic">Returning you to the Vault Entrance...</span>
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ProtectedVaultRoute;
