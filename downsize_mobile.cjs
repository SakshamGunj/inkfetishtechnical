const fs = require('fs');
const file = 'src/app/shakespeare-award-v2/ShakespeareAwardClient.tsx';
let content = fs.readFileSync(file, 'utf8');

// Hero mobile fonts
content = content.replace('text-[2rem] sm:text-3xl', 'text-2xl sm:text-3xl');
content = content.replace('text-xl sm:text-2xl md:text-3xl', 'text-lg sm:text-xl md:text-2xl');
content = content.replace('text-2xl sm:text-3xl md:text-4xl drop-shadow', 'text-xl sm:text-2xl md:text-3xl drop-shadow');

// Guarantee section fonts
content = content.replace(/text-\[15px\]/g, 'text-[14px]');
content = content.replace(/text-sm leading-relaxed/g, 'text-[13px] leading-relaxed');

// Section Titles
content = content.replace(/text-2xl sm:text-3xl/g, 'text-xl sm:text-2xl');
content = content.replace(/text-3xl md:text-4xl/g, 'text-2xl md:text-3xl');
content = content.replace(/text-4xl md:text-5xl/g, 'text-3xl md:text-4xl');
content = content.replace(/text-2xl sm:text-4xl/g, 'text-xl sm:text-2xl'); // Why this matters
content = content.replace(/text-xl sm:text-2xl md:text-3xl/g, 'text-lg sm:text-xl md:text-2xl');

// The big numbers
content = content.replace(/text-4xl sm:text-5xl/g, 'text-3xl sm:text-4xl');
content = content.replace(/text-\[5rem\]/g, 'text-5xl');

// Testimonials/Cards
content = content.replace(/text-xl sm:text-2xl font-serif/g, 'text-lg sm:text-xl font-serif');
content = content.replace(/text-lg font-serif/g, 'text-base font-serif');

// Paragraphs
// Already text-[13px] sm:text-sm for the most part, let's keep it but ensure readability.

fs.writeFileSync(file, content);
console.log('Downsized mobile headings successfully.');
