const fs = require('fs');
fetch('https://firestore.googleapis.com/v1/projects/inkfetishofficial/databases/(default)/documents/author_portfolios?pageSize=1000')
  .then(r => r.json())
  .then(data => {
     const docs = data.documents || [];
     const lengths = {};
     docs.forEach(d => {
        const id = d.name.split('/').pop();
        lengths[id.length] = (lengths[id.length] || 0) + 1;
     });
     console.log('ID lengths distribution:');
     console.log(lengths);
  })
  .catch(console.error);
