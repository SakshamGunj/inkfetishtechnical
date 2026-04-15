'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Star, BookOpen, 
  Search, Filter, ArrowRight,
  ShieldCheck, Zap, Globe
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const bookData = [
  { 
    id: '1', 
    title: 'Silfira', 
    author: 'Anwesha', 
    genre: 'Fantasy Fiction', 
    path: '/books/silfira', 
    status: 'Pre-order',
    imprint: 'Inkfetish Original',
    isbn: '978-81-00001-01-0',
    price: '₹499',
    featured: true 
  },
  { 
    id: '2', 
    title: 'Shakespeare & What Remained', 
    author: 'Various Authors', 
    genre: 'Poetry Anthology', 
    path: '/books/shakespeare-and-what-remained', 
    status: 'In Stock',
    imprint: 'IWL Collection',
    isbn: '978-81-00001-02-7',
    price: '₹349',
    featured: true 
  },
  { 
    id: '3', 
    title: 'Love at Minus One', 
    author: 'Various Authors', 
    genre: 'Romance Anthology', 
    path: '/love-at-minus-one/manuscript', 
    status: 'Limited Edition',
    imprint: 'Season Specials',
    isbn: '978-81-00001-03-4',
    price: '₹599',
    featured: false 
  },
  { 
    id: '4', 
    title: 'Petals and Scars', 
    author: 'Ananya D.', 
    genre: 'Contemporary Poetry', 
    path: '/anthology/petals-and-scars', 
    status: 'Coming Soon',
    imprint: 'Inkfetish Debut',
    isbn: 'TBD',
    price: 'TBD',
    featured: false 
  },
  { 
    id: '5', 
    title: 'Hearts Under Construction', 
    author: 'Multiple Authors', 
    genre: 'Fiction Anthology', 
    path: '/anthology/hearts-under-construction', 
    status: 'In Production',
    imprint: 'IWL Masters',
    isbn: 'TBD',
    price: 'TBD',
    featured: false 
  },
];

const BookstoreClient = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const genres = ['All', 'Fantasy Fiction', 'Poetry Anthology', 'Romance Anthology', 'Contemporary Poetry', 'Fiction Anthology'];
  
  const filteredBooks = bookData.filter(book => 
    (filter === 'All' || book.genre === filter) &&
    (book.title.toLowerCase().includes(search.toLowerCase()) || book.author.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-ink-900 font-serif selection:bg-ink-900 selection:text-[#FDFBF7]">
      <Navbar />

      {/* Dashboard Hero - Featured Book */}
      <section className="pt-24 md:pt-40 pb-16 md:pb-24 relative bg-white border-b border-ink-900/10 overflow-hidden min-h-[85vh] flex flex-col items-center justify-center">
        {/* Subtle SVG Grid Background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-bookstore" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-bookstore)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="inline-flex items-center gap-2 bg-[#9D00FF]/10 text-[#9D00FF] px-4 py-1 text-[10px] uppercase font-black tracking-widest border border-[#9D00FF]/20 mb-8">
                <Star size={12} className="fill-current" /> Featured Spotlight
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-serif text-ink-900 leading-[1.1] tracking-tighter uppercase italic mb-8">
                SILFIRA. <br/><span className="italic font-light not-italic">A Silent Fire.</span>
              </h1>

              <p className="text-lg md:text-xl text-ink-600 font-sans font-light leading-relaxed mb-10 max-w-xl">
                The most exciting new fantasy book. Read a story of magic and passion. Pre-order your physical copy today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/books/silfira">
                  <Button className="bg-ink-900 text-[#FDFBF7] hover:bg-gold hover:text-ink-900 rounded-none px-10 py-7 text-sm font-sans uppercase tracking-[0.2em] transition-all font-black border-2 border-ink-900 shadow-none">
                    PRE-ORDER NOW
                  </Button>
                </Link>
                <Link href="/author/anwesha">
                  <Button variant="outline" className="bg-transparent text-ink-900 border border-ink-900/30 hover:bg-ink-900/5 hover:text-ink-900 rounded-none px-10 py-7 text-sm font-sans uppercase tracking-[0.2em] transition-all font-bold shadow-none">
                    MEET THE AUTHOR
                  </Button>
                </Link>

              </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="relative hidden lg:block"
            >
                {/* Cinematic Book Mockup Wall */}
                <div className="aspect-[3/4] bg-ink-900 border-[8px] border-white shadow-2xl flex items-center justify-center relative group overflow-hidden">
                    <div className="absolute inset-0 bg-[#BBF7D0]/20 group-hover:bg-[#BBF7D0]/0 transition-colors duration-700" />
                    <div className="text-center p-12">
                        <div className="text-white text-9xl font-black italic tracking-tighter opacity-10 leading-none">SILFIRA</div>
                        <BookOpen className="w-24 h-24 text-[#39FF14] mx-auto mt-[-4rem] animate-pulse" strokeWidth={0.5} />
                    </div>
                    {/* Corner Tag */}
                    <div className="absolute top-8 right-8 bg-[#39FF14] text-ink-900 font-sans font-black uppercase text-xs tracking-widest px-4 py-2 rotate-12">
                        BESTSELLER
                    </div>
                </div>
            </motion.div>
          </div>
        </div>

        {/* Abstract Book pattern background */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.02] pointer-events-none translate-x-1/4">
            <BookOpen className="w-full h-full" strokeWidth={0.1} />
        </div>
      </section>

      {/* Book Grid Dashboard */}
      <section className="py-24 bg-[#FDFBF7] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
          {/* Dashboard Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-16 border-b border-ink-900/10 pb-12">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
               {genres.map(g => (
                 <button 
                   key={g} 
                   onClick={() => setFilter(g)}
                   className={`px-6 py-2 text-[10px] font-sans uppercase tracking-widest font-black transition-all border-2 ${
                     filter === g ? 'bg-ink-900 text-white border-ink-900' : 'bg-transparent text-ink-400 border-transparent hover:border-ink-900/10 hover:text-ink-900'
                   }`}
                 >
                   {g}
                 </button>
               ))}
            </div>

            <div className="relative w-full lg:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="SEARCH BOOKS..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white border-2 border-ink-900 px-12 py-4 font-sans font-black text-xs tracking-widest focus:outline-none focus:bg-ink-900/5 transition-all uppercase italic"
                />
            </div>
          </div>

          {/* Book Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <AnimatePresence mode="popLayout">
              {filteredBooks.map((book) => (
                <motion.div 
                  key={book.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group"
                >
                   <Link href={book.path}>
                    <div className="aspect-[2/3] bg-white border-4 border-ink-900 p-8 shadow-[8px_8px_0_0_rgba(0,0,0,0.05)] transition-all group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] group-hover:shadow-[16px_16px_0_0_#9D00FF] relative overflow-hidden flex flex-col justify-between">
                        {/* Status Badge */}
                        <div className="absolute top-4 right-4 bg-ink-900 text-white font-sans font-black uppercase text-[8px] tracking-[0.2em] px-3 py-1">
                            {book.status}
                        </div>

                        <div className="text-xs font-sans font-black text-ink-400 uppercase tracking-widest group-hover:text-ink-600 transition-colors">
                            {book.imprint}
                        </div>

                        <div className="my-12">
                            <h3 className="text-3xl font-serif font-black text-ink-900 leading-tight italic uppercase tracking-tighter group-hover:text-[#9D00FF] transition-colors">{book.title}</h3>
                            <p className="text-xs font-sans text-ink-500 uppercase tracking-[0.2em] mt-4 font-bold">{book.author}</p>
                        </div>
                        
                        <div className="flex justify-between items-end border-t border-ink-900/10 pt-6">
                            <div>
                                <div className="text-[9px] font-sans text-ink-300 uppercase tracking-widest mb-1 italic">Genre</div>
                                <div className="text-[10px] font-sans font-black uppercase tracking-widest">{book.genre}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs font-sans font-black text-ink-900 uppercase tracking-widest">{book.price}</div>
                            </div>
                        </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* "How It's Done" - The Production Pipeline Section */}
      <section className="py-24 bg-ink-900 text-[#FDFBF7] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
             <h2 className="text-[10px] font-sans uppercase tracking-[0.4em] text-ink-400 font-black mb-6 italic">HOW IT'S DONE</h2>
             <h3 className="text-4xl md:text-6xl font-serif font-bold text-white leading-[1.1] uppercase italic tracking-tighter">
                We Make <br/><span className="text-gold">Best-Sellers.</span>
             </h3>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
             {/* Progress Line */}
             <div className="hidden lg:block absolute top-[2.2rem] left-0 w-full h-[2px] bg-white/10 z-0" />
             
             {[
               { 
                 step: "01", 
                 title: "Great Editing", 
                 desc: "Our team checks everything and makes sure your book is perfect before it's printed.",
                 icon: <ShieldCheck className="text-[#39FF14]" />
               },
               { 
                 step: "02", 
                 title: "Beautiful Design", 
                 desc: "We design covers that look great on any shelf. Your book will look professional and high-end.",
                 icon: <Zap className="text-[#9D00FF]" />
               },
               { 
                 step: "03", 
                 title: "Sell Everywhere", 
                 desc: "We get your book on Amazon, Flipkart, and in 15+ countries worldwide. We handle everything.",
                 icon: <Globe className="text-[#39FF14]" />
               }
             ].map((item, i) => (
                <div key={i} className="relative z-10 space-y-8 group">
                   <div className="w-20 h-20 bg-ink-900 border-4 border-white flex items-center justify-center text-4xl font-black italic tracking-tighter group-hover:bg-white group-hover:text-ink-900 transition-all duration-500">
                      {item.step}
                   </div>
                   <h4 className="text-2xl font-serif font-black uppercase text-white tracking-widest">{item.title}</h4>
                   <p className="text-lg text-ink-300 font-sans font-light leading-relaxed">
                      {item.desc}
                   </p>
                   <div className="flex items-center gap-3 text-xs font-sans font-black uppercase tracking-widest text-ink-500">
                      {item.icon} VERIFIED PIPELINE
                   </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* Final Dashboard CTA */}
      <section className="py-24 bg-white border-t border-ink-900/10 text-center">
        <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-6xl font-black font-serif text-ink-900 leading-[1.1] tracking-tighter uppercase italic mb-12">
                You Could Be <br/><span className="italic font-light not-italic text-gold">Next In Production.</span>
            </h2>


            <Link href="/launchpad">
                <button className="bg-ink-900 text-[#FDFBF7] font-sans uppercase tracking-[0.2em] py-6 px-12 text-sm font-black hover:bg-gold hover:text-ink-900 transition-all border border-ink-900 shadow-none">
                    GET PUBLISHED <ArrowRight className="inline-block ml-4 w-4 h-4" />
                </button>


            </Link>
        </div>
      </section>

    </div>
  );
};

export default BookstoreClient;
