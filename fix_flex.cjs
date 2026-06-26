const fs = require('fs');
const file = 'src/app/shakespeare-award-v2/register/RegisterClient.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-16 items-start"/, 'className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-6 lg:gap-16 items-start"');

fs.writeFileSync(file, content);
console.log('Flex reversed successfully.');
