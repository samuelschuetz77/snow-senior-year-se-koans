// A publish allowlist keeps source textbooks and authoring files off Pages.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const destination = path.join(root, '_site');
if (fs.existsSync(destination)) throw new Error('Expected a fresh _site directory; move the prior build before rebuilding.');
fs.mkdirSync(destination);
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const referenced = [...index.matchAll(/<(?:script|link)\b[^>]*(?:src|href)="([^"?#]+)(?:[^\"]*)"/g)].map(match => match[1]);
for (const entry of referenced) {
  if (!/^[a-zA-Z0-9_/-]+\.(js|css)$/.test(entry) || entry.includes('..')) throw new Error(`Unexpected runtime asset: ${entry}`);
}
for (const entry of new Set(['index.html', 'pdf-viewer.html', 'pdf-viewer.js', '.nojekyll', 'data', 'exhibits', 'vendor', ...referenced])) {
  fs.cpSync(path.join(root, entry), path.join(destination, entry), { recursive: true });
}
console.log('Packaged static site and original exhibits in _site.');
