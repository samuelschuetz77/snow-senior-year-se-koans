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
})();
