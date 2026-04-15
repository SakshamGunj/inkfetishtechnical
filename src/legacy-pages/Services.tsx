import React from 'react';
import { motion } from 'framer-motion';
import { Edit3, CheckCircle2, Globe, PenTool, ArrowRight, Library } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';

const Services = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-ink-900 font-serif selection:bg-ink-900 selection:text-[#FDFBF7]">
      <Navbar />

      {/* Services Hero */}
      <section className="pt-40 pb-20 relative border-b border-ink-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full max-w-4xl mx-auto"
          >
            <h2 className="text-xs font-sans uppercase tracking-[0.3em] text-ink-500 mb-6">Partner With Us</h2>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif text-ink-900 mb-8 leading-tight">
              The Inkfetish <br/><span className="italic font-light">Suite.</span>
            </h1>
            <p className="text-lg md:text-xl text-ink-600 font-sans font-light leading-relaxed mb-12 max-w-2xl mx-auto">
              We offer bespoke, high-end publishing packages tailored for authors who refuse to compromise on editorial integrity and physical quality.
            </p>
            <div className="w-px h-16 bg-ink-900/20 mx-auto"></div>
          </motion.div>
        </div>
      </section>

      {/* The Tiers */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* The Editorial Pass */}
            <div className="border border-ink-900/10 bg-[#FDFBF7] p-10 flex flex-col group hover:border-ink-900/30 transition-colors duration-500">
              <div className="w-16 h-16 mb-8 border border-ink-900/20 rounded-full flex items-center justify-center bg-white group-hover:bg-ink-900 group-hover:text-white transition-colors duration-500">
                <Edit3 className="w-6 h-6 text-ink-900 group-hover:text-[#FDFBF7] transition-colors" strokeWidth={1} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-ink-900 mb-2">The Editorial Pass</h3>
              <p className="font-sans text-xs uppercase tracking-widest text-ink-500 mb-8">For the Finished Draft</p>
              
              <ul className="space-y-4 mb-12 flex-grow">
                {['Comprehensive line editing', 'Structural & developmental review', 'Proofreading & grammar checks', 'Author voice preservation'].map((item, i) => (
                  <li key={i} className="flex items-start text-ink-600 font-sans font-light text-sm">
                    <CheckCircle2 className="w-4 h-4 mr-3 text-ink-900/40 mt-0.5 shrink-0" strokeWidth={1.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-8 border-t border-ink-900/10">
                <Button variant="outline" className="w-full bg-transparent border border-ink-900/20 hover:bg-ink-900 hover:text-white rounded-none font-sans uppercase tracking-[0.2em] text-xs transition-colors py-6">
                  Inquire Now
                </Button>
              </div>
            </div>

            {/* The Complete Edition (Featured) */}
            <div className="border-2 border-ink-900 bg-ink-900 text-[#FDFBF7] p-10 flex flex-col relative transform lg:-translate-y-4 shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FDFBF7] text-ink-900 border border-ink-900 px-4 py-1 text-[10px] uppercase font-sans font-bold tracking-widest">
                Most Chosen
              </div>
              <div className="w-16 h-16 mb-8 border border-[#FDFBF7]/30 rounded-full flex items-center justify-center bg-transparent mt-4">
                <Library className="w-6 h-6 text-[#FDFBF7]" strokeWidth={1} />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-2">The Complete Edition</h3>
              <p className="font-sans text-xs uppercase tracking-widest text-ink-400 mb-8">End-to-End Publishing</p>
              
              <ul className="space-y-4 mb-12 flex-grow">
                {['Full Editorial Pass included', 'Bespoke line-art cover design', 'Meticulous interior typesetting', 'ISBN & Copyright registration', 'Amazon & Flipkart Distribution'].map((item, i) => (
                  <li key={i} className="flex items-start text-ink-300 font-sans font-light text-sm">
                    <CheckCircle2 className="w-4 h-4 mr-3 text-gold mt-0.5 shrink-0" strokeWidth={1.5} />
                    <span className="text-[#FDFBF7]">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-8 border-t border-[#FDFBF7]/20">
                <Button className="w-full bg-[#FDFBF7] text-ink-900 hover:bg-white rounded-none font-sans uppercase tracking-[0.2em] text-xs transition-colors py-6 shadow-none">
                  Begin Publishing
                </Button>
              </div>
            </div>

            {/* The Bestseller Campaign */}
            <div className="border border-ink-900/10 bg-[#FDFBF7] p-10 flex flex-col group hover:border-ink-900/30 transition-colors duration-500">
              <div className="w-16 h-16 mb-8 border border-ink-900/20 rounded-full flex items-center justify-center bg-white group-hover:bg-ink-900 group-hover:text-white transition-colors duration-500">
                <Globe className="w-6 h-6 text-ink-900 group-hover:text-[#FDFBF7] transition-colors" strokeWidth={1} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-ink-900 mb-2">Bestseller Campaign</h3>
              <p className="font-sans text-xs uppercase tracking-widest text-ink-500 mb-8">Marketing & Reach</p>
              
              <ul className="space-y-4 mb-12 flex-grow">
                {['Global Print-on-Demand setup', 'Targeted social media PR', 'Influencer/Reviewer outreach', 'Author brand consultation'].map((item, i) => (
                  <li key={i} className="flex items-start text-ink-600 font-sans font-light text-sm">
                    <CheckCircle2 className="w-4 h-4 mr-3 text-ink-900/40 mt-0.5 shrink-0" strokeWidth={1.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-8 border-t border-ink-900/10">
                <Button variant="outline" className="w-full bg-transparent border border-ink-900/20 hover:bg-ink-900 hover:text-white rounded-none font-sans uppercase tracking-[0.2em] text-xs transition-colors py-6">
                  Inquire Now
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FDFBF7] py-16 border-t border-ink-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
             <div className="flex items-center justify-center mb-6">
              <div className="w-24 h-24 bg-white rounded-full border border-ink-900/10 flex items-center justify-center overflow-hidden shadow-sm">
                <img src="/images/inkfetish_logo.png" alt="Inkfetish Publication" className="w-[85%] h-[85%] object-contain" />
              </div>
            </div>
            <p className="text-xs font-sans text-ink-500">© {new Date().getFullYear()} Inkfetish Publication.</p>
        </div>
      </footer>
    </div>
  );
};

export default Services;
