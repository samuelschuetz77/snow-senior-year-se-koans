(() => {
  const course = window.KOAN_COURSES.find(item => item.id === 'software-practicum');
  const links = {
    5: {
      2: [[1, 'A failure becomes recognizable only when observed behavior can be compared with an expected result.']],
      3: [[1, 'A fault can stay hidden until a particular input activates it; boundary values are useful because they often supply that input.']],
      4: [[1, 'A previously observed failure can become a permanent regression case once its cause has been repaired.']],
      5: [[2, 'Coverage says which branches ran; the oracle determines whether their outputs were right.']],
      6: [[1, 'A fault in the connection between components may surface only when those components run together.']],
      7: [[2, 'This is the earlier oracle idea viewed from the opposite direction: without a trustworthy expected result, a failing test says little.']],
      8: [[3, 'Zero gives a concrete example of the boundary principle introduced earlier.']],
      9: [[2, 'The earlier oracle koan defined its job; this one asks where the expected answer for a particular case comes from.']],
      10: [[1, 'This returns to the fault-and-failure distinction: the defect can exist long before any behavior goes wrong.']],
      11: [[3, 'The earlier boundary principle becomes a practical method here: test values on both sides of the limit.']],
      12: [[5, 'Both coverage koans separate running a path from checking its result.'], [2, 'The oracle supplies the expected result that a useful assertion must compare against.']],
      13: [[6, 'This makes the earlier integration idea more specific: the contract is where two components must agree.']],
      14: [[4, 'This extends the earlier regression rule from one repaired failure to any behavior worth preserving.']],
      15: [[14, 'A regression test cannot protect behavior if its own result changes unpredictably.']],
      16: [[2, 'The expected outcome in a test case is the oracle made concrete.']],
      17: [[16, 'Property-based testing scales the test-case idea by generating many inputs for one rule.']],
      18: [[16, 'A negative test still needs setup, action, and an expected outcome; the expected outcome is a rejection.']],
      19: [[5, 'The earlier coverage example explains why a high percentage alone cannot identify the failures that matter most.']],
      20: [[16, 'Clear setup and an expected outcome help separate a product defect from a test-setup error.'], [15, 'A flaky test is another case where the feedback itself needs scrutiny.']]
    },
    6: {
      1: [[0, 'Recovery is one concrete way operations protects reliability during a bad release.']],
      2: [[0, 'Keeping a service reliable requires live evidence, so monitoring makes the running system observable.']],
      3: [[1, 'Repeatable deployments make recovery easier by reducing avoidable differences between environments.']],
      4: [[0, 'Load balancing supports the availability goal that operations owns.']],
      5: [[0, 'An incident review improves the reliability work introduced at the start of this reading.']],
      6: [[2, 'Monitoring produces signals; an alert selects one that calls for action.']],
      7: [[6, 'This makes the earlier alert rule concrete: someone must know how to respond.']],
      8: [[1, 'Rollback is a specific recovery path within a rollout plan.']],
      9: [[2, 'Observability explains why collecting metrics, logs, and traces helps operators diagnose a live problem.']],
      10: [[5, 'Lessons from an incident review can become runbook steps for the next response.']],
      11: [[1, 'A canary is a rollout strategy that limits harm if recovery becomes necessary.']],
      12: [[2, 'A measurable service objective gives monitoring a target against which to judge its signals.']],
      13: [[5, 'This revisits incident review and names the useful outcome: changes to the system or process.']],
      14: [[3, 'Configuration drift is the failure mode that repeatable deployment steps aim to prevent.']],
      15: [[4, 'This qualifies the earlier load-balancing claim: spreading requests helps only when each backend can do the work.']],
      16: [[1, 'Recovery includes restoring data, not only rolling back code.']],
      17: [[2, 'A health check is a focused monitoring signal tied to behavior users can actually observe.']],
      18: [[17, 'Watching errors after release extends the health check beyond a one-time pass.'], [12, 'A service objective helps decide whether the new error rate is acceptable.']],
      19: [[11, 'The percentage is the concrete control that makes a canary release gradual.']]
    }
  };

  for (const [id, entries] of Object.entries(links)) {
    const set = course.sets.find(item => item.id === id);
    for (const [index, connections] of Object.entries(entries)) {
      set.koans[Number(index)].connections = connections.map(([priorIndex, bridge]) => ({ index: priorIndex, bridge }));
    }
  }
})();
