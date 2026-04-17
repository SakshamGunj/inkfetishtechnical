import admin from "firebase-admin";
import fs from "fs";
import path from "path";

function initializeFirebase() {
  if (admin.apps.length) return admin.app();

  try {
    // 1. Try to initialize from Environment Variable (Recommended for Vercel)
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      
      // Fix for private key newlines sometimes being escaped in env vars
      if (serviceAccount.private_key && typeof serviceAccount.private_key === 'string') {
        serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
      }

      return admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } 
    // 2. Fallback to local file
    else {
      const serviceAccountPath = path.resolve(process.cwd(), "serviceAccountKey.json");
      if (fs.existsSync(serviceAccountPath)) {
        const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));
        return admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
      }
    }
  } catch (error) {
    console.error("Firebase Admin initialization error:", error);
  }
  return null;
}

// Explicitly call initialization
initializeFirebase();

export const db = admin.apps.length ? admin.firestore() : null;
export default admin;
