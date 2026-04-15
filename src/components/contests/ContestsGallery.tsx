'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Trophy, Camera, Star } from 'lucide-react';

const galleryImages = [
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100331/WhatsApp_Image_2026-04-13_at_9.06.50_PM-compressed_f54p62.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100331/WhatsApp_Image_2026-04-13_at_9.06.50_PM_1_-compressed_bla9w8.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100331/WhatsApp_Image_2026-04-13_at_9.06.49_PM-compressed_krdg8g.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_9.06.49_PM_1_-compressed_ylopb7.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_9.06.50_PM_2_-compressed_nrkzf4.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_8.12.24_PM-compressed_skr10b.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_9.06.48_PM-compressed_ftx5ea.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_9.06.48_PM_1_-compressed_zolkao.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_8.27.49_PM-compressed_hhn7yj.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100329/WhatsApp_Image_2026-04-13_at_8.19.16_PM-compressed_pii87q.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775933371/WhatsApp_Image_2026-03-29_at_12.40.13_PM-compressed_wjaeil.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775933370/WhatsApp_Image_2026-03-29_at_12.35.16_PM-compressed_qldola.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775933368/WhatsApp_Image_2026-03-29_at_12.35.16_PM_2_-compressed_d12sxy.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775933367/WhatsApp_Image_2026-03-29_at_12.35.16_PM_1_-compressed_ddda2d.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775933367/WhatsApp_Image_2026-03-28_at_8.00.34_PM-compressed_yfhhz2.webp"
];

export function ContestsGallery() {
  return (
    <section className="py-24 md:py-32 bg-[#FDFBF7] relative overflow-hidden border-t border-ink-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">THE WALL OF CHAMPIONS</h3>
          <h4 className="text-3xl md:text-5xl lg:text-7xl font-serif font-black uppercase tracking-tighter leading-none mb-4">
            &quot;Real Winners. Real Recognition. <br/>
            <span className="italic font-light text-ink-600 block mt-2 lowercase">Captured in the Wild.&quot;</span>
          </h4>
          <p className="text-base text-ink-600 font-sans italic max-w-xl mt-8">
            These aren&apos;t studio shots. These are real writers, across India, receiving their trophies, certificates, and books. This is what winning feels like.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {/* Editorial Card 1 */}
          <div className="break-inside-avoid mb-6 bg-ink-900 p-8 text-white flex flex-col justify-between aspect-square">
             <Trophy size={40} className="text-gold mb-8" />
             <div className="space-y-4">
               <div className="text-2xl font-serif font-black uppercase tracking-tighter leading-none italic">
                  ₹5,75,000+ <br/> Delivered.
               </div>
               <p className="text-[9px] font-sans uppercase tracking-widest text-[#39FF14] font-black">100% SUCCESS RATE</p>
             </div>
          </div>

          {galleryImages.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (i % 4) * 0.1 }}
              viewport={{ once: true }}
              className="break-inside-avoid group relative overflow-hidden bg-white border border-ink-900/5 shadow-sm"
            >
              <img 
                src={src} 
                alt={`Inkfetish Winner Proof ${i + 1}`}
                className="w-full h-auto grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
              />
              
              {/* Overlay Decor */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-ink-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                 <div className="flex items-center gap-2">
                    <CheckCircle2 size={12} className="text-[#39FF14]" />
                    <span className="text-[9px] font-sans font-black uppercase tracking-widest text-white">Verified Winner</span>
                 </div>
              </div>

              {/* Random Tilt simulation via Container */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <Camera size={14} className="text-white/50" />
              </div>
            </motion.div>
          ))}

          {/* Editorial Card 2 */}
          <div className="break-inside-avoid mb-6 bg-[#FDFBF7] p-8 border-2 border-gold flex flex-col justify-center aspect-[3/4]">
             <div className="flex flex-col items-center text-center">
                <Star size={32} className="text-gold mb-6" />
                <h5 className="text-xl font-serif font-black uppercase tracking-tighter mb-4">Your Name Here Next?</h5>
                <p className="text-[10px] text-ink-500 font-sans font-black uppercase tracking-[0.2em] leading-relaxed italic">
                  The only thing stopping you is the deadline.
                </p>
                <div className="mt-8 w-12 h-px bg-gold/30" />
             </div>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-ink-900/10 text-center">
           <p className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-ink-300">
             1,155+ Writers. Infinite Stories. One Destination.
           </p>
        </div>
      </div>
    </section>
  );
}
