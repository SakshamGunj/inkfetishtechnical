const fs = require('fs');
const data = JSON.parse(fs.readFileSync('iwl_submissions_raw.json', 'utf-8'));

let results = [];

data.forEach(doc => {
  if (!doc.fields) return;
  const f = doc.fields;
  
  const oId = (f.orderId && f.orderId.stringValue) || doc.name.split('/').pop();
  if (!oId.startsWith('iwl2_')) {
    return;
  }
  
  const name = f.name?.stringValue || 'N/A';
  const email = f.email?.stringValue || 'N/A';
  const whatsapp = f.whatsapp?.stringValue || f.phone?.stringValue || 'N/A';
  
  let dateSubmitted = f.updatedAt?.stringValue || doc.updateTime || 'N/A';
  
  if (dateSubmitted !== 'N/A') {
      try {
          const d = new Date(dateSubmitted);
          // Format as DD MMM YYYY, HH:MM
          dateSubmitted = d.toLocaleString('en-GB', { 
              day: 'numeric', month: 'short', year: 'numeric',
              hour: '2-digit', minute: '2-digit'
          });
      } catch(e) {}
  }
  
  let count = 0;
  
  if (f.submission1?.mapValue?.fields) {
    const s1 = f.submission1.mapValue.fields;
    const title = s1.title?.stringValue?.trim() || '';
    const content = s1.content?.stringValue?.trim() || '';
    if (title || content) count++;
  }
  
  if (f.submission2?.mapValue?.fields) {
    const s2 = f.submission2.mapValue.fields;
    const title = s2.title?.stringValue?.trim() || '';
    const content = s2.content?.stringValue?.trim() || '';
    if (title || content) count++;
  }
  
  if (f.submission_1_title?.stringValue || f.submission_1_content?.stringValue) count++;
  if (f.submission_2_title?.stringValue || f.submission_2_content?.stringValue) count++;
  
  if (count > 2) count = 2;
  
  if (count > 0) {
    results.push({ name, email, whatsapp, count, dateSubmitted, timestamp: new Date(f.updatedAt?.stringValue || doc.updateTime).getTime() });
  }
});

// Remove duplicates based on email (keep the highest count / latest submission)
const uniqueMap = new Map();
results.forEach(r => {
  const existing = uniqueMap.get(r.email);
  if (!existing || r.count > existing.count || (r.count === existing.count && r.timestamp > existing.timestamp)) {
    uniqueMap.set(r.email, r);
  }
});

const uniqueResults = Array.from(uniqueMap.values());

// Sort by date submitted
uniqueResults.sort((a, b) => a.timestamp - b.timestamp);

// Create CSV
const csvHeader = 'Name,Email,Phone,SubmissionCount,SubmissionDate\n';
const csvRows = uniqueResults.map(r => `"${r.name}","${r.email}","${r.whatsapp}",${r.count},"${r.dateSubmitted}"`).join('\n');

fs.writeFileSync('iwl_season_2_submitted_writers.csv', csvHeader + csvRows);

// Create Markdown
let md = '# IWL Season 2 - Submitted Writers\n\n';
md += '| Name | Email | Phone | Submissions | Date Submitted |\n';
md += '|---|---|---|---|---|\n';

uniqueResults.forEach(r => {
    md += `| ${r.name} | ${r.email} | ${r.whatsapp} | ${r.count} | ${r.dateSubmitted} |\n`;
});

fs.writeFileSync('/Users/sakshamgunj/.gemini/antigravity/brain/6737a84e-5660-4dcb-b11e-d156b8cd4445/iwl_season_2_submitted_writers.md', md);
console.log(`Found ${uniqueResults.length} unique Season 2 writers with at least one submission.`);
