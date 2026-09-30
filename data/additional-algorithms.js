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
})();
