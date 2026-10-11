// Run with node scripts/check-themes.cjs. No dependencies required.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../themes.js'), 'utf8');
function boot(saved, dark, blocked = false) {
  const root = { dataset: {}, style: { setProperty() {} } };
  const context = { window: { matchMedia: () => ({ matches: dark }) },
    localStorage: { getItem() { if (blocked) throw new Error('Storage disabled'); return saved; } },
    document: { documentElement: root, querySelector: () => null } };
  vm.runInNewContext(source, context);
  return { themes: context.window.KoanThemes.themes, selected: root.dataset.theme };
}
function luminance(hex) {
  const c = hex.slice(1).match(/../g).map(x => parseInt(x, 16) / 255)
    .map(x => x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4);
  return c[0] * .2126 + c[1] * .7152 + c[2] * .0722;
}
function contrast(a, b) {
  const x = luminance(a), y = luminance(b);
  return (Math.max(x, y) + .05) / (Math.min(x, y) + .05);
}
const { themes } = boot(null, false);
assert(themes.length >= 10);
let minimumText = Infinity, minimumControl = Infinity;
for (const theme of themes) {
  for (const background of ['paper', 'surface', 'soft']) {
    for (const foreground of ['ink', 'muted', 'accent', 'right', 'wrong']) {
      const ratio = contrast(theme.colors[foreground], theme.colors[background]);
      assert(ratio >= 4.5, `${theme.id}: ${foreground}/${background} is ${ratio}:1`);
      minimumText = Math.min(minimumText, ratio);
    }
    const ratio = contrast(theme.colors.line, theme.colors[background]);
    assert(ratio >= 3, `${theme.id}: border/${background} is ${ratio}:1`);
    minimumControl = Math.min(minimumControl, ratio);
  }
  assert.equal(boot(theme.id, theme.mode !== 'dark').selected, theme.id);
}
assert.equal(boot('unknown', false).selected, 'paper-light');
assert.equal(boot(null, true).selected, 'paper-dark');
assert.equal(boot(null, false, true).selected, 'paper-light');
console.log(`${themes.length} themes pass: text >= ${minimumText.toFixed(2)}:1; controls >= ${minimumControl.toFixed(2)}:1. Saved, system, and unavailable-storage defaults pass.`);
