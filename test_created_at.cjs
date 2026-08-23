const fs = require('fs');
fetch('https://firestore.googleapis.com/v1/projects/inkfetishofficial/databases/(default)/documents/author_portfolios?pageSize=1000')
  .then(r => r.json())
  .then(data => {
     const docs = data.documents || [];
     const stringDates = docs.filter(d => d.fields.created_at && d.fields.created_at.stringValue);
     const tsDates = docs.filter(d => d.fields.created_at && d.fields.created_at.timestampValue);
     const noDates = docs.filter(d => !d.fields.created_at);
     console.log(`String created_at: ${stringDates.length}`);
     console.log(`Timestamp created_at: ${tsDates.length}`);
     console.log(`No created_at: ${noDates.length}`);
     
     if (stringDates.length > 0) {
       console.log('Names of string created_at:');
       stringDates.forEach(d => console.log(d.fields.name?.stringValue, d.name.split('/').pop()));
     }
  })
  .catch(console.error);
