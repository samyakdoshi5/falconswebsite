// refresh-generate-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'public', 'images', 'all');
const sizes = [400, 800, 1600];
const thumbSize = 320;
const thumbDir = path.join(srcDir, ''); // same as your generate script

if (!fs.existsSync(srcDir)) {
    console.error('Source directory not found:', srcDir);
    process.exit(1);
}

// ----------------------
// Helper: shouldProcess (same logic as your generator)
// ----------------------
function shouldProcess(filename) {
    const parsed = path.parse(filename);
    const ext = parsed.ext.toLowerCase();
    const name = parsed.name;

    if (!['.jpg', '.jpeg', '.png'].includes(ext)) return false;

    // Skip generated images like foo-400.jpg or foo-thumb.jpg
    if (/-\d{2,4}$/.test(name)) return false;
    if (/-thumb$/i.test(name)) return false;

    return true;
}

// ----------------------
// Delete generated files for a base filename (without suffix)
// ----------------------
function deleteGeneratedForBase(baseName) {
    const toDelete = [];

    for (const sz of sizes) {
        toDelete.push(`${baseName}-${sz}.jpg`);
        toDelete.push(`${baseName}-${sz}.webp`);
    }

    toDelete.push(`${baseName}-thumb.jpg`);
    toDelete.push(`${baseName}-thumb.webp`);

    let deletedAny = false;
    for (const f of toDelete) {
        const p = path.join(srcDir, f);
        try {
            if (fs.existsSync(p)) {
                fs.unlinkSync(p);
                console.log('deleted', path.relative(process.cwd(), p));
                deletedAny = true;
            }
        } catch (err) {
            console.error('error deleting', p, err);
        }
    }

    if (!deletedAny) {
        // nothing to delete is fine
        // console.log('no generated files to delete for', baseName);
    }
}

// ----------------------
// Create resized files (same as generate-images.js)
// ----------------------
async function createResizesFor(file) {
    const parsed = path.parse(file);
    const name = parsed.name;
    const input = path.join(srcDir, file);

    if (!fs.existsSync(input)) {
        console.warn('original file not found, skipping:', input);
        return;
    }

    for (const sz of sizes) {
        const outJpg = path.join(srcDir, `${name}-${sz}.jpg`);
        const outWebp = path.join(srcDir, `${name}-${sz}.webp`);

        try {
            // Always regenerate (since we deleted earlier) but check existence just in case
            await sharp(input)
                .resize({ width: sz })
                .jpeg({ quality: 82 })
                .toFile(outJpg);
            console.log('created', path.relative(process.cwd(), outJpg));
        } catch (err) {
            console.error('error creating', outJpg, err);
        }

        try {
            await sharp(input)
                .resize({ width: sz })
                .webp({ quality: 75 })
                .toFile(outWebp);
            console.log('created', path.relative(process.cwd(), outWebp));
        } catch (err) {
            console.error('error creating', outWebp, err);
        }
    }

    // Thumbnail (jpg)
    const thumbOut = path.join(thumbDir, `${name}-thumb.jpg`);
    try {
        await sharp(input)
            .resize({ width: thumbSize })
            .jpeg({ quality: 70 })
            .toFile(thumbOut);
        console.log('created', path.relative(process.cwd(), thumbOut));
    } catch (err) {
        console.error('error creating thumb for', file, err);
    }

    // Also create a thumb.webp for completeness (deleted above too)
    const thumbOutWebp = path.join(thumbDir, `${name}-thumb.webp`);
    try {
        await sharp(input)
            .resize({ width: thumbSize })
            .webp({ quality: 70 })
            .toFile(thumbOutWebp);
        console.log('created', path.relative(process.cwd(), thumbOutWebp));
    } catch (err) {
        console.error('error creating thumb.webp for', file, err);
    }
}

// ----------------------
// Main runner
// ----------------------
async function main() {
    // optional CLI arg: node refresh-generate-images.js filename.jpg
    const arg = process.argv[2];

    if (arg) {
        // sanitize arg -> just filename
        const provided = path.basename(arg);
        if (!shouldProcess(provided)) {
            console.error('Provided file is not a source image or is a generated file:', provided);
            process.exit(1);
        }

        // delete generated files for this base
        const base = path.parse(provided).name;
        deleteGeneratedForBase(base);

        // recreate
        await createResizesFor(provided);
        console.log('refreshed', provided);
    } else {
        // Process all source images in directory
        const files = fs.readdirSync(srcDir);

        // collect source originals (skip generated)
        const originals = files.filter(shouldProcess);

        if (originals.length === 0) {
            console.log('No source images found to refresh in', srcDir);
            return;
        }

        for (const f of originals) {
            const base = path.parse(f).name;
            deleteGeneratedForBase(base);
            await createResizesFor(f);
        }

        console.log('done');
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
