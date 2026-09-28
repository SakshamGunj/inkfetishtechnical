const fs = require('fs');

const data = JSON.parse(fs.readFileSync('iwl_submissions_raw.json', 'utf-8'));

let csvRows = [];
const headers = [
  'Order_ID',
  'Name',
  'Email',
  'Phone_WhatsApp',
  'Category',
  'Plan',
  'Payment_Status',
  'Created_At',
  'Updated_At',
  'Has_Submitted',
  'Sub1_Title',
  'Sub2_Title'
];

function escapeCSV(str) {
  if (str === null || str === undefined) return '""';
  const cleanStr = String(str).replace(/"/g, '""').replace(/\n/g, ' ');
  return `"${cleanStr}"`;
}

data.forEach(doc => {
  const f = doc.fields || {};
  const docId = doc.name.split('/').pop();
  const orderId = f.orderId?.stringValue || docId;
  
  if (!orderId.startsWith('iwl2_')) return; // STRICTLY SEASON 2
  
  const name = f.name?.stringValue || '';
  const email = f.email?.stringValue || '';
  const phone = f.whatsapp?.stringValue || f.phone?.stringValue || '';
  const category = f.category?.stringValue || '';
  const plan = f.plan?.integerValue || f.plan?.stringValue || '';
  const status = f.status?.stringValue || '';
  
  const createdAt = doc.createTime || '';
  const updatedAt = f.updatedAt?.stringValue || doc.updateTime || '';
  
  let sub1Title = '';
  let sub2Title = '';
  let hasSubmitted = 'No';
  
  if (f.submission1?.mapValue?.fields) {
    const s1 = f.submission1.mapValue.fields;
    sub1Title = s1.title?.stringValue?.trim() || '';
    if (sub1Title || s1.content?.stringValue?.trim()) hasSubmitted = 'Yes';
  } else if (f.submission_1_title?.stringValue || f.submission_1_content?.stringValue) {
    sub1Title = f.submission_1_title?.stringValue || 'Untitled';
    hasSubmitted = 'Yes';
  }
  
  if (f.submission2?.mapValue?.fields) {
    const s2 = f.submission2.mapValue.fields;
    sub2Title = s2.title?.stringValue?.trim() || '';
    if (sub2Title || s2.content?.stringValue?.trim()) hasSubmitted = 'Yes';
  } else if (f.submission_2_title?.stringValue || f.submission_2_content?.stringValue) {
    sub2Title = f.submission_2_title?.stringValue || 'Untitled';
    hasSubmitted = 'Yes';
  }

  const row = [
    orderId,
    name,
    email,
    phone,
    category,
    plan,
    status,
    createdAt,
    updatedAt,
    hasSubmitted,
    sub1Title,
    sub2Title
  ].map(escapeCSV).join(',');

  csvRows.push(row);
});

fs.writeFileSync('iwl_season_2_all_data.csv', headers.join(',') + '\n' + csvRows.join('\n'));
console.log(`Generated iwl_season_2_all_data.csv with ${csvRows.length} records.`);
