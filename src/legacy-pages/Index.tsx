import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, BookOpen, Trophy, 
  PenTool, Library, Edit3, Globe,
  Feather, Sparkles, MoveRight, Star,
  Quote
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-ink-900 font-serif selection:bg-ink-900 selection:text-[#FDFBF7]">
      <Navbar />

      {/* 1. Hero Section (The Imprint) */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-24 pb-12">
        {/* Subtle SVG Grid Background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-col items-center text-center w-full max-w-4xl"
          >
            {/* Prominent Logo */}
            <div className="mb-10 relative group">
              <div className="w-48 h-48 md:w-56 md:h-56 bg-white rounded-full border border-ink-900/10 flex items-center justify-center overflow-hidden transition-transform duration-1000 group-hover:scale-105 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
                <img 
                  src="/images/inkfetish_logo.png" 
                  alt="Inkfetish Publication" 
                  className="w-[85%] h-[85%] object-contain" 
                />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1] text-ink-900">
              Publishing Defined by <br />
              <span className="italic font-light flex items-center justify-center gap-4 mt-2">
                <span className="h-px w-12 md:w-24 bg-ink-900/30 hidden sm:block"></span>
                Art & Authorship
                <span className="h-px w-12 md:w-24 bg-ink-900/30 hidden sm:block"></span>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-ink-600 max-w-2xl mx-auto mb-10 font-sans font-light leading-relaxed">
              An independent publishing house dedicated to discovering raw literary talent, elevating manuscripts with exquisite design, and launching modern legends globally.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto mt-4">
              <Link to="/authors" className="w-full sm:w-auto">
                <Button className="w-full bg-ink-900 text-[#FDFBF7] hover:bg-ink-800 text-sm px-10 py-7 rounded-none font-sans uppercase tracking-[0.2em] transition-all border border-ink-900 group">
                  Our Authors
                  <MoveRight className="w-4 h-4 ml-3 opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all" strokeWidth={1.5} />
                </Button>
              </Link>
              <Link to="/services" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full bg-transparent text-ink-900 hover:bg-ink-900/5 hover:text-ink-900 text-sm px-10 py-7 rounded-none font-sans uppercase tracking-[0.2em] transition-all border border-ink-900/30">
                  Publishing Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative Editorial Lines */}
        <div className="absolute bottom-0 left-0 w-full flex justify-between px-8 sm:px-16 opacity-30">
          <div className="w-px h-32 bg-ink-900"></div>
          <div className="w-px h-16 bg-ink-900 mt-16"></div>
          <div className="w-px h-24 bg-ink-900 mt-8"></div>
        </div>
      </section>

      {/* 2. Global Impact Stats (New Trust Element) */}
      <section className="bg-white border-y border-ink-900/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-ink-900/10">
              
              <div className="flex flex-col items-center justify-center text-center px-4">
                <div className="text-4xl md:text-5xl font-serif font-bold text-ink-900 mb-2">10k+</div>
                <div className="text-[10px] md:text-xs font-sans uppercase tracking-[0.2em] text-ink-500">Writers Placed</div>
              </div>

              <div className="flex flex-col items-center justify-center text-center px-4">
                <div className="text-4xl md:text-5xl font-serif font-bold text-ink-900 mb-2">40+</div>
                <div className="text-[10px] md:text-xs font-sans uppercase tracking-[0.2em] text-ink-500">Imprints Published</div>
              </div>

              <div className="flex flex-col items-center justify-center text-center px-4">
                <div className="text-4xl md:text-5xl font-serif font-bold text-ink-900 mb-2">15</div>
                <div className="text-[10px] md:text-xs font-sans uppercase tracking-[0.2em] text-ink-500">Global Markets</div>
              </div>

              <div className="flex flex-col items-center justify-center text-center px-4">
                <div className="text-4xl md:text-5xl font-serif font-bold text-ink-900 mb-2 text-gold">#1</div>
                <div className="text-[10px] md:text-xs font-sans uppercase tracking-[0.2em] text-ink-500">Boutique Publisher</div>
              </div>

           </div>
        </div>
      </section>

      {/* 3. The 200k+ Cult & Us vs Them (Direct Response) */}
      <section className="py-24 md:py-32 bg-[#FDFBF7] relative border-b border-ink-900/10 overflow-hidden">
        {/* Subtle IG Gradient background via abstract line art */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.1,-46.3C90.4,-33.5,96.1,-18.1,95.5,-2.9C94.9,12.3,88,27.3,77.7,39.1C67.4,50.9,53.7,59.5,39.6,65.2C25.5,70.9,11,73.7,-3.6,79.5C-18.2,85.3,-32.9,94.1,-45.3,88.9C-57.7,83.7,-67.8,64.5,-75.4,47.8C-83,31.1,-88.1,16.9,-87.6,3.1C-87.1,-10.7,-81,-24.1,-73.4,-36.5C-65.8,-48.9,-56.7,-60.3,-44.7,-68.8C-32.7,-77.3,-18.9,-82.9,-3.9,-76.6C11.1,-70.3,26.2,-52.1,38.2,-41.8C50.2,-31.5,59.1,-29.1,64.3,-21.8Z" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
             <h2 className="text-xs font-sans uppercase tracking-[0.3em] text-ink-500 mb-6 drop-shadow-sm">The Movement</h2>
             <h3 className="text-4xl md:text-6xl font-serif font-bold text-ink-900 leading-tight mb-8">
               Backed By Over <br/>
               <span className="italic font-light">200,000 Writers.</span>
             </h3>
             <p className="font-sans font-light text-ink-600 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
               The traditional publishing hierarchy is slow, predatory, and disconnected. We built <span className="font-bold text-ink-900">Inkfetish</span> because writers deserve more than rejection letters. They deserve a platform that treats their words like physical art.
             </p>
             <p className="font-sans font-light text-ink-600 text-lg md:text-xl leading-relaxed mb-10 max-w-xl border-l-2 border-ink-900 pl-6">
               Join the largest literature and writer's page on Instagram <a href="https://instagram.com/ink.fetish" target="_blank" rel="noreferrer" className="text-ink-900 font-bold hover:underline">@ink.fetish</a>. You are no longer shouting into the void. You have an audience waiting.
             </p>
             
             <div className="flex items-center gap-4">
               <a href="https://instagram.com/ink.fetish" target="_blank" rel="noreferrer">
                 <Button className="bg-ink-900 text-[#FDFBF7] hover:bg-ink-800 rounded-none font-sans uppercase tracking-[0.2em] px-10 py-7 text-xs transition-all shadow-none">
                   Join The 2 Lakh+ Cult
                 </Button>
               </a>
             </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="aspect-square border border-ink-900/10 bg-white p-8 flex flex-col justify-between group shadow-xl hover:shadow-2xl transition-all duration-700">
              <div className="flex justify-between items-start">
                 <div className="w-12 h-12 bg-[#FDFBF7] border border-ink-900/10 flex items-center justify-center rounded-full">
                    <Feather className="w-5 h-5 text-ink-900" strokeWidth={1} />
                 </div>
                 <div className="text-xs font-sans font-bold tracking-widest uppercase text-ink-500">Instagram</div>
              </div>
              
              <div className="text-center my-8">
                 <div className="text-6xl md:text-7xl font-serif font-bold text-ink-900 mb-2">200K<span className="text-gold">+</span></div>
                 <div className="text-sm font-sans uppercase tracking-[0.3em] text-ink-500">Active Followers</div>
              </div>

              <div className="border border-ink-900/10 p-4 bg-[#FDFBF7]">
                 <p className="text-xs font-sans italic text-ink-600 text-center leading-relaxed">
                   "Inkfetish is the heartbeat of modern literature in India."<br/>
                   <span className="font-bold font-serif not-italic mt-2 block">— The Community</span>
                 </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Line-Art Trust Badges (The Inkfetish Standard) */}
      <section className="py-20 bg-white border-b border-ink-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h3 className="text-3xl font-serif font-bold text-ink-900">The Inkfetish Standard</h3>
             <p className="font-sans font-light text-sm uppercase tracking-widest text-ink-500 mt-2">No Compromises. Complete Transparency.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-ink-900/10 divide-y md:divide-y-0 md:divide-x divide-ink-900/10">
              {/* Trust Badge 1 */}
              <div className="p-12 flex flex-col items-center text-center bg-[#FDFBF7] hover:bg-white transition-colors duration-500 group">
                 <div className="w-16 h-16 border border-ink-900/20 rounded-full flex items-center justify-center bg-white mb-6 group-hover:-translate-y-2 transition-transform duration-500">
                   <Trophy className="w-6 h-6 text-ink-900" strokeWidth={1} />
                 </div>
                 <h4 className="text-xl font-serif font-bold text-ink-900 mb-2">100% Rights Retained</h4>
                 <p className="font-sans font-light text-ink-600 text-sm leading-relaxed">
                   You wrote it. You own it. We don't take your intellectual property. We simply give your book the premium physical form it deserves.
                 </p>
              </div>

              {/* Trust Badge 2 */}
              <div className="p-12 flex flex-col items-center text-center bg-[#FDFBF7] hover:bg-white transition-colors duration-500 group">
                 <div className="w-16 h-16 border border-ink-900/20 rounded-full flex items-center justify-center bg-white mb-6 group-hover:-translate-y-2 transition-transform duration-500">
                   <Star className="w-6 h-6 text-ink-900" strokeWidth={1} />
                 </div>
                 <h4 className="text-xl font-serif font-bold text-ink-900 mb-2">Museum-Grade Design</h4>
                 <p className="font-sans font-light text-ink-600 text-sm leading-relaxed">
                   We refuse to use template covers. Every book features bespoke line-art design, premium paper stock, and meticulous interior typesetting.
                 </p>
              </div>

              {/* Trust Badge 3 */}
              <div className="p-12 flex flex-col items-center text-center bg-[#FDFBF7] hover:bg-white transition-colors duration-500 group">
                 <div className="w-16 h-16 border border-ink-900/20 rounded-full flex items-center justify-center bg-white mb-6 group-hover:-translate-y-2 transition-transform duration-500">
                   <Globe className="w-6 h-6 text-ink-900" strokeWidth={1} />
                 </div>
                 <h4 className="text-xl font-serif font-bold text-ink-900 mb-2">Global Royalties</h4>
                 <p className="font-sans font-light text-ink-600 text-sm leading-relaxed">
                   Direct distribution to thousands of retailers worldwide. Transparent dashboards. Completely frictionless global royalty payments.
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* 5. Featured Books & Authors */}
      <section className="py-16 md:py-24 bg-[#FDFBF7] relative border-b border-ink-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 pb-8 border-b border-ink-900/10">
            <div>
              <h2 className="text-xs font-sans uppercase tracking-[0.3em] text-ink-500 mb-2">Our Imprint</h2>
              <h3 className="text-3xl md:text-4xl font-bold font-serif text-ink-900">Featured Releases</h3>
            </div>
            <Link to="/catalog" className="hidden md:flex items-center text-xs font-sans uppercase tracking-widest text-ink-900 hover:text-ink-600 transition-colors">
              View Catalog <MoveRight className="w-4 h-4 ml-2" strokeWidth={1} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Book Placeholder 1 */}
            <Link to="/love-at-minus-one/manuscript" className="group">
              <div className="aspect-[2/3] border border-ink-900/10 bg-[#FDFBF7] p-6 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:bg-ink-900/5">
                {/* SVG Decorative Book Frame */}
                <div className="absolute inset-4 border border-ink-900/20 opacity-50 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
                <BookOpen className="w-12 h-12 text-ink-900/30 group-hover:text-ink-900/60 transition-colors duration-500 mb-4" strokeWidth={0.5} />
                <div className="text-center font-serif text-ink-900 opacity-60 group-hover:opacity-100 transition-opacity">
                  <div className="text-sm font-light italic">The Anthology</div>
                  <div className="font-bold mt-1 text-lg">Love at Minus One</div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <h4 className="font-bold text-ink-900 font-serif">Love at Minus One</h4>
                <p className="text-xs uppercase tracking-widest font-sans text-ink-500 mt-1">Various Authors</p>
              </div>
            </Link>

            {/* Book Placeholder 2 */}
            <Link to="/books/shakespeare-and-what-remained" className="group">
              <div className="aspect-[2/3] border border-ink-900/10 bg-[#FDFBF7] p-6 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:bg-ink-900/5">
                <div className="absolute inset-4 border border-ink-900/20 opacity-50 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center">
                   <div className="w-px h-full bg-ink-900/10 absolute left-1/4"></div>
                </div>
                <Feather className="w-12 h-12 text-ink-900/30 group-hover:text-ink-900/60 transition-colors duration-500 mb-4 z-10" strokeWidth={0.5} />
                <div className="text-center font-serif text-ink-900 opacity-60 group-hover:opacity-100 transition-opacity z-10">
                  <div className="text-sm font-light italic">Classic Poetry</div>
                  <div className="font-bold mt-1 text-lg leading-tight">Shakespeare &<br/>What Remained</div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <h4 className="font-bold text-ink-900 font-serif">Shakespeare & What Remained</h4>
                <p className="text-xs uppercase tracking-widest font-sans text-ink-500 mt-1">Poetry Collection</p>
              </div>
            </Link>

            {/* Book Placeholder 3 */}
            <Link to="/books/silfira" className="group">
              <div className="aspect-[2/3] border border-ink-900/10 bg-[#FDFBF7] p-6 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:bg-ink-900/5">
                <div className="absolute inset-4 border border-ink-900/20 opacity-50 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
                <Sparkles className="w-12 h-12 text-ink-900/30 group-hover:text-ink-900/60 transition-colors duration-500 mb-4" strokeWidth={0.5} />
                <div className="text-center font-serif text-ink-900 opacity-60 group-hover:opacity-100 transition-opacity">
                  <div className="text-sm font-light italic">Fantasy Fiction</div>
                  <div className="font-bold mt-1 text-lg">Silfira</div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <h4 className="font-bold text-ink-900 font-serif">Silfira</h4>
                <p className="text-xs uppercase tracking-widest font-sans text-ink-500 mt-1">Anwesha</p>
              </div>
            </Link>

            {/* Author Profiling Block */}
            <Link to="/authors" className="group flex flex-col justify-center h-full p-8 border border-ink-900/10 bg-ink-900 text-[#FDFBF7] hover:bg-ink-800 transition-colors">
              <div className="w-12 h-12 rounded-full border border-[#FDFBF7]/30 flex items-center justify-center mb-6">
                <Library className="w-5 h-5 text-[#FDFBF7]" strokeWidth={1} />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4 leading-tight">Discover Our Authors</h3>
              <p className="font-sans font-light text-ink-300 text-sm mb-8">
                Explore the complete roster of voices defining the modern Indian literary scene.
              </p>
              <div className="flex items-center text-xs font-sans uppercase tracking-[0.2em] mt-auto">
                Explore Directory <MoveRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" strokeWidth={1.5} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Testimonials (New Trust Element) */}
      <section className="py-20 lg:py-32 bg-[#FDFBF7] border-t border-ink-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center w-full max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-sans uppercase tracking-[0.3em] text-ink-500 mb-4">Critical Acclaim</h2>
            <h3 className="text-4xl font-serif font-bold text-ink-900">Voices of Inkfetish</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink-900/10 border border-ink-900/10">
             
             {/* Testimonial 1 */}
             <div className="bg-white p-12 lg:p-16 flex flex-col relative text-center items-center">
                <Quote className="w-12 h-12 text-ink-900/10 absolute top-8 left-8" strokeWidth={1} />
                <p className="font-serif text-xl md:text-2xl text-ink-900 italic leading-relaxed mb-10 z-10 relative mt-4">
                  "Inkfetish didn't just publish my book; they elevated my entire narrative. Their editorial precision is unmatched in the indie space."
                </p>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border border-ink-900/20 p-1 mb-4 flex items-center justify-center">
                    <Feather className="w-5 h-5 text-ink-900/40" strokeWidth={1} />
                  </div>
                  <h4 className="font-sans font-bold text-ink-900 uppercase tracking-widest text-sm">Author Name</h4>
                  <p className="font-sans font-light text-ink-500 text-xs mt-1">Bestselling Author of X</p>
                </div>
             </div>

             {/* Testimonial 2 */}
             <div className="bg-white p-12 lg:p-16 flex flex-col relative text-center items-center">
                <Quote className="w-12 h-12 text-ink-900/10 absolute top-8 right-8 transform rotate-180" strokeWidth={1} />
                <p className="font-serif text-xl md:text-2xl text-ink-900 italic leading-relaxed mb-10 z-10 relative mt-4">
                  "The quality of the physical print and the bespoke line-art design was breathtaking. They treat publishing like a true art form."
                </p>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border border-ink-900/20 p-1 mb-4 flex items-center justify-center">
                    <Feather className="w-5 h-5 text-ink-900/40" strokeWidth={1} />
                  </div>
                  <h4 className="font-sans font-bold text-ink-900 uppercase tracking-widest text-sm">Author Name</h4>
                  <p className="font-sans font-light text-ink-500 text-xs mt-1">Poetry Finalist</p>
                </div>
             </div>

          </div>
        </div>
      </section>

      {/* 5. Comprehensive Publishing Services */}
      <section className="py-20 lg:py-32 bg-white border-t border-ink-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center w-full max-w-2xl mx-auto mb-20">
            <h2 className="text-xs font-sans uppercase tracking-[0.3em] text-ink-500 mb-4">Our Services</h2>
            <h3 className="text-4xl font-serif font-bold text-ink-900 mb-8">The Inkfetish Standard</h3>
            <p className="font-sans font-light text-ink-600 leading-relaxed">
              We provide a full-spectrum publishing ecosystem. From the first structural edit to international distribution, our in-house experts ensure your manuscript becomes a beautiful, physical reality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink-900/10 border border-ink-900/10">
            
            {/* Editorial */}
            <div className="bg-[#FDFBF7] p-12 hover:bg-white transition-colors flex flex-col items-center text-center group">
              <div className="w-20 h-20 mb-8 border border-ink-900/20 rounded-full flex items-center justify-center bg-white group-hover:scale-110 transition-transform duration-500">
                <Edit3 className="w-8 h-8 text-ink-900" strokeWidth={0.5} />
              </div>
              <h4 className="text-xl font-serif font-bold text-ink-900 mb-4">Editorial Mastery</h4>
              <p className="font-sans font-light text-ink-600 text-sm leading-relaxed">
                Rigorous developmental and line editing to refine your voice and construct a compelling narrative arc, without compromising your original vision.
              </p>
            </div>

            {/* Design */}
            <div className="bg-[#FDFBF7] p-12 hover:bg-white transition-colors flex flex-col items-center text-center group">
              <div className="w-20 h-20 mb-8 border border-ink-900/20 rounded-full flex items-center justify-center bg-white group-hover:scale-110 transition-transform duration-500">
                <PenTool className="w-8 h-8 text-ink-900" strokeWidth={0.5} />
              </div>
              <h4 className="text-xl font-serif font-bold text-ink-900 mb-4">Bespoke Design</h4>
              <p className="font-sans font-light text-ink-600 text-sm leading-relaxed">
                Award-winning minimalist and line-art aesthetic cover designs, paired with meticulous interior typesetting for a premium reading experience.
              </p>
            </div>

            {/* Distribution */}
            <div className="bg-[#FDFBF7] p-12 hover:bg-white transition-colors flex flex-col items-center text-center group">
              <div className="w-20 h-20 mb-8 border border-ink-900/20 rounded-full flex items-center justify-center bg-white group-hover:scale-110 transition-transform duration-500">
                <Globe className="w-8 h-8 text-ink-900" strokeWidth={0.5} />
              </div>
              <h4 className="text-xl font-serif font-bold text-ink-900 mb-4">Global Distribution</h4>
              <p className="font-sans font-light text-ink-600 text-sm leading-relaxed">
                Print-on-demand networks ensuring your paperback reaches major retailers worldwide, supported by strategic launch marketing built from day one.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/services">
              <Button variant="outline" className="bg-transparent border border-ink-900 hover:bg-ink-900 hover:text-white rounded-none font-sans uppercase tracking-[0.2em] text-xs transition-colors py-6 px-12">
                View Publishing Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Competitions & Literary Events */}
      <section className="py-16 md:py-24 bg-ink-900 text-[#FDFBF7] relative overflow-hidden">
        {/* Abstract Background Art */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
            <svg className="w-[150%] h-[150%] max-w-none text-white animate-spin-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.2">
                <circle cx="50" cy="50" r="40" />
                <circle cx="50" cy="50" r="30" />
                <line x1="10" y1="50" x2="90" y2="50" />
                <line x1="50" y1="10" x2="50" y2="90" />
            </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-xs font-sans uppercase tracking-[0.3em] text-ink-300 mb-4">Literary Opportunities</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold mb-6">Forge Your Legacy</h3>
            <div className="w-px h-16 bg-[#FDFBF7]/30 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* The Writer's Vault */}
            <Link to="/journey" className="block border border-[#FDFBF7]/20 p-8 hover:bg-[#FDFBF7] hover:text-ink-900 transition-colors duration-500 group">
              <h4 className="text-2xl font-serif font-bold mb-3">The Writer's Vault</h4>
              <p className="font-sans font-light text-sm mb-6 opacity-80 group-hover:opacity-100">
                Gamify your daily writing habit. Build discipline alongside thousands of writers and earn access to publishing contracts through consistent daily output.
              </p>
              <div className="flex items-center text-xs font-sans uppercase tracking-widest font-semibold mt-auto">
                Enter The Vault <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.5} />
              </div>
            </Link>

            {/* Indian Writers League */}
            <Link to="/indian-writers-league" className="block border border-[#FDFBF7]/20 p-8 hover:bg-[#FDFBF7] hover:text-ink-900 transition-colors duration-500 group">
               <h4 className="text-2xl font-serif font-bold mb-3">Indian Writers League</h4>
              <p className="font-sans font-light text-sm mb-6 opacity-80 group-hover:opacity-100">
                A prestigious national literary battleground. Compete against the finest minds across India and secure your place as a nationally recognized author.
              </p>
              <div className="flex items-center text-xs font-sans uppercase tracking-widest font-semibold mt-auto">
                View Leaderboard <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.5} />
              </div>
            </Link>

            {/* Love at Minus One */}
            <Link to="/love-at-minus-one" className="block border border-[#FDFBF7]/20 p-8 hover:bg-[#FDFBF7] hover:text-ink-900 transition-colors duration-500 group relative">
              <div className="absolute top-4 right-4">
                <span className="border border-[#FDFBF7]/30 text-[9px] uppercase tracking-widest px-2 py-1 group-hover:border-ink-900">Open Call</span>
              </div>
               <h4 className="text-2xl font-serif font-bold mb-3 pr-12">Love at Minus One</h4>
              <p className="font-sans font-light text-sm mb-6 opacity-80 group-hover:opacity-100">
                Submit your manuscript to become a published co-author in our upcoming, fully-produced print anthology focusing on heartbreak and resilience.
              </p>
              <div className="flex items-center text-xs font-sans uppercase tracking-widest font-semibold mt-auto">
                Submit Story <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.5} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Submissions / Call to Action Component */}
      <section className="py-20 lg:py-32 bg-white flex flex-col items-center justify-center relative border-b border-ink-900/10">
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-ink-900/20 to-transparent"></div>
        <div className="text-center max-w-3xl px-4 z-10 relative">
          <Feather className="w-8 h-8 mx-auto text-ink-900 mb-8" strokeWidth={1} />
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-ink-900 mb-6">Ready to Publish?</h2>
          <p className="text-ink-600 font-sans font-light text-lg mb-10 leading-relaxed">
            We are actively seeking new voices bridging literary fiction, raw poetry, and narrative non-fiction. Review our guidelines and send us your finest work.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/learning/15-day-guide">
              <Button className="w-full sm:w-auto bg-ink-900 text-[#FDFBF7] border border-ink-900 hover:bg-ink-800 rounded-none px-12 py-8 text-sm font-sans uppercase tracking-[0.2em] transition-all">
                Publishing Guidelines
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="w-full sm:w-auto bg-transparent text-ink-900 border border-ink-900/20 hover:bg-ink-900 hover:text-white rounded-none px-12 py-8 text-sm font-sans uppercase tracking-[0.2em] transition-all">
                Contact Desk
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Refined Footer */}
      <footer className="bg-[#FDFBF7] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center justify-center">
              <div className="w-24 h-24 bg-white rounded-full border border-ink-900/10 flex items-center justify-center overflow-hidden shadow-sm">
                <img src="/images/inkfetish_logo.png" alt="Inkfetish Publication" className="w-[85%] h-[85%] object-contain" />
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs font-sans uppercase tracking-[0.15em] text-ink-600">
              <Link to="/" className="hover:text-ink-900 transition-colors">Imprint</Link>
              <Link to="/authors" className="hover:text-ink-900 transition-colors">Our Authors</Link>
              <Link to="/catalog" className="hover:text-ink-900 transition-colors">Catalog</Link>
              <Link to="/services" className="hover:text-ink-900 transition-colors">Services</Link>
              <Link to="/contact" className="hover:text-ink-900 transition-colors">Contact</Link>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-ink-900/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-ink-500 font-light">
            <p>&copy; {new Date().getFullYear()} Inkfetish Publication. All rights reserved.</p>
            <p>Designed with absolute minimalism.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
