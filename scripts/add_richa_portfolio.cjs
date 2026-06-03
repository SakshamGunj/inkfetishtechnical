const admin = require('firebase-admin');

// Path to your service account key file
const serviceAccount = require('../serviceAccountKey.json');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function createRichaPortfolio() {
    try {
        const username = "richak";
        const email = "richak@example.com"; // Placeholder or skip auth

        const portfolioRef = db.collection('author_portfolios').doc(username);

        await portfolioRef.set({
            uid: username,
            username: username,
            name: "Richa K",
            pen_name: "Richa Kansal",
            age: "40",
            email: email,
            phone: "",
            instagram: "",
            twitter: "",
            tiktok: "",
            substack: "",
            website: "",
            location: "",
            theme: "dark", // default theme
            writing_title: "Freelance Content Writer",
            writing_content: "I write blogs, articles, press releases, emailers, media interviews, website and social media content for clients across finance, education, lifestyle, travel, wellness, e-commerce and B2B SaaS sectors.",
            bio: "I started last year, 2024, following a creative exercise in one of the groups I am a part of. Since then, it became easier to express myself through poetry, and I have since participated in several contests with an aim to get my work published.\n\nQualifications: I have done a Master's in Economics from the Delhi School of Economics. Later, after a few years of work experience, I also completed my MBA from Esade Business School, Barcelona.",
            motivation: "Writing has always been my passion. Even as a kid, I always maintained a journal. I always envisioned writing a book in the distant future. But, of late, the desire to get my work out there propelled me to work in a more focused way towards this goal.",
            vision: "My current focus is to get published and market my book the right way.",
            projects: "Besides this anthology, I am also working on a non-fiction book that has been in the works for a while now. And I have a few clients on the content writing front as well.",
            message_to_world: "It’s always good to have a dream or a goal. And sometimes, it’s ok to show your vulnerability and put your work out there to be judged by people who may not always like it. It may sound scary, but the fear can never overshadow the sense of achievement you’ll get if your work touches even one soul.",
            other_details: "",
            profile_image: "/images/richa-k.jpeg", 
            collab_prompt: "",
            collab_email: "",
            wip_title: "",
            wip_current: 0,
            wip_target: 0,
            tags: ["Content Writer", "Poet", "Non-fiction"],
            experiences: [],
            books: [{
                title: "Reflections & Ruminations",
                subtitle: "Ramblings of an amateur poet",
                author_name: "Richa Kansal",
                front_pages: ["About the Author", "Preface/Introduction"]
            }],
            writing_pieces: [],
            awards: [],
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        console.log(`Successfully created Firestore portfolio for: ${username}`);
        process.exit(0);
    } catch (error) {
        console.error(`Error processing portfolio:`, error.message);
        process.exit(1);
    }
}

createRichaPortfolio();
