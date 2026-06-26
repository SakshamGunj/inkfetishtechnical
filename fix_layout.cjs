const fs = require('fs');
const file = 'src/app/shakespeare-award-v2/register/RegisterClient.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Fix header size
// py-4 -> py-3 (or py-2)
content = content.replace(/className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center"/, 'className="max-w-6xl mx-auto px-4 py-2 sm:py-4 flex justify-between items-center"');
// w-8 h-8 -> w-6 h-6 sm:w-8 sm:h-8
content = content.replace(/className="w-8 h-8 bg-gold flex items-center justify-center text-black font-serif font-black text-xl"/, 'className="w-6 h-6 sm:w-8 sm:h-8 bg-gold flex items-center justify-center text-black font-serif font-black text-base sm:text-xl"');

// 2. Fix the gap between form and order summary
// Change flex-col-reverse to flex-col so Form is above Order Summary on mobile
content = content.replace(/className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 lg:gap-16 items-start"/, 'className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-16 items-start"');

// Remove mt-8 from the Order Summary container
content = content.replace(/className="lg:col-span-5 relative mt-8 lg:mt-0"/, 'className="lg:col-span-5 relative w-full"');

fs.writeFileSync(file, content);
console.log('Layout fixed successfully.');
