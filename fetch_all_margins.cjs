const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const orderIds = [
"margins_1785079919057_1rpw5",
"margins_1785077850061_7jcth",
"margins_1785072755179_txol0",
"margins_1785072740413_ecutm",
"margins_1785054458832_6eexj",
"margins_1785051081183_mwwn8",
"margins_1785050542304_rh6pe",
"margins_1785050139420_c9gu7",
"margins_1785047486334_yundg",
"margins_1785008010483_hj499",
"margins_1785000334618_916av",
"margins_1784991463745_enbyo",
"margins_1784980229482_s3bl7",
"margins_1784979604124_63anu",
"margins_1784978849499_8qxjg",
"margins_1784976674009_d2uce",
"margins_1784973119439_e2qiq",
"margins_1784972403915_3ae84",
"margins_1784971666977_x64zc",
"margins_1784970495109_n8lof",
"margins_1784969966630_c22oo",
"margins_1784968138337_tymny",
"margins_1784967580901_5p1bj",
"margins_1784967214588_r1d50",
"margins_1784967075151_zsabe",
"margins_1784966731556_48exf",
"margins_1784966517913_poblb",
"margins_1784966025751_5l8hh",
"margins_1784965900262_maek2",
"margins_1784965867469_3xbrs",
"margins_1784965859725_chcq7",
"margins_1784965814570_2yeba",
"margins_1784960022916_1t1fg",
"margins_1784914648922_q9a7x",
"margins_1784887545971_e41q4",
"margins_1784887353881_covs2",
"margins_1784887104063_phg37",
"margins_1784884315670_0nvco",
"margins_1784884299248_z3y2o",
"margins_1784882328538_o6wbo",
"margins_1784882321902_t7tkw",
"margins_1784881771981_wr90o",
"margins_1784881652245_cwmyf",
"margins_1784877486810_gwflt",
"margins_1784820368056_0rkv5",
"margins_1784811788233_t54v0",
"margins_1784802659670_e48ta",
"margins_1784800022508_pznuz",
"margins_1784798448905_ouwh6",
"margins_1784797101274_w56om",
"margins_1784796524322_y2rd9",
"margins_1784736218858_2vbk5",
"margins_1784730367243_wyvbr",
"margins_1784729983339_mp9pf",
"margins_1784715154673_odug6",
"margins_1784713691987_zfzv1",
"margins_1784712684753_01ikv",
"margins_1784712299871_g5uwm",
"margins_1784712289878_5lmde",
"margins_1784711521169_yu338",
"margins_1784711174142_p9420",
"margins_1784710936413_dm2e3",
"margins_1784710276881_l1s3q",
"margins_1784710001836_x0nl6",
"margins_1784709934019_5jjhg",
"margins_1784709609231_p5n8a",
"margins_1784709588996_huimm",
"margins_1784709519721_zmx8g",
"margins_1784709498050_mb0u5",
"margins_1784709256793_iqe6q",
"margins_1784709242114_veyuz",
"margins_1784709061813_jh4yk",
"margins_1784709008327_cibet",
"margins_1784708995278_nojr6",
"margins_1784708894810_cw9wv",
"margins_1784706349553_6ihyx",
"margins_1784706208381_88551"
];

async function generateCsv() {
  console.log(`Starting recovery for ${orderIds.length} orders...`);
  
  let csvContent = 'Order ID,Name,Email,WhatsApp,Address,City,State,Pincode,Quantity,Amount,Date,Status\n';
  let successCount = 0;
  
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
        
        // Use details from either tags or Cashfree core details
        const email = tags.email || order.customer_details?.customer_email || '';
        const name = tags.name || order.customer_details?.customer_name || '';
        const whatsapp = tags.whatsapp || order.customer_details?.customer_phone || '';
        const date = order.created_at || '';
        const status = order.order_status;
        
        // Escape quotes to prevent CSV breaking
        const safeAddress = `"${(tags.address || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`;
        const qty = tags.qty || '1';
        
        csvContent += `${orderId},"${name}","${email}","${whatsapp}",${safeAddress},"${tags.city || ''}","${tags.state || ''}","${tags.pincode || ''}",${qty},${order.order_amount},"${date}","${status}"\n`;
        successCount++;
        process.stdout.write(`.`); // Progress indicator
      } else {
        process.stdout.write(`[Skip:${orderId}]`);
      }
    } catch (err) {
      console.error(`\nError fetching ${orderId}:`, err.message);
    }
  }
  
  fs.writeFileSync('margins_orders.csv', csvContent);
  console.log(`\n✅ Done! Recovered ${successCount}/${orderIds.length} orders successfully.`);
  console.log('Saved to margins_orders.csv');
}

generateCsv();
