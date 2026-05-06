// scripts/check-image-paths.js
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'src', 'data.js');
const imageDir = path.join(__dirname, '..', 'public', 'images', 'all');
if (!fs.existsSync(file)) { console.error('data.js not found:', file); process.exit(1); }
if (!fs.existsSync(imageDir)) { console.error('image directory not found:', imageDir); process.exit(1); }
const text = fs.readFileSync(file, 'utf8');
const imageFiles = new Set(fs.readdirSync(imageDir));

// crude regex for image paths inside template literals or strings
const regex = /(?:`|\')?(\$?\{?PUBLIC\}?\/?[^'"\s`]+images\/all\/([^'"\s`]+))(?:`|\')?/gi;
let m;
const bad = [];
const missing = [];
while ((m = regex.exec(text)) !== null) {
  const full = m[1].replace(/[`'"]/g,'').trim();
  const filename = m[2].split('?')[0].split('#')[0];

  // if no extension
  if (!/\.(jpe?g|png|webp|gif|svg)(\?.*)?(#.*)?$/i.test(full)) {
    bad.push(full);
    continue;
  }

  // Enforce exact filename casing. Windows accepts case mismatches locally,
  // but deployment targets commonly do not.
  if (!imageFiles.has(filename)) {
    missing.push(full);
  }
}
if (bad.length === 0 && missing.length === 0) {
  console.log('No obvious image path issues found in src/data.js.');
}
if (bad.length > 0) {
  console.log('Possible problematic image paths (missing extension):\n');
  bad.forEach(p => console.log(p));
}
if (missing.length > 0) {
  console.log('\nImage paths not found with exact filename casing:\n');
  missing.forEach(p => console.log(p));
  process.exitCode = 1;
}
