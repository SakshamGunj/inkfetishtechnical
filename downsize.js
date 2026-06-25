const fs = require('fs');
const file = 'src/app/shakespeare-award-v2/ShakespeareAwardClient.tsx';
let content = fs.readFileSync(file, 'utf8');

// Hero headline resizing
content = content.replace('text-[2.25rem] sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black', 'text-3xl sm:text-4xl lg:text-5xl font-serif font-black');
content = content.replace('text-2xl sm:text-3xl md:text-4xl block mb-2 opacity-90 font-medium', 'text-xl sm:text-2xl lg:text-3xl block mb-3 opacity-90 font-light tracking-wide');
content = content.replace('text-3xl sm:text-2xl sm:text-4xl md:text-5xl drop-shadow', 'text-2xl sm:text-3xl lg:text-4xl drop-shadow');

// Section headings (H2s)
content = content.replace(/text-3xl sm:text-5xl md:text-6xl/g, 'text-2xl sm:text-4xl md:text-5xl');
content = content.replace(/text-4xl sm:text-5xl md:text-6xl lg:text-7xl/g, 'text-3xl sm:text-4xl md:text-5xl');
content = content.replace(/text-4xl sm:text-5xl md:text-6xl/g, 'text-3xl sm:text-4xl md:text-5xl');
content = content.replace(/text-3xl sm:text-4xl md:text-5xl lg:text-6xl/g, 'text-2xl sm:text-3xl md:text-4xl');
content = content.replace(/text-2xl sm:text-4xl md:text-5xl/g, 'text-2xl sm:text-3xl md:text-4xl'); // For safety if some already changed
content = content.replace(/text-3xl md:text-4xl font-serif/g, 'text-2xl md:text-3xl font-serif');

// Paragraphs
content = content.replace(/text-sm sm:text-base md:text-lg/g, 'text-sm md:text-base');
content = content.replace(/text-sm md:text-base/g, 'text-[13px] sm:text-sm');

// Credibility strip
content = content.replace(/text-3xl font-black/g, 'text-2xl font-black');

// CTA Buttons
content = content.replace(/text-xs sm:text-sm uppercase tracking-\[0\.2em\]/g, 'text-[10px] sm:text-[11px] uppercase tracking-widest');

// Mobile spacing tweaks for hero
content = content.replace('pt-32 pb-20 md:pt-40 md:pb-32', 'pt-24 pb-16 md:pt-32 md:pb-24');

// Additional headings
content = content.replace(/text-5xl sm:text-7xl md:text-[8rem]/g, 'text-4xl sm:text-5xl md:text-7xl');

fs.writeFileSync(file, content);
console.log('Downsized typography successfully.');
