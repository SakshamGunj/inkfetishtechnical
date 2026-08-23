const fs = require('fs');
fetch('https://firestore.googleapis.com/v1/projects/inkfetishofficial/databases/(default)/documents/author_portfolios?pageSize=1000')
  .then(r => r.json())
  .then(data => {
     const docs = data.documents || [];
     const writers = docs.filter(d => d.fields.name?.stringValue === 'NEW WRITER');
     console.log(`NEW WRITERS count: ${writers.length}`);
     
     const others = docs.filter(d => d.fields.name?.stringValue !== 'NEW WRITER');
     console.log(`Others count: ${others.length}`);
  })
  .catch(console.error);
