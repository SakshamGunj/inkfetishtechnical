const fs = require('fs');
fetch('https://firestore.googleapis.com/v1/projects/inkfetishofficial/databases/(default)/documents/author_portfolios?pageSize=1000')
  .then(r => r.json())
  .then(data => {
     const docs = data.documents || [];
     const adminAdded = docs.filter(d => {
        const id = d.name.split('/').pop();
        return id.length === 20;
     });
     console.log(`Docs with 20-char IDs: ${adminAdded.length}`);
     adminAdded.forEach(d => console.log(d.name.split('/').pop(), d.fields.name?.stringValue));
  })
  .catch(console.error);
