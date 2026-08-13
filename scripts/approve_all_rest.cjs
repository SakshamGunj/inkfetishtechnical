const FIREBASE_API_KEY = 'AIzaSyAemsLgS3vxCkBeQwUKtylkz1N544moBwg';
const PROJECT_ID = 'inkfetishofficial';

async function approveSinglePortfolio(docItem) {
  const pathParts = docItem.name.split('/');
  const docId = pathParts[pathParts.length - 1];
  const fields = docItem.fields || {};

  const name = fields.name?.stringValue || fields.username?.stringValue || docId;
  const email = fields.email?.stringValue || '';
  const authPass = fields.auth_pass?.stringValue || '';

  console.log(`Processing ID: ${docId} | Name: "${name}" | Email: "${email}"`);

  let token = '';
  const candidatePasses = [
    authPass,
    email ? `${email}.authorsite` : '',
    'gunj06saksham@gmail.com.authorsite'
  ].filter(Boolean);

  if (email) {
    for (const pass of candidatePasses) {
      try {
        const authRes = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password: pass, returnSecureToken: true })
        });
        const authData = await authRes.json();
        if (authData.idToken) {
          token = authData.idToken;
          break;
        }
      } catch (e) {}
    }
  }

  if (!token) {
    try {
      const adminRes = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'gunj06saksham@gmail.com', password: 'gunj06saksham@gmail.com.authorsite', returnSecureToken: true })
      });
      const adminData = await adminRes.json();
      if (adminData.idToken) {
        token = adminData.idToken;
      }
    } catch (e) {}
  }

  if (!token) {
    console.error(` -> SKIP: Could not acquire token for ${docId}`);
    return false;
  }

  const patchUrl = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/author_portfolios/${encodeURIComponent(docId)}?updateMask.fieldPaths=status&updateMask.fieldPaths=approved&updateMask.fieldPaths=approved_at`;

  const patchRes = await fetch(patchUrl, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fields: {
        ...fields,
        status: { stringValue: 'approved' },
        approved: { booleanValue: true },
        approved_at: { stringValue: new Date().toISOString() }
      }
    })
  });

  if (patchRes.ok) {
    console.log(` -> APPROVED SUCCESSFULLY: ${docId} (${name})`);
    return true;
  } else {
    const errData = await patchRes.json();
    console.error(` -> PATCH ERROR ${docId}:`, errData.error?.message || patchRes.statusText);
    return false;
  }
}

async function run() {
  console.log('Fetching list of all author portfolios via Firestore REST API...');
  let nextPageToken = '';
  let totalApproved = 0;
  let totalProcessed = 0;

  do {
    const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/author_portfolios?pageSize=300${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;
    const res = await fetch(url);
    if (!res.ok) {
      console.error('Failed to list documents:', res.statusText);
      break;
    }
    const data = await res.json();
    const documents = data.documents || [];
    nextPageToken = data.nextPageToken || '';

    console.log(`Retrieved ${documents.length} documents in batch...`);

    for (const docItem of documents) {
      totalProcessed++;
      const success = await approveSinglePortfolio(docItem);
      if (success) totalApproved++;
    }
  } while (nextPageToken);

  console.log(`\n==================================================`);
  console.log(`COMPLETED: Processed ${totalProcessed} portfolios. Approved ${totalApproved} portfolios!`);
  console.log(`==================================================\n`);
  process.exit(0);
}

run().catch((err) => {
  console.error('Fatal Error:', err);
  process.exit(1);
});
