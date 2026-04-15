const fs = require('fs');
const path = require('path');

const projectId = 'inkfetishofficial';
const collectionId = 'iwl_submissions';
let allDocuments = [];

async function fetchAllSubmissions() {
    let url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionId}?pageSize=300`;
    let hasMore = true;

    try {
        while (hasMore) {
            console.log(`Fetching from: ${url}`);
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

        // Simplify format
        const cleanData = allDocuments.map(doc => {
            const fields = doc.fields || {};
            const extractValue = (field) => {
                if (!field) return null;
                if (field.stringValue !== undefined) return field.stringValue;
                if (field.integerValue !== undefined) return Number(field.integerValue);
                if (field.booleanValue !== undefined) return field.booleanValue;
                if (field.mapValue !== undefined) {
                    const mapData = {};
                    for (const [k, v] of Object.entries(field.mapValue.fields || {})) {
                        mapData[k] = extractValue(v);
                    }
                    return mapData;
                }
                return field;
            };

            const cleanDoc = { id: doc.name.split('/').pop() };
            for (const [key, value] of Object.entries(fields)) {
                cleanDoc[key] = extractValue(value);
            }
            return cleanDoc;
        });

        const outputPath = path.join(__dirname, 'iwl_submissions_dump.json');
        fs.writeFileSync(outputPath, JSON.stringify(cleanData, null, 2));

        console.log(`Successfully fetched and parsed ${cleanData.length} records.`);
        console.log(`Data saved to: ${outputPath}`);

        // Quick Analysis
        const total = cleanData.length;
        const complete = cleanData.filter(d => d.status === 'full_submission' || d.status === 'complete').length;
        const v2Count = cleanData.filter(d => d.orderId && d.orderId.includes('v2')).length;
        const categories = cleanData.reduce((acc, d) => {
            acc[d.category || 'unknown'] = (acc[d.category || 'unknown'] || 0) + 1;
            return acc;
        }, {});

        console.log('\\n--- QUICK INSIGHTS ---');
        console.log(`Total Submissions: ${total}`);
        console.log(`Completed Submissions (Full status): ${complete}`);
        console.log(`Submissions via V2 Link: ${v2Count}`);
        console.log(`Category Breakdown:`, categories);

    } catch (err) {
        console.error('Error fetching data:', err);
    }
}

fetchAllSubmissions();
