(() => {
  const course = window.KOAN_COURSES.find(item => item.id === 'advanced-algorithms');
  const q = (before, answer, after, why, options = {}) => ({ before, answer, after, why, ...options });
  const add = (id, koans) => course.sets.find(set => set.id === id).koans.push(...koans);

  add('preface', [
    q('A correct algorithm must solve every input permitted by its ', 'specification', '.', 'Success on samples is insufficient. A proof relates the procedure to the stated input conditions and required output for arbitrary valid inputs.'),
    q('A counterexample is enough to refute a claimed universal ', 'algorithm', '.', 'If one allowed input produces a wrong output, the correctness claim fails. The example can expose a hidden assumption.'),
    q('A problem statement should identify which inputs are considered ', 'valid', '.', 'The algorithm can rely on stated preconditions. Without them, a proof may silently exclude difficult cases and misrepresent correctness.'),
    q('The output condition tells us when a proposed result is ', 'acceptable', '.', 'A clear postcondition separates the problem from a particular method. It gives the proof a target to establish.'),
    q('An algorithm can be described independently of a programming ', 'language', '.', 'The abstract steps and proof concern the computation. An implementation translates those steps into a concrete environment with additional details.'),
    q('A running-time analysis needs a chosen measure of input ', 'size', '.', 'The bound is a function of that measure. Choosing the wrong measure can hide important work or misstate the result.'),
    q('A proof should explain why the procedure works for arbitrary valid ', 'instances', '.', 'Tracing a few examples builds intuition but does not establish all cases. The argument must connect each step to the specification.'),
    q('A precise specification can be used to compare different ', 'algorithms', '.', 'Two methods may be judged against the same input and output contract. Their implementations and costs can differ while solving one problem.'),
    q('An algorithm that never terminates fails to provide the required ', 'output', '.', 'Partial progress is not enough for a terminating computational task. Correctness includes reaching a result after finite work.'),
    q('An invariant is a property preserved across repeated ', 'steps', '.', 'Establish it initially, show every step preserves it, and use it at termination to derive the required output.'),
    q('An informal intuition should be converted into a checkable ', 'argument', '.', 'State assumptions and explain each implication. A skeptical reader should be able to identify exactly why the conclusion follows.'),
    q('The simplest correct approach can be a useful starting ', 'point', '.', 'A clear baseline exposes the structure of the problem. Efficiency improvements can then be evaluated without losing the correctness target.'),
    q('The precondition in this example rules out a zero ', 'denominator', '.', 'The procedure is specified only for inputs meeting the condition. A correctness proof must either rely on it explicitly or handle the excluded case.', { code: 'def ratio(a, b):  # precondition: b != 0\n    return a / b' }),
    q('A performance claim is incomplete without stating the computational ', 'model', '.', 'Counting comparisons, arithmetic operations, or bit operations can produce different costs. The analysis should say which work is measured.'),
    q('The proof and cost analysis answer different questions about an ', 'algorithm', '.', 'Correctness asks whether the output meets the specification. Complexity asks how resources grow as valid inputs become larger.')
  ]);

  add('big-o', [
    q('Big O states an eventual upper bound up to a constant ', 'factor', '.', 'For sufficiently large inputs, the running-time function is at most a fixed multiple of the comparison function.'),
    q('A lower asymptotic bound is written with big ', 'Omega', '.', 'Omega gives an eventual lower bound up to a constant factor. It answers a different question from a Big O upper bound.'),
    q('A tight asymptotic bound is written with big ', 'Theta', '.', 'Theta requires matching upper and lower bounds. It describes the growth rate more precisely than an upper bound alone.'),
    q('In n² + 7n + 4, the dominant asymptotic term is ', 'quadratic', '.', 'For large n, the n² term grows faster than the linear and constant terms. The full expression is Theta of n².'),
    q('A constant multiplier does not change a Big O growth ', 'class', '.', 'A fixed factor can be absorbed into the bound’s constant. It can still matter for practical performance at real input sizes.'),
    q('Big O describes growth for sufficiently large ', 'inputs', '.', 'The definition allows a threshold below which the inequality need not hold. Small-instance behavior can differ substantially.'),
    q('A worst-case time bound considers the slowest valid input of a given ', 'size', '.', 'The bound must cover every input at that size. An easy example cannot establish the worst-case guarantee.'),
    q('An average-case claim needs an explicit distribution over possible ', 'inputs', '.', 'The expected cost depends on how inputs are weighted. Without a distribution, average behavior is not well defined.'),
    q('A nested loop with n iterations in each dimension does ', 'quadratic', ' work.', 'The inner body runs n times for each of n outer iterations. Multiplying the counts gives n squared operations.'),
    q('Halving a positive input repeatedly gives logarithmic ', 'depth', '.', 'After k halvings, the size is about n divided by two to the k. Reaching one takes roughly log₂ n steps.'),
    q('Two consecutive linear loops still have ', 'linear', ' total work.', 'Their costs add to a constant multiple of n. Sequential loops do not multiply iteration counts the way nested loops do.'),
    q('An exponential algorithm may become impractical after only a modest input ', 'increase', '.', 'Each extra input element can multiply the work. Constant-factor improvements cannot change that underlying growth pattern.'),
    q('A measured runtime curve is evidence but not a general ', 'proof', '.', 'Benchmarks sample a finite set of inputs on one machine. Analysis is needed for a bound covering all stated inputs.'),
    q('The inner loop makes this fragment’s work ', 'quadratic', '.', 'For each of n outer iterations, the inner loop executes n times. The total body count is n squared.', { code: 'for i in range(n):\n    for j in range(n):\n        visit(i, j)' })
  ]);

  add('graphs-heaps', [
    q('A graph’s vertices represent objects and its edges represent ', 'relationships', '.', 'The model turns a domain question into connectivity or path questions. Edge direction and weights depend on the application.'),
    q('An undirected edge can be traversed in either ', 'direction', '.', 'Its two endpoints are symmetric for reachability. A directed edge only supports traversal along its specified orientation.'),
    q('A connected component contains vertices reachable from one ', 'another', '.', 'Within the component a path joins each pair. No path connects it to a different component.'),
    q('Breadth-first search explores vertices by increasing path ', 'length', '.', 'A queue processes each discovery layer before the next. Thus the first discovery uses the fewest edges in an unweighted graph.'),
    q('A depth-first traversal uses a ', 'stack', ' to prioritize recent discoveries.', 'Last-in-first-out behavior follows one path deeply before backing up. A recursive call stack can provide the same ordering.'),
    q('A visited set prevents a graph search from repeatedly exploring a ', 'cycle', '.', 'Edges can lead back to earlier vertices. Marking discovered vertices keeps traversal finite and avoids duplicate work.'),
    q('A min-heap guarantees a minimum at its ', 'root', '.', 'Each parent is no larger than its children. That local ordering is enough to identify the global minimum at the root.'),
    q('A binary heap is commonly stored compactly in an ', 'array', '.', 'Parent and child positions can be calculated from indexes. No explicit pointer is required for the complete-tree shape.'),
    q('Heap insertion may move the new item toward the ', 'root', '.', 'If it is smaller than its parent, swapping upward restores the heap property. The path has logarithmic length.'),
    q('Removing the minimum often moves the last item to the ', 'root', '.', 'Then sift it downward until parent-child order is restored. This touches at most one path through the heap.'),
    q('A heap does not maintain sorted order among ', 'siblings', '.', 'The heap property compares parents with children, not arbitrary pairs. Sorting requires more work than inspecting the heap array.'),
    q('A priority queue chooses work by priority rather than arrival ', 'order', '.', 'A heap is one implementation. It supports retrieving the best-priority item without keeping every item globally sorted.'),
    q('BFS gives minimum-edge paths only when edges have equal ', 'weight', '.', 'With different weights, fewer edges may cost more. A weighted shortest-path method is needed for minimum total weight.'),
    q('The root is the minimum because every parent is no larger than its ', 'children', '.', 'Repeated parent-child comparisons along a path show no descendant can be smaller than the root in a valid min-heap.', { code: 'heap = [2, 5, 3, 9, 7, 8]' })
  ]);
  add('jea-0-5', [
    q('A problem specification must say what input the algorithm receives and what output it must ', 'produce', '.', 'That contract allows correctness to be judged independently of the implementation. Hidden assumptions make a proof incomplete.'),
    q('Pseudocode should make the algorithm’s essential control flow ', 'visible', '.', 'Readers need to see decisions, loops, and recursive calls. Language-specific syntax can distract from the computational idea.'),
    q('A black-box specification describes behavior without exposing internal ', 'steps', '.', 'A caller can rely on the contract while the implementation changes. The proof must connect those steps back to the contract.'),
    q('A loop description needs a rule that covers an arbitrary ', 'iteration', '.', 'Showing only the first few passes does not explain general behavior. State what is preserved and how the next step works.'),
    q('An algorithm description should explicitly identify its base ', 'case', '.', 'A recursive procedure needs a directly solved smallest instance. Without it, the computation may never terminate.'),
    q('A good recursive specification states which smaller instance each call ', 'solves', '.', 'The caller must know how subproblem answers relate to the original input. Vague recursion obscures both correctness and cost.'),
    q('The explanation of why an algorithm works is a correctness ', 'proof', '.', 'It connects the procedure to the required output for every valid input. An execution trace alone is not enough.'),
    q('A precondition narrows the set of inputs the algorithm promises to ', 'handle', '.', 'The proof may rely on that condition, but it must be stated. Otherwise the advertised problem is broader than the solution.'),
    q('An output invariant can connect each partial step to the final ', 'answer', '.', 'If the property holds initially and survives every step, termination can turn it into the required result.'),
    q('An example trace illustrates an algorithm but cannot establish universal ', 'correctness', '.', 'The trace covers one input. A proof must explain why the same reasoning applies to every permitted case.'),
    q('An algorithm description should separate the idea from machine-specific ', 'details', '.', 'Pseudocode communicates the procedure without tying it to one language. Implementation choices can follow after the algorithm is understood.'),
    q('A reader should be able to implement the algorithm from its precise ', 'description', '.', 'Ambiguous steps leave key choices unspecified. Inputs, outputs, case handling, and control flow must be clear enough to reproduce.'),
    q('The postcondition states what must be true when the algorithm ', 'returns', '.', 'It is the target of the correctness proof. A proof should show that every terminating execution meets this condition.'),
    q('This code’s empty-input branch provides a concrete base ', 'case', '.', 'The function returns immediately for the smallest input. The recursive or iterative part can then be described for larger instances.', { code: 'def sum_list(items):\n    if not items:\n        return 0\n    return items[0] + sum_list(items[1:])' })
  ]);

  add('jea-0-6', [
    q('A correctness argument starts from the formal input and output ', 'contract', '.', 'The proof cannot establish the right result until the intended result is precisely stated for valid inputs.'),
    q('A worst-case bound covers every input of the chosen ', 'size', '.', 'A favorable input cannot justify it. The analysis must account for the most expensive valid case.'),
    q('Counting primitive operations requires a model of which steps have constant ', 'cost', '.', 'An assumed unit-cost operation can hide work, especially on large numbers. State the model before claiming a bound.'),
    q('The running time of a loop depends on how often its body ', 'executes', '.', 'Identify the iteration count and work per iteration. Multiplying or summing those costs gives the total.'),
    q('The cost of a recursive algorithm is often expressed by a ', 'recurrence', '.', 'The recurrence adds nonrecursive work to the costs of smaller calls. Solving it describes growth as input size increases.'),
    q('A mathematical proof covers inputs not included in any finite test ', 'suite', '.', 'Tests can catch mistakes and increase confidence, but they sample particular cases. A general argument establishes the claim under stated assumptions.'),
    q('Asymptotic analysis ignores fixed constant factors only when comparing growth ', 'rates', '.', 'Constants can still dominate on realistic inputs. The asymptotic result is about behavior as the size becomes large.'),
    q('A termination proof shows that the algorithm reaches its stopping ', 'condition', '.', 'Correct intermediate states do not suffice if work can continue forever. A decreasing finite measure often establishes termination.'),
    q('A loop invariant should hold before and after each ', 'iteration', '.', 'Initialization and preservation make it true throughout execution. At exit it can establish the required output.'),
    q('A claimed upper bound must include all substantial work, including data ', 'preparation', '.', 'Sorting or preprocessing may dominate the main loop. Omitting it understates the complete algorithm’s cost.'),
    q('Input size can have multiple parameters when a problem has multiple ', 'dimensions', '.', 'For a graph, vertices and edges can vary independently. A bound in both parameters conveys more than one collapsed number.'),
    q('An amortized bound describes average cost over a sequence of ', 'operations', '.', 'A single operation may be expensive, while the entire sequence has a useful total bound. It differs from input-distribution average case.'),
    q('A recursive proof typically assumes correctness on smaller ', 'inputs', '.', 'The induction hypothesis justifies recursive answers. The parent step must show how those answers solve the current instance.'),
    q('The loop executes exactly n times, so this code has ', 'linear', ' work.', 'Each iteration performs constant work under the usual model. Summing n such steps yields a running time proportional to n.', { code: 'total = 0\nfor x in items:\n    total += x' })
  ]);

  add('jea-1-6', [
    q('Divide and conquer requires smaller subproblems of the same ', 'form', '.', 'Recursive calls must be instances of the original problem. Their answers are then combined to solve the parent instance.'),
    q('The divide step determines the inputs for the recursive ', 'calls', '.', 'It partitions or transforms the current instance. The choice controls subproblem sizes and therefore the running-time recurrence.'),
    q('The combine step must construct a valid answer for the ', 'parent', '.', 'Correct subproblem answers alone are insufficient. The proof must show that combining them satisfies the original specification.'),
    q('A base case stops recursion on sufficiently small ', 'instances', '.', 'Those instances are solved directly. The recursive step must reduce size so every path eventually reaches a base case.'),
    q('Independent subproblems can be solved without sharing intermediate ', 'answers', '.', 'That separation is characteristic of divide and conquer. Overlapping subproblems instead motivate caching or dynamic programming.'),
    q('A balanced split often gives logarithmic recursion ', 'depth', '.', 'Repeatedly dividing size by a constant reaches one after about log n levels. Total work also depends on branching and combine cost.'),
    q('A highly uneven split can produce nearly linear recursion ', 'depth', '.', 'Removing only one item per call requires roughly n levels. The divide step therefore affects efficiency substantially.'),
    q('A recurrence includes both recursive costs and nonrecursive ', 'work', '.', 'Partitioning and combining consume time at each call. Ignoring them can yield the wrong complexity.'),
    q('Correctness of a divide-and-conquer method is naturally argued by ', 'induction', '.', 'Assume smaller calls return correct answers, then prove the combination is correct. Establish direct base cases first.'),
    q('Merge sort’s combine operation is a linear-time ', 'merge', '.', 'The two recursive halves are sorted. Scanning them in order constructs a sorted whole while doing work proportional to n.'),
    q('If both halves are solved but their results are discarded, the parent has no valid ', 'answer', '.', 'Recursive correctness must be used by the combine step. The algorithm description must say how results become the output.'),
    q('The recursion terminates when each call receives a strictly ', 'smaller', ' instance.', 'A decreasing size and a reachable base case rule out infinite descent. The proof should identify the measure being reduced.'),
    q('A divide-and-conquer algorithm may solve subproblems in ', 'parallel', '.', 'Independence allows concurrent execution. The total work may stay similar while elapsed time changes, subject to combine and scheduling costs.'),
    q('The two recursive calls split the array into ', 'halves', '.', 'Each call receives a smaller instance of the same problem. A separate combine step is still required to build the full answer.', { code: 'left = solve(a[:mid])\nright = solve(a[mid:])\nreturn combine(left, right)' })
  ]);
  add('jea-1-7', [
    q('A recursion tree expands each recursive call into a child ', 'node', '.', 'The tree exposes how many subproblems appear at each depth. Summing nonrecursive work over its nodes gives total time.'),
    q('The work at one tree level equals the sum of its node ', 'weights', '.', 'Each weight counts operations outside child calls. Level totals reveal whether root, leaves, or all levels dominate.'),
    q('For T(n)=2T(n/2)+n, each complete level costs ', 'linear', ' work.', 'There are twice as many nodes and each is half as large at the next level. Their n-sized total stays constant.'),
    q('For T(n)=2T(n/2)+n, the number of levels is ', 'logarithmic', '.', 'Halving size repeatedly takes about log₂ n steps. With linear work per level, the total is Theta of n log n.'),
    q('For T(n)=2T(n/2)+1, the leaf count is ', 'linear', ' in n.', 'The tree branches twice while sizes halve, producing about n leaves. Constant work per node then sums to linear time.'),
    q('At depth d of an r-way recursion tree, there are rᵈ ', 'nodes', '.', 'Every level multiplies node count by r until base cases appear. Multiply that count by work per node for level cost.'),
    q('At depth d in T(n)=rT(n/c)+f(n), each subproblem has size about n/cᵈ ', 'elements', '.', 'Each generation divides size by c. The depth reaches the base case when c to the d is about n.'),
    q('A recursion tree’s leaves represent calls at the ', 'base', ' case.', 'Their number and individual cost can dominate the sum. Include them even when internal nonrecursive work seems more prominent.'),
    q('A geometric increase in per-level work often makes the deepest levels ', 'dominate', '.', 'When each level costs a fixed factor more than the previous, the final levels account for a constant fraction of the total.'),
    q('A geometric decrease in per-level work often makes the root ', 'dominate', '.', 'Each deeper level contributes a smaller fixed fraction. Summing the series stays within a constant multiple of the root cost.'),
    q('Equal cost across logarithmically many levels yields an extra ', 'logarithm', '.', 'For example, linear work on every level of a balanced binary split sums to n log n rather than n.'),
    q('A recursion tree must account for the work of the ', 'combine', ' step.', 'Nonrecursive work includes partitioning and assembling answers. Ignoring it can change which levels dominate the total.'),
    q('Uneven recursive sizes require care when labeling node ', 'sizes', '.', 'A balanced-tree shortcut may no longer apply. Track actual sizes or bound them before summing work across levels.'),
    q('The recurrence T(n)=T(n/2)+1 has ', 'logarithmic', ' depth.', 'Only one smaller call occurs per level, and size halves. Constant work per level gives logarithmic total time.')
  ]);

  add('induction-1', [
    q('A smallest-counterexample proof begins by supposing the theorem is ', 'false', '.', 'If any counterexample exists, well-ordering gives a least one. Showing it forces a smaller counterexample creates a contradiction.'),
    q('The chosen counterexample must be smallest under a well-founded ', 'order', '.', 'Without a least element, the descent argument has no starting point. Positive integer size commonly supplies the required order.'),
    q('A smaller counterexample contradicts the minimality of the original ', 'counterexample', '.', 'The proof assumes the chosen bad instance was least. Constructing a strictly smaller bad instance makes that assumption impossible.'),
    q('A universal claim needs only one counterexample to be ', 'disproved', '.', 'If it promises the property for every valid input, a single valid input where the property fails refutes it.'),
    q('A smallest-counterexample proof must show the reduced instance is still ', 'valid', '.', 'A smaller object outside the theorem’s domain does not contradict anything. Verify that all preconditions remain satisfied.'),
    q('The descending step needs a strictly smaller measure, not merely a different ', 'object', '.', 'Minimality only rules out a bad instance with a lower rank. An equal-sized transformation gives no contradiction.'),
    q('A composite number can be decomposed into smaller positive ', 'factors', '.', 'Those factors provide the smaller instances used in a proof about prime divisors. The proof must track which divides the original.'),
    q('If a proper factor has a prime divisor, that prime also divides the original ', 'number', '.', 'Divisibility is transitive through multiplication. This lets a smaller factor’s property transfer back to the composite number.'),
    q('The base case is implicit when no smaller valid instance ', 'exists', '.', 'The smallest objects must satisfy the claim directly. Otherwise the descent step cannot start from them.'),
    q('Minimal-counterexample reasoning is equivalent in power to mathematical ', 'induction', '.', 'Both use the well-ordering of positive integers. One proves no least failure exists; the other builds truth from smaller cases.'),
    q('An infinite descent contradicts the well-ordering of positive ', 'integers', '.', 'There cannot be an endlessly decreasing sequence of positive integers. A supposed counterexample that generates one is impossible.'),
    q('A proof fails if the constructed smaller object need not be a ', 'counterexample', '.', 'Smallness alone is insufficient. The new object must also violate the original claim, under the same valid-input conditions.'),
    q('This divisor is proper because it lies strictly between one and ', 'n', '.', 'A proper factor is smaller than the composite number. It can support the descent argument while remaining positive.', { code: 'if n % d == 0 and 1 < d < n:\n    factor = d' }),
    q('A contradiction proof should identify the exact assumption that becomes ', 'impossible', '.', 'Here it is the least bad instance. The derived smaller bad instance directly conflicts with that assumption.')
  ]);

  add('induction-2', [
    q('The induction axiom turns a base case and a valid step into a universal ', 'claim', '.', 'The base anchors the chain, and the step extends truth to every later integer. Both obligations are necessary.'),
    q('Strong induction may assume the claim for all smaller ', 'values', '.', 'This is useful when the current case depends on several earlier sizes. It is not stronger in what can ultimately be proved.'),
    q('An induction hypothesis can be used only on a strictly smaller ', 'instance', '.', 'Using the current case assumes the conclusion being proved. The proof must identify a valid earlier case.'),
    q('A base case prevents the step from leaving the entire claim ', 'unanchored', '.', 'A conditional statement that P(n) implies P(n+1) can hold even when every P(n) is false. Establish the start explicitly.'),
    q('A proof with multiple residues may need several base ', 'cases', '.', 'If the step advances by more than one, one starting value may not cover every chain. Check the reachable classes.'),
    q('Well-ordering guarantees a least member of every nonempty set of positive ', 'integers', '.', 'That least element supports minimal-counterexample arguments. It is the structural reason infinite descent cannot persist.'),
    q('The step should prove the current case from previously established ', 'cases', '.', 'State the hypothesis precisely and show how it yields the target. A numerical pattern is not a substitute.'),
    q('If the step proves P(n) implies P(n+2), the base must cover both parity ', 'classes', '.', 'One chain reaches even indexes and the other reaches odd indexes. A single starting case covers only one chain.'),
    q('A circular proof hides the desired conclusion inside an unjustified ', 'assumption', '.', 'The induction hypothesis applies to earlier instances only. Assuming the present claim makes the argument invalid.'),
    q('Choosing an induction parameter requires a well-founded measure that decreases in recursive ', 'calls', '.', 'The parameter should match the actual dependency structure. Otherwise the hypothesis may not justify the algorithm’s subcalls.'),
    q('An inductive proof can establish a property of a recursive ', 'algorithm', '.', 'Prove direct cases, assume correctness for smaller inputs, and show the parent combines their answers correctly.'),
    q('The statement P(0) plus P(n) implies P(n+1) establishes all nonnegative ', 'integers', '.', 'The base establishes zero and the step advances one at a time. Every nonnegative integer is reached in finitely many steps.'),
    q('This recursive call supports induction on n because its input is strictly ', 'smaller', '.', 'The function reduces n by one before calling itself. A base case at zero completes the termination and correctness structure.', { code: 'def factorial(n):\n    if n == 0: return 1\n    return n * factorial(n - 1)' })
  ]);

  add('induction-3', [
    q('A recursive correctness proof should match the algorithm’s actual ', 'calls', '.', 'The induction hypothesis must cover the subproblem that the code solves. Proving a different recurrence does not justify the implementation.'),
    q('Strong induction is convenient when recursive calls skip more than one ', 'size', '.', 'Assuming all smaller cases covers varied decreases. The proof still requires direct bases and a valid reduction.'),
    q('A termination measure must decrease on every recursive ', 'branch', '.', 'One decreasing path is insufficient if another can cycle forever. Check all cases that make recursive calls.'),
    q('Several base cases may be needed when the reduction jumps by a fixed ', 'amount', '.', 'Subtracting five creates separate residue chains. Direct starting cases must cover every valid chain used by the step.'),
    q('A stamp proof should show the final construction uses only allowed ', 'denominations', '.', 'A numerical decomposition is valid only if each added piece is a permitted stamp and the prior amount is constructible.'),
    q('If an amount is obtained by adding five to a smaller constructible amount, the step adds one five-cent ', 'stamp', '.', 'The induction hypothesis supplies the smaller construction. Adding the allowed stamp yields a construction for the current amount.'),
    q('A recurrence without reachable base cases may run ', 'forever', '.', 'Every recursive branch needs to approach a directly solved instance. A decreasing but invalid-size sequence may still miss the intended base.'),
    q('The proof’s domain should include the smaller instances it invokes in the ', 'hypothesis', '.', 'If the recursive call leaves the claimed domain, the hypothesis cannot justify its answer. State and preserve the domain.'),
    q('A 5-and-7 stamp construction has different behavior across small ', 'amounts', '.', 'Not every small target is representable. Explicit base cases and a threshold are needed before an inductive step applies broadly.'),
    q('An induction step can fail when subtracting five produces a nonconstructible ', 'remainder', '.', 'The smaller amount must satisfy the induction hypothesis. Merely being numerically smaller does not prove it has a valid construction.'),
    q('Recursive calls should pass enough state to describe the remaining ', 'problem', '.', 'The subproblem must contain all information needed for future decisions. Missing state can make two different histories look identical.'),
    q('A proof of termination is distinct from a proof of output ', 'correctness', '.', 'A function can halt with the wrong answer, or maintain a valid invariant while never halting. Both claims need support.'),
    q('This call reduces the target by an allowed stamp ', 'value', '.', 'The recursive branch explores a smaller remaining amount. Base cases must classify reachable small targets correctly.', { code: 'def can_make(n):\n    if n == 0: return True\n    return n >= 5 and can_make(n - 5)' })
  ]);

  add('jea-1-exercises', [
    q('A recurrence must include the cost of work outside the recursive ', 'calls', '.', 'Partitioning, comparisons, and combining consume time too. Ignoring them understates total cost, sometimes by an asymptotic factor.'),
    q('A recursive algorithm needs an explicit rule for its smallest ', 'inputs', '.', 'These base cases provide answers without further calls. They also anchor a correctness proof and termination argument.'),
    q('A divide-and-conquer combination must satisfy the original output ', 'condition', '.', 'Correct child answers do not automatically solve the parent. Show how the merge or selection step preserves the specification.'),
    q('A reduction transforms one problem into another while preserving the needed ', 'answer', '.', 'The transformed instance must encode the original question. A solution to it must be convertible back to a correct original solution.'),
    q('A reduction used in an efficient algorithm must itself run in ', 'polynomial', ' time.', 'An expensive transformation can dominate the whole method. Complexity claims must include instance conversion and answer conversion.'),
    q('A recurrence tree helps reveal which depth contributes most of the ', 'work', '.', 'Compute node count and node cost per level. Sum levels, including leaves, to estimate the total.'),
    q('An induction proof for recursion assumes child calls return correct ', 'answers', '.', 'The parent argument then shows how those answers yield a correct result. Direct base cases begin the proof.'),
    q('A subproblem must be strictly smaller to justify termination by size ', 'induction', '.', 'If a recursive call can receive the same input, the proof of descent fails and the algorithm may loop.'),
    q('An example where a greedy choice fails is a ', 'counterexample', '.', 'One valid input with a suboptimal greedy output disproves a universal optimality claim. It may suggest a fuller search recurrence.'),
    q('A transformed solution needs a decoding step to answer the original ', 'question', '.', 'Solving a different instance is useful only when its answer can be mapped back. Include that mapping in the reduction proof.'),
    q('A time bound for a recursive method includes the number of child ', 'calls', '.', 'Branching can multiply subproblem count. Even small work at each call may accumulate over many tree nodes.'),
    q('A proof by induction should use the exact structure of the recursive ', 'algorithm', '.', 'If the code splits into halves, the hypothesis should cover those halves and the proof should analyze their combination.'),
    q('The base case in this recurrence contributes constant ', 'time', '.', 'A size-one input returns directly. The recurrence applies only to larger inputs, where the two recursive calls dominate.', { code: 'def solve(n):\n    if n <= 1: return 1\n    return solve(n // 2) + solve(n // 2)' }),
    q('An algorithm can be correct but inefficient because it repeats the same ', 'subproblems', '.', 'A recursion tree may contain identical instances in different branches. Memoization can reuse their answers without changing the recurrence’s meaning.'),
    q('A tight complexity claim requires both an upper and a lower ', 'bound', '.', 'An upper bound alone may be loose. Matching bounds identify the asymptotic growth for the stated algorithm and input model.')
  ]);
  add('jea-2-4', [
    q('A backtracking state should retain exactly the information future choices ', 'need', '.', 'Past decisions matter only through their effect on the remaining problem. Too little state merges distinct situations; too much obscures reuse.'),
    q('The recursive step considers every valid next ', 'choice', '.', 'Exploring all alternatives makes the first formulation complete. Pruning is safe only when a proof shows skipped branches cannot succeed.'),
    q('A backtracking base case decides whether a completed choice sequence is ', 'successful', '.', 'The recursion must return a definite result when no decisions remain. That result anchors the logical combination of branches.'),
    q('For a yes-or-no problem, alternative branches combine with logical ', 'or', '.', 'Any successful choice suffices. The recurrence returns true if at least one valid next decision leads to a solution.'),
    q('A partial assignment is worth abandoning only when it cannot extend to a valid ', 'solution', '.', 'This is pruning. The condition must be sound, or the search may discard the only successful branch.'),
    q('A recursive subproblem can be broader than the original user ', 'question', '.', 'The algorithm may need to solve every possible remaining state, not just the initial input. The generalized contract makes recursion precise.'),
    q('Two histories with identical future-relevant state have the same continuation ', 'answer', '.', 'The recurrence depends on that state, not the route taken to reach it. This observation prepares memoization.'),
    q('Subset sum can branch by including or excluding the next ', 'item', '.', 'Both choices must be considered unless a safe pruning rule applies. The remaining target records the effect of inclusion.'),
    q('An include branch for subset sum reduces the remaining ', 'target', '.', 'The selected value contributes to the sum, so the recursive call asks whether the rest can supply the difference.'),
    q('An exclude branch advances past an item without changing the ', 'target', '.', 'The item is unavailable to later choices. The remaining target is unchanged because nothing was added.'),
    q('Backtracking can take exponential time because the choice tree ', 'branches', '.', 'With two possibilities per item and little pruning, the tree can contain roughly two to the n leaves.'),
    q('Memoization helps when different branches revisit the same ', 'state', '.', 'Caching the answer avoids recomputing all continuations from that state. The state representation must capture every relevant condition.'),
    q('A valid recurrence must not confuse an impossible branch with a zero-cost ', 'solution', '.', 'The combination rule treats impossible and successful outcomes differently. Clear base cases prevent false success in optimization variants.'),
    q('This search branches on including or excluding the next ', 'value', '.', 'The two calls cover both possible decisions for the current item. The target changes only in the include branch.', { code: 'return solve(i + 1, target) or solve(i + 1, target - values[i])' })
  ]);

  add('jea-2-5', [
    q('Text segmentation asks whether the entire string can be covered by valid ', 'words', '.', 'A valid first word is insufficient if the remaining suffix cannot be segmented. The recurrence must check both pieces.'),
    q('The first decision in segmentation selects a prefix ending at some ', 'position', '.', 'Each candidate boundary defines a possible first word and a remaining suffix. The search tries every allowable boundary.'),
    q('A candidate prefix should be checked against the word ', 'dictionary', '.', 'Only dictionary words can start a valid segmentation. Invalid prefixes can be skipped before recursing on the suffix.'),
    q('A valid first word succeeds only when its suffix is also ', 'segmentable', '.', 'The recursive call handles everything after the chosen prefix. Logical and combines the prefix test with the suffix result.'),
    q('Alternative first-word choices combine with logical ', 'or', '.', 'One successful split is enough to prove the string segmentable. Failure requires every candidate split to fail.'),
    q('The empty suffix is a successful base ', 'case', '.', 'After the final valid word, no characters remain. Zero additional words form a valid completion of the segmentation.'),
    q('The suffix start index is enough state when the original string and dictionary stay ', 'fixed', '.', 'Future possibilities depend only on the remaining characters. Earlier split boundaries need not be stored for a yes-or-no answer.'),
    q('Different prefix choices can reach the same suffix ', 'index', '.', 'That overlap causes repeated recursive work. Memoizing the result for each index turns the search into dynamic programming.'),
    q('A greedy longest-prefix rule can fail even when a valid segmentation ', 'exists', '.', 'The longest first word may leave an impossible suffix. Backtracking keeps shorter valid prefixes available for consideration.'),
    q('A greedy shortest-prefix rule also needs a correctness ', 'proof', '.', 'Local length alone does not guarantee the suffix can be segmented. Without a proof, explore all valid first words.'),
    q('To reconstruct actual words, store the successful split ', 'position', '.', 'Boolean memoization says a suffix is possible but not how. A saved boundary allows the chosen words to be recovered.'),
    q('An empty dictionary cannot segment a nonempty ', 'string', '.', 'No nonempty prefix qualifies as a valid first word. The only successful input is the empty string base case.'),
    q('Checking prefixes naively can add string-copying ', 'cost', '.', 'The recurrence count alone may omit the work to create or compare substrings. Use indexes or account for copying in complexity.'),
    q('The recurrence can be evaluated from the end of the string toward its ', 'start', '.', 'A suffix depends on shorter suffixes beginning farther right. Filling those states first makes every needed answer available.')
  ]);

  add('jea-2-8', [
    q('Optimal-BST search cost weights each key’s depth by its access ', 'frequency', '.', 'Frequently accessed keys contribute more to the objective. A balanced shape may therefore be suboptimal under unequal frequencies.'),
    q('Choosing a root partitions an ordered key interval into two smaller ', 'intervals', '.', 'All lesser keys must lie left and greater keys right. The binary-search-tree order fixes the subproblem boundaries.'),
    q('Every key in the interval gains one extra comparison below the chosen ', 'root', '.', 'This adds the interval’s total frequency to the two subtree costs, regardless of which candidate becomes root.'),
    q('The empty interval has cost ', 'zero', '.', 'It contains no searched keys, so contributes no weighted comparisons. This base case also handles a root at an endpoint.'),
    q('The backtracking recurrence tries every possible interval ', 'root', '.', 'Each root defines a different pair of subtrees. Taking the minimum over candidates guarantees the best tree if subproblems are optimal.'),
    q('For a fixed root, the optimal left and right subtrees can be chosen ', 'independently', '.', 'Their keys and costs are disjoint except for the shared interval-frequency increment. Improving either subtree improves the whole tree.'),
    q('An optimal tree cannot contain a nonoptimal subtree for its fixed ', 'interval', '.', 'Replacing that subtree with a cheaper valid one would lower the total tree cost, contradicting optimality.'),
    q('A frequent key near the root can outweigh a perfectly balanced tree ', 'shape', '.', 'The objective is weighted comparisons rather than worst-case height. Key frequencies determine the tradeoff.'),
    q('The recurrence state needs both left and right interval ', 'endpoints', '.', 'The set of candidate keys is contiguous in sorted order. A single size value cannot identify which frequencies are included.'),
    q('Trying one root greedily cannot guarantee the minimum without an exchange ', 'proof', '.', 'The chosen root changes both subtree costs. The backtracking recurrence avoids assuming that a locally frequent key is always best.'),
    q('The interval-frequency term counts the comparison at the current ', 'root', '.', 'Every search in the interval visits that root once. Summing access frequencies gives the weighted contribution of this level.'),
    q('A root at the left endpoint creates an empty ', 'left', ' subtree.', 'No interval keys are smaller than that root. The empty-interval base case supplies zero cost for that side.'),
    q('Backtracking repeats interval subproblems under different root ', 'choices', '.', 'The same interval can appear in many search branches. Caching its optimal cost will later remove this duplication.'),
    q('This recurrence adds interval weight after minimizing over candidate ', 'roots', '.', 'The frequency sum is independent of which root is chosen. The subtree costs vary with the selected split.', { code: 'cost(i,j) = sum(freq[i:j+1]) + min(cost(i,r-1)+cost(r+1,j) for r in range(i,j+1))' })
  ]);
  const deepen = (id, phrases) => {
    const added = course.sets.find(set => set.id === id).koans.slice(-phrases.length);
    added.forEach((koan, index) => { koan.why += ` ${phrases[index]}`; });
  };
  deepen('jea-2-4', [
    'The state must not omit a future constraint.',
    'This is the completeness obligation behind the search.',
    'The final return value anchors the branch recurrence.',
    'Failure means every continuation has been ruled out.',
    'Pruning requires an argument stronger than intuition.',
    'This broader contract covers all reachable recursive calls.',
    'The common state is what makes caching sound.',
    'The item index prevents choosing one item twice.',
    'The remaining target tracks the unpaid sum.',
    'Advancing the index rules out reconsidering the item.',
    'The tree size explains why reuse can matter.',
    'Distinct histories may collapse to one cached subproblem.',
    'Use an explicit failure value when optimizing.',
    'Neither decision can be ignored without proof.'
  ]);
  deepen('jea-2-5', [
    'Every character must belong to some chosen word.',
    'A split point determines both parts of the recurrence.',
    'Dictionary membership is a necessary local condition.',
    'A successful suffix completes the proposed first word.',
    'A single successful boundary certifies the whole string.',
    'This terminates a chain of valid prefixes.',
    'Fixed inputs need not be duplicated in the state.',
    'The number of distinct suffix indexes is linear.',
    'The failure comes from its remaining suffix.',
    'A counterexample defeats either unproved length rule.',
    'The stored choice acts as a reconstruction pointer.',
    'No candidate prefix can begin the recursion.',
    'Implementation costs can change the final time bound.',
    'The dependency order follows increasing suffix length.'
  ]);
  deepen('jea-2-8', [
    'The objective is expected search work, not height alone.',
    'Sorted order forces all smaller keys leftward.',
    'Every search pays for one comparison at this level.',
    'It also makes edge roots easy to handle.',
    'Exhausting roots avoids an unsupported greedy assumption.',
    'Neither subtree constrains the other beyond the split.',
    'That replacement is the optimal-substructure proof.',
    'The weights determine which shallow positions are valuable.',
    'Endpoints identify exactly which keys remain.',
    'A locally appealing root may create costly subtrees.',
    'This term is shared across all root candidates.',
    'The left cost then contributes nothing.',
    'Those repeated intervals motivate a table later.',
    'Only the child costs depend on the chosen root.'
  ]);
  add('jea-12-1', [
    q('CircuitSat is a decision problem because its output is yes or ', 'no', '.', 'It asks whether at least one input assignment makes the circuit true. The output is not the assignment itself.'),
    q('The n switches in the black-box story permit 2ⁿ possible ', 'settings', '.', 'Each binary input doubles the number of assignments. Exhaustive search therefore grows exponentially with the number of switches.'),
    q('A visible circuit can be evaluated quickly for one chosen ', 'assignment', '.', 'Process gates in dependency order to compute the output. This checks a proposed witness but does not find one efficiently.'),
    q('A satisfying input assignment is a certificate for a ', 'yes', ' instance.', 'The verifier plugs in the proposed bits and evaluates the circuit. A true output proves that some satisfying assignment exists.'),
    q('Showing no assignment works appears harder than verifying one that ', 'works', '.', 'A yes witness is one concrete setting. A no claim concerns all settings and may lack a similarly short certificate.'),
    q('The adversary’s opaque box differs from a fully specified ', 'circuit', '.', 'When internals are hidden and can be chosen later, exhaustive testing is forced by the story. That is not a lower-bound proof for explicit CircuitSat.'),
    q('A lower bound for the black-box game does not establish one for explicit ', 'CircuitSat', '.', 'An algorithm can inspect the known circuit structure, unlike the opaque box. No exponential lower bound follows from that analogy.'),
    q('A Boolean circuit combines AND, OR, and NOT ', 'gates', '.', 'Wires carry binary values between gates. The output is determined by the inputs and the gate connections.'),
    q('The size of the circuit includes its gates and ', 'wires', '.', 'Verification time is measured against the explicit representation. Evaluating one assignment is polynomial, indeed roughly linear, in that size.'),
    q('Brute-force CircuitSat tests every input assignment until one yields ', 'true', '.', 'A successful setting ends the search. If none succeeds, all two-to-the-n assignments must have been checked by this method.'),
    q('The known brute-force upper bound is exponential in the number of ', 'inputs', '.', 'There are two choices for each input bit. Evaluating each assignment adds a polynomial factor in circuit size.'),
    q('The absence of a known fast algorithm is not a proof of ', 'impossibility', '.', 'Complexity theory distinguishes evidence and belief from a mathematical lower bound. The chapter uses this uncertainty to motivate P versus NP.'),
    q('The evaluator returns true for this assignment if the circuit output is ', 'true', '.', 'The concrete bits form a proposed witness. Computing the circuit output checks it without exploring other assignments.', { code: 'assignment = {"x": True, "y": False}\nassert evaluate(circuit, assignment) is True' }),
    q('A verifier may be fast even when discovering a witness seems ', 'hard', '.', 'Given the setting, gate evaluation is straightforward. Finding a successful setting may require exploring many possibilities.')
  ]);

  add('jea-12-2', [
    q('P and NP are defined for decision problems with Boolean ', 'answers', '.', 'Optimization questions can often be converted to threshold decisions, but the formal classes here concern yes-or-no outputs.'),
    q('Membership in P requires a polynomial-time algorithm that finds the ', 'answer', '.', 'The solver must decide yes or no from the instance alone. A proposed witness is not supplied to it.'),
    q('Membership in NP requires efficiently checkable certificates for ', 'yes', ' instances.', 'The verifier checks a proposed proof in polynomial time. It need not efficiently discover the proof.'),
    q('A certificate’s length must be polynomial in the input ', 'size', '.', 'A huge exponential witness would not support polynomial-time verification under the standard definition. The proof must be short enough to read.'),
    q('Every problem in P belongs to NP because the verifier can run the ', 'solver', '.', 'It can ignore any certificate and compute the answer directly. Polynomial-time solving implies polynomial-time yes verification.'),
    q('Every problem in P also belongs to ', 'coNP', '.', 'A polynomial solver can check no answers directly. The same easy decision procedure supports certificates on either side.'),
    q('coNP concerns efficiently checkable certificates for ', 'no', ' instances.', 'The class reverses which answer has short evidence. It does not simply mean the complement is computationally easy.'),
    q('A satisfying assignment certifies that a circuit is in a yes ', 'case', '.', 'Evaluating the known circuit on those bits is fast. The assignment serves as a succinct witness.'),
    q('An unsatisfiable circuit has no known general short no ', 'certificate', '.', 'To certify that all assignments fail may be harder than exhibiting one success. This motivates the open NP versus coNP question.'),
    q('Polynomial time means O(nᶜ) for some fixed constant ', 'c', '.', 'The exponent cannot grow with the input. This is a formal minimum standard for efficient computation in the chapter.'),
    q('The equality P = NP remains an open mathematical ', 'question', '.', 'Efficient verification does not currently imply a known efficient solver for every NP problem, nor has the separation been proved.'),
    q('A finite list of hard-looking instances cannot prove P differs from ', 'NP', '.', 'Difficulty observed so far is evidence, not a universal lower bound. A proof must rule out all polynomial algorithms.'),
    q('A verifier checks the proposed certificate rather than searching for ', 'one', '.', 'Its input contains both the instance and candidate witness. The distinction separates NP membership from polynomial-time solving.', { code: 'def verify(circuit, bits):\n    return evaluate(circuit, bits)' })
  ]);

  add('jea-12-3', [
    q('An NP-hard problem need not itself belong to ', 'NP', '.', 'Hardness describes what would follow from solving it efficiently. Membership separately requires efficiently verifiable yes certificates for a decision problem.'),
    q('An NP-complete problem is both NP-hard and in ', 'NP', '.', 'It has polynomially checkable yes witnesses and is at least as hard as every NP problem.'),
    q('A hardness proof maps a known-hard problem into the proposed ', 'target', '.', 'An efficient target solver would then solve the source through the transformation. Reversing direction proves a different claim.'),
    q('A reduction must preserve yes and no ', 'answers', '.', 'The transformed instance is yes exactly when the original is yes. Otherwise a target solver would not decide the source correctly.'),
    q('The reduction’s transformation must run in polynomial ', 'time', '.', 'If conversion were exponential, a fast target algorithm could still yield a slow source algorithm. Efficiency must include conversion.'),
    q('To show target T is NP-hard, start from a problem already known to be ', 'hard', '.', 'Reduce the known-hard source to T. This transfers difficulty because a fast solver for T would solve the source.'),
    q('To show NP-completeness, prove both hardness and NP ', 'membership', '.', 'The reduction handles hardness. A separate certificate and verifier establish that the target itself lies in NP.'),
    q('A polynomial solver for any NP-hard problem would imply P equals ', 'NP', '.', 'Every NP problem can be reduced to that hard problem. Composing the reduction with its fast solver would solve all NP problems efficiently.'),
    q('NP-hardness is a conditional statement about an efficient ', 'solver', '.', 'It does not by itself prove no polynomial algorithm exists. That stronger conclusion would resolve the P versus NP question.'),
    q('A decision version asks whether a solution meeting a threshold ', 'exists', '.', 'The yes-or-no formulation makes complexity-class membership precise. An optimization version may require a different formal treatment.'),
    q('The target of a reduction can be easier to solve only if the source also becomes ', 'easy', '.', 'A fast target solver combined with the reduction decides the source. This is why the direction of transformation matters.'),
    q('Certificate verification and reduction construction are separate polynomial-time ', 'obligations', '.', 'One establishes NP membership; the other transfers hardness. A complete NP-completeness proof must meet both.'),
    q('The source-to-target function must map a yes source instance to a yes target ', 'instance', '.', 'The reverse implication must hold as well. This exact correspondence lets a target solver answer the original question.', { code: 'x_is_yes == target_solver(reduce_source_to_target(x))' })
  ]);
  add('jea-3-4', [
    q('Dynamic programming begins with a correct recursive ', 'specification', '.', 'Define precisely what each subproblem asks before choosing a table. A table cannot make an incorrect recurrence correct.'),
    q('The recursive solution expresses a problem using answers to smaller instances of the ', 'same', ' problem.', 'That relationship is the algorithmic core. Memoization changes how often answers are computed, not what the recurrence means.'),
    q('The set of reachable recursive arguments defines the distinct ', 'subproblems', '.', 'Count those states to estimate storage. Their structure also suggests an array, map, or other memoization representation.'),
    q('A dependency arrow points from a state to the states it ', 'needs', '.', 'The table must evaluate prerequisite answers first. Drawing arrows exposes an ordering that code must respect.'),
    q('A bottom-up order is a linear extension of the dependency partial ', 'order', '.', 'Each state appears after all states required by its recurrence. The base cases begin the sequence.'),
    q('Memoization stores each subproblem answer so it is computed at most ', 'once', '.', 'Later calls reuse the saved result. This removes repetition but does not reduce the number of distinct states.'),
    q('The number of distinct states often determines dynamic-programming ', 'space', '.', 'If each state stores one result, memory grows with state count. Extra reconstruction data may increase it.'),
    q('Total dynamic-programming time sums the work of each distinct ', 'state', '.', 'Count candidate choices and lookups for one state, then sum across all states. Counting states alone can understate time.'),
    q('A top-down memoized recursion computes only states it ', 'reaches', '.', 'It follows dependencies as needed and caches results. A bottom-up table may fill additional states unless carefully restricted.'),
    q('A bottom-up table replaces recursive calls with already computed ', 'lookups', '.', 'The recurrence stays the same. Explicit loop order ensures dependencies are available at the moment of evaluation.'),
    q('A subproblem state needs enough information to determine all future ', 'choices', '.', 'If omitted history affects the answer, memoizing by the incomplete key can reuse an incorrect result.'),
    q('Text segmentation states can be indexed by the start of the remaining ', 'suffix', '.', 'The fixed string and dictionary need not be copied into each key. Each suffix index has a well-defined answer.'),
    q('The segmentation table fills from right to left because each state needs later ', 'indices', '.', 'Trying a first word ending at j consults the suffix starting at j plus one. Those larger indexes must already be known.'),
    q('The base case for the empty suffix stores ', 'true', '.', 'Once all characters have been covered by words, segmentation succeeds. Later states build on that direct answer.')
  ]);

  add('jea-3-5', [
    q('A greedy method chooses a next action without solving the remaining ', 'subproblem', '.', 'It commits using local information. That can be fast, but correctness requires a proof that the local choice preserves an optimum.'),
    q('A locally appealing prefix can leave an unsplittable ', 'suffix', '.', 'Text segmentation depends on the remaining string. A shortest- or longest-word choice alone cannot guarantee a valid completion.'),
    q('A single failing input refutes a greedy algorithm’s universal ', 'claim', '.', 'If the algorithm promises correctness on every valid instance, one counterexample is enough. Test small adversarial cases before relying on intuition.'),
    q('A correct greedy algorithm needs an argument that its first choice is ', 'safe', '.', 'An exchange proof often shows an optimal solution can be transformed to include that choice without worsening the objective.'),
    q('Backtracking avoids premature commitment by trying alternative ', 'choices', '.', 'The recurrence explores possible continuations. Dynamic programming can reuse overlapping continuation results to make this search efficient.'),
    q('Memoization accelerates a correct recurrence but cannot repair a wrong greedy ', 'choice', '.', 'Caching only repeats the same flawed decision faster. The solution structure must be justified before optimizing evaluation.'),
    q('Greedy and dynamic programming both exploit structure, but greedy discards alternative ', 'branches', '.', 'That discard is valid only when a proof rules them out. Dynamic programming keeps the alternatives encoded in its recurrence.'),
    q('A locally smallest element need not begin a longest increasing ', 'subsequence', '.', 'Choosing it may remove earlier elements needed for the longest chain. The example warns against equating local desirability with global optimality.'),
    q('A proof of greedy correctness must cover every input, not only representative ', 'examples', '.', 'Observed successes support intuition but cannot exclude an adversarial arrangement. Formal reasoning justifies the commitment.'),
    q('An exchange argument compares a greedy solution with an optimal ', 'solution', '.', 'It changes an optimum to include the greedy choice without making it worse. Repeating this argument can establish full correctness.'),
    q('When no greedy proof is available, formulate the problem as a recursive ', 'search', '.', 'Explore the alternatives first. Once the recurrence is correct, overlapping states may support a dynamic-programming algorithm.'),
    q('A greedy segmentation rule can fail even if its first word is ', 'valid', '.', 'Local dictionary membership does not guarantee a segmentable suffix. The complete condition includes both the prefix and remaining string.'),
    q('This code commits to the first valid prefix without examining other ', 'prefixes', '.', 'If the chosen suffix fails but a later split succeeds, the algorithm returns a wrong answer. It needs a correctness proof or backtracking.', { code: 'for prefix in valid_prefixes(text):\n    return segment(text[len(prefix):])' }),
    q('A greedy speed advantage is irrelevant when its answer is ', 'wrong', '.', 'Correctness is the first obligation. Efficiency comparisons make sense only among algorithms satisfying the same problem specification.'),
    q('The chapter’s warning is a proof discipline rather than a theorem that greed never ', 'works', '.', 'Some later problems have valid greedy algorithms. Each one requires a specific argument showing why its choices are safe.')
  ]);
  deepen('jea-3-4', [
    'The recurrence defines the meaning of every saved value.',
    'Each call must satisfy that same subproblem contract.',
    'Reachability also determines which states need evaluation.',
    'A dependency diagram can reveal a mistaken loop order.',
    'This order is required for correct table values.',
    'Use a distinct marker for states not yet computed.',
    'The representation can add overhead beyond stored answers.',
    'Transitions, not just state count, determine time.',
    'Recursive overhead may be traded for sparse evaluation.',
    'A table lookup stands in for a solved subproblem.',
    'The key must distinguish states with different answers.',
    'Only the start index changes across recursive calls.',
    'Ascending indexes would read answers not yet computed.',
    'It corresponds to the empty remainder after the last word.'
  ]);
  deepen('jea-3-5', [
    'The omitted alternatives are the source of risk.',
    'A valid local choice may be globally useless.',
    'A small constructed example can invalidate the strategy.',
    'Safety must hold under every allowed input.',
    'The recurrence retains paths that greed discards.',
    'First establish correctness, then remove repetition.',
    'That difference explains their distinct proof obligations.',
    'The rest of the sequence constrains the best start.',
    'The proof must address adversarial inputs.',
    'An exchange must preserve feasibility as well as quality.',
    'Correct subproblems are the foundation for optimization.',
    'The suffix condition determines eventual success.',
    'Returning inside the loop abandons other valid candidates.',
    'A fast incorrect method does not solve the problem.',
    'Greedy claims are local to a particular problem structure.'
  ]);
  add('jea-4-1', [
    q('A tape file’s completion position determines how long a request for it ', 'waits', '.', 'Earlier files must be scanned first. Expected access time therefore depends on the order of all files before the requested one.'),
    q('For equally likely files, a shorter file should precede a longer ', 'file', '.', 'Swapping an adjacent inversion reduces the later file’s waiting contribution without worsening earlier unaffected files. Repeated exchanges yield sorted order.'),
    q('An exchange argument improves a proposed order by swapping adjacent ', 'files', '.', 'If the swap cannot increase cost, an optimum can be transformed into the greedy order. This proves more than intuition.'),
    q('With access weights, expected tape cost is a weighted sum of completion ', 'times', '.', 'A frequent file contributes more to the objective. Its position may justify placing it earlier despite its length.'),
    q('For weighted files, pairwise comparison uses length divided by access ', 'frequency', '.', 'The shorter ratio should precede the larger one under positive frequencies. The adjacent swap calculation establishes the ordering rule.'),
    q('A greedy sorting rule requires a proof that every adjacent inversion can be ', 'removed', '.', 'Show the swap preserves feasibility and does not increase expected cost. Then an optimal order can be made greedy.'),
    q('The cost of an arrangement includes time spent reading all preceding ', 'files', '.', 'A file’s own length affects its completion time, but its placement also delays all later requests. That external effect drives the rule.'),
    q('If two files have equal length, swapping them leaves equal-frequency average cost ', 'unchanged', '.', 'The adjacent swap difference is zero. Their relative order is irrelevant under the equal-probability version.'),
    q('A long frequently requested file can precede a short rarely requested ', 'file', '.', 'Weighted access changes the objective. Compare ratios rather than length alone to determine whether the swap helps.'),
    q('The exchange proof converts a local swap rule into a global ', 'optimality', ' result.', 'Any nongreedy arrangement contains an adjacent inversion. Removing inversions without increasing cost eventually reaches the greedy order.'),
    q('A sorted order can be found in O(n log n) comparison ', 'time', '.', 'Once the exchange rule identifies the correct key, a standard comparison sort constructs the schedule efficiently.'),
    q('The prefix sum of file lengths gives the access time of the current ', 'file', '.', 'Every file before it must be read. Updating the cumulative length lets the total objective be computed in one pass.'),
    q('The proof assumes the tape is searched from its beginning for each ', 'request', '.', 'If random access or caching changes the cost model, the same ordering objective and exchange rule may not apply.'),
    q('These lengths should be stored shortest first under equal request ', 'frequency', '.', 'The adjacent exchange argument shows that a longer file before a shorter one cannot improve average completion time.', { code: 'lengths = [9, 2, 5]\norder = sorted(lengths)' })
  ]);

  add('jea-4-4', [
    q('A prefix-free code can be decoded without a separate delimiter between ', 'codewords', '.', 'No valid codeword is the beginning of another. The decoder knows when a leaf has been reached in the code tree.'),
    q('A character’s codeword corresponds to a root-to-leaf ', 'path', '.', 'Left and right edges can represent bits. Its depth gives the number of bits used for that character.'),
    q('The objective sums each frequency times its codeword ', 'length', '.', 'Common characters contribute often, so placing them shallower can reduce total encoded size.'),
    q('Two least frequent symbols can be siblings in some optimal ', 'tree', '.', 'The exchange argument moves low-weight leaves to deepest sibling positions without increasing weighted path length.'),
    q('Huffman’s merge replaces two symbols with one combined ', 'weight', '.', 'The combined node represents a subtree containing both symbols. Its frequency is the sum of their frequencies.'),
    q('The recursive smaller instance contains one fewer active ', 'symbol', '.', 'After merging a pair, solve the reduced coding problem. Expanding the merged node reconstructs a tree for the original symbols.'),
    q('Each merged symbol later becomes an internal tree ', 'node', '.', 'The two chosen symbols become its children. Repeating merges yields a full prefix-code tree.'),
    q('A priority queue can repeatedly extract the two smallest ', 'frequencies', '.', 'A min-heap supports each extraction and reinsertion in logarithmic time, giving an efficient implementation.'),
    q('Equal frequencies may allow several optimal Huffman ', 'trees', '.', 'Tie choices can change individual bit patterns while preserving the minimum total weighted length.'),
    q('A frequent symbol usually receives a shorter path because that saves more ', 'bits', '.', 'One bit saved on a frequent character contributes more to the objective than one bit saved on a rare character.'),
    q('The code tree must put symbols at leaves to maintain prefix ', 'freedom', '.', 'If a symbol occupied an ancestor of another symbol, its codeword would prefix the descendant’s codeword.'),
    q('Merging the two rarest symbols is a greedy choice backed by an exchange ', 'proof', '.', 'Local frequency alone is not the entire argument. The proof shows an optimum exists with those symbols as deepest siblings.'),
    q('This heap operation selects the next pair with minimum combined ', 'frequency', '.', 'Huffman’s construction repeatedly removes the two lightest active trees and reinserts their merged parent.', { code: 'a = heappop(heap)\nb = heappop(heap)\nheappush(heap, (a.weight + b.weight, a, b))' })
  ]);

  add('jea-4-5', [
    q('A blocking pair consists of two people who prefer each other to their assigned ', 'partners', '.', 'Their mutual preference makes a matching unstable. Stability requires that no such pair exist.'),
    q('A tentative match can change when a receiver gets a more preferred ', 'proposal', '.', 'The receiver keeps the best proposal seen so far. The rejected proposer continues down their preference list.'),
    q('A rejected proposer never needs to propose to the same receiver ', 'again', '.', 'That receiver already has or later gets someone preferred. The proposer cannot form a blocking pair with them in the final matching.'),
    q('Each proposal advances one position in a proposer’s preference ', 'list', '.', 'No pair is proposed twice. With n participants per side, at most n squared proposals occur.'),
    q('Termination follows because the number of possible distinct proposals is ', 'finite', '.', 'Every iteration makes a new proposal and none repeat. The algorithm must eventually stop.'),
    q('A receiver’s tentative partner can only improve in their preference ', 'order', '.', 'They replace the current choice only with a more preferred proposer. This monotonicity is central to the stability proof.'),
    q('A final blocking pair would imply one proposer preferred that receiver and proposed ', 'earlier', '.', 'The receiver would have rejected that proposer for someone at least as preferred as the final partner, yielding a contradiction.'),
    q('Stable matching optimizes absence of blocking pairs, not total pair ', 'count', '.', 'Maximum bipartite matching asks how many edges can be selected. Preferences and stability define a different objective.'),
    q('The proposing side receives its best stable partner under the standard proposal ', 'algorithm', '.', 'The result is proposer-optimal among stable matchings under complete strict preferences, though it need not optimize the receiving side.'),
    q('A receiver may be temporarily unmatched until their first ', 'proposal', '.', 'Tentative engagements evolve during the algorithm. Final stability is assessed only after proposals stop.'),
    q('An arbitrary swap of a blocking pair lacks a monotone progress ', 'measure', '.', 'It can create new blocking pairs or undo earlier repairs. The structured proposal process has a termination and stability proof.'),
    q('The algorithm assumes participants provide an ordered preference ', 'list', '.', 'The next proposal is defined by that ordering. Ties or incomplete lists require an adapted model and proof.'),
    q('A proposer who is rejected continues with the next untried ', 'receiver', '.', 'This preserves the invariant that every more preferred receiver has already declined or passed them over.'),
    q('The code keeps the receiver’s preferred tentative ', 'partner', '.', 'A better proposal replaces the old one; the displaced proposer becomes free. That monotone choice supports the stability argument.', { code: 'if prefers(receiver, new_proposer, current):\n    engaged[receiver] = new_proposer\n    free.add(current)' })
  ]);
  add('jea-7-2', [
    q('A spanning tree connects all vertices while containing no ', 'cycle', '.', 'For a connected graph, it uses exactly one fewer edge than vertices. A minimum spanning tree minimizes the sum of those edge weights.'),
    q('A growing forest can be completed to an MST if every selected edge is ', 'safe', '.', 'This is the extension invariant. Each step must preserve the existence of some optimal tree containing the chosen edges.'),
    q('An edge within one forest component would create a ', 'cycle', '.', 'Its endpoints are already connected by selected edges. Adding it cannot help the forest remain an acyclic subset of an MST.'),
    q('A cut separates vertices into two disjoint ', 'sides', '.', 'An edge crossing that cut has one endpoint on each side. The cut property identifies safe light edges.'),
    q('A minimum-weight edge crossing an appropriate cut is ', 'safe', '.', 'If an MST omits it, exchange it for a crossing edge on the cycle that its addition creates, without increasing weight.'),
    q('The exchange proof adds a candidate edge and creates one ', 'cycle', '.', 'The cycle must contain another edge crossing the cut. Removing that edge restores a spanning tree while preserving or improving weight.'),
    q('A light crossing edge is not necessarily the globally lightest edge in the whole ', 'graph', '.', 'The cut property compares only edges across the chosen cut. This local condition is enough for safety.'),
    q('Distinct edge weights guarantee the minimum spanning tree is ', 'unique', '.', 'With ties, multiple MSTs can have the same total weight. The cut safety statement still works with minimum-weight crossing edges.'),
    q('A forest component defines a cut between its vertices and the ', 'rest', '.', 'The lightest edge leaving that component can safely connect it to another part of the graph.'),
    q('A disconnected input graph has a minimum spanning ', 'forest', ' rather than one spanning tree.', 'No edge sequence can connect components that lack graph paths. The optimization is applied separately to each connected component.'),
    q('Greedy MST methods rely on a proof that selected edges remain extendable to an ', 'optimum', '.', 'Picking low weights alone is insufficient if an edge creates a cycle. The forest and cut invariants justify each addition.'),
    q('If a candidate crossing edge is lighter than the MST edge it replaces, the old tree was not ', 'minimum', '.', 'The exchange lowers total weight while retaining connectivity. This contradiction establishes the safety of a light crossing edge.'),
    q('A connected graph’s spanning tree has exactly V minus one ', 'edges', '.', 'Any fewer cannot connect all vertices, and any more in a connected subgraph creates a cycle. This bounds MST selection steps.'),
    q('This test rejects an edge whose endpoints already share a forest ', 'component', '.', 'Adding that edge would close a cycle. A union-find structure can answer whether the endpoints are currently connected.', { code: 'if find(u) != find(v):\n    add_edge(u, v)\n    union(u, v)' })
  ]);

  add('jea-7-4', [
    q('Jarník’s method grows one connected tree rather than several forest ', 'components', '.', 'It starts at any vertex and repeatedly connects one outside vertex with the cheapest edge leaving the current tree.'),
    q('The eligible edge at each step crosses the cut around the current ', 'tree', '.', 'One endpoint is already selected and the other is outside. The cut property makes the cheapest such edge safe.'),
    q('A priority queue orders candidate edges by their ', 'weight', '.', 'Extracting the minimum gives the next promising crossing edge. Some stored candidates may become stale as the tree grows.'),
    q('A stale edge whose endpoints are both inside the tree should be ', 'discarded', '.', 'It no longer crosses the current cut and would form a cycle. The queue can hold it until extraction.'),
    q('The algorithm can start at any vertex because the cut property holds for any initial ', 'singleton', '.', 'The first selected set contains one vertex. Repeated safe edges eventually connect all vertices of a connected graph.'),
    q('Adding a crossing edge preserves the chosen subgraph as a ', 'tree', '.', 'It brings one new vertex into a connected acyclic structure. No cycle can arise when the new endpoint was outside.'),
    q('The selected tree grows by one vertex per accepted ', 'edge', '.', 'The crossing edge connects an outside vertex. For V vertices, the algorithm accepts V minus one edges.'),
    q('An edge queue may contain several offers for one outside ', 'vertex', '.', 'Later offers can be cheaper or become stale. The implementation must check current membership when extracting candidates.'),
    q('A vertex-key implementation stores the cheapest known edge entering each outside ', 'vertex', '.', 'Updating that key can avoid storing all crossing edges. The cut argument still justifies choosing the minimum key.'),
    q('The algorithm stops when every reachable vertex has joined the ', 'tree', '.', 'In a connected graph this includes all vertices. In a disconnected graph, a new start is needed for another component.'),
    q('A negative edge weight does not invalidate the MST cut ', 'proof', '.', 'The exchange compares weights, not signs. The algorithm still chooses a minimum crossing edge at each step.'),
    q('The priority queue does not itself prove MST ', 'correctness', '.', 'It implements the minimum-edge selection. The safety proof comes from the cut property and maintained tree invariant.'),
    q('A chosen edge’s safety is relative to the current selected ', 'set', '.', 'The cut changes as vertices join the tree. Recompute or update eligible crossing edges after each accepted step.'),
    q('This check discards a candidate whose destination already belongs to the ', 'tree', '.', 'Such an edge is no longer crossing. Accepting it could create a cycle and violate the growing-tree invariant.', { code: 'weight, u, v = heappop(edges)\nif v in tree: continue\ntree.add(v)' })
  ]);

  add('jea-5-5', [
    q('Whatever-first search explores a graph from one start ', 'vertex', '.', 'The choice of bag policy changes the order, but every reachable vertex is eventually considered under the search rules.'),
    q('The bag holds candidates that have been discovered but not yet ', 'processed', '.', 'Removing a candidate exposes its outgoing edges. Marking policy determines how duplicates are handled.'),
    q('A visited marker prevents processing the same vertex ', 'repeatedly', '.', 'Cycles and multiple incoming edges can place a vertex in the bag more than once. The marker avoids duplicate exploration.'),
    q('A parent pointer records the discovery edge for a ', 'vertex', '.', 'Following parent pointers back from a discovered vertex reconstructs a path to the start.'),
    q('The parent edges form a tree over the reachable ', 'component', '.', 'Each nonroot visited vertex receives one parent when first discovered. These edges connect discovered vertices without a parent cycle.'),
    q('A vertex outside the start component cannot be reached by any search ', 'policy', '.', 'No path exists from the start. Changing bag order affects traversal order, not the underlying reachability relation.'),
    q('The search invariant is that every visited vertex is reachable from the ', 'start', '.', 'The root is reachable by a length-zero path. Each new vertex is reached by extending its parent’s path.'),
    q('Completeness follows when every edge leaving a visited vertex has been ', 'considered', '.', 'If a reachable vertex remained unvisited, the first edge crossing from visited to unvisited on a path would contradict completion.'),
    q('The exact parent tree can vary with the bag removal ', 'order', '.', 'Different policies or neighbor orders discover vertices through different edges. Reachability results remain the same.'),
    q('A bag can be implemented as a stack, queue, or priority ', 'queue', '.', 'The removal rule determines exploration order. The generic search framework separates that policy from reachability logic.'),
    q('For an undirected graph, an edge may add an already visited neighbor to the ', 'bag', '.', 'The processing-time visited check can skip it. Correctness requires a consistent rule for when a vertex is marked.'),
    q('A graph with several components needs a new search start for each unseen ', 'component', '.', 'One traversal reaches only the start’s component. An outer loop over vertices can cover the whole graph.'),
    q('Parent pointers can certify a path from start to any visited ', 'vertex', '.', 'Repeatedly following parents reaches the root. Each pointer corresponds to a real graph edge selected during discovery.'),
    q('This bag policy removes the most recently added candidate ', 'first', '.', 'A stack gives depth-first behavior. The generic reachability argument still depends on processing every reachable neighbor.', { code: 'bag.append(start)\nwhile bag:\n    vertex = bag.pop()' })
  ]);

  add('jea-5-6', [
    q('A stack makes whatever-first search explore one branch ', 'deeply', '.', 'Last-in-first-out removal favors the newest discovered vertex. This yields depth-first search under the generic framework.'),
    q('A queue makes search advance in distance ', 'layers', '.', 'First-in-first-out removal processes earlier discoveries before later ones. In an unweighted graph, this supports shortest paths by edge count.'),
    q('Breadth-first distance counts edges rather than total ', 'weight', '.', 'Every edge contributes one step, regardless of its numerical weight. For weighted paths, a fewer-edge route may have greater total cost.'),
    q('The source is at BFS distance ', 'zero', '.', 'It reaches itself using no edges at all. Neighboring vertices discovered in the first search layer have distance one.'),
    q('The first BFS discovery of a vertex uses a minimum-edge ', 'path', '.', 'All smaller distance layers have already been explored. A shorter path would have discovered the vertex earlier.'),
    q('A DFS tree does not generally certify shortest ', 'paths', '.', 'Depth-first exploration can follow a long route before a direct edge is considered. Its parent chain proves reachability, not minimum distance.'),
    q('The order of neighbors can change a DFS traversal ', 'tree', '.', 'A stack follows whichever neighbor is added or removed first. The reachable set is unchanged but parent edges may differ.'),
    q('A visited marker prevents either search from revisiting a graph ', 'cycle', '.', 'Without it, the traversal could loop indefinitely or process edges repeatedly. Marking maintains finite exploration.'),
    q('A BFS queue contains candidates discovered from current or next distance ', 'layers', '.', 'Its FIFO order ensures no deeper vertex is processed before an undiscovered shallower route has been considered.'),
    q('A priority queue can implement a different whatever-first removal ', 'policy', '.', 'Selecting by key changes exploration order. Correctness of any stronger result, such as minimum weight, needs a separate invariant.'),
    q('The generic framework proves reachability independently of the bag ', 'type', '.', 'Every candidate generated from a visited vertex is eventually processed. Stack and queue choices refine the order and possible path guarantees.'),
    q('BFS runs in time proportional to vertices plus edges with adjacency ', 'lists', '.', 'Each vertex is processed once and each adjacency entry is inspected a bounded number of times under proper marking.'),
    q('A DFS call stack can be replaced with an explicit ', 'stack', '.', 'Both follow last-in-first-out exploration. Iterative code may avoid recursion depth limits while preserving the basic policy.'),
    q('A parent pointer from BFS yields a minimum-edge route to its ', 'vertex', '.', 'The first discovery occurs in the earliest possible layer. Following parents walks back through successively smaller distances.')
  ]);
  deepen('jea-4-1', [
    'The objective counts work before each requested file.',
    'The shorter file imposes less delay on later requests.',
    'That local calculation justifies sorting the full order.',
    'Completion time is the sum of preceding lengths.',
    'The pairwise comparison includes both length and popularity.',
    'The argument applies repeatedly until no inversion remains.',
    'Delays imposed on later files drive the exchange result.',
    'Equal ratios can also permit multiple optimal orders.',
    'Popularity can offset the delay from a longer file.',
    'The proof preserves all files and their request weights.',
    'Evaluating the objective afterward takes only linear time.',
    'This running sum captures every preceding tape segment.',
    'The physical access assumption defines the mathematical objective.',
    'The sorted order removes every harmful adjacent inversion.'
  ]);
  deepen('jea-4-4', [
    'The leaf boundary tells the decoder when to stop.',
    'This tree representation makes prefix freedom visible.',
    'Weighted depth is precisely the total bit count.',
    'That sibling property is the basis of the greedy step.',
    'Their subtree depths increase together by one bit.',
    'The reduced instance supports an induction proof.',
    'Every original symbol remains a leaf in the result.',
    'Each merge reduces the active-heap size by one.',
    'The objective depends on lengths, not assigned bit labels.',
    'Frequency weights each saved bit by occurrence count.',
    'An internal symbol would make decoding ambiguous.',
    'The proof is specific to the weighted-prefix objective.',
    'Heap order makes the greedy operation efficient.'
  ]);
  deepen('jea-4-5', [
    'The pair would prefer to abandon its assignments.',
    'Tentative status allows the later improvement.',
    'Receiver preference can only improve after rejection.',
    'That finite count also bounds running time.',
    'A repeat would invalidate this progress argument.',
    'This monotonicity rules out later blocking pairs.',
    'The contradiction uses both proposal and preference order.',
    'A maximum-cardinality match may still be unstable.',
    'The guarantee depends on the stated preference model.',
    'A later proposal can change that temporary state.',
    'The structured algorithm prevents cycling repairs.',
    'Changing the model requires revisiting the proof.',
    'No preferred option remains untried at that point.',
    'The displaced proposer continues making new proposals.'
  ]);
  add('jea-6-1', [
    q('Preorder records a vertex when DFS first enters its recursive ', 'call', '.', 'That event occurs before exploring its outgoing edges. The timestamp orders first discoveries across the traversal.'),
    q('Postorder records a vertex after DFS has explored all its outgoing ', 'edges', '.', 'Its recursive call is about to return. The timestamp captures completion rather than first discovery.'),
    q('An active vertex remains on the DFS recursion ', 'stack', '.', 'Its call has begun but not returned. Edges to such vertices can reveal ancestor relationships and directed cycles.'),
    q('A descendant’s active interval lies inside its ancestor’s ', 'interval', '.', 'The ancestor call stays active while recursive descendants run. Enter and exit times therefore form nested ranges.'),
    q('Two DFS intervals that are not nested must be ', 'disjoint', '.', 'Recursive calls finish before an unrelated branch begins. Partial overlap cannot arise from well-formed call-stack execution.'),
    q('A vertex with smaller preorder is not necessarily an ', 'ancestor', '.', 'It may have been discovered in a separate completed branch. Interval containment, not preorder alone, identifies ancestry.'),
    q('The DFS forest contains one tree for each new traversal ', 'root', '.', 'DFSAll restarts from unmarked vertices so disconnected or unreachable portions also receive timestamps and parents.'),
    q('Parent pointers record the recursive discovery ', 'edges', '.', 'Each nonroot vertex is first visited through one edge from its parent. Those edges form an acyclic forest.'),
    q('An ancestor is discovered before a descendant and finishes ', 'after', ' it.', 'The ancestor’s recursive call encloses the descendant’s complete call. Both preorder and postorder inequalities follow.'),
    q('A finished vertex has already received its postorder ', 'number', '.', 'It is no longer on the active stack. An edge to it is not automatically evidence of a directed cycle.'),
    q('The interval test for ancestry uses both entry and exit ', 'times', '.', 'A candidate ancestor enters earlier and exits later. Using only one timestamp can confuse unrelated branches.'),
    q('DFSAll is needed when one start vertex cannot reach the entire ', 'graph', '.', 'An outer loop selects another unmarked root. This covers every vertex while each edge is still inspected only a bounded number of times.'),
    q('The time interval for a recursive call closes when that call ', 'returns', '.', 'Every nested child has already finished. The resulting interval structure mirrors the DFS call tree.'),
    q('This exit timestamp is assigned after exploring every ', 'neighbor', '.', 'The placement makes it postorder. Moving the assignment before the loop would record discovery order instead.', { code: 'def dfs(v):\n    for w in graph[v]:\n        if not seen[w]: dfs(w)\n    post[v] = tick()' })
  ]);

  add('jea-6-2', [
    q('A directed back edge points from a DFS vertex to an active ', 'ancestor', '.', 'The recursion stack already contains a path from that ancestor to the current vertex. The edge closes a directed cycle.'),
    q('An edge to a finished vertex does not by itself close a directed ', 'cycle', '.', 'That vertex’s active interval ended. There need not be a path from it back to the current vertex.'),
    q('A DAG has no directed path that returns to its starting ', 'vertex', '.', 'A directed cycle would make some vertex reachable from itself by a positive-length path. Acyclicity rules this out.'),
    q('A source in a directed graph has no incoming ', 'edges', '.', 'In a DAG, at least one source exists. Otherwise repeatedly following incoming edges in a finite graph would produce a cycle.'),
    q('A sink in a directed graph has no outgoing ', 'edges', '.', 'Every finite DAG also has a sink. Repeatedly following outgoing edges would otherwise revisit a vertex and form a cycle.'),
    q('A DFS cycle detector needs to distinguish unseen, active, and ', 'finished', ' vertices.', 'The active state identifies edges to ancestors. A single visited bit cannot distinguish an active target from a completed one.'),
    q('Detecting one back edge is enough to report a directed ', 'cycle', '.', 'The ancestor-to-current DFS path plus the return edge forms a concrete witness. No further search is needed for yes-or-no detection.'),
    q('If DFS finds no edge to an active vertex, the directed graph is ', 'acyclic', '.', 'Every directed cycle would contain an edge returning to an active ancestor under DFS. Its absence excludes cycles.'),
    q('The path on the recursion stack can reconstruct a discovered ', 'cycle', '.', 'When an edge targets an active ancestor, follow stack entries from that ancestor to the current vertex and close the loop.'),
    q('Cycle detection is linear with adjacency lists because each vertex and edge is examined a constant number of ', 'times', '.', 'Status updates are constant time. The DFS scans each adjacency list once under proper marking.'),
    q('A self-loop is a directed cycle of length ', 'one', '.', 'The edge returns from a vertex to itself while that vertex is active. The same back-edge rule detects it.'),
    q('A graph can have a cycle even if the first DFS root cannot ', 'reach', ' it.', 'Run DFS from every unmarked vertex. A cycle in a separate component or unreachable region must still be considered.'),
    q('An undirected edge back to the parent needs separate handling in cycle ', 'detection', '.', 'The two directions of one undirected edge should not be mistaken for a nontrivial cycle. The directed rule differs.'),
    q('This status check detects an edge returning to the active DFS ', 'stack', '.', 'An active target is an ancestor of the current call. The tree path plus this edge forms a directed cycle.', { code: 'if status[w] == "active":\n    return True' })
  ]);

  add('jea-6-3', [
    q('A topological order places each prerequisite before every task that ', 'depends', ' on it.', 'Represent a dependency as an edge from earlier to later. The order respects every directed edge.'),
    q('A directed cycle makes a topological ordering ', 'impossible', '.', 'Following cycle edges would require each vertex to precede the next, eventually requiring one vertex to precede itself.'),
    q('Reversed DFS postorder is topological only for a ', 'DAG', '.', 'Without cycles, a vertex finishes after every reachable descendant. Reversing completion order places each edge’s tail before its head.'),
    q('A DAG always has at least one vertex of indegree ', 'zero', '.', 'Otherwise following incoming edges indefinitely in a finite graph would revisit a vertex, contradicting acyclicity.'),
    q('Kahn’s algorithm repeatedly removes a zero-indegree ', 'vertex', '.', 'It emits a currently ready task and decreases indegrees of its outgoing neighbors. A remaining cycle prevents further removal.'),
    q('Multiple zero-indegree vertices can yield several valid topological ', 'orders', '.', 'Unrelated tasks need not have a fixed relative order. Any choice that preserves all edge constraints is valid.'),
    q('A topological order can be used to evaluate a DAG recurrence in dependency ', 'order', '.', 'When edges point from prerequisite to dependent state, each needed value is available before its consumer is processed.'),
    q('A topological sort must account for every vertex, including isolated ', 'vertices', '.', 'An isolated task has no constraints but still belongs in the output. DFSAll or a full indegree initialization covers it.'),
    q('If a topological procedure emits fewer than V vertices, a directed cycle may ', 'remain', '.', 'The unprocessed subgraph has no zero-indegree vertex. In a finite graph that implies a cycle.'),
    q('The order is a linear arrangement satisfying a partial order of ', 'dependencies', '.', 'The graph states only required precedence pairs. The list chooses one total order consistent with those constraints.'),
    q('For an edge u to v, u must appear before ', 'v', '.', 'That is the defining condition. A single reversed edge invalidates an otherwise plausible task schedule.'),
    q('A DFS exit order must be reversed before it becomes a topological ', 'order', '.', 'DFS completes descendants before their ancestors. The reverse places sources and prerequisites ahead of their dependents.'),
    q('A cycle detector can reject invalid input before using a topological ', 'schedule', '.', 'Without acyclicity, some tasks depend on themselves indirectly. Returning an arbitrary list would hide an impossible schedule.'),
    q('This queue starts with tasks having no outstanding ', 'prerequisites', '.', 'Their indegree is zero, so they can be emitted immediately. Processing one may make additional tasks ready.', { code: 'ready = deque(v for v in vertices if indegree[v] == 0)' })
  ]);
  deepen('jea-6-1', [
    'Discovery precedes any descendant’s entry event.',
    'This is the last event of that call.',
    'The call-stack position gives this state its meaning.',
    'Nested calls produce nested time intervals.',
    'Both inequalities are needed for the ancestry test.',
    'An earlier sibling can have smaller preorder too.',
    'Each new root begins another DFS tree.',
    'They are distinct from non-tree graph edges.',
    'The call stack forces this ordering.',
    'Finished status differs from active status.',
    'Compare the whole active interval.',
    'The outer scan prevents missing separate components.',
    'The exit event follows all descendant exits.',
    'The loop must finish before postorder is recorded.'
  ]);
  add('jea-6-5', [
    q('Strong connectivity requires directed paths in both ', 'directions', '.', 'A one-way route establishes reachability but not mutual reachability. Both routes are needed for two vertices to share an SCC.'),
    q('Strong connectivity is an equivalence relation because it is reflexive, symmetric, and ', 'transitive', '.', 'The equivalence classes partition the vertices. Each class is one maximal strongly connected component.'),
    q('An SCC is maximal under mutual ', 'reachability', '.', 'Adding any outside vertex would break the property. A small strongly connected subset need not be a whole component.'),
    q('The condensation graph contracts each SCC to one ', 'vertex', '.', 'Edges between components remain. It summarizes how components can reach one another without internal cycles.'),
    q('The condensation graph cannot contain a directed ', 'cycle', '.', 'A cycle of components would make all vertices on it mutually reachable, contradicting that they were separate SCCs.'),
    q('A DAG has singleton strong ', 'components', '.', 'Any SCC with multiple vertices would contain directed routes both ways and therefore a cycle. Conversely, an acyclic graph cannot have such a component.'),
    q('A directed graph is strongly connected exactly when it has one ', 'SCC', '.', 'Every pair then lies in the same mutual-reachability class. More than one class means some pair lacks a path in one direction.'),
    q('Forward search from v finds vertices that v can ', 'reach', '.', 'It establishes only one direction of connectivity. A reverse search is needed to find vertices that can reach v.'),
    q('Searching the reversed graph from v finds vertices that can reach v in the ', 'original', ' graph.', 'Reversing every edge turns original paths into paths from v. This supplies the missing direction for SCC membership.'),
    q('The intersection of forward and reverse reachability yields v’s ', 'component', '.', 'Every vertex in both sets can reach v and be reached from v. Those vertices form exactly the SCC containing v.'),
    q('Repeating two graph searches for every component can exceed linear ', 'time', '.', 'Each search scans much of the graph. A more structured DFS-based algorithm reuses global ordering information.'),
    q('A source SCC has no incoming edges in the condensation ', 'DAG', '.', 'Other components cannot reach into it directly. The condensation graph permits reasoning with DAG sources and sinks.'),
    q('A sink SCC has no outgoing edges to other ', 'components', '.', 'Starting within it reaches only vertices of that same SCC. This fact underlies a component-removal strategy.'),
    q('The two searches here retain only vertices reachable in both ', 'directions', '.', 'The first search finds v’s outward reach; the reversed search finds original paths into v. Their intersection is one SCC.', { code: 'component = reachable(graph, v) & reachable(reverse(graph), v)' })
  ]);

  add('jea-6-6', [
    q('The earliest-discovered vertex of an SCC is its DFS ', 'root', '.', 'It has no parent inside that component. Every other component vertex is a descendant within the DFS forest.'),
    q('Every SCC forms a connected subtree of the DFS ', 'forest', '.', 'Paths between mutually reachable vertices stay within the SCC. The earliest member becomes ancestor of the rest.'),
    q('The condensation graph of SCCs is always a ', 'DAG', '.', 'A cycle among components would make its vertices mutually reachable, merging them into one component.'),
    q('A sink SCC can reach no vertex in another ', 'SCC', '.', 'Any outgoing component edge would contradict its sink status. A search from one of its vertices remains inside it.'),
    q('Kosaraju-Sharir first runs DFS on the edge-reversed ', 'graph', '.', 'The finishing order from that traversal identifies a useful order for searching the original graph.'),
    q('The second pass considers vertices in reverse finishing ', 'order', '.', 'Using the reversed graph’s postorder makes each new traversal of the original graph stay within one SCC.'),
    q('Reversing the graph swaps source and sink ', 'components', '.', 'An incoming component edge becomes outgoing and vice versa. The algorithm exploits this relation to find sink SCCs of the original.'),
    q('The last finished vertex in a DFS of a graph lies in a source ', 'component', '.', 'A hypothetical incoming edge from another component would contradict the DFS ordering argument given in the chapter.'),
    q('The last finished vertex of the reversed graph lies in an original sink ', 'component', '.', 'Sources of the reversed condensation graph correspond to sinks of the original. Starting there isolates one component.'),
    q('Finishing order of reversed G is not generally the same as finishing order of ', 'G', '.', 'Reversing edges changes DFS reachability and traversal structure. Using the wrong order invalidates the second-pass argument.'),
    q('Each vertex is labeled by exactly one second-pass ', 'traversal', '.', 'That traversal discovers one SCC. Marking prevents later passes from relabeling already assigned vertices.'),
    q('Two DFS passes and graph reversal take O(V+E) ', 'time', '.', 'Each pass scans each vertex and edge only a bounded number of times. Constructing reverse adjacency lists is also linear.'),
    q('The SCC root is the component vertex with earliest DFS ', 'start', '.', 'The lemma shows it is the only vertex without a parent inside the component, giving a structural anchor.'),
    q('This first pass saves vertices when DFS ', 'finishes', '.', 'The resulting stack represents postorder of the reversed graph. Popping it controls the second pass on the original.', { code: 'dfs_all(reverse_graph, on_exit=lambda v: finish_stack.append(v))' })
  ]);

  add('jea-6-exercises', [
    q('A DFS tree edge first discovers an unvisited ', 'vertex', '.', 'The discovered vertex receives the current vertex as parent. These edges create the spanning forest of the search.'),
    q('An edge to an active ancestor is a back ', 'edge', '.', 'The active recursion stack contains a path from that ancestor to the current vertex, so a directed back edge witnesses a cycle.'),
    q('A finished target does not provide the same cycle ', 'witness', '.', 'Its call has returned, so it is not on the current ancestor path. Additional reachability information would be required.'),
    q('A directed cycle prevents a valid topological ', 'order', '.', 'The cycle’s precedence constraints would force a vertex before itself. Reject the graph or report the cycle.'),
    q('A DAG’s reverse postorder respects every directed ', 'edge', '.', 'In the absence of back edges, DFS finishing relationships put each predecessor before its successor after reversal.'),
    q('DFSAll covers vertices unreachable from the first ', 'root', '.', 'The outer loop launches a new traversal from every still-unmarked vertex. This matters for disconnected directed graphs.'),
    q('Preorder and postorder intervals can test whether one vertex is an ', 'ancestor', '.', 'An ancestor starts earlier and finishes later than its descendant. Comparing both timestamps avoids confusion with other branches.'),
    q('A full graph traversal can be linear if each adjacency list is scanned ', 'once', '.', 'Constant work per vertex and edge yields O(V+E). Repeated full scans would lose that bound.'),
    q('Contracting SCCs creates an acyclic graph even if the original graph has ', 'cycles', '.', 'Every internal cycle stays inside a component. A cycle among components would merge them into one SCC.'),
    q('A vertex can be reachable from the start without reaching the start ', 'back', '.', 'One-way reachability is insufficient for strong connectivity. Search the reverse graph to test the other direction.'),
    q('A zero-indegree vertex can begin a topological ', 'ordering', '.', 'No edge requires another remaining vertex before it. Removing it may expose new ready vertices.'),
    q('A DFS parent path certifies ordinary ', 'reachability', '.', 'Every parent pointer corresponds to a graph edge. Following them back reaches the traversal root.'),
    q('This condition identifies an edge to a currently active ', 'ancestor', '.', 'The recursion stack supplies the forward path; the edge returns to an earlier vertex and closes a directed cycle.', { code: 'if color[v] == "gray":\n    report_cycle()' }),
    q('A completed DFS call receives its postorder number after its descendants ', 'finish', '.', 'That order makes reverse postorder useful for scheduling tasks in a DAG.'),
    q('A DFS algorithm that marks vertices late can accidentally process one vertex ', 'repeatedly', '.', 'Choose a consistent discovery or removal rule. Marking controls duplicate work and supports the claimed linear running time.')
  ]);
  deepen('jea-6-5', [
    'Direction is essential in this graph property.',
    'The partition follows from those three relation properties.',
    'Maximality distinguishes a component from a subset.',
    'Internal cycles disappear inside contracted vertices.',
    'The supposed cycle contradicts maximal SCC membership.',
    'Singleton self-loops are excluded in a DAG.',
    'One component contains the entire vertex set.',
    'Forward reach alone cannot certify an SCC.',
    'Every reversed path corresponds to an original backward path.',
    'Both reachability directions are explicitly required.',
    'The next section avoids that repeated work.',
    'Condensation order can begin at such a source.',
    'A search from this component cannot escape it.',
    'The intersection enforces mutual reachability exactly.'
  ]);
  deepen('jea-6-6', [
    'The proof uses earliest preorder inside the component.',
    'This is a structural consequence of mutual reachability.',
    'Condensation supports source-and-sink arguments.',
    'Its outgoing reach is exactly itself.',
    'The direction of this first pass matters.',
    'The reversed order isolates components during discovery.',
    'This reversal turns an easier source into a sink.',
    'This is the ordering lemma used in the algorithm.',
    'The original direction is used in pass two.',
    'These orders cannot be interchanged casually.',
    'No vertex needs another second-pass assignment.',
    'The two traversals preserve a linear bound.',
    'It is not necessarily a DFS forest root.',
    'Finishing events establish the needed component order.'
  ]);
  add('jea-8-3', [
    q('A tentative distance starts as an upper bound on the true shortest-path ', 'distance', '.', 'It represents the length of a known walk or infinity. Relaxation can only improve that bound, never increase it.'),
    q('An edge u to v is tense when dist[u] plus its weight is less than ', 'dist[v]', '.', 'The route through u offers a shorter known path to v. Relaxing the edge replaces the old overestimate.'),
    q('Relaxing an edge updates the head vertex’s tentative ', 'distance', '.', 'The new value equals the known route to the tail plus the edge weight. Its parent may also change.'),
    q('A parent pointer on relaxation records the predecessor of the improved ', 'path', '.', 'Following parents can reconstruct a shortest route after distances stabilize, subject to the algorithm’s conditions.'),
    q('Relaxation never makes a finite tentative distance ', 'larger', '.', 'It updates only when a strictly shorter route is found. This monotonicity is a useful invariant for reasoning about the process.'),
    q('A reachable negative cycle permits walks of arbitrarily low ', 'weight', '.', 'Repeating the cycle keeps reducing path length. A finite shortest-path value to reachable descendants therefore may not exist.'),
    q('An unreachable vertex retains tentative distance ', 'infinity', '.', 'No path from the source has been discovered or exists. Relaxation from reachable vertices cannot create a path across a missing connection.'),
    q('When no edge is tense, every reachable distance label is ', 'optimal', '.', 'The labels satisfy all edge inequalities while corresponding to actual paths. Any supposedly shorter path would contradict one of those inequalities.'),
    q('Choosing which tense edge to relax changes the algorithm’s ', 'schedule', '.', 'Different methods use different selection orders. The relaxation rule itself remains the same, while efficiency and termination arguments vary.'),
    q('A zero-weight edge can still be tense if it improves the destination’s ', 'label', '.', 'The edge weight alone does not decide tension. Compare the full route through its tail against the current destination estimate.'),
    q('A positive edge is not tense when its proposed route is no ', 'shorter', '.', 'Relaxation should leave the existing label intact. Replacing it with a worse route would violate the upper-bound improvement invariant.'),
    q('A shortest-path proof must account for every edge on a claimed better ', 'route', '.', 'If all edge inequalities hold, chaining them along the route bounds its weight below by the final label, ruling out improvement.'),
    q('The generic algorithm may repeatedly relax edges until none remains ', 'tense', '.', 'With a reachable negative cycle, improvements can continue indefinitely. The no-negative-cycle assumption is crucial for finite shortest paths.'),
    q('A path through u improves v only when this inequality is ', 'strict', '.', 'The candidate dist[u] plus edge weight must beat the current label. The code then updates both distance and predecessor.', { code: 'if dist[u] + w[u, v] < dist[v]:\n    dist[v] = dist[u] + w[u, v]' })
  ]);

  add('jea-9-5', [
    q('All-pairs shortest paths stores a distance for every ordered source-target ', 'pair', '.', 'A directed graph can have different distances from u to v and from v to u. The table therefore distinguishes order.'),
    q('A naive predecessor recurrence can recurse around a directed ', 'cycle', '.', 'Without a decreasing parameter, a subproblem may depend on itself. Bounding path length makes the recurrence well founded.'),
    q('The state dist(u,v,l) permits paths using at most l ', 'edges', '.', 'The edge limit is the progress measure. Each recursive dependency uses l minus one, so evaluation terminates.'),
    q('The zero-edge base case has distance zero only when source equals ', 'target', '.', 'Staying at one vertex uses no edges. Reaching a different vertex needs at least one edge, so its value is infinity.'),
    q('One recurrence branch keeps the best path with at most l minus one ', 'edges', '.', 'The optimal path may not use the newly allowed edge. Retaining the old answer prevents the value from becoming worse.'),
    q('The other recurrence branch appends one final edge to a shorter ', 'path', '.', 'Try every predecessor of the destination. The prefix uses at most l minus one edges, then the chosen edge completes the route.'),
    q('Without negative cycles, a shortest path can be chosen with at most V minus one ', 'edges', '.', 'Any repeated vertex forms a cycle that can be removed without increasing cost. A simple path visits each vertex once.'),
    q('An unreachable pair keeps distance ', 'infinity', '.', 'No sequence of allowed edges connects the vertices. The minimum over nonexistent candidate routes remains infinite.'),
    q('The bottom-up table grows the allowed edge count by ', 'one', ' per layer.', 'Layer l depends only on layer l minus one. Filling in that order satisfies the recurrence’s dependencies.'),
    q('The straightforward all-pairs recurrence can cost O(V²E) ', 'time', '.', 'For each of V path-length layers and V sources, candidate final edges are considered across the graph.'),
    q('In-place relaxation can remove the explicit edge-count ', 'dimension', '.', 'The chapter derives a version interleaving Bellman-Ford runs from every source. Correctness still relies on repeated edge scans.'),
    q('Negative edges are allowed when there is no reachable negative ', 'cycle', '.', 'A negative edge can improve a path. The absence of negative cycles ensures meaningful finite shortest distances for reachable pairs.'),
    q('A path with no route between its endpoints cannot be represented by a finite ', 'number', '.', 'Infinity acts as the sentinel. Adding an edge to an unreachable prefix must still leave that candidate unusable.'),
    q('This base initialization assigns zero only to the diagonal ', 'entries', '.', 'A path from a vertex to itself needs no edges. All distinct pairs begin as unreachable with zero allowed edges.', { code: 'dist[u][v][0] = 0 if u == v else INF' })
  ]);

  add('jea-9-6', [
    q('The divide-and-conquer recurrence splits a bounded path at a middle ', 'vertex', '.', 'Try each possible midpoint and combine shortest half-paths. Both halves use at most half the allowed edges.'),
    q('A one-edge path bound is the base case because it has no internal ', 'midpoint', '.', 'Initialize from direct edge weights, including zero self-edges. Larger bounds can then be formed by combining two halves.'),
    q('The path-edge allowance doubles from one layer to the ', 'next', '.', 'Each new layer combines two paths from the previous layer. After logarithmically many layers, it covers simple shortest paths.'),
    q('The recurrence tries every possible middle vertex x between u and ', 'v', '.', 'The best path may pass through any vertex at the split. Taking the minimum over x preserves all candidates.'),
    q('Using powers of two avoids fractional edge ', 'limits', '.', 'The recurrence halves the allowed count at each step. Starting at one and doubling keeps every subproblem parameter integral.'),
    q('A power-of-two edge limit at least V minus one suffices without negative ', 'cycles', '.', 'A shortest simple path uses no more than V minus one edges. A slightly larger bound does not improve it further.'),
    q('There are logarithmically many edge-bound ', 'layers', '.', 'Repeated doubling reaches at least V minus one after about log₂ V steps, rather than V separate one-edge increments.'),
    q('Each layer considers every source, target, and middle ', 'vertex', '.', 'Three vertex choices give cubic work per layer. Multiplying by logarithmically many layers yields O(V³ log V).'),
    q('The min-plus recurrence replaces multiplication with addition and addition with ', 'minimum', '.', 'Combining half-path lengths adds costs; choosing the best midpoint takes a minimum. This resembles matrix multiplication over different operations.'),
    q('A missing direct edge begins with weight ', 'infinity', '.', 'It cannot form a finite one-edge path. Later layers may find a route through intermediate vertices.'),
    q('A zero self-edge lets a shorter path fit an at-most edge ', 'bound', '.', 'Padding with a zero-cost stay allows the split recurrence to represent paths using fewer edges than the maximum.'),
    q('The three-dimensional table can be reduced to quadratic ', 'space', '.', 'The chapter describes an in-place update variant. Only pair distances are retained rather than every path-bound layer.'),
    q('The recurrence differs from repeated single-source edge ', 'relaxation', '.', 'Its inner operation combines two already bounded path distances at a middle vertex, rather than appending one graph edge.'),
    q('This update tries x as the middle ', 'vertex', '.', 'The sum combines two bounded half-paths. Minimizing across x produces the best route for the doubled edge allowance.', { code: 'next_dist[u][v] = min(prev[u][x] + prev[x][v] for x in vertices)' })
  ]);
  deepen('jea-9-5', [
    'Each source defines its own row of distances.',
    'Cycles remove the needed decrease in the recursion.',
    'The bound makes recursive progress explicit.',
    'This is the direct zero-length path.',
    'At-most bounds must retain shorter-path options.',
    'Every nonempty path has a final edge.',
    'This upper limit makes the final layer sufficient.',
    'No path can be created by arithmetic alone.',
    'The layers follow a straightforward dependency order.',
    'Dense graphs make that bound especially large.',
    'Every source still needs its own distance row.',
    'Negative edges alone do not invalidate the recurrence.',
    'Sentinels must remain distinct from finite weights.',
    'The diagonal represents paths of zero cost.'
  ]);
  deepen('jea-9-6', [
    'The midpoint ranges over the whole vertex set.',
    'The base table represents direct connections.',
    'Doubling replaces a linear number of edge layers.',
    'The minimum is over all possible split points.',
    'Each halving now returns an integer edge count.',
    'No longer simple route can improve the answer.',
    'This reduces the number of DP stages.',
    'The midpoint loop is the cubic factor.',
    'This is often called distance-matrix multiplication.',
    'Later stages may connect indirectly through intermediates.',
    'Padding preserves paths shorter than the bound.',
    'Careful update ordering is needed for the in-place form.',
    'The recurrence combines paths rather than edges.',
    'Every midpoint supplies one candidate combined route.'
  ]);
  add('jea-10-0', [
    q('A flow network represents transport through directed edges with limited ', 'capacity', '.', 'The model applies to commodities, assignments, or paths. Feasibility requires respecting every edge limit and conserving flow at intermediate vertices.'),
    q('The source is where the modeled flow enters the ', 'network', '.', 'Its net outgoing amount defines the flow value. The sink receives the corresponding net amount under conservation elsewhere.'),
    q('The sink is where flow leaves the modeled ', 'network', '.', 'The objective asks how much can reach it from the source while every capacity and balance constraint holds.'),
    q('A bottleneck edge can cap every source-to-sink ', 'route', '.', 'If all feasible routes cross a small-capacity cut, total flow cannot exceed that cut’s capacity, however large other edges are.'),
    q('A feasible flow must satisfy capacity and conservation ', 'constraints', '.', 'An arbitrary assignment of numbers to edges is not enough. Internal vertices cannot create or destroy the modeled commodity.'),
    q('The zero assignment is always a feasible ', 'flow', '.', 'It violates no nonnegative capacity limit and balances every internal vertex. It provides a baseline, though not usually the maximum.'),
    q('Flow value is measured as net output from the ', 'source', '.', 'Incoming flow to the source is subtracted from outgoing flow. Conservation makes this equal the net input at the sink.'),
    q('Maximizing each edge independently can violate flow ', 'conservation', '.', 'Sending capacity on an outgoing edge requires enough inflow at its tail. A feasible solution must coordinate the whole network.'),
    q('A directed edge carries flow only in its specified ', 'direction', '.', 'Residual reversal later permits canceling previous assignments; it does not mean the original capacity points both ways.'),
    q('Capacities can encode resource limits in another optimization ', 'problem', '.', 'A reduction is correct only if feasible flows correspond to valid original solutions and the flow value matches the objective.'),
    q('A maximum-flow algorithm must return a feasible flow with greatest possible ', 'value', '.', 'Feasibility and optimality are separate obligations. A cut can certify that no larger feasible value exists.'),
    q('A zero-capacity edge cannot carry positive ', 'flow', '.', 'Its upper bound is zero. The edge may be omitted from useful source-to-sink routes, though reverse residual behavior depends on assignments.'),
    q('An internal vertex’s inflow equals its ', 'outflow', '.', 'Conservation prevents flow from appearing or disappearing inside the network. Only source and sink have nonzero net balance.'),
    q('An s-to-t path with capacity three can carry at most ', 'three', ' units.', 'The smallest edge capacity along the path limits its usable amount. Other paths may allow additional total flow.'),
    q('This network edge’s capacity limits flow to at most ', 'five', ' units.', 'The number is an upper bound for this edge alone. Total network flow also depends on other capacities and conservation.', { code: 'capacity[("source", "a")] = 5' })
  ]);

  add('jea-10-1', [
    q('A feasible edge flow lies between zero and its ', 'capacity', '.', 'Both the nonnegativity and upper-bound constraints apply to each directed edge. A numerical assignment outside them is invalid.'),
    q('An internal vertex must conserve incoming and outgoing ', 'flow', '.', 'The amounts must balance at that vertex. This rule links edge choices and prevents artificial creation of flow.'),
    q('The flow value is source outflow minus source ', 'inflow', '.', 'Gross outgoing traffic can overstate the amount delivered when edges return to the source. Net flow is the relevant quantity.'),
    q('Conservation implies net source outflow equals net sink ', 'inflow', '.', 'Summing balance equations cancels internal edge contributions. What leaves the source must eventually be absorbed by the sink.'),
    q('A circulation can move around a cycle without changing flow ', 'value', '.', 'Its net contribution at source and sink is zero. Feasible edge assignments may contain such cycles.'),
    q('Capacity is an upper bound rather than an obligation to send that ', 'amount', '.', 'An edge may carry less than its limit or nothing. The optimization chooses amounts to maximize net source-to-sink delivery.'),
    q('A flow assignment should be checked at every internal ', 'vertex', '.', 'Satisfying edge capacities alone does not establish feasibility. One unbalanced intermediate vertex invalidates the flow.'),
    q('A source-to-sink path can support flow no greater than its narrowest ', 'edge', '.', 'Every edge on that path must carry the same path contribution. The minimum capacity therefore limits it.'),
    q('A network with no source-to-sink path has maximum flow ', 'zero', '.', 'Positive flow cannot reach the sink while conservation holds. The all-zero feasible flow is then optimal.'),
    q('Parallel edges can contribute separate amounts subject to their individual ', 'capacities', '.', 'They represent distinct channels between the same vertices. The sum may exceed either edge’s individual capacity.'),
    q('The total value cannot exceed the sum of capacities leaving the ', 'source', '.', 'All positive net source flow must cross one of those edges. Their combined limits provide an immediate upper bound.'),
    q('The total value cannot exceed the sum of capacities entering the ', 'sink', '.', 'Every delivered unit must enter the sink. Those incoming limits form another valid upper bound on feasible value.'),
    q('Flow feasibility is not the same as flow ', 'optimality', '.', 'The zero flow is feasible, but a positive augmenting path may increase its value. A cut certificate can establish optimality.'),
    q('A flow model should state whether capacities are integral or real ', 'numbers', '.', 'Integral capacities support discrete path interpretations through integrality. Real capacities still define a valid optimization problem but may need different reasoning.')
  ]);

  add('jea-10-2', [
    q('An s-t cut places the source and sink on opposite ', 'sides', '.', 'The partition separates possible routes. Every source-to-sink path must cross from the source side to the sink side.'),
    q('Cut capacity sums original capacities only on edges crossing ', 'forward', '.', 'Edges from the sink side back to the source side are not included in capacity. Their flow enters the net-flow equation negatively.'),
    q('The net flow across any s-t cut equals the flow ', 'value', '.', 'Internal flows cancel when conservation equations are summed over the source-side vertices. Only crossing edges remain.'),
    q('Backward flow across a cut reduces its net ', 'crossing', '.', 'A reverse-directed edge contributes a negative term to net source-side outflow. Omitting that sign can invalidate the bound derivation.'),
    q('Every cut capacity is an upper bound on feasible flow ', 'value', '.', 'Forward crossing flow cannot exceed forward capacities, while backward crossing flow only subtracts. Thus net flow is bounded by capacity.'),
    q('A minimum cut has the smallest capacity among all s-t ', 'partitions', '.', 'Its value gives the strongest cut-based upper bound. The maxflow-mincut theorem later shows the bound is achievable.'),
    q('A single low-capacity cut can certify that no flow exceeds a stated ', 'number', '.', 'The certificate need only list the source-side vertices and crossing capacities. Checking their sum is straightforward.'),
    q('A cut with no forward capacity forces maximum flow to ', 'zero', '.', 'Every source-to-sink path would need a forward crossing edge. Without one, no positive feasible value can pass.'),
    q('The cut bound depends on capacities, not on a particular candidate flow ', 'algorithm', '.', 'Any feasible assignment must obey it. That independence makes a cut useful as an optimality certificate.'),
    q('An edge entirely inside one cut side does not contribute to cut ', 'capacity', '.', 'It does not cross the partition. Its flow cancels when vertex conservation equations are summed over that side.'),
    q('A reverse edge across the partition is excluded from forward cut ', 'capacity', '.', 'Capacity measures source-side to sink-side edges only. Reverse flow appears separately with a minus sign in net crossing.'),
    q('A flow matching a cut’s capacity is already ', 'maximum', '.', 'No feasible flow can exceed that cut bound. Achieving it simultaneously proves the flow optimal and the cut minimum.'),
    q('A cut is specified by a set containing the source but excluding the ', 'sink', '.', 'The complement forms the other side. Listing this set is enough to determine every forward crossing edge.'),
    q('A cut through parallel edges counts each forward edge’s ', 'capacity', '.', 'Both channels can carry flow across the boundary. Their capacities add in the cut upper bound.'),
    q('This expression sums only forward edges across the ', 'cut', '.', 'Edges from S to its complement limit net source-to-sink flow. Reverse edges are not added to capacity.', { code: 'sum(cap[u, v] for u, v in edges if u in S and v not in S)' })
  ]);

  add('jea-10-3', [
    q('A forward residual edge records unused original ', 'capacity', '.', 'It permits additional flow along that edge. Its residual amount is capacity minus current flow.'),
    q('A backward residual edge records flow that can be ', 'canceled', '.', 'Sending residual flow backward reduces a previous assignment. This allows an algorithm to revise an earlier route choice.'),
    q('An augmenting path runs from source to sink through positive residual ', 'edges', '.', 'Every edge along it can support some change. The path offers a way to increase net flow value.'),
    q('The augmenting amount is the minimum residual capacity on the ', 'path', '.', 'Every path edge must accommodate the same increase or cancellation. The smallest residual value is the bottleneck.'),
    q('After augmentation, at least one path edge becomes residual-capacity ', 'zero', '.', 'The bottleneck is saturated in the chosen direction. Future augmentations may still alter the route through reverse residual edges.'),
    q('A residual path can reroute flow without violating original ', 'capacities', '.', 'Forward changes use slack and backward changes cancel existing flow. Conservation is preserved along internal path vertices.'),
    q('When no residual s-t path remains, source-reachable residual vertices define a ', 'cut', '.', 'No positive residual forward edge leaves that set. Its original cut capacity equals the current feasible flow value.'),
    q('Matching flow and cut values proves both are ', 'optimal', '.', 'Every flow is at most every cut. Equality leaves no room for a better flow or smaller cut.'),
    q('The maxflow-mincut theorem equates maximum flow value with minimum cut ', 'capacity', '.', 'Augmenting-path reasoning supplies a constructive proof: no residual route exposes a cut whose bound is achieved.'),
    q('A backward residual edge can undo an earlier greedy-looking ', 'choice', '.', 'The algorithm does not have to commit permanently to its first path. Reassignment can make room for more total flow.'),
    q('An arbitrary path selection may have different running-time ', 'behavior', '.', 'The augmentation rule is correct, but the number of steps depends on selection and capacity assumptions. Choose a schedule with a proven bound.'),
    q('An integral network can be augmented in integral ', 'amounts', '.', 'Residual bottlenecks remain integers when capacities and current flows are integral. This supports discrete path reductions later.'),
    q('A residual graph is computed from the current ', 'flow', '.', 'Its edges and capacities change after each augmentation. Reusing stale residual values can produce an invalid update.'),
    q('A feasible maximum flow may have unused capacity on some ', 'edges', '.', 'The absence of an augmenting source-to-sink route, not saturation everywhere, is the optimality condition.'),
    q('This backward residual capacity equals the existing forward ', 'flow', '.', 'That amount can be canceled if a later augmenting path traverses the reverse direction. It permits rerouting without breaking feasibility.', { code: 'residual[(v, u)] = flow[(u, v)]' })
  ]);
  deepen('jea-10-0', [
    'The direction of each edge also matters.',
    'Source balance differs from internal conservation.',
    'Sink balance measures delivered quantity.',
    'The cut viewpoint reveals this limitation.',
    'Both constraints apply at every feasible solution.',
    'Optimization begins from this valid baseline.',
    'Net value ignores circulating flow around cycles.',
    'A vertex cannot manufacture missing incoming flow.',
    'Backward residual edges arise from cancellation instead.',
    'The encoding must be proved in both directions.',
    'A matching cut gives an optimality certificate.',
    'A zero bound cannot support positive use.',
    'This balance is the central flow constraint.',
    'The weakest link controls that one path.',
    'Other cuts can provide tighter network bounds.'
  ]);
  add('jea-11-0', [
    q('A flow reduction needs a mapping from original solutions to feasible ', 'flows', '.', 'Every legal original choice should produce a network assignment satisfying capacities and conservation. Otherwise the model may exclude valid answers.'),
    q('The reverse mapping converts an integral flow into original ', 'choices', '.', 'Without it, a maximum flow value might have no usable interpretation. Flow decomposition often supplies the required discrete selections.'),
    q('A correct reduction preserves the original objective as flow ', 'value', '.', 'Maximizing network flow must maximize the intended number of paths, matches, or selections. A mismatched objective solves a different problem.'),
    q('A capacity-one edge can express that a resource is used at most ', 'once', '.', 'Each unit of integral flow consumes capacity. The network construction must put every use of that resource through the edge.'),
    q('Integral capacities support discrete path decomposition of an integral ', 'flow', '.', 'A unit of flow can represent one chosen item or route. Fractional assignments would not directly encode such decisions.'),
    q('A modeling reduction must exclude invalid combinations through network ', 'structure', '.', 'If a forbidden original selection still corresponds to a source-to-sink path, maximum flow can return an unusable result.'),
    q('A flow network can encode compatibility by including only allowed ', 'edges', '.', 'A path can then follow only permitted transitions. Missing edges represent disallowed pairs or assignments.'),
    q('The source and sink frame one complete selection as a source-to-sink ', 'path', '.', 'Internal layers encode the resources used. A flow decomposition turns the final network result into individual selections.'),
    q('A reduction proof must work in both ', 'directions', '.', 'Map every original solution to a flow and every relevant flow back to a valid original solution. One direction alone is insufficient.'),
    q('An original feasibility question can be answered by comparing maximum flow to a required ', 'target', '.', 'If the flow reaches that value, the decomposition yields a feasible assignment. A lower value proves the requirement impossible under the model.'),
    q('Network construction time belongs in the reduction’s total running ', 'time', '.', 'An efficient maxflow subroutine does not help if building the network is too expensive. Count vertices, edges, and conversion work.'),
    q('A cut can reveal which resource constraints prevent a larger original ', 'solution', '.', 'The bottleneck certificate may explain why no more disjoint paths or assignments can be selected.'),
    q('An infinite capacity should be implemented by a finite safe upper ', 'bound', '.', 'A bound above every possible useful flow serves the same purpose and avoids special arithmetic. Its value should be justified.'),
    q('A source-to-sink path is a modeling object, not necessarily a physical ', 'route', '.', 'In assignments, its edges encode linked choices. The reduction proof gives the path its original-problem meaning.'),
    q('This capacity-one edge limits the modeled resource to a single ', 'use', '.', 'Every path consuming that resource must cross the edge. Integral flow cannot send two units through it.', { code: 'add_edge(resource_in, resource_out, capacity=1)' })
  ]);

  add('jea-11-1', [
    q('Edge-disjoint paths share no graph ', 'edges', '.', 'They may pass through the same vertices. The constrained resource is each edge’s single use.'),
    q('Assigning unit capacity to each original edge enforces edge ', 'disjointness', '.', 'Two unit-flow paths cannot both use an edge whose capacity is one. Integral flow decomposes into separate paths.'),
    q('An integral flow of value k yields k edge-disjoint source-to-sink ', 'paths', '.', 'Decompose the flow into unit paths and discard cycles. Unit edge capacities prevent two selected paths from sharing an edge.'),
    q('Conversely, k edge-disjoint paths create a feasible flow of value ', 'k', '.', 'Send one unit along each path. Edge disjointness respects unit capacities, and each internal vertex balances inflow and outflow.'),
    q('The maxflow-mincut theorem equates path count with a minimum separating edge ', 'cut', '.', 'A cut of c edges blocks every path and bounds their number. Unit-capacity maxflow attains that bound.'),
    q('Two edge-disjoint paths may cross at an internal ', 'vertex', '.', 'The vertex has no capacity-one restriction in this model. Limiting vertices requires a different construction.'),
    q('A bridge edge can limit the maximum path count to ', 'one', '.', 'If every source-to-sink path uses that edge, its unit capacity forms a cut of one.'),
    q('A path decomposition may contain directed flow ', 'cycles', '.', 'Cycles contribute no source-to-sink value. Remove them to recover the paths representing the original solution.'),
    q('Unit edge capacities make the optimal flow value an ', 'integer', '.', 'The integrality property permits a discrete path count. A fractional optimum would not directly count separate routes.'),
    q('A source-to-sink cut with c unit edges proves at most c edge-disjoint ', 'paths', '.', 'Every path must cross at least one cut edge. Edge disjointness assigns a different cut edge to each path.'),
    q('The reduction must preserve original edge ', 'direction', '.', 'A directed path may traverse only allowed orientations. Reversing an edge in the network could create a path absent from the graph.'),
    q('Parallel edges can support separate edge-disjoint ', 'paths', '.', 'They are distinct resources even if they share endpoints. Give each its own unit-capacity network edge.'),
    q('A flow value alone gives the count; decomposition gives the actual ', 'routes', '.', 'To return paths, follow positive-flow edges from source to sink, removing one unit for each recovered path.'),
    q('The unit-capacity model answers edge-disjointness, not minimum total path ', 'length', '.', 'Maximum flow optimizes how many paths exist. It does not by itself minimize their edge counts or weights.'),
    q('This capacity turns each graph edge into a one-use ', 'resource', '.', 'Integral maxflow then counts paths that cannot share that edge. Vertex sharing remains allowed.', { code: 'for u, v in graph_edges:\n    network.add_edge(u, v, capacity=1)' })
  ]);

  add('jea-11-2', [
    q('Internally vertex-disjoint paths cannot share an intermediate ', 'vertex', '.', 'The source and sink may be common endpoints for every selected path. Each other vertex is a resource with capacity one in the flow model.'),
    q('Splitting v into v-in and v-out makes a vertex limit an edge ', 'capacity', '.', 'Every route through v must cross the internal edge. Setting that edge to one prevents two unit paths from using v.'),
    q('An original edge u to v becomes an edge from u-out to ', 'v-in', '.', 'This preserves direction while routing every visit through the appropriate split-vertex capacity edge.'),
    q('The source and sink typically need special capacity ', 'treatment', '.', 'Many selected paths share those endpoints. A capacity-one internal edge there would incorrectly limit the answer to one.'),
    q('A capacity-one internal edge enforces at most one path through a ', 'vertex', '.', 'Integral paths cannot both consume the same bottleneck edge. The flow network thereby encodes vertex disjointness.'),
    q('A feasible family of vertex-disjoint paths maps to an integral ', 'flow', '.', 'Send one unit along each transformed path. Shared endpoints are allowed, while distinct internal vertices respect all capacity-one edges.'),
    q('An integral flow maps back to internally disjoint original ', 'paths', '.', 'Decompose it and collapse each v-in to v-out traversal back to vertex v. Capacity one prevents repeated internal use.'),
    q('Unit capacities on original edges alone are insufficient for vertex ', 'disjointness', '.', 'Two paths could enter and leave the same vertex using different edges. The split edge constrains that shared resource.'),
    q('A minimum vertex separator corresponds to a cut through split ', 'edges', '.', 'Removing those capacity-one vertex edges blocks all routes. The flow model relates path count to vertex bottlenecks.'),
    q('A split graph has approximately twice as many vertex ', 'nodes', '.', 'Each original vertex becomes an input and output copy. The transformation remains linear in graph size.'),
    q('A direct source-to-sink edge needs care in a vertex-disjoint-path ', 'count', '.', 'Multiple uses of the same original edge are not separate simple paths. Model edge and endpoint conventions explicitly.'),
    q('Vertex splitting can encode capacities greater than ', 'one', '.', 'Set the internal edge capacity to the allowed number of uses. The same construction generalizes beyond strict disjointness.'),
    q('The internal edge is the only way to pass through its original ', 'vertex', '.', 'All incoming original edges connect to v-in and all outgoing edges leave v-out. The bottleneck cannot be bypassed.'),
    q('Flow conservation at v-in and v-out preserves a path’s ', 'continuity', '.', 'A unit entering a vertex must cross the internal edge and leave along an outgoing transformed edge.'),
    q('This edge gives each internal vertex one unit of ', 'capacity', '.', 'Every transformed path through v must use it. Two paths therefore cannot share the corresponding original vertex.', { code: 'network.add_edge(v_in, v_out, capacity=1)' })
  ]);

  add('jea-11-3', [
    q('A bipartite graph divides vertices into left and right ', 'sets', '.', 'Every candidate matching edge crosses between the sets. The flow network follows that layered structure.'),
    q('A matching contains no two edges with the same ', 'endpoint', '.', 'Each participant can appear in at most one chosen pair. Capacity-one edges at left and right vertices enforce this.'),
    q('The flow network connects source to each left vertex with capacity ', 'one', '.', 'At most one unit can enter that left participant. The participant cannot be matched twice.'),
    q('Each right vertex connects to sink with capacity ', 'one', '.', 'At most one selected pair can pass through that right participant. This enforces the other side of matching.'),
    q('A left-to-right network edge exists only for an allowed ', 'pair', '.', 'A flow path then corresponds to a real bipartite edge. Forbidden pairs cannot appear in the output matching.'),
    q('An integral flow path represents one matched ', 'edge', '.', 'It travels source, left vertex, right vertex, sink. Unit endpoint capacities prevent overlap with other selected paths.'),
    q('An augmenting path may cancel a previous match and create a larger ', 'matching', '.', 'Backward residual edges reassign partners. This is why greedy first-available pairing can miss the optimum.'),
    q('An alternating path switches between unmatched and matched ', 'edges', '.', 'Flipping their status along a suitable augmenting path increases the matching size by one without violating endpoint constraints.'),
    q('The maximum-flow value equals the maximum matching ', 'cardinality', '.', 'Both-direction mappings preserve the number of selected pairs. The flow optimum therefore solves the original optimization problem.'),
    q('An unmatched left vertex can begin an augmenting ', 'path', '.', 'The residual search may traverse existing matches backward and end at an unmatched right vertex, increasing size.'),
    q('A maximal matching need not be ', 'maximum', '.', 'No single extra edge may be addable, yet an alternating augmenting path can rearrange pairs and increase total count.'),
    q('The network’s unit capacities give an integral optimal ', 'flow', '.', 'This allows the result to be interpreted as whole matched pairs rather than fractional assignments.'),
    q('A flow decomposition recovers the selected left-right ', 'pairs', '.', 'Inspect positive flow on edges between the two sides. Each such edge is one match in the output.'),
    q('This sink edge prevents the right participant from being matched ', 'twice', '.', 'Its capacity one is shared by all candidate pairs entering that right vertex. Only one unit can leave for the sink.', { code: 'network.add_edge(right_vertex, sink, capacity=1)' }),
    q('Matching size optimizes pair count, not participant ', 'preferences', '.', 'Stable matching uses preference order and blocking pairs. Maximum bipartite matching asks for the largest set of nonoverlapping edges.')
  ]);
  deepen('jea-11-1', [
    'Vertex sharing is explicitly permitted in this model.',
    'Each edge is the capacity-limited resource.',
    'Path decomposition gives a discrete witness.',
    'Their sum conserves flow at intermediate vertices.',
    'The cut is the matching obstruction certificate.',
    'This distinguishes edge and vertex constraints.',
    'One bottleneck edge limits all routes.',
    'Discarding cycles preserves source-to-sink value.',
    'Integrality converts flow units into whole paths.',
    'Distinct paths require distinct crossing edges.',
    'The network must not invent reverse routes.',
    'Parallel channels remain separate graph edges.',
    'The optimization value is only the count.',
    'Path quality is a different objective.',
    'The restriction applies to each original edge.'
  ]);
  deepen('jea-11-2', [
    'The endpoint convention must be stated explicitly.',
    'The split edge is the resource bottleneck.',
    'The transformation preserves route orientation.',
    'Otherwise the model would cap all paths incorrectly.',
    'Every internal visit crosses that one edge.',
    'The path family satisfies the constructed constraints.',
    'Collapse the split pairs after decomposition.',
    'Different edges can still meet at one vertex.',
    'Cuts now represent forbidden vertex sets.',
    'The graph-size blowup remains linear.',
    'Special cases depend on the path definition.',
    'The same gadget models repeated-use limits.',
    'No incoming route bypasses the capacity edge.',
    'Both split nodes still obey conservation.',
    'The unit limit rules out shared internal vertices.'
  ]);
  deepen('jea-11-3', [
    'Edges never connect vertices on the same side.',
    'This is the central combinatorial constraint.',
    'That edge encodes one left-side use.',
    'That edge encodes one right-side use.',
    'The network omits forbidden compatibility pairs.',
    'A full path is one complete assignment.',
    'Residual cancellation is what enables reassignment.',
    'The path alternates selection status after flipping.',
    'The reduction preserves the objective exactly.',
    'Existing matches can be traversed backward.',
    'Local irreversibility can miss better rearrangements.',
    'Discrete pairs need whole flow units.',
    'Positive cross-layer flow reveals the selected edges.',
    'All candidate partners share this one bottleneck.',
    'The two problems have different feasibility conditions.'
  ]);
  add('jea-11-4', [
    q('Tuple selection chooses one item from each ordered resource ', 'layer', '.', 'A source-to-sink path crosses the layers in order. Its vertices encode one complete compatible tuple.'),
    q('An element capacity limits how many chosen tuples may contain that ', 'element', '.', 'Split its vertex into in and out copies with an edge of the allowed capacity. Every path using it crosses that edge.'),
    q('A pair capacity constrains two elements in adjacent ', 'layers', '.', 'An edge between their vertices carries the pair limit. Zero-capacity pairs can be omitted from the network.'),
    q('The flow model depends on pair constraints involving only adjacent ', 'layers', '.', 'A nonadjacent compatibility rule might not be captured by a local path edge. The chapter warns this broader problem can be hard.'),
    q('A unit path from source to sink represents one selected ', 'tuple', '.', 'Flow decomposition extracts one path for each unit of integral flow. The path chooses exactly one element per layer.'),
    q('An integral flow of value k can be decomposed into k unit ', 'paths', '.', 'Each path represents a tuple. Element and adjacent-pair capacities ensure the resulting collection satisfies every stated limit.'),
    q('Conversely, k valid tuples create a feasible flow of value ', 'k', '.', 'Send one unit along each tuple path. The original capacity rules guarantee that no network edge is overused.'),
    q('The maximum flow value equals the maximum number of selected ', 'tuples', '.', 'Both directions of the reduction preserve the count. A larger flow would imply a larger valid tuple collection.'),
    q('An exam schedule can treat class, room, time, and proctor as four ', 'resources', '.', 'One path chooses all four. Edges encode which adjacent choices are compatible and capacities prevent overuse.'),
    q('A class-to-room edge exists only if the room has enough ', 'seats', '.', 'The edge enforces local compatibility. A missing edge prevents the flow from assigning that class to an undersized room.'),
    q('A room-to-time edge of capacity one prevents two exams using the same room at the same ', 'time', '.', 'Every assignment of that room and slot crosses the edge. The capacity enforces the shared-resource limit.'),
    q('A time-to-proctor edge exists only when that proctor is ', 'available', '.', 'Unavailable combinations are absent from the graph. The path cannot represent an invalid proctor-time assignment.'),
    q('The schedule is complete only if maximum flow value equals the number of ', 'classes', '.', 'Each class supplies at most one unit. Saturating all class source edges corresponds to assigning every exam.'),
    q('A proctor-to-sink edge can encode a limit on total exams supervised by that ', 'proctor', '.', 'Its capacity sums all paths choosing that person. The limit applies across every time slot.'),
    q('This edge allows at most one exam in a room during this ', 'slot', '.', 'Every schedule path using the room-slot pair crosses the edge. Capacity one prevents an overlapping second exam.', { code: 'add_edge(room, time_slot, capacity=1)' })
  ]);

  add('jea-11-5', [
    q('A path cover includes every graph vertex in at least one directed ', 'path', '.', 'A disjoint cover uses every vertex exactly once. Length-zero paths allow isolated vertices to be covered.'),
    q('The optimization seeks as few vertex-disjoint covering paths as ', 'possible', '.', 'Joining compatible consecutive vertices reduces the number of separate paths. The DAG restriction makes the matching reduction valid.'),
    q('The construction makes a left and right copy of every ', 'vertex', '.', 'A directed edge u to v becomes a bipartite edge from u-left to v-right. Matching then chooses path links.'),
    q('A matching edge assigns one vertex as the successor of ', 'another', '.', 'Matching prevents two chosen outgoing links from one vertex or two incoming links to one vertex.'),
    q('A DAG prevents chosen predecessor-successor links from forming a ', 'cycle', '.', 'With indegree and outdegree at most one, an acyclic selected subgraph must be disjoint directed paths.'),
    q('A cover with k paths uses V minus k chosen path ', 'edges', '.', 'Each path with r vertices has r minus one edges. Summing over all paths gives total vertices minus path count.'),
    q('A matching of size m gives a path cover with V minus m ', 'paths', '.', 'Project matched edges back to the DAG. Each chosen link joins two vertices into one sequence, reducing path count by one.'),
    q('Maximizing the matching minimizes the number of covering ', 'paths', '.', 'The formula V minus matching size reverses the objective. A larger matching joins more vertices and needs fewer paths.'),
    q('A cyclic input can break the matching-to-path-cover ', 'argument', '.', 'Selected links might form a directed cycle rather than paths. The DAG assumption is therefore essential.'),
    q('A vertex unmatched on the right copy has no chosen ', 'predecessor', '.', 'It starts one of the recovered paths. Counting such starts equals the number of paths in the cover.'),
    q('A vertex unmatched on the left copy has no chosen ', 'successor', '.', 'It ends one of the recovered paths. Following matched successor links reconstructs the complete cover.'),
    q('Class scheduling can model feasible succession as a DAG ', 'edge', '.', 'An edge exists when one professor can teach the later class after travel time. Each covering path becomes one professor’s schedule.'),
    q('The minimum number of professors equals the minimum path-cover ', 'size', '.', 'Each professor follows one legal class path. Every class must appear exactly once, so the cover assigns all courses.'),
    q('The matching graph contains two copies of each original ', 'vertex', '.', 'The copies separately constrain one outgoing and one incoming selected link. A single copy would conflate these roles.'),
    q('This edge records a legal consecutive pair of ', 'classes', '.', 'A match can join the first class to the second in one professor’s schedule. Time and travel feasibility determine whether the edge exists.', { code: 'if next.start >= current.end + travel[current.loc, next.loc]:\n    dag.add_edge(current, next)' })
  ]);

  add('jea-11-6', [
    q('Baseball elimination asks whether a team can finish first, possibly ', 'tied', '.', 'Assume the chosen team wins all its remaining games. Then distribute other games to keep opponents below its maximum win total.'),
    q('The candidate team’s best possible final wins equal current wins plus remaining ', 'games', '.', 'If another team already exceeds that number, elimination is immediate. Otherwise interactions among opponents still matter.'),
    q('Games between two opponents must award wins to one of those ', 'teams', '.', 'Those outcomes cannot all be losses for both. This is why comparing current standings alone is insufficient.'),
    q('A game-pair node receives capacity equal to games remaining between that ', 'pair', '.', 'Each unit represents one game whose winner must be chosen. Saturating its source edge assigns every such game.'),
    q('A game node connects only to the two teams that can ', 'win', ' it.', 'The outgoing flow assigns its games to one opponent or the other. No unrelated team can receive those wins.'),
    q('A team-to-sink capacity limits that opponent’s additional ', 'wins', '.', 'The limit is the candidate’s maximum final wins minus that opponent’s current wins. Exceeding it would eliminate the candidate.'),
    q('The candidate remains possible only if all source-to-game edges can be ', 'saturated', '.', 'Then every remaining opponent game has an assigned winner and no opponent exceeds the candidate’s maximum wins.'),
    q('A maximum flow below the total remaining opponent games proves ', 'elimination', '.', 'Some game outcome cannot be assigned without violating a team win limit. The cut exposes the obstruction.'),
    q('Integral flow lets one unit represent one actual ', 'game', '.', 'No game needs a fractional winner. Integer capacities guarantee an integral optimum that can be interpreted as outcomes.'),
    q('A negative team-to-sink allowance means elimination is already ', 'trivial', '.', 'That opponent has more current wins than the candidate can ever achieve. No network distribution can repair it.'),
    q('The reduction ignores games involving the candidate after assuming it wins them ', 'all', '.', 'Any schedule where it can finish first can be improved for that team by changing its remaining games to wins.'),
    q('A cut can certify elimination without listing every possible season ', 'schedule', '.', 'Its capacity is too small to route all mandatory game units. This compact obstruction replaces exponential enumeration.'),
    q('Source-edge capacity G[i,j] encodes all remaining games for one opponent ', 'pair', '.', 'Saturating it means all those games receive winners. The distribution between its two outgoing team edges chooses who wins.'),
    q('A candidate may be eliminated even when no single opponent already has too many ', 'wins', '.', 'Several opponents must play each other, forcing some to gain wins. Network constraints capture this collective pressure.'),
    q('This capacity bounds opponent i’s additional ', 'wins', '.', 'The opponent may gain no more than the candidate’s best final total minus its current wins. A negative result signals immediate elimination.', { code: 'limit_i = wins[candidate] + remaining[candidate] - wins[i]' })
  ]);

  add('jea-11-7', [
    q('Project selection chooses a dependency-closed subset maximizing total ', 'profit', '.', 'A selected project must include every prerequisite it depends on. Positive and negative project values are both allowed.'),
    q('A negative-profit project represents a ', 'cost', '.', 'It may still be worth selecting if it enables enough profitable dependent projects. The optimization considers the whole closed set.'),
    q('A selected project’s prerequisites must also be ', 'selected', '.', 'The dependency edges enforce closure. A candidate set omitting a required predecessor is infeasible even if its apparent profit is high.'),
    q('Profitable projects receive source edges with capacity equal to their ', 'profit', '.', 'Putting such a project on the rejected side cuts that edge and pays the opportunity cost of not earning its profit.'),
    q('Costly projects receive sink edges with capacity equal to their positive ', 'cost', '.', 'Selecting one puts it on the source side and cuts its sink edge, accounting for the expense.'),
    q('Dependency edges receive effectively infinite ', 'capacity', '.', 'A finite minimum cut will avoid separating a selected project from a required prerequisite. This enforces feasible closure.'),
    q('The source side of a finite cut represents selected ', 'projects', '.', 'A dependency crossing from selected to rejected would incur infinite cost, so every selected project’s prerequisites stay selected.'),
    q('Cut capacity equals selected costs plus rejected positive ', 'profits', '.', 'The cut pays for costly jobs kept and profitable jobs missed. This turns maximizing net profit into minimizing a loss.'),
    q('Let P be total positive profit; selected net profit equals P minus cut ', 'capacity', '.', 'P is fixed across all cuts. Therefore the minimum finite cut corresponds to maximum feasible selected profit.'),
    q('If all projects have negative profit, selecting none is ', 'optimal', '.', 'The empty set is dependency-closed and yields zero. Any nonempty selection would reduce total profit.'),
    q('A profitable project may be rejected when its prerequisites cost too ', 'much', '.', 'The cut compares the lost profit against required expenses. Local positive value does not guarantee global benefit.'),
    q('A dependency edge points from the dependent project to its ', 'prerequisite', '.', 'If the dependent lies on the selected source side, the prerequisite must too. This orientation makes an invalid selection cross infinite capacity.'),
    q('A finite large number can stand in for infinity if it exceeds total possible positive ', 'profit', '.', 'No optimal cut will pay that penalty when a finite alternative exists. The bound must be chosen deliberately.'),
    q('The reduction proves optimality by relating every feasible selection to a finite ', 'cut', '.', 'The correspondence works both ways, and profit differs from cut cost by a fixed constant. Min-cut therefore solves the original problem.'),
    q('This edge penalizes rejecting a profitable ', 'project', '.', 'If the project is on the sink side, the source edge crosses the cut. Its capacity equals the forgone profit.', { code: 'if profit[v] > 0:\n    network.add_edge(source, v, profit[v])' })
  ]);
  deepen('jea-11-4', [
    'The order is what makes local edges sufficient.',
    'Every tuple using it crosses the bottleneck.',
    'Nonadjacent restrictions change the problem substantially.',
    'Such constraints are not visible to one transition.',
    'The path links compatible neighboring choices.',
    'Cycles contribute nothing to tuple count.',
    'The capacities encode exactly those constraints.',
    'This is an objective-preserving reduction.',
    'The layers turn scheduling into selection.',
    'Enrollment determines which edges are present.',
    'Different classes compete for the same edge.',
    'Unavailable pairs have no transition edge.',
    'A lower flow value proves some class unassigned.',
    'All chosen exams share that proctor limit.',
    'The room-slot edge is the limited resource.'
  ]);
  deepen('jea-11-7', [
    'Closure is the central feasibility condition.',
    'A prerequisite cost can outweigh a project reward.',
    'Selection must include the entire dependency chain.',
    'The edge prices a foregone opportunity.',
    'The edge prices taking an expensive job.',
    'The penalty prevents an invalid dependency split.',
    'Finite cuts correspond to legal project sets.',
    'This identity explains every cut term.',
    'The fixed constant reverses the optimization.',
    'Nothing is a valid project selection.',
    'The cut makes that tradeoff explicit.',
    'The edge orientation is necessary for closure.',
    'The chosen bound must dominate useful finite cuts.',
    'Both directions establish the reduction’s correctness.',
    'Rejecting positive value incurs its full penalty.'
  ]);
  add('jea-h-1', [
    q('A linear program chooses real-valued variables to optimize a linear ', 'objective', '.', 'The feasible assignments satisfy linear equalities or inequalities. Both the objective and constraints must be linear in the variables.'),
    q('The coefficients of the objective specify how each variable contributes to ', 'value', '.', 'Changing a variable affects the objective by its fixed coefficient. Products of two decision variables would not be linear.'),
    q('A feasible point satisfies all constraints ', 'simultaneously', '.', 'Meeting most inequalities is insufficient. The feasible region is their intersection, including any sign restrictions.'),
    q('A canonical maximization LP uses inequalities Ax ≤ b and nonnegative ', 'variables', '.', 'The objective is c dot x. Other LP forms can be translated into this structure before taking a dual.'),
    q('A free variable can be represented as the difference of two nonnegative ', 'variables', '.', 'The positive and negative parts allow any real value. This converts a sign-unrestricted variable into canonical form.'),
    q('An equality constraint can be represented by two opposing ', 'inequalities', '.', 'Requiring both at most and at least the same value forces equality. This helps convert an LP to canonical form.'),
    q('Multiplying an inequality by negative one reverses its ', 'direction', '.', 'A lower-bound constraint can thereby become an upper-bound constraint. Forgetting the reversal changes the feasible region.'),
    q('A slack variable turns an inequality into an ', 'equality', '.', 'For Ax ≤ b, nonnegative slack records unused allowance. Slack form supports certain algorithms and makes residual capacity explicit.'),
    q('Requiring variables to be integral changes the problem to integer ', 'programming', '.', 'The feasible set becomes discrete. An LP optimum may be fractional and therefore not directly solve the integer problem.'),
    q('A flow network’s edge amounts can be LP ', 'variables', '.', 'Capacity bounds and conservation are linear constraints. The source’s net outflow is a linear objective.'),
    q('A linear objective has no products of decision ', 'variables', '.', 'Terms may be constant coefficients times variables and summed. A term x times y makes the expression nonlinear.'),
    q('The offset vector b supplies right-hand sides of the ', 'constraints', '.', 'Together with matrix A, it defines the feasible region. The objective vector c defines what is optimized over that region.'),
    q('An LP may ask for a minimum rather than a ', 'maximum', '.', 'Negating the objective can convert between the two forms. The feasible region remains the same under that transformation.'),
    q('A proposed LP solution must report both its assignment and objective ', 'value', '.', 'Feasibility checks its constraints; optimality requires comparing against every feasible alternative or a valid certificate.'),
    q('This is linear because each variable has a fixed ', 'coefficient', '.', 'The objective is a sum of constant multiples of variables. No variable is multiplied by another variable.', { code: 'maximize 3*x + 2*y\nsubject to x + y <= 5, x >= 0, y >= 0' })
  ]);

  add('jea-h-2', [
    q('A linear equality describes a hyperplane in the variable ', 'space', '.', 'In two dimensions it is a line. In higher dimensions it separates or restricts the feasible region geometrically.'),
    q('A linear inequality describes one closed ', 'halfspace', '.', 'The boundary hyperplane and one side satisfy the condition. Intersecting such sets constructs the feasible region.'),
    q('The feasible region is the intersection of all constraint ', 'sets', '.', 'Every feasible point must satisfy every equality, inequality, and sign restriction. One violated condition excludes the point.'),
    q('A finite intersection of halfspaces is a ', 'polyhedron', '.', 'It may be empty, bounded, or unbounded. Its geometric structure supports linear-programming reasoning.'),
    q('Convexity means the segment between two feasible points remains ', 'feasible', '.', 'Each linear constraint holds along the segment. Their intersection therefore has no gaps between feasible points.'),
    q('An infeasible LP has no point satisfying every ', 'constraint', '.', 'Its feasible region is empty. There is no objective value to optimize over valid assignments.'),
    q('An unbounded maximization LP has feasible objective values arbitrarily ', 'large', '.', 'The feasible region must allow improving directions. Merely being geometrically unbounded does not guarantee the chosen objective is unbounded.'),
    q('A geometrically unbounded polyhedron may still have a bounded ', 'objective', '.', 'An open direction can be perpendicular to or worsen the objective. Feasible-region shape alone does not settle optimization.'),
    q('The objective’s level sets are parallel hyperplanes of equal ', 'value', '.', 'Moving the hyperplane in the improving direction searches for the best feasible contact point.'),
    q('A feasible line segment cannot cross outside a convex ', 'region', '.', 'Convexity follows from linear inequalities. A nonconvex feasible set would require a different model or integer restrictions.'),
    q('An empty intersection of halfspaces yields an ', 'infeasible', ' program.', 'Conflicting constraints can leave no point satisfying all of them. Plotting each halfspace can make this visible in two dimensions.'),
    q('A linear objective can be visualized as sliding a level ', 'line', '.', 'Each position has one objective value. The optimal point is the last feasible contact in the improving direction when a finite optimum exists.'),
    q('A point on a constraint boundary makes that inequality ', 'tight', '.', 'Its left and right sides are equal. Other inequalities may still have slack at that same point.'),
    q('The feasible region can contain infinitely many points even with finitely many ', 'constraints', '.', 'Real-valued variables vary continuously. Linear inequalities describe entire regions rather than a finite candidate list.'),
    q('This pair of bounds leaves no feasible value for ', 'x', '.', 'No real number can be at most one and at least two simultaneously. The intersection of these halfspaces is empty.', { code: 'x <= 1\nx >= 2' })
  ]);

  add('jea-h-4', [
    q('The dual of a canonical primal maximization LP is a ', 'minimization', ' LP.', 'Its feasible values give upper bounds on primal feasible values. Weak duality formalizes that relationship.'),
    q('One primal inequality corresponds to one dual ', 'variable', '.', 'The dual variable weights that primal constraint. Its sign depends on the original inequality direction.'),
    q('One primal variable corresponds to one dual ', 'constraint', '.', 'The coefficients in that primal column become the corresponding dual inequality. The objective coefficient becomes its right-hand side.'),
    q('The dual coefficient matrix is the transpose of the primal ', 'matrix', '.', 'Rows and columns swap roles. This reflects the exchange between constraints and variables.'),
    q('For max c·x with Ax ≤ b and x ≥ 0, the dual minimizes b·y subject to Aᵀy ≥ ', 'c', '.', 'The dual also requires y ≥ 0. These directions are crucial for the weak-duality inequality.'),
    q('A primal upper-bound constraint creates a nonnegative dual ', 'variable', '.', 'Nonnegative weights preserve the inequality when primal constraints are multiplied and summed to bound the objective.'),
    q('A primal equality creates a sign-unrestricted dual ', 'variable', '.', 'Multiplying an equality by any real coefficient preserves equality. The dual variable need not be nonnegative.'),
    q('A sign-unrestricted primal variable creates a dual ', 'equality', '.', 'The corresponding weighted coefficient must match exactly; either inequality direction could be violated by choosing the variable’s sign.'),
    q('Taking the dual twice returns an equivalent ', 'primal', '.', 'The translation swaps constraints and variables twice. The primal-dual naming choice is therefore conventional rather than intrinsic.'),
    q('The dual objective coefficients come from primal constraint bounds ', 'b', '.', 'Each dual variable weights one right-hand side. Their weighted sum supplies a bound on primal objective value.'),
    q('The dual constraint bounds the coefficient of each primal ', 'variable', '.', 'The weighted primal constraints must dominate that variable’s objective contribution. This is how feasible duals certify upper bounds.'),
    q('A primal minimization problem has a corresponding dual ', 'maximization', '.', 'Reversing optimization direction preserves the bound relationship. The exact signs still depend on constraint and variable forms.'),
    q('A transpose changes an n-by-d constraint matrix into a d-by-n ', 'matrix', '.', 'The dual therefore has d structural constraints and n variables in canonical form.'),
    q('Duality can turn an optimization result into a checkable ', 'certificate', '.', 'A feasible dual value bounds every primal candidate. Equality with a feasible primal proves both optimal.'),
    q('This canonical pair swaps the roles of constraints and ', 'variables', '.', 'Primal matrix rows index dual variables, while primal columns index dual constraints. The inequality directions match weak duality.', { code: 'primal: max c·x, Ax<=b, x>=0\ndual:   min b·y, Aᵀy>=c, y>=0' })
  ]);

  add('jea-h-5', [
    q('Weak duality bounds every feasible primal maximization value by every feasible dual ', 'value', '.', 'The dual gives an upper bound even before either side is optimized. This is the basis for an optimality certificate.'),
    q('If feasible primal and dual objective values match, both solutions are ', 'optimal', '.', 'Weak duality prevents any better primal or lower dual value. Equality closes the entire possible gap.'),
    q('Strong duality says finite optimal primal and dual values are ', 'equal', '.', 'The fundamental theorem guarantees matching optima when the appropriate optimal solutions exist. It extends maxflow-mincut style equality.'),
    q('For canonical forms, Ax ≤ b and nonnegative y imply yAx ≤ y·', 'b', '.', 'Multiplying each primal inequality by a nonnegative dual weight preserves direction, then summing gives the upper bound.'),
    q('Dual feasibility and nonnegative x imply c·x ≤ yA', 'x', '.', 'Each dual constraint bounds a primal objective coefficient. Weighting by nonnegative primal variables preserves the inequality.'),
    q('Combining the two inequalities yields c·x ≤ yAx ≤ y·', 'b', '.', 'This chain proves weak duality. Matching endpoints forces equality throughout and certifies optimality of both assignments.'),
    q('A feasible dual solution is a certificate that no primal value exceeds its ', 'objective', '.', 'Anyone can check the dual constraints and arithmetic. A matching primal assignment then proves the exact optimum.'),
    q('An unbounded primal maximization problem forces its dual to be ', 'infeasible', '.', 'A feasible dual would give a finite upper bound by weak duality, contradicting arbitrarily large primal values.'),
    q('An infeasible primal does not automatically mean the dual is ', 'unbounded', '.', 'Both sides can be infeasible in degenerate cases. The logical implications must not be reversed without conditions.'),
    q('Maxflow–mincut is a special primal-dual ', 'equality', '.', 'A feasible flow gives a lower bound, a cut gives an upper bound, and matching values certify both optima.'),
    q('A gap between feasible primal and dual values means optimality has not yet been ', 'certified', '.', 'Either side might improve. The gap measures how much room remains between the known lower and upper bounds.'),
    q('Weak duality holds without assuming the solver has found an ', 'optimum', '.', 'Any feasible pair supplies bounds. That makes it useful for checking intermediate or independently proposed solutions.'),
    q('A primal feasible value is a lower bound on the maximum ', 'objective', '.', 'The optimum is at least as good as any valid candidate. A feasible dual supplies the corresponding upper bound.'),
    q('A matching certificate needs feasibility on both ', 'sides', '.', 'Equal numbers from invalid assignments prove nothing. Check all primal and dual constraints before invoking weak duality.'),
    q('This equality certifies the two feasible solutions as ', 'optimal', '.', 'Weak duality brackets every possible primal and dual value between the matching objectives. Neither side can improve.', { code: 'assert primal_feasible(x) and dual_feasible(y)\nassert objective_primal(x) == objective_dual(y)' })
  ]);
  deepen('jea-h-1', [
    'The variables are continuous unless restricted otherwise.',
    'Constant coefficients preserve the required linear form.',
    'A single violation makes the point infeasible.',
    'The sign constraints are part of canonical feasibility.',
    'Both parts must remain nonnegative individually.',
    'The two bounds pin down one value.',
    'Inequality signs must be handled carefully.',
    'Slack measures how far a bound is unused.',
    'Fractional solutions may no longer be acceptable.',
    'This connects flow theory with general optimization.',
    'Quadratic interactions require another optimization model.',
    'The three data objects define the LP.',
    'Negating the objective reverses the preference order.',
    'A dual witness can establish the latter.',
    'The fixed coefficients determine the marginal contributions.'
  ]);
  deepen('jea-h-2', [
    'The dimension is one less than the ambient space.',
    'Its boundary satisfies the inequality with equality.',
    'The geometry makes simultaneous feasibility concrete.',
    'The intersection inherits convexity from its pieces.',
    'This property supports global optimization arguments.',
    'Contradictory bounds can empty the region.',
    'Objective direction matters as much as region shape.',
    'Open directions need not improve the objective.',
    'Moving the level set visualizes optimization.',
    'Linear combinations preserve each constraint.',
    'No candidate assignment can repair the contradiction.',
    'The final contact gives the optimum when attained.',
    'Tightness identifies a binding constraint.',
    'Continuity is why geometry is useful here.',
    'No point lies in both one-dimensional halfspaces.'
  ]);
  deepen('jea-h-4', [
    'The dual objective provides the bound.',
    'Its sign reflects the primal constraint direction.',
    'The column-to-row conversion is mechanical.',
    'This is the algebraic core of dualization.',
    'The transpose aligns dimensions on both sides.',
    'A negative multiplier would reverse the bound.',
    'Equality allows either sign without contradiction.',
    'A free variable can move in either direction.',
    'Duality is an involution up to equivalent form.',
    'The primal bounds become dual weights.',
    'Every primal column receives a dual inequality.',
    'The general rule reverses max and min.',
    'Rows become columns under the matrix transpose.',
    'Matching bounds make that certificate exact.',
    'This pairing is the canonical example.'
  ]);
  deepen('jea-h-5', [
    'It holds for every feasible pair.',
    'No hidden better solution can fit between them.',
    'This is stronger than weak duality alone.',
    'The nonnegative multiplier preserves inequality direction.',
    'The sign of x is necessary for the step.',
    'The middle expression links both feasible systems.',
    'The certificate can be checked independently.',
    'Otherwise weak duality would give a contradiction.',
    'The converse requires additional assumptions.',
    'Equality of constructive bounds proves both sides.',
    'The gap is an upper bound on remaining improvement.',
    'Optimality is not needed to obtain bounds.',
    'This is the primal side of the bracket.',
    'Constraint checks are part of the certificate.',
    'The two objectives close the duality gap.'
  ]);
})();
