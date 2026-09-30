(() => {
  const details = {
    preface: `
A reader needs both the steps and the argument connecting those steps to the claimed result.
A test suite samples cases; a proof must cover the entire stated input domain.
For instance, specify whether an empty input is allowed and what output it requires.
Choose a size measure, such as number of keys, before comparing growth rates.
Pseudocode and different implementations can express the same sequence of abstract decisions.
`,
    'big-o': `
The bound concerns sufficiently large inputs and allows a constant multiplier above the compared function.
For example, 100n and n have the same asymptotic class despite different measured times.
An algorithm processing a graph may use vertices, edges, or both as its size parameters.
The dominant n-squared term becomes four times as large when n becomes twice as large.
Even an unusually arranged input of that size must satisfy the worst-case bound.
Benchmark results depend on tested cases and hardware, whereas a proof covers the specified class.
`,
    'graphs-heaps': `
In an undirected graph, either endpoint can be reached from the other along that edge.
If a path existed, the vertices would belong to the same component by definition.
Equal edge weights make minimizing path weight equivalent to minimizing its number of edges.
The condition applies recursively down the heap, placing a minimum key at the root.
After replacing the root, sift-down follows one child per level of the tree.
For example, two children of one parent may appear in either order in the array.
`,
    'jea-0-5': `
Without a specified output, two procedures could appear correct while returning incompatible results.
Explain why each step preserves the needed property and why termination yields the required answer.
A clear contract lets callers use a function without reasoning about every line inside it.
Keep branches and loops visible; omit memory-layout details unless they affect correctness.
An invariant describes a rule that holds before and after every pass, including later passes.
For example, an algorithm requiring sorted input must say so before claiming correctness.
`,
    'jea-0-6': `
Passing several tests leaves infinitely or exponentially many untested inputs in many problems.
The proof must reference the contract, including its allowed inputs and required outputs.
An average or favorable run cannot establish a bound for the hardest allowed arrangement.
This ignores low-order terms and asks which growth pattern dominates as size increases.
If an inner operation runs once per pair, the number of pairs may determine the bound.
Prove the base case, then use correctness of smaller calls to justify the current result.
`,
    'jea-1-6': `
If the smaller task has a different contract, the same recursive algorithm cannot solve it directly.
For merge sort, sorted halves must be merged into one sorted answer for the parent.
Neither subproblem should require the other subproblem's answer to be defined or solved.
The base case must satisfy the contract without creating another smaller subproblem.
Assume the smaller calls are correct, then prove the combination is correct.
The recurrence captures local split-and-combine work plus the cost of each smaller call.
`,
    'jea-1-7': `
The root is the original input, and descendants represent calls made by recursive calls.
Separating local work from child work prevents counting the same operations twice.
Summing by level can be easier when every level has a regular number of nodes.
At depth zero there is one call; each further depth multiplies the count by r.
The equation n divided by c to the d near one gives d near log base c of n.
The two work calls appear syntactically, and each creates a separate child in the tree.
`,
    'induction-1': `
Checking many members still leaves open the possibility that an untested member fails.
Choosing a least failure gives a concrete object whose smaller cases cannot fail.
If a smaller failure exists, the chosen counterexample was not actually least.
A nontrivial factorization supplies a divisor that is neither one nor the entire integer.
Divisibility is transitive: a prime dividing the factor also divides any multiple of it.
Both approaches use the impossibility of a first failing case after smaller cases are settled.
`,
    'induction-2': `
Match the hypothesis to the exact smaller values used in the inductive argument.
Without a directly true starting case, the step only proves a conditional chain.
The step must connect the assumed smaller truths to the specific new case.
That would be circular reasoning because the larger claim has not yet been established.
Repeatedly reducing a positive integer eventually reaches one of the verified starting cases.
This property lets us reason about a least counterexample without knowing its numeric value.
If failures existed, select the least one and derive a contradiction using smaller cases.
`,
    'induction-3': `
A call on size n depends on correctness at the smaller size used by that call.
If code recurses on n minus five, a hypothesis only about n minus one is insufficient.
Assuming all prior sizes covers a recursive jump to any earlier allowable size.
An induction argument fails if even one possible stopping input remains unjustified.
A nonnegative integer measure that drops on each call cannot decrease indefinitely.
One five-cent stamp pays five cents, leaving a strictly smaller amount to construct.
The step adds a stamp to a previously solved amount, so enough starting amounts are needed.
`,
    'jea-1-exercises': `
For example, partitioning and merging may cost time even when recursive calls are free.
An empty or single-item instance often stops recursion and needs an explicit answer.
Correctly solved halves are not enough if the merge violates the original contract.
Describe how a target answer is converted back into an answer to the source instance.
Count transformation work alongside solver work when claiming an overall time bound.
`,
    'jea-2-4': `
The recursive call receives a state reflecting the choice, then explores the remaining choices.
Omitting a relevant earlier decision can cause recursion to treat different situations as identical.
If selected values sum to s, the remaining target is the original target minus s.
Once states match, the same legal next moves and eventual outcomes are available.
Trying only one attractive move can miss a solution found through a different branch.
For example, a yes/no original question may require a function that accepts a partial state.
`,
    'jea-2-5': `
Every segment must match a permitted word, and the segments must cover the string exactly.
A first boundary determines both the prefix to validate and the suffix to recurse on.
A valid first word is insufficient if no sequence of valid words covers the remainder.
The possible completions depend on the suffix text, not on the historical split positions.
The empty case anchors recursion when the final chosen word consumes the remainder.
Without this successful base case, even a completely segmented string would be rejected.
`,
    'jea-2-8': `
A popular key can justify a shallow position even if the tree becomes less balanced.
The BST ordering forces smaller keys left and larger keys right of the root.
Every search in the interval compares against the root once before continuing downward.
Replacing a costly child subtree with a cheaper one would improve the complete tree.
No keys imply no successful searches, so this subtree adds nothing to total cost.
The globally best root cannot be known until the candidate subtree costs are compared.
`,
    'jea-12-1': `
The circuit description and input bits form the instance; the answer asks whether any setting succeeds.
Each bit doubles the number of settings, so n independent bits yield two to the n.
One pass through the circuit computes the output of the proposed setting.
Multiplying polynomial checking work by two to the n trials still gives exponential growth.
The witness is the actual bit setting; evaluating it verifies the yes answer quickly.
An absence of a known fast algorithm is not a proof that no fast algorithm exists.
`,
    'jea-12-2': `
The algorithm must return the right yes or no answer within a polynomial bound.
The certificate need exist only for yes instances, and a verifier checks it efficiently.
Verification follows a proposed witness; it need not discover that witness from scratch.
The bit assignment is compact and can be tested by evaluating the circuit.
The complement viewpoint changes which answers receive efficiently checkable witnesses.
A verifier can ignore any certificate and simply execute the efficient decision algorithm.
The unresolved P versus NP question asks whether every efficiently verifiable yes problem is efficiently solvable.
`,
    'jea-12-3': `
A reduction from each NP problem makes an NP-hard target at least as difficult under polynomial transformations.
Composing the reductions with that solver would give polynomial algorithms for all NP problems.
Membership in NP adds a polynomial verifier to the hardness condition.
Some hard problems may lie outside NP or lack the required yes-certificate verifier.
For proving target hardness, map a known-hard source into the target, not the reverse.
A no instance mapping to yes would make a target solver report a false source answer.
If conversion were exponential, a fast target solver would not imply a fast source solver.
`,
    'jea-3-4': `
Different recursion paths can reach the same state; the stored answer is computed once.
Define what one state means and which smaller states determine its answer before caching it.
The cache only repeats what the recurrence says, including any mistaken case or transition.
Bottom-up filling must follow a dependency order; top-down memoization discovers dependencies recursively.
If there are m distinct states, storing one result per state uses space proportional to m.
A dictionary lookup replaces a repeat recursive exploration of a previously solved state.
`,
    'jea-3-5': `
The choice is made without comparing the costs or feasibility of all future continuations.
For instance, choosing the longest valid first word may leave an unsplittable remainder.
A proof must connect each local choice to some globally optimal or feasible complete solution.
Backtracking can retreat from a bad prefix and test another candidate split.
The same suffix can arise through different earlier splits, so caching its answer saves work.
`,
    'jea-3-9': `
Two endpoints specify exactly which consecutive sorted keys belong to the current subtree.
Without stored totals, every root comparison could re-add the same interval frequencies.
The chosen root separates the interval into smaller left and right subproblems.
The empty tree has neither searches nor ancestor visits to charge.
Computing a longer interval first could read entries whose answers have not yet been filled.
The two endpoints create O(n²) states, and each state checks at most n roots.
The code returns immediately for i greater than j, before considering any root.
The input keeps each key aligned with the number of times that key will be searched.
If key i is searched f[i] times, its ancestor count contributes f[i] times to cost.
Saving one comparison on a very popular key can outweigh extra comparisons on rare keys.
The root's ordering rule determines the left interval before dynamic programming optimizes it.
A cheaper child subtree would improve the fixed-root tree without changing the other child.
The frequency sum depends on interval membership, which stays fixed while the root candidate changes.
The recurrence for F adds f[k] to the already computed sum through k minus one.
Starting with zero lets the first update add f[i] and obtain the singleton interval sum.
There are O(n²) intervals and each new total is obtained by one addition.
The table cell at row i and column k stores the answer for precisely that interval.
For any chosen r, both [i,r−1] and [r+1,k] contain fewer keys than [i,k].
Processing short intervals first guarantees both child costs are ready for every possible root.
Descending starting indices ensures right-subtree rows are available before the current row.
Ascending ending indices ensures left-subtree columns are available before the current column.
Choosing the first key puts the three-search key at depth one, saving two comparisons overall.
The minimum cost alone does not say which key attained it; that choice must be recorded.
Only interval costs are stored, so the count of relevant cells is O(n²).
Because F(i,k) is common to all candidates, it cannot change which root minimizes child cost.
`,
    'jea-4-1': `
For each later access, the tape must pass through every file scheduled before the target.
When likelihoods match, shorter files impose less delay on the rest of the order.
Exchanging their positions changes exactly which of their lengths later accesses must traverse.
Repeatedly removing adjacent inversions eventually yields files ordered by increasing length.
An exchange proof shows the local improvement can be applied to an arbitrary optimal arrangement.
Expected cost weights each file's delay by its access frequency, so simple length order may change.
`,
    'jea-4-4': `
If one word started another, the decoder could not know whether to stop reading bits.
Leaves are terminal, so reaching one identifies exactly one character.
The sequence of left and right edges from root to leaf is the binary codeword.
For a symbol occurring f times, every extra code bit increases total length by f.
Placing rare symbols deep sacrifices fewer total bits than placing frequent symbols deep.
The merged node's weight represents the combined number of times its children occur.
Moving a common symbol closer to the root saves bits on many repeated occurrences.
`,
    'jea-4-5': `
Such a pair has a mutual incentive to abandon the assigned matching, violating stability.
Checking all unmatched pairs for mutual preference tests whether the matching is stable.
The participant advances through preferences rather than proposing repeatedly to the same rejecter.
A tentative assignment can change until the proposal process has finished.
Fixing one conflict locally does not establish that all other pairs remain nonblocking.
A matching can have maximum cardinality and still contain a pair that prefers each other.
`,
    'jea-7-2': `
A forest may have several components, but within each component its chosen edges are acyclic.
The endpoints already have a path, and adding the edge would close that path into a cycle.
The edge crosses the cut separating that component from the rest of the graph.
The invariant says there exists an MST containing all edges currently selected.
If an MST used a heavier crossing edge, exchanging it for the lighter edge preserves a spanning tree.
When weights tie, different edge choices can have the same minimum total weight.
`,
    'jea-7-4': `
Unlike a forest-growing algorithm, every accepted edge connects into the one current tree.
Only an edge crossing from chosen to unchosen vertices can add a new vertex safely.
The queue may hold several crossing candidates, allowing the cheapest to be extracted efficiently.
Both endpoints already have a route inside the tree, so this edge is skipped.
The cut property justifies the new edge without reconsidering all previously accepted edges.
Because one endpoint is new, adding the edge cannot create a route back to itself.
`,
    'jea-5-5': `
Following edges from discovered vertices eventually reaches every vertex connected to the start.
A different bag discipline changes order, but not which reachable vertices can be discovered.
Repeated entries may be present, so the mark ensures only the first removal does work.
Walking parent pointers backward gives a path from the vertex to the starting point.
Each reached vertex other than the start gets one parent, preventing a parent-edge cycle.
Replacing the bag changes DFS, BFS, or best-first behavior without changing the search skeleton.
`,
    'jea-5-6': `
Last-in-first-out removal keeps extending the most recently discovered branch.
First-in-first-out removal handles all candidates at one distance before the next distance.
The first discovery cannot be via a longer path while a shorter path remains in an earlier layer.
The priority rule must reflect the optimization objective being pursued.
Ignoring the distance already traveled could choose a cheap final edge on an expensive route.
One narrow edge limits the entire route, no matter how wide its other edges are.
Processing older entries before newer ones makes distance layers emerge in order.
`,
    'jea-6-1': `
The timestamp is assigned before exploring descendants, so an ancestor has earlier preorder time.
The call finishes only after all reachable descendants on that DFS branch have returned.
An unrelated branch starts after the earlier branch finishes, yielding disjoint time intervals.
The recursion stack shows which ancestors are still awaiting their descendant calls.
Its start time precedes the descendant's start, and its finish time follows the descendant's finish.
DFSAll restarts to cover vertices unreachable from the previous starting vertex.
`,
    'jea-6-2': `
A cycle follows directed edges and eventually revisits a vertex.
The DFS tree path reaches the current vertex from that ancestor, closing a directed loop.
No directed edge can lead from another vertex into a source.
No directed edge can continue outward from a sink.
Each edge is inspected during traversal, giving work proportional to vertices plus edges.
An edge to a completed branch may be a cross or forward edge, not a back edge.
`,
    'jea-6-3': `
If u must precede v, a valid ordering places u before v for edge u to v.
Following a directed cycle would demand an impossible strict chain back to its start.
Every nonempty DAG has a source, so removing sources can continue until no vertices remain.
DFS postorder places a vertex after descendants, making the reverse order respect outgoing edges.
The task must wait until every incoming dependency has been completed.
The ordering is partial, leaving independent ready tasks free to swap positions.
`,
    'jea-6-5': `
One-way reachability is insufficient because the return path may not exist.
Adding another mutually reachable vertex would contradict the claim that the component was maximal.
If contracted components cycled, their vertices could all reach each other and form one component.
Strong connectivity applies to the entire graph only when all vertices are mutually reachable.
The intersection keeps exactly vertices for which both directed path directions exist.
A path from u to v becomes a path from v to u after all its edges are reversed.
`,
    'jea-6-6': `
This first entered vertex is the point where DFS reaches that component's vertices.
Its descendants within the component are organized below it in the search forest.
DFS parent relationships capture a connected exploration of mutually reachable vertices.
A linear SCC procedure extracts information from traversals instead of repeating a full search per vertex.
If components formed a cycle, every one could reach the others and they would merge.
The bound counts all vertices and edges, rather than only the number of components.
`,
    'jea-6-exercises': `
Each parent edge is the edge that caused DFS to create a new tree child.
The current recursion path already runs from the active ancestor to the present vertex.
Reversing completion order places each prerequisite before the vertices that depend on it.
Multiple start points are required when the graph has separate unreachable regions.
Repeated full traversals could make the cost much larger than linear.
`,
    'jea-8-3': `
The current label comes from an actual path, so it may be too large but not impossibly small.
Compare the destination label with the tail label plus the edge's weight.
Only a strict improvement changes the label, preventing pointless updates.
If all edge inequalities hold, no walk can produce a shorter value than the labels.
Every loop around a reachable negative cycle decreases a path's weight again.
The edge is tense precisely when its route beats the destination's current estimate.
`,
    'jea-9-5': `
The output is a distance for each ordered pair, not merely paths from one source.
A recursive predecessor rule without a decreasing parameter can chase a directed cycle indefinitely.
Each call reduces the allowed edge count, ensuring the recursion reaches a known case.
Repeating a vertex creates a cycle; without negative cycles, removing it does not worsen the path.
The recurrence compares not using the new allowance against adding one final edge.
Infinity signals that no finite path satisfies the current reachability and edge limit.
`,
    'jea-9-6': `
Every eligible path can be divided near its middle at some vertex considered by the recurrence.
Each half then fits the smaller edge bound used by the previous layer.
Direct edges and staying at a vertex provide the initial distances.
Two half-paths of at most L edges form a path of at most 2L edges.
Starting at one edge, log base two of V doublings covers any simple shortest path.
The middle-vertex loop is the linear factor on top of the quadratic pair count.
`,
    'jea-10-0': `
Think of traffic or material moving through directed connections with limited throughput.
The capacity bound is enforced separately on each edge, even when other edges have room.
Conservation allows this distinguished vertex to send more than it receives.
The sink can receive more than it sends because it is the destination.
A proposed routing is invalid if any edge exceeds capacity or an internal vertex loses flow.
`,
    'jea-10-1': `
The allowed flow is between zero and that edge's declared capacity.
At an internal vertex, whatever arrives must leave along outgoing edges.
Flow feasibility checks both this upper bound and nonnegativity.
Its net inflow equals the source's net outflow in a feasible network.
Subtracting incoming edges prevents transit flow from being mistaken for newly produced flow.
This provides a valid baseline before any augmenting path sends positive flow.
`,
    'jea-10-2': `
Separating them forces every source-to-sink route to cross the cut boundary.
Reverse-directed edges cannot carry new flow from the source side into the sink side.
Summing conservation over the source side cancels internal edges and leaves crossing flow.
Net flow subtracts the amount sent back across the same partition.
Comparing a feasible flow with a cut of equal capacity proves both optimal.
`,
    'jea-10-3': `
The residual network records how a current flow may be revised without violating capacities.
A path with one saturated edge cannot carry additional flow along that route.
Increasing more than the minimum would exceed capacity on the bottleneck edge.
The reachable set defines a cut whose forward edges are saturated at termination.
Flow cannot exceed any cut, so equality certifies maximum flow and minimum cut.
A backward edge can cancel an earlier assignment and reroute its unit elsewhere.
`,
    'jea-11-0': `
Check both directions: a legal original choice should yield flow, and a valid flow should decode back.
For example, a capacity-one edge can prohibit using a person in two assignments.
Integrality turns abstract flow amounts into countable choices for discrete problems.
A spurious flow solution would cause the reduction to claim feasibility where none exists.
If one unit of flow represents one selected option, maximizing flow should maximize selected options.
`,
    'jea-11-1': `
Two unit paths sharing an edge would require two units there and violate its capacity.
Paths can cross at a vertex without sharing an edge, so vertex exclusivity needs another construction.
The cut has only so many unit edges for distinct paths to use.
Trace positive-flow edges from the source; flow conservation carries each unit toward the sink.
Constraining vertices instead would solve a different path-disjointness problem.
`,
    'jea-11-2': `
Entering and leaving a vertex requires traversing the artificial edge between its two copies.
That edge can pass one unit, allowing at most one selected path through the vertex.
An original u-to-v edge connects u's out copy to v's in copy.
Usually the source and sink are exempted from the internal vertex-disjoint restriction.
The construction lets ordinary edge-capacity flow machinery enforce vertex usage.
`,
    'jea-11-3': `
Each left or right vertex may appear in at most one selected pair.
Unit capacities on these edges restrict how many matching paths can use each endpoint.
A source-left-right-sink flow path corresponds to exactly one chosen graph edge.
An alternating route cancels some prior choices and replaces them with one additional choice.
This two-way correspondence establishes equality between maximum integral flow and maximum matching.
`,
    'jea-11-4': `
For example, a path can choose one item from each of three compatible resource groups.
The bottleneck edge associated with that resource stops a second path from selecting it.
The whole path encodes a complete tuple rather than a single pair.
Nonadjacent constraints are harder because separate local edges may not preserve global compatibility.
Only pairs joined by a network edge may appear consecutively in a flow path.
Verify that no path can combine locally allowed edges into a globally forbidden tuple.
`,
    'jea-11-5': `
Even an isolated vertex counts as a path of length zero in the cover.
At most one incoming and outgoing selected link keeps every component path-shaped.
Without acyclicity, selected links could form a cycle rather than a path.
Each accepted matching link connects two path pieces that were previously distinct.
The matching chooses as many joins as possible, minimizing the number of remaining paths.
`,
    'jea-11-6': `
Games involving the target team can be optimistically awarded to it before modeling rivals.
The game node's incoming capacity equals the number of wins that must be allocated.
The cap is based on the target's maximum possible final record.
The unsent game capacity proves that some rival must receive too many wins.
The minimum cut provides a compact witness that the remaining games cannot be distributed safely.
`,
    'jea-11-7': `
Cutting that edge pays the opportunity cost of excluding a profitable project.
Cutting the sink edge pays for accepting a project whose profit is negative.
Choosing a dependent project without its prerequisite would cut the prohibitive edge.
Source-side membership is the decoded decision for whether a project is undertaken.
The minimum cut chooses the least expensive combination of forgone gains and accepted losses.
`,
    'jea-h-1': `
The objective gives a score, while constraints restrict which variable assignments may be considered.
A point violating even one requirement cannot be an answer to the program.
Optimizing means comparing objective values only among assignments satisfying all constraints.
Capacity bounds and flow conservation can be expressed as linear equations and inequalities.
An integer restriction rules out fractional choices that would otherwise be allowed by the relaxation.
`,
    'jea-h-2': `
The region may be empty, bounded, or extend indefinitely depending on its inequalities.
A linear boundary splits space into two sides, and the inequality keeps one side.
Each additional inequality removes points from the intersection rather than adding new ones.
The segment between feasible points satisfies every linear inequality by weighted averaging.
Conflicting requirements such as x at least two and x at most one leave no solution.
If one can move forever in a direction that improves the objective, no finite optimum exists.
`,
    'jea-h-4': `
The dual reorganizes the same coefficients so its feasible values bound the primal objective.
The multiplier prices that original restriction in the dual program.
The new restriction ensures the dual prices cover that original variable's contribution.
Dual minimization seeks the tightest upper bound on a primal maximization.
The correspondence between variables and constraints reverses again on the second dual.
`,
    'jea-h-5': `
The two feasible regions constrain each other's objectives through the weak-duality inequality.
If a primal value reaches a dual upper bound, neither side can improve further.
Under the theorem's conditions, the best feasible values meet without a gap.
A dual feasible point can certify that no larger primal objective is possible.
A cut limits flow from above, and an equal flow value proves the shared optimum.
`,
    'jea-12-0': `
Checking a supplied witness avoids the harder search through all possible witnesses.
The efficient transformation converts a hypothetical target solver into a solver for the source.
One impressive example cannot establish a complexity claim over arbitrary instances.
The reduction can be composed with the target algorithm for any source problem in NP.
A yes-only argument can allow false positives, so the reverse implication is necessary.
`,
    'jea-12-5': `
The direction must start at the established hard problem and end at the new problem.
Both yes and no instances must retain their answer under the transformation.
Gate clauses constrain output variables to match the Boolean operation on their inputs.
One variable per gate makes the circuit's intermediate signals expressible in the formula.
Assignments to formula variables correspond to consistent circuit computations ending in true.
A polynomial construction writes constraints directly rather than trying every possible circuit input.
`,
    'jea-12-6': `
The conjunction is satisfied only when every short clause has at least one true literal.
Auxiliary variables link short replacement clauses without forcing an unrelated truth assignment.
Existence of a satisfying assignment must agree for the original and transformed formulas.
Project a satisfying transformed assignment back onto the original variables to prove this direction.
Membership follows from checking a truth assignment, and hardness follows from the reduction.
`,
    'jea-12-10': `
An edge forbids the same color at both ends, encoding a local inequality constraint.
Gadgets map Boolean assignment choices and clause satisfaction into graph-color restrictions.
Repeated occurrences of a variable must represent the same truth value throughout the graph.
If every literal is false, the clause gadget should have no proper coloring.
A coloring must decode to a satisfying assignment, and an assignment must produce a coloring.
`,
    'jea-12-8': `
The converter is part of the algorithm obtained by composing it with a target solver.
Start with a satisfying source witness and construct a valid target witness.
Decode any valid target witness back into a satisfying source witness.
Otherwise the target might report yes for a source instance whose true answer is no.
The target solver's contract applies only to instances of the target problem.
`,
    'jea-12-13': `
Shared structure often lets one source choice become one target gadget with fewer special cases.
An element left uncovered makes the chosen family invalid no matter how few sets were selected.
The two subsets must account for all items and have identical summed weights.
A path cannot reuse vertices when the problem asks for a simple path.
Exact definitions of weights, lengths, and allowed instances affect both directions of the proof.
`,
    'jea-12-14': `
Boolean variables and clauses already resemble a target built around logical choices.
Color labels and adjacency restrictions resemble a target with incompatible assignments.
Each gadget must encode a source restriction without introducing invalid extra solutions.
Reducing an easy problem to the target only shows the target can express that easy problem.
Pick a source whose structures can be represented faithfully and efficiently in the target.
`,
    qsharp: `
The qubit's amplitudes change under a gate, even when no classical bit value is observed.
The zero and one outcomes then have equal probability on measurement.
The result is an ordinary value that later classical control flow can use.
The gate is conditional on the control's quantum state, not merely a classical if statement.
Use mutable when later statements need to assign another value to the same name.
The set statement updates the existing mutable binding instead of creating a fresh immutable one.
Simulation is useful for inspection and debugging before access to actual quantum hardware.
`,
    qft: `
Fourier basis states expose phase patterns that were less direct in the original basis.
Equal amplitudes allow subsequent phase operations to encode interference patterns.
Changing relative phase can affect later measurement probabilities after further gates.
The standard decomposition emits bits in reverse significance order before those swaps.
This diagnostic is specific to simulation; a physical qubit cannot expose its full state.
The classical outcome is sampled from the quantum state's measurement distribution.
Returning allocated qubits to zero supports correct release and reuse in the program.
`,
  };

  const course = window.KOAN_COURSES.find(item => item.id === 'advanced-algorithms');
  for (const set of course.sets) {
    const text = details[set.id];
    if (!text) throw new Error(`Missing detail: ${set.id}`);
    const lines = text.trim().split(/\r?\n/);
    if (lines.length !== set.koans.length) throw new Error(`Detail count mismatch: ${set.id}`);
    set.koans.forEach((koan, index) => { koan.why += ` ${lines[index]}`; });
  }
})();
