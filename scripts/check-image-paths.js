// scripts/check-image-paths.js
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'src', 'data.js');
if (!fs.existsSync(file)) { console.error('data.js not found:', file); process.exit(1); }
const text = fs.readFileSync(file, 'utf8');

// crude regex for image paths inside template literals or strings
const regex = /(?:`|\')?(\$?\{?PUBLIC\}?\/?[^'"\s`]+images\/all\/([^'"\s`]+))(?:`|\')?/gi;
let m;
const bad = [];
while ((m = regex.exec(text)) !== null) {
  const full = m[1].replace(/[`'"]/g,'').trim();
  // if no extension
  if (!/\.(jpe?g|png|webp|gif|svg)(\?.*)?(#.*)?$/i.test(full)) {
    bad.push(full);
  }
}
if (bad.length === 0) {
  console.log('No obvious missing-extension image paths found in src/data.js.');
} else {
  console.log('Possible problematic image paths (missing extension):\n');
  bad.forEach(p => console.log(p));
}
