import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(readFileSync('./serviceAccountKey.json', 'utf8'));

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function run() {
  const snapshot = await db.collection('author_portfolios').get();
  const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log(`Found ${docs.length} authors.`);
  console.log(docs.slice(0, 5));
}
run();
