/**
 * Trie Data Structure Type Definitions
 */

export interface TrieNode {
  char: string;
  isEndOfWord: boolean;
  children: Record<string, TrieNode>;
  id: string;
}

export interface TrieStateExtra {
  activeChar?: string;
  searchWord?: string;
  isMatch?: boolean;
}
