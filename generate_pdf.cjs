const fs = require('fs');
const PDFDocument = require('pdfkit');

const data = JSON.parse(fs.readFileSync('iwl_submissions_raw.json', 'utf-8'));

const doc = new PDFDocument({ autoFirstPage: true });
doc.pipe(fs.createWriteStream('IWL_All_Submissions_Detailed.pdf'));

doc.fontSize(20).text('IWL Submissions - Complete Report', { align: 'center' });
doc.moveDown(2);

data.forEach((entry, index) => {
  const f = entry.fields || {};
  const orderId = f.orderId?.stringValue || entry.name.split('/').pop();
  
  // Only process if they actually submitted something, or wait, user said "all details like... and their entry"
  // Let's include everyone, but especially show their entries if they have them.
  
  const name = f.name?.stringValue || 'N/A';
  const email = f.email?.stringValue || 'N/A';
  const phone = f.whatsapp?.stringValue || f.phone?.stringValue || 'N/A';
  const plan = f.plan?.integerValue || f.plan?.stringValue || 'N/A';
  const category = f.category?.stringValue || 'N/A';
  const status = f.status?.stringValue || 'N/A';
  
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
  
  // Add a new page for each person to keep it clean, except the very first one where we just move down
  if (index > 0) doc.addPage();
  
  doc.fontSize(16).fillColor('blue').text(`Writer: ${name}`);
  doc.fillColor('black').fontSize(12).moveDown(0.5);
  doc.text(`Email: ${email}`);
  doc.text(`Phone/WhatsApp: ${phone}`);
  doc.text(`Paid Amount (Plan): Rs ${plan}`);
  doc.text(`Category: ${category}`);
  doc.text(`Status: ${status}`);
  doc.text(`Order ID: ${orderId}`);
  doc.moveDown(1);
  
  if (sub1Content || sub1Title) {
      doc.fontSize(14).fillColor('darkred').text(`Entry 1: ${sub1Title || 'Untitled'}`);
      doc.fillColor('black').fontSize(11).moveDown(0.5);
      doc.text(sub1Content || 'No content provided.');
      doc.moveDown(1);
  } else {
      doc.fontSize(12).fillColor('gray').text(`Entry 1: Not submitted`);
      doc.fillColor('black').moveDown(1);
  }
  
  if (sub2Content || sub2Title) {
      doc.fontSize(14).fillColor('darkred').text(`Entry 2: ${sub2Title || 'Untitled'}`);
      doc.fillColor('black').fontSize(11).moveDown(0.5);
      doc.text(sub2Content || 'No content provided.');
      doc.moveDown(1);
  } else {
      // Only show entry 2 if they paid for 2 or we don't know, let's just always show if not submitted
      if (plan === '499' || plan === '2') {
          doc.fontSize(12).fillColor('gray').text(`Entry 2: Not submitted`);
          doc.fillColor('black').moveDown(1);
      }
  }
});

doc.end();
