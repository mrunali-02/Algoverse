/**
 * Dynamic Programming Constants & Theory Definitions
 */

export const DP_ALGORITHMS_THEORY = {
  knapsack: {
    title: "0/1 Knapsack Problem",
    description: "Given items with weights and values, determine the maximum value subset that fits within capacity W. Each item can be chosen at most once (0 or 1).",
    complexities: { best: "O(N * W)", average: "O(N * W)", worst: "O(N * W)", space: "O(N * W)" },
    pseudocode: [
      { line: 1, text: "function knapsack(weights, values, W):" },
      { line: 2, text: "  dp = grid[N+1][W+1] initialized to 0" },
      { line: 3, text: "  for i from 1 to N:" },
      { line: 4, text: "    for w from 1 to W:" },
      { line: 5, text: "      if wt[i-1] <= w:" },
      { line: 6, text: "        dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w - wt[i-1]])" },
      { line: 7, text: "      else: dp[i][w] = dp[i-1][w]" },
    ]
  },

  lcs: {
    title: "Longest Common Subsequence (LCS)",
    description: "Finds the length of the longest subsequence present in two sequence strings in the same relative order.",
    complexities: { best: "O(M * N)", average: "O(M * N)", worst: "O(M * N)", space: "O(M * N)" },
    pseudocode: [
      { line: 1, text: "function LCS(text1, text2):" },
      { line: 2, text: "  dp = grid[M+1][N+1] initialized to 0" },
      { line: 3, text: "  for i from 1 to M:" },
      { line: 4, text: "    for j from 1 to N:" },
      { line: 5, text: "      if text1[i-1] == text2[j-1]: dp[i][j] = 1 + dp[i-1][j-1]" },
      { line: 6, text: "      else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])" },
    ]
  },

  coinChange: {
    title: "Coin Change Problem",
    description: "Finds the minimum number of coins needed to make a target amount using specified coin denominations.",
    complexities: { best: "O(N * Amount)", average: "O(N * Amount)", worst: "O(N * Amount)", space: "O(Amount)" },
    pseudocode: [
      { line: 1, text: "function coinChange(coins, amount):" },
      { line: 2, text: "  dp = array[amount + 1] filled with ∞, dp[0] = 0" },
      { line: 3, text: "  for coin in coins:" },
      { line: 4, text: "    for x from coin to amount:" },
      { line: 5, text: "      dp[x] = min(dp[x], 1 + dp[x - coin])" },
    ]
  }
};
