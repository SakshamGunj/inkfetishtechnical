import React, { useState } from 'react';
import {
    DollarSign,
    BookOpen,
    Download,
    PenTool,
    Briefcase,
    Video,
    ShoppingBag,
    TrendingUp,
    Shield,
    Gift,
    Target
} from 'lucide-react';

export const Chapter7Content = () => {
    return (
        <div className="space-y-16">

            {/* --- WHEN TO START MONETIZING --- */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-gold flex items-center gap-3">
                    <DollarSign className="w-5 h-5" />
                    Turning Followers Into Income
                </h3>

                <div className="bg-ink-900/50 p-6 rounded-xl border border-white/5 space-y-6">
                    <p className="text-parchment/80 font-serif leading-relaxed text-center">
                        <strong className="text-gold">"How many followers do I need?"</strong>
                        <br />
                        It&apos;s not about a number. It&apos;s about engagement and trust.
                    </p>

                    <div className="grid md:grid-cols-3 gap-4">
                        <MilestoneCard
                            followers="1,000"
                            status="Too Early"
                            advice="Focus purely on growth and trust."
                            color="text-parchment/40"
                        />
                        <MilestoneCard
                            followers="5,000"
                            status="Testing Phase"
                            advice="Test low-risk offers. Gauge interest."
                            color="text-yellow-200/60"
                        />
                        <MilestoneCard
                            followers="10,000+"
                            status="Monetization Mode"
                            advice="Multiple streams. Real income."
                            color="text-gold"
                        />
                    </div>

                    <div className="bg-white/5 p-4 rounded text-center text-sm text-parchment/70">
                        <span className="font-bold text-gold">Readiness Formula:</span> Followers × Engagement Rate (decimal) = Active Audience.
                        <br />
                        <span className="italic opacity-60">Example: 8,000 followers × 0.07 engagement = 560 potential customers.</span>
                    </div>
                </div>

                {/* Hero Image: Monetization Vault */}
                <div className="relative group rounded-xl overflow-hidden shadow-2xl border border-gold/20">
                    <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                    <img
                        src="/images/blueprint_monetization_vault.png"
                        alt="The Monetization Vault"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-4 right-4 bg-black/80 px-4 py-2 rounded-full border border-gold/30 text-gold text-xs font-mono">
                        VALUE_UNLOCKED
                    </div>
                </div>
            </section>

            {/* --- 7 MONETIZATION METHODS --- */}
            <section className="space-y-12">
                <h3 className="text-3xl font-serif text-parchment text-center mb-12">7 Revenue Streams for Poets</h3>

                <div className="grid md:grid-cols-2 gap-6">
                    <MethodCard
                        icon={<BookOpen className="w-5 h-5" />}
                        title="1. Anthology Co-Author"
                        desc="Publish a book featuring your community."
                        profit="High (₹30K - ₹50K per launch)"
                        highlight
                    />
                    <MethodCard
                        icon={<Download className="w-5 h-5" />}
                        title="2. Digital Products"
                        desc="Ebooks, prompts, guides."
                        profit="Passive (100% margin)"
                    />
                    <MethodCard
                        icon={<PenTool className="w-5 h-5" />}
                        title="3. Commissions"
                        desc="Custom poems for weddings, anniversaries."
                        profit="High Service (₹1K - ₹2K per poem)"
                    />
                    <MethodCard
                        icon={<Briefcase className="w-5 h-5" />}
                        title="4. Brand Collabs"
                        desc="Promoting relevant products."
                        profit="Scalable (₹1K - ₹5K per post)"
                    />
                    <MethodCard
                        icon={<Video className="w-5 h-5" />}
                        title="5. Workshops"
                        desc="Teaching poetry writing or growth."
                        profit="High Value (₹500 - ₹1K per seat)"
                    />
                    <MethodCard
                        icon={<TrendingUp className="w-5 h-5" />}
                        title="6. Affiliate Marketing"
                        desc="Earning commission on tools you use."
                        profit="Supplementary Income"
                    />
                    <MethodCard
                        icon={<ShoppingBag className="w-5 h-5" />}
                        title="7. Merchandise"
                        desc="Notebooks, prints, mugs."
                        profit="Volume Based"
                        cols="md:col-span-2"
                    />
                </div>
            </section>

            {/* --- THE VALUE LADDER --- */}
            <section className="space-y-8">
                <div className="bg-gradient-to-br from-ink-950 to-brown-950/30 p-8 rounded-2xl border border-gold/20">
                    <h3 className="text-2xl font-serif text-parchment mb-6 text-center">The Value Ladder</h3>

                    <div className="flex flex-col-reverse gap-4 max-w-lg mx-auto">
                        <LadderStep
                            level="High Ticket"
                            price="₹5,000+"
                            item="Mentorship / Coaching"
                            color="bg-gold text-black"
                        />
                        <LadderStep
                            level="Mid Ticket"
                            price="₹999 - ₹2,999"
                            item="Courses / Workshops / Anthology"
                            color="bg-gold/60 text-black"
                        />
                        <LadderStep
                            level="Low Ticket"
                            price="₹99 - ₹499"
                            item="Ebooks / Prompts"
                            color="bg-gold/30 text-parchment"
                        />
                        <LadderStep
                            level="Lead Magnet"
                            price="FREE"
                            item="Free PDF / Email List"
                            color="bg-gold/10 text-parchment/60"
                        />
                        <LadderStep
                            level="Entrance"
                            price="FREE"
                            item="Instagram Content"
                            color="bg-white/5 text-parchment/40"
                        />
                    </div>
                </div>
            </section>

            {/* --- SELLING WITHOUT BEING SALESY --- */}
            <section className="space-y-8">
                <h3 className="text-2xl font-serif text-gold mb-6">Selling Without Being "Salesy"</h3>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-ink-900/40 p-6 rounded-xl border border-white/5">
                        <div className="text-gold font-bold mb-2">The 80/20 Rule</div>
                        <p className="text-parchment/70 text-sm">
                            80% Value (Free poetry)<br />
                            20% Promotion (Ideally less)
                        </p>
                    </div>
                    <div className="bg-ink-900/40 p-6 rounded-xl border border-white/5">
                        <div className="text-gold font-bold mb-2">The Story Launch</div>
                        <p className="text-parchment/70 text-sm">
                            Day 1: Tease<br />
                            Day 2: Reveal<br />
                            Day 3: Why<br />
                            Day 4: Open Sales
                        </p>
                    </div>
                </div>

                <div className="bg-ink-950 p-6 rounded-xl border border-gold/10">
                    <h4 className="font-bold text-parchment mb-4 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-green-400" />
                        The Irresistible Offer Formula
                    </h4>
                    <div className="grid md:grid-cols-3 gap-6 text-sm text-parchment/60">
                        <div>
                            <strong className="text-gold block mb-1">Stack Bonuses</strong>
                            "Get the book + Invite to Launch Event + Author Badge"
                        </div>
                        <div>
                            <strong className="text-gold block mb-1">Guarantee</strong>
                            "100% Refund if not satisfied (Lowers risk)"
                        </div>
                        <div>
                            <strong className="text-gold block mb-1">Ethical Scarcity</strong>
                            "Only 50 spots available" (Must be true)
                        </div>
                    </div>
                </div>
            </section>

            {/* --- ACTION ITEMS --- */}
            <section className="bg-ink-950/80 p-8 rounded-2xl border border-gold/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl" />

                <div className="relative z-10 space-y-6">
                    <h3 className="text-2xl font-serif text-white flex items-center gap-3">
                        <Target className="w-6 h-6 text-gold" />
                        Action Items - Chapter 7
                    </h3>
                    <p className="text-parchment/60 italic">Start building your income streams:</p>

                    <div className="space-y-4">
                        <ActionItem text='Calculate your monetization readiness (Followers × Engagement).' />
                        <ActionItem text='Choose ONE method to test this month (e.g., Commissions or Ebook).' />
                        <ActionItem text='Draft your "Value Ladder" roadmap from free to high-ticket.' />
                        <ActionItem text='Outline your first paid offer details (Price, Value, Bonuses).' />
                    </div>
                </div>
            </section>

        </div>
    );
};

// --- Sub-Components ---

const MilestoneCard = ({ followers, status, advice, color }: any) => (
    <div className="p-4 bg-ink-950 rounded-lg border border-white/5 text-center">
        <div className={`text-2xl font-bold mb-1 ${color}`}>{followers}</div>
        <div className="text-xs uppercase tracking-widest font-bold mb-2 text-parchment">{status}</div>
        <div className="text-xs text-parchment/60 leading-relaxed">{advice}</div>
    </div>
);

const MethodCard = ({ icon, title, desc, profit, highlight, cols }: any) => (
    <div className={`p-6 rounded-xl border transition-all hover:scale-[1.02] ${highlight ? 'bg-gold/10 border-gold/40' : 'bg-ink-900/40 border-white/5 hover:border-gold/20'} ${cols || ''}`}>
        <div className="flex items-start justify-between mb-3">
            <div className={`p-2 rounded-full ${highlight ? 'bg-black/20 text-gold' : 'bg-white/5 text-parchment'}`}>
                {icon}
            </div>
            {highlight && <div className="text-[10px] uppercase font-bold bg-gold text-black px-2 py-1 rounded">Recommended</div>}
        </div>
        <h4 className={`font-bold text-lg mb-1 ${highlight ? 'text-gold' : 'text-parchment'}`}>{title}</h4>
        <p className="text-parchment/70 text-sm mb-3">{desc}</p>
        <div className="text-xs font-mono opacity-60 flex items-center gap-1">
            <DollarSign className="w-3 h-3" />
            {profit}
        </div>
    </div>
);

const LadderStep = ({ level, price, item, color }: any) => (
    <div className={`p-4 rounded-lg flex items-center justify-between shadow-lg ${color}`}>
        <div>
            <div className="text-xs font-bold uppercase tracking-widest opacity-70">{level}</div>
            <div className="font-bold text-sm md:text-base">{item}</div>
        </div>
        <div className="text-xs font-mono font-bold bg-black/20 px-2 py-1 rounded">
            {price}
        </div>
    </div>
);

const ActionItem = ({ text }: { text: string }) => (
    <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-white/5 hover:bg-gold/5 transition-colors cursor-default">
        <div className="mt-1 w-5 h-5 rounded-full border-2 border-gold/30 flex items-center justify-center shrink-0">
            <div className="w-2.5 h-2.5 bg-gold rounded-full opacity-0 hover:opacity-100 transition-opacity" />
        </div>
        <p className="text-parchment/90 font-serif">{text}</p>
    </div>
);
