const fs = require('fs');
fetch('https://firestore.googleapis.com/v1/projects/inkfetishofficial/databases/(default)/documents/author_portfolios?pageSize=1000')
  .then(r => r.json())
  .then(data => {
     const docs = data.documents || [];
     const sorted = docs.sort((a,b) => new Date(b.createTime) - new Date(a.createTime));
     sorted.slice(0, 10).forEach(d => console.log(d.createTime, d.name.split('/').pop(), d.fields.name?.stringValue));
  })
  .catch(console.error);
