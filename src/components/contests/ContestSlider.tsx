'use client';

import React from 'react';

const row1 = [
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100331/WhatsApp_Image_2026-04-13_at_9.06.50_PM-compressed_f54p62.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100331/WhatsApp_Image_2026-04-13_at_9.06.50_PM_1_-compressed_bla9w8.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100331/WhatsApp_Image_2026-04-13_at_9.06.49_PM-compressed_krdg8g.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_9.06.49_PM_1_-compressed_ylopb7.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_9.06.50_PM_2_-compressed_nrkzf4.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_8.12.24_PM-compressed_skr10b.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_9.06.48_PM-compressed_ftx5ea.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_9.06.48_PM_1_-compressed_zolkao.webp"
];

const row2 = [
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_8.27.49_PM-compressed_hhn7yj.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100329/WhatsApp_Image_2026-04-13_at_8.19.16_PM-compressed_pii87q.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775933371/WhatsApp_Image_2026-03-29_at_12.40.13_PM-compressed_wjaeil.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775933370/WhatsApp_Image_2026-03-29_at_12.35.16_PM-compressed_qldola.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775933368/WhatsApp_Image_2026-03-29_at_12.35.16_PM_2_-compressed_d12sxy.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775933367/WhatsApp_Image_2026-03-29_at_12.35.16_PM_1_-compressed_ddda2d.webp",
  "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775933367/WhatsApp_Image_2026-03-28_at_8.00.34_PM-compressed_yfhhz2.webp"
];

export function ContestSlider() {
  return (
    <section className="py-12 bg-white overflow-hidden border-y border-ink-900/10 mb-24 relative z-20">
      <div className="flex flex-col gap-8">
        
        {/* Row 1: Left to Right */}
        <div className="flex whitespace-nowrap gap-6 animate-scroll-left">
          {row1.map((img, i) => (
            <div key={i} className="h-64 md:h-80 shrink-0 border border-ink-900/10 shadow-sm overflow-hidden bg-[#FDFBF7]">
              <img src={img} alt="Contest Winner Proof" className="h-full w-auto object-contain" />
            </div>
          ))}
          {/* Duplicate for infinite loop */}
          {row1.map((img, i) => (
            <div key={`dup1-${i}`} className="h-64 md:h-80 shrink-0 border border-ink-900/10 shadow-sm overflow-hidden bg-[#FDFBF7]">
              <img src={img} alt="Contest Winner Proof" className="h-full w-auto object-contain" />
            </div>
          ))}
        </div>

        {/* Row 2: Right to Left */}
        <div className="flex whitespace-nowrap gap-6 animate-scroll-right">
          {row2.map((img, i) => (
            <div key={i} className="h-64 md:h-80 shrink-0 border border-ink-900/10 shadow-sm overflow-hidden bg-[#FDFBF7]">
              <img src={img} alt="Contest Winner Proof" className="h-full w-auto object-contain" />
            </div>
          ))}
          {/* Duplicate for infinite loop */}
          {row2.map((img, i) => (
            <div key={`dup2-${i}`} className="h-64 md:h-80 shrink-0 border border-ink-900/10 shadow-sm overflow-hidden bg-[#FDFBF7]">
              <img src={img} alt="Contest Winner Proof" className="h-full w-auto object-contain" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
