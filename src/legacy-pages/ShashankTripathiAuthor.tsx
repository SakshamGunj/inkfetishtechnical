import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Instagram, BookOpen, PenTool, Sparkles, Star, MapPin } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Image from 'next/image';

const ShashankTripathiAuthor = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-ink-950 text-parchment font-serif selection:bg-indigo-500/30 selection:text-indigo-200">
      <Helmet>
        <title>Shashank Tripathi | Poet & Writer</title>
        <meta name="description" content="The official portfolio of Shashank Tripathi, a B.Tech student who paints pictures with his words. Exploring self-discovery through ghazals and stories." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Subtle Background Textures & Gradients */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs text-indigo-300 uppercase tracking-[0.3em] font-sans">
                <Sparkles className="w-3 h-3" />
                Student & Poet
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white">
                  Shashank <br />
                  <span className="text-indigo-400 italic font-medium">Tripathi</span>
                </h1>
                <p className="text-xl md:text-2xl text-parchment/60 font-light italic">
                  "Painting pictures not with paints, but with words."
                </p>
              </div>

              <p className="text-lg text-parchment/70 leading-relaxed max-w-lg font-light">
                A 21-year-old engineering student venturing into a world visible only to a few. Exploring the depths of self-discovery through ghazals, stories, and the quiet spaces between words.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a href="#journey" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-sm font-sans text-sm uppercase tracking-widest transition-all hover:shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                  Explore the Journey
                </a>
                <a href="#projects" className="px-8 py-4 border border-indigo-500/30 hover:bg-indigo-500/10 text-indigo-300 rounded-sm font-sans text-sm uppercase tracking-widest transition-all">
                  Current Works
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="relative lg:ml-auto w-full max-w-md mx-auto"
            >
              <div className="aspect-[4/5] relative rounded-t-full overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(79,70,229,0.15)] group">
                <div className="absolute inset-0 bg-indigo-900/20 mix-blend-multiply z-10 group-hover:bg-transparent transition-colors duration-700" />
                <div className="w-full h-full bg-zinc-800 flex items-center justify-center relative">
                  {/* Placeholder for actual image */}
                  <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/40 to-ink-950/80" />
                  <PenTool className="w-24 h-24 text-indigo-400/50 absolute" />
                  <div className="absolute bottom-10 left-0 right-0 text-center z-20">
                    <p className="text-xs uppercase tracking-[0.4em] text-white/50 mb-2">Age 21</p>
                    <p className="text-lg font-light italic text-indigo-200">The Journey Begins</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* The Origin / Journey */}
      <section id="journey" className="py-24 bg-ink-900/50 border-y border-white/5 relative">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-light text-white">The Genesis</h2>
            <div className="w-16 h-[1px] bg-indigo-500/50 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-lg text-parchment/80 font-light leading-relaxed">
              <p>
                It all started in <span className="text-indigo-300 font-normal">2024</span> when a young boy decided to test his thoughts, curious to see where they might lead him. 
              </p>
              <p>
                While traveling, he realized those thoughts were guiding him into a world visible only to a very few—a world that defies any single definition. What began as an experiment transformed into a profound journey of creative expression.
              </p>
            </div>
            
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-indigo-500/20 rounded-full flex items-center justify-center border border-indigo-500/40">
                <Star className="w-4 h-4 text-indigo-400" />
              </div>
              <h3 className="text-xl text-white mb-4 font-medium">The Catalysts</h3>
              <p className="text-parchment/70 font-light leading-relaxed mb-4">
                Two guiding forces shaped this path: A physics teacher—a Shayar himself—whom Shashank honors with the title <span className="italic text-indigo-300">"Ustaad"</span>.
              </p>
              <p className="text-parchment/70 font-light leading-relaxed">
                And a close friend who relentlessly encouraged him, convincing him that beautiful pictures don't require paints; they can be drawn with words. That friend became the seed from which the flowers of his thoughts bloomed and his verbal paintings found their colors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Projects */}
      <section id="projects" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <div className="grid md:grid-cols-2 gap-16">
            
            {/* The Goal */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-light text-white">The Vision</h2>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-indigo-500/50 to-transparent" />
              </div>
              <div className="p-8 bg-gradient-to-br from-indigo-900/20 to-transparent border border-indigo-500/20 rounded-tr-3xl rounded-bl-3xl">
                <p className="text-xl md:text-2xl text-indigo-200 font-light italic leading-relaxed">
                  "To be able to identify and answer 'who am I' without any external sources and without looking into a mirror."
                </p>
              </div>
            </div>

            {/* Current Works */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-light text-white">In Progress</h2>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-indigo-500/50 to-transparent" />
              </div>
              
              <div className="space-y-4">
                <div className="group p-6 bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all rounded-lg flex items-start gap-4">
                  <BookOpen className="w-6 h-6 text-indigo-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg text-white font-medium mb-2 group-hover:text-indigo-300 transition-colors">A Volume of Ghazals</h4>
                    <p className="text-parchment/60 font-light text-sm">Expanding his first collection of poetic expressions, diving deeper into rhythm, emotion, and philosophical inquiry.</p>
                  </div>
                </div>

                <div className="group p-6 bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all rounded-lg flex items-start gap-4">
                  <PenTool className="w-6 h-6 text-indigo-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg text-white font-medium mb-2 group-hover:text-indigo-300 transition-colors">Debut Novelette</h4>
                    <p className="text-parchment/60 font-light text-sm">Currently in the planning stages of a novelette, translating his unique worldview from poetry into prose.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Message to the World */}
      <section className="py-32 bg-ink-950 relative border-t border-white/5 flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
          <div className="w-12 h-12 border border-indigo-500/30 rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="text-indigo-400 text-2xl font-serif">"</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-light leading-relaxed text-white mb-8">
            Never underestimate your art, it is one of the easiest things one can do to meet himself. Practice, preach, pursue—but don't abandon your art. It is something which makes life a little colorful.
          </h2>
          <p className="text-sm font-sans tracking-[0.3em] text-indigo-400 uppercase">
            — Shashank Tripathi
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-ink-charcoal text-center px-6">
        <div className="flex justify-center gap-6 mb-8">
          <a href="mailto:inkfetishh@gmail.com" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-parchment/60 hover:bg-indigo-500 hover:text-white transition-all">
            <Mail className="w-4 h-4" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-parchment/60 hover:bg-indigo-500 hover:text-white transition-all">
            <Instagram className="w-4 h-4" />
          </a>
        </div>
        <p className="text-xs text-parchment/40 tracking-widest uppercase font-sans">
          © {new Date().getFullYear()} Shashank Tripathi. All Rights Reserved.
        </p>
        <p className="text-[10px] text-parchment/30 mt-2 font-sans">
          Published by Inkfetish
        </p>
      </footer>
    </div>
  );
};

export default ShashankTripathiAuthor;
