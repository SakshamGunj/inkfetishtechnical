'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Palette, Edit3, 
  Globe, TrendingUp, Package, 
  MoveRight, Headset, BookOpen
} from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-gold" />,
    title: "ISBN & Official Registration",
    desc: "Your book gets an official ISBN — the international identity that makes you a real, recognized, published author. We handle the paperwork."
  },
  {
    icon: <Palette className="w-8 h-8 text-gold" />,
    title: "Cover Design That Commands Attention",
    desc: "No generic templates. Every Inkfetish cover is designed by hand with intentional typography and original visuals.",
    quote: "Readers absolutely judge books by their cover."
  },
  {
    icon: <Edit3 className="w-8 h-8 text-gold" />,
    title: "Manuscript Editing",
    desc: "Professional structural editing, line editing, and proofreading. Your voice stays yours, but the quality reaches international standards."
  },
  {
    icon: <Globe className="w-8 h-8 text-gold" />,
    title: "Author Website",
    desc: "Every serious author needs a home online. We build clean, professional websites that tell your story and showcase your work."
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-gold" />,
    title: "70%–100% Royalties",
    desc: "You wrote every word. You deserve every rupee. Our model gives authors maximum returns—unlike anything in traditional publishing."
  },
  {
    icon: <Package className="w-8 h-8 text-gold" />,
    title: "Premium Experience",
    desc: "From first call to final delivery, we treat every book like it matters. One point of contact. Clear timelines. No surprises."
  }
];

export function HomeServices() {
  return (
    <section className="py-24 md:py-32 bg-[#FDFBF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">WHAT WE BUILD FOR YOU</h3>
          <h4 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black uppercase tracking-tighter leading-none mb-6">
            &quot;Your Book, Done Right.&quot;
          </h4>
          <p className="text-lg text-ink-600 font-sans max-w-2xl mx-auto italic">
            Everything your book needs to go from manuscript to masterpiece.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 md:p-12 border border-ink-900/5 shadow-sm flex flex-col items-start group hover:border-gold/30 hover:shadow-2xl transition-all duration-700"
            >
              <div className="w-16 h-16 rounded-full bg-[#FDFBF7] border border-ink-900/5 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
                {service.icon}
              </div>
              <h5 className="text-xl font-serif font-black uppercase tracking-tighter mb-4 leading-tight">{service.title}</h5>
              <p className="text-[10px] text-ink-500 font-sans font-black uppercase tracking-[0.15em] leading-relaxed mb-8 flex-grow">
                {service.desc}
              </p>
              {service.quote && (
                <div className="mt-4 pt-6 border-t border-ink-900/5 italic w-full">
                   <p className="text-[9px] text-gold font-sans font-medium uppercase tracking-widest leading-none">
                     &quot;{service.quote}&quot;
                   </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Services CTA Blocks */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
           <Link href="/services" className="group bg-ink-900 p-12 text-white flex flex-col justify-between relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Package size={80} />
              </div>
              <div>
                <h6 className="text-xs font-sans font-black uppercase tracking-[0.4em] text-gold mb-4">PACKAGES</h6>
                <p className="text-3xl font-serif font-black uppercase tracking-tighter italic">See Full Publishing <br/> Packages.</p>
              </div>
              <div className="mt-12 flex items-center gap-4 text-xs font-sans font-black tracking-widest group-hover:gap-8 transition-all">
                 VIEW DETAILS <MoveRight size={16} className="text-gold" />
              </div>
           </Link>

           <div className="bg-white border-2 border-ink-900 p-12 flex flex-col justify-between h-full group">
              <div>
                <h6 className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-gold mb-6">CONSULTATION</h6>
                <p className="text-base text-ink-600 font-sans leading-relaxed italic pr-8">
                  &quot;Not sure where to start? Talk to us — no pressure, no sales pitch. Just a real conversation about your book.&quot;
                </p>
              </div>
              <Link href="/contact" className="mt-12">
                 <button className="bg-ink-900 text-white font-sans font-black uppercase tracking-[0.2em] py-6 px-10 text-[10px] hover:bg-gold hover:text-ink-900 transition-all w-full md:w-auto">
                    Book a Free Consultation
                 </button>
              </Link>
           </div>
        </div>
      </div>
    </section>
  );
}
