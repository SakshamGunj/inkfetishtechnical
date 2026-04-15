'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export function ContestsNarrative() {
  return (
    <section className="py-24 md:py-48 bg-[#FDFBF7] relative overflow-hidden border-t border-ink-900/10">
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <div className="flex justify-center mb-12 opacity-10">
            <Quote size={80} className="text-ink-900" />
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-black font-serif text-ink-900 leading-[0.9] tracking-tighter uppercase mb-16">
            &quot;Every Great Writer Was Once <br/>
            <span className="italic font-light text-gold mt-4 block">Someone Who Almost Didn&apos;t Enter&quot;</span>
          </h2>

          <div className="space-y-10 text-lg md:text-2xl text-ink-600 font-sans font-light leading-relaxed mb-16 italic relative">
             <div className="absolute -left-12 top-0 bottom-0 w-px bg-gold/20 hidden lg:block" />
             <p>You&apos;ve been writing for a while now. Maybe months. Maybe years. You&apos;ve got pieces sitting in drafts that you&apos;ve never shared. Poems you wrote at 2 AM that you read back and thought — &quot;this is actually good.&quot;</p>
             <p className="text-ink-900 font-bold not-italic font-serif">Here&apos;s the thing about that voice. It&apos;s not protecting you. It&apos;s limiting you.</p>
             <p>Every writer who has ever competed — every writer who has seen their name on a winner&apos;s list, or held a medal — once felt exactly what you feel right now. The fear of being judged. The fear of not being good enough. The fear that no one will care.</p>
             <p className="text-ink-900 font-black uppercase tracking-tighter not-italic">But they entered anyway. And something happened.</p>
             <p>Not always a first-place finish. But always — always — a shift from &quot;I write&quot; to &quot;I compete.&quot; From &quot;I have a voice&quot; to &quot;my voice has been heard.&quot; From invisible to undeniable.</p>
          </div>

          <div className="pt-12 border-t border-ink-900/10">
             <p className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-ink-900">One moment that could change how you see yourself — forever.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
