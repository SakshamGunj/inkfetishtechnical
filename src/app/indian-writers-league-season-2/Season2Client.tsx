'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
    Feather, BookOpen, Book, ChevronRight, Check, Star,
    Smartphone, Mail, User, Trophy, Medal, Scroll, Lock, Calendar
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import TextareaAutosize from 'react-textarea-autosize';
import html2pdf from 'html2pdf.js';

// --- Types ---
type Category = 'poetry' | 'short_story' | 'novel' | 'quote' | 'letter';
type Plan = 1 | 2;

interface FormData {
    name: string;
    email: string;
    whatsapp: string;
    age: string;
    category: Category | '';
    plan: Plan | null;
    submission1: { title: string; content: string };
    submission2: { title: string; content: string };
    orderId?: string;
    editCount: number;
}

// --- Steps Components (Defined OUTSIDE to fix focus bug) ---

// Consolidated Step 1: Registration + Plan Selection
const StepRegistrationAndPlan = ({ formData, setFormData, onPayment, showPlans, setShowPlans }: { formData: FormData, setFormData: React.Dispatch<React.SetStateAction<FormData>>, onPayment: () => void, showPlans: boolean, setShowPlans: (b: boolean) => void }) => {

    const togglePlans = async () => {
        if (formData.name && formData.email && formData.whatsapp.length === 10 && formData.age) {
            setShowPlans(true);

            let currentOrderId = formData.orderId;
            if (!currentOrderId) {
                const randomPart = Math.random().toString(36).slice(2, 7);
                currentOrderId = `iwl2_${Date.now()}_${randomPart}`;
                setFormData(prev => ({ ...prev, orderId: currentOrderId }));
                
                // Removed redundant frontend save. Backend will handle this via Admin SDK securely.
            } else {
                // If it exists (e.g. from a previous edit), just update the latest info
                // Removed redundant frontend save. Backend will handle this via Admin SDK securely.
            }

            // Save to localStorage immediately
            localStorage.setItem('iwl_registration', JSON.stringify({ ...formData, orderId: currentOrderId }));

            setTimeout(() => {
                document.getElementById('plan-section')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            alert("Please fill all details correctly.");
        }
    };

    return (
        <div className="max-w-5xl mx-auto pt-4 pb-12 md:pt-6 md:pb-20">
            {!showPlans && (
                <h3 className="text-3xl text-center font-serif text-[#E0C097] mb-6 drop-shadow-md">Writer Registration</h3>
            )}

            {showPlans ? (
                <div className="bg-black/30 backdrop-blur-md border border-[#E0C097]/30 p-3 md:p-6 rounded-xl flex items-center justify-between gap-3 shadow-lg mb-8">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5 md:mb-1">
                            <User className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#FFD700] flex-shrink-0" />
                            <p className="font-serif font-bold text-sm md:text-xl text-[#FFD700] truncate">{formData.name}</p>
                        </div>
                        <p className="text-[10px] md:text-sm text-[#E5D4B3] opacity-80 flex flex-wrap items-center gap-1.5 md:gap-2">
                            <span className="flex items-center gap-1 truncate"><Mail className="w-2.5 h-2.5 md:w-3 md:h-3 flex-shrink-0" /> <span className="truncate max-w-[100px] md:max-w-none">{formData.email}</span></span>
                            <span className="text-[#FFD700]/50">•</span> 
                            <span className="flex items-center gap-1 whitespace-nowrap"><Smartphone className="w-2.5 h-2.5 md:w-3 md:h-3" /> {formData.whatsapp}</span>
                        </p>
                    </div>
                    <button 
                        onClick={() => {
                            if (formData.editCount >= 2) return;
                            setShowPlans(false);
                            setFormData(prev => ({ ...prev, editCount: prev.editCount + 1 }));
                        }}
                        disabled={formData.editCount >= 2}
                        className={`flex-shrink-0 text-[9px] md:text-xs font-bold uppercase tracking-widest border border-[#E0C097]/40 text-[#E5D4B3] px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-colors flex items-center justify-center gap-1 ${formData.editCount >= 2 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#FFD700]/10'}`}
                    >
                        {formData.editCount >= 2 ? 'Locked' : `Edit (${2 - formData.editCount} left)`}
                    </button>
                </div>
            ) : (
                <div className="space-y-6 md:space-y-8 bg-white/95 backdrop-blur-sm p-8 md:p-10 rounded-xl shadow-2xl border border-[#D7CCC8]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div className="md:col-span-2">
                            <label className="block text-[#420C0C] font-bold mb-2 md:mb-3 flex items-center gap-2 md:text-lg"><User className="w-5 h-5" /> Full Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-white border border-[#D7CCC8] p-4 md:p-5 rounded-xl focus:border-[#420C0C] focus:ring-2 focus:ring-[#420C0C]/50 outline-none font-serif text-lg md:text-xl text-[#2A0A0A] placeholder:text-[#A1887F]"
                                placeholder="Enter your pen name"
                                disabled={showPlans}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-[#420C0C] font-bold mb-2 md:mb-3 flex items-center gap-2 md:text-lg"><Mail className="w-5 h-5" /> Email Address</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-white border border-[#D7CCC8] p-4 md:p-5 rounded-xl focus:border-[#420C0C] focus:ring-2 focus:ring-[#420C0C]/50 outline-none font-serif text-lg md:text-xl text-[#2A0A0A] placeholder:text-[#A1887F]"
                                placeholder="For official communication"
                                disabled={showPlans}
                            />
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-[#420C0C] font-bold mb-2 md:mb-3 flex items-center gap-2 md:text-lg"><Smartphone className="w-5 h-5" /> WhatsApp Number</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-[#D7CCC8] pr-3">
                                    <img src="https://flagcdn.com/w20/in.png" alt="India" className="w-6" />
                                    <span className="text-[#4E342E] font-bold md:text-lg">+91</span>
                                </div>
                                <input
                                    type="tel"
                                    maxLength={10}
                                    value={formData.whatsapp}
                                    onChange={e => setFormData({ ...formData, whatsapp: e.target.value.replace(/\D/g, '') })}
                                    className="w-full bg-white border border-[#D7CCC8] p-4 md:p-5 pl-28 md:pl-32 rounded-xl focus:border-[#420C0C] focus:ring-2 focus:ring-[#420C0C]/50 outline-none font-serif text-lg md:text-xl tracking-widest text-[#2A0A0A] placeholder:text-[#A1887F]"
                                    placeholder="9999999999"
                                    disabled={showPlans}
                                />
                            </div>
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-[#420C0C] font-bold mb-2 md:mb-3 flex items-center gap-2 md:text-lg"><Calendar className="w-5 h-5" /> Age</label>
                            <select
                                value={formData.age}
                                onChange={e => setFormData({ ...formData, age: e.target.value })}
                                className="w-full bg-white border border-[#D7CCC8] p-4 md:p-5 rounded-xl focus:border-[#420C0C] focus:ring-2 focus:ring-[#420C0C]/50 outline-none font-serif text-lg md:text-xl text-[#2A0A0A] appearance-none cursor-pointer"
                                disabled={showPlans}
                            >
                                <option value="" disabled>Select your age</option>
                                {[...Array(93)].map((_, i) => (
                                    <option key={i + 8} value={i + 8}>{i + 8}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-8">
                        <button
                            onClick={togglePlans}
                            className="w-full py-4 bg-[#FFD700] text-[#2A0A0A] font-bold rounded-lg hover:bg-[#FFE55C] shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
                        >
                            Select Plan <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Plan Selection Section - Revelas Below */}
            <AnimatePresence>
                {showPlans && (
                    <motion.div
                        id="plan-section"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mt-12 pb-32 md:pb-0"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl md:text-3xl font-serif text-[#E0C097] drop-shadow-md">Select Entry Plan</h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                            {/* Basic Plan */}
                            <div
                                className={`bg-white border text-center flex flex-col ${formData.plan === 1 ? 'border-[#420C0C] ring-4 ring-[#420C0C]/10 shadow-2xl scale-105 z-10' : 'border-[#D7CCC8] shadow-md opacity-80 hover:opacity-100 hover:scale-[1.02]'} rounded-xl p-6 relative overflow-hidden cursor-pointer transition-all duration-300`}
                                onClick={() => setFormData({ ...formData, plan: 1 })}
                            >
                                <div className="mb-4">
                                    <h4 className="text-lg font-bold text-[#420C0C] uppercase tracking-wider mb-1">📝 BASIC PASS</h4>
                                    <div className="text-4xl font-serif text-[#2A0A0A]">₹1</div>
                                </div>
                                
                                <div className="text-[9px] md:text-[10px] font-bold text-[#420C0C] uppercase tracking-widest mb-4 bg-[#FFD700]/30 py-1.5 px-2 rounded-md border border-[#FFD700]/50 inline-block mx-auto">
                                    ( Certificate officially verified by QR )
                                </div>
                                
                                <div className="text-sm font-bold text-[#420C0C] mb-5 bg-gray-100/80 py-2 rounded-md border border-gray-200 uppercase tracking-widest">
                                    1 Entry | Choose Any Category
                                </div>
                                
                                <ul className="space-y-4 mb-8 text-[#420C0C] text-sm text-left px-2 flex-grow">
                                    <li className="flex items-start gap-3"><Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" /> <span>Submit 1 Writing in any category</span></li>
                                    <li className="flex items-start gap-3"><Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" /> <span>Receive a Digital Certificate + Appreciation Letter</span></li>
                                    <li className="flex items-start gap-3"><Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" /> <span>Eligible for Prizes</span></li>
                                </ul>
                                
                                <div className={`w-6 h-6 rounded-full border border-[#5D4037] mx-auto flex items-center justify-center mt-auto ${formData.plan === 1 ? 'bg-[#420C0C] border-transparent' : ''}`}>
                                    {formData.plan === 1 && <Check className="w-4 h-4 text-white" />}
                                </div>
                            </div>

                            {/* Premium Plan */}
                            <div
                                className={`bg-[#2A0A0A] border text-center flex flex-col ${formData.plan === 2 ? 'border-[#FFD700] ring-4 ring-[#FFD700]/20 shadow-2xl scale-105 z-10' : 'border-[#420C0C] shadow-lg opacity-90 hover:opacity-100 hover:scale-[1.02]'} rounded-xl p-6 relative overflow-hidden cursor-pointer transition-all duration-300`}
                                onClick={() => setFormData({ ...formData, plan: 2 })}
                            >
                                <div className="absolute top-0 right-0 bg-[#FFD700] text-[#2A0A0A] text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest rounded-bl-lg shadow-md z-10">
                                    Best Value ⭐
                                </div>
                                
                                <div className="mb-4 pt-2">
                                    <h4 className="text-lg font-bold text-[#FFD700] uppercase tracking-wider mb-1 drop-shadow-md">🏆 PREMIUM PASS</h4>
                                    <div className="text-4xl font-serif text-white drop-shadow-lg">₹2</div>
                                </div>
                                
                                <div className="text-[9px] md:text-[10px] font-bold text-[#2A0A0A] uppercase tracking-widest mb-4 bg-[#FFD700] py-1.5 px-2 rounded-md shadow-[0_0_15px_rgba(255,215,0,0.4)] inline-block mx-auto border border-[#FFD700]">
                                    ( Certificate officially verified by QR )
                                </div>
                                
                                <div className="text-sm font-bold text-[#FFD700] mb-5 bg-white/10 py-2 rounded-md border border-[#FFD700]/30 uppercase tracking-widest backdrop-blur-sm">
                                    2 Entries | Choose Any Category
                                </div>
                                
                                <ul className="space-y-4 mb-8 text-[#E5D4B3] text-sm text-left px-2 flex-grow">
                                    <li className="flex items-start gap-3"><Star className="w-5 h-5 text-[#FFD700] mt-0.5 flex-shrink-0 drop-shadow-md" /> <span>Submit 2 Writings in any categories</span></li>
                                    <li className="flex items-start gap-3"><Star className="w-5 h-5 text-[#FFD700] mt-0.5 flex-shrink-0 drop-shadow-md" /> <span>Receive Digital Certificate + Appreciation Letter</span></li>
                                    <li className="flex items-start gap-3"><Star className="w-5 h-5 text-[#FFD700] mt-0.5 flex-shrink-0 drop-shadow-md" /> <span>Receive <strong>Hardcopy Certificate + Appreciation Letter</strong> at your doorstep</span></li>
                                    <li className="flex items-start gap-3"><Star className="w-5 h-5 text-[#FFD700] mt-0.5 flex-shrink-0 drop-shadow-md" /> <span className="font-semibold text-white">FREE Home Delivery — No Shipping Fee or Extra Charges</span></li>
                                    <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#FFD700] mt-0.5 flex-shrink-0 drop-shadow-md" /> <span>Eligible for Prizes</span></li>
                                </ul>
                                
                                <div className={`w-6 h-6 rounded-full border border-[#FFD700] mx-auto flex items-center justify-center mt-auto ${formData.plan === 2 ? 'bg-[#FFD700] border-transparent' : ''}`}>
                                    {formData.plan === 2 && <Check className="w-4 h-4 text-[#2A0A0A]" />}
                                </div>
                            </div>
                        </div>

                        <div className="fixed bottom-0 left-0 right-0 p-4 md:static md:p-0 md:mt-10 max-w-md mx-auto z-50 bg-gradient-to-t from-black/80 via-black/50 to-transparent md:bg-none">
                            <button
                                disabled={!formData.plan}
                                onClick={() => formData.plan && onPayment()}
                                className={`w-full py-4 md:py-4 font-bold rounded-xl md:rounded-lg shadow-2xl flex items-center justify-center gap-2 transition-all duration-300 ${formData.plan ? 'bg-[#FFD700] text-[#2A0A0A] hover:bg-[#FFE55C] hover:scale-[1.02] shadow-[0_0_20px_rgba(255,215,0,0.3)]' : 'bg-[#D7CCC8] text-[#4E342E]/70 cursor-not-allowed opacity-90'}`}
                            >
                                Make Payment and SUBMIT <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Old Step2Details and Step3Plan are removed/replaced by StepRegistrationAndPlan
// Keeping placeholder Step3Plan? No, removing it.

// const Step3Plan = ... (REMOVE)

const Step4Dashboard = ({ formData, setStep, setSubmissionType, setSubmitStatus }: { formData: FormData, setStep: (s: number) => void, setSubmissionType: (type: 1 | 2) => void, setSubmitStatus: (s: 'idle' | 'submitting' | 'success' | 'error') => void }) => (

    <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">Participant Dashboard</h3>
            <p className="text-[#E0C097] text-lg mb-4">Welcome, <strong>{formData.name}</strong></p>
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-bold">
                <Check className="w-4 h-4" /> Payment Verified
            </div>
            
            {((formData.plan === 1 && formData.submission1.title) || (formData.plan === 2 && formData.submission1.title && formData.submission2.title)) && (
                <div className="mt-8 p-6 bg-gradient-to-r from-[#FFD700]/20 to-[#E0C097]/20 border border-[#FFD700] rounded-xl max-w-2xl mx-auto">
                    <Trophy className="w-12 h-12 text-[#FFD700] mx-auto mb-3" />
                    <h4 className="text-2xl font-serif text-[#FFD700] mb-2">All Submissions Complete!</h4>
                    <p className="text-[#E5D4B3]">You have successfully submitted all your entries for this season. Please wait for the results announcement. Best of luck!</p>
                </div>
            )}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">

            {/* Entry 1 Card */}
            <div className="bg-white border-2 border-[#D7CCC8] rounded-xl p-8 shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold text-[#E0C097]">Entry #1</h4>
                    {formData.submission1.title ? (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">SUBMITTED</span>
                    ) : (
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded font-bold">PENDING</span>
                    )}
                </div>
                <p className="text-[#E0C097]/70 text-sm mb-6">Standard submission included in your plan.</p>
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
            <div className={`bg-[#2A0A0A] border-2 ${formData.plan === 2 ? 'border-[#FFD700]' : 'border-[#420C0C]'} rounded-xl p-8 shadow-lg relative overflow-hidden`}>
                {formData.plan !== 2 && (
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
                    disabled={!!formData.submission2.title || formData.plan !== 2}
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
            <h3 className="text-3xl text-center font-serif text-white mb-8">
                Submit Entry #{submissionType}
            </h3>

            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-[#EFEBE9]">
                {/* Category Selection (Moved here) */}
                <div className="mb-6">
                    <label className="block text-[#E0C097] font-bold mb-2">Select Category</label>
                    <select
                        value={formData.category} // Assuming one category for now, or we could split it
                        onChange={e => setFormData(prev => ({ ...prev, category: e.target.value as Category }))}
                        className="w-full bg-[#F5F5F5] border border-[#D7CCC8] p-4 rounded-lg focus:border-[#420C0C] outline-none font-serif text-lg"
                    >
                        <option value="">-- Choose Category --</option>
                        <option value="poetry">Poetry (Max 40 Lines)</option>
                        <option value="short_story">Short Story (Max 2000 Words)</option>
                        <option value="novel">Novel (Max 3000 Words)</option>
                        <option value="quote">Quote / Micro-Tale</option>
                        <option value="letter">Open Letter</option>
                    </select>
                </div>

                <input
                    className="w-full mb-4 p-4 bg-[#F5F5F5] border border-[#D7CCC8] rounded-lg focus:border-[#420C0C] outline-none font-serif text-lg"
                    placeholder="Title of your piece"
                    value={currentSubmission.title}
                    onChange={e => updateField('title', e.target.value)}
                />
                <TextareaAutosize
                    minRows={10}
                    className="w-full p-5 bg-[#F5F5F5] border border-[#D7CCC8] rounded-lg focus:border-[#420C0C] outline-none font-serif text-lg leading-relaxed resize-none text-[#2A0A0A]"
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
                    <button onClick={() => setStep(4)} className="w-full py-4 border border-[#8D6E63] text-[#E0C097] font-bold rounded-lg hover:bg-[#EFEBE9]">Back to Dashboard</button>
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
            <h2 className="text-4xl font-serif text-white mb-4">Submission Received!</h2>
            <p className="text-[#E0C097] text-lg mb-6">
                Your entry has been securely recorded.
            </p>

            <button 
                onClick={() => {
                    const receiptHTML = `
                        <div style="padding: 40px; font-family: 'Times New Roman', serif; color: #2A0A0A; text-align: center; max-width: 600px; margin: 0 auto; border: 4px solid #FFD700; background-color: #F9F7F1;">
                            <img src="https://i.postimg.cc/nrG8JpsZ/IWL.png" style="width: 150px; margin-bottom: 20px;" />
                            <h1 style="font-size: 28px; font-weight: bold; margin-bottom: 10px; color: #420C0C;">Submission Receipt</h1>
                            <p style="font-size: 16px; margin-bottom: 30px;">Indian Writers League - Season 2</p>
                            
                            <div style="text-align: left; background: #fff; padding: 20px; border: 1px solid #D7CCC8; border-radius: 8px; margin-bottom: 30px;">
                                <p><strong>Order ID:</strong> ${formData.orderId}</p>
                                <p><strong>Name:</strong> ${formData.name}</p>
                                <p><strong>Email:</strong> ${formData.email}</p>
                                <p><strong>Category:</strong> ${formData.category}</p>
                            </div>
                            
                            <p style="font-size: 14px; font-style: italic; color: #666;">This is an officially verified submission record.</p>
                            <p style="font-size: 12px; color: #888;">Date: ${new Date().toLocaleDateString()}</p>
                        </div>
                    `;
                    const container = document.createElement('div');
                    container.innerHTML = receiptHTML;
                    html2pdf().from(container).save(`IWL_S2_Receipt_${formData.name.replace(/\s+/g, '_')}.pdf`);
                }}
                className="w-full py-3 mb-4 bg-transparent border-2 border-[#FFD700] text-[#FFD700] font-bold rounded-lg hover:bg-[#FFD700]/10 flex items-center justify-center gap-2"
            >
                Download Receipt PDF
            </button>
            
            <button 
                onClick={() => setStep(3)}
                className="w-full py-4 bg-[#FFD700] text-[#2A0A0A] font-bold rounded-lg hover:bg-[#FFE55C]"
            >
                Back to Dashboard
            </button>
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
            {status === 'submitting' && "Initializing Secure Gateway..."}
            {status === 'verifying' && "Verifying Payment..."}
            {status === 'success' && "Registration Successful!"}
        </motion.h3>

        <p className="mt-2 text-[#E5D4B3] font-serif text-sm opacity-80">
            Please do not close this window
        </p>
    </motion.div>
);

// --- Main Component ---
const Season2Client = () => {
    // --- State ---
    const [step, setStep] = useState(1);
    const [animationState, setAnimationState] = useState<'initial' | 'presents' | 'title' | 'moveUp' | 'form'>('form');
    const [showPlans, setShowPlans] = useState(false); // Lifted state for Header visibility control

    // --- Form State ---
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        whatsapp: '',
        age: '',
        category: '',
        plan: null,
        submission1: { title: '', content: '' },
        submission2: { title: '', content: '' },
        editCount: 0
    });

    // --- Persistence ---
    useEffect(() => {
        const saved = localStorage.getItem('iwl_registration');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (typeof parsed.editCount !== 'number' || isNaN(parsed.editCount)) {
                    parsed.editCount = 0;
                }
                setFormData(parsed);
                if (parsed.paymentStatus === 'paid') {
                    setStep(3);
                } else if (parsed.orderId) {
                    // Background check
                    fetch(`/api/cashfree/verify-order?order_id=${parsed.orderId}`)
                        .then(res => res.json())
                        .then(data => {
                            if (data.order_status === 'PAID') {
                                parsed.paymentStatus = 'paid';
                                setFormData(parsed);
                                localStorage.setItem('iwl_registration', JSON.stringify(parsed));
                                setStep(3);
                            }
                        })
                        .catch(err => console.error("Silent verification failed", err));
                }
            } catch (e) {
                console.error("Failed to load saved data", e);
            }
        }
    }, []);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const [submissionType, setSubmissionType] = useState<1 | 2>(1);

    // --- Payment State ---
    const [paymentStatus, setPaymentStatus] = useState<'pending' | 'verifying' | 'paid'>('pending');
    const [cashfree, setCashfree] = useState<any>(null);

    // --- Load Cashfree SDK ---
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
        script.async = true;
        script.onload = () => {
            setCashfree((window as any).Cashfree({
                mode: process.env.NEXT_PUBLIC_CASHFREE_MODE || 'production'
            }));
        };
        document.head.appendChild(script);
    }, []);

    // --- Helpers ---
    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    // Auto-scroll to top on step change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [step]);

    // --- Persist Form Data ---
    useEffect(() => {
        if (formData.name || formData.plan) {
            localStorage.setItem('iwl_registration', JSON.stringify(formData));
        }
    }, [formData]);

    // --- Auto-dismiss Success Overlay ---
    useEffect(() => {
        if (submitStatus === 'success') {
            const timer = setTimeout(() => {
                setSubmitStatus('idle');
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [submitStatus]);



    // --- Payment Verification ---
    const verifyPayment = async (orderId: string) => {
        setPaymentStatus('verifying');
        try {
            const verifyRes = await fetch(`/api/cashfree/verify-order?order_id=${orderId}`);
            const verifyData = await verifyRes.json();

            if (verifyData.order_status === 'PAID') {
                setPaymentStatus('paid');
                
                // Determine Plan
                const paidAmount = Number(verifyData.order_amount);
                const verifiedPlan = paidAmount >= 2 ? 2 : 1;

                // Update Local State & DB
                setFormData(prev => {
                    const newData = { ...prev, plan: verifiedPlan, orderId: orderId, paymentStatus: 'paid' as const };
                    localStorage.setItem('iwl_registration', JSON.stringify(newData));
                    createInitialRecord(orderId, newData);
                    return newData;
                });
                
                setStep(3); // Move to Dashboard
            } else {
                console.warn("Payment failed or final status not PAID.", verifyData);
                setPaymentStatus('pending');
                alert(`Payment verification failed. Status: ${verifyData.order_status || "Unknown"}`);
                setShowPlans(true);
            }
        } catch (err: any) {
            console.error("Payment verification error:", err);
            setPaymentStatus('pending');
            alert("Payment verification error. Please try again.");
            setShowPlans(true);
        }
    };

    // Helper to create or update initial record
    const createInitialRecord = async (orderId: string, currentData: FormData) => {
        // Handled securely by backend API and webhook.
    };

    // --- Payment Handler ---
    const handlePayment = async () => {
        if (!formData.plan) return alert("Please select a plan");
        if (!cashfree) return alert("Payment gateway is loading. Please wait a moment.");

        setSubmitStatus('submitting');
        try {
            // 1. Create order on Next.js backend API
            const res = await fetch('/api/cashfree/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: formData.plan,
                    customerName: formData.name,
                    customerEmail: formData.email,
                    customerPhone: formData.whatsapp,
                    plan: formData.plan,
                    source: 'iwl_season_2',
                    providedOrderId: formData.orderId
                }),
            });

            const orderData = await res.json();
            if (!res.ok) throw new Error(orderData.error || 'Failed to create order.');

            const { payment_session_id, order_id } = orderData;
            
            // Save pending order locally
            setFormData(prev => ({ ...prev, orderId: order_id }));
            localStorage.setItem('iwl_registration', JSON.stringify({ ...formData, orderId: order_id }));

            // 2. Initiate checkout overlay modal
            await cashfree.checkout({
                paymentSessionId: payment_session_id,
                redirectTarget: '_modal',
            });

            // 3. Modal closed, verify transaction
            verifyPayment(order_id);

        } catch (err: any) {
            console.error(err);
            alert(err.message || "Payment initialization failed. Please try again.");
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

            // Update Database (using order_id as key)
            // Update Database (using order_id as key)
            // We update the specific columns based on submissionType
            const updatePayload: any = {
                category: formData.category // Update category now that they selected it
            };

            // REMOVED: Saving writing content to Supabase. 
            // User requested ONLY Firestore to hold the actual writing.
            // if (submissionType === 1) {
            //     updatePayload.submission_1_title = formData.submission1.title;
            //     updatePayload.submission_1_content = formData.submission1.content;
            // } else {
            //     updatePayload.submission_2_title = formData.submission2.title;
            //     updatePayload.submission_2_content = formData.submission2.content;
            // }

            // Still update category/metadata in Supabase for tracking
            // REMOVED: User requested to STOP saving to Supabase for submission phase.
            /* 
            const { error } = await supabase
                .from('iwl_registrations')
                .update(updatePayload)
                .eq('order_id', formData.orderId);

            if (error) throw error;
            */

            // --- Sync to Firestore (Client Side) ---
            // Direct write to iwl_submissions collection using inkfetishofficial config
            if (formData.orderId) {
                const firestoreRef = doc(db, "iwl_submissions", formData.orderId);

                const firestoreData: any = {
                    orderId: formData.orderId,
                    name: formData.name,
                    email: formData.email,
                    whatsapp: formData.whatsapp,
                    age: formData.age,
                    category: formData.category, // writing category
                    plan: formData.plan,
                    updatedAt: new Date().toISOString()
                };

                // Merge specific submission
                if (submissionType === 1) {
                    firestoreData.submission1 = formData.submission1;
                    if (formData.plan === 1) firestoreData.status = "complete";
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


            // Save to localStorage to persist the submission locally
            localStorage.setItem('iwl_registration', JSON.stringify(formData));

            setSubmitStatus('success');

            // Conditional Navigation
            if (Number(formData.plan) >= 2 && submissionType === 1) {
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
        <div className={`relative overflow-x-hidden min-h-screen font-sans selection:bg-[#420C0C] selection:text-[#FFD700] ${showCinematic ? 'bg-[#1A0505] text-[#FFD700]' : 'bg-[#F0EBE0]'}`}>
            <Helmet>
                <title>Indian Writers League | Season 2</title>
                <meta name="description" content="Join India's Biggest Writing Contest. Poetry, Story, Novel categories. ₹1.5L Prize Pool." />
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
                `}</style>
            </Helmet>

            {/* Minimal Logo Navbar */}
            <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center z-50">
                <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-[#E0C097]/20 flex-shrink-0 max-w-[50%]">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center p-1 shadow-lg flex-shrink-0">
                        <img src="/images/inkfetish_logo.png" alt="Inkfetish Publication" className="w-full h-full object-contain" />
                    </div>
                    <span className="font-sans font-bold text-[9px] md:text-xs text-[#E5D4B3] tracking-widest uppercase whitespace-nowrap overflow-hidden text-ellipsis">Inkfetish Publication</span>
                </div>
                
                <div className="flex flex-col items-end gap-1 bg-gradient-to-b from-black/60 to-black/30 backdrop-blur-md px-3 py-1.5 md:px-5 md:py-2 rounded-xl border border-[#FFD700]/40 shadow-[0_0_15px_rgba(255,215,0,0.15)] flex-shrink-0">
                    <div className="flex items-center gap-1 text-[#FFD700] text-[8px] md:text-[9px] font-sans font-bold uppercase tracking-widest">
                        <span className="text-green-500">✓</span> Verified
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="flex gap-0.5">
                            <Star className="w-2.5 h-2.5 md:w-4 md:h-4 text-[#FFD700] fill-[#FFD700]" />
                            <Star className="w-2.5 h-2.5 md:w-4 md:h-4 text-[#FFD700] fill-[#FFD700]" />
                            <Star className="w-2.5 h-2.5 md:w-4 md:h-4 text-[#FFD700] fill-[#FFD700]" />
                            <Star className="w-2.5 h-2.5 md:w-4 md:h-4 text-[#FFD700] fill-[#FFD700]" />
                            <Star className="w-2.5 h-2.5 md:w-4 md:h-4 text-[#FFD700] fill-[#FFD700]" />
                        </div>
                        <span className="font-sans font-black text-[10px] md:text-sm text-[#FFD700] tracking-widest leading-none">4.8/5</span>
                    </div>
                </div>
            </div>

            {/* Scrolling News Ticker */}
            <div className="absolute top-[80px] md:top-[90px] left-0 right-0 overflow-hidden z-40 bg-black/30 backdrop-blur-md border-y border-[#FFD700]/30 py-1.5">
                <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] flex items-center gap-8 text-[#FFD700] text-xs md:text-sm font-semibold uppercase tracking-wider">
                    <span>🔥 Results announced in live zoom meet</span>
                    <span>•</span>
                    <span>🔥 Results announced in live zoom meet</span>
                    <span>•</span>
                    <span>🔥 Results announced in live zoom meet</span>
                    <span>•</span>
                    <span>🔥 Results announced in live zoom meet</span>
                    <span>•</span>
                    <span>🔥 Results announced in live zoom meet</span>
                </div>
            </div>

            {/* Cinematic Background (Only Step 1) */}
            {showCinematic && (
                <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#420C0C] via-[#2A0A0A] to-[#000000]" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 animate-pulse" />
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(15)].map((_, i) => (
                            <div key={i} className="absolute rounded-full bg-[#FFD700] opacity-30 animate-pulse" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, width: `${Math.random() * 3}px`, height: `${Math.random() * 3}px`, animationDuration: `${Math.random() * 3 + 2}s` }} />
                        ))}
                    </div>
                </div>
            )}

            {/* Main Content Layout */}
            <div className={`relative z-40 max-w-7xl mx-auto px-4 ${step === 1 && !showPlans ? 'min-h-[90vh]' : (step === 1 && showPlans ? 'max-w-4xl' : '')}`}>
                
                {/* Left Column (Title & Trust Indicators for Step 1) */}
                <div className={`${step === 1 && !showPlans ? 'pt-32 md:pt-40 lg:pt-48 pb-8 lg:pb-12' : ''}`}>
                    {showCinematic && !showPlans && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex flex-col items-center justify-center"
                        >
                            <div className="text-[#FFD700] text-sm md:text-base mb-4 tracking-[0.2em] font-serif border border-[#FFD700] px-4 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                                SEASON 2: THE EVOLUTION
                            </div>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-center leading-tight drop-shadow-[0_0_15px_rgba(255,215,0,0.3)] mb-10">
                                <span className="block text-[#E5D4B3]">INDIAN</span>
                                <span className="block text-[#FFD700] font-bold mt-[-10px]">WRITERS</span>
                                <span className="block text-[#E5D4B3] mt-2 text-3xl md:text-5xl tracking-[0.3em]">LEAGUE</span>
                            </h1>

                            {/* Trust Indicators - Glassmorphic Style */}
                            <div className="grid grid-cols-3 gap-2 md:gap-4 w-full max-w-lg mx-auto">
                                <div className="flex flex-col items-center justify-center text-center p-2 md:p-4 rounded-xl bg-black/40 border border-[#E0C097]/20 shadow-lg backdrop-blur-md transition-transform hover:-translate-y-1">
                                    <Lock className="w-4 h-4 md:w-6 md:h-6 text-[#FFD700] mb-1 md:mb-1.5" />
                                    <span className="text-[8px] md:text-xs font-black uppercase tracking-wider md:tracking-widest text-[#E5D4B3] leading-tight">100% Secure</span>
                                    <span className="text-[7px] md:text-[10px] text-[#A1887F] font-bold mt-0.5 md:mt-1 leading-tight">Payment Gateway</span>
                                </div>
                                <div className="flex flex-col items-center justify-center text-center p-2 md:p-4 rounded-xl bg-black/40 border border-[#E0C097]/20 shadow-lg backdrop-blur-md transition-transform hover:-translate-y-1">
                                    <User className="w-4 h-4 md:w-6 md:h-6 text-[#FFD700] mb-1 md:mb-1.5" />
                                    <span className="text-[8px] md:text-xs font-black uppercase tracking-wider md:tracking-widest text-[#E5D4B3] leading-tight">5,565+</span>
                                    <span className="text-[7px] md:text-[10px] text-[#A1887F] font-bold mt-0.5 md:mt-1 leading-tight">Writers Joined</span>
                                </div>
                                <div className="flex flex-col items-center justify-center text-center p-2 md:p-4 rounded-xl bg-black/40 border border-[#E0C097]/20 shadow-lg backdrop-blur-md transition-transform hover:-translate-y-1">
                                    <Scroll className="w-4 h-4 md:w-6 md:h-6 text-[#FFD700] mb-1 md:mb-1.5" />
                                    <span className="text-[8px] md:text-xs font-black uppercase tracking-wider md:tracking-widest text-[#E5D4B3] leading-tight">QR Verified</span>
                                    <span className="text-[7px] md:text-[10px] text-[#A1887F] font-bold mt-0.5 md:mt-1 leading-tight">Official Certificate</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Static Header for Subsequent Steps */}
                    {!showCinematic && step < 3 && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="pt-32 md:pt-40 pb-4 text-center"
                        >
                            <div className="inline-block mb-2 px-4 py-1 rounded-full border border-[#420C0C]/30 bg-white/50 backdrop-blur-md text-white font-[Cinzel] text-[10px] uppercase tracking-widest">Season 2: The Evolution</div>
                            <h1 className="text-3xl md:text-5xl font-[Cinzel] text-white">INDIAN WRITERS LEAGUE</h1>
                        </motion.div>
                    )}
                </div>

                {/* Right Column (Form Steps Content) */}
                <div className={`w-full ${step === 1 && !showPlans ? 'lg:pt-0 max-w-5xl mx-auto' : (step === 1 && showPlans ? 'pt-32 md:pt-40' : '')}`}>
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                                className="relative pb-32"
                            >
                                <StepRegistrationAndPlan
                                    formData={formData}
                                    setFormData={setFormData}
                                    onPayment={handlePayment}
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
            </div>
            </div>

            {/* Footer / Branding */}
            {step > 1 && step !== 5 && (
                <div className="text-center py-6 text-[#E0C097]/70 text-sm opacity-60">
                    Organized by Inkfetish | 199K+ Writers Community
                </div>
            )}

            {/* Global Loading Overlay */}
            <AnimatePresence>
                {(submitStatus === 'submitting' || submitStatus === 'success' || paymentStatus === 'verifying') && (
                    <LoadingOverlay status={submitStatus === 'success' ? 'success' : (paymentStatus === 'verifying' ? 'verifying' : 'submitting')} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Season2Client;
