const fs = require('fs');
const file = 'src/app/shakespeare-award-v2/register/RegisterClient.tsx';
let content = fs.readFileSync(file, 'utf8');

// Title
content = content.replace('text-3xl sm:text-4xl md:text-5xl', 'text-2xl sm:text-3xl md:text-4xl');

// Inputs
content = content.replace(/py-5/g, 'py-4');
content = content.replace(/text-sm sm:text-base/g, 'text-sm');

// Left Column headings
content = content.replace(/text-4xl/g, 'text-3xl');
content = content.replace(/text-2xl/g, 'text-xl');

// Order summary text
content = content.replace(/text-base sm:text-lg/g, 'text-sm sm:text-base');

fs.writeFileSync(file, content);
console.log('Downsized register typography successfully.');
