import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const debugAuthorverseCollection = async () => {
  try {
    console.log("🔍 Debugging authorverseSummit collection...");
    
    const querySnapshot = await getDocs(collection(db, "authorverseSummit"));
    console.log(`📊 Total documents in authorverseSummit: ${querySnapshot.size}`);
    
    if (querySnapshot.size === 0) {
      console.log("❌ No documents found in authorverseSummit collection");
      return;
    }
    
    console.log("📄 Document details:");
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log(`  - ID: ${doc.id}`);
      console.log(`    Name: ${data.name || 'N/A'}`);
      console.log(`    Eligible: ${data.eligible || 'N/A'}`);
      console.log(`    Title: ${data.title || 'N/A'}`);
      console.log(`    Stage2Title: ${data.stage2Title || 'N/A'}`);
      console.log(`    Has Stage2Content: ${!!data.stage2Content}`);
      console.log(`    ---`);
    });
    
  } catch (error) {
    console.error("❌ Error accessing authorverseSummit collection:", error);
  }
};

export const debugAllCollections = async () => {
  try {
    console.log("🔍 Debugging all collections...");
    
    // Test authorverseSummit
    await debugAuthorverseCollection();
    
    // Test inkcult_submissions
    const inkcultSnapshot = await getDocs(collection(db, "inkcult_submissions"));
    console.log(`📊 Total documents in inkcult_submissions: ${inkcultSnapshot.size}`);
    
    // Test inkcult_votes
    const votesSnapshot = await getDocs(collection(db, "inkcult_votes"));
    console.log(`📊 Total documents in inkcult_votes: ${votesSnapshot.size}`);
    
  } catch (error) {
    console.error("❌ Error debugging collections:", error);
  }
};