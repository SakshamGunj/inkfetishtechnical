const fs = require('fs');

const file = 'src/app/shakespeare-award-v2/ShakespeareAwardClient.tsx';
let content = fs.readFileSync(file, 'utf8');

const newHeroSection = fs.readFileSync('/tmp/new_hero_section.txt', 'utf8');

// Replace from the start of the hero section comment to the end of </section>
const heroStart = `      {/* --- SECTION 1: HERO OUTCOME & PROOF --- */}`;
const heroEnd = `      </section>\n\n      {/* --- SECTION 1.5:`;

const startIdx = content.indexOf(heroStart);
const endIdx = content.indexOf(heroEnd);

if (startIdx === -1 || endIdx === -1) {
  // Try alternate names
  console.log('Start found:', content.indexOf('SECTION 1: HERO'));
  console.log('End found:', endIdx);
  process.exit(1);
}

content = content.slice(0, startIdx) + newHeroSection + '\n\n      {/* --- SECTION 1.5:' + content.slice(endIdx + heroEnd.length);

fs.writeFileSync(file, content);
console.log('Hero section replaced successfully!');
