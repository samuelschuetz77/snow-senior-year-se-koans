(() => {
  const course = window.KOAN_COURSES.find(item => item.id === 'software-maintenance');
  const q = (before, answer, after, why, options = {}) => ({ before, answer, after, why, ...options });
  const add = (id, koans) => course.sets.find(set => set.id === id).koans.push(...koans);

  add('1', [
    q('A behavior-preserving restructuring is a ', 'refactoring', '.', 'The observable contract stays the same while internal design changes. Tests provide evidence that callers still see the same outcomes after restructuring.'),
    q('A feature addition deliberately changes what the system can ', 'do', '.', 'New behavior is the point of a feature. Identify the intended outcome and use tests to distinguish it from accidental changes elsewhere.'),
    q('An optimization should preserve outputs while improving a measurable ', 'cost', '.', 'Faster execution or lower memory use only counts as optimization when the same relevant behavior survives. Measure the targeted cost and check behavior.'),
    q('A bug fix should first name the intended observable ', 'outcome', '.', 'Without a clear expected result, a code edit may merely replace one surprise with another. A focused regression test records the intended result.'),
    q('Code without tests is called legacy here because changing it is ', 'risky', '.', 'Age is not the defining problem. Missing automated feedback makes it hard to know whether an apparently local edit damaged existing behavior.'),
    q('Tests around a planned edit protect the behavior most likely to ', 'regress', '.', 'Coverage should follow the effects of the change. Tests far from those effects give less useful confidence than tests of nearby contracts.'),
    q('A passing test is useful only if it would fail for the relevant ', 'mistake', '.', 'A test can pass while ignoring the behavior being changed. Its assertion and setup must expose the regression you are trying to prevent.'),
    q('The first safety step before restructuring is to characterize existing ', 'behavior', '.', 'Legacy code may contain undocumented rules. Recording observable behavior gives a baseline before changing structure, even when the code seems strange.'),
    q('Changing an internal name without changing public effects is a design ', 'change', '.', 'Refactoring alters code structure while preserving external behavior. The safety question is whether callers still observe the same contract.'),
    q('A customer-visible new rule belongs in a feature or bug ', 'change', '.', 'When users observe a different result, the edit is not pure refactoring. Tests should state the new intended rule explicitly.'),
    q('A benchmark alone cannot establish behavioral ', 'correctness', '.', 'A benchmark measures speed or resource use. Pair it with tests of relevant outputs to avoid celebrating a fast but incorrect implementation.'),
    q('Small edits shorten the distance between a regression and its ', 'cause', '.', 'When changes are narrow, a failing test points to fewer possible causes. That makes feedback easier to interpret than after one large rewrite.'),
    q('The changed return value makes this a behavior change rather than a pure ', 'refactoring', '.', 'Callers can observe a different result for the same input. A pure refactoring would preserve that result while changing only internal structure.', { code: 'def fee(amount):\n    return amount * 0.03  # previously 0.02' }),
    q('A test boundary should include the behavior whose preservation ', 'matters', '.', 'Testing only an unrelated helper cannot establish safety. Follow the planned edit to the outputs or effects users and neighboring code depend on.')
  ]);

  add('2', [
    q('Cover and Modify starts by writing a test around the affected ', 'behavior', '.', 'The test provides feedback before and after the edit. It reduces uncertainty about whether the change disturbed an existing contract.'),
    q('Edit and Pray lacks a reliable way to detect a ', 'regression', '.', 'The developer makes a change and hopes surrounding behavior survives. Automated tests replace that hope with repeatable evidence.'),
    q('A tight feedback loop makes the source of a failure easier to ', 'locate', '.', 'Few edits occur between a passing and failing run. The smaller interval reduces the search space for the mistake.'),
    q('A slow test suite may discourage developers from running it ', 'frequently', '.', 'Delayed feedback allows more changes to accumulate before a failure appears. Smaller focused tests can bring relevant feedback closer to the edit.'),
    q('A test with no meaningful assertion supplies weak ', 'feedback', '.', 'Executing code alone may prove only that it did not crash. An assertion must distinguish the expected behavior from a plausible wrong result.'),
    q('A failing test before an edit can confirm that it detects the intended ', 'defect', '.', 'The red result proves the check reaches the incorrect behavior. After the fix, green provides stronger evidence than a test that was always green.'),
    q('A passing test after a change gives evidence, not a proof of total ', 'correctness', '.', 'The test checks only its chosen conditions. Other inputs and effects may still be wrong, so coverage should follow the actual risk.'),
    q('A focused unit test usually gives more local failure information than a broad ', 'integration', ' test.', 'A broad test crosses more components, so many causes can explain a failure. Focused tests narrow the possible fault while remaining relevant.'),
    q('A green suite that never exercises the edited path cannot protect that ', 'path', '.', 'Passing checks are meaningful only for behavior they reach and assert. Locate the change’s observable effects before choosing coverage.'),
    q('Repeated short test runs turn feedback into part of the editing ', 'cycle', '.', 'Running checks after small steps keeps failures close to their causes. Waiting until the end makes diagnosis harder.'),
    q('A regression test preserves knowledge about a previously broken ', 'case', '.', 'The test records an input and expected result that once failed. Future edits can then reveal when the same defect returns.'),
    q('When a test fails after many edits, diagnosis must consider more possible ', 'causes', '.', 'A large batch of unverified work widens the search space. Frequent runs limit the number of changes between known-good states.'),
    q('This assertion supplies feedback about the discount’s observable ', 'result', '.', 'A future edit that removes or miscalculates the discount makes the test fail. The check is tied to behavior rather than code shape.', { code: 'assert total_for(member=True, price=100) == 90' }),
    q('A useful feedback test should fail when the protected behavior ', 'changes', '.', 'If a plausible regression still passes, the test does not cover the risk. Strengthen its setup or assertion around the observable outcome.')
  ]);

  add('3', [
    q('A sensing problem means the test cannot observe the relevant ', 'effect', '.', 'Code may run, but hidden output prevents a meaningful assertion. Expose a result, event, or collaborator interaction that reveals the behavior.'),
    q('A separation problem means the test cannot isolate code from an awkward ', 'collaborator', '.', 'External services, clocks, or databases can make setup slow or unstable. Introduce a boundary where a controllable substitute can be supplied.'),
    q('A fake clock solves separation when time is an external ', 'dependency', '.', 'Supplying a clock lets the test control the moment seen by the code. This also makes time-dependent outcomes predictable.'),
    q('Returning a computed result can create a sensing point for an ', 'assertion', '.', 'An observable value lets the test compare actual and expected behavior. Hidden internal state alone may not reveal whether the computation is correct.'),
    q('A test double should imitate only the dependency behavior the test ', 'needs', '.', 'A small fake is easier to understand and control. Recreating the entire external system adds complexity without improving the focused assertion.'),
    q('Injecting a collaborator through a parameter creates a possible ', 'seam', '.', 'The production caller passes the real collaborator while the test passes a fake. The code at the call site need not change.'),
    q('A network call inside construction can prevent a fast unit test from reaching its ', 'subject', '.', 'Instantiation itself contacts the outside world. Separating construction from the network effect lets the test create the object predictably.'),
    q('A test that controls a dependency but cannot inspect the result still lacks ', 'sensing', '.', 'Separation makes the setup possible; sensing makes the outcome checkable. Both are needed for useful automated feedback.'),
    q('A test that sees output but cannot prevent a live payment call lacks ', 'separation', '.', 'The assertion might be possible, yet exercising it is unsafe or slow. Substitute the payment collaborator at a seam.'),
    q('A recorded fake can make an otherwise invisible call ', 'observable', '.', 'The fake stores the request it receives. The test can assert that request without sending it to a real external service.'),
    q('An injected repository can make database-dependent logic ', 'testable', '.', 'The test supplies an in-memory repository with controlled records. The production path supplies the real repository through the same boundary.'),
    q('The assertion should inspect an effect that belongs to the behavior under ', 'test', '.', 'Merely checking that a fake was called can miss a wrong argument or result. Verify the meaningful observable contract.'),
    q('Fast isolated tests improve feedback by reducing external ', 'variability', '.', 'A network or database can fail independently of the code. Controllable substitutes make failures more directly attributable to the tested logic.'),
    q('Sensing and separation solve different testability ', 'problems', '.', 'One exposes outcomes; the other controls surroundings. A test may require both before it can reliably protect a legacy change.')
  ]);

  add('4', [
    q('A seam changes behavior at a location without editing that ', 'location', '.', 'The surrounding design supplies an alternate implementation. This lets a test control a dependency while keeping the production call site intact.'),
    q('The enabling point determines which seam behavior is ', 'selected', '.', 'A seam is useful only if the test can choose the alternate path. A constructor argument or parameter often serves as the enabling point.'),
    q('Passing a fake through a constructor creates an object ', 'seam', '.', 'The class calls a collaborator through its normal interface. The constructor selects the real object in production or the fake in a test.'),
    q('A parameter seam selects behavior at the function call ', 'boundary', '.', 'Different arguments can supply different collaborators without changing the function body. The test controls the dependency through that argument.'),
    q('A seam is valuable when it lets a test control a relevant ', 'dependency', '.', 'The point is to make uncertain behavior testable. Creating arbitrary abstraction without a needed substitution can add complexity without useful feedback.'),
    q('A hard-coded global service usually has no convenient enabling ', 'point', '.', 'The code chooses the dependency internally, so a test cannot readily substitute it. Passing the service in creates a controllable boundary.'),
    q('A seam should preserve the production ', 'path', ' while enabling a test path.', 'The application still receives the real collaborator. The test selects a controlled one, allowing assertions without changing production behavior.'),
    q('The alternate behavior at a seam can be a small ', 'fake', '.', 'A fake can return controlled values or record requests. It need only support the behavior relevant to the test.'),
    q('An interface alone is not a useful seam without a way to choose an ', 'implementation', '.', 'The test needs an enabling point. If production code always constructs the real dependency internally, the interface changes little about testability.'),
    q('An environment variable can serve as an enabling point but may cause tests to interfere through global ', 'state', '.', 'Global switches can create order-dependent tests. A local parameter or injected object often provides tighter control over the selected behavior.'),
    q('A seam’s test value comes from controlled ', 'substitution', '.', 'The test supplies predictable behavior at the boundary. That reduces dependence on external systems and permits focused assertions about the code.'),
    q('A constructor argument is the enabling point in this payment ', 'seam', '.', 'The same Checkout code calls whichever gateway it receives. A test can pass a fake while production passes the real gateway.', { code: 'class Checkout:\n    def __init__(self, gateway):\n        self.gateway = gateway' }),
    q('A call site need not be edited when a seam already exposes a configurable ', 'collaborator', '.', 'Select the alternate object at the enabling point. The behavior at the dependent location changes through substitution rather than another source edit.'),
    q('Adding a seam is safest when a test first records existing ', 'behavior', '.', 'Dependency-breaking edits can accidentally change outcomes. Baseline characterization tests let the developer compare behavior before and after the seam is introduced.')
  ]);

  add('6', [
    q('A sprout method isolates new logic beside an existing ', 'method', '.', 'The old method calls the new one at a narrow point. New behavior can be tested separately while edits to the untested body stay small.'),
    q('A sprout class places a new responsibility in a separate ', 'class', '.', 'The new class has its own focused tests. The legacy code needs only a small connection to it, limiting the risky edit.'),
    q('A wrap method puts new behavior around an existing ', 'call', '.', 'The wrapper may act before or after delegating to the old method. Tests can check the addition while preserving the original path.'),
    q('Sprouting is useful when old code lacks tests and a safe rewrite is ', 'impractical', '.', 'A small new unit can be tested directly. The tradeoff is that the original design may remain awkward until later cleanup.'),
    q('A wrapper should still invoke the original method when preserving its behavior is ', 'required', '.', 'Skipping delegation would silently remove the existing effect. Tests should cover both the new surrounding behavior and the old result.'),
    q('A sprout method can make a complex new rule independently ', 'testable', '.', 'Put the rule in a small function with clear inputs and output. The old call site then only connects that tested logic.'),
    q('Repeated sprouts may create scattered behavior and design ', 'debt', '.', 'Each sprout limits immediate risk, but many unintegrated pieces can obscure the flow. Later tests may support a coherent refactoring.'),
    q('A wrap class intercepts an existing collaborator through the same ', 'interface', '.', 'The wrapper implements the expected operations and delegates as needed. The caller can use it without knowing about the additional behavior.'),
    q('Adding logging before delegation is a typical ', 'wrap', ' operation.', 'The old operation still runs, while the wrapper adds an effect around it. Assert the logging and the delegated behavior separately.'),
    q('A sprout is less helpful if the new function cannot be tested without the entire ', 'system', '.', 'Its value comes from isolation. A new helper with hidden global dependencies may preserve the same testing obstacle as the original code.'),
    q('The safest connection point changes as little existing code as ', 'possible', '.', 'A narrow call to tested new logic lowers immediate regression risk. It does not eliminate the need to check the behavior at the connection.'),
    q('A wrap method can add a precondition before the old ', 'implementation', '.', 'The wrapper checks an input and then delegates when allowed. Verify that valid requests still follow the original path.'),
    q('This function sprouts the new discount rule into a separate ', 'method', '.', 'The legacy function changes only at its call site. The new calculation can receive focused tests without constructing the entire old workflow.', { code: 'def total(order):\n    amount = legacy_total(order)\n    return apply_new_discount(amount, order)' }),
    q('Time pressure can justify a narrow sprout while still requiring a regression ', 'test', '.', 'The technique limits edits, but the connection can be wrong. A test should cover the final observable outcome after integration.')
  ]);

  add('7', [
    q('A long compile cycle increases the delay between an edit and useful ', 'feedback', '.', 'Developers learn about a mistake only after the build finishes. Smaller modules or focused tests can shorten that delay.'),
    q('Change time includes understanding, editing, building, testing, and ', 'deploying', '.', 'The typing time alone is rarely the bottleneck. Examine the whole path from requested behavior to verified release.'),
    q('A five-minute code edit can be expensive when verification takes ', 'hours', '.', 'Long cycles postpone discovery of mistakes and force context switching. Improving feedback speed may matter more than reducing keystrokes.'),
    q('A focused test target can avoid rebuilding the entire ', 'application', '.', 'Run only the module and dependencies needed for the behavior. Faster checks make small iterative changes more practical.'),
    q('Tightly coupled modules enlarge the area that must be ', 'recompiled', '.', 'A local edit can invalidate many dependents. Clear boundaries can reduce build scope and the cost of each iteration.'),
    q('A slow test suite encourages larger batches between ', 'runs', '.', 'When checks take too long, developers run them less often. Failures then have more possible causes and are harder to diagnose.'),
    q('A small fast characterization test can protect a hot spot during ', 'editing', '.', 'It provides immediate feedback on the behavior at risk. Broader suites can still run later before release.'),
    q('A build bottleneck should be measured before changing the ', 'architecture', '.', 'Find where time is actually spent. Guessing at a solution can add complexity without shortening the real critical path.'),
    q('Extracting a module can improve test speed when its dependencies become ', 'smaller', '.', 'The extracted unit needs fewer components to compile and run. Merely moving files without changing dependency edges will not help.'),
    q('A slow deploy pipeline is part of the total change ', 'latency', '.', 'Even a quick local test does not make delivery quick when packaging or release waits dominate. Assess the complete workflow.'),
    q('Feedback quality matters alongside feedback ', 'speed', '.', 'A very fast test that misses the risky behavior saves little. Choose checks that are both relevant and quick enough to run frequently.'),
    q('Separating responsibilities can reduce the amount of code a developer must ', 'understand', '.', 'A narrow unit has fewer interactions to reason about. That lowers both setup effort and the chance of accidental side effects.'),
    q('This targeted command shortens feedback by testing only one ', 'module', '.', 'The command selects the affected module instead of the entire suite. It is useful only if those tests cover the behavior being changed.', { code: 'pytest tests/test_pricing.py' }),
    q('A faster inner loop still needs broader checks before ', 'release', '.', 'Focused tests aid development speed, while broader integration checks catch cross-module problems. Both contribute to reliable delivery.')
  ]);

  add('8', [
    q('A new feature requires a test that describes its intended ', 'outcome', '.', 'The feature changes behavior deliberately. Write an assertion about the user-visible result rather than only the implementation path.'),
    q('Nearby characterization tests record behavior the feature should ', 'preserve', '.', 'New code can disturb old paths. A baseline around the affected area helps distinguish intended change from accidental regression.'),
    q('A sprout can keep the new rule away from an untested legacy ', 'body', '.', 'Place the rule in a focused unit and connect it with a small edit. That limits the uncertain surface of the feature.'),
    q('The integration point needs its own test because a tested sprout can be ', 'miswired', '.', 'A correct helper does not guarantee that the old code calls it with the right inputs or uses its result properly.'),
    q('A feature test should fail before implementation when the new behavior is ', 'absent', '.', 'The red result shows the test actually detects the missing capability. Passing after the edit then carries stronger meaning.'),
    q('Refactoring before tests can unintentionally change undocumented ', 'behavior', '.', 'Legacy code may depend on surprising details. Characterize the relevant contract first, then restructure with feedback.'),
    q('Repeated feature patches can make responsibility boundaries ', 'unclear', '.', 'Each small sprout solves an immediate risk, but accumulation may fragment the design. Tests can later support a cleaner integration.'),
    q('An edge case test should target a plausible boundary of the new ', 'rule', '.', 'Examples at thresholds, empty inputs, or missing data can reveal mistakes that a happy-path example leaves hidden.'),
    q('A behavior test can survive internal refactoring when it asserts the public ', 'contract', '.', 'Checking observable results avoids coupling the test to helper names or call counts that may change during safe restructuring.'),
    q('The feature’s new branch should be exercised with both matching and nonmatching ', 'inputs', '.', 'One test shows the new path works; the other protects old behavior when the new condition does not apply.'),
    q('A test of a helper alone cannot prove the feature is reachable from the user ', 'path', '.', 'Integration wiring can fail independently of the helper. Exercise an appropriate public entry point to confirm the rule is used.'),
    q('When a new rule changes an old result, that change should be ', 'explicit', '.', 'Name the intended difference in a test. Otherwise a failing characterization test may be dismissed without understanding the contract shift.'),
    q('This test checks the new threshold at its observable ', 'boundary', '.', 'Threshold cases expose off-by-one mistakes. The assertion states the expected public behavior for the first qualifying value.', { code: 'assert shipping_cost(cart_total=50) == 0' }),
    q('A feature is safer when tests cover both its addition and surrounding ', 'regressions', '.', 'The new outcome must work, and existing outcomes must remain correct. Both sets of evidence matter when modifying legacy code.')
  ]);

  add('9', [
    q('A class test harness must create the subject without triggering unwanted ', 'effects', '.', 'Construction may contact services or modify files. Break those dependencies so the test can instantiate the class predictably.'),
    q('A constructor that sends email violates isolation before the test even calls a ', 'method', '.', 'The unwanted action occurs during setup. Inject or defer the mail collaborator so construction remains safe in a test.'),
    q('A fake collaborator can supply controlled responses for a class ', 'test', '.', 'The test sets up only the dependency behavior needed. This removes external variability while the class logic remains under examination.'),
    q('A dependency chain can make object construction excessively ', 'complex', '.', 'Creating one class may require many real collaborators. A narrow seam can replace the chain with small test substitutes.'),
    q('Breaking a constructor dependency should preserve production ', 'behavior', '.', 'The real application still supplies the usual collaborator. The change exists to enable alternate test setup without changing what users observe.'),
    q('A test harness should include the minimum collaborators needed for the target ', 'behavior', '.', 'Extra real services make setup slow and failures ambiguous. Keep substitutes small and focused on the exercised path.'),
    q('A factory can centralize complex production object ', 'construction', '.', 'Production can build the full graph in one place, while tests directly supply simpler collaborators to the class being tested.'),
    q('An injected fake lets a test observe whether a class sent the right ', 'request', '.', 'The fake records calls and arguments. The assertion can inspect the meaningful interaction without contacting the external service.'),
    q('A hidden singleton dependency makes class tests share mutable ', 'state', '.', 'Tests can interfere through the global object. Supplying the dependency explicitly creates local control for each test instance.'),
    q('A test should not duplicate the entire production object ', 'graph', '.', 'The point of the harness is focused feedback. Rebuilding every real dependency recreates the coupling that made the class hard to test.'),
    q('Constructor injection selects collaborators at object ', 'creation', '.', 'The caller supplies the dependency when instantiating the subject. Tests can choose a fake while production chooses the real implementation.'),
    q('A characterization test can guard the original path while dependencies are ', 'broken', '.', 'Refactoring construction may change call order or results. A baseline test protects the externally observed behavior during that edit.'),
    q('This test passes a fake gateway into the class ', 'constructor', '.', 'The fake is the enabling point for isolation. Checkout can be exercised without reaching the real payment service.', { code: 'gateway = FakeGateway()\ncheckout = Checkout(gateway)' }),
    q('If setup is harder than the assertion, the class may have too many ', 'dependencies', '.', 'Expensive setup can signal coupling. Identify which collaborators are truly needed for the behavior and separate the rest.')
  ]);

  add('10', [
    q('A class harness can work while one target method remains hard to ', 'exercise', '.', 'The object may be constructible, yet the method can still hide dependencies or require complex state. Isolate the method’s specific obstacle.'),
    q('A method object turns a long computation into a separately testable ', 'object', '.', 'Move the computation and its inputs into a focused class. Tests can then exercise the algorithm without all of the original class setup.'),
    q('A hidden global read makes a method depend on external ', 'state', '.', 'The same arguments can yield different results when the global changes. Supply that value explicitly to make behavior predictable.'),
    q('A focused method seam should control the dependency that affects the target ', 'behavior', '.', 'Replacing every dependency adds noise. Substitute the one collaborator whose behavior prevents the relevant assertion.'),
    q('Extracting a pure calculation can simplify a complex method ', 'test', '.', 'A function with explicit inputs and result needs little setup. The surrounding method can keep responsibility for effects and integration.'),
    q('A method’s output may be hidden in a collaborator ', 'call', '.', 'A recording fake can expose the argument sent to that collaborator. The test then has an observable result to assert.'),
    q('An override point can allow a test subclass to replace a troublesome ', 'dependency', '.', 'This seam can make a method testable without editing every call. Use it carefully to avoid testing a different behavior than production.'),
    q('A long method should be split at a coherent responsibility ', 'boundary', '.', 'Extracting arbitrary lines can obscure flow. A meaningful subcomputation has clear inputs and an outcome that can be tested independently.'),
    q('A method object is especially useful when local variables carry complex intermediate ', 'state', '.', 'The new object can hold those values as fields. Its focused interface makes the computation easier to inspect and test.'),
    q('Refactoring a method for test access should leave its public result ', 'unchanged', '.', 'The seam is a structural change. Characterization checks help verify that existing callers still observe the same behavior.'),
    q('A test of extracted logic cannot replace a test of the original integration ', 'point', '.', 'The extraction may be called incorrectly or ignored. Exercise the public method to check the wiring as well as the helper.'),
    q('A branch depending on the current date benefits from an injected ', 'clock', '.', 'The test can set a fixed time and cover boundary cases. Without that control, results depend on when the test runs.'),
    q('This parameter removes the calculation’s dependence on a global ', 'clock', '.', 'Passing now makes time an explicit input. Tests can choose dates deliberately and assert the method’s result without changing machine time.', { code: 'def is_overdue(invoice, now):\n    return invoice.due_date < now' }),
    q('A useful method test asserts its observable output rather than its private ', 'steps', '.', 'Private call sequences can change during refactoring while behavior stays correct. Check the contract the caller actually relies on.')
  ]);

  add('11', [
    q('An effect sketch traces outward from an edit to possible observable ', 'consequences', '.', 'Start at the changed code and follow calls, data, and state. This reveals where a test could catch a regression.'),
    q('A characterization test records existing behavior even when the behavior seems ', 'odd', '.', 'Surprising output may be a relied-upon rule. Record it before refactoring, then decide separately whether it should change.'),
    q('A caller may deserve a test when the edited method changes what the caller ', 'does', '.', 'The risk may appear downstream, not in the edited method’s direct return. Follow the effect to an observable contract.'),
    q('The best test location is where a relevant effect can be ', 'observed', '.', 'A check too close may miss downstream consequences; a check too far away may be slow or vague. Choose a useful boundary.'),
    q('A method with many dependents can have a wide effect ', 'surface', '.', 'A small internal edit can affect several callers. Sketch those paths to prioritize the behaviors that need protection.'),
    q('A test of an unrelated branch offers little protection for the planned ', 'change', '.', 'Coverage metrics alone do not identify the risk. Exercise inputs that reach the changed path and assert its consequential output.'),
    q('Characterization tests are especially useful when the existing specification is ', 'missing', '.', 'Observation gives a concrete baseline. It does not prove the behavior is desirable, but it reveals what a refactoring must preserve.'),
    q('A change in a shared parser may affect several downstream ', 'features', '.', 'An effect sketch follows parsed data into each consumer. Tests should cover the consequences most likely to change.'),
    q('A test seam should be chosen after identifying the behavior at ', 'risk', '.', 'Otherwise the harness may isolate the wrong component. The effect path tells you what must be controlled and sensed.'),
    q('A narrow unit test can miss an interaction between the changed method and its ', 'caller', '.', 'The unit may return the expected value while the caller mishandles it. Add coverage at a boundary that includes the interaction.'),
    q('A broad test may catch a regression while giving less precise failure ', 'diagnosis', '.', 'Many components lie between input and observed output. Pair broad protection with focused checks when local feedback is valuable.'),
    q('A dependency with many side effects deserves explicit impact ', 'analysis', '.', 'Follow writes, notifications, and calls from the edited method. Each can expose a regression outside the immediate return value.'),
    q('This assertion observes the caller’s effect on the final ', 'total', '.', 'It checks the consequential output rather than only the discount helper. A wiring mistake in the caller can now make the test fail.', { code: 'assert invoice_total(items, member=True) == 90' }),
    q('Tests should be selected by plausible effects, not merely by method ', 'names', '.', 'A similarly named test may exercise a different path. Trace the change to concrete inputs and outcomes before relying on it.')
  ]);

  add('12', [
    q('Testing one level back can cover several classes changing as a ', 'group', '.', 'A public caller exercises their interaction without building separate harnesses for each class. This is useful when changes cross class boundaries.'),
    q('A higher-level test still needs a clear observable ', 'assertion', '.', 'Exercising many classes alone gives weak feedback. Assert the combined behavior that the planned edits could affect.'),
    q('A public interface can provide a stable test ', 'boundary', '.', 'Internal helpers may be reorganized. A test at the public contract can continue protecting behavior through those structural changes.'),
    q('Testing too far from the edit can make failures hard to ', 'diagnose', '.', 'Many components contribute to the observed result. Choose the nearest useful boundary that still captures the risky interaction.'),
    q('Testing each private method separately may require excessive dependency ', 'setup', '.', 'A suitable public call can reach several methods through existing wiring. This reduces harness work for a coordinated change.'),
    q('A broad characterization test can protect an area before internal ', 'refactoring', '.', 'Record its observable contract first. Then rearrange private collaborators while checking that the surrounding behavior remains intact.'),
    q('The selected seam should allow control over the expensive external ', 'boundary', '.', 'Even a higher-level test can remain fast if it substitutes network or database services. Keep real behavior inside the area under test.'),
    q('One-level-back testing is effective when several changed units share a common ', 'caller', '.', 'The caller gives a natural entry point for their combined behavior. A test there avoids duplicating setup for each unit.'),
    q('A test can protect an interaction without asserting every internal ', 'call', '.', 'Check the resulting contract. Internal call counts are often brittle and may change during a safe refactoring.'),
    q('A very broad end-to-end test may be slower than a focused ', 'integration', ' test.', 'Choose a boundary close to the coordinated change. It should include the risky interaction without dragging in unrelated infrastructure.'),
    q('If several classes change together, isolated tests may miss their ', 'interaction', '.', 'Each class can pass alone while their shared protocol breaks. A test through the common caller exercises the communication.'),
    q('A higher-level test trades local diagnosis for wider behavioral ', 'coverage', '.', 'The test protects more integration, but a failure may have more possible causes. Add focused tests where diagnosis needs help.'),
    q('This test checks the public workflow rather than each private ', 'helper', '.', 'The order total crosses several internal calculations. Its assertion protects their combined observable result during coordinated edits.', { code: 'assert checkout(order_with_coupon()).total == 72' }),
    q('The best test boundary balances setup cost, speed, and relevant ', 'behavior', '.', 'Move outward enough to cover the change’s effects, but not so far that feedback becomes slow or ambiguous.')
  ]);

  add('13', [
    q('Characterization tests capture current behavior before deciding whether to ', 'change', ' it.', 'They provide a baseline for safe refactoring. A later bug fix can deliberately replace the expected result with the corrected contract.'),
    q('A surprising test result may expose a hidden business ', 'rule', '.', 'Do not immediately erase the behavior. Investigate whether callers rely on it, then choose an intentional change if needed.'),
    q('A regression test for a bug should assert the corrected ', 'outcome', '.', 'The test must fail on the old defect and pass after the fix. It then preserves the newly intended behavior.'),
    q('Boundary inputs often reveal defects missed by a typical ', 'example', '.', 'Thresholds, empty collections, and missing values exercise decisions where mistakes cluster. Choose examples based on the rule’s edges.'),
    q('A test that mirrors the implementation can miss a wrong business ', 'rule', '.', 'Repeating the same algorithm in the expected value reproduces its mistake. State the independent expected outcome instead.'),
    q('A characterization test can be useful even before the code’s intent is fully ', 'known', '.', 'It records what happens for a concrete input. That evidence supports investigation and safer restructuring without claiming the behavior is correct.'),
    q('When an observed behavior is clearly a defect, update the test to express the desired ', 'contract', '.', 'A test preserving the bug would block its correction. Make the intended difference explicit and keep the corrected result as regression coverage.'),
    q('A good test name describes the behavior expected for a meaningful ', 'case', '.', 'Names tied to user outcomes explain failures better than names of private methods. They remain useful when implementation structure changes.'),
    q('The test setup should be small enough to make a failure ', 'interpretable', '.', 'Unrelated records and collaborators obscure the cause. Include the conditions necessary to expose the behavior being protected.'),
    q('A green characterization test is a baseline, not proof the behavior is ', 'desirable', '.', 'It states what the system did for one case. Deciding whether to preserve that result requires requirements and domain judgment.'),
    q('A known bug deserves an example that fails under the original ', 'implementation', '.', 'This confirms the test detects the defect. Without that red result, the assertion might exercise another path or always pass.'),
    q('A test near a planned edit protects the behavior likely to ', 'shift', '.', 'Select inputs that reach the change and assert effects that matter. Broad unrelated coverage does not replace this targeted feedback.'),
    q('One-word expected values can hide a test’s intent unless the scenario is ', 'clear', '.', 'Use descriptive setup and assertion names so a failure reveals which business rule or edge case was violated.'),
    q('For a discount threshold, test values immediately below and at the ', 'boundary', '.', 'The pair distinguishes whether the comparison is strict or inclusive. It catches a common off-by-one error in the rule.')
  ]);

  add('14', [
    q('A wrapper prevents vendor-specific calls from spreading through application ', 'code', '.', 'The app calls its own interface. Only the adapter translates those operations into the vendor library’s API.'),
    q('A vendor adapter should expose application needs rather than mirror every vendor ', 'method', '.', 'A narrow interface keeps business code independent of unused vendor features. It also makes a focused fake simpler.'),
    q('Replacing a vendor is easier when its usage is confined to one ', 'boundary', '.', 'Only the adapter must be rewritten if the application contract stays stable. Scattered direct calls increase replacement work.'),
    q('A fake adapter lets application tests avoid loading the real ', 'library', '.', 'The test controls responses and errors through the app-facing interface. It can focus on decisions rather than vendor behavior.'),
    q('The adapter translates between domain concepts and vendor ', 'types', '.', 'Business code can speak in orders or payments while the library expects its own request shapes. Translation stays in one place.'),
    q('A vendor price change becomes less disruptive when replacement cost is ', 'low', '.', 'A narrow boundary reduces the number of application files tied to the vendor. That gives the team more options.'),
    q('A wrapper that forwards every vendor method can preserve too much ', 'coupling', '.', 'If callers still depend on the vendor’s vocabulary, the wrapper adds little insulation. Design around application operations instead.'),
    q('Adapter tests should verify translation at the vendor ', 'boundary', '.', 'Application unit tests can fake the adapter, while focused adapter tests check that app requests become correct vendor calls.'),
    q('An external library exception should be mapped to an application-level ', 'error', '.', 'The adapter can translate vendor failures into stable domain outcomes. The rest of the app need not know vendor exception classes.'),
    q('A library upgrade is safer when only one integration layer knows its ', 'API', '.', 'Changes in method names or request fields are localized. Tests at the adapter boundary can catch translation mistakes.'),
    q('Direct vendor types in business signatures leak the dependency across the ', 'boundary', '.', 'Callers then need the vendor’s model to interact with the app. Prefer application types and translate inside the adapter.'),
    q('A narrow adapter is a seam for substituting external ', 'behavior', '.', 'Production uses the real vendor implementation; tests provide a fake. The business logic can be exercised without external calls.'),
    q('The adapter’s public method should express the app’s intended ', 'operation', '.', 'A name such as charge_order reflects the business action. Vendor-specific details belong inside the adapter implementation.')
  ]);

  add('15', [
    q('An API-heavy workflow still contains application-level ', 'decisions', '.', 'The order of calls, arguments, retries, and error handling belong to the app. Tests should check those decisions even when computation is small.'),
    q('A recording fake can verify the sequence of external ', 'calls', '.', 'The fake logs requests without contacting services. The test can assert the order required by the workflow.'),
    q('Application tests should not reimplement the vendor’s own ', 'library', ' tests.', 'Trust the library’s internal behavior. Check how the application uses its interface and responds to its results or failures.'),
    q('An API timeout should follow an explicit application ', 'policy', '.', 'The app must decide whether to retry, report failure, or compensate. A test can inject the timeout and assert that decision.'),
    q('A retry test should verify that the attempt count is ', 'bounded', '.', 'Unbounded retries can hang a workflow or multiply side effects. Control the fake responses and assert the configured stopping point.'),
    q('A non-idempotent external call may not be safe to ', 'retry', '.', 'Repeating it can duplicate a payment or action. The application needs an explicit policy, often including an idempotency key.'),
    q('If a write must precede a notification, test their ', 'order', '.', 'The final result alone may look correct despite a dangerous sequence. A recording fake can expose the interaction order.'),
    q('An API boundary supplies a seam for simulating remote ', 'failures', '.', 'A fake can return errors deterministically. Tests can then exercise rare failure paths without depending on a live service.'),
    q('A test should assert the meaningful request data sent to an external ', 'service', '.', 'A call count alone may pass even with the wrong customer or amount. Inspect the fields that define the app’s contract.'),
    q('A fake service should distinguish success, rejection, and ', 'timeout', ' cases.', 'Different responses can require different app decisions. Controllable outcomes allow focused tests of each branch.'),
    q('Orchestration correctness includes the handling of partial ', 'failure', '.', 'One call may succeed before another fails. Tests should check whether the app compensates, reports, or preserves consistent state.'),
    q('A vendor client can be wrapped behind an application ', 'interface', '.', 'The wrapper gives tests a substitution point and keeps app logic independent of vendor-specific request and error types.'),
    q('This fake records the order of two application ', 'calls', '.', 'Inspecting the log reveals whether the app saves before notifying. No real database or notification service is needed.', { code: 'calls = []\nstore.save = lambda item: calls.append("save")\nmailer.send = lambda item: calls.append("send")' }),
    q('A live API test may complement, but cannot replace, focused orchestration ', 'tests', '.', 'Live checks confirm integration while focused fakes make decision paths fast and reproducible. Together they catch different failure modes.')
  ]);
})();
