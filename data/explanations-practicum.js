(() => {
  const notes = {
    1: `
Requirements state what is needed; design and code choose how to provide it.
Functional requirements describe outcomes users or other systems can observe.
Response time constrains quality rather than specifying a feature's behavior.
If no test or inspection can decide whether it holds, verification is unclear.
Conflicting stakeholder requests cannot both be satisfied without a decision.
Trace links show which designs and tests depend on the changed requirement.
An altered requirement may invalidate prior plans, designs, code, or tests.
`,
    2: `
Architecture identifies large components and how they connect.
An operations view and a development view answer different stakeholder questions.
Deployment connects software pieces to machines, containers, or other runtime hosts.
A boundary can keep a local change from spreading through unrelated components.
Architecture succeeds when it supports qualities the system actually needs.
Multiple components sharing one schema become sensitive to each other's changes.
A small prototype can expose an incorrect assumption before major work begins.
`,
    3: `
Design makes requirements concrete enough to guide construction.
Detailed design describes a component's internal operations after components are chosen.
Callers depend on the interface while internal choices remain replaceable.
A cohesive module focuses on responsibilities that belong together.
Fewer dependencies mean a change has fewer places to propagate.
Design choices should serve the qualities prioritized for this product.
Repeated type checks often mean subtype behavior belongs behind a shared interface.
`,
    4: `
Construction turns a planned structure into working code.
Small units limit how much context a maintainer needs at once.
Review may find mistakes before a test run or release.
Automation performs the same steps consistently each time.
An assertion checks an invariant expected at that point in execution.
Hidden dependencies make a unit require more surrounding setup to test.
Callers use the function's contract without needing its ordering implementation.
`,
    5: `
A software artifact is a tangible work product created or used during development.
A defect exists in the artifact; a failure appears when behavior goes wrong.
The oracle supplies the expected outcome against which a result is compared.
Errors often occur exactly at or near allowed limits.
Regression tests preserve a behavior previously broken and then repaired.
Branch coverage shows which decision outcomes ran, not whether their results were right.
Components can pass separately but fail when their interactions are exercised.
Without a reliable expected answer, the test cannot judge its observed result.
Zero sits at the edge of the shown input domain.
`,
    6: `
Operations manages the running service and its dependability.
Recovery steps limit harm when a new deployment fails.
Monitoring exposes health and performance through measurable signals.
Automated steps avoid small manual differences among deployments.
Distributing requests prevents one server from carrying all the load.
Reviewing causes and responses helps prevent similar incidents.
An alert needs an owner and response that can improve the situation.
`,
    7: `
Delivered software keeps changing as defects, environments, and needs change.
Corrective work fixes an existing defect.
Adaptive work keeps software useful when its environment changes.
Perfective work improves behavior or quality beyond fixing a fault.
Preventive work lowers the risk or expense of later failures.
Impact analysis maps dependencies before a change spreads unexpectedly.
The test records current behavior so a later change can be compared.
`,
    10: `
A process states who does work, what activities occur, and what they produce.
The life cycle spans creation, deployment, operation, and eventual retirement.
Each iteration can incorporate information unavailable in the previous plan.
A measurement matters when it changes how the team acts.
A retrospective uses past experience to adjust future practice.
Risk and context justify process steps; blind ritual adds little value.
Checking first can block a broken artifact before users receive it.
`,
    12: `
Users may need qualities that were not written as explicit requirements.
Naming quality attributes makes them possible to discuss and evaluate.
Verification compares the implementation with the written specification.
Validation compares the product with what users actually need.
A number provides evidence but cannot capture every quality dimension.
Post-release defects affect users and often require costly diagnosis and deployment.
Static review inspects source or documents without running the program.
`,
    13: `
Threat modeling examines ways an attacker could harm valued assets.
Authentication checks who a user claims to be.
Authorization determines what an authenticated identity may do.
Excess access increases potential damage if an account is misused.
Clients can bypass browser checks, so the server must enforce permissions.
Independent controls reduce reliance on any single defense.
Security conditions need review and testing from design through operation.
`,
    14: `
Software can affect users and the public beyond the direct customer.
Personal incentives may bias a professional recommendation.
Estimates depend on unknowns, so uncertainty should be communicated.
Facts are observed; assumptions are beliefs that still need checking.
Unreported safety issues can continue to put people at risk.
Decision makers need consequences explained before they can choose responsibly.
`,
    16: `
Abstraction lets callers use a concept without managing its implementation.
Different structures have different lookup, insertion, and traversal costs.
Concurrent activities overlap, even when they do not run at the same instant.
Without synchronization, different operation orders can produce different results.
Linear work scales directly with the number of input items.
Cached values can lag behind the underlying data after it changes.
The loop visits each item once, so work is proportional to item count.
`,
    17: `
The base starts the proof and the step extends it to larger cases.
One valid exception is enough to refute a claim about every case.
Those three properties partition objects into equivalence classes.
Probability assigns a likelihood to a specified event.
Edges encode connections or relationships among vertices.
An invariant survives each loop step, enabling a correctness argument.
The assertion expresses the condition maintained throughout the loop.
`,
    18: `
Engineering choices must satisfy needs under limits, often sacrificing one quality for another.
Removing irrelevant detail makes a model useful for a focused question.
A prototype cheaply tests a risky idea before full implementation.
Controlled access protects state from arbitrary outside changes.
Defined interfaces allow smaller parts to cooperate as a larger system.
Risk increases with both likelihood and severity of a bad outcome.
Changed assumptions can invalidate the evidence behind an earlier decision.
`
  };

  const course = window.KOAN_COURSES.find(item => item.id === 'software-practicum');
  for (const set of course.sets) {
    const explanations = notes[set.id]?.trim().split(/\r?\n/);
    if (!explanations || explanations.length !== set.koans.length) {
      throw new Error(`Explanation count mismatch: ${set.id}`);
    }
    set.koans.forEach((koan, index) => { koan.why = explanations[index]; });
  }
})();
