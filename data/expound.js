for (const course of window.KOAN_COURSES) {
  const contexts = window.KOAN_CONTEXTS?.[course.id];
  for (const set of course.sets) {
    const context = contexts?.[set.id];
    if (!context) throw new Error(`Missing expound context: ${course.id}/${set.id}`);
    for (const koan of set.koans) {
      const completed = `${koan.before}${koan.answer}${koan.after}`;
      koan.expound = `Source: ${set.source}. ${context} ${completed} ${koan.why}`;
    }
  }
}
