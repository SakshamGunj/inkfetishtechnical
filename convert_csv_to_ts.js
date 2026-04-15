import fs from 'fs';
import { parse } from 'csv-parse/sync';

const csvContent = fs.readFileSync('Certificatesssss - certificates_uploaded.csv.csv', 'utf-8');
const records = parse(csvContent, { columns: true, skip_empty_lines: true });

const tsContent = `export const certificateData = ${JSON.stringify(records, null, 2)};\n`;

if (!fs.existsSync('src/data')) {
    fs.mkdirSync('src/data', { recursive: true });
}

fs.writeFileSync('src/data/loveAtMinusOneCertificates.ts', tsContent);
console.log('Successfully created src/data/loveAtMinusOneCertificates.ts from new CSV');
