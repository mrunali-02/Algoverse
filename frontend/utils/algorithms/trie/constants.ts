/**
 * Trie Constants & Theory Definitions
 */

export const TRIE_THEORY = {
  trie: {
    title: "Trie (Prefix Tree)",
    description: "Tree-like data structure used to store a dynamic set of strings where keys are usually strings. Enables fast prefix lookup and autocomplete in O(L) time where L is word length.",
    complexities: { best: "O(L)", average: "O(L)", worst: "O(L)", space: "O(N * L)" },
    pseudocode: [
      { line: 1, text: "function insert(word):" },
      { line: 2, text: "  curr = root" },
      { line: 3, text: "  for char in word:" },
      { line: 4, text: "    if char not in curr.children: curr.children[char] = new Node(char)" },
      { line: 5, text: "    curr = curr.children[char]" },
      { line: 6, text: "  curr.isEndOfWord = true" },
    ]
  }
};
