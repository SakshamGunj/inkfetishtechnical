import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const BUCKET_NAME = 'certificates';
const IMAGES_DIR = path.join(process.cwd(), 'c1');
const CSV_FILE_PATH = path.join(process.cwd(), 'numbers for love at minus one - anthology_submissions_rows (3).csv.csv');
const OUTPUT_CSV_PATH = path.join(process.cwd(), 'certificates_uploaded.csv');

async function uploadImage(filePath, fileName) {
    try {
        const fileBuffer = fs.readFileSync(filePath);

        // We'll organize them nicely in the bucket
        const storagePath = `loveatminusone/${fileName}`;

        const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(storagePath, fileBuffer, {
                contentType: 'image/png',
                upsert: true,
            });

        if (error) {
            console.error(`Error uploading ${fileName}:`, error.message);
            return null;
        }

        // Get the public URL
        const { data: publicUrlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(storagePath);

        // The user wants a specific query parameter later? For now just the public URL
        // We can just get the base URL and append things later, or save the base URL
        return publicUrlData.publicUrl;
    } catch (err) {
        console.error(`Failed to upload ${fileName}:`, err);
        return null;
    }
}

async function main() {
    console.log('Starting certificate upload process...');

    // 1. Read CSV
    if (!fs.existsSync(CSV_FILE_PATH)) {
        console.error(`CSV file not found: ${CSV_FILE_PATH}`);
        process.exit(1);
    }

    const csvContent = fs.readFileSync(CSV_FILE_PATH, 'utf-8');
    const records = parse(csvContent, {
        columns: false,
        skip_empty_lines: true
    });

    // records is an array of arrays representing rows
    console.log(`Found ${records.length} rows in CSV.`);

    // Find all PNGs in c1 folder and sort them numerically
    const files = fs.readdirSync(IMAGES_DIR).filter(f => f.endsWith('.png'));
    files.sort((a, b) => parseInt(a) - parseInt(b));

    console.log(`Found ${files.length} images to upload.`);

    // Add header for the new column if it doesn't exist? The user's CSV just has "whatsapp" and numbers.
    // We'll append the URL to the row.

    // Ensure we don't exceed records length or files length
    const rowsToProcess = Math.min(files.length, records.length - 1); // -1 for header

    // The first row is 'whatsapp'. Let's add 'certificate_url'
    records[0].push('certificate_url');

    for (let i = 0; i < files.length; i++) {
        const fileName = files[i];
        const rowIndex = i + 1; // Start at 1 to skip header
        const fileNum = parseInt(fileName);

        if (rowIndex < records.length) {
            console.log(`Uploading ${fileName} for row ${rowIndex} (phone: ${records[rowIndex][0]})... (${i + 1}/${files.length})`);

            const filePath = path.join(IMAGES_DIR, fileName);
            const publicUrl = await uploadImage(filePath, fileName);

            if (publicUrl) {
                records[rowIndex].push(publicUrl);
                console.log(`  Success! URL: ${publicUrl}`);
            } else {
                records[rowIndex].push('');
            }
        } else {
            console.warn(`Ran out of rows in CSV before processing all images! Reached image ${fileName}, but CSV only has ${records.length} rows.`);
            break; // Stop if we run out of CSV rows
        }
    }

    // Write the updated CSV
    const outputCsv = stringify(records);
    fs.writeFileSync(OUTPUT_CSV_PATH, outputCsv);
    console.log(`\n🎉 All done! Updated CSV saved to: ${OUTPUT_CSV_PATH}`);
}

main().catch(console.error);
