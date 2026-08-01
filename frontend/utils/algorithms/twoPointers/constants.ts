/**
 * Two Pointers Constants & Theory Definitions
 */

export const TWO_POINTERS_THEORY = {
  twoSum: {
    title: "Two Sum (Sorted Array)",
    description: "Finds two numbers in a sorted array that add up to a target sum using opposite end pointers in O(N) time and O(1) space.",
    complexities: { best: "O(N)", average: "O(N)", worst: "O(N)", space: "O(1)" },
    pseudocode: [
      { line: 1, text: "function twoSum(arr, target):" },
      { line: 2, text: "  left = 0, right = arr.length - 1" },
      { line: 3, text: "  while left < right:" },
      { line: 4, text: "    sum = arr[left] + arr[right]" },
      { line: 5, text: "    if sum == target: return [left, right]" },
      { line: 6, text: "    else if sum < target: left++" },
      { line: 7, text: "    else: right--" },
    ]
  },

  containerWater: {
    title: "Container With Most Water",
    description: "Finds two vertical lines that together with the x-axis form a container holding the maximum volume of water.",
    complexities: { best: "O(N)", average: "O(N)", worst: "O(N)", space: "O(1)" },
    pseudocode: [
      { line: 1, text: "function maxArea(heights):" },
      { line: 2, text: "  left = 0, right = heights.length - 1, maxA = 0" },
      { line: 3, text: "  while left < right:" },
      { line: 4, text: "    area = min(h[left], h[right]) * (right - left)" },
      { line: 5, text: "    maxA = max(maxA, area)" },
      { line: 6, text: "    if h[left] < h[right]: left++" },
      { line: 7, text: "    else: right--" },
    ]
  }
};
