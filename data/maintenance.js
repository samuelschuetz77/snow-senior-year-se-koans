(() => {
  const q = (before, answer, after, options = {}) => ({ before, answer, after, ...options });
  const set = (id, title, due, koans) => ({ id, title, due, source: `Feathers, Working Effectively with Legacy Code, chapter ${id}`, koans });
  window.KOAN_COURSES.push({ id: 'software-maintenance', title: 'Software Maintenance', sets: [
    set('1', 'WEWLC 1 · Changing Software', 'Aug 30', [
      q("Adding a feature changes behavior; refactoring ", "improves", " design while preserving behavior."),
      q('A legacy system is difficult to change safely when it lacks ', 'tests', '.'),
      q("A bug fix changes ", "incorrect", " behavior into the intended behavior."),
      q("Optimization aims to ", "improve", " resource use while preserving observable behavior."),
      q('Before changing unfamiliar code, first identify the behavior that must remain ', 'stable', '.', { accepts: ['unchanged'] }),
      q('A safe change needs feedback that detects unintended ', 'effects', '.', { accepts: ['changes', 'regressions'] })
    ]),
    set('2', 'WEWLC 2 · Working with Feedback', 'Aug 30', [
      q("Edit and Pray relies on hope; Cover and Modify ", "uses", " automated tests."),
      q('A fast test gives feedback close to the moment of a ', 'change', '.'),
      q('The shorter the feedback loop, the easier it is to locate the cause of a ', 'failure', '.'),
      q("A test that ", "exercises", " a large system may be slow or hard to diagnose."),
      q("Tests ", "reduce", " uncertainty about existing behavior."),
      q('A green test after a code edit is meaningful only if the test can detect the relevant ', 'error', '.', { accepts: ['failure', 'regression'] })
    ]),
    set('3', 'WEWLC 3 · Sensing and Separation', 'Aug 30', [
      q('A test needs a way to sense whether the code produced the expected ', 'result', '.', { accepts: ['behavior', 'output'] }),
      q("A test also needs to ", "separate", " the code from awkward dependencies."),
      q('A constructor that opens a network connection makes isolated tests ', 'difficult', '.', { accepts: ['hard'] }),
      q('Replacing a dependency with a simple fake can make its effects ', 'observable', '.'),
      q("Separating a unit from its environment can ", "make", " tests faster and more focused."),
      q("In this example, the client parameter ", "creates", " a point of separation.", { code: 'def load_user(client, user_id):\n    return client.get(f"/users/{user_id}")' })
    ]),
    set('4', 'WEWLC 4 · The Seam Model', 'Sep 1', [
      q("A seam is a place where behavior can change without ", "editing", " the code at that place."),
      q('A seam needs an enabling point that selects the alternate ', 'behavior', '.', { accepts: ['implementation'] }),
      q("Passing a collaborator into a constructor can ", "create", " an object seam."),
      q('A seam lets a test substitute a controllable ', 'dependency', '.'),
      q('The value of a seam is in making relevant behavior testable in ', 'isolation', '.'),
      q("If an alternate implementation can be selected by ", "passing", " a parameter, the parameter is an enabling point.")
    ]),
    set('6', 'WEWLC 6 · Time-Constrained Changes', 'Sep 6', [
      q('A sprout method puts new behavior in a separate ', 'method', '.'),
      q('A sprout class puts new behavior in a separate ', 'class', '.'),
      q("A wrap method ", "adds", " behavior around an existing method."),
      q("Sprouting ", "limits", " edits to old code but can leave its design unchanged."),
      q("A wrapper can add a ", "check", " before or after the original call."),
      q("When time is short, isolate new behavior so it can be ", "tested", " without breaking unrelated code.")
    ]),
    set('7', 'WEWLC 7 · Slow Changes', 'Sep 10', [
      q("A five-minute edit can still take hours to release if the ", "build", " and test cycle is slow."),
      q('A long build delays the feedback needed to diagnose a ', 'mistake', '.', { accepts: ['failure'] }),
      q('Separating modules can reduce the amount of code that must be ', 'built', '.', { accepts: ['compiled'] }),
      q("A focused test harness ", "shortens", " the time from code edit to feedback."),
      q('Understanding a large tangled area is harder when responsibilities are ', 'mixed', '.', { accepts: ['entangled'] }),
      q('Improving change speed often requires changing the surrounding development ', 'system', '.', { accepts: ['process', 'workflow'] })
    ]),
    set('8', 'WEWLC 8 · Adding a Feature', 'Sep 13', [
      q("Before adding a feature, ", "identify", " the existing behavior it might affect."),
      q("A new feature should have tests for the new behavior and nearby ", "existing", " behavior."),
      q("Sprouting new code can ", "avoid", " risky edits to an untested area."),
      q('Repeated sprouting without cleanup can leave design ', 'fragmented', '.', { accepts: ['messy'] }),
      q('Refactoring becomes safer after current behavior is covered by ', 'tests', '.'),
      q("The most useful feature test ", "describes", " an observable outcome, not a private implementation detail.")
    ]),
    set('9', 'WEWLC 9 · Class Test Harness', 'Sep 15', [
      q("A class is hard to test when its constructor ", "requires", " a chain of dependencies."),
      q("A constructor that ", "sends", " email has an unwanted test side effect."),
      q("A fake collaborator can ", "replace", " an external service in a test."),
      q('Extracting construction logic can leave the tested class easier to ', 'instantiate', '.', { accepts: ['create'] }),
      q("A dependency-breaking change should ", "preserve", " production behavior."),
      q("The harness should ", "include", " only the collaborators needed for the behavior under test.")
    ]),
    set('10', 'WEWLC 10 · Method Test Harness', 'Sep 17', [
      q("Getting a class into a harness does not ", "guarantee", " its target method is easy to test."),
      q('A long method with many dependencies may need smaller testable ', 'pieces', '.', { accepts: ['units'] }),
      q('Extracting a method object can make a complex computation independently ', 'testable', '.'),
      q("A hidden global read makes a method’s result ", "depend", " on external state."),
      q("A focused seam lets the test ", "control", " only the dependency relevant to the behavior."),
      q("Refactoring to expose a test point should ", "preserve", " the original method’s behavior.")
    ]),
    set('11', 'WEWLC 11 · Choosing Methods to Test', 'Sep 20', [
      q("A characterization test ", "records", " what code currently does."),
      q("An effect sketch maps how a planned change could ", "affect", " other behavior."),
      q('Tests belong at points where the effects of a change are ', 'observable', '.'),
      q('A test of only the edited method may miss effects in its ', 'callers', '.', { accepts: ['consumers'] }),
      q("Risky dependencies ", "deserve", " more test attention than unrelated paths."),
      q('If a method’s return changes downstream behavior, trace that ', 'effect', ' before choosing tests.')
    ]),
    set('12', 'WEWLC 12 · Many Changes in One Area', 'Sep 22', [
      q('When several classes change together, testing one level back can cover their combined ', 'behavior', '.'),
      q("A test at a public interface can ", "exercise", " multiple private methods."),
      q("A higher-level test may avoid ", "breaking", " every lower-level dependency."),
      q('The test boundary should still be close enough to give useful ', 'feedback', '.'),
      q("A broad test can ", "protect", " a change but may be slower to diagnose."),
      q('Choose the seam that covers the risky interaction with the least setup ', 'cost', '.')
    ]),
    set('13', 'WEWLC 13 · What Tests to Write', 'Sep 27', [
      q("A characterization test ", "records", " observed behavior before a risky change."),
      q('A surprising characterization result may reveal an undocumented ', 'rule', '.', { accepts: ['behavior'] }),
      q("Tests for planned changes should ", "cover", " behavior near the edit’s boundary."),
      q("A test that only ", "repeats", " the implementation misses the system’s observable contract."),
      q("When an old bug is confirmed, the new test should ", "describe", " the desired behavior."),
      q("After a later edit, this test can ", "catch", " a discount regression.", { code: 'def test_old_discount_still_applies():\n    assert price_for(member=True) == 90' })
    ]),
    set('14', 'WEWLC 14 · Library Dependencies', 'Sep 29', [
      q("Scattering ", "calls", " to a vendor library across an app increases coupling."),
      q("A thin adapter ", "creates", " one place to translate between app and library interfaces."),
      q("An adapter makes the vendor dependency easier to ", "replace", " or fake."),
      q('A vendor price change can become a technical risk when the library is hard to ', 'replace', '.'),
      q("Tests of app logic can ", "substitute", " the adapter rather than load the real library."),
      q("The wrapper should ", "expose", " operations the app needs, not every vendor feature."),
      q("This class confines vendor ", "calls", " behind an application interface.", { code: 'class Payments:\n    def __init__(self, gateway):\n        self.gateway = gateway\n    def charge(self, order):\n        return self.gateway.submit(order.total)' })
    ]),
    set('15', 'WEWLC 15 · API-Heavy Applications', 'Oct 1', [
      q('Code that mostly calls APIs still needs tests for the order and meaning of those ', 'calls', '.'),
      q("A fake API can ", "record", " what was requested without contacting the real service."),
      q("A unit test of orchestration should ", "check", " the app’s decisions, not retest the vendor library."),
      q("An API boundary is a useful seam for ", "controlling", " test behavior."),
      q('External API failures should be handled according to an explicit app ', 'policy', '.'),
      q("If two calls must happen in sequence, a test can ", "check", " their order.")
    ])
  ] });
})();
