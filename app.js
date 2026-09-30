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
  if (backHref) app.append(element('a', { class: 'back', href: backHref }, '← All classes'));
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
} else if (!set) {
  listPage(course.title, course.sets.map(item => ({
    title: item.title,
    detail: item.due || '',
    href: `?course=${encodeURIComponent(course.id)}&set=${encodeURIComponent(item.id)}`
  })), './');
} else {
  document.title = `${set.title} · Snow Senior Year SE Koans`;
  app.className = 'player';
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

  function render() {
    advancing = false;
    enterCount = 0;
    feedback.textContent = '';
    explanation.hidden = true;
    explanation.textContent = '';
    expoundToggle.hidden = true;
    expoundToggle.setAttribute('aria-expanded', 'false');
    expound.hidden = true;
    expound.textContent = '';
    if (index === set.koans.length) {
      code.hidden = true;
      sentence.textContent = 'Complete.';
      return;
    }
    const koan = set.koans[index];
    code.hidden = !koan.code;
    code.textContent = koan.code || '';
    const input = element('input', { id: 'answer', type: 'text', autocomplete: 'off', autocapitalize: 'none', inputmode: 'text', 'aria-label': 'Missing word', 'aria-describedby': 'feedback' });
    input.spellcheck = false;
    if (koan.blankChars) input.style.width = `${koan.blankChars}ch`;
    sentence.replaceChildren(document.createTextNode(koan.before), input, document.createTextNode(koan.after));
    input.focus();
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
    sentence.querySelector('input').classList.remove('wrong', 'revealed');
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
      input.style.width = `${set.koans[index].answer.length + 1}ch`;
      input.placeholder = set.koans[index].answer;
      explanation.textContent = set.koans[index].why;
      explanation.hidden = false;
      expound.textContent = set.koans[index].expound;
      expoundToggle.hidden = false;
      feedback.textContent = `Answer: ${set.koans[index].answer}. ${set.koans[index].why}`;
    }
  });
  expoundToggle.addEventListener('click', () => {
    expound.hidden = !expound.hidden;
    expoundToggle.setAttribute('aria-expanded', String(!expound.hidden));
  });
  restart.addEventListener('click', () => {
    clearTimeout(advanceTimer);
    index = 0;
    localStorage.setItem(storageKey, '0');
    render();
  });
  render();
}
