import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
    Feather, BookOpen, Book, ChevronRight, Check, Star,
    Smartphone, Mail, User, Trophy, Medal, Scroll, Lock
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

// --- Types ---
type Category = 'poetry' | 'short_story' | 'novel';
type Plan = 299 | 499;

interface FormData {
    name: string;
    email: string;
    whatsapp: string;
    category: Category | '';
    plan: Plan | null;
    submission1: { title: string; content: string };
    submission2: { title: string; content: string };
    orderId?: string;
}

// --- Steps Components ---

const StepRegistrationAndPlan = ({ formData, setFormData, onPayment, showPlans, setShowPlans }: { formData: FormData, setFormData: React.Dispatch<React.SetStateAction<FormData>>, onPayment: () => void, showPlans: boolean, setShowPlans: (b: boolean) => void }) => {

    const togglePlans = () => {
        if (formData.name && formData.email && formData.whatsapp.length === 10) {
            setShowPlans(true);
            setTimeout(() => {
                document.getElementById('plan-section')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            alert("Please fill all details correctly.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
            <h3 className="text-3xl text-center font-serif text-[#E0C097] mb-8 drop-shadow-md">Your Details</h3>

            <div className={`space-y-6 bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-[#D7CCC8] transition-all duration-500 ${showPlans ? 'opacity-80' : 'opacity-100'}`}>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-[#420C0C] font-bold mb-2 flex items-center gap-2"><User className="w-4 h-4" /> Full Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-white border border-[#D7CCC8] p-4 rounded-lg focus:border-[#420C0C] focus:ring-1 focus:ring-[#420C0C] outline-none font-serif text-lg text-[#2A0A0A] placeholder:text-[#A1887F]"
                            placeholder="Enter your pen name"
                            disabled={showPlans}
                        />
                    </div>
                    <div>
                        <label className="block text-[#420C0C] font-bold mb-2 flex items-center gap-2"><Mail className="w-4 h-4" /> Email Address</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-white border border-[#D7CCC8] p-4 rounded-lg focus:border-[#420C0C] focus:ring-1 focus:ring-[#420C0C] outline-none font-serif text-lg text-[#2A0A0A] placeholder:text-[#A1887F]"
                            placeholder="For official communication"
                            disabled={showPlans}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-[#420C0C] font-bold mb-2 flex items-center gap-2"><Smartphone className="w-4 h-4" /> WhatsApp Number</label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-[#D7CCC8] pr-3">
                                <img src="https://flagcdn.com/w20/in.png" alt="India" className="w-5" />
                                <span className="text-[#4E342E] font-bold">+91</span>
                            </div>
                            <input
                                type="tel"
                                maxLength={10}
                                value={formData.whatsapp}
                                onChange={e => setFormData({ ...formData, whatsapp: e.target.value.replace(/\D/g, '') })}
                                className="w-full bg-white border border-[#D7CCC8] p-4 pl-28 rounded-lg focus:border-[#420C0C] focus:ring-1 focus:ring-[#420C0C] outline-none font-serif text-lg tracking-widest text-[#2A0A0A] placeholder:text-[#A1887F]"
                                placeholder="9999999999"
                                disabled={showPlans}
                            />
                        </div>
                    </div>
                </div>

                {!showPlans && (
                    <div className="mt-8">
                        <button
                            onClick={togglePlans}
                            className="w-full py-4 bg-[#FFD700] text-[#2A0A0A] font-bold rounded-lg hover:bg-[#FFE55C] shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
                        >
                            Select Plan <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>

            {/* Plan Selection Section - Revelas Below */}
            <AnimatePresence>
                {showPlans && (
                    <motion.div
                        id="plan-section"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mt-12"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl md:text-3xl font-serif text-[#E0C097] drop-shadow-md">Select What You Have Paid</h3>
                            <button onClick={() => setShowPlans(false)} className="text-[#E0C097] underline text-sm hover:text-[#FFD700]">Edit Details</button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {/* Standard Plan */}
                            <div
                                className={`bg-white border text-center ${formData.plan === 299 ? 'border-[#420C0C] ring-4 ring-[#420C0C]/10 shadow-2xl scale-105' : 'border-[#D7CCC8] shadow-md opacity-80 hover:opacity-100'} rounded-xl p-6 relative overflow-hidden cursor-pointer transition-all duration-300`}
                                onClick={() => setFormData({ ...formData, plan: 299 })}
                            >
                                <div className="mb-4">
                                    <h4 className="text-lg font-bold text-[#5D4037] uppercase tracking-wider mb-1">Single Entry Plan</h4>
                                    <div className="text-4xl font-serif text-[#420C0C]">₹299</div>
                                </div>
                                <ul className="space-y-3 mb-6 text-[#5D4037] text-sm text-left px-2">
                                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" /> <span>Submit 1 writing</span></li>
                                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                                        <span>Already Paid via Scanner/UPI</span>
                                    </li>
                                </ul>
                                <div className={`w-6 h-6 rounded-full border border-[#5D4037] mx-auto flex items-center justify-center ${formData.plan === 299 ? 'bg-[#420C0C] border-transparent' : ''}`}>
                                    {formData.plan === 299 && <Check className="w-4 h-4 text-white" />}
                                </div>
                            </div>

                            {/* Premium Plan */}
                            <div
                                className={`bg-[#2A0A0A] border text-center ${formData.plan === 499 ? 'border-[#FFD700] ring-4 ring-[#FFD700]/20 shadow-2xl scale-105' : 'border-[#420C0C] shadow-lg opacity-90 hover:opacity-100'} rounded-xl p-6 relative overflow-hidden cursor-pointer transition-all duration-300`}
                                onClick={() => setFormData({ ...formData, plan: 499 })}
                            >
                                <div className="absolute top-0 right-0 bg-[#FFD700] text-[#2A0A0A] text-[10px] font-bold px-3 py-1 uppercase tracking-widest">Best Value ⭐</div>
                                <div className="mb-4">
                                    <h4 className="text-lg font-bold text-[#FFD700] uppercase tracking-wider mb-1">Premium Plan</h4>
                                    <div className="text-4xl font-serif text-white">₹499</div>
                                </div>
                                <ul className="space-y-3 mb-6 text-[#E5D4B3] text-sm text-left px-2">
                                    <li className="flex items-start gap-2"><Star className="w-4 h-4 text-[#FFD700] mt-1 flex-shrink-0" /> <span>Submit 2 writings</span></li>
                                    <li className="flex items-start gap-2"><Star className="w-4 h-4 text-[#FFD700] mt-1 flex-shrink-0" /> <span>Already Paid via Scanner/UPI</span></li>
                                </ul>
                                <div className={`w-6 h-6 rounded-full border border-[#FFD700] mx-auto flex items-center justify-center ${formData.plan === 499 ? 'bg-[#FFD700] border-transparent' : ''}`}>
                                    {formData.plan === 499 && <Check className="w-4 h-4 text-[#2A0A0A]" />}
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 max-w-md mx-auto">
                            <button
                                onClick={() => formData.plan ? onPayment() : alert("Please select a plan")}
                                className="w-full py-4 bg-[#FFD700] text-[#2A0A0A] font-bold rounded-lg hover:bg-[#FFE55C] shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
                            >
                                Confirm Registration <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Step4Dashboard = ({ formData, setStep, setSubmissionType, setSubmitStatus }: { formData: FormData, setStep: (s: number) => void, setSubmissionType: (type: 1 | 2) => void, setSubmitStatus: (s: 'idle' | 'submitting' | 'success' | 'error') => void }) => (
    <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-serif text-[#420C0C] mb-4">Participant Dashboard</h3>
            <p className="text-[#5D4037] text-lg">Welcome, <strong>{formData.name}</strong></p>
            <div className="inline-flex items-center gap-2 mt-2 px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-bold">
                <Check className="w-4 h-4" /> Registration Active
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Entry 1 Card */}
            <div className="bg-white border-2 border-[#D7CCC8] rounded-xl p-8 shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold text-[#5D4037]">Entry #1</h4>
                    {formData.submission1.title ? (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">SUBMITTED</span>
                    ) : (
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded font-bold">PENDING</span>
                    )}
                </div>
                <p className="text-[#8D6E63] text-sm mb-6">Standard submission included in your plan.</p>
                <button
                    onClick={() => {
                        setSubmissionType(1);
                        setSubmitStatus('idle');
                        setStep(4);
                    }}
                    disabled={!!formData.submission1.title}
                    className="w-full py-3 bg-[#420C0C] text-[#FFD700] font-bold rounded-lg hover:bg-[#2A0A0A] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {formData.submission1.title ? 'Submitted' : 'Submit Entry 1'}
                </button>
            </div>

            {/* Entry 2 Card */}
            <div className={`bg-[#2A0A0A] border-2 ${formData.plan === 499 ? 'border-[#FFD700]' : 'border-[#420C0C]'} rounded-xl p-8 shadow-lg relative overflow-hidden`}>
                {formData.plan !== 499 && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center text-center p-6 z-10">
                        <div>
                            <Lock className="w-8 h-8 text-[#FFD700] mx-auto mb-2" />
                            <p className="text-[#F5E6CC] font-bold">Unlock with Premium Plan</p>
                        </div>
                    </div>
                )}
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold text-[#FFD700]">Entry #2</h4>
                    {formData.submission2.title ? (
                        <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded font-bold">SUBMITTED</span>
                    ) : (
                        <span className="text-xs bg-[#FFD700]/20 text-[#FFD700] px-2 py-1 rounded font-bold">PREMIUM</span>
                    )}
                </div>
                <p className="text-[#E5D4B3] text-sm mb-6">Bonus submission for double impact.</p>
                <button
                    onClick={() => {
                        setSubmissionType(2);
                        setSubmitStatus('idle');
                        setStep(4);
                    }}
                    disabled={!!formData.submission2.title || formData.plan !== 499}
                    className="w-full py-3 bg-[#FFD700] text-[#2A0A0A] font-bold rounded-lg hover:bg-[#FFE55C] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {formData.submission2.title ? 'Submitted' : 'Submit Entry 2'}
                </button>
            </div>
        </div>
    </div>
);

const Step5Submission = ({ formData, setFormData, setStep, handleSubmit, submitStatus, errorMsg, submissionType }: { formData: FormData, setFormData: React.Dispatch<React.SetStateAction<FormData>>, setStep: (s: number) => void, handleSubmit: () => void, submitStatus: string, errorMsg: string, submissionType: 1 | 2 }) => {
    // Local state for the current editing submission to avoid deep nested complex updates directly in render
    const currentSubmission = submissionType === 1 ? formData.submission1 : formData.submission2;

    const updateField = (field: 'title' | 'content', value: string) => {
        if (submissionType === 1) {
            setFormData(prev => ({ ...prev, submission1: { ...prev.submission1, [field]: value } }));
        } else {
            setFormData(prev => ({ ...prev, submission2: { ...prev.submission2, [field]: value } }));
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-20 pb-40">
            <h3 className="text-3xl text-center font-serif text-[#420C0C] mb-8">
                Submit Entry #{submissionType}
            </h3>

            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-[#EFEBE9]">
                {/* Category Selection (Moved here) */}
                <div className="mb-6">
                    <label className="block text-[#5D4037] font-bold mb-2">Select Category</label>
                    <select
                        value={formData.category} // Assuming one category for now, or we could split it
                        onChange={e => setFormData(prev => ({ ...prev, category: e.target.value as Category }))}
                        className="w-full bg-[#F5F5F5] border border-[#D7CCC8] p-4 rounded-lg focus:border-[#420C0C] outline-none font-serif text-lg"
                    >
                        <option value="">-- Choose Category --</option>
                        <option value="poetry">Poetry (Max 40 Lines)</option>
                        <option value="short_story">Short Story (Max 2000 Words)</option>
                        <option value="novel">Novel (Max 3000 Words)</option>
                    </select>
                </div>

                <input
                    className="w-full mb-4 p-4 bg-[#F5F5F5] border border-[#D7CCC8] rounded-lg focus:border-[#420C0C] outline-none font-serif text-lg"
                    placeholder="Title of your piece"
                    value={currentSubmission.title}
                    onChange={e => updateField('title', e.target.value)}
                />
                <textarea
                    className="w-full p-4 bg-[#F5F5F5] border border-[#D7CCC8] rounded-lg focus:border-[#420C0C] outline-none font-serif min-h-[300px]"
                    placeholder="Paste your content here..."
                    value={currentSubmission.content}
                    onChange={e => updateField('content', e.target.value)}
                />

                {errorMsg && (
                    <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center">
                        {errorMsg}
                    </div>
                )}

                <div className="flex gap-4 mt-8">
                    <button onClick={() => setStep(4)} className="w-full py-4 border border-[#8D6E63] text-[#5D4037] font-bold rounded-lg hover:bg-[#EFEBE9]">Back to Dashboard</button>
                    <button
                        onClick={handleSubmit}
                        disabled={submitStatus === 'submitting'}
                        className="w-full py-4 bg-[#420C0C] text-[#FFD700] font-bold rounded-lg hover:bg-[#2A0A0A] shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {submitStatus === 'submitting' ? 'Submitting...' : 'Confirm Submission'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const Step6Success = ({ formData, setStep }: { formData: FormData, setStep: (s: number) => void }) => (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-12 rounded-2xl shadow-2xl border-4 border-[#FFD700] max-w-2xl relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FFD700] via-[#B8860B] to-[#FFD700]" />
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-serif text-[#420C0C] mb-4">Submission Received!</h2>
            <p className="text-[#5D4037] text-lg mb-8">
                Your entry has been securely recorded.
            </p>

        </motion.div>
    </div>
);

// --- Premium Loading Overlay ---
const LoadingOverlay = ({ status }: { status: 'submitting' | 'verifying' | 'success' }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md"
    >
        <div className="relative">
            {/* Spinning Golden Circle */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 rounded-full border-4 border-[#FFD700] border-t-transparent"
            />
            {/* Center Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
                {status === 'success' ? (
                    <Check className="w-10 h-10 text-[#FFD700]" />
                ) : (
                    <div className="w-4 h-4 bg-[#FFD700] rounded-full animate-ping" />
                )}
            </div>
        </div>

        <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-2xl font-[Cinzel] text-[#FFD700] text-center"
        >
            {status === 'submitting' && "Processing Entry..."}
            {status === 'verifying' && "Verifying Request..."}
            {status === 'success' && "Registration Successful!"}
        </motion.h3>

        <p className="mt-2 text-[#E5D4B3] font-serif text-sm opacity-80">
            Please do not close this window
        </p>
    </motion.div>
);

// --- Main Component ---
const IndianWritersLeagueSubmissionV2 = () => {
    // --- State ---
    const [step, setStep] = useState(1);
    const [animationState, setAnimationState] = useState<'initial' | 'presents' | 'title' | 'moveUp' | 'form'>('initial');
    const [showPlans, setShowPlans] = useState(false); // Lifted state for Header visibility control

    // --- Form State ---
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        whatsapp: '',
        category: '',
        plan: null,
        submission1: { title: '', content: '' },
        submission2: { title: '', content: '' }
    });

    const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const [submissionType, setSubmissionType] = useState<1 | 2>(1);

    // --- Helpers ---
    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    // Auto-scroll to top on step change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [step]);


    // --- Auto-dismiss Success Overlay ---
    useEffect(() => {
        if (submitStatus === 'success') {
            const timer = setTimeout(() => {
                setSubmitStatus('idle');
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [submitStatus]);

    // --- Animation Sequence ---
    useEffect(() => {
        // Only run animation if we are on step 1
        if (step === 1) {
            const sequence = async () => {
                // await new Promise(r => setTimeout(r, 500));
                setAnimationState('presents');

                await new Promise(r => setTimeout(r, 2000));
                setAnimationState('title');

                await new Promise(r => setTimeout(r, 2500));
                setAnimationState('moveUp');

                await new Promise(r => setTimeout(r, 800));
                setAnimationState('form');
            };
            sequence();
        }
    }, [step]);


    // Helper to create or update initial record
    const createInitialRecord = async (orderId: string, currentData: FormData) => {
        // Use UPSERT to handle both new records and fixing existing empty ones
        await supabase.from('iwl_registrations').upsert({
            order_id: orderId,
            name: currentData.name,
            email: currentData.email,
            whatsapp: currentData.whatsapp,
            plan_amount: currentData.plan || 299,
            submission_count: currentData.plan === 299 ? 1 : 2,
            payment_status: 'paid_manual_v2', // Marking as manual v2
            ...(currentData.category ? { category: currentData.category } : {})
        }, { onConflict: 'order_id' });
    };

    // --- ByPass Payment Handler ---
    const handleManualRegistration = async () => {
        if (!formData.plan) return alert("Please select what you have paid");

        setSubmitStatus('submitting');

        // Generate a MANUAL Order ID
        const manualOrderId = `manual_v2_${Date.now()}_${Math.random().toString(36).substring(7)}`;

        try {
            // Check if we can save to DB directly or just proceed locally
            // We should create a record in supabase at least for tracking

            await createInitialRecord(manualOrderId, formData);

            // Check persistence (Optional for V2 but good for user experience)
            const newData = {
                ...formData,
                orderId: manualOrderId,
                paymentStatus: 'paid' as const
            };
            // setFormData(newData); // Don't strict update state yet, wait for step transition

            setSubmitStatus('success');

            setTimeout(() => {
                setFormData(prev => ({ ...prev, ...newData }));
                setStep(3); // Go to Dashboard
                setSubmitStatus('idle');
            }, 2000);

        } catch (err: any) {
            console.error(err);
            alert("Registration initialization failed. Please try again.");
            setSubmitStatus('idle');
        }
    };

    // --- Submission Handler ---
    const handleSubmit = async () => {
        setSubmitStatus('submitting');
        setErrorMsg('');

        try {
            // Validation
            if (submissionType === 1) {
                if (!formData.submission1.title || !formData.submission1.content) throw new Error("Title and content are required.");
            } else {
                if (!formData.submission2.title || !formData.submission2.content) throw new Error("Title and content are required.");
            }
            if (!formData.category) throw new Error("Please select a category.");


            // --- Sync to Firestore (Client Side) ---
            // Direct write to iwl_submissions collection using inkfetishofficial config
            if (formData.orderId) {
                const firestoreRef = doc(db, "iwl_submissions", formData.orderId);

                const firestoreData: any = {
                    orderId: formData.orderId,
                    name: formData.name,
                    email: formData.email,
                    whatsapp: formData.whatsapp,
                    category: formData.category, // writing category
                    plan: formData.plan,
                    updatedAt: new Date().toISOString()
                };

                // Merge specific submission
                if (submissionType === 1) {
                    firestoreData.submission1 = formData.submission1;
                    if (formData.plan === 299) firestoreData.status = "complete";
                    else firestoreData.status = "partial_submission";
                } else if (submissionType === 2) {
                    firestoreData.submission2 = formData.submission2;
                    firestoreData.status = "full_submission";
                }

                await setDoc(firestoreRef, firestoreData, { merge: true });
                console.log("✅ Synced to Firestore (Client Side)");
            } else {
                console.error("Missing Order ID for Firestore Sync");
            }

            setSubmitStatus('success');

            // Conditional Navigation
            if (Number(formData.plan) >= 499 && submissionType === 1) {
                // If Premium and first entry, go back to Dashboard for 2nd entry
                setTimeout(() => setStep(3), 2000); // Wait for success animation
            } else {
                // Final submission or single plan
                setStep(5);
            }

        } catch (err: any) {
            console.error(err);
            setErrorMsg(err.message || "An error occurred. Please try again.");
            setSubmitStatus('error');
        }
    };

    // --- Render Logic ---
    const isUp = animationState === 'moveUp' || animationState === 'form';
    const showCinematic = step === 1;

    return (
        <div className={`min-h-screen font-sans selection:bg-[#420C0C] selection:text-[#FFD700] ${showCinematic ? 'bg-[#1A0505] text-[#FFD700]' : 'bg-[#F0EBE0]'}`}>
            <Helmet>
                <title>Indian Writers League | Submission V2</title>
                <meta name="description" content="Join India's Biggest Writing Contest. Poetry, Story, Novel categories. ₹1.5L Prize Pool." />
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
                `}</style>
            </Helmet>

            {/* Cinematic Background (Only Step 1) */}
            {showCinematic && (
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#420C0C] via-[#2A0A0A] to-[#000000]" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 animate-pulse" />
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(15)].map((_, i) => (
                            <div key={i} className="absolute rounded-full bg-[#FFD700] opacity-30 animate-pulse" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, width: `${Math.random() * 3}px`, height: `${Math.random() * 3}px`, animationDuration: `${Math.random() * 3 + 2}s` }} />
                        ))}
                    </div>
                </div>
            )}

            {/* Cinematic Intro Components */}
            <AnimatePresence>
                {/* 1. Presents */}
                {showCinematic && animationState === 'presents' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                        transition={{ duration: 0.8 }}
                        className="fixed inset-0 flex flex-col items-center justify-center z-50 text-center pointer-events-none"
                    >
                        <div className="text-[#FFD700] font-[Cinzel] tracking-[0.3em] text-sm md:text-lg mb-2 uppercase">Inkfetish Presents</div>
                        <div className="text-[#F5E6CC] font-[Cinzel] text-xl md:text-3xl tracking-[0.1em]">National Writing Contest</div>
                    </motion.div>
                )}

                {/* 2. Main Title (Animated) */}
                {showCinematic && (animationState === 'title' || isUp) && !showPlans && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 0 }}
                        animate={{
                            opacity: 1,
                            scale: isUp ? (window.innerWidth < 768 ? 0.5 : 0.8) : 1, // Reduced mobile scale to 0.5
                            y: isUp ? (window.innerWidth < 768 ? -340 : -340) : 0   // Increased desktop lift to match mobile separation
                        }}
                        transition={{
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                        className="fixed top-1/2 left-0 right-0 z-40 flex flex-col items-center justify-center pointer-events-none"
                    >
                        <div className="text-[#FFD700] text-sm md:text-base mb-4 tracking-[0.2em] font-serif border border-[#FFD700] px-4 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                            SEASON 1: THE BEGINNING
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-center leading-tight drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]">
                            <span className="block text-[#E5D4B3]">INDIAN</span>
                            <span className="block text-[#FFD700] font-bold mt-[-10px]">WRITERS</span>
                            <span className="block text-[#E5D4B3] mt-2 text-3xl md:text-5xl tracking-[0.3em]">LEAGUE</span>
                        </h1>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Static Header for Subsequent Steps */}
            {!showCinematic && step < 3 && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pt-10 pb-4 text-center"
                >
                    <div className="inline-block mb-2 px-4 py-1 rounded-full border border-[#420C0C]/30 bg-white/50 backdrop-blur-md text-[#420C0C] font-[Cinzel] text-[10px] uppercase tracking-widest">Season 1: The Beginning</div>
                    <h1 className="text-3xl md:text-5xl font-[Cinzel] text-[#420C0C]">INDIAN WRITERS LEAGUE</h1>
                </motion.div>
            )}

            {/* Steps Content */}
            <AnimatePresence mode="wait">
                {step === 1 && animationState === 'form' && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.6 }}
                        className="relative z-50 pt-52 md:pt-64" // Significantly increased padding to prevent overlap
                    >
                        <StepRegistrationAndPlan
                            formData={formData}
                            setFormData={setFormData}
                            onPayment={handleManualRegistration}
                            showPlans={showPlans}
                            setShowPlans={setShowPlans}
                        />
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Step4Dashboard formData={formData} setStep={setStep} setSubmissionType={setSubmissionType} setSubmitStatus={setSubmitStatus} />
                    </motion.div>
                )}
                {step === 4 && (
                    <motion.div
                        key="step4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Step5Submission formData={formData} setFormData={setFormData} setStep={setStep} handleSubmit={handleSubmit} submitStatus={submitStatus} errorMsg={errorMsg} submissionType={submissionType} />
                    </motion.div>
                )}
                {step === 5 && (
                    <motion.div
                        key="step5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Step6Success formData={formData} setStep={setStep} />
                    </motion.div>
                )}
            </AnimatePresence>


            {/* Footer / Branding */}
            {step > 1 && step !== 5 && (
                <div className="text-center py-6 text-[#8D6E63] text-sm opacity-60">
                    Organized by Inkfetish | 199K+ Writers Community
                </div>
            )}

            {/* Global Loading Overlay */}
            <AnimatePresence>
                {(submitStatus === 'submitting' || submitStatus === 'success') && (
                    <LoadingOverlay status={submitStatus === 'success' ? 'success' : 'submitting'} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default IndianWritersLeagueSubmissionV2;
