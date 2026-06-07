'use client';

import React, { useState, useEffect } from 'react';
import { Search, Sparkles, AlertCircle, ArrowUp, User, Globe, Trophy, Award } from 'lucide-react';
import Link from 'next/link';

const AUTHORS = [
  "Gayathri Nair C",
  "Pen name - Mamnoon",
  "Monalisa Biswal",
  "SWARUP GHOSH",
  "Salman Tamimi",
  "Shubham Pandey Radhey",
  "Karthik sadagopal",
  "Ramanpreet",
  "Sheetal Sanghvi",
  "Anjana Ragunath",
  "Udit pratap singh",
  "NinjaMenon",
  "Prachala Anupmeya",
  "Bhargavi Sonowal Kouli",
  "Ankita Kakati",
  "Narahari Rao Bapuram",
  "Dr. Tushar Amankar",
  "Dr. Tushar mankar",
  "Harshdeep singh",
  "Vanya Singh Jauhar",
  "The New Era",
  "Priyami Dutta",
  "Rashi Suhasaria",
  "Lokesh Goenka",
  "Ribon Teronpi",
  "Chandra Prakash Yadav",
  "Deependra Vashishtha",
  "GS Chandrashekhar",
  "Adeela Jawaid",
  "Sejal C.",
  "Ridhima Bhagawati",
  "Jump Start Your Heart",
  "Debasish Mahapatra",
  "Sushil Kumar Rana",
  "HENSI CHELANI",
  "Moumita",
  "Dharmesh Parmar",
  "Akshay Khare",
  "Utsab Dey",
  "Surekha Anandraya Bhat",
  "Ashish Changavalli",
  "chetna choudhary",
  "Vinamra Pawar",
  "Kirtika",
  "RAVIKANT VISHWANATH KHADSE",
  "Meenakshi",
  "Ashok Bhandari",
  "Swati Sharma",
  "SANJAY DANGE",
  "Anil Gokhale",
  "Sumegha S",
  "Rafat naseer",
  "Jia modha",
  "Dr Deepak Tak",
  "kumkum saxena",
  "Azra Azad",
  "ਹਰਮਨਪ੍ਰੀ ਤ ਕੌਰ",
  "Dr Mohan Shende",
  "Mrutyunjay Dash",
  "Deepali Singhal",
  "Pragya Narayan",
  "YAJUSH DUBEY",
  "Shalu parveen",
  "Roohani Sharma",
  "Rupesh Mahotra",
  "Nishtha Mishra",
  "PRIYANKA DARGI",
  "EShruti Gokhale",
  "Samriddhi",
  "Kalkhi heenal",
  "Prachi Dhawan",
  "Vaishali saxena",
  "Pooja Soni",
  "Mehek Naskar",
  "FATHIMA A",
  "M Shiva Kumar",
  "Asmita Mishra",
  "Pranshu",
  "Subasini mohanty",
  "Srishti Kumari",
  "Sreetija Choudhury",
  "Arshiya",
  "arshpreet kaur",
  "Naqiyah Jariwala",
  "Gargi Kulkarni",
  "Shahnawaz Salmani",
  "Anchal Trivedi",
  "Ananya Narang",
  "Shauryam Rawat",
  "V Poojitha",
  "Geetha Haridas",
  "Nikita Pathak Jog",
  "Jyotee Dokhale",
  "Dr. Infini Lionne",
  "Aswin A",
  "Nivisha",
  "Akshay Udaykumar Jangam",
  "Dr. Mervyn Abreo",
  "Mahima Mittal Gupta",
  "Agni (Selva Mahalakshmi)",
  "Deeksha Mehta",
  "Pathan Kiswakhan",
  "Devananda V",
  "Samar Nayak",
  "Fasiha Khan",
  "Aleena Kashif",
  "इम्ति या ज़ संजी दा",
  "Debangana Bhattacharjee",
  "Punya Prasun Dash",
  "Sumayya.P.M",
  "Dr.ANAPARTHI RAMA MOHANA RAO",
  "Salil Bahl",
  "Arjumand Bint Wahaj",
  "Pratiti Bhadra",
  "Aditi Kadam",
  "Srijita Bhattacharyya",
  "Amandeep Kaur",
  "Sasanka Satapathy",
  "Shibi A R",
  "Wasaka bari shah",
  "Hemant Prasad",
  "Kartik Raina",
  "Dr. Biplab Chowdhury",
  "M Blessy Aquila",
  "Deebikaa.E",
  "Debashis Bhattacharyya",
  "RAHUL BHUJEL",
  "Gopinath S Iyengar",
  "Sree Bindu.R.S",
  "Gargi Sidana",
  "Wangshak",
  "Upadhayayula Krishna Sanjana",
  "Beetroot",
  "Clint climaco colaco",
  "Lakshmi Supriya",
  "Dr. Ekta Priya",
  "Archana Anil Patil/Girija",
  "Kaviya Karthikeyan",
  "VIVEK ARPOYIL",
  "DR. SUDEVI BASU",
  "Deepika Rawal",
  "Aizah Khan",
  "Sanjukta Guha",
  "Aarna Khivasara",
  "Siddhi Singh",
  "Alina Shaikh",
  "Mohammed Mukarram",
  "Dharmik Mehta",
  "Dr.B.Ps.Toi",
  "Dr. Aditya Verma",
  "Aritra Banerjee",
  "Mohammed Adil",
  "Smitha krishna",
  "Dr D Wilfin John",
  "K.BHUVANEESHWARI/SRIKO",
  "Harleen sethi",
  "L Leema Daphne",
  "Dilnaz. J",
  "Truce",
  "Zunera Asad",
  "Nabanita Roy",
  "REMADEVI RAJESH",
  "Preetha T",
  "Kekhuleto Viswentso",
  "Asim Baadshah",
  "डॉ अनुरा ग शर्मा",
  "Piya Poppy Rathbone",
  "Manjistha Pathak",
  "Mayur Parashar",
  "Raghav Keer",
  "shashank tripathi (RAHI)",
  "Kumar Shekhar",
  "Himanshi Priyani",
  "Rahul Kulkarni",
  "Bincy Babu",
  "Ananya Narang",
  "JOYDEV MURMU",
  "Ishi Kakkar",
  "Prabha Tiwari",
  "Mauli Agrawal",
  "Pragya B",
  "Kalindi Singh",
  "Domya Kaur",
  "Rasika S",
  "UpaSana Mitra",
  "Lavanya Jalan",
  "Purnasha Paul",
  "Adhiyan",
  "Dr Akshara T",
  "Debadrita Mukherjee",
  "Amritha Jain",
  "K. BHUVANEESHWARI/SRIKO",
  "Somanathan",
  "Kartik Kulkarni",
  "Ayush Kartik/Aoi Raikage",
  "Prachi Dhawan",
  "Sheetal Sanghvi",
  "Mrutyunjay Dash",
  "Deepali Singhal",
  "Utsab Dey",
  "Divya Kumawat",
  "Swara Moharkar",
  "Vijay Pratap",
  "Amita Saxena",
  "Himanshi Priyani",
  "Mitali Saikia",
  "Lavanya"
];

export default function TopWritersClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Filter list
  const filteredAuthors = AUTHORS.filter(name =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Monitor scroll for "back to top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to extract initials for placeholder monograms
  const getInitials = (name: string) => {
    // Remove title prefixes like Dr.
    const cleanName = name.replace(/^(Dr\.|Pen name -|Advocate)\s+/i, '').trim();
    const parts = cleanName.split(/[\s/_()]+/);
    const initials = parts
      .filter(p => p.length > 0)
      .map(p => p[0].toUpperCase())
      .slice(0, 2)
      .join('');
    return initials || 'PF';
  };

  return (
    <main className="min-h-screen bg-[#050505] text-[#eee] font-sans antialiased relative overflow-hidden py-16 px-4 md:px-8">
      {/* Decorative background spotlights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b from-gold/5 via-transparent to-transparent blur-[100px] pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-gold/5 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Navigation / Back to main site link */}
        <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-4">
          <Link 
            href="/poetry-festival-s2" 
            className="text-xs uppercase tracking-widest text-[#888] hover:text-gold transition-colors font-mono"
          >
            ← Back to Festival Page
          </Link>
          <span className="text-[10px] tracking-[0.25em] uppercase text-gold font-bold font-mono bg-[#1a1510] border border-gold/15 py-1 px-3.5 rounded-full select-none">
            Inkfetish publications
          </span>
        </div>

        {/* Hero Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-1.5 mb-3 text-gold">
            <Trophy className="w-5 h-5 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.3em] font-bold">Official Recognition</span>
            <Trophy className="w-5 h-5 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-black uppercase tracking-wider text-white mb-4">
            Top Writers Showcase
          </h1>
          <p className="text-sm md:text-base text-gold font-serif italic mb-8 max-w-xl mx-auto">
            Poetry Festival Season 2
          </p>

          {/* CRITICAL: Non-ranked Disclaimer Banner */}
          <div className="max-w-2xl mx-auto bg-[#181410] border border-gold/20 p-4 rounded-sm text-left flex gap-3.5 items-start shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-gold" />
            <AlertCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs uppercase tracking-widest text-gold font-bold font-mono">
                Official Disclaimer: Non-Ranked Showcase
              </h4>
              <p className="text-xs text-white/70 leading-relaxed">
                This directory is presented in <strong>no particular order</strong> of ranking or scores. All featured writers have demonstrated exceptional literary merit, emotional depth, and outstanding craft during Poetry Festival Season 2.
              </p>
            </div>
          </div>
        </div>

        {/* Search & Statistics Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 p-4 rounded-sm mb-10 sticky top-4 z-40 shadow-xl">
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-[#444] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search writers by name..."
              className="w-full bg-[#121212] border border-white/10 rounded-sm py-2 pl-10 pr-4 text-xs text-white placeholder-[#444] focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all font-mono"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2 text-xs text-[#555] hover:text-white font-mono"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Stats */}
          <div className="flex gap-6 text-[10px] uppercase font-mono tracking-wider text-[#666] select-none">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-gold" />
              <span>Total Honorees: <strong className="text-white font-bold">{AUTHORS.length}</strong></span>
            </div>
            {searchTerm && (
              <div className="flex items-center gap-1.5 bg-gold/10 px-2 py-0.5 rounded-sm border border-gold/20">
                <span className="text-gold">Matches: <strong>{filteredAuthors.length}</strong></span>
              </div>
            )}
          </div>
        </div>

        {/* Writers Grid Container */}
        {filteredAuthors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredAuthors.map((name, index) => (
              <div
                key={`${name}-${index}`}
                className="bg-[#0a0a0a] border border-white/5 p-4 rounded-sm hover:border-gold/30 hover:shadow-[0_0_20px_rgba(212,175,55,0.05)] transition-all duration-300 flex items-center gap-3.5 group relative overflow-hidden"
              >
                {/* Thin gold side line active on hover */}
                <div className="absolute top-0 left-0 w-0.5 h-full bg-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />

                {/* Monogram / Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#181410] to-[#121212] border border-gold/15 flex items-center justify-center shrink-0 group-hover:border-gold/45 transition-colors select-none font-mono">
                  <span className="text-[11px] font-bold text-gold/80 group-hover:text-gold transition-colors tracking-wide">
                    {getInitials(name)}
                  </span>
                </div>

                {/* Name Info */}
                <div className="overflow-hidden space-y-0.5">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider group-hover:text-gold transition-colors truncate">
                    {name}
                  </h3>
                  <div className="flex items-center gap-1 text-[9px] text-[#555] uppercase tracking-widest font-mono">
                    <Award className="w-2.5 h-2.5 text-[#333]" />
                    <span>Honored Poet</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-[#0a0a0a] border border-white/5 rounded-sm">
            <Award className="w-10 h-10 text-[#222] mx-auto mb-3" />
            <p className="text-xs uppercase tracking-widest text-[#444] font-mono mb-2">No Writers Match Your Search</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="text-xs text-gold hover:underline font-mono uppercase tracking-widest"
            >
              Reset Search Filter
            </button>
          </div>
        )}

        {/* Branded Footer Badge */}
        <div className="mt-20 border-t border-white/5 pt-12 text-center pb-8">
          <div className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] font-mono text-[#555] select-none">
            <span>Inkfetish Publications</span>
            <span className="text-gold">•</span>
            <span>Est. 2020</span>
          </div>
        </div>

      </div>

      {/* Floating Scroll to Top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-[#0d0d0d] border border-gold/30 hover:border-gold hover:shadow-[0_0_15px_rgba(212,175,55,0.25)] text-gold p-2.5 rounded-sm transition-all duration-300"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </main>
  );
}
