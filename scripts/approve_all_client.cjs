const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, updateDoc } = require('firebase/firestore');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

const firebaseConfig = {
  apiKey: 'AIzaSyAemsLgS3vxCkBeQwUKtylkz1N544moBwg',
  authDomain: 'inkfetishofficial.firebaseapp.com',
  projectId: 'inkfetishofficial',
  storageBucket: 'inkfetishofficial.firebasestorage.app',
  messagingSenderId: '147513782980',
  appId: '1:147513782980:web:dbc7e181341b2a62df0f91'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function approveAll() {
  console.log('Signing in with admin credentials...');
  const cred = await signInWithEmailAndPassword(auth, 'gunj06saksham@gmail.com', 'gunj06saksham@gmail.com.authorsite');
  console.log('Signed in successfully as:', cred.user.email, '| UID:', cred.user.uid);

  const snapshot = await getDocs(collection(db, 'author_portfolios'));
  console.log('Total author portfolios found:', snapshot.size);

  let approvedCount = 0;
  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    console.log(`Approving ID: ${docSnap.id} | Name: ${data.name || data.username || 'Unnamed'}...`);
    try {
      await updateDoc(doc(db, 'author_portfolios', docSnap.id), {
        status: 'approved',
        approved: true,
        approved_at: new Date().toISOString()
      });
      approvedCount++;
    } catch (e) {
      console.error(` -> FAILED to update ${docSnap.id}:`, e.message);
    }
  }

  console.log(`\n========================================`);
  console.log(`DONE: Approved ${approvedCount} out of ${snapshot.size} author portfolios!`);
  console.log(`========================================\n`);
  process.exit(0);
}

approveAll().catch(err => {
  console.error('Fatal Error:', err);
  process.exit(1);
});
