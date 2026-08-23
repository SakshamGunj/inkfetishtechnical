const fs = require('fs');
fetch('https://firestore.googleapis.com/v1/projects/inkfetishofficial/databases/(default)/documents/author_portfolios?pageSize=1000')
  .then(r => r.json())
  .then(data => {
     const docs = data.documents || [];
     const withPhone = docs.filter(d => d.fields.phone);
     console.log(`With phone: ${withPhone.length}`);
     withPhone.forEach(d => console.log(d.fields.name?.stringValue, d.fields.phone?.stringValue, !d.fields.uid ? '(NO UID)' : ''));
  })
  .catch(console.error);
