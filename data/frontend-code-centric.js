// Each example is revisited from five angles: trace, explain, and transfer.
// Snippets are complete components unless their comments name a supplied API.
(() => {
  const course = window.KOAN_COURSES.find(item => item.id === 'frontend-development');
  const q = (before, answer, after, why, expoundText, accepts = []) =>
    ({ before, answer, after, why, expoundText, accepts });
  const b = (statement, answer, token, why, expoundText, accepts = []) =>
    ({ statement, answer, token, why, expoundText, accepts });
  const example = (code, koans) => koans.map(koan => ({ ...koan,
    code: (koan.statement ? code.replace(koan.token, koan.token.replace(koan.answer, '___')) : code).trim()
  }));
  const add = (number, title, source, examples) => course.sets.push({
    id: `code-centric-${number}`, title: `${String(number).padStart(2, '0')} · ${title}`,
    track: 'code-centric', due: `Set ${number} of 10 · 20 koans`,
    source, codeRatio: 1, koans: examples.flat().map(koan => ({ ...koan, section: title }))
  });

  add(1, 'Day one: reading JSX', 'React Learn: Your First Component; Writing Markup with JSX; JavaScript in JSX with Curly Braces (https://react.dev/learn)', [
    example(`function Greeting() {
  const name = 'Mira';
  return     <section className="welcome">
      <h1>Hello, {name}</h1>
    </section>;
}`, [
      q('The heading displays Hello, ', 'Mira', ' because the braces evaluate name.', 'The variable contains the string Mira. JSX braces evaluate that variable and insert its value as text inside the heading.', 'Compare {name} with the literal text name. Braces switch from markup into a JavaScript expression, so the browser receives the value Mira. Changing the variable changes the next rendered greeting.'),
      q('The markup returned by Greeting uses ', 'JSX', ' syntax inside JavaScript.', 'The section and heading are JSX expressions. A build tool transforms that markup into JavaScript instructions that React can use to describe the interface.', 'JSX describes an element tree without creating a separate template language for data access. Greeting returns that description. React can then use it to create or update the corresponding DOM elements.'),
      b('Assign the welcome CSS class to the section.', 'className', 'className=', 'React uses className for the CSS class attribute on DOM elements. The value welcome names a class; it does not define any CSS by itself.', 'The rendered section can match a .welcome selector in a stylesheet. The attribute connects markup to styling, while the stylesheet determines the appearance. Without matching CSS, the class still exists but adds no styling.'),
      q('Greeting starts with an ', 'uppercase', ' letter so JSX can distinguish it from a built-in tag.', 'A capitalized JSX name refers to a component variable. Lowercase names such as section and h1 describe browser elements instead of calling your component.', 'Writing <Greeting /> tells React to use the function named Greeting. Writing <greeting /> describes a lowercase tag instead. Capitalization is therefore part of how JSX resolves a name, not merely a naming preference.', ['capital']),
      q('Replacing {name} with the quoted JSX text "name" displays a ', 'literal', ' word rather than the variable value.', 'Text between JSX tags is literal unless braces introduce an expression. Quotes written there appear as text too; they do not perform variable lookup.', 'Inside a JavaScript expression, quotes make a string. Between JSX tags, ordinary characters are already text. The expression {name} reads the variable; the text "name" would display those quote marks and the word name.')
    ]),
    example(`function Score() {
  const wins = 3;
  return     <>
      <h2>Score</h2>
      <p>{wins * 2} points</p>
    </>;
}`, [
      q('The paragraph displays ', '6', ' points after JavaScript evaluates the multiplication.', 'The braces contain an expression, wins times two. Since wins is three, React receives the number six and renders it as text.', 'JSX expressions can calculate values as well as read variables. Here multiplication finishes before React uses the result as a child. The interface displays the computed number rather than the expression wins * 2.', ['six']),
      q('The empty wrapper is a ', 'Fragment', ' that groups the heading and paragraph.', 'The empty JSX tags group sibling elements into one returned expression. They do not add a div or another wrapper element to the DOM.', 'A component needs to return a single JavaScript value, but that value can describe multiple siblings. A Fragment supplies the grouping React needs while leaving the heading and paragraph as adjacent DOM elements.'),
      q('This Fragment adds ', 'zero', ' wrapper elements to the DOM.', 'Only the h2 and p become DOM elements from this return value. The Fragment organizes the React element tree without creating a browser node.', 'A wrapper div could affect flexbox, grid, or CSS selectors because it becomes a real element. A Fragment avoids that extra layer. Its grouping role exists in React rather than in the resulting DOM.', ['0']),
      b('Use the local win count to calculate two points per win.', 'wins', '{wins * 2}', 'The variable wins supplies three to the multiplication. Referencing that variable keeps the displayed score tied to the value declared at the top of this component.', 'The braces already establish a JavaScript expression. Inside them, wins refers to the local variable rather than literal text. Multiplying that value by two computes the score each time the component renders.'),
      q('With wins changed to 4, the paragraph would display ', '8', ' points on the next render.', 'Each render evaluates the expression using the current local value. Four multiplied by two yields eight, which replaces six in the returned element description.', 'Rendering is a calculation of what the interface should look like now. This example has no state or events; editing the source changes the next calculation. React is not watching a standalone variable for mutations.', ['eight'])
    ]),
    example(`function Status() {
  const online = false;
  return     <p className={online ? 'up' : 'down'}>
      {online ? 'Connected' : 'Offline'}
    </p>;
}`, [
      q('Because online is false, the paragraph displays ', 'Offline', ' as its text.', 'The conditional expression chooses the value after the colon when its condition is false. Here that branch contains the string Offline.', 'The same boolean controls text and class, but each expression is evaluated independently. With false, the text expression returns Offline. No Connected element is created and hidden; that string simply is not selected.'),
      q('The paragraph receives the ', 'down', ' CSS class when online is false.', 'The className expression chooses between two strings. Its false branch is down, so that is the class name passed to the paragraph element.', 'A dynamic attribute uses braces just like a dynamic child. The expression determines the attribute value before rendering. React does not interpret up or down as special status values; their visual meaning belongs to your CSS.'),
      q('The question mark and colon form a ', 'ternary', ' expression that chooses between two values.', 'JavaScript calls this the conditional, or ternary, operator. It returns one of two expressions, making it usable inside JSX braces wherever a value is needed.', 'An if statement controls execution but is not itself a value you can place inside these braces. A conditional expression produces a value, which is why it works for both the className and paragraph content.', ['conditional']),
      q('Changing online to true makes ', 'Connected', ' the selected paragraph text.', 'A true condition selects the expression before the colon. The text becomes Connected while the separate className expression selects up for the same reason.', 'Trace each conditional from its condition to the selected branch. Both read online, so they stay consistent in this snippet. A single source value can drive several related parts of the rendered interface.'),
      q('Only ', 'one', ' of the two possible status strings becomes paragraph content per render.', 'A conditional expression returns exactly one selected result. The unused branch does not become another hidden child inside the paragraph in this example.', 'This differs from rendering both labels and hiding one with CSS. The resulting React description contains just the chosen text. That distinction matters when conditional branches contain components with their own state or effects.', ['1'])
    ]),
    example(`function Notice() {
  const message = '<strong>Hello</strong>';
  return     <article>
      <p>{message}</p>
      <hr />
    </article>;
}`, [
      q('React renders message as ', 'text', ' instead of interpreting its string contents as markup.', 'A string used as a JSX child is displayed as text. The angle brackets in message do not create a strong element inside the paragraph.', 'The string contains characters that resemble HTML, but React treats a string child as text content. To produce an actual strong element, author that element in JSX rather than embedding markup inside a string.'),
      q('This snippet creates ', 'zero', ' strong elements despite the tag-shaped string.', 'The only actual elements described by the JSX are article, p, and hr. The apparent strong tags belong to a string value displayed in the paragraph.', 'Distinguish source syntax from runtime data. A JSX <strong> tag describes an element; the characters <strong> inside message are data. That separation lets ordinary user text containing angle brackets remain ordinary text.', ['0']),
      q('The hr element uses a ', 'self-closing', ' tag because JSX requires an explicit closing form.', 'JSX requires tags to be closed. The slash before the closing angle bracket provides the closing form for this element without a separate end tag.', 'HTML parsers have rules for void elements such as hr, but JSX follows its own syntax. Writing <hr /> makes the element complete in the JSX expression and avoids a parser error.', ['selfclosing']),
      q('The ', 'article', ' element is the common parent of the paragraph and horizontal rule.', 'The return value contains one outer article element with two children. That enclosing element groups the paragraph and hr into one JSX expression.', 'Read nested JSX from the outside inward to understand the tree. The article contains a paragraph and a horizontal rule. The message is text inside the paragraph, not another sibling of the article.'),
      q('To make Hello bold semantically, replace the string child with a ', 'strong', ' JSX element.', 'An actual strong element expresses semantic importance and usually renders in bold. Putting tag characters inside a string only displays those characters as text.', 'Write <strong>Hello</strong> as JSX inside the paragraph to describe the desired element. This changes the tree itself. Changing the characters of message alone does not turn that string into React elements.')
    ])
  ]);
  add(2, 'Props and composition', 'React Learn: Passing Props to a Component; Conditional Rendering (https://react.dev/learn)', [
    example(`function Badge({ label = 'Guest' }) {
  return <strong>{label}</strong>;
}
function App() {
  return <>
    <Badge label="Captain" />
    <Badge />
  </>;
}`, [
      q('The first Badge displays ', 'Captain', ' because its parent supplies a label prop.', 'The label attribute supplies the string Captain to the first Badge. Destructuring reads that value, so the default Guest is not used for this instance.', 'Each use of Badge receives its own props object. The first call site explicitly supplies label, while the second leaves it out. Reusing a component does not require every instance to receive identical data.'),
      q('The second Badge displays ', 'Guest', ' because its label prop is undefined.', 'The destructuring default applies when label is absent or undefined. This instance passes no label, so the function uses Guest when it returns its strong element.', 'A default parameter handles a missing value at the function boundary. It does not write data back into the parent. This makes Badge useful on its own while still allowing the parent to choose a label.'),
      q('Passing label={null} would render ', 'nothing', ' inside the strong element instead of Guest.', 'Destructuring defaults apply to undefined, not null. A null child renders no text, although the surrounding strong element still exists in the output.', 'Null is an explicitly supplied value. React omits null children, and JavaScript does not replace null with this default. If null should also mean Guest, the component could use label ?? "Guest".', ['empty', 'blank']),
      b('Supply the prop that makes the first badge say Captain.', 'label', 'label="Captain"', 'Badge reads the label prop by name. Passing label from the parent connects Captain to that parameter; an unrelated attribute would leave the default in place.', 'Props form the input contract between a parent and child. Matching the name matters: a title prop would not fill a parameter named label. The value flows into the child when React renders it.'),
      q('Both badges use the same component ', 'definition', ' while receiving different inputs.', 'There is one Badge function but two places that render it. Each receives its own props, so the same implementation produces two different labels.', 'Component reuse separates structure from data. The strong element and default behavior are written once in Badge. App selects the content for each instance, allowing consistent markup without copying the implementation.', ['function', 'implementation'])
    ]),
    example(`function Panel({ children }) {
  return <section className="panel">{children}</section>;
}
function App() {
  return     <Panel>
      <h2>Inventory</h2>
    </Panel>;
}`, [
      b('Render the content nested between the Panel tags.', 'children', '{children}', 'Nested JSX arrives through the children prop. Rendering that value inside the section places the supplied heading inside the reusable panel shell.', 'Panel owns its surrounding section but leaves the content to its caller. The children prop carries the h2 element description into that slot. This is composition: building interfaces by placing one component inside another.'),
      q('The Inventory heading becomes a child of the ', 'section', ' element returned by Panel.', 'Panel inserts its children between the opening and closing section tags. App supplies an h2, so that heading appears inside the section in the DOM.', 'The component boundary does not create an extra DOM element named Panel. React evaluates Panel and uses its return value. The visible nesting comes from the section that Panel actually returns.'),
      q('Panel reuses its outer structure through ', 'composition', ' with caller-supplied content.', 'The caller chooses the heading while Panel chooses the wrapper. This arrangement combines components without requiring Panel to know every possible kind of content.', 'A panel might contain a chart, a form, or a heading without changing its implementation. Passing content as children keeps layout responsibility in the panel and domain-specific content in the component that uses it.'),
      q('Replacing h2 with a form requires ', 'zero', ' changes to the Panel definition.', 'Panel renders whatever children it receives. It does not inspect the heading type or title, so different nested markup can use the same wrapper unchanged.', 'The flexible boundary is the children prop. Because Panel makes no assumptions about the content, the parent can swap a heading for a form. The section and its class still come from the same definition.', ['0']),
      q('Without {children} in Panel, the supplied heading would be ', 'absent', ' from the rendered section.', 'Receiving a prop does not automatically render it. Panel must include children in its returned JSX for the nested heading to appear inside its output.', 'Data can reach a component without being used. If Panel returned an empty section, React would render that empty section even though App supplied a heading. Rendering follows the returned element tree.', ['missing', 'omitted', 'invisible'])
    ]),
    example(`function Stock({ count }) {
  return     <div>
      {count > 0 && <span>Available</span>}
      {count === 0 && <span>Sold out</span>}
    </div>;
}
`, [
      q('Stock selects the Sold out branch when count is ', 'zero', ' because only the equality condition passes.', 'Zero fails the greater-than comparison but passes the equality comparison. React omits the false first child and renders the span selected by the second expression.', 'Evaluate each condition separately instead of treating the two lines as an implicit if/else. They happen to be mutually exclusive for nonnegative counts. With zero, only the Sold out element is included.'),
      q('The expression count > 0 produces a ', 'boolean', ' value suitable for conditional rendering.', 'The comparison returns true or false rather than the count itself. This prevents zero from becoming a numeric child when no Available span should appear.', 'JavaScript && returns an operand, not necessarily a boolean. Starting with a comparison makes the false result false, which React omits. Starting with the number zero would instead pass zero through to rendering.'),
      q('Replacing count > 0 with count would display ', '0', ' when count is zero.', 'JavaScript returns the falsy left operand from &&. If that operand is the number zero, React renders the number instead of omitting it like false.', 'This is a common conditional-rendering trap. The expression 0 && <span /> evaluates to 0 before React sees it. Comparing count to zero makes the intended yes-or-no condition explicit.', ['zero']),
      q('With count equal to two, only the ', 'Available', ' span appears.', 'Two is greater than zero and is not equal to zero. The first expression yields its span, while the second yields false and contributes no element.', 'React does not need a special template directive for this branch. Normal JavaScript evaluates both expressions, and their results become children. A false result contributes no text or DOM element.'),
      q('With count equal to negative one, ', 'neither', ' status span appears.', 'Negative one is neither greater than zero nor equal to zero. Both comparisons therefore return false, and the div is rendered without either status span.', 'The snippet assumes nonnegative stock but does not enforce that assumption. Testing a negative count reveals an uncovered case. A real application can validate the input or deliberately render an invalid-stock message.', ['no'])
    ]),
    example(`function RemoveButton({ itemId, onRemove }) {
  return     <button onClick={() => onRemove(itemId)}>
      Remove
    </button>;
}
`, [
      q('The arrow function waits for a ', 'click', ' before calling onRemove with itemId.', 'The JSX passes a function as the click handler. Creating that function does not execute its body, so removal happens only when the event triggers it.', 'A callback lets the child describe an interaction without owning the removal logic. The wrapper also supplies itemId as an argument. Calling onRemove(itemId) directly during rendering would perform the action too early.'),
      q('The parent supplies removal behavior through a ', 'callback', ' prop named onRemove.', 'onRemove is an ordinary function passed as a prop. RemoveButton calls it to report the interaction while the parent decides how its data should change.', 'Data and behavior can both travel through props. This child knows which item was clicked, but it does not need to know whether removal updates local state or sends a request. The callback defines that boundary.', ['function']),
      q('The value sent to onRemove identifies the ', 'item', ' to remove.', 'The handler passes itemId, not the browser event, as its argument. This lets a parent use one removal function for buttons associated with different items.', 'The arrow function closes over the current itemId prop. When the button is clicked, it forwards that identifier to the supplied callback. Each rendered button can therefore invoke shared logic with a different item.'),
      q('Writing onClick={onRemove(itemId)} would invoke removal during ', 'render', ' instead of waiting for interaction.', 'An expression inside JSX braces is evaluated while building the return value. Calling onRemove there immediately executes it and assigns its return value as the handler.', 'React expects onClick to receive a function it can call later. Parentheses call a function now. The arrow wrapper creates the needed function while keeping the actual call inside its body.', ['rendering']),
      q('This child requests a change without directly mutating its ', 'props', ' or the parent data.', 'The button reads itemId and calls onRemove. It does not assign to either prop, preserving the one-way flow of inputs from parent to child.', 'Treat props as read-only inputs for the current render. A child can ask the owner to update data by invoking a callback. The parent then supplies new props on a later render, keeping ownership clear.')
    ])
  ]);
  add(3, 'State, events, and snapshots', 'React Learn: State as a Snapshot; Queueing a Series of State Updates (https://react.dev/learn)', [
    example(`import { useState } from 'react';
function Counter() {
  const [count, setCount] = useState(0);
  function increment() {
    setCount(count + 1);
    setCount(count + 1);
  }
  return <button onClick={increment}>{count}</button>;
}`, [
      q('After the first click, the button displays ', '1', ' even though the handler calls setCount twice.', 'Both calls calculate zero plus one from the same render snapshot. They each request replacement with one, so the final state is one rather than two.', 'A setter queues work; it does not change the count variable inside this handler. Both expressions therefore read zero on the first click. Processing the two replacement requests leaves the counter at one.', ['one']),
      q('Both updates read the same state ', 'snapshot', ' captured by this render.', 'The count value is fixed for this invocation of Counter. Calling setCount schedules a later render instead of rewriting the local count binding immediately.', 'Think of each render as producing its own event handler with its own count value. The first handler sees zero throughout its execution. After the update, a new render creates a handler that sees one.'),
      b('Initialize a state variable that React remembers between renders.', 'useState', 'useState(0)', 'useState returns the current value and a setter. Calling it at the component top level lets React associate that state with this mounted Counter instance.', 'A plain local variable would start over whenever Counter runs. This Hook asks React to retain a value across renders. The initial zero is used when this component instance is first mounted.'),
      q('On the second separate click, the displayed count becomes ', '2', ' because a new handler sees one.', 'After the first update renders, count is one in the new handler. Both requests on the next click therefore replace state with two.', 'Batching updates inside one interaction does not freeze state forever. React processes a completed click before the next deliberate click. The later handler captures the state from the updated render.', ['two']),
      q('React can ', 'batch', ' the two setter calls into one update of the screen.', 'React waits until the event handler finishes before processing these updates together. This avoids an intermediate screen update between the two calls in this handler.', 'Batching groups queued state work for efficiency and consistency. It does not turn replacement values into increments. The meaning of each queued update still depends on whether you supplied a value or an updater function.', ['combine', 'group', 'collect', 'coalesce', 'bundle'])
    ]),
    example(`import { useState } from 'react';
function Counter() {
  const [count, setCount] = useState(0);
  function increment() {
    setCount(n => n + 1);
    setCount(n => n + 1);
  }
  return <button onClick={increment}>{count}</button>;
}`, [
      q('The first click now produces ', '2', ' because each updater receives the pending value.', 'React applies the first function to zero and the second to one. The updater queue therefore produces two even though both calls belong to one handler.', 'An updater describes how to transform the queued state. React passes each result to the next updater, so the functions compose. This is useful whenever several updates may depend on a previous value.', ['two']),
      q('The parameter n represents pending ', 'state', ' when React evaluates each updater.', 'n is supplied by React from the update queue. It is not a browser event or a reference to the unchanged count variable in the handler.', 'The parameter name is arbitrary; previousCount would work equally well. Its meaning comes from the setter API. Returning n + 1 tells React how to derive a new value from the pending state.'),
      q('Using updater functions avoids depending on the handler’s captured ', 'count', ' value for each increment.', 'Neither updater reads count from the surrounding closure. Each computes its result from the argument React provides, allowing consecutive queued increments to build on one another.', 'Closures are not inherently wrong, but a captured value describes one render. When the next value depends on prior state, an updater expresses that dependency directly and keeps the calculation correct within a queue.'),
      q('An updater should be ', 'pure', ' so evaluating it again does not perform an external action.', 'An updater should calculate and return a value without requests, mutations, or other side effects. Development Strict Mode may call it twice to expose impurity.', 'Returning n + 1 is safe to repeat because it changes nothing outside the calculation. Sending a payment inside the updater would not be safe. Event-specific side effects belong outside the state calculation.'),
      q('After two separate clicks, the counter shows ', '4', ' because each click adds two.', 'Every click queues two increments based on pending state. Starting at zero, the first click yields two and the next click takes that value to four.', 'Trace the same queue from a different starting point: two becomes three, then four. The updater functions do not need to capture the displayed count because React supplies the current queued value.', ['four'])
    ]),
    example(`import { useState } from 'react';
function Toggle() {
  const [open, setOpen] = useState(false);
  return     <button onClick={() => setOpen(v => !v)}>
      {open ? 'Close' : 'Open'}
    </button>;
}`, [
      q('Before any clicks, the label is ', 'Open', ' because open starts as false.', 'The initial state selects the false branch of the conditional expression. The button names the action available to the user, rather than repeating the current boolean.', 'A label can describe the next action while state describes the present situation. Here false means closed, so Open is the useful action label. After opening, the label changes to Close.'),
      b('Invert the previous boolean value whenever the button is clicked.', '!', '!v', 'The logical NOT operator reverses the boolean passed to the updater. False becomes true and true becomes false, so repeated clicks alternate the state.', 'The updater receives the pending boolean rather than relying on a captured value. Applying logical NOT calculates the next state without modifying anything else. This makes the toggle safe when updates are queued.'),
      q('After one click, the label changes to ', 'Close', ' when open becomes true.', 'The updater changes false to true. On the resulting render, the conditional expression chooses Close, matching the action that would close the currently open state.', 'State updates cause React to call the component again with the retained new value. JSX is recalculated from that state. You do not manually edit the text node in the click handler.'),
      q('Rendering two Toggle instances gives each its ', 'own', ' independent open state.', 'State belongs to a component instance at its position in the tree. Two separate Toggle elements do not share this state merely because they use the same function.', 'The function definition is reused, but React stores state for each mounted instance. Clicking one button queues an update for that instance. Sharing one open value would require moving ownership into a common parent.', ['separate']),
      q('The setter requests another ', 'render', ' so the label can reflect the updated state.', 'Changing retained state tells React to calculate the interface again. Toggle returns a new label from open, and React applies the necessary change to the DOM.', 'The handler expresses a state change, not a DOM operation. React compares the rendered output and updates the affected text. This keeps the display derived from state instead of requiring manual synchronization.', ['rendering'])
    ]),
    example(`import { useState } from 'react';
function Snapshot() {
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1);
    setTimeout(() => alert(count), 1000);
  }
  return <button onClick={handleClick}>{count}</button>;
}`, [
      q('After the first click, the delayed alert shows ', '0', ' even though the button has advanced.', 'The timeout callback closes over count from the render that created the handler. That value remains zero inside the callback after later renders update the screen.', 'Waiting does not make a closure automatically read newer state. This callback remembers the lexical binding from the initial render. A later render creates a new binding, but it does not rewrite the earlier callback.', ['zero']),
      q('The timeout preserves a ', 'closure', ' over the count value from its originating render.', 'JavaScript functions retain access to bindings in their surrounding scope. React renders create separate local bindings, so this callback retains the earlier render’s count.', 'This behavior comes from JavaScript, not a special timeout rule in React. The same capture occurs in promises and event listeners. Understanding which render created a callback explains which state value it will read.'),
      q('Immediately after setCount, count is still ', '0', ' inside the first click handler.', 'The setter schedules an update but does not assign a new value to count in the running handler. Its local state snapshot stays zero until the handler returns.', 'Even adding a line directly after the setter would read zero in this first handler. To use the next number immediately, compute it in a local variable before passing it to the setter.', ['zero']),
      q('The visible button becomes ', '1', ' after React processes the first click update.', 'The retained state changes to one for the next render even though the old callback still remembers zero. The display and callback refer to different render snapshots.', 'There is no contradiction between the button showing one and the alert showing zero. The button comes from the new render; the timer was scheduled by the old one. Both reflect their own inputs correctly.', ['one']),
      q('Calling setTimeout during the event handler keeps this scheduling out of the ', 'render', ' calculation.', 'The timer is scheduled in response to a user action. Placing that call directly in the component body would schedule work every time React evaluates the component.', 'Rendering should describe the interface without starting unrelated work. A click handler is an appropriate place for work caused by that click. This separation matters because React may evaluate rendering more than once.', ['rendering'])
    ])
  ]);

  add(4, 'Lists, identity, and immutable updates', 'React Learn: Rendering Lists; Updating Arrays in State; Updating Objects in State; Preserving and Resetting State (https://react.dev/learn)', [
    example(`import { useState } from 'react';
function Roster() {
  const [names, setNames] = useState(['Mira', 'Sol']);
  function add() {
    setNames(previous => [...previous, 'Ash']);
  }
  return <button onClick={add}>{names.join(', ')}</button>;
}`, [
      q('The spread expression creates a ', 'new', ' array before appending Ash.', 'Array spread copies the existing entries into a fresh array. Adding Ash to that result leaves the previous state array unchanged and gives React a new reference.', 'Immutability means treating previous state as a snapshot. The updater uses that snapshot to construct the next array rather than pushing into the old one. Existing strings can be reused because they are immutable values.', ['fresh']),
      q('After one click, the array contains ', '3', ' names in their original order plus Ash.', 'The updater copies Mira and Sol, then appends Ash at the end. It does not sort or replace existing entries, so the resulting length is three.', 'Array literal order determines the result: spread the prior entries first, then include the new entry. Reversing those parts would prepend Ash instead. The code therefore specifies both the contents and the ordering.', ['three']),
      b('Append Ash while preserving every entry in the pending array.', 'previous', '...previous', 'The spread operand is the array supplied to the updater. Copying that pending array preserves all updates already ahead of this one in the queue.', 'Using the updater argument makes the addition depend on pending state. If another addition was queued first, its result is included here. Reading a captured names value could instead build from an older snapshot.'),
      q('Using names.push would ', 'mutate', ' the existing state array before React receives a replacement.', 'push changes the original array in place. That breaks the snapshot model and can leave React seeing the same reference if that array is passed back to its setter.', 'An array can be mutable in JavaScript while still needing immutable treatment as React state. Creating a new array communicates the change and preserves older snapshots that other callbacks or renders may still reference.', ['modify', 'change', 'alter', 'update', 'edit']),
      q('The join call derives display text without storing a second ', 'state', ' variable.', 'The label is calculated directly from names on each render. No separate state is needed for the comma-separated text, avoiding two values that must stay synchronized.', 'Derived output is usually simplest to calculate while rendering. If names changes, join produces the corresponding label automatically. Storing both the array and its formatted text would introduce an unnecessary synchronization problem.')
    ]),
    example(`import { useState } from 'react';
function Tasks() {
  const [tasks, setTasks] = useState([{ id: 7, done: false }]);
  const finish = () => setTasks(items => items.map(task =>
    task.id === 7 ? { ...task, done: true } : task
  ));
  return <button onClick={finish}>{String(tasks[0].done)}</button>;
}`, [
      q('The map call keeps the array ', 'length', ' unchanged while replacing a matching item.', 'map returns one result for every input entry. This updater changes the selected object but neither inserts nor removes array entries, so the count stays the same.', 'Choose the array operation that matches the intended transformation. Mapping updates entries in place conceptually while creating a new array. Filtering would instead decide which entries survive, changing the length when items are excluded.'),
      q('The matching task receives a ', 'new', ' object with done set to true.', 'Object spread copies the task fields into a fresh object, then the done property overrides the copied value. The old task object is not modified.', 'A new outer array alone would not protect the old task if you assigned task.done directly. This code also replaces the changed object, preserving immutability at the level where data actually changes.', ['fresh']),
      q('An unmatched task keeps its original object ', 'reference', ' through the false branch.', 'The expression returns task unchanged when its id does not match. The new array can therefore share unchanged objects with the previous array without mutating them.', 'Immutable updates need not deeply copy everything. Reusing unchanged objects saves work and preserves useful identity for comparisons. The important rule is to create new objects along the path whose contents actually change.', ['identity']),
      b('Mark the selected task complete while keeping its other fields.', 'true', 'done: true', 'The replacement object keeps the existing id and overwrites done with true. Returning that object from map updates the matching task without changing unrelated fields.', 'Property order in an object literal matters when names repeat. Because done follows the spread, it wins over the copied false value. Placing the spread after done would restore the old value instead.'),
      q('After clicking the task button, the button text is ', 'true', ' because String converts the boolean.', 'The update replaces the sole task with a completed task. String then converts its done boolean into visible text, whereas a bare boolean JSX child would be omitted.', 'React does not display true or false as text children by default. Explicit conversion makes the diagnostic value visible. This is helpful in examples even though a production interface would usually use a descriptive label.')
    ]),
    example(`function Rows({ items }) {
  return     <ul>
      {items.map(item => (
        <li key={item.id}><input defaultValue={item.name} /></li>
      ))}
    </ul>;
}`, [
      q('The stable key ties each row’s identity to its ', 'id', ' rather than its current array position.', 'React uses the item identifier to match sibling rows between renders. Moving an item can preserve its existing row and input instead of reusing a different positional row.', 'Keys become especially important when children have retained state or browser-managed input values. An item identifier continues to name the same logical item after reordering. An index names a position that may now hold another item.'),
      q('Using array indexes as keys during reordering can attach input values to the ', 'wrong', ' items.', 'Index keys preserve identity by position. After a reorder, an existing uncontrolled input can stay in that position while the item represented there has changed.', 'The defaultValue initializes an input but does not control later edits. Reusing that input for another item can therefore display the previous item’s edited value. Stable data keys preserve the intended association.', ['incorrect']),
      q('Keys must be unique among ', 'siblings', ' in this list rather than across the entire application.', 'React compares keys within a sibling collection. Another separate list can reuse the same ids, provided each list has no duplicate keys among its own children.', 'A key identifies an element in its parent’s reconciliation context. Two rows under this ul need distinct keys, but a row in another ul can use the same value without colliding.'),
      q('Generating a random key on every render would ', 'remount', ' each row instead of preserving its identity.', 'Fresh keys make React treat rows as new children. The previous rows are removed, and replacement inputs are created, potentially losing user edits and focus.', 'A key should be stable for the lifetime of the logical item. Random values generated during rendering defeat that stability. A database id or an id assigned when the item is created usually expresses the intended identity.', ['recreate', 'replace']),
      q('The key belongs on the ', 'li', ' because it is the element directly returned by map.', 'The mapped siblings are li elements, so React needs their keys at that level. A key only on the nested input would not identify the outer mapped rows.', 'Reconciliation matches the immediate children of the list. Keys buried inside those children cannot identify the outer elements. Place the key on whichever element or component the mapping callback directly returns.')
    ]),
    example(`import { useState } from 'react';
function Inbox() {
  const [ids, setIds] = useState([2, 4, 6]);
  function removeFour() {
    setIds(current => current.filter(id => id !== 4));
  }
  return <button onClick={removeFour}>{ids.join(', ')}</button>;
}`, [
      q('After one click, ', '2', ' entries remain because the id 4 is excluded.', 'filter keeps entries whose predicate returns true. Two and six pass the not-equal comparison, while four fails it, leaving exactly two entries in the new array.', 'Filtering selects a subset without changing the retained values. The callback is tested independently for every id. The output order remains two followed by six because filter preserves the order of surviving entries.', ['two']),
      q('The predicate must return ', 'false', ' for the id that should be removed.', 'filter retains values when the predicate is truthy and excludes them when it is falsy. For four, the expression id !== 4 evaluates to false.', 'A removal predicate can feel backward because the callback answers which items to keep. Here not-equal describes the survivors. Writing id === 4 would keep only four, producing the opposite result.'),
      q('Calling filter creates a new ', 'array', ' even when no entries are removed.', 'filter always constructs an output array. A second click therefore returns a new array containing the same two numbers, although the visible label stays the same.', 'Reference identity and displayed contents are different properties. Two arrays can contain identical values while being different objects. This matters when reasoning about state equality checks and dependencies that compare references.'),
      q('The original array keeps its contents because filter is ', 'nonmutating', ' when the predicate itself performs no mutations.', 'This predicate only compares numbers, and filter does not remove entries from its input. The prior state array remains intact while the updater returns the selected values.', 'The nonmutating operation protects the array structure, but a callback could still mutate objects if written to do so. This callback has no such side effect; it simply decides whether each number survives.', ['immutable']),
      q('Clicking again leaves the visible list ', 'unchanged', ' because no id 4 remains to remove.', 'The second filter keeps both remaining ids. It still returns a new array, but joining its values produces the same displayed text as after the first click.', 'Removing an already absent identifier is harmless in this implementation. The operation is idempotent with respect to contents: applying it again does not change which ids remain, even though the array reference is new.', ['identical'])
    ])
  ]);
  add(5, 'Forms and shared state', 'React Learn: Reacting to Input with State; Sharing State Between Components; Choosing the State Structure (https://react.dev/learn)', [
    example(`import { useState } from 'react';
function NameField() {
  const [name, setName] = useState('');
  return <label>Name
    <input value={name}
      onChange={event => setName(event.target.value)} />
  </label>;
}`, [
      q('The input is ', 'controlled', ' because its displayed value comes from React state.', 'The value prop makes name the source of the input’s text. onChange updates that state so React can render the latest edit back into the field.', 'A controlled field has a cycle: the user edits, the handler reads the event, state changes, and the next render supplies value. This keeps the input and other UI derived from name consistent.'),
      b('Read the edited text from the input element in the change event.', 'value', 'event.target.value', 'A text input exposes its current text through value. Reading that property gives setName the string the user just entered rather than the event object.', 'The event reports which DOM element changed. Its target is the input, whose value contains the text at that moment. Storing the string keeps component state focused on the form data.'),
      q('Removing onChange while retaining value would make editing effectively ', 'read-only', ' unless another mechanism updates name.', 'The value prop keeps forcing the field to reflect name. Without a handler that updates name, typed edits cannot persist in the controlled input.', 'React warns about a controlled value without a change handler unless readOnly is specified. If editing is intended, update state synchronously from the input event so the next value reflects the user’s entry.', ['readonly']),
      q('Starting name with an empty ', 'string', ' keeps the input controlled from its first render.', 'An empty string is a defined text value. Starting with undefined and later supplying a string would switch the field from uncontrolled to controlled, which React warns about.', 'Controlledness should stay consistent for the lifetime of an input. Using an empty string represents no text while still supplying a value. It avoids making the first render follow a different ownership model.'),
      q('Wrapping the input in a ', 'label', ' associates the word Name with the field.', 'A label containing its input provides a native association. Clicking the label can focus the input, and assistive technology can use that text as the accessible name.', 'Form accessibility is part of the markup design. This nesting provides a label without needing an id and htmlFor pair. Placeholder text alone would not provide the same persistent visible labeling.')
    ]),
    example(`import { useState } from 'react';
function Signup() {
  const [agreed, setAgreed] = useState(false);
  return <label>
    <input type="checkbox" checked={agreed}
      onChange={e => setAgreed(e.target.checked)} />
    Accept terms
  </label>;
}`, [
      b('Use the checkbox’s boolean selection state as the next agreed value.', 'checked', 'e.target.checked', 'checked is the boolean indicating whether the checkbox is selected. The value property describes its submitted value and does not track the current check mark.', 'Text fields and checkboxes expose different data for controlled interaction. A checkbox uses checked both as its React prop and as the DOM property read from the event. Keeping those aligned preserves boolean state.'),
      q('The initial checkbox is ', 'unchecked', ' because agreed starts as false.', 'The checked prop is false on the first render. React therefore displays an unselected checkbox until an event updates agreed to true through the handler.', 'The initial state drives the initial control appearance. This example does not need to query the DOM to discover whether the user has agreed. That answer lives in the same state that controls the check mark.'),
      q('The handler stores a ', 'boolean', ' rather than the checkbox’s string value.', 'The checked property returns true or false. That matches the meaning of agreed and supports direct conditions elsewhere in the form without string conversion.', 'Using the value property could store a string such as on even after a checkbox is cleared. A truthy string would misrepresent consent. Reading checked preserves the actual selected or unselected state.'),
      q('To control whether the box is selected, this input uses ', 'checked', ' instead of a text field’s value prop.', 'Checkbox selection is controlled through checked. A value prop can describe what the checkbox submits, but does not itself determine whether a check mark appears.', 'A checkbox has both a selection state and a submission value. They answer different questions. React’s checked prop owns the selection state, which is the part this component needs to synchronize with agreed.'),
      q('After selecting and then clearing the box, agreed returns to ', 'false', ' in state.', 'Each change reads the current DOM checked property. Clearing the box sends false to the setter, and the subsequent render supplies that same false back to checked.', 'The handler reads the actual edited state instead of assuming every event should invert a captured value. The controlled render then reflects that state, completing the same event-to-state-to-view loop for either direction.')
    ]),
    example(`import { useState } from 'react';
function SearchForm({ onSearch }) {
  const [query, setQuery] = useState('');
  function submit(event) {
    event.preventDefault();
    onSearch(query.trim());
  }
  return <form onSubmit={submit}>
    <input aria-label="Search" value={query} onChange={e => setQuery(e.target.value)} />
    <button type="submit">Search</button>
  </form>;
}`, [
      q('preventDefault cancels the browser’s normal form ', 'submission', ' so the callback can handle the search.', 'The submit handler prevents the default navigation or reload associated with form submission. It then forwards the trimmed query to the behavior supplied by the parent.', 'Using the form submit event preserves native ways to submit, including the button and keyboard. preventDefault replaces the browser’s navigation behavior, while the application decides what searching means through onSearch.', ['navigation']),
      q('Submitting a query containing only spaces passes an ', 'empty', ' string to onSearch.', 'trim removes whitespace from both ends. A string made entirely of spaces has no remaining characters, and this handler forwards that empty result without additional validation.', 'Trimming is normalization, not validation. If empty searches should be blocked, the handler needs a separate condition before calling onSearch. The current snippet deliberately lets the callback decide how to handle the result.'),
      q('The onSubmit handler also supports submission using the ', 'Enter', ' key from this text field.', 'A native form with a submit button supports keyboard submission. Handling the form event covers that interaction as well as clicking the visible Search button.', 'Attaching search logic only to a button click can miss other form submission paths. The form is the semantic boundary for the action, so its submit event is the appropriate place for shared submission behavior.'),
      q('Trimming the submitted string leaves the visible query state ', 'unchanged', ' because no setter is called in submit.', 'trim returns a new string but does not mutate query. The handler passes that result to onSearch while the input continues displaying the original state value.', 'JavaScript strings are immutable, and transformations return new strings. To also clean up the visible input, the handler would need to store the trimmed result with setQuery. Forwarding it alone does not update state.', ['untouched']),
      q('The search runs in an event handler rather than an ', 'Effect', ' because submission is a specific interaction.', 'The operation is caused by submitting the form, not merely by the component appearing. Keeping it in submit avoids rerunning searches for unrelated renders or synchronization cycles.', 'Effects synchronize with external systems when rendered state requires it. An explicit user action already has a precise event boundary. Performing its work there makes the cause and timing clear without an extra state flag.')
    ]),
    example(`import { useState } from 'react';
function Mirror() {
  const [text, setText] = useState('');
  const field = label => <input aria-label={label}
    value={text} onChange={e => setText(e.target.value)} />;
  return <>
    {field('First')}{field('Second')}
    <p>{text.length} characters</p>
  </>;
}`, [
      q('Typing in either input updates ', 'both', ' fields because they read the same state.', 'Both value props receive text and both change handlers update that same value. The next render therefore supplies the edited string to each input.', 'Shared behavior needs a shared source of truth. These fields do not copy values into each other through DOM calls or effects. They stay synchronized because their parent owns one text value.'),
      q('The paragraph’s character count is ', 'derived', ' from text during rendering.', 'text.length can be calculated directly from existing state. Storing it separately would create another value that must be kept consistent whenever text changes.', 'A value that can be calculated cheaply from current props or state usually does not need its own state. Computing length during render guarantees that the paragraph corresponds to the same text used by the inputs.'),
      q('Moving a shared value to the common parent is called ', 'lifting', ' state up.', 'Mirror owns the state used by both fields. This is the same ownership change needed when two child components must coordinate values that were previously independent.', 'Find the closest common parent of the components that need the value. Store the value there and pass data and update callbacks down. The arrangement gives each consumer a consistent view without duplicated state.'),
      q('If each field owned separate state, their text could ', 'diverge', ' after editing just one field.', 'Independent state belongs to independent owners. Without a shared value or explicit coordination, changing one field would not change the other field’s retained text.', 'Two uses of the same component do not automatically share state. Lifting the value is a deliberate design choice for synchronized fields. Independent ownership is equally useful when the fields should be edited separately.', ['differ', 'drift', 'separate', 'mismatch', 'desynchronize']),
      q('Entering abc makes the paragraph display ', '3', ' characters.', 'The string abc has length three. Because the paragraph reads text.length on the same render as the inputs, the displayed count follows the edited value immediately.', 'This example uses ordinary ASCII letters, so JavaScript string length matches the visible letter count. More complex text such as emoji can require grapheme-aware counting if the product needs user-perceived characters.', ['three'])
    ])
  ]);

  add(6, 'Effects and resource lifetimes', 'React Learn: Synchronizing with Effects; Removing Effect Dependencies; You Might Not Need an Effect (https://react.dev/learn)', [
    example(`import { useEffect } from 'react';
function PageTitle({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return <h1>{title}</h1>;
}
`, [
      q('The Effect synchronizes an external browser ', 'title', ' with the current prop.', 'The heading is described by JSX, while document.title lives outside that returned tree. The Effect updates that browser-owned value after React commits the render.', 'An Effect is useful when rendered inputs need to stay synchronized with an external system. The tab title is one such system. The heading itself needs no Effect because React already controls it through JSX.'),
      b('Declare the reactive value read by this Effect as its dependency.', 'title', '[title]', 'The Effect reads title, so title belongs in its dependency list. React can rerun the synchronization when that prop changes instead of keeping a stale tab title.', 'Dependencies describe the reactive inputs used by the Effect. They are not a manually chosen schedule. Leaving title out would hide a real dependency and let the browser title fall behind the displayed heading.'),
      q('Changing title from Home to About causes the Effect to ', 'rerun', ' after the updated render commits.', 'React compares the dependency value with its previous value. The changed string triggers another setup call, which assigns the new value to document.title.', 'Dependency comparison uses Object.is for each listed value. Distinct strings compare differently, so the synchronization runs for About. Re-rendering with the same title does not by itself require this Effect to run again.', ['run', 'execute', 'resynchronize', 'update', 'fire']),
      q('A render with the same title does ', 'not', ' require this Effect to run again because its dependency is unchanged.', 'An unchanged dependency lets React skip the Effect for that update. The component may still render for other reasons while this particular synchronization remains unnecessary.', 'Rendering and Effect execution are related but distinct. React first calculates and commits the UI. It then considers whether an Effect’s dependencies changed, rather than blindly rerunning every Effect after every render.'),
      q('Writing document.title in the component body would make rendering ', 'impure', ' by changing external state.', 'A render should calculate UI without modifying browser globals. Updating the document during that calculation performs an external side effect before React has committed the result.', 'React may evaluate rendering work that never commits. If that work changed the tab title, the browser could reflect a discarded render. Moving synchronization into an Effect ties it to committed output instead.')
    ]),
    example(`import { useEffect, useState } from 'react';
function Clock() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return <p>{seconds}</p>;
}`, [
      b('Release the interval when React cleans up this Effect.', 'clearInterval', 'clearInterval(id)', 'clearInterval stops the timer created by setInterval. Returning a function lets React perform that cleanup when the component unmounts or the Effect is restarted.', 'Every setup should have an appropriate teardown for the resource it creates. The interval id identifies this specific timer. Cleaning it up prevents a removed Clock from leaving a repeating callback running in the background.'),
      q('The updater reads pending state, so seconds is ', 'unnecessary', ' as an Effect dependency here.', 'The Effect does not read seconds from the component scope. Its callback transforms the state argument React supplies, so no seconds dependency is needed for this calculation.', 'Using setSeconds(seconds + 1) would capture a render’s value and create a dependency on it. The updater avoids that read. Stable React setters do not need to be included just to satisfy dependency completeness.', ['unneeded']),
      q('Without cleanup, removing Clock would leave the interval ', 'running', ' in the browser.', 'Unmounting a component does not automatically cancel timers it created. The browser continues invoking the interval until it is explicitly cleared or the page is destroyed.', 'Resources created outside React need explicit lifetime management. React knows how to call your cleanup but cannot infer which timer to stop. Returning clearInterval with the captured id supplies that missing connection.', ['active']),
      q('Development Strict Mode can perform an extra setup and ', 'cleanup', ' cycle to check this Effect.', 'Strict Mode exercises setup, cleanup, and setup again in development. Correct teardown leaves one active interval after that check instead of accidentally doubling the ticking rate.', 'The check tests whether the component can safely stop and restart synchronization. It is not a reason to remove cleanup or hide the second setup. Matching resource creation and release makes both development and real remounts work.'),
      q('The empty dependency array describes no reactive reads, not a guarantee of exactly ', 'one', ' setup call in every environment.', 'An empty list avoids reruns caused by changing dependencies, but remounts and development checks can still start the Effect again. Setup must therefore tolerate a matching cleanup and restart.', 'Treat an Effect as a synchronization process with a lifetime, not as an instruction to run once forever. A component can be removed and mounted again, and each mount needs its own timer.', ['1'])
    ]),
    example(`import { useEffect } from 'react';
function EscapeListener({ onEscape }) {
  useEffect(() => {
    const handle = e => { if (e.key === 'Escape') onEscape(); };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [onEscape]);
  return null;
}`, [
      q('Cleanup removes the same handler ', 'reference', ' that setup registered.', 'removeEventListener must receive the function used when adding the listener, along with the matching event type and capture setting. The closure retains exactly that function.', 'Creating a new arrow function in cleanup would produce a different function object even if its body looked identical. Storing handle inside the Effect lets setup and cleanup share the registration identity.', ['identity']),
      q('When onEscape changes, React cleans up the old listener ', 'before', ' installing the replacement.', 'For an Effect with changed dependencies, React runs the previous cleanup before the next setup. This prevents the old and new callbacks from accumulating as active listeners.', 'Each Effect invocation captures the callback from its own render. Cleanup removes the listener with the old callback, then setup installs one using the new callback. The ordering keeps synchronization aligned with current props.'),
      q('Returning null means this component renders no ', 'DOM', ' elements of its own.', 'The component can manage an Effect while returning no visual children. null contributes no element to the rendered tree, though the component itself still has a lifecycle.', 'A component’s returned UI and its synchronization responsibilities are separate. This helper produces no visible markup, but mounting and unmounting it still determine when its global keyboard listener exists.', ['HTML']),
      q('Omitting onEscape from dependencies risks calling a ', 'stale', ' callback after the prop changes.', 'The listener closes over the callback from its setup render. Without resynchronizing on a changed prop, it can continue invoking the old function instead of the current one.', 'An empty dependency list would not make the callback magically current. It would preserve the first closure until unmount. Including the dependency makes React replace the subscription when its behavior changes.', ['outdated', 'old']),
      q('A new inline onEscape function from the parent can cause ', 'resubscription', ' on each parent render.', 'A newly created function has a different reference. React sees a changed dependency, so this Effect removes the prior listener and installs one with the new callback.', 'This is correct behavior but may perform extra setup work. If it becomes costly, the parent can stabilize the callback appropriately or the subscription design can change. Removing a real dependency is not a correctness-preserving optimization.', ['resynchronization'])
    ]),
    example(`function Summary({ items }) {
  const completed = items.filter(item => item.done);
  const remaining = items.length - completed.length;
  return     <p>
      {completed.length} done, {remaining} remaining
    </p>;
}`, [
      q('Both counts are ', 'derived', ' from items without an Effect or extra state.', 'The component can calculate both values from its current prop while rendering. No external system is involved, and no retained value needs separate synchronization.', 'An Effect that copied these counts into state would first render with old counts and then schedule another update. Direct calculation keeps the displayed values consistent with the current items in one render.'),
      q('For five items with two done, remaining equals ', '3', ' in the returned paragraph.', 'Filtering finds the two completed entries, then subtraction removes that count from the total of five. The resulting remaining count is three on that render.', 'Both counts come from the same items array during one calculation. There is no timing gap between updating completed and remaining. This is one benefit of deriving related values instead of maintaining separate state fields.', ['three']),
      q('Filtering inside render is safe because this predicate performs no ', 'mutation', ' of the prop array or its objects.', 'filter creates an output array and this callback only reads done. The input data stays unchanged, so the calculation can be repeated without altering its source.', 'Render purity permits local calculations and creation of new values. It forbids changing preexisting objects or external systems. Reading items and selecting entries is a normal part of computing the next UI.'),
      q('Putting completed in state would introduce ', 'redundant', ' data that must stay synchronized with items.', 'The completed list is already determined by items. Retaining both creates two representations of the same information and opportunities for one to lag behind the other.', 'State should capture information that cannot simply be recovered from current inputs. A filtered view is recoverable. Keeping only the source data reduces update paths and makes impossible combinations of counts less likely.', ['duplicate', 'duplicated', 'unnecessary']),
      q('A later items prop causes the counts to update during the next ', 'render', ' without a dependency array.', 'The function recalculates completed and remaining whenever React renders Summary with the new items. Ordinary render calculations do not need Effect dependency declarations.', 'Dependencies belong to APIs that retain work across renders, such as Effects or memoization. A normal expression simply runs as part of the component function. That directness is often the right default for derived UI.', ['rendering'])
    ])
  ]);
  add(7, 'Custom hooks, refs, and async work', 'React Learn: Reusing Logic with Custom Hooks; Referencing Values with Refs; Synchronizing with Effects (https://react.dev/learn)', [
    example(`import { useState } from 'react';
function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  return { count, increment: () => setCount(n => n + 1) };
}
function Counter() {
  const { count, increment } = useCounter(5);
  return <button onClick={increment}>{count}</button>;
}`, [
      q('useCounter shares stateful ', 'logic', ' while each caller retains its own state.', 'Extracting useState into a custom Hook reuses the implementation. Separate calls still allocate separate state in their calling components rather than creating a shared global counter.', 'A custom Hook is a function that calls other Hooks under the usual rules. Its state belongs to each calling component. Two Counter instances both start at five but can be incremented independently.', ['behavior', 'behaviour']),
      b('Advance the counter from the value React supplies to the updater.', 'n', 'n + 1', 'The updater parameter contains the pending count. Returning n plus one increments from that value instead of relying on a possibly older count captured by the callback.', 'The Hook can hide update details while exposing a small interface. Callers receive count and increment, and need not know how the setter works. The updater remains pure and builds on queued state.'),
      q('The first displayed count is ', '5', ' because the caller passes that initial value.', 'useCounter forwards its initial argument into useState. On the first mount, that value initializes count to five before Counter renders its button.', 'Default parameters only apply when the caller leaves an argument undefined. This caller supplies five, so the default zero is unused. The value initializes state rather than becoming a permanent constraint on it.', ['five']),
      q('Changing initial on a later render does not automatically ', 'reset', ' the existing count state.', 'useState uses its initial argument for initialization. Later renders retain the current state, so changing an initializer argument is not a request to replace an existing counter.', 'If a changed identity should start a fresh counter, a key can remount the component. If a user action should reset it, an explicit setter can do that. Repassing an initializer alone does neither.', ['reinitialize', 'overwrite', 'replace', 'restore', 'restart']),
      q('The use prefix identifies this function as a custom ', 'Hook', ' that must follow Hook calling rules.', 'useCounter calls useState, so callers must invoke it at a stable top-level position in a component or another Hook. Naming it with use communicates that constraint.', 'Extracting a Hook does not remove the rules governing the Hooks inside it. Calling useCounter conditionally would conditionally call useState as well. The naming convention helps tools and readers recognize that hidden stateful behavior.')
    ]),
    example(`import { useRef } from 'react';
function FocusField() {
  const inputRef = useRef(null);
  return <>
    <input ref={inputRef} aria-label="Name" />
    <button onClick={() => inputRef.current?.focus()}>Focus</button>
  </>;
}`, [
      b('Read the DOM node currently held by the ref before focusing it.', 'current', 'inputRef.current', 'React places the mounted input node in the ref’s current property. The click handler reads that node and invokes its native focus method if it is available.', 'A ref bridges React’s declarative tree and an imperative DOM operation. Focusing is an appropriate use because the browser owns focus. Optional chaining also handles the case where no node is currently attached.'),
      q('The ref starts as ', 'null', ' before React attaches the input node.', 'useRef receives null as its initial value. React assigns the actual DOM element during commit, so rendering should not assume the node is already attached.', 'The first component evaluation describes an input that does not yet exist in the committed tree. The ref is filled when React attaches that element. Event handlers run later and can safely access the committed node.'),
      q('Updating ref.current alone does not trigger a ', 'render', ' of the component.', 'Refs retain mutable values without scheduling React updates. They are useful for imperative handles or bookkeeping, but values that determine visible UI generally belong in state.', 'React state setters notify React of changes; assigning a ref does not. If a displayed counter lived only in current, it could change internally while the screen stayed the same. This ref instead holds a DOM handle.', ['rerender', 're-render']),
      q('The optional chaining operator avoids calling focus when current is ', 'null', ' or undefined.', 'The ?. operator stops the property access when the ref value is nullish. That makes the handler tolerant of a temporarily absent node rather than throwing an exception.', 'Refs can be cleared when nodes are removed from the tree. Checking their current value is therefore part of safe imperative access. Optional chaining provides a compact guard without pretending that a node always exists.'),
      q('The native focus call belongs in this event ', 'handler', ' instead of the render calculation.', 'The user’s button click causes the focus change. Performing that imperative action in the handler avoids moving focus just because React evaluates the component again.', 'Render can happen for many reasons unrelated to user intent. If rendering itself focused the input, unrelated updates could steal focus. The click handler provides a precise and predictable cause for this browser action.')
    ]),
    example(`import { useEffect, useState } from 'react';
// loadUser(id) is supplied and returns a Promise of a user.
function useUser(id, loadUser) {
  const [result, setResult] = useState(null);
  useEffect(() => {
    let ignore = false;
    loadUser(id).then(user => { if (!ignore) setResult({ id, user }); },
      error => { if (!ignore) setResult({ id, error }); });
    return () => { ignore = true; };
  }, [id, loadUser]);
  return result?.id === id ? result : null;
}`, [
      q('Cleanup marks an obsolete request so its result is ', 'ignored', ' if it arrives later.', 'The old Effect’s closure gets ignore set to true. Its success and failure callbacks check that flag before updating state, preventing an outdated response from winning a race.', 'Requests can finish in a different order than they started. If id changes from A to B, A might arrive last. Cleanup does not control arrival order; it prevents the old request from publishing its result.', ['discarded']),
      q('The ignore flag does not actually ', 'cancel', ' the underlying network request.', 'The flag only controls whether callbacks call setResult. The supplied loader can continue working; stopping its network activity would require a cancellation mechanism supported by that loader.', 'Ignoring stale results protects UI correctness even when a request cannot be canceled. Cancellation is a separate resource concern. A loader using fetch could accept an AbortSignal, but this loader contract does not include one.', ['abort', 'stop', 'terminate', 'interrupt']),
      q('The id comparison returns null instead of showing a ', 'previous', ' user while a different id is loading.', 'The saved result carries the id that produced it. If that id differs from the current input, the Hook returns null rather than exposing data for the wrong user.', 'The Effect starts after commit, so merely clearing state inside an Effect can leave a render with old data. Tagging the result and checking it during render prevents that mismatch for a different requested id.', ['stale', 'wrong', 'different']),
      q('The second then callback records a rejected request’s ', 'error', ' when the request is still current.', 'Promise.then accepts a rejection callback as its second argument. This one stores the error with its id, while also obeying the same stale-result guard as the success path.', 'Loading code should define failure behavior as well as success behavior. A consumer can distinguish a result with user from a result with error. Guarding both paths prevents an old failure from replacing a newer success.'),
      q('Changing loadUser’s function identity can ', 'restart', ' the Effect even when id stays the same.', 'Both id and loadUser are dependencies. A different loader function causes cleanup and setup again because the behavior used to fetch data is a reactive input too.', 'Passing a fresh inline loader every render can cause repeated requests. Prefer a stable imported loader or an appropriately stabilized callback when its behavior is unchanged. Omitting the dependency would instead risk using obsolete behavior.', ['rerun', 'resynchronize', 'retrigger', 'trigger'])
    ]),
    example(`import { useState } from 'react';
function Details({ visible }) {
  const [expanded, setExpanded] = useState(false);
  if (!visible) return null;
  return <button onClick={() => setExpanded(v => !v)}>
    {expanded ? 'Less' : 'More'}
  </button>;
}`, [
      q('Calling useState before the early return preserves Hook ', 'order', ' across visible and hidden renders.', 'The state Hook is invoked on every render before the condition can return. React therefore encounters the same sequence of Hooks whether visible is true or false.', 'Moving useState below the condition would make it run only for visible renders. Hooks rely on stable call order to associate retained state with each call. Place ordinary Hooks before conditional returns.'),
      q('Returning null hides output without necessarily ', 'unmounting', ' Details itself.', 'If the parent continues rendering Details at the same position, the component remains mounted even when its return value is null. Its own expanded state is retained.', 'There is a difference between a component returning no UI and a parent removing that component. The first keeps the component instance. The second ends its lifetime and discards its local state.', ['removing']),
      q('After expanding and temporarily setting visible false, showing this same instance again displays ', 'Less', ' because expanded was retained.', 'The component’s identity and state survive its null output. Returning to visible true therefore uses the existing expanded value rather than initializing it to false again.', 'Trace ownership rather than visible DOM alone. The button disappears, but expanded belongs to Details, which the parent still renders. When the button returns, it reflects the retained component state.'),
      q('A parent that removes Details entirely would discard its local ', 'state', ' on unmount.', 'Removing the component ends the lifetime of its retained Hooks. Mounting a fresh Details later creates new state initialized from false, even if the props look identical.', 'State preservation follows component identity in the tree. Hiding with a prop can preserve an instance; omitting the element removes it. Choose the approach based on whether hidden content should remember its previous interaction.'),
      q('Calling useState only inside the visible branch would violate the Rules of ', 'Hooks', ' when visibility changes.', 'Ordinary state Hooks must not be called conditionally. A changing branch would change which Hooks React encounters, breaking the stable sequence needed to retain their state correctly.', 'The safe conditional part is the returned UI, not whether useState runs. This snippet always initializes or reads the Hook first, then chooses whether to produce a button. That preserves the Hook contract.')
    ])
  ]);

  add(8, 'Reducers, context, and state ownership', 'React Learn: Extracting State Logic into a Reducer; Passing Data Deeply with Context; Scaling Up with Reducer and Context (https://react.dev/learn)', [
    example(`import { useReducer } from 'react';
function reducer(state, action) {
  if (action.type === 'add') return state + action.amount;
  if (action.type === 'reset') return 0;
  return state;
}
function Counter() {
  const [count, dispatch] = useReducer(reducer, 0);
  return <button onClick={() => dispatch({ type: 'add', amount: 2 })}>{count}</button>;
}`, [
      b('Send the add action to React so the reducer calculates the next state.', 'dispatch', 'dispatch({', 'dispatch queues an action for the reducer. React calls the reducer with current state and that action, then retains the returned value for the next render.', 'The event handler describes what happened through an action object. The reducer owns the transition rules. This separates interaction wiring from state calculation and lets multiple events reuse the same transition logic.'),
      q('The first click produces a count of ', '2', ' by applying the add action to zero.', 'The action type selects the add branch and amount supplies two. The reducer returns zero plus two, which becomes the count on the next render.', 'An action is ordinary data whose meaning comes from the reducer. There is no built-in add operation associated with its type string. The branch in reducer defines exactly how this application interprets that action.', ['two']),
      q('An unrecognized action returns the existing ', 'state', ' in this reducer’s final branch.', 'Neither known condition matches, so execution reaches return state. This implementation deliberately ignores unknown actions rather than throwing an error or returning undefined.', 'A reducer should make its fallback behavior explicit. Some applications throw for unknown action types to reveal programming mistakes. This example chooses a no-op transition, preserving the current value without inventing a replacement.'),
      q('The reducer must remain ', 'pure', ' so the same state and action yield the same result.', 'Its job is to calculate state without mutating inputs or performing external work. React may evaluate reducer calls again during development checks, making side effects unsafe here.', 'A request or random id generation inside the reducer can behave differently when repeated. Create event-specific data outside the reducer and include it in the action. The reducer can then apply deterministic transition rules.'),
      q('Dispatching reset after several additions returns the count to ', '0', ' regardless of its prior value.', 'The reset branch returns zero directly and does not inspect the previous number. That defines a replacement transition instead of another increment based on existing state.', 'Different action types can encode different transition semantics in one place. Add derives from current state, while reset replaces it. Keeping both rules in the reducer makes the complete state behavior easier to inspect.', ['zero'])
    ]),
    example(`import { createContext, useContext } from 'react';
const Theme = createContext('light');
function Label() {
  const theme = useContext(Theme);
  return <p>{theme}</p>;
}
function App() {
  return <Theme.Provider value="dark"><Label /></Theme.Provider>;
}`, [
      q('Label displays ', 'dark', ' because its nearest matching provider supplies that value.', 'useContext reads the closest Theme provider above Label. The provider supplies dark, which takes precedence over the light fallback passed to createContext.', 'The context object identifies a channel, and a provider supplies a value for descendants using that channel. Label does not need a theme prop passed through every intermediate component to read the current value.'),
      b('Read the nearest Theme provider from inside Label.', 'useContext', 'useContext(Theme)', 'useContext subscribes this component to the Theme value supplied above it. It returns the fallback only if no matching provider exists in the ancestor tree.', 'Creating a context does not itself read its current value. The Hook performs that read for the calling component and connects it to updates. The same context object must be used by both provider and consumer.'),
      q('Without any Theme provider above it, Label would display ', 'light', ' from the context fallback.', 'createContext records a fallback used when no matching provider is found. Removing this provider would therefore make Label receive light instead of the supplied dark value.', 'The fallback is static; it is not a separate state variable or a value that updates by itself. It gives consumers a defined behavior outside providers, useful for defaults or deliberately missing-provider detection.'),
      q('A closer nested Theme provider would ', 'override', ' the outer value for its descendants.', 'Context lookup stops at the nearest matching provider above the consumer. A nested provider can therefore supply a different theme for one subtree without changing siblings outside it.', 'Provider scope follows the component tree. A nested light region inside a dark application can read light while surrounding components read dark. This is local scoping of a value, not mutation of the outer provider.', ['replace', 'shadow', 'supersede', 'mask']),
      q('If the provider’s value changes, Label can render again because it ', 'subscribes', ' to that context.', 'useContext makes the consumer respond to changes in the supplied value. Context is more than a one-time lookup; React tracks the connection between provider and consumer.', 'A consumer needs updated output when its contextual input changes. Even a memoized component can render for a context update it consumes. Prop equality does not mean every other input to rendering stayed unchanged.', ['listens', 'responds', 'reacts', 'connects'])
    ]),
    example(`import { useReducer } from 'react';
function reducer(state, action) {
  if (action.type === 'start') return { status: 'loading', error: null };
  if (action.type === 'fail') return { status: 'error', error: action.error };
  return state;
}
function RequestStatus() {
  const [state, dispatch] = useReducer(reducer, { status: 'idle', error: null });
  return <button onClick={() => dispatch({ type: 'start' })}>{state.status}</button>;
}`, [
      q('The start action sets status to ', 'loading', ' and clears the previous error in one transition.', 'The reducer returns one object containing both changes. This avoids updating status while accidentally retaining an error message from an earlier failed attempt.', 'Related fields often need coordinated transitions. Encoding the transition as one returned state object makes that relationship explicit. Every start action follows the same rule regardless of which event triggered it.'),
      q('Using one status field prevents simultaneous loading and error ', 'flags', ' from contradicting each other.', 'A single string holds one status at a time. Separate isLoading and isError booleans could represent unintended combinations unless every update carefully maintained their relationship.', 'State design determines which combinations are easy to represent. A status value narrows the possibilities to named modes such as idle, loading, or error. The reducer can then define allowed transitions between those modes.', ['booleans']),
      q('The fail action carries error details as its ', 'payload', ' for the reducer to store.', 'The reducer reads action.error and places it in the returned state. The action supplies the transition’s data while its type selects which transition rule should run.', 'Payload is the conventional name for data carried by an action, even when there is no property literally named payload. Here the error field supplies the information needed to explain a failed request to the user.', ['data']),
      q('The returned object ', 'replaces', ' the previous reducer state rather than automatically merging into it.', 'useReducer retains exactly the value the reducer returns. Any field that should survive must be included in that returned value, explicitly or through an appropriate spread.', 'A reducer is not a partial-object patch API. Returning only status would drop error rather than preserving it automatically. This example includes both fields so each transition defines the complete state shape.', ['supersedes', 'overwrites', 'becomes', 'substitutes']),
      q('A network request triggered by Start belongs outside the ', 'reducer', ' because the reducer only calculates state.', 'The reducer should not initiate external work. An event handler or a suitable data layer can perform the request and dispatch actions representing its start, success, or failure.', 'Separating the request from state calculation lets transitions be evaluated deterministically. Given the same state and start action, the reducer always returns loading. It does not repeat a request merely because React checks the calculation.')
    ]),
    example(`import { useState } from 'react';
function Draft({ recipient }) {
  const [text, setText] = useState('');
  return <input aria-label={recipient} value={text}
    onChange={e => setText(e.target.value)} />;
}
function Editor({ recipient }) {
  return <Draft key={recipient} recipient={recipient} />;
}`, [
      q('Changing recipient changes the key and ', 'resets', ' the Draft state through a fresh mount.', 'A different key gives Draft a different identity at that position. React removes the old instance and mounts a new one whose text starts as an empty string.', 'Keys are useful outside lists whenever identity matters. Here a draft belongs to a recipient, so switching recipients starts a new draft. The key communicates that lifetime boundary directly to React.', ['reinitializes', 'clears', 'replaces', 'restarts']),
      q('With the same recipient key, a parent render normally ', 'preserves', ' the existing text state.', 'The component type, position, and key stay the same, so React can keep the Draft instance. Re-evaluating Editor alone is not a request to recreate its child.', 'State does not reset simply because a function runs again. React associates it with a component’s identity in the tree. Keeping that identity stable lets a controlled input retain its text across ordinary parent updates.', ['retains', 'keeps', 'maintains', 'saves']),
      q('The recipient prop is passed separately because key is not an ordinary ', 'prop', ' available inside Draft.', 'React uses key internally to identify the element. Draft receives recipient because it is explicitly passed under that name, not because it could read the special key field.', 'An element’s reconciliation metadata and a component’s data inputs have different purposes. If a child needs the same identifier used for key, pass it as another prop. That makes the child’s input contract explicit.'),
      q('Removing the key would usually ', 'preserve', ' the previous draft when only recipient changes.', 'Without the changing key, Draft remains the same component type at the same position. Its existing text state survives even though a different recipient prop is supplied.', 'A prop change updates inputs, not identity by itself. That behavior is usually useful, but can be wrong for drafts tied to a person. The explicit key expresses that a new recipient should have a new lifetime.', ['retain', 'keep', 'maintain', 'save']),
      q('Switching away and back does not restore the old draft because its instance was ', 'unmounted', ' and its state discarded.', 'The key change removes the previous Draft. Returning to that key later mounts a new instance; React does not maintain an archive of state for keys that left the tree.', 'If drafts should survive recipient switches, store them in a parent map keyed by recipient or another persistent owner. Keys control identity during reconciliation; they are not a cache of every component ever rendered.', ['removed', 'destroyed'])
    ])
  ]);
  add(9, 'Memoization and rendering costs', 'React reference: memo; useMemo; useCallback; Profiler (https://react.dev/reference/react)', [
    example(`import { useMemo } from 'react';
function Matches({ items, query }) {
  const visible = useMemo(
    () => items.filter(item => item.name.includes(query)),
    [items, query]
  );
  return <p>{visible.length} matches</p>;
}`, [
      q('useMemo caches the calculation’s ', 'result', ' while its dependencies remain equal.', 'React can reuse the filtered array from the previous render when items and query are unchanged. The Hook retains the computed value, rather than preventing Matches from rendering.', 'Memoization can reduce repeated work when a calculation is expensive and inputs often stay stable. It does not make filtering intrinsically faster. It avoids some executions by reusing an earlier result for unchanged inputs.', ['value']),
      b('Include the search text alongside items so a changed query recalculates the filter.', 'query', '[items, query]', 'The calculation reads both items and query. Including both dependencies ensures the cached result is reconsidered when either the collection or the search text changes.', 'A cached value is correct only for the inputs that produced it. Omitting query could show results for an earlier search even while the component receives new text. Dependencies describe the calculation’s actual reactive inputs.'),
      q('A newly allocated items array can invalidate the cache because its ', 'reference', ' differs.', 'React compares dependencies with Object.is, not a deep comparison of array contents. A new array can therefore cause recalculation even if it contains the same entries.', 'Reference stability influences memoization. If a parent constructs a new array every render, this dependency changes every time. That does not make the result incorrect, but it can eliminate the performance benefit of the cache.', ['identity']),
      q('Mutating the same items array can leave the memoized result ', 'stale', ' because the dependency reference did not change.', 'Changing objects in place can preserve the dependency identity even though their contents differ. React may then reuse a result calculated from the old contents.', 'Immutable updates support both correctness and meaningful equality checks. Supplying a new array when its contents change gives memoization a changed input. A cache cannot reliably detect mutations hidden behind the same reference.', ['outdated', 'incorrect']),
      q('Removing useMemo should preserve ', 'correctness', ' while potentially increasing calculation work.', 'useMemo is a performance optimization, not a guarantee that a value is permanently retained. The component should still produce correct output by running the filter on every render.', 'If a component only works because a memoized value never changes identity, it is relying on the wrong contract. React can discard caches. State or refs are better tools when retained identity is part of required behavior.', ['behavior', 'behaviour'])
    ]),
    example(`import { memo, useState } from 'react';
const Name = memo(function Name({ name }) {
  return <p>{name}</p>;
});
function Parent() {
  const [count, setCount] = useState(0);
  return <><Name name="Mira" />
    <button onClick={() => setCount(n => n + 1)}>{count}</button></>;
}`, [
      q('memo can skip Name when its ', 'props', ' compare equal during a parent update.', 'The name prop stays the same string while count changes in Parent. memo can reuse Name’s previous rendered output rather than executing it solely because Parent updated.', 'Parent state and child props are different inputs. Updating count makes Parent run, but the value passed to Name remains Mira. The memo wrapper gives React an opportunity to skip that unchanged child calculation.'),
      q('Clicking the button still renders ', 'Parent', ' because its own count state changes.', 'memo wraps Name, not Parent. The parent must calculate the new button label after its state changes even if React can skip the child’s unchanged work.', 'Optimizing one subtree does not freeze its ancestors. Parent remains responsible for its own state and JSX. React can update the button while reusing the child output, limiting work where the inputs stayed equal.'),
      q('Passing a fresh object instead of the name string could defeat the default shallow ', 'comparison', ' used by memo.', 'Default memo comparison checks each prop with Object.is. A newly created object is different by reference even if its fields contain the same values as before.', 'An inline object such as { name: "Mira" } is allocated again on each render. Passing it as one prop changes that prop’s identity. Simple primitive props often make equality easier to preserve and reason about.'),
      q('A memoized component can still render when its own ', 'state', ' changes.', 'memo addresses unchanged props from parent renders. It does not suppress the component’s own state updates, which may require different output even when all props are equal.', 'Rendering depends on more than parent props. A child can have local state or consume context. Memoization must not hide changes to those inputs, or the displayed UI would stop reflecting current application data.'),
      q('memo provides an optimization opportunity rather than an absolute ', 'guarantee', ' that the child will never render.', 'React documents memo as a performance optimization. Components must remain correct if React renders them again, and rendering should stay pure regardless of whether work is skipped.', 'Correctness cannot depend on a particular number of render calls. A pure Name simply returns the same paragraph for the same name. Skipping that work may help performance, but repeating it should never break the application.', ['promise'])
    ]),
    example(`import { memo, useCallback, useState } from 'react';
const Add = memo(({ onAdd }) => <button onClick={onAdd}>Add</button>);
function Counter() {
  const [count, setCount] = useState(0);
  const add = useCallback(() => setCount(n => n + 1), []);
  return <>
    <Add onAdd={add} /><p>{count}</p>
  </>;
}`, [
      b('Cache the callback identity passed to the memoized Add component.', 'useCallback', 'useCallback(()', 'useCallback returns a stable function reference while dependencies stay equal. That helps onAdd remain equal across Counter renders so memo has a useful comparison to make.', 'The Hook does not execute the callback or cache its result. It retains the function value supplied to the child. The memoized child can then avoid a parent-driven render when its only prop remains unchanged.'),
      q('The empty dependency list works because add reads no changing ', 'state', ' from its surrounding scope.', 'The callback uses a functional updater instead of reading count. Its only external binding is a stable React setter, so count is not a dependency of this callback.', 'If the callback used setCount(count + 1), count would become a reactive read and belong in the list. The updater expresses the dependency on prior state through React’s argument instead of a captured render value.'),
      q('useCallback caches a function, whereas useMemo caches a calculation’s ', 'value', '.', 'useCallback preserves a callable reference for later use. useMemo invokes a calculation during rendering and retains what it returns, though that returned value could itself be a function.', 'The distinction is what you provide and what React does with it. Here the increment must wait for a click, so retaining a function is the useful operation. Caching a calculated count would serve a different purpose.', ['result']),
      q('A stable add callback helps only if avoiding the child work provides a meaningful performance ', 'benefit', '.', 'Stabilizing a callback and comparing props have costs too. This tiny button is an instructional example; real optimization should target measured work that is expensive enough to matter.', 'Memoization is not a universal requirement for every function prop. Profile the interaction and consider complexity as well as runtime cost. A simpler implementation is often preferable when rendering the child is already cheap.', ['improvement', 'gain']),
      q('Calling add twice queues two increments even though the function ', 'identity', ' stays the same.', 'A stable callback is still callable repeatedly. Each invocation queues an updater, and those updaters compose using pending state rather than a fixed captured count.', 'Function identity controls equality comparisons, not how many times a function can run. Reusing one function object does not reuse a previous invocation’s result. The updater inside performs a fresh state transition on each call.', ['reference'])
    ]),
    example(`import { Profiler } from 'react';
function Measurements({ children }) {
  function report(id, phase, actualDuration) {
    console.log(id, phase, actualDuration);
  }
  return <Profiler id="results" onRender={report}>
    {children}
  </Profiler>;
}`, [
      q('actualDuration measures time spent ', 'rendering', ' the profiled subtree for this update.', 'The Profiler callback receives a duration for rendering work in the subtree. It helps identify expensive React work rather than measuring every part of a complete user interaction.', 'A rendering duration is one performance signal. Network latency, browser layout, and paint can also affect responsiveness. Use this number to investigate React rendering, then choose broader browser tools when the delay comes from elsewhere.', ['render']),
      q('The id argument identifies the ', 'results', ' profiler boundary in the logged measurement.', 'The id prop is passed into the onRender callback. Giving boundaries meaningful ids lets you distinguish measurements from different profiled parts of an application.', 'Profiling several regions is only useful when their measurements can be attributed. Here results labels the subtree without changing its UI. The callback can forward that label alongside timings to a measurement collector.'),
      q('The phase argument distinguishes a mount from an ', 'update', ' or nested update.', 'Profiler reports why the committed rendering work occurred through phase. That distinction helps separate initial mounting costs from work repeated during later interactions.', 'An expensive first mount and an expensive keystroke update suggest different optimization targets. Reading phase alongside duration helps avoid treating them as the same problem. Nested updates can also reveal additional work scheduled during a commit.'),
      q('A performance comparison should measure the same ', 'interaction', ' before and after an optimization.', 'Comparable input, data size, and interaction make timing changes meaningful. Comparing unrelated scenarios can make an optimization look effective even when the actual user experience did not improve.', 'For example, measure the same search query against the same list before and after memoization. Repeat enough to account for noise. A single unrelated timing does not establish that the changed code caused an improvement.', ['workload', 'scenario']),
      q('Profiler supplies ', 'evidence', ' for optimization instead of proving that every extra render is a problem.', 'A render count alone does not describe its cost. Measuring duration and the interaction’s behavior helps decide whether the work is expensive enough to justify additional complexity.', 'Many renders are cheap and are the natural way React keeps output current. The goal is responsive behavior, not minimizing a counter at any cost. Measurements connect code changes to actual work experienced during an interaction.', ['data', 'measurements'])
    ])
  ]);

  add(10, 'Transitions, Suspense, and external stores', 'React reference: useTransition; useDeferredValue; Suspense; lazy; useSyncExternalStore (https://react.dev/reference/react)', [
    example(`import { useState, useTransition } from 'react';
function Search({ renderResults }) {
  const [text, setText] = useState(''), [query, setQuery] = useState('');
  const [pending, startTransition] = useTransition();
  const change = e => {
    const next = e.target.value;
    setText(next);
    startTransition(() => setQuery(next));
  };
  return <><input aria-label="Search" value={text} onChange={change} />
    <div aria-busy={pending}>{renderResults(query)}</div></>;
}`, [
      b('Mark the results state update as a non-urgent transition.', 'startTransition', 'startTransition(()', 'startTransition marks the synchronous setQuery update inside its callback as transition work. The text update stays outside so the controlled input responds urgently to typing.', 'The callback itself runs immediately; it is the resulting rendering update that receives transition priority. React can interrupt that rendering for more urgent work. This API does not move arbitrary JavaScript computation to a background thread.'),
      q('The controlled input uses the ', 'urgent', ' text update so typing is not managed as a transition.', 'Controlled text input state must update synchronously with editing. The separate query state lets the results render at transition priority while the input keeps reflecting the user’s current text.', 'Separating input text from result query creates two scheduling needs explicitly. The text is immediate interaction feedback; rendering results may be slower. Putting the input’s own setter inside the transition would violate that distinction.', ['immediate', 'synchronous']),
      q('A newer keystroke can ', 'interrupt', ' unfinished transition rendering for an older query.', 'Transition rendering is interruptible by urgent updates. React can discard outdated render work and start again using newer inputs instead of forcing the user to wait for an obsolete result.', 'This is why render functions must be pure: work may begin without ever committing. External changes performed during a discarded render would still have happened. Effects and event handlers provide appropriate boundaries for those changes.', ['preempt', 'supersede', 'replace', 'restart']),
      q('pending describes transition progress rather than guaranteeing that a network ', 'request', ' has completed.', 'This snippet only schedules a state update. Its pending flag reflects React’s transition work; it does not automatically track arbitrary requests launched by some unrelated code.', 'A pending UI should reflect the operation it actually tracks. If results involve data fetching, integration with a supported data mechanism or explicit request state is needed. A transition flag alone is not a universal network monitor.'),
      q('startTransition does not make a long synchronous callback run on another ', 'thread', '.', 'The callback executes immediately on the current JavaScript thread. Transition scheduling changes React update priority, not the execution environment of arbitrary expensive calculations inside that callback.', 'If a callback blocks for a large computation, input can still freeze before React has a chance to schedule rendering. Split the work, improve the algorithm, or use a worker when off-thread computation is needed.')
    ]),
    example(`import { memo, useDeferredValue } from 'react';
const Results = memo(function Results({ query }) {
  return <p>Results for {query}</p>; // imagine an expensive subtree
});
function SearchResults({ text }) {
  const query = useDeferredValue(text);
  return <div aria-busy={query !== text}>
    <Results query={query} />
  </div>;
}`, [
      b('Allow the result query to lag behind an urgent text prop update.', 'useDeferredValue', 'useDeferredValue(text)', 'useDeferredValue can keep the old query during an urgent update and attempt the new value in background rendering. The parent’s latest text can update without waiting for that subtree.', 'Deferral changes when rendering catches up, not the text itself. Memo helps Results skip the urgent render while its query prop is still the old value. React then attempts the updated results separately.'),
      q('When query differs from text, the results are ', 'stale', ' relative to the latest input.', 'The equality comparison detects that the deferred value has not caught up. aria-busy communicates pending work while the previously rendered results remain visible.', 'Stale output can be useful when replacing it immediately would make an interaction feel blocked. The UI should communicate that it is catching up so users do not mistake older results for the response to their newest input.', ['outdated', 'behind']),
      q('Deferral does not impose a fixed ', 'delay', ' measured in milliseconds.', 'React attempts background rendering as scheduling permits. Unlike a timer-based debounce, useDeferredValue does not wait a predetermined interval before allowing the value to catch up.', 'On a fast device, the deferred render may finish almost immediately. On a busy device, urgent work can interrupt it. The timing adapts to rendering work rather than following a fixed timeout selected by the developer.', ['timeout', 'interval']),
      q('Memoization lets Results skip the urgent render while its query prop stays ', 'equal', ' to the previous value.', 'During the urgent update, the deferred query can still be the old string. memo gives React an opportunity to reuse Results while later rendering handles the new query.', 'Deferring a value is not sufficient if expensive child work still reruns during every urgent parent render. A memoized boundary can use the unchanged deferred prop to skip that work until the background update.', ['unchanged', 'identical']),
      q('Deferring display alone does not reduce the number of network ', 'requests', ' initiated elsewhere for every keystroke.', 'useDeferredValue schedules rendering of a value. It does not automatically debounce, cache, or cancel fetching code that starts a request whenever the original text changes.', 'Rendering responsiveness and request volume are separate concerns. A data layer can cache results or deduplicate requests, while a debounce can limit how often requests start. Deferral by itself implements neither of those policies.')
    ]),
    example(`import { lazy, Suspense } from 'react';
const Chart = lazy(() => import('./Chart.js'));
// Chart.js supplies a default-exported React component.
function Dashboard() {
  return <Suspense fallback={<p>Loading chart...</p>}>
    <Chart />
  </Suspense>;
}`, [
      q('While Chart’s module is loading, Suspense can display its ', 'fallback', ' paragraph.', 'The lazy component suspends while its import promise is unresolved. The nearest Suspense boundary can show Loading chart until React can render the loaded component.', 'The boundary groups a loading experience around its descendants. It responds to supported suspending work such as lazy code loading. The fallback is ordinary React UI selected while that work prevents the subtree from rendering.'),
      q('lazy expects the imported module’s ', 'default', ' export to be the component rendered here.', 'The promise returned by the loader must resolve to an object with a default component export. The snippet’s comment makes that module contract explicit.', 'A module with only a named Chart export would not match this loader as written. The module can provide a default export, or the loader can adapt its result to the shape lazy expects.'),
      q('Declaring lazy outside Dashboard preserves a stable component ', 'type', ' across Dashboard renders.', 'Creating a lazy wrapper inside the component would create a new component type during rendering. Keeping it at module scope avoids accidental state resets caused by changing that type.', 'React uses component type as part of identity. A stable wrapper lets the loaded Chart preserve its own state across parent updates. A newly created wrapper can instead make React replace the previous component instance.', ['identity']),
      q('An ordinary fetch started in useEffect does not automatically activate this Suspense ', 'boundary', '.', 'Suspense responds to supported suspending reads, not every pending asynchronous operation. A request started after commit in an Effect needs its own loading handling or a Suspense-compatible data integration.', 'The location and contract of data access matter. This snippet works because lazy integrates with Suspense during rendering. Merely putting a component that fetches in an Effect under Suspense does not make its request suspending.'),
      q('A rejected lazy import needs an error ', 'boundary', ' to show an error interface.', 'Suspense supplies loading UI, not a general error fallback. When a lazy import rejects, the rejection is thrown to the nearest error boundary that can handle it.', 'Loading and failure are different states with different recovery paths. A Suspense boundary can wait for pending code, while an error boundary can offer retry guidance or another fallback when that code cannot be loaded.')
    ]),
    example(`import { useSyncExternalStore } from 'react';
const subscribe = notify => {
  window.addEventListener('online', notify);
  window.addEventListener('offline', notify);
  return () => { window.removeEventListener('online', notify); window.removeEventListener('offline', notify); };
};
const getSnapshot = () => navigator.onLine;
function Connection() {
  const online = useSyncExternalStore(subscribe, getSnapshot, () => true);
  return <p>{online ? 'Online' : 'Offline'}</p>;
}`, [
      q('subscribe returns a ', 'cleanup', ' function that removes both browser listeners.', 'React uses the returned function to unsubscribe when needed. Removing both registrations prevents callbacks from accumulating after unmounts or subscription changes.', 'External-store integration has two responsibilities: reading the current snapshot and being notified when it may change. The subscription’s cleanup completes the notification lifecycle. Both online and offline listeners must be released together.'),
      q('getSnapshot returns a stable primitive ', 'boolean', ' when browser connectivity has not changed.', 'navigator.onLine supplies true or false. Repeated reads of the same condition compare equal, satisfying the requirement that an unchanged store yields an equal snapshot.', 'Returning a fresh object such as { online: navigator.onLine } on every read would create a new reference each time. External-store snapshots must be cached or immutable and stable when their underlying data has not changed.'),
      q('The third argument supplies the ', 'server', ' snapshot used for server rendering and initial hydration.', 'The function returning true defines the server-side snapshot. React also uses it for the initial hydration value, keeping that initial output consistent with the server-rendered markup.', 'The example deliberately assumes online for the server snapshot. It does not claim the server can inspect the browser’s connection. Once the client reads its real snapshot, React can update the displayed status.'),
      q('navigator.onLine does not guarantee that a particular API is ', 'reachable', ' even when it reports true.', 'The browser’s connectivity signal is only a heuristic about network availability. A specific server can still be down, blocked, or unreachable, so requests need their own error handling.', 'An online indicator should not be treated as proof that an operation will succeed. The application must still handle timeouts and failed responses. The status is useful context for the user, not an authorization to ignore errors.', ['available', 'accessible']),
      q('useSyncExternalStore coordinates snapshot reads to avoid inconsistent views of an external ', 'store', ' during concurrent rendering.', 'The Hook gives React a supported subscription and snapshot contract. That lets React check consistency when external data changes while rendering work is in progress.', 'A hand-written Effect subscription can miss changes between rendering and subscribing unless carefully designed. This Hook is the dedicated integration point for mutable data owned outside React, including browser APIs and third-party stores.')
    ])
  ]);
})();
