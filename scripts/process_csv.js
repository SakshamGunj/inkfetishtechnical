import fs from 'fs';
import csv from 'csv-parser';

const results = [];
const inputPath = '/Users/sakshamgunj/authorverse-summit-launch/anthology_submissions_rows (2).csv'; // Hardcoded based on user input
const outputPath = 'src/data/anthology_submissions.json';

// Ensure data directory exists
if (!fs.existsSync('src/data')) {
    fs.mkdirSync('src/data');
}

fs.createReadStream(inputPath)
    .pipe(csv())
    .on('data', (data) => {
        // Map CSV columns to our desired JSON structure
        // CSV Headers: id,created_at,love_token,book_name,is_pen_name,whatsapp,poem1_title,poem1_theme,poem1_content,poem2_title,poem2_theme,poem2_content,real_name

        results.push({
            id: data.id,
            created_at: data.created_at,
            real_name: data.real_name,
            book_name: data.book_name,
            is_pen_name: data.is_pen_name === 'true', // Convert string "true" to boolean
            poem1_title: data.poem1_title,
            poem1_content: data.poem1_content,
            poem2_title: data.poem2_title,
            poem2_content: data.poem2_content
        });
    })
    .on('end', () => {
        fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
        console.log(`Successfully processed ${results.length} submissions.`);
    })
    .on('error', (err) => {
        console.error('Error processing CSV:', err);
    });
