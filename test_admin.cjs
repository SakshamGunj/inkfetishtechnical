const fs = require('fs');
fetch('https://firestore.googleapis.com/v1/projects/inkfetishofficial/databases/(default)/documents/author_portfolios?pageSize=1000')
  .then(r => r.json())
  .then(data => {
     const docs = data.documents || [];
     const adminAdded = docs.filter(d => !d.fields.uid);
     console.log(JSON.stringify(adminAdded, null, 2));
  })
  .catch(console.error);
