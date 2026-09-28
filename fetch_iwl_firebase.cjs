const fs = require('fs');

async function fetchAll() {
  let allDocs = [];
  let nextPageToken = null;
  const baseUrl = 'https://firestore.googleapis.com/v1/projects/inkfetishofficial/databases/(default)/documents/iwl_submissions';
  
  do {
    let url = baseUrl + '?pageSize=300';
    if (nextPageToken) {
      url += '&pageToken=' + encodeURIComponent(nextPageToken);
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      console.error('Fetch failed:', await response.text());
      break;
    }
    
    const data = await response.json();
    if (data.documents) {
      allDocs.push(...data.documents);
    }
    nextPageToken = data.nextPageToken;
    console.log(`Fetched ${data.documents ? data.documents.length : 0} docs...`);
  } while (nextPageToken);
  
  fs.writeFileSync('iwl_submissions_raw.json', JSON.stringify(allDocs, null, 2));
  console.log(`Total documents fetched: ${allDocs.length}`);
}

fetchAll().catch(console.error);
