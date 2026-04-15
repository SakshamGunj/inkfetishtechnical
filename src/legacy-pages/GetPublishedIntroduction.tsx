import React from 'react';
import {
    Clock,
    ArrowRight,
    XCircle,
    CheckCircle2,
    Book,
    Smartphone,
    Instagram,
    Star,
    Zap
} from 'lucide-react';
import { Card } from "@/components/ui/card";

export const IntroductionContent = () => {
    return (
        <div className="space-y-16">

            {/* 1. Stop Waiting. Start Publishing. */}
            <section className="text-center space-y-8">
                <h3 className="text-3xl md:text-5xl font-serif text-gold mb-6">Stop Waiting. Start Publishing.</h3>

                <div className="bg-ink-900/50 border border-gold/20 p-8 rounded-2xl max-w-4xl mx-auto backdrop-blur-sm">
                    <p className="text-parchment/80 text-lg md:text-xl font-serif leading-relaxed mb-8">
                        What if I told you that in just <strong className="text-gold">15 days</strong>, you could stop calling yourself an "aspiring writer" and start introducing yourself as a <strong className="text-gold">"published author"</strong>?
                    </p>

                    {/* Transformation Visual */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
                        <div className="bg-white/5 px-6 py-4 rounded-lg border border-white/5 text-parchment/50 line-through">
                            Aspiring Writer
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-gold text-xs uppercase tracking-widest font-bold mb-1">15 Days</span>
                            <ArrowRight className="w-6 h-6 text-gold animate-pulse" />
                        </div>
                        <div className="bg-gold/10 px-8 py-5 rounded-lg border border-gold/50 text-gold font-bold shadow-[0_0_15px_rgba(255,215,0,0.1)]">
                            Published Author
                        </div>
                    </div>
                </div>

                <p className="text-parchment/60 italic">Not someday. Not when you're "good enough." In 15 days.</p>
            </section>

            {/* 2. Myth vs Truth */}
            <section className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                    <h4 className="text-2xl font-serif text-parchment">I know what you're thinking.</h4>
                    <p className="text-parchment/70 font-serif leading-relaxed">
                        Published author? That takes years. You need an agent. You need connections. You need to be "discovered." You need luck.
                    </p>
                    <div className="bg-red-950/20 border-l-4 border-red-500/50 p-4 rounded-r-lg space-y-2">
                        <div className="flex items-center gap-2 text-red-400/80 text-sm line-through"><XCircle className="w-4 h-4" /> You need an agent</div>
                        <div className="flex items-center gap-2 text-red-400/80 text-sm line-through"><XCircle className="w-4 h-4" /> You need connections</div>
                        <div className="flex items-center gap-2 text-red-400/80 text-sm line-through"><XCircle className="w-4 h-4" /> You need luck</div>
                    </div>
                </div>

                <div className="bg-ink-900/40 p-8 rounded-xl border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl" />
                    <h4 className="text-2xl font-serif text-gold mb-4 relative z-10">Here's the truth:</h4>
                    <p className="text-parchment/90 text-lg relative z-10 font-bold">
                        You need none of those things.
                    </p>
                    <div className="bg-green-950/20 border-l-4 border-green-500/50 p-4 rounded-r-lg mt-6 relative z-10">
                        <div className="flex items-center gap-3 text-green-400 font-bold">
                            <CheckCircle2 className="w-5 h-5" />
                            You just need the right strategy.
                        </div>
                    </div>
                    <p className="text-parchment/60 text-sm mt-4 relative z-10 underline decoration-gold/30 underline-offset-4">
                        That's exactly what this guide gives you.
                    </p>
                </div>
            </section>

            {/* 3. Who This Book Is For */}
            <section className="bg-white/5 rounded-2xl p-8 md:p-12 border border-white/10">
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <h3 className="text-3xl font-serif text-parchment mb-4">Who This Book Is For</h3>
                    <p className="text-parchment/70">
                        It's for you if you're tired of the phrase "aspiring writer" and ready to claim your identity.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <PersonaCard icon={<Book className="w-6 h-6" />} title="The Notebook Writer" desc="Writing in notebooks, wondering when your 'real' career will begin." />
                    <PersonaCard icon={<Instagram className="w-6 h-6" />} title="The Instagram Poet" desc="Posting online but ready for official publication status." />
                    <PersonaCard icon={<Smartphone className="w-6 h-6" />} title="The Notes App Writer" desc="Keeping poems hidden in your phone, waiting for the right moment." />
                </div>
            </section>

            {/* 4. Final Call */}
            <section className="text-center py-8">
                <div className="inline-block bg-gradient-to-r from-ink-900 via-ink-800 to-ink-900 border border-gold/30 px-8 py-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-center gap-2 mb-4 text-parchment/50 text-sm">
                        <span className="line-through">Perfect</span>
                        <span className="w-1 h-1 bg-parchment/30 rounded-full" />
                        <span className="line-through">Written for years</span>
                        <span className="w-1 h-1 bg-parchment/30 rounded-full" />
                        <span className="line-through">Feel ready</span>
                    </div>
                    <h3 className="text-2xl font-serif text-gold font-bold flex items-center gap-3">
                        <Zap className="w-6 h-6 fill-gold" />
                        Willing to take action.
                    </h3>
                </div>
            </section>

        </div>
    );
};

const PersonaCard = ({ icon, title, desc }: any) => (
    <div className="bg-ink-950/50 p-6 rounded-xl border border-white/5 hover:border-gold/20 transition-all text-center group">
        <div className="bg-white/5 w-12 h-12 rounded-full flex items-center justify-center text-parchment mx-auto mb-4 group-hover:text-gold group-hover:bg-gold/10 transition-colors">
            {icon}
        </div>
        <h4 className="font-bold text-parchment mb-2">{title}</h4>
        <p className="text-sm text-parchment/60 leading-relaxed">{desc}</p>
    </div>
);
