'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Package, Users, TrendingUp } from 'lucide-react';

export function TrustBuilder() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden border-y border-ink-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Side: The Story */}
          <div className="lg:col-span-7">
            <h3 className="text-[10px] font-sans uppercase tracking-[0.4em] text-gold font-black mb-6">ABOUT INKFETISH ANTHOLOGIES</h3>
            <h4 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tighter leading-[0.9] mb-12">
              "We Don't Just <br/>
              Publish Books. <br/>
              <span className="italic font-light text-ink-600 lowercase">We Launch Writers."</span>
            </h4>

            <div className="space-y-6 text-base text-ink-600 font-sans font-light leading-relaxed max-w-2xl relative">
              {/* Visual Timeline Vertical Line */}
              <div className="absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/10 to-transparent hidden md:block" />

              <p>There are hundreds of writing platforms in India.</p>
              <p>But most of them do one thing — collect your story, print your name, and move on. <span className="text-ink-900 font-black relative px-1">We&apos;re different.<span className="absolute inset-x-0 bottom-0 h-2 bg-gold/10 -z-10" /></span></p>
              
              <div className="py-8 my-8 border-y border-ink-900/10 italic text-2xl text-ink-900 font-serif font-black tracking-tight relative group">
                "Every writer deserves to be seen. Every story deserves to be felt. Every name deserves to be in print."
                <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-8 h-px bg-gold opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-[10px] font-sans font-black tracking-widest text-gold">
                  <span className="w-8 h-px bg-gold/30" /> 2020 ORIGINS
                </div>
                <p>
                  We started small. We were honest about it. We had zero followers, zero credibility — just a deep love for writing and a promise to writers that we would deliver, no matter what.
                </p>
              </div>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4 text-[10px] font-sans font-black tracking-widest text-gold">
                  <span className="w-8 h-px bg-gold/30" /> 2025 MILESTONE
                </div>
                <p>
                  We started the <span className="text-ink-900 font-bold underline decoration-gold/30 underline-offset-4">Inkfetish page</span> which now has <span className="bg-gold text-ink-900 px-2 font-black inline-block transform -rotate-1">220,000+ followers.</span> 
                  In 2025, we started Inkfetish Publications. In just a few months, we have launched 4 anthologies, and <span className="text-ink-900 font-black border-b-2 border-gold/40 inline-block">390+ writers</span> trust us with their words. 
                </p>
              </div>

              <p className="pt-4 text-sm uppercase tracking-widest font-bold text-ink-900 flex items-center gap-2">
                 <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-2 h-2 rounded-full bg-gold" />
                 We have never — not once — broken that trust.
              </p>
            </div>
          </div>

          {/* Right Side: Trust Pillars */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-8 lg:sticky lg:top-32">
            {[
              {
                icon: Package,
                title: "We Deliver What We Promise",
                description: "From certificates to book kits — every writer who joins gets exactly what they signed up for. No delays. No excuses."
              },
              {
                icon: Users,
                title: "Real Support, Real People",
                description: "We're not a faceless corporation. We're writers helping writers. Have a question? You get a real answer — fast."
              },
              {
                icon: TrendingUp,
                title: "A Growing Platform With Proof",
                description: "4 successful anthologies. 390+ writers. A community that keeps coming back. This isn't just a project — this is a movement."
              }
            ].map((pillar, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 border border-ink-900/10 bg-[#FDFBF7] hover:border-gold transition-all group"
              >
                <pillar.icon className="w-8 h-8 text-gold mb-6 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                <h5 className="text-sm font-sans font-black uppercase tracking-widest text-ink-900 mb-4">{pillar.title}</h5>
                <p className="text-sm text-ink-500 font-sans leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
