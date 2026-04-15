import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Feather, CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AnthologyThankYou = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { queueNumber, whatsappLink } = location.state || {}; // Expect these from navigation state

    React.useEffect(() => {
        document.body.style.backgroundColor = '#000';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    // Fallback if accessed directly without state (though ideally should redirect home)
    if (!queueNumber && !whatsappLink) {
        return (
            <div className="min-h-screen bg-stone-950 flex items-center justify-center text-white">
                <div className="text-center">
                    <p>Redirecting...</p>
                    <button onClick={() => navigate('/')} className="mt-4 underline">Go Home</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-950 flex items-center justify-center p-6 relative overflow-hidden font-serif">
            <Helmet>
                <title>Thank You | Inkfetish Publications</title>
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Courier+Prime:wght@400;700&display=swap');
                    .font-cinzel { font-family: 'Cinzel', serif; }
                    .font-playfair { font-family: 'Playfair Display', serif; }
                    .font-typewriter { font-family: 'Courier Prime', monospace; }
                `}</style>
            </Helmet>

            {/* Background Textures */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-20" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-900/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-stone-800/10 rounded-full blur-[100px]" />

            <div className="max-w-xl w-full bg-black border border-stone-800 p-8 md:p-12 rounded-sm shadow-2xl relative z-10 text-center">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="w-20 h-20 bg-stone-900 border border-stone-700 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                        <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <h1 className="font-cinzel text-3xl md:text-4xl text-white mb-4">Application Received</h1>

                    <div className="my-8 p-6 bg-stone-900/30 border border-dashed border-stone-700 rounded-lg">
                        <p className="font-typewriter text-stone-500 text-xs uppercase tracking-widest mb-2">Your Queue Number</p>
                        <p className="font-cinzel text-4xl text-white font-bold tracking-widest">#{queueNumber}</p>
                    </div>

                    <p className="font-playfair text-stone-400 text-lg mb-8 italic">
                        "We will share the submission form and other important details in the group so pls join!!"
                    </p>

                    <div className="space-y-4">
                        {whatsappLink && (
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-cinzel font-bold uppercase tracking-widest transition-all rounded-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-green-900/20"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Join WhatsApp Group
                            </a>
                        )}

                        <button
                            onClick={() => navigate('/anthology/hearts-under-construction')}
                            className="block w-full py-4 bg-transparent border border-stone-700 text-stone-400 hover:text-white hover:border-stone-500 font-typewriter text-xs uppercase tracking-widest transition-all rounded-sm"
                        >
                            Return to Anthology
                        </button>
                    </div>

                    <div className="mt-8 pt-6 border-t border-stone-900 flex items-center justify-center gap-2 opacity-50">
                        <Feather className="w-4 h-4 text-stone-600" />
                        <span className="font-typewriter text-stone-600 text-xs uppercase tracking-widest">Inkfetish Publications</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AnthologyThankYou;
