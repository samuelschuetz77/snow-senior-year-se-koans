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
require('./data/links-practicum.js');
require('./data/expound.js');

const courses = window.KOAN_COURSES;
assert.equal(courses.length, 4);
const courseIds = new Set();
const sentences = new Set();
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
      assert(koan.before && koan.after && koan.answer, `Incomplete koan in ${course.id}/${set.id}`);
      assert(koan.why && koan.why.trim().split(/\s+/).length < 40, `Missing or long explanation in ${course.id}/${set.id}: ${koan.before}`);
      const whyWords = koan.why.trim().split(/\s+/).length;
      const deepWords = koan.expound?.trim().split(/\s+/).length;
      assert(deepWords >= 25 && deepWords <= 180, `Expound length outside 25–180 words in ${course.id}/${set.id}: ${koan.before}`);
      assert(koan.expound.startsWith(`${koan.before}${koan.answer}`), `Expound must start with its own koan in ${course.id}/${set.id}`);
      assert(koan.connections.length <= 2, `Too many earlier connections in ${course.id}/${set.id}`);
      for (const connection of koan.connections) {
        assert(connection.index < index, `Connection must point backward in ${course.id}/${set.id}`);
        assert(connection.bridge.match(/[.!?]/g).length <= 2, `Long transition in ${course.id}/${set.id}`);
      }
      assert(!/\s/.test(koan.answer), `Answer must be one word: ${koan.answer}`);
      assert(!koan.before.includes('____') && !koan.after.includes('____'), 'Literal blank outside input');
      assert(!/^[;—]/.test(koan.after.trim()), `Artificial continuation after blank in ${course.id}/${set.id}: ${koan.before}`);
      const sentence = `${koan.before}___${koan.after}`;
      assert(!sentences.has(sentence), `Duplicate sentence: ${sentence}`);
      sentences.add(sentence);
      total += 1;
      if (!set.codeRatio) standardTotal += 1;
      explanationWords += whyWords;
      expoundWords += deepWords;
      if (koan.code) withCode += 1;
      if (koan.code && !set.codeRatio) standardWithCode += 1;
      if (/^[.!?]\s*$/.test(koan.after)) {
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
