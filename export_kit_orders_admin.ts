import admin from "firebase-admin";
import * as fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function exportKitOrders() {
  try {
    console.log('Fetching kit orders...');
    const snapshot = await db.collection('bharat_writes_kit_orders').get();
    
    // Create CSV content
    let csvContent = 'Order ID,Name,Email,WhatsApp,Address,City,State,Pincode,Amount,Status\n';
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      
      const orderId = `"${(data.order_id || '').replace(/"/g, '""')}"`;
      const name = `"${(data.name || '').replace(/"/g, '""')}"`;
      const email = `"${(data.email || '').replace(/"/g, '""')}"`;
      const phone = `"${(data.whatsapp || '').replace(/"/g, '""')}"`;
      const address = `"${(data.address || '').replace(/"/g, '""')}"`;
      const city = `"${(data.city || '').replace(/"/g, '""')}"`;
      const state = `"${(data.state || '').replace(/"/g, '""')}"`;
      const pincode = `"${(data.pincode || '').replace(/"/g, '""')}"`;
      const amount = data.amount || '';
      const status = data.status || '';
      
      csvContent += `${orderId},${name},${email},${phone},${address},${city},${state},${pincode},${amount},${status}\n`;
    });

    fs.writeFileSync('bharat_writes_kit_orders.csv', csvContent);
    
    console.log(`Export completed! Generated bharat_writes_kit_orders.csv with ${snapshot.size} orders.`);
    process.exit(0);
    
  } catch (error) {
    console.error('Error during export:', error);
    process.exit(1);
  }
}

exportKitOrders();
