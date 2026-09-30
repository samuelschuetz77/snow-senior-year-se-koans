(() => {
  const details = {
    1: `
Several implementations can satisfy one requirement, so keep the requirement focused on the needed outcome.
For example, "save the draft" describes behavior a user can test through the interface.
A two-second response limit constrains performance regardless of which feature is being used.
Rewrite vague terms such as "fast" as measurable conditions so a test can decide whether they hold.
Talk through the tradeoff with stakeholders and record which expectation the system will satisfy.
The link connects the changed statement to code, design, and tests that may need revision.
Even a small wording change can alter acceptance tests and invalidate an implementation choice.
`,
    2: `
A diagram of major components is incomplete unless it also shows how information or control passes between them.
Developers may need module dependencies while operators need deployment and failure boundaries.
Mapping a service to its host reveals where network links and deployment constraints arise.
An interface can prevent callers from depending on the changed component's internal representation.
For example, a system needing high availability may require redundant services and failover behavior.
Changing one table's schema can then force coordinated edits in several otherwise separate services.
A prototype can measure the risky assumption, such as whether an integration meets latency needs.
`,
    3: `
It chooses boundaries and operations that make a requested behavior practical to build.
Detailed design may specify algorithms, internal data, and error handling inside a component.
Callers can use a stable interface even after the implementation behind it changes.
If a module handles one coherent job, changes to that job tend to stay localized.
Fewer cross-module assumptions reduce the chance that one edit breaks distant code.
A speed improvement may cost memory or simplicity; judge it against the stated priorities.
Moving subtype-specific actions behind a common method can remove duplicated branching.
`,
    4: `
Construction includes coding, local testing, debugging, and integrating the implementation.
A short function with a clear purpose requires less working memory during review.
Reviewers can spot a mistaken assumption or missing case before it spreads into later stages.
Repeatable scripts reduce the chance that one build omits a necessary step.
An assertion failure signals that a required internal condition has been violated.
If a unit silently reaches a database, an isolated test may need unwanted infrastructure.
The caller requests sorting through the function instead of depending on its internal steps.
`,
    5: `
The same fault may remain dormant until a particular input or environment triggers a failure.
Without an expected result, a test cannot distinguish success from a plausible wrong answer.
For a range from zero to ten, test zero, ten, and nearby invalid values.
Keep the old failure case so later changes cannot silently restore the defect.
High coverage can execute every branch while asserting the wrong expected outcomes.
Integration checks whether separately working parts exchange data and handle errors correctly.
First establish what the system should return; otherwise a red or green result is ambiguous.
The test deliberately exercises the edge rather than only comfortable middle values.
`,
    6: `
Operations monitors the running product, responds to incidents, and maintains service levels.
A rollback or alternate route can restore service when a release causes trouble.
Metrics, logs, and traces let operators distinguish normal work from emerging failures.
Using the same deployment steps repeatedly reduces differences among environments.
A balancer can route requests away from a busy or failed server.
The review identifies contributing conditions and concrete improvements rather than only blame.
An alert without a useful response can distract operators from actual incidents.
`,
    7: `
Delivery is not the end because users, platforms, and regulations continue to change.
The defect may be in code, configuration, or documentation that drives wrong behavior.
For example, a new operating system or API version may require adaptation.
This may include better usability or performance even when current behavior is not faulty.
Reducing technical debt or adding checks can make future defects less likely.
Trace call paths and shared data before changing a module that other features depend on.
The captured output helps distinguish an intended improvement from an accidental regression.
`,
    10: `
Activities such as review and testing produce artifacts that later work relies on.
Different models sequence planning, development, release, and maintenance differently.
Short cycles let new evidence change the next plan before the whole product is built.
For example, measure build time only if someone will use it to improve delivery.
Look for causes in the workflow and choose a specific experiment for the next iteration.
A small low-risk prototype may need less ceremony than a regulated safety-critical system.
A failed automated check should block the release artifact until the issue is resolved.
`,
    12: `
A product can follow written requirements yet disappoint users if important needs were omitted.
Explicit attributes can be given criteria, such as acceptable failure rate or task completion time.
The question is whether each specified behavior was implemented correctly.
The question is whether the specified behavior is actually useful for the intended people.
A low defect count alone says little about usability, accessibility, or fitness for purpose.
Once deployed, diagnosis, patching, support, and user disruption add to repair cost.
Reading code or design can find inconsistencies without creating and running an executable.
`,
    13: `
List valuable data and operations, then consider credible attack paths and their consequences.
A login check may prove which account is acting, but not what that account may access.
An authorization rule can allow reading a record while denying deletion of it.
A process that only reads reports should not receive permission to erase the database.
An attacker can call the API directly, bypassing every disabled button in the browser.
For example, authentication, server authorization, and logging cover different failure points.
Design review, implementation tests, and operational monitoring each catch different security mistakes.
`,
    14: `
People affected by the system may bear risks that the paying client does not see.
Disclose incentives that could distort advice and seek an independent decision when necessary.
A range and stated assumptions are more honest than a falsely precise single date.
Separate what was measured from what is guessed so others can evaluate the conclusion.
Escalate the concern through appropriate channels and document the evidence and response.
Explain likely benefits, costs, and risks in terms the decision maker can use.
`,
    16: `
For example, a queue offers enqueue and dequeue without exposing its storage layout.
An array and a linked list support similar operations with different access costs.
Overlapping progress can improve throughput while introducing coordination problems.
Two unsynchronized writes can overwrite one another depending on their timing.
Visiting every item exactly once gives work proportional to the number of items.
Specify when cached data expires or is refreshed to avoid using outdated values.
If the input doubles, this single pass performs roughly twice as many loop iterations.
`,
    17: `
Prove the starting case directly, then show truth for a case extends to the next case.
The counterexample must satisfy the claim's stated assumptions while violating its conclusion.
Objects related in this way can be grouped into classes of mutually equivalent objects.
Zero means impossible and one means certain under the chosen probability model.
A graph edge joins vertices; its direction matters when the relationship is directed.
Show it holds initially and that one iteration preserves it until termination.
The loop body should preserve the asserted condition after each update.
`,
    18: `
Improving one quality may worsen another, so record why the chosen balance fits the constraints.
A model of latency can omit visual styling while keeping the timings and dependencies that matter.
Testing a small version can expose feasibility or usability problems before major investment.
Methods or interfaces control changes to internal state and preserve component invariants.
Clear interfaces let teams reason about one part without knowing every internal detail elsewhere.
A rare catastrophic failure may deserve attention alongside a common minor inconvenience.
Recheck a choice when cost, scale, user needs, or technology differs from the original premise.
`
  };

  const course = window.KOAN_COURSES.find(item => item.id === 'software-practicum');
  for (const set of course.sets) {
    const lines = details[set.id]?.trim().split(/\r?\n/);
    if (!lines || lines.length !== set.koans.length) throw new Error(`Detail count mismatch: ${set.id}`);
    set.koans.forEach((koan, index) => { koan.why += ` ${lines[index]}`; });
  }
})();
