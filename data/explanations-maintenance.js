(() => {
  const notes = {
    1: `
Refactoring changes internal structure while preserving what users observe.
Without tests, maintainers lack quick evidence that an edit preserved behavior.
A bug fix deliberately corrects behavior that was wrong.
An optimization should change cost, not the externally promised result.
Knowing the existing contract identifies what a safe edit must preserve.
Tests and other feedback reveal effects beyond the intended edit.
`,
    2: `
Automated tests provide evidence about changes rather than relying on hope.
Immediate results connect a failed check to the recent edit.
Fewer intervening edits make the likely cause easier to locate.
A broad failing test has many possible causes and more setup to inspect.
Tests document and check what the system currently does.
A passing test proves little if it would also pass with the defect present.
`,
    3: `
Without an observable result, a test cannot compare actual with expected behavior.
Separating dependencies lets the code run in a controlled test setting.
The constructor performs external work before the unit can be exercised.
A fake can return controlled results or record calls for inspection.
Fewer external dependencies make the test quicker and more specific.
The caller can supply a test client instead of the production client.
`,
    4: `
A seam permits behavior substitution without changing the code under test.
The enabling point chooses which implementation is active at the seam.
Constructor injection lets the caller select a collaborator.
A fake dependency can provide predictable behavior during a test.
Substitution limits the test to the behavior being investigated.
The parameter decides which implementation the existing code calls.
`,
    6: `
A new method holds the added behavior away from risky existing code.
A separate class can carry new behavior with its own tests.
Wrapping calls the existing method while adding work around it.
Sprouting avoids risky edits but may not improve the old structure.
The wrapper controls behavior surrounding the original call.
Isolated new code is easier to test under time pressure.
`,
    7: `
Build and test delays dominate total change time when feedback is slow.
Late feedback makes it harder to connect a mistake with the edit that caused it.
Modular builds can rebuild only the parts affected by a change.
A focused harness runs relevant checks sooner.
Mixed responsibilities force a reader to understand unrelated behavior.
Tools, builds, and test architecture affect how quickly code can safely change.
`,
    8: `
Existing behavior near the feature may change unintentionally.
Tests should catch both a missing new feature and damaged old behavior.
New code in a separate area reduces edits to untested legacy logic.
Too many added pieces without integration make the design harder to follow.
Coverage gives evidence that structural changes preserve current behavior.
Observable outcomes survive implementation changes better than private details.
`,
    9: `
Each required collaborator adds setup before the class can be exercised.
Sending real email during construction makes tests unsafe and slow.
A fake keeps tests local while allowing expected interactions to be checked.
Moving setup outside the class can make its constructor simpler to call.
Breaking dependencies for tests should not change what production users see.
Extra collaborators add setup without helping test the selected behavior.
`,
    10: `
A class may be constructible while a particular method still has hard-to-control inputs.
Smaller pieces can isolate the computation from surrounding effects.
The extracted object gives the calculation its own controllable inputs.
Global state can change a result without appearing in method parameters.
Control the dependency that influences the selected behavior.
A test seam is a structural change, so it must preserve existing results.
`,
    11: `
Recording current outputs helps detect unintended changes later.
Unexpected output may encode a business rule that was never documented.
Tests need to observe the places where a change's effects become visible.
Callers may interpret the edited method's output in ways a local test misses.
Attention should follow the paths most likely to be disturbed.
Follow the return value through its users to see what changes downstream.
`,
    12: `
A test through a shared caller can observe several cooperating classes at once.
Public behavior often depends on multiple internal methods.
A higher boundary can avoid constructing each hidden dependency separately.
If the boundary is too distant, failures become harder to attribute.
Broad tests catch interactions but can have slower, less precise failures.
The best seam balances coverage of the risk against setup and diagnosis effort.
`,
    13: `
Captured outputs give a baseline against which the later change can be compared.
Unexpected current behavior may be intentional and should be investigated first.
Edge behavior around the changed area is especially likely to be affected.
A test should check externally meaningful behavior rather than copy code steps.
Once a bug is understood, the expected result should reflect the corrected contract.
Keeping this test catches a future edit that breaks the discount again.
`,
    14: `
Every direct vendor call creates another place affected by vendor changes.
An adapter translates the application's needs into vendor-specific calls.
Tests can replace the adapter without replacing the whole application.
Replacement cost rises when vendor details are scattered through the code.
The fake adapter isolates application tests from the vendor package.
A narrow interface avoids exposing vendor details the app does not use.
Application code depends on this interface while the class handles vendor calls.
`,
    15: `
The app's value may lie in which API calls it makes and in what sequence.
A recording fake reveals requested operations without external network behavior.
Vendor correctness belongs to the vendor; test the app's own choices.
Replacing the API dependency gives tests control over responses and errors.
A clear policy defines whether to retry, report, or recover from failures.
Recorded calls can be compared with the required sequence.
`
  };

  const course = window.KOAN_COURSES.find(item => item.id === 'software-maintenance');
  for (const set of course.sets) {
    const explanations = notes[set.id]?.trim().split(/\r?\n/);
    if (!explanations || explanations.length !== set.koans.length) {
      throw new Error(`Explanation count mismatch: ${set.id}`);
    }
    set.koans.forEach((koan, index) => { koan.why = explanations[index]; });
  }
})();
