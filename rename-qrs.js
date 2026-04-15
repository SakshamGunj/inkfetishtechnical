import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputDir = path.join(__dirname, 'output_qrs');

const titlesMapping = [
    { match: "the-crush", rename: "THE CRUSH.png" },
    { match: "the-lord-of-this-evening", rename: "THE LORD OF THIS EVENING.png" },
    { match: "favourite-almost", rename: "FAVOURITE ALMOST.png" },
    { match: "your-love-of-sapphire", rename: "YOUR LOVE OF SAPPHIRE.png" },
    { match: "one-night-dance", rename: "ONE NIGHT DANCE.png" },
    { match: "mindspace", rename: "MINDSPACE.png" },
    { match: "bear-with-me", rename: "BEAR WITH ME.png" },
    { match: "the-shape-time-left", rename: "THE SHAPE TIME LEFT BEHIND.png" },
    { match: "love-in-ruin", rename: "LOVE IN RUIN.png" }
];

function renameQRs() {
    if (!fs.existsSync(outputDir)) {
        console.log("No output_qrs directory found.");
        return;
    }

    const files = fs.readdirSync(outputDir);

    for (const file of files) {
        if (!file.endsWith('.png') && !file.endsWith('.jpg')) continue;

        const fileLower = file.toLowerCase();

        // Find matching title
        const mapping = titlesMapping.find(t => fileLower.includes(t.match));

        if (mapping) {
            const oldPath = path.join(outputDir, file);
            const newPath = path.join(outputDir, mapping.rename);
            console.log(`Renaming ${file} -> ${mapping.rename}`);
            fs.renameSync(oldPath, newPath);
        }
    }

    console.log(`\nDone renaming!`);
}

renameQRs();
