const fs = require('fs');

const data = JSON.parse(fs.readFileSync('iwl_submissions_raw.json', 'utf-8'));

let results = [];

data.forEach(doc => {
  if (!doc.fields) return;
  const f = doc.fields;
  
  // Extract orderId which must contain iwl2_ to be season 2
  const orderId = f.orderId?.stringValue || doc.name;
  if (!orderId.includes('iwl2_')) {
    return; // Skip if not season 2
  }
  
  const name = f.name?.stringValue || 'N/A';
  const email = f.email?.stringValue || 'N/A';
  const whatsapp = f.whatsapp?.stringValue || f.phone?.stringValue || 'N/A';
  
  // Try to find the date
  let dateSubmitted = f.updatedAt?.stringValue || doc.updateTime || 'N/A';
  
  // Clean up date format if possible (e.g. 2026-08-23T15:30:31.166Z -> 2026-08-23)
  if (dateSubmitted !== 'N/A') {
      try {
          const d = new Date(dateSubmitted);
          dateSubmitted = d.toISOString().split('T')[0] + ' ' + d.toTimeString().split(' ')[0];
      } catch(e) {}
  }
  
  let count = 0;
  
  // Check submission 1
  if (f.submission1?.mapValue?.fields) {
    const s1 = f.submission1.mapValue.fields;
    const title = s1.title?.stringValue?.trim() || '';
    const content = s1.content?.stringValue?.trim() || '';
    if (title || content) count++;
  }
  
  // Check submission 2
  if (f.submission2?.mapValue?.fields) {
    const s2 = f.submission2.mapValue.fields;
    const title = s2.title?.stringValue?.trim() || '';
    const content = s2.content?.stringValue?.trim() || '';
    if (title || content) count++;
  }
  
  // Alternative fields
  if (f.submission_1_title?.stringValue || f.submission_1_content?.stringValue) count++;
  if (f.submission_2_title?.stringValue || f.submission_2_content?.stringValue) count++;
  
  if (count > 2) count = 2;
  
  if (count > 0) {
    results.push({ name, email, whatsapp, count, dateSubmitted });
  }
});

// Remove duplicates based on email (keep the highest count)
const uniqueMap = new Map();
results.forEach(r => {
  const existing = uniqueMap.get(r.email);
  if (!existing || r.count > existing.count) {
    uniqueMap.set(r.email, r);
  }
});

const uniqueResults = Array.from(uniqueMap.values());

// Create CSV
const csvHeader = 'Name,Email,Phone,SubmissionCount,SubmissionDate\n';
const csvRows = uniqueResults.map(r => `"${r.name}","${r.email}","${r.whatsapp}",${r.count},"${r.dateSubmitted}"`).join('\n');

fs.writeFileSync('iwl_season_2_submitted_writers.csv', csvHeader + csvRows);
console.log(`Found ${uniqueResults.length} unique Season 2 writers with at least one submission.`);
