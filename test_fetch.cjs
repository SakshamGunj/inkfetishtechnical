const fs = require('fs');
fetch('https://firestore.googleapis.com/v1/projects/inkfetishofficial/databases/(default)/documents/author_portfolios?pageSize=1000')
  .then(r => r.json())
  .then(data => {
     const docs = data.documents || [];
     const adminAdded = docs.filter(d => !d.fields.uid);
     const portfolioAdded = docs.filter(d => d.fields.uid);
     console.log(`Total: ${docs.length}`);
     console.log(`Admin Added (no uid): ${adminAdded.length}`);
     console.log(`Portfolio Added (has uid): ${portfolioAdded.length}`);
     console.log('Admin Added names:');
     adminAdded.forEach(d => console.log(d.fields.name?.stringValue || 'Unknown'));
  })
  .catch(console.error);
