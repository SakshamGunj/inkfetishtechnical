const admin = require('firebase-admin');

// Path to your service account key file
const serviceAccount = require('/Users/sakshamgunj/Downloads/inkfetishofficial-firebase-adminsdk-fbsvc-781873c6ce.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const auth = admin.auth();

const email = process.argv[2];
const password = process.argv[3];
const name = "Sanjana";

async function createUser() {
    try {
        const userRecord = await auth.createUser({
            email: email,
            password: password,
            displayName: name,
        });

        console.log(`Successfully created Auth user for: ${email} (UID: ${userRecord.uid})`);

        const baseUsername = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');

        const portfolioRef = db.collection('author_portfolios').doc(userRecord.uid);

        await portfolioRef.set({
            uid: userRecord.uid,
            username: baseUsername,
            name: name,
            pen_name: "",
            dob: "",
            email: email,
            phone: "",
            instagram: "",
            twitter: "",
            tiktok: "",
            substack: "",
            website: "",
            location: "",
            theme: "",
            writing_title: "",
            writing_content: "",
            bio: "",
            other_details: "",
            profile_image: "",
            collab_prompt: "",
            collab_email: "",
            wip_title: "",
            wip_current: 0,
            wip_target: 0,
            tags: [],
            experiences: [],
            books: [],
            writing_pieces: [],
            awards: [],
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });

        console.log(`Initialized Firestore portfolio for: ${email}`);
        process.exit(0);
    } catch (error) {
        console.error(`Error processing ${email}:`, error.message);
        process.exit(1);
    }
}

createUser();
