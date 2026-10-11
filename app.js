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
  const code = element('pre', { class: 'code-sample' });
  const form = element('form', { autocomplete: 'off' });
  const label = element('label', { class: 'sr-only', for: 'answer' }, 'Missing word');
  const sentence = element('div', { class: 'sentence' });
  const explanation = element('p', { class: 'explanation', hidden: '' });
  const expoundToggle = element('button', { class: 'expound-toggle', type: 'button', 'aria-controls': 'expound-text', 'aria-expanded': 'false', hidden: '' }, 'Expound');
  const expound = element('article', { class: 'expound', id: 'expound-text', hidden: '' });
  const feedback = element('div', { class: 'sr-only', id: 'feedback', 'aria-live': 'polite' });
  const restart = element('button', { class: 'restart', type: 'button' }, 'Restart');
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
  form.append(code, label, sentence, amountHelp, exhibitToggle, explanation, expoundToggle, expound);
  wrapper.append(form, feedback);
  app.append(wrapper, restart);

  const progressVersion = course.id === 'software-practicum' && set.id === '5' ? 'v2' : 'v1';
  const storageKey = `snow-koans:${progressVersion}:${course.id}:${set.id}`;
  const saved = Number(localStorage.getItem(storageKey));
  let index = Number.isInteger(saved) && saved >= 0 && saved <= set.koans.length ? saved : 0;
  let advancing = false;
  let enterCount = 0;
  let advanceTimer;
  const normalize = value => value.trim().toLocaleLowerCase().replace(/[.!?]+$/, '');

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
    if (index === set.koans.length) {
      showExhibit(false);
      exhibitToggle.hidden = true;
      amountHelp.hidden = true;
      code.hidden = true;
      sentence.textContent = 'Complete.';
      requestAnimationFrame(fitPlayer);
      return;
    }
    const koan = set.koans[index];
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
    const koan = set.koans[index];
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
        index += 1;
        localStorage.setItem(storageKey, String(index));
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
      input.value = '';
      input.classList.remove('wrong');
      input.classList.add('revealed');
      input.placeholder = set.koans[index].answer;
      fitInput(input, input.placeholder);
      explanation.textContent = set.koans[index].why;
      explanation.hidden = false;
      if (typeof window.KOAN_EXPOUND_VIEW === 'function') {
        window.KOAN_EXPOUND_VIEW(expound, set.koans[index], set);
      } else {
        expound.textContent = set.koans[index].expound;
      }
      expoundToggle.hidden = false;
      feedback.textContent = `Answer: ${set.koans[index].answer}. ${set.koans[index].why}`;
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
    expoundToggle.textContent = opening ? 'Back to koan' : 'Expound';
    expoundToggle.setAttribute('aria-expanded', String(opening));
    if (opening) window.scrollTo(0, 0);
    if (!opening) form.querySelector('input')?.focus({ preventScroll: true });
    requestAnimationFrame(fitPlayer);
  });
  restart.addEventListener('click', () => {
    clearTimeout(advanceTimer);
    showExhibit(false);
    index = 0;
    localStorage.setItem(storageKey, '0');
    render();
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
