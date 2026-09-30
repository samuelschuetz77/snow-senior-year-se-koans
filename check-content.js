const assert = require('node:assert/strict');

global.window = { KOAN_COURSES: [] };
for (const file of ['algorithms', 'practicum', 'maintenance', 'frontend']) {
  require(`./data/${file}.js`);
}
for (const file of ['algorithms', 'practicum', 'maintenance', 'frontend']) {
  require(`./data/explanations-${file}.js`);
}

const courses = window.KOAN_COURSES;
assert.equal(courses.length, 4);
const courseIds = new Set();
const sentences = new Set();
let total = 0;
let withCode = 0;

for (const course of courses) {
  assert(!courseIds.has(course.id), `Duplicate course ${course.id}`);
  courseIds.add(course.id);
  assert(course.sets.length > 0, `${course.id} has no reading sets`);
  const setIds = new Set();
  for (const set of course.sets) {
    assert(!setIds.has(set.id), `Duplicate set ${course.id}/${set.id}`);
    setIds.add(set.id);
    assert(set.source && set.due && set.koans.length >= 5, `Incomplete set ${course.id}/${set.id}`);
    if (course.id === 'advanced-algorithms' && set.id === 'jea-3-9') {
      assert(set.koans.length >= 20 && set.koans.length <= 30, 'JEA 3.9 needs 20–30 questions');
      const setCodeRatio = set.koans.filter(koan => koan.code).length / set.koans.length;
      assert(setCodeRatio >= 0.03 && setCodeRatio <= 0.05, 'JEA 3.9 code ratio must be 3–5%');
    }
    for (const koan of set.koans) {
      assert(koan.before && koan.after && koan.answer, `Incomplete koan in ${course.id}/${set.id}`);
      assert(koan.why && koan.why.trim().split(/\s+/).length < 40, `Missing or long explanation in ${course.id}/${set.id}: ${koan.before}`);
      assert(!/\s/.test(koan.answer), `Answer must be one word: ${koan.answer}`);
      assert(!koan.before.includes('____') && !koan.after.includes('____'), 'Literal blank outside input');
      const sentence = `${koan.before}___${koan.after}`;
      assert(!sentences.has(sentence), `Duplicate sentence: ${sentence}`);
      sentences.add(sentence);
      total += 1;
      if (koan.code) withCode += 1;
    }
  }
}

const codeRatio = withCode / total;
assert(codeRatio >= 0.03 && codeRatio <= 0.05, `Code ratio ${codeRatio} outside 3–5%`);
console.log(`${courses.length} courses, ${courses.reduce((n, c) => n + c.sets.length, 0)} reading sets, ${total} koans, ${withCode} code references (${(100 * codeRatio).toFixed(1)}%).`);
