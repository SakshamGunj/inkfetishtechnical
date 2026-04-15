import fs from 'fs';
import path from 'path';
import { createObjectCsvWriter } from 'csv-writer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File paths
const originalCSV = path.join(__dirname, '..', 'septemr comp - Form responses 1.csv');
const imagesCSV = path.join(__dirname, '..', 'septemr comp - Form responses with images.csv');
const fixedCSV = path.join(__dirname, '..', 'septemr comp - Form responses with images - FIXED.csv');

function parseCSV(csvText) {
  const lines = csvText.split('\n').filter(line => line.trim());
  const headers = lines[0].split(',').map(h => h.trim());
  const rows = lines.slice(1).map(line => {
    const values = line.split(',');
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = values[index] ? values[index].trim() : '';
    });
    return obj;
  });
  return { headers, rows };
}

async function fixCSV() {
  try {
    console.log('🔧 Fixing CSV file with names...\n');

    // Read original CSV (with names)
    const originalText = fs.readFileSync(originalCSV, 'utf8');
    const originalData = parseCSV(originalText);

    // Read images CSV (with URLs but missing names)
    const imagesText = fs.readFileSync(imagesCSV, 'utf8');
    const imagesData = parseCSV(imagesText);

    console.log(`📊 Original CSV: ${originalData.rows.length} records`);
    console.log(`🖼️  Images CSV: ${imagesData.rows.length} records`);

    if (originalData.rows.length !== imagesData.rows.length) {
      throw new Error('CSV files have different number of records!');
    }

    // Create fixed records by combining names from original with URLs from images
    const fixedRecords = originalData.rows.map((originalRecord, index) => {
      const imagesRecord = imagesData.rows[index];

      // Verify emails match
      if (originalRecord['Email address'] !== imagesRecord['Email address']) {
        console.warn(`⚠️  Email mismatch at row ${index + 1}:`);
        console.warn(`   Original: ${originalRecord['Email address']}`);
        console.warn(`   Images: ${imagesRecord['Email address']}`);
      }

      return {
        Timestamp: originalRecord.Timestamp,
        'Email address': originalRecord['Email address'],
        'Your Name': originalRecord['Your Name'] || originalRecord['Email address'].split('@')[0],
        'Image URL': imagesRecord['Image URL']
      };
    });

    // Write fixed CSV
    const csvWriter = createObjectCsvWriter({
      path: fixedCSV,
      header: [
        { id: 'Timestamp', title: 'Timestamp' },
        { id: 'Email address', title: 'Email address' },
        { id: 'Your Name', title: 'Your Name' },
        { id: 'Image URL', title: 'Image URL' }
      ]
    });

    await csvWriter.writeRecords(fixedRecords);

    console.log(`\n✅ Fixed CSV created: ${fixedCSV}`);
    console.log(`📝 Total records processed: ${fixedRecords.length}`);

    // Show first few examples
    console.log('\n📋 Sample of fixed records:');
    fixedRecords.slice(0, 5).forEach((record, index) => {
      console.log(`${index + 1}. ${record['Your Name']} (${record['Email address']})`);
      console.log(`   → ${record['Image URL']}`);
    });

    // Copy to public folder for the web app
    const publicPath = path.join(__dirname, '..', 'public', 'septemr comp - Form responses with images.csv');
    fs.copyFileSync(fixedCSV, publicPath);
    console.log('\n📁 Copied to public folder for web app access');

    console.log('\n🎉 CSV fix completed successfully!');
    console.log('📄 Use this file for your certificate page:');
    console.log(`   ${fixedCSV}`);

  } catch (error) {
    console.error('❌ Error fixing CSV:', error.message);
    process.exit(1);
  }
}

// Run the fix
fixCSV();
