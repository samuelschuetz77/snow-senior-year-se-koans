(() => {
  'use strict';
  const key = 'snow-koans:theme:v1';
  // Semantic colors are shared by lessons, answer feedback, and diagrams.
  const families = [
    ['paper', 'Paper', '#f6f4ee', '#eceae3', '#20211f', '#355f45', '#e5eae1', '#191c19', '#252b25', '#f1f4ed', '#b3d9ae', '#303c30'],
    ['ocean', 'Ocean', '#f0f7fc', '#e2edf5', '#152d40', '#185c83', '#dceaf5', '#101e2b', '#1c3042', '#e5f3ff', '#8dceff', '#243c50'],
    ['forest', 'Forest', '#f1f8f1', '#e3eee3', '#203725', '#29623c', '#dcebdc', '#14231b', '#23352b', '#edf8ee', '#9ed9ae', '#2b4031'],
    ['plum', 'Plum', '#faf3fb', '#efe4f1', '#38243d', '#754081', '#ebdfef', '#251a2c', '#36283e', '#f9edff', '#dfb3f0', '#44324c'],
    ['sand', 'Sand', '#fcf6e9', '#eee5d3', '#3c3020', '#79501b', '#eee2c9', '#262017', '#373024', '#fff3dc', '#ebc586', '#443a2b'],
    ['rose', 'Rose', '#fff3f3', '#f2e3e4', '#40262c', '#8b354e', '#f1dde2', '#2b1b22', '#3e2932', '#ffedf2', '#f4adc2', '#4b323d']
  ];
  const themes = families.flatMap(([id, name, ...colors]) => ['light', 'dark'].map((mode, i) => {
    const [paper, surface, ink, accent, soft] = colors.slice(i * 5, i * 5 + 5);
    return { id: `${id}-${mode}`, name: `${name} · ${mode === 'light' ? 'Light' : 'Dark'}`, mode,
      colors: { paper, surface, ink, accent, soft, muted: mode === 'light' ? '#55535a' : '#c6c3cd',
        line: mode === 'light' ? '#77717b' : '#99939f',
        right: mode === 'light' ? '#236333' : '#9de0af', wrong: mode === 'light' ? '#9b2635' : '#ffadb5' } };
  }));
  let saved;
  try { saved = localStorage.getItem(key); } catch { /* Storage can be disabled. */ }
  let current = themes.find(t => t.id === saved) || themes.find(t => t.id ===
    (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'paper-dark' : 'paper-light'));
  function apply(theme) {
    current = theme;
    const root = document.documentElement;
    root.dataset.theme = theme.id;
    root.style.colorScheme = theme.mode;
    for (const [token, color] of Object.entries(theme.colors)) root.style.setProperty(`--${token}`, color);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme.colors.paper);
  }
  apply(current); // Run in the head to avoid a flash of the wrong theme.
  window.KoanThemes = { themes, mount() {
    const select = document.querySelector('#theme-select');
    if (!select || select.options.length) return;
    for (const mode of ['light', 'dark']) {
      const group = document.createElement('optgroup');
      group.label = `${mode === 'light' ? 'Light' : 'Dark'} themes`;
      for (const theme of themes.filter(t => t.mode === mode)) group.append(new Option(theme.name, theme.id));
      select.append(group);
    }
    select.value = current.id;
    select.addEventListener('change', () => {
      apply(themes.find(t => t.id === select.value) || themes[0]);
      try { localStorage.setItem(key, current.id); } catch { /* Selection still works in memory. */ }
    });
  } };
})();
