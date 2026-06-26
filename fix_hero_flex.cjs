const fs = require('fs');
const file = 'src/app/shakespeare-award-v2/ShakespeareAwardClient.tsx';
let content = fs.readFileSync(file, 'utf8');

const heroRegex = /<div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-x-8 lg:gap-y-0 items-center lg:items-start">([\s\S]*?)<\/section>/;

// Extract the Image JSX block so we can duplicate it cleanly
const imageJSX = `<motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative rounded-sm overflow-hidden border-2 border-gold/40 bg-[#1A1613] shadow-[0_20px_50px_rgba(197,160,89,0.15)] p-2 w-full max-w-[320px] sm:max-w-sm lg:max-w-xl mx-auto lg:mx-0"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#14100C]/60 via-transparent to-transparent pointer-events-none z-10"></div>
              <Image
                src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1782388720/Shakespeare_Poetry_Award_Content_2_1080_x_1080_px_2_bko409.png"
                alt="Take part in Shakespeare Poetry Award 2026 Volume 2 By Inkfetish"
                width={1080}
                height={1080}
                className="w-full h-auto object-cover transition-transform duration-1000 hover:scale-[1.02]"
                priority
              />
              <div className="absolute top-4 right-4 z-20 bg-gold text-[#14100C] px-3 py-1 font-black text-[10px] uppercase tracking-widest shadow-lg rounded-sm">
                100% Genuine
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-[#1A1613]/90 backdrop-blur-md px-6 py-2 border border-gold/20 flex items-center gap-2 shadow-lg w-max">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Accepting 200 Entries</span>
              </div>
            </motion.div>`;

const newHero = `<div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-8">
          
          {/* LEFT COLUMN: Title & CTA */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left flex-shrink-0">
            
            {/* TITLE */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center lg:items-start gap-3 mb-6"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#c5a059]">By Inkfetish Publications</span>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-gold/30 bg-[#1A1613] text-gold text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase shadow-sm shadow-gold/5">
                <Award className="w-3.5 h-3.5" />
                The Highest Literary Honor
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[2rem] sm:text-2xl md:text-3xl lg:text-5xl font-serif font-black leading-[1.05] mb-4 lg:mb-8 text-[#fdfbf7] tracking-tight w-full drop-shadow-md"
            >
              <span className="text-lg sm:text-xl md:text-2xl block mb-3 opacity-90 font-light tracking-wide">Take Part in</span>
              Shakespeare Poetry Award <br className="hidden sm:block" /> 
              <span className="italic text-gold opacity-100 block mt-2 text-2xl sm:text-2xl md:text-3xl drop-shadow-[0_2px_10px_rgba(197,160,89,0.2)]">2026 Volume 2</span>
            </motion.h1>

            {/* MOBILE ONLY IMAGE */}
            <div className="w-full flex justify-center lg:hidden my-6">
              ${imageJSX}
            </div>

            {/* CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center lg:items-start gap-6 w-full max-w-sm lg:max-w-md mx-auto lg:mx-0"
            >
              <Link href="/shakespeare-award-v2/register" className="w-full relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#c5a059] to-[#ebd298] rounded-sm blur opacity-40 group-hover:opacity-70 transition duration-500"></div>
                <button className="relative w-full px-8 py-5 bg-gradient-to-b from-[#ebd298] to-[#c5a059] hover:from-[#fdfbf7] hover:to-[#ebd298] text-[#14100C] font-black text-[10px] sm:text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 border border-[#ebd298] shadow-[0_0_25px_rgba(197,160,89,0.4)] rounded-sm">
                  Register For Volume 2 Now <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              
              <div className="flex flex-col gap-3 w-full">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-ink-400 text-[10px] font-bold uppercase tracking-widest">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold shrink-0" />
                  100% Guaranteed Publication for All 200 Poets
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-black text-[11px] sm:text-xs font-black uppercase tracking-widest bg-gradient-to-r from-[#ebd298] to-[#c5a059] px-4 py-2 w-max mx-auto lg:mx-0 rounded-sm shadow-[0_0_15px_rgba(197,160,89,0.3)] mt-2">
                  <Star className="w-4 h-4 text-black shrink-0" />
                  Live Event Results Date: 19th July
                </div>
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: DESKTOP ONLY IMAGE */}
          <div className="hidden lg:flex w-full lg:w-1/2 justify-end lg:-mt-4">
            ${imageJSX}
          </div>

        </div>
      </section>`;

content = content.replace(heroRegex, newHero);
fs.writeFileSync(file, content);
console.log('Hero reverted to robust flex layout.');
