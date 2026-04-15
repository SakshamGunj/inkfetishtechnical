
import React from 'react';
import { ArrowLeft, ArrowRight, ArrowRightLeft, ArrowDown, Mic, Play, Pause, Music, Film, Type, AlignLeft } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { useState } from 'react';
import { motion } from 'framer-motion';

export const Technique1Switcharoo = () => {
    return (
        <div className="my-16 grid md:grid-cols-2 gap-8 items-center bg-ink-900/20 p-8 rounded-xl border border-white/5">
            <div>
                <h4 className="text-gold font-bold mb-4 flex items-center gap-2"><ArrowRightLeft className="w-4 h-4" /> The Switcharoo Strategy</h4>
                <div className="space-y-4 text-parchment/80">
                    <p className="bg-ink-black/50 p-4 rounded-lg border-l-2 border-green-500/50">
                        <span className="block text-xs uppercase tracking-widest text-green-500 mb-2">Line 1: Normalcy (English)</span>
                        "Everything's fine," I text back
                    </p>
                    <div className="flex justify-center">
                        <ArrowDown className="w-4 h-4 text-white/20" />
                    </div>
                    <p className="bg-ink-black/50 p-4 rounded-lg border-l-2 border-red-500/50">
                        <span className="block text-xs uppercase tracking-widest text-red-500 mb-2">Line 2: The Lie Revealed (Hindi)</span>
                        <span className="text-gold">Sab theek hai</span>, I lie in the same breath.
                    </p>
                </div>
            </div>
            <div className="bg-white/5 p-6 rounded-lg text-sm italic text-parchment/60 leading-relaxed font-serif">
                "Kyunki truth is a luxury<br />
                I can't afford in this conversation.<br />
                Your 'how are you?' doesn't want the real answer:<br />
                <span className="text-gold">Toot raha hoon main</span>,<br />
                Breaking in a language you've stopped trying to understand."
            </div>
        </div>
    );
};

export const Technique2Untranslatable = () => {
    const words = [
        { word: "Viraha", script: "विरह", meaning: "Separation grief; physical pain of missing." },
        { word: "Intezaar", script: "इंतज़ार", meaning: "Waiting with slowly dying hope." },
        { word: "Judaai", script: "जुदाई", meaning: "Existential separation state." },
        { word: "Khamoshi", script: "ख़ामोशी", meaning: "Silence that carries weight." },
        { word: "Bebasi", script: "बेबसी", meaning: "Helplessness with emotional density." },
        { word: "Dooriyan", script: "दूरियाँ", meaning: "Multiple emotional distances." },
    ];

    return (
        <div className="my-16">
            <h4 className="text-center font-bold text-gold mb-8">The Untranslatable Vocabulary</h4>
            <div className="relative aspect-video rounded-xl overflow-hidden mb-8 group border border-white/10">
                <img src="/images/untranslatable_constellation.png" alt="Constellation of Emotions" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-center">
                    <p className="text-sm text-parchment/60 italic">"English names the fact. Hindi names the feeling."</p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {words.map((w, i) => (
                    <Card key={i} className="bg-ink-900/40 border-white/5 p-4 hover:border-gold/30 hover:bg-white/5 transition-all group cursor-pointer text-center">
                        <h5 className="text-gold font-bold text-lg">{w.word}</h5>
                        <p className="text-2xl font-serif text-white/10 group-hover:text-white/30 my-2">{w.script}</p>
                        <p className="text-xs text-parchment/60">{w.meaning}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export const Technique4Cinematic = () => (
    <div className="my-16 relative rounded-xl overflow-hidden border border-white/10">
        <div className="grid md:grid-cols-2">
            <div className="h-64 md:h-auto relative">
                <img src="/images/cinematic_cafe.png" alt="Cinematic Freeze" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-ink-black/20" />
            </div>
            <div className="p-8 bg-ink-900/60 backdrop-blur-md flex flex-col justify-center">
                <div className="font-mono text-xs text-gold uppercase tracking-widest mb-4">Scene 4: The Breakup</div>
                <div className="space-y-6 font-serif">
                    <p className="text-parchment/70 italic leading-relaxed">
                        "She asked me if I still loved her. Three months after we agreed to stay friends..."
                    </p>
                    <div className="pl-4 border-l-2 border-gold/30">
                        <p className="text-xs text-white/30 uppercase mb-1">Me (Internal)</p>
                        <p className="text-white">I could have said yes.</p>
                    </div>
                    <div className="pl-4 border-l-2 border-gold">
                        <p className="text-xs text-gold/50 uppercase mb-1">Me (Aloud)</p>
                        <p className="text-xl text-gold">"Farak nahi padta ab."</p>
                        <p className="text-xs text-white/30 mt-1">(It doesn't matter anymore)</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export const Technique5Translation = () => (
    <div className="my-16 flex flex-col items-center">
        <div className="relative max-w-2xl w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden mb-8 border border-white/10">
            <img src="/images/translation_masks.png" alt="Translation Masks" className="absolute inset-0 w-full h-full object-cover opacity-90" />
            <div className="absolute inset-0 flex items-center justify-center p-8 bg-black/50 hover:bg-transparent transition-colors duration-500 group">
                <div className="text-center transition-transform duration-500 group-hover:scale-110">
                    <h3 className="text-3xl font-serif text-white mb-2">'Main theek hoon'</h3>
                    <div className="h-px w-20 bg-gold mx-auto my-4" />
                    <p className="text-white/60">Does not equal "I'm fine"</p>
                </div>
            </div>
        </div>
    </div>
);

export const Technique3Refrain = () => (
    <div className="my-16 p-8 bg-ink-900/30 border-y border-white/5 space-y-6 text-center">
        <h4 className="text-gold font-bold mb-4 uppercase tracking-widest text-xs">The Anchor</h4>

        <p className="text-lg text-parchment/60 font-serif italic">
            I keep checking my phone<br />
            For a text I know won't come.<br />
            You're done. I know you're done.<br />
            <strong className="text-gold text-xl block mt-2 not-italic">But kyun karte hain hum yeh?</strong>
        </p>

        <div className="w-1 h-8 bg-gradient-to-b from-white/10 to-transparent mx-auto" />

        <p className="text-lg text-parchment/60 font-serif italic">
            You said you needed space<br />
            That clean English word for distance...<br />
            <strong className="text-gold text-xl block mt-2 not-italic">Kyun karte hain hum yeh?</strong>
        </p>
    </div>
);

export const Technique6Cultural = () => (
    <div className="my-16 bg-gradient-to-r from-ink-900 to-black p-6 rounded-xl border border-white/10 flex items-center gap-6 overflow-hidden relative group hover:border-gold/20 transition-all">
        <div className="absolute top-0 right-0 p-32 bg-gold/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-gold/10 transition-colors" />
        <div className="relative z-10 p-4 bg-white/5 rounded-full border border-white/10 group-hover:scale-110 transition-transform">
            <Film className="w-8 h-8 text-gold/80" />
        </div>
        <div className="relative z-10">
            <h4 className="text-lg font-bold text-parchment mb-1">The 'Intermission' Effect</h4>
            <p className="text-sm text-parchment/60 italic">
                "You left like a Bollywood interval... but there was no 'Tum Hi Ho' playing."
            </p>
        </div>
    </div>
);

export const Technique7Enjambment = () => (
    <div className="my-16 p-8 relative">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10" />
        <div className="pl-8 space-y-4 font-serif text-lg">
            <p className="text-parchment/50">I loved you in every language I knew...</p>
            <p className="text-parchment">But you left in silence.</p>
            <div className="relative">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute -inset-1 bg-gold/10 -z-10 rounded-r-lg"
                />
                <p className="text-gold">Khamoshi mein chale gaye,</p>
            </div>
            <p className="text-parchment">Without even the courtesy</p>
            <p className="text-parchment/50">Of a goodbye in any language.</p>
        </div>
    </div>
);
