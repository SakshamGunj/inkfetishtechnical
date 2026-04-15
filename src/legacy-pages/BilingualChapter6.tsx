
import React, { useState } from 'react';
import { RefreshCw, Scissors, Sparkles, AlertTriangle, CheckCircle2, ChevronRight, Maximize2, Minimize2, ArrowRight, BookOpen, MessageSquare, Heart, Eye } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PoemProps {
    title: string;
    publishedIn: string;
    poemContent: React.ReactNode;
    analysis: {
        reason: string;
        technique: string;
        feedback?: string;
    };
    image?: string;
}

const PoemBreakdown = ({ title, publishedIn, poemContent, analysis, image }: PoemProps) => {
    const [showAnalysis, setShowAnalysis] = useState(false);

    return (
        <Card className="my-12 overflow-hidden bg-ink-900/30 border-white/5 group">
            <div className="grid md:grid-cols-2">
                <div className="p-8 relative">
                    <div className="mb-6">
                        <h4 className="text-2xl font-serif text-gold mb-1">{title}</h4>
                        <p className="text-xs text-parchment/60 uppercase tracking-widest flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-green-500" /> Accepted to: {publishedIn}
                        </p>
                    </div>

                    <div className="font-serif text-parchment/90 leading-relaxed whitespace-pre-line relative z-10">
                        {poemContent}
                    </div>

                    {/* Decorative quote mark */}
                    <div className="absolute top-4 right-4 text-8xl font-serif text-white/5 leading-none select-none">"</div>
                </div>

                <div className="bg-black/20 border-l border-white/5 p-8 flex flex-col">
                    <div className="flex-1 space-y-6">
                        <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 mb-6">
                            {image && <img src={image} alt={`Visual aspect of ${title}`} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" />}
                            <div className="absolute inset-0 bg-gradient-to-t from-ink-900 to-transparent" />
                            <div className="absolute bottom-3 left-3 text-xs font-bold text-white uppercase tracking-widest">Visual Concept</div>
                        </div>

                        <div>
                            <h5 className="font-bold text-gold mb-2 text-sm uppercase tracking-widest">Why It Got Accepted</h5>
                            <p className="text-sm text-parchment/70 leading-relaxed">{analysis.reason}</p>
                        </div>

                        <div>
                            <h5 className="font-bold text-blue-400 mb-2 text-sm uppercase tracking-widest">Technique Used</h5>
                            <p className="text-sm text-parchment/70">{analysis.technique}</p>
                        </div>

                        {analysis.feedback && (
                            <div className="p-3 bg-white/5 rounded border-l-2 border-gold/50 italic text-xs text-parchment/60">
                                "<strong>Editor:</strong> {analysis.feedback}"
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export const CaseStudies = () => {
    return (
        <div className="space-y-4">
            {/* POEM 1 */}
            <PoemBreakdown
                title="MINUS ONE"
                publishedIn="Love at Minus One Anthology"
                image="/images/minus_one_concept.png"
                poemContent={
                    <>
                        We were never a couple.<br />
                        Just almosts and maybes stitched together<br />
                        With late-night texts and maybe-next-time plans.<br /><br />

                        You'd say 'good night' and I'd hear 'not yet'<br />
                        <span className="text-gold">Ek aur ghanta</span>, just one more hour<br />
                        Of pretending this was going somewhere.<br /><br />

                        They ask me if we're together.<br />
                        <span className="text-gold">Main kya kahoon?</span><br />
                        How do I explain we're at minus one<br />
                        One degree below love,<br />
                        Where everything freezes before it gets the chance to burn?<br /><br />

                        You're scared of commitment.<br />
                        <span className="text-gold">Main dar gayi hoon waiting mein.</span><br />
                        So we stay here, in this <span className="text-gold">khamoshi</span><br />
                        Between 'I love you' and 'we should stop.'<br /><br />

                        Minus one. The coldest place<br />
                        To call home.
                    </>
                }
                analysis={{
                    reason: "Perfect theme alignment. The Hinglish captures the internal conflict-English for the public status, Hindi for the private desperation.",
                    technique: "Opening Hook Switcharoo + Untranslatable Word",
                    feedback: "This poem perfectly captures what we mean by 'love at minus one'-relationships that freeze before they start."
                }}
            />

            {/* POEM 2 */}
            <PoemBreakdown
                title="DOORIYAN"
                publishedIn="The Chakkar Magazine"
                poemContent={
                    <>
                        Distance, you said. You need distance.<br />
                        I heard: <span className="text-gold">dooriyan</span>.<br />
                        Not miles. Not geography.<br />
                        The spaces between your words.<br />
                        The pauses that grew longer.<br /><br />

                        You're in the next room<br />
                        But you've already left,<br />
                        Physically present,<br />
                        Emotionally <span className="text-gold">kahin aur</span>.<br /><br />

                        I ask, '<span className="text-gold">Kya hua?</span>'<br />
                        You say, 'Nothing.'<br />
                        And that nothing swallows everything.
                    </>
                }
                analysis={{
                    reason: "Pivots on a single linguistic difference: 'Distance' (singular, flat) vs 'Dooriyan' (plural, accumulating).",
                    technique: "Untranslatable Word + Cinematic Code-Switch"
                }}
            />

            {/* POEM 3 */}
            <PoemBreakdown
                title="THE LAST TEXT"
                publishedIn="Viral Instagram (9,000+ Saves)"
                image="/images/poem_anatomy.png"
                poemContent={
                    <>
                        I type 'I miss you' for the fifteenth time this week<br />
                        And delete it for the fifteenth time.<br />
                        <span className="text-gold">Kyunki</span> what's the point?<br />
                        You made it clear: you need space.<br />
                        That clean English word for<br />
                        'I'm leaving but don't want to say goodbye.'<br /><br />

                        Space. <span className="text-gold">Jagah</span>. Distance. <span className="text-gold">Doori</span>.<br />
                        Same meaning, different weight.<br />
                        In English, space sounds clinical,<br />
                        Like something a therapist recommends.<br />
                        In Hindi, <span className="text-gold">doori</span> feels like exile.<br /><br />

                        So I type nothing.<br />
                        I give you the <span className="text-gold">khamoshi</span> you wanted<br />
                        And hope you choke on the silence.
                    </>
                }
                analysis={{
                    reason: "Universally relatable hook (deleting text). Teaches the reader about linguistic weight ('Space' vs 'Doori'). High visual shareability.",
                    technique: "Translation Betrayal + Refrain-like repetition"
                }}
            />
        </div>
    );
};
