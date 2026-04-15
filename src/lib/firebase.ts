
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAemsLgS3vxCkBeQwUKtylkz1N544moBwg",
  authDomain: "inkfetishofficial.firebaseapp.com",
  projectId: "inkfetishofficial",
  storageBucket: "inkfetishofficial.firebasestorage.app",
  messagingSenderId: "147513782980",
  appId: "1:147513782980:web:dbc7e181341b2a62df0f91",
  measurementId: "G-EG6HE223KY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser environment)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export { analytics };
export default app;