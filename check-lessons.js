const assert = require('node:assert/strict');
global.window = { KOAN_COURSES: [] };
for (const name of ['additional-koans', 'wengrow-volume-1-later', 'wengrow-volume-2', 'textbook-lessons']) require(`./data/${name}.js`);
const lessons = window.KOAN_LESSONS;
const sets = window.KOAN_COURSES[0].sets;
const used = new Set();
let count = 0;
for (const set of sets) {
  for (const [i, koan] of set.koans.entries()) {
    assert(lessons[koan.lessonId], `${set.id} #${i + 1}: missing beginner lesson`);
    assert(koan.expoundText, `${set.id} #${i + 1}: missing individual application`);
    used.add(koan.lessonId);
    count++;
  }
}
assert.equal(count, 440);
for (const [id, lesson] of Object.entries(lessons)) {
  assert(used.has(id), `Unassigned lesson: ${id}`);
  assert(lesson.title && lesson.intro.length >= 2 && lesson.terms.length >= 3 && lesson.steps.length >= 3 && lesson.pitfalls.length && lesson.check.length === 2, `Incomplete lesson: ${id}`);
  const text = [...lesson.intro, ...lesson.terms.flat(), ...lesson.steps, ...lesson.pitfalls, ...lesson.check].join(' ');
  assert(text.split(/\s+/).length >= 180, `Lesson too thin: ${id}`);
  const diagram = lesson.diagram;
  assert(diagram.caption, `Missing caption: ${id}`);
  if (diagram.nodes) {
    assert(diagram.title && diagram.description, `Missing accessible SVG description: ${id}`);
    const nodes = new Map(diagram.nodes.map(node => [node.id, node]));
    assert.equal(nodes.size, diagram.nodes.length, `Duplicate node ID: ${id}`);
    for (const node of nodes.values()) {
      assert(node.label && Number.isFinite(node.x) && Number.isFinite(node.y));
      assert(node.x >= 30 && node.x <= (diagram.width || 540) - 30);
      assert(node.y >= 30 && node.y <= (diagram.height || 280) - 30);
    }
    for (const [from, to] of diagram.edges) assert(nodes.has(from) && nodes.has(to) && from !== to, `Invalid graph edge: ${id}`);
  } else {
    assert(diagram.steps.length >= 3 && diagram.steps.every(step => step.length === 2 && step.every(Boolean)), `Incomplete flow diagram: ${id}`);
  }
}
const graph = sets.find(set => set.id === 'wengrow-python-vol1-graphs');
assert(graph.koans.slice(13).every(koan => koan.lessonId === 'dijkstra'));
assert.equal(graph.koans[4].lessonId, 'dfs');
assert.equal(graph.koans[7].lessonId, 'bfs');
// Check the authored Dijkstra diagram against independently computed shortest paths.
const distances = { a: 0, b: Infinity, c: Infinity, d: Infinity };
for (let pass = 0; pass < 3; pass++) {
  for (const [from, to, weight] of lessons.dijkstra.diagram.edges) distances[to] = Math.min(distances[to], distances[from] + Number(weight));
}
assert.deepEqual(distances, { a: 0, b: 3, c: 2, d: 5 });
console.log(`Beginner expounds: ${count} koans across ${sets.length} sets; ${used.size} illustrated concept lessons validated.`);
