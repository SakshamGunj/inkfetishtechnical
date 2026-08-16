import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import * as fs from 'fs';

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

async function exportData() {
  try {
    console.log('Fetching registrations...');
    const registrationsSnapshot = await getDocs(collection(db, 'bharat_writes_registrations'));
    
    // Create CSV content
    let csvContent = 'Name,Email,Phone,Package,Amount,Status\n';
    
    registrationsSnapshot.forEach((doc) => {
      const data = doc.data();
      // Look for both formats just in case, but use the correct ones
      const nameVal = data.authorName || data.customer_name || '';
      const emailVal = data.email || data.customer_email || '';
      const phoneVal = data.whatsappNumber || data.customer_phone || '';
      
      const name = `"${nameVal.replace(/"/g, '""')}"`;
      const email = `"${emailVal.replace(/"/g, '""')}"`;
      const phone = `"${phoneVal.replace(/"/g, '""')}"`;
      const plan = data.plan || '';
      const amount = data.amount || '';
      const status = data.status || data.order_status || '';
      
      csvContent += `${name},${email},${phone},${plan},${amount},${status}\n`;
    });

    console.log('Fetching submissions...');
    const submissionsSnapshot = await getDocs(collection(db, 'bharat_writes_submissions'));
    
    // Group submissions by author email to handle multiple entries
    const submissionsByAuthor: { [email: string]: any[] } = {};
    
    submissionsSnapshot.forEach((doc) => {
      const data = doc.data();
      const email = data.email || 'unknown';
      if (!submissionsByAuthor[email]) {
        submissionsByAuthor[email] = [];
      }
      submissionsByAuthor[email].push(data);
    });

    // Create MD content
    let mdContent = '# Bharat Writes Submissions\n\n';
    
    for (const [email, submissions] of Object.entries(submissionsByAuthor)) {
      const authorName = submissions[0].authorName || 'Unknown Author';
      mdContent += `## Author: ${authorName}\n`;
      mdContent += `**Email:** ${email}\n\n`;
      
      submissions.forEach((sub, index) => {
        mdContent += `### Title: ${sub.title || 'Untitled'}\n\n`;
        let content = sub.poetryHtml || '';
        content = content.replace(/<div class="poetry-content">/g, '');
        content = content.replace(/<\/div>/g, '');
        content = content.replace(/<p>/g, '');
        content = content.replace(/<\/p>/g, '\n\n');
        content = content.replace(/<br>/g, '\n');
        
        mdContent += `${content.trim()}\n\n`;
        mdContent += `---\n\n`;
      });
    }

    fs.writeFileSync('bharat_writes_entries.csv', csvContent);
    fs.writeFileSync('bharat_writes_submissions.md', mdContent);
    
    console.log('Export completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('Error during export:', error);
    process.exit(1);
  }
}

exportData();
