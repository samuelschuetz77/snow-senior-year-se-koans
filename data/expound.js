(() => {
  const stop = new Set(`about after again also another because before being between both could does each every first from have into just more most only other over same should since some such than that their them then there these this those through under used using what when where which while with would your they them several different stated given means needed shows show many much point points rule rules thing things way ways software system code data work result value case change input output test tests testing example question answer concept idea expected correct part parts valid general specific often error errors`.split(' '));
  const complete = koan => `${koan.before}${koan.answer}${koan.after}`;
  const tokens = text => new Set((text.toLowerCase().match(/[a-z][a-z'-]{3,}/g) || [])
    .filter(word => !stop.has(word)));
  const firstSentence = text => (text.match(/[^.!?]+[.!?]/) || [text])[0].trim();

  for (const course of window.KOAN_COURSES) {
    for (const set of course.sets) {
      const promptTerms = set.koans.map(koan => tokens(complete(koan)));
      const terms = set.koans.map(koan => tokens(`${complete(koan)} ${koan.why}`));
      const frequency = new Map();
      for (const wordSet of terms) for (const word of wordSet) frequency.set(word, (frequency.get(word) || 0) + 1);
      const weight = word => Math.log(1 + set.koans.length / (1 + frequency.get(word)));

      for (const [index, koan] of set.koans.entries()) {
        if (!koan.connections) {
          const candidates = [];
          for (let previous = 0; previous < index; previous++) {
            const shared = [...promptTerms[index]].filter(word => terms[previous].has(word));
            const score = shared.reduce((sum, word) => sum + weight(word), 0);
            if (shared.length >= 2 && score >= 4) {
              shared.sort((a, b) => weight(b) - weight(a));
              candidates.push({ index: previous, score, topic: shared[0] });
            }
          }
          candidates.sort((a, b) => b.score - a.score || b.index - a.index);
          const best = candidates[0]?.score ?? 0;
          const usedTopics = new Set();
          koan.connections = candidates.filter(item => {
            if (item.score < Math.max(4, best * 0.75) || usedTopics.has(item.topic)) return false;
            usedTopics.add(item.topic);
            return true;
          }).slice(0, 2)
            .map(item => ({ index: item.index, bridge: `That connects to an earlier koan through “${item.topic}.”` }));
        }

        const parts = [complete(koan), koan.why];
        for (const connection of koan.connections) {
          const previous = set.koans[connection.index];
          parts.push(connection.bridge, complete(previous), firstSentence(previous.why));
        }
        parts.push(`Source: ${set.source}.`);
        koan.expound = parts.join(' ');
      }
    }
  }
})();
