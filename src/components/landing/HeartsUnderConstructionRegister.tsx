'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Check, Trophy, Users, Mail, User, Phone, FileText, Pen, Star, Shield, Zap, BookOpen, Award, Instagram, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { GlassmorphismCard } from './shared/GlassmorphismCard';

/**
 * HeartsUnderConstructionRegister Component
 * 
 * High-converting co-author registration inspired by Alex Hormozi:
 * - Clear value proposition (what they get)
 * - Social proof and urgency
 * - Simple, friction-free form
 * - Value stack visible
 * - Trust signals throughout
 */
export default function HeartsUnderConstructionRegister() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    instagramHandle: '',
    poemTitle: '',
    poemContent: '',
    agreeTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Submit to Firebase/Supabase
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setRegistrationComplete(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Success State
  if (registrationComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] via-[#FFF8F0] to-[#FDFBF7] flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl w-full text-center"
        >
          <GlassmorphismCard className="p-12 md:p-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-[#c5a059] to-[#d4b06f] flex items-center justify-center mx-auto mb-8 shadow-2xl"
            >
              <Trophy className="w-12 h-12 text-white" strokeWidth={2} />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-ink-900 mb-6">
              Welcome to the Family! 🎉
            </h1>
            
            <p className="text-xl md:text-2xl font-sans text-ink-700 mb-8 leading-relaxed">
              You're officially a <span className="font-bold text-[#c5a059]">Published Co-Author</span> of Hearts Under Construction!
            </p>

            <div className="bg-gradient-to-r from-[#c5a059]/10 via-[#c5a059]/5 to-[#c5a059]/10 border-2 border-[#c5a059]/30 rounded-xl p-8 mb-10">
              <h3 className="font-serif text-2xl font-bold text-ink-900 mb-6">What Happens Next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#c5a059]/20 flex items-center justify-center mb-4">
                    <Mail className="w-8 h-8 text-[#c5a059]" />
                  </div>
                  <h4 className="font-sans font-bold text-ink-900 mb-2">Check Your Email</h4>
                  <p className="text-sm font-sans text-ink-600">
                    Confirmation + contract sent within 24 hours
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#c5a059]/20 flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-[#c5a059]" />
                  </div>
                  <h4 className="font-sans font-bold text-ink-900 mb-2">Join the Community</h4>
                  <p className="text-sm font-sans text-ink-600">
                    Connect with 41 other co-authors
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#c5a059]/20 flex items-center justify-center mb-4">
                    <BookOpen className="w-8 h-8 text-[#c5a059]" />
                  </div>
                  <h4 className="font-sans font-bold text-ink-900 mb-2">Get Published</h4>
                  <p className="text-sm font-sans text-ink-600">
                    Your work goes live in 4-6 weeks
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-10">
              <div className="flex items-center justify-center gap-3 text-ink-600">
                <Check className="w-5 h-5 text-[#c5a059]" strokeWidth={3} />
                <span className="font-sans">Your poem is under review</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-ink-600">
                <Check className="w-5 h-5 text-[#c5a059]" strokeWidth={3} />
                <span className="font-sans">Author profile being created</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-ink-600">
                <Check className="w-5 h-5 text-[#c5a059]" strokeWidth={3} />
                <span className="font-sans">You'll receive 3 FREE author copies</span>
              </div>
            </div>

            <Link 
              href="/hearts-under-construction"
              className="inline-block bg-ink-900 text-[#FDFBF7] px-10 py-4 rounded-lg font-sans font-bold uppercase tracking-wider hover:bg-[#c5a059] hover:text-ink-900 transition-all"
            >
              Back to Landing Page
            </Link>
          </GlassmorphismCard>
        </motion.div>
      </div>
    );
  }

  // Main Registration Form
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] via-[#FFF8F0] to-[#FDFBF7] py-12 px-4">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto mb-8">
        <Link href="/hearts-under-construction" className="inline-flex items-center gap-2 text-ink-600 hover:text-ink-900 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-sans text-sm">Back to Landing Page</span>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-[#c5a059] to-[#d4b06f] flex items-center justify-center shadow-2xl"
            >
              <Pen className="w-10 h-10 text-white" strokeWidth={2} />
            </motion.div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-ink-900 mb-6 leading-tight">
            Become a Published Co-Author
          </h1>
          
          <p className="text-xl md:text-2xl font-sans text-ink-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Share your healing journey. Get published alongside 41 other poets. Reach 200,000+ readers.
          </p>

          {/* Urgency Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#c5a059] to-[#d4b06f] text-white px-8 py-4 rounded-full shadow-xl"
          >
            <Zap className="w-5 h-5" strokeWidth={2} />
            <span className="font-sans font-bold text-sm md:text-base uppercase tracking-wide">
              Only 8 Spots Left • Closes in 7 Days
            </span>
          </motion.div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Registration Form - Left (3/5) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <GlassmorphismCard className="p-8 md:p-12">
            <div className="mb-8">
              <h2 className="text-3xl font-serif font-bold text-ink-900 mb-3">
                Submit Your Poem
              </h2>
              <p className="text-base font-sans text-ink-600">
                Fill out the form below. We'll review your submission within 48 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-sans font-bold text-ink-900 mb-2 uppercase tracking-wide">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-ink-900/20 rounded-xl font-sans text-ink-900 text-lg focus:outline-none focus:ring-2 focus:ring-[#c5a059] focus:border-transparent transition-all"
                    placeholder="Your full name as it will appear in print"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-sans font-bold text-ink-900 mb-2 uppercase tracking-wide">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-ink-900/20 rounded-xl font-sans text-ink-900 text-lg focus:outline-none focus:ring-2 focus:ring-[#c5a059] focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-sans font-bold text-ink-900 mb-2 uppercase tracking-wide">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-ink-900/20 rounded-xl font-sans text-ink-900 text-lg focus:outline-none focus:ring-2 focus:ring-[#c5a059] focus:border-transparent transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              {/* Instagram Handle */}
              <div>
                <label htmlFor="instagramHandle" className="block text-sm font-sans font-bold text-ink-900 mb-2 uppercase tracking-wide">
                  Instagram Handle (Optional)
                </label>
                <div className="relative">
                  <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
                  <input
                    type="text"
                    id="instagramHandle"
                    name="instagramHandle"
                    value={formData.instagramHandle}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-ink-900/20 rounded-xl font-sans text-ink-900 text-lg focus:outline-none focus:ring-2 focus:ring-[#c5a059] focus:border-transparent transition-all"
                    placeholder="@yourhandle"
                  />
                </div>
                <p className="mt-2 text-xs font-sans text-ink-500">
                  We'll tag you when we promote the anthology
                </p>
              </div>

              {/* Poem Title */}
              <div>
                <label htmlFor="poemTitle" className="block text-sm font-sans font-bold text-ink-900 mb-2 uppercase tracking-wide">
                  Poem Title *
                </label>
                <div className="relative">
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
                  <input
                    type="text"
                    id="poemTitle"
                    name="poemTitle"
                    required
                    value={formData.poemTitle}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-ink-900/20 rounded-xl font-sans text-ink-900 text-lg focus:outline-none focus:ring-2 focus:ring-[#c5a059] focus:border-transparent transition-all"
                    placeholder="Give your poem a title"
                  />
                </div>
              </div>

              {/* Poem Content */}
              <div>
                <label htmlFor="poemContent" className="block text-sm font-sans font-bold text-ink-900 mb-2 uppercase tracking-wide">
                  Your Poem *
                </label>
                <textarea
                  id="poemContent"
                  name="poemContent"
                  required
                  value={formData.poemContent}
                  onChange={handleChange}
                  rows={12}
                  className="w-full px-4 py-4 border-2 border-ink-900/20 rounded-xl font-serif text-ink-900 text-lg leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#c5a059] focus:border-transparent transition-all resize-none"
                  placeholder="Paste your poem here...

Theme: Heartbreak, healing, and reconstruction

Keep it real. Keep it raw. Keep it you."
                />
                <p className="mt-2 text-xs font-sans text-ink-500">
                  Maximum 500 words • Must be original work
                </p>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 p-4 bg-ink-900/5 rounded-xl">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  required
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 text-[#c5a059] border-2 border-ink-900/30 rounded focus:ring-2 focus:ring-[#c5a059]"
                />
                <label htmlFor="agreeTerms" className="text-sm font-sans text-ink-700 leading-relaxed">
                  I confirm this is my original work and I agree to Inkfetish's publishing terms. I understand I'll receive 3 FREE author copies and my work will be featured in the anthology.
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.agreeTerms}
                  className="w-full bg-gradient-to-r from-ink-900 to-ink-800 text-[#FDFBF7] py-5 rounded-xl font-sans font-bold text-lg uppercase tracking-wider hover:from-[#c5a059] hover:to-[#d4b06f] hover:text-ink-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-3 border-[#FDFBF7] border-t-transparent rounded-full animate-spin" />
                      Submitting Your Poem...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6" />
                      Submit & Become a Co-Author
                    </>
                  )}
                </button>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4 text-xs font-sans text-ink-500">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#c5a059]" />
                  <span>100% Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#c5a059]" />
                  <span>No Hidden Fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#c5a059]" />
                  <span>Response in 48hrs</span>
                </div>
              </div>
            </form>
          </GlassmorphismCard>
        </motion.div>

        {/* Value Stack - Right (2/5) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="sticky top-8 space-y-6">
            {/* What You Get */}
            <GlassmorphismCard className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#c5a059]/20 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-[#c5a059]" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-ink-900">
                  What You Get
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#c5a059] flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                  <div>
                    <p className="font-sans font-bold text-ink-900">Published Co-Author Status</p>
                    <p className="text-sm font-sans text-ink-600">Your name in print forever</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#c5a059] flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                  <div>
                    <p className="font-sans font-bold text-ink-900">3 FREE Author Copies</p>
                    <p className="text-sm font-sans text-ink-600">Worth ₹1,497 • Shipped to you</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#c5a059] flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                  <div>
                    <p className="font-sans font-bold text-ink-900">Reach 200,000+ Readers</p>
                    <p className="text-sm font-sans text-ink-600">Inkfetish community exposure</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#c5a059] flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                  <div>
                    <p className="font-sans font-bold text-ink-900">Author Profile Page</p>
                    <p className="text-sm font-sans text-ink-600">Your own page on our website</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#c5a059] flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                  <div>
                    <p className="font-sans font-bold text-ink-900">Social Media Features</p>
                    <p className="text-sm font-sans text-ink-600">We promote you to our audience</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#c5a059] flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                  <div>
                    <p className="font-sans font-bold text-ink-900">Co-Author Community Access</p>
                    <p className="text-sm font-sans text-ink-600">Network with 41 other poets</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#c5a059] flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                  <div>
                    <p className="font-sans font-bold text-ink-900">ISBN & Copyright</p>
                    <p className="text-sm font-sans text-ink-600">Professional publishing standards</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t-2 border-ink-900/10">
                <div className="text-center">
                  <p className="text-sm font-sans text-ink-600 mb-2">Total Value</p>
                  <p className="text-4xl font-serif font-bold text-ink-900 mb-2">₹2,997</p>
                  <p className="text-2xl font-sans font-bold text-[#c5a059]">Your Investment: ₹0</p>
                  <p className="text-xs font-sans text-ink-500 mt-2">100% FREE to submit</p>
                </div>
              </div>
            </GlassmorphismCard>

            {/* Social Proof */}
            <GlassmorphismCard className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-[#c5a059] fill-[#c5a059]" />
                <Star className="w-5 h-5 text-[#c5a059] fill-[#c5a059]" />
                <Star className="w-5 h-5 text-[#c5a059] fill-[#c5a059]" />
                <Star className="w-5 h-5 text-[#c5a059] fill-[#c5a059]" />
                <Star className="w-5 h-5 text-[#c5a059] fill-[#c5a059]" />
              </div>
              <p className="text-sm font-sans text-ink-700 italic mb-3">
                "Being published in an Inkfetish anthology changed my life. I went from writing in my diary to being a recognized poet."
              </p>
              <p className="text-xs font-sans font-bold text-ink-900">— Priya M., Co-Author</p>
            </GlassmorphismCard>

            {/* Urgency */}
            <GlassmorphismCard className="p-6 bg-gradient-to-br from-[#c5a059]/10 to-[#c5a059]/5 border-2 border-[#c5a059]/30">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-6 h-6 text-[#c5a059]" />
                <h4 className="font-sans font-bold text-ink-900 text-lg">Limited Spots</h4>
              </div>
              <p className="text-sm font-sans text-ink-700 mb-4">
                We're accepting only 42 co-authors total. 34 spots are already filled. Don't miss your chance to be published.
              </p>
              <div className="flex items-center gap-2 text-xs font-sans text-ink-600">
                <Users className="w-4 h-4" />
                <span>8 spots remaining</span>
              </div>
            </GlassmorphismCard>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
