"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ShieldCheck, Star, Clock, Trophy, Quote, Feather, ArrowRight, Lock, BookOpen, Mic, Megaphone, PenTool, Calendar, CheckCircle2, BookMarked, Award } from 'lucide-react';

export default function AutumnPoetryHunt() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen font-sans bg-black selection:bg-orange-500 selection:text-white flex flex-col text-[#2c1a14]">
      
      {/* --- PREMIUM GLASS NAVBAR --- */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/10 backdrop-blur-xl border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 md:gap-3">
            {/* Ink Fetish Logo */}
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center shrink-0 shadow-lg border border-white/20">
               <Feather className="w-3 h-3 md:w-4 md:h-4 text-white" />
            </div>
            <div className="font-serif text-white tracking-[0.1em] md:tracking-[0.25em] text-[10px] sm:text-xs md:text-sm uppercase font-medium drop-shadow-md truncate">
              Ink Fetish
            </div>
          </div>
          <div className="text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-widest md:tracking-[0.2em] uppercase text-orange-100 bg-white/10 px-3 py-1.5 md:px-4 md:py-1.5 rounded-full border border-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.1)] whitespace-nowrap">
            Autumn Poetry Hunt '26
          </div>
        </div>
      </nav>

      {/* 1. Hero Section */}
      <section 
        className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center text-center bg-cover bg-center bg-no-repeat overflow-hidden pt-32 pb-16 md:py-24 px-4 md:px-6"
        style={{ backgroundImage: 'url("/bg-landscape.png")' }}
      >
        {/* Soft elegant gradient overlay - brightened for better landscape visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70 z-0"></div>

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center mt-8 md:mt-0">
          
          <div className="inline-flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 md:mb-8 shadow-2xl">
            <span className="flex h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-orange-400 animate-pulse"></span>
            <span className="text-white/90 text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase">Season II Applications Open</span>
          </div>

          <Image 
            src="/logo-transparent-v2.png" 
            alt="Autumn Poetry Hunt" 
            width={800}
            height={400}
            className="w-full max-w-[340px] sm:max-w-[450px] md:max-w-[600px] lg:max-w-[800px] mx-auto h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-8 md:mb-12"
            priority
          />
          
          <p className="text-base md:text-2xl text-white/90 mb-10 max-w-2xl leading-relaxed font-light drop-shadow-lg px-2">
            The world’s most prestigious seasonal anthology. Immortalize your verses and compete for a ₹70,000+ prize pool.
          </p>

          <div className="flex flex-col w-full px-4 sm:px-0 sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="w-full sm:w-auto group bg-gradient-to-r from-orange-600 to-red-700 hover:from-orange-500 hover:to-red-600 text-white text-base md:text-lg font-medium px-8 py-6 md:px-10 md:py-7 rounded-full shadow-[0_0_40px_rgba(234,88,12,0.4)] transition-all hover:scale-105 border border-white/10"
              onClick={() => document.getElementById('register-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Submit Your Entry
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          {/* Modern Avatar Trust Bar */}
          <div className="mt-12 md:mt-16 flex flex-col items-center gap-3">
            <div className="flex -space-x-2 md:-space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-black/50 bg-gradient-to-br from-orange-200 to-orange-800 shadow-lg"></div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-xs md:text-sm text-white/80 font-medium">
              <div className="flex text-orange-400">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-current"/>)}
              </div>
              <span>Trusted by 10,000+ Writers</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- TEXTURE GROUP 1: Prizes, Why Join, & Timeline --- */}
      <div 
        className="bg-cover bg-center w-full relative"
        style={{ backgroundImage: 'url("/bg-texture.png")' }}
      >
        
        {/* --- ABOUT AUTUMN POETRY HUNT --- */}
        <section className="pt-20 md:pt-28 pb-8 md:pb-12 px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex flex-col items-center justify-center text-center mb-12 md:mb-20 z-10 relative">
              <h2 className="text-[3.5rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[8rem] font-sans font-black text-transparent bg-clip-text bg-gradient-to-b from-[#2C100C] to-[#5A1810] drop-shadow-md uppercase tracking-tighter leading-[0.85] mb-6">
                VISION
              </h2>
              <div className="flex items-center justify-center gap-4">
                <div className="h-[2px] w-12 md:w-20 bg-[#8B3A2B]/40"></div>
                <span className="text-[#8B3A2B] font-bold uppercase tracking-[0.3em] text-xs md:text-sm">About The Autumn Hunt</span>
                <div className="h-[2px] w-12 md:w-20 bg-[#8B3A2B]/40"></div>
              </div>
            </div>
            
            <p className="text-[#5A3828] text-base md:text-xl leading-relaxed font-medium">
              Autumn is a season of shedding the old and embracing the raw, bare truth. The Autumn Poetry Hunt is a global celebration of this transition. We invite poets from every corner of the world to distill their most profound emotions, untold stories, and stark vulnerabilities into verse. It is more than a competition—it is a movement to immortalize the most authentic voices of our generation in a premium, physical anthology.
            </p>
          </div>
        </section>

        {/* --- PRIZE STRUCTURE SECTION --- */}
        <section className="py-12 md:py-16 px-4 md:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            
            <div className="flex flex-col items-center justify-center text-center mb-12 md:mb-20 z-10 relative">
              <h2 className="text-[3.5rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[8rem] font-sans font-black text-transparent bg-clip-text bg-gradient-to-b from-[#2C100C] to-[#5A1810] drop-shadow-md uppercase tracking-tighter leading-[0.85] mb-6">
                REWARDS
              </h2>
              <div className="flex items-center justify-center gap-4">
                <div className="h-[2px] w-12 md:w-20 bg-[#8B3A2B]/40"></div>
                <span className="text-[#8B3A2B] font-bold uppercase tracking-[0.3em] text-xs md:text-sm">Winner's Benefits</span>
                <div className="h-[2px] w-12 md:w-20 bg-[#8B3A2B]/40"></div>
              </div>
            </div>

            {/* Massive Premium Header */}
            <div className="text-center mb-12 md:mb-16 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-400/20 rounded-full blur-[100px] pointer-events-none"></div>
              <h3 className="text-[#8B3A2B]/90 text-sm md:text-lg lg:text-xl font-bold uppercase tracking-[0.3em] mb-2 md:mb-4">Total Prize Value</h3>
              <div className="flex items-center justify-center gap-3 md:gap-6 mb-6 md:mb-8">
                <Trophy className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-[#8B3A2B] drop-shadow-[0_0_15px_rgba(139,58,43,0.3)] animate-pulse" />
                <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#4A1008] via-[#FFB800] to-[#4A1008] animate-shine drop-shadow-2xl leading-none">
                  ₹70,000<span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl align-top">+</span>
                </div>
              </div>
              <p className="text-[#5A3828] text-base md:text-xl max-w-3xl mx-auto font-medium leading-relaxed px-4">
                ₹10,000 cash pool for 5 winners <span className="text-[#8B3A2B] font-bold mx-2">|</span> ₹60,000+ in exclusive digital prizes and life-changing literary opportunities.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 md:gap-10">
              {/* Left: Cash Prizes (Tiered Podium Layout) */}
              <div className="bg-white/60 backdrop-blur-2xl rounded-[2rem] p-6 md:p-10 border border-white/80 shadow-[0_20px_50px_rgba(139,58,43,0.08)] relative flex flex-col">
                
                <div className="relative z-10 flex-grow">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#2C100C] mb-8 flex items-center gap-3">
                    <Trophy className="w-6 h-6 md:w-8 md:h-8 text-[#8B3A2B]" /> 
                    Cash Winners (₹10k)
                  </h3>
                  
                  <div className="space-y-4">
                    {/* 1st Place (Gold/Premium) */}
                    <div className="flex justify-between items-center p-4 md:p-5 rounded-2xl bg-gradient-to-r from-orange-400/20 to-orange-100/10 border border-orange-400/40 shadow-sm relative overflow-hidden group hover:scale-[1.02] transition-transform">
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-400"></div>
                      <div className="flex items-center gap-4 pl-3">
                        <span className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center font-serif font-bold text-white text-base md:text-lg shadow-lg shrink-0">1st</span>
                        <span className="font-bold text-[#2C100C] text-base md:text-lg">First Position</span>
                      </div>
                      <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 text-xl md:text-2xl drop-shadow-sm shrink-0">₹3,000</span>
                    </div>

                    {/* 2nd & 3rd Place */}
                    {[
                      { rank: "2nd", pos: "Second Position", prize: "₹3,000" },
                      { rank: "3rd", pos: "Third Position", prize: "₹2,000" }
                    ].map((winner, idx) => (
                      <div key={idx} className="flex justify-between items-center p-4 md:p-5 rounded-2xl bg-white/70 border border-white shadow-sm hover:scale-[1.02] transition-transform">
                        <div className="flex items-center gap-4 pl-1">
                          <span className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#8B3A2B]/10 flex items-center justify-center font-serif font-bold text-[#8B3A2B] text-base md:text-lg shrink-0 border border-[#8B3A2B]/20">{winner.rank}</span>
                          <span className="font-bold text-[#5A3828] text-base md:text-lg">{winner.pos}</span>
                        </div>
                        <span className="font-extrabold text-[#8B3A2B] text-lg md:text-xl shrink-0">{winner.prize}</span>
                      </div>
                    ))}

                    {/* 4th & 5th Place */}
                    <div className="flex justify-between items-center gap-3 pt-2">
                      {[
                        { rank: "4th", prize: "₹1,000" },
                        { rank: "5th", prize: "₹1,000" }
                      ].map((winner, idx) => (
                        <div key={idx} className="flex-1 flex justify-between items-center p-4 md:p-5 rounded-2xl bg-white/40 border border-white/50 text-sm md:text-base">
                          <span className="font-bold text-[#5A3828]">{winner.rank}</span>
                          <span className="font-bold text-[#8B3A2B]">{winner.prize}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Digital Prizes (Dark Glass Bento Layout) */}
              <div className="bg-gradient-to-br from-[#2C100C] via-[#3A1812] to-[#1A0805] rounded-[2rem] p-6 md:p-10 border border-orange-900/40 shadow-[0_20px_50px_rgba(44,16,12,0.3)] text-white relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                
                <div className="relative z-10 flex-grow">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold mb-8 flex items-center gap-3">
                    <Star className="w-6 h-6 md:w-8 md:h-8 text-orange-400" /> 
                    Digital Perks (₹60k+)
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      { icon: <Mic className="w-5 h-5 md:w-6 md:h-6 text-white" />, title: "Interview & Podcast", desc: "Full coverage and spotlight on your creative journey across our literary network." },
                      { icon: <PenTool className="w-5 h-5 md:w-6 md:h-6 text-white" />, title: "Publishing Opportunities", desc: "Direct pathways to feature in premium anthologies and literary magazines." },
                      { icon: <Megaphone className="w-5 h-5 md:w-6 md:h-6 text-white" />, title: "Promotional Benefits", desc: "Extensive features across our social channels to rapidly build your audience." }
                    ].map((perk, idx) => (
                      <div key={idx} className="bg-white/5 hover:bg-white/10 transition-colors border border-white/10 p-5 rounded-2xl flex items-start gap-4 md:gap-5 group">
                        <div className="bg-gradient-to-br from-orange-500 to-red-600 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                          {perk.icon}
                        </div>
                        <div>
                          <span className="font-bold text-base md:text-lg block text-orange-50 mb-1">{perk.title}</span>
                          <span className="text-white/60 text-xs md:text-sm leading-relaxed block">{perk.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* --- PARTICIPANT BENEFITS --- */}
            <div className="mt-20 md:mt-28">
              <div className="flex flex-col items-center justify-center text-center mb-12 md:mb-20 z-10 relative">
              <h3 className="text-[3.5rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[8rem] font-sans font-black text-transparent bg-clip-text bg-gradient-to-b from-[#2C100C] to-[#5A1810] drop-shadow-md uppercase tracking-tighter leading-[0.85] mb-6">
                EVERYONE
              </h3>
                <div className="flex items-center justify-center gap-4">
                  <div className="h-[2px] w-12 md:w-20 bg-[#8B3A2B]/40"></div>
                <span className="text-[#8B3A2B] font-bold uppercase tracking-[0.3em] text-xs md:text-sm">Participant Benefits</span>
                  <div className="h-[2px] w-12 md:w-20 bg-[#8B3A2B]/40"></div>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {/* Card 1 */}
                <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/60 shadow-sm text-center group hover:bg-white/60 transition-colors">
                  <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-gradient-to-br from-[#8B3A2B] to-[#5A1810] text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                    <Award className="w-6 h-6 md:w-8 md:h-8"/>
                  </div>
                  <h4 className="font-bold text-[#2C100C] text-xl mb-3">Digital Certificate</h4>
                  <p className="text-[#5A3828] text-sm md:text-base leading-relaxed">A beautifully designed digital certificate of participation honoring your contribution to the season's hunt.</p>
                </div>
                {/* Card 2 */}
                <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/60 shadow-sm text-center group hover:bg-white/60 transition-colors">
                  <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-gradient-to-br from-[#8B3A2B] to-[#5A1810] text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <BookOpen className="w-6 h-6 md:w-8 md:h-8"/>
                  </div>
                  <h4 className="font-bold text-[#2C100C] text-xl mb-3">Global Exposure</h4>
                  <p className="text-[#5A3828] text-sm md:text-base leading-relaxed">Your submitted verses will be read, reviewed, and considered by our elite panel of international editors.</p>
                </div>
                {/* Card 3 */}
                <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/60 shadow-sm text-center group hover:bg-white/60 transition-colors">
                  <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-gradient-to-br from-[#8B3A2B] to-[#5A1810] text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                    <ShieldCheck className="w-6 h-6 md:w-8 md:h-8"/>
                  </div>
                  <h4 className="font-bold text-[#2C100C] text-xl mb-3">Community Access</h4>
                  <p className="text-[#5A3828] text-sm md:text-base leading-relaxed">Receive an exclusive invitation to join the Ink Fetish inner circle and global writer's network.</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* --- WHY JOIN SECTION --- */}
        <section className="py-12 md:py-20 px-4 md:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6 md:gap-8">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-serif font-medium text-[#2C100C] mb-3 md:mb-4 tracking-tight">An Unrivaled Literary Experience</h2>
                <p className="text-[#5A3828] text-base md:text-lg leading-relaxed">We’ve completely reimagined the poetry competition. From submission to publication, every detail is crafted for literary excellence.</p>
              </div>
              <Button variant="outline" className="w-full md:w-auto rounded-full border-[#8B3A2B] text-[#8B3A2B] hover:bg-[#8B3A2B] hover:text-white px-8 py-6">
                View Guidelines
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              <div className="lg:col-span-2 bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-lg border border-white/60 rounded-[1.5rem] md:rounded-[2rem] p-8 md:p-10 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-orange-400/10 rounded-full blur-3xl group-hover:bg-orange-400/20 transition-colors pointer-events-none"></div>
                <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-[#8B3A2B] mb-5 md:mb-6" />
                <h3 className="text-2xl md:text-3xl font-serif font-medium text-[#2C100C] mb-3 md:mb-4">Hardcover Publication</h3>
                <p className="text-[#5A3828] text-base md:text-lg max-w-md leading-relaxed">The top 100 poems are curated into 'Autumn Whispers', a premium cloth-bound hardcover anthology distributed globally.</p>
              </div>
              
              <div className="bg-gradient-to-br from-[#8B3A2B]/90 to-[#5A1810]/90 backdrop-blur-lg border border-[#8B3A2B]/20 rounded-[1.5rem] md:rounded-[2rem] p-8 md:p-10 shadow-xl text-white relative overflow-hidden">
                <Trophy className="w-10 h-10 md:w-12 md:h-12 text-orange-300 mb-5 md:mb-6" />
                <h3 className="text-xl md:text-2xl font-serif font-medium mb-3 md:mb-4">The Golden Leaf</h3>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">Alongside cash prizes, laureates receive our beautifully crafted, signature physical trophy.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- TIMELINE / PROCESS SECTION --- */}
        <section className="py-16 md:py-24 px-4 md:px-6 relative z-10 border-t border-[#8B3A2B]/10">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center justify-center text-center mb-12 md:mb-20 z-10 relative">
              <h2 className="text-[3.5rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[8rem] font-sans font-black text-transparent bg-clip-text bg-gradient-to-b from-[#2C100C] to-[#5A1810] drop-shadow-md uppercase tracking-tighter leading-[0.85] mb-6">
                TIMELINE
              </h2>
              <div className="flex items-center justify-center gap-4">
                <div className="h-[2px] w-12 md:w-20 bg-[#8B3A2B]/40"></div>
                <span className="text-[#8B3A2B] font-bold uppercase tracking-[0.3em] text-xs md:text-sm">The Journey</span>
                <div className="h-[2px] w-12 md:w-20 bg-[#8B3A2B]/40"></div>
              </div>
            </div>
            
            <div className="relative">
              {/* Elegant Vertical Line */}
              <div className="absolute left-[2.25rem] md:left-[3.25rem] top-10 bottom-10 w-[2px] bg-gradient-to-b from-[#8B3A2B]/40 via-orange-400/30 to-transparent"></div>
              
              <div className="space-y-12 md:space-y-16">
                {[
                  { step: "01", icon: <PenTool className="w-5 h-5 md:w-8 md:h-8"/>, title: "Submission Phase", date: "Closing Nov 30, 2026", desc: "Submit your verses via our secure platform. Multiple entries are permitted." },
                  { step: "02", icon: <ShieldCheck className="w-5 h-5 md:w-8 md:h-8"/>, title: "Blind Evaluation", date: "Dec 1 - Dec 20, 2026", desc: "Our jury evaluates all entries stripped of personal identifiers to ensure pure merit." },
                  { step: "03", icon: <Award className="w-5 h-5 md:w-8 md:h-8"/>, title: "Results Declared", date: "Jan 10, 2027", desc: "Winners are announced publicly and contacted for prize distribution." },
                  { step: "04", icon: <BookMarked className="w-5 h-5 md:w-8 md:h-8"/>, title: "Anthology Published", date: "Feb 2027", desc: "The top 100 poems are published globally in the hardcover 'Autumn Whispers'." }
                ].map((item, idx) => (
                  <div key={idx} className="relative flex items-start gap-6 md:gap-10 group">
                    
                    {/* Node */}
                    <div className="w-[4.5rem] h-[4.5rem] md:w-[6.5rem] md:h-[6.5rem] rounded-full bg-white/60 backdrop-blur-xl border-4 border-white shadow-xl flex items-center justify-center shrink-0 relative z-10 group-hover:scale-105 transition-transform">
                      <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#8B3A2B] to-[#5A1810] flex items-center justify-center text-white shadow-inner">
                        {item.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow pt-2 md:pt-4">
                      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-4">
                        <div className="flex items-center gap-4">
                          <span className="font-serif font-black text-transparent bg-clip-text bg-gradient-to-br from-[#8B3A2B] to-orange-500 text-3xl md:text-5xl opacity-80">{item.step}</span>
                          <h3 className="font-bold text-[#2C100C] text-xl md:text-3xl leading-none">{item.title}</h3>
                        </div>
                        <div className="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#8B3A2B] bg-white/70 backdrop-blur-md border border-white shadow-sm py-1.5 px-4 rounded-full whitespace-nowrap w-fit">
                          <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" /> {item.date}
                        </div>
                      </div>
                      
                      <div className="bg-white/40 backdrop-blur-md p-5 md:p-6 rounded-2xl md:rounded-[2rem] border border-white/60 shadow-sm group-hover:bg-white/60 transition-colors">
                        <p className="text-[#5A3828] text-sm md:text-base leading-relaxed font-medium">{item.desc}</p>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- RULES SECTION --- */}
        <section className="py-16 md:py-24 px-4 md:px-6 relative z-10 border-t border-[#8B3A2B]/10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-center text-center mb-12 md:mb-20 z-10 relative">
              <h2 className="text-[3.5rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[8rem] font-sans font-black text-transparent bg-clip-text bg-gradient-to-b from-[#2C100C] to-[#5A1810] drop-shadow-md uppercase tracking-tighter leading-[0.85] mb-6">
                RULES
              </h2>
              <div className="flex items-center justify-center gap-4">
                <div className="h-[2px] w-12 md:w-20 bg-[#8B3A2B]/40"></div>
                <span className="text-[#8B3A2B] font-bold uppercase tracking-[0.3em] text-xs md:text-sm">Guidelines & Eligibility</span>
                <div className="h-[2px] w-12 md:w-20 bg-[#8B3A2B]/40"></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              {[
                { title: "100% Originality", desc: "All submitted work must be entirely original. Previously published poems (including on personal blogs) are strictly not permitted." },
                { title: "No Strict Theme", desc: "Your poem does not need to be about 'Autumn' directly. We are looking for raw emotion, depth, and vulnerability." },
                { title: "Length & Format", desc: "There is no strict word limit, however, we strongly recommend keeping your verses under 40 lines for maximum impact." },
                { title: "Multiple Submissions", desc: "You are allowed to submit multiple entries. Each submission is judged independently, increasing your chances of winning." },
                { title: "Language", desc: "To ensure a fair evaluation by our global jury, all entries must be written primarily in the English language." },
                { title: "Copyright", desc: "You retain 100% copyright of your work. We only request permission to publish it in the final anthology if selected." }
              ].map((rule, idx) => (
                <div key={idx} className="bg-white/50 backdrop-blur-md rounded-2xl p-6 border border-white shadow-sm hover:-translate-y-1 transition-transform">
                  <div className="text-4xl font-serif font-black text-[#8B3A2B]/20 mb-2">0{idx + 1}</div>
                  <h4 className="text-lg font-bold text-[#2C100C] mb-2">{rule.title}</h4>
                  <p className="text-[#5A3828] text-sm leading-relaxed">{rule.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* --- LANDSCAPE GROUP 2: About & Testimonials --- */}
      <section 
        className="py-16 md:py-24 px-4 md:px-6 relative bg-cover bg-center bg-fixed z-20"
        style={{ backgroundImage: 'url("/bg-landscape.png")' }}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[4px] z-0"></div>

        <div className="max-w-7xl mx-auto relative z-10 space-y-24 md:space-y-32">
          
          {/* ABOUT INK FETISH & PAST EVENTS */}
          <div>
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center shrink-0 shadow-lg border border-white/20">
                    <Feather className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <div>
                    <div className="inline-block px-3 py-1 rounded-full border border-white/20 text-orange-300 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">About The Organizers</div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-white leading-tight">Ink Fetish</h2>
                  </div>
                </div>
                <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
                  We are India's premier independent publishing house, dedicated to transforming raw emotion into literary artifacts. We don't just print books; we curate experiences that honor the art of the written word.
                </p>
                <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8">
                  Over the past five years, our competitions have discovered and launched the careers of over 400 debut authors across the globe.
                </p>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-serif text-orange-400 mb-1">50+</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Anthologies Published</div>
                  </div>
                  <div className="w-px h-12 bg-white/10"></div>
                  <div className="text-center">
                    <div className="text-3xl font-serif text-orange-400 mb-1">₹5L+</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Prizes Distributed</div>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2 w-full">
                <h3 className="text-white text-xl font-serif mb-6 border-b border-white/10 pb-4">Our Blockbuster Past Events</h3>
                <div className="space-y-4">
                  {[
                    { title: "Summer Haiku Festival 2025", metric: "12,000 Entries", status: "Published" },
                    { title: "Midnight Monologues", metric: "Spoken Word Anthology", status: "Bestseller" },
                    { title: "Spring Poetry Retreat", metric: "₹1,00,000 Prize Pool", status: "Concluded" }
                  ].map((event, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5 flex justify-between items-center hover:bg-white/10 transition-colors">
                      <div>
                        <h4 className="text-white font-bold text-lg">{event.title}</h4>
                        <span className="text-orange-300/80 text-xs uppercase tracking-widest font-semibold">{event.metric}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/40 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        <span className="hidden sm:inline">{event.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* TESTIMONIALS */}
          <div>
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-serif font-medium text-white mb-3 md:mb-4">Voices of the Hunt</h2>
              <p className="text-white/60 text-sm md:text-lg uppercase tracking-[0.2em] font-semibold">Reviews from our past laureates</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {[
                { text: "Winning the Autumn Poetry Hunt gave me the confidence to finally publish my own book. The physical anthology is the most beautiful book on my shelf.", author: "Sarah Jenkins", role: "Season 1 Winner" },
                { text: "The quality of the anthology they produce is breathtaking. The entire process from submission to receiving the book felt incredibly premium and respectful to the artists.", author: "David Chen", role: "Published in 'Autumn Whispers'" },
                { text: "Ink Fetish doesn't just run a competition, they build a community. The podcast interview they arranged after my win completely changed my career.", author: "Aanya Patel", role: "Season 1 Runner-Up" },
                { text: "Transparent judging, on-time results, and an incredibly communicative team. By far the most professional poetry competition I've ever entered.", author: "Marcus Thorne", role: "Top 100 Laureate" }
              ].map((testimonial, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-2xl md:rounded-3xl hover:bg-white/10 transition-colors">
                  <Quote className="text-orange-400 w-8 h-8 md:w-10 md:h-10 mb-4 md:mb-6 opacity-50" />
                  <p className="text-white text-lg md:text-xl font-serif font-light leading-relaxed mb-6 md:mb-8">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center text-white font-serif font-bold text-lg md:text-xl shrink-0">{testimonial.author.charAt(0)}</div>
                    <div>
                      <div className="font-bold text-white tracking-wide text-sm md:text-base">{testimonial.author}</div>
                      <div className="text-[10px] md:text-xs text-orange-300 uppercase tracking-widest font-semibold mt-0.5 md:mt-1">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* --- TEXTURE GROUP 3: Form & Footer --- */}
      <div 
        className="bg-cover bg-center flex-grow flex flex-col w-full relative z-10"
        style={{ backgroundImage: 'url("/bg-texture.png")' }}
      >
        {/* 5. Modern Split Registration Form */}
        <section id="register-form" className="py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-2xl rounded-[2rem] md:rounded-[2.5rem] shadow-[0_20px_60px_rgba(139,58,43,0.15)] border border-white overflow-hidden flex flex-col lg:flex-row">
            
            {/* Left Info Panel */}
            <div className="lg:w-2/5 bg-gradient-to-br from-[#2C100C] to-[#1A0805] p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/20 rounded-full blur-[80px] pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 md:mb-8">
                  <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" /> Closing Soon
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4 md:mb-6 leading-tight">Begin Your <br className="hidden md:block"/>Literary Journey</h2>
                <p className="text-white/70 text-sm md:text-lg mb-8 md:mb-10 leading-relaxed">
                  Join thousands of writers who have trusted us with their words. Secure your spot in this year's hunt before the gates close.
                </p>
                
                <div className="space-y-5 md:space-y-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white tracking-wide text-sm md:text-base">Secure Submission</h4>
                      <p className="text-xs md:text-sm text-white/60 mt-1 leading-relaxed">256-bit encryption protects your personal data and poetry.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Feather className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white tracking-wide text-sm md:text-base">Copyright Retained</h4>
                      <p className="text-xs md:text-sm text-white/60 mt-1 leading-relaxed">You retain 100% of the rights to your original work.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-10 md:mt-12 pt-6 md:pt-8 border-t border-white/10 hidden md:block">
                <p className="text-sm text-white/50 italic">"The defining competition of the autumn season."</p>
              </div>
            </div>
            
            {/* Right Form Panel */}
            <div className="lg:w-3/5 p-6 md:p-12 lg:p-16">
              <form className="space-y-6 md:space-y-8">
                
                <div className="space-y-2 md:space-y-3">
                  <Label className="text-[10px] md:text-xs font-bold text-[#5A3828] uppercase tracking-widest">Full Name</Label>
                  <Input placeholder="Jane Doe" className="bg-transparent border-0 border-b-2 border-[#8B3A2B]/20 rounded-none px-0 py-2 text-base md:text-xl focus-visible:ring-0 focus-visible:border-[#8B3A2B] transition-colors" />
                </div>

                <div className="grid grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-2 md:space-y-3">
                    <Label className="text-[10px] md:text-xs font-bold text-[#5A3828] uppercase tracking-widest">Age</Label>
                    <Input type="number" placeholder="25" className="bg-transparent border-0 border-b-2 border-[#8B3A2B]/20 rounded-none px-0 py-2 text-base md:text-xl focus-visible:ring-0 focus-visible:border-[#8B3A2B] transition-colors" />
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <Label className="text-[10px] md:text-xs font-bold text-[#5A3828] uppercase tracking-widest">Phone Number</Label>
                    <Input type="tel" placeholder="+91 98765 43210" className="bg-transparent border-0 border-b-2 border-[#8B3A2B]/20 rounded-none px-0 py-2 text-base md:text-xl focus-visible:ring-0 focus-visible:border-[#8B3A2B] transition-colors" />
                  </div>
                </div>

                <div className="space-y-2 md:space-y-3">
                  <Label className="text-[10px] md:text-xs font-bold text-[#5A3828] uppercase tracking-widest">Email Address</Label>
                  <Input type="email" placeholder="jane@example.com" className="bg-transparent border-0 border-b-2 border-[#8B3A2B]/20 rounded-none px-0 py-2 text-base md:text-xl focus-visible:ring-0 focus-visible:border-[#8B3A2B] transition-colors" />
                </div>

                <div className="space-y-2 md:space-y-3">
                  <Label className="text-[10px] md:text-xs font-bold text-[#5A3828] uppercase tracking-widest">How many poems to submit?</Label>
                  <Input type="number" min="1" placeholder="e.g. 3" className="bg-transparent border-0 border-b-2 border-[#8B3A2B]/20 rounded-none px-0 py-2 text-base md:text-xl focus-visible:ring-0 focus-visible:border-[#8B3A2B] transition-colors" />
                </div>

                <div className="pt-2 pb-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-[#8B3A2B]/40 text-[#8B3A2B] focus:ring-[#8B3A2B] cursor-pointer" />
                    <span className="text-[#5A3828] text-sm md:text-base font-medium group-hover:text-[#2C100C] transition-colors">I confirm these details are correct</span>
                  </label>
                </div>

                <div className="pt-2 md:pt-4">
                  <Link href="/autumn-poetry-hunt/submit">
                    <Button type="button" className="w-full bg-gradient-to-r from-[#2C100C] to-[#5A1810] hover:from-black hover:to-[#2C100C] text-white text-base md:text-lg font-bold px-6 py-6 md:px-8 md:py-7 rounded-xl md:rounded-2xl shadow-xl hover:-translate-y-1 transition-all group flex items-center justify-center gap-2 md:gap-3">
                      <Lock className="w-3.5 h-3.5 md:w-4 md:h-4 text-orange-400/80" />
                      Proceed to Submission Editor
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-orange-400 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Custom Premium Event Footer */}
        <footer className="bg-[#1A0B09] text-white pt-20 pb-10 px-4 md:px-6 relative z-10 border-t border-[#8B3A2B]/20">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            
            {/* Event Logo */}
            <div className="mb-8 relative w-64 md:w-80 h-24">
              <Image 
                src="/logo-transparent-v2.png"
                alt="Autumn Poetry Hunt 2026"
                fill
                className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] brightness-110"
              />
            </div>

            <h4 className="font-bold text-orange-400 text-xl md:text-2xl mb-4 tracking-wider">The Ultimate Literary Showdown</h4>
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-2xl mb-12">
              Autumn Poetry Hunt is the flagship creative initiative by Ink Fetish Publications. Our mission is to discover raw talent, honor the art of words, and transform digital creativity into premium physical craftsmanship.
            </p>

            {/* Essential Event Links */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-xs md:text-sm font-bold uppercase tracking-widest text-white/50 mb-12">
              <a href="#" className="hover:text-orange-400 transition-colors">Contact Support</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
            </div>

            <div className="w-full pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
               <p className="text-white/40 text-xs tracking-wider uppercase">© {new Date().getFullYear()} Ink Fetish Publications. All rights reserved.</p>
               <div className="text-orange-500/50 text-xs tracking-wider uppercase font-bold">Powered by Ink Fetish</div>
            </div>

          </div>
        </footer>
      </div>
    </div>
  );
}
