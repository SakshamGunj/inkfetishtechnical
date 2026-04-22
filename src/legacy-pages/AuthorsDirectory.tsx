import React from 'react';
import { motion } from 'framer-motion';
import { Feather, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';

// Placeholder Authors Data
const authors = [
  { name: 'Anwesha', slug: 'anwesha', role: 'Bestselling Fantasy Fiction', imageBg: 'bg-ink-900/5' },
  { name: 'Richa K.', slug: 'richa', role: 'Contemporary Poetry', imageBg: 'bg-ink-900/10' },
  { name: 'Daniya Khan', slug: 'daniya', role: 'Narrative Non-Fiction', imageBg: 'bg-ink-900/5' },
  { name: 'Vijay Pratap', slug: 'tadashi', role: 'Historical Thriller', imageBg: 'bg-ink-900/10' },
  { name: 'Shreyo Biswas', slug: 'shreyo', role: 'Contemporary Literature', imageBg: 'bg-ink-900/5' },
  { name: 'Bhavin Triwadi', slug: 'bhavin', role: 'Contemporary Prose', imageBg: 'bg-ink-900/10' },
  { name: 'Priya Bharathy', slug: 'priya', role: 'Inspirational Memoir', imageBg: 'bg-ink-900/5' },
  { name: 'Lillian Blythe', slug: 'shambhavi', role: 'Romance & Drama', imageBg: 'bg-ink-900/5' },
  { name: 'Shikast-e-Aziz', slug: 'shikast-e-aziz', role: 'Contemporary Verse & Law', imageBg: 'bg-ink-900/10' },
  { name: 'Veiled Verses', slug: 'veiled-verses', role: 'Contemporary Poetry', imageBg: 'bg-ink-900/5' },
  { name: 'Anonymous', slug: 'anonymous', role: 'The Love Anthology Co-Author', imageBg: 'bg-ink-900/10' },
];

const AuthorsDirectory = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-ink-900 font-serif selection:bg-ink-900 selection:text-[#FDFBF7]">
      <Navbar />

      {/* Directory Hero */}
      <section className="pt-40 pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center w-full max-w-3xl mx-auto"
          >
            <h2 className="text-xs font-sans uppercase tracking-[0.3em] text-ink-500 mb-4">The Talent</h2>
            <h1 className="text-5xl md:text-7xl font-bold font-serif text-ink-900 mb-8 leading-tight">
              Our Literary <br/><span className="italic font-light">Legends.</span>
            </h1>
            <p className="text-lg text-ink-600 font-sans font-light leading-relaxed mb-12">
              From gripping fantasy realms to raw, unfiltered poetry, meet the diverse and brilliant minds published under the Inkfetish insignia. 
            </p>
            <div className="w-px h-16 bg-ink-900/20 mx-auto"></div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-16 bg-white border-t border-ink-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink-900/10 border border-ink-900/10">
            {authors.map((author, idx) => (
              <Link 
                key={author.name}
                to={`/publishedauthor/${author.slug}`} 
                className="group relative bg-[#FDFBF7] p-8 aspect-square flex flex-col items-center justify-center hover:bg-ink-900 transition-colors duration-500"
              >
                {/* Decorative Frame */}
                <div className="absolute inset-4 border border-ink-900/10 group-hover:border-[#FDFBF7]/20 transition-colors duration-500 pointer-events-none" />
                
                {/* Silhouette Placeholder */}
                <div className={`w-32 h-32 rounded-full border border-ink-900/10 ${author.imageBg} flex items-center justify-center mb-6 group-hover:bg-[#FDFBF7]/10 group-hover:border-[#FDFBF7]/30 transition-colors duration-500`}>
                  <Feather className="w-8 h-8 text-ink-900/40 group-hover:text-[#FDFBF7]/60" strokeWidth={0.5} />
                </div>
                
                <h3 className="text-2xl font-serif font-bold text-ink-900 group-hover:text-[#FDFBF7] transition-colors mb-2">{author.name}</h3>
                <p className="text-xs font-sans uppercase tracking-widest text-ink-500 group-hover:text-[#FDFBF7]/70 transition-colors">{author.role}</p>

                {/* Subdued View Profile Action */}
                <div className="absolute bottom-10 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-gold flex items-center text-xs font-sans uppercase tracking-[0.2em]">
                  View Profile <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>
            ))}
          </div>

          {/* Submissions Prompt within Directory */}
          <div className="mt-24 text-center pb-24 border-b border-ink-900/10">
            <h3 className="text-3xl font-serif font-bold text-ink-900 mb-6">Will your name be next?</h3>
            <p className="text-ink-600 font-sans font-light mb-8 max-w-lg mx-auto">
              We are actively looking to expand our roster. If you have a completed manuscript or a brilliant anthology piece, our editorial team wants to read it.
            </p>
            <Link to="/learning/15-day-guide">
              <Button className="bg-ink-900 text-[#FDFBF7] rounded-none px-12 py-6 text-sm font-sans uppercase tracking-[0.2em] hover:bg-ink-800 transition-all">
                Read Submission Guidelines
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FDFBF7] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
             <div className="flex items-center justify-center mb-6">
              <div className="w-24 h-24 bg-white rounded-full border border-ink-900/10 flex items-center justify-center overflow-hidden shadow-sm">
                <img src="/images/inkfetish_logo.png" alt="Inkfetish Publication" className="w-[85%] h-[85%] object-contain" />
              </div>
            </div>
            <p className="text-xs font-sans text-ink-500">© {new Date().getFullYear()} Inkfetish Publication.</p>
        </div>
      </footer>
    </div>
  );
};

export default AuthorsDirectory;
