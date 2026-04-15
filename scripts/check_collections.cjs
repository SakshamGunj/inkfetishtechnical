const admin = require('firebase-admin');
const serviceAccount = require('/Users/sakshamgunj/Downloads/inkfetishofficial-firebase-adminsdk-fbsvc-781873c6ce.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

async function check() {
    // Check shakespeare_poems count
    const sp = await db.collection('shakespeare_poems').get();
    console.log(`shakespeare_poems count: ${sp.size}`);
    
    // Check if there are other poetry collections
    const collections = await db.listCollections();
    console.log("All collections:", collections.map(c => c.id).join(', '));
}
check().catch(console.error);
