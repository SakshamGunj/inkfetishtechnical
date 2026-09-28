const fs = require('fs');
const data = fs.readFileSync('iwl_season_2_submitted_writers.csv', 'utf-8').split('\n').filter(Boolean);

let md = '# IWL Season 2 - Submitted Writers\n\n';
md += '| Name | Email | Phone | Submissions |\n';
md += '|---|---|---|---|\n';

for (let i = 1; i < data.length; i++) {
  // Regex to parse CSV safely
  const match = data[i].match(/^"([^"]+)","([^"]+)","([^"]+)",(\d+)$/);
  if (match) {
    const [, name, email, phone, count] = match;
    md += `| ${name} | ${email} | ${phone} | ${count} |\n`;
  } else {
      // Fallback
      const parts = data[i].split(',');
      md += `| ${parts[0]} | ${parts[1]} | ${parts[2]} | ${parts[3]} |\n`;
  }
}

fs.writeFileSync('/Users/sakshamgunj/.gemini/antigravity/brain/6737a84e-5660-4dcb-b11e-d156b8cd4445/iwl_season_2_submitted_writers.md', md);
