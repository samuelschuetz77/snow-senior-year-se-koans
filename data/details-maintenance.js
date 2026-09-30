(() => {
  const details = {
    1: `
Users should see the same outputs for the same inputs after a refactor, even though the internal code differs.
A test suite provides a practical warning when a small edit unexpectedly changes long-standing behavior.
The fix should make the failing case meet its requirement and guard against breaking neighboring cases.
For example, a faster lookup must still return the same result and handle missing values correctly.
Write down the behavior that callers depend on before changing the implementation that provides it.
Focused tests expose regressions sooner than waiting for a user to encounter the new defect.
`,
    2: `
Cover and Modify makes a risky edit observable by checking the behavior before and after it.
A test that runs in seconds can guide several small edits without a long wait between decisions.
If many edits occur before a failure appears, it becomes harder to know which edit caused it.
A whole-system test may fail because of setup, networking, or unrelated modules rather than the edited unit.
Characterization tests are especially useful when nobody is sure what the legacy code actually promises.
First demonstrate that the test fails under the relevant defect; otherwise green gives false confidence.
`,
    3: `
The observation point could be a return value, changed state, or a recorded collaborator call.
An external database or network service can be replaced at a seam for a focused test.
Simply creating the object then requires live infrastructure, which obscures the behavior under examination.
A fake can report that an email would have been sent without delivering an actual message.
Reducing external setup makes a failure more likely to identify the local rule that changed.
Passing a client lets production use the real service while a test supplies a controlled stand-in.
`,
    4: `
A test changes what the code calls at that boundary, while leaving the code being exercised intact.
Dependency injection is useful only if the test can actually choose the replacement implementation.
The constructor's parameter is selected when the object is created, before its behavior is exercised.
For instance, a fake clock can make time-dependent logic deterministic without changing its method.
Isolation removes unrelated failures so the test can focus on one cause-and-effect relationship.
The caller's parameter value determines whether the original collaborator or a test double runs.
`,
    6: `
The old method calls a small new method that can be checked independently before integration.
A new class keeps the addition separate when it needs its own state or several related methods.
The wrapper delegates to the old method, then adds behavior before or after that delegation.
The old design still has its original problems, so sprouting is a tactical change rather than cleanup.
For example, a wrapper may validate arguments before calling the legacy implementation.
Limit the edit surface while ensuring the new path has direct tests and an integration check.
`,
    7: `
The actual change time includes waiting for compilation, tests, and deployment, not just typing.
Several intervening changes can accumulate while a slow build is running, making failures harder to trace.
A modular build can avoid rebuilding unrelated modules when only one component changed.
Run the smallest trustworthy check that covers the edited behavior before the full suite.
Mixed concerns force a maintainer to untangle unrelated paths before locating the desired rule.
Improving tools and boundaries can make future edits safer and faster than merely typing faster.
`,
    8: `
Trace callers and shared data near the planned feature because those paths can change unintentionally.
A new-feature test proves the addition works; existing-behavior tests protect nearby contracts.
When old code has poor coverage, a tested sprout limits the number of lines disturbed.
Many disconnected sprouts accumulate special cases and make the design harder to reason about.
Once tests capture behavior, moving code into a clearer structure has a stronger safety net.
If a test names a private helper, harmless internal restructuring may break the test unnecessarily.
`,
    9: `
Creating a test object can become harder than exercising the behavior when its dependency graph is large.
A constructor side effect can send a real message before the test has chosen an assertion.
A fake can return predictable responses and record requests without requiring a real account.
Factories or injected constructors can build production collaborators outside the class under test.
Compare production outputs and effects before and after introducing the seam to catch accidental changes.
Only include dependencies along the path being tested, otherwise setup hides the intended behavior.
`,
    10: `
The target method may still read global state or call services that the harness cannot control.
Extracting a calculation can separate pure logic from I/O and make inputs explicit.
The method object carries exactly the state needed for the calculation into a smaller test target.
If a hidden setting changes, identical visible arguments can produce different answers.
A narrow seam is easier to understand than replacing the entire surrounding system.
Capture existing outputs first, then ensure the extracted version produces the same observable result.
`,
    11: `
Characterization tests do not claim the current behavior is ideal; they record it for comparison.
Investigate the surprising result before changing it, since callers might depend on that rule.
Put assertions where changed results become visible, not merely where a private method returns.
A caller may transform or discard the return value, creating an effect the local test misses.
Follow the data and control paths that connect the edit to important user-visible behavior.
If a changed result controls a later branch, test that branch as well as the result itself.
`,
    12: `
A shared public operation can reveal whether the group of changed classes still works together.
The test checks the contract that callers use, regardless of which private method supplies it.
This can avoid exposing or faking many internal collaborators one at a time.
The boundary should be broad enough for the interaction, but not so broad that every failure looks unrelated.
Use a focused integration test to locate a failure, then narrower tests when diagnosis requires it.
Select a boundary that lets the test control the risky collaborator without excessive scaffolding.
`,
    13: `
Run the test before editing to ensure it records the actual old behavior rather than an assumption.
The surprise may be a hidden requirement, a bug, or a historical compatibility choice.
Inputs at the edge of the edited rule are more likely to expose accidental changes.
Check what a caller can observe, because a copied implementation can reproduce the same mistake.
The repaired test should fail on the old bug and pass only when the intended contract holds.
Keep the case in the suite so the same discount mistake cannot return unnoticed.
`,
    14: `
Every direct call exposes application code to the vendor's names, data formats, and upgrade changes.
The adapter can convert vendor-specific values into the application's own stable concepts.
A replacement fake need only implement the small interface the application actually uses.
An expensive or abandoned library is hard to escape when its calls appear throughout the app.
This keeps unit tests fast and allows vendor integration to be checked separately.
Expose only necessary capabilities so an upgrade does not force unrelated application changes.
Callers use the application interface, while only this class knows the vendor's API details.
`,
    15: `
An orchestration bug may call a valid API at the wrong time or with the wrong arguments.
Inspect the fake's recorded requests to verify decisions without depending on network availability.
The test should verify chosen requests and error handling rather than reproduce the vendor implementation.
Controlled success and failure responses let tests exercise both branches of application logic.
For example, a retry policy should specify which failures are retried and how many times.
Recording call order catches a workflow that performs all operations but in an invalid sequence.
`
  };

  const course = window.KOAN_COURSES.find(item => item.id === 'software-maintenance');
  for (const set of course.sets) {
    const lines = details[set.id]?.trim().split(/\r?\n/);
    if (!lines || lines.length !== set.koans.length) throw new Error(`Detail count mismatch: ${set.id}`);
    set.koans.forEach((koan, index) => { koan.why += ` ${lines[index]}`; });
  }
})();
