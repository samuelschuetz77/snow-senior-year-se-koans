// DOM integration test. Requires jsdom (test-only; not a site dependency).
// Run with NODE_PATH pointing to a directory containing jsdom if needed.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="([^"?]+)/g)].map(m => m[1]);
function boot(chapter, initial=0, exhibit=false) {
  const dom = new JSDOM(html, { url:`http://localhost/?course=other-koans&set=corporate-finance-${chapter}${exhibit?'&exhibit=open':''}`, runScripts:'outside-only', pretendToBeVisual:true });
  const w=dom.window;
  w.scrollTo=()=>{}; // Layout scrolling is checked visually in the browser.
  const errors=[];
  w.addEventListener('error',event=>errors.push(event.error));
  w.HTMLCanvasElement.prototype.getContext=()=>({measureText:text=>({width:text.length*12})});
  const timers = new Map(); let nextTimer=0;
  w.setTimeout=(fn,ms)=>{timers.set(++nextTimer,{fn,ms});return nextTimer;};
  w.clearTimeout=id=>timers.delete(id);
  w.requestAnimationFrame=fn=>{fn();return 0;};
  const key=`snow-koans:v1:other-koans:corporate-finance-${chapter}`;
  w.localStorage.setItem(key,String(initial));
  w.KOAN_COURSES=[];
  for(const file of scripts) w.eval(fs.readFileSync(path.join(root,file),'utf8'));
  const d=w.document;
  return { w,d,key,dom,errors, tick(){
    const advances=[...timers.entries()].filter(([,v])=>v.ms===750);
    assert.equal(advances.length,1,'Exactly one advance should be scheduled');
    for(const [id,{fn}] of advances){timers.delete(id);fn();}
  }, fill(value){const input=d.querySelector('#answer');input.value=value;input.dispatchEvent(new w.Event('input',{bubbles:true}));},
  enter(){d.querySelector('#answer').dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true}));} };
}

for(let chapter=1;chapter<=5;chapter++){
  const t=boot(chapter);
  const set=t.w.KOAN_COURSES.find(c=>c.id==='other-koans').sets.find(s=>s.id===`corporate-finance-${chapter}`);
  const toggle=t.d.querySelector('.exhibit-toggle');
  assert(t.d.querySelector('#exhibit-panel').hidden);
  toggle.click();
  assert(!t.d.querySelector('#exhibit-panel').hidden);
  assert.equal(toggle.getAttribute('aria-expanded'),'true');
  t.d.querySelector('.exhibit-close').click();
  assert(t.d.querySelector('#exhibit-panel').hidden);
  for(const [index,q] of set.koans.entries()){
    assert(t.d.querySelector('.sentence').textContent.includes(q.before));
    if(q.answerType==='currency'){
      assert.equal(t.d.querySelector('#answer').getAttribute('inputmode'),'decimal');
      t.fill('9999999');t.enter();
      assert(t.d.querySelector('#answer').classList.contains('wrong'));
      t.fill('$'+Number(q.answer).toLocaleString('en-US',{minimumFractionDigits:2}));
      assert(!t.d.querySelector('#answer').disabled,'A correct numeric prefix must not auto-submit');
      t.enter();
    } else t.fill(q.answer);
    assert(t.d.querySelector('#answer').classList.contains('correct'));
    t.tick();
    assert.equal(t.w.localStorage.getItem(t.key),String(index+1));
  }
  assert.equal(t.d.querySelector('.sentence').textContent,'Complete.');
  assert(t.d.querySelector('.exhibit-toggle').hidden);
  assert(t.d.querySelector('#exhibit-panel').hidden);
  t.d.querySelector('.restart').click();
  assert.equal(t.w.localStorage.getItem(t.key),'0');
  assert(t.d.querySelector('.sentence').textContent.includes(set.koans[0].before));
  assert.deepEqual(t.errors,[],'No uncaught player errors');
  t.dom.window.close();
}
// Resume at a monetary capstone, reveal after exactly five failed checks, and
// retain the exhibit while opening/closing the independently authored expound.
const t=boot(4,33,true);
assert(t.d.querySelector('.sentence').textContent.includes('After discounting'));
assert(t.d.querySelector('.exhibit-frame').getAttribute('src').includes('#page=2'));
for(let i=0;i<4;i++){t.fill('wrong');t.enter();}
assert(t.d.querySelector('.explanation').hidden);
t.enter();
assert.equal(t.d.querySelector('#answer').placeholder,'23.55');
assert(!t.d.querySelector('.explanation').hidden);
t.d.querySelector('.expound-toggle').click();
assert(!t.d.querySelector('.expound').hidden);
assert(t.d.querySelector('.expound').textContent.includes('$173.553719'));
assert(t.d.querySelector('.sentence').hidden);
assert(!t.d.querySelector('#exhibit-panel').hidden);
t.d.querySelector('.expound-toggle').click();
assert(!t.d.querySelector('.sentence').hidden);
assert(!t.d.querySelector('.amount-help').hidden);
t.d.dispatchEvent(new t.w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
assert(t.d.querySelector('#exhibit-panel').hidden);
t.fill('23.54');t.enter();assert(!t.d.querySelector('#answer').disabled);
t.fill('$23.55');t.enter();t.tick();
assert.equal(t.w.localStorage.getItem(t.key),'34');
assert.deepEqual(t.errors,[],'No uncaught hint/expound errors');
t.dom.window.close();
console.log('DOM player integration: all 175 answers, currency submission, wrong answers, five-Enter reveal, expound, PDF toggle/page, Escape, resume, completion, and restart pass.');
