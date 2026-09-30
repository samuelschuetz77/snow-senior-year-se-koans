const app = document.querySelector('#app');
const params = new URLSearchParams(location.search);
const course = window.KOAN_COURSES.find(item => item.id === params.get('course'));
const set = course?.sets.find(item => item.id === params.get('set'));

function element(tag, attributes = {}, text = '') {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, value);
  node.textContent = text;
  return node;
}

function listPage(title, items, backHref) {
  app.className = 'listing';
  document.body.classList.add('listing-page');
  if (backHref) app.append(element('a', { class: 'back', href: backHref }, '← All classes'));
  app.append(element('h1', {}, title));
  const nav = element('nav', { class: backHref ? 'reading-list' : 'course-list' });
  const controls = element('div', { class: 'pagination' });
  const previous = element('button', { type: 'button' }, 'Previous');
  const position = element('span', { 'aria-live': 'polite' });
  const next = element('button', { type: 'button' }, 'Next');
  controls.append(previous, position, next);
  app.append(nav, controls);
  let page = 0;
  let pageSize = items.length;

  function renderPage() {
    const height = window.visualViewport?.height ?? window.innerHeight;
    pageSize = Math.min(items.length, Math.max(1, Math.floor((height - 190) / (window.innerWidth <= 600 ? 72 : 62))));
    page = Math.min(page, Math.ceil(items.length / pageSize) - 1);
    const draw = () => {
      nav.replaceChildren();
      for (const item of items.slice(page * pageSize, (page + 1) * pageSize)) {
        const link = element('a', { href: item.href });
        link.append(element('span', {}, item.title));
        if (item.detail) link.append(element('small', {}, item.detail));
        nav.append(link);
      }
      const pages = Math.ceil(items.length / pageSize);
      controls.hidden = pages <= 1;
      position.textContent = `${page + 1} / ${pages}`;
      previous.disabled = page === 0;
      next.disabled = page === pages - 1;
    };
    draw();
    while (app.scrollHeight > app.clientHeight && pageSize > 1) {
      pageSize -= 1;
      page = Math.min(page, Math.ceil(items.length / pageSize) - 1);
      draw();
    }
  }

  previous.addEventListener('click', () => { page -= 1; renderPage(); });
  next.addEventListener('click', () => { page += 1; renderPage(); });
  window.addEventListener('resize', renderPage);
  window.visualViewport?.addEventListener('resize', renderPage);
  renderPage();
}

if (!course) {
  listPage('Snow Senior Year SE Koans', window.KOAN_COURSES.map(item => ({
    title: item.title,
    href: `?course=${encodeURIComponent(item.id)}`
  })));
} else if (!set) {
  listPage(course.title, course.sets.map(item => ({
    title: item.title,
    detail: item.due || '',
    href: `?course=${encodeURIComponent(course.id)}&set=${encodeURIComponent(item.id)}`
  })), './');
} else {
  document.title = `${set.title} · Snow Senior Year SE Koans`;
  app.className = 'player';
  document.body.classList.add('playing');
  const wrapper = element('div', { class: 'player-inner' });
  const code = element('pre', { class: 'code-sample' });
  const form = element('form', { autocomplete: 'off' });
  const label = element('label', { class: 'sr-only', for: 'answer' }, 'Missing word');
  const sentence = element('div', { class: 'sentence' });
  const explanation = element('p', { class: 'explanation', hidden: '' });
  const expoundToggle = element('button', { class: 'expound-toggle', type: 'button', 'aria-controls': 'expound-text', 'aria-expanded': 'false', hidden: '' }, 'Expound');
  const expound = element('p', { class: 'expound', id: 'expound-text', hidden: '' });
  const feedback = element('div', { class: 'sr-only', id: 'feedback', 'aria-live': 'polite' });
  const restart = element('button', { class: 'restart', type: 'button' }, 'Restart');
  form.append(label, sentence, explanation, expoundToggle, expound);
  wrapper.append(code, form, feedback);
  app.append(wrapper, restart);

  const progressVersion = course.id === 'software-practicum' && set.id === '5' ? 'v2' : 'v1';
  const storageKey = `snow-koans:${progressVersion}:${course.id}:${set.id}`;
  const saved = Number(localStorage.getItem(storageKey));
  let index = Number.isInteger(saved) && saved >= 0 && saved <= set.koans.length ? saved : 0;
  let advancing = false;
  let enterCount = 0;
  let advanceTimer;
  const normalize = value => value.trim().toLocaleLowerCase().replace(/[.!?]+$/, '');

  function fitPlayer() {
    wrapper.style.transform = '';
    const height = window.visualViewport?.height ?? window.innerHeight;
    const available = Math.max(100, height - 24);
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
    input.style.width = `${Math.min(maxWidth, Math.max(baseWidth, textWidth * fontSize / baseFontSize + 20))}px`;
  }

  function render() {
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
    if (index === set.koans.length) {
      code.hidden = true;
      sentence.textContent = 'Complete.';
      requestAnimationFrame(fitPlayer);
      return;
    }
    const koan = set.koans[index];
    code.hidden = !koan.code;
    code.textContent = koan.code || '';
    const input = element('input', { id: 'answer', type: 'text', autocomplete: 'off', autocapitalize: 'none', inputmode: 'text', 'aria-label': 'Missing word', 'aria-describedby': 'feedback' });
    input.spellcheck = false;
    if (koan.blankChars) input.style.width = `${koan.blankChars}ch`;
    sentence.replaceChildren(document.createTextNode(koan.before), input, document.createTextNode(koan.after));
    input.dataset.baseWidth = String(input.getBoundingClientRect().width);
    input.dataset.baseFontSize = String(parseFloat(getComputedStyle(input).fontSize));
    fitInput(input);
    if (!window.matchMedia('(pointer:coarse)').matches) input.focus({ preventScroll: true });
    requestAnimationFrame(fitPlayer);
  }

  function check(showWrong = false) {
    if (advancing || index === set.koans.length) return;
    const input = sentence.querySelector('input');
    const koan = set.koans[index];
    const value = normalize(input.value);
    const accepted = [koan.answer, ...(koan.accepts || [])].map(normalize);
    if (accepted.includes(value)) {
      advancing = true;
      input.classList.remove('wrong');
      input.classList.add('correct');
      input.disabled = true;
      feedback.textContent = 'Correct.';
      advanceTimer = setTimeout(() => {
        index += 1;
        localStorage.setItem(storageKey, String(index));
        render();
      }, 750);
    } else if (showWrong && value) {
      input.classList.add('wrong');
      feedback.textContent = 'Try another word.';
    }
  }

  form.addEventListener('input', () => {
    const input = sentence.querySelector('input');
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
      const input = sentence.querySelector('input');
      input.value = '';
      input.classList.remove('wrong');
      input.classList.add('revealed');
      input.placeholder = set.koans[index].answer;
      fitInput(input, input.placeholder);
      explanation.textContent = set.koans[index].why;
      explanation.hidden = false;
      expound.textContent = set.koans[index].expound;
      expoundToggle.hidden = false;
      feedback.textContent = `Answer: ${set.koans[index].answer}. ${set.koans[index].why}`;
      input.blur();
      requestAnimationFrame(fitPlayer);
    }
  });
  expoundToggle.addEventListener('click', () => {
    const opening = expound.hidden;
    expound.hidden = !opening;
    sentence.hidden = opening;
    explanation.hidden = opening;
    code.hidden = opening || !set.koans[index].code;
    expoundToggle.textContent = opening ? 'Back to koan' : 'Expound';
    expoundToggle.setAttribute('aria-expanded', String(opening));
    requestAnimationFrame(fitPlayer);
  });
  restart.addEventListener('click', () => {
    clearTimeout(advanceTimer);
    index = 0;
    localStorage.setItem(storageKey, '0');
    render();
  });
  window.addEventListener('resize', () => {
    const input = sentence.querySelector('input');
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
}
