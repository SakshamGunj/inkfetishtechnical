const fs = require('fs');
const files = [
  'src/pages/Index.tsx',
  'src/pages/AuthorsDirectory.tsx',
  'src/pages/Catalog.tsx',
  'src/pages/Services.tsx',
  'src/pages/Contact.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Update footer logo
  content = content.replace(
    /<div className="flex items-center gap-3 mb-6">[\s\S]*?<img src="\/images\/inkfetish_logo.png" alt="Inkfetish" className="h-8 opacity-90 filter grayscale" \/>[\s\S]*?<div className="h-4 w-px bg-ink-900\/20"><\/div>[\s\S]*?<span className="font-serif font-bold tracking-widest text-ink-900 text-sm">INKFETISH<\/span>[\s\S]*?<\/div>/g,
    `<div className="flex items-center justify-center mb-6">
              <img src="/images/inkfetish_logo.png" alt="Inkfetish" className="h-16 w-auto object-contain" />
            </div>`
  );
  fs.writeFileSync(file, content);
  console.log(`Updated footer in ${file}`);
});
