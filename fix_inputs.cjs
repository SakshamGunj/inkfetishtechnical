const fs = require('fs');
const file = 'src/app/shakespeare-award-v2/register/RegisterClient.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace standard input styles
content = content.replace(/bg-\[\#14100C\] border border-gold\/20 p-4 text-\[\#fdfbf7\] placeholder-ink-600/g, 'bg-[#FDFBF7] border border-gold/40 p-4 text-black placeholder-black/50 font-medium shadow-inner');

// Replace whatsapp input styles specifically (which has pl-12)
content = content.replace(/bg-\[\#14100C\] border border-gold\/20 p-4 pl-12 text-\[\#fdfbf7\] placeholder-ink-600/g, 'bg-[#FDFBF7] border border-gold/40 p-4 pl-12 text-black placeholder-black/50 font-medium shadow-inner');

// Fix the +91 text color to be visible on white
content = content.replace(/className="absolute left-4 text-\[\#fdfbf7\] font-bold"/g, 'className="absolute left-4 text-black/60 font-bold"');

// Fix the dropdown select text-ink-600 for the first disabled option
content = content.replace(/className="text-ink-600"/g, 'className="text-black/50"');

// Remove "The Iron-Clad Guarantee" text
content = content.replace(/<h4 className="text-sm font-bold text-white mb-1">The Iron-Clad Guarantee<\/h4>\s*/g, '');

fs.writeFileSync(file, content);
console.log('Fixed inputs successfully.');
