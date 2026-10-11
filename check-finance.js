const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { currencyCents } = require('./answer-utils');
global.window = { KOAN_COURSES: [] };
require('./data/additional-koans');
require('./data/finance-exhibits');
require('./data/corporate-finance');
const sets = window.KOAN_COURSES[0].sets.filter(s => s.bookId === 'berk-demarzo-corporate-finance');
assert.equal(sets.length, 5);
for (const asset of ['pdf-viewer.html','pdf-viewer.js','vendor/pdfjs/pdf.min.js','vendor/pdfjs/pdf.worker.min.js','vendor/pdfjs/LICENSE']) {
  assert(fs.existsSync(path.join(__dirname,asset)), `Missing PDF viewer asset: ${asset}`);
}

// Independently recompute the authored answer keys from the exhibit givens.
// Chapter 2 also reconciles all four statements and the equipment roll-forward.
const ni = 10000 - 6000 - 1500 - 500 - 400 - 400;
const cfo = ni + 500 - (1000 - 800) - (1500 - 1200) + (1100 - 1000);
const cash = 1000 + cfo - 800 + 500 - 300;
assert.equal(cash, 1700);
assert.equal(5000 + 800 - 500, 5300);
assert.equal(4500 + ni - 300, 9500 - 1100 - 3000);
const expected = [
  [1000*.20, 1000*(1-.20), 20.40-20, 25*20.40, 2000*.25+2000*.75*.20, 2000*.75*.20*.80],
  [9500-1100-3000, 10000-6000, ni, cfo, cash, 1000*8+3000-cash],
  [12*50, 1000*1.10, 1210/1.10, 1100/1.10-980, 110/1.10, -900+(1210-110)/1.10],
  [1000*1.10**2, 1210/1.10**2, 121/1.10+121/1.10**2, 50/.05, 121/1.10+121/1.10**2, -150+121/1.10**3+121/1.10**4],
  [1000*(1+.12/2), 1000*(1+.12/2)**2, 2000*.12/12, 2000*1.01-220, (2000*1.01-220)*1.01-220-100, (1000+1000*.10*(1-.20))/1.08]
];
for (const [chapter, set] of sets.entries()) {
  assert.equal(set.koans.length, 35);
  const math = set.koans.filter(q => q.answerType === 'currency');
  assert.equal(math.length, 6);
  assert(math.length / 35 >= .10 && math.length / 35 <= .20);
  assert(set.koans.slice(0,20).filter(q=>q.answerType==='currency').length >= 2);
  assert(set.koans.slice(29).filter(q=>q.answerType==='currency').length >= 2);
  assert.equal(set.exhibit.chapter, chapter+1);
  const pdfPath = path.resolve(__dirname, set.exhibit.url);
  assert(pdfPath.startsWith(path.resolve(__dirname, 'exhibits') + path.sep));
  assert.equal(fs.readFileSync(pdfPath).subarray(0,5).toString(), '%PDF-');
  assert(set.exhibit.transcript.includes('PAGE 1') && set.exhibit.transcript.includes('PAGE 2'));
  for (const koan of set.koans) {
    assert(koan.section && koan.expoundText);
    assert([1,2].includes(koan.exhibitPage));
    assert(koan.expoundText.trim().split(/\s+/).length >= 70, `Thin finance explanation: ${koan.before}`);
  }
  for (const [i, koan] of math.entries()) {
    assert(/^-?\d+\.\d{2}$/.test(koan.answer));
    assert.equal(currencyCents(koan.answer), Math.round(expected[chapter][i]*100), `${set.id}: ${koan.before}`);
  }
}
for (const sample of ['1200', '1,200', '$1,200.00', '  $1200.00  ', '1200.0']) assert.equal(currencyCents(sample), 120000);
for (const sample of ['-1200', '-$1,200.00', '($1,200.00)', '(1200)']) assert.equal(currencyCents(sample), -120000);
for (const sample of ['', ' ', '$', '1,20', '1,2000', '1,200,00', '1200 dollars', '1200abc', '1e3', 'Infinity', 'NaN', '1.234', '1.', '1..2', '--1', '(-1)', '($-1)', '12%']) assert.equal(currencyCents(sample), null, sample);
assert.equal(currencyCents('0.40'), 40);
assert.equal(currencyCents('$.40'), 40);
assert.equal(currencyCents('.4'), 40);
assert.equal(currencyCents('23.55'), 2355);
assert.notEqual(currencyCents('23.54'), 2355);
console.log('Finance: 5 chapters, 175 koans, 30 independently verified currency answers, 5 PDF exhibits; parser and statement reconciliations pass.');
