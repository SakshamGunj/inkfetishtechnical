'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Award, Gift, Eye, Sparkles, Heart } from 'lucide-react';

const benefits = [
  {
    icon: Bookmark,
    title: "1. YOUR NAME IN A REAL PUBLISHED BOOK",
    desc: "Not a PDF. Not a digital certificate. A real, physical, printed book — with your name inside it. The kind of book you can show your parents. Put on your shelf. Point to and say, 'I wrote that.'",
    emotional: "For many of our writers, this was the very first time their writing existed outside a phone or a notebook. The feeling? They say it's indescribable."
  },
  {
    icon: Award,
    title: "2. AN OFFICIAL CERTIFICATE OF PUBLICATION",
    desc: "We provide a certificate of publication for every contributing author. Add it to your resume. Share it on LinkedIn. Frame it on your wall.",
    emotional: "It's yours — and it's real proof that you are a published writer."
  },
  {
    icon: Gift,
    title: "3. AN EXCLUSIVE WRITER'S KIT",
    desc: "For eligible anthologies, every participating writer receives a curated writer's kit — delivered to their doorstep.",
    emotional: "Because you deserve more than just a 'thank you.'"
  },
  {
    icon: Eye,
    title: "4. REAL EXPOSURE — PEOPLE ACTUALLY READ IT",
    desc: "We don't print and forget. We promote our anthologies actively. When you're in our book, readers find your words.",
    emotional: "Real people. People who feel what you write. That's the kind of exposure that matters."
  },
  {
    icon: Sparkles,
    title: "5. THE CONFIDENCE TO CALL YOURSELF A WRITER",
    desc: "This is the one people don't talk about enough. When you join an Inkfetish anthology — when you submit, get accepted, and see your name in print — something shifts inside you.",
    emotional: "You stop saying 'I like writing' and start saying 'I am a writer.' That shift? That's the most important thing we offer."
  },
  {
    icon: Heart,
    title: "6. A COMMUNITY OF WRITERS LIKE YOU",
    desc: "You'll be part of a growing family of writers — people who feel exactly what you feel, who face exactly what you face, and who are choosing to rise above it.",
    emotional: "Writers who celebrate each other. Writers who grow together. You are not alone in this."
  }
];

export function BenefitsSection() {
  return (
    <section className="py-24 md:py-32 bg-white relative border-y border-ink-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">WHY JOIN AN INKFETISH ANTHOLOGY?</h3>
          <h4 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tighter mb-4">
            "What You Get Is <br/>
            <span className="italic font-light text-ink-600 lowercase">much more than a book.</span>"
          </h4>
          <p className="text-base text-ink-400 font-sans max-w-xl mx-auto">
            When you join an Inkfetish anthology, you don't just get published. You get something you'll carry with you forever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {benefits.map((benefit, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-start relative group"
            >
              {/* Badge Icon Container */}
              <div className="relative mb-8">
                 <div className="w-14 h-14 bg-[#FDFBF7] border border-ink-900 shadow-[4px_4px_0px_0px_#D4AF37] flex items-center justify-center relative z-10 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                    <benefit.icon className="w-6 h-6 text-gold" strokeWidth={1.5} />
                 </div>
                 {/* Decorative Pulse Background */}
                 <div className="absolute inset-0 bg-gold/5 rounded-full scale-150 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <h5 className="relative text-sm font-sans font-black uppercase tracking-widest text-ink-900 mb-6 leading-tight">
                <span className="relative z-10">{benefit.title}</span>
                <span className="absolute -left-2 -right-2 bottom-0 h-3 bg-gold/5 -z-0 transform skew-x-12" />
              </h5>

              <div className="space-y-4">
                <p className="text-sm text-ink-600 font-sans leading-relaxed">{benefit.desc}</p>
                <p className="text-xs text-ink-400 font-sans italic leading-relaxed pt-4 border-t border-ink-900/5">{benefit.emotional}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
