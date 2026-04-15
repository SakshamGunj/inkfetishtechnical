import React from 'react';
import {
    ArrowRight,
    TrendingUp,
    Users,
    Instagram,
    Zap,
    Target
} from 'lucide-react';

export const IntroductionContent = () => {
    return (
        <div className="space-y-16">

            {/* 1. Header */}
            <section className="text-center space-y-8">
                <h3 className="text-3xl md:text-5xl font-serif text-gold mb-6">How I Grew My Poetry Page to 200,000 Followers</h3>
                <p className="text-xl md:text-2xl text-parchment/60 font-serif italic mb-8">
                    (And How You Can Copy It)
                </p>

                <div className="bg-ink-900/50 border border-gold/20 p-8 rounded-2xl max-w-4xl mx-auto backdrop-blur-sm">
                    <p className="text-parchment/80 text-lg md:text-xl font-serif leading-relaxed">
                        This isn't just theory. This is the exact blueprint I used to build a massive, engaged community of poetry lovers.
                    </p>
                </div>
            </section>

            {/* 2. What You Will Learn */}
            <section className="bg-white/5 rounded-2xl p-8 md:p-12 border border-white/10">
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <h3 className="text-3xl font-serif text-parchment mb-4">What You Will Learn</h3>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <FeatureCard icon={<Target className="w-6 h-6" />} title="The Foundation" desc="Setting up your profile for maximum conversion and authority." />
                    <FeatureCard icon={<TrendingUp className="w-6 h-6" />} title="Viral Content" desc="The structure of poems that get shared, saved, and loved." />
                    <FeatureCard icon={<Users className="w-6 h-6" />} title="Community Growth" desc="Turning casual scrollers into loyal superfans." />
                </div>
            </section>

            {/* 3. Call to Action */}
            <section className="text-center py-8">
                <div className="inline-block bg-gradient-to-r from-ink-900 via-ink-800 to-ink-900 border border-gold/30 px-8 py-6 rounded-xl shadow-lg">
                    <h3 className="text-2xl font-serif text-gold font-bold flex items-center gap-3 justify-center">
                        <Zap className="w-6 h-6 fill-gold" />
                        Let's Begin.
                    </h3>
                </div>
            </section>

        </div>
    );
};

const FeatureCard = ({ icon, title, desc }: any) => (
    <div className="bg-ink-950/50 p-6 rounded-xl border border-white/5 hover:border-gold/20 transition-all text-center group">
        <div className="bg-white/5 w-12 h-12 rounded-full flex items-center justify-center text-parchment mx-auto mb-4 group-hover:text-gold group-hover:bg-gold/10 transition-colors">
            {icon}
        </div>
        <h4 className="font-bold text-parchment mb-2">{title}</h4>
        <p className="text-sm text-parchment/60 leading-relaxed">{desc}</p>
    </div>
);
