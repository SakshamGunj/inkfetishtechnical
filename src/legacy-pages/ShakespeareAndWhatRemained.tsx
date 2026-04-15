import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Feather, Library, ShoppingCart, User, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ShakespeareAndWhatRemained = () => {
    const [showIntro, setShowIntro] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowIntro(false);
        }, 2500); // 2.5s cinematic intro
        return () => clearTimeout(timer);
    }, []);
    const ctaLinks = {
        buyNow: "https://payments.cashfree.com/forms/Shakespeareandwhatremained",
        getCopy: "https://payments.cashfree.com/forms/Shakespeareandwhatremained",
    };

    return (
        <div className="min-h-screen bg-[#1c1613] text-[#ebd8b7] font-serif selection:bg-[#7e5f3b] selection:text-[#f8f1de] relative overflow-hidden">

            <AnimatePresence>
                {showIntro && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
                        className="fixed inset-0 z-[100] bg-[#1a1512] flex flex-col items-center justify-center pointer-events-none"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
                            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="text-center"
                        >
                            <Feather className="w-16 h-16 text-[#d4af37] mx-auto mb-6 opacity-80" />
                            <h1 className="text-4xl md:text-6xl font-black text-[#f4ebd0] tracking-widest uppercase mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                                Shakespeare
                            </h1>
                            <p className="text-xl md:text-2xl text-[#b0966f] italic font-light">
                                and What Remained
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Texture & Gradient */}
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `url("/images/vintage_parchment_background.png")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    mixBlendMode: 'luminosity',
                    opacity: 0.15,
                }}
            />
            <div
                className="fixed inset-0 z-0 opacity-40 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at center top, rgba(212, 175, 55, 0.15) 0%, rgba(26, 21, 18, 0.9) 80%, #1a1512 100%)`,
                }}
            />

            {/* Content Wrapper */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 md:py-24">

                {/* Entry Animation Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="text-center space-y-6 mb-20"
                >
                    <div className="flex justify-center mb-6">
                        <Feather className="w-12 h-12 text-[#b0966f] opacity-80" />
                    </div>
                    <span className="tracking-widest uppercase text-sm md:text-md text-[#b0966f] font-light">
                        Volume 1 • Poetry Anthology
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-4 text-[#f4ebd0]" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Shakespeare<br />
                        <span className="italic font-light text-4xl md:text-6xl text-[#d4af37]">and</span><br />
                        What Remained
                    </h1>
                    <p className="text-xl md:text-3xl italic text-[#b0966f] font-light mt-8">
                        “Where silence finally learns to Speak”
                    </p>

                    <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                                boxShadow: ["0px 0px 0px rgba(212,175,55,0)", "0px 0px 30px rgba(212,175,55,0.4)", "0px 0px 0px rgba(212,175,55,0)"]
                            }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-full sm:w-auto"
                        >
                            <Button
                                size="lg"
                                className="bg-[#d4af37] text-[#1a1512] hover:bg-[#b8952b] w-full text-lg px-8 py-6 rounded-none border border-[#d4af37] transition-all"
                                onClick={() => window.location.href = ctaLinks.buyNow}
                            >
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                Buy Now
                            </Button>
                        </motion.div>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-[#b0966f] text-[#f4ebd0] hover:bg-[#3d2c1d] hover:text-white w-full sm:w-auto text-lg px-8 py-6 rounded-none bg-transparent transition-all"
                            onClick={() => window.location.href = ctaLinks.getCopy}
                        >
                            <BookOpen className="mr-2 h-5 w-5" />
                            Get Your Copy
                        </Button>
                    </div>
                </motion.div>

                {/* Info Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 border-y border-[#3d2c1d] py-12"
                >
                    <div className="text-center">
                        <Users className="w-6 h-6 mx-auto mb-3 text-[#b0966f]" />
                        <div className="text-2xl font-bold text-[#f4ebd0]">176</div>
                        <div className="text-sm text-[#8c7a6b] uppercase tracking-wider mt-1">Co-Authors</div>
                    </div>
                    <div className="text-center">
                        <Library className="w-6 h-6 mx-auto mb-3 text-[#b0966f]" />
                        <div className="text-2xl font-bold text-[#f4ebd0]">Inkfetish</div>
                        <div className="text-sm text-[#8c7a6b] uppercase tracking-wider mt-1">Publisher</div>
                    </div>
                    <div className="text-center">
                        <BookOpen className="w-6 h-6 mx-auto mb-3 text-[#b0966f]" />
                        <div className="text-2xl font-bold text-[#f4ebd0]">Vol 1</div>
                        <div className="text-sm text-[#8c7a6b] uppercase tracking-wider mt-1">Anthology</div>
                    </div>
                    <div className="text-center">
                        <User className="w-6 h-6 mx-auto mb-3 text-[#b0966f]" />
                        <div className="text-xl md:text-sm font-bold text-[#f4ebd0] mt-1 break-all">9788199599963</div>
                        <div className="text-sm text-[#8c7a6b] uppercase tracking-wider mt-1">ISBN</div>
                    </div>
                </motion.div>

                {/* Content Section */}
                <div className="space-y-32 mb-24 mt-12">
                    <div className="grid md:grid-cols-12 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="md:col-span-7 prose prose-invert prose-lg"
                        >
                            <h2 className="text-4xl font-black text-[#d4af37] mb-8 flex items-center border-b border-[#3d2c1d] pb-4 font-serif">
                                <span className="uppercase tracking-widest text-sm mr-4 mt-2 font-light text-[#b0966f]">01.</span>
                                The Legacy
                            </h2>
                            <p className="text-[#ebd8b7] leading-relaxed mb-6 text-xl">
                                <strong className="text-[#f8f1de] font-serif font-bold">Shakespeare and What Remained</strong> brings together the finest poems from the Shakespeare Poetry Award 2025, a landmark celebration of contemporary poetic expression inspired by one of literature’s greatest legacies.
                            </p>
                            <p className="text-[#d8cca6] leading-relaxed mb-6 text-lg">
                                This anthology is not about imitation but inheritance — about what endures when language, emotion, and imagination pass from one era to another.
                            </p>
                            <p className="text-[#d8cca6] leading-relaxed text-lg italic border-l-2 border-[#b0966f] pl-6 mb-8">
                                Each poem reflects a dialogue with time, capturing modern voices shaped by timeless themes. Together, they form a powerful testament to poetry’s ability to survive, transform, and speak anew.
                            </p>
                            <motion.div
                                animate={{
                                    scale: [1, 1.03, 1],
                                    boxShadow: ["0px 0px 0px rgba(212,175,55,0)", "0px 0px 20px rgba(212,175,55,0.2)", "0px 0px 0px rgba(212,175,55,0)"]
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                className="inline-block"
                            >
                                <Button
                                    size="lg"
                                    className="bg-[#1a1512] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#1a1512] text-md px-8 py-6 rounded-none border border-[#d4af37] font-bold tracking-wide transition-colors"
                                    onClick={() => window.location.href = ctaLinks.buyNow}
                                >
                                    <BookOpen className="mr-2 h-5 w-5" />
                                    Reserve Your Copy
                                </Button>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2 }}
                            className="md:col-span-5 relative flex justify-center"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#d4af37]/20 to-transparent rounded-full mix-blend-overlay blur-3xl"></div>
                            <img
                                src="/images/shakespeare_front_cover_with_bg.jpg"
                                alt="Shakespeare Anthology Front Cover"
                                loading="lazy"
                                className="w-full md:w-auto h-auto max-h-[400px] md:max-h-[600px] object-contain rounded-sm shadow-2xl relative z-10 border border-[#3d2c1d]/50"
                            />
                        </motion.div>
                    </div>

                    <div className="grid md:grid-cols-12 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2 }}
                            className="md:col-span-5 order-2 md:order-1 relative flex justify-center"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tl from-[#d4af37]/10 to-transparent rounded-full mix-blend-overlay blur-3xl"></div>
                            <img
                                src="/images/shakespeare_double_cover.jpg"
                                alt="Shakespeare Anthology Full Spread"
                                loading="lazy"
                                className="w-full md:w-auto h-auto max-h-[400px] md:max-h-[600px] object-contain rounded-sm shadow-2xl relative z-10 border border-[#3d2c1d]/50"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="md:col-span-7 order-1 md:order-2 prose prose-invert prose-lg"
                        >
                            <h2 className="text-4xl font-black text-[#d4af37] mb-6 flex items-center border-b border-[#3d2c1d] pb-4 font-serif">
                                <span className="uppercase tracking-widest text-sm mr-4 mt-2 font-light text-[#b0966f]">02.</span>
                                The Publisher
                            </h2>
                            <p className="text-[#ebd8b7] leading-relaxed mb-6 text-lg">
                                <strong className="text-[#f8f1de] font-serif font-bold">Ink Fetish</strong> began in 2021 as a small corner of hope for unheard writers. In the early days, only a few supported the journey, but the mission continued with the belief that every writer eventually finds their audience.
                            </p>
                            <p className="text-[#ebd8b7] leading-relaxed mb-6 text-lg">
                                Today, the community has grown into a <span className="text-[#d4af37] font-bold">190k+ writer community</span> and a full-fledged publishing house dedicated to:
                            </p>
                            <div className="grid grid-cols-2 gap-4 text-[#b0966f] mb-8 ml-2">
                                <div className="flex items-center"><Feather className="w-5 h-5 mr-3 text-[#b8952b]" /> Young authors</div>
                                <div className="flex items-center"><Feather className="w-5 h-5 mr-3 text-[#b8952b]" /> Professionals</div>
                                <div className="flex items-center"><Feather className="w-5 h-5 mr-3 text-[#b8952b]" /> Students</div>
                                <div className="flex items-center col-span-2"><Feather className="w-5 h-5 mr-3 text-[#b8952b]" /> Anyone who writes between the chaos of life</div>
                            </div>
                            <p className="text-[#ebd8b7] italic mt-8 border-l-4 border-[#d4af37] pl-6 py-2 bg-[#d4af37]/5 text-lg rounded-r-sm">
                                This anthology is a thank-you to every writer who trusted the platform and shared their work.
                            </p>
                            <div className="mt-8">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.03, 1],
                                        boxShadow: ["0px 0px 0px rgba(212,175,55,0)", "0px 0px 20px rgba(212,175,55,0.3)", "0px 0px 0px rgba(212,175,55,0)"]
                                    }}
                                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="w-full sm:w-auto mb-8 relative z-20"
                                >
                                    <Button
                                        size="lg"
                                        className="bg-[#d4af37] text-[#1a1512] hover:bg-[#b8952b] text-md px-8 py-6 rounded-none font-bold tracking-wide transition-colors w-full"
                                        onClick={() => window.location.href = ctaLinks.buyNow}
                                    >
                                        <ShoppingCart className="mr-2 h-5 w-5" />
                                        Support Our Writers
                                    </Button>
                                </motion.div>

                                <div className="space-y-4 border-l-2 border-[#3d2c1d] pl-6 py-2">
                                    <div className="flex items-center text-[#ebd8b7]">
                                        <span className="text-sm text-[#8c7a6b] uppercase tracking-widest w-24">Call</span>
                                        <a href="tel:+919358927243" className="hover:text-[#d4af37] transition-colors font-medium">+91 9358927243</a>
                                    </div>
                                    <div className="flex items-center text-[#ebd8b7]">
                                        <span className="text-sm text-[#8c7a6b] uppercase tracking-widest w-24">WhatsApp</span>
                                        <a href="https://wa.me/917250504240" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4af37] transition-colors font-medium">+91 7250504240</a>
                                    </div>
                                    <div className="flex items-center text-[#ebd8b7]">
                                        <span className="text-sm text-[#8c7a6b] uppercase tracking-widest w-24">Email</span>
                                        <a href="mailto:inkfetishh@gmail.com" className="hover:text-[#d4af37] transition-colors font-medium">inkfetishh@gmail.com</a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Steps to Get Your Book Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="mb-24 relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#3d2c1d]/20 to-transparent rounded-lg mix-blend-overlay blur-3xl"></div>
                    <div className="relative z-10 p-8 md:p-12 border border-[#3d2c1d]/60 bg-[#1a1512]/60 rounded-xl">
                        <h2 className="text-3xl font-black text-[#d4af37] mb-4 flex items-center border-b border-[#3d2c1d]/80 pb-4 font-serif">
                            <BookOpen className="w-8 h-8 mr-4" />
                            Steps to Get Your Book
                        </h2>

                        <div className="prose prose-invert max-w-none text-[#ebd8b7]">
                            <p className="text-xl mb-4 text-[#f4ebd0] font-medium mt-6">First of all, congratulations! 🎉</p>
                            <p className="text-lg leading-relaxed mb-10 text-[#d8cca6]">
                                You are here, which means you’ve taken a great decision to receive your work. We’re excited for you! Click the <strong className="text-[#d4af37]">Buy Now</strong> button above to begin the process.
                            </p>

                            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 relative">
                                {/* Vertical connection line for Desktop */}
                                <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-[#3d2c1d]/50 -translate-x-1/2"></div>

                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] font-bold text-lg border border-[#d4af37]/30 mr-4">1</div>
                                        <div>
                                            <h4 className="text-xl font-bold text-[#f4ebd0] mb-2">Step 1</h4>
                                            <p className="text-[#b0966f]">👉 Click “Next” to begin the process.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] font-bold text-lg border border-[#d4af37]/30 mr-4">2</div>
                                        <div>
                                            <h4 className="text-xl font-bold text-[#f4ebd0] mb-2">Step 2</h4>
                                            <p className="text-[#b0966f] mb-2">📝 Fill in the required information carefully, including:</p>
                                            <ul className="list-disc pl-5 mt-2 text-[#8c7a6b] space-y-1">
                                                <li>Full Name</li>
                                                <li>Delivery Address</li>
                                                <li>Contact Information</li>
                                            </ul>
                                            <p className="text-sm mt-2 italic text-[#b0966f]">This ensures your book reaches you safely.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 md:mt-8">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] font-bold text-lg border border-[#d4af37]/30 mr-4">3</div>
                                        <div>
                                            <h4 className="text-xl font-bold text-[#f4ebd0] mb-2">Step 3</h4>
                                            <p className="text-[#b0966f]">💳 Proceed to the secure payment page and complete the payment to confirm your order.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 md:mt-8">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] font-bold text-lg border border-[#d4af37]/30 mr-4">4</div>
                                        <div>
                                            <h4 className="text-xl font-bold text-[#f4ebd0] mb-2">Step 4</h4>
                                            <p className="text-[#b0966f] mb-3">📦 Once your payment is successfully processed, we will prepare and dispatch your book.</p>
                                            <p className="text-[#8c7a6b] text-sm">You will receive an email confirmation containing:</p>
                                            <ul className="list-disc pl-5 mt-2 text-[#8c7a6b] space-y-1 text-sm">
                                                <li>Dispatch notification</li>
                                                <li>Order details</li>
                                                <li>Shipping / tracking information</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Third CTA Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center py-20 border border-[#3d2c1d] bg-[#221b17] relative overflow-hidden mb-24"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50"></div>
                    <h2 className="text-4xl font-bold text-[#f4ebd0] mb-6 font-serif">Be Part of the Legacy</h2>
                    <p className="text-[#b0966f] mb-8 max-w-xl mx-auto text-lg">
                        Immerse yourself in words that transcend time. Order your copy of Shakespeare and What Remained today.
                    </p>
                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                            boxShadow: ["0px 0px 0px rgba(244,235,208,0)", "0px 0px 40px rgba(244,235,208,0.3)", "0px 0px 0px rgba(244,235,208,0)"]
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        className="inline-block"
                    >
                        <Button
                            size="lg"
                            className="bg-[#f4ebd0] text-[#1a1512] hover:bg-[#d4af37] text-lg px-12 py-6 rounded-none font-bold tracking-wide transition-colors"
                            onClick={() => window.location.href = ctaLinks.buyNow}
                        >
                            Own the Anthology
                        </Button>
                    </motion.div>
                </motion.div>

            </div>

            {/* Mobile Sticky Banner CTA */}
            <div className="md:hidden fixed bottom-0 w-full bg-[#1a1512]/95 backdrop-blur-md border-t border-[#d4af37]/30 p-4 z-50 animate-in slide-in-from-bottom duration-500">
                <div className="flex justify-between items-center gap-4">
                    <div className="flex-1 flex flex-col">
                        <span className="text-xs text-[#b0966f] uppercase tracking-wider">Available Now</span>
                        <span className="text-sm font-bold text-[#f4ebd0] truncate">Shakespeare Anthology</span>
                    </div>
                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                            boxShadow: ["0px 0px 0px rgba(212,175,55,0)", "0px 0px 15px rgba(212,175,55,0.5)", "0px 0px 0px rgba(212,175,55,0)"]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Button
                            className="bg-[#d4af37] text-[#1a1512] hover:bg-[#b8952b] rounded-none px-6 font-bold flex-shrink-0"
                            onClick={() => window.location.href = ctaLinks.buyNow}
                        >
                            Buy Now
                        </Button>
                    </motion.div>
                </div>
            </div>

        </div>
    );
};

export default ShakespeareAndWhatRemained;
