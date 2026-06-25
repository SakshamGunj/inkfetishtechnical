const fs = require('fs');
const file = 'src/app/shakespeare-award-v2/register/RegisterClient.tsx';
let content = fs.readFileSync(file, 'utf8');

// The main page background
content = content.replace(/bg-\[\#030303\]/g, 'bg-[#14100C]');

// Form boxes / headers
content = content.replace(/bg-\[\#050505\]/g, 'bg-[#1A1613]');

// Inputs and summary box
content = content.replace(/bg-\[\#0a0a0a\]/g, 'bg-[#14100C]');

// Button hover effect
content = content.replace(/hover:bg-\[\#e6c175\]/g, 'hover:bg-[#ebd298]');

// Also update the button gradient to match the landing page CTA
content = content.replace(/bg-gold hover:bg-\[\#ebd298\] text-black/g, 'bg-gradient-to-b from-[#ebd298] to-[#c5a059] hover:from-[#fdfbf7] hover:to-[#ebd298] text-[#14100C]');

fs.writeFileSync(file, content);
console.log('Fixed colors successfully.');
