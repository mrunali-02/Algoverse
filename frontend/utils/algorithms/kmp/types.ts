/**
 * KMP String Matching Algorithms Type Definitions
 */

export interface KMPStateExtra {
  text: string;
  pattern: string;
  lps: number[];
  textIndex?: number;
  patternIndex?: number;
  matchIndices?: number[];
  isMatch?: boolean;
}
