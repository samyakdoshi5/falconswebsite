// scripts/fix-image-extensions.js
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'src', 'data.js');
const imageDir = path.join(__dirname, '..', 'public', 'images', 'all');
if (!fs.existsSync(dataPath)) {
    console.error('ERROR: src/data.js not found at', dataPath);
    process.exit(1);
}
if (!fs.existsSync(imageDir)) {
    console.error('ERROR: image directory not found at', imageDir);
    process.exit(1);
}

const text = fs.readFileSync(dataPath, 'utf8');
const lines = text.split(/\r?\n/);
const imageFiles = fs.readdirSync(imageDir);
const supportedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg']);

function findExactImageFilename(baseName) {
    return imageFiles.find((file) => {
        const parsed = path.parse(file);
        return parsed.name === baseName && supportedExtensions.has(parsed.ext.toLowerCase());
    });
}

// Regex matches occurrences like:
// `${PUBLIC}/images/all/Name` or '/images/all/Name' or "...images/all/Name"
// and captures the whole path into group 1 and the filename into group 2
const regexGlobal = /(\$?\{?PUBLIC\}?\/?[^'"\s`]+images\/all\/([^'"\s`,)]+))/gi;
// Note: We intentionally avoid matching trailing .jpg/.png/etc

let changed = false;
const unresolved = [];
const newLines = lines.map((line) => {
    // replace all matches on the line
    return line.replace(regexGlobal, (match, p1, filename) => {
        // If this candidate already has an extension, return as-is
        if (/\.(jpe?g|png|webp|gif|svg)(\?.*)?(#.*)?$/i.test(p1)) {
            return match;
        }
        // Otherwise add the real extension only when the basename casing is exact.
        const m2 = p1.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/);
        const baseOnly = m2 ? m2[1] : p1;
        const rest = m2 ? (m2[2] || '') + (m2[3] || '') : '';
        const exactFile = findExactImageFilename(filename);

        if (!exactFile) {
            unresolved.push(p1);
            return match;
        }

        const fixed = `${baseOnly}${path.extname(exactFile)}${rest}`;

        changed = true;
        // Keep the same surrounding quotes/backticks if present in `match`.
        // We need to replace p1 inside match; easiest is to return match with p1 replaced.
        return match.replace(p1, fixed);
    });
});

if (!changed) {
    if (unresolved.length > 0) {
        console.error('Missing-extension image paths were not fixed because no exact filename match was found:');
        unresolved.forEach((item) => console.error(item));
        process.exit(1);
    } else {
        console.log('No missing-extension image paths detected; nothing changed.');
        process.exit(0);
    }
}

// Backup original file
const backupPath = dataPath + '.bak';
fs.writeFileSync(backupPath, text, 'utf8');
fs.writeFileSync(dataPath, newLines.join('\n'), 'utf8');

console.log('Fixed missing extensions in src/data.js — backup saved to', backupPath);
if (unresolved.length > 0) {
    console.error('Some missing-extension paths were not fixed because no exact filename match was found:');
    unresolved.forEach((item) => console.error(item));
    process.exitCode = 1;
}
console.log('Please verify the changes and restart your dev server if needed.');
