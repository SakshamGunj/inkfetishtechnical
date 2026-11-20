'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, ShieldCheck, Truck, ArrowRight, Check, Mail, Phone, Feather, Star } from 'lucide-react';
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({ weight: ['500', '600', '700', '800'], subsets: ['latin'] });

const CASHFREE_FORM_URL = 'https://payments.cashfree.com/forms/sunobharat';

export default function SunoBharatLandingPage() {
  return (
    <div
      className={`min-h-screen bg-[#F8F9FA] text-[#1A202C] ${inter.className} selection:bg-[#000080] selection:text-white pb-24 lg:pb-0 overflow-x-hidden`}
    >
      {/* ── MINIMAL NAVBAR ── */}
      <nav className="w-full bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] sticky top-0 z-50">
        <div className="h-1 w-full flex">
          <div className="h-full flex-1 bg-[#FF9933]" />
          <div className="h-full flex-1 bg-white" />
          <div className="h-full flex-1 bg-[#138808]" />
        </div>
        <div className="max-w-5xl mx-auto px-3.5 sm:px-6 py-2.5 min-h-[60px] flex items-center justify-between gap-2.5">
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <img
              src="/images/inkfetish_logo.webp"
              alt="Inkfetish Logo"
              fetchPriority="high"
              decoding="async"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-[#000080] shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span
                  className={`${poppins.className} font-extrabold tracking-tight text-sm sm:text-lg text-[#000080] leading-none`}
                >
                  ink.fetish
                </span>
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#E8F0FA] border border-[#1E4E8C]/25 text-[#000080] text-[9px] font-extrabold uppercase tracking-wider">
                  <ShieldCheck className="w-2.5 h-2.5 text-[#1E4E8C]" />
                  <span>NGO-Verified</span>
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-semibold text-[#475A70] leading-snug mt-0.5 truncate">
                216,000+ Instagram Followers · GST &amp; MSME Registered
              </p>
            </div>
          </Link>
        </div>
      </nav>

      {/* ── SUB-HEADER BANNER (SUNO BHARAT • BHARAT WRITES • INKFETISH) ── */}
      <div className="w-full bg-[#000080] text-white py-2 sm:py-2.5 px-3.5 sm:px-6 text-center border-b border-[#000066]">
        <p className="max-w-5xl mx-auto text-[10.5px] sm:text-xs font-medium tracking-wide leading-snug sm:leading-relaxed">
          🇮🇳 <strong className="text-[#FF9933] uppercase tracking-wider">Suno Bharat</strong> — The Official National
          Anthology of the <strong className="text-white">Bharat Writes Independence Poetry Contest</strong>, curated
          &amp; published by <strong className="text-[#4ADE80]">Inkfetish Publication</strong>
        </p>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-5xl mx-auto px-3.5 sm:px-6 py-7 sm:py-12 lg:py-16">
        {/* ── HERO SECTION ── */}
        <div className="grid md:grid-cols-12 gap-7 md:gap-8 lg:gap-12 items-center">
          {/* Book Cover (Official Front & Back Image + Floating Quality Cards) */}
          <div className="md:col-span-5 flex justify-center items-center order-1 md:order-2 relative py-2 px-3 sm:px-4">
            <div className="relative flex justify-center items-center w-full max-w-[260px] sm:max-w-[310px] md:max-w-full">
              <img
                src="https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto,f_auto/v1795175801/Suno_bharat_front_and_back_2_lavogj.png"
                alt="Suno Bharat Anthology Book Cover"
                fetchPriority="high"
                decoding="async"
                className="w-full max-w-[235px] sm:max-w-[290px] md:max-w-full h-auto object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500 relative z-10"
              />

              {/* Top-Right Floating Card: 80 GSM High-Quality Paper */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-2 sm:top-4 right-0 sm:-right-2 bg-white/95 backdrop-blur-md border border-[#E2E8F0] shadow-[0_8px_24px_rgba(0,0,128,0.12)] px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl z-20 flex items-center gap-2 pointer-events-none"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#FF9933]/15 flex items-center justify-center text-[#FF9933] shrink-0">
                  <Feather className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className={`${poppins.className} font-bold text-[#000080] text-[10px] sm:text-xs uppercase leading-tight`}>
                    80 GSM
                  </span>
                  <span className="text-[#4A5568] text-[8.5px] sm:text-[10px] font-semibold leading-tight">
                    High-Quality Paper
                  </span>
                </div>
              </motion.div>

              {/* Bottom-Left Floating Card: Matte Finish + High-Quality Paperback */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="absolute bottom-2 sm:bottom-4 left-0 sm:-left-2 bg-white/95 backdrop-blur-md border border-[#E2E8F0] shadow-[0_8px_24px_rgba(0,0,128,0.12)] px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl z-20 flex items-center gap-2 pointer-events-none"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#138808]/15 flex items-center justify-center text-[#138808] shrink-0">
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                </div>
                <div className="flex flex-col text-left">
                  <span className={`${poppins.className} font-bold text-[#000080] text-[10px] sm:text-xs uppercase leading-tight`}>
                    Matte Finish
                  </span>
                  <span className="text-[#138808] text-[8.5px] sm:text-[10px] font-semibold leading-tight">
                    High-Quality Paperback
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Text & Primary CTA */}
          <div className="md:col-span-7 order-2 md:order-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFFaf0] border border-[#FF9933]/40 rounded-full text-[11px] sm:text-xs font-bold text-[#000080] mb-3">
              <span>🇮🇳 Your Poetry is Included in This Book!</span>
            </div>

            <h1
              className={`${poppins.className} text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#000080] tracking-tight leading-tight mb-1`}
            >
              Suno Bharat
            </h1>
            <p className="text-[11px] sm:text-xs lg:text-sm font-bold uppercase tracking-[0.18em] text-[#FF9933] mb-3.5">
              The Anthology / Poetry Collection Book
            </p>

            <p className="text-xs sm:text-sm lg:text-base text-[#4A5568] leading-relaxed mb-5 max-w-xl mx-auto md:mx-0">
              This book includes the poems of all writers who took part in the{' '}
              <strong className="text-[#1A202C]">Bharat Writes — National Independence Poetry Contest</strong>. If you
              participated in the contest, your poem is officially published inside this book.
            </p>

            {/* What's Included Box */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-3.5 sm:p-5 mb-6 max-w-xl mx-auto md:mx-0 text-left shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 flex">
                <div className="h-full flex-1 bg-[#FF9933]" />
                <div className="h-full flex-1 bg-white" />
                <div className="h-full flex-1 bg-[#138808]" />
              </div>
              <div
                className={`${poppins.className} text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#000080] mb-2.5 sm:mb-3`}
              >
                What&apos;s Included When You Buy This Anthology Book:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 text-xs sm:text-sm font-semibold text-[#1A202C]">
                <div className="flex items-center gap-2.5 bg-[#F8F9FA] px-3 py-2 sm:py-2.5 rounded-lg border border-[#E2E8F0]">
                  <div className="w-5 h-5 rounded-full bg-[#138808]/15 text-[#138808] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Suno Bharat Anthology Book</span>
                </div>
                <div className="flex items-center gap-2.5 bg-[#F8F9FA] px-3 py-2 sm:py-2.5 rounded-lg border border-[#E2E8F0]">
                  <div className="w-5 h-5 rounded-full bg-[#138808]/15 text-[#138808] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Official Publication Certificate</span>
                </div>
                <div className="flex items-center gap-2.5 bg-[#F8F9FA] px-3 py-2 sm:py-2.5 rounded-lg border border-[#E2E8F0]">
                  <div className="w-5 h-5 rounded-full bg-[#138808]/15 text-[#138808] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Free Entry to Next Contest</span>
                </div>
                <div className="flex items-center gap-2.5 bg-[#F8F9FA] px-3 py-2 sm:py-2.5 rounded-lg border border-[#E2E8F0]">
                  <div className="w-5 h-5 rounded-full bg-[#138808]/15 text-[#138808] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Free Shipping All Over India</span>
                </div>
              </div>
            </div>

            {/* Price & Order Button */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 justify-center md:justify-start">
              <a
                href={CASHFREE_FORM_URL}
                className={`${poppins.className} w-full sm:w-auto min-h-[50px] bg-[#000080] hover:bg-[#1A202C] active:scale-[0.99] text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all shadow-md flex items-center justify-center gap-2.5`}
              >
                <BookOpen className="w-4 h-4 text-[#FF9933] shrink-0" />
                <span>Reserve Your Copy — ₹499</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>
            </div>

            {/* Verified Delivery Trust Pill */}
            <div className="mt-4 inline-flex flex-wrap items-center justify-center md:justify-start gap-x-3 sm:gap-x-4 gap-y-1 bg-[#F0FFF4] border border-[#138808]/25 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-semibold text-[#1A202C]">
              <span className="flex items-center gap-1.5 text-[#138808] font-bold">
                <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> 98.5% Success Delivery Rate
              </span>
              <span className="text-[#CBD5E0] hidden sm:inline">•</span>
              <span className="text-[#000080] font-bold">
                2,345+ Parcels Delivered to Writers Till Now
              </span>
            </div>
          </div>
        </div>

        {/* ── OFFICIAL SUNO BHARAT BANNER SHOWCASE ── */}
        <div className="mt-10 sm:mt-14 bg-white rounded-2xl border border-[#E2E8F0] p-2.5 sm:p-4 shadow-sm overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 flex">
            <div className="h-full flex-1 bg-[#FF9933]" />
            <div className="h-full flex-1 bg-white" />
            <div className="h-full flex-1 bg-[#138808]" />
          </div>
          <img
            src="https://res.cloudinary.com/dde8ekuuu/image/upload/q_auto,f_auto/v1795175653/ChatGPT_Image_Nov_19_2026_09_34_38_PM_1_yiqed5.png"
            alt="Suno Bharat Collector's Edition Showcase Banner"
            loading="lazy"
            decoding="async"
            className="w-full h-auto rounded-xl object-cover"
          />
        </div>

        {/* ── STATS ROW BELOW BANNER ── */}
        <div className="mt-4 sm:mt-6 bg-white rounded-2xl border border-[#E2E8F0] py-4 sm:py-5 px-2 sm:px-8 shadow-sm grid grid-cols-3 divide-x divide-[#E2E8F0] text-center">
          <div className="px-1.5 sm:px-3">
            <div className={`${poppins.className} text-base sm:text-2xl font-extrabold text-[#138808]`}>98.5%</div>
            <div className="text-[10px] sm:text-sm text-[#4A5568] font-medium mt-0.5 leading-tight">
              Delivery Success Rate
            </div>
          </div>
          <div className="px-1.5 sm:px-3">
            <div className={`${poppins.className} text-base sm:text-2xl font-extrabold text-[#000080]`}>2,345+</div>
            <div className="text-[10px] sm:text-sm text-[#4A5568] font-medium mt-0.5 leading-tight">
              Parcels Delivered
            </div>
          </div>
          <div className="px-1.5 sm:px-3">
            <div className={`${poppins.className} text-base sm:text-2xl font-extrabold text-[#000080]`}>80 GSM</div>
            <div className="text-[10px] sm:text-sm text-[#4A5568] font-medium mt-0.5 leading-tight">
              High-Quality Paper
            </div>
          </div>
        </div>

        {/* ── SIMPLE 2-COLUMN INFO & ORDER SUMMARY ── */}
        <div className="mt-6 sm:mt-8 grid md:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* About the Book */}
          <div className="md:col-span-7 bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-8 flex flex-col justify-center">
            <h3 className={`${poppins.className} text-lg sm:text-xl font-bold text-[#000080] mb-2.5 sm:mb-3`}>
              About This Book
            </h3>
            <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed mb-3">
              <strong className="text-[#1A202C]">Suno Bharat</strong> is the official poetry book featuring the poems
              submitted in the{' '}
              <strong className="text-[#1A202C]">Bharat Writes — National Independence Poetry Contest</strong>.
            </p>
            <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed">
              Every writer who took part in the contest has their poem printed in this book. It is printed on
              high-quality paper with a clean matte cover, making it a proud memory for you and your family to keep.
            </p>
          </div>

          {/* Simple Pricing Box */}
          <div className="md:col-span-5 bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-8 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-full h-1 flex">
              <div className="h-full flex-1 bg-[#FF9933]" />
              <div className="h-full flex-1 bg-white" />
              <div className="h-full flex-1 bg-[#138808]" />
            </div>

            <div>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#FF9933]">
                All-Inclusive Package
              </span>
              <h3 className={`${poppins.className} text-lg sm:text-xl font-bold text-[#000080] mt-1 mb-4 sm:mb-5`}>
                What&apos;s Included
              </h3>

              <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-center text-[#1A202C] font-medium">
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#138808] shrink-0" /> Suno Bharat Anthology Book
                  </span>
                  <span className="font-semibold text-[#000080]">₹499</span>
                </div>
                <div className="flex justify-between items-center text-[#1A202C] font-medium">
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#138808] shrink-0" /> Publication Certificate
                  </span>
                  <span className="text-[#138808] font-bold text-[11px] uppercase">Included Free</span>
                </div>
                <div className="flex justify-between items-center text-[#1A202C] font-medium">
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#138808] shrink-0" /> Entry to Next Contest
                  </span>
                  <span className="text-[#138808] font-bold text-[11px] uppercase">Included Free</span>
                </div>
                <div className="flex justify-between items-center text-[#1A202C] font-medium">
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#138808] shrink-0" /> Shipping All Over India
                  </span>
                  <span className="text-[#138808] font-bold text-[11px] uppercase">FREE</span>
                </div>
              </div>
            </div>

            <div className="mt-5 sm:mt-6 pt-4 border-t border-[#E2E8F0]">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-sm sm:text-base text-[#1A202C]">Total Price</span>
                <span className={`${poppins.className} text-2xl sm:text-3xl font-extrabold text-[#000080]`}>
                  ₹499
                </span>
              </div>

              <a
                href={CASHFREE_FORM_URL}
                className={`${poppins.className} w-full min-h-[48px] bg-[#000080] hover:bg-[#1A202C] active:scale-[0.99] text-white py-3.5 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2`}
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </a>

              <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-[#718096]">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#FF9933]" /> Free All-India Shipping
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#138808]" /> Cashfree Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── OFFICIAL WRITER SUPPORT BAR ── */}
        <div className="mt-6 sm:mt-8 bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-3.5 sm:gap-4">
          <div className="text-center sm:text-left">
            <h4 className={`${poppins.className} text-sm sm:text-base font-bold text-[#000080]`}>
              Need Help With Your Book Order?
            </h4>
            <p className="text-xs text-[#718096] mt-0.5">
              Reach out to our official Bharat Writes support team anytime.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <a
              href="mailto:help@inkfetish.in"
              className="flex-1 sm:flex-initial justify-center inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] hover:bg-[#EDF2F7] border border-[#E2E8F0] text-xs font-bold text-[#000080] transition-colors"
            >
              <Mail className="w-4 h-4 text-[#FF9933] shrink-0" />
              <span>help@inkfetish.in</span>
            </a>
            <a
              href="https://wa.me/917850963709"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial justify-center inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#F0FFF4] hover:bg-[#DCFCE7] border border-[#138808]/30 text-xs font-bold text-[#138808] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#138808] shrink-0" />
              <span>WhatsApp: 7850963709</span>
            </a>
          </div>
        </div>
      </main>

      {/* ── MINIMAL FOOTER ── */}
      <footer className="border-t border-[#E2E8F0] bg-white py-8 px-4 text-center text-xs text-[#718096]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© 2026 Inkfetish Publication • Bharat Writes</span>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <a href="mailto:help@inkfetish.in" className="hover:text-[#000080] font-medium">
              help@inkfetish.in
            </a>
            <a
              href="https://wa.me/917850963709"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#000080] font-medium"
            >
              WhatsApp: 7850963709
            </a>
            <Link href="/privacy-policy" className="hover:text-[#000080]">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-[#000080]">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>

      {/* ── MOBILE STICKY BAR ── */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] pt-2.5 pb-[calc(0.65rem+env(safe-area-inset-bottom))] px-4 z-50 flex items-center justify-between shadow-[0_-8px_25px_rgba(0,0,128,0.1)]">
        <div className="absolute top-0 left-0 w-full h-0.5 flex">
          <div className="h-full flex-1 bg-[#FF9933]" />
          <div className="h-full flex-1 bg-white" />
          <div className="h-full flex-1 bg-[#138808]" />
        </div>
        <div>
          <div className={`${poppins.className} text-xs font-bold text-[#000080]`}>Suno Bharat Anthology</div>
          <div className="text-[11px] text-[#138808] font-bold">₹499 • Free All-India Delivery</div>
        </div>
        <a
          href={CASHFREE_FORM_URL}
          className={`${poppins.className} bg-[#000080] active:scale-[0.98] text-white px-5 py-2.5 rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-sm`}
        >
          Order Now <ArrowRight className="w-3.5 h-3.5 text-[#FF9933]" />
        </a>
      </div>
    </div>
  );
}
