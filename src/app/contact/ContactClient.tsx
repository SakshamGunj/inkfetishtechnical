'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Feather, MoveRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';

const ContactClient = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-ink-900 font-serif selection:bg-ink-900 selection:text-[#FDFBF7]">
      <Navbar />

      <section className="pt-40 pb-20 relative border-b border-ink-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-[10px] font-sans uppercase tracking-[0.3em] text-ink-500 mb-6 font-black flex items-center gap-2">
                <span className="w-8 h-px bg-ink-900/20" /> CONTACT US
              </h2>
              <h1 className="text-5xl md:text-8xl font-black font-serif text-ink-900 leading-[0.9] tracking-tighter uppercase italic">
                Get In <br/><span className="italic font-light not-italic">Touch.</span>
              </h1>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-ink-600 font-sans font-light max-w-sm border-l-4 border-ink-900 pl-6 py-2"
            >
              We read every message we get. If you have questions about writing or publishing, we're here to help you.
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-16">
              <div className="space-y-12">
                {[
                  { icon: <Mail className="w-6 h-6" strokeWidth={1} />, label: "Editorial & Submissions", value: "inkfetishh@gmail.com", sub: "Response time: < 24 Hours" },
                  { icon: <Phone className="w-6 h-6" strokeWidth={1} />, label: "Direct Inquiries", value: "+91 92166 81908", sub: "Mon-Fri: 10AM - 6PM IST" },
                  { icon: <MapPin className="w-6 h-6" strokeWidth={1} />, label: "Headquarters", value: "New Delhi, India", sub: "We work worldwide." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group"
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 border border-ink-900/10 flex items-center justify-center bg-white group-hover:bg-ink-900 group-hover:text-white transition-colors duration-500">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-[10px] font-sans uppercase tracking-[0.2em] text-ink-400 mb-2 font-bold">{item.label}</h3>
                        <p className="text-2xl font-serif font-bold text-ink-900">{item.value}</p>
                        <p className="text-xs font-sans text-ink-500 mt-1">{item.sub}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* FAQ Preview */}
              <div className="pt-16 border-t border-ink-900/10">
                <h3 className="text-[10px] font-sans uppercase tracking-[0.3em] text-ink-900 mb-8 font-black italic">Common Questions</h3>
                <div className="space-y-6">
                  {[
                    "How long does the book review take?",
                    "Do you accept international writers?",
                    "What kind of books do you publish?"
                  ].map((q, i) => (
                    <div key={i} className="group cursor-pointer border-b border-ink-900/5 pb-4 last:border-0 hover:border-ink-900/20 transition-all">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-sans font-bold text-ink-700 group-hover:text-ink-900 transition-colors uppercase italic">{q}</span>
                        <MoveRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-7">
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-ink-900/10 p-8 md:p-16 shadow-[20px_20px_0_0_rgba(0,0,0,0.02)] relative overflow-hidden"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] pointer-events-none translate-x-1/2 -translate-y-1/2">
                  <Feather className="w-full h-full text-ink-900" strokeWidth={1} />
                </div>

                <h2 className="text-3xl font-serif font-bold text-ink-900 mb-12">Send Us a <span className="italic font-light">Message.</span></h2>
                
                <form className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="relative">
                      <input type="text" className="w-full bg-transparent border-b border-ink-900/20 py-4 font-sans font-light focus:outline-none focus:border-ink-900 transition-colors peer" placeholder=" " />
                      <label className="absolute left-0 top-4 text-xs uppercase tracking-widest text-ink-400 font-bold transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-ink-900 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]">Your Name</label>
                    </div>
                    <div className="relative">
                      <input type="email" className="w-full bg-transparent border-b border-ink-900/20 py-4 font-sans font-light focus:outline-none focus:border-ink-900 transition-colors peer" placeholder=" " />
                      <label className="absolute left-0 top-4 text-xs uppercase tracking-widest text-ink-400 font-bold transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-ink-900 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]">Your Email</label>
                    </div>
                  </div>

                  <div className="relative">
                    <select className="w-full bg-transparent border-b border-ink-900/20 py-4 font-sans font-light focus:outline-none focus:border-ink-900 transition-colors appearance-none cursor-pointer text-sm font-bold uppercase tracking-widest">
                      <option>Ask about my book</option>
                      <option>Publishing Service question</option>
                      <option>Press / Media Connection</option>
                      <option>Technical Issue Report</option>
                    </select>
                    <label className="absolute left-0 -top-4 text-[10px] uppercase tracking-widest text-ink-900 font-black">What is this about?</label>
                  </div>

                  <div className="relative">
                    <textarea rows={4} className="w-full bg-transparent border-b border-ink-900/20 py-4 font-sans font-light focus:outline-none focus:border-ink-900 transition-colors peer resize-none" placeholder=" " />
                    <label className="absolute left-0 top-4 text-xs uppercase tracking-widest text-ink-400 font-bold transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-ink-900 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]">Your Message</label>
                  </div>

                  <Button className="w-full bg-ink-900 text-[#FDFBF7] hover:bg-gold hover:text-ink-900 rounded-none py-8 text-sm font-sans uppercase tracking-[0.2em] transition-all font-black group shadow-none border-2 border-transparent border-ink-900">
                    Send Message
                    <MoveRight className="w-4 h-4 ml-3 opacity-70 group-hover:translate-x-2 group-hover:opacity-100 transition-all" strokeWidth={1.5} />
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactClient;
