/**
 * KMP String Matching Constants & Theory Definitions
 */

export const KMP_THEORY = {
  kmp: {
    title: "Knuth-Morris-Pratt (KMP) Algorithm",
    description: "Efficient string matching algorithm that searches for occurrences of a pattern within a main text in linear O(N + M) time by avoiding re-examination of previously matched characters using the Longest Prefix Suffix (LPS) table.",
    complexities: { best: "O(N)", average: "O(N + M)", worst: "O(N + M)", space: "O(M)" },
    pseudocode: [
      { line: 1, text: "function KMP(text, pattern):" },
      { line: 2, text: "  lps = computeLPS(pattern)" },
      { line: 3, text: "  i = 0, j = 0" },
      { line: 4, text: "  while i < text.length:" },
      { line: 5, text: "    if pattern[j] == text[i]: i++; j++" },
      { line: 6, text: "    if j == pattern.length: found at (i - j); j = lps[j - 1]" },
      { line: 7, text: "    else if i < text.length and pattern[j] != text[i]:" },
      { line: 8, text: "      if j != 0: j = lps[j - 1]" },
      { line: 9, text: "      else: i++" },
    ]
  }
};
