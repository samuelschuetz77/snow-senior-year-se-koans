(() => {
  const course = window.KOAN_COURSES.find(item => item.id === 'frontend-development');
  const q = (before, answer, after, why, options = {}) => ({ before, answer, after, why, ...options });
  const add = (id, koans) => course.sets.find(set => set.id === id).koans.push(...koans);

  add('typescript-runtime', [
    q('The browser cannot enforce a TypeScript annotation because annotations are ', 'erased', '.', 'Compilation removes the annotation before execution. The JavaScript engine receives ordinary values, so any required runtime guarantee needs an actual check.'),
    q('A value parsed from JSON begins as data whose shape must be ', 'verified', '.', 'JSON parsing checks syntax, not the application schema. Inspect required fields and their runtime types before using the value as a domain object.'),
    q('Assigning a type to a network response is a developer claim, not runtime ', 'validation', '.', 'A declaration or assertion only guides TypeScript. The remote server may return a different shape, so the program must validate it when trust matters.'),
    q('A type assertion changes the checker’s view without changing the underlying ', 'value', '.', 'The assertion is removed from generated JavaScript. If the data lacks the promised property, accessing that property can still fail when the program runs.'),
    q('The `typeof` operator can inspect a JavaScript value at ', 'runtime', '.', 'Unlike a TypeScript annotation, typeof executes in JavaScript. It can distinguish primitives, although arrays, null, and objects require more careful checks.'),
    q('Checking `Array.isArray(value)` is a runtime guard for an ', 'array', '.', 'An annotation cannot inspect external data, but Array.isArray executes and tests the value. Further checks may still be needed for each element.'),
    q('A TypeScript compiler error can prevent a bad call before ', 'execution', '.', 'The checker compares declared types while building the program. That early feedback does not imply that the eventual JavaScript has runtime type enforcement.'),
    q('The `unknown` type requires evidence before a value is ', 'used', '.', 'Unknown represents a value whose shape has not been established. Narrow it with real checks before reading properties or calling methods.'),
    q('The `any` type opts out of useful static ', 'checking', '.', 'Any lets operations pass the compiler even when they may fail at runtime. It is especially risky at boundaries with untrusted data.'),
    q('A function parameter type describes allowed calls during ', 'compilation', '.', 'TypeScript checks call sites that it can see. Plain JavaScript callers or malformed external inputs can still pass unexpected runtime values.'),
    q('An interface name cannot be used with `instanceof` because it has no runtime ', 'constructor', '.', 'Interfaces disappear after compilation, whereas instanceof compares a value against an actual JavaScript constructor. Use property checks or a real class when appropriate.'),
    q('A type guard narrows a value only after it collects runtime ', 'evidence', '.', 'Checks such as typeof or property tests give the compiler a reason to refine the type. Merely asserting a type provides no such evidence.'),
    q('This branch protects `toUpperCase` by checking for a ', 'string', '.', 'The typeof condition runs before the method call. Inside the branch, TypeScript can narrow unknown to string and JavaScript can safely call the method.', { code: 'function shout(value: unknown) {\n  if (typeof value === "string") return value.toUpperCase();\n}' }),
    q('Successful TypeScript compilation cannot prove an API response follows its declared ', 'schema', '.', 'The checker sees only the program’s declared types, not future network bytes. Decode or validate the response at the boundary before depending on its fields.')
  ]);

  add('typescript-structure', [
    q('A structural type match depends on required members rather than a matching ', 'name', '.', 'A value qualifies when it provides the expected public properties with compatible types. It need not mention the receiving interface by name.'),
    q('An object with extra fields can still satisfy a smaller structural ', 'interface', '.', 'Compatibility requires the needed members; unrelated additional members do not erase them. Fresh object literals can still receive separate excess-property checks.'),
    q('A missing required property makes two otherwise similar shapes ', 'incompatible', '.', 'Structural typing checks the full required contract. Matching most members is insufficient when the consumer may read the missing member.'),
    q('A property marked optional may be ', 'absent', '.', 'Optional members allow objects without that field. Code reading the field must still account for undefined before relying on its value.'),
    q('A union requires narrowing before using a member absent from some ', 'alternatives', '.', 'A value of A or B might be either at runtime. Access only shared members until a check establishes which alternative is present.'),
    q('A discriminant field can identify a union ', 'variant', '.', 'A literal tag such as kind gives each alternative a distinct runtime value. Checking it lets TypeScript narrow to the corresponding shape.'),
    q('An intersection type requires the members of ', 'both', ' inputs.', 'An intersection combines structural requirements. A value must support each side, unlike a union that permits either alternative.'),
    q('A public method contributes to a class’s structural ', 'shape', '.', 'TypeScript compares accessible members for compatibility. A class declaration alone does not demand a nominal relationship between otherwise compatible values.'),
    q('A private class member can prevent otherwise identical classes from being ', 'compatible', '.', 'Private and protected members carry declaration-origin constraints. They limit structural compatibility even if the public method names and types match.'),
    q('A literal object passed directly to a function can receive an excess-property ', 'check', '.', 'Fresh literals receive an additional typo-catching check. Assigning the same value to a variable may follow ordinary structural compatibility rules instead.'),
    q('A `typeof` branch narrows a union using a runtime ', 'test', '.', 'The branch condition executes in JavaScript and gives the checker evidence about the current value. Interfaces themselves cannot supply a runtime test.'),
    q('The `in` operator can narrow a union by testing for a ', 'property', '.', 'A property-existence check supplies runtime evidence about the shape. It is useful when alternatives have different members rather than different primitive types.'),
    q('A function accepting a smaller interface can receive a value with additional ', 'fields', '.', 'The function promises to use only its declared requirements. A richer object remains usable when those requirements have compatible types.')
  ]);

  add('react-components', [
    q('A custom component is invoked in JSX with a capitalized ', 'tag', '.', 'React treats uppercase JSX names as component references and lowercase names as built-in elements. The distinction decides what function or element React creates.'),
    q('A component should describe its output without mutating external ', 'state', '.', 'Rendering may happen more than once. Pure render logic produces the same UI from the same inputs and avoids surprising effects during repeated calls.'),
    q('JSX braces let a component embed a JavaScript ', 'expression', '.', 'Expressions inside braces are evaluated when rendering. They can provide text, attributes, or child elements from props and local calculations.'),
    q('A fragment groups siblings without adding a DOM ', 'element', '.', 'JSX needs one enclosing return value. A fragment satisfies that syntax while leaving the actual document without an unnecessary wrapper.'),
    q('A component returns a tree of React ', 'elements', '.', 'The return value describes what should appear. React compares that description with the prior render to update the visible interface.'),
    q('A component definition should remain outside another component to preserve its ', 'identity', '.', 'Defining a child during every parent render creates a new component function each time. That can reset the child’s state unexpectedly.'),
    q('Lowercase JSX names such as `section` denote built-in ', 'elements', '.', 'React distinguishes browser tags from custom components by capitalization. A lowercase section becomes a DOM element instead of a function call.'),
    q('An empty component may return ', 'null', ' to render nothing.', 'Returning null is a valid way for a component to produce no UI for a condition. The component still participates in its parent’s render.'),
    q('Conditional rendering can choose between two element ', 'branches', '.', 'Ordinary JavaScript conditions determine which JSX description is returned. The visible result follows the condition during the next render.'),
    q('An attribute such as `src` can receive a calculated value inside JSX ', 'braces', '.', 'Quoted text remains literal, while braces evaluate a JavaScript expression. This distinction lets props drive attributes such as image paths.'),
    q('A nested component receives data through explicitly passed ', 'props', '.', 'Nesting determines where the child appears, but does not automatically share the parent’s local variables. Pass the values the child needs.'),
    q('A component function can be reused with different ', 'inputs', '.', 'Each JSX instance can pass different props to the same definition. The component renders a corresponding result from those inputs.'),
    q('This capitalized JSX tag calls the custom ', 'component', '.', 'The uppercase Badge name refers to the function defined in JavaScript. React uses its returned JSX, rather than creating a browser element named badge.', { code: 'function Badge() { return <strong>New</strong>; }\nfunction Page() { return <Badge />; }' }),
    q('A JSX return with adjacent siblings needs a single enclosing ', 'parent', '.', 'JSX syntax requires one returned tree. A fragment or wrapper element can hold the siblings so the component returns one value.')
  ]);

  add('react-data', [
    q('A child cannot rewrite the prop that its parent ', 'owns', '.', 'Props are inputs to a render, not local mutable storage. The parent must pass a new value when the displayed data should change.'),
    q('A list key should remain stable when items are ', 'reordered', '.', 'React uses keys to match old and new children. An index changes meaning after a reorder and may attach state to the wrong item.'),
    q('A database ID is often a useful list ', 'key', '.', 'An ID tied to the record remains the same across filtering and sorting. It helps React preserve the identity of each rendered item.'),
    q('A key is needed on the outermost element returned by ', 'map', '.', 'React compares the array of sibling elements produced by map. The key belongs on each element in that array, not only inside a nested child.'),
    q('A filtered list can be rendered by chaining `filter` and ', 'map', '.', 'Filter selects the records, while map converts the selected records into React elements. Stable keys still identify those elements.'),
    q('The same component can display different content when given different ', 'props', '.', 'A component receives a new input object for each instance. Rendering reads that input to produce a corresponding view.'),
    q('The special `children` prop contains nested JSX ', 'content', '.', 'Markup placed between a component’s opening and closing tags is available as children. A wrapper component may choose where to render it.'),
    q('A prop is a snapshot for one particular ', 'render', '.', 'When the parent passes a new value, React renders the child again. Mutating the old prop cannot request that update.'),
    q('Using an array index as a key risks mismatched state after ', 'insertion', '.', 'Inserting an item shifts later indexes. React may then reuse an existing child instance for a different underlying record.'),
    q('The key for a list should come from the underlying ', 'data', '.', 'A stable record identifier survives rerenders, filters, and sorts. Generating a new random key during render loses that continuity.'),
    q('A parent can pass a function as a ', 'prop', '.', 'Functions are values in JavaScript. Passing a callback lets a child notify the parent while the parent keeps ownership of its data.'),
    q('JSX can render an array of elements produced by ', 'map', '.', 'Map transforms each source item into a React element. Give those siblings stable keys so React can match them between renders.'),
    q('A rendering component should derive visible items from its current input ', 'data', '.', 'Calculating from props keeps the display tied to the latest parent values. A separate stale copy can diverge when the input changes.')
  ]);

  add('react-state', [
    q('Calling an event handler during render would run it before the user ', 'acts', '.', 'Pass the handler function to the event prop. Calling it while building JSX performs the update immediately and can trigger repeated renders.'),
    q('A state setter schedules a future render rather than changing the current ', 'snapshot', '.', 'The running handler sees values from its render. React applies the requested update later, so immediate reads can still show the old value.'),
    q('Two increments based on one captured count can collapse into one ', 'update', '.', 'Both calls may calculate the same next value from the same render snapshot. Functional updaters compose from the queued previous values.'),
    q('An updater receives the previous queued state as its ', 'argument', '.', 'React evaluates updater functions against the pending state in order. This makes successive dependent updates accumulate predictably.'),
    q('Replacing a state array with a new array preserves ', 'immutability', '.', 'Methods such as map or filter return a new collection. React can then see the new state value without relying on mutation of the old array.'),
    q('To remove an item immutably, derive a new array using ', 'filter', '.', 'Filter returns the items that satisfy the condition. Passing that new array to the setter leaves the previous render’s snapshot intact.'),
    q('To edit one array item immutably, derive a new array using ', 'map', '.', 'Map can replace the matching record and return the others unchanged. The resulting new array is suitable for a state update.'),
    q('Mutating an object already held in state can leave React with the same ', 'reference', '.', 'Changing a field in place does not create a new state value. Copy the object and replace the changed field when calling the setter.'),
    q('A click handler runs in response to an ', 'event', '.', 'React stores the function passed to an event prop and invokes it when that event occurs. Rendering itself should only describe the UI.'),
    q('Local state belongs to a particular component ', 'instance', '.', 'Separate instances of the same component can remember different values. Their state is associated with positions and identities in the rendered tree.'),
    q('A derived total should be calculated from current state instead of stored ', 'separately', '.', 'If a value can be computed from existing state, duplicating it creates a synchronization problem. Calculate it during render from the authoritative inputs.'),
    q('Passing `setOpen(!open)` to `onClick` executes the setter during ', 'render', '.', 'The expression calls setOpen immediately. Give onClick a function, such as an arrow callback, so the update happens after a click.'),
    q('A state update should replace the array rather than call `push` on the existing ', 'array', '.', 'Push mutates the current snapshot and returns a length, not a new collection. Build a new array and pass that value to the setter.')
  ]);

  add('react-sharing', [
    q('Two sibling views stay synchronized when their common parent owns the ', 'state', '.', 'One parent value drives both views. A single update then flows down through props, avoiding separate copies that can disagree.'),
    q('A child sends an edit request upward by invoking a callback ', 'prop', '.', 'The parent supplies a function that changes its state. The child calls it in response to an interaction without owning the shared value.'),
    q('The closest common ancestor is a natural owner for shared ', 'state', '.', 'Place changing data high enough that every dependent child can receive it. Moving it farther up without need increases the area affected by updates.'),
    q('A calculated subtotal should be derived from the current ', 'items', '.', 'The items are the source data. Computing the subtotal during render avoids a second state variable that must be kept in sync.'),
    q('Storing both Celsius and Fahrenheit independently creates duplicate ', 'state', '.', 'Either scale can be calculated from the other. Keeping both as mutable values invites disagreement when only one update path runs.'),
    q('A controlled input receives its current value through a ', 'prop', '.', 'The parent owns the changing value and passes it to the input. An event handler requests updates so the input reflects that state.'),
    q('An input’s `onChange` handler can report edits to its owning ', 'parent', '.', 'The callback transfers the user’s new value upward. The parent updates state and passes the resulting value back down.'),
    q('Props carry shared data downward through the component ', 'tree', '.', 'The owner renders children with the current value. When its state changes, those children receive new props in the next render.'),
    q('A callback prop gives a child a way to request a shared state ', 'change', '.', 'The parent keeps the setter and defines the update rule. The child invokes the callback after user input to request that change.'),
    q('Keeping one authoritative value avoids synchronization ', 'bugs', '.', 'When several copies can change separately, views may disagree. Deriving other displays from one state value removes that coordination problem.'),
    q('If a value is computed entirely from props, it usually need not become local ', 'state', '.', 'Recalculate it while rendering from the latest props. Storing another copy would require extra updates whenever the parent changes.'),
    q('A sibling cannot directly read another sibling’s local ', 'state', '.', 'Sibling component instances do not share local memory. Move the needed value to a common parent and pass it down.'),
    q('The shared value in this example is owned by the ', 'parent', '.', 'Panel keeps the only state value and passes it to both children. Each child therefore reads the same current value after a parent update.', { code: 'function Panel() {\n  const [open, setOpen] = useState(false);\n  return <><Toggle open={open} onChange={setOpen} /><Preview open={open} /></>;\n}' }),
    q('A single parent update can change several children in the same ', 'render', '.', 'Both children receive props calculated from the newly updated parent state. They do not need separate synchronization messages between themselves.')
  ]);
})();
