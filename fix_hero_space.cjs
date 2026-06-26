const fs = require('fs');
const file = 'src/app/shakespeare-award-v2/ShakespeareAwardClient.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Reduce top section padding - py-20 → pt-6 pb-12 on mobile
content = content.replace(
  'className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20 lg:py-0"',
  'className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-6 pb-10 lg:py-0"'
);

// 2. Reduce eyebrow margin
content = content.replace(
  'className="mb-6 flex items-center gap-3"',
  'className="mb-3 flex items-center gap-3"'
);

// 3. Reduce honor badge margin
content = content.replace(
  'className="mb-6 inline-flex items-center gap-2.5 bg-[#1A1613] border border-gold/30',
  'className="mb-4 inline-flex items-center gap-2.5 bg-[#1A1613] border border-gold/30'
);

// 4. Reduce h1 bottom margin
content = content.replace(
  'className="font-serif font-black leading-[1.05] tracking-tight mb-6 w-full"',
  'className="font-serif font-black leading-[1.05] tracking-tight mb-4 w-full"'
);

// 5. Reduce live badge margin-bottom
content = content.replace(
  'className="flex items-center gap-3 mb-8 w-max mx-auto lg:mx-0 border border-gold/40',
  'className="flex items-center gap-3 mb-5 w-max mx-auto lg:mx-0 border border-gold/40'
);

// 6. Increase image size on mobile: w-[260px] sm:w-[300px] md:w-[340px] → w-[310px] sm:w-[340px] md:w-[380px]
content = content.replace(
  'w-[260px] sm:w-[300px] md:w-[340px] lg:w-full lg:max-w-[480px]',
  'w-[310px] sm:w-[360px] md:w-[400px] lg:w-full lg:max-w-[520px]'
);

// 7. Reduce image section top margin on mobile
content = content.replace(
  'order-2 lg:order-2 mt-6 mb-8 lg:my-0',
  'order-2 lg:order-2 mt-4 mb-6 lg:my-0'
);

fs.writeFileSync(file, content);
console.log('Fixed spacing and image size.');
