import fs from 'fs';
import path from 'path';

// Read the CSV
const csvPath = path.join(process.cwd(), 'Certificates details from 1 st feb to 1st march - Sheet1.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

const lines = csvContent.split('\n').filter(line => line.trim() !== '');
const headers = lines[0].split(',');

const data = {};

for (let i = 1; i < lines.length; i++) {
    // Handle commas in CSV carefully if needed, though phone numbers shouldn't have commas
    // The format is: Customer Phone,Customer Email,Customer Name,certificate_image_url
    const parts = lines[i].split(',');
    if (parts.length >= 4) {
        let phone = parts[0].trim().replace(/\D/g, ''); // Ensure only digits

        // Handle numbers starting with 91 or +91 incorrectly
        if (phone.length > 10 && phone.startsWith('91')) {
            phone = phone.substring(2);
        }

        const email = parts[1].trim();
        const name = parts[2].trim();
        const url = parts.slice(3).join(',').trim(); // in case url has commas, unlikely but safe

        if (phone.length === 10 && url.startsWith('http')) {
            data[phone] = { name, url };
        }
    }
}

// Write to JSON in public for easy fetching or src/data for importing
const outputPath = path.join(process.cwd(), 'src', 'data', 'iwl_certificates.json');

// Ensure directory exists
if (!fs.existsSync(path.dirname(outputPath))) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

console.log(`Successfully converted ${Object.keys(data).length} certificates to JSON.`);
