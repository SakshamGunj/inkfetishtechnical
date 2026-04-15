import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, CheckCircle2, Heart, Feather, Loader2, Scroll, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { PeriskopeApi } from '@periskope/periskope-client';

const HeartsUnderConstructionRegistration = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [queueNumber, setQueueNumber] = useState<number | null>(null);

    useEffect(() => {
        // Set body background to black to prevent white flash on scroll
        document.body.style.backgroundColor = '#000';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        email: '',
        whatsapp: '',
        instagram: '',
        writingYears: '',
        publishedBefore: 'No',
        writingStyle: '', // e.g., Free verse, rhyming
        selectedStage: '', // New field
        loveExperience: '', // New field
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

        // Append specific fields to motivation for backward compatibility with Supabase schema
        const extendedMotivation = `
Anthology: Hearts Under Construction
Selected Stage: ${formData.selectedStage}
Love Experience: ${formData.loveExperience}

Motivation:
${formData.motivation}
        `.trim();

        try {
            // 1. Send to Make.com Webhook (using same webhook for now, or update if user provides new one)
            const webhookPromise = fetch('https://hook.eu1.make.com/o37lxne4un22zo3yqt5mw3glswurij1u', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, motivation: extendedMotivation, queue_number: newQueueNumber, anthology_name: 'Hearts Under Construction' })
            }).catch(err => console.error("Webhook Error", err));

            // 2. Send WhatsApp Message via Periskope SDK
            try {
                const client = new PeriskopeApi({
                    authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCIgOiAiYzIxOTljOWUtYzAxYy00YWNkLThmMzEtZDE2ZjY1NDYxZWRhIiwgInJvbGUiIDogImFwaSIsICJ0eXBlIiA6ICJhcGkiLCAibmFtZSIgOiAiaW5rZmV0aXNoIiwgImV4cCIgOiAyMDg0MzYxNjEyLCAiaWF0IiA6IDE3Njg4Mjg4MTIsICJzdWIiIDogImEwOGYzNTYyLWUzYjUtNDgxYy1iZTAwLThjZGVlMGUwZmZiOCIsICJpc3MiIDogInBlcmlza29wZS5hcHAiLCAibWV0YWRhdGEiIDogeyJzY29wZXMiOiBbIjkxNzg1MDk2MzcwOUBjLnVzIl19fQ.w6_zrLGMVpaA8gqu5INkZwhEmiKZf1qsof--b0Q28zU',
                    phone: '917850963709', // Sender Phone
                });

                await client.message.send({
                    chat_id: `91${formData.whatsapp}`,
                    message: `*Application Received* 🖤\n\nHi ${formData.name},\n\nThank you for applying to be a co-author in "Hearts Under Construction". 🚧❤️\n\nYour Queue Number is: *${newQueueNumber}*\n\nWe are looking for stories that bleed ink. We will review your application and get back to you.\n\nBest,\nTeam InkFetish`
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
                    genres: 'Poetry/Prose', // Defaulting for this specific anthology
                    dedication_hours: formData.dedicationHours,
                    bio_journey: formData.bioJourney,
                    motivation: extendedMotivation, // Storing extra fields here
                    writing_sample: '',
                    language_preference: 'English',
                    agreed_to_terms: formData.agreedToTerms,
                    queue_number: newQueueNumber
                }]);

            const [dbResult] = await Promise.all([dbPromise, webhookPromise]);

            if (dbResult.error) throw dbResult.error;
            setIsSuccess(true);
            // Redirect to Thank You page
            navigate('/anthology/thank-you', {
                state: {
                    queueNumber: newQueueNumber,
                    whatsappLink: 'https://chat.whatsapp.com/KdKUJW5fBLjC8b2qZN2354'
                }
            });
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
        <div className="min-h-screen bg-stone-950 font-serif flex flex-col md:flex-row overflow-hidden selection:bg-red-900 selection:text-white">
            <Helmet>
                <title>Apply as Co-Author | Hearts Under Construction</title>
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Courier+Prime:wght@400;700&display=swap');
                    .font-cinzel { font-family: 'Cinzel', serif; }
                    .font-playfair { font-family: 'Playfair Display', serif; }
                    .font-typewriter { font-family: 'Courier Prime', monospace; }
                `}</style>
            </Helmet>

            {/* --- LEFT COLUMN: CONTEXT & AESTHETIC --- */}
            <div className="w-full md:w-1/3 bg-black text-white relative flex flex-col justify-between p-6 md:p-12 border-r border-stone-800">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-20" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-900/10 rounded-full blur-[80px]" />

                <div className="relative z-10 space-y-8">
                    <button onClick={() => navigate('/anthology/hearts-under-construction')} className="flex items-center gap-2 text-stone-500 hover:text-white transition-colors text-xs uppercase tracking-widest font-typewriter">
                        <ArrowLeft className="w-4 h-4" /> <span>Back</span>
                    </button>

                    <div>
                        <h1 className="font-cinzel text-3xl md:text-5xl font-bold leading-tight">
                            Hearts Under <br /><span className="text-stone-400 italic font-playfair">Construction</span>
                        </h1>
                        <p className="text-red-800 font-typewriter text-xs uppercase tracking-widest mt-4">Co-Author Application</p>
                    </div>

                    <div className="p-6 border border-stone-800 bg-stone-900/30 backdrop-blur-sm rounded-sm relative">
                        <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-stone-600" />
                        <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-stone-600" />
                        <p className="font-playfair text-stone-300 italic text-sm md:text-base leading-relaxed">
                            "We are building a monument to the unsaid. Every poem is a brick, every confession mortar. Tread carefully, for you are walking on dreams."
                        </p>
                    </div>
                </div>

                <div className="relative z-10 mt-8 hidden md:block">
                    <div className="flex items-center gap-4 text-stone-500 text-xs font-typewriter uppercase tracking-widest">
                        <Feather className="w-4 h-4" />
                        <span>Inkfetish Publications</span>
                    </div>
                </div>
            </div>

            {/* --- RIGHT COLUMN: FORM --- */}
            <div className="w-full md:w-2/3 bg-stone-950 flex items-center justify-center p-4 md:p-8 relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-10" />

                <div className="w-full max-w-xl bg-black border border-stone-800 p-6 md:p-12 rounded-sm shadow-2xl relative z-10">

                    <>
                        <div className="mb-8 flex justify-between items-end border-b border-stone-800 pb-4">
                            <span className="font-typewriter text-stone-500 text-xs uppercase tracking-widest">Step 0{step} / 0{totalSteps}</span>
                            <span className="font-cinzel text-stone-300 text-sm">
                                {step === 1 ? 'Identity' : step === 2 ? 'The Writer' : step === 3 ? 'The Heart' : 'Oath'}
                            </span>
                        </div>

                        <AnimatePresence mode='wait'>
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-stone-500 uppercase font-typewriter block mb-2">Name</label>
                                            <input
                                                type="text"
                                                className="w-full bg-stone-900/50 border border-stone-800 p-3 text-stone-300 font-playfair focus:border-red-900/50 outline-none transition-colors"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder='Your pen name or real name'
                                                autoFocus
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-bold text-stone-500 uppercase font-typewriter block mb-2">Age</label>
                                                <input
                                                    type="number"
                                                    className="w-full bg-stone-900/50 border border-stone-800 p-3 text-stone-300 font-playfair focus:border-red-900/50 outline-none transition-colors"
                                                    value={formData.age}
                                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-stone-500 uppercase font-typewriter block mb-2">Gender</label>
                                                <select
                                                    className="w-full bg-stone-900/50 border border-stone-800 p-3 text-stone-300 font-playfair focus:border-red-900/50 outline-none transition-colors"
                                                    value={formData.gender}
                                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                                >
                                                    <option value="">Select</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-stone-500 uppercase font-typewriter block mb-2">Email</label>
                                            <input
                                                type="email"
                                                className="w-full bg-stone-900/50 border border-stone-800 p-3 text-stone-300 font-playfair focus:border-red-900/50 outline-none transition-colors"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder='For official correspondence'
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-stone-500 uppercase font-typewriter block mb-2">WhatsApp</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-3 text-stone-500 font-typewriter text-sm">+91</span>
                                                <input
                                                    type="tel"
                                                    maxLength={10}
                                                    className="w-full bg-stone-900/50 border border-stone-800 p-3 pl-12 text-stone-300 font-playfair focus:border-red-900/50 outline-none transition-colors"
                                                    value={formData.whatsapp}
                                                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value.replace(/\D/g, '') })}
                                                    placeholder='9999999999'
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
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-stone-500 uppercase font-typewriter block mb-2">Writing Experience</label>
                                            <select
                                                className="w-full bg-stone-900/50 border border-stone-800 p-3 text-stone-300 font-playfair focus:border-red-900/50 outline-none transition-colors"
                                                value={formData.writingYears}
                                                onChange={(e) => setFormData({ ...formData, writingYears: e.target.value })}
                                            >
                                                <option value="">How long have you been writing?</option>
                                                <option value="Just started">Just started</option>
                                                <option value="1-2 Years">1-2 Years</option>
                                                <option value="3+ Years">3+ Years</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-stone-500 uppercase font-typewriter block mb-2">Instagram Handle</label>
                                            <input
                                                type="text"
                                                className="w-full bg-stone-900/50 border border-stone-800 p-3 text-stone-300 font-playfair focus:border-red-900/50 outline-none transition-colors"
                                                value={formData.instagram}
                                                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                                                placeholder='@username'
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-stone-500 uppercase font-typewriter block mb-2">Bio / Journey</label>
                                            <textarea
                                                className="w-full bg-stone-900/50 border border-stone-800 p-3 text-stone-300 font-playfair focus:border-red-900/50 outline-none transition-colors h-24 resize-none"
                                                value={formData.bioJourney}
                                                onChange={(e) => setFormData({ ...formData, bioJourney: e.target.value })}
                                                placeholder='Tell us briefly about your relationship with words...'
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-stone-500 uppercase font-typewriter block mb-2">Which stage resonates with you?</label>
                                            <select
                                                className="w-full bg-stone-900/50 border border-stone-800 p-3 text-stone-300 font-playfair focus:border-red-900/50 outline-none transition-colors"
                                                value={formData.selectedStage}
                                                onChange={(e) => setFormData({ ...formData, selectedStage: e.target.value })}
                                            >
                                                <option value="">Select an Emotional Stage</option>
                                                <option value="The Wanting">Stage 1: The Wanting (Before Love)</option>
                                                <option value="The Falling">Stage 2: The Falling (New Love)</option>
                                                <option value="The Breaking">Stage 3: The Breaking (Conflict & Loss)</option>
                                                <option value="The Healing">Stage 4: The Healing (Recovery)</option>
                                                <option value="The Becoming">Stage 5: The Becoming (Self-Love)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-stone-500 uppercase font-typewriter block mb-2">Your Love Experience</label>
                                            <textarea
                                                className="w-full bg-stone-900/50 border border-stone-800 p-3 text-stone-300 font-playfair focus:border-red-900/50 outline-none transition-colors h-20 resize-none"
                                                value={formData.loveExperience}
                                                onChange={(e) => setFormData({ ...formData, loveExperience: e.target.value })}
                                                placeholder='Briefly share the story or emotion behind your choice...'
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-stone-500 uppercase font-typewriter block mb-2">Why this anthology?</label>
                                            <textarea
                                                className="w-full bg-stone-900/50 border border-stone-800 p-3 text-stone-300 font-playfair focus:border-red-900/50 outline-none transition-colors h-20 resize-none"
                                                value={formData.motivation}
                                                onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                                                placeholder='Why do you want to build this with us?'
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="p-6 border border-stone-800 bg-stone-900/30 rounded-lg">
                                        <Scroll className="w-8 h-8 text-stone-500 mb-4" />
                                        <h3 className="font-cinzel text-white text-lg mb-2">The Builder's Oath</h3>
                                        <p className="font-playfair text-stone-400 italic text-sm leading-relaxed">
                                            "I hereby dedicate my words to the architecture of emotion. I promise to be raw, honest, and unyielding in my expression. I understand that this is a collective effort to build a home for the unsaid."
                                        </p>
                                    </div>

                                    <label className="flex items-start gap-3 p-4 border border-stone-800 rounded-lg cursor-pointer hover:bg-stone-900/50 transition-colors group">
                                        <div className="pt-1">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 accent-red-900"
                                                checked={formData.agreedToTerms}
                                                onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                                            />
                                        </div>
                                        <span className="text-sm font-typewriter text-stone-500 group-hover:text-stone-300 transition-colors">
                                            I accept the oath and am ready to contribute.
                                        </span>
                                    </label>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="mt-8 flex gap-4">
                            {step > 1 && (
                                <button
                                    onClick={prevStep}
                                    className="px-6 py-3 border border-stone-800 text-stone-500 font-typewriter text-xs uppercase tracking-widest hover:text-white hover:border-stone-600 transition-all"
                                >
                                    Back
                                </button>
                            )}
                            <button
                                onClick={nextStep}
                                disabled={
                                    (step === 1 && (!formData.name || !formData.email || formData.whatsapp.length !== 10)) ||
                                    (step === 2 && (!formData.writingYears || !formData.bioJourney)) ||
                                    (step === 3 && (!formData.selectedStage || !formData.motivation)) ||
                                    (step === 4 && !formData.agreedToTerms) ||
                                    isSubmitting
                                }
                                className="flex-1 py-3 bg-stone-200 text-black font-cinzel font-bold uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin w-4 h-4" /> : step === totalSteps ? 'Submit' : 'Next'}
                                {!isSubmitting && step !== totalSteps && <ArrowRight className="w-4 h-4" />}
                            </button>
                        </div>
                    </>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 text-stone-800">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-[10px] font-typewriter uppercase tracking-widest">Est. 2026</span>
                </div>
            </div>
        </div>
    );
};

export default HeartsUnderConstructionRegistration;
