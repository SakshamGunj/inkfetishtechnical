const fs = require('fs');
const path = require('path');

const projectId = 'inkfetishofficial';
const collectionId = 'shakespeare_poems';
let allDocuments = [];

async function fetchAllSubmissions() {
    let url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionId}?pageSize=300`;
    let hasMore = true;

    try {
        while (hasMore) {
            console.log(`Fetching from: ${url}`);
            
            // Using global fetch (available in Node 18+)
            const response = await fetch(url);
            
            if (!response.ok) {
                console.error('Failed to fetch', response.status, await response.text());
                break;
            }
            const data = await response.json();

            if (data.documents && data.documents.length > 0) {
                allDocuments = allDocuments.concat(data.documents);
            }

            if (data.nextPageToken) {
                url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionId}?pageSize=300&pageToken=${data.nextPageToken}`;
            } else {
                hasMore = false;
            }
        }

        let txtContent = "======================================================================\n";
        txtContent += "               SHAKESPEARE AND WHAT REMAINED ANTHOLOGY                \n";
        txtContent += "                         POETRY SUBMISSIONS                           \n";
        txtContent += "======================================================================\n\n\n";

        let count = 1;
        for (const doc of allDocuments) {
            const fields = doc.fields || {};
            const content = fields.content ? fields.content.stringValue : "No content";
            let dateStr = "Unknown Date";
            if (fields.createdAt && fields.createdAt.timestampValue) {
                dateStr = new Date(fields.createdAt.timestampValue).toLocaleString();
            } else if (fields.createdAt && fields.createdAt.mapValue && fields.createdAt.mapValue.fields && fields.createdAt.mapValue.fields.seconds) {
                dateStr = new Date(parseInt(fields.createdAt.mapValue.fields.seconds.integerValue) * 1000).toLocaleString();
            }

            txtContent += `----------------------------------------------------------------------\n`;
            txtContent += `Submission #${count}\n`;
            txtContent += `Date: ${dateStr}\n`;
            txtContent += `----------------------------------------------------------------------\n\n`;
            txtContent += `${content}\n\n\n`;
            count++;
        }

        // Export as txt file to root directory
        const outputPath = path.join(__dirname, '..', 'shakespeare_submissions_formatted.txt');
        
        // UTF-8 encoding ensures multi-language / font support stays intact.
        fs.writeFileSync(outputPath, txtContent, 'utf8');

        console.log(`Successfully fetched and parsed ${allDocuments.length} records.`);
        console.log(`Data saved to: ${outputPath}`);

    } catch (err) {
        console.error('Error fetching data:', err);
    }
}

fetchAllSubmissions();
