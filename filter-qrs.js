import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputDir = path.join(__dirname, 'output_qrs');

// The list of titles the user wants to keep, converted to lowercase, 
// and space replaced by hyphens to match the filename structure generated
// previously: e.g., "love-at-minus-one-the-crush-qr.png"
const titlesToKeep = [
    "the-crush",
    "the-lord-of-this-evening",
    "favourite-almost",
    "your-love-of-sapphire",
    "one-night-dance",
    "mindspace",
    "bear-with-me",
    "the-shape-time-left",
    "love-in-ruin",
    // also add them with spaces just in case
    "the crush",
    "the lord of this evening",
    "favourite almost",
    "your love of sapphire",
    "one night dance",
    "bear with me",
    "the shape time left behind",
    "love in ruin"
];

function filterQRs() {
    if (!fs.existsSync(outputDir)) {
        console.log("No output_qrs directory found.");
        return;
    }

    const files = fs.readdirSync(outputDir);
    let keptCount = 0;
    let removedCount = 0;

    for (const file of files) {
        if (!file.endsWith('.png') && !file.endsWith('.jpg')) continue;

        const fileLower = file.toLowerCase();

        // Check if the filename contains ANY of the titles we want to keep
        const shouldKeep = titlesToKeep.some(title => fileLower.includes(title));

        if (!shouldKeep) {
            console.log(`Removing ${file}...`);
            fs.unlinkSync(path.join(outputDir, file));
            removedCount++;
        } else {
            console.log(`Keeping ${file}`);
            keptCount++;
        }
    }

    console.log(`\nDone! Kept ${keptCount} files, removed ${removedCount} files.`);
}

filterQRs();
