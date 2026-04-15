import React, { useState } from 'react';
import { Sun, Moon, Zap, Clock, Battery, BatteryCharging, BatteryWarning, Calendar, CheckSquare, Edit3, Coffee, Briefcase, GraduationCap } from 'lucide-react';

export const Chapter3Content = () => {
    return (
        <div className="space-y-16">

            {/* --- HERO --- */}
            <section className="space-y-6">
                <h3 className="text-3xl font-serif text-parchment leading-tight">
                    CHAPTER 3: <br />
                    <span className="text-gold">Design Your Perfect Writing Day</span>
                </h3>
                <div className="bg-ink-900/50 p-6 rounded-xl border border-white/5 space-y-4">
                    <p className="text-parchment/80 font-serif leading-relaxed">
                        Your perfect writing routine looks nothing like mine. Instagram shows 4 AM meditators. That's fine for them. The secret isn't copying—it's designing a routine that fits <span className="text-gold italic">your</span> actual energy.
                    </p>
                </div>
            </section>

            {/* --- THE 4 CHRONOTYPES (VISUAL) --- */}
            <section className="space-y-8">
                <div className="relative rounded-xl overflow-hidden border border-gold/20 group">
                    <img
                        src="/images/habit_bible_chronotype_clock.png"
                        alt="The 4 Writing Chronotypes"
                        className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-6 left-6 right-6">
                        <h4 className="text-white font-serif text-2xl mb-2 flex items-center gap-3">
                            <Clock className="w-6 h-6 text-gold" />
                            The 4 Writer Chronotypes
                        </h4>
                        <p className="text-white/70 text-sm">Find your energy peak. Stop fighting your biology.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <ChronotypeCard
                        icon={<Sun className="w-6 h-6" />}
                        title="Morning Lark"
                        peak="6 AM - 10 AM"
                        desc="Mornings are crisp. Evenings are brain-dead. Protected time before the world (and family) wakes up."
                        example="Haruki Murakami (4 AM wake up)"
                    />
                    <ChronotypeCard
                        icon={<Moon className="w-6 h-6" />}
                        title="Night Owl"
                        peak="10 PM - 2 AM"
                        desc="Mornings are foggy. You come alive when the house is quiet. Write after dinner when nobody needs you."
                        example="F. Scott Fitzgerald"
                    />
                    <ChronotypeCard
                        icon={<Zap className="w-6 h-6" />}
                        title="Snack Writer"
                        peak="Multiple 30-min bursts"
                        desc="High energy in waves. Perfect for busy schedules: commute, lunch break, pre-dinner. Micro-sessions are your superpower."
                        example="Busy professionals / Parents"
                    />
                    <ChronotypeCard
                        icon={<BatteryCharging className="w-6 h-6" />}
                        title="Binge Writer"
                        peak="3-4 Hour Blocks"
                        desc="Needs deep immersion. Can't do small chunks. Protect weekends for marathons. Use weekdays for planning only."
                        example="Novelists with day jobs"
                    />
                </div>

                <div className="bg-gold/10 p-4 rounded-lg border border-gold/20 flex gap-3 items-start">
                    <Zap className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                        <h5 className="font-bold text-gold text-sm mb-1">Quick Win: Discovery</h5>
                        <p className="text-parchment/70 text-sm">Not sure? Track this week: When did writing feel effortless? That's your peak. Schedule there.</p>
                    </div>
                </div>
            </section>

            {/* --- ENERGY MANAGEMENT --- */}
            <section className="bg-ink-950 p-8 rounded-2xl border border-white/5 space-y-6">
                <h3 className="text-2xl font-serif text-parchment text-center">Energy Over Time</h3>
                <p className="text-center text-parchment/60 max-w-2xl mx-auto mb-6">
                    Stop saying "I don't have time." You have time. The question is: Do you have energy?
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                    <EnergyLevel level="High" color="text-green-400" border="border-green-500/30" bg="bg-green-950/20" task="Creative Writing (New Drafts)" />
                    <EnergyLevel level="Medium" color="text-yellow-400" border="border-yellow-500/30" bg="bg-yellow-950/20" task="Editing & Revising" />
                    <EnergyLevel level="Low" color="text-red-400" border="border-red-500/30" bg="bg-red-950/20" task="Research, Outlining, Admin" />
                </div>

                <div className="bg-black/20 p-4 rounded-lg border-l-2 border-gold text-sm text-parchment/70 italic">
                    <strong className="text-parchment not-italic block mb-1">Indian Writer Case Study: Deepak</strong>
                    "Morning: High Energy -&gt; New Writing (6 AM). Afternoon: Medium -&gt; Editing. Evening: Low -&gt; Research. Productivity doubled without working more hours."
                </div>
            </section>

            {/* --- SCHEDULE TEMPLATES --- */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-gold flex items-center gap-3">
                    <Calendar className="w-6 h-6" /> Realistic Schedule Templates
                </h3>
                <div className="grid lg:grid-cols-3 gap-6">
                    <ScheduleTemplate
                        icon={<Briefcase className="w-5 h-5" />}
                        title="Template A: Full-Job"
                        schedule={[
                            { time: "6:15 AM", task: "Write (15 min)" },
                            { time: "9-6 PM", task: "Work" },
                            { time: "9:15 PM", task: "Edit (20 min)" },
                            { time: "10:00 PM", task: "Power Off Ritual" }
                        ]}
                    />
                    <ScheduleTemplate
                        icon={<GraduationCap className="w-5 h-5" />}
                        title="Template B: Student"
                        schedule={[
                            { time: "Morning", task: "Classes" },
                            { time: "1:00 PM", task: "Sprint (20 min)" },
                            { time: "10:00 PM", task: "Main Session (45 min)" },
                            { time: "Sunday", task: "3-Hour Binge" }
                        ]}
                    />
                    <ScheduleTemplate
                        icon={<Coffee className="w-5 h-5" />}
                        title="Template C: Freelance"
                        schedule={[
                            { time: "Start", task: "Writing First (30 min)" },
                            { time: "Mid-Day", task: "Sprint (20 min)" },
                            { time: "Evening", task: "Flexible Session" },
                            { time: "Weekly", task: "Deep Work Block" }
                        ]}
                    />
                </div>
            </section>

            {/* --- ACTION STEP --- */}
            <section className="bg-ink-900 border border-gold/30 p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-transparent" />

                <div className="flex items-center gap-3 mb-6">
                    <Edit3 className="w-6 h-6 text-gold" />
                    <h3 className="text-xl font-bold text-parchment uppercase tracking-widest">Action Step: Design Your Routine</h3>
                </div>

                <div className="bg-black/40 p-6 rounded-xl space-y-4 font-mono text-sm text-parchment/80 border border-white/5">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 space-y-1">
                            <label className="text-xs opacity-50 uppercase">My Chronotype</label>
                            <input type="text" placeholder="e.g. Night Owl" className="w-full bg-transparent border-b border-white/20 focus:border-gold outline-none py-1 transition-colors" />
                        </div>
                        <div className="flex-1 space-y-1">
                            <label className="text-xs opacity-50 uppercase">Peak Energy Time</label>
                            <input type="text" placeholder="e.g. 10 PM - 12 AM" className="w-full bg-transparent border-b border-white/20 focus:border-gold outline-none py-1 transition-colors" />
                        </div>
                    </div>

                    <div className="space-y-1 pt-2">
                        <label className="text-xs opacity-50 uppercase">My Realistic Daily Window</label>
                        <div className="flex items-center gap-2">
                            <input type="text" placeholder="Start" className="w-24 bg-transparent border-b border-white/20 focus:border-gold outline-none py-1 text-center" />
                            <span>to</span>
                            <input type="text" placeholder="End" className="w-24 bg-transparent border-b border-white/20 focus:border-gold outline-none py-1 text-center" />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                        <p className="text-gold italic mb-2">My 30-Day Commitment:</p>
                        <p>I will write at <span className="inline-block w-24 border-b border-white/20"></span> every <span className="inline-block w-24 border-b border-white/20"></span>.</p>
                    </div>
                </div>

                <p className="text-center text-xs text-parchment/40 mt-6 uppercase tracking-widest">
                    Treat it like a doctor's appointment—non-negotiable.
                </p>
            </section>

        </div>
    );
};

// --- SUB-COMPONENTS ---

const ChronotypeCard = ({ icon, title, peak, desc, example }: any) => (
    <div className="bg-white/5 p-5 rounded-xl border border-white/5 hover:border-gold/30 transition-all hover:bg-white/10 group">
        <div className="flex justify-between items-start mb-3">
            <div className="text-gold group-hover:scale-110 transition-transform">{icon}</div>
            <div className="bg-black/30 px-2 py-1 rounded text-[10px] text-gold/80 font-mono border border-gold/10">{peak}</div>
        </div>
        <h4 className="font-bold text-parchment mb-2">{title}</h4>
        <p className="text-xs text-parchment/60 leading-relaxed mb-3 h-16">{desc}</p>
        <div className="text-[10px] text-parchment/40 border-t border-white/5 pt-2 italic">Ex: {example}</div>
    </div>
);

const EnergyLevel = ({ level, color, border, bg, task }: any) => (
    <div className={`${bg} ${border} border p-4 rounded-lg text-center`}>
        <div className={`${color} font-bold text-lg mb-1`}>{level} Energy</div>
        <div className="text-xs text-parchment/60 uppercase tracking-widest">Best For</div>
        <div className="text-parchment/90 font-serif mt-2">{task}</div>
    </div>
);

const ScheduleTemplate = ({ icon, title, schedule }: any) => (
    <div className="bg-ink-950 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
            <div className="text-parchment/60">{icon}</div>
            <h4 className="font-bold text-parchment text-sm">{title}</h4>
        </div>
        <div className="space-y-3">
            {schedule.map((item: any, i: number) => (
                <div key={i} className="flex justify-between text-xs">
                    <span className="text-gold/70 font-mono">{item.time}</span>
                    <span className="text-parchment/70">{item.task}</span>
                </div>
            ))}
        </div>
    </div>
);
