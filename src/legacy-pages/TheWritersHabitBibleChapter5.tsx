import React from 'react';
import { Home, Coffee, Headphones, Smartphone, VolumeX, Eye, Flame, MapPin, Feather, CheckSquare, Settings } from 'lucide-react';

export const Chapter5Content = () => {
    return (
        <div className="space-y-16">

            {/* --- HERO --- */}
            <section className="space-y-6">
                <h3 className="text-3xl font-serif text-parchment leading-tight">
                    CHAPTER 5: <br />
                    <span className="text-gold">The Environment Advantage</span>
                </h3>
                <div className="bg-ink-900/50 p-6 rounded-xl border border-white/5 space-y-4">
                    <p className="text-parchment/80 font-serif leading-relaxed">
                        Your environment is either working for you or against you. There's no neutral.
                    </p>
                </div>
            </section>

            {/* --- SANCTUARY VISUAL --- */}
            <section className="space-y-8">
                <div className="relative rounded-xl overflow-hidden border border-gold/20 group h-64 md:h-96">
                    <img
                        src="/images/habit_bible_writing_sanctuary.png"
                        alt="Writing Sanctuary in Action"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                        <div className="text-white/90 font-serif max-w-lg">
                            <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                                <Home className="w-5 h-5 text-gold" />
                                Your Writing Sanctuary
                            </h4>
                            <p className="text-sm opacity-80">Even a corner of a shared balcony works. Consistency &gt; Perfection.</p>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-ink-950 p-6 rounded-xl border border-white/5 space-y-4">
                        <h5 className="text-gold font-bold flex items-center gap-2 text-sm uppercase tracking-wide">
                            <MapPin className="w-4 h-4" /> Indian Reality Check
                        </h5>
                        <ul className="space-y-3 text-sm text-parchment/70">
                            <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5" />Shared bedrooms with siblings</li>
                            <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5" />Dining tables becoming desks</li>
                            <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5" />Balconies with plastic chairs</li>
                        </ul>
                        <p className="text-xs text-parchment/40 italic pt-2">
                            The space doesn't have to be perfect. It has to be consistent.
                        </p>
                    </div>

                    <div className="bg-ink-950 p-6 rounded-xl border border-white/5 space-y-4">
                        <h5 className="text-gold font-bold flex items-center gap-2 text-sm uppercase tracking-wide">
                            <Feather className="w-4 h-4" /> Case Studies
                        </h5>
                        <div className="space-y-3">
                            <div className="text-xs">
                                <strong className="text-parchment">Kavita (Mumbai):</strong> Writes on balcony, plastic chair. 6:30 AM. Published 2 novels.
                            </div>
                            <div className="text-xs">
                                <strong className="text-parchment">Arjun (Starbucks):</strong> Same table, Sat/Sun 9-12. Finished manuscript there.
                            </div>
                            <div className="text-xs">
                                <strong className="text-parchment">Neha (Kitchen):</strong> 9-10 PM post-dinner. Family knows: Chair = Writing.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- DISTRACTION CHECKLIST --- */}
            <section className="bg-ink-900 border border-gold/20 p-8 rounded-2xl space-y-6">
                <div className="flex items-center gap-3 mb-2">
                    <Settings className="w-6 h-6 text-gold" />
                    <h3 className="text-xl font-serif text-parchment">Distraction-Proof Checklist</h3>
                </div>
                <p className="text-sm text-parchment/60">Takes 3 minutes. Saves 30 minutes of half-writing.</p>

                <div className="grid md:grid-cols-2 gap-4">
                    <ChecklistItem text="Phone on Airplane Mode / Other Room" icon={<Smartphone className="w-4 h-4" />} />
                    <ChecklistItem text="Close Browser Tabs (Research Only)" icon={<Eye className="w-4 h-4" />} />
                    <ChecklistItem text="Water Bottle Filled" icon={<Coffee className="w-4 h-4" />} />
                    <ChecklistItem text="Headphones + Playlist Ready" icon={<Headphones className="w-4 h-4" />} />
                    <ChecklistItem text="Door Closed / DND Signal" icon={<VolumeX className="w-4 h-4" />} />
                    <ChecklistItem text="Block Next 30 Mins" icon={<CheckSquare className="w-4 h-4" />} />
                </div>
            </section>

            {/* --- SENSORY TRIGGERS --- */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-gold text-center">Sensory Triggers</h3>
                <p className="text-center text-parchment/60 max-w-2xl mx-auto">
                    Your brain responds to sensory cues. Create instant "writing mode."
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <TriggerCard icon={<Flame className="w-5 h-5" />} title="Scent" desc="Jasmine, Sandalwood. Olfactory connects to memory." />
                    <TriggerCard icon={<Headphones className="w-5 h-5" />} title="Sound" desc="Same playlist. Lo-fi or Instrumental. No lyrics." />
                    <TriggerCard icon={<Coffee className="w-5 h-5" />} title="Taste" desc="Ginger Chai, Lemon Water. Taste becomes trigger." />
                    <TriggerCard icon={<Settings className="w-5 h-5" />} title="Touch" desc="Same pen. Same keyboard. Tactile consistency." />
                </div>
            </section>

            {/* --- ACTION STEP --- */}
            <section className="bg-gradient-to-br from-ink-950 to-black border border-white/10 p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -mr-20 -mt-20" />

                <div className="flex items-center gap-3 mb-6 relative z-10">
                    <Home className="w-6 h-6 text-gold" />
                    <h3 className="text-xl font-bold text-parchment uppercase tracking-widest">30-Minute Transformation</h3>
                </div>

                <div className="space-y-4 relative z-10 text-sm font-mono text-parchment/80">
                    <div className="flex gap-4 p-4 bg-white/5 rounded border border-white/5 items-start">
                        <div className="text-gold font-bold shrink-0">00-10m</div>
                        <div>Clear completely. Remove everything unnecessary.</div>
                    </div>
                    <div className="flex gap-4 p-4 bg-white/5 rounded border border-white/5 items-start">
                        <div className="text-gold font-bold shrink-0">11-15m</div>
                        <div>Gather sensory triggers (Beverage, Playlist, Scent).</div>
                    </div>
                    <div className="flex gap-4 p-4 bg-white/5 rounded border border-white/5 items-start">
                        <div className="text-gold font-bold shrink-0">16-20m</div>
                        <div>Set blocks (Phone away, Door sign).</div>
                    </div>
                    <div className="flex gap-4 p-4 bg-white/5 rounded border border-white/5 items-start">
                        <div className="text-gold font-bold shrink-0">21-30m</div>
                        <div>Write 100 words to test the environment.</div>
                    </div>
                </div>

                <button className="w-full mt-8 bg-gold text-black font-bold py-3 rounded uppercase tracking-widest hover:bg-yellow-400 transition-colors">
                    Starting My Transformation Tonight
                </button>
            </section>

        </div>
    );
};

// --- SUB-COMPONENTS ---

const ChecklistItem = ({ text, icon }: any) => (
    <div className="flex items-center gap-3 p-3 bg-black/20 rounded border border-white/5 text-parchment/80 text-sm">
        <div className="text-gold opacity-70">{icon}</div>
        <span>{text}</span>
    </div>
);

const TriggerCard = ({ icon, title, desc }: any) => (
    <div className="bg-ink-950 p-4 rounded-lg border border-white/5 text-center hover:border-gold/30 transition-colors">
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mx-auto text-gold mb-3">
            {icon}
        </div>
        <h5 className="font-bold text-parchment text-sm mb-1">{title}</h5>
        <p className="text-xs text-parchment/60 leading-tight">{desc}</p>
    </div>
);
