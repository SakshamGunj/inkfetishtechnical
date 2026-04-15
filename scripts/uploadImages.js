import ImageKit from 'imagekit';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ImageKit configuration (hardcoded credentials)
const imagekit = new ImageKit({
  publicKey: "public_V+TbEtQmLO9JpA+8ModN+ZUblxM=",
  privateKey: "private_Hiu7DbxQ8gceIqX6tj16upurV4g=",
  urlEndpoint: "https://ik.imagekit.io/7dsi2oyqe"
});

// Configuration
const IMAGES_FOLDER = '/Users/sakshamgunj/Documents/authorverse-summit-launch/(Bulk 1) of participation';
const CSV_FILE = '/Users/sakshamgunj/Documents/authorverse-summit-launch/septemr comp - Form responses 1.csv';
const OUTPUT_CSV_FILE = '/Users/sakshamgunj/Documents/authorverse-summit-launch/septemr comp - Form responses with images.csv';

// Function to read CSV data
async function readCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}

// Function to upload image to ImageKit
async function uploadImage(imagePath, fileName) {
  try {
    console.log(`Uploading ${fileName}...`);

    const result = await imagekit.upload({
      file: fs.readFileSync(imagePath),
      fileName: fileName,
      folder: '/participation-images',
      useUniqueFileName: false,
      tags: ['participation', 'authorverse-summit']
    });

    console.log(`✅ Successfully uploaded ${fileName}: ${result.url}`);
    return result.url;
  } catch (error) {
    console.error(`❌ Failed to upload ${fileName}:`, error.message);
    throw error;
  }
}

// Function to write updated CSV
async function writeUpdatedCSV(records) {
  const csvWriter = createObjectCsvWriter({
    path: OUTPUT_CSV_FILE,
    header: [
      { id: 'Timestamp', title: 'Timestamp' },
      { id: 'Email address', title: 'Email address' },
      { id: 'Your Name', title: 'Your Name' },
      { id: 'Image URL', title: 'Image URL' }
    ]
  });

  await csvWriter.writeRecords(records);
  console.log(`📄 Updated CSV saved to: ${OUTPUT_CSV_FILE}`);
}

// Main function
async function main() {
  try {
    console.log('🚀 Starting bulk image upload process...\n');

    // Read CSV data
    console.log('📖 Reading CSV file...');
    const csvData = await readCSV(CSV_FILE);
    console.log(`📊 Found ${csvData.length} records in CSV\n`);

    // Get list of image files
    const imageFiles = fs.readdirSync(IMAGES_FOLDER)
      .filter(file => file.endsWith('.jpg'))
      .sort((a, b) => {
        const numA = parseInt(a.replace('.jpg', ''));
        const numB = parseInt(b.replace('.jpg', ''));
        return numA - numB;
      });

    console.log(`🖼️ Found ${imageFiles.length} images to upload\n`);

    // Validate that we have matching counts
    if (csvData.length !== imageFiles.length) {
      throw new Error(`Mismatch: CSV has ${csvData.length} records but found ${imageFiles.length} images`);
    }

    // Upload images serially and update CSV data
    const updatedRecords = [];
    let successCount = 0;
    let failureCount = 0;

    for (let i = 0; i < csvData.length; i++) {
      const record = csvData[i];
      const imageFile = imageFiles[i];
      const imagePath = path.join(IMAGES_FOLDER, imageFile);

      try {
        console.log(`\n📤 Processing record ${i + 1}/${csvData.length}: ${record['Your Name'] || record['Email address']}`);

        // Upload image
        const imageUrl = await uploadImage(imagePath, imageFile);

        // Add image URL to record
        updatedRecords.push({
          ...record,
          'Image URL': imageUrl
        });

        successCount++;
        console.log(`✅ Record ${i + 1} completed`);

        // Add a small delay between uploads to be respectful to the API
        if (i < csvData.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

      } catch (error) {
        console.error(`❌ Failed to process record ${i + 1}: ${error.message}`);

        // Still add the record but with empty image URL
        updatedRecords.push({
          ...record,
          'Image URL': ''
        });

        failureCount++;
      }
    }

    // Write updated CSV
    console.log('\n💾 Writing updated CSV file...');
    await writeUpdatedCSV(updatedRecords);

    // Summary
    console.log('\n🎉 Upload process completed!');
    console.log(`✅ Successfully uploaded: ${successCount} images`);
    console.log(`❌ Failed uploads: ${failureCount} images`);
    console.log(`📄 Updated CSV saved to: ${OUTPUT_CSV_FILE}`);

  } catch (error) {
    console.error('💥 Error in main process:', error.message);
    process.exit(1);
  }
}

// Run the main function
main();
