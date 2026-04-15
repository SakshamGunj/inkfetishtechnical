import React, { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
    BookOpen,
    Feather,
    PenTool,
    Sparkles,
    Globe,
    Send,
    CheckCircle2,
    Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const AnthologyCoAuthor = () => {
    const [formData, setFormData] = useState({
        name: "",
        penName: "",
        email: "",
        phone: "",
        genre: "",
        bio: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast.success("Application received. We will contact you soon.");
        setFormData({
            name: "",
            penName: "",
            email: "",
            phone: "",
            genre: "",
            bio: ""
        });
        setIsSubmitting(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="min-h-screen bg-ink-black text-parchment font-serif selection:bg-gold selection:text-ink-black overflow-x-hidden">
            <Helmet>
                <title>Become a Co-Author | Inkfetish Anthology</title>
                <meta name="description" content="Join an elite covenant of storytellers. Apply to be a co-author in our upcoming premium anthology." />
            </Helmet>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-ink-black/80 backdrop-blur-md border-b border-white/5">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center border border-gold/20">
                            <Feather className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-parchment tracking-widest uppercase">Inkfetish</h1>
                            <p className="text-xs text-parchment/50">Anthology Series</p>
                        </div>
                    </div>
                    <Button variant="ghost" className="text-parchment hover:text-gold hover:bg-white/5">
                        <Share2 className="w-4 h-4 mr-2" /> Share
                    </Button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-[80vh] flex items-center pt-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-30 pointer-events-none" />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <Badge variant="outline" className="mb-6 border-gold/30 text-gold bg-gold/5 px-4 py-1 tracking-widest uppercase">
                            Open for Applications
                        </Badge>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-8 leading-tight">
                            Become a Published <br />
                            <span className="text-gold italic font-normal font-display">Co-Author</span>
                        </h1>
                        <p className="text-xl text-parchment/60 font-light max-w-2xl mx-auto leading-relaxed mb-12">
                            Join a covenant of elite storytellers. We are curating a premium anthology that bridges the gap between silence and immortality. Your words deserve to be carved in history.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="py-24 bg-white/5 border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-gold text-xs tracking-[0.3em] uppercase">Why Join Us?</span>
                        <h2 className="text-3xl md:text-4xl font-light mt-4">The Inkfetish Advantage</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "Global Reach", desc: "Distribution across major platforms Amazon, Flipkart & Kindel.", icon: Globe },
                            { title: "Premium Design", desc: "Professional cover design and interior layout.", icon: PenTool },
                            { title: "Expert Editing", desc: "Detailed editorial feedback to polish your work.", icon: BookOpen },
                            { title: "Marketing", desc: "Features on our social channels and networks.", icon: Sparkles }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 bg-ink-black border border-white/5 rounded-2xl hover:border-gold/30 transition-all hover:bg-gold/5 group"
                            >
                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-ink-black transition-colors">
                                    <item.icon className="w-6 h-6 text-gold group-hover:text-ink-black" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-parchment/50 font-sans text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Application Form */}
            <section className="py-24 relative" id="apply">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="bg-ink-900/50 backdrop-blur-md border border-gold/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        <div className="text-center mb-12 relative z-10">
                            <h2 className="text-3xl md:text-4xl font-light mb-4">Application Form</h2>
                            <p className="text-parchment/60">Begin your journey to publication.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-gold/70 ml-1">Full Name</label>
                                    <Input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="bg-white/5 border-white/10 text-parchment focus:border-gold/50 h-12"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-gold/70 ml-1">Pen Name</label>
                                    <Input
                                        name="penName"
                                        value={formData.penName}
                                        onChange={handleChange}
                                        className="bg-white/5 border-white/10 text-parchment focus:border-gold/50 h-12"
                                        placeholder="Optional"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-gold/70 ml-1">Email Address</label>
                                    <Input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="bg-white/5 border-white/10 text-parchment focus:border-gold/50 h-12"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-gold/70 ml-1">Phone Number</label>
                                    <Input
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="bg-white/5 border-white/10 text-parchment focus:border-gold/50 h-12"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-gold/70 ml-1">Preferred Genre</label>
                                <Input
                                    name="genre"
                                    value={formData.genre}
                                    onChange={handleChange}
                                    placeholder="Poetry, Fiction, Short Stories..."
                                    className="bg-white/5 border-white/10 text-parchment focus:border-gold/50 h-12"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-gold/70 ml-1">Short Bio / Writing Experience</label>
                                <Textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    placeholder="Tell us a bit about yourself and your journey..."
                                    className="bg-white/5 border-white/10 text-parchment focus:border-gold/50 min-h-[150px]"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gold text-ink-black hover:bg-gold/90 h-14 text-lg font-bold tracking-wide mt-4"
                            >
                                {isSubmitting ? "Submitting..." : "Submit Application"}
                            </Button>

                            <p className="text-center text-xs text-parchment/30 mt-4">
                                By submitting, you agree to our review process.
                            </p>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer Message */}
            <section className="py-12 border-t border-white/5 text-center">
                <p className="text-sm text-parchment/30 uppercase tracking-widest">© 2025 Inkfetish Anthology Series.</p>
            </section>
        </div>
    );
};

export default AnthologyCoAuthor;
