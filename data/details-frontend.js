(() => {
  const details = {
    'typescript-runtime': `
The compiler turns the source into JavaScript, and that output is what the execution environment receives.
An annotation can reject bad source during development, but it does not appear as a check in the emitted program.
Network data arrives after compilation, when the static checker can no longer inspect its actual contents.
For example, a response labeled as a User may still lack an id; inspect the value before using it.
The checker compares the argument with the parameter type while building the program, before a user can run it.
An interface cannot be instantiated or tested with instanceof because there is no interface object in the output.
`,
    'typescript-structure': `
If the required fields and their types are present, the object's declaration history usually does not matter.
This makes third-party objects usable through an interface without modifying the class that produced them.
A string-or-number union accepts either kind, but code must handle the possibilities before using kind-specific operations.
A typeof check can establish a string branch, allowing string methods there without unsafe assumptions.
Matching public fields permit assignment even when the classes have unrelated names or constructors.
Runtime code can inspect actual properties, but it cannot ask whether an erased interface declaration exists.
Pointlike requires particular property names and types; the example value has those exact members.
`,
    'react-components': `
React calls the function and uses its returned element tree to decide what belongs on screen.
Lowercase JSX tags are treated as built-in elements, while uppercase names refer to component functions.
The syntax resembles HTML, but expressions and component references are interpreted as JavaScript.
A fragment groups siblings without adding an extra wrapper element to the rendered page.
The JSX property maps to the DOM's className property, avoiding the JavaScript keyword class.
The child receives its own props and renders as part of the parent's returned tree.
`,
    'react-data': `
The child receives an input value from its parent, giving data a clear direction through the component tree.
If the child changes the object directly, the parent may not know to render or coordinate the update.
For example, braces in a heading can display a computed name rather than literal characters.
When items move, their keys tell React which rendered element corresponds to which original item.
A filtered array determines the elements passed to JSX, so excluded records are absent from the view.
Deleting an earlier item shifts later indices, causing index keys to point at different records.
A stable task id prevents text or state from being attached to the wrong task after reordering.
`,
    'react-state': `
Writing onClick={save()} invokes save during rendering; onClick={save} defers it until the click.
A normal local variable starts over on each call, whereas React retains state for that component position.
React queues a render and supplies the updated value to the next render of the component.
Making a fresh array gives React a new reference and keeps the previous state untouched.
For an increment, calculating from the supplied previous value avoids losing closely timed updates.
The shared parent owns the value, passes it down, and handles updates requested by either child.
The updater receives React's latest state, even if the handler was created during an earlier render.
`,
    'react-sharing': `
The parent owns the value both siblings depend on, so one update can keep their views aligned.
Each render gives children the parent's current value rather than independent snapshots to maintain.
The child reports an event upward, and the parent decides how its owned state changes.
If a total can be computed from the current items, storing it separately invites synchronization bugs.
One sibling may update its copy while the other still displays an older value.
React reruns the relevant components with new state and updates the rendered output accordingly.
`
  };

  const course = window.KOAN_COURSES.find(item => item.id === 'frontend-development');
  for (const set of course.sets) {
    const lines = details[set.id]?.trim().split(/\r?\n/);
    if (!lines || lines.length !== set.koans.length) throw new Error(`Detail count mismatch: ${set.id}`);
    set.koans.forEach((koan, index) => { koan.why += ` ${lines[index]}`; });
  }
})();
