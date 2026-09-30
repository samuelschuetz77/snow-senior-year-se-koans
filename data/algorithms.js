(() => {
  const q = (before, answer, after, options = {}) => ({ before, answer, after, ...options });
  const set = (id, title, due, source, koans) => ({ id, title, due, source, koans });
  window.KOAN_COURSES.push({
    id: 'advanced-algorithms',
    title: 'Advanced Algorithms',
    sets: [
      set('preface', 'JEA Preface', 'Aug 26', 'Erickson, Algorithms, Preface', [
        q('The book treats a clear argument for why an algorithm works as part of the algorithm’s ', 'description', '.', { accepts: ['presentation'] }),
        q('An algorithm that works on a few examples still needs a general proof of ', 'correctness', '.'),
        q('When a problem looks intimidating, start by making its input and output ', 'precise', '.', { accepts: ['explicit'] }),
        q('A running-time claim needs an account of how the work changes with input ', 'size', '.'),
        q('An implementation is useful, but the underlying algorithm is an abstract ', 'procedure', '.', { accepts: ['method'] })
      ]),
      set('big-o', 'Big O and asymptotic thinking', 'Sep 2', 'Course Big O page; big-ideas-and-review.md', [
        q('Big O gives an asymptotic upper ', 'bound', ' on growth.'),
        q('For sufficiently large n, a constant factor does not change the asymptotic ', 'class', '.', { accepts: ['order'] }),
        q('The input size must be defined before analyzing running ', 'time', '.'),
        q('If doubling n roughly quadruples the dominant work, the growth is ', 'quadratic', '.'),
        q('A worst-case bound must hold for every input of the stated ', 'size', '.'),
        q('An observed benchmark supports a performance claim, but it does not replace a mathematical ', 'proof', '.', { accepts: ['analysis'] })
      ]),
      set('graphs-heaps', 'Graphs and heaps review', 'Sep 4', 'Sheehy, Data Structures review', [
        q('In an undirected graph, an edge connects two ', 'vertices', '.', { accepts: ['nodes'] }),
        q('A path cannot establish reachability between vertices in different connected ', 'components', '.'),
        q('Breadth-first search finds a minimum-edge path in an ', 'unweighted', ' graph.'),
        q('In a min-heap, a parent key is no larger than either ', 'child', '.'),
        q('A binary heap supports removal of the minimum in logarithmic ', 'time', '.'),
        q('A heap’s array order is only partial; it is not globally ', 'sorted', '.')
      ]),
      set('jea-0-5', 'JEA 0.5 · Describing Algorithms', 'Sep 9', 'Erickson, Algorithms §0.5', [
        q('A complete algorithm description starts by specifying the problem’s inputs and ', 'outputs', '.'),
        q('The “why” part must establish the algorithm’s ', 'correctness', '.'),
        q('A useful specification lets a caller treat the algorithm as a black ', 'box', '.'),
        q('Pseudocode should expose control structure while hiding irrelevant implementation ', 'details', '.'),
        q('A skeptical reader needs an explicit rule for an arbitrary loop ', 'iteration', '.', { accepts: ['step'] }),
        q('An algorithm description should make hidden input assumptions ', 'explicit', '.', { accepts: ['clear'] })
      ]),
      set('jea-0-6', 'JEA 0.6 · Analyzing Algorithms', 'Sep 9', 'Erickson, Algorithms §0.6', [
        q('Testing a handful of cases cannot replace a general correctness ', 'proof', '.'),
        q('A correctness argument must first use a precise problem ', 'specification', '.'),
        q('The book analyzes efficient behavior even in the ', 'worst', ' case.'),
        q('Asymptotic analysis asks how work grows as the input size ', 'grows', '.', { accepts: ['increases'] }),
        q('Counting executions of a representative operation can estimate total running ', 'time', '.'),
        q('A proof about a recursive algorithm often uses ', 'induction', '.')
      ]),
      set('jea-1-6', 'JEA 1.6 · Divide and Conquer', 'Sep 11', 'Erickson, Algorithms §1.6', [
        q('Divide and conquer begins by splitting the instance into smaller instances of the ', 'same', ' problem.'),
        q('The recursive calls solve the smaller instances; the parent must then ', 'combine', ' their answers.'),
        q('The smaller subproblems in the divide-and-conquer pattern are ', 'independent', '.'),
        q('Below a constant-size threshold, the algorithm solves an instance ', 'directly', '.', { accepts: ['immediately'] }),
        q('A correctness proof for divide and conquer typically uses ', 'induction', '.'),
        q('Its running time is commonly expressed by a ', 'recurrence', '.')
      ]),
      set('jea-1-7', 'JEA 1.7 · Recursion Trees', 'Sep 11', 'Erickson, Algorithms §1.7', [
        q('Each node of a recursion tree represents one recursive ', 'subproblem', '.', { accepts: ['call'] }),
        q('A node’s weight counts work outside its recursive ', 'calls', '.'),
        q('The total running time is the sum of the work across all tree ', 'nodes', '.'),
        q('For T(n)=rT(n/c)+f(n), level d contains rᵈ ', 'nodes', '.'),
        q('For T(n)=rT(n/c)+f(n), repeatedly dividing by c gives a recursion tree of logarithmic ', 'height', '.'),
        q('The code makes two recursive calls, so its recursion-tree branching factor is ', 'two', '.', { accepts: ['2'], code: 'def work(n):\n    if n <= 1:\n        return 1\n    return work(n // 2) + work(n // 2) + n' })
      ]),
      set('induction-1', 'Induction 1 · Smallest Counterexample', 'Sep 14', 'Erickson, Proof by Induction notes §1', [
        q('A universal statement claims something about ', 'every', ' member of a set.', { accepts: ['each', 'all'] }),
        q('A smallest-counterexample proof assumes there is a counterexample and chooses the ', 'smallest', ' one.'),
        q('To contradict minimality, derive a still smaller ', 'counterexample', '.'),
        q('A composite integer has a divisor strictly between one and ', 'itself', '.'),
        q('A prime divisor of a proper factor is also a divisor of the original ', 'number', '.'),
        q('A proof by smallest counterexample can be rewritten as a proof by ', 'induction', '.')
      ]),
      set('induction-2', 'Induction 2 · The Axiom', 'Sep 14', 'Erickson, Proof by Induction notes §2', [
        q('The induction hypothesis assumes the claim for smaller ', 'instances', '.', { accepts: ['values', 'cases'] }),
        q('The first directly established case is the ', 'base', ' case.'),
        q('The inductive step must explain how smaller true cases imply the current ', 'case', '.'),
        q('A proof cannot invoke its induction hypothesis on an instance that is not ', 'smaller', '.'),
        q('The base case prevents the inductive argument from receding ', 'forever', '.', { accepts: ['infinitely'] }),
        q('The well-ordering principle says every nonempty set of positive integers has a smallest ', 'element', '.'),
        q('If any counterexample exists, well-ordering guarantees a ', 'smallest', ' counterexample.')
      ]),
      set('induction-3', 'Induction 3 · Stamps and Recursion', 'Sep 14', 'Erickson, Proof by Induction notes §3', [
        q('A recursive algorithm’s correctness proof often mirrors its recursive ', 'structure', '.'),
        q('The proof’s induction hypothesis must match the recursive call’s actual ', 'input', '.', { accepts: ['instance'] }),
        q('If a recursive call skips several sizes, strong induction can assume the claim for all ', 'smaller', ' sizes.'),
        q('When there are several base cases, the proof must establish each one ', 'directly', '.'),
        q('A decreasing measure helps show that recursion eventually ', 'terminates', '.', { accepts: ['stops'] }),
        q('To make n cents with 5-cent stamps, reduce the remaining target by ', 'five', '.', { accepts: ['5'] }),
        q('For the 5- and 7-cent stamp proof, small amounts above 23 need direct base ', 'cases', '.')
      ]),
      set('jea-1-exercises', 'JEA Chapter 1 · Recursion Exercises', 'Sep 16', 'Erickson, Algorithms ch. 1 exercises', [
        q('Before solving a recurrence, identify the work done outside recursive ', 'calls', '.'),
        q('A recursive specification needs a base case to define the smallest ', 'instances', '.', { accepts: ['inputs'] }),
        q('A divide-and-conquer proof must show that the combined answer satisfies the original ', 'specification', '.'),
        q('A reduction is useful only when a solution to the transformed problem can solve the original ', 'problem', '.'),
        q('An input transformation used inside an efficient algorithm must itself be ', 'efficient', '.', { accepts: ['fast'] })
      ]),
      set('jea-2-4', 'JEA 2.4 · Backtracking Pattern', 'Sep 18', 'Erickson, Algorithms §2.4', [
        q('A backtracking call makes one new ', 'decision', ' and delegates the remaining choices.'),
        q('The state passed to recursion must summarize decisions already ', 'made', '.'),
        q('For subset sum, the remaining target records the effect of previously chosen ', 'elements', '.', { accepts: ['numbers'] }),
        q('Two histories that lead to the same game state need the same future ', 'answer', '.', { accepts: ['result'] }),
        q('A first correct backtracking algorithm tries every valid next ', 'choice', '.', { accepts: ['decision'] }),
        q('A recursive subproblem may need to be more general than the originally requested ', 'problem', '.')
      ]),
      set('jea-2-5', 'JEA 2.5 · Text Segmentation', 'Sep 21', 'Erickson, Algorithms §2.5', [
        q('Text segmentation asks whether a string can be split into valid ', 'words', '.'),
        q('The next decision chooses where the first remaining word ', 'ends', '.', { accepts: ['stops'] }),
        q('A candidate first word succeeds only when the remaining suffix is also ', 'splittable', '.', { accepts: ['segmentable'] }),
        q('Earlier split choices can be forgotten once the remaining ', 'suffix', ' is known.'),
        q('The empty string is splittable into zero ', 'words', '.'),
        q('The empty suffix needs no additional word, so it represents a successful ', 'segmentation', '.', { accepts: ['split'], code: 'def splittable(s):\n    if s == "":\n        return True\n    # Try every valid first word.' })
      ]),
      set('jea-2-8', 'JEA 2.8 · Optimal BST Backtracking', 'Sep 18', 'Erickson, Algorithms §2.8', [
        q('When searches have unequal frequencies, a perfectly balanced tree need not minimize total ', 'cost', '.'),
        q('Choosing a root partitions the keys into a left and a right ', 'subtree', '.'),
        q('Every search visits the root, so choosing it adds the sum of the interval’s ', 'frequencies', '.'),
        q('For a fixed root, each subtree must itself be ', 'optimal', '.'),
        q('The empty interval has optimal search cost ', 'zero', '.', { accepts: ['0'] }),
        q('Backtracking tries every candidate ', 'root', ' before taking the minimum.')
      ]),
      set('jea-12-1', 'JEA 12.1 · CircuitSat', 'Sep 23', 'Erickson, Algorithms §12.1', [
        q('CircuitSat asks whether some input assignment makes the circuit output ', 'true', '.'),
        q('With n binary inputs, brute force may inspect 2ⁿ different ', 'assignments', '.', { accepts: ['settings', 'states', 'configurations'] }),
        q('Checking one proposed assignment takes time linear in the circuit’s ', 'size', '.'),
        q('Trying every input assignment takes ', 'exponential', ' time in n.'),
        q('A satisfying assignment gives a short witness for a ', 'yes', ' answer.'),
        q('No proof has ruled out a polynomial-time CircuitSat ', 'algorithm', '.', { accepts: ['solution'] })
      ]),
      set('jea-12-2', 'JEA 12.2 · P versus NP', 'Sep 23', 'Erickson, Algorithms §12.2', [
        q('P consists of decision problems that can be ', 'solved', ' in polynomial time.'),
        q('NP consists of decision problems whose yes certificates can be ', 'verified', ' in polynomial time.', { accepts: ['checked'] }),
        q('A certificate is a proposed proof that a verifier can ', 'check', ' efficiently.', { accepts: ['verify'] }),
        q('CircuitSat’s satisfying input is a yes ', 'certificate', '.', { accepts: ['witness', 'proof'] }),
        q('In co-NP, efficiently checkable certificates establish ', 'no', ' answers.', { blankChars: 3 }),
        q('Every problem in P is also in NP because a verifier can rerun the ', 'solver', '.', { accepts: ['algorithm'] }),
        q('Whether P equals NP is still ', 'unknown', '.', { accepts: ['open', 'unproven', 'unanswered', 'unresolved', 'unsolved', 'unkown', 'unsaswered'] })
      ]),
      set('jea-12-3', 'JEA 12.3 · Hardness and Reductions', 'Sep 23', 'Erickson, Algorithms §12.3; reduction direction reinforced from §12.5', [
        q('An NP-hard problem is at least as hard as every problem in ', 'NP', '.'),
        q('A polynomial-time solution to an NP-hard problem would imply P equals ', 'NP', '.'),
        q('An NP-complete problem is both NP-hard and a member of ', 'NP', '.'),
        q('NP-hardness alone does not establish NP ', 'membership', '.'),
        q('A hardness reduction transforms known-hard instances into instances of the ', 'target', ' problem.'),
        q('The reduction must preserve both yes and ', 'no', ' answers.', { blankChars: 3 }),
        q('The transformation must take ', 'polynomial', ' time to transfer a polynomial-time solver back to the source.')
      ]),
      set('jea-3-4', 'JEA 3.4 · Smart Recursion', 'Sep 28', 'Erickson, Algorithms §3.4', [
        q('Dynamic programming avoids solving the same subproblem ', 'repeatedly', '.', { accepts: ['again'] }),
        q('The hard design step is finding the correct ', 'recurrence', '.'),
        q('A table cannot repair an incorrect recursive ', 'definition', '.', { accepts: ['recurrence'] }),
        q('Before computing a subproblem, compute the subproblems it ', 'depends', ' on.'),
        q('The number of distinct subproblems often determines the memoized algorithm’s ', 'space', ' use.'),
        q('The dictionary prevents repeated work by storing answers in a ', 'cache', '.', { code: 'cache = {}\ndef solve(n):\n    if n in cache:\n        return cache[n]\n    cache[n] = expensive_step(n)\n    return cache[n]' })
      ]),
      set('jea-3-5', 'JEA 3.5 · Greedy Warning', 'Sep 28', 'Erickson, Algorithms §3.5', [
        q('A greedy algorithm commits to the next choice without solving the remaining ', 'subproblems', '.'),
        q('Choosing a locally attractive word prefix can prevent a complete text ', 'segmentation', '.'),
        q('A greedy choice needs a formal proof of ', 'correctness', '.'),
        q('When greedy choice is doubtful, a backtracking recurrence explores the alternatives instead of ', 'committing', '.', { accepts: ['choosing'] }),
        q('Dynamic programming can speed up a correct recurrence by reusing subproblem ', 'answers', '.', { accepts: ['solutions'] })
      ]),
      set('jea-3-9', 'JEA 3.9 · Optimal BST Dynamic Programming', 'Sep 30', 'Erickson, Algorithms §3.9', [
        q('The optimal BST subproblem is determined by the left and right endpoints of a key ', 'interval', '.'),
        q('The interval frequency sum can be precomputed to avoid repeated ', 'summation', '.', { accepts: ['addition'] }),
        q('For each interval, the recurrence tries every possible ', 'root', '.'),
        q('The empty-interval base case has cost ', 'zero', '.', { accepts: ['0'] }),
        q('A table entry can be filled only after its shorter dependent intervals are ', 'known', '.', { accepts: ['computed', 'solved'] }),
        q('There are quadratically many intervals and linear work per interval, yielding ', 'cubic', ' time.'),
        q('The base case returns zero because no keys remain in the ', 'interval', '.', { code: 'def opt_cost(i, j):\n    if i > j:\n        return 0\n    return min(cost_with_root(i, j, r) for r in range(i, j + 1))' }),
        q('The input pairs sorted search keys with their access ', 'frequencies', '.'),
        q('Total search cost weights each key’s number of ancestors by its ', 'frequency', '.'),
        q('A frequently searched key may deserve a smaller ', 'depth', '.'),
        q('Choosing a root sends all smaller keys to its ', 'left', ' subtree.'),
        q('For a fixed root, replacing a nonoptimal subtree would lower the whole tree’s ', 'cost', '.'),
        q('The interval frequency total is the same for every candidate ', 'root', '.'),
        q('Extending F(i,k−1) to F(i,k) adds the last key’s ', 'frequency', '.'),
        q('InitF begins each row with a zero-frequency empty ', 'interval', '.'),
        q('Computing all interval frequency totals takes ', 'quadratic', ' time.'),
        q('The two endpoints let OptCost use a two-dimensional ', 'table', '.'),
        q('A nonempty interval depends only on strictly ', 'shorter', ' intervals.'),
        q('A diagonal table fill processes intervals in increasing ', 'length', '.'),
        q('A row-by-row fill processes starting indices from high to ', 'low', '.'),
        q('A column-by-column fill processes ending indices from low to ', 'high', '.'),
        q('With frequencies [3,1], the more frequent first key is the optimal ', 'root', '.'),
        q('To reconstruct the actual tree, save each interval’s chosen ', 'root', '.'),
        q('The OptCost table needs ', 'quadratic', ' space.'),
        q('The interval frequency total can be added after taking the ', 'minimum', ' over root candidates.')
      ]),
      set('jea-4-1', 'JEA 4.1 · Files on Tape', 'Oct 5', 'Erickson, Algorithms §4.1', [
        q('A long tape file placed early increases access cost for many later ', 'files', '.'),
        q('When files are equally likely to be read, sorting by increasing ', 'length', ' minimizes average access cost.'),
        q('Swapping an adjacent short file ahead of a longer file makes the expected cost ', 'smaller', '.', { accepts: ['lower'] }),
        q('The correctness proof improves an out-of-order arrangement by an ', 'exchange', '.'),
        q('A greedy choice needs an exchange proof because local intuition alone may be ', 'wrong', '.'),
        q('With unequal frequencies, ordering decisions must consider both file length and access ', 'frequency', '.', { accepts: ['frequencies'] })
      ]),
      set('jea-4-4', 'JEA 4.4 · Huffman Codes', 'Oct 5', 'Erickson, Algorithms §4.4', [
        q('A prefix-free code has no codeword that is a prefix of another ', 'codeword', '.'),
        q('In the code tree, each character appears at a ', 'leaf', '.'),
        q('A character’s code length is its tree ', 'depth', '.'),
        q('The total encoded length weights each code length by character ', 'frequency', '.'),
        q('Huffman’s greedy step merges the two least ', 'frequent', ' symbols.'),
        q('After a merge, the new combined symbol has the sum of the two original ', 'frequencies', '.'),
        q('Frequent symbols should generally receive ', 'shorter', ' codewords.')
      ]),
      set('jea-4-5', 'JEA 4.5 · Stable Matching', 'Oct 5', 'Erickson, Algorithms §4.5', [
        q('A matching is unstable if two participants prefer each other to their current ', 'partners', '.', { accepts: ['matches'] }),
        q('A stable matching has no ', 'blocking', ' pair.', { accepts: ['unstable'] }),
        q('A proposal algorithm lets rejected participants try their next ', 'choice', '.', { accepts: ['preference'] }),
        q('A participant who receives a better proposal can reject their current tentative ', 'match', '.', { accepts: ['partner'] }),
        q('Resolving one blocking pair by an arbitrary swap can create another, so that naive repair need not ', 'converge', '.', { accepts: ['terminate'] }),
        q('Stable matching concerns preferences, while maximum bipartite matching concerns the number of matched ', 'pairs', '.')
      ]),
      set('jea-7-2', 'JEA 7.2 · MST Safe Edges', 'Oct 9', 'Erickson, Algorithms §7.2', [
        q('The growing MST subgraph remains a ', 'forest', ' so it contains no cycles.'),
        q('An edge joining vertices already in one forest component is ', 'useless', '.'),
        q('A minimum-weight edge leaving a forest component is ', 'safe', '.'),
        q('Adding a safe edge preserves the invariant that the forest extends to a minimum spanning ', 'tree', '.'),
        q('An exchange proof replaces a heavier crossing edge with a lighter ', 'edge', '.'),
        q('The proof assumes distinct weights when it claims the minimum spanning tree is ', 'unique', '.')
      ]),
      set('jea-7-4', 'JEA 7.4 · Jarník’s Algorithm', 'Oct 9', 'Erickson, Algorithms §7.4', [
        q('Jarník’s algorithm grows one nontrivial tree from an arbitrary start ', 'vertex', '.'),
        q('At each step it adds the cheapest edge leaving the current ', 'tree', '.'),
        q('A priority queue retrieves the lowest-weight candidate ', 'edge', '.'),
        q('An extracted edge whose endpoints are both already in the tree is ', 'discarded', '.', { accepts: ['ignored', 'skipped'] }),
        q('Adding a safe edge preserves MST ', 'optimality', '.'),
        q('The set of chosen edges cannot form a ', 'cycle', '.')
      ]),
      set('jea-5-5', 'JEA 5.5 · Whatever-First Search', 'Oct 14', 'Erickson, Algorithms §5.5', [
        q('Whatever-first search answers which vertices are ', 'reachable', ' from a start vertex.'),
        q('The bag stores candidate vertices to explore ', 'later', '.'),
        q('A vertex is marked only the first time it is ', 'removed', ' from the bag.', { accepts: ['taken', 'popped'] }),
        q('A parent pointer records which previously visited vertex discovered the current ', 'vertex', '.'),
        q('The parent edges form a spanning ', 'tree', ' of the reachable component.'),
        q('The exact traversal order depends on the bag’s removal ', 'policy', '.', { accepts: ['order'] })
      ]),
      set('jea-5-6', 'JEA 5.6 · Search Variants', 'Oct 14', 'Erickson, Algorithms §5.6', [
        q('Using a stack as the bag produces depth-first ', 'search', '.'),
        q('Using a queue as the bag produces breadth-first ', 'search', '.'),
        q('A breadth-first tree minimizes the number of edges from the source to each discovered ', 'vertex', '.'),
        q('A priority queue produces best-first ', 'search', '.'),
        q('For weighted shortest paths, the priority of an edge includes the distance already traveled to its ', 'tail', '.', { accepts: ['source'] }),
        q('For widest paths, a path’s width is determined by its lightest ', 'edge', '.'),
        q('This container makes the traversal breadth-first rather than depth-first: ', 'queue', '.', { code: 'from collections import deque\nbag = deque([start])\nwhile bag:\n    vertex = bag.popleft()' })
      ]),
      set('jea-6-1', 'JEA 6.1 · Preorder and Postorder', 'Oct 21', 'Erickson, Algorithms §6.1', [
        q('DFS records a vertex’s preorder time when the recursive call ', 'begins', '.', { accepts: ['starts'] }),
        q('DFS records a vertex’s postorder time when the recursive call ', 'finishes', '.', { accepts: ['ends'] }),
        q('The active intervals of two DFS vertices are disjoint or ', 'nested', '.'),
        q('A vertex is active exactly while it is on the recursion ', 'stack', '.'),
        q('An ancestor’s active interval contains that of its ', 'descendant', '.'),
        q('DFSAll starts a new traversal whenever it finds an unmarked ', 'vertex', '.')
      ]),
      set('jea-6-2', 'JEA 6.2 · Detecting Cycles', 'Oct 23', 'Erickson, Algorithms §6.2', [
        q('A directed acyclic graph contains no directed ', 'cycles', '.'),
        q('An edge to an active DFS vertex reveals a directed ', 'cycle', '.'),
        q('A vertex with no incoming edges in a DAG is a ', 'source', '.'),
        q('A vertex with no outgoing edges in a DAG is a ', 'sink', '.'),
        q('Checking DFS status detects a cycle in linear ', 'time', '.'),
        q('An edge to a finished vertex does not by itself prove a directed ', 'cycle', '.')
      ]),
      set('jea-6-3', 'JEA 6.3 · Topological Sort', 'Oct 23', 'Erickson, Algorithms §6.3', [
        q('A topological order places every edge’s tail before its ', 'head', '.', { accepts: ['destination'] }),
        q('A graph with a directed cycle has no topological ', 'order', '.', { accepts: ['ordering'] }),
        q('Every directed acyclic graph has a topological ', 'ordering', '.', { accepts: ['order'] }),
        q('Reversing DFS postorder produces a topological order of a ', 'DAG', '.'),
        q('A task can begin only after all of its prerequisite tasks are ', 'complete', '.', { accepts: ['finished'] }),
        q('Among ready tasks, more than one valid topological order may ', 'exist', '.')
      ]),
      set('jea-6-5', 'JEA 6.5 · Strong Connectivity', 'Oct 26', 'Erickson, Algorithms §6.5', [
        q('Two vertices are strongly connected when each can ', 'reach', ' the other.'),
        q('A strongly connected component is maximal under mutual ', 'reachability', '.'),
        q('Contracting each strong component produces an acyclic ', 'graph', '.', { accepts: ['DAG'] }),
        q('A directed graph is strongly connected when it has exactly one strong ', 'component', '.'),
        q('Intersecting forward and reverse reachability from v gives its strong ', 'component', '.'),
        q('Reversing all graph edges helps find vertices that can reach a given ', 'vertex', '.')
      ]),
      set('jea-6-6', 'JEA 6.6 · SCCs in Linear Time', 'Oct 26', 'Erickson, Algorithms §6.6', [
        q('Each strong component contains one DFS vertex with no parent inside that ', 'component', '.'),
        q('That distinguished vertex is the component’s DFS ', 'root', '.'),
        q('A strong component appears as a connected subtree within the DFS ', 'forest', '.'),
        q('Repeatedly searching every component independently can waste work; a linear-time SCC algorithm reuses DFS ', 'structure', '.'),
        q('The condensation graph of SCCs is a ', 'DAG', '.'),
        q('An SCC algorithm running in O(V+E) is ', 'linear', ' in graph size.')
      ]),
      set('jea-6-exercises', 'JEA Chapter 6 · DFS Exercises', 'Oct 28', 'Erickson, Algorithms ch. 6 exercises', [
        q('In a DFS forest, parent pointers record tree ', 'edges', '.'),
        q('An edge to a currently active vertex is a back ', 'edge', '.'),
        q('A DAG’s vertices can be processed in reverse DFS ', 'postorder', '.'),
        q('If a graph has several components, a single DFS from one source may leave vertices ', 'unvisited', '.', { accepts: ['unmarked'] }),
        q('A linear graph algorithm should process each vertex and edge only a constant number of ', 'times', '.')
      ]),
      set('jea-8-3', 'JEA 8.3 · Shortest-Path Relaxation', 'Oct 30', 'Erickson, Algorithms §8.3', [
        q('A tentative distance is an upper bound on the shortest-path ', 'distance', '.'),
        q('An edge is tense if it offers a shorter path to its ', 'destination', '.', { accepts: ['head'] }),
        q('Relaxation replaces an overestimate with a smaller tentative ', 'distance', '.'),
        q('When no tense edge remains, the distance labels are ', 'correct', '.', { accepts: ['optimal'] }),
        q('A reachable negative cycle prevents the generic algorithm from ', 'terminating', '.', { accepts: ['stopping'] }),
        q('The condition identifies an edge that offers a shorter path, also called a ', 'tense', ' edge.', { code: 'if dist[u] + weight[u, v] < dist[v]:\n    dist[v] = dist[u] + weight[u, v]\n    parent[v] = u' })
      ]),
      set('jea-9-5', 'JEA 9.5 · APSP Dynamic Programming', 'Nov 2', 'Erickson, Algorithms §9.5', [
        q('All-pairs shortest paths asks for distances between every ordered pair of ', 'vertices', '.'),
        q('A recurrence that merely follows predecessor edges can loop forever on a directed ', 'cycle', '.'),
        q('Limiting paths by their number of edges makes the recursive subproblem ', 'finite', '.', { accepts: ['well-founded'] }),
        q('Without negative cycles, a shortest simple path uses at most V−1 ', 'edges', '.'),
        q('The dynamic program can either keep the old path or add one final ', 'edge', '.'),
        q('An unreachable pair retains distance ', 'infinity', '.', { accepts: ['infinite'] })
      ]),
      set('jea-9-6', 'JEA 9.6 · APSP Divide and Conquer', 'Nov 2', 'Erickson, Algorithms §9.6', [
        q('This recurrence splits a path at an intermediate ', 'vertex', '.'),
        q('Each half-path uses at most half the allowed number of ', 'edges', '.'),
        q('The base case handles paths with at most one ', 'edge', '.'),
        q('Path-length bounds double between consecutive DP ', 'layers', '.'),
        q('Only logarithmically many path-length layers are needed to exceed V−1 ', 'edges', '.'),
        q('Trying every possible middle vertex for every pair takes cubic work per ', 'layer', '.')
      ]),
      set('jea-10-0', 'JEA 10.0 · Flow Problems', 'Nov 4', 'Erickson, Algorithms ch. 10 introduction', [
        q('A flow problem asks how much can move through a constrained ', 'network', '.'),
        q('Each edge limits the amount that can pass through by its ', 'capacity', '.'),
        q('The network has a distinguished starting vertex called the ', 'source', '.'),
        q('Flow is collected at a distinguished vertex called the ', 'sink', '.'),
        q('The goal is to maximize total flow while respecting every ', 'constraint', '.')
      ]),
      set('jea-10-1', 'JEA 10.1 · Flow Networks', 'Nov 4', 'Erickson, Algorithms §10.1', [
        q('A flow network gives each directed edge a nonnegative ', 'capacity', '.'),
        q('At an internal vertex, total incoming flow equals total outgoing ', 'flow', '.'),
        q('The flow on an edge may not exceed its ', 'capacity', '.'),
        q('A source produces net flow; a sink ', 'absorbs', ' it.', { accepts: ['receives'] }),
        q('Incoming flow is subtracted so this expression measures net ', 'outflow', '.', { code: 'flow = sum(outgoing[source]) - sum(incoming[source])' }),
        q('A zero flow satisfies all capacity and conservation ', 'constraints', '.')
      ]),
      set('jea-10-2', 'JEA 10.2 · Cuts', 'Nov 4', 'Erickson, Algorithms §10.2', [
        q('A source–sink cut separates the source from the ', 'sink', '.'),
        q('Cut capacity counts edges directed from the source side to the ', 'sink', ' side.'),
        q('Every feasible flow value is bounded above by every cut’s ', 'capacity', '.'),
        q('Backward edges across a cut contribute negative net ', 'flow', '.'),
        q('Finding a small cut proves an upper bound on maximum ', 'flow', '.')
      ]),
      set('jea-10-3', 'JEA 10.3 · Maxflow–Mincut', 'Nov 4', 'Erickson, Algorithms §10.3', [
        q('A residual edge shows how much additional flow can be sent or ', 'canceled', '.', { accepts: ['undone'] }),
        q('An augmenting path runs from source to sink in the residual ', 'graph', '.'),
        q('The smallest residual capacity on an augmenting path limits the ', 'augmentation', '.', { accepts: ['increase'] }),
        q('If no augmenting path remains, the reachable residual vertices identify a minimum ', 'cut', '.'),
        q('At the optimum, maximum flow value equals minimum cut ', 'capacity', '.'),
        q('A backward residual edge lets a later path revise an earlier flow ', 'choice', '.', { accepts: ['decision'] })
      ]),
      set('jea-11-0', 'JEA 11.0 · Modeling with Flow', 'Nov 6', 'Erickson, Algorithms ch. 11 introduction', [
        q('A reduction to flow represents a feasible solution as a network ', 'flow', '.'),
        q('Capacities encode how often a resource can be ', 'used', '.'),
        q('An integral flow can often be decomposed into discrete ', 'choices', '.'),
        q('A good network model must exclude invalid original ', 'solutions', '.'),
        q('The flow value should correspond to the original objective being ', 'maximized', '.')
      ]),
      set('jea-11-1', 'JEA 11.1 · Edge-Disjoint Paths', 'Nov 6', 'Erickson, Algorithms §11.1', [
        q('Giving every edge capacity one makes an integral flow count edge-disjoint ', 'paths', '.'),
        q('Two edge-disjoint paths may still share a ', 'vertex', '.'),
        q('The minimum edge cut limits how many edge-disjoint paths can ', 'exist', '.'),
        q('A unit-capacity integral flow can be decomposed into source–sink ', 'paths', '.'),
        q('Shared edges are the resource that must be constrained by ', 'capacity', '.')
      ]),
      set('jea-11-2', 'JEA 11.2 · Vertex-Disjoint Paths', 'Nov 6', 'Erickson, Algorithms §11.2', [
        q('To limit use of a vertex, split it into an in-node and an ', 'out-node', '.', { accepts: ['out node'] }),
        q('A capacity-one edge between the split nodes limits paths through the original ', 'vertex', '.'),
        q('Ordinary graph edges become connections between one vertex’s out-node and another’s ', 'in-node', '.', { accepts: ['in node'] }),
        q('Vertex-disjoint paths share no internal ', 'vertices', '.'),
        q('Vertex splitting turns a vertex resource constraint into an edge ', 'capacity', '.')
      ]),
      set('jea-11-3', 'JEA 11.3 · Bipartite Matching', 'Nov 6', 'Erickson, Algorithms §11.3', [
        q('A matching chooses edges with no shared ', 'endpoints', '.', { accepts: ['vertices'] }),
        q('The flow network connects the source to left vertices and right vertices to the ', 'sink', '.'),
        q('Every selected left-to-right edge represents one matched ', 'pair', '.'),
        q('An augmenting path may replace existing matched pairs to increase matching ', 'size', '.'),
        q('The value of an integral maximum flow equals the maximum matching ', 'size', '.')
      ]),
      set('jea-11-4', 'JEA 11.4 · Tuple Selection', 'Nov 6', 'Erickson, Algorithms §11.4', [
        q('Layered flow networks can model choices involving more than two resource ', 'types', '.', { accepts: ['classes'] }),
        q('Capacity one enforces that a resource is used at most ', 'once', '.'),
        q('A flow path represents one compatible ', 'tuple', '.'),
        q('Flow works here because pair constraints involve only ', 'adjacent', ' resource layers.'),
        q('Connections between layers encode which combinations are ', 'allowed', '.', { accepts: ['compatible'] }),
        q('A valid reduction must prevent flows that correspond to forbidden ', 'selections', '.', { accepts: ['tuples'] })
      ]),
      set('jea-11-5', 'JEA 11.5 · Disjoint-Path Covers', 'Nov 9', 'Erickson, Algorithms §11.5', [
        q('A path cover includes every vertex in at least one directed ', 'path', '.'),
        q('In a vertex-disjoint path cover, every vertex has at most one chosen predecessor and one chosen ', 'successor', '.'),
        q('A DAG prevents chosen successor links from forming a directed ', 'cycle', '.'),
        q('Choosing a matching edge joins two path pieces and reduces the path count by ', 'one', '.'),
        q('For a DAG with V vertices and a matching of size M, the minimum disjoint path cover has V−M ', 'paths', '.')
      ]),
      set('jea-11-6', 'JEA 11.6 · Baseball Elimination', 'Nov 9', 'Erickson, Algorithms §11.6', [
        q('To test whether a team can still win, distribute remaining game wins among its ', 'rivals', '.', { accepts: ['opponents'] }),
        q('A game node carries the number of games remaining between a pair of ', 'teams', '.'),
        q('Team-to-sink capacity limits how many additional wins that rival may ', 'receive', '.', { accepts: ['get'] }),
        q('If all remaining game capacity cannot reach the sink, the team is ', 'eliminated', '.'),
        q('A minimum cut can identify a group of teams that certifies ', 'elimination', '.')
      ]),
      set('jea-11-7', 'JEA 11.7 · Project Selection', 'Nov 9', 'Erickson, Algorithms §11.7', [
        q('A project with positive profit connects from the ', 'source', '.'),
        q('A project with negative profit connects to the ', 'sink', '.'),
        q('A prerequisite edge must have sufficiently large capacity to prevent an invalid ', 'selection', '.'),
        q('The source side of a minimum cut represents projects that are ', 'selected', '.', { accepts: ['chosen'] }),
        q('Minimum cut balances lost positive profit against accepted negative ', 'cost', '.', { accepts: ['profit'] })
      ]),
      set('jea-h-1', 'JEA Extra H.1 · Linear Programs', 'Nov 11', 'Erickson, Extra H §H.1', [
        q('A linear program optimizes a linear objective subject to linear ', 'constraints', '.'),
        q('A feasible assignment satisfies every ', 'constraint', '.'),
        q('The objective assigns a value to each feasible ', 'point', '.', { accepts: ['solution'] }),
        q('A maximum-flow problem can be written as a linear ', 'program', '.'),
        q('Requiring a variable to be an integer changes the model to integer ', 'programming', '.')
      ]),
      set('jea-h-2', 'JEA Extra H.2 · Geometry', 'Nov 11', 'Erickson, Extra H §H.2', [
        q('The feasible region is the set of points satisfying all ', 'constraints', '.'),
        q('A linear inequality defines a ', 'halfspace', '.'),
        q('The intersection of finitely many halfspaces is a ', 'polyhedron', '.'),
        q('A feasible region is convex: it contains the line segment between any two of its ', 'points', '.'),
        q('A linear program with no feasible point is ', 'infeasible', '.'),
        q('If objective values can improve without limit, the program is ', 'unbounded', '.')
      ]),
      set('jea-h-4', 'JEA Extra H.4 · Duality', 'Nov 13', 'Erickson, Extra H §H.4', [
        q('Every primal linear program has a corresponding ', 'dual', ' program.'),
        q('A primal constraint becomes a dual ', 'variable', '.'),
        q('A primal variable becomes a dual ', 'constraint', '.'),
        q('In canonical form, primal maximization corresponds to dual ', 'minimization', '.'),
        q('Taking the dual twice returns the original ', 'primal', '.')
      ]),
      set('jea-h-5', 'JEA Extra H.5 · Fundamental Theorem', 'Nov 13', 'Erickson, Extra H §H.5', [
        q('Weak duality says every feasible primal value is at most every feasible dual ', 'value', '.'),
        q('Equal feasible primal and dual objective values certify ', 'optimality', '.'),
        q('The fundamental theorem says optimal primal and dual values are ', 'equal', '.'),
        q('A feasible dual solution gives an upper bound on a maximization ', 'problem', '.'),
        q('Maxflow–mincut is an instance of a primal–dual ', 'equality', '.')
      ]),
      set('jea-12-0', 'JEA 12.0 · NP-Hardness Revisited', 'Nov 16', 'Erickson, Algorithms ch. 12 introduction', [
        q('A hard problem may be easy to verify even when no fast solving method is ', 'known', '.'),
        q('Polynomial reductions transfer hardness from a known source to a new ', 'target', '.'),
        q('Showing one problem hard requires a proof about all of its ', 'instances', '.'),
        q('An algorithm that solves an NP-hard target in polynomial time would solve every problem in ', 'NP', '.'),
        q('A reduction argument must preserve yes answers in both ', 'directions', '.')
      ]),
      set('jea-12-5', 'JEA 12.5 · Reductions and SAT', 'Nov 18', 'Erickson, Algorithms §12.5', [
        q('To prove a target NP-hard, transform instances of a known hard problem into the ', 'target', '.'),
        q('A reduction must preserve whether the answer is ', 'yes', '.'),
        q('CircuitSat reduces to SAT by describing each gate with logical ', 'clauses', '.'),
        q('A SAT variable for a circuit gate represents that gate’s output ', 'value', '.'),
        q('The formula is satisfiable exactly when the original circuit has a satisfying ', 'input', '.'),
        q('A polynomial reduction cannot enumerate all exponentially many input ', 'assignments', '.')
      ]),
      set('jea-12-6', 'JEA 12.6 · 3SAT', 'Nov 18', 'Erickson, Algorithms §12.6', [
        q('In this chapter, a 3CNF formula is a conjunction of clauses containing exactly three ', 'literals', '.'),
        q('Converting long clauses to three-literal clauses introduces auxiliary ', 'variables', '.'),
        q('The conversion must preserve ', 'satisfiability', '.'),
        q('A satisfying assignment for the new formula implies one for the original ', 'formula', '.'),
        q('3SAT remains NP-', 'complete', '.')
      ]),
      set('jea-12-10', 'JEA 12.10 · Graph Coloring', 'Nov 18', 'Erickson, Algorithms §12.10', [
        q('A proper coloring gives adjacent vertices different ', 'colors', '.'),
        q('The reduction from 3SAT uses gadgets for variables and ', 'clauses', '.'),
        q('A variable gadget must make a consistent truth ', 'choice', '.'),
        q('A clause gadget must be colorable only if at least one literal is ', 'true', '.'),
        q('The reduction must work in both directions: satisfiable formula exactly when the graph is ', 'colorable', '.')
      ]),
      set('jea-12-8', 'JEA 12.8 · Reduction Pattern', 'Nov 20', 'Erickson, Algorithms §12.8', [
        q('First, transform every source instance in polynomial ', 'time', '.'),
        q('Next, prove a yes source instance maps to a yes ', 'target', ' instance.'),
        q('Finally, prove a yes target instance implies a yes ', 'source', ' instance.'),
        q('Proving only one direction allows false ', 'positives', '.', { accepts: ['negatives'] }),
        q('The output instance must be valid for the target ', 'problem', '.')
      ]),
      set('jea-12-13', 'JEA 12.13 · NP-Hard Sources', 'Nov 20', 'Erickson, Algorithms §12.13', [
        q('A source problem is useful when its structure resembles the target’s ', 'constraints', '.'),
        q('Set Cover asks for a small family of sets whose union covers the ', 'universe', '.'),
        q('Partition seeks two subsets with equal total ', 'weight', '.', { accepts: ['sum'] }),
        q('Longest Path asks whether a simple path reaches a specified ', 'length', '.'),
        q('A source problem’s exact variant matters to the reduction’s ', 'proof', '.')
      ]),
      set('jea-12-14', 'JEA 12.14 · Choosing a Source', 'Nov 20', 'Erickson, Algorithms §12.14', [
        q('For a target built from logical choices and clauses, SAT may be a natural ', 'source', '.'),
        q('For a target about assigning labels, coloring may expose the right ', 'structure', '.'),
        q('A good source makes the target’s constraints easy to encode as ', 'gadgets', '.', { accepts: ['choices'] }),
        q('Reducing from an easier problem does not establish target ', 'hardness', '.'),
        q('The best reduction source is chosen for structural fit, not merely name ', 'recognition', '.')
      ]),
      set('qsharp', 'Q# in Y Minutes', 'Dec 2', 'Learn X in Y Minutes, Q# reference', [
        q('A Q# qubit is changed by applying a quantum ', 'gate', '.', { accepts: ['operation'] }),
        q('The H operation puts a fresh qubit into equal ', 'superposition', '.'),
        q('Measuring a qubit returns a classical ', 'result', '.'),
        q('A controlled gate acts on its target according to a control ', 'qubit', '.'),
        q('A value declared with let cannot be ', 'reassigned', '.', { accepts: ['changed'] }),
        q('A mutable value is updated with the ', 'set', ' keyword.'),
        q('A quantum program can run on a classical ', 'simulator', '.')
      ]),
      set('qft', 'Quantum Fourier Transform', 'Dec 4', 'Microsoft Learn, Implement the Quantum Fourier Transform in Q#', [
        q('The QFT changes the basis used to describe quantum ', 'amplitudes', '.'),
        q('A Hadamard gate is used to create ', 'superposition', '.'),
        q('Controlled phase rotations add relative ', 'phases', '.'),
        q('The QFT circuit swaps qubits at the end to correct their reversed ', 'order', '.'),
        q('DumpMachine reports simulator state for ', 'inspection', '.', { accepts: ['debugging'] }),
        q('A measurement turns quantum information into a classical ', 'result', '.'),
        q('ResetAll returns allocated qubits to the zero ', 'state', '.')
      ])
    ]
  });
})();
