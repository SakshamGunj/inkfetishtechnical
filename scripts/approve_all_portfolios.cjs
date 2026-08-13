const admin = require('firebase-admin');
const fs = require('fs');

let serviceAccount;
if (fs.existsSync('/Users/sakshamgunj/Downloads/inkfetishofficial-firebase-adminsdk-fbsvc-781873c6ce.json')) {
    serviceAccount = require('/Users/sakshamgunj/Downloads/inkfetishofficial-firebase-adminsdk-fbsvc-781873c6ce.json');
} else if (fs.existsSync('./serviceAccountKey.json')) {
    serviceAccount = require('./serviceAccountKey.json');
} else {
    throw new Error('No service account key found.');
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function approveAll() {
    console.log('Fetching all author portfolios from Firestore using Admin SDK...');
    const snapshot = await db.collection('author_portfolios').get();
    console.log(`Total portfolios found in database: ${snapshot.size}`);

    let approvedCount = 0;
    const batchSize = 100;
    let batch = db.batch();
    let countInBatch = 0;

    for (const docSnap of snapshot.docs) {
        const data = docSnap.data();
        console.log(`[APPROVING] ID: ${docSnap.id} | Name: "${data.name || data.username || 'Unnamed'}" | Previous Status: ${data.status}`);

        const docRef = db.collection('author_portfolios').doc(docSnap.id);
        batch.set(docRef, {
            status: 'approved',
            approved: true,
            approved_at: new Date().toISOString()
        }, { merge: true });

        approvedCount++;
        countInBatch++;

        if (countInBatch >= batchSize) {
            await batch.commit();
            console.log(`Committed batch of ${countInBatch} documents.`);
            batch = db.batch();
            countInBatch = 0;
        }
    }

    if (countInBatch > 0) {
        await batch.commit();
        console.log(`Committed final batch of ${countInBatch} documents.`);
    }

    console.log('\n==================================================');
    console.log(`SUCCESS: Approved ALL ${approvedCount} author portfolios!`);
    console.log('==================================================\n');
    process.exit(0);
}

approveAll().catch((err) => {
    console.error('Error executing admin approval script:', err);
    process.exit(1);
});
