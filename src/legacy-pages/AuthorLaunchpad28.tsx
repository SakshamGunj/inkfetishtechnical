import React from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, Calendar, Sparkles, BookOpen, 
  Feather, ArrowRight, CheckCircle2, Award, Mail, Phone, Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';

const AuthorLaunchpad28 = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-ink-900 font-serif selection:bg-ink-900 selection:text-[#FDFBF7]">
      <Navbar />

      {/* 1. The Hook (Hero) */}
      <section className="pt-32 md:pt-48 pb-20 md:pb-32 relative bg-white border-b border-ink-900/10 overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">
        {/* Abstract Background Design */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
           <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-pulse">
             <path fill="currentColor" d="M10,50 Q50,10 90,50 T10,50" />
           </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-ink-900/20 bg-[#FDFBF7] mb-8">
               <Rocket className="w-4 h-4 text-ink-900" strokeWidth={1.5} />
               <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] font-bold text-ink-900">Immediate Action Required</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-serif text-ink-900 mb-6 leading-[1.1] tracking-tight">
              AUTHOR LAUNCHPAD <span className="italic font-light">28</span>
            </h1>
            
            <p className="text-xl md:text-3xl text-ink-900 font-serif italic mb-8 max-w-4xl mx-auto">
              "Stop waiting for 'someday.'"
            </p>
            
            <p className="text-lg text-ink-600 font-sans font-light leading-relaxed mb-12 max-w-2xl mx-auto">
              A 28-day intensive program designed for aspiring writers who want to see their name on a published book <strong>fast</strong>. Whether you’re a beginner or already experienced, this program provides end-to-end guidance to take your idea from words to a published book—ready for readers worldwide.
            </p>
            
            <Button 
               onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
               className="bg-ink-900 text-[#FDFBF7] hover:bg-ink-800 rounded-none px-12 py-8 text-sm md:text-base font-sans uppercase tracking-[0.2em] transition-all group shadow-[0_10px_40px_rgba(0,0,0,0.15)]"
            >
              Secure Your Spot <ArrowRight className="w-5 h-5 ml-3 opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-transform" strokeWidth={1.5} />
            </Button>
            
            <p className="mt-6 text-xs font-sans text-ink-500 uppercase tracking-widest flex items-center justify-center gap-2">
               <Lock className="w-3 h-3" strokeWidth={2} /> Spots are strictly limited per batch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. The 28-Day Architecture (Schedule) */}
      <section className="py-24 md:py-32 bg-[#FDFBF7] border-b border-ink-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-20">
             <h2 className="text-xs font-sans uppercase tracking-[0.3em] text-ink-500 mb-4">The Process</h2>
             <h3 className="text-4xl md:text-5xl font-serif font-bold text-ink-900">4 Weeks to Publication.</h3>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-ink-900/10 divide-y md:divide-y-0 md:divide-x divide-ink-900/10 shadow-[0_20px_40px_rgba(0,0,0,0.02)]">
             
             {/* WEEK 1 */}
             <div className="bg-white p-10 flex flex-col hover:bg-ink-900 hover:text-[#FDFBF7] transition-colors duration-500 group">
               <div className="text-gold font-sans font-bold text-5xl mb-6 opacity-30 group-hover:opacity-100 transition-opacity">01</div>
               <h4 className="text-2xl font-serif font-bold mb-6">Ideation & Flow</h4>
               <ul className="space-y-4 font-sans font-light text-sm flex-grow">
                 <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-3 mt-0.5 shrink-0 opacity-50" strokeWidth={1.5} />Receive 15 writing prompts</li>
                 <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-3 mt-0.5 shrink-0 opacity-50" strokeWidth={1.5} />Choose 7 prompts and write 1 piece per day</li>
                 <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-3 mt-0.5 shrink-0 opacity-50" strokeWidth={1.5} />Submit your writing daily for collection</li>
                 <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-3 mt-0.5 shrink-0 opacity-50" strokeWidth={1.5} />Doubt support available anytime via WhatsApp</li>
               </ul>
             </div>

             {/* WEEK 2 */}
             <div className="bg-white p-10 flex flex-col hover:bg-ink-900 hover:text-[#FDFBF7] transition-colors duration-500 group">
               <div className="text-gold font-sans font-bold text-5xl mb-6 opacity-30 group-hover:opacity-100 transition-opacity">02</div>
               <h4 className="text-2xl font-serif font-bold mb-6">Drafting & Polish</h4>
               <ul className="space-y-4 font-sans font-light text-sm flex-grow">
                 <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-3 mt-0.5 shrink-0 opacity-50" strokeWidth={1.5} />Next 15 prompts shared</li>
                 <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-3 mt-0.5 shrink-0 opacity-50" strokeWidth={1.5} />Write on 7 chosen prompts</li>
                 <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-3 mt-0.5 shrink-0 opacity-50" strokeWidth={1.5} />Daily submissions continue</li>
                 <li className="flex items-start text-gold font-bold"><CheckCircle2 className="w-4 h-4 mr-3 mt-0.5 shrink-0 opacity-100" strokeWidth={2} />Exclusive Workshop Released: Editing, structuring & polishing</li>
               </ul>
             </div>

             {/* WEEK 3 */}
             <div className="bg-white p-10 flex flex-col hover:bg-ink-900 hover:text-[#FDFBF7] transition-colors duration-500 group">
               <div className="text-gold font-sans font-bold text-5xl mb-6 opacity-30 group-hover:opacity-100 transition-opacity">03</div>
               <h4 className="text-2xl font-serif font-bold mb-6">Manuscript Shaping</h4>
               <ul className="space-y-4 font-sans font-light text-sm flex-grow">
                 <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-3 mt-0.5 shrink-0 opacity-50" strokeWidth={1.5} />Receive 3rd set of 15 prompts</li>
                 <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-3 mt-0.5 shrink-0 opacity-50" strokeWidth={1.5} />Choose 7 and write daily</li>
                 <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-3 mt-0.5 shrink-0 opacity-50" strokeWidth={1.5} />Submissions continue</li>
                 <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-3 mt-0.5 shrink-0 opacity-50" strokeWidth={1.5} />Mentor guidance on preparing your manuscript</li>
               </ul>
             </div>

             {/* WEEK 4 */}
             <div className="bg-white p-10 flex flex-col hover:bg-ink-900 hover:text-[#FDFBF7] transition-colors duration-500 group">
               <div className="text-gold font-sans font-bold text-5xl mb-6 opacity-30 group-hover:opacity-100 transition-opacity">04</div>
               <h4 className="text-2xl font-serif font-bold mb-6">The Final Shift</h4>
               <ul className="space-y-4 font-sans font-light text-sm flex-grow">
                 <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-3 mt-0.5 shrink-0 opacity-50" strokeWidth={1.5} />Final 15 prompts shared</li>
                 <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-3 mt-0.5 shrink-0 opacity-50" strokeWidth={1.5} />Write your last 7 pieces</li>
                 <li className="flex items-start text-[#FDFBF7] font-bold"><CheckCircle2 className="w-4 h-4 mr-3 mt-0.5 shrink-0 opacity-100" strokeWidth={2} />Final submission of all writings</li>
                 <li className="flex items-start text-gold font-bold"><CheckCircle2 className="w-4 h-4 mr-3 mt-0.5 shrink-0 opacity-100" strokeWidth={2} />InkFetish Team begins manuscript formatting and design process</li>
               </ul>
             </div>

           </div>
        </div>
      </section>

      {/* 3. The Authority Guarantee (About Sherin) */}
      <section className="py-24 md:py-32 bg-ink-900 text-[#FDFBF7] relative overflow-hidden">
         {/* Subtle Line Art */}
         <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none transform translate-x-1/2">
            <Feather className="w-[800px] h-[800px] text-white" strokeWidth={0.2} />
         </div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 order-2 md:order-1 relative">
               <div className="border border-[#FDFBF7]/20 bg-ink-800 p-12 relative shadow-2xl">
                 <div className="absolute -top-6 -left-6 w-12 h-12 bg-gold flex items-center justify-center rounded-full text-ink-900 shadow-lg">
                    <Award className="w-6 h-6" strokeWidth={2} />
                 </div>
                 <h3 className="text-3xl font-serif font-bold mb-8 italic">"Hi, I'm Sherin."</h3>
                 <p className="font-sans font-light text-lg text-ink-300 leading-relaxed mb-6">
                   I am the face behind Ink Fetish. What started as my love for words has now grown into a community of over <span className="text-[#FDFBF7] font-bold">185,000+ readers and writers.</span>
                 </p>
                 <p className="font-sans font-light text-lg text-ink-300 leading-relaxed mb-6">
                   Ink Fetish isn’t just a page—it’s a platform that inspires and uplifts young writers, giving them the stage to dream bigger, write bolder, and believe in the power of their voice.
                 </p>
                 <p className="font-sans font-light text-lg text-[#FDFBF7] font-medium leading-relaxed italic border-l-2 border-gold pl-6">
                   From competitions to anthologies, workshops to publications—every initiative here is about turning passion into possibility, and words into something that lasts. 💫
                 </p>
               </div>
            </div>
            
            <div className="flex-1 order-1 md:order-2 text-center md:text-left">
               <h2 className="text-xs font-sans uppercase tracking-[0.3em] text-ink-400 mb-4">The Platform</h2>
               <h3 className="text-5xl md:text-6xl font-serif font-bold mb-8 leading-tight">Your Words. <br/><span className="text-gold italic font-light">Amplified.</span></h3>
               <div className="inline-flex flex-col items-center md:items-start p-6 border border-[#FDFBF7]/10 bg-white/5 backdrop-blur-sm">
                  <div className="text-5xl font-serif font-bold text-gold mb-2">185k<span className="text-white">+</span></div>
                  <div className="text-xs font-sans uppercase tracking-[0.2em] font-bold text-[#FDFBF7]">Instagram Followers</div>
                  <div className="text-sm font-sans font-light text-ink-400 mt-2">One of the top writing platforms in India.</div>
               </div>
            </div>
         </div>
      </section>

      {/* 4. The Value Stack (Pricing) */}
      <section id="pricing" className="py-24 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-xs font-sans uppercase tracking-[0.3em] text-ink-500 mb-4">Choose Your Launchpad</h2>
             <h3 className="text-4xl md:text-5xl font-serif font-bold text-ink-900 mb-6">Select The Perfect Package.</h3>
             <p className="text-ink-600 font-sans font-light max-w-2xl mx-auto">
               We offer top-notch service at one of the most affordable prices in the entire publishing industry. Spots are strictly limited per batch to maintain supreme quality and personal guidance.
             </p>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
             
             {/* Package 1: Essential */}
             <div className="border border-ink-900/20 bg-[#FDFBF7] p-10 flex flex-col shadow-lg hover:shadow-2xl transition-shadow duration-500">
               <h4 className="text-sm font-sans uppercase tracking-[0.2em] font-bold text-ink-500 mb-4">Package 1</h4>
               <h3 className="text-3xl font-serif font-bold text-ink-900 mb-8">Essential Publishing<br/><span className="italic font-light">Program</span></h3>
               
               <ul className="space-y-6 mb-12 flex-grow">
                 <li className="flex flex-col gap-2">
                   <div className="flex items-center text-ink-900 font-bold font-sans text-sm tracking-widest uppercase"><CheckCircle2 className="w-4 h-4 mr-2" /> Your Personal Author Website</div>
                   <p className="text-sm font-light text-ink-600 pl-6">We design and build a stunning, professional 3-page website for you. Includes: 'About the Author' page, a dedicated page for your book with purchase links, and a contact page. You get full control.</p>
                 </li>
                 <li className="flex flex-col gap-2">
                   <div className="flex items-center text-ink-900 font-bold font-sans text-sm tracking-widest uppercase"><CheckCircle2 className="w-4 h-4 mr-2" /> Advanced Marketing Power-Up</div>
                   <p className="text-sm font-light text-ink-600 pl-6">We design and run a targeted paid advertising campaign on your behalf. Get extra promotional spotlights across all our social media platforms.</p>
                 </li>
                 <li className="flex flex-col gap-2">
                   <div className="flex items-center text-ink-900 font-bold font-sans text-sm tracking-widest uppercase"><CheckCircle2 className="w-4 h-4 mr-2" /> Exclusive Branding Masterclass</div>
                   <p className="text-sm font-light text-ink-600 pl-6">A special session on building your author identity, growing your social media, and leveraging your book for new opportunities.</p>
                 </li>
               </ul>

               <div className="pt-8 border-t border-ink-900/10 flex flex-col items-center">
                 <div className="text-ink-400 font-sans font-bold line-through text-lg mb-1">₹20,000</div>
                 <div className="text-4xl font-serif font-bold text-ink-900 mb-8">₹10,000 <span className="text-sm font-sans font-light uppercase tracking-widest">Only</span></div>
                 <a href="https://wa.me/919358927243" target="_blank" rel="noreferrer" className="w-full">
                   <Button variant="outline" className="w-full bg-transparent border-2 border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-white rounded-none font-sans uppercase tracking-[0.2em] py-8 transition-colors">
                     Enroll in Essential
                   </Button>
                 </a>
               </div>
             </div>

             {/* Package 2: Premium (Highlighted) */}
             <div className="border border-ink-900 relative bg-ink-900 text-[#FDFBF7] p-10 flex flex-col transform lg:-translate-y-4 shadow-2xl">
               <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-ink-900 px-6 py-2 text-xs font-sans uppercase tracking-[0.2em] font-bold shadow-md whitespace-nowrap">
                 The Ultimate Choice
               </div>
               
               <h4 className="text-sm font-sans uppercase tracking-[0.2em] font-bold text-ink-400 mb-4 mt-4">Package 2</h4>
               <h3 className="text-3xl font-serif font-bold mb-4">Premium Publishing <br/><span className="italic font-light">& Branding</span></h3>
               
               <div className="p-4 border border-[#FDFBF7]/20 bg-[#FDFBF7]/5 mb-8">
                 <p className="font-sans font-bold text-gold text-sm text-center">Includes EVERYTHING in the Essential Program, PLUS massive upgrades.</p>
               </div>

               <ul className="space-y-4 mb-12 flex-grow text-sm font-sans font-light text-ink-300">
                 <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-3 mt-0.5 shrink-0 text-gold" />50–70 Writing Prompts (structured to finish in 28 days)</li>
                 <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-3 mt-0.5 shrink-0 text-gold" />Exclusive Workshops & Guidance on publishing basics</li>
                 <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-3 mt-0.5 shrink-0 text-gold" />Manuscript Development & Complete Formatting (Print/Kindle)</li>
                 <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-3 mt-0.5 shrink-0 text-gold" />Professional Book Design (Custom cover, interiors, optional illustrations)</li>
                 <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-3 mt-0.5 shrink-0 text-gold" />Publishing on Amazon + InkFetish (Worldwide Reach)</li>
                 <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-3 mt-0.5 shrink-0 text-gold" />Promotion on InkFetish (185,000+ audience)</li>
                 <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-3 mt-0.5 shrink-0 text-gold" />Complete Author Copyrights Retained</li>
                 <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-3 mt-0.5 shrink-0 text-gold" />Two Physical Writer's Cards (1 Metal, 1 Normal) & Certificate delivered home.</li>
               </ul>

               <div className="pt-8 border-t border-[#FDFBF7]/20 flex flex-col items-center">
                 <div className="text-ink-400 font-sans font-bold line-through text-lg mb-1">₹30,000</div>
                 <div className="text-4xl font-serif font-bold text-[#FDFBF7] mb-8">₹20,000 <span className="text-sm font-sans font-light uppercase tracking-widest">Only</span></div>
                 <a href="https://wa.me/919358927243" target="_blank" rel="noreferrer" className="w-full">
                   <Button className="w-full bg-[#FDFBF7] text-ink-900 border-2 border-[#FDFBF7] hover:bg-transparent hover:text-[#FDFBF7] rounded-none font-sans uppercase tracking-[0.2em] py-8 transition-colors shadow-none font-bold">
                     Enroll in Premium
                   </Button>
                 </a>
               </div>
             </div>

           </div>
        </div>
      </section>

      {/* 5. Contact Enquiries */}
      <section className="py-16 bg-[#FDFBF7] border-t border-ink-900/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <h3 className="text-3xl font-serif font-bold text-ink-900 mb-8">Have questions before joining?</h3>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <a href="https://wa.me/919358927243" className="flex items-center text-ink-600 hover:text-ink-900 transition-colors">
                <div className="w-10 h-10 border border-ink-900/20 rounded-full flex items-center justify-center mr-3 bg-white">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="font-sans font-light tracking-widest">+91 93589 27243</span>
              </a>
              <a href="https://wa.me/917850963709" className="flex items-center text-ink-600 hover:text-ink-900 transition-colors">
                <div className="w-10 h-10 border border-ink-900/20 rounded-full flex items-center justify-center mr-3 bg-white">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="font-sans font-light tracking-widest">+91 78509 63709</span>
              </a>
              <a href="mailto:her.blogss@gmail.com" className="flex items-center text-ink-600 hover:text-ink-900 transition-colors">
                <div className="w-10 h-10 border border-ink-900/20 rounded-full flex items-center justify-center mr-3 bg-white">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="font-sans font-light tracking-widest">Email Us</span>
              </a>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-16 border-t border-ink-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
             <div className="flex items-center justify-center mb-6">
              <div className="w-24 h-24 bg-white rounded-full border border-ink-900/10 flex items-center justify-center overflow-hidden shadow-sm">
                <img src="/images/inkfetish_logo.png" alt="Inkfetish Publication" className="w-[85%] h-[85%] object-contain" />
              </div>
            </div>
            <p className="text-xs font-sans text-ink-500">© {new Date().getFullYear()} Inkfetish Publication. Author Launchpad 28.</p>
        </div>
      </footer>
    </div>
  );
};

export default AuthorLaunchpad28;
