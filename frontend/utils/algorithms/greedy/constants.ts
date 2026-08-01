/**
 * Greedy Algorithms Constants & Theory Definitions
 */

export const GREEDY_ALGORITHMS_THEORY = {
  activitySelection: {
    title: "Activity Selection Problem",
    description: "Given N activities with start and finish times, select the maximum number of mutually compatible activities that can be performed by a single resource.",
    complexities: { best: "O(N log N)", average: "O(N log N)", worst: "O(N log N)", space: "O(1)" },
    pseudocode: [
      { line: 1, text: "function activitySelection(activities):" },
      { line: 2, text: "  sort activities by finish time ascending" },
      { line: 3, text: "  selected = [activities[0]]" },
      { line: 4, text: "  lastFinish = activities[0].finish" },
      { line: 5, text: "  for i from 1 to N-1:" },
      { line: 6, text: "    if activities[i].start >= lastFinish:" },
      { line: 7, text: "      selected.push(activities[i]); lastFinish = activities[i].finish" },
    ]
  },

  fractionalKnapsack: {
    title: "Fractional Knapsack Problem",
    description: "Given items with weights and values, maximize total value in a knapsack of capacity W. Items can be broken into fractions.",
    complexities: { best: "O(N log N)", average: "O(N log N)", worst: "O(N log N)", space: "O(1)" },
    pseudocode: [
      { line: 1, text: "function fractionalKnapsack(items, W):" },
      { line: 2, text: "  sort items by value/weight ratio descending" },
      { line: 3, text: "  totalVal = 0, currW = 0" },
      { line: 4, text: "  for item in sorted items:" },
      { line: 5, text: "    if currW + item.w <= W: take 100%, totalVal += item.v" },
      { line: 6, text: "    else: take fraction (W - currW)/item.w, totalVal += fraction * item.v; break" },
    ]
  }
};
