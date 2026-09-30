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
})();
