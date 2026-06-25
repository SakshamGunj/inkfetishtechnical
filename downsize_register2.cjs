const fs = require('fs');
const file = 'src/app/shakespeare-award-v2/register/RegisterClient.tsx';
let content = fs.readFileSync(file, 'utf8');

// Tighten padding on the form
content = content.replace('p-5 sm:p-8', 'p-4 sm:p-6'); // Form padding
content = content.replace('p-5 sm:p-8 relative', 'p-5 sm:p-6 relative'); // Order summary padding

// Tighten the Order summary book title
content = content.replace('text-lg leading-tight', 'text-base leading-tight');

// Shrink the total price from 3xl to 2xl
content = content.replace('text-3xl font-serif font-black text-gold', 'text-2xl font-serif font-black text-gold');

// Shrink the success page
content = content.replace('text-3xl sm:text-5xl', 'text-2xl sm:text-4xl');
content = content.replace('w-20 h-20', 'w-16 h-16');
content = content.replace('w-10 h-10', 'w-8 h-8');

fs.writeFileSync(file, content);
console.log('Tightened Register page UI further');
