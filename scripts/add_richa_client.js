import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAemsLgS3vxCkBeQwUKtylkz1N544moBwg",
  authDomain: "inkfetishofficial.firebaseapp.com",
  projectId: "inkfetishofficial",
  storageBucket: "inkfetishofficial.firebasestorage.app",
  messagingSenderId: "147513782980",
  appId: "1:147513782980:web:dbc7e181341b2a62df0f91"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function run() {
  try {
    const email = "richak@example.com";
    const password = "password123!";
    let userCredential;

    try {
      userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Created new user:", userCredential.user.uid);
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Signed in existing user:", userCredential.user.uid);
      } else {
        throw e;
      }
    }

    const username = "richak";
    
    // According to rules, auth.uid must be the portfolioId or auth.uid must match the resource uid.
    // We will use the username as portfolioId, so we can't use uid as portfolioId unless we want the URL to be /author/USER_UID
    // Wait, the rules: 
    // allow write: if request.auth != null && (request.auth.uid == portfolioId || (resource != null && request.auth.uid == resource.data.uid));
    // allow create: if request.auth != null;
    // Ah! 'allow create: if request.auth != null;' means any authenticated user can create any document!
    
    const docRef = doc(db, 'author_portfolios', username);
    
    await setDoc(docRef, {
        uid: userCredential.user.uid,
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
        theme: "dark",
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
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    }, { merge: true });
    
    console.log("Successfully created richak portfolio!");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

run();
