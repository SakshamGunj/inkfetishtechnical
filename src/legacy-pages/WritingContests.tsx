import React from 'react';
import { motion } from 'framer-motion';
import { Feather, Trophy, Calendar, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';

const WritingContests = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-ink-900 font-serif selection:bg-ink-900 selection:text-[#FDFBF7]">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 md:pt-48 pb-20 md:pb-32 relative bg-white border-b border-ink-900/10 overflow-hidden min-h-[70vh] flex flex-col items-center justify-center">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ink-900/20 to-transparent"></div>
        <div className="absolute left-0 top-1/4 w-1/4 h-1/2 opacity-[0.03] pointer-events-none transform -translate-x-1/2">
           <Feather className="w-full h-full text-ink-900 rotate-45" strokeWidth={0.5} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="w-16 h-16 bg-[#FDFBF7] rounded-full border border-ink-900/10 flex items-center justify-center mx-auto mb-8 shadow-sm">
                <img src="/images/inkfetish_logo.png" alt="Inkfetish Publication" className="w-[85%] h-[85%] object-contain" />
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1] text-ink-900">
              The Epicenter of <br/><span className="italic font-light">Literary Excellence.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-ink-600 font-sans font-light leading-relaxed mb-12 max-w-2xl mx-auto">
              Ink Fetish Publication isn't just a publisher; we are the stage for the industry's most ambitious writing events, summits, and festivals. Explore our active opportunities and monumental history.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Live Opportunities Pipeline */}
      <section className="py-24 md:py-32 bg-[#FDFBF7] relative border-b border-ink-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 pb-8 border-b border-ink-900/10">
             <div>
               <h2 className="text-xs font-sans uppercase tracking-[0.3em] text-gold font-bold mb-4 flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-gold animate-pulse"></div>
                 Active Pipeline
               </h2>
               <h3 className="text-4xl md:text-5xl font-serif font-bold text-ink-900">Live Opportunities</h3>
             </div>
             <p className="font-sans font-light text-ink-500 uppercase tracking-widest text-sm max-w-xs text-right hidden md:block mt-6 md:mt-0">
               Accepting entries worldwide.
             </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Event 1 */}
              <div className="border border-ink-900/10 bg-white p-8 md:p-12 shadow-sm hover:shadow-xl transition-shadow duration-500 group flex flex-col justify-between">
                 <div>
                   <div className="flex justify-between items-start mb-8">
                      <div className="w-12 h-12 bg-[#FDFBF7] border border-ink-900/10 flex items-center justify-center rounded-full">
                        <Sparkles className="w-5 h-5 text-gold" strokeWidth={1.5} />
                      </div>
                      <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] bg-gold text-ink-900 px-3 py-1">Registrations Open</span>
                   </div>
                   <h4 className="text-3xl font-serif font-bold text-ink-900 mb-4 group-hover:text-gold transition-colors">Indian Creative Star <span className="font-light italic text-xl">Season 3</span></h4>
                   <p className="font-sans font-light text-ink-600 leading-relaxed mb-8">
                     The third iteration of our monumental creative writing competition. Discover your voice, compete with thousands, and secure your place in literary history.
                   </p>
                 </div>
                 
                 <div className="pt-8 border-t border-ink-900/10 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-ink-500 text-xs font-sans uppercase tracking-widest">
                       <MapPin className="w-4 h-4" /> Nationwide
                    </div>
                    <Button variant="outline" className="border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-white rounded-none font-sans uppercase tracking-[0.2em] text-[10px]">
                      View Details
                    </Button>
                 </div>
              </div>

              {/* Event 2 */}
              <div className="border border-ink-900/10 bg-white p-8 md:p-12 shadow-sm hover:shadow-xl transition-shadow duration-500 group flex flex-col justify-between">
                 <div>
                   <div className="flex justify-between items-start mb-8">
                      <div className="w-12 h-12 bg-[#FDFBF7] border border-ink-900/10 flex items-center justify-center rounded-full">
                        <Trophy className="w-5 h-5 text-gold" strokeWidth={1.5} />
                      </div>
                      <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] bg-gold text-ink-900 px-3 py-1">Registrations Open</span>
                   </div>
                   <h4 className="text-3xl font-serif font-bold text-ink-900 mb-4 group-hover:text-gold transition-colors">Rang Kala <span className="font-light italic text-xl">Award</span></h4>
                   <p className="font-sans font-light text-ink-600 leading-relaxed mb-8">
                     An unparalleled convergence of art and literature. Demonstrate your creative supremacy in an intense online competition designed to forge true masters.
                   </p>
                 </div>
                 
                 <div className="pt-8 border-t border-ink-900/10 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-ink-500 text-xs font-sans uppercase tracking-widest">
                       <MapPin className="w-4 h-4" /> Global Online
                    </div>
                    <Button variant="outline" className="border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-white rounded-none font-sans uppercase tracking-[0.2em] text-[10px]">
                      Register Now
                    </Button>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 3. The Archives (Past Events) */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-20">
             <h2 className="text-xs font-sans uppercase tracking-[0.3em] text-ink-500 mb-4">The Archives</h2>
             <h3 className="text-4xl md:text-5xl font-serif font-bold text-ink-900">A Legacy of Summits.</h3>
             <p className="font-sans font-light text-ink-600 mt-6 max-w-2xl mx-auto">
               Our history is etched with monumental events that brought together thousands of rising stars and literary giants.
             </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-ink-900/10 relative">
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-5 pointer-events-none"></div>
             
             {[
               { title: 'AuthorVerse Summit', desc: 'A massive conclave connecting aspiring authors with industry veterans.', year: '2023' },
               { title: 'September Writing Competition', desc: 'A grueling, high-stakes 30-day marathon of prompts and daily judgment.', year: 'Annual' },
               { title: 'Writers Mania', desc: 'A frantic weekend hackathon for flash fiction and poetry composition.', year: 'Past Series' },
               { title: 'Poetry Festival', desc: 'A celebration blending spoken word, rhythmic composition, and classic publishing.', year: 'Annual' },
               { title: 'Indian Writers League', desc: 'The defining battleground for establishing dominance in the Indian literary sphere.', year: 'Seasons 1-4' }
             ].map((event, index) => (
               <div key={index} className="p-8 md:p-12 border-b border-r border-ink-900/10 hover:bg-[#FDFBF7] transition-colors duration-500 group">
                 <div className="flex justify-between items-center mb-6">
                    <Calendar className="w-5 h-5 text-ink-300 group-hover:text-ink-900 transition-colors" />
                    <span className="text-[10px] font-sans uppercase tracking-widest text-ink-400 group-hover:text-ink-600">{event.year}</span>
                 </div>
                 <h4 className="text-2xl font-serif font-bold text-ink-900 mb-4 group-hover:-translate-y-1 transition-transform duration-300">{event.title}</h4>
                 <p className="font-sans font-light text-ink-600 text-sm leading-relaxed">
                   {event.desc}
                 </p>
                 <div className="mt-8 pt-6 border-t border-ink-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-end">
                    <ArrowRight className="w-4 h-4 text-ink-900" />
                 </div>
               </div>
             ))}

             {/* Placeholder for symmetry if odd number */}
             <div className="p-8 md:p-12 border-b border-r border-ink-900/10 flex items-center justify-center bg-[#FDFBF7]/50">
                <div className="text-center">
                  <Feather className="w-8 h-8 text-ink-900/20 mx-auto mb-4" strokeWidth={1} />
                  <span className="text-xs font-sans uppercase tracking-widest text-ink-500 italic">More History Unfolding</span>
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

export default WritingContests;
