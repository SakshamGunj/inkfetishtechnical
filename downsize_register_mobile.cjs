const fs = require('fs');
const file = 'src/app/shakespeare-award-v2/register/RegisterClient.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/text-2xl sm:text-3xl/g, 'text-xl sm:text-2xl');
content = content.replace(/text-xl sm:text-2xl/g, 'text-lg sm:text-xl');

fs.writeFileSync(file, content);
console.log('Downsized register mobile headings successfully.');
