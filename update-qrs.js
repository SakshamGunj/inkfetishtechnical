import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from 'canvas';
import jsQR from 'jsqr';
import QRCode from 'qrcode';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputDir = path.join(__dirname, 'input_qrs');
const outputDir = path.join(__dirname, 'output_qrs');

// Ensure directories exist
if (!fs.existsSync(inputDir)) fs.mkdirSync(inputDir);
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

async function processQRs() {
    const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));

    if (files.length === 0) {
        console.log("No images found in input_qrs directory. Please add the images there and re-run.");
        return;
    }

    for (const file of files) {
        try {
            console.log(`Processing ${file}...`);
            const imagePath = path.join(inputDir, file);

            // 1. Load image and decode QR
            const img = await loadImage(imagePath);
            const canvas = createCanvas(img.width, img.height);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, img.width, img.height);
            const imageData = ctx.getImageData(0, 0, img.width, img.height);

            // Find the QR code in the image
            const code = jsQR(imageData.data, imageData.width, imageData.height);

            if (!code) {
                console.error(`  Failed to find QR code in ${file}`);
                continue;
            }

            console.log(`  Found URL: ${code.data}`);

            // 2. Extract ID and verify it's the right format
            if (!code.data.includes('/loveatminusone/')) {
                console.error(`  URL ${code.data} does not match expected format.`);
                continue;
            }

            const urlParts = code.data.split('/');
            const id = urlParts[urlParts.length - 1];
            const newUrl = `https://inkfetish.in/loveatminusone/${id}`;
            console.log(`  New URL: ${newUrl}`);

            // 3. Generate new QR image to precisely fit the 400x400 space 
            // where the old one was
            // (The original canvas size was 460x520, QR size was 400x400)
            const qrDataUrl = await QRCode.toDataURL(newUrl, {
                margin: 4,     // `qrcode.react` default margin is 4 for level 'H'/'M' with 'includeMargin={true}'
                width: 400,
                errorCorrectionLevel: 'H'
            });
            const qrImage = await loadImage(qrDataUrl);

            // 4. Overwrite ONLY the old QR code portion, keeping the custom title text (and fonts) intact!
            // The original code placed the QR at padding (30), padding + textHeight (90)
            const x = 30;
            const y = 90;

            // Fill the area underneath with white just to be 100% sure we don't 
            // leave any artifact borders.
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(x, y, 400, 400);

            // Draw the newly generated QR code directly over the cleared space.
            ctx.drawImage(qrImage, x, y, 400, 400);

            // 5. Save output
            const outPath = path.join(outputDir, file);
            const buffer = canvas.toBuffer('image/png');
            fs.writeFileSync(outPath, buffer);
            console.log(`  Saved to ${outPath}`);

        } catch (err) {
            console.error(`  Error processing ${file}: ${err}`);
        }
    }
    console.log("Done processing all files!");
}

processQRs();
