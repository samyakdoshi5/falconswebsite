// scripts/generate-images.js (final fixed)
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'public', 'images', 'all');
const sizes = [400, 800, 1600];
const thumbSize = 320;
const thumbDir = path.join(srcDir,'');

if (!fs.existsSync(srcDir)) {
    console.error('Source directory not found:', srcDir);
    process.exit(1);
}

if (!fs.existsSync(thumbDir)) fs.mkdirSync(thumbDir, { recursive: true });

// ----------------------
// Helper: shouldProcess
// ----------------------
function shouldProcess(filename) {
    const parsed = path.parse(filename);
    const ext = parsed.ext.toLowerCase();
    const name = parsed.name;

    // Accept JPG, JPEG, PNG (any case)
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) return false;

    // Skip generated images like foo-400.jpg or foo-thumb.jpg
    if (/-\d{2,4}$/.test(name)) return false;
    if (/-thumb$/i.test(name)) return false;

    return true;
}

// ----------------------
// Main Image Processor
// ----------------------
async function processImage(file) {
    if (!shouldProcess(file)) return;

    const parsed = path.parse(file);
    const name = parsed.name;
    const input = path.join(srcDir, file);

    for (const sz of sizes) {
        const outJpg = path.join(srcDir, `${name}-${sz}.jpg`);
        const outWebp = path.join(srcDir, `${name}-${sz}.webp`);

        try {
            if (!fs.existsSync(outJpg)) {
                await sharp(input)
                    .resize({ width: sz })
                    .jpeg({ quality: 82 })
                    .toFile(outJpg);

                console.log('created', path.relative(process.cwd(), outJpg));
            }

            if (!fs.existsSync(outWebp)) {
                await sharp(input)
                    .resize({ width: sz })
                    .webp({ quality: 75 })
                    .toFile(outWebp);

                console.log('created', path.relative(process.cwd(), outWebp));
            }
        } catch (err) {
            console.error('error processing', file, err);
        }
    }

    // Thumbnail
    const thumbOut = path.join(thumbDir, `${name}-thumb.jpg`);

    if (!fs.existsSync(thumbOut)) {
        try {
            await sharp(input)
                .resize({ width: thumbSize })
                .jpeg({ quality: 70 })
                .toFile(thumbOut);

            console.log('created', path.relative(process.cwd(), thumbOut));
        } catch (err) {
            console.error('error creating thumb for', file, err);
        }
    }
}

// ----------------------
// Main runner
// ----------------------
async function main() {
    const files = fs.readdirSync(srcDir);

    for (const f of files) {
        await processImage(f);
    }

    console.log('done');
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
