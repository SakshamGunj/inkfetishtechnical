const fs = require('fs');
const file = 'src/app/shakespeare-award-v2/ShakespeareAwardClient.tsx';
let content = fs.readFileSync(file, 'utf8');

// The Ultimate Reward (h3)
content = content.replace('text-4xl md:text-5xl lg:text-7xl', 'text-3xl md:text-4xl lg:text-5xl');

// The big numbers (10, 100%, 150)
content = content.replace(/text-5xl sm:text-5xl sm:text-\[5rem\] md:text-\[7rem\]/g, 'text-4xl sm:text-5xl md:text-6xl');

// The section H3 headings (Season 1 Was a Promise, Every Poet Walks Away, 200 Is the Limit, Why This Award)
content = content.replace(/text-2xl sm:text-4xl md:text-6xl/g, 'text-2xl sm:text-3xl md:text-4xl');
content = content.replace(/text-xl sm:text-xl sm:text-3xl md:text-5xl/g, 'text-xl sm:text-2xl md:text-3xl');

// The large side keywords (Cred-ibility, Leg-acy, etc)
content = content.replace(/text-\[3\.5rem\] md:text-\[5rem\]/g, 'text-4xl md:text-5xl');

// The publisher behind the award (We Make Books)
content = content.replace(/text-3xl sm:text-4xl md:text-5xl/g, 'text-2xl sm:text-3xl md:text-4xl');

// The final closer
content = content.replace(/text-3xl sm:text-5xl md:text-6xl/g, 'text-2xl sm:text-3xl md:text-4xl');

// Ask Every Question
content = content.replace(/text-3xl md:text-4xl/g, 'text-2xl md:text-3xl');

// Simple, Transparent
content = content.replace(/text-3xl sm:text-5xl/g, 'text-2xl sm:text-3xl');

fs.writeFileSync(file, content);
console.log('Downsized all remaining large headings successfully.');
