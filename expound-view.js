(() => {
  const make = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  const section = (parent, title, paragraphs) => {
    const block = make('section');
    block.append(make('h2', title));
    for (const paragraph of paragraphs) block.append(make('p', paragraph));
    parent.append(block);
  };
  let diagramId = 0;
  function diagram(data) {
    const figure = make('figure', undefined, 'concept-diagram');
    if (data.nodes) {
      const ns = 'http://www.w3.org/2000/svg';
      const svgNode = (tag, attrs = {}, text) => {
        const node = document.createElementNS(ns, tag);
        for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
        if (text !== undefined) node.textContent = text;
        return node;
      };
      const id = `concept-${++diagramId}`;
      const svg = svgNode('svg', { viewBox: `0 0 ${data.width || 540} ${data.height || 280}`, role: 'img', 'aria-labelledby': `${id}-title ${id}-desc` });
      svg.append(svgNode('title', { id: `${id}-title` }, data.title), svgNode('desc', { id: `${id}-desc` }, data.description));
      const defs = svgNode('defs');
      const marker = svgNode('marker', { id: `${id}-arrow`, viewBox: '0 0 10 10', refX: 9, refY: 5, markerWidth: 6, markerHeight: 6, orient: 'auto-start-reverse' });
      marker.append(svgNode('path', { d: 'M 0 0 L 10 5 L 0 10 z', fill: 'var(--line)' }));
      defs.append(marker); svg.append(defs);
      for (const edge of data.edges) {
        const from = data.nodes.find(node => node.id === edge[0]);
        const to = data.nodes.find(node => node.id === edge[1]);
        const dx = to.x - from.x, dy = to.y - from.y;
        const length = Math.hypot(dx, dy);
        const padding = Math.min(34, length / 3);
        const attrs = { x1: from.x + dx / length * padding, y1: from.y + dy / length * padding, x2: to.x - dx / length * padding, y2: to.y - dy / length * padding, stroke: 'var(--line)', 'stroke-width': 2 };
        if (edge[3]) attrs['marker-end'] = `url(#${id}-arrow)`;
        svg.append(svgNode('line', attrs));
        if (edge[2]) {
          const x = (from.x + to.x) / 2, y = (from.y + to.y) / 2 - 9;
          svg.append(svgNode('text', { x, y, 'text-anchor': 'middle', class: 'edge-label' }, edge[2]));
        }
      }
      for (const node of data.nodes) {
        svg.append(svgNode('circle', { cx: node.x, cy: node.y, r: 30, fill: node.highlight ? 'var(--soft)' : 'var(--paper)', stroke: 'var(--line)', 'stroke-width': 2 }));
        svg.append(svgNode('text', { x: node.x, y: node.y + 6, 'text-anchor': 'middle', class: 'node-label' }, node.label));
      }
      figure.append(svg);
    } else {
      const list = make('ol', undefined, 'concept-flow');
      for (const [title, detail] of data.steps) {
        const item = make('li'); item.append(make('strong', title), make('span', detail)); list.append(item);
      }
      figure.append(list);
    }
    figure.append(make('figcaption', data.caption));
    return figure;
  }
  window.KOAN_EXPOUND_VIEW = (target, koan, set) => {
    target.replaceChildren();
    const lesson = window.KOAN_LESSONS?.[koan.lessonId];
    if (!lesson) { target.append(make('p', koan.expound)); return; }
    target.append(make('h1', lesson.title));
    for (const paragraph of lesson.intro) target.append(make('p', paragraph));
    const glossary = make('dl', undefined, 'concept-terms');
    for (const [term, meaning] of lesson.terms) glossary.append(make('dt', term), make('dd', meaning));
    target.append(glossary, diagram(lesson.diagram));
    const walkthrough = make('section'); walkthrough.append(make('h2', 'Work through an example'));
    const steps = make('ol');
    for (const step of lesson.steps) steps.append(make('li', step));
    walkthrough.append(steps); target.append(walkthrough);
    if (koan.code) {
      target.append(make('h2', 'The code in this koan'));
      const sample = make('pre', undefined, 'concept-code');
      sample.append(make('code', koan.statement ? koan.code.replace('___', koan.answer) : koan.code));
      target.append(sample);
    }
    section(target, 'Apply it to this koan', [koan.expoundText]);
    const completed = koan.statement || `${koan.before}${koan.answer}${koan.after}`;
    target.append(make('blockquote', completed, 'completed-koan'));
    section(target, 'What to watch for', lesson.pitfalls);
    const check = make('details', undefined, 'concept-check');
    check.append(make('summary', `Check your understanding: ${lesson.check[0]}`), make('p', lesson.check[1]));
    target.append(check, make('p', `Source: ${set.source}. Diagram and worked example are original teaching illustrations.`, 'concept-source'));
    const notation = make('details', undefined, 'concept-check');
    notation.append(make('summary', 'New to algorithm cost notation?'));
    notation.append(make('p', 'Complexity describes how work or memory grows with input size. Usually n counts input items; V and E count graph vertices and edges. Big O gives an upper growth bound under stated assumptions, rather than an exact number of seconds.'));
    const costs = make('dl', undefined, 'concept-terms');
    for (const [term, meaning] of [
      ['O(1), constant', 'The counted work stays bounded as input size grows, such as reading one known array position in the usual memory model.'],
      ['O(log n), logarithmic', 'Repeatedly halving the remaining problem produces slowly growing work: about ten halvings reduce 1,024 items to one.'],
      ['O(n), linear', 'Work grows in proportion to the item count, as when scanning every item once.'],
      ['O(n log n)', 'About logarithmically many levels, with linear total work per level, as in standard mergesort.'],
      ['O(n²), quadratic', 'Work can grow like the square of the item count, as when comparing every pair. Doubling n can roughly quadruple this work.'],
      ['Expected, worst-case, and amortized', 'Expected cost averages over a stated random model; worst-case cost bounds the most costly allowed case; amortized cost spreads the total over a sequence of operations. None means every individual operation takes the same time.']
    ]) costs.append(make('dt', term), make('dd', meaning));
    notation.append(costs); target.append(notation);
  };
})();
