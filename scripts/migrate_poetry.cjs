const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs } = require("firebase/firestore");
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

// Initialize Supabase
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
const supabaseUrl = process.env.NEXT_PUBLIC_VITE_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Firebase using the client config from src/lib/firebase.ts
const firebaseConfig = {
  apiKey: "AIzaSyAemsLgS3vxCkBeQwUKtylkz1N544moBwg",
  authDomain: "inkfetishofficial.firebaseapp.com",
  projectId: "inkfetishofficial",
  storageBucket: "inkfetishofficial.firebasestorage.app",
  messagingSenderId: "147513782980",
  appId: "1:147513782980:web:dbc7e181341b2a62df0f91",
  measurementId: "G-EG6HE223KY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrate() {
  console.log("Starting migration from Firebase to Supabase...");
  try {
    const snapshot = await getDocs(collection(db, 'poetry_festival_s2_submissions'));
    if (snapshot.empty) {
      console.log('No documents found in Firebase.');
      process.exit(0);
    }

    const records = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      records.push({
        authorName: data.authorName || 'Unknown',
        title: data.title || 'Untitled Poem',
        poetryHtml: data.poetryHtml || '',
        wordCount: data.wordCount || 0,
        status: data.status || 'pending',
        // Note: Firebase serverTimestamp might be an object { seconds, nanoseconds }
        created_at: data.submittedAt && data.submittedAt.toDate ? data.submittedAt.toDate() : new Date(),
      });
    });

    console.log(`Found ${records.length} records in Firebase.`);
    
    if (records.length === 0) return;
    
    console.log(`Pushing to Supabase...`);

    const { data, error } = await supabase
      .from('poetry_festival_s2_submissions')
      .insert(records);

    if (error) {
      console.error("Supabase Insert Error:", error);
      console.error("Did you disable RLS on the poetry_festival_s2_submissions table?");
    } else {
      console.log(`✅ Successfully migrated ${records.length} records to Supabase!`);
    }
  } catch (err) {
    console.error("Migration Failed:", err);
  }
}

migrate();
