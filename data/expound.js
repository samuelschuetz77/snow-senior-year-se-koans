(() => {
  const complete = koan => `${koan.before}${koan.answer}${koan.after}`;
  for (const course of window.KOAN_COURSES) {
    for (const set of course.sets) {
      for (const koan of set.koans) {
        // Shared words do not establish a useful explanatory connection.
        // Authored explanations stand on their own; never append other koans.
        koan.connections = [];
        koan.expound = koan.expoundText || `${complete(koan)} ${koan.why}`;
        koan.expound += ` Source: ${set.source}.`;
      }
    }
  }
})();
