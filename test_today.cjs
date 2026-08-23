const fs = require('fs');
fetch('https://firestore.googleapis.com/v1/projects/inkfetishofficial/databases/(default)/documents/author_portfolios?pageSize=1000')
  .then(r => r.json())
  .then(data => {
     const docs = data.documents || [];
     const today = docs.filter(d => new Date(d.createTime) > new Date(Date.now() - 24 * 60 * 60 * 1000));
     console.log(`Added today: ${today.length}`);
     today.forEach(d => console.log(d.name.split('/').pop(), d.fields.name?.stringValue, d.createTime));
  })
  .catch(console.error);
