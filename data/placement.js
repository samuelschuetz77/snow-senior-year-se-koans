(() => {
  const terminal = koan => /^[.!?]\s*$/.test(koan.after);
  const words = text => text.trim().split(/\s+/).length;
  const hash = text => [...text].reduce((value, char) => Math.imul(value ^ char.codePointAt(0), 16777619) >>> 0, 2166136261);
  const includesAnswer = (text, koan) => [koan.answer, ...(koan.accepts || [])]
    .some(answer => new RegExp(`(^|[^\\p{L}\\p{N}])${answer.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^\\p{L}\\p{N}]|$)`, 'iu').test(text));

  for (const course of window.KOAN_COURSES) {
    for (const set of course.sets) {
      const endings = set.koans.map((koan, index) => ({ koan, index })).filter(({ koan }) => terminal(koan));
      const moveCount = endings.length - Math.floor(set.koans.length * 0.3);
      const candidates = [];
      for (const { koan, index } of endings) {
        const sentences = koan.why.match(/[^.!?]+[.!?]/g) || [];
        const continuation = sentences.map(sentence => sentence.trim()).find(sentence =>
          words(sentence) >= 6 && words(sentence) <= 20 &&
          /^[A-Z]/.test(sentence) && !sentence.includes(';') && !includesAnswer(sentence, koan)
        );
        if (!continuation) continue;
        candidates.push({ koan, index, continuation });
      }
      if (candidates.length < moveCount) {
        throw new Error(`Not enough answer-safe continuations in ${course.id}/${set.id}: ${candidates.length}/${moveCount}`);
      }
      candidates.sort((a, b) => hash(`${course.id}/${set.id}/${a.index}`) - hash(`${course.id}/${set.id}/${b.index}`));
      for (const { koan, index, continuation } of candidates.slice(0, moveCount)) {
        const joiner = hash(`${course.id}/${set.id}/${index}/join`) % 2 ? '; ' : '—';
        // Keep the missing concept in place, but let the thought continue.
        koan.after = `${joiner}${continuation[0].toLowerCase()}${continuation.slice(1)}`;
      }
    }
  }
})();
