/**
 * Sliding Window Constants & Theory Definitions
 */

export const SLIDING_WINDOW_THEORY = {
  maxSubarray: {
    title: "Maximum Sum Subarray of Size K",
    description: "Finds the contiguous subarray of fixed size K that has the maximum possible sum by sliding a window across the array in O(N) time.",
    complexities: { best: "O(N)", average: "O(N)", worst: "O(N)", space: "O(1)" },
    pseudocode: [
      { line: 1, text: "function maxSubarray(arr, k):" },
      { line: 2, text: "  windowSum = sum(arr[0..k-1]), maxSum = windowSum" },
      { line: 3, text: "  for i from k to arr.length - 1:" },
      { line: 4, text: "    windowSum += arr[i] - arr[i - k]" },
      { line: 5, text: "    maxSum = max(maxSum, windowSum)" },
      { line: 6, text: "  return maxSum" },
    ]
  },

  longestSubstring: {
    title: "Longest Substring Without Repeating Characters",
    description: "Finds the length of the longest substring with all unique characters using a variable-length sliding window.",
    complexities: { best: "O(N)", average: "O(N)", worst: "O(N)", space: "O(min(N, M))" },
    pseudocode: [
      { line: 1, text: "function lengthOfLongestSubstring(s):" },
      { line: 2, text: "  left = 0, maxLength = 0, set = new Set()" },
      { line: 3, text: "  for right from 0 to s.length - 1:" },
      { line: 4, text: "    while s[right] in set:" },
      { line: 5, text: "      set.delete(s[left]); left++" },
      { line: 6, text: "    set.add(s[right])" },
      { line: 7, text: "    maxLength = max(maxLength, right - left + 1)" },
    ]
  }
};
