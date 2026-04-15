import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createCanvas, loadImage } from 'canvas';
import jsQR from 'jsqr';
import QRCode from 'qrcode';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputDir = path.join(__dirname, 'input_qrs');
const outputDir = path.join(__dirname, 'output_qrs');

// Ensure output dir exists
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

const titlesMapping = [
    { match: "bear-with-me", title: "BEAR WITH ME" },
    { match: "the-crush", title: "THE CRUSH" },
    { match: "how-the-heart-learns", title: "HOW THE HEART LEARNS" },
    { match: "fire-and-ice", title: "FIRE AND ICE" },
    { match: "mindspace", title: "MINDSPACE" },
    { match: "your-love-of-sapphire", title: "YOUR LOVE OF SAPPHIRE" },
    { match: "physics-of-love", title: "PHYSICS OF LOVE" },
    { match: "love-for-animals", title: "LOVE FOR ANIMALS" },
    { match: "nourishing-emotional-i", title: "NOURISHING EMOTIONAL INTELLIGENCE" },
    { match: "the-lord-of-this-evening", title: "THE LORD OF THIS EVENING" },
    { match: "zeher-e-ishq", title: "ZEHER-E-ISHQ" },
    { match: "what-he-didn-t-take", title: "WHAT HE DIDN'T TAKE WITH HIM" },
    { match: "the-shape-time-left", title: "THE SHAPE TIME LEFT BEHIND" },
    { match: "to-kindle-a-heart-is-t", title: "TO KINDLE A HEART IS TO BURN A LIFE" },
    { match: "love-in-ruin", title: "LOVE IN RUIN" },
    { match: "favourite-almost", title: "FAVOURITE ALMOST" },
    { match: "one-night-dance", title: "ONE NIGHT DANCE" }
];

async function processQRs() {
    const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));

    let processedCount = 0;

    for (const file of files) {
        const fileLower = file.toLowerCase();

        // Check if we care about this file
        const mapping = titlesMapping.find(t => fileLower.includes(t.match));
        if (!mapping) continue;

        try {
            console.log(`Processing ${file} for ${mapping.title}...`);
            const imagePath = path.join(inputDir, file);

            const img = await loadImage(imagePath);
            const canvas = createCanvas(img.width, img.height);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, img.width, img.height);
            const imageData = ctx.getImageData(0, 0, img.width, img.height);

            const code = jsQR(imageData.data, imageData.width, imageData.height);

            if (!code) {
                console.error(`  Failed to find QR code in ${file}`);
                continue;
            }

            const urlParts = code.data.split('/');
            const id = urlParts[urlParts.length - 1];
            const newUrl = `https://inkfetish.in/loveatminusone/${id}`;

            const qrDataUrl = await QRCode.toDataURL(newUrl, {
                margin: 4,
                width: 400,
                errorCorrectionLevel: 'H'
            });
            const qrImage = await loadImage(qrDataUrl);

            const x = 30;
            const y = 90;

            ctx.fillStyle = '#ffffff';
            ctx.fillRect(x, y, 400, 400);
            ctx.drawImage(qrImage, x, y, 400, 400);

            const outPath = path.join(outputDir, `${mapping.title}.png`);
            const buffer = canvas.toBuffer('image/png');
            fs.writeFileSync(outPath, buffer);
            console.log(`  Saved to ${outPath}`);
            processedCount++;

        } catch (err) {
            console.error(`  Error processing ${file}: ${err}`);
        }
    }
    console.log(`\nSuccessfully processed ${processedCount} out of ${titlesMapping.length} specified QR codes!`);
}

processQRs();
