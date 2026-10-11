import { getDocument, GlobalWorkerOptions } from './vendor/pdfjs/pdf.min.js';
GlobalWorkerOptions.workerSrc = new URL('./vendor/pdfjs/pdf.worker.min.js', import.meta.url).href;
const status = document.querySelector('#status');
const pages = document.querySelector('#pages');
let pdf;
let zoom = 1;
let generation = 0;
let resizeTimer;
function focusPage() {
  const requested = new URLSearchParams(location.hash.slice(1)).get('page') || '1';
  document.querySelector(`#pdf-page-${requested === '2' ? 2 : 1}`)?.scrollIntoView();
}
async function render() {
  if (!pdf) return;
  const current = ++generation;
  const rendered = document.createDocumentFragment();
  const width = Math.max(240, document.documentElement.clientWidth - 32) * zoom;
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: width / page.getViewport({ scale: 1 }).width });
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const canvas = document.createElement('canvas');
    canvas.width = Math.ceil(viewport.width * ratio);
    canvas.height = Math.ceil(viewport.height * ratio);
    canvas.style.width = `${viewport.width}px`;
    canvas.style.height = `${viewport.height}px`;
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', `PDF exhibit page ${i}. The equivalent text is available under Read exhibit as text in the parent panel.`);
    await page.render({ canvasContext: canvas.getContext('2d'), viewport, transform: [ratio,0,0,ratio,0,0] }).promise;
    if (current !== generation) return;
    const article = document.createElement('article');
    article.id = `pdf-page-${i}`;
    article.append(canvas);
    rendered.append(article);
  }
  if (current !== generation) return;
  pages.replaceChildren(rendered);
  status.textContent = '';
  focusPage();
}
try {
  const relative = new URLSearchParams(location.search).get('file') || '';
  if (!/^exhibits\/corporate-finance\/chapter-[1-5]\.pdf$/.test(relative)) throw new Error('Unknown exhibit');
  pdf = await getDocument({
    url: new URL(relative, location.href).href,
    standardFontDataUrl: new URL('./vendor/pdfjs/standard_fonts/', import.meta.url).href
  }).promise;
  await render();
} catch (error) {
  status.textContent = 'The embedded PDF could not load. Use Open PDF in a new tab or Read exhibit as text in the exhibit panel.';
  console.error('PDF exhibit:', error);
}
window.addEventListener('hashchange', focusPage);
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => render().catch(console.error), 150);
});
for (const [id, delta] of [['zoom-in',.25],['zoom-out',-.25]]) {
  document.querySelector(`#${id}`).addEventListener('click', () => {
    zoom = Math.max(.75, Math.min(2, zoom + delta));
    render().catch(console.error);
  });
}
