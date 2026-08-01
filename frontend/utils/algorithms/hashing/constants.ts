/**
 * Hashing Algorithms Constants & Theory Definitions
 */

export const HASHING_THEORY = {
  hashTable: {
    title: "Hash Table & Collision Resolution",
    description: "Data structure that maps key values to array indices using a Hash Function h(k) = k mod M. Resolves collisions using Separate Chaining or Linear Probing.",
    complexities: { best: "O(1)", average: "O(1)", worst: "O(N)", space: "O(N)" },
    pseudocode: [
      { line: 1, text: "function insert(table, key):" },
      { line: 2, text: "  idx = hash(key) = key % table.size" },
      { line: 3, text: "  if table[idx] is occupied: // Collision!" },
      { line: 4, text: "    table[idx].chain.push(key) // Separate Chaining" },
      { line: 5, text: "    // or Linear Probing: idx = (idx + 1) % size until empty" },
      { line: 6, text: "  table[idx] = key" },
    ]
  }
};
