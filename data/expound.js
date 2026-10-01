(() => {
  for (const course of window.KOAN_COURSES) {
    for (const set of course.sets) {
      for (const koan of set.koans) {
        // Shared words do not establish a useful explanatory connection.
        // Authored explanations stand on their own; never append other koans.
        koan.connections = [];
        if (!koan.expoundText?.trim()) {
          throw new Error(`Missing authored expound: ${course.id}/${set.id}`);
        }
        koan.expound = `${koan.expoundText} Source: ${set.source}.`;
      }
    }
  }
})();
