import admin from "firebase-admin";
import fs from "fs";
import path from "path";

if (!admin.apps.length) {
  try {
    // 1. Try to initialize from Environment Variable (Recommended for Vercel)
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log("Firebase Admin initialized from environment variable.");
    } 
    // 2. Fallback to local file
    else {
      const serviceAccountPath = path.resolve(process.cwd(), "serviceAccountKey.json");
      if (fs.existsSync(serviceAccountPath)) {
        const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
        console.log("Firebase Admin initialized from local file.");
      } else {
        console.warn("Firebase credentials missing (FIREBASE_SERVICE_ACCOUNT or serviceAccountKey.json).");
      }
    }
  } catch (error) {
    console.error("Firebase Admin initialization error:", error);
  }
}

export const db = admin.apps.length ? admin.firestore() : null;
export default admin;
