'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Instagram, Twitter, Linkedin, 
  MoveRight, Feather, Mail, 
  MapPin, Phone
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: 'Home', path: '/' },
      { name: 'Anthology Hub', path: '/anthologies' },
      { name: 'Author Directory', path: '/authors' },
      { name: 'Master Bookstore', path: '/bookstore' },
      { name: 'Writing Contests', path: '/contests' },
      { name: 'Poetry Festival S2', path: '/poetry-festival-s2' },
    ],
    legacy: [
      { name: 'About Us', path: '/about-us' },
      { name: 'Our Story', path: '/highlights' },
      { name: 'Privacy Policy', path: '/privacy-policy' },
      { name: 'Terms of Service', path: '/terms-of-service' },
      { name: 'Testimonials', path: '/testimonials' },
    ],
    connect: [
      { name: 'Instagram', path: 'https://instagram.com/ink.fetish', icon: <Instagram size={16} /> },
      { name: 'Contact Desk', path: '/contact' },
    ]
  };

  return (
    <footer className="bg-[#FDFBF7] border-t border-ink-900/10 pt-24 pb-12 overflow-hidden relative">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-ink-900 opacity-[0.01] pointer-events-none transform skew-x-12 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-24 mb-20">
          
          {/* Column 1: Brand & Mission */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block mb-10">
              <div className="w-20 h-20 bg-white rounded-full border border-ink-900/10 flex items-center justify-center overflow-hidden shadow-sm transition-transform hover:scale-105 duration-500">
                <img src="/images/inkfetish_logo.png" alt="Inkfetish Publication" className="w-[85%] h-[85%] object-contain" />
              </div>
            </Link>
            <h2 className="text-3xl font-serif font-black text-ink-900 leading-tight mb-8">
              Publishing the <span className="italic font-light">Legends</span> <br/> of Tomorrow, <span className="text-gold italic">Today.</span>
            </h2>
            <p className="text-ink-600 font-sans font-light text-lg mb-10 max-w-md leading-relaxed">
              Inkfetish is a premium publication house and a collective of 2 Lakh+ writers. We bridge the gap between digital creativity and physical craftsmanship.
            </p>
            <div className="flex gap-4">
               <a href="https://instagram.com/ink.fetish" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-ink-900/10 flex items-center justify-center text-ink-900 hover:bg-ink-900 hover:text-[#FDFBF7] transition-all">
                 <Instagram size={18} />
               </a>
               <a href="#" className="w-10 h-10 rounded-full border border-ink-900/10 flex items-center justify-center text-ink-900 hover:bg-ink-900 hover:text-[#FDFBF7] transition-all">
                 <Twitter size={18} />
               </a>
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-ink-400 mb-10 italic underline decoration-gold/30 underline-offset-8">Platform</h3>
            <ul className="space-y-4">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-xs font-sans uppercase tracking-[0.2em] font-black text-ink-600 hover:text-ink-900 transition-colors flex items-center group">
                    <span className="w-0 group-hover:w-4 h-px bg-gold transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legacy Links */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-ink-400 mb-10 italic underline decoration-gold/30 underline-offset-8">Legacy</h3>
            <ul className="space-y-4">
              {footerLinks.legacy.map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-xs font-sans uppercase tracking-[0.2em] font-black text-ink-600 hover:text-ink-900 transition-colors flex items-center group">
                    <span className="w-0 group-hover:w-4 h-px bg-gold transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter/CTA */}
          <div className="lg:col-span-3">
             <div className="bg-white border border-ink-900/10 p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold opacity-[0.03] rounded-full translate-x-1/2 -translate-y-1/2 transition-transform group-hover:scale-150 duration-700"></div>
                <h4 className="text-xl font-serif font-black mb-6 leading-tight">Join The <span className="italic font-light">Cult.</span></h4>
                <p className="text-[10px] font-sans text-ink-500 uppercase tracking-[0.2em] leading-relaxed mb-8 font-bold">
                  Get early access to anthology submissions and exclusive writer resources.
                </p>
                <div className="space-y-4">
                  <div className="relative">
                    <input 
                      type="email" 
                      placeholder="ENTER EMAIL" 
                      className="w-full bg-[#FDFBF7] border border-ink-900/10 px-4 py-4 text-[10px] font-sans uppercase tracking-widest focus:outline-none focus:border-ink-900 transition-colors"
                    />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-900">
                      <MoveRight size={16} />
                    </button>
                  </div>
                </div>
             </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-ink-900/10 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-3 text-ink-400 group cursor-default">
             <Feather className="w-4 h-4 group-hover:text-gold transition-colors duration-500" strokeWidth={1} />
             <span className="text-[9px] font-sans uppercase tracking-[0.5em] font-black italic">Inkfetish Publication • Estd 2025</span>
           </div>
           
           <div className="text-[9px] font-sans uppercase tracking-[0.3em] font-bold text-ink-400 flex flex-wrap justify-center gap-x-8 gap-y-2">
             <p>© {currentYear} Inkfetish. Individual rights belong to respective authors.</p>
           </div>
        </div>
      </div>

      {/* Editorial Branding Lines */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
    </footer>
  );
};

export default Footer;
