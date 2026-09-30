(() => {
  const q = (before, answer, after, options = {}) => ({ before, answer, after, ...options });
  const set = (id, title, due, source, koans) => ({ id, title, due, source, koans });
  window.KOAN_COURSES.push({ id: 'frontend-development', title: 'Frontend Development', sets: [
    set('typescript-runtime', 'TypeScript · JavaScript Runtime', 'Sep 4', 'TypeScript Handbook: TypeScript for Java/C# Programmers', [
      q("TypeScript code ", "runs", " using JavaScript’s runtime."),
      q("A TypeScript type ", "annotation", " is removed from emitted JavaScript.", { accepts: ["hint", "declaration", "label"] }),
      q("A compile-time type ", "check", " cannot validate an untrusted response at runtime.", { accepts: ["checker", "checking", "system"] }),
      q("A value from JSON needs a runtime ", "check", " before it is treated as a trusted type.", { accepts: ["validation", "test", "guard", "inspection", "checks"] }),
      q('TypeScript can catch a mismatched argument before the program ', 'runs', '.', { accepts: ["executes", "starts", "launches", "begins", "operates"] }),
      q("A TypeScript interface describes a ", "shape", " but does not create a runtime object.", { accepts: ["structure", "type", "contract", "form"] })
    ]),
    set('typescript-structure', 'TypeScript · Structural Types', 'Sep 4', 'TypeScript Handbook: TypeScript for Java/C# Programmers', [
      q('TypeScript compares object types mainly by their ', 'structure', '.', { accepts: ['shape'] }),
      q("An object can satisfy two interfaces without an explicit ", "declaration", " naming either one.", { accepts: ["implements", "statement", "annotation", "mention", "clause"] }),
      q('A union type describes values belonging to either of two ', 'sets', '.', { accepts: ['types'] }),
      q("A function can narrow a ", "union", " by checking a value’s runtime type.", { accepts: ["type"] }),
      q('Two classes with the same public shape can be structurally ', 'compatible', '.'),
      q("Type information is erased, so runtime ", "reflection", " cannot query an interface.", { accepts: ["introspection", "inspection", "code", "checks"] }),
      q('The value fits Pointlike because its properties have the required ', 'shape', '.', { code: 'interface Pointlike { x: number; y: number }\nconst point = { x: 2, y: 4, label: "home" };' })
    ]),
    set('react-components', 'React · Components and JSX', 'Sep 15', 'React Learn: Quick Start', [
      q('A React component is a function that returns UI ', 'markup', '.', { accepts: ['elements'] }),
      q('Component names begin with an uppercase ', 'letter', '.'),
      q("JSX represents ", "markup", " inside JavaScript code.", { accepts: ["html", "ui", "elements", "tags", "xml"] }),
      q("Adjacent JSX elements need one enclosing ", "parent", " element or fragment.", { accepts: ["wrapper", "container", "root", "wrapping"] }),
      q("In JSX, the CSS class ", "attribute", " is written className.", { accepts: ["prop", "property", "name"] }),
      q('A component can render another component by nesting its ', 'element', '.', { accepts: ['tag'] })
    ]),
    set('react-data', 'React · Props and Lists', 'Sep 15', 'React Learn: Quick Start', [
      q('Props pass information from a parent component to a ', 'child', '.'),
      q("A ", "prop", " value should be treated as read-only by the receiving component.", { accepts: ["props", "property"] }),
      q("A JavaScript ", "expression", " appears inside JSX braces.", { accepts: ["value", "variable", "code"] }),
      q("A list item needs a stable ", "key", " so React can track its identity.", { accepts: ["id", "identifier"] }),
      q("A ", "filter", " applied before rendering changes which items appear.", { accepts: ["condition", "predicate", "filtering"] }),
      q('A key should come from stable item data rather than its current array ', 'index', '.'),
      q('The stable key lets React preserve each task’s ', 'identity', ' when the list changes.', { code: 'tasks.map(task => <li key={task.id}>{task.name}</li>)' })
    ]),
    set('react-state', 'React · Events and State', 'Sep 15', 'React Learn: Quick Start', [
      q('An event handler is passed to React as a function, not the result of calling that ', 'function', '.'),
      q('State lets a component remember information between ', 'renders', '.'),
      q("Calling a state ", "setter", " asks React to render with the new state.", { accepts: ["function", "updater", "setstate"] }),
      q("Mutating an existing ", "array", " may fail to communicate a state change.", { accepts: ["object", "list", "value"] }),
      q("An ", "updater", " function is useful when the next state depends on the previous state.", { accepts: ["update", "callback", "arrow"] }),
      q("When several components need the same changing value, lift ", "state", " to their common parent.", { accepts: ["it"] }),
      q('This form avoids relying on a potentially stale captured ', 'value', '.', { accepts: ['count'], code: 'setCount(previous => previous + 1)' })
    ]),
    set('react-sharing', 'React · Shared State', 'Sep 15', 'React Learn: Quick Start', [
      q("Lifting state up gives sibling components one shared ", "source", " of truth.", { accepts: ["owner", "copy", "place"] }),
      q("The ", "parent", " passes shared state down through props.", { accepts: ["ancestor", "owner"] }),
      q('A child requests a state change by calling a parent-provided ', 'handler', '.', { accepts: ['callback'] }),
      q("Derived display ", "values", " can often be calculated during render instead of stored as separate state.", { accepts: ["data", "numbers", "totals"] }),
      q('Independent copies of the same state can become ', 'inconsistent', '.', { accepts: ['unsynchronized'] }),
      q("React updates the visible ", "UI", " after the relevant state changes.", { accepts: ["interface", "view", "screen", "page", "output", "dom"] })
    ])
  ] });
})();
