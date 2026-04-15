import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Feather, MoveRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-ink-900 font-serif selection:bg-ink-900 selection:text-[#FDFBF7]">
      <Navbar />

      <section className="pt-40 pb-20 relative min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Contact Details */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-col"
            >
              <div className="w-16 h-16 border border-ink-900/20 rounded-full flex items-center justify-center mb-8 bg-white">
                <Feather className="w-6 h-6 text-ink-900" strokeWidth={1} />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold font-serif text-ink-900 mb-8 leading-tight">
                Get in <br/><span className="italic font-light">Touch.</span>
              </h1>
              
              <p className="text-lg text-ink-600 font-sans font-light leading-relaxed mb-12 max-w-md">
                Whether you're looking to publish, collaborate, or simply say hello. Our editorial desk is open.
              </p>

              <div className="space-y-8 border-t border-ink-900/10 pt-8 mt-auto">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-ink-900/50 mt-1 mr-4" strokeWidth={1} />
                  <div>
                    <h3 className="text-xs font-sans uppercase tracking-widest text-ink-500 mb-1">Editorial Desk</h3>
                    <a href="mailto:submissions@inkfetish.com" className="text-xl font-sans font-light text-ink-900 hover:text-ink-600 transition-colors">
                      submissions@inkfetish.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-ink-900/50 mt-1 mr-4" strokeWidth={1} />
                  <div>
                    <h3 className="text-xs font-sans uppercase tracking-widest text-ink-500 mb-1">General Inquiries</h3>
                    <a href="tel:+918000000000" className="text-xl font-sans font-light text-ink-900 hover:text-ink-600 transition-colors">
                      +91 800 000 0000
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-ink-900/50 mt-1 mr-4" strokeWidth={1} />
                  <div>
                    <h3 className="text-xs font-sans uppercase tracking-widest text-ink-500 mb-1">Headquarters</h3>
                    <p className="text-xl font-sans font-light text-ink-900">
                      New Delhi, India<br/>
                      <span className="text-sm text-ink-500">Global Operations</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Minimalist Contact Form */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="bg-white border border-ink-900/10 p-10 sm:p-16 relative shadow-[0_20px_40px_rgba(0,0,0,0.02)]"
            >
              {/* Corner decor */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-ink-900/20" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-ink-900/20" />

              <h2 className="text-2xl font-serif font-bold text-ink-900 mb-10">Send a Dispatch</h2>
              
              <form className="space-y-8">
                <div className="relative group">
                  <input 
                    type="text" 
                    id="name"
                    className="w-full bg-transparent border-b border-ink-900/20 py-3 text-ink-900 font-sans font-light focus:outline-none focus:border-ink-900 transition-colors peer"
                    placeholder=" "
                  />
                  <label htmlFor="name" className="absolute left-0 top-3 text-ink-500 font-sans text-sm tracking-widest uppercase transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-ink-900 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                    Your Name
                  </label>
                </div>

                <div className="relative group">
                  <input 
                    type="email" 
                    id="email"
                    className="w-full bg-transparent border-b border-ink-900/20 py-3 text-ink-900 font-sans font-light focus:outline-none focus:border-ink-900 transition-colors peer"
                    placeholder=" "
                  />
                  <label htmlFor="email" className="absolute left-0 top-3 text-ink-500 font-sans text-sm tracking-widest uppercase transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-ink-900 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                    Email Address
                  </label>
                </div>

                <div className="relative group">
                  <textarea 
                    id="message"
                    rows={4}
                    className="w-full bg-transparent border-b border-ink-900/20 py-3 text-ink-900 font-sans font-light focus:outline-none focus:border-ink-900 transition-colors peer resize-none"
                    placeholder=" "
                  ></textarea>
                  <label htmlFor="message" className="absolute left-0 top-3 text-ink-500 font-sans text-sm tracking-widest uppercase transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-ink-900 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                    The Message
                  </label>
                </div>

                <Button type="button" className="w-full bg-ink-900 text-[#FDFBF7] hover:bg-ink-800 rounded-none py-7 text-sm font-sans uppercase tracking-[0.2em] transition-all group mt-8">
                  Send Message
                  <MoveRight className="w-4 h-4 ml-3 opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all" strokeWidth={1.5} />
                </Button>
              </form>
            </motion.div>

          </div>
        </div>

        {/* Huge abstract logo background */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 opacity-[0.02] pointer-events-none w-[800px] h-[800px] flex items-center justify-center">
            <Feather className="w-full h-full text-ink-900" strokeWidth={0.2} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-16 border-t border-ink-900/10 z-10 relative">
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

export default Contact;
