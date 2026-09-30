(() => {
  const notes = {
    'typescript-runtime': `
Browsers and JavaScript engines execute the emitted JavaScript, not TypeScript types.
Type annotations guide checking but are erased during compilation.
An external value can violate its declared type after the program starts.
JSON carries values, not trustworthy TypeScript guarantees.
Static checking can reject incompatible arguments before execution.
Interfaces describe expected properties for the checker but produce no JavaScript value.
`,
    'typescript-structure': `
Compatibility depends on required properties rather than a declared name.
An object's properties can match interfaces it never explicitly mentions.
A union permits values from either member type.
Runtime checks provide evidence for choosing one branch of a union.
Matching public members allow structural compatibility between classes.
Erased interfaces do not exist for runtime inspection.
The object's property names and types match those required by Pointlike.
`,
    'react-components': `
A component returns elements for React to display.
Uppercase names distinguish custom components from built-in HTML elements.
JSX lets UI structure be written within JavaScript.
A component must return one enclosing JSX tree.
JSX uses the JavaScript property name for the HTML class attribute.
Nesting an element asks React to render that child component.
`,
    'react-data': `
Props are the parent's inputs to a child component.
The parent owns the prop; the child should request changes rather than mutate it.
Braces switch from JSX text into a JavaScript expression.
Stable keys help React match list items across renders.
Only items remaining after the filter are mapped into elements.
An index changes when items move, so it does not reliably identify an item.
The key associates each rendered task with the same underlying task after reordering.
`,
    'react-state': `
Passing the function lets React call it when the event occurs.
State persists across component renders, unlike an ordinary local variable.
The setter schedules an update using the supplied next state.
React relies on a new state value to detect and show updates.
The updater receives the latest previous state before computing the next one.
A common parent can coordinate the value needed by multiple children.
The updater argument uses current state even if a closure captured an older value.
`,
    'react-sharing': `
One owner prevents siblings from maintaining conflicting copies.
Props carry the parent's current value to each child.
The parent's handler updates the state it owns when a child requests it.
Calculating from existing data avoids maintaining a redundant value.
Separate copies can drift when only one is updated.
A state update triggers rendering so the view reflects the new value.
`
  };

  const course = window.KOAN_COURSES.find(item => item.id === 'frontend-development');
  for (const set of course.sets) {
    const explanations = notes[set.id]?.trim().split(/\r?\n/);
    if (!explanations || explanations.length !== set.koans.length) {
      throw new Error(`Explanation count mismatch: ${set.id}`);
    }
    set.koans.forEach((koan, index) => { koan.why = explanations[index]; });
  }
})();
