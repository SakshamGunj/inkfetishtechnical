'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ShoppingBag, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const books = [
  { id: '1', title: 'Silfira', author: 'Anwesha', genre: 'Fantasy Fiction', path: '/books/silfira', featured: true },
  { id: '2', title: 'Shakespeare & What Remained', author: 'Various Authors', genre: 'Poetry Anthology', path: '/books/shakespeare-and-what-remained', featured: true },
  { id: '3', title: 'Love at Minus One', author: 'Various Authors', genre: 'Romance Anthology', path: '/love-at-minus-one/manuscript', featured: false },
  { id: '4', title: 'Petals and Scars', author: 'Coming Soon', genre: 'Contemporary Poetry', path: '/anthology/petals-and-scars', featured: false },
  { id: '5', title: 'Hearts Under Construction', author: 'TBD', genre: 'Fiction Anthology', path: '/anthology/hearts-under-construction', featured: false },
];

const CatalogClient = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-ink-900 font-serif selection:bg-ink-900 selection:text-[#FDFBF7]">
      <Navbar />

      <section className="pt-40 pb-20 relative border-b border-ink-900/10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-xs font-sans uppercase tracking-[0.3em] text-ink-500 mb-4 font-bold">The Collection</h2>
              <h1 className="text-4xl md:text-6xl font-bold font-serif text-ink-900 leading-tight">
                Our <br/><span className="italic font-light">Books.</span>
              </h1>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-ink-600 font-sans font-light max-w-sm"
            >
              Every book on this list is high-quality, professional, and ready for you to read now.
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 mb-12 border-b border-ink-900/10 pb-6 overflow-x-auto whitespace-nowrap">
            <button className="text-[10px] font-sans uppercase tracking-[0.2em] font-bold text-ink-900 border-b-2 border-ink-900 pb-2">All Imprints</button>
            <button className="text-[10px] font-sans uppercase tracking-[0.2em] text-ink-500 hover:text-ink-900 transition-colors pb-2">Poetry</button>
            <button className="text-[10px] font-sans uppercase tracking-[0.2em] text-ink-500 hover:text-ink-900 transition-colors pb-2">Fiction</button>
            <button className="text-[10px] font-sans uppercase tracking-[0.2em] text-ink-500 hover:text-ink-900 transition-colors pb-2">Anthologies</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {books.map((book) => (
              <Link 
                key={book.id}
                href={book.path} 
                className="group flex flex-col"
              >
                <div className="aspect-[2/3] border border-ink-900/20 bg-white p-6 relative overflow-hidden transition-all duration-700 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] group-hover:-translate-y-2 flex flex-col justify-center items-center">
                  {book.featured && (
                    <div className="absolute top-4 left-4 border border-ink-900/20 px-2 py-1 bg-white z-10">
                      <span className="text-[9px] uppercase tracking-widest text-ink-900 font-sans font-bold">Featured</span>
                    </div>
                  )}
                  <div className="absolute inset-2 border border-ink-900/5 group-hover:border-ink-900/10 transition-colors duration-500 pointer-events-none" />
                  {book.genre.includes('Fantasy') ? (
                     <Sparkles className="w-12 h-12 text-ink-900/20 group-hover:text-ink-900/50 transition-colors duration-700 mb-6" strokeWidth={0.5} />
                  ) : (
                     <BookOpen className="w-12 h-12 text-ink-900/20 group-hover:text-ink-900/50 transition-colors duration-700 mb-6" strokeWidth={0.5} />
                  )}
                  <div className="text-center font-serif text-ink-900 opacity-60 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="text-xs font-light italic">{book.genre}</div>
                    <div className="font-bold mt-2 text-xl leading-tight px-4">{book.title}</div>
                  </div>
                </div>
                <div className="mt-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-serif font-bold text-ink-900 leading-tight group-hover:text-ink-600 transition-colors">{book.title}</h3>
                  <p className="text-xs font-sans uppercase tracking-[0.15em] text-ink-500 mt-2 font-bold">{book.author}</p>
                  <div className="mt-6 flex items-center text-[10px] font-sans uppercase tracking-[0.2em] font-bold text-ink-900 group-hover:text-ink-600 transition-colors">
                    <ShoppingBag className="w-3 h-3 mr-2" strokeWidth={1.5} /> View Details
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default CatalogClient;
