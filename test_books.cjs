const fs = require('fs');
fetch('https://firestore.googleapis.com/v1/projects/inkfetishofficial/databases/(default)/documents/author_books?pageSize=1000')
  .then(r => r.json())
  .then(data => {
     const docs = data.documents || [];
     console.log(`Books found: ${docs.length}`);
     
     const authorIds = new Set();
     docs.forEach(d => {
        if (d.fields.author_id) {
            authorIds.add(d.fields.author_id.stringValue);
        }
     });
     
     console.log(`Authors with books: ${Array.from(authorIds).join(', ')}`);
  })
  .catch(console.error);
