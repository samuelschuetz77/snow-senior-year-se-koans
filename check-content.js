const assert = require('node:assert/strict');

global.window = { KOAN_COURSES: [] };
for (const file of ['algorithms', 'practicum', 'maintenance', 'frontend']) {
  require(`./data/${file}.js`);
}
for (const file of ['algorithms', 'practicum', 'maintenance', 'frontend']) {
  require(`./data/explanations-${file}.js`);
}
for (const file of ['algorithms', 'practicum', 'maintenance', 'frontend']) {
  require(`./data/details-${file}.js`);
}
require('./data/additional-frontend.js');
require('./data/frontend-ts-vs-tsx.js');
require('./data/additional-maintenance.js');
require('./data/additional-practicum.js');
require('./data/additional-algorithms.js');
require('./data/expounds-frontend.js');
require('./data/expounds-algorithms.js');
require('./data/expounds-practicum.js');
require('./data/expounds-maintenance.js');
require('./data/expounds-operations.js');
require('./data/frontend-code-centric.js');
require('./data/expound.js');

const courses = window.KOAN_COURSES;
const codeSets = courses.find(course => course.id === 'frontend-development').sets.filter(set => set.track === 'code-centric');
assert.equal(codeSets.length, 10, 'Code-centric track needs ten progressive sets');
const snippetLengths = codeSets.flatMap(set => set.koans.map(koan => {
  assert(koan.code, `Missing code in ${set.id}`);
  assert.equal((koan.code.match(/___/g) || []).length, koan.statement ? 1 : 0,
    `Expected exactly one code blank only for a code-completion koan in ${set.id}`);
  if (koan.statement) assert(koan.statement.trim().endsWith('.'), `Missing complete statement in ${set.id}`);
  const lines = koan.code.split('\n').length;
  assert(lines >= 5 && lines <= 15, `Snippet outside 5–15 lines in ${set.id}`);
  return lines;
}));
const averageLines = snippetLengths.reduce((sum, lines) => sum + lines, 0) / snippetLengths.length;
assert(averageLines >= 7 && averageLines <= 9, `Expected about eight lines per snippet, got ${averageLines}`);
for (const set of codeSets) {
  const codeBlanks = set.koans.filter(koan => koan.statement).length;
  assert(codeBlanks >= 2 && codeBlanks < set.koans.length, `Expected both code and statement blanks in ${set.id}`);
}
console.log(`Code-centric: ${codeSets.length} sets, ${snippetLengths.length} koans, ${averageLines.toFixed(1)} lines per snippet.`);
assert.equal(courses.length, 4);
const courseIds = new Set();
const sentences = new Set();
const authoredExpounds = new Set();
let total = 0;
let withCode = 0;
let explanationWords = 0;
let expoundWords = 0;
let terminalBlanks = 0;
let standardTotal = 0;
let standardWithCode = 0;

for (const course of courses) {
  assert(!courseIds.has(course.id), `Duplicate course ${course.id}`);
  courseIds.add(course.id);
  assert(course.sets.length > 0, `${course.id} has no reading sets`);
  const setIds = new Set();
  for (const set of course.sets) {
    let setTerminalBlanks = 0;
    assert(!setIds.has(set.id), `Duplicate set ${course.id}/${set.id}`);
    setIds.add(set.id);
    assert(set.source && set.due && set.koans.length >= 20 && set.koans.length <= 30, `Set needs 20–30 questions: ${course.id}/${set.id}`);
    const setCodeRatio = set.koans.filter(koan => koan.code).length / set.koans.length;
    if (set.codeRatio) {
      assert(Math.abs(setCodeRatio - set.codeRatio) <= 0.05, `Code ratio not near ${set.codeRatio}: ${course.id}/${set.id}`);
    } else {
      assert(setCodeRatio >= 0.03 && setCodeRatio <= 0.05, `Code ratio outside 3–5%: ${course.id}/${set.id}`);
    }
    for (const [index, koan] of set.koans.entries()) {
      assert(koan.answer && (koan.statement || (koan.before && koan.after)), `Incomplete koan in ${course.id}/${set.id}`);
      assert(koan.why && koan.why.trim().split(/\s+/).length < 40, `Missing or long explanation in ${course.id}/${set.id}: ${koan.before}`);
      const whyWords = koan.why.trim().split(/\s+/).length;
      const deepWords = koan.expound?.trim().split(/\s+/).length;
      assert(deepWords >= 25 && deepWords <= 180, `Expound length outside 25–180 words in ${course.id}/${set.id}: ${koan.before}`);
      const location = `${course.id}/${set.id}/${index}`;
      assert(koan.expoundText?.trim(), `Missing authored expound: ${location}`);
      assert(!authoredExpounds.has(koan.expoundText), `Duplicate authored expound: ${location}`);
      authoredExpounds.add(koan.expoundText);
      assert.equal(koan.expound, `${koan.expoundText} Source: ${set.source}.`, `Authored explanation was altered: ${location}`);
      assert(!koan.expoundText.includes('\uFFFD'), `Invalid text encoding: ${location}`);
      assert.equal(koan.connections.length, 0, `Do not stitch earlier koans into ${course.id}/${set.id}`);
      assert(!/\s/.test(koan.answer), `Answer must be one word: ${koan.answer}`);
      assert(!koan.before?.includes('____') && !koan.after?.includes('____'), 'Literal blank outside input');
      assert(!/^[;—]/.test(koan.after?.trim() || ''), `Artificial continuation after blank in ${course.id}/${set.id}: ${koan.before}`);
      const sentence = koan.statement || `${koan.before}___${koan.after}`;
      assert(!sentences.has(sentence), `Duplicate sentence: ${sentence}`);
      sentences.add(sentence);
      total += 1;
      if (!set.codeRatio) standardTotal += 1;
      explanationWords += whyWords;
      expoundWords += deepWords;
      if (koan.code) withCode += 1;
      if (koan.code && !set.codeRatio) standardWithCode += 1;
      if (!koan.statement && /^[.!?]\s*$/.test(koan.after)) {
        terminalBlanks += 1;
        setTerminalBlanks += 1;
      }
    }
    assert(setTerminalBlanks / set.koans.length <= 0.3, `More than 30% sentence-final blanks in ${course.id}/${set.id}`);
  }
}

const codeRatio = withCode / total;
const standardRatio = standardWithCode / standardTotal;
assert(standardRatio >= 0.03 && standardRatio <= 0.05, `Code ratio ${standardRatio} outside 3–5% for sets without a codeRatio`);
assert(explanationWords / total >= 22, 'Average explanation must be at least twice the previous 11-word average');
console.log(`${courses.length} courses, ${courses.reduce((n, c) => n + c.sets.length, 0)} reading sets, ${total} koans, ${withCode} code references (${(100 * codeRatio).toFixed(1)}%). Sentence-final blanks: ${terminalBlanks} (${(100 * terminalBlanks / total).toFixed(1)}%). Explanations average ${(explanationWords / total).toFixed(1)} words; expounds average ${(expoundWords / total).toFixed(1)} words.`);
