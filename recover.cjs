const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const orderIds = [
  'margins_1785079919057_1rpw5',
  'margins_1785077850061_7jcth',
  'margins_1785077760430_03thy',
  'margins_1785072755179_txol0',
  'margins_1785072740413_ecutm',
  'margins_1785054458832_6eexj',
  'margins_1785051081183_mwwn8',
  'margins_1785050542304_rh6pe',
  'margins_1785050139420_c9gu7'
];

async function generateCsv() {
  let csvContent = 'Order ID,Name,Email,WhatsApp,Address,City,State,Pincode,Quantity,Status,Amount\n';
  
  for (const orderId of orderIds) {
    try {
      const response = await fetch(`https://api.cashfree.com/pg/orders/${orderId}`, {
        method: 'GET',
        headers: {
          'x-client-id': process.env.CASHFREE_APP_ID,
          'x-client-secret': process.env.CASHFREE_SECRET_KEY,
          'x-api-version': '2025-01-01'
        }
      });
      
      const order = await response.json();
      
      if (order && order.order_status) {
        const tags = order.order_tags || {};
        const email = tags.email || order.customer_details?.customer_email || '';
        const name = tags.name || order.customer_details?.customer_name || '';
        const whatsapp = tags.whatsapp || order.customer_details?.customer_phone || '';
        
        // Escape quotes for CSV
        const safeAddress = `"${(tags.address || '').replace(/"/g, '""')}"`;
        const qty = tags.qty || '1';
        
        csvContent += `${orderId},"${name}","${email}","${whatsapp}",${safeAddress},"${tags.city || ''}","${tags.state || ''}","${tags.pincode || ''}",${qty},${order.order_status},${order.order_amount}\n`;
      }
    } catch (err) {
      console.error(`Error fetching ${orderId}:`, err.message);
    }
  }
  
  fs.writeFileSync('recovered_orders.csv', csvContent);
  console.log('✅ Created recovered_orders.csv');
}

generateCsv();
