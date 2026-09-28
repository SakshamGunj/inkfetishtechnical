const fs = require('fs');

const data = fs.readFileSync('all_iwl_data_complete.csv', 'utf-8').split('\n').filter(Boolean);

let md = '# All IWL Data (Complete Database)\n\n';
md += '| Order ID | Name | Email | Phone | Plan | Status | Created At | Has Submitted |\n';
md += '|---|---|---|---|---|---|---|---|\n';

for (let i = 1; i < data.length; i++) {
  const line = data[i];
  
  // Custom CSV parser to handle quotes
  const parts = [];
  let current = '';
  let inQuotes = false;
  
  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    if (char === '"' && line[j+1] === '"') {
      current += '"';
      j++; // skip escaped quote
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      parts.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  parts.push(current);
  
  if (parts.length >= 13) {
    // Indexes: 
    // 0: Document_ID, 1: Order_ID, 2: Name, 3: Email, 4: Phone_WhatsApp, 
    // 5: Category, 6: Plan, 7: Payment_Status, 8: Created_At, 9: Updated_At, 
    // 10: Has_Submitted, 11: Sub1_Title, 12: Sub2_Title
    
    const orderId = parts[1] || 'N/A';
    const name = parts[2] || 'N/A';
    const email = parts[3] || 'N/A';
    const phone = parts[4] || 'N/A';
    const plan = parts[6] || 'N/A';
    const status = parts[7] || 'N/A';
    
    let createdAt = parts[8] || parts[9] || 'N/A';
    if (createdAt !== 'N/A') {
        try {
            const d = new Date(createdAt);
            if (!isNaN(d)) {
                createdAt = d.toISOString().split('T')[0];
            }
        } catch(e) {}
    }
    
    const hasSubmitted = parts[10] || 'No';
    
    md += `| ${orderId} | ${name} | ${email} | ${phone} | ${plan} | ${status} | ${createdAt} | ${hasSubmitted} |\n`;
  }
}

fs.writeFileSync('/Users/sakshamgunj/.gemini/antigravity/brain/6737a84e-5660-4dcb-b11e-d156b8cd4445/all_iwl_data_complete.md', md);
