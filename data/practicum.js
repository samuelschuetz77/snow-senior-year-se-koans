(() => {
  const q = (before, answer, after, options = {}) => ({ before, answer, after, ...options });
  const set = (id, title, due, koans) => ({ id, title, due, source: `SWEBOK Guide v4, chapter ${id}`, koans });
  window.KOAN_COURSES.push({ id: 'software-practicum', title: 'Software Practicum', sets: [
    set('1', 'SWEBOK 1 · Requirements', 'Sep 9', [
      q('A requirement describes a needed property or behavior, not necessarily its ', 'implementation', '.'),
      q('A functional requirement describes observable system ', 'behavior', '.'),
      q('A response-time limit is a nonfunctional ', 'requirement', '.'),
      q('A requirement that cannot be checked is difficult to ', 'verify', '.', { accepts: ['test'] }),
      q('If two stakeholders want incompatible behaviors, the conflict needs ', 'resolution', '.', { accepts: ['negotiation'] }),
      q('A trace link helps locate design and test artifacts affected by a requirement ', 'change', '.'),
      q('Changing a requirement should trigger an analysis of affected ', 'work', '.', { accepts: ['artifacts', 'tests', 'design'] })
    ]),
    set('2', 'SWEBOK 2 · Architecture', 'Sep 9', [
      q('Architecture describes major elements and their ', 'relationships', '.', { accepts: ['interactions'] }),
      q('Different architecture views serve different stakeholder ', 'concerns', '.'),
      q('A deployment view maps software elements to their execution ', 'environment', '.', { accepts: ['hardware', 'nodes'] }),
      q('Separating components can isolate the effect of a ', 'change', '.'),
      q('An architecture decision should be judged against required quality ', 'attributes', '.'),
      q('A shared database may simplify access while increasing ', 'coupling', '.'),
      q('A prototype can test an architectural assumption before full ', 'implementation', '.')
    ]),
    set('3', 'SWEBOK 3 · Design', 'Sep 16', [
      q('Design turns requirements into a structure developers can ', 'implement', '.'),
      q('High-level design chooses components; detailed design specifies their internal ', 'behavior', '.'),
      q('Information hiding keeps a module’s internal decisions behind an ', 'interface', '.'),
      q('High cohesion means a module’s responsibilities are closely ', 'related', '.'),
      q('Low coupling reduces the number of other modules affected by a ', 'change', '.'),
      q('A design tradeoff should be evaluated against the system’s quality ', 'goals', '.', { accepts: ['requirements', 'attributes'] }),
      q('Repeated conditionals for every subtype can suggest a missing ', 'abstraction', '.')
    ]),
    set('4', 'SWEBOK 4 · Construction', 'Sep 16', [
      q('Construction produces executable software from the ', 'design', '.'),
      q('Small, clear units reduce the complexity a reader must hold in ', 'mind', '.'),
      q('A code review can catch defects before they reach ', 'testing', '.'),
      q('Automating a repeatable build reduces manual ', 'error', '.', { accepts: ['mistakes'] }),
      q('An assertion records a condition that should always ', 'hold', '.'),
      q('A unit with hidden dependencies is harder to test in ', 'isolation', '.'),
      q('This function keeps ordering separate from callers through a narrow ', 'interface', '.', { code: 'def sort_orders(orders, key):\n    return sorted(orders, key=key)' })
    ]),
    set('5', 'SWEBOK 5 · Testing', 'Sep 30', [
      q('A work product such as a requirements document, design, source code, or test is an ', 'artifact', '.'),
      q('A fault is a defect in an artifact; a failure is incorrect observed ', 'behavior', '.'),
      q('A test oracle decides whether an observed result is ', 'correct', '.'),
      q('Boundary tests focus on values near the edges of a valid ', 'range', '.'),
      q('A regression test checks that a change did not reintroduce an old ', 'failure', '.', { accepts: ['bug', 'defect'] }),
      q('Tests run both discount and standard-shipping branches, showing branch coverage but not proving the calculated prices are ', 'correct', '.'),
      q('An integration test checks interactions between ', 'components', '.', { accepts: ['modules'] }),
      q('A failing test with no trustworthy expected result has an oracle ', 'problem', '.'),
      q('For this test, zero is a boundary ', 'value', '.', { code: 'assert withdraw(balance=0, amount=1) == "insufficient funds"' })
    ]),
    set('6', 'SWEBOK 6 · Operations', 'Sep 30', [
      q('Operations keeps deployed software available and ', 'reliable', '.'),
      q('A rollout plan should include a way to ', 'recover', ' from failure.', { accepts: ['rollback'] }),
      q('Monitoring turns production behavior into observable ', 'signals', '.', { accepts: ['data', 'metrics'] }),
      q('Automating repeated deployment steps reduces configuration ', 'drift', '.'),
      q('Load balancing spreads work across multiple ', 'servers', '.', { accepts: ['instances'] }),
      q('An incident review aims to improve the system and process after a ', 'failure', '.', { accepts: ['incident'] }),
      q('An alert is useful when it points to an actionable ', 'problem', '.', { accepts: ['condition'] })
    ]),
    set('7', 'SWEBOK 7 · Maintenance', 'Oct 7', [
      q('Maintenance begins after delivery and continues through system ', 'evolution', '.'),
      q('Corrective maintenance repairs a ', 'fault', '.', { accepts: ['defect', 'bug'] }),
      q('Adaptive maintenance responds to changes in the operating ', 'environment', '.'),
      q('Perfective maintenance improves functionality or ', 'quality', '.'),
      q('Preventive maintenance reduces the likelihood or cost of future ', 'problems', '.', { accepts: ['failures', 'changes'] }),
      q('Before editing unfamiliar code, impact analysis identifies likely affected ', 'parts', '.', { accepts: ['components', 'modules'] }),
      q('A characterization test captures current behavior before a risky ', 'change', '.')
    ]),
    set('10', 'SWEBOK 10 · Process', 'Oct 7', [
      q('A software process defines activities, roles, and produced ', 'artifacts', '.', { accepts: ['work products'] }),
      q('A life cycle model organizes work over the product’s ', 'life', '.', { accepts: ['lifetime'] }),
      q('Iteration allows a team to revise plans using newly learned ', 'information', '.', { accepts: ['feedback'] }),
      q('A process measure is useful only if it informs a ', 'decision', '.'),
      q('A retrospective examines the process to improve future ', 'work', '.'),
      q('A process tailored to project risk is more useful than one followed without ', 'reason', '.', { accepts: ['judgment'] }),
      q('Running checks before publishing lets a failed build stop before it reaches ', 'users', '.', { accepts: ['production'], code: 'def deploy(build, checks):\n    checks(build)\n    publish(build)' })
    ]),
    set('12', 'SWEBOK 12 · Quality', 'Oct 21', [
      q('Quality includes how well software satisfies both stated and implied ', 'needs', '.', { accepts: ['requirements'] }),
      q('A quality model makes attributes such as reliability and usability ', 'explicit', '.'),
      q('Verification asks whether the product was built according to its ', 'specification', '.', { accepts: ['requirements'] }),
      q('Validation asks whether the product meets the user’s actual ', 'needs', '.'),
      q('A metric can support judgment but does not by itself prove ', 'quality', '.'),
      q('A defect found before release usually costs less to fix than one found after ', 'release', '.'),
      q('A static review examines an artifact without ', 'executing', ' it.', { accepts: ['running'] })
    ]),
    set('13', 'SWEBOK 13 · Security', 'Oct 21', [
      q('Threat modeling asks what assets exist, who may attack them, and how they could be ', 'misused', '.', { accepts: ['compromised'] }),
      q('Authentication establishes a user’s ', 'identity', '.'),
      q('Authorization assigns permitted ', 'actions', '.', { accepts: ['permissions', 'access'] }),
      q('Least privilege grants only the access necessary for a ', 'task', '.'),
      q('Checking a permission only in the browser leaves the server ', 'exposed', '.', { accepts: ['vulnerable'] }),
      q('Defense in depth uses multiple independent security ', 'controls', '.'),
      q('A security requirement should be checked throughout the development life ', 'cycle', '.')
    ]),
    set('14', 'SWEBOK 14 · Professional Practice', 'Oct 28', [
      q('Professional responsibility extends beyond the immediate paying ', 'client', '.'),
      q('A conflict of interest can impair independent professional ', 'judgment', '.'),
      q('A credible estimate should make its uncertainty ', 'visible', '.', { accepts: ['explicit'] }),
      q('Ethical reporting distinguishes observed facts from ', 'assumptions', '.', { accepts: ['inferences'] }),
      q('When a safety concern is found, silence is not a responsible ', 'response', '.'),
      q('Clear communication helps stakeholders understand the consequences of a ', 'decision', '.')
    ]),
    set('16', 'SWEBOK 16 · Computing Foundations', 'Oct 28', [
      q('An abstraction exposes useful behavior while hiding lower-level ', 'details', '.'),
      q('A data structure choice changes the cost of common ', 'operations', '.'),
      q('Concurrency allows tasks to make progress during overlapping ', 'time', '.'),
      q('A race occurs when the result depends on the order of unsynchronized ', 'operations', '.'),
      q('An algorithm with linear growth takes work proportional to input ', 'size', '.'),
      q('A cache can speed repeated reads but may return ', 'stale', ' data.'),
      q('This loop’s work grows ', 'linearly', ' with the number of items.', { code: 'total = 0\nfor item in items:\n    total += item.cost' })
    ]),
    set('17', 'SWEBOK 17 · Mathematical Foundations', 'Nov 4', [
      q('A proof by induction needs a base case and an inductive ', 'step', '.'),
      q('A counterexample disproves a universal ', 'claim', '.', { accepts: ['statement'] }),
      q('A relation that is reflexive, symmetric, and transitive is an equivalence ', 'relation', '.'),
      q('A probability between zero and one quantifies uncertainty about an ', 'event', '.'),
      q('A graph represents relationships using vertices and ', 'edges', '.'),
      q('A loop invariant must hold before and after each ', 'iteration', '.'),
      q('The assertion is the loop’s ', 'invariant', '.', { code: 'seen = set()\nfor item in items:\n    assert len(seen) <= len(items)\n    seen.add(item)' })
    ]),
    set('18', 'SWEBOK 18 · Engineering Foundations', 'Nov 4', [
      q('Engineering design balances requirements, constraints, and ', 'tradeoffs', '.'),
      q('A model omits details so a particular question becomes easier to ', 'answer', '.'),
      q('A prototype can reveal a design risk before committing to full ', 'construction', '.'),
      q('Encapsulation groups a component’s state with controlled ways to ', 'access', ' it.'),
      q('Decomposing a complex system creates smaller parts with defined ', 'interfaces', '.'),
      q('Risk analysis combines the chance of failure with its potential ', 'impact', '.', { accepts: ['consequence'] }),
      q('An engineering decision should be revisited when its underlying assumptions ', 'change', '.')
    ])
  ] });
})();
