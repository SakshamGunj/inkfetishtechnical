'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export function EmotionalNarrative() {
  return (
    <section className="py-20 md:py-32 bg-ink-900 relative overflow-hidden">
      {/* Decorative vertical lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-1/4 w-px h-full bg-white"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-white"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1.5 }}
        >
          <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-16">
            <Quote className="text-white/20 w-5 h-5" />
          </div>

          <h4 className="text-3xl md:text-5xl lg:text-7xl font-serif font-black text-white leading-none tracking-tighter uppercase mb-20 italic">
            "Because you've been <br/>
            writing in silence <br/>
            <span className="text-gold not-italic">long enough.</span>"
          </h4>

          <div className="space-y-8 text-base md:text-xl text-white/70 font-sans font-light leading-relaxed text-left max-w-2xl mx-auto">
            <p>
              You started writing because you felt something. Something you couldn't say out loud. Something too big for a conversation. 
              Something that needed words — the right words, in the right order — to finally make sense.
            </p>
            
            <p className="border-l-2 border-gold/40 pl-8 italic">
              "So you wrote. In your notes app. In old diaries. In Google Docs that only you can see."
            </p>

            <p>
              And maybe someone close to you said, <span className="text-white font-medium italic">"You should do something with this."</span> 
              And maybe a part of you agreed. But another part — the scared part — kept asking the same old questions:
            </p>

            <p className="text-white font-medium uppercase tracking-tight">
              "Is my writing good enough?" <br/>
              "Will people even care?" <br/>
              "What if I put myself out there and nothing happens?"
            </p>

            <p>
              We know that voice. Every writer knows that voice. But here's what that voice will never tell you: 
              <span className="text-gold font-bold">The world has always needed stories. It needs yours too.</span>
            </p>

            <p>
              Not the "perfect" version you've been waiting to write someday. This version. The raw, real, imperfect version that only you can write. 
              Inkfetish anthologies exist for one reason: to give that version of you a stage.
            </p>

            <p className="text-xl md:text-3xl font-serif font-black text-white italic text-center pt-12">
              "Not someday. Today."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
