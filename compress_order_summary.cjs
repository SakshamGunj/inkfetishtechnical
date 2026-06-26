const fs = require('fs');
const file = 'src/app/shakespeare-award-v2/register/RegisterClient.tsx';
let content = fs.readFileSync(file, 'utf8');

// Container padding
content = content.replace(/className="bg-\[\#1A1613\]\/95 backdrop-blur-md border border-gold\/20 rounded-sm shadow-2xl p-6 sm:p-8 relative"/, 'className="bg-[#1A1613]/95 backdrop-blur-md border border-gold/20 rounded-sm shadow-2xl p-4 sm:p-8 relative"');

// Header
content = content.replace(/className="text-xs uppercase tracking-\[0.2em\] font-bold text-ink-400 mb-6 border-b border-white\/5 pb-4"/, 'className="text-xs uppercase tracking-[0.2em] font-bold text-ink-400 mb-4 sm:mb-6 border-b border-white/5 pb-3 sm:pb-4"');

// Book section margin
content = content.replace(/className="flex gap-4 mb-6 pb-6 border-b border-white\/5"/, 'className="flex gap-3 sm:gap-4 mb-4 pb-4 sm:mb-6 sm:pb-6 border-b border-white/5"');

// Book image size
content = content.replace(/className="w-20 h-24 bg-\[\#14100C\] border border-white\/10 shrink-0 relative overflow-hidden flex items-center justify-center"/, 'className="w-14 h-20 sm:w-20 sm:h-24 bg-[#14100C] border border-white/10 shrink-0 relative overflow-hidden flex items-center justify-center"');

// Book Title size
content = content.replace(/className="font-serif font-bold text-base leading-tight mb-1"/, 'className="font-serif font-bold text-sm sm:text-base leading-tight mb-1"');

// Lists container
content = content.replace(/<div className="space-y-4">/, '<div className="space-y-3 sm:space-y-4">');
content = content.replace(/<ul className="space-y-3">/, '<ul className="space-y-2 sm:space-y-3">');

// List item gaps (x2)
content = content.replace(/<li className="flex items-start gap-3">/g, '<li className="flex items-start gap-2 sm:gap-3">');

// Remove leading paragraph margin
content = content.replace(/<p className="text-ink-400 text-\[11px\] mt-1 leading-snug">/g, '<p className="text-ink-400 text-[11px] leading-tight mt-0.5 sm:mt-1">');

// Bottom section margin
content = content.replace(/className="mt-6 pt-6 border-t border-white\/5 space-y-2"/, 'className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/5 space-y-1 sm:space-y-2"');

fs.writeFileSync(file, content);
console.log('Order Summary compressed successfully.');
