const admin = require('firebase-admin');
const fs = require('fs');
const readline = require('readline');

// Path to your service account key file
const serviceAccount = require('/Users/sakshamgunj/Downloads/inkfetishofficial-firebase-adminsdk-fbsvc-781873c6ce.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const auth = admin.auth();

// Path to the CSV file
const csvFilePath = '/Users/sakshamgunj/authorverse-summit-launch/pass for author portfolio site - portfolio_authors_rows.csv.csv';

async function processCSV() {
    const fileStream = fs.createReadStream(csvFilePath);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let isFirstLine = true;
    let successCount = 0;
    let failureCount = 0;

    for await (const line of rl) {
        if (isFirstLine) {
            isFirstLine = false; // Skip the header row
            continue;
        }

        // Split by comma, handling potential commas inside quotes (though unlikely for this specific data)
        // For simple CSVs like this, a basic split is usually sufficient.
        const columns = line.split(',');

        if (columns.length < 4) {
            console.log(`Skipping invalid line: ${line}`);
            continue;
        }

        const rawName = columns[0].trim();
        // Clean name: removing quotes if present
        const name = rawName.replace(/^"|"$/g, '');
        const email = columns[1].trim();
        const phone = columns[2].trim();
        const password = columns[3].trim();

        if (!email || !password) {
            console.log(`Skipping line with missing email or password: ${line}`);
            continue;
        }

        // Generate a username base from the email (everything before @)
        const baseUsername = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');

        try {
            // 1. Create the user in Firebase Auth
            const userRecord = await auth.createUser({
                email: email,
                password: password,
                displayName: name,
            });

            console.log(`Successfully created Auth user for: ${email} (UID: ${userRecord.uid})`);

            // 2. Initialize the Author Portfolio in Firestore
            const portfolioRef = db.collection('author_portfolios').doc(userRecord.uid);

            await portfolioRef.set({
                uid: userRecord.uid,
                username: baseUsername,
                name: name,
                pen_name: "",
                dob: "",
                email: email,
                phone: phone,
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
            successCount++;
        } catch (error) {
            // If the user already exists, we might want to just update their portfolio, but let's log the error for now to be safe.
            console.error(`Error processing ${email}:`, error.message);
            failureCount++;
        }
    }

    console.log('-----------------------------------');
    console.log(`Finished processing CSV.`);
    console.log(`Successfully created: ${successCount}`);
    console.log(`Failed/Skipped: ${failureCount}`);

    process.exit();
}

processCSV().catch(console.error);
