import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, Feather, Loader2, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { PeriskopeApi } from '@periskope/periskope-client';

const LoveAnthologyRegistration = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [queueNumber, setQueueNumber] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        email: '',
        whatsapp: '',
        instagram: '',
        writingYears: '',
        publishedBefore: 'No',
        writingStyle: '',
        genres: '',
        dedicationHours: '3-5 Hours/Week',
        bioJourney: '',
        motivation: '',
        agreedToTerms: false
    });

    const totalSteps = 4;
    const progress = (step / totalSteps) * 100;

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // Generate random queue number between 10 and 25
        const newQueueNumber = Math.floor(Math.random() * (25 - 10 + 1)) + 10;
        setQueueNumber(newQueueNumber);

        try {
            // 1. Send to Make.com Webhook
            const webhookPromise = fetch('https://hook.eu1.make.com/o37lxne4un22zo3yqt5mw3glswurij1u', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, queue_number: newQueueNumber })
            }).catch(err => console.error("Webhook Error", err));

            // 2. Send WhatsApp Message via Periskope SDK
            try {
                const client = new PeriskopeApi({
                    authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCIgOiAiYzIxOTljOWUtYzAxYy00YWNkLThmMzEtZDE2ZjY1NDYxZWRhIiwgInJvbGUiIDogImFwaSIsICJ0eXBlIiA6ICJhcGkiLCAibmFtZSIgOiAiaW5rZmV0aXNoIiwgImV4cCIgOiAyMDg0MzYxNjEyLCAiaWF0IiA6IDE3Njg4Mjg4MTIsICJzdWIiIDogImEwOGYzNTYyLWUzYjUtNDgxYy1iZTAwLThjZGVlMGUwZmZiOCIsICJpc3MiIDogInBlcmlza29wZS5hcHAiLCAibWV0YWRhdGEiIDogeyJzY29wZXMiOiBbIjkxNzg1MDk2MzcwOUBjLnVzIl19fQ.w6_zrLGMVpaA8gqu5INkZwhEmiKZf1qsof--b0Q28zU',
                    phone: '917850963709', // Sender Phone
                });

                await client.message.send({
                    chat_id: `91${formData.whatsapp}`,
                    message: `*Application Received* 📝✨\n\nHi ${formData.name},\n\nThank you for applying to be a co-author in "Love at -1°C". ❄️\n\nYour Queue Number is: *${newQueueNumber}*\n\nNote: We are not selecting all members, so I hope you have given your best. We will analyze your application thoroughly and then select the best candidates. 🧐🖋️\n\nIf your profile is shortlisted, we will update you about your selection and the seat booking process.\n\nBest,\nTeam InkFetish 💙`
                });
            } catch (err) {
                console.error("Periskope SDK Error", err);
            }

            // 3. Insert into Supabase
            const dbPromise = supabase
                .from('anthology_applications')
                .insert([{
                    name: formData.name,
                    age: formData.age,
                    gender: formData.gender,
                    email: formData.email,
                    whatsapp: formData.whatsapp,
                    instagram: formData.instagram,
                    writing_years: formData.writingYears,
                    published_before: formData.publishedBefore,
                    writing_style: formData.writingStyle,
                    genres: formData.genres,
                    dedication_hours: formData.dedicationHours,
                    bio_journey: formData.bioJourney,
                    motivation: formData.motivation,
                    writing_sample: '',
                    language_preference: 'English',
                    agreed_to_terms: formData.agreedToTerms,
                    queue_number: newQueueNumber
                }]);

            const [dbResult] = await Promise.all([dbPromise, webhookPromise]);

            if (dbResult.error) throw dbResult.error;
            setIsSuccess(true);
        } catch (error: any) {
            console.error('Error submitting application:', error);
            alert(`Error: ${error.message || 'Something went wrong. Please try again.'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = () => {
        if (step < totalSteps) setStep(step + 1);
        else handleSubmit();
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-serif flex flex-col md:flex-row overflow-hidden selection:bg-blue-100 selection:text-blue-900">
            <Helmet>
                <title>Apply as Co-Author | Love at Minus One</title>
                <meta name="description" content="Official Co-Author Application for 'Love at Minus One'. Join 130+ writers in this premium anthology by Inkfetish." />
                <meta property="og:title" content="Apply as Co-Author | Love at Minus One" />
                <meta property="og:description" content="Official Co-Author Application for 'Love at Minus One'. Join 130+ writers in this premium anthology by Inkfetish." />
                <meta property="og:image" content="https://www.inkfetish.in/images/link_preview_card_v2.jpg" />
                <meta property="og:url" content="https://www.inkfetish.in/love-at-minus-one/register" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image" content="https://www.inkfetish.in/images/link_preview_card_v2.jpg" />
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap');
                    .font-cinzel { font-family: 'Cinzel', serif; }
                    .font-playfair { font-family: 'Playfair Display', serif; }
                    .font-lato { font-family: 'Lato', sans-serif; }
                `}</style>
            </Helmet>

            {/* --- LEFT COLUMN: CONTEXT & TRUST --- */}
            <div className="w-full md:w-1/3 bg-slate-900 text-white relative flex flex-col justify-between p-5 md:p-12 h-auto md:min-h-screen">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px]" />

                <div className="relative z-10">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 md:mb-8 text-xs md:text-sm uppercase tracking-widest font-lato">
                        <ArrowLeft className="w-4 h-4" /> <span className="hidden md:inline">Back to Anthology</span>
                    </button>

                    <h1 className="font-cinzel text-xl md:text-4xl font-bold mb-2">Love at <br /><span className="text-blue-400">Minus One</span></h1>
                    <p className="text-slate-400 font-lato text-[10px] md:text-xs uppercase tracking-widest mb-6 md:mb-12">Official Co-Author Application</p>

                    <div className="bg-blue-900/40 p-4 rounded-xl border border-blue-500/20 backdrop-blur-sm">
                        <p className="font-playfair text-blue-100 leading-relaxed italic text-sm md:text-base">
                            "Please fill this form with serious intent. After reviewing your application, I, <strong className="text-white">Sherin</strong> (Owner of InkFetish), will personally message you on Email or WhatsApp for the seat booking process."
                        </p>
                    </div>
                </div>

                <div className="relative z-10 mt-6 md:mt-0 pt-6 md:pt-8 border-t border-slate-800 hidden md:block">
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Writers Joined</p>
                            <p className="text-2xl font-bold font-cinzel">132</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Spots Left</p>
                            <p className="text-2xl font-bold font-cinzel text-blue-400">68</p>
                        </div>
                    </div>
                    <div className="w-full bg-slate-800 h-1 mt-4 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full w-[66%]" />
                    </div>
                </div>
            </div>

            {/* --- RIGHT COLUMN: FORM --- */}
            <div className="w-full md:w-2/3 bg-slate-50 flex items-center justify-center p-4 md:p-6 relative">


                <div className="w-full max-w-lg bg-white p-6 md:p-12 rounded-3xl shadow-xl border border-slate-100 relative">
                    {isSuccess ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-12"
                        >
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <h2 className="font-cinzel text-3xl font-bold text-slate-900 mb-4">Application Received!</h2>
                            <p className="font-playfair text-slate-600 text-lg mb-4">
                                Your queue number is <strong className="text-slate-900">{queueNumber}</strong> and we will review your application and let you know.
                                <br /><br />
                                Check your email and whatsapp also if you have given whatsapp number okay.
                            </p>

                            <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl mb-8">
                                <p className="text-xs uppercase tracking-widest text-blue-600 font-bold mb-2">Your Application Queue Number</p>
                                <p className="text-4xl font-cinzel font-bold text-slate-900">#{queueNumber}</p>
                            </div>
                            <button
                                onClick={() => navigate('/')}
                                className="px-8 py-3 bg-slate-900 text-white font-lato text-sm uppercase tracking-widest font-bold rounded hover:bg-slate-800 transition-colors"
                            >
                                Return Home
                            </button>
                        </motion.div>
                    ) : (
                        <>
                            <div className="mb-8 flex justify-between items-center">
                                <span className="text-xs font-bold font-lato text-slate-400 uppercase tracking-widest">Step {step} of {totalSteps}</span>
                                <span className="text-xs font-bold font-lato text-blue-600 uppercase tracking-widest">
                                    {step === 1 ? 'Personal & Contact' : step === 2 ? 'Writing Background' : step === 3 ? 'Submission' : 'Confirm'}
                                </span>
                            </div>

                            {/* In-Card Progress Bar */}
                            <div className="w-full bg-slate-100 h-1.5 rounded-full mb-8 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.5 }}
                                    className="h-full bg-blue-600 rounded-full"
                                />
                            </div>

                            <AnimatePresence mode='wait'>
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <h2 className="font-cinzel text-2xl font-bold text-slate-900">Personal & Contact Details</h2>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-600 uppercase">Full Name</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 outline-none transition-all font-playfair text-base placeholder:text-slate-300"
                                                    placeholder="e.g. Aditi Sharma"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    autoFocus
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-600 uppercase">Age</label>
                                                <input
                                                    type="number"
                                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 outline-none transition-all font-playfair text-base placeholder:text-slate-300"
                                                    placeholder="e.g. 24"
                                                    value={formData.age}
                                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-600 uppercase">Gender</label>
                                            <select
                                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 outline-none transition-all font-playfair text-base text-slate-800"
                                                value={formData.gender}
                                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="Female">Female</option>
                                                <option value="Male">Male</option>
                                                <option value="Non-binary">Non-binary</option>
                                                <option value="Prefer not to say">Prefer not to say</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-600 uppercase">Email Address</label>
                                            <input
                                                type="email"
                                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 outline-none transition-all font-playfair text-base placeholder:text-slate-300"
                                                placeholder="name@example.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-600 uppercase">WhatsApp Number</label>
                                                <div className="relative">
                                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-slate-200 pr-2">
                                                        <span className="text-sm">🇮🇳</span>
                                                        <span className="font-playfair text-slate-500 text-sm">+91</span>
                                                    </div>
                                                    <input
                                                        type="tel"
                                                        maxLength={10}
                                                        className="w-full p-3 pl-20 bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 outline-none transition-all font-playfair text-base placeholder:text-slate-300"
                                                        placeholder="99999 99999"
                                                        value={formData.whatsapp}
                                                        onChange={(e) => {
                                                            const val = e.target.value.replace(/\D/g, '');
                                                            setFormData({ ...formData, whatsapp: val });
                                                        }}
                                                    />
                                                </div>
                                                {formData.whatsapp && formData.whatsapp.length !== 10 && (
                                                    <p className="text-red-500 text-[10px] font-bold mt-1">Please add 10 digits number</p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-600 uppercase">Instagram Handle</label>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">@</span>
                                                    <input
                                                        type="text"
                                                        className="w-full p-3 pl-8 bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 outline-none transition-all font-playfair text-base placeholder:text-slate-300"
                                                        placeholder="username"
                                                        value={formData.instagram}
                                                        onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <h2 className="font-cinzel text-2xl font-bold text-slate-900">Your Writing Background</h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-600 uppercase">How long have you been writing?</label>
                                                <select
                                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 outline-none transition-all font-playfair text-base text-slate-800"
                                                    value={formData.writingYears}
                                                    onChange={(e) => setFormData({ ...formData, writingYears: e.target.value })}
                                                >
                                                    <option value="">Select Duration</option>
                                                    <option value="Less than 1 year">Less than 1 year</option>
                                                    <option value="1-3 years">1-3 years</option>
                                                    <option value="3-5 years">3-5 years</option>
                                                    <option value="5+ years">5+ years</option>
                                                </select>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-600 uppercase">Have you been published before?</label>
                                                <div className="flex gap-4 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                                                    {['Yes', 'No'].map(opt => (
                                                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                                            <input
                                                                type="radio"
                                                                name="publishedBefore"
                                                                value={opt}
                                                                checked={formData.publishedBefore === opt}
                                                                onChange={(e) => setFormData({ ...formData, publishedBefore: e.target.value })}
                                                                className="accent-blue-600"
                                                            />
                                                            <span className="font-playfair text-sm">{opt}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-600 uppercase">Describe your writing style</label>
                                            <input
                                                type="text"
                                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 outline-none transition-all font-playfair text-base placeholder:text-slate-300"
                                                placeholder="e.g. Emotional & Raw..."
                                                value={formData.writingStyle}
                                                onChange={(e) => setFormData({ ...formData, writingStyle: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-600 uppercase">What kind (genre) of poetry do you usually write?</label>
                                            <input
                                                type="text"
                                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 outline-none transition-all font-playfair text-base placeholder:text-slate-300"
                                                placeholder="e.g. Poetry, Romance..."
                                                value={formData.genres}
                                                onChange={(e) => setFormData({ ...formData, genres: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-600 uppercase">Weekly Dedication</label>
                                            <select
                                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 outline-none transition-all font-playfair text-base text-slate-800"
                                                value={formData.dedicationHours}
                                                onChange={(e) => setFormData({ ...formData, dedicationHours: e.target.value })}
                                            >
                                                <option value="1-2 Hours/Week">1-2 Hours/Week</option>
                                                <option value="3-5 Hours/Week">3-5 Hours/Week</option>
                                                <option value="5+ Hours/Week">5+ Hours/Week</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-600 uppercase">Tell us about yourself and your journey</label>
                                            <textarea
                                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 outline-none transition-all font-playfair text-sm placeholder:text-slate-300 h-24 resize-none"
                                                placeholder="Your inspiration, struggles, or dreams..."
                                                value={formData.bioJourney}
                                                onChange={(e) => setFormData({ ...formData, bioJourney: e.target.value })}
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <h2 className="font-cinzel text-2xl font-bold text-slate-900">Submission & Intent</h2>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-600 uppercase">Why do you want to be part of "Love at Minus One"?</label>
                                            <textarea
                                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 outline-none transition-all font-playfair text-base placeholder:text-slate-300 h-24 resize-none"
                                                placeholder="Tell us your motivation..."
                                                value={formData.motivation}
                                                onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                {step === 4 && (
                                    <motion.div
                                        key="step4"
                                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <h2 className="font-cinzel text-2xl font-bold text-slate-900">Final Commitment</h2>

                                        <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl space-y-4">
                                            <h4 className="font-bold text-blue-900 flex items-center gap-2"><Feather className="w-4 h-4" /> Co-Author Oath</h4>
                                            <p className="text-sm text-blue-800 leading-relaxed italic">
                                                "I hereby pledge to submit my most honest and heartfelt poetry to this anthology. I understand that this is a collaborative journey, and I am dedicated to giving my best effort to make <strong className="not-italic">Love at Minus One</strong> a masterpiece."
                                            </p>
                                        </div>

                                        <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                                            <input
                                                type="checkbox"
                                                className="w-5 h-5 accent-blue-600"
                                                checked={formData.agreedToTerms}
                                                onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                                            />
                                            <span className="text-sm font-bold text-slate-700">I accept the oath & am ready to begin.</span>
                                        </label>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="mt-10 flex gap-4 pt-6 border-t border-slate-100">
                                {step > 1 && (
                                    <button
                                        onClick={prevStep}
                                        className="flex-1 py-4 border border-slate-200 text-slate-600 font-bold uppercase tracking-widest hover:bg-slate-50 transition-colors rounded-lg flex items-center justify-center gap-2"
                                    >
                                        Back
                                    </button>
                                )}
                                <button
                                    onClick={nextStep}
                                    disabled={
                                        (step === 1 && (!formData.name || !formData.email || !formData.gender || formData.whatsapp.length !== 10)) ||
                                        (step === 2 && (!formData.writingYears || !formData.writingStyle || !formData.genres || !formData.bioJourney)) ||
                                        (step === 3 && (!formData.motivation)) ||
                                        (step === 4 && !formData.agreedToTerms) ||
                                        isSubmitting
                                    }
                                    className="flex-1 py-4 bg-slate-900 text-white font-bold uppercase tracking-widest hover:bg-blue-600 transition-colors rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                                >
                                    {isSubmitting ? <Loader2 className="animate-spin w-5 h-5" /> : step === totalSteps ? 'Submit Application' : 'Next Step'}
                                    {!isSubmitting && step !== totalSteps && <ArrowRight className="w-4 h-4" />}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoveAnthologyRegistration;
