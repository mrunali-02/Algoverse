import { SimulationStep } from '@/types';
import { TrieNode } from './types';

export function generateTrieSteps(
  wordsToInsert: string[] = ["cat", "car", "card", "dog"],
  searchWord: string = "car"
): SimulationStep[] {
  const steps: SimulationStep[] = [];
  let stepCount = 1;

  const root: TrieNode = {
    char: "ROOT",
    isEndOfWord: false,
    children: {},
    id: "trie-root",
  };

  steps.push({
    stepNumber: stepCount++,
    action: 'INITIALIZE',
    visitedNodes: [],
    distances: {
      trie: JSON.parse(JSON.stringify(root)),
      wordsToInsert,
      searchWord,
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "Trie (Prefix Tree) Initialized",
    explanationDescription: "Created empty root node. Ready to insert words.",
    explanationReason: "Multi-way tree structure for character-by-character indexing.",
    highlightedPseudocodeLine: 2,
    animationType: 'pulse',
    highlightedNodeId: root.id,
  });

  // Insert words
  for (const word of wordsToInsert) {
    let curr = root;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      const nodeId = `trie-${word.substring(0, i + 1)}`;

      if (!curr.children[char]) {
        curr.children[char] = {
          char,
          isEndOfWord: i === word.length - 1,
          children: {},
          id: nodeId,
        };
      } else if (i === word.length - 1) {
        curr.children[char].isEndOfWord = true;
      }

      curr = curr.children[char];

      steps.push({
        stepNumber: stepCount++,
        action: 'UPDATE_DISTANCE',
        highlightedNodeId: curr.id,
        visitedNodes: [],
        distances: {
          trie: JSON.parse(JSON.stringify(root)),
          activeChar: char,
          word,
        },
        previousNodes: {},
        priorityQueueState: [],
        explanationTitle: `Inserted Character '${char}' for Word "${word}"`,
        explanationDescription: `Traversed/created node '${char}'. End of word: ${curr.isEndOfWord ? "YES" : "NO"}.`,
        explanationReason: "Branching prefix sharing across dictionary entries.",
        highlightedPseudocodeLine: 4,
        animationType: 'bounce',
      });
    }
  }

  // Search word
  let searchCurr: TrieNode | null = root;
  let isMatch = true;
  const searchPath: string[] = [root.id];

  for (let i = 0; i < searchWord.length; i++) {
    const char = searchWord[i];

    if (searchCurr && searchCurr.children[char]) {
      searchCurr = searchCurr.children[char];
      searchPath.push(searchCurr.id);

      steps.push({
        stepNumber: stepCount++,
        action: 'SELECT_NODE',
        highlightedNodeId: searchCurr.id,
        visitedNodes: [...searchPath],
        distances: {
          trie: JSON.parse(JSON.stringify(root)),
          activeChar: char,
          searchWord,
          foundChar: true,
        },
        previousNodes: {},
        priorityQueueState: [],
        explanationTitle: `Searching Prefix: Found Character '${char}'`,
        explanationDescription: `Found character '${char}' at level ${i + 1}.`,
        explanationReason: "Matching character branch.",
        highlightedPseudocodeLine: 3,
        animationType: 'glow',
      });
    } else {
      isMatch = false;
      break;
    }
  }

  const fullWordFound = isMatch && searchCurr ? searchCurr.isEndOfWord : false;

  steps.push({
    stepNumber: stepCount++,
    action: 'FINISHED',
    visitedNodes: [...searchPath],
    distances: {
      trie: JSON.parse(JSON.stringify(root)),
      searchWord,
      fullWordFound,
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: fullWordFound
      ? `Search Complete: Word "${searchWord}" EXISTS in Trie!`
      : `Search Complete: Word "${searchWord}" NOT found.`,
    explanationDescription: fullWordFound
      ? `Successfully matched prefix and validated isEndOfWord flag.`
      : `Word does not exist in Trie structure.`,
    explanationReason: "Trie prefix traversal complete.",
    highlightedPseudocodeLine: 1,
    animationType: 'glow',
  });

  return steps;
}
