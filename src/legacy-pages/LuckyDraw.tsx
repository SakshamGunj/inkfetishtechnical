import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Trophy } from 'lucide-react';

const NAMES = [
    "SANIYA MAQBOOL SHAIKH", "IMTIYAZ IQBAL", "Jia Chanchlani", "Delsa Mariya Mathew",
    "Tejas Pandey", "Bhavjot Singh Saluja", "Om prakash", "Madhumita Kundu", "Ravi Kaant",
    "R.THIRUSELVAM.", "Nandini Ashwini Nitin Mehetre", "Yashika Gautam", "Zoya Fatima",
    "Yashvi Patwa", "Dr. Sarada Prasad Kar", "Padmanaban", "Monalisha Boruah", "kamaldeep singh",
    "Fatima S.", "Anirban De", "Shravani Veldurthi", "Vandana Rani Dayal", "Saswati Saha",
    "Palak Devansh Garg", "Mamta Dhamija (Manu)", "Hushmeet Singh", "Rajkumar Singh Yadav",
    "Ayush Kumar Tiwari", "Ajay Kumar", "Neil Shah", "Yakshita Gawan", "Ansari Mohammad Muzammil",
    "Pushpinder singh", "Lillian Blythe", "Monika Kalra", "Awaara ladka ( Ayush kushwah )",
    "Bhavin Triwadi", "Anurag Saxena", "Khush Nadaf", "CA Shruti Mundada", "Apoorva Kaushik",
    "Charul Agrawal", "Kunal joshi", "Dr Aakash Vashistha", "Estephan Qamar", "Thakkar Kashyap",
    "Dr. J. SHIFA FATHIMA", "Aziz", "Sanjay parmar", "चंद्रकांत मिश्र 'मधुर'", "Nitika", "Gopinath S",
    "Sandeep kaur", "Amandeep Kaur", "Soubhik Dev", "Sureshkumar R", "Hitesh Kesarkar Kahanikar",
    "Aditi Gupta", "Avik Ganguli", "Santosh Kumar Dwivedi", "Rima Killa"
];

const LuckyDraw = () => {
    const [currentName, setCurrentName] = useState<string>("Ready to Spin!");
    const [isSpinning, setIsSpinning] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);

    const startSpin = () => {
        if (isSpinning) return;

        setIsSpinning(true);
        setWinner(null);
        setCurrentName(NAMES[Math.floor(Math.random() * NAMES.length)]);

        let iterations = 0;
        const maxIterations = 50; // Total number of ticks
        let delay = 30; // Initial delay in ms (very fast)

        const tick = () => {
            setCurrentName(NAMES[Math.floor(Math.random() * NAMES.length)]);
            iterations++;

            if (iterations < maxIterations) {
                // Increase delay based on progress to create slow-down effect
                if (iterations > maxIterations * 0.6) {
                    delay += 15; // Start slowing down
                } else if (iterations > maxIterations * 0.8) {
                    delay += 30; // Slow down more
                }
                setTimeout(tick, delay);
            } else {
                // Boom! Final winner
                const finalWinner = NAMES[Math.floor(Math.random() * NAMES.length)];
                setCurrentName(finalWinner);
                setWinner(finalWinner);
                setIsSpinning(false);
            }
        };

        setTimeout(tick, delay);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4 relative overflow-hidden font-serif">
            {/* Vintage Background Decor */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #D4AF37 0%, transparent 70%)' }} />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />

            <div className="z-10 text-center flex flex-col items-center w-full max-w-4xl">
                <div className="mb-12 flex flex-col items-center">
                    <h1 className="text-4xl md:text-6xl text-[#D4AF37] font-bold mb-4 tracking-wider uppercase text-center" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        Indian Writers League
                    </h1>
                    <h2 className="text-2xl md:text-3xl text-[#f3e5ab] font-light tracking-widest uppercase mb-4">
                        Open Mic Performance
                    </h2>
                    <div className="mt-8 h-[2px] w-64 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                </div>

                {/* Slot Machine Display */}
                <div className="relative w-full px-4 md:px-12 py-16 md:py-24 mb-16 rounded-xl border-4 border-[#D4AF37] bg-[#1a1a1a] shadow-[0_0_50px_rgba(212,175,55,0.2)] overflow-hidden">
                    {/* Inner Shadow / Glow */}
                    <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] pointer-events-none" />

                    <div className={`transition-all duration-300 transform flex items-center justify-center min-h-[120px] ${winner ? 'scale-110' : 'scale-100'}`}>
                        <p className={`text-3xl md:text-6xl font-bold text-center uppercase tracking-wider ${winner ? 'text-white' : 'text-[#f3e5ab]/80'}`}
                            style={{
                                textShadow: winner ? '0 0 20px rgba(212,175,55,0.8), 0 0 40px rgba(212,175,55,0.4)' : 'none',
                                fontFamily: '"Playfair Display", serif'
                            }}>
                            {currentName}
                        </p>
                    </div>

                    {/* Winner Decorations */}
                    {winner && (
                        <div className="absolute top-4 right-4 md:top-8 md:right-8 text-[#D4AF37] opacity-80 animate-bounce">
                            <Sparkles size={48} />
                        </div>
                    )}
                    {winner && (
                        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 text-[#D4AF37] opacity-80 animate-bounce" style={{ animationDelay: '0.5s' }}>
                            <Sparkles size={48} />
                        </div>
                    )}
                </div>

                {/* Spin Button */}
                <Button
                    onClick={startSpin}
                    disabled={isSpinning}
                    className="relative overflow-hidden group bg-gradient-to-b from-[#D4AF37] to-[#996515] hover:from-[#f3e5ab] hover:to-[#D4AF37] text-black font-bold text-2xl md:text-4xl px-12 py-10 rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.3)] transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-[#fff8dc]"
                >
                    <div className="absolute inset-0 w-full h-full bg-white/20 group-hover:bg-transparent transition-all" />
                    <span className="relative flex items-center gap-4 uppercase tracking-widest">
                        {isSpinning ? 'Selecting...' : 'Reveal Winner'}
                        {!isSpinning && <Trophy className="w-8 h-8" />}
                    </span>
                </Button>
            </div>
        </div>
    );
};

export default LuckyDraw;
