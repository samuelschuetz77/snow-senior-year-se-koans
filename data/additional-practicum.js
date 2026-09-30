(() => {
  const course = window.KOAN_COURSES.find(item => item.id === 'software-practicum');
  const q = (before, answer, after, why, options = {}) => ({ before, answer, after, why, ...options });
  const add = (id, koans) => course.sets.find(set => set.id === id).koans.push(...koans);

  add('1', [
    q("An ambiguous requirement ", "permits", " several incompatible interpretations.", 'Different implementers can build different outcomes while believing they complied. Clarify the condition with stakeholders and concrete acceptance examples.'),
    q('A verifiable requirement names an observable result and a measurable ', 'condition', '.', 'A test needs a way to decide pass or fail. Vague words such as fast or intuitive require operational criteria.'),
    q("A latency limit ", "describes", " a quality constraint rather than a user function.", 'The system may perform the same operation with different response times. The limit constrains how well it performs that function.'),
    q("A stakeholder conflict should be ", "negotiated", " before it becomes an implementation surprise.", 'Two incompatible expectations cannot both be satisfied silently. Record the decision and update the affected requirements and tests.'),
    q("Traceability ", "links", " a requirement to its design, implementation, and tests.", 'When a requirement changes, those links reveal what may need revision. They also support checking that each requirement has evidence.'),
    q('Elicitation seeks needs from stakeholders before those needs are ', 'specified', '.', 'Interviews, observation, and scenarios uncover goals and constraints. The results then become clearer documented requirements.'),
    q("A requirement should ", "describe", " what is needed before prescribing a particular solution.", 'Premature implementation detail can exclude better designs. State the observable need unless the technical choice is itself a real constraint.'),
    q("A user story alone may need acceptance criteria to ", "become", " testable.", 'The story identifies a goal, but examples and conditions define how to recognize completion. That improves shared understanding.'),
    q("Prioritization helps ", "choose", " which requirements enter the next release.", 'Time and resources are limited. Rank needs by value, risk, dependencies, and stakeholder constraints rather than treating every item equally.'),
    q("A requirement change can ", "invalidate", " an existing test oracle.", 'The expected result may no longer express the agreed behavior. Impact analysis should examine tests as well as code and design.'),
    q("A feasibility study ", "checks", " whether a proposed requirement is realistically achievable.", 'Technical, schedule, and resource limits can constrain choices. Discovering them early supports negotiation before full implementation.'),
    q('A conflicting pair of requirements needs an explicit resolution ', 'decision', '.', 'Implementation cannot reliably infer whose expectation takes precedence. Record the chosen behavior so design and tests agree.'),
    q("This acceptance check ", "turns", " a vague speed wish into a measurable requirement.", 'A specific percentile, duration, and workload make the outcome verifiable. The team can now design and test against the same target.', { code: 'p95_search_latency <= 200  # milliseconds at 500 concurrent users' })
  ]);

  add('2', [
    q("An architectural view highlights concerns ", "relevant", " to a particular stakeholder.", 'A developer may need modules while an operator needs deployment nodes. No single diagram answers every architectural question.'),
    q("A deployment view ", "connects", " software components to execution nodes.", 'It shows where processes run and communicate. That helps reason about availability, latency, and operational constraints.'),
    q("A shared database can ", "create", " a coupling point between otherwise separate services.", 'Schema changes or failures may affect many consumers. The convenience of shared access must be weighed against this dependency.'),
    q("An architecture decision should ", "record", " its rationale and assumed constraints.", 'Later teams need to know why the choice made sense. If assumptions change, the decision can be revisited deliberately.'),
    q('A prototype can test a risky quality-attribute ', 'assumption', '.', 'A small experiment may reveal whether the architecture meets latency, scale, or interoperability goals before full construction.'),
    q("A component boundary should make its ", "provided", " and required interfaces clear.", 'Explicit contracts reveal dependencies. They help teams reason about changes, substitutions, and integration.'),
    q('A performance goal may favor a different architecture than a modifiability ', 'goal', '.', 'Quality attributes can conflict. The design should make the tradeoff explicit and evaluate it against the actual requirements.'),
    q("An architecture description should ", "include", " relationships, not only a list of components.", 'Behavior emerges from communication and dependencies. Naming boxes without connections hides important design constraints.'),
    q("A single point of failure ", "threatens", " an availability goal.", 'If one required component fails, the service may stop. Replication or recovery strategy should address the stated availability target.'),
    q("An interface can ", "reduce", " change propagation when implementation details stay hidden.", 'Callers depend on a stable contract. Internal revisions then require fewer downstream edits if the contract remains intact.'),
    q("An architectural tradeoff should be ", "assessed", " with a concrete scenario.", 'A scenario gives a workload, trigger, and response to evaluate. Abstract labels such as scalable are harder to test.'),
    q("A quality-attribute scenario can ", "define", " the system response to a specific stimulus.", 'For example, a server failure under load should trigger recovery within a stated time. This makes architecture evaluation concrete.'),
    q("This failover diagram has two nodes to ", "reduce", " a single point of failure.", 'If one application node stops, the other may continue serving. The database and routing layer still need separate availability analysis.', { code: 'clients -> load_balancer -> [app_a, app_b] -> database' })
  ]);

  add('3', [
    q('High cohesion means a module’s work belongs to a focused ', 'purpose', '.', 'Closely related responsibilities make a module easier to understand and change. Unrelated duties create reasons to edit it for many different requests.'),
    q("Low coupling ", "limits", " how much one module knows about another module’s internals.", 'Depend on a small contract instead of implementation details. That reduces change propagation when the other module evolves.'),
    q("Information hiding ", "protects", " a design decision behind an interface.", 'Callers use the promised behavior without depending on how it is achieved. The hidden decision can change with fewer external edits.'),
    q("Detailed design ", "decides", " the internal algorithms and data structures.", 'Architecture identifies major elements and relationships. Detailed design fills in how a component performs its assigned responsibilities.'),
    q("A design abstraction presents essential behavior while ", "suppressing", " irrelevant detail.", 'The caller needs a useful contract, not every implementation step. This reduces the amount of information required to use the component.'),
    q('A module with unrelated responsibilities has weak ', 'cohesion', '.', 'Many different changes will touch the same module. Separating coherent responsibilities can make maintenance and testing more focused.'),
    q("Duplicated subtype ", "checks", " may indicate a missing polymorphic interface.", 'When every caller branches on type, adding a subtype requires edits across the system. A common operation can localize variation.'),
    q("A design tradeoff should be ", "evaluated", " against actual quality requirements.", 'A pattern is not automatically beneficial. Compare its complexity and consequences with the system’s modifiability, performance, and reliability goals.'),
    q("A small stable interface can ", "hide", " a volatile implementation choice.", 'Changes to storage or algorithm details then stay within one component. Callers only need the contract to remain valid.'),
    q('An abstraction is too leaky when callers must know its hidden implementation ', 'details', '.', 'If users must compensate for internal storage rules, the boundary no longer contains the design decision effectively.'),
    q("A design review should ask how an expected change ", "propagates", " through modules.", 'Tracing a concrete future change exposes coupling. A good boundary contains the change in relatively few places.'),
    q("A design that is easy to test usually has ", "explicit", " inputs and controllable dependencies.", 'Hidden global state and hard-coded services complicate isolation. Clear boundaries improve both testing and changeability.'),
    q("This interface hides whether ", "records", " come from memory or a database.", 'Callers depend on find, not on storage details. Implementations can change while preserving the same contract.', { code: 'interface Repository { find(id: string): Record | null }' })
  ]);

  add('4', [
    q("A repeatable build should ", "produce", " the same artifact from the same inputs.", 'Pinned dependencies and automated steps reduce variation between developers and release machines. That makes failures easier to reproduce.'),
    q("A code review can catch ", "misunderstanding", " before a defect reaches users.", 'Another engineer inspects assumptions, readability, and edge cases. Review complements tests because both can miss different problems.'),
    q('An assertion documents an internal condition that should always ', 'hold', '.', 'When the condition fails, the program exposes an unexpected state close to its cause. It is not a substitute for input validation.'),
    q('A small function with explicit inputs is easier to test in ', 'isolation', '.', 'Its result depends on less surrounding state. Tests can supply representative cases without constructing an entire application.'),
    q('Defensive input validation belongs at a trust ', 'boundary', '.', 'External data may violate assumptions even when internal code is typed. Validate it before allowing malformed values into core logic.'),
    q("A coding standard can ", "improve", " consistency and reduce review friction.", 'Shared conventions make unfamiliar code easier to read. They should support clarity rather than replace reasoning about behavior.'),
    q("A build script ", "reduces", " errors caused by manually repeating deployment steps.", 'Automation performs the same sequence every time. It also lets the team verify the build in a clean environment.'),
    q("Clear names reduce the mental effort needed to ", "infer", " a variable’s meaning.", 'A name tied to domain intent helps reviewers understand the code. Cryptic abbreviations force readers to reconstruct context.'),
    q("A construction defect can ", "originate", " in a misunderstood requirement.", 'Correct syntax does not guarantee the intended behavior. Trace the implementation back to the agreed contract and its examples.'),
    q('A function doing unrelated jobs has weak ', 'cohesion', '.', 'Different reasons for change are mixed together. Separating responsibilities makes the code easier to test and modify.'),
    q("Static analysis examines code without ", "running", " the program.", 'It can detect patterns such as unused values or possible null dereferences. Runtime tests still cover behaviors the analysis cannot prove.'),
    q("A review comment should ", "point", " to a concrete risk or clarity issue.", 'Specific feedback lets the author reason about a change. Vague style preferences are less useful than an identified consequence.'),
    q("An automated ", "build", " is most useful when it also reports failures early.", 'Run compilation and relevant checks before packaging or publishing. A failed step should stop the pipeline and provide actionable feedback.')
  ]);

  add('5', [
    q('A test oracle supplies the expected result for a particular ', 'case', '.', 'Without a trustworthy expectation, observing an output cannot tell whether behavior is correct. The oracle may come from requirements or independent calculation.', { accepts: ['test case'] }),
    q('A fault can exist in code without causing a ', 'visible', ' failure.', 'The affected path may not execute, or conditions may mask the defect. Tests need inputs that expose the faulty behavior.'),
    q("Grouping inputs expected to ", "behave", " alike is equivalence partitioning.", 'This technique divides the input domain into classes and selects representative cases from each. Boundary testing instead concentrates on values near the edges of those classes.'),
    q("Coverage reports ", "execution", ", not the quality of assertions.", 'A test may visit every line while checking the wrong outcome. Inspect whether assertions can detect plausible mistakes.'),
    q('Checking whether software meets a response-time target is ', 'performance', ' testing.', 'Performance testing measures speed against a stated requirement. Running a feature successfully does not show that it responds quickly enough under the expected workload.'),
    q('A quick check that a new build works before deeper testing is a ', 'smoke', ' test.', 'Smoke tests check that key functions are operational and the build is testable. They catch basic build or environment failures before a longer test pass.'),
    q("A flaky test ", "gives", " different results without a relevant code change.", 'Nondeterministic timing, shared state, or external services can cause it. Such failures weaken trust in the feedback.', { accepts: ['gets', 'produces', 'returns', 'yields'] }),
    q('A test case needs setup, action, and an expected ', 'outcome', '.', 'The input and operation define what is exercised, while the oracle defines success. All three are needed for interpretable feedback.', { accepts: ['result', 'value', 'behavior', 'behaviour', 'output', 'response', 'state', 'answer', 'effect'] }),
    q('A property-based test checks one rule against many automatically ', 'generated', ' inputs.', 'It can reveal edge cases a few handpicked examples miss. The property itself still needs a sound oracle.', { accepts: ['random', 'randomized', 'randomised', 'produced', 'created', 'varied', 'chosen'] }),
    q("A negative test ", "checks", " how the system handles an invalid input.", 'Rejecting bad data is observable behavior. Specify the expected error or refusal rather than merely expecting no crash.'),
    q("A test suite should ", "prioritize", " risks, not only maximize a coverage percentage.", 'More exercised lines do not guarantee important failures are detected. Focus scenarios on high-impact behavior and likely defects.'),
    q("A failing test is useful when it can ", "distinguish", " the defect from a setup error.", 'Clear assertions and controlled dependencies make the cause interpretable. An unrelated infrastructure failure gives little evidence about the code.')
  ]);

  add('6', [
    q("An actionable alert should ", "identify", " a condition someone can address.", 'Notifications without a response path create noise. Tie alerts to service objectives, symptoms, and a useful next action.'),
    q("A rollback plan ", "reduces", " the duration of a bad release.", 'If a deployment fails, operators need a rehearsed path to restore service. The plan must account for data changes too.'),
    q("Observability helps operators ", "infer", " internal state from external signals.", 'Logs, metrics, and traces expose behavior after deployment. Useful signals support diagnosis without guessing from user complaints.'),
    q("A runbook ", "records", " steps for a recurring operational incident.", 'Clear procedures reduce response time and dependence on one expert. Keep the runbook aligned with current architecture.'),
    q("A canary release ", "exposes", " a new version to a small portion of traffic.", 'The team can monitor errors and latency before a full rollout. It limits the blast radius of a defect.'),
    q("A service objective ", "describes", " a measurable level of acceptable performance.", 'Availability or latency targets guide monitoring and response. Vague claims of reliability are harder to operate against.'),
    q("An incident review should ", "identify", " contributing conditions and system improvements.", 'The goal is learning and prevention. A blame-only account hides process and design factors that can be changed.'),
    q('Configuration drift occurs when supposedly identical environments become ', 'different', '.', 'Manual changes accumulate over time. Versioned, automated configuration helps keep environments reproducible.'),
    q("Load balancing ", "improves", " capacity only when the backend instances can share the work.", 'Stateful dependencies and bottlenecks can limit scale. Adding instances alone does not fix a single overloaded database.'),
    q('A backup is useful only if restoration has been ', 'tested', '.', 'Files may be incomplete or recovery too slow. A restore exercise verifies that the system can return to service.'),
    q("A deployment health ", "check", " should examine user-visible behavior.", 'A running process may still serve errors. Probe a meaningful operation and monitor the signals relevant to the release.'),
    q("A post-deployment monitor can ", "detect", " a rising error rate.", 'Compare new behavior with expected service levels. Early detection lets operators halt or reverse a harmful rollout.'),
    q("This conditional rollout ", "limits", " initial exposure to a small percentage.", 'A canary sends a fraction of traffic to the new version. Operators can inspect health before increasing the share.', { code: 'route(version="new", percent=5)  # remaining traffic stays on old' })
  ]);

  add('7', [
    q("Corrective maintenance restores ", "intended", " behavior after a defect.", 'The software fails to meet its existing contract. The change repairs that mismatch and should gain regression coverage.'),
    q("Adaptive maintenance responds to a ", "changed", " external environment.", 'A new platform, regulation, or dependency can require changes even when the old software behaved as designed.'),
    q("Perfective maintenance ", "improves", " usefulness or quality for existing users.", 'The system may be functioning correctly yet still need better performance, usability, or functionality.'),
    q("Preventive maintenance ", "reduces", " expected future change or failure cost.", 'Removing a fragile dependency or improving tests may not change visible behavior now, but lowers later risk.'),
    q("Impact analysis traces how a proposed change may ", "affect", " dependent components.", 'A local edit can propagate through interfaces, data, and tests. Mapping those effects guides safer planning.'),
    q("A characterization test ", "records", " what legacy code currently does.", 'It creates a baseline when documentation is missing. The observation may later be judged wrong, but it helps prevent accidental changes.'),
    q("A maintenance change should ", "update", " documentation when its contract changes.", 'Stale guidance causes future users and maintainers to rely on the wrong behavior. Documentation is part of the affected artifacts.'),
    q("A dependency upgrade is adaptive when it ", "responds", " to a changed platform.", 'The environment has moved. The maintenance work keeps the system compatible, even if user-facing features stay the same.'),
    q("A refactoring can be preventive when it ", "reduces", " future change risk.", 'The immediate behavior stays the same. The value lies in clearer boundaries, easier tests, or less fragile dependencies.'),
    q("A maintenance estimate should ", "include", " regression checks and deployment work.", 'Typing the patch is only part of the change. Verification and release determine whether the system remains reliable.'),
    q('A patch with broad unintended effects has poor change ', 'control', '.', 'A narrow intent needs analysis of nearby dependencies and tests. Otherwise a small fix can create unrelated failures.'),
    q("A maintenance backlog should ", "balance", " urgent defects with long-term health.", 'Only reacting to incidents can allow fragility to grow. Preventive work keeps later changes affordable.'),
    q('This change is adaptive because an external protocol version ', 'changed', '.', 'The application adjusts to an environment change. It does not necessarily add a new user-facing feature.', { code: 'api_client.use_protocol(version=2)  # server retired version 1' })
  ]);

  add('10', [
    q("A process model describes how work ", "moves", " through activities over time.", 'It helps coordinate planning, construction, verification, and delivery. Teams should adapt the model to their project risks.'),
    q("An iteration ", "uses", " feedback from one cycle to revise the next.", 'New knowledge about users or technical constraints changes priorities. Repeating a fixed plan without learning loses that advantage.'),
    q('A process artifact is a work product such as a requirement or test ', 'plan', '.', 'Artifacts make decisions and evidence visible. Their usefulness depends on whether people use them to guide work.'),
    q("A process measure should ", "support", " a decision rather than merely produce a number.", 'Metrics can reveal trends, but collecting them without an action or question creates overhead and may invite gaming.'),
    q("A retrospective examines what happened and ", "chooses", " a process improvement.", 'The team identifies a concrete adjustment to try next. It should later check whether the adjustment helped.'),
    q("A risk-driven ", "process", " gives extra attention to uncertain high-impact areas.", 'Prototype, review, or test the risky parts early. Uniform ceremony across every task may waste effort while missing real threats.'),
    q("A deployment gate ", "prevents", " an unverified build from reaching production.", 'Automated checks fail the pipeline before publication. The gate is useful only when checks cover relevant release risks.'),
    q("A life cycle ", "includes", " maintenance after initial delivery.", 'Software continues to evolve with users and environments. A process that stops at first release omits much of the engineering work.'),
    q("Process tailoring adjusts practices to ", "project", " size, criticality, and risk.", 'A safety-critical system needs different evidence from a small prototype. Tailoring keeps the process purposeful.'),
    q("A handoff with no explicit artifact can ", "lose", " important knowledge.", 'Document decisions, contracts, and known risks where the next role needs them. The record should be concise and current.'),
    q("A bottleneck limits throughput even if other ", "process", " steps become faster.", 'Improving a non-bottleneck may not shorten delivery. Measure the full workflow to find where work actually waits.'),
    q("A process experiment needs a measurable outcome to ", "judge", " whether it helped.", 'Choose a change and observe its effect on lead time, defect escape, or another relevant measure. Otherwise the conclusion is guesswork.'),
    q("A short iteration should ", "deliver", " evidence about the current assumptions.", 'Working software, tests, and stakeholder feedback expose errors in the plan. The next iteration can use that information.')
  ]);

  add('12', [
    q("Verification ", "compares", " the product with its documented specification.", 'It asks whether the implementation conforms to stated requirements. A correct implementation of the wrong requirements can still fail validation.'),
    q("Validation asks whether the product ", "solves", " the user’s actual problem.", 'Real users may reject a product that meets its written specification. Their needs are the reference for validation.'),
    q("A quality attribute should be ", "expressed", " with a measurable criterion.", 'A statement such as reliable is difficult to evaluate. A target for availability or recovery time makes the concern actionable.'),
    q("A static review can ", "find", " problems without executing the software.", 'Reviewers inspect code or documents for defects. Dynamic tests exercise behavior, so the methods provide different evidence.'),
    q("A metric alone cannot ", "decide", " whether a product has acceptable quality.", 'The number needs context, goals, and interpretation. High coverage or low defect count can coexist with unmet user needs.'),
    q("Defect prevention seeks to ", "remove", " causes before failures reach users.", 'Reviews, better requirements, and design practices can stop mistakes earlier. Testing still supplies evidence about the resulting product.'),
    q("A quality plan ", "identifies", " which attributes matter and how they will be assessed.", 'Different products prioritize different qualities. Explicit criteria align design decisions and evidence with those priorities.'),
    q('Reliability concerns consistent correct service over a period of ', 'time', '.', 'One successful test does not establish reliability. Evidence should include relevant failures, recovery, and operating conditions.'),
    q("Usability ", "requires", " evidence from people attempting meaningful tasks.", 'A technically correct screen can still confuse users. Observe task completion and difficulty in the intended context.'),
    q("A release criterion should state what evidence is ", "required", " before shipping.", 'A clear gate prevents subjective last-minute judgments. It may combine tests, reviews, and measured quality targets.'),
    q("A defect discovered after release can incur ", "support", " and recovery costs.", 'Users may already be affected. Earlier detection can avoid incident response, damaged data, and emergency deployment.'),
    q("Quality assurance examines the ", "process", " as well as the final product.", 'Practices that prevent and detect defects support quality. Product tests alone do not describe whether the process is reliable.'),
    q('This service target makes availability a measurable quality ', 'attribute', '.', 'The threshold lets the team monitor and evaluate behavior. It is more actionable than an unqualified promise of high availability.', { code: 'monthly_availability >= 0.999' })
  ]);

  add('13', [
    q('Authentication establishes who a requester ', 'is', '.', 'The system verifies an identity claim. Authorization then decides what that identity may do.'),
    q('Authorization should be enforced by the server for each protected ', 'action', '.', 'Browser controls can be bypassed. The trusted service must check permissions before accessing data or performing operations.'),
    q("Least privilege ", "limits", " an account to the access its task requires.", 'Excess permissions increase damage from mistakes or compromise. Grant only necessary capabilities and review them as roles change.'),
    q("Threat modeling begins by ", "identifying", " valuable assets and plausible adversaries.", 'From there the team traces attack paths and defenses. This focuses effort on relevant risks rather than a generic checklist.'),
    q("A trust boundary is crossed when data ", "moves", " from less trusted to more trusted code.", 'Validate and authorize at the boundary. Assumptions made solely in a client or external service may not hold.'),
    q("Defense in depth uses independent ", "controls", " so one failure is not decisive.", 'A compromised layer should not automatically expose the whole system. Controls should address distinct parts of the attack path.'),
    q("A secret should not be ", "embedded", " in browser-delivered code.", 'Users can inspect client assets. Keep credentials on a trusted server and expose only the operations clients are allowed to request.'),
    q("Input validation ", "reduces", " risk from malformed or malicious data.", 'External inputs can violate assumptions. Validate format and constraints before use, while applying context-specific output encoding where needed.'),
    q("A security test should ", "check", " that a forbidden action is denied.", 'Testing only valid users proves little about access control. Use an unauthorized identity and assert refusal without side effects.'),
    q("A dependency vulnerability can ", "affect", " the application even when its own code is correct.", 'Third-party code is part of the attack surface. Track updates and assess exposed components according to actual usage.'),
    q("Threat severity ", "depends", " on likely exploitation and potential impact.", 'Prioritization should consider what an attacker can reach and what damage could follow. A label alone may lack project context.'),
    q("Security requirements should be ", "revisited", " as the design and environment change.", 'New interfaces and dependencies create new attack paths. Security work spans the life cycle rather than one final review.'),
    q("This server check ", "enforces", " authorization before returning a protected record.", 'The client may hide a button, but the server must reject unauthorized requests. The check occurs at the trusted data boundary.', { code: 'if not user.can_read(record):\n    raise Forbidden()' })
  ]);

  add('14', [
    q("Professional judgment should consider people ", "affected", " beyond the paying customer.", 'Software decisions can affect users and the public. An engineer should surface foreseeable harm even when a client prefers silence.'),
    q("A conflict of interest should be ", "disclosed", " before it distorts a recommendation.", 'The stakeholder needs to assess the engineer’s incentives. Transparency supports independent evaluation of the advice.'),
    q('An estimate should express uncertainty rather than imply false ', 'precision', '.', 'Unknowns and risks affect delivery. A range with assumptions helps stakeholders make better decisions than an unjustified exact date.'),
    q("A status report should ", "separate", " observed facts from predictions.", 'Test results are evidence; a release forecast is an inference. Mixing them can make a project appear safer than it is.'),
    q("A safety concern should be ", "communicated", " through an appropriate escalation channel.", 'The concern needs to reach people able to act. Document evidence and impact clearly while following professional obligations.'),
    q("A professional should avoid ", "claiming", " competence they do not have.", 'Overstating expertise can cause harmful decisions. State limitations and seek qualified review when the work exceeds one’s knowledge.'),
    q("A review disagreement should ", "address", " evidence and consequences rather than personal status.", 'Professional communication helps the team resolve technical risk. A clear rationale is more useful than an appeal to hierarchy.'),
    q("A missed deadline should be ", "reported", " with its cause and revised forecast.", 'Early candid communication lets stakeholders adjust plans. Concealing delays removes their options and damages trust.'),
    q("Confidential data should be ", "used", " only for its authorized purpose.", 'Access to information does not imply permission to share or repurpose it. Professional practice includes respecting privacy obligations.'),
    q("An ethical decision should ", "consider", " foreseeable downstream harm.", 'The immediate task may be narrow while consequences are broad. Identify who could be affected and how the risk can be reduced.'),
    q("A credible recommendation should ", "disclose", " relevant assumptions and tradeoffs.", 'Stakeholders can evaluate the advice only when its basis is visible. Hidden constraints can make a technically sound choice unsuitable.'),
    q("A professional review may ", "require", " challenging a convenient but unsafe shortcut.", 'Schedule pressure does not erase foreseeable risk. Explain the evidence and propose a safer way to meet the need.'),
    q('A report should state a failed test as a fact, not recast it as a ', 'success', '.', 'Accurate status lets others judge readiness. Misrepresenting evidence can expose users to defects and undermine trust.'),
    q('This estimate makes the uncertain dependency explicit as an ', 'assumption', '.', 'A range tied to a dependency is more honest and actionable than a single date that ignores the unresolved risk.', { code: 'estimate = "2–4 weeks if vendor API approval arrives this week"' })
  ]);

  add('16', [
    q("A data structure should be ", "chosen", " by the operations the workload performs often.", 'An array, map, or tree has different costs. Match the structure to access, update, and ordering needs.'),
    q('A race condition appears when unsynchronized operation order changes the ', 'result', '.', 'Concurrent tasks may interleave differently between runs. Protect shared state or redesign the work to avoid conflicting updates.'),
    q("A cache ", "improves", " repeated reads but introduces an invalidation problem.", 'Stored results can become stale after the source changes. The design needs a rule for expiration or update.'),
    q("An abstraction boundary should ", "hide", " details irrelevant to its caller.", 'Callers use a stable contract without reasoning about internal storage or algorithms. This supports local implementation changes.'),
    q('A linear scan takes time proportional to the number of ', 'items', '.', 'Each additional input item adds roughly constant work. The total work therefore grows with input size.'),
    q("A hash map usually ", "supports", " direct lookup by key.", 'For suitable keys and hashing, access is commonly near constant time on average. Ordering and worst-case behavior may differ.'),
    q("A lock can prevent conflicting ", "updates", " to shared state.", 'Only one thread enters the protected section at a time. The lock must cover the whole operation whose interleaving would break correctness.'),
    q("A deadlock can occur when tasks ", "wait", " on locks in a cycle.", 'Each task holds a resource another needs. A consistent lock order can prevent that circular wait.'),
    q('An algorithmic complexity claim should name the measured ', 'operation', '.', 'Insertion and lookup can have different costs for the same structure. State which operation and input model the bound describes.'),
    q("A cache hit avoids recomputing or ", "retrieving", " the underlying value.", 'The speed benefit depends on hit rate and cost of misses. Caching also consumes space and may serve stale data.'),
    q("An immutable value can be ", "shared", " between threads with fewer synchronization concerns.", 'Readers cannot race to modify it. Other shared mutable resources may still require coordination.'),
    q('A queue models work in first-in, first-out ', 'order', '.', 'Enqueue adds work at the back and dequeue removes the oldest item. The structure fits workloads requiring arrival order.'),
    q('A stack models last-in, first-out ', 'order', '.', 'Push adds a value, and pop retrieves the most recent. It fits nested calls and depth-first exploration.')
  ]);

  add('17', [
    q("A universal claim is ", "disproved", " by one valid counterexample.", 'If the statement says every case satisfies a rule, a single case that violates it is sufficient to refute it.'),
    q("An induction proof ", "begins", " with a verified base case.", 'The base establishes the first instance. The inductive step then extends truth from an assumed instance to the next.'),
    q("The inductive hypothesis ", "assumes", " the claim for a smaller instance.", 'That assumption is used to prove the next case. It does not replace checking the base case.'),
    q('A loop invariant should be true before the first ', 'iteration', '.', 'Initialization supplies the base of the loop proof. Preservation then shows the condition remains true after each step.'),
    q("A loop invariant plus termination can ", "establish", " the final result.", 'The invariant describes what remains true throughout execution. At exit, combine it with the stopping condition to derive correctness.'),
    q("An equivalence relation ", "partitions", " a set into equivalence classes.", 'Reflexivity, symmetry, and transitivity make membership behave like sameness for the chosen property. Each item belongs to one class.'),
    q('A directed graph edge has a source and a ', 'destination', '.', 'Direction matters for reachability and dependency modeling. An edge from A to B does not automatically give one from B to A.'),
    q("A probability of zero ", "denotes", " an impossible event in a finite sample space.", 'Probability quantifies uncertainty. The interpretation of zero needs care in continuous models, where individual outcomes can have measure zero.'),
    q('Set intersection contains elements present in ', 'both', ' sets.', 'The operation keeps only shared members. It is useful for reasoning about common properties, permissions, or reachable states.'),
    q("A proof by contradiction ", "assumes", " the opposite and derives an impossibility.", 'If the negation leads to a contradiction under valid reasoning, the original statement follows. The conflicting assumptions must be explicit.'),
    q("A graph path is a sequence of ", "connected", " edges.", 'Paths establish reachability between vertices. The edge directions must be respected in a directed graph.'),
    q("A probabilistic model needs ", "assumptions", " about how outcomes are distributed.", 'A numerical result depends on the sample space and probabilities. Different assumptions can give different answers.'),
    q("A termination argument ", "shows", " a loop cannot continue forever.", 'A decreasing nonnegative measure is one common technique. Correct partial results are insufficient if the algorithm may never stop.')
  ]);

  add('18', [
    q("An engineering model deliberately ", "omits", " detail to answer a focused question.", 'A useful model keeps the factors relevant to a decision. Its omissions should be understood before drawing conclusions.'),
    q("A prototype ", "reduces", " uncertainty about a risky design assumption.", 'Build a small experiment to test feasibility or user response. It should answer a question before large implementation cost.'),
    q("Decomposition ", "divides", " a system into parts with defined interfaces.", 'Clear contracts let teams reason about each part and its interactions. Poor boundaries can merely move complexity around.'),
    q("Encapsulation ", "restricts", " direct access to a component’s internal state.", 'Callers use controlled operations. The component can enforce invariants and change its representation without rewriting every caller.'),
    q('A risk estimate considers both likelihood and potential ', 'impact', '.', 'A rare catastrophic failure may deserve attention, while a frequent minor inconvenience may have a different priority.'),
    q("A design decision should be ", "revisited", " when its underlying assumption becomes false.", 'A choice that fit earlier constraints may no longer serve the system. Record assumptions so the trigger for review is visible.'),
    q("A tradeoff occurs when ", "improving", " one objective worsens another.", 'Engineering choices balance competing goals such as latency, cost, reliability, and maintainability. The preferred point depends on requirements.'),
    q("A simulation can explore behavior before ", "building", " the full system.", 'The model offers cheaper evidence about an assumption. Validate that it captures the factors important to the decision.'),
    q('A requirement is a constraint on the space of acceptable ', 'solutions', '.', 'Design alternatives must satisfy it. Additional quality goals help choose among the feasible alternatives.'),
    q("A controlled experiment changes one factor to ", "observe", " its effect.", 'Keeping other conditions stable strengthens the causal inference. Uncontrolled differences can obscure why results changed.'),
    q("A design review should ", "document", " the evidence behind a chosen alternative.", 'Later engineers can assess whether the rationale still applies. A bare decision without context is harder to revisit.'),
    q('A component interface should state obligations on both caller and ', 'implementer', '.', 'Inputs, outputs, and failure behavior form the contract. Ambiguity at the boundary creates integration defects.'),
    q('This risk table combines likelihood and consequence to guide ', 'priority', '.', 'A high-impact failure may warrant action even when less likely. The numbers are estimates and should be reviewed as evidence changes.', { code: 'risk_score = likelihood * impact' })
  ]);
})();
