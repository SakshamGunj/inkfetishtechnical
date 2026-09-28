const fs = require('fs');

const data = JSON.parse(fs.readFileSync('iwl_submissions_raw.json', 'utf-8'));

let md = '# IWL Submissions Content\n\n';

data.forEach(doc => {
  const f = doc.fields || {};
  const docId = doc.name.split('/').pop();
  const orderId = f.orderId?.stringValue || docId;
  const name = f.name?.stringValue || 'Unknown';
  const email = f.email?.stringValue || 'No Email';
  
  let sub1Title = '';
  let sub1Content = '';
  let sub2Title = '';
  let sub2Content = '';
  
  if (f.submission1?.mapValue?.fields) {
    const s1 = f.submission1.mapValue.fields;
    sub1Title = s1.title?.stringValue?.trim() || '';
    sub1Content = s1.content?.stringValue?.trim() || '';
  } else if (f.submission_1_title?.stringValue || f.submission_1_content?.stringValue) {
    sub1Title = f.submission_1_title?.stringValue || '';
    sub1Content = f.submission_1_content?.stringValue || '';
  }
  
  if (f.submission2?.mapValue?.fields) {
    const s2 = f.submission2.mapValue.fields;
    sub2Title = s2.title?.stringValue?.trim() || '';
    sub2Content = s2.content?.stringValue?.trim() || '';
  } else if (f.submission_2_title?.stringValue || f.submission_2_content?.stringValue) {
    sub2Title = f.submission_2_title?.stringValue || '';
    sub2Content = f.submission_2_content?.stringValue || '';
  }
  
  if (sub1Content || sub2Content) {
    md += `## ${name} (${email})\n`;
    md += `**Order ID:** \`${orderId}\`\n\n`;
    
    if (sub1Content) {
      md += `### Entry 1: ${sub1Title || 'Untitled'}\n`;
      md += `\`\`\`text\n${sub1Content}\n\`\`\`\n\n`;
    }
    
    if (sub2Content) {
      md += `### Entry 2: ${sub2Title || 'Untitled'}\n`;
      md += `\`\`\`text\n${sub2Content}\n\`\`\`\n\n`;
    }
    
    md += `---\n\n`;
  }
});

fs.writeFileSync('/Users/sakshamgunj/.gemini/antigravity/brain/6737a84e-5660-4dcb-b11e-d156b8cd4445/iwl_submissions_content.md', md);
