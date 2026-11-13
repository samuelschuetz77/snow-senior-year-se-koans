(() => {
  const course = window.KOAN_COURSES.find(item => item.id === 'advanced-algorithms');
  if (!course) throw new Error('Advanced Algorithms course is missing');
  const q = (before, answer, after, why, section, expoundText, options = {}) =>
    ({ before, answer, after, why, section, expoundText, ...options });
  const diagram = (nodes, edges, caption, description) => ({ nodes, edges, caption, description });
  const residualPair = (forward, back, caption, target = 'a') => diagram(
    [['s', 80, 110], [target, 440, 110]],
    [['s', target, `send ${forward}`, 0, 13], [target, 's', `undo ${back}`, 0, 13, 'reverse']],
    caption,
    `Two straight arrows between s and ${target}. The forward arrow can send ${forward} more units; the backward arrow can undo ${back} units of earlier flow.`
  );
  const residualChain = (firstForward, firstBack, secondForward, secondBack, caption) => diagram(
    [['s', 65, 110], ['a', 260, 110], ['t', 455, 110]],
    [['s', 'a', `send ${firstForward}`, 0, 13], ['a', 's', `undo ${firstBack}`, 0, 13, 'reverse'],
      ['a', 't', `send ${secondForward}`, 0, 13], ['t', 'a', `undo ${secondBack}`, 0, 13, 'reverse']],
    caption,
    `Residual path s to a to t. The forward arrows can send ${firstForward} and ${secondForward} more units; the backward arrows can undo ${firstBack} and ${secondBack} units of earlier flow.`
  );

  const warmups = [
    q('The vertex marked s is the ', 'source', ', where flow enters this network.',
      'The source is the designated starting vertex; the sink t is the destination.',
      'Pipe warmup',
      'A flow network is a directed graph with capacities on edges and two special vertices, also called nodes. The source s supplies the net flow, and the sink t receives it. The straight pipe represents a directed edge, while its number limits how much can pass through. These roles are chosen as part of the problem, not inferred from physical shape.',
      { diagram: diagram([['s', 80, 110], ['t', 440, 110]], [['s', 't', '4']],
        'The number on the pipe is its capacity.', 'One directed pipe from source s to sink t, capacity four.') }),
    q('A single s → t pipe with capacity 4 supports a maximum flow of ', '4', ' units.',
      'There is one route, so its capacity is both an achievable flow and an upper bound.',
      'Pipe warmup',
      'Sending four units from s to t respects the edge capacity and reaches the sink, so four is feasible. Any flow above four would exceed the only pipe’s capacity. This gives a matching upper bound, proving the maximum. On larger networks, the upper bound may come from a set of edges across a cut rather than just one pipe.',
      { diagram: diagram([['s', 80, 110], ['t', 440, 110]], [['s', 't', '4']],
        'The number on the pipe is its capacity.', 'One directed pipe from s to t, capacity four.') }),
    q('For pipes in a row with capacities 7 and 3, the maximum s-to-t flow is ', '3', ' units.',
      'Every unit must cross both pipes, so the narrower pipe limits the route.',
      'Pipe warmup',
      'The intermediate vertex a cannot create flow. Whatever enters it must leave it, so the same delivered units cross both pipes. The a-to-t pipe holds at most three, making three an upper bound. Sending three through both pipes is feasible, so the bound is tight. This is the simplest example of a path bottleneck.',
      { diagram: diagram([['s', 65, 110], ['a', 260, 110], ['t', 455, 110]], [['s', 'a', '7'], ['a', 't', '3']],
        'Numbers on pipes are capacities.', 'A straight chain s to a with capacity seven, then a to t with capacity three.') }),
    q('Two separate s-to-t routes of capacities 2 and 3 can carry ', '5', ' units together.',
      'The routes share only s and t, so their independent capacities add.',
      'Pipe warmup',
      'The upper route can carry two units and the lower route can carry three. At a and b, inflow equals outflow, and neither route exceeds its pipe limits. The total leaving s and entering t is five. The two source pipes together have capacity five, so no flow can do better. Separate routes add when they do not share a narrower edge.',
      { diagram: diagram([['s', 55, 110], ['a', 260, 40], ['b', 260, 180], ['t', 465, 110]],
        [['s', 'a', '2'], ['a', 't', '2'], ['s', 'b', '3'], ['b', 't', '3']],
        'Numbers on pipes are capacities.', 'Two disjoint routes: s to a to t with capacity two on each pipe, and s to b to t with capacity three on each pipe.') }),
    q('Even with several upstream routes, the single c → t pipe caps total flow at ', '4', ' units.',
      'Every route to t shares the final pipe of capacity four.',
      'Pipe warmup',
      'The upstream network can supply enough flow to c: three units through a and at least one through b. Yet every delivered unit must cross c-to-t, whose capacity is four. Sending three along s-a-c-t and one along s-b-c-t attains four. This shared final pipe is a cut of capacity four and proves the maximum without enumerating all possible assignments.',
      { diagram: diagram([['s', 35, 110], ['a', 170, 40], ['b', 170, 180], ['c', 335, 110], ['t', 485, 110]],
        [['s', 'a', '4'], ['s', 'b', '2'], ['a', 'c', '3'], ['b', 'c', '2'], ['c', 't', '4']],
        'Numbers on pipes are capacities.', 'Two routes merge at c. The only pipe from c to t has capacity four.') }),
    q('If 3 units enter a and 1 leaves toward b, then ', '2', ' units must leave toward t.',
      'Conservation requires total flow leaving a to equal the three units entering it.',
      'Pipe warmup',
      'An intermediate vertex, or node, cannot store or manufacture flow in the standard model. Three units enter a. One unit leaves along a-to-b, so the remaining two must leave along a-to-t for the outgoing total to be three. These labels are current flows, not edge capacities; capacities would only tell us upper limits, not the exact missing flow.',
      { diagram: diagram([['s', 50, 110], ['a', 245, 110], ['b', 450, 45], ['t', 450, 175]],
        [['s', 'a', '3', 3], ['a', 'b', '1', 1], ['b', 't', '1', 1], ['a', 't', '?']],
        'Numbers are current flows; ? is the missing flow.', 'Three units flow from s to a. One flows from a to b and onward to t. The flow from a directly to t is unknown.') }),
    q('After sending 2 through a pipe of capacity 5, its forward residual room is ', '3', ' units.',
      'Subtract the current flow from capacity: five minus two leaves three.',
      'Pipe warmup',
      'The label 2 / 5 means two units currently flow through a pipe that can carry five. Three more units could be sent in the same direction. The residual graph records that forward room as three and shows that two units of earlier flow could be undone. This is the bridge from a pipe picture to the code’s residual[u][v] entries.',
      { diagram: diagram([['s', 65, 110], ['a', 260, 110], ['t', 455, 110]],
        [['s', 'a', '2 / 5', 2], ['a', 't', '2 / 5', 2]],
        'Each label is current flow / capacity.', 'Two units flow from s to a and from a to t; each pipe has capacity five.') })
  ];

  const overview = [
    q('The maximum-flow problem asks for the greatest amount that can travel from a source to a ', 'sink', ' without breaking pipe limits.',
      'The objective is total delivered flow, subject to capacities and conservation at intermediate nodes.',
      'Algorithm overview',
      'A flow network gives directed edges capacities and names a source and sink. A proposed solution assigns a flow amount to each edge. It is legal only when no amount exceeds its capacity and each intermediate vertex passes along everything it receives. Of all legal assignments, maximum flow has the greatest net amount delivered from source to sink. The pipe picture is an analogy for this directed graph problem.'),
    q('The augmenting-path methods begin with zero flow, which is already a ', 'feasible', ' assignment.',
      'Zero respects every nonnegative capacity and balances every intermediate node.',
      'Algorithm overview',
      'Starting with no flow gives a simple legal baseline: every pipe carries zero, so none exceeds its limit and every internal node has equal zero inflow and outflow. The algorithms improve this assignment one path at a time. Each improvement must remain legal. This starting point assumes the ordinary maximum-flow model without required minimum flows or mandatory delivery demands.'),
    q('Before looking for another route, the algorithm computes a residual network of remaining ', 'room', '.',
      'Residual means room left: forward to send more, backward to undo some flow.',
      'Algorithm overview',
      'Capacity is the original pipe limit. Once flow moves, capacity alone no longer tells us what we can do next. The residual graph keeps two kinds of room: forward room to send more, and backward room to undo earlier flow. Find the next route using that room. Backward room lets a later route revise an earlier choice.'),
    q('Each round searches for a positive-room path from source to sink; BFS and stack DFS differ in which path they ', 'choose', '.',
      'The path-selection rule changes the work done, while the residual update principle is shared.',
      'Algorithm overview',
      'A path qualifies only if every edge on it has positive residual room. Edmonds–Karp BFS chooses a route with the fewest edges. The iterative Ford–Fulkerson version uses a stack to pursue a recently found branch. Both then send the path bottleneck, update the same residual entries, and repeat. Their path choices and runtime guarantees differ, while the underlying flow problem stays the same.',
      { accepts: ['select', 'find'] }),
    q('After finding a path, send its smallest edge room, then subtract that amount going forward and add it to the ', 'backward', ' arrow.',
      'The minimum is the safe bottleneck; the backward arrow records how much earlier flow can be undone.',
      'Algorithm overview',
      'Suppose a path has residual rooms five, two, and four. At most two units can be sent without exceeding an edge. Subtract two from each forward residual entry and add two to each reverse entry. The total flow value rises by two once, regardless of path length. The paired updates preserve a way to undo earlier flow if a later path needs a different arrangement.'),
    q('Repeat the search and update until no source-to-sink residual path remains; that stopping condition proves the flow is ', 'maximum', '.',
      'The final reachable nodes define a cut whose capacity equals the achieved flow value.',
      'Algorithm overview',
      'Keep finding a route with room, sending its smallest room, and updating both directions. Eventually the search cannot reach the sink. The reached nodes and unreached nodes form a split called a cut. Every original pipe crossing that split is full. Add those pipe limits: they equal the flow already sent. Since every possible flow must cross this split, no larger flow is possible.',
      { accepts: ['optimal'] })
  ];

  const koans = [...warmups, ...overview,
    q('In `residual` (room left to send or undo flow), the outer keys identify graph ', 'vertices', ' (also called nodes).',
      'The outer dictionary maps each vertex to an inner dictionary of its outgoing residual edges.',
      'Representation',
      'The helper starts with residual = {} and then assigns residual[u] = {} for each vertex u. Thus residual is a dictionary whose values are dictionaries. A lookup begins with a vertex, then an outgoing neighbor. This shape makes residual[u][v] the remaining room on the directed edge u to v; it is not a flat list of edges.',
      { accepts: ['nodes'], code: 'residual = {}\nfor u in capacity:\n    residual[u] = {}' }),
    q('In `residual[u][v]`, the number is room left; v is an outgoing ', 'neighbor', ' of u.',
      'The second lookup selects v inside u’s adjacency dictionary; the stored number is residual capacity.',
      'Representation',
      'A graph stored as nested dictionaries has one inner map for each vertex. If residual["s"] is {"a": 5}, then a is an outgoing neighbor of s with five units of room. The direction matters: residual["a"]["s"] is a different entry and can hold a different value. Read both indexes before interpreting the number.',
      { code: 'residual[u][v] = capacity[u][v]' }),
    q('Copying capacities (the most each pipe can carry) into `residual` (room left to send or undo flow) keeps the original pipe limits ', 'unchanged', '.',
      'Copy the original limits first. Then change only the copy as flow moves.',
      'Representation',
      'Capacity means the most an original pipe allows. Residual means the room left after we send flow, including room to undo earlier flow. At the start, no flow has moved, so forward residual room equals capacity. The code copies each number into a new dictionary. Later it changes those new numbers, while the original limits stay the same.'),
    q('A missing backward arrow starts with ', 'zero', ' room to undo flow, because nothing has been sent yet.',
      'The helper adds residual[v][u] = 0 only when the reverse entry is absent.',
      'Representation',
      'A reverse residual edge represents the ability to undo a previous forward assignment. Before sending anything from u to v, there is nothing to undo, so that entry starts at zero. After an augmentation, its room grows by the amount sent. The reverse edge is part of the residual computation, even if the original network has no physical v-to-u edge.',
      { accepts: ['0'], code: 'if u not in residual[v]:\n    residual[v][u] = 0' }),
    q('If the input already has an a → s pipe with capacity 2 (a limit of 2), setup must ', 'preserve', ' that 2.',
      'The membership test avoids replacing an original opposite-direction capacity with zero.',
      'Representation',
      'An original a-to-s edge can coexist with an original s-to-a edge. Both are real input capacities. When adding missing residual reverse entries, assigning zero unconditionally would overwrite one of those real edges. The helper checks whether the entry already exists. This is why two passes are useful: first copy all original capacities, then fill only missing reverse directions.',
      { accepts: ['keep', 'retain'], code: 'capacity = {"s": {"a": 5}, "a": {"s": 2}}' }),

    q('If a route has room for 5 on one pipe and 2 on the next, the smallest room is ', '2', ' units.',
      'The path can carry no more than its smallest edge room.',
      'Augmentation',
      'A path augmentation sends the same amount through every edge on that path, preserving flow conservation at internal vertices. One edge has five units of room and the other has two, so sending three would exceed the second edge. Taking the minimum residual capacity along the path gives the largest safe augmentation: two units.',
      { code: 's → a: 5\na → t: 2' }),
    q('Sending 2 units through a pipe with 5 units of forward room leaves room ', '3', ' to send more.',
      'The forward update subtracts the amount sent: 5 minus 2 is 3.',
      'Augmentation',
      'Residual room is unused capacity in a direction, accounting for earlier flow. When two units are pushed through u to v, the forward residual entry decreases from five to three. This update prevents a later path from reusing capacity that is already occupied. The same augmentation also increases the reverse entry so the choice can be revised.',
      { code: 'residual[u][v] = 5\namount = 2\nresidual[u][v] -= amount' }),
    q('After sending flow from u → v, the backward v → u arrow gains room to ', 'cancel', ' earlier flow.',
      'Adding the sent amount to residual[v][u] makes that much flow reversible.',
      'Augmentation',
      'Suppose two units were just sent from u to v. A later residual path may travel from v to u, reducing that earlier assignment by up to two units. This is rerouting, not necessarily physical movement backward. Without reverse residual room, an early path choice could block an optimal arrangement that a later path needs.',
      { accepts: ['undo', 'reverse'], code: 'residual[v][u] += amount' }),
    q('The `_augment` helper traces the route backward from sink to source using each node’s ', 'parent', ' (the node that reached it).',
      'The search records parent[v] = u, so following parents reconstructs the chosen path backward.',
      'Augmentation',
      'When search reaches v from u, it saves parent[v] = u: u is the previous node. Starting at the sink, follow previous nodes until you get back to the source. That recovers the route. Walk that route once to find its smallest room. Walk it again to subtract that amount from forward room and add it to backward room.',
      { code: 'v = sink\nwhile v != source:\n    u = parent[v]\n    v = u' }),
    q('After a bottleneck of 2 is sent, `total` rises by ', '2', ' rather than by the number of path edges.',
      'Flow value increases by the amount delivered along the whole source-to-sink path.',
      'Augmentation',
      'Imagine two units travel s → a → t. They cross two pipes, but they are still the same two units. Add two to total once, because two new units reached the sink. The node a receives two and passes along two. On each pipe, subtract two from forward room and add two to backward room.'),

    q('`deque.popleft()` removes the oldest waiting node, so Edmonds–Karp searches in ', 'FIFO', ' order.',
      'A queue removes the oldest item first, giving breadth-first exploration.',
      'Edmonds–Karp',
      'Edmonds–Karp chooses augmenting paths with breadth-first search. New discoveries are appended at the back of the deque, and popleft removes the oldest unprocessed vertex. That ordering finishes one edge-count layer before moving to the next. It gives a shortest augmenting path by number of residual edges, regardless of their capacities.',
      { code: 'queue = deque([source])\nu = queue.popleft()' }),
    q('The check `room > 0` skips a pipe with no room left; it is ', 'full', ' in that direction.',
      'An edge with zero remaining room cannot support a positive augmentation.',
      'Edmonds–Karp',
      'A residual search may traverse only edges with positive remaining capacity. If room is zero, sending any positive amount would exceed what that direction allows. A reverse entry can later become positive after forward flow is sent, at which point it becomes traversable for cancellation. The parent check independently prevents rediscovering the same vertex during one search.',
      { accepts: ['saturated'], code: 'if room > 0 and v not in parent:' }),
    q('`parent[v] = u` records the edge by which BFS first ', 'discovered', ' v.',
      'The first discovery fixes a shortest-edge-count route from source to v.',
      'Edmonds–Karp',
      'BFS starts with parent[source] = None and explores outward in layers. On first reaching v from u, it stores u as v’s predecessor. Because the queue processes nearer layers first, this parent chain has the fewest residual edges among paths to v. The dictionary also serves as the visited set, avoiding cycles and repeated queue entries.',
      { accepts: ['reached', 'visited'], code: 'parent = {source: None}\n...\nparent[v] = u' }),
    q('A new `parent` dictionary is made for each path search so earlier visits do not ', 'block', ' later routes.',
      'After residual updates, vertices need to be discoverable again through newly available edges.',
      'Edmonds–Karp',
      'The parent dictionary serves two jobs during one search: it marks discovered vertices and stores their predecessors. It must be reset before the next search because residual capacities may have changed, including newly available reverse edges. Keeping the old visited marks would wrongly prevent the algorithm from exploring routes that are now useful. The stack DFS version also resets parent for each augmentation.',
      { accepts: ['prevent'], code: 'while True:\n    parent = {source: None}\n    queue = deque([source])' }),
    q('BFS chooses the route with the fewest ', 'edges', ' (pipes), even if another route has more room.',
      'Shortest here means edge count, not largest capacity or greatest possible augmentation.',
      'Edmonds–Karp',
      'BFS checks nearby nodes before farther nodes. That means it finds a route with the fewest pipes, even if another route could carry more right now. It still sends the smallest room on its chosen route, updates forward and backward room, and searches again. This path rule gives Edmonds–Karp a predictable polynomial running-time bound.'),
    q('If BFS cannot reach the sink using pipes with room, no source-to-sink ', 'path', ' remains.',
      'The search has exhausted all reachable positive-room edges without reaching the sink.',
      'Edmonds–Karp',
      'The algorithm returns only after BFS fails to reach the sink through positive residual edges. At that point no further augmentation is possible. The vertices reached by BFS form the source side of a cut whose forward original edges are saturated; its capacity matches the current feasible flow. This is the max-flow min-cut certificate of optimality.',
      { code: 'if sink not in parent:\n    return total' }),
    q('When no route with room reaches the sink, reachable nodes form one side of a minimum ', 'cut', ' (a split between source and sink).',
      'No positive-room edge crosses from that reachable side to the unreachable sink side.',
      'Edmonds–Karp',
      'A cut splits the nodes into two groups: the source side and the sink side. After the final search, put every reached node on the source side. The sink is on the other side because the search could not reach it. Every original pipe crossing from the reached side to the other side has no forward room left. Their pipe limits add to the flow already sent, so that flow is maximum.'),

    q('`stack.pop()` removes the newest waiting node, so stack DFS explores that node ', 'first', '.',
      'A stack is last in, first out, so its search is depth-first.',
      'Stack DFS',
      'The iterative version stores pending vertices in a list used as a stack. pop removes the last appended vertex, giving recently discovered branches priority. This may find a different augmenting path than BFS. The residual update is unchanged: find a path, compute its bottleneck, adjust both directions, and repeat until no path remains.',
      { code: 'stack = [source]\nu = stack.pop()' }),
    q('The check `v not in parent` stops DFS from revisiting the same node in a ', 'cycle', ' (a loop).',
      'The parent dictionary doubles as a visited set during one path search.',
      'Stack DFS',
      'Residual graphs commonly contain cycles because every sent edge gains a reverse direction. A DFS that follows positive edges without marking visits can revisit vertices indefinitely. Adding v to parent on discovery both records how the path reached it and prevents re-entering it during the current search. A new parent dictionary is made for the next augmentation.',
      { code: 'if room > 0 and v not in parent:' }),
    q('DFS may choose a longer route than BFS, but any full route with room still increases total ', 'flow', '.',
      'Both searches use the same bottleneck and residual updates after finding a path.',
      'Stack DFS',
      'Ford–Fulkerson is the general augmenting-path idea; BFS and DFS are choices for finding a path. A positive bottleneck increases the flow value while preserving capacity and conservation. For integer capacities, each augmentation raises the integer value by at least one, so the simple DFS versions terminate, though poor path choices can require many augmentations.'),
    q('With integer capacities, every successful DFS augmentation raises the integer total by at least ', 'one', ' unit.',
      'A positive integer bottleneck cannot be smaller than one.',
      'Stack DFS',
      'Starting from zero, integer capacities keep every residual capacity integral. Each found path has a positive integer minimum, so total increases by at least one. The total is bounded by the capacities leaving the source, giving termination. This argument does not give the same polynomial bound as Edmonds–Karp, and arbitrary irrational capacities need more careful treatment.',
      { accepts: ['1'] }),

    q('For s → a = 4, s → b = 2, a → t = 2, a → b = 1, and b → t = 3, maximum flow is ', '5', ' units.',
      'Send two through a → t and three through b → t; the sink cut has capacity five.',
      'BFS and stack DFS transfer',
      'One feasible plan sends two units s-to-a-to-t, one s-to-a-to-b-to-t, and two s-to-b-to-t. All edge limits and conservation hold, so value five is achievable. The two edges entering t have capacities two and three, so their cut bounds every flow by five. Matching the feasible value to that cut proves optimality; both BFS and stack DFS should return five.',
      { code: 'capacity = {\n  "s": {"a": 4, "b": 2},\n  "a": {"t": 2, "b": 1},\n  "b": {"t": 3}\n}' })
  ];

  // Repeat the same short definitions at the bottom of every Max Flow question.
  const meanings = {
    Capacity: 'the most an original pipe can carry.',
    Residual: 'room left to send or undo flow.',
    Flow: 'amount currently sent through the pipes.',
    Source: 'starting node, where flow leaves.',
    Sink: 'ending node, where flow arrives.',
    Node: 'a point where pipes meet; also called vertex.',
    Route: 'a connected way from source to sink.',
    'Backward arrow': 'earlier flow you are allowed to undo.',
    Bottleneck: 'smallest room on the chosen route.',
    Parent: 'previous node on the route found by search.',
    BFS: 'searches nearby nodes before farther nodes.',
    DFS: 'follows one branch before trying another.',
    Cut: 'a split separating source from sink.',
    Queue: 'removes the oldest waiting node first.',
    Stack: 'removes the newest waiting node first.'
  };
  const extraMeanings = [
    ['Source', 'Sink'], ['Source', 'Sink'], ['Route', 'Node'], ['Route', 'Flow'],
    ['Sink', 'Route'], ['Node', 'Flow'], ['Flow', 'Backward arrow'],
    ['Source', 'Sink'], ['Flow', 'Node'], ['Backward arrow', 'Flow'],
    ['Route', 'BFS'], ['Bottleneck', 'Backward arrow'], ['Route', 'Cut'],
    ['Node', 'Flow'], ['Node', 'Backward arrow'], ['Flow', 'Backward arrow'],
    ['Backward arrow', 'Flow'], ['Backward arrow', 'Capacity'],
    ['Route', 'Bottleneck'], ['Flow', 'Backward arrow'], ['Backward arrow', 'Flow'],
    ['Parent', 'Route'], ['Flow', 'Route'],
    ['Queue', 'BFS'], ['Backward arrow', 'Flow'], ['Parent', 'BFS'],
    ['Parent', 'Backward arrow'], ['BFS', 'Bottleneck'], ['BFS', 'Sink'],
    ['Cut', 'Sink'], ['Stack', 'DFS'], ['DFS', 'Parent'],
    ['DFS', 'Route'], ['DFS', 'Flow'], ['Cut', 'Flow']
  ];
  if (extraMeanings.length !== koans.length) throw new Error('Max Flow definitions count mismatch');
  koans.forEach((koan, index) => {
    const terms = [...new Set(['Capacity', 'Residual', ...extraMeanings[index]])];
    koan.definitions = terms.map(term => [term, meanings[term]]);
  });

  // Keep the first code questions visual too: each diagram shows the residual
  // state described by the adjacent question, including flow that can be undone.
  warmups[0].diagram = residualPair(4, 0, 'At zero flow, the pipe can send 4 more units; none can be undone.', 't');
  warmups[1].diagram = residualPair(4, 0, 'One pipe has capacity 4; no earlier flow can be undone yet.', 't');
  warmups[2].diagram = residualChain(7, 0, 3, 0, 'Before sending flow, both backward arrows have room 0.');
  warmups[6].diagram = residualPair(3, 2, 'After sending 2 through capacity 5: send 3 more or undo the earlier 2.');
  const early = koans.filter(koan => ['Algorithm overview', 'Representation', 'Augmentation'].includes(koan.section));
  const earlyDiagrams = [
    residualChain(5, 0, 3, 0, 'The forward rooms limit what can reach the sink.'),
    residualChain(5, 0, 3, 0, 'At zero flow, the original pipes can send their full capacities; there is nothing to undo.'),
    residualChain(3, 2, 1, 2, 'After two units travel s → a → t, the residual graph shows both directions.'),
    residualChain(3, 2, 1, 2, 'A search can send more along a solid arrow or undo flow along a dashed arrow.'),
    residualPair(3, 2, 'Sending 2 on capacity 5 leaves 3 more to send and 2 that can be undone.'),
    residualChain(0, 2, 0, 2, 'No positive forward path reaches t; backward edges only undo earlier flow.'),
    residualPair(5, 0, 'The outer dictionary has node keys s and a; arrows show their neighbor entries.'),
    residualPair(5, 0, 'residual[s][a] is the forward number; residual[a][s] is the backward number.'),
    residualPair(5, 0, 'The original capacity stays 5 while these residual values can change.'),
    residualPair(5, 0, 'The missing backward entry starts at zero because nothing can be undone yet.'),
    diagram([['s', 80, 110], ['a', 440, 110]],
      [['s', 'a', 'cap 5', 0, 13], ['a', 's', 'cap 2', 0, 13]],
      'Both straight arrows are original edges here, so neither capacity is replaced by zero.',
      'Original directed edge s to a has capacity five, and original edge a to s has capacity two.'),
    residualChain(5, 0, 2, 0, 'The path can carry only the smaller forward room: 2.'),
    residualPair(3, 2, 'After sending 2 on capacity 5, forward room is 3.'),
    residualPair(3, 2, 'The backward arrow can undo the 2 units just sent.'),
    residualChain(3, 2, 1, 2, 'Follow parents from t back to a and s to recover the forward path.'),
    residualChain(3, 2, 1, 2, 'Two units sent along both edges increase total flow by 2 once.')
  ];
  if (early.length !== earlyDiagrams.length) throw new Error('Max Flow early diagram count mismatch');
  early.forEach((koan, index) => { koan.diagram = earlyDiagrams[index]; });

  const set = {
    id: 'max-flow-code',
    title: 'Max Flow',
    due: 'Practice · BFS and stack DFS',
    source: 'Erickson, Algorithms §§10.0–10.3; six Python implementations in advanced algorithms/projects or assignments i turn in live here/max_flow.py',
    questionCount: 35,
    codeRatio: 0.46,
    koans
  };
  const after = course.sets.findIndex(item => item.id === 'jea-10-3');
  course.sets.splice(after + 1, 0, set);
})();
