const fs = require('fs');
const file = 'src/app/shakespeare-award-v2/ShakespeareAwardClient.tsx';
let content = fs.readFileSync(file, 'utf8');

const oldHeroLeft = `<div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left flex-shrink-0">
            
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
            </motion.h1>`;

const newHeroLeft = `<div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left flex-shrink-0 relative">
            
            {/* Premium Glassmorphism Wrapper for Text */}
            <div className="relative z-10 w-full lg:bg-[#1A1613]/40 lg:backdrop-blur-sm lg:border lg:border-gold/10 lg:p-10 lg:rounded-sm lg:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent opacity-50 pointer-events-none hidden lg:block"></div>
              
              {/* TITLE */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center lg:items-start gap-4 mb-8 relative z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-gold/50"></div>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] font-black text-gold/80">By Inkfetish</span>
                  <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-gold/50"></div>
                </div>
                
                <div className="inline-flex items-center gap-2 px-5 py-2 border border-gold/40 bg-gradient-to-br from-[#1A1613] to-[#0A0806] text-[#ebd298] text-[10px] sm:text-[11px] font-black tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(197,160,89,0.15)] rounded-sm">
                  <Award className="w-4 h-4 text-gold" />
                  The Highest Literary Honor
                </div>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[2.2rem] sm:text-3xl md:text-4xl lg:text-[3.5rem] font-serif font-black leading-[1.1] mb-4 lg:mb-8 tracking-tight w-full drop-shadow-2xl relative z-20"
              >
                <span className="text-base sm:text-lg md:text-xl block mb-2 sm:mb-4 text-ink-300 font-light tracking-[0.2em] uppercase">Take Part in the</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#fdfbf7] via-[#ebd298] to-[#c5a059] block pb-2 drop-shadow-[0_0_15px_rgba(197,160,89,0.2)]">
                  Shakespeare Poetry Award
                </span>
                <span className="flex items-center justify-center lg:justify-start gap-4 mt-4">
                  <div className="w-12 h-[2px] bg-gold/30 hidden sm:block"></div>
                  <span className="italic text-white opacity-100 text-2xl sm:text-3xl md:text-4xl font-light tracking-wide">2026 Volume 2</span>
                </span>
              </motion.h1>
            </div>`;

content = content.replace(oldHeroLeft, newHeroLeft);

// Make the images glow better
content = content.replace(/shadow-\[0_20px_50px_rgba\(197,160,89,0\.15\)\]/g, 'shadow-[0_0_80px_rgba(197,160,89,0.25)] border-gold/50');

fs.writeFileSync(file, content);
console.log('Redesigned hero successfully.');
