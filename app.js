const app = document.querySelector('#app');
const params = new URLSearchParams(location.search);
const course = window.KOAN_COURSES.find(item => item.id === params.get('course'));
const set = course?.sets.find(item => item.id === params.get('set'));
const book = course?.books?.find(item => item.id === params.get('book'));
const codeTrack = course?.id === 'frontend-development' && params.get('track') === 'code-centric';

function element(tag, attributes = {}, text = '') {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, value);
  node.textContent = text;
  return node;
}

function listPage(title, items, backHref, backLabel = '← All classes') {
  app.className = 'listing';
  document.body.classList.add('listing-page');
  if (backHref) app.append(element('a', { class: 'back', href: backHref }, backLabel));
  app.append(element('h1', {}, title));
  const nav = element('nav', { class: backHref ? 'reading-list' : 'course-list' });
  for (const item of items) {
    const link = element('a', { href: item.href });
    link.append(element('span', {}, item.title));
    if (item.detail) link.append(element('small', {}, item.detail));
    nav.append(link);
  }
  app.append(nav);
}

if (!course) {
  listPage('Snow Senior Year SE Koans', window.KOAN_COURSES.map(item => ({
    title: item.title,
    href: `?course=${encodeURIComponent(item.id)}`
  })));
} else if (!set && course.books && !book) {
  listPage(course.title, course.books.map(item => ({
    title: item.title,
    detail: item.author,
    href: `?course=${encodeURIComponent(course.id)}&book=${encodeURIComponent(item.id)}`
  })), './', '← Home');
} else if (!set) {
  const items = course.sets.filter(item => book ? item.bookId === book.id : codeTrack ? item.track === 'code-centric' : !item.track).map(item => ({
    title: item.title,
    detail: item.due || '',
    href: `?course=${encodeURIComponent(course.id)}${book ? `&book=${encodeURIComponent(book.id)}` : ''}&set=${encodeURIComponent(item.id)}`
  }));
  if (course.id === 'frontend-development' && !codeTrack) {
    items.unshift({ title: 'Code-centric koans', detail: '10 sets · React day one to advanced', href: '?course=frontend-development&track=code-centric' });
  }
  listPage(book ? book.title : codeTrack ? 'Code-centric koans' : course.title, items,
    book ? `?course=${encodeURIComponent(course.id)}` : codeTrack ? '?course=frontend-development' : './',
    book ? `← ${course.title}` : codeTrack ? '← Frontend Development' : '← All classes');
} else {
  document.title = `${set.title} · Snow Senior Year SE Koans`;
  app.className = 'player';
  document.body.classList.add('playing');
  const wrapper = element('div', { class: 'player-inner' });
  const flowDiagram = element('figure', { class: 'flow-diagram' });
  const code = element('pre', { class: 'code-sample' });
  const form = element('form', { autocomplete: 'off' });
  const label = element('label', { class: 'sr-only', for: 'answer' }, 'Missing word');
  const rememberNotice = element('p', { class: 'remember-notice', hidden: '' });
  const sentence = element('div', { class: 'sentence' });
  const flowGuide = element('details', { class: 'flow-guide' });
  flowGuide.append(element('summary', {}, 'Max flow in plain English'), element('p', {},
    'Max flow asks how much can travel from the start node (source) to the end node (sink). Each directed pipe has a capacity: the most it can carry. Start with zero flow. Find a route whose pipes still have room. Send the smallest amount of room on that route. Reduce the forward room by that amount; increase the backward room so you can undo and reroute it later. Repeat: find a route, send the smallest room, update both directions. Stop when no route with room reaches the sink.'));
  const flowDefinitions = element('aside', { class: 'flow-definitions', 'aria-label': 'Terms used in this question' });
  const explanation = element('p', { class: 'explanation', hidden: '' });
  const expoundToggle = element('button', { class: 'expound-toggle', type: 'button', 'aria-controls': 'expound-text', 'aria-expanded': 'false', hidden: '' }, 'Expound');
  const expound = element('article', { class: 'expound', id: 'expound-text', hidden: '' });
  const feedback = element('div', { class: 'sr-only', id: 'feedback', 'aria-live': 'polite' });
  const restart = element('button', { class: 'restart', type: 'button' }, 'Restart');
  const previous = set.id === 'max-flow-code'
    ? element('button', { class: 'previous', type: 'button' }, 'Previous') : null;
  const rememberButton = previous
    ? element('button', { class: 'remember-button', type: 'button', 'aria-pressed': 'false' }, 'Remember: Off') : null;
  if (previous) document.body.classList.add('max-flow-koan');
  if (previous) flowGuide.open = true;
  const amountHelp = element('p', { class: 'amount-help', id: 'amount-help', hidden: '' }, 'Enter dollars, rounded to the nearest cent. Press Enter to check.');
  const exhibitToggle = element('button', { class: 'exhibit-toggle', type: 'button', 'aria-controls': 'exhibit-panel', 'aria-expanded': 'false', hidden: '' }, 'Show PDF exhibit');
  const exhibitPanel = element('aside', { class: 'exhibit-panel', id: 'exhibit-panel', hidden: '', 'aria-label': 'Financial exhibit' });
  const exhibitHeading = element('h2');
  const exhibitLink = element('a', { target: '_blank', rel: 'noopener' }, 'Open PDF in a new tab');
  const exhibitClose = element('button', { type: 'button', class: 'exhibit-close' }, 'Hide PDF');
  const exhibitFrame = element('iframe', { class: 'exhibit-frame', title: 'Financial worksheet PDF' });
  const exhibitText = element('details', { class: 'exhibit-transcript' });
  const exhibitTextBody = element('pre');
  exhibitText.append(element('summary', {}, 'Read exhibit as text'), exhibitTextBody);
  exhibitPanel.append(exhibitHeading, exhibitClose, exhibitLink, exhibitFrame, exhibitText);
  document.body.append(exhibitPanel);
  form.append(rememberNotice, flowDiagram, code, label, sentence, flowGuide, flowDefinitions, amountHelp, exhibitToggle, explanation, expoundToggle, expound);
  wrapper.append(form, feedback);
  app.append(wrapper, ...(previous ? [previous, rememberButton] : []), restart);

  const progressVersion = course.id === 'software-practicum' && set.id === '5' ? 'v2'
    : set.id === 'max-flow-code' ? 'v3' : 'v1';
  const storageKey = `snow-koans:${progressVersion}:${course.id}:${set.id}`;
  const saved = Number(localStorage.getItem(storageKey));
  let index = Number.isInteger(saved) && saved >= 0 && saved <= set.koans.length ? saved : 0;
  let advancing = false;
  let enterCount = 0;
  let advanceTimer;
  const rememberKey = `${storageKey}:remember`;
  let rememberEnabled = !!rememberButton && localStorage.getItem(rememberKey) === 'on';
  let rememberPhase = 'normal';
  let breakIndex = 0;
  const memoryBreak = [
    { before: 'In the familiar rhyme, roses are ', answer: 'red', after: '.', why: 'The rhyme begins “Roses are red.”' },
    { before: 'In the same rhyme, violets are ', answer: 'blue', after: '.', why: 'The rhyme pairs violets with blue.' },
    { before: 'A triangle has ', answer: 'three', after: ' sides.', why: 'A triangle has three sides and three corners.', accepts: ['3'] }
  ];
  const currentKoan = () => rememberPhase === 'break' ? memoryBreak[breakIndex] : set.koans[index];
  const normalize = value => value.trim().toLocaleLowerCase().replace(/[.!?]+$/, '');

  function syncRememberButton() {
    if (!rememberButton) return;
    rememberButton.textContent = rememberEnabled ? 'Remember: On' : 'Remember: Off';
    rememberButton.setAttribute('aria-pressed', String(rememberEnabled));
  }

  function drawFlowDiagram(data) {
    flowDiagram.replaceChildren();
    flowDiagram.hidden = !data;
    if (!data) return;
    const ns = 'http://www.w3.org/2000/svg';
    const svgItem = (tag, attributes, content = '') => {
      const item = document.createElementNS(ns, tag);
      for (const [key, value] of Object.entries(attributes)) item.setAttribute(key, value);
      item.textContent = content;
      return item;
    };
    const svg = svgItem('svg', { viewBox: '0 0 520 220', role: 'img', 'aria-label': data.description });
    const nodes = new Map(data.nodes.map(([id, x, y]) => [id, { x, y }]));
    for (const [from, to, label, flow, offset = 0, kind = 'forward'] of data.edges) {
      const a = nodes.get(from);
      const b = nodes.get(to);
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const length = Math.hypot(dx, dy);
      const ux = dx / length;
      const uy = dy / length;
      const shiftX = -uy * offset;
      const shiftY = ux * offset;
      const x1 = a.x + ux * 25 + shiftX;
      const y1 = a.y + uy * 25 + shiftY;
      const x2 = b.x - ux * 27 + shiftX;
      const y2 = b.y - uy * 27 + shiftY;
      svg.append(svgItem('line', { x1, y1, x2, y2, class: kind === 'reverse' ? 'flow-pipe reverse' : 'flow-pipe' }));
      if (flow) svg.append(svgItem('line', { x1, y1, x2, y2, class: 'flow-water' }));
      const baseX = x2 - ux * 12;
      const baseY = y2 - uy * 12;
      const points = `${x2},${y2} ${baseX - uy * 6},${baseY + ux * 6} ${baseX + uy * 6},${baseY - ux * 6}`;
      svg.append(svgItem('polygon', { points, class: kind === 'reverse' ? 'flow-arrow reverse' : flow ? 'flow-arrow flowing' : 'flow-arrow' }));
      const labelX = (a.x + b.x) / 2 + shiftX - uy * 15;
      const labelY = (a.y + b.y) / 2 + shiftY + ux * 15;
      const labelWidth = String(label).length * 8 + 16;
      svg.append(svgItem('rect', { x: labelX - labelWidth / 2, y: labelY - 15, width: labelWidth, height: 29, rx: 6, class: 'flow-label-bg' }));
      svg.append(svgItem('text', { x: labelX, y: labelY + 5, class: 'flow-label' }, String(label)));
    }
    for (const [id, point] of nodes) {
      svg.append(svgItem('circle', { cx: point.x, cy: point.y, r: 22, class: 'flow-node' }));
      svg.append(svgItem('text', { x: point.x, y: point.y + 6, class: 'flow-node-label' }, id));
    }
    const caption = element('figcaption', {}, data.caption);
    caption.append(element('span', { class: 'flow-glossary' },
      'Room = residual capacity, the amount still available. Solid: send more. Dashed: undo earlier flow.'));
    flowDiagram.append(svg, caption);
  }

  function showExhibit(open) {
    exhibitPanel.hidden = !open;
    document.body.classList.toggle('exhibit-open', open);
    exhibitToggle.textContent = open ? 'Hide PDF exhibit' : 'Show PDF exhibit';
    exhibitToggle.setAttribute('aria-expanded', String(open));
    if (open) {
      const page = set.koans[index].exhibitPage || 1;
      const viewerUrl = `pdf-viewer.html?file=${encodeURIComponent(set.exhibit.url)}#page=${page}`;
      if (exhibitFrame.getAttribute('src') !== viewerUrl) exhibitFrame.src = viewerUrl;
      exhibitLink.href = `${set.exhibit.url}#page=${page}&view=FitH`;
    }
    requestAnimationFrame(fitPlayer);
  }

  function fitPlayer() {
    wrapper.style.transform = '';
    if (document.body.classList.contains('expound-open')) return;
    const height = window.visualViewport?.height ?? window.innerHeight;
    const available = Math.max(100, Math.min(height, app.clientHeight) - (exhibitPanel.hidden ? 72 : 24));
    const scale = Math.min(1, available / Math.max(wrapper.scrollHeight, 1));
    wrapper.style.transform = `scale(${scale})`;
  }

  function syncViewport() {
    const viewport = window.visualViewport;
    document.documentElement.style.setProperty('--visual-height', `${viewport?.height ?? window.innerHeight}px`);
    document.documentElement.style.setProperty('--visual-top', `${viewport?.offsetTop ?? 0}px`);
    requestAnimationFrame(fitPlayer);
  }

  function fitInput(input, text = input.value) {
    const maxWidth = Math.max(80, Math.min(sentence.clientWidth - 8, window.innerWidth - 48));
    const baseWidth = Number(input.dataset.baseWidth);
    const baseFontSize = Number(input.dataset.baseFontSize);
    const style = getComputedStyle(input);
    const canvas = fitInput.canvas ??= document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = `${style.fontWeight} ${baseFontSize}px ${style.fontFamily}`;
    const textWidth = context.measureText(text).width;
    const targetWidth = Math.max(baseWidth, textWidth + 20);
    const fontSize = targetWidth > maxWidth
      ? Math.max(16, baseFontSize * (maxWidth - 20) / Math.max(textWidth, 1))
      : baseFontSize;
    input.style.fontSize = `${fontSize}px`;
    const hintCursor = input.nextElementSibling;
    if (hintCursor) {
      hintCursor.textContent = input.placeholder;
      hintCursor.style.fontSize = `${fontSize}px`;
    }
    input.style.width = `${Math.min(maxWidth, Math.max(baseWidth, textWidth * fontSize / baseFontSize + 20))}px`;
  }

  function render() {
    if (previous) previous.disabled = index === 0 && rememberPhase === 'normal';
    syncRememberButton();
    document.body.classList.remove('expound-open');
    advancing = false;
    enterCount = 0;
    feedback.textContent = '';
    sentence.hidden = false;
    explanation.hidden = true;
    explanation.textContent = '';
    expoundToggle.hidden = true;
    expoundToggle.textContent = 'Expound';
    expoundToggle.setAttribute('aria-expanded', 'false');
    expound.hidden = true;
    expound.textContent = '';
    rememberNotice.hidden = rememberPhase === 'normal';
    rememberNotice.textContent = rememberPhase === 'break'
      ? `Memory break ${breakIndex + 1} of 3` : rememberPhase === 'recall'
        ? 'Now answer the Max Flow question again.' : '';
    flowGuide.hidden = !previous || rememberPhase === 'break';
    flowDefinitions.hidden = !previous || rememberPhase === 'break';
    if (index === set.koans.length) {
      showExhibit(false);
      exhibitToggle.hidden = true;
      amountHelp.hidden = true;
      flowDiagram.hidden = true;
      code.hidden = true;
      sentence.textContent = 'Complete.';
      requestAnimationFrame(fitPlayer);
      return;
    }
    const koan = currentKoan();
    if (previous && rememberPhase !== 'break') {
      flowDefinitions.replaceChildren(...(koan.definitions || []).map(([term, meaning]) =>
        element('span', {}, `${term}: ${meaning}`)));
    }
    drawFlowDiagram(koan.diagram);
    const currency = koan.answerType === 'currency';
    amountHelp.hidden = !currency;
    label.textContent = currency ? 'Missing amount in dollars' : 'Missing word';
    exhibitToggle.hidden = !set.exhibit;
    if (set.exhibit) {
      exhibitHeading.textContent = set.exhibit.title;
      exhibitTextBody.textContent = set.exhibit.transcript;
      if (!exhibitPanel.hidden) showExhibit(true);
    }
    code.hidden = !koan.code;
    code.textContent = koan.code || '';
    const input = element('input', { id: 'answer', type: 'text', autocomplete: 'off', autocapitalize: 'none', inputmode: 'text', 'aria-label': 'Missing word', 'aria-describedby': 'feedback' });
    input.spellcheck = false;
    input.addEventListener('keydown', event => {
      if (event.key === 'Enter' && !event.isComposing) {
        event.preventDefault();
        form.requestSubmit();
      }
    });
    if (currency) {
      input.setAttribute('inputmode', 'decimal');
      input.setAttribute('aria-label', 'Missing amount in dollars');
      input.setAttribute('aria-describedby', 'amount-help feedback');
    }
    if (koan.blankChars) input.style.width = `${koan.blankChars}ch`;
    const answerField = element('span', { class: 'answer-field' });
    const hintCursor = element('span', { class: 'hint-cursor', 'aria-hidden': 'true' });
    answerField.append(input, hintCursor);
    if (koan.statement) {
      const [beforeCode, afterCode] = koan.code.split('___');
      code.replaceChildren(document.createTextNode(beforeCode), answerField, document.createTextNode(afterCode));
      sentence.textContent = koan.statement;
      input.setAttribute('aria-label', 'Missing code');
    } else {
      sentence.replaceChildren(document.createTextNode(koan.before), answerField, document.createTextNode(koan.after));
    }
    input.dataset.baseWidth = String(input.getBoundingClientRect().width);
    input.dataset.baseFontSize = String(parseFloat(getComputedStyle(input).fontSize));
    fitInput(input);
    input.focus({ preventScroll: true });
    requestAnimationFrame(fitPlayer);
  }

  function check(showWrong = false) {
    if (advancing || index === set.koans.length) return;
    const input = form.querySelector('input');
    const koan = currentKoan();
    const normalizeAnswer = koan.statement ? value => value.trim() : normalize;
    const value = normalizeAnswer(input.value);
    const accepted = [koan.answer, ...(koan.accepts || [])].map(normalizeAnswer);
    const currency = koan.answerType === 'currency';
    if (currency && !showWrong) return;
    const cents = currency ? window.KOAN_ANSWERS.currencyCents(input.value) : null;
    const correct = currency
      ? cents !== null && cents === window.KOAN_ANSWERS.currencyCents(koan.answer)
      : accepted.includes(value);
    if (correct) {
      advancing = true;
      input.classList.remove('wrong');
      input.classList.add('correct');
      input.disabled = true;
      feedback.textContent = 'Correct.';
      advanceTimer = setTimeout(() => {
        if (rememberEnabled && rememberButton && rememberPhase === 'normal') {
          rememberPhase = 'break';
          breakIndex = 0;
        } else if (rememberPhase === 'break' && breakIndex < memoryBreak.length - 1) {
          breakIndex += 1;
        } else if (rememberPhase === 'break') {
          rememberPhase = 'recall';
        } else {
          rememberPhase = 'normal';
          index += 1;
          localStorage.setItem(storageKey, String(index));
        }
        render();
      }, 750);
    } else if (showWrong && value) {
      input.classList.add('wrong');
      feedback.textContent = currency ? 'Check the amount and try again.' : 'Try another word.';
    }
  }

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !exhibitPanel.hidden) {
      showExhibit(false);
      exhibitToggle.focus();
      return;
    }
    if (document.body.classList.contains('expound-open') || exhibitPanel.contains(event.target) || (event.key === ' ' && event.target.closest('button, a, summary'))) return;
    const input = form.querySelector('input');
    if (!input || input.disabled) return;
    if (input.classList.contains('revealed')) input.classList.add('hint-dismissed');

    // The whole koan screen accepts typing, even after a click or Tab moves focus.
    // Leave browser shortcuts and composition events to their normal handlers.
    if (event.key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey || event.isComposing) return;
    if (document.activeElement === input) return;
    event.preventDefault();
    if (sentence.hidden) expoundToggle.click();
    input.focus({ preventScroll: true });
    input.setRangeText(event.key, input.selectionStart, input.selectionEnd, 'end');
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
  form.addEventListener('input', () => {
    const input = form.querySelector('input');
    input.classList.remove('wrong', 'revealed');
    fitInput(input);
    feedback.textContent = '';
    check();
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (advancing || index === set.koans.length) return;
    check(true);
    if (advancing) return;
    enterCount += 1;
    if (enterCount >= 5) {
      const input = form.querySelector('input');
      const koan = currentKoan();
      input.value = '';
      input.classList.remove('wrong');
      input.classList.add('revealed');
      input.placeholder = koan.answer;
      fitInput(input, input.placeholder);
      explanation.textContent = koan.why;
      explanation.hidden = false;
      if (rememberPhase !== 'break') {
        if (typeof window.KOAN_EXPOUND_VIEW === 'function') {
          window.KOAN_EXPOUND_VIEW(expound, koan, set);
        } else {
          expound.textContent = koan.expound;
        }
        expoundToggle.hidden = false;
      }
      feedback.textContent = `Answer: ${koan.answer}. ${koan.why}`;
      input.focus({ preventScroll: true });
      requestAnimationFrame(fitPlayer);
    }
  });
  expoundToggle.addEventListener('click', () => {
    const opening = expound.hidden;
    document.body.classList.toggle('expound-open', opening);
    expound.hidden = !opening;
    sentence.hidden = opening;
    amountHelp.hidden = opening || set.koans[index].answerType !== 'currency';
    explanation.hidden = opening;
    code.hidden = opening || !set.koans[index].code;
    flowDiagram.hidden = opening || !set.koans[index].diagram;
    expoundToggle.textContent = opening ? 'Back to koan' : 'Expound';
    expoundToggle.setAttribute('aria-expanded', String(opening));
    if (opening) window.scrollTo(0, 0);
    if (!opening) form.querySelector('input')?.focus({ preventScroll: true });
    requestAnimationFrame(fitPlayer);
  });
  restart.addEventListener('click', () => {
    clearTimeout(advanceTimer);
    showExhibit(false);
    rememberPhase = 'normal';
    breakIndex = 0;
    index = 0;
    localStorage.setItem(storageKey, '0');
    render();
  });
  previous?.addEventListener('click', () => {
    if (index === 0 && rememberPhase === 'normal') return;
    clearTimeout(advanceTimer);
    rememberPhase = 'normal';
    breakIndex = 0;
    index = Math.max(0, index - 1);
    localStorage.setItem(storageKey, String(index));
    render();
  });
  rememberButton?.addEventListener('click', () => {
    if (advancing) return;
    rememberEnabled = !rememberEnabled;
    localStorage.setItem(rememberKey, rememberEnabled ? 'on' : 'off');
    if (!rememberEnabled && rememberPhase !== 'normal') {
      rememberPhase = 'normal';
      breakIndex = 0;
      index += 1;
      localStorage.setItem(storageKey, String(index));
      render();
    } else {
      syncRememberButton();
    }
  });
  exhibitToggle.addEventListener('click', () => showExhibit(exhibitPanel.hidden));
  exhibitClose.addEventListener('click', () => {
    showExhibit(false);
    exhibitToggle.focus();
  });
  window.addEventListener('resize', () => {
    const input = form.querySelector('input');
    if (input) fitInput(input, input.value || input.placeholder);
    syncViewport();
  });
  form.addEventListener('focusin', () => {
    document.body.classList.add('typing');
    requestAnimationFrame(fitPlayer);
  });
  form.addEventListener('focusout', () => {
    setTimeout(() => {
      if (!form.contains(document.activeElement)) document.body.classList.remove('typing');
      requestAnimationFrame(fitPlayer);
    }, 0);
  });
  window.visualViewport?.addEventListener('resize', syncViewport);
  window.visualViewport?.addEventListener('scroll', syncViewport);
  syncViewport();
  render();
  if (set.exhibit && index < set.koans.length && params.get('exhibit') === 'open') showExhibit(true);
}
