(() => {
  const notes = {
    preface: `
An algorithm is fully described only when readers can see why it works.
Examples cover particular inputs; correctness requires an argument for every allowed input.
Precise inputs and outputs reveal exactly what the algorithm must accomplish.
Running time is a function of input size, so that size must be defined.
The same procedure can be implemented in different languages without changing the algorithm.
`,
    'big-o': `
Big O limits how fast a function can grow beyond some input size.
Multiplying by a fixed constant changes magnitude but not asymptotic order.
Without a size measure, there is no variable for the running-time function.
If work scales like n squared, doubling n multiplies it by four.
Worst case means the bound covers even the most demanding input of that size.
Measurements sample inputs and machines; a proof establishes a general bound.
`,
    'graphs-heaps': `
An undirected edge has two endpoints, called vertices.
Different connected components have no path joining their vertices.
Equal edge costs make each BFS layer one edge farther from the start.
The min-heap invariant compares each parent with its children.
Removing the root requires a repair along at most the heap's logarithmic height.
A heap orders parents against children, but siblings and branches need not be ordered.
`,
    'jea-0-5': `
Inputs state what is given; outputs state what a successful solution returns.
The why section connects the procedure to the required result for all valid inputs.
A caller can rely on the stated behavior without knowing the implementation.
Pseudocode highlights decisions and repetition while omitting language-specific mechanics.
A loop argument must work for any iteration, not only the first few.
Unstated assumptions can make a claimed algorithm fail on valid inputs.
`,
    'jea-0-6': `
Finite tests cannot cover every possible valid input.
Correctness means meeting a stated requirement, so the requirement must be precise.
Worst-case analysis bounds performance even on the most difficult allowed input.
Asymptotic analysis tracks how work changes when the input becomes larger.
Counting a repeatedly executed operation reveals the dominant amount of work.
An induction hypothesis can justify recursive calls on smaller instances.
`,
    'jea-1-6': `
The smaller instances must be solvable by the same recursive method.
Recursive answers solve parts; combining them produces an answer to the original instance.
Independent subproblems can be solved separately before their answers are combined.
A base case ends recursion by handling sufficiently small inputs without another call.
The inductive hypothesis justifies each smaller recursive result.
A recurrence adds the local work to the running times of recursive calls.
`,
    'jea-1-7': `
Every recursive call becomes a node in the tree.
The node's own work excludes work delegated to child calls.
Adding each call's local work counts the algorithm's total work.
Each level multiplies the number of calls by r, giving r to the d nodes.
After about log base c of n divisions, subproblem size reaches the base case.
Each non-base invocation calls work twice, producing two children.
`,
    'induction-1': `
A universal claim must hold for each member, not just selected examples.
Positive integers are well ordered, so any nonempty set of counterexamples has a least one.
A smaller counterexample contradicts the choice of the smallest counterexample.
A composite number factors into integers greater than one and less than itself.
If a prime divides a factor and that factor divides the number, it divides the number.
Both methods rule out failure by relating a case to smaller cases.
`,
    'induction-2': `
The hypothesis supplies established claims for the smaller cases used by the step.
The base case starts the chain without relying on an earlier case.
The step transfers truth from smaller cases to the case being proved.
Invoking the claim at the same or a larger size would assume what remains unproved.
Without a verified starting point, repeatedly stepping backward proves nothing.
Well ordering guarantees a least member of any nonempty positive-integer set.
Apply well ordering to the set of counterexamples if that set is nonempty.
`,
    'induction-3': `
The proof follows the same smaller inputs and base cases as the procedure.
The hypothesis must justify the exact input passed into the recursive call.
Strong induction covers any smaller size, even when recursion skips sizes.
Every stopping case needs its own direct correctness argument.
A measure that strictly decreases and cannot decrease forever proves termination.
Adding a five-cent stamp reduces the remaining amount by five cents.
The induction step needs enough verified starting amounts to cover every residue pattern.
`,
    'jea-1-exercises': `
The recurrence includes local work separately from recursive-call work.
Smallest instances have no smaller instance to call, so their outputs need explicit rules.
Correct subresults are insufficient unless their combination meets the original requirement.
A reduction must translate an answer back to the question that was originally asked.
An expensive transformation could erase the efficiency gained by solving the target.
`,
    'jea-2-4': `
Backtracking branches by making one choice and recursing on what remains.
Future choices depend on the relevant effects of decisions already taken.
Chosen elements subtract from the sum still needed.
Identical states have identical possible continuations regardless of how they were reached.
Exploring every valid next choice prevents a solution branch from being missed.
A broader subproblem definition may be necessary for recursive calls to fit the same rule.
`,
    'jea-2-5': `
A segmentation is valid when every resulting piece belongs to the dictionary.
Choosing the first word fixes a prefix boundary and leaves a suffix.
The whole split works only if the chosen prefix is valid and the suffix can also be split.
Once a suffix is fixed, earlier boundaries cannot change its possible segmentations.
Using no words is a valid segmentation of an empty string.
No text remains to validate, so the recursion can succeed immediately.
`,
    'jea-2-8': `
Frequently searched keys should be cheaper to reach, which balance alone does not ensure.
All smaller keys go left and larger keys go right of the selected root.
Every key in the interval gains one visit when a new root is placed above it.
Otherwise replacing a nonoptimal subtree would improve the whole tree.
No keys require no searches, so the empty subtree contributes zero cost.
Testing all possible roots ensures the minimum-cost choice is considered.
`,
    'jea-12-1': `
CircuitSat is a yes/no question about whether any input makes the output true.
Each of n inputs has two values, giving two to the n assignments.
Evaluating the circuit visits its gates and wires, taking time proportional to its size.
Two to the n candidate assignments grow exponentially with n.
The proposed assignment can be checked by evaluating the circuit once.
Current knowledge does not prove that every possible algorithm requires superpolynomial time.
`,
    'jea-12-2': `
P classifies decision problems by efficient solution algorithms.
NP allows an efficient check of a proposed yes witness.
A certificate is useful because the verifier can inspect it in polynomial time.
Setting the circuit inputs and evaluating it confirms a yes instance.
co-NP concerns efficiently verifiable no witnesses.
If a problem is easy to solve, its solution can also be checked efficiently.
No proof currently settles whether efficient verification always permits efficient solving.
`,
    'jea-12-3': `
Every NP problem can be polynomially reduced to an NP-hard problem.
An efficient NP-hard solver would solve every NP problem through reductions.
Completeness requires both NP hardness and efficient verification of yes instances.
A hard problem need not itself have efficiently verifiable certificates.
The known-hard source is mapped into the problem whose hardness is being proved.
Both answer directions must match; otherwise the transformed solver could answer incorrectly.
Only a polynomial transformation preserves polynomial total running time.
`,
    'jea-3-4': `
Caching each state avoids recomputing it through multiple recursive paths.
The recurrence states which smaller answers determine a larger answer.
Storing wrong answers faster cannot make a wrong recurrence correct.
A dependency must be available before a table entry can use it.
Memoization stores one answer per distinct state, so state count drives memory use.
The dictionary looks up a solved state rather than recursing again.
`,
    'jea-3-5': `
Greedy algorithms choose immediately rather than searching all remaining possibilities.
A locally valid prefix may leave a suffix with no valid segmentation.
Local appeal does not establish that the choice leads to a global solution.
Backtracking tests alternatives when an early choice later fails.
Memoization prevents repeated exploration of the same remaining suffix.
`,
    'jea-3-9': `
The keys between two endpoints form the subproblem solved by the recurrence.
Prefix sums let each interval's total frequency be obtained in constant time.
Any key in the interval could be the root, so all candidates must be compared.
An empty subtree contains no searches and contributes no cost.
Each candidate root depends on smaller left and right intervals.
There are about n squared intervals and up to n roots for each: order n cubed work.
No keys in the interval means no search can incur a cost there.
`,
    'jea-4-1': `
Every later file requires moving past an earlier file on the tape.
Putting short files first reduces the waiting time paid by later files.
The shorter file's length is then included in fewer access times.
An adjacent swap removes an inversion without increasing total cost.
A plausible local choice still needs proof that it improves a complete solution.
Popular files contribute more to expected cost, changing the ordering tradeoff.
`,
    'jea-4-4': `
Otherwise the decoder could mistake the beginning of one codeword for another.
Root-to-leaf paths identify characters without one character lying above another.
One tree edge contributes one bit to a character's code.
Each character's code length is paid once per occurrence.
Combining the least common symbols places them deepest at the smallest cost.
The merged subtree represents every occurrence of either original symbol.
Short codes save the most bits when assigned to frequently used symbols.
`,
    'jea-4-5': `
The two participants could both improve by leaving their assigned partners.
A blocking pair is exactly a pair that would mutually prefer a different match.
A rejection leaves that participant free to propose farther down their preference list.
Tentative matches can improve as more preferred proposals arrive.
An arbitrary swap may introduce a fresh blocking pair, causing repeated repairs.
Stability rules out preference conflicts; maximum matching optimizes how many pairs exist.
`,
    'jea-7-2': `
A cycle would make one chosen edge removable, so the partial MST stays acyclic.
Such an edge would create a cycle rather than connect separate components.
The cut property guarantees a lightest crossing edge can belong to an MST.
After a safe addition, some MST still contains all chosen edges.
The lighter replacement preserves connectivity and cannot increase total weight.
Distinct edge weights remove ties that could produce different minimum trees.
`,
    'jea-7-4': `
The algorithm maintains one growing connected tree rooted at its start vertex.
The cut property makes the cheapest edge crossing out of the tree safe.
The queue orders candidate edges so the cheapest is selected first.
That edge would join two existing tree vertices and create a cycle.
A safe crossing edge keeps the partial tree extendable to an MST.
Each accepted edge adds a new vertex, so it cannot close a cycle.
`,
    'jea-5-5': `
Search discovers every vertex connected to the start by a path.
The bag holds discovered work that has not yet been explored.
Marking on removal permits repeated bag entries but processes the vertex once.
Following parents reconstructs how the search first reached a vertex.
Each newly discovered vertex gets one parent, creating an acyclic spanning structure.
Stack, queue, and priority queue policies choose different next vertices.
`,
    'jea-5-6': `
A stack explores the newest candidate first, following a branch deeply.
A queue explores older candidates first, expanding one distance layer at a time.
BFS visits all shorter paths before reaching a vertex by a longer one.
A priority queue chooses the currently best-ranked candidate.
The candidate path cost includes the route to the edge's tail plus that edge.
A path is only as wide as its smallest-capacity edge.
A queue processes earlier discoveries first, producing BFS layers.
`,
    'jea-6-1': `
Preorder marks the moment exploration of a vertex starts.
Postorder marks the moment its recursive exploration ends.
Recursive calls finish before parents, so their time intervals nest.
Active calls are precisely the calls currently on the stack.
A descendant's call begins and ends before its ancestor's call ends.
One start vertex may not reach every vertex in a disconnected graph.
`,
    'jea-6-2': `
A directed cycle can return to its starting vertex.
An edge back to an active ancestor completes a directed return path.
A source has no predecessor edge entering it.
A sink has no outgoing edge to another vertex.
DFS visits vertices and inspects edges a constant number of times.
A finished vertex is no longer on the active ancestor path.
`,
    'jea-6-3': `
A dependency edge must point forward from its prerequisite to its successor.
A cycle would require each vertex to precede itself after following the cycle.
Removing a source repeatedly constructs an ordering for any DAG.
DFS finishes successors before predecessors, so reversing finish order puts tails first.
A task's incoming edges represent dependencies that must already be satisfied.
Independent ready tasks can be arranged in either order.
`,
    'jea-6-5': `
Mutual reachability requires a directed path in each direction.
Maximality includes every vertex mutually reachable with the component.
An intercomponent cycle would make its components mutually reachable and merge them.
If all vertices can reach each other, they form one maximal component.
Forward reachability finds vertices v reaches; reverse reachability finds those reaching v.
Traversing reversed edges from v follows paths that originally ended at v.
`,
    'jea-6-6': `
One vertex in each DFS component subtree is first reached from outside it.
That first vertex anchors the component's subtree in the DFS forest.
DFS discovery organizes a strong component into connected parent relationships.
One shared traversal records structure without redoing full searches for each vertex.
Contracting a component cycle would contradict the components' maximality.
Scanning every vertex and edge a constant number of times costs O(V+E).
`,
    'jea-6-exercises': `
A parent pointer names the edge by which DFS first discovered that vertex.
An active vertex is an ancestor, so an edge to it goes backward in DFS ancestry.
Successors finish before predecessors, making reverse postorder topological.
Vertices outside the source's reachable component cannot be discovered by that traversal.
Constant work per vertex and edge sums to O(V+E).
`,
    'jea-8-3': `
A discovered path supplies a possible distance, never shorter than the true minimum.
Taking that edge after the current path would improve the destination's label.
Relaxation stores the better path length found through the edge.
With no improving edge, labels satisfy the shortest-path optimality conditions.
Repeatedly circling a negative cycle keeps producing shorter paths.
The comparison checks whether traveling through this edge improves the current label.
`,
    'jea-9-5': `
All pairs means every possible source and destination vertex combination.
Following predecessors on a cycle can revisit the same unresolved subproblem.
An edge-count limit decreases with recursion and eventually reaches a base case.
A simple path visits each of V vertices at most once, using at most V minus one edges.
A bounded path either uses the prior limit or extends a shorter path by one edge.
No path between the pair means its distance remains infinite.
`,
    'jea-9-6': `
Choosing a middle vertex divides the path into two smaller paths.
Splitting a path near the middle halves its maximum edge allowance.
Zero-edge and one-edge paths are directly known.
Combining two bounded half-paths permits twice as many edges.
Repeated doubling reaches V minus one after about log V layers.
For each vertex pair, the algorithm checks every middle vertex.
`,
    'jea-10-0': `
The model routes an amount from a start to an end through network edges.
An edge cannot carry more than its allowed capacity.
The source is where net flow enters the network.
The sink is where routed flow ultimately exits.
Capacity and conservation rules define which flow assignments are feasible.
`,
    'jea-10-1': `
Capacity is a nonnegative upper limit on flow through an edge.
Internal vertices cannot create or destroy flow, so inflow equals outflow.
Exceeding capacity would violate the edge's resource limit.
The sink has net incoming rather than net outgoing flow.
Outflow minus inflow measures how much flow the vertex produces.
Sending nothing obeys every nonnegative capacity and conservation equation.
`,
    'jea-10-2': `
A cut places the two distinguished vertices on opposite sides.
Only edges crossing from the source side toward the sink side contribute capacity.
All source-to-sink flow must cross that boundary, so capacity limits it.
Flow crossing backward offsets flow crossing forward.
Any cut capacity is an upper bound; a small one is especially informative.
`,
    'jea-10-3': `
Forward residual capacity permits more flow; backward capacity permits undoing flow.
Every edge on an augmenting path must have available residual capacity.
The path can carry only as much as its narrowest residual edge.
No residual edge leaves the reachable set, making its cut capacity match the flow.
A matching flow and cut prove neither can be improved.
Undoing an earlier choice can free capacity for a better later route.
`,
    'jea-11-0': `
The network is useful only when its feasible flows represent original solutions.
Capacity limits encode how many times a resource may appear.
Integral units of flow can represent individual assignments or paths.
If invalid choices produce valid flows, the reduction can return wrong answers.
Optimizing flow must optimize the quantity the original problem asks about.
`,
    'jea-11-1': `
Capacity one prevents any edge from serving two unit flow paths.
Edge disjointness forbids shared edges but permits shared vertices.
Each edge-disjoint path must cross the cut on a different edge.
Integral flow units can be traced into paths from source to sink.
The edge is the scarce resource, so its capacity enforces exclusivity.
`,
    'jea-11-2': `
Splitting a vertex gives flow a single passage through its in and out copies.
All traversals through that vertex must cross its capacity-one connecting edge.
This wiring preserves the direction of each original graph edge.
Internal vertices cannot be shared when their split edge carries at most one unit.
Flow algorithms constrain edges directly, so splitting converts the vertex limit.
`,
    'jea-11-3': `
Sharing an endpoint would match one participant more than once.
The source and sink edges let each vertex carry at most one matching unit.
One unit across a left-to-right edge selects that compatible pair.
Alternating paths can undo old choices and add one more pair.
Every integral flow path chooses one pair, and every matching gives such a flow.
`,
    'jea-11-4': `
Each layer can represent one kind of resource used by a choice.
A unit capacity blocks a second choice from using the same resource.
A complete source-to-sink route picks one compatible item at each layer.
Edges between neighboring layers encode compatibility locally.
Absent connections rule out combinations that are not permitted.
Every allowed flow path must map back to a legal original choice.
`,
    'jea-11-5': `
The selected paths together must include every vertex.
Two predecessors or successors would branch rather than form disjoint paths.
In a DAG, chosen directed links cannot close into a cycle.
Joining two formerly separate pieces reduces the number of paths by one.
Start with V singleton paths; each of M matching links joins two paths.
`,
    'jea-11-6': `
The target team's prospects depend on how competitors' remaining wins are assigned.
That node must route exactly the wins available in its remaining matchup.
A rival cannot be awarded so many wins that it necessarily overtakes the target.
If game wins cannot all be assigned legally, no standings outcome saves the team.
The cut isolates a set whose required wins exceed its allowed total.
`,
    'jea-11-7': `
Leaving a profitable project unselected cuts its source edge and loses profit.
Selecting an unprofitable project cuts its sink edge and pays its cost.
A large prerequisite edge makes choosing a project without its prerequisite too expensive.
Vertices reachable from the source side correspond to accepted projects.
The cut cost accounts for profits forgone and losses accepted.
`,
    'jea-h-1': `
Linear constraints describe which values are allowed while a linear objective scores them.
Feasibility means meeting all inequalities and equalities at once.
The objective is evaluated at each feasible choice of variables.
Flow and capacity equations are linear, so they fit a linear program.
Integer restrictions exclude fractional solutions that an ordinary LP permits.
`,
    'jea-h-2': `
Only points obeying every constraint belong to the feasible region.
One linear inequality selects one side of a hyperplane.
Intersecting the regions allowed by finitely many inequalities yields a polyhedron.
A convex combination of feasible points still satisfies every linear inequality.
Contradictory constraints can leave no point satisfying them all.
An objective may increase indefinitely when the feasible region offers no finite maximum.
`,
    'jea-h-4': `
Dual construction creates another optimization problem from the primal coefficients.
Each primal restriction receives a corresponding dual multiplier.
Each original variable generates a restriction on dual multipliers.
The dual seeks the smallest upper bound on the primal maximum.
The coefficient transformation is symmetric, so dualizing again recovers the primal.
`,
    'jea-h-5': `
Dual feasibility supplies an upper bound for every feasible primal maximum.
An upper bound equal to a feasible value leaves no room for improvement.
Strong duality says attained primal and dual optima have the same value.
Weak duality makes a feasible dual objective an upper bound.
Flow is the primal quantity; a cut gives the matching dual bound.
`,
    'jea-12-0': `
Checking a proposed solution can be simpler than finding one.
Solving the target after transformation would also solve the hard source.
Hardness concerns an algorithm's behavior across arbitrary valid inputs.
Every NP problem reduces to that target, so its efficient solver would solve them all.
A correct reduction must map yes to yes and no to no.
`,
    'jea-12-5': `
Hardness flows from the already-hard source into the target being studied.
If answers changed, a solver for the target would not solve the source.
Clauses enforce each circuit gate's input-output relationship.
A gate variable records the Boolean signal produced at that point.
The constraints force the formula to match the circuit's behavior and output.
Enumerating exponentially many assignments would violate polynomial-time reduction.
`,
    'jea-12-6': `
Each clause is an OR of at most three variables or their negations.
Auxiliary variables connect several short clauses in place of one long clause.
The new formula must have a solution exactly when the old one does.
Otherwise a yes answer for the new problem could falsely certify the original.
3SAT is in NP and remains NP-hard after the reduction.
`,
    'jea-12-10': `
Proper coloring forbids an edge's endpoints from sharing a color.
Variable and clause gadgets encode the formula's two kinds of requirements.
Consistent colors across occurrences represent one assignment to each variable.
The clause gadget enforces the requirement that some literal satisfies its clause.
Both directions ensure that coloring and satisfiability give the same answer.
`,
    'jea-12-8': `
The transformation must be efficient enough to preserve polynomial solvability.
This direction shows a source solution produces a target solution.
This direction lets a target solution certify the original source instance.
Without the reverse direction, a no source could map to a yes target.
A malformed output cannot be passed to a solver for the target problem.
`,
    'jea-12-13': `
Matching structure makes it easier to encode source choices in target instances.
Covering requires every universe element to appear in a chosen set.
Equal subset totals divide the overall sum evenly.
The path must be simple and contain enough edges or vertices under the chosen variant.
Changing a variant can alter the instance encoding and invalidate the proof.
`,
    'jea-12-14': `
SAT already represents Boolean choices and clause requirements.
Color classes naturally represent labels that adjacent vertices must distinguish.
Gadgets reproduce source restrictions inside the target's allowed objects.
Hardness transfers only from a known-hard source in the correct reduction direction.
Structural similarity helps keep the transformation simple and correct.
`,
    qsharp: `
Gates are the operations that transform a qubit's quantum state.
Hadamard gives a fresh zero-state qubit equal-magnitude amplitudes for zero and one.
Measurement yields a classical outcome from the quantum state.
The control qubit determines whether the target operation is applied.
An immutable let binding cannot be assigned a new value.
Q# uses set to update a variable declared mutable.
A simulator models quantum operations on a classical computer for testing.
`,
    qft: `
The transform reexpresses amplitudes in a Fourier-related basis.
Hadamard creates a superposition of zero and one basis states.
Controlled rotations alter phase relationships between basis components.
The standard circuit reverses output qubit order, which swaps correct.
The diagnostic displays the simulated quantum state without a physical device.
Measurement produces classical data according to the state's probabilities.
Resetting returns qubits to zero so they can be safely released or reused.
`
  };

  const course = window.KOAN_COURSES.find(item => item.id === 'advanced-algorithms');
  for (const set of course.sets) {
    const explanations = notes[set.id]?.trim().split(/\r?\n/);
    if (!explanations || explanations.length !== set.koans.length) {
      throw new Error(`Explanation count mismatch: ${set.id}`);
    }
    set.koans.forEach((koan, index) => { koan.why = explanations[index]; });
  }
})();
